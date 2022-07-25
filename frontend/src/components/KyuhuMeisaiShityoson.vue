<template>
  <div id="kyuhumeisai-shityoson" class="d-flex justify-end">
    <wj-flex-grid
        id="kyuhumeisai-shityoso-grid"
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
      jyoseijichitaiFlag: true,
      mainFlexGrid:[],
      shityosonGridData:[],
      selectUserData:[]
    };
  },
  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // セルの作成と文字列挿入
      this.createCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    createCell(flexGrid) {
      let jyukyusyaGridRow;
      if (this.jyoseijichitaiFlag === true) {
        // 助成自治体表示フラグがTRUEの場合3行表示
        jyukyusyaGridRow = 2;
      } else {
        // 助成自治体表示フラグがFALSEの場合2行表示
        jyukyusyaGridRow = 1;
      }
      // セルの作成
      while (flexGrid.columns.length < 6) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < jyukyusyaGridRow) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.rowHeaders.columns.defaultSize = 150;
      flexGrid.columns.defaultSize = 20;
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
        s.backgroundColor = sysConst.COLOR.selectedColor;
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if ((r == 0) && (c == 0)) {
            cell.innerHTML = '市町村番号';
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = '助成自治体番号';
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
        }
      };
    },
    /**
     * 親コンポーネントで選択したユーザーデータを加工し表示
     */
    setShityosonCode(selectUserData){
      // 市町村番号を分割して表示
      // API取得時修正
      let shityosonCodeSplit = [];
      console.log(selectUserData)
      shityosonCodeSplit = String(selectUserData['sityoid']).split('');
      this.mainFlexGrid.setCellData(0, 0, shityosonCodeSplit[0]);
      this.mainFlexGrid.setCellData(0, 1, shityosonCodeSplit[1]);
      this.mainFlexGrid.setCellData(0, 2, shityosonCodeSplit[2]);
      this.mainFlexGrid.setCellData(0, 3, '0');
      this.mainFlexGrid.setCellData(0, 4, '0');
      this.mainFlexGrid.setCellData(0, 5, '0');

      
      // 助成自治体番号を分割して表示
      // API取得時修正
      this.mainFlexGrid.setCellData(1, 0, '0');
      this.mainFlexGrid.setCellData(1, 1, '1');
      this.mainFlexGrid.setCellData(1, 2, '2');
      this.mainFlexGrid.setCellData(1, 3, '3');
      this.mainFlexGrid.setCellData(1, 4, '4');
      this.mainFlexGrid.setCellData(1, 5, '5');
    },
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#kyuhumeisai-shityoso-grid {
  width: 272px;
  &.wj-content {
    border-right: none;
    border-bottom: none;
  }
}
</style>