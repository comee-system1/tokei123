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
    viewTitleBackgroundGreenDark: '#97f69e',
    viewTitleBackgroundGreen: '#eefeef',
    viewTitleFontColorGreen: '#0f4a13',
    viewTitleBackgroundOrangeDark: '#f9ddb7',
    viewTitleBackgroundOrange: '#fbebd6',
    viewTitleFontColorOrange: '#781e18',
    viewTitleBackgroundGray: '#646d79',
    viewHosokuBackground: 'lightgoldenrodyellow',
    hissu_Color: '#ce3e47',
    tab_background: '#187b51',
    viewRowBackground: '#d0e2fb',
    viewUnder18Mark: '#197d20',
    fontColorSaturday: '#276bc5',
    fontColorSunday: '#c93328',
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

const JIGYO_KBN_NAME = {
    KIHON: 'Kihonsoudan',
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
    JIGYO_KBN_NAME
}