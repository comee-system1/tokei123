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
            :headersVisibility="'Column'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :isReadOnly="true"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :selectionMode="'None'"
            :style="gridHeight"
            :itemsSource="viewdata"
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
// import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import { getHendoData2 } from '@/data/kobetsuRiyoHendo2.js';
// import { getRiyobi } from '@/data/kobetsuRiyobi.js';
// import { getNyutaiin } from '@/data/kobetsuNyutaiin.js';
// import { getGaihaku } from '@/data/kobetsuGaihaku.js';
// import { getMeal } from '@/data/kobetsuMeal.js';
// import { getKounetusuihi } from '@/data/kobetsuKounetusuihi.js';
//const startPoint = 4;
//const totalPoint = startPoint + 1;
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
      viewdata: [],
      hendoRow: 0, // 変動情報の行数
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
    onInitialized(flexGrid) {
      // 初回の提供サービスコードを渡す
      this.$refs.user_list_print.setChildTeikyocode(this.teikyoCode);
      this.rowHendoData = getHendoData2();
      // ヘッダ作成
      this.createHeader(flexGrid);
      this.createRowHeader(flexGrid);
      //   this.createMerge(flexGrid);
      //   this.methodCellFormatSetting(flexGrid);

      //flexGrid.itemsSource = [];
    },
    onChangeInitialized() {
      // 列ヘッダ
      //this.createRowHeader(flexGrid);
      // マージ
      //this.createMerge(flexGrid);
    },

    /************************
     * セルのフォーマット
     */
    methodCellFormatSetting(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;
        let classname = '';
        console.log(html);
        console.log(text);
        // 変動情報を縦に変更
        if (e.panel != flexGrid.columnHeaders) {
          if (e.row == 0 && e.col == 0) {
            classname = 'vertical';
          }
        }

        if (e.panel == flexGrid.columnHeaders) {
          // 日付表示
          if (isDate.isDate(text)) {
            html = dateFormatString.dateFormatString(text);
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = 'center';
          }

          if (e.row == 0 && e.col == 0) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = 'center';
          }
        }

        e.cell.innerHTML = '<div class="' + classname + '">' + html + '</div>';
      });
    },
    /*****************
     * マージ
     */
    createMerge(flexGrid) {
      let headerRanges = [];
      let cellRanges = [];
      // headerRanges = [new wjGrid.CellRange(0, 0, 1, 3)];
      cellRanges = [new wjGrid.CellRange(0, 0, 6, 0)];

      for (let i = 0; i < this.viewdata.length; i++) {
        cellRanges.push(new wjGrid.CellRange(i, 1, i, this.viewdata[i].merge));
      }

      let mm = new wjGrid.MergeManager(flexGrid);
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    /*******************
     * 列ヘッダ
     */
    createRowHeader(flexGrid) {
      let hendo = this.rowHendoData.hendo;
      let hendoRow = 0;
      let viewData = [];
      for (let i = 0; i < hendo.length; i++) {
        // 光熱水費がある時
        // 食事がある時、食事の分カラムを追加
        // mergeにカラム数を入れる
        if (hendo[i].type == 'meal' || hendo[i].type == 'shine') {
          for (let m = 0; m < hendo[i].data.length; m++) {
            viewData.push({
              komoku0: this.rowHendoData.rowColumn.column1,
              komoku1: hendo[i].text,
              komoku3: hendo[i].data[m].text + '@' + hendo[i].data[m].money,
              merge: hendo[i].merge,
            });
            hendoRow++;
          }
        } else {
          viewData.push({
            komoku0: this.rowHendoData.rowColumn.column1,
            komoku1: hendo[i].text,
            merge: hendo[i].merge,
          });
          hendoRow++;
        }
      }
      console.log(viewData);
      flexGrid.itemsSource = [];
      //this.viewdata = viewData;
      this.hendoRow = hendoRow;
    },

    /**************************
     * ヘッダ作成
     */
    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columns.insert(0, new wjGrid.Column());
      flexGrid.columns.insert(1, new wjGrid.Column());
      flexGrid.columns.insert(2, new wjGrid.Column());
      flexGrid.columns.insert(3, new wjGrid.Column());
      let column = 0;
      flexGrid.columns[column++].binding = 'komoku0';
      flexGrid.columns[column++].binding = 'komoku1';
      flexGrid.columns[column++].binding = 'komoku2';
      flexGrid.columns[column++].binding = 'komoku3';
      let c = column++;
      for (let day = 1; day <= this.lastdate; day++) {
        flexGrid.columns.insert(c, new wjGrid.Column());
        flexGrid.columns[c].binding = 'day' + day;
        c = column++;
      }
      flexGrid.columns.insert(column++, new wjGrid.Column());
      flexGrid.columns.insert(column++, new wjGrid.Column());
      flexGrid.columns[c].binding = 'gokei';
      flexGrid.columns[c + 1].binding = 'kingaku';

      flexGrid.columnHeaders.setCellData(0, 0, '項目');

      for (let day = 1; day <= this.lastdate; day++) {
        let date = this.year + '/' + this.month + '/' + day;
        flexGrid.columnHeaders.setCellData(0, day + 3, date);
      }
      flexGrid.columnHeaders.setCellData(0, c, '計');
      flexGrid.columnHeaders.setCellData(0, c + 1, '金額');

      flexGrid.rows.defaultSize = 20;

      flexGrid.columns[0].width = 20;
      flexGrid.columns[1].width = 20;
      flexGrid.columnHeaders.rows[0].height = 34;
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

  .vertical {
    height: 100%;
    width: 100%;
  }

  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .wj-flexgrid .wj-cell.wj-align-right {
    justify-content: flex-end;
  }
  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }
}
</style>