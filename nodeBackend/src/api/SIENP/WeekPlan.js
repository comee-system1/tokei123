const Service = require('../../SIENP/WeekPlan/Service')
const service = new Service();
const config = require('../ApiRun');
exports.connected = async function (param) {
    // 接続確認用URL
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });

    var url = config.getDomain() + '/sodan/v1/week-keikaku?' + query;

    config.setURL(url);
    config.setUniqID(param.uniqid);
    return await service.getData().then(result => {
        console.log(result);
        let returnData = [];
        // テスト用データ

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