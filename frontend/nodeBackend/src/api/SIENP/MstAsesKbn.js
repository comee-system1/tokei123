// @ts-check
// ニーズ整理項目名
const Service = require('../../SIENP/MstAsesKbn/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  let url = apiRun.getDomain() + '/sodan/v1/mst/ases-kbn';
  console.log(query);
  console.log(data);
  console.log(url);
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });
}
/********************
 * データ更新用
 */
exports.update = async function (query, data) {
  let url = apiRun.getDomain() + '/sodan/v1/mst/ases-kbn/'
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });
}
/********************
 * データ削除用
 */
exports.deleted = async function (query, data) {
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/ases-kbn/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}