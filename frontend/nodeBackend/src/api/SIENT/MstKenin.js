// @ts-check
// 検印マスタ
const Service = require('../../SIENT/MstKenin/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
/********************
 * データ取得用
 */
exports.connected = async function (param) {
  apiRun.setQuery(param);
  let url = apiRun.getDomain() + '/sodan/v1/mst/kenin/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {
    return result.data
  });
}
/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  let url = apiRun.getDomain() + '/sodan/v1/mst/kenin/'
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.postData(apiRun)
    .then(result => {
      console.log(result);
      return result.data;
    });
}
/********************
 * データ更新用
 */
exports.update = async function (query, data) {
  let url = apiRun.getDomain() + '/sodan/v1/mst/kenin/'
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });
}