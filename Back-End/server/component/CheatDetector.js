const locationCalc = require('../component/locationCalc');
const doRequest = require('../component/doRequest');

class CheatDetector {
  static listIPInBuoiHoc = {
    BUOI01: ["127.0.0.1"]
  }
  addBuoiHoc(IDBUOIHOC) {
    if (!CheatDetector.listIPInBuoiHoc.hasOwnProperty(IDBUOIHOC)) {
      CheatDetector.listIPInBuoiHoc[IDBUOIHOC] = [];
    }
  }
  removeBuoiHoc(IDBUOIHOC) {
    if (CheatDetector.listIPInBuoiHoc.hasOwnProperty(IDBUOIHOC)) {
      delete CheatDetector.listIPInBuoiHoc[IDBUOIHOC];
    }
  }
  addIP(IDBUOIHOC, IPorMAC) {

    if (!CheatDetector.listIPInBuoiHoc[IDBUOIHOC].includes(IPorMAC)) {
      CheatDetector.listIPInBuoiHoc[IDBUOIHOC].push(IPorMAC);
    }
  }
  dectect(IDBUOIHOC, IPorMAC, giangVienPosition, studentPosition) {
    this.addBuoiHoc(IDBUOIHOC);

    //KHONG HỢP LỆ
    if (CheatDetector.listIPInBuoiHoc[IDBUOIHOC].includes(IPorMAC))
      return "WARN!!!: TRÙNG THIẾT BỊ ĐIỂM DANH"

    let distance = locationCalc(giangVienPosition, studentPosition)
    //KHONG HỢP LỆ
    if (distance >= 100)
      return "WARN!!!: KHOẢNG CÁCH THIẾT BỊ KHÔNG HỢP LỆ: " + Math.round(distance) + " (m)";

    //HỢP LỆ
    this.addIP(IDBUOIHOC, IPorMAC)
    return "";
  }

}

module.exports = new CheatDetector;