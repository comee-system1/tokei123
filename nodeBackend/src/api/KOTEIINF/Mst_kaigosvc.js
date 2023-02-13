const Service = require('../../COMMON/KOTEIINF/MST/Kaigosvc/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

//データ検索
exports.connected = async function (param) {

    var url = "";

    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key == 'pJigyoid') {
            query += "pJigyoid=" + param[key];
        } else if (key == 'pSrcType') {
            query += "&pSrcType=" + param[key];
        } else if (key == 'pYmd') {
            query += "&pYmd=" + param[key];
        }
    });

    url = apiRun.getDomain() + '/Koteijyoho/v1/mst/kaigosvc?' + query;
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