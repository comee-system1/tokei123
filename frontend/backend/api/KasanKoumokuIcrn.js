const Service = require('../KasanKoumokuIcrn/Service')
const service = new Service();
const config = require('./ApiRun');
export async function kasanKoumokuIcrn() {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);
  return await service.getData().then(result => {
    let icrn_inf = [];
    let icrn = result;
    let kasanList=[
        { val: 0, kbn: 0, name: '指定なし' },
        { val: 1, kbn: 1, name: '夜間職員配置体制加算' },
        { val: 2, kbn: 1, name: '重度障害者支援加算Ⅰ' },
        { val: 3, kbn: 1, name: '夜間看護体制加算' },
        { val: 4, kbn: 1, name: '視覚・聴覚等支援体制加算' },
        { val: 5, kbn: 1, name: '地域生活移行個別支援加算' },
        { val: 6, kbn: 1, name: '口腔衛生管理体制加算' },
        { val: 7, kbn: 1, name: '処遇改善加算Ⅰ' },
        { val: 8, kbn: 1, name: '処遇改善特別加算' },
        { val: 9, kbn: 1, name: '特定処遇改善加算' },
        { val: 10, kbn: 2, name: '入所時特別支援加算' },
        { val: 11, kbn: 2, name: '入院・外泊時加算Ⅰ' },
        { val: 12, kbn: 2, name: '入院・外泊時加算Ⅱ' },
        { val: 13, kbn: 2, name: '経口維持加算Ⅰ' },
        { val: 14, kbn: 2, name: '口腔衛生管理加算' },
        { val: 15, kbn: 2, name: '栄養マネジメント加算' },
      ];

      console.log(icrn[0]);
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
        obj[kasanList[kasan].val] = icrn[i][kasanList[kasan].val];
      }
      icrn_inf.push(obj);
    }
    return icrn_inf;
  });
}