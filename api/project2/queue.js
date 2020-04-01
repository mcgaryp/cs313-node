// Firebase stuff
const firebase = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
const firebaseApp = firebase.initializeApp({
   credential: firebase.credential.cert(serviceAccount),
   databaseURL: "https://lab-queue-8afd1.firebaseio.com"
})
const db = firebase.database()
const ref = firebase.database().ref().child('/queue')

// TODO: Make function that sends updated list when student is added or removed
// TODO: Make function that sends updated list when ta is updated

/*****************************************************
 * ADD to FireBase
 *****************************************************/
// Handle the opperations
function handleAdd(req, res) {
   // get the info from the query
   var name = req.query.name
   var theClass = req.query.class
   var details = req.query.details

   // add to the database
   addStudent(name, theClass, details)
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
   removeStudent(id)
}

// Remove a student
function removeStudent(id) {
   var path = '/'
   getKey(id, key => {
      path += key

      var sref = db.ref('/queue' + path)
      sref.remove()
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
         keys.push(data.key)
      })
      callback(keys[id])
   })
}

/*****************************************************
 * PULL from FireBase
 ****************************************************/
// Start up: pull everything at once
function startUp() {
   ref.once('value', snapshot => {
      var list = []
      snapshot.forEach((data) => {
         list.push(data.val())
      })
   })
}

/*****************************************************
 * ADDING TA to Firebase and UPDATING
 ****************************************************/
// handle how to add ta
function handleAddTa(req, res) {
   var link = req.query.ta
   var id = req.query.id

   updateTa(id, link)
}

// add a ta
function updateTa(id, link) {
   getKey(id, key => {
      const sref = db.ref('/queue/' + key)

      sref.update({
         ta: link
      }, (err) => {
         if (!err) {
            console.log("Successful Update")
         } else {
            console.log(err)
         }
      })
   })
}


// Export the module
module.exports = {
   addStudent: handleAdd,
   removeStudent: handleRemove,
   addTa: handleAddTa
}