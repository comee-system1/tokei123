// @ts-check
const Service = require('../../SIENT/Houkokusyo/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
    // 接続確認用URL

    console.log(param);
    let query = "";
    let intcode = "";
    Object.keys(param).forEach(function (key) {
        if (key == "pIntcode") {
            intcode = String(param[key]);
        }
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    query = query.replace(/&/, '');
    var url;
    url = apiRun.getDomain() + '/sodan/v1/houkoku?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    // let icrn_inf = [];
    return await service.getData(apiRun).then(result => {

        console.log(result);
        // result.forEach((el) => {
        //     let obj = {}
        //     Object.keys(el).forEach(function (key) {
        //         obj[key] = el[key];
        //         if (key == "ymd") {
        //             obj[key + "D"] = el.ymd.trim().length > 0 ? el.ymd.slice(0, 4) + "/" + el.ymd.slice(4, 6) + "/" + el.ymd.substring(6, 8) : "―";
        //         }
        //         if (key == "naiyo") {
        //             obj[key + "D"] = "<" + el.cskmknm + ">\n" + el.naiyo;
        //         }

        //     });

        //     icrn_inf.push(obj)
        // });
        return result;
    });
}

/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
    let query = "";
    let intcode = "";
    Object.keys(param).forEach(function (key) {
        if (key == "pIntcode") {
            intcode = String(param[key]);
        }
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    query = query.replace(/&/, '');
    let url = apiRun.getDomain() + '/sodan/v1/uktk/' + intcode + '?' + query;
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
    let intcode = "";
    Object.keys(param).forEach(function (key) {
        if (key == "pIntcode") {
            intcode = String(param[key]);
        }
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    let url = apiRun.getDomain() + '/sodan/v1/uktk/' + intcode + '?' + query;
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
// exports.deleted = async function (param, data) {
//     apiRun.setQuery(query);
//     let url = apiRun.getDomain() + '/sodan/v1/uktk/' + intcode + '?' + query;
//     apiRun.setURL(url);
//     apiRun.setUniqID(param.uniqid);
//     apiRun.setTraceID(param.traceid);
//     apiRun.setInputs(data);
//     return await service.deleteData(apiRun)
//         .then(result => {
//             return result.data;
//         });
// }