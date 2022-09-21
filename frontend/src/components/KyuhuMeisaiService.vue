<template>
  <div id="kyuhumeisai-service" class="d-flex">
    <wj-flex-grid
        id="kyuhumeisai-service-grid"
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
      <div class="servicessyubetu-title">
        サービス種別
      </div>
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
      if (this.$parent.dataSetFlag) {
        // 取得したデータをセット
        flexGrid.itemsSource = this.$parent.serviceData;
      } else {
        // 初期表示の空配列を設定
        this.setEnptyData(flexGrid);
      }
      // セルのサイズ修正
      this.settingCell(flexGrid);
      // セルのマージ
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**
     * セルの作成
     */
    settingCell(flexGrid) {
      flexGrid.rowHeaders.columns.defaultSize = 200;
      flexGrid.columns.defaultSize = 50;
      //  サービス種別(入力値)
      flexGrid.columns[0].width = 50;
      //  開始年月日
      flexGrid.columns[1].width = 100;
      //  開始年月日(入力値)
      flexGrid.columns[2].width = 145;
      //  終了日年月日
      flexGrid.columns[3].width = 100;
      //  終了日年月日(入力値)
      flexGrid.columns[4].width = 145;
      //  利用日数
      flexGrid.columns[5].width = 100;
      //  利用日数(入力値)
      flexGrid.columns[6].width = 50;
      //  入院日数
      flexGrid.columns[7].width = 100;
      //  入院日数(入力値)
      flexGrid.columns[8].width = 50;
    },
    /**
     * Grid配列の初期表示
     */
    setEnptyData(flexGrid){
      let serviceData = [];
      for (let i = 0; i < 3; i++){
        serviceData.push(
          {
            serviceNo:         '',
            sYmdTtl:           '開始年月日',
            sYmd:              '',
            eYmdTtl:           '終了年月日',
            eYmd:              '',
            riyouNissuuTtl:    '利用日数',
            riyouNissuu:       '',
            nyuinNissuuTtl:    '入院日数',
            nyuinNissuu:       '',
          }
        )
      }
      flexGrid.itemsSource = serviceData;
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      let dataLength; 
      if (flexGrid.itemsSource.length < 3) {
        dataLength = 3;
      } else {
        dataLength = flexGrid.itemsSource.length;
      }
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0, 0, dataLength -1, 0),
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
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = 'normal';
        s.textAlign = 'center';
        s.lineHeight = '19px';
        // ヘッダーデザイン修正
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          if ((r == 0) && (c == 0)) {
            s.lineHeight = '58px';
            s.borderBottom = '1px solid rgba(0,0,0,.2)';
          }
        }
        // セルデザイン修正
        if (panel.cellType == wjGrid.CellType.Cell) {
          s.backgroundColor = sysConst.COLOR.gridBackground;
        //   疑似ヘッダーを作成
          if ((c == 1) || (c == 3) || (c == 5) || (c == 7)) {
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if (c == 1) {
            cell.innerHTML = '<div class="riyouhutan-header">開始年月日</div>';
          }
          if (c == 3) {
            cell.innerHTML = '<div class="riyouhutan-header">終了年月日</div>';
          }
          if (c == 5) {
            cell.innerHTML = '<div class="riyouhutan-header">利用日数</div>';
          }
          if (c == 7) {
            cell.innerHTML = '<div class="riyouhutan-header">入院日数</div>';
          }
          // borderRadiusを修正
          if (flexGrid.itemsSource.length < 4) {
            if ((r == 2) && (c == 8)) {
              s.borderRadius = '0 0 4px 0';
            }
          } else {
            if ((r == 2) && (c == 8)) {
              s.borderRadius = '0';
            }
          }
        }
      };
    },
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#kyuhumeisai-service-grid {
    width: auto;
    max-height: 58px;
    position: relative;
  &.wj-content {
    border-right: none;
    border-bottom: none;
  }
  .riyouhutan-header {
    background-color: #eee;
  }
  .servicessyubetu-title {
    position: absolute;
    top: 20px;
    left: 57px;
    z-index: 2;
    color: #333;
  }
  [wj-part="rh"] {
    border-bottom: 1px solid rgba(0,0,0,.2);
    border-radius: 0 0 0 4px;
  }
}
</style>