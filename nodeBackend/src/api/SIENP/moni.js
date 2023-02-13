// @ts-check
const Service = require('../../SIENP/Moni/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
    // 接続確認用URL

    console.log(param);
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/moni?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {

        let icrn_inf = [];
        let obj = {}
        Object.keys(result).forEach(function (key) {
            obj[key] = result[key];
            if (key == "mymd" ||
                key == "krekiymd" ||
                key == "doui_ymd" ||
                key == "kanryoymd"
            ) {
                obj[key + "D"] = result[key].trim().length > 0 ? result[key].slice(0, 4) + "/" + result[key].slice(4, 6) + "/" + result[key].substring(6, 8) : "";
                obj[key + "D2"] = result[key].trim().length > 0 ? result[key].slice(0, 4) + "年" + result[key].slice(4, 6) + "月" + result[key].substring(6, 8) + "日" : "";
            }
            if (key == "monidetail") {
                for (let i = 0; i < result[key].length; i++) {
                    obj[key][i]['jissi'] = true;
                }
            }
        });
        icrn_inf.push(obj)
        return icrn_inf;
    });
}