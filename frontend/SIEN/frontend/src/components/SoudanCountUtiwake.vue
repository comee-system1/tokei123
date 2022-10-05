<template>
  <div id="soudanCountUtiwake">
    <v-container class="mt-1 ml-1 pa-0" fluid style="min-height: 89vh">
      <v-navigation-drawer
        class="blue lighten-5"
        v-model="drawer"
        absolute
        left
        width="90"
        min-width="90"
        style="min-height: 1000px"
      >
        <v-card class="drawerTitle pa-1" outlined tile :height="30">
          日付選択
          <v-btn
            elevation="2"
            icon
            absolute
            top
            right
            height="20"
            width="20"
            v-on:click.stop="drawer = !drawer"
            class="mt-1"
            color="secondary"
            ><v-icon dark small> mdi-close </v-icon></v-btn
          >
        </v-card>
        <MdSelect class="ma-1" ref="mdselect" @dateSelect="setMd"></MdSelect>
      </v-navigation-drawer>
      <v-row no-gutters class="rowStyle mb-1">
        <v-card
          class="koumokuTitle titleMain pa-1 mr-1"
          width="100"
          outlined
          tile
        >
          表示単位
        </v-card>
        <v-btn-toggle class="flex-wrap mr-1" v-model="dispIndex" mandatory>
          <v-btn
            v-for="n in dispList"
            :key="n.val"
            color="secondary"
            outlined
            width="50"
            height="20"
            @click="dispClicked(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>

        <v-card
          class="mr-1"
          color="transparent"
          height="100%"
          style="border: none"
          outlined
          tile
        >
          <span v-if="dispIndex == 0">
            <v-btn
              @click="inputCalendarClick(0)"
              class="btnymd mr-1"
              tile
              outlined
              width="150px"
              height="100%"
              >{{ getYmd() }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>

            <v-btn
              elevation="0"
              class="btnymd pa-0 mr-1"
              height="100%"
              x-small
              tile
              @click="inputCalendarClick(1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              class="btnymd pa-0 mr-1"
              height="100%"
              x-small
              tile
              @click="inputCalendarClick(2)"
            >
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
            <v-btn height="20" v-on:click.stop="drawer = !drawer">
              日付選択
            </v-btn>
          </span>
          <span v-else>
            <v-btn
              @click="inputCalendarClick(90)"
              class="btnymd mr-1"
              tile
              outlined
              width="125px"
              height="100%"
              >{{ getYm(0) }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>
            <label class="mr-1">～</label>
            <v-btn
              @click="inputCalendarClick(99)"
              class="btnymd mr-1"
              tile
              outlined
              width="125px"
              height="100%"
              >{{ getYm(1) }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>
            <v-btn class="mr-1 pa-1" height="20" @click="searchClicked()">
              検索
            </v-btn>
          </span>
        </v-card>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle titleMain pa-1" width="100" outlined tile>
          入力区分
        </v-card>
        <wj-menu
          id="comboFiltersInput"
          class="customCombobox ml-1"
          :itemsSource="inputList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selInputKbn"
          :itemClicked="onInputClicked"
        >
        </wj-menu>
        <v-card
          class="koumokuTitle titleMain pa-1 ml-1"
          width="100"
          outlined
          tile
        >
          対応者
        </v-card>
        <wj-menu
          id="comboFiltersTaiousya"
          class="customCombobox ml-1"
          :itemsSource="taiousyaList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selTaiousya"
          :itemClicked="onTaiousyaClicked"
        >
        </wj-menu>
        <v-card
          class="koumokuTitle titleMain pa-1 ml-1"
          width="100"
          outlined
          tile
        >
          表示内容
        </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="selDispGridIndex"
          mandatory
        >
          <v-btn
            v-for="n in dispGridList"
            :key="n.val"
            width="85"
            height="20"
            outlined
            @click="dispclick(n.val)"
            color="secondary"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-card
          class="koumokuTitle titleMain pa-1 ml-1"
          width="100"
          outlined
          tile
        >
          集計内容
        </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          style="margin-right: 5px"
          v-model="selSyukeiIndex"
        >
          <v-btn
            v-for="n in syukeiList"
            :key="n.val"
            outlined
            width="40"
            min-width="40"
            height="20"
            @click="syukeiclick(n.val)"
            color="secondary"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <v-card class="gridTitle pa-0 ma-0" outlined tile>
          {{ title }}
        </v-card>
        <wj-flex-grid
          id="soudanCountUtiwakeGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializeSoudanCountUtiwakeGrid"
          :formatItem="onFormatItemSoudanCountUtiwake"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSource="viewJyoukyouList"
          v-show="selDispGridIndex == 0"
        >
        </wj-flex-grid>
        <wj-flex-grid
          id="sienNaiyouGridUtiwake"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializesienNaiyouGridUtiwake"
          :formatItem="onFormatItemsienNaiyou"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSource="viewNaiyouList"
          v-show="selDispGridIndex == 1"
        >
        </wj-flex-grid>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog v-model="datepickerYmd_dialog" class="datepickerYmd_dialogs">
      <v-date-picker
        id="soudanCountUtiwakeDatepicker"
        scrollable
        no-title
        mode="single"
        v-model="pickerYmd"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepickerSym_dialog"
      width="200"
      class="datepickerSym_dialogs"
    >
      <v-date-picker
        id="soudanCountUtiwakeDatepickerS"
        type="month"
        v-model="pickerSym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepickerEym_dialog"
      width="200"
      class="datepickerSym_dialogs"
    >
      <v-date-picker
        id="soudanCountUtiwakeDatepickerE"
        type="month"
        v-model="pickerEym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect(1)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
// import { mstHouhou } from '@backend/api/MstHouhou';
// import { mstKankei } from '@backend/api/MstKankei';
import MdSelect from '../components/MdSelect.vue';
import { getConnect } from '@connect/getConnect';
const STYLE_DEFAULT = '';
const BORDER_SOLID = '1px solid';
const V_RL = 'vertical-rl';
const PAD_TOP = '4px';
const ALI_LEFT = 'left';
const ALI_CENTER = 'center';
const ALI_RIGHT = 'right';
const V_ALI_TOP = 'top';
const DISPLAY_TC = 'table-cell';
// const DAYJS_CON_CHAR = '-';
// const FIX_CON_CHAR = '-';
// const STYLE_BLOCK = 'block';
const STYLE_NONE = 'none';
const GRID_ID = {
  Soudan: 'soudanCountUtiwakeGrid',
  Sien: 'sienNaiyouGridUtiwake',
};
// const SOUDAN_COUNT_ROW_HEAD_ITEM = [
//   {
//     key: 'code',
//     title: 'コード',
//     align: ALI_CENTER,
//     width: 70,
//   },
//   {
//     key: 'name',
//     title: '利用者名',
//     align: ALI_LEFT,
//     width: 120,
//   },
// ];
// const SIEN_NAIYOU_ROW_HEAD_ITEM = [
//   {
//     key: 'code',
//     title: 'コード',
//     align: ALI_CENTER,
//     width: 70,
//   },
//   {
//     key: 'name',
//     title: '利用者名',
//     align: ALI_LEFT,
//     width: 120,
//   },
//   {
//     key: 'total',
//     title: '相談\n件数',
//     align: ALI_CENTER,
//     width: 50,
//   },
// ];
// const MST_KIND = {
//   Sienkeizoku: { kbn: 1, kbntitle: '新規・継続区分', datanameFix: 'sinki' },
//   Seibetu: { kbn: 2, kbntitle: '性別', datanameFix: 'seibetu' },
//   Setai: { kbn: 3, kbntitle: '世帯状況', datanameFix: 'setai' },
//   Honnin: { kbn: 4, kbntitle: '本人の状況', datanameFix: 'honnin' },
//   Houhou: { kbn: 5, kbntitle: '支援方法', datanameFix: 'houhou' },
//   Kankei: { kbn: 6, kbntitle: '相談者(本人との関係)', datanameFix: 'kankei' },
//   Rank: { kbn: 7, kbntitle: 'ランク', datanameFix: 'rank' },
// };

export default {
  components: { MdSelect },
  data() {
    return {
      selDispGridIndex: 0,
      dispGridList: [
        { val: 0, name: '相談者状況' },
        { val: 1, name: '支援内容' },
      ],
      selSyukeiIndex: 0,
      syukeiList: [
        { val: 0, name: '回数' },
        { val: 1, name: '人数' },
      ],
      inputList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '基本相談' },
        { val: 2, name: '退院サポート' },
        { val: 3, name: '自立アシスト' },
        { val: 4, name: '連絡調整' },
        { val: 5, name: '計画相談' },
        { val: 6, name: '障害児相談' },
        { val: 7, name: '地域移行' },
        { val: 8, name: '地域定着' },
      ],
      taiousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '宇都宮' },
      ],
      rankList: [
        { val: 1, name: 'A' },
        { val: 2, name: 'B' },
        { val: 3, name: 'C' },
        { val: 4, name: 'D' },
      ],
      soudanCountUtiwakeViewDataAll: [],
      soudanCountUtiwakeViewData: [],
      sienNaiyouViewDataAll: [],
      sienNaiyouViewData: [],
      viewObj: {},
      userObj: {},
      datepicker_dialog: false,
      selTaiousya: 0,
      selInputKbn: 0,
      screenFlag: false,
      mstHouhouList: [],
      mstKankeiList: [],
      selectedYmd: {},
      selectedYmdD: '',
      headerList: [],
      viewKiasuList: [],
      viewNinzuList: [],
      viewJyoukyouList: [],
      viewNaiyouList: [],
      kikanYmd: '',
      kikanSYm: '',
      kikanEYm: '',
      pickerYmd: '',
      pickerSym: '',
      pickerEym: '',
      datepickerYmd_dialog: false,
      datepickerSym_dialog: false,
      datepickerEym_dialog: false,
      targetYmd: '',
      targetSYm: '',
      targetEYm: '',
      drawer: true,
      dispIndex: 0,
      dispList: [
        { val: 0, name: '日指定' },
        { val: 1, name: '月指定' },
      ],
    };
  },
  computed: {
    title() {
      let option = '';
      if (this.selSyukeiIndex == 0) {
        option = ' （回数）';
      } else {
        option = ' （人数）';
      }
      if (this.selDispGridIndex == 0) {
        return '■ 相談者状況' + option;
      } else {
        return '■ 支援内容　' + option;
      }
    },
  },
  watch: {
    selectedYmd(newymd) {
      if (!newymd) {
        this.selectedYmdD = '';
      } else {
        this.selectedYmdD =
          this.getYm() +
          String(newymd.day).padStart(2, '0') +
          '日' +
          '（' +
          newymd.youbi +
          '曜日）';
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      document.getElementById(GRID_ID.Sien).style.display = STYLE_NONE;
    });
  },
  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    onInitializeSoudanCountUtiwakeGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = 130;
      flexGrid.alternatingRowStep = 0;
      flexGrid.frozenColumns = 2;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header + 4;
      flexGrid.endUpdate();
      let tmp =
        this.kikanYmd.format('YYYY') + '-' + this.kikanYmd.format('MM') + '-01';
      this.$refs.mdselect.setYm(tmp);
    },
    onInitializesienNaiyouGridUtiwake(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = 130;
      flexGrid.alternatingRowStep = 0;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header + 4;
      flexGrid.frozenColumns = 2;
      flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      if (flexGrid.hostElement.id == 'soudanCountUtiwakeGrid') {
        this.createSoudanCountGridHeader(flexGrid);
      } else {
        this.createsienNaiyouGridHeader(flexGrid);
      }
      flexGrid.endUpdate();
    },
    createSoudanCountGridHeader(flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columns.length = 0;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        if (colIndex == 0) {
          col.binding = 'riyo_codeD';
          col.align = ALI_CENTER;
          col.width = 70;
        } else if (colIndex == 1) {
          col.binding = 'riyo_name';
          col.width = 150;
        } else {
          col.binding = 'col' + (colIndex - 2);
          col.width = 30;
          col.align = ALI_RIGHT;
          col.aggregate = 'Sum';
        }
        col.header = this.headerList[colIndex].title_list2;

        col.allowMerging = true;
        col.multiLine = true;
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].title_list1
        );
        if (colIndex == 1) {
          if (this.selSyukeiIndex == 0) {
            flexGrid.columnFooters.setCellData(0, colIndex, '件数');
          } else {
            flexGrid.columnFooters.setCellData(0, colIndex, '人数');
          }
        }
      }
    },
    createsienNaiyouGridHeader(flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columns.length = 0;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        if (colIndex == 0) {
          col.binding = 'riyo_codeD';
          col.align = ALI_CENTER;
          col.width = 70;
        } else if (colIndex == 1) {
          col.binding = 'riyo_name';
          col.width = 150;
        } else {
          col.binding = 'col' + (colIndex - 2);
          col.align = ALI_RIGHT;
          col.width = 30;
          col.aggregate = 'Sum';
        }
        col.header = this.headerList[colIndex].title_list2;

        col.allowMerging = true;
        col.multiLine = true;
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].title_list1
        );
        if (colIndex == 1) {
          if (this.selSyukeiIndex == 0) {
            flexGrid.columnFooters.setCellData(0, colIndex, '件数');
          } else {
            flexGrid.columnFooters.setCellData(0, colIndex, '人数');
          }
        }
      }
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onFormatItemSoudanCountUtiwake(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      e.cell.style.writingMode = STYLE_DEFAULT;
      e.cell.style.borderRight = STYLE_DEFAULT;
      e.cell.style.borderBottom = STYLE_DEFAULT;
      e.cell.style.verticalAlign = STYLE_DEFAULT;
      e.cell.style.justifyContent = STYLE_DEFAULT;
      e.cell.style.alignItems = STYLE_DEFAULT;
      e.cell.style.textAlign = STYLE_DEFAULT;
      e.cell.style.display = STYLE_DEFAULT;
      e.cell.style.paddingTop = STYLE_DEFAULT;

      // ヘッダのbindingに組み込まれた区分が異なれば太線区切り
      if (e.panel.columns[e.col].binding != null) {
        let title_list1 = this.headerList[e.col].title_list1;
        let nexttitle_list1 = '';
        if (e.col < flexGrid.columns.length - 1) {
          nexttitle_list1 = this.headerList[e.col + 1].title_list1;
          if (title_list1 != nexttitle_list1) {
            e.cell.style.borderRight = BORDER_SOLID;
          }
        }
      }

      if (e.panel == flexGrid.columnHeaders) {
        if (e.row == 0) {
          e.cell.style.borderRight = BORDER_SOLID;
          // if (e.col == 0) {
          //   e.cell.style.borderBottom = NONE;
          // }
        } else if (e.row == 1) {
          // 縦書きで右から左へ
          e.cell.style.paddingTop = PAD_TOP;
          if (e.panel.columns[e.col].header.match(/[^a-z]/gi)) {
            e.cell.style.writingMode = V_RL;
            e.cell.style.textAlign = ALI_LEFT;
            e.cell.style.justifyContent = ALI_LEFT;
            e.cell.style.alignItems = ALI_LEFT;
          } else {
            e.cell.style.verticalAlign = V_ALI_TOP;
            e.cell.style.display = DISPLAY_TC;
          }
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
          // 未入力は赤くする⇐必要か？
          // if (e.col == 9) {
          //   e.cell.innerHTML =
          //     '<font color="blue">' +
          //     tmpitem.title +
          //     '</font>' +
          //     '<div>' +
          //     wjCore.escapeHtml(e.cell.innerHTML) +
          //     '</div>';
          // }
        }
      }
      // else if (e.panel == flexGrid.cells) {
      //   if (e.row == flexGrid.rows.length - 1) {
      //     e.cell.style.borderBottom = NONE;
      //   }
      // }
      else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.borderTop = ' double 4px black';
        if (e.col <= 1) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if (e.col > 1) {
          e.cell.style.textAlign = ALI_RIGHT;
          e.cell.style.justifyContent = ALI_RIGHT;
          e.cell.style.alignItems = ALI_RIGHT;
        }
      }
    },
    onFormatItemsienNaiyou(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      e.cell.style.writingMode = STYLE_DEFAULT;
      e.cell.style.borderRight = STYLE_DEFAULT;
      e.cell.style.verticalAlign = STYLE_DEFAULT;
      e.cell.style.justifyContent = STYLE_DEFAULT;
      e.cell.style.alignItems = STYLE_DEFAULT;
      e.cell.style.textAlign = STYLE_DEFAULT;
      e.cell.style.display = STYLE_DEFAULT;
      e.cell.style.paddingTop = STYLE_DEFAULT;

      // ヘッダのbindingに組み込まれた区分が異なれば太線区切り
      if (e.panel.columns[e.col].binding != null) {
        let title_list1 = this.headerList[e.col].title_list1;
        let nexttitle_list1 = '';
        if (e.col < flexGrid.columns.length - 1) {
          nexttitle_list1 = this.headerList[e.col + 1].title_list1;
          if (title_list1 != nexttitle_list1) {
            e.cell.style.borderRight = BORDER_SOLID;
          }
        }
      }

      if (e.panel == flexGrid.columnHeaders) {
        if (e.row == 0) {
          e.cell.style.borderRight = BORDER_SOLID;
          // if (e.col == 2) {
          //   e.cell.style.writingMode = V_RL;
          //   e.cell.style.textAlign = ALI_LEFT;
          //   e.cell.style.justifyContent = ALI_LEFT;
          //   e.cell.style.alignItems = ALI_LEFT;
          // }
        } else if (e.row == 1) {
          // 縦書きで右から左へ
          e.cell.style.paddingTop = PAD_TOP;
          if (e.panel.columns[e.col].header.match(/[^a-z]/gi)) {
            e.cell.style.writingMode = V_RL;
            e.cell.style.textAlign = ALI_LEFT;
            e.cell.style.justifyContent = ALI_LEFT;
            e.cell.style.alignItems = ALI_LEFT;
          } else {
            e.cell.style.verticalAlign = V_ALI_TOP;
            e.cell.style.display = DISPLAY_TC;
          }
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        }
      } else if (e.panel == flexGrid.cells) {
        // if (e.row == flexGrid.rows.length - 1) {
        //   e.cell.style.borderBottom = NONE;
        // }
      } else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.borderTop = ' double 4px black';
        if (e.col <= 1) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if (e.col > 1) {
          e.cell.style.textAlign = ALI_RIGHT;
          e.cell.style.justifyContent = ALI_RIGHT;
          e.cell.style.alignItems = ALI_RIGHT;
        }
      }
    },
    onTaiousyaClicked(s) {
      s.header = this.taiousyaList[s.selectedIndex].name;
      this.selTaiousya = s.selectedValue;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
    },
    onInputClicked(s) {
      s.header = this.inputList[s.selectedIndex].name;
      this.selInputKbn = s.selectedValue;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.selectedYmd = null;
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pTaisyo: this.selDispGridIndex == 0 ? 1 : 2,
          pSymd: this.targetYmd,
          pEymd: this.targetYmd,
          pSiid: 0,
          pChiku: 0,
          pHostName: 'cl021',
        };
        if (this.dispIndex == 1) {
          let split = this.pickerSym.split('-');
          this.targetSYm = split[0] + split[1].padStart(2, '0') + '01';
          let splitE = this.pickerEym.split('-');
          this.targetEYm =
            splitE[0] +
            splitE[1].padStart(2, '0') +
            this.kikanEYm.endOf('month').format('DD');
          params.pSymd = this.targetSYm;
          params.pEymd = this.targetEYm;
        }
        this.screenFlag = true;
        getConnect('/SyukeiMeisai', params, 'SIENT').then((result) => {
          this.headerList = result.headerList;
          this.viewKiasuList = result.kaisuList;
          this.viewNinzuList = result.ninzuList;
          this.setViewList();
          this.screenFlag = false;
        });
      } else {
        this.setViewList();
      }
    },
    setViewList() {
      if (this.selDispGridIndex == 0) {
        if (this.selSyukeiIndex == 0) {
          this.viewJyoukyouList = this.viewKiasuList.slice();
        } else {
          this.viewJyoukyouList = this.viewNinzuList.slice();
        }
      } else {
        if (this.selSyukeiIndex == 0) {
          this.viewNaiyouList = this.viewKiasuList.slice();
        } else {
          this.viewNaiyouList = this.viewNinzuList.slice();
        }
      }
    },
    userFilterSoudanCountUtiwake() {
      let tmpSoudanCountUtiwakeViewData = [];
      tmpSoudanCountUtiwakeViewData =
        this.soudanCountUtiwakeViewDataAll.concat();

      if (this.selTaiousya > 0) {
        // 対応者
        tmpSoudanCountUtiwakeViewData = tmpSoudanCountUtiwakeViewData.filter(
          (x) => x.tanntouid == this.selTaiousya
        );
      }

      // //コード順でソート
      // if (this.sortSearch == 0) {
      //   tmpSoudanCountUtiwakeViewData.sort((a, b) => {
      //     if (a.id < b.id) {
      //       return -1;
      //     }
      //     if (a.id > b.id) {
      //       return 1;
      //     }
      //     // 二次キーは交付日
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //利用者名でソート
      // if (this.sortSearch == 1) {
      //   tmpSoudanCountUtiwakeViewData.sort((a, b) => {
      //     if (a.kana < b.kana) {
      //       return -1;
      //     }
      //     if (a.kana > b.kana) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      // //受給者番号でソート
      // if (this.sortSearch == 2) {
      //   tmpSoudanCountUtiwakeViewData.sort((a, b) => {
      //     if (a.nobk < b.nobk) {
      //       return -1;
      //     }
      //     if (a.nobk > b.nobk) {
      //       return 1;
      //     }
      //     if (a.koufuymd !== b.koufuymd) {
      //       return a.koufuymd - b.koufuymd;
      //     }
      //   });
      // }
      this.soudanCountUtiwakeViewData = tmpSoudanCountUtiwakeViewData;
    },
    userFilterSienNaiyou() {
      let tmpSienNaiyouViewData = [];
      tmpSienNaiyouViewData = this.sienNaiyouViewDataAll.concat();

      if (this.selTaiousya > 0) {
        // 対応者
        tmpSienNaiyouViewData = tmpSienNaiyouViewData.filter(
          (x) => x.tanntouid == this.selTaiousya
        );
      }

      this.sienNaiyouViewData = tmpSienNaiyouViewData;
    },
    getYmd() {
      if (!this.kikanYmd) {
        this.kikanYmd = dayjs();
        this.pickerYmd =
          this.kikanYmd.year() +
          '-' +
          this.kikanYmd.format('MM') +
          '-' +
          this.kikanYmd.format('DD');
      }
      return (
        this.kikanYmd.format('YYYY') +
        '年' +
        this.kikanYmd.format('MM') +
        '月' +
        this.kikanYmd.format('DD') +
        '日'
      );
    },
    getYm(kbn) {
      if (kbn == 0) {
        if (!this.kikanSYm) {
          this.kikanSYm = dayjs().startOf('months');
          this.pickerSym =
            this.kikanSYm.year() + '-' + this.kikanSYm.format('MM');
        }
        return (
          this.kikanSYm.format('YYYY') +
          '年' +
          this.kikanSYm.format('MM') +
          '月'
        );
      } else {
        if (!this.kikanEYm) {
          this.kikanEYm = dayjs().startOf('months');
          this.pickerEym =
            this.kikanEYm.year() + '-' + this.kikanEYm.format('MM');
        }
        return (
          this.kikanEYm.format('YYYY') +
          '年' +
          this.kikanEYm.format('MM') +
          '月'
        );
      }
    },
    inputCalendarClick(kbn) {
      if (kbn == 99) {
        this.pickerEym =
          this.kikanEYm.format('YYYY') +
          '-' +
          this.kikanEYm.format('MM') +
          '-' +
          this.kikanEYm.format('DD');
        this.datepickerEym_dialog = true;
      } else if (kbn == 90 || kbn == 91 || kbn == 92) {
        if (kbn == 91) {
          this.kikanSYm = this.kikanSYm.subtract(1, 'months');
        } else if (kbn == 92) {
          this.kikanSYm = this.kikanSYm.add(1, 'months');
        }
        this.pickerSym =
          this.kikanSYm.format('YYYY') +
          '-' +
          this.kikanSYm.format('MM') +
          '-' +
          this.kikanSYm.format('DD');
        if (kbn == 90) {
          this.datepickerSym_dialog = true;
        } else {
          this.viewdata = [];
        }
      } else {
        if (kbn == 1) {
          this.kikanYmd = this.kikanYmd.subtract(1, 'day');
        } else if (kbn == 2) {
          this.kikanYmd = this.kikanYmd.add(1, 'day');
        }
        this.pickerYmd =
          this.kikanYmd.format('YYYY') +
          '-' +
          this.kikanYmd.format('MM') +
          '-' +
          this.kikanYmd.format('DD');
        if (kbn == 0) {
          this.datepickerYmd_dialog = true;
        } else {
          this.viewdata = [];
        }
        let tmp =
          this.kikanYmd.format('YYYY') +
          '-' +
          this.kikanYmd.format('MM') +
          '-01';
        this.$refs.mdselect.setYm(tmp);
      }
    },
    dateSelect() {
      this.kikanYmd = dayjs(this.pickerYmd);
      this.datepickerYmd_dialog = false;
    },
    monthSelect(kbn) {
      if (kbn == 0) {
        this.kikanSYm = dayjs(this.pickerSym);
        this.$refs.mdselect.setYm(this.pickerSym);
        this.viewdata = [];
        this.datepickerSym_dialog = false;
      } else {
        this.kikanEYm = dayjs(this.pickerEym);
        this.viewdata = [];
        this.datepickerEym_dialog = false;
      }
    },
    setMd(param1) {
      //paramには日付と曜日(３と"金")が入る
      let split = this.pickerYmd.split('-');
      this.targetYmd =
        split[0] +
        split[1].padStart(2, '0') +
        String(param1.day).padStart(2, '0');
      this.kikanYmd = dayjs(this.targetYmd);
      this.setViewData(true);
    },
    dispclick(val) {
      this.selDispGridIndex = val;
      this.setViewData(true);
    },
    syukeiclick(val) {
      this.selSyukeiIndex = val;
      this.setViewData(true);
    },
    dispClicked(index) {
      this.dispIndex = index;
      if (this.dispIndex == 0) {
        this.drawer = true;
      } else {
        this.drawer = false;
      }
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#soudanCountUtiwake {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;

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

  .gridTitle {
    color: mediumblue;
    width: 500px;
    min-width: 100px;
    max-width: 500px;
    height: 25px;
    text-align: left;
    background: transparent;
    border: none;
    > span {
      color: $font_color;
      font-weight: bold;
    }
  }
  #soudanCountUtiwakeGrid,
  #sienNaiyouGridUtiwake {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 99%;
    min-width: 1250px;
    height: 77vh;
    background: $grid_background;
    z-index: 0;
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

    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
    .wj-cell {
      padding: 2px;
    }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
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
      height: 10px;
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

  #soudanCountUtiwakeGrid {
    .wj-header {
      background: $view_Title_background_Green_Dark;
    }
  }
  #sienNaiyouGridUtiwake {
    .wj-header {
      background: $view_Title_background_Orange_Dark;
    }
  }
  div.customCombobox {
    position: relative;
    // width: 300px !important;
    height: 20px !important;
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
      height: 18px !important;
      // padding: 0;
      span {
        // height: 21px !important;
        margin-top: 5px;
      }
      &.wj-form-control {
        position: absolute;
        top: -6px;
        width: 100%;
      }
    }
    input {
      height: 20px !important;
    }
  }
}
// .v-picker {
//   z-index: 10;
// }
.v-picker__title {
  display: none !important;
}
#soudanCountUtiwakeDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 150px;
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
#soudanCountUtiwakeDatepickerS {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 100px;
  width: 300px;
  max-width: 300px;
}
#soudanCountUtiwakeDatepickerE {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 270px;
  width: 300px;
  max-width: 300px;
}

.v-dialog {
  overflow: hidden;
  margin: 0;
}
</style>
