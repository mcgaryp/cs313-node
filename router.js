const express = require('express')
const router = express.Router()

// API Consts
const postalCalculatorController = require('./api/week09/assign/controller')
const week10TeamRouter = require('./api/week10/team/familyHistoryRouter')

// Page Consts
const postalPage = require('./api/week09/assign/pageController')


// Route to APIs
router.get('/mail', postalCalculatorController)
router.use('/week10/team', week10TeamRouter)

// Route to Pages
router.get('/week09/assign', postalPage.getForm)



module.exports = router