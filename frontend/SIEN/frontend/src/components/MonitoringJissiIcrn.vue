<template>
  <div id="monitoringJissiIcrn">
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
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle pa-1" outlined tile> 絞込 </v-card>
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 様式 </v-card>
        <v-btn-toggle class="flex-wrap ml-1" v-model="yousikiIndex" mandatory>
          <v-btn
            v-for="n in yousikiList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="yousikiClicked(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 担当者 </v-card>
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
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          <span class="miman mr-1" style="width: 80px">18歳未満</span>
        </v-card>
      </v-row>
      <v-row
        class="ma-0 mt-1 pa-1"
        no-gutters
        style="background-color: #d7eeff; width: 100%"
      >
        <wj-flex-grid
          id="yoteisyaIcrnGrid"
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
          :initialized="onInitializeyoteisyaIcrnGrid"
          :formatItem="onFormatItemyoteisyaIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatayoteisya"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedyoteisyaIcrn"
            :filterApplied="filterApplied"
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
import moment from 'moment';
// import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';
// import MdSelect from '../components/MdSelect.vue';
// const STYLE_BG_PREBIRTH = '#ffcccc';
export default {
  components: { AlphabetButton },
  data() {
    return {
      yoteisyaIcrnHeaderList: [
        {
          dataname: 'code',
          title: 'コード',
          kbntitle: '基本情報',
          chutitl: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'name',
          title: '利用者名',
          kbntitle: '基本情報',
          chutitl: '',
          width: '4*',
          align: 'left',
        },
        {
          dataname: 'sichoson',
          title: '市区\n町村',
          kbntitle: '基本情報',
          chutitl: '',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'sakuseiymd',
          title: '作成日',
          kbntitle: 'サービス等利用計画',
          chutitl: '',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'yousiki',
          title: '様\n式',
          kbntitle: 'サービス等利用計画',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'yoteiMonth',
          title: '予定\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'endMonth',
          title: '終\n期\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'chusi',
          title: '中\n止',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'enki',
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
          dataname: 'jikaiMonth',
          title: '次回\n予定月',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: '2*',
          align: 'center',
        },

        {
          dataname: 'jissiYmd',
          title: '実施日',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'jissi',
          title: '実\n施',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syukankeikaku',
          title: '週\n間\n計\n画',
          kbntitle: '',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'doui',
          title: '同\n意',
          kbntitle: '',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'henkou',
          title: '変\n更',
          kbntitle: '計画案',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'kousin',
          title: '更\n新',
          kbntitle: '計画案',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'nextMonth',
          title: '次回\n作成月',
          kbntitle: '計画案',
          chutitl: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'serviceend',
          title: 'サ\n|\nビ\nス終\n了',
          kbntitle: '',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'kaigiYmd',
          title: '実施日',
          kbntitle: '担当者会議',
          chutitl: '',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'kasan',
          title: '加\n算',
          kbntitle: '担当者会議',
          chutitl: '',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'tantousya',
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
    };
  },
  mounted() {},
  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitializedyoteisyaIcrn: function (filter) {
      this.filteryoteisyaIcrn = filter;
    },
    onInitializeyoteisyaIcrnGrid(flexGrid) {
      // flexGrid.beginUpdate();
      // クリックイベント
      // flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
      //   let ht = flexGrid.hitTest(e);
      //   if (ht.panel == flexGrid.cells) {
      //     // let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
      //     // this.setDispdata(tmpitem);
      //     // this.tourokuScreenFlag = true;
      //   }
      // });
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(3, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.columnHeaders.rows[3].allowMerging = false;

      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row + 5;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.columnHeaders.rows[3].height = sysConst.GRDROWHEIGHT.Header / 2;
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
        if (colIndex == 3 || colIndex == 11 || colIndex == 19) {
          col.format = sysConst.FORMAT.Ymd;
        } else if (colIndex == 17) {
          col.format = sysConst.FORMAT.Ym;
        }

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
        flexGrid.columnHeaders.setCellData(3, colIndex, ' ');
      }
      flexGrid.columnFooters.setCellData(0, 3, '合計');
      // flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },

    onItemsSourceChanged(flexGrid) {
      this.screenFlag = false;
      this.loading = false;
      flexGrid.columnFooters.setCellData(
        0,
        6,
        this.viewdatayoteisya.filter((x) => x.endMonth.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        7,
        this.viewdatayoteisya.filter((x) => x.chusi.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        8,
        this.viewdatayoteisya.filter((x) => x.enki.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        11,
        this.viewdatayoteisya.filter((x) => String(x.jissiYmd).length > 0)
          .length
      );
      flexGrid.columnFooters.setCellData(
        0,
        12,
        this.viewdatayoteisya.filter((x) => x.jissi.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        13,
        this.viewdatayoteisya.filter((x) => x.syukankeikaku.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        14,
        this.viewdatayoteisya.filter((x) => x.doui.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        15,
        this.viewdatayoteisya.filter((x) => x.henkou.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        16,
        this.viewdatayoteisya.filter((x) => x.kousin.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        17,
        this.viewdatayoteisya.filter((x) => String(x.nextMonth).length > 0)
          .length
      );
      flexGrid.columnFooters.setCellData(
        0,
        18,
        this.viewdatayoteisya.filter((x) => x.serviceend.length > 0).length
      );
      flexGrid.columnFooters.setCellData(
        0,
        19,
        this.viewdatayoteisya.filter((x) => String(x.kaigiYmd).length > 0)
          .length
      );
      flexGrid.columnFooters.setCellData(
        0,
        20,
        this.viewdatayoteisya.filter((x) => x.kasan.length > 0).length
      );
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    filterApplied(e) {
      console.log(e);
      // this.grdAutoSizeRow(e.grid);
    },

    onFormatItemyoteisyaIcrn(flexGrid, e) {
      e.cell.style.borderBottom = '';
      e.cell.style.borderRight = '';
      if (
        e.panel == flexGrid.columnHeaders &&
        (e.row == 2 ||
          (e.row == 1 && e.col <= 4) ||
          (e.row == 0 && e.col == 13) ||
          (e.row == 0 && e.col == 14) ||
          (e.row == 0 && e.col == 18) ||
          (e.row == 0 && e.col == 21) ||
          (e.row == 1 && e.col == 5) ||
          (e.row == 1 && e.col == 6) ||
          (e.row == 1 && e.col == 15) ||
          (e.row == 1 && e.col == 16) ||
          (e.row == 1 && e.col == 17) ||
          (e.row == 1 && e.col == 19) ||
          (e.row == 1 && e.col == 20) ||
          (e.row == 1 && e.col == 21))
      ) {
        e.cell.style.borderBottom = 'None';
      }
      if (
        e.panel == flexGrid.columnHeaders &&
        ((e.row == 0 && e.col == 0) ||
          (e.row == 0 && e.col == 3) ||
          (e.row == 0 && e.col == 5) ||
          (e.row == 0 && e.col == 19) ||
          (e.row >= 1 && e.col == 2) ||
          (e.row >= 1 && e.col == 4) ||
          (e.row >= 1 && e.col == 6) ||
          (e.row == 1 && e.col == 7) ||
          (e.row >= 2 && e.col == 10) ||
          (e.row == 1 && e.col == 11) ||
          (e.row >= 2 && e.col == 12) ||
          (e.row >= 1 && e.col == 20) ||
          e.col == 14 ||
          e.col == 18)
      ) {
        e.cell.style.borderRight = '1px solid';
      }

      if (e.panel == flexGrid.columnFooters) {
        if (e.col < 4) {
          e.cell.style.borderRight = 'None';
        }
        if (
          e.col == 4 ||
          e.col == 6 ||
          e.col == 10 ||
          e.col == 12 ||
          e.col == 14 ||
          e.col == 18 ||
          e.col == 20
        ) {
          e.cell.style.borderRight = '1px solid';
        }
      }

      if (e.panel == flexGrid.cells) {
        if (
          e.col == 2 ||
          e.col == 4 ||
          e.col == 6 ||
          e.col == 10 ||
          e.col == 12 ||
          e.col == 14 ||
          e.col == 18 ||
          e.col == 20
        ) {
          e.cell.style.borderRight = '1px solid';
        }
        e.cell.style.backgroundColor = '';
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.col == 1 && tmpitem.age < 18) {
          // e.cell.innerHTML =
          // '<div class="miman">' + wjCore.escapeHtml(tmpitem.name) + '</div>';
          wjCore.addClass(e.cell, 'miman');
        }
        if (tmpitem.chusi == '○' || tmpitem.enki == '○') {
          if (11 <= e.col && e.col <= 20) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          }
        }

        if (e.col == 9) {
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.title) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
      }
    },
    onTantousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        // uketukeIcrn(this.targetYmd).then((result) => {
        //   this.viewdataAll = result;
        //   this.userFilter();
        //   this.screenFlag = false;
        // });
        this.createdemodata();
        this.userFilter();
      } else {
        this.userFilter();
      }
    },
    createdemodata() {
      let result = [];
      let ymd;
      for (let i = 1; i <= 100; i++) {
        let d = new Date('2022', Number('12') - 1, '01');
        if (i < 20 && i < 30) {
          d = new Date('2022', Number('12') - 1, '11');
        } else if (i < 30 && i < 40) {
          d = new Date('2022', Number('12') - 1, '21');
        } else {
          d = new Date('2022', Number('12') - 1, '31');
        }
        ymd = d;

        result.push({
          codebk: String(1000000 + i),
          code: String(1000000 + i),
          name: '東経 ' + i + '太郎',
          sichoson: '新東経西市',
          sakuseiymd: ymd,
          yousiki: '者',
          yoteiMonth: 'xx月',
          endMonth: '○',
          chusi: '',
          enki: '',
          riyu: '',
          jikaiMonth: '',
          jissiYmd: ymd,
          jissi: '●',
          syukankeikaku: '●',
          doui: '☑',
          henkou: '●',
          kousin: '●',
          nextMonth: ymd,
          serviceend: '○',
          kaigiYmd: ymd,
          kasan: '○',
          tantousya: '五文字太郎',
          age: 100,
        });

        if (i == 1) {
          result[i - 1].enki = '○';
          result[i - 1].riyu = '自己都合';
          result[i - 1].jikaiMonth = 'xx月';
          result[i - 1].jissiYmd = '';
          result[i - 1].jissi = '';
          result[i - 1].syukankeikaku = '';
          result[i - 1].doui = '';
          result[i - 1].henkou = '';
          result[i - 1].kousin = '';
          result[i - 1].nextMonth = '';
          result[i - 1].serviceend = '';
          result[i - 1].kaigiYmd = '';
          result[i - 1].kasan = '';
        }
        if (i == 2) {
          result[i - 1].chusi = '○';
          result[i - 1].riyu = '自己都合';
          result[i - 1].jikaiMonth = '-';
          result[i - 1].jissiYmd = '';
          result[i - 1].jissi = '';
          result[i - 1].syukankeikaku = '';
          result[i - 1].doui = '';
          result[i - 1].henkou = '';
          result[i - 1].kousin = '';
          result[i - 1].nextMonth = '';
          result[i - 1].serviceend = '';
          result[i - 1].kaigiYmd = '';
          result[i - 1].kasan = '';
        }
        if (i == 3) {
          result[i - 1].yousiki = '児';
          result[i - 1].age = 17;
        }
      }
      this.viewdatayoteisyaAll = result;
    },
    onAlphabetical() {
      this.userFilter();
    },
    siborikomiClicked() {
      this.userFilter();
    },
    yousikiClicked(id) {
      this.yousikiIndex = id;
      if (id == 0) {
        document.getElementById('yoteisyaIcrnGrid').style.fontSize = '16px';
      } else if (id == 1) {
        document.getElementById('yoteisyaIcrnGrid').style.fontSize = '14px';
      } else {
        document.getElementById('yoteisyaIcrnGrid').style.fontSize = '12px';
      }
      this.userFilter();
    },
    taisyousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
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
        this.kikanYm = moment().startOf('months');
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
      let split = this.picker.split('-');
      this.kikanYm = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.viewdatayoteisya = [];
      this.datepicker_dialog = false;
    },
    filterClrclick() {
      this.filteryoteisyaIcrn.clear();

      console.log(document.getElementById('yoteisyaIcrnGrid').style);
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

  #yoteisyaIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 98%;
    height: 73vh;
    min-height: 450px;
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

  // #yoteisyaIcrnGrid {
  //   width: auto;
  //   // min-width: 1250px;
  //   height: 70vh;
  //   min-height: 500px;
  // }
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
        margin-top: 8px;
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
</style>
