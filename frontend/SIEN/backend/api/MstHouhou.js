const Service = require('../MstHouhou/Service')
const service = new Service();
const config = require('./ApiRun');

export async function mstHouhou(needClr) {
  // 接続確認用URL
  var url = config.getDomain() + '/sodan/v1/mst/houhou?pJigyoid=43';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);

  return await service.getData().then(result => {
    // 方法マスタ
    let data = [];
    if (needClr) {
      data.push({
        id: 0,
        code: '',
        name: 'クリア',
        nameD: '',
        codeD: '',
        ryaku: '',
        nikeiflg: '',
        ryaku2: '',
        kigo: '',
        scaflg: ''
      });
    }
    result.forEach(function (element) {
      data.push({
        id: element.sdnhouid,
        code: element.sdnhoucd,
        codeD: String(element.sdnhoucd).padStart(3, '0'),
        name: element.sdnhounm,
        ryaku: element.sdnhourk,
        nikeiflg: element.nikeiflg,
        ryaku2: element.sdnhourk2,
        kigo: element.sdnhoukigo,
        scaflg: element.scaflg
      });
    });
    return data;
  });
}

export function mstHouhouDefault() {
  return {
    id: 0,
    code: '',
    name: '',
    nameD: '',
    codeD: '',
    ryaku: '',
    nikeiflg: '',
    ryaku2: '',
    kigo: '',
    scaflg: ''
  };
}