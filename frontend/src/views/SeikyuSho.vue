<template>
  <div id="seikyu-sho">
    <ServiceSelection
      :seikyuflag="true"
      :seikyushoflag="true">
    </ServiceSelection>
    <v-container class="seikyusho" fluid>
      <v-row no-gutters>
        <div class="service-selecter">
        <label>市町村</label>
          <wj-combo-box
            selectedValuePath="val"
            displayMemberPath="name"
            :itemsSource="sichosonList"
            :selectedIndexChanged="onSichosonIndexChanged"
          >
          </wj-combo-box>
          <v-btn class="pa-1 ml-3" :width="60" style="margin-top:2px; margin-right:30px;" small  @click="searchClicked">検索</v-btn>
        </div>
        <div class="print-selecter">
          <label>印刷種類</label>
          <v-btn-toggle mandatory class="print-toggle">
            <v-btn small color="secondary" dark outlined>請求書</v-btn>
            <v-btn small color="secondary" dark outlined>一  覧</v-btn>
          </v-btn-toggle>
        </div>
        <wj-combo-box
          id="printCombo"
          :itemsSource="selects"
          :isDroppedDown="isDroppedDown"
          :isRequired="false"
          :selectedIndexChanged="onselectedIndexChanged"
        ></wj-combo-box>
      </v-row>
      <v-row no-gutters>
        <wj-flex-grid
          id="detailGrid"
          :itemsSource="detailGridData"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :initialized="onInitializeDetailGrid"
          :allowResizing="false"
          :allowDragging="false"
          :autoRowHeights="true"
          :allowPinning="false"
          :allowSorting="false"
        >
          <wj-flex-grid-column header="市町村名" binding="sname" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="区分" binding="svcname" :width="'10*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="件数"  binding="kensuA" :width="'4*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="単位数"  binding="tanisu" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="費用合計" binding="hiyoA" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="A 給付費請求額" binding="kyufuA" :width="'10*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="利用者負担額" binding="riyo" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="自治体助成額" binding="jichitai" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="件数" binding="kensuB" :width="'4*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="費用合計" binding="hiyoB" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="B 給付費請求額" binding="kyufuB" :width="'10*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="A+B 請求金額" binding="seikyu" :width="'12*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column header="印刷" binding="print" :width="'2*'" :wordWrap=true></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import { getOriginalDetailData } from '../data/SeikyuShoData.js'
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());
let selects = ['全選択/全解除', '印刷を全選択', '印刷を全解除'];

export default {
  components: {
    ServiceSelection
  },
  data() {
    return {
      sichosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
        { val: 3, name: '北経市' },
      ],
      selects: selects,
      detailGridData: apiResult['dummy'],
      isDroppedDown: false,
      selectedSichoson:"指定なし",
    }
  },
  methods: {
    onSichosonIndexChanged(s) {
      this.selectedSichoson = s.text;
    },
    searchClicked() {
      let data = apiResult['dummy'];
      let newData = [];
      let sort = this.selectedSichoson;

      if (sort =="指定なし") {
        newData = apiResult['dummy'];
      } else {
        data.forEach(function (value) {
          if (sort == value.sname) newData.push(value);
        });
      }
      this.detailGridData = newData;
    },
    onselectedIndexChanged(s) {
      // 全選択・全解除の選択値を取得して書き換え
      let data = this.detailGridData;
      let newData = [];
      data.forEach(function(value) {
        // 印刷チェックの制御
        if (s.selectedIndex == '1') value.print = '〇';
        if (s.selectedIndex == '2') value.print = '';
        newData.push(value);
      });
      this.detailGridData = newData;
      s.selectedIndex = 0; //どの値を選択しても初期状態に戻す
    },
    onInitializeDetailGrid(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // 空のヘッダー行とフッター行を追加/////////////////////////////////////////////
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      let headerpanel = flexGrid.columnHeaders;
      let footerPanel = flexGrid.columnFooters;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0,0,1,0),
        new wjGrid.CellRange(0,1,1,1),
				new wjGrid.CellRange(0,2,0,7),
				new wjGrid.CellRange(0,8,0,10),
        new wjGrid.CellRange(0,11,1,11),
				new wjGrid.CellRange(0,12,1,12)
      ];
      let cellRanges = this.getCellRanges(this.detailGridData);
      let footerRanges = [
        new wjGrid.CellRange(0,0,0,1)
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function(panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          for (let i = 0; i < cellRanges.length; i++) {
            if (cellRanges[i].contains(r, c)) {
              return cellRanges[i];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let f = 0; f < footerRanges.length; f++) {
            if (footerRanges[f].contains(r, c)) {
              return footerRanges[f];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;

      // 改行指定不要のヘッダー・フッターの内容を設定する
      // ヘッダー0行目
      headerpanel.setCellData(0, 0, "市町村名");
      headerpanel.setCellData(0, 1, "区分");
      headerpanel.setCellData(0, 2, "介護給付費・訓練等給付費");
			headerpanel.setCellData(0, 8, "特定障害者特別給付費");
      headerpanel.setCellData(0, 12, "印刷");

      // フッター0行目
      footerPanel.setCellData(0, 0, "合計");

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 25;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // ヘッダーの改行位置の設定
          if (r == 0 && c == 11) {
            cell.innerHTML = 'A + B<br/>請求金額';
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          if (c == 0 || c == 1) {
            s.textAlign = 'left';
          }

          if (c >= 2 && c <= 11) {
            s.textAlign = 'right';
          }

          if (c == 12) {
            s.backgroundColor = "#fff";
            cell.innerHTML = '<div class="printCell">'+cell.innerHTML+'</div>';
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = "1px solid rgba(0,0,0,.2)";
            s.textAlign = 'center';
          }

          if (c >= 2 && c <= 11 ) {
            // セルを薄黄色にする
            s.backgroundColor = "#fffeed";
            s.textAlign = 'right';
          } else if(c == 12) {
            // 空欄セルをグレーにする
            s.backgroundColor = "#cccccc";
          }
        }
      }

      //印刷箇所を押下
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        // 結合セルの先頭行
        let firstrow;
        if (e.srcElement["wj-cell-index"]) {
          firstrow = e.srcElement["wj-cell-index"].row;
        } else {
          firstrow = ht.row;
        }
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 12) {
          let p = flexGrid.getCellData(firstrow, 12);
          let mark = '';
          if (p == '〇') mark = '';
          if (p == '') mark = '〇';
          _self.detailGridData[firstrow]['print'] = mark;
          flexGrid.setCellData(firstrow, 12, mark);
        }
      });

      flexGrid.formatItem.addHandler((s,e)=>{
        if(e.panel.cellType == wjGrid.CellType.Cell && e.col == 12){
          wijmo.addClass(e.cell,"verticalCenterCustom")
        }
        if(e.panel.cellType == wjGrid.CellType.Cell && e.col == 11){
          wijmo.addClass(e.cell,"verticalBottomCustom")
        }
        if(e.panel.cellType == wjGrid.CellType.ColumnFooter && e.col >= 2){
          wijmo.addClass(e.cell,"verticalRightCustom")
        }
      });
    },
    getCellRanges(gridData) {
      let renges = [];
      let firstrow = 0;
      let lastrow = 0;
      for (let i = 0; i < gridData.length; i++) {
        if (i > 0 && i < gridData.length-1) {
          if (gridData[i-1]['sname'] == gridData[i]['sname']) {
            lastrow = i;
          } else if (gridData[i-1]['sname'] != gridData[i]['sname']) {
            renges.push(new wjGrid.CellRange(firstrow,0,lastrow,0));
            renges.push(new wjGrid.CellRange(firstrow,11,lastrow,11));
            renges.push(new wjGrid.CellRange(firstrow,12,lastrow,12));
            firstrow = i;
            lastrow = i;
          }
        } else if (i == gridData.length-1) {
          lastrow = i;
          renges.push(new wjGrid.CellRange(firstrow,0,lastrow,0));
          renges.push(new wjGrid.CellRange(firstrow,11,lastrow,11));
          renges.push(new wjGrid.CellRange(firstrow,12,lastrow,12));
        }
      }
      return renges;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

*{
  padding:0;
  margin:0;
}

// 仮の対応
div#seikyu-sho .transparent {
  visibility:hidden;
}

@media screen and (max-width: 1366px) {
  #detailGrid {
    height: 73vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 82vh;
  }
}

.service-selecter{
  label {
    display: inline-block;
    margin-top: 2px;
    margin-right: 2px;
    padding-top: 2px;
    font-weight: bold;
    background: #f0ffff;
    border: 1px solid #7db8ff;
    height: 29px;
    width: 60px;
    text-align: center;
  }
}

.print-selecter {
  margin-right: 0;
  margin-left: auto;
  label {
    display: inline-block;
    margin-top: 2px;
    margin-right: 2px;
    padding-top: 2px;
    font-weight: bold;
    background: #f0ffff;
    border: 1px solid #7db8ff;
    height: 29px;
    width: 75px;
    text-align: center;
  }
  .print-toggle {
    margin-right:10px;
  }
  .v-btn-toggle > .v-btn {
  width: 90px;
  }
}

#detailGrid .wj-header:not(.verticalRightCustom) {
  display: flex;
  justify-content: center;
  align-items: center;
  color:#333333 !important;
}

.wj-flexgrid .wj-cell.verticalCenterCustom {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wj-flexgrid .wj-cell.verticalBottomCustom{
  display: flex;
  justify-content: right;
  align-items: flex-end;
}

.wj-flexgrid .wj-cell.verticalRightCustom{
  display: flex;
  justify-content: right;
}

</style>
