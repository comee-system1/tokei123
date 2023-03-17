<template>
  <div id="kojinRireki">
    <v-container no-gutters fluid class="pa-1">
      <v-row no-gutters>
        <v-col class="leftArea pb-1">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            :dispAddDaicho="false"
            :headerheight="60"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list>
        </v-col>
        <v-col class="ml-1 pa-1 pt-0" style="min-width: 700px">
          <!-- 中央エリア -->
          <v-row no-gutters class="rowStyle_Dark pa-1 pl-0">
            <v-row no-gutters class="rowStyle" style="position: relative">
              <v-card
                class="koumokuTitle titleBlueDark pa-1 mr-1 ml-1"
                outlined
                tile
              >
                利用者名
              </v-card>
              <v-card
                class="koumokuData border mr-1 pb-1 pl-1 pt-0"
                tile
                outlined
                width="200"
              >
                {{ userInfo.names }}
              </v-card>
            </v-row>
          </v-row>

          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle titleMain pa-1 ml-1 mr-1" outlined tile>
              表示期間
            </v-card>
            <v-card
              class="mr-1"
              color="transparent"
              height="100%"
              style="border: none; margin-top: -1px"
              outlined
              tile
            >
              <v-btn
                @click="inputCalendarClick(0)"
                elevation="2"
                tile
                outlined
                width="160px"
                height="100%"
                class="btnymd pa-0"
                >{{ getYmd(0) }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
            <label class="mr-1">～</label>
            <v-card
              class="mr-1"
              color="transparent"
              height="100%"
              style="border: none; margin-top: -1px"
              outlined
              tile
            >
              <v-btn
                @click="inputCalendarClick(1)"
                elevation="2"
                tile
                outlined
                width="160px"
                height="100%"
                class="btnymd"
                >{{ getYmd(1) }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
            <v-btn
              class="mr-1"
              elevation="2"
              height="19"
              @click="inputCalendarClick(2)"
            >
              月指定
            </v-btn>
            <v-btn class="mr-1" height="19" @click="searchclick()">
              <v-icon dense>mdi-magnify</v-icon>
              検索
            </v-btn>
            <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
              詳細表示
            </v-card>
            <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
              <div
                v-for="item in syousaiDispList"
                :key="item.val"
                class="radioInline"
              >
                <input
                  type="radio"
                  :id="'rbkojinrirekisyousaiDisp-' + item.val"
                  v-model="selSyousaiDispUmuIndex"
                  :value="item.val"
                  @change="grdDispChangeclick(item.val)"
                />
                <label
                  :for="'rbkojinrirekisyousaiDisp-' + item.val"
                  class="customRadio mr-2"
                >
                  <span>{{ item.name }}</span>
                </label>
              </div>
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1 ml-1">
            <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
              表示内容
            </v-card>
            <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
              <div
                v-for="item in dispNaiyouList"
                :key="item.val"
                class="radioInline"
              >
                <input
                  type="radio"
                  :id="'rbkojinrirekidispNaiyou-' + item.val"
                  v-model="selDispNaiyouIndex"
                  :value="item.val"
                  @change="grdNaiyouclick(n.val)"
                />
                <label
                  :for="'rbkojinrirekidispNaiyou-' + item.val"
                  class="customRadio mr-2"
                >
                  <span>{{ item.name }}</span>
                </label>
              </div>
            </v-card>
          </v-row>
          <v-row class="mt-1" no-gutters>
            <wj-flex-grid
              id="kojinRirekiIcrnGrid"
              :headersVisibility="'Column'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowMerging="'AllHeaders'"
              :allowResizing="true"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'Row'"
              :isReadOnly="true"
              :alternatingRowStep="0"
              :initialized="onInitializeIcrnGrid"
              :formatItem="onFormatItemIcrn"
              :itemsSourceChanging="onItemsSourceChanging"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewData"
            >
              <wj-flex-grid-filter
                :initialized="filterInitialized"
                :filterApplied="filterApplied"
                :showFilterIcons="false"
              />
            </wj-flex-grid>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="tourokuScreenFlag" width="1140" eager>
        <v-card class="common_dialog pb-1">
          <v-card-title class="dialog_title"> 受付登録 </v-card-title>
          <v-btn
            elevation="2"
            icon
            small
            @click="touroku_dialog_close()"
            class="dialog_close mt-2"
            ><v-icon dark small> mdi-close </v-icon></v-btn
          >
          <UketukeTouroku
            :dispTab="inputRef"
            :selectViewData="viewObj"
            class="ml-1 pb-2"
            ref="uketukeTouroku"
          ></UketukeTouroku>
        </v-card>
      </v-dialog>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="kojinRirekidatepicker1"
        v-model="pickersym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_eym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="kojinRirekidatepicker2"
        v-model="pickereym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(1)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_month"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="kojinRirekidatepickermonth"
        type="month"
        v-model="pickermonth"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(2)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import UserList from '../../components/UserList.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import messageConst from '@/utiles/MessageConst';
import UketukeTouroku from '../../components/UketukeTouroku.vue';
import { getConnect } from '../../connect/getConnect';
import printUtil from '@/utiles/printUtil';
// const STR_MARU = '○';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid black';
// const GRD_FROZEN_ROW = 1;
let JIGYOID = 62;
/*
 * 列
 */
let grdindex = 0;
const COLS = {
  YMD: grdindex++,
  TIME: grdindex++,
  JIGYOKBN: grdindex++,
  SINKI: grdindex++,
  SIENHOUHOU: grdindex++,
  KANKEI: grdindex++,
  SIENKOUMOKU: grdindex++,
  KEIKAKU_NAIYOU: grdindex++,
  YOUSIKI: grdindex++,
  KAIGI: grdindex++,
  SYOUGAISYA: grdindex++,
  SYOUGAIJI: grdindex++,
  CHIIKISOUDAN: grdindex++,
  YOTEI: grdindex++,
  SYUKI: grdindex++,
  MONI_KBN: grdindex++,
  MONI_RIYU: grdindex++,
  MONI_JISSI: grdindex++,
  MONI_WEEK: grdindex++,
  MONI_HENKOU: grdindex++,
  MONI_KOUSIN: grdindex++,
  MONI_KAIGI: grdindex++,
  CHIIKI_NAIYOU: grdindex++,
  CHIIKI_KAIGI: grdindex++,
  CHIIKI_SIEN: grdindex++,
  NAIYOU: grdindex++,
  HOUHOU: grdindex++,
  SIEN_NAIYOU: grdindex++,
  PEER: grdindex++,
  RANK: grdindex++,
  SYOYO: grdindex++,
  KASAN: grdindex++,
  TATNOU: grdindex++,
};
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UserList,
    UketukeTouroku,
  },
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      jigyoKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '相談支援' },
        { val: 2, name: '計画相談' },
        { val: 3, name: '地域相談' },
      ],
      inputList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '基本相談' },
        { val: 2, name: '退院サポート' },
        { val: 3, name: '自立アシスト' },
        { val: 4, name: '連絡調整' },
        { val: 5, name: '計画相談' },
        { val: 6, name: '障害児相談' },
        { val: 7, name: '地域移行' },
        { val: 8, name: '地域定着' },
      ],
      syousaiDispList: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      sienkoumokuUmuList: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      headerList: [
        {
          dispkbn: 0,
          dataname: 'ymdD',
          title: '日付',
          chutitle: '',
          kbntitle: '',
          width: '2.5*',
          align: 'center',
        },
        {
          dispkbn: 1,
          dataname: 'jikan',
          title: '時間',
          chutitle: '',
          kbntitle: '',
          width: '1.5*',
          align: 'center',
        },
        {
          dispkbn: 1,
          dataname: 'sdntiork',
          title: '事\n区',
          chutitle: '',
          kbntitle: '',
          width: '1*',
          align: 'center',
        },
        {
          dispkbn: 1,
          dataname: 'sinki',
          title: '新\n規',
          chutitle: '',
          kbntitle: '',
          width: '1*',
          align: 'center',
        },
        {
          dispkbn: 1,
          dataname: 'sdnhourk',
          title: '支援\n方法',
          chutitle: '',
          kbntitle: '',
          width: '2*',
          align: 'left',
        },
        {
          dispkbn: 1,
          dataname: 'sdnkanrk',
          title: '関係/相談者',
          chutitle: '',
          kbntitle: '',
          width: '4*',
          align: 'left',
        },
        {
          dispkbn: 1,
          dataname: 'sinki',
          title: '支援項目',
          chutitle: '',
          kbntitle: '',
          width: '3*',
          align: 'left',
        },

        {
          dispkbn: 2,
          dataname: 'naiyou',
          dataname2: 'cskmknm',
          title: '内容',
          chutitle: '',
          kbntitle: '計画作成',
          width: '2.5*',
          align: 'left',
        },
        {
          dispkbn: 2,
          dataname: 'keiyoshikidsp',
          title: '様\n式',
          chutitle: '',
          kbntitle: '計画作成',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'keitankaidsp',
          title: '担\n会\n議',
          chutitle: '',
          kbntitle: '計画作成',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'jukyushogaishadsp',
          title: '障\n害\n者',
          chutitle: '',
          kbntitle: '受給者証',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'jukyushogaijidsp',
          title: '障\n害\n児',
          chutitle: '',
          kbntitle: '受給者証',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'jukyuchiikidsp',
          title: '地\n域\n相',
          chutitle: '',
          kbntitle: '受給者証',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'moniyoteiymdsp',
          title: '予\n定\n月',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '1.5*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'monishukidsp',
          title: '終\n期\n月',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'monikbndsp',
          title: '区分',
          chutitle: '中止・延期',
          kbntitle: 'モニタリング',
          width: '1.4*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'moniriyu',
          title: '理由',
          chutitle: '中止・延期',
          kbntitle: 'モニタリング',
          width: '2*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'monijisshidsp',
          title: '実\n施',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'monisyukandsp',
          title: '週\n間',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'monianhenkodsp',
          title: '変\n更',
          chutitle: '案',
          kbntitle: 'モニタリング',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'moniankoshindsp',
          title: '更\n新',
          chutitle: '案',
          kbntitle: 'モニタリング',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 2,
          dataname: 'monitankaidsp',
          title: '担\n会\n議',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '0.8*',
          align: 'center',
        },
        {
          dispkbn: 3,
          dataname: 'sdnhourk',
          title: '内容',
          chutitle: '',
          kbntitle: '地域相談支援',
          width: '3*',
          align: 'left',
        },
        {
          dispkbn: 3,
          dataname: 'sdnhourk',
          title: '担当者\n会議',
          chutitle: '',
          kbntitle: '地域相談支援',
          width: '2*',
          align: 'left',
        },
        {
          dispkbn: 3,
          dataname: 'sdnhourk',
          title: '支\n援',
          chutitle: '',
          kbntitle: '地域相談支援',
          width: '1*',
          align: 'left',
        },
        {
          dispkbn: 1,
          dataname: 'cskmknm',
          title: '内容',
          chutitle: '',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dispkbn: 4,
          dataname: 'shienhouhou',
          title: '方法',
          chutitle: '',
          kbntitle: '支援内容',
          width: '1*',
          align: 'left',
        },
        {
          dispkbn: 4,
          dataname: 'shiennaiyou',
          title: '内容',
          chutitle: '',
          kbntitle: '支援内容',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dispkbn: 1,
          dataname: 'peermark',
          title: 'ピ\nア\nカ',
          chutitle: '',
          kbntitle: '',
          width: '0.7*',
          align: 'center',
        },
        {
          dispkbn: 1,
          dataname: 'ranknm',
          title: 'ラ\nン\nク',
          chutitle: '',
          kbntitle: '',
          width: '0.7*',
          align: 'center',
        },
        {
          dispkbn: 1,
          dataname: 'syoyo',
          title: '所\n要\n時',
          chutitle: '',
          kbntitle: '',
          width: '1*',
          align: 'center',
        },
        {
          dispkbn: 4,
          dataname: 'kasanname',
          title: '加算項目',
          chutitle: '',
          kbntitle: '',
          width: '2*',
          align: 'left',
        },
        {
          dispkbn: 0,
          dataname: 'tanto',
          title: '担当者',
          chutitle: '',
          kbntitle: '',
          width: '1.5*',
          align: 'left',
        },
      ],
      sienKoumokuHeaderList: [
        {
          dataname: 'dainame',
          title: '支援項目',
          width: 100,
          align: 'left',
        },
        {
          dataname: 'chuname',
          title: '支援項目',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'select',
          title: '選',
          width: 40,
          align: 'center',
        },
      ],
      userListComponentDatas: [], // ユーザー一覧データ
      userInfo: {}, // ユーザ一覧から選択した値
      startymd: '',
      endymd: '',
      month: '',
      pickersym: '',
      pickereym: '',
      pickermonth: '',
      datepicker_dialog_sym: false,
      datepicker_dialog_eym: false,
      datepicker_dialog_month: false,
      selJigyoKbn: 0,
      selInputKbn: 0,
      selSyousaiDispUmuIndex: 0,
      selSienkoumokuUmuIndex: 0,
      selDispNaiyouIndex: 0,
      dispNaiyouList: [
        { val: 0, name: '全部', width: 40 },
        { val: 1, name: '計画作成', width: 70 },
        { val: 2, name: 'モニタリング', width: 100 },
        { val: 3, name: '支援内容', width: 70 },
      ],
      viewDataAll: [],
      viewData: [],
      filter: {},
      inputRef: this.getDispKbn(),
      mainGrid: {},
      thickList: [2, 9],
      tourokuScreenFlag: false,
      viewObj: {},
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.$router.app.$off('print_event_global');
    this.$router.app.$on('print_event_global', this.printExec);
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  watch: {
    selectedData() {
      // ここでユーザ検索処理する
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('kojinRirekiIcrnGrid') != null) {
        document.getElementById('kojinRirekiIcrnGrid').style.height =
          window.innerHeight - 140 + 'px';
      }
    },
    filterInitialized: function (filter) {
      this.filter = filter;
    },
    onInitializeIcrnGrid(flexGrid) {
      this.mainGrid = flexGrid;
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filter.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filter.showFilterIcons = false;
      });

      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          this.tourokuScreenFlag = true;
          this.setDispdata(tmpitem);
        }
      });

      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];

        if (this.inputRef == sysConst.JIGYO_KBN_NAME.KEIKAKU) {
          if (
            this.headerList[colIndex].dispkbn == 1 ||
            this.headerList[colIndex].dispkbn == 3
          ) {
            col.visible = false;
          }
        } else if (this.inputRef == sysConst.JIGYO_KBN_NAME.CHIIKI) {
          if (
            this.headerList[colIndex].dispkbn == 1 ||
            this.headerList[colIndex].dispkbn == 2
          ) {
            col.visible = false;
          }
        } else {
          if (
            this.headerList[colIndex].dispkbn == 2 ||
            this.headerList[colIndex].dispkbn == 3 ||
            this.headerList[colIndex].dispkbn == 4
          ) {
            col.visible = false;
          }
        }

        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.allowResizing = true;

        // if (colIndex == 0) {
        //   col.format = sysConst.FORMAT.Ymd;
        // }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.headerList[colIndex].kbntitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          !this.headerList[colIndex].chutitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].chutitle
        );
        flexGrid.columnHeaders.setCellData(
          2,
          colIndex,
          this.headerList[colIndex].title
        );
      }
      flexGrid.endUpdate();
    },
    onFormatItemIcrn(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      // if (
      //   e.panel == flexGrid.columnHeaders &&
      //   ((e.row == 0 && e.col == 0) ||
      //     (e.row == 0 && e.col == 1) ||
      //     (e.row == 0 && e.col == 4) ||
      //     (e.row == 0 && e.col == 5) ||
      //     (e.row == 0 && e.col == 31))
      // ) {
      //   e.cell.style.borderBottom = 'None';
      // }
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.borderRight = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (this.selSyousaiDispUmuIndex == 1) {
          if (this.inputRef == sysConst.JIGYO_KBN_NAME.KIHON) {
            if (e.col == COLS.NAIYOU) {
              e.cell.innerHTML =
                '<font color="#276bc5"><' +
                wjCore.escapeHtml(tmpitem.cskmknm) +
                '></font>' +
                '<div>' +
                wjCore.escapeHtml(tmpitem.naiyo) +
                '</div>';
            }
          }
        }
        if (e.col == COLS.KANKEI) {
          if (tmpitem.sdnkanid != 2) {
            e.cell.innerHTML =
              wjCore.escapeHtml(e.cell.innerHTML) +
              ' ' +
              wjCore.escapeHtml(tmpitem.sdnnam);
            if (tmpitem.sdnnam1Kankei != undefined) {
              e.cell.innerHTML +=
                '<br/>' +
                wjCore.escapeHtml(tmpitem.sdnnam1Kankei) +
                ' ' +
                wjCore.escapeHtml(tmpitem.sdnnam1);
            }
            if (tmpitem.sdnnam2Kankei != undefined) {
              e.cell.innerHTML +=
                '<br/>' +
                wjCore.escapeHtml(tmpitem.sdnnam2Kankei) +
                ' ' +
                wjCore.escapeHtml(tmpitem.sdnnam2);
            }
            if (tmpitem.sdnnam3Kankei != undefined) {
              e.cell.innerHTML +=
                '<br/>' +
                wjCore.escapeHtml(tmpitem.sdnnam3Kankei) +
                ' ' +
                wjCore.escapeHtml(tmpitem.sdnnam3);
            }
          }
        }

        if (
          e.col == 0 ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KIHON &&
            e.col == COLS.SINKI) ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KIHON &&
            e.col == COLS.SIENKOUMOKU) ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KIHON &&
            e.col == COLS.MONI_KBN) ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KIHON &&
            e.col == COLS.MONI_JISSI) ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KEIKAKU &&
            e.col == COLS.KAIGI) ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KEIKAKU &&
            e.col == COLS.CHIIKISOUDAN) ||
          (this.inputRef == sysConst.JIGYO_KBN_NAME.KEIKAKU &&
            e.col == COLS.MONI_KAIGI)
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }

        if (e.row < flexGrid.rows.length - 1) {
          let tmpitempre = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.ymd.substring(0, 6) != tmpitempre.ymd.substring(0, 6)) {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          }
        }
      } else {
        if (this.inputRef == sysConst.JIGYO_KBN_NAME.KEIKAKU) {
          if (COLS.KEIKAKU_NAIYOU <= e.col && e.col <= COLS.CHIIKISOUDAN) {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundGreen;
          } else if (COLS.YOTEI <= e.col && e.col <= COLS.MONI_KAIGI) {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundBlue;
          } else {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundOrange;
          }
        } else if (this.inputRef == sysConst.JIGYO_KBN_NAME.CHIIKI) {
          if (COLS.CHIIKI_NAIYOU <= e.col && e.col <= COLS.CHIIKI_SIEN) {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundGreen;
          } else {
            e.cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundOrange;
          }
        } else {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        }
        // if (e.col < 1) {
        //   e.cell.style.backgroundColor =
        //     sysConst.COLOR.viewTitleBackgroundOrange;
        // } else if (e.col < 7) {
        //   e.cell.style.backgroundColor =
        //     sysConst.COLOR.viewTitleBackgroundGreen;
        // } else if (e.col < 16) {
        //   e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        // } else if (e.col < 19) {
        //   e.cell.style.backgroundColor =
        //     sysConst.COLOR.viewTitleBackgroundGreen;
        // } else {
        //   e.cell.style.backgroundColor =
        //     sysConst.COLOR.viewTitleBackgroundOrange;
        // }
        if (
          (e.row == 0 && e.col == COLS.YMD) ||
          (e.row == 0 && e.col == COLS.KEIKAKU_NAIYOU) ||
          (e.row == 0 && e.col == COLS.SYOUGAISYA) ||
          (e.row == 0 && e.col == COLS.YOTEI) ||
          (e.row == 0 && e.col == COLS.CHIIKI_NAIYOU) ||
          (e.row == 1 && e.col == COLS.KAIGI) ||
          (e.row == 1 && e.col == COLS.CHIIKISOUDAN) ||
          (e.row == 1 && e.col == COLS.MONI_KAIGI) ||
          (e.row == 1 && e.col == COLS.CHIIKI_SIEN)
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
        // if (e.col == 1 || e.col == 3 || e.col == 5 || e.col == 9) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // } else if (e.row == 0 && (e.col == 2 || e.col == 6)) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // }
      }
    },

    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      if (flexGrid.columns.length > 0) {
        if (this.selSyousaiDispUmuIndex == 1) {
          flexGrid.columns[COLS.SINKI].binding = this.headerList[16].dataname;
        } else {
          flexGrid.columns[COLS.SINKI].binding = this.headerList[16].dataname2;
        }
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      this.grdAutoSizeRow(flexGrid);
    },
    filterApplied(e) {
      this.grdAutoSizeRow(e.grid);
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    grdDispChangeclick(kbn) {
      this.selSyousaiDispUmuIndex = kbn;
      this.setViewData(false);
    },
    grdNaiyouclick(kbn) {
      this.selDispNaiyouIndex = kbn;
      this.setViewData(false);
    },
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userInfo = row;
      this.setViewData(true);
    },
    searchclick() {
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (!this.userInfo.riid || this.userInfo.riid == 0) {
        alert('利用者' + messageConst.INPUT_ERROR.NO_SELECT);
        return;
      }
      if (isAll) {
        if (this.inputRef == sysConst.JIGYO_KBN_NAME.KIHON) {
          let params = {
            pJigyoid: JIGYOID,
            pIntcode: this.userInfo.riid,
            pSymd: this.startymd.format('YYYYMMDD'),
            pEymd: this.endymd.format('YYYYMMDD'),
            pHostName: 1,
          };
          getConnect('/Uktk', params, 'SIENT')
            .then((result) => {
              this.viewDataAll = result;
              this.userFilter();
              this.screenFlag = false;
            })
            .catch(function (error) {
              alert(
                messageConst.ERROR.ERROR +
                  '[' +
                  error.response.data.message +
                  ']'
              );
            });
        } else if (this.inputRef == sysConst.JIGYO_KBN_NAME.KEIKAKU) {
          let params = {
            pJigyoid: JIGYOID,
            pIntcode: this.userInfo.riid,
            pSrhym: this.startymd.format('YYYYMM'),
            pSrheym: this.endymd.format('YYYYMM'),
            pHostName: 1,
          };
          getConnect('/Kojinrireki', params, 'SIENT')
            .then((result) => {
              this.viewDataAll = result;
              this.userFilter();
              this.screenFlag = false;
            })
            .catch(function (error) {
              alert(
                messageConst.ERROR.ERROR +
                  '[' +
                  error.response.data.message +
                  ']'
              );
            });
        } else if (this.inputRef == sysConst.JIGYO_KBN_NAME.CHIIKI) {
          let params = {
            pJigyoid: JIGYOID,
            pIntcode: this.userInfo.riid,
            pSym: this.startymd.format('YYYYMM'),
            pEym: this.endymd.format('YYYYMM'),
            pSrcType: 0,
            pHostName: 1,
          };
          getConnect('/ChikiKojinrireki', params, 'SIENC')
            .then((result) => {
              this.viewDataAll = result;
              this.userFilter();
              this.screenFlag = false;
            })
            .catch(function (error) {
              alert(
                messageConst.ERROR.ERROR +
                  '[' +
                  error.response.data.message +
                  ']'
              );
            });
        }
      } else {
        this.userFilter();
      }
    },
    userFilter() {
      let tmpviewdata = this.viewDataAll.concat();
      // // 絞込１
      // if (this.selUser == 1) {
      //   // 今月入所
      //   tmpviewdata = tmpviewdata.filter((x) => x.isnyusho);
      // } else if (this.selUser == 2) {
      //   // 今月退所
      //   tmpviewdata = tmpviewdata.filter((x) => x.istaisyo);
      // }
      // // 絞込２
      // if (siborikomiSearch2 == 1) {
      //   // !x.koufuymdで空orNullを判定する
      //   tmpviewdata = tmpviewdata.filter(
      //     (x) =>
      //       !x.koufuymd ||
      //       !x.engo ||
      //       !x.jitibangou ||
      //       !x.jyukyukbn ||
      //       !x.jyukyuname ||
      //       !x.syougaisyu ||
      //       !x.syougaisienkbn ||
      //       !x.futanjyougen ||
      //       !x.jyougenkanri ||
      //       !x.syokujiteikyo ||
      //       !x.tokubetukyufu
      //   );
      // } else if (siborikomiSearch2 == 2) {
      //   tmpviewdata = tmpviewdata.concat();
      // }

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
      this.viewData = tmpviewdata;
    },
    getYmd(outputkbn) {
      if (outputkbn == 0) {
        if (!this.startymd) {
          this.startymd = dayjs().subtract(11, 'M').startOf('months');
        }
        return (
          this.startymd.format('YYYY') +
          '年' +
          this.startymd.format('MM') +
          '月' +
          this.startymd.format('DD') +
          '日'
        );
      } else {
        if (!this.endymd) {
          this.endymd = dayjs().endOf('months');
        }
        return (
          this.endymd.format('YYYY') +
          '年' +
          this.endymd.format('MM') +
          '月' +
          this.endymd.format('DD') +
          '日'
        );
      }
    },
    inputCalendarClick(kbn) {
      if (kbn == 0) {
        this.pickersym =
          this.startymd.format('YYYY') +
          '-' +
          this.startymd.format('MM') +
          '-' +
          this.startymd.format('DD');
        this.datepicker_dialog_sym = true;
      } else if (kbn == 1) {
        this.pickereym =
          this.endymd.format('YYYY') +
          '-' +
          this.endymd.format('MM') +
          '-' +
          this.endymd.format('DD');
        this.datepicker_dialog_eym = true;
      } else if (kbn == 2) {
        if (!this.month) {
          this.month = dayjs().startOf('months');
        }
        this.pickermonth =
          this.month.format('YYYY') +
          '-' +
          this.month.format('MM') +
          '-' +
          this.month.format('DD');
        this.datepicker_dialog_month = true;
      }
    },
    calenderSelect(kbn) {
      if (kbn == 0) {
        this.startymd = dayjs(this.pickersym);
        this.datepicker_dialog_sym = false;
      } else if (kbn == 1) {
        this.endymd = dayjs(this.pickereym);
        this.datepicker_dialog_eym = false;
      } else if (kbn == 2) {
        let tmp = dayjs(this.pickermonth);
        this.startymd = dayjs(tmp);
        this.endymd = dayjs(tmp.endOf('months'));
        this.datepicker_dialog_month = false;
      }
    },
    filterClrclick() {
      this.filter.clear();
    },
    getDispKbn() {
      this.inputRef = sysConst.JIGYO_KBN_NAME.KIHON;
      if (this.$route.params.kind == sysConst.JIGYO_KBN_NAME.KEIKAKU) {
        this.inputRef = sysConst.JIGYO_KBN_NAME.KEIKAKU;
      } else if (this.$route.params.kind == sysConst.JIGYO_KBN_NAME.CHIIKI) {
        this.inputRef = sysConst.JIGYO_KBN_NAME.CHIIKI;
      }
      return this.inputRef;
    },
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
      if (this.$refs.uketukeTouroku.getEditflg()) {
        // データ読込
        this.setViewData(true);
      }
    },
    setDispdata(tmpitem) {
      if (this.inputRef != sysConst.JIGYO_KBN_NAME.KIHON) {
        tmpitem.intcode = this.userInfo.riid;
        tmpitem.rname = this.userInfo.names;
        tmpitem.riyocode = Number(this.userInfo.riyocode);
        tmpitem.riyocodeD = this.userInfo.riyocode;
      }
      this.viewObj = tmpitem;
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      printUtil.printExec('相談一覧', printUtil.DIRECTION.landscape);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#kojinRireki {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
    height: 100%;
  }

  #kojinRirekiIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    height: 80vh;
    width: 100%;
    min-width: 1030px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    min-height: 450px;
    &.wj-flexgrid [wj-part='root'] {
      overflow-y: scroll !important;
      overflow-x: hidden !important;
    }
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
      height: 10px;
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }
}

#kojinRirekidatepickermonth,
#kojinRirekidatepicker1,
#kojinRirekidatepicker2 {
  position: absolute;
  margin-top: 40px;

  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }
}
#kojinRirekidatepickermonth {
  position: fixed !important;
  top: 70px;
  left: 750px;
}
#kojinRirekidatepicker1 {
  position: fixed !important;
  top: 70px;
  left: 400px;
}
#kojinRirekidatepicker2 {
  position: fixed !important;
  top: 70px;
  left: 600px;
}
</style>
