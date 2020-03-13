const data = require('./controller')

exports.getPage = (req, res) => {
   var result = null
   data.getDB((error, data) => {
      if (data) {
         res.render('./project/index', { bugs: data, selected: null })
         return
      }
      console.log("Error with DB: " + error)
      return
   })
}