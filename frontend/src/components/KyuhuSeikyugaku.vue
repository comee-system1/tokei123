<template>
  <div class="mt-1">
    <v-row  no-gutters>
      <v-col>
        <wj-flex-grid
            id="kyuhu-seikyugaku"
            :headersVisibility="'None'"
            :alternatingRowStep="0"
            :initialized="onInitializedServiceGrid"
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
      serviceData: this.getServiceData(),
      flexGridList:""
    };
  },
  
  methods: {
    onInitializedServiceGrid: function (flexGrid) {
      // グリッドの選択を無効にする
      this.flexGridList = flexGrid;
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // セルデータセット・成形
      this.seikyugakuCellSetting(flexGrid);
    },
    /**************
     * セルデータの取得
     */
    getServiceData: function () {
      // let serviceSmpData = [];
      let serviceData = [];
      if (this.$parent.$data.gridReloadFlag == true) {
        // ユーザー選択時serviceDataに値をセット
        serviceData.push(
          {
            teikyoService:  '施設入所支援', //提供サービス
            servicecode: '32',// サービス種類コード
            serviceriyounissu: '31',// 利用日数
            kyuhutanisu: '11,360',
            tanisutanka: "11.32",
            souhiyougaku: '128,595',
            itiwarisoutougaku: '12,859',
          riyousyahutan2: '12,859',
            jyougengetugaku:"9,300",
            jigyousyagenmengaku: "",
            genmenriyousyahutan: "",
            tyouseigohutan: "9,300",
            jyougenriyousyahutangaku: "",
            ketteiriyousyahutangaku: "9,300",
            kyuhuhi: '119,295',
            tokubetutaisakuhi: "",
            zititaizyoseibun: "",
          },
          {
            teikyoService:  '生活介護', //提供サービス
            servicecode: '22',// サービス種類コード
            serviceriyounissu: '31',// 利用日数
            kyuhutanisu: '33,432',
            tanisutanka: "11.22",
            souhiyougaku: '375,107',
            itiwarisoutougaku: '37,510',
            riyousyahutan2: '37,510',
            jyougengetugaku:"9,300",
            jigyousyagenmengaku: "",
            genmenriyousyahutan: "",
            tyouseigohutan: "0",
            jyougenriyousyahutangaku: "",
            ketteiriyousyahutangaku: "0",
            kyuhuhi: '375,107',
            tokubetutaisakuhi: "",
            zititaizyoseibun: "",
          }
        );
        // serviceSmpData.push(
        //   {
        //     smpTeikyoService:  '施設入所支援', //提供サービス
        //     smpServicecode: '32',// サービス種類コード
        //     smpServiceriyounissu: '31',// 利用日数
        //   },
        //   {
        //     smpTeikyoService:  '生活介護', //提供サービス
        //     smpServicecode: '22',// サービス種類コード
        //     smpServiceriyounissu: '31',// 利用日数
        //   }
        // );
        // for (let i = 0; i < serviceSmpData.length; i++) {
        //   serviceData.push({
        //     uid: i,
        //     teikyoService: serviceSmpData[i].smpTeikyoService, //提供サービス
        //     servicecode: serviceSmpData[i].smpServicecode,// サービス種類コード
        //     serviceriyounissu: serviceSmpData[i].smpServiceriyounissu,// 利用日数
        //     kyuhutanisu: Math.floor(Math.random() * 100000),
        //     tanisutanka: "11.32",
        //     souhiyougaku: Math.floor(Math.random() * 1000000),
        //     itiwarisoutougaku: Math.floor(Math.random() * 10000),
        //     riyousyahutan2: Math.floor(Math.random() * 10000),
        //     jyougengetugaku:"9,300",
        //     jigyousyagenmengaku: "",
        //     genmenriyousyahutan: "",
        //     tyouseigohutan: "9,300",
        //     jyougenriyousyahutangaku: "",
        //     ketteiriyousyahutangaku: "9,300",
        //     kyuhuhi: Math.floor(Math.random() * 100000),
        //     tokubetutaisakuhi: "",
        //     zititaizyoseibun: "",
        //   });
        // }
      }
      return serviceData;
    },
    /**************
     * セルデータセット・成形
     */
    seikyugakuCellSetting(flexGrid) {
      let serviceGridData = this.getServiceData();
      let cellcount;
      // セル構成するために必要なループ数を決定
      if (serviceGridData.length < 4 ) {
        // サービスの数が3以下だった場合、空セルを表示
        switch (serviceGridData.length) {
          case 0:
            cellcount = 7;
            break;
          case 1:
            cellcount = 9;
            break;
          case 2:
            cellcount = 11;
            break;
          case 3:
            cellcount =13;
            break;
        }
      } else {
        // ※ヘッダー２列＋１サービスにつきセル３列＋合計欄１列
        cellcount = 2 + 3 * serviceGridData.length +1;
      }
      // 空のセルをセット
      while (flexGrid.columns.length < cellcount) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 17) {
        flexGrid.rows.push(new wjGrid.Row());
      }

      // ヘッダーセルの成形
      flexGrid.frozenColumns = 1;
      flexGrid.frozenColumns = 2;
      flexGrid.columns[0].width = 80;
      flexGrid.columns[1].width = 170;
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
      flexGrid.setCellData(14, 0, '請求額');
      flexGrid.setCellData(14, 1, '給付日');
      flexGrid.setCellData(15, 1, '特別対策費');
      flexGrid.setCellData(16, 0, '自治体助成分請求書');
      flexGrid.setCellData(1, cellcount-1, '合計');
      // 値の入力がないセルの成形
      flexGrid.columns.defaultSize = 160;
      flexGrid.rows.defaultSize = 20;
      flexGrid.alternatingRowStep = 0;
      flexGrid.isReadOnly = true;

      // 値が入力されているセルの幅調整
      for (let h = 0; h < serviceGridData.length; h++) {
        flexGrid.columns[2 + 3 * h].width = 35;
        flexGrid.columns[3 + 3 * h].width = 35;
        flexGrid.columns[4 + 3 * h].width = 90;
      }
      // サービスが入力されている2行目には円/日をセット
      for (let i = 1; i <= serviceGridData.length; i++) {
        flexGrid.setCellData(2, i * 3, '日');
      }
      // サービスが入力されている4行目には円/単位をセット
      for (let i = 0; i <= serviceGridData.length; i++) {
        flexGrid.setCellData(4, i * 3 + 1, '円/単位');
      }
      // サービスの値をセット
      for (let i = 0; i < serviceGridData.length; i++) {
        flexGrid.setCellData(1, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['servicecode']);
        flexGrid.setCellData(1, ((i + 1)  * 3) ,      serviceGridData[i]['teikyoService']);
        flexGrid.setCellData(2, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['serviceriyounissu']);
        flexGrid.setCellData(3, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['kyuhutanisu']);
        flexGrid.setCellData(4, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['tanisutanka']);
        flexGrid.setCellData(5, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['souhiyougaku']);
        flexGrid.setCellData(6, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['itiwarisoutougaku']);
        flexGrid.setCellData(7, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['riyousyahutan2']);
        flexGrid.setCellData(8, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['jyougengetugaku']);
        flexGrid.setCellData(9, ((i + 1)  * 3 - 1) ,  serviceGridData[i]['jigyousyagenmengaku']);
        flexGrid.setCellData(10, ((i + 1)  * 3 - 1) , serviceGridData[i]['genmenriyousyahutan']);
        flexGrid.setCellData(11, ((i + 1)  * 3 - 1) , serviceGridData[i]['tyouseigohutan']);
        flexGrid.setCellData(12, ((i + 1)  * 3 - 1) , serviceGridData[i]['jyougenriyousyahutangaku']);
        flexGrid.setCellData(13, ((i + 1)  * 3 - 1) , serviceGridData[i]['ketteiriyousyahutangaku']);
        flexGrid.setCellData(14, ((i + 1)  * 3 - 1) , serviceGridData[i]['kyuhuhi']);
        flexGrid.setCellData(15, ((i + 1)  * 3 - 1) , serviceGridData[i]['tokubetutaisakuhi']);
        flexGrid.setCellData(16, ((i + 1)  * 3 - 1) , serviceGridData[i]['zititaizyoseibun']);
        // 合計欄
        flexGrid.setCellData(3,   cellcount - 1 , '44,792');
        flexGrid.setCellData(4,   cellcount - 1 , '');
        flexGrid.setCellData(5,   cellcount - 1 , '503,702');
        flexGrid.setCellData(6,   cellcount - 1 , '');
        flexGrid.setCellData(7,   cellcount - 1 , '');
        flexGrid.setCellData(8,   cellcount - 1 , '18,600');
        flexGrid.setCellData(9,   cellcount - 1 , '');
        flexGrid.setCellData(10,  cellcount - 1 , '');
        flexGrid.setCellData(11,  cellcount - 1 , '9,300');
        flexGrid.setCellData(12,  cellcount - 1 , '');
        flexGrid.setCellData(13,  cellcount - 1 , '9,300');
        flexGrid.setCellData(14,  cellcount - 1 , '494,402');
        flexGrid.setCellData(15,  cellcount - 1 , '');
        flexGrid.setCellData(16,  cellcount - 1 , '');
        // flexGrid.setCellData(3,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(4,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(5,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(6,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(7,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(8,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(9,   cellcount - 1 ,  Math.random() * 10000,);
        // flexGrid.setCellData(10,  cellcount - 1 , Math.random() * 10000,);
        // flexGrid.setCellData(11,  cellcount - 1 , Math.random() * 10000,);
        // flexGrid.setCellData(12,  cellcount - 1 , Math.random() * 10000,);
        // flexGrid.setCellData(13,  cellcount - 1 , Math.random() * 10000,);
        // flexGrid.setCellData(14,  cellcount - 1 , Math.random() * 10000,);
        // flexGrid.setCellData(15,  cellcount - 1 , Math.random() * 10000,);
        // flexGrid.setCellData(16,  cellcount - 1 , Math.random() * 10000,);
      }
      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定(ヘッダー、合計入力欄)
      let cellRanges = [
        new wjGrid.CellRange(0,2,0,cellcount-1),
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
        new wjGrid.CellRange(1,cellcount-1,2,cellcount-1),
      ];
      // サービス明細表示部分のセルを結合
      for (let h = 1; h < 17; h++) {
        if (h == 1 || h == 2) {
          // 1，2行目は3、4列目を結合
          for (let c = 0; c <= serviceGridData.length; c++) {
            cellRanges.push(
            new wjGrid.CellRange(h,3 * c,h,3 * c + 1),
            );
          }
        } else if (h == 4) {
          // 4行目は2、3列目を結合
          for (let c = 0; c <= serviceGridData.length; c++) {
            cellRanges.push(
            new wjGrid.CellRange(h,3 * c - 1,h,3 * c),
            );
          }
        }else {
          for (let c = 1; c <= serviceGridData.length; c++) {
            cellRanges.push(
            new wjGrid.CellRange(h,3 * c - 1,h,3 * c + 1),
            );
          }
        }
      }
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
        
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        s.textAlign = 'right'
        s.paddingRight = '4px';
        s.backgroundColor = sysConst.COLOR.gridBackground;
        // ヘッダー色変更・中央寄せ
        if ((r == 0) || (c == 0) || (c == 1)) {
        s.backgroundColor = sysConst.COLOR.selectedColor;
        s.textAlign = 'center'
        }
        // 請求額中央寄せ
        if ((r == 9) && (c == 0)) {
            s.display ="flex";
            s.alignItems = "center";
            s.justifyContent = "center";
        }
        // A型減免セル中央寄せ
        if ((r == 14) && (c == 0)) {
            s.display ="flex";
            s.alignItems = "center";
            s.justifyContent = "center";
        }
        // 合計セル中央寄せ
        if ((r == 1) && (c == cellcount -1)) {
            s.display ="flex";
            s.alignItems = "center";
            s.justifyContent = "center";
            s.backgroundColor = sysConst.COLOR.selectedColor;
        }
        // 数値右寄せ
        if ((r == 3) && (c == cellcount -1) ) {
          s.textAlign = 'right'
          s.paddingRight = '4px';
        }
        // サービスコード・種類、利用日数、単位数単価中央寄せ
        for (let i = 0; i <= serviceGridData.length; i++) {
          // サービスコード
          if ((r == 1) && (i * 3 + 1) ) {
            s.textAlign = 'center'
          }
          // 利用日数
          if ((r == 2) && (i * 3 + 1)) {
            s.textAlign = 'center'
          }
          // 単位数単価
          if ((r == 4) && ((i * 3 + 1) && (c != cellcount -1))) {
            s.textAlign = 'center'
          }
        }
      }
    },
    // ユーザークリック時データを再読み込み
    reloadSeikyugakuMethod:function() {
      // 請求額グリッド再読み込み
      this.seikyugakuCellSetting(this.flexGridList); 
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