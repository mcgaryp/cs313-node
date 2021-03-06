function controller(req, res) {
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

  } else {
    console.log("FALIURE to set")
    type = req.query.type
    weight = req.query.weight
  }

  res.render('./pages/week09/results', { weight: weight, type: type, price: price })
}

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

module.exports = controller