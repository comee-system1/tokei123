//@ts-check
const Service = require('../../SIENT/SyukeiKensu/Service')
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
    var url = apiRun.getDomain() + '/sodan/v1/syukei/kensu?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        let icrn_inf = [];
        result.forEach((el) => {
            icrn_inf.push({
                kbn: el.kbn,
                title_list1: el.title_list1,
                title_list2: el.title_list2,
                kaisu_list: el.kaisu_list,
                ninzu_list: el.ninzu_list,
            });
        });
        return icrn_inf;
    });
}