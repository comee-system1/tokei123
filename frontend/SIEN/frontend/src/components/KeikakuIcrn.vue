<template>
  <div id="keikakuIcrn">
    <v-container class="mt-1 ml-1 pa-0" fluid>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile height="20">
          表示月
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
            width="125px"
            height="20"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="0"
            class="pa-0 ml-1"
            height="20"
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
        <!-- <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 表示内容 </v-card>
        <v-btn-toggle class="flex-wrap ml-1" v-model="selDispIndex" mandatory>
          <v-btn
            v-for="n in dispList"
            :key="n.val"
            small
            outlined
            @click="dispclick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle> -->
        <v-btn class="itemBtn ml-1" :loading="loading" @click="searchClicked()">
          検索
        </v-btn>
        <v-btn
          class="itemBtn ml-1"
          style="width: 125px"
          @click="filterClrclick()"
        >
          フィルタクリア
        </v-btn>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          ○：予定 ☆：予定外 ●★：報告書完了 延：延期 止：中止 終：終期月
          中：中途月更新 廃：ｻｰﾋﾞｽ廃止
        </v-card>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle pa-1" outlined tile> 担当者 </v-card>
        <wj-menu
          id="comboFilters"
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 対象者 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="taisyousyaIndex"
          mandatory
        >
          <v-btn
            v-for="n in taisyousyaList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="taisyousyaClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="taisyousyaYoteiIndex"
          multiple
          v-if="taisyousyaIndex == 1"
        >
          <v-btn
            v-for="n in taisyousyaYoteiList"
            :key="n.val"
            small
            color="primary  "
            dark
            outlined
            @click="taisyousyaClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <v-card class="koumokuTitle pa-1" outlined tile> 市区町村 </v-card>
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
        <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 絞込 </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1"
          v-model="siborikomiIndex"
          mandatory
        >
          <v-btn
            v-for="n in siborikomiList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="siborikomiClicked"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters v-if="selDispIndex == 0">
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          <span class="miman mr-1" style="width: 80px">18歳未満</span>
        </v-card>
        <div
          style="height: 100%; display: flex; position: relative; left: 340px"
        >
          <v-card class="koumokuTitle pa-1 ml-1" outlined tile> 入力 </v-card>
          <v-btn-toggle class="flex-wrap ml-1" color="primary">
            <!-- style="position: relative; left: 280px" -->
            <!-- <v-btn class="addbtn ml-1" @click="addbtnclick()">
            {{ addbtntitle }}
          </v-btn> -->
            <v-btn
              v-for="n in inputList"
              :key="n.val"
              small
              color="secondary"
              dark
              outlined
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
          <!-- <v-switch
          v-model="addStatus"
          :label="`${addbtntitle}`"
          @change="addbtnclick()"
          hide-details
          dense
          style="position: relative; left: 100px; top: -20px"
        >
        </v-switch> -->
        </div>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="keikakuIcrnGrid"
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
          :initialized="onInitializekeikakuIcrnGrid"
          :formatItem="onFormatItemkeikakuIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatakeikaku"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedkeikakuIcrn"
            :filterApplied="filterApplied"
          />
        </wj-flex-grid>
        <wj-flex-grid
          id="keikakuIcrnGridYm"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'AllHeaders'"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializekeikakuIcrnYmGrid"
          :formatItem="onFormatItemkeikakuIcrnYm"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatakeikaku"
        >
        </wj-flex-grid>
        <wj-flex-grid
          id="yoteisyaIcrnGrid"
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
          :initialized="onInitializeyoteisyaIcrnGrid"
          :formatItem="onFormatItemyoteisyaIcrn"
          :itemsSourceChanging="onItemsSourceChanging"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdatayoteisya"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedyoteisyaIcrn"
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
        id="keikakuIcrnDatepicker"
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
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';
// import MdSelect from '../components/MdSelect.vue';
const GRID_ID = {
  Keikaku: 'keikakuIcrnGrid',
  KeikakuYm: 'keikakuIcrnGridYm',
  Yoteisya: 'yoteisyaIcrnGrid',
};
const STYLE_BLOCK = 'block';
const STYLE_NONE = 'none';
// const STYLE_BG_PREBIRTH = '#ffcccc';
export default {
  components: { AlphabetButton },
  data() {
    return {
      selDispIndex: 0,
      dispList: [
        { val: 0, name: 'モニタリング計画' },
        { val: 1, name: '予定者実施状況' },
      ],
      keikakuIcrnHeaderList: [
        {
          dataname: 'code',
          title: 'コード',
          kbntitle: '',
          width: 60,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '利用者名',
          kbntitle: '',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'age',
          title: '年\n齢',
          kbntitle: '',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'birthMonth',
          title: '誕\n生\n月',
          kbntitle: '',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'sichoson',
          title: '市区\n町村',
          kbntitle: '',
          width: 70,
          align: 'left',
        },
        {
          dataname: 'keikakuYmd',
          title: '作成日',
          kbntitle: 'サービス等利用計画作成',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'yousiki',
          title: '様\n式',
          kbntitle: 'サービス等利用計画作成',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'tantousya',
          title: '担当者',
          kbntitle: 'サービス等利用計画作成',
          width: sysConst.GRD_COL_WIDTH.Tantousya,
          align: 'left',
        },
        {
          dataname: 'sikyuSymd',
          title: '開始日',
          kbntitle: 'モニタリング期間',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'sikyuEymd',
          title: '終了日',
          kbntitle: 'モニタリング期間',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'kikan',
          title: '期間',
          kbntitle: 'モニタリング期間',
          width: 50,
          align: 'right',
        },
      ],
      keikakuIcrnYmHeaderList: [
        {
          dataname: 'ym1',
          title: '1',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym2',
          title: '2',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym3',
          title: '3',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym4',
          title: '4',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym5',
          title: '5',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym6',
          title: '6',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym7',
          title: '7',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym8',
          title: '8',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym9',
          title: '9',
          kbntitle: '1年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym10',
          title: '10',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym11',
          title: '11',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym12',
          title: '12',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym13',
          title: '13',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym14',
          title: '14',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym15',
          title: '15',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym16',
          title: '16',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym17',
          title: '17',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym18',
          title: '18',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
        {
          dataname: 'ym19',
          title: '19',
          kbntitle: '2年月',
          width: 40,
          align: 'center',
        },
      ],
      yoteisyaIcrnHeaderList: [
        {
          dataname: 'code',
          title: 'コード',
          kbntitle: '基本情報',
          chutitl: '',
          width: 100,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '利用者名',
          kbntitle: '基本情報',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.UserName,
          align: 'left',
        },
        {
          dataname: 'sichoson',
          title: '市区\n町村',
          kbntitle: '基本情報',
          chutitl: '',
          width: 70,
          align: 'left',
        },
        {
          dataname: 'yoteiMonth',
          title: '予定\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: 35,
          align: 'center',
        },
        {
          dataname: 'endMonth',
          title: '終\n期\n月',
          kbntitle: 'モニタリング報告書',
          chutitl: '',
          width: 20,
          align: 'center',
        },

        // {
        //   dataname: 'yoteigai',
        //   title: '予\n外',
        //   kbntitle: 'モニタリング報告書',
        //   chutitl: '区分',
        //   width: 40,
        //   align: 'center',
        // },
        {
          dataname: 'chusi',
          title: '中\n止',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'enki',
          title: '延\n期',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'riyu',
          title: '理由',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 35,
          align: 'center',
        },
        {
          dataname: 'jikaiMonth',
          title: '次回\n予定月',
          kbntitle: 'モニタリング報告書',
          chutitl: '中止・延期',
          width: 60,
          align: 'center',
        },
        {
          dataname: 'jissi',
          title: '実\n施',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: 30,
          align: 'center',
        },
        {
          dataname: 'jissiYmd',
          title: '実施日',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング実施',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        // {
        //   dataname: 'kanryou1',
        //   title: '完\n了',
        //   kbntitle: 'モニタリング報告書',
        //   chutitl: '',
        //   width: 40,
        //   align: 'center',
        // },
        // {
        //   dataname: 'keikakuSym',
        //   title: '計画開始\n年月',
        //   kbntitle: '週間計画',
        //   chutitl: '',
        //   width: sysConst.GRD_COL_WIDTH.Ymd,
        //   align: 'center',
        // },
        // {
        //   dataname: 'kanryou2',
        //   title: '完\n了',
        //   kbntitle: '週間計画',
        //   chutitl: '',
        //   width: 40,
        //   align: 'center',
        // },
        {
          dataname: 'keizoku',
          title: '継\n続',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング結果',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'chuto',
          title: '中\n途',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング結果',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'end',
          title: '終\n期',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング結果',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'nextMonth',
          title: '次回案\n作成月',
          kbntitle: 'モニタリング報告書',
          chutitl: 'モニタリング結果',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'servicehaisi',
          title: 'サ\n|\nビ\nス\n廃\n止',
          kbntitle: '',
          chutitl: '',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'sakuseiumu',
          title: '作\n成\n有\n無',
          kbntitle: '週間計画',
          chutitl: '',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'keikakusym',
          title: '計画開始\n年月',
          kbntitle: '週間計画',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        {
          dataname: 'douisyomei',
          title: '同\n意\n署\n名',
          kbntitle: '',
          chutitl: '',
          width: 20,
          align: 'center',
        },
        // {
        //   dataname: 'douiYmd',
        //   title: '同意日',
        //   kbntitle: '',
        //   chutitl: '',
        //   width: sysConst.GRD_COL_WIDTH.Ymd,
        //   align: 'center',
        // },
        {
          dataname: 'kaisaiYmd',
          title: '開催日',
          kbntitle: '担当者会議',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Ymd,
          align: 'center',
        },
        // {
        //   dataname: 'kanryou3',
        //   title: '完\n了',
        //   kbntitle: '担当者会議',
        //   chutitl: '',
        //   width: 40,
        //   align: 'center',
        // },
        {
          dataname: 'kaiginyuryoku',
          title: '会\n議\n入\n力',
          kbntitle: '担当者会議',
          chutitl: '',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'kasan',
          title: '加\n算',
          kbntitle: '担当者会議',
          chutitl: '',
          width: 20,
          align: 'center',
        },
        {
          dataname: 'tantousya',
          title: '担当者',
          kbntitle: '',
          chutitl: '',
          width: sysConst.GRD_COL_WIDTH.Tantousya,
          align: 'left',
        },
      ],
      viewdatakeikakuAll: [],
      viewdatakeikaku: [],
      viewdatayoteisyaAll: [],
      viewdatayoteisya: [],
      viewObj: {},
      userObj: {},
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      tourokuScreenFlag: false,
      filterkeikakuIcrn: {},
      filteryoteisyaIcrn: {},
      targetYmd: '',
      dispYmList: [],
      addbtntitle: '予定外追加：OFF',
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '担当者A' },
        { val: 2, name: '担当者B' },
        { val: 3, name: '担当者C' },
      ],
      selTantousya: 0,
      taisyousyaList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月対象者' },
      ],
      taisyousyaYoteiList: [
        { val: 1, name: '通常月' },
        { val: 2, name: '終期月' },
        { val: 3, name: '予定外' },
        { val: 4, name: '翌月終期月' },
      ],
      taisyousyaIndex: 1,
      taisyousyaYoteiIndex: [0, 1, 2, 3],
      selSikuchoson: 0,
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '南経市' },
      ],
      siborikomiIndex: 0,
      siborikomiList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '実施済' },
        { val: 2, name: '未実施' },
        { val: 3, name: '延期者' },
        { val: 4, name: '中止者' },
      ],
      inputList: [
        { val: 1, name: '中止・延期' },
        { val: 2, name: '予定外追加' },
        { val: 3, name: '未実施案作成' },
      ],
      loading: false,
      addStatus: false,
      mainFlexGrid: [],
      subFlexGrid: [],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      document.getElementById(GRID_ID.Yoteisya).style.display = STYLE_NONE;
    });
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (
        document.getElementById(GRID_ID.Keikaku) != null &&
        document.getElementById(GRID_ID.KeikakuYm) != null
      ) {
        document.getElementById(GRID_ID.Keikaku).style.height =
          window.innerHeight - 220 + 'px';
        document.getElementById(GRID_ID.KeikakuYm).style.height =
          window.innerHeight - 220 + 'px';
      }
    },
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitializedkeikakuIcrn: function (filter) {
      this.filterkeikakuIcrn = filter;
    },
    filterInitializedyoteisyaIcrn: function (filter) {
      this.filteryoteisyaIcrn = filter;
    },
    onInitializekeikakuIcrnGrid(flexGrid) {
      this.mainFlexGrid = flexGrid;
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = false;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header / 2;
      flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
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
        col.align = this.keikakuIcrnHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        if (colIndex == 2) {
          col.allowResizing = true;
        } else {
          col.allowResizing = false;
        }
        if (colIndex == 5 || colIndex == 6 || colIndex == 8) {
          col.format = sysConst.FORMAT.Ymd;
        }

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
      // スクロールバー同期
      let _self = this;
      flexGrid.scrollPositionChanged.addHandler(function () {
        _self.subFlexGrid.scrollPosition = flexGrid.scrollPosition;
      });
      flexGrid.endUpdate();
    },
    onInitializekeikakuIcrnYmGrid(flexGrid) {
      flexGrid.beginUpdate();
      this.subFlexGrid = flexGrid;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          // let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          // this.setDispdata(tmpitem);
          // this.tourokuScreenFlag = true;
        }
      });
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnFooters.rows.insert(0, new wjGrid.Row());
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height =
        sysConst.GRDROWHEIGHT.Header + sysConst.GRDROWHEIGHT.Header / 2;
      // flexGrid.columnFooters.rows[0].allowMerging = true;
      flexGrid.columnFooters.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.alternatingRowStep = 0;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.keikakuIcrnYmHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.keikakuIcrnYmHeaderList[colIndex].dataname;
        col.name = this.keikakuIcrnYmHeaderList[colIndex].dataname;
        col.header = this.keikakuIcrnYmHeaderList[colIndex].title;
        col.width = this.keikakuIcrnYmHeaderList[colIndex].width;
        col.align = this.keikakuIcrnYmHeaderList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          !this.keikakuIcrnYmHeaderList[colIndex].kbntitle
            ? this.keikakuIcrnYmHeaderList[colIndex].title
            : this.keikakuIcrnYmHeaderList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          this.keikakuIcrnYmHeaderList[colIndex].title
        );
      }
      this.setKeikakuYm(flexGrid);
      // スクロールバー同期
      let _self = this;
      flexGrid.scrollPositionChanged.addHandler(function () {
        _self.mainFlexGrid.scrollPosition = flexGrid.scrollPosition;
      });
      flexGrid.endUpdate();
    },
    onInitializeyoteisyaIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          // let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          // this.setDispdata(tmpitem);
          // this.tourokuScreenFlag = true;
        }
      });
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(2, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(3, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      flexGrid.columnHeaders.rows[3].allowMerging = false;

      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[1].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.columnHeaders.rows[2].height = sysConst.GRDROWHEIGHT.Header * 2;
      flexGrid.columnHeaders.rows[3].height = sysConst.GRDROWHEIGHT.Header / 2;

      flexGrid.alternatingRowStep = 0;
      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.yoteisyaIcrnHeaderList.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.yoteisyaIcrnHeaderList[colIndex].dataname;
        col.name = this.yoteisyaIcrnHeaderList[colIndex].dataname;
        col.header = this.yoteisyaIcrnHeaderList[colIndex].title;
        col.width = this.yoteisyaIcrnHeaderList[colIndex].width;
        col.align = this.yoteisyaIcrnHeaderList[colIndex].align;
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
          !this.yoteisyaIcrnHeaderList[colIndex].kbntitle
            ? this.yoteisyaIcrnHeaderList[colIndex].title
            : this.yoteisyaIcrnHeaderList[colIndex].kbntitle
        );
        flexGrid.columnHeaders.setCellData(
          1,
          colIndex,
          !this.yoteisyaIcrnHeaderList[colIndex].chutitl
            ? this.yoteisyaIcrnHeaderList[colIndex].title
            : this.yoteisyaIcrnHeaderList[colIndex].chutitl
        );
        flexGrid.columnHeaders.setCellData(
          2,
          colIndex,
          this.yoteisyaIcrnHeaderList[colIndex].title
        );
        flexGrid.columnHeaders.setCellData(3, colIndex, ' ');
      }
      flexGrid.endUpdate();
    },
    onItemsSourceChanging(flexGrid) {
      flexGrid.beginUpdate();
      this.setKeikakuYm(flexGrid);
      flexGrid.endUpdate();
    },
    setKeikakuYm(flexGrid) {
      if (
        flexGrid.hostElement.id == GRID_ID.KeikakuYm &&
        flexGrid.columnHeaders.columns.length > 0
      ) {
        if (this.kikanYm) {
          let tmpmom = new dayjs(
            this.kikanYm.format('YYYY') +
              '-' +
              this.kikanYm.format('MM') +
              '-' +
              this.kikanYm.format('DD')
          ).subtract(1, 'years');
          if (
            this.dispYmList.length > 0 &&
            this.dispYmList[0] == tmpmom.format('YYYY') + tmpmom.format('MM')
          ) {
            return;
          }
          this.dispYmList = [];
          let index = 0;
          for (
            let colIndex = 0;
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
    onItemsSourceChanged(flexGrid) {
      console.log(flexGrid);
      this.grdAutoSizeRow(flexGrid);
      this.screenFlag = false;
      this.loading = false;
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      // flexGrid.beginUpdate();
      // flexGrid.autoSizeRows();
      // flexGrid.endUpdate();
    },
    filterApplied(e) {
      console.log(e);
      // this.grdAutoSizeRow(e.grid);
    },
    setNonFilterCol(col) {
      var Nonefilter = this.filterkeikakuIcrn.getColumnFilter(col);
      Nonefilter.filterType = 'None';
    },
    setNonFilterCol2(col) {
      var Nonefilter = this.filteryoteisyaIcrn.getColumnFilter(col);
      Nonefilter.filterType = 'None';
    },
    onFormatItemkeikakuIcrn(flexGrid, e) {
      if (
        e.panel == flexGrid.columnHeaders &&
        (e.col <= 1 || (10 <= e.col && e.col <= 30))
      ) {
        this.setNonFilterCol(e.col);
      }
      e.cell.style.borderBottom = '';
      if (
        e.panel == flexGrid.columnHeaders &&
        (e.row == 1 || (e.row == 0 && e.col <= 4))
      ) {
        e.cell.style.borderBottom = 'None';
      }

      // e.cell.style.backgroundColor = '';
      // e.cell.style.borderRight = '';
      e.cell.style.color = '';
      if (e.panel == flexGrid.cells) {
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (tmpitem.agebk < 18) {
          if (e.col == 1 && tmpitem.isfirst) {
            e.cell.innerHTML =
              '<div class="miman">' +
              wjCore.escapeHtml(tmpitem.name) +
              '</div>';
          }
          // if (tmpitem.agebk == 17 && 11 <= e.col && e.col <= 29) {
          //   let tmpym = this.dispYmList[e.col - 11];
          //   if (Number(tmpym.substring(4, 6)) == tmpitem.birthMonthbk - 1) {
          //     e.cell.style.backgroundColor = STYLE_BG_PREBIRTH;
          //   }
          // }
        }

        // 下の行と同じ利用者の場合は下線を非表示化
        if (e.row < flexGrid.rows.length - 1) {
          let tmpNextitem = e.panel.rows[e.row + 1].dataItem;
          if (tmpitem.codebk == tmpNextitem.codebk) {
            e.cell.style.borderBottom = 0;
          }
        }
        if (e.row > 0) {
          let pretmpitem = e.panel.rows[e.row - 1].dataItem;
          if (tmpitem.codebk == pretmpitem.codebk) {
            e.cell.style.color = 'transparent';
            e.cell.style.borderRight = '';
            e.cell.style.borderBottom = '';
          }
        }
      } else if (e.panel == flexGrid.columnFooters) {
        e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        e.cell.style.borderBottom = 0;
      }
    },
    onFormatItemkeikakuIcrnYm(flexGrid, e) {
      e.cell.style.borderBottom = '';
      // if (
      //   e.panel == flexGrid.columnHeaders &&
      //   (e.row == 1 ||
      //     (e.row == 0 && e.col <= 4) ||
      //     (e.row == 0 && 7 <= e.col && e.col <= 9) ||
      //     (e.row == 0 && e.col == 31))
      // ) {
      //   e.cell.style.borderBottom = 'None';
      // }

      // e.cell.style.backgroundColor = '';
      e.cell.style.borderRight = '';
      e.cell.style.color = '';
      if (e.panel == flexGrid.columnHeaders && e.row == 0) {
        e.cell.style.borderRight = '1px solid';
      }
      // 12月の次の右線を太くする
      if (
        (e.panel == flexGrid.columnHeaders && e.row >= 1) ||
        e.panel == flexGrid.cells ||
        e.panel == flexGrid.columnFooters
      ) {
        let tmpym = this.dispYmList[e.col];
        if (Number(tmpym.substring(4, 6)) == 12) {
          e.cell.style.borderRight = '1px solid';
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
    },
    onFormatItemyoteisyaIcrn(flexGrid, e) {
      e.cell.style.borderBottom = '';
      if (
        e.panel == flexGrid.columnHeaders &&
        (e.row == 2 ||
          (e.row == 1 && e.col <= 4) ||
          (e.row == 0 && e.col == 15) ||
          (e.row == 0 && e.col == 18) ||
          (e.row == 0 && e.col == 22) ||
          (e.row == 1 && e.col == 16) ||
          (e.row == 1 && e.col == 17) ||
          (e.row == 1 && e.col == 19) ||
          (e.row == 1 && e.col == 20) ||
          (e.row == 1 && e.col == 21))
      ) {
        e.cell.style.borderBottom = 'None';
      }

      if (e.panel == flexGrid.cells) {
        e.cell.style.backgroundColor = '';
        let tmpitem = e.panel.rows[e.row].dataItem;

        if (e.col == 9) {
          e.cell.innerHTML =
            '<font color="#276bc5">' +
            wjCore.escapeHtml(tmpitem.title) +
            '</font>' +
            '<div>' +
            wjCore.escapeHtml(e.cell.innerHTML) +
            '</div>';
        }
      }
    },
    onTantousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    searchClicked() {
      // 初期データ読込
      if (this.selDispIndex == 0) {
        this.setViewData(true);
      }
      this.subFlexGrid.scrollIntoView(0, 18);
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
        this.createdemodata();
        this.userFilter();
      } else {
        this.userFilter();
      }
    },
    createdemodata() {
      let result = [];
      let code;
      let name;
      let sichoson;
      let age;
      let birth;
      let ymd;
      let kikan;
      let yousiki;
      let isfirst;
      for (let i = 1; i <= 100; i++) {
        let d = new Date('2022', Number('12') - 1, '01');
        if (i < 20 && i < 30) {
          d = new Date('2022', Number('12') - 1, '11');
        } else if (i < 30 && i < 40) {
          d = new Date('2022', Number('12') - 1, '21');
        } else {
          d = new Date('2022', Number('12') - 1, '31');
        }
        if (i % 2 == 1) {
          code = String(1000000 + i);
          name = '東経 ' + i + '太郎';
          sichoson = '新東経西市';
          age = 100;
          birth = 12;
          ymd = d;
          kikan = 'xxヶ月';
          yousiki = '者';
          if (i == 5) {
            age = 17;
          }
          isfirst = true;
        } else {
          isfirst = false;
        }
        result.push({
          codebk: code,
          code: code,
          name: name,
          sichoson: sichoson,
          age: age,
          agebk: age,
          birthMonth: birth,
          birthMonthbk: birth,
          sikyuSymd: ymd,
          sikyuEymd: ymd,
          sikyuSymdBk: ymd,
          sikyuEymdBk: ymd,
          kikan: kikan,
          keikakuYmd: ymd,
          yousiki: yousiki,
          ym1: '',
          ym2: '',
          ym3: '',
          ym4: '',
          ym5: '',
          ym6: '',
          ym7: '',
          ym8: '',
          ym9: '',
          ym10: '',
          ym11: '',
          ym12: '',
          ym13: '',
          ym14: '',
          ym15: '',
          ym16: '',
          ym17: '',
          ym18: '',
          ym19: '',
          yotei: '99',
          jisseki: '99',
          zanken: '99',
          tantousya: '五文字太郎',
          isfirst: isfirst,
        });

        if (i == 1) {
          result[i - 1].ym10 = '●';
          result[i - 1].ym13 = '✕';
          result[i - 1].ym14 = '○';
          result[i - 1].ym17 = '○';
        }
        if (i == 2) {
          result[i - 1].ym13 = '延';
          result[i - 1].ym17 = '終';
        }
        if (i == 3) {
          result[i - 1].ym11 = '●';
          result[i - 1].ym12 = '✕';
          result[i - 1].ym13 = '●';
          result[i - 1].ym16 = '○';
        }
        if (i == 4) {
          result[i - 1].ym12 = '止';
        }
      }
      this.viewdatakeikakuAll = result;
    },
    onAlphabetical() {
      this.userFilter();
    },
    siborikomiClicked() {
      this.userFilter();
    },
    taisyousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    onSikuchosonClicked(s) {
      this.selJigyoKbn = this.selectCmb(s);
    },
    selectCmb(s) {
      s.header = s.selectedItem.name;
      this.setViewData(false);
      let f = document.activeElement;
      f.blur();
      return s.selectedValue;
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
    addbtnclick() {
      if (this.addStatus) {
        this.addbtntitle = '予定外追加：ON';
      } else {
        this.addbtntitle = '予定外追加：OFF';
      }
    },
    dispclick(val) {
      if (val == 0) {
        document.getElementById(GRID_ID.Keikaku).style.display = STYLE_BLOCK;
        document.getElementById(GRID_ID.Yoteisya).style.display = STYLE_NONE;
      } else {
        document.getElementById(GRID_ID.Keikaku).style.display = STYLE_NONE;
        document.getElementById(GRID_ID.Yoteisya).style.display = STYLE_BLOCK;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#keikakuIcrn {
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
  .v-btn:not(.addbtn, .itemBtn) {
    font-size: 12px;
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
  .hosokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    border: none;
    > .premonth {
      background: #ffcccc;
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

  #keikakuIcrnGrid,
  #keikakuIcrnGridYm,
  #yoteisyaIcrnGrid {
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
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }

  div#keikakuIcrnGrid {
    overflow-y: none;
    -ms-overflow-style: none;
    width: auto;
    // min-width: 1250px;
    height: 70vh;
    min-height: 400px;
    z-index: 10;
    &.wj-flexgrid [wj-part='root'] {
      overflow-y: scroll !important;
      overflow-x: hidden !important;
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

  #keikakuIcrnGridYm {
    width: 480px;
    // min-width: 1250px;
    height: 70vh;
    min-height: 400px;
    z-index: 10;
  }
  #yoteisyaIcrnGrid {
    width: auto;
    // min-width: 1250px;
    height: 79vh;
    min-height: 500px;
  }
  .v-btn-toggle > .v-btn {
    // width: 150px;
    height: 25px;
  }
  div.customCombobox {
    position: relative;
    width: 125px !important;
    height: 25px !important;
    &.customCombobox {
      width: 160px !important;
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
  .v-input--selection-controls .v-input__slot > .v-label {
    font-size: 14px;
  }
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#keikakuIcrnDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 70px;
  width: 300px;
  max-width: 300px;
}
.miman {
  padding: 0;
  position: relative;
  width: auto;
  height: 20px;
}
.miman::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 10px solid green;
  border-left: 10px solid transparent;
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
