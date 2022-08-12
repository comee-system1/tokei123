let riyousya = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    riyousya = [];
    if (!res) {
      return riyousya;
    }
    res.data.forEach(function (element) {
      riyousya.push({
        riid: element.riid,
        riyocode: element.riyocode,
        names: element.names,
        kana: element.kana,
        jyukyuno: element.jyukyuno,
      });
    });

    return riyousya;
  }
}