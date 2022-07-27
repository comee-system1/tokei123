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
                  :key="val"
                >
                  {{ val }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex ml-n3" cols="3">
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
        <v-col class="d-flex ml-n3" cols="3">
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
        <v-col class="d-flex ml-n3">
          <v-row no-gutters class="d-block no-flex-grow mr-1">
            <v-col v-show="display2">
              <label>印刷種類</label>
              <v-btn-toggle
                class="flex-wrap"
                mandatory
                v-model="toggle_print"
                @change="displayPrint()"
              >
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                  style="width: 80px; height: 25px"
                  v-for="val in jyukyuPrint"
                  :key="val"
                >
                  {{ val }}
                </v-btn>
              </v-btn-toggle>
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
                  :key="val"
                >
                  {{ val }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex ml-n3" cols="3">
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
        <v-col class="d-flex ml-n3" cols="3">
          <v-btn small outlined>検索</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1 mb-1">
        <v-col>
          <alphabet-button
            ref="alphabetButton"
            @onAlphabetical="onAlphabetical"
          ></alphabet-button>
        </v-col>
        <v-col class="text-end" v-show="display2">
          <v-btn-toggle
            class="flex-wrap"
            v-model="toggle_select"
            @change="displaySelect()"
          >
            <v-btn
              x-small
              color="secondary"
              dark
              outlined
              v-for="val in toggleSelect"
              :key="val"
            >
              {{ val }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1 mb-1">
        <v-col :cols="col">
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
              :visible="isVisible1"
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
              :visible="isVisible1"
            ></wj-flex-grid-column>

            <wj-flex-grid-column
              :header="'事業所名'"
              :binding="'jigyoname'"
              align="center"
              valign="middle"
              :width="200"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'番号'"
              :binding="'lcnt'"
              align="center"
              valign="middle"
              :width="50"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="false"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'契約支給量'"
              :binding="'ryokyk'"
              align="center"
              valign="middle"
              :width="200"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'契約日'"
              :binding="'symd'"
              align="center"
              valign="middle"
              :width="80"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'提供終了日'"
              :binding="'eymd'"
              align="center"
              valign="middle"
              :width="80"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'理由'"
              :binding="'riyu'"
              align="center"
              valign="middle"
              :width="120"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="true"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'提供量'"
              :binding="'teikyonaiyo'"
              align="center"
              valign="middle"
              :width="80"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="false"
              :visible="isVisible2"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'選択'"
              :binding="'selected'"
              align="center"
              valign="middle"
              :width="40"
              format="g"
              :isReadOnly="true"
              :allowResizing="false"
              :allowSorting="false"
              :visible="isVisible2"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-col>
        <v-col cols="6" class="pl-1" v-show="display1">
          <v-card outlined tile>
            <v-card-title class="pa-2"> 契約量登録 </v-card-title>
            <v-row no-gutters class="ma-2">
              <v-col cols="2"><label class="w">利用者名</label></v-col>
              <v-col cols="2" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                  v-model="input.riyocode"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                  v-model="input.rnames"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-row no-gutters class="ma-2">
              <v-col cols="2"><label class="w">サービス内容</label></v-col>
              <v-col cols="6" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                  v-model="input.svcname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-2">
              <v-col cols="2"><label class="w">決定支給量等</label></v-col>
              <v-col cols="4" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                  v-model="input.sikyunaiyo"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  readonly
                  class="inputs rounded-0"
                  hide-details="false"
                  v-model="input.sikyunaiyo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-2 mt-3">
              <v-col cols="2"><label class="w">事業所名</label></v-col>
              <v-col cols="2" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  class="inputs rounded-0"
                  hide-details="false"
                  v-model="input.jigyono"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <wj-menu
                  class="w-100 customCombobox"
                  :isRequired="true"
                  header="指定なし"
                  :displayMemberPath="'text'"
                  selectedValuePath="'key'"
                  :itemsSource="jigyosyoCombo"
                  :itemClicked="onselectedJigyosyoInput"
                  v-model="input.jigyoname"
                  thin
                ></wj-menu>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-2 mt-n1">
              <v-col cols="2"><label class="w">番号</label></v-col>
              <v-col cols="1" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  class="inputs rounded-0"
                  hide-details="false"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-2 mt-n1">
              <v-col cols="2"><label class="w">契約支給量</label></v-col>
              <v-col cols="2" class="ml-1">
                <v-text-field
                  outlined
                  dense
                  class="inputs rounded-0"
                  hide-details="false"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="ml-1 mt-1">/月 </v-col>
            </v-row>
            <v-row no-gutters class="ma-2 mt-n1">
              <v-col cols="2"><label class="w">契約日</label></v-col>
              <v-col cols="2" class="ml-1">
                <datepicker
                  :language="ja"
                  :format="DatePickerFormat"
                  class="input_picker"
                ></datepicker>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-2 mt-n1">
              <v-col cols="2"><label class="w">理由</label></v-col>
              <v-col cols="2" class="ml-1">
                <wj-menu
                  class="w-100 customCombobox"
                  :isRequired="true"
                  :displayMemberPath="'text'"
                  selectedValuePath="'key'"
                  :itemsSource="reasonCombo"
                  :itemClicked="onselectedReasonChanged"
                  thin
                ></wj-menu>
              </v-col>
            </v-row>
            <v-row no-gutters class="ma-2 mt-15">
              <v-col cols="3"><v-btn>画面クリア</v-btn></v-col>
              <v-col cols="6" class="text-center mt-2">
                最終登録者：R03/08/04 10:38 明治 雅夫
              </v-col>
              <v-col cols="3" class="text-end"><v-btn>登録</v-btn></v-col>
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
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';

export default {
  data() {
    return {
      isVisible1: true,
      isVisible2: true,
      display1: true,
      display2: true,
      col: 6,
      year: moment().year(),
      tabMenus: [
        { href: '#amount', text: '契約量登録' },
        { href: '#finish', text: '終了登録' },
        { href: '#list', text: '一覧参照' },
      ],
      jyukyuSyaSyo: ['障害者', '障害児', '地域相談'],
      jyukyuPrint: ['一覧', '契約報告書'],
      toggleSort: ['カナ', 'コード', '受給者番号'],
      toggleSelect: ['全選択', '全解除'],
      toggle_displaySort: 0,
      toggle_sort: 0,
      toggle_select: '',
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
          text: '障害支援施設たんぽぽ園',
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
      reasonCombo: [
        {
          key: -1,
          text: '指定なし',
        },
        {
          key: '10001',
          text: '1:新規契約',
        },
      ], // 理由
      jigyosyoSelected: -1,
      serviceSelected: -1,
      DatePickerFormat: 'yyyy年MM月dd日',
      ja: ja,
      input: {
        riyocode: '',
        rnames: '',
        svcname: '',
        sikyunaiyo: '',
        jigyono: '',
        jigyoname: '',
      },
      toggle_print: '',
    };
  },
  components: {
    TabMenuBlue,
    AlphabetButton,
    Datepicker,
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
    parent_tab_menu(args) {
      if (args.selectTab === 'list') {
        this.isVisible1 = false;
        this.isVisible2 = true;
        this.display1 = false;
        this.display2 = true;
        this.col = 12;
      } else {
        this.isVisible1 = true;
        this.isVisible2 = false;
        this.display1 = true;
        this.display2 = false;
        this.col = 6;
      }
    },

    /************
     * アルファベットの絞り込み
     */
    onAlphabetical(key) {
      this.alphabetKey = key;
      this.filtered();
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);

      this.group = this.groupping(this.keiyakuHokokuData, 'riyocode');

      // ヘッダセルマージ
      this.createHeaderMerge();
    },
    onInitialized(flexGrid) {
      let _self = this;
      this.mainFlexGrid = flexGrid;
      // データの取得
      this.getData().then((result) => {
        this.keiyakuHokokuData = result;
        this.allData = result;

        this.filtered();
      });

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

      // セルのクリックイベント
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        if (ht.cellType == wjGrid.CellType.Cell) {
          // データの取得
          let riyocode = _self.keiyakuHokokuData[hPage.row].riyocode;
          let svcsyocode = _self.keiyakuHokokuData[hPage.row].svcsyocode;
          _self.getDataDetail(riyocode, svcsyocode).then((result) => {
            console.log(result);
            _self.input.riyocode = result.riyocode;
            _self.input.rnames = result.rnames;
            _self.input.svcname = result.svcsyucode + ':' + result.svcname;
            _self.input.sikyunaiyo = result.sikyunaiyo;
          });
        }
      });
    },
    // 配列のグループ化
    groupping(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },

    /******************************
     * セルマージ
     ******************************/
    createHeaderMerge() {
      if (this.mainFlexGrid) {
        let headerRanges = [new wjGrid.CellRange(0, 2, 0, 3)];
        let ranges = [];
        let num = 0;
        Object.keys(this.group).map((key) => {
          let firsts = num;
          let count = this.group[key].length + firsts - 1;
          num = num + count + 1;
          ranges.push(new wjGrid.CellRange(firsts, 0, count, 0));
          ranges.push(new wjGrid.CellRange(firsts, 1, count, 1));
        });

        let mm = new wjGrid.MergeManager();
        mm.getMergedRange = function (panel, r, c) {
          if (panel.cellType == wjGrid.CellType.ColumnHeader) {
            for (let h = 0; h < headerRanges.length; h++) {
              if (headerRanges[h].contains(r, c)) {
                return headerRanges[h];
              }
            }
          }
          if (panel.cellType == wjGrid.CellType.Cell) {
            for (let h = 0; h < ranges.length; h++) {
              if (ranges[h].contains(r, c)) {
                return ranges[h];
              }
            }
          }
        };
        this.mainFlexGrid.mergeManager = mm;
      }
    },
    /**********************************
     * データ絞り込み トグルボタンを押下
     *******************/
    displayFilter() {
      // this.filtered();
    },
    displayPrint() {
      // this.filtered();
    },
    /**********************************
     * 全選択・全解除
     *********************************/
    displaySelect() {
      // alert(this.toggle_select);
      // 全選択
      let array = [];
      if (this.toggle_select === 0) {
        for (let i = 0; i < this.keiyakuHokokuData.length; i++) {
          array[i] = this.keiyakuHokokuData[i];
          array[i].selected = '〇';
        }
      }
      // 全解除
      if (this.toggle_select === 1) {
        for (let i = 0; i < this.keiyakuHokokuData.length; i++) {
          array[i] = this.keiyakuHokokuData[i];
          array[i].selected = '';
        }
      }
      this.keiyakuHokokuData = [];
      this.keiyakuHokokuData = array;
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
    onselectedJigyosyoInput(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
      }
    },
    /********************************
     * 理由選択
     */
    onselectedReasonChanged(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
      }
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
    /**********************************
     * 表示用詳細データ取得
     ******************************/
    async getDataDetail(riyocode, svcsyocode) {
      let keiyakuHokokuData = [];

      return KeiyakuHokoku(riyocode, svcsyocode).then((result) => {
        // 1件帰ってくる予定 テスト用に0番目のデータを指定
        keiyakuHokokuData = result.icrn_inf[0];
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
    min-height: 14px;
    font-size: 12px;
    .v-input__slot {
      min-height: 14px;
      padding: 0px;
      border: 1px solid $light-gray;
      input {
        padding: 2px 0px 2px 0px;
        border-width: thin;
        background-color: $white;
        &:read-only {
          background-color: $grid_background;
        }
      }
    }
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
    &.w {
      width: 100%;
    }
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
    border-radius: 0px !important;
  }
}
</style>
