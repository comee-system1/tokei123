export 
const kyufuhimeisai =  {
  // API取得想定データ
  jyukyusya: {
    jyukyuno:'',
    jyukyusyaName:'',
    syogaijiName:'',
  },
  jigyosyo: {
    jigyosyo:'',
    jimusyoBango:'',
  },
  // 基本(個人)
  kojin: {
    sityoid:'',               // 市町村ID
    shichosoncd:'123456',     // 市区町村コード
    sityoname:'',             // 市区町村名
    sityoryaku:'',            // 市区町村略称
    riid:'',                  // 利用者内部ID
    riyocode:'',              // 利用者コード
    names:'',                 // 利用者名
    kana:'',                  // 利用者カナ名
    ncod:'',                  // 家族内部ID
    kzk_dcod:'',              // 家族コード
    kzk_name:'',              // 家族氏名
    jyoseiid:'654321',        // 助成自治体番号
    kyuti:'',                 // 地域区分コード
    kyutiname:'１級地',       // 地域区分名
    teido:'1',                 // 障害程度区分コード
    jyogengaku:'9800',        // 利用者負担上限月額
    agm_jigyoumu:'1:なし',    // Ａ型減免措置実施の有無
    agm_jigyoumunai:'',       // Ａ型減免措置実施の内容
    agm_riyoumu:'2:あり',     // Ａ型減免対象者
    agm_riyoumunai:'',        // Ａ型減免対象者の内容
    kakutei:'',               // 確定フラグ
    keika:'',                 // 経過区分
  },
  // 基本(上限管理)
  jknr: {
    jigyoid:'',              // 事業者ID
    jjigyono:'1121000011',   //  事業者番号
    kjgyoname:'南山事業所',   // 事業者名
    kjgyoryaku1:'',          // 事業者略称名１
    kjgyoryaku2:'',          // 事業者略称名２
    jigyokbn:'',            //  施設区分
    rslt:'1',                //  管理結果
    rsltnai:'',              // 管理結果の内容
    gaku:'21',                //  結果額
  },
  // 給付費明細書日数情報
  kyufuhi_ms1: [
    {
      ms1_svcsyucode:'11',      //  サービス種類コード
      ms1_svcname:'',          //  サービス種類名
      ms1_svcryaku:'',         //  サービス略称名
      ms1_symd:'20220401',     //  開始年月日
      ms1_eymd:'20220801',     //  終了年月日
      ms1_nissu:'11',          //  利用日数
      ms1_nyuin:'12',          //  入院日数
      ms1_gaihaku:'',          //  外泊日数
      ms1_syunissu:'',        //  利用日数(請求額集計用)
    },
    {
      ms1_svcsyucode:'22',
      ms1_svcname:'',
      ms1_svcryaku:'',
      ms1_symd:'20220402',
      ms1_eymd:'20220802',
      ms1_nissu:'21',
      ms1_nyuin:'1',
      ms1_gaihaku:'',
      ms1_syunissu:'',
    },
    {
      ms1_svcsyucode:'33',
      ms1_svcname:'',
      ms1_svcryaku:'',
      ms1_symd:'20220403',
      ms1_eymd:'20220803',
      ms1_nissu:'31',
      ms1_nyuin:'12',
      ms1_gaihaku:'',
      ms1_syunissu:'',
    },
    {
      ms1_svcsyucode:'44',
      ms1_svcname:'',
      ms1_svcryaku:'',
      ms1_symd:'20220404',
      ms1_eymd:'20220804',
      ms1_nissu:'31',
      ms1_nyuin:'12',
      ms1_gaihaku:'',
      ms1_syunissu:'',
    }
  ],
  // 給付費明細書明細欄情報
  kyufuhi_ms2: [
    {
      ms2_svcsyucode:'123456',
      ms2_svccode:'',
      ms2_svcname:'１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０',
      ms2_tanio:123456,
      ms2_kaisu:12,
      ms2_tani_santei:123456789,
      ms2_tekiyo:'１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    },
    {
      ms2_svcsyucode:'222131',
      ms2_svccode:'',
      ms2_svcname:'生活介護１４',
      ms2_tanio:669,
      ms2_kaisu:31,
      ms2_tani_santei:20739,
      ms2_tekiyo:'',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    },
    {
      ms2_svcsyucode:'226005',
      ms2_svccode:'',
      ms2_svcname:'生介常勤看護職員等配置加算１１',
      ms2_tanio:84,
      ms2_kaisu:31,
      ms2_tani_santei:2604,
      ms2_tekiyo:'',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    },
    {
      ms2_svcsyucode:'226037',
      ms2_svccode:'',
      ms2_svcname:'生介福祉専門職員配置等加算Ⅰ',
      ms2_tanio:15,
      ms2_kaisu:31,
      ms2_tani_santei:465,
      ms2_tekiyo:'',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    },
    {
      ms2_svcsyucode:'226716',
      ms2_svccode:'',
      ms2_svcname:'生介障害者支援施設処遇改善加算Ⅰ',
      ms2_tanio:1409,
      ms2_kaisu:1,
      ms2_tani_santei:1409,
      ms2_tekiyo:'',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    },
    {
      ms2_svcsyucode:'226037',
      ms2_svccode:'',
      ms2_svcname:'生介福祉専門職員配置等加算Ⅰ',
      ms2_tanio:15,
      ms2_kaisu:31,
      ms2_tani_santei:465,
      ms2_tekiyo:'',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    },
    {
      ms2_svcsyucode:'226716',
      ms2_svccode:'',
      ms2_svcname:'生介障害者支援施設処遇改善加算Ⅰ',
      ms2_tanio:1409,
      ms2_kaisu:1,
      ms2_tani_santei:1409,
      ms2_tekiyo:'',
      ms2_tani_tanka:'',
      ms2_kyufuritu:'',
      ms2_bunrui_ms3:'',
    }
  ],
  //	 基本(日中介護加算)
  nityuksn: {
    jigyoid:'',                // 事業者ID
    jjigyono:'1121000010',     // 事業者番号
    kjgyoname:'生活ひまわり園', // 事業者名
    kjgyoryaku1:'',            // 事業者略称名１
    kjgyoryaku2:'',            // 事業者略称名２
    jigyokbn:'',               // 施設区分
    nissu:13,                  // 通所日数
  }
}

export default {
  kyufuhimeisai
}