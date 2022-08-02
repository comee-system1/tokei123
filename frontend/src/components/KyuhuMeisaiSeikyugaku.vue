<template>
  <div class="mt-1">
    <v-row no-gutters>
      <v-col>
        <wj-flex-grid
          id="kyuhu-seikyugaku"
          :headersVisibility="'All'"
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
          :autoGenerateColumns="false"
        >
        </wj-flex-grid>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
// import sysConst from '@/utiles/const';
export default {
  data() {
    return {
      seikyugakuData: [],
      mainFlexGrid: [],
      serviceLength: '', //APIから取得したサービス数
    };
  },

  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      console.log(flexGrid);
      this.getSeikyugakuData();
      this.createCell(flexGrid);
    },
    /**************
     * APIから請求額データを取得
     */
    getSeikyugakuData() {
      // 表示する数を仮定(Gridの列の数)
      //APIデータ差し替え時修正
      this.serviceLength = 4;
    },

    /**************
     * セルデータセット・成形
     */
    createCell(flexGrid) {
      //      flexGrid.columns.push(new wjGrid.Column());
      // flexGrid.columns.push(new wjGrid.Column());
      // flexGrid.columns.push(new wjGrid.Column());
      flexGrid.columns.defaultSize = 30;
      for (let n = 0; n < 10; n++) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      for (let n = 0; n < 10; n++) {
        flexGrid.columns[n].binding = 'column' + n;
      }
      let rowData = [];
      // for (let n = 0; n < 10; n++) {
      //   let c = 'column' + n;
      //   code = { [c]: 'aaaa' };
      // }
      // console.log(code);

      for (let i = 0; i < 17; i++) {
        let code = '';
        for (let n = 0; n < 2; n++) {
          let c = 'column' + n;
          code = { [c]: 'aaaa' };
        }
        rowData.push(code);
      }
      console.log(rowData);
      flexGrid.itemsSource = rowData;
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
#kyuhu-seikyugaku {
  .wj-cells .wj-cell.wj-state-selected {
    color: #333;
  }
}

@media screen and (max-width: 1366px) {
}
</style>
