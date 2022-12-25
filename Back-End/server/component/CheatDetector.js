const locationCalc = require('../component/locationCalc');
const doRequest = require('../component/doRequest');

class CheatDetector {
  static listIPInBuoiHoc = {
  }
  addBuoiHoc(IDBUOIHOC) {
    if (!CheatDetector.listIPInBuoiHoc[IDBUOIHOC]) {
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
  dectect(IDBUOIHOC, IPorMAC, giangVienPosition, sinhVienPosition) {
    this.addBuoiHoc(IDBUOIHOC);
    //KHONG HỢP LỆ
    if (CheatDetector.listIPInBuoiHoc[IDBUOIHOC].includes(IPorMAC))
      return "WARN!!!: TRÙNG THIẾT BỊ ĐIỂM DANH"
    this.addIP(IDBUOIHOC, IPorMAC)
    if (!giangVienPosition || !giangVienPosition)
      return "";
    let distance = locationCalc(giangVienPosition, sinhVienPosition)
    //KHONG HỢP LỆ
    if (distance >= 100)
      return "WARN!!!: KHOẢNG CÁCH THIẾT BỊ KHÔNG HỢP LỆ: " + Math.round(distance) + " (m)";


    return "";
  }

}

module.exports = new CheatDetector;