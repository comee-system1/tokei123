const Service = require('../ReceptList/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')

export async function ReceptList() {
    // 接続確認用URL
    var url = config.getDomain()+'/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        // 利用者情報一覧
        let returns = [];
        
        // let riyo_inf = [];
        // let riyo = result.riyo_inf;
        // for(let i = 0 ; i < riyo.length; i++){
        //    riyo_inf[i] = [];
        //    riyo_inf[i][ 'riid'          ] = riyo[i].riyo_inf.riid;
        //    riyo_inf[i][ 'riyocode'      ] = riyo[i].riyo_inf.riyocode;
        //    riyo_inf[i][ 'names'         ] = riyo[i].riyo_inf.names;
        //    riyo_inf[i][ 'kana'          ] = riyo[i].riyo_inf.kana;
        //    riyo_inf[i][ 'jyukyuno'      ] = riyo[i].riyo_inf.jyukyu_inf.jyukyuno;
        //    riyo_inf[i][ 'syogaikbn'     ] = riyo[i].riyo_inf.jyukyu_inf.syogaikbn;
        //    riyo_inf[i][ 'syogaikbn_old' ] = riyo[i].riyo_inf.jyukyu_inf.syogaikbn_old;
        //    riyo_inf[i][ 'symd'          ] = riyo[i].riyo_inf.jyukyu_inf.serreki_inf.symd;
        //    riyo_inf[i][ 'symd_view'     ] = (riyo[i].riyo_inf.jyukyu_inf.serreki_inf.symd)?moment(riyo[i].riyo_inf.jyukyu_inf.serreki_inf.symd).format('YYYY/MM/DD'):'';
        //    riyo_inf[i][ 'eymd'          ] = riyo[i].riyo_inf.jyukyu_inf.serreki_inf.eymd;
        //    riyo_inf[i][ 'eymd_view'     ] = (riyo[i].riyo_inf.jyukyu_inf.serreki_inf.eymd)?moment(riyo[i].riyo_inf.jyukyu_inf.serreki_inf.eymd).format('YYYY/MM/DD'):'';
        //    riyo_inf[i][ 'nissu1'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu1;
        //    riyo_inf[i][ 'nissu2'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu2;
        //    riyo_inf[i][ 'nissu3'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu3;
        //    riyo_inf[i][ 'nissu4'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu4;
        //    riyo_inf[i][ 'nissu5'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu5;
        //    riyo_inf[i][ 'nissu6'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu6;
        //    riyo_inf[i][ 'nissu7'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu7;
        //    riyo_inf[i][ 'nissu8'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu8;
        //    riyo_inf[i][ 'nissu9'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu9;
        //    riyo_inf[i][ 'nissu10'       ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu10;
        //    riyo_inf[i][ 'nissu11'       ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu11;
        //    riyo_inf[i][ 'nissu12'       ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.nissu12;
        //    riyo_inf[i][ 'gokei'         ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.gokei;
        //    riyo_inf[i][ 'tukisu'        ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.tukisu;
        //    riyo_inf[i][ 'avg'           ] = riyo[i].riyo_inf.jyukyu_inf.riyonissu_inf.avg;
        // }

        // let nengetu_inf = result.nengetu_inf;
        // let gokei_inf = result.gokei_inf;
        // let kaisyo_inf = result.kaisyo_inf;

        // let returns = {
        //     riyo_inf:riyo_inf,
        //     nengetu_inf:nengetu_inf,
        //     gokei_inf:gokei_inf,
        //     kaisyo_inf:kaisyo_inf
        //   };

        return returns;
    });
}