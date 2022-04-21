<template>
  <div>
    <div class="user-info">
      <div>
        <label for="theCombo">利用者</label>
        <wj-combo-box :isReadOnly="true" text="1000007_東経太郎"></wj-combo-box>
        <v-icon>mdi-arrow-left-bold-box-outline</v-icon>
        <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
        <label for="theCombo">受給者証番号</label>
        <wj-combo-box :isReadOnly="true" text="00000700"></wj-combo-box>
      </div>
      <div>
        <label for="theCombo">契約支給量</label>
        <wj-combo-box :isReadOnly="true" v-bind:text= sikyuryoData class="keiyakusikyu-box"></wj-combo-box>
        <v-btn-toggle class="mt-2" mandatory>
          <v-btn small color="secondary" dark outlined>電文作成有</v-btn>
          <v-btn small color="secondary" dark outlined>電文作成無</v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <wj-flex-grid
      id="detailGrid"
      :itemsSource="detailGridData"
      :headersVisibility="'Column'"
      :autoGenerateColumns="false"
      :initialized="onInitializeDetailGrid"
      :allowMerging="'ColumnHeaders'"
      :allowResizing="false"
      :allowDragging="false"
    >
      <wj-flex-grid-column header="日付" binding="rymd" :width="'7*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="曜日" binding="youbi" :width="'7*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'20*'" :wordWrap=true allowMerging="true"></wj-flex-grid-column>
      <wj-flex-grid-column header="開始時間" binding="jstime" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="終了時間" binding="jetime" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="往" binding="gei" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="復" binding="sou" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="時間数" binding="kasanh_mn" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="食事提供加算" binding="kasans" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="医療連携体制加算" binding="kasani" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="通勤訓練加算" binding="kasantu" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="体験利用支援加算" binding="kasantkn" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="支援計画会議実施加算" binding="kasankai" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="移行準備支援体制加算" binding="kasang" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'35*'" :wordWrap=true></wj-flex-grid-column>
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
      <wj-flex-grid-column binding="Column0" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column1" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column2" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column3" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column4" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column5" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column binding="Column6" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuTsushoData.js'
import "@grapecity/wijmo.styles/wijmo.css";
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter'
import "@grapecity/wijmo.vue2.grid.search";
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import moment from 'moment';

let year = moment().year();
let month = moment().format('MM');
let lastMonth = moment().add(-1, 'M').format('MM');

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());

export default{
  data(){
    return{
      year:year,
      month:month,
      lastMonth:lastMonth,
      currentPageTitle: this.$route.name,
      comboData:[
        '1121000011_障害者支援施設_ひまわり園_32: 施設入所支援',
        '1121000011_障害者支援施設_ひまわり園_32: 施設入所支援',
        '1121000011_障害者支援施設_ひまわり園_32: 施設入所支援',
        '1121000011_障害者支援施設_ひまわり園_32: 施設入所支援'
      ],
      detailGridData:this.getGridData(apiResult),
      sikyuryoData:apiResult['riyo_inf'][0]['sikyuryo'],
      sougeiTotal: getSougeiTotal(apiResult['riyo_inf'][0]['kiroku_mei']),
      subGridData:this.getSubGridData(),
      modal:false,
    }
  },
  methods: {
    onInitializeDetailGrid: function(grid) {
      // グリッドの選択を無効にする
      grid.selectionMode = wjGrid.SelectionMode.None;

      // 0行目のヘッダーを作成///////////////////////////////////////////////////////
      let row0 = new wjGrid.Row();
      // 作成したヘッダー行を追加する
      let panel = grid.columnHeaders;
      panel.rows.splice(0, 0, row0);
      // 0行目のヘッダーの内容を設定する
      panel.setCellData(0, 0, "日付");
      panel.setCellData(0, 1, "曜日");
      for (let colIndex = 2; colIndex <= 14; colIndex++) {
        panel.setCellData(0, colIndex, "サービス提供実績");
      }

      // 1行目のヘッダーを作成///////////////////////////////////////////////////////
      let row1 = new wjGrid.Row();
      // 作成したヘッダー行を追加する
      panel.rows.splice(1, 0, row1);
      // 0行目のヘッダーの内容を設定する
      panel.setCellData(1, 0, "日付");
      panel.setCellData(1, 1, "曜日");
      panel.setCellData(1, 2, "サービス提供の状況");
      panel.setCellData(1, 3, "開始時間");
      panel.setCellData(1, 4, "終了時間");
      for (let colIndex = 5; colIndex <= 6; colIndex++) {
        panel.setCellData(1, colIndex, "送迎加算");
      }
      panel.setCellData(1, 7, "訪問支援加算");
      panel.setCellData(1, 8, "食事提供加算");
      panel.setCellData(1, 9, "医療連携体制加算");
      panel.setCellData(1, 10, "通勤訓練加算");
      panel.setCellData(1, 11, "体験利用支援加算");
      panel.setCellData(1, 12, "支援計画会議実施加算");
      panel.setCellData(1, 13, "移行準備支援体制加算");
      panel.setCellData(1, 14, "備考");

      // フッターを作成/////////////////////////////////////////////////////////////
      let footer0 = new wjGrid.GroupRow();
      // 作成したフッター行を追加する
      let footerPanel = grid.columnFooters;
      footerPanel.rows.splice(0, 0, footer0);
      // フッターの内容を設定する
      for (let colIndex = 0; colIndex <= 4; colIndex++) {
        footerPanel.setCellData(0, colIndex, "合計");
      }
      // フッターの内容を設定する
      for (let colIndex = 5; colIndex <= 6; colIndex++) {
        footerPanel.setCellData(0, colIndex, this.sougeiTotal);
      }

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(grid);
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0,0,2,0),
        new wjGrid.CellRange(0,1,2,1),
        new wjGrid.CellRange(0,2,0,14),
        new wjGrid.CellRange(1,2,2,2),
        new wjGrid.CellRange(1,3,2,3),
        new wjGrid.CellRange(1,4,2,4),
        new wjGrid.CellRange(1,5,1,6),
        new wjGrid.CellRange(1,8,2,8),
        new wjGrid.CellRange(1,9,2,9),
        new wjGrid.CellRange(1,10,2,10),
        new wjGrid.CellRange(1,11,2,11),
        new wjGrid.CellRange(1,12,2,12),
        new wjGrid.CellRange(1,13,2,13),
        new wjGrid.CellRange(1,14,2,14),
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
        }else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let f = 0; f < footerRanges.length; f++) {
            if (footerRanges[f].contains(r, c)) {
              return footerRanges[f];
            }
          }
        }
      };
      grid.mergeManager = mm;

      // ヘッダーとフッターの高さを調整
      grid.columnHeaders.rows[1].height = 25;
      // グリッドのスタイルをカスタマイズ
      grid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          // ヘッダーのスタイル
          s.backgroundColor = "#d4edf4";
          s.color = "#4d4d4d";
          s.fontWeight = "normal";
          if(r == 0 || r == 2 ||(r == 1 && (c == 2 || c == 3 || c == 4))||(r == 1 && c > 7)){
            s.borderBottom = "2px solid #348498";
          }

          if(c == 1 || c == 4 || c == 13){
            s.borderRight = "2px solid #348498";
          }
        }
        else if(panel.cellType == wjGrid.CellType.Cell){
          // 通常セルのスタイル
          s.color = "#4d4d4d";
          if(c == 1 || c == 4 || c == 13){
            s.borderRight = "2px solid #348498";
          }

          if(panel.rows[r].dataItem.youbi=="土" && (c == 0 || c == 1)){
            s.color = "blue";
          }
          else if(panel.rows[r].dataItem.youbi=="日" && (c == 0 || c == 1)){
            s.color = "red";
          }
        }
        else if(panel.cellType == wjGrid.CellType.ColumnFooter){
          // フッターのスタイル
          s.color = "#4d4d4d";
          s.fontWeight = "normal";
          s.borderTop = "2px solid #348498";
          if(c == 0 || c == 1 ||c == 2){
            s.backgroundColor = "#d4edf4";
          }else if(c == 14){
            s.backgroundColor = "#cccccc";
          }else{
            s.backgroundColor = "#ffffff";
          }

          if(c == 0 || c == 13){
            s.borderRight = "2px solid #348498";
          }

        }
      }
    },
    onInitializeSubGrid:function(grid){
      // グリッドの選択を無効にする
      grid.selectionMode = wjGrid.SelectionMode.None;

      grid.itemFormatter = function(panel,r,c,cell){
        let s = cell.style;
        s.color = "#4d4d4d";
        s.textAlign = 'center';
        if(c == 0 || c == 1 || c == 3 || c == 5){
          s.backgroundColor= "#d4edf4";
        }
      }
    },
    getGridData:function(data){
      let kirokuMeiData = data['riyo_inf'][0]['kiroku_mei'];
      let gridData = [];
      for(let i = 0; i<kirokuMeiData.length; i++){
        // 曜日表示用に文字列の日付をDate型に変換
        let datearr = (kirokuMeiData[i]["rymd"].substr(0, 4) + '/' + kirokuMeiData[i]["rymd"].substr(4, 2) + '/' + kirokuMeiData[i]["rymd"].substr(6, 2)).split('/');
        let date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
        gridData.push(
          {
            id:kirokuMeiData[i]["id"],
            rymd:Number(kirokuMeiData[i]["rymd"].substr(6,2)),
            youbi:WeekChars[date.getDay()],
            jyokyo:kirokuMeiData[i]["jyokyo"],
            jstime:kirokuMeiData[i]["jstime"] == "00:00" ? "":kirokuMeiData[i]["jstime"],
            jetime:kirokuMeiData[i]["jetime"] == "00:00" ? "":kirokuMeiData[i]["jetime"],
            gei:kirokuMeiData[i]["gei"] == 0 ? "":kirokuMeiData[i]["gei"],
            sou:kirokuMeiData[i]["sou"] == 0 ? "":kirokuMeiData[i]["sou"],
            kasanh_mn:kirokuMeiData[i]["kasanh_mn"] == 0 ? "":kirokuMeiData[i]["kasanh_mn"],
            kasans:kirokuMeiData[i]["kasans"] == 0 ? "":kirokuMeiData[i]["kasans"],
            kasani:kirokuMeiData[i]["kasani"] == 0 ? "":kirokuMeiData[i]["kasani"],
            kasantu:kirokuMeiData[i]["kasantu"] == 0 ? "":kirokuMeiData[i]["kasantu"],
            kasantkn:kirokuMeiData[i]["kasantkn"] == 0 ? "":kirokuMeiData[i]["kasantkn"],
            kasankai:kirokuMeiData[i]["kasankai"] == 0 ? "":kirokuMeiData[i]["kasankai"],
            kasang:kirokuMeiData[i]["kasang"] == 0 ? "":kirokuMeiData[i]["kasang"],
            biko:kirokuMeiData[i]["biko"],
          }
        )
      }
      return gridData;
    },
    getSubGridData:function(){
      let data = JSON.parse(getOriginalDetailData());
      let riyouKaishibi = data['riyo_inf'][0]['staymd'];
      let tougetsuSantei = data['riyo_inf'][0]['ms2_kaisu'];
      let subGridData = [];
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
      return subGridData;
    },
  }
}

// 西暦＋年月日フィルター
function dateFilter(date){
  let datearr = (date.substr(0, 4) + '年' + date.substr(4, 2) + '月' + date.substr(6, 2) + '日');
  return datearr;
}

// 30日目変換用
function thirtythDayFilter(riyouKaishibi){
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
function getSougeiTotal(data){
  let totalCount = 0;
  for(let i = 0; i < data.length; i++){
    if(data[i]['sou']){
      totalCount++ ;
    }
  }
  for(let i = 0; i < data.length; i++){
    if(data[i]['gei']){
      totalCount++ ;
    }
  }
  return totalCount;
}

</script>

<style scoped>
/* 利用者情報エリアのスタイル */
.user-info{
  padding:0;
  font-size:12px;
}

  .user-info label{
    font-size:12px;
    margin-right:10px;
  }

.v-input--selection-controls{
  padding:0;
  margin:0;
}

.keiyakusikyu-box {
  width:120px;
  margin-right:20px;
}
</style>