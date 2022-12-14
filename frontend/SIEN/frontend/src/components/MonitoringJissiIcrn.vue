<template>
  <div id="monitoringJissiIcrn">
    <v-container class="pa-0" fluid>
      <v-row no-gutters class="rowStyle">
        <v-card class="koumokuTitle titleMain pa-1" outlined tile>
          表示月
        </v-card>
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
            elevation="2"
            tile
            outlined
            width="125px"
            height="100%"
            class="btnymd"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="2"
            class="btnymd pa-0 ml-1"
            height="100%"
            tile
            @click="inputCalendarClick(1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
            前月
          </v-btn>
          <v-btn
            elevation="2"
            class="btnymd pa-0 ml-1"
            height="100%"
            tile
            @click="inputCalendarClick(2)"
          >
            翌月
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-card>
        <v-btn
          class="ml-1"
          height="19"
          :loading="loading"
          @click="searchClicked()"
        >
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          絞込
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div
            v-for="item in siborikomiList"
            :key="item.val"
            class="radioInline"
          >
            <input
              type="radio"
              :id="'rbMoniJissisiborikomi-' + item.val"
              v-model="siborikomiIndex"
              :value="item.val"
              @change="siborikomiClicked"
            />
            <label
              :for="'rbMoniJissisiborikomi-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          様式
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div v-for="item in yousikiList" :key="item.val" class="radioInline">
            <input
              type="radio"
              :id="'rbMoniJissiyousiki-' + item.val"
              v-model="yousikiIndex"
              :value="item.val"
              @change="siborikomiClicked"
            />
            <label
              :for="'rbMoniJissiyousiki-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
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
      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          <span class="under18 border mr-1" style="width: 80px">18歳未満</span>
        </v-card>
        <v-btn class="ml-1" height="19" width="25" @click="filterClrclick()">
          <v-icon dense>mdi-filter-off</v-icon>
          解除
        </v-btn>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="monitoringJissiIcrnGrid"
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
          :initialized="onInitializemonitoringJissiIcrnGrid"
          :formatItem="onFormatItemyoteisyaIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatayoteisya"
          :showMarquee="true"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedyoteisyaIcrn"
            :filterApplied="filterApplied"
            :showFilterIcons="false"
          />
        </wj-flex-grid>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringJissiIcrnDatepicker"
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
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';
import printUtil from '@/utiles/printUtil';
import { getConnect } from '@connect/getConnect';
export default {
  components: { AlphabetButton },
  data() {
    return {
      yoteisyaIcrnHeaderList: [
        {
          dataname: 'rcodeD',
          title: 'コード',
          kbntitle: '基本情報',
          chutitl: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          kbntitle: '基本情報',
          chutitl: '',
          width: '4*',
          align: 'left',
        },
        {
          dataname: 'shichoName',
          title: '市区\n町村',
          kbntitle: '基本情報',
          chutitl: '',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'keikakuYmdD',
          title: '作成日',
          kbntitle: 'サービス等利用計画',
          chutitl: '',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'yoshikiName',
          title: '様\n式',
          kbntitle: 'サービス等利用計画',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'yoteiYmD',
          title: '予\n定\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: '1*',
          align: 'right',
        },
        {
          dataname: 'shukiD',
          title: '終\n期\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'chushiD',
          title: '中\n止',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'enkiD',
          title: '延\n期',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'riyu',
          title: '理由',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'nextYoteiYmD',
          title: '次回\n予定月',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: '2*',
          align: 'center',
        },

        {
          dataname: 'mymdD',
          title: '実施日',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'jisshiD',
          title: '実\n施',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'moniWeekFlgD',
          title: '週\n間\n計\n画',
          kbntitle: '',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'douiD',
          title: '同\n意',
          kbntitle: '',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'anHenkoFlgD',
          title: '変\n更',
          kbntitle: '計画案',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'anKoshinFlgD',
          title: '更\n新',
          kbntitle: '計画案',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'anNextMkYmD',
          title: '次回\n作成月',
          kbntitle: '計画案',
          chutitl: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'svcEndFlgD',
          title: 'サ\n|\nビ\nス\n終\n了',
          kbntitle: '',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'tanYmdD',
          title: '実施日',
          kbntitle: '担当者会議',
          chutitl: '',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'kasanD',
          title: '加\n算',
          kbntitle: '担当者会議',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sname',
          title: '担当者',
          kbntitle: '',
          chutitl: '',
          width: '2*',
          align: 'left',
        },
      ],
      viewdatayoteisyaAll: [],
      viewdatayoteisya: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      filteryoteisyaIcrn: {},
      targetYmd: '',
      selTantousya: 0,
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      siborikomiIndex: 0,
      siborikomiList: [
        { val: 0, name: '予定月' },
        { val: 1, name: '実施月' },
      ],
      yousikiIndex: 0,
      yousikiList: [
        { val: 0, name: '全部' },
        { val: 1, name: '障害者' },
        { val: 2, name: '障害児' },
      ],
      loading: false,
      mainGrid: [],
      thickList: [2, 9],
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
      if (document.getElementById('monitoringJissiIcrnGrid') != null) {
        document.getElementById('monitoringJissiIcrnGrid').style.height =
          window.innerHeight - 160 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    filterInitializedyoteisyaIcrn: function (filter) {
      this.filteryoteisyaIcrn = filter;
    },
    onInitializemonitoringJissiIcrnGrid(flexGrid) {
      this.mainGrid = flexGrid;
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filteryoteisyaIcrn.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filteryoteisyaIcrn.showFilterIcons = false;
      });
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;

      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row + 5;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
      // flexGrid.columnHeaders.hostElement.style.fontSize = '16px';
      console.log(flexGrid.columnHeaders.hostElement.style);
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      // flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.yoteisyaIcrnHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.yoteisyaIcrnHeaderList[colIndex].dataname;
        col.name = this.yoteisyaIcrnHeaderList[colIndex].dataname;
        col.header = this.yoteisyaIcrnHeaderList[colIndex].title;
        col.width = this.yoteisyaIcrnHeaderList[colIndex].width;
        col.align = this.yoteisyaIcrnHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.allowResizing = true;
        // if (colIndex == 3 || colIndex == 11 || colIndex == 19) {
        //   col.format = sysConst.FORMAT.Ymd;
        // } else if (colIndex == 17) {
        //   col.format = sysConst.FORMAT.Ym;
        // }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.yoteisyaIcrnHeaderList[colIndex].kbntitle
            ? this.yoteisyaIcrnHeaderList[colIndex].title
            : this.yoteisyaIcrnHeaderList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          !this.yoteisyaIcrnHeaderList[colIndex].chutitl
            ? this.yoteisyaIcrnHeaderList[colIndex].title
            : this.yoteisyaIcrnHeaderList[colIndex].chutitl
        );
        flexGrid.columnHeaders.setCellData(
          2,
          colIndex,
          this.yoteisyaIcrnHeaderList[colIndex].title
        );
      }
      flexGrid.columnFooters.setCellData(0, 3, '合計');
      // flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },

    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      this.screenFlag = false;
      this.loading = false;
      console.log(111);
      console.log(this.viewdatayoteisya);
      flexGrid.columnFooters.setCellData(
        0,
        6,
        this.viewdatayoteisya.filter((x) => x.shuki == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        7,
        this.viewdatayoteisya.filter((x) => x.chusi == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        8,
        this.viewdatayoteisya.filter((x) => x.enki == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        11,
        this.viewdatayoteisya.filter((x) => x.jisshi == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        12,
        this.viewdatayoteisya.filter((x) => x.jisshi == 1).length
      );
      // flexGrid.columnFooters.setCellData(
      //   0,
      //   13,
      //   this.viewdatayoteisya.filter((x) => x.syukankeikaku.length > 0).length
      // );
      flexGrid.columnFooters.setCellData(
        0,
        14,
        this.viewdatayoteisya.filter((x) => x.doui == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        15,
        this.viewdatayoteisya.filter((x) => x.henkoShu == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        16,
        this.viewdatayoteisya.filter((x) => x.chuto == 1).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        17,
        this.viewdatayoteisya.filter((x) => String(x.nextMonth).length > 0)
          .length
      );
      // flexGrid.columnFooters.setCellData(
      //   0,
      //   18,
      //   this.viewdatayoteisya.filter((x) => x.serviceend.length > 0).length
      // );
      flexGrid.columnFooters.setCellData(
        0,
        19,
        this.viewdatayoteisya.filter((x) => String(x.tanYmd).length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        20,
        this.viewdatayoteisya.filter((x) => x.kasan.length > 0).length
      );
    },
    filterApplied(e) {
      console.log(e);
      // this.grdAutoSizeRow(e.grid);
    },

    onFormatItemyoteisyaIcrn(flexGrid, e) {
      e.cell.style.borderBottom = '';
      e.cell.style.borderRight = '';
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col < 3) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        } else if (e.col < 5) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
        if (
          (e.row == 0 && e.col == 0) ||
          (e.row == 0 && e.col == 5) ||
          (e.row == 0 && e.col == 19) ||
          (e.row >= 1 && e.col == 2) ||
          (e.row >= 1 && e.col == 6) ||
          (e.row == 1 && e.col == 7) ||
          (e.row == 2 && e.col == 10) ||
          (e.row == 1 && e.col == 11) ||
          (e.row == 2 && e.col == 12) ||
          (e.row >= 1 && e.col == 20) ||
          e.col == 14 ||
          e.col == 18
        ) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
        if ((e.row == 0 && e.col == 3) || (e.row >= 1 && e.col == 4)) {
          e.cell.style.borderRight =
            '3px double ' + sysConst.COLOR.gridBorderColor;
        }
      }

      if (e.panel == flexGrid.columnFooters) {
        if (e.col < 4) {
          e.cell.style.borderRight = 'None';
        }
        if (
          e.col == 6 ||
          e.col == 10 ||
          e.col == 12 ||
          e.col == 14 ||
          e.col == 18 ||
          e.col == 20
        ) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
        if (e.col == 4) {
          e.cell.style.borderRight =
            '3px double ' + sysConst.COLOR.gridBorderColor;
        }
        e.cell.style.borderTop =
          ' double 4px ' + sysConst.COLOR.gridBorderColor;
        if (e.col <= 4) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.gridBackground;
        }
      }

      if (e.panel == flexGrid.cells) {
        if (
          e.col == 2 ||
          e.col == 6 ||
          e.col == 10 ||
          e.col == 12 ||
          e.col == 14 ||
          e.col == 18 ||
          e.col == 20
        ) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
        if (e.col == 4) {
          e.cell.style.borderRight =
            '3px double ' + sysConst.COLOR.gridBorderColor;
        }
        e.cell.style.backgroundColor = '';
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.col == 1 && tmpitem.age < 18) {
          wjCore.addClass(e.cell, 'under18');
        }
        if (tmpitem.chusi == '○' || tmpitem.enki == '○') {
          if (11 <= e.col && e.col <= 20) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          }
        }
      }
    },

    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
          pSym: this.kikanYm.format('YYYYMM'),
          pEym: this.kikanYm.format('YYYYMM'),
        };
        console.log(params);
        getConnect('/moniJissiView', params).then((result) => {
          console.log(12345);
          console.log(result);
          this.viewdatayoteisyaAll = result;
          this.userFilter();
        });
      } else {
        this.userFilter();
      }
    },
    onAlphabetical() {
      this.userFilter();
    },
    siborikomiClicked() {
      this.userFilter();
    },
    yousikiClicked(id) {
      this.yousikiIndex = id;
      this.userFilter();
    },
    onTantousyaClicked() {
      this.selTantousya = this.tantousyaList[this.selTantousya].val;
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdatayoteisyaAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      if (this.yousikiIndex == 1) {
        tmpviewdata = tmpviewdata.filter((x) => x.yousiki == '者');
      } else if (this.yousikiIndex == 2) {
        tmpviewdata = tmpviewdata.filter((x) => x.yousiki == '児');
      }
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
      this.viewdatayoteisya = tmpviewdata;
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
        this.viewdatayoteisya = [];
      }
    },
    monthSelect() {
      this.kikanYm = dayjs(this.picker);
      this.viewdatayoteisya = [];
      this.datepicker_dialog = false;
    },
    filterClrclick() {
      this.filteryoteisyaIcrn.clear();
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示月：' + this.getYm() + ' ';
      printUtil.setSubTitleList([sub1]);
      printUtil.printExec('実績一覧', printUtil.DIRECTION.landscape);
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#monitoringJissiIcrn {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: 100%;

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

  #monitoringJissiIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    height: 79vh;
    min-height: 450px;
    z-index: 2;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    &.wj-flexgrid [wj-part='root'] {
      overflow-y: scroll !important;
      overflow-x: hidden !important;
    }
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;

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
    .wj-state-active {
      background: $grid_selected_background;
      color: $font_color;
    }
    .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected):not(.wj-state-active) {
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#monitoringJissiIcrnDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 70px;
  left: 100px;
  width: 300px;
  max-width: 300px;
}
</style>
