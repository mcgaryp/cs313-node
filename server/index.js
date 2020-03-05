const express = require('express');

var app = express();

app.set('port', process.env.PORT || 8000)
   // .use(express.static('../public'))
   // .set('views', __dirname + '/views')
   // .set('view engine', 'ejs')
   .get('/', (req, res) => {
      res.sendFile('index.html', { root: '../public' })
   })

   .listen(app.get('port'), function () {
      console.log('Listening on port: ' + app.get('port'));
   });