const Service = require('../KobetsuNyutaiin/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function KobetsuNyutaiin() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    // test用
    var url = '/';

    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        // 利用者情報一覧
        let returns = [];
        returns.push({
            status: 'idle',
            riid: 1,
            riyocode: 1234560,
            names: '東経太郎0',
            kbn: 1,
            ngsymd: 20220701,
            ngeymd: 20220710,
            ssyoku1: 1,
            ssyoku2: 1,
            ssyoku3: 1,
            ssyoku4: 1,
            esyoku1: 1,
            esyoku2: 1,
            esyoku3: 1,
            esyoku4: 1,
            seikyu: 0,
            nsanflg: 1,
            byoincode: 100000001,
            gaihaku: '外泊先名',
            gtime: '01:00',
            rtime: '01:00',
            sbikou: '',
            ebikou: '',
            byouinname: '病院名',
        });

        return returns;
    });
}