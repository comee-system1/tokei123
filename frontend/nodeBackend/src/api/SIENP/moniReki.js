// @ts-check
const Service = require('../../SIENP/MoniReki/Service')
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
    var url = apiRun.getDomain() + '/sodan/v1/moni/reki?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {

        let icrn_inf = [];
        result.forEach((el) => {
            let obj = {}
            Object.keys(el).forEach(function (key) {
                obj[key] = el[key];
                if (key == "mymd" ||
                    key == "krekiymd" ||
                    key == "doui_ymd" ||
                    key == "kanryoymd"
                ) {
                    obj[key + "D"] = el[key].trim().length > 0 ? el[key].slice(0, 4) + "/" + el[key].slice(4, 6) + "/" + el[key].substring(6, 8) : "";
                }
                if (key == "yoteiym") {
                    obj[key + "D"] = el[key].trim().length > 0 ? el[key].slice(0, 4) + "/" + el[key].slice(4, 6) : "";
                }
                if (key == "monidetail") {
                    for (let i = 0; i < el[key].length; i++) {
                        obj[key][i]['jissi'] = true;
                    }
                }
                if (key == "kanryo") {
                    obj[key + "D"] = el[key] == 0 ? "☐" : "☑";
                }

            });

            icrn_inf.push(obj)
        });

        return icrn_inf;
    });
}