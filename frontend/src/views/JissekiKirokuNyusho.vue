<template>
  <div>
    <v-layout>
      <v-flex md12 class="basic-info">
        <div class="service-selection-area">
          <label for="theComboString">サービス</label>
            <wj-combo-box
                id="sarvice-combo"
                :itemsSource="comboData">
            </wj-combo-box>
        </div>
        <div class="month-selection-area">
          <label for="theDate">請求月</label>
          <input type="month" name="example" :value="year + '-' + lastMonth"/>
          <label for="theDate">提供月</label>
          <input type="month" name="example" :value="year + '-' + month"/>
        </div>
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-layout>
        <UserList></UserList>
        <v-flex md10>
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
              <label for="theCombo">補足給付摘要の有無</label>
              <wj-combo-box :isReadOnly="true" v-bind:text= tkkfhiumuData class="short-box"></wj-combo-box>
              <label for="theCombo">補足給付額（日額）</label>
              <wj-combo-box :isReadOnly="true" v-bind:text= tkkfhiData class="short-box"></wj-combo-box>
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
            <wj-flex-grid-column header="日付" binding="rymd" :width="'5*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="曜日" binding="youbi" :width="'5*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'17*'" :wordWrap=true allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column header="入院・外泊時加算" binding="kasan1" :width="'17*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="入院時支援特別加算" binding="kasan2" :width="'17*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="地域移行加算" binding="tnymd" :width="'17*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="体験宿泊支援加算" binding="kasantkn" :width="'17*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="重度障害者支援加算" binding="kasanj" :width="'17*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="朝食" binding="sasa" :width="'10*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="昼食" binding="shiru" :width="'10*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="夕食" binding="syuu" :width="'10*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="konetu" :width="'10*'" :wordWrap=true allowMerging="true" aggregate="Sum"></wj-flex-grid-column>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuNyushoData.js'
import "@grapecity/wijmo.styles/wijmo.css";
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter'
import "@grapecity/wijmo.vue2.grid.search";
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import UserList from '../components/UserList';
import moment from 'moment';

let year = moment().year();
let month = moment().format('MM');
let lastMonth = moment().add(-1, 'M').format('MM');

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());

export default{
  components:{
    UserList
  },
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
      tkkfhiumuData:apiResult['riyo_inf'][0]['tkkfhiumu'],
      tkkfhiData:apiResult['riyo_inf'][0]['tkkfhi'],
      subGridData:this.getSubGridData(),
      modal:false
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
      for (let colIndex = 2; colIndex <= 7; colIndex++) {
        panel.setCellData(0, colIndex, "支援実績");
      }
      for (let colIndex = 8; colIndex <= 11; colIndex++) {
        panel.setCellData(0, colIndex, "食費・光熱水費実績");
      }
      panel.setCellData(0, 12, "備考");

      // フッターを作成/////////////////////////////////////////////////////////////
      let footer0 = new wjGrid.GroupRow();
      // 作成したフッター行を追加する
      let footerPanel = grid.columnFooters;
      footerPanel.rows.splice(0, 0, footer0);
      // フッターの内容を設定する
      for (let colIndex = 0; colIndex <= 2; colIndex++) {
        footerPanel.setCellData(0, colIndex, "合計");
      }

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(grid);
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0,0,1,0),
        new wjGrid.CellRange(0,1,1,1),
        new wjGrid.CellRange(0,2,0,7),
        new wjGrid.CellRange(0,8,0,11),
        new wjGrid.CellRange(0,12,1,12),
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
      grid.columnHeaders.rows[1].height = 45;
      // グリッドのスタイルをカスタマイズ
      grid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          // ヘッダーの改行位置の設定
          if (r == 1 && c == 2) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          }else if(r == 1 && c == 3){
            cell.innerHTML = '入院・外泊時<br/>加算';
          }else if(r == 1 && c == 4){
            cell.innerHTML = '入院時支援<br/>特別加算';
          }else if(r == 1 && c == 5){
            cell.innerHTML = '地域移行<br/>加算';
          }else if(r == 1 && c == 6){
            cell.innerHTML = '体験宿泊<br/>支援加算';
          }else if(r == 1 && c == 7){
            cell.innerHTML = '重度障害者<br/>支援加算';
          }
          // ヘッダーのスタイル
          s.backgroundColor = "#d4edf4";
          s.color = "#4d4d4d";
          s.fontWeight = "normal";
          s.borderBottom = "2px solid #348498";
          if(r == 0 && (c == 1 || c == 2 || c == 8)){
            s.borderRight = "2px solid #348498";
          }
          else if(r == 1 && (c == 1 || c == 7 || c == 11)){
            s.borderRight = "2px solid #348498";
          }
        }
        else if(panel.cellType == wjGrid.CellType.Cell){
          // 通常セルのスタイル
          s.color = "#4d4d4d";
          if(c == 1 || c == 7 || c == 11){
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
          }else if(c == 12){
            s.backgroundColor = "#cccccc";
          }else{
            s.backgroundColor = "#ffffff";
          }

          if(c == 0 || c == 7 || c == 11){
            s.borderRight = "2px solid #348498";
          }
        }
      }
      // center-align merged header cells
      // grid.formatItem.addHandler(function(s, e) {
      //   console.log(e.panel);
      //   console.log(e.range.rowSpan > 1);
      //   if (e.panel == s.columnHeaders) {
      //     let html = e.cell.innerHTML;
      //     e.cell.innerHTML = "<div class='v-center'>" + html + "</div>";
      //   }
      // });
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
        if(r == 1 && (c == 5 || c == 6)){
          s.backgroundColor= "#cccccc";
        }
      }
    },
    getGridData:function(data){
      // グリッド表示用データの作成
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
            kasan1:kirokuMeiData[i]["kasan1"] == 0 ? "":kirokuMeiData[i]["kasan1"],
            kasan2:kirokuMeiData[i]["kasan2"] == 0 ? "":kirokuMeiData[i]["kasan2"],
            tnymd:kirokuMeiData[i]["tnymd"],
            kasantkn:kirokuMeiData[i]["kasantkn"] == 0 ? "":kirokuMeiData[i]["kasantkn"],
            kasanj:kirokuMeiData[i]["kasanj"] == 0 ? "":kirokuMeiData[i]["kasanj"],
            sasa:kirokuMeiData[i]["sasa"],
            shiru:kirokuMeiData[i]["shiru"],
            syuu:kirokuMeiData[i]["syuu"],
            konetu:kirokuMeiData[i]["konetu"] == 0 ? "":kirokuMeiData[i]["konetu"],
            biko:kirokuMeiData[i]["biko"],
          }
        )
      }
      return gridData;
    },
    getSubGridData:function(){
      // サブグリッド表示用データの作成
      let data = JSON.parse(getOriginalDetailData());
      let riyouKaishibi = data['riyo_inf'][0]['staymd'];
      let tougetsuSantei = data['riyo_inf'][0]['ms2_kaisu'];
      let taishoDate = data['riyo_inf'][0]['taiymd'];
      let taishogoSanteibi = data['riyo_inf'][0]['ttymd'];
      let subGridData = [];
      subGridData.push(
        {
          Column0: "入所時特別支援加算",
          Column1: "利用開始日",
          Column2: dateFilter(riyouKaishibi),
          Column3: "30日目",
          Column4: thirtythDayFilter(riyouKaishibi),
          Column5: "当月算定日数",
          Column6: tougetsuSantei + "日"
        },
        {
          Column0: "地域移行支援",
          Column1: "退所日",
          Column2: dateFilter(taishoDate),
          Column3: "退所後算定日",
          Column4: dateFilter(taishogoSanteibi),
          Column5: "",
          Column6: ""
        }
      )
      return subGridData;
    },
  },
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

</script>

<style scoped>

/* パンくずリスト下の基本情報エリアのスタイル */
.basic-info{
  background-color: #333;
  height:80px;
  padding:0 10px;
}

.basic-info label{
  color:white;
  font-size:14px;
  margin-left:10px;
  margin-right:20px;
}

.service-selection-area{
  margin-top:8px;
  margin-bottom:5px;
}

#sarvice-combo{
  width:500px;
  font-size:14px;
}

.month-selection-area{
  margin-bottom:5px;
}

.month-selection-area label{
  margin-right:33px;
}

.month-selection-area label:nth-child(3){
  margin-left:60px;
}

.month-selection-area Input{
  background-color: white;
  font-size:14px;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 4px;
  height:30px;
  padding:5px;
}

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

.short-box {
  width:60px;
  margin-right:20px;
}

/* グリッドのスタイル */
#detailGrid {
  margin-top:10px;
  font-size:14px;
  height:650px;
}

#detailGrid.wj-control.wj-content.wj-flexgrid {
  border: 2px solid #348498;
}

#subGrid {
  font-size:14px;
}

#subGrid.wj-control.wj-content.wj-flexgrid {
  border: 2px solid #348498;
}
</style>