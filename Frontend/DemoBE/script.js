import socket from '../socket/main.js'  //không cần import

import { server } from '../server/main.js' //phải import cái này

//GET
//query để trống thì nó match all
//match những tài khoản có tên đăng nhập là GV01, có thể sử dụng regular expression

// let data = {
//   TENDN: 'GV01'
// };

//result là 1 mảng object, có 0-n phần tử
// server.getList(server.tbl.TAIKHOAN, data).then((result) => {
//   console.log(result);
// })


//INSERT
//Insert tài khoản vào bảng tài khoản

// let data = {
//   TENDN: 'GV10',
//   MATKHAU: '123@123',
//   LOAITK: 'GV'
// };

//result là 1 boolean, true = thành công.
// server.insert(server.tbl.TAIKHOAN, data).then((result) => {
//   console.log(result);
// })


//UPDATE
//Cần phải có phần query và phần newValue
// let data = {
//   query: {
//     TENDN: 'GV10',
//   },
//   newValue: {
//     MATKHAU: '123@121',
//     LOAITK: 'GV'
//   }
// };

//result = boolean, true = đã có 1 dòng dữ liệu được update, false = 0 dòng được update
// server.update(server.tbl.TAIKHOAN, data).then((result) => {
//   console.log(result);
// })

//DELETE
// let data = {
//   TENDN: 'GV10'
// };

//result = boolean, true = đã có 1 dòng dữ liệu được xóa, false = 0 dòng được xóa
// server.delete(server.tbl.TAIKHOAN, data).then((result) => {
//   console.log(result);
// })

