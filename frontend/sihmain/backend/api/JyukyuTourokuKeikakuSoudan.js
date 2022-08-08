const Service = require('../JyukyuTourokuKeikakuSoudan/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuKeikakuSoudanData(rid) {
    // 接続確認用URL
    // var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/keikakusodan?getkbn=0&rysid=' + rid;
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/keikakusodan?getkbn=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let skryoh3_inf = [];
        let jyukyuInfData = result;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            skryoh3_inf[i] = [];
            skryoh3_inf[i]['kai'            ] = String(i+1);
            skryoh3_inf[i]['ryokid'			] = jyukyuInfData[i].ryokid;        // 利用計画作成費内部ID
            skryoh3_inf[i]['jyukyuid'		] = jyukyuInfData[i].jyukyuid;      // 受給者証内部ID
            skryoh3_inf[i]['rksymd'			] = jyukyuInfData[i].rksymd;        // 支給開始日
            skryoh3_inf[i]['rksymdDisp'     ] = moment(jyukyuInfData[i].rksymd).format('YYYY.MM.DD');
            skryoh3_inf[i]['rkeymd'			] = jyukyuInfData[i].rkeymd;        // 支給終了日
            skryoh3_inf[i]['rkeymdDisp'     ] = jyukyuInfData[i].rkeymd==='99991231'?'':moment(jyukyuInfData[i].rkeymd).format('YYYY.MM.DD');
            skryoh3_inf[i]['sjgyokbn'		] = jyukyuInfData[i].sjgyokbn;      // 相談支援事業者区分
            skryoh3_inf[i]['sjgyokbnDisp'   ] = jyukyuInfData[i].sjgyokbn===1?'自':'他';
            skryoh3_inf[i]['sjgyo'			] = jyukyuInfData[i].sjgyo;         // 相談支援事業者
            skryoh3_inf[i]['tokuti'			] = jyukyuInfData[i].tokuti;        // 特別地域加算
            skryoh3_inf[i]['monijiki'		] = jyukyuInfData[i].monijiki;      // ﾓﾆﾀﾘﾝｸﾞ時期
            skryoh3_inf[i]['rysid'			] = jyukyuInfData[i].rysid;         // 利用者内部ID
            skryoh3_inf[i]['jkbn'			] = jyukyuInfData[i].jkbn;          // 受給者証区分
            
            let buff = jyukyuInfData[i].skryoh3_moni2;   // モニタリング情報
            let temp = [];
            for (let j = 0; j < buff.length; j++) {
                temp[j] = [];
                temp[j]['ryokid'    ] = buff[j].ryokid;        // 利用計画作成費内部ID
                temp[j]['jyukyuid'  ] = buff[j].jyukyuid;      // 受給者証内部ID
                temp[j]['ym'        ] = buff[j].ym;            // モニタリング予定月
                temp[j]['monijiki'  ] = buff[j].monijiki;      // モニタリング時期
                temp[j]['syukiflg'  ] = buff[j].syukiflg;      // 終期月
                temp[j]['rysid'     ] = buff[j].rysid;         // 利用者内部ID
                temp[j]['jkbn'      ] = buff[j].jkbn;          // 受給者証区分
            }
            skryoh3_inf[i]['skryoh3_moni2'  ] = temp
            
            skryoh3_inf[i]['sjigyoname'		] = jyukyuInfData[i].sjigyoname;    // 相談支援事業者名
            skryoh3_inf[i]['sjigyoryaku'	] = jyukyuInfData[i].sjigyoryaku;   // 相談支援事業者略称
        }

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