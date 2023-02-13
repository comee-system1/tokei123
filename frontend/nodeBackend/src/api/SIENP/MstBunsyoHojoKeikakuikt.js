// @ts-check
//   計画表文章マスタ取得(一括登録)
const Service = require('../../SIENP/MstBunsyoHojoKeikakuikt/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
  /********************
   * データ取得用
   */
  let queryArr = [];
  let query = "";
  // 値のみのqueryを作成
  let param1 = {
    kubun: param.kubun,
    mstfstid: param.mstfstid
  }
  apiRun.setQueryValueOnly(param1);
  queryArr['q1'] = apiRun.getQuery()
  // プロパティ名＋値のqueryを作成
  let param2 = {
    pJigyoid: param.pJigyoid
  }
  apiRun.setQuery(param2);
  queryArr['q2'] = apiRun.getQuery()
  // 値のみのquery、プロパティ名＋値のqueryを組み合わせてqueryを作成
  query += queryArr['q1'] + "?" + queryArr['q2'];
  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/keikakuikt/' + query;
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/keikakuikt';
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/keikakuikt';
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });

}