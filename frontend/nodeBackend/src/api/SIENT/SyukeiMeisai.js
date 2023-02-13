//@ts-check
const Service = require('../../SIENT/SyukeiMeisai/Service')
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
    var url = apiRun.getDomain() + '/sodan/v1/syukei/meisai?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        console.log(result);
        let icrn_inf = {};
        let index = 0;
        let headerList = [];
        let kaisuList = [];
        let ninzuList = [];
        headerList.push({
            kbn: 0,
            syukeiid: {},
            title_list1: 'コード',
            title_list2: 'コード',
        });
        headerList.push({
            kbn: 0,
            syukeiid: {},
            title_list1: '利用者名',
            title_list2: '利用者名',
        });
        result.kbn.forEach((el) => {
            headerList.push({
                kbn: el,
                syukeiid: result.syukeiid[index],
                title_list1: result.title_list1[index],
                title_list2: result.title_list2[index],
            });
            index++;
        });
        index = 0;
        result.riyo_code.forEach((el) => {
            kaisuList.push({
                riyo_code: el,
                riyo_codeD: String(el).padStart(7, '0'),
                riyo_name: result.riyo_name[index],

            });
            ninzuList.push({
                riyo_code: el,
                riyo_codeD: String(el).padStart(7, '0'),
                riyo_name: result.riyo_name[index],

            });
            let index2 = 0;
            result.kaisu_list[index].forEach((el2) => {
                kaisuList[index]['col' + index2] = el2;
                ninzuList[index]['col' + index2] = result.ninzu_list[index][index2];
                index2++;
            });
            index++;
        });
        icrn_inf = {
            headerList: headerList,
            kaisuList: kaisuList,
            ninzuList: ninzuList,
        }
        return icrn_inf;
    });
}