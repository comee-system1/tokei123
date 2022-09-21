<template>
  <div id="connectSIENP">
    <h2>API接続テスト</h2>
    <v-card class="pl-2">
      <h3>SIENP</h3>
      <div class="mb-2">アセスメント履歴を取得=>{{ asesReki }}</div>
      <div class="mb-2">週間計画項目一覧マスタ取得=>{{ week_kmk }}</div>
      <div class="mb-2">その他事業所マスタ取得>{{ sonota_jigyo }}</div>
      <div class="mb-2">
        アセスメント特記文章マスタ取得>{{ bunsyo_hojo_ases }}
      </div>
      <div class="mb-2">計画表文章マスタ取得>{{ bunsyo_hojo_keikaku }}</div>
      <div class="mb-2">
        計画表文章マスタ取得(一括登録)>{{ bunsyo_hojo_keikakuikt }}
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
// let mstfstid = 1;
// let kubun = 1;

export default {
  data() {
    return {
      // SIENP
      // ニーズ整理項目名
      needs_name: '未接続',
      post_needs_name: '',
      put_needs_name: '',
      ases: '未接続',
      post_ases: '',
      put_ases: '',
      delete_ases: '',
      asesReki: '未接続',
      week_kmk: '未接続',
      sonota_jigyo: '未接続',
      bunsyo_hojo_ases: '未接続',
      bunsyo_hojo_keikaku: '未接続',
      bunsyo_hojo_keikakuikt: '未接続',

      params: {},
      inputParams: {},
    };
  },
  mounted() {
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 5,
    };
    // this.getData1(
    //   '/MstNeedsName',
    //   'sodan/v1/mst/needs-name ニーズ整理項目名を取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      jigyoid: 5,
      chusyutuTitle: '課題',
      colList: [
        {
          kbn: 1,
          title: '登録テスト1',
          honinKiboFlg: 1,
          kazokuKiboFlg: 1,
          needsCopyFlg: 1,
        },
        {
          kbn: 2,
          title: '登録テスト1',
          honinKiboFlg: 1,
          kazokuKiboFlg: 1,
          needsCopyFlg: 1,
        },
        {
          kbn: 3,
          title: '登録テスト1',
          honinKiboFlg: 1,
          kazokuKiboFlg: 1,
          needsCopyFlg: 1,
        },
      ],
    };
    // this.getPost1(
    //   '/MstNeedsName',
    //   'sodan/v1/mst/needs-name  ニーズ整理項目名新規登録'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      jigyoid: 5,
      chusyutuTitle: '更新',
      colList: [
        {
          kbn: 1,
          title: '更新',
          honinKiboFlg: 1,
          kazokuKiboFlg: 1,
          needsCopyFlg: 1,
        },
        {
          kbn: 2,
          title: '更新',
          honinKiboFlg: 1,
          kazokuKiboFlg: 1,
          needsCopyFlg: 1,
        },
        {
          kbn: 3,
          title: '更新',
          honinKiboFlg: 1,
          kazokuKiboFlg: 1,
          needsCopyFlg: 1,
        },
      ],
    };
    // this.getPut1(
    //   '/MstNeedsName',
    //   'sodan/v1/mst/needs-name  ニーズ整理項目名更新登録'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      jigyoid: 1,
      dataList: [
        {
          daiid: 1,
          kibokbn: 1,
          needskbn: 1,
        },
      ],
    };
    // this.getPost1(
    //   '/MstNeedsSeiri',
    //   'sodan/v1/mst/needs-seiri/{mstfstid} 区分別ニーズ整理入力単位新規登録'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      jigyoid: 1,
      dataList: [
        {
          daiid: 1,
          kibokbn: 1,
          needskbn: 1,
        },
      ],
    };
    // this.getPut1(
    //   '/MstNeedsSeiri',
    //   'sodan/v1/mst/needs-seiri/{mstfstid} 区分別ニーズ整理入力単位更新'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 2,
      pJigyoid: 1,
    };
    // this.inputParams = {};
    // this.getData1(
    //   '/MstAses',
    //   'sodan/v1/mst/ases 区分別アセスメント項目マスタ一覧を取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 2,
      bunrui: 1,
    };
    this.inputParams = {
      daiKmk: {
        daidcod: 2,
        dainame: '登録テスト',
        dairyaku1: '登録テスト',
        dairyaku2: '登録テスト',
        daikigo: '1',
        riyoflg: 0,
      },
      tyuKmk: {
        tyudcod: 1,
        tyuname: '食事・水分',
        tyuryaku: '食事・水分',
        tyukigo: '1',
        notdspflg: 0,
        koteiflg: 0,
        koteiid: 1,
        tokinsflg: 0,
        // 大項目のどのIDにPushするか判断する値
        daiid: 1,
      },
      syoKmk: {
        syodcod: 1,
        syoname: '食事行為',
        syoryaku: '食事行為',
        syokigo: '1',
        senkbn: 0,
        option1: 0,
        syosu: 1,
        daichoid: 1,
        horizontal: 0,
        pos: 0,
        simid: 1,
        kigoflg: 0,
        jigyoid: 6,
        daiid: 1,
        tyuid: 1,
      },
    };
    // this.getPost1(
    //   '/MstAses',
    //   'sodan/v1/mst/ases 区分別アセスメント項目マスタ新規登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 2,
      bunrui: 1,
    };
    this.inputParams = {
      daiKmk: {
        daidcod: 6,
        dainame: '更新２２',
        dairyaku1: '更新２２',
        dairyaku2: '更新２２',
        daikigo: '1',
        riyoflg: 0,
        daiid: 1,
      },
      tyuKmk: {
        tyudcod: 1,
        tyuname: '食事・水分',
        tyuryaku: '食事・水分',
        tyukigo: '1',
        notdspflg: 0,
        koteiflg: 0,
        koteiid: 1,
        tokinsflg: 0,
        tyuid: 1,
      },
      syoKmk: {
        syodcod: 1,
        syoname: '食事行為',
        syoryaku: '食事行為',
        syokigo: '1',
        senkbn: 0,
        option1: 0,
        syosu: 1,
        daichoid: 1,
        horizontal: 0,
        pos: 0,
        simid: 1,
        kigoflg: 0,
        jigyoid: 1,
        syoid: 1,
      },
    };

    // this.getPut1(
    //   '/MstAses',
    //   'sodan/v1/mst/ases 区分別アセスメント項目マスタ更新登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 2,
      bunrui: 1,
      // 削除する分類 の内部ID
      pId: 6,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstAses',
    //   'sodan/v1/mst/ases 区分別アセスメント項目マスタ削除'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 2,
    };
    // this.getData1(
    //   '/MstAsesReki',
    //   'sodan/v1/mst/ases-reki アセスメント履歴を取得'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      jigyoid: 2,
      symd: '20011212',
      kbnNcod: 10,
    };
    // this.getPost1(
    //   '/MstAsesReki',
    //   ' sodan/v1/mst/ases-reki アセスメント履歴新規登録'
    // );
    this.inputParams = {
      jigyoid: 2,
      mstfstid: 106,
      symd: '20001111',
    };
    // this.getPut1(
    //   '/MstAsesReki',
    //   ' sodan/v1/mst/ases-reki アセスメント履歴更新登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 43,
      pMstfstid: 1,
    };
    // this.getDelete1(
    //   '/MstAsesReki',
    //   ' sodan/v1/mst/ases-reki  アセスメント履歴削除'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 107,
      kbn: 10,
      ymd: '20001201',
    };
    this.inputParams = {
      pJigyoid: 2,
    };
    // MstAses_rekiCopy
    // this.getPost1(
    //   '/MstAsesRekiCopy',
    //   ' sodan/v1/mst/ases-reki/copy アセスメント履歴コピー'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      jigyoid: 1,
      dcod: 5,
      names: '標準5',
      ryaku: '標準5',
      kigo: '標',
      sygkbn: 0,
    };
    // this.getPost1(
    //   '/MstAsesKbn',
    //   ' sodan/v1/mst/ases-kbn アセスメント区分新規登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      jigyoid: 1,
      ncod: 5,
      dcod: 4,
      names: '更新',
      ryaku: '更新',
      kigo: '票',
      sygkbn: 0,
    };
    // this.getPut1(
    //   '/MstAsesKbn',
    //   ' sodan/v1/mst/ases-kbn アセスメント区分更新登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 1,
      pNcod: 6,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstAsesKbn',
    //   ' sodan/v1/mst/ases-kbn アセスメント区分削除'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      chkdcod: 30,
      chkname: '自立',
      chkryaku: '自立',
      chkkigo: '1',
      needsflg: 0,
      tokflg: 0,
      renid: 1,
      renmulti: 0,
      syoid: 1,
    };
    // this.getPost1(
    //   '/MstAsesChk',
    //   ' sodan/v1/mst/ases-chk アセスメントチェック項目新規登録'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      chkdcod: 30,
      chkname: '自立',
      chkryaku: '自立',
      chkkigo: '1',
      needsflg: 0,
      tokflg: 0,
      renid: 1,
      renmulti: 0,
      chkid: 1,
    };
    // this.getPut1(
    //   '/MstAsesChk',
    //   ' sodan/v1/mst/ases-chk アセスメントチェック項目更新'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
      pJigyoid: 1,
      pChkid: 30,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstAsesChk',
    //   ' sodan/v1/mst/ases-chk アセスメントチェック項目項目の削除'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      tokdcod: 1,
      tokname: '自立',
      tokryaku: '自立',
      tokkigo: '1',
      horizontal: 0,
      pos: 0,
      simid: 1,
      daiid: 1,
      tyuid: 1,
    };
    // this.getPost1(
    //   '/MstAsesTok',
    //   ' sodan/v1/mst/ases-tok  地域相談支援-アセスメント特記項目新規登録'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
    };
    this.inputParams = {
      tokdcod: 1,
      tokname: '自立',
      tokryaku: '自立',
      tokkigo: '1',
      horizontal: 0,
      pos: 0,
      simid: 1,
      tokid: 1,
    };
    // this.getPut1(
    //   '/MstAsesTok',
    //   ' sodan/v1/mst/ases-tok  地域相談支援-アセスメント特記項目更新'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      mstfstid: 1,
      pTokid: 1,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstAsesTok',
    //   ' sodan/v1/mst/ases-tok  地域相談支援-アセスメント特記項目項目の削除'
    // );
    // ----------------------------

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 1,
    };
    this.inputParams = {};
    // MstWeek_kmk
    // this.getData1(
    //   '/MstWeekKmk',
    //   ' sodan/v1/mst/week-kmk  週間計画項目一覧マスタ取得'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      bunrui: 1,
    };
    this.inputParams = {
      jigyoid: 1,
      intcode: 2,
      vcode: 2,
      kmkname: '登録テスト',
      ryaku: '登録テスト',
      delflg: 0,
      daiintcode: 2,
      bcolor: 0,
      fcolor: 0,
      week1: 1,
      week2: 1,
      week3: 1,
      week4: 1,
      week5: 1,
      week6: 1,
      week7: 1,
      stime: '09:00',
      etime: '15:00',
    };
    // this.getPost1(
    //   '/MstWeekKmk',
    //   ' sodan/v1/mst/week-kmk{bunrui} 週間計画項目一覧マスタの新規登録'
    // );
    this.inputParams = {
      jigyoid: 1,
      intcode: 1,
      vcode: 1,
      kmkname: '大項目の名称',
      ryaku: '大項目の略称',
      delflg: 0,
      daiintcode: 1,
      bcolor: 0,
      fcolor: 0,
      week1: 1,
      week2: 1,
      week3: 1,
      week4: 1,
      week5: 1,
      week6: 1,
      week7: 1,
      stime: '09:00',
      etime: '15:00',
    };
    // this.getPut1(
    //   '/MstWeekKmk',
    //   ' sodan/v1/mst/week-kmk{bunrui} 週間計画項目一覧マスタの更新登録
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      bunrui: 1,
    };
    this.inputParams = {
      pJigyoid: 1,
      pintcode: 2,
    };
    // this.getDelete1(
    //   '/MstWeekKmk',
    //   ' sodan/v1/mst/week-kmk{bunrui}  週間計画項目一覧マスタの削除'
    // );

    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pJigyoid: 1,
    };
    this.inputParams = {};
    // this.getData1(
    //   '/MstSonotaJigyo',
    //   ' sodan/v1/mst/sonota-jigyo その他事業所マスタ取得'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      // 後にjigyoidに修正
      entpriid: 1,
      ncode: 2,
      dcode: 2,
      kbn: 1,
      names: '登録',
      ryaku: '登録',
      kana: 'フリガナ',
      post_no1: '123',
      post_no2: '5678',
      address: '○○県・・・',
      tel1: '0124',
      tel2: '56',
      tel3: '7890',
      fax1: '0124',
      fax2: '56',
      fax3: '7890',
      delflg: 0,
    };
    // this.getPost1(
    //   '/MstSonotaJigyo',
    //   ' sodan/v1/mst/sonota-jigyo その他事業所マスタ新規'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = {
      // 後にjigyoidに修正
      entpriid: 1,
      ncode: 2,
      dcode: 2,
      kbn: 1,
      names: '更新',
      ryaku: '更新',
      kana: 'フリガナ',
      post_no1: '123',
      post_no2: '5678',
      address: '○○県・・・',
      tel1: '0124',
      tel2: '56',
      tel3: '7890',
      fax1: '0124',
      fax2: '56',
      fax3: '7890',
      delflg: 0,
    };
    // this.getPut1(
    //   '/MstSonotaJigyo',
    //   ' sodan/v1/mst/sonota-jigyo その他事業所マスタ新規'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      pjigyoid: 1,
      pncode: 2,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstSonotaJigyo',
    //   ' sodan/v1/mst/sonota-jigyo その他事業所マスタ削除'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
      mstfstid: 1,
      pJigyoid: 43,
    };
    this.inputParams = {};
    // this.getData1(
    //   '/MstBunsyoHojoAses',
    //   'sodan/v1/mst/bunsyo-hojo/ases アセスメント特記文章マスタ取得'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
    };
    this.inputParams = {
      jigyoid: 43,
      ncode: 4,
      dcode: 4,
      naiyo: '登録',
    };
    // this.getPost1(
    //   '/MstBunsyoHojoAses',
    //   'sodan/v1/mst/bunsyo-hojo/ases アセスメント特記文章マスタの新規登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
    };
    this.inputParams = {
      jigyoid: 43,
      ncode: 4,
      dcode: 4,
      naiyo: '更新',
    };
    // this.getPut1(
    //   '/MstBunsyoHojoAses',
    //   'sodan/v1/mst/bunsyo-hojo/ases アセスメント特記文章マスタの更新登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
      pJigyoid: 43,
      pncode: 4,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstBunsyoHojoAses',
    //   'sodan/v1/mst/bunsyo-hojo/ases アセスメント特記文章マスタの削除'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
      mstfstid: 1,
      pJigyoid: 43,
    };
    this.inputParams = {};
    // this.getData1(
    //   '/MstBunsyoHojoKeikaku',
    //   'sodan/v1/mst/bunsyo-hojo/keikaku 計画表文章マスタ取得'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      bunrui: 1,
      mstfstid: 1,
    };
    this.inputParams = {
      jigyoid: 43,
      wordid: 1,
      scrkbn: 1,
      code: 1,
      word: '計画表文章',
      mword: '見出し文章',
      sortdate: '20220404',
      sortcnt: 1,
      daiid: 1,
      tyuid: 1,
    };
    // this.getPost1(
    //   '/MstBunsyoHojoKeikaku',
    //   'sodan/v1/mst/bunsyo-hojo/keikaku  計画表文章マスタ新規登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      bunrui: 1,
      mstfstid: 0,
      pwordid: 87,
      pjigyoid: 43,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstBunsyoHojoKeikaku',
    //   'sodan/v1/mst/bunsyo-hojo/keikaku  計画表文章マスタ削除'
    // );
    // this.getPost1(
    //   '/MstBunsyoHojoKeikaku',
    //   'sodan/v1/mst/bunsyo-hojo/keikaku  計画表文章マスタ新規登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      bunrui: 1,
      mstfstid: 0,
      pwordid: 87,
      pjigyoid: 43,
    };
    this.inputParams = {};
    // this.getDelete1(
    //   '/MstBunsyoHojoKeikaku',
    //   'sodan/v1/mst/bunsyo-hojo/keikaku  計画表文章マスタ削除'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
      kubun: 1,
      mstfstid: 1,
      pJigyoid: 43,
    };
    this.inputParams = {};
    // this.getData1(
    //   '/MstBunsyoHojoKeikakuikt',
    //   'sodan/v1/mst/bunsyo-hojo/keikakuikt 計画表文章マスタ取得'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = [
      {
        jigyoid: 43,
        wordid: 1,
        mstfstid: 1,
        daiid: 1,
        tyuid: 1,
      },
    ];
    // this.getPost1(
    //   '/MstBunsyoHojoKeikakuikt',
    //   'sodan/v1/mst/bunsyo-hojo/keikakuikt  計画表文章マスタ新規登録'
    // );
    this.params = {
      uniqid: uniqid,
      traceid: traceid,
    };
    this.inputParams = [
      {
        jigyoid: 1,
        wordid: 1,
        mstfstid: 1,
        daiid: 2,
        tyuid: 1,
      },
    ];
    // this.getPut1(
    //   '/MstBunsyoHojoKeikakuikt',
    //   'sodan/v1/mst/bunsyo-hojo/keikakuikt  計画表文章マスタ新規登録'
    // );
  },
  methods: {
    async getDelete1(path, msg) {
      let params = this.params;
      let inputParams = this.inputParams;

      deleteConnect(path, params, 'SIENP', inputParams).then((result) => {
        console.log(msg);
        console.log(result);
        return result;
      });
    },
    async getPut1(path, msg) {
      let params = this.params;
      let inputParams = this.inputParams;

      putConnect(path, params, 'SIENP', inputParams).then((result) => {
        console.log(msg);
        console.log(result);
        return result;
      });
    },
    async getPost1(path, msg) {
      let params = this.params;
      let inputParams = this.inputParams;

      postConnect(path, params, 'SIENP', inputParams).then((result) => {
        console.log(msg);
        console.log(result);
        return result;
      });
    },
    async getData1(path, msg) {
      let params = this.params;
      getConnect(path, params, 'SIENP').then((result) => {
        console.log(msg);
        console.log(result);
        return result;
      });
    },
  },
};
</script>