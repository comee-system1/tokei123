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
      console.log(element);
      result.push({
        sikyuid: element.sikyuid, // 支給量内部ID
        jyukyuid: element.jyukyuid, // 受給者証内部ID
        skykbn: element.skykbn, // 支給区分
        svcshurui: element.svcshurui, // サービス種類表示ｺｰﾄﾞ
        sksymd: element.sksymd, // 支給開始日
        skeymd: element.skeymd, // 支給終了日
        svccode1: element.svccode1, // サービス詳細コード1
        svccode2: element.svccode2, // サービス詳細コード2
        svccode3: element.svccode3, // サービス詳細コード3
        svccode4: element.svccode4, // サービス詳細コード4
        svccode5: element.svccode5, // サービス詳細コード5
        svccode6: element.svccode6, // サービス詳細コード6
        svccode7: element.svccode7, // サービス詳細コード7
        kihnryo1: element.kihnryo1, // 基本支給量1
        kihnryo2: element.kihnryo2, // 基本支給量2
        kihnryo3: element.kihnryo3, // 基本支給量3
        kihnryo4: element.kihnryo4, // 基本支給量4
        kihnryo5: element.kihnryo5, // 基本支給量5
        kihnryo6: element.kihnryo6, // 基本支給量6
        kihnryo7: element.kihnryo7, // 基本支給量7
        ikairyo1: element.ikairyo1, // 1回あたりの支給量1
        ikairyo2: element.ikairyo2, // 1回あたりの支給量2
        ikairyo3: element.ikairyo3, // 1回あたりの支給量3
        ikairyo4: element.ikairyo4, // 1回あたりの支給量4
        ikairyo5: element.ikairyo5, // 1回あたりの支給量5
        ikairyo6: element.ikairyo6, // 1回あたりの支給量6
        ikairyo7: element.ikairyo7, // 1回あたりの支給量7
        kasan1: element.kasan1, // 加算コード1
        kasan2: element.kasan2, // 加算コード2
        kasan3: element.kasan3, // 加算コード3
        kasan4: element.kasan4, // 加算コード4
        kasan5: element.kasan5, // 加算コード5
        kasanryo1: element.kasanryo1, // 加算支給量1
        kasanryo2: element.kasanryo2, // 加算支給量2
        kasanryo3: element.kasanryo3, // 加算支給量3
        kasanryo4: element.kasanryo4, // 加算支給量4
        kasanryo5: element.kasanryo5, // 加算支給量5
        teido: element.teido, // 障害区分
        ninzu: element.ninzu, // 居宅の人数
        kyodo: element.kyodo, // 共同生活介護利用型
        kyotk: element.kyotk, // 経過的居宅介護利用型
        tasyogai: element.tasyogai, // 他障害受入
        koyo: element.koyo, // 雇用契約
        kisonen1: element.kisonen1, // 障害基礎年金1級
        ktkriyo: element.ktkriyo, // 個人単位での居宅介護利用
        keisochi: element.keisochi, // 経過措置利用
        skjipt: element.skjipt, // 食事入力
        skhaiti: element.skhaiti, // 生活介護人員配置
        longnyuin: element.longnyuin, // 長期入院者
        sikaku: element.sikaku, // 視覚障害者
        longnyuin: element.longnyuin, // 長期入院者
        tankyuin: element.tankyuin, // たん吸引
        taisyo: element.taisyo, // 退所
        rysid: element.rysid, // 利用者内部ID
        jkbn: element.jkbn, // 受給者証区分
        
        svcshuruinam: element.svcshuruinam, // サービス種別名称
        svcshuruiryaku: element.svcshuruiryaku, // サービス種別略称
        svccodenam: element.svccodenam, // サービス詳細名称
        svccoderyaku: element.svccoderyaku, // サービス詳細略称
        kasannam1: element.kasannam1, // 加算名1
        kasanryaku1: element.kasanryaku1, // 加算略称1
        kasannam2: element.kasannam2, // 加算名2
        kasanryaku2: element.kasanryaku2, // 加算略称2
        kasannam3: element.kasannam3, // 加算名3
        kasanryaku3: element.kasanryaku3, // 加算略称3
        kasannam4: element.kasannam4, // 加算名4
        kasanryaku4: element.kasanryaku4, // 加算略称4
        kasannam5: element.kasannam5, // 加算名5
        kasanryaku5: element.kasanryaku5, // 加算略称5
        teidonam: element.teidonam, // 障害区分名称
        kyodonam: element.kyodonam, // 共同生活介護利用型名称
        kyotknam: element.kyotknam, // 経過的居宅介護利用型名称
        tasyogainam: element.tasyogainam, // 他障害受入名称
        kyodonam: element.kyodonam, // 共同生活介護利用型名称
        koyonam: element.koyonam, // 雇用契約名称
        kisonen1nam: element.kisonen1nam, // 障害基礎年金1級名称
        ktkriyonam: element.ktkriyonam, // 個人単位での居宅介護利用名称
        keisochinam: element.keisochinam, // 経過措置利用者名称
        skjiptnam: element.skjiptnam, // 食事入力名称
        skhaitinam: element.skhaitinam, // 生活介護人員配置名称
        sikakunam: element.sikakunam, // 視覚障害名称
        longnyuinnam: element.longnyuinnam, // 長期入院者名称
        tankyuinnam: element.tankyuinnam, // たん吸引名称
        taisyonam: element.taisyonam, // 退所名称
        dspskryo1: element.dspskryo1, // 表示用支給量1
        dspskryo2: element.dspskryo2, // 表示用支給量2
      }
      );
    });
    return result;
  }
}