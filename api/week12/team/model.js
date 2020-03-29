function login(req, res) {
   var result = { success: false }
   var user = req.body.username
   var pass = req.body.password

   console.log("username: " + user)
   console.log("password: " + pass)

   if (user == "admin" && pass == "password") {
      // req.session.user = user
      result = { success: true }
   }

   console.log("Sending Status")
   res.json(result)
}

function logout(req, res) {
   var result = { success: false }

   if (req.session.username) {
      // req.session.destroy()
      result = { success: true }
   }

   res.json(result)
}

function getServerTime(req, res) {
   var time = new Date()
   var result = { success: true, time: time }

   res.json(result)
}

module.exports = {
   login: login,
   logout: logout,
   getServerTime: getServerTime
}