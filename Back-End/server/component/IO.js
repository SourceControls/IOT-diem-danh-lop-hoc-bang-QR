const time = require('./Time')

class IO {
  static giangVienPositions = {
    defaultPosition: { lat: 10.848085, lng: 106.786452 }  // đặt mặc định là vị trí của học viện

  };  //lưu lại position của tất cả giảng viên
  getGiangVienPosition(MAGV) {
    if (!IO.giangVienPositions.hasOwnProperty(MAGV))
      return IO.giangVienPositions.defaultPosition;
    return IO.giangVienPositions[MAGV];
  };

  init(app, port) {
    var io = this.io;
    var server = this.server;
    var giangVienPositions = IO.giangVienPositions;
    server = app.listen(port, function () {
      console.log("App running: " + port);
    });

    io = require('socket.io')(server, { cors: { origin: '*' } });
    io.on('connection', (socket) => {
      console.log('a user connected ||', time.getCurrentTime());
      socket.on('disconnect', () => {
        console.log('user disconnected ||', time.getCurrentTime());
      });

      socket.emit('connected', 'socket connected');
      io.emit('clientLocation') //cap nhat lai vi tri cua giang vien.
      //cập nhật lại mã giảng viên
      socket.on('clientLocation', (clientPosition) => {
        if (clientPosition.position) {
          giangVienPositions[clientPosition.MAGV] = clientPosition.position;
          console.log(giangVienPositions);

        }
      });
    });
    return io;
  }

}


module.exports = new IO;