const express = require('express')
const router = express.Router()

const page = require('./getPage')
const controller = require('./controller')

router.get('/', page.getPage)
router.get('/add', controller.add)
router.get('/send', controller.send)

module.exports = router