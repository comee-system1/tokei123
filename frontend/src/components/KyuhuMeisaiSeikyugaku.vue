<template>
  <div class="mt-1">
    <v-row  no-gutters>
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
      seikyugakuData:[],
      mainFlexGrid:[],
      // Grid各行のデータ
      rowArray1: [],
      rowArray2: [],
      rowArray3: [],
      rowArray4: [],
      rowArray5: [],
      rowArray6: [],
      rowArray7: [],
      rowArray8: [],
      rowArray9: [],
      rowArray10: [],
      rowArray11: [],
      rowArray12: [],
      rowArray13: [],
      rowArray14: [],
      rowArray15: [],
      rowArray16: [],
      rowArray17: [],
    };
  },
  
  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // Apiからデータ取得
      this.getSeikyugakuData();
      // ヘッダーの作成
      this.createHeader(flexGrid);
      // Apiからデータをセット
      this.setSeikyugakuData(flexGrid);
      // セルのデザイン修正
      this.mergeCell(flexGrid);
    },
    /**************
     * APIから請求額データを取得
     */
    getSeikyugakuData() {
      // 表示する数を仮定(Gridの列の数)
      //APIデータ差し替え時修正(仮データ)//
      let apiData = [
        {
          teikyoService:     'abc',
          servicecode:       '32',
          serviceriyounissu: '998',// 
          kyuhutanisu:       '1234',
          tanisutanka:       '11.11',
          souhiyougaku:      '128,595',
        },
        {
          teikyoService:     'efg',
          servicecode:       '12',
          serviceriyounissu: '98',// 
          kyuhutanisu:       '2345',
          tanisutanka:       '22.22',
          souhiyougaku:      '128,595',
        },
        {
          teikyoService:     'hij',
          servicecode:       '23',
          serviceriyounissu: '98',// 
          kyuhutanisu:       '3456',
          tanisutanka:       '33.33',
          souhiyougaku:      '128,595',
        },
        {
          teikyoService:     'gfd',
          servicecode:       '23',
          serviceriyounissu: '98',// 
          kyuhutanisu:       '4567',
          tanisutanka:       '44.44',
          souhiyougaku:      '128,595',
        }
      ];
      this.seikyugakuData = apiData;
    },
    /**************
     * ヘッダー作成、セルのサイズ調整
     */
    createHeader(flexGrid) {  
      // マージ箇所があるためヘッダーを追加
      flexGrid.rowHeaders.columns.push(new wjGrid.Column());
      flexGrid.rowHeaders.columns[0].width = 70;
      flexGrid.rowHeaders.columns[1].width = 130;
      flexGrid.columns.defaultSize = 30;
    },
    setSeikyugakuData(flexGrid) {
      let allData = [];
      // データを格納する配列を作成
      allData.push(
        this.rowArray1,
        this.rowArray2,
        this.rowArray3,
        this.rowArray4,
        this.rowArray5,
      );
      // 配列にデータを挿入
      for (let i = 0; i < 4; i++) {
          console.log(i)
        // 1行目（サービス種類コード）
        this.rowArray1.push(this.seikyugakuData[i].teikyoService)
        this.rowArray1.push(this.seikyugakuData[i].servicecode,'','')

        // 2行目（サービス利用日数）
        this.rowArray2.push(this.seikyugakuData[i].serviceriyounissu)
        this.rowArray2.push('日','','')

        // 3行目（給付単位数）
        this.rowArray3.push(this.seikyugakuData[i].kyuhutanisu,'','','')

        // 4行目（給付単位数）
        this.rowArray4.push(this.seikyugakuData[i].tanisutanka,'','円単位','')

        // 5 ~ 16行目（給付単位数）
        this.rowArray5.push(this.seikyugakuData[i].souhiyougaku,'','','')
      }
      console.log(allData);
      flexGrid.itemsSource = allData;
    },
    mergeCell(flexGrid) {
      // GridのColumn数を取得
      let columnLength = flexGrid.itemsSource[0].length
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      // let headerRanges = [
      //   new wjGrid.CellRange(0, 0, 0, 1),
      // ];
      let headerRanges = []
      // ヘッダーのマージ
      for (let i = 0; i < 5; i++){
        headerRanges.push(
          new wjGrid.CellRange(i, 0, i, 1),
        );
      }
      let cellRanges = [];
      for (let r = 0; r < 17; r++) {
        if (r == 0 || r == 1) {
          for (let c = 0; c < columnLength; c++){
            cellRanges.push(
              new wjGrid.CellRange(r, 1 + c * 4, r, 3 + c * 4),
            );
          }
        } else if (r == 3) {
          // 4行目は2、3列目を結合
          for (let c = 0; c < columnLength; c++) {
            cellRanges.push(
            new wjGrid.CellRange(r, c, r, c + 1),
            new wjGrid.CellRange(r, 2 + c * 2, r, 2 + c * 2 + 1),
            );
          }
        } else {
          for (let c = 1; c < columnLength; c++) {
            cellRanges.push(
            new wjGrid.CellRange(r, 4 * c, r, 4 * c + 3),
            );
          }
        }
      }
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < cellRanges.length; h++) {
            if (cellRanges[h].contains(r, c)) {
              return cellRanges[h];
            }
          }
        } 
      };
      flexGrid.mergeManager = mm;
    }
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

@media screen and (max-width: 1366px){

}

</style>