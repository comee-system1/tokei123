const Service = require('../../DAITYO/newcode/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/********************
 * データ取得用
 */
exports.connected = async function (param) {
  apiRun.setQuery(param);
  var url = apiRun.getDomain() + '/kyotu/mst/v1/daityo/newcode?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData().then(result => {
    return result;
  });
}