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
      :allowResizing="false"
      :allowDragging="false"
      :autoRowHeights="true"
    >
      <wj-flex-grid-column header="日付" binding="rymd" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="曜日" binding="youbi" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="算定日数"  binding="keitai" :width="'15*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="特別地域加算" binding="kasantkt" :width="'15*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="定着支援連携促進加算" binding="kasantren" :width="'15*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'59*'" :wordWrap=true></wj-flex-grid-column>
    </wj-flex-grid>

    <wj-flex-grid
      id="subGrid"
      :itemsSource="subGridData"
      :headersVisibility="'None'"
      :autoGenerateColumns="false"
      :initialized="onInitializeSubGrid"
      :allowResizing="false"
      :allowDragging="false"
    >
      <wj-flex-grid-column binding="Column0" :width="'16*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column1" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column2" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column3" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column4" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
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
    riyousya:function() {
      this.sikyuryoData = apiResult['riyo_inf'][0]['sikyuryo'];
      this.detailGridData = this.getGridData(apiResult);
      this.subGridData = this.getSubGridData(apiResult);
      this.gridchageFlag = true;
    }
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      sikyuryoData: "",
      subGridData: this.getSubGridData(),
    }
  },
  methods: {
    onInitializeDetailGrid:function(flexGrid) {
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
        new wjGrid.CellRange(0,2,0,5),
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

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 25;
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
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          if (panel.rows[r].dataItem.youbi=="土" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='blue--text'>"+ cell.innerHTML +"</div>";
          } else if (panel.rows[r].dataItem.youbi=="日" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='red--text'>"+ cell.innerHTML +"</div>";
          }

          //備考欄を左寄せにする
          if (c == 5) {
            s.textAlign = "left";
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = "1px solid rgba(0,0,0,.2)";
          }

          if (c >= 2 && c <= 4) {
            // セルを薄黄色にする
            s.backgroundColor = "#fffeed";
          } else if (c == 5) {
            // 空欄セルをグレーにする
            s.backgroundColor = "#cccccc";
          }
        }
      }
    },
    onInitializeSubGrid:function(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      flexGrid.itemFormatter = function(panel,r,c,cell) {
        let s = cell.style;
        s.textAlign = 'center';
        if (c == 0 || c == 1 || c == 3 || c == 5) {
          // セルをヘッダーの色にする
          s.backgroundColor= "#eeeeee";
          s.fontWeight="bold";
        }
      }
    },
    getGridData:function(data) {
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
              kasantkt: kirokuMeiData[i]["kasantkt"] == "0" ? "":kirokuMeiData[i]["kasantkt"],
              kasantren: kirokuMeiData[i]["kasantren"] == "0" ? "":kirokuMeiData[i]["kasantren"],
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
            kasantkt: "",
            kasantren: "",
            biko: "",
          }
        )
      }
      return gridData;
    },
    getSubGridData:function(data) {
      // サブグリッド表示用データの作成
      let subGridData = [];
      if (data != null) {
        let riyouKaishibi = data['riyo_inf'][0]['staymd'];
        subGridData.push(
          {
            Column0: "初期加算",
            Column1: "利用開始日",
            Column2: dateFilter(riyouKaishibi),
            Column3: "支援レポート共有日",
            Column4: thirtythDayFilter(riyouKaishibi),
          },
        )
      } else {
        subGridData.push(
          {
            Column0: "初期加算",
            Column1: "利用開始日",
            Column2: "",
            Column3: "支援レポート共有日",
            Column4: "",
          },
        )
      }
      return subGridData;
    },
  }
}

// 西暦＋年月日フィルター
function dateFilter(date) {
  let datearr = (date.substr(0, 4) + '年' + date.substr(4, 2) + '月' + date.substr(6, 2) + '日');
  return datearr;
}

// 30日目変換用
function thirtythDayFilter(riyouKaishibi) {
  let datearr = (riyouKaishibi.substr(0, 4) + '/' + riyouKaishibi.substr(4, 2) + '/' + riyouKaishibi.substr(6, 2)).split('/');
  let thirtythDay = new Date(datearr[0], datearr[1] - 1, datearr[2]);
  thirtythDay.setDate(thirtythDay.getDate() + 29);
  thirtythDay = thirtythDay.getFullYear() + '年' +
                ( '00' + (thirtythDay.getMonth() + 1) ).slice( -2 ) + '月' +
                ( '00' + (thirtythDay.getDate()) ).slice( -2 )  + '日';
  return thirtythDay;
}

// 曜日変換用
const WeekChars = [ "日", "月", "火", "水", "木", "金", "土" ];
</script>

<style scoped>
*{
  padding:0;
  margin:0;
}

@media screen and (max-width: 1366px) {
  #detailGrid {
    height: 62vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 75vh;
  }
}
</style>