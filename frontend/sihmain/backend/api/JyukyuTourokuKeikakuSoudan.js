const Service = require('../JyukyuTourokuKeikakuSoudan/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuKeikakuSoudanData() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let skryoh3_inf = [];
        let jyukyuInfData = result.result[0].skryoh3_inf;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            skryoh3_inf[i] = [];
            skryoh3_inf[i]['kai'            ] = String(i+1);
            skryoh3_inf[i]['ryokid'			] = jyukyuInfData[i].ryokid;        // 利用計画作成費内部ID
            skryoh3_inf[i]['jyukyuid'		] = jyukyuInfData[i].jyukyuid;      // 受給者証内部ID
            skryoh3_inf[i]['rksymd'			] = jyukyuInfData[i].rksymd;        // 支給開始日
            skryoh3_inf[i]['rksymdDisp'     ] = moment(jyukyuInfData[i].rksymd).format('YYYY.MM.DD');
            skryoh3_inf[i]['rkeymd'			] = jyukyuInfData[i].rkeymd;        // 支給終了日
            skryoh3_inf[i]['rkeymdDisp'     ] = moment(jyukyuInfData[i].rkeymd).format('YYYY.MM.DD');
            skryoh3_inf[i]['sjgyokbn'		] = jyukyuInfData[i].sjgyokbn;      // 相談支援事業者区分
            skryoh3_inf[i]['sjgyo'			] = jyukyuInfData[i].sjgyo;         // 相談支援事業者
            skryoh3_inf[i]['tokuti'			] = jyukyuInfData[i].tokuti;        // 特別地域加算
            skryoh3_inf[i]['monijiki'		] = jyukyuInfData[i].monijiki;      // ﾓﾆﾀﾘﾝｸﾞ時期
            skryoh3_inf[i]['rysid'			] = jyukyuInfData[i].rysid;         // 利用者内部ID
            skryoh3_inf[i]['jkbn'			] = jyukyuInfData[i].jkbn;          // 受給者証区分
            
            let skryoh3_moni2 = jyukyuInfData[i].skryoh3_moni2;   // モニタリング情報
            for (let j = 0; j < skryoh3_moni2.length; j++) {
                skryoh3_inf[i]['skryoh3_moni2'] = [];
                skryoh3_inf[i]['skryoh3_moni2']['ryokid'    ] = skryoh3_moni2[j].ryokid;        // 利用計画作成費内部ID
                skryoh3_inf[i]['skryoh3_moni2']['jyukyuid'  ] = skryoh3_moni2[j].jyukyuid;      // 受給者証内部ID
                skryoh3_inf[i]['skryoh3_moni2']['ym'        ] = skryoh3_moni2[j].ym;            // モニタリング予定月
                skryoh3_inf[i]['skryoh3_moni2']['monijiki'  ] = skryoh3_moni2[j].monijiki;      // モニタリング時期
                skryoh3_inf[i]['skryoh3_moni2']['syukiflg'  ] = skryoh3_moni2[j].syukiflg;      // 終期月
                skryoh3_inf[i]['skryoh3_moni2']['rysid'     ] = skryoh3_moni2[j].rysid;         // 利用者内部ID
                skryoh3_inf[i]['skryoh3_moni2']['jkbn'      ] = skryoh3_moni2[j].jkbn;          // 受給者証区分
            }
            
            skryoh3_inf[i]['sjigyoname'		] = jyukyuInfData[i].sjigyoname;    // 相談支援事業者名
            skryoh3_inf[i]['sjigyoryaku'	] = jyukyuInfData[i].sjigyoryaku;   // 相談支援事業者略称
            
        }

        //３行以下はダミーデータ作成
        if(jyukyuInfData.length < 3){
            for (let i = jyukyuInfData.length; i < 3; i++) {
                skryoh3_inf[i] = [];
                skryoh3_inf[i]['kai'            ] = '';
                skryoh3_inf[i]['ryokid'			] = 0;      // 利用計画作成費内部ID
                skryoh3_inf[i]['jyukyuid'		] = 0;      // 受給者証内部ID
                skryoh3_inf[i]['rksymd'			] = '';      // 支給開始日
                skryoh3_inf[i]['rksymdDisp'     ] = '';
                skryoh3_inf[i]['rkeymd'			] = '';      // 支給終了日
                skryoh3_inf[i]['rkeymdDisp'     ] = '';
                skryoh3_inf[i]['sjgyokbn'		] = 0;      // 相談支援事業者区分
                skryoh3_inf[i]['sjgyo'			] = 0;      // 相談支援事業者
                skryoh3_inf[i]['tokuti'			] = 0;      // 特別地域加算
                skryoh3_inf[i]['monijiki'		] = 0;      // ﾓﾆﾀﾘﾝｸﾞ時期
                skryoh3_inf[i]['rysid'			] = 0;      // 利用者内部ID
                skryoh3_inf[i]['jkbn'			] = 0;      // 受給者証区分
                
                skryoh3_inf[i]['skryoh3_moni2'  ] = [];     // モニタリング情報
                
                skryoh3_inf[i]['sjigyoname'		] = '';     // 相談支援事業者名
                skryoh3_inf[i]['sjigyoryaku'	] = '';     // 相談支援事業者略称
            }
        }

        let returns = {
            skryoh3_inf: skryoh3_inf,
        };
        return returns;
    });
}