let uketukeIcrn = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    uketukeIcrn = [];
    if (!res) {
      return uketukeIcrn;
    }
    res.data.forEach(function (element) {

      uketukeIcrn.push({
        entpriid: element.entpriid,
        ymd: element.ymd,
        rcnt: element.rcnt,
        jikan: element.jikan,
        intcode: element.intcode,
        riyocode: element.riyocode,
        rname: element.rname,
        rkana: element.rkana,
        sex: element.sex,
        sexname: element.sexname,
        birth: element.birth,
        cskbn: element.cskbn,
        nkbn: element.nkbn,
        dokoflg: element.dokoflg,
        sdntioflg: element.sdntioflg,
        sdntiork: element.sdntiork,
        sdnhouid: element.sdnhouid,
        sdnhourk: element.sdnhourk,
        sdnkanid: element.sdnkanid,
        sdnkanrk: element.sdnkanrk,
        sdnnam: element.sdnnam,
        sdntel: element.sdntel,
        setaiid: element.setaiid,
        setairk: element.setairk,
        honninid: element.honninid,
        honninrk: element.honninrk,
        kasan: element.kasan,
        kasanrk: element.kasanrk,
        homon: element.homon,
        kikan: element.kikan,
        tanto: element.tanto,
        basho: element.basho,
        etime: element.etime,
        sykkbn: element.sykkbn,
        sykkbnkigo: element.sykkbnkigo,
        daicskmkid: element.daicskmkid,
        daicskmkrk: element.daicskmkrk,
        cskmkid: element.cskmkid,
        cskmknm: element.cskmknm,
        naiyo: element.naiyo,
        syoyo: element.syoyo,
        rank: element.rank,
        ranknm: element.ranknm,
        kan: element.kan,
        nismark: element.nismark,
        siid: element.siid,
        sryaku: element.sryaku,
      });
    });
    return uketukeIcrn;
  }
}