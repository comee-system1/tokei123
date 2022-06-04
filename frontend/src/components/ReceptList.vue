<template>
  <div id="recept-list" class="mt-n5">
    <v-row no-gutters>
      <v-col cols="8">
        <wj-flex-grid
          id="grid_recept"
          :initialized="onInitialized"
          :allowMerging="6"
          :headersVisibility="'Column'"
          :alternatingRowStep="0"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :itemsSource="receptData"
          :style="gridHeight"
        >
          <wj-flex-grid-column
            :binding="'sityoson'"
            :header="'市町村名'"
            align="center"
            valign="middle"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'jyukyusyaBango'"
            :header="'受給者番号'"
            align="center"
            :width="100"
            format="'f0'"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'riyousyamei'"
            :header="'利用者名'"
            align="center"
            width="3*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'jyougenicon'"
            :header="'上限額\n管理事業所'"
            :multiLine="true"
            align="center"
            :width="30"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'jyougen'"
            :header="'上限額\n管理事業所'"
            :multiLine="true"
            align="center"
            width="3*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'riyosyafutan'"
            :header="'利用者負担\n上限月額'"
            :multiLine="true"
            align="center"
            :width="80"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            v-for="(n, k) in teikyoService"
            :key="k"
            align="center"
            :header="n.key + '\n' + n.value"
            :width="40"
            :isReadOnly="true"
            :multiLine="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'reseSyukei'"
            :header="'レセプト集計'"
            :multiLine="true"
            align="center"
            :width="30"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'syukeibi'"
            :header="'集計日'"
            :multiLine="true"
            align="center"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tanto'"
            :header="'担当者'"
            :multiLine="true"
            align="center"
            :width="60"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'jyougenzumi'"
            :header="'上限管理済'"
            :multiLine="true"
            align="center"
            :width="30"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'resekaku'"
            :header="'レセプト確定'"
            :multiLine="true"
            align="center"
            :width="30"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
      <v-col class="ml-1"> allData </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as wjGrid from '@grapecity/wijmo.grid';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      receptData: [],
      mainFlexGrid: [],
      teikyoService: this.getTeikyoService(),
      basicPos: 6, //基本情報の列数
      gridHeight: '', // グリッドの高さ
    };
  },
  components: {},
  mounted() {
    this.handleResize();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 54;
      if (height > 800) {
        ht = 67;
      } else if (height > 700) {
        ht = 58;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },

    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;

      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      this.createHeaderMerge(flexGrid);
    },
    /************************
     * 提供サービス
     */
    getTeikyoService() {
      let teikyoService = [
        {
          key: 22,
          value: '生活介護',
        },
        {
          key: 24,
          value: '短期入所',
        },
        {
          key: 32,
          value: '入所支援',
        },
      ];
      return teikyoService;
    },
    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      let receptPos = this.basicPos + this.teikyoService.length;
      panel.rows.splice(0, 0, extraRow);
      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(0, 6, '提供サービス');
      panel.setCellData(0, receptPos, 'レセプト集計');
      panel.setCellData(0, receptPos + 1, '集計済');
      panel.setCellData(0, receptPos + 3, '上限額管理済');
      panel.setCellData(0, receptPos + 4, 'レセプト確定');

      flexGrid.columnHeaders.rows[1].height = 90;
      flexGrid.rows.defaultSize = 20;
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let receptPos = this.basicPos + this.teikyoService.length;
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5), // 基本情報
        new wjGrid.CellRange(1, 3, 1, 4), // 上限額管理事務所
        new wjGrid.CellRange(0, receptPos, 1, receptPos), // レセプト
        new wjGrid.CellRange(0, receptPos + 1, 0, receptPos + 2), // 集計済
        new wjGrid.CellRange(0, receptPos + 3, 1, receptPos + 3), // 集計済
        new wjGrid.CellRange(0, receptPos + 4, 1, receptPos + 4), // 集計済
        new wjGrid.CellRange(
          0,
          this.basicPos,
          0,
          this.teikyoService.length + this.basicPos - 1
        ), // 提供サービス
      ];
      let mm = new wjGrid.MergeManager(flexGrid);
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#recept-list {
  div#grid_recept {
    .wj-flexgrid .wj-cell {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: normal;
      padding: 0px;
    }

    .wj-header.wj-cell {
      font-size: 14px;
      text-align: center !important;
      padding: 4px 6px 3px 6px;
      font-weight: normal;
      overflow: visible;
      z-index: 6;
      vertical-align: middle;
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .wj-cell.wj-state-selected {
      color: $font_color;
    }

    .wj-flexgrid .wj-cell.wj-align-center {
      justify-content: center;
    }

    .wj-cell.edited-cell {
      background-color: pink !important;
    }

    .vertical {
      text-orientation: upright;
      -webkit-writing-mode: vertical-rl;
      -ms-writing-mode: tb-rl;
      writing-mode: vertical-rl;
      letter-spacing: 0.2em;
      text-align: center;
    }
  }
}
.wj-grid-listbox {
  max-height: 100 !important;
  font-size: 12px;
}
</style>