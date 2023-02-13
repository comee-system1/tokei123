// @ts-check
// 方法マスタ
const Service = require('../../SIENT/MstHouhou/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
  apiRun.setQuery(param);
  let url = apiRun.getDomain() + '/sodan/v1/mst/houhou/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {
    let icrn_inf = [];
    result.forEach((el) => {
      icrn_inf.push({
        codeD: el.sdnhoucd,
        name: el.sdnhounm,
        sdnhouid: el.sdnhouid,
        sdnhoucd: el.sdnhoucd,
        sdnhounm: el.sdnhounm,
        sdnhourk: el.sdnhourk,
        nikeiflg: el.nikeiflg,
        sdnhourk2: el.sdnhourk2,
        sdnhoukigo: el.sdnhoukigo,
        scaflg: el.scaflg,
        chu: el.chu,
      });
    });
    return icrn_inf;
  });
}
/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/houhou/?' + apiRun.getQuery()
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
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/houhou/?' + apiRun.getQuery()
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/houhou/?' + apiRun.getQuery()
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}