<template>
  <div>
    <v-layout>
      <v-flex md12 class="basic-info">
        <div>
          <label>サービス</label>
          <input type="text" value="1121000011_障害者支援施設_ひまわり園" style="width:280px;">
          <select name="example" style="width:150px;">
            <option value="選択肢1">32: 施設入所支援</option>
            <option value="選択肢2">33: 施設入所支援</option>
            <option value="選択肢3">34: 施設入所支援</option>
          </select>
        </div>
        <div>
          <label>請求月</label>
          <input type="date">
          <label>提供月</label>
          <input type="date">
        </div>
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-layout>
        <UserList></UserList>
        <v-flex md10>
          <div class="user-info">
            <div>
              <label>利用者</label>
              <input type="text" value="1000007_東経太郎" style="width:150px;">
              <label>受給者証番号</label>
              <input type="text" value="00000700" style="width:150px;">
            </div>
            <div>
              <label>補足給付摘要の有無</label>
              <input type="text" value="2" style="width:50px;">
              <label>補足給付額（日額）</label>
              <input type="text" value="600 円/日" style="width:100px;">
            </div>
          </div>

          <wj-flex-grid
            :itemsSource="detailGridData"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :initialized="onInitializeDetailGrid"
            :frozen-columns="2"
            :allowMerging="'ColumnHeaders'"
            :allowResizing="false"
            :allowDragging="false"
          >
            <wj-flex-grid-column header="日付" binding="rymd" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="曜日" binding="youbi" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'20*'" :wordWrap=true :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column header="入院・外泊時加算" binding="kasan1" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="入院時支援特別加算" binding="kasan2" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="地域移行加算" binding="tnymd" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="体験宿泊支援加算" binding="kasantkn" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="重度障害者支援加算" binding="kasanj" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="朝食" binding="sasa" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="昼食" binding="shiru" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="夕食" binding="syuu" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="konetu" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="備考" binding="biko" :width="'50*'" :wordWrap=true></wj-flex-grid-column>
          </wj-flex-grid>

          <wj-flex-grid
            :itemsSource="totalGridData"
            :headersVisibility="'None'"
            :autoGenerateColumns="false"
            :initialized="onInitializeTotalGrid"
            :frozen-columns="2"
            :allowMerging="'ColumnHeaders'"
            :allowResizing="false"
            :allowDragging="false"
          >
            <wj-flex-grid-column header="日付" binding="rymd" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="曜日" binding="youbi" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="サービス提供の状況"  binding="jyokyo" :width="'20*'" :wordWrap=true :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column header="入院・外泊時加算" binding="kasan1" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="入院時支援特別加算" binding="kasan2" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="地域移行加算" binding="tnymd" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="体験宿泊支援加算" binding="kasantkn" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="重度障害者支援加算" binding="kasanj" :width="'15*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="朝食" binding="sasa" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="昼食" binding="shiru" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="夕食" binding="syuu" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="konetu" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="光熱水費" binding="" :width="'10*'" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="備考" binding="biko" :width="'50*'" :wordWrap=true></wj-flex-grid-column>
          </wj-flex-grid>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getOriginalDetailData } from '../data/gridData.js'
import { getOriginalTotalData } from '../data/gridData.js'
import "@grapecity/wijmo.styles/wijmo.css";
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter'
import "@grapecity/wijmo.vue2.grid.search";
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import UserList from '../components/UserList';

export default{
  components:{
    UserList
  },
  data(){
    return{
      currentPageTitle: this.$route.name,
      detailGridData:getGridData(getOriginalDetailData()),
      totalGridData:getOriginalTotalData()
    }
  },
  methods: {
    onInitializeDetailGrid: function(grid) {
      // 追加するヘッダー0行目を作成する///////////////////////////////////////////////////////
      var row0 = new wjGrid.Row();
      row0.allowMerging = true;
      // 作成したヘッダー行を追加する
      var panel = grid.columnHeaders;
      panel.rows.splice(0, 0, row0);
      // ヘッダーの内容を設定する
      for (let colIndex = 2; colIndex <= 7; colIndex++) {
        panel.setCellData(0, colIndex, "支援実績");
      }
      for (let colIndex = 8; colIndex <= 13; colIndex++) {
        panel.setCellData(0, colIndex, "実費算定額");
      }

      // 追加するヘッダー1行目を作成する///////////////////////////////////////////////////////
      var row1 = new wjGrid.Row();
      row1.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(1, 0, row1);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(1, colIndex, "朝食");
      }
      for (let colIndex = 9; colIndex <= 9; colIndex++) {
        panel.setCellData(1, colIndex, "円/日");
      }
      for (let colIndex = 10; colIndex <= 10; colIndex++) {
        panel.setCellData(1, colIndex, "円/日");
      }
      for (let colIndex = 11; colIndex <= 13; colIndex++) {
        panel.setCellData(1, colIndex, "光熱水費の単価");
      }

      // 追加するヘッダー2行目を作成する///////////////////////////////////////////////////////
      var row2 = new wjGrid.Row();
      row2.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(2, 0, row2);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(2, colIndex, "昼食");
      }
      for (let colIndex = 9; colIndex <= 9; colIndex++) {
        panel.setCellData(2, colIndex, "円/日");
      }
      for (let colIndex = 10; colIndex <= 10; colIndex++) {
        panel.setCellData(2, colIndex, "円/日");
      }
      for (let colIndex = 11; colIndex <= 13; colIndex++) {
        panel.setCellData(2, colIndex, "光熱水費の単価");
      }

      // 追加するヘッダー3行目を作成する///////////////////////////////////////////////////////
      var row3 = new wjGrid.Row();
      row3.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(3, 0, row3);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(3, colIndex, "夕食");
      }
      for (let colIndex = 9; colIndex <= 9; colIndex++) {
        panel.setCellData(3, colIndex, "円/日");
      }
      for (let colIndex = 10; colIndex <= 10; colIndex++) {
        panel.setCellData(3, colIndex, "円/日");
      }
      for (let colIndex = 11; colIndex <= 11; colIndex++) {
        panel.setCellData(3, colIndex, "1日");
      }
      for (let colIndex = 12; colIndex <= 13; colIndex++) {
        panel.setCellData(3, colIndex, "円/日");
      }

      // 追加するヘッダー4行目を作成する///////////////////////////////////////////////////////
      var row4 = new wjGrid.Row();
      row4.allowMerging = true;
      // 作成したヘッダー行を追加する
      panel.rows.splice(4, 0, row4);
      // ヘッダーの内容を設定する
      for (let colIndex = 8; colIndex <= 8; colIndex++) {
        panel.setCellData(4, colIndex, "1日");
      }
      for (let colIndex = 9; colIndex <= 9; colIndex++) {
        panel.setCellData(4, colIndex, "円/日");
      }
      for (let colIndex = 10; colIndex <= 10; colIndex++) {
        panel.setCellData(4, colIndex, "円/日");
      }
      for (let colIndex = 11; colIndex <= 11; colIndex++) {
        panel.setCellData(4, colIndex, "1月");
      }
      for (let colIndex = 12; colIndex <= 13; colIndex++) {
        panel.setCellData(4, colIndex, "円/日");
      }

      // 日付列・曜日列・備考列を縦方向に結合する////////////////////////////////////////////////
      ["rymd","youbi","biko"].forEach(function(binding) {
        let col = grid.getColumn(binding);
        col.allowMerging = true;
        panel.setCellData(0, col.index, col.header);
        panel.setCellData(1, col.index, col.header);
        panel.setCellData(2, col.index, col.header);
        panel.setCellData(3, col.index, col.header);
        panel.setCellData(4, col.index, col.header);
      });

      // サービス提供の状況列～重度障碍者支援加算列を縦方向に結合する
      ["rymd","jyokyo","kasan1","kasan2","tnymd","kasantkn","kasanj","biko"].forEach(function(binding) {
        let col = grid.getColumn(binding);
        col.allowMerging = true;
        panel.setCellData(1, col.index, col.header);
        panel.setCellData(2, col.index, col.header);
        panel.setCellData(3, col.index, col.header);
        panel.setCellData(4, col.index, col.header);
      });

      // ヘッダーのスタイルをカスタマイズ
      grid.itemFormatter = function(panel,r,c,cell){
        var s = cell.style;
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          s.backgroundColor = "#348498";
          s.color = "#fff";
          s.fontWeight = "normal";
          s.textAlign = 'center';
        }
      }
    },
    onInitializeTotalGrid: function(grid) {
      this.grid.instance.newRowAtTop = this.grid.newRowAtTop;
      // ヘッダーのスタイルをカスタマイズ
      grid.itemFormatter = function(panel,r,c,cell){
        var s = cell.style;
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          s.backgroundColor = "#348498";
          s.color = "#fff";
          s.fontWeight = "normal";
          s.textAlign = 'center';
        }
      }
    }
  }
}

// グリッド表示用データの作成
function getGridData(data){
  let gridData = [];
    for(let i = 0; i<data.length; i++){
      gridData.push({
        id:data[i]["id"],
        rymd:data[i]["rymd"],
        youbi:data[i]["youbi"],
        jyokyo:ServiceStatusNameObj[`${data[i]["jyokyo"]}`],
        kasan1:data[i]["kasan1"],
        kasan2:data[i]["kasan2"],
        tnymd:data[i]["tnymd"],
        kasantkn:data[i]["kasantkn"],
        kasanj:data[i]["kasanj"],
        sasa:data[i]["sasa"],
        shiru:data[i]["shiru"],
        syuu:data[i]["syuu"],
        konetu:data[i]["konetu"],
        biko:data[i]["biko"],
      })
    }
  return gridData;
}

// 名称変換用テーブル
let ServiceStatusNameObj = {
  0:"利用日",
  1:"入院中日",
  2:"外泊中日",
  3:"入院初日",
  4:"外泊初日",
  5:"入院終日",
  6:"外泊終日",
  7:"入院→施設に戻る→外泊",
  8:"外泊→施設に戻る→入院",
  9:"入院→入院",
  10:"外泊→外泊",
  13:"入院→外泊",
  14:"外泊→入院"
};

</script>

<style scoped>
.basic-info{
  background-color: #333;
  height:70px;
  padding:10px;
}

.basic-info label{
  color:white;
  font-size:14px;
  margin-left:30px;
}

.basic-info input,select{
  background:white;
  font-size:14px;
  margin-left:10px;
}

.user-info{
  padding:0px 20px 10px 20px;
}

  .user-info label{
    font-size:14px;
  }

  .user-info input{
  border:1px solid gray;
  font-size:14px;
  margin-left:10px;
  margin-right:20px;
  }

.wj-flexgrid{
  font-size:12px;
}

</style>