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
        ryokid: element.ryokid,    // 利用計画作成費内部ID
        jyukyuid: element.jyukyuid,  // 受給者証内部ID
        rksymd: element.rksymd,   // 支給開始日
        rkeymd: element.rkeymd,   // 支給終了日
        sjgyokbn: element.sjgyokbn,  // 相談支援事業者区分
        sjgyo: element.sjgyo,     // 相談支援事業者
        tokuti: element.tokuti,    // 特別地域加算
        monijiki: element.monijiki,  // ﾓﾆﾀﾘﾝｸﾞ時期
        rysid: element.rysid, // 利用者内部ID
        jkbn: element.jkbn,			// 受給者証区分
        
        skryoh3_moni2: [
          {
            ryokid: element.ryokid,    // 利用計画作成費内部ID
            jyukyuid: element.jyukyuid,  // 受給者証内部ID
            ym: element.ym,       // モニタリング予定月
            monijiki: element.monijiki,  // モニタリング時期
            syukiflg: element.syukiflg,  // 終期月
            rysid: element.rysid,     // 利用者内部ID
            jkbn: element.jkbn,      // 受給者証区分
          },
        ],	// モニタリング情報
        
        sjigyoname: element.sjigyoname,		// 相談支援事業者名
        sjigyoryaku: element.sjigyoryaku,	// 相談支援事業者略称
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
    //       skryoh3_inf:
    //       [
    //         {

    //           ryokid: 1,    // 利用計画作成費内部ID
    //           jyukyuid: 1,  // 受給者証内部ID
    //           rksymd: '20220401',   // 支給開始日
    //           rkeymd: '20230930',   // 支給終了日
    //           sjgyokbn: 1,  // 相談支援事業者区分
    //           sjgyo: 0,     // 相談支援事業者
    //           tokuti: 0,    // 特別地域加算
    //           monijiki: 0,  // ﾓﾆﾀﾘﾝｸﾞ時期
    //           rysid: 55000, // 利用者内部ID
    //           jkbn: 0,			// 受給者証区分
              
    //           skryoh3_moni2: [
    //             {
    //               ryokid: 1,    // 利用計画作成費内部ID
    //               jyukyuid: 1,  // 受給者証内部ID
    //               ym: '',       // モニタリング予定月
    //               monijiki: 0,  // モニタリング時期
    //               syukiflg: 0,  // 終期月
    //               rysid: 0,     // 利用者内部ID
    //               jkbn: 0,      // 受給者証区分
    //             },
    //           ],	// モニタリング情報
              
    //           sjigyoname: 'ひまわり相談事業所',		// 相談支援事業者名
    //           sjigyoryaku: 'ひまわり相談事業所',	// 相談支援事業者略称
    //         },
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