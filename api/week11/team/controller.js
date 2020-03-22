// not supported?
const https = require('https')

function searchMovies(req, res) {
   let title = req.query.title
   let year = req.query.year

   var url = 'https://www.omdbapi.com/?apikey=776446a6&plot=full'
   var t = '&t='
   var y = '&y='

   // http://www.omdbapi.com/?t=Zootopia&y=2016&plot=full

   if (title != "") {
      console.log(title)
      t += title
      url += t
   } else {
      console.log("There was an Error with the Title")
   }

   if (year != "") {
      console.log(year)
      y += year
      url += y
   } else {
      console.log("There was an Error with the Year")
   }

   console.log(url)
    res.send({ url: url })

}

module.exports = {
   search: searchMovies
}