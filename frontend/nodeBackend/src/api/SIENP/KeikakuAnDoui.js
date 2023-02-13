// @ts-check
const Service = require('../../SIENP/KeikakuAnDoui/Service');
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
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan/doui?' + query;
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
    let newquery = "";
    Object.keys(query).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            newquery += "&" + key + "=" + query[key];
        }
    });
    newquery = newquery.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan/doui?' + newquery;
    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    apiRun.setInputs(data);
    return await service.postData(apiRun)
        .then(result => {
            console.log(result);
            return result.data;
        });
}

/************
 * DELETE
 ***********/
exports.deleted = async function (query) {
    apiRun.setQuery(query);
    let url = apiRun.getDomain() + '/sodan/v1/keikakuan/doui?' + apiRun.getQuery()
    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}

/************
 * PUT
 ***********/
exports.update = async function (query, data) {
    apiRun.setQuery(query);
    let url = apiRun.getDomain() + '/sodan/v1/keikakuan/doui?' + apiRun.getQuery()
    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    apiRun.setInputs(data);
    return await service.putData(apiRun)
        .then(result => {
            return result.data;
        });
}