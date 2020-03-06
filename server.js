const express = require('express');
var app = express();

app.set('port', process.env.PORT || 8000)
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', load)
   .listen(app.get('port'), function () {
      console.log('Listening on port: ' + app.get('port'))
   })

function load(request, response) {
   var params = {
      weeks: [{
         week: "Week 9",
         url: "../../week09/assign/index.js"
      },
      {
         week: "Week 10",
         url: "../../week10/index.html"
      }]
   }
   response.render('pages/index', params)
}