import { server } from "../../../components/server/main.js";
import * as load from "../javascript/joinList.js";
import initBtnsDiemDanh from "./moduleDiemDanh.js";
var GV = window.localStorage.getItem("TENDN");
async function loadList(GV = {}, con) {
  let list = await load.listBuoiHoc(GV, con);
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
        <button type="button" data-set="${bh.IDBUOIHOC + '&' + bh.TENMH + '&' + bh.NGAY}" class="btn btn-outline-success btn-xs mb-0 view btn-dd2" data-bs-toggle="modal" data-bs-target="#diemdanh">Điểm danh</button>
      </td>
    </tr>
          `;
  }
  HTMLlist.innerHTML = out;
  initBtnsDiemDanh();

}

async function initEvent() {

  var rows = document.getElementsByTagName("tbody")[0].rows;
  let btnddHappening = document.querySelector(".btn-dd-happening");

  let BHonAir = document.querySelector(".BHonAir");
  let BHonAir1 = document.querySelector(".BHonAir1");

  let BH = await load.listBuoiHoc({ MAGV: GV }, "");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  var result = BH.filter(function (el) {
    return el.NGAY == today;
  });
  var result2 = BH.filter(function (el) {
    return el.NGAY > today;
  });
  const newList = result.sort((a, b) => {
    if (a.TIETBD < b.TIETBD) return -1;
    return 1;
  });
  const newList2 = result2.sort((a, b) => {
    if (a.NGAY < b.NGAY) return -1;
    return 1;
  });

  // console.log(BH);
  // console.log(newList);
  // console.log(BH);
  if (newList.length > 1) {
    let mark = 0;
    for (let i = 0; i < newList.length; i++) {
      if (isHappen(newList[i].TIETBD, newList[i].SOTIET)) {
        if (i == 0) {
          BHonAir.innerText = `Môn học:\t${newList[i].TENMH}\nNgày: ${newList[i].NGAY}\nTiết bắt đầu: ${newList[i].TIETBD}`;
          BHonAir1.innerText = `Môn học:\t${newList[1].TENMH}\nNgày: ${newList[1].NGAY}\nTiết bắt đầu: ${newList[1].TIETBD}`;
          btnddHappening.style.display = "block";
          btnddHappening.dataset.set = `${newList[i].IDBUOIHOC + '&' + newList[i].TENMH + '&' + newList[i].NGAY}`
          mark += 1;
        }
        if (i > 0) {
          if (i == newList.length - 1) {
            BHonAir.innerText = `Môn học:\t${newList[i].TENMH}\nNgày: ${newList[i].NGAY}\nTiết bắt đầu: ${newList[i].TIETBD}`;
            BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
            btnddHappening.style.display = "block";
            btnddHappening.dataset.set = `${newList[i].IDBUOIHOC + '&' + newList[i].TENMH + '&' + newList[i].NGAY}`
            mark += 1;
          } else {
            BHonAir.innerText = `Môn học:\t${newList[i].TENMH}\nNgày: ${newList[i].NGAY}\nTiết bắt đầu: ${newList[i].TIETBD}`;
            BHonAir1.innerText = `Môn học:\t${newList[i + 1].TENMH}\nNgày: ${newList[i + 1].NGAY
              }\nTiết bắt đầu: ${newList[i + 1].TIETBD}`;
            btnddHappening.dataset.set = `${newList[i].IDBUOIHOC + '&' + newList[i].TENMH + '&' + newList[i].NGAY}`
            btnddHappening.style.display = "block";
            mark += 1;
          }
        }
      }
    }
    if (mark == 0) {
      BHonAir.innerText = `Hiện chưa có buổi học`;
      BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
      btnddHappening.style.display = "none";
    }
  }
  if (newList.length == 1) {
    if (isHappen(newList[0].TIETBD, newList[0].SOTIET)) {
      BHonAir.innerText = `Môn học:\t${newList[0].TENMH}\nNgày: ${newList[0].NGAY}\nTiết bắt đầu: ${newList[0].TIETBD}`;
      BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
    } else {
      BHonAir.innerText = `Hiện chưa có buổi học`;
      if (newList2[0])
        BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
      else
        BHonAir1.innerText = "Không có buổi học";
      btnddHappening.style.display = "none";
    }
  }
  if (newList.length == 0) {
    BHonAir.innerText = `Hiện chưa có buổi học`;
    if (newList2[0])
      BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
    else
      BHonAir1.innerText = "Không có buổi học";
    btnddHappening.style.display = "none";
  }
  function getDateFromHours(time) {
    time = time.split(":");
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
  }

  function isHappen(tbd, st) {
    let current = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    let tbdTime;
    let sotTime;
    if (tbd == 1) tbdTime = new moment("07:00", "HH:mm").format("HH:mm");
    if (tbd == 2) tbdTime = new moment("08:15", "HH:mm").format("HH:mm");
    if (tbd == 3) tbdTime = new moment("09:00", "HH:mm").format("HH:mm");
    if (tbd == 4) tbdTime = new moment("09:45", "HH:mm").format("HH:mm");
    if (tbd == 5) tbdTime = new moment("10:30", "HH:mm").format("HH:mm");
    if (tbd == 6) tbdTime = new moment("11:15", "HH:mm").format("HH:mm");
    if (tbd == 7) tbdTime = new moment("13:30", "HH:mm").format("HH:mm");
    if (tbd == 8) tbdTime = new moment("14:15", "HH:mm").format("HH:mm");
    if (tbd == 9) tbdTime = new moment("15:00", "HH:mm").format("HH:mm");

    let test = moment(tbdTime, "HH:mm");

    sotTime = moment(test).add(45 * st, "minutes").format("HH:mm");
    console.log(tbdTime, current, sotTime);
    return current >= tbdTime && current <= sotTime;
  }
}

async function loadListBH(GV = {}, con) {
  await loadList(GV, con);
  initEvent();
}
loadListBH({ MAGV: GV }, "");

// TÌM KIEM
let searchBox = document.querySelector(".search-box");
let btn_search = document.querySelector(".btn-search");

btn_search.addEventListener("click", (e) => {
  let KEY = searchBox.value;
  e.preventDefault();
  if (KEY) {
    loadListBH({ MAGV: GV }, KEY);
  } else {
    alert("Bạn chưa nhập thông tin cần tìm!");
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let KEY = searchBox.value;
    if (KEY) {
      loadListBH({ MAGV: GV }, KEY);
    } else {
      alert("Bạn chưa nhập thông tin cần tìm!");
      e.preventDefault();
    }
  }
});

searchBox.addEventListener("keyup", () => {
  let KEY = searchBox.value;
  if (KEY.length == 0) loadListBH({ MAGV: GV }, "");
});
