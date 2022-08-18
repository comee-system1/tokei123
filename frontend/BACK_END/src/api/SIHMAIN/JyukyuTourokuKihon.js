const Service = require('../../JyukyuTourokuKihon/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment');

/********************
 * データ登録用
 */
exports.registed = async function (param, input) {
    //var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/jyukyuh?inskbn=0&rysid=' + param.rid;
    let url = "http://192.168.30.32/syogai/daityo/v1/jyukyu/jyukyuh?inskbn=0";
    // console.log(param);
    // console.log(input);
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    config.setInputs(input);
    return await service.postData().then(result => {
        console.log(result);
    });
}
/********************
 * データ取得用
 */
exports.connected = async function (param) {
    // 接続確認用URL
    // var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/jyukyuh?getkbn=0&rysid=' + param.rid;
    let url = "http://192.168.30.32/syogai/daityo/v1/jyukyu/jyukyuh?getkbn=0";
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);

    return await service.getData().then(result => {
        let jyukyu_inf = [];
        let i = 1;
        result.forEach((element) => {
            jyukyu_inf.push({
                kai: String(i++),
                jyukyuid: element.jyukyuid,
                rysid: element.rysid,
                jkbn: element.jkbn,
                shichoson: element.shichoson,
                shichosonno: ('000000' + element.shichoson).slice(-6),
                shichosonname: '東経市',
                kofuymd: element.kofuymd,
                kofuymdDisp: moment(element.kofuymd).format('YYYY.MM.DD'),
                jyukyuno: element.jyukyuno,
                jidoid: element.jidoid,
                jido: element.jidoid > 0 ? '児' : '',
                jidopno1: element.jidopno1,
                jidopno2: element.jidopno2,
                jidoadd: element.jidoadd,
                ssyu1: element.ssyu1,
                ssyu2: element.ssyu2,
                ssyu3: element.ssyu3,
                ssyu4: element.ssyu4,
                zantei: element.zantei,
                dcod: element.dcod,
                dcodDisp: element.dcod > 0 ? element.dcod : '',
                jyukyuname: element.jyukyuname,
            });
        });
        //交付日降順でソート
        jyukyu_inf.sort((a, b) => {
            if (a.kofuymd < b.kofuymd) return 1;
            if (a.kofuymd > b.kofuymd) return -1;
            return 0;
        });
        let returns = {
            jyukyu_inf: jyukyu_inf,
        };
        return returns;
    });
}