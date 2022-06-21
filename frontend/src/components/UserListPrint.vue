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
            <wj-menu
              id="comboFilters"
              class="combo"
              :initialized="initComboFilters"
              :isRequired="true"
              style="width: 100%"
              :itemsSource="filterCombo"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
            >
            </wj-menu>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-card
              outlined
              tile
              @click="sortUser(1)"
              :class="{
                'text-center': true,
                'text-caption': true,
                grey: sortFlag.codeFlag,
                'lighten-2': sortFlag.codeFlag,
              }"
            >
              コード
            </v-card>
          </v-col>
          <v-col>
            <v-card
              :class="{
                'text-center': true,
                'text-caption': true,
                grey: sortFlag.kanaFlag,
                'lighten-2': sortFlag.kanaFlag,
              }"
              outlined
              tile
              @click="sortUser(2)"
              >カナ</v-card
            >
          </v-col>
          <v-col>
            <v-card
              :class="{
                'text-center': true,
                'text-caption': true,
                grey: sortFlag.bangoFlag,
                'lighten-2': sortFlag.bangoFlag,
              }"
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
      <v-btn-toggle class="flex-wrap" mandatory>
        <v-btn
          outlined
          v-for="(n, k) in alphabet"
          :key="n"
          :width="25"
          p-0
          style="min-width: auto; padding: 9px; height: 10px"
          @click="onAlphabet(k)"
          >{{ n }}</v-btn
        >
      </v-btn-toggle>
    </div>
    <wj-flex-grid
      id="userGrid"
      class="mt-1"
      :autoSearch="true"
      :headersVisibility="'Column'"
      :selectionMode="3"
      :style="gridHeight"
      :initialized="onInitializedUser"
      :itemsSourceChanged="onItemsSourceChanged"
      :itemsSource="usersData"
      :allowAddNew="false"
      :allowDelete="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowResizing="false"
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
        :width="20"
        :word-wrap="false"
        :isReadOnly="true"
        :allowResizing="true"
        class="text-caption"
        align="center"
      ></wj-flex-grid-column>
    </wj-flex-grid>

    <wj-menu
      :header="'全選択/全解除'"
      :itemClicked="onselectedIndexChanged"
      style="width: 100%"
    >
      <wj-menu-item>
        <b>印刷を全選択</b>
      </wj-menu-item>
      <wj-menu-item>
        <b>印刷を全解除</b>
      </wj-menu-item>
    </wj-menu>
  </div>
</template>
<script>
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as wjcCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';

// import '@backend/api/UserListPrint';

Vue.use(VueAxios, axios);
// let userUrl = 'http:// local-tokei/';
let userDataSelect = [];
let userCount = 0;
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
      isDroppedDown: false,
      alphabet: alphabet,
      riyo_inf: [],
      riyocodeFlag: true,
      jyukyunoFlag: false,
      useTeikyoCode: '',
      gridHeight: '',
      filterCombo: this.getFilterCombo(),
      filterFlag: { allFlag: true, nyukyoFlag: false, taikyoFlag: false },
      sortFlag: { kanaFlag: false, codeFlag: true, bangoFlag: false },
      alphaSearch: 0, // アルファベット検索
      sortSearch: '', // 並び順
      checkAll: '', // すべてチェック
      textSearch: '',
      filterSearch: 1, // 全員・入居者・など
    };
  },
  mounted() {
    this.handleResize;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },

  methods: {
    /*************************
     * 絞り込みコンボボックス
     */
    initComboFilters(combo) {
      let _self = this;
      combo.header = this.filterCombo[0].text;
      combo.selectedIndexChanged.addHandler(function (sender) {
        if (sender.selectedIndex != -1) {
          combo.header = _self.filterCombo[sender.selectedIndex].text;
          _self.filterUser(sender.selectedIndex + 1);
        }
        let f = document.activeElement;
        f.blur();
      });
    },
    getFilterCombo() {
      let filterCombo = [];
      filterCombo.push(
        {
          key: 1,
          text: '全員',
        },
        {
          key: 2,
          text: '今月入居者',
        },
        {
          key: 3,
          text: '今月退去者',
        }
      );
      return filterCombo;
    },
    setChildTeikyocode(teikyoCode, serachbutton) {
      // this.usersData = [];
      if (serachbutton) {
        this.usersData = this.createUser();
      }
      this.useTeikyoCode = teikyoCode;
    },
    sortUser(sortType) {
      this.sortFlag.kanaFlag = false;
      this.sortFlag.codeFlag = false;
      this.sortFlag.bangoFlag = false;
      if (sortType == 1) {
        this.sortFlag.codeFlag = true;
      } else if (sortType == 2) {
        this.sortFlag.kanaFlag = true;
      } else if (sortType == 3) {
        this.sortFlag.bangoFlag = true;
      }

      this.sortSearch = sortType;
      if (this.sortSearch == 3) {
        this.riyocodeFlag = false;
        this.jyukyunoFlag = true;
      } else {
        this.riyocodeFlag = true;
        this.jyukyunoFlag = false;
      }
      this.userFilter();
    },
    filterUser(sortType) {
      this.filterFlag.allFlag = false;
      this.filterFlag.nyukyoFlag = false;
      this.filterFlag.taikyoFlag = false;
      if (sortType == 1) {
        this.filterFlag.allFlag = true;
      } else if (sortType == 2) {
        this.filterFlag.nyukyoFlag = true;
      } else if (sortType == 3) {
        this.filterFlag.taikyoFlag = true;
      }
      this.filterSearch = sortType;
      this.userFilter();
    },
    onAlphabet(key) {
      this.alphaSearch = key;
      this.userFilter();
    },
    onTextChangedUser(s) {
      this.textSearch = s.text;
      this.userFilter();
    },
    onselectedIndexChanged(s) {
      this.checkAll = s.selectedIndex;
      this.userFilter(s);
    },
    createUser() {
      let usersData = [];
      usersData['status'] = 'idle';
      let riyo_inf = [];

      // axiosを利用するとき下記有効
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

      // axiosを利用しないとき下記有効
      userCount = 100;
      for (let i = 0; i < userCount; i++) {
        riyo_inf.push({
          riid: '5500' + i,
          riyocode: '123456' + i,
          names: '東経太郎' + i,
          kana: 'トウケイタロウ' + i,
          jukyuid: i * 10,
          jyukyuno: '876543210' + i,
          sityoid: i * 30,
          jidoid: i * 40,
          kzkname: '東経家族' + i,
          kakutei: 0,
          nyukyo: i % 2,
          taikyo: i % 4,
          print: '',
        });
      }
      // --axiosを利用しないとき下記有効

      usersData['riyo_inf'] = riyo_inf;
      userDataSelect = usersData;

      this.userFilter();
      return this.usersData;
    },

    userFilter(s) {
      let data = [];
      let _self = this;
      userDataSelect['riyo_inf'].forEach(function (value) {
        if (_self.checkAll == '0') value.print = '〇';
        if (_self.checkAll == '1') value.print = '';
        if (
          value.names.indexOf(_self.textSearch) != -1 &&
          (_self.filterSearch == 1 ||
            (_self.filterSearch == 2 && value.nyukyo == 1) ||
            (_self.filterSearch == 3 && value.taikyo == 1))
        ) {
          data.push(value);
        }
      });
      let get = [];
      data.forEach(function (value) {
        switch (_self.alphaSearch) {
          case 0:
            get.push(value);
            break;
          case 1:
            if (value.kana.match(/^[ア-オ]/)) {
              get.push(value);
            }
            break;
          case 2:
            if (value.kana.match(/^[カ-コ]/)) {
              get.push(value);
            }
            break;
          case 3:
            if (value.kana.match(/^[サ-ソ]/)) {
              get.push(value);
            }
            break;
          case 4:
            if (value.kana.match(/^[タ-ト]/)) {
              get.push(value);
            }
            break;
          case 5:
            if (value.kana.match(/^[ナ-ノ]/)) {
              get.push(value);
            }
            break;
          case 6:
            if (value.kana.match(/^[ハ-ホ]/)) {
              get.push(value);
            }
            break;
          case 7:
            if (value.kana.match(/^[マ-モ]/)) {
              get.push(value);
            }
            break;
          case 8:
            if (value.kana.match(/^[ヤ-ヨ]/)) {
              get.push(value);
            }
            break;
          case 9:
            if (value.kana.match(/^[ラ-ロ]/)) {
              get.push(value);
            }
            break;
          case 10:
            if (value.kana.match(/^[ワ-ン]/)) {
              get.push(value);
            }
            break;
        }
      });

      data = get;

      // コード順でソート
      if (this.sortSearch == '' || this.sortSearch == 1) {
        data.sort((a, b) => {
          if (a.riyocode < b.riyocode) return -1;
          if (a.riyocode > b.riyocode) return 1;
          return 0;
        });
      }
      // 利用者名でソート
      if (this.sortSearch == 2) {
        data.sort((a, b) => {
          if (a.kana < b.kana) return -1;
          if (a.kana > b.kana) return 1;
          return 0;
        });
      }
      // 受給者番号でソート
      if (this.sortSearch == 3) {
        data.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) return -1;
          if (a.jyukyuno > b.jyukyuno) return 1;
          return 0;
        });
      }

      if (s) {
        s.selectedIndex = 0; // どの値を選択しても初期状態に戻す
      }

      this.$emit('child-user', data);
      this.usersData = data;
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    userCheckInvalide() {
      // 初期選択を解除
      // this.userGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onInitializedUser(flexGrid) {
      this.userGrid = flexGrid;
      let _self = this;

      // axiosを利用しない時下記1行有効
      if (_self.usersData.length == 0) {
        _self.usersData = _self.createUser();
      }

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
      // flexGrid.columnHeaders.rows.defaultSize = 20;
      // flexGrid.rows.defaultSize = 20;

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.cell.children.length == 0) {
          if (e.panel == s.cells && e.col == 1) {
            let tooltip = new wjcCore.Tooltip();
            // let note = this.usersData[e.row].kana;
            let note = '<small>' + _self.usersData[e.row].kana + '</small>';
            wjcCore.toggleClass(e.cell, 'wj-has-notes');
            tooltip.setTooltip(e.cell, note);
          }

          let align = '';
          if (e.col == 2) {
            align = 'center';
          } else {
            align = 'left';
          }
          let str = e.cell.innerHTML;
          str = '' + str + '';
          e.cell.innerHTML = wjCore.escapeHtml(str.replace(',', ''));

          if (e.col == 2) {
            e.cell.style.textAlign = 'center';
          }
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
      });

      // configure the grid
      flexGrid.alternatingRowStep = 0;

      // 初回のユーザ選択値
      // _self.$emit('child-select', 0);
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);

        // 印刷箇所を押下
        if (ht.cellType == wjGrid.CellType.Cell && ht.col == 2) {
          let p = flexGrid.getCellData(ht.row, 2);
          let mark = '';
          if (p == '〇') mark = '';
          if (p == '') mark = '〇';
          _self.usersData[ht.row]['print'] = mark;
          flexGrid.setCellData(ht.row, 2, mark);

          flexGrid.select(-1, -1);
        } else if (e.target.innerText.length > 0) {
          let row = hPage._row;
          //flexGrid.select(hPage.row, hPage.col);
          if (e.panel != flexGrid.columnHeaders) {
            flexGrid.itemFormatter = function (panel, r, c, cell) {
              if (r == hPage.row && panel != flexGrid.columnHeaders) {
                cell.style.color = sysConst.COLOR.white;
                cell.style.backgroundColor =
                  sysConst.COLOR.gridSelectedBackground;
              }
            };
          }

          _self.$emit('child-select', row);
        }
      });
    },
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize: function () {
      let height = window.innerHeight;
      let targetElement = document.getElementById('user-list-print_scrollbar');
      var clientRect = targetElement.getBoundingClientRect();
      var y = clientRect.top;
      //alert(y);
      let ht = '';
      ht = height - y - 190;
      this.gridHeight = 'height:' + ht + 'px;';
    },
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#comboFilters {
  .wj-btn.wj-btn-default {
    border-left: none;
  }
}
div#user-list-print_scrollbar {
  padding: 0;
  width: 275px;
  #filterCombo {
    width: 100%;
  }

  .wj-cell {
    font-size: $cell_fontsize;
    padding: 0px !important;
  }
  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background-color: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background-color: $grid_selected_background;
    color: $grid_selected_color;
  }

  div {
    &.wj-cells {
      .wj-cell.wj-state-selected {
        background-color: $grid_selected_background;
        color: $grid_selected_color;
      }
    }
  }

  .wj-form-control {
    font-size: 12px;
  }

  .combo:hover {
    background-color: #e1e1e1;
  }

  .combo:focus {
    background-color: #fff;
  }

  #comboFilters_dropdown {
    .wj-listbox-item {
      background-color: $white !important;
      padding: 30px;
    }
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