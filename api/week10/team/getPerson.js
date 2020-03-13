const { Pool } = require("pg")
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString: connectionString })

function getPerson (req, res) {
   const id = req.query.id

   const person = getPersonFromDB(id, (error, result) => {
      if (error || result == null || result.length != 1) {
         res.status(500).json({ success: false, data: error })
      } else {
         const person = result[0]
         res.status(200).json(person)
      }
   })

   console.log("A person here: " + person)
}

function getPersonFromDB(id, callback) {
   console.log("Getting person from DB with id: " + id)

   const query = "SELECT id, first_name, last_name, DOB FROM week10_team_person WHERE id = $1::int;"
   const params = [id]

   pool.query(query,params,(error, result) => {
      if (error) {
			console.log("Error in query: ")
			console.log(error);
			callback(error, null);
      }
      
      console.log("Found result: " + JSON.stringify(result.rows))
      callback(null, result.rows)
   })
}
module.exports = getPerson