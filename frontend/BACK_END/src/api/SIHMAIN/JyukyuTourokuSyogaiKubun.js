const Service = require('../../JyukyuTourokuSyogaiKubun/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment')

/********************
 * データ取得用
 */
 exports.connected = async function (param) {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/syogaikbn?getkbn=0&rysid=' + param.rid;
    // var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/syogaikbn?getkbn=0';
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);

    return await service.getData().then(result => {
        let skryoh4_inf = [];
        let i = 1;
        result.forEach((element) => {
            let kbn = '';
            switch(element.syogaikbn){
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
            skryoh4_inf.push({
                kai: String(i + 1),
                syokbnid: element.syokbnid,
                jyukyuid: element.jyukyuid,
                ntsymd: element.ntsymd,
                ntsymdDisp: moment(element.ntsymd).format('YYYY.MM.DD'),
                nteymd: element.nteymd,
                nteymdDisp: element.nteymd==='99991231'?'':moment(element.nteymd).format('YYYY.MM.DD'),
                syogaikbn: element.syogaikbn,
                syogaikbnDisp: kbn,
                tkkyu: element.tkkyu,
                rysid: element.rysid,
                jkbn: element.jkbn,
            })
        })

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