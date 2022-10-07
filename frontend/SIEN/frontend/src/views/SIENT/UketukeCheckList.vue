<template>
  <div id="uketukeCheckList">
    <v-container no-gutters fluid class="container pa-1">
      <v-row no-gutters class="rowStyle">
        <v-card class="koumokuTitle titleMain pa-1" outlined tile>
          表示期間
        </v-card>
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
            width="160px"
            height="100%"
            class="btnymd"
            >{{ getYmd(0) }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <label class="ml-1 mr-1">～</label>
        <v-card
          class="btnymd ml-1"
          color="transparent"
          height="100%"
          style="border: none; margin-top: -1px"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(1)"
            tile
            outlined
            width="160px"
            height="100%"
            class="btnymd"
            >{{ getYmd(1) }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <v-btn class="ml-1" height="100%" @click="inputCalendarClick(2)">
          月指定
        </v-btn>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          入力区分
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selInputKbn"
          @change="onInputClicked"
          style="width: 150px"
        >
          <option v-for="val in inputList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          市区町村
        </v-card>
        <select
          class="customSelectBox wShort mr-1"
          v-model="selSikuchoson"
          @change="onSikuchosonClicked"
        >
          <option v-for="val in sikuchosonList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          担当者
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selTantousya"
          @change="onTantousyaClicked"
          style="width: 150px"
        >
          <option v-for="val in tantousyaList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-btn class="mr-1" height="100%" @click="searchclick()"> 検索 </v-btn>
        <v-btn class="mr-1" width="25" height="100%" @click="filterClrclick()">
          <v-icon small>mdi-filter-off</v-icon>
        </v-btn>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1" style="position: relative">
        <v-card class="koumokuTitle titleMain pa-1" outlined tile>
          ソート
        </v-card>
        <v-btn-toggle class="flex-wrap ml-1" v-model="sort1Index" mandatory>
          <v-btn
            v-for="n in sort1List"
            :key="n.val"
            color="secondary"
            dark
            outlined
            height="20"
            width="50"
            min-width="50"
            @click="sortClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="sort2Index"
          mandatory
          v-if="sort1Index == 1"
        >
          <v-btn
            v-for="n in sort2List"
            :key="n.val"
            color="secondary"
            dark
            outlined
            height="20"
            @click="sortClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-card
          class="koumokuTitle titleMain pa-1"
          style="position: absolute; left: 466px"
          outlined
          tile
        >
          詳細表示
        </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          style="position: absolute; left: 566px"
          v-model="selSyousaiDispUmuIndex"
        >
          <v-btn
            v-for="n in syousaiDispList"
            :key="n.val"
            height="20"
            outlined
            @click="grdDispChangeclick()"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-spacer></v-spacer>
        <v-card class="countTitle titleOrange pa-1" outlined tile>
          相談件数:
          <span>{{ 0 }} </span>
          件
        </v-card>
      </v-row>

      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="uketukeCheckListIcrnGrid"
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
          :initialized="onInitializeIcrnGrid"
          :formatItem="onFormatItemIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewData"
        >
          <wj-flex-grid-filter
            :initialized="filterInitialized"
            :filterApplied="filterApplied"
            :showFilterIcons="false"
          />
        </wj-flex-grid>
      </v-row>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="uketukeCheckListdatepicker1"
        v-model="pickersym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(0)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_eym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="uketukeCheckListdatepicker2"
        v-model="pickereym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(1)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepicker_dialog_month"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="uketukeCheckListdatepickermonth"
        type="month"
        v-model="pickermonth"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="calenderSelect(2)"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import { getConnect } from '../../../../connect/getConnect';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid black';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
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
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
      ],
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      syousaiDispList: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      sort1List: [
        { val: 0, name: '日時' },
        { val: 1, name: '利用者' },
      ],
      sort2List: [
        { val: 0, name: 'コード' },
        { val: 1, name: 'カナ' },
      ],
      ageList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '80歳' },
        { val: 2, name: '90歳' },
        { val: 3, name: '100歳' },
      ],
      shougaiSienKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '1' },
        { val: 2, name: '2' },
        { val: 3, name: '3' },
      ],
      shougaiKbnList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '知的' },
        { val: 2, name: '精神' },
        { val: 3, name: '視覚' },
      ],
      headerList: [
        {
          dataname: 'ymdD',
          title: '対応日',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'jikan',
          title: '時間',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          width: '4*',
          align: 'left',
        },
        {
          dataname: 'age',
          title: '年\n齢',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sexname',
          title: '性\n別',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sichoson',
          title: '市区\n町村',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'syougaisienkbn',
          title: '障\n支\n区',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syougaikbn1',
          title: '障害区分',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syougaikbn2',
          title: '障害区分',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syougaikbn3',
          title: '障害区分',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'setairk',
          title: '世帯状況',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'honninrk',
          title: '本人状況',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'sykkbnkigo',
          title: '入\n区',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sinki',
          title: '新\n規',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sdnhourk',
          title: '方法',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'sdnkanrk',
          title: '関係',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'naiyo',
          title: '内容',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dataname: 'ranknm',
          title: 'ラ\nン\nク',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'syoyo',
          title: '所\n要\n時',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sryaku',
          title: '対応者',
          kbntitle: '',
          width: '2*',
          align: 'left',
        },
      ],
      userListComponentDatas: [], // ユーザー一覧データ
      userInfo: {}, // ユーザ一覧から選択した値
      startymd: '',
      endymd: '',
      month: '',
      pickersym: '',
      pickereym: '',
      pickermonth: '',
      datepicker_dialog_sym: false,
      datepicker_dialog_eym: false,
      datepicker_dialog_month: false,
      selJigyoKbn: 0,
      selInputKbn: 0,
      selSikuchoson: 0,
      selTantousya: 0,
      sort1Index: 0,
      sort2Index: 0,
      selSyousaiDispUmuIndex: 0,
      viewDataAll: [],
      viewData: [],
      dispSearchAdd: false,
      filter: {},
    };
  },
  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitialized: function (filter) {
      this.filter = filter;
    },
    onInitializeIcrnGrid(flexGrid) {
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filter.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filter.showFilterIcons = false;
      });

      flexGrid.beginUpdate();

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 3;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.name = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.allowResizing = true;
        if (colIndex == 0) {
          col.format = sysConst.FORMAT.Ymd;
        }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].title
        );
      }

      flexGrid.endUpdate();
    },
    onFormatItemIcrn(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }

      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.borderRight = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (this.selSyousaiDispUmuIndex == 1 && e.col == 16) {
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.cskmknm) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
        if (e.col == 10) {
          if (tmpitem.setairk.length == 0) {
            e.cell.innerHTML = '<font color="red">※未入力</font>';
          }
        }
      }
      if (
        e.col == 0 ||
        e.col == 1 ||
        e.col == 6 ||
        (e.panel == flexGrid.columnHeaders && e.col == 7) ||
        e.col == 9 ||
        e.col == 11 ||
        e.col == 15
      ) {
        e.cell.style.borderRight = STYLE_BORDER_SOLID;
      }
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      this.grdAutoSizeRow(flexGrid);
    },
    filterApplied(e) {
      this.grdAutoSizeRow(e.grid);
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      if (this.selSyousaiDispUmuIndex == 1) {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      }
    },
    grdDispChangeclick() {
      this.setViewData(false);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pSymd: this.startymd.format('YYYYMMDD'),
          pEymd: this.endymd.format('YYYYMMDD'),
          Dspkbn: 0,
        };
        console.log(params);
        getConnect('/Uktk', params, 'SIENT').then((result) => {
          console.log(12345);
          console.log(result);
          this.viewDataAll = result;
          this.userFilter();
        });
      } else {
        this.userFilter();
      }
    },
    userFilter() {
      let tmpviewdata = this.viewDataAll.concat();
      // // 絞込１
      // if (this.selUser == 1) {
      //   // 今月入所
      //   tmpviewdata = tmpviewdata.filter((x) => x.isnyusho);
      // } else if (this.selUser == 2) {
      //   // 今月退所
      //   tmpviewdata = tmpviewdata.filter((x) => x.istaisyo);
      // }
      // // 絞込２
      // if (siborikomiSearch2 == 1) {
      //   // !x.koufuymdで空orNullを判定する
      //   tmpviewdata = tmpviewdata.filter(
      //     (x) =>
      //       !x.koufuymd ||
      //       !x.engo ||
      //       !x.jitibangou ||
      //       !x.jyukyukbn ||
      //       !x.jyukyuname ||
      //       !x.syougaisyu ||
      //       !x.syougaisienkbn ||
      //       !x.futanjyougen ||
      //       !x.jyougenkanri ||
      //       !x.syokujiteikyo ||
      //       !x.tokubetukyufu
      //   );
      // } else if (siborikomiSearch2 == 2) {
      //   tmpviewdata = tmpviewdata.concat();
      // }

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
      this.viewData = tmpviewdata;
    },
    getYmd(outputkbn) {
      if (outputkbn == 0) {
        if (!this.startymd) {
          this.startymd = dayjs().startOf('months');
        }
        return (
          this.startymd.format('YYYY') +
          '年' +
          this.startymd.format('MM') +
          '月' +
          this.startymd.format('DD') +
          '日'
        );
      } else {
        if (!this.endymd) {
          this.endymd = dayjs().endOf('months');
        }
        return (
          this.endymd.format('YYYY') +
          '年' +
          this.endymd.format('MM') +
          '月' +
          this.endymd.format('DD') +
          '日'
        );
      }
    },
    inputCalendarClick(kbn) {
      if (kbn == 0) {
        this.pickersym =
          this.startymd.format('YYYY') +
          '-' +
          this.startymd.format('MM') +
          '-' +
          this.startymd.format('DD');
        this.datepicker_dialog_sym = true;
      } else if (kbn == 1) {
        this.pickereym =
          this.endymd.format('YYYY') +
          '-' +
          this.endymd.format('MM') +
          '-' +
          this.endymd.format('DD');
        this.datepicker_dialog_eym = true;
      } else if (kbn == 2) {
        if (!this.month) {
          this.month = dayjs().startOf('months');
        }
        this.pickermonth =
          this.month.format('YYYY') +
          '-' +
          this.month.format('MM') +
          '-' +
          this.month.format('DD');
        this.datepicker_dialog_month = true;
      }
    },
    calenderSelect(kbn) {
      if (kbn == 0) {
        this.startymd = dayjs(this.pickersym);
        this.datepicker_dialog_sym = false;
      } else if (kbn == 1) {
        this.endymd = dayjs(this.pickereym);
        this.datepicker_dialog_eym = false;
      } else if (kbn == 2) {
        let tmp = dayjs(this.pickermonth);
        this.startymd = dayjs(tmp);
        this.endymd = dayjs(tmp.endOf('months'));
        this.datepicker_dialog_month = false;
      }
    },
    onInputClicked() {
      this.selInputKbn = this.inputList[this.selInputKbn].val;
    },
    onSikuchosonClicked() {
      this.selSikuchoson = this.sikuchosonList[this.selSikuchoson].val;
    },
    onTantousyaClicked() {
      this.selTantousya = this.tantousyaList[this.selTantousya].val;
    },

    sortClicked() {
      this.setViewData(false);
    },
    searchAddClicked() {
      this.dispSearchAdd = !this.dispSearchAdd;
      let f = document.activeElement;
      f.blur();
    },
    searchclick() {
      this.dispSearchAdd = false;
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
div#uketukeCheckList {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px;
  max-width: 1920px;
  width: auto;

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    min-height: 450px;
    width: 275px;
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

  #uketukeCheckListIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    height: 78vh;
    width: 100%;
    min-width: 1250px;
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
    .wj-filter-on {
      color: blue;
      border-color: lightgray;
    }
  }
}

#uketukeCheckListdatepickermonth,
#uketukeCheckListdatepicker1,
#uketukeCheckListdatepicker2 {
  position: absolute;
  margin-top: 40px;

  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }

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
#uketukeCheckListdatepickermonth {
  position: fixed !important;
  top: 20px;
  left: 450px;
}
#uketukeCheckListdatepicker1 {
  position: fixed !important;
  top: 20px;
  left: 100px;
}
#uketukeCheckListdatepicker2 {
  position: fixed !important;
  top: 20px;
  left: 300px;
}
</style>
