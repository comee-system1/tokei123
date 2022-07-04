const Service = require('../JyukyuIcrn/Service')
const service = new Service();
const config = require('./ApiRun');
export async function jyukyuIcrn() {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);
  return await service.getData().then(result => {
    let icrn_inf = [];
    let icrn = result;
    for (let i = 0; i < icrn.length; i++) {
      let obj = {};
      obj['id'            ] = icrn[i].id;
      obj['err'           ] = icrn[i].err;
      obj['no'            ] = icrn[i].no;
      obj['nobk'          ] = icrn[i].nobk;
      obj['name'          ] = icrn[i].name;
      obj['kana'          ] = icrn[i].kana;
      obj['koufuymd'      ] = icrn[i].koufuymd;
      obj['engo'          ] = icrn[i].engo;
      obj['jyukyukbn'     ] = icrn[i].jyukyukbn.toLocaleString();
      obj['jyukyuname'    ] = icrn[i].jyukyuname.toLocaleString();
      obj['syougaisyu'    ] = icrn[i].syougaisyu;
      obj['syougaisienkbn'] = icrn[i].syougaisienkbn;
      obj['futanjyougen'  ] = icrn[i].futanjyougen;
      obj['jyougenumu'    ] = icrn[i].jyougenumu;
      obj['jyougenumuval' ] = icrn[i].jyougenumuval;
      obj['jyougenkanri'  ] = icrn[i].jyougenkanri;
      obj['syokujiteikyo' ] = icrn[i].syokujiteikyo;
      obj['tokubetukyufu' ] = icrn[i].tokubetukyufu;
      obj['syusei'        ] = icrn[i].syusei;
      obj['nyushoymd'     ] = icrn[i].nyushoymd;
      obj['taisyoymd'     ] = icrn[i].taisyoymd;
      obj['isnyusho'      ] = icrn[i].isnyusho;
      obj['istaisyo'      ] = icrn[i].istaisyo;
      icrn_inf.push(obj);
    }
    return icrn_inf;
  });
}