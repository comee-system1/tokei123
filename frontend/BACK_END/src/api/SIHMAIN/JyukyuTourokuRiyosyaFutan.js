const Service = require('../../JyukyuTourokuRiyosyaFutan/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment')

/********************
 * データ取得用
 */
 exports.connected = async function (param) {
    // 接続確認用URL
    // var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/futan?getkbn=0&rysid=' + param.rid;
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/futan?getkbn=0';
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);

    return await service.getData().then(result => {
        let skryoh2_inf = [];
        let i = 1;
        result.forEach((element) => {
            skryoh2_inf.push({
                kai: String(i + 1),
                jyogenid: element.jyogenid,    //利用者負担関係内部ID
                jyukyuid: element.jyukyuid,    //受給者証内部ID
                tesymd: element.tesymd,      //適用開始日
                tesymdDisp: moment(element.tesymd).format('YYYY.MM.DD'),
                teeymd: element.teeymd,      //適用終了日
                teeymdDisp: element.teeymd==='99991231'?'':moment(element.teeymd).format('YYYY.MM.DD'),
                ftn: element.ftn,         //利用者負担割合
                fjyogen: element.fjyogen,     //利用者負担上限月額
                fjyogenDisp: element.fjyogen==0?'':element.fjyogen.toLocaleString(),
                tkkfhi: element.tkkfhi,      //特定障害者特別給付費
                syafukug: element.syafukug,    //社会福祉法人減額
                jgenkbn: element.jgenkbn,     //上限管理対象区分
                jgenkbnDisp: element.jgenkbn===1?'該当':'非該当',
                jgenknrikbn: element.jgenknrikbn, //上限管理委託事業者区分
                jgenknri: element.jgenknri,    //上限管理委託事業者内部ID
                sykksn: element.sykksn,      //食事提供加算
                tkkfhi12: element.tkkfhi12,    //特定障害者特別給付費(GH/CH)
                kyftok: element.kyftok,      //給付費等の額の特例
                kyuftokkbn: element.kyuftokkbn,  //給付費等の額の特例の有無
                tasikgn: element.tasikgn,     //多子軽減対象
                mushojdo: element.mushojdo,    //無償化対象児童
                rysid: element.rysid,       //利用者内部ID
                jkbn: element.jkbn,        //受給者証区分
                
                jgenname: element.jgenname,    //上限管理事業者名
                jgenryaku: element.jgenryaku,   //上限管理事業者略称
            });
        })

        //適用開始日降順でソート
        skryoh2_inf.sort((a, b) => {
            if (a.tesymd < b.tesymd) return 1;
            if (a.tesymd > b.tesymd) return -1;
            return 0;
        });

        let returns = {
            skryoh2_inf: skryoh2_inf,
        };
        return returns;
    });
}