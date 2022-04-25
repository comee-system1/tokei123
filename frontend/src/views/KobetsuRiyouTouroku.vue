<template>
  <div id="kobetsuriyo">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
    ></header-services>
    <v-container fluid class="container">
      <v-row no-gutters>
        <v-col cols="2">
          <user-list-print
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list-print>
        </v-col>
        <v-col cols="10">
          <v-row class="mt-0" no-gutters>
            <v-col>
              <v-card class="d-flex flex-row" flat tile>
                <v-card class="pt-2 pr-2" elevation="0">
                  <label class="font-weight-black">利用者名</label>
                </v-card>
                <v-card class="pa-1" :width="180" outlined tile>
                  {{ userDataSelect[0].riyosyo }}
                </v-card>
                <v-card class="pt-2 pr-2 ml-2" elevation="0">
                  <label class="font-weight-black">受給者番号</label>
                </v-card>
                <v-card class="pa-1" :width="180" outlined tile>
                  {{ userDataSelect[0].jyukyusyabango }}
                </v-card>
              </v-card>
            </v-col>
            <v-col class="text-end">
              <v-btn class="pa-3" outlined>受給者証修正</v-btn>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-1">
            <v-col>
              <v-card class="pa-2 jyukyusyaBox" outlined tile>
                <v-row class="mt-0" no-gutters>
                  <v-col cols="2*">
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-1 pr-2" elevation="0">
                        <label class="font-weight-black">援護者</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-card
                            class="pa-1"
                            elevation="0"
                            v-for="(n, k) in jyukyusyaItirans[0].engosya"
                            :key="k"
                          >
                            {{ n.engosya
                            }}<span class="ml-5">{{ n.date }}</span></v-card
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="*" class="ml-2">
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-2 pr-2" elevation="0">
                        <label class="font-weight-black">助成自治体番号</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col>
                          <v-card class="pa-2" elevation="0">{{
                            jyukyusyaItirans[1].jyoseijititaiBango
                          }}</v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="1*" class="ml-2">
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-2 pr-2" elevation="0">
                        <label class="font-weight-black">障害種別</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col>
                          <v-card class="pa-2" elevation="0">
                            {{ jyukyusyaItirans[2].syogaisyubetsu }}
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-2 pr-2" elevation="0">
                        <label class="font-weight-black">障害支区</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col>
                          <v-card class="pa-2" elevation="0">
                            {{ jyukyusyaItirans[3].syogaishiku }}
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="1*" class="ml-2">
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-2 pr-2" elevation="0">
                        <label class="font-weight-black">負担上限額</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col class="text-right">
                          <v-card class="pa-2" elevation="0">
                            {{ jyukyusyaItirans[4].futanjyougengaku }} 円
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-2 pr-2" elevation="0">
                        <label class="font-weight-black">特別給付費</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col class="text-right">
                          <v-card class="pa-2" elevation="0">
                            {{ jyukyusyaItirans[5].tokubetsukyufuhi }}円
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="3" class="ml-2">
                    <v-card class="d-flex flex-row" flat tile>
                      <v-card class="pt-2 pr-2" elevation="0">
                        <label class="font-weight-black">上限管理時</label>
                      </v-card>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-card
                            class="pa-1"
                            elevation="0"
                            v-for="(n, k) in jyukyusyaItirans[6].jyougenkanriji"
                            :key="k"
                          >
                            {{ n.name
                            }}<span class="ml-5">{{ n.date }}</span></v-card
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-3">
            <v-col md="4">
              <v-card elevation="0">
                <div class="clearfix">
                  <a class="addButton" @click="openDialog_Term()">期間追加</a>
                  <a class="ml-1 addButton" @click="openDialog_Add()"
                    >加算追加</a
                  >
                </div>
              </v-card>
            </v-col>
            <v-col md="6" class="ml-auto">
              <v-card elevation="0">
                <v-row no-gutters>
                  <v-col>
                    <img src="../assets/tyusyaku_01.png" />
                  </v-col>
                  <v-col cols="2"> :編集可能 </v-col>
                  <v-col cols="1">
                    <img src="../assets/tyusyaku_02.png" />
                  </v-col>
                  <v-col cols="*"> :入退院 </v-col>
                  <v-col cols="1">
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
          ></wj-flex-grid>
        </v-col>
      </v-row>
      <dialog-kikantuika ref="dialog_kikantuika"> </dialog-kikantuika>
      <dialog-kasantuika ref="dialog_kasantuika"></dialog-kasantuika>
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

export default {
  data() {
    return {
      mainGrid: [], //表示grid
      riyoubiData: [], //利用日データ
      nyutaiinData: [], //入退院データ
      gridItemName: [
        {
          heads: ['項目', '合計', '金額'],
          column: ['変動情報'],
          shisetsuNyusho: [
            { name: '利用日' },
            { name: '入院・退院日' },
            { name: '外泊日' },
            { name: '食事', mealFlag: true },
            { name: '光熱水費', kounetsuSuihiFlag: 'kounetsuSuihiFlag' },
          ],
          meals: ['朝食', '昼食', '夕食'],
          column2: [
            '加算情報',
            '重度障害者支援加算Ⅱ2',
            '重度障害者支援加算Ⅱ3',
            '栄養マネジメント加算',
            '療養食加算',
            '口腔衛生管理加算',
            '入院・外泊時加算',
            '地域移行加算',
          ],
          mealsCount: [300, 400, 500],
          kounetsuSuihi: [{ count: 100 }],
        },
      ],
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      dateArgument: '', // ヘッダメニューのカレンダー選択
      serviceArgument: '', // ヘッダメニューのサービス選択
      jyukyusyaItirans: this.getJyukyusyaItiran(), // 受給者一覧情報表示用
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyo: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
      dialog: false, //期間追加用のダイアログ
    };
  },
  components: {
    HeaderServices,
    UserListPrint,
    DialogKikantuika,
    DialogKasantuika,
  },
  methods: {
    //期間追加ダイアログの表示
    openDialog_Term() {
      this.$refs.dialog_kikantuika.parentFromOpenDialog();
    },
    //加算追加ダイアログの表示
    openDialog_Add() {
      this.$refs.dialog_kasantuika.parentFromOpenDialog();
    },
    // 受給者一覧情報の表示用データの取得
    getJyukyusyaItiran: function () {
      return methodSetJyukyusyaItiran();
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
    },
    //ヘッダメニューのカレンダーを変更したとき
    parentCalendar: function (dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = moment(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();

      methodCellSettingDefault(this.mainGrid, this);
    },
    //ヘッダメニューのサービスを変更したとき
    parentServiceSelect: function (serviceArgument) {
      console.log(serviceArgument);
    },

    onitemsSourceChanged: function (flexGrid) {
      console.log('ssddd');
      console.log(flexGrid);
    },
    // グリッドイニシアライズ
    onInitialized: function (flexGrid) {
      this.mainGrid = flexGrid;
      flexGrid.autoSizeColumns();
      let _self = this;
      // セル初期カラム情報
      methodCellSettingDefault(flexGrid, _self);
      // 情報パーツの書き込み
      methodWriteJyoho(flexGrid, _self);
      //値の登録
      methodSettingPoint(flexGrid, _self);

      // セル情報のフォーマット指定
      methodCellFormatSetting(flexGrid, _self);

      //セルのクリックイベント
      methodCellClickEvent(flexGrid, _self);

      // セル情報のマージ
      let range = [];
      //施設入所用
      range = [
        new wjGrid.CellRange(0, 1, 0, 2),
        new wjGrid.CellRange(1, 0, 7, 0),
        new wjGrid.CellRange(1, 1, 1, 2),
        new wjGrid.CellRange(2, 1, 2, 2),
        new wjGrid.CellRange(3, 1, 3, 2),
        new wjGrid.CellRange(8, 0, 14, 0),
        new wjGrid.CellRange(8, 1, 8, 2),
        new wjGrid.CellRange(9, 1, 9, 2),
        new wjGrid.CellRange(10, 1, 10, 2),
        new wjGrid.CellRange(11, 1, 11, 2),
        new wjGrid.CellRange(12, 1, 12, 2),
        new wjGrid.CellRange(13, 1, 13, 2),
        new wjGrid.CellRange(14, 1, 14, 2),
      ];
      let mm = new wjGrid.MergeManager(flexGrid);
      mm.getMergedRange = function (panel, r, c) {
        for (let h = 0; h < range.length; h++) {
          if (range[h].contains(r, c)) {
            return range[h];
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
  },
};
/*********************
 * 受給者証情報のデータ作成
 */
function methodSetJyukyusyaItiran() {
  let jyukyusyaItiran = [];
  jyukyusyaItiran.push({
    engosya: [
      { engosya: '東経市', date: '7/10～7/20' },
      { engosya: '西経市', date: '7/11～7/21' },
      { engosya: '北経市', date: '7/12～7/22' },
    ],
  });
  jyukyusyaItiran.push({
    jyoseijititaiBango: '1234',
  });
  jyukyusyaItiran.push({
    syogaisyubetsu: '知的',
  });
  jyukyusyaItiran.push({
    syogaishiku: '区分4',
  });
  jyukyusyaItiran.push({
    futanjyougengaku: '9,300',
  });
  jyukyusyaItiran.push({
    tokubetsukyufuhi: '500',
  });
  jyukyusyaItiran.push({
    jyougenkanriji: [
      { name: 'ひまわり園', date: '7/10～7/20' },
      { name: 'はなます園', date: '7/11～7/21' },
    ],
  });
  return jyukyusyaItiran;
}

/*******************
 * セル初期カラム情報
 */
function methodCellSettingDefault(flexGrid, _self) {
  let lastdate = _self.lastdate;
  while (flexGrid.columns.length < lastdate + 5) {
    flexGrid.columns.push(new wjGrid.Column());
  }
  while (flexGrid.rows.length < 15) {
    flexGrid.rows.push(new wjGrid.Row());
  }

  flexGrid.frozenColumns = 3;
  flexGrid.frozenRows = 1;
  flexGrid.columns[0].width = 32;
  flexGrid.columns[1].width = 100;
  flexGrid.columns[2].width = 100;
  flexGrid.rows[0].height = 60;
  flexGrid.height = 60;
  flexGrid.setCellData(0, 0, '');
  flexGrid.setCellData(0, 1, _self.gridItemName[0].heads[0]);
  //日付の表示
  let date = '';
  let day = '';
  for (let i = 3; i < lastdate + 3; i++) {
    flexGrid.columns[i].width = '1*';
    day = String(i - 2).padStart(2, '0');
    date = _self.year + '/' + _self.month + '/' + day;
    flexGrid.setCellData(0, i, date);
  }
  //合計
  flexGrid.setCellData(0, lastdate + 3, _self.gridItemName[0].heads[1]);
  flexGrid.columns[lastdate + 3].width = '2*';
  //金額
  flexGrid.setCellData(0, lastdate + 4, _self.gridItemName[0].heads[2]);
  flexGrid.columns[lastdate + 4].width = '3*';
}
/*******
 * 各情報タイトルの書き込み
 */
function methodWriteJyoho(flexGrid, self) {
  //変動情報
  let hendoRows_st = 1; //変動情報の始まりの行
  let hendoRows_ed = 7; //変動情報で利用した行数
  let kasanRows_st = hendoRows_ed + 1; //加算情報で利用する始まりの行数
  flexGrid.setCellData(hendoRows_st, 0, self.gridItemName[0].column[0]);

  let row = 0;
  for (let i = 0; i < self.gridItemName[0].shisetsuNyusho.length; i++) {
    flexGrid.setCellData(
      row + 1,
      1,
      self.gridItemName[0].shisetsuNyusho[i].name
    );
    //食事用のflagがあれば、食事内容を表示する
    if (self.gridItemName[0].shisetsuNyusho[i].mealFlag) {
      for (let j = 0; j < self.gridItemName[0].meals.length; j++) {
        let k = i + 1 + j;
        flexGrid.setCellData(k, 2, self.gridItemName[0].meals[j]);
        row++;
      }
    } else if (self.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag) {
      row++;
      flexGrid.setCellData(
        row,
        2,
        self.gridItemName[0].shisetsuNyusho[i].kounetsuSuihiFlag
      );
    } else {
      row++;
    }
  }
  //加算情報
  flexGrid.setCellData(kasanRows_st, 0, self.gridItemName[0].column2[0]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[1]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[2]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[3]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[4]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[5]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[6]);
  flexGrid.setCellData(kasanRows_st++, 1, self.gridItemName[0].column2[7]);
}
/**************
 * セルのクリックイベント
 */
function methodCellClickEvent(flexGrid, _self) {
  flexGrid.hostElement.addEventListener('click', function (e) {
    var ht = flexGrid.hitTest(e);
    //矢印下の箱を押下
    if (ht.target.innerHTML.match(/termFlag/)) {
      _self.$refs.dialog_kikantuika.parentFromOpenDialog();
    }
  });
}
/***
 * 値の登録処理
 */
function methodSettingPoint(flexGrid, _self) {
  //利用日の設定
  settingRiyoubi(flexGrid, _self);
  //入院・退院日の設定
  settingNyuTaiin(flexGrid, _self);
}
/*******
 * 入院・退院日の設定
 */
function settingNyuTaiin(flexGrid, _self) {
  let nyutaiin = [];
  nyutaiin.push({
    key: 0,
    day4: 0,
    day5: 0,
    day6: 'arrow_start-0', //文字列のあとにkeyを不随させる
    day7: 'arrow-0',
    day8: 'arrow-0',
    day9: 'arrow_end-0',
    day10: 0,

    total: 12,
    money: 2500,
    start_date: '4/6',
    end_date: '4/9',
    diff_date: 3,
  });
  for (let i = 0; i <= _self.lastdate; i++) {
    let d = 'day' + (i + 1);
    flexGrid.setCellData(2, i + 3, nyutaiin[0][d]);
  }
  flexGrid.setCellData(2, _self.lastdate + 3, nyutaiin[0]['total']);
  flexGrid.setCellData(2, _self.lastdate + 4, nyutaiin[0]['money']);
  _self.nyutaiinData = nyutaiin;
}
/*********
 * 利用日の設定
 */
function settingRiyoubi(flexGrid, _self) {
  let riyoubi = [];
  riyoubi.push({
    key: 0,
    day6: 1,
    day7: 1,
    day8: 1,
    day9: 1,
    day10: 1,
    day11: 1,
    day12: 1,
    day13: 1,
    day14: 1,
    day15: 1,
    day16: 1,
    day17: 1,
    day18: 1,
    day29: 1,
    day30: 1,
    total: 1,
    money: '',
  });
  for (let i = 0; i <= _self.lastdate; i++) {
    let d = 'day' + (i + 1);
    flexGrid.setCellData(1, i + 3, riyoubi[0][d]);
  }
  flexGrid.setCellData(1, _self.lastdate + 3, riyoubi[0]['total']);
  flexGrid.setCellData(1, _self.lastdate + 4, riyoubi[0]['money']);
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
    //食事の表示
    for (let i = 0; i < _self.gridItemName[0].meals.length; i++) {
      if (text == _self.gridItemName[0].meals[i]) {
        html =
          html +
          '<span class="float-right">@' +
          _self.gridItemName[0].mealsCount[i] +
          '/回</span>';
      }
    }
    //高熱水費
    if (text == 'kounetsuSuihiFlag') {
      html =
        '<span class="float-right">@' +
        _self.gridItemName[0].kounetsuSuihi[0].count +
        '/回</span>';
    }

    //項目ヘッダ
    for (let i = 0; i < _self.gridItemName[0].heads.length; i++) {
      if (text == _self.gridItemName[0].heads[i]) {
        classname = 'head';
      }
    }

    //変動情報等の縦
    //加算情報等の縦
    if (
      text == _self.gridItemName[0].column[0] ||
      text == _self.gridItemName[0].column2[0]
    ) {
      classname = 'vertical';
    }

    //矢印の表示
    if (text.match(/^arrow_start-[0-9].*/)) {
      let key = text.split('-')[1];
      let date = _self.nyutaiinData[key];
      //termFlagは矢印を押下した際の表示用文字列
      html = '<div class="red-arrow_start"><div>&nbsp;</div></div>';
      html +=
        '<div class="arrow_box"><div><span class="d-none">termFlag</span>' +
        date['start_date'] +
        '～' +
        date['end_date'] +
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

    //日付表示
    if (isDate.isDate(text)) {
      html = dateFormatString.dateFormatString(text);
    }

    //〇の表示
    //1:手入力不可〇
    if (
      text == 1 &&
      e.col != _self.lastdate + 3 &&
      e.col != _self.lastdate + 4
    ) {
      html = '〇';
    }
    //0:空欄
    if (
      text == 0 &&
      e.col != _self.lastdate + 3 &&
      e.col != _self.lastdate + 4
    ) {
      html = '';
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
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#kobetsuriyo {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1366px;
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
  // 受給者証状況用のエリアボックス
  .jyukyusyaBox {
    height: 80px;
    overflow-y: auto;
  }

  // 期間追加・加算追加ボタン
  a {
    &.addButton {
      width: 100px;
      background-color: $pink;
      display: block;
      float: left;
      color: $font_color !important;
      text-align: left;
      border-radius: 30px;
      padding: 4px 0px 1px 10px;
      cursor: pointer;
      background-image: url('../assets/plus_15px.png');
      background-position: 95% 50%;
    }
  }
  #flexGrid {
    width: 100%;
    max-width: auto;
    .wj-cell {
      &.wj-frozen-row {
        padding: 0;
        text-align: center;
      }
    }
    .wj-frozen {
      background-color: $selected_color;
      font-weight: 700;
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
  .red-arrow,
  .red-arrow_end,
  .red-arrow_start {
    border-top: 1px solid $red;
    display: block;
    position: absolute;
    width: 100%;
    top: 3px;
    left: 0;
    text-indent: -9999px;
  }

  .red-arrow_start {
    > div {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-right: 4px solid $red;
      border-bottom: 4px solid transparent;
      position: absolute;
      left: 0;
      top: -5px;
    }
  }

  .red-arrow_end {
    div {
      width: 0;
      height: 0;
      border-left: 4px solid $red;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      position: absolute;
      left: auto;
      right: 0;
      top: -5px;
    }
  }

  .arrow_box {
    width: 400px;
    margin-top: -9px;
    cursor: pointer;
    div {
      padding: 0px 20px 0px 5px;
      position: absolute;
      background-color: $white;
      border: 1px solid $font_color;
      z-index: 1;
      background-image: url('../assets/tyusyaku_04.png');
      background-position: 99% 40%;
      background-size: 10px 10px;
    }
  }

  // スクロールバーの表示
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #ccc;
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 0px;
  }
}
</style>