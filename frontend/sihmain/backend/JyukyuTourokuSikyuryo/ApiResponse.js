let result = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    if(!res){
      return [];
    }else{

      result = [];
    
      result.push(
        {
          status: 'idle',
          skryoh1_inf:
          [
            {

              sikyuid: 0, // 支給量内部ID
              jyukyuid: 1, // 受給者証内部ID
              skykbn: 0, // 支給区分
              svcshurui: 0, // サービス種類表示ｺｰﾄﾞ
              sksymd: '20220401', // 支給開始日
              skeymd: '20230930', // 支給終了日
              svccode1: 0, // サービス詳細コード1
              svccode2: 0, // サービス詳細コード2
              svccode3: 0, // サービス詳細コード3
              svccode4: 0, // サービス詳細コード4
              svccode5: 0, // サービス詳細コード5
              svccode6: 0, // サービス詳細コード6
              svccode7: 0, // サービス詳細コード7
              kihonryo1: 0, // 基本支給量1
              kihonryo2: 0, // 基本支給量2
              kihonryo3: 0, // 基本支給量3
              kihonryo4: 0, // 基本支給量4
              kihonryo5: 0, // 基本支給量5
              kihonryo6: 0, // 基本支給量6
              kihonryo7: 0, // 基本支給量7
              ikairyo1: 0, // 1回あたりの支給量1
              ikairyo2: 0, // 1回あたりの支給量2
              ikairyo3: 0, // 1回あたりの支給量3
              ikairyo4: 0, // 1回あたりの支給量4
              ikairyo5: 0, // 1回あたりの支給量5
              ikairyo6: 0, // 1回あたりの支給量6
              ikairyo7: 0, // 1回あたりの支給量7
              kasan1: 0, // 加算コード1
              kasan2: 0, // 加算コード2
              kasan3: 0, // 加算コード3
              kasan4: 0, // 加算コード4
              kasan5: 0, // 加算コード5
              kasanryo1: 0, // 加算支給量1
              kasanryo2: 0, // 加算支給量2
              kasanryo3: 0, // 加算支給量3
              kasanryo4: 0, // 加算支給量4
              kasanryo5: 0, // 加算支給量5
              teido: 0, // 障害区分
              ninzu: 0, // 居宅の人数
              kyodo: 0, // 共同生活介護利用型
              kyotk: 0, // 経過的居宅介護利用型
              tasyogai: 0, // 他障害受入
              koyo: 0, // 雇用契約
              kisonen1: 0, // 障害基礎年金1級
              ktkriyo: 0, // 個人単位での居宅介護利用
              keisochi: 0, // 経過措置利用
              skjipt: 0, // 食事入力
              skhaiti: 0, // 生活介護人員配置
              longnyuin: 0, // 長期入院者
              sikaku: 0, // 視覚障害者
              longnyuin: 0, // 長期入院者
              tankyuin: 0, // たん吸引
              taisyo: 0, // 退所
              rysid: 55000, // 利用者内部ID
              jkbn: 0, // 受給者証区分
              
              svcshuruinam: '', // サービス種別名称
              svcshuruiryaku: '生活介護', // サービス種別略称
              svccodenam: '', // サービス詳細名称
              svccoderyaku: '', // サービス詳細略称
              kasannam1: '', // 加算名1
              kasanryaku1: '', // 加算略称1
              kasannam2: '', // 加算名2
              kasanryaku2: '', // 加算略称2
              kasannam3: '', // 加算名3
              kasanryaku3: '', // 加算略称3
              kasannam4: '', // 加算名4
              kasanryaku4: '', // 加算略称4
              kasannam5: '', // 加算名5
              kasanryaku5: '', // 加算略称5
              teidonam: '', // 障害区分名称
              kyodonam: '', // 共同生活介護利用型名称
              kyotknam: '', // 経過的居宅介護利用型名称
              tasyogainam: '', // 他障害受入名称
              kyodonam: '', // 共同生活介護利用型名称
              koyonam: '', // 雇用契約名称
              kisonen1nam: '', // 障害基礎年金1級名称
              ktkriyonam: '', // 個人単位での居宅介護利用名称
              keisochinam: '', // 経過措置利用者名称
              skjiptnam: '', // 食事入力名称
              skhaitinam: '', // 生活介護人員配置名称
              sikakunam: '', // 視覚障害名称
              longnyuinnam: '', // 長期入院者名称
              tankyuinnam: '', // たん吸引名称
              taisyonam: '', // 退所名称
              dspskryo: '-8', // 表示用支給量
              dspsktani: '日/月', // 支給量単位
            },
          ]
        }          
      )

      let returns = {
        result: result,
      };
      return returns;

    }
  }
}