<template>
  <div id="KyuhuMeisaiIcrn">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      :seikyuflag="true"
    ></header-services>

    <v-container class="pa-1" fluid>
      <v-row class="rowStyle mt-0" no-gutters>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          市町村
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selSikuchoson"
          @change="onSikuchosonClicked"
          style="width: 150px"
        >
          <option v-for="val in sikuchosonList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          ソート
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div v-for="item in sortList" :key="item.val" class="radioInline">
            <input
              type="radio"
              :id="'rbKyuhuMeisaiIcrnSort-' + item.val"
              v-model="sortIndex"
              :value="item.val"
              @change="sortClicked"
            />
            <label
              :for="'rbKyuhuMeisaiIcrnSort-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
        <v-btn height="19" @click="searchClicked()">
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
        <v-btn class="ml-1" width="25" height="19" @click="filterClrclick()">
          <v-icon dense>mdi-filter-off</v-icon>
          解除
        </v-btn>
      </v-row>

      <v-row class="mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
      </v-row>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="KyuhuMeisaiIcrnGrid"
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
          :initialized="onInitialize"
          :formatItem="onFormatItem"
          :itemsSourceChanged="itemsSourceChanged"
          :itemsSource="viewdata"
        >
          <wj-flex-grid-filter
            :initialized="filterInitialized"
            :showFilterIcons="false"
          />
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
import HeaderServices from '@/components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
// import { kyuhuMeisaiIcrn } from '@backend/api/KyuhuMeisaiIcrn';

// const GRD_TITLE = {
//   Nisu: '日数',
//   SeikyugakuSyukei: '請求額集計欄',
//   Tokubetukyufu: '特別給付費',
//   Svc: 'サービス',
//   AGata: 'A型減免',
//   Seikyugaku: '請求額',
//   SvcKind: 'サービス種別',
//   KyufuhiMeisai: '給付費明細欄',
//   Total: '合計',
// };
const STYLE_DEFAULT = '';
// const STYLE_NORMAL = 'normal';
// const STYLE_BOLD = 'bold';
const STYLE_BORDER_SOLID = '1px solid';
// const STYLE_ALIGN_RIGHT = 'right';
const CSS_IMAGE = 'cell-img';

const PATH_IMG_KAKUTEI = require('@/assets/kaku_15px.png');
// let drawListTmpCnt = 0;

export default {
  components: {
    HeaderServices,
    AlphabetButton,
  },
  data() {
    return {
      headerList: [
        {
          dataname: 'kakutei',
          title: 'レ\nセ\n確\n定',
          title2: 'レ\nセ\n確\n定',
          footer: '合計',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'code',
          title: 'コード',
          title2: 'コード',
          footer: '合計',
          width: 100,
          align: 'center',
        },
        {
          dataname: 'jyukyuno',
          title: '受給者証番号',
          title2: '受給者証番号',
          footer: '合計',
          width: 100,
          align: 'center',
        },
        {
          dataname: 'dispname',
          title: '氏名',
          title2: '氏名',
          footer: '合計',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'sikuchoson',
          title: '市区町村',
          title2: '市区町村',
          footer: '合計',
          width: '1*',
          align: 'left',
        },
        {
          dataname: 'svcnaiyou',
          title: '給付費明細欄',
          title2: 'サービス内容',
          footer: '合計',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'svccode',
          title: '給付費明細欄',
          title2: 'サービス\nコード',
          footer: '合計',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'tani',
          title: '給付費明細欄',
          title2: '単位数',
          footer: '合計',
          width: '1*',
          align: 'right',
        },
        {
          dataname: 'kaisu',
          title: '給付費明細欄',
          title2: '回数',
          footer: '合計',
          width: '0.5*',
          align: 'right',
        },
        {
          dataname: 'svctani',
          title: '給付費明細欄',
          title2: 'サービス\r単位数',
          footer: '',
          width: '1*',
          align: 'right',
        },
        {
          dataname: 'tekiyou',
          title: '給付費明細欄',
          title2: '摘要',
          footer: ' ',
          width: '3*',
          align: 'left',
        },
      ],
      viewdataAll: [],
      viewdata: [],
      serviceArgument: '', // ヘッダメニューのサービス選択
      selSikuchoson: 0,
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
      ],
      sortIndex: 0,
      sortList: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
        { val: 2, name: '受給者番号' },
      ],
      filter: null,
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
  computed: {},
  methods: {
    filterInitialized: function (filter) {
      this.filter = filter;
    },
    calculateWindowHeight() {
      if (document.getElementById('KyuhuMeisaiIcrnGrid') != null) {
        document.getElementById('KyuhuMeisaiIcrnGrid').style.height =
          window.innerHeight - 180 + 'px';
      }
    },
    setPrintEvent() {
      // this.$router.app.$off('print_event_global');
      // this.$router.app.$on('print_event_global', this.printExec);
    },
    onInitialize(flexGrid) {
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filter.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filter.showFilterIcons = false;
      });
      flexGrid.beginUpdate();

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header * 2;

      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];

        col.binding = this.headerList[colIndex].dataname;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;
        if (colIndex == 1 || colIndex == 6) {
          col.allowResizing = true;
        } else {
          col.allowResizing = false;
        }
        if (col == 9) {
          col.aggregate = 'Sum';
        } else {
          col.aggregate = 'None';
        }

        if (colIndex == 0) {
          col.cssClass = CSS_IMAGE;
          col.cellTemplate = CellMaker.makeImage();
        } else {
          col.cssClass = STYLE_DEFAULT;
          col.cellTemplate = STYLE_DEFAULT;
        }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].title
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.headerList[colIndex].title2
        );
        flexGrid.columnFooters.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].footer
        );
      }

      flexGrid.endUpdate();
    },

    setImage(e, isIns) {
      if (isIns) {
        e.panel.setCellData(e.row, e.col, PATH_IMG_KAKUTEI);
      } else {
        e.panel.setCellData(e.row, e.col, '');
      }
    },
    onFormatItem(flexGrid, e) {
      e.cell.style.borderRight = STYLE_DEFAULT;
      e.cell.style.borderTop = STYLE_DEFAULT;
      e.cell.style.backgroundColor = STYLE_DEFAULT;
      if (e.col <= 4) {
        e.cell.style.borderRight = STYLE_BORDER_SOLID;
      }
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col == 0) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundRed;
        } else if (e.col <= 4) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        } else {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        }
      } else if (e.panel == flexGrid.columnFooters) {
        if (e.col <= 8) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        }
        e.cell.style.borderTop = ' double 3px black';
      }
    },

    itemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      if (flexGrid.columns.length > 0) {
        if (this.sortIndex == 2) {
          flexGrid.columns[1].visible = false;
        } else {
          flexGrid.columns[1].visible = true;
        }
        flexGrid.columns[2].visible = !flexGrid.columns[1].visible;
      }
    },
    searchClicked() {
      // kyuhuMeisaiIcrn(this.dispPageType == 0).then((result) => {
      //   // データ取得
      //   if (this.dispPageType == 0) {
      //     this.viewdataAll = result;
      //   } else {
      //     this.viewkyufudataAll = result;
      //   }
      //   this.userFilter();
      // });
    },
    onSikuchosonClicked() {
      this.userFilter();
    },
    onAlphabetical() {
      this.userFilter();
    },
    sortClicked() {
      this.userFilter();
    },
    userFilter() {
      let tmpviewdata = this.viewdataAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      //コード順でソート
      if (this.sortIndex == 0) {
        tmpviewdata.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          // 二次キーは各利用者のソートコード
          if (a.usersortorder !== b.usersortorder) {
            return a.usersortorder - b.usersortorder;
          }
        });
      }
      //利用者名でソート
      if (this.sortIndex == 1) {
        tmpviewdata.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          if (a.usersortorder !== b.usersortorder) {
            return a.usersortorder - b.usersortorder;
          }
        });
      }
      //受給者番号でソート
      if (this.sortIndex == 2) {
        tmpviewdata.sort((a, b) => {
          if (a.no < b.no) {
            return -1;
          }
          if (a.no > b.no) {
            return 1;
          }
          if (a.usersortorder !== b.usersortorder) {
            return a.usersortorder - b.usersortorder;
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
      this.viewkyufudataAll = [];
      this.viewkyufudata = [];
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#KyuhuMeisaiIcrn {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;

  #KyuhuMeisaiIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-height: 400px;
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
    .wj-glyph-filter {
      // margin-top: 10px;
      width: 3px;
      height: 3px;
    }
  }
  // .rowStyle {
  //   height: 25px;
  // }
  // span#selectUserExamNumber,
  // span#selectUserText {
  //   min-width: 150px;
  //   display: block;
  // }

  // .siborikomi-info,
  // .sort-info {
  //   position: relative;
  //   display: inline-block;
  //   border: 1px solid lightgray;
  //   width: 350px;
  //   border-radius: 10px;

  //   .wj-labeled-input {
  //     font-size: 14px;
  //     position: relative;
  //     display: inline-block;
  //     width: 120px;
  //     height: auto;
  //     max-width: 100%;
  //     margin: 0 15px 0 0px;
  //     padding: 5px 0;

  //     input[type='radio'] + label {
  //       color: black;
  //     }
  //     input[type='radio']:checked + label {
  //       color: blue;
  //       font-weight: bold;
  //     }
  //   }
  // }

  // #seikyuGrid,
  // #kyufuGrid {
  //   color: $font_color;
  //   font-size: $cell_fontsize;
  //   height: 63vh;
  //   // max-height: 1080px;
  //   .wj-header {
  //     // ヘッダのみ縦横中央寄せ
  //     color: $font_color;
  //     font-size: $cell_fontsize;
  //     // 下の4つはセット
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     text-align: center;
  //     font-weight: normal;
  //   }

  //   .wj-cell-maker {
  //     width: 15px;
  //     height: 15px;
  //   }
  //   .wj-cell {
  //     padding: 2px;
  //   }
  //   .wj-cell:not(.wj-header) {
  //     background: $grid_background;
  //   }
  //   .wj-cells
  //     .wj-row:hover
  //     .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
  //     transition: all 0s;
  //     background: $grid_hover_background;
  //   }

  //   .wj-cells .wj-cell.wj-state-multi-selected {
  //     background: $grid_selected_background;
  //     color: $grid_selected_color;
  //   }

  //   .wj-cells .wj-cell.wj-state-selected {
  //     background: $grid_selected_background;
  //     color: $grid_selected_color;
  //   }
  //   ::-webkit-scrollbar {
  //     width: 10px;
  //     height: 10px;
  //   }
  //   ::-webkit-scrollbar-track {
  //     background: $light-gray;
  //     border-radius: 0px;
  //   }
  //   ::-webkit-scrollbar-thumb {
  //     background: $brawn;
  //     border-radius: 0px;
  //   }
  // }
  // #seikyuGrid {
  //   width: auto;
  //   max-width: 1320px;
  // }
  // #kyufuGrid {
  //   width: auto;
  // }

  // .v-btn-toggle > .v-btn {
  //   width: 100px;
  //   height: 25px;
  // }
  // div.customCombobox {
  //   position: relative;
  //   width: 300px !important;
  //   height: 25px !important;
  //   &.customCombobox {
  //     width: 160px !important;
  //     div {
  //       text-align: left;
  //     }
  //   }

  //   .wj-btn.wj-btn-default {
  //     border-left: none !important;
  //   }
  //   &:hover {
  //     background-color: #e1e1e1;
  //   }
  //   &:focus {
  //     background-color: #fff;
  //   }
  //   div * {
  //     height: 21px !important;
  //     padding: 0;
  //     span {
  //       height: 21px !important;
  //       margin-top: 8px;
  //     }
  //     &.wj-form-control {
  //       position: absolute;
  //       top: -3px;
  //       width: 100%;
  //       padding-top: 4px;
  //       padding-left: 2px;
  //     }
  //   }
  //   input {
  //     height: 25px !important;
  //   }
  // }
  // #comboFilters1 {
  //   width: 125px !important;
  // }
  // #comboFilters2 {
  //   width: 200px !important;
  // }
}
</style>
