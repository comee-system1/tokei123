const Service = require('../MstKsnKmk/Service')
const service = new Service();
const config = require('./ApiRun');
export async function mstKsnKmk(addAll) {
  // 接続確認用URL
  var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);
  return await service.getData().then(result => {
    let icrn_inf = [];
    let icrn = result;
    if(addAll){
        icrn_inf.push({bunkbn:0,
            bunnm:'指定なし',
            kcode:'0',
            name:'指定なし'});
    }
    for (let i = 0; i < icrn.length; i++) {
      let obj = {};
      obj['bunkbn'            ] = icrn[i].bunkbn;
      obj['bunnm'           ] = icrn[i].bunnm;
      obj['kcode'            ] = icrn[i].kcode;
      obj['name'          ] = icrn[i].name;

      icrn_inf.push(obj);
    }
    return icrn_inf;
  });
}