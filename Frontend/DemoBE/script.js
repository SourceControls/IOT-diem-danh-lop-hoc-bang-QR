
var content = document.querySelector('.content');
var socket = io.connect("localhost");

socket.on('connected', function (msg) {
  console.log(msg, { io });
  // time.innerText = msg.time;
  // msv.innerText = msg.MSV;
  // lhp.innerText = msg.LHP;
});

// let updateData = {
//   query: {
//     MAGV: 'GV02',
//     HOTEN: 'Bùi Tuấn Hùng 1'
//   },
//   newValue: {
//     EMAIL: 'hungbuituan2@gmail.com'
//   }
// };

// let deleteData = {
//   MAGV: 'GV03'
// }

// let getData = {
//    MAGV: 'GV01',
// };
console.log(content.innerText);

fetch("http://localhost/CT_DiemDanh/GetList", {
  method: "POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
}).then(res => {
  return res.json();
}).then(res => {
  content.innerText = JSON.stringify(res);
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
