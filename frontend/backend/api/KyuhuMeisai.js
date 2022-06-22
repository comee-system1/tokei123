const Service = require('../KyuhuMeisai/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function kyuhuMeisai() {
    // 接続確認用URL
    var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);
    
    // kyufuhi[i]['symddsp'   ] = (riyo[i].riyo_inf.dsp_inf.symddsp) ? moment(riyo[i].riyo_inf.dsp_inf.symddsp).format('YYYY/MM/DD') : '';

    return await service.getData().then(result => {
        let kyufuhi = [];
        let kyufuhiApiData = result.kyufuhi;
        for (let i = 0; i < kyufuhiApiData.length; i++) {
            kyufuhi[i] = [];
            kyufuhi[i]['tym'               ] = kyufuhiApiData[i].kyufuhi.tym;
            kyufuhi[i]['rym'               ] = kyufuhiApiData[i].kyufuhi.rym;
            kyufuhi[i]['jigyono'           ] = kyufuhiApiData[i].kyufuhi.jigyono;
            kyufuhi[i]['hokbn'             ] = kyufuhiApiData[i].kyufuhi.hokbn;
            // kojin
            kyufuhi[i]['sityoid'           ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.sityoid;
            kyufuhi[i]['shichosoncd'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.shichosoncd;
            kyufuhi[i]['riid'              ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.riyocode;
            kyufuhi[i]['riyocode'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.sityoid;
            kyufuhi[i]['names'             ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.names;
            kyufuhi[i]['kana'              ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.kana;
            kyufuhi[i]['ncod'              ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.ncod;
            kyufuhi[i]['kzk_dcod'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.kzk_dcod;
            kyufuhi[i]['kzk_name'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.kzk_name;
            kyufuhi[i]['jyoseiid'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.jyoseiid;
            kyufuhi[i]['kyuti'             ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.kyuti;
            kyufuhi[i]['kyutiname'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.kyutiname;
            kyufuhi[i]['teido'             ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.teido;
            kyufuhi[i]['jyogengaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.jyogengaku;
            kyufuhi[i]['agm_jigyoumu'      ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.agm_jigyoumu;
            kyufuhi[i]['agm_jigyoumunai'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.agm_jigyoumunai;
            kyufuhi[i]['agm_riyoumu'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.agm_riyoumu;
            kyufuhi[i]['agm_riyoumunai'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.agm_riyoumunai;
            kyufuhi[i]['kakutei'           ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.kakutei;
            kyufuhi[i]['keika'             ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kojin.keika;
            // jknr
            kyufuhi[i]['jigyoid'           ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.jigyoid;
            kyufuhi[i]['jjigyono'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.jjigyono;
            kyufuhi[i]['kjgyoname'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.kjgyoname;
            kyufuhi[i]['kjgyoryaku1'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.kjgyoryaku1;
            kyufuhi[i]['kjgyoryaku2'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.kjgyoryaku2;
            kyufuhi[i]['jigyokbn'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.jigyokbn;
            kyufuhi[i]['agm_jigyoumu'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.agm_jigyoumu;
            kyufuhi[i]['rslt'              ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.rslt;
            kyufuhi[i]['rsltnai'           ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.rsltnai;
            kyufuhi[i]['gaku'              ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.jknr.gaku;
            // nityuksn
            kyufuhi[i]['jigyoid'           ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.jigyoid;
            kyufuhi[i]['jjigyono'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.jjigyono;
            kyufuhi[i]['kjgyoname'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.kjgyoname;
            kyufuhi[i]['kjgyoryaku1'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.kjgyoryaku1;
            kyufuhi[i]['kjgyoryaku2'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.kjgyoryaku2;
            kyufuhi[i]['jigyokbn'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.jigyokbn;
            kyufuhi[i]['nissu'             ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.nityuksn.nissu;
            // goukei
            kyufuhi[i]['ssg_tani_kyufu'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_tani_kyufu;
            kyufuhi[i]['ssg_sogaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_sogaku;
            kyufuhi[i]['ssg_jknr_gaku'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_jknr_gaku;
            kyufuhi[i]['ssg_agm_jigyogaku' ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_agm_jigyogaku;
            kyufuhi[i]['ssg_agm_riyogaku'  ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_agm_riyogaku;
            kyufuhi[i]['ssg_ts_riyogaku'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_ts_riyogaku;
            kyufuhi[i]['ssg_riyogaku'      ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_riyogaku;
            kyufuhi[i]['ssg_seikyugaku'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_seikyugaku;
            kyufuhi[i]['ssg_kogaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_kogaku;
            kyufuhi[i]['ssg_tkgaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_tkgaku;
            kyufuhi[i]['ssg_jyoseigaku'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ssg_jyoseigaku;
            kyufuhi[i]['riyogaku'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.riyogaku;
            kyufuhi[i]['ttk_higaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ttk_higaku;
            kyufuhi[i]['ttk_nissu'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ttk_nissu;
            kyufuhi[i]['ttk_seikyugaku'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ttk_seikyugaku;
            kyufuhi[i]['ttk_jippigaku'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.goukei.ttk_jippigaku;
            // kyufuhi_ms1
            kyufuhi[i]['ms1_svcsyucode'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_svcsyucode;
            kyufuhi[i]['ms1_symd'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_symd;
            kyufuhi[i]['ms1_eymd'          ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_eymd;
            kyufuhi[i]['ms1_nissu'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_nissu;
            kyufuhi[i]['ms1_nyuin'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_nyuin;
            kyufuhi[i]['ms1_gaihaku'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_gaihaku;
            kyufuhi[i]['ms1_syunissu'      ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms1.ms1_syunissu;
            // kyufuhi_ms2
            kyufuhi[i]['ms2_svccode'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_svccode;
            kyufuhi[i]['ms2_svcname'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_svcname;
            kyufuhi[i]['ms2_svcsyucode'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_svcsyucode;
            kyufuhi[i]['ms2_tanio'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_tanio;
            kyufuhi[i]['ms2_kaisu'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_kaisu;
            kyufuhi[i]['ms2_tani_santei'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_tani_santei;
            kyufuhi[i]['ms2_tekiyo'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_tekiyo;
            kyufuhi[i]['ms2_tani_tanka'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_tani_tanka;
            kyufuhi[i]['ms2_kyufuritu'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_kyufuritu;
            kyufuhi[i]['ms2_bunrui_ms3'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms2.ms2_bunrui_ms3;
            // kyufuhi_ms3
            kyufuhi[i]['ms3_svcsyucode'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_svcsyucode;
            kyufuhi[i]['ms3_bunrui'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_bunrui;
            kyufuhi[i]['ms3_nissu'         ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_nissu;
            kyufuhi[i]['ms3_tanki_kyufu'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_tanki_kyufu;
            kyufuhi[i]['ms3_tanki_tanka'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_tanki_tanka;
            kyufuhi[i]['ms3_kyufuritu'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_kyufuritu;
            kyufuhi[i]['ms3_sogaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_sogaku;
            kyufuhi[i]['ms3_kf_seikyugaku' ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_kf_seikyugaku;
            kyufuhi[i]['ms3_kf_riyogaku'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_kf_riyogaku;
            kyufuhi[i]['ms3_jknr_gaku'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_kyufuhi_ms3_gaku;
            kyufuhi[i]['ms3_agm_riyogaku'  ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_agm_jigyogaku;
            kyufuhi[i]['ms3_agm_riyogaku'  ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_agm_riyogaku;
            kyufuhi[i]['ms3_ts_riyogaku'   ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_ts_riyogaku;
            kyufuhi[i]['ms3_ts_riyogakut'  ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_ts_riyogakut;
            kyufuhi[i]['ms3_riyogaku'      ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_riyogaku;
            kyufuhi[i]['ms3_seikyugaku'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_seikyugaku;
            kyufuhi[i]['ms3_kogaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_kogaku;
            kyufuhi[i]['ms3_tkgaku'        ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_tkgaku;
            kyufuhi[i]['ms3_jigyogaku'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_jigyogaku;
            kyufuhi[i]['ms3_riyogaku'      ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_riyogaku;
            kyufuhi[i]['ms3_ttk_higaku'    ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_ttk_higaku;
            kyufuhi[i]['ms3_ttk_nissu'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_ttk_nissu;
            kyufuhi[i]['ms3_ttk_seikyugaku'] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_ttk_seikyugaku;
            kyufuhi[i]['ms3_ttk_jippigaku' ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_ttk_jippigaku;
            kyufuhi[i]['ms3_rnk_sym'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_rnk_sym;
            kyufuhi[i]['ms3_rnk_eym'       ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_rnk_eym;
            kyufuhi[i]['ms3_rnk_nissu'     ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_rnk_nissu;
            kyufuhi[i]['ms3_rnk_sowa'      ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_rnk_sowa;
            kyufuhi[i]['ms3_kf_riyogaku2'  ] = kyufuhiApiData[i].kyufuhi.kyufuhi_khn.kyufuhi_ms3.ms3_kf_riyogaku2;

        }
        let returns = {
            kyufuhi: kyufuhi,
        };
        return returns;
    });
}