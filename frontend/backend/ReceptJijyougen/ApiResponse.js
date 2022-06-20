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
        riid: 1000000000,
        sogaku: 98500,
        riyogaku: 9300,
        hannei: '',
        svcnm: '32施設入所',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 きなこ',
          kana: 'キナコトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012358,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1121000011,
            jigyonm: 'ひまわり園',
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
      fixFlag: false,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000000,
        sogaku: '',
        riyogaku: '',
        hannei: '',
        svcnm: '46就労継続',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 きなこ',
          kana: 'キナコトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012358,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000233,
            jigyonm: 'たんぽぽ就労事業',
          }
        },
        cnt: 2,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });
    seikyu_inf.push({
      status: 'idle',
      fixFlag: false,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000000,
        sogaku: '',
        riyogaku: '',
        hannei: '',
        svcnm: '11住宅介護',
        sityo_inf: {
          sityono: 100,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 きなこ',
          kana: 'キナコトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012358,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000256,
            jigyonm: 'さくら訪問介護',
          }
        },
        cnt: 3,
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
        riid: 1000000000,
        sogaku: 327364,
        riyogaku: 32736,
        hannei: '',
        svcnm: '24短期入所',
        sityo_inf: {
          sityono: 101,
          sityonm: '西経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 しずか',
          kana: 'シズカトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012359,
          fjyogen: 37200,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1121000011,
            jigyonm: 'ひまわり園',
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
      fixFlag: false,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000000,
        sogaku: '',
        riyogaku: '',
        hannei: '',
        svcnm: '46就労継続',
        sityo_inf: {
          sityono: 101,
          sityonm: '西経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 しずか',
          kana: 'シズカトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012359,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000233,
            jigyonm: 'たんぽぽ就労事業',
          }
        },
        cnt: 2,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });
    seikyu_inf.push({
      status: 'idle',
      fixFlag: false,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000000,
        sogaku: '',
        riyogaku: '',
        hannei: '',
        svcnm: '11住宅介護',
        sityo_inf: {
          sityono: 101,
          sityonm: '西経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 しずか',
          kana: 'シズカトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012359,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000233,
            jigyonm: 'さくら訪問介護',
          }
        },
        cnt: 3,
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
        riid: 1000000000,
        sogaku: 148392,
        riyogaku: 14839,
        hannei: '',
        svcnm: '24短期入所',
        sityo_inf: {
          sityono: 101,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 ひろこ',
          kana: 'ヒロコトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012360,
          fjyogen: 37200,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1121000011,
            jigyonm: 'ひまわり園',
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
      fixFlag: false,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000000,
        sogaku: '',
        riyogaku: '',
        hannei: '',
        svcnm: '46就労継続',
        sityo_inf: {
          sityono: 101,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 ひろこ',
          kana: 'ヒロコトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012360,
          fjyogen: 37200,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000233,
            jigyonm: 'たんぽぽ就労事業',
          }
        },
        cnt: 2,
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
        riid: 1000000000,
        sogaku: 326810,
        riyogaku: 9300,
        hannei: '',
        svcnm: '32施設入所',
        sityo_inf: {
          sityono: 101,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 健二',
          kana: 'ケンジトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012367,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1121000011,
            jigyonm: 'ひまわり園',
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
        riid: 1000000000,
        sogaku: 123400,
        riyogaku: 0,
        hannei: '',
        svcnm: '11住宅介護',
        sityo_inf: {
          sityono: 101,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 健二',
          kana: 'ケンジトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012367,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000012,
            jigyonm: 'すみれ介護センター',
          }
        },
        cnt: 2,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });

    seikyu_inf.push({
      status: 'idle',
      fixFlag: false,
      seikyu_inf: {
        sityoid: 1000000000,
        riid: 1000000000,
        sogaku: '',
        riyogaku: '',
        hannei: '',
        svcnm: '11住宅介護',
        sityo_inf: {
          sityono: 101,
          sityonm: '東経市',
        },
        jigyo_inf: {
          jigyokbn: '自',
          jigyono: 1000000,
          jigyonm: 'ひまわり園',
        },
        kihon_inf: {
          riyocode: 1000,
          names: '東経 健二',
          kana: 'ケンジトウケイ',
        },
        jyukyu_inf: {
          jyukyuno: 1100012367,
          fjyogen: 9300,
          jkjigyo_inf: {
            jigyokbn: '自',
            jigyono: 1125000256,
            jigyonm: 'さくら訪問介護',
          }
        },
        cnt: 3,
        jkanri_inf: {
          jknr_riyogaku: '',
          jknr_rslt: ''
        }
      },
    });

    return seikyu_inf;

  }
}