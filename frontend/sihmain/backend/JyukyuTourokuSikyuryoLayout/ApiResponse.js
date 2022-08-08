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
      let sellst = [];
      for(let i = 0;i<element.sellst.length;i++){
        sellst.push({
          code: element.sellst[i].code, //コード
          selname: element.sellst[i].selname, //名称
          defsel: element.sellst[i].defsel, //デフォルト選択
         })
      };
      result.push({
        hokbn: element.hokbn, //法区分
        svccode: element.svccode, //サービス種類表示ｺｰﾄﾞ
        kbnno: element.kbnno, //サービス詳細
        inpkbn: element.inpkbn, //入力区分
        title: element.title, //タイトル
        dspkbn: element.dspkbn, //表示区分
        hisuipt: element.hisuipt, //必須入力
        jyogen: element.jyogen, //選択上限数
        columnname: element.columnname, //テーブルカラム名
        kzkkbn: element.kzkkbn, //家族区分
        jitakbn: element.jitakbn, //自他施設表示区分
        
        sellst: sellst,	// 選択肢リスト
      });
    });
    return result;
  }
}