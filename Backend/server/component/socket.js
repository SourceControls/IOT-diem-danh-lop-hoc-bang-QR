const time = require('./Time')

function socket(app, port) {
  const server = app.listen(80, function () {
    console.log("App running");
  });
  const io = require('socket.io')(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    console.log('a user connected ||', time.getCurrentTime());
    socket.on('disconnect', () => {
      console.log('user disconnected ||', time.getCurrentTime());
    });
    io.emit('connected', 'connected');
    // console.log(socket.handshake.address);
  });
}

module.exports = socket;