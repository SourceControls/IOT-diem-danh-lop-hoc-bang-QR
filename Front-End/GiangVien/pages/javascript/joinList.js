import { server } from "../../components/server/main.js";
import * as load from "../javascript/loadList.js";

export async function listBuoiHoc(data = {}, con) {
  const listBH = await load.listBH({});
  const listLGV = await load.listLGV(data);
  const listLHP = await load.listLHP({});

  const cMap = new Map(listBH.map((o) => [o.MALOPHP, o]));
  const list1 = listLGV.reduce(
    (a, o) =>
      cMap.has(o.MALOPHP) ? [...a, { ...o, ...cMap.get(o.MALOPHP) }] : a,
    []
  );

  const kMap = new Map(list1.map((o) => [o.MALOPHP, o]));
  const list2 = listLHP.reduce(
    (a, o) =>
      kMap.has(o.MALOPHP) ? [...a, { ...o, ...kMap.get(o.MALOPHP) }] : a,
    []
  );


    var result = list2.filter(function (el) {
      return !el.IDLGVSUBMITTED;
    });

    if (con.length != 0) {
      let filter = result.filter((e) => {
        return Object.values(e).some((value) => {
          return value.toString().toLowerCase().includes(con.toLowerCase( ));
        });
      });
  return filter;
    }

    // return result;
    return list1;
}

export async function listSVDD(mh = {}, bh={}, con) {
  const listSV = await load.listSV({});
  const listCTDD = await load.listCTDD(bh);
  const listLSV = await load.listLSV(mh);

  const cMap = new Map(listLSV.map((o) => [o.MASV, o]));
  const list1 = listSV.reduce(
    (a, o) =>
      cMap.has(o.MASV) ? [...a, { ...o, ...cMap.get(o.MASV) }] : a,
    []
  );

  const kMap = new Map(list1.map((o) => [o.IDLSV, o]));
  const list2 = listCTDD.reduce(
    (a, o) =>
      kMap.has(o.IDLSV) ? [...a, { ...o, ...kMap.get(o.IDLSV) }] : a,
    []
  );


  //   var result = list2.filter(function (el) {
  //     return !el.IDLGVSUBMITTED;
  //   });

  //   if (con.length != 0) {
  //     let filter = result.filter((e) => {
  //       return Object.values(e).some((value) => {
  //         return value.toString().toLowerCase().includes(con.toLowerCase( ));
  //       });
  //     });
  // return filter;
  //   }

    // return listCTDD;
    return list2;
    // return list1;
    // return listLSV;
}
// console.log(listSVDD({'MALOPHP': 'MALOP01'}, {'IDBUOIHOC': 2},''))
// console.log(await load.listCTDD({'IDBUOIHOC': 2}))



