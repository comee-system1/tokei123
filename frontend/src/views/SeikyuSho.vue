<template>
  <div id="seikyu-sho">
    <ServiceSelection :seikyuflag="true" :seikyushoflag="true">
    </ServiceSelection>
    <v-container class="user-info ma-0 pa-0 ml-1" fluid>
      <v-row style="height: 25px" class="ma-0 pa-0 mt-1" no-gutters>
        <!-- <div class="service-selecter"> -->
        <label>市町村</label>
        <wj-menu
          id="comboFilters1"
          class="customCombobox"
          :itemsSource="sichosonList"
          :initialized="initComboFilters"
          :isRequired="true"
          style="width: 200px"
          selectedValuePath="key"
          displayMemberPath="text"
          :itemClicked="onSichosonClicked"
        >
        </wj-menu>
        <v-btn
          class="pa-1 ml-1"
          style="width: 75px; height: 25px"
          small
          @click="searchClicked"
          >検索</v-btn
        >
        <!-- </div> -->
        <!-- <div class="print-selecter"> -->
        <div id="printarea">
          <label>印刷種類</label>
          <v-btn-toggle mandatory class="print-toggle ml-1">
            <v-btn small color="secondary" dark outlined>請求書</v-btn>
            <v-btn small color="secondary" dark outlined>一 覧</v-btn>
          </v-btn-toggle>
          <!-- </div> -->
          <wj-menu
            class="ml-1"
            id="printCombo"
            :header="'全選択/全解除'"
            :itemClicked="onselectedIndexChanged"
          >
            <wj-menu-item><b>印刷を全選択</b></wj-menu-item>
            <wj-menu-item><b>印刷を全解除</b></wj-menu-item>
          </wj-menu>
        </div>
      </v-row>
      <v-row no-gutters class="mt-1">
        <wj-flex-grid
          id="detailGrid"
          :itemsSource="detailGridData"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :initialized="onInitializeDetailGrid"
          :allowResizing="false"
          :allowDragging="false"
          :autoRowHeights="true"
          :allowPinning="false"
          :allowSorting="false"
        >
          <wj-flex-grid-column
            header="市町村名"
            binding="sname"
            :width="100"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="区分"
            binding="svcname"
            :width="220"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="件数"
            binding="kensuA"
            :width="40"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="単位数"
            binding="tanisu"
            :width="70"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="費用合計"
            binding="hiyoA"
            :width="90"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="A 給付費請求額"
            binding="kyufuA"
            :width="120"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者負担額"
            binding="riyo"
            :width="100"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="自治体助成額"
            binding="jichitai"
            :width="100"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="件数"
            binding="kensuB"
            :width="40"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="費用合計"
            binding="hiyoB"
            :width="100"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="B 給付費請求額"
            binding="kyufuB"
            :width="100"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="A+B 請求金額"
            binding="seikyu"
            :width="100"
            :wordWrap="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="印刷"
            binding="print"
            :width="40"
            :wordWrap="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import { getOriginalDetailData } from '../data/SeikyuShoData.js';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import sysConst from '@/utiles/const';

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());
const darkLine = '1px solid';
const boldLine = '1px solid';

export default {
  components: {
    ServiceSelection,
  },
  data() {
    return {
      sichosonList: [
        { key: 0, text: '指定なし' },
        { key: 1, text: '東経市' },
        { key: 2, text: '西経市' },
        { key: 3, text: '南経市' },
        { key: 4, text: '北経市' },
      ],
      detailGridData: apiResult['dummy'],
      isDroppedDown: false,
      selectedSichoson: '指定なし',
    };
  },

  mounted() {
    this.$nextTick(function () {
      let div = document.getElementById('printarea');
      div.style.position = 'fixed';
      div.style.left = '820px';
    });
  },
  methods: {
    initComboFilters(combo) {
      let _self = this;
      combo.header = this.sichosonList[0].text;
      combo.selectedIndexChanged.addHandler(function (sender) {
        if (sender.selectedIndex != -1) {
          combo.header = _self.sichosonList[sender.selectedIndex].text;
        }
      });
    },
    onSichosonIndexChanged(s) {
      this.selectedSichoson = s.text;
    },
    onSichosonClicked(s) {
      s.header = this.sichosonList[s.selectedIndex].text;
      this.selectedSichoson = this.sichosonList[s.selectedIndex].text;
      let f = document.activeElement;
      f.blur();
    },
    searchClicked() {
      let data = apiResult['dummy'];
      let newData = [];
      let sort = this.selectedSichoson;

      if (sort == '指定なし') {
        newData = apiResult['dummy'];
      } else {
        data.forEach(function (value) {
          if (sort == value.sname) {
            newData.push(value);
          }
        });
      }
      this.detailGridData = newData;
    },
    onselectedIndexChanged(s) {
      // 全選択・全解除の選択値を取得して書き換え
      let data = this.detailGridData;
      let newData = [];
      data.forEach(function (value) {
        // 印刷チェックの制御
        if (s.selectedIndex == '0') {
          value.print = '〇';
        }
        if (s.selectedIndex == '1') {
          value.print = '';
        }
        newData.push(value);
      });
      this.detailGridData = newData;
      s.selectedIndex = 0; //どの値を選択しても初期状態に戻す
    },
    onInitializeDetailGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // 空のヘッダー行とフッター行を追加/////////////////////////////////////////////
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      let headerpanel = flexGrid.columnHeaders;
      let footerPanel = flexGrid.columnFooters;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 0, 7),
        new wjGrid.CellRange(0, 8, 0, 10),
        new wjGrid.CellRange(0, 11, 1, 11),
        new wjGrid.CellRange(0, 12, 1, 12),
      ];
      let cellRanges = this.getCellRanges(this.detailGridData);
      let borderRowCol1 = [];
      let borderRow = [];
      cellRanges.forEach((range) => {
        if (range._col == 0) {
          borderRowCol1.push(range._row);
          borderRow.push(range._row2);
        }
      });
      let footerRanges = [new wjGrid.CellRange(0, 0, 0, 1)];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          for (let i = 0; i < cellRanges.length; i++) {
            if (cellRanges[i].contains(r, c)) {
              return cellRanges[i];
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

      // 改行指定不要のヘッダー・フッターの内容を設定する
      // ヘッダー0行目
      headerpanel.setCellData(0, 0, '市町村名');
      headerpanel.setCellData(0, 1, '区分');
      headerpanel.setCellData(0, 2, '介護給付費・訓練等給付費');
      headerpanel.setCellData(0, 8, '特定障害者特別給付費');
      headerpanel.setCellData(0, 12, '印刷');

      // フッター0行目
      footerPanel.setCellData(0, 0, '合計');

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 25;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // ヘッダーの改行位置の設定
          if (r == 0 && c == 11) {
            cell.innerHTML = 'A + B<br/>請求金額';
          }

          if (r == 0 && (c == 0 || c == 1 || c == 2 || c == 8 || c == 11)) {
            s.borderRight = darkLine;
          } else if (r == 1 && c == 7) {
            s.borderRight = darkLine;
          } else if (r == 1 && (c == 5 || c == 10)) {
            s.borderLeft = boldLine;
            s.borderRight = boldLine;
            // s.borderTop = boldLine;
          }

          // if (r == 0 && (c == 0 || c == 1 || c == 11 || c == 12)) {
          //   s.borderBottom = darkLine;
          // }

          // if (c >= 2 && c <= 10) {
          //   s.borderBottom = darkLine;
          // }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          if (c == 0 || c == 1) {
            s.textAlign = 'left';
          } else if (c >= 2 && c <= 11) {
            s.textAlign = 'right';
          }

          if (c == 0 || c == 1) {
            s.borderRight = darkLine;
          } else if (c == 5 || c == 10) {
            s.borderLeft = boldLine;
            s.borderRight = boldLine;
          } else if (c == 7 || c == 11) {
            s.borderRight = darkLine;
          } else if (c == 12) {
            s.backgroundColor = sysConst.COLOR.white;
            cell.innerHTML =
              '<div class="printCell">' + cell.innerHTML + '</div>';
          } else {
            s.borderLeft = 'none';
            s.borderRight = '1px solid rgba(0,0,0,.2)';
          }

          // if (c == 0 || c == 11 || c == 12) {
          //   borderRowCol1.forEach((row) => {
          //     if (r == row) {
          //       s.borderBottom = darkLine;
          //     }
          //   });
          // } else {
          //   borderRow.forEach((row) => {
          //     if (r == row) {
          //       s.borderBottom = darkLine;
          //     }
          //   });
          //   if (borderRow.indexOf(r) == -1) {
          //     s.borderBottom = '1px solid rgba(0,0,0,.2)';
          //   }
          // }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = darkLine;
            // s.borderBottom = darkLine;
            s.textAlign = 'center';
          }

          if (c == 0 || c == 7 || c == 11) {
            s.borderRight = darkLine;
          } else if (c == 5 || c == 10) {
            s.borderLeft = boldLine;
            s.borderRight = boldLine;
            // s.borderBottom = boldLine;
          }

          if (c >= 2 && c <= 11) {
            // セルを薄黄色にする
            s.backgroundColor = sysConst.COLOR.gridBackground;
            s.textAlign = 'right';
          } else if (c == 12) {
            // 空欄セルをグレーにする
            s.backgroundColor = '#cccccc';
          }
        }
      };

      //印刷箇所を押下
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        // 結合セルの先頭行
        let firstrow;
        if (e.srcElement['wj-cell-index']) {
          firstrow = e.srcElement['wj-cell-index'].row;
        } else {
          firstrow = ht.row;
        }
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 12) {
          let p = flexGrid.getCellData(firstrow, 12);
          let mark = '';
          if (p == '〇') {
            mark = '';
          }
          if (p == '') {
            mark = '〇';
          }
          _self.detailGridData[firstrow]['print'] = mark;
          flexGrid.setCellData(firstrow, 12, mark);
        }
      });

      flexGrid.formatItem.addHandler((s, e) => {
        if (e.panel.cellType == wjGrid.CellType.Cell && e.col == 12) {
          wijmo.addClass(e.cell, 'verticalCenterCustom');
        }
        if (e.panel.cellType == wjGrid.CellType.Cell && e.col == 11) {
          wijmo.addClass(e.cell, 'verticalBottomCustom');
        }
        if (e.panel.cellType == wjGrid.CellType.ColumnFooter && e.col >= 2) {
          wijmo.addClass(e.cell, 'verticalRightCustom');
        }
      });
    },
    getCellRanges(gridData) {
      let renges = [];
      let firstrow = 0;
      let lastrow = 0;
      for (let i = 0; i < gridData.length; i++) {
        if (i > 0 && i < gridData.length - 1) {
          if (gridData[i - 1]['sname'] == gridData[i]['sname']) {
            lastrow = i;
          } else if (gridData[i - 1]['sname'] != gridData[i]['sname']) {
            renges.push(new wjGrid.CellRange(firstrow, 0, lastrow, 0));
            renges.push(new wjGrid.CellRange(firstrow, 11, lastrow, 11));
            renges.push(new wjGrid.CellRange(firstrow, 12, lastrow, 12));
            firstrow = i;
            lastrow = i;
          }
        } else if (i == gridData.length - 1) {
          lastrow = i;
          renges.push(new wjGrid.CellRange(firstrow, 0, lastrow, 0));
          renges.push(new wjGrid.CellRange(firstrow, 11, lastrow, 11));
          renges.push(new wjGrid.CellRange(firstrow, 12, lastrow, 12));
        }
      }
      return renges;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#seikyu-sho {
  @media screen and (max-width: 1366px) {
    #detailGrid {
      height: 73vh;
    }
  }

  @media screen and (min-width: 1367px) {
    #detailGrid {
      height: 82vh;
    }
  }
  #detailGrid {
    width: auto;
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

  #detailGrid .wj-header:not(.verticalRightCustom) {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font_color !important;
    font-weight: normal;
  }

  .wj-flexgrid .wj-cell.verticalCenterCustom {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wj-flexgrid .wj-cell.verticalBottomCustom {
    display: flex;
    justify-content: right;
    align-items: flex-end;
  }

  .wj-flexgrid .wj-cell.verticalRightCustom {
    display: flex;
    justify-content: right;
    font-weight: normal;
  }
  .user-info {
    width: auto;
    padding: 4px;

    label:not(.labelhosoku) {
      display: inline-block;
      margin-right: 2px;
      padding-top: 2px;
      background: $view_Title_background;
      border: none;
      height: 25px;
      width: 75px;
      text-align: center;
      line-height: 20px;
    }
  }
  // .label {
  //   border-radius: 0px;
  //   display: inline-block;
  //   margin-top: 2px;
  //   margin-right: 2px;
  //   padding-top: 2px;
  //   // font-weight: bold;
  //   // background: #f0ffff;
  //   // border: 1px solid lightgray;
  //   height: 25px;
  //   width: 100px;
  //   text-align: center;
  // }

  .print-selecter {
    margin-right: 0;
    margin-left: auto;
    // label {
    //   border-radius: 0px;
    //   display: inline-block;
    //   margin-top: 2px;
    //   margin-right: 2px;
    //   padding-top: 2px;
    //   // font-weight: bold;
    //   // background: #f0ffff;
    //   // border: 1px solid lightgray;
    //   height: 25px;
    //   width: 100px;
    //   text-align: center;
    // }

    .print-toggle {
      margin-right: 10px;
    }

    .v-btn-toggle > .v-btn {
      height: 25px;
      width: 90px;
    }
  }
  .v-btn-toggle > .v-btn {
    height: 25px;
    width: 90px;
  }
  // .service-selecter {
  //   label {
  //     border-radius: 0px;
  //     display: inline-block;
  //     margin-top: 2px;
  //     margin-right: 2px;
  //     padding-top: 2px;
  //     // font-weight: bold;
  //     // background: #f0ffff;
  //     // border: 1px solid lightgray;
  //     height: 25px;
  //     width: 100px;
  //     text-align: center;
  //   }
  // }

  #printCombo {
    position: relative;
    width: 150px !important;
    height: 25px !important;
    padding: 0px;
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

  // #printCombo {
  //   width: 150px;
  //   height: 25px !important;
  //   color: $font_color !important;
  // }
  // .combo:hover {
  //   background-color: #e1e1e1;
  // }

  // .combo:focus {
  //   background-color: #fff;
  // }

  // #comboFilters_dropdown {
  //   .wj-listbox-item {
  //     background-color: $white !important;
  //     padding: 30px;
  //   }
  // }
}
// * {
//   padding: 0;
//   margin: 0;
// }

// // 仮の対応
// div#seikyu-sho .transparent {
//   visibility: hidden;
// }

// div#seikyu-sho .service-selecter {
//   label {
//     display: inline-block;
//     margin-top: 2px;
//     margin-right: 2px;
//     padding-top: 2px;
//     // font-weight: bold;
//     // background: #f0ffff;
//     border: 1px solid lightgray;
//     height: 25px;
//     width: 50px;
//     text-align: center;
//   }
// }

// div#seikyu-sho .print-selecter {
//   margin-right: 0;
//   margin-left: auto;
//   // label {
//   //   display: inline-block;
//   //   margin-top: 2px;
//   //   margin-right: 2px;
//   //   padding-top: 2px;
//   //   // font-weight: bold;
//   //   // background: #f0ffff;
//   //   border: 1px solid lightgray;
//   //   height: 25px;
//   //   width: 75px;
//   //   text-align: center;
//   // }

//   .print-toggle {
//     margin-right: 10px;
//   }

//   .v-btn-toggle > .v-btn {
//     width: 90px;
//   }
// }

// div#seikyu-sho {
//   #printCombo {
//     width: 150px;
//     color: $font_color !important;
//   }
//   .combo:hover {
//     background-color: #e1e1e1;
//   }

//   .combo:focus {
//     background-color: #fff;
//   }

//   #comboFilters_dropdown {
//     .wj-listbox-item {
//       background-color: $white !important;
//       padding: 30px;
//     }
//   }
</style>
