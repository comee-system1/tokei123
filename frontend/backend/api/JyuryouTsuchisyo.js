const Service = require('../JyuryouTsuchisyo/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function jyuryouTsuchisyo() {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);
  return await service.getData().then(result => {
    let icrn_inf = [];
    let icrn = result.icrn_inf;
    for (let i = 0; i < icrn.length; i++) {
      icrn_inf[i] = [];
      icrn_inf[i]['jyukyuno'  ] = icrn[i].icrn_inf.jyukyuno;
      icrn_inf[i]['riid'      ] = icrn[i].icrn_inf.riid;
      icrn_inf[i]['riyocode'  ] = icrn[i].icrn_inf.riyocode;
      icrn_inf[i]['rnames'    ] = icrn[i].icrn_inf.rnames;
      icrn_inf[i]['rkana'     ] = icrn[i].icrn_inf.rkana;
      icrn_inf[i]['rsex'      ] = icrn[i].icrn_inf.rsex;
      icrn_inf[i]['sityoid'   ] = icrn[i].icrn_inf.sityoid;
      icrn_inf[i]['sityoryaku'] = icrn[i].icrn_inf.sityoryaku;
      icrn_inf[i]['gsogaku'   ] = icrn[i].icrn_inf.gsogaku.toLocaleString();
      icrn_inf[i]['gfutan'    ] = icrn[i].icrn_inf.gfutan.toLocaleString();
      icrn_inf[i]['gtokubetu' ] = icrn[i].icrn_inf.gtokubetu;
      icrn_inf[i]['dairi'     ] = icrn[i].icrn_inf.dairi;
      icrn_inf[i]['jyuymd'    ] = icrn[i].icrn_inf.jyuymd;
      icrn_inf[i]['prtymd'    ] = icrn[i].icrn_inf.prtymd;
      icrn_inf[i]['hokbn'     ] = icrn[i].icrn_inf.uchiwake_inf.hokbn;
      icrn_inf[i]['svcsyucode'] = icrn[i].icrn_inf.uchiwake_inf.svcsyucode;
      icrn_inf[i]['svcryaku'  ] = icrn[i].icrn_inf.uchiwake_inf.svcryaku
      icrn_inf[i]['sogaku'    ] = icrn[i].icrn_inf.uchiwake_inf.sogaku
      icrn_inf[i]['riyogaku'  ] = icrn[i].icrn_inf.uchiwake_inf.riyogaku;
      icrn_inf[i]['jippigaku' ] = icrn[i].icrn_inf.uchiwake_inf.jippigaku;
      icrn_inf[i]['kyufugak'  ] = icrn[i].icrn_inf.uchiwake_inf.kyufugak;
      // 入退去フラグ仮作成
      if (i % 2 === 0) {
        icrn_inf[i]['nyukyo'    ] = 1;
        icrn_inf[i]['taikyo'    ] = 0;
      } else {
        icrn_inf[i]['nyukyo'    ] = 0;
        icrn_inf[i]['taikyo'    ] = 1;
      }
    }
    let returns = {
        icrn_inf: icrn_inf,
    };
    return returns;
  });
}