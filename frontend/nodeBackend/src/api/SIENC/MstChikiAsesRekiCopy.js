// @ts-check
//   地域相談支援-アセスメント履歴を取得
const Service = require('../../SIENC/MstChikiAsesRekiCopy/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();


/********************
 * データ登録用
 */
exports.registed = async function (query, data) {
  apiRun.setQueryValueOnly(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/chiki-ases-reki/copy/';
  url = url + apiRun.getQuery();
  apiRun.setQuery(data);
  url = url + "?" + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  //apiRun.setInputs(data);
  return await service.postData(apiRun)
    .then(result => {
      return result.data;
    });
}