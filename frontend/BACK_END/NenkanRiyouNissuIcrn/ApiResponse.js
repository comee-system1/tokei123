let riyo_inf = [];
let nengetu_inf = {};
let gokei_inf = {};
let kaisyo_inf = {};
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    //  console.log("apiResponse");
    //  console.log(res);
    riyo_inf = [];
    nengetu_inf = {};
    gokei_inf = {};
    kaisyo_inf = {};
    for (let i = 0; i < 10; i++) {
      riyo_inf.push({
        'riyo_inf': {
          riid: '1000000000',
          riyocode: '1000000000',
          names: '東経太郎',
          kana: 'タロウトウケイ',
          jyukyu_inf: {
            jyukyuno: '100012358',
            syogaikbn: '3',
            syogaikbn_old: '3',
            serreki_inf: {
              symd: '',
              eymd: '',
            },
            riyonissu_inf: {
              nissu1: 10,
              nissu2: 14,
              nissu3: 16,
              nissu4: 18,
              nissu5: 16,
              nissu6: 19,
              nissu7: 8,
              nissu8: 12,
              nissu9: 17,
              nissu10: 20,
              nissu11: 19,
              nissu12: 2,
              gokei: 171,
              tukisu: 12,
              avg: 14.25,
            }
          }
        },
      }, {
        'riyo_inf': {
          riid: '1000000002',
          riyocode: '1000000002',
          names: '東経次郎',
          kana: 'ジロウトウケイ',
          jyukyu_inf: {
            jyukyuno: '100012360',
            syogaikbn: '4',
            syogaikbn_old: '4',
            serreki_inf: {
              symd: '',
              eymd: '',
            },
            riyonissu_inf: {
              nissu1: 11,
              nissu2: 18,
              nissu3: 17,
              nissu4: 13,
              nissu5: 17,
              nissu6: 16,
              nissu7: 14,
              nissu8: 15,
              nissu9: 11,
              nissu10: 0,
              nissu11: 0,
              nissu12: 3,
              gokei: 135,
              tukisu: 12,
              avg: 11.25,
            }
          }
        },
      }, {
        'riyo_inf': {
          riid: '1000000003',
          riyocode: '1000000003',
          names: '東経三郎',
          kana: 'サブロウトウケイ',
          jyukyu_inf: {
            jyukyuno: '100012361',
            syogaikbn: '3',
            syogaikbn_old: '3',
            serreki_inf: {
              symd: '',
              eymd: '',
            },
            riyonissu_inf: {
              nissu1: 7,
              nissu2: 9,
              nissu3: 10,
              nissu4: 9,
              nissu5: 8,
              nissu6: 11,
              nissu7: 13,
              nissu8: 15,
              nissu9: 11,
              nissu10: 10,
              nissu11: 3,
              nissu12: 4,
              gokei: 110,
              tukisu: 12,
              avg: 9.17,
            }
          }
        },
      }, {
        'riyo_inf': {
          riid: '1000000004',
          riyocode: '1000000004',
          names: '東経さおり',
          kana: 'サオリトウケイ',
          jyukyu_inf: {
            jyukyuno: '100012362',
            syogaikbn: '2',
            syogaikbn_old: '2',
            serreki_inf: {
              symd: '20211020',
              eymd: '20211021',
            },
            riyonissu_inf: {
              nissu1: 15,
              nissu2: 13,
              nissu3: 14,
              nissu4: -1,
              nissu5: -1,
              nissu6: -1,
              nissu7: -1,
              nissu8: -1,
              nissu9: -1,
              nissu10: 13,
              nissu11: 14,
              nissu12: 15,
              gokei: 84,
              tukisu: 12,
              avg: '14.00',
            }
          }
        },
      }, {
        'riyo_inf': {
          riid: '1000000005',
          riyocode: '1000000005',
          names: '東経 愛子',
          kana: 'アイコトウケイ',
          jyukyu_inf: {
            jyukyuno: '100012364',
            syogaikbn: '5',
            syogaikbn_old: '5',
            serreki_inf: {
              symd: '',
              eymd: '',
            },
            riyonissu_inf: {
              nissu1: '',
              nissu2: '',
              nissu3: '',
              nissu4: '',
              nissu5: '',
              nissu6: '',
              nissu7: '',
              nissu8: '',
              nissu9: '',
              nissu10: '',
              nissu11: '',
              nissu12: '',
              gokei: '',
              tukisu: '',
              avg: '',
            }
          }
        },
      }, {
        'riyo_inf': {
          riid: '1000000010',
          riyocode: '1000000010',
          names: '東経 春奈',
          kana: 'ハルナトウケイ',
          jyukyu_inf: {
            jyukyuno: '100012365',
            syogaikbn: '3',
            syogaikbn_old: '3',
            serreki_inf: {
              symd: '20210521',
              eymd: '20221218',
            },
            riyonissu_inf: {
              nissu1: '-1',
              nissu2: '-1',
              nissu3: '-1',
              nissu4: '-1',
              nissu5: '3',
              nissu6: '14',
              nissu7: '13',
              nissu8: '16',
              nissu9: '15',
              nissu10: '17',
              nissu11: '16',
              nissu12: '10',
              gokei: '104',
              tukisu: '8',
              avg: '13.00',
            }
          }
        },
      });
    }
    nengetu_inf = {
      'nengetu_inf': {
        nengetu1: 10,
        nengetu2: 14,
        nengetu3: 16,
        nengetu4: 18,
        nengetu5: 16,
        nengetu6: 19,
        nengetu7: 8,
        nengetu8: 12,
        nengetu9: 17,
        nengetu10: 20,
        nengetu11: 19,
        nengetu12: 2,
      },
    };

    gokei_inf = {
      'gokei_inf': {
        nissu1: 49,
        nissu2: 54,
        nissu3: 57,
        nissu4: 55,
        nissu5: 61,
        nissu6: 78,
        nissu7: 64,
        nissu8: 75,
        nissu9: 73,
        nissu10: 78,
        nissu11: 69,
        nissu12: 49,
        gokei: 762,
        avg: '12.70',
      },
    };


    kaisyo_inf = {
      'kaisyo_inf': {
        nissu1: 20,
        nissu2: 21,
        nissu3: 21,
        nissu4: 22,
        nissu5: 20,
        nissu6: 21,
        nissu7: 21,
        nissu8: 20,
        nissu9: 22,
        nissu10: 22,
        nissu11: 21,
        nissu12: 20,
        gokei: 251,
        avg: 20.02,
      },
    };
    let returns = {
      riyo_inf: riyo_inf,
      nengetu_inf: nengetu_inf,
      gokei_inf: gokei_inf,
      kaisyo_inf: kaisyo_inf

    };

    return returns;
  }
}