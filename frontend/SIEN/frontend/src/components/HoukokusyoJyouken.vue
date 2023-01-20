<template>
  <div id="houkokusyoJyouken">
    <v-container no-gutters fluid class="container pa-1">
      <v-row no-gutters>
        <v-col id="leftArea" class="pa-1">
          <v-row no-gutters class="rowStyle_Input">
            <v-card class="koumokuTitle wMin titleMain pa-1" outlined tile>
              コード
            </v-card>
            <input
              id="code"
              type="text"
              class="ml-1"
              style="width: 40px; text-align: center"
              v-model="selectedViewDataChohyo.ptncd"
              @input="numbervalidate(0)"
            />
          </v-row>
          <v-row no-gutters class="mt-1" style="height: 50px">
            <v-card class="koumokuTitle wMin titleMain pa-1" outlined tile>
              帳票名
            </v-card>
            <textarea
              class="ma-0 pa-0 pl-1 ml-1"
              v-model="selectedViewDataChohyo.name"
              height="100%"
              row-height="2"
            ></textarea>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-btn class="mr-1" width="75" height="25" @click="clrClicked(0)">
              クリア
            </v-btn>
            <v-btn class="" width="75" height="25" @click="delClicked(0)">
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mr-1" width="75" height="25" @click="addClicked(0)">
              登録
            </v-btn>
          </v-row>
          <v-row no-gutters class="ma-0 mt-1">
            <wj-flex-grid
              id="houkokusyoJyoukenicrnGrid"
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
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewDataChohyo"
              :showMarquee="true"
            >
            </wj-flex-grid>
          </v-row>
        </v-col>
        <v-col id="centerArea" class="ml-1 pa-1">
          <v-row no-gutters class="rowStyle_Input">
            <v-card class="koumokuTitle titleMainGreen pa-1" outlined tile>
              帳票名
            </v-card>
            <v-card
              class="koumokuData ml-1"
              tile
              outlined
              width="40"
              style="text-align: center"
            >
              {{ selectedViewDataChohyo.ptncdD }}
            </v-card>
            <v-card class="koumokuData pl-1 ml-1" tile outlined width="390">
              {{ selectedViewDataChohyo.nameD }}
            </v-card>
          </v-row>
          <v-divider
            class="mb-1 mt-1"
            style="border: 1px solid #187b51"
          ></v-divider>
          <v-row no-gutters class="rowStyle_Input">
            <v-card class="koumokuTitle titleGreenDark pa-1" outlined tile>
              コード
            </v-card>
            <input
              id="code"
              type="text"
              class="ml-1"
              style="width: 50px; text-align: center"
              v-model="selectedViewDataZumi.buhinCd"
              @input="numbervalidate(1)"
            />
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-card class="koumokuTitle titleGreenDark pa-1" outlined tile>
              集計内容
            </v-card>
            <input
              id="code"
              type="text"
              class="ml-1 pl-1"
              style="width: 200px; text-align: left"
              v-model="selectedViewDataZumi.buhinName"
            />
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-card class="koumokuTitle titleGreenDark pa-1" outlined tile>
              第１条件
            </v-card>
            <input
              id="houkokusyoJyoukenJyouken1"
              type="text"
              class="ml-1 pl-1"
              style="width: 200px; text-align: left"
              v-model="selectedViewDataZumi.zKmkName"
              readonly
              @click="inputclick(0)"
            />
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col
              style="width: 49%; max-width: 49%; min-width: 49%"
              class="mr-1"
            >
              <v-row
                no-gutters
                class="rowStyle_Input"
                style="background: #6dc928"
              >
                <v-spacer></v-spacer>
                <v-card
                  class="koumokuTitle titleGreenDark w120 pa-1"
                  outlined
                  tile
                  style="border: none"
                >
                  集計項目【縦】
                </v-card>
                <v-card
                  class="koumokuData pl-1 ml-1 mr-1"
                  style="margin-top: 2px; text-align: center"
                  height="85%"
                  tile
                  outlined
                  width="50"
                >
                  {{ '2/2' }}
                </v-card>
              </v-row>
              <v-row no-gutters class="rowStyle_Input mt-1">
                <input
                  id="houkokusyoJyoukenTate"
                  type="text"
                  class="pl-1"
                  style="width: 100%; text-align: left"
                  v-model="selectedViewDataZumi.yKmkName"
                  readonly
                  @click="inputclick(1)"
                />
              </v-row>
              <v-row no-gutters class="mt-1">
                <select
                  class="customSelectBox pl-1"
                  style="width: 100%; height: 150px"
                  size="6"
                >
                  <option
                    v-for="val in viewTateList"
                    :key="val.id"
                    :value="val.name"
                  >
                    {{ val.name }}
                  </option>
                </select>
              </v-row>
            </v-col>
            <v-col style="width: 49%; max-width: 49%; min-width: 49%">
              <v-row
                no-gutters
                class="rowStyle_Input"
                style="background: #6dc928"
              >
                <v-spacer></v-spacer>
                <v-card
                  class="koumokuTitle titleGreenDark w120 pa-1"
                  outlined
                  tile
                  style="border: none"
                >
                  集計項目【横】
                </v-card>
                <v-card
                  class="koumokuData ml-1 mr-1"
                  style="margin-top: 2px; text-align: center"
                  height="85%"
                  tile
                  outlined
                  width="50"
                >
                  {{ '99/99' }}
                </v-card>
              </v-row>
              <v-row no-gutters class="rowStyle_Input mt-1">
                <input
                  id="houkokusyoJyoukenYoko"
                  type="text"
                  class="pl-1"
                  style="width: 100%; text-align: left"
                  v-model="selectedViewDataZumi.xKmkName"
                  readonly
                  @click="inputclick(2)"
                />
              </v-row>
              <v-row no-gutters class="mt-1">
                <select
                  class="customSelectBox pl-1"
                  style="width: 100%; height: 150px"
                  size="6"
                >
                  <option
                    v-for="val in viewYokoList"
                    :key="val.id"
                    :value="val.name"
                  >
                    {{ val.name }}
                  </option>
                </select>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col
              style="width: 100px; max-width: 100px; min-width: 100px"
              class="mr-1"
            >
              <v-row no-gutters style="background: #6dc928; height: 50px">
                <v-card
                  class="koumokuTitle titleGreenDark w120 pa-1"
                  outlined
                  tile
                >
                  集計条件
                </v-card>
              </v-row>
            </v-col>
            <v-col
              style="width: 200px; max-width: 200px; min-width: 200px"
              class="mr-1"
            >
              <v-row no-gutters class="rowStyle_Input">
                <div
                  v-for="item in syukeiJyoukenList"
                  :key="item.val"
                  class="radioInline"
                  style="width: 70px"
                >
                  <input
                    type="radio"
                    :id="'rbhoukokusyoJyouken-' + item.val"
                    v-model="selSyukeiJyouken"
                    :value="item.val"
                  />
                  <!-- @change="grdDispChangeclick()" -->
                  <label
                    :for="'rbhoukokusyoJyouken-' + item.val"
                    class="customRadio mr-2"
                    style="top: -8px"
                  >
                    <span>{{ item.name }}</span>
                  </label>
                </div>
              </v-row>
              <v-row no-gutters class="rowStyle_Input">
                <div
                  v-for="item in syukeiJyoukenCbList"
                  :key="'cbhoukokusyoJyouken-' + item.val"
                  class="checkboxInline"
                >
                  <input
                    type="checkbox"
                    :id="'cbhoukokusyoJyouken-' + item.val"
                    :value="item.val"
                    v-model="selSyukeiJyoukenCb"
                  />
                  <!-- @change="taisyousyaYoteiListClick" -->
                  <label
                    :for="'cbhoukokusyoJyouken-' + item.val"
                    class="customCheckbox mr-2"
                    style="top: -8px"
                  >
                    <span>{{ item.name }}</span>
                  </label>
                </div>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-btn class="mr-1" width="75" height="25" @click="clrClicked(1)">
              クリア
            </v-btn>
            <v-btn class="mr-1" width="75" height="25" @click="addClicked">
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mr-1" width="75" height="25" @click="addClicked">
              登録
            </v-btn>
          </v-row>
          <v-divider
            class="mb-1 mt-1"
            style="border: 1px solid #187b51"
          ></v-divider>
          <v-row no-gutters class="mt-1">
            <v-col
              style="width: 80%; max-width: 80%; min-width: 80%"
              class="mr-1"
            >
              <v-row no-gutters class="ma-0">
                <wj-flex-grid
                  id="houkokusyoJyoukenZumiGrid"
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
                  :initialized="onInitializeZumiGrid"
                  :itemsSourceChanged="onItemsSourceChanged"
                  :itemsSource="viewDataZumi"
                  :showMarquee="true"
                  :isReadOnly="true"
                >
                </wj-flex-grid>
              </v-row>
            </v-col>
            <v-col style="width: 75px; max-width: 75px; min-width: 75px">
              <v-row no-gutters class="rowStyle_Input">
                <v-btn width="75" height="25" @click="addClicked">
                  順変更
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col id="rightArea" class="ml-1 pa-1">
          <v-row no-gutters class="rowStyle_Input">
            <div
              v-for="item in syukeiKoumokuList"
              :key="item.val"
              class="radioInline"
              style="width: 90px"
            >
              <input
                type="radio"
                :id="'rbhoukokusyoJyoukenKoumoku-' + item.val"
                v-model="selSyukeiKoumoku"
                @change="rbChangeclick()"
                :value="item.val"
              />
              <label
                :for="'rbhoukokusyoJyoukenKoumoku-' + item.val"
                class="customRadio mr-2"
                style="top: -8px"
              >
                <span>{{ item.name }}</span>
              </label>
            </div>
          </v-row>
          <v-row no-gutters class="ma-0 mt-1">
            <wj-flex-grid
              id="houkokusyoJyoukenSelect1Grid"
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
              :initialized="onInitializeSelect1Grid"
              :itemsSourceChanged="onItemsSourceChangedSelect1Grid"
              :itemsSource="viewDataSelect1"
              :showMarquee="true"
              :isReadOnly="true"
            >
            </wj-flex-grid>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-card
              v-show="dispMisentaku"
              class="koumokuTitle pa-1"
              outlined
              tile
              width="300"
              style="color: red; background: transparent; border: none"
            >
              ※未選択項目があります
            </v-card>
            <v-spacer></v-spacer>
            <div
              v-for="item in koumokuSentakuCbList"
              :key="'cbhoukokusyoJyoukenKoumokusentaku-' + item.val"
              class="checkboxInline"
            >
              <input
                type="checkbox"
                :id="'cbhoukokusyoJyoukenKoumokusentaku-' + item.val"
                :value="item.val"
                v-model="selKKoumokuSentakuCb"
                @change="sentakuChange"
              />
              <label
                :for="'cbhoukokusyoJyoukenKoumokusentaku-' + item.val"
                class="customCheckbox mr-2"
                style="top: -8px"
              >
                <span>{{ item.name }}</span>
              </label>
            </div>
          </v-row>
          <v-row no-gutters class="ma-0 mt-1">
            <wj-flex-grid
              id="houkokusyoJyoukenSelect2Grid"
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
              :initialized="onInitializeSelect2Grid"
              :formatItem="onFormatItemSelect2Grid"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewDataSelect2"
              :showMarquee="true"
              :isReadOnly="true"
            >
            </wj-flex-grid>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import dayjs from 'dayjs';
// import 'dayjs/locale/ja';
import Vue from 'vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import messageConst from '@/utiles/MessageConst';
import printUtil from '@/utiles/printUtil';
import { getConnect } from '@connect/getConnect';
import { deleteConnect } from '@connect/deleteConnect';
import { postConnect } from '@connect/postConnect';
import { putConnect } from '@connect/putConnect';

const UTIWAKE_KBN = {
  Dai: 0,
  Chu: 1,
  Sho: 2,
};

const SELECTED_TEXTBOX = {
  Jyouken1: 0,
  Tate: 1,
  Yoko: 2,
};

export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {},
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      headerListChohyo: [
        {
          dataname: 'ptncdD',
          title: 'コード',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '報告書帳票名一覧',
          width: '*',
          align: 'left',
        },
      ],
      headerListZumi: [
        {
          dataname: 'buhinNo',
          title: 'No',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'buhinCdD',
          title: 'コード',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'buhinName',
          title: '登録済集計内容',
          width: '*',
          align: 'left',
        },
      ],
      headerListSelect1: [
        {
          dataname: 'name',
          title: '項目名',
          width: 150,
          align: 'left',
        },
        {
          dataname: 'gamenRyaku',
          title: '集計根拠',
          width: 60,
          align: 'center',
        },
        {
          dataname: 'konkyo',
          title: '集計根拠',
          width: '*',
          align: 'left',
        },
      ],
      headerListSelect2: [
        {
          dataname: 'codeD',
          title: '集計項目名',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'nameD',
          title: '集計項目名',
          width: '*',
          align: 'left',
        },
        {
          dataname: 'select',
          title: '選',
          width: 30,
          align: 'center',
        },
      ],
      mainGrid: {},
      kouseiGrid: {},
      thickList: [2, 9],
      syuuryouList: [
        { rnd2: 1, name: '以下' },
        { rnd2: 2, name: '未満' },
      ],
      viewDataChohyo: [],
      selectedViewDataChohyo: {},
      selectedViewDataZumi: {},
      viewDataZumiAll: {},
      viewDataZumi: [],
      selSyukeiJyouken: 0,
      syukeiJyoukenList: [
        { val: 0, name: '延人数' },
        { val: 1, name: '実人数' },
      ],
      selSyukeiJyoukenCb: 0,
      syukeiJyoukenCbList: [{ val: 0, name: '期間内利用者のみ集計する' }],
      selKKoumokuSentakuCb: 0,
      koumokuSentakuCbList: [{ val: 0, name: '項目選択' }],
      zumiGrid: {},
      select1Grid: {},
      select2Grid: {},
      selSyukeiKoumoku: 0,
      selectedTextBox: SELECTED_TEXTBOX.Jyouken1,
      syukeiKoumokuList: [
        { val: 0, name: '第一条件' },
        { val: 1, name: '固定情報' },
        { val: 2, name: '相談項目' },
        { val: 3, name: '受付項目' },
      ],
      viewDataSelect1All: [],
      viewDataSelect1: [],
      viewTateList: null,
      viewDataSelect2: [],
      viewYokoList: null,
      dispMisentaku: false,
    };
  },
  mounted() {
    this.getChohyoData();
    this.setMstSyukei_sentaku();
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.setPrintEvent();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('leftArea') != null) {
        document.getElementById('leftArea').style.height =
          window.innerHeight - 80 + 'px';
      }
      if (document.getElementById('houkokusyoJyoukenicrnGrid') != null) {
        document.getElementById('houkokusyoJyoukenicrnGrid').style.height =
          window.innerHeight - 200 + 'px';
      }
      if (document.getElementById('centerArea') != null) {
        document.getElementById('centerArea').style.height =
          window.innerHeight - 80 + 'px';
      }
      if (document.getElementById('houkokusyoJyoukenZumiGrid') != null) {
        document.getElementById('houkokusyoJyoukenZumiGrid').style.height =
          window.innerHeight - 510 + 'px';
      }
      if (document.getElementById('rightArea') != null) {
        document.getElementById('rightArea').style.height =
          window.innerHeight - 80 + 'px';
      }
      if (document.getElementById('houkokusyoJyoukenSelect2Grid') != null) {
        document.getElementById('houkokusyoJyoukenSelect2Grid').style.height =
          window.innerHeight - 400 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    onInitializeIcrnGrid(flexGrid) {
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          this.selectedViewDataChohyo = flexGrid.cells.rows[ht.row].dataItem;
          this.getSyukeiViewData(this.selectedViewDataChohyo.ptnid);
        }
      });

      this.mainGrid = flexGrid;

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.cells.rows.defaultSize = 30;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.headerListChohyo.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerListChohyo[colIndex].dataname;
        col.header = this.headerListChohyo[colIndex].title;
        col.width = this.headerListChohyo[colIndex].width;
        col.align = this.headerListChohyo[colIndex].align;
        col.multiLine = true;

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerListChohyo[colIndex].title
        );
      }
    },
    onInitializeZumiGrid(flexGrid) {
      this.zumiGrid = flexGrid;
      // クリックイベント
      let self = this;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          /*
           * 登録済みを選択
           * 第一条件に指定されたマスタを表示する
           */
          self.selectedViewDataZumi = flexGrid.cells.rows[ht.row].dataItem;
          self.selSyukeiJyouken = self.selectedViewDataZumi.ninflg;
          self.selSyukeiJyoukenCb = self.selectedViewDataZumi.riyoflg;

          let jyouken1 = self.viewDataSelect1All.filter(
            (e) => e.id == self.selectedViewDataZumi.zid
          );
          if (jyouken1.length > 0) {
            self.selectedViewDataZumi.jyouken1Item = jyouken1[0];
          } else {
            self.selectedViewDataZumi.jyouken1Item = null;
          }
          let yoko = self.viewDataSelect1All.filter(
            (e) => e.id == self.selectedViewDataZumi.xid
          );
          if (yoko.length > 0) {
            self.selectedViewDataZumi.yokoItem = yoko[0];
          } else {
            self.selectedViewDataZumi.yokoItem = null;
          }

          let tate = self.viewDataSelect1All.filter(
            (e) => e.id == self.selectedViewDataZumi.yid
          );
          if (tate.length > 0) {
            self.selectedViewDataZumi.tateItem = tate[0];
          } else {
            self.selectedViewDataZumi.tateItem = null;
          }

          let selrow = -1;
          if (self.selectedViewDataZumi.zid == 0) {
            this.setviewDataSelect2(null);
          } else {
            let tmpitem;
            for (
              selrow = 0;
              selrow < self.select1Grid.cells.rows.length;
              selrow++
            ) {
              tmpitem = self.select1Grid.cells.rows[selrow].dataItem;
              if (self.selectedViewDataZumi.zid == tmpitem.id) {
                self.selectedViewDataZumi.jyouken1Item = tmpitem;
                break;
              }
            }
          }
          // 第一条件をアクティブ化
          this.inputclick(0);
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.headerListZumi.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerListZumi[colIndex].dataname;
        col.header = this.headerListZumi[colIndex].title;
        col.width = this.headerListZumi[colIndex].width;
        col.align = this.headerListZumi[colIndex].align;
        col.multiLine = true;
      }
    },
    onInitializeSelect1Grid(flexGrid) {
      this.select1Grid = flexGrid;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          this.setviewDataSelect2(flexGrid.cells.rows[ht.row].dataItem);
          if (this.selSyukeiKoumoku == 0) {
            this.selectedViewDataZumi.jyouken1Item =
              flexGrid.cells.rows[ht.row].dataItem;
            this.selectedViewDataZumi.zKmkName =
              flexGrid.cells.rows[ht.row].dataItem.name;
          } else {
            if (this.selectedTextBox == SELECTED_TEXTBOX.Tate) {
              this.selectedViewDataZumi.tateItem =
                flexGrid.cells.rows[ht.row].dataItem;
              this.selectedViewDataZumi.yKmkName =
                flexGrid.cells.rows[ht.row].dataItem.name;
              this.viewTateList = this.getNewSelect2List();
            } else if (this.selectedTextBox == SELECTED_TEXTBOX.Yoko) {
              this.selectedViewDataZumi.yokoItem =
                flexGrid.cells.rows[ht.row].dataItem;
              this.selectedViewDataZumi.xKmkName =
                flexGrid.cells.rows[ht.row].dataItem.name;
              this.viewYokoList = this.getNewSelect2List();
            }
          }
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.headerListSelect1.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerListSelect1[colIndex].dataname;
        col.header = this.headerListSelect1[colIndex].title;
        col.width = this.headerListSelect1[colIndex].width;
        col.align = this.headerListSelect1[colIndex].align;
        col.multiLine = true;
      }
    },
    onInitializeSelect2Grid(flexGrid) {
      this.select2Grid = flexGrid;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 2 && this.selKKoumokuSentakuCb == 1) {
            let select = flexGrid.getCellData(ht.row, 2);
            let targetitem = flexGrid.cells.rows[ht.row].dataItem;
            for (let row = 0; row < flexGrid.cells.rows.length; row++) {
              let tmpitem = flexGrid.cells.rows[row].dataItem;
              if (
                targetitem.UtiwakeKbn == UTIWAKE_KBN.Dai &&
                targetitem.daiID == tmpitem.daiID
              ) {
                flexGrid.setCellData(row, 2, '');
              }
              if (
                targetitem.UtiwakeKbn == UTIWAKE_KBN.Chu &&
                targetitem.daiID == tmpitem.daiID &&
                tmpitem.chuID == 0
              ) {
                flexGrid.setCellData(row, 2, '');
              }
            }

            if (select == '○') {
              flexGrid.setCellData(ht.row, 2, '');
            } else {
              flexGrid.setCellData(ht.row, 2, '○');
            }

            if (this.selectedTextBox == SELECTED_TEXTBOX.Tate) {
              this.viewTateList = this.getNewSelect2List();
            } else if (this.selectedTextBox == SELECTED_TEXTBOX.Yoko) {
              this.viewYokoList = this.getNewSelect2List();
            }
          }
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.headerListSelect2.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerListSelect2[colIndex].dataname;
        col.header = this.headerListSelect2[colIndex].title;
        col.width = this.headerListSelect2[colIndex].width;
        col.align = this.headerListSelect2[colIndex].align;
        col.multiLine = true;
      }
    },
    onFormatItemSelect2Grid(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        e.cell.style.backgroundColor = '';
        if (e.col == 2 && this.selKKoumokuSentakuCb == 1) {
          e.cell.style.backgroundColor = sysConst.COLOR.white;
        }
      }
    },

    onItemsSourceChanged(flexGrid) {
      this.grdAutoSizeRow(flexGrid);
    },
    onItemsSourceChangedSelect1Grid(flexGrid) {
      flexGrid.autoSizeRows();
      let selId = 0;
      if (
        this.selectedTextBox == SELECTED_TEXTBOX.Jyouken1 &&
        this.selectedViewDataZumi.jyouken1Item != null
      ) {
        selId = this.selectedViewDataZumi.jyouken1Item.id;
      } else if (
        this.selectedTextBox == SELECTED_TEXTBOX.Tate &&
        this.selectedViewDataZumi.tateItem != null
      ) {
        selId = this.selectedViewDataZumi.tateItem.id;
      } else if (
        this.selectedTextBox == SELECTED_TEXTBOX.Yoko &&
        this.selectedViewDataZumi.yokoItem != null
      ) {
        selId = this.selectedViewDataZumi.yokoItem.id;
      }
      if (selId == 0) {
        flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      } else {
        let tmpitem;
        for (let row = 0; row < flexGrid.cells.rows.length; row++) {
          tmpitem = flexGrid.cells.rows[row].dataItem;
          if (tmpitem.id == selId) {
            flexGrid.selection = new wjGrid.CellRange(row, -1, row, -1);
            break;
          }
        }
      }
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    /*
     * 帳票関係↓
     */
    getChohyoData() {
      this.clrClicked(0);
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
      };
      getConnect('/MstChohyo', params, 'SIENT').then((result) => {
        this.viewDataChohyo = result;
      });
    },
    postChohyoData() {
      if (String(this.selectedViewDataChohyo.ptncd).length == 0) {
        alert('コード' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }
      if (this.selectedViewDataChohyo.name.length == 0) {
        alert('帳票名' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }

      let params = {
        uniqid: 3,
        traceid: 123,
      };

      if (this.selectedViewDataChohyo.ptnid == 0) {
        let body = {
          jigyoid: 62,
          ptncd: this.selectedViewDataChohyo.ptncd,
          name: this.selectedViewDataChohyo.name,
          papersize: 1,
        };
        if (!confirm(messageConst.CONFIRM.POST)) {
          return;
        }
        postConnect('/MstChohyo', params, 'SIENT', body).then((result) => {
          if (result.okflg == true) {
            this.getChohyoData();
          } else {
            alert(result.msg);
          }
        });
      } else {
        let body = {
          jigyoid: 62,
          ptnid: this.selectedViewDataChohyo.ptnid,
          ptncd: this.selectedViewDataChohyo.ptncd,
          name: this.selectedViewDataChohyo.name,
          papersize: 1,
        };
        if (!confirm(messageConst.CONFIRM.PUT)) {
          return;
        }
        putConnect('/MstChohyo', params, 'SIENT', body).then((result) => {
          if (result.okflg == true) {
            this.getChohyoData();
          } else {
            alert(result.msg);
          }
        });
      }
    },
    deleteChohyoData() {
      if (this.selectedViewDataChohyo.ptnid == 0) {
        alert(messageConst.WARN.NO_SELECT);
        return;
      }
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pPtnid: this.selectedViewDataChohyo.ptnid,
      };
      if (!confirm(messageConst.CONFIRM.DELETE)) {
        return;
      }
      deleteConnect('/MstChohyo', params, 'SIENT').then((result) => {
        if (result.okflg == true) {
          this.getChohyoData();
          this.clrClicked(0);
        } else {
          alert(result.msg);
        }
      });
    },
    /*
     * ↑ここまで帳票関係↑
     */
    setMstSyukei_sentaku() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pNyusgJigyoid: 0,
        pRes_flg: 1,
      };
      getConnect('/MstSyukeiSentaku', params, 'SIENT').then((result) => {
        this.viewDataSelect1All = result;
        this.setviewDataSelect1();
      });
    },
    setviewDataSelect1(kbn = 1, item = null) {
      this.viewDataSelect1 = [];
      if (this.selSyukeiKoumoku == 0) {
        this.viewDataSelect1 = this.viewDataSelect1All.filter((e) => {
          if (e.sykBun == true) {
            return e;
          }
        });
        this.setfocus(0);
      } else if (this.selSyukeiKoumoku == 1) {
        this.viewDataSelect1 = this.viewDataSelect1All.filter((e) => {
          if (e.bunrui == 1) {
            return e;
          }
        });
        this.setfocus(kbn);
      } else if (this.selSyukeiKoumoku == 2) {
        this.viewDataSelect1 = this.viewDataSelect1All.filter((e) => {
          if (e.bunrui == 2) {
            return e;
          }
        });
        this.setfocus(kbn);
      } else if (this.selSyukeiKoumoku == 3) {
        this.viewDataSelect1 = this.viewDataSelect1All.filter((e) => {
          if (e.bunrui == 3) {
            return e;
          }
        });
        this.setfocus(kbn);
      }
      this.setviewDataSelect2(item);
    },
    setfocus(kbn) {
      let el1 = document.getElementById('houkokusyoJyoukenJyouken1');
      let el2 = document.getElementById('houkokusyoJyoukenTate');
      let el3 = document.getElementById('houkokusyoJyoukenYoko');
      el1.style.backgroundColor = sysConst.COLOR.white;
      el2.style.backgroundColor = sysConst.COLOR.white;
      el3.style.backgroundColor = sysConst.COLOR.white;
      if (kbn == 0) {
        el1.focus();
        el1.style.backgroundColor = sysConst.COLOR.gridSelectedBackground;
        this.selectedTextBox = SELECTED_TEXTBOX.Jyouken1;
      } else if (kbn == 1) {
        el2.focus();
        el2.style.backgroundColor = sysConst.COLOR.gridSelectedBackground;
        this.selectedTextBox = SELECTED_TEXTBOX.Tate;
      } else if (kbn == 2) {
        el3.focus();
        el3.style.backgroundColor = sysConst.COLOR.gridSelectedBackground;
        this.selectedTextBox = SELECTED_TEXTBOX.Yoko;
      }
    },
    setviewDataSelect2(item) {
      this.viewDataSelect2 = [];
      if (item == null || item.daiList == undefined) {
        return;
      }
      let tmplist = [];
      for (let dai = 0; dai < item.daiList.length; dai++) {
        let daiitem = item.daiList[dai];
        let daiobj = Vue.util.extend({}, daiitem);
        if (daiitem.chuList.length > 0) {
          daiobj.nameD = '[' + daiobj.name + ']';
        } else {
          daiobj.nameD = daiobj.name;
        }
        daiobj.codeD = String(daiobj.code).padStart(3, '0');
        daiobj.UtiwakeKbn = UTIWAKE_KBN.Dai;
        daiobj.daiID = daiobj.id;
        daiobj.chuID = 0;
        daiobj.shoID = 0;
        daiobj.select = '○';
        tmplist.push(daiobj);
        for (let chu = 0; chu < daiitem.chuList.length; chu++) {
          let chuitem = daiitem.chuList[chu];
          let chuobj = Vue.util.extend({}, chuitem);
          chuobj.nameD = '  ' + chuobj.name;
          chuobj.codeD = '';
          chuobj.UtiwakeKbn = UTIWAKE_KBN.Chu;
          chuobj.daiID = daiobj.id;
          chuobj.chuID = chuobj.id;
          chuobj.shoID = 0;
          chuobj.select = '';
          tmplist.push(chuobj);
          for (let sho = 0; sho < chuitem.shoList.length; sho++) {
            let shoitem = chuitem.shoList[sho];
            let shoobj = Vue.util.extend({}, shoitem);
            shoobj.nameD = '    ' + shoobj.name;
            shoobj.UtiwakeKbn = UTIWAKE_KBN.Sho;
            shoobj.daiID = daiobj.id;
            shoobj.chuID = chuobj.id;
            shoobj.shoID = shoobj.id;
            shoobj.select = '';
            tmplist.push(shoobj);
          }
        }
      }
      this.viewDataSelect2 = tmplist;
    },
    getSelectStr(selectedList, obj) {
      if (selectedList == null) {
        if (obj.UtiwakeKbn == UTIWAKE_KBN.Dai) {
          return '○';
        }
      } else {
        let finddata = selectedList.find(
          (e) =>
            e.daiID == obj.daiID && e.chuID == obj.chuID && e.shoID == obj.shoID
        );
        if (finddata != null) {
          return '○';
        }
      }
      return '';
    },
    /*
     *登録済み集計内容↓
     */
    getSyukeiViewData(ptnid) {
      this.clrClicked(1);
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pNyusgJigyoid: 0,
        pRes_flg: 1,
        pPtnid: ptnid,
      };
      getConnect('/MstSyukeiView', params, 'SIENT').then((result) => {
        this.viewDataZumiAll = result;
        if (result.bodyList.length > 0) {
          let tmplist = result.bodyList.filter((x) => x.kmkType == 1);
          let tmpresult = [];
          for (let i = 0; i < tmplist.length; i++) {
            tmpresult.push(tmplist[i].buhinData);
            tmpresult[i].buhinCdD = String(
              tmplist[i].buhinData.buhinCd
            ).padStart(3, '0');
          }
          tmpresult.sort((a, b) => {
            if (a.buhinCd < b.buhinCd) {
              return -1;
            }
            if (a.buhinCd > b.buhinCd) {
              return 1;
            }
          });
          this.viewDataZumi = tmpresult;
        }
      });
    },
    postSyukeiViewData() {
      if (String(this.selectedViewDataZumi.buhinCd).length == 0) {
        alert('コード' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }
      if (this.selectedViewDataZumi.buhinName.length == 0) {
        alert('集計内容' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }

      let params = {
        uniqid: 3,
        traceid: 123,
      };

      if (this.selectedViewDataZumi.buhinId == 0) {
        let body = {
          jigyoid: 62,
          ptncd: this.selectedViewDataChohyo.ptncd,
          name: this.selectedViewDataChohyo.name,
          papersize: 1,
        };
        if (!confirm(messageConst.CONFIRM.POST)) {
          return;
        }
        postConnect('/MstSyukeikmk', params, 'SIENT', body).then((result) => {
          if (result.okflg == true) {
            this.getChohyoData();
          } else {
            alert(result.msg);
          }
        });
      } else {
        let body = {
          jigyoid: 62,
          ptnid: this.selectedViewDataChohyo.ptnid,
          ptncd: this.selectedViewDataChohyo.ptncd,
          name: this.selectedViewDataChohyo.name,
          papersize: 1,
        };
        if (!confirm(messageConst.CONFIRM.PUT)) {
          return;
        }
        putConnect('/MstChohyo', params, 'SIENT', body).then((result) => {
          if (result.okflg == true) {
            this.getChohyoData();
          } else {
            alert(result.msg);
          }
        });
      }
    },
    /*
     *登録済み集計内容↑
     */

    numbervalidate(kbn) {
      if (kbn == 0) {
        if (isNaN(this.selectedViewDataChohyo.ptncd)) {
          this.selectedViewDataChohyo.ptncd = '';
          return;
        }
        if (String(this.selectedViewDataChohyo.ptncd).length > 3) {
          this.selectedViewDataChohyo.ptncd = Number(
            String(this.selectedViewDataChohyo.ptncd).slice(0, 3)
          );
        }
        this.selectedViewDataChohyo.ptncd =
          this.selectedViewDataChohyo.ptncd.replace(/\D/g, '');
      } else if (kbn == 1) {
        if (isNaN(this.selectedViewDataZumi.buhinCd)) {
          this.selectedViewDataZumi.buhinCd = '';
          return;
        }
        if (String(this.selectedViewDataZumi.buhinCd).length > 3) {
          this.selectedViewDataZumi.buhinCd = Number(
            String(this.selectedViewDataZumi.buhinCd).slice(0, 3)
          );
        }
        this.selectedViewDataZumi.buhinCd =
          this.selectedViewDataZumi.buhinCd.replace(/\D/g, '');
      }
    },
    clrClicked(kbn) {
      if (kbn == 0) {
        this.selectedViewDataChohyo = {
          ptnid: 0,
          ptncd: '',
          name: '',
          nameD: '',
          papersize: 0,
          papersizeName: '',
        };
      } else if (kbn == 1) {
        this.selectedViewDataZumi = {
          buhinCd: '',
          buhinCdD: '',
          buhinId: 0,
          buhinName: '',
          buhinNo: 0,
          kigyoflg: 0,
          koyoflg: 0,
          multiflg: 0,
          ninflg: 0,
          riyoflg: 0,
          sdnflg: 0,
          tidayflg: 0,
          xKmkList: [],
          xKmkName: '',
          xid: 0,
          yKmkList: [],
          yKmkName: '',
          yid: 0,
          zKmkList: [],
          zKmkName: '',
          zid: 0,
          jyouken1Item: null,
          yokoItem: null,
          tateItem: null,
        };
        this.viewTateList = null;
        this.viewYokoList = null;
      }
    },
    delClicked(kbn) {
      if (kbn == 0) {
        this.deleteChohyoData();
      }
    },
    addClicked(kbn) {
      if (kbn == 0) {
        this.postChohyoData();
      }
    },
    inputclick(kbn) {
      let selitem = null;
      let selectedSelectList = null;
      if (kbn == 0) {
        this.selSyukeiKoumoku = 0;
        selitem = this.selectedViewDataZumi.jyouken1Item;
      } else if (kbn == 1 || kbn == 2) {
        if (kbn == 1 && this.selectedViewDataZumi.tateItem != null) {
          this.selSyukeiKoumoku = this.getselSyukeiKbn(
            this.selectedViewDataZumi.tateItem
          );
          selitem = this.selectedViewDataZumi.tateItem;
          selectedSelectList = this.viewTateList;
        } else if (kbn == 2 && this.selectedViewDataZumi.yokoItem != null) {
          this.selSyukeiKoumoku = this.getselSyukeiKbn(
            this.selectedViewDataZumi.yokoItem
          );
          selitem = this.selectedViewDataZumi.yokoItem;
          selectedSelectList = this.viewYokoList;
        } else {
          this.selSyukeiKoumoku = 1;
        }
      }
      this.setviewDataSelect1(kbn, selitem);
      this.setSelect2Resetting(selectedSelectList);
    },
    /*
     * 選択済み項目の再表示設定
     */
    setSelect2Resetting(selectedSelectList) {
      if (selectedSelectList == null) {
        return;
      }
      let tmplist = this.viewDataSelect2.concat();
      for (let row = 0; row < tmplist.length; row++) {
        let tmpitem = tmplist[row];
        let finddata = selectedSelectList.find(
          (e) =>
            e.daiID == tmpitem.daiID &&
            e.chuID == tmpitem.chuID &&
            e.shoID == tmpitem.shoID
        );
        if (finddata == undefined) {
          tmpitem.select = '';
        } else {
          tmpitem.select = '○';
        }
      }
      this.viewDataSelect2 = tmplist;
    },
    getselSyukeiKbn(item) {
      // if (item.sykBun) {
      //   return 0;
      // } else
      if (item.bunrui == 1) {
        return 1;
      } else if (item.bunrui == 2) {
        return 2;
      } else if (item.bunrui == 3) {
        return 3;
      }
    },
    rbChangeclick() {
      if (this.selSyukeiKoumoku == 0) {
        this.setfocus(0);
      } else {
        if (this.selectedTextBox == SELECTED_TEXTBOX.Yoko) {
          this.setfocus(2);
        } else {
          this.setfocus(1);
        }
      }
      this.setviewDataSelect1(this.selectedTextBox, {});
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示期間：'; // + this.getYm(0) + ' ';
      printUtil.setSubTitleList([sub1]);
      printUtil.setPageSize(printUtil.SIZE.A3);
      printUtil.printExec('担当者別実施一覧', printUtil.DIRECTION.landscape);
    },
    sentakuChange() {
      this.select2Grid.refresh();
    },
    getNewSelect2List() {
      return this.viewDataSelect2.filter((x) => x.select == '○').concat();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#houkokusyoJyouken {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;
  max-width: 1920px;
  width: auto;

  #leftArea {
    min-height: 560px !important;
    width: 30px;
    max-width: 300px;
    min-width: 300px;
    background: $view_background_Blue;
    border: 1px solid $view_Title_background_Blue_Dark;
    textarea {
      width: 220px;
      border: thin solid;
      border-color: $light-gray;
      margin: 0px;
      line-height: normal; /* 初期値 */
      resize: none;
      background: $white;
    }
    textarea:focus {
      border: 1px solid #ff9900;
      outline: 0;
    }
  }
  #centerArea {
    min-height: 560px;
    width: 550px;
    max-width: 550px;
    min-width: 550px;
    background: $view_background_Green;
    border: 1px solid $view_Title_font_color_Green;
  }
  #rightArea {
    min-height: 560px;
    width: 450px;
    max-width: 450px;
    min-width: 450px;
    background: $view_background_Orange;
    border: 1px solid $view_Title_font_color_Orange;
  }

  #houkokusyoJyoukenicrnGrid,
  #houkokusyoJyoukenSelect1Grid,
  #houkokusyoJyoukenSelect2Grid,
  #houkokusyoJyoukenZumiGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-height: 200px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    &.wj-flexgrid [wj-part='root'] {
      overflow-y: scroll !important;
      overflow-x: hidden !important;
    }
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

    .wj-cell {
      padding: 5px;
    }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
    }
    // .wj-cells
    //   .wj-row:hover
    //   .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    //   transition: all 0s;
    //   background: $grid_hover_background;
    // }
    .wj-cells .wj-state-active {
      background: $grid_selected_background;
      color: $grid_selected_color;
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }
  #houkokusyoJyoukenicrnGrid {
    min-height: 410px;
  }
  #houkokusyoJyoukenZumiGrid {
    min-height: 125px;
    // .wj-cell:not(.wj-header) {
    //   &:first-child &:nth-child(2) {
    //     text-align: center;
    //   }
    // }
  }
  #houkokusyoJyoukenSelect1Grid {
    min-height: 250px;
    max-height: 250px;
  }
  #houkokusyoJyoukenSelect2Grid {
    min-height: 240px;
    // .wj-cell:not(.wj-header) {
    //   &:last-child {
    //     background: $white;
    //     color: $grid_selected_color;
    //   }
    // }
  }
}
</style>
