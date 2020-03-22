const express = require('express')
const router = express.Router()

const page = require('./getPage')
const controller = require('./controller')

router.get('/', page.get)
router.get('/searchMovie', controller.search)

module.exports = router