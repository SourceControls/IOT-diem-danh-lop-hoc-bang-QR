const db = require('../component/MongoDB');

class PhongDaoTaoControllers {
  index(req, res) {
    res.send({ data: "connected to PhongDaoTao" });
  }
  getListGiangVien(req, res) {
    db.find(db.cls.GIANGVIEN, req.body)
      .then((rs) => { res.send(rs) })
  }
  deleteGiangVien(req, res) {
    db.delete(db.cls.GIANGVIEN, req.body)
      .then((rs) => { res.send(rs) })
  }
  updateGiangVien(req, res) {
    db.update(db.cls.GIANGVIEN, req.body.query, req.body.newValue);
  }
}

module.exports = new PhongDaoTaoControllers;