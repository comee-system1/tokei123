<template>
  <div id="kyuhu-seikyugaku" class="mt-1">
    <v-row  no-gutters>
      <v-col class = "d-flex">
        <wj-flex-grid
            id="kyuhu-seikyugaku-grid"
            :headersVisibility="'None'"
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
            <div class="kyuhu-seikyugaku-columnheader">
              請求額集計欄
            </div>
          </wj-flex-grid>
          <wj-flex-grid
            id="kyuhu-seikyugaku-total"
            :headersVisibility="'None'"
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
      dispItemPtn: this.$parent.displaySetting[1].seikyugakuType,
      seikyugakuApiData:[],
      seikyugakuData:[],
      seikyugakuObj:[
        {
          title:'サービス種類コード',title2:'',key:'servicecode',key2:'teikyoService'
        },
        {
          title:'サービス利用日数',title2:'',key:'serviceriyounissu'
        },
        {
          title:'給付単位数',title2:'',key:'kyuhutanisu'
        },
        {
          title:'単位数単価',title2:'',key:'tanisutanka'
        },
        {
          title:'総費用額',title2:'',key:'souhiyougaku'
        },
        {
          title:'１割相当額',title2:'',key:'itiwarisoutougaku'
        },
        {
          title:'利用者負担額(②)',title2:'',key:'riyousyahutan2'
        },
        {
          title:'上限月額調整',title2:'',key:'jyougengetugaku'
        },
        {
          title:'Ａ型減免',title2:'事業者減免額',key:'jigyousyagenmengaku'
        },
        {
          title:'Ａ型減免',title2:'減免後利用者負担額',key:'genmenriyousyahutan'
        },
        {
          title:'調整後利用者負担額',title2:'',key:'tyouseigohutan'
        },
        {
          title:'上限額管理後利用者負担額',title2:'',key:'jyougenriyousyahutangaku'
        },
        {
          title:'決定利用者負担額',title2:'',key:'ketteiriyousyahutangaku'
        },
        {
          title:'請求額',title2:'給付費',key:'kyuhuhi'
        },
        {
          title:'請求額',title2:'特別対策費',key:'tokubetutaisakuhi'
        },
        {
          title:'自治体助成分請求額',title2:'',key:'jititaijyoseibun'
        }
      ],
      columnLength:'',
      mainFlexGrid:[],
      totalFlexGrid:[],
      // Grid各行のデータ

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

      // Gridを作成
      this.createGrid(flexGrid)

      // セルの設定
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
      this.onInitialized(this.mainFlexGrid);
      this.setTotalGrid();
    },
    /**************
     * セルの設定
     */
    settingGrid(flexGrid) {
      flexGrid.columns[0].width = 70;
      flexGrid.columns[0].cssClass = 'create-header';
      flexGrid.columns[1].width = 150;
      flexGrid.columns[1].cssClass = 'create-header';
      flexGrid.rows.insert(0, new wjGrid.Row());
      flexGrid.rows[0].cssClass = 'create-header';
      flexGrid.columns.defaultSize = 30;
      // 表示条件ごとのセルの非表示、書き換え設定
      this.settingDisplyItem(flexGrid)
    },
    /**************
     * Gidを作成
     */
    createGrid() {
      // 請求額集計欄Gridの配列を作成
      let seikyugakuData = [];
        //-1はヘッダー2列目分
        let row = [];

      if(this.seikyugakuApiData.length) {
        // APIデータが取得できている場合はAPIデータの数を設定
        this.columnLength = this.seikyugakuApiData.length * 4;
        for (let r = 0; r < this.seikyugakuObj.length; r++) {
          let objData = this.seikyugakuObj[r];
          let servicecodeRoop = 0;
          let servicenissuRoop = 0;
          let tanisutankaRoop = 0;
          let othersRoop = 0;
          row = {
            title: objData.title,
            title2: objData.title2,
          };
          for (let i = 0; i < this.columnLength; i++) {
            let c = 'column' + i;
            if (r === 0) {
              // サービス種類コード、サービス利用項目のループ
              if (i % 4 === 0) {
                // 4の倍数の時、サービス種類コードを挿入
                row[c]  = this.seikyugakuApiData[servicecodeRoop][objData.key];
              } else if (i % 4 === 1) {
                // 4の倍数+1の時、サービス利用項目を挿入
                row[c]  = this.seikyugakuApiData[servicecodeRoop][objData.key2];
                servicecodeRoop++;
              } else {
                // 上記以外は空白を挿入
                row[c]  = '';
              }
            } else if (r === 1){
              // サービス利用日数のループ
              if ((i % 4 === 0)) {
                row[c]  = this.seikyugakuApiData[servicenissuRoop][objData.key];
                servicenissuRoop++;
              } else if (i % 4 === 1) {
                row[c]  = '日';
              } else {
                row[c]  = '';
              }
            } else if (r === 3){
              // 単位数単価のループ
              if ((i % 4 === 0)) {
                row[c]  = this.seikyugakuApiData[tanisutankaRoop][objData.key];
                tanisutankaRoop++;
              } else if (i % 4 === 2) {
                row[c]  = '円/単位';
              } else {
                row[c]  = '';
              }
            } else {
              // 上記以外の項目のループ
              if ((i % 4 === 0)) {
                row[c]  = this.seikyugakuApiData[othersRoop][objData.key];
                othersRoop++;
              } else {
              row[c]  = '';
              }
            }
          }
          seikyugakuData.push(row);
        }
      } else {
        // APIデータが取得できていない場合は空データを設定
        this.columnLength = 20;
        for (let r = 0; r < this.seikyugakuObj.length; r++) {
          let objData = this.seikyugakuObj[r];
          row = {
            title: objData.title,
            title2: objData.title2,
          };
          for (let i = 0; i < this.columnLength; i++) {
            let c = 'column' + i;
            row[c]  = '';
          }
          seikyugakuData.push(row);
        }
      }
      this.mainFlexGrid.itemsSource = seikyugakuData;
    },
    /**************
     * セルのマージ
     */
    mergeCell(flexGrid) {
      let mm = new wjGrid.MergeManager();
      // 結合するセルの範囲を指定
      // // セルのマージ
      let cellRanges = [];
      for (let r = 0; r < flexGrid.itemsSource.length + 1; r++) {
        // ヘッダーのマージ
        if (r !== 9 && r !== 10 && r !==14 && r !==15) {
          cellRanges.push(
            new wjGrid.CellRange(r, 0, r, 1),
            new wjGrid.CellRange(9, 0, 10, 0),
            new wjGrid.CellRange(14, 0, 15, 0),
          );
        }
        if (r == 1 || r == 2) {
          // サービス種類コード、利用日数のセルをマージ
          for (let c = 1; c < this.columnLength -1; c++){
            cellRanges.push(
              new wjGrid.CellRange(r, 4 * c -1, r, 4 * c + 1),
            );
          }
        } else if (r == 4) {
          // 単位数単価セルをマージ
          for (let c = 1; c < this.columnLength -1; c++){
            cellRanges.push(
              new wjGrid.CellRange(r, 2 * c, r, 2 * c + 1),
            );
          }
        } else if (r == 0) {
          // 列ヘッダーをマージ
          cellRanges.push(
            new wjGrid  .CellRange(0, 2, 0, this.columnLength +1),
          );
        } else {
          for (let c = 1; c < this.columnLength -1; c++){
            cellRanges.push(
              new wjGrid.CellRange(r, 4 * c -2, r, 4 * c + 1),
              new wjGrid.CellRange(r, 2, r, 5),
              new wjGrid.CellRange(r, 6, r, 9),
              new wjGrid.CellRange(r, 10, r, 13),
            );
          }
        }
      }
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
    /**************
     * セルのデザイン修正
     */
    formatCell(flexGrid) {
      let _self = this;
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッドの共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if (panel.cellType == wjGrid.CellType.Cell) {
          if ((c == 0) || (c == 1)){
            // 行ヘッダー（セル）のカスタマイズ
            s.textAlign = 'center';
            if ((r == 9) && (c == 0)) {
              s.lineHeight = '40px';
            }
            if ((r == 14) && (c == 0)) {
              if(_self.dispItemPtn === 2) {
                s.lineHeight = '40px';
              }
            }
          }
          if ((c !== 0) && (c !== 1) && (r !== 0)){
            // セル部分のスタイル
            s.backgroundColor = sysConst.COLOR.gridBackground;
            s.textAlign = 'right';
            s.paddingRight = '4px';
            if ((r == 1) || (r == 2)) {
              s.textAlign = 'center';
              if((((c +1) % 4) == 0) && (r == 2)) {
                s.textAlign = 'left';
                s.paddingLeft = '4px';
              }
            }
              if (r == 4) {
                s.textAlign = 'center';
              }
          }
        }
      }
    },
    ////////////////////////////////// 合計額Gridと共通 //////////////////////////////////

    /**************
     * セルの非表示、書き換え設定
     */
    settingDisplyItem(flexGrid) {
      if (this.dispItemPtn === 1) {
        // 様式A-1の場合、特別対策費を非表示
        flexGrid.rows[15].visible = false;
      } else if (this.dispItemPtn === 2) {
        // 様式A-2の場合、A型減免を非表示、請求額特別対策費：高額障害福祉サービス費
        flexGrid.rows[9].visible = false;
        flexGrid.rows[10].visible = false;
        if (2 < flexGrid.columns.length) {
          // 請求額Gird特別費のヘッダー文字上書き
          flexGrid.setCellData(15, 1, '高額障害福祉サービス費')
        }
        console.log(this.mainFlexGrid.itemsSource)
      } else if (this.dispItemPtn === 3) {
        // 様式B,Eの場合、特別対策費とA型減免を非表示
        flexGrid.rows[9].visible = false;
        flexGrid.rows[10].visible = false;
        flexGrid.rows[15].visible = false;
      } else if (this.dispItemPtn === 4) {
        // 様式Dの場合、１割相当額～自治体助成分請求額を非表示
        for (let i = 6; i < 17; i ++) {
          if (i !== 14) {
            flexGrid.rows[i].visible = false;
          }
        }
      } else if (this.dispItemPtn === 5) {
        // 様式E-2の場合、A型減免を非表示、特別費のヘッダー文字上書き
        flexGrid.rows[9].visible = false;
        flexGrid.rows[10].visible = false;
        if (2 < flexGrid.columns.length) {
          // 請求額Gird特別費のヘッダー文字上書き
          flexGrid.setCellData(15, 1, '高額障害児通所給付日')
        }
      }
    },
    ////////////////////////////////// 以下合計額 Grid //////////////////////////////////

    /********************
     * 合計グリッド
     */
    onInitializedTotal(flexGrid) {
      this.totalFlexGrid = flexGrid;
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
      while (flexGrid.columns.length < 1) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 17) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.columnHeaders.rows[0].height = 20;
      flexGrid.rows.defaultSize = 20;
      flexGrid.columns.defaultSize = 120;
      flexGrid.rows.height = 20;
      flexGrid.rows[0].cssClass = 'create-header';
      flexGrid.rows[1].cssClass = 'create-header';
      flexGrid.rows[4].cssClass = 'create-header';
      flexGrid.rows[6].cssClass = 'create-header';
      flexGrid.rows[7].cssClass = 'create-header';
      flexGrid.setCellData(1, 0, '合計');

      // セルの非表示設定
      this.settingDisplyItem(flexGrid)
      
      // セルのマージ
      let mm = new wjGrid.MergeManager();
      let cellRanges = [];
      cellRanges.push(
        new wjGrid.CellRange(1 , 0, 2, 0),
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
          if (r == 1) {
            s.textAlign = 'center';
            s.lineHeight = '40px';
            s.backgroundColor = sysConst.COLOR.selectedColor;
          }
          // if ((r == 0) || (r == 1) ||  (r == 4) || (r == 6) || (r == 7)) {
          //   s.backgroundColor = sysConst.COLOR.selectedColor;
            
          // }
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
      this.totalFlexGrid.setCellData(3, 0,  this.totalKyufuTani);
      this.totalFlexGrid.setCellData(5, 0,  this.totalSogaku);
      this.totalFlexGrid.setCellData(8, 0,  this.totalJyogengaku);
      this.totalFlexGrid.setCellData(9, 0,  this.totalAJigyoGenmengaku);
      this.totalFlexGrid.setCellData(10, 0,  this.totalAriyosyaFutangaku);
      this.totalFlexGrid.setCellData(11, 0, this.totalTyoseigoFutangaku);
      this.totalFlexGrid.setCellData(12, 0, this.totalJyogenFutangaku);
      this.totalFlexGrid.setCellData(13, 0, this.totalKetteiFutangaku);
      this.totalFlexGrid.setCellData(14, 0, this.totalTokubetuKyufugakuhi);
      this.totalFlexGrid.setCellData(15, 0, this.totalTokubetuTaisakuhi);
      this.totalFlexGrid.setCellData(16, 0, this.totalJichitaiJyoseigaku);
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
    max-width: calc(820px + 2px);
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
    .create-header {
      background-color: #eee!important;
    }
  }
  #kyuhu-seikyugaku-total {
    width: auto;
    border-radius: 0 4px 4px 0;
    background: #ccc;
    .create-header {
      background-color: #eee!important;
    }
  }
}

@media screen and (max-width: 1366px){

}

</style>