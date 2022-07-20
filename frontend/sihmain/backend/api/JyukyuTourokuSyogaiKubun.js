const Service = require('../JyukyuTourokuSyogaiKubun/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuSyogaiKubunData(rid) {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/shogaikbn?getkbn=0&rysid=' + rid;
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let skryoh4_inf = [];
        let jyukyuInfData = result;
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
            let kbn = '';
            switch(jyukyuInfData[i].syogaikbn){
                case 1:
                    kbn = '区分１';
                    break;
                case 2:
                    kbn = '区分２';
                    break;
                case 3:
                    kbn = '区分３';
                    break;
                case 4:
                    kbn = '区分４';
                    break;
                case 5:
                    kbn = '区分５';
                    break;
                case 6:
                    kbn = '区分６';
                    break;
            }
            skryoh4_inf[i]['syogaikbnDisp'  ] = kbn;
            skryoh4_inf[i]['tkkyu'          ] = jyukyuInfData[i].tkkyu;
            skryoh4_inf[i]['rysid'          ] = jyukyuInfData[i].rysid;
            skryoh4_inf[i]['jkbn'           ] = jyukyuInfData[i].jkbn;
        }

        //認定開始日降順でソート
        skryoh4_inf.sort((a, b) => {
            if (a.ntsymd < b.ntsymd) return 1;
            if (a.ntsymd > b.ntsymd) return -1;
            return 0;
        });

        let returns = {
            skryoh4_inf: skryoh4_inf,
        };
        return returns;
    });
}