const io = require('../component/IO');
const doRequest = require('../component/doRequest');
const cheatDetector = require('../component/CheatDetector');
class sensorControllers {
  insertSensorData = async (req, res) => {
    var myobj = { ...req.query };
    console.log("SensorData: ", myobj);
    //BLUETOTH CÓ THỂ BỎ QUA TRƯỜNG lat và lng, trường IP có thể chứa giá trị của bluetooth
    // http://localhost/sensor?IDBUOIHOC=BUOI01&IDLSV=LSV01&IP=127.0.0.1&lat=10.8489687&lng=106.7960183

    try {
      await doRequest('http://localhost/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { DADIEMDANH: false } })

      //cập nhật lại trạng thái điểm danh của sinh viên
      let updated = (await doRequest('http://localhost/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { DADIEMDANH: true } }))
      if (updated == 0) { res.send("Fail!! Sinh viên đã điểm danh trước đó"); return; }

      //phát hiện gian lận và cập nhật vào ghi chú nếu có
      let maGV = (await doRequest('http://localhost/BUOIHOC/GetList', { IDBUOIHOC: myobj.IDBUOIHOC }));
      maGV = maGV[0].IDLGVSUBMITTED;
      let studentPosition = { lat: myobj.lat, lng: myobj.lng };
      let giangVienPosition = io.getGiangVienPosition(maGV);
      var ghiChu = cheatDetector.dectect(myobj.IDBUOIHOC, myobj.IP, giangVienPosition, studentPosition)
      if (ghiChu != "");
      await doRequest('http://localhost/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { GHICHU: ghiChu } })


      res.send("SUCCESS!! Đã điểm danh 1 sinh viên || " + ghiChu);
    } catch (error) {
      res.send(error.message);
    }

  }
}

module.exports = new sensorControllers;