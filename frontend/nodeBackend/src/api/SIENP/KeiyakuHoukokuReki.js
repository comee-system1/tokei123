// @ts-check
const Service = require('../../SIENP/KeiyakuHoukokuReki/Service');
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/***********
 * GET
 **********/
exports.connected = async function (param) {
    // 接続確認用URL
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/keiyaku-houkoku/reki?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        let rireki = [];
        result.forEach((el) => {
            let obj = {};
            obj.symd = el.symd;
            obj.eymd = el.eymd;
            rireki.push(obj);
        });
        return rireki;
    });
}