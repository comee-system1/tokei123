const Service = require('../NenkanRiyouNissuIcrn/Service')
const service = new Service();
const config = require('./config');
export function nenkanRiyouNissuIcrn() {
    var url =
    'http://192.168.30.32:80/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);
    service.getData();    
    //console.log(service);
    let nenkanRiyouNissuData = "";
    nenkanRiyouNissuData = 'aaa';
    return nenkanRiyouNissuData;
}