<template>
  <div id="kyuhumeisai-kubun">
    <wj-flex-grid
        id="kyuhumeisai-kubun-grid"
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
      kinroukeizokuFlag: true,
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
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    createCell(flexGrid) {
      let jyukyusyaGridRow;
      if (this.kinroukeizokuFlag === true) {
        // 就労継続支援表示フラグがTRUEの場合3行表示
        jyukyusyaGridRow = 2;
      } else {
        // 就労継続支援表示フラグがFALSEの場合2行表示
        jyukyusyaGridRow = 1;
      }
      // セルの作成
      flexGrid.columns.push(new wjGrid.Column());

      while (flexGrid.rows.length < jyukyusyaGridRow) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      // ヘッダーを追加
      while (flexGrid.rowHeaders.columns.length < 3) {
        flexGrid.rowHeaders.columns.push(new wjGrid.Column());
      }
      flexGrid.rowHeaders.columns.defaultSize = 90;
      flexGrid.columns.defaultSize = 90;
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(1, 0, 1, 2),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
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
      let _self = this;
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        s.backgroundColor = sysConst.COLOR.selectedColor;
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
            s.borderTop = 'none';
          if ((r == 0) && (c == 2)) {
            cell.innerHTML = '地域区分';
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = '就労継続支援Ａ型事業者負担減免措置実施';
          }
          // Grid左上を隠す
          if ((r == 0 && c == 0) || (r == 0 && c == 1)){
            cell.style.display = 'none';
          }
          if ((r == 0 && c == 2) || (r == 1 && c == 0)) {
            s.borderTop = '1px solid rgba(0,0,0,.2)';
            s.borderLeft = '1px solid rgba(0,0,0,.2)';
          }
          if (r == 0) {
            s.borderBottom = 'none';
          }
          if (r == 0 && c == 2) {
            s.borderRadius = '4px 0 0 0';
          }
          if (r == 0 && c == 2) {
            s.borderTop = '1px solid rgba(0,0,0,.2)';
          }
          if (r == 1 && c == 0) {
            s.borderRadius = '4px 0 0 4px';
          }
          if (r == 1 && c == 2) {
            s.borderTop = '1px solid rgba(0,0,0,.2)';
            s.borderRadius = '0 0 4px 0';
          }
          if (_self.kinroukeizokuFlag === false) {
            // 勤労継続支援フラグがfalseだった場合デザインを修正
            if (r == 0) {
              s.borderBottom = '1px solid rgba(0,0,0,.2)';
              s.borderRadius = '4px 0 0 4px';
            }
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
          s.borderTop = '1px solid rgba(0,0,0,.2)';
          if (r == 0 && c == 0) {
            s.borderBottom = 'none';
            s.borderRadius = '0 4px 0 0';
          }
          if (r == 1 && c == 0) {
            s.borderRadius = '0  0 4px 0';
          }
          if (_self.kinroukeizokuFlag === false) {
            // 勤労継続支援フラグがfalseだった場合デザインを修正
            if (r == 0) {
              s.borderBottom = '1px solid rgba(0,0,0,.2)';
              s.borderRadius = '0 4px 4px 0';
            }
          }
        }
      };
    },
    /**
     * 親コンポーネントで選択したユーザーデータを加工し表示
     */
    setKubunData(kubunData){
      // API取得時修正
      // 地域区分
      console.log(kubunData)
      this.mainFlexGrid.setCellData(0, 0, kubunData['tiikikubun']);

      
      // 就労継続支援
      // API取得時修正
      if (this.kinroukeizokuFlag) {
        this.mainFlexGrid.setCellData(1, 0, kubunData['kinroukeizokushien']);
      }
    },
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#kyuhumeisai-kubun-grid {
  // width: 350px;
  &.wj-content {
    border: none;
  }
}
</style>