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
        <v-flex md7>
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
            <wj-flex-grid-column header="算定日数"  binding="nissu" :width="'10*'" :wordWrap=true allowMerging="true" aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'25*'" :wordWrap=true allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column header="往" binding="gei" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="復" binding="sou" :width="'8*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="食事提供加算" binding="kasans" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="医療連携体制加算" binding="iryo" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="緊急短期入所受入加算" binding="kinkyu" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="重度障害者支援加算（研修修了者）" binding="jyudo" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
						<wj-flex-grid-column header="定員超過特例加算" binding="chokatk" :width="'20*'" :wordWrap=true aggregate="Sum"></wj-flex-grid-column>
            <wj-flex-grid-column header="備考" binding="biko" :width="'30*'" :wordWrap=true></wj-flex-grid-column>
          </wj-flex-grid>
        </v-flex>
      </v-layout>
    </v-container>
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
import UserList from '../components/UserList';
import moment from 'moment';

let year = moment().year();
let month = moment().format('MM');
let lastMonth = moment().add(-1, 'M').format('MM');

let apiResult = getOriginalDetailData();

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
      sikyuryoData:JSON.parse(apiResult)['riyo_inf'][0]['keiyakuryo'],
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
      var footer0 = new wjGrid.GroupRow();
      // 作成したフッター行を追加する
      var footerPanel = grid.columnFooters;
      footerPanel.rows.splice(0, 0, footer0);
      // フッターの内容を設定する
      for (let colIndex = 0; colIndex <= 1; colIndex++) {
        footerPanel.setCellData(0, colIndex, "合計");
      }

      // セルの結合/////////////////////////////////////////////////////////////////
      var mm = new wjGrid.MergeManager(grid);
      // 結合するセルの範囲を指定
      var headerRanges = [
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
      var footerRanges = [
        new wjGrid.CellRange(0,0,0,1)
      ];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function(panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (var h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (var f = 0; f < footerRanges.length; f++) {
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
        var s = cell.style;
        s.textAlign = 'center';
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          // ヘッダーのスタイル
          s.backgroundColor = "#d4edf4";
          s.color = "#4d4d4d";
          s.fontWeight = "normal";
          if((r == 0 && !(c == 4 || c == 5)) || r == 1){
            s.borderBottom = "2px solid #348498";
          }

          if(c == 1 || c == 3 || c == 10){
            s.borderRight = "2px solid #348498";
          }
        }
        else if(panel.cellType == wjGrid.CellType.Cell){
          // 通常セルのスタイル
          s.color = "#4d4d4d";
          if(c == 1 || c == 3 || c == 10){
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
          if(c == 0 || c == 1 ){
            s.backgroundColor = "#d4edf4";
          }else if(c == 11){
            s.backgroundColor = "#cccccc";
          }else{
            s.backgroundColor = "#ffffff";
          }

          if(c == 0 || c == 3 || c == 10){
            s.borderRight = "2px solid #348498";
          }

        }
      }
    },
    getGridData:function(data){
      let objData = JSON.parse(data);
      let kirokuMeiData = objData['riyo_inf'][0]['kiroku_mei'];
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

.keiyakusikyu-box {
  width:120px;
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