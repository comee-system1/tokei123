const Service = require('../KeiyakuHokoku/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')


// riyocode, svcsyocodeがある時は個別データを取得
// urlにriyocode, svcsyocodeをつける予定
export async function KeiyakuHokoku(riyocode = 0, svcsyocode = 0) {

  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  // テスト用
  var url = "/";
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);

  return await service.getData().then(result => {
    // 利用者情報一覧
    let icrn_inf = [];
    let array = [];
    array.push({
      jyukyuno: 10000001,
      riyocode: 10000001,
      rnames: '東経 太郎',
      rkanas: 'タロウトウケイ',
      sikyuryo_inf: [{
        svcsyucode: '11',
        svcsyocode: '10001',
        svcname: '居宅介護(身体介護)',
        sikyunaiyo: '20:00/月 1:00/回',
        jyukyuid: 1,
        sumi: '',
        syuryo: '',
        ktkkeiyakunew_inf: [{
            jigyono: '10001',
            jigyoname: '東経ヘルパーセンター'
          },
          {
            jigyono: '10002',
            jigyoname: '障害支援施設たんぽぽ園'
          }
        ]
      }, {
        svcsyucode: '11',
        svcsyocode: '10002',
        svcname: '居宅介護(家事援助)',
        sikyunaiyo: '15:00/月 1:00/回',
        jyukyuid: 1,
        sumi: '',
        syuryo: '',
        ktkkeiyakunew_inf: [{
          jigyono: '10002'
        }]
      }, {
        svcsyucode: '22',
        svcname: '生活介護',
        sikyunaiyo: '当該月日数-8日',
        jyukyuid: 1,
        sumi: '',
        syuryo: '',
      }, {
        svcsyucode: '24',
        svcname: '短期入所',
        sikyunaiyo: '10日/月',
        jyukyuid: 1,
        sumi: '',
        syuryo: '',
      }]

    }, {
      jyukyuno: 10000002,
      riyocode: 10000002,
      rnames: '東経 二郎',
      rkanas: 'ジロウトウケイ',
      sikyuryo_inf: [{
        svcsyucode: '11',
        svcname: '居宅介護(家事援助)',
        sikyunaiyo: '14:00/月 1:00/回',
        jyukyuid: 2,
        sumi: '',
        syuryo: '',
      }, {
        svcsyucode: '22',
        svcname: '生活介護',
        sikyunaiyo: '該当月日数-8日',
        jyukyuid: 2,
        sumi: '',
        syuryo: '',
      }, {
        svcsyucode: '45',
        svcname: '就労継続支援A型',
        sikyunaiyo: '該当月日数-8日',
        jyukyuid: 2,
        sumi: '',
        syuryo: '',
      }, {
        svcsyucode: '52',
        svcname: '計画相談支援',
        sikyunaiyo: '-',
        jyukyuid: 2,
        sumi: '',
        syuryo: '',
      }]
    }, {
      jyukyuno: 10000003,
      riyocode: 10000003,
      rnames: '東経 三郎',
      rkanas: 'サブロウトウケイ',
      sikyuryo_inf: [{
        svcsyucode: '22',
        svcname: '生活介護',
        sikyunaiyo: '当該月日数-8日',
        jyukyuid: 3,
        sumi: '',
        syuryo: '',
      }]
    });
    //　配列の補正
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].sikyuryo_inf.length; j++) {
        let jigyono = [];
        let new_inf = array[i].sikyuryo_inf[j].ktkkeiyakunew_inf;
        if (new_inf) {
          for (let k = 0; k < new_inf.length; k++) {
            jigyono.push(new_inf[k].jigyono);
          }
        }

        icrn_inf.push({
          riyocode: array[i].riyocode,
          rnames: array[i].rnames,
          rkanas: array[i].rkanas,
          svcsyucode: array[i].sikyuryo_inf[j].svcsyucode,
          svcsyocode: array[i].sikyuryo_inf[j].svcsyocode,
          svcname: array[i].sikyuryo_inf[j].svcname,
          sikyunaiyo: array[i].sikyuryo_inf[j].sikyunaiyo,
          jyukyuid: array[i].sikyuryo_inf[j].jyukyuid,
          jigyono: jigyono,
          jyukyuno: array[i].jyukyuno,
        });
      }
    }
    let returns = {
      status: 1,
      icrn_inf: icrn_inf,
    };
    return returns;

  });


}