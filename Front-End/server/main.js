import excute from "./Excutor.js";
const domain = "localhost"

class Server {
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
    let api = `http://${domain}/${tbl}/GetList`
    return excute(api, data)
  }
  insert(tbl, data) {
    let api = `http://${domain}/${tbl}/Insert`
    return excute(api, data)
  }
  update(tbl, data) {
    let api = `http://${domain}/${tbl}/Update`
    return excute(api, data)
  }
  delete(tbl, data) {
    let api = `http://${domain}/${tbl}/Delete`
    return excute(api, data)
  }
  fuct = {
    taoDanhSachDiemDanh: async (MALOPHP, IDBUOIHOC) => {
      let dsLSV = (await this.getList(this.tbl.CT_LOP_SV, { MALOPHP }));
      let dsCT_DiemDanh = [];
      dsLSV.forEach(e => {
        dsCT_DiemDanh.push({
          IDBUOIHOC,
          IDLSV: e.IDLSV,
          DADIEMDANH: false,
          GHICHU: "",
        });
      });
      if (await this.insert(this.tbl.CT_DIEMDANH, dsCT_DiemDanh)) {
        console.log(await this.getList(this.tbl.CT_DIEMDANH, { IDBUOIHOC }));
      }
    }
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


