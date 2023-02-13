// @ts-check
const Service = require('../../SIENC/ChiikiKeikakuListView/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
    apiRun.setQuery(param);
    var url = apiRun.getDomain() + '/sodan/v1/chiki-keikaku/view?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    return await service.getData(apiRun).then(result => {
        return result;
    });
}