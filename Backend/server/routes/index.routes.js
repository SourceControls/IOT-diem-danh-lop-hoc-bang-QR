
const taiKhoanRouters = require('./taiKhoan.routes');
const giangVienRouters = require('./giangVien.routes');
const sinhVienRouters = require('./sinhVien.routes');
const lopHocPhanRouters = require('./lopHocPhan.routes');
const buoiHocRouters = require('./buoiHoc.routes');
const CT_LOP_GVRouters = require('./CT_LOP_GV.routes');
const CT_LOP_SVRouters = require('./CT_LOP_SV.routes');
const CT_DiemDanhRouters = require('./CT_DiemDanh.routes');


const siteRouters = require('./sites.routes');

function routes(app) {

  app.use('/GiangVien', giangVienRouters);
  app.use('/SinhVien', sinhVienRouters);
  app.use('/TaiKhoan', taiKhoanRouters);
  app.use('/LopHocPhan', lopHocPhanRouters);
  app.use('/BuoiHoc', buoiHocRouters);
  app.use('/CT_LOP_GV', CT_LOP_GVRouters);
  app.use('/CT_LOP_SV', CT_LOP_SVRouters);
  app.use('/CT_DiemDanh', CT_DiemDanhRouters);

  app.get('/insertSensorData', function (req, res) {
    var myobj = { ...req.query, time: getCurrentTime() };
    console.log(myobj);
    // io.emit('updateData', myobj);
    // MongoClient.connect(url, function (err, db) {
    // if (err) throw err;
    // var dbo = db.db(dbName);
    // http://localhost:80/insertSensorData?MSV=N19DCCN069&LHP=LHP01
    // dbo.collection(collectionName).insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });
    res.send("insertSensorData");
  })


  app.use('/', siteRouters);

}

module.exports = routes;