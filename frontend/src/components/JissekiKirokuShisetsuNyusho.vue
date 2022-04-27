<template>
  <div>
    <v-row>
      <v-col cols="7" class="user-info">
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
          <div class="hosokuumu-block">
            <label>補足給付摘要の有無</label>
            <wj-combo-box :isReadOnly="true" v-bind:text= tkkfhiumuData class="hosokukyuhu-box"></wj-combo-box>
          </div>
          <div class="hosokugaku-block">
            <label>補足給付額（日額）</label>
            <wj-combo-box :isReadOnly="true" v-bind:text= tkkfhiData class="hosokukyuhu-box"></wj-combo-box>
          </div>
          <v-btn-toggle mandatory class="denbun-toggle">
            <v-btn small color="secondary" dark outlined>電文作成有</v-btn>
            <v-btn small color="secondary" dark outlined>電文作成無</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-col>
      <v-col cols="5" class="jippisanteigaku">
        <wj-flex-grid
          id="jippisanteigakuGrid"
          :itemsSource="jippisanteigakuGridData"
          :headersVisibility="'None'"
          :autoGenerateColumns="false"
          :initialized="onInitializeJippisanteigakuGrid"
          :allowResizing="false"
          :allowDragging="false"
        >
          <wj-flex-grid-column binding="Column0" :width="'7*'" :wordWrap=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column1" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column2" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column3" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column4" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column5" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="Column6" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
        </wj-flex-grid>
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
      <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'9*'" :wordWrap=true></wj-flex-grid-column>
      <wj-flex-grid-column header="入院・外泊時加算" binding="kasan1" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="入院時支援特別加算" binding="kasan2" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="地域移行加算" binding="tnymd" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="体験宿泊支援加算" binding="kasantkn" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="重度障害者支援加算" binding="kasanj" :width="'9*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="朝食" binding="sasa" :width="'5*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="昼食" binding="shiru" :width="'5*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="夕食" binding="syuu" :width="'5*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="光熱水費" binding="konetu" :width="'5*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
      <wj-flex-grid-column header="備考" binding="biko" :width="'20*'" :wordWrap=true></wj-flex-grid-column>
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
import { getOriginalDetailData } from '../data/JissekiKirokuNyushoData.js'
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
      tkkfhiumuData:apiResult['riyo_inf'][0]['tkkfhiumu'],
      tkkfhiData:apiResult['riyo_inf'][0]['tkkfhi'],
      subGridData:this.getSubGridData(apiResult),
      jippisanteigakuGridData:this.getjippisanteigakuGridData(apiResult),
    }
  },
  methods: {
    onInitializeDetailGrid: function(flexGrid) {
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
      flexGrid.mergeManager = mm;

      // 改行指定不要のヘッダー・フッターの内容を設定する
      // ヘッダー0行目
      headerpanel.setCellData(0, 2, "支援実績");
      headerpanel.setCellData(0, 8, "食費・光熱水費実績");
      headerpanel.setCellData(0, 12, "備考");
      // フッター0行目
      footerPanel.setCellData(0, 0, "合計");

      // ヘッダーとフッターの高さを調整
      flexGrid.columnHeaders.rows[1].height = 45;
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          // ヘッダーの改行位置の設定
          if(r == 0 && c == 0){
            cell.innerHTML = '日<br/>付';
          }else if (r == 0 && c == 1) {
            cell.innerHTML = '曜<br/>日';
          }else if (r == 1 && c == 2) {
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
          //＊一旦ヘッダーの色をグレーに戻す↓
          // s.backgroundColor = "#d4edf4";
          // 一旦文字色を黒に戻す
          // s.color = "#4d4d4d";
          // 一旦ヘッダーの文字の太さを元に戻す
          // s.fontWeight = "normal";
          // 一旦太線を非表示にする
          // s.borderBottom = "2px solid #348498";
          if(r == 0 && (c == 1 || c == 2 || c == 8)){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
          }
          else if(r == 1 && (c == 1 || c == 7 || c == 11)){
            // 一旦太線を非表示にする
            // s.borderRight = "2px solid #348498";
          }
        }
        else if(panel.cellType == wjGrid.CellType.Cell){
          // 通常セルのスタイル
          //一旦編集不可のセルをアイボリーにする↓
          s.backgroundColor = "#fffeed";
          // s.color = "#4d4d4d";
          if(c == 1 || c == 7 || c == 11){
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
          }else if(c == 12){
            s.backgroundColor = "#cccccc";
          }else{
            //＊一旦編集不可のセルをアイボリーにする↓
            s.backgroundColor = "#fffeed";
            // s.backgroundColor = "#ffffff";
          }

          if(c == 0 || c == 7 || c == 11){
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
        if(r == 1 && (c == 5 || c == 6)){
          s.backgroundColor= "#cccccc";
        }
      }
    },
    onInitializeJippisanteigakuGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0,0,2,0),
        new wjGrid.CellRange(0,1,0,4),
        new wjGrid.CellRange(0,5,0,6),
      ];
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

      flexGrid.cells.rows[0].height = 20;
      flexGrid.cells.rows[1].height = 20;

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        s.fontWeight = "normal";
        if(r == 0 || r == 1){
          s.backgroundColor = "#eee"
          s.padding = '1px';
        }else{
          s.backgroundColor = "#fffeed";
        }
        if((r == 0||r == 1||r == 1) && c == 0){
          cell.innerHTML = '実費<br/>算定額';
        }
        if(c==0){
          s.padding = '15px 0px'
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
    getSubGridData:function(data){
      // サブグリッド表示用データの作成
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
    getjippisanteigakuGridData:function(data){
      let sTankaAsa = data['riyo_inf'][0]['tnka_syk_a']+"円/日";
      let sTankaHiru = data['riyo_inf'][0]['tnka_syk_h']+"円/日";
      let sTankaYoru = data['riyo_inf'][0]['tnka_syk_y']+"円/日";
      let sTankaDay = data['riyo_inf'][0]['tnka_syk_d']+"円/日";
      let kTankaDay = data['riyo_inf'][0]['tnka_kns_d']+"円/日";
      let kTankaMonth = data['riyo_inf'][0]['tnka_kns_m']+"円/日";
      let jippisanteigakuGridData = [];
      jippisanteigakuGridData.push(
        {
          Column0: "実費算定額",
          Column1: "食費の単価",
          Column2: "食費の単価",
          Column3: "食費の単価",
          Column4: "食費の単価",
          Column5: "光熱水費の単価",
          Column6: "光熱水費の単価",
        },
        {
          Column0: "実費算定額",
          Column1: "朝食",
          Column2: "昼食",
          Column3: "夕食",
          Column4: "一日",
          Column5: "一日",
          Column6: "一月",
        },
        {
          Column0: "実費算定額",
          Column1: sTankaAsa,
          Column2: sTankaHiru,
          Column3: sTankaYoru,
          Column4: sTankaDay,
          Column5: kTankaDay,
          Column6: kTankaMonth,
        }
      )
      return jippisanteigakuGridData;
    }
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
/* 利用者情報エリアのスタイル */
*{
  padding:0;
  margin:0;
}

.user-info{
  font-size:14px;
  padding:0;
  color:#333333;
}

  .user-info label{
    font-size:14px;
    font-weight:bold;
    margin-right:10px;
  }

.riyousya-block,.jukyusyasho-block,.hosokuumu-block,.hosokugaku-block{
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

.hosokuumu-block{
  width:216px;
}

.hosokugaku-block{
  width:216px;
  margin-left:10px;
}

.v-input--selection-controls{
  padding:0;
  margin:0;
}

.user-box{
  border:none;
}

.hosokukyuhu-box {
  width:60px;
  margin-right:20px;
  border:none;
}

.denbun-toggle{
  margin-left:20px;
}

#jippisanteigakuGrid {
  font-size:12px;
  color:#333333;
}

#detailGrid {
  margin-top:5px;
}
</style>