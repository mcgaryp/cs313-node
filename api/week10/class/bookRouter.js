const express = require('express')
const router = express.Router()

const controller = require('./bookController.js')

router.get('/bookList', controller.handleBookList)
router.get('/oneBook', controller.handleSingleBook)
router.get('/createBook', controller.createBook)

module.exports = router