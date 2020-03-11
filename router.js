const express = require('express')
const router = express.Router()

const postalCalculatorController = require('./api/week09/assign/controller')
const postalPage = require('./api/week09/assign/pageController')
// const week10TeamRouter = require('./api/week10/team/familyHistoryRouter')

router.get('/mail', postalCalculatorController)
router.get('/week09/assign', postalPage.getForm)
// router.use('week10/team', week10TeamRouter)

module.exports = router