const time = require('./Time')

class IO {
  static giangVienPositions = {
    defaultPosition: { lat: 10.848085, lng: 106.786452 }  // đặt mặc định là vị trí của học viện

  };  //lưu lại position của tất cả giảng viên
  getGiangVienPosition(maGV) {
    if (!IO.giangVienPositions.hasOwnProperty(maGV))
      return IO.giangVienPositions.defaultPosition;
    return IO.giangVienPositions[maGV];
  }
  init(app, port) {
    var io = this.io;
    var server = this.server;
    var giangVienPositions = IO.giangVienPositions;
    server = app.listen(port, function () {
      console.log("App running");
    });
    io = require('socket.io')(server, { cors: { origin: '*' } });
    io.on('connection', (socket) => {
      console.log('a user connected ||', time.getCurrentTime());
      socket.on('disconnect', () => {
        console.log('user disconnected ||', time.getCurrentTime());
      });

      socket.emit('connected', 'socket connected');

      io.emit('clientLocation', 'GV01')
      //cập nhật lại mã giảng viên
      socket.on('clientLocation', (clientPosition) => {
        if (clientPosition.position) {
          giangVienPositions[clientPosition.maGV] = clientPosition.position;
          console.log(giangVienPositions);

        }
      });
    });
    return io;
  }

}


module.exports = new IO;