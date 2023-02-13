const Service = require('../../SIENP/Keikakureki/Service')
const service = new Service();
const config = require('../ApiRun');
exports.connected = async function (param) {
    // 接続確認用URL
    let kbn = param.kbn;
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid' && key != 'kbn') {
            query += "&" + key + "=" + param[key];
        }
    });
    var url = config.getDomain() + '/sodan/v1/week-keikaku/saishin-reki/' + kbn + '?' + query;

    config.setURL(url);
    config.setUniqID(param.uniqid);
    return await service.getData().then(result => {
        console.log(result);
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
    var url = config.getDomain() + '/sodan/v1/keikakuan?' + query;
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    config.setInputs(data);
    return await service.postData()
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
    var url = config.getDomain() + '/sodan/v1/keikakuan?' + query;
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    config.setInputs(data);
    return await service.putData()
        .then(result => {
            return result.data;
        });
}
/********************
 * データ削除用
 */
exports.deleted = async function (param, data) {
    config.setQuery(query);
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    var url = config.getDomain() + '/sodan/v1/keikakuan?' + query;
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    config.setInputs(data);
    return await service.deleteData()
        .then(result => {
            return result.data;
        });
}