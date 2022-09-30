<template>
  <div id="kojinRireki">
    <v-container no-gutters fluid class="container ml-1 pa-0">
      <v-row no-gutters>
        <v-col class="leftArea">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            :dispAddDaicho="false"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list>
        </v-col>
        <v-col class="centerArea">
          <!-- 中央エリア -->
          <v-container no-gutters fluid class="container pa-0">
            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
                利用者名
              </v-card>
              <v-card class="koumokuData ml-1 pa-1" tile outlined>
                {{ userInfo.names }}
              </v-card>
            </v-row>
            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
                表示期間
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
              <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
                詳細表示
              </v-card>
              <v-btn-toggle
                class="flex-wrap ml-1"
                v-model="selSyousaiDispUmuIndex"
              >
                <v-btn
                  v-for="n in syousaiDispList"
                  :key="n.val"
                  small
                  outlined
                  @click="grdDispChangeclick(0)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
              <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
                支援項目
              </v-card>
              <v-btn-toggle
                class="flex-wrap ml-1"
                v-model="selSienkoumokuUmuIndex"
              >
                <v-btn
                  v-for="n in sienkoumokuUmuList"
                  :key="n.val"
                  small
                  outlined
                  @click="grdDispChangeclick(1)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
            </v-row>
            <v-row no-gutters class="rowStyle mt-1">
              <v-card class="koumokuTitle pa-1" outlined tile>
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
              >
              </wj-menu>
              <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
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

              <v-btn class="itemBtn ml-1" @click="sienKoumokuclick()">
                項目選択
              </v-btn>
              <v-btn
                class="itemBtn ml-1"
                style="width: 125px"
                @click="filterClrclick()"
              >
                フィルタクリア
              </v-btn>
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
    <v-dialog
      v-model="sienkoumoku_dialog"
      width="500"
      persistent
      no-click-animation
      class="datepicker_dialogs"
    >
      <v-card class="ma-0 pa-1 pr-3 pt-3">
        <v-container no-gutters fluid class="kojinRirekiSienKoumoku">
          <v-btn
            elevation="2"
            icon
            small
            fixed
            top
            right
            @click="kojinRirekiSienKoumoku_dialog_close()"
            class="closeButton"
            color="red"
          >
            <v-icon> mdi-close </v-icon></v-btn
          >
          <wj-flex-grid
            id="kojinRirekiSienKoumokuGrid"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowMerging="'AllHeaders'"
            :allowResizing="false"
            :allowSorting="false"
            :allowDragging="false"
            :selectionMode="'None'"
            :isReadOnly="true"
            :initialized="onInitializeSienKoumokuGrid"
            :formatItem="onFormatItemSienKoumoku"
            :itemsSource="sienKoumokuData"
          >
          </wj-flex-grid>
          <v-row class="rowStyle" no-gutters>
            <v-btn class="SienKoumokuSetBtn" @click="sienKoumokuSetclick()">
              決定
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import UserList from '../components/UserList.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';

// import * as wjCore from '@grapecity/wijmo';
const MOMENT_CON_CHAR = '-';
const STR_MARU = '○';
const STYLE_DEFAULT = '';
const STYLE_BORDER_SOLID = '1px solid black';
const GRD_FROZEN_ROW = 1;
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
          dataname: 'day',
          title: '日付',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'jigyokbnD',
          title: '事\n業\n区\n分',
          kbntitle: '',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'houhou',
          title: '方法',
          kbntitle: '受付・対応',
          width: 40,
          align: 'left',
        },
        {
          dataname: 'naiyou',
          title: '内容',
          kbntitle: '受付・対応',
          width: sysConst.GRD_COL_WIDTH.Naiyou,
          align: 'left',
        },
        {
          dataname: 'kasankoumoku',
          title: '加算項目',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'tantousya',
          title: '担当者',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.Tantousya,
          align: 'left',
        },
        {
          dataname: 'keiyakuteiketu',
          title: '契約\n締結',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'keikakusakusei',
          title: '計画作成',
          kbntitle: '計画作成',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'P_tantousyakaigi',
          title: '担当者\n会議',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jyukyukoufu',
          title: '受給\n交付',
          kbntitle: '計画作成',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jissi',
          title: '実施',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'kbn',
          title: '区分',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jikaiyotei',
          title: '次回\n予定',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'M_tantousyakaigi',
          title: '担当者\n会議',
          kbntitle: 'モニタリング',
          width: 30,
          align: 'center',
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
      viewDataAll: [],
      viewData: [],
      sienkoumoku_dialog: false,
      sienKoumokuData: [],
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
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header * 4;
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
      }
      flexGrid.endUpdate();
    },
    onInitializeSienKoumokuGrid(flexGrid) {
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          flexGrid.beginUpdate();
          if (ht.col == 0) {
            // 大分類の場合はその中分類すべての選択解除を行う
            let targetitem = flexGrid.rows[ht.row].dataItem;
            let txt = ' ';
            if (ht.panel.getCellData(ht.row, 2) != STR_MARU) {
              txt = STR_MARU;
            }
            for (let r = 1; r < flexGrid.rows.length; r++) {
              let tmpitem = flexGrid.rows[r].dataItem;
              if (targetitem.daicode == tmpitem.daicode) {
                ht.panel.setCellData(r, 2, txt);
              }
            }
          } else {
            if (ht.row == 0) {
              // 全ての場合は〇を解除できない
              if (ht.panel.getCellData(ht.row, 2) != STR_MARU) {
                ht.panel.setCellData(ht.row, 2, STR_MARU);
                for (let r = 1; r < flexGrid.rows.length; r++) {
                  ht.panel.setCellData(r, 2, ' ');
                }
              }
            } else {
              if (ht.panel.getCellData(ht.row, 2) == STR_MARU) {
                ht.panel.setCellData(ht.row, 2, ' ');
              } else {
                ht.panel.setCellData(ht.row, 2, STR_MARU);
                // 1つでも全部以外に〇がついた場合は全部の〇を解除
                ht.panel.setCellData(0, 2, ' ');
              }
            }
          }
          flexGrid.endUpdate();
        }
      });
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.frozenRows = GRD_FROZEN_ROW;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.sienKoumokuHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.sienKoumokuHeaderList[colIndex].dataname;
        col.header = this.sienKoumokuHeaderList[colIndex].title;
        col.width = this.sienKoumokuHeaderList[colIndex].width;
        col.align = this.sienKoumokuHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
      }
      this.sienKoumokuData = this.loadSienKoumokuData();
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
        if (this.selSyousaiDispUmuIndex == 1 && e.col == 3) {
          e.cell.innerHTML =
            '<font color="blue">' +
            wjCore.escapeHtml(tmpitem.naiyou) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(tmpitem.naiyouDetail) +
            '</div>';
        }
        if (e.row < flexGrid.rows.length - 1) {
          let tmpitempre = e.panel.rows[e.row + 1].dataItem;
          if (
            tmpitem.day.getFullYear() != tmpitempre.day.getFullYear() ||
            tmpitem.day.getMonth() != tmpitempre.day.getMonth() ||
            tmpitem.day.getDate() != tmpitempre.day.getDate()
          ) {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          }
        }
        if (e.col == 1 || e.col == 3 || e.col == 5 || e.col == 9) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
      } else {
        if (e.col == 1 || e.col == 3 || e.col == 5 || e.col == 9) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        } else if (e.row == 0 && (e.col == 2 || e.col == 6)) {
          e.cell.style.borderRight = STYLE_BORDER_SOLID;
        }
      }
    },
    onFormatItemSienKoumoku(flexGrid, e) {
      // if (e.col == 2) {
      //   e.cell.style.borderRight = STYLE_NONE;
      // }
      if (e.panel == flexGrid.cells) {
        e.cell.style.borderBottom = STYLE_DEFAULT;
        e.cell.style.backgroundColor = STYLE_DEFAULT;
        let tmpitem = e.panel.rows[e.row].dataItem;
        if (e.row > 0 && e.col == 0) {
          let tmpitempre = e.panel.rows[e.row - 1].dataItem;
          if (tmpitem.daicode == tmpitempre.daicode) {
            e.panel.setCellData(e.row, e.col, ' ');
          }
        }
        if (e.row > 0 && e.row < flexGrid.rows.length - 1) {
          let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.daicode != tmpNextitem.daicode) {
            e.cell.style.borderBottom = STYLE_BORDER_SOLID;
          } else if (e.col == 0 && tmpitem.daicode == tmpNextitem.daicode) {
            e.cell.style.borderBottom = 0;
          }
        }
        if (e.col == 2) {
          e.cell.style.backgroundColor = sysConst.COLOR.white;
        }
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
        this.viewDataAll = this.loadData(false);
      }
      this.userFilter();
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
    loadSienKoumokuData() {
      let tmpviewdata = [];
      tmpviewdata.push({
        id: 0,
        daicode: 0,
        daicodeD: '',
        dainame: '',
        dainameD: '',
        chucode: 0,
        chucodeD: '',
        chuname: '全表示',
        chunameD: '',
        select: '○',
      });
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
          select: '',
        });
      }
      return tmpviewdata;
    },
    getYmd(outputkbn) {
      if (outputkbn == 0) {
        if (!this.startymd) {
          this.startymd = moment().startOf('months');
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
          this.endymd = moment().endOf('months');
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
          this.month = moment().startOf('months');
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
        let split = this.pickersym.split(MOMENT_CON_CHAR);
        this.startymd = moment({
          years: split[0],
          months: Number(split[1]) - 1,
          days: split[2],
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        this.datepicker_dialog_sym = false;
      } else if (kbn == 1) {
        let split = this.pickereym.split(MOMENT_CON_CHAR);
        this.endymd = moment({
          years: split[0],
          months: Number(split[1]) - 1,
          days: split[2],
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        this.datepicker_dialog_eym = false;
      } else if (kbn == 2) {
        let split = this.pickermonth.split(MOMENT_CON_CHAR);
        let tmp = moment({
          years: split[0],
          months: Number(split[1]) - 1,
          days: 1,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        this.startymd = moment(tmp);
        this.endymd = moment(tmp.endOf('months'));
        this.datepicker_dialog_month = false;
      }
    },
    onJigyoKbnClicked(s) {
      s.header = this.jigyoKbnList[s.selectedIndex].name;
      this.selJigyoKbn = s.selectedValue;
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
    sienKoumokuclick() {
      this.sienkoumoku_dialog = true;
    },
    filterClrclick() {
      this.filter.clear();
    },
    kojinRirekiSienKoumoku_dialog_close() {
      this.sienkoumoku_dialog = false;
    },
    sienKoumokuSetclick() {
      this.kojinRirekiSienKoumoku_dialog_close();
      //ここで支援項目絞込用の処理を行う
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#kojinRireki {
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
  .koumokuData {
    color: $font_color;
    display: flex;
    align-items: center;
    width: auto;
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

  .rowStyle {
    height: 25px;
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
    // min-width: 1050px;
    // max-width: 1920px;
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

.kojinRirekiSienKoumoku {
  background-color: $white;
  .closeButton {
    z-index: 100;
    position: absolute;
    right: 0;
    top: 0;
    background-color: $white;
  }
  .rowStyle {
    height: 25px;
    position: relative;
    .SienKoumokuSetBtn {
      font-size: 14px;
      background: $btn_background;
      border: thin solid;
      border-color: $light-gray;
      color: $font_color;
      height: 25px !important;
      width: 75px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
#kojinRirekiSienKoumokuGrid {
  // height: 400px;
  // width: 500px;
  // margin: 4px;
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
</style>
