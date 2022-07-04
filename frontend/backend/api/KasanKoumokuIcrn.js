const Service = require('../KasanKoumokuIcrn/Service')
const service = new Service();
const config = require('./ApiRun');
export async function kasanKoumokuIcrn(kasanList) {
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
      obj['name'          ] = icrn[i].name;
      obj['kana'          ] = icrn[i].kana;
      obj['useymd'      ] = icrn[i].useymd;
      obj['nyuinymd'          ] = icrn[i].nyuinymd;
      obj['gaihakuymd'     ] = icrn[i].gaihakuymd.toLocaleString();
      obj['kbn'    ] = icrn[i].kbn.toLocaleString();
      obj['isNyusyo'    ] = icrn[i].isNyusyo;
      obj['isTaisyo'] = icrn[i].isTaisyo;
      // 動的に加算のプロパティを作成
      for (let kasan = 0; kasan < kasanList.length; kasan++) {
        obj[kasanList[kasan].kcode] = icrn[i][kasanList[kasan].kcode];
      }
      icrn_inf.push(obj);
    }
    return icrn_inf;
  });
}