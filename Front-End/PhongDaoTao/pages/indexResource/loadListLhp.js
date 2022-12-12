import getListLhp1 from './script.js'
import init from './init.js'

async function loadListLhp() {
    const tblLopHocPhan = document.querySelector('.tbl-lhp')
    tblLopHocPhan.innerHTML = ""
    let lhp1 = await getListLhp1()
    lhp1.map(e => {
      tblLopHocPhan.innerHTML += `
                   <tr id="${e.MALOPHP}">
                      <td>${e.MALOPHP}</td>
                      <td>${e.TENLOP}</td>
                      <td>${e.TENMH}</td>
                      <td>${e.GV.length == 2 ? e.GV[0] + "<br>" + e.GV[1] : e.GV}</td>
                      <td class="align-middle">
                      <button type="button" class="btn btn-outline-primary btn-xs mb-0 edit btn-edit" data-bs-toggle="modal" data-bs-target="#editModal">Cập nhật</button>
                      <button type="button" class="btn btn-outline-danger btn-xs mb-0 delete">Xóa</button>
                      <button type="button" class="btn btn-outline-dark btn-xs mb-0 dssv" data-bs-toggle="modal" data-bs-target="#dssv">DSSV</button>
                      <button type="button" class="btn btn-outline-success btn-xs mb-0 view" data-bs-toggle="modal" data-bs-target="#viewModal">Quản lý buổi học</button>
                    </td>
                    </tr>
        `
    })
  }
  
  
  export default async function loadList(){
    await loadListLhp()
    // setTimeout(init, 5000)
    init()
  }
  