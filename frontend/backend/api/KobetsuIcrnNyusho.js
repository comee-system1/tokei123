const Service = require('../KobetsuIcrnNyusho/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function KobetsuIcrnNyusho() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';

    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        // 利用者情報一覧
        let returns = [];
        let riyo_inf = [];
        riyo_inf.push({
                riid: 1,
                riyocode: 10000,
                names: '東経 太郎0',
                kana: 'タロウトウケイ',
                jyukyuno: 'A0001',
                keikaku: 1,
                kmkkbn1: 1,
                kmkkbn2: 1, // 利用日
                kmkkbn2_text: '利用日',
            }, {
                riid: 1,
                riyocode: 10000,
                names: '東経 太郎0',
                kana: 'タロウトウケイ',
                jyukyuno: 'A0001',
                keikaku: 1,
                kmkkbn1: 1,
                kmkkbn2: 2, // 入院日・外泊日
                kmkkbn2: '入院日・退院日',
            },

        );
        returns = {
            status: 'idle',
            riyo_inf: riyo_inf
        };
        return returns;
    });
}