
var time = document.querySelector('#time');
var msv = document.querySelector('#msv');
var lhp = document.querySelector('#lhp');
var serverUrl = "http://localhost:80/";


var socket = io.connect(serverUrl);

socket.on('updateData', function (msg) {
  console.log(msg);
  time.innerText = msg.time;
  msv.innerText = msg.MSV;
  lhp.innerText = msg.LHP;
});

setInterval(() => {
  console.log(socket);
}, 1000);

