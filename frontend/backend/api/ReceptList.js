const Service = require('../ReceptList/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')

export async function ReceptList() {
    // 接続確認用URL
    var url = config.getDomain()+'/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        // 利用者情報一覧
        let seikyu_inf = [];

        for (let i = 0; i < 10; i++) {
            seikyu_inf.push({
              error: '',
              sityoson: '東経市',
              code: '000' + (i % 5),
              jyukyusyaBango: '110001239' + (i % 4),
              riyousyamei: '東経 晴美' + (i % 3),
              kana: 'トウケイハルミ',
              jyougenicon: i % 4 != 3 ? '他' : 'disabled',
              jyougen: i % 4 != 3 ? '南山事業所' : 'disabled',
              riyosyafutan: i % 4 != 3 ? 9900 : 0,
              service22: i % 2 == 0 ? 1 : 0,
              service24: i % 3 == 1 ? 1 : 0,
              service32: i % 4 == 1 ? 1 : 0,
              nyukyo: i % 2, // 今月入居
              taikyo: i % 4, // 今月退去
              resesyukei: '',
              syukeibi: '',
              tanto: '',
              jyogenkanrizumi: '',
              resekaku: '',
            });
          }

        let returns = {
            seikyu_inf: seikyu_inf,
        };

        return returns;

    });
}