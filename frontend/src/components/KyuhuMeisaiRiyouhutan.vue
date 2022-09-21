<template>
  <div id="kyuhumeisai-riyouhutan" class="d-flex">
    <wj-flex-grid
      id="kyuhumeisai-riyouhutan-grid"
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
      genmenTaisyosyFlag:this.$parent.displaySetting[1].genmenTaisyosyaFlag,
      syogaiShienFlag: this.$parent.displaySetting[1].syogaiShienFlag,
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
        this.setRiyousyaHutanData(flexGrid)
      }
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
      while (flexGrid.columns.length < 28) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 3) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.rowHeaders.columns.defaultSize = 200;
      flexGrid.columns.defaultSize = 30;
    },
    /**
     * 親コンポーネントで選択したユーザーデータを加工し表示
     */
    setRiyousyaHutanData(flexGrid) {
      // 取得したデータ挿入（API取得時修正）
      let pkmk = this.$parent.kyuhumeisaiApiData.kojin;
      // 利用者負担上限月額①
      let riyouhutanSplit = [];
      riyouhutanSplit = pkmk.jyogengaku.split('');
      let l = '';
      l = riyouhutanSplit.length;
      // 値を右寄せで挿入
      for (let i = 6; 0 < l; i--) {
        // 「i」がセルのx座標、「ｌ」がriyouhutangakuの桁数
        flexGrid.setCellData(0, i, riyouhutanSplit[l-1]);
        l--;
      }
      if (this.genmenTaisyosyFlag && (this.syogaiShienFlag === false)) {
        // 就労継続支援Ａ型事業者負担減免対象者
        flexGrid.setCellData(0, 17, pkmk.agm_riyoumu);
      }

      // 障害支援区分
      if (this.genmenTaisyosyFlag && this.syogaiShienFlag) {
        flexGrid.setCellData(0, 17, pkmk.teido);
      }

      let pkmj = this.$parent.kyuhumeisaiApiData.jknr;
      // 指定事業所番号を分割して表示
      let jigyosyoNoSplit = [];
      jigyosyoNoSplit = pkmj.jjigyono.split('');
      for (let i = 0; i < jigyosyoNoSplit.length; i++) {
        flexGrid.setCellData(1, i + 7, jigyosyoNoSplit[i]);
      }
      // 管理結果
      flexGrid.setCellData(1, 20, pkmj.rslt);
      // 管理結果額
      flexGrid.setCellData(1, 25, pkmj.gaku);
      // 事務所名
      flexGrid.setCellData(2, 7, pkmj.kjgyoname);
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0, 7, 0, 16),
        new wjGrid.CellRange(0, 17, 0, 19),
        new wjGrid.CellRange(0, 20, 0, 27),
        new wjGrid.CellRange(1, 0, 1, 6),
        new wjGrid.CellRange(1, 17, 1, 19),
        new wjGrid.CellRange(1, 20, 1, 21),
        new wjGrid.CellRange(1, 22, 1, 24),
        new wjGrid.CellRange(1, 25, 1, 27),
        new wjGrid.CellRange(2, 0, 2, 6),
        new wjGrid.CellRange(2, 7, 2, 27),
      ];
      let headerRanges = [
        new wjGrid.CellRange(1, 0, 2, 0),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.RowHeader) {
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
        s.lineHeight = '19px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if ((r == 0) && (c == 0)) {
            cell.innerHTML = '利用者負担上限月額①';
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = '利用者負担上限額<br/>管理事業所';
          }
          // 線を補填
          if (c == 0) {
            s.borderLeft = '1px solid rgba(0,0,0,.2)';
          }
          if (r == 0) {
            s.borderTop = '1px solid rgba(0,0,0,.2)';
          }
          // borderRadiusを修正
          if (r == 0 && c == 0) {
            s.borderRadius = '4px 0 0 0';
          }
          if (r == 1 && c == 0) {
            s.borderRadius = '0 0 0 4px';
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
          // 疑似ヘッダーを作成
          if (_self.syogaiShienFlag) {
            if ((r == 0) && (c == 7)) {
              cell.innerHTML = '<div class="riyouhutan-header">障害支援区分</div>';
              s.backgroundColor = sysConst.COLOR.selectedColor;
            }
          } else {
            if ((r == 0) && (c == 7)) {
              cell.innerHTML = '<div class="riyouhutan-header">就労継続支援Ａ型事業者負担減免対象者</div>';
              s.backgroundColor = sysConst.COLOR.selectedColor;
            }
          }
          if ((r == 1) && (c == 0)) {
            cell.innerHTML = '<div class="riyouhutan-header">指定事業所番号</div>';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if ((r == 1) && (c == 17)) {
            cell.innerHTML = '<div class="riyouhutan-header">管理結果</div>';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if ((r == 1) && (c == 22)) {
            cell.innerHTML = '<div class="riyouhutan-header">管理結果額</div>';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if ((r == 2) && (c == 0)) {
            cell.innerHTML = '<div class="riyouhutan-header">事業所名</div>';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          // 線を補填
          if (r == 0){
            s.borderTop = '1px solid rgba(0,0,0,.2)';
          }
          // borderRadiusを修正
          if ((r == 2) && (c == 7)) {
            s.borderRadius = '0 0 4px 0';
          }
          if ((r == 1) && (c == 25)) {
            s.borderRadius = '0 4px 0 0';
          }
          if (_self.genmenTaisyosyFlag) {
            // 就労継続支援A型...免措置実施または障害支援区分セル表示時のデザイン
            for (let i = 20; i < 28; i++) {
              if ((r == 0) && (c == i)) {
                // 不要なセルを非表示
                cell.style.display = 'none';
              }
            }
            if ((r == 0) && (c == 17)) {
              s.borderRadius = '0 4px 0 0';
            }
            for (let i = 20; i < 28; i++) {
              if ((r == 1) && (c == i)) {
                // 2行目線上部を補填、高さ調整
                s.borderTop = '1px solid rgba(0,0,0,.2)';
                s.height = '20px';
                s.top = '18px';
              }
            }
          } else {
            for (let i = 7; i < 28; i++) {
              if ((r == 0) && (c == i)) {
                // 不要なセルを非表示（就労継続支援A型事業者負担減免措置実施が非表示時）
                cell.style.display = 'none';
              }
            }
            // borderRadiusを修正
            if ((r == 0) && (c == 6)) {
              s.borderRadius = '0 4px 0 0';
            }
            for (let i = 7; i < 28; i++) {
              if ((r == 1) && (c == i)) {
                // 2行目線上部を補填、高さ調整
                s.borderTop = '1px solid rgba(0,0,0,.2)';
                s.height = '20px';
                s.top = '18px';
              }
            }
          }
            // borderRadiusを修正
            if ((r == 2) && (c == 7)) {
              s.textAlign = 'left';
              s.paddingLeft = '4px';
            }
        }
      };
    }
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#kyuhumeisai-riyouhutan-grid {
  &.wj-content {
    border: none;
  }
  .riyouhutan-header {
    background-color: #eee;
  }
}
</style>