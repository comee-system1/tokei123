<template>
  <div id="kobeturiyo">
    <header-services
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container fluid class="container">
      <v-row no-gutters>
        <v-col class="leftArea">
          <user-list-print
            ref="user_list_print"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list-print>
        </v-col>
        <v-col class="rightArea ml-1">
          <v-row class="mt-0" no-gutters>
            <v-col>
              <v-card class="d-flex flex-row" flat tile>
                <v-card class="pr-2 text-center" elevation="0" :min-width="80">
                  <label class="greyLabel">利用者名</label>
                </v-card>
                <v-card class="light_yellow" :width="180" outlined tile>
                  {{ userDataSelect[0].riyosyo }}
                </v-card>
                <v-card
                  class="pr-2 ml-2 text-center"
                  elevation="0"
                  :min-width="80"
                >
                  <label class="greyLabel">受給者番号</label>
                </v-card>
                <v-card class="light_yellow" :width="180" outlined tile>
                  {{ userDataSelect[0].jyukyusyabango }}
                </v-card>
              </v-card>
            </v-col>
            <v-col class="text-end">
              生活支援変動情報:
              <v-btn x-small>
                <v-icon x-small class="white mr-3 rounded-circle">
                  mdi-download
                </v-icon>
                個別取込</v-btn
              >
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col md="4">
              <v-card elevation="0">
                <div class="clearfix">
                  <a class="addButton" @click="openDialog_Term('nyutaiin_add')"
                    >入退院追加</a
                  >
                  <a
                    class="ml-1 addButton"
                    @click="openDialog_Term('gaihaku_add')"
                    >外泊追加</a
                  >
                  <a class="ml-1 addButton" @click="openDialog_Add()"
                    >加算追加</a
                  >
                </div>
              </v-card>
            </v-col>
            <v-col md="6" class="ml-auto">
              <v-card elevation="0">
                <v-row no-gutters>
                  <v-col class="blue--text text-end"> 青文字 </v-col>
                  <v-col cols="2"> :編集可能 </v-col>
                  <v-col cols="1" class="text-end">
                    <img src="../assets/tyusyaku_02.png" />
                  </v-col>
                  <v-col cols="*"> :入退院 </v-col>
                  <v-col cols="1" class="text-end">
                    <img src="../assets/tyusyaku_03.png" />
                  </v-col>
                  <v-col cols="*"> :外泊 </v-col>
                  <v-col cols="1">
                    <div class="editMark"></div>
                  </v-col>
                  <v-col cols="*">:手修正済</v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <wj-flex-grid
            id="flexGrid"
            class="mt-1"
            :headersVisibility="'None'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :itemsSourceChanged="onitemsSourceChanged"
            :isReadOnly="true"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :selectionMode="'None'"
            :style="gridHeight"
          ></wj-flex-grid>
        </v-col>
      </v-row>
      <dialog-kikantuika
        ref="dialog_kikantuika"
        @kikantuika_dialog_regist="kikantuika_dialog_regist"
        @kikantuika_dialog_delete="kikantuika_dialog_delete"
      >
      </dialog-kikantuika>
      <dialog-kasantuika
        ref="dialog_kasantuika"
        @kasantuika_dialog_regist="kasantuika_dialog_regist"
        @kasantuika_dialog_delete="kasantuika_dialog_delete"
      ></dialog-kasantuika>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import UserListPrint from '../components/UserListPrint.vue';
import DialogKikantuika from '../components/DialogKikantuika.vue';
import DialogKasantuika from '../components/DialogKasantuika.vue';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import { getHendoData } from '@/data/kobetsuRiyoHendo.js';
import { getRiyobi } from '@/data/kobetsuRiyobi.js';
import { getNyutaiin } from '@/data/kobetsuNyutaiin.js';
import { getGaihaku } from '@/data/kobetsuGaihaku.js';
import { getMeal } from '@/data/kobetsuMeal.js';
import { getKounetusuihi } from '@/data/kobetsuKounetusuihi.js';
const startPoint = 4;
const totalPoint = startPoint + 1;
export default {
  data() {
    return {
      plusOne: 1, // 該当日付を含める
      mainGrid: [], // 表示grid
      riyoubiData: [], // 利用日データ
      nyutaiinData: [], // 入退院データ
      gaihakuData: [], // 外泊データ
      mealsData: [], // 食事データ
      gridItemName: [], // 変動情報の表示内容
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      dateArgument: '', // ヘッダメニューのカレンダー選択
      serviceArgument: '', // ヘッダメニューのサービス選択
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyo: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
      dialog: false, // 期間追加用のダイアログ
      alertMessageFlag: false, // 変更時のアラートメッセージ
      editGridFlag: false, // grid編集状態フラグ
      kasanRow: 0, // 加算情報の行数
      gridHeight: '', // グリッドの高さ
      rowCounts: {}, // 各行数
    };
  },
  components: {
    HeaderServices,
    UserListPrint,
    DialogKikantuika,
    DialogKasantuika,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    /**************************
     * グリッドイニシアライズ
     */
    onitemsSourceChanged(flexGrid) {
      // セル初期カラム情報
      this.methodCellSettingDefault(flexGrid);
      // 情報タイトルパーツの書き込み
      this.methodWriteJyoho(flexGrid);
      // 値の登録
      this.methodSettingPoint(flexGrid);
      // セルマージ
      this.methodCellMerge(flexGrid);
    },
    onInitialized(flexGrid) {
      // 初回の提供サービスコードを渡す
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.mainGrid = flexGrid;
      flexGrid.autoSizeColumns();
      // セル情報のフォーマット指定
      this.methodCellFormatSetting(flexGrid);
      // セルのクリックイベント
      this.methodCellClickEvent(flexGrid);
      //flexGrid.itemsSource = [];
    },
    /*******************************
     * ヘッダメニューのサービス初回選択 検索ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument['teikyo_year'];
      this.month = serviceArgument['teikyo_month'];
      let m = moment(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();
      if (serviceArgument['search_button']) {
        this.userDataSelect[0]['riyosyo'] = '';
        this.userDataSelect[0]['jyukyusyabango'] = '';
        this.$refs.user_list_print.setChildTeikyocode(
          this.teikyoCode,
          serviceArgument['search_button']
        );
      }
      this.settingChangeHndoJyoho();
    },

    /******************************
     * 変動情報の切り替え配列
     */
    settingChangeHndoJyoho() {
      // 選択されているサービスの変動情報の初期情報を指定
      this.gridItemName = getHendoData(this);
      // 表示されるカラム
      this.rowCounts = this.viewColumn();
      this.mainGrid.itemsSource = [];
    },
    /*************************
     * 利用日の設定
     ****************/
    settingRiyoubi(flexGrid) {
      // 選択された受給者番号のデータのみ対象にする
      // apiが利用されたら不要
      let riyoubidata = getRiyobi();
      let riyoubi = [];
      for (let i = 0; i < riyoubidata.length; i++) {
        if (
          this.userDataSelect[0]['jyukyusyabango'] ==
          riyoubidata[i]['jyukyusyabango']
        ) {
          riyoubi.push(riyoubidata[i]);
        }
      }
      if (riyoubi.length > 0) {
        for (let i = 0; i <= this.lastdate; i++) {
          let d = 'day' + (i + 1);
          flexGrid.setCellData(1, i + startPoint, riyoubi[0][d]);
        }
        flexGrid.setCellData(
          1,
          this.lastdate + startPoint,
          riyoubi[0]['total']
        );
        flexGrid.setCellData(
          1,
          this.lastdate + totalPoint,
          riyoubi[0]['money']
        );
      }

      this.riyoubiData = riyoubi;
    },

    /*******************
     * 外泊の設定
     */
    settingGaihaku() {
      // 選択された受給者番号のデータのみ対象にする
      // apiが利用されたら不要
      let gaihakudata = getGaihaku();
      let gaihaku = [];

      for (let i = 0; i < gaihakudata.length; i++) {
        if (
          this.userDataSelect[0]['jyukyusyabango'] ==
          gaihakudata[i]['jyukyusyabango']
        ) {
          gaihaku.push(gaihakudata[i]);
        }
      }

      // 終了日のチェック
      // 終了日が空欄の時は翌月月末を指定し、未設定のフラグを立てる
      if (gaihaku.length > 0) {
        for (let i = 0; i < gaihaku[0].date.length; i++) {
          if (gaihaku[0].date[i].end_date == '') {
            gaihaku[0].date[i].end_date = moment()
              .add('months', 1)
              .endOf('month')
              .format('YYYY-MM-DD');
            gaihaku[0].date[i].end_date_notFlag = true;
          }
        }
      }
      this.writingArrowGaihaku(gaihaku);
    },

    /*******
     * 入院・退院日の設定
     */
    settingNyuTaiin() {
      // 選択された受給者番号のデータのみ対象にする
      // apiが利用されたら不要
      let nyutaiindata = getNyutaiin();
      let nyutaiin = [];
      for (let i = 0; i < nyutaiindata.length; i++) {
        if (
          this.userDataSelect[0]['jyukyusyabango'] ==
          nyutaiindata[i]['jyukyusyabango']
        ) {
          nyutaiin.push(nyutaiindata[i]);
        }
      }

      // 退院日のチェック
      // 退院日が空欄の時は翌月月末を指定し、未設定のフラグを立てる
      if (nyutaiin.length > 0) {
        for (let i = 0; i < nyutaiin[0].date.length; i++) {
          if (nyutaiin[0].date[i].end_date == '') {
            nyutaiin[0].date[i].end_date = moment()
              .add('months', 1)
              .endOf('month')
              .format('YYYY-MM-DD');
            nyutaiin[0].date[i].end_date_notFlag = true;
          }
        }
      }

      // 入退院の矢印作成
      this.writingArrowNyutaiin(nyutaiin);
    },

    /******************
     * 変動情報＋加算情報の登録
     */
    settingHendoKasan() {
      for (let i = 0; i <= this.gridItemName[0]['shisetsuNyusho'].length; i++) {
        if (
          this.gridItemName[0]['shisetsuNyusho'][i] &&
          this.gridItemName[0]['shisetsuNyusho'][i].mealFlag == true
        ) {
          // 食事の設定
          if (this.editGridFlag == true) {
            this.edittingMeals();
          } else {
            this.settingMeals();
          }
        }
        // 光熱水費があるとき
        // 光熱費以外のほかのデータがあるとき(家賃等)
        // 適宜editとsettingの関数を追加していくapiの取得方法による
        if (
          this.gridItemName[0]['shisetsuNyusho'][i] &&
          this.gridItemName[0]['shisetsuNyusho'][i].kounetsuSuihiFlag ==
            'kounetsuSuihiFlag'
        ) {
          if (this.editGridFlag == true) {
            this.edittingKounetusui();
          } else {
            this.settingKounetusui();
          }
        }
      }

      // 加算情報の登録
      if (this.editGridFlag == true) {
        this.edittingKasan();
      } else {
        this.settingKasans();
      }
    },

    /****************
     * 加算情報登録
     */
    settingKasans() {
      let rows = this.rowCounts.hendoRowsCount;
      let _self = this;
      this.gridItemName[0].taisei_kobetu.forEach(function (elements) {
        let total = 0;
        for (let i = 1; i <= _self.lastdate; i++) {
          let d = 'day' + i;
          if (elements['date']) {
            _self.mainGrid.setCellData(rows, i + 3, elements['date'][d]);
            if (elements['date'][d] == 2 || elements['date'][d] == 1) {
              total++;
            }
          }
          _self.mainGrid.setCellData(rows, _self.lastdate + startPoint, total);
        }
        rows++;
      });

      this.gridItemName[0].kobetu.forEach(function (elements) {
        let total = 0;
        for (let i = 1; i <= _self.lastdate; i++) {
          let d = 'day' + i;
          if (elements['date']) {
            _self.mainGrid.setCellData(rows, i + 3, elements['date'][d]);
            if (elements['date'][d] == 2 || elements['date'][d] == 1) {
              total++;
            }
          }
          _self.mainGrid.setCellData(rows, _self.lastdate + startPoint, total);
        }
        rows++;
      });
    },
    /****************
     * 食事の設定
     */
    settingMeals() {
      let meals = getMeal();
      // 食事行の開始位置
      let mealsRowSt = this.rowCounts.mealsRowSt;
      // 食事を食事のキーに合わせる
      // apiが利用されたら不要
      let mk = meals;
      meals = [];
      for (let i = 0; i < this.gridItemName[0].mealsKey.length; i++) {
        if (this.gridItemName[0].mealsKey[i] == 'breakfast') {
          meals.push(mk[0]);
        }
        if (this.gridItemName[0].mealsKey[i] == 'lunch') {
          meals.push(mk[1]);
        }
        if (this.gridItemName[0].mealsKey[i] == 'dinner') {
          meals.push(mk[2]);
        }
      }

      for (let i = 0; i < meals.length; i++) {
        let ml = meals[i];
        let mealsdata = [];
        let mealsType = this.gridItemName[0].mealsKey[i];
        if (mealsType) {
          for (let j = 0; j < ml.length; j++) {
            // 選択された受給者番号のデータのみ対象にする
            // apiが利用されたら不要
            if (
              this.userDataSelect[0]['jyukyusyabango'] ==
              ml[j]['jyukyusyabango']
            ) {
              mealsdata.push(ml[j]);
            }
          }
          for (let j = 0; j < mealsdata.length; j++) {
            for (let i = 0; i <= this.lastdate; i++) {
              let d = 'day' + (i + 1);
              this.mainGrid.setCellData(
                mealsRowSt,
                i + startPoint,
                mealsdata[0][d]
              );
            }
            this.mainGrid.setCellData(
              mealsRowSt,
              this.lastdate + startPoint,
              mealsdata[0]['total']
            );
            this.mainGrid.setCellData(
              mealsRowSt,
              this.lastdate + totalPoint,
              mealsdata[0]['money']
            );
          }
          this.mealsData[mealsType] = mealsdata;
          mealsRowSt++;
        }
      }
    },

    /********
     * 入院・退院日の新規追加
     */
    insertNyuTaiin() {
      let nyutaiin = [];
      nyutaiin = this.nyutaiinData;
      // 日付のloop
      // 秒に変換してloopを行う
      let st = new Date(this.$refs.dialog_kikantuika.registData.nyuuinbi);
      let ed = new Date(this.$refs.dialog_kikantuika.registData.taiinbi);
      let firstday = st.getDate();
      let lastday = ed.getDate();
      // 退院日が空欄の時は翌月月末を指定し、未設定のフラグを立てる
      let enddate = this.$refs.dialog_kikantuika.registData.taiinbi;
      let end_date_notFlag = false;
      let diff_date = lastday - firstday + this.plusOne;
      if (this.$refs.dialog_kikantuika.registData.taiinbi_notFlag) {
        enddate = moment().add('months', 1).endOf('month').format('YYYY-MM-DD');
        end_date_notFlag = true;
        diff_date = '-';
      }

      nyutaiin[0]['date'].push({
        start_date: this.$refs.dialog_kikantuika.registData.nyuuinbi,
        end_date: enddate,
        end_date_notFlag: end_date_notFlag,
        diff_date: diff_date,
        nyuuinbiShiseturiyo:
          this.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo,
        taiinbiShiseturiyo:
          this.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo,
        nyuuinbiBreakfast:
          this.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast,
        nyuuinbiLunch: this.$refs.dialog_kikantuika.registData.nyuuinbiLunch,
        nyuuinbiDinner: this.$refs.dialog_kikantuika.registData.nyuuinbiDinner,
        taiinbiBreakfast:
          this.$refs.dialog_kikantuika.registData.taiinbiBreakfast,
        taiinbiLunch: this.$refs.dialog_kikantuika.registData.taiinbiLunch,
        taiinbiDinner: this.$refs.dialog_kikantuika.registData.taiinbiDinner,
        taiinbiAida: this.$refs.dialog_kikantuika.registData.taiinbiAida,
        byouinName: this.$refs.dialog_kikantuika.registData.byouinName,
      });

      // 入退院の矢印作成
      this.writingArrowNyutaiin(nyutaiin);
    },

    /*********
     * 外泊の追加
     ***/
    insertGaihaku() {
      let gaihaku = [];
      gaihaku = this.gaihakuData;

      // 日付のloop
      // 秒に変換してloopを行う
      let st = new Date(this.$refs.dialog_kikantuika.registData.nyuuinbi);
      let ed = new Date(this.$refs.dialog_kikantuika.registData.taiinbi);
      let firstday = st.getDate();
      let lastday = ed.getDate();
      // 退院日が空欄の時は翌月月末を指定し、未設定のフラグを立てる
      let enddate = this.$refs.dialog_kikantuika.registData.taiinbi;
      let end_date_notFlag = false;
      let diff_date = lastday - firstday + this.plusOne;
      if (this.$refs.dialog_kikantuika.registData.taiinbi_notFlag) {
        enddate = moment().add('months', 1).endOf('month').format('YYYY-MM-DD');
        end_date_notFlag = true;
        diff_date = '-';
      }

      gaihaku[0]['date'].push({
        start_date: this.$refs.dialog_kikantuika.registData.nyuuinbi,
        end_date: enddate,
        end_date_notFlag: end_date_notFlag,
        diff_date: diff_date,
        nyuuinbiShiseturiyo:
          this.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo,
        taiinbiShiseturiyo:
          this.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo,
        nyuuinbiBreakfast:
          this.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast,
        nyuuinbiLunch: this.$refs.dialog_kikantuika.registData.nyuuinbiLunch,
        nyuuinbiDinner: this.$refs.dialog_kikantuika.registData.nyuuinbiDinner,
        taiinbiBreakfast:
          this.$refs.dialog_kikantuika.registData.taiinbiBreakfast,
        taiinbiLunch: this.$refs.dialog_kikantuika.registData.taiinbiLunch,
        taiinbiDinner: this.$refs.dialog_kikantuika.registData.taiinbiDinner,
        taiinbiAida: this.$refs.dialog_kikantuika.registData.taiinbiAida,
        byouinName: this.$refs.dialog_kikantuika.registData.byouinName,
      });

      this.writingArrowGaihaku(gaihaku);
    },
    /**********
     * 食事の編集
     */
    edittingMeals() {
      if (
        this.dayPoint &&
        this.gridItemName[0].meals[this.dayPoint.dayrow - 4]
      ) {
        let mealsKey = this.gridItemName[0].mealsKey[this.dayPoint.dayrow - 4];
        let mealsCount =
          this.gridItemName[0].mealsCount[this.dayPoint.dayrow - 4];
        let data = this.mealsData[mealsKey];
        data[0][this.dayPoint.day] = this.selectedPoint;
        let calc = this.mealCalc(data, mealsCount);
        data[0]['total'] = calc.total;
        data[0]['money'] = calc.money;
        this.mealsData[mealsKey] = data;
      }
      let mealsrow = this.rowCounts.mealsRowSt;
      for (let k = 0; k < this.gridItemName[0].mealsKey.length; k++) {
        let mkey = this.gridItemName[0].mealsKey[k];
        for (let i = 0; i <= this.lastdate; i++) {
          let d = 'day' + (i + 1);
          this.mainGrid.setCellData(
            mealsrow,
            i + startPoint,
            this.mealsData[mkey][0][d]
          );
        }
        this.mainGrid.setCellData(
          mealsrow,
          this.lastdate + startPoint,
          this.mealsData[mkey][0]['total']
        );
        this.mainGrid.setCellData(
          mealsrow,
          this.lastdate + totalPoint,
          this.mealsData[mkey][0]['money']
        );
        mealsrow++;
      }
    },

    /********************
     * 食事の合計と金額の計算
     */
    mealCalc(arg, mealsCount) {
      let rtn = {};
      rtn = { total: arg[0]['total'], money: arg[0]['money'] };
      if (this.selectedPoint == 2) {
        rtn = {
          total: arg[0]['total'] + 1,
          money: arg[0]['money'] + mealsCount,
        };
      }
      if (this.selectedPoint == 3) {
        rtn = {
          total: arg[0]['total'] - 1,
          money: arg[0]['money'] - mealsCount,
        };
      }
      return rtn;
    },
    /******************
     * 光熱水費の設定
     */
    settingKounetusui() {
      // 選択された受給者番号のデータのみ対象にする
      // apiが利用されたら不要
      let kounetusuihidata = getKounetusuihi();
      let kounetusuihi = [];
      for (let i = 0; i < kounetusuihidata.length; i++) {
        if (
          this.userDataSelect[0]['jyukyusyabango'] ==
          kounetusuihidata[i]['jyukyusyabango']
        ) {
          kounetusuihi.push(kounetusuihidata[i]);
        }
      }

      let rows = this.rowCounts.hendoRowsCount - 1;
      if (this.kounetusuihi > 0) {
        kounetusuihi = [];
        kounetusuihi = this.kounetusuihi;
      } else {
        this.kounetusuihi = kounetusuihi;
      }
      if (kounetusuihi.length > 0) {
        for (let i = 0; i <= this.lastdate; i++) {
          let d = 'day' + (i + 1);
          this.mainGrid.setCellData(rows, i + startPoint, kounetusuihi[0][d]);
        }
        this.mainGrid.setCellData(
          rows,
          this.lastdate + startPoint,
          kounetusuihi[0]['total']
        );
        this.mainGrid.setCellData(
          rows,
          this.lastdate + totalPoint,
          kounetusuihi[0]['money']
        );
      }
    },

    /***************************
     * 表示されるカラムの指定
     */
    viewColumn() {
      let rowColumn = [];
      let hendoRowsCount = 0; // 変動情報の行数
      let taiseiKobetsuRowsCount = 0; // 体制個別の行数
      let kobetsuCount = 0; // 個別の行数
      // 変動情報の表示
      for (let i = 0; i < this.gridItemName[0].shisetsuNyusho.length; i++) {
        // 光熱水費があるとき
        if (this.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag) {
          rowColumn.push(
            this.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag
          );
        } else if (this.gridItemName[0].shisetsuNyusho[i].mealFlag) {
          // 食事フラグがあるとき
          for (let j = 0; j < this.gridItemName[0].mealsKey.length; j++) {
            rowColumn.push(this.gridItemName[0].mealsKey[j]);
          }
        } else {
          rowColumn.push(this.gridItemName[0].shisetsuNyusho[i].name);
        }
      }
      // 変動情報の行数
      hendoRowsCount = rowColumn.length;

      // 加算情報,体制個別の表示
      for (let i = 0; i < this.gridItemName[0].taisei_kobetu.length; i++) {
        rowColumn.push(this.gridItemName[0].taisei_kobetu[i].name);
      }
      // 変動情報＋体制個別の行数
      taiseiKobetsuRowsCount = rowColumn.length;

      // 加算情報,個別の表示
      for (let i = 0; i < this.gridItemName[0].kobetu.length; i++) {
        rowColumn.push(this.gridItemName[0].kobetu[i].name);
      }
      // 変動情報＋体制個別+個別の行数
      kobetsuCount = rowColumn.length;

      // 食事の開始位置
      let mealsRowSt = 0;
      for (let i = 0; i < this.gridItemName[0].shisetsuNyusho.length; i++) {
        // 食事が発生するまでのカウント
        if (this.gridItemName[0].shisetsuNyusho[i].mealFlag) {
          break;
        }
        mealsRowSt++;
      }

      return {
        hendoRowsCount: hendoRowsCount + 1,
        taiseiKobetsuRowsCount: taiseiKobetsuRowsCount + 1,
        kobetsuCount: kobetsuCount + 1,
        rowColumn: rowColumn,
        mealsRowSt: mealsRowSt + 1,
      };

      // +1 はタイトルの部分を追加
      // this.hendoRowsCount = hendoRowsCount + 1;
      // this.taiseiKobetsuRowsCount = taiseiKobetsuRowsCount + 1;
      // this.kobetsuCount = kobetsuCount + 1;
      // this.rowColumn = rowColumn;
    },
    /****
     * セルフォーマット内容の変更
     */
    methodCellFormatSetting(flexGrid) {
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;
        let classname = '';
        // 体制個別
        if (
          text == _self.gridItemName[0].taisei_kobetu_name[0] ||
          text == _self.gridItemName[0].taisei_kobetu_name[1]
        ) {
          classname = 'vertical';
        }
        // 食事の表示
        for (let i = 0; i < _self.gridItemName[0].meals.length; i++) {
          if (text == _self.gridItemName[0].meals[i]) {
            html =
              html +
              '<span class="float-right text-caption">@' +
              _self.gridItemName[0].mealsCount[i] +
              '/回</span>';
          }
        }
        // 高熱水費
        if (text == 'kounetsuSuihiFlag') {
          html =
            '<span class="float-right text-caption">@' +
            _self.gridItemName[0].kounetsuSuihi[0].count +
            '/日</span>';
        }

        // 項目ヘッダ
        for (let i = 0; i < _self.gridItemName[0].heads.length; i++) {
          if (text == _self.gridItemName[0].heads[i]) {
            classname = 'head';
          }
        }

        // 変動情報等の縦
        // 加算情報等の縦
        if (
          text == _self.gridItemName[0].column[0] ||
          text == _self.gridItemName[0].column[1]
        ) {
          classname = 'vertical';
        }

        // 加算情報置き換え;
        for (let i = 0; i < _self.gridItemName[0].taisei_kobetu.length; i++) {
          if (text == _self.gridItemName[0].taisei_kobetu[i].name) {
            html = '<a>' + _self.gridItemName[0].taisei_kobetu[i].name + '</a>';
          }
        }
        for (let i = 0; i < _self.gridItemName[0].kobetu.length; i++) {
          if (text == _self.gridItemName[0].kobetu[i].name) {
            html = '<a>' + _self.gridItemName[0].kobetu[i].name + '</a>';
          }
        }

        // 矢印の表示
        if (
          text.match(/^arrow_double_bar-[0-9].*/) ||
          text.match(/^arrow_start_bar-[0-9].*/) ||
          text.match(/^arrow_start-[0-9].*/) ||
          text.match(/^arrow_double-[0-9].*/)
        ) {
          let key = text.split('-')[1];
          let date = _self.nyutaiinData[0].date[key];
          // termFlagは矢印を押下した際の表示用文字列

          if (
            text.match(/^arrow_start_bar-[0-9].*/) ||
            text.match(/^arrow_double_bar-[0-9].*/)
          ) {
            html = '<div class="red-arrow"><div>&nbsp;</div></div>';
          } else if (text.match(/^arrow_double-[0-9].*/)) {
            html = '<div class="red-arrow_double"><div>&nbsp;</div></div>';
          } else {
            html = '<div class="red-arrow_start"><div>&nbsp;</div></div>';
          }
          let startdate = moment(date['start_date']).format('M/D');
          let end_date = '';
          let diff_day = (diff_day = date['diff_date']);
          // 退院日未設定
          if (date['end_date_notFlag']) {
            end_date = '未設定';
          } else {
            end_date = moment(date['end_date']).format('M/D');
          }
          html +=
            '<div class="arrow_box" ><div id="arrow_box-' +
            key +
            '"><span class="d-none">termFlag_' +
            key +
            '</span>' +
            startdate +
            '～' +
            end_date +
            '[' +
            diff_day +
            ']</div></div>';
        }

        if (text.match(/^arrow-[0-9].*/)) {
          html = '<div class="red-arrow"><div>&nbsp;</div></div>';
        }
        if (text.match(/^arrow_end-[0-9].*/)) {
          html = '<div class="red-arrow_end"><div>&nbsp;</div></div>';
        }

        // 外泊用矢印の表示
        if (
          text.match(/^gaihaku_arrow_double_bar-[0-9].*/) ||
          text.match(/^gaihaku_arrow_start_bar-[0-9].*/) ||
          text.match(/^gaihaku_arrow_start-[0-9].*/) ||
          text.match(/^gaihaku_arrow_double-[0-9].*/)
        ) {
          let key = text.split('-')[1];
          let date = _self.gaihakuData[0].date[key];
          // termFlagは矢印を押下した際の表示用文字列
          if (
            text.match(/^gaihaku_arrow_double_bar-[0-9].*/) ||
            text.match(/^gaihaku_arrow_start_bar-[0-9].*/)
          ) {
            html = '<div class="green-arrow "><div>&nbsp;</div></div>';
          } else if (text.match(/^gaihaku_arrow_double-[0-9].*/)) {
            html = '<div class="green-arrow_double"><div>&nbsp;</div></div>';
          } else {
            html = '<div class="green-arrow_start"><div>&nbsp;</div></div>';
          }

          let startdate = moment(date['start_date']).format('M/D');
          let end_date = '';
          let diff_day = date['diff_date'];
          // 退院日未設定
          if (date['end_date_notFlag']) {
            end_date = '未設定';
          } else {
            end_date = moment(date['end_date']).format('M/D');
          }

          html +=
            '<div class="arrow_box"><div id="arrow_box-' +
            key +
            '"><span class="d-none">gaihaku_termFlag_' +
            key +
            '</span>' +
            startdate +
            '～' +
            end_date +
            '[' +
            diff_day +
            ']</div></div>';
        }
        if (text.match(/^gaihaku_arrow-[0-9].*/)) {
          html = '<div class="green-arrow"><div>&nbsp;</div></div>';
        }
        if (text.match(/^gaihaku_arrow_end-[0-9].*/)) {
          html = '<div class="green-arrow_end"><div>&nbsp;</div></div>';
        }

        // 日付表示
        if (isDate.isDate(text)) {
          html = dateFormatString.dateFormatString(text);
        }

        // 合計・金額部分
        if (
          e.row > 0 &&
          (e.col == _self.lastdate + startPoint ||
            e.col == _self.lastdate + totalPoint)
        ) {
          classname = 'text-center gridBackground ';
          let yen = '';
          if (text.length > 0 && e.col == _self.lastdate + totalPoint) {
            yen = '円';
          }
          // if (e.col == _self.lastdate + startPoint) {
          //   html = '<p>-</p>';
          // } else {
          html = '<p>' + text + yen + '</p>';
          //}
        }

        // 金額・食事以外をグレー
        if (
          e.col == _self.lastdate + totalPoint &&
          e.row > 0 &&
          text.length == 0
        ) {
          classname = 'text-center gridBackground backGray';
        }

        if (
          e.col > 3 &&
          e.col != _self.lastdate + startPoint &&
          e.col != _self.lastdate + totalPoint
        ) {
          classname = 'text-center';
          if (text == 1) {
            html = '<p>〇</p>';
            classname += ' gridBackground';
          }
          if (text == 2) {
            html = '<span>〇</span>';
            classname += ' blue--text';
          }
          if (text == 3) {
            html = '×';
            classname += ' blue--text';
          }
          if (text == 0) {
            html = '';
          }
        }

        // 最終日の右側に線を引く
        if (e.col == _self.lastdate + startPoint - 1) {
          classname += ' lastboard';
        }
        e.cell.innerHTML = '<div class="' + classname + '">' + html + '</div>';

        wjCore.setCss(e.cell, {
          display: 'table',
          tableLayout: 'absolute',
        });
        wjCore.setCss(e.cell.children[0], {
          display: 'table-cell',
          verticalAlign: 'middle',
        });
      });
    },

    /*******************
     * セル初期カラム情報
     */
    methodCellSettingDefault(flexGrid) {
      let lastdate = this.lastdate;
      let plus = 6; // 日付以外の列数
      flexGrid.columns.clear();
      // 選択された月のカラムを指定
      while (flexGrid.columns.length < lastdate + plus) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      // 選択されているサービスの行を指定
      let totalRow = 0;
      if (this.gridItemName[0]) {
        totalRow =
          this.rowCounts.hendoRowsCount + this.gridItemName[0].kasanRow;
      }
      // this.kasanRow = totalRow;
      flexGrid.rows.clear();
      while (flexGrid.rows.length < totalRow) {
        flexGrid.rows.push(new wjGrid.Row());
      }

      flexGrid.frozenColumns = 4;
      flexGrid.frozenRows = 1;
      flexGrid.columns[0].width = 25;
      flexGrid.columns[1].width = 25;
      flexGrid.columns[2].width = '8*';
      flexGrid.columns[3].width = '8*';

      flexGrid.rows[0].height = 48;
      flexGrid.rows[2].height = 38;
      flexGrid.rows[3].height = 38;

      // 体制個別の行数で高さを変更する
      // 1:体制個別 2:体制
      this.edittingTaiseiHeight(1, flexGrid);
      this.edittingTaiseiHeight(2, flexGrid);

      flexGrid.rows.defaultSize = 24;
      flexGrid.setCellData(0, 0, '');
      // 項目
      flexGrid.setCellData(0, 1, this.gridItemName[0].heads[0]);
      flexGrid.setCellData(0, 2, '');

      // 日付の表示
      let date = '';
      let day = '';
      for (let i = 4; i <= this.lastdate + 3; i++) {
        flexGrid.columns[i].width = '2.2*';
        day = String(i - 3).padStart(2, '0');
        date = this.year + '/' + this.month + '/' + day;
        flexGrid.setCellData(0, i, date);
      }
      // 最終日だけ日付がつぶれるので幅を大きくし対応
      flexGrid.columns[lastdate + 3].minWidth = 24;
      // 合計
      flexGrid.setCellData(0, lastdate + 4, this.gridItemName[0].heads[1]);
      flexGrid.columns[lastdate + 4].width = 35;
      // 金額
      flexGrid.setCellData(0, lastdate + 5, this.gridItemName[0].heads[2]);
      flexGrid.columns[lastdate + 5].width = 70;
    },
    /*****************************
     * 体制個別の行数で高さを変更する
     */
    edittingTaiseiHeight(type, flexGrid) {
      if (type == 1) {
        if (this.gridItemName[0].taisei_kobetu.length == 1)
          flexGrid.rows[this.hendoRowsCount].height = 100;
        if (this.gridItemName[0].taisei_kobetu.length == 2)
          flexGrid.rows[this.hendoRowsCount].height = 50;
      }
      if (type == 2) {
        if (this.gridItemName[0].kobetu.length == 1)
          flexGrid.rows[this.kasanRow - 1].height = 50;
      }
    },
    /*******
     * 各情報タイトルの書き込み
     */
    methodWriteJyoho(flexGrid) {
      let hendoRows_st = 1; // 変動情報の始まりの行
      let kasanRows_st = this.rowCounts.hendoRowsCount; // 加算情報の始まり
      flexGrid.setCellData(hendoRows_st, 0, this.gridItemName[0].column[0]); // 変動情報

      let row = 0;
      for (let i = 0; i < this.gridItemName[0].shisetsuNyusho.length; i++) {
        flexGrid.setCellData(
          row + 1,
          1,
          this.gridItemName[0].shisetsuNyusho[i].name
        );
        // 食事用のflagがあれば、食事内容を表示する
        if (this.gridItemName[0].shisetsuNyusho[i].mealFlag) {
          for (let j = 0; j < this.gridItemName[0].meals.length; j++) {
            let k = i + 1 + j;
            flexGrid.setCellData(k, 3, this.gridItemName[0].meals[j]);
            row++;
          }
        } else if (this.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag) {
          row++;
          // 高熱水費の変更前文字列を記載
          flexGrid.setCellData(
            row,
            3,
            this.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag
          );
        } else {
          row++;
        }
      }

      // 加算情報
      // 体制・個別
      flexGrid.setCellData(kasanRows_st, 0, this.gridItemName[0].column[1]);
      flexGrid.setCellData(
        kasanRows_st,
        1,
        this.gridItemName[0].taisei_kobetu_name[0]
      );

      for (let i = 0; i < this.gridItemName[0].taisei_kobetu.length; i++) {
        flexGrid.setCellData(
          kasanRows_st++,
          2,
          this.gridItemName[0].taisei_kobetu[i].name
        );
      }
      // 個別
      flexGrid.setCellData(
        kasanRows_st,
        1,
        this.gridItemName[0].taisei_kobetu_name[1]
      );

      for (let i = 0; i < this.gridItemName[0].kobetu.length; i++) {
        flexGrid.setCellData(
          kasanRows_st++,
          2,
          this.gridItemName[0].kobetu[i].name
        );
      }
    },

    /***
     * 値の登録処理
     */
    methodSettingPoint(flexGrid) {
      // 利用日の設定
      this.settingRiyoubi(flexGrid);

      // 入院・退院日の設定
      if (this.deleteGridFlag == true && this.selectType == 'nyutaiin_add') {
        this.deleteNyuTaiin();
      } else if (
        this.editGridFlag == true &&
        this.selectType == 'nyutaiin_add'
      ) {
        this.editNyuTaiin();
      } else if (this.selectType == 'nyutaiin_add') {
        this.insertNyuTaiin();
        this.editGridFlag = true;
      } else {
        this.settingNyuTaiin();
      }

      // 外泊の設定
      if (this.deleteGridFlag == true && this.selectType == 'gaihaku') {
        this.deleteGaihaku();
      } else if (this.editGridFlag == true && this.selectType == 'gaihaku') {
        this.editGaihaku();
      } else if (this.selectType == 'gaihaku_add') {
        this.insertGaihaku();
        this.editGridFlag = true;
      } else {
        this.settingGaihaku();
      }
      //変動情報＋加算情報の登録
      this.settingHendoKasan();
    },

    /**************
     * セルのマージ処理
     */
    methodCellMerge(flexGrid) {
      let range = [];
      // todo if文の条件をキーの値に変更する
      // 宿泊型自立訓練
      let hendoRow = this.rowCounts.hendoRowsCount;
      let lastRow = this.rowCounts.kobetsuCount - 1;
      if (this.teikyoCode == '34') {
        range = [
          new wjGrid.CellRange(0, 1, 0, 3), // 項目
          new wjGrid.CellRange(1, 0, hendoRow - 1, 0), // 変動情報縦
          new wjGrid.CellRange(1, 1, 1, 3), // 利用日
          new wjGrid.CellRange(2, 1, 2, 3), // 入退院
          new wjGrid.CellRange(3, 1, 3, 3), // 外泊
          new wjGrid.CellRange(4, 1, 4, 2), // 食事
          new wjGrid.CellRange(5, 1, 5, 2), // 食事
        ];
      }
      // 共同生活援助
      if (this.teikyoCode == '33') {
        range = [
          new wjGrid.CellRange(0, 1, 0, 3),
          new wjGrid.CellRange(1, 0, hendoRow - 1, 0), // 変動情報縦
          new wjGrid.CellRange(1, 1, 1, 3), // 利用日
          new wjGrid.CellRange(2, 1, 2, 3), // 入退院
          new wjGrid.CellRange(3, 1, 3, 3), // 外泊
          new wjGrid.CellRange(4, 1, 4, 3), // 住居外利用
          new wjGrid.CellRange(5, 1, 5, 3), // 家賃
        ];
      }
      // 施設入所用
      if (this.teikyoCode == '32') {
        range = [
          new wjGrid.CellRange(0, 1, 0, 3),
          new wjGrid.CellRange(1, 0, hendoRow - 1, 0), // 変動情報縦
          new wjGrid.CellRange(1, 1, 1, 3), // 利用日
          new wjGrid.CellRange(2, 1, 2, 3), // 入退院
          new wjGrid.CellRange(3, 1, 3, 3), // 外泊
          new wjGrid.CellRange(4, 1, 4, 2), // 食事
          new wjGrid.CellRange(5, 1, 5, 2), // 食事
          new wjGrid.CellRange(6, 1, 6, 2), // 食事
          new wjGrid.CellRange(7, 1, hendoRow - 1, 2), // 光熱水費
        ];
      }
      range.push(
        new wjGrid.CellRange(hendoRow, 0, lastRow, 0) // 加算情報縦
      );
      range.push(
        new wjGrid.CellRange(
          hendoRow,
          1,
          hendoRow + this.gridItemName[0].taisei_kobetu.length - 1,
          1
        )
      );

      // 体制個別
      range.push(
        new wjGrid.CellRange(
          hendoRow + this.gridItemName[0].taisei_kobetu.length,
          1,
          hendoRow +
            this.gridItemName[0].taisei_kobetu.length +
            this.gridItemName[0].kobetu.length -
            1,
          1
        )
      );
      // 体制
      for (let i = hendoRow; i <= lastRow; i++) {
        range.push(new wjGrid.CellRange(i, 2, i, 3));
      }

      let mm = new wjGrid.MergeManager(this.mainGrid);
      mm.getMergedRange = function (panel, r, c) {
        for (let h = 0; h < range.length; h++) {
          if (range[h].contains(r, c)) {
            return range[h];
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    setUserSelectPoint(row) {
      this.userDataSelect[0]['riyosyo'] =
        this.userListComponentDatas[row].riyocode +
        ' ' +
        this.userListComponentDatas[row].names;

      this.userDataSelect[0]['jyukyusyabango'] =
        this.userListComponentDatas[row].jyukyuno;

      // 値の設定
      this.selectType = '';
      this.editGridFlag = '';
      this.settingChangeHndoJyoho();
    },

    /***************
     * ヘッダメニューのサービスを変更したとき
     */
    parentServiceChange(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.userDataSelect[0]['riyosyo'] = '';
      this.userDataSelect[0]['jyukyusyabango'] = '';
      this.settingChangeHndoJyoho();
    },
    /*************************
     * ダイアログの表示
     */
    // 入退院ダイアログの登録ボタン押下
    kikantuika_dialog_regist() {
      this.selectType = this.$refs.dialog_kikantuika.registData.type;
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      if (selectKey.length == 0) {
        // 空欄のときは新規追加
        this.editGridFlag = false;
      } else {
        this.editGridFlag = true;
      }
      this.deleteGridFlag = false;
      this.mainGrid.itemsSource = [];
    },

    // 加算追加ダイアログの登録ボタン押下
    kasantuika_dialog_regist() {
      let selectKasanName = this.$refs.dialog_kasantuika.registData.selectName;
      let addType = this.$refs.dialog_kasantuika.registData.addType;
      this.kasanRow = this.kasanRow + 1;
      if (addType == 1) {
        this.gridItemName[0].taisei_kobetu.push({ name: selectKasanName });
      } else {
        this.gridItemName[0].kobetu.push({ name: selectKasanName });
      }
      this.alertMessageFlag = true;
      this.deleteGridFlag = false;
      this.mainGrid.itemsSource = [];
    },

    // 入退院ダイアログの削除ボタン押下
    kikantuika_dialog_delete() {
      this.selectType = this.$refs.dialog_kikantuika.registData.type;
      this.deleteGridFlag = true;
      this.mainGrid.itemsSource = [];
    },
    // 加算追加ダイアログの削除ボタン押下
    kasantuika_dialog_delete() {
      let kasanid = this.$refs.dialog_kasantuika.kasanid;
      let type = this.$refs.dialog_kasantuika.type;
      if (type == 'taisei_kobetu') {
        this.gridItemName[0].taisei_kobetu.splice(kasanid, 1);
      }
      if (type == 'kobetu') {
        this.gridItemName[0].kobetu.splice(kasanid, 1);
      }
      this.kasanRow = this.kasanRow - 1;
      this.mainGrid.itemsSource = [];
    },

    // 変動情報ダイアログの表示
    openDialog_Term(type) {
      if (this.userDataSelect[0]['jyukyusyabango']) {
        this.$refs.dialog_kikantuika.parentFromOpenDialog('', type);
      } else {
        alert('ユーザを選択してください。');
      }
    },
    // 加算追加ダイアログの表示
    openDialog_Add() {
      if (this.userDataSelect[0]['jyukyusyabango']) {
        this.$refs.dialog_kasantuika.parentFromOpenDialog('0', 'add');
      } else {
        alert('ユーザを選択してください。');
      }
    },

    /*****************
     * 入退院の矢印作成
     */
    writingArrowNyutaiin(nyutaiin) {
      // 矢印の作成
      if (nyutaiin.length > 0) {
        // 描写データの作成
        let dateWrite = nyutaiin[0].date;
        for (let i = 0; i < dateWrite.length; i++) {
          // 秒に変換してloopを行う
          let st = new Date(dateWrite[i].start_date);
          let ed = new Date(dateWrite[i].end_date);

          let firstmonth = st.getMonth() + 1;
          let lastmonth = ed.getMonth() + 1;
          let firstday = st.getDate();
          let lastday = '';
          let lastyear = ed.getFullYear();
          let firstyear = st.getFullYear();
          if (firstmonth != lastmonth || firstyear != lastyear) {
            if (!(firstmonth == this.month && firstyear == this.year)) {
              firstday = 1;
            }
            if (lastmonth == this.month) {
              lastday = dateWrite[i].end_date.split('-')[2];
            } else {
              lastday = new Date(firstyear, firstmonth, 0).getDate();
              firstday = dateWrite[i].start_date.split('-')[2];
            }
          } else {
            lastday = ed.getDate();
          }

          let num = firstday;
          for (let d = st; d <= ed; d.setDate(d.getDate() + 1)) {
            // 当月分だけのリストを作成
            if (
              parseInt(this.month) == d.getMonth() + 1 &&
              parseInt(this.year) == d.getFullYear()
            ) {
              var days = d.getDate();
              var day = 'day' + days;
              if (num == firstday) {
                // 最初の矢印
                if (firstmonth != lastmonth || firstyear != lastyear) {
                  // 月跨ぎの際は線のみの表示
                  if (firstmonth == this.month && firstyear == this.year) {
                    nyutaiin[0]['date'][i][day] = 'arrow_start-' + i;
                  } else {
                    nyutaiin[0]['date'][i][day] = 'arrow_start_bar-' + i;
                  }
                } else {
                  nyutaiin[0]['date'][i][day] = 'arrow_start-' + i;
                }
              } else if (num == lastday) {
                // 最終の矢印
                if (firstmonth != lastmonth || firstyear != lastyear) {
                  // 月跨ぎの際は線のみの表示
                  if (
                    lastmonth == parseInt(this.month) &&
                    lastyear == parseInt(this.year)
                  ) {
                    nyutaiin[0]['date'][i][day] = 'arrow_end-' + i;
                  } else {
                    nyutaiin[0]['date'][i][day] = 'arrow-' + i;
                  }
                } else {
                  nyutaiin[0]['date'][i][day] = 'arrow_end-' + i;
                }
              } else {
                nyutaiin[0]['date'][i][day] = 'arrow-' + i;
              }
              num++;
            }
          }
          nyutaiin[0].date[i]['diff_date'] = num - firstday;
        }

        if (this.nyutaiinData.length == 0) {
          this.commonCreateArrows(nyutaiin, 2);
          this.nyutaiinData = nyutaiin;
        } else {
          nyutaiin = this.nyutaiinData;
          this.commonCreateArrows(nyutaiin, 2);
        }
      }
    },

    /*****************
     * 外泊の矢印作成
     */
    writingArrowGaihaku(gaihaku) {
      // 矢印の作成
      if (gaihaku.length > 0) {
        // 描写データの作成
        let dateWrite = gaihaku[0].date;
        for (let i = 0; i < dateWrite.length; i++) {
          // 秒に変換してloopを行う
          let st = new Date(dateWrite[i].start_date);
          let ed = new Date(dateWrite[i].end_date);

          let firstmonth = st.getMonth() + 1;
          let lastmonth = ed.getMonth() + 1;
          let firstday = st.getDate();
          let lastday = '';
          let lastyear = ed.getFullYear();
          let firstyear = st.getFullYear();
          if (firstmonth != lastmonth || firstyear != lastyear) {
            if (!(firstmonth == this.month && firstyear == this.year)) {
              firstday = 1;
            }
            if (lastmonth == this.month) {
              lastday = dateWrite[i].end_date.split('-')[2];
            } else {
              lastday = new Date(firstyear, firstmonth, 0).getDate();
              firstday = dateWrite[i].start_date.split('-')[2];
            }
          } else {
            lastday = ed.getDate();
          }

          let num = firstday;
          for (let d = st; d <= ed; d.setDate(d.getDate() + 1)) {
            // 当月分だけのリストを作成
            if (
              parseInt(this.month) == d.getMonth() + 1 &&
              parseInt(this.year) == d.getFullYear()
            ) {
              var days = d.getDate();
              var day = 'day' + days;
              if (num == firstday) {
                // 最初の矢印
                if (firstmonth != lastmonth || firstyear != lastyear) {
                  // 月跨ぎの際は線のみの表示
                  if (firstmonth == this.month && firstyear == this.year) {
                    gaihaku[0]['date'][i][day] = 'gaihaku_arrow_start-' + i;
                  } else {
                    gaihaku[0]['date'][i][day] = 'gaihaku_arrow_start_bar-' + i;
                  }
                } else {
                  gaihaku[0]['date'][i][day] = 'gaihaku_arrow_start-' + i;
                }
              } else if (num == lastday) {
                // 最終の矢印
                if (firstmonth != lastmonth || firstyear != lastyear) {
                  // 月跨ぎの際は線のみの表示
                  if (
                    lastmonth == parseInt(this.month) &&
                    lastyear == parseInt(this.year)
                  ) {
                    gaihaku[0]['date'][i][day] = 'gaihaku_arrow_end-' + i;
                  } else {
                    gaihaku[0]['date'][i][day] = 'gaihaku_arrow-' + i;
                  }
                } else {
                  gaihaku[0]['date'][i][day] = 'gaihaku_arrow_end-' + i;
                }
              } else {
                gaihaku[0]['date'][i][day] = 'gaihaku_arrow-' + i;
              }
              num++;
            }
          }
          gaihaku[0].date[i]['diff_date'] = num - firstday;
        }

        if (this.gaihakuData.length == 0) {
          this.commonCreateArrows(gaihaku, 3);
          this.gaihakuData = gaihaku;
        } else {
          gaihaku = this.gaihakuData;
          this.commonCreateArrows(gaihaku, 3);
        }
      }
    },

    /***********
     * 矢印作成
     */
    commonCreateArrows(data, row) {
      // 日付の重複チェック
      let doubleCheckFlag = [];
      for (let j = 0; j < data[0].date.length; j++) {
        if (data[0].date[j]) {
          let firstday = new Date(data[0].date[j].start_date);
          let lastday = new Date(data[0].date[j].end_date);

          for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
            let days = i.getDate();
            let d = 'day' + days;
            let firstyear = i.getFullYear();
            let firstmonth = i.getMonth() + 1;
            if (
              firstyear == this.year &&
              firstmonth == parseInt(this.month) &&
              data[0].date[j][d]
            ) {
              if (doubleCheckFlag[d]) {
                doubleCheckFlag[d] = doubleCheckFlag[d] + 1;
                data[0].date[j]['dayCount' + days] = true;
              } else {
                doubleCheckFlag[d] = 1;
              }
            }
          }
        }
      }

      for (let j = 0; j < data[0].date.length; j++) {
        let firstday = new Date(data[0].date[j].start_date);
        let lastday = new Date(data[0].date[j].end_date);
        for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
          let days = i.getDate();
          let d = 'day' + days;
          if (data[0].date[j][d] && doubleCheckFlag[d] > 1) {
            this.mainGrid.setCellData(
              row,
              days + 3,
              data[0].date[j][d].replace('start', 'double')
            );
          } else {
            this.mainGrid.setCellData(row, days + 3, data[0].date[j][d]);
          }
        }
      }
      let total = 0;
      for (let j = 0; j < data[0].date.length; j++) {
        total += data[0].date[j].diff_date;
      }
      this.mainGrid.setCellData(row, this.lastdate + 4, total);

      return;
    },

    /**************
     * セルのクリックイベント
     */
    methodCellClickEvent(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        if (_self.userDataSelect[0]['jyukyusyabango']) {
          let ht = flexGrid.hitTest(e);
          // console.log(ht.target.innerHTML);
          let hPage = flexGrid.hitTest(e.pageX, e.pageY);

          // 矢印下の箱を押下
          // 変動情報ダイアログ 入退院
          let regexp = /^<span class="d-none">termFlag_[0-9].*<\/span>/;
          if (ht.target.innerHTML.match(regexp)) {
            let selectKey = e.target.id.split('-')[1];
            let params = {};

            params = {
              selectKey: selectKey,
              byouinName: _self.nyutaiinData[0].date[selectKey].byouinName,
              nyuuinbi: _self.nyutaiinData[0].date[selectKey].start_date,
              taiinbi: _self.nyutaiinData[0].date[selectKey].end_date,
              taiinbi_notFlag:
                _self.nyutaiinData[0].date[selectKey].end_date_notFlag,
              // 入院用
              nyuuinbiShiseturiyo:
                _self.nyutaiinData[0].date[selectKey].nyuuinbiShiseturiyo,
              nyuuinbiBreakfast:
                _self.nyutaiinData[0].date[selectKey].nyuuinbiBreakfast,
              nyuuinbiLunch:
                _self.nyutaiinData[0].date[selectKey].nyuuinbiLunch,
              nyuuinbiDinner:
                _self.nyutaiinData[0].date[selectKey].nyuuinbiDinner,
              // 退院用
              taiinbiShiseturiyo:
                _self.nyutaiinData[0].date[selectKey].taiinbiShiseturiyo,
              taiinbiBreakfast:
                _self.nyutaiinData[0].date[selectKey].taiinbiBreakfast,
              taiinbiLunch: _self.nyutaiinData[0].date[selectKey].taiinbiLunch,
              taiinbiDinner:
                _self.nyutaiinData[0].date[selectKey].taiinbiDinner,
              taiinbiAida: _self.nyutaiinData[0].date[selectKey].taiinbiAida,
            };
            _self.$refs.dialog_kikantuika.parentFromOpenDialog(
              params,
              'nyutaiin_add'
            );
          }

          // 変動情報ダイアログ 外泊
          regexp = /^<span class="d-none">gaihaku_termFlag_[0-9].*<\/span>/;
          if (ht.target.innerHTML.match(regexp)) {
            let selectKey = e.target.id.split('-')[1];
            let params = {};
            params = {
              selectKey: selectKey,
              byouinName: _self.gaihakuData[0].date[selectKey].byouinName,
              nyuuinbi: _self.gaihakuData[0].date[selectKey].start_date,
              taiinbi: _self.gaihakuData[0].date[selectKey].end_date,
              taiinbi_notFlag:
                _self.gaihakuData[0].date[selectKey].end_date_notFlag,
              // 入院用
              nyuuinbiShiseturiyo:
                _self.gaihakuData[0].date[selectKey].nyuuinbiShiseturiyo,
              nyuuinbiBreakfast:
                _self.gaihakuData[0].date[selectKey].nyuuinbiBreakfast,
              nyuuinbiLunch: _self.gaihakuData[0].date[selectKey].nyuuinbiLunch,
              nyuuinbiDinner:
                _self.gaihakuData[0].date[selectKey].nyuuinbiDinner,
              // 退院用
              taiinbiShiseturiyo:
                _self.gaihakuData[0].date[selectKey].taiinbiShiseturiyo,
              taiinbiBreakfast:
                _self.gaihakuData[0].date[selectKey].taiinbiBreakfast,
              taiinbiLunch: _self.gaihakuData[0].date[selectKey].taiinbiLunch,
              taiinbiDinner: _self.gaihakuData[0].date[selectKey].taiinbiDinner,
              taiinbiAida: _self.gaihakuData[0].date[selectKey].taiinbiAida,
            };

            _self.$refs.dialog_kikantuika.parentFromOpenDialog(
              params,
              'gaihaku'
            );
          }

          // 変動情報ダイアログ
          // 各加算情報編集用
          for (let i = 0; i < _self.gridItemName[0].taisei_kobetu.length; i++) {
            if (
              ht.target.innerText == _self.gridItemName[0].taisei_kobetu[i].name
            ) {
              _self.$refs.dialog_kasantuika.parentFromOpenDialog(
                i,
                'taisei_kobetu'
              );
            }
          }
          for (let i = 0; i < _self.gridItemName[0].kobetu.length; i++) {
            if (ht.target.innerText == _self.gridItemName[0].kobetu[i].name) {
              _self.$refs.dialog_kasantuika.parentFromOpenDialog(i, 'kobetu');
            }
          }
          // 4列目より前は何もしない
          // 3行目より上は何もしない
          if (hPage.col < startPoint) {
            return false;
          }
          if (hPage.row <= 3 && ht.target.innerText.length == 0) {
            return false;
          }
          // 最終日以降の2列は何もしない
          if (_self.lastdate + startPoint <= hPage.col) {
            return false;
          }

          // クリックをした位置
          let d = 'day' + (hPage.col - 3); // 日付
          _self.dayPoint = { day: d, dayrow: hPage.row };
          let selectedPoint = 0;
          if (ht.target.innerText == '〇') {
            selectedPoint = 3;
          }
          if (ht.target.innerText == '') {
            selectedPoint = 2;
          }
          _self.selectedPoint = selectedPoint;

          // 値を配列に登録s
          _self.edittingUse(_self, hPage, d);
          _self.edittingMeals();
          _self.edittingKounetusui();
          _self.edittingKasan();
        } else {
          alert('利用者を選択してください。');
        }
      });
    },

    /********
     * 入院・退院日の編集
     */
    editNyuTaiin() {
      let nyutaiin = [];
      // 別コンポーネントダイアログのregistDataの値を取得(キーのみ)
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      nyutaiin = this.nyutaiinData;
      // 日付情報を一度クリア
      for (let i = 1; i <= this.lastdate; i++) {
        let d = 'day' + i;
        nyutaiin[0]['date'][selectKey][d] = '';
      }
      // 日付のloop
      // 秒に変換してloopを行う
      let st = new Date(this.$refs.dialog_kikantuika.registData.nyuuinbi);
      let ed = new Date(this.$refs.dialog_kikantuika.registData.taiinbi);
      let lastyear = ed.getFullYear();
      let lastmonth = ed.getMonth() + 1;

      // 日付の差分
      var diff = ed - st;
      diff = parseInt(diff / 1000 / 60 / 60 / 24) + 1;
      nyutaiin[0]['date'][selectKey]['start_date'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbi;
      // 退院日が当年月の場合は end_date_notFlagをfalseにする
      if (parseInt(this.month) == lastmonth && this.year == lastyear) {
        nyutaiin[0]['date'][selectKey]['end_date_notFlag'] = false;
      }

      if (nyutaiin[0]['date'][selectKey]['end_date_notFlag']) {
        // end_date_notFlagがある時は翌月の末
        nyutaiin[0]['date'][selectKey]['end_date'] = moment()
          .add('months', 1)
          .endOf('month')
          .format('YYYY-MM-DD');
      } else {
        nyutaiin[0]['date'][selectKey]['end_date'] =
          this.$refs.dialog_kikantuika.registData.taiinbi;
      }
      nyutaiin[0]['date'][selectKey]['end_date_notFlag'] =
        this.$refs.dialog_kikantuika.registData.taiinbi_notFlag;
      nyutaiin[0]['date'][selectKey]['nyuuinbiShiseturiyo'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo;
      nyutaiin[0]['date'][selectKey]['taiinbiShiseturiyo'] =
        this.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo;
      nyutaiin[0]['date'][selectKey]['nyuuinbiBreakfast'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast;
      nyutaiin[0]['date'][selectKey]['nyuuinbiLunch'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiLunch;
      nyutaiin[0]['date'][selectKey]['nyuuinbiDinner'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiDinner;
      nyutaiin[0]['date'][selectKey]['taiinbiBreakfast'] =
        this.$refs.dialog_kikantuika.registData.taiinbiBreakfast;
      nyutaiin[0]['date'][selectKey]['taiinbiLunch'] =
        this.$refs.dialog_kikantuika.registData.taiinbiLunch;
      nyutaiin[0]['date'][selectKey]['taiinbiDinner'] =
        this.$refs.dialog_kikantuika.registData.taiinbiDinner;
      nyutaiin[0]['date'][selectKey]['taiinbiAida'] =
        this.$refs.dialog_kikantuika.registData.taiinbiAida;

      nyutaiin[0]['date'][selectKey]['diff_date'] = diff;

      nyutaiin[0]['date'][selectKey]['byouinName'] =
        this.$refs.dialog_kikantuika.registData.byouinName;

      this.writingArrowNyutaiin(nyutaiin);
    },

    /*********
     * 外泊の編集
     */
    editGaihaku() {
      let gaihaku = [];
      // 別コンポーネントダイアログのregistDataの値を取得(キーのみ)
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      gaihaku = this.gaihakuData;
      // 日付情報を一度クリア
      for (let i = 1; i <= this.lastdate; i++) {
        let d = 'day' + i;
        gaihaku[0]['date'][selectKey][d] = '';
      }

      // 日付のloop
      // 秒に変換してloopを行う
      let st = new Date(this.$refs.dialog_kikantuika.registData.nyuuinbi);
      let ed = new Date(this.$refs.dialog_kikantuika.registData.taiinbi);
      // 日付の差分
      var diff = ed - st;
      diff = parseInt(diff / 1000 / 60 / 60 / 24) + 1;

      gaihaku[0]['date'][selectKey]['start_date'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbi;

      if (gaihaku[0]['date'][selectKey]['end_date_notFlag']) {
        // end_date_notFlagがある時は翌月の末
        gaihaku[0]['date'][selectKey]['end_date'] = moment()
          .add('months', 1)
          .endOf('month')
          .format('YYYY-MM-DD');
      } else {
        gaihaku[0]['date'][selectKey]['end_date'] =
          this.$refs.dialog_kikantuika.registData.taiinbi;
      }
      gaihaku[0]['date'][selectKey]['end_date_notFlag'] =
        this.$refs.dialog_kikantuika.registData.taiinbi_notFlag;
      gaihaku[0]['date'][selectKey]['nyuuinbiShiseturiyo'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo;
      gaihaku[0]['date'][selectKey]['taiinbiShiseturiyo'] =
        this.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo;
      gaihaku[0]['date'][selectKey]['nyuuinbiBreakfast'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast;
      gaihaku[0]['date'][selectKey]['nyuuinbiLunch'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiLunch;
      gaihaku[0]['date'][selectKey]['nyuuinbiDinner'] =
        this.$refs.dialog_kikantuika.registData.nyuuinbiDinner;
      gaihaku[0]['date'][selectKey]['taiinbiBreakfast'] =
        this.$refs.dialog_kikantuika.registData.taiinbiBreakfast;
      gaihaku[0]['date'][selectKey]['taiinbiLunch'] =
        this.$refs.dialog_kikantuika.registData.taiinbiLunch;
      gaihaku[0]['date'][selectKey]['taiinbiDinner'] =
        this.$refs.dialog_kikantuika.registData.taiinbiDinner;
      gaihaku[0]['date'][selectKey]['taiinbiAida'] =
        this.$refs.dialog_kikantuika.registData.taiinbiAida;

      gaihaku[0]['date'][selectKey]['diff_date'] = diff;

      gaihaku[0]['date'][selectKey]['byouinName'] =
        this.$refs.dialog_kikantuika.registData.byouinName;
      this.writingArrowGaihaku(gaihaku);
    },
    edittingKasan() {
      let rows = this.rowCounts.hendoRowsCount;
      // 体制+個別用の配列番号
      if (this.dayPoint && rows <= this.dayPoint.dayrow) {
        // 変動情報と体制・個別を合わせたものより大きい場合は個別用配列を利用する
        if (
          rows + this.gridItemName[0]['taisei_kobetu'].length <=
          this.dayPoint.dayrow
        ) {
          let k =
            this.dayPoint.dayrow -
            (rows + this.gridItemName[0]['taisei_kobetu'].length);
          if (this.gridItemName[0]['kobetu'][k]['date']) {
            // 選択した値を登録
            this.gridItemName[0]['kobetu'][k]['date'][this.dayPoint.day] =
              this.selectedPoint;
          } else {
            // 配列がないときは配列を作成
            let d = this.dayPoint.day;
            this.gridItemName[0]['kobetu'][k]['date'] = [];
            this.gridItemName[0]['kobetu'][k]['date'][d] = this.selectedPoint;
          }
        } else {
          let k = this.dayPoint.dayrow - rows;
          if (this.gridItemName[0]['taisei_kobetu'][k]['date']) {
            // 選択した値を登録
            this.gridItemName[0]['taisei_kobetu'][k]['date'][
              this.dayPoint.day
            ] = this.selectedPoint;
          } else {
            // 配列がないときは配列を作成
            let d = this.dayPoint.day;
            this.gridItemName[0]['taisei_kobetu'][k]['date'] = [];
            this.gridItemName[0]['taisei_kobetu'][k]['date'][d] =
              this.selectedPoint;
          }
        }
      }
      // 加算情報作成
      this.creatingKasan();
    },

    /****************
     * 加算情報登録
     */
    creatingKasan() {
      let rows = this.rowCounts.hendoRowsCount;
      let _self = this;
      this.gridItemName[0].taisei_kobetu.forEach(function (elements) {
        let total = 0;
        for (let i = 1; i <= _self.lastdate; i++) {
          let d = 'day' + i;
          if (elements['date']) {
            _self.mainGrid.setCellData(rows, i + 3, elements['date'][d]);
            if (elements['date'][d] == 2 || elements['date'][d] == 1) {
              total++;
            }
          }
          _self.mainGrid.setCellData(rows, _self.lastdate + startPoint, total);
        }
        rows++;
      });

      this.gridItemName[0].kobetu.forEach(function (elements) {
        let total = 0;
        for (let i = 1; i <= _self.lastdate; i++) {
          let d = 'day' + i;
          if (elements['date']) {
            _self.mainGrid.setCellData(rows, i + 3, elements['date'][d]);
            if (elements['date'][d] == 2 || elements['date'][d] == 1) {
              total++;
            }
          }
          _self.mainGrid.setCellData(rows, _self.lastdate + startPoint, total);
        }
        rows++;
      });
    },
    /***********
     * 光熱水費
     */
    edittingKounetusui() {
      let rows = this.rowCounts.hendoRowsCount - 1;
      let kounetusuihi = this.kounetusuihi;
      if (this.dayPoint && this.dayPoint['dayrow'] == rows) {
        kounetusuihi[0][this.dayPoint['day']] = this.selectedPoint;
        if (this.selectedPoint == 2) {
          kounetusuihi[0]['total'] = kounetusuihi[0]['total'] + 1;
          kounetusuihi[0]['money'] =
            kounetusuihi[0]['money'] +
            this.gridItemName[0].kounetsuSuihi[0]['count'];
        } else if (this.selectedPoint == 3) {
          kounetusuihi[0]['total'] = kounetusuihi[0]['total'] - 1;
          kounetusuihi[0]['money'] =
            kounetusuihi[0]['money'] -
            this.gridItemName[0].kounetsuSuihi[0]['count'];
        }
      }
      for (let i = 0; i <= this.lastdate; i++) {
        let d = 'day' + (i + 1);
        this.mainGrid.setCellData(rows, i + startPoint, kounetusuihi[0][d]);
      }
      this.mainGrid.setCellData(
        rows,
        this.lastdate + startPoint,
        kounetusuihi[0]['total']
      );
      this.mainGrid.setCellData(
        rows,
        this.lastdate + totalPoint,
        kounetusuihi[0]['money']
      );
    },
    /**************
     * 値の変更
     */
    edittingUse(_self, hPage, d) {
      if (_self.rowCounts.rowColumn[hPage.row - 1] == 'kounetsuSuihiFlag') {
        _self.kounetusuihi[0][d] = _self.selectedPoint;
      }
      // 体制・個別
      let taiseiRow = hPage.row - _self.hendoRowsCount;
      if (taiseiRow >= 0 && _self.gridItemName[0]['taisei_kobetu'][taiseiRow]) {
        _self.gridItemName[0]['taisei_kobetu'][taiseiRow]['date'][d] =
          _self.selectedPoint;
      }
      // 個別
      let kobetsuRow = hPage.row - _self.taiseiKobetsuRowsCount;
      if (kobetsuRow >= 0 && _self.gridItemName[0].kobetu[kobetsuRow]) {
        _self.gridItemName[0].kobetu[kobetsuRow]['date'][d] =
          _self.selectedPoint;
      }
    },

    /**************
     * 入院・退院の削除
     */
    deleteNyuTaiin() {
      let nyutaiin = [];
      // 別コンポーネントダイアログのregistDataの値を取得(キーのみ)
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      nyutaiin = this.nyutaiinData;
      nyutaiin[0]['date'].splice(selectKey, 1);

      // 入退院の矢印作成
      this.writingArrowNyutaiin(nyutaiin);
    },
    /**************
     * 外泊の削除
     */
    deleteGaihaku() {
      let gaihaku = [];
      // 別コンポーネントダイアログのregistDataの値を取得(キーのみ)
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      gaihaku = this.gaihakuData;
      gaihaku[0]['date'].splice(selectKey, 1);

      this.writingArrowGaihaku(gaihaku);
    },

    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 64;
      if (height > 800) {
        ht = 75;
      } else if (height > 700) {
        ht = 70;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#kobeturiyo {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px;
  .container {
    padding: 4px;
  }
  .wj-cells {
    font-size: $cell_fontsize;
  }
  .wj-cell {
    padding: 1px !important;
  }
  .wj-cells .wj-cell.wj-state-selected {
    background-color: $light-white !important;
    color: $font_color !important;
  }
  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 140px;
    height: 100%;
  }
  // 受給者証状況用のエリアボックス
  .jyukyusyaBox {
    height: 60px;
    overflow-y: auto;
  }
  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }

  .rightArea {
    min-width: 50%;
    max-width: none;
    width: 1020px;
  }

  .gridBackground {
    background-color: $grid_background;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.backGray {
      background-color: $selected_color;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      font-size: 16px;
    }
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
    }
  }
  .bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    font-size: 16px;
  }

  // 期間追加・加算追加ボタン
  a {
    &.addButton {
      height: 20px;
      width: 100px;
      background-color: $white;
      border: 1px solid $font_color;
      display: block;
      float: left;
      color: $font_color !important;
      text-align: right;
      border-radius: 3px;
      padding: 0px 10px 0px 0px;
      cursor: pointer;
      background-image: url('../assets/plus_15px.png');
      background-position: top 1px left 1px;
      &:hover {
        background-color: $selected_color;
      }
    }
  }
  #flexGrid {
    width: 100%;
    max-width: none;
    min-width: 1300px-275;
    .wj-cell {
      padding: 0 !important;
      &.wj-frozen-row {
        text-align: center;
        z-index: 2 !important;
      }
    }
    .wj-frozen {
      background-color: $selected_color;
    }
  }

  // 手修正済み
  div.editMark {
    width: 30px;
    height: 14px;
    margin-top: 3px;
    background-color: $pink;
  }

  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  // ヘッド
  .head {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  // 縦書き
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }

  // 矢印
  .green-arrow_double,
  .green-arrow_end,
  .green-arrow_start,
  .red-arrow_double,
  .red-arrow_end,
  .red-arrow_start {
    border-top: 4px solid $red;
    display: block;
    position: absolute;
    width: 100%;
    top: 5px;
    left: 0;
    text-indent: -9999px;
  }

  .green-arrow,
  .red-arrow {
    border-top: 4px solid $red;
    width: 120px;
    padding: 0 !important;
    text-indent: -9999px;
    margin-top: -14px;
    div {
      width: 100%;
      position: absolute;
      left: 0;
      top: 5px;
      padding: 0;
    }
  }
  .lastboard {
    .red-arrow {
      width: auto !important;
    }
    .green-arrow {
      width: auto !important;
    }
  }
  .green-arrow_double,
  .green-arrow,
  .green-arrow_end,
  .green-arrow_start {
    border-top: 4px solid $green;
  }

  .green-arrow_start,
  .red-arrow_start {
    > div {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-right: 6px solid $red;
      border-bottom: 6px solid transparent;
      position: absolute;
      left: -2px;
      top: -8px;
    }
  }

  .green-arrow_start {
    > div {
      border-right: 6px solid $green;
    }
  }

  .green-arrow_end,
  .red-arrow_end {
    div {
      width: 0;
      height: 0;
      border-left: 6px solid $red;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      position: absolute;
      left: auto;
      right: -2px;
      top: -8px;
    }
  }

  .green-arrow_end {
    div {
      border-left: 6px solid green;
    }
  }

  .red-arrow_double {
    > div {
      width: 10px;
      height: 8px;
      border-top: 6px solid transparent;
      border-right: 6px solid $red;
      border-left: 6px solid $red;
      border-bottom: 6px solid transparent;
      position: absolute;
      left: 8%;
      top: -8px;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      @include pc {
        left: 10%;
      }
      @include max-width {
        left: 14%;
      }
    }
  }

  .green-arrow_double {
    > div {
      width: 10px;
      height: 8px;
      border-top: 6px solid transparent;
      border-right: 6px solid $green;
      border-left: 6px solid $green;
      border-bottom: 6px solid transparent;
      position: absolute;
      left: 4px;
      top: -8px;
    }
  }

  .arrow_box {
    width: 140px;
    margin-top: -5px;
    cursor: pointer;
    margin-left: 1%;
    div {
      color: blue;
      position: absolute;
      background-color: $white;
      border: 1px solid $font_color;
      z-index: 1;
      top: 14px;
    }
  }
  // スクロールバーの表示
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }
}
</style>