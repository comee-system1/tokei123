<template>
  <div>
    <v-row>
      <v-col cols="12" class="user-info">
        <v-row>
          <div class="riyousya-block">
            <label>利用者</label>
            <wj-combo-box :isReadOnly="true" text="1000007_東経太郎" class="user-box"></wj-combo-box>
          </div>
          <v-btn x-small @click="onMoveUser('back')"><span class="wj-glyph-left"></span></v-btn>
          <v-btn x-small @click="onMoveUser('next')"><span class="wj-glyph-right"></span></v-btn>

          <div class="jukyusyasho-block">
            <label>受給者証番号</label>
            <wj-combo-box :isReadOnly="true" text="00000700" class="user-box"></wj-combo-box>
          </div>
        </v-row>
        <v-row>
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
      :allowMerging="'ColumnHeaders'"
      :allowResizing="false"
      :allowDragging="false"
    >
      <wj-flex-grid-column header="日付" binding="rymd" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="曜日" binding="youbi" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="算定日数"  binding="nissu" :width="'4*'" :wordWrap=true allowMerging="true" aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'12*'" :wordWrap=true allowMerging="true"></wj-flex-grid-column>
      <wj-flex-grid-column header="往" binding="gei" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="復" binding="sou" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="食事提供加算" binding="kasans" :width="'11*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="医療連携体制加算" binding="iryo" :width="'11*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="緊急短期入所受入加算" binding="kinkyu" :width="'11*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="重度障害者支援加算（研修修了者）" binding="jyudo" :width="'11*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="定員超過特例加算" binding="chokatk" :width="'11*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'17*'" :wordWrap=true></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/JissekiKirokuTankiData.js'
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
      detailGridData:this.getGridData(apiResult),
      sikyuryoData:apiResult['riyo_inf'][0]['keiyakuryo'],
      sougeiTotal: getSougeiTotal(apiResult['riyo_inf'][0]['kiroku_mei']),
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
			panel.setCellData(0, 2, "算定日数");
			panel.setCellData(0, 3, "サービス提供の状況");
      for (let colIndex = 4; colIndex <= 5; colIndex++) {
        panel.setCellData(0, colIndex, "送迎加算");
      }
			panel.setCellData(0, 6, "食事提供加算");
      panel.setCellData(0, 7, "医療連携体制加算");
			panel.setCellData(0, 8, "緊急短期入所受入加算");
			panel.setCellData(0, 9, "重度障害者支援加算（研修修了者）");
			panel.setCellData(0, 10, "定員超過特例加算");
			panel.setCellData(0, 11, "備考");

      // フッターを作成/////////////////////////////////////////////////////////////
      let footer0 = new wjGrid.GroupRow();
      // 作成したフッター行を追加する
      let footerPanel = grid.columnFooters;
      footerPanel.rows.splice(0, 0, footer0);
      // フッターの内容を設定する
      for (let colIndex = 0; colIndex <= 1; colIndex++) {
        footerPanel.setCellData(0, colIndex, "合計");
      }
      for (let colIndex = 4; colIndex <= 5; colIndex++) {
        footerPanel.setCellData(0, colIndex, this.sougeiTotal);
      }

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(grid);
      // 結合するセルの範囲を指定
      let headerRanges = [
        new wjGrid.CellRange(0,0,1,0),
        new wjGrid.CellRange(0,1,1,1),
				new wjGrid.CellRange(0,2,1,2),
				new wjGrid.CellRange(0,3,1,3),
        new wjGrid.CellRange(0,4,0,5),
				new wjGrid.CellRange(0,6,1,6),
				new wjGrid.CellRange(0,7,1,7),
        new wjGrid.CellRange(0,8,1,8),
				new wjGrid.CellRange(0,9,1,9),
				new wjGrid.CellRange(0,10,1,10),
				new wjGrid.CellRange(0,11,1,11),
      ];
      let footerRanges = [
        new wjGrid.CellRange(0,0,0,1),
        new wjGrid.CellRange(0,4,0,5)
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
          // ヘッダーの改行位置の設定
          if(r == 0 && c == 0){
            cell.innerHTML = '日<br/>付';
          }else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          }else if (r == 0 && c == 2) {
            cell.innerHTML = '算定<br/>日数';
          }else if (r == 0 && c == 3) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          }else if (r == 0 && c == 8) {
            cell.innerHTML = '緊急短期入所<br/>受入加算';
          }else if (r == 0 && c == 9) {
            cell.innerHTML = '重度障害者支援加算<br/>（研修修了者）';
          }else if (r == 0 && c == 10) {
            cell.innerHTML = '定員超過<br/>特例加算';
          }
          // ヘッダーのスタイル
          //＊一旦ヘッダーの色をグレーに戻す↓
          // s.backgroundColor = "#d4edf4";
          // 一旦文字色を黒に戻す
          // s.color = "#4d4d4d";
          // 一旦ヘッダーの文字の太さを元に戻す
          // s.fontWeight = "normal";
          if((r == 0 && !(c == 4 || c == 5)) || r == 1){
            // 一旦太線を非表示にする
            // s.borderBottom = "2px solid #348498";
          }

          if(c == 1 || c == 3 || c == 10){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
          }
        }
        else if(panel.cellType == wjGrid.CellType.Cell){
          // 通常セルのスタイル
          //一旦編集不可のセルをアイボリーにする↓
          s.backgroundColor = "#fffeed";
          // 一旦文字色を黒に戻す
          s.color = "#000";
          // s.color = "#4d4d4d";
          if(c == 1 || c == 3 || c == 10){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
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
          // 一旦文字色を黒に戻す
          // s.color = "#4d4d4d";
          // 一旦ヘッダーの文字の太さを元に戻す
          // s.fontWeight = "normal";
          // 一旦太線を非表示にする
          // s.borderTop = "2px solid #348498";
          if(c == 0 || c == 1){
            //＊一旦ヘッダーの色をグレーに戻す↓
            // s.backgroundColor = "#d4edf4";
          }else if(c == 11){
            s.backgroundColor = "#cccccc";
          }else{
            //＊一旦編集不可のセルをアイボリーにする↓
            s.backgroundColor = "#fffeed";
            // s.backgroundColor = "#ffffff";
          }

          if(c == 0 || c == 3 || c == 10){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
          }

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
						nissu:kirokuMeiData[i]["nissu"] == 0 ? "":kirokuMeiData[i]["nissu"],
            jyokyo:kirokuMeiData[i]["jyokyo"],
            gei:kirokuMeiData[i]["gei"] == 0 ? "":kirokuMeiData[i]["gei"],
            sou:kirokuMeiData[i]["sou"] == 0 ? "":kirokuMeiData[i]["sou"],
            kasans:kirokuMeiData[i]["kasans"] == 0 ? "":kirokuMeiData[i]["kasans"],
            iryo:kirokuMeiData[i]["iryo"] == 0 ? "":kirokuMeiData[i]["iryo"],
						kinkyu:kirokuMeiData[i]["kinkyu"] == 0 ? "":kirokuMeiData[i]["kinkyu"],
            jyudo:kirokuMeiData[i]["jyudo"] == 0 ? "":kirokuMeiData[i]["jyudo"],
            chokatk:kirokuMeiData[i]["chokatk"] == 0 ? "":kirokuMeiData[i]["chokatk"],
            biko:kirokuMeiData[i]["biko"],
          }
        )
      }
      return gridData;
    },
  }
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
*{
  padding:0;
  margin:0;
}

.user-info{
  padding:0;
  font-size:14px;
}

  .user-info label{
    font-size:14px;
    font-weight:bold;
    margin-right:10px;
  }

.riyousya-block,.jukyusyasho-block,.keiyakuryo-block{
  border-bottom:1px solid #ccc;
  float:left;
}

.riyousya-block{
  width:227px;
}

.jukyusyasho-block{
  margin-left:20px;
  width:269px;
}

.keiyakuryo-block{
  width:216px;
}

.user-box{
  border:none;
}

.v-input--selection-controls{
  padding:0;
  margin:0;
}

.keiyakusikyu-box {
  width:100px;
  margin-right:20px;
}

.denbun-toggle{
  margin-left:20px;
}

</style>