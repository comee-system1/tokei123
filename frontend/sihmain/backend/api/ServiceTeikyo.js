const Service = require('../ServiceTeikyo/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')

export async function ServiceTeikyo() {
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

    serviceData.push({
      code: '1001',
      serviceJigyosyoMei: '障害者支援施設 ひまわり園',
      ryakusyo: '生活ひまわり園',
      serviceMeisyoCode: '22',
      serviceMeisyo: '生活介護',
      jigyosyoBango: '1121000011',
      post1: '001',
      post2: '0012',
      jyusyo: '●●市××町1-1-1',
      tel: '',
      tel1: '03',
      tel2: '1111',
      tel3: '2222',
      fax: '',
      fax1: '03',
      fax2: '1111',
      fax3: '2222',
      mail: '',
      rese: 1,
      enabled: true,
      seikyuDaihyo: 0,
      seikyuDaihyoDisp: '',
      tekiouStartDate: '20220304',
      kyutikubun: 1,
      takinouJigyo: 0,
      sisetsusyurui: '',
      teiin: '21人～40人',
      takinougataNado: '',
      jinin: 'I型(17:1)',
      jigyosyoku: '指定',
      tujyo: '公立',
      kasan: 'なし',
      jigyojissi: '併設',
      taisyo: '',
    });


    for (let i = 0; i < serviceData.length; i++) {
      // 住所を接続する
      if (serviceData[i].jyusyo) {
        serviceData[i]['jyusyoText'] =
          '〒' +
          serviceData[i].post1 +
          '-' +
          serviceData[i].post2 +
          '\n' +
          serviceData[i].jyusyo;
      } else {
        serviceData[i]['jyusyojyusyoText'] = '';
      }

      if (serviceData[i].tel1 && serviceData[i].tel2 && serviceData[i].tel3) {
        serviceData[i]['tel'] =
          serviceData[i].tel1 +
          '-' +
          serviceData[i].tel2 +
          '-' +
          serviceData[i].tel3;
      } else {
        serviceData[i]['tel'] = '';
      }

      if (serviceData[i].fax1 && serviceData[i].fax2 && serviceData[i].fax3) {
        serviceData[i]['fax'] =
          serviceData[i].fax1 +
          '-' +
          serviceData[i].fax2 +
          '-' +
          serviceData[i].fax3;
      } else {
        serviceData[i]['fax'] = '';
      }

      serviceData[i]['reseDisp'] = serviceData[i].rese;
      serviceData[i]['takinouJigyo'] = serviceData[i].takinouJigyo;

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