const Service = require('../NenkanRiyouNissuIcrn/Service')
const service = new Service();
const config = require('./config');
export async function nenkanRiyouNissuIcrn() {
    // 本番用
    // var url =
    // 'http://192.168.30.32:80/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    // テスト用
    var url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        return result;
    });
}