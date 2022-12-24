import { server } from '../../../components/server/main.js'

function hidePopUp(pop_up) {
  const modal = document.querySelector('.modal-backdrop')
  console.log(modal)
  pop_up.forEach((popup) => {
    if (popup.classList.contains("show")) {
      modal.classList.remove("show")
      popup.classList.remove("show")
    }
  })
}

async function isExistLhp(data) {
  const lhp = await server.getList(server.tbl.LOPHOCPHAN, { MALOPHP: data }).then(result => {
    return result.length
  })
  return lhp > 0 ? true : false
}

async function isExistGv(data) {
  const gv = await server.getList(server.tbl.GIANGVIEN, { MAGV: data }).then(result => {
    return result.length
  })
  return gv > 0 ? true : false
}

async function isExistBuoiHoc(data) {
  const buoiHoc = await server.getList(server.tbl.BUOIHOC, { MALOPHP: data }).then(result => {
    return result.length
  })
  return buoiHoc > 0 ? true : false
}

async function isExistSv(data) {
  const sv = await server.getList(server.tbl.CT_LOP_SV, data).then(result => {
    return result.length
  })
  return sv > 0 ? true : false
}

async function isExistDiemDanh(data) {
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_DIEMDANH, {});
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.BUOIHOC, data);
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1])
  let newArr = []
  let [dd, bh] = [...x]
  // const dd = await server.getList(server.tbl.CT_DIEMDANH, data).then(result => {
  //   return result.length
  // })
  let check = false
  for (let i of bh) {
    if (check) continue
    for (let j of dd) {
      if (i.IDBUOIHOC == j.IDBUOIHOC) {
        check = true
      }
    }
  }
  return check
}


async function getMaxIdLgv() {
  const id = await server.getList(server.tbl.CT_LOP_GV, {}).then(result => {
    return Math.max(...result.map(idLgv => idLgv.IDLGV))
  })
  return id
}

async function getMaxIdLsv() {
  const id = await server.getList(server.tbl.CT_LOP_SV, {}).then(result => {
    return Math.max(...result.map(idLsv => idLsv.IDLSV))
  })
  return id
}

async function getMaxIdBh() {
  const id = await server.getList(server.tbl.BUOIHOC, {}).then(result => {
    return Math.max(...result.map(idBh => idBh.IDBUOIHOC))
  })
  return id
}

async function getCtDiemDanh(data) {
  const ct = await server.getList(server.tbl.CT_DIEMDANH, data).then(result => {
    return result
  })
  return ct
}

async function loadListLgv(data = {}) {
  const lgv = server.getList(server.tbl.CT_LOP_GV, data).then((result) => {
    return result
  })
  return lgv
}

async function loadListGv(data = {}) {
  const gv = server.getList(server.tbl.GIANGVIEN, data).then(result => {
    return result
  })
  return gv
}

async function loadListSv(data = {}) {
  const sv = server.getList(server.tbl.SINHVIEN, data).then(result => {
    return result
  })
  return sv
}

async function loadListDd(data = {}) {
  const dd = server.getList(server.tbl.CT_DIEMDANH, data).then(result => {
    return result
  })

  return dd
}


async function getListLsv(data = {}) {
  let arrSv = []
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_LOP_SV, data);
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.SINHVIEN, {});
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1])
  let [lhp, sv] = [...x]
  // const lhp = await server.getList(server.tbl.CT_LOP_SV, data).then(result => {
  //   return result
  // })
  // let sv = await loadListSv()
  for (let i of lhp) {
    for (let j of sv) {
      if (i.MASV == j.MASV) {
        arrSv.push({ ...i, ...j })
      }
    }
  }
  return arrSv
}


async function getIdLsv(data) {
  const lhp = await server.getList(server.tbl.CT_LOP_SV, data).then(result => {
    return result[0].IDLSV
  })
  return lhp
}

async function getListDd(data = {}) {
  let arrDd = []
  // let newArr = []
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_DIEMDANH, data)
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_LOP_SV, {})
    resolve(x)
  })
  const prm2 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.SINHVIEN, {});
    resolve(x)
  })
  const prm3 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.BUOIHOC, data);
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1, prm2, prm3])
  let [ct, idlsv, sv, bh] = [...x]
  let t = []
  for (let i of ct) {
    for (let j of idlsv) {
      if (i.IDLSV == j.IDLSV) {
        t.push({ ...i, ...j })
        break
      }
    }
  }
  for (let i of t) {
    for (let j of sv) {
      if (i.MASV == j.MASV) {
        arrDd.push({ ...i, ...j })
        break
      }
    }
  }
  console.log(arrDd)
  return [arrDd, bh.length]
}


async function getAllDd(data) {
  let newArr = []
  let dsdd = []
  let sv = []
  // const bh = await server.getList(server.tbl.BUOIHOC, data).then(result => {
  //   return result
  // })
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.BUOIHOC, data)
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_DIEMDANH, {})
    resolve(x)
  })
  const prm2 = new Promise((resolve, rejects) => {
    let x = getListLsv()
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1, prm2])
  let [bh, dd, dtsv] = [...x]
  console.log(x)
  let tr3 = []
  for (let i of bh) {
    for (let j of dd) {
      if (i.IDBUOIHOC == j.IDBUOIHOC) {
        newArr.push(j)
      }
    }
  }
  let checked = []
  for (let i = 0; i < newArr.length - 1; i++) {
    let dd = []
    if (checked.includes(newArr[i].IDLSV)) continue
    for (let j = i + 1; j < newArr.length; j++) {
      if (newArr[i].IDLSV == newArr[j].IDLSV) {
        dd.push(newArr[j].DADIEMDANH)
      }
    }
    dd.unshift(newArr[i].DADIEMDANH)
    dsdd.push({
      IDLSV: newArr[i].IDLSV,
      BUOI: dd,
    })
    checked.push(newArr[i].IDLSV)
  }
  for (let i of dsdd) {
    for (let j of dtsv) {
      if (i.IDLSV == j.IDLSV) {
        let data = [{
          MASV: j.MASV,
          HOTEN: j.HOTEN,
          BUOI: i.BUOI
        }]
        sv.push(...data)
      }
    }
  }
  return [sv, sv.length]
}

// console.log(await getAllDd({MALOPHP: 'MALOP01'}))


async function getListLhp(data = {}) {
  let newArr = []
  // const lhp = await server.getList(server.tbl.LOPHOCPHAN, data).then((result) => {
  //   return result
  // })
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.LOPHOCPHAN, data);
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_LOP_GV, {});
    resolve(x)
  })
  const prm2 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.GIANGVIEN, {});
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1, prm2])
  console.log(x)
  let [lhp, lgv, gv] = [...x]
  let a = []
  let b = []
  for (let i of lhp) {
    let check = false
    for (let j of lgv) {
      if (i.MALOPHP == j.MALOPHP) {
        check = true
        a.push({ ...i, ...j })
      }
    }
    if (!check) {
      a.push({ ...i })
    }
  }
  for (let i of a) {
    let check = false
    for (let j of gv) {
      if (i.MAGV == j.MAGV) {
        check = true
        b.push({ ...i, ...j })
      }
    }
    if (!check) {
      b.push({ ...i })
    }
  }
  let checked = []
  for (let i = 0; i < b.length; i++) {
    let dd = []
    if (checked.includes(b[i].MALOPHP)) continue
    for (let j = i + 1; j < b.length; j++) {
      if (b[i].MALOPHP == b[j].MALOPHP) {
        dd.push(b[j].HOTEN)
      }
    }
    dd.unshift(b[i].HOTEN)
    newArr.push({
      MALOPHP: b[i].MALOPHP,
      TENLOP: b[i].TENLOP,
      TENMH: b[i].TENMH,
      GV: dd
    })
    checked.push(b[i].MALOPHP)
  }

  return newArr
}
async function checkConstraintDelLhp(MALOPHP) {
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.BUOIHOC, { MALOPHP: MALOPHP });
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_DIEMDANH,);
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1])
  let [bh, dd] = [...x]
  let check = false
  for(let i of bh){
    for(let j of dd){
      if(i.IDBUOIHOC == j.IDBUOIHOC){
        check = true
        break
      }
    }
  }

  return check
}


async function getListBh(data = {}) {
  const bh = await server.getList(server.tbl.BUOIHOC, data).then(result => {
    return result
  })
  return bh
}


async function loadList(KEY) {
  let lhp1 = await getListLhp(KEY)
  const tblLopHocPhan = document.querySelector('.tbl-lhp')
  tblLopHocPhan.innerHTML = ""
  lhp1.map(e => {
    tblLopHocPhan.innerHTML += `
                   <tr id="${e.MALOPHP}">
                      <td>${e.MALOPHP}</td>
                      <td>${e.TENLOP}</td>
                      <td>${e.TENMH}</td>
                      <td>${e.GV.length == 2 ? e.GV[0] + "</br>" + e.GV[1] : e.GV}</td>
                      <td class="align-middle">
                      <button type="button" class="btn btn-outline-primary btn-xs mb-0 edit btn-edit" data-bs-toggle="modal" data-bs-target="#editModal">Cập nhật</button>
                      <button type="button" class="btn btn-outline-danger btn-xs mb-0 delete btn-del" data-bs-toggle="modal" data-bs-target="#deleteLhp">Xóa</button>
                      <button type="button" class="btn btn-outline-dark btn-xs mb-0 dssv btn-dssv" data-bs-toggle="modal" data-bs-target="#dssv">DSSV</button>
                      <button type="button" class="btn btn-outline-success btn-xs mb-0 view btn-qlbh" data-bs-toggle="modal" data-bs-target="#viewModal">Quản lý buổi học</button>
                    </td>
                    </tr>
        `
  })
}


async function getListGv(data) {
  const tbdGV = document.querySelector('.tbdGV')
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_LOP_GV, data);
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.GIANGVIEN, {});
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1])
  let [lgv, gv] = [...x]
  console.log(lgv)
  console.log(gv)
  tbdGV.innerHTML = ""
  let newArr = []
  for (let i of gv) {
    let count = 0
    for (let j of lgv) {
      if (i.MAGV == j.MAGV) {
        count++
      }
    }
    if (count == 0) newArr.push(i)
  }
  newArr.forEach(e => {
    tbdGV.innerHTML += `
    <tr id="${e.MAGV}">
    <td class="ps-0">${e.MAGV}</td>
    <td>${e.HOTEN}</td>
    <td>
      <button type="button" class="btn btn-success btn-xs mb-0 addGV">Thêm</button>
    </td>
  </tr>
    `
  })
}





async function loadListBh(data) {
  const tbBuoiHoc = document.querySelector('.tbl-buoiHoc')
  tbBuoiHoc.innerHTML = ""
  let lhp = await getListBh({ MALOPHP: data })
  if (lhp.length == 0) {
    tbBuoiHoc.innerHTML += `
        <span style="text-align: center; color: red;">Chưa có thông tin buổi học</span>
        `
    return
  }
  lhp.forEach(e => {
    tbBuoiHoc.innerHTML += `
            <tr id="${e.IDBUOIHOC}">
              <td class="ps-0">${e.MALOPHP}</td>
              <td>${e.TIETBD}</td>
              <td>${e.PHONG}</td>
              <td>${e.SOTIET}</td>
              <td class="text-end pe-0">
                <button type="button" class="btn btn-outline-primary btn-xs mb-0 cnbh btn_update_buoiHoc" data-bs-toggle="modal" data-bs-target="#cnbh">Cập nhật</button>
                <button type="button" class="btn btn-outline-danger btn-xs mb-0 xbh" data-bs-target="#deleteBh" data-bs-toggle="modal">Xóa</button>
                <button type="button" class="btn btn-outline-success btn-xs mb-0 dsdd btn-dsdd" data-bs-toggle="modal" data-bs-target="#dsdd">DSĐD</button>
              </td>
            </tr>
        `
  })
}


async function loadListDiemDanh(data, gv, tenLop) {
  const tbDD = document.querySelector('.tbl_diemDanhTheoBuoi')
  const dt = document.querySelectorAll('.detailDd')
  tbDD.innerHTML = ""
  let dd = await getListDd({ IDBUOIHOC: data })
  console.log(dd)
  dt[0].innerHTML = `${gv.length == 2 ? gv[0] + "<br>" + gv[1] : gv[0]}`
  dt[1].innerHTML = `${tenLop}`
  dt[2].innerHTML = `${dd[0].length}`
  if (dd[0].length == 0) {
    tbDD.innerHTML += `<span style="text-align: center; color: red;">Chưa có thông tin điểm danh</span>`
    return
  }
  dd[0].forEach(e => {
    tbDD.innerHTML += `
        <tr id="${e.MASV}" class="csvDd">
          <td class="ps-0">${e.MASV}</td>
          <td>${e.HOTEN}</td>
          <td>${e.DADIEMDANH ? 'x' : 'v'}</td>
          <td>${e.GHICHU}</td>
        </tr>
    `
  })
}


async function loadDataGv(data) {
  const gvdt = document.querySelector('#input-4')
  gvdt.innerHTML = ""
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.CT_LOP_GV, { MALOPHP: data })
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.GIANGVIEN, {})
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1])
  let newArr = []
  let [a, b] = [...x]
  for (let i of a) {
    for (let j of b) {
      if (i.MAGV == j.MAGV) {
        newArr.push({ ...j })
      }
    }
  }
  console.log(newArr)
  newArr.forEach(async e => {
    gvdt.innerHTML += `
          <div  id=${e.MAGV} style="display: flex; justify-content: space-between">
            <p style="margin-right:40px">${e.HOTEN}</p>
            <span class="deleteGV" style="cursor: pointer">X</span>
          </div>
          `
  })
}

async function loadAllListDiemDanh(data, gv, tenLop) {
  const tblAll = document.querySelector('.tbl-allDd')
  const thead = document.querySelector('.test')
  const dtAll = document.querySelectorAll('.dtAll')
  thead.innerHTML = `<th class="ps-0">Mã SV</th>
  <th class="ps-2">Họ tên</th>`
  tblAll.innerHTML = ""
  const prm0 = new Promise((resolve, rejects) => {
    let x = getAllDd({ MALOPHP: data })
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = getListDd({ MALOPHP: data })
    resolve(x)
  })
  var x = await Promise.all([prm0, prm1])
  let [dd, dt] = [...x]
  // let dd = await getAllDd({MALOPHP: data})
  // let dt = await getListDd({MALOPHP: data})
  console.log(dt)
  dtAll[0].innerHTML = `${gv.length == 2 ? gv[0] + "<br>" + gv[1] : gv[0]}`
  dtAll[1].innerHTML = `${tenLop + ' - ' + dt[1]}`
  dtAll[2].innerHTML = `${dd[1]}`
  for (let i = 1; i <= dt[1]; i++) {
    thead.innerHTML += `
      <th class="ps-2">Buổi ${i}</th>
    `
  }
  dd[0].forEach(e => {
    let t = ""
    e.BUOI.forEach(item => {
      t += `<td>${item ? 'x' : 'v'}</td>`
    })
    tblAll.innerHTML += `
    <tr id="${e.MASV}" class="csvAllDd">
    <td class="ps-0">${e.MASV}</td>
    <td>${e.HOTEN}</td>
    ${t}
    </tr>
    `
  })
}
async function loadListLSv(KEY, maLop, tenLop, tenMon) {
  const tbdSvLhp = document.querySelector('.tbody-dssv-lhp')
  const tbdDssv = document.querySelector('.tbd-dssv')
  const dt = document.querySelectorAll('.detailLhp')
  tbdDssv.innerHTML = ""
  tbdSvLhp.innerHTML = ""
  const prm0 = new Promise((resolve, rejects) => {
    let x = server.getList(server.tbl.SINHVIEN, {});
    resolve(x)
  })
  const prm1 = new Promise((resolve, rejects) => {
    let x = getListLsv({ MALOPHP: KEY })
    resolve(x)
  })

  var x = await Promise.all([prm0, prm1])
  let [dssv, dssvLhp] = [...x]
  console.log(x)
  // let dssv = await loadListSv()
  // let dssvLhp = await getListLsv({MALOPHP: KEY})
  // let lhp = await server.getList(server.tbl.LOPHOCPHAN, {MALOPHP: KEY}).then(result => {
  //   return result
  // })
  dt[0].innerHTML = maLop
  dt[1].innerHTML = tenLop
  dt[2].innerHTML = tenMon

  let newArr = []
  for (let i of dssv) {
    let count = 0
    for (let j of dssvLhp) {
      if (i.MASV == j.MASV) {
        count++
      }
    }
    if (count == 0) newArr.push(i)
  }

  if (dssvLhp.length == 0) {
    tbdSvLhp.innerHTML += `
    <span style="text-align: center; color: red;">Chưa có thông tin sinh viên</span>
    `
  }
  if (newArr.length == 0) {
    tbdDssv.innerHTML += `
    <span style="text-align: center; color: red;">Chưa có thông tin sinh viên</span>
    `
  }
  dssvLhp.forEach(e => {
    // if(e.HINH.trim() == ""){
    //   e.HINH = '/assets/img/team-2.jpg'
    // }
    tbdSvLhp.innerHTML += `
    <tr id="${e.MASV}" class="csv">
    <td class="ps-0">${e.MASV}</td>
    <td>${e.HOTEN}</td>
    <td>${e.SDT}</td>
    <td>${e.EMAIL}</td>
    <td class="w-10">
      <button type="button" class="btn btn-danger btn-xs mb-0 w-100 btn-del-sv">Xóa</button>
    </td>
  </tr>
    `
  })
  newArr.forEach(e => {
    // if(e.HINH.trim() == ""){
    //   e.HINH = '/assets/img/team-1.jpg'
    // }
    tbdDssv.innerHTML += `
    <tr id="${e.MASV}">
                    <td class="ps-0">${e.MASV}</td>
                    <td>${e.HOTEN}</td>
                    <td>${e.SDT}</td>
                    <td>${e.EMAIL}</td>
                    <td class="w-10">
                      <button class="btn btn-success btn-xs mb-0 w-100 btn-add-sv">Thêm</button>
                    </td>
  `
  })
}
var rows = document.querySelectorAll('.csv')
console.log(rows)

function tableToCSV(fileName, full, className) {

  // Variable to store the final csv data
  var csv_data = [];
  // Get each row data
  let colLength = ''
  var rows = document.querySelectorAll(className)
  for (var i = 0; i < rows.length; i++) {

    // Get each column data
    var cols = rows[i].querySelectorAll('td,th');
    if (full) {
      colLength = cols.length
    } else {
      colLength = cols.length - 1
    }

    // Stores each csv row data
    var csvrow = [];
    for (var j = 0; j < colLength; j++) {

      // Get the text data of each cell
      // of a row and push it to csvrow
      csvrow.push(cols[j].innerHTML);
    }

    // Combine each column value with comma
    csv_data.push(csvrow.join(","));
  }

  // Combine each row data with new line character
  csv_data = csv_data.join('\n');

  // Call this function to download csv file 
  downloadCSVFile(csv_data, fileName);

}

function downloadCSVFile(csv_data, fileName) {

  // Create CSV file object and feed
  // our csv_data into it
  // let CSVFile = new Blob([csv_data], {
  //   type: 'text/csv;charset=utf-8;'
  // });
  let CSVFile = new Blob(["\ufeff", csv_data]);
  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement('a');

  // Download csv file
  temp_link.download = fileName + '.csv'
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to
  // trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}
let idLhpDsSv = ""
let idLhpGv = ""
async function initEvent() {
  const btn_edit = document.querySelectorAll('.btn-edit')
  const btn_del = document.querySelectorAll('.btn-del')
  const submit_add = document.querySelector('.submit-add')
  const input_add = document.querySelectorAll('.form-add')
  const btn_dssv = document.querySelectorAll('.btn-dssv')
  const pop_up = document.querySelectorAll('.modal.fade')
  const btn_submit = document.querySelector('.btn-del-submit')
  const btn_delBh = document.querySelector('.btn-delBh')
  const btn_buoiHoc = document.querySelectorAll('.btn-qlbh')
  const btn_add_buoiHoc = document.querySelector('.btn-add-bh')
  const btn_update_buoiHoc = document.querySelector('.btn-update-bh')
  const input_add_bh = document.querySelectorAll('.form-add-bh')
  const input_cnbh = document.querySelectorAll('.form-cnbh')
  const xemDd = document.querySelector('.xemdiemdanh')
  const updateLhp = document.querySelector('.updateLHP')
  const exportCsv = document.querySelector('.exportCsv')
  const exportCsvDd = document.querySelector('.exportCsvDd')
  const exportCsvAllDd = document.querySelector('.exportCsvAllDd')
  let btn_add_sv = ""
  let btn_del_sv = ""
  console.log("dâdad")
  function load(){
    btn_add_sv = document.querySelectorAll('.btn-add-sv')
    btn_del_sv = document.querySelectorAll('.btn-del-sv')
    console.log('alalalal')
  }
  let gv = []
  let tenLop = ""
  let maLop = ""
  let tenMon = ""
  console.log(pop_up)
  function getParentId(e) {
    return e.target.parentElement.parentElement.id;
  }

  // THÊM LỚP HỌC PHẦN
  submit_add.onclick = async () => {
    submit_add.disabled = true
    let id = await getMaxIdLgv()
    if (await isExistLhp(input_add[0].value.trim())) {
      alert('Mã lớp học phần đã tồn tại')
      return
    }
    if (input_add[0].value.trim() == '') {
      alert('Mã lớp không được để trống')
      return
    }
    if (input_add[1].value.trim() == '') {
      alert('Tên lớp không được để trống')
      return
    }
    if (input_add[2].value.trim() == '') {
      alert('Tên môn không được để trống')
      return
    }

    let lhp = {
      MALOPHP: input_add[0].value.trim(),
      TENLOP: input_add[1].value.trim(),
      TENMH: input_add[2].value.trim()
    }
    let ctLopGv = {
      IDLGV: ++id,
      MALOPHP: input_add[0].value.trim(),
      MAGV: input_add[3].value.trim()
    }

    if (input_add[3].value.trim() !== '') {
      if (!await isExistGv(input_add[3].value.trim())) {
        alert('Giảng viên không tồn tại')
        return
      }
      server.insert(server.tbl.CT_LOP_GV, ctLopGv).then(result => {
        return result
      })
    }
    server.insert(server.tbl.LOPHOCPHAN, lhp).then(result => {
      if (result) {
        alert('Thêm lớp học phần thành công')
        input_add[0].value = ""
        input_add[1].value = ""
        input_add[2].value = ""
        input_add[3].value = ""
        submit_add.disabled = false
        hidePopUp(pop_up)
        loadList()
      }
    })


  }

  function deleteGV(idLhp){
    const del = document.querySelectorAll('.deleteGV')
    del.forEach(btn => {
      btn.onclick =  async e => {
        let magv = e.target.parentElement.id
        console.log(magv)
        let data = {
          MALOPHP: idLhp,
          MAGV: magv
        }
        server.delete(server.tbl.CT_LOP_GV, data).then(async result => {
          if (result) {
            alert('Xóa giảng viên thành công')
            const el = document.getElementById(magv)
            el.remove()
            await getListGv({MALOPHP: idLhp})
            initEvent()
          }
        })
      }
    })
  }
  function addGv(idLhp){
    const add = document.querySelectorAll('.addGV')
    add.forEach(btn => {
      btn.onclick =  async e => {
        let id = await getMaxIdLgv()
        let idGv = getParentId(e)
        console.log(idGv)
        let lgv = await loadListLgv({ MALOPHP: idLhp })
        if (lgv.length == 2) {
          alert('Mỗi lớp chỉ tối đa 2 giảng viên phụ trách')
          return
        }

        let data = {
          IDLGV: ++id,
          MALOPHP: idLhp,
          MAGV: idGv
        }

        server.insert(server.tbl.CT_LOP_GV, data).then(async result => {
          if (result) {
            alert('Thêm giảng viên vào lớp học phần thành công')
            await loadDataGv(idLhp)
            await getListGv({MALOPHP: idLhp})
            initEvent()
          }
        })
      }
    })
  }
  addGv(idLhpGv)
  deleteGV(idLhpGv)
  // CẬP NHẬT LỚP HỌC PHẦN
  btn_edit.forEach((btn, key) => {
    btn.onclick =  async (e) => {
      idLhpGv = getParentId(e)
      console.log(idLhpGv)
      // let lhp = await getListLhp({MALOPHP: idLhp})
      // await loadDataGv(idLhp)
      // await getListGv({MALOPHP: idLhp})
      const prm0 = new Promise((resolve, rejects) => {
        let x = loadDataGv(idLhpGv)
        resolve(x)
      })
      const prm1 = new Promise((resolve, rejects) => {
        let x = getListGv({ MALOPHP: idLhpGv })
        resolve(x)
      })
      await Promise.all([prm0, prm1])
      // const add = document.querySelectorAll('.addGV')
      var rows = document.getElementsByTagName("tbody")[0].rows
      console.log(rows)
      document.querySelector('.MALHP-edit').value = rows[key].getElementsByTagName("td")[0].innerText
      document.querySelector('.TENLOP-edit').value = rows[key].getElementsByTagName("td")[1].innerText
      document.querySelector('.TENMON-edit').value = rows[key].getElementsByTagName("td")[2].innerText
      addGv(idLhpGv)
      deleteGV(idLhpGv)
      updateLhp.onclick = async (e) => {
        // if(await isExistBuoiHoc(idLhp)){
        //   alert('Lớp học đã có dữ liệu buổi học. Không thể sửa thông tin lớp học phần !!!')
        //   return
        // }
        if (document.querySelector('.TENLOP-edit').value == '') {
          alert('Tên lớp không được để trống')
          return
        }
        if (document.querySelector('.TENMON-edit').value == '') {
          alert('Tên môn không được để trống')
          return
        }
        let data = {
          query: {
            MALOPHP: idLhpGv,
          },
          newValue: {
            TENLOP: document.querySelector('.TENLOP-edit').value,
            TENMH: document.querySelector('.TENMON-edit').value
          }
        }
        server.update(server.tbl.LOPHOCPHAN, data).then(result => {
          if (result) {
            alert('Cập nhật lớp học thành công')
            hidePopUp(pop_up)
            loadListLhp()
          }
        })

      }
    }
  })

  // XÓA LỚP HỌC PHẦN
  btn_del.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      let idLhp = getParentId(e)
      console.log(btn_submit)
      btn_submit.onclick = async () => {
        if (await checkConstraintDelLhp(idLhp)) {
          alert('Lớp học đã có dữ liệu. Không thể xóa')
          hidePopUp(pop_up)
        } else {
          let maLhp = {
            MALOPHP: idLhp
          }
          server.delete(server.tbl.LOPHOCPHAN, maLhp).then(result => {
            if (result) {
              alert('Xóa lớp học phần thành công')
              hidePopUp(pop_up)
              loadListLhp()
            } else {
              alert('Xóa lớp học phần thất bại')
              hidePopUp(pop_up)
            }
          })
        }
      }
    })
  })
  function addSv(idLhp){
    const btn_add_sv = document.querySelectorAll('.btn-add-sv')
    const tbdSvLhp = document.querySelector('.tbody-dssv-lhp')
    btn_add_sv.forEach((btn1, index) => {
      btn1.addEventListener("click", async (e) => {
        btn1.disabled = true
        var rows = document.getElementsByTagName("tbody")[5].rows
        console.log(rows)
        let masv = rows[index].getElementsByTagName("td")[0].innerText
        let hoTen = rows[index].getElementsByTagName("td")[1].innerText
        let sdt = rows[index].getElementsByTagName("td")[2].innerText
        let email = rows[index].getElementsByTagName("td")[3].innerText
        console.log(rows)
        let id = await getMaxIdLsv()
        let idSv = getParentId(e)
        console.log(idSv)
        if (await isExistDiemDanh({ MALOPHP: idLhp })) {
          btn1.disabled = false
          alert('Lớp học đã có dữ liệu điểm danh. Không thể thêm sinh viên !!!')
          return
        }
        // if(await isExistBuoiHoc(idLhp)){
        //   alert('Lớp học đã có dữ liệu buổi học. Không thể thêm sinh viên !!!')
        //   return
        // }
        let dd = server.await
        let data = {
          MALOPHP: idLhp,
          MASV: idSv
        }
        if(await isExistSv(data)){
          alert('Sinh viên đã tồn tại trong lớp !!!!')
          return
        }
        let ctLopSv = {
          IDLSV: ++id,
          MALOPHP: idLhp,
          MASV: idSv
        }
        await server.insert(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
          if (result) {
            alert('Thêm sinh viên vào lớp học thành công')
            btn1.disabled = false
            //   let row = tbdSvLhp.insertRow(-1)
            //   console.log(row)
            //   let cell1 = row.insertCell(0);
            //   let cell2 = row.insertCell(1);
            //   let cell3 = row.insertCell(2);
            //   let cell4 = row.insertCell(3);
            //   let cell5 = row.insertCell(4);
            //   cell1.innerHTML = masv
            //   cell2.innerHTML = hoTen
            //   cell3.innerHTML = sdt
            //   cell4.innerHTML = email
            //   cell5.innerHTML = `<td class="w-10">
            //   <button type="button" class="btn btn-danger btn-xs mb-0 w-100 btn-del-sv">Xóa</button>
            // </td>`
            await loadListLSv(idLhp, maLop, tenLop, tenMon)
            initEvent()
          }
        })
      })
    })
  }
  function deleteSv(idLhp){
  const btn_del_sv = document.querySelectorAll('.btn-del-sv')
  btn_del_sv.forEach(btn => {
      btn.addEventListener("click", async (e) => {
        btn.disabled = true
        let idSv = getParentId(e)
        console.log(idSv)
    
        // if(await isExistBuoiHoc(idLhp)){
        //   alert('Lớp học đã có dữ liệu buổi học. Không thể xóa sinh viên !!!')
        //   return
        // }
        if (await isExistDiemDanh({ MALOPHP: idLhp })) {
          btn.disabled = false
          alert('Lớp học đã có dữ liệu điểm danh. Không thể xóa sinh viên !!!')
          return
        }
        let ctLopSv = {
          MALOPHP: idLhp,
          MASV: idSv
        }
        await server.delete(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
          if (result) {
            alert('Xóa sinh viên thành công')
            btn.disabled = false
            await loadListLSv(idLhp, maLop, tenLop, tenMon)
            initEvent()
          }
        })
      })
    })
  }
  addSv(idLhpDsSv)
  deleteSv(idLhpDsSv)
  // XEM DANH SÁCH SINH VIÊN
  btn_dssv.forEach((btn, key) => {
    btn.addEventListener("click", async (e) => {
      var rows = document.getElementsByTagName("tbody")[0].rows
      maLop = rows[key].getElementsByTagName("td")[0].innerText
      tenLop = rows[key].getElementsByTagName("td")[1].innerText
      tenMon = rows[key].getElementsByTagName("td")[2].innerText
      idLhpDsSv = getParentId(e)
      console.log(idLhpDsSv)
      await loadListLSv(idLhpDsSv, maLop, tenLop, tenMon)
      // const btn_add_sv = document.querySelectorAll('.btn-add-sv')
      // const btn_del_sv = document.querySelectorAll('.btn-del-sv')
      load()
      const tbdSvLhp = document.querySelector('.tbody-dssv-lhp')
      const tbdDssv = document.querySelector('.tbd-dssv')
      // addSv(idLhp)
      // thêm sinh viên vào lớp
      exportCsv.addEventListener("click", async () => {
        exportCsv.disabled = true
        tableToCSV('DSSV', false, '.csv')
        exportCsv.disabled = false
      })
      addSv(idLhpDsSv)
      deleteSv(idLhpDsSv)
      // btn_add_sv.forEach((btn1, index) => {
      //   btn1.addEventListener("click", async (e) => {
      //     btn1.disabled = true
      //     var rows = document.getElementsByTagName("tbody")[5].rows
      //     console.log(rows)
      //     let masv = rows[index].getElementsByTagName("td")[0].innerText
      //     let hoTen = rows[index].getElementsByTagName("td")[1].innerText
      //     let sdt = rows[index].getElementsByTagName("td")[2].innerText
      //     let email = rows[index].getElementsByTagName("td")[3].innerText
      //     console.log(rows)
      //     let id = await getMaxIdLsv()
      //     let idSv = getParentId(e)
      //     console.log(idSv)
      //     if (await isExistDiemDanh({ MALOPHP: idLhp })) {
      //       btn1.disabled = false
      //       alert('Lớp học đã có dữ liệu điểm danh. Không thể thêm sinh viên !!!')
      //       return
      //     }
      //     // if(await isExistBuoiHoc(idLhp)){
      //     //   alert('Lớp học đã có dữ liệu buổi học. Không thể thêm sinh viên !!!')
      //     //   return
      //     // }
      //     let dd = server.await
      //     let data = {
      //       MALOPHP: idLhp,
      //       MASV: idSv
      //     }
      //     if(await isExistSv(data)){
      //       alert('Sinh viên đã tồn tại trong lớp !!!!')
      //       return
      //     }
      //     let ctLopSv = {
      //       IDLSV: ++id,
      //       MALOPHP: idLhp,
      //       MASV: idSv
      //     }
      //     await server.insert(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
      //       if (result) {
      //         alert('Thêm sinh viên vào lớp học thành công')
      //         btn1.disabled = false
      //           let row = tbdSvLhp.insertRow(-1)
      //           let cell1 = row.insertCell(0);
      //           let cell2 = row.insertCell(1);
      //           let cell3 = row.insertCell(2);
      //           let cell4 = row.insertCell(3);
      //           let cell5 = row.insertCell(4);
      //           cell1.innerHTML = masv
      //           cell2.innerHTML = hoTen
      //           cell3.innerHTML = sdt
      //           cell4.innerHTML = email
      //           cell5.innerHTML = `<td class="w-10">
      //           <button type="button" class="btn btn-danger btn-xs mb-0 w-100 btn-del-sv">Xóa</button>
      //         </td>`
      //         load()
      //         console.log(btn_del_sv.length)
      //         initEvent()
      //         console.log(btn_del_sv.length)
      //         // await loadListLSv(idLhp, maLop, tenLop, tenMon)
      //       }
      //     })
      //   })
      // })

      // Xóa sinh viên khỏi lớp
      // for(let i = 0; i < btn_del_sv.length; i++){
      //   console.log(btn_del_sv.length)
      //   btn_del_sv[i].onclick = async e => {
      //     btn_del_sv[i].disabled = true
      //     let idSv = getParentId(e)
      //     console.log(idSv)
      //     // if(await isExistBuoiHoc(idLhp)){
      //     //   alert('Lớp học đã có dữ liệu buổi học. Không thể xóa sinh viên !!!')
      //     //   return
      //     // }
      //     if (await isExistDiemDanh({ MALOPHP: idLhp })) {
      //       btn_del_sv[i].disabled = false
      //       alert('Lớp học đã có dữ liệu điểm danh. Không thể xóa sinh viên !!!')
      //       return
      //     }
      //     let ctLopSv = {
      //       MALOPHP: idLhp,
      //       MASV: idSv
      //     }
      //     await server.delete(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
      //       if (result) {
      //         alert('Xóa sinh viên thành công')
      //         btn_del_sv[i].disabled = false
      //       }
      //     })
      //   }
      // }
      // btn_del_sv.forEach(btn => {
      //   btn.addEventListener("click", async (e) => {
      //     btn.disabled = true
      //     let idSv = getParentId(e)
      //     console.log(idSv)
      //     // if(await isExistBuoiHoc(idLhp)){
      //     //   alert('Lớp học đã có dữ liệu buổi học. Không thể xóa sinh viên !!!')
      //     //   return
      //     // }
      //     if (await isExistDiemDanh({ MALOPHP: idLhp })) {
      //       btn.disabled = false
      //       alert('Lớp học đã có dữ liệu điểm danh. Không thể xóa sinh viên !!!')
      //       return
      //     }
      //     let ctLopSv = {
      //       MALOPHP: idLhp,
      //       MASV: idSv
      //     }
      //     await server.delete(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
      //       if (result) {
      //         alert('Xóa sinh viên thành công')
      //         btn.disabled = false
      //       }
      //     })
      //   })
      // })
    })
  })

  // XEM DANH SÁCH BUỔI HỌC
  btn_buoiHoc.forEach((btn, key) => {
    btn.onclick = async (e) => {
      var rows = document.getElementsByTagName("tbody")[0].rows
      maLop = rows[key].getElementsByTagName("td")[0].innerText
      tenLop = rows[key].getElementsByTagName("td")[1].innerText
      gv = (rows[key].getElementsByTagName("td")[3].innerText).split('\n')
      let idLhp = getParentId(e)
      // let lhp = await getListLhp({MALOPHP: idLhp})
      // console.log(lhp)
      await loadListBh(idLhp)
      const cnbh = document.querySelectorAll('.cnbh')
      const xbh = document.querySelectorAll('.xbh')
      const dsdd = document.querySelectorAll('.btn-dsdd')
      console.log(input_add_bh)
      let today = new Date()
      let currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      input_add_bh[3].min = currentDate
      input_cnbh[3].min = currentDate
      btn_add_buoiHoc.onclick = async () => {
        btn_add_buoiHoc.disabled = true
        let id = await getMaxIdBh()
        if (isNaN(input_add_bh[0].value.trim()) || input_add_bh[0].value.trim() == "") {
          btn_add_buoiHoc.disabled = false
          alert('Tiết bắt đầu không hợp lệ')
          return
        }
        if (input_add_bh[1].value.trim() == "") {
          btn_add_buoiHoc.disabled = false
          alert('Phòng không được trống')
          return
        }
        if (isNaN(input_add_bh[2].value) || input_add_bh[2].value.trim() == "") {
          btn_add_buoiHoc.disabled = false
          alert('Số tiết không hợp lệ')
          return
        }
        if (input_add_bh[2].value > 5) {
          btn_add_buoiHoc.disabled = false
          alert('Số tiết nằm trong khoảng 1 -> 5')
          return
        }
        let data = {
          IDBUOIHOC: ++id,
          MALOPHP: idLhp,
          NGAY: input_add_bh[3].value,
          TIETBD: parseInt(input_add_bh[0].value),
          PHONG: input_add_bh[1].value,
          SOTIET: parseInt(input_add_bh[2].value),
          IDLGVSUBMITTED: ''
        }
        server.insert(server.tbl.BUOIHOC, data).then(result => {
          if (result) {
            alert('Thêm buổi học thành công')
            btn_add_buoiHoc.disabled = false
            loadListLhp()
          }
        })

      }
      var rows = document.getElementsByTagName("tbody")[2].rows;
      console.log(rows)
      for (var i = 0; i < cnbh.length; i++) {
        let x = i
        cnbh[i].addEventListener("click", async (e) => {
          let idBh = getParentId(e)
          console.log(idBh)
          let data = {
            IDBUOIHOC: parseInt(idBh)
          }
          let bh = await getListBh(data)
          console.log(bh)
          input_cnbh[0].value = rows[x].getElementsByTagName("td")[1].innerText;
          input_cnbh[1].value = rows[x].getElementsByTagName("td")[2].innerText
          input_cnbh[2].value = rows[x].getElementsByTagName("td")[3].innerText
          input_cnbh[3].value = bh[0].NGAY
          btn_update_buoiHoc.onclick = async (e) => {
            let dd = await isExistDiemDanh({ IDBUOIHOC: parseInt(idBh) })
            if (dd) {
              alert('Buổi học này đã có dữ liệu điểm danh. Không thể sửa')
              return
            }
            if (isNaN(input_cnbh[0].value.trim()) || input_cnbh[0].value.trim() == "") {
              alert('Tiết bắt đầu không hợp lệ')
              return
            }
            if (input_cnbh[1].value.trim() == "") {
              alert('Phòng không được trống')
              return
            }
            if (isNaN(input_cnbh[2].value) || input_cnbh[2].value.trim() == "") {
              alert('Số tiết không hợp lệ')
              return
            }
            if (input_cnbh[2].value > 5) {
              alert('Số tiết nằm trong khoảng 1 -> 5')
              return
            }
            let data = {
              query: {
                IDBUOIHOC: parseInt(idBh),
              },
              newValue: {
                TIETBD: parseInt(input_cnbh[0].value),
                NGAY: input_cnbh[3].value,
                PHONG: input_cnbh[1].value,
                SOTIET: parseInt(input_cnbh[2].value),
              }
            }
            console.log(data)
            server.update(server.tbl.BUOIHOC, data).then(result => {
              console.log(result)
              if (result) {
                alert('Cập nhật buổi học thành công')
                hidePopUp(pop_up)
              }
            })
          }
        })
      }
      xbh.forEach(btn => {
        btn.onclick = async (e) => {
          let idBh = getParentId(e)
          console.log(idLhp)
          btn_delBh.onclick = async (e) => {
            btn_delBh.disabled = true
            let data = {
              IDBUOIHOC: idBh
            }
            const dd = await server.getList(server.tbl.CT_DIEMDANH, data).then(result => {
              return result.length
            })

            if (dd > 0) {
              alert('Buổi học đã có dữ liệu điểm danh. Không thể xóa !!!')
              return
            }
            let id = {
              IDBUOIHOC: parseInt(idBh)
            }
            console.log(id)
            server.delete(server.tbl.BUOIHOC, id).then(result => {
              if (result) {
                btn_delBh.disabled = false
                alert('Xóa buổi học thành công')
                hidePopUp(pop_up)
              } else {
                hidePopUp(pop_up)
              }
            })
          }
        }
      })
      dsdd.forEach(btn => {
        let idbh = ''
        btn.addEventListener("click", async (e) => {
          idbh = getParentId(e)
          console.log(gv)
          await loadListDiemDanh(parseInt(idbh), gv, tenLop)
          exportCsvDd.onclick = () => {
            console.log(idbh)
            exportCsvDd.disabled = true
            let fileName = "DanhSachDiemDanhLop_" + idLhp + '_Buoi_' + idbh
            tableToCSV(fileName, true, '.csvDd')
            exportCsvDd.disabled = false
          }
        })
      })

      xemDd.onclick = (async (e) => {
        console.log(idLhp)
        await loadAllListDiemDanh(idLhp, gv, tenLop)
        exportCsvAllDd.onclick = () => {
          exportCsvAllDd.disabled = true
          let fileName = "DanhSachDiemDanhLop_" + idLhp
          tableToCSV(fileName, true, '.csvAllDd')
          exportCsvAllDd.disabled = false
        }
      })

      // cnbh.forEach(btn => {
      //   btn.addEventListener("click", async (e) => {
      //     let idBh = getParentId(e)
      //     console.log(idBh)
      //     let data = {
      //       IDBUOIHOC: parseInt(idBh)
      //     }
      //     let bh = await getListBh(data)
      //     input_cnbh[0].value = rows[parseInt(idBh) - 1].getElementsByTagName("td")[1].innerText;
      //     input_cnbh[1].value = rows[parseInt(idBh) - 1].getElementsByTagName("td")[2].innerText
      //     input_cnbh[2].value = rows[parseInt(idBh) - 1].getElementsByTagName("td")[3].innerText
      //     btn_update_buoiHoc.onclick = async (e) => {
      //       console.log(e)
      //       let dd = await isExistDiemDanh({IDBUOIHOC: parseInt(idBh)})
      //       console.log(dd)
      //       if(dd){
      //         alert('Buổi học này đã có dữ liệu điểm danh. Không thể sửa')
      //         return
      //       }
      //       if(isNaN(input_cnbh[0].value)) {
      //         alert('Tiết bắt đầu không hợp lệ')
      //         return
      //       }
      //       if(input_cnbh[1].value.trim() == "") {
      //         alert('Phòng không được để trống')
      //       }
      //       if(isNaN(input_cnbh[2].value)) {
      //         alert('Số tiết không hợp lệ')
      //         return
      //       }
      //       if(input_cnbh[2].value > 5) {
      //         alert('Số tiết nằm trong khoảng 1 -> 5')
      //         return
      //       }
      //       let data = {
      //         query: {
      //           IDBUOIHOC: parseInt(idBh),
      //         },
      //         newValue: {
      //           TIETBD: parseInt(input_cnbh[0].value),
      //           PHONG: input_cnbh[1].value,
      //           SOTIET: parseInt(input_cnbh[2].value),
      //         }
      //       }
      //       console.log(data)
      //       server.update(server.tbl.BUOIHOC, data).then(result => {
      //         console.log(result)
      //         if(result){
      //           alert('Cập nhật buổi học thành công')
      //         }
      //       })
      //     }
      //   })
      // })
    }
  })
}

async function loadListLhp(KEY) {
  await loadList(KEY)
  initEvent()
}

loadListLhp()




const searchLhp = document.querySelector('.searchLhp')
const searchSvInClass = document.querySelector('.searchSvInClass')
const searchSv = document.querySelector('.searchSv')

searchLhp.addEventListener("keypress", (e) => {
  if (e.key == 'Enter') {
    console.log('daddaad')
    e.preventDefault()
    let KEY = searchLhp.value
    let data = {
      TENLOP: { $regex: ".*" + KEY + ".*" }
    }
    loadListLhp(data)
  }
})

searchLhp.addEventListener("change", (e) => {
  let KEY = searchLhp.value
  let data = {
    TENLOP: { $regex: ".*" + KEY + ".*" }
  }
  loadListLhp(data)
})


// searchSvInClass.addEventListener("keypress", (e) => {
//   if(e.key == 'Enter'){
//     console.log('daddaad')
//     e.preventDefault()
//     let KEY = searchSvInClass.value
//     let data = {
//       TENLOP: { $regex: ".*"+KEY+".*"}
//     }
//     loadListLhp(data)
//   }
// })

// searchSvInClass.addEventListener("change", (e) => {
//     let KEY = searchSvInClass.value
//     let data = {
//       TENLOP: { $regex: ".*"+KEY+".*"}
//     }
//     loadListLhp(data)
// })


// searchSv.addEventListener("keypress", (e) => {
//   if(e.key == 'Enter'){
//     console.log('daddaad')
//     e.preventDefault()
//     let KEY = searchSv.value
//     let data = {
//       TENLOP: { $regex: ".*"+KEY+".*"}
//     }
//     loadListLhp(data)
//   }
// })

// searchSv.addEventListener("change", (e) => {
//     let KEY = searchSv.value
//     let data = {
//       TENLOP: { $regex: ".*"+KEY+".*"}
//     }
//     loadListLhp(data)
// })