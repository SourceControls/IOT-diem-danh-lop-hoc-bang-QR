import { server } from "../../../components/server/main.js";
import * as load from "../javascript/joinList.js";

async function loadList(GV = {}, con) {
  let list = await load.listBuoiHoc(GV, con);
  console.log(list);
  let HTMLlist = document.querySelector("#BHtable");
  const newList = list.sort((a, b) => {
    if (a.IDBUOIHOC < b.IDBUOIHOC) return -1;
    return 1;
  });
  let out = "";
  for (let bh of newList) {
    out += `
      <tr>
      <td class="text-sm">
        <div class="px-3">
          <p class="mb-0">${bh.IDBUOIHOC}</p>
        </div>
      </td>
      <td>
        <h6 class="mb-0 text-sm">${bh.TENLOP}</h6>
      </td>
      <td class="align-middle text-sm">
        <span class="text-secondary">${bh.TENMH}</span>
      </td>
      <td class="align-middle text-sm">
        <p class="mb-0">${bh.NGAY}</p>
      </td>
      <td class="align-middle text-sm">
        <p class="mb-0">${bh.TIETBD}</p>  
      </td>
      <td class="align-middle text-sm">
        <p class="mb-0">${bh.PHONG}</p>
      </td>
      <td class="align-middle text-sm">
        <p class="mb-0">${bh.SOTIET}</p>
      </td>
      <td class="align-middle">
        <button type="button" class="btn btn-outline-success btn-xs mb-0 view btn-dd2" data-bs-toggle="modal" data-bs-target="#diemdanh">Điểm danh</button>
      </td>
    </tr>
          `;
  }
  HTMLlist.innerHTML = out;
}
async function loadListDD(MH = {}, BH = {}, con) {
  let list = await load.listSVDD(MH, BH, con);
  console.log(list);
  let HTMLlist = document.querySelector(".tabledd");
  const newList = list.sort((a, b) => {
    if (a.MASV < b.MASV) return -1;
    return 1;
  });
  let out = "";
  for (let dd of newList) {
    out += `
    <tr>
    <td class="ps-0">${dd.MASV}</td>
    <td>${dd.HOTEN}</td>
    <td class="text-center">${dd.DADIEMDANH}</td>
    <td>${dd.GHICHU}</td>
    <td>${dd.SDT}</td>
    <td>${dd.EMAIL}</td>
    <td><button class="btn btn-outline-danger btn-xs mb-0">Hủy điểm danh</button></td>
  </tr>
          `;
  }
  HTMLlist.innerHTML = out;
}

async function initEvent() {
  // function tiet(x){
  //   if()
  // }
  async function getMaLHP(i) {
    let list = await load.listBuoiHoc({ 'MAGV': 'GV05' }, '')
    loadListDD({ 'MALOPHP': list[i].MALOPHP }, { 'IDBUOIHOC': Number(rows[i].getElementsByTagName("td")[0].innerText) }, '')
  }
  var rows = document.getElementsByTagName("tbody")[0].rows;
  let btndd = document.querySelectorAll(".btn-dd2")
  for (var i = 0; i < rows.length; i++) {
    let x = i
    btndd[i].addEventListener("click", (e) => {
      getMaLHP(x)
      document.querySelector(".ddText").innerText = `Giảng viên:\tGV01\nLớp: ${rows[x].getElementsByTagName("td")[1].innerText}\nBuổi:\t${rows[x].getElementsByTagName("td")[0].innerText}\nPhòng:\t${rows[x].getElementsByTagName("td")[5].innerText}`
    })
  }
  let BHonAir = document.querySelector(".BHonAir");
  let BH = await load.listBuoiHoc({ MAGV: "GV05" }, "");
  var result = BH.filter(function (el) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "/" + mm + "/" + dd;
    return el.NGAY == today;
  });
  if (result.length > 0) {
    BHonAir.innerText = `Môn học:\t${result[0].TENMH}\nNgày: ${result[0].NGAY}\nTiết bắt đầu: ${result[0].TIETBD}`;
  } else {
    BHonAir.innerText = `Hiện chưa có buổi học`;
  }
}

async function loadListBH(GV = {}, con) {
  await loadList(GV, con);
  initEvent();
}
loadListBH({ MAGV: "GV05" }, "");

// TÌM KIEM
let searchBox = document.querySelector(".search-box");
let btn_search = document.querySelector(".btn-search");

btn_search.addEventListener("click", (e) => {
  let KEY = searchBox.value;
  e.preventDefault();
  if (KEY) {
    loadListBH({ MAGV: "GV05" }, KEY);
  } else {
    alert("Bạn chưa nhập thông tin cần tìm!");
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let KEY = searchBox.value;
    if (KEY) {
      loadListBH({ MAGV: "GV05" }, KEY);
    } else {
      alert("Bạn chưa nhập thông tin cần tìm!");
      e.preventDefault();
    }
  }
});

searchBox.addEventListener("keyup", () => {
  let KEY = searchBox.value;
  if (KEY.length == 0) loadListBH({ MAGV: "GV05" }, "");
});
