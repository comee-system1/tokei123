const Service = require('../../SIHS/NenkanRiyouNissuIcrn/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment');
exports.connected = async function (param) {

    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');

    var url = config.getDomain() + '/syogai/recept/v1/riyonissu/riyonissu/?' + query;
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    return await service.getData().then(result => {
        //console.log(result);
        // 利用者情報一覧
        let riyo_inf = [];
        let riyo = result.riyo_inf;
        for (let i = 0; i < riyo.length; i++) {
            riyo_inf.push({
                riid: riyo[i].riyo_inf.riid,
                riyocode: riyo[i].riyo_inf.riyocode,
                names: riyo[i].riyo_inf.names,
                kana: riyo[i].riyo_inf.kana,
                jyukyuno: riyo[i].riyo_inf.jyukyuno,
                syogaikbn: riyo[i].riyo_inf.syogaikbn,
                syogaikbn_old: riyo[i].riyo_inf.syogaikbn_old,
                symd: riyo[i].riyo_inf.symd,
                symd_view: (riyo[i].riyo_inf.jyukyu_inf.serreki_inf.symd) ? moment(riyo[i].riyo_inf.jyukyu_inf.serreki_inf.symd).format('YYYY/MM/DD') : '',
                eymd: riyo[i].riyo_inf.eymd,
                eymd_view: (riyo[i].riyo_inf.jyukyu_inf.serreki_inf.eymd) ? moment(riyo[i].riyo_inf.jyukyu_inf.serreki_inf.eymd).format('YYYY/MM/DD') : '',
                nissu1: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu1,
                nissu2: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu2,
                nissu3: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu3,
                nissu4: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu4,
                nissu5: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu5,
                nissu6: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu6,
                nissu7: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu7,
                nissu8: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu8,
                nissu9: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu9,
                nissu10: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu10,
                nissu11: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu11,
                nissu12: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu12,
                gokei: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.gokei,
                tukisu: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.tukisu,
                avg: riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.avg,

            });

        }

        let nengetu_inf = result.nengetu_inf;
        let gokei_inf = result.gokei_inf;
        let kaisyo_inf = result.kaisyo_inf;
        let returns = {
            riyo_inf: riyo_inf,
            nengetu_inf: nengetu_inf,
            gokei_inf: gokei_inf,
            kaisyo_inf: kaisyo_inf
        };


        //console.log(returns);

        return returns;


    });
}