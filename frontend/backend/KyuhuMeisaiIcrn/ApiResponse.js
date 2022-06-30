let icrn_inf = []
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res,isSeikyugaku) {
    icrn_inf = [];
    let userCount = 102;
    if(isSeikyugaku){
      let cnt = 0;
        for (let i = 0; i < userCount; i++) {
          let codeval = String(i).padStart(7, '0');
          let noval = String(
            Math.floor(Math.random() * 10000000000) + 1
          ).padStart(10, '0');
          icrn_inf.push({
            id: i,
            kakuteiflg: true,
            kakutei: '',
            no: noval,
            nobk: noval,
            kana: 'トウケイタロウ' + i,
            code: codeval,
            dispname: '東経太郎' + i,
            name: '東経太郎' + i,
            futan: Number(Math.floor(Math.random() * 100) + '0000') + 100,
            riyoucnt: '00',
            nyuincnt: '00',
            svccode: '32',
            svcname: '施設入所支援',
            riyounissu: '00',
            kyufutani: Number(Math.floor(Math.random() * 20000)),
            souhiyougaku: Number(Math.floor(Math.random() * 200000)),
            itiwarisoutougaku: Number(Math.floor(Math.random() * 20000)),
            riyousyafutan: Number(Math.floor(Math.random() * 20000)),
            jyougengakuchousei: Number(Math.floor(Math.random() * 20000)),
            jigyousyagenmen: Number(Math.floor(Math.random() * 20000)),
            genmenriyousya: Number(Math.floor(Math.random() * 20000)),
            chouseiriyousya: Number(Math.floor(Math.random() * 20000)),
            jyougenkanrifutangaku: Number(Math.floor(Math.random() * 20000)),
            ketteiriyoufutangaku: Number(Math.floor(Math.random() * 20000)),
            kyufuhi: Number(Math.floor(Math.random() * 20000)),
            jititaijyosei: Number(Math.floor(Math.random() * 20000)),
            kyufuhiseikyugaku: Number(Math.floor(Math.random() * 200000)),
            jippisaneigaku: Number(Math.floor(Math.random() * 20000)),
            usersortorder: cnt,
            istotalrow: false,
          });
          cnt = cnt + 1;
          if (cnt == 3) {
            cnt = 0;
          }

          if (icrn_inf[i].usersortorder == 0) {
            icrn_inf[i].kakuteiflg = true;
          } else if (icrn_inf[i].usersortorder == 2) {
            icrn_inf[i].name = icrn_inf[i - 1].name;
            icrn_inf[i].id = icrn_inf[i - 1].id;
            icrn_inf[i].kana = icrn_inf[i - 1].kana;
            icrn_inf[i].code = icrn_inf[i - 1].code;
            icrn_inf[i].no = icrn_inf[i - 1].no;
            icrn_inf[i].nobk = icrn_inf[i - 1].no;
            icrn_inf[i].futan = '';
            icrn_inf[i].riyoucnt = '';
            icrn_inf[i].nyuincnt = '';

            icrn_inf[i].svccode = '';
            icrn_inf[i].svcname = '計';
            icrn_inf[i].istotalrow = true;
            icrn_inf[i].kyufutani =
              icrn_inf[i - 2].kyufutani + icrn_inf[i - 1].kyufutani;
            icrn_inf[i].souhiyougaku =
              icrn_inf[i - 2].souhiyougaku + icrn_inf[i - 1].souhiyougaku;
            icrn_inf[i].itiwarisoutougaku =
              icrn_inf[i - 2].itiwarisoutougaku +
              icrn_inf[i - 1].itiwarisoutougaku;
            icrn_inf[i].riyousyafutan =
              icrn_inf[i - 2].riyousyafutan +
              icrn_inf[i - 1].riyousyafutan;
            icrn_inf[i].jyougengakuchousei =
              icrn_inf[i - 2].jyougengakuchousei +
              icrn_inf[i - 1].jyougengakuchousei;
            icrn_inf[i].jyougengakuchousei =
              icrn_inf[i - 2].jyougengakuchousei +
              icrn_inf[i - 1].jyougengakuchousei;
            icrn_inf[i].jigyousyagenmen =
              icrn_inf[i - 2].jigyousyagenmen +
              icrn_inf[i - 1].jigyousyagenmen;
            icrn_inf[i].genmenriyousya =
              icrn_inf[i - 2].genmenriyousya +
              icrn_inf[i - 1].genmenriyousya;
            icrn_inf[i].chouseiriyousya =
              icrn_inf[i - 2].chouseiriyousya +
              icrn_inf[i - 1].chouseiriyousya;
            icrn_inf[i].jyougenkanrifutangaku =
              icrn_inf[i - 2].jyougenkanrifutangaku +
              icrn_inf[i - 1].jyougenkanrifutangaku;
            icrn_inf[i].ketteiriyoufutangaku =
              icrn_inf[i - 2].ketteiriyoufutangaku +
              icrn_inf[i - 1].ketteiriyoufutangaku;
            icrn_inf[i].kyufuhi =
              icrn_inf[i - 2].kyufuhi + icrn_inf[i - 1].kyufuhi;
            icrn_inf[i].jititaijyosei =
              icrn_inf[i - 2].jititaijyosei +
              icrn_inf[i - 1].jititaijyosei;
            icrn_inf[i].kyufuhiseikyugaku =
              icrn_inf[i - 2].kyufuhiseikyugaku +
              icrn_inf[i - 1].kyufuhiseikyugaku;
            icrn_inf[i].jippisaneigaku =
              icrn_inf[i - 2].jippisaneigaku +
              icrn_inf[i - 1].jippisaneigaku;
            icrn_inf[i].usersortorder = 2;
          } else if (icrn_inf[i].usersortorder == 1) {
            icrn_inf[i].name = icrn_inf[i - 1].name;
            icrn_inf[i].id = icrn_inf[i - 1].id;
            icrn_inf[i].kana = icrn_inf[i - 1].kana;
            icrn_inf[i].code = icrn_inf[i - 1].code;
            icrn_inf[i].no = icrn_inf[i - 1].no;
            icrn_inf[i].nobk = icrn_inf[i - 1].no;
            icrn_inf[i].futan = '';
            icrn_inf[i].riyoucnt = '';
            icrn_inf[i].nyuincnt = '';
            icrn_inf[i].svccode = '22';
            icrn_inf[i].svcname = '生活介護';
            icrn_inf[i].usersortorder = 1;
          }
        }
    } else {
      let n = '';
      let k = '';
      let s = '';
      let noval = 0;
      let codeval = 0;
      for (let i = 0; i < userCount; i++) {
        var result1 = Number(String(i).substr(-1));
        if (result1 == 0) {
          n = '東経太郎' + i;
          k = 'トウケイタロウ' + i;
          noval = String(
            Math.floor(Math.random() * 10000000000) + 1
          ).padStart(10, '0');
          codeval = String(i).padStart(7, '0');
        }
        if (result1 < 5) {
          s = '32';
        } else {
          s = '22';
        }

        icrn_inf.push({
          id: i,
          kakuteiflg: true,
          kakutei: '',
          name: n,
          kana: k,
          code: codeval,
          dispsvc: s,
          svc: s,
          symd: new Date('2015', Number('04') - 1, '26'),
          eymd: new Date('2020', Number('04') - 1, '26'),
          dsymd: new Date('2015', Number('04') - 1, '26'),
          deymd: new Date('2020', Number('04') - 1, '26'),
          riyounissuu: '00',
          nyuinnissu: '00',
          svcnaiyou: 'サービス内容ああああああああああああああ' + i,
          no: noval,
          svccode: s + String(i).padStart(4, '0'),
          tani: Number(Math.floor(Math.random() * 10000)),
          kaisu: '00',
          svctani: Number(Math.floor(Math.random() * 20000)),
          tekiyou: '摘要内容○○○○○○○○○○○○○○○○',
        });
      }
    }

    return icrn_inf;
  }
}