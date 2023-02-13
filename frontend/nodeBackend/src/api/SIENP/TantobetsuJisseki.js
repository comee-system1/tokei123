// @ts-check
const Service = require('../../SIENP/TantobetsuJisseki/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
    // 接続確認用URL
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/tantobetsu-jisseki/view/?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {

        let retObj = {};
        retObj.kasanTitleList = result.kasanTitleList;
        retObj.jissekiList = [];
        result.jissekiList.forEach((el) => {

            let obj = {}
            Object.keys(el).forEach(function (key) {
                obj[key] = el[key];
                if (key == "moniYmd" ||
                    key == "mymd" ||
                    key == "keiyakuYmd" ||
                    key == "anYmd" ||
                    //key == "anDouiYmd" ||
                    //key == "teiYmd" ||
                    key == "anKaigiYmd" ||
                    key == "keikakuYmd" ||
                    key == "keikakuDouiYmd" ||
                    key == "moniKaigiYmd"
                ) {
                    obj[key + "D"] = el[key].trim().length > 0 ? el[key].slice(0, 4) + "/" + el[key].slice(4, 6) + "/" + el[key].substring(6, 8) : "";
                }
                if (
                    key == "anDouiYmd" ||
                    key == "teiYmd" ||
                    key == "keikakuDouiYmd"
                ) {
                    obj[key + "D"] = el[key].trim().length > 0 ? "●" : "";
                }
                if (key == "rcode") {
                    obj[key + "D"] = String(el[key]).padStart(7, '0');
                }
                if (key == "moniDouiFlg" ||
                    key == "moniShukiFlg" ||
                    key == "moniKeizokuFlg" ||
                    key == "noMoniHenkoFlg" ||
                    key == "moniKoshinFlg"

                ) {
                    obj[key + "D"] = el[key] == "1" ? "●" : "";
                }
            });

            retObj.jissekiList.push(obj)
        });

        console.log(retObj)
        return retObj;
    });
}