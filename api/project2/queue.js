// Firebase stuff
const firebase = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
const firebaseApp = firebase.initializeApp({
   credential: firebase.credential.cert(serviceAccount),
   databaseURL: "https://lab-queue-8afd1.firebaseio.com"
})
const db = firebase.database()
const ref = db.ref('/queue')

// TODO: Make function that sends updated list when student is added or removed
// TODO: Make function that sends updated list when ta is updated

/*****************************************************
 * UPDATE VIA SOCKET
 ****************************************************/
function update(req, res, next) {

   // added student
   var list = new Array()
   ref.on('child_added', (snapshot) => {
      list.push(snapshot.val())
   })
   // added TA

   // removed student

   io.emit('list', list)
}

/*****************************************************
 * ADD to FireBase
 ****************************************************/
// Handle the opperations
function handleAdd(req, res) {
   // get the info from the query
   var name = req.query.name
   var theClass = req.query.class
   var details = req.query.details

   // add to the database
   addStudent(name, theClass, details)

   // notify and update page via AJAX
   var list = new Array()
   ref.on('child_added', (snapshot) => {
      list.push(snapshot.val())
   })

   // send updated list to the folks
   res.end(JSON.stringify(list))
}

// Add a student to the queue
function addStudent(name, theClass, details) {
   ref.push({
      name: name,
      class: theClass,
      details: details,
      ta: ""
   })
}

/*****************************************************
 * REMOVE from Firebase
 ****************************************************/
// Handle Removing
function handleRemove(req, res) {
   var id = req.query.id
   console.log("Remove id: " + id)
   removeStudent(id, (err, list) => {
      if (!err) {
         res.end(JSON.stringify(list))
      } else {
         console.log(err)
      }
   })
}

// Remove a student
function removeStudent(id, callback) {
   var path = '/'
   getKey(id, key => {
      path += key

      console.log(path)

      var sref = db.ref('/queue' + path)
      sref.remove().then(() => {
         var list = []
         ref.once('value', snap => {
            snap.forEach(data => {
               list.push(data.val())
            })
            console.log(list)
            callback(null, list)
         })
      }, () => {
         callback("Failed to remove " + id + " from queue", null)
      })
   })
}

/*******************************************************
 * RETRIEVE KEY FROM FIREBASE
 ******************************************************/
// Get the right key
function getKey(id, callback) {
   /* TODO: ID IS NOT SET */
   var keys = []
   ref.once('value', snap => {
      snap.forEach(data => {
         console.log(data.key)
         keys.push(data.key)
      })
      callback(keys[id])
   })
}

/*****************************************************
 * PULL from FireBase
 ****************************************************/
// Start up: pull everything at once
function startUp(callback) {
   ref.once('value', snapshot => {
      var list = []
      snapshot.forEach((data) => {
         list.push(data.val())
      })
      callback(list)
   })
}

/*****************************************************
 * ADDING TA to Firebase and UPDATING
 ****************************************************/
// handle how to add ta
function handleAddTa(req, res) {
   var link = req.query.ta
   var id = req.query.id

   updateTa(id, link, (err) => {
      if (!err) {
         ref.once('value', snap => {
            var list = []
            snap.forEach(data => {
               list.push(data.val())
            })
            console.log("Updated TA")
            res.end(JSON.stringify(list))
         })
      } else {
         console.log(err)
      }
   })
}

// add a ta
function updateTa(id, link, callback) {
   getKey(id, key => {
      const sref = db.ref('/queue/' + key)

      sref.update({
         ta: link
      }, (err) => {
         if (!err) {
            callback(null)
         } else {
            console.log(err)
            callback("Failed to Update the TA")
         }
      })
   })
}


// Export the module
module.exports = {
   addStudent: handleAdd,
   removeStudent: handleRemove,
   start: startUp,
   addTa: handleAddTa
}