const Service = require('../ServiceTeikyo/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
const reseType = ['', '〇'];
const takinouJigyo = ['', '〇', 'gray'];
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

    serviceData.push(
      {
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
      },
      {
        code: '1002',
        serviceJigyosyoMei: '短期入所施設 ひまわり園',
        ryakusyo: '短期ひまわり園',
        serviceMeisyoCode: '24',
        serviceMeisyo: '短期入所',
        jigyosyoBango: '1121000011',
        post1: '001',
        post2: '0012',
        jyusyo: '●●市××町1-1-1',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: true,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 0,
        sisetsusyurui: '福祉施設',
        teiin: '',
        takinougataNado: '',
        jinin: '',
        jigyosyoku: '',
        tujyo: '公立',
        kasan: 'なし',
        jigyojissi: '',
        taisyo: 'なし',
      },
      {
        code: '1003',
        serviceJigyosyoMei: '障害者支援施設 ひまわり園',
        ryakusyo: '入所ひまわり園',
        serviceMeisyoCode: '32',
        serviceMeisyo: '施設入所支援',
        jigyosyoBango: '1121000011',
        post1: '001',
        post2: '0012',
        jyusyo: '●●市××町1-1-1',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: true,
        seikyuDaihyo: 1,
        seikyuDaihyoDisp: '〇',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 0,
        sisetsusyurui: '',
        teiin: '21人～40人',
        takinougataNado: '20人以下',
        jinin: '',
        jigyosyoku: '',
        tujyo: '',
        kasan: '',
        jigyojissi: '',
        taisyo: '',
      },
      {
        code: '1004',
        serviceJigyosyoMei: '障害者支援施設 たんぽぽ園',
        ryakusyo: '生活たんぽぽ園',
        serviceMeisyoCode: '22',
        serviceMeisyo: '生活介護',
        jigyosyoBango: '1121000012',
        post1: '',
        post2: '',
        jyusyo: '',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: true,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 1,
        sisetsusyurui: '',
        teiin: '21人～40人',
        takinougataNado: '20人以下',
        jinin: 'Ⅱ型(2:1)',
        jigyosyoku: '指定',
        tujyo: '',
        kasan: '',
        jigyojissi: '本体',
        taisyo: '',
      },
      {
        code: '1005',
        serviceJigyosyoMei: '障害者支援施設 たんぽぽ園',
        ryakusyo: '入所ひまわり園',
        serviceMeisyoCode: '32',
        serviceMeisyo: '施設入所支援',
        jigyosyoBango: '1121000012',
        post1: '',
        post2: '',
        jyusyo: '',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: true,
        seikyuDaihyo: 1,
        seikyuDaihyoDisp: '',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 0,
        sisetsusyurui: '',
        teiin: '21人～40人',
        takinougataNado: '',
        jinin: '',
        jigyosyoku: '指定',
        tujyo: '',
        kasan: '',
        jigyojissi: '本体',
        taisyo: '',
      },
      {
        code: '1006',
        serviceJigyosyoMei: '障害者支援施設 たんぽぽ園',
        ryakusyo: '自立訓練たんぽぽ園',
        serviceMeisyoCode: '41',
        serviceMeisyo: '自立訓練(機能訓練)',
        jigyosyoBango: '',
        post1: '',
        post2: '',
        jyusyo: '',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: true,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 2,
        sisetsusyurui: '',
        teiin: '',
        takinougataNado: '',
        jinin: '',
        jigyosyoku: '指定',
        tujyo: '',
        kasan: '',
        jigyojissi: '',
        taisyo: '',
      },
      {
        code: '1007',
        serviceJigyosyoMei: '就労支援センター たんぽぽ園',
        ryakusyo: '就労支援たんぽぽ園',
        serviceMeisyoCode: '43',
        serviceMeisyo: '就労移行支援',
        jigyosyoBango: '1121000022',
        post1: '',
        post2: '',
        jyusyo: '',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: true,
        seikyuDaihyo: 1,
        seikyuDaihyoDisp: '〇',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 2,
        sisetsusyurui: '日中サービス支援型',
        teiin: '21人～40人',
        takinougataNado: '',
        jinin: '',
        jigyosyoku: '指定',
        tujyo: '',
        kasan: '',
        jigyojissi: '',
        taisyo: '',
      },
      {
        code: '1008',
        serviceJigyosyoMei: '就労支援センター たんぽぽ園',
        ryakusyo: '就労支援たんぽぽ園',
        serviceMeisyoCode: '46',
        serviceMeisyo: '就労継続支援B型',
        jigyosyoBango: '1121000023',
        post1: '',
        post2: '',
        jyusyo: '',
        tel: '',
        tel1: '',
        tel2: '',
        tel3: '',
        fax: '',
        fax1: '',
        fax2: '',
        fax3: '',
        mail: '',
        rese: 0,
        enabled: false,
        seikyuDaihyo: 0,
        seikyuDaihyoDisp: '',
        tekiouStartDate: '20220304',
        kyutikubun: 1,
        takinouJigyo: 2,
        sisetsusyurui: '',
        teiin: '21人～40人',
        takinougataNado: '',
        jinin: '',
        jigyosyoku: '指定',
        tujyo: '',
        kasan: '',
        jigyojissi: '',
        taisyo: '',
      }

    );


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

      serviceData[i]['reseDisp'] = reseType[serviceData[i].rese];
      serviceData[i]['takinouJigyo'] = takinouJigyo[serviceData[i].takinouJigyo];

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