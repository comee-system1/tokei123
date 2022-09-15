<template>
  <div id="soudanCount">
    <v-container class="mt-1 ml-1 pa-0" fluid>
      <v-row no-gutters class="rowStyle mt-0">
        <v-card class="koumokuTitle pa-1" outlined tile> 表示月 </v-card>
        <v-card
          class="ml-1"
          color="transparent"
          height="100%"
          style="border: none; margin-top: -1px"
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 事業区分 </v-card>
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
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 入力区分 </v-card>
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
        <v-btn class="searchBtn ml-1" @click="searchClicked"> 検索 </v-btn>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <MdSelect ref="mdselect" @dateSelect="setMd"></MdSelect>
        <div class="wrap ma-0 ml-1">
          <v-card class="gridTitle pa-0 ma-0" outlined tile>
            ■ 相談者状況
            <span class="ml-3">{{ getYmd }}</span>
          </v-card>
          <wj-flex-grid
            id="soudanCountGrid"
            :headersVisibility="'All'"
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
            :initialized="onInitializeSoudanCountGrid"
            :formatItem="onFormatItemSoudanCount"
            :itemsSourceChanging="onItemsSourceChanging"
            :itemsSourceChanged="onItemsSourceChanged"
            :itemsSource="jyoukyouViewList"
          >
          </wj-flex-grid>
          <v-card class="gridTitle pa-0 ma-0 mt-1" outlined tile>
            ■ 支援内容
          </v-card>
          <wj-flex-grid
            id="sienNaiyouGrid"
            :headersVisibility="'All'"
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
            :itemsSourceChanging="onItemsSourceChanging"
            :itemsSourceChanged="onItemsSourceChanged"
            :itemsSource="naiyouViewList"
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
        id="soudanCountDatepicker"
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
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import MdSelect from '../components/MdSelect.vue';
import { getConnect } from '@connect/getConnect';
const STYLE_DEFAULT = '';
const BORDER_SOLID = '1px solid';
const V_RL = 'vertical-rl';
const NONE = 'none';
const PAD_TOP = '4px';
const ALI_LEFT = 'left';
const ALI_CENTER = 'center';
const V_ALI_TOP = 'top';
const DISPLAY_TC = 'table-cell';
const DAYJS_CON_CHAR = '-';

export default {
  components: { MdSelect },
  data() {
    return {
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
        { val: 5, name: 'あいうえおかきくけこあいうえおかきくけこ' },
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
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      selJigyoKbn: 0,
      selTaiousya: 0,
      selInputKbn: 0,
      screenFlag: false,
      selectedYmd: '',
      targetSYm: '',
      selectyoubi: {},
      jyoukyouViewAllList: [],
      naiyouViewAllList: [],
      jyoukyouViewList: [],
      naiyouViewList: [],
    };
  },
  computed: {
    getYmd() {
      if (this.targetSYm == '') {
        return '';
      }
      return (
        this.kikanYm.format('YYYY') +
        '年' +
        this.kikanYm.format('M') +
        '月' +
        this.selectyoubi.day +
        '日' +
        '（' +
        this.selectyoubi.youbi +
        '曜日）'
      );
    },
  },
  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    onInitializeSoudanCountGrid(flexGrid) {
      flexGrid.beginUpdate();
      // // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.columnHeaders.rows[1].height = 130;
      flexGrid.alternatingRowStep = 0;
      flexGrid.endUpdate();
      this.$refs.mdselect.setYm(this.picker);
    },
    createSoudanCountGridHeader(flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columns.length = 0;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.jyoukyouViewAllList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = 'col' + colIndex;
        col.header = this.jyoukyouViewAllList[colIndex].title_list2;
        col.width = 50;
        col.align = ALI_CENTER;
        col.allowMerging = true;
        col.multiLine = true;
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.jyoukyouViewAllList[colIndex].title_list1
        );
      }
    },
    onInitializesienNaiyouGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.columnHeaders.rows[1].height = 130;
      flexGrid.alternatingRowStep = 0;
      flexGrid.endUpdate();
    },
    createsienNaiyouGridHeader(flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columns.length = 0;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.naiyouViewAllList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = 'col' + colIndex;
        col.header = this.naiyouViewAllList[colIndex].title_list2;
        col.width = 50;
        col.align = ALI_CENTER;
        col.allowMerging = true;
        col.multiLine = true;
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.naiyouViewAllList[colIndex].title_list1
        );
      }
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      if (flexGrid.hostElement.id == 'soudanCountGrid') {
        this.createSoudanCountGridHeader(flexGrid);
      } else {
        this.createsienNaiyouGridHeader(flexGrid);
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      if (flexGrid.hostElement.id == 'soudanCountGrid') {
        flexGrid.rowHeaders.setCellData(0, 0, '回数');
        flexGrid.rowHeaders.setCellData(1, 0, '人数');
      } else {
        flexGrid.rowHeaders.setCellData(0, 0, '件数');
        flexGrid.rowHeaders.setCellData(1, 0, '人数');
      }
    },
    onFormatItemSoudanCount(flexGrid, e) {
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
        let title_list1 = this.jyoukyouViewAllList[e.col].title_list1;
        let nexttitle_list1 = '';
        if (e.col < flexGrid.columns.length - 1) {
          nexttitle_list1 = this.jyoukyouViewAllList[e.col + 1].title_list1;
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
      } else if (e.panel == flexGrid.cells) {
        if (e.row == flexGrid.rows.length - 1) {
          e.cell.style.borderBottom = NONE;
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
        let title_list1 = this.naiyouViewAllList[e.col].title_list1;
        let nexttitle_list1 = '';
        if (e.col < flexGrid.columns.length - 1) {
          nexttitle_list1 = this.naiyouViewAllList[e.col + 1].title_list1;
          if (title_list1 != nexttitle_list1) {
            e.cell.style.borderRight = BORDER_SOLID;
          }
        }
      }

      if (e.panel == flexGrid.columnHeaders) {
        if (e.row == 0) {
          e.cell.style.borderRight = BORDER_SOLID;
          if (e.col == 1) {
            e.cell.style.writingMode = V_RL;
            e.cell.style.textAlign = ALI_LEFT;
            e.cell.style.justifyContent = ALI_LEFT;
            e.cell.style.alignItems = ALI_LEFT;
          }
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
        if (e.row == flexGrid.rows.length - 1) {
          e.cell.style.borderBottom = NONE;
        }
      }
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
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pSymd: this.targetSYm,
          pEymd: this.targetSYm,
        };
        getConnect('/SyukeiKensu', params, 'SIENT').then((result) => {
          this.jyoukyouViewAllList = result.filter((x) => x.kbn == 1);
          let tmplist = [{}, {}];
          for (let i = 0; i < this.jyoukyouViewAllList.length; i++) {
            tmplist[0]['col' + i] = this.jyoukyouViewAllList[i].kaisu_list;
            tmplist[1]['col' + i] = this.jyoukyouViewAllList[i].ninzu_list;
          }

          this.naiyouViewAllList = result.filter((x) => x.kbn == 2);
          let tmplist2 = [{}, {}];
          for (let i = 0; i < this.naiyouViewAllList.length; i++) {
            tmplist2[0]['col' + i] = this.naiyouViewAllList[i].kaisu_list;
            tmplist2[1]['col' + i] = this.naiyouViewAllList[i].ninzu_list;
          }
          this.jyoukyouViewList = tmplist;
          this.naiyouViewList = tmplist2;
          this.screenFlag = false;
        });
      }
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = dayjs().set('date', 1);
        this.picker =
          this.kikanYm.year() + DAYJS_CON_CHAR + this.kikanYm.format('MM');
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
        DAYJS_CON_CHAR +
        this.kikanYm.format('MM') +
        DAYJS_CON_CHAR +
        this.kikanYm.format('DD');
      if (kbn == 0) {
        this.datepicker_dialog = true;
      } else {
        this.jyoukyouViewAllList = [];
        this.jyoukyouViewList = [];
        this.naiyouViewAllList = [];
        this.naiyouViewList = [];
      }
      this.selectedYmd = null;
      this.$refs.mdselect.setYm(this.picker);
    },
    monthSelect() {
      this.kikanYm = dayjs(this.picker);
      this.selectedYmd = null;
      this.jyoukyouViewAllList = [];
      this.jyoukyouViewList = [];
      this.naiyouViewAllList = [];
      this.naiyouViewList = [];
      this.datepicker_dialog = false;
      this.$refs.mdselect.setYm(this.picker);
    },
    setMd(param1) {
      this.selectyoubi = param1;
      //paramには日付と曜日(３と"金")が入る
      let split = this.picker.split('-');
      this.targetSYm =
        split[0] +
        split[1].padStart(2, '0') +
        String(param1.day).padStart(2, '0');
      this.setViewData(true);
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#soudanCount {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .rowStyle {
    height: 20px;
  }

  .v-btn {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    min-height: 19px;
    height: 19px;
  }

  .searchBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    min-height: 19px;
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
  .wrap {
    display: flex;
    flex-flow: column;
  }

  #soudanCountGrid,
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
  #soudanCountGrid,
  #sienNaiyouGrid {
    width: 1250px;
    min-height: 200px;
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
.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#soudanCountDatepicker {
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
