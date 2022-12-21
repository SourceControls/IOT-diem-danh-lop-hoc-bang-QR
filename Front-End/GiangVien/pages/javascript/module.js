import { server } from "../../../components/server/main.js";
import * as load from "../javascript/joinList.js";

var GV = window.localStorage.getItem("TENDN");
async function loadList(GV = {}, con) {
  let list = await load.listBuoiHoc(GV, con);
  // console.log(list);
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
  // console.log(list);
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
  async function getMaLHP(i, key) {
    let list = await load.listBuoiHoc({ MAGV: GV }, "");
    loadListDD(
      { MALOPHP: list[i].MALOPHP },
      { IDBUOIHOC: Number(rows[i].getElementsByTagName("td")[0].innerText) },
      ""
    );
  }
  var rows = document.getElementsByTagName("tbody")[0].rows;
  let btndd = document.querySelectorAll(".btn-dd2");
  for (var i = 0; i < rows.length; i++) {
    let x = i;
    btndd[i].addEventListener("click", (e) => {
      getMaLHP(x, "");

      let searchBox1 = document.querySelector(".search-box1");
      let btn_search1 = document.querySelector(".btn-search1");
      let k = x
      btn_search1.addEventListener("click", (e) => {
        // alert("")
        let KEY = searchBox1.value;
        e.preventDefault();
        if (KEY) {
          getMaLHP(k, KEY)
        } else {
          alert("Bạn chưa nhập thông tin cần tìm!");
          return
        }
      });
      searchBox1.addEventListener("keypress", (e) => {
        // alert('')
        if (e.key === "Enter") {
          e.preventDefault();
          let KEY = searchBox1.value;
          if (KEY) {
            getMaLHP(k, KEY)
          } else {
            alert("Bạn chưa nhập thông tin cần tìm!");
            e.preventDefault();
          }
        }
      });

      searchBox1.addEventListener("keyup", () => {
        let KEY = searchBox1.value;
        if (KEY.length == 0)
          getMaLHP(k, "")
      });

      document.querySelector(".ddText").innerText = `Giảng viên:\t${GV}\nLớp: ${rows[x].getElementsByTagName("td")[1].innerText
        }\nBuổi:\t${rows[x].getElementsByTagName("td")[0].innerText}\nPhòng:\t${rows[x].getElementsByTagName("td")[5].innerText
        }`;
    });
  }
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

  // console.log(newList);
  // console.log(BH);
  if (newList.length > 1) {
    let mark = 0;
    for (let i = 0; i < newList.length; i++) {
      if (isHappen(newList[i].TIETBD, newList[i].SOTIET)) {
        if (i == 0) {
          BHonAir.innerText = `Môn học:\t${newList[i].TENMH}\nNgày: ${newList[i].NGAY}\nTiết bắt đầu: ${newList[i].TIETBD}`;
          BHonAir1.innerText = `Môn học:\t${newList[1].TENMH}\nNgày: ${newList[1].NGAY}\nTiết bắt đầu: ${newList[1].TIETBD}`;
          mark += 1;
        }
        if (i > 0) {
          if (i == newList.length - 1) {
            BHonAir.innerText = `Môn học:\t${newList[i].TENMH}\nNgày: ${newList[i].NGAY}\nTiết bắt đầu: ${newList[i].TIETBD}`;
            BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
            mark += 1;
          } else {
            BHonAir.innerText = `Môn học:\t${newList[i].TENMH}\nNgày: ${newList[i].NGAY}\nTiết bắt đầu: ${newList[i].TIETBD}`;
            BHonAir1.innerText = `Môn học:\t${newList[i + 1].TENMH}\nNgày: ${newList[i + 1].NGAY
              }\nTiết bắt đầu: ${newList[i + 1].TIETBD}`;
            mark += 1;
          }
        }
      }
    }
    if (mark == 0) {
      BHonAir.innerText = `Hiện chưa có buổi học`;
      BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
    }
  }
  if (newList.length == 1) {
    if (isHappen(newList[0].TIETBD, newList[0].SOTIET)) {
      BHonAir.innerText = `Môn học:\t${newList[0].TENMH}\nNgày: ${newList[0].NGAY}\nTiết bắt đầu: ${newList[0].TIETBD}`;
      BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
    } else {
      BHonAir.innerText = `Hiện chưa có buổi học`;
      BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
    }
  }
  if (newList.length == 0) {
    BHonAir.innerText = `Hiện chưa có buổi học`;
    BHonAir1.innerText = `Môn học:\t${newList2[0].TENMH}\nNgày: ${newList2[0].NGAY}\nTiết bắt đầu: ${newList2[0].TIETBD}`;
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
    if (tbd == 1) tbdTime = new moment("07:30", "HH:mm").format("HH:mm");
    if (tbd == 2) tbdTime = new moment("08:15", "HH:mm").format("HH:mm");
    if (tbd == 3) tbdTime = new moment("09:00", "HH:mm").format("HH:mm");
    if (tbd == 4) tbdTime = new moment("09:45", "HH:mm").format("HH:mm");
    if (tbd == 5) tbdTime = new moment("10:00", "HH:mm").format("HH:mm");
    if (tbd == 6) tbdTime = new moment("10:45", "HH:mm").format("HH:mm");
    if (tbd == 7) tbdTime = new moment("13:30", "HH:mm").format("HH:mm");
    if (tbd == 8) tbdTime = new moment("14:15", "HH:mm").format("HH:mm");
    if (tbd == 9) tbdTime = new moment("15:00", "HH:mm").format("HH:mm");

    let test = moment(tbdTime, "HH:mm");

    if (st == 1) {
      sotTime = moment(test).add(45, "minutes").format("HH:mm");
    }
    if (st == 2) {
      sotTime = moment(test).add(90, "minutes").format("HH:mm");
    }
    if (st == 3) {
      sotTime = moment(test).add(135, "minutes").format("HH:mm");
    }
    if (st == 4) {
      sotTime = moment(test).add(180, "minutes").format("HH:mm");
    }
    if (st == 5) {
      sotTime = moment(test).add(225, "minutes").format("HH:mm");
    }
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
