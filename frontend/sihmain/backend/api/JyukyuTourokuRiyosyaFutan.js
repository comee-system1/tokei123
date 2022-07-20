const Service = require('../JyukyuTourokuRiyosyaFutan/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function JyukyuTourokuRiyosyaFutanData() {
    // 接続確認用URL
    var url = config.getDomain() + '/syogai/daityo/v1/jyukyu/futan';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        let skryoh2_inf = [];
        // let jyukyuInfData = result.result[0].skryoh2_inf;
        let jyukyuInfData = result;
        for (let i = 0; i < jyukyuInfData.length; i++) {
            skryoh2_inf[i] = [];
            skryoh2_inf[i]['jyogenid'	] = jyukyuInfData[i].jyogenid;    //利用者負担関係内部ID
            skryoh2_inf[i]['jyukyuid'	] = jyukyuInfData[i].jyukyuid;    //受給者証内部ID
            skryoh2_inf[i]['tesymd'		] = jyukyuInfData[i].tesymd;      //適用開始日
            skryoh2_inf[i]['tesymdDisp' ] = moment(jyukyuInfData[i].tesymd).format('YYYY.MM.DD');
            skryoh2_inf[i]['teeymd'		] = jyukyuInfData[i].teeymd;      //適用終了日
            skryoh2_inf[i]['teeymdDisp' ] = jyukyuInfData[i].teeymd==='99991231'?'':moment(jyukyuInfData[i].teeymd).format('YYYY.MM.DD');
            skryoh2_inf[i]['ftn'		] = jyukyuInfData[i].ftn;         //利用者負担割合
            skryoh2_inf[i]['fjyogen'	] = jyukyuInfData[i].fjyogen;     //利用者負担上限月額
            skryoh2_inf[i]['fjyogenDisp'] = jyukyuInfData[i].fjyogen==0?'':jyukyuInfData[i].fjyogen.toLocaleString();
            skryoh2_inf[i]['tkkfhi'		] = jyukyuInfData[i].tkkfhi;      //特定障害者特別給付費
            skryoh2_inf[i]['syafukug'	] = jyukyuInfData[i].syafukug;    //社会福祉法人減額
            skryoh2_inf[i]['jgenkbn'	] = jyukyuInfData[i].jgenkbn;     //上限管理対象区分
            skryoh2_inf[i]['jgenkbnDisp'] = jyukyuInfData[i].jgenkbn===1?'該当':'非該当';
            skryoh2_inf[i]['jgenknrikbn'] = jyukyuInfData[i].jgenknrikbn; //上限管理委託事業者区分
            skryoh2_inf[i]['jgenknri'	] = jyukyuInfData[i].jgenknri;    //上限管理委託事業者内部ID
            skryoh2_inf[i]['sykksn'		] = jyukyuInfData[i].sykksn;      //食事提供加算
            skryoh2_inf[i]['tkkfhi12'	] = jyukyuInfData[i].tkkfhi12;    //特定障害者特別給付費(GH/CH)
            skryoh2_inf[i]['kyftok'		] = jyukyuInfData[i].kyftok;      //給付費等の額の特例
            skryoh2_inf[i]['kyuftokkbn'	] = jyukyuInfData[i].kyuftokkbn;  //給付費等の額の特例の有無
            skryoh2_inf[i]['tasikgn'	] = jyukyuInfData[i].tasikgn;     //多子軽減対象
            skryoh2_inf[i]['mushojdo'	] = jyukyuInfData[i].mushojdo;    //無償化対象児童
            skryoh2_inf[i]['rysid'		] = jyukyuInfData[i].rysid;       //利用者内部ID
            skryoh2_inf[i]['jkbn'		] = jyukyuInfData[i].jkbn;        //受給者証区分
            
            skryoh2_inf[i]['jgenname'	] = jyukyuInfData[i].jgenname;    //上限管理事業者名
            skryoh2_inf[i]['jgenryaku'	] = jyukyuInfData[i].jgenryaku;   //上限管理事業者略称
        }
        
        //３行以下はダミーデータ作成
        if(jyukyuInfData.length < 3){
            for (let i = jyukyuInfData.length; i < 3; i++) {
                skryoh2_inf[i] = [];
                skryoh2_inf[i]['jyogenid'	] = 0;    //利用者負担関係内部ID
                skryoh2_inf[i]['jyukyuid'	] = 0;    //受給者証内部ID
                skryoh2_inf[i]['tesymd'		] = '';      //適用開始日
                skryoh2_inf[i]['tesymdDisp' ] = '';
                skryoh2_inf[i]['teeymd'		] = '';      //適用終了日
                skryoh2_inf[i]['teeymdDisp' ] = '';
                skryoh2_inf[i]['ftn'		] = 0;         //利用者負担割合
                skryoh2_inf[i]['fjyogen'	] = 0;     //利用者負担上限月額
                skryoh2_inf[i]['fjyogenDisp'] = '';
                skryoh2_inf[i]['tkkfhi'		] = 0;      //特定障害者特別給付費
                skryoh2_inf[i]['syafukug'	] = 0;    //社会福祉法人減額
                skryoh2_inf[i]['jgenkbn'	] = 0;     //上限管理対象区分
                skryoh2_inf[i]['jgenkbnDisp'] = '';
                skryoh2_inf[i]['jgenknrikbn'] = 0 //上限管理委託事業者区分
                skryoh2_inf[i]['jgenknri'	] = 0;    //上限管理委託事業者内部ID
                skryoh2_inf[i]['sykksn'		] = 0;      //食事提供加算
                skryoh2_inf[i]['tkkfhi12'	] = 0;    //特定障害者特別給付費(GH/CH)
                skryoh2_inf[i]['kyftok'		] = 0;      //給付費等の額の特例
                skryoh2_inf[i]['kyuftokkbn'	] = 0;  //給付費等の額の特例の有無
                skryoh2_inf[i]['tasikgn'	] = 0;     //多子軽減対象
                skryoh2_inf[i]['mushojdo'	] = 0;    //無償化対象児童
                skryoh2_inf[i]['rysid'		] = 0;       //利用者内部ID
                skryoh2_inf[i]['jkbn'		] = 0;        //受給者証区分
                
                skryoh2_inf[i]['jgenname'	] = '';    //上限管理事業者名
                skryoh2_inf[i]['jgenryaku'	] = '';   //上限管理事業者略称
            }
        }

        let returns = {
            skryoh2_inf: skryoh2_inf,
        };
        return returns;
    });
}