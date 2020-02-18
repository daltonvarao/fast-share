const Share = require('../models/Share')

module.exports = (server) => {
  const socketio = require('socket.io').listen(server)
  const ids = {}

  socketio.on("connect", (socket) => {
    socketio.sockets.emit('connected-users', socketio.engine.clientsCount)
    
    socket.on("disconnect", (sock) => {
      socketio.sockets.emit('connected-users', socketio.engine.clientsCount)
    })

    socket.on('change-share-content-to-backend', ({content, title, id}) => {
      Share.updateOne({_id: id}, {content, title}, (error) => {
        if (error) console.log(error)
      })
      socket.broadcast.emit('share-content-change-to-frontend', {content, title, id})
    })
  })
}
