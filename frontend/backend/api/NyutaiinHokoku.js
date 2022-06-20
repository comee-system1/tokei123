const Service = require('../NyutaiinHokoku/Service')
const service = new Service();
const config = require('./config');
export async function nyutaiinHokoku() {
    // 接続確認用URL
    var url = config.getDomain()+'/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        return result;
    });
}