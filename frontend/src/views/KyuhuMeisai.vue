<template>
  <div id="kyuhumeisai">
    <ServiceSelection
      @parent-calendar="parentCalendar($event, dateArgument)"
      :seikyuflag="true"
    >
    </ServiceSelection>
    <v-container fluid>
      <v-row no-gutters>
        <v-col class="leftArea">
          <UserList></UserList>
        </v-col>
        <v-col class="rightArea kyuhumeisai">
          <v-row no-gutters justify="space-between">
            <v-col cols="6">
              <wj-flex-grid
                id="kyuhujukyuyaGrid"
                :itemsSource="kyuhujukyuyaGridData"
                :headersVisibility="'None'"
                :autoGenerateColumns="false"
                :initialized="onInitializeKyuhujukyuyaGrid"
                :allowResizing="false"
                :allowDragging="false"
              >
                <wj-flex-grid-column binding="Column0" :width="250" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column10" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="5">
              <div class="confirmTitle pa-1 white--text">
                確定済:2021.08.08 13:36 (担当者:大正 雅夫)
              </div>
              <v-row no-gutters justify="end">
                <v-col cols="10">
                  <wj-flex-grid
                    id="styousonGrid"
                    :itemsSource="styousonGridData"
                    :headersVisibility="'None'"
                    :autoGenerateColumns="false"
                    :initialized="onInitializeStyousonGrid"
                    :allowResizing="false"
                    :allowDragging="false"
                  >
                    <wj-flex-grid-column binding="Column0" :width="200" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column3" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column4" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column5" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column6" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                  </wj-flex-grid>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters justify="space-between">
            <v-col cols="6">
              <wj-flex-grid
                id="jigyousyaGrid"
                :itemsSource="jigyousyaGridData"
                :headersVisibility="'None'"
                :autoGenerateColumns="false"
                :initialized="onInitializeJigyousyaGrid"
                :allowResizing="false"
                :allowDragging="false"
              >
                <wj-flex-grid-column binding="Column0" :width="250" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column10" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="5">
              <v-row no-gutters justify="end">
                <v-col cols="12">
                  <wj-flex-grid
                    id="tiikikubunGrid"
                    :itemsSource="tiikikubunGridData"
                    :headersVisibility="'None'"
                    :autoGenerateColumns="false"
                    :initialized="onInitializeTiikikubunGrid"
                    :allowResizing="false"
                    :allowDragging="false"
                  >
                    <wj-flex-grid-column binding="Column0" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                    <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                  </wj-flex-grid>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-tabs class="mb-1">
            <v-tab>サービス明細欄</v-tab>
            <v-tab>請求額集計欄</v-tab>
          </v-tabs>
          <v-row no-gutters>
            <v-col>
              <wj-flex-grid
                id="riyousyahutanGrid"
                :itemsSource="riyousyahutanGridData"
                :headersVisibility="'None'"
                :autoGenerateColumns="false"
                :initialized="onInitializeRiyousyahutanGrid"
                :allowResizing="false"
                :allowDragging="false"
              >
                <wj-flex-grid-column binding="Column0" :width="250" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column10" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column11" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column12" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column13" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column14" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column15" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column16" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column17" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column18" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column19" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column20" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column21" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column22" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column23" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column24" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column25" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column26" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column27" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
          <v-row  no-gutters>
            <v-col>
              <wj-flex-grid
                id="sarvissusyubetuGrid"
                :itemsSource="sarvissusyubetuGridData"
                :headersVisibility="'None'"
                :autoGenerateColumns="false"
                :initialized="onInitializeSarvissusyubetuGrid"
                :allowResizing="false"
                :allowDragging="false"
              >
                <wj-flex-grid-column binding="Column0" :width="150" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3" :width="'2*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5" :width="'2*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
          <!-- <v-row  no-gutters>
            <v-col>
              <wj-flex-grid
                id="sarvissusyubetuGrid"
                :itemsSource="sarvissusyubetuGridData"
                :headersVisibility="'None'"
                :autoGenerateColumns="false"
                :initialized="onInitializeSarvissusyubetuGrid"
                :allowResizing="false"
                :allowDragging="false"
              >
                <wj-flex-grid-column binding="Column0" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column1" :width="'3*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column2" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column3" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column4" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column5" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column6" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column7" :width="'0.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column8" :width="'1.5*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column9" :width="'1*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column10" :width="'2*'" :wordWrap="true"></wj-flex-grid-column>
                <wj-flex-grid-column binding="Column11" :width="'3*'" :wordWrap="true"></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import UserList from '../components/UserList';

import { getOriginalDetailData } from '../data/JissekiKirokuNyushoData.js'
import * as wjGrid from '@grapecity/wijmo.grid';

let daycount = 0;

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());

export default {
  components: {
    ServiceSelection,
    UserList,
  },
  data() {
    return {
      daycount: daycount,
      dateArgument: '',
      searchArgument: '',
      kyuhujukyuyaGridData:this.getKyuhujukyuyaGridData(apiResult),
      styousonGridData:this.getStyousonGridData(apiResult),
      jigyousyaGridData:this.getJigyousyaGridData(apiResult),
      tiikikubunGridData:this.getTiikikubunGridData(apiResult),
      riyousyahutanGridData:this.getRiyousyahutanGridData(apiResult),
      sarvissusyubetuGridData:this.getSarvissusyubetuGridData(apiResult),
    };
  },
  methods: {
    onInitializeKyuhujukyuyaGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1,1,1,10),
        new wjGrid.CellRange(2,1,2,10),
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

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if(r == 0 || r == 1 || r == 2){
          s.backgroundColor = "#eee"
        }
        if(c == 0){
          s.textAlign = 'center';
        }
      }
    },
    getKyuhujukyuyaGridData:function(){
      let jukyuno1 = "1";
      let jukyuno2 = "1";
      let jukyuno3 = "0";
      let jukyuno4 = "0";
      let jukyuno5 = "0";
      let jukyuno6 = "1";
      let jukyuno7 = "2";
      let jukyuno8 = "3";
      let jukyuno9 = "4";
      let jukyuno10 = "0";
      let kyuhujukyuyaGridData = [];
      kyuhujukyuyaGridData.push(
        {
          Column0: "受給者証番号",
          Column1: jukyuno1,
          Column2: jukyuno2,
          Column3: jukyuno3,
          Column4: jukyuno4,
          Column5: jukyuno5,
          Column6: jukyuno6,
          Column7: jukyuno7,
          Column8: jukyuno8,
          Column9: jukyuno9,
          Column10: jukyuno10,
        },
        {
          Column0: "支給者決定障害者等氏名",
          Column1: "東経　さおり",
        },
        {
          Column0: "支給者決定に係る障害社児氏名",
          Column1: "",
        }
      )
      return kyuhujukyuyaGridData;
    },
    onInitializeStyousonGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if(r == 0 || r == 1 || r == 2){
          s.backgroundColor = "#eee"
        }
        if(c == 0){
          s.textAlign = 'center';
        }
      }
    },
    getStyousonGridData:function(){
      let styouson1 = "1";
      let styouson2 = "1";
      let styouson3 = "0";
      let styouson4 = "0";
      let styouson5 = "0";
      let styouson6 = "1";
      let styousonGridData = [];
      styousonGridData.push(
        {
          Column0: "市町村番号",
          Column1: styouson1,
          Column2: styouson2,
          Column3: styouson3,
          Column4: styouson4,
          Column5: styouson5,
          Column6: styouson6,
        },
        {
          Column0: "助成自治体番号",
          Column1: "",
          Column2: "",
          Column3: "",
          Column4: "",
          Column5: "",
          Column6: "",
        }
      )
      return styousonGridData;
    },
    onInitializeJigyousyaGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1,1,1,10),
        new wjGrid.CellRange(2,1,2,10),
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

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if(r == 0 || r == 1 || r == 2){
          s.backgroundColor = "#eee"
        }
        if(c == 0){
          s.textAlign = 'center';
        }
      }
    },
    getJigyousyaGridData:function(){
      let jukyuno1 = "1";
      let jukyuno2 = "1";
      let jukyuno3 = "0";
      let jukyuno4 = "0";
      let jukyuno5 = "0";
      let jukyuno6 = "1";
      let jukyuno7 = "2";
      let jukyuno8 = "3";
      let jukyuno9 = "4";
      let jukyuno10 = "0";
      let jigyousyaGridData = [];
      jigyousyaGridData.push(
        {
          Column0: "指定事業所番号",
          Column1: jukyuno1,
          Column2: jukyuno2,
          Column3: jukyuno3,
          Column4: jukyuno4,
          Column5: jukyuno5,
          Column6: jukyuno6,
          Column7: jukyuno7,
          Column8: jukyuno8,
          Column9: jukyuno9,
          Column10: jukyuno10,
        },
        {
          Column0: "事業者名",
          Column1: "障害者支援施設 ひまわり園",
        }
      )
      return jigyousyaGridData;
    },
    onInitializeTiikikubunGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(1,0,1,1),
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

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if(r == 0 || r == 1 || r == 2){
          s.backgroundColor = "#eee"
        }
        if(c == 0){
          s.textAlign = 'center';
        }
        if(r == 0 && c == 0){
          s.textAlign = 'center'
          cell.style.display = 'none'
        }
        if((r == 0 && c == 1)|| (r == 1 && c == 0)){
          s.borderTop = '1px solid rgba(0,0,0,.2)'
          s.borderLeft = '1px solid rgba(0,0,0,.2)'
        }
        if(r == 0 && c == 1){
          s.borderBottom = 'none'
        }
        if(r == 0 && c == 1){
          s.borderRadius = '4px 0 0 0'
        }
        if (r == 0 && c == 2) {
          s.borderTop = '1px solid rgba(0,0,0,.2)'
        }
        if(r == 1 && c == 0){
          s.borderRadius = '4px 0 0 4px'
        }
        if(r == 0 && c == 2){
          s.borderBottom = 'none'
          s.borderRadius = '0 4px 0 0'
        }
        if(r == 1 && c == 2){
          s.borderTop = '1px solid rgba(0,0,0,.2)'
          s.borderRadius = '0 0 4px 0'
        }
      }
    },
    getTiikikubunGridData:function(){
      let tiikikubun = "１級地";
      let tiikikubunGridData = [];
      tiikikubunGridData.push(
        {
          Column1: "地域区分",
          Column2: tiikikubun,
        },
        {
          Column0: "就労継続支援A型事業者負担減免措置実施",
          Column2: "１：無",
        }
      )
    return tiikikubunGridData;
    },
    onInitializeRiyousyahutanGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0,8,0,17),
        new wjGrid.CellRange(0,18,0,19),
        new wjGrid.CellRange(1,1,1,7),
        new wjGrid.CellRange(1,18,1,20),
        new wjGrid.CellRange(1,22,1,24),
        new wjGrid.CellRange(1,25,1,27),
        new wjGrid.CellRange(1,0,2,0),
        new wjGrid.CellRange(2,1,2,7),
        new wjGrid.CellRange(2,8,2,27),
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

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        if(r == 1 && c == 0) {
          cell.innerHTML = '利用者負担上限額<br/>管理事業所';
        }
        if(r == 0 || r == 1 || r == 2) {
          s.backgroundColor = "#eee"
        }
        if((c == 0) || (c == 1 && r == 1 ) || (c == 1 && r == 2) || (c == 8 && r == 0) || (c == 18 && r == 1) || (c == 22 && r == 1)){
          s.textAlign = 'center';
        }
      }
    },
    getRiyousyahutanGridData:function(){
      let zyougengaku1 = "1";
      let zyougengaku2 = "1";
      let zyougengaku3 = "0";
      let zyougengaku4 = "0";
      let zyougengaku5 = "0";
      let zyougengaku6 = "1";
      let zyougengaku7 = "2";
      let gementaisyousya = "１：無";
      let riyousyahutanGridData = [];
      riyousyahutanGridData.push(
        {
          Column0: "利用者負担上限月額①",
          Column1: zyougengaku1,
          Column2: zyougengaku2,
          Column3: zyougengaku3,
          Column4: zyougengaku4,
          Column5: zyougengaku5,
          Column6: zyougengaku6,
          Column7: zyougengaku7,
          Column8: "開始年月日",
          Column18:gementaisyousya,
        },
        {
          Column0: "",
          Column1: "指定事業所番号",
          Column8: "1",
          Column9: "1",
          Column10: "2",
          Column11: "1",
          Column12: "0",
          Column13: "0",
          Column14: "0",
          Column15: "0",
          Column16: "1",
          Column17: "1",
          Column18: "管理結果",
          Column22: "管理結果額",
        },
        {
          Column1: "事業所名",
        }
      )
      return riyousyahutanGridData;
    },
    onInitializeSarvissusyubetuGrid:function(flexGrid){
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      // セルの結合/////////////////////////////////////////////////////////////////
      let mm = new wjGrid.MergeManager(flexGrid);
      // 結合するセルの範囲を指定
      let cellRanges = [
        new wjGrid.CellRange(0,0,2,0),
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

       // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.textAlign = 'center';
        s.fontWeight = "normal";
        if(r == 0 || r == 1 || r == 2) {
          s.backgroundColor = "#eee"
        }
        if(r == 0 && c == 0) {
          s.lineHeight = "87px"
        }
      }
    },
    getSarvissusyubetuGridData:function(){
      let sarvisno1 = "22";
      let sarvissusyubetuGridData = [];
      sarvissusyubetuGridData.push(
        {
          Column0: "サービス種別",
          Column1: sarvisno1,
          Column2: "開始年月日",
          Column3: "平成23年11月11日",
          Column4: "終了年月日",
          Column5: "令和3年7月30日",
          Column6: "利用日数",
          Column7: "12",
          Column8: "入院人数",
        },
        {
          Column0: "",
          Column1: "32",
          Column2: "開始年月日",
          Column3: "平成23年11月11日",
          Column4: "終了年月日",
          Column5: "令和3年7月30日",
          Column6: "利用日数",
          Column7: "0",
          Column8: "入院人数",
          Column9: "7",
        },
        {
          Column0: "",
          Column1: "32",
          Column2: "開始年月日",
          Column3: "平成23年11月11日",
          Column4: "終了年月日",
          Column5: "令和3年7月30日",
          Column6: "利用日数",
          Column7: "0",
          Column8: "入院人数",
          Column9: "7",
        }
      )
      return sarvissusyubetuGridData;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#kyuhumeisai {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px !important;

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }

  .rightArea {
    min-width: 50%;
    max-width: none;
    width: 1020px;
    margin-left:4px;
  }
  .confirmTitle {
    font-size: $cell_fontsize;
    background-color: $red;
    color: $white;
    animation-name: fadeInAnime;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
  }
  .v-tab {
    margin-right: 15px;
  }
  .v-tab:not(.v-tab--active) {
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 4px 4px 0 0;
  }
  .v-tab--active {
    background: #444;
    color: #eee;
    font-weight: 700;
    border: none;
    border-radius: 4px 4px 0 0;
  }
}
#tiikikubunGrid {
  &.wj-content {
    border: none;
  }
}
</style>
