<template>
  <div id="monitoringYotei">
    <v-container class="pa-0" fluid>
      <v-row no-gutters class="rowStyle">
        <v-card class="koumokuTitle titleMain pa-1" outlined tile>
          表示月
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
            elevation="2"
            width="125px"
            height="100%"
            class="btnymd"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="2"
            tile
            class="btnymd pa-0 ml-1"
            height="100%"
            @click="inputCalendarClick(1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
            前月
          </v-btn>
          <v-btn
            elevation="2"
            tile
            class="btnymd pa-0 ml-1"
            height="100%"
            @click="inputCalendarClick(2)"
          >
            翌月
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-card>
        <v-btn
          class="ml-1"
          height="19"
          :loading="loading"
          @click="searchClicked()"
        >
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>

        <v-spacer></v-spacer>
        <v-tooltip
          bottom
          dark
          color="blue-grey lighten-5"
          min-width="150"
          style="z-index: 10"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              elevation="2"
              v-bind="attrs"
              v-on="on"
              class="koumokuTitle titleGreen pa-1 ml-1"
              outlined
              tile
            >
              <v-icon dense>mdi-message-alert</v-icon>
              記号説明
            </v-card>
          </template>
          <v-layout
            wrap
            v-for="hanrei in hanreiList"
            :key="hanrei.val"
            style="color: #333"
          >
            {{ hanrei.name }}
          </v-layout>
          <v-layout style="color: #333">
            <span style="background: pink">&emsp;</span>
            ：未実施
          </v-layout>
        </v-tooltip>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
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
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          対象者
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1" height="100%">
          <div
            v-for="item in taisyousyaList"
            :key="'rbMoniYoteitaisyo-' + item.val"
            class="radioInline"
            style="width: 70px"
          >
            <input
              type="radio"
              :id="'rbMoniYoteitaisyo-' + item.val"
              v-model="taisyousyaIndex"
              :value="item.val"
            />
            <label
              :for="'rbMoniYoteitaisyo-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
          <label class="mr-1">【</label>
          <div
            v-for="item in taisyousyaYoteiList"
            :key="'cbMoniYoteitaisyoYotei-' + item.val"
            class="checkboxInline"
          >
            <input
              type="checkbox"
              :id="'cbMoniYoteitaisyoYotei-' + item.val"
              :value="item.val"
              v-model="taisyousyaYoteiIndex"
              :disabled="taisyousyaIndex != 1"
              @change="taisyousyaClicked"
            />
            <label
              :for="'cbMoniYoteitaisyoYotei-' + item.val"
              class="customCheckbox mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
          <label>】</label>
        </v-card>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          市区町村
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selSikuchoson"
          @change="onSikuchosonClicked"
          style="width: 150px"
        >
          <option v-for="val in sikuchosonList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
          絞込
        </v-card>
        <v-card elevation="0" tile outlined class="pl-1 mr-1" height="100%">
          <div
            v-for="item in siborikomiList"
            :key="item.val"
            class="radioInline"
            style="width: 70px"
          >
            <input
              type="radio"
              :id="'rbMoniYoteisiborikomi-' + item.val"
              v-model="siborikomiIndex"
              :value="item.val"
              @change="siborikomiClicked"
            />
            <label
              :for="'rbMoniYoteisiborikomi-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
        </v-card>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          <span class="under18 border mr-1" style="width: 80px">18歳未満</span>
        </v-card>
        <v-btn class="ml-1" width="25" height="19" @click="filterClrclick()">
          <v-icon dense>mdi-filter-off</v-icon>
          解除
        </v-btn>
        <v-spacer></v-spacer>
        <v-card class="koumokuTitle titleGlay pa-1 mr-1" outlined tile>
          予定入力
        </v-card>

        <v-btn-toggle
          class="flex-wrap"
          v-model="inputIndex"
          color="light-blue darken-4"
        >
          <v-btn
            v-for="n in inputList"
            :key="n.val"
            :value="n.val"
            elevation="1"
            outlined
            height="20"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="monitoringYoteiGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'None'"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Cell'"
          :showMarquee="true"
          :isReadOnly="true"
          :initialized="onInitializekeikakuIcrnGrid"
          :formatItem="onFormatItemkeikakuIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatakeikaku"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedkeikakuIcrn"
            :showFilterIcons="false"
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
        id="monitoringYoteiDatepicker"
        type="month"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="enkiInputflg" persistent width="350">
      <v-card class="common_dialog">
        <v-card-title class="dialog_title"> 延期・中止登録 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="enkiInputflg = false"
          class="dialog_close mt-1"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <div class="pa-1">
          <v-row no-gutters class="rowStyle_Input mb-1">
            <v-card
              class="koumokuTitle titleBlueDark pa-1 mr-1"
              outlined
              tile
              width="100"
            >
              利用者名
            </v-card>
            <v-card class="koumokuData h25Padding" tile outlined width="200">
              {{ enkiObject.name }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mb-1">
            <v-card
              class="koumokuTitle titleBlue pa-1 mr-1"
              width="100"
              outlined
              tile
            >
              予定月
            </v-card>
            <v-card
              class="koumokuData alignCenter h25Padding"
              tile
              outlined
              width="100"
            >
              {{ enkiObject.yoteiym }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mb-1">
            <v-card
              class="koumokuTitle titleBlue pa-1 mr-1"
              width="100"
              outlined
              tile
            >
              区分
            </v-card>
            <v-btn-toggle
              class="flex-wrap mr-1"
              v-model="enkiObject.kbn"
              mandatory
            >
              <v-btn
                v-for="n in enkiList"
                :key="n.val"
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
              class="koumokuTitle titleBlue pa-1 mr-1"
              width="100"
              outlined
              tile
            >
              理由
            </v-card>
            <input
              class="pl-1"
              type="text"
              style="width: 200px; border: 1px solid lightgray"
              v-model="enkiObject.riyu"
            />
          </v-row>
          <v-row no-gutters class="rowStyle_Input">
            <v-btn class="mr-1" height="25" @click="copyClicked()">
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mr-1" height="25" @click="copyClicked()">
              登録
            </v-btn>
          </v-row>
        </div>
      </v-card>
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
import Vue from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '@connect/getConnect';
import printUtil from '@/utiles/printUtil';
const GRID_ID = {
  Keikaku: 'monitoringYoteiGrid',
};
export default {
  components: { AlphabetButton },
  data() {
    return {
      keikakuIcrnHeaderList: [
        {
          dataname: 'rcodeD',
          title: 'コード',
          kbntitle: '',
          width: 70,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'rname',
          title: '利用者名',
          kbntitle: '',
          width: '2.5*',
          minwidth: 100,
          align: 'left',
        },
        {
          dataname: 'age',
          title: '年齢',
          kbntitle: '',
          width: 40,
          minwidth: 20,
          align: 'right',
        },
        {
          dataname: 'birthMonth',
          title: '誕生\n月',
          kbntitle: '',
          width: 40,
          minwidth: 20,
          align: 'right',
        },
        {
          dataname: 'shichoName',
          title: '市区\n町村',
          kbntitle: '',
          width: '1.2*',
          minwidth: 70,
          align: 'left',
        },
        {
          dataname: 'keikakuYmdFmt',
          title: '作成日',
          kbntitle: 'サービス等利用計画作成',
          width: '1.5*',
          minwidth: 80,
          align: 'center',
        },
        {
          dataname: 'yoshikiName',
          title: '様式',
          kbntitle: 'サービス等利用計画作成',
          width: 40,
          minwidth: 20,
          align: 'center',
        },
        {
          dataname: 'keikakuSinm',
          title: '担当者',
          kbntitle: 'サービス等利用計画作成',
          width: 70,
          minwidth: 70,
          align: 'left',
        },
        {
          dataname: 'rksymdFmt',
          title: '開始日',
          kbntitle: 'モニタリング期間',
          width: '1.5*',
          minwidth: 80,
          align: 'center',
        },
        {
          dataname: 'rkeymdFmt',
          title: '終了日',
          kbntitle: 'モニタリング期間',
          width: '1.5*',
          minwidth: 80,
          align: 'center',
        },
        {
          dataname: 'moniKikan',
          title: '期間',
          kbntitle: 'モニタリング期間',
          width: 50,
          minwidth: 40,
          align: 'right',
        },
        {
          dataname: 'ym1',
          title: '1',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym2',
          title: '2',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym3',
          title: '3',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym4',
          title: '4',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym5',
          title: '5',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym6',
          title: '6',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym7',
          title: '7',
          kbntitle: '1年月',
          width: 40,
          minwidth: 45,
          align: 'center',
        },
        {
          dataname: 'ym8',
          title: '8',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym9',
          title: '9',
          kbntitle: '1年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym10',
          title: '10',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym11',
          title: '11',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
        {
          dataname: 'ym12',
          title: '12',
          kbntitle: '2年月',
          width: 40,
          minwidth: 40,
          align: 'center',
        },
      ],
      viewdatakeikakuAll: [],
      viewdatakeikaku: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      tourokuScreenFlag: false,
      filterkeikakuIcrn: {},
      targetYmd: '',
      dispYmList: [],
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      selTantousya: 0,
      taisyousyaList: [
        { val: 0, name: '全員' },
        { val: 1, name: '予定者' },
      ],
      taisyousyaYoteiList: [
        { val: 1, name: '通常月' },
        { val: 2, name: '終期月' },
        { val: 3, name: '予定外' },
        { val: 4, name: '翌月終期月' },
      ],
      taisyousyaIndex: 1,
      taisyousyaYoteiIndex: [],
      selSikuchoson: 0,
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
      ],
      siborikomiIndex: 0,
      siborikomiList: [
        { val: 0, name: '全員' },
        { val: 1, name: '実施済' },
        { val: 2, name: '未実施' },
        { val: 3, name: '延期者' },
        { val: 4, name: '中止者' },
      ],
      inputIndex: 0,
      inputList: [
        { val: 1, name: '中止・延期' },
        { val: 2, name: '予定外追加' },
        { val: 3, name: '未実施案作成' },
      ],
      loading: false,
      addStatus: false,
      mainFlexGrid: [],
      hanreiList: [
        { val: 0, name: '（上段）' },
        { val: 1, name: '○：予定' },
        { val: 2, name: '☆：予定外' },
        { val: 3, name: '●★：報告書完了' },
        { val: 4, name: '✕：実施無し' },
        { val: 5, name: '（下段）' },
        { val: 6, name: '延：延期' },
        { val: 7, name: '止：中止' },
        { val: 8, name: '更：終期月更新' },
        { val: 9, name: '変：サービス終了' },
        { val: 10, name: '―：予定なし' },
      ],
      enkiList: [
        { val: 1, name: '延期' },
        { val: 2, name: '中止' },
      ],
      enkiInputflg: false,
      enkiObject: { intcode: 0, name: '', yoteiym: '', kbn: 0, riyu: '' },
      thickList: [2, 9],
    };
  },
  mounted() {
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
      if (document.getElementById(GRID_ID.Keikaku) != null) {
        document.getElementById(GRID_ID.Keikaku).style.height =
          window.innerHeight - 180 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },

    filterInitializedkeikakuIcrn: function (filter) {
      this.filterkeikakuIcrn = filter;
      let fil = [];
      for (let colIndex = 0; colIndex < 11; colIndex++) {
        fil.push(this.keikakuIcrnHeaderList[colIndex].dataname);
      }
      filter.filterColumns = fil;
    },
    onInitializekeikakuIcrnGrid(flexGrid) {
      this.mainFlexGrid = flexGrid;

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filterkeikakuIcrn.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filterkeikakuIcrn.showFilterIcons = false;
      });

      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          if (ht.col >= 11) {
            let targetItem = tmpitem.moniYoteiList.find(
              (e) => e.ym === this.dispYmList[ht.col - 11]
            );
            console.log(targetItem);
            if (this.inputIndex == 0) {
              if (
                confirm(
                  'モニタリング報告書入力画面へ移動します。よろしいですか？'
                )
              ) {
                this.$emit('moni-select', tmpitem, targetItem);
                return;
              }
            } else if (this.inputIndex == 1) {
              if (
                (targetItem.yoteiKbn == 1 || targetItem.yoteiKbn == 4) &&
                targetItem.jissekiKbn == 0
              ) {
                this.enkiObject.intcode = tmpitem.intcode;
                this.enkiObject.name = tmpitem.rname;
                this.enkiObject.yoteiym =
                  targetItem.ym.slice(0, 4) +
                  '年' +
                  targetItem.ym.slice(4, 6) +
                  '月';
                this.enkiObject.kbn = 0;
                this.enkiObject.riyu = '';
                this.enkiInputflg = true;
              }
            }
          }
        }
      });

      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
      // flexGrid.frozenColumns = 11;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.keikakuIcrnHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.keikakuIcrnHeaderList[colIndex].dataname;
        col.name = this.keikakuIcrnHeaderList[colIndex].dataname;
        col.header = this.keikakuIcrnHeaderList[colIndex].title;
        col.width = this.keikakuIcrnHeaderList[colIndex].width;
        col.minWidth = this.keikakuIcrnHeaderList[colIndex].minwidth;
        col.align = this.keikakuIcrnHeaderList[colIndex].align;
        col.multiLine = true;
        col.allowResizing = true;
        col.aggregate = 'Cnt';
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.keikakuIcrnHeaderList[colIndex].kbntitle
            ? this.keikakuIcrnHeaderList[colIndex].title
            : this.keikakuIcrnHeaderList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.keikakuIcrnHeaderList[colIndex].title
        );
        if (colIndex < 11) {
          flexGrid.columnFooters.setCellData(
            0,
            colIndex,
            'モニタリング予定件数'
          );
        }

        flexGrid.columnHeaders.setCellData(2, colIndex, ' ');
      }
      this.setKeikakuYm(flexGrid);
      this.setMerge(flexGrid);
      flexGrid.endUpdate();
    },

    onItemsSourceChanging(flexGrid) {
      if (flexGrid.columns.length > 0) {
        flexGrid.beginUpdate();
        this.setKeikakuYm(flexGrid);
        this.setMerge(flexGrid);
        flexGrid.endUpdate();
      }
    },
    setKeikakuYm(flexGrid) {
      if (flexGrid.columnHeaders.columns.length > 0) {
        if (this.kikanYm) {
          // let tmpmom = new dayjs(
          //   this.kikanYm.format('YYYY') +
          //     '-' +
          //     this.kikanYm.format('MM') +
          //     '-' +
          //     this.kikanYm.format('DD')
          // ).subtract(1, 'years');
          let tmpmom = new dayjs(
            this.kikanYm.format('YYYY') +
              '-' +
              this.kikanYm.format('MM') +
              '-' +
              this.kikanYm.format('DD')
          ).subtract(5, 'month');
          if (
            this.dispYmList.length > 0 &&
            this.dispYmList[0] == tmpmom.format('YYYY') + tmpmom.format('MM')
          ) {
            return;
          }
          this.dispYmList = [];
          let index = 0;
          for (
            let colIndex = 11;
            colIndex < flexGrid.columns.length;
            colIndex++
          ) {
            this.dispYmList[index] =
              tmpmom.format('YYYY') + tmpmom.format('MM');
            flexGrid.columnHeaders.setCellData(
              0,
              colIndex,
              tmpmom.format('YYYY年')
            );
            flexGrid.columnHeaders.setCellData(
              1,
              colIndex,
              tmpmom.format('M月')
            );
            tmpmom = tmpmom.add(1, 'months');

            index++;
          }
        }
      }
    },
    setMerge(flexGrid) {
      if (this.dispYmList.length == 0) {
        return;
      }
      let mm = new wjGrid.MergeManager();
      let ranges = [];
      ranges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 4),
        new wjGrid.CellRange(0, 5, 0, 7),
        new wjGrid.CellRange(0, 8, 0, 10),
      ];
      let startc = 11;
      let endc = 11;
      let tmpym = this.dispYmList[0].slice(0, 4);
      this.dispYmList.forEach((el) => {
        let tmpy = el.slice(0, 4);
        if (tmpym != tmpy) {
          ranges.push(new wjGrid.CellRange(0, startc, 0, endc - 1));
          startc = endc;
          tmpym = tmpy;
        }
        endc++;
      });
      ranges.push(new wjGrid.CellRange(0, startc, 0, endc - 1));
      let rangesFoot = [new wjGrid.CellRange(0, 0, 0, 10)];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < rangesFoot.length; h++) {
            if (rangesFoot[h].contains(r, c)) {
              return rangesFoot[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      this.screenFlag = false;
      this.loading = false;
    },
    setNonFilterCol(col) {
      var Nonefilter = this.filterkeikakuIcrn.getColumnFilter(col);
      Nonefilter.filterType = 'None';
    },
    onFormatItemkeikakuIcrn(flexGrid, e) {
      e.cell.style.borderTop = '';
      e.cell.style.borderBottom = '';
      e.cell.style.borderRight = '';
      e.cell.style.borderLeft = '';
      e.cell.style.color = '';
      e.cell.style.backgroundColor = '';

      if (e.panel == flexGrid.columnHeaders) {
        if (e.col < 5) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
        } else if (e.col < 8) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
        if (
          e.col == 4 ||
          (e.row == 0 && e.col == 5) ||
          (e.row == 1 && e.col == 7) ||
          (e.row == 0 && e.col == 8) ||
          (e.row == 0 && e.col == 8) ||
          (e.row >= 1 && e.col == 10) ||
          (e.row == 0 && e.col == 11)
        ) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
        if ((e.row == 0 && e.col == 8) || (e.row == 1 && e.col == 10)) {
          e.cell.style.borderRight =
            '3px double ' + sysConst.COLOR.gridBorderColor;
        }
        // 12月の次の右線を太くする
        if (e.col > 11 && e.row >= 1) {
          let tmpym = this.dispYmList[e.col - 11];
          if (Number(tmpym.slice(4, 6)) == 12) {
            e.cell.style.borderRight =
              '1px solid ' + sysConst.COLOR.gridBorderColor;
          }
          if (e.panel == flexGrid.cells) {
            let tmpitem = e.panel.rows[e.row].dataItem;
            let ymdval =
              tmpitem.sikyuEymdBk.getFullYear() +
              (tmpitem.sikyuEymdBk.getMonth() + 1).toString().padStart(2, '0');
            if (Number(tmpym) > Number(ymdval)) {
              e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
            }
          }
        }
        if (e.col > 11) {
          let tmpym = this.dispYmList[e.col - 11];
          if (tmpym == this.kikanYm.format('YYYYMM')) {
            if (e.row == 1) {
              e.cell.style.borderRight =
                '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
              e.cell.style.borderLeft =
                '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
              e.cell.style.borderTop =
                '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
            }
          }
        }
      }
      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (Number(tmpitem.age) < 18) {
          if (e.col == 1 && tmpitem.isfirst) {
            wjCore.addClass(e.cell, 'under18');
          }
          // if (tmpitem.agebk == 17 && 11 <= e.col && e.col <= 29) {
          //   let tmpym = this.dispYmList[e.col - 11];
          //   if (Number(tmpym.substring(4, 6)) == tmpitem.birthMonthbk - 1) {
          //     e.cell.style.backgroundColor = STYLE_BG_PREBIRTH;
          //   }
          // }
        }

        // 下の行と同じ利用者の場合は下線を非表示化
        if (e.row < flexGrid.rows.length - 1 && e.col < 11) {
          let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.intcode == tmpNextitem.intcode) {
            e.cell.style.borderBottom = 0;
          }
        }
        if (e.row > 0) {
          let pretmpitem = e.panel.rows[e.row - 1].dataItem;
          if (tmpitem.intcode == pretmpitem.intcode) {
            if (e.col < 11) {
              e.cell.innerHTML = '';
            }
            e.cell.style.borderRight = '';
            e.cell.style.borderBottom = 0;
          } else {
            e.cell.style.borderTop =
              '1px solid ' + sysConst.COLOR.gridBorderColor;
          }
        }
        let tmpym = this.dispYmList[e.col - 11];
        if (tmpym == this.kikanYm.format('YYYYMM')) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
          e.cell.style.borderLeft =
            '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
        }
        // サービス期間外はグレー背景とする
        if (e.col >= 11) {
          if (
            !(
              Number(tmpitem.rksymd.substring(0, 6)) <= Number(tmpym) &&
              Number(tmpym) <= Number(tmpitem.rkeymd.substring(0, 6))
            )
          ) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridNoneBackground;
          }
        }
      } else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.borderTop =
          ' double 4px ' + sysConst.COLOR.gridBorderColor;
        let tmpym = this.dispYmList[e.col - 11];
        if (tmpym == this.kikanYm.format('YYYYMM')) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
          e.cell.style.borderLeft =
            '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
          e.cell.style.borderBottom =
            '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
        }
        if (e.col <= 10) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.gridBackground;
        }
        if (e.col == 0) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
      }
      if (e.panel != flexGrid.columnHeaders) {
        if (e.col == 4 || e.col == 7) {
          e.cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
        if (e.col == 10 || (e.panel == flexGrid.columnFooters && e.col == 0)) {
          e.cell.style.borderRight =
            '3px double ' + sysConst.COLOR.gridBorderColor;
        }
        if (e.col > 10) {
          let tmpym = this.dispYmList[e.col - 11];
          if (Number(tmpym.slice(4, 6)) == 12) {
            e.cell.style.borderRight =
              '1px solid ' + sysConst.COLOR.gridBorderColor;
          }
        }
      }
    },
    onTantousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        let params = {
          uniqid: 3,
          traceid: 123,
          pJigyoid: 62,
          pDspYm: this.kikanYm.format('YYYYMM'),
          pSym: this.dispYmList[0],
          pEym: this.dispYmList[this.dispYmList.length - 1],
        };
        getConnect('/moniYoteiView', params).then((result) => {
          console.log(11111);
          console.log(result);
          this.viewdatakeikakuAll = this.createViewData(result);
          this.userFilter();
        });
      } else {
        this.userFilter();
      }
    },
    createViewData(apires) {
      let result = [];
      apires.forEach((el) => {
        let obj1 = Vue.util.extend({}, el);
        obj1.rcode = String(el.rcode);
        obj1.rcodeD = obj1.rcode.padStart(7, '0');
        obj1.birthMonth = Number(el.birth.substring(4, 6));
        obj1.mymdFmt = this.getFmtDate(el.mymd);
        obj1.rksymdFmt = this.getFmtDate(el.rksymd);
        obj1.rkeymdFmt = this.getFmtDate(el.rkeymd);
        obj1.keikakuYmdFmt = this.getFmtDate(el.keikakuYmd);
        obj1.isfirst = true;
        let obj2 = Vue.util.extend({}, obj1);
        obj2.isfirst = false;

        let index = 1;
        this.dispYmList.forEach((el) => {
          let tmpym = obj1.moniYoteiList.filter(function (yotei) {
            return yotei.ym == el;
          });

          if (tmpym.length > 0) {
            obj1['ym' + index] = tmpym[0].kigo;
            obj2['ym' + index] = tmpym[0].kigo2;
          }
          index++;
        });
        result.push(obj1);
        result.push(obj2);
      });
      return result;
    },
    getFmtDate(ymd) {
      if (ymd.trim().length > 0) {
        return new Date(
          ymd.substring(0, 4),
          Number(ymd.substring(4, 6)) - 1,
          ymd.substring(6, 8)
        );
      } else {
        return '';
      }
    },
    onAlphabetical() {
      this.userFilter();
    },
    siborikomiClicked() {
      this.userFilter();
    },
    inputClicked(kbn) {
      this.inputIndex = kbn;
      // // チェックボックス一個のみの処理
      // if (this.inputIndex.length > 1) {
      //   this.inputIndex.shift();
      //   console.log(this.inputIndex);
      // }
    },
    taisyousyaClicked() {
      this.selTantousya = this.tantousyaList[this.selTantousya].val;
    },
    onSikuchosonClicked() {
      this.selSikuchoson = this.sikuchosonList[this.selSikuchoson].val;
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdatakeikakuAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');
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
      this.viewdatakeikaku = tmpviewdata;
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = dayjs().startOf('months');
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
        this.viewdatakeikaku = [];
      }
    },
    monthSelect() {
      this.kikanYm = dayjs(this.picker);
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },
    filterClrclick() {
      this.filterkeikakuIcrn.clear();
    },
    printExec() {
      printUtil.setGridList([this.mainFlexGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示月:' + this.getYm() + ' ';
      printUtil.setSubTitleList([sub1]);
      // printUtil.printExec('予定一覧', printUtil.DIRECTION.landscape);
      printUtil.printExec2();
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#monitoringYotei {
  color: $font_color;
  font-size: 14px;
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: 100%;
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

  .hosokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    border: none;
    > .premonth {
      background: #fac4db;
    }
  }

  #monitoringYoteiGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-height: 400px;
    z-index: 2;
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
    .wj-glyph-filter {
      // margin-top: 10px;
      width: 3px;
      height: 3px;
    }
  }
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#monitoringYoteiDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 70px;
  left: 100px;
  width: 300px;
  max-width: 300px;
}

// .touroku_dialogs {
//   min-width: 1070px;
// }
// .v-btn--absolute.v-btn--top,
// .v-btn--fixed.v-btn--top {
//   z-index: 100;
//   top: 0px;
//   right: 5px;
//   background-color: $white;
// }
// .v-dialog {
//   overflow: hidden;
//   margin: 0;
// }
</style>
