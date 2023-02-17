// @ts-nocheck
const Service = require('../../SIENP/weekKeikakuKmk/Service');
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const z = require('zod');
const Logger = require('../../utils/logger').logger();

exports.connected = async function (param, kbn) {
    apiRun.setQuery(param);


    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/kmk/' + kbn + '?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);

    // データが取得できないのでテスト用に作成
    let returnData = [];
    returnData.push({
        entpriid: 1,
        riid: 100,
        rekiid: 1,
        intcode: 1,
        kmkdaicode: 1,
        kmkchucode: 1,
        freetok: "起床(※)1",
        yobi: 0,
        stime: "05:00",
        etime: "06:30",
        bcolor: '#fbebd6',
        fcolor: '#000000',
    });
    returnData.push({
        entpriid: 1,
        riid: 100,
        rekiid: 1,
        intcode: 2,
        kmkdaicode: 1,
        kmkchucode: 1,
        freetok: "起床(※)2",
        yobi: 1,
        stime: "10:00",
        etime: "13:30",
        bcolor: '#fbebd6',
        fcolor: '#000000',
    });
    return returnData;
    /*
    return await service.getData(apiRun).then(result => {
        //console.log(result);
        let returnData = result;
        
        return returnData;
    });
    */
}

/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
    // エラーチェック
    // 項目のチェック
    let string = z.string();
    if (!string.safeParse(data.freetok).success || string.safeParse(data.freetok).data.length == 0) {
        Logger.error('システムエラーが発生しました。項目入力');
        throw new Error;
    }
    let array = z.array(z.string());
    if (!array.safeParse(data.yobi).success) {
        Logger.error('システムエラーが発生しました。曜日入力');
        throw new Error;
    }
    string = z.string();
    if (!string.safeParse(data.stime).success || string.safeParse(data.stime).data.length == 0) {
        Logger.error('システムエラーが発生しました。開始時刻入力');
        throw new Error;
    }
    string = z.string();
    if (!string.safeParse(data.etime).success || string.safeParse(data.etime).data.length == 0) {
        Logger.error('システムエラーが発生しました。終了時刻入力');
        throw new Error;
    }

    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/kmk/' + param.kbn;
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