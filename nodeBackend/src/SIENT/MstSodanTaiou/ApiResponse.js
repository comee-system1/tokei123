let mstSodantaiou = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    mstSodantaiou = [];
    if (!res) {
      return mstSodantaiou;
    }
    let mst = {};
    res.data.forEach(function (element) {
      mst = {
        cskmkid: element.cskmkid,
        code: element.code,
        names: element.names,
        ryaku: element.ryaku,
        cskbn: element.cskbn,
        color: element.color,
        syukflg: element.syukflg,
        tyu: [],
      };
      element.tyu.forEach(function (element2) {
        mst.tyu.push({
          cskmkid: element2.cskmkid,
          code: element2.code,
          names: element2.names,
          ryaku: element2.ryaku,
          color: element2.color,
          syukflg: element2.syukflg,
        });
      });
      mstSodantaiou.push(mst);
    });

    return mstSodantaiou;
  }
}