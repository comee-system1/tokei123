const config = require('../api/config');
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Repo {
  constructor() {
  }
  settingRes(res){
    apiResponse.setResponse(res);
  }
  connectApi(){
    // api接続
    config.api(this);
    // console.log("data");
    // console.log(data);    
    // return "getAPI11";
  }
}
