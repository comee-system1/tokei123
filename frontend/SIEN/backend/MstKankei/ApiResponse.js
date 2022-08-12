let mstKankei = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    mstKankei = [];
    if(!res){
      return mstKankei;
    } 
    res.data.forEach(function(element){
      mstKankei.push({
        sdnkanid:element.sdnkanid,
        sdnkancd:element.sdnkancd,
        sdnkannm:element.sdnkannm,
        sdnkanrk:element.sdnkanrk,
        honninflg:element.honninflg,
        nikeiflg:element.nikeiflg,
      }
        );
    });
    return mstKankei;
  }
}