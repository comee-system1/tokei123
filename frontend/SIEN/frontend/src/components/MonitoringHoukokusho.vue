<template>
  <div id="monitoringHoukokusho">
    <v-container class="ml-1 pa-0" style="max-width: 100%" fluid>
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }" style="height: 70vh">
          <user-list
            ref="user_list"
            :dispAddDaicho="false"
            :dispHideBar="true"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
            @childLeftArea="changeLeftArea"
          >
          </user-list>
        </v-col>
        <v-col class="rightArea pa-0">
          <v-row
            no-gutters
            class="pa-1"
            style="height: 30px; background: #d7eeff"
          >
            <v-row no-gutters class="rowStyle">
              <v-card class="koumokuTitle pa-1" outlined tile>
                利用者名
              </v-card>
              <v-card class="koumokuData ml-1 pl-1" tile outlined>
                {{ userData.riyocodeD }} {{ userData.names }}
              </v-card>
              <v-card class="koumokuTitle pa-1 ml-1" outlined tile>
                計画作成日
              </v-card>
              <v-card
                class="koumokuData ml-1"
                style="width: 125px; text-align: center"
                tile
                outlined
              >
                {{ keikakuYmd }}
              </v-card>
              <v-layout class="right">
                <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
                  同意署名欄
                </v-card>
                <input
                  type="checkbox"
                  class="mr-1"
                  v-model="viewdataAll.doui"
                  @change="douiCheck()"
                />
                <v-card
                  class="koumokuData pa-1"
                  style="width: 125px"
                  outlined
                  tile
                >
                  {{ getDouisya }}
                </v-card>
              </v-layout>
            </v-row>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile> 入力 </v-card>
            <v-btn-toggle class="flex-wrap mr-1" mandatory>
              <v-btn
                v-for="n in inputList"
                :key="n.val"
                small
                color="secondary"
                dark
                outlined
                @click="inputClicked(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
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
                width="150px"
                height="100%"
                class="pa-0 mr-1"
                >{{ getYmd() }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0 mr-1"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(1)"
              >
                <v-icon>mdi-arrow-left-bold</v-icon>
              </v-btn>
              <v-btn
                elevation="0"
                class="pa-0"
                height="100%"
                x-small
                tile
                @click="inputCalendarClick(2)"
              >
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </v-card>
            <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
              担当者
            </v-card>
            <v-card class="koumokuData" tile style="width: 125px" outlined>
              担当者名
            </v-card>
            <v-layout class="right">
              <v-btn class="itemBtn mr-1" @click="copyClicked()">
                前回コピー
              </v-btn>
              <v-btn class="itemBtn" @click="rirekiClicked()"> 履歴参照 </v-btn>
            </v-layout>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div style="width: 50%">
              <v-card class="koumokuTitle_c pa-1" outlined tile>
                総合的な援助の方針
              </v-card>
              <v-card
                class="koumokuData2 pa-1"
                outlined
                tile
                :ripple="false"
                @click="inputClicked(0)"
              >
                {{ getHousin }}
              </v-card>
            </div>
            <div style="width: 50%">
              <v-card class="koumokuTitle_c pa-1" outlined tile>
                全体の状況
              </v-card>
              <v-card
                class="koumokuData2 pa-1"
                outlined
                tile
                :ripple="false"
                @click="inputClicked(1)"
              >
                {{ getJyoukyou }}
              </v-card>
            </div>
          </v-row>

          <v-row class="ma-0 mt-1" no-gutters>
            <wj-flex-grid
              id="icrnGrid"
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
              :formatItem="onFormatItem"
              :itemsSourceChanging="onItemsSourceChanging"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewdataAll.viewdata"
            >
            </wj-flex-grid>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-layout class="right">
              <v-spacer></v-spacer>
              <v-card class="koumokuTitleShort pa-1 mr-1" outlined tile>
                結果
              </v-card>
              <v-btn-toggle
                class="flex-wrap mr-1"
                v-model="kekkaIndex"
                mandatory
              >
                <v-btn
                  v-for="n in kekkaList"
                  :key="n.val"
                  small
                  color="secondary"
                  dark
                  outlined
                  @click="kekkaClicked(n.val)"
                >
                  {{ n.name }}
                </v-btn>
              </v-btn-toggle>
              <v-layout class="rowStyle" v-if="kekkaIndex == 3">
                <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
                  ｻｰﾋﾞｽ終了日
                </v-card>
                <v-btn
                  @click="inputCalendarClick(8)"
                  tile
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
                <v-card class="koumokuTitle pa-1 mr-1" outlined tile>
                  次回案作成月
                </v-card>
                <v-btn
                  @click="inputCalendarClick(9)"
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

              <v-card class="koumokuTitleShort pa-1 mr-1" outlined tile>
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
                style="width: 100px"
                outlined
                tile
              >
              </v-card>
              <v-btn
                class="itemBtn"
                :loading="loading"
                @click="searchClicked()"
              >
                登録
              </v-btn>
            </v-layout>
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
        id="monitoringHoukokushoDatepicker"
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
        id="monitoringHoukokushoDatepicker"
        type="date"
        v-model="pickerKanryou"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="daySelect(1)"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="housinInputflg" width="500" class="inputDialog">
      <v-card
        class="koumokuTitle_c pa-1"
        style="background: lightgray"
        outlined
        tile
      >
        総合的な援助の方針
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close(0)"
          class="closeButton"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
      </v-card>
      <v-textarea
        class="ma-0 pa-0"
        no-resize
        v-model="viewdataAll.housin"
        height="500"
        hide-details
        solo
        flat
        dense
        outlined
      ></v-textarea>
    </v-dialog>
    <v-dialog v-model="jyoukyouInputflg" width="500" class="inputDialog">
      <v-card
        class="koumokuTitle_c pa-1"
        style="background: lightgray"
        outlined
        tile
      >
        全体の状況
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close(1)"
          class="closeButton"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
      </v-card>
      <v-textarea
        class="ma-0 pa-0"
        no-resize
        v-model="viewdataAll.jyoukyou"
        height="500"
        hide-details
        solo
        flat
        dense
        outlined
      ></v-textarea>
    </v-dialog>
    <v-dialog v-model="douiInputflg" width="350" class="inputDialog">
      <v-card
        class="koumokuTitle_c pa-1"
        style="background: lightgray"
        outlined
        tile
      >
        モニタリング 利用者同意・署名
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="header_dialog_close(2)"
          class="closeButton"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
      </v-card>
      <div style="background: white" class="pa-1">
        <v-row no-gutters class="inputDialogRowStyle mb-1">
          <v-card class="koumokuTitle pa-1" outlined tile> 利用者名 </v-card>
          <v-card class="koumokuData ml-1 pl-1" tile outlined>
            {{ userData.riyocodeD }} {{ userData.names }}
          </v-card>
        </v-row>
        <v-row no-gutters class="inputDialogRowStyle mb-1">
          <v-card class="koumokuTitle pa-1 mr-1" outlined tile> 同意日 </v-card>
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
        <v-row no-gutters class="inputDialogRowStyle mb-1">
          <v-card class="koumokuTitle pa-1 mr-1" outlined tile> 様式 </v-card>
          <v-btn-toggle
            class="flex-wrap mr-1"
            v-model="viewdataAll.douiKbnIndex"
            mandatory
          >
            <v-btn
              v-for="n in douiKbnList"
              :key="n.val"
              small
              color="secondary"
              dark
              outlined
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-row>
        <v-row no-gutters class="inputDialogRowStyle mb-1">
          <v-card class="koumokuTitle pa-1 mr-1" outlined tile> 署名 </v-card>
          <input class="pl-1" type="text" v-model="viewdataAll.douiSyomei" />
        </v-row>
        <v-row no-gutters class="inputDialogRowStyle">
          <v-layout class="left">
            <v-btn class="itemBtn mr-1" @click="copyClicked()"> 削除 </v-btn>
          </v-layout>
          <v-layout class="right">
            <v-btn class="itemBtn mr-1" @click="copyClicked()"> 登録 </v-btn>
          </v-layout>
        </v-row>
      </div>
    </v-dialog>
    <v-dialog
      v-model="datepickerDouiYmd_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="monitoringHoukokushoDatepicker"
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
import moment from 'moment';
// import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import UserList from '../components/UserList.vue';
export default {
  components: { UserList },
  data() {
    return {
      userList: [],
      userData: {},
      keikakuYmd: '',
      headerList: [
        {
          dataname: 'jissi',
          title: '実施',
          kbntitle: '',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'mokuhyo',
          title: '支援目標',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'jiki',
          title: '達成時期',
          kbntitle: '',
          width: '5*',
          align: 'left',
        },
        {
          dataname: 'jyoukyou',
          title: 'サービス提供状況\n(事業所からの聞取り)',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'manzokudo',
          title: '本人の感想・満足度',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'tasseikan',
          title: '支援目標の達成感\n(ニーズの充足度)',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'kaiketuhouhou',
          title: '今後の課題・解決方法',
          kbntitle: '',
          width: '10*',
          align: 'left',
        },
        {
          dataname: 'kind1',
          kbntitle: '計画変更の必要性',
          title: '種類',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'kind2',
          kbntitle: '計画変更の必要性',
          title: '種類',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'ryou1',
          kbntitle: '計画変更の必要性',
          title: '量',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'ryou2',
          kbntitle: '計画変更の必要性',
          title: '量',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'syukan1',
          kbntitle: '計画変更の必要性',
          title: '週間',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'syukan2',
          kbntitle: '計画変更の必要性',
          title: '週間',
          width: '2*',
          align: 'center',
        },
        {
          dataname: 'other',
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
      housinInputflg: false,
      jyoukyouInputflg: false,
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
      leftWidth: '280px',
    };
  },
  mounted() {},
  computed: {
    getDouisya() {
      return wjCore.escapeHtml(this.viewdataAll.douiName);
    },
    getHousin() {
      return wjCore.escapeHtml(this.viewdataAll.housin);
    },
    getJyoukyou() {
      return wjCore.escapeHtml(this.viewdataAll.jyoukyou);
    },
  },
  methods: {
    /*******************************
     * ユーザー一覧コンポーネントの開閉ボタンを押下
     */
    changeLeftArea() {
      let doc = document.getElementsByClassName('rightArea')[0];
      if (this.moveLeft == true) {
        this.moveLeft = false;
        doc.style.minWidth = '78%';
        doc.style.maxWidth = '78%';
        this.leftWidth = '280px';
      } else {
        this.moveLeft = true;
        doc.style.minWidth = '97%';
        doc.style.maxWidth = '97%';
        this.leftWidth = '14px';
      }
    },
    onInitializeIcrnGrid(flexGrid) {
      // flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          if (ht.col == 0) {
            flexGrid.refreshRange(new wjGrid.CellRange(ht.row, 3, ht.row, 13));
          }
          if (tmpitem.jissi) {
            if (ht.col == 7 || ht.col == 8) {
              if (ht.col == 7 && tmpitem.kind == 0) {
                tmpitem.kind = 1;
              } else if (ht.col == 8 && tmpitem.kind == 1) {
                tmpitem.kind = 0;
              }
              flexGrid.refreshRange(new wjGrid.CellRange(ht.row, 7, ht.row, 8));
            }
            if (ht.col == 9 || ht.col == 10) {
              if (ht.col == 9 && tmpitem.ryou == 0) {
                tmpitem.ryou = 1;
              } else if (ht.col == 10 && tmpitem.ryou == 1) {
                tmpitem.ryou = 0;
              }
              flexGrid.refreshRange(
                new wjGrid.CellRange(ht.row, 9, ht.row, 10)
              );
            }
            if (ht.col == 11 || ht.col == 12) {
              if (ht.col == 11 && tmpitem.syukan == 0) {
                tmpitem.syukan = 1;
              } else if (ht.col == 12 && tmpitem.syukan == 1) {
                tmpitem.syukan = 0;
              }
              flexGrid.refreshRange(
                new wjGrid.CellRange(ht.row, 11, ht.row, 12)
              );
            }
          }
        }
      });

      flexGrid.beginningEdit.addHandler((s, e) => {
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
        if (colIndex == 0) {
          col.dataType = 'Boolean';
        }
        if (7 <= colIndex && colIndex <= 12) {
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
      // flexGrid.endUpdate();
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
      if (e.panel == flexGrid.cells) {
        e.cell.style.backgroundColor = '';
        if (e.col == 0) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
        }
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (tmpitem.jissi) {
          if (e.col == 7 || e.col == 8) {
            // チェック済み側
            if (tmpitem.kind == 1 && e.col == 7) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
            } else if (tmpitem.kind == 0 && e.col == 8) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
            }
            // 未チェック側
            if (tmpitem.kind == 0 && e.col == 7) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
            } else if (tmpitem.kind == 1 && e.col == 8) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
            }
          }
          if (e.col == 9 || e.col == 10) {
            // チェック済み側
            if (tmpitem.ryou == 1 && e.col == 9) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
            } else if (tmpitem.ryou == 0 && e.col == 10) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
            }
            // 未チェック側
            if (tmpitem.ryou == 0 && e.col == 9) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
            } else if (tmpitem.ryou == 1 && e.col == 10) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
            }
          }
          if (e.col == 11 || e.col == 12) {
            // チェック済み側
            if (tmpitem.syukan == 1 && e.col == 11) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
            } else if (tmpitem.syukan == 0 && e.col == 12) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridErrBackground;
            }
            // 未チェック側
            if (tmpitem.syukan == 0 && e.col == 11) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
            } else if (tmpitem.syukan == 1 && e.col == 12) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
            }
          }
          if ((3 <= e.col && e.col <= 6) || e.col == 13) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridSelectedColor;
          }
        } else {
          if (3 <= e.col) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          }
        }
      }
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        // uketukeIcrn(this.targetYmd).then((result) => {
        //   this.viewdataAll = result;
        //   this.userFilter();
        //   this.screenFlag = false;
        // });
      }
      this.createdemodata();
    },
    createdemodata() {
      let result = {};
      result.doui = false;
      result.douiName = '';
      result.douiKbnIndex = 1;
      result.douiSyomei = '';
      result.housin =
        '本人の希望する生活の実現と安心した地域での生活を構築する';
      result.jyoukyou =
        '公的なサービス導入により生活が安定。一人で買い物に行くようになるなどの生活意欲が向上してきている。事務所や近隣住民、商店などとの関係も良好で、買い物に行くと転院がお財布から必要な金額を取りレシートを入れてくれるようになり、銀行でも本人が行くと職員が来てくれるようになったので、一人での外出が増えている';

      result.kanryou = false;
      result.viewdata = [];
      for (let i = 0; i < 5; i++) {
        result.viewdata.push({
          jissi: true,
          mokuhyo: '',
          jiki: '6か月',
          jyoukyou: 'たちつてと',
          manzokudo: 'なにぬねの',
          tasseikan: 'はひふへほ',
          kaiketuhouhou: 'まみむめも',
          kind: i % 2,
          kind1: '有',
          kind2: '無',
          ryou: i % 2,
          ryou1: '有',
          ryou2: '無',
          syukan: i % 2,
          syukan1: '有',
          syukan2: '無',
          other: 'らりるれろ',
        });
        if (i == 0) {
          result.viewdata[i].mokuhyo =
            '体制を整えることで、緊急事態に対応できるようにする';
          result.viewdata[i].jyoukyou =
            '月に1～2回は電話があるが、電話で話せば落ち着くことが多い。実際に訪問するのは月1回あるかどうか。';
        }
        if (i == 1) {
          result.viewdata[i].mokuhyo =
            '食事や入浴を安心してきちんと行えるようになる';
        }
        if (i == 2) {
          result.viewdata[i].mokuhyo =
            '地域のルールに従ったゴミの出し方を覚える';
        }
      }

      this.viewdataAll = result;
    },
    getYmd() {
      if (!this.kikanYmd) {
        this.kikanYmd = moment();
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
        this.kikanKanryou = moment();
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
        this.douiYmd = moment();
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
        let split = this.picker.split('-');
        this.kikanYmd = moment({
          years: split[0],
          months: Number(split[1]) - 1,
          days: Number(split[2]),
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        this.viewdatayoteisya = [];
        this.datepicker_dialog = false;
      } else if (kbn == 1) {
        let split = this.pickerKanryou.split('-');
        this.kikanKanryou = moment({
          years: split[0],
          months: Number(split[1]) - 1,
          days: split[2],
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        this.datepickerKanryouYmd_dialog = false;
      } else if (kbn == 2) {
        let split = this.pickerDoui.split('-');
        this.douiYmd = moment({
          years: split[0],
          months: Number(split[1]) - 1,
          days: split[2],
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        this.datepickerDouiYmd_dialog = false;
      }
    },
    monthSelect() {
      let split = this.pickerKanryou.split('-');
      this.kikanKanryou = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      // this.viewdatakeikaku = [];
      this.datepickerKanryouYm_dialog = false;
    },
    setUserSelectPoint(row) {
      // ユーザ選択処理はここで行う
      this.userData = row;
      this.keikakuYmd = '2022年12月12日';
      this.setViewData(true);
      // this.userInfo = row;
      // if (this.userInfo.riid == 0) {
      //   this.dispUserName = '';
      // } else {
      //   this.dispUserName =
      //     String(this.userInfo.riyocode).padStart(7, '0') +
      //     ' ' +
      //     this.userInfo.names +
      //     ' (' +
      //     this.userInfo.age +
      //     '歳）';
      // }
      // this.rirekiSearchClicked(
      //   this.kikanSymd.format('YYYYMMDD'),
      //   this.kikanEymd.format('YYYYMMDD'),
      //   this.userInfo.riid
      // );
    },
    getSelectUserChildComponent(data) {
      this.userList = data;
    },
    copyClicked(kbn) {
      console.log(kbn);
    },
    rirekiClicked(kbn) {
      console.log(kbn);
    },
    inputClicked(kbn) {
      if (!this.userData.names) {
        return;
      }
      if (kbn == 0) {
        this.housinInputflg = true;
      } else if (kbn == 1) {
        this.jyoukyouInputflg = true;
      }
    },
    douiCheck() {
      if (this.viewdataAll.doui) {
        this.douiInputflg = true;
      }
    },
    header_dialog_close(kbn) {
      if (kbn == 0) {
        this.housinInputflg = false;
      } else if (kbn == 1) {
        this.jyoukyouInputflg = false;
      } else if (kbn == 2) {
        this.douiInputflg = false;
      }
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
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .rightArea {
    min-width: 78%;
    max-width: 78%;
    // width: 1020px;
    .rowStyle {
      height: 22px;
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

  .ymd,
  .v-btn:not(.addbtn, .itemBtn) {
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
  .koumokuTitleShort {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    min-width: 50px;
    max-width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuData {
    color: $font_color;
    width: 200px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuTitle_c {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 300px;
    height: 20px;
    text-align: center;
    background: $view_Title_background;
  }
  .koumokuData2 {
    color: $font_color;
    width: 100%;
    text-align: left;
    background: $white;
    white-space: pre-line; // 改行を反映させる
    overflow: auto;
    height: 130px;
  }
  .left {
    height: 100%;
    display: flex;
    justify-content: flex-start;
  }
  .right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
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
    // width: auto;
    // min-width: 1250px;
    height: 48vh;
    // min-height: 300px;
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
    // .wj-cell {
    //   padding: 2px;
    // }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
    }
    // .wj-cells
    //   .wj-row:hover
    //   .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    //   transition: all 0s;
    //   background: $grid_hover_background;
    // }

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

  .v-btn-toggle > .v-btn {
    height: 20px;
  }
}
.inputDialog {
  width: 300px;
  height: 300px;
}
.inputDialogRowStyle {
  height: 22px;
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  .koumokuData {
    color: $font_color;
    width: 200px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
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
  .v-btn-toggle > .v-btn {
    height: 20px;
  }
  input[type='text'] {
    width: 200px;
    height: 100%;
    text-align: left;
    border: 1px solid lightgray;
  }

  input:focus {
    border: 1px solid #ff9900;
    outline: 0;
  }
  .right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .itemBtn {
    font-size: 14px;
    background: $btn_background;
    border: thin solid;
    border-color: $light-gray;
    color: $font_color;
    height: 100% !important;
    width: 75px;
  }
}
.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#monitoringHoukokushoDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 500px;
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
</style>
