const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser")
// const session = require('express-session')

router.use(bodyParser.urlencoded({
   extended: true
}))
router.use(bodyParser.json())

// router.use(session)

const page = require('./getPage')
const model = require('./model')

// router.get('/getServerTime', (req, res, next) => {

// })

router.get('/', page.get)
router.post('/login', model.login)
router.post('/logout', model.logout)
router.get('/getServerTime', model.getServerTime)

module.exports = router