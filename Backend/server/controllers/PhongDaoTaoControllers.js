const db = require('../component/MongoDB');

class PhongDaoTaoControllers {
  index(req, res) {
    res.send({ data: "connected to PhongDaoTao" });
  }
  getListGiangVien(req, res) {
    console.log(JSON.parse());
    // console.log(req.query.QUERY);
    // db.find(db.cls.GIANGVIEN, req.query)
    // .then((rs) => { res.send(rs) })
  }
  deleteGiangVien(req, res) {
    db.delete(db.cls.GIANGVIEN, req.query)
      .then((rs) => { res.send(rs) })
  }
  updateGiangVien(req, res) {
    db.update(db.cls.GIANGVIEN, req.query.query, req.query.newValue);
  }
}

module.exports = new PhongDaoTaoControllers;