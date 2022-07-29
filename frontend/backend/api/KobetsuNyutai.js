const Service = require('../KobetsuNyutai/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function KobetsuNyutai(params) {
    // 接続確認用URL
    // paramsで受け取ったデータをurlにつける api完成次第
    //console.log(params);

    //var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var url = "/";
    var uniqid = 1;


    config.setURL(url);
    config.setUniqID(uniqid);
    return await service.getData().then(result => {
        // 利用者情報一覧
        let returns = [];
        let views = [];
        // riyo_inf.push({
        views = {
            riid: 1234,
            riyocode: 1234,
            names: '東経太郎',
            kbn: 1,
            ngsymd: 20220801,
            ngeymd: 20220810,
            ssyoku1: 0,
            ssyoku2: 1,
            ssyoku3: 1,
            ssyoku4: 0,
            esyoku1: 0,
            esyoku2: 0,
            esyoku3: 0,
            esyoku4: 0,
            seikyu: 0,
            nsanflag: 0,
            byoincode: 0,
            gaihaku: '東経外泊',
            gtime: '10:00',
            rtime: '15:00',
            sbikou: '',
            ebikou: '',
            byoinname: '東経病院',
        };

        returns = {
            status: 'idle',
        };
        Object.assign(returns, views);

        return returns;
    });
}