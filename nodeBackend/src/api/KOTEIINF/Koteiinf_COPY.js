const Service = require('../../COMMON/KOTEIINF/Koteiinf_honnin/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  //queryの処理
  let q_url = "";
  Object.keys(query).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' && key != 'insflg') {
      q_url += "/" + query[key];
    }
  });
  q_url = q_url.replace(/&/, '');


  let url = apiRun.getDomain() + '/Koteijyoho/v1/kotei_copy';
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.postData(apiRun)
    .then(result => {
      return result.data;
    });
}