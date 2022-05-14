<template>
  <div id="user-list-print_scrollbar">
    <v-row no-gutters>
      <v-col col="12">
        <v-row no-gutters>
          <wj-combo-box
            :textChanged="onTextChangedUser"
            style="width: 100%"
            placeholder="カナ検索"
          ></wj-combo-box>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(1)"
            >
              全員
            </v-card>
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(2)"
              >全員2</v-card
            >
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(3)"
              >全員3</v-card
            >
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(1)"
            >
              コード
            </v-card>
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(2)"
              >カナ</v-card
            >
          </v-col>
          <v-col>
            <v-card
              class="text-caption text-center"
              outlined
              tile
              @click="sortUser(3)"
              >受給者番号</v-card
            >
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
      class="mt-1"
      :autoSearch="true"
      :headersVisibility="'Column'"
      :selectionMode="3"
      style="height: 55vh"
      :initialized="onInitializedUser"
      :itemsSourceChanged="onItemsSourceChanged"
      :itemsSource="usersData"
      :allowDragging="false"
      :allowResizing="true"
      :allowSorting="false"
    >
      <wj-flex-grid-column
        header="コード"
        binding="riyocode"
        width="2*"
        :word-wrap="false"
        :allowResizing="true"
        :isReadOnly="true"
        v-if="riyocodeFlag"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="受給者番号"
        binding="jyukyuno"
        :width="110"
        :word-wrap="false"
        :allowResizing="true"
        :isReadOnly="true"
        v-if="jyukyunoFlag"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="利用者名"
        binding="names"
        width="3*"
        :word-wrap="false"
        :allowResizing="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="印"
        binding="print"
        :width="25"
        :word-wrap="false"
        :isReadOnly="true"
        :allowResizing="true"
        class="text-caption"
      ></wj-flex-grid-column>
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
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

let selects = ['全選択/全解除', '印刷を全選択', '印刷を全解除'];
//let userUrl = 'http://local-tokei/';
let userDataSelect = [];
let checkAll = '';
let userCount = 0;
let textSearch = '';
let sortSearch = '';
let alphaSearch = '';
let alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];
export default {
  data() {
    return {
      usersData: [],
      selects: selects,
      isDroppedDown: false,
      alphabet: alphabet,
      riyo_inf: [],
      riyocodeFlag: true,
      jyukyunoFlag: false,
      useTeikyoCode: '',
    };
  },
  methods: {
    setChildTeikyocode(teikyoCode) {
      if (this.useTeikyoCode && this.useTeikyoCode != teikyoCode) {
        //以前の状態とコードが異なる際に、ユーザの一覧をクリアする
        this.usersData = [];
      }
      this.useTeikyoCode = teikyoCode;
    },
    sortUser: function (sortType) {
      sortSearch = sortType;
      if (sortSearch == 3) {
        this.riyocodeFlag = false;
        this.jyukyunoFlag = true;
      } else {
        this.riyocodeFlag = true;
        this.jyukyunoFlag = false;
      }
      this.userFilter();
    },
    onAlphabet: function (key) {
      alphaSearch = key;
      this.userFilter();
    },
    onTextChangedUser: function (s) {
      textSearch = s.text;
      this.userFilter();
    },
    onselectedIndexChanged: function (s) {
      checkAll = s.selectedIndex;
      this.userFilter(s);
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
      console.log(response);
      userCount = 100;
      for (let i = 0; i < userCount; i++) {
        riyo_inf.push({
          riid: '5500' + i,
          riyocode: '123456' + (Math.floor(Math.random() * 9) + 1),
          names: '東経太郎' + i,
          kana: 'トウケイタロウ' + i,
          jukyuid: i * 10,
          jyukyuno: '876543210' + i,
          sityoid: i * 30,
          jidoid: i * 40,
          kzkname: '東経家族' + i,
          kakutei: 0,
          print: '',
        });
      }
      //--axiosを利用しないとき下記有効

      usersData['riyo_inf'] = riyo_inf;
      userDataSelect = usersData;

      this.userFilter();
      return riyo_inf;
    },

    userFilter(s) {
      let data = [];

      userDataSelect['riyo_inf'].forEach(function (value) {
        if (checkAll == '1') value.print = '〇';
        if (checkAll == '2') value.print = '';
        if (value.names.indexOf(textSearch) != -1) {
          data.push(value);
        }
      });
      if (alphaSearch > 0) {
        let get = [];
        data.forEach(function (value) {
          switch (alphaSearch) {
            case 1:
              if (value.kana.match(/^[ア-オ]/)) get.push(value);
              break;
            case 2:
              if (value.kana.match(/^[カ-コ]/)) get.push(value);
              break;
            case 3:
              if (value.kana.match(/^[サ-ソ]/)) get.push(value);
              break;
            case 4:
              if (value.kana.match(/^[タ-ト]/)) get.push(value);
              break;
            case 5:
              if (value.kana.match(/^[ナ-ノ]/)) get.push(value);
              break;
            case 6:
              if (value.kana.match(/^[ハ-ホ]/)) get.push(value);
              break;
            case 7:
              if (value.kana.match(/^[マ-モ]/)) get.push(value);
              break;
            case 8:
              if (value.kana.match(/^[ヤ-ヨ]/)) get.push(value);
              break;
            case 9:
              if (value.kana.match(/^[ラ-ロ]/)) get.push(value);
              break;
            case 10:
              if (value.kana.match(/^[ワ-ン]/)) get.push(value);
              break;
          }
        });
        data = get;
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
      if (s) {
        s.selectedIndex = 0; //どの値を選択しても初期状態に戻す
      }
      this.$emit('child-user', data);
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
      //     _self.$emit('child-select', 0);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     alert('error');
      //   });

      //axiosを利用しない時下記1行有効
      _self.usersData = _self.createUser();

      let i = 0;
      while (flexGrid.columns.length < 3) {
        let clm = new wjGrid.Column();
        if (i == 0) clm.width = '2*';
        if (i == 1) clm.width = '2*';
        if (i == 2) clm.width = '1*';
        flexGrid.columns.push(clm);
        i++;
      }

      while (flexGrid.rows.length < userCount) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.formatItem.addHandler(userCell);
      // configure the grid
      flexGrid.alternatingRowStep = 0;

      //初回のユーザ選択値
      // _self.$emit('child-select', 0);

      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);

        //印刷箇所を押下
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 2) {
          let p = flexGrid.getCellData(ht.row, 2);
          let mark = '';
          if (p == '〇') mark = '';
          if (p == '') mark = '〇';
          _self.usersData[ht.row]['print'] = mark;
          flexGrid.setCellData(ht.row, 2, mark);
        } else if (e.target.innerText.length > 0) {
          //選択した要素の取得

          let row = hPage._row;
          _self.$emit('child-select', row);
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

div#user-list-print_scrollbar {
  padding: 0;
  width: 275px;
  .wj-cell:not(.wj-header) {
    background: $grid_background;
    &:nth-child(3) {
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
    overflow-y: scroll;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }
}
</style>