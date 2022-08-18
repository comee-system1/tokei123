<template>
  <div id="kyuhumeisai-jigyosyo" class="d-flex">
    <wj-flex-grid
        id="kyuhumeisai-jigyosyo-grid"
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
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    createCell(flexGrid) {
      // セルの作成
      while (flexGrid.columns.length < 10) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 2) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.rowHeaders.columns.defaultSize = 200;
      flexGrid.columns.defaultSize = 30;
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1, 0, 1, 9),
        new wjGrid.CellRange(2, 0, 2, 9),
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
      let _self = this;
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        s.lineHeight = '19px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if ((r == 0) && (c == 0)) {
           if(_self.$parent.displaySetting[1].tourokuJigyosyoFlag) {
              cell.innerHTML = '登録事業所番号';
            } else {
              cell.innerHTML = '指定事業所番号';
            }
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = '事業者名';
            s.borderRadius = '0 0 0 4px';
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((r == 0) && (c == 9)) {
            s.borderRadius = '0 4px 0 0';
          }
          if ((r == 1) || (r == 2)) {
            s.textAlign = 'left';
            s.paddingLeft = '4px';
            s.borderRadius = '0 0 4px 0';
          }
        }
      };
    },
    /**
     * 親コンポーネントで選択したユーザーデータを加工し表示
     */
    setJigyosyoData(jigyosyoData){
      // 受給者証番号を分割して表示
      let jimusyoBangoeSplit = [];
      jimusyoBangoeSplit = jigyosyoData['jimusyoBango'].split('');
      for (let i = 0; i < jimusyoBangoeSplit.length -1; i++) {
        // 暫定上記繰り返しの-1は後に修正
        this.mainFlexGrid.setCellData(0, i, jimusyoBangoeSplit[i]);
      }

      // // 事業者名を表示
      this.mainFlexGrid.setCellData(1, 0, jigyosyoData['serviceJigyo']);
    },
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#kyuhumeisai-jigyosyo-grid {
  &.wj-content {
    border-right: none;
    border-bottom: none;
  }
}
</style>