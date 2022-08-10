const Service = require('../../JyukyuTourokuSikyuryoLayout/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment')

/********************
 * データ取得用
 */
 exports.connected = async function (param) {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/sikyulayout';
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);

    return await service.getData().then(result => {
        let layout_inf = [];
        result.forEach((element) => {         
                
            let buff = element.sellst;   // 選択肢リスト
            let temp = [];
            buff.forEach((item) => {
                temp.push({
                    code: item.code, //コード
                    selname: item.selname, //名称
                    defsel: item.defsel, //デフォルト選択
                })
            })

            layout_inf.push({
                hokbn: element.hokbn, //法区分
                svccode: element.svccode, //サービス種類表示ｺｰﾄﾞ
                kbnno: element.kbnno, //サービス詳細
                inpkbn: element.inpkbn, //入力区分
                title: element.title, //タイトル
                dspkbn: element.dspkbn, //表示区分
                hisuipt: element.hisuipt, //必須入力
                jyogen: element.jyogen, //選択上限数
                columnname: element.columnname, //テーブルカラム名
                kzkkbn: element.kzkkbn, //家族区分
                jitakbn: element.jitakbn, //自他施設表示区分   
                sellst: temp,
            });
        })

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