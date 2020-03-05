const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/form', { weight: "", type: "" }))

  // GET url format/math?operator=sum&operands=1&operands=2
  .get('/mail', (req, res) => {
    var weight = ""
    var type = ""
    var price = 0

    if (req.query.type != "" && req.query.weight != "") {
      type = req.query.type
      weight = parseFloat(req.query.weight)

      switch (type) {
        case "stamped":
          price = letterStamped(weight)
          type = "Letter(Stamped)"
          break
        case "metered":
          price = letterMetered(weight)
          type = "Letter(Metered)"
          break
        case "flat":
          price = largeEnvelope(weight)
          type = "Large Envelopes(Flats)"
          break
        case "retail":
          price = firstClass(weight)
          type = "First Class Package Service(Retail)"
          break
        default:
          break
      }

      res.render('pages/results', { weight: weight, type: type, price: price })

    } else {
      console.log("FALIURE to set")
      type = req.query.type
      weight = req.query.weight
      res.render('pages/form', { weight: weight, type: type })
    }
  })

  // .get('/mail_service', (req, res) => {
  //   res.set('Content-Type', 'application/json')
  //   switch (req.query.operator) {
  //     case "sum":
  //       let sum = parseInt(req.query.operand1) + parseInt(req.query.operand2)
  //       res.send(JSON.stringify({ result: sum }))
  //       console.log(sum)
  //       break
  //     default:
  //       console.log("YOURE LOTS FALIURE")
  //       break
  //   }
  // })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))


function letterStamped(lbs) {
  var price = 0.55

  // convert to ounces
  oz = lbs * 16
  console.log("Ounces: " + oz)

  if (oz > 3.5) {
    price = 1
  } else if (oz > 3) {
    price = 0.85
  } else if (oz > 2) {
    price = 0.70
  }

  return price.toFixed(2)
}

function letterMetered(lbs) {
  var price = 0.50

  // convert to ounces
  oz = lbs * 16
  console.log("Ounces: " + oz)

  if (oz > 3.5) {
    price = 0.95
  } else if (oz > 3) {
    price = 0.80
  } else if (oz > 2) {
    price = 0.65
  }

  return price.toFixed(2)
}

function largeEnvelope(lbs) {
  var price = 1.00

  // convert to ounces
  oz = lbs * 16
  console.log("Ounces: " + oz)

  if (oz > 13) {
    price = 3.40
  } else {
    var temp = parseInt(oz) == 0 ? 1 : parseInt(oz)
    price = price + temp * 0.2
  }

  return price.toFixed(2)
}

function firstClass(lbs) {
  var price = 3.80

  // convert to ounces
  oz = lbs * 16
  console.log("Ounces: " + oz)

  if (oz > 13) {
    price = 5.90
  } else if (oz > 9) {
    price = 5.30
  } else if (oz > 5) {
    price = 4.60
  }

  return price.toFixed(2)
}