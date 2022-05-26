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
      :allowPinning="false"
      :allowSorting="false"
    >
      <wj-flex-grid-column header="日付" binding="rymd" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="曜日" binding="youbi" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="夜間支援等体制加算" binding="kasanj" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="食事提供加算" binding="kasans" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="入院時支援特別加算" binding="kasan2" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="帰宅時支援加算" binding="kasank" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="日中支援加算" binding="kasannc" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="医療連携体制加算" binding="kasani" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="地域移行加算" binding="kasanti" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'22*'" :wordWrap=true></wj-flex-grid-column>
    </wj-flex-grid>

    <wj-flex-grid
      id="subGrid"
      :itemsSource="subGridData"
      :headersVisibility="'None'"
      :autoGenerateColumns="false"
      :initialized="onInitializeSubGrid"
      :allowResizing="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowSorting="false"
    >
      <wj-flex-grid-column binding="Column0" :width="'16*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column1" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column2" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column3" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column4" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column5" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column6" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuNyushoData.js'
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
      this.detailGridData = this.getGridData(apiResult);
      this.subGridData = this.getSubGridData(apiResult);
    }
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      subGridData: this.getSubGridData()
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
        new wjGrid.CellRange(0,2,0,9),
        new wjGrid.CellRange(0,10,1,10),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0,0,0,2)
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
      headerpanel.setCellData(0, 10, "備考");
      // フッター0行目
      footerPanel.setCellData(0, 0, "合計");

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 45;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // ヘッダーの改行位置の設定
          if (r == 0 && c == 0) {
            cell.innerHTML = '日<br/>付';
          } else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          } else if (r == 1 && c == 2) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          } else if (r == 1 && c == 3) {
            cell.innerHTML = '夜間支援等<br/>体制加算';
          } else if (r == 1 && c == 4) {
            cell.innerHTML = '食事提供<br/>加算';
          } else if (r == 1 && c == 5) {
            cell.innerHTML = '入院時支援<br/>特別加算';
          } else if (r == 1 && c == 6) {
            cell.innerHTML = '帰宅時<br/>支援加算';
          } else if (r == 1 && c == 7) {
            cell.innerHTML = '日中<br/>支援加算';
          } else if (r == 1 && c == 8) {
            cell.innerHTML = '医療連携<br/>体制加算';
          } else if (r == 1 && c == 9) {
            cell.innerHTML = '地域<br/>移行加算';
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          if (panel.rows[r].dataItem.youbi=="土" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='blue--text'>"+ cell.innerHTML +"</div>";
          } else if (panel.rows[r].dataItem.youbi=="日" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='red--text'>"+ cell.innerHTML +"</div>";
          }

          //備考欄を左寄せにする
          if (c == 10) {
            s.textAlign = "left";
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = "1px solid rgba(0,0,0,.2)";
          }

          if (c >= 3 && c <= 9) {
            // セルを薄黄色にする
            s.backgroundColor = "#fffeed";
          } else if (c == 10) {
            // 空欄セルをグレーにする
            s.backgroundColor = "#cccccc";
          }
        }
      }
    },
    onInitializeSubGrid(flexGrid) {
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

        if (r == 1 && (c == 5 || c == 6)) {
          // 空欄セルをグレーにする
          s.backgroundColor= "#cccccc";
        }
      }
    },
    getGridData(data) {
      // グリッド表示用データの作成
      let gridData = [];
      if (data != null) {
        let kirokuMeiData = data['riyo_inf'][0]['kiroku_mei'];
        kirokuMeiData.forEach(rowData => {
          // 曜日表示用に文字列の日付をDate型に変換
          let datearr = (rowData["rymd"].substr(0, 4) + '/' + rowData["rymd"].substr(4, 2) + '/' + rowData["rymd"].substr(6, 2)).split('/');
          let date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
          gridData.push(
            {
              rymd: Number(rowData["rymd"].substr(6,2)),
              youbi: WeekChars[date.getDay()],
              jyokyo: rowData["jyokyo"],
              kasanj: rowData["kasanj"] == 0 ? "":rowData["kasanj"],
              kasans: rowData["kasans"] == 0 ? "":rowData["kasans"],
              kasan2: rowData["kasan2"] == 0 ? "":rowData["kasan2"],
              kasank: rowData["kasank"] == 0 ? "":rowData["kasank"],
              kasannc: rowData["kasannc"] == 0 ? "":rowData["kasannc"],
              kasani: rowData["kasani"] == 0 ? "":rowData["kasani"],
              kasanti: rowData["kasanti"] == 0 ? "":rowData["kasanti"],
              biko: rowData["biko"],
            }
          )
        });
      } else {
        gridData.push(
          {
            rymd: "",
            youbi: "",
            jyokyo: "",
            kasanj: "",
            kasans: "",
            kasan2: "",
            kasank: "",
            kasannc: "",
            kasani: "",
            kasanti: "",
            biko: "",
          }
        )
      }
      return gridData;
    },
    getSubGridData(data) {
      // サブグリッド表示用データの作成
      let subGridData = [];
      if (data != null) {
        let riyouKaishibi = data['riyo_inf'][0]['staymd'];
        let tougetsuSantei = data['riyo_inf'][0]['ms2_kaisu'];
        let taishoDate = data['riyo_inf'][0]['taiymd'];
        let taishogoSanteibi = data['riyo_inf'][0]['ttymd'];
        subGridData.push(
          {
            Column0: "初期加算",
            Column1: "利用開始日",
            Column2: dateFilter(riyouKaishibi),
            Column3: "30日目",
            Column4: thirtythDayFilter(riyouKaishibi),
            Column5: "当月算定日数",
            Column6: tougetsuSantei + "日"
          },
          {
            Column0: "地域移行加算",
            Column1: "退所日",
            Column2: dateFilter(taishoDate),
            Column3: "退所後算定日",
            Column4: dateFilter(taishogoSanteibi),
            Column5: "",
            Column6: ""
          }
        )
      } else {
        subGridData.push(
          {
            Column0: "初期加算",
            Column1: "利用開始日",
            Column2: "",
            Column3: "30日目",
            Column4: "",
            Column5: "当月算定日数",
            Column6: "",
          },
          {
            Column0: "地域移行加算",
            Column1: "退所日",
            Column2: "",
            Column3: "退所後算定日",
            Column4: "",
            Column5: "",
            Column6: ""
          }
        )
      }
      return subGridData;
    }
  },
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

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
/* 利用者情報エリアのスタイル */
*{
  padding:0;
  margin:0;
}

@media screen and (max-width: 1366px) {
  #detailGrid {
    height: 64vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 76vh;
  }
}
</style>