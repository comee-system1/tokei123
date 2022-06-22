module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    //  console.log("apiResponse");
    //  console.log(res);

    let seikyu_inf = [];
    seikyu_inf.push({
      status: 'idle',
      fixFlag: true,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000001,
        sogaku: 191650,
        riyogaku: 19165,
        hannei: '',
        hanneikey: '',
        svcnm: '22生活介護',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1121000011,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 春美',
          kana: 'ハルミトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012391,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '他',
            jigyono: 1121000011,
            jigyonm: '南山事業所',
          }
        },
        cnt: 1,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });
    seikyu_inf.push({
      status: 'idle',
      fixFlag: true,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000001,
        sogaku: 75420,
        riyogaku: 7542,
        hannei: '',
        hanneikey: '',
        svcnm: '22生活介護',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1121000011,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 三郎',
          kana: 'サブロウトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012352,
          fjyogen: 37200,
          jkjigyo_inf: {
            jigyokbn: '他',
            jigyono: 1121000011,
            jigyonm: '南山事業所',
          }
        },
        cnt: 1,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });
    seikyu_inf.push({
      status: 'idle',
      fixFlag: true,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000001,
        sogaku: 133520,
        riyogaku: 13352,
        hannei: '',
        hanneikey: '',
        svcnm: '24短期利用',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1121000011,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 喜美子',
          kana: 'キミコトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012353,
          fjyogen: 37200,
          jkjigyo_inf: {
            jigyokbn: '他',
            jigyono: 1121000011,
            jigyonm: 'さくら事業所',
          }
        },
        cnt: 1,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });
    seikyu_inf.push({
      status: 'idle',
      fixFlag: true,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000001,
        sogaku: 191650,
        riyogaku: 19165,
        hannei: '',
        hanneikey: '',
        svcnm: '22生活介護',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1121000011,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 二郎',
          kana: 'ジロウトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012356,
          fjyogen: 37200,
          jkjigyo_inf: {
            jigyokbn: '他',
            jigyono: 1121000011,
            jigyonm: 'たんぽぽ園',
          }
        },
        cnt: 1,
        jkanri_inf: {
          jknr_riyogaku: 19165,
          jknr_rslt: 3
        }
      },
    });


    return seikyu_inf;

  }
}