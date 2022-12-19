import { server } from "../../components/server/main.js";

export async function listLHP(data = {}) {
  const lhp = server.getList(server.tbl.LOPHOCPHAN, data).then((result) => {
    return result;
  });
  return lhp;
}

export async function listLGV(data = {}) {
  const lgv = server.getList(server.tbl.CT_LOP_GV, data).then((result) => {
    return result;
  });
  return lgv;
}

export async function listBH(data = {}) {
  const bh = server.getList(server.tbl.BUOIHOC, data).then((result) => {
    return result;
  });
  return bh;
}

export async function listLSV(data = {}) {
  const bh = server.getList(server.tbl.CT_LOP_SV, data).then((result) => {
    return result;
  });
  return bh;
}

export async function listSV(data = {}) {
  const bh = server.getList(server.tbl.SINHVIEN, data).then((result) => {
    return result;
  });
  return bh;
}
export async function listCTDD(data = {}) {
  const bh = server.getList(server.tbl.CT_DIEMDANH, data).then((result) => {
    return result;
  });
  return bh;
}
