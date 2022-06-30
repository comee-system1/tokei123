const Service = require('../KyuhuMeisaiIcrn/Service')
const service = new Service();
const config = require('./ApiRun');
export async function kyuhuMeisaiIcrn(isSeikyugaku) {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);
  return await service.getData(isSeikyugaku).then(result => {
    let icrn_inf = [];
    if(isSeikyugaku){
        let icrn = result;
        for (let i = 0; i < icrn.length; i++) {
            let obj = {};
            obj['id'            ] = icrn[i].id;
            obj['kakuteiflg'           ] = icrn[i].kakuteiflg;
            obj['kakutei'            ] = icrn[i].kakutei;
            obj['no'          ] = icrn[i].no;
            obj['nobk'          ] = icrn[i].nobk;
            obj['kana'          ] = icrn[i].kana;
            obj['code'      ] = icrn[i].code;
            obj['dispname'          ] = icrn[i].dispname;
            obj['name'     ] = icrn[i].name.toLocaleString();
            obj['futan'    ] = icrn[i].futan.toLocaleString();
            obj['riyoucnt'    ] = icrn[i].riyoucnt;
            obj['nyuincnt'] = icrn[i].nyuincnt;
            obj['svccode'  ] = icrn[i].svccode;
            obj['svcname'    ] = icrn[i].svcname;
            obj['riyounissu' ] = icrn[i].riyounissu;
            obj['kyufutani'  ] = icrn[i].kyufutani;
            obj['itiwarisoutougaku' ] = icrn[i].itiwarisoutougaku;
            obj['jyougengakuchousei' ] = icrn[i].jyougengakuchousei;
            obj['jigyousyagenmen'        ] = icrn[i].jigyousyagenmen;
            obj['genmenriyousya'     ] = icrn[i].genmenriyousya;
            obj['chouseiriyousya'     ] = icrn[i].chouseiriyousya;
            obj['jyougenkanrifutangaku'      ] = icrn[i].jyougenkanrifutangaku;
            obj['ketteiriyoufutangaku'      ] = icrn[i].ketteiriyoufutangaku;
            obj['kyufuhi'      ] = icrn[i].kyufuhi;
            obj['jititaijyosei'      ] = icrn[i].jititaijyosei;
            obj['kyufuhiseikyugaku'      ] = icrn[i].kyufuhiseikyugaku;
            obj['jippisaneigaku'      ] = icrn[i].jippisaneigaku;
            obj['usersortorder'      ] = icrn[i].usersortorder;
            obj['istotalrow'      ] = icrn[i].istotalrow;
            icrn_inf.push(obj);
        }
    } else {
        let icrn = result;
        for (let i = 0; i < icrn.length; i++) {
            let obj = {};
            obj['id'            ] = icrn[i].id;
            obj['kakuteiflg'           ] = icrn[i].kakuteiflg;
            obj['kakutei'            ] = icrn[i].kakutei;
            obj['name'          ] = icrn[i].name;
            obj['kana'          ] = icrn[i].kana;
            obj['code'          ] = icrn[i].code;
            obj['dispsvc'      ] = icrn[i].dispsvc;
            obj['svc'          ] = icrn[i].svc;
            obj['symd'     ] = icrn[i].symd.toLocaleString();
            obj['eymd'    ] = icrn[i].eymd.toLocaleString();
            obj['dsymd'    ] = icrn[i].dsymd;
            obj['deymd'] = icrn[i].deymd;
            obj['riyounissuu'  ] = icrn[i].riyounissuu;
            obj['nyuinnissu'    ] = icrn[i].nyuinnissu;
            obj['svcnaiyou' ] = icrn[i].svcnaiyou;
            obj['no'  ] = icrn[i].no;
            obj['svccode' ] = icrn[i].svccode;
            obj['tani' ] = icrn[i].tani;
            obj['kaisu'        ] = icrn[i].kaisu;
            obj['svctani'     ] = icrn[i].svctani;
            obj['tekiyou'     ] = icrn[i].tekiyou;
            icrn_inf.push(obj);
        }
    }
    return icrn_inf;
  });
}