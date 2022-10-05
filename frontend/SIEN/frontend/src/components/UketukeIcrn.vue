<template>
  <div id="uketukeIcrn">
    <v-container class="pa-1" fluid>
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
            small
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
      <v-row no-gutters class="rowStyle mb-1 mt-0">
        <div style="width: 90px" v-show="drawer"></div>
        <v-card elevation="2">
          <a class="addBtn" @click="addClick">新規登録</a>
        </v-card>
      </v-row>
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
      <v-row no-gutters class="rowStyle mb-1">
        <v-card
          class="koumokuTitle titleMain pa-1 mr-1"
          width="100"
          outlined
          tile
        >
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
        <v-card
          class="koumokuTitle titleMain pa-1 mr-1"
          width="100"
          outlined
          tile
        >
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
        <v-card
          class="koumokuTitle titleMain pa-1 mr-1"
          width="100"
          outlined
          tile
        >
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

        <v-btn class="mr-1" width="25" height="20" @click="filterClrclick()">
          <v-icon small>mdi-filter-off</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-card class="countTitle pa-1 mr-3" outlined tile>
          実人数: <span>{{ viewdata.length }} </span>人
        </v-card>
      </v-row>
      <v-row class="ma-0" no-gutters>
        <wj-flex-grid
          id="uketukeIcrnGrid"
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
            :showFilterIcons="false"
          />
        </wj-flex-grid>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog v-model="datepickerYmd_dialog" class="datepickerYmd_dialogs">
      <v-date-picker
        id="uketukeIcrnDatepicker"
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
        id="uketukeIcrnDatepickerS"
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
        id="uketukeIcrnDatepickerE"
        type="month"
        v-model="pickerEym"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect(1)"
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
          :dispTab="inputRef"
          :selectViewData="viewObj"
          class="ml-1"
        ></UketukeTouroku>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import UketukeTouroku from '../components/UketukeTouroku.vue';
import MdSelect from '../components/MdSelect.vue';
import { getConnect } from '@connect/getConnect';
const GRD_ID = {
  Uketuke: 'uketukeIcrnGrid',
};
export default {
  components: { UketukeTouroku, MdSelect },
  data() {
    return {
      uketukeHeaderList: [
        {
          dataname: 'ymdD',
          title: '対応日',
          width: '1.5*',
          align: 'center',
        },
        {
          dataname: 'jikan',
          title: '開始\n時間',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'jigyouKbnD',
          title: '事業\n区分',
          width: '0.5*',
          align: 'center',
        },
        { dataname: 'syokai', title: '新\n規', width: '0.5*', align: 'center' },
        { dataname: 'kasanD', title: '加\n算', width: '0.5*', align: 'center' },
        {
          dataname: 'sdnhourk',
          title: '支援方法',
          width: '1.5*',
          align: 'left',
        },
        {
          dataname: 'sdnnam',
          title: '関係相談者',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'daicskmkrk',
          title: '支援項目',
          width: '2*',
          align: 'left',
        },
        {
          dataname: 'naiyo',
          title: '内容',
          width: '5*',
          align: 'left',
        },
        {
          dataname: 'peermark',
          title: 'ピ\nア',
          width: '0.5*',
          align: 'center',
        },
        {
          dataname: 'ranknm',
          title: 'ラ\nン\nク',
          width: '0.5*',
          align: 'center',
        },
        {
          dataname: 'syoyo',
          title: '所要\n時間',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'kanD',
          title: '日\n誌',
          width: '0.5*',
          align: 'center',
        },
        {
          dataname: 'taiousya',
          title: '対応者',
          width: '1*',
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
      viewdataAll: [],
      viewdata: [],
      viewObj: {},
      kikanYmd: '',
      kikanSYm: '',
      kikanEYm: '',
      pickerYmd: '',
      pickerSym: '',
      pickerEym: '',
      datepickerYmd_dialog: false,
      datepickerSym_dialog: false,
      datepickerEym_dialog: false,
      selTaiousya: 0,
      selInputKbn: 0,
      selRank: 0,
      screenFlag: false,
      tourokuScreenFlag: false,
      filter: {},
      targetYmd: '',
      targetSYm: '',
      targetEYm: '',
      drawer: true,
      dispIndex: 0,
      dispList: [
        { val: 0, name: '日指定' },
        { val: 1, name: '月指定' },
      ],
      inputRef: this.getDispKbn(),
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
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filter.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filter.showFilterIcons = false;
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 3;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.alternatingRowStep = 0;
      flexGrid.columns.clear();
      let filtercols = [];
      let headerlist = this.uketukeHeaderList;
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
      let tmp =
        this.kikanYmd.format('YYYY') + '-' + this.kikanYmd.format('MM') + '-01';
      this.$refs.mdselect.setYm(tmp);
    },
    setDispdata(tmpitem) {
      this.viewObj = tmpitem;
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
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
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col < 3) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        } else if (e.col < 7) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        }
      }
      if (e.panel == flexGrid.cells) {
        e.cell.style.backgroundColor = '';
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.col == 6 || e.col == 7) {
          if (tmpitem.jigyouKbn == sysConst.JIGYOKBN.Renraku) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          }
        }
        if (e.col == 9) {
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.cskmknm) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
      }
      e.cell.style.borderRight = '';
      if (e.col == 2 || e.col == 6) {
        e.cell.style.borderRight = '1px solid';
      }
    },
    dispClicked(index) {
      this.dispIndex = index;
      if (this.dispIndex == 0) {
        this.drawer = true;
      } else {
        this.drawer = false;
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
    getDispKbn() {
      this.inputRef = 'Kihonsoudan';
      var urlparam = location.search.substring(1);
      if (urlparam == 'ref=Keikakusoudan') {
        this.inputRef = 'Keikakusoudan';
      }
      return this.inputRef;
    },
    addClick() {
      this.setDispdata(null);

      this.tourokuScreenFlag = true;
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pSymd: this.targetYmd,
          pEymd: this.targetYmd,
          Dspkbn: 0,
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
        console.log(params);
        getConnect('/Uktk', params, 'SIENT').then((result) => {
          console.log(12345);
          console.log(result);
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
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },
    jigyoKbnclick(kbn) {
      console.log(kbn);
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
  // width: auto;

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
    background: $view_Hosoku_background;
    border: none;
    > span {
      color: red;
    }
  }

  #uketukeIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 99%;
    min-width: 1050px !important;
    height: 76vh;
    background: $grid_background;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      background: $view_Data_Input_background;
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

  div.customCombobox {
    position: relative;
    width: 125px !important;
    height: 18px !important;
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
        margin-top: 6px;
      }
      &.wj-form-control {
        position: absolute;
        top: -5px;
        width: 100%;
      }
    }
    input {
      height: 16px !important;
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
#uketukeIcrnDatepickerS {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 100px;
  width: 300px;
  max-width: 300px;
}
#uketukeIcrnDatepickerE {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 270px;
  width: 300px;
  max-width: 300px;
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
