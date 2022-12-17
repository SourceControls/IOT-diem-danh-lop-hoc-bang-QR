import { server } from '../../../../components/server/main.js'

let masv = 'SV04'

async function checkPass(pass) {
    let data = {
        TENDN: masv,
        MATKHAU: pass
    }
    const rs = await server.getList(server.tbl.TAIKHOAN, data).then(result => {
        return result.length
    })
    return rs
}

function initEvent(){
    const oldPass = document.querySelector('.oldPassword')
    const newPass = document.querySelector('.newPassword')
    const submitPass = document.querySelector('.submitPassword')
    const submit = document.querySelector('.submit')
    submit.onclick = async () => {
        let pass = oldPass.value
        let newP = newPass.value
        let submitP = submitPass.value 
        if(await checkPass(pass) == 0){
            alert('Sai mật khẩu cũ')
            return
        }
        if(newP !== submitP){
            alert('Mật khẩu mới và xác nhận mật khẩu mới không khớp')
            return
        }
        let data = {
            query: {
                TENDN: masv
            },
            newValue: {
                MATKHAU: newP
            }
        }
        server.update(server.tbl.TAIKHOAN, data).then(result => {
            if(result){
                alert('Đổi mật khẩu thành công')
                return
            }
        })
    }

}

initEvent()