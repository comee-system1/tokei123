// @ts-check
// 相談・対応項目マスタ
const Service = require('../../SIENT/MstSodanTaiou/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
/********************
 * データ取得用
 */
exports.connected = async function (param) {
  apiRun.setQuery(param);
  let url = apiRun.getDomain() + '/sodan/v1/mst/sodantaiou/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {
    let icrn_inf = [];
    result.forEach((el) => {
      el.tyu.forEach(function (el2) {
        icrn_inf.push({
          daicskmkid: el.cskmkid,
          daicode: el.code,
          daicodeD: String(el.code).padStart(3, '0'),
          dainames: el.names,
          dairyaku: el.ryaku,
          daicskbn: el.cskbn,
          daicolor: el.color,
          daisyukflg: el.syukflg,
          tyucskmkid: el2.cskmkid,
          tyucode: el2.code,
          tyucodeD: String(el2.code).padStart(3, '0'),
          tyunames: el2.names,
          tyuryaku: el2.ryaku,
          tyucolor: el2.color,
          tyusyukflg: el2.syukflg,
        });
      });
    });
    return icrn_inf;
  });
}
/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/sodantaiou/' + apiRun.getQuery();
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/sodantaiou/' + apiRun.getQuery();
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/sodantaiou/' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}