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
      <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="開始時間" binding="jstime" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="終了時間" binding="jetime" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="往" binding="gei" :width="'5*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="復" binding="sou" :width="'5*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="時間数" binding="kasanh_mn" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="食事提供加算" binding="kasans" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="体験利用支援加算" binding="kasantkn" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="重度障害者支援加算(研修修了者)" binding="kasanj" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'21*'" :wordWrap=true></wj-flex-grid-column>
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
      <wj-flex-grid-column binding="Column5" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column6" :width="'14*'" :wordWrap=true></wj-flex-grid-column>
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
  watch:{
    riyousya:function() {
      this.sikyuryoData = apiResult['riyo_inf'][0]['sikyuryo'];
      this.sougeiTotal = getSougeiTotal(apiResult['riyo_inf'][0]['kiroku_mei']);
      this.jikansuTotal = getJikansuTotal(apiResult['riyo_inf'][0]['kiroku_mei']);
      this.taikenRiyoTotal = getTaikenRiyoTotal(apiResult['riyo_inf'][0]['kiroku_mei']);
      this.detailGridData = this.getGridData(apiResult);
      this.subGridData = this.getSubGridData(apiResult);
      this.gridchageFlag = true;
    }
  },
  data() {
    return {
      detailGridData: this.getGridData(),
      sikyuryoData: "",
      sougeiTotal: 0,
      jikansuTotal: 0,
      taikenRiyoTotal: 0,
      subGridData: this.getSubGridData(),
    }
  },
  methods: {
    onInitializeDetailGrid:function(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // 空のヘッダー行とフッター行を追加/////////////////////////////////////////////
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      let headerpanel = flexGrid.columnHeaders;
      let footerPanel = flexGrid.columnFooters;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0,0,2,0),
        new wjGrid.CellRange(0,1,2,1),
        new wjGrid.CellRange(0,2,0,11),
        new wjGrid.CellRange(1,2,2,2),
        new wjGrid.CellRange(1,3,2,3),
        new wjGrid.CellRange(1,4,2,4),
        new wjGrid.CellRange(1,5,1,6),
        new wjGrid.CellRange(1,8,2,8),
        new wjGrid.CellRange(1,9,2,9),
        new wjGrid.CellRange(1,10,2,10),
        new wjGrid.CellRange(1,11,2,11),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0,0,0,4),
        new wjGrid.CellRange(0,5,0,6)
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
      headerpanel.setCellData(0, 2, "サービス提供実績");
      // ヘッダー1行目
      headerpanel.setCellData(1, 3, "開始時間");
      headerpanel.setCellData(1, 4, "終了時間");
      headerpanel.setCellData(1, 5, "送迎加算");
      headerpanel.setCellData(1, 7, "訪問支援加算");
      headerpanel.setCellData(1, 8, "食事提供加算");
      headerpanel.setCellData(1, 11, "備考");
      // フッター0行目
      footerPanel.setCellData(0, 0, "合計");
      footerPanel.setCellData(0, 5, this.sougeiTotal);
      footerPanel.setCellData(0, 7, this.jikansuTotal);
      footerPanel.setCellData(0, 9, this.taikenRiyoTotal);

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
          } else if (r == 1 && c == 2) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          } else if (r == 1 && c == 9) {
            cell.innerHTML = '体験利用<br/>支援加算';
          } else if (r == 1 && c == 10) {
            cell.innerHTML = '重度障害者<br/>支援加算<br/>(研修修了者)';
          }
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          // 通常セルのスタイル
          if (panel.rows[r].dataItem.youbi=="土" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='blue--text'>"+ cell.innerHTML +"</div>";
          } else if (panel.rows[r].dataItem.youbi=="日" && (c == 0 || c == 1)) {
            cell.innerHTML = "<div class='red--text'>"+ cell.innerHTML +"</div>";
          }

          //備考欄を左寄せにする
          if (c == 11) {
            s.textAlign = "left";
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          // フッターのスタイル
          // フッターの上部に線を表示する
          if (r == 0) {
            s.borderTop = "1px solid rgba(0,0,0,.2)";
          }

          if (c >= 3 && c <= 10) {
            // セルを薄黄色にする
            s.backgroundColor = "#fffeed";
          } else if (c == 11) {
            // 空欄セルをグレーにする
            s.backgroundColor = "#cccccc";
          }
        }
      }
    },
    onInitializeDetailGridChanged:function(flexGrid) {
      if (this.gridchageFlag) {
        let footerPanel = flexGrid.columnFooters;
        footerPanel.setCellData(0, 5, this.sougeiTotal);
        footerPanel.setCellData(0, 7, this.jikansuTotal);
        footerPanel.setCellData(0, 9, this.taikenRiyoTotal);
        this.gridchageFlag = false;
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
              jyokyo: kirokuMeiData[i]["jyokyo"],
              jstime: kirokuMeiData[i]["jstime"] == "00:00" ? "":kirokuMeiData[i]["jstime"],
              jetime: kirokuMeiData[i]["jetime"] == "00:00" ? "":kirokuMeiData[i]["jetime"],
              gei: kirokuMeiData[i]["gei"] == 0 ? "":kirokuMeiData[i]["gei"],
              sou: kirokuMeiData[i]["sou"] == 0 ? "":kirokuMeiData[i]["sou"],
              kasanh_mn: kirokuMeiData[i]["kasanh_mn"] == "0" ? "":kirokuMeiData[i]["kasanh_mn"],
              kasans: kirokuMeiData[i]["kasans"] == 0 ? "":kirokuMeiData[i]["kasans"],
              kasantkn: kirokuMeiData[i]["kasantkn"] == 0 ? "":kirokuMeiData[i]["kasantkn"],
              kasanj: kirokuMeiData[i]["kasanj"] == 0 ? "":kirokuMeiData[i]["kasanj"],
              biko: kirokuMeiData[i]["biko"],
            }
          )
        }
      } else {
        gridData.push(
          {
            rymd: "",
            youbi: "",
            jyokyo: "",
            jstime: "",
            jetime: "",
            gei: "",
            sou: "",
            kasanh_mn: "",
            kasans: "",
            kasantkn: "",
            kasanj: "",
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
        let tougetsuSantei = data['riyo_inf'][0]['ms2_kaisu'];
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
            Column6: ""
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

// 送迎の合計の算出
function getSougeiTotal(data) {
  let totalCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]['sou']) {
      totalCount++ ;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i]['gei']) {
      totalCount++ ;
    }
  }
  return totalCount;
}

// 訪問支援加算時間数の合計の算出
function getJikansuTotal(data) {
  let totalCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]['kasanh_mn'] != "0") {
      totalCount++ ;
    }
  }
  return totalCount;
}

// 体験利用支援加算の合計の算出
function getTaikenRiyoTotal(data) {
  let totalCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]['kasantkn'] > 0) {
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
    height: 62vh;
  }
}

@media screen and (min-width: 1367px) {
  #detailGrid {
    height: 75vh;
  }
}
</style>