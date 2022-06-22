const Service = require('../ReceptTajyougen/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')

export async function ReceptTajyougen() {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);

  return await service.getData().then(result => {
    let returns = [];

    for (let i = 0; i < result.length; i++) {
      returns.push({
        sityoid: result[i].seikyu_inf.sityoid,
        riid: result[i].seikyu_inf.riid,
        hannei: result[i].seikyu_inf.hannei,
        hanneikey: result[i].seikyu_inf.hanneikey,
        sityono: result[i].seikyu_inf.sityo_inf.sityono,
        sityonm: result[i].seikyu_inf.sityo_inf.sityonm,
        jyukyuno: result[i].seikyu_inf.jyukyu_inf.jyukyuno,
        riyocode: result[i].seikyu_inf.kihon_inf.riyocode,
        names: result[i].seikyu_inf.kihon_inf.names,
        kana: result[i].seikyu_inf.kihon_inf.kana,
        jigyo_jigyokbn: result[i].seikyu_inf.jigyo_inf.jigyokbn,
        jigyo_jigyono: result[i].seikyu_inf.jigyo_inf.jigyono,
        jigyo_jigyonm: result[i].seikyu_inf.jigyo_inf.jigyonm,
        fjyogen: result[i].seikyu_inf.jyukyu_inf.fjyogen,
        jyougengakukanrikeisan: '',
        jknrcalc: '',
        cnt: result[i].seikyu_inf.cnt,
        jigyokbn: result[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyokbn,
        jigyono: result[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyono,
        jigyonm: result[i].seikyu_inf.jyukyu_inf.jkjigyo_inf.jigyonm,
        svcnm: result[i].seikyu_inf.svcnm,
        sogaku: result[i].seikyu_inf.sogaku,
        riyogaku: result[i].seikyu_inf.riyogaku,
        jknr_riyogaku: result[i].seikyu_inf.jkanri_inf.jknr_riyogaku,
        jknr_rslt: result[i].seikyu_inf.jkanri_inf.jknr_rslt,
        print: '',
        complateFlag: false,
        nyukyo: 1,
        taikyo: 0,

        blueFlag: i % 4 == 3
      });
    }

    return returns;

  });
}