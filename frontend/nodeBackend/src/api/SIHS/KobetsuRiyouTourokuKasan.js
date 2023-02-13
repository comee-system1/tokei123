const Service = require('../../KobetsuRiyouTourokuKasan/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');
exports.connected = async function (param) {
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            console.log(key + "=>" + param[key]);
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + 'syogai/hendo/v1/riyojk/ksn/?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    return await service.getData(apiRun).then(result => {
        // 利用者情報一覧
        return result.data;
    });
}