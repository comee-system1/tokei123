<template>
  <div id="kyuhumeisai-list">
    <wj-flex-grid
      id="kyuhumeisai-list-grid"
      :initialized="onInitialized"
      :headersVisibility="'All'"
      :isReadOnly="true"
      :deferResizing="false"
      :allowAddNew="false"
      :allowDelete="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowResizing="false"
      :allowSorting="false"
      ><div class="kyuhumeisai-list-title">給付明細欄</div>
      <wj-flex-grid-column
        :binding="'service'"
        :header="'サービス内容'"
        :width="400"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicecode1'"
        :header="'サービスコード'"
        :width="20"
        allowMerging="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicecode2'"
        :width="20"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicecode3'"
        :width="20"
        allowMerging="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicecode4'"
        :width="20"
        allowMerging="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicecode5'"
        :width="20"
        allowMerging="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicecode6'"
        :width="20"
        allowMerging="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'tanisuu'"
        :header="'単位数'"
        :width="80"
        :format="'n0'"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kaisuu'"
        :header="'回数'"
        :width="40"
        :format="'n0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'servicetanisuu'"
        :header="'サービス単位数'"
        align="center"
        :width="100"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'tekiyou'"
        :header="'摘要'"
        :width="280"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      meisaiListData: [],
    };
  },
  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      if (this.$parent.dataSetFlag) {
        this.setMeisaiListData(flexGrid);
      } else {
        // 初回表示空セル表示
        this.setEmptyMeisaiListData(flexGrid);
      }
      // セルのマージ
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * 初回表示、空配列を作成し表示
     */
    setEmptyMeisaiListData(flexGrid) {
      let meisaiListData = [];
      // 初回空データ表示
      for (let f = 0; meisaiListData.length < 12; f++) {
        meisaiListData.push({
          service: '',
          servicecode1: '',
          servicecode2: '',
          servicecode3: '',
          servicecode4: '',
          servicecode5: '',
          servicecode6: '',
          tanisuu: '',
          kaisuu: '',
          servicetanisuu: '',
          tekiyou: '',
        });
      }
      this.meisaiListData = meisaiListData;
      flexGrid.itemsSource = this.meisaiListData;
    },
    /**************
     *
     * 取得したデータをセット
     */
    setMeisaiListData(flexGrid) {
      let meisaiListData = [];
      meisaiListData = this.$parent.meisaiListData;
      // 空行を追加（一番下のセルは空行）
      meisaiListData.push({
        code: '',
        name: '',
        service: '',
        servicecode1: '',
        servicecode2: '',
        servicecode3: '',
        servicecode4: '',
        servicecode5: '',
        servicecode6: '',
        tanisuu: '',
        kaisuu: '',
        servicetanisuu: '',
        tekiyou: '',
      });
      // 表示数12未満だった場合、空の行を追加
      if (meisaiListData.length < 12) {
        for (let i = 0; meisaiListData.length < 12; i++) {
          meisaiListData.push({
            service: '',
            servicecode1: '',
            servicecode2: '',
            servicecode3: '',
            servicecode4: '',
            servicecode5: '',
            servicecode6: '',
            tanisuu: '',
            kaisuu: '',
            servicetanisuu: '',
            tekiyou: '',
          });
        }
      }
      this.meisaiListData = meisaiListData;
      flexGrid.itemsSource = this.meisaiListData;
    },
    /**************
     *
     *セルのマージ
     */
    mergeCell(flexGrid) {
      let headerColumnRanges = [new wjGrid.CellRange(0, 1, 0, 6)];
      let griddataCount = this.meisaiListData.length;
      let headerRowRanges = [new wjGrid.CellRange(0, 0, griddataCount - 1, 0)];
      let mm = new wjGrid.MergeManager();

      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerColumnRanges.length; h++) {
            if (headerColumnRanges[h].contains(r, c)) {
              return headerColumnRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let f = 0; f < headerRowRanges.length; f++) {
            if (headerRowRanges[f].contains(r, c)) {
              return headerRowRanges[f];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    /**
     * セルのデザイン修正
     */
    formatCell(flexGrid) {
      // グリッドのスタイルをカスタマイズ
      // ヘッダーの幅修正
      flexGrid.rowHeaders.columns.defaultSize = 20;
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        s.color = sysConst.COLOR.fontColor;
        s.backgroundColor = sysConst.COLOR.selectedColor;
        s.lineHeight = '19px';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // ヘッダー行のスタイルをカスタマイズ
          if (r === 0) {
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if (c == 10) {
            s.borderRight = 'none';
          }
        }
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          // ヘッダー列のスタイルをカスタマイズ
          if (c === 0) {
            s.borderBottom = 'none';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セルのスタイルをカスタマイズ
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if (c == 0) {
            s.textAlign = 'left';
            s.paddingLeft = '4px';
          }
          if (c == 7 || c == 9) {
            s.textAlign = 'right';
            s.paddingRight = '4px';
          }
          if (c == 10) {
            s.borderRight = 'none';
          }
        }
      };
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
// 給付明細欄グリッドの修正
#kyuhumeisai-list {
  #kyuhumeisai-list-grid {
    width: auto;
    max-height: 265px;
  }
  .wj-cell {
    color: #333;
  }
  position: relative;
  .kyuhumeisai-list-title {
    position: absolute;
    writing-mode: vertical-rl;
    top: 90px;
    z-index: 2;
    color: #333;
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
@media screen and (max-width: 1366px) {
  #kyuhumeisai-list-grid {
    max-height: 247px;
  }
}
</style>