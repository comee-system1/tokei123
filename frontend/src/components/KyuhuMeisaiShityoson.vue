<template>
  <div id="kyuhumeisai-shityoson" class="d-flex">
    <wj-flex-grid
        id="kyuhumeisai-shityoson-grid"
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
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    createCell(flexGrid) {
      // セルの作成
      while (flexGrid.columns.length < 6) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 2) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.rowHeaders.columns.defaultSize = 120;
      flexGrid.columns.defaultSize = 30;
      // 助成自治体FragがFALSEの場合、助成自治体番号を非表示
      if (this.$parent.displayFlagSetting[0].jyoseijichitaiFlag === false) {
        flexGrid.rows[1].visible = false;
      } 
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
        s.lineHeight = '19px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if ((r == 0) && (c == 0)) {
            cell.innerHTML = _self.$parent.displayFlagSetting[0].shityosonBango;
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
    setShityosonData(shityosonData){
      // 市町村番号を分割して表示
      // API取得時修正
      let shityosonCodeSplit = [];
      shityosonCodeSplit = String(shityosonData['sityoid']).split('');
      for (let i = 0; i <shityosonCodeSplit.length; i++) {
        this.mainFlexGrid.setCellData(0, i, shityosonCodeSplit[i]);
        this.mainFlexGrid.setCellData(0, i, shityosonCodeSplit[i]);
        this.mainFlexGrid.setCellData(0, i, shityosonCodeSplit[i]);
      }
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

#kyuhumeisai-shityoson-grid {
  &.wj-content {
    border-right: none;
    border-bottom: none;
  }
}
</style>