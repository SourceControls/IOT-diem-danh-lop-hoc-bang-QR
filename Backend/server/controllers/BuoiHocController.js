const db = require('../component/MongoDB');
const collectionName = db.cls.BUOIHOC
class BuoiHocControllers {
  index(req, res) {
    res.send({ data: "connected to table BuoiHoc" });
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

module.exports = new BuoiHocControllers;