// @ts-check
//   地域相談支援-アセスメント履歴を取得
const Service = require('../../SIENC/MstChikiAsesTok/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/chiki-ases-tok/' + apiRun.getQuery();
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/chiki-ases-tok/' + apiRun.getQuery()
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
  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/chiki-ases-tok/' + apiRun.getQuery();
  apiRun.setQuery(data);
  url = url + "?" + apiRun.getQuery();
  console.log(url);
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}