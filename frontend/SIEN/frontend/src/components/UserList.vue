<template>
  <div id="user-list_scrollbar">
    <v-row no-gutters>
      <v-col col="12">
        <v-row no-gutters class="rowStyle mt-1 ml-1" v-if="dispAddDaicho">
          <v-col cols="*">
            <v-btn
              style="width: 100px; height: 25px; font-size: 12px"
              @click="addClicked"
            >
              台帳新規登録
            </v-btn>
          </v-col>
          <v-col cols="7" class="mr-1">
            <div align="right">
              <v-btn-toggle
                class="flex-wrap ma-0"
                v-model="selDispKbn"
                mandatory
              >
                <v-btn
                  v-for="n in userDispList"
                  :key="n.val"
                  small
                  color="secondary"
                  dark
                  :height="25"
                  outlined
                  @click="siborikomiUser(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-col>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters>
          <v-col cols="*">
            <div align="right">
              <label class="mr-1">サービス歴</label>
              <wj-menu
                id="comboFilters1"
                class="customCombobox"
                :itemsSource="svcRirekiList"
                :initialized="initComboFilters"
                :isRequired="true"
                selectedValuePath="val"
                displayMemberPath="name"
                v-model="selSvcRireki"
                :itemClicked="onSvcRirekiClicked"
                style="width: 200px"
              >
              </wj-menu>
            </div>
          </v-col>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters>
          <v-col cols="*">
            <div align="right">
              <label class="mr-1">担当者</label>
              <wj-menu
                id="comboFilters2"
                class="customCombobox"
                :itemsSource="tantouList"
                :initialized="initComboFilters"
                :isRequired="true"
                selectedValuePath="val"
                displayMemberPath="name"
                v-model="selTantou"
                :itemClicked="onTantouClicked"
                style="width: 200px"
              >
              </wj-menu>
            </div>
          </v-col>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters>
          <wj-combo-box
            :textChanged="onTextChangedUser"
            style="width: 100%; height: 25px"
            placeholder="カナ検索"
          ></wj-combo-box>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters justify="center">
          <v-btn-toggle class="flex-wrap" v-model="sortSearch" mandatory>
            <v-btn
              v-for="n in sortSelList"
              :key="n.val"
              small
              color="secondary"
              dark
              outlined
              :height="25"
              style="width: 90px"
              @click="sortUser(n.val)"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-row>
        <div class="rowStyle mt-1" no-gutters>
          <v-btn-toggle class="flex-wrap ma-0" v-model="alphaSearch" mandatory>
            <v-btn
              outlined
              v-for="(n, k) in alphabet"
              :key="k"
              :width="24"
              style="min-width: auto; padding: 9px; height: 10px"
              @click="onAlphabet(k)"
              >{{ n }}</v-btn
            >
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>

    <div class="mt-0 mr-1" no-gutters>
      <wj-flex-grid
        id="userListGrid"
        :autoSearch="true"
        :headersVisibility="'Column'"
        :selectionMode="3"
        :initialized="onInitializedUser"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="usersViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :formatItem="onFormatItem"
      >
        <wj-flex-grid-column
          header="コード"
          binding="riyocodeD"
          width="2*"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
          v-if="riyocodeFlag"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          header="受給者番号"
          binding="jyukyunoD"
          width="2*"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
          v-if="jyukyunoFlag"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          header="利用者名"
          binding="names"
          width="3*"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </div>
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import ls from '@/utiles/localStorage';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import { Riyousya } from '@backend/api/Riyousya';

const keySort = 'keyval00003';
const keyAlp = 'keyval00006';
// let userDataSelect = [];
let textSearch = '';
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
  props: {
    dispAddDaicho: Boolean,
  },
  // components: { Riyousya },
  data() {
    return {
      userDispList: [
        { val: 0, name: '台帳' },
        { val: 1, name: '本日予定者' },
      ],
      usersData: [],
      usersViewData: [],
      isDroppedDown: false,
      alphabet: alphabet,
      sortSearch: 0,
      alphaSearch: 0,
      riyo_inf: [],
      riyocodeFlag: true,
      jyukyunoFlag: false,
      useTeikyoCode: '',
      selDispKbn: 0,
      selSvcRireki: 0,
      svcRirekiList: [
        { id: 0, name: '全部' },
        { id: 1, name: '登録済み' },
      ],
      selTantou: 0,
      tantouList: [
        { id: 0, name: '指定なし' },
        { id: 1, name: '担当者A' },
        { id: 2, name: '担当者B' },
        { id: 3, name: '担当者C' },
        { id: 4, name: '担当者D' },
      ],
      sortSelList: [
        { val: 0, name: 'コード順' },
        { val: 1, name: 'カナ順' },
        { val: 2, name: '受給者番号順' },
      ],
      hdrTips: new Tooltip({
        position: PopupPosition.RightTop,
        showAtMouse: true,
        showDelay: 300,
        cssClass: 'hdr-tip',
      }),
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(keySort));
      this.alphaSearch = Number(ls.getlocalStorageEncript(keyAlp));
    });
  },
  methods: {
    initComboFilters(combo) {
      if (combo.hostElement.id == 'comboFilters1') {
        combo.header = combo.selectedItem.name;
      } else if (combo.hostElement.id == 'comboFilters2') {
        combo.header = combo.selectedItem.name;
      }
    },
    onSvcRirekiClicked(s) {
      s.header = this.svcRirekiList[s.selectedIndex].name;
      this.selSvcRireki = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
    },
    onTantouClicked(s) {
      s.header = this.tantouList[s.selectedIndex].name;
      this.selTantou = s.selectedValue;
      this.userFilter();
      let f = document.activeElement;
      f.blur();
    },
    siborikomiUser(siborikomiType) {
      this.selDispKbn = siborikomiType;
      this.userFilter();
    },
    sortUser(sortType) {
      ls.setlocalStorageEncript(keySort, sortType);
      this.sortSearch = sortType;

      this.userFilter();
    },
    onAlphabet(key) {
      ls.setlocalStorageEncript(keyAlp, Number(key));
      this.alphaSearch = Number(key);
      this.userFilter();
    },
    onTextChangedUser(s) {
      textSearch = s.text;
      this.userFilter();
    },
    onSvcRirekiIndexChanged() {
      // mijissou
    },
    onTantouIndexChanged() {
      // mijissou
    },
    userFilter(s) {
      let data = [];

      // userDataSelect['riyo_inf'].forEach(function (value) {
      //   if (value.names.indexOf(textSearch) != -1) {
      //     data.push(value);
      //   }
      // });

      if (textSearch.length > 0) {
        data = this.usersData.slice();
      } else {
        this.usersData.forEach(function (value) {
          if (value.names.indexOf(textSearch) != -1) {
            data.push(value);
          }
        });
      }

      let alpval = this.alphaSearch;
      if (alpval > 0) {
        let get = [];
        data.forEach(function (value) {
          switch (alpval) {
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
      }

      // if (this.selDispKbn == 0) {
      //   data = data.filter((x) => x.isDaicho);
      // } else {
      //   data = data.filter((x) => x.isToday);
      // }
      //コード順でソート
      if (this.sortSearch == 0) {
        data.sort((a, b) => {
          if (a.riyocode < b.riyocode) {
            return -1;
          }
          if (a.riyocode > b.riyocode) {
            return 1;
          }
          return 0;
        });
      }
      //利用者名でソート
      if (this.sortSearch == 1) {
        data.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          return 0;
        });
      }
      //受給者番号でソート
      if (this.sortSearch == 2) {
        data.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) {
            return -1;
          }
          if (a.jyukyuno > b.jyukyuno) {
            return 1;
          }
          return 0;
        });
      }
      if (s) {
        s.selectedIndex = 0; //どの値を選択しても初期状態に戻す
      }
      this.usersViewData = data.concat();
      this.$emit('child-user', this.usersViewData);
      if (this.sortSearch == 2) {
        this.riyocodeFlag = false;
        this.jyukyunoFlag = true;
      } else {
        this.riyocodeFlag = true;
        this.jyukyunoFlag = false;
      }
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onInitializedUser(flexGrid) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          //選択した要素の取得
          _self.$emit('child-select', flexGrid.rows[ht._row].dataItem);
        }
      });
      this.userGrid = flexGrid;
      let _self = this;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;
      if (!this.dispAddDaicho) {
        document.getElementById(flexGrid.hostElement.id).style.height = '70vh';
      } else {
        document.getElementById(flexGrid.hostElement.id).style.height = '55vh';
      }
      Riyousya('20000101', '20221231').then((result) => {
        _self.usersData = result;
        this.userFilter();
      });
    },
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1) {
          e.cell.style.textAlign = 'left';
          this.hdrTips.setTooltip(e.cell, flexGrid.rows[e.row].dataItem.kana);
        } else {
          e.cell.style.textAlign = 'center';
        }
      }
    },
    addClicked() {
      // mijissou
      window.open('https://www.yahoo.co.jp/');
    },
  },
};
</script>

<style lang="scss" >
@import '@/assets/scss/common.scss';

div#user-list_scrollbar {
  font-size: 12px;
  font-family: 'メイリオ';
  padding: 0;
  width: 275px;

  .rowStyle {
    height: 25px;
  }

  .wj-cell {
    padding: 2px;
    padding-top: 1px;
  }
  .wj-cell:not(.wj-header) {
    background: $grid_background;
    &:nth-child(3) {
      background-color: $white;
    }
  }
  .wj-header {
    // ヘッダのみ縦横中央寄せ
    color: $font_color;
    font-size: $cell_fontsize;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: normal;
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
  .wj-tooltip.hdr-tip {
    background: black;
    color: lightblue;
    padding: 1em 2em;
    margin: 0.5em;
    border-radius: 1em;
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

  div.customCombobox {
    position: relative;
    width: 200px !important;
    height: 25px !important;
    &.customCombobox {
      // width: 160px !important;
      div {
        text-align: left;
      }
    }
    &#comboFiltersKasan {
      width: 250px !important;
    }
    .wj-btn.wj-btn-default {
      border-left: none !important;
    }
    &:hover {
      background-color: #e1e1e1;
    }
    &:focus {
      background-color: #fff;
    }
    div * {
      height: 21px !important;
      // padding: 0;
      span {
        // height: 21px !important;
        margin-top: 8px;
      }
      &.wj-form-control {
        position: absolute;
        // top: -3px;
        width: 100%;
        padding: 4px;
        padding-top: 6px;
      }
    }
    input {
      height: 25px !important;
    }
  }
  .wj-control .wj-input-group .wj-form-control {
    height: 25px;
  }
}
</style>