const Service = require('../MstSodantaiou/Service')
const service = new Service();
const config = require('./ApiRun');

export async function mstSodantaiou(needClr) {
  // 接続確認用URL
  var url = config.getDomain() + '/sodan/v1/mst/sodantaiou?pJigyoid=43';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);

  return await service.getData().then(result => {
    // 方法マスタ
    let data = [];
    if (needClr) {
      data.push({
        daicskmkid: 0,
        daicode: '',
        dainames: 'クリア',
        dairyaku: '',
        daicskbn: '',
        daicolor: '',
        daisyukflg: '',
        tyucskmkid: 0,
        tyucode: '',
        tyunames: '',
        tyuryaku: '',
        tyucolor: '',
        tyusyukflg: '',
      });
    }
    result.forEach(function (element) {
      element.tyu.forEach(function (element2) {
        data.push({
          daicskmkid: element.cskmkid,
          daicode: String(element.code).padStart(3, '0'),
          dainames: element.names,
          dairyaku: element.ryaku,
          daicskbn: element.cskbn,
          daicolor: element.color,
          daisyukflg: element.syukflg,
          tyucskmkid: element2.cskmkid,
          tyucode: String(element2.code).padStart(3, '0'),
          tyunames: element2.names,
          tyuryaku: element2.ryaku,
          tyucolor: element2.color,
          tyusyukflg: element2.syukflg,
        });
      });
    });
    return data;
  });
}

export function mstSodantaiouDefault() {
  return {
    daicskmkid: 0,
    daicode: '',
    dainames: '',
    dairyaku: '',
    daicskbn: '',
    daicolor: '',
    daisyukflg: '',
    tyucskmkid: 0,
    tyucode: '',
    tyunames: '',
    tyuryaku: '',
    tyucolor: '',
    tyusyukflg: '',
  };
}