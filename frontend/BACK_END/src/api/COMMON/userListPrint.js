const Service = require('../../COMMON/UserListPrint/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment');
exports.connected = async function (param) {
    var url = "";
    console.log(param);
    url = config.getDomain() + '/syogai/daityo/v1/riyosya/riyosya/?getkbn=0&jkbn=0&sdnflg=0&symd=20220101&eymd=20220101';
    console.log(url);
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    return await service.getData().then(result => {

        let returns = {};
        returns = {
            icrn_inf: result.data
        };
        return returns;
    });
}