<template>
  <div id="connectTest">
    <h2>API接続テスト</h2>
    <v-card class="pl-2">
      <h3>SIENC</h3>
      <div class="mb-2">ケース項目マスタ取得=>{{ case0 }}</div>
      <div class="mb-2">ケース内容定型文章マスタの検索=>{{ case_teikei }}</div>
      <div class="mb-2">委託先マスタ取得=>{{ itaku }}</div>
      <div class="mb-2">
        地域相談支援-区分別アセスメント項目マスタ一覧を取得=>{{ chiki_ases }}
      </div>
      <div class="mb-2">
        地域相談支援-アセスメント履歴を取得=>{{ chiki_ases_reki }}
      </div>
      <div class="mb-2">
        地域相談支援- アセスメント表示項目設定取得=>{{ ases_hyouji }}
      </div>
    </v-card>
  </div>
</template>
<script>
// ApiConnectフォルダで使用の場合
import { getConnect } from '../../../../connect/getConnect';
import { postConnect } from '../../../../connect/postConnect';
import { putConnect } from '../../../../connect/putConnect';
import { deleteConnect } from '../../../../connect/deleteConnect';
// viewsフォルダのファイルでは以下を使用
// import { getConnect } from '@connect/getConnect';
// import { postConnect } from '@connect/postConnect';
// import { putConnect } from '@connect/putConnect';
// import { deleteConnect } from '@connect/deleteConnect';
let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;
let pJigyoid = 43;

export default {
  data() {
    return {
      // SIENC
      case0: '未接続',
      case_teikei: '未接続',
      itaku: '未接続',
      chiki_ases: '未接続',
      chiki_ases_reki: '未接続',
      ases_hyouji: '未接続',
      params: {},
      inputParams: {},
    };
  },
  mounted() {
    /**
     * SIENC
     */
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: pJigyoid,
    };
    // this.getData1('/MstCase', 'ケース項目マスタ取得:/sodan/v1/mst/case/');

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      syurui: 6,
      bunrui: 1,
    };

    this.inputParams = {
      jigyoid: 43,
      cskmkid: 1,
      code: 1,
      names: '名称',
      ryaku: '略称',
      csjknid: 0,
      koteiflg: 0,
      daicskmk: 1,
      color: 1,
      syukflg: 1,
      yukoflg: 1,
      nikeiflg: 1,
      cssaiid: 1,
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0,
      r5: 0,
    };
    // this.getPost1(
    //   '/MstCase',
    //   ' sodan/v1/mst/case{syurui}/{bunruni} ケース項目マスタ新規登録'
    // );

    // this.getPut1(
    //   '/MstCase',
    //   ' sodan/v1/mst/case{syurui}/{bunruni} ケース項目項目マスタ更新登録'
    // );

    // this.inputParams = {
    //   jigyoid: 1,
    //   cskmkid: 1,
    //   cssaiid: 1,
    // };
    // this.getDelete1(
    //   '/MstCase',
    //   ' sodan/v1/mst/case{syurui}/{bunruni}  ケース項目マスタ削除登録'
    // );

    /////////////////////////////////////////////

    // this.getData1(
    //   '/MstCaseTeikei',
    //   'ケース内容定型文章マスタの検索:/sodan/v1/mst/case-teikei/'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };

    this.inputParams = {
      jigyoid: 43,
      id: 128,
      word: '14',
      flg1: 1,
      flg2: 0,
      flg3: 0,
      flg4: 0,
      flg5: 0,
    };

    // this.getPost1(
    //   '/MstCaseTeikei',
    //   'sodan/v1/mst/case-teikei ケース内容定型文章の新規登録'
    // );

    // this.getPut1(
    //   '/MstCaseTeikei',
    //   'sodan/v1/mst/case-teikei ケース内容定型文章の更新登録'
    // );

    /// 委託先マスタ取得 //////////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };

    // this.getData1('/MstItaku', '委託先マスタ取得:/sodan/v1/mst/itaku/');

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };

    this.inputParams = {
      id: 1,
      code: 1,
      name: '委託先事業所',
      ryaku: '委託先',
      delflg: '0',
    };
    // this.getPost1('/MstItaku', 'sodan/v1/mst/itaku 委託先マスタの新規登録');

    //this.getPut1('/MstItaku', 'sodan/v1/mst/itaku 委託先マスタの更新登録');

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pid: 1,
    };
    this.inputParams = {};
    // this.getDelete1('/MstItaku', 'sodan/v1/mst/itaku 委託先マスタの削除');

    /// 地域相談支援-区分別アセスメント項目マスタ一覧を取得/////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 43,
      mstfstid: 1,
    };
    // this.getData1(
    //   '/MstChikiAses',
    //   'sodan/v1/mst/chiki-ases 地域相談支援-区分別アセスメント項目マスタ一覧を取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      syurui: 6,
      bunrui: 1,
    };

    this.inputParams = {
      jigyoid: 1,
      daiKmk: {
        daiDcod: 1,
        daiName: '日常生活について',
        daiRyaku1: '日常生活',
        daiRyaku2: '日常',
        daiKigo: '1',
        daiSykFlg: 1,
      },
      tyuKmk: {
        tyuDcod: 1,
        tyuName: '食事・水分',
        tyuRyaku: '食事・水分',
        tyuKigo: '1',
        tyuSykFlg: 1,
        tokInsFlg: 0,
        daiID: 1,
      },
      syoKmk: {
        syoDcod: 1,
        syoName: '食事行為',
        syoRyaku: '食事行為',
        syoKigo: '1',
        senKbn: 0,
        option1: 0,
        syosu: 1,
        daiID: 1,
        tyuID: 1,
      },
    };
    // this.getPost1(
    //   '/MstChikiAses',
    //   'sodan/v1/mst/chiki-ases 地域相談支援-区分別アセスメント項目マスタ新規登録'
    // );

    // this.getPut1(
    //   '/MstChikiAses',
    //   'sodan/v1/mst/chiki-ases 地域相談支援-区分別アセスメント項目マスタ更新'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
      bunrui: 1,
    };
    this.inputParams = {
      pJigyoid: 43,
      pId: 1,
    };
    // this.getDelete1(
    //   '/MstChikiAses',
    //   'sodan/v1/mst/chiki-ases 地域相談支援-区分別アセスメント項目マスタ項目の削除'
    // );

    /// アセスメント履歴取得 検索/////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 43,
      pKbn: 1,
    };
    // this.getData1(
    //   '/MstChikiAsesReki',
    //   'ssodan/v1/mst/chiki-ases-reki 地域相談支援-アセスメント履歴を取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };

    this.inputParams = {
      jigyoid: 1,
      symd: '20000101',
      kbn: 1,
    };
    // this.getPost1(
    //   '/MstChikiAsesReki',
    //   'sodan/v1/mst/chiki-ases-reki 地域相談支援-アセスメント履歴新規登録'
    // );

    this.inputParams = {
      jigyoid: 1,
      mstFstID: 1,
      symd: '20000101',
    };

    // this.getPut1(
    //   '/MstChikiAsesReki',
    //   'sodan/v1/mst/chiki-ases-reki 地域相談支援-アセスメント履歴更新'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 43,
      pMstFstID: 1,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstChikiAsesReki',
    //   'sodan/v1/mst/chiki-ases-reki 地域相談支援-アセスメント履歴項目の削除'
    // );

    ///  地域相談支援-アセスメント履歴コピー/////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
      kbn: 1,
      ymd: '20000101',
    };

    this.inputParams = {
      pJigyoid: 43,
    };
    // this.getPost1(
    //   '/MstChikiAsesRekiCopy',
    //   'sodan/v1/mst/chiki-ases-reki 地域相談支援-アセスメント履歴コピー'
    // );

    /// 地域相談支援-アセスメントチェック項目新規登録/////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };

    this.inputParams = {
      chkDcod: 1,
      chkName: '自立',
      chkRyaku: '自立',
      chkKigo: '1',
      point: 1,
      jigyoid: 1,
      syoID: 1,
    };
    // this.getPost1(
    //   '/MstChikiAsesChk',
    //   'sodan/v1/mst/chiki-ases-reki 地域相談支援-アセスメント履歴コピー'
    // );

    // this.getPut1(
    //   '/MstChikiAsesChk',
    //   'sodan/v1/mst/chiki-ases-chk 地域相談支援-アセスメントチェック項目更新'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      pJigyoid: 1,
      pChkid: 1,
    };
    // this.getDelete1(
    //   '/MstChikiAsesChk',
    //   'sodan/v1/mst/chiki-ases-chk 地域相談支援-アセスメントチェック項目項目の削除'
    // );

    ///  地域相談支援-アセスメント特記項目新規登録 /////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };

    this.inputParams = {
      tokDcod: 1,
      tokName: '自立',
      tokRyaku: '自立',
      tokKigo: '1',
      daiID: 1,
      tyuID: 1,
    };
    // this.getPost1(
    //   '/MstChikiAsesTok',
    //   'sodan/v1/mst/chiki-ases-tok 地域相談支援-アセスメント特記項目新規登録'
    // );

    // this.getPut1(
    //   '/MstChikiAsesTok',
    //   'sodan/v1/mst/chiki-ases-tok 地域相談支援-アセスメント特記項目更新'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      pTokid: 1,
    };
    // this.getDelete1(
    //   '/MstChikiAsesTok',
    //   'sodan/v1/mst/chiki-ases-tok 地域相談支援-アセスメント特記項目項目の削除'
    // );

    ///    地域相談支援-区分別アセスメント項目マスタ一覧を取得  /////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      path: {
        mstfstid: 1,
      },
      query: {
        pDaiID: 1,
        pTyuID: '20000101',
        pTokID: 1,
      },
    };
    // @todo データが空で帰ってきたため質問中0915
    // this.getData1(
    //   '/MstChikiAsesTokPtn',
    //   'sodan/v1/mst/chiki-ases-tok/ptn/{mstfstid} 地域相談支援-区分別アセスメント項目マスタ一覧を取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };

    this.inputParams = {
      daiID: 1,
      tyuID: 1,
      tokID: 1,
      tokPtnDcod: 1,
      naiyo: '特記パターン内容',
    };
    // this.getPost1(
    //   '/MstChikiAsesTokPtn',
    //   'sodan/v1/mst/chiki-ases-tok/ptn/{mstfstid} 地域相談支援-アセスメント特記パターン新規登録'
    // );

    this.inputParams = {
      tokPtnID: 1,
      tokPtnDcod: 1,
      naiyo: '特記パターン内容',
    };

    // this.getPut1(
    //   '/MstChikiAsesTokPtn',
    //   'sodan/v1/mst/chiki-ases-tok/ptn/{mstfstid} 地域相談支援-アセスメント特記パターン更新'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      pTokPtnID: 1,
    };
    // this.getDelete1(
    //   '/MstChikiAsesTokPtn',
    //   'sodan/v1/mst/chiki-ases-tok/ptn/{mstfstid} 地域相談支援-アセスメント特記パターン項目の削除'
    // );

    /// sodan/v1/mst/ases/hyouji アセスメント表示項目設定取得 /////////////////////////////////////////

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      path: {
        kubun: 1,
        mstfstid: 1,
      },
      query: {
        pjigyoid: 1,
      },
    };
    // @todo データが空で帰ってきたため質問中0915
    // this.getData1(
    //   '/MstAseshyouji',
    //   'sodan/v1/mst/ases/hyouji アセスメント表示項目設定取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
      mstfstid: 1,
    };

    this.inputParams = [
      {
        jigyoid: 1,
        adlkbn: 1,
        setid: 1,
        daiid: 1,
        tyuid: 1,
        syoid: 1,
        tokid: 1,
        kbn: 1,
      },
    ];
    // this.getPost1(
    //   '/MstAseshyouji',
    //   'sodan/v1/mst/ases/hyouji アセスメント表示項目設定の新規登録'
    // );

    this.getPut1(
      '/MstAseshyouji',
      'sodan/v1/mst/ases/hyouji アセスメント表示項目設定の更新登録'
    );
  },
  methods: {
    async getDelete1(path, msg) {
      let params = this.params;
      let inputParams = this.inputParams;

      deleteConnect(path, params, 'SIENC', inputParams).then((result) => {
        console.log(msg);
        console.log(result);
        if (result !== undefined) {
          this.post_sodantaiou = result;
        } else {
          this.post_sodantaiou = 'failed';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getPut1(path, msg) {
      let params = this.params;
      let inputParams = this.inputParams;

      putConnect(path, params, 'SIENC', inputParams).then((result) => {
        console.log(msg);
        console.log(result);
        if (result !== undefined) {
          this.post_sodantaiou = result;
        } else {
          this.post_sodantaiou = 'failed';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getPost1(path, msg) {
      let params = this.params;
      let inputParams = this.inputParams;

      postConnect(path, params, 'SIENC', inputParams).then((result) => {
        console.log(msg);
        console.log(result);
        if (result !== undefined) {
          this.post_sodantaiou = result;
        } else {
          this.post_sodantaiou = 'failed';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getData1(path, msg) {
      let params = this.params;
      // ケース項目マスタ取得
      getConnect(path, params, 'SIENC').then((result) => {
        console.log(msg);
        console.log(result);
        if (result !== undefined) {
          this.case0 = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
  },
};
</script>
