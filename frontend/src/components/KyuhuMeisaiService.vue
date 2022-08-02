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
        :itemsSource="viewdata"
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
      serviceData:[],
      viewdata:[]
    };
  },
  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // 初期表示の空配列を設定
      this.setEnptyData();
      // セルのサイズ修正
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
      flexGrid.rowHeaders.columns.defaultSize = 170;
    //   flexGrid.columns.defaultSize = 50;
      //  サービス種別(入力値)
      // console.log(flexGrid.columns[0])
      // flexGrid.columns[0].width = 50;
      // //  開始年月日
      // flexGrid.columns[1].width = 100;
      // //  開始年月日(入力値)
      // flexGrid.columns[2].width = 160;
      // //  終了日年月日
      // flexGrid.columns[3].width = 100;
      // //  終了日年月日(入力値)
      // flexGrid.columns[4].width = 160;
      // //  利用日数
      // flexGrid.columns[5].width = 100;
      // //  利用日数(入力値)
      // flexGrid.columns[6].width = 50;
      // //  入院日数
      // flexGrid.columns[7].width = 100;
      // //  入院日数(入力値)
      // flexGrid.columns[8].width = 50;
    },
    /**
     * Grid配列の初期表示
     */
    setEnptyData(){
      this.viewdata = [];
      for (let i = 0; i < 3; i++){
        this.viewdata.push(
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
      console.log(this.viewdata )
    },
    /**
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      let dataLength; 
      if(this.viewdata.length < 3) {
        dataLength = 3;
      } else {
        dataLength = this.viewdata.length;
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
          if (_self.viewdata.length < 4) {
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
    /**
     * 親コンポーネントから受けとったデータを加工し表示
     */
    setServiceData(serviceData){
      this.viewdata = [];
      for (let i = 0; i < serviceData.length; i++){
        this.viewdata.push(
          {
            serviceNo:         serviceData[i]['serviceNo'],
            sYmdTtl:           '開始年月日',
            sYmd:              serviceData[i]['sYmd'],
            eYmdTtl:           '終了年月日',
            eYmd:              serviceData[i]['eYmd'],
            riyouNissuuTtl:    '利用日数',
            riyouNissuu:       serviceData[i]['riyouNissuu'],
            nyuinNissuuTtl:    '入院日数',
            nyuinNissuu:       serviceData[i]['nyuinNissuu'],
          }
        )
      }
      // データに基づいてセルを再修正
      this.createCell(this.mainFlexGrid);
      this.mergeCell(this.mainFlexGrid);
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