const Service = require('../../KobetsuRiyouTourokuNyutai/Service')
const service = new Service();
const config = require('../ApiRun');
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
    var url = config.getDomain() + '/syogai/hendo/v1/riyojk/nyutai/?' + query;
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    return await service.getData().then(result => {
        // 利用者情報一覧
        return result.data;
    });
}