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
        kihonryo1: element.kihonryo1, // 基本支給量1
        kihonryo2: element.kihonryo2, // 基本支給量2
        kihonryo3: element.kihonryo3, // 基本支給量3
        kihonryo4: element.kihonryo4, // 基本支給量4
        kihonryo5: element.kihonryo5, // 基本支給量5
        kihonryo6: element.kihonryo6, // 基本支給量6
        kihonryo7: element.kihonryo7, // 基本支給量7
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
        svcshuruiryaku: element.svcshuruiryaku活介護, // サービス種別略称
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
        dspskryo: element.dspskryo, // 表示用支給量
        dspsktani: element.dspsktani, // 支給量単位
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
    //       skryoh1_inf:
    //       [
    //         {

    //           sikyuid: 0, // 支給量内部ID
    //           jyukyuid: 1, // 受給者証内部ID
    //           skykbn: 0, // 支給区分
    //           svcshurui: 0, // サービス種類表示ｺｰﾄﾞ
    //           sksymd: '20220401', // 支給開始日
    //           skeymd: '20230331', // 支給終了日
    //           svccode1: 0, // サービス詳細コード1
    //           svccode2: 0, // サービス詳細コード2
    //           svccode3: 0, // サービス詳細コード3
    //           svccode4: 0, // サービス詳細コード4
    //           svccode5: 0, // サービス詳細コード5
    //           svccode6: 0, // サービス詳細コード6
    //           svccode7: 0, // サービス詳細コード7
    //           kihonryo1: 0, // 基本支給量1
    //           kihonryo2: 0, // 基本支給量2
    //           kihonryo3: 0, // 基本支給量3
    //           kihonryo4: 0, // 基本支給量4
    //           kihonryo5: 0, // 基本支給量5
    //           kihonryo6: 0, // 基本支給量6
    //           kihonryo7: 0, // 基本支給量7
    //           ikairyo1: 0, // 1回あたりの支給量1
    //           ikairyo2: 0, // 1回あたりの支給量2
    //           ikairyo3: 0, // 1回あたりの支給量3
    //           ikairyo4: 0, // 1回あたりの支給量4
    //           ikairyo5: 0, // 1回あたりの支給量5
    //           ikairyo6: 0, // 1回あたりの支給量6
    //           ikairyo7: 0, // 1回あたりの支給量7
    //           kasan1: 0, // 加算コード1
    //           kasan2: 0, // 加算コード2
    //           kasan3: 0, // 加算コード3
    //           kasan4: 0, // 加算コード4
    //           kasan5: 0, // 加算コード5
    //           kasanryo1: 0, // 加算支給量1
    //           kasanryo2: 0, // 加算支給量2
    //           kasanryo3: 0, // 加算支給量3
    //           kasanryo4: 0, // 加算支給量4
    //           kasanryo5: 0, // 加算支給量5
    //           teido: 0, // 障害区分
    //           ninzu: 0, // 居宅の人数
    //           kyodo: 0, // 共同生活介護利用型
    //           kyotk: 0, // 経過的居宅介護利用型
    //           tasyogai: 0, // 他障害受入
    //           koyo: 0, // 雇用契約
    //           kisonen1: 0, // 障害基礎年金1級
    //           ktkriyo: 0, // 個人単位での居宅介護利用
    //           keisochi: 0, // 経過措置利用
    //           skjipt: 0, // 食事入力
    //           skhaiti: 0, // 生活介護人員配置
    //           longnyuin: 0, // 長期入院者
    //           sikaku: 0, // 視覚障害者
    //           longnyuin: 0, // 長期入院者
    //           tankyuin: 0, // たん吸引
    //           taisyo: 0, // 退所
    //           rysid: 55000, // 利用者内部ID
    //           jkbn: 0, // 受給者証区分
              
    //           svcshuruinam: '', // サービス種別名称
    //           svcshuruiryaku: '生活介護', // サービス種別略称
    //           svccodenam: '', // サービス詳細名称
    //           svccoderyaku: '', // サービス詳細略称
    //           kasannam1: '', // 加算名1
    //           kasanryaku1: '', // 加算略称1
    //           kasannam2: '', // 加算名2
    //           kasanryaku2: '', // 加算略称2
    //           kasannam3: '', // 加算名3
    //           kasanryaku3: '', // 加算略称3
    //           kasannam4: '', // 加算名4
    //           kasanryaku4: '', // 加算略称4
    //           kasannam5: '', // 加算名5
    //           kasanryaku5: '', // 加算略称5
    //           teidonam: '', // 障害区分名称
    //           kyodonam: '', // 共同生活介護利用型名称
    //           kyotknam: '', // 経過的居宅介護利用型名称
    //           tasyogainam: '', // 他障害受入名称
    //           kyodonam: '', // 共同生活介護利用型名称
    //           koyonam: '', // 雇用契約名称
    //           kisonen1nam: '', // 障害基礎年金1級名称
    //           ktkriyonam: '', // 個人単位での居宅介護利用名称
    //           keisochinam: '', // 経過措置利用者名称
    //           skjiptnam: '', // 食事入力名称
    //           skhaitinam: '', // 生活介護人員配置名称
    //           sikakunam: '', // 視覚障害名称
    //           longnyuinnam: '', // 長期入院者名称
    //           tankyuinnam: '', // たん吸引名称
    //           taisyonam: '', // 退所名称
    //           dspskryo: '-8', // 表示用支給量
    //           dspsktani: '日/月', // 支給量単位
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