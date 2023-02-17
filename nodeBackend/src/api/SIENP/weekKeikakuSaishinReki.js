// @ts-nocheck
const Service = require('../../SIENP/weekKeikakuSaishinReki/Service');
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const z = require('zod');
const Logger = require('../../utils/logger').logger();

exports.connected = async function (param, kbn) {
    // 接続確認用URL
    apiRun.setQuery(param);
    // 日付チェック
    // let regex = /^[0-9]{8}$/;
    // const ymd = z.string().regex(regex);
    // if (!ymd.safeParse(param.ymd).success) {
    //     Logger.error('システムエラーが発生しました。[' + ymd.safeParse(param.ymd).data + ']');
    //     throw new Error;
    // }

    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/saishin-reki/' + kbn + '?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        console.log(result);
        let returnData = {};
        // データが取得できないのでテスト用に作成
        returnData = {
            cntid: 1,
            entpriid: 100,
            riid: 100,
            rekiid: 1,
            mymd: "20230101",
            msiid: 1,
            msinm: 1,
            kanryo: 1,
            kanryoymd: "20230101",
            sym: "20230101",
            nichijokatsudo: "aaa",
            shugaiservice: "vvv",
            zentaizou: "ddd"
        };
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