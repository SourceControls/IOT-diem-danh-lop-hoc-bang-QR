
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

let updateData = {
  query: {
    MAGV: 'GV02',
    HOTEN: 'Bùi Tuấn Hùng 1'
  },
  newValue: {
    EMAIL: 'hungbuituan2@gmail.com'
  }
};

let deleteData = {
  MAGV: 'GV03'
}

let getData = {
  // MAGV: 'GV01',
  // HOTEN: 'Bùi Tuấn Hùng'
};

fetch("http://localhost/PhongDaoTao/deleteGiangVien", {
  method: "POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(getData)
}).then(res => {
  return res.json();
}).then(res => {
  console.log("Request complete! response:", res);  //res là object mà server trả về
}).catch(function () {
  console.log("OOP!!");
});

// fetch("http://localhost/PhongDaoTao/GetListGiangVien?QUERY='{'MAGV'='GV01','HOTEN'='Bùi Tuấn Hùng'}'&HOTEN=Bùi Tuấn Hùng&Email= hungbuituan1@gmail.com").then(function (response) {
//   return response.json();
// }).then(function (data) {
//   console.log(data);
// }).catch(function () {
//   console.log("OOP!!");
// });
