
class Funct {
  taoDanhSachDiemDanh = async (MALOPHP, IDBUOIHOC) => {
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
const funct = new Funct;
export default funct;
