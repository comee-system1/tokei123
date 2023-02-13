//@ts-check
const Service = require('../../COMMON/TantokaigiReki/Service')
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
    var url = apiRun.getDomain() + '/common/tantokaigi/v1/reki?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        return result;
    });
}

/************
 * POST
 ***********/
exports.registed = async function (query, data) {
    let url = apiRun.getDomain() + '/common/tantokaigi/v1/reki?'
    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    apiRun.setInputs(data);
    return await service.postData(apiRun)
        .then(result => {
            return result.data;
        });
}


/************
 * DELETE
 ***********/
exports.deleted = async function (query) {
    apiRun.setQuery(query);
    let url = apiRun.getDomain() + '/common/tantokaigi/v1/reki?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}