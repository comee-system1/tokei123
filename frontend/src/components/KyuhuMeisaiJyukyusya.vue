<template>
  <div id="kyuhumeisai-jyukyusya" class="d-flex">
    <wj-flex-grid
        id="kyuhumeisai-jyukyusya-grid"
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
        this.setJyukyusyaData(flexGrid);
      }
      // セルのマージ
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成と表示設定
     */
    createCell(flexGrid) {
      // セルの作成
      while (flexGrid.columns.length < 10) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 3) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.rowHeaders.columns.defaultSize = 200;
      flexGrid.columns.defaultSize = 30;
      // 障害児FragがFALSEの場合、障害児氏名項目を非表示
      if (this.$parent.displaySetting[1].syougaijiFlag === false) {
        flexGrid.rows[2].visible = false;
      } 
    },
    /**
     * 親コンポーネントで選択したユーザーデータを加工し表示
     */
    setJyukyusyaData(flexGrid) {
      // 受給者証番号を分割して表示
      let splitCode = [];
      let pkdj = this.$parent.kyuhumeisaiData.jyukyusya
      splitCode = pkdj.jyukyuno.split('');
      for (let i = 0; i < splitCode.length; i++) {
        flexGrid.setCellData(0, i, splitCode[i]);
      }

      // 支給決定障害者氏名を表示
      flexGrid.setCellData(1, 0, pkdj.jyukyusyaName);
      if (this.$parent.displaySetting[1].syougaijiFlag === true) {
        // 支給決定に係る障害児氏名を表示(仮)
        flexGrid.setCellData(2, 0, pkdj.syogaijiName);
      }
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
        // ヘッダーデザイン修正、borderRadius修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if ((r == 0) && (c == 0)) {
            cell.innerHTML = '受給者証番号';
            s.borderRadius = '4px 0 0 0';
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = _self.$parent.displaySetting[1].ketteiName;
          }
          if ((r == 2) && (c == 0)) {
            cell.innerHTML = _self.$parent.displaySetting[1].shogaijiName;
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((r == 1) || (r == 2)) {
            s.textAlign = 'left';
            s.paddingLeft = '4px';
          }
          if ((r == 0) && (c == 9)) {
            s.borderRadius = '0 4px 0 0';
          }
          // borderRadius修正
          if (_self.$parent.displaySetting[1].syougaijiFlag === false) {
            // 2行表示の場合
            if ((r == 1) && (c == 0)) {
              s.borderRadius = '0 0 4px 0';
            }
          } else {
            // 3行表示の場合
            if ((r == 2) && (c == 0)) {
              s.borderRadius = '0 0 4px 0';
              s.borderTop = 'none';
            }
          }
          // if ((r == 0) && (c == 9)) {
          //   s.borderRadius = '0 4px 0 0';
          // }
        }
      };
    }
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#kyuhumeisai-jyukyusya-grid {
  &.wj-content {
    border-right: none;
    border-bottom: none;
  }
}
</style>