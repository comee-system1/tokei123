<template>
  <div id="soudanCountUtiwake">
    <v-container class="mt-1 ml-1 pa-0" fluid>
      <v-row no-gutters class="rowStyle mt-0">
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
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile style="display: none">
          事業区分
        </v-card>
        <wj-menu
          id="comboFiltersJigyoKbn"
          class="customCombobox ml-1"
          :itemsSource="jigyoKbnList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selJigyoKbn"
          :itemClicked="onJigyoKbnClicked"
          style="display: none"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1" outlined tile> 入力区分 </v-card>
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 対応者 </v-card>
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 表示内容 </v-card>
        <v-btn-toggle class="flex-wrap ml-1" v-model="selDispIndex" mandatory>
          <v-btn
            v-for="n in dispList"
            :key="n.val"
            small
            outlined
            @click="dispclick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 集計内容 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          style="margin-right: 5px"
          v-model="selSyukeiIndex"
        >
          <v-btn
            v-for="n in syukeiList"
            :key="n.val"
            small
            outlined
            @click="syukeiclick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-btn class="searchBtn ml-1" @click="searchClicked"> 検索 </v-btn>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <MdSelect ref="mdselect" @dateSelect="setMd"></MdSelect>
        <div class="wrap ma-0 ml-1">
          <v-card class="gridTitle pa-0 ma-0" outlined tile>
            {{ title }}
            <span class="ml-3">{{ selectedYmdD }}</span>
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
            :itemsSource="soudanCountUtiwakeViewData"
          >
          </wj-flex-grid>
          <wj-flex-grid
            id="sienNaiyouGrid"
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
            :initialized="onInitializesienNaiyouGrid"
            :formatItem="onFormatItemsienNaiyou"
            :itemsSourceChanged="onItemsSourceChanged"
            :itemsSource="sienNaiyouViewData"
          >
          </wj-flex-grid>
        </div>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="soudanCountUtiwakeDatepicker"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import * as wjGrid from '@grapecity/wijmo.grid';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import { mstHouhou } from '@backend/api/MstHouhou';
import { mstKankei } from '@backend/api/MstKankei';
import MdSelect from '../components/MdSelect.vue';

const STYLE_DEFAULT = '';
const BORDER_SOLID = '1px solid';
const V_RL = 'vertical-rl';
const PAD_TOP = '4px';
const ALI_LEFT = 'left';
const ALI_CENTER = 'center';
const V_ALI_TOP = 'top';
const DISPLAY_TC = 'table-cell';
const MOMENT_CON_CHAR = '-';
const FIX_CON_CHAR = '-';
const STYLE_BLOCK = 'block';
const STYLE_NONE = 'none';
const GRID_ID = {
  Soudan: 'soudanCountUtiwakeGrid',
  Sien: 'sienNaiyouGrid',
};
const SOUDAN_COUNT_ROW_HEAD_ITEM = [
  {
    key: 'code',
    title: 'コード',
    align: ALI_CENTER,
    width: 70,
  },
  {
    key: 'name',
    title: '利用者名',
    align: ALI_LEFT,
    width: 120,
  },
];
const SIEN_NAIYOU_ROW_HEAD_ITEM = [
  {
    key: 'code',
    title: 'コード',
    align: ALI_CENTER,
    width: 70,
  },
  {
    key: 'name',
    title: '利用者名',
    align: ALI_LEFT,
    width: 120,
  },
  {
    key: 'total',
    title: '相談\n件数',
    align: ALI_CENTER,
    width: 50,
  },
];
const MST_KIND = {
  Sienkeizoku: { kbn: 1, kbntitle: '新規・継続区分', datanameFix: 'sinki' },
  Seibetu: { kbn: 2, kbntitle: '性別', datanameFix: 'seibetu' },
  Setai: { kbn: 3, kbntitle: '世帯状況', datanameFix: 'setai' },
  Honnin: { kbn: 4, kbntitle: '本人の状況', datanameFix: 'honnin' },
  Houhou: { kbn: 5, kbntitle: '支援方法', datanameFix: 'houhou' },
  Kankei: { kbn: 6, kbntitle: '相談者(本人との関係)', datanameFix: 'kankei' },
  Rank: { kbn: 7, kbntitle: 'ランク', datanameFix: 'rank' },
};

export default {
  components: { MdSelect },
  data() {
    return {
      selDispIndex: 0,
      dispList: [
        { val: 0, name: '相談者状況' },
        { val: 1, name: '支援内容' },
      ],
      selSyukeiIndex: 0,
      syukeiList: [
        { val: 0, name: '回数' },
        { val: 1, name: '人数' },
      ],
      jigyoKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '相談支援' },
        { val: 2, name: '計画相談' },
        { val: 3, name: '地域相談' },
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
      sinkiKeizokuList: [
        { val: 1, name: '新規相談' },
        { val: 2, name: '継続相談' },
        { val: 3, name: '契約前新規' },
        { val: 4, name: '契約前支援' },
      ],
      seibetuList: [
        { val: 1, name: '男性' },
        { val: 2, name: '女性' },
        { val: 3, name: 'その他' },
      ],
      setaiList: [
        { val: 1, name: '家族と同居' },
        { val: 2, name: '障害者世帯' },
        { val: 3, name: '一人暮らし' },
        { val: 4, name: '施設入所' },
        { val: 5, name: '病院入院' },
        { val: 6, name: 'その他' },
        { val: 7, name: '(未入力)' },
      ],
      honninList: [
        { val: 1, name: '自閉症' },
        { val: 2, name: 'アスペルガー症候群' },
        { val: 3, name: '広汎性発達障害' },
        { val: 4, name: '学習障害' },
        { val: 5, name: '不明' },
        { val: 6, name: '(未入力)' },
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
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      selJigyoKbn: 0,
      selTaiousya: 0,
      selInputKbn: 0,
      screenFlag: false,
      mstHouhouList: [],
      mstKankeiList: [],
      selectedYmd: {},
      selectedYmdD: '',
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
      if (this.selDispIndex == 0) {
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
      // 非同期処理を全て行ってからヘッダを作成しに行く
      Promise.all([
        mstHouhou().then((result) => {
          this.mstHouhouList = result;
        }),
        mstKankei().then((result) => {
          this.mstKankeiList = result;
        }),
      ]).then(() => {
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
        flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
        flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
        let headerList = this.getHeaderList();
        // ヘッダ文字列の設定
        for (let colIndex = 0; colIndex < headerList.length; colIndex++) {
          flexGrid.columns.insert(colIndex, new wjGrid.Column());
          let col = flexGrid.columns[colIndex];
          col.wordWrap = true;
          col.binding = headerList[colIndex].dataname;
          col.header = headerList[colIndex].title;
          col.width = headerList[colIndex].width;
          col.align = headerList[colIndex].align;
          col.allowMerging = true;
          col.multiLine = true;

          flexGrid.columnHeaders.setCellData(
            0,
            colIndex,
            headerList[colIndex].kbntitle
          );
        }
        flexGrid.columnFooters.setCellData(0, 1, '人数');
        flexGrid.endUpdate();
        this.$refs.mdselect.setYm(this.picker);
      });
    },
    getHeaderList() {
      let result = [];
      // 仮想行ヘッダの登録
      SOUDAN_COUNT_ROW_HEAD_ITEM.forEach(function (mst) {
        result.push({
          kbntitle: mst.title,
          title: mst.title,
          daicode: 0,
          chucode: 0,
          dataname: mst.key,
          align: mst.align,
          width: mst.width,
        });
      });
      let self = this;
      Object.keys(MST_KIND).forEach(function (key) {
        let tmpList = [];
        let mstobj = MST_KIND[key];
        if (mstobj.kbn == MST_KIND.Sienkeizoku.kbn) {
          tmpList = self.sinkiKeizokuList;
        } else if (mstobj.kbn == MST_KIND.Seibetu.kbn) {
          tmpList = self.seibetuList;
        } else if (mstobj.kbn == MST_KIND.Setai.kbn) {
          tmpList = self.setaiList;
        } else if (mstobj.kbn == MST_KIND.Honnin.kbn) {
          tmpList = self.honninList;
        } else if (mstobj.kbn == MST_KIND.Houhou.kbn) {
          tmpList = self.mstHouhouList;
        } else if (mstobj.kbn == MST_KIND.Kankei.kbn) {
          tmpList = self.mstKankeiList;
        } else if (mstobj.kbn == MST_KIND.Rank.kbn) {
          tmpList = self.rankList;
        }
        tmpList.forEach(function (mst) {
          let dataname = '';
          if (
            mstobj.kbn == MST_KIND.Houhou.kbn ||
            mstobj.kbn == MST_KIND.Kankei.kbn
          ) {
            dataname = mstobj.datanameFix + mst.id;
          } else {
            dataname = mstobj.datanameFix + mst.val;
          }
          result.push({
            kbn: mstobj.kbn,
            kbntitle: mstobj.kbntitle,
            id: mst.val,
            title: mst.name,
            dataname: mstobj.kbn + FIX_CON_CHAR + dataname,
            align: ALI_CENTER,
            width: 40,
          });
        });
      });
      return result.sort((a, b) => {
        if (a.kbn < b.kbn) {
          return -1;
        }
        if (a.kbn > b.kbn) {
          return 1;
        }
        if (a.id !== b.id) {
          return a.id - b.id;
        }
      });
    },
    onInitializesienNaiyouGrid(flexGrid) {
      // 非同期処理を全て行ってからヘッダを作成しに行く
      Promise.all([
        mstHouhou().then((result) => {
          this.mstHouhouList = result;
        }),
      ]).then(() => {
        flexGrid.beginUpdate();
        // ヘッダの追加と設定
        flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
        flexGrid.columnHeaders.rows[0].allowMerging = true;
        flexGrid.columnHeaders.rows[1].allowMerging = true;
        flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
        flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
        flexGrid.columnHeaders.rows[1].height = 130;
        flexGrid.alternatingRowStep = 0;
        flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
        flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
        flexGrid.frozenColumns = 2;
        let headerList = this.getSienNaiyouHeaderList();
        // ヘッダ文字列の設定
        for (let colIndex = 0; colIndex < headerList.length; colIndex++) {
          flexGrid.columns.insert(colIndex, new wjGrid.Column());
          let col = flexGrid.columns[colIndex];
          col.wordWrap = true;
          col.binding = headerList[colIndex].dataname;
          col.header = headerList[colIndex].title;
          col.width = headerList[colIndex].width;
          col.align = headerList[colIndex].align;
          col.allowMerging = true;
          col.multiLine = true;

          flexGrid.columnHeaders.setCellData(
            0,
            colIndex,
            headerList[colIndex].kbntitle
          );
        }
        flexGrid.columnFooters.setCellData(0, 1, '人数');
        flexGrid.endUpdate();
      });
    },
    getSienNaiyouHeaderList() {
      let result = [];
      // 仮想行ヘッダの登録
      SIEN_NAIYOU_ROW_HEAD_ITEM.forEach(function (mst) {
        result.push({
          kbntitle: mst.title,
          title: mst.title,
          daicode: 0,
          chucode: 0,
          dataname: mst.key,
          align: mst.align,
          width: mst.width,
        });
      });
      this.getSienMstData().forEach(function (mst) {
        result.push({
          kbntitle: mst.dainameD,
          title: mst.chunameD,
          dataname: mst.daicode + FIX_CON_CHAR + mst.chucode,
          daicode: mst.daicode,
          chucode: mst.chucode,
          align: ALI_CENTER,
          width: 40,
        });
      });
      return result.sort((a, b) => {
        if (a.daicode < b.daicode) {
          return -1;
        }
        if (a.daicode > b.daicode) {
          return 1;
        }
        if (a.chucode !== b.chucode) {
          return a.chucode - b.chucode;
        }
      });
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
        let kbn = e.panel.columns[e.col].binding.split(FIX_CON_CHAR)[0];
        let nextkbn = '-1';
        if (e.col < flexGrid.columns.length - 1) {
          nextkbn = e.panel.columns[e.col + 1].binding.split(FIX_CON_CHAR)[0];
          if (kbn != nextkbn) {
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
      // else if (e.panel == flexGrid.columnFooters) {
      //   e.cell.style.borderTop = BORDER_SOLID;
      // }
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
        let kbn = e.panel.columns[e.col].binding.split(FIX_CON_CHAR)[0];
        let nextkbn = '-1';
        if (e.col < flexGrid.columns.length - 1) {
          nextkbn = e.panel.columns[e.col + 1].binding.split(FIX_CON_CHAR)[0];
          if (kbn != nextkbn) {
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
        }
      } else if (e.panel == flexGrid.cells) {
        // if (e.row == flexGrid.rows.length - 1) {
        //   e.cell.style.borderBottom = NONE;
        // }
      }
      // else if (e.panel == flexGrid.columnFooters) {
      //   e.cell.style.borderTop = BORDER_SOLID;
      // }
    },
    onJigyoKbnClicked(s) {
      s.header = this.jigyoKbnList[s.selectedIndex].name;
      this.selJigyoKbn = s.selectedValue;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
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
      this.screenFlag = true;
      this.selectedYmd = null;
      if (isAll) {
        this.soudanCountUtiwakeViewDataAll =
          this.loadSoudanCountUtiwakeData(false);
        this.sienNaiyouViewDataAll = this.loadSienNaiyouData(false);
      }
      this.userFilterSoudanCountUtiwake();
      this.userFilterSienNaiyou();
      this.screenFlag = false;
    },
    loadSoudanCountUtiwakeData() {
      let tmpSoudanCountUtiwakeViewData = [];
      let count = 100;
      let tmpobj;
      let val = 0;
      let self = this;
      for (let i = 0; i < count; i++) {
        val = 0;
        tmpobj = {};
        tmpobj[SOUDAN_COUNT_ROW_HEAD_ITEM[0].key] =
          '1' + String(i).padStart(6, '0');
        tmpobj[SOUDAN_COUNT_ROW_HEAD_ITEM[1].key] = '東経 ' + i + '太郎';
        this.sinkiKeizokuList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Sienkeizoku) + mst.val] = val++;
        });
        this.seibetuList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Seibetu) + mst.val] = val++;
        });
        this.setaiList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Setai) + mst.val] = val++;
        });
        this.honninList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Honnin) + +mst.val] = val++;
        });
        this.mstHouhouList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Houhou) + mst.id] = val++;
        });
        this.mstKankeiList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Kankei) + mst.id] = val++;
        });
        this.rankList.forEach(function (mst) {
          tmpobj[self.getNameFix(MST_KIND.Rank) + mst.val] = val++;
        });

        tmpSoudanCountUtiwakeViewData.push(tmpobj);
      }
      return tmpSoudanCountUtiwakeViewData;
    },
    getNameFix(datatype) {
      return datatype.kbn + FIX_CON_CHAR + datatype.datanameFix;
    },
    loadSienNaiyouData() {
      let tmpSienNaiyouViewData = [];
      let tmpobj;
      let val = 0;
      let count = 100;
      let dataList = this.getSienMstData();
      for (let i = 0; i < count; i++) {
        val = 0;
        tmpobj = {};
        tmpobj[SIEN_NAIYOU_ROW_HEAD_ITEM[0].key] =
          '1' + String(i).padStart(6, '0');
        tmpobj[SIEN_NAIYOU_ROW_HEAD_ITEM[1].key] = '東経 ' + i + '太郎';
        tmpobj[SIEN_NAIYOU_ROW_HEAD_ITEM[2].key] = '999';
        dataList.forEach(function (mst) {
          tmpobj[mst.daicode + FIX_CON_CHAR + mst.chucode] = val++;
        });
        tmpSienNaiyouViewData.push(tmpobj);
      }
      return tmpSienNaiyouViewData;
    },
    getSienMstData() {
      let tmpviewdata = [];
      let userCount = 100;
      let daicode = 0;
      let dainame = '';
      let chucode = 0;
      let chuname = '';
      for (let i = 1; i < userCount; i++) {
        if (i == 1 || i == 10 || i == 15) {
          chucode = 0;
        }
        if (i < 10) {
          daicode = 1;
          chucode = chucode + 1;
          dainame = '支援内容';
          switch (chucode) {
            case 1:
              chuname = '福祉サービスの利用等に関する支援';
              break;
            case 2:
              chuname = '障害や症状の理解に関する支援';
              break;
            case 3:
              chuname = '健康・医療に関する支援';
              break;
            case 4:
              chuname = '不安の解消・情緒安定に関する支援';
              break;
            case 5:
              chuname = '保育・教育に関する支援';
              break;
            case 6:
              chuname = '家族関係・人間関係に関する支援';
              break;
            case 7:
              chuname = '家計・経済に関する支援';
              break;
            case 8:
              chuname = '生活技術に関する支援';
              break;
            case 9:
              chuname = 'その他' + chucode;
              break;
            default:
              chuname = 'その他' + chucode;
              break;
          }
        } else if (i < 15) {
          daicode = 2;
          chucode = chucode + 1;
          dainame = '機関対応';
          switch (chucode) {
            case 1:
              chuname = '各種機関へ連絡';
              break;
            default:
              chuname = 'その他' + chucode;
              break;
          }
        } else if (i < 20) {
          daicode = 3;
          chucode = chucode + 1;
          dainame = '申請代行';
          switch (chucode) {
            case 1:
              chuname = '事業所等との契約';
              break;
            case 2:
              chuname = '手帳等';
              break;
            case 3:
              chuname = 'ライフライン関係';
              break;
            default:
              chuname = 'その他' + chucode;
              break;
          }
        } else {
          break;
        }
        tmpviewdata.push({
          id: i,
          daicode: daicode,
          daicodeD: String(daicode).padStart(2, '0'),
          dainame: dainame,
          dainameD: dainame,
          chucode: chucode,
          chucodeD: String(chucode).padStart(2, '0'),
          chuname: chuname,
          chunameD: chuname,
        });
      }
      return tmpviewdata;
    },
    userFilterSoudanCountUtiwake() {
      let tmpSoudanCountUtiwakeViewData = [];
      tmpSoudanCountUtiwakeViewData =
        this.soudanCountUtiwakeViewDataAll.concat();
      // 絞込１
      if (this.selJigyoKbn > 0) {
        // 事業区分
        tmpSoudanCountUtiwakeViewData = tmpSoudanCountUtiwakeViewData.filter(
          (x) => x.jigyouKbn == this.selJigyoKbn
        );
      }
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
      // 絞込１
      if (this.selJigyoKbn > 0) {
        // 事業区分
        tmpSienNaiyouViewData = tmpSienNaiyouViewData.filter(
          (x) => x.jigyouKbn == this.selJigyoKbn
        );
      }
      if (this.selTaiousya > 0) {
        // 対応者
        tmpSienNaiyouViewData = tmpSienNaiyouViewData.filter(
          (x) => x.tanntouid == this.selTaiousya
        );
      }

      this.sienNaiyouViewData = tmpSienNaiyouViewData;
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = moment().set('date', 1);
        this.picker =
          this.kikanYm.year() + MOMENT_CON_CHAR + this.kikanYm.format('MM');
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
        MOMENT_CON_CHAR +
        this.kikanYm.format('MM') +
        MOMENT_CON_CHAR +
        this.kikanYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog = true;
      } else {
        this.soudanCountUtiwakeViewData = [];
      }
      this.selectedYmd = null;
      this.soudanCountUtiwakeViewData = [];
      this.sienNaiyouViewData = [];
      this.$refs.mdselect.setYm(this.picker);
    },
    monthSelect() {
      let split = this.picker.split(MOMENT_CON_CHAR);
      this.kikanYm = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.selectedYmd = null;
      this.soudanCountUtiwakeViewData = [];
      this.sienNaiyouViewData = [];
      this.datepicker_dialog = false;
      this.$refs.mdselect.setYm(this.picker);
    },
    dispclick(val) {
      if (val == 0) {
        document.getElementById(GRID_ID.Soudan).style.display = STYLE_BLOCK;
        document.getElementById(GRID_ID.Sien).style.display = STYLE_NONE;
      } else {
        document.getElementById(GRID_ID.Soudan).style.display = STYLE_NONE;
        document.getElementById(GRID_ID.Sien).style.display = STYLE_BLOCK;
      }
    },
    syukeiclick(val) {
      console.log(val);
    },
    setMd(param1) {
      //paramには日付と曜日(３と"金")が入る
      console.log(param1);
      this.setViewData(true);
      this.selectedYmd = param1;
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
  .rowStyle {
    height: 25px;
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

  .v-btn {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
  }

  .searchBtn {
    font-size: 14px;
    background: $btn_background;
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
  .countTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
    > span {
      color: red;
    }
  }
  .wrap {
    display: flex;
    flex-flow: column;
  }

  #soudanCountUtiwakeGrid,
  #sienNaiyouGrid {
    color: $font_color;
    font-size: $cell_fontsize;
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
  #soudanCountUtiwakeGrid,
  #sienNaiyouGrid {
    width: 1250px;
    min-width: 1250px;
    height: 74vh;
  }
  .v-btn-toggle > .v-btn {
    width: 100px;
    height: 25px;
  }
  div.customCombobox {
    position: relative;
    // width: 300px !important;
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
        top: -3px;
        width: 100%;
      }
    }
    input {
      height: 25px !important;
    }
  }
  a {
    &.addBtn {
      height: 25px;
      width: 100px;
      background: $btn_background;
      border: 1px solid $light-gray;
      display: block;
      float: left;
      color: $font_color !important;
      text-align: center;
      border-radius: 3px;
      padding: 1px 10px 0px 20px;
      cursor: pointer;
      background-image: url('../assets/plus_gray_15px.png');
      background-position: top 4px left 2px;
      background-repeat: no-repeat;
      &:hover {
        background-color: $light-gray;
      }
    }
  }
}
.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#soudanCountUtiwakeDatepicker {
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

.v-dialog {
  overflow: hidden;
  margin: 0;
}
</style>
