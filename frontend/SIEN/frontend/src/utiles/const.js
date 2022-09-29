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
    gridHoverBackground: '#ccffcc',
    gridSelectedBackground: '#80adbf',
    gridSelectedColor: '#fff',
    gridMiniTotalBackground: '#FFFFCC',
    gridTotalBackground: '#FFFACD',
    gridNoneBackground: '#E2E2E2',
    gridHeaderRemarkBackground: '#FFECCC',
    gridHeaderBlueBackground: 'aliceblue',
    gridRemarkBackground: '#FFF6E8',
    HissuMarkColor: '#ce3e47',
    basicGridColor: '#1f7872',
    blueTextColor: '#2196F3',
    separateBorderColor: '1px solid',
    viewTitleBackground: '#4169E1',
    viewTitleFontColor: 'white',
    viewTitleBackgroundBlue: 'aliceblue',
    viewTitleFontColorBlue: 'midnightblue',
    viewTitleBackgroundGreenDark: '#CBFFD3',
    viewTitleBackgroundGreen: '#E6FFE9',
    viewTitleFontColorGreen: 'darkgreen',
    viewTitleBackgroundOrangeDark: '#FFE4C4',
    viewTitleBackgroundOrange: '#FFEFD5',
    viewTitleFontColorOrange: 'saddlebrown',
    viewHosokuBackground: 'lightgoldenrodyellow',
};

const FORMAT = {
    Num: 'n0',
    Ym: 'yyyy/MM',
    Ymd: 'yyyy/MM/dd',
    GYmd: 'gyy/MM/dd',
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
        val: 0,
        name: '計画相談'
    },
    Syougaiji: {
        val: 1,
        name: '障害児相談'
    },
}
const CHIIKIJIGYOKBN = {
    Keikaku: {
        val: 0,
        name: '地域移行'
    },
    Syougaiji: {
        val: 1,
        name: '地域定着'
    },
}

export default {
    COLOR,
    FORMAT,
    GRDROWHEIGHT,
    GRD_COL_WIDTH,
    JIGYOKBN,
    KEIKAKUJIGYOKBN,
    CHIIKIJIGYOKBN,
}