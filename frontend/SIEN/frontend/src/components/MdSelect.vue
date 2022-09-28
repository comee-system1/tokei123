<template>
  <div id="mdSelect">
    <v-container class="pa-0" fluid>
      <wj-flex-grid
        id="dateIcrnGrid"
        :headersVisibility="'None'"
        :autoGenerateColumns="false"
        :allowAddNew="false"
        :allowDelete="false"
        :allowPinning="false"
        :allowMerging="'AllHeaders'"
        :allowResizing="false"
        :allowSorting="false"
        :allowDragging="false"
        :selectionMode="'Row'"
        :isReadOnly="true"
        :initialized="onInitializeDateIcrnGrid"
        :formatItem="onFormatItemDateIcrn"
        :itemsSourceChanging="onItemsSourceChanging"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="dateData"
      >
      </wj-flex-grid>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
const NONE = 'none';
const grdRowheight = 17;

export default {
  data() {
    return {
      dateHeaderList: [
        {
          dataname: 'day',
          title: '',
          width: '*',
          align: 'center',
        },
        {
          dataname: 'youbi',
          title: '',
          width: '*',
          align: 'center',
        },
      ],
      dateData: [],
      kikanYm: '',
    };
  },
  methods: {
    onInitializeDateIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          this.$emit('dateSelect', flexGrid.cells.rows[ht.row].dataItem);
        }
      });

      // ヘッダの追加と設定
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.dateHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.binding = this.dateHeaderList[colIndex].dataname;
        col.width = this.dateHeaderList[colIndex].width;
        col.align = this.dateHeaderList[colIndex].align;
      }

      flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.cells.rows.defaultSize = grdRowheight;
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onFormatItemDateIcrn(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = '';
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (tmpitem.youbi == '土') {
          e.cell.innerHTML =
            '<div class="v-center">' +
            '<div class="saturday">' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>' +
            '</div>';
        } else if (tmpitem.youbi == '日') {
          e.cell.innerHTML =
            '<div class="v-center ">' +
            '<div class="sunday">' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>' +
            '</div>';
          e.cell.style.borderBottom = '1px solid';
        } else {
          e.cell.innerHTML =
            '<div class="v-center">' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
        if (e.row == flexGrid.rows.length - 1 && flexGrid.rows.length == 31) {
          e.cell.style.borderBottom = NONE;
        }
      }
    },
    loadDateData() {
      let tmpDays = this.kikanYm.clone();
      let tmpsoudanCountViewData = [];
      let daycnt = tmpDays.daysInMonth();
      let youbi = '';
      for (let i = 1; i <= daycnt; i++) {
        switch (tmpDays.day()) {
          case 0:
            youbi = '日';
            break;
          case 1:
            youbi = '月';
            break;
          case 2:
            youbi = '火';
            break;
          case 3:
            youbi = '水';
            break;
          case 4:
            youbi = '木';
            break;
          case 5:
            youbi = '金';
            break;
          case 6:
            youbi = '土';
            break;
        }
        tmpsoudanCountViewData.push({
          day: i,
          youbi: youbi,
        });
        tmpDays = tmpDays.add(1, 'd');
      }

      return tmpsoudanCountViewData;
    },
    setYm(picker) {
      this.kikanYm = dayjs(picker);
      this.dateData = this.loadDateData();
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#mdSelect {
  #dateIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
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
  }
  #dateIcrnGrid {
    // font-size: 12px;
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    height: auto;
    min-height: 480px;
    // max-height: 550px;
    .naiyouTitle {
      color: blue;
    }
    .wj-cell .v-center {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      white-space: pre-wrap;
      padding-top: 2px;
      > .saturday {
        color: blue;
      }
      > .sunday {
        color: red;
      }
    }
  }
}
</style>
