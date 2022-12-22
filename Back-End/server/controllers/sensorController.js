const io = require('../component/IO');
const doRequest = require('../component/doRequest');
const cheatDetector = require('../component/CheatDetector');
class SensorControllers {

  //điểm danh bằng QR.
  insertSensorData = async (req, res) => {
    var myobj = { ...req.query };
    console.log("SensorData: ", myobj);
    //BLUETOTH CÓ THỂ BỎ QUA TRƯỜNG lat và lng, trường IP có thể chứa giá trị của bluetooth
    // https://localhost:8080/sensor?IDBUOIHOC=2&IDLSV=1&IP=127.0.0.1&lat=10.8489687&lng=106.7960183

    try {

      //cập nhật lại trạng thái điểm danh của sinh viên

      let updated = (await doRequest('http://localhost:8080/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { DADIEMDANH: true } }))
      if (updated == 0) { res.send("FAIL!! Sinh viên đã điểm danh trước đó"); return; }
      //phát hiện gian lận và cập nhật vào ghi chú nếu có
      let MAGV = (await doRequest('http://localhost:8080/BUOIHOC/GetList', { IDBUOIHOC: myobj.IDBUOIHOC }));
      MAGV = MAGV[0].IDLGVSUBMITTED;
      let studentPosition = { lat: myobj.lat, lng: myobj.lng };
      let giangVienPosition = io.getGiangVienPosition(MAGV);
      var GHICHU = cheatDetector.dectect(myobj.IDBUOIHOC, myobj.IP, giangVienPosition, studentPosition)
      if (GHICHU != "");
      await doRequest('http://localhost:8080/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { GHICHU } })


      res.send("SUCCESS!! Đã điểm danh 1 sinh viên || " + GHICHU);
    } catch (error) {
      res.send("FAIL!! " + error.message);
    }
  }

}

module.exports = new SensorControllers;