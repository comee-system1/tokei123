<template>
  <div id="soudanCount">
    <v-container class="pa-1" fluid style="min-height: 90vh">
      <v-navigation-drawer
        class="blue lighten-5"
        v-model="drawer"
        absolute
        left
        :width="90"
        :min-width="90"
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
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
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
      <v-row no-gutters class="rowStyle mb-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          対応者
        </v-card>
        <wj-menu
          id="comboFiltersTaiousya"
          class="customCombobox mr-1"
          :itemsSource="taiousyaList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selTaiousya"
          :itemClicked="onTaiousyaClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          入力区分
        </v-card>
        <wj-menu
          id="comboFiltersInput"
          class="customCombobox mr-1"
          :itemsSource="inputList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selInputKbn"
          :itemClicked="onInputClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          ランク
        </v-card>
        <wj-menu
          id="comboFiltersRank"
          class="customCombobox mr-1"
          :itemsSource="rankList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selRank"
          :itemClicked="onRankClicked"
        >
        </wj-menu>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <v-card class="gridTitle pa-0 ma-0" outlined tile>
          ■ 相談者状況
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
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog v-model="datepickerYmd_dialog" class="datepickerYmd_dialogs">
      <v-date-picker
        id="soudanCountDatepicker"
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
        id="soudanCountDatepickerS"
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
        id="soudanCountDatepickerE"
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
import MdSelect from '../components/MdSelect.vue';
import { getConnect } from '@connect/getConnect';
const STYLE_DEFAULT = '';
const BORDER_SOLID = '1px solid';
const V_RL = 'vertical-rl';
const NONE = 'none';
const PAD_TOP = '4px';
const ALI_LEFT = 'left';
// const ALI_CENTER = 'center';
const ALI_RIGHT = 'right';
const V_ALI_TOP = 'top';
const DISPLAY_TC = 'table-cell';
// const DAYJS_CON_CHAR = '-';

export default {
  components: { MdSelect },
  data() {
    return {
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
      selTaiousya: 0,
      selInputKbn: 0,
      selRank: 0,
      screenFlag: false,
      selectyoubi: {},
      jyoukyouViewAllList: [],
      naiyouViewAllList: [],
      jyoukyouViewList: [],
      naiyouViewList: [],
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
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.RowHigh;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.columnHeaders.rows[1].height = 130;
      flexGrid.rowHeaders.columns[0].width = 0;
      flexGrid.alternatingRowStep = 0;
      flexGrid.endUpdate();
      let tmp =
        this.kikanYmd.format('YYYY') + '-' + this.kikanYmd.format('MM') + '-01';
      this.$refs.mdselect.setYm(tmp);
    },
    createSoudanCountGridHeader(flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columns.length = 0;
      flexGrid.rowHeaders.columns[0].width = 70;
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
        col.width = 30;
        col.align = ALI_RIGHT;
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
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.RowHigh;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.columnHeaders.rows[1].height = 130;
      flexGrid.rowHeaders.columns[0].width = 0;
      flexGrid.alternatingRowStep = 0;
      flexGrid.endUpdate();
    },
    createsienNaiyouGridHeader(flexGrid) {
      // ヘッダの追加と設定
      flexGrid.columns.length = 0;
      flexGrid.rowHeaders.columns[0].width = 70;
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
        col.width = 30;
        col.align = ALI_RIGHT;
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
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
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
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        }
      } else if (e.panel == flexGrid.cells) {
        if (e.row == flexGrid.rows.length - 1) {
          e.cell.style.borderBottom = NONE;
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
    onRankClicked(s) {
      s.header = this.rankList[s.selectedIndex].name;
      this.selRank = s.selectedValue;
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
          pTaisyo: 1,
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
div#soudanCount {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  // min-width: 1266px !important;
  max-width: 1920px;
  width: auto;

  .gridTitle {
    color: mediumblue;
    width: 500px;
    min-width: 100px;
    max-width: 500px;
    height: 25px;
    text-align: left;
    background: transparent;
    border: none;
  }

  #soudanCountGrid,
  #sienNaiyouGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-height: 200px;
    background: $grid_background;
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
  #soudanCountGrid {
    .wj-header {
      background: $view_Title_background_Green_Dark;
    }
  }
  #sienNaiyouGrid {
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
#soudanCountDatepickerS {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 100px;
  width: 300px;
  max-width: 300px;
}
#soudanCountDatepickerE {
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
