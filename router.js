const express = require('express')
const router = express.Router()

// API Consts
const postalCalculatorController = require('./api/week09/assign/controller')
const week10TeamRouter = require('./api/week10/team/familyHistoryRouter')

// Page Consts
const postalPage = require('./api/week09/assign/pageController')
const team10Page = require('./api/week10/team/getPage')

// Route to APIs
router.get('/mail', postalCalculatorController)
router.get('/familyHistory', week10TeamRouter)

// Route to Pages
router.get('/week09/assign', postalPage.getForm)
router.get('/week10/team', team10Page.getPage)


module.exports = router