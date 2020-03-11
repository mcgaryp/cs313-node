exports.getForm = (req, res) => {
   var weight = ""
   var type = ""
   var price = 0

   res.render('./pages/week09/form', { weight: weight, type: type, price: price })
}