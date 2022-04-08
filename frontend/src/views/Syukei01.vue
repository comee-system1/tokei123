<template>

<div class="syukei01">
    <!--ヘッダ配置-->
    <!--子コンポーネントからイベント受け取り-->
    <div id="parent">
      <jigyosel v-on:sendMessage="receiveChildMessage" >
      </jigyosel>
    </div>
    <!--1段目-->
    <div class="tyudan">
      <!--グリッド表示条件-->
      <span class="label1"><label for="theComboString" with>利用者</label></span>
        <wj-combo-box id="Combo1"
          :itemsSource="getSibori1"
          :initialized="initCombo1"
          :selectedIndexChanged="onCombo1SelectedIndexChanged">
        </wj-combo-box>

      <!--集計確認ダイアログとボタン-->
      <agreement-dialog-component
        :agreementDialog="agreementDialog"
        @result="response">
      </agreement-dialog-component>
      <v-btn @click.stop="agreementDialog = true" height="38" width="160">集計開始</v-btn>
    </div>
    <!--2段目-->
    <div class="tyudan">
      <span class="label1"><label for="theComboString" with>市町村</label></span>
        <wj-combo-box id="Combo1"
          :itemsSource="getSibori1"
          :initialized="initCombo1"
          :selectedIndexChanged="onCombo1SelectedIndexChanged">
        </wj-combo-box>

      <!--絞り込み1列目-->
      <span class="label1"><label for="theRadioString">絞り込み</label></span>
      <span class="sibo">
          <input id="rdo1" type="radio" name="sibori" checked />
          <label for="rdo1">全  員&emsp;</label>
          <input id="rdo2" type="radio" name="sibori" />
          <label for="rdo2">集計済&emsp;</label>
          <input id="rdo3" type="radio" name="sibori" />
          <label for="rdo3">未確定&emsp;</label>
          <input id="rdo4" type="radio" name="sibori" />
          <label for="rdo4">エラーあり&emsp;</label>
          <input id="rdo5" type="radio" name="sibori" />
          <label for="rdo5">未集計&emsp;</label>
          <input id="rdo6" type="radio" name="sibori" />
          <label for="rdo6">確定済&emsp;</label>
      </span>
    </div>

    <!--3段目-->
    <div class="tyudan">
      <span class="label1"><label for="theRadioString">ソート</label></span>
      <span class="sort">
        <input @input="sortedArray(0)" id="btnRed" type="radio" name="sort" checked>
        <label for="btnRed">カナ&emsp;</label>
        <input @input="sortedArray(1)" id="btnGreen" type="radio" name="sort">
        <label for="btnGreen">コード&emsp;</label>
        <input @input="sortedArray(2)" id="btnBlue" type="radio" name="sort">
        <label for="btnBlue">受給者番号&emsp;</label>
      </span>
    </div>

    <!--4段目-->
    <div class="tyudan4">
        <div class="tabs" style="float: left">
          <input @input="tabKana(0)" id="kanaa" type="radio" name="tab_item" checked>
          <label class="tab_item" for="kanaa">全</label>
          <input @input="tabKana(1)" id="kana1" type="radio" name="tab_item">
          <label class="tab_item" for="kana1">ア</label>
          <input @input="tabKana(2)" id="kana2" type="radio" name="tab_item">
          <label class="tab_item" for="kana2">カ</label>
          <input @input="tabKana(3)" id="kana3" type="radio" name="tab_item">
          <label class="tab_item" for="kana3">サ</label>
          <input @input="tabKana(4)" id="kana4" type="radio" name="tab_item">
          <label class="tab_item" for="kana4">タ</label>
          <input @input="tabKana(5)" id="kana5" type="radio" name="tab_item">
          <label class="tab_item" for="kana5">ナ</label>
          <input @input="tabKana(6)" id="kana6" type="radio" name="tab_item">
          <label class="tab_item" for="kana6">ハ</label>
          <input @input="tabKana(7)" id="kana7" type="radio" name="tab_item">
          <label class="tab_item" for="kana7">マ</label>
          <input @input="tabKana(8)" id="kana8" type="radio" name="tab_item">
          <label class="tab_item" for="kana8">ヤ</label>
          <input @input="tabKana(9)" id="kana9" type="radio" name="tab_item">
          <label class="tab_item" for="kana9">ラ</label>
          <input @input="tabKana(10)" id="kana10" type="radio" name="tab_item">
          <label class="tab_item" for="kana10">ワ</label>
        </div>
        <div class="lblsyukei">
          <label id="lblsyukei">対象者</label>
        </div>
      <!--メイングリッド-->
      <wj-flex-grid
        :itemsSource="viewSeikyu1"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :autoGenerateColumns="false"
        :initialized="onInitialized"
        :frozen-columns="2"
      >
        <wj-flex-grid-column header="選択" binding="sel" :width="30" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
        <wj-flex-grid-column header="済" binding="sumi" :width="30" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="レセ確定"  binding="kaku" :width="30" :wordWrap=true :allowMerging="true" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="受給者番号" binding="product" :width="95" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="氏  名" binding="date" :width="140" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="市町村" binding="amount" :width="60" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="助成自治体番号" binding="jiti" :width="60" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="障害種別" binding="syogai" :width="30" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="支援区分" binding="sienkbn" :width="30" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="利用者負担上限月額" binding="futan" :width="60" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="上限管理事業所" binding="jigyo" :width="90" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="食事提供" binding="syoku" :width="30" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="特別給付費" binding="tokk" :width="50" :wordWrap=true :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="サービス種別" binding="ssyu" :width="130" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="開始日" binding="symd" :width="80" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="終了日" binding="eymd" :width="80" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="契約情報" binding="keiyaku" :width="30" :wordWrap=true :allowMerging="true" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="入院" binding="nyuin" :width="90" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="外泊" binding="gaihk" :width="90" :allowResizing=false></wj-flex-grid-column>
        <wj-flex-grid-column header="上限管理" binding="jkekka" :width="30" :wordWrap=true :allowMerging="true" :allowResizing=false></wj-flex-grid-column>
  </wj-flex-grid>
    </div>
  </div>
</template>

<script>

import '@grapecity/wijmo.touch';
import "@grapecity/wijmo.styles/wijmo.css";
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter'
import "@grapecity/wijmo.vue2.grid.search";
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import jigyosel from '../components/Jigyosel.vue';
import AgreementDialogComponent from "../components/AgreementDialogComponent.vue"
//Combo1用データソース
import { getSibori1 } from '../data/siborikomi.js'
//Grid用データソース
import { getSeikyu } from '../data/seikyudata.js'


export default {
    components: {
      jigyosel,
      'agreement-dialog-component': AgreementDialogComponent,
    },
  data () {
    return {
      //事業者選択id
      jigyoid: 0,
      //集計確認ダイアログ
      agreementDialog: false,
      message: '',
      //Combo1データソース
      getSibori1: getSibori1(),
      //集計結果グリッドデータソース
      getSeikyu1: getSeikyu(),
      viewSeikyu1: getSeikyu(),
      //現在選択中の値
      selectedValue: '',
      //grdidカナタブ
      tabindex: 0,
      //gridソート
      sort_key: "",
      sort_asc: true,
    }
  },
  methods: {
    //イベントテスト用
    change(e) {
      console.log(e.target.value);
    },
    //集計ダイアログレスポンス
    response(obj) {
        this.message = obj.message
        this.agreementDialog = false
    },
    receiveChildMessage (index,jigyoid) {
      this.jigyoid = jigyoid;
      this.grid_filter();
    },
    onInitialized: function(grid) {
      //Gridインスタンス
      this.flex = grid;
      var extraRow = new wjGrid.Row();
      var panel = grid.columnHeaders;
      panel.rows.splice(1, 0, extraRow);
      //Gridに対してマージ許可
      grid.allowMerging = wjGrid.AllowMerging.ColumnHeaders;
      //ヘッダ0行目マージ指定
      panel.rows[0].allowMerging = true;
      for (let colIndex = 0; colIndex <= 19; colIndex++) {
        grid.columns[colIndex].allowSorting = false;
        grid.columns[colIndex].isReadOnly = true;
      }
      panel.rows[0].height = 30;
      panel.rows[1].height = 90;
      //ヘッダ文字描画
      panel.setCellData(0, 0, "集計");
      panel.setCellData(0, 1, "集計");
      panel.setCellData(0, 2, "レセ確定");
      for (let colIndex = 3; colIndex <= 12; colIndex++) {
          panel.setCellData(0, colIndex, "受給者証情報");
      }
      for (let colIndex = 13; colIndex <= 15; colIndex++) {
          panel.setCellData(0, colIndex, "サービス利用歴");
      }
      panel.setCellData(0, 16, "契約情報");
      for (let colIndex = 17; colIndex <= 18; colIndex++) {
          panel.setCellData(0, colIndex, "変動情報");
      }
      panel.setCellData(0, 19, "上限管理");
      //アライメント
      panel.rows[0].align = "center";
      panel.rows[1].align = "center";

      grid.itemFormatter = function(panel, r, c, cell) {
          var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c >= 0 && c <= 2) s.backgroundColor = "#ddf5dd";
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c >= 3 && c <= 12) s.backgroundColor = "#e5f8ff";
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c >= 13 && c <= 16) s.backgroundColor = "#ffffe5";
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c >= 17 && c <= 18) s.backgroundColor = "#fff9e5";
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c >= 19 ) s.backgroundColor = "#ffe5e5";
        //境界線
        //Right
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c==0 && r == 0) cell.style.borderRight = "2px solid blue";
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c==1) cell.style.borderRight = "2px solid blue";
        if (panel.cellType == wjGrid.CellType.Cell && c==1) cell.style.borderRight = "2px solid blue";
        //Left
        if (panel.cellType == wjGrid.CellType.ColumnHeader && c==0) cell.style.borderLeft = "2px solid blue";
        if (panel.cellType == wjGrid.CellType.Cell && c==0) cell.style.borderLeft = "2px solid blue";
        //Top
        if (panel.cellType == wjGrid.CellType.ColumnHeader && r==0 && c==0) cell.style.borderTop = "2px solid blue";
      }
      //Gridクリックイベント
      grid.hostElement.addEventListener("click",function(e){this.grid_click(e)}.bind(this));
      this.lbl_syukei_result();

    },
    //Combo1初期値
    initCombo1: function(combo){
      this.selectedValue = combo.selectedValue;
    },
    onCombo1SelectedIndexChanged: function()
    {

    },
    //カナタブ
    tabKana: function(index) {
      this.tabindex = index;
      //事業者フィルター実行
      this.viewSeikyu1 = this.search_kana;
      this.flex.collectionView.refresh();
    },
    grid_click:function (e)
    {
      var ht = this.flex.hitTest(e.pageX, e.pageY);
      console.log("row:" + ht.row,);
      if(this.viewSeikyu1[ht.row].sel == "○"){
        this.viewSeikyu1[ht.row].sel = "";
      }else
      {
        this.viewSeikyu1[ht.row].sel = "○"
      }
      this.flex.collectionView.refresh();
      this.lbl_syukei_result();
      return null;
    },
    //grdiのリフレッシュ
    grid_filter: function()
    {
      //事業者フィルター実行
      this.viewSeikyu1 = this.search_jid;
      this.flex.collectionView.refresh();
      this.lbl_syukei_result();
    },
    //人数集計
    lbl_syukei_result: function()
    {
      document.getElementById("lblsyukei").textContent = "　　" + "対象者:" + this.getSeikyu1.length + "人"
                                                       + "　集計済:" + this.getSeikyu1.filter(x => x.syukei == "○").length + "人"
                                                       + "　確定済:" + this.getSeikyu1.filter(x => x.kaku == "確").length + "人";
    },
    sortedArray: function(index) {
      function compare(a, b) {
        if(index == 0){
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
          return 0;
        }
        if(index == 1){
          if (a.code < b.code) return -1;
          if (a.code > b.code) return 1;
          return 0;
        }
        if(index == 2){
          if (a.product < b.product) return -1;
          if (a.product > b.product) return 1;
          return 0;
        }
      }
      this.viewSeikyu1 = this.getSeikyu1.sort(compare);
      this.flex.collectionView.refresh();
    },
  },
  computed: {
    search_jid: function(){
      const data = this.getSeikyu1;
      const result = data.filter(x => x.jid === this.jigyoid);
      return result;
    },
    search_kana: function(){
      const data = this.getSeikyu1;
      var result =  data;
      switch(this.tabindex)
      {
        case 1:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('ア')!== -1 ||
               value.kana.slice(0,1).indexOf('イ')!== -1 ||
               value.kana.slice(0,1).indexOf('ウ')!== -1 ||
               value.kana.slice(0,1).indexOf('エ')!== -1 ||
               value.kana.slice(0,1).indexOf('オ')!== -1
              ) {return value}})
          break;
        case 2:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('カ')!== -1 ||
               value.kana.slice(0,1).indexOf('キ')!== -1 ||
               value.kana.slice(0,1).indexOf('ク')!== -1 ||
               value.kana.slice(0,1).indexOf('ケ')!== -1 ||
               value.kana.slice(0,1).indexOf('コ')!== -1
              ) {return value}})
          break;
        case 3:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('サ')!== -1 ||
               value.kana.slice(0,1).indexOf('シ')!== -1 ||
               value.kana.slice(0,1).indexOf('ス')!== -1 ||
               value.kana.slice(0,1).indexOf('セ')!== -1 ||
               value.kana.slice(0,1).indexOf('ソ')!== -1
              ) {return value}})
          break;
        case 4:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('タ')!== -1 ||
               value.kana.slice(0,1).indexOf('チ')!== -1 ||
               value.kana.slice(0,1).indexOf('ツ')!== -1 ||
               value.kana.slice(0,1).indexOf('テ')!== -1 ||
               value.kana.slice(0,1).indexOf('ト')!== -1
              ) {return value}})
          break;
        case 5:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('ナ')!== -1 ||
               value.kana.slice(0,1).indexOf('ニ')!== -1 ||
               value.kana.slice(0,1).indexOf('ヌ')!== -1 ||
               value.kana.slice(0,1).indexOf('ネ')!== -1 ||
               value.kana.slice(0,1).indexOf('ノ')!== -1
              ) {return value}})
          break;
        case 6:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('ハ')!== -1 ||
               value.kana.slice(0,1).indexOf('ヒ')!== -1 ||
               value.kana.slice(0,1).indexOf('フ')!== -1 ||
               value.kana.slice(0,1).indexOf('ヘ')!== -1 ||
               value.kana.slice(0,1).indexOf('ホ')!== -1
              ) {return value}})
          break;
        case 7:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('マ')!== -1 ||
               value.kana.slice(0,1).indexOf('ミ')!== -1 ||
               value.kana.slice(0,1).indexOf('ム')!== -1 ||
               value.kana.slice(0,1).indexOf('メ')!== -1 ||
               value.kana.slice(0,1).indexOf('モ')!== -1
              ) {return value}})
          break;
        case 8:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('ヤ')!== -1 ||
               value.kana.slice(0,1).indexOf('ユ')!== -1 ||
               value.kana.slice(0,1).indexOf('ヨ')!== -1
              ) {return value}})
          break;
        case 9:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('ラ')!== -1 ||
               value.kana.slice(0,1).indexOf('リ')!== -1 ||
               value.kana.slice(0,1).indexOf('ル')!== -1 ||
               value.kana.slice(0,1).indexOf('レ')!== -1 ||
               value.kana.slice(0,1).indexOf('ロ')!== -1
              ) {return value}})
          break;
        case 10:
          result = data.filter(value => {
            if(value.kana.slice(0,1).indexOf('ワ')!== -1) {return value}})
          break;
        default:
      }
      console.log("result:" + result);
      return result;
    }
  }
}
</script>

<style scoped lang="scss">

.wj-flexgrid {
    top :10px;
    height: 600px;
    font-size: 14px;
    padding: 1px;
}

.tyudan{
  padding: 5px;
}

.tyudan4{
  padding: 5px;
}

.sort{
  border: 1px solid black; padding: 6px;
  margin: 3px;
  width: 400px;
}

.sibo{
  border: 1px solid black; padding: 6px;
  margin: 3px;
  width: 400px;
}

.label1
{
  padding: 3px;
  background-color: rgb(220, 251, 255);
  border: 1px solid rgb(0, 11, 167); padding: 6px;
}

.lblsyukei{
  padding: 3px;
  text-align: left;
}

/*タブ切り替え全体のスタイル*/
.tabs {
  align-content: left;
  margin-top: 50px;
  padding-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 440px;
  height: 30px;
  margin: 0 auto;}

/*タブのスタイル*/
.tab_item {
  width: 40px;
  height: 30px;
  border-bottom: 3px solid #5ab4bd;
  background-color: #f3f3f3;
  line-height: 30px;
  font-size: 16px;
  color: #565656;
  display: block;
  float: left;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s ease;
}
.tab_item:hover {
  opacity: 0.75;
}
/*ラジオボタンを全て消す*/
input[name="tab_item"] {
  display: none;
}

/*タブ切り替えの中身のスタイル*/
.tab_content {
  display: none;
  padding: 40px 40px 0;
  clear: both;
  overflow: hidden;
}

/*選択されているタブのコンテンツのみを表示*/
#all:checked ~ #all_content,
#programming:checked ~ #programming_content,
#design:checked ~ #design_content {
  display: block;
}

/*選択されているタブのスタイルを変える*/
.tabs input:checked + .tab_item {
  background-color: #5ab4bd;
  color: #fff;
}
</style>
