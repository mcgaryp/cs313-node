const express = require('express')
const router = express.Router()

const person = require('./getPerson')
const parents = require('./getParents')
const children = require('./getChildren')
const page = require('./getPage')

// ./getPerson?id=#
router.get('/getPerson', person)
router.get('/', page.getPage)
// router.get('/getParents', parents.getParents)
// router.get('/getChildren', children.getChildren)

module.exports = router