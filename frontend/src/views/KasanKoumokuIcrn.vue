<template>
  <div id="KasanKoumokuIcrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="user-info" fluid>
      <v-row class="rowStyle mt-0" no-gutters>
        <label>利用者</label>
        <wj-menu
          id="comboFilters1"
          class="customCombobox"
          :itemsSource="userSelList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selUser"
          :itemClicked="onUserClicked"
        >
        </wj-menu>
        <label class="ml-1">加算</label>
        <wj-menu
          id="comboFilters2"
          class="customCombobox"
          :itemsSource="kasanList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="kcode"
          displayMemberPath="name"
          v-model="selKasan"
          :itemClicked="onKasanClicked"
        >
        </wj-menu>
        <v-btn
          class="ml-1"
          style="width: 30px; height: 30px; margin-top: -2px"
          @click="searchClicked"
        >
          検索
        </v-btn>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <label>ソート</label>
        <v-btn-toggle class="flex-wrap" v-model="sortSearch" mandatory>
          <v-btn
            v-for="n in sortSelList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="sortUser(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-spacer></v-spacer>
        <label class="labelhosoku pt-2"> 上段：回数 下段：単位数 </label>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <wj-flex-grid
          id="kasanKoumokuIcrnGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'None'"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializekasanKoumokuIcrnGrid"
          :formatItem="onFormatItem"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
        >
        </wj-flex-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import HeaderServices from '../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import { kasanKoumokuIcrn } from '@backend/api/KasanKoumokuIcrn';
import { mstKsnKmk } from '@backend/api/MstKsnKmk';

const STR_DEFAULT = '';
const STYLE_DEFAULT = '';
const STYLE_NORMAL = 'normal';
const STYLE_BORDER_SOLID = '1px solid';
const STYLE_ALIGN_RIGHT = 'right';
const STYLE_WRITING_MODE_TATEGEKI = 'vertical-rl';
const CSS_IMAGE = 'cell-img';
const GRD_TITLE = {
  nisu: '日数',
  taisei: '施設体制加算',
  kobetu: '個別加算',
  total: '合計',
  totalNinzu: '人数',
  totalTani: '単位数',
};
const CMB_ID = {
  cmb1: 'comboFilters1',
  cmb2: 'comboFilters2',
};

export default {
  components: {
    HeaderServices,
    AlphabetButton,
  },
  data() {
    return {
      errorcnt: '',
      sortSearch: 0,
      selKasan: 0,
      headerList: [
        {
          dataname: 'err',
          title: 'レセ確定',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'name',
          title: '氏名',
          width: 200,
          align: 'left',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'useymd',
          title: '利用日数',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'nyuinymd',
          title: '入院日数',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
        {
          dataname: 'gaihakuymd',
          title: '外泊日数',
          width: 30,
          align: 'center',
          kasankbn: 0,
          kasanval: 0,
        },
      ],
      selUser: 0,
      userSelList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月入所者' },
        { val: 2, name: '今月退所者' },
      ],
      kasanList: [],
      sortSelList: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
        { val: 2, name: '受給者番号' },
      ],
      viewdataAll: [],
      viewdata: [],
      serviceArgument: '', // ヘッダメニューのサービス選択
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(ls.KEY.Sort));
      this.alphaSearch = Number(ls.getlocalStorageEncript(ls.KEY.Alphabet));
    });
  },
  methods: {
    initComboFilters(combo) {
      if (combo.hostElement.id == CMB_ID.cmb1) {
        combo.header = combo.selectedItem.name;
      } else if (combo.hostElement.id == CMB_ID.cmb2) {
        mstKsnKmk(true).then((result) => {
          this.kasanList = result;
          let index = this.kasanList.findIndex(
            (element) => element.kcode == this.selKasan
          );
          if (index >= 0) {
            combo.header = this.kasanList[index].name;
          } else {
            combo.header = this.kasanList[0].name;
          }
        });
      }
    },
    onUserClicked(s) {
      s.header = this.userSelList[s.selectedIndex].name;
      this.selUser = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
    },
    onKasanClicked(s) {
      ls.setlocalStorageEncript(ls.KEY.Kasan, s.selectedValue);
      s.header = this.kasanList[s.selectedIndex].name;
      this.selKasan = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
    },
    onInitializekasanKoumokuIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.frozenColumns = 5;
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = 100;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      flexGrid.endUpdate();
    },

    onItemsSourceChanging(flexGrid) {
      if (this.viewdata == null || this.viewdata.length == 0) {
        for (let colIndex = 5; colIndex < flexGrid.columns.length; colIndex++) {
          flexGrid.columnFooters.setCellData(0, colIndex, STR_DEFAULT);
          flexGrid.columnFooters.setCellData(1, colIndex, STR_DEFAULT);
        }
        return;
      }
      flexGrid.beginUpdate();
      let newheadList = this.headerList.concat();

      for (let i = 0; i < this.kasanList.length; i++) {
        if (this.kasanList[i].bunkbn == 0) {
          continue;
        }
        newheadList.push({
          dataname: String(this.kasanList[i].kcode),
          title: this.kasanList[i].name,
          width: 60,
          align: STYLE_ALIGN_RIGHT,
          kasankbn: this.kasanList[i].bunkbn,
          kasanval: this.kasanList[i].kcode,
        });
      }
      flexGrid.columns.clear();
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < newheadList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = newheadList[colIndex].dataname;
        col.header = newheadList[colIndex].title;
        col.width = newheadList[colIndex].width;
        col.align = newheadList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        if (colIndex == 0) {
          col.cssClass = CSS_IMAGE;
          col.cellTemplate = CellMaker.makeImage();
        } else {
          col.cssClass = STYLE_DEFAULT;
          col.cellTemplate = STYLE_DEFAULT;
        }

        if (colIndex == 10 || colIndex == 14) {
          col.format = sysConst.FORMAT.Num;
        } else if (colIndex == 3) {
          col.format = sysConst.FORMAT.Ymd;
        } else {
          col.format = STYLE_DEFAULT;
        }
        for (let rowindex = 0; rowindex < 2; rowindex++) {
          let title = STR_DEFAULT;
          if (rowindex == 0 && 2 <= colIndex && colIndex <= 4) {
            title = GRD_TITLE.nisu;
          } else if (rowindex == 0 && 5 <= colIndex) {
            if (newheadList[colIndex].kasankbn == 1) {
              title = GRD_TITLE.taisei;
            } else if (newheadList[colIndex].kasankbn == 2) {
              title = GRD_TITLE.kobetu;
            }
          } else {
            title = newheadList[colIndex].title;
          }
          flexGrid.columnHeaders.setCellData(rowindex, colIndex, title);
        }
      }
      let kasancnt = this.kasanList.filter((x) => x.bunkbn == 1).length - 1;
      // セル結合
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 0, 4),
        new wjGrid.CellRange(0, 5, 0, 5 + kasancnt),
        new wjGrid.CellRange(
          0,
          5 + kasancnt + 1,
          0,
          flexGrid.columns.length - 1
        ),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0, 0, 1, 1),
        new wjGrid.CellRange(0, 2, 0, 4),
        new wjGrid.CellRange(1, 2, 1, 4),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let f = 0; f < footerRanges.length; f++) {
            if (footerRanges[f].contains(r, c)) {
              return footerRanges[f];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
      flexGrid.columnFooters.setCellData(0, 0, GRD_TITLE.total);
      flexGrid.columnFooters.setCellData(0, 2, GRD_TITLE.totalNinzu);
      flexGrid.columnFooters.setCellData(1, 2, GRD_TITLE.totalTani);

      if (this.viewdata.length > 0) {
        // 合計設定
        for (let colIndex = 5; colIndex < flexGrid.columns.length; colIndex++) {
          flexGrid.columnFooters.setCellData(
            0,
            colIndex,
            this.viewdata.filter(
              (x) => x.kbn == 1 || x.val == flexGrid.columns[colIndex].binding
            ).length
          );
          flexGrid.columnFooters.setCellData(
            1,
            colIndex,
            this.viewdata
              .filter((x) => x.kbn == 2)
              .reduce((prev, item) => {
                return prev + item[flexGrid.columns[colIndex].binding];
              }, 0)
          );
        }
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      this.selKasan = Number(ls.getlocalStorageEncript(ls.KEY.Kasan));
    },
    onFormatItem(flexGrid, e) {
      flexGrid.beginUpdate();
      e.cell.style.writingMode = STYLE_DEFAULT;
      e.cell.style.textAlign = STYLE_DEFAULT;
      e.cell.style.fontWeight = STYLE_DEFAULT;
      e.cell.style.justifyContent = STYLE_DEFAULT;
      e.cell.style.alignItems = STYLE_DEFAULT;
      e.cell.style.borderRight = STYLE_DEFAULT;
      e.cell.style.borderBottom = STYLE_DEFAULT;
      e.cell.style.borderTop = STYLE_DEFAULT;
      e.cell.style.backgroundColor = STYLE_DEFAULT;

      if (
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 2) ||
        (e.panel == flexGrid.columnHeaders && e.row == 0 && e.col == 5) ||
        (e.panel == flexGrid.columnFooters && e.col == 2) ||
        4 == e.col ||
        (4 < e.col &&
          e.col < flexGrid.columns.length - 1 &&
          flexGrid.columnHeaders.getCellData(0, e.col, false) !=
            flexGrid.columnHeaders.getCellData(0, e.col + 1, false))
      ) {
        e.cell.style.borderRight = STYLE_BORDER_SOLID;
      }
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col == 0 || (e.row == 1 && 2 <= e.col)) {
          // 縦書きで右から左へ
          e.cell.style.writingMode = STYLE_WRITING_MODE_TATEGEKI;
        }
      } else if (e.panel == flexGrid.cells) {
        if (e.row == flexGrid.rows.length - 1) {
          e.cell.style.borderBottom = 0;
        } else {
          let tmpitem = e.panel.rows[e.row].dataItem;
          if (tmpitem.kbn == 1) {
            if (e.col <= 4) {
              e.cell.style.borderBottom = 0;
            }
          } else {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          }
        }
      } else if (e.panel == flexGrid.columnFooters) {
        if (e.row == 0) {
          e.cell.style.borderTop = STYLE_BORDER_SOLID;
        }
        if (5 <= e.col) {
          e.cell.style.fontWeight = STYLE_NORMAL;
          e.cell.style.textAlign = STYLE_ALIGN_RIGHT;
          e.cell.style.justifyContent = STYLE_ALIGN_RIGHT;
          e.cell.style.alignItems = STYLE_ALIGN_RIGHT;
        }
        e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
      }
      // 加算絞込の場合は背景色を変える
      if (
        e.panel == flexGrid.columnHeaders ||
        e.panel == flexGrid.cells ||
        e.panel == flexGrid.columnFooters
      ) {
        if (!(e.panel == flexGrid.columnHeaders && e.row == 0)) {
          if (flexGrid.columns[e.col].binding == String(this.selKasan)) {
            if (
              e.panel == flexGrid.columnHeaders ||
              e.panel == flexGrid.columnFooters
            ) {
              e.cell.style.backgroundColor =
                sysConst.COLOR.gridHeaderRemarkBackground;
            } else {
              e.cell.style.backgroundColor =
                sysConst.COLOR.gridRemarkBackground;
            }
          }
        }
      }
      flexGrid.endUpdate();
    },
    searchClicked() {
      kasanKoumokuIcrn(this.kasanList).then((result) => {
        // データ取得
        this.viewdataAll = result;
        this.userFilter();
      });
    },
    sortUser(sortType) {
      ls.setlocalStorageEncript(ls.KEY.Sort, sortType);
      this.sortSearch = sortType;
      this.userFilter();
    },
    onAlphabetical() {
      this.userFilter();
    },
    userFilter() {
      let tmpviewdata = this.viewdataAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      // 絞込１
      if (this.selUser == 1) {
        // 今月入所
        tmpviewdata = tmpviewdata.filter((x) => x.isNyusyo);
      } else if (this.selUser == 2) {
        // 今月退所
        tmpviewdata = tmpviewdata.filter((x) => x.isTaisyo);
      }

      //コード順でソート
      if (this.sortSearch == 0) {
        tmpviewdata.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          if (a.kbn !== b.kbn) {
            return a.kbn - b.kbn;
          }
        });
      }
      //利用者名でソート
      if (this.sortSearch == 1) {
        tmpviewdata.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          if (a.kbn !== b.kbn) {
            return a.kbn - b.kbn;
          }
        });
      }
      //受給者番号でソート
      if (this.sortSearch == 2) {
        tmpviewdata.sort((a, b) => {
          if (a.no < b.no) {
            return -1;
          }
          if (a.no > b.no) {
            return 1;
          }
          if (a.kbn !== b.kbn) {
            return a.kbn - b.kbn;
          }
        });
      }
      this.viewdata = tmpviewdata;
    },
    //ヘッダメニューのサービス初回選択 検索ボタン
    parentServiceSelect(serviceArgument) {
      console.log(serviceArgument);
      this.viewdataAll = [];
      this.viewdata = [];
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#KasanKoumokuIcrn {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .rowStyle {
    height: 25px;
  }
  .wj-control .wj-input {
    width: 250px;
  }
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  #kasanKoumokuIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 98vw;
    min-width: 1300px;
    height: 63vh;
    // max-width: 100%;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
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
  }

  .v-btn-toggle > .v-btn {
    width: 100px;
    height: 25px;
  }
  div.customCombobox {
    position: relative;
    width: 300px !important;
    height: 25px !important;
    &.customCombobox {
      width: 160px !important;
      div {
        text-align: left;
      }
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
      height: 21px !important;
      padding: 0;
      span {
        height: 21px !important;
        margin-top: 8px;
      }
      &.wj-form-control {
        position: absolute;
        top: -3px;
        width: 100%;
        padding-top: 4px;
        padding-left: 2px;
      }
    }
    input {
      height: 25px !important;
    }
  }
}
</style>
