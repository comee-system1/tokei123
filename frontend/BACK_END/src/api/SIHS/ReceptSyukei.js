const Service = require('../../ReceptSyukei/Service')
const service = new Service();
const config = require('../ApiRun');
const moment = require('moment');
exports.connected = async function (param) {
    //var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';

    // param.receptTypeの値で呼び出すURLの変更を行う
    // list:レセプト集計 /tajyogen:他上限管理 / jijyogen:自上限管理
    // テスト用のためすべて同じURLを指定
    var url = "";
    if (param.receptType === "list") {
        url = config.getDomain() + 'Syogai/recept/v1/syukei/recept-syukeiicrn/?getkbn=0&sym=202206&tym=202206&jigyono=1000001&entpriid=1000001&hokbn=10&svcsyucode=1&sibori=0';
    } else if (param.receptType === 'tajyogen') {
        url = config.getDomain() + 'Syogai/recept/v1/syukei/recept-syukeiicrn/?getkbn=0&sym=202206&tym=202206&jigyono=1000001&entpriid=1000001&hokbn=10&svcsyucode=1&sibori=0';
    } else if (param.receptType === 'jijyogen') {
        url = config.getDomain() + 'Syogai/recept/v1/syukei/recept-syukeiicrn/?getkbn=0&sym=202206&tym=202206&jigyono=1000001&entpriid=1000001&hokbn=10&svcsyucode=1&sibori=0';
    } else if (param.receptType === 'jijyogenCalc') {
        url = config.getDomain() + 'Syogai/recept/v1/syukei/recept-syukeiicrn/?getkbn=0&sym=202206&tym=202206&jigyono=1000001&entpriid=1000001&hokbn=10&svcsyucode=1&sibori=0';
    } else {
        url = config.getDomain() + 'Syogai/recept/v1/syukei/recept-syukeiicrn/?getkbn=0&sym=202206&tym=202206&jigyono=1000001&entpriid=1000001&hokbn=10&svcsyucode=1&sibori=0';
    }

    // テスト用
    url = "/";
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    return await service.getData().then(result => {

        if (param.receptType === "list") {
            // 利用者情報一覧
            let seikyu_inf = [];

            for (let i = 0; i < 50; i++) {
                seikyu_inf.push({
                    error: '',
                    sityoson: '東経市東経市',
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
                    syukeibi: '2020-08-0' + i % 10,
                    tanto: '',
                    jyogenkanrizumi: '',
                    resekaku: '〇',
                });
            }

            let returns = {
                seikyu_inf: seikyu_inf,
            };
            return returns;
        }

        if (param.receptType === "jijyogen") {

            let seikyu_inf = [];
            seikyu_inf.push({
                status: 'idle',
                fixFlag: true,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000001,
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
                        jknr_riyogaku: 9300,
                        jknr_rslt: 1
                    }
                },
            });
            seikyu_inf.push({
                status: 'idle',
                fixFlag: false,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000002,
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
                        jknr_riyogaku: 0,
                        jknr_rslt: 1
                    }
                },
            });
            seikyu_inf.push({
                status: 'idle',
                fixFlag: false,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000003,
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
                    riid: 1000000004,
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
                        jknr_riyogaku: 32736,
                        jknr_rslt: 3
                    }
                },
            });

            seikyu_inf.push({
                status: 'idle',
                fixFlag: false,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000005,
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
                        jknr_riyogaku: 4464,
                        jknr_rslt: 3
                    }
                },
            });
            seikyu_inf.push({
                status: 'idle',
                fixFlag: false,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000006,
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
                            jigyonm: 'さくら訪問介護1',
                        }
                    },
                    cnt: 3,
                    jkanri_inf: {
                        jknr_riyogaku: 1111,
                        jknr_rslt: 3
                    }
                },
            });


            seikyu_inf.push({
                status: 'idle',
                fixFlag: true,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000007,
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
                        jknr_riyogaku: 14839,
                        jknr_rslt: 3
                    }
                },
            });

            seikyu_inf.push({
                status: 'idle',
                fixFlag: false,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000008,
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
                        jknr_riyogaku: 11856,
                        jknr_rslt: 3
                    }
                },
            });


            seikyu_inf.push({
                status: 'idle',
                fixFlag: true,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000009,
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
                        jknr_riyogaku: 9300,
                        jknr_rslt: 0
                    }
                },
            });

            seikyu_inf.push({
                status: 'idle',
                fixFlag: true,
                seikyu_inf: {
                    sityoid: 1000000000,
                    riid: 1000000010,
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
                    riid: 1000000011,
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
            let returns = [];

            for (let i = 0; i < seikyu_inf.length; i++) {
                returns.push({
                    sityoid: seikyu_inf[i].seikyu_inf.sityoid,
                    riid: seikyu_inf[i].seikyu_inf.riid,
                    hannei: seikyu_inf[i].seikyu_inf.hannei,
                    sityono: seikyu_inf[i].seikyu_inf.sityo_inf.sityono,
                    sityonm: seikyu_inf[i].seikyu_inf.sityo_inf.sityonm,
                    jyukyuno: seikyu_inf[i].seikyu_inf.jyukyu_inf.jyukyuno,
                    riyocode: seikyu_inf[i].seikyu_inf.kihon_inf.riyocode,
                    names: seikyu_inf[i].seikyu_inf.kihon_inf.names,
                    kana: seikyu_inf[i].seikyu_inf.kihon_inf.kana,
                    jigyo_jigyokbn: seikyu_inf[i].seikyu_inf.jigyo_inf.jigyokbn,
                    jigyo_jigyono: seikyu_inf[i].seikyu_inf.jigyo_inf.jigyono,
                    jigyo_jigyonm: seikyu_inf[i].seikyu_inf.jigyo_inf.jigyonm,
                    fjyogen: seikyu_inf[i].seikyu_inf.jyukyu_inf.fjyogen,
                    jyougengakukanrikeisan: '',
                    jknrcalc: '',
                    cnt: seikyu_inf[i].seikyu_inf.cnt,
                    jigyokbn: seikyu_inf[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyokbn,
                    jigyono: seikyu_inf[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyono,
                    jigyonm: seikyu_inf[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyonm,
                    svcnm: seikyu_inf[i].seikyu_inf.svcnm,
                    sogaku: seikyu_inf[i].seikyu_inf.sogaku,
                    riyogaku: seikyu_inf[i].seikyu_inf.riyogaku,
                    // jknr_riyogaku: seikyu_inf[i].seikyu_inf.jkanri_inf.jknr_riyogaku,
                    // jknr_rslt: seikyu_inf[i].seikyu_inf.jkanri_inf.jknr_rslt,
                    print: '',
                    complateFlag: false,
                    nyukyo: 1,
                    taikyo: 0,
                    viewflag: 1, //表示状態

                    fixFlag: seikyu_inf[i].fixFlag, //変更不可データ
                });
            }

            // 受給者番号でソート
            returns.sort((a, b) => {
                if (a.jyukyuno > b.jyukyuno) return 1;
                if (a.jyukyuno < b.jyukyuno) return -1;
                return 0;
            });

            return returns;
        }

        if (param.receptType === "tajyogen") {
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


            let returns = [];

            for (let i = 0; i < seikyu_inf.length; i++) {
                returns.push({
                    sityoid: seikyu_inf[i].seikyu_inf.sityoid,
                    riid: seikyu_inf[i].seikyu_inf.riid,
                    hannei: seikyu_inf[i].seikyu_inf.hannei,
                    hanneikey: seikyu_inf[i].seikyu_inf.hanneikey,
                    sityono: seikyu_inf[i].seikyu_inf.sityo_inf.sityono,
                    sityonm: seikyu_inf[i].seikyu_inf.sityo_inf.sityonm,
                    jyukyuno: seikyu_inf[i].seikyu_inf.jyukyu_inf.jyukyuno,
                    riyocode: seikyu_inf[i].seikyu_inf.kihon_inf.riyocode,
                    names: seikyu_inf[i].seikyu_inf.kihon_inf.names,
                    kana: seikyu_inf[i].seikyu_inf.kihon_inf.kana,
                    jigyo_jigyokbn: seikyu_inf[i].seikyu_inf.jigyo_inf.jigyokbn,
                    jigyo_jigyono: seikyu_inf[i].seikyu_inf.jigyo_inf.jigyono,
                    jigyo_jigyonm: seikyu_inf[i].seikyu_inf.jigyo_inf.jigyonm,
                    fjyogen: seikyu_inf[i].seikyu_inf.jyukyu_inf.fjyogen,
                    jyougengakukanrikeisan: '',
                    jknrcalc: '',
                    cnt: seikyu_inf[i].seikyu_inf.cnt,
                    jigyokbn: seikyu_inf[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyokbn,
                    jigyono: seikyu_inf[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyono,
                    jigyonm: seikyu_inf[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyonm,
                    svcnm: seikyu_inf[i].seikyu_inf.svcnm,
                    sogaku: seikyu_inf[i].seikyu_inf.sogaku,
                    riyogaku: seikyu_inf[i].seikyu_inf.riyogaku,
                    jknr_riyogaku: seikyu_inf[i].seikyu_inf.jkanri_inf.jknr_riyogaku,
                    jknr_rslt: seikyu_inf[i].seikyu_inf.jkanri_inf.jknr_rslt,
                    print: '',
                    complateFlag: false,
                    nyukyo: 1,
                    taikyo: 0,

                    blueFlag: i % 4 == 3
                });
            }

            return returns;

        }

        if (param.receptType == 'jijyogenCalc') {
            let returns = [];

            return returns;

        }
    });
}