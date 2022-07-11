const Service = require('../JyukyuTourokuKihon/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuKihonData() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let jyukyu_inf = [];
        let jyukyuInfData = result.result[0].jyukyu_inf;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            jyukyu_inf[i] = [];
            jyukyu_inf[i]['kai'             ] = String(i+1);
            jyukyu_inf[i]['jyukyuid'        ] = jyukyuInfData[i].jyukyuid;
            jyukyu_inf[i]['rysid'           ] = jyukyuInfData[i].rysid;
            jyukyu_inf[i]['jkbn'            ] = jyukyuInfData[i].jkbn;
            jyukyu_inf[i]['shichosonno'     ] = jyukyuInfData[i].shichosonno;
            jyukyu_inf[i]['shichosonname'   ] = jyukyuInfData[i].shichosonname;
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
        
        //３行以下はダミーデータ作成
        if(jyukyuInfData.length < 3){
            for (let i = jyukyuInfData.length; i < 3; i++) {
                jyukyu_inf[i] = [];
                jyukyu_inf[i]['kai'             ] = '';
                jyukyu_inf[i]['jyukyuid'        ] = 0;
                jyukyu_inf[i]['rysid'           ] = 0;
                jyukyu_inf[i]['jkbn'            ] = 0;
                jyukyu_inf[i]['shichosonno'     ] = '';
                jyukyu_inf[i]['shichosonname'   ] = '';
                jyukyu_inf[i]['kofuymd'         ] = '';
                jyukyu_inf[i]['kofuymdDisp'     ] = '';
                jyukyu_inf[i]['jyukyuno'        ] = '';
                jyukyu_inf[i]['jidoid'          ] = 0;
                jyukyu_inf[i]['jido'            ] = '';
                jyukyu_inf[i]['jidopno1'        ] = '';
                jyukyu_inf[i]['jidopno2'        ] = '';
                jyukyu_inf[i]['jidoadd'         ] = '';
                jyukyu_inf[i]['ssyu1'           ] = 0;
                jyukyu_inf[i]['ssyu2'           ] = 0;
                jyukyu_inf[i]['ssyu3'           ] = 0;
                jyukyu_inf[i]['ssyu4'           ] = 0;
                jyukyu_inf[i]['zantei'          ] = 0;
                jyukyu_inf[i]['dcod'            ] = 0;
                jyukyu_inf[i]['dcodDisp'        ] = 0;
                jyukyu_inf[i]['jyukyuname'      ] = '';
            }
        }

        let returns = {
            jyukyu_inf: jyukyu_inf,
        };
        return returns;
    });
}