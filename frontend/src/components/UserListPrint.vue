<template>
  <div id="user-list-print_scrollbar" :style="styles">
    <div
      :class="{
        switchArea: switchAreaFlag == true,
        switchAreaRight: switchAreaRightFlag == true,
        switchAreaLeft: switchAreaLeftFlag == true,
      }"
      @click="switched"
    >
      <v-icon
        small
        :class="{ anim_right: animtype == 1, anim_left: animtype == 2 }"
        >{{ switchIcon }}</v-icon
      >
    </div>
    <v-row
      no-gutters
      :class="{ v_enter_to: animtype == 1, v_enter_from: animtype == 2 }"
    >
      <v-col
        :style="{
          maxWidth: leftAreaWidth,
        }"
      >
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
              :width="23.5"
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
          :selectionMode="0"
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
            :width="100"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            format="d"
            align="center"
            v-if="riyocodeFlag"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="受給者番号"
            binding="jyukyuno"
            :width="100"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            v-if="jyukyunoFlag"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者名"
            binding="names"
            :width="120"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="印"
            binding="print"
            width="*"
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
// import sysConst from '@/utiles/const';
import { getConnect } from '@connect/getConnect';

let userDataSelect = [];
//let userCount = 0;
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

let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;

export default {
  data() {
    return {
      switchIcon: 'mdi-chevron-left',
      animtype: '0',
      switchAreaFlag: true,
      switchAreaRightFlag: false,
      switchAreaLeftFlag: false,
      usersData: [],
      isDroppedDown: false,
      alphabet: alphabet,
      riyo_inf: [],
      riyocodeFlag: true,
      jyukyunoFlag: false,
      useTeikyoCode: '',
      filterCombo: this.getFilterCombo(),
      filterFlag: { allFlag: true, nyukyoFlag: false, taikyoFlag: false },
      sortFlag: { kanaFlag: false, codeFlag: true, bangoFlag: false },
      alphaSearch: 0, // アルファベット検索
      sortSearch: '', // 並び順
      checkAll: '', // すべてチェック
      textSearch: '',
      filterSearch: 1, // 全員・入居者・など
      headerheight: 280,
      leftAreaWidth: '98%',
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    // バインドするスタイルを生成
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('userGrid') != null) {
        document.getElementById('userGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    switched() {
      this.animtype = this.animtype == '1' ? '2' : '1';
      if (this.switchAreaRightFlag == true) {
        this.switchAreaRightFlag = false;
        this.switchAreaLeftFlag = true;
        this.leftAreaWidth = '98%';
      } else {
        this.switchAreaRightFlag = true;
        this.switchAreaLeftFlag = false;
        this.leftAreaWidth = '0%';
      }

      this.$emit('child-left', this.switchAreaRightFlag);
    },
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
      let params = [];
      params = {
        uniqid: uniqid,
        traceid: traceid,
        getkbn: 0,
        jkbn: 0,
        sdnflg: 0,
        symd: '20220801',
        eymd: '20220901',
      };

      return getConnect('/userListPrint', params).then((result) => {
        usersData['riyo_inf'] = result.icrn_inf;
        userDataSelect = usersData;

        this.userFilter();
        return this.usersData;
      });
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
      flexGrid.select(-1, -1);
      // 初期選択を解除
      // flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    userCheckInvalide() {
      this.userGrid.select(-1, -1);
    },
    onInitializedUser(flexGrid) {
      this.userGrid = flexGrid;
      let _self = this;

      _self.createUser();

      let i = 0;
      while (flexGrid.columns.length < 3) {
        let clm = new wjGrid.Column();
        if (i == 0) clm.width = '2*';
        if (i == 1) clm.width = '2*';
        if (i == 2) clm.width = '1*';
        flexGrid.columns.push(clm);
        i++;
      }
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.cell.children.length == 0) {
          // フリガナの表示
          if (e.panel == s.cells && e.col == 1) {
            let tooltip = new wjCore.Tooltip();
            // let note = this.usersData[e.row].kana;
            let note = '<small>' + _self.usersData[e.row].kana + '</small>';
            wjCore.toggleClass(e.cell, 'wj-has-notes');
            tooltip.setTooltip(e.cell, note);
          }
          if (e.panel == s.cells && e.col == 0) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
          if (e.panel == s.cells && e.col == 1) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }

          let str = e.cell.innerHTML;
          str = '' + str + '';
          e.cell.innerHTML = wjCore.escapeHtml(str.replace(',', ''));
        }
      });

      // configure the grid
      flexGrid.alternatingRowStep = 0;
      let row = -1;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);

        if (ht.cellType == wjGrid.CellType.Cell) {
          // 印刷箇所を押下
          if (ht.col == 2) {
            //let p = flexGrid.getCellData(ht.row, 2);
            let p = _self.usersData[ht.row]['print'];
            let mark = '';
            if (!p || p == ' ') {
              mark = '〇';
            } else {
              mark = ' ';
            }
            _self.usersData[ht.row]['print'] = mark;
            flexGrid.setCellData(ht.row, 2, mark);
            //  flexGrid.select(row, 0);
          } else if (e.target.innerText.length > 0) {
            _self.switched();
            row = hPage._row;
            _self.$emit('child-select', row);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';

div#comboFilters {
  .wj-btn.wj-btn-default {
    border-left: none;
  }
}
div#user-list-print_scrollbar {
  padding: 0;
  #filterCombo {
    width: 100%;
  }
  #userGrid {
    height: var(--height);
  }
  .switchArea {
    width: 14px;
    height: 97%;
    background-color: $black;
    position: fixed;

    left: 275px;
    z-index: 1;
    &.switchAreaRight {
      animation: switchAreaRightMove $seconds forwards;
    }
    &.switchAreaLeft {
      animation: switchAreaLeftMove $seconds forwards;
    }
    i {
      color: $white;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      height: 3.2rem;

      &.anim_right {
        animation: rotate-right $seconds forwards;
      }
      &.anim_left {
        animation: rotate-left $seconds forwards;
      }
    }
  }
  @keyframes switchAreaLeftMove {
    from {
      transform: translateX(-275px);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes switchAreaRightMove {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-275px);
    }
  }
  @keyframes rotate-right {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  @keyframes rotate-left {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .v_enter_to {
    animation: slide $seconds forwards;
  }
  .v_enter_from {
    animation: slideUp $seconds forwards;
  }

  @keyframes slide {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-264px);
    }
  }
  @keyframes slideUp {
    from {
      transform: translateX(-264px);
    }
    to {
      transform: translateX(0px);
    }
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
