<template>
  <div id="kojinRireki">
    <v-container no-gutters fluid class="container mt-1 pa-0">
      <v-row no-gutters>
        <v-col class="leftArea ml-1">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            :dispAddDaicho="false"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
            style="height: 100%"
          >
          </user-list>
        </v-col>
        <v-col class="centerArea ml-2">
          <!-- 中央エリア -->
          <v-container no-gutters fluid class="container pa-0">
            <v-row no-gutters class="rowStyle_Dark pa-1 pl-0">
              <v-row no-gutters class="rowStyle" style="position: relative">
                <v-card
                  class="koumokuTitle titleBlueDark pa-1 mr-1 ml-1"
                  outlined
                  tile
                >
                  利用者名
                </v-card>
                <v-card
                  class="koumokuData mr-1 pb-1 pl-1 pt-0"
                  tile
                  outlined
                  width="200"
                  style="border: 1px solid; border-color: #0000aa"
                >
                  {{ userInfo.names }}
                </v-card>
              </v-row>
            </v-row>

            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle titleMain pa-1 ml-1" outlined tile>
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
                  class="btnymd pa-0"
                  >{{ getYmd(0) }}
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-btn>
              </v-card>
              <label class="mr-1">～</label>
              <v-card
                class="mr-1"
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
                  class="btnymd pa-0"
                  >{{ getYmd(1) }}
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-btn>
              </v-card>
              <v-btn
                class="itemBtn mr-1"
                height="20"
                @click="inputCalendarClick(2)"
              >
                月指定
              </v-btn>
              <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
                詳細表示
              </v-card>
              <v-btn-toggle
                class="flex-wrap mr-1"
                v-model="selSyousaiDispUmuIndex"
              >
                <v-btn
                  v-for="n in syousaiDispList"
                  :key="n.val"
                  outlined
                  height="20"
                  width="35"
                  min-width="35"
                  @click="grdDispChangeclick(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-row>
            <v-row no-gutters class="rowStyle mt-1 ml-1">
              <v-card class="koumokuTitle titleMain pa-1" outlined tile>
                表示内容
              </v-card>
              <v-btn-toggle class="flex-wrap ml-1" v-model="selDispNaiyouIndex">
                <v-btn
                  v-for="n in dispNaiyouList"
                  :key="n.val"
                  outlined
                  height="20"
                  :width="n.width"
                  :min-width="n.width"
                  @click="grdNaiyouclick(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
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
                  :showFilterIcons="false"
                />
              </wj-flex-grid>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="datepicker_dialog_sym"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="kojinRirekidatepicker1"
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
        id="kojinRirekidatepicker2"
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
        id="kojinRirekidatepickermonth"
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
import UserList from '../../components/UserList.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import { getConnect } from '../../../../connect/getConnect';
// const STR_MARU = '○';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid black';
// const GRD_FROZEN_ROW = 1;
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UserList,
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
      syousaiDispList: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      sienkoumokuUmuList: [
        { val: 0, name: '無し' },
        { val: 1, name: '有り' },
      ],
      headerList: [
        {
          dataname: 'ymdD',
          title: '日付',
          chutitle: '',
          kbntitle: '',
          width: '3*',
          align: 'center',
        },
        {
          dataname: 'kojin_naiiyou',
          title: '内容',
          chutitle: '',
          kbntitle: '計画作成',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'keikakusakusei',
          title: '様\n式',
          chutitle: '',
          kbntitle: '計画作成',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'P_tantousyakaigi',
          title: '担\n会\n議',
          chutitle: '',
          kbntitle: '計画作成',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jyukyukoufu',
          title: '障\n害\n者',
          chutitle: '',
          kbntitle: '受給者証',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jyukyukoufu',
          title: '障\n害\n児',
          chutitle: '',
          kbntitle: '受給者証',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jyukyukoufu',
          title: '地\n域\n相',
          chutitle: '',
          kbntitle: '受給者証',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jissi',
          title: '予定\n月',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '1.5*',
          align: 'center',
        },
        {
          dataname: 'jissi',
          title: '終\n期\n月',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'kbn',
          title: '区分',
          chutitle: '中止・延期',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'kbn',
          title: '理由',
          chutitle: '中止・延期',
          kbntitle: 'モニタリング',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'jikaiyotei',
          title: '実\n施',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jikaiyotei',
          title: '週\n間',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jikaiyotei',
          title: '変\n更',
          chutitle: '案',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'jikaiyotei',
          title: '更\n新',
          chutitle: '案',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'M_tantousyakaigi',
          title: '担\n会\n議',
          chutitle: '',
          kbntitle: 'モニタリング',
          width: '1*',
          align: 'center',
        },
        {
          dataname: 'sdnhourk',
          title: '方法',
          chutitle: '',
          kbntitle: '支援内容',
          width: '1.5*',
          align: 'left',
        },
        {
          dataname: 'naiyo',
          title: '内容',
          chutitle: '',
          kbntitle: '支援内容',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dataname: 'kasankoumoku',
          title: '加算項目',
          chutitle: '',
          kbntitle: '',
          width: '3*',
          align: 'left',
        },
        {
          dataname: 'tanto',
          title: '担当者',
          chutitle: '',
          kbntitle: '',
          width: '1.5*',
          align: 'left',
        },
      ],
      sienKoumokuHeaderList: [
        {
          dataname: 'dainame',
          title: '支援項目',
          width: 100,
          align: 'left',
        },
        {
          dataname: 'chuname',
          title: '支援項目',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'select',
          title: '選',
          width: 40,
          align: 'center',
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
      selSyousaiDispUmuIndex: 0,
      selSienkoumokuUmuIndex: 0,
      selDispNaiyouIndex: 0,
      dispNaiyouList: [
        { val: 0, name: '全部', width: 40 },
        { val: 1, name: '計画作成', width: 70 },
        { val: 2, name: 'モニタリング', width: 100 },
        { val: 3, name: '支援内容', width: 70 },
      ],
      viewDataAll: [],
      viewData: [],
      filter: {},
    };
  },
  created: function () {
    // 初期ユーザ検索
  },
  watch: {
    selectedData() {
      // ここでユーザ検索処理する
    },
  },
  methods: {
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
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerList[colIndex].dataname;
        col.header = this.headerList[colIndex].title;
        col.width = this.headerList[colIndex].width;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 4 || colIndex == 7) {
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
          !this.headerList[colIndex].kbntitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          !this.headerList[colIndex].chutitle
            ? this.headerList[colIndex].title
            : this.headerList[colIndex].chutitle
        );
        flexGrid.columnHeaders.setCellData(
          2,
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
      // if (
      //   e.panel == flexGrid.columnHeaders &&
      //   ((e.row == 0 && e.col == 0) ||
      //     (e.row == 0 && e.col == 1) ||
      //     (e.row == 0 && e.col == 4) ||
      //     (e.row == 0 && e.col == 5) ||
      //     (e.row == 0 && e.col == 31))
      // ) {
      //   e.cell.style.borderBottom = 'None';
      // }
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.borderRight = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (this.selSyousaiDispUmuIndex == 1 && e.col == 3) {
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.cskmknm) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
        if (e.row < flexGrid.rows.length - 1) {
          let tmpitempre = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.ymd.substring(0, 6) != tmpitempre.ymd.substring(0, 6)) {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          }
        }
        if (
          e.col == 0 ||
          e.col == 3 ||
          e.col == 6 ||
          e.col == 15 ||
          e.col == 17
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
      } else {
        if (e.col < 1) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        } else if (e.col < 7) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else if (e.col < 16) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        } else {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        }
        if (
          (e.row == 0 && e.col == 0) ||
          (e.row == 0 && e.col == 1) ||
          (e.row == 0 && e.col == 4) ||
          (e.row == 0 && e.col == 7) ||
          (e.row == 0 && e.col == 16) ||
          (e.row == 1 && e.col == 3) ||
          (e.row == 1 && e.col == 6) ||
          (e.row == 1 && e.col == 15) ||
          (e.row == 1 && e.col == 17)
        ) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
        // if (e.col == 1 || e.col == 3 || e.col == 5 || e.col == 9) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // } else if (e.row == 0 && (e.col == 2 || e.col == 6)) {
        //   e.cell.style.borderRight = STYLE_BORDER_SOLID;
        // }
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
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    grdDispChangeclick(kbn) {
      console.log(kbn);
      this.selSyousaiDispUmuIndex = kbn;
      this.setViewData(false);
    },
    grdNaiyouclick(kbn) {
      this.selDispNaiyouIndex = kbn;
      console.log(kbn);
      this.setViewData(false);
    },
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userInfo = row;
      this.setViewData(true);
    },
    setViewData(isAll) {
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 123,
          pJigyoid: 43,
          pIntcode: this.userInfo.riid,
          pSrhym: this.startymd.format('YYYYMMDD'),
        };
        // pErhym: this.endymd.format('YYYYMMDD'), console.log(params);
        getConnect('/Kojinrireki', params, 'SIENT').then((result) => {
          console.log(12345);
          console.log(result);
          this.viewDataAll = result;
          this.userFilter();
          this.screenFlag = false;
        });
      } else {
        this.userFilter();
      }
    },
    loadData() {
      let result = [];
      for (let i = 0; i < 100; i++) {
        let d = new Date('2020', Number('9') - 1, '26');
        if (i < 20 && i < 30) {
          d = new Date('2020', Number('10') - 1, '26');
        } else if (i < 30 && i < 40) {
          d = new Date('2020', Number('11') - 1, '26');
        } else {
          d = new Date('2020', Number('12') - 1, '26');
        }
        result.push({
          day: d,
          jigyokbn: 0,
          jigyokbnD: '基',
          houhou: '電話',
          naiyou: '（初回問い合わせ）',
          naiyouDetail:
            'あいうえおあいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこかきくけこかきくけこ',
          kasankoumoku: '入院時情報連携加算',
          tantousya: '担当者A',
          keiyakuteiketu: '●',
          keikakusakusei: '計画書作成',
          P_tantousyakaigi: '●',
          jyukyukoufu: '者',
          jissi: '●',
          kbn: '継続',
          jikaiyotei: 'x月',
          M_tantousyakaigi: '●',
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
          this.startymd = dayjs().subtract(11, 'M').startOf('months');
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
    filterClrclick() {
      this.filter.clear();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#kojinRireki {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1300px !important;
  // max-width: 1920px;
  // width: auto;

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
    // border: thin solid;
  }

  #icrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    height: 78vh;
    width: 77vw;
    min-width: 900px;

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

#kojinRirekidatepickermonth,
#kojinRirekidatepicker1,
#kojinRirekidatepicker2 {
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
#kojinRirekidatepickermonth {
  position: fixed !important;
  top: 70px;
  left: 750px;
}
#kojinRirekidatepicker1 {
  position: fixed !important;
  top: 70px;
  left: 400px;
}
#kojinRirekidatepicker2 {
  position: fixed !important;
  top: 70px;
  left: 600px;
}
</style>
