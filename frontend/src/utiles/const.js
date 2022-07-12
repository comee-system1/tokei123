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
    gridTotalBackground: '#CEFCFC',
    gridNoneBackground: '#E2E2E2',
    gridHeaderRemarkBackground: '#FFECCC',
    gridRemarkBackground: '#FFF6E8',
    HissuMarkColor: '#ce3e47',
    basicGridColor: '#1f7872',
    blueTextColor: '#2196F3',
    separateBorderColor: '1px solid #000',

};

const FORMAT = {
    Num: 'n0',
    Ymd: 'yyyy/MM/dd',
    GYmd: 'gyy/MM/dd',// import '@grapecity/wijmo.cultures/wijmo.culture.ja'; が必要
};
const GRDROWHEIGHT = {
    Header: 20,
    Row: 20,
};
const GRD_COL_WIDTH = {
    UserName : 130, // 全角10文字
    Ymd:80,         // yyyy/mm/dd
    Time:50,        // hh:mm
    Tantousya:70,   // 全角６文字
    Naiyou:310,     //25文字幅
}

export default {
    COLOR,
    FORMAT,
    GRDROWHEIGHT,
    GRD_COL_WIDTH
}