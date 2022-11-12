const MongoClient = require('mongodb').MongoClient;
const DBUri = "mongodb+srv://TuanHung:asd123456@mydb.wkc1cth.mongodb.net/test";
const dbName = "IOT-DIEMDANHQR";

class MongoDB {
  cls = {
    GIANGVIEN: "GIANGVIEN",
    LOPHOCPHAN: "LOPHOCPHAN",
    SINHVIEN: "SINHVIEN",
    TAIKHOAN: "TAIKHOAN",
    BUOIHOC: "BUOIHOC",
    CT_LOP_GV: "CT_LOP_GV",
    CT_DIEMDANH: "CT_DIEMDANH",
    CT_LOP_SV: "CT_LOP_SV",
  }
  insert = async (collectionName, query = {}) => {
    if (Array.isArray(query))
      if (Object.keys(query).length === 0)
        return false;

    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      if (Array.isArray(query))
        var rs = await dbo.collection(collectionName).insertMany(query);
      else
        var rs = await dbo.collection(collectionName).insertOne(query);
      db.close();
      console.log("Inserted: ", rs);
      return new Promise((resolve, reject) => {
        if (Array.isArray(query))
          resolve(rs.insertedIds != null);
        else
          resolve(rs.insertedId != null);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  find = async (collectionName, query = {}) => {
    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      var rs = await dbo.collection(collectionName).find(query, { projection: { _id: 0 } }).toArray();
      db.close();
      console.log("Found: ", rs);
      return new Promise((resolve, reject) => {
        resolve(rs);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  update = async (collectionName, query = {}, newValue = {}) => {
    if (Object.keys(query).length === 0 || Object.keys(newValue).length === 0)
      return false;
    newValue = { $set: newValue };
    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      var rs = await dbo.collection(collectionName).updateOne(query, newValue);
      db.close();
      console.log("Updated: ", rs);
      return new Promise((resolve, reject) => {
        resolve(rs.modifiedCount != 0);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  delete = async (collectionName, query) => {
    if (Object.keys(query).length === 0)
      return false;
    try {
      var db = await MongoClient.connect(DBUri);
      var dbo = db.db(dbName);
      var rs = await dbo.collection(collectionName).deleteOne(query);
      db.close();
      console.log("Deleted: ", rs);
      return new Promise((resolve, reject) => {
        resolve(rs.deletedCount != 0);
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new MongoDB;