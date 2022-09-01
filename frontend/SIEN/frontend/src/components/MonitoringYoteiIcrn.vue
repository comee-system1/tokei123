<template>
  <div id="monitoringYotei">
    <v-container class="mt-1 ml-1 pa-0" style="max-width: 100%" fluid>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile> 表示月 </v-card>
        <v-card
          class="ml-1"
          color="transparent"
          height="100%"
          style="border: none"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(0)"
            tile
            outlined
            width="125px"
            height="100%"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="0"
            class="pa-0 ml-1"
            height="100%"
            x-small
            tile
            @click="inputCalendarClick(1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            class="pa-0 ml-1"
            height="100%"
            x-small
            tile
            @click="inputCalendarClick(2)"
          >
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-card>
        <v-btn class="itemBtn ml-1" :loading="loading" @click="searchClicked()">
          検索
        </v-btn>
        <v-btn
          class="itemBtn ml-1"
          style="width: 25px"
          @click="filterClrclick()"
        >
          <v-icon small>mdi-filter-off</v-icon>
        </v-btn>
        <!-- <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          ○：予定 ☆：予定外 ●★：報告書完了 延：延期 止：中止 終：終期月
          中：中途月更新 廃：ｻｰﾋﾞｽ廃止
        </v-card> -->
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle pa-1" outlined tile> 担当者 </v-card>
        <wj-menu
          id="comboFilters"
          class="customCombobox ml-1"
          :itemsSource="tantousyaList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selTantousya"
          :itemClicked="onTantousyaClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 対象者 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="taisyousyaIndex"
          mandatory
        >
          <v-btn
            v-for="n in taisyousyaList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="taisyousyaClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="taisyousyaYoteiIndex"
          multiple
          v-if="taisyousyaIndex == 1"
        >
          <v-btn
            v-for="n in taisyousyaYoteiList"
            :key="n.val"
            small
            color="primary  "
            dark
            outlined
            @click="taisyousyaClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle pa-1" outlined tile> 市区町村 </v-card>
        <wj-menu
          id="comboFiltersSikuchoson"
          class="customCombobox ml-1"
          :itemsSource="sikuchosonList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selSikuchoson"
          :itemClicked="onSikuchosonClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 絞込 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="siborikomiIndex"
          mandatory
        >
          <v-btn
            v-for="n in siborikomiList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="siborikomiClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-layout class="right">
          <v-tooltip bottom color="primary" min-width="150" style="z-index: 10">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="itemBtn ml-1"
                v-bind="attrs"
                v-on="on"
                :ripple="false"
              >
                記号説明
              </v-btn>
            </template>
            <v-layout wrap v-for="hanrei in hanreiList" :key="hanrei.val">
              {{ hanrei.name }}
            </v-layout>
            <v-layout>
              <span style="background: pink">&emsp;</span>
              ：未実施
            </v-layout>
          </v-tooltip>
        </v-layout>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          <span class="miman mr-1" style="width: 80px">18歳未満</span>
        </v-card>
        <!-- <div
          style="height: 100%; display: flex; position: relative; left: 340px"
        > -->
        <v-layout class="right">
          <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 入力 </v-card>
          <v-btn-toggle class="flex-wrap ml-1" color="primary">
            <v-btn
              v-for="n in inputList"
              :key="n.val"
              small
              color="secondary"
              dark
              outlined
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-layout>
      </v-row>
      <v-layout class="ma-0 mt-1 mr-1" no-gutters style="width: 100%">
        <wj-flex-grid
          id="monitoringYoteiGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Cell'"
          :isReadOnly="true"
          :initialized="onInitializekeikakuIcrnGrid"
          :formatItem="onFormatItemkeikakuIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatakeikaku"
        >
          <wj-flex-grid-filter :initialized="filterInitializedkeikakuIcrn" />
        </wj-flex-grid>
      </v-layout>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringYoteiDatepicker"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-overlay class="text-center" id="load_dialog" v-show="screenFlag">
      <v-progress-circular
        v-show="screenFlag"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '@connect/getConnect';
const GRID_ID = {
  Keikaku: 'monitoringYoteiGrid',
};
export default {
  components: { AlphabetButton },
  data() {
    return {
      keikakuIcrnHeaderList: [
        {
          dataname: 'rcodeD',
          title: 'コード',
          kbntitle: '',
          width: '3*',
          minwidth: 50,
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          kbntitle: '',
          width: '5*',
          minwidth: 150,
          align: 'left',
        },
        {
          dataname: 'age',
          title: '年\n齢',
          kbntitle: '',
          width: '2*',
          minwidth: 20,
          align: 'right',
        },
        {
          dataname: 'birthMonth',
          title: '誕\n生\n月',
          kbntitle: '',
          width: '2*',
          minwidth: 20,
          align: 'right',
        },
        {
          dataname: 'shichoName',
          title: '市区\n町村',
          kbntitle: '',
          width: '2*',
          minwidth: 80,
          align: 'left',
        },
        {
          dataname: 'keikakuYmdFmt',
          title: '作成日',
          kbntitle: 'サービス等利用計画作成',
          width: '2*',
          minwidth: 80,
          align: 'center',
        },
        {
          dataname: 'yousiki',
          title: '様式',
          kbntitle: 'サービス等利用計画作成',
          width: '2*',
          minwidth: 20,
          align: 'center',
        },
        {
          dataname: 'keikakuSinm',
          title: '担当者',
          kbntitle: 'サービス等利用計画作成',
          width: '2*',
          minwidth: 100,
          align: 'left',
        },
        {
          dataname: 'mymdFmt',
          title: '開始日',
          kbntitle: 'モニタリング期間',
          width: '2*',
          minwidth: 80,
          align: 'center',
        },
        {
          dataname: 'sikyuEymd',
          title: '終了日',
          kbntitle: 'モニタリング期間',
          width: '2*',
          minwidth: 80,
          align: 'center',
        },
        {
          dataname: 'moniKikan',
          title: '期間',
          kbntitle: 'モニタリング期間',
          width: '1.5*',
          minwidth: 50,
          align: 'right',
        },
        {
          dataname: 'ym1',
          title: '1',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym2',
          title: '2',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym3',
          title: '3',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym4',
          title: '4',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym5',
          title: '5',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym6',
          title: '6',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym7',
          title: '7',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym8',
          title: '8',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym9',
          title: '9',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym10',
          title: '10',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym11',
          title: '11',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym12',
          title: '12',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym13',
          title: '13',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym14',
          title: '14',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym15',
          title: '15',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym16',
          title: '16',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym17',
          title: '17',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym18',
          title: '18',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym19',
          title: '19',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
      ],
      viewdatakeikakuAll: [],
      viewdatakeikaku: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      tourokuScreenFlag: false,
      filterkeikakuIcrn: {},
      targetYmd: '',
      dispYmList: [],
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      selTantousya: 0,
      taisyousyaList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月対象者' },
      ],
      taisyousyaYoteiList: [
        { val: 1, name: '通常月' },
        { val: 2, name: '終期月' },
        { val: 3, name: '予定外' },
        { val: 4, name: '翌月終期月' },
      ],
      taisyousyaIndex: 1,
      taisyousyaYoteiIndex: [0, 1, 2, 3],
      selSikuchoson: 0,
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
      ],
      siborikomiIndex: 0,
      siborikomiList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '実施済' },
        { val: 2, name: '未実施' },
        { val: 3, name: '延期者' },
        { val: 4, name: '中止者' },
      ],
      inputList: [
        { val: 1, name: '中止・延期' },
        { val: 2, name: '予定外追加' },
        { val: 3, name: '未実施案作成' },
      ],
      loading: false,
      addStatus: false,
      mainFlexGrid: [],
      subFlexGrid: [],
      hanreiList: [
        { val: 0, name: '○：予定' },
        { val: 1, name: '☆：予定外' },
        { val: 2, name: '●★：報告書完了' },
        { val: 3, name: '延：延期' },
        { val: 4, name: '止：中止' },
        { val: 5, name: '更：終期月更新' },
        { val: 6, name: '変：サービス終了' },
        { val: 7, name: '―：予定なし' },
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById(GRID_ID.Keikaku) != null) {
        document.getElementById(GRID_ID.Keikaku).style.height =
          window.innerHeight - 220 + 'px';
      }
    },
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitializedkeikakuIcrn: function (filter) {
      this.filterkeikakuIcrn = filter;
      let fil = [];
      for (let colIndex = 0; colIndex < 11; colIndex++) {
        fil.push(this.keikakuIcrnHeaderList[colIndex].dataname);
      }
      filter.filterColumns = fil;
    },
    onInitializekeikakuIcrnGrid(flexGrid) {
      this.mainFlexGrid = flexGrid;
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = false;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header / 2;
      flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
      flexGrid.frozenColumns = 11;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.keikakuIcrnHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.keikakuIcrnHeaderList[colIndex].dataname;
        col.name = this.keikakuIcrnHeaderList[colIndex].dataname;
        col.header = this.keikakuIcrnHeaderList[colIndex].title;
        col.width = this.keikakuIcrnHeaderList[colIndex].width;
        col.minWidth = this.keikakuIcrnHeaderList[colIndex].minwidth;
        col.align = this.keikakuIcrnHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.allowResizing = true;
        // if (colIndex == 2) {
        //   col.allowResizing = true;
        // } else {
        //   col.allowResizing = false;
        // }
        // if (colIndex == 5 || colIndex == 6 || colIndex == 8) {
        //   col.format = sysConst.FORMAT.Ymd;
        // }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.keikakuIcrnHeaderList[colIndex].kbntitle
            ? this.keikakuIcrnHeaderList[colIndex].title
            : this.keikakuIcrnHeaderList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.keikakuIcrnHeaderList[colIndex].title
        );
        if (colIndex < 11) {
          flexGrid.columnFooters.setCellData(
            0,
            colIndex,
            'モニタリング予定件数'
          );
        }
        flexGrid.columnHeaders.setCellData(2, colIndex, ' ');
      }
      this.setKeikakuYm(flexGrid);
      flexGrid.endUpdate();
    },

    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      this.setKeikakuYm(flexGrid);
      flexGrid.endUpdate();
    },
    setKeikakuYm(flexGrid) {
      if (flexGrid.columnHeaders.columns.length > 0) {
        if (this.kikanYm) {
          let tmpmom = new dayjs(
            this.kikanYm.format('YYYY') +
              '-' +
              this.kikanYm.format('MM') +
              '-' +
              this.kikanYm.format('DD')
          ).subtract(1, 'years');
          if (
            this.dispYmList.length > 0 &&
            this.dispYmList[0] == tmpmom.format('YYYY') + tmpmom.format('MM')
          ) {
            return;
          }
          this.dispYmList = [];
          let index = 0;
          for (
            let colIndex = 11;
            colIndex < flexGrid.columns.length;
            colIndex++
          ) {
            this.dispYmList[index] =
              tmpmom.format('YYYY') + tmpmom.format('MM');
            flexGrid.columnHeaders.setCellData(
              0,
              colIndex,
              tmpmom.format('YYYY年')
            );
            flexGrid.columnHeaders.setCellData(
              1,
              colIndex,
              tmpmom.format('M月')
            );
            tmpmom = tmpmom.add(1, 'months');
            index++;
          }
        }
      }
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      this.screenFlag = false;
      this.loading = false;
    },
    setNonFilterCol(col) {
      var Nonefilter = this.filterkeikakuIcrn.getColumnFilter(col);
      Nonefilter.filterType = 'None';
    },
    onFormatItemkeikakuIcrn(flexGrid, e) {
      e.cell.style.borderTop = '';
      e.cell.style.borderBottom = '';
      e.cell.style.borderRight = '';
      e.cell.style.color = '';
      e.cell.style.backgroundColor = '';

      if (e.panel == flexGrid.columnHeaders) {
        if (e.row == 1 || (e.row == 0 && e.col <= 4)) {
          e.cell.style.borderBottom = 'None';
        }
        if (e.row == 0 && e.col == 8) {
          e.cell.style.borderRight = '1px solid';
        }
        if (e.row >= 1 && e.col == 10) {
          e.cell.style.borderRight = '1px solid';
        }
        if (e.row == 0 && e.col >= 11) {
          e.cell.style.borderRight = '1px solid';
        }
        // 12月の次の右線を太くする
        if (e.col > 11 && e.row >= 1) {
          let tmpym = this.dispYmList[e.col - 11];
          if (Number(tmpym.substring(4, 6)) == 12) {
            e.cell.style.borderRight = '1px solid';
          }
          if (e.panel == flexGrid.cells) {
            let tmpitem = e.panel.rows[e.row].dataItem;
            let ymdval =
              tmpitem.sikyuEymdBk.getFullYear() +
              (tmpitem.sikyuEymdBk.getMonth() + 1).toString().padStart(2, '0');
            if (Number(tmpym) > Number(ymdval)) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
            }
          }
        }
      }
      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (tmpitem.agebk < 18) {
          if (e.col == 1 && tmpitem.isfirst) {
            wjCore.addClass(e.cell, 'miman');
          }
          // if (tmpitem.agebk == 17 && 11 <= e.col && e.col <= 29) {
          //   let tmpym = this.dispYmList[e.col - 11];
          //   if (Number(tmpym.substring(4, 6)) == tmpitem.birthMonthbk - 1) {
          //     e.cell.style.backgroundColor = STYLE_BG_PREBIRTH;
          //   }
          // }
        }

        // 下の行と同じ利用者の場合は下線を非表示化
        if (e.row < flexGrid.rows.length - 1 && e.col < 11) {
          let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.intcode == tmpNextitem.intcode) {
            e.cell.style.borderBottom = 0;
          }
        }
        if (e.row > 0) {
          let pretmpitem = e.panel.rows[e.row - 1].dataItem;
          if (tmpitem.intcode == pretmpitem.intcode) {
            if (e.col < 11) {
              e.cell.style.color = 'transparent';
            }
            e.cell.style.borderRight = '';
            e.cell.style.borderBottom = 0;
          } else {
            e.cell.style.borderTop = '1px solid';
          }
        }
      } else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        // e.cell.style.borderBottom = 0;
      }
      if (e.panel != flexGrid.columnHeaders) {
        if (e.col == 10) {
          e.cell.style.borderRight = '1px solid black ';
        }
        if (e.col > 10) {
          let tmpym = this.dispYmList[e.col - 11];
          if (Number(tmpym.substring(4, 6)) == 12) {
            e.cell.style.borderRight = '1px solid';
          }
        }
      }
    },
    onTantousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
      let rc = this.mainFlexGrid.columnHeaders.getCellBoundingRect(
        0,
        this.mainFlexGrid.columns.length - 1,
        true
      );
      this.mainFlexGrid.scrollPosition = new wjCore.Point(-rc.right, 0);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pSym: this.kikanYm.format('YYYYMM'),
        };
        getConnect('/moniYoteiView', params).then((result) => {
          this.viewdatakeikakuAll = this.createViewData(result);
          this.userFilter();
        });
      } else {
        this.userFilter();
      }
    },
    createViewData(apires) {
      let result = [];
      apires.forEach((el) => {
        let obj1 = Vue.util.extend({}, el);
        obj1.rcode = String(el.rcode);
        obj1.rcodeD = obj1.rcode.padStart(7, '0');
        obj1.birthMonth = el.birth.substring(4, 6);
        obj1.mymdFmt = this.getFmtDate(el.mymd);
        obj1.keikakuYmdFmt = this.getFmtDate(el.keikakuYmd);
        let obj2 = Vue.util.extend({}, obj1);

        let index = 1;
        this.dispYmList.forEach((el) => {
          let tmpym = obj1.moniYoteiList.filter(function (yotei) {
            return yotei.ym == el;
          });

          if (tmpym.length > 0) {
            obj1['ym' + index] = tmpym[0].kigo;
            obj2['ym' + index] = tmpym[0].kigo2;
          }
          index++;
        });
        result.push(obj1);
        result.push(obj2);
      });
      return result;
    },
    getFmtDate(ymd) {
      if (ymd.trim().length > 0) {
        return new Date(
          ymd.substring(0, 4),
          Number(ymd.substring(4, 6)) - 1,
          ymd.substring(6, 8)
        );
      } else {
        return '';
      }
    },
    onAlphabetical() {
      this.userFilter();
    },
    siborikomiClicked() {
      this.userFilter();
    },
    taisyousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    onSikuchosonClicked(s) {
      this.selJigyoKbn = this.selectCmb(s);
    },
    selectCmb(s) {
      s.header = s.selectedItem.name;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
      return s.selectedValue;
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdatakeikakuAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');
      // //コード順でソート
      // if (this.sortSearch == 0) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.id < b.id) {
      //       return -1;
      //     }
      //     if (a.id > b.id) {
      //       return 1;
      //     }
      //     // 二次キーは交付日
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //利用者名でソート
      // if (this.sortSearch == 1) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.kana < b.kana) {
      //       return -1;
      //     }
      //     if (a.kana > b.kana) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //受給者番号でソート
      // if (this.sortSearch == 2) {
      //   tmpviewdata.sort((a, b) => {
      //     if (a.nobk < b.nobk) {
      //       return -1;
      //     }
      //     if (a.nobk > b.nobk) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      this.viewdatakeikaku = tmpviewdata;
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = dayjs().startOf('months');
        this.picker = this.kikanYm.year() + '-' + this.kikanYm.format('MM');
      }
      return (
        this.kikanYm.format('YYYY') + '年' + this.kikanYm.format('MM') + '月'
      );
    },
    inputCalendarClick(kbn) {
      if (kbn == 1) {
        this.kikanYm = this.kikanYm.subtract(1, 'months');
      } else if (kbn == 2) {
        this.kikanYm = this.kikanYm.add(1, 'months');
      }
      this.picker =
        this.kikanYm.format('YYYY') +
        '-' +
        this.kikanYm.format('MM') +
        '-' +
        this.kikanYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog = true;
      } else {
        this.viewdatakeikaku = [];
      }
    },
    monthSelect() {
      this.kikanYm = moment(this.picker);
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },
    filterClrclick() {
      this.filterkeikakuIcrn.clear();
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#monitoringYotei {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .rowStyle {
    height: 20px;
  }

  #load_dialog {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.46;
    background-color: rgb(33, 33, 33);
    border-color: rgb(33, 33, 33);
    width: 100%;
    height: 100%;
    z-index: 4;
    padding: 0;
    margin: 0;
  }

  .ymd,
  .v-btn:not(.addbtn, .itemBtn) {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .hosokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    border: none;
    > .premonth {
      background: #ffcccc;
    }
  }

  .itemBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
    width: 75px;
  }

  .haikei {
    background-repeat: repeat;
  }

  #monitoringYoteiGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
      line-height: 110%;
    }
    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
    .wj-cell {
      padding: 2px;
    }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
    }
    .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
      transition: all 0s;
      background: $grid_hover_background;
    }

    .wj-cells .wj-cell.wj-state-multi-selected {
      background: $grid_selected_background;
      color: $grid_selected_color;
    }

    .wj-cells .wj-cell.wj-state-selected {
      background: $grid_selected_background;
      color: $grid_selected_color;
    }
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
    .wj-filter-on {
      color: blue;
      border-color: lightgray;
    }
  }

  div#monitoringYoteiGrid {
    width: 98%;
    // min-width: 1250px;
    height: 70vh;
    min-height: 400px;
    z-index: 2;
  }
  .v-btn-toggle > .v-btn {
    // width: 150px;
    height: 20px;
  }
  div.customCombobox {
    position: relative;
    width: 125px !important;
    height: 20px !important;
    &.customCombobox {
      width: 160px !important;
      div {
        text-align: left;
      }
    }
    &#comboFiltersKasan {
      width: 250px !important;
    }
    .wj-btn.wj-btn-default {
      border-left: none !important;
    }
    &:hover {
      background-color: #e1e1e1;
    }
    &:focus {
      background-color: #fff;
    }
    div * {
      height: 17px !important;
      // padding: 0;
      span {
        // height: 21px !important;
        margin-top: 5px;
      }
      &.wj-form-control {
        position: absolute;
        top: -5px;
        width: 100%;
      }
    }
    input {
      height: 20px !important;
    }
  }
  .v-input--selection-controls .v-input__slot > .v-label {
    font-size: 14px;
  }
  .miman {
    padding: 0;
    position: relative;
    width: auto;
    height: 20px;
    background: $grid_background;
  }
  .miman::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 10px solid green;
    border-left: 10px solid transparent;
  }
  .right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
  }
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#monitoringYoteiDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 70px;
  width: 300px;
  max-width: 300px;

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(7)
    .v-btn__content {
    color: blue;
  }

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(1)
    .v-btn__content {
    color: red;
  }
}

// .touroku_dialogs {
//   min-width: 1070px;
// }
// .v-btn--absolute.v-btn--top,
// .v-btn--fixed.v-btn--top {
//   z-index: 100;
//   top: 0px;
//   right: 5px;
//   background-color: $white;
// }
// .v-dialog {
//   overflow: hidden;
//   margin: 0;
// }
</style>
