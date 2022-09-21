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
      if (this.$parent.dataSetFlag) {
        // 取得データの挿入
        this.setShityosonData(flexGrid);
      }
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
      if (this.$parent.displaySetting[1].jyoseijichitaiFlag === false) {
        flexGrid.rows[1].visible = false;
      } 
    },
    /**
     * 取得したデータを挿入
     */
    setShityosonData(flexGrid) {
      // API取得時修正
      // 市町村番号を分割して表示
      let pkmk = this.$parent.kyuhumeisaiApiData.kojin;
      let splitShichoson = [];
      splitShichoson = pkmk.shichosoncd.split('');
      for (let i = 0; i < splitShichoson.length; i++) {
        flexGrid.setCellData(0, i, splitShichoson[i]);
      }
      // 助成自治体番号を分割して表示
      let splitJyoseiid = [];
      splitJyoseiid = pkmk.jyoseiid.split('');
      for (let l = 0; l < splitJyoseiid.length; l++) {
        flexGrid.setCellData(1, l, splitJyoseiid[l]);
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
            if (_self.$parent.displaySetting[1].todofukenFlag) {
              cell.innerHTML = '都道府県等番号';
            } else {
              cell.innerHTML = '市町村番号';
            }
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