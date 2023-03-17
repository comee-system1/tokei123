<template>
  <div id="uketukeCheckList">
    <v-container no-gutters fluid class="container pa-1">
      <v-row no-gutters class="rowStyle">
        <v-card class="koumokuTitle titleMain pa-1" outlined tile>
          表示期間
        </v-card>
        <v-card
          class="ml-1"
          color="transparent"
          height="100%"
          style="border: none; margin-top: -1px"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(0)"
            tile
            outlined
            elevation="2"
            width="160px"
            height="100%"
            class="btnymd"
            >{{ getYmd(0) }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <label class="ml-1 mr-1">～</label>
        <v-card
          color="transparent"
          height="100%"
          style="border: none; margin-top: -1px"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(1)"
            tile
            outlined
            elevation="2"
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
          class="ml-1"
          elevation="2"
          height="19"
          @click="inputCalendarClick(2)"
        >
          月指定
        </v-btn>
        <v-btn class="ml-1" height="19" @click="searchclick()">
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          入力区分
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selInputKbn"
          @change="onInputClicked"
          style="width: 150px"
        >
          <option v-for="val in inputList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          市区町村
        </v-card>
        <select
          class="customSelectBox wShort mr-1"
          v-model="selSikuchoson"
          @change="onSikuchosonClicked"
        >
          <option v-for="val in sikuchosonList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          担当者
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selTantousya"
          @change="onTantousyaClicked"
          style="width: 150px"
        >
          <option v-for="val in tantousyaList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1" style="position: relative">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          ソート
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div
            v-for="item in sort1List"
            :key="'rbUketukeCheckSort1-' + item.val"
            class="radioInline"
            style="width: 70px"
          >
            <input
              type="radio"
              :id="'rbUketukeCheckSort1-' + item.val"
              v-model="sort1Index"
              :value="item.val"
              @change="sortClicked"
            />
            <label
              :for="'rbUketukeCheckSort1-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
          <label class="mr-1">【</label>
          <div
            v-for="item in sort2List"
            :key="'rbUketukeCheckSort2-' + item.val"
            class="radioInline"
            style="width: 70px"
          >
            <input
              type="radio"
              :id="'rbUketukeCheckSort2-' + item.val"
              v-model="sort2Index"
              :value="item.val"
              :disabled="sort1Index != 1"
              @change="sortClicked"
            />
            <label
              :for="'rbUketukeCheckSort2-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
          <label>】</label>
        </v-card>
        <v-card
          class="koumokuTitle titleMain pa-1"
          style="position: absolute; left: 466px"
          outlined
          tile
        >
          詳細表示
        </v-card>
        <v-card
          elevation="0"
          tile
          outlined
          class="pl-1 mr-1"
          height="100%"
          style="position: absolute; left: 570px"
        >
          <div
            v-for="item in syousaiDispList"
            :key="item.val"
            class="radioInline"
          >
            <input
              type="radio"
              :id="'rbcheckListsyousaiDisp-' + item.val"
              v-model="selSyousaiDispUmuIndex"
              :value="item.val"
              @change="grdDispChangeclick()"
            />
            <label
              :for="'rbcheckListsyousaiDisp-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>

        <!-- <v-btn-toggle
          class="flex-wrap ml-1"
          style="position: absolute; left: 566px"
          v-model="selSyousaiDispUmuIndex"
          color="light-blue darken-4"
        >
          <v-btn
            v-for="n in syousaiDispList"
            :key="n.val"
            height="19"
            outlined
            elevation="2"
            @click="grdDispChangeclick()"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle> -->
        <v-btn
          class="ml-1"
          height="19"
          width="25"
          @click="filterClrclick()"
          elevation="2"
          style="position: absolute; left: 700px"
        >
          <v-icon dense>mdi-filter-off</v-icon>
          解除
        </v-btn>
        <v-spacer></v-spacer>
        <v-card class="countTitle titleOrange pa-1" outlined tile>
          相談件数:
          <span>{{ 0 }} </span>
          件
        </v-card>
      </v-row>

      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="uketukeCheckListIcrnGrid"
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
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="uketukeCheckListdatepicker1"
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
        id="uketukeCheckListdatepicker2"
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
        id="uketukeCheckListdatepickermonth"
        type="month"
        v-model="pickermonth"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(2)"
      >
      </v-date-picker>
    </v-dialog>
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
          :dispTab="'Kihonsoudan'"
          :selectViewData="viewObj"
          class="ml-1 pb-2"
          ref="uketukeTouroku"
        ></UketukeTouroku>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import messageConst from '@/utiles/MessageConst';
import UketukeTouroku from '../../components/UketukeTouroku.vue';
import { getConnect } from '../../connect/getConnect';
import printUtil from '@/utiles/printUtil';
const STYLE_DEFAULT = '';
let JIGYOID = 62;
/*
 * 列
 */
let grdindex = 0;
const COLS = {
  TAIOUYMD: grdindex++,
  TIME: grdindex++,
  NAME: grdindex++,
  AGE: grdindex++,
  SEX: grdindex++,
  SICHOSON: grdindex++,
  SYOUGAISIENKBN: grdindex++,
  SYOUGAIKBN1: grdindex++,
  SYOUGAIKBN2: grdindex++,
  SYOUGAIKBN3: grdindex++,
  SETAI: grdindex++,
  HONNIN: grdindex++,
  NYUKBN: grdindex++,
  SINKI: grdindex++,
  HOUHOU: grdindex++,
  KANKEI: grdindex++,
  NAIYOU: grdindex++,
  RANK: grdindex++,
  SYOYO: grdindex++,
  TAIOU: grdindex++,
};
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: { UketukeTouroku },
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
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
      ],
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      syousaiDispList: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      sort1List: [
        { val: 0, name: '日時' },
        { val: 1, name: '利用者' },
      ],
      sort2List: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
      ],
      ageList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '80歳' },
        { val: 2, name: '90歳' },
        { val: 3, name: '100歳' },
      ],
      shougaiSienKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '1' },
        { val: 2, name: '2' },
        { val: 3, name: '3' },
      ],
      shougaiKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '知的' },
        { val: 2, name: '精神' },
        { val: 3, name: '視覚' },
      ],
      headerList: [
        {
          dataname: 'ymdD',
          title: '対応日',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'jikan',
          title: '時間',
          width: '1.5*',
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          width: '4*',
          align: 'left',
        },
        {
          dataname: 'age',
          title: '年\n齢',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sexname',
          title: '性\n別',
          width: '0.8*',
          align: 'center',
        },
        {
          dataname: 'shichonm',
          title: '市区\n町村',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'syogaikbnnm',
          title: '障\n支\n区',
          width: '1.7*',
          align: 'center',
        },
        {
          dataname: 'syougaikbn1',
          title: '障害区分',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syougaikbn2',
          title: '障害区分',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syougaikbn3',
          title: '障害区分',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'setairk',
          title: '世帯状況',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'honninrk',
          title: '本人状況',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'sykkbnkigo',
          title: '入\n区',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sinki',
          title: '新\n規',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sdnhourk',
          title: '方法',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'sdnkanrk',
          title: '関係',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'naiyoD',
          dataname2: 'cskmknm',
          title: '内容',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dataname: 'ranknm',
          title: 'ラ\nン\nク',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syoyo',
          title: '所\n要\n時',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sryaku',
          title: '対応者',
          kbntitle: '',
          width: '2*',
          align: 'left',
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
      selSikuchoson: 0,
      selTantousya: 0,
      sort1Index: 0,
      sort2Index: 0,
      selSyousaiDispUmuIndex: 0,
      viewDataAll: [],
      viewData: [],
      dispSearchAdd: false,
      filter: {},
      mainGrid: [],
      thickList: [
        COLS.TAIOUYMD,
        COLS.TIME,
        COLS.SYOUGAISIENKBN,
        COLS.SYOUGAIKBN3,
        COLS.HONNIN,
        COLS.KANKEI,
        COLS.SYOYO,
      ],
      tourokuScreenFlag: false,
      viewObj: {},
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.setPrintEvent();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('uketukeCheckListIcrnGrid') != null) {
        document.getElementById('uketukeCheckListIcrnGrid').style.height =
          window.innerHeight - 130 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
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
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height =
        sysConst.GRDROWHEIGHT.Header * 2.5;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.name = this.headerList[colIndex].dataname;
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
          this.headerList[colIndex].title
        );
      }

      flexGrid.endUpdate();
    },
    onFormatItemIcrn(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }

      if (e.panel == flexGrid.columnHeaders) {
        if (e.col < COLS.NYUKBN) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        } else if (e.col < COLS.NAIYOU) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else if (e.col < COLS.TAIOU) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      }
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.borderRight = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (this.selSyousaiDispUmuIndex == 1 && e.col == COLS.NAIYOU) {
          e.cell.innerHTML =
            '<font color="#276bc5"><' +
            wjCore.escapeHtml(tmpitem.cskmknm) +
            '></font>' +
            '<div>' +
            wjCore.escapeHtml(tmpitem.naiyo) +
            '</div>';
        }
        if (e.col == COLS.SETAI) {
          if (tmpitem.setairk.length == 0) {
            e.cell.innerHTML = '<font color="#c93328">※未入力</font>';
          }
        }
      }

      if (
        this.thickList.find((element) => {
          return element == e.col;
        }) != undefined
      ) {
        e.cell.style.borderRight =
          '1px solid ' + sysConst.COLOR.gridBorderColor;
      }
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      if (flexGrid.columns.length > 0) {
        if (this.selSyousaiDispUmuIndex == 1) {
          flexGrid.columns[COLS.NAIYOU].binding =
            this.headerList[COLS.NAIYOU].dataname;
        } else {
          flexGrid.columns[COLS.NAIYOU].binding =
            this.headerList[COLS.NAIYOU].dataname2;
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
    grdDispChangeclick() {
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: JIGYOID,
          pHostName: 1,
          pSymd: this.startymd.format('YYYYMMDD'),
          pEymd: this.endymd.format('YYYYMMDD'),
          Dspkbn: 0,
        };
        getConnect('/Uktk', params, 'SIENT')
          .then((result) => {
            this.viewDataAll = result;
            this.userFilter();
          })
          .catch(function (error) {
            alert(
              messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
            );
          });
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

      if (this.sort1Index == 0) {
        //年月日順でソート
        if (this.sortSearch == 0) {
          tmpviewdata.sort((a, b) => {
            if (a.ymdD < b.ymdD) {
              return -1;
            }
            if (a.ymdD > b.ymdD) {
              return 1;
            }
            // 二次キーは時間
            if (a.jikan !== b.jikan) {
              return a.jikan - b.jikan;
            }
          });
        }
      } else {
        if (this.sort2List == 0) {
          //コード順でソート
          tmpviewdata.sort((a, b) => {
            if (a.riyocode < b.riyocode) {
              return -1;
            }
            if (a.riyocode > b.riyocode) {
              return 1;
            }
            // 二次キーは交付日
            if (a.rkana !== b.rkana) {
              return a.rkana - b.rkana;
            }
          });
        } else {
          //利用者名でソート
          tmpviewdata.sort((a, b) => {
            if (a.rkana < b.rkana) {
              return -1;
            }
            if (a.rkana > b.rkana) {
              return 1;
            }
            if (a.riyocode !== b.riyocode) {
              return a.riyocode - b.riyocode;
            }
          });
        }
      }
      this.viewData = tmpviewdata;
    },
    getYmd(outputkbn) {
      if (outputkbn == 0) {
        if (!this.startymd) {
          this.startymd = dayjs().startOf('months');
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
    onInputClicked() {
      this.selInputKbn = this.inputList[this.selInputKbn].val;
    },
    onSikuchosonClicked() {
      this.selSikuchoson = this.sikuchosonList[this.selSikuchoson].val;
    },
    onTantousyaClicked() {
      this.selTantousya = this.tantousyaList[this.selTantousya].val;
    },

    sortClicked() {
      this.setViewData(false);
    },
    searchAddClicked() {
      this.dispSearchAdd = !this.dispSearchAdd;
      let f = document.activeElement;
      f.blur();
    },
    searchclick() {
      this.dispSearchAdd = false;
      this.setViewData(true);
    },
    filterClrclick() {
      this.filter.clear();
    },
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
      if (this.$refs.uketukeTouroku.getEditflg()) {
        // データ読込
        this.setViewData(true);
      }
    },
    setDispdata(tmpitem) {
      this.viewObj = tmpitem;
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示期間：' + this.getYmd(0) + '～' + this.getYmd(1);
      printUtil.setSubTitleList([sub1]);
      printUtil.printExec('チェックリスト', printUtil.DIRECTION.landscape);
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#uketukeCheckList {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px;
  max-width: 1920px;
  width: auto;

  .countTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
    > span {
      color: $font_color_sunday;
    }
  }

  #uketukeCheckListIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-width: 1250px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    min-height: 500px;
    &.wj-flexgrid [wj-part='root'] {
      overflow-x: hidden !important;
      overflow-y: scroll !important;
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

#uketukeCheckListdatepickermonth,
#uketukeCheckListdatepicker1,
#uketukeCheckListdatepicker2 {
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
#uketukeCheckListdatepickermonth {
  position: fixed !important;
  top: 20px;
  left: 450px;
}
#uketukeCheckListdatepicker1 {
  position: fixed !important;
  top: 20px;
  left: 100px;
}
#uketukeCheckListdatepicker2 {
  position: fixed !important;
  top: 20px;
  left: 300px;
}
</style>
