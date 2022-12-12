import getListLhp1 from "./script.js";
import loadListLhp from './loadListLhp.js'



function getParentId(e) {
  return e.target.parentElement.parentElement.id;
}

export default function init() {
  const btn_edit = document.querySelectorAll('.btn-edit')
  btn_edit.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      loadListLhp()
      let idLhp = getParentId(e)
      console.log(idLhp)
      let lhp = await getListLhp1({MALOPHP: idLhp})
      console.log(lhp[0])
      document.querySelector('.MALHP-edit').value = lhp[0].MALOPHP.trim()
      document.querySelector('.TENLOP-edit').value = lhp[0].TENLOP.trim()
      document.querySelector('.TENMON-edit').value = lhp[0].TENMH.trim()
    })
  })
}