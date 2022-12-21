import { server } from "../../../components/server/main.js";

var btnDiemDanh = document.querySelector('.btn-start-diem-danh')
var tblDSDiemDanh = document.querySelector('.tabledd')
var clockSpan = document.querySelector('.clock span')
var clockMinutes = 0;
var clockSeconds = 0;
var countDownInterval;
btnDiemDanh.onclick = async () => {
  //load list sinh viên của buổi học đó

  let idBuoiHoc = 40


  //init start time
  let STARTTIME = (new Date()).getHours() + ':' + (new Date()).getMinutes()
  await server.update(server.tbl.BUOIHOC, {
    query: { IDBUOIHOC: idBuoiHoc }, newValue: {
      STARTTIME
    }
  })
  clockSpan.innerText = "15:00";
  clockMinutes = 0;
  clockSeconds = 5;
  countDownInterval = setInterval(() => {
    if (clockMinutes == 0 && clockSeconds == 0)
      return;
    clockSeconds -= 1;
    if (clockSeconds == 0) {
      clockMinutes -= 1;
      clockSeconds = 59;
    }
    if (clockMinutes == -1) {
      clockMinutes = 0;
      clockSeconds = 0;
      btnDiemDanh.disabled = true;
      clearInterval(countDownInterval);
    }
    clockSpan.innerText = 'Thời gian còn lại: ' + clockMinutes + ':' + clockSeconds;
  }, 1000);

  let MALOPHP = (await server.getList(server.tbl.BUOIHOC, { IDBUOIHOC: idBuoiHoc }))[0].MALOPHP
  let dsMSV = await server.getList(server.tbl.CT_LOP_SV, { MALOPHP })
  let dssv = await server.getList(server.tbl.SINHVIEN, {});
  let strdsMSV = ''
  let dssvCuaLopHoc = []
  dsMSV.forEach((e) => {
    strdsMSV += dsMSV.MASV;
  })
  dssv.forEach((e) => {
    if (strdsMSV.includes(dssv.MASV)) {
      dssvCuaLopHoc.push(e)
    }
  })

  tblDSDiemDanh.innerHTML = ''
  dssvCuaLopHoc.forEach(e => {
    tblDSDiemDanh.innerHTML += `
                    <tr>
                    <td>${e.MASV}</td>
                    <td>${e.HOTEN}</td>
                    <td>Vắng</td>
                    <td></td>
                    <td>${e.SDT}</td>
                    <td>${e.EMAIL}</td>
                    <td>
                    <button class="btn btn-success btn-sm mb-0 w-100 btn-huy-diem-danh" id="${e.MASV}">Đánh Vắng</button>
                    </td>
                  </tr>
    `
  });
}
