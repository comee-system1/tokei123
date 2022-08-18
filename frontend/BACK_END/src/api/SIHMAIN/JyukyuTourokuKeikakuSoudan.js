const Service = require('../../JyukyuTourokuKeikakuSoudan/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment')

/********************
 * データ取得用
 */
 exports.connected = async function (param) {
    // 接続確認用URL
    // var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/keikakusodan?getkbn=0&rysid=' + param.rid;
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/keikakusodan?getkbn=0';
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);

    return await service.getData().then(result => {
        let skryoh3_inf = [];
        let i = 1;
        result.forEach((element) => {
                
            let buff = element.skryoh3_moni2;   // モニタリング情報
            let moni = [];
            buff.forEach((item) => {
                moni.push({
                    ryokid: item.ryokid,        // 利用計画作成費内部ID
                    jyukyuid: item.jyukyuid,      // 受給者証内部ID
                    ym: item.ym,            // モニタリング予定月
                    monijiki: item.monijiki,      // モニタリング時期
                    syukiflg: item.syukiflg,      // 終期月
                    rysid: item.rysid,         // 利用者内部ID
                    jkbn: item.jkbn,          // 受給者証区分
                })
            })

            skryoh3_inf.push({
                kai: String(i + 1),
                ryokid: element.ryokid,        // 利用計画作成費内部ID
                jyukyuid: element.jyukyuid,      // 受給者証内部ID
                rksymd: element.rksymd,        // 支給開始日
                rksymdDisp: moment(element.rksymd).format('YYYY.MM.DD'),
                rkeymd: element.rkeymd,        // 支給終了日
                rkeymdDisp: element.rkeymd==='99991231'?'':moment(element.rkeymd).format('YYYY.MM.DD'),
                sjgyokbn: element.sjgyokbn,      // 相談支援事業者区分
                sjgyokbnDisp: element.sjgyokbn===1?'自':'他',
                sjgyo: element.sjgyo,         // 相談支援事業者
                tokuti: element.tokuti,        // 特別地域加算
                monijiki: element.monijiki,      // ﾓﾆﾀﾘﾝｸﾞ時期
                rysid: element.rysid,         // 利用者内部ID
                jkbn: element.jkbn,          // 受給者証区分
                
                skryoh3_moni2: moni,

                sjigyoname: element.sjigyoname,    // 相談支援事業者名
                sjigyoryaku: element.sjigyoryaku,   // 相談支援事業者略称
            })
        });

        //支給開始日降順でソート
        skryoh3_inf.sort((a, b) => {
            if (a.rksymd < b.rksymd) return 1;
            if (a.rksymd > b.rksymd) return -1;
            return 0;
        });

        let returns = {
            skryoh3_inf: skryoh3_inf,
        };
        return returns;
    });
}