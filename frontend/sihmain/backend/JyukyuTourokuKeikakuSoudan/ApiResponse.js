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
      let moni = [];
      for(let i = 0;i<element.skryoh3_moni2.length;i++){
        moni.push({
          ryokid: element.skryoh3_moni2[i].ryokid,    // 利用計画作成費内部ID
          jyukyuid: element.skryoh3_moni2[i].jyukyuid,  // 受給者証内部ID
          ym: element.skryoh3_moni2[i].ym,       // モニタリング予定月
          monijiki: element.skryoh3_moni2[i].monijiki,  // モニタリング時期
          syukiflg: element.skryoh3_moni2[i].syukiflg,  // 終期月
          rysid: element.skryoh3_moni2[i].rysid,     // 利用者内部ID
          jkbn: element.skryoh3_moni2[i].jkbn,      // 受給者証区分
        })
      };
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
        
        skryoh3_moni2: moni,	// モニタリング情報
        
        sjigyoname: element.sjigyoname,		// 相談支援事業者名
        sjigyoryaku: element.sjigyoryaku,	// 相談支援事業者略称
      }
        );
    });
    return result;
  }
}