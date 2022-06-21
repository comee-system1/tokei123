const Service = require('../NyutaiinHokoku/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function nyutaiinHokoku() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let riyo_inf = [];
        let riyo = result.riyo_inf;
        for (let i = 0; i < riyo.length; i++) {
            riyo_inf[i] = [];
            riyo_inf[i]['riid'      ] = riyo[i].riyo_inf.riid;
            riyo_inf[i]['riyocode'  ] = riyo[i].riyo_inf.riyocode;
            riyo_inf[i]['names'     ] = riyo[i].riyo_inf.names;
            riyo_inf[i]['kana'      ] = riyo[i].riyo_inf.kana;
            riyo_inf[i]['jyukyuno'  ] = riyo[i].riyo_inf.jyukyu_inf.jyukyuno;
            riyo_inf[i]['kbn'       ] = riyo[i].riyo_inf.nyutaiin_inf.kbn;
            riyo_inf[i]['nyutaikbn' ] = riyo[i].riyo_inf.nyutaiin_inf.nyutaikbn;
            riyo_inf[i]['ngsymd'    ] = riyo[i].riyo_inf.nyutaiin_inf.ngsymd;
            riyo_inf[i]['ngeymd'    ] = riyo[i].riyo_inf.nyutaiin_inf.ngeymd;
            riyo_inf[i]['byoincode' ] = riyo[i].riyo_inf.nyutaiin_inf.byoincode;
            riyo_inf[i]['gaihaku'   ] = riyo[i].riyo_inf.nyutaiin_inf.gaihaku;
            riyo_inf[i]['ngeymd'    ] = riyo[i].riyo_inf.nyutaiin_inf.ngeymd;
            riyo_inf[i]['byoinname' ] = riyo[i].riyo_inf.byoin_inf.byoinname;
            riyo_inf[i]['nyuutaigai'] = riyo[i].riyo_inf.dsp_inf.nyuutaigai;
            riyo_inf[i]['symddsp'   ] = (riyo[i].riyo_inf.dsp_inf.symddsp) ? moment(riyo[i].riyo_inf.dsp_inf.symddsp).format('YYYY/MM/DD') : '';
            riyo_inf[i]['eymddsp'   ] = (riyo[i].riyo_inf.dsp_inf.eymddsp) ? moment(riyo[i].riyo_inf.dsp_inf.eymddsp).format('YYYY/MM/DD') : '';
            riyo_inf[i]['ngname'    ] = riyo[i].riyo_inf.dsp_inf.ngname;
            riyo_inf[i]['bikoudsp'  ] = riyo[i].riyo_inf.dsp_inf.bikoudsp;
        }
        let returns = {
            riyo_inf: riyo_inf,
        };
        return returns;
    });
}