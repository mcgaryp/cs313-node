const express = require('express')
const router = require('./router')
const load = require('./load')
const app = express()
const port = process.env.PORT || 8000
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

const bodyParser = require('body-parser')

app.set('io', io)
app.set('port', port)

app.use(express.static(__dirname + '/api'))
app.use(router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
   res.render('./index', load)
})

app.listen(port)