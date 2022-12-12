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
    MATKHAU: "123",
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
  let loaiTk = "";
  if (id.includes("GV")) {
    loaiTk = "GV";
  } else if (id.includes("SV")) {
    loaiTk = "SV";
  } else loaiTk = "PDT";
  let data = {
    query: {
      TENDN: id,
    },
    newValue: {
      MATKHAU: '123'
    },
  };
  server.update(server.tbl.TAIKHOAN, data).then((result) => {
    if(result)
    alert("Reset mật khẩu thành công")
    else
    alert("Reset mật khẩu thất bại")
  });
}
