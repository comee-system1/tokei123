<template>
  <div id="soudanCountMonthly">
    <v-container class="pa-1" fluid>
      <v-row no-gutters class="rowStyle mb-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          表示単位
        </v-card>
        <v-card
          class="mr-1"
          color="transparent"
          height="100%"
          style="border: none"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick()"
            class="btnymd mr-1"
            tile
            outlined
            width="125px"
            height="100%"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>

          <v-btn class="ml-1 pa-1" height="18" @click="searchClicked()">
            <v-icon dense>mdi-magnify</v-icon>
            検索
          </v-btn>
        </v-card>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          入力区分
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selInputKbn"
          @change="onInputClicked"
        >
          <option v-for="val in inputList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          対応者
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selTaiousya"
          @change="onTaiousyaClicked"
        >
          <option v-for="val in taiousyaList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          表示内容
        </v-card>
        <v-btn-toggle
          class="flex-wrap mr-1"
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
          class="koumokuTitle titleMain pa-1 mr-1"
          width="100"
          outlined
          tile
        >
          集計内容
        </v-card>
        <v-btn-toggle class="flex-wrap mr-1" v-model="selSyukeiIndex">
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
          id="soudanCountMonthlyGrid"
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
          :initialized="onInitializeSoudanCountMonthlyGrid"
          :formatItem="onFormatItemSoudanCountMonthly"
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
    <v-dialog
      v-model="datepickerSym_dialog"
      width="200"
      class="datepickerSym_dialogs"
    >
      <v-date-picker
        id="soudanCountMonthlyDatepickerS"
        type="month"
        v-model="pickerSym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect(0)"
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
  Soudan: 'soudanCountMonthlyGrid',
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
  components: {},
  data() {
    return {
      selDispGridIndex: 0,
      dispGridList: [
        { val: 0, name: '相談者状況' },
        { val: 1, name: '支援内容' },
      ],
      selSyukeiIndex: 0,
      syukeiList: [
        { val: 0, name: '件数' },
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
      soudanCountMonthlyViewDataAll: [],
      soudanCountMonthlyViewData: [],
      sienNaiyouViewDataAll: [],
      sienNaiyouViewData: [],
      viewObj: {},
      userObj: {},
      selTaiousya: 0,
      selInputKbn: 0,
      screenFlag: false,
      headerList: [],
      viewKiasuList: [],
      viewNinzuList: [],
      viewJyoukyouList: [],
      viewNaiyouList: [],
      kikanSYm: '',
      pickerSym: '',
      datepickerSym_dialog: false,
      targetSYm: dayjs().format('YYYYMMDD'),
    };
  },
  computed: {
    title() {
      let option = '';
      if (this.selSyukeiIndex == 0) {
        option = ' （件数）';
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
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      document.getElementById(GRID_ID.Sien).style.display = STYLE_NONE;
      window.addEventListener('resize', this.calculateWindowHeight);
      this.calculateWindowHeight();
      alert(location.hostname);
    });
    this.setPrintEvent();
    // 初期データ読込
    this.setViewData(true);
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById(GRID_ID.Soudan) != null) {
        document.getElementById(GRID_ID.Soudan).style.height =
          window.innerHeight - 160 + 'px';
        document.getElementById(GRID_ID.Sien).style.height =
          window.innerHeight - 160 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    onInitializeSoudanCountMonthlyGrid(flexGrid) {
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
      if (flexGrid.hostElement.id == 'soudanCountMonthlyGrid') {
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
          col.binding = 'date';
          col.align = ALI_CENTER;
          col.width = 70;
        } else if (colIndex == 1) {
          col.binding = 'youbi';
          col.width = 150;
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
          col.binding = 'date';
          col.align = ALI_CENTER;
          col.width = 70;
        } else if (colIndex == 1) {
          col.binding = 'youbi';
          col.width = 150;
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
    onFormatItemSoudanCountMonthly(flexGrid, e) {
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
    onTaiousyaClicked() {
      this.selTaiousya = this.taiousyaList[this.selTaiousya].val;
    },
    onInputClicked() {
      this.selInputKbn = this.inputList[this.selInputKbn].val;
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
          pTaisyo: this.selDispGridIndex == 0 ? 1 : 2,
          pSymd: this.targetYmd,
          pEymd: this.targetYmd,
          pSiid: 0,
          pChiku: 0,
          pHostName: 'cl021',
        };
        let split = this.pickerSym.split('-');
        this.targetSYm = split[0] + split[1].padStart(2, '0') + '01';
        params.pSymd = this.targetSYm;
        this.screenFlag = true;
        getConnect('/SyukeiMonth', params, 'SIENT').then((result) => {
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
    userFilterSoudanCountMonthly() {
      let tmpSoudanCountMonthlyViewData = [];
      tmpSoudanCountMonthlyViewData =
        this.soudanCountMonthlyViewDataAll.concat();

      if (this.selTaiousya > 0) {
        // 対応者
        tmpSoudanCountMonthlyViewData = tmpSoudanCountMonthlyViewData.filter(
          (x) => x.tanntouid == this.selTaiousya
        );
      }

      // //コード順でソート
      // if (this.sortSearch == 0) {
      //   tmpSoudanCountMonthlyViewData.sort((a, b) => {
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
      //   tmpSoudanCountMonthlyViewData.sort((a, b) => {
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
      //   tmpSoudanCountMonthlyViewData.sort((a, b) => {
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
      this.soudanCountMonthlyViewData = tmpSoudanCountMonthlyViewData;
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
    getYm() {
      if (!this.kikanSYm) {
        this.kikanSYm = dayjs().startOf('months');
        this.pickerSym =
          this.kikanSYm.year() + '-' + this.kikanSYm.format('MM');
      }
      return (
        this.kikanSYm.format('YYYY') + '年' + this.kikanSYm.format('MM') + '月'
      );
    },
    inputCalendarClick() {
      this.pickerSym =
        this.kikanSYm.format('YYYY') +
        '-' +
        this.kikanSYm.format('MM') +
        '-' +
        this.kikanSYm.format('DD');
      this.datepickerSym_dialog = true;
    },
    monthSelect() {
      this.kikanSYm = dayjs(this.pickerSym);
      this.viewdata = [];
      this.datepickerSym_dialog = false;
    },
    dispclick(val) {
      this.selDispGridIndex = val;
      this.setViewData(true);
    },
    syukeiclick(val) {
      this.selSyukeiIndex = val;
      this.setViewData(true);
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#soudanCountMonthly {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  min-height: 500px;
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
    color: $font_color_saturday;
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
  #soudanCountMonthlyGrid,
  #sienNaiyouGridUtiwake {
    color: $font_color;
    width: 100%;
    min-width: 1250px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    z-index: 0;
    font-size: $cell_fontsize;
    min-height: 450px;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;

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

  #soudanCountMonthlyGrid {
    .wj-header {
      background: $view_Title_background_Green_Dark;
    }
  }
  #sienNaiyouGridUtiwake {
    .wj-header {
      background: $view_Title_background_Orange_Dark;
    }
  }
}
// .v-picker {
//   z-index: 10;
// }
.v-picker__title {
  display: none !important;
}
#soudanCountMonthlyDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 70px;
  left: 200px;
  width: 300px;
  max-width: 300px;
}
#soudanCountMonthlyDatepickerS {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 70px;
  left: 200px;
  width: 300px;
  max-width: 300px;
}
#soudanCountMonthlyDatepickerE {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 70px;
  left: 350px;
  width: 300px;
  max-width: 300px;
}

.v-dialog {
  overflow: hidden;
  margin: 0;
}
</style>
