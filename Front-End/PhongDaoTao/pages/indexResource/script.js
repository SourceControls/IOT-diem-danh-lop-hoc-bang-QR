import { server } from '../../../components/server/main.js'


let data = {
  MALOPHP: 'MALOP01'
};





//result là 1 mảng object, có 0-n phần tử
async function loadListLgv(data = '') {
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


// async function getListLhp(data = {}) {
//   const tblLopHocPhan = document.querySelector('.tbl-lhp')
//   tblLopHocPhan.innerHTML = ""
//   const arrLhp = []
//   const lhp = await server.getList(server.tbl.LOPHOCPHAN, data).then((result) => {
//     return result
//   })
//   lhp.forEach(async e => {
//     let lgv = await loadListLgv({MALOPHP: `${e.MALOPHP}`})
//     let newArr = []
//     if(lgv.length == 2) {
//       newArr = [{...lgv[0], MAGV1: lgv[1].MAGV}]
//     } else {
//       newArr = [...lgv]
//     }
//     newArr.forEach(async element => {
//       let gv = await loadListGv({MAGV: `${element.MAGV}`})
//       let gv1 = ""
//       let check = false
//       if(element.hasOwnProperty('MAGV1')){
//         check = true
//         gv1 = await loadListGv({MAGV: `${element.MAGV1}`})
//       }
//       arrLhp.push({
//         MALOPHP: e.MALOPHP,
//         TENLOP: e.TENLOP,
//         TENMH: e.TENMH,
//         GV: check ? [gv[0].HOTEN, gv1[0].HOTEN] : gv[0].HOTEN
//       })
//       arrLhp = [...arrLhp, {
//         MALOPHP: e.MALOPHP,
//         TENLOP: e.TENLOP,
//         TENMH: e.TENMH,
//         GV: check ? [gv[0].HOTEN, gv1[0].HOTEN] : gv[0].HOTEN
//       }]
//       console.log(arrLhp)
//       tblLopHocPhan.innerHTML += `
//                 <tbody>
//                  <tr id="${e.MALOPHP}">
//                     <td>${e.MALOPHP}</td>
//                     <td>${e.TENLOP}</td>
//                     <td>${e.TENMH}</td>
//                     <td>${check ? gv[0].HOTEN + "<br>" + gv1[0].HOTEN : gv[0].HOTEN}</td>
//                     <td class="align-middle">
//                     <button type="button" class="btn btn-outline-primary btn-xs mb-0 edit btn-edit" data-bs-toggle="modal" data-bs-target="#editModal">Cập nhật</button>
//                     <button type="button" class="btn btn-outline-danger btn-xs mb-0 delete">Xóa</button>
//                     <button type="button" class="btn btn-outline-dark btn-xs mb-0 dssv" data-bs-toggle="modal" data-bs-target="#dssv">DSSV</button>
//                     <button type="button" class="btn btn-outline-success btn-xs mb-0 view" data-bs-toggle="modal" data-bs-target="#viewModal">Quản lý buổi học</button>
//                   </td>
//                   </tr>
//                   </tbody>
//       `
//     })
//     let test = [...arrLhp]
//     console.log(test)
//   });
//   console.log()
//   return arrLhp
// }


export default async function getListLhp1(data = {}) {
  const tblLopHocPhan = document.querySelector('.tbl-lhp')
  tblLopHocPhan.innerHTML = ""
  const arrLhp = []
  let newArr = []
  const lhp = await server.getList(server.tbl.LOPHOCPHAN, data).then((result) => {
    return result
  })
  for (let i of lhp) {
    let lgv = await loadListLgv({ MALOPHP: `${i.MALOPHP}` })
    if (lgv.length == 2) {
      newArr = [{ ...lgv[0], MAGV1: lgv[1].MAGV }]
    } else {
      newArr = [...lgv]
    }
    for (let a of newArr) {
      let gv = await loadListGv({ MAGV: `${a.MAGV}` })
      let gv1 = ""
      let check = false
      if (a.hasOwnProperty('MAGV1')) {
        check = true
        gv1 = await loadListGv({ MAGV: `${a.MAGV1}` })
      }
      arrLhp.push({
        MALOPHP: i.MALOPHP,
        TENLOP: i.TENLOP,
        TENMH: i.TENMH,
        GV: check ? [gv[0].HOTEN, gv1[0].HOTEN] : gv[0].HOTEN
      })
    }
  }
  return arrLhp
}



