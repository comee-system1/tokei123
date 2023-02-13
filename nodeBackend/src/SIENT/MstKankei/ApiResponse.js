let result = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    result = [];
    if (!res) {
      return result;
    }
    res.data.forEach(function (el) {
      result.push({
        sdnkanid: el.sdnkanid,
        sdnkancd: el.sdnkancd,
        sdnkannm: el.sdnkannm,
        sdnkanrk: el.sdnkanrk,
        honninflg: el.honninflg,
        nikeiflg: el.nikeiflg,
      });
    });
    return result;
  }
}