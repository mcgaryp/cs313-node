const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || "postgres://zumbugzuser:password@localhost:5432/zumbugz"
const pool = new Pool({ connectionString: connectionString })

function add(req, res) {
   console.log("Adding to our database")
   var selected = req.query.bug

   getDB((error, data) => {
      console.log(data)
      res.render('./project/index', { bugs: data, selected: selected })
   })
}

function send(req, res) {
   console.log("Sending data to parent site")
   // res.render('./project/index', { data: null })
}

function getDB(callback) {
   const query = "SELECT * FROM bug_drawings;"
   pool.query(query, (error, data) => {
      if (error) {
         console.log("Error with database: " + error)
         callback(error, null)
         return
      }

      callback(null, data.rows)
   })
}

module.exports = {
   add: add,
   send: send,
   getDB: getDB
}