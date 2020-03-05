

function playGame(req, res) {
   console.log("Playing the Game")

   var player = req.query.weapon
   var user = req.query.name
   var cpu = getCpuChoice()
   var winner = getWinner(player, cpu, user)
   var stuff = { player: player, cpu: cpu, winner: winner }
   res.render('results', stuff)
}

function getCpuChoice() {
   var num = getRandom(0, 2)
   switch (num) {
      case 0:
         return "rock"
      case 1:
         return "paper"
      default:
         return "scissors"
   }
}

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

function getWinner(player, cpu, user) {
   var winner = "CPU"

   if (player == "rock" && cpu == "scissors" || player == "scissors" && cpu == "paper" || player == "paper" && cpu == "rock") {
      winner = user
   } else if (player == cpu) {
      winner = "DRAW!"
   }

   return winner
}

module.exports = { playGame: playGame }