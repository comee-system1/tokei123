// @ts-check
const Service = require('../../SIENT/Kojinrireki/Service')
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
    var url;
    url = apiRun.getDomain() + '/sodan/v1/kojinrireki?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        let icrn_inf = [];
        console.log(result);
        result.forEach((el) => {
            let obj = {}
            Object.keys(el).forEach(function (key) {
                obj[key] = el[key];
                if (key == "ymd") {
                    obj[key + "D"] = el.ymd.trim().length > 0 ? el.ymd.slice(0, 4) + "/" + el.ymd.slice(4, 6) + "/" + el.ymd.substring(6, 8) : "―";
                }
                if (key == "sakuymd") {
                    obj["ymd"] = el[key];
                }
                if (key == "sakuymddsp") {
                    obj["ymdD"] = el[key];
                }
                if (key == "tantoname") {
                    obj["tanto"] = el[key];
                }
                if (key == "naiyo") {
                    obj[key + "D"] = el.cskmknm + "\n" + el.naiyo;
                }

            });

            icrn_inf.push(obj)
        });
        return icrn_inf;
    });
}