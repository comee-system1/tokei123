// @ts-check
const Service = require('../../SIENP/KeikakuListsView/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const dayjs = require('dayjs');
exports.connected = async function (param) {
    // 同意(サービス等利用計画案)のフォーマット
    const doui_an = ['□', '☑'];
    // 提出用のフォーマット
    const teisyutu = ['□', '☑'];
    // 支給決定用のフォーマット
    const sikyukettei = ['□', '☑'];

    const sign_array = [null, '●'];
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan/view?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    return await service.getData(apiRun).then(result => {
        let array = [];
        const now = dayjs().format('YYYYMMDD');
        for (let i = 0; i < result.length; i++) {
            let obj = {}
            Object.keys(result[i]).forEach(function (key) {
                obj[key] = result[i][key];
                if (key == "rcode") {
                    obj["riyocodeD"] = String(result[i][key]).padStart(7, '0');
                }
                if (key == "birth") {
                    obj["birthD"] = dayjs(result[i].birth).format('M');
                }
                if (key == "moniKbnName" && obj[key].length == 0) {
                    obj[key] = null;
                }

                if (key == "anTaishoYm") {
                    obj["yotei"] = (dayjs(result[i].anTaishoYm, 'YYYYMM').isValid()) ? dayjs(result[i].anTaishoYm).format('YYYY/MM') : null;
                }
                if (key == "keikakuanYmd") {
                    obj["sakuseibi_an"] = (dayjs(result[i].keikakuanYmd, 'YYYYMM').isValid()) ? dayjs(result[i].keikakuanYmd).format('YYYY/MM/DD') : null;
                }
                if (key == "keikakuanChk") {
                    obj["keikakuan"] = sign_array[result[i].keikakuanChk];
                }
                if (key == "anWeekChk") {
                    obj["keikakusyukan"] = sign_array[result[i].anWeekChk];
                }
                if (key == "kihonChk") {
                    obj["kihonjyoho"] = sign_array[result[i].kihonChk];
                }
                if (key == "yoshikiName") {
                    obj["yoshiki_text"] = result[i].yoshikiName;
                }
                if (key == "teiYmd") {
                    obj["teisyutu"] = (dayjs(result[i].teiYmd, 'YYYYMMDD').isValid()) ? 1 : 0;
                }
                if (key == "ketteiUmu") {
                    obj["sikyukettei"] = (result[i].ketteiUmu === 1) ? 1 : 0;
                }
                if (key == "tanYmd") {
                    obj["kaisaibi"] = (dayjs(result[i].tanYmd, 'YYYYMMDD').isValid()) ? dayjs(result[i].tanYmd).format('YYYY/MM/DD') : null;
                }
                if (key == "tanChk") {
                    obj["kanryo"] = (parseInt(result[i].tanChk) < parseInt(now)) ? sign_array[1] : '';
                }
                if (key == "keikakuYmd") {
                    obj["sakuseibi"] = (dayjs(result[i].keikakuYmd, 'YYYYMMDD').isValid()) ? dayjs(result[i].keikakuYmd).format('YYYY/MM/DD') : null;
                }
                if (key == "rkeymd") {
                    obj["rkeymd"] = (dayjs(result[i].rkeymd, 'YYYYMMDD').isValid()) ? dayjs(result[i].rkeymd).format('YYYY/MM/DD') : null;
                }
                if (key == "keikakuDouiYmd") {
                    obj["doui"] = (dayjs(result[i].keikakuDouiYmd, 'YYYYMMDD').isValid()) ? 1 : 0;
                }
                if (key == "moniKbn") {
                    obj["monikeizoku"] = result[i].moniKbn;
                }
                if (key == "moniKeizokuFlg") {
                    obj["moniKeizokuFlgD"] = (result[i].ketteiUmu === 1) ? "○" : null;
                }

            });
            array.push(obj);
        }
        return array;
    });
}