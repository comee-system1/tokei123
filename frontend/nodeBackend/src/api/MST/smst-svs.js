const Service = require('../../MST/smst-svs/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/********************
 * データ取得用
 */
exports.connected = async function (param) {
  apiRun.setQuery(param);
  var url = apiRun.getDomain() + '/syogai/mst/v1/hide/smst-svs?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {
    return result;
  });
}