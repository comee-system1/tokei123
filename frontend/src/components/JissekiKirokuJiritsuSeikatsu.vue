<template>
  <div>
    <v-row>
      <v-col cols="12" class="user-info">
        <v-row>
          <div class="riyousya-block">
            <label>利用者</label>
            <wj-combo-box :isReadOnly="true" class="user-box" v-bind:text="riyousya"></wj-combo-box>
          </div>
          <div class="jukyusyasho-block">
            <label>受給者証番号</label>
            <wj-combo-box :isReadOnly="true" class="user-box zyukyusya-num" v-bind:text="zyukyusyaNum"></wj-combo-box>
          </div>
        </v-row>
        <v-row class="row-2">
          <div class="keiyakuryo-block">
            <label>契約支給量</label>
            <wj-combo-box :isReadOnly="true" v-bind:text= sikyuryoData class="keiyakusikyu-box user-box"></wj-combo-box>
          </div>
          <v-btn-toggle mandatory class="denbun-toggle">
            <v-btn small color="secondary" dark outlined>電文作成有</v-btn>
            <v-btn small color="secondary" dark outlined>電文作成無</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-col>
    </v-row>

    <wj-flex-grid
      id="detailGrid"
      :itemsSource="detailGridData"
      :headersVisibility="'Column'"
      :autoGenerateColumns="false"
      :initialized="onInitializeDetailGrid"
      :itemsSourceChanged="onInitializeDetailGridChanged"
      :allowResizing="false"
      :allowDragging="false"
      :autoRowHeights="true"
    >
      <wj-flex-grid-column header="日付" binding="rymd" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="曜日" binding="youbi" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="算定日数"  binding="keitai" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="同行支援加算" binding="kasandk" :width="'12*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="初回加算" binding="kasansyo" :width="'12*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="緊急時支援加算" binding="kasanknk" :width="'12*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="地域居住支援体制強化推進加算" binding="kasankk" :width="'12*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="日常生活支援情報提供加算" binding="kasanjt" :width="'12*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'26*'" :wordWrap=true></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuTsushoData.js'
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter'
import "@grapecity/wijmo.vue2.grid.search";
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());

export default {
  props: {
    userListData: String,
    riyousya: String,
    zyukyusyaNum: String,
  },
  watch: {
    riyousya() {
      this.sikyuryoData = apiResult['riyo_inf'][0]['sikyuryo'];
      this.kinkyuShienTotal = getKinkyuShienTotal(apiResult['riyo_inf'][0]['kiroku_mei']);
      this.detailGridData = this.getGridData(apiResult);
      this.gridchageFlag = true;
    }
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      sikyuryoData: "",
      kinkyuShienTotal: 0,
    }
  },
  methods: {
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
        new wjGrid.CellRange(0,2,0,8),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0,0,0,1),
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function(panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
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
      headerpanel.setCellData(0, 2, "支援実績");
      // フッター0行目
      footerPanel.setCellData(0, 0, "合計");
      footerPanel.setCellData(0, 5, this.kinkyuShienTotal);

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 40;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // 改行指定が必要なヘッダーセルの内容を設定
          if (r == 0 && c == 0) {
            cell.innerHTML = '日<br/>付';
          } else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          } else if (r == 1 && c == 6) {
            cell.innerHTML = '地域居住支援体制<br/>強化推進加算';
          } else if (r == 1 && c == 7) {
            cell.innerHTML = '日常生活支援<br/>情報提供加算';
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          if (panel.rows[r].dataItem.youbi=="土" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='blue--text'>"+ cell.innerHTML +"</div>";
          } else if(panel.rows[r].dataItem.youbi=="日" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='red--text'>"+ cell.innerHTML +"</div>";
          }

          //備考欄を左寄せにする
          if (c == 8) {
            s.textAlign = "left";
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = "1px solid rgba(0,0,0,.2)";
          }

          if (c >= 2 && c <= 7) {
            // セルを薄黄色にする
            s.backgroundColor = "#fffeed";
          } else if (c == 8) {
            // 空欄セルをグレーにする
            s.backgroundColor = "#cccccc";
          }
        }
      }
    },
    onInitializeDetailGridChanged(flexGrid) {
      if (this.gridchageFlag) {
        let footerPanel = flexGrid.columnFooters;
        footerPanel.setCellData(0, 5, this.kinkyuShienTotal);
        this.gridchageFlag = false;
      }
    },
    getGridData(data) {
      // グリッド表示用データの作成
      let gridData = [];
      if (data != null) {
        let kirokuMeiData = data['riyo_inf'][0]['kiroku_mei'];
        for (let i = 0; i<kirokuMeiData.length; i++) {
          // 曜日表示用に文字列の日付をDate型に変換
          let datearr = (kirokuMeiData[i]["rymd"].substr(0, 4) + '/' + kirokuMeiData[i]["rymd"].substr(4, 2) + '/' + kirokuMeiData[i]["rymd"].substr(6, 2)).split('/');
          let date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
          gridData.push(
            {
              rymd: Number(kirokuMeiData[i]["rymd"].substr(6,2)),
              youbi: WeekChars[date.getDay()],
              keitai: kirokuMeiData[i]["keitai"],
              kasandk: kirokuMeiData[i]["kasandk"] == "0" ? "":kirokuMeiData[i]["kasandk"],
              kasansyo: kirokuMeiData[i]["kasansyo"] == "0" ? "":kirokuMeiData[i]["kasansyo"],
              kasanknk: kirokuMeiData[i]["kasanknk"],
              kasankk: kirokuMeiData[i]["kasankk"] == "0" ? "":kirokuMeiData[i]["kasankk"],
              kasanjt: kirokuMeiData[i]["kasanjt"] == "0" ? "":kirokuMeiData[i]["kasanjt"],
              biko: kirokuMeiData[i]["biko"] == 0 ? "":kirokuMeiData[i]["biko"],
            }
          )
        }
      } else {
        gridData.push(
          {
            rymd: "",
            youbi: "",
            keitai: "",
            kasandk: "",
            kasansyo: "",
            kasanknk: "",
            kasankk: "",
            kasanjt: "",
            biko: "",
          }
        )
      }
      return gridData;
    },
  }
}

// 曜日変換用
const WeekChars = [ "日", "月", "火", "水", "木", "金", "土" ];

// 緊急時支援加算合計算出用
function getKinkyuShienTotal(data) {
  let totalCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]['kasanknk'] == 1 || data[i]['kasanknk'] == 2) {
      totalCount++ ;
    }
  }
  return totalCount;
}
</script>

<style scoped>
*{
  padding:0;
  margin:0;
}

@media screen and (max-width: 1366px) {
  #detailGrid {
    height: 67vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 78vh;
  }
}
</style>