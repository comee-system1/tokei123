<template>
  <div id="keikakuLists">
    <v-container class="mt-1 ml-1 pa-0" :style="styles" style="max-width: 100%">
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile> 表示月 </v-card>
        <v-card
          class="ml-1"
          color="transparent"
          height="100%"
          style="border: none"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(0)"
            tile
            outlined
            width="125px"
            height="100%"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="0"
            class="pa-0 ml-1"
            height="100%"
            x-small
            tile
            @click="inputCalendarClick(1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            class="pa-0 ml-1"
            height="100%"
            x-small
            tile
            @click="inputCalendarClick(2)"
          >
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-card>
        <v-btn>検索開始</v-btn>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle pa-1" outlined tile> 担当者 </v-card>
        <wj-menu
          id="comboFilters"
          class="customCombobox ml-1"
          :itemsSource="tantousyaList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selTantousya"
          :itemClicked="onTantousyaClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 対象者 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="taisyousyaIndex"
          mandatory
        >
          <v-btn
            v-for="n in taisyousyaList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          class="flex-wrap ml-1"
          multiple
          v-if="taisyousyaIndex == 1"
        >
          <v-btn
            v-for="n in taisyousyaYoteiList"
            :key="n.val"
            small
            color="primary  "
            dark
            outlined
            @click="taisyousyaYoteiListClick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row class="mt-1" no-gutters>
        <v-col cols="*" style="max-width: 330px">
          <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
          </alphabet-button>
        </v-col>
        <v-col style="max-width: 130px">
          <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
            <span class="miman mr-1" style="width: 80px">18歳未満</span>
          </v-card>
        </v-col>
        <v-col cols="3" style="text-align: right">
          <v-btn x-small @click="onClickJyukyusya">受給者証登録へ</v-btn>
        </v-col>
        <!--
        <v-col cols="3" style="text-align: right">
          <v-btn-toggle v-model="fontsizeModel" @change="onFontsize()">
            <v-btn v-for="val in fontArray" :key="val.key">{{ val.val }}</v-btn>
          </v-btn-toggle>
        </v-col>
        -->
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="keikakuListGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'None'"
          :isReadOnly="true"
          :initialized="onInitialize"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
          :style="{ 'font-size': gridFontSize }"
        >
          <wj-flex-grid-filter></wj-flex-grid-filter>
          <wj-flex-grid-column
            :binding="'riyocode'"
            align="center"
            valign="middle"
            format="g"
            width="3*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'name'"
            align="center"
            valign="middle"
            width="4*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'age'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'birth'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sityo'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sakuseikubun'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'yotei'"
            align="center"
            valign="middle"
            width="2*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sakuseibi_an'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'yoshiki_text'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakuan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakusyukan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kihonjyoho'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'doui_an'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'teisyutu'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sikyukettei'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kaisaibi'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kanryo'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sakuseibi'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikaku'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakusyukan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'doui'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'monikeizoku'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tanto'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuIcrnDatepicker"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-overlay class="text-center" id="load_dialog" v-show="screenFlag">
      <v-progress-circular
        v-show="screenFlag"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <!-- 計画案 利用者同意・署名ダイアログ-->
    <v-dialog width="400" v-model="doui_dialog">
      <v-card elevation="2" class="pa-5 keikakulist_dialog">
        <v-toolbar-title class="text-subtitle-1 text-center"
          >計画案 利用者同意・署名</v-toolbar-title
        >
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close"
          class="mt-3 mr-2"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="mt-2">
          <v-col cols="3"><label>利用者名</label></v-col>
          <v-col cols="*">
            <v-text-field
              outlined
              value=""
              class="pa-0 ma-0 text-input readonly"
              hide-details="false"
              height="24"
              readonly
              v-model="doui_dialog_input.riyosya"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col cols="3"><label>同意日</label></v-col>
          <v-col cols="4">
            <v-text-field
              outlined
              class="pa-0 ma-0 text-input"
              hide-details="false"
              readonly
              @click="datepicker_doui_dialog = true"
              append-icon="mdi-calendar-month"
              v-model="doui_dialog_input.douibi"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col cols="3"><label>区分</label></v-col>
          <v-col cols="*">
            <v-btn-toggle v-model="select_doui_man">
              <v-btn small elevation="0" v-for="val in doui_man" :key="val">{{
                val
              }}</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="3"><label>署名</label></v-col>
          <v-col cols="*">
            <v-text-field
              outlined
              value=""
              class="pa-0 ma-0 text-input"
              hide-details="false"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="space-between" class="mt-3">
          <v-col cols="3">
            <v-btn small>削除</v-btn>
          </v-col>
          <v-col cols="3" align="right">
            <v-btn small>登録</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="datepicker_doui_dialog"
      width="300"
      class="datepicker_dialogs"
    >
      <v-date-picker
        v-model="doui_picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="douiSelect"
      >
      </v-date-picker>
    </v-dialog>

    <!-- 計画案 提出ダイアログ-->
    <v-dialog width="400" v-model="teisyutu_dialog">
      <v-card elevation="2" class="pa-5 keikakulist_dialog">
        <v-toolbar-title class="text-subtitle-1 text-center"
          >計画案 提出</v-toolbar-title
        >
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close"
          class="mt-3 mr-2"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="mt-2">
          <v-col cols="3"><label>利用者名</label></v-col>
          <v-col cols="*">
            <v-text-field
              outlined
              value=""
              class="pa-0 ma-0 text-input readonly"
              hide-details="false"
              height="24"
              readonly
              v-model="teisyutu_dialog_input.riyosya"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col cols="3"><label>提出日</label></v-col>
          <v-col cols="4">
            <v-text-field
              outlined
              class="pa-0 ma-0 text-input"
              hide-details="false"
              readonly
              @click="datepicker_teisyutu_dialog = true"
              append-icon="mdi-calendar-month"
              v-model="teisyutu_dialog_input.teisyutubi"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters justify="space-between" class="mt-3">
          <v-col cols="3">
            <v-btn small>削除</v-btn>
          </v-col>
          <v-col cols="3" align="right">
            <v-btn small>登録</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="datepicker_teisyutu_dialog"
      width="300"
      class="datepicker_dialogs"
    >
      <v-date-picker
        v-model="teisyutu_picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="teisyutuSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
// import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '@connect/getConnect';

export default {
  components: { AlphabetButton },
  data() {
    return {
      mainGrid: [],
      // 計画案 利用者同意・署名ダイアログ用
      doui_dialog: false,
      datepicker_doui_dialog: false,
      doui_picker: '',
      doui_man: ['本人', '代理人'],
      doui_dialog_input: { riyosya: '', douibi: '' },
      select_doui_man: 0,
      select_doui_key: 0,
      // 計画案 提出ダイアログ用
      teisyutu_dialog: false,
      teisyutu_dialog_input: { riyosya: '', teisyutubi: '' },
      datepicker_teisyutu_dialog: false,
      teisyutu_picker: '',
      select_teisyutu_key: 0,
      fontsizeModel: 2,
      fontArray: [
        { key: 1, val: '大' },
        { key: 2, val: '中' },
        { key: 3, val: '小' },
      ],
      fontPixel: [
        { key: 1, val: '17px' },
        { key: 2, val: '15px' },
        { key: 3, val: '13px' },
      ],
      gridFontSize: '13px',
      headerRowHeight: 130,
      viewdataAll: [],
      viewdata: [],
      footerdata: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      tourokuScreenFlag: false,
      filterkeikakuIcrn: {},
      filteryoteisyaIcrn: {},
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '鈴木' },
        { val: 2, name: '佐々木' },
        { val: 3, name: '伊藤' },
      ],
      selTantousya: 0,
      selTantousyaVal: '',
      taisyousyaList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月対象者' },
      ],
      taisyousyaYoteiList: [
        { val: 1, name: '新規' },
        { val: 2, name: '中途月変更' },
        { val: 3, name: '終期月更新' },
      ],
      taisyousyaIndex: 0,
      taisyousyaYoteiIndex: [],
      loading: false,
      headerColumn1: [
        'コード',
        '氏名',
        '年\n齢',
        '誕\n生\n月',
        '市区町村',
        '作\n成\n区\n分',
        '案作成\n予定月',
      ],
      headerColumn2: [
        '作成日',
        '様\n式',
        '計\n画\n案',
        '計\n画\n週\n間',
        '基\n本\n情\n報',
        '同\n意',
      ],
      headerColumn3: ['提\n出', '支\n給\n決\n定'],
      headerColumn4: ['開催日', '完\n了'],
      headerColumn5: ['作成日', '計\n画', '計\n画\n週\n間', '同\n意'],
      headerColumn6: ['モ\nニ\n継\n続\n中', '担当者'],
      headerPlus12: 0,
      headerPlus123: 0,
      headerPlus1234: 0,
      headerPlus12345: 0,
      headerPlus123456: 0,
      headerheight: 200,
    };
  },
  created() {
    this.headerPlus12 = this.headerColumn2.length + this.headerColumn1.length;
    this.headerPlus123 = this.headerColumn3.length + this.headerPlus12;
    this.headerPlus1234 = this.headerColumn4.length + this.headerPlus123;
    this.headerPlus12345 = this.headerColumn5.length + this.headerPlus1234;
    this.headerPlus123456 = this.headerColumn6.length + this.headerPlus12345;
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
    /*********************
     * 画面リサイズの際の表示調整
     */
    calculateWindowHeight() {
      if (document.getElementById('keikakuListGrid') != null) {
        document.getElementById('keikakuListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /***************************
     * 受給者証登録へボタン
     */
    onClickJyukyusya() {
      alert('受給者証登録ボタンへ押下');
      return false;
    },
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitializedkeikakuIcrn: function (filter) {
      this.filterkeikakuIcrn = filter;
    },
    onInitialize(flexGrid) {
      let array = [];

      let params = {
        uniqid: 1,
        traceid: 1,
        pJigyoid: 43,
        pSym: 201901,
      };
      return getConnect(this.$route.path + 'View', params).then((result) => {
        array = result;
        this.viewdata = array;
        this.viewdataAll = array;
        let foot = [];
        foot = [
          this.viewdata.length,
          10,
          '',
          36,
          6,
          5,
          4,
          4,
          4,
          4,
          2,
          2,
          1,
          14,
          12,
          14,
        ];
        this.footerdata = foot;
        let _self = this;
        this.mainGrid = flexGrid;
        this.createHeader(flexGrid);
        this.createFooter(flexGrid);

        this.createMerge(flexGrid);
        // クリックイベント
        flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
          let ht = flexGrid.hitTest(e);
          let hPage = flexGrid.hitTest(e.pageX, e.pageY);
          if (ht.panel == flexGrid.cells) {
            // 作成日を押下
            if (hPage.col === 7) {
              if (
                confirm(
                  'サービス等利用計画(案)作成画面へ移動します。よろしいですか？'
                )
              ) {
                alert('ok');
              }
            }
            // 同意を押下
            let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
            if (hPage.col === 12) {
              _self.select_doui_key = tmpitem.riyocode;
              _self.doui_dialog = true;
              _self.settingDouidialog();
            }
            // 提出を押下
            if (hPage.col === 13) {
              _self.select_teisyutu_key = tmpitem.riyocode;
              _self.teisyutu_dialog = true;
              _self.settingTeisyutudialog();
            }
          }
        });

        flexGrid.itemFormatter = function (panel, r, c, cell) {
          if (panel.cellType == wjGrid.CellType.ColumnHeader) {
            if (r <= 1) {
              cell.style.borderBottom = 0;
            }
          }
          if (panel.cellType == wjGrid.CellType.ColumnFooter) {
            if (c > 1) {
              cell.style.textAlign = 'right';
              cell.style.justifyContent = 'right';
              cell.style.alignItems = 'right';
            }
          }
          if (panel.cellType == wjGrid.CellType.Cell) {
            let tmpitem = panel.rows[r].dataItem;
            if (tmpitem.age <= 18) {
              if (c == 1) {
                wjCore.addClass(cell, 'miman');
              }
            }
            if (c == 1 || c == 4 || c == 22) {
              cell.style.textAlign = 'left';
            }

            if (c == 2 || c == 3) {
              cell.style.textAlign = 'right';
            }
            if (c <= 11 || (c >= 15 && c <= 19) || c >= 21) {
              cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            }
          }

          if (c == _self.headerPlus1234) {
            cell.style.borderLeftStyle = 'double';
          }
          if (c == _self.headerPlus12345) {
            cell.style.borderLeftStyle = 'double';
          }
        };
      });
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows(0, this.viewdata.length, false);
      flexGrid.endUpdate();
    },
    createFooter(flexGrid) {
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      var panel = flexGrid.columnFooters;
      panel.setCellData(0, 0, '合計件数');
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[1].height = 120;
      for (let i = 0; i < this.headerColumn1.length; i++) {
        let name = this.headerColumn1[i];
        panel.setCellData(0, i, name);
        panel.setCellData(2, i, ' ');
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
      }
      panel.setCellData(0, this.headerColumn1.length, 'サービス等利用計画(案)');
      let no = 0;
      for (let i = this.headerColumn1.length; i < this.headerPlus12; i++) {
        let name = this.headerColumn2[no];
        panel.setCellData(1, i, name);
        panel.setCellData(2, i, ' ');
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      no = 0;
      for (let i = this.headerPlus12; i < this.headerPlus123; i++) {
        let name = this.headerColumn3[no];
        panel.setCellData(0, i, name);
        panel.setCellData(2, i, ' ');
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      panel.setCellData(0, this.headerPlus123, '担当者会議');
      no = 0;
      for (let i = this.headerPlus123; i < this.headerPlus1234; i++) {
        let name = this.headerColumn4[no];
        panel.setCellData(1, i, name);
        panel.setCellData(2, i, ' ');
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }

      panel.setCellData(0, this.headerPlus1234, 'サービス等利用計画');
      no = 0;
      for (let i = this.headerPlus1234; i < this.headerPlus12345; i++) {
        let name = this.headerColumn5[no];
        panel.setCellData(1, i, name);
        panel.setCellData(2, i, ' ');
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }

      no = 0;
      for (let i = this.headerPlus12345; i < this.headerPlus123456; i++) {
        let name = this.headerColumn6[no];
        panel.setCellData(0, i, name);
        panel.setCellData(2, i, ' ');
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
    },
    createMerge(flexGrid) {
      let headerRanges = [];
      for (let i = 0; i < this.headerColumn1.length; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 1, i));
      }
      headerRanges.push(
        new wjGrid.CellRange(
          0,
          this.headerColumn1.length,
          0,
          this.headerPlus12 - 1
        )
      );

      for (let i = this.headerPlus12; i < this.headerPlus123; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 1, i));
      }

      headerRanges.push(
        new wjGrid.CellRange(0, this.headerPlus123, 0, this.headerPlus1234 - 1)
      );
      headerRanges.push(
        new wjGrid.CellRange(
          0,
          this.headerPlus1234,
          0,
          this.headerPlus12345 - 1
        )
      );

      for (let i = this.headerPlus12345; i < this.headerPlus123456; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 1, i));
      }

      let footerRanges = [];
      footerRanges = [new wjGrid.CellRange(0, 0, 0, 3)];

      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    onTantousyaClicked(s) {
      s.header = s.selectedItem.name;
      this.selTantousya = s.selectedItem.name;
      this.selTantousyaVal = s.selectedItem.val;
      this.userFilter();
    },

    onAlphabetical() {
      this.userFilter();
    },

    taisyousyaYoteiListClick(s) {
      // 要素があれば削除
      if (this.taisyousyaYoteiIndex.indexOf(s) != -1) {
        this.taisyousyaYoteiIndex[this.taisyousyaYoteiIndex.indexOf(s)] = '';
        let array = [];
        for (let i = 0; i < this.taisyousyaYoteiIndex.length; i++) {
          if (this.taisyousyaYoteiIndex[i]) {
            array.push(this.taisyousyaYoteiIndex[i]);
          }
        }
        this.taisyousyaYoteiIndex = array;
      } else {
        this.taisyousyaYoteiIndex.push(s);
      }
      this.userFilter();
    },

    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdataAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      if (this.selTantousya && this.selTantousyaVal) {
        let array = [];
        for (let i = 0; i < tmpviewdata.length; i++) {
          if (tmpviewdata[i].tanto == this.selTantousya) {
            array.push(tmpviewdata[i]);
          }
        }
        tmpviewdata = array;
      }

      if (this.taisyousyaYoteiIndex.length > 0) {
        let array = [];
        for (let i = 0; i < tmpviewdata.length; i++) {
          if (
            this.taisyousyaYoteiIndex.indexOf(tmpviewdata[i].taisyosya) != -1
          ) {
            array.push(tmpviewdata[i]);
          }
        }

        tmpviewdata = array;
      }

      this.viewdata = tmpviewdata;
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = moment().startOf('months');
        this.picker = this.kikanYm.year() + '-' + this.kikanYm.format('MM');
      }
      return (
        this.kikanYm.format('YYYY') + '年' + this.kikanYm.format('MM') + '月'
      );
    },
    inputCalendarClick(kbn) {
      if (kbn == 1) {
        this.kikanYm = this.kikanYm.subtract(1, 'months');
      } else if (kbn == 2) {
        this.kikanYm = this.kikanYm.add(1, 'months');
      }
      this.picker =
        this.kikanYm.format('YYYY') +
        '-' +
        this.kikanYm.format('MM') +
        '-' +
        this.kikanYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog = true;
      } else {
        this.viewdata = [];
      }
    },
    monthSelect() {
      let split = this.picker.split('-');
      this.kikanYm = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.viewdata = [];
      this.datepicker_dialog = false;
    },

    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },

    douiSelect() {
      this.doui_dialog_input.douibi = moment(this.doui_picker).format(
        'YYYY年MM月DD日'
      );
      this.datepicker_doui_dialog = false;
    },
    teisyutuSelect() {
      this.teisyutu_dialog_input.teisyutubi = moment(
        this.teisyutu_picker
      ).format('YYYY年MM月DD日');
      this.datepicker_teisyutu_dialog = false;
    },
    header_dialog_close() {
      this.doui_dialog = false;
      this.teisyutu_dialog = false;
    },
    // 同意ダイアログの選択初期データ表記
    settingDouidialog() {
      // alert(this.select_doui_key);
      this.doui_dialog_input.riyosya = '100011 東経 わかめ';
      this.doui_dialog_input.douibi = moment().format('YYYY年MM月DD日');
    },
    // 提出ダイアログの選択初期データ表記
    settingTeisyutudialog() {
      // alert(this.select_doui_key);
      this.teisyutu_dialog_input.riyosya = '100011 東経 わかめ';
      this.teisyutu_dialog_input.teisyutubi = moment().format('YYYY年MM月DD日');
    },

    onFontsize() {
      this.mainGrid.beginUpdate();
      if (this.fontsizeModel != undefined) {
        this.gridFontSize = this.fontPixel[this.fontsizeModel].val;
      }
      this.mainGrid.autoSizeRows(0, this.viewdata.length, false);
      this.mainGrid.autoRowHeights = true;
      this.mainGrid.itemsSource = [];
      this.mainGrid.itemsSource = this.viewdata;
      this.mainGrid.endUpdate();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuListGrid,
div#keikakuLists {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  .rowStyle {
    height: 25px;
  }
  .wj-right {
    &.wj-elem-filter {
      float: none;
    }
  }
  .wj-cell {
    font-weight: normal;

    &.wj-header {
      display: flex;
      justify-content: center;
      align-items: center;
      &.wj-header-alt {
        border-top: 1px solid;
      }
    }
  }

  #load_dialog {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.46;
    background-color: rgb(33, 33, 33);
    border-color: rgb(33, 33, 33);
    width: 100%;
    height: 100%;
    z-index: 4;
    padding: 0;
    margin: 0;
  }

  .ymd,
  .v-btn:not(.addbtn, .itemBtn) {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .hosokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    border: none;
    > .premonth {
      background: #ffcccc;
    }
  }

  .itemBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
    width: 75px;
  }

  div.customCombobox {
    position: relative;
    width: 125px !important;
    height: 25px !important;
    &.customCombobox {
      width: 160px !important;
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
        top: -3px;
        width: 100%;
      }
    }
    input {
      height: 25px !important;
    }
  }
  .v-input--selection-controls .v-input__slot > .v-label {
    font-size: 14px;
  }
}

div#keikakuListGrid {
  width: 100%;
  height: var(--height);
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#keikakuIcrnDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 70px;
  width: 300px;
  max-width: 300px;

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(7)
    .v-btn__content {
    color: blue;
  }

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(1)
    .v-btn__content {
    color: red;
  }
}
.miman {
  padding: 0;
  position: relative;
  width: auto;
  height: 20px;
}
.miman::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 10px solid green;
  border-left: 10px solid transparent;
}

// 利用者同意署名ダイアログ
.keikakulist_dialog {
  font-size: 12px;
  min-height: 24px;

  .text-input {
    font-size: 12px;
    .v-input__slot {
      min-height: 24px;
      padding: 0px 4px !important;
    }
    fieldset {
      max-height: 32px;
    }
    input {
      padding: 0px 4px;
    }
    &.readonly {
      background-color: $light_yellow;
    }
  }

  .v-input__append-inner {
    position: absolute;

    right: 14px;
    top: -10px;
    width: 12px;
    .v-input__icon {
      height: 12px;
      width: 12px;
      i {
        font-size: 16px;
      }
    }
  }

  label {
    background-color: $view_Title_background;
    width: 80px;
    display: block;
    height: 24px;
    text-align: center;
    padding-top: 4px;
  }
}
</style>
