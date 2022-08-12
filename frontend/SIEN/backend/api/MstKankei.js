const Service = require('../MstKankei/Service')
const service = new Service();
const config = require('./ApiRun');

export async function mstKankei(needClr) {
  // 接続確認用URL
  var url = config.getDomain() + '/sodan/v1/mst/kankei?pJigyoid=43';
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
        nikeiflg: 0,
        honninflg: 0
      });
    }
    result.forEach(function (element) {
      data.push({
        id: element.sdnkanid,
        code: element.sdnkancd,
        codeD: String(element.sdnkancd).padStart(3, '0'),
        name: element.sdnkannm,
        ryaku: element.sdnkanrk,
        nikeiflg: element.nikeiflg,
        honninflg: element.honninflg
      });
    });
    return data;
  });
}

export function mstKankeiDefault() {
  return {
    id: 0,
    code: '',
    name: '',
    nameD: '',
    codeD: '',
    ryaku: '',
    nikeiflg: 0,
    honninflg: 0
  };
}