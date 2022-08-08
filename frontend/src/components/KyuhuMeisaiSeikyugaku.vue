<template>
  <div id="kyuhu-seikyugaku" class="mt-1">
    <v-row  no-gutters>
      <v-col class = "d-flex">
        <wj-flex-grid
            id="kyuhu-seikyugaku-grid"
            :headersVisibility="'All'"
            :alternatingRowStep="0"
            :initialized="onInitialized"
            :itemsSourceChanged="onitemsSourceChanged"
            :isReadOnly="true"
            :deferResizing="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowDragging="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
          >
            <div class="kyuhu-seikyugaku-columnheader">
              請求額集計欄
            </div>
          </wj-flex-grid>
          <wj-flex-grid
            id="kyuhu-seikyugaku-total"
            :headersVisibility="'Column'"
            :alternatingRowStep="0"
            :initialized="onInitializedTotal"
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
    import sysConst from '@/utiles/const';
export default {
  data() {
    return {
      seikyugakuApiData:[],
      seikyugakuData:[],
      columnLength:'',
      mainFlexGrid:[],
      footerFlexGrid:[],
      // Grid各行のデータ
      svcsyu:[],              // サービス種類コード、サービス種類名
      nissu:[],               // サービス利用日数
      kyufuTani:[],           // 給付単位数
      taniTanka:[],           // 単位数単価
      sogaku:[],              // 総費用額
      ichiwari:[],            // １割相当額
      riyogaku2:[],           // 利用者負担額(②)
      jyogengaku:[],          // 上限月額調整
      aJigyoGenmengaku:[],    // Ａ型減免事業者減免額
      ariyosyaFutangaku:[],   // Ａ型減免後利用者負担額
      tyoseigoFutangaku:[],   // 調整後利用者負担額
      jyogenFutangaku:[],     // 上限額管理後利用者負担額
      ketteiFutangaku:[],     // 決定利用者負担額
      tokubetuKyufugakuhi:[], // 特別給付費
      tokubetuTaisakuhi:[],   // 請求額(特別対策費)
      jichitaiJyoseigaku:[],  // 自治体助成分請求額

      // 合計Grid合計値
      totalKyufuTani:'',
      totalSogaku:'',
      totalJyogengaku:'',
      totalAJigyoGenmengaku:'',
      totalAriyosyaFutangaku:'',
      totalTyoseigoFutangaku:'',
      totalJyogenFutangaku:'',
      totalKetteiFutangaku:'',
      totalTokubetuKyufugakuhi:'',
      totalTokubetuTaisakuhi:'',
      totalJichitaiJyoseigaku:'',
    };
  },
  
  methods: {
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // Apiからのデータをセット
      this.setSeikyugakuData(flexGrid);
      // ヘッダー、セルの調整
      this.settingGrid(flexGrid);
      // セルのマージ
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    onitemsSourceChanged(flexGrid) {
      // ヘッダー、セルの調整
      this.settingGrid(flexGrid);
      // セルのマージ
      this.mergeCell(flexGrid);
      // セルのデザイン修正
      this.formatCell(flexGrid);
    },
    /**************
     * APIの請求額データを取得
     */
    getSeikyugakuData(seikyugakuApiData) {
      // 表示する数を仮定(Gridの列の数)
      //APIデータ差し替え時修正(仮データ)//
      this.seikyugakuApiData = seikyugakuApiData;
      this.setSeikyugakuData(this.mainFlexGrid);
      this.setTotalGrid();
    },
    /**************
     * 初回表示、Grid作成
     */
    createEmptyCell(flexGrid) {
      // 空のセルをセット
      while (flexGrid.columns.length < 20) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 16) {
        flexGrid.rows.push(new wjGrid.Row());
      }
    },
    /**************
     * ヘッダー作成、セルのサイズ調整
     */
    settingGrid(flexGrid) {  
      // マージ箇所があるためヘッダーを追加
      if(flexGrid.rowHeaders.columns.length < 2) {
        flexGrid.rowHeaders.columns.push(new wjGrid.Column());
      }
      flexGrid.rowHeaders.columns[0].width = 70;
      flexGrid.rowHeaders.columns[1].width = 130;
      flexGrid.columns.defaultSize = 30;

      // ヘッダーに文字を挿入
      console.log(flexGrid.columns)
      if (0 < flexGrid.columns.length) {
        flexGrid.columnHeaders.setCellData(0, 0, '');
      }
      flexGrid.rowHeaders.setCellData(0, 0, 'サービス種類コード');
      flexGrid.rowHeaders.setCellData(1, 0, 'サービス利用日数');
      flexGrid.rowHeaders.setCellData(1, 1, 'サービス利用日数');
      flexGrid.rowHeaders.setCellData(2, 0, '給付単位数');
      flexGrid.rowHeaders.setCellData(2, 0, '給付単位数');
      flexGrid.rowHeaders.setCellData(3, 0, '単位数単価');
      flexGrid.rowHeaders.setCellData(4, 0, '総費用額');
      flexGrid.rowHeaders.setCellData(5, 0, '１割相当額');
      flexGrid.rowHeaders.setCellData(6, 0, '利用者負担額②');
      flexGrid.rowHeaders.setCellData(7, 0, '上限月額調整');
      flexGrid.rowHeaders.setCellData(8, 0, 'A型減免');
      flexGrid.rowHeaders.setCellData(8, 1, '事業者減免額');
      flexGrid.rowHeaders.setCellData(9, 1, '減免額利用者負担');
      flexGrid.rowHeaders.setCellData(10, 0, '調整後利用者負担');
      flexGrid.rowHeaders.setCellData(11, 0, '上限額管理後利用者');
      flexGrid.rowHeaders.setCellData(12, 0, '決定利用者負担額');
      flexGrid.rowHeaders.setCellData(13, 0, '請求額');
      flexGrid.rowHeaders.setCellData(13, 1, '給付日');
      flexGrid.rowHeaders.setCellData(14, 1, '特別対策費');
      flexGrid.rowHeaders.setCellData(15, 0, '自治体助成分請求書');
    },
    /**************
     * 利用者クリック時、取得したデータをGridにセット
     */
    setSeikyugakuData() {
      // 配列データを初期化
      this.seikyugakuData      = [];
      this.svcsyu              = [];
      this.nissu               = [];
      this.kyufuTani           = [];
      this.taniTanka           = [];
      this.sogaku              = [];
      this.ichiwari            = [];
      this.riyogaku2           = [];
      this.jyogengaku          = [];
      this.aJigyoGenmengaku    = [];
      this.ariyosyaFutangaku   = [];
      this.tyoseigoFutangaku   = [];
      this.jyogenFutangaku     = [];
      this.ketteiFutangaku     = [];
      this.tokubetuKyufugakuhi = [];
      this.tokubetuTaisakuhi   = [];
      this.jichitaiJyoseigaku  = [];

      // データを格納する配列を作成
      let seikyugakuData = [];

      seikyugakuData.push(
        this.svcsyu,              // サービス種類コード、サービス種類名
        this.nissu,               // サービス利用日数
        this.kyufuTani,           // 給付単位数
        this.taniTanka,           // 単位数単価
        this.sogaku,              // 総費用額
        this.ichiwari,            // １割相当額
        this.riyogaku2,           // 利用者負担額(②)
        this.jyogengaku,          // 上限月額調整
        this.aJigyoGenmengaku,    // Ａ型減免事業者減免額
        this.ariyosyaFutangaku,   // Ａ型減免後利用者負担額
        this.tyoseigoFutangaku,   // 調整後利用者負担額
        this.jyogenFutangaku,     // 上限額管理後利用者負担額
        this.ketteiFutangaku,     // 請求額
        this.tokubetuKyufugakuhi, // 特別給付費
        this.tokubetuTaisakuhi,   // 請求額(特別対策費)
        this.jichitaiJyoseigaku,  // 自治体助成分請求額
      );
      // 配列にデータを挿入
      for (let i = 0; i < this.seikyugakuApiData.length; i++) {
        // サービス種類コード、サービス種類名
        this.svcsyu.push(this.seikyugakuApiData[i].servicecode);
        this.svcsyu.push(this.seikyugakuApiData[i].teikyoService,'','');

        // サービス利用日数
        this.nissu.push(this.seikyugakuApiData[i].serviceriyounissu);
        this.nissu.push('日','','');

        // 給付単位数
        this.kyufuTani.push(this.seikyugakuApiData[i].kyuhutanisu,'','','');

        // 単位数単価
        this.taniTanka.push(this.seikyugakuApiData[i].tanisutanka,'','円/単位','');

        // 総費用額
        this.sogaku.push(this.seikyugakuApiData[i].souhiyougaku,'','','');

        // 1割相当額
        this.ichiwari.push(this.seikyugakuApiData[i].itiwarisoutougaku,'','','');

        // 利用者負担額②
        this.riyogaku2.push(this.seikyugakuApiData[i].riyousyahutan2,'','','');

        // 上限月額調整
        this.jyogengaku.push(this.seikyugakuApiData[i].jyougengetugaku,'','','');

        // Ａ型減免事業者減免額
        this.aJigyoGenmengaku.push(this.seikyugakuApiData[i].jigyousyagenmengaku,'','','');

        // Ａ型減免後利用者負担額
        this.ariyosyaFutangaku.push(this.seikyugakuApiData[i].genmenriyousyahutan,'','','');

        // 調整後利用者負担額
        this.tyoseigoFutangaku.push(this.seikyugakuApiData[i].tyouseigohutan,'','','');

        // 上限額管理後利用者負担額
        this.jyogenFutangaku.push(this.seikyugakuApiData[i].jyougenriyousyahutangaku,'','','');

        // 決定利用者負担額
        this.ketteiFutangaku.push(this.seikyugakuApiData[i].ketteiriyousyahutangaku,'','','');

        // 給付費
        this.tokubetuKyufugakuhi.push(this.seikyugakuApiData[i].kyuhuhi,'','','');

        // 請求額(特別対策費)
        this.tokubetuTaisakuhi.push(this.seikyugakuApiData[i].tokubetutaisakuhi,'','','');

        // 自治体助成分請求額
        this.jichitaiJyoseigaku.push(this.seikyugakuApiData[i].zititaizyoseibun,'','','');
      }
      this.seikyugakuData = seikyugakuData;
      this.mainFlexGrid.itemsSource = this.seikyugakuData;
    },
    /**************
     * セルのマージ
     */
    mergeCell(flexGrid) {
      // GridのColumn数を取得
      let columnLength;
      if (this.seikyugakuData.length) {
        columnLength = this.seikyugakuData[0].length;
      } else {
        columnLength = 20;
      }
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      let rowhHeaderRanges = []
      // 列ヘッダーのマージ
      for (let i = 0; i < 17; i++){
         if ((i == 8 ) || (i == 13)){
          rowhHeaderRanges.push(
            new wjGrid.CellRange(i, 0, i + 1, 0),
          );
        }
        if (!(i == 8 || i == 9 || i == 13 || i == 14)){
          rowhHeaderRanges.push(
            new wjGrid.CellRange(i, 0, i, 1),
          );
        }
      }
      // 行ヘッダーのマージ
      let columnHeaderRanges = [
        new wjGrid.CellRange(0, 0, 0, columnLength -1),
      ];
      // ヘッダー交差部分のマージ
      let TopLeftRanges = [
        new wjGrid.CellRange(0, 0, 0, 1),
      ];
      // セルのマージ
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
          for (let c = 0; c < columnLength; c++) {
            cellRanges.push(
            new wjGrid.CellRange(r, 4 * c, r, 4 * c + 3),
            );
          }
        }
      }
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          for (let h = 0; h < rowhHeaderRanges.length; h++) {
            if (rowhHeaderRanges[h].contains(r, c)) {
              return rowhHeaderRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < columnHeaderRanges.length; h++) {
            if (columnHeaderRanges[h].contains(r, c)) {
              return columnHeaderRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.TopLeft) {
          for (let h = 0; h < TopLeftRanges.length; h++) {
            if (TopLeftRanges[h].contains(r, c)) {
              return TopLeftRanges[h];
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
    },
    /**************
     * セルのデザイン修正
     */
    formatCell(flexGrid) {
      // let _self = this;
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッドの共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if (panel.cellType == wjGrid.CellType.RowHeader) {
          // 列ヘッダーのスタイルをカスタマイズ
          s.textAlign = 'center';
          if (((r == 8) && (c == 0)) || ((r == 13) && (c == 0))) {
            s.lineHeight = '40px';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セルのスタイルをカスタマイズ
          s.textAlign = 'right';
          s.paddingRight = '4px';
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((r == 0) || (r == 1)) {
            s.textAlign = 'center';
            if((((c -1) % 4) == 0) && (r == 1)) {
              s.textAlign = 'left';
              s.paddingLeft = '4px';
            }
          }
          if (r == 3) {
            s.textAlign = 'center';
          }
        }
      }
    },
    ////////////////////////////////// 以下合計額 Grid //////////////////////////////////

    /********************
     * 合計グリッド
     */
    onInitializedTotal(flexGrid) {
      this.footerFlexGrid = flexGrid;
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // 合計グリッドセルを作成
      this.createTotalGrid(flexGrid);
      // 合計グリッド合計値を挿入
    },
    /********************
     * 合計グリッドの作成、マージ、デザイン修正
     */
    createTotalGrid(flexGrid) {
      // 空のセルをセット
      while (flexGrid.columns.length <1) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 16) {
        flexGrid.rows.push(new wjGrid.Row());
      }

      flexGrid.columnHeaders.rows[0].height = 20;
      flexGrid.rows.defaultSize = 20;
      flexGrid.columns.defaultSize = 120;
      flexGrid.rows.height = 20;
      flexGrid.setCellData(0, 0, '合計');

      // セルのマージ
      let mm = new wjGrid.MergeManager();
      let cellRanges = [];
      cellRanges.push(
        new wjGrid.CellRange(0 , 0, 1, 0),
      );
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

      // デザイン修正
      flexGrid.itemFormatter = function(panel,r,c,cell){
        let s = cell.style;
        // セルのスタイルをカスタマイズ
        s.fontWeight = "normal";
        s.borderRight = 'none';
        s.borderLeft = 'none';
        s.lineHeight = '20px';
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セルのスタイルをカスタマイズ
          s.backgroundColor = sysConst.COLOR.gridBackground;
          s.textAlign = 'right';
          s.paddingRight = '4px'
          if (r == 0) {
            s.textAlign = 'center';
            s.lineHeight = '40px';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          if ((r == 3) || (r == 5) || (r == 6)) {
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
        }
      }
    },
    /********************
     * 合計グリッド合計値を挿入
     */
    setTotalGrid(){
      // 合計値を算出（仮）API実装時修正
      this.totalKyufuTani =           12345;
      this.totalSogaku =              234567;
      this.totalJyogengaku =          567900;
      this.totalAJigyoGenmengaku =    679011;
      this.totalAriyosyaFutangaku =   790122;
      this.totalTyoseigoFutangaku =   901233;
      this.totalJyogenFutangaku =     1012344;
      this.totalKetteiFutangaku =     1123455;
      this.totalTokubetuKyufugakuhi = 1234566;
      this.totalTokubetuTaisakuhi =   1345677;
      this.totalJichitaiJyoseigaku =  1456788;

      // 合計値をGridに挿入
      this.footerFlexGrid.setCellData(2, 0,  this.totalKyufuTani);
      this.footerFlexGrid.setCellData(4, 0,  this.totalSogaku);
      this.footerFlexGrid.setCellData(7, 0,  this.totalJyogengaku);
      this.footerFlexGrid.setCellData(8, 0,  this.totalAJigyoGenmengaku);
      this.footerFlexGrid.setCellData(9, 0,  this.totalAriyosyaFutangaku);
      this.footerFlexGrid.setCellData(10, 0, this.totalTyoseigoFutangaku);
      this.footerFlexGrid.setCellData(11, 0, this.totalJyogenFutangaku);
      this.footerFlexGrid.setCellData(12, 0, this.totalKetteiFutangaku);
      this.footerFlexGrid.setCellData(13, 0, this.totalTokubetuKyufugakuhi);
      this.footerFlexGrid.setCellData(14, 0, this.totalTokubetuTaisakuhi);
      this.footerFlexGrid.setCellData(15, 0, this.totalJichitaiJyoseigaku);
    },
  }
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
#kyuhu-seikyugaku {
  color: #333;
  #kyuhu-seikyugaku-grid {
    border-radius: 4px 0 0 4px;
    max-width: calc(800px + 1px);
    width: auto;
    position: relative;
    border-right: solid 1px $black;
    .kyuhu-seikyugaku-columnheader {
      position: absolute;
      left: calc(50% + 30px);
      z-index: 1;
      color: #333;
    }
    .wj-cell {
      line-height: 19px;
    }
  }
  #kyuhu-seikyugaku-total {
    width: auto;
    border-radius: 0 4px 4px 0;
    background: #ccc;
  }
}

@media screen and (max-width: 1366px){

}

</style>