<template>
  <div id="uketukeIcrn">
    <v-container class="mt-1 ml-1 pa-0" fluid>
      <v-row no-gutters class="rowStyle mt-0">
        <v-card elevation="1">
          <a class="addBtn" @click="addClick">新規登録</a>
        </v-card>
      </v-row>
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile v-if="false">
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
          v-if="false"
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
        <v-card
          class="koumokuTitle pa-1 ml-1"
          outlined
          tile
          v-if="selKasanUmuIndex == 0"
        >
          ランク
        </v-card>
        <wj-menu
          id="comboFiltersRank"
          class="customCombobox ml-1"
          :itemsSource="rankList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selRank"
          :itemClicked="onRankClicked"
          v-if="selKasanUmuIndex == 0"
        >
        </wj-menu>
        <v-btn
          class="itemBtn ml-1"
          style="width: 125px"
          @click="filterClrclick()"
        >
          フィルタクリア
        </v-btn>
        <v-card class="countTitle pa-1 ml-1" outlined tile>
          実人数: <span>{{ viewdata.length }} </span>人
        </v-card>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1" v-if="false">
        <v-card class="koumokuTitle pa-1" outlined tile> 表示内容 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          style="margin-right: 5px"
          v-model="selKasanUmuIndex"
        >
          <v-btn
            v-for="n in kasanUmuList"
            :key="n.val"
            small
            outlined
            @click="kasanUmuclick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>

        <v-card
          class="koumokuTitle pa-1 ml-1"
          outlined
          tile
          v-if="selKasanUmuIndex == 1"
        >
          加算項目
        </v-card>
        <wj-menu
          id="comboFiltersKasan"
          class="customCombobox ml-1"
          :itemsSource="kasanList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selRank"
          :itemClicked="onKasanClicked"
          v-if="selKasanUmuIndex == 1"
        >
        </wj-menu>
        <v-card class="countTitle pa-1 ml-1" outlined tile>
          延件数:
          <span>{{ viewdata.length }} </span>
          件
        </v-card>
      </v-row>

      <v-row class="ma-0 mt-1" no-gutters>
        <MdSelect ref="mdselect" @dateSelect="setMd"></MdSelect>
        <wj-flex-grid
          id="uketukeIcrnGrid"
          class="ml-1"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializeUketukeIcrnGrid"
          :formatItem="onFormatItemUketukeIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
        >
          <wj-flex-grid-filter
            :initialized="filterInitialized"
            :filterApplied="filterApplied"
          />
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
        id="uketukeIcrnDatepicker"
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
    <v-dialog v-model="tourokuScreenFlag" width="1080" eager>
      <v-card no-gutters class="touroku_dialogs pb-1">
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="touroku_dialog_close()"
          class="closeButton"
          color="red"
        >
          <v-icon> mdi-close </v-icon>
        </v-btn>
        <UketukeTouroku
          :dispTab="'Kihonsoudan'"
          :selectViewData="viewObj"
          class="ml-1"
        ></UketukeTouroku>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import UketukeTouroku from '../components/UketukeTouroku.vue';
import MdSelect from '../components/MdSelect.vue';
import { uketukeIcrn } from '@backend/api/UketukeIcrn';
const GRD_ID = {
  Uketuke: 'uketukeIcrnGrid',
};
export default {
  components: { UketukeTouroku, MdSelect },
  data() {
    return {
      uketukeHeaderList: [
        {
          dataname: 'taiouYmd',
          title: '対応日',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'sTime',
          title: '開始\n時間',
          width: sysConst.GRD_COL_WIDTH.Time,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '利用者名',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'jigyouKbnD',
          title: '事業\n区分',
          width: 40,
          align: 'center',
        },
        { dataname: 'syokai', title: '新\n規', width: 30, align: 'center' },
        { dataname: 'kasanD', title: '加\n算', width: 30, align: 'center' },
        {
          dataname: 'sdnhourk',
          title: '支援\n方法',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'kankeiSoudansya',
          title: '関係\n相談者',
          width: 200,
          align: 'left',
        },
        {
          dataname: 'soudanKoumoku',
          title: '支援\n項目',
          width: 70,
          align: 'left',
        },
        {
          dataname: 'naiyo',
          title: '内容',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dataname: 'peer',
          title: 'ﾋﾟｱ\nｶｳﾝｾﾗｰ',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'ranknm',
          title: 'ラ\nン\nク',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'syoyo',
          title: '所要\n時間',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'kanD',
          title: '日\n誌',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'taiousya',
          title: '対応者',
          width: sysConst.GRD_COL_WIDTH.Tantousya,
          align: 'left',
        },
      ],
      uketukeKasanHeaderList: [
        { dataname: 'taiouYmd', title: '対応日', width: 120, align: 'center' },
        {
          dataname: 'sTime',
          title: '開始\n時間',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'eTime',
          title: '終了\n時間',
          width: 50,
          align: 'center',
        },
        { dataname: 'name', title: '利用者名', width: '*', align: 'left' },
        {
          dataname: 'jigyouKbnD',
          title: '事業\n区分',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'sienHouhou',
          title: '支援\n方法',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'kasanName',
          title: '加算項目',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'kikanmei',
          title: '機関名・場所\n委託先',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'taiousya2',
          title: '対応者氏名',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'naiyou',
          title: '内容',
          width: 310,
          align: 'left',
        },
        {
          dataname: 'nissi',
          title: '日\n誌',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'taiousya',
          title: '対応者',
          width: 70,
          align: 'left',
        },
      ],
      jigyoKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '相談支援' },
        { val: 2, name: '計画相談' },
        { val: 3, name: '地域相談' },
      ],
      taiousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '宇都宮' },
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
      rankList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: 'A' },
        { val: 2, name: 'B' },
        { val: 3, name: 'C' },
        { val: 4, name: 'D' },
      ],
      kasanList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '加算A' },
        { val: 2, name: '加算B' },
        { val: 3, name: '加算C' },
        { val: 4, name: '加算D' },
      ],
      kasanUmuList: [
        { val: 0, name: '全部' },
        { val: 1, name: '加算有り' },
      ],
      viewdataAll: [],
      viewdata: [],
      viewObj: {},
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      selJigyoKbn: 0,
      selTaiousya: 0,
      selInputKbn: 0,
      selRank: 0,
      selKasanUmuIndex: 0,
      screenFlag: false,
      tourokuScreenFlag: false,
      filter: {},
      targetYmd: '',
    };
  },

  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitialized: function (filter) {
      this.filter = filter;
    },
    onInitializeUketukeIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          this.tourokuScreenFlag = true;
          this.setDispdata(tmpitem);
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = false;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 3;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header / 2;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;
      flexGrid.endUpdate();
      this.$refs.mdselect.setYm(this.picker);
    },
    setDispdata(tmpitem) {
      this.viewObj = tmpitem;
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      let headerlist = this.uketukeHeaderList;
      if (this.selKasanUmuIndex == 1) {
        headerlist = this.uketukeKasanHeaderList;
      }
      flexGrid.columns.clear();
      let filtercols = [];
      for (let colIndex = 0; colIndex < headerlist.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = headerlist[colIndex].dataname;
        col.header = headerlist[colIndex].title;
        if (colIndex > 1) {
          filtercols.push(col.binding);
        }
        col.width = headerlist[colIndex].width;
        col.align = headerlist[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 2 || colIndex == 7) {
          col.allowResizing = true;
        } else {
          col.allowResizing = false;
        }
        if (colIndex == 0) {
          col.format = sysConst.FORMAT.Ymd;
        }
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          headerlist[colIndex].title
        );
        flexGrid.columnHeaders.setCellData(1, colIndex, ' ');
      }
      this.filter.filterColumns = filtercols;
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      this.grdAutoSizeRow(flexGrid);
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      if (flexGrid.hostElement.id == GRD_ID.Uketuke) {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      }
    },
    filterApplied(e) {
      this.grdAutoSizeRow(e.grid);
    },
    onFormatItemUketukeIcrn(flexGrid, e) {
      if (
        e.panel == flexGrid.columnHeaders &&
        e.panel.rows.length > 1 &&
        e.row == 0
      ) {
        e.cell.style.borderBottom = 'None';
      }
      if (e.panel == flexGrid.cells) {
        e.cell.style.backgroundColor = '';
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (this.selKasanUmuIndex == 0) {
          if (e.col == 6 || e.col == 7) {
            if (tmpitem.jigyouKbn == sysConst.JIGYOKBN.Renraku) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
            }
          }
        }
        if (e.col == 9) {
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.title) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
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
    onRankClicked(s) {
      s.header = this.rankList[s.selectedIndex].name;
      this.selRank = s.selectedValue;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
    },
    onKasanClicked(s) {
      s.header = this.kasanList[s.selectedIndex].name;
      this.selRank = s.selectedValue;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
    },
    addClick() {
      this.setDispdata(null);
      this.tourokuScreenFlag = true;
    },
    kasanUmuclick(e) {
      this.selKasanUmuIndex = e;
      this.setViewData(false);
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      if (isAll) {
        uketukeIcrn(this.targetYmd, this.targetYmd, 0).then((result) => {
          this.viewdataAll = result;
          this.userFilter();
          this.screenFlag = false;
        });
      } else {
        this.userFilter();
        this.screenFlag = false;
      }
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdataAll.concat();
      // 絞込１
      if (this.selJigyoKbn > 0) {
        // 事業区分
        tmpviewdata = tmpviewdata.filter(
          (x) => x.jigyouKbn == this.selJigyoKbn
        );
      }
      if (this.selTaiousya > 0) {
        // 対応者
        tmpviewdata = tmpviewdata.filter(
          (x) => x.tanntouid == this.selTaiousya
        );
      }
      if (this.selRank > 0) {
        // ランク
        tmpviewdata = tmpviewdata.filter((x) => x.rankid == this.selRank);
      }

      // //コード順でソート
      // if (this.sortSearch == 0) {
      //   tmpviewdata.sort((a, b) => {
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
      //   tmpviewdata.sort((a, b) => {
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
      //   tmpviewdata.sort((a, b) => {
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
      this.$refs.mdselect.setYm(this.picker);
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
      this.$refs.mdselect.setYm(this.picker);
      this.viewdata = [];
      this.datepicker_dialog = false;
    },
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },
    jigyoKbnclick(kbn) {
      console.log(kbn);
    },
    setMd(param1) {
      //paramには日付と曜日(３と"金")が入る
      let split = this.picker.split('-');
      this.targetYmd =
        split[0] +
        split[1].padStart(2, '0') +
        String(param1.day).padStart(2, '0');
      this.setViewData(true);
    },
    filterClrclick() {
      this.filter.clear();
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#uketukeIcrn {
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

  .ymd,
  .v-btn {
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

  .itemBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
    width: 75px;
  }
  #uketukeIcrnGrid {
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
      line-height: 110%;
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
    }
    ::-webkit-scrollbar-track {
      background: $light-gray;
      border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: $brawn;
      border-radius: 0px;
    }
    .wj-filter-on {
      color: blue;
      border-color: lightgray;
    }
  }

  #uketukeIcrnGrid {
    width: auto;
    // min-width: 1250px;
    height: 79vh;
    min-height: 500px;
  }
  .v-btn-toggle > .v-btn {
    width: 100px;
    height: 25px;
  }
  div.customCombobox {
    position: relative;
    width: 125px !important;
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
#uketukeIcrnDatepicker {
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

.touroku_dialogs {
  min-width: 1070px;
}
.v-btn--absolute.v-btn--top,
.v-btn--fixed.v-btn--top {
  z-index: 100;
  top: 0px;
  right: 5px;
  background-color: $white;
}
.v-dialog {
  overflow: hidden;
  margin: 0;
}
</style>
