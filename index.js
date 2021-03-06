const express = require('express')
const app = express()
const mongoose = require('mongoose')
const server = require('http').createServer(app)
const socketio = require('socket.io').listen(server)
const session = require('express-session')
const cors = require('cors')

const shareRoutes = require('./routes/shareRoutes')
const homeRoutes = require('./routes/homeRoutes')
const Share = require('./models/Share')
const User = require('./models/User')

const mongodbURI = process.env.MONGOURI || 'mongodb://localhost:27017/fast-share'

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})

app.set('view engine', 'pug')

app.use(cors())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'knf03-40lkm-dd3k-3kpk'
}))

app.use(express.static('public'))

app.use('/', homeRoutes)
app.use('/shares', shareRoutes)

app.use((req, res) => {
  res.status(404)
  res.render('errors/404')
})

app.use((error, req, res, next) => {
  res.status(404)
  res.render('errors/404')
})

socketio.on("connection", (socket) => {
  socket.on('change-share-content-to-backend', ({content, title, id}) => {
    Share.updateOne({_id: id}, {content, title}, (error) => {
      if (error) console.log(error)
    })
    socket.broadcast.emit('share-content-change-to-frontend', {content, title, id})
  })
})

module.exports = server
