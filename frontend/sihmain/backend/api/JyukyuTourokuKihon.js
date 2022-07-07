const Service = require('../JyukyuTourokuKihon/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuKihonData() {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/jyukyuh/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);    

    return await service.getData().then(result => {
        let jyukyu_inf = [];
        let jyukyuInfData = result.jyukyu_inf;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            jyukyu_inf[i] = [];
            jyukyu_inf[i]['kai'             ] = jyukyuInfData[i].jyukyu_inf.kai;
            jyukyu_inf[i]['jyukyuid'        ] = jyukyuInfData[i].jyukyu_inf.jyukyuid;
            jyukyu_inf[i]['rysid'           ] = jyukyuInfData[i].jyukyu_inf.rysid;
            jyukyu_inf[i]['jkbn'            ] = jyukyuInfData[i].jyukyu_inf.jkbn;
            jyukyu_inf[i]['shichosonno'     ] = jyukyuInfData[i].jyukyu_inf.shichosonno;
            jyukyu_inf[i]['shichosonname'   ] = jyukyuInfData[i].jyukyu_inf.shichosonname;
            jyukyu_inf[i]['kofuymd'         ] = jyukyuInfData[i].jyukyu_inf.kofuymd;
            jyukyu_inf[i]['kofuymdDisp'     ] = moment(jyukyuInfData[i].jyukyu_inf.kofuymd).format('YYYY.MM.DD');
            jyukyu_inf[i]['jyukyuno'        ] = jyukyuInfData[i].jyukyu_inf.jyukyuno;
            jyukyu_inf[i]['jidoid'          ] = jyukyuInfData[i].jyukyu_inf.jidoid;
            jyukyu_inf[i]['jido'            ] = jyukyuInfData[i].jyukyu_inf.jidoid > 0 ? '児' : '';
            jyukyu_inf[i]['jidopno1'        ] = jyukyuInfData[i].jyukyu_inf.jidopno1;
            jyukyu_inf[i]['jidopno2'        ] = jyukyuInfData[i].jyukyu_inf.jidopno2;
            jyukyu_inf[i]['jidoadd'         ] = jyukyuInfData[i].jyukyu_inf.jidoadd;
            jyukyu_inf[i]['ssyu1'           ] = jyukyuInfData[i].jyukyu_inf.ssyu1;
            jyukyu_inf[i]['ssyu2'           ] = jyukyuInfData[i].jyukyu_inf.ssyu2;
            jyukyu_inf[i]['ssyu3'           ] = jyukyuInfData[i].jyukyu_inf.ssyu3;
            jyukyu_inf[i]['ssyu4'           ] = jyukyuInfData[i].jyukyu_inf.ssyu4;
            jyukyu_inf[i]['zantei'          ] = jyukyuInfData[i].jyukyu_inf.zantei;
            jyukyu_inf[i]['dcod'            ] = jyukyuInfData[i].jyukyu_inf.dcod;
            jyukyu_inf[i]['dcodDisp'        ] = jyukyuInfData[i].jyukyu_inf.dcod > 0 ? jyukyuInfData[i].jyukyu_inf.dcod : '';
            jyukyu_inf[i]['jyukyuname'      ] = jyukyuInfData[i].jyukyu_inf.jyukyuname;
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