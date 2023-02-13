const Service = require('../../COMMON/KOTEIINF/MST/Tokyu/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

//データ検索
exports.connected = async function (param) {

    var url = "";

    let query = "";
    let query2 = "";

    Object.keys(param).forEach(function (key) {
        if (key == 'pKbn') {
            query += "/" + param[key];
        }
    });


    Object.keys(param).forEach(function (key) {
        if (key == 'pJigyoid') {
            query2 += "pJigyoid=" + param[key];
        } else if (key == 'pKbn') {
            query2 += "& pKbn=" + param[key];
        }
    });

    query = query.replace(/&/, '');
    url = apiRun.getDomain() + '/Koteijyoho/v1/mst/tokyu' + query + '?' + query2;
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