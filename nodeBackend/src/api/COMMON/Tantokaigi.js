//@ts-check
const Service = require('../../COMMON/Tantokaigi/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/************
 * GET
 ***********/
exports.connected = async function (param) {
    // 接続確認用URL
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/common/tantokaigi/v1/?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setApiAccount("api_common");
    return await service.getData(apiRun).then(result => {
        let icrn_inf = [];
        let obj = {};
        obj.info = result.info;
        obj.shussekiList = result.shussekiList;
        obj.naiyoGyoList = result.naiyoGyoList;
        obj.kadai = result.kadai;
        obj.kanryoChk = result.kanryoChk;
        obj.kanryoYmd = result.kanryoYmd;
        icrn_inf.push(obj);
        return icrn_inf;
    });
}
/************
 * PUT
 ***********/
exports.update = async function (query, data) {
    apiRun.setQuery(query);
    let url = apiRun.getDomain() + '/common/tantokaigi/v1/?' + apiRun.getQuery()

    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    apiRun.setInputs(data);
    apiRun.setApiAccount("api_common");
    return await service.putData(apiRun)
        .then(result => {
            return result.data;
        });
}