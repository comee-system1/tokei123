<template>
  <div id="user-list_scrollbar">
    <v-row no-gutters>
      <v-col col="12">
        <v-row no-gutters>
          <wj-combo-box :textChanged="onTextChangedUser" style="width: 100%" placeholder="カナ検索"></wj-combo-box>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card class="text-caption text-center" outlined tile @click="sortUser(1)">全員</v-card>
          </v-col>
          <v-col>
            <v-card class="text-caption text-center" outlined tile @click="sortUser(2)">全員2</v-card>
          </v-col>
          <v-col>
            <v-card class="text-caption text-center" outlined tile @click="sortUser(3)">全員3</v-card>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card class="text-caption text-center" outlined tile @click="sortUser(1)">コード</v-card>
          </v-col>
          <v-col>
            <v-card class="text-caption text-center" outlined tile @click="sortUser(2)">カナ</v-card>
          </v-col>
          <v-col>
            <v-card class="text-caption text-center" outlined tile @click="sortUser(3)">受給者番号</v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="mt-1">
      <v-btn-toggle class="flex-wrap">
        <v-btn
          outlined
          v-for="(n, k) in alphabet"
          :key="n"
          :width="11"
          p-0
          style="min-width: auto; padding: 9px; height: 10px"
          @click="onAlphabet(k)"
          >{{ n }}</v-btn
        >
      </v-btn-toggle>
    </div>
    <wj-flex-grid
      id="userListGrid"
      class="mt-1"
      :autoSearch="true"
      :headersVisibility="'Column'"
      :selectionMode="3"
      :initialized="onInitializedUser"
      :itemsSourceChanged="onItemsSourceChanged"
      :itemsSource="usersData"
      :allowDragging="false"
      :allowResizing="true"
      :allowSorting="false"
    >
      <wj-flex-grid-column header="確" binding="kakutei" :width="28" :word-wrap="false" :allowResizing="true" :isReadOnly="true" :cellTemplate="tplImage"></wj-flex-grid-column>
      <wj-flex-grid-column header="コード" binding="riyocode" width="2*" :word-wrap="false" :allowResizing="true" :isReadOnly="true" v-if="riyocodeFlag"></wj-flex-grid-column>
      <wj-flex-grid-column header="受給者番号" binding="jyukyuno" :width="110" :word-wrap="false" :allowResizing="true" :isReadOnly="true" v-if="jyukyunoFlag"></wj-flex-grid-column>
      <wj-flex-grid-column header="利用者名" binding="names" width="3*" :word-wrap="false" :allowResizing="true" :isReadOnly="true"></wj-flex-grid-column>
      <wj-flex-grid-column header="印" binding="print" :width="25" :isReadOnly="true" :word-wrap="false" :allowResizing="true" class="text-caption"></wj-flex-grid-column>
    </wj-flex-grid>

    <wj-combo-box
      :itemsSource="selects"
      :isDroppedDown="isDroppedDown"
      :isRequired="false"
      :selectedIndexChanged="onselectedIndexChanged"
    ></wj-combo-box>
  </div>
</template>
<script>
import { getOriginalDetailData } from '../data/JissekiKirokuUserSearchData.js'
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

// APIの戻り値をObjectに変換
let apiResult = JSON.parse(getOriginalDetailData());

let selects = ['全選択/全解除', '印刷を全選択', '印刷を全解除'];
//let userUrl = 'http://local-tokei/';
let userDataSelect = [];
let checkAll = '';
let userCount = 0;
let textSearch = '';
let sortSearch = '';
let alphaSearch = '';
let alphabet = ['全','ア','カ','サ','タ','ナ','ハ','マ','ヤ','ラ','ワ'];

export default {
  props:['selectedService'],
  watch:{
    selectedService:function(){
      // this.onInitializedUser();
      this.createUser();
    }
  },
  data() {
    return {
      usersData: [],
      selects: selects,
      isDroppedDown: false,
      alphabet: alphabet,
      riyo_inf: [],
      riyocodeFlag: true,
      jyukyunoFlag: false,
      tplImage: CellMaker.makeImage({}),
    };
  },
  methods: {
    // ソートボタン押下時のイベント
    sortUser: function (sortType) {
      sortSearch = sortType;
      // 全員3もしくは受給者番号ボタン押下時はコードではなく受給者番号を表示する
      if (sortSearch == 3) {
        this.riyocodeFlag = false;
        this.jyukyunoFlag = true;
      } else {
        this.riyocodeFlag = true;
        this.jyukyunoFlag = false;
      }
      this.userFilter();
    },
    onTextChangedUser: function (s) {
      // カナ検索欄に入力された文字を取得して書き換え
      textSearch = s.text;
      this.userFilter();
    },
    onAlphabet: function (key) {
      // どのカナボタンを押下したか番号を取得して書き換え
      alphaSearch = key;
      this.userFilter();
    },
    onselectedIndexChanged: function (s) {
      // 全選択・全解除の選択値を取得して書き換え
      checkAll = s.selectedIndex;
      this.userFilter();
    },
    createUser: function (response) {
      let usersData = [];
      usersData['status'] = 'idle';
      let riyo_inf = [];
      //axiosを利用するとき下記有効
      // for (let i = 0; i < response.data.length; i++) {
      //   riyo_inf.push({
      //     riid: response.data[i]['riid'],
      //     riyocode: response.data[i]['riyocode'],
      //     names: response.data[i]['names'],
      //     kana: response.data[i]['kana'],
      //     jukyuid: response.data[i]['jukyuid'],
      //     jyukyuno: response.data[i]['jyukyuno'],
      //     sityoid: response.data[i]['sityoid'],
      //     jidoid: response.data[i]['jidoid'],
      //     kzkname: response.data[i]['kzkname'],
      //     kakutei: response.data[i]['kakutei'],
      //     print: response.data[i]['print'],
      //   });
      // }

      //axiosを利用しないとき下記有効
      // console.log(response);
      if(!response){
        response = apiResult['riyo_inf'];
      }
      let kakuteiFlag = false;
      for (let i = 0; i < response.length; i++) {
        if(response[i]['kakutei'] == 2 || response[i]['kakutei'] == 3 ){
          kakuteiFlag = true;
        }else{
          kakuteiFlag = false;
        }
        riyo_inf.push(
          {
            riid: response[i]['riid'],
            riyocode: response[i]['riyocode'],
            names: response[i]['names'],
            kana: response[i]['kana'],
            jukyuid: response[i]['jukyuid'],
            jyukyuno: response[i]['jyukyuno'],
            sityoid: response[i]['sityoid'],
            jidoid: response[i]['jidoid'],
            kzkname: response[i]['kzkname'],
            kakutei: kakuteiFlag == true ? require('@/assets/kaku_15px.png'):"",
            print: '',
          }
        )
      }
      //--axiosを利用しないとき下記有効
      usersData['riyo_inf'] = riyo_inf;
      userDataSelect = usersData;

      this.userFilter();
      return riyo_inf;
    },

    userFilter() {
      let data = [];
      userDataSelect['riyo_inf'].forEach(function (value) {
        // 印刷チェックの制御
        if (checkAll == '1') value.print = '〇';
        if (checkAll == '2') value.print = '';
        // カナ検索の文字が一致していたら行の値一式を配列に追加する
        if (value.names.indexOf(textSearch) != -1) {
          data.push(value);
        }
      });
      if (alphaSearch > 0) {
        let alphaSortedData = [];
        data.forEach(function (value) {
          switch (alphaSearch) {
            case 1:
              if (value.kana.match(/^[ア-オ]/)) alphaSortedData.push(value);
              break;
            case 2:
              if (value.kana.match(/^[カ-コ]/)) alphaSortedData.push(value);
              break;
            case 3:
              if (value.kana.match(/^[サ-ソ]/)) alphaSortedData.push(value);
              break;
            case 4:
              if (value.kana.match(/^[タ-ト]/)) alphaSortedData.push(value);
              break;
            case 5:
              if (value.kana.match(/^[ナ-ノ]/)) alphaSortedData.push(value);
              break;
            case 6:
              if (value.kana.match(/^[ハ-ホ]/)) alphaSortedData.push(value);
              break;
            case 7:
              if (value.kana.match(/^[マ-モ]/)) alphaSortedData.push(value);
              break;
            case 8:
              if (value.kana.match(/^[ヤ-ヨ]/)) alphaSortedData.push(value);
              break;
            case 9:
              if (value.kana.match(/^[ラ-ロ]/)) alphaSortedData.push(value);
              break;
            case 10:
              if (value.kana.match(/^[ワ-ン]/)) alphaSortedData.push(value);
              break;
          }
        });
        data = alphaSortedData;
      }

      //コード順でソート
      if (sortSearch == 1) {
        data.sort((a, b) => {
          if (a.riyocode < b.riyocode) return -1;
          if (a.riyocode > b.riyocode) return 1;
          return 0;
        });
      }
      //利用者名でソート
      if (sortSearch == 2) {
        data.sort((a, b) => {
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
          return 0;
        });
      }
      //受給者番号でソート
      if (sortSearch == 3) {
        data.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) return -1;
          if (a.jyukyuno > b.jyukyuno) return 1;
          return 0;
        });
      }
      // ソートして利用者一覧に表示するデータを一式親コンポーネントに送る
      this.$emit('child-userslist', data);
      // ソートしたデータでグリッド表示データを上書きする
      this.usersData = data;
    },
    userFilter2() {
      return true;
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onInitializedUser: function (flexGrid) {
      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        if(panel.cellType == wjGrid.CellType.ColumnHeader){
          // ヘッダーの改行位置の設定
          if(r == 0 && c == 0){
            cell.innerHTML = '確<br/>';
            s.textAlign = 'center';
          }
        }
      }
      this.userGrid = flexGrid;
      let _self = this;
      //axiosを利用する時下記有効
      // const axiosApi = axios.create({
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // axiosApi
      //   .get(userUrl)
      //   .then(function (response) {
      //     _self.usersData = _self.createUser(response);

      //     let i = 0;
      //     while (flexGrid.columns.length < 3) {
      //       let clm = new wjGrid.Column();
      //       if (i == 0) clm.width = '2*';
      //       if (i == 1) clm.width = '2*';
      //       if (i == 2) clm.width = '1*';
      //       flexGrid.columns.push(clm);
      //       i++;
      //     }

      //     while (flexGrid.rows.length < userCount) {
      //       flexGrid.rows.push(new wjGrid.Row());
      //     }
      //     flexGrid.formatItem.addHandler(userCell);
      //     // configure the grid
      //     flexGrid.alternatingRowStep = 0;

      //     //初回のユーザ選択値
      //     _self.$emit('child-selectedrow', 0);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     alert('error');
      //   });

      //axiosを利用しない時下記1行有効
      _self.usersData = _self.createUser();

      // let i = 0;
      // while (flexGrid.columns.length < 3) {
      //   let clm = new wjGrid.Column();
      //   if (i == 0) clm.width = '2*';
      //   if (i == 1) clm.width = '2*';
      //   if (i == 2) clm.width = '1*';
      //   flexGrid.columns.push(clm);
      //   i++;
      // }

      while (flexGrid.rows.length < userCount) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.formatItem.addHandler(userCell);
      // configure the grid
      flexGrid.alternatingRowStep = 0;

      //初回のユーザ選択値
      // _self.$emit('child-selectedrow', 0);
      // flexGrid.selection = new wjGrid.CellRange(-1);

      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        let hPage  = flexGrid.hitTest(e.pageX, e.pageY);
        //選択した要素の取得
        if (e.target.innerText.length > 0) {
          let row = hPage._row;
          _self.$emit('child-event', userDataSelect['riyo_inf'][row].riyocode);
          //利用者一覧の何行目が選択されたかを送る
          _self.$emit('child-selectedrow', row);
        }
        //印刷箇所を押下
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 3) {
          let p = flexGrid.getCellData(ht.row, 3);
          let mark = '';
          if (p == '〇') mark = '';
          if (p == '') mark = '〇';
          _self.usersData[ht.row]['print'] = mark;
          flexGrid.setCellData(ht.row, 3, mark);
        }
      });
    },
  },
};

function userCell(s, e) {
  if (e.cell.children.length == 0) {
    let align = 'left';
    let str = e.cell.innerHTML;
    str = '<div>' + str + '</div>';
    e.cell.innerHTML = str.replace(',', '');
    wjCore.setCss(e.cell, {
      display: 'table',
      tableLayout: 'fixed',
    });
    wjCore.setCss(e.cell.children[0], {
      display: 'table-cell',
      textAlign: align,
      verticalAlign: 'middle',
    });
  }
}
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#user-list_scrollbar {
  padding: 0;
  width: 275px;
  font-size: 12px;
  .wj-cell:not(.wj-header) {
    background: $grid_background;
    &:nth-child(4) {
      background-color: $white;
    }
  }

  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }

  .wj-cell-maker{
    height:15px;
  }

  @media screen and (max-width: 1366px){
    #userListGrid {
      height: 57vh;
    }
  }

  @media screen and (min-width: 1367px){
    #userListGrid {
      height: 71vh;
    }
  }
}

</style>