const Service = require('../JyukyuTourokuSikyuryoLayout/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuSikyuryoLayoutData() {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/sikyulayout';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let layout_inf = [];
        let jyukyuInfData = result;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            layout_inf[i] = [];
            layout_inf[i]['hokbn'       ] =  jyukyuInfData[i].hokbn; //法区分
            layout_inf[i]['svccode'     ] =  jyukyuInfData[i].svccode; //サービス種類表示ｺｰﾄﾞ
            layout_inf[i]['kbnno'       ] =  jyukyuInfData[i].kbnno; //サービス詳細
            layout_inf[i]['inpkbn'      ] =  jyukyuInfData[i].inpkbn; //入力区分
            layout_inf[i]['title'       ] =  jyukyuInfData[i].title; //タイトル
            layout_inf[i]['dspkbn'      ] =  jyukyuInfData[i].dspkbn; //表示区分
            layout_inf[i]['hisuipt'     ] =  jyukyuInfData[i].hisuipt; //必須入力
            layout_inf[i]['jyogen'      ] =  jyukyuInfData[i].jyogen; //選択上限数
            layout_inf[i]['columnname'  ] =  jyukyuInfData[i].columnname; //テーブルカラム名
            layout_inf[i]['kzkkbn'      ] =  jyukyuInfData[i].kzkkbn; //家族区分
            layout_inf[i]['jitakbn'     ] =  jyukyuInfData[i].jitakbn; //自他施設表示区分            
            
            let sellst = jyukyuInfData[i].sellst;   // 選択肢リスト
            for (let j = 0; j < sellst.length; j++) {
                layout_inf[i]['sellst'] = [];
                layout_inf[i]['sellst']['code'        ] =  sellst[i].code; //コード
                layout_inf[i]['sellst']['selname'     ] =  sellst[i].selname; //名称
                layout_inf[i]['sellst']['defsel'      ] =  sellst[i].defsel; //デフォルト選択
            }            
        }

        //サービス種類表示ｺｰﾄﾞでソート
        layout_inf.sort((a, b) => {
            if (a.svccode > b.svccode) return 1;
            if (a.svccode < b.svccode) return -1;
            return 0;
        });

        let returns = {
            layout_inf: layout_inf,
        };
        return returns;
    });
}