let icrn_inf = []
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    icrn_inf = [];
    let userCount = 100;
    // ★Date型はmonthが0-11で表現されることに注意
    let kankaku = true;
    let kasanList = [{
        val: 0,
        kbn: 0,
        name: '指定なし'
      },
      {
        val: 1,
        kbn: 1,
        name: '夜間職員配置体制加算'
      },
      {
        val: 2,
        kbn: 1,
        name: '重度障害者支援加算Ⅰ'
      },
      {
        val: 3,
        kbn: 1,
        name: '夜間看護体制加算'
      },
      {
        val: 4,
        kbn: 1,
        name: '視覚・聴覚等支援体制加算'
      },
      {
        val: 5,
        kbn: 1,
        name: '地域生活移行個別支援加算'
      },
      {
        val: 6,
        kbn: 1,
        name: '口腔衛生管理体制加算'
      },
      {
        val: 7,
        kbn: 1,
        name: '処遇改善加算Ⅰ'
      },
      {
        val: 8,
        kbn: 1,
        name: '処遇改善特別加算'
      },
      {
        val: 9,
        kbn: 1,
        name: '特定処遇改善加算'
      },
      {
        val: 10,
        kbn: 2,
        name: '入所時特別支援加算'
      },
      {
        val: 11,
        kbn: 2,
        name: '入院・外泊時加算Ⅰ'
      },
      {
        val: 12,
        kbn: 2,
        name: '入院・外泊時加算Ⅱ'
      },
      {
        val: 13,
        kbn: 2,
        name: '経口維持加算Ⅰ'
      },
      {
        val: 14,
        kbn: 2,
        name: '口腔衛生管理加算'
      },
      {
        val: 15,
        kbn: 2,
        name: '栄養マネジメント加算'
      },
    ];
    for (let i = 0; i < userCount; i++) {
      if (i % 2 == 0) {
        icrn_inf.push({
          id: i,
          no: String(Math.floor(Math.random() * 10000000000) + 1).padStart(
            10,
            '0'
          ),
          err: require('@/assets/kaku_15px.png'),
          name: '東経太郎' + i,
          kana: 'トウケイタロウ' + i,
          useymd: String(99),
          nyuinymd: String(99),
          gaihakuymd: String(99),
          kbn: 1,
          isNyusyo: false,
          isTaisyo: false,
        });
        if (kankaku) {
          icrn_inf[i].err = require('@/assets/kaku_15px.png');
          kankaku = false;
        } else {
          icrn_inf[i].err = '';
          kankaku = true;
        }
        if (i < 10) {
          icrn_inf[i].isNyusyo = true;
        } else if (i < 20) {
          icrn_inf[i].isTaisyo = true;
        }
      } else {
        icrn_inf.push({
          id: i - 1,
          no: icrn_inf[i - 1].no,
          name: '(' + icrn_inf[i - 1].no + ')',
          kana: icrn_inf[i - 1].kana,
          useymd: '',
          nyuinymd: '',
          gaihakuymd: '',
          kbn: 2,
          isNyusyo: icrn_inf[i - 1].isNyusyo,
          isTaisyo: icrn_inf[i - 1].isTaisyo,
        });

      }
      // 動的に加算のプロパティを作成
      for (let kasan = 0; kasan < kasanList.length; kasan++) {
        if (kasanList[kasan].val == 0) {
          continue;
        }
        if (i % 2 == 0) {
          icrn_inf[i][String(kasanList[kasan].val)] = Number(Math.floor(Math.random() * 100));
        } else {
          icrn_inf[i][String(kasanList[kasan].val)] = Number(Math.floor(Math.random() * 10000));
        }
      }
    }

    return icrn_inf;
  }
}