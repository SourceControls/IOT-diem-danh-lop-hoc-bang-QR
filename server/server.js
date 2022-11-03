var path = require('path');
// init mongoBD
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://TuanHung:asd123456@mydb.wkc1cth.mongodb.net/test";
const dbName = "IOT-DIEMDANHQR";
const collectionName = "NhietDoDoAm";

// init express
const express = require('express');
const app = express();
// init socket
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const publicPath = path.join(__dirname, "../public");
// app.use(express.static(publicPath));

//route insert NhietDoDoAm to mongoDB
app.get('/insertSensorData', function (req, res) {
    var myobj = { ...req.query, time: getCurrentTime() };
    console.log(myobj);
    io.emit('updateData', myobj);
    // MongoClient.connect(url, function (err, db) {
    // if (err) throw err;
    // var dbo = db.db(dbName);
    // http://localhost:80/insertSensorData?MSV=N19DCCN069&LHP=LHP01
    // var myobj = { ...req.query, time: getCurrentTime() };
    // console.log(myobj);
    // io.emit('updateData', myobj);
    // dbo.collection(collectionName).insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });
    // });

    res.send("1 document inserted");



})

app.get('/', function (req, res) {
    //read data from mongoDB
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db(dbName);
    //     dbo.collection(collectionName).findOne({}, function (err, result) {
    //         if (err) throw err;
    //         res.send(result);
    //         db.close();
    //     });
    // });
    let date_ob = new Date();

    res.sendFile(publicPath + '/index1.html');
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(80, function () {
    console.log("Your app running");
})



function getCurrentTime() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}