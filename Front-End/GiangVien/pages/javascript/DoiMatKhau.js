import * as loadlist from "../javascript/loadList.js";
import { server } from "../../../components/server/main.js";
 // CHANGE PASS
 var GV = window.localStorage.getItem('TENDN')
  let input = document.querySelectorAll(".input-pass")
  let tk = await loadlist.listTK({'TENDN': GV})
  let oldpass = tk[0].MATKHAU
  let btn = document.querySelector(".btn-pass")
  
  btn.addEventListener("click",(e)=>{
    console.log(input[0].value)
     if(input[0].value.length==0){
      alert("Mật khẫu cũ không được để trống!")
      return
     }
     else if(input[0].value!=oldpass){
        alert("Mật khẫu cũ không chính xác!")
        return
       }
     else if(input[1].value.length==0){
      alert("Mật khẫu mới không được để trống!")
      return
     }
     else if(input[2].value.length==0||input[2].value!=input[1].value){
      alert("Xác nhận mật khẩu mới không chính xác!")
      return
     }
     let data = {
      query: {
        TENDN: GV,
      },
      newValue: {
        MATKHAU: input[2].value
      },
    };
     server.update(server.tbl.TAIKHOAN, data).then((rs)=>{
      if(rs){
        alert("Đổi mật khẩu thành công")
        input[0].value = input[1].value = input[2].value = '' 
      }
      else{
        alert("Đổi mật khẩu thất bại!")
        return
      }
     })
  })