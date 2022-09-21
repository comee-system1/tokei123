<template>
  <div id="connectTest">
    <h2>API接続テスト</h2>
    <h3>SIENT</h3>
    <v-card class="pl-2 d-flex" style="flex-wrap: wrap">
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">相談・対応項目マスタ取得接続=>{{ sodantaiou }}</div>
        <div class="d-block">
          <div>相談・対応項目マスタ新規登録=>{{ post_sodantaiou }}</div>
          <div class="d-flex">
            <v-text-field
              v-model="jigyoid_sodantaiou"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postSodanTaiou" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>相談・対応項目マスタ更新登録=>{{ put_sodantaiou }}</div>
          ※namesを更新
          <div class="d-flex">
            <v-text-field
              v-model="put_jigyoid_sodantaiou"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_names"
              label="names"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putSodanTaiou" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>相談・対応項目マスタ削除=>{{ delete_sodantaiou }}</div>
          <div class="d-flex">
            <v-btn @click="deleteSodanTaiou" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">方法マスタ取得=>{{ houhou }}</div>
        <div class="mb-2 d-block">
          <div>方法マスタ新規登録=>{{ post_houhou }}</div>
          <div class="d-flex">
            <v-btn @click="postHouhou" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>方法マスタ更新登録=>{{ put_houhou }}</div>
          ※sdnhounmを更新
          <div class="d-flex">
            <v-text-field
              v-model="put_sdnhounm_houhou"
              label="sdnhounm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putHouhou" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>方法マスタ削除=>{{ delete_houhou }}</div>
          ※sdnhounmを更新
          <div class="d-flex">
            <v-btn @click="deleteHouhou" class="ml-3" small>更新</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">関係マスタ取得=>{{ kankei }}</div>
        <div class="d-block">
          <div>関係マスタ新規登録=>{{ post_kankei }}</div>
          <div class="d-flex">
            <v-btn @click="postKankei" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>関係更新登録=>{{ put_kankei }}</div>
          ※sdnkannmを更新
          <div class="d-flex">
            <v-text-field
              v-model="put_sdnkannm_kankei"
              label="sdnkannm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putKankei" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>関係削除=>{{ delete_kankei }}</div>
          <div class="d-flex">
            <v-btn @click="deleteKankei" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">時刻設定マスタ取得=>{{ jikoku }}</div>
        <div class="mb-2">検印マスタ取得=>{{ kenin }}</div>
        <div class="mb-2">
          集計区分マスタ_サービス区分取得=>{{ syukeikbnren }}
        </div>
        <div class="mb-2">タイトルマスタ取得=>{{ title }}</div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">休日設定取得=>{{ kyujitu }}</div>
        <div>休日マスタ新規登録=>{{ post_kyujitu }}</div>
        <div class="d-flex">
          <v-btn @click="postKyujitu" class="ml-3" small>登録</v-btn>
        </div>
        <div class="mb-2 d-block">
          <div>休日マスタ更新登録=>{{ put_kyujitu }}</div>
          ※日付を更新
          <div class="d-flex">
            <v-text-field
              v-model="put_symd_kyujitu"
              label="symd"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putKyujitu" class="ml-3" small>更新</v-btn>
          </div>
        </div>
      </v-card>
      <v-card style="width: 50%">
        <div class="mb-2">集計条件マスタ取得=>{{ syukeijkn }}</div>
        <div class="mb-2">集計区分マスタ取得=>{{ syukeikbn }}</div>
        <div class="mb-2">集計区分連結マスタ取得=>{{ syukeiren }}</div>
        <div class="mb-2">相談外業務マスタ取得=>{{ soudangai }}</div>
        <div class="mb-2">業務内容マスタ取得=>{{ gyoumu }}</div>
      </v-card>
    </v-card>
    <!-- <v-card class="pl-2">
      <h3>SIENP</h3>
      <div class="mb-2">ニーズ整理項目名を取得=>{{ needs_name }}</div>
      <div class="mb-2">区分別アセスメント項目マスタ一覧を取得=>{{ ases }}</div>
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
    </v-card> -->
  </div>
</template>
<script>
import { getConnect } from '@connect/getConnect';
import { postConnect } from '@connect/postConnect';
import { putConnect } from '@connect/putConnect';
import { deleteConnect } from '@connect/deleteConnect';
let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;
let pJigyoid = 43;
let jigyoid = 43;
let pSymd = '20000101';
let pEymd = '20001231';
let pKbn = 1;
let syurui = 1;
let bunruni = 1;
let nen = 2020;

// SIENP
let mstfstid = 1;
let kubun = 1;
export default {
  data() {
    return {
      // SIENT
      // 相談対応
      sodantaiou: '未接続',
      post_sodantaiou: '未接続',
      jigyoid_sodantaiou: '',
      put_sodantaiou: '未接続',
      put_jigyoid_sodantaiou: '',
      put_names: '',
      delete_sodantaiou: '未接続',
      // 方法
      houhou: '未接続',
      put_sdnhounm_houhou: '',
      post_houhou: '未接続',
      put_houhou: '未接続',
      delete_houhou: '未接続',
      // 関係
      kankei: '未接続',
      put_sdnkannm_kankei: '',
      post_kankei: '未接続',
      put_kankei: '未接続',
      delete_kankei: '未接続',
      kenin: '未接続',
      syukeijkn: '未接続',
      syukeikbn: '未接続',
      syukeiren: '未接続',
      soudangai: '未接続',
      gyoumu: '未接続',
      jikoku: '未接続',
      // 休日
      kyujitu: '未接続',
      post_kyujitu: '未接続',
      put_kyujitu: '未接続',
      put_symd_kyujitu: '',
      syukeikbnren: '未接続',
      title: '未接続',
      // SIENP
      needs_name: '未接続',
      ases: '未接続',
      asesReki: '未接続',
      week_kmk: '未接続',
      sonota_jigyo: '未接続',
      bunsyo_hojo_ases: '未接続',
      bunsyo_hojo_keikaku: '未接続',
      bunsyo_hojo_keikakuikt: '未接続',
      // SIENC
      case0: '未接続',
      case_teikei: '未接続',
      itaku: '未接続',
      chiki_ases: '未接続',
      chiki_ases_reki: '未接続',
      ases_hyouji: '未接続',
    };
  },
  mounted() {
    /**
     * SIENT
     */
    // params の違いごとにgetDataでコンソールログ表示
    // GET
    this.getSientData1();
    // 時刻設定マスタ取得;
    // this.getSientData2();
    // // 休日設定を取得
    // this.getSientData3();
    // // 集計区分マスタ_サービス区分の取得
    // this.getSientData4();
    // //  タイトルマスタを取得
    // this.getSientData5();
    // POST
    /**
     * SIENP
     */
    // this.getSienpData1();
    // this.getSienpData2();
    // this.getSienpData1();
    // this.getSienpData3();
    // this.getSienpData4();
    // this.getSienpData5();
    // /**
    //  * SIENC
    //  */
    // this.getSiencData1();
    // this.getSiencData2();
    // this.getSiencData3();
    // this.getSiencData4();
    // this.getSiencData5();
  },
  methods: {
    // ==================================================================
    // SIENT
    // ==================================================================
    /**
     * GET
     */
    async getSientData1() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
      };
      // 相談・対応項目マスタ取得
      getConnect('/MstSodanTaiou', params, 'SIENT').then((result) => {
        console.log('相談・対応項目マスタ取得:/sodan/v1/mst/sodantaiou ');
        console.log(result);
        if (result !== undefined) {
          this.sodantaiou = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // // 方法マスタ取得
      // getConnect('/MstHouhou', params, 'SIENT').then((result) => {
      //   console.log('方法マスタ取得:/sodan/v1/mst/houhou/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.houhou = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // // 関係マスタ取得
      // getConnect('/MstKankei', params, 'SIENT').then((result) => {
      //   console.log('関係マスタ取得:/sodan/v1/mst/kankei/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.kankei = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // // 検印マスタを取得
      // getConnect('/MstKenin', params, 'SIENT').then((result) => {
      //   console.log('検印マスタを取得:/sodan/v1/mst/kenin/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.kenin = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // // 集計条件マスタ取得
      // getConnect('/MstSyukeijkn', params, 'SIENT').then((result) => {
      //   console.log('集計条件マスタ取得:/sodan/v1/mst/syukeijkn/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.syukeijkn = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // // 集計区分マスタ取得
      // getConnect('/MstSyukeikbn', params, 'SIENT').then((result) => {
      //   console.log('集計区分マスタ取得:/sodan/v1/mst/syukeikbn/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.syukeikbn = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // // 集計区分連結マスタ取得
      // getConnect('/MstSyukeiren', params, 'SIENT').then((result) => {
      //   console.log('集計区分連結マスタ取得:/sodan/v1/mst/syukeiren/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.syukeiren = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // // 相談外業務マスタを取得
      // getConnect('/MstSoudangai', params, 'SIENT').then((result) => {
      //   console.log('相談外業務マスタを取得:/sodan/v1/mst/soudangai/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.soudangai = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
      // //  業務内容マスタを取得
      // getConnect('/MstGyoumu', params, 'SIENT').then((result) => {
      //   console.log(' 業務内容マスタを取得:/sodan/v1/mst/gyoumu/');
      //   console.log(result);
      //   if (result !== undefined) {
      //     this.gyoumu = '接続OK';
      //   }
      //   console.log('---------------------------------------------------');
      //   return result;
      // });
    },
    async getSientData2() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        jigyoid: jigyoid,
      };
      // 時刻設定マスタ取得
      getConnect('/MstJikoku', params, 'SIENT').then((result) => {
        console.log('時刻設定マスタ取得:/sodan/v1/mst/jikoku/');
        console.log(result);
        if (result !== undefined) {
          this.jikoku = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSientData3() {
      pJigyoid = 1;
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
        pSymd: pSymd,
        pEymd: pEymd,
      };
      // 休日設定を取得
      getConnect('/MstKyujitu', params, 'SIENT').then((result) => {
        console.log('休日設定を取得:/sodan/v1/mst/kyujitu/');
        console.log(result);
        if (result !== undefined) {
          this.kyujitu = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      pJigyoid = 43;
    },
    async getSientData4() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      // 集計区分マスタ_サービス区分の取得
      getConnect('/MstSyukeikbnren', params, 'SIENT').then((result) => {
        console.log(
          '集計区分マスタ_サービス区分の取得:/sodan/v1/mst/syukeikbnren/'
        );
        console.log(result);
        if (result !== undefined) {
          this.syukeikbnren = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSientData5() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
        pKbn: pKbn,
      };
      // タイトルマスタを取得
      getConnect('/MstTitle', params, 'SIENT').then((result) => {
        console.log('タイトルマスタを取得:/sodan/v1/mst/title/');
        console.log(result);
        if (result !== undefined) {
          this.title = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },

    /**
     * POST/PUT/DELETE
     */

    // 相談・対応項目マスタ新規登録
    async postSodanTaiou() {
      let params = {
        uniqid: 1,
        traceid: 123,
        syurui: syurui,
        bunruni: bunruni,
      };
      let inputParams = {
        jigyoid: 1,
        cskmkid: 1,
        code: 1,
        names: '名称テストテスト ',
        ryaku: '略称テストテスト',
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
      postConnect('/MstSodanTaiou', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(
            ' 相談・対応項目マスタ新規登録:/sodan/v1/mst/sodanTaiou/'
          );
          console.log(result);
          if (result !== undefined) {
            this.post_sodantaiou = result;
          } else {
            this.post_sodantaiou = 'failed';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談・対応項目マスタ更新登録
    async putSodanTaiou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        syurui: syurui,
        bunruni: bunruni,
      };
      let inputParams = {
        jigyoid: 1,
        cskmkid: 1,
        code: 1,
        names: this.put_names,
        ryaku: '略称テストテスト2',
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
      putConnect('/MstSodanTaiou', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(
            ' 相談・対応項目マスタ更新登録:/sodan/v1/mst/sodanTaiou/'
          );
          console.log(result);
          if (result !== undefined) {
            this.put_sodantaiou = result;
          } else {
            this.put_sodantaiou = 'failed';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談・対応項目マスタ削除
    async deleteSodanTaiou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        syurui: syurui,
        bunruni: bunruni,
      };
      let inputParams = {
        jigyoid: 1,
        cskmkid: 1,
        cssaiid: 1,
      };
      deleteConnect('/MstSodanTaiou', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(result);
          if (result !== undefined) {
            this.delete_sodantaiou = result;
          } else {
            this.delete_sodantaiou = 'failed';
          }
        }
      );
    },
    // 方法マスタ新規登録
    async postHouhou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        sdnhoudaiid: 1,
        sdnhouid: 1,
        sdnhoucd: 1,
        sdnhounm: '名称①追加テスト１',
        sdnhourk: '略称①追加テスト１',
        yukoflg: 1,
        nikeiflg: 1,
        sdnhourk2: '略称2①',
        sdnhoukigo: '記号①',
        scaflg: 1,
      };
      postConnect('/MstHouhou', params, 'SIENT', inputParams).then((result) => {
        console.log('  方法マスタの新規登録:/sodan/v1/mst/houhou/');
        console.log(result);
        if (result !== undefined) {
          this.post_houhou = result;
        } else {
          this.post_houhou = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 方法マスタ更新登録
    async putHouhou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        sdnhoudaiid: 1,
        sdnhouid: 1,
        sdnhoucd: 1,
        sdnhounm: '名称①追加テスト１',
        sdnhourk: '略称①追加テスト１',
        yukoflg: 1,
        nikeiflg: 1,
        sdnhourk2: '略称2①',
        sdnhoukigo: '記号①',
        scaflg: 1,
      };
      postConnect('/MstHouhou', params, 'SIENT', inputParams).then((result) => {
        console.log('  方法マスタの更新登録:/sodan/v1/mst/houhou/');
        console.log(result);
        if (result !== undefined) {
          this.put_houhou = result;
        } else {
          this.put_houhou = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 方法マスタ削除
    async deleteHouhou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      deleteConnect('/MstHouhou', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_houhou = result;
        } else {
          this.delete_houhou = 'failed';
        }
      });
    },

    // 関係マスタ新規登録
    async postKankei() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        sdnkandaiid: 1,
        sdnkancd: 1,
        sdnkannm: '家族',
        sdnkanrk: '家族',
        honninflg: 2,
        nikeiflg: 1,
      };
      postConnect('/MstKankei', params, 'SIENT', inputParams).then((result) => {
        console.log('  関係マスタの新規登録:/sodan/v1/mst/kankei/');
        console.log(result);
        if (result !== undefined) {
          this.post_kankei = result;
        } else {
          this.post_kankei = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 関係マスタ更新登録
    async putKankei() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        sdnkandaiid: 1,
        sdnkanid: 1,
        sdnkancd: 1,
        sdnkannm: this.put_sdnkannm_kankei,
        sdnkanrk: '家族',
        honninflg: 2,
        nikeiflg: 1,
      };
      postConnect('/MstKankei', params, 'SIENT', inputParams).then((result) => {
        console.log('  関係マスタの更新登録:/sodan/v1/mst/kankei/');
        console.log(result);
        if (result !== undefined) {
          this.put_kankei = result;
        } else {
          this.put_kankei = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 関係マスタ削除
    async deleteKankei() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      deleteConnect('/MstKankei', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_kankei = result;
        } else {
          this.delete_kankei = 'failed';
        }
      });
    },
    //  休日設定新規登録
    async postKyujitu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        nen: nen,
      };
      let inputParams = {
        jigyoid: 1,
        kyujituList: [
          {
            symd: '20000101',
          },
        ],
      };
      postConnect('/MstKyujitu', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  休日設定新規登録:/sodan/v1/mst/kyujitu/');
          console.log(result);
          if (result !== undefined) {
            this.post_kyujitu = result;
          } else {
            this.post_kyujitu = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //  休日設定更新
    async putKyujitu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        nen: nen,
      };
      let inputParams = {
        jigyoid: 1,
        kyujituList: [
          {
            symd: this.put_symd_kyujitu,
          },
        ],
      };
      postConnect('/MstKyujitu', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  関係マスタの更新登録:/sodan/v1/mst/kyujitu/');
          console.log(result);
          if (result !== undefined) {
            this.put_kyujitu = result;
          } else {
            this.put_kyujitu = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // ==================================================================
    // SIENP
    // ==================================================================
    async getSienpData1() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
      };
      // ニーズ整理項目名を取得
      getConnect('/MstNeedsName', params, 'SIENP').then((result) => {
        console.log('ニーズ整理項目名を取得:/sodan/v1/mst/needs-name/');
        console.log(result);
        if (result !== undefined) {
          this.needs_name = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // アセスメント履歴を取得
      getConnect('/MstAsesReki', params, 'SIENP').then((result) => {
        console.log('アセスメント履歴を取得:/sodan/v1/mst/ases-reki/');
        console.log(result);
        if (result !== undefined) {
          this.asesReki = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 週間計画項目一覧マスタ取得
      getConnect('/MstWeekKmk', params, 'SIENP').then((result) => {
        console.log('週間計画項目一覧マスタ取得:/sodan/v1/mst/week-kmk/');
        console.log(result);
        if (result !== undefined) {
          this.week_kmk = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // その他事業所マスタ取得
      getConnect('/MstSonotaJigyo', params, 'SIENP').then((result) => {
        console.log('その他事業所マスタ取得:/sodan/v1/mst/sonota-jigyo/');
        console.log(result);
        if (result !== undefined) {
          this.sonota_jigyo = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSienpData2() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mstfstid: mstfstid,
      };
      // 区分別アセスメント項目マスタ一覧を取得
      getConnect('/MstAses', params, 'SIENP').then((result) => {
        console.log(
          ' 区分別アセスメント項目マスタ一覧を取得:/sodan/v1/mst/ases/'
        );
        console.log(result);
        if (result !== undefined) {
          this.ases = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSienpData3() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        kubun: kubun,
        pJigyoid: pJigyoid,
      };
      // アセスメント特記文章マスタ取得
      getConnect('/MstBunsyoHojoAses', params, 'SIENP').then((result) => {
        console.log(
          'アセスメント特記文章マスタ取得:/sodan/v1/mst/bunsyo-hojo/ases/'
        );
        console.log(result);
        if (result !== undefined) {
          this.bunsyo_hojo_ases = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSienpData4() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        kubun: kubun,
        mstfstid: mstfstid,
      };
      // 計画表文章マスタ取得
      getConnect('/MstBunsyoHojoKeikaku', params, 'SIENP').then((result) => {
        console.log('計画表文章マスタ取得:/sodan/v1/bunsyo-hojo/keikaku/');
        console.log(result);
        if (result !== undefined) {
          this.bunsyo_hojo_keikaku = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSienpData5() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        kubun: kubun,
        mstfstid: mstfstid,
        pJigyoid: pJigyoid,
      };
      // 計画表文章マスタ取得(一括登録)
      getConnect('/MstBunsyoHojoKeikakuikt', params, 'SIENP').then((result) => {
        console.log(
          '計画表文章マスタ取得(一括登録):/sodan/v1/bunsyo-hojo/keikakuikt/'
        );
        console.log(result);
        if (result !== undefined) {
          this.bunsyo_hojo_keikakuikt = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // ==================================================================
    // SIENC
    // ==================================================================
    async getSiencData1() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
      };
      // ケース項目マスタ取得
      getConnect('/MstCase', params, 'SIENC').then((result) => {
        console.log('ケース項目マスタ取得:/sodan/v1/mst/case/');
        console.log(result);
        if (result !== undefined) {
          this.case0 = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      //  ケース内容定型文章マスタの検索
      getConnect('/MstCaseTeikei', params, 'SIENC').then((result) => {
        console.log(
          'ケース内容定型文章マスタの検索:/sodan/v1/mst/case-teikei/'
        );
        console.log(result);
        if (result !== undefined) {
          this.case_teikei = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSiencData2() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      //  委託先マスタ取得
      getConnect('/MstItaku', params, 'SIENC').then((result) => {
        console.log(' 委託先マスタ取得:/sodan/v1/mst/itaku/');
        console.log(result);
        if (result !== undefined) {
          this.itaku = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSiencData3() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mstfstid: mstfstid,
      };
      //  区分別アセスメント項目マスタ一覧を取得
      getConnect('/MstChikiAses', params, 'SIENC').then((result) => {
        console.log(
          '地域相談支援-区分別アセスメント項目マスタ一覧を取得:/sodan/v1/mst/chiki-ases/'
        );
        console.log(result);
        if (result !== undefined) {
          this.chiki_ases = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSiencData4() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
        pKbn: pKbn,
      };
      //   地域相談支援-アセスメント履歴を取得
      getConnect('/MstChikiAsesReki', params, 'SIENC').then((result) => {
        console.log(
          '地域相談支援- 地域相談支援-アセスメント履歴を取得:/sodan/v1/mst/chiki-ases-reki/'
        );
        console.log(result);
        if (result !== undefined) {
          this.chiki_ases_reki = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSiencData5() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        kubun: kubun,
        mstfstid: mstfstid,
        pJigyoid: pJigyoid,
      };
      //   地域相談支援-アセスメント履歴を取得
      getConnect('/MstAseshyouji', params, 'SIENC').then((result) => {
        console.log(' アセスメント表示項目設定取得:/sodan/v1/mst/ases/hyouji/');
        console.log(result);
        if (result !== undefined) {
          this.ases_hyouji = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
  },
};
</script>
