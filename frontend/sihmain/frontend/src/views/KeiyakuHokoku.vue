<template>
  <div id="KeiyakuHokoku">
    <v-container fluid class="container pa-1">
      <tab-menu-blue
        @parent_tab_menu="parent_tab_menu"
        :tabmenu="tabMenus"
      ></tab-menu-blue>

      <v-row no-gutters class="mt-1">
        <v-col class="d-flex" cols="3">
          <v-row no-gutters class="d-block no-flex-grow mr-1">
            <v-col>
              <label>受給者証</label>
              <v-btn-toggle
                class="flex-wrap"
                mandatory
                v-model="toggle_displaySort"
                @change="displayFilter()"
              >
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                  style="width: 80px; height: 25px"
                  v-for="val in jyukyuSyaSyo"
                >
                  {{ val }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex ml-n5" cols="3">
          <v-row no-gutters class="d-block no-flex-grow mr-1">
            <v-col>
              <label>事業所</label>
              <wj-menu
                class="w-100 customCombobox"
                :isRequired="true"
                header="指定なし"
                :displayMemberPath="'text'"
                selectedValuePath="'key'"
                :itemsSource="jigyosyoCombo"
                :itemClicked="onselectedJigyosyoChanged"
              ></wj-menu>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex ml-n5">
          <v-row no-gutters class="d-block no-flex-grow mr-1">
            <v-col>
              <label>サービス</label>
              <wj-menu
                class="w-100 customCombobox"
                :isRequired="true"
                header="指定なし"
                :displayMemberPath="'text'"
                selectedValuePath="'key'"
                :itemsSource="serviceCombo"
                :itemClicked="onselectedServiceChanged"
              ></wj-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1">
        <v-col class="d-flex" cols="3">
          <v-row no-gutters class="d-block no-flex-grow mr-1">
            <v-col>
              <label>ソート</label>
              <v-btn-toggle
                class="flex-wrap"
                mandatory
                v-model="toggle_sort"
                @change="displaySort()"
              >
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                  style="width: 80px; height: 25px"
                  v-for="val in toggleSort"
                >
                  {{ val }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex ml-n5" cols="3">
          <v-row no-gutters class="d-block no-flex-grow mr-1">
            <v-col>
              <label>カナ検索</label>
              <wj-combo-box
                style="width: 240px; padding: 0px 0px 0px 4px"
                :textChanged="onInputSearch"
                :isEditable="true"
              ></wj-combo-box>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex ml-n5" cols="3">
          <v-btn small outlined>検索</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1 mb-1">
        <alphabet-button
          ref="alphabetButton"
          @onAlphabetical="onAlphabetical"
        ></alphabet-button>
      </v-row>
      <v-row no-gutters class="mt-1 mb-1">
        <v-col cols="6">
          <wj-flex-grid
            id="KeiyakuHokokuGrid"
            :initialized="onInitialized"
            :itemsSourceChanged="onItemsSourceChanged"
            :selectionMode="3"
            :allowMerging="6"
            :headersVisibility="'Column'"
            :allowDragging="false"
            :allowResizing="true"
            :deferResizing="false"
            :autoRowHeights="true"
            :itemsSource="keiyakuHokokuData"
          >
            <wj-flex-grid-column
              :header="'コード'"
              :binding="'riyocode'"
              align="center"
              valign="middle"
              :width="76"
              format="g"
              :allowResizing="false"
              :isReadOnly="true"
              :allowSorting="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'利用者名'"
              :binding="'rnames'"
              align="center"
              valign="middle"
              width="*"
              format="g"
              :allowResizing="false"
              :isReadOnly="true"
              :allowSorting="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'サービス内容'"
              :binding="'svcsyucode'"
              align="center"
              valign="middle"
              :width="30"
              format="g"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :binding="'svcname'"
              align="center"
              valign="middle"
              width="*"
              format="g"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'決定支給量等'"
              :binding="'sikyunaiyo'"
              align="center"
              valign="middle"
              width="*"
              format="g"
              :allowResizing="false"
              :isReadOnly="true"
              :allowSorting="false"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'済'"
              :binding="'sumi'"
              align="center"
              valign="middle"
              :width="50"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'終了'"
              :binding="'syuryo'"
              align="center"
              valign="middle"
              :width="50"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-col>
        <v-col cols="6" class="pl-1">
          <v-card outlined tile class="pa-2">
            <v-card-title class="pa-0"> 契約量登録 </v-card-title>
            <v-row no-gutters>
              <v-col cols="2"><label>利用者名</label></v-col>
              <v-col cols="2">
                <v-text-field
                  outlined
                  dense
                  class="inputs rounded-0"
                  hide-details="false"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2"><label>利用者名</label></v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import TabMenuBlue from '@/components/TabMenuBlue.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { KeiyakuHokoku } from '@backend/api/KeiyakuHokoku';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      year: moment().year(),
      tabMenus: [
        { href: '#amount', text: '契約量登録' },
        { href: '#finish', text: '終了登録' },
        { href: '#list', text: '一覧参照' },
      ],
      jyukyuSyaSyo: ['障害者', '障害児', '地域相談'],
      toggleSort: ['カナ', 'コード', '受給者番号'],
      toggle_displaySort: 0,
      toggle_sort: 0,
      alphabetKey: 0,
      kanaSearch: '', // カナ絞り込み
      keiyakuHokokuData: [],
      allData: [],
      jigyosyoCombo: [
        {
          key: -1,
          text: '指定なし',
        },
        {
          key: '10001',
          text: '東経ヘルパーセンター',
        },
        {
          key: '10002',
          text: '東経ステーション',
        },
      ], // 事業所セレクトボックス
      serviceCombo: [
        {
          key: -1,
          text: '指定なし',
        },
        {
          key: '10001',
          text: '居宅介護(身体介護)',
        },
        {
          key: '10002',
          text: '居宅介護(家事援助)',
        },
      ], // サービスセレクトボックス
      jigyosyoSelected: -1,
      serviceSelected: -1,
    };
  },
  components: {
    TabMenuBlue,
    AlphabetButton,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      let height = window.innerHeight;
      let ht = 74;
      if (height > 800) {
        ht = 84;
      }
      this.gridHeight = 'height:' + ht + 'vh; width:100%;';
    },
    /**************
     * 子コンポーネントtabmenublueで選択した値を取得
     */
    parent_tab_menu(args) {},

    /************
     * アルファベットの絞り込み
     */
    onAlphabetical(key) {
      this.alphabetKey = key;
      this.filtered();
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      // データの取得
      this.getData().then((result) => {
        this.keiyakuHokokuData = result;
        this.allData = result;
        this.filtered();
      });

      // セルマージ
      this.createMerge();
      // セルフォーマット
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.cells) {
          if (e.col == 5 || e.col == 6) {
            e.cell.style.backgroundColor = sysConst.COLOR.white;
          } else {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }
          if (e.col == 1 || e.col == 3 || e.col == 4) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
        }
      });
    },

    /******************************
     * セルマージ
     ******************************/
    createMerge() {
      let headerRanges = [new wjGrid.CellRange(0, 2, 0, 3)];
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      this.mainFlexGrid.mergeManager = mm;
    },
    /**********************************
     * データ絞り込み トグルボタンを押下
     *******************/
    displayFilter() {
      // this.filtered();
    },
    displaySort() {
      let array = this.keiyakuHokokuData;
      this.keiyakuHokokuData = [];
      if (this.toggle_sort === 0) {
        array.sort((a, b) => {
          if (a.rkanas < b.rkanas) {
            return -1;
          }
          if (a.rkanas > b.rkanas) {
            return 1;
          }
          return 0;
        });
      }
      if (this.toggle_sort === 1) {
        array.sort((a, b) => {
          if (a.riyocode < b.riyocode) {
            return -1;
          }
          if (a.riyocode > b.riyocode) {
            return 1;
          }
          return 0;
        });
      }
      if (this.toggle_sort === 2) {
        array.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) {
            return -1;
          }
          if (a.jyukyuno > b.jyukyuno) {
            return 1;
          }
          return 0;
        });
      }
      for (let i = 0; i < array.length; i++) {
        this.keiyakuHokokuData.push(array[i]);
      }
    },
    /********************************
     * 事業所選択
     */
    onselectedJigyosyoChanged(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.jigyosyoSelected = e.selectedItem.key;
      }
      this.filtered();
    },
    /********************************
     * サービス選択
     */
    onselectedServiceChanged(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.serviceSelected = e.selectedItem.key;
      }
      this.filtered();
    },
    /*****************************
     * カナ絞り込み
     */
    onInputSearch(e) {
      this.kanaSearch = e.text;
      this.filtered();
    },
    /**********************
     * データの絞り込み
     *************************/
    filtered() {
      // 受給者証の絞り込みを押下
      // let keiyakuHokokuData = this.keiyakuHokokuData;
      this.keiyakuHokokuData = [];
      let data = [];

      for (let i = 0; i < this.allData.length; i++) {
        let kana = this.allData[i].rkanas;
        let jigyono = this.allData[i].jigyono;
        if (
          kana.match(this.kanaSearch) &&
          (this.serviceSelected < 0 ||
            this.serviceSelected == this.allData[i].svcsyocode) &&
          (this.jigyosyoSelected < 0 ||
            jigyono.indexOf(this.jigyosyoSelected) != -1) &&
          (this.alphabetKey == 0 ||
            (this.alphabetKey == 1 && kana.match(/^[ア-オ]/)) ||
            (this.alphabetKey == 2 && kana.match(/^[カ-コ]/)) ||
            (this.alphabetKey == 3 && kana.match(/^[サ-ソ]/)) ||
            (this.alphabetKey == 4 && kana.match(/^[タ-ト]/)) ||
            (this.alphabetKey == 5 && kana.match(/^[ナ-ノ]/)) ||
            (this.alphabetKey == 6 && kana.match(/^[ハ-ホ]/)) ||
            (this.alphabetKey == 7 && kana.match(/^[マ-モ]/)) ||
            (this.alphabetKey == 8 && kana.match(/^[ヤ-ヨ]/)) ||
            (this.alphabetKey == 9 && kana.match(/^[ラ-ロ]/)) ||
            (this.alphabetKey == 10 && kana.match(/^[ワ-ン]/)))
        ) {
          data.push(this.allData[i]);
        }
      }
      this.keiyakuHokokuData = data;
    },
    /**********************************
     * 表示用データ取得
     ******************************/
    async getData() {
      let keiyakuHokokuData = [];

      return KeiyakuHokoku().then((result) => {
        keiyakuHokokuData = result.icrn_inf;

        return keiyakuHokokuData;
      });
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#KeiyakuHokoku {
  max-width: 1340px;
  width: 1340px;
}
div#KeiyakuHokoku {
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: none;

  .wj-cell {
    &.wj-header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .togglebtn {
    width: 80px;
    height: 25px;
    &.auto {
      width: auto;
    }
  }

  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cell {
    &.wj-state-active.wj-state-selected {
      background: $grid_hover_background;
      color: $font_color;
    }
    &.wj-state-multi-selected {
      background: $grid_hover_background;
      color: $font_color;
    }
  }
  .inputs {
    min-height: 18px;
    font-size: 12px;
  }
  label {
    display: inline-block;
    margin-right: 2px;
    padding-top: 2px;
    background: #eee;
    border: none;
    height: 24px;
    width: 75px;
    text-align: center;
    line-height: 20px;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }
  .customCombobox {
    width: 240px !important;
  }
}
</style>
