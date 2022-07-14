const Service = require('../ServiceTeikyoTaisei/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')

export async function ServiceTeikyoTaisei() {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  // テスト用
  var url = "/";
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);


  return await service.getData().then(result => {
    // 利用者情報一覧
    let serviceData = [];

    let name = [
      '人員配置体制加算（Ⅰ）',
      '福祉専門員配置加算（Ⅰ）',
      '常勤看護職員配置加算（Ⅱ）',
      '重度障害者支援加算（Ⅰ）',
      '送迎加算（Ⅰ）',
      '食事提供体制加算',
      '就労移行支援体制加算（Ⅱ）',
      '福祉・介護職員処遇改善加算',
      '福祉・介護職員等処遇改善加算Ⅰ',
    ];
    let pt = ['', '', '', '', '', '', '', '5.7', '1.7'];
    let memo = [];
    for (let i = 0; i < 9; i++) {
      serviceData.push({
        groupKey: 1,
        code: 1001,
        serviceJigyosyoMei: '障害者支援施設 ひまわり園',
        ryakusyo: '生活ひまわり園',
        serviceMeisyoCode: '22',
        serviceMeisyo: '生活介護',
        jigyosyoBango: '1121000011',
        enabled: true,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '〇',
        tekiouStartDate: '20220304',
        taiseiKasan: '加算',
        taiseiText: name[i],
        taiseiPoint: pt[i],
        taiseiOther: memo[i],
      });
    }

    name = [
      '福祉専門員配置加算（Ⅰ）',
      '常勤看護職員配置加算',
      '食事提供体制加算',
      '就労移行支援体制加算（Ⅱ）',
      '福祉・介護職員処遇改善加算',
      '福祉・介護職員等処遇改善加算Ⅰ',
    ];
    pt = ['', '', '', '', '6.3', '2.1'];
    memo = ['', '', '利用者2人', '', '', ''];

    for (let i = 0; i < 6; i++) {
      serviceData.push({
        groupKey: 2,
        code: 1002,
        serviceJigyosyoMei: '短期入所事業所 ひまわり園',
        ryakusyo: '生活ひまわり園',
        serviceMeisyoCode: '24',
        serviceMeisyo: '短期入所',
        jigyosyoBango: '1121000011',
        enabled: true,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '〇',
        tekiouStartDate: '20220304',
        taiseiKasan: '加算',
        taiseiText: name[i],
        taiseiPoint: pt[i],
        taiseiOther: memo[i],
      });
    }
    name = [
      '夜勤職員配置体制加算',
      '夜間看護体制加算	',
      '重度障害者支援加算Ⅰ１',
      '重度障害者支援加算Ⅰ２',
      '口腔衛生管理体制加算',
      '福祉・介護職員処遇改善加算Ⅰ',
    ];
    pt = [];
    memo = [];

    for (let i = 0; i < 6; i++) {
      serviceData.push({
        groupKey: 3,
        code: 1003,
        serviceJigyosyoMei: '障害者支援施設 ひまわり園',
        ryakusyo: '生活ひまわり園',
        serviceMeisyoCode: '32',
        serviceMeisyo: '施設入所支援',
        jigyosyoBango: '1121000011',
        enabled: true,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '〇',
        tekiouStartDate: '20220304',
        taiseiKasan: '加算',
        taiseiText: name[i],
        taiseiPoint: pt[i],
        taiseiOther: memo[i],
      });
    }

    // コード順にソート
    serviceData.sort((a, b) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      return 0;
    });

    for (let i = 0; i < serviceData.length; i++) {
      let y = moment(serviceData[i].tekiouStartDate).format('YYYY');
      let m = moment(serviceData[i].tekiouStartDate).format('M') - 1;
      let d = moment(serviceData[i].tekiouStartDate).format('D');
      serviceData[i]['tekiouStartDate'] = wijmo.Globalize.format(
        new Date(y, m, d),
        'gyy/MM'
      );
    }


    let returns = {
      seikyu_inf: serviceData,
    };

    return returns;

  });


}