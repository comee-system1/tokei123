let result = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    result = [];
    if (!res) {
      return result;
    }

    if (res.data) {
      res.data.forEach(function (el) {
        result.push({
          intcode: el.intcode,
          hoKbn: el.hoKbn,
          svcCode: el.svcCode,
          svcKbn: el.svcKbn,
          shichosonID: el.shichosonID,
          shichosonName: el.shichosonName,
          riCode: el.riCode,
          riName: el.riName,
          riKana: el.riKana,
          jukyuNo: el.jukyuNo,
          hogoshaName: el.hogoshaName,
          symd: el.symd,
          eymd: el.eymd,
          endReason: el.endReason,
          minyuFlg: el.minyuFlg,
          // API反映待ち
          // jigyoCode: el.jigyoCode,
          // svcName: el.svcName,
          // jigyoName: el.jigyoName,
        });
      });

    }
    return result;
  }
}