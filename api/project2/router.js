const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const queue = require('./queue')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
   res.render('./project2/index')
})

router.get('/start', (req, res) => {
   queue.start(list => {
      res.end(JSON.stringify(list))
   })
})

router.get('/addPerson', queue.addStudent)
router.get('/removePerson', queue.removeStudent)
router.get('/addTa', queue.addTa)

module.exports = router