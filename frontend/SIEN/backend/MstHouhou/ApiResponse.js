let mstHouhou = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    mstHouhou = [];
    if(!res){
      return mstHouhou;
    } 
    res.data.forEach(function(element){
      mstHouhou.push({
        sdnhouid:element.sdnhouid,
        sdnhoucd:element.sdnhoucd,
        sdnhounm:element.sdnhounm,
        sdnhourk:element.sdnhourk,
        nikeiflg:element.nikeiflg,
        sdnhourk2:element.sdnhourk2,
        sdnhoukigo:element.sdnhoukigo,
        scaflg:element.scaflg
      }
        );
    });
    return mstHouhou;
  }
}