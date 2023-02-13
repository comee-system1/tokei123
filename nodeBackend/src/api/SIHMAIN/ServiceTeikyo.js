const Service = require('../../SIHMAIN/ServiceTeikyo/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();


exports.connected = async function (param) {
  // 接続確認用URL
  console.log(param);
  let query = "";
  Object.keys(param).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid') {
      query += "&" + key + "=" + param[key];
    }
  });
  var url = apiRun.getDomain() + '/syogai/mst/v1/jigyo/smst-sjgy-kihn?' + query;
  console.log(url);
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  return await service.getData(apiRun);
}