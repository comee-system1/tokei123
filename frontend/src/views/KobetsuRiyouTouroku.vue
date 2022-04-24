<template>
  <div id="kobetsuriyo">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>
    <v-container fluid class="container">
      <v-layout>
        <v-flex style="min-width: 275px; max-width: 275px; width: 275px">
          <user-list-print
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list-print>
        </v-flex>
        <v-flex>
          <v-row class="mt-0" no-gutters>
            <v-col cols="4">
              <v-card class="d-flex flex-row" flat tile>
                <v-card class="pt-2 pr-2" elevation="0">
                  <label class="font-weight-black">利用者名</label>
                </v-card>
                <v-card class="pa-1" :width="280" outlined tile>
                  {{ userDataSelect[0].riyosyo }}
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="d-flex flex-row" flat tile>
                <v-card class="pt-2 pr-2" elevation="0">
                  <label class="font-weight-black">受給者番号</label>
                </v-card>
                <v-card class="pa-1" :width="180" outlined tile>
                  {{ userDataSelect[0].jyukyusyabango }}
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-row class="justify-end" no-gutters>
                <v-btn class="pa-3" outlined>受給者証修正</v-btn>
              </v-row>
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
                  <a class="addButton" @click="dialog = true">期間追加</a>
                  <a class="ml-1 addButton" @click="dialog_add = true"
                    >加算追加</a
                  >
                </div>
              </v-card>
            </v-col>
            <v-col md="5" class="ml-auto">
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
            :allowMerging="6"
            :headersVisibility="'None'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :itemsSourceChanged="onitemsSourceChanged"
          ></wj-flex-grid>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import UserListPrint from '../components/UserListPrint.vue';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.multirow';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  data() {
    return {
      viewGridData: [], // 表示用gridデータ''
      mainGrid: [], //表示grid
      gridItemName: [
        {
          heads: ['項目', '合計', '金額'],
          column: [
            '変動情報',
            '利用日',
            '入院・退院日',
            '外泊日',
            '食事',
            '光熱水費',
          ],
          column2: [
            '加算情報',
            '重度障害者支援加算Ⅱ2',
            '重度障害者支援加算Ⅱ3',
            '栄養マネジメント加算',
          ],
          meals: ['朝食', '昼食', '夕食'],
          mealsCount: [300, 400, 500],
          kounetsuSuihi: [100],
        },
      ],
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      week: ['日', '月', '火', '水', '木', '金', '土'],
      dateArgument: '',
      jyukyusyaItirans: this.getJyukyusyaItiran(), // 受給者一覧情報表示用
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyo: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
    };
  },
  components: {
    HeaderServices,
    UserListPrint,
  },
  methods: {
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

      // セル情報のマージ
      let range = [];
      range = [
        new wjGrid.CellRange(0, 1, 0, 2),
        new wjGrid.CellRange(1, 0, 7, 0),
        new wjGrid.CellRange(1, 1, 1, 2),
        new wjGrid.CellRange(2, 1, 2, 2),
        new wjGrid.CellRange(3, 1, 3, 2),
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
  while (flexGrid.rows.length < 14) {
    flexGrid.rows.push(new wjGrid.Row());
  }

  flexGrid.frozenColumns = 3;
  flexGrid.frozenRows = 1;
  flexGrid.columns[0].width = 32;
  flexGrid.columns[1].width = 80;
  flexGrid.columns[2].width = '*';
  flexGrid.rows[0].height = 60;
  flexGrid.height = 60;
  flexGrid.setCellData(0, 0, '');
  flexGrid.setCellData(0, 1, _self.gridItemName[0].heads[0]);
  //日付の表示
  for (let i = 3; i < lastdate + 3; i++) {
    flexGrid.columns[i].width = 24;
    flexGrid.setCellData(0, i, i - 2);
  }
  //合計
  flexGrid.setCellData(0, lastdate + 3, _self.gridItemName[0].heads[1]);
  flexGrid.columns[lastdate + 3].width = 40;
  //金額
  flexGrid.setCellData(0, lastdate + 4, _self.gridItemName[0].heads[2]);
  flexGrid.columns[lastdate + 4].width = 50;
}
/*******
 * 各情報タイトルの書き込み
 */
function methodWriteJyoho(flexGrid, self) {
  //変動情報
  let hendoRows = 7; //変動情報で利用した行数
  let kasanRows = hendoRows + 1; //加算情報で利用する始まりの行数
  flexGrid.setCellData(1, 0, self.gridItemName[0].column[0]);
  flexGrid.setCellData(1, 1, self.gridItemName[0].column[1]);
  flexGrid.setCellData(2, 1, self.gridItemName[0].column[2]);
  flexGrid.setCellData(3, 1, self.gridItemName[0].column[3]);
  flexGrid.setCellData(4, 1, self.gridItemName[0].column[4]);
  flexGrid.setCellData(7, 1, self.gridItemName[0].column[5]);
  flexGrid.setCellData(4, 2, self.gridItemName[0].meals[0]);
  flexGrid.setCellData(5, 2, self.gridItemName[0].meals[1]);
  flexGrid.setCellData(6, 2, self.gridItemName[0].meals[2]);
  flexGrid.setCellData(7, 2, self.gridItemName[0].kounetsuSuihi[0]);
  flexGrid.setCellData(kasanRows, 0, self.gridItemName[0].column2[0]);
}
/***
 * 値の登録処理
 */
function methodSettingPoint(flexGrid, _self) {
  //flexGrid.setCellData(1, 3, 'arrow_start');
  //利用日の設定
  settingRiyoubi(flexGrid, _self);
}

function settingRiyoubi(flexGrid, _self) {
  let riyoubi = [];
  riyoubi.push({
    day1: 1,
    day2: 1,
    day3: 1,
    day4: 1,
    day5: 0,
    day6: 'arrow_start',
    day7: 'arrow',
    day8: 'arrow',
    day9: 'arrow_end',
    day10: 0,
    start_date: '4/6',
    end_date: '4/9',
  });
  for (let i = 0; i <= _self.lastdate; i++) {
    console.log(riyoubi);
    let d = 'day' + (i + 1);
    flexGrid.setCellData(1, i + 3, riyoubi[0][d]);
  }
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
    for (let i = 0; i < _self.gridItemName[0].kounetsuSuihi.length; i++) {
      if (text == _self.gridItemName[0].kounetsuSuihi[i]) {
        html =
          '<span class="float-right">@' +
          _self.gridItemName[0].kounetsuSuihi[i] +
          '/回</span>';
      }
    }
    //項目ヘッダ
    for (let i = 0; i < _self.gridItemName[0].heads.length; i++) {
      if (text == _self.gridItemName[0].heads[i]) {
        classname = 'head';
      }
    }

    //変動情報等の縦
    if (text == _self.gridItemName[0].column[0]) {
      classname = 'vertical';
    }

    //矢印の表示
    if (text == 'arrow_start') {
      html = '<div class="red-arrow_start"><div>&nbsp;</div></div>';
      html += '<div class="arrow_box"><div>sssssssss</div></div>';
    }
    if (text == 'arrow') {
      html = '<div class="red-arrow"><div>&nbsp;</div></div>';
    }
    if (text == 'arrow_end') {
      html = '<div class="red-arrow_end"><div>&nbsp;</div></div>';
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
    min-width: 1000px;

    .wj-cell {
      &.wj-frozen-row {
        padding: 0;
        text-align: center;
      }
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