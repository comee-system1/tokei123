const Service = require('../KobetsuIcrnNyusho/Service')
const service = new Service();
const config = require('./ApiRun');
const moment = require('moment')
export async function KobetsuIcrnNyusho() {
    // 接続確認用URL
    //var url = config.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
    var url = "/";
    var uniqid = 1;
    config.setURL(url);
    config.setUniqID(uniqid);

    return await service.getData().then(result => {
        // 利用者情報一覧
        let returns = [];
        let views = [];
        // riyo_inf.push({
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 1,
            komoku0: '変動情報',
            komoku1: '利用日',
            day1: '〇',
            day2: '〇',
            day3: '〇',
            day4: '〇',
            day5: '〇',
            day6: '〇',
            kei: 6,
        });
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 2,
            komoku0: '変動情報',
            komoku1: '入院・退院日',
            nyugai_inf: [{
                    kbn: 1,
                    ngsymd: '20220602',
                    ngeymd: '20220706',
                    seikyu: 1,
                    nissu: 4,
                },
                {
                    kbn: 1,
                    ngsymd: '20220707',
                    ngeymd: '20220709',
                    seikyu: 1,
                    nissu: 4,
                },
            ],
            day1: '〇',
            day2: '〇',
            day3: '〇',
            day4: '〇',
            day5: '〇',
            day6: '',
            day7: '〇',
            day8: '〇',
            day9: '〇',
            kei: 10,
        });
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 2,
            komoku0: '変動情報',
            komoku1: '外泊日',

            nyugai_inf: [{
                    kbn: 2,
                    ngsymd: '20220714',
                    ngeymd: '20220718',
                    seikyu: 1,
                    nissu: 4,
                },
                {
                    kbn: 2,
                    ngsymd: '20220720',
                    ngeymd: '20220724',
                    seikyu: 1,
                    nissu: 4,
                },
            ],
            day14: '〇',
            day15: '〇',
            day16: '〇',
            day17: '〇',
            day18: '〇',
            day20: '〇',
            day21: '〇',
            day22: '〇',
            day23: '〇',
            day24: '〇',
            kei: 10,
        });
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 3,
            kmkkbn6: 300,
            komoku0: '変動情報',
            komoku1: '食事',
            komoku3: '朝食',
            day1: '〇',
            day2: '〇',
            day3: '〇',
            day4: '〇',
            day5: '〇',
            day6: '〇',
            day7: '〇',
            day8: '〇',
            day9: '〇',
            day10: '',
            day11: '',
            day12: '',
            day13: '',
            day14: '',
            day15: '',
            day16: '',
            day17: '',
            day18: '',
            day19: '',
            day20: '',
            day21: '',
            day22: '',
            day23: '',
            day24: '',
            day25: '',
            day26: '',
            day27: '',
            day28: '',
            day29: '',
            day30: '',
            day31: '',
            kei: 9,
            kingaku: 2700,
        });
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 3,
            kmkkbn6: 400,
            komoku0: '変動情報',
            komoku1: '食事',
            komoku3: '昼食',
            day1: '〇',
            day2: '〇',
            day3: '〇',
            day4: '〇',
            day5: '〇',
            day6: '〇',
            day7: '〇',
            day8: '〇',
            day9: '〇',
            day10: '',
            day11: '',
            day12: '',
            day13: '',
            day14: '',
            day15: '',
            day16: '',
            day17: '',
            day18: '',
            day19: '',
            day20: '',
            day21: '',
            day22: '',
            day23: '',
            day24: '',
            day25: '',
            day26: '',
            day27: '',
            day28: '',
            day29: '',
            day30: '',
            day31: '',
            kei: 9,
            kingaku: 3600,
        });
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 3,
            kmkkbn6: 500,
            komoku0: '変動情報',
            komoku1: '食事',
            komoku3: '夕食',
            day1: '〇',
            day2: '〇',
            day3: '〇',
            day4: '〇',
            day5: '〇',
            day6: '〇',
            day7: '〇',
            day8: '〇',
            day9: '〇',
            day10: '',
            day11: '',
            day12: '',
            day13: '',
            day14: '',
            day15: '',
            day16: '',
            day17: '',
            day18: '',
            day19: '',
            day20: '',
            day21: '',
            day22: '',
            day23: '',
            day24: '',
            day25: '',
            day26: '',
            day27: '',
            day28: '',
            day29: '',
            day30: '',
            day31: '',
            kei: 9,
            kingaku: 4500,
        });
        views.push({
            kmkkbn1: 1,
            kmkkbn2: 4,
            kmkkbn6: 100,
            komoku0: '変動情報',
            komoku1: '光熱水費',
            komoku3: '',
            day1: '〇',
            day2: '〇',
            day3: '〇',
            day4: '〇',
            day5: '〇',
            day6: '〇',
            day7: '〇',
            day8: '〇',
            day9: '〇',
            day10: '',
            day11: '',
            day12: '',
            day13: '',
            day14: '',
            day15: '',
            day16: '',
            day17: '',
            day18: '',
            day19: '',
            day20: '',
            day21: '',
            day22: '',
            day23: '',
            day24: '',
            day25: '',
            day26: '',
            day27: '',
            day28: '',
            day29: '',
            day30: '',
            day31: '',
            kei: 9,
            kingaku: 900,

        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 1,
            komoku0: '加算情報',
            komoku1: '体制＋個別',
            komoku2: '0123456789',
        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 1,
            komoku0: '加算情報',
            komoku1: '体制＋個別',
            komoku2: '重度障碍者支援加算',
        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 1,
            komoku0: '加算情報',
            komoku1: '体制＋個別',
            komoku2: '栄養マネジメント加算',
        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 1,
            komoku0: '加算情報',
            komoku1: '体制＋個別',
            komoku2: '療養食加算',
            day5: '〇',
            day7: '〇',
            day8: '〇',
            day9: '〇',
            day10: '〇',
            kei: 18,
        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 1,
            komoku0: '加算情報',
            komoku1: '体制＋個別',
            komoku2: '口腔衛星管理加算',
        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 2,
            komoku0: '加算情報',
            komoku1: '個別',
            komoku2: '入院外泊時加算',
        });
        views.push({
            kmkkbn1: 2,
            mstkasanh0: 2,
            komoku0: '加算情報',
            komoku1: '個別',
            komoku2: '地域以降加算',
        });

        let viewdata = [];
        for (let i = 0; i < views.length; i++) {
            // 食事・光熱水費の金額をkomoku3に追記する
            if (views[i].kmkkbn2 === 3 || views[i].kmkkbn2 === 4) {
                views[i].komoku3 += ' @' + views[i].kmkkbn6 + '/回';
            }
            // 入院・退院日用のデータを作成
            if (views[i].nyugai_inf) {
                let nyugai_inf = views[i].nyugai_inf;
                let nyuuinbi = [];
                let nyuuinbi_st = [];
                let nyuuinbi_ed = [];
                let nyuuinbi_box_date = [];
                for (let i = 0; i < nyugai_inf.length; i++) {
                    // 入院・退院日用のデータ
                    if (nyugai_inf[i].kbn === 1 || nyugai_inf[i].kbn === 2) {
                        // 日付のloop作成
                        let start = nyugai_inf[i].ngsymd;
                        // 開始日が今月ではないとき 開始日を今月の1日にする
                        if (
                            moment(nyugai_inf[i].ngsymd).format('MM') !=
                            moment().format('MM')
                        ) {
                            start = moment().startOf('month').format('YYYYMMDD');
                        }
                        let end = nyugai_inf[i].ngeymd;
                        for (let dd = start; dd <= end; dd++) {
                            // 日付取得
                            let day = moment(dd.toString()).format('D');
                            if (dd == start) {
                                nyuuinbi_st.push(day);
                            } else if (dd == end) {
                                nyuuinbi_ed.push(day);
                            } else {
                                nyuuinbi.push(day);
                            }
                        }
                        let boxdate =
                            moment(nyugai_inf[i].ngsymd).format('M/D') +
                            '～' +
                            moment(nyugai_inf[i].ngeymd).format('M/D') +
                            '[' +
                            nyugai_inf[i].nissu +
                            ']';
                        let startKey = moment(start).format('D');
                        nyuuinbi_box_date.push({
                            num: i,
                            startKey: startKey,
                            date: boxdate,
                            kbn: nyugai_inf[i].kbn,
                        });
                    }
                }
                views[i].nyuuinbi_st = nyuuinbi_st;
                views[i].nyuuinbi_ed = nyuuinbi_ed;
                views[i].nyuuinbi_box_date = nyuuinbi_box_date;
                views[i].nyuuinbi = nyuuinbi;
            }

            viewdata.push(views[i]);
        }


        views = viewdata;
        returns = {
            status: 'idle',
            riyo_inf: views
        };
        return returns;
    });
}