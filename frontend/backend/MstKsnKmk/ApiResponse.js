let ksn_inf = []
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    ksn_inf = [];
    // ★Date型はmonthが0-11で表現されることに注意
    let mst= [
      { val: 1, kbn: 1,bunnm:'施設体制加算', name: '夜間職員配置体制加算' },
      { val: 2, kbn: 1,bunnm:'施設体制加算', name: '重度障害者支援加算Ⅰ' },
      { val: 3, kbn: 1,bunnm:'施設体制加算', name: '夜間看護体制加算' },
      { val: 4, kbn: 1,bunnm:'施設体制加算', name: '視覚・聴覚等支援体制加算' },
      { val: 5, kbn: 1,bunnm:'施設体制加算', name: '地域生活移行個別支援加算' },
      { val: 6, kbn: 1,bunnm:'施設体制加算', name: '口腔衛生管理体制加算' },
      { val: 7, kbn: 1,bunnm:'施設体制加算', name: '処遇改善加算Ⅰ' },
      { val: 8, kbn: 1,bunnm:'施設体制加算', name: '処遇改善特別加算' },
      { val: 9, kbn: 1,bunnm:'施設体制加算', name: '特定処遇改善加算' },
      { val: 10, kbn: 2,bunnm:'個別加算', name: '入所時特別支援加算' },
      { val: 11, kbn: 2,bunnm:'個別加算', name: '入院・外泊時加算Ⅰ' },
      { val: 12, kbn: 2,bunnm:'個別加算', name: '入院・外泊時加算Ⅱ' },
      { val: 13, kbn: 2,bunnm:'個別加算', name: '経口維持加算Ⅰ' },
      { val: 14, kbn: 2,bunnm:'個別加算', name: '口腔衛生管理加算' },
      { val: 15, kbn: 2,bunnm:'個別加算', name: '栄養マネジメント加算' },
    ];
    for (let i = 0; i < mst.length; i++) {
      ksn_inf.push(
        {
        bunkbn:mst[i].kbn,
        bunnm:mst[i].bunnm,
        kcode:mst[i].val,
        name:mst[i].name,
      });
    }

    return ksn_inf;
  }
}