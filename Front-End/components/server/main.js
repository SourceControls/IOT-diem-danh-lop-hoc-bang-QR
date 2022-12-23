import excute from "./Excutor.js";
import funct from "./Funct.js";
const domain = "http://localhost:8080"

class Server {
  funct = funct;
  tbl = {
    GIANGVIEN: "GiangVien",
    LOPHOCPHAN: "LopHocPhan",
    SINHVIEN: "SinhVien",
    TAIKHOAN: "TaiKhoan",
    BUOIHOC: "BuoiHoc",
    CT_LOP_GV: "CT_LOP_GV",
    CT_LOP_SV: "CT_LOP_SV",
    CT_DIEMDANH: "CT_DiemDanh"
  };
  getList(tbl, data) {
    let api = `${domain}/${tbl}/GetList`
    return excute(api, data)
  }
  insert(tbl, data) {
    let api = `${domain}/${tbl}/Insert`
    return excute(api, data)
  }
  update(tbl, data) {
    let api = `${domain}/${tbl}/Update`
    return excute(api, data)
  }
  delete(tbl, data) {
    let api = `${domain}/${tbl}/Delete`
    return excute(api, data)
  }
}

const server = new Server();

export { server };

// let insertData = {
//   MAGV: 'GV01',
//   HOTEN: 'Bùi Tuấn Hùng',
//   EMAIL: 'Hungbuituan1@gmail.com',
//   SDT: '0973343541'
//  } 


