const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./key.json');
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();


// init express
const express = require('express');
const app = express();

app.get('/insertSensorData', function (req, res) {
  var myobj = { ...req.query, time: getCurrentTime() };
  console.log(myobj);
  const docRef = db.collection('DemoLab2').doc(myobj.time);
  docRef.set(myobj);
  res.send("1 document inserted");

})

app.listen(80, function () {
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
