let icrn_inf = []
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    icrn_inf = [];
    let userCount = 100;
    // ★Date型はmonthが0-11で表現されることに注意
    for (let i = 0; i < userCount; i++) {
      icrn_inf.push({
        id: i,
        err: '',
        no: String(Math.floor(Math.random() * 10000000000) + 1).padStart(
          10,
          '0'
        ),
        nobk: 0,
        name: '東経太郎' + i,
        kana: 'トウケイタロウ' + i,
        koufuymd: new Date('2015', Number('04') - 1, '26'),
        engo: '第一東経市',
        jitibangou: '',
        jyukyukbn: '',
        jyukyuname: '',
        syougaisyu: '2',
        syougaisienkbn: '3',
        futanjyougen: Number(Math.floor(Math.random() * 100) + '000') + 100,
        jyougenumu: '有',
        jyougenumuval: true,
        jyougenkanri:
          '上限管理事業所　 ' + Math.floor(Math.random() * 10) + 1,
        syokujiteikyo: '4',
        tokubetukyufu: Number(Math.floor(Math.random() * 10) + '000') + 100,
        syusei: '',
        nyushoymd: '',
        taisyoymd: '',
        isnyusho: false,
        istaisyo: false,
      });
      icrn_inf[i].nobk = icrn_inf[i].no;
      if (i % 2 == 1) {
        icrn_inf[i].err = '';
        icrn_inf[i].syusei = '';
      } else {
        if (i == 4) {
          icrn_inf[i].id = icrn_inf[i - 1].id;
          icrn_inf[i].no = icrn_inf[i - 1].no;
          icrn_inf[i].nobk = icrn_inf[i - 1].no;
          icrn_inf[i].name = icrn_inf[i - 1].name;
          icrn_inf[i].kana = icrn_inf[i - 1].kana;
          icrn_inf[i].koufuymd = new Date('2020', Number('04') - 1, '27');
          icrn_inf[i].jitibangou = String(
            '9000' + Math.floor(Math.random() * 10) + 1
          );
        }
        if (i % 3 == 0) {
          icrn_inf[i].err = require('@/assets/error_20px.png');
          icrn_inf[i].koufuymd = '';
          icrn_inf[i].engo = '';
          icrn_inf[i].jitibangou = '';
          icrn_inf[i].jyukyukbn = '';
          icrn_inf[i].jyukyuname = '';
          icrn_inf[i].syougaisyu = '';
          icrn_inf[i].syougaisienkbn = '';
          icrn_inf[i].futanjyougen = '';
          if (i == 12) {
            icrn_inf[i].jyougenumu = '';
            icrn_inf[i].jyougenumuval = false;
          }
          icrn_inf[i].jyougenkanri = '';
          icrn_inf[i].syokujiteikyo = '';
          icrn_inf[i].tokubetukyufu = '';
          icrn_inf[i].syusei = '○';
        } else {
          if (i == 10) {
            // 年月が一致しているデータのフラグを立てる
            // icrn_inf = icrn_inf.filter((x) =>
            //   x.nyushoymd.startsWith(
            //     currentDate.getFullYear() +
            //       ('00' + (currentDate.getMonth() + 1)).slice(-2)
            //   )
            // );
            icrn_inf[i].isnyusho = true;
          }
          if (i == 14) {
            icrn_inf[i].istaisyo = true;
          }
        }
      }
    }

    return icrn_inf;
  }
}