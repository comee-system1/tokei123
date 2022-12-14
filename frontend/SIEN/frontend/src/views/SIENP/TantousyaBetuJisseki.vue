<template>
  <div id="tantousyaBetuJisseki">
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
            elevation="2"
            tile
            outlined
            width="125px"
            height="100%"
            class="btnymd pa-0 mr-1"
            >{{ getYm(0) }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="2"
            class="btnymd pa-0 mr-1"
            height="100%"
            tile
            @click="inputCalendarClick(1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
            前月
          </v-btn>
          <v-btn
            elevation="2"
            class="btnymd pa-0 mr-1"
            height="100%"
            tile
            @click="inputCalendarClick(2)"
          >
            翌月
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-card>
        <v-btn class="mr-1" height="19" @click="searchClicked()">
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          様式
        </v-card>
        <v-btn-toggle
          class="flex-wrap mr-1"
          color="light-blue darken-4"
          v-model="selYousiki"
        >
          <v-btn
            v-for="n in yousikiList"
            :key="n.val"
            elevation="2"
            outlined
            height="19"
            width="50"
            min-width="50"
            @click="onYousikiClicked(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          担当者
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selTantouId"
          @change="onTantousyaClicked"
          style="width: 150px"
        >
          <option v-for="val in tantouist" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
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
              :id="'rbTansousyabetuJissekiDispNaiyou-' + item.val"
              v-model="selDispNaiyouIndex"
              :value="item.val"
              @change="grdDispChangeclick()"
            />
            <label
              :for="'rbTansousyabetuJissekiDispNaiyou-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-btn class="ml-1" height="19" width="25" @click="filterClrclick()">
          <v-icon small>mdi-filter-off</v-icon>
          解除
        </v-btn>
      </v-row>
      <v-row no-gutters class="ma-0 mt-1" style="position: relative">
        <wj-flex-grid
          id="tantousyaBetuJissekiicrnGrid"
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
        <p
          id="tantousyaBetuJissekiBorder1"
          class="grdBorder"
          v-show="false"
        ></p>
        <p
          id="tantousyaBetuJissekiBorder2"
          class="grdBorder"
          v-show="false"
        ></p>
      </v-row>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="tantousyaBetuJissekidatepicker1"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import printUtil from '@/utiles/printUtil';
import { getConnect } from '../../connect/getConnect';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid black';
const FIX_KASAN_KEY = 'kasan';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {},
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      headerList: [
        {
          dataname: 'sinm',
          title: '担当者',
          chutitle: '',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'rcodeD',
          title: 'コード',
          chutitle: '',
          kbntitle: '',
          width: 70,
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          chutitle: '',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'keiyakuYmdD',
          title: '契約\n締結',
          chutitle: '',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'anYmdD',
          title: '作成日',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'yoshikiName',
          title: '様\n式',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'anDouiYmdD',
          title: '同\n意',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'teiYmdD',
          title: '提\n出',
          chutitle: '計画案',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'anKaigiYmdD',
          title: '担当者\n会議',
          chutitle: '',
          kbntitle: '計画作成',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'keikakuYmdD',
          title: '作成日',
          chutitle: '計画',
          kbntitle: '計画作成',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'keikakuDouiYmdD',
          title: '同\n意',
          chutitle: '計画',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'moniYmdD',
          title: '実施日',
          chutitle: '報告書',
          kbntitle: 'モニタリング',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'moniDouiFlgD',
          title: '同\n意',
          chutitle: '報告書',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'moniShukiFlgD',
          title: '終\n期\n月',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'moniKeizokuFlgD',
          title: '継\n続',
          chutitle: '案作成',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'noMoniHenkoFlgD',
          title: '変\n更',
          chutitle: '案作成',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'moniKoshinFlgD',
          title: '更\n新',
          chutitle: '案作成',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'moniKaigiYmdD',
          title: '担当者\n会議',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
      ],
      dispHeaderList: [],
      userListComponentDatas: [], // ユーザー一覧データ
      userInfo: {}, // ユーザ一覧から選択した値
      targetYm: '',
      picker: '',
      datepicker_dialog_sym: false,
      selYousiki: 0,
      yousikiList: [
        { val: 0, name: '全部' },
        { val: 1, name: '障害者' },
        { val: 2, name: '障害児' },
      ],
      selTantouId: 0,
      tantouist: [
        { val: 0, name: '全部' },
        { val: 1, name: 'テスト' },
      ],
      selDispNaiyouIndex: 0,
      dispNaiyouList: [
        { val: 0, name: '全部' },
        { val: 1, name: '計画作成' },
        { val: 2, name: 'モニタリング' },
        { val: 3, name: '加算項目' },
      ],
      viewDataAll: [],
      viewData: [],
      filter: {},
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
      if (document.getElementById('tantousyaBetuJissekiicrnGrid') != null) {
        document.getElementById('tantousyaBetuJissekiicrnGrid').style.height =
          window.innerHeight - 110 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
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
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());

      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows[0].allowMerging = false;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.frozenColumns = 3;
      this.createGrdHeader(flexGrid);
    },
    createGrdHeader(flexGrid) {
      flexGrid.columns.length = 0;

      this.dispHeaderList = this.headerList.concat();
      if (
        this.viewDataAll.kasanTitleList != undefined &&
        this.viewDataAll.kasanTitleList.length > 0
      ) {
        this.viewDataAll.kasanTitleList.forEach((element) => {
          this.dispHeaderList.push({
            dataname: FIX_KASAN_KEY + element.kasan,
            title: element.ryaku,
            chutitle: element.ryaku,
            kbntitle: '加算項目',
            width: 50,
            align: 'center',
          });
        });
      }

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.dispHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.dispHeaderList[colIndex].dataname;
        col.header = this.dispHeaderList[colIndex].title;
        col.width = this.dispHeaderList[colIndex].width;
        col.align = this.dispHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 4 || colIndex == 7) {
          col.allowResizing = true;
        } else {
          col.allowResizing = false;
        }
        if (colIndex == 0) {
          col.format = sysConst.FORMAT.Ymd;
        }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.dispHeaderList[colIndex].kbntitle
            ? this.dispHeaderList[colIndex].title
            : this.dispHeaderList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          !this.dispHeaderList[colIndex].chutitle
            ? this.dispHeaderList[colIndex].title
            : this.dispHeaderList[colIndex].chutitle
        );
        flexGrid.columnHeaders.setCellData(
          2,
          colIndex,
          this.dispHeaderList[colIndex].title
        );
        if (colIndex == 2) {
          flexGrid.columnFooters.setCellData(0, colIndex, '合計');
        }
      }
    },
    onFormatItemIcrn(flexGrid, e) {
      e.cell.style.borderBottom = STYLE_DEFAULT;
      e.cell.style.borderRight = STYLE_DEFAULT;
      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.row < flexGrid.rows.length - 1) {
          let nexttmpitem = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.siid == nexttmpitem.siid) {
            if (e.col < 3) {
              e.cell.style.borderBottom = 'none';
            }
          } else {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          }
        }
        if (e.row > 0 && e.col < 3) {
          let pretmpitem = e.panel.rows[e.row - 1].dataItem;
          if (tmpitem.siid == pretmpitem.siid) {
            e.cell.innerHTML = '';
          }
        }

        // if (e.row < flexGrid.rows.length - 1) {
        //   let tmpitempre = e.panel.rows[e.row + 1].dataItem;
        //   if (tmpitem.ymd.substring(0, 6) != tmpitempre.ymd.substring(0, 6)) {
        //     e.cell.style.borderBottom = STYLE_BORDER_SOLID;
        //   }
        // }
        if (e.col == 2 || e.col == 10 || e.col == 17) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        } else {
          if (e.col > 17 && (e.col - this.headerList.length + 1) % 5 == 0) {
            e.cell.style.borderRight = STYLE_BORDER_SOLID;
          }
        }
      } else if (e.panel == flexGrid.columnHeaders) {
        if (e.col == 3) {
          this.setBorderPos(e, 'tantousyaBetuJissekiBorder1');
        }
        if (e.col == 11) {
          this.setBorderPos(e, 'tantousyaBetuJissekiBorder2');
        }
        if (e.col < 3) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        } else if (e.col < 11) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else if (e.col < 18) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        } else {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundYellow;
        }
        if (
          (e.row == 0 && e.col == 2) ||
          (e.row == 0 && e.col == 4) ||
          (e.row == 0 && e.col == 11) ||
          (e.row == 1 && e.col == 9) ||
          (e.row == 1 && e.col == 17) ||
          (e.row == 2 && e.col == 10) ||
          (e.row == 2 && e.col == 17)
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        } else {
          if (e.col > 17 && (e.col - this.headerList.length + 1) % 5 == 0) {
            e.cell.style.borderRight = STYLE_BORDER_SOLID;
          }
        }
        // if (e.col == 1 || e.col == 3 || e.col == 5 || e.col == 9) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // } else if (e.row == 0 && (e.col == 2 || e.col == 6)) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // }
      } else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.borderTop =
          ' double 4px ' + sysConst.COLOR.gridBorderColor;
        if (e.col < 3) {
          e.cell.style.backgroundColor = e.cell.style.backgroundColor =
            sysConst.COLOR.gridTotalBackground;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if (e.col == 2 || e.col == 10 || e.col == 17) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        } else {
          if (e.col > 17 && (e.col - this.headerList.length + 1) % 5 == 0) {
            e.cell.style.borderRight = STYLE_BORDER_SOLID;
          }
        }
      }
    },
    setBorderPos(e, name) {
      let el = document.getElementById(name);
      el.style.left = e.panel.getCellBoundingRect(e.row, e.col).left - 5 + 'px';
    },
    onItemsSourceChanging(flexGrid) {
      this.createGrdHeader(flexGrid);
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
      this.mainGrid.beginUpdate();
      for (let col = 0; col < this.mainGrid.columns.length; col++) {
        this.mainGrid.columns[col].visible = true;
        if (this.selDispNaiyouIndex == 1 && 10 < col) {
          this.mainGrid.columns[col].visible = false;
        } else if (
          this.selDispNaiyouIndex == 2 &&
          ((3 <= col && col <= 10) || 17 < col)
        ) {
          this.mainGrid.columns[col].visible = false;
        } else if (this.selDispNaiyouIndex == 3 && 3 <= col && col <= 17) {
          this.mainGrid.columns[col].visible = false;
        }
      }
      this.mainGrid.endUpdate();
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
          pSym: this.targetYm.format('YYYYMM'),
        };
        console.log(params);
        getConnect('/TantobetsuJisseki', params, 'SIENP').then((result) => {
          console.log(12345);
          console.log(result);
          this.viewDataAll = this.createKasanColData(result);
          this.userFilter();

          this.screenFlag = false;
        });
      } else {
        this.userFilter();
      }
    },
    createKasanColData(apiresult) {
      let tmpviewdata = apiresult.jissekiList;
      for (let index = 0; index < tmpviewdata.length; index++) {
        let tmpkasanlist = tmpviewdata[index].kasanList;
        for (let kasan = 0; kasan < tmpkasanlist.length; kasan++) {
          tmpviewdata[index][FIX_KASAN_KEY + tmpkasanlist[kasan].kasan] =
            // tmpkasanlist[kasan].ymd.slice(0, 4) +
            // '/' +
            tmpkasanlist[kasan].ymd.slice(4, 6) +
            '/' +
            tmpkasanlist[kasan].ymd.substring(6, 8);
        }
      }
      return apiresult;
    },
    onTantousyaClicked() {
      this.selTantouId = this.tantouist[this.selTantouId].val;
      this.userFilter();
    },
    onYousikiClicked(kbn) {
      this.selYousiki = kbn;
      this.userFilter();
    },
    userFilter() {
      let tmpviewdata = this.viewDataAll.jissekiList.concat();

      if (this.selYousiki > 0) {
        tmpviewdata = tmpviewdata.filter((x) => x.yoshiki == this.selYousiki);
      }
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
    getYm(outputkbn) {
      if (outputkbn == 0) {
        if (!this.targetYm) {
          this.targetYm = dayjs();
        }
        return (
          this.targetYm.format('YYYY') +
          '年' +
          this.targetYm.format('MM') +
          '月'
        );
      }
    },
    inputCalendarClick(kbn) {
      if (kbn == 1) {
        this.targetYm = this.targetYm.subtract(1, 'months');
      } else if (kbn == 2) {
        this.targetYm = this.targetYm.add(1, 'months');
      }
      this.picker =
        this.targetYm.format('YYYY') +
        '-' +
        this.targetYm.format('MM') +
        '-' +
        this.targetYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog_sym = true;
      }
    },
    calenderSelect(kbn) {
      if (kbn == 0) {
        this.targetYm = dayjs(this.picker);
        this.datepicker_dialog_sym = false;
      }
    },
    filterClrclick() {
      this.filter.clear();
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示期間：' + this.getYm(0) + ' ';
      printUtil.setSubTitleList([sub1]);
      printUtil.printExec('担当者別実施一覧', printUtil.DIRECTION.landscape);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#tantousyaBetuJisseki {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;
  max-width: 1920px;
  width: auto;
  #tantousyaBetuJissekiicrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-width: 1050px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    min-height: 500px;
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

#tantousyaBetuJissekidatepicker1 {
  position: fixed !important;
  top: 70px;
  left: 100px;
  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }
}
</style>
