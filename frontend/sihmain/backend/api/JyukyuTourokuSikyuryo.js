const Service = require('../JyukyuTourokuSikyuryo/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuSikyuryoData(rid) {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/sikyuketei?getkbn=0&rysid=' + rid;
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let skryoh1_inf = [];
        let jyukyuInfData = result;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            skryoh1_inf[i] = [];
            skryoh1_inf[i]['kai'            ] = String(i+1);
            skryoh1_inf[i]['sikyuid'		] = jyukyuInfData[i].sikyuid;        // 支給量内部ID
            skryoh1_inf[i]['jyukyuid'		] = jyukyuInfData[i].jyukyuid;       // 受給者証内部ID
            skryoh1_inf[i]['skykbn'			] = jyukyuInfData[i].skykbn;         // 支給区分
            skryoh1_inf[i]['svcshurui'		] = jyukyuInfData[i].svcshurui;      // サービス種類表示ｺｰﾄﾞ
            skryoh1_inf[i]['sksymd'			] = jyukyuInfData[i].sksymd;         // 支給開始日
            skryoh1_inf[i]['sksymdDisp'     ] = moment(jyukyuInfData[i].sksymd).format('YYYY.MM.DD');
            skryoh1_inf[i]['skeymd'			] = jyukyuInfData[i].skeymd;         // 支給終了日
            skryoh1_inf[i]['skeymdDisp'     ] = jyukyuInfData[i].skeymd===null?'':moment(jyukyuInfData[i].skeymd).format('YYYY.MM.DD');
            skryoh1_inf[i]['svccode1'		] = jyukyuInfData[i].svccode1;       // サービス詳細コード1
            skryoh1_inf[i]['svccode2'		] = jyukyuInfData[i].svccode2;       // サービス詳細コード2
            skryoh1_inf[i]['svccode3'		] = jyukyuInfData[i].svccode3;       // サービス詳細コード3
            skryoh1_inf[i]['svccode4'		] = jyukyuInfData[i].svccode4;       // サービス詳細コード4
            skryoh1_inf[i]['svccode5'		] = jyukyuInfData[i].svccode5;       // サービス詳細コード5
            skryoh1_inf[i]['svccode6'		] = jyukyuInfData[i].svccode6;       // サービス詳細コード6
            skryoh1_inf[i]['svccode7'		] = jyukyuInfData[i].svccode7;       // サービス詳細コード7
            skryoh1_inf[i]['kihnryo1'		] = jyukyuInfData[i].kihnryo1;       // 基本支給量1
            skryoh1_inf[i]['kihnryo2'		] = jyukyuInfData[i].kihnryo2;       // 基本支給量2
            skryoh1_inf[i]['kihnryo3'		] = jyukyuInfData[i].kihnryo3;       // 基本支給量3
            skryoh1_inf[i]['kihnryo4'		] = jyukyuInfData[i].kihnryo4;       // 基本支給量4
            skryoh1_inf[i]['kihnryo5'		] = jyukyuInfData[i].kihnryo5;       // 基本支給量5
            skryoh1_inf[i]['kihnryo6'		] = jyukyuInfData[i].kihnryo6;       // 基本支給量6
            skryoh1_inf[i]['kihnryo7'		] = jyukyuInfData[i].kihnryo7;       // 基本支給量7
            skryoh1_inf[i]['ikairyo1'		] = jyukyuInfData[i].ikairyo1;       // 1回あたりの支給量1
            skryoh1_inf[i]['ikairyo2'		] = jyukyuInfData[i].ikairyo2;       // 1回あたりの支給量2
            skryoh1_inf[i]['ikairyo3'		] = jyukyuInfData[i].ikairyo3;       // 1回あたりの支給量3
            skryoh1_inf[i]['ikairyo4'		] = jyukyuInfData[i].ikairyo4;       // 1回あたりの支給量4
            skryoh1_inf[i]['ikairyo5'		] = jyukyuInfData[i].ikairyo5;       // 1回あたりの支給量5
            skryoh1_inf[i]['ikairyo6'		] = jyukyuInfData[i].ikairyo6;       // 1回あたりの支給量6
            skryoh1_inf[i]['ikairyo7'		] = jyukyuInfData[i].ikairyo7;       // 1回あたりの支給量7
            skryoh1_inf[i]['kasan1'			] = jyukyuInfData[i].kasan1;         // 加算コード1
            skryoh1_inf[i]['kasan2'			] = jyukyuInfData[i].kasan2;         // 加算コード2
            skryoh1_inf[i]['kasan3'			] = jyukyuInfData[i].kasan3;         // 加算コード3
            skryoh1_inf[i]['kasan4'			] = jyukyuInfData[i].kasan4;         // 加算コード4
            skryoh1_inf[i]['kasan5'			] = jyukyuInfData[i].kasan5;         // 加算コード5
            skryoh1_inf[i]['kasanryo1'		] = jyukyuInfData[i].kasanryo1;      // 加算支給量1
            skryoh1_inf[i]['kasanryo2'		] = jyukyuInfData[i].kasanryo2;      // 加算支給量2
            skryoh1_inf[i]['kasanryo3'		] = jyukyuInfData[i].kasanryo3;      // 加算支給量3
            skryoh1_inf[i]['kasanryo4'		] = jyukyuInfData[i].kasanryo4;      // 加算支給量4
            skryoh1_inf[i]['kasanryo5'		] = jyukyuInfData[i].kasanryo5;      // 加算支給量5
            skryoh1_inf[i]['teido'			] = jyukyuInfData[i].teido;          // 障害区分
            skryoh1_inf[i]['ninzu'			] = jyukyuInfData[i].ninzu;          // 居宅の人数
            skryoh1_inf[i]['kyodo'			] = jyukyuInfData[i].kyodo;          // 共同生活介護利用型
            skryoh1_inf[i]['kyotk'			] = jyukyuInfData[i].kyotk;          // 経過的居宅介護利用型
            skryoh1_inf[i]['tasyogai'		] = jyukyuInfData[i].tasyogai;       // 他障害受入
            skryoh1_inf[i]['koyo'			] = jyukyuInfData[i].koyo;           // 雇用契約
            skryoh1_inf[i]['kisonen1'		] = jyukyuInfData[i].kisonen1;       // 障害基礎年金1級
            skryoh1_inf[i]['ktkriyo'		] = jyukyuInfData[i].ktkriyo;        // 個人単位での居宅介護利用
            skryoh1_inf[i]['keisochi'		] = jyukyuInfData[i].keisochi;       // 経過措置利用
            skryoh1_inf[i]['skjipt'			] = jyukyuInfData[i].skjipt;         // 食事入力
            skryoh1_inf[i]['skhaiti'		] = jyukyuInfData[i].skhaiti;        // 生活介護人員配置
            skryoh1_inf[i]['longnyuin'		] = jyukyuInfData[i].longnyuin;      // 長期入院者
            skryoh1_inf[i]['sikaku'			] = jyukyuInfData[i].sikaku;         // 視覚障害者
            skryoh1_inf[i]['longnyuin'		] = jyukyuInfData[i].longnyuin;      // 長期入院者
            skryoh1_inf[i]['tankyuin'		] = jyukyuInfData[i].tankyuin;       // たん吸引
            skryoh1_inf[i]['taisyo'			] = jyukyuInfData[i].taisyo;         // 退所
            skryoh1_inf[i]['rysid'			] = jyukyuInfData[i].rysid;          // 利用者内部ID
            skryoh1_inf[i]['jkbn'			] = jyukyuInfData[i].jkbn;           // 受給者証区分

            skryoh1_inf[i]['svcshuruinam'	] = jyukyuInfData[i].svcshuruinam;   // サービス種別名称
            skryoh1_inf[i]['svcshuruiryaku'	] = jyukyuInfData[i].svcshuruiryaku; // サービス種別略称
            skryoh1_inf[i]['svccodenam'		] = jyukyuInfData[i].svccodenam;     // サービス詳細名称
            skryoh1_inf[i]['svccoderyaku'	] = jyukyuInfData[i].svccoderyaku;   // サービス詳細略称
            skryoh1_inf[i]['kasannam1'		] = jyukyuInfData[i].kasannam1;      // 加算名1
            skryoh1_inf[i]['kasanryaku1'	] = jyukyuInfData[i].kasanryaku1;    // 加算略称1
            skryoh1_inf[i]['kasannam2'		] = jyukyuInfData[i].kasannam2;      // 加算名2
            skryoh1_inf[i]['kasanryaku2'	] = jyukyuInfData[i].kasanryaku2;    // 加算略称2
            skryoh1_inf[i]['kasannam3'		] = jyukyuInfData[i].kasannam3;      // 加算名3
            skryoh1_inf[i]['kasanryaku3'	] = jyukyuInfData[i].kasanryaku3;    // 加算略称3
            skryoh1_inf[i]['kasannam4'		] = jyukyuInfData[i].kasannam4;      // 加算名4
            skryoh1_inf[i]['kasanryaku4'	] = jyukyuInfData[i].kasanryaku4;    // 加算略称4
            skryoh1_inf[i]['kasannam5'		] = jyukyuInfData[i].kasannam5;      // 加算名5
            skryoh1_inf[i]['kasanryaku5'	] = jyukyuInfData[i].kasanryaku5;    // 加算略称5
            skryoh1_inf[i]['teidonam'		] = jyukyuInfData[i].teidonam;       // 障害区分名称
            skryoh1_inf[i]['kyodonam'		] = jyukyuInfData[i].kyodonam;       // 共同生活介護利用型名称
            skryoh1_inf[i]['kyotknam'		] = jyukyuInfData[i].kyotknam;       // 経過的居宅介護利用型名称
            skryoh1_inf[i]['tasyogainam'	] = jyukyuInfData[i].tasyogainam;    // 他障害受入名称
            skryoh1_inf[i]['kyodonam'		] = jyukyuInfData[i].kyodonam;       // 共同生活介護利用型名称
            skryoh1_inf[i]['koyonam'		] = jyukyuInfData[i].koyonam;        // 雇用契約名称
            skryoh1_inf[i]['kisonen1nam'	] = jyukyuInfData[i].kisonen1nam;    // 障害基礎年金1級名称
            skryoh1_inf[i]['ktkriyonam'		] = jyukyuInfData[i].ktkriyonam;     // 個人単位での居宅介護利用名称
            skryoh1_inf[i]['keisochinam'	] = jyukyuInfData[i].keisochinam;    // 経過措置利用者名称
            skryoh1_inf[i]['skjiptnam'		] = jyukyuInfData[i].skjiptnam;      // 食事入力名称
            skryoh1_inf[i]['skhaitinam'		] = jyukyuInfData[i].skhaitinam;     // 生活介護人員配置名称
            skryoh1_inf[i]['sikakunam'		] = jyukyuInfData[i].sikakunam;      // 視覚障害名称
            skryoh1_inf[i]['longnyuinnam'	] = jyukyuInfData[i].longnyuinnam;   // 長期入院者名称
            skryoh1_inf[i]['tankyuinnam'	] = jyukyuInfData[i].tankyuinnam;    // たん吸引名称
            skryoh1_inf[i]['taisyonam'		] = jyukyuInfData[i].taisyonam;      // 退所名称
            skryoh1_inf[i]['dspskryo1'		] = jyukyuInfData[i].dspskryo1;      // 表示用支給量1:基本支給量
            skryoh1_inf[i]['dspskryo2'		] = jyukyuInfData[i].dspskryo2;      // 表示用支給量2:1回当たりの支給量等

        }

        //支給開始日降順でソート
        skryoh1_inf.sort((a, b) => {
            if (a.sksymd < b.sksymd) return 1;
            if (a.sksymd > b.sksymd) return -1;
            return 0;
        });

        let returns = {
            skryoh1_inf: skryoh1_inf,
        };
        return returns;
    });
}