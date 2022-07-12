const Service = require('../JyukyuTourokuSyogaiKubun/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuSyogaiKubunData() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let skryoh4_inf = [];
        let jyukyuInfData = result.result[0].skryoh4_inf;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            skryoh4_inf[i] = [];
            skryoh4_inf[i]['kai'            ] = String(i+1);
            skryoh4_inf[i]['syokbnid'       ] = jyukyuInfData[i].syokbnid;
            skryoh4_inf[i]['jyukyuid'       ] = jyukyuInfData[i].jyukyuid;
            skryoh4_inf[i]['ntsymd'         ] = jyukyuInfData[i].ntsymd;
            skryoh4_inf[i]['ntsymdDisp'     ] = moment(jyukyuInfData[i].ntsymd).format('YYYY.MM.DD');
            skryoh4_inf[i]['nteymd'         ] = jyukyuInfData[i].nteymd;
            skryoh4_inf[i]['nteymdDisp'     ] = jyukyuInfData[i].nteymd==='99991231'?'':moment(jyukyuInfData[i].nteymd).format('YYYY.MM.DD');
            skryoh4_inf[i]['syogaikbn'      ] = jyukyuInfData[i].syogaikbn;
            skryoh4_inf[i]['syogaikbnDisp'  ] = jyukyuInfData[i].syogaikbn===2?'区分２':'区分３';
            skryoh4_inf[i]['tkkyu'          ] = jyukyuInfData[i].tkkyu;
            skryoh4_inf[i]['rysid'          ] = jyukyuInfData[i].rysid;
            skryoh4_inf[i]['jkbn'           ] = jyukyuInfData[i].jkbn;
        }
        
        //３行以下はダミーデータ作成
        if(jyukyuInfData.length < 3){
            for (let i = jyukyuInfData.length; i < 3; i++) {
                skryoh4_inf[i] = [];
                skryoh4_inf[i]['kai'            ] = '';
                skryoh4_inf[i]['syokbnid'       ] = 0;
                skryoh4_inf[i]['jyukyuid'       ] = 0;
                skryoh4_inf[i]['ntsymd'         ] = '';
                skryoh4_inf[i]['ntsymdDisp'     ] = '';
                skryoh4_inf[i]['nteymd'         ] = '';
                skryoh4_inf[i]['nteymdDisp'     ] = '';
                skryoh4_inf[i]['syogaikbn'      ] = 0;
                skryoh4_inf[i]['syogaikbnDisp'  ] = '';
                skryoh4_inf[i]['tkkyu'          ] = 0;
                skryoh4_inf[i]['rysid'          ] = 0;
                skryoh4_inf[i]['jkbn'           ] = 0;
            }
        }

        let returns = {
            skryoh4_inf: skryoh4_inf,
        };
        return returns;
    });
}