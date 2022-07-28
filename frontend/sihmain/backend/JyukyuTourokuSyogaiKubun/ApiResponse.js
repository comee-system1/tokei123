let result = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    result = [];
    if(!res){
      return result;
    } 
    res.data.forEach(function(element){
      result.push({
        syokbnid: element.syokbnid,
        jyukyuid: element.jyukyuid,
        ntsymd: element.ntsymd,
        nteymd: element.nteymd,
        syogaikbn: element.syogaikbn,
        tkkyu: element.tkkyu,
        rysid: element.rysid,
        jkbn: element.jkbn,
      }
      );
    });
    return result;
  }
}