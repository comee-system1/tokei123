const Service = require('../../COMMON/KOTEIINF/Koteiinf_kazoku/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

//データ検索
exports.connected = async function (param) {

  var url = "";
  let cnt = 0;
  let query = "";
  let query2 = "";

  Object.keys(param).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' &&
      key != 'Jigyoid' && key != 'Kbn' &&
      key != 'Dataid' && key != 'Modeflg') {
      query += "/" + param[key];
    }
  });

  Object.keys(param).forEach(function (key) {
    if (key == 'Jigyoid' || key == 'Kbn' ||
      key == 'Dataid' || key == 'Modeflg') {

      if (cnt > 0) {
        query2 += "&"
      }
      query2 += key + "=" + param[key];
      cnt = 1;
    }
  });

  query = query.replace(/&/, '');
  url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + query + "?" + query2;
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {

    let returns = {};
    returns = {
      icrn_inf: result.data
    };
    return returns;
  });
}

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
  //dataの処理

  let query2 = "";
  Object.keys(query).forEach(function (key) {
    if (key == 'insflg') {
      query2 += "insflg=" + query[key];
    }
  });

  let url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + q_url + "?" + query2;
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
  //queryの処理


  let q_url = "";
  Object.keys(query).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' && key != 'insflg') {
      q_url += "/" + query[key];
    }
  });
  q_url = q_url.replace(/&/, '');
  //dataの処理

  let query2 = "";
  //let first =true;
  Object.keys(query).forEach(function (key) {
    if (key == 'insflg') {
      query2 += "insflg=" + query[key];
      //first == false;
    }
  });

  let url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + q_url + "?" + query2;

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
  let q_url = "";
  Object.keys(query).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' && key != 'insflg') {
      q_url += "/" + query[key];
    }
  });
  q_url = q_url.replace(/&/, '');

  let url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + q_url;
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData()
    .then(result => {
      return result.data;
    });
}