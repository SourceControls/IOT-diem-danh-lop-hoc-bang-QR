import { server } from "../../../components/server/main.js";
import * as func from "../lecturersResource/function.js";
import uploadImg from "../../../components/Image/main.js";

async function loadList(KEY) {
  let list = await server.getList(server.tbl.SINHVIEN, KEY);
  let HTMLlist = document.querySelector("#list");
  const newList = list.sort((a, b) => {
    if (a.MASV < b.MASV) return -1;
    return 1;
  })
  let out = "";
  for (let sv of newList) {
    out += `
        <tr>
                      <td class="text-sm">
                        <div class="px-3">
                          <p class="mb-0">${sv.MASV}</p>
                        </div>
                      </td>
                      <td>
                        <h6 class="mb-0 text-sm">${sv.HOTEN}</h6>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-secondary">${sv.SDT}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="text-secondary">a${sv.EMAIL}</span>
                      </td>
                      <td class="align-middle text-center">
                        <img src=${sv.HINH} class="avatar avatar-lg" alt="user1">
                      </td>
                      <td class="align-middle">
                        <button type="button" class="btn btn-outline-primary btn-xs mb-0 update btn-update" data-bs-toggle="modal" data-bs-target="#updateModal ">Cập nhật</button>
                        <button type="button" class="btn btn-outline-danger btn-xs mb-0 btn-delete">Xóa</button>
                        <button type="button" class="btn btn-outline-success btn-xs mb-0 btn-create">Cấp TK</button>
                        <button type="button" class="btn btn-outline-secondary btn-xs mb-0 btn-reset">Reset MK</button>
                      </td>
                    </tr>
        `;
  }
  HTMLlist.innerHTML = out;
}

async function initEvent() {
  // THEM SV
  // let btn_add_form = document.querySelector(".btn-add");

  function ThemSv() {
    let input_add = document.querySelectorAll(".input-add");

    const imageInput_AddPopup = document.querySelector(".img-input");
    const image_AddPopup = document.querySelector(".avatar-img");
    const add_sv_form = document.querySelector("#add-sv-form");
    imageInput_AddPopup.addEventListener("change", () => {
      var file = imageInput_AddPopup.files[0];
      image_AddPopup.src = URL.createObjectURL(file);
    });
    func.newId('SINHVIEN')
    add_sv_form.addEventListener("submit", async (e) => {
      console.log("submited add SV");
      e.preventDefault();
      e.stopImmediatePropagation()
      const sv = Object.fromEntries(new FormData(e.target));
      if (input_add[0].value.length == 0) {
        alert("Bạn chưa chọn hình ảnh");
        return;
      }
      // if (sv.MASV.length == 0) {
      //   alert("Mã sinh viên không được để trống");
      //   return;
      // }
      if (sv.HOTEN.length == 0) {
        alert("Họ tên sinh viên không được để trống");
        return;
      }
      if (sv.SDT.length == 0) {
        alert("SĐT không được để trống");
        return;
      }
      if (sv.EMAIL.length == 0) {
        alert("Email không được để trống");
        return;
      }
      if (!func.validateEmail(sv.EMAIL)) {
        alert("Email không hợp lệ");
        return;
      }
      if (!func.validateSDT(sv.SDT)) {
        alert("SĐT không hợp lệ");
        return;
      }
      //nếu k có ảnh thì set ảnh mặc định

      if (sv.HINH.name != "") sv.HINH = await uploadImg(sv.HINH);
      else sv.HINH = image_AddPopup.src;

      server
        .insert(server.tbl.SINHVIEN, sv)
        .then((result) => {
          if (result) {
            alert("Thêm sinh viên thành công");
            loadListSV({});
            input_add[2].value = input_add[3].value = input_add[4].value = input_add[0].value = ''
            document.querySelector(".avatar-img").src = 'https://www.fao.org/fileadmin/templates/experts-feed-safety/images/profile-img03.jpg';
          } else alert("Thêm sinh viên thất bại");
        })
        .catch((err) => { });
    });
  }
  ThemSv();

  //   UPDATE SINH VIEN

  function CapNhatSv() {

    const imageInput_AddPopup = document.querySelector("#input_img");
    const image_AddPopup = document.querySelector(".avatar-img img");

    imageInput_AddPopup.addEventListener("change", () => {
      var file = imageInput_AddPopup.files[0];
      image_AddPopup.src = URL.createObjectURL(file);
    });

    var rows = document.getElementsByTagName("tbody")[0].rows;
    let btn_update = document.querySelectorAll(".btn-update");
    let input_update = document.querySelectorAll(".input-update");
    let btn_update_form = document.querySelector("#btn-update-form");

    for (var i = 0; i < btn_update.length; i++) {
      let x = i;
      btn_update[i].addEventListener("click", () => {
        input_update[1].value = rows[x].getElementsByTagName("td")[0].innerText;
        input_update[2].value = rows[x].getElementsByTagName("td")[1].innerText;
        input_update[3].value = rows[x].getElementsByTagName("td")[2].innerText;
        input_update[4].value = rows[x].getElementsByTagName("td")[3].innerText;
        server.getList(server.tbl.SINHVIEN, { 'MASV': rows[x].getElementsByTagName("td")[0].innerText }).then((rs) => {
          // console.log(rs)
          image_AddPopup.src = rs[0].HINH;
        })
      });
    }
    btn_update_form.addEventListener("submit", async (e) => {
      console.log("submited update SV");
      e.preventDefault();
      e.stopImmediatePropagation()
      const sv = Object.fromEntries(new FormData(e.target));
      if (sv.MASV.length == 0) {
        alert("Mã sinh viên không được để trống");
        return;
      }
      if (sv.HOTEN.length == 0) {
        alert("Họ tên sinh viên không được để trống");
        return;
      }
      if (sv.SDT.length == 0) {
        alert("SĐT không được để trống");
        return;
      }
      if (sv.EMAIL.length == 0) {
        alert("Email không được để trống");
        return;
      }
      if (!func.validateEmail(sv.EMAIL)) {
        alert("Email không hợp lệ");
        return;
      }
      if (!func.validateSDT(sv.SDT)) {
        alert("SĐT không hợp lệ");
        return;
      }
      if (sv.HINH.name != "")
        sv.HINH = await uploadImg(sv.HINH);

      else sv.HINH = document.querySelector(".avatar-img img").src;
      //nếu k có ảnh thì set ảnh mặc định
      let data = {
        query: {
          MASV: sv.MASV,
        },
        newValue: {
          MASV: sv.MASV,
          HOTEN: sv.HOTEN,
          SDT: sv.SDT,
          EMAIL: sv.EMAIL,
          HINH: sv.HINH,
        },
      };

      // console.log(sv.HINH)
      let result = await server.update(server.tbl.SINHVIEN, data)
      if (result) {
        alert("Cập nhật sinh viên thành công");
        loadListSV({});
      } else { alert("Cập nhật sinh viên thất bại"); return }
    });
  }
  CapNhatSv();


  //   XOA SINH VIEN
  let btn_delete = document.querySelectorAll(".btn-delete");
  for (var i = 0; i < btn_delete.length; i++) {
    let x = i;
    btn_delete[i].addEventListener("click", (event) => {
      let data = {
        MASV: rows[x].getElementsByTagName("td")[0].innerText,
      };
      let tk = {
        TENDN: rows[x].getElementsByTagName("td")[0].innerText
      }

      server.getList(server.tbl.CT_LOP_SV, data).then((result) => {
        if (result.length > 0) {
          alert("Không thể xóa sinh viên đang có lớp học!")
          // console.log(result.length)
        } else {
          server.getList(server.tbl.TAIKHOAN, tk).then((result) => {
            // console.log(result)
            if (result.length > 0) {
              server.delete(server.tbl.TAIKHOAN, tk).then((result) => { }).catch((error) => { })
            }
            server
              .delete(server.tbl.SINHVIEN, data)
              .then((result) => {
                console.log(result)
                if (result) {
                  alert("Xóa sinh viên thành công");
                  loadListSV({})
                } else {
                  alert("Xóa sinh viên thất bại");
                }
              })
              .catch((err) => { });
          })
        }
      })
    })
  }
  // RESET MK
  var rows = document.getElementsByTagName("tbody")[0].rows;
  let btn_reset = document.querySelectorAll(".btn-reset");
  for (var i = 0; i < btn_reset.length; i++) {
    let x = i;
    btn_reset[i].addEventListener("click", () => {
      server
        .getList(server.tbl.TAIKHOAN, {
          TENDN: rows[x].getElementsByTagName("td")[0].innerText,
        })
        .then((result) => {
          if (result.length > 0) {
            func.resetMK(rows[x].getElementsByTagName("td")[0].innerText);
            loadListSV({});
          } else {
            alert("Sinh viên chưa có tài khoản!");
          }
        });
    });
  }

  // CAP TK
  var rows = document.getElementsByTagName("tbody")[0].rows;
  let btn_create = document.querySelectorAll(".btn-create");
  for (var i = 0; i < btn_create.length; i++) {
    let x = i;
    btn_create[i].addEventListener("click", () => {
      server
        .getList(server.tbl.TAIKHOAN, {
          TENDN: rows[x].getElementsByTagName("td")[0].innerText,
        })
        .then((result) => {
          // console.log(result);
          if (result.length > 0) alert("Sinh viên đã có tài khoản!");
          else {
            func.capTK(rows[x].getElementsByTagName("td")[0].innerText);
            loadListSV({});
          }
        });
    });
  }
}

async function loadListSV(KEY) {
  await loadList(KEY);
  initEvent();
}
loadListSV({});

// TÌM KIEM
let searchBox = document.querySelector(".search-box");
let btn_search = document.querySelector(".btn-search");
btn_search.addEventListener("click", (e) => {
  let KEY = searchBox.value;
  if (KEY) {
    loadListSV({
      $or: [
        { MASV: { $regex: ".*" + KEY.trim() + ".*", $options: "i" } },
        { HOTEN: { $regex: ".*" + KEY.trim() + ".*", $options: "i" } },
      ],
    });
  }
  else
    alert('Bạn chưa nhập thông tin cần tìm!')
});
searchBox.addEventListener('keypress', (e) => {

  if (e.key === 'Enter') {
    e.preventDefault()
    let KEY = searchBox.value;
    if (KEY) {
      loadListSV({
        $or: [
          { MASV: { $regex: ".*" + KEY.trim() + ".*", $options: "i" } },
          { HOTEN: { $regex: ".*" + KEY.trim() + ".*", $options: "i" } },
        ],
      });
    }
    else {
      alert('Bạn chưa nhập thông tin cần tìm!')
      e.preventDefault()
    }
  }
})
searchBox.addEventListener("keyup", () => {
  let KEY = searchBox.value;
  if (KEY.length == 0)
    loadListSV({})
})
