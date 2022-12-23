const io = require('../component/IO');
const doRequest = require('../component/doRequest');
const cheatDetector = require('../component/CheatDetector');
const e = require('express');
class SensorControllers {
  diemDanhBangBluetooth = async (res, myobj) => {
    // http://localhost:8080/sensor?MSV=2&IP=127.0.0.1

    let BUOIHOC = (await doRequest('http://localhost:8080/BUOIHOC/GetList', {}));
    if (!BUOIHOC) {
      res.send("Không có buổi học đang diễn ra")
      return;
    }
    //======bug chưa fix: nếu đang có nhiều buổi học đang diễn ra thì chạy sai.
    BUOIHOC = BUOIHOC.filter(e => !e.SUBMITTED && e.STARTTIME)[0];
    let dsCTDDTheoBuoi = await doRequest('http://localhost:8080/CT_DiemDanh/GetList', { IDBUOIHOC: BUOIHOC.IDBUOIHOC });
    let IDLSVTheoMASV = (await doRequest('http://localhost:8080/CT_LOP_SV/GetList', { MASV: myobj.MASV, MALOPHP: BUOIHOC.MALOPHP }))[0];
    if (!IDLSVTheoMASV) {
      res.send("Sinh viên này không thuộc lớp đang diễn ra")
      return;
    }
    IDLSVTheoMASV = IDLSVTheoMASV.IDLSV
    let CTDDTheoMASV = dsCTDDTheoBuoi.filter(e => e.IDLSV == IDLSVTheoMASV)[0];
    if (CTDDTheoMASV.DADIEMDANH) {
      res.send("Sinh viên này đã điểm danh")
      return;
    }
    //check xem buổi học đó còn điểm danh được không
    if (BUOIHOC.SUBMITTED || !BUOIHOC.STARTTIME) {
      console.log(BUOIHOC.SUBMITTED, BUOIHOC.STARTTIME);
      res.send("Bluetooth FAIL!! Ngoài giờ điểm danh1"); return;
    }
    let currentHour = (new Date()).getHours();
    let currentMinutes = (new Date()).getMinutes();
    let [buoiHocHour, buoiHocMinutes] = BUOIHOC.STARTTIME.split(':');
    let totalCurrentMinutes = parseInt(currentHour) * 60 + parseInt(currentMinutes);
    let totalBuoiHocMinutes = parseInt(buoiHocHour) * 60 + parseInt(buoiHocMinutes);
    //đã quá 15 phút
    if ((totalCurrentMinutes - totalBuoiHocMinutes) >= 15) {
      (await doRequest('http://localhost:8080/BUOIHOC/Update', { query: { IDBUOIHOC: BUOIHOC.IDBUOIHOC }, newValue: { SUBMITTED: true } }))
      res.send("Bluetooth FAIL!! Ngoài giờ điểm danh2"); return;
    }
    //cập nhật lại trạng thái điểm danh của sinh viên
    (await doRequest('http://localhost:8080/CT_DiemDanh/Update', { query: { IDBUOIHOC: BUOIHOC.IDBUOIHOC, IDLSV: IDLSVTheoMASV }, newValue: { DADIEMDANH: true } }))


    var GHICHU = cheatDetector.dectect(BUOIHOC.IDBUOIHOC, myobj.IP)
    if (GHICHU != "");
    await doRequest('http://localhost:8080/CT_DiemDanh/Update', { query: { IDBUOIHOC: BUOIHOC.IDBUOIHOC, IDLSV: IDLSVTheoMASV }, newValue: { GHICHU } })
    require('../server')(IDLSVTheoMASV, BUOIHOC.IDBUOIHOC, GHICHU);
    res.send("SUCCESS!! Đã điểm danh 1 sinh viên || " + GHICHU);
  }
  //điểm danh bằng QR.
  insertSensorData = async (req, res) => {
    var myobj = { ...req.query };
    if (!myobj.IDBUOIHOC) {
      this.diemDanhBangBluetooth(res, myobj);
      return;
    }
    //diem danh bang QR
    myobj.IDBUOIHOC = parseInt(myobj.IDBUOIHOC)
    myobj.IDLSV = parseInt(myobj.IDLSV)
    console.log("SensorData: ", myobj);
    //BLUETOTH CÓ THỂ BỎ QUA TRƯỜNG lat và lng, trường IP có thể chứa giá trị của bluetooth
    //khoảng cách ở nhà 230/14-manthieejn
    // http://localhost:8080/sensor?IDBUOIHOC=2&IDLSV=1&IP=127.0.0.1&lat=10.848936&lng=106.795772

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
        res.send("FAIL!! Ngoài giờ điểm danh"); return;
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