const Service = require('../Riyousya/Service')
const service = new Service();
const config = require('./ApiRun');

export async function Riyousya(symd, eymd) {
  // 接続確認用URL
  var url = config.getDomain() + '/syogai/daityo/v1/riyosya/riyosya?getKbn=0&jkbn=0&sdnflg=0&symd=' + symd + '&eymd=' + eymd + '?entpriid=43';
  var uniqid = 1;
  config.setURL(url);
  config.setUniqID(uniqid);

  return await service.getData().then(result => {
    // 利用者
    let data = [];
    result.forEach(function (element) {
      data.push({
        riid: element.riid,
        riyocode: element.riyocode,
        riyocodeD: String(element.riyocode).padStart(7, '0'),
        names: element.names,
        kana: element.kana,
        jyukyuno: element.jyukyuno,
        jyukyunoD: String(element.jyukyuno).padStart(10, '0'),
      });
    });
    return data;
  });
}