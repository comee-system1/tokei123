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
            :itemsSourceChanged="onChangeInitialized"
            :autoGenerateColumns="false"
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
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import { getHendoData2 } from '@/data/kobetsuRiyoHendo2.js';
import { getRiyobi } from '@/data/kobetsuRiyobi2.js';
import { getNyutaiin } from '@/data/kobetsuNyutaiin2.js';
import { getGaihaku } from '@/data/kobetsuGaihaku2.js';
import { getMeal } from '@/data/kobetsuMeal2.js';
import { getKounetusuihi } from '@/data/kobetsuKounetusuihi2.js';
//const startPoint = 4;
//const totalPoint = startPoint + 1;
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      plusOne: 1, // 該当日付を含める
      mainGrid: [], // 表示grid
      riyoubiData: [], // 利用日データ
      nyutaiinData: [], // 入退院データ
      gaihakuData: [], // 外泊データ
      mealsData: [], // 食事データ
      shineData: [], // 光熱水費データ
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
      this.riyoubiData = getRiyobi();
      this.nyutaiinData = getNyutaiin();
      this.gaihakuData = getGaihaku();
      this.mealsData = getMeal();
      this.shineData = getKounetusuihi();

      // ヘッダ作成
      this.createHeader(flexGrid);
      this.createRowHeader(flexGrid);
      this.createMerge(flexGrid);
      this.methodCellFormatSetting(flexGrid);
      // 値の登録
      this.settingPoint();

      //  flexGrid.itemsSource = [];
    },
    onChangeInitialized(flexGrid) {
      if (flexGrid.rows.length > 0) {
        flexGrid.rows[1].height = 30;
        flexGrid.rows[2].height = 30;
      }
      // 列ヘッダ
      //this.createRowHeader(flexGrid);
      // マージ
      //this.createMerge(flexGrid);
    },
    /**************************
     * 値の登録
     */
    settingPoint() {
      let riyoGoukei = 0;
      let m = 0; // 食事のキー
      console.log(this.viewdata);
      for (let i = 0; i < this.viewdata.length; i++) {
        if (this.viewdata[i].type == 'riyo') {
          for (let day = 1; day <= this.lastdate; day++) {
            let d = 'day' + day;
            // 利用日

            if (this.riyoubiData[d]) {
              let days = this.riyoubiData[d];
              this.viewdata[i][d] = days;
              riyoGoukei++;
            }
          }
        }
        // 入退院
        if (
          this.viewdata[i].type == 'nyutai' ||
          this.viewdata[i].type == 'gaihaku'
        ) {
          // console.log(this.nyutaiinData);
          // 日付の調整
          if (this.viewdata[i].type == 'gaihaku') {
            this.settingArrowView(this.gaihakuData, i);
          } else {
            this.settingArrowView(this.nyutaiinData, i);
          }
        }

        // 利用日合計
        if (this.viewdata[i].type == 'riyo') {
          this.viewdata[i]['gokei'] = riyoGoukei;
          this.viewdata[i]['kingaku'] = this.riyoubiData['money'];
        }

        // 食事
        if (this.viewdata[i].type == 'meal') {
          let moneys = this.viewdata[i].data[m].money;
          let cnt = 0;
          for (let day = 1; day <= this.lastdate; day++) {
            let d = 'day' + day;
            if (this.mealsData[m][d]) {
              let days = this.mealsData[m][d];
              this.viewdata[i][d] = days;
              if (days == 2) {
                cnt++;
              }
              this.viewdata[i]['gokei'] = cnt;
              this.viewdata[i]['kingaku'] = cnt * moneys;
            }
          }
          m++;
        }

        // 光熱水費
        if (this.viewdata[i].type == 'shine') {
          let moneys = this.viewdata[i].data[0].money;
          let cnt = 0;
          for (let day = 1; day <= this.lastdate; day++) {
            let d = 'day' + day;
            if (this.shineData[d]) {
              let days = this.shineData[d];
              this.viewdata[i][d] = days;
              if (days == 2) {
                cnt++;
              }
              this.viewdata[i]['gokei'] = cnt;
              this.viewdata[i]['kingaku'] = cnt * moneys;
            }
          }
        }
      }
    },

    /*********************
     * 矢印を登録する
     */
    settingArrowView(data, i) {
      this.viewdata[i]['st'] = [];
      this.viewdata[i]['ed'] = [];
      this.viewdata[i]['diff'] = [];
      let gokei = 0;
      // 月末の取得
      let date = this.year + '-' + this.month + '-01';
      let matu = moment(date).endOf('month');
      let si = moment(date).startOf('month');
      for (let n = 0; n < data.date.length; n++) {
        let end = '';
        if (data.date[n].end_date) {
          end = moment(data.date[n].end_date);
        }
        let nextMonthFlag = false;
        // 前月以前の場合は月初を指定する
        let start = moment(data.date[n].start_date);
        let beforeMonthFlag = false;
        // 変更前のデータ(表示用)
        let beforeStart = start;
        let beforeEnd = end;
        // 翌月以降の場合は月末を指定する
        if (end > matu || !end) {
          end = matu;
          nextMonthFlag = true;
        }

        if (start < si) {
          start = si;
          beforeMonthFlag = true;
        }

        let diff = end.diff(start, 'days');
        gokei += diff;
        this.viewdata[i]['st'].push(beforeStart.format('M/D'));
        if (beforeEnd) {
          this.viewdata[i]['ed'].push(beforeEnd.format('M/D'));
        } else {
          this.viewdata[i]['ed'].push('未設定');
        }
        this.viewdata[i]['diff'].push(diff);
        for (let day = 0; day <= diff; day++) {
          let dayAdd = moment(start).add(day, 'd').format('D');
          let d = 'day' + dayAdd;
          if (day == 0) {
            if (!beforeMonthFlag) {
              this.viewdata[i][d] = 'start';
            } else {
              this.viewdata[i][d] = 'start-m';
            }
          } else if (day == diff) {
            if (!nextMonthFlag) {
              this.viewdata[i][d] = 'end';
            } else {
              this.viewdata[i][d] = 'middle';
            }
          } else {
            this.viewdata[i][d] = 'middle';
          }
        }
        this.viewdata[i]['gokei'] = gokei + data.date.length;
        this.viewdata[i]['kingaku'] = 'none';
      }
    },
    /************************
     * セルのフォーマット
     */
    methodCellFormatSetting(flexGrid) {
      let _self = this;
      let num = 0;
      flexGrid.formatItem.addHandler(function (s, e) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        // console.log(tmpitem);
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;
        let classname = '';
        if (e.panel != flexGrid.columnHeaders) {
          // 変動情報を縦に変更
          if (e.row == 0 && e.col == 0) {
            classname = 'vertical';
          }
          // グリッドの値を変更
          // 入退院 / 外泊
          if (
            e.col > 3 &&
            e.col <= _self.lastdate + 3 &&
            (e.row == 1 || e.row == 2)
          ) {
            let color = 'color_red';
            if (tmpitem.type == 'gaihaku') {
              color = 'color_green';
            }
            if (text === 'start' || text === 'start-m') {
              if (text === 'start') {
                html = "<div class='arrow-box " + color + "'></div>";
                html += "<div class='arrow-start " + color + "'></div>";
              } else {
                html = "<div class='arrow-box " + color + "'></div>";
              }
              html +=
                "<div class='datearea'><div>" +
                tmpitem.st[num] +
                '～' +
                tmpitem.ed[num] +
                '[' +
                parseInt(tmpitem.diff[num] + 1) +
                ']</div></div>';
              num++;
              if (num >= tmpitem.st.length) {
                num = 0;
              }
            }
            if (text === 'middle') {
              html = "<div class='arrow-box " + color + "'></div>";
            }
            if (text === 'end') {
              html = "<div class='arrow-box " + color + "'></div>";
              html += "<div class='arrow-end " + color + "'></div>";
            }
          } else if (e.col >= 4 && e.col <= _self.lastdate + 3) {
            positionCenter(e);
            e.cell.style.color = sysConst.COLOR.fontColor;
            if (text === '1') {
              html = '〇';
            }
            if (text === '2') {
              e.cell.style.color = sysConst.COLOR.blueTextColor;
              html = '〇';
            }
            if (text === '0') {
              html = '×';
            }
          }
          if (e.col == _self.lastdate + 5) {
            if (text === 'none') {
              html = '';
              e.cell.style.backgroundColor = sysConst.COLOR.selectedColor;
            }
            positionRight(e);
          }
        }

        if (e.panel == flexGrid.columnHeaders) {
          // 日付表示
          if (isDate.isDate(text)) {
            html = dateFormatString.dateFormatString(text);
            positionCenter(e);
          }

          if (e.row == 0 && (e.col == 0 || e.col >= _self.lastdate + 4)) {
            positionCenter(e);
          }
        }

        e.cell.innerHTML = '<div class="' + classname + '">' + html + '</div>';
        if (e.panel != flexGrid.columnHeaders) {
          if (
            e.col >= 4 &&
            e.col <= _self.lastdate + 3 &&
            (e.row == 1 || e.row == 2)
          ) {
            wjCore.setCss(e.cell, {
              display: 'table',
              tableLayout: 'absolute',
            });
            wjCore.setCss(e.cell.children[0], {
              display: 'table-cell',
              verticalAlign: 'middle',
            });
          }
        }
        function positionCenter(e) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
        function positionRight(e) {
          e.cell.style.textAlign = 'right';
          e.cell.style.justifyContent = 'right';
          e.cell.style.alignItems = 'right';
        }
      });
    },
    /*****************
     * マージ
     */
    createMerge(flexGrid) {
      let headerRanges = [];
      let cellRanges = [];
      headerRanges = [new wjGrid.CellRange(0, 0, 1, 3)];
      // 日付マージ
      for (let day = 4; day < this.lastdate + 4; day++) {
        headerRanges.push(new wjGrid.CellRange(0, day, 1, day));
      }
      // 合計マージ
      headerRanges.push(
        new wjGrid.CellRange(0, this.lastdate + 4, 1, this.lastdate + 4)
      );
      // 金額
      headerRanges.push(
        new wjGrid.CellRange(0, this.lastdate + 5, 1, this.lastdate + 5)
      );
      cellRanges = [new wjGrid.CellRange(0, 0, this.viewdata.length - 1, 0)];
      // 食事用マージ
      this.mealMearges(cellRanges);
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
    mealMearges(cellRanges) {
      let stMeal = 0;
      let edMeal = 0;
      for (let i = 0; i < this.rowHendoData.hendo.length; i++) {
        if (this.rowHendoData.hendo[i].type == 'meal') {
          edMeal = stMeal;
          for (let m = 0; m < this.rowHendoData.hendo[i].data.length; m++) {
            edMeal++;
          }
          break;
        }
        stMeal++;
      }
      if (edMeal > 0) {
        cellRanges.push(new wjGrid.CellRange(stMeal, 1, edMeal - 1, 2));
      }
    },
    /*******************
     * 列ヘッダ
     */
    createRowHeader() {
      let hendo = this.rowHendoData.hendo;
      let hendoRow = 0;
      let views = [];
      for (let i = 0; i < hendo.length; i++) {
        // 光熱水費がある時
        // 食事がある時、食事の分カラムを追加
        // mergeにカラム数を入れる
        if (hendo[i].type == 'meal' || hendo[i].type == 'shine') {
          for (let m = 0; m < hendo[i].data.length; m++) {
            views.push({
              komoku0: this.rowHendoData.rowColumn.column1,
              komoku1: hendo[i].text,
              komoku3:
                hendo[i].data[m].text + '  @' + hendo[i].data[m].money + '/回',
              merge: hendo[i].merge,
              type: hendo[i].type,
              data: hendo[i].data,
              money: hendo[i].money,
            });
            hendoRow++;
          }
        } else {
          views.push({
            komoku0: this.rowHendoData.rowColumn.column1,
            komoku1: hendo[i].text,
            merge: hendo[i].merge,
            type: hendo[i].type,
          });
          hendoRow++;
        }
      }

      this.viewdata = views;
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
      flexGrid.columns[2].width = '8*';
      flexGrid.columns[3].width = '8*';

      for (let i = 4; i <= this.lastdate + 3; i++) {
        flexGrid.columns[i].width = '2.2*';
        flexGrid.columns[i].minWidth = 24;
      }
      flexGrid.columnHeaders.columns[this.lastdate + 4].width = 34;
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

  div.arrow-box {
    position: absolute;
    top: 3px;
    left: 0;
    width: 100%;
    &.color_red {
      border-top: 1px solid $red;
    }
    &.color_green {
      border-top: 1px solid $green;
    }
  }
  .arrow-start {
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: 0;
    top: 1px;
    text-indent: -9999px;
    &.color_red {
      border-right: 3px solid $red;
    }
    &.color_green {
      border-right: 3px solid $green;
    }
  }
  .arrow-end {
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    position: absolute;
    left: auto;
    right: 0;
    top: 1px;
    text-indent: -9999px;
    &.color_red {
      border-left: 3px solid $red;
    }
    &.color_green {
      border-left: 3px solid $green;
    }
  }

  div.datearea {
    width: 140px;
    height: 26px;
    text-align: left;
    div {
      color: $deepgreen;
      position: absolute;
      background-color: $white;
      border: 1px solid $font_color;
      z-index: 1;
      top: 6px;
      left: 2%;
    }
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