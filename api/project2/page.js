var ERROR = "There was an error.";
$(document).ready(function () {
   var target = '/lab-queue/start'

   $.get(target, res => {
      var data = null
      data = JSON.parse(res)
      renderQueue(data)
   })
});

$(document).ready(function () {
   var form = $('form.addTa').submit(event => {
      console.log("button clicked")
      event.preventDefault()

      var id = event.delegateTarget[0].id
      var ta = event.delegateTarget[0].value

      var target = '/lab-queue/addTa?ta=' + ta + '&id=' + id

      $.get(target, function (res) {
         var data = null
         data = JSON.parse(res)
         renderQueue(data)
      })
   })
   console.log(form)
});

$(function () {
   var form = $('#add')
   var name = $('#name')
   var theClass = $('#class')
   var details = $('#details')

   form.on('submit', function (e) {
      e.preventDefault()

      var target = '/lab-queue/addPerson?name=' + name.val() + '&class=' + theClass.val() + '&details=' + details.val()

      $.get(target, function (res) {
         var data = null
         data = JSON.parse(res)
         renderQueue(data)
         form.trigger("reset")
      })
   })
});


function renderQueue(queue) {
   console.log(queue)
   var text = ""
   if (queue != null) {
      for (var i = 0; i < queue.length; i++) {
         text += makeText(queue[i].class, queue[i].details, queue[i].name, queue[i].ta, i)
      }
      document.getElementById('queue').innerHTML = text
      load()
   }
}

function makeText(c, details, name, ta, i) {
   var text = "<tr class='rowData'><th scope='row'>" + (i + 1) + "</th><td>" + name + "</td><td>" + c + "</td><td>" + details + "</td><td>"
   if (ta) {
      console.log(ta)
      text += "<a href='" + ta + "'>" + ta + "</a>"
   } else {
      text += "<form action='/lab-queue/addTa' class='addTa'><div class='form-row'><div class='col'><input type='text' class='form-control' value='" + ta + "' id='" + i + "'></div><div class='col-2'><button class='btn btn-primary form-control' type='submit'>Add TA</button></div></div></form>"
   }
   text += "</td><td><form class='delete' action='/lab-queue/removePerson'><div class='form-row'><input id='" + i + "' hidden><button class='btn btn-danger' type='submit' name='delete'><i class='fas fa-trash'></i></div></form></td></tr>"
   return text
}

function load() {
   // Update TA table
   $('form.addTa').submit(event => {
      event.preventDefault()

      var id = event.delegateTarget[0].id
      var ta = event.delegateTarget[0].value

      var target = '/lab-queue/addTa?ta=' + ta + '&id=' + id

      $.get(target, function (res) {
         var data = null
         data = JSON.parse(res)
         renderQueue(data)
      })
   })

   // Update deletion
   $('form.delete').submit(event => {
      event.preventDefault()

      var id = event.delegateTarget[0].id

      var target = '/lab-queue/removePerson?id=' + id
      $.get(target, function (res) {
         var data = null
         data = JSON.parse(res)
         renderQueue(data)
      })
   })

}