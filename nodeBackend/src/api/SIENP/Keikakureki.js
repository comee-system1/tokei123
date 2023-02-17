// @ts-check
const Service = require('../../SIENP/Keikakureki/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

exports.connected = async function (param, kbn) {
    // 接続確認用URL
    apiRun.setQuery(param);
    let query = apiRun.getQuery();
    var url = apiRun.getDomain() + '/Sodan/v1/week-keikaku/reki/' + kbn + '?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        let returnData = [];
        // テスト用データ
        returnData.push({
            intcode: 1,
            cntid: 1,
            mymd: '20230118',
            msiid: 1,
            msinm: '東経太郎',
            krekiymd: '2023年1月18日',
            mcnt: 1,
            kanryo: 1,
            kanryoymd: '20230118',
            syomeikbn: 1,
            syomei: '同意太郎',
            syomeisiid: 1,
            syomeisinm: 1,
            doui: 1,
            douiymd: '20230118',
            yoshiki: 1,
            hindo: 1,
            sinseikbn: 1
        });
        returnData.push({
            intcode: 2,
            cntid: 1,
            mymd: '20230111',
            msiid: 1,
            msinm: '東経太郎',
            krekiymd: '2023年1月11日',
            mcnt: 1,
            kanryo: 1,
            kanryoymd: '20230118',
            syomeikbn: 1,
            syomei: '同意太郎',
            syomeisiid: 1,
            syomeisinm: 1,
            doui: 1,
            douiymd: '20230111',
            yoshiki: 1,
            hindo: 1,
            sinseikbn: 1
        });
        /*
        let obj = {}
        Object.keys(result).forEach(function (key) {
            obj[key] = result[key];
            if (key == "mymd" ||
                key == "krekiymd" ||
                key == "kanryoymd" ||
                key == "douiymd") {
                obj[key + "D"] = result[key].trim().length > 0 ? result[key].slice(0, 4) + "/" + result[key].slice(4, 6) + "/" + result[key].substring(6, 8) : "";
            }
            if (obj[key] === " ") {
                obj[key] = "";
            }

        });
*/
        return returnData;
    });
}

/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
    let query = "";
    Object.keys(param).forEach(function (key) {

        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.postData(apiRun)
        .then(result => {
            console.log(result);
            return result.data;
        });
}
/********************
 * データ更新用
 */
exports.update = async function (param, data) {
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.putData(apiRun)
        .then(result => {
            return result.data;
        });
}
/********************
 * データ削除用
 */
exports.deleted = async function (param, data) {
    apiRun.setQuery(param);
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}