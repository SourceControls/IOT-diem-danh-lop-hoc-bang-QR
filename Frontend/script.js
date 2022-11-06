
var time = document.querySelector('#time');
var msv = document.querySelector('#msv');
var lhp = document.querySelector('#lhp');
var socket = io.connect("localhost");

socket.on('connected', function (msg) {
  console.log(msg, { io });
  // time.innerText = msg.time;
  // msv.innerText = msg.MSV;
  // lhp.innerText = msg.LHP;
});


fetch("http://localhost/PhongDaoTao/GetListGiangVien?QUERY='{'MAGV'='GV01','HOTEN'='Bùi Tuấn Hùng'}'&HOTEN=Bùi Tuấn Hùng&Email= hungbuituan1@gmail.com").then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);
}).catch(function () {
  console.log("OOP!!");
});
