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
          status: 'idle',
          'kyufuhi': {
            tym: '202203',
            rym: '202203',
            jigyono: '1100000000',
            hokbn: '10',
            kyufuhi_khn: {
              kojin: {
                sityoid: 1900000000,
                shichosoncd: '180000',
                riid: 1200000000,
                riyocode: 1300000000,
                names: '東経 太郎',
                kana: 'タロウ トウケイ',
                ncod: 1234,
                kzk_dcod:1234,
                kzk_name:'東経 太郎',
                jyoseiid:333,
                kyuti:12,
                kyutiname:'１級地',
                teido:1,
                jyogengaku:1234567890,
                agm_jigyoumu:1,
                agm_jigyoumunai:'',
                agm_riyoumu:1,
                agm_riyoumunai:'',
                kakutei:0,
                keika:1,
              },
              jknr: {
                jigyoid: 1700000000,
                jjigyono: "1800000000",
                kjgyoname: "障害者支援施設 ひまわり園",
                kjgyoryaku1: "",
                kjgyoryaku2: "",
                jigyokbn: 0,
                agm_jigyoumu: 1,
                rslt: 1,
                rsltnai: "管理で充当",
                gaku: 1234567890,
              },
              nityuksn: {
                jigyoid :1234567890,
                jjigyono :"1234567890",
                kjgyoname :"障害者支援施設 ひまわり園",
                kjgyoryaku1 :"",
                kjgyoryaku2 :"",
                jigyokbn :0,
                nissu :30,
              },
              goukei: {
                ssg_tani_kyufu: 123456789,
                ssg_sogaku: 1234567890,
                ssg_jknr_gaku: 123456,
                ssg_agm_jigyogaku: 123456,
                ssg_agm_riyogaku: 123456,
                ssg_ts_riyogaku: 123456,
                ssg_ts_riyogakut: 123456,
                ssg_riyogaku: 123456,
                ssg_seikyugaku: 1234567890,
                ssg_kogaku: 1234567890,
                ssg_tkgaku: 1234567890,
                ssg_jyoseigaku: 123456,
                riyogaku: 123456,
                ttk_higaku: 1234,
                ttk_nissu: 30,
                ttk_seikyugaku: 123456,
                ttk_jippigaku: 123456,
              },
              kyufuhi_ms1: {
                ms1_svcsyucode: 22,
                ms1_symd: "20211111",
                ms1_eymd: "20220730",
                ms1_nissu: 23,
                ms1_nyuin: 10,
                ms1_gaihaku: 2,
                ms1_syunissu: 2,
              },
              kyufuhi_ms2: {
                ms2_svccode: "123456",
                ms2_svcname: "生活介護１４",
                ms2_svcsyucode: "22",
                ms2_tanio: 123456,
                ms2_kaisu: 100,
                ms2_tani_santei: 123456789,
                ms2_tekiyo: "あいうえおかきくけこさしすせそたちつてと",
                ms2_tani_tanka: 8500,
                ms2_kyufuritu: 70,
                ms2_bunrui_ms3: 1,
              },
              kyufuhi_ms3: {
                ms3_svcsyucode :"123456",
                ms3_bunrui :1,
                ms3_nissu :15,
                ms3_tanki_kyufu :1234567890,
                ms3_tanki_tanka :8500,
                ms3_kyufuritu :30,
                ms3_sogaku :123456,
                ms3_kf_seikyugaku :1234567890,
                ms3_kf_riyogaku :1234567890,
                ms3_jknr_gaku :123456,
                ms3_agm_jigyogaku :123456,
                ms3_agm_riyogaku :123456,
                ms3_ts_riyogaku :123456,
                ms3_ts_riyogakut :123456,
                ms3_riyogaku :1234567890,
                ms3_seikyugaku :1234567890,
                ms3_kogaku :1234567890,
                ms3_tkgaku :1234567890,
                ms3_jigyogaku :1234567890,
                ms3_riyogaku :123456,
                ms3_ttk_higaku :1234,
                ms3_ttk_nissu :16,
                ms3_ttk_seikyugaku :123456,
                ms3_ttk_jippigaku :1234,
                ms3_rnk_sym :20211111,
                ms3_rnk_eym :20220730,
                ms3_rnk_nissu :17,
                ms3_rnk_sowa :123,
                ms3_kf_riyogaku2 :123456,
              }
            },
          }
        }
      );
    }
    let returns = {
      riyo_inf: riyo_inf
    };
    return returns;
  }
}