const Service = require('../JyukyuTourokuKihon/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
/********************
 * データ登録用
 */
 export async function JyukyuTourokuKihonDataPost(input) {
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    console.log(input);
    config.setURL(url);
    config.setUniqID(uniqid);
    config.setTraceID(traceid);
    config.setInputs(input);
    return await service.postData().then(result => {
        console.log(result);
    });
}
/********************
 * データ取得用
 */
export async function JyukyuTourokuKihonData(rid) {
    // 接続確認用URL
    // var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/jyukyuh?getkbn=0&rysid=' + rid;
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/jyukyuh?getkbn=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let jyukyu_inf = [];
        let jyukyuInfData = result;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            jyukyu_inf[i] = [];
            jyukyu_inf[i]['kai'             ] = String(i+1);
            jyukyu_inf[i]['jyukyuid'        ] = jyukyuInfData[i].jyukyuid;
            jyukyu_inf[i]['rysid'           ] = jyukyuInfData[i].rysid;
            jyukyu_inf[i]['jkbn'            ] = jyukyuInfData[i].jkbn;
            jyukyu_inf[i]['shichoson'       ] = jyukyuInfData[i].shichoson;
            jyukyu_inf[i]['shichosonno'     ] = ('000000'+jyukyuInfData[i].shichoson).slice(-6)
            jyukyu_inf[i]['shichosonname'   ] = '東経市';
            jyukyu_inf[i]['kofuymd'         ] = jyukyuInfData[i].kofuymd;
            jyukyu_inf[i]['kofuymdDisp'     ] = moment(jyukyuInfData[i].kofuymd).format('YYYY.MM.DD');
            jyukyu_inf[i]['jyukyuno'        ] = jyukyuInfData[i].jyukyuno;
            jyukyu_inf[i]['jidoid'          ] = jyukyuInfData[i].jidoid;
            jyukyu_inf[i]['jido'            ] = jyukyuInfData[i].jidoid > 0 ? '児' : '';
            jyukyu_inf[i]['jidopno1'        ] = jyukyuInfData[i].jidopno1;
            jyukyu_inf[i]['jidopno2'        ] = jyukyuInfData[i].jidopno2;
            jyukyu_inf[i]['jidoadd'         ] = jyukyuInfData[i].jidoadd;
            jyukyu_inf[i]['ssyu1'           ] = jyukyuInfData[i].ssyu1;
            jyukyu_inf[i]['ssyu2'           ] = jyukyuInfData[i].ssyu2;
            jyukyu_inf[i]['ssyu3'           ] = jyukyuInfData[i].ssyu3;
            jyukyu_inf[i]['ssyu4'           ] = jyukyuInfData[i].ssyu4;
            jyukyu_inf[i]['zantei'          ] = jyukyuInfData[i].zantei;
            jyukyu_inf[i]['dcod'            ] = jyukyuInfData[i].dcod;
            jyukyu_inf[i]['dcodDisp'        ] = jyukyuInfData[i].dcod > 0 ? jyukyuInfData[i].dcod : '';
            jyukyu_inf[i]['jyukyuname'      ] = jyukyuInfData[i].jyukyuname;
        }

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