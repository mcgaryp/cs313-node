const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/form'))

  // GET url format/math?operator=sum&operands=1&operands=2
  .get('/math', (req, res) => {
    switch (req.query.operator) {
      case "sum":
        let sum = parseInt(req.query.operand1) + parseInt(req.query.operand2)
        res.render('pages/results', { sum: sum })
        console.log(sum)
        break
      default:
        console.log("YOURE LOTS FALIURE")
        break
    }
  })

  .get('/math_service', (req, res) => {
    res.set('Content-Type', 'application/json')
    switch (req.query.operator) {
      case "sum":
        let sum = parseInt(req.query.operand1) + parseInt(req.query.operand2)
        res.send(JSON.stringify({result: sum}))
        console.log(sum)
        break
      default:
        console.log("YOURE LOTS FALIURE")
        break
    }
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))


