
const phongDaoTaoRouters = require('./PhongDaoTao.routes');
const siteRouters = require('./sites.routes');

function routes(app) {

  app.use('/PhongDaoTao', phongDaoTaoRouters);




  app.get('/insertSensorData', function (req, res) {
    var myobj = { ...req.query, time: getCurrentTime() };
    console.log(myobj);
    // io.emit('updateData', myobj);
    // MongoClient.connect(url, function (err, db) {
    // if (err) throw err;
    // var dbo = db.db(dbName);
    // http://localhost:80/insertSensorData?MSV=N19DCCN069&LHP=LHP01
    // dbo.collection(collectionName).insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });
    res.send("insertSensorData");
  })


  app.get('/', siteRouters);

}

module.exports = routes;