const db = require('../component/MongoDB');
const collectionName = db.cls.LOPHOCPHAN
class LopHocPhanControllers {
  index(req, res) {
    res.send({ data: "connected to table LopHocPhan" });
  }
  getList(req, res) {
    db.find(collectionName, req.body)
      .then((rs) => { res.send(rs) })
  }
  delete(req, res) {
    db.delete(collectionName, req.body)
      .then((rs) => { res.send(rs) })
  }
  update(req, res) {
    db.update(collectionName, req.body.query, req.body.newValue);
  }
}

module.exports = new LopHocPhanControllers;