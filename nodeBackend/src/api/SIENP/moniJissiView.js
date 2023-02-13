// @ts-check
const Service = require('../../SIENP/MoniJissiView/Service')
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
    var url = apiRun.getDomain() + '/sodan/v1/moni/jissi-view?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        let icrn_inf = [];
        result.forEach((el) => {
            let obj = {}
            Object.keys(el).forEach(function (key) {
                obj[key] = el[key];
                if (key == "rcode") {
                    obj[key + "D"] = String(el[key]).padStart(7, '0');
                }
                if (key == "keikakuYmd" ||
                    key == "mymd" ||
                    key == "tanYmd"
                ) {
                    obj[key + "D"] = el[key].trim().length == 8 ? el[key].slice(0, 4) + "/" + el[key].slice(4, 6) + "/" + el[key].substring(6, 8) : "";
                }
                if (key == "yoteiYm" ||
                    key == "nextYoteiYm" ||
                    key == "anNextMkYm"
                ) {
                    obj[key + "D"] = el[key].trim().length == 6 ? Number(el[key].slice(4, 6)) + "月" : "";
                }
                if (key == "jisshi" ||
                    key == "chushi" ||
                    key == "enki" ||
                    key == "moniWeekFlg" ||
                    key == "anHenkoFlg" ||
                    key == "anKoshinFlg" ||
                    key == "chuto" ||
                    key == "shuki" ||
                    key == "kasan" ||
                    key == "svcEndFlg"
                ) {
                    obj[key + "D"] = el[key] === 1 ? "●" : "";
                }
                if (key == "doui") {
                    obj[key + "D"] = el[key] === 1 ? "☑" : "☐";
                }

            });

            icrn_inf.push(obj)
        });
        return icrn_inf;

    });
}