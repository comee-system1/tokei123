const Service = require('../UketukeIcrn/Service')
const service = new Service();
const config = require('./ApiRun');

export async function uketukeIcrn(targetymd, targeteymd, intcode) {
    // 接続確認用URL
    if (intcode > 0) {
        var url = config.getDomain() + '/sodan/v1/uktk/' + intcode + '?pJigyoid=43&pSymd=' + targetymd + '&pEymd=' + targeteymd + '&pLimit=100&pOffset=0&Dspkbn=0';
    } else {
        var url = config.getDomain() + '/sodan/v1/uktk?pJigyoid=43&pSymd=' + targetymd + '&pEymd=' + targeteymd + '&pLimit=100&pOffset=0&Dspkbn=0';
    }
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        // 受付一覧
        let data = [];
        result.forEach(function (element) {
            const year = parseInt(element.ymd.substring(0, 4));
            const month = parseInt(element.ymd.substring(4, 6));
            const day = parseInt(element.ymd.substring(6, 8));
            const d = new Date(year, month - 1, day, 0, 0);

            let syokaiflg = 0;
            let inputkbn = 0;
            if (element.sdntioflg == 1) {
                syokaiflg = 0;
            } else if (element.sdntioflg == 2) {
                syokaiflg = 1;
            } else if (element.sdntioflg == 3) {
                inputkbn = 3;
            }
            data.push({
                entpriid: element.entpriid,
                intcode: element.intcode,
                rcnt: element.rcnt,
                taiouYmd: d,
                taiouYmdf: element.ymd,
                sTime: element.jikan,
                name: element.rname,
                cskbn: element.cskbn,
                cskmkid: element.cskmkid,
                cskmknm: element.cskmknm,
                jigyouKbn: element.sykkbn,
                jigyouKbnD: element.sykkbnkigo,
                syokai: '○',
                inputkbn: inputkbn,
                syokaiflg: syokaiflg,
                kasan: element.kasan,
                kasanD: element.kasan > 0 ? '○' : '',
                kasanName: element.kasanrk,
                kikanmei: element.kikan,
                taiousya2: element.tanto,
                sienHouhou: element.sdnhourk,
                sdnhouid: element.sdnhouid,
                sdnhourk: element.sdnhourk,
                sdnkanid: element.sdnkanid,
                sdnkanrk: element.sdnkanrk,
                kankeiSoudansya: '(' + element.sdnkanrk + ')' + element.sdnnam,
                sdnnam: element.sdnnam,
                soudanKoumoku: element.daicskmkrk,
                title: '（' + element.cskmknm + '）',
                naiyo: element.naiyo,
                syoyo: element.syoyo,
                rank: element.rank,
                ranknm: element.ranknm,
                kan: element.kan,
                kanD: element.kan > 0 ? '○' : '',
                peer: element.peer,

                tanntouid: 1,
                taiousya: element.sryaku,

            });
        });
        return data;
    });
}