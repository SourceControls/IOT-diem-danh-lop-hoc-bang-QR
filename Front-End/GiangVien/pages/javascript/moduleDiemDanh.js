import { server } from "../../../components/server/main.js";

var btnDiemDanh = document.querySelector('.btn-start-diem-danh')
var tblDSDiemDanh = document.querySelector('.tabledd')

btnDiemDanh.onclick = async () => {
  //load list sinh viên của buổi học đó

  let idBuoiHoc = 40

  // let [buoiHoc,lopHocPhan,dssvThuocLopHocPhan] = await Promise.all([buoiHoc, lopHocPhan, dssvThuocLopHocPhan])
  let MALOPHP = (await server.getList(server.tbl.BUOIHOC, { IDBUOIHOC: idBuoiHoc }))[0].MALOPHP
  let dssv = await server.getList(server.tbl.CT_LOP_SV, { MALOPHP })
  console.log(dssv);
  tblDSDiemDanh.innerHTML = ''
  dssv.forEach(e => {
    tblDSDiemDanh.innerHTML += `
      
    `
  });
}
