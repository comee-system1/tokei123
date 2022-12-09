<template>
  <div id="monitoringHoukokusho">
    <v-container class="pa-0" fluid>
      <v-row no-gutters>
        <v-col class="rightArea pa-0">
          <v-row no-gutters class="rowStyle_Dark pa-1 pl-0">
            <v-row no-gutters class="rowStyle" style="position: relative">
              <v-tooltip bottom color="info">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="2"
                    class="mr-1 ml-1"
                    height="19"
                    @click="userdrawerCliked"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon v-if="userdrawer" dense
                      >mdi-account-arrow-left-outline</v-icon
                    >
                    <v-icon v-else dense
                      >mdi-account-arrow-right-outline</v-icon
                    >
                    選択
                  </v-btn>
                </template>
                <span>利用者選択欄の表示有無を切替えます</span>
              </v-tooltip>
              <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
                利用者名
              </v-card>
              <v-card
                class="koumokuData border mr-1 pl-1"
                tile
                outlined
                width="250"
              >
                {{ userData.riyocode }} {{ userData.names }}
              </v-card>
            </v-row>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1 mb-1">
            <v-card
              class="koumokuTitle titleMain wMin pa-1 mr-1 ml-1"
              outlined
              tile
            >
              入力
            </v-card>
            <v-btn-toggle
              class="flex-wrap mr-1"
              color="light-blue darken-4"
              mandatory
            >
              <v-btn
                v-for="n in inputList"
                :key="n.val"
                elevation="2"
                outlined
                width="25"
                height="19"
                @click="inputClicked(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
              計画作成日
            </v-card>
            <v-card class="koumokuData mr-1 pl-1" width="125" tile outlined>
              {{ viewdataAll.krekiymdD }}
            </v-card>
            <v-card class="koumokuTitle titleMain wMin pa-1 mr-1" outlined tile>
              実施日
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
                @click="inputCalendarClick(0)"
                tile
                outlined
                elevation="2"
                width="150px"
                height="100%"
                class="btnymd pa-0"
                >{{ getYmd() }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
            <v-spacer></v-spacer>
            <v-card
              class="koumokuTitle wMin titleOrange pa-1 mr-1"
              outlined
              tile
            >
              同意
            </v-card>
            <input
              type="checkbox"
              class="mr-1"
              v-model="viewdataAll.doui_ymdD"
              @change="douiCheck()"
            />
            <v-card class="koumokuData pl-1" width="125" outlined tile>
              {{ getDouisya }}
            </v-card>
            <v-spacer></v-spacer>
            <v-btn
              elevation="2"
              class="mr-1"
              height="19"
              @click="copyClicked()"
            >
              前回ｺﾋﾟｰ
            </v-btn>
            <v-btn
              elevation="2"
              class="mr-1"
              height="19"
              v-on:click.stop="drawer = !drawer"
            >
              履歴参照
            </v-btn>
            <v-navigation-drawer
              v-model="drawer"
              fixed
              temporary
              right
              hide-overlay
              :width="200"
              :min-width="200"
              style="font-size: 14px"
            >
              <v-list class="pa-0 ma-0" dense>
                <v-card class="drawerTitle pa-1" outlined tile :height="30">
                  履歴参照
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
                  >
                    <v-icon dark small> mdi-close </v-icon></v-btn
                  >
                </v-card>
                <template v-for="item in rirekiList">
                  <v-list-item
                    class="pa-0 ma-0"
                    dense
                    :key="`first-${item.index}`"
                    @click="rirekiClicked(item)"
                  >
                    <v-list-item-content class="pa-0 pl-2 ma-0">
                      <table>
                        <tr>
                          <td width="10%" align="center">{{ item.no }}</td>
                          <td width="40%" align="center">{{ item.day }}</td>
                          <td width="10%" align="left">{{ item.kanryou }}</td>
                          <td width="40%" align="left">{{ item.tantou }}</td>
                        </tr>
                      </table>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider :key="`second-${item.index}`" />
                </template>
              </v-list>
            </v-navigation-drawer>
          </v-row>
          <div class="scrollbody">
            <v-row no-gutters>
              <div style="width: 50%">
                <v-card class="koumokuTitle_c titleGreen pa-1" outlined tile>
                  総合的な援助の方針
                </v-card>
                <v-textarea
                  class="inputarea ma-0 pa-0"
                  no-resize
                  v-model="viewdataAll.hoshin"
                  auto-grow
                  hide-details
                  readonly
                  solo
                  flat
                  dense
                  outlined
                  background-color="yellow lighten-5"
                ></v-textarea>
              </div>
              <div style="width: 50%">
                <v-card class="koumokuTitle_c titleBlue pa-1" outlined tile>
                  全体の状況
                </v-card>
                <v-textarea
                  class="inputarea ma-0 pa-0"
                  no-resize
                  v-model="viewdataAll.zentaijokyo"
                  auto-grow
                  hide-details
                  solo
                  flat
                  dense
                  outlined
                ></v-textarea>
              </div>
            </v-row>

            <v-row class="ma-0 mt-1" no-gutters>
              <wj-flex-grid
                id="monitoringHoukokushoicrnGrid"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :imeEnabled="true"
                :allowAddNew="false"
                :allowDelete="false"
                :allowPinning="false"
                :allowMerging="'AllHeaders'"
                :allowResizing="true"
                :allowSorting="false"
                :allowDragging="false"
                :selectionMode="'Cell'"
                :initialized="onInitializeIcrnGrid"
                :showMarquee="true"
                :formatItem="onFormatItem"
                :itemsSourceChanging="onItemsSourceChanging"
                :itemsSourceChanged="onItemsSourceChanged"
                :itemsSource="viewdataAll.monidetail"
              >
              </wj-flex-grid>
            </v-row>
          </div>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card
              class="koumokuTitle titleMain pa-1 mr-1"
              width="50"
              outlined
              tile
            >
              結果
            </v-card>
            <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
              <div
                v-for="item in kekkaList"
                :key="item.val"
                class="radioInline"
              >
                <input
                  type="radio"
                  :id="'rbMoniHoukokuKekka-' + item.val"
                  v-model="kekkaIndex"
                  :value="item.val"
                  @change="kekkaClicked(item.val)"
                />
                <label
                  :for="'rbMoniHoukokuKekka-' + item.val"
                  class="customRadio mr-2"
                >
                  <span>{{ item.name }}</span>
                </label>
              </div>
            </v-card>
            <v-layout class="rowStyle" v-if="kekkaIndex == 3">
              <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
                ｻｰﾋﾞｽ終了日
              </v-card>
              <v-btn
                @click="inputCalendarClick(8)"
                tile
                elevation="2"
                outlined
                width="150px"
                height="100%"
                class="pa-0 mr-1"
                >{{ getKanryouYmd(0) }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-layout>
            <v-layout class="rowStyle" v-else>
              <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
                次回案作成月
              </v-card>
              <v-btn
                @click="inputCalendarClick(9)"
                elevation="2"
                tile
                outlined
                width="150px"
                height="100%"
                class="pa-0 mr-1"
                :disabled="kekkaIndex == 0"
                >{{ getKanryouYmd(1) }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-layout>

            <v-card
              class="koumokuTitle titleOrange pa-1 mr-1"
              outlined
              tile
              width="50"
            >
              完了
            </v-card>
            <input
              type="checkbox"
              class="mr-1"
              v-model="viewdataAll.kanryou"
              @change="douiCheck()"
            />
            <v-card
              class="koumokuData pa-1 pr-1 mr-1"
              width="200"
              outlined
              tile
            >
            </v-card>
            <v-btn
              elevation="2"
              :loading="loading"
              height="19"
              @click="searchClicked()"
            >
              登録
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringHoukokushoDatepicker"
        type="date"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="daySelect(0)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepickerKanryouYm_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringHoukokushoDatepickerKanryouYm"
        type="month"
        v-model="pickerKanryou"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      v-model="datepickerKanryouYmd_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringHoukokushoDatepickerKanryouYmd"
        type="date"
        v-model="pickerKanryou"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="daySelect(1)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="douiInputflg" width="350">
      <v-card class="common_dialog pb-1">
        <v-card-title class="dialog_title mb-1">
          モニタリング 利用者同意・署名
        </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="header_dialog_close()"
          class="dialog_close mt-2"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlueDark pa-1 ml-1 mr-1"
            outlined
            tile
            width="100"
          >
            利用者名
          </v-card>
          <v-card class="koumokuData pa-1 pb-3" tile outlined width="200">
            {{ userData.riyocodeD }} {{ userData.names }}
          </v-card>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
            同意日
          </v-card>
          <v-btn
            @click="inputCalendarClick(7)"
            tile
            outlined
            width="150px"
            height="100%"
            class="pa-0 mr-1"
            >{{ getDouiYmd() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
            様式
          </v-card>
          <v-btn-toggle
            class="flex-wrap mr-1"
            v-model="viewdataAll.syomeikbn"
            mandatory
          >
            <v-btn
              v-for="n in douiKbnList"
              :key="n.val"
              small
              color="secondary"
              dark
              outlined
              width="25"
              height="25"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
            署名
          </v-card>
          <input
            class="pl-1"
            type="text"
            v-model="viewdataAll.syomei"
            style="width: 200px; border: 1px solid lightgray"
          />
        </v-row>
        <v-row no-gutters class="rowStyle_Input">
          <v-btn class="mr-1" height="25" @click="copyClicked()"> 削除 </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-1" height="25" @click="copyClicked()"> 登録 </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="datepickerDouiYmd_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringHoukokushoDatepickerDoui"
        type="date"
        v-model="pickerDoui"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="daySelect(2)"
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
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
// import UserList from '../components/UserList.vue';
import { getConnect } from '@connect/getConnect';

export default {
  props: {
    selectedUserObj: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      jyoukyouwidth: 500,
      userList: [],
      userData: {},
      keikakuYmd: '',
      headerList: [
        {
          dataname: 'jissi',
          title: '実施',
          kbntitle: '',
          width: 25,
          align: 'center',
        },
        {
          dataname: 'shienmokuhyo',
          title: '支援目標',
          kbntitle: '',
          width: '8*',
          align: 'left',
        },
        {
          dataname: 'tasseijiki',
          title: '達成時期',
          kbntitle: '',
          width: '5*',
          align: 'left',
        },
        {
          dataname: 'servicejokyo',
          title: 'サービス提供状況\n(事業所からの聞取り)',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'honninkanso',
          title: '本人の感想・満足度',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'shientassei',
          title: '支援目標の達成感\n(ニーズの充足度)',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'kongokadai',
          title: '今後の課題\n・解決方法',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          // dataname: 'h_syu',
          kbntitle: '計画変更の必要性',
          title: '種類',
          width: '4.5*',
          align: 'center',
        },
        {
          // dataname: 'h_ryo',
          kbntitle: '計画変更の必要性',
          title: '量',
          width: '4.5*',
          align: 'center',
        },
        {
          // dataname: 'h_week',
          kbntitle: '計画変更の必要性',
          title: '週間',
          width: '4.5*',
          align: 'center',
        },
        {
          dataname: 'sonotaryui',
          title: 'その他の留意事項',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
      ],
      viewdataAll: { housin: '', jyoukyou: '', viewdata: [] },
      kikanYmd: '',
      douiYmd: '',
      picker: '',
      kikanKanryou: '',
      pickerKanryou: '',
      pickerDoui: '',
      datepicker_dialog: false,
      datepickerKanryouYm_dialog: false,
      datepickerKanryouYmd_dialog: false,
      datepickerDouiYmd_dialog: false,
      screenFlag: false,
      douiInputflg: false,
      filteryoteisyaIcrn: {},
      targetYmd: '',
      selTantousya: 0,
      douiKbnIndex: 0,
      douiKbnList: [
        { val: 0, name: '本人' },
        { val: 1, name: '代理人' },
      ],
      inputList: [
        { val: 0, name: '新規' },
        { val: 1, name: '修正' },
      ],
      kekkaIndex: 0,
      kekkaList: [
        { val: 0, name: '継続' },
        { val: 1, name: '中途月変更' },
        { val: 2, name: '終期月更新' },
        { val: 3, name: 'サービス終了' },
      ],
      loading: false,
      marginDefault: true,
      leftWidth: '275px',
      rirekiList: [
        {
          index: 0,
          no: 3,
          day: '2020/01/01',
          kanryou: '☐',
          tantou: '担当小',
        },
        {
          index: 1,
          no: 2,
          day: '2019/01/01',
          kanryou: '☑',
          tantou: '担当次',
        },
        {
          index: 2,
          no: 1,
          day: '2018/01/01',
          kanryou: '☑',
          tantou: '担当三',
        },
      ],
      userdrawer: true,
      drawer: false,
      mainGrid: {},
    };
  },
  mounted() {
    this.setUserdata(this.selectedUserObj);
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    getDouisya() {
      return wjCore.escapeHtml(this.viewdataAll.syomei);
    },
    getHousin() {
      return wjCore.escapeHtml(this.viewdataAll.housin);
    },
    getJyoukyou() {
      return wjCore.escapeHtml(this.viewdataAll.jyoukyou);
    },
  },
  methods: {
    calculateWindowHeight() {
      if (
        document.getElementsByClassName('scrollbody') != null &&
        document.getElementsByClassName('scrollbody')[0] != null
      ) {
        document.getElementsByClassName('scrollbody')[0].style.height =
          window.innerHeight - 160 + 'px';
      }
    },
    /*******************************
     * ユーザー一覧コンポーネントの開閉ボタンを押下
     */
    // changeLeftArea() {
    //   let doc = document.getElementsByClassName('rightArea')[0];
    //   let font = '';
    //   if (this.moveLeft == true) {
    //     this.moveLeft = false;
    //     doc.style.minWidth = '700px';
    //     doc.style.width = '700px';
    //     this.leftWidth = '275px';
    //     font = '14px';
    //   } else {
    //     this.moveLeft = true;
    //     doc.style.minWidth = '95%';
    //     doc.style.width = '95%';
    //     this.leftWidth = '10px';
    //     font = '17.5px';
    //   }
    //   let inputarea = document.getElementsByClassName('inputarea');
    //   for (let i = 0; i < inputarea.length; i++) {
    //     inputarea[i].style.fontSize = font;
    //   }
    //   this.mainGrid.refresh();
    //   this.mainGrid.autoSizeRows();
    // },
    userdrawerCliked() {
      this.userdrawer = !this.userdrawer;
      let doc = document.getElementById('monitoringHoukokusho');
      let font = '';
      if (this.userdrawer) {
        doc.style.minWidth = '1040px';
        doc.style.maxWidth = '1040px';
        doc.style.width = '1040px';
        font = '14px';
      } else {
        doc.style.minWidth = '1320px';
        doc.style.maxWidth = '1320px';
        doc.style.width = '1320px';
        font = '18px';
      }
      this.$emit('userDispChange', this.userdrawer);
      let inputarea = document.getElementsByTagName('textarea');
      for (let i = 0; i < inputarea.length; i++) {
        inputarea[i].style.fontSize = font;
      }
      this.mainGrid.refresh();
      this.mainGrid.autoSizeRows();
    },
    onInitializeIcrnGrid(flexGrid) {
      this.mainGrid = flexGrid;
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          if (ht.col == 0) {
            flexGrid.refreshRange(
              new wjGrid.CellRange(
                ht.row,
                3,
                ht.row,
                flexGrid.columns.length - 1
              )
            );
          }
          if (tmpitem.jissi && e.target.tagName == 'BUTTON') {
            if (ht.col == 7) {
              tmpitem.h_syu = e.target.value;
            }
            if (ht.col == 8) {
              tmpitem.h_ryo = e.target.value;
            }
            if (ht.col == 9) {
              tmpitem.h_week = e.target.value;
            }
            flexGrid.refreshRange(
              new wjGrid.CellRange(ht.row, ht.col, ht.row, ht.col)
            );
          }
        }
        // 完全編集モードへ移行
        flexGrid.startEditing(true);
        flexGrid.imeEnabled = true;
      });

      flexGrid.beginningEdit.addHandler((s, e) => {
        // 編集不可列の設定
        if (e.col == 1 || e.col == 2) {
          e.cancel = true;
          return;
        }
        let tmpitem = flexGrid.cells.rows[e.row].dataItem;
        if (!tmpitem.jissi && e.col != 0) {
          e.cancel = true;
          return;
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });
      flexGrid.pasting.addHandler((s, e) => {
        // 編集モード時以外のペーストを禁止する
        // selectionmodeがcell以外の場合に、選択範囲全てにペーストしてしまうから。
        e.cancel = true;
        return;
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row + 5;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
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
        if (7 <= colIndex && colIndex <= 9) {
          col.isReadOnly = true;
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
          this.headerList[colIndex].title
        );
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      this.screenFlag = false;
      this.loading = false;
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    onFormatItem(flexGrid, e) {
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col < 3) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      } else if (e.panel == flexGrid.cells) {
        if (this.userdrawer) {
          e.cell.style.fontSize = '12px';
        } else {
          e.cell.style.fontSize = '15.5px';
        }
        e.cell.style.backgroundColor = '';
        if (e.col == 0) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
        }
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (tmpitem.jissi) {
          if (7 <= e.col && e.col <= 9) {
            let chkval = 0;
            if (e.col == 7) {
              chkval = tmpitem.h_syu;
            } else if (e.col == 8) {
              chkval = tmpitem.h_ryo;
            } else if (e.col == 9) {
              chkval = tmpitem.h_week;
            }

            if (chkval == 2) {
              e.cell.innerHTML =
                "<button class='grdbtn' value='0' style='border-color:red'>無</button><button class='grdbtn' value='1'>有</button>";
            } else {
              e.cell.innerHTML =
                "<button class='grdbtn' value='0'>無</button><button class='grdbtn' value='1' style='border-color:red'>有</button>";
            }
          }

          if (3 <= e.col && e.col <= 10) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
          }
        } else {
          if (3 <= e.col) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          }
        }
      }
      e.cell.style.borderRight = '';
      if (e.col == 2) {
        e.cell.style.borderRight =
          '1px solid ' + sysConst.COLOR.gridBorderColor;
      }
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData();
    },
    setDataFromYoteiList(item, ymItem) {
      this.userData.riid = item.intcode;
      this.userData.riyocode = item.rcodeD;
      this.userData.names = item.rname;
      console.log(ymItem);
      this.setViewData();
    },
    setViewData() {
      this.screenFlag = true;
      this.loading = true;
      let params = {
        uniqid: 3,
        traceid: 123,
        keitype: 1,
        jigyoid: 62,
        intcode: this.userData.riid,
        cntid: 1,
      };
      // cntid: 1,
      console.log(params);
      getConnect('/moni', params).then((result) => {
        console.log(12345);
        console.log(result);
        this.createViewData(result);
        this.screenFlag = false;
        this.loading = false;
      });
    },
    createViewData(apiresult) {
      if (apiresult.length > 0) {
        this.viewdataAll = apiresult[0];
        if (apiresult[0].doui_ymd != undefined) {
          this.pickerDoui =
            this.viewdataAll.doui_ymd.slice(0, 4) +
            '-' +
            this.viewdataAll.doui_ymd.slice(4, 6) +
            '-' +
            this.viewdataAll.doui_ymd.substring(6, 8);
          this.douiYmd = dayjs(this.pickerDoui);
        }
        if (apiresult[0].mymd != undefined) {
          this.picker =
            this.viewdataAll.mymd.slice(0, 4) +
            '-' +
            this.viewdataAll.mymd.slice(4, 6) +
            '-' +
            this.viewdataAll.mymd.substring(6, 8);
          this.kikanYmd = dayjs(this.picker);
        }
      } else {
        this.viewdataAll = {};
      }
    },

    getYmd() {
      if (!this.kikanYmd) {
        this.kikanYmd = dayjs();
        this.picker =
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
    getKanryouYmd(kbn) {
      if (!this.kikanKanryou) {
        this.kikanKanryou = dayjs();
        this.pickerKanryou =
          this.kikanKanryou.year() +
          '-' +
          this.kikanKanryou.format('MM') +
          '-' +
          this.kikanKanryou.format('DD');
      }
      if (kbn == 0) {
        return (
          this.kikanKanryou.format('YYYY') +
          '年' +
          this.kikanKanryou.format('MM') +
          '月' +
          this.kikanKanryou.format('DD') +
          '日'
        );
      } else {
        return (
          this.kikanKanryou.format('YYYY') +
          '年' +
          this.kikanKanryou.format('MM') +
          '月'
        );
      }
    },
    getDouiYmd() {
      if (!this.douiYmd) {
        this.douiYmd = dayjs();
        this.pickerDoui =
          this.douiYmd.year() +
          '-' +
          this.douiYmd.format('MM') +
          '-' +
          this.douiYmd.format('DD');
      }

      return (
        this.douiYmd.format('YYYY') +
        '年' +
        this.douiYmd.format('MM') +
        '月' +
        this.douiYmd.format('DD') +
        '日'
      );
    },
    inputCalendarClick(kbn) {
      if (kbn == 7) {
        this.pickerDoui =
          this.douiYmd.format('YYYY') +
          '-' +
          this.douiYmd.format('MM') +
          '-' +
          this.douiYmd.format('DD');
        this.datepickerDouiYmd_dialog = true;
      } else if (kbn == 8 || kbn == 9) {
        this.pickerKanryou =
          this.kikanKanryou.format('YYYY') +
          '-' +
          this.kikanKanryou.format('MM') +
          '-' +
          this.kikanKanryou.format('DD');

        if (kbn == 8) {
          this.datepickerKanryouYmd_dialog = true;
        } else {
          this.datepickerKanryouYm_dialog = true;
        }
      } else {
        if (kbn == 1) {
          this.kikanYmd = this.kikanYmd.subtract(1, 'days');
        } else if (kbn == 2) {
          this.kikanYmd = this.kikanYmd.add(1, 'days');
        }
        this.picker =
          this.kikanYmd.format('YYYY') +
          '-' +
          this.kikanYmd.format('MM') +
          '-' +
          this.kikanYmd.format('DD');
        if (kbn == 0) {
          this.datepicker_dialog = true;
        }
      }
    },
    daySelect(kbn) {
      if (kbn == 0) {
        this.kikanYmd = dayjs(this.picker);
        this.viewdatayoteisya = [];
        this.datepicker_dialog = false;
      } else if (kbn == 1) {
        this.kikanKanryou = dayjs(this.pickerKanryou);
        this.datepickerKanryouYmd_dialog = false;
      } else if (kbn == 2) {
        this.douiYmd = dayjs(this.pickerDoui);
        this.datepickerDouiYmd_dialog = false;
      }
    },
    monthSelect() {
      this.kikanKanryou = dayjs(this.pickerKanryou);
      // this.viewdatakeikaku = [];
      this.datepickerKanryouYm_dialog = false;
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userData = row;

      this.setViewData();
    },
    setUserdata(item) {
      console.log(item);
      if (item != null && item.riid != undefined) {
        // ユーザ選択処理はここで行う
        this.userData = item;

        this.setViewData();
      }
    },
    getSelectUserChildComponent(data) {
      this.userList = data;
    },
    copyClicked(kbn) {
      console.log(kbn);
    },
    rirekiClicked(rirekiObj) {
      console.log(rirekiObj);
      // this.drawer = !this.drawer;
    },
    inputClicked(kbn) {
      console.log(kbn);
    },
    douiCheck() {
      if (!this.userData.names) {
        return;
      }
      this.douiInputflg = true;
    },
    header_dialog_close() {
      this.douiInputflg = false;
    },
    kekkaClicked(index) {
      this.kekkaIndex = index;
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#monitoringHoukokusho {
  // color: $font_color;
  font-size: 14px;
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1040px !important;
  max-width: 1040px;
  height: 100%;
  width: 98vw;
  // width: auto;
  .rightArea {
    min-width: 700px;
    width: 700px;

    .inputarea {
      font-size: 14px;
      height: auto;
    }
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

  .koumokuTitle_c {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 300px;
    height: 20px;
    text-align: center;
  }
  .scrollbody {
    padding: 3px;
    border: 1px solid;
    border-color: $light-gray;
    min-height: 400px;
    height: 500px;
    overflow-y: scroll;
  }

  #monitoringHoukokushoicrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    // width: auto;
    // min-width: 1250px;
    // height: 52vh;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    // &.wj-flexgrid [wj-part='root'] {
    //   overflow-y: scroll !important;
    // }
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
      line-height: 110%;
      padding: 4px;
    }
    // .wj-cell {
    //   padding: 2px;
    // }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
    }
    .wj-state-active {
      background: white;
      color: $font_color;
    }
    .wj-grid-editor {
      background: white;
      color: $font_color;
    }

    .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected):not(.wj-state-active):not(.wj-grid-editor) {
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }

  button.grdbtn {
    border: 1px solid $light-gray;
    margin: 0px 1px;
    border-radius: 50%;
    border-color: transparent;
    width: 20px;
    color: $font_color !important;
    font-size: $cell_fontsize !important;
    &:hover {
      background-color: $light-gray;
    }
    &:disabled {
      background-color: $light-white;
      color: $light-white;
      opacity: 0.2;
    }

    &.act {
      background-color: $light-gray;
    }
  }
}

.v-application--is-ltr
  .v-textarea.v-text-field--enclosed
  .v-text-field__slot
  textarea {
  padding-right: 0px;
  line-height: 150%;
  // overflow-y: scroll !important;
}

.v-picker {
  z-index: 10;
}
#monitoringHoukokushoDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 500px;
  width: 300px;
  max-width: 300px;
}
#monitoringHoukokushoDatepickerKanryouYm,
#monitoringHoukokushoDatepickerKanryouYmd {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 300px;
  left: 830px;
  width: 300px;
  max-width: 300px;
}
#monitoringHoukokushoDatepickerDoui {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 330px;
  left: 600px;
  width: 300px;
  max-width: 300px;
}
</style>
