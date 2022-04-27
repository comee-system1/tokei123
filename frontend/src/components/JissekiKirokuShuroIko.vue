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
            <wj-combo-box :isReadOnly="true" text="1100000700" class="user-box"></wj-combo-box>
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
      :allowResizing="false"
      :allowDragging="false"
    >
      <wj-flex-grid-column header="日付" binding="rymd" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="曜日" binding="youbi" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'8*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="開始時間" binding="jstime" :width="'6*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="終了時間" binding="jetime" :width="'6*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="往" binding="gei" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="復" binding="sou" :width="'3*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="時間数" binding="kasanh_mn" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="食事提供加算" binding="kasans" :width="'7*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="医療連携体制加算" binding="kasani" :width="'7*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="通勤訓練加算" binding="kasantu" :width="'7*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="体験利用支援加算" binding="kasantkn" :width="'7*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="支援計画会議実施加算" binding="kasankai" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="移行準備支援体制加算" binding="kasang" :width="'8*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'16*'" :wordWrap=true></wj-flex-grid-column>
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
      detailGridData:this.getGridData(apiResult),
      sikyuryoData:apiResult['riyo_inf'][0]['sikyuryo'],
      sougeiTotal: getSougeiTotal(apiResult['riyo_inf'][0]['kiroku_mei']),
      IkojunbiKasanTotal:getIkojunbiKasanTotal(apiResult['riyo_inf'][0]['kiroku_mei']),
      ruikei:apiResult['riyo_inf'][0]['ksnruikei'],
      subGridData:this.getSubGridData(apiResult),
    }
  },
  methods: {
    onInitializeDetailGrid: function(flexGrid) {
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // 空のヘッダー行とフッター行を追加/////////////////////////////////////////////
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows.insert(1, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows.insert(2, new wjGrid.GroupRow());
      let headerpanel = flexGrid.columnHeaders;
      let footerPanel = flexGrid.columnFooters;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
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
        new wjGrid.CellRange(0,0,2,4),
        new wjGrid.CellRange(0,5,2,6),
        new wjGrid.CellRange(0,7,2,7),
        new wjGrid.CellRange(0,8,2,8),
        new wjGrid.CellRange(0,9,2,9),
        new wjGrid.CellRange(0,10,2,10),
        new wjGrid.CellRange(0,11,2,11),
        new wjGrid.CellRange(0,12,2,12),
        new wjGrid.CellRange(0,13,0,14)
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
      flexGrid.mergeManager = mm;

      // 改行指定不要のヘッダー・フッターの内容を設定する
      // ヘッダー0行目
      headerpanel.setCellData(0, 2, "サービス提供実績");
      // ヘッダー1行目
      headerpanel.setCellData(1, 3, "開始時間");
      headerpanel.setCellData(1, 4, "終了時間");
      headerpanel.setCellData(1, 5, "送迎加算");
      headerpanel.setCellData(1, 7, "訪問支援加算");
      headerpanel.setCellData(1, 14, "備考");
      // フッター0行目
      footerPanel.setCellData(0, 0, "合計");
      footerPanel.setCellData(0, 5, this.sougeiTotal);
      footerPanel.setCellData(0, 13, "移行準備支援体制加算");
      // フッター1行目
      footerPanel.setCellData(1, 13, "当月");
      footerPanel.setCellData(1, 14, this.IkojunbiKasanTotal);
      // フッター2行目
      footerPanel.setCellData(2, 13, "累計");
      footerPanel.setCellData(2, 14, this.ruikei + " / 180");

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 25;
      flexGrid.columnFooters.rows[0].height = 20;
      flexGrid.columnFooters.rows[1].height = 20;
      flexGrid.columnFooters.rows[2].height = 20;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          if(r == 0 && c == 0){
            cell.innerHTML = '日<br/>付';
          }else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          }else if (r == 1 && c == 2) {
            cell.innerHTML = 'サービス提供<br/>の状況';
          }else if (r == 1 && c == 8) {
            cell.innerHTML = '食事提供<br/>加算';
          }else if (r == 1 && c == 9) {
            cell.innerHTML = '医療連携<br/>体制加算';
          }else if (r == 1 && c == 10) {
            cell.innerHTML = '通勤訓練<br/>加算';
          }else if (r == 1 && c == 11) {
            cell.innerHTML = '体験利用<br/>支援加算';
          }else if (r == 1 && c == 12) {
            cell.innerHTML = '支援計画会議<br/>実施加算';
          }else if (r == 1 && c == 13) {
            cell.innerHTML = '移行準備支援<br/>体制加算';
          }
          // ヘッダーのスタイル
          //＊一旦ヘッダーの色をグレーに戻す↓
          // s.backgroundColor = "#d4edf4";
          // 一旦文字色を黒に戻す
          // s.color = "#4d4d4d";
          // 一旦ヘッダーの文字の太さを元に戻す
          // s.fontWeight = "normal";
          if(r == 0 || r == 2 ||(r == 1 && (c == 2 || c == 3 || c == 4))||(r == 1 && c > 7)){
            // 一旦太線を非表示にする
            // s.borderBottom = "2px solid #348498";
          }

          if(c == 1 || c == 4 || c == 13){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
          }
        }
        else if(panel.cellType == wjGrid.CellType.Cell){
          // 通常セルのスタイル
          //一旦編集不可のセルをアイボリーにする↓
          s.backgroundColor = "#fffeed";
          if(c == 1 || c == 4 || c == 13){
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
          if(c == 0 || c == 1 ||c == 2){
            //＊一旦ヘッダーの色をグレーに戻す↓
            // s.backgroundColor = "#d4edf4";
          }else if(c == 13 && (r == 0 || r == 1 || r == 2)){
            s.backgroundColor = "#eee";
          }else{
            //＊一旦編集不可のセルをアイボリーにする↓
            s.backgroundColor = "#fffeed";
            // s.backgroundColor = "#ffffff";
          }

          if(c == 0 || c == 13){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
          }

        }
      }
    },
    onInitializeSubGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      flexGrid.itemFormatter = function(panel,r,c,cell){
        let s = cell.style;
        // s.color = "#4d4d4d";
        s.textAlign = 'center';
        if(c == 0 || c == 1 || c == 3 || c == 5){
          //＊一旦見出しの色をグレーに変更する↓
          s.backgroundColor= "#eeeeee";
          // s.backgroundColor= "#d4edf4";
        }else{
          //＊一旦編集不可のセルをアイボリーにする↓
            s.backgroundColor = "#fffeed";
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
    getSubGridData:function(data){
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

// 移行準備支援体制加算の月の合計を算出
function getIkojunbiKasanTotal(data){
  let totalCount = 0;
  for(let i = 0; i < data.length; i++){
    if(data[i]['kasang']){
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
  color:#333333;
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