<template>
  <div id="kyuhumeisai-tokuteiSyogai" class="d-flex">
    <wj-flex-grid
        id="kyuhumeisai-tokuteiSyogai-grid"
        :headersVisibility="'None'"
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
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    createCell(flexGrid) {
      // セルの作成
      while (flexGrid.columns.length < 5) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 2) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.columns[0].width = 220;
      flexGrid.columns[1].width = 80;
      flexGrid.columns[2].width = 40;
      flexGrid.columns[3].width = 100;
      flexGrid.columns[4].width = 100;
      // 疑似ヘッダーを作成
      flexGrid.columns[0].cssClass = 'create-header';
      flexGrid.rows[0].cssClass = 'create-header';
      if (this.$parent.displaySetting[1].tokuteiNissuFlag === false) {
        this.mainFlexGrid.setCellData(0, 0, '特定入所障害児食費等給付費');
        flexGrid.columns[1].visible = false;
        flexGrid.columns[2].visible = false;
      } else {
        this.mainFlexGrid.setCellData(0, 0, '特定障害者特別給付費');
      }
      this.mainFlexGrid.setCellData(0, 1, '算定日額');
      this.mainFlexGrid.setCellData(0, 2, '日数');
      this.mainFlexGrid.setCellData(0, 3, '給付費請求額');
      this.mainFlexGrid.setCellData(0, 4, '実費算定額');
      // 助成自治体FragがFALSEの場合、助成自治体番号を非表示
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
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
        if (r !== 0 || c !== 0) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if (r == 0) {
          s.textAlign = 'center';
        }
        if (r == 1) {
            s.textAlign = 'right';
            s.paddingRight = '4px'
        }
        if ((r == 0) && (c == 0)) {
            s.lineHeight = '38px'
        }
        if ((r == 0) && (c == 4)) {
            s.borderRadius = '0 4px 0 0';
        }
        if ((r == 1) && (c == 4)) {
            s.borderRadius = '0 0 4px 0';
        }
      };
    },
    /**
     * 親コンポーネントで選択したユーザーデータを表示
     */
    setTokuteiSyogaiData(tokuteiSyogaiData){
      // APIから取得したデータを表示
      // API取得時修正
      console.log(tokuteiSyogaiData)
      let l = 1;
      for (let i in tokuteiSyogaiData) {
        console.log(tokuteiSyogaiData[i])
        this.mainFlexGrid.setCellData(1, l, tokuteiSyogaiData[i]);
        l++;
      }
    },
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
#kyuhumeisai-tokuteiSyogai {
  #kyuhumeisai-tokuteiSyogai-grid {
    width: auto;
    &.wj-content {
      border-right: none;
      border-bottom: none;
    }
    .create-header {
      background-color: #eee!important;
    }
  }
}
</style>