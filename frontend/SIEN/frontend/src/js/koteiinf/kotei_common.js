import { getConnect } from '../../connect/getConnect';
import { postConnect } from '../../connect/postConnect';
import sysConst_kotei from '../../utiles/const_kotei';


export async function Kotei_Copy_All(uniqid, traceid, intcode, jigyoid, ins_ymd, insflg, kotei_id) {
    //前回コピーを実施する
    //*最新データの取得 */

    let Copydata_honnin =[];
    let Copydata_kazoku =[];
    let Copydata_syakai =[];


    let params = {
        uniqid: uniqid,
        traceid: traceid,
        ymd: ins_ymd,
        intcode: intcode,

        pJigyoid: jigyoid,
        Kbn: 0,
        Dataid: 0,
        Modeflg: 0,
    };

    let copy_param = {
        uniqid: uniqid,
        traceid: traceid,
    }

    console.log("こっち");

    //本人
    getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
        //各リスト作成
        let wk_data;
        let Copydataid = [];
        let putdata = [];

        if (insflg == sysConst_kotei.INS_KBN_HEAD)//個別
        {
            //リスト作成
            wk_data = { dataid: 0, kotei_kbn: 0, mymd: "" }
            Copydataid.push(wk_data);
            result.icrn_inf.forEach(function (value) {
                if (value.head_kbn == kotei_id) {
                    if (Copydataid[0].dataid == 0 || Copydataid[0].mymd < value.head_mymd) {
                        Copydataid[0].mymd = value.head_mymd;
                        Copydataid[0].dataid = value.head_dataid;
                        Copydataid[0].kotei_kbn = value.head_kbn;
                    }
                }
            });
        }
        else {   //一括
            for (let i = 0; i < 7; i++) {
                wk_data = { dataid: 0, kotei_kbn: 0, mymd: "" }
                Copydataid.push(wk_data);
            }

            result.icrn_inf.forEach(function (value) {
                switch (value.head_kbn) {
                    case sysConst_kotei.KOTEI_ID_KIHON:
                        if (Copydataid[1].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                            Copydataid[1].mymd = value.head_mymd;
                            Copydataid[1].dataid = value.head_dataid;
                            Copydataid[1].kotei_kbn = value.head_kbn;
                        }
                        break;
                    case sysConst_kotei.KOTEI_ID_SEIKATU:
                        if (Copydataid[2].dataid == 0 || Copydataid[2].mymd < value.head_mymd) {
                            Copydataid[2].mymd = value.head_mymd;
                            Copydataid[2].dataid = value.head_dataid;
                            Copydataid[2].kotei_kbn = value.head_kbn;
                        }
                        break;
                    case sysConst_kotei.KOTEI_ID_KIOU:
                        if (Copydataid[3].dataid == 0 || Copydataid[3].mymd < value.head_mymd) {
                            Copydataid[3].mymd = value.head_mymd;
                            Copydataid[3].dataid = value.head_dataid;
                            Copydataid[3].kotei_kbn = value.head_kbn;
                        }
                        break;
                    case sysConst_kotei.KOTEI_ID_JYUSIN:
                        if (Copydataid[4].dataid == 0 || Copydataid[4].mymd < value.head_mymd) {
                            Copydataid[4].mymd = value.head_mymd;
                            Copydataid[4].dataid = value.head_dataid;
                            Copydataid[4].kotei_kbn = value.head_kbn;
                        }
                        break;
                    case sysConst_kotei.KOTEI_ID_IRYO:
                        if (Copydataid[5].dataid == 0 || Copydataid[5].mymd < value.head_mymd) {
                            Copydataid[5].mymd = value.head_mymd;
                            Copydataid[5].dataid = value.head_dataid;
                            Copydataid[5].kotei_kbn = value.head_kbn;
                        }
                        break;
                    case sysConst_kotei.KOTEI_ID_SEIJO:
                        if (Copydataid[6].dataid == 0 || Copydataid[6].mymd < value.head_mymd) {
                            Copydataid[6].mymd = value.head_mymd;
                            Copydataid[6].dataid = value.head_dataid;
                            Copydataid[6].kotei_kbn = value.head_kbn;
                        }
                        break;
                }
            });

            let wk_putdata = [];
            for (let i = 1; i < Copydataid.length; i++) {
                wk_putdata = {
                    jigyoid: jigyoid,
                    intcode: intcode,
                    kbn: Copydataid[i].kotei_kbn,
                    dataid: Copydataid[i].dataid,  //データid
                    ymd: ins_ymd,
                }
                putdata.push(wk_putdata);
            }

            //前回コピー
            postConnect('/Koteiinf_COPY', copy_param, 'KOTEIINF', putdata).then((result) => {
                Copydata_honnin = result.icrn_inf;
            });
        }
    });


    //家族情報
    getConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF').then((result_kzk) => {
        let wk_data;
        let Copydataid = [];
        let putdata = [];
        for (let i = 0; i < 4; i++) {
            wk_data = { dataid: 0, kotei_kbn: 0, mymd: "" }
            Copydataid.push(wk_data);
        }

        result_kzk.icrn_inf.forEach(function (value) {
            switch (value.head_kbn) {
                case sysConst_kotei.KOTEI_ID_KAZOKU:
                    if (Copydataid[0].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                        Copydataid[0].mymd = value.head_mymd;
                        Copydataid[0].dataid = value.head_dataid;
                        Copydataid[0].kotei_kbn = value.head_kbn;
                    }
                    break;
                case sysConst_kotei.KOTEI_ID_KAIGO:
                    if (Copydataid[1].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                        Copydataid[1].mymd = value.head_mymd;
                        Copydataid[1].dataid = value.head_dataid;
                        Copydataid[1].kotei_kbn = value.head_kbn;
                    }
                    break;
                case sysConst_kotei.KOTEI_ID_JYUKYO:
                    if (Copydataid[2].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                        Copydataid[2].mymd = value.head_mymd;
                        Copydataid[2].dataid = value.head_dataid;
                        Copydataid[2].kotei_kbn = value.head_kbn;
                    }
                    break;
            }
        });
        let wk_putdata = [];
        for (let i = 1; i < Copydataid.length; i++) {
            wk_putdata = {
                jigyoid: jigyoid,
                intcode: intcode,
                kbn: Copydataid[i].kotei_kbn,
                dataid: Copydataid[i].dataid,  //データid
                ymd: ins_ymd,         //内容登録
            }
            putdata.push(wk_putdata);
        }

        //前回コピー
        postConnect('/Koteiinf_COPY', copy_param, 'KOTEIINF', putdata).then((result) => {
            Copydata_kazoku = result.icrn_inf;
        });

    });


    //社会情報
    getConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF').then((result_syakai) => {
        let wk_data;
        let Copydataid = [];
        let putdata = [];
        for (let i = 0; i < 4; i++) {
            wk_data = { dataid: 0, kotei_kbn: 0, mymd: "" }
            Copydataid.push(wk_data);
        }

        result_syakai.icrn_inf.forEach(function (value) {
            switch (value.head_kbn) {
                case sysConst_kotei.KOTEI_ID_KANKEI:
                    if (Copydataid[0].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                        Copydataid[0].mymd = value.head_mymd;
                        Copydataid[0].dataid = value.head_dataid;
                        Copydataid[0].kotei_kbn = value.head_kbn;
                    }
                    break;
                case sysConst_kotei.KOTEI_ID_TETYO:
                    if (Copydataid[1].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                        Copydataid[1].mymd = value.head_mymd;
                        Copydataid[1].dataid = value.head_dataid;
                        Copydataid[1].kotei_kbn = value.head_kbn;
                    }
                    break;
                case sysConst_kotei.KOTEI_ID_KAISV:
                    if (Copydataid[2].dataid == 0 || Copydataid[1].mymd < value.head_mymd) {
                        Copydataid[2].mymd = value.head_mymd;
                        Copydataid[2].dataid = value.head_dataid;
                        Copydataid[2].kotei_kbn = value.head_kbn;
                    }
                    break;
            }
        });
        let wk_putdata = [];
        for (let i = 1; i < Copydataid.length; i++) {
            wk_putdata = {
                jigyoid: jigyoid,
                intcode: intcode,
                kbn: Copydataid[i].kotei_kbn,
                dataid: Copydataid[i].dataid,  //データid
                ymd: ins_ymd,         //内容登録
            }
            putdata.push(wk_putdata);
        }
        //前回コピー
        postConnect('/Koteiinf_COPY', copy_param, 'KOTEIINF', putdata).then((result) => {
            Copydata_syakai = result.icrn_inf;

        });
    });

    //要修正
    console.log(Copydata_honnin);
    console.log(Copydata_kazoku);
    console.log(Copydata_syakai);


}

