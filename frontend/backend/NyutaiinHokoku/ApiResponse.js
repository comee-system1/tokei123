let riyo_inf = []
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    //  console.log("apiResponse");
    //  console.log(res);
    riyo_inf = [];

    for (let i = 0; i < 1; i++) {
      riyo_inf.push(
        {
          'riyo_inf': {
            riid: '1000000000',
            riyocode: '1000000000',
            names: '東経太郎',
            kana: 'タロウトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012360',
            },
            nyutaiin_inf: {
              // 1:入退院、2:外泊
              kbn: 1,
              nyutaikbn: 1,
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '1000000000',
              gaihaku: ''
            },
            // 区分が2の場合はNULLを設定
            // 未存在の場合はNULLを設定
            byoin_inf: {
              byoinname: '東経市市民病院',
            },
            dsp_inf: {
              // 区分が1、入退院区分が1の場合は「入院」
              // 区分が1、入退院区分が2の場合は「退院」
              // 区分が2の場合は「外泊」
              nyuutaigai: '入院',
              symddsp: '20210710',
              eymddsp: '20210725',
              // 区分が1の場合は病院名
              // 区分が2の場合は外泊先
              ngname: '東経市市民病院',
              // 区分が1、入退院区分が1の場合は、備考(開始日)
              // 区分が1、入退院区分が2の場合は、備考(終了日)
              // 区分が2の場合は、備考(開始日)
              bikoudsp: '備考',
            }
          }
        },
        {
          'riyo_inf': {
            riid: '1000000000',
            riyocode: '1000000000',
            names: '東経太郎',
            kana: 'タロウトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012360',
            },
            nyutaiin_inf: {
              kbn: 1,
              nyutaikbn: 2,
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '1100000000',
              gaihaku: ''
            },
            byoin_inf: {
              byoinname: '東経市市民病院',
            },
            dsp_inf: {
              nyuutaigai: '退院',
              symddsp: '20210710',
              eymddsp: '20210725',
              ngname: '東経市市民病院',
              bikoudsp: '備考',
            }
          }
        },
        {
          'riyo_inf': {
            riid: '1000000001',
            riyocode: '1000000001',
            names: '東経次郎',
            kana: 'ジロウトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012359',
            },
            nyutaiin_inf: {
              kbn: 1,
              nyutaikbn: 1,
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '1000000000',
              gaihaku: ''
            },
            byoin_inf: {
              byoinname: '西経市市民病院',
            },
            dsp_inf: {
              nyuutaigai: '入院',
              symddsp: '20210710',
              eymddsp: '20210725',
              ngname: '西経市市民病院',
              bikoudsp: '',
            }
          }
        },
        {
          'riyo_inf': {
            riid: '1000000002',
            riyocode: '1000000002',
            names: '東経三郎',
            kana: 'サブロウトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012358',
            },
            nyutaiin_inf: {
              kbn: 2,
              nyutaikbn: '',
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '',
              gaihaku: '自宅'
            },
            byoin_inf: {
              byoinname: '',
            },
            dsp_inf: {
              nyuutaigai: '外泊',
              symddsp: '20210710',
              eymddsp: '20210725',
              ngname: '自宅',
              bikoudsp: '備考',
            }
          }
        },
        {
          'riyo_inf': {
            riid: '1000000003',
            riyocode: '1000000003',
            names: '東経さおり',
            kana: 'サオリトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012357',
            },
            nyutaiin_inf: {
              kbn: 1,
              nyutaikbn: '北経市市民病院',
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '',
              gaihaku: ''
            },
            byoin_inf: {
              byoinname: '',
            },
            dsp_inf: {
              nyuutaigai: '入院',
              symddsp: '20210710',
              eymddsp: '20210725',
              ngname: '北経市市民病院',
              bikoudsp: '',
            }
          }
        },
        {
          'riyo_inf': {
            riid: '1000000004',
            riyocode: '1000000004',
            names: '東経 愛子',
            kana: 'アイコトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012356',
            },
            nyutaiin_inf: {
              kbn: 2,
              nyutaikbn: '',
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '',
              gaihaku: '東経市ホテル'
            },
            byoin_inf: {
              byoinname: '',
            },
            dsp_inf: {
              nyuutaigai: '外泊',
              symddsp: '20210710',
              eymddsp: '20210725',
              ngname: '東経市ホテル',
              bikoudsp: '',
            }
          }
        },
        {
          'riyo_inf': {
            riid: '1000000004',
            riyocode: '1000000004',
            names: '東経 愛子',
            kana: 'アイコトウケイ',
            jyukyu_inf: {
              jyukyuno: '100012356',
            },
            nyutaiin_inf: {
              kbn: 1,
              nyutaikbn: 1,
              ngsymd: '20210710',
              ngeymd: '20210725',
              byoincode: '1100000002',
              gaihaku: ''
            },
            byoin_inf: {
              byoinname: '西経市市民病院',
            },
            dsp_inf: {
              nyuutaigai: '入院',
              symddsp: '20210710',
              eymddsp: '20210725',
              ngname: '西経市市民病院',
              bikoudsp: '備考',
            }
          }
        },
      );
    }
    let returns = {
      riyo_inf: riyo_inf
    };
    return returns;
  }
}