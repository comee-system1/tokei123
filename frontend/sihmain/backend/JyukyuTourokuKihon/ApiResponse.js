module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    let result = [];
    if(!res){
      return result;
    }
    res.data.forEach(function(element){
      result.push({
        jyukyuid: element.jyukyuid,
        rysid: element.rysid,
        jkbn: element.jkbn,
        shichoson: element.shichoson,
        kofuymd: element.kofuymd,
        jyukyuno: element.jyukyuno,
        jidoid: element.jidoid,
        jidopno1: element.jidopno1,
        jidopno2: element.jidopno2,
        jidoadd: element.jidoadd,
        ssyu1: element.ssyu1,
        ssyu2: element.ssyu2,
        ssyu3: element.ssyu3,
        ssyu4: element.ssyu4,
        zantei: element.zantei,
        dcod: element.dcod,
        jyukyuname: element.jyukyuname,
      });
    });
    return result;
  }
}