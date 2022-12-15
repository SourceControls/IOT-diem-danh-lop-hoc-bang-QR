import { server } from '../../../../components/server/main.js'

function hidePopUp(pop_up){
  const modal = document.querySelector('.modal-backdrop')
  console.log(modal)
  pop_up.forEach((popup) => {
    if (popup.classList.contains("show")) {
      modal.classList.remove("show")
      popup.classList.remove("show")
    }
  })
}

async function isExistLhp(data){
    const lhp = await server.getList(server.tbl.LOPHOCPHAN, {MALOPHP: data}).then(result => {
        return result.length
    })
    return lhp > 0 ? true : false
}

async function isExistGv(data) {
    const gv = await server.getList(server.tbl.GIANGVIEN, {MAGV: data}).then(result => {
        return result.length
    })
    return gv > 0 ? true : false
}

async function isExistBuoiHoc(data) {
  const buoiHoc = await server.getList(server.tbl.BUOIHOC, {MALOPHP: data}).then(result => {
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
  const dd = await server.getList(server.tbl.CT_DIEMDANH, data).then(result => {
    return result.length
  })
  return dd > 0 ? true : false
}


async function getMaxIdLgv(){
  const id = await server.getList(server.tbl.CT_LOP_GV, {}).then(result => {
    return Math.max(...result.map(idLgv => idLgv.IDLGV))
  })
  return id
}

async function getMaxIdLsv(){
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

async function loadListLgv(data = {}){
    const lgv =  server.getList(server.tbl.CT_LOP_GV, data).then((result) => {
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


async function getListLsv(data = {}){
  let arrSv = []
  const lhp = await server.getList(server.tbl.CT_LOP_SV, data).then(result => {
    return result
  })
  let sv = await loadListSv()
  for(let i of lhp){
    for(let j of sv){
      if(i.MASV == j.MASV){
        arrSv.push(j)
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

async function getListDd(data = {}){
  let arrDd = []
  // let newArr = []
  let ct = await getCtDiemDanh(data)
  const bh = await server.getList(server.tbl.BUOIHOC, data).then(result => {
    return result
  })
  let idLhp = {
    MALOPHP: bh[0].MALOPHP
  }
  // let a = await getListLhp(idLhp)
  // const soBuoi = await server.getList(server.tbl.BUOIHOC, idLhp).then(result => {
  //   return result.length
  // })
  // const lgv = await loadListLgv(idLhp)
  // if(lgv.length == 2) {
  //   newArr = [{...lgv[0], MAGV1: lgv[1].MAGV}]
  // } else {
  //   newArr = [...lgv]
  // }
  // let gv = await loadListGv({MAGV: newArr[0].MAGV})
  // let gv1 = ""
  // let check = false
  // if(newArr[0].hasOwnProperty('MAGV1')){
  //   check = true
  //   gv1 = await loadListGv({MAGV: `${newArr[0].MAGV1}`})
  // }
  // let lhp = await server.getList(server.tbl.LOPHOCPHAN, idLhp).then(result => {
  //   return result
  // })
  // // let dd = await loadListDd(data)
  // // console.log(dd)
  // for(let i = 0; i < lsv.length; i++){
  //   let data1 = {
  //     MASV: lsv[i].MASV, 
  //     MALOPHP: bh[0].MALOPHP
  //   }
  //   console.log(data1)
  //   let idLsv = await getIdLsv(data1)
  //   let sv = await loadListSv({MASV: lsv[i].MASV})
  //   console.log(idLsv)
  //   let ctdd = {
  //     IDLSV: idLsv,
  //     IDBUOIHOC: data.IDBUOIHOC
  //   }
  //   console.log(ctdd)
  //   let ct = await getCtDiemDanh(ctdd)
  //   console.log(ct)
  //   arrDd.push({
  //     MASV: lsv[i].MASV,
  //     HOTEN: sv[0].HOTEN,
  //     DADIEMDANH: ct[0] ? ct[0].DADIEMDANH : false,
  //     GHICHU: ct[0] ? ct[0].GHICHU : '',
  //     GV: check ? [gv[0].HOTEN, gv1[0].HOTEN] : gv[0].HOTEN,
  //     TENLOP: lhp[0].TENLOP,
  //     SOBUOI: soBuoi,
  //     TONGSOSV: lsv.length
  //   })
  // }
  let dt = []
  let t = []
  let idlsv = await server.getList(server.tbl.CT_LOP_SV, {}).then(result => {
    return result
  })
  let sv = await loadListSv()
  for(let i of ct){
    for(let j of idlsv){
      if(i.IDLSV == j.IDLSV){
        t.push({...i, ...j})
        break
      }
    }
  }
  for(let i of t){
    for(let j of sv){
      if(i.MASV == j.MASV){
        arrDd.push({...i, ...j})
        break
      }
    }
  }
  // dt.push({
  //   SOBUOI: soBuoi,
  //   TONGSOSV: arrDd.length,
  //   // TENLOP: a[0].TENLOP,
  //   // GV: a[0].GV
  // })
  return arrDd
}


async function getAllDd(data) {
  let newArr = []
  let dsdd = []
  let sv = []
  const bh = await server.getList(server.tbl.BUOIHOC, data).then(result => {
    return result
  })
  console.log(bh)
  for(let i of bh) {
    let id = i.IDBUOIHOC
    let dd = await loadListDd({IDBUOIHOC: id})
    newArr.push(...dd)
  }

  let checked = []
    for(let i = 0; i < newArr.length - 1 ; i++){
      let dd = []
      if(checked.includes(newArr[i].IDLSV)) continue
      for(let j = i + 1; j < newArr.length; j++){
        if(newArr[i].IDLSV == newArr[j].IDLSV){
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
  for(let i of dsdd) {
    let id = i.IDLSV
    let lsv = await getListLsv({IDLSV: id})
    let data = [{
      MASV: lsv[0].MASV,
      HOTEN: lsv[0].HOTEN,
      BUOI: i.BUOI
    }]
    sv.push(...data)
  }
  return sv
}

// console.log(await getAllDd({MALOPHP: 'MALOP01'}))


async function getListLhp(data = {}) {
    let newArr = []
    const lhp = await server.getList(server.tbl.LOPHOCPHAN, data).then((result) => {
      return result
    })
    let t = []
    let t1 = []
    let lgv = await loadListLgv()
    let gv = await loadListGv()
    for(let i of lgv){
      for(let j of gv){
        if(i.MAGV == j.MAGV){
          t.push({...i, ...j})
          break
        }
      }
    }
    for(let i of t){
      for(let j of lhp){
        if(i.MALOPHP == j.MALOPHP){
          t1.push({...i, ...j})
          break
        }
      }
    }

    let checked = []
    for(let i = 0; i < t1.length; i++){
      let dd = []
      if(checked.includes(t1[i].MALOPHP)) continue
      for(let j = i + 1; j < t1.length; j++){
        if(t1[i].MALOPHP == t1[j].MALOPHP){
          dd.push(t1[j].HOTEN)
        }
      }
      dd.unshift(t1[i].HOTEN)
      newArr.push({
        MALOPHP: t1[i].MALOPHP,
        TENLOP: t1[i].TENLOP,
        TENMH: t1[i].TENMH,
        GV: dd
      })
      checked.push(t1[i].MALOPHP)
    }

    
    // for(let i of lhp){
    //   let lgv = await loadListLgv({MALOPHP: `${i.MALOPHP}`})
    //   console.log(lgv)
    //   if(lgv.length == 2) {
    //     newArr = [{...lgv[0], MAGV1: lgv[1].MAGV}]
    //   } else {
    //     newArr = [...lgv]
    //   }
    //   for(let a of newArr) {
    //     let gv = await loadListGv({MAGV: `${a.MAGV}`})
    //       let gv1 = ""
    //       let check = false
    //       if(a.hasOwnProperty('MAGV1')){
    //         check = true
    //         gv1 = await loadListGv({MAGV: `${a.MAGV1}`})
    //       }
    //       arrLhp.push({
    //         MALOPHP: i.MALOPHP,
    //         TENLOP: i.TENLOP,
    //         TENMH: i.TENMH,
    //         GV: check ? [gv[0].HOTEN, gv1[0].HOTEN] : gv[0].HOTEN
    //       })
    //   }
    // }
    return newArr
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
  const lgv = await loadListLgv(data)
  const gv = await loadListGv()
  tbdGV.innerHTML = ""
  let newArr = []
  for(let i of gv) {
    let count = 0
    for(let j of lgv){
      if(i.MAGV == j.MAGV){
        count++
      }
    }
    if(count == 0) newArr.push(i)
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
      let lhp = await getListBh({MALOPHP: data})
      if(lhp.length == 0) {
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
  let dd = await getListDd({IDBUOIHOC: data})
  dt[0].innerHTML = `${gv.length == 2 ? gv[0] + "<br>" + gv[1] : gv[0]}`
  dt[1].innerHTML = `${tenLop}`
  dt[2].innerHTML = `${dd.length}`
  if(dd.length == 0){
    tbDD.innerHTML += `<span style="text-align: center; color: red;">Chưa có thông tin điểm danh</span>`
    return
  }
  dd.forEach(e => {
    tbDD.innerHTML += `
        <tr id=${e.MASV}>
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
  let gv = await loadListLgv({MALOPHP: data})
        gv.forEach(async e => {
          let dt = await server.getList(server.tbl.GIANGVIEN, {MAGV: e.MAGV})
          gvdt.innerHTML += `
          <div  id=${e.MAGV} style="display: flex; justify-content: space-between">
            <p style="margin-right:40px">${dt[0].HOTEN}</p>
            <span class="deleteGV" style="cursor: pointer">X</span>
          </div>
          `
        })
}

async function loadAllListDiemDanh(data) {
  const tblAll = document.querySelector('.tbl-allDd')
  const dtAll = document.querySelectorAll('.dtAll')
  tblAll.innerHTML = ""
  let dd = await getAllDd({MALOPHP: data})
  let dt = await getListDd({MALOPHP: data})
  dtAll[0].innerHTML = `${dt[0].GV.length == 2 ? dt[0].GV[0] + "<br>" + dt[0].GV[1] : dt[0].GV}`
  dtAll[1].innerHTML = `${dt[0].TENLOP + ' - ' + dt[0].SOBUOI}`
  dtAll[2].innerHTML = `${dt[0].TONGSOSV}`
  dd.forEach(e => {
    let t = ""
    e.BUOI.forEach(item => {
      t += `<td>${item ? 'x' : 'v'}</td>`
    })
    console.log(t)
    tblAll.innerHTML += `
      <tr id="${e.MASV}">
        <td class="ps-0">${e.MASV}</td>
        <td>${e.HOTEN}</td>
        ${t}
      </tr>
    `
  })
}


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
    let gv = []
    let tenLop = ""
    let maLop = ""
    let tenMon = ""
    console.log(pop_up)
    function getParentId(e) {
        return e.target.parentElement.parentElement.id;
    }

    async function loadListLSv(KEY, maLop, tenLop, tenMon) {
      const tbdSvLhp = document.querySelector('.tbody-dssv-lhp')
      const tbdDssv = document.querySelector('.tbd-dssv')
      const dt = document.querySelectorAll('.detailLhp')
      tbdDssv.innerHTML = ""
      tbdSvLhp.innerHTML = ""
      let dssv = await loadListSv()
      let dssvLhp = await getListLsv({MALOPHP: KEY})
      // let lhp = await server.getList(server.tbl.LOPHOCPHAN, {MALOPHP: KEY}).then(result => {
      //   return result
      // })
      dt[0].innerHTML = maLop
      dt[1].innerHTML = tenLop
      dt[2].innerHTML = tenMon
    
      let newArr = []
      for(let i of dssv) {
        let count = 0
        for(let j of dssvLhp){
          if(i.MASV == j.MASV){
            count++
          }
        }
        if(count == 0) newArr.push(i)
      }
    
      if(dssvLhp.length == 0){
        tbdSvLhp.innerHTML += `
        <span style="text-align: center; color: red;">Chưa có thông tin sinh viên</span>
        `
      }
      if(newArr.length == 0){
        tbdDssv.innerHTML += `
        <span style="text-align: center; color: red;">Chưa có thông tin sinh viên</span>
        `
      }
      dssvLhp.forEach(e => {
        // if(e.HINH.trim() == ""){
        //   e.HINH = '/assets/img/team-2.jpg'
        // }
        tbdSvLhp.innerHTML += `
        <tr id="${e.MASV}">
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
                          <button type="button" class="btn btn-success btn-xs mb-0 w-100 btn-add-sv"">Thêm</button>
                        </td>
      `
      })
    }
    // THÊM LỚP HỌC PHẦN
    submit_add.addEventListener("click", async () => {
        let id = await getMaxIdLgv()
        if(await isExistLhp(input_add[0].value.trim())){
            alert('Mã lớp học phần đã tồn tại')
            return
        }
        if(input_add[0].value.trim() == ''){
            alert('Mã lớp không được để trống')
            return
        }
        if(input_add[1].value.trim() == ''){
            alert('Tên lớp không được để trống')
            return
        }
        if(input_add[2].value.trim() == ''){
            alert('Tên môn không được để trống')
            return
        }
        if(!await isExistGv(input_add[3].value.trim())){
            alert('Giảng viên không tồn tại')
            return
        }
        if(input_add[3].value.trim() == ''){
            alert('Mã giảng viên không được trống')
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

        let gv = await server.insert(server.tbl.LOPHOCPHAN, lhp).then(result => {
          return result
        })
        let ctlgv = await server.insert(server.tbl.CT_LOP_GV, ctLopGv).then(result => {
          return result
        })

        if(gv && ctlgv) {
          alert('Thêm lớp học phần thành công')
          hidePopUp(pop_up)
          loadListLhp()
        }

    })

    // CẬP NHẬT LỚP HỌC PHẦN
    btn_edit.forEach((btn, key) => {
        btn.addEventListener("click", async (e) => {
        let idLhp = getParentId(e)
        console.log(idLhp)
        let lhp = await getListLhp({MALOPHP: idLhp})
        await loadDataGv(idLhp)
        await getListGv({MALOPHP: idLhp})
        const add = document.querySelectorAll('.addGV')
        var rows = document.getElementsByTagName("tbody")[0].rows
        console.log(rows)
        console.log(lhp[0])
        document.querySelector('.MALHP-edit').value = rows[key].getElementsByTagName("td")[0].innerText
        document.querySelector('.TENLOP-edit').value = rows[key].getElementsByTagName("td")[1].innerText
        document.querySelector('.TENMON-edit').value = rows[key].getElementsByTagName("td")[2].innerText
        const del = document.querySelectorAll('.deleteGV')
        console.log(del)
        del.forEach(btn => {
          btn.addEventListener("click", async e => {
            if(await isExistBuoiHoc(idLhp)){
              alert('Lớp học đã có dữ liệu buổi học. Không thể sửa thông tin lớp học phần !!!')
              return
            }
            let magv = e.target.parentElement.id
            let data = {
              MALOPHP: idLhp,
              MAGV: magv
            } 
            server.delete(server.tbl.CT_LOP_GV, data).then(result => {
              if(result) {
                alert('Xóa giảng viên thành công')
                const el = document.getElementById(magv)
                el.remove()
              }
            })
          })
        })
        add.forEach(btn => {
          btn.addEventListener("click", async e => {
            let id = await getMaxIdLgv()
            let idGv = getParentId(e)
            let lgv = await loadListLgv({MALOPHP: idLhp})
            if(await isExistBuoiHoc(idLhp)){
              alert('Lớp học đã có dữ liệu buổi học. Không thể sửa thông tin lớp học phần !!!')
              return
            }
            if(lgv.length == 2){
              alert('Mỗi lớp chỉ tối đa 2 giảng viên phụ trách')
              return
            }

            let data = {
              IDLGV: ++id,
              MALOPHP: idLhp,
              MAGV: idGv
            }

            server.insert(server.tbl.CT_LOP_GV, data).then(async result => {
              if(result) {
                alert('Thêm giảng viên vào lớp học phần thành công')
                await loadDataGv()
              }
            })
          })
        })
        updateLhp.onclick = async (e) => {
          if(await isExistBuoiHoc(idLhp)){
            alert('Lớp học đã có dữ liệu buổi học. Không thể sửa thông tin lớp học phần !!!')
            return
          }
          if(document.querySelector('.TENLOP-edit').value  == ''){
            alert('Tên lớp không được để trống')
            return
          }
          if(document.querySelector('.TENMON-edit').value == ''){
            alert('Tên môn không được để trống')
            return
          }
          let data = {
              query: {
                MALOPHP: idLhp,
              },
              newValue: {
                TENLOP: document.querySelector('.TENLOP-edit').value,
                TENMH: document.querySelector('.TENMON-edit').value
              }
          }
          server.update(server.tbl.LOPHOCPHAN, data).then(result => {
            if(result){
              alert('Cập nhật lớp học thành công')
              hidePopUp(pop_up)
              loadListLhp()
            }
          })

        }
        })
    })

    // XÓA LỚP HỌC PHẦN
    btn_del.forEach(btn => {
      btn.addEventListener("click", async (e) => {
        let idLhp = getParentId(e)
        console.log(btn_submit)
        btn_submit.onclick = async () => {
          if(await isExistBuoiHoc(idLhp)){
            alert('Lớp học đã có dữ liệu buổi học. Không thể xóa !!!')
            hidePopUp(pop_up)
            return
          }
          if(await isExistSv({MALOPHP: idLhp})){
            alert('Lớp học đã có dữ liệu sinh viên. Không thể xóa!!!')
            hidePopUp(pop_up)
            return
          }
          let gv = await loadListLgv({MALOPHP: idLhp})
          if(gv.length > 0) {
            alert('Lớp học đã có dữ liệu giảng viên. Không thể xóa!!!')
            hidePopUp(pop_up)
            return
          }
          let maLhp = {
            MALOPHP: idLhp
          }
          server.delete(server.tbl.LOPHOCPHAN, maLhp).then(result => {
            if(result){
              alert('Xóa lớp học phần thành công')
              hidePopUp(pop_up)
              loadListLhp()
            } else {
              alert('Xóa lớp học phần thất bại')
              hidePopUp(pop_up)
            }
          })
        }
      })
    })
    // function addSv(idLhp){
    //   const btn_add_sv = document.querySelectorAll('.btn-add-sv')
    //   btn_add_sv.forEach((btn1, index) => {
    //     btn1.addEventListener("click", async (e) => {
    //       var rows = document.getElementsByTagName("tbody")[5].rows
    //       console.log(rows)
    //       let masv = rows[index].getElementsByTagName("td")[0].innerText
    //       let hoTen = rows[index].getElementsByTagName("td")[1].innerText
    //       let sdt = rows[index].getElementsByTagName("td")[2].innerText
    //       let email = rows[index].getElementsByTagName("td")[3].innerText
    //       console.log(rows)
    //       let id = await getMaxIdLsv()
    //       let idSv = getParentId(e)
    //       console.log(idSv)
    //       if(await isExistBuoiHoc(idLhp)){
    //         alert('Lớp học đã có dữ liệu buổi học. Không thể thêm sinh viên !!!')
    //         return
    //       }
    //       let data = {
    //         MALOPHP: idLhp,
    //         MASV: idSv
    //       }
    //       if(await isExistSv(data)){
    //         alert('Sinh viên đã tồn tại trong lớp !!!!')
    //         return
    //       }
    //       let ctLopSv = {
    //         IDLSV: ++id,
    //         MALOPHP: idLhp,
    //         MASV: idSv
    //       }
    //       await server.insert(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
    //         if(result){
    //           alert('Thêm sinh viên vào lớp học thành công')
    //         //   let row = tbdSvLhp.insertRow(-1)
    //         //   let cell1 = row.insertCell(0);
    //         //   let cell2 = row.insertCell(1);
    //         //   let cell3 = row.insertCell(2);
    //         //   let cell4 = row.insertCell(3);
    //         //   let cell5 = row.insertCell(4);
    //         //   cell1.innerHTML = masv
    //         //   cell2.innerHTML = hoTen
    //         //   cell3.innerHTML = sdt
    //         //   cell4.innerHTML = email
    //         //   cell5.innerHTML = `<td class="w-10">
    //         //   <button type="button" class="btn btn-danger btn-xs mb-0 w-100 btn-del-sv">Xóa</button>
    //         // </td>`
    //         await loadListLSv(idLhp, maLop, tenLop, tenMon)
    //         loadListLhp()
    //         }
    //       })
    //     })
    //   })
    // }
    // XEM DANH SÁCH SINH VIÊN
    btn_dssv.forEach((btn, key) => {
      btn.addEventListener("click", async (e) => {
        var rows = document.getElementsByTagName("tbody")[0].rows
        maLop = rows[key].getElementsByTagName("td")[0].innerText
        tenLop = rows[key].getElementsByTagName("td")[1].innerText
        tenMon = rows[key].getElementsByTagName("td")[2].innerText
        let idLhp = getParentId(e)
        console.log(idLhp)
        await loadListLSv(idLhp, maLop, tenLop, tenMon)
        const btn_add_sv = document.querySelectorAll('.btn-add-sv')
        const btn_del_sv = document.querySelectorAll('.btn-del-sv')
        const tbdSvLhp = document.querySelector('.tbody-dssv-lhp')
        const tbdDssv = document.querySelector('.tbd-dssv')
        // addSv(idLhp)
        // thêm sinh viên vào lớp
        btn_add_sv.forEach((btn1, index) => {
          btn1.addEventListener("click", async (e) => {
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
            if(await isExistBuoiHoc(idLhp)){
              alert('Lớp học đã có dữ liệu buổi học. Không thể thêm sinh viên !!!')
              return
            }
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
              if(result){
                alert('Thêm sinh viên vào lớp học thành công')
              //   let row = tbdSvLhp.insertRow(-1)
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
              // await loadListLSv(idLhp, maLop, tenLop, tenMon)
              loadListLhp()
              }
            })
          })
        })
        // Xóa sinh viên khỏi lớp
        btn_del_sv.forEach(btn => {
          btn.addEventListener("click", async (e) => {
            console.log('alllllll')
            let idSv = getParentId(e)
            console.log(idSv)
            if(await isExistBuoiHoc(idLhp)){
              alert('Lớp học đã có dữ liệu buổi học. Không thể xóa sinh viên !!!')
              return
            }
            let ctLopSv = {
              MALOPHP: idLhp,
              MASV: idSv
            }
            await server.delete(server.tbl.CT_LOP_SV, ctLopSv).then(async result => {
              if(result){
              alert('Xóa sinh viên thành công')
              await loadListLSv(idLhp, maLop, tenLop, tenMon)
              btn_add_sv = document.querySelectorAll('.btn-add-sv')
              btn_del_sv = document.querySelectorAll('.btn-del-sv')
              }
            })
          })
        })
      })
    })

    // XEM DANH SÁCH BUỔI HỌC
    btn_buoiHoc.forEach((btn,key) => {
      btn.addEventListener("click", async (e) => {
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
        btn_add_buoiHoc.addEventListener("click", async () => {
          let today = new Date()
          let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
          console.log(currentDate)
          let id = await getMaxIdBh()
          if(isNaN(input_add_bh[0].value)) {
            alert('Tiết bắt đầu không hợp lệ')
            return
          }
          if(isNaN(input_add_bh[2].value)) {
            alert('Số tiết không hợp lệ')
            return
          }
          if(input_add_bh[2].value > 5) {
            alert('Số tiết nằm trong khoảng 1 -> 5')
            return
          }
          let data = {
            IDBUOIHOC: ++id,
            MALOPHP: idLhp,
            NGAY: currentDate,
            TIETBD: parseInt(input_add_bh[0].value),
            PHONG: input_add_bh[1].value,
            SOTIET: parseInt(input_add_bh[2].value),
            IDLGVSUBMITTED: ''
          }
          server.insert(server.tbl.BUOIHOC, data).then(result => {
            if(result){
              alert('Thêm buổi học thành công')
            }
          })

        })
        var rows = document.getElementsByTagName("tbody")[2].rows;
        console.log(rows)
        for(var i = 0; i < cnbh.length; i++){
          let x = i
          cnbh[i].addEventListener("click", async (e) => {
            let idBh = getParentId(e)
            console.log(idBh)
            let data = {
              IDBUOIHOC: parseInt(idBh)
            }
            input_cnbh[0].value = rows[x].getElementsByTagName("td")[1].innerText;
            input_cnbh[1].value = rows[x].getElementsByTagName("td")[2].innerText
            input_cnbh[2].value = rows[x].getElementsByTagName("td")[3].innerText
            btn_update_buoiHoc.onclick = async (e) => {
              console.log(e)
              let dd = await isExistDiemDanh({IDBUOIHOC: parseInt(idBh)})
              console.log(dd)
              if(dd){
                alert('Buổi học này đã có dữ liệu điểm danh. Không thể sửa')
                return
              }
              if(isNaN(input_cnbh[0].value)) {
                alert('Tiết bắt đầu không hợp lệ')
                return
              }
              if(input_cnbh[1].value.trim() == "") {
                alert('Phòng không được để trống')
              }
              if(isNaN(input_cnbh[2].value)) {
                alert('Số tiết không hợp lệ')
                return
              }
              if(input_cnbh[2].value > 5) {
                alert('Số tiết nằm trong khoảng 1 -> 5')
                return
              }
              let data = {
                query: {
                  IDBUOIHOC: parseInt(idBh),
                },
                newValue: {
                  TIETBD: parseInt(input_cnbh[0].value),
                  PHONG: input_cnbh[1].value,
                  SOTIET: parseInt(input_cnbh[2].value),
                }
              }
              console.log(data)
              server.update(server.tbl.BUOIHOC, data).then(result => {
                console.log(result)
                if(result){
                  alert('Cập nhật buổi học thành công')
                }
              })
            }
          })
        }
        xbh.forEach(btn => {
          btn.addEventListener("click", async (e) => {
            let idBh = getParentId(e)
            console.log(idBh)
            btn_delBh.onclick = async (e) => {
              if(await isExistDiemDanh({IDBUOIHOC: parseInt(idBh)})){
                alert('Buổi học đã có dữ liệu điểm danh. Không thể xóa !!!')
                return
              }
              let id = {
                IDBUOIHOC: parseInt(idBh)
              }
              console.log(id)
              server.delete(server.tbl.BUOIHOC, id).then(result => {
                if(result){
    
                  alert('Xóa buổi học thành công')
                  hidePopUp(pop_up)
                } else {
                  alert('Xóa lớp học phần thất bại')
                  hidePopUp(pop_up)
                }
              })
            }
          })
        })
        dsdd.forEach(btn => {
          btn.addEventListener("click", async (e) => {
            let idbh = getParentId(e)
            console.log(gv)
            await loadListDiemDanh(parseInt(idbh), gv, tenLop)
          })
        })

        xemDd.onclick = ( async (e) => {
          console.log(idLhp)
          await loadAllListDiemDanh(idLhp)
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
      })
    })
}

async function loadListLhp(KEY) {
    await loadList(KEY)
    initEvent()
}

loadListLhp()




const searchLhp = document.querySelector('.searchLhp')
searchLhp.addEventListener("change", () => {
  let KEY = searchLhp.value
  let data = {
    TENLOP: { $regex: ".*"+KEY+".*"}
  }
  loadListLhp(data)
})
