<template>
  <div>
    <v-row  no-gutters>
      <v-col>
        <wj-flex-grid
            id="kyuhu-seikyugaku"
            :headersVisibility="'None'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :isReadOnly="true"
            :allowDragging="false"
            :allowResizing="false"
            :deferResizing="false"
            :allowSorting="false"
          >
          </wj-flex-grid>
      </v-col>
    </v-row>  
  </div>
</template>

<script>
    import * as wjGrid from '@grapecity/wijmo.grid';
    import "@grapecity/wijmo.vue2.grid.multirow";
export default {
  data() {
    return {
      // // サービス種類コード
      // service: [{servicecode: '',servicename: '',}],
      // // サービス種類コード
      // servicedate: [{servicecode: '',servicename: '日',}],
      // kyuhutanisu: '123',
      // tanisutanka: '567',
      // souhiyougaku: '8910',
      // itiwarisoutougaku: [],
      // riyousyahutan2: [],
      // zyougengakutyousei: [],
      // jigyousyagenmengaku: [],
      // genmenriyousyahutan1: [],
      // zyougenriyousyahutangaku: [],
      // ketteiriyousyahutangaku: [],
      // kyuhuhi: [],
      // tokubetutaisakuhi: [],
      // zititaizyoseibun: [],
      // data: getData(),
    };
  },
  
  methods: {
    onInitialized: function (flexGrid) {
      // 空のセルをセット
      while (flexGrid.columns.length < 11) {
          flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 17) {
          flexGrid.rows.push(new wjGrid.Row());
      }
      // セルの成形
      flexGrid.columns[0].width = 80;
      flexGrid.columns[1].width = 170;
      flexGrid.rows.defaultSize = 40;
      flexGrid.alternatingRowStep = 0;
      flexGrid.isReadOnly = true;
      flexGrid.setCellData(0, 2, '請求額集計欄');
      flexGrid.setCellData(1, 0, 'サービス種類コード');
      flexGrid.setCellData(2, 0, 'サービス利用日数');
      flexGrid.setCellData(2, 1, 'サービス利用日数');
      flexGrid.setCellData(3, 0, '給付単位数');
      flexGrid.setCellData(3, 0, '給付単位数');
      flexGrid.setCellData(4, 0, '単位数単価');
      flexGrid.setCellData(5, 0, '総費用額');
      flexGrid.setCellData(6, 0, '１割相当額');
      flexGrid.setCellData(7, 0, '利用者負担額②');
      flexGrid.setCellData(8, 0, '上限月額調整');
      flexGrid.setCellData(9, 0, 'A型減免');
      flexGrid.setCellData(9, 1, '事業者減免額');
      flexGrid.setCellData(10, 1, '減免額利用者負担');
      flexGrid.setCellData(11, 0, '調整後利用者負担');
      flexGrid.setCellData(12, 0, '上限額管理後利用者');
      flexGrid.setCellData(13, 0, '決定利用者負担額');
      flexGrid.setCellData(14, 0, '請請求額');
      flexGrid.setCellData(14, 1, '給付日');
      flexGrid.setCellData(15, 1, '特別対策費');
      flexGrid.setCellData(16, 0, '自治体助成分請求書');

            // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0,2,0,10),
        new wjGrid.CellRange(0,0,0,1),
        new wjGrid.CellRange(1,0,1,1),
        new wjGrid.CellRange(2,0,2,1),
        new wjGrid.CellRange(3,0,3,1),
        new wjGrid.CellRange(4,0,4,1),
        new wjGrid.CellRange(5,0,5,1),
        new wjGrid.CellRange(6,0,6,1),
        new wjGrid.CellRange(7,0,7,1),
        new wjGrid.CellRange(8,0,8,1),
        new wjGrid.CellRange(9,0,10,0),
        new wjGrid.CellRange(11,0,11,1),
        new wjGrid.CellRange(12,0,12,1),
        new wjGrid.CellRange(13,0,13,1),
        new wjGrid.CellRange(14,0,15,0),
        new wjGrid.CellRange(16,0,16,1),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function(panel, r, c) {
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
  },
};

</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
#kyuhu-seikyugaku {
  .wj-cells .wj-cell.wj-state-selected {
    background: #fff;
    color: #000;
  }
}

@media screen and (max-width: 1366px){

}

</style>