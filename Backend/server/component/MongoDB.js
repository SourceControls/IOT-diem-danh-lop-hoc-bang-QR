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
      db.close();
      return new Promise((resolve, reject) => {
        resolve(rs);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  update = async (collectionName, query = {}, newValue = {}) => {
    newValue = { $set: newValue };
    console.log(newValue);
    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      var rs = await dbo.collection(collectionName).updateOne(query, newValue);
      db.close();
      return new Promise((resolve, reject) => {
        resolve(rs);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  delete = async (collectionName, query) => {
    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      var rs = await dbo.collection(collectionName).deleteOne(query);
      db.close();
      return new Promise((resolve, reject) => {
        resolve(rs);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new MongoDB;