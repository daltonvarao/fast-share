const express = require('express')
const app = express()
const mongoose = require('mongoose')
const server = require('http').createServer(app)
const socketio = require('socket.io').listen(server)
const session = require('express-session')

const routes = require('./routes')
const Share = require('./models/Share')
const User = require('./models/User')

mongoose.connect('mongodb://localhost:27017/fast-share', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.set('view engine', 'pug')

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'knf03-40lkm-dd3k-3kpk'
}))

app.use(express.static('public'))

app.use(routes)

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

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
