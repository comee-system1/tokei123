let icrn_inf = []
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    //  console.log("apiResponse");
    //  console.log(res);
    icrn_inf = [];

    for (let i = 0; i < 5; i++) {
      icrn_inf.push(
        {
          status: 'idle',
          'icrn_inf':{
            jyukyuno:     '1000123600',
            riid:         '1000000000',
            riyocode:     '1000000000',
            rnames:       '１２３４５６７８９０',
            rkana:        'タロウトウケイ',
            rsex:         '男',
            sityoid:      '1010000000',
            sityoryaku:   '１２３４５６',
            gsogaku:      123456789,
            gfutan:       123456789,
            gtokubetu:    123456789,
            dairi:        123456789,
            uchiwake_inf:{
              hokbn:      '1',
              svcsyucode: '',
              svcryaku:   '',
              sogaku:     1000000000,
              riyogaku:   100000,
              jippigaku:  100000,
              kyufugak:   100000,
            }
          }
        },
        {
          status: 'idle',
          'icrn_inf':{
            jyukyuno:     '1000123599',
            riid:         '1000000001',
            riyocode:     '1000000001',
            rnames:       '東経次郎',
            rkana:        'ジロウトウケイ',
            rsex:         '男',
            sityoid:      '1010000000',
            sityoryaku:   '西経市',
            gsogaku:      1258400000,
            gfutan:       12584000,
            gtokubetu:    12584000,
            dairi:        12584000,
            uchiwake_inf:{
              hokbn:      '1',
              svcsyucode: '',
              svcryaku:   '',
              sogaku:     1000000000,
              riyogaku:   100000,
              jippigaku:  100000,
              kyufugak:   100000,
            }
          }
        },
        {
          status: 'idle',
          'icrn_inf':{
            jyukyuno:     '1000123598',
            riid:         '1000000002',
            riyocode:     '1000000002',
            rnames:       '東経三郎',
            rkana:        'サブロウトウケイ',
            rsex:         '男',
            sityoid:      '1010000000',
            sityoryaku:   '北経市',
            gsogaku:      1258400000,
            gfutan:       12584000,
            gtokubetu:    12584000,
            dairi:        12584000,
            uchiwake_inf:{
              hokbn:      '1',
              svcsyucode: '',
              svcryaku:   '',
              sogaku:     1000000000,
              riyogaku:   100000,
              jippigaku:  100000,
              kyufugak:   100000,
            }
          }
        },
        {
          status: 'idle',
          'icrn_inf':{
            jyukyuno:     '1000123597',
            riid:         '1000000003',
            riyocode:     '1000000003',
            rnames:       '東経さおり',
            rkana:        'タロウトウケイ',
            rsex:         '女',
            sityoid:      '1010000000',
            sityoryaku:   '南経市',
            gsogaku:      1258400000,
            gfutan:       12584000,
            gtokubetu:    12584000,
            dairi:        12584000,
            uchiwake_inf:{
              hokbn:      '1',
              svcsyucode: '',
              svcryaku:   '',
              sogaku:     1000000000,
              riyogaku:   100000,
              jippigaku:  100000,
              kyufugak:   100000,
            }
          }
        },
        {
          status: 'idle',
          'icrn_inf':{
            jyukyuno:     '1000123596',
            riid:         '1000000004',
            riyocode:     '1000000004',
            rnames:       '東経 愛子',
            rkana:        'アイコトウケイ',
            rsex:         '女',
            sityoid:      '1010000000',
            sityoryaku:   '南経市',
            gsogaku:      1258400000,
            gfutan:       12584000,
            gtokubetu:    12584000,
            dairi:        12584000,
            uchiwake_inf:{
              hokbn:      '1',
              svcsyucode: '',
              svcryaku:   '',
              sogaku:     1000000000,
              riyogaku:   100000,
              jippigaku:  100000,
              kyufugak:   100000,
            }
          }
        }
      );
    }
    let returns = {
      icrn_inf: icrn_inf
    };
    return returns;
  }
}