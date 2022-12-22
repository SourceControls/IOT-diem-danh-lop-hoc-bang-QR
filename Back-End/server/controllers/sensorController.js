const io = require('../component/IO');
const doRequest = require('../component/doRequest');
const cheatDetector = require('../component/CheatDetector');
class SensorControllers {

  //điểm danh bằng QR.
  insertSensorData = async (req, res) => {
    var myobj = { ...req.query };
    myobj.IDBUOIHOC = parseInt(myobj.IDBUOIHOC)
    myobj.IDLSV = parseInt(myobj.IDLSV)
    console.log("SensorData: ", myobj);
    //BLUETOTH CÓ THỂ BỎ QUA TRƯỜNG lat và lng, trường IP có thể chứa giá trị của bluetooth
    //khoảng cách ở nhà 230/14-manthieejn
    // https://localhost:8080/sensor?IDBUOIHOC=2&IDLSV=1&IP=127.0.0.1&lat=10.848936&lng=106.795772

    //khoảng cách ở trường
    // http://localhost:8080/sensor?IDBUOIHOC=2&IDLSV=2&IP=127.0.0.1&lat=10.848085&lng=106.786452
    try {


      let BUOIHOC = (await doRequest('http://localhost:8080/BUOIHOC/GetList', { IDBUOIHOC: myobj.IDBUOIHOC }))[0];

      //check xem buổi học đó còn điểm danh được không
      if (BUOIHOC.SUBMITTED || !BUOIHOC.STARTTIME) {
        console.log(BUOIHOC.SUBMITTED, BUOIHOC.STARTTIME);
        res.send("FAIL!! Ngoài giờ điểm danh 1"); return;
      }
      let currentHour = (new Date()).getHours();
      let currentMinutes = (new Date()).getMinutes();
      let [buoiHocHour, buoiHocMinutes] = BUOIHOC.STARTTIME.split(':');
      let totalCurrentMinutes = parseInt(currentHour) * 60 + parseInt(currentMinutes);
      let totalBuoiHocMinutes = parseInt(buoiHocHour) * 60 + parseInt(buoiHocMinutes);
      //đã quá 15 phút
      if ((totalCurrentMinutes - totalBuoiHocMinutes) >= 15) {
        res.send("FAIL!! Ngoài giờ điểm danh 3"); return;
      }
      //cập nhật lại trạng thái điểm danh của sinh viên
      let updated = (await doRequest('http://localhost:8080/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { DADIEMDANH: true } }))

      if (updated == 0) { res.send("FAIL!! Sinh viên đã điểm danh trước đó"); return; }
      //phát hiện gian lận và cập nhật vào ghi chú nếu có

      let MAGV = BUOIHOC.IDLGVSUBMITTED;
      let studentPosition = { lat: myobj.lat, lng: myobj.lng };
      let giangVienPosition = io.getGiangVienPosition(MAGV);
      var GHICHU = cheatDetector.dectect(myobj.IDBUOIHOC, myobj.IP, giangVienPosition, studentPosition)
      if (GHICHU != "");
      await doRequest('http://localhost:8080/CT_DiemDanh/Update', { query: { IDBUOIHOC: myobj.IDBUOIHOC, IDLSV: myobj.IDLSV }, newValue: { GHICHU } })

      //điểm gửi tin nhắn về cho client thông tin điểm danh
      require('../server')(myobj.IDLSV, myobj.IDBUOIHOC, GHICHU);
      res.send("SUCCESS!! Đã điểm danh 1 sinh viên || " + GHICHU);
    } catch (error) {
      res.send("FAIL!! " + error.message);
    }
  }

}

module.exports = new SensorControllers;