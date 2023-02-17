//@ts-check
const Service = require('../../COMMON/TantokaigiSaishinReki/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/***********
 * GET
 **********/
exports.connected = async function (param) {
    // 接続確認用URL
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/common/tantokaigi/v1/saishin-reki?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setApiAccount("api_common");
    return await service.getData(apiRun).then(result => {
        return result;
    });
}