// @ts-check
//   アセスメント表示項目設定取得
const Service = require('../../SIENC/MstAseshyouji/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
  apiRun.setQueryValueOnly(param.path);
  let url = apiRun.getDomain() + '/sodan/v1/mst/ases/hyouji/';
  url = url + apiRun.getQuery();
  apiRun.setQuery(param.query);
  url = url + "?" + apiRun.getQuery();
  console.log(url);
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {
    return result
  });
}

/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  console.log(data);

  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/ases/hyouji/' + apiRun.getQuery()
  console.log(url);
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.postData(apiRun)
    .then(result => {
      return result.data;
    });
}
/********************
 * データ更新用
 */
exports.update = async function (query, data) {
  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/ases/hyouji/' + apiRun.getQuery()
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });
}