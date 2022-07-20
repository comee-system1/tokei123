let result = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    result = [];
    if(!res){
      return result;
    } 
    res.data.forEach(function(element){
      result.push({
        jyogenid: element.jyogenid,    //利用者負担関係内部ID
        jyukyuid: element.jyukyuid,    //受給者証内部ID
        tesymd: element.tesymd,      //適用開始日
        teeymd: element.teeymd,      //適用終了日
        ftn: element.ftn,         //利用者負担割合
        fjyogen: element.fjyogen,     //利用者負担上限月額
        tkkfhi: element.tkkfhi,      //特定障害者特別給付費
        syafukug: element.syafukug,    //社会福祉法人減額
        jgenkbn: element.jgenkbn,     //上限管理対象区分
        jgenknrikbn: element.jgenknrikbn, //上限管理委託事業者区分
        jgenknri: element.jgenknri,    //上限管理委託事業者内部ID
        sykksn: element.sykksn,      //食事提供加算
        tkkfhi12: element.tkkfhi12,    //特定障害者特別給付費(GH/CH)
        kyftok: element.kyftok,      //給付費等の額の特例
        kyuftokkbn: element.kyuftokkbn,  //給付費等の額の特例の有無
        tasikgn: element.tasikgn,     //多子軽減対象
        mushojdo: element.mushojdo,    //無償化対象児童
        rysid: element.rysid,       //利用者内部ID
        jkbn: element.jkbn,        //受給者証区分
        
        jgenname: element.jgenname,    //上限管理事業者名
        jgenryaku: element.jgenryaku,   //上限管理事業者略称
      }
        );
    });
    return result;

    // if(!res){
    //   return [];
    // }else{

    //   result = [];
    
    //   result.push(
    //     {
    //       status: 'idle',
    //       skryoh2_inf:
    //       [
    //         {

    //           jyogenid: 1,    //利用者負担関係内部ID
    //           jyukyuid: 1,    //受給者証内部ID
    //           tesymd: '20220401',      //適用開始日
    //           teeymd: '99991231',      //適用終了日
    //           ftn: 0,         //利用者負担割合
    //           fjyogen: 150000,     //利用者負担上限月額
    //           tkkfhi: 0,      //特定障害者特別給付費
    //           syafukug: 0,    //社会福祉法人減額
    //           jgenkbn: 0,     //上限管理対象区分
    //           jgenknrikbn: 0, //上限管理委託事業者区分
    //           jgenknri: 0,    //上限管理委託事業者内部ID
    //           sykksn: 0,      //食事提供加算
    //           tkkfhi12: 0,    //特定障害者特別給付費(GH/CH)
    //           kyftok: 0,      //給付費等の額の特例
    //           kyuftokkbn: 0,  //給付費等の額の特例の有無
    //           tasikgn: 0,     //多子軽減対象
    //           mushojdo: 0,    //無償化対象児童
    //           rysid: 55000,       //利用者内部ID
    //           jkbn: 0,        //受給者証区分
              
    //           jgenname: '',    //上限管理事業者名
    //           jgenryaku: '',   //上限管理事業者略称
    //          },
    //       ]
    //     }          
    //   )

    //   let returns = {
    //     result: result,
    //   };
    //   return returns;

    // }
  }
}