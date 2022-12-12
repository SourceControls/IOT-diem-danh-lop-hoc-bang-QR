import { server } from "../../../components/server/main.js";
import * as func from "./function.js";
import uploadImg from '../../components/Image/main.js'

async function loadList(KEY) {
  let list = await server.getList(server.tbl.GIANGVIEN, KEY);
  let HTMLlist = document.querySelector("#list");
  console.log(list);
  let out = "";
  for (let gv of list) {
    out += `
        <tr>
        <td class="text-sm">
          <div class="px-3">
            <p class="mb-0">${gv.MAGV}</p>
          </div>
        </td>
        <td>
          <h6 class="mb-0 text-sm">${gv.HOTEN}</h6>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="text-secondary">${gv.SDT}</span>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="text-secondary">${gv.EMAIL}</span>
        </td>
        <td class="align-middle text-center">
          <img src=${gv.HINH} class="avatar avatar-lg" alt="user1">
        </td>
        <td class="align-middle">
          <button type="button" class="btn btn-outline-primary btn-xs mb-0 btn-update " data-bs-toggle="modal" data-bs-target="#updateModal">Cập nhật</button>
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
  // THEM GV
  let input_add = document.querySelectorAll(".input-add");
  function ThemGv() {
    const imageInput_AddPopup = input_add[0];
    const image_AddPopup = document.querySelector(".avatar-img");
    const add_gv_form = document.querySelector("#add-gv-form");

    //handle ảnh
    imageInput_AddPopup.addEventListener("change", () => {
      var file = imageInput_AddPopup.files[0];
      image_AddPopup.src = URL.createObjectURL(file);
    });
    add_gv_form.addEventListener("submit", async (e) => {
      console.log("submited add GV");
      e.preventDefault();
      const gv = Object.fromEntries(new FormData(e.target));
      if (gv.HINH.length == 0) {
        alert("Bạn chưa chọn hình ảnh");
        return;
      }
      if (gv.MAGV.length == 0) {
        alert("Mã giảng viên không được để trống");
        return;
      }
      if (gv.HOTEN.length == 0) {
        alert("Họ tên giảng viên không được để trống");
        return;
      }
      if (gv.SDT.length == 0) {
        alert("SĐT không được để trống");
        return;
      }
      if (gv.EMAIL.length == 0) {
        alert("Email không được để trống");
        return;
      }
      if (!func.validateEmail(gv.EMAIL)) {
        alert("Email không hợp lệ");
        return;
      }
      if (!func.validateSDT(gv.SDT)) {
        alert("SĐT không hợp lệ");
        return;
      }
      //nếu k có ảnh thì set ảnh mặc định

      if (gv.HINH.name != "") gv.HINH = await uploadImg(gv.HINH);
      else gv.HINH = image_AddPopup.src;

      server
        .insert(server.tbl.GIANGVIEN, gv)
        .then((result) => {
          if (result) {
            alert("Thêm giảng viên thành công");
            loadListGV({});
          } else alert("Thêm giảng viên thất bại");
        })
        .catch((err) => {});
    });
  }
  ThemGv();
  //   UPDATE GIANG VIEN
  var rows = document.getElementsByTagName("tbody")[0].rows;
  let btn_update = document.querySelectorAll(".btn-update");
  let input_update = document.querySelectorAll(".input-update");
  let btn_update_form = document.querySelector(".btn-update-form");
  for (var i = 0; i < btn_update.length; i++) {
    let x = i;
    btn_update[i].addEventListener("click", (event) => {
      // SET INPUT VALUE
      input_update[1].value = rows[x].getElementsByTagName("td")[0].innerText;
      input_update[2].value = rows[x].getElementsByTagName("td")[1].innerText;
      input_update[3].value = rows[x].getElementsByTagName("td")[2].innerText;
      input_update[4].value = rows[x].getElementsByTagName("td")[3].innerText;

      btn_update_form.addEventListener("click", () => {
        if (input_update[1].value.length == 0)
          alert("Mã giảng viên không được để trống");
        else if (input_update[2].value.length == 0)
          alert("Họ tên giảng viên không được để trống");
        else if (input_update[3].value.length == 0)
          alert("SĐT không được để trống");
        else if (input_update[4].value.length == 0)
          alert("Email không được để trống");
        else if (!func.validateEmail(input_update[4].value))
          alert("Email không hợp lệ");
        else if (!func.validateSDT(input_update[3].value))
          alert("SĐT không hợp lệ");
        else {
          let data = {
            query: {
              MAGV: input_update[1].value,
            },
            newValue: {
              MAGV: input_update[1].value,
              HOTEN: input_update[2].value,
              SDT: input_update[3].value,
              EMAIL: input_update[4].value
            },
          };
          // console.log(data);
          server
            .update(server.tbl.GIANGVIEN, data)
            .then((result) => {
              // console.log(result);
              if (result) {
                alert("Cập nhật giảng viên thành công");
                loadListGV({});
              } else {
                alert("Cập nhật giảng viên thất bại");
                // console.log(data)
              }
            })
            .catch((err) => {});
        }
      });
    });
  }
  //   XOA GIANG VIEN
  let btn_delete = document.querySelectorAll(".btn-delete");
  for (var i = 0; i < btn_delete.length; i++) {
    let x = i;
    btn_delete[i].addEventListener("click", (event) => {
      let data = {
        MAGV: rows[x].getElementsByTagName("td")[0].innerText,
      };
      server
        .delete(server.tbl.GIANGVIEN, data)
        .then((result) => {
          if (result) {
            alert("Xóa giảng viên thành công");
            window.location.reload();
          } else alert("Xoá giảng viên thất bại");
        })
        .catch((err) => {});
    });
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
            loadListGV({});
          } else {
            alert("Giảng viên chưa có tài khoản!");
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
          if (result.length > 0) alert("Giảng viên đã có tài khoản!");
          else {
            func.capTK(rows[x].getElementsByTagName("td")[0].innerText);
            loadListGV({});
          }
        });
    });
  }
}

async function loadListGV(KEY) {
  await loadList(KEY);
  initEvent();
}
loadListGV({});

// TÌM KIEM
let searchBox = document.querySelector(".search-box");
let btn_search = document.querySelector(".btn-search");
btn_search.addEventListener("click", () => {
  let KEY = searchBox.value;
  if (KEY) {
    loadListGV({
      $or: [
        { MAGV: { $regex: ".*" + KEY.trim() + ".*", $options: "i" } },
        { HOTEN: { $regex: ".*" + KEY.trim() + ".*", $options: "i" } },
      ],
    });
  }
});
