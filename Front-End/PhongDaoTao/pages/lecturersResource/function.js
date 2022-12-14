import { server } from "../../../components/server/main.js";

export function validateEmail(email) {
  var re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return re.test(email);
}

export function validateSDT(SDT) {
  var re = /^0[0-9]{8,9}$/;
  return re.test(SDT);
}

export function capTK(id) {
  let loaiTk = "";
  if (id.includes("GV")) {
    loaiTk = "GV";
  } else if (id.includes("SV")) {
    loaiTk = "SV";
  } else loaiTk = "PDT";
  let data = {
    TENDN: id,
    MATKHAU: id,
    LOAITK: loaiTk,
  };
  server.insert(server.tbl.TAIKHOAN, data).then((result) => {
    if(result)
    alert("Đã cấp tài khoản thành công")
    else
    alert("Cấp tài khoản thất bại")
  });
}

export function resetMK(id) {
  // let loaiTk = "";
  // if (id.includes("GV")) {
  //   loaiTk = "GV";
  // } else if (id.includes("SV")) {
  //   loaiTk = "SV";
  // } else loaiTk = "PDT";
  let data = {
    query: {
      TENDN: id,
    },
    newValue: {
      MATKHAU: id
    },
  };
  server.update(server.tbl.TAIKHOAN, data).then((result) => {
    if(result)
    alert("Reset mật khẩu thành công")
    else
    alert("Reset mật khẩu thất bại")
  });
}

export function newId(tbl){
  let input_add = document.querySelectorAll(".input-add");
  let id = 0
  if(tbl == 'GIANGVIEN'){
  server
  .getList(server.tbl.GIANGVIEN, {})
  .then((result) => {
    let list = result.sort((a,b)=>{
      if(a.MAGV< b.MAGV) return -1;
    return 1;
    })
    id = Number(list[list.length-1].MAGV.split('V')[1]) + Number(1)
    input_add[0].value = 'GV0'+ id
  });
}
if(tbl == 'SINHVIEN'){
  server
  .getList(server.tbl.SINHVIEN, {})
  .then((result) => {
    let list = result.sort((a,b)=>{
      if(a.MASV< b.MASV) return -1;
    return 1;
    })
    id = Number(list[list.length-1].MASV.split('V')[1]) + Number(1)
    input_add[1].value = 'SV0'+ id
  });
}
}
