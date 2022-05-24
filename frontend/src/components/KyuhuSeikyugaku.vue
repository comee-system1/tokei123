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
      serviceData: this.getData(),
    };
  },
  
  methods: {
    getData: function () {
      let serviceData = [];
      let servicecount;
      // サービス数3と仮定
      servicecount = 3;
      for (let i = 0; i < servicecount; i++) {
        serviceData.push({
          uid: 1,
          teikyoService:  '医療介護', //提供サービス
          servicecode: '21',// サービス種類コード
          serviceriyounissu: '10',// 利用日数
          kyuhutanisu: Math.random() * 10000,
          tanisutanka: Math.random() * 100,
          souhiyougaku: Math.random() * 10000,
          itiwarisoutougaku: Math.random() * 1000,
          riyousyahutan2: Math.random() * 10000,
          jyougengetugaku: Math.random() * 10000,
          jigyousyagenmengaku: Math.random() * 10000,
          genmenriyousyahutan1: Math.random() * 10000,
          tyouseigohutan: Math.random() * 10000,
          jyougenriyousyahutangaku: Math.random() * 10000,
          ketteiriyousyahutangaku: Math.random() * 10000,
          kyuhuhi: Math.random() * 10000,
          tokubetutaisakuhi: Math.random() * 10000,
          zititaizyoseibun: Math.random() * 10000,
        });
        serviceData.push({
          uid: 2,
          teikyoService:  '生活介護', //提供サービス
          servicecode: '22',// サービス種類コード
          serviceriyounissu: '12',// 利用日数
          kyuhutanisu: Math.random() * 10000,
          tanisutanka: Math.random() * 10000,
          souhiyougaku: Math.random() * 10000,
          itiwarisoutougaku: Math.random() * 1000,
          riyousyahutan2: Math.random() * 10000,
          jyougengetugaku: Math.random() * 10000,
          jigyousyagenmengaku: Math.random() * 10000,
          genmenriyousyahutan1: Math.random() * 10000,
          tyouseigohutan: Math.random() * 10000,
          jyougenriyousyahutangaku: Math.random() * 10000,
          ketteiriyousyahutangaku: Math.random() * 10000,
          kyuhuhi: Math.random() * 10000,
          tokubetutaisakuhi: Math.random() * 10000,
          zititaizyoseibun: Math.random() * 10000,
        });
        serviceData.push({
          uid: 3,
          teikyoService:  '短期入所', //提供サービス
          servicecode: '32',// サービス種類コード
          serviceriyounissu: '13',// 利用日数
          kyuhutanisu: Math.random() * 10000,
          tanisutanka: Math.random() * 10000,
          souhiyougaku: Math.random() * 10000,
          itiwarisoutougaku: Math.random() * 1000,
          riyousyahutan2: Math.random() * 10000,
          jyougengetugaku: Math.random() * 10000,
          jigyousyagenmengaku: Math.random() * 10000,
          genmenriyousyahutan1: Math.random() * 10000,
          tyouseigohutan: Math.random() * 10000,
          jyougenriyousyahutangaku: Math.random() * 10000,
          ketteiriyousyahutangaku: Math.random() * 10000,
          kyuhuhi: Math.random() * 10000,
          tokubetutaisakuhi: Math.random() * 10000,
          zititaizyoseibun: Math.random() * 10000,
        });
        serviceData.push({
          uid: 4,
          teikyoService:  '共同生活援助', //提供サービス
          servicecode: '33',// サービス種類コード
          serviceriyounissu: '4',// 利用日数
          kyuhutanisu: Math.random() * 10000,
          tanisutanka: Math.random() * 10000,
          souhiyougaku: Math.random() * 10000,
          itiwarisoutougaku: Math.random() * 1000,
          riyousyahutan2: Math.random() * 10000,
          jyougengetugaku: Math.random() * 10000,
          jigyousyagenmengaku: Math.random() * 10000,
          genmenriyousyahutan1: Math.random() * 10000,
          tyouseigohutan: Math.random() * 10000,
          jyougenriyousyahutangaku: Math.random() * 10000,
          ketteiriyousyahutangaku: Math.random() * 10000,
          kyuhuhi: Math.random() * 10000,
          tokubetutaisakuhi: Math.random() * 10000,
          zititaizyoseibun: Math.random() * 10000,
        });
        serviceData.push({
          uid: 5,
          teikyoService:  '宿泊型自立訓練', //提供サービス
          servicecode: '34',// サービス種類コード
          serviceriyounissu: '10',// 利用日数
          kyuhutanisu: Math.random() * 10000,
          tanisutanka: Math.random() * 10000,
          souhiyougaku: Math.random() * 10000,
          itiwarisoutougaku: Math.random() * 1000,
          riyousyahutan2: Math.random() * 10000,
          jyougengetugaku: Math.random() * 10000,
          jigyousyagenmengaku: Math.random() * 10000,
          genmenriyousyahutan1: Math.random() * 10000,
          tyouseigohutan: Math.random() * 10000,
          jyougenriyousyahutangaku: Math.random() * 10000,
          ketteiriyousyahutangaku: Math.random() * 10000,
          kyuhuhi: Math.random() * 10000,
          tokubetutaisakuhi: Math.random() * 10000,
          zititaizyoseibun: Math.random() * 10000,
        });
        serviceData.push({
        });
      }
      this.allData = serviceData;
      return serviceData;
    },
    onInitialized: function (flexGrid) {
      // サービス数3
      serviceData
      let serviceData = this.allData;
      let servicecount;
      let cellcount;
      // サービス数3と仮定
      servicecount = 3;
      // セル構成するために必要なループ数を決定
      if (servicecount < 4 ) {
          // サービスの数が3以下だった場合、空セルを表示
          switch (servicecount) {
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
        cellcount = 2 + 3 * servicecount +1;
      }
      // 空のセルをセット
      while (flexGrid.columns.length < cellcount) {
          flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 17) {
          flexGrid.rows.push(new wjGrid.Row());
      }

      // セルの成形
      flexGrid.frozenColumns = 1;
      flexGrid.frozenColumns = 2;
      flexGrid.columns[0].width = 80;
      flexGrid.columns[1].width = 170;
      // サービス明細表示部分のセルを成形
      for (let h = 0; h < servicecount; h++) {
        flexGrid.columns[2 + 3 * h].width = 35;
        flexGrid.columns[3 + 3 * h].width = 35;
        flexGrid.columns[4 + 3 * h].width = 90;
      }
      flexGrid.columns.defaultSize = 160;
      flexGrid.rows.defaultSize = 20;
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
      flexGrid.setCellData(1, cellcount-1, '合計');
      // サービスが入力されている2行目には円/日をセット
      for (let i = 0; i <= servicecount; i++) {
        flexGrid.setCellData(2, i * 3, '日');
      }
      // サービスが入力されている4行目には円/単位をセット
      for (let i = 0; i <= servicecount; i++) {
        flexGrid.setCellData(4, i * 3 + 1, '円/単位');
      }
      // サービスの値をセット
      console.log(serviceData);
      for (let i = 0; i < servicecount; i++) {
        flexGrid.setCellData(1, ((i + 1)  * 3 - 1) , serviceData[i]['servicecode']);
        flexGrid.setCellData(1, ((i + 1)  * 3) , serviceData[i]['teikyoService']);
        flexGrid.setCellData(2, ((i + 1)  * 3 - 1) , serviceData[i]['serviceriyounissu']);
        flexGrid.setCellData(3, ((i + 1)  * 3 - 1) , serviceData[i]['kyuhutanisu']);
        flexGrid.setCellData(4, ((i + 1)  * 3 - 1) , serviceData[i]['tanisutanka']);
        flexGrid.setCellData(5, ((i + 1)  * 3 - 1) , serviceData[i]['souhiyougaku']);
        flexGrid.setCellData(6, ((i + 1)  * 3 - 1) , serviceData[i]['itiwarisoutougaku']);
        flexGrid.setCellData(7, ((i + 1)  * 3 - 1) , serviceData[i]['riyousyahutan2']);
        flexGrid.setCellData(8, ((i + 1)  * 3 - 1) , serviceData[i]['jigyousyagenmengaku']);
        flexGrid.setCellData(9, ((i + 1)  * 3 - 1) , serviceData[i]['kyuhutanisu']);
        flexGrid.setCellData(10, ((i + 1)  * 3 - 1) , serviceData[i]['genmenriyousyahutan1']);
        flexGrid.setCellData(11, ((i + 1)  * 3 - 1) , serviceData[i]['tyouseigohutan']);
        flexGrid.setCellData(12, ((i + 1)  * 3 - 1) , serviceData[i]['jyougenriyousyahutangaku']);
        flexGrid.setCellData(13, ((i + 1)  * 3 - 1) , serviceData[i]['ketteiriyousyahutangaku']);
        flexGrid.setCellData(14, ((i + 1)  * 3 - 1) , serviceData[i]['kyuhuhi']);
        flexGrid.setCellData(15, ((i + 1)  * 3 - 1) , serviceData[i]['tokubetutaisakuhi']);
        flexGrid.setCellData(16, ((i + 1)  * 3 - 1) , serviceData[i]['zititaizyoseibun']);
        
        // 合計欄
        flexGrid.setCellData(3,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(4,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(5,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(6,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(7,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(8,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(9,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(10,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(11,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(12,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(13,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(14,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(15,  cellcount - 1 , Math.random() * 10000,);
        flexGrid.setCellData(16,  cellcount - 1 , Math.random() * 10000,);
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
          for (let c = 0; c <= servicecount; c++) {
            cellRanges.push(
            new wjGrid.CellRange(h,3 * c,h,3 * c + 1),
            );
          }
        } else if (h == 4) {
          // 4行目は2、3列目を結合
          for (let c = 0; c <= servicecount; c++) {
            cellRanges.push(
            new wjGrid.CellRange(h,3 * c - 1,h,3 * c),
            );
          }
        }else {
          for (let c = 1; c <= servicecount; c++) {
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
        s.textAlign = 'center'
        if((r == 0) || (c == 0) || (c == 1)){
          s.backgroundColor = "#eee";
        }
      }

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