<template>
  <div id="kyuhumeisai-nittyu" class="d-flex">
    <wj-flex-grid
        id="kyuhumeisai-nittyu-grid"
        :headersVisibility="'Row'"
        :alternatingRowStep="0"
        :initialized="onInitialized"
        :isReadOnly="true"
        :deferResizing="false"
        :allowAddNew="false"
        :allowDelete="false"
        :allowDragging="false"
        :allowPinning="false"
        :allowResizing="false"
        :allowSorting="false"
      >
    </wj-flex-grid>
  </div>
</template>
<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
export default {
  data() {
    return {
      mainFlexGrid:[],
    };
  },
  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // セルの作成と文字列挿入
      this.createCell(flexGrid);
      // セルのマージ
      if (this.$parent.dataSetFlag) {
        this.setnittyuData(flexGrid);
      }
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    createCell(flexGrid) {
      // ヘッダーの作成
      flexGrid.rowHeaders.columns.insert(0, new wjGrid.Column());
      console.log(flexGrid.rowHeaders)
      flexGrid.rowHeaders.columns[0].width = 100;
      flexGrid.rowHeaders.columns[1].width = 120;
      // セルの作成
      while (flexGrid.columns.length < 24) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 2) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.columns.defaultSize = 30;
      // 疑似ヘッダーを作成
      flexGrid.columns[0].cssClass = 'create-header';
      flexGrid.columns[14].cssClass = 'create-header';
    },
    /**
     * 取得したデータを挿入
     */
    setnittyuData(flexGrid) {
      // 地域区分
      console.log(123)
      let kmadn = this.$parent.kyuhumeisaiApiData.nityuksn;
      let noSplit = kmadn.jjigyono.split('');
      console.log(noSplit)
      for (let i = 4; i < noSplit.length + 4; i++) {
        flexGrid.setCellData(0, i, noSplit[i - 4]);
      }
      flexGrid.setCellData(0, 19, kmadn.nissu);
      flexGrid.setCellData(1, 3, kmadn.kjgyoname);
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
      ];
      let cellRanges = [
        new wjGrid.CellRange(0, 0, 0, 3),
        new wjGrid.CellRange(0, 14, 0, 18),
        new wjGrid.CellRange(0, 19, 0, 20),
        new wjGrid.CellRange(1, 0, 1, 2),
        new wjGrid.CellRange(1, 3, 1, 23),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
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
      
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          s.borderTop = '1px solid rgba(0,0,0,.2)';
          s.backgroundColor = sysConst.COLOR.segridBackgroundlectedColor;
          if ((r == 0) && (c == 0)) {
            // 枠の補填、文字挿入
            s.borderLeft = '1px solid rgba(0,0,0,.2)';
            s.borderRadius = '4px 0 0 4px';
            cell.innerHTML = '日中介護等<br/>支援加算欄';
          }
          if ((r == 0) && (c == 1)) {
            cell.innerHTML = '日中活動先事業所';
            s.lineHeight = '38px'
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if (r == 0) {
            // 上部線補填
            s.borderTop = '1px solid rgba(0,0,0,.2)';
          }
          if ((r == 0) && (20 < c)) {
            // 一部セルを非表示
            s.display = 'None';
          }
          // 疑似ヘッダー文字の挿入
          if ((r == 0) && (c == 0)) {
            cell.innerHTML = '指定事業所番号';
          }
          if ((r == 0) && (c == 14)) {
            cell.innerHTML = '該当事業所への通所日数';
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = '事業所名称';
          }
          // borderRadiusを修正
          if ((r == 0) && (c == 19)) {
            s.borderRadius = '0 4px 0 0';
          } 
          if ((r == 1) && (c == 3)) {
            s.borderTop = '1px solid rgba(0,0,0,.2)';
            s.borderRadius = '0 4px 4px 0';
            s.height = '20px';
            s.top = '18px';
          }
        }
      };
    },
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
#kyuhumeisai-nittyu {
  #kyuhumeisai-nittyu-grid {
    &.wj-content {
      border: none
    }
    .create-header {
      background-color: #eee!important;
    }
  }
}
</style>