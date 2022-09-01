<template>
  <div id="uketukeCheckList">
    <v-container no-gutters fluid class="container ml-1 pa-0">
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile> 表示期間 </v-card>
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
            width="160px"
            height="100%"
            >{{ getYmd(0) }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <v-card class="rirekikoumokuTitleMini ml-1 pa-1" outlined tile>
          ～
        </v-card>
        <v-card
          class="ml-1"
          color="transparent"
          height="100%"
          style="border: none"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(1)"
            tile
            outlined
            width="160px"
            height="100%"
            >{{ getYmd(1) }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-card>
        <v-btn class="itemBtn ml-1" @click="inputCalendarClick(2)">
          月指定
        </v-btn>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 詳細表示 </v-card>
        <v-btn-toggle class="flex-wrap ml-1" v-model="selSyousaiDispUmuIndex">
          <v-btn
            v-for="n in syousaiDispList"
            :key="n.val"
            small
            outlined
            @click="grdDispChangeclick()"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile v-if="false">
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 市区町村 </v-card>
        <wj-menu
          id="comboFiltersSikuchoson"
          class="customCombobox ml-1"
          :itemsSource="sikuchosonList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selSikuchoson"
          :itemClicked="onSikuchosonClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 担当者 </v-card>
        <wj-menu
          id="comboFiltersTantousya"
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
        <v-btn class="itemBtn ml-1" @click="searchclick()"> 検索 </v-btn>
        <v-btn
          class="itemBtn ml-1"
          style="width: 125px"
          @click="filterClrclick()"
        >
          フィルタクリア
        </v-btn>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1" style="position: relative">
        <v-card class="koumokuTitle pa-1" outlined tile> ソート </v-card>
        <v-btn-toggle class="flex-wrap ml-1" v-model="sort1Index" mandatory>
          <v-btn
            v-for="n in sort1List"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
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
            small
            color="secondary"
            dark
            outlined
            @click="sortClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>

        <v-card
          class="countTitle pa-1 ml-1"
          outlined
          tile
          style="position: absolute; left: 1150px"
        >
          相談件数:
          <span>{{ 0 }} </span>
          件
        </v-card>
        <v-card
          class="countTitle pa-1 ml-1"
          outlined
          tile
          style="position: absolute; left: 800px"
          v-if="false"
        >
          連絡調整: <span>{{ 0 }} </span>件
        </v-card>
      </v-row>
      <!-- いったん非表示 -->
      <v-row no-gutters class="rowStyleMini mt-1" v-if="false">
        <v-card
          class="koumokuTitleExp"
          color="transparent"
          height="100%"
          outlined
          tile
          @click="searchAddClicked"
        >
          <div class="float-left">
            <v-icon small color="red" v-if="!dispSearchAdd"> mdi-plus </v-icon>
            <v-icon small color="red" v-else> mdi-minus </v-icon>
            検索条件設定
          </div>
        </v-card>
      </v-row>
      <v-row no-gutters class="rowStyle mt-1" v-if="dispSearchAdd">
        <v-card class="koumokuTitle pa-1" outlined tile> 年齢 </v-card>
        <wj-menu
          id="comboFiltersAge"
          class="customCombobox ml-1"
          :itemsSource="ageList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selAge"
          :itemClicked="onAgeClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
          障害支援区分
        </v-card>
        <wj-menu
          id="comboFiltersShougaiSienKbn"
          class="customCombobox ml-1"
          :itemsSource="shougaiSienKbnList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selShougaiSienKbn"
          :itemClicked="onShougaiSienKbnClicked"
        >
        </wj-menu>
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 障害区分 </v-card>
        <wj-menu
          id="comboFiltersShougaiKbn"
          class="customCombobox ml-1"
          :itemsSource="shougaiKbnList"
          :initialized="initComboFilters"
          :isRequired="true"
          selectedValuePath="val"
          displayMemberPath="name"
          v-model="selShougaiKbn"
          :itemClicked="onShougaiKbnClicked"
        >
        </wj-menu>
        <v-btn class="itemBtn ml-1" @click="searchclick()"> 検索 </v-btn>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="icrnGrid"
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
          dataname: 'day',
          title: '対応日',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'time',
          title: '時間',
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
          dataname: 'age',
          title: '年\n齢',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'sex',
          title: '性\n別',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'sichoson',
          title: '市区\n町村',
          width: 70,
          align: 'left',
        },
        {
          dataname: 'syougaisienkbn',
          title: '障\n支\n区',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'syougaikbn1',
          title: '障害区分',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'syougaikbn2',
          title: '障害区分',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'syougaikbn3',
          title: '障害区分',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'setai',
          title: '世帯状況',
          width: 90,
          align: 'left',
        },
        {
          dataname: 'honnin',
          title: '本人状況',
          width: 90,
          align: 'left',
        },
        {
          dataname: 'nyuukyokbn',
          title: '入\n区',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'sinki',
          title: '新\n規',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'houhou',
          title: '方法',
          width: 40,
          align: 'left',
        },
        {
          dataname: 'kankei',
          title: '関係',
          width: 40,
          align: 'left',
        },
        {
          dataname: 'naiyou',
          title: '内容',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dataname: 'rank',
          title: 'ラ\nン\nク',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'syoyoujikan',
          title: '所\n要\n時',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'taiousya',
          title: '対応者',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.Tantousya,
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
      selAge: 0,
      selShougaiSienKbn: 0,
      selShougaiKbn: 0,
      selSyousaiDispUmuIndex: 0,
      viewDataAll: [],
      viewData: [],
      dispSearchAdd: false,
      filter: {},
    };
  },
  mounted() {
    this.setNonFilterCol();
  },
  methods: {
    setNonFilterCol() {
      // for (let i = 0; i < 2; i++) {
      //   var Nonefilter = this.filter.getColumnFilter(i);
      //   Nonefilter.filterType = 'None';
      // }
    },
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitialized: function (filter) {
      this.filter = filter;
    },
    onInitializeIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = false;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header * 3;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header / 2;
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
        if (colIndex == 2) {
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
          this.headerList[colIndex].title
        );

        flexGrid.columnHeaders.setCellData(1, colIndex, ' ');
      }

      flexGrid.endUpdate();
    },
    onFormatItemIcrn(flexGrid, e) {
      if (flexGrid.columns.length == 0) {
        return;
      }
      if (e.panel == flexGrid.columnHeaders && e.col == 0) {
        this.setNonFilterCol();
      }
      if (
        e.panel == flexGrid.columnHeaders &&
        e.panel.rows.length > 1 &&
        e.row == 0
      ) {
        e.cell.style.borderBottom = 'None';
      }
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.borderRight = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (this.selSyousaiDispUmuIndex == 1 && e.col == 16) {
          console.log(1);
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.naiyou) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(tmpitem.naiyouDetail) +
            '</div>';
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
      console.log(e);
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
        this.viewDataAll = this.loadData(false);
      }
      this.userFilter();
    },
    loadData() {
      let result = [];
      for (let i = 0; i < 100; i++) {
        let d = new Date('2020', Number('8') - 1, '01');
        if (i < 20 && i < 30) {
          d = new Date('2020', Number('8') - 1, '11');
        } else if (i < 30 && i < 40) {
          d = new Date('2020', Number('8') - 1, '21');
        } else {
          d = new Date('2020', Number('8') - 1, '31');
        }
        result.push({
          day: d,
          time: '10:00',
          name: '東経 ' + i + '太郎',
          age: 100,
          sex: '○○',
          sichoson: 'かすみがうら',
          syougaisienkbn: 'X',
          syougaikbn1: '知的',
          syougaikbn2: '精神',
          syougaikbn3: '視覚',
          setai: '家族と同居',
          honnin: '○○○○○○',
          nyuukyokbn: '基',
          sinki: '○',
          houhou: '来所',
          kankei: '本人',
          naiyou: '（初回問い合わせ）',
          naiyouDetail:
            'あいうえおあいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこかきくけこかきくけこ',
          rank: 'A',
          syoyoujikan: 'xxx',
          taiousya: '宇都宮',
        });
      }
      return result;
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
    selectCmb(s) {
      s.header = s.selectedItem.name;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
      return s.selectedValue;
    },
    onJigyoKbnClicked(s) {
      this.selJigyoKbn = this.selectCmb(s);
    },
    onInputClicked(s) {
      this.selJigyoKbn = this.selectCmb(s);
    },
    onSikuchosonClicked(s) {
      this.selJigyoKbn = this.selectCmb(s);
    },
    onTantousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    onAgeClicked(s) {
      this.selAge = this.selectCmb(s);
    },
    onShougaiSienKbnClicked(s) {
      this.selShougaiSienKbn = this.selectCmb(s);
    },
    onShougaiKbnClicked(s) {
      this.selShougaiKbn = this.selectCmb(s);
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
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  .leftArea {
    min-width: 275px;
    max-width: 275px;
    min-height: 450px;
    width: 275px;
    // border: thin solid;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuTitleExp {
    color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    border: none;
    background: white;
  }

  .koumokuTitleExp:after {
    content: '';
    width: 900px;
    flex-grow: 1;
    height: 1px; /* 線の太さ */
    background: gray; /* 線の色 */
    margin: 0 1em; /* 文字と線の余白 */
  }

  .koumokuData {
    color: $font_color;
    display: flex;
    align-items: center;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuData_read {
    color: $font_color;
    width: 150px;
    height: 100%;
    text-align: center;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuData_input {
    color: $font_color;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Input_background;
    padding-top: 2px;
    padding-left: 2px;
  }

  .koumokuData_c {
    width: 280px;
    text-align: center;
    background: $view_Data_Read_background;
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

  .rowStyle {
    height: 25px;
  }
  .rowStyleMini {
    height: 15px;
  }
  .rirekikoumokuTitleMini {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    text-align: center;
    background: $white;
    border: none;
  }
  .v-btn {
    font-size: 14px;
    background-color: $white;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100%;
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
  #icrnGrid {
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
    .wj-filter-on {
      color: blue;
      border-color: lightgray;
    }
  }
  #icrnGrid {
    height: 78vh;
    width: auto;
    max-width: 1330px;
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
  top: 70px;
  left: 750px;
}
#uketukeCheckListdatepicker1 {
  position: fixed !important;
  top: 70px;
  left: 400px;
}
#uketukeCheckListdatepicker2 {
  position: fixed !important;
  top: 70px;
  left: 600px;
}
</style>
