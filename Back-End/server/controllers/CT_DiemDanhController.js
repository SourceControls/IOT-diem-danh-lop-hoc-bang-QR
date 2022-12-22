const db = require('../component/MongoDB');
const collectionName = db.cls.CT_DIEMDANH
class CT_DiemDanhControllers {
  index(req, res) {
    res.send({ data: "connected to table CT_DiemDanh" });
  }
  getList(req, res) {
    db.find(collectionName, req.body)
      .then((rs) => { res.send(rs) })
  }
  insert(req, res) {
    db.insert(collectionName, req.body)
      .then((rs) => { res.send(rs) })
  }
  delete(req, res) {
    db.delete(collectionName, req.body)
      .then((rs) => { res.send(rs) })
  }
  update(req, res) {
    db.update(collectionName, req.body.query, req.body.newValue, true)
      .then((rs) => { res.send(rs) });
  }
}

module.exports = new CT_DiemDanhControllers;