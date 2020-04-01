(function () {
   // Initialize Firebase
   const firebaseConfig = {
      apiKey: "AIzaSyCEEPV8FF0EGdX1rohFvi5lc8ro-786wKA",
      authDomain: "lab-queue-8afd1.firebaseapp.com",
      databaseURL: "https://lab-queue-8afd1.firebaseio.com",
      projectId: "lab-queue-8afd1",
      storageBucket: "lab-queue-8afd1.appspot.com",
      messagingSenderId: "333193300445",
      appId: "1:333193300445:web:6ca24f0f92300e13304e34",
      measurementId: "G-65SSSF4F4B"
   };

   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   console.log(firebase)
   // Create references
   const dbRef = firebase.database().ref().child('/queue');

   dbRef.on('value', snap => {
      var list = []
      console.log("hello two")
      snap.forEach(data => {
         list.push(data.val())
      })
      renderQueue(list)
   });

   // Pull Immediately
   $(document).ready(function () {
      var list = []
      
      dbRef.once('value', snap => {
         console.log(snap)
         snap.forEach((data) => {
            list.push(data.val())
         })
         renderQueue(list)
      })
   });

}());

// Add a Atudent the DB
$(document).ready(function () {
   var form = $('#add')
   var name = $('#name')
   var theClass = $('#class')
   var details = $('#details')

   form.on('submit', function (e) {
      e.preventDefault()

      var target = '/lab-queue/addPerson?name=' + name.val() + '&class=' + theClass.val() + '&details=' + details.val()

      $.get(target)
      form.trigger("reset")
   })
});

// Render the Queue
function renderQueue(queue) {
   var text = ""
   if (queue != null) {
      for (var i = 0; i < queue.length; i++) {
         text += makeText(queue[i].class, queue[i].details, queue[i].name, queue[i].ta, i)
      }
      document.getElementById('queue').innerHTML = text
      load()
   }
}

// Make the Queue
function makeText(c, details, name, ta, i) {
   var text = "<tr class='rowData'"
   if (ta) {
      text += " style='background-color: #ffc107; border-color: #ffc107'"
   }

   text += "><th scope='row'>" + (i + 1) + "</th><td>" + name + "</td><td>" + c + "</td><td>" + details + "</td><td>"

   if (ta) {
      text += "<a href='" + ta + "'>" + ta + "</a>"
   } else {
      text += "<form action='/lab-queue/addTa' class='addTa'><div class='form-row'><div class='col'><input type='text' class='form-control' value='" + ta + "' id='" + i + "' placeholder='TAs Zoom Link'><div class='pt-1'><button class='btn btn-primary btn-block' type='submit'>Add TA</button></div></div></div></form>"
   }

   text += "</td><td><form class='delete' action='/lab-queue/removePerson'><div class='form-row'><input id='" + i + "' hidden><button class='btn btn-danger' type='submit' name='delete'><i class='fas fa-trash'></i></button></div></form></td></tr>"

   return text
}

// Refresh the functions
function load() {
   // Update TA DB
   $('form.addTa').submit(event => {
      event.preventDefault()

      var id = event.delegateTarget[0].id
      var ta = event.delegateTarget[0].value

      var target = '/lab-queue/addTa?ta=' + ta + '&id=' + id

      $.get(target)
   })

   // Update deletion
   $('form.delete').submit(event => {
      event.preventDefault()

      var id = event.delegateTarget[0].id

      var target = '/lab-queue/removePerson?id=' + id
      $.get(target)
   })

}

resizeWindow()

$(window).resize(() => {
   resizeWindow()
});

function resizeWindow() {
   if ($(window).width() <= 700) {
      $('.enterCol').removeClass('col')
      $('.enterCol').addClass('col-12')
      $('.enterButton').removeClass('col-auto')
      $('.enterButton').addClass('col-12')
   }

   if ($(window).width() > 700) {
      $('.enterCol').removeClass('col-12')
      $('.enterCol').addClass('col')
      $('.enterButton').removeClass('col-12')
      $('.enterButton').addClass('col-auto')
   }
}