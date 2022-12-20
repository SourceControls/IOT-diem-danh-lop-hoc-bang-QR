
const taiKhoanRouters = require('./taiKhoan.routes');
const giangVienRouters = require('./giangVien.routes');
const sinhVienRouters = require('./sinhVien.routes');
const lopHocPhanRouters = require('./lopHocPhan.routes');
const buoiHocRouters = require('./buoiHoc.routes');
const CT_LOP_GVRouters = require('./CT_LOP_GV.routes');
const CT_LOP_SVRouters = require('./CT_LOP_SV.routes');
const CT_DiemDanhRouters = require('./CT_DiemDanh.routes');
// const sensorRouters = require('./sensor.routes');
const siteRouters = require('./sites.routes');

function routes(app) {
  //API theo table
  app.use('/GiangVien', giangVienRouters);
  app.use('/SinhVien', sinhVienRouters);
  app.use('/TaiKhoan', taiKhoanRouters);
  app.use('/LopHocPhan', lopHocPhanRouters);
  app.use('/BuoiHoc', buoiHocRouters);
  app.use('/CT_LOP_GV', CT_LOP_GVRouters);
  app.use('/CT_LOP_SV', CT_LOP_SVRouters);
  app.use('/CT_DiemDanh', CT_DiemDanhRouters);
  // app.use('/sensor', sensorRouters);
  app.use('/site', siteRouters);
  //API chung
  app.use('/', (req, res) => { res.send("Hello") });

}


module.exports = routes;