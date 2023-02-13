let result = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    if(!res){
      return [];
    } 
    return res.data;
  }
}