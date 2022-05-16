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
                <v-card class="pa-1 light_yellow" :width="180" outlined tile>
                  {{ userDataSelect[0].riyosyo }}
                </v-card>
                <v-card
                  class="pr-2 ml-2 text-center"
                  elevation="0"
                  :min-width="80"
                >
                  <label class="greyLabel">受給者番号</label>
                </v-card>
                <v-card class="pa-1 light_yellow" :width="180" outlined tile>
                  {{ userDataSelect[0].jyukyusyabango }}
                </v-card>
              </v-card>
            </v-col>
            <v-col class="text-end">
              生活支援変動情報:
              <v-btn class="pa-3" small>
                <v-icon x-small class="white mr-3 pa-1 rounded-circle">
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
            :allowDragging="false"
            :allowResizing="false"
            :deferResizing="false"
            :allowSorting="false"
            :selectionMode="'None'"
            style="height: 65vh"
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
const startPoint = 4;
const totalPoint = startPoint + 1;
export default {
  data() {
    return {
      plusOne: 1, //該当日付を含める
      mainGrid: [], //表示grid
      riyoubiData: [], //利用日データ
      nyutaiinData: [], //入退院データ
      gaihakuData: [], //外泊データ
      mealsData: [], //食事データ
      gridItemName: [], //変動情報の表示内容
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
    };
  },
  components: {
    HeaderServices,
    UserListPrint,
    DialogKikantuika,
    DialogKasantuika,
  },
  methods: {
    // 変動情報の切り替え配列
    changeHndoJyoho: function () {
      let hendo = [];
      let items = ['項目', '合計', '金額'];
      let columns = ['変動情報', '加算情報'];

      let define_taisei_kobetu = [
        {
          jyukyusyabango: '8765432100',
          name: '重度障害者支援加算Ⅱ2',
          date: {
            day1: 2,
            day2: 2,
            day3: 2,
            day4: 2,
            day14: 2,
            day15: 2,
            day16: 3,
          },
        },
        {
          jyukyusyabango: '8765432100',
          name: '重度障害者支援加算Ⅱ2',
          date: {
            day1: 2,
            day2: 2,
            day3: 2,
            day4: 2,
            day14: 2,
            day15: 2,
            day16: 3,
          },
        },
        {
          jyukyusyabango: '8765432100',
          name: '重度障害者支援加算Ⅱ3',
          date: {
            day11: 2,
            day12: 2,
            day13: 2,
            day14: 2,
            day24: 2,
            day25: 2,
            day26: 3,
          },
        },
        {
          jyukyusyabango: '8765432100',
          name: '栄養マネジメント加算',
          date: {},
        },
        {
          jyukyusyabango: '8765432100',
          name: '療養食加算',
          date: {},
        },
        {
          jyukyusyabango: '8765432100',
          name: '口腔衛生管理加算',
          date: {
            day1: 1,
            day2: 1,
            day3: 1,
            day4: 1,
          },
        },
      ];
      let define_kobetu = [
        {
          jyukyusyabango: '8765432100',
          name: '入院・外泊時加算',
          date: {},
        },
        {
          jyukyusyabango: '8765432100',
          name: '地域移行加算',
          date: {
            day1: 2,
            day2: 2,
            day14: 2,
            day18: 2,
            day24: 2,
          },
        },
      ];

      //選択された受給者番号のデータのみ対象にする
      //apiが利用されたら不要
      let define_taisei_kobetu_data = define_taisei_kobetu;
      define_taisei_kobetu = [];
      for (let i = 0; i < define_taisei_kobetu_data.length; i++) {
        if (
          this.userDataSelect[0]['jyukyusyabango'] ==
          define_taisei_kobetu_data[i]['jyukyusyabango']
        ) {
          define_taisei_kobetu.push(define_taisei_kobetu_data[i]);
        }
      }
      let define_kobetu_data = define_kobetu;
      define_kobetu = [];
      for (let i = 0; i < define_kobetu_data.length; i++) {
        if (
          this.userDataSelect[0]['jyukyusyabango'] ==
          define_kobetu_data[i]['jyukyusyabango']
        ) {
          define_kobetu.push(define_kobetu_data[i]);
        }
      }

      if (this.teikyoCode == '34') {
        hendo = [
          {
            heads: items,
            column: columns,
            shisetsuNyusho: [
              { name: '利用日' },
              { name: '入院・退院日' },
              { name: '外泊日' },
              { name: '食事', mealFlag: true },
            ],
            meals: ['朝食', '夕食'],
            mealsKey: ['breakfast', 'dinner'],
            taisei_kobetu: define_taisei_kobetu,
            kobetu: define_kobetu,
            kasanRow: define_taisei_kobetu.length + define_kobetu.length,
            taisei_kobetu_name: ['体制+個別', '個別'],
            mealsCount: [300, 500],
          },
        ];
      } else if (this.teikyoCode == '33') {
        hendo = [
          {
            heads: items,
            column: columns,
            shisetsuNyusho: [
              { name: '利用日' },
              { name: '入院・退院日' },
              { name: '外泊日' },
              { name: '住居外利用', jyukyogairiyoFlag: true },
              { name: '家賃', yatinFlag: true },
            ],
            meals: ['朝食', '昼食', '夕食'],
            mealsKey: ['breakfast', 'lunch', 'dinner'],
            taisei_kobetu: define_taisei_kobetu,
            kobetu: define_kobetu,
            kasanRow: define_taisei_kobetu.length + define_kobetu.length,
            taisei_kobetu_name: ['体制+個別', '個別'],
            mealsCount: [300, 400, 500],
            kounetsuSuihi: [{ count: 100 }],
          },
        ];
      } else if (this.teikyoCode == '32') {
        hendo = [
          {
            heads: items,
            column: columns,
            shisetsuNyusho: [
              { name: '利用日' },
              { name: '入院・退院日' },
              { name: '外泊日' },
              { name: '食事', mealFlag: true },
              { name: '光熱水費', kounetsuSuihiFlag: 'kounetsuSuihiFlag' },
            ],
            meals: ['朝食', '昼食', '夕食'],
            mealsKey: ['breakfast', 'lunch', 'dinner'],
            taisei_kobetu: define_taisei_kobetu,
            kobetu: define_kobetu,
            kasanRow: define_taisei_kobetu.length + define_kobetu.length,
            taisei_kobetu_name: ['体制+個別', '個別'],
            mealsCount: [300, 400, 500],
            kounetsuSuihi: [{ count: 100 }],
          },
        ];
      } else {
        console.log(
          'you cannot select service this one . Please Select other Service. '
        );
      }
      this.gridItemName = hendo;

      //表示されるカラム
      this.viewColumn();

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
    //表示されるカラムの指定
    viewColumn: function () {
      let rowColumn = [];
      let hendoRowsCount = 0; // 変動情報の行数
      let taiseiKobetsuRowsCount = 0; // 体制個別の行数
      let kobetsuCount = 0; // 個別の行数
      if (this.gridItemName[0]) {
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

        hendoRowsCount = rowColumn.length;

        for (let i = 0; i < this.gridItemName[0].taisei_kobetu.length; i++) {
          rowColumn.push(this.gridItemName[0].taisei_kobetu[i].name);
        }
        taiseiKobetsuRowsCount = rowColumn.length;

        for (let i = 0; i < this.gridItemName[0].kobetu.length; i++) {
          rowColumn.push(this.gridItemName[0].kobetu[i].name);
        }
        kobetsuCount = rowColumn.length;

        // +1 はタイトルの部分を追加
        this.hendoRowsCount = hendoRowsCount + 1;
        this.taiseiKobetsuRowsCount = taiseiKobetsuRowsCount + 1;
        this.kobetsuCount = kobetsuCount + 1;
        this.rowColumn = rowColumn;
      }
    },
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent: function (data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    setUserSelectPoint: function (row) {
      this.userDataSelect[0]['riyosyo'] =
        this.userListComponentDatas[row].riyocode +
        ' ' +
        this.userListComponentDatas[row].names;

      this.userDataSelect[0]['jyukyusyabango'] =
        this.userListComponentDatas[row].jyukyuno;
      // 値の設定
      this.changeHndoJyoho();
    },
    //ヘッダメニューのサービス初回選択 検索ボタン
    parentServiceSelect: function (serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument['teikyo_year'];
      this.month = serviceArgument['teikyo_month'];
      let m = moment(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();
      this.changeHndoJyoho();
      if (serviceArgument['search_button']) {
        this.$refs.user_list_print.setChildTeikyocode(
          this.teikyoCode,
          serviceArgument['search_button']
        );
      }
    },
    /***************
     * ヘッダメニューのサービスを変更したとき
     */
    parentServiceChange: function (serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.userDataSelect[0] = [];
      this.changeHndoJyoho();
    },
    //変動情報ダイアログの登録ボタン押下
    kikantuika_dialog_regist: function () {
      this.selectType = this.$refs.dialog_kikantuika.registData.type;
      let selectKey = this.$refs.dialog_kikantuika.registData.selectKey;
      if (selectKey.length == 0) {
        // 空欄のときは新規追加
        this.editGridFlag = false;
      } else {
        this.editGridFlag = true;
      }
      this.mainGrid.itemsSource = [];
    },
    //変動情報ダイアログの登録ボタン押下
    kasantuika_dialog_regist: function () {
      let selectKasanName = this.$refs.dialog_kasantuika.registData.selectName;
      let addType = this.$refs.dialog_kasantuika.registData.addType;
      this.kasanRow = this.kasanRow + 1;
      if (addType == 1) {
        this.gridItemName[0].taisei_kobetu.push({ name: selectKasanName });
      } else {
        this.gridItemName[0].kobetu.push({ name: selectKasanName });
      }
      this.alertMessageFlag = true;

      this.mainGrid.itemsSource = [];
    },
    //変動情報ダイアログの削除ボタン押下
    kasantuika_dialog_delete: function () {
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
    //変動情報ダイアログの削除ボタン押下
    kikantuika_dialog_delete: function () {
      this.selectType = this.$refs.dialog_kikantuika.registData.type;
      this.deleteGridFlag = true;
      this.mainGrid.itemsSource = [];
    },
    onitemsSourceChanged: function (flexGrid) {
      let _self = this;
      // セル初期カラム情報
      try {
        methodCellSettingDefault(flexGrid, _self);
        // 情報タイトルパーツの書き込み
        methodWriteJyoho(flexGrid, _self);
        //値の登録
        methodSettingPoint(flexGrid, _self);
        //セルマージ
        methodCellMerge(flexGrid, _self);
      } catch (e) {
        console.log(e);
      }
    },
    // グリッドイニシアライズ
    onInitialized: function (flexGrid) {
      try {
        //初回の提供サービスコードを渡す
        this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);

        this.mainGrid = flexGrid;
        flexGrid.autoSizeColumns();
        let _self = this;
        // セル情報のフォーマット指定
        methodCellFormatSetting(flexGrid, _self);

        //セルのクリックイベント
        methodCellClickEvent(flexGrid, _self);
      } catch (e) {
        console.log(e);
      }
      let data = [];
      flexGrid.itemsSource = data;
    },
  },
};

/*******************
 * セル初期カラム情報
 */
function methodCellSettingDefault(flexGrid, _self) {
  let lastdate = _self.lastdate;
  let plus = 6; //日付以外の列数
  flexGrid.columns.clear();
  while (flexGrid.columns.length < lastdate + plus) {
    flexGrid.columns.push(new wjGrid.Column());
  }
  let row = 0;
  row = _self.hendoRowsCount + _self.gridItemName[0].kasanRow;

  _self.kasanRow = row;
  flexGrid.rows.clear();
  while (flexGrid.rows.length < row) {
    flexGrid.rows.push(new wjGrid.Row());
  }

  flexGrid.frozenColumns = 4;
  flexGrid.frozenRows = 1;
  flexGrid.columns[0].width = 32;
  flexGrid.columns[1].width = 32;
  flexGrid.columns[2].width = '8*';
  flexGrid.columns[3].width = '8*';
  flexGrid.rows[0].height = 48;
  flexGrid.rows[2].height = 38;
  flexGrid.rows[3].height = 38;
  if (_self.gridItemName[0].taisei_kobetu.length == 1)
    flexGrid.rows[_self.hendoRowsCount].height = 100;
  if (_self.gridItemName[0].taisei_kobetu.length == 2)
    flexGrid.rows[_self.hendoRowsCount].height = 50;
  if (_self.gridItemName[0].kobetu.length == 1)
    flexGrid.rows[_self.kasanRow - 1].height = 50;

  flexGrid.rows.defaultSize = 32;
  //flexGrid.rows.minSize = 40;
  flexGrid.setCellData(0, 0, '');
  flexGrid.setCellData(0, 1, _self.gridItemName[0].heads[0]);
  flexGrid.setCellData(0, 2, '');

  //日付の表示
  let date = '';
  let day = '';
  for (let i = 4; i <= lastdate + 3; i++) {
    flexGrid.columns[i].width = '2.2*';
    day = String(i - 3).padStart(2, '0');
    date = _self.year + '/' + _self.month + '/' + day;
    flexGrid.setCellData(0, i, date);
  }
  //最終日だけ日付がつぶれるので幅を大きくし対応
  flexGrid.columns[lastdate + 3].width = '2.6*';
  //合計
  flexGrid.setCellData(0, lastdate + 4, _self.gridItemName[0].heads[1]);
  flexGrid.columns[lastdate + 4].width = 35;
  //金額
  flexGrid.setCellData(0, lastdate + 5, _self.gridItemName[0].heads[2]);
  flexGrid.columns[lastdate + 5].width = 70;
}
/*******
 * 各情報タイトルの書き込み
 */
function methodWriteJyoho(flexGrid, _self) {
  let hendoRows_st = 1; //変動情報の始まりの行
  let kasanRows_st = _self.hendoRowsCount; // 加算情報の始まり
  flexGrid.setCellData(hendoRows_st, 0, _self.gridItemName[0].column[0]); //変動情報

  let row = 0;
  for (let i = 0; i < _self.gridItemName[0].shisetsuNyusho.length; i++) {
    flexGrid.setCellData(
      row + 1,
      1,
      _self.gridItemName[0].shisetsuNyusho[i].name
    );
    //食事用のflagがあれば、食事内容を表示する
    if (_self.gridItemName[0].shisetsuNyusho[i].mealFlag) {
      for (let j = 0; j < _self.gridItemName[0].meals.length; j++) {
        let k = i + 1 + j;
        flexGrid.setCellData(k, 3, _self.gridItemName[0].meals[j]);
        row++;
      }
    } else if (_self.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag) {
      row++;
      //高熱水費の変更前文字列を記載
      flexGrid.setCellData(
        row,
        3,
        _self.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag
      );
    } else {
      row++;
    }
  }

  //加算情報
  //体制・個別
  flexGrid.setCellData(kasanRows_st, 0, _self.gridItemName[0].column[1]);

  flexGrid.setCellData(
    kasanRows_st,
    1,
    _self.gridItemName[0].taisei_kobetu_name[0]
  );

  for (let i = 0; i < _self.gridItemName[0].taisei_kobetu.length; i++) {
    flexGrid.setCellData(
      kasanRows_st++,
      2,
      _self.gridItemName[0].taisei_kobetu[i].name
    );
  }
  //個別
  flexGrid.setCellData(
    kasanRows_st,
    1,
    _self.gridItemName[0].taisei_kobetu_name[1]
  );

  for (let i = 0; i < _self.gridItemName[0].kobetu.length; i++) {
    flexGrid.setCellData(
      kasanRows_st++,
      2,
      _self.gridItemName[0].kobetu[i].name
    );
  }
}
/**************
 * セルのクリックイベント
 */
function methodCellClickEvent(flexGrid, _self) {
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
          //入院用
          nyuuinbiShiseturiyo:
            _self.nyutaiinData[0].date[selectKey].nyuuinbiShiseturiyo,
          nyuuinbiBreakfast:
            _self.nyutaiinData[0].date[selectKey].nyuuinbiBreakfast,
          nyuuinbiLunch: _self.nyutaiinData[0].date[selectKey].nyuuinbiLunch,
          nyuuinbiDinner: _self.nyutaiinData[0].date[selectKey].nyuuinbiDinner,
          //退院用
          taiinbiShiseturiyo:
            _self.nyutaiinData[0].date[selectKey].taiinbiShiseturiyo,
          taiinbiBreakfast:
            _self.nyutaiinData[0].date[selectKey].taiinbiBreakfast,
          taiinbiLunch: _self.nyutaiinData[0].date[selectKey].taiinbiLunch,
          taiinbiDinner: _self.nyutaiinData[0].date[selectKey].taiinbiDinner,
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
          //入院用
          nyuuinbiShiseturiyo:
            _self.gaihakuData[0].date[selectKey].nyuuinbiShiseturiyo,
          nyuuinbiBreakfast:
            _self.gaihakuData[0].date[selectKey].nyuuinbiBreakfast,
          nyuuinbiLunch: _self.gaihakuData[0].date[selectKey].nyuuinbiLunch,
          nyuuinbiDinner: _self.gaihakuData[0].date[selectKey].nyuuinbiDinner,
          //退院用
          taiinbiShiseturiyo:
            _self.gaihakuData[0].date[selectKey].taiinbiShiseturiyo,
          taiinbiBreakfast:
            _self.gaihakuData[0].date[selectKey].taiinbiBreakfast,
          taiinbiLunch: _self.gaihakuData[0].date[selectKey].taiinbiLunch,
          taiinbiDinner: _self.gaihakuData[0].date[selectKey].taiinbiDinner,
          taiinbiAida: _self.gaihakuData[0].date[selectKey].taiinbiAida,
        };

        _self.$refs.dialog_kikantuika.parentFromOpenDialog(params, 'gaihaku');
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

      let redMaruRegexp = /^<div class="d-none">blue-maru<\/div>/;
      let redBatsuRegexp = /^<div class="d-none">blue--batsu<\/div>/;
      let redNoneRegexp = /^<div class="blue--text bg"><\/div>/;
      let redNoneRegexp2 =
        /^<div class="blue--text bg"><div class="d-none">blue-maru<\/div><\/div>/;
      //let total = flexGrid.getCellData(hPage.row, _self.lastdate + 3, false);
      // クリックをした位置
      let d = 'day' + (hPage.col - 3); //日付
      _self.dayPoint = { day: d, dayrow: hPage.row };
      // 青〇の置き換え
      if (ht.target.innerHTML.match(redMaruRegexp)) {
        e.target.innerHTML = '<div class="d-none">blue--batsu</div>×';
        _self.alertMessageFlag = true;
        _self.editGridFlag = true;
        _self.selectedPoint = 3; // 青×の表示
      }
      // 青×の置き換え
      else if (ht.target.innerHTML.match(redBatsuRegexp)) {
        e.target.innerHTML = '';
        _self.alertMessageFlag = true;
        _self.editGridFlag = true;
        _self.selectedPoint = 0; // 空欄の表示
      }
      // スペースの置き換え
      else if (
        ht.target.innerHTML.match(redNoneRegexp) ||
        ht.target.innerHTML.match(redNoneRegexp2)
      ) {
        e.target.innerHTML =
          '<div class="blue--text bg"><div class="d-none">blue-maru</div>〇</div>';
        _self.alertMessageFlag = true;
        _self.editGridFlag = true;
        _self.selectedPoint = 2; // 青〇の表示
      }
      //初回空欄の置き換え
      else if (ht.target.innerHTML == '') {
        e.target.innerHTML =
          '<div class="blue--text bg"><div class="d-none">blue-maru</div>〇</div>';
        _self.alertMessageFlag = true;
        _self.editGridFlag = true;
        _self.selectedPoint = 2; // 青〇の表示
      }
      _self.mainGrid.itemsSource = [];
      //値を配列に登録
      edittingUse(_self, hPage, d);
    } else {
      alert('ユーザーを選択してください。');
    }
  });
}
/**************
 * 値の変更
 */
function edittingUse(_self, hPage, d) {
  if (
    _self.rowColumn[hPage.row - 1] == 'breakfast' ||
    _self.rowColumn[hPage.row - 1] == 'lunch' ||
    _self.rowColumn[hPage.row - 1] == 'dinner'
  ) {
    _self.mealsData[_self.rowColumn[hPage.row - 1]][0][d] = _self.selectedPoint;
  }
  if (_self.rowColumn[hPage.row - 1] == 'kounetsuSuihiFlag') {
    _self.kounetusuihi[0][d] = _self.selectedPoint;
  }
  //体制・個別
  let taiseiRow = hPage.row - _self.hendoRowsCount;
  if (taiseiRow >= 0 && _self.gridItemName[0]['taisei_kobetu'][taiseiRow]) {
    _self.gridItemName[0]['taisei_kobetu'][taiseiRow]['date'][d] =
      _self.selectedPoint;
  }
  //個別
  let kobetsuRow = hPage.row - _self.taiseiKobetsuRowsCount;
  if (kobetsuRow >= 0 && _self.gridItemName[0].kobetu[kobetsuRow]) {
    _self.gridItemName[0].kobetu[kobetsuRow]['date'][d] = _self.selectedPoint;
  }
}

/***
 * 値の登録処理
 */
function methodSettingPoint(flexGrid, _self) {
  //利用日の設定
  settingRiyoubi(flexGrid, _self);
  //入院・退院日の設定
  if (_self.deleteGridFlag == true && _self.selectType == 'nyutaiin_add') {
    deleteNyuTaiin(flexGrid, _self);
  } else if (_self.editGridFlag == true && _self.selectType == 'nyutaiin_add') {
    editNyuTaiin(flexGrid, _self);
  } else if (_self.selectType == 'nyutaiin_add') {
    insertNyuTaiin(flexGrid, _self);
  } else {
    settingNyuTaiin(flexGrid, _self);
  }
  //外泊の設定
  if (_self.deleteGridFlag == true && _self.selectType == 'gaihaku') {
    deleteGaihaku(flexGrid, _self);
  } else if (_self.editGridFlag == true && _self.selectType == 'gaihaku') {
    editGaihaku(flexGrid, _self);
  } else if (_self.selectType == 'gaihaku_add') {
    insertGaihaku(flexGrid, _self);
  } else {
    settingGaihaku(flexGrid, _self);
  }

  for (let i = 0; i <= _self.gridItemName[0]['shisetsuNyusho'].length; i++) {
    if (
      _self.gridItemName[0]['shisetsuNyusho'][i] &&
      _self.gridItemName[0]['shisetsuNyusho'][i].mealFlag == true
    ) {
      //食事の設定
      if (_self.editGridFlag == true) {
        editMeals(flexGrid, _self);
      } else {
        settingMeals(flexGrid, _self);
      }
    }

    //光熱水費があるとき
    //光熱費以外のほかのデータがあるとき(家賃等)
    //適宜editとsettingの関数を追加していくapiの取得方法による
    if (
      _self.gridItemName[0]['shisetsuNyusho'][i] &&
      _self.gridItemName[0]['shisetsuNyusho'][i].kounetsuSuihiFlag ==
        'kounetsuSuihiFlag'
    ) {
      if (_self.editGridFlag == true) {
        editKounetusui(flexGrid, _self);
      } else {
        settingKounetusui(flexGrid, _self);
      }
    }
  }

  //加算情報の登録
  if (_self.editGridFlag == true) {
    editKasan(flexGrid, _self);
  } else {
    settingKasan(flexGrid, _self);
  }
}

/*****************
 * 加算情報編集
 */
function editKasan(flexGrid, _self) {
  let rows = _self.hendoRowsCount;

  //体制+個別用の配列番号
  if (rows <= _self.dayPoint.dayrow) {
    // 変動情報と体制・個別を合わせたものより大きい場合は個別用配列を利用する
    if (
      rows + _self.gridItemName[0]['taisei_kobetu'].length <=
      _self.dayPoint.dayrow
    ) {
      let k =
        _self.dayPoint.dayrow -
        (rows + _self.gridItemName[0]['taisei_kobetu'].length);
      if (_self.gridItemName[0]['kobetu'][k]['date']) {
        // 選択した値を登録
        _self.gridItemName[0]['kobetu'][k]['date'][_self.dayPoint.day] =
          _self.selectedPoint;
      } else {
        //配列がないときは配列を作成
        let d = _self.dayPoint.day;
        _self.gridItemName[0]['kobetu'][k]['date'] = [];
        _self.gridItemName[0]['kobetu'][k]['date'][d] = _self.selectedPoint;
      }
    } else {
      let k = _self.dayPoint.dayrow - rows;
      if (_self.gridItemName[0]['taisei_kobetu'][k]['date']) {
        // 選択した値を登録
        _self.gridItemName[0]['taisei_kobetu'][k]['date'][_self.dayPoint.day] =
          _self.selectedPoint;
      } else {
        //配列がないときは配列を作成
        let d = _self.dayPoint.day;
        _self.gridItemName[0]['taisei_kobetu'][k]['date'] = [];
        _self.gridItemName[0]['taisei_kobetu'][k]['date'][d] =
          _self.selectedPoint;
      }
    }
  }
  // 加算情報作成
  createKasan(flexGrid, _self);
}
/****************
 * 加算情報登録
 */
function settingKasan(flexGrid, _self) {
  //加算情報作成
  createKasan(flexGrid, _self);
}
/****************
 * 加算情報登録
 */
function createKasan(flexGrid, _self) {
  let rows = _self.hendoRowsCount;

  _self.gridItemName[0].taisei_kobetu.forEach(function (elements) {
    let total = 0;
    for (let i = 1; i <= _self.lastdate; i++) {
      let d = 'day' + i;
      if (elements['date']) {
        flexGrid.setCellData(rows, i + 3, elements['date'][d]);
        if (elements['date'][d] == 2 || elements['date'][d] == 1) {
          total++;
        }
      }
      flexGrid.setCellData(rows, _self.lastdate + startPoint, total);
    }
    rows++;
  });

  _self.gridItemName[0].kobetu.forEach(function (elements) {
    let total = 0;
    for (let i = 1; i <= _self.lastdate; i++) {
      let d = 'day' + i;
      if (elements['date']) {
        flexGrid.setCellData(rows, i + 3, elements['date'][d]);
        if (elements['date'][d] == 2 || elements['date'][d] == 1) {
          total++;
        }
      }
      flexGrid.setCellData(rows, _self.lastdate + startPoint, total);
    }
    rows++;
  });
}
/***********
 * 光熱水費
 */
function editKounetusui(flexGrid, _self) {
  let rows = _self.hendoRowsCount - 1;
  let kounetusuihi = _self.kounetusuihi;
  if (_self.dayPoint['dayrow'] == rows) {
    kounetusuihi[0][_self.dayPoint['day']] = _self.selectedPoint;

    if (_self.selectedPoint == 2) {
      kounetusuihi[0]['total'] = kounetusuihi[0]['total'] + 1;
      kounetusuihi[0]['money'] =
        kounetusuihi[0]['money'] +
        _self.gridItemName[0].kounetsuSuihi[0]['count'];
    } else if (_self.selectedPoint == 3) {
      kounetusuihi[0]['total'] = kounetusuihi[0]['total'] - 1;
      kounetusuihi[0]['money'] =
        kounetusuihi[0]['money'] -
        _self.gridItemName[0].kounetsuSuihi[0]['count'];
    }
  }
  for (let i = 0; i <= _self.lastdate; i++) {
    let d = 'day' + (i + 1);
    flexGrid.setCellData(rows, i + startPoint, kounetusuihi[0][d]);
  }
  flexGrid.setCellData(
    rows,
    _self.lastdate + startPoint,
    kounetusuihi[0]['total']
  );
  flexGrid.setCellData(
    rows,
    _self.lastdate + totalPoint,
    kounetusuihi[0]['money']
  );
}
function settingKounetusui(flexGrid, _self) {
  let kounetusuihi = [];
  kounetusuihi.push({
    jyukyusyabango: '8765432100',
    day1: 3,
    day2: 3,
    day3: 3,
    day4: 3,
    day5: 2,
    day6: 2,
    day18: 2,
    day19: 2,
    day20: 2,
    day21: 2,
    day22: 2,
    day23: 2,
    day24: 2,
    day25: 2,
    day27: 2,
    day28: 2,
    day30: 2,
    day31: 2,
    total: 18,
    money: 1800,
  });

  //選択された受給者番号のデータのみ対象にする
  //apiが利用されたら不要
  let kounetusuihidata = kounetusuihi;
  kounetusuihi = [];
  for (let i = 0; i < kounetusuihidata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      kounetusuihidata[i]['jyukyusyabango']
    ) {
      kounetusuihi.push(kounetusuihidata[i]);
    }
  }

  let rows = _self.hendoRowsCount - 1;
  if (_self.kounetusuihi > 0) {
    kounetusuihi = [];
    kounetusuihi = _self.kounetusuihi;
  } else {
    _self.kounetusuihi = kounetusuihi;
  }
  if (kounetusuihi.length > 0) {
    for (let i = 0; i <= _self.lastdate; i++) {
      let d = 'day' + (i + 1);
      flexGrid.setCellData(rows, i + startPoint, kounetusuihi[0][d]);
    }
    flexGrid.setCellData(
      rows,
      _self.lastdate + startPoint,
      kounetusuihi[0]['total']
    );
    flexGrid.setCellData(
      rows,
      _self.lastdate + totalPoint,
      kounetusuihi[0]['money']
    );
  }
}
/****************
 * 食事の設定
 */
function settingMeals(flexGrid, _self) {
  let breakfast = [];
  let lunch = [];
  let dinner = [];
  breakfast.push({
    jyukyusyabango: '8765432100',
    day1: 2,
    day2: 2,
    day3: 2,
    day4: 2,
    day5: 2,
    day6: 2,
    day18: 2,
    day19: 2,
    day20: 2,
    day21: 2,
    day22: 2,
    day23: 2,
    day24: 2,
    day25: 2,
    day27: 2,
    day28: 2,
    day30: 2,
    day31: 2,
    total: 18,
    money: 5400,
  });
  lunch.push({
    jyukyusyabango: '8765432100',
    day1: 2,
    day2: 2,
    day3: 2,
    day4: 2,
    day5: 2,
    day6: 2,
    day18: 2,
    day19: 2,
    day20: 2,
    day21: 2,
    day22: 2,
    day23: 2,
    day24: 2,
    day25: 2,
    day27: 2,
    day28: 2,
    day30: 2,
    day31: 2,
    total: 18,
    money: 7200,
  });
  dinner.push({
    jyukyusyabango: '8765432100',
    day1: 2,
    day2: 2,
    day3: 2,
    day4: 2,
    day5: 2,
    day6: 2,
    day18: 2,
    day19: 2,
    day20: 2,
    day21: 2,
    day22: 2,
    day23: 2,
    day24: 2,
    day25: 2,
    day27: 2,
    day28: 2,
    day30: 2,
    day31: 2,
    total: 18,
    money: 9000,
  });

  //選択された受給者番号のデータのみ対象にする
  //apiが利用されたら不要
  let breakfastdata = breakfast;
  breakfast = [];
  for (let i = 0; i < breakfastdata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      breakfastdata[i]['jyukyusyabango']
    ) {
      breakfast.push(breakfastdata[i]);
    }
  }
  let lunchdata = lunch;
  lunch = [];
  for (let i = 0; i < lunchdata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      lunchdata[i]['jyukyusyabango']
    ) {
      lunch.push(lunchdata[i]);
    }
  }
  let dinnerdata = dinner;
  dinner = [];
  for (let i = 0; i < dinnerdata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      dinnerdata[i]['jyukyusyabango']
    ) {
      dinner.push(dinnerdata[i]);
    }
  }
  //ここまで

  if (breakfast.length > 0) {
    for (let i = 0; i <= _self.lastdate; i++) {
      let d = 'day' + (i + 1);
      flexGrid.setCellData(4, i + startPoint, breakfast[0][d]);
    }
    flexGrid.setCellData(4, _self.lastdate + startPoint, breakfast[0]['total']);
    flexGrid.setCellData(4, _self.lastdate + totalPoint, breakfast[0]['money']);
  }

  if (lunch.length > 0) {
    for (let i = 0; i <= _self.lastdate; i++) {
      let d = 'day' + (i + 1);
      flexGrid.setCellData(5, i + startPoint, lunch[0][d]);
    }
    flexGrid.setCellData(5, _self.lastdate + startPoint, lunch[0]['total']);
    flexGrid.setCellData(5, _self.lastdate + totalPoint, lunch[0]['money']);
  }

  if (dinner.length > 0) {
    for (let i = 0; i <= _self.lastdate; i++) {
      let d = 'day' + (i + 1);
      flexGrid.setCellData(6, i + startPoint, dinner[0][d]);
    }
    flexGrid.setCellData(6, _self.lastdate + startPoint, dinner[0]['total']);
    flexGrid.setCellData(6, _self.lastdate + totalPoint, dinner[0]['money']);
  }

  _self.mealsData['breakfast'] = breakfast;
  _self.mealsData['lunch'] = lunch;
  _self.mealsData['dinner'] = dinner;
}
/**********
 * 食事の編集
 */
function editMeals(flexGrid, _self) {
  let breakfast = _self.mealsData['breakfast'];
  let lunch = _self.mealsData['lunch'];
  let dinner = _self.mealsData['dinner'];
  //朝食を0とするためdayrow-4(列数)を行う
  //食事のデータがあるもののみ更新
  if (_self.gridItemName[0].meals[_self.dayPoint.dayrow - 4]) {
    if (
      _self.gridItemName[0].mealsKey[_self.dayPoint.dayrow - 4] == 'breakfast'
    ) {
      breakfast[0][_self.dayPoint['day']] = _self.selectedPoint;
      if (_self.selectedPoint == 2) {
        breakfast[0]['total'] = breakfast[0]['total'] + 1;
        breakfast[0]['money'] =
          breakfast[0]['money'] + _self.gridItemName[0].mealsCount[0];
      } else if (_self.selectedPoint == 3) {
        breakfast[0]['total'] = breakfast[0]['total'] - 1;
        breakfast[0]['money'] =
          breakfast[0]['money'] - _self.gridItemName[0].mealsCount[0];
      }
    } else if (
      _self.gridItemName[0].mealsKey[_self.dayPoint.dayrow - 4] == 'lunch'
    ) {
      lunch[0][_self.dayPoint['day']] = _self.selectedPoint;

      if (_self.selectedPoint == 2) {
        lunch[0]['total'] = lunch[0]['total'] + 1;
        lunch[0]['money'] =
          lunch[0]['money'] + _self.gridItemName[0].mealsCount[1];
      } else if (_self.selectedPoint == 3) {
        lunch[0]['total'] = lunch[0]['total'] - 1;
        lunch[0]['money'] =
          lunch[0]['money'] - _self.gridItemName[0].mealsCount[1];
      }
    } else if (
      _self.gridItemName[0].mealsKey[_self.dayPoint.dayrow - 4] == 'dinner'
    ) {
      dinner[0][_self.dayPoint['day']] = _self.selectedPoint;
      if (_self.selectedPoint == 2) {
        dinner[0]['total'] = dinner[0]['total'] + 1;
        dinner[0]['money'] =
          dinner[0]['money'] + _self.gridItemName[0].mealsCount[2];
      } else if (_self.selectedPoint == 3) {
        dinner[0]['total'] = dinner[0]['total'] - 1;
        dinner[0]['money'] =
          dinner[0]['money'] - _self.gridItemName[0].mealsCount[2];
      }
    }
  }
  for (let i = 0; i <= _self.lastdate; i++) {
    let d = 'day' + (i + 1);
    flexGrid.setCellData(4, i + startPoint, breakfast[0][d]);
  }
  for (let i = 0; i <= _self.lastdate; i++) {
    let d = 'day' + (i + 1);
    flexGrid.setCellData(5, i + startPoint, lunch[0][d]);
  }
  for (let i = 0; i <= _self.lastdate; i++) {
    let d = 'day' + (i + 1);
    flexGrid.setCellData(6, i + startPoint, dinner[0][d]);
  }

  flexGrid.setCellData(4, _self.lastdate + startPoint, breakfast[0]['total']);
  flexGrid.setCellData(4, _self.lastdate + totalPoint, breakfast[0]['money']);
  flexGrid.setCellData(5, _self.lastdate + startPoint, lunch[0]['total']);
  flexGrid.setCellData(5, _self.lastdate + totalPoint, lunch[0]['money']);
  flexGrid.setCellData(6, _self.lastdate + startPoint, dinner[0]['total']);
  flexGrid.setCellData(6, _self.lastdate + totalPoint, dinner[0]['money']);

  _self.mealsData['breakfast'] = breakfast;
  _self.mealsData['lunch'] = lunch;
  _self.mealsData['dinner'] = dinner;
}

/**************
 * 外泊の削除
 */
function deleteGaihaku(flexGrid, _self) {
  let gaihaku = [];
  //別コンポーネントダイアログのregistDataの値を取得(キーのみ)
  let selectKey = _self.$refs.dialog_kikantuika.registData.selectKey;
  gaihaku = _self.gaihakuData;
  gaihaku[0]['date'][selectKey] = [];
  //矢印の作成
  setGaihakuCreateArrows(gaihaku, _self, flexGrid);
  _self.alertMessageFlag = true;
  _self.gaihakuData = gaihaku;
}

/*******
 * 外泊の設定
 */
function settingGaihaku(flexGrid, _self) {
  let gaihaku = [];
  gaihaku.push({
    total: 4,
    jyukyusyabango: '8765432100',
    date: [
      {
        byouinName: '東経国立病院',
        start_date: '2022-5-25',
        end_date: '2022-5-27',
        diff_date: 3,
        nyuuinbiShiseturiyo: 1,
        nyuuinbiBreakfast: true,
        nyuuinbiLunch: false,
        nyuuinbiDinner: true,
        taiinbiShiseturiyo: 1,
        taiinbiBreakfast: true,
        taiinbiLunch: true,
        taiinbiDinner: true,
        day25: 'gaihaku_arrow_start-0', //文字列のあとに下記にあるdateのキーを指定
        day26: 'gaihaku_arrow-0',
        day27: 'gaihaku_arrow_end-0',
      },
    ],
  });

  //選択された受給者番号のデータのみ対象にする
  //apiが利用されたら不要
  let gaihakudata = gaihaku;
  gaihaku = [];

  for (let i = 0; i < gaihakudata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      gaihakudata[i]['jyukyusyabango']
    ) {
      gaihaku.push(gaihakudata[i]);
    }
  }

  //矢印の作成
  _self.gaihakuData = gaihaku;
  setGaihakuCreateArrows(gaihaku, _self, flexGrid);

  /*
  if (_self.gaihakuData.length == 0) {
    setGaihakuCreateArrows(gaihaku, _self, flexGrid);
    _self.gaihakuData = gaihaku;
  } else {
    gaihaku = _self.gaihakuData;
    setGaihakuCreateArrows(gaihaku, _self, flexGrid);
  }
  */
}
/*********
 * 外泊の編集
 */
function editGaihaku(flexGrid, _self) {
  let gaihaku = [];

  //console.log(_self.$refs.dialog_kikantuika.registData);
  //別コンポーネントダイアログのregistDataの値を取得(キーのみ)
  let selectKey = _self.$refs.dialog_kikantuika.registData.selectKey;
  gaihaku = _self.gaihakuData;
  //日付情報を一度クリア
  for (let i = 0; i < _self.lastdate; i++) {
    let d = 'day' + i;
    gaihaku[0]['date'][selectKey][d] = '';
  }

  //日付のloop
  //秒に変換してloopを行う
  let st = new Date(_self.$refs.dialog_kikantuika.registData.nyuuinbi);
  let ed = new Date(_self.$refs.dialog_kikantuika.registData.taiinbi);
  let firstday = st.getDate();
  let lastday = ed.getDate();
  let num = 0;

  gaihaku[0]['date'][selectKey]['start_date'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbi;
  gaihaku[0]['date'][selectKey]['end_date'] =
    _self.$refs.dialog_kikantuika.registData.taiinbi;
  gaihaku[0]['date'][selectKey]['nyuuinbiShiseturiyo'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo;
  gaihaku[0]['date'][selectKey]['taiinbiShiseturiyo'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo;
  gaihaku[0]['date'][selectKey]['nyuuinbiBreakfast'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast;
  gaihaku[0]['date'][selectKey]['nyuuinbiLunch'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiLunch;
  gaihaku[0]['date'][selectKey]['nyuuinbiDinner'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiDinner;
  gaihaku[0]['date'][selectKey]['taiinbiBreakfast'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiBreakfast;
  gaihaku[0]['date'][selectKey]['taiinbiLunch'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiLunch;
  gaihaku[0]['date'][selectKey]['taiinbiDinner'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiDinner;
  gaihaku[0]['date'][selectKey]['taiinbiAida'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiAida;

  gaihaku[0]['date'][selectKey]['diff_date'] =
    lastday - firstday + _self.plusOne;
  gaihaku[0]['date'][selectKey]['byouinName'] =
    _self.$refs.dialog_kikantuika.registData.byouinName;

  for (let d = st; d <= ed; d.setDate(d.getDate() + 1)) {
    var days = d.getDate();
    var day = 'day' + days;
    if (num == 0) {
      gaihaku[0]['date'][selectKey][day] = 'gaihaku_arrow_start-' + selectKey;
    } else if (num == lastday - firstday) {
      gaihaku[0]['date'][selectKey][day] = 'gaihaku_arrow_end-' + selectKey;
    } else {
      gaihaku[0]['date'][selectKey][day] = 'gaihaku_arrow-' + selectKey;
    }
    num++;
  }

  //矢印の作成
  setGaihakuCreateArrows(gaihaku, _self, flexGrid);
  _self.alertMessageFlag = true;
  _self.gaihakuData = gaihaku;
}
/*********
 * 外泊の追加
 ***/
function insertGaihaku(flexGrid, _self) {
  let gaihaku = [];
  gaihaku = _self.gaihakuData;

  let num = 0;
  //日付のloop
  //秒に変換してloopを行う
  let st = new Date(_self.$refs.dialog_kikantuika.registData.nyuuinbi);
  let ed = new Date(_self.$refs.dialog_kikantuika.registData.taiinbi);
  let firstday = st.getDate();
  let lastday = ed.getDate();

  gaihaku[0]['date'].push({
    start_date: _self.$refs.dialog_kikantuika.registData.nyuuinbi,
    end_date: _self.$refs.dialog_kikantuika.registData.taiinbi,
    diff_date: lastday - firstday + _self.plusOne,
    nyuuinbiShiseturiyo:
      _self.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo,
    taiinbiShiseturiyo:
      _self.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo,
    nyuuinbiBreakfast:
      _self.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast,
    nyuuinbiLunch: _self.$refs.dialog_kikantuika.registData.nyuuinbiLunch,
    nyuuinbiDinner: _self.$refs.dialog_kikantuika.registData.nyuuinbiDinner,
    taiinbiBreakfast: _self.$refs.dialog_kikantuika.registData.taiinbiBreakfast,
    taiinbiLunch: _self.$refs.dialog_kikantuika.registData.taiinbiLunch,
    taiinbiDinner: _self.$refs.dialog_kikantuika.registData.taiinbiDinner,
    taiinbiAida: _self.$refs.dialog_kikantuika.registData.taiinbiAida,
    byouinName: _self.$refs.dialog_kikantuika.registData.byouinName,
  });

  //上の行で追加した値の変換
  let selectKey = gaihaku[0].date.length - 1;
  for (let d = st; d <= ed; d.setDate(d.getDate() + 1)) {
    var days = d.getDate();
    var day = 'day' + days;
    if (num == 0) {
      gaihaku[0]['date'][selectKey][day] = 'gaihaku_arrow_start-' + selectKey;
    } else if (num == lastday - firstday) {
      gaihaku[0]['date'][selectKey][day] = 'gaihaku_arrow_end-' + selectKey;
    } else {
      gaihaku[0]['date'][selectKey][day] = 'gaihaku_arrow-' + selectKey;
    }
    num++;
  }

  //矢印の作成
  setGaihakuCreateArrows(gaihaku, _self, flexGrid);
  _self.alertMessageFlag = true;
  _self.gaihakuData = gaihaku;
}

/***********
 * 矢印作成
 */
function createdArrows(data, _self, flexGrid, row) {
  let total = 0;
  if (data[0] != undefined) {
    for (let j = 0; j < data[0].date.length; j++) {
      if (data[0].date[j]) {
        let firstday = new Date(data[0].date[j].start_date).getDate();
        let lastday = new Date(data[0].date[j].end_date).getDate();
        for (let i = firstday; i <= lastday; i++) {
          data[0].date[j]['dayCount' + i] = false;
        }
      }
    }
    // 日付の重複チェック
    let doubleCheckFlag = [];
    for (let j = 0; j < data[0].date.length; j++) {
      if (data[0].date[j]) {
        let firstday = new Date(data[0].date[j].start_date).getDate();
        let lastday = new Date(data[0].date[j].end_date).getDate();
        for (let i = firstday; i <= lastday; i++) {
          let d = 'day' + i;
          if (data[0].date[j][d]) {
            if (doubleCheckFlag[d]) {
              doubleCheckFlag[d] = doubleCheckFlag[d] + 1;
              data[0].date[j]['dayCount' + i] = true;
            } else {
              doubleCheckFlag[d] = 1;
            }
          }
        }
      }
    }

    for (let j = 0; j < data[0].date.length; j++) {
      if (data[0].date[j]) {
        let firstday = new Date(data[0].date[j].start_date).getDate();
        let lastday = new Date(data[0].date[j].end_date).getDate();
        for (let i = firstday; i <= lastday; i++) {
          let d = 'day' + i;
          let dc = 'dayCount' + i;
          if (data[0].date[j][dc]) {
            flexGrid.setCellData(
              row,
              i + 3,
              data[0].date[j][d].replace('start', 'double')
            );
          } else {
            flexGrid.setCellData(row, i + 3, data[0].date[j][d]);
          }
          total++;
        }
      }
    }

    flexGrid.setCellData(row, _self.lastdate + 4, total);
  }
  return;
}
/***********
 * 入退院矢印作成用
 */
function setCreateArrows(nyutaiin, _self, flexGrid) {
  createdArrows(nyutaiin, _self, flexGrid, 2);
}
/*************
 * 外泊用矢印作成
 */
function setGaihakuCreateArrows(gaihaku, _self, flexGrid) {
  createdArrows(gaihaku, _self, flexGrid, 3);
}
/*******
 * 入院・退院日の設定
 */
function settingNyuTaiin(flexGrid, _self) {
  let nyutaiin = [];
  nyutaiin.push({
    jyukyusyabango: '8765432100',
    date: [
      {
        byouinName: '東経国立病院',
        start_date: '2022-5-6',
        end_date: '2022-5-16',
        diff_date: 11,
        nyuuinbiShiseturiyo: 1,
        nyuuinbiBreakfast: true,
        nyuuinbiLunch: false,
        nyuuinbiDinner: true,
        taiinbiShiseturiyo: 1,
        taiinbiBreakfast: true,
        taiinbiLunch: true,
        taiinbiDinner: true,
        day6: 'arrow_start-0', //文字列のあとに下記にあるdateのキーを指定
        day7: 'arrow-0',
        day8: 'arrow-0',
        day9: 'arrow-0',
        day10: 'arrow-0',
        day11: 'arrow-0',
        day12: 'arrow-0',
        day13: 'arrow-0',
        day14: 'arrow-0',
        day15: 'arrow-0',
        day16: 'arrow_end-0',
      },
      {
        byouinName: '西経国立病院',
        start_date: '2022-5-28',
        end_date: '2022-5-30',
        diff_date: 3,
        nyuuinbiShiseturiyo: 1,
        nyuuinbiBreakfast: true,
        nyuuinbiLunch: false,
        nyuuinbiDinner: true,
        taiinbiShiseturiyo: 1,
        taiinbiBreakfast: true,
        taiinbiLunch: true,
        taiinbiDinner: true,
        day28: 'arrow_start-1',
        day29: 'arrow-1',
        day30: 'arrow_end-1',
      },
      {
        byouinName: '北経国立病院',
        start_date: '2022-5-16',
        end_date: '2022-5-18',
        diff_date: 3,
        nyuuinbiShiseturiyo: 1,
        nyuuinbiBreakfast: true,
        nyuuinbiLunch: false,
        nyuuinbiDinner: true,
        taiinbiShiseturiyo: 1,
        taiinbiBreakfast: true,
        taiinbiLunch: true,
        taiinbiDinner: true,
        day16: 'arrow_start-2',
        day17: 'arrow-2',
        day18: 'arrow_end-2',
      },
    ],
  });

  //選択された受給者番号のデータのみ対象にする
  //apiが利用されたら不要
  let nyutaiindata = nyutaiin;
  nyutaiin = [];
  for (let i = 0; i < nyutaiindata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      nyutaiindata[i]['jyukyusyabango']
    ) {
      nyutaiin.push(nyutaiindata[i]);
    }
  }

  //矢印の作成
  if (nyutaiin.length > 0) {
    if (_self.nyutaiinData.length == 0) {
      setCreateArrows(nyutaiin, _self, flexGrid);
      _self.nyutaiinData = nyutaiin;
    } else {
      nyutaiin = _self.nyutaiinData;
      setCreateArrows(nyutaiin, _self, flexGrid);
    }
  }
}
/********
 * 入院・退院日の編集
 */
function editNyuTaiin(flexGrid, _self) {
  let nyutaiin = [];
  //console.log(_self.$refs.dialog_kikantuika.registData);
  //別コンポーネントダイアログのregistDataの値を取得(キーのみ)
  let selectKey = _self.$refs.dialog_kikantuika.registData.selectKey;
  nyutaiin = _self.nyutaiinData;
  //日付情報を一度クリア
  for (let i = 0; i < _self.lastdate; i++) {
    let d = 'day' + i;
    nyutaiin[0]['date'][selectKey][d] = '';
  }

  //日付のloop
  //秒に変換してloopを行う
  let st = new Date(_self.$refs.dialog_kikantuika.registData.nyuuinbi);
  let ed = new Date(_self.$refs.dialog_kikantuika.registData.taiinbi);
  let firstday = st.getDate();
  let lastday = ed.getDate();
  let num = 0;

  nyutaiin[0]['date'][selectKey]['start_date'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbi;
  nyutaiin[0]['date'][selectKey]['end_date'] =
    _self.$refs.dialog_kikantuika.registData.taiinbi;
  nyutaiin[0]['date'][selectKey]['nyuuinbiShiseturiyo'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo;
  nyutaiin[0]['date'][selectKey]['taiinbiShiseturiyo'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo;
  nyutaiin[0]['date'][selectKey]['nyuuinbiBreakfast'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast;
  nyutaiin[0]['date'][selectKey]['nyuuinbiLunch'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiLunch;
  nyutaiin[0]['date'][selectKey]['nyuuinbiDinner'] =
    _self.$refs.dialog_kikantuika.registData.nyuuinbiDinner;
  nyutaiin[0]['date'][selectKey]['taiinbiBreakfast'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiBreakfast;
  nyutaiin[0]['date'][selectKey]['taiinbiLunch'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiLunch;
  nyutaiin[0]['date'][selectKey]['taiinbiDinner'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiDinner;
  nyutaiin[0]['date'][selectKey]['taiinbiAida'] =
    _self.$refs.dialog_kikantuika.registData.taiinbiAida;

  nyutaiin[0]['date'][selectKey]['diff_date'] =
    lastday - firstday + _self.plusOne;
  nyutaiin[0]['date'][selectKey]['byouinName'] =
    _self.$refs.dialog_kikantuika.registData.byouinName;

  for (let d = st; d <= ed; d.setDate(d.getDate() + 1)) {
    var days = d.getDate();
    var day = 'day' + days;
    if (num == 0) {
      nyutaiin[0]['date'][selectKey][day] = 'arrow_start-' + selectKey;
    } else if (num == lastday - firstday) {
      nyutaiin[0]['date'][selectKey][day] = 'arrow_end-' + selectKey;
    } else {
      nyutaiin[0]['date'][selectKey][day] = 'arrow-' + selectKey;
    }
    num++;
  }
  //矢印の作成
  setCreateArrows(nyutaiin, _self, flexGrid);
  _self.alertMessageFlag = true;
  _self.nyutaiinData = nyutaiin;
}
/**************
 * 入院・退院の削除
 */
function deleteNyuTaiin(flexGrid, _self) {
  let nyutaiin = [];
  //別コンポーネントダイアログのregistDataの値を取得(キーのみ)
  let selectKey = _self.$refs.dialog_kikantuika.registData.selectKey;
  nyutaiin = _self.nyutaiinData;
  nyutaiin[0]['date'][selectKey] = [];
  //矢印の作成
  setCreateArrows(nyutaiin, _self, flexGrid);
  _self.alertMessageFlag = true;
  _self.nyutaiinData = nyutaiin;
}
/********
 * 入院・退院日の新規追加
 */
function insertNyuTaiin(flexGrid, _self) {
  let nyutaiin = [];
  nyutaiin = _self.nyutaiinData;

  let num = 0;
  //日付のloop
  //秒に変換してloopを行う
  let st = new Date(_self.$refs.dialog_kikantuika.registData.nyuuinbi);
  let ed = new Date(_self.$refs.dialog_kikantuika.registData.taiinbi);
  let firstday = st.getDate();
  let lastday = ed.getDate();

  nyutaiin[0]['date'].push({
    start_date: _self.$refs.dialog_kikantuika.registData.nyuuinbi,
    end_date: _self.$refs.dialog_kikantuika.registData.taiinbi,
    diff_date: lastday - firstday + _self.plusOne,
    nyuuinbiShiseturiyo:
      _self.$refs.dialog_kikantuika.registData.nyuuinbiShiseturiyo,
    taiinbiShiseturiyo:
      _self.$refs.dialog_kikantuika.registData.taiinbiShiseturiyo,
    nyuuinbiBreakfast:
      _self.$refs.dialog_kikantuika.registData.nyuuinbiBreakfast,
    nyuuinbiLunch: _self.$refs.dialog_kikantuika.registData.nyuuinbiLunch,
    nyuuinbiDinner: _self.$refs.dialog_kikantuika.registData.nyuuinbiDinner,
    taiinbiBreakfast: _self.$refs.dialog_kikantuika.registData.taiinbiBreakfast,
    taiinbiLunch: _self.$refs.dialog_kikantuika.registData.taiinbiLunch,
    taiinbiDinner: _self.$refs.dialog_kikantuika.registData.taiinbiDinner,
    taiinbiAida: _self.$refs.dialog_kikantuika.registData.taiinbiAida,
    byouinName: _self.$refs.dialog_kikantuika.registData.byouinName,
  });

  //上の行で追加した値の変換
  let selectKey = nyutaiin[0].date.length - 1;
  for (let d = st; d <= ed; d.setDate(d.getDate() + 1)) {
    var days = d.getDate();
    var day = 'day' + days;
    if (num == 0) {
      nyutaiin[0]['date'][selectKey][day] = 'arrow_start-' + selectKey;
    } else if (num == lastday - firstday) {
      nyutaiin[0]['date'][selectKey][day] = 'arrow_end-' + selectKey;
    } else {
      nyutaiin[0]['date'][selectKey][day] = 'arrow-' + selectKey;
    }
    num++;
  }
  //矢印の作成
  setCreateArrows(nyutaiin, _self, flexGrid);
  _self.alertMessageFlag = true;
  _self.nyutaiinData = nyutaiin;
}

/*********
 * 利用日の設定
 */
function settingRiyoubi(flexGrid, _self) {
  let riyoubi = [];
  riyoubi.push({
    jyukyusyabango: '8765432100',
    day1: 1,
    day2: 1,
    day3: 1,
    day4: 1,
    day5: 1,
    day6: 1,
    day18: 1,
    day19: 1,
    day20: 1,
    day21: 1,
    day22: 1,
    day23: 1,
    day24: 1,
    day25: 1,
    day27: 1,
    day28: 1,
    day30: 1,
    day31: 1,
    total: 18,
  });

  //選択された受給者番号のデータのみ対象にする
  //apiが利用されたら不要
  let riyoubidata = riyoubi;
  riyoubi = [];
  for (let i = 0; i < riyoubidata.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      riyoubidata[i]['jyukyusyabango']
    ) {
      riyoubi.push(riyoubidata[i]);
    }
  }
  if (riyoubi.length > 0) {
    for (let i = 0; i <= _self.lastdate; i++) {
      let d = 'day' + (i + 1);
      flexGrid.setCellData(1, i + startPoint, riyoubi[0][d]);
    }
    flexGrid.setCellData(1, _self.lastdate + startPoint, riyoubi[0]['total']);
    flexGrid.setCellData(1, _self.lastdate + totalPoint, riyoubi[0]['money']);
  }

  _self.riyoubiData = riyoubi;
}

/****
 * セル表示内容の変更
 */
function methodCellFormatSetting(flexGrid, _self) {
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
      text.match(/^arrow_start-[0-9].*/) ||
      text.match(/^arrow_double-[0-9].*/)
    ) {
      let key = text.split('-')[1];
      let date = _self.nyutaiinData[0].date[key];
      // termFlagは矢印を押下した際の表示用文字列
      if (text.match(/^arrow_double-[0-9].*/)) {
        html = '<div class="red-arrow_double"><div>&nbsp;</div></div>';
      } else {
        html = '<div class="red-arrow_start"><div>&nbsp;</div></div>';
      }
      let startdate = moment(date['start_date']).format('M/D');
      let end_date = moment(date['end_date']).format('M/D');
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
        date['diff_date'] +
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
      text.match(/^gaihaku_arrow_start-[0-9].*/) ||
      text.match(/^gaihaku_arrow_double-[0-9].*/)
    ) {
      let key = text.split('-')[1];
      let date = _self.gaihakuData[0].date[key];
      // termFlagは矢印を押下した際の表示用文字列
      if (text.match(/^gaihaku_arrow_double-[0-9].*/)) {
        html = '<div class="green-arrow_double"><div>&nbsp;</div></div>';
      } else {
        html = '<div class="green-arrow_start"><div>&nbsp;</div></div>';
      }

      let startdate = moment(date['start_date']).format('M/D');
      let end_date = moment(date['end_date']).format('M/D');
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
        date['diff_date'] +
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

    //合計・金額部分
    if (
      e.row > 0 &&
      (e.col == _self.lastdate + startPoint ||
        e.col == _self.lastdate + totalPoint)
    ) {
      classname = 'text-center gridBackground ';
      let yen = '';
      if (text.length > 0 && e.col == _self.lastdate + totalPoint) yen = '円';
      html = '<p>' + text + yen + '</p>';
    }

    //金額・食事以外をグレー
    if (e.col == _self.lastdate + totalPoint && e.row > 0 && text.length == 0) {
      classname = 'text-center gridBackground backGray';
    }

    // 〇の表示
    // 1:手入力不可〇
    if (
      text == 1 &&
      e.col != _self.lastdate + startPoint &&
      e.col != _self.lastdate + totalPoint
    ) {
      classname = 'text-center gridBackground';
      html = '<span>〇</span>';
    }
    // 青〇の表示
    // 2:手入力可青〇
    if (
      text == 2 &&
      e.col != _self.lastdate + startPoint &&
      e.col != _self.lastdate + totalPoint
    ) {
      classname = 'text-center';
      html =
        '<div class="blue--text bg"><div class="d-none">blue-maru</div>〇</div>';
    }
    // 青×の表示
    // 3:手入力可青×
    if (
      text == 3 &&
      e.col != _self.lastdate + startPoint &&
      e.col != _self.lastdate + totalPoint
    ) {
      classname = 'text-center';
      html =
        '<div class="blue--text bg"><div class="d-none">blue--batsu</div>×</div>';
    }
    // 0:空欄
    if (
      text == 0 &&
      e.col != _self.lastdate + startPoint &&
      e.col != _self.lastdate + totalPoint
    ) {
      html = '';
    }

    if (e.col == 1 || e.col == 2) {
      classname += ' pa-1';
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
}

/**************
 * セルのマージ処理
 */
function methodCellMerge(flexGrid, _self) {
  let range = [];
  //todo if文の条件をキーの値に変更する
  //宿泊型自立訓練
  let hendoRow = _self.hendoRowsCount;
  let lastRow = _self.kasanRow - 1;
  if (_self.teikyoCode == '34') {
    range = [
      new wjGrid.CellRange(0, 1, 0, 3),
      new wjGrid.CellRange(1, 0, hendoRow - 1, 0), // 変動情報縦
      new wjGrid.CellRange(1, 1, 1, 3), // 利用日
      new wjGrid.CellRange(2, 1, 2, 3), // 入退院
      new wjGrid.CellRange(3, 1, 3, 3), // 外泊
      new wjGrid.CellRange(5, 1, 5, 2), //食事
      new wjGrid.CellRange(6, 1, 6, 2), //食事
    ];
  }
  //共同生活援助
  if (_self.teikyoCode == '33') {
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
  //施設入所用
  if (_self.teikyoCode == '32') {
    range = [
      new wjGrid.CellRange(0, 1, 0, 3),
      new wjGrid.CellRange(1, 0, hendoRow - 1, 0), // 変動情報縦
      new wjGrid.CellRange(1, 1, 1, 3), // 利用日
      new wjGrid.CellRange(2, 1, 2, 3), // 入退院
      new wjGrid.CellRange(3, 1, 3, 3), // 外泊
      new wjGrid.CellRange(5, 1, 5, 2), //食事
      new wjGrid.CellRange(6, 1, 6, 2), //食事
      new wjGrid.CellRange(7, 1, hendoRow - 1, 2), //光熱水費
    ];
  }
  range.push(
    new wjGrid.CellRange(hendoRow, 0, lastRow, 0) //加算情報縦
  );
  range.push(
    new wjGrid.CellRange(
      hendoRow,
      1,
      hendoRow + _self.gridItemName[0].taisei_kobetu.length - 1,
      1
    )
  );

  //体制個別
  range.push(
    new wjGrid.CellRange(
      hendoRow + _self.gridItemName[0].taisei_kobetu.length,
      1,
      hendoRow +
        _self.gridItemName[0].taisei_kobetu.length +
        _self.gridItemName[0].kobetu.length -
        1,
      1
    )
  );
  //体制
  for (let i = hendoRow; i <= lastRow; i++) {
    range.push(new wjGrid.CellRange(i, 2, i, 3));
  }
  try {
    let mm = new wjGrid.MergeManager(flexGrid);
    mm.getMergedRange = function (panel, r, c) {
      for (let h = 0; h < range.length; h++) {
        if (range[h].contains(r, c)) {
          return range[h];
        }
      }
    };
    flexGrid.mergeManager = mm;
  } catch (e) {
    console.log(e);
  }
}
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
  .light_yellow {
    background-color: $light_yellow;
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
  //ヘッド
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

  //矢印
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
      left: 4px;
      top: -8px;
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
    width: 120px;
    margin-top: -5px;
    cursor: pointer;
    margin-left: 1%;
    div {
      color: blue;
      position: absolute;
      background-color: $white;
      border: 1px solid $font_color;
      z-index: 1;
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