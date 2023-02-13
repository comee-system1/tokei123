const Service = require('../../DAITYO/Jyukyu/Service')
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
    var url = apiRun.getDomain() + '/syogai/recept/v1/daityo/jyukyu?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {

        let icrn_inf = [];

        for (let i = 0; i < result.length; i++) {
            let item = result[i];
            let obj = {};
            Object.keys(item).forEach(function (key) {
                obj[key] = item[key];
                if (key == "errkbn" && obj[key] != null && obj[key] == 1) {
                    obj["err"] = "";
                }
                if (key == "kofuymd" && obj[key] != null) {
                    obj[key + "D"] = obj[key].trim().length > 0 ? obj[key].slice(0, 4) + "/" + obj[key].slice(4, 6) + "/" + obj[key].substring(6, 8) : "―";
                }
                if (key == "jyukyuno" && obj[key] != null) {
                    obj[key + "D"] = String(obj[key]).padStart(10, '0');
                }
            });

            icrn_inf.push(obj);
        }
        return icrn_inf;
    });
}