
// init app
const app = require('./component/app');

//init sever and socket
const io = require('./component/IO').init(app, 8080);
function diemDanh(IDLSV, IDBUOIHOC, GHICHU) {
  io.emit('diemDanh', { IDLSV, IDBUOIHOC, GHICHU })
}

//init route
const routes = require('./routes/index.routes')
routes(app)

module.exports = diemDanh





