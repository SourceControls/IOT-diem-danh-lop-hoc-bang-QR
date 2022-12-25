import { server } from '../../../components/server/main.js'
import getQRSrc from "../../../components/QR/main.js"
import isHappening from './Time.js'

let maSv = window.localStorage.getItem('TENDN')
var today = new Date()
var time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
let data1 = {
    NGAY: time
}
let idLsv = ""
let idBh = ""

async function loadNos(data) {
    const nos = document.querySelector('.nos')
    const avos = document.querySelector('.avos')
    let sv = await server.getList(server.tbl.SINHVIEN, { MASV: maSv })
    nos.innerHTML = sv[0].HOTEN
    avos.src = sv[0].HINH
}

var loadLh = async function (data) {
    const classHpn = document.querySelector('.classHpn')
    const classHpn1 = document.querySelector('.classHpn1')
    const prm0 = new Promise((resolve, rejects) => {
        let x = server.getList(server.tbl.CT_LOP_SV, { MASV: data });
        resolve(x)
    })
    const prm1 = new Promise((resolve, rejects) => {
        let x = server.getList(server.tbl.BUOIHOC, data1);
        resolve(x)
    })
    const prm2 = new Promise((resolve, rejects) => {
        let x = server.getList(server.tbl.LOPHOCPHAN, {});
        resolve(x)
    })
    const prm3 = new Promise((resolve, rejects) => {
        let x = server.getList(server.tbl.CT_LOP_GV, {});
        resolve(x)
    })
    const prm4 = new Promise((resolve, rejects) => {
        let x = server.getList(server.tbl.GIANGVIEN, {});
        resolve(x)
    })
    var x = await Promise.all([prm0, prm1, prm2, prm3, prm4])
    let newArr = []
    let dt = []
    let gv2 = []
    let list = []
    let id = ""
    let lhp = []
    let id1 = ""
    let lhp1 = []
    let gv3 = []
    let check = false
    let [lsv, bh, dtLhp, gv, gv1] = [...x]
    classHpn.innerHTML = ''
    classHpn1.innerHTML = ''
    // console.log(bh)
    // console.log(lsv)
    for (let a of lsv) {
        for (let b of bh) {
            if (a.MALOPHP == b.MALOPHP) {
                newArr.push({ ...a, ...b })
            }
        }
    }
    if (newArr.length == 0) {
        classHpn.innerHTML += `
        <button class="btn btn-success mb-0 w-100 h-100 border-radius-lg qrBtn">
                <p class="text-lg font-weight-bold">Không có buổi học nào đang diễn ra</p>
                <div class="text-sm font-weight-normal"></div>
                <div class="text-sm font-weight-normal"></div>
        </button>
        `
        classHpn1.innerHTML += `
                <p class="text-lg font-weight-bold">Không có buổi học nào sắp diễn ra</p>
                <div class="text-sm font-weight-normal"></div>
                <div class="text-sm font-weight-normal"></div>
        `
        return
    }
    list = newArr.sort((a, b) => {
        if (a.TIETBD < b.TIETBD) return -1
        return 1
    })
    let phong = ''
    // console.log(list)
    for (let l = 0; l < list.length; l++) {
        if (check) break
        if (isHappening(list[l].TIETBD, list[l].SOTIET)) {
            check = true
            console.log(list[l])
            id = list[l].MALOPHP
            if (++l >= list.length) {
                id1 = ''
            } else {
                id1 = list[l].MALOPHP
                phong = ''
                // console.log(list[l].IDBUOIHOC)
            }
        }
    }
    if (!check && today.getHours() < 17) {
        id = ''
        id1 = list[0].MALOPHP
        // console.log(list[0].IDBUOIHOC)
        phong = list[0].PHONG

    }
    for (let d of dtLhp) {
        if (d.MALOPHP == id) {
            lhp.push({ ...d })
            break
        }
    }
    for (let e of gv) {
        for (let f of gv1) {
            if (e.MAGV == f.MAGV && e.MALOPHP == id) {
                gv2.push({ ...e, ...f })
                break
            }
        }
    }
    idLsv = list[0].IDLSV
    idBh = list[0].IDBUOIHOC
    if (!id) {
        classHpn.innerHTML += `
        <button class="btn btn-success mb-0 w-100 h-100 border-radius-lg qrBtn">
                <p class="text-lg font-weight-bold">Không có buổi học nào đang diễn ra</p>
                <div class="text-sm font-weight-normal"></div>
                <div class="text-sm font-weight-normal"></div>
        </button>
        `
    } else {
        classHpn.innerHTML += `
            <button id="${list[0].IDLSV} ${list[0].IDBUOIHOC}" type="button" class="btn btn-success mb-0 w-100 h-100 border-radius-lg qrBtn" data-bs-toggle="modal" data-bs-target="#qr">
                    <p class="text-lg font-weight-bold">Buổi học đang diễn ra</p>
                    <div class="text-sm font-weight-normal">${lhp[0].TENLOP} - ${list[0].PHONG} - ${lhp[0].TENMH}</div>
                    <div class="text-sm font-weight-normal">${gv2[0].HOTEN + ' - ' + gv2[0].SDT + ' - ' + gv2[0].EMAIL}</div>
            </button>
        `
    }
    if (!id1) {
        classHpn1.innerHTML += `
                <p class="text-lg font-weight-bold">Không có buổi học nào sắp diễn ra</p>
                <div class="text-sm font-weight-normal"></div>
                <div class="text-sm font-weight-normal"></div>
        `
        return
    }
    for (let d of dtLhp) {
        if (d.MALOPHP == id1) {
            lhp1.push({ ...d })
            break
        }
    }
    for (let e of gv) {
        for (let f of gv1) {
            if (e.MAGV == f.MAGV && e.MALOPHP == id1) {
                gv3.push({ ...e, ...f })
                break
            }
        }
    }
    console.log(lhp1)
    classHpn1.innerHTML += `
        <p class="text-lg font-weight-bold">Buổi học sắp diễn ra</p>
        <div class="text-sm font-weight-normal">${lhp1[0].TENLOP} - ${phong == '' ? list[1].PHONG : phong} - ${lhp1[0].TENMH}</div>
         <div class="text-sm font-weight-normal">${gv3[0].HOTEN + ' - ' + gv3[0].SDT + ' - ' + gv3[0].EMAIL}</div>
    `
}

function initEvent() {
    const qrBtn = document.querySelector('.qrBtn')
    qrBtn.addEventListener("click", e => {
        const qrCode = document.querySelector('.qrCode')
        getQRSrc(idBh, idLsv, '200').then((src) => {
            qrCode.src = src;
            // console.log(src);
        });
    })
}


async function loadData(KEY) {
    await loadLh(KEY)
    loadNos(maSv)
    initEvent()
}

// console.log(maSv)
loadData(maSv)
// loadLh('SV04')


// loadLh('SV04');