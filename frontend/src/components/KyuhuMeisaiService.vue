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
      jyoseijichitaiFlag: true,
      mainFlexGrid:[],
      serviceData:[]
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
      while (flexGrid.columns.length < 9) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      let dataLength = this.serviceData.length; 
      if(3 < dataLength) {
        while (flexGrid.rows.length < dataLength) {
        flexGrid.rows.push(new wjGrid.Row());
        } 
      } else {
        while (flexGrid.rows.length < 3) {
        flexGrid.rows.push(new wjGrid.Row());
        }
      }
      flexGrid.rowHeaders.columns.defaultSize = 170;
    //   flexGrid.columns.defaultSize = 50;
      //  サービス種別(入力値)
      flexGrid.columns[0].width = 50;
      //  開始年月日
      flexGrid.columns[1].width = 100;
      //  開始年月日(入力値)
      flexGrid.columns[2].width = 160;
      //  終了日年月日
      flexGrid.columns[3].width = 100;
      //  終了日年月日(入力値)
      flexGrid.columns[4].width = 160;
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
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      let dataLength; 
      if(this.serviceData.length < 3) {
        dataLength = 3;
      } else {
        dataLength = this.serviceData.length;
      }
      console.log(dataLength);
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
          if ((r == 0) && (c == 8)) {
            s.borderRadius = '0 4px 0 0';
          }
          if (_self.serviceData.length < 3) {
            // borderRadiusを修正
            if ((r == 2) && (c == 8)) {
              s.borderRadius = '0 0 4px 0';
            }
          }
        }
      };
    },
    /**
     * 親コンポーネントから受けとったデータを加工し表示
     */
    setServiceData(serviceData){
      this.serviceData = [];
      this.serviceData = serviceData;
      // データに基づいてセルを再修正
      this.createCell(this.mainFlexGrid);
      this.mergeCell(this.mainFlexGrid);
      console.log(serviceData)
      for (let i = 0; i < serviceData.length; i++) {
        // データを挿入
        this.mainFlexGrid.setCellData(i, 0, serviceData[i]['serviceNo']);
        this.mainFlexGrid.setCellData(i, 2, serviceData[i]['sYmd']);
        this.mainFlexGrid.setCellData(i, 4, serviceData[i]['eYmd']);
        this.mainFlexGrid.setCellData(i, 6, serviceData[i]['riyouNissuu']);
        this.mainFlexGrid.setCellData(i, 8, serviceData[i]['nyuinNissuu']);
      }
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
    left: 40px;
    z-index: 2;
    color: #333;
  }
  [wj-part="rh"] {
    border-bottom: 1px solid rgba(0,0,0,.2);
    border-radius: 0 0 0 4px;
  }
}
</style>