const COLOR = {
    red: '#ff502f',
    black: '#000',
    white: '#fff',
    lightGray: '#ccc',
    brawn: '#4d4d4d',
    deepgreen: '#004d61',
    lightYellow: '#fffeed',
    fontColor: '#333',
    green: '#27904d',
    pink: '#f5d6e6',
    selectedColor: '#eee',
    gridBackground: '#fffeed',
    gridErrBackground: 'mistyrose',
    gridHoverBackground: '#f2fde9',
    gridSelectedBackground: '#fde9e8',
    gridSelectedColor: '#fff',
    gridMiniTotalBackground: '#FFFFCC',
    gridTotalBackground: '#fbebd6',
    gridNoneBackground: '#E2E2E2',
    gridHeaderRemarkBackground: '#FFECCC',
    gridHeaderBlueBackground: 'aliceblue',
    gridRemarkBackground: '#FFF6E8',
    gridBorderColor: '#646d79',
    gridHeaderDeleteColumn: '#f5f5f5',
    HissuMarkColor: '#c93328',
    basicGridColor: '#1f7872',
    blueTextColor: '#2196F3',
    separateBorderColor: '1px solid',
    viewTitleBackgroundMain: '#276bc5',
    viewTitleBackground: '#4169E1',
    viewTitleFontColor: 'white',
    viewTitleBackgroundBlue: '#e4effd',
    viewTitleBackgroundBlueDark: '#173f74',
    viewTitleFontColorBlue: '#173f74',
    viewTitleBackgroundGreenDark: '#c7facb',
    viewTitleBackgroundGreen: '#eefeef',
    viewTitleFontColorGreen: '#0f4a13',
    viewTitleBackgroundOrangeDark: '#f9ddb7',
    viewTitleBackgroundOrange: '#fbebd6',
    viewTitleBackgroundYellow: '#fafcdc',
    viewTitleFontColorOrange: '#781e18',
    viewTitleBackgroundGray: '#646d79',
    viewTitleFontColorRed: '#c93328',
    viewTitleBackgroundRed: '#fde8f1',
    viewHosokuBackground: 'lightgoldenrodyellow',
    hissu_Color: '#ce3e47',
    tab_background: '#187b51',
    viewRowBackground: '#d0e2fb',
    viewUnder18Mark: '#197d20',
    fontColorSaturday: '#276bc5',
    fontColorSunday: '#c93328',
    btn_background: "#f0f0f0",



};

const FORMAT = {
    Num: 'n0',
    Ym: 'yyyy/MM',
    Ymd: 'yyyy/MM/dd',
    GYmd: 'gyy/MM/dd', // import '@grapecity/wijmo.cultures/wijmo.culture.ja'; が必要
};
const GRDROWHEIGHT = {
    Header: 20,
    Row: 20,
    RowHigh: 24,
};
const GRD_COL_WIDTH = {
    UserName: 130, // 全角10文字
    Ymd: 80, // yyyy/mm/dd
    Time: 50, // hh:mm
    Tantousya: 70, // 全角６文字
    Naiyou: 310, //25文字幅
}

const JIGYO_KBN_NAME = {
    KIHON: 'Kihonsoudan',
    KEIKAKU: 'Keikakusoudan',
    CHIIKI: 'Chiikisoudan',
};
const TANTOKAIGI_KBN_NAME = {
    KEIKAKU: 'Keikakusoudan',
    CHIIKI: 'Chiikisoudan',
};
const JIGYOKBN = {
    Kihon: {
        val: 0,
        name: '基本情報'
    },
    Taiin: {
        val: 1,
        name: '退院サポート'
    },
    Jiritu: {
        val: 2,
        name: '自立アシスト'
    },
    Renraku: {
        val: 3,
        name: '連絡調整'
    },
}
const KEIKAKUJIGYOKBN = {
    Keikaku: {
        val: 3,
        name: '計画相談'
    },
    Syougaiji: {
        val: 8,
        name: '障害児相談'
    },
}
const CHIIKIJIGYOKBN = {
    Keikaku: {
        val: 6,
        name: '地域移行'
    },
    Syougaiji: {
        val: 7,
        name: '地域定着'
    },
}

//###################
//固定情報追加定数
//###################
const MSG_REKI_CRE = "履歴を作成してください。"; //履歴登録
const MSG_DATA_INS = "データの登録が完了しました。"; //履歴登録
const MSG_DATA_INS_CHK = "入力データを登録しますか？" //データ登録チェック
const MSG_DATA_DEL = "データの削除が完了しました。"; //履歴削除
const MSG_DATA_DEL_CHK = "入力データを削除しますか？" //データ登録チェック
const MSG_REKI_INS = "新規履歴を登録しました。"; //履歴登録
const MSG_REKI_INS_CHK = "履歴を新規登録しますか？"; //履歴登録
const MSG_REKI_UPD_CHK = "履歴を更新しますか？"; //履歴更新
const MSG_REKI_DEL_CHK = "履歴を削除しますか？"; //履歴更新

const MSG_REKI_UPD = "履歴を更新しました。"; //履歴更新
const MSG_REKI_DEL = "履歴の削除しました。"; //履歴削除
const MSG_COPY_CHK = "前回のデータをコピーしますか？"; //前回コピー
const MSG_COPY = "前回コピーが完了しました。"; //前回コピー
const MSG_COPY_ERR = "前回の履歴がありません。"; //前回コピー
const MSG_INS_CHK = "登録されていない項目があります。登録しますか？"; //登録チェック

const MSG_SORT_CHK = "表示順を入力してください。"; //登録チェック

const COLORPALETTE = [{
        COLOR: 'white',
        CODE: '#ffffff'
    },
    {
        COLOR: 'black',
        CODE: '#333333'
    },
    {
        COLOR: 'gray3',
        CODE: '#cfd3d9'
    },
    {
        COLOR: 'blue1',
        CODE: '#e4effd'
    },
    {
        COLOR: 'blue5',
        CODE: '#86b6f5'
    },
    {
        COLOR: 'blue8',
        CODE: '#276bc5'
    },
    {
        COLOR: 'violet1',
        CODE: '#f5e9fd'
    },
    {
        COLOR: 'violet5',
        CODE: '#d19ff7'
    },
    {
        COLOR: 'violet8',
        CODE: '#9a2fec'
    },
    {
        COLOR: 'red1',
        CODE: '#fde9e8'
    },
    {
        COLOR: 'red8',
        CODE: '#c93328'
    },
    {
        COLOR: 'red9',
        CODE: '#781e18'
    },
    {
        COLOR: 'orenge1',
        CODE: '#fbebd6'
    },
    {
        COLOR: 'orenge5',
        CODE: '#efa341'
    },
    {
        COLOR: 'orenge8',
        CODE: '#94611d'
    },
    {
        COLOR: 'yellow1',
        CODE: '#edf588'
    },
    {
        COLOR: 'yellow5',
        CODE: '#b1bb25'
    },
    {
        COLOR: 'yellow8',
        CODE: '#6b7116'
    },
    {
        COLOR: 'green1',
        CODE: '#c7facb'
    },
    {
        COLOR: 'green5',
        CODE: '#29ce34'
    },
    {
        COLOR: 'green8',
        CODE: '#197d20'
    },
    {
        COLOR: 'cyan1',
        CODE: '#c5f6fa'
    },
    {
        COLOR: 'cyan5',
        CODE: '#29c5d0'
    },
    {
        COLOR: 'cyan8',
        CODE: '#19777e'
    },
];

export default {
    COLOR,
    COLORPALETTE,
    FORMAT,
    GRDROWHEIGHT,
    GRD_COL_WIDTH,
    JIGYOKBN,
    KEIKAKUJIGYOKBN,
    CHIIKIJIGYOKBN,
    JIGYO_KBN_NAME,
    TANTOKAIGI_KBN_NAME,

    //###################
    //固定情報追加定数
    //###################
    MSG_REKI_CRE,
    MSG_DATA_INS,
    MSG_DATA_INS_CHK,
    MSG_DATA_DEL,
    MSG_DATA_DEL_CHK,
    MSG_REKI_INS,
    MSG_REKI_UPD,
    MSG_REKI_DEL,
    MSG_COPY_CHK,
    MSG_COPY,
    MSG_COPY_ERR,
    MSG_REKI_INS_CHK,
    MSG_REKI_UPD_CHK,
    MSG_REKI_DEL_CHK,
    MSG_INS_CHK,
    MSG_SORT_CHK
}