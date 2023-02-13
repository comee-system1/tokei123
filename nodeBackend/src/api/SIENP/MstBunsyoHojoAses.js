// @ts-check
//  アセスメント特記文章マスタ取得
const Service = require('../../SIENP/MstBunsyoHojoAses/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
/********************
 * データ取得用
 */
exports.connected = async function (param) {
  let queryArr = [];
  let createdQuery = "";
  // 値のみのqueryを作成
  let valueParam = {
    kubun: param.kubun
  }
  apiRun.setQueryValueOnly(valueParam);
  queryArr['q1'] = apiRun.getQuery()
  // プロパティ名＋値のqueryを作成
  let formulaParam = {
    pJigyoid: param.pJigyoid
  }
  apiRun.setQuery(formulaParam);
  queryArr['q2'] = apiRun.getQuery()
  // 値のみのquery、プロパティ名＋値のqueryを組み合わせてqueryを作成
  createdQuery += queryArr['q1'] + "?" + queryArr['q2'];

  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/ases/' + createdQuery;
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
  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/ases/' + apiRun.getQuery();
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/ases/' + apiRun.getQuery();
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
  let queryArr = [];
  let createdQuery = "";
  // 値のみのqueryを作成
  let valueParam = {
    kubun: query.kubun
  }
  apiRun.setQueryValueOnly(valueParam);
  queryArr['q1'] = apiRun.getQuery()
  // プロパティ名＋値のqueryを作成
  let formulaParam = {
    pJigyoid: query.pJigyoid,
    pncode: query.pncode
  }
  apiRun.setQuery(formulaParam);
  queryArr['q2'] = apiRun.getQuery()
  // 値のみのquery、プロパティ名＋値のqueryを組み合わせてqueryを作成
  createdQuery += queryArr['q1'] + "?" + queryArr['q2'];
  let url = apiRun.getDomain() + '/sodan/v1/mst/bunsyo-hojo/ases/' + createdQuery;
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}