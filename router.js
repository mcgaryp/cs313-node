const express = require('express')
const router = express.Router()

// API Consts
const postalCalculatorController = require('./api/week09/assign/controller')
const week10TeamRouter = require('./api/week10/team/familyHistoryRouter')
const week10ClassRouter = require('./api/week10/class/bookRouter')

// Page Consts
const postalPage = require('./api/week09/assign/pageController')
const class10Page = require('./api/week10/class/getPage')


// Route to APIs
router.get('/mail', postalCalculatorController)
router.use('/week10/team', week10TeamRouter)
router.use('/week10/class', week10ClassRouter)

// Route to Pages
router.get('/week09/assign', postalPage.getForm)
router.get('/week10/class', class10Page.getPage)

module.exports = router