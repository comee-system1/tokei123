let result = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    result = [];
    if (!res) {
      return result;
    }
    res.data.forEach(function (element) {
      result.push({
        sdnhouid: element.sdnhouid,
        sdnhoucd: element.sdnhoucd,
        sdnhounm: element.sdnhounm,
        sdnhourk: element.sdnhourk,
        nikeiflg: element.nikeiflg,
        sdnhourk2: element.sdnhourk2,
        sdnhoukigo: element.sdnhoukigo,
        scaflg: element.scaflg,
        chu: element.chu,
      });
    });
    return result;
  }
}