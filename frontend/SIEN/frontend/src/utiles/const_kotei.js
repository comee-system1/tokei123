const INS_KBN_NAIYO = 0;  //登録区分:データ  
const INS_KBN_HEAD = 1;   //登録区分:ヘッダ
const INS_KBN_BIKO = 2;   //登録区分:備考
const INS_KBN_HEADAll = 3;   //登録区分:ヘッダ一括
const DEL_KBN_REKI = 1;   //削除区分:履歴
const GET_KBN_DATA = 1;   //取得区分:表示データ
const DEL_KBN_DATA = 0;   //削除区分:データ
const DEL_KBN_BIKO = 2;    //削除区分:備考
const DEL_KBN_ALL = 3;    //削除区分:全データ


//画面ID
const KOTEI_ID_KIHON = 1;    //基本情報
const KOTEI_ID_SEIKATU = 2;    //生活歴
const KOTEI_ID_KIOU = 3;    //既往歴
const KOTEI_ID_JYUSIN = 4;    //受診歴
const KOTEI_ID_IRYO = 5;    //医療保険
const KOTEI_ID_SEIJO = 6;    //生活状況
const KOTEI_ID_KAZOKU = 100;    //家族情報
const KOTEI_ID_KAIGO = 101;    //介護者情報
const KOTEI_ID_JYUKYO = 102;    //住居
const KOTEI_ID_KOKEN = 103;    //後見人
const KOTEI_ID_KANKEI = 200;    //関係機関
const KOTEI_ID_TETYO = 201;    //手帳情報
const KOTEI_ID_KAISV = 202;    //介護サービス




export default {
    GET_KBN_DATA,
    INS_KBN_NAIYO,
    INS_KBN_HEAD,
    INS_KBN_BIKO,
    INS_KBN_HEADAll,
    DEL_KBN_REKI,
    DEL_KBN_DATA,
    DEL_KBN_BIKO,
    DEL_KBN_ALL,

    KOTEI_ID_KIHON,
     KOTEI_ID_SEIKATU,
     KOTEI_ID_KIOU,
     KOTEI_ID_JYUSIN,
     KOTEI_ID_IRYO,
     KOTEI_ID_SEIJO,
     KOTEI_ID_KAZOKU,
     KOTEI_ID_KAIGO,
     KOTEI_ID_JYUKYO,
     KOTEI_ID_KOKEN,
     KOTEI_ID_KANKEI,
     KOTEI_ID_TETYO,
     KOTEI_ID_KAISV,

}