const MongoClient = require('mongodb').MongoClient;
const DBUri = "mongodb+srv://TuanHung:asd123456@mydb.wkc1cth.mongodb.net/test";
const dbName = "IOT-DIEMDANHQR";

const cls = {
  GIANGVIEN: "GIANGVIEN",
  LOPHOCPHAN: "LOPHOCPHAN",
  SINHVIEN: "SINHVIEN",
  TAIKHOAN: "TAIKHOAN",
  BUOIHOC: "BUOIHOC",
  CT_LOP_GV: "CT_LOP_GV",
  CT_DIEMDANH: "CT_DIEMDANH",
  CT_LOP_SV: "CT_LOP_SV",
}

class MongoDB {
  constructor() {
    this.cls = cls;
  }

  find = async (collectionName, query = {}) => {
    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      var rs = await dbo.collection(collectionName).find(query).toArray();
      console.log(rs);
      db.close();
      return new Promise((resolve, reject) => {
        resolve(rs);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  update(collectionName, query = {}, newValue = {}) {
    MongoClient.connect(DBUri, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      // var myquery = { MAGV: "GV02" };
      // var newValue = { $set: { HOTEN: "Bùi Tuấn Hùng",EMAIL:"hungbuituan1@gmail.com" } };
      dbo.collection(collectionName).updateOne(myquery, newValue, function (err, result) {
        if (err) throw err;
        db.close();

        return result;
      });
    });
  }
  delete(collectionName, query) {
    MongoClient.connect(DBUri, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      // var myquery = { MAGV: 'GV03' }; //SET ĐIỀU KIỆN
      dbo.collection(collectionName).deleteOne(myquery, function (err, result) {
        if (err) throw err;
        db.close();
        return result;
      });
    });
  }
}

module.exports = new MongoDB;