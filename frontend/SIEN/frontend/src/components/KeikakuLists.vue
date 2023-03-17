<template>
  <div id="keikakuLists">
    <v-container class="pa-0" :style="styles" style="max-width: 100%">
      <v-row no-gutters class="rowStyle mb-1">
        <v-card class="koumokuTitle titleMain mr-1" outlined tile>
          表示月
        </v-card>
        <v-card
          class="mr-1"
          color="transparent"
          height="100%"
          style="border: none; margin-top: -1px"
          outlined
          tile
        >
          <v-btn
            @click="inputCalendarClick(0)"
            elevation="2"
            tile
            outlined
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
            class="btnymd pa-0 ml-1"
            height="100%"
            tile
            @click="inputCalendarClick(1)"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
            前月
          </v-btn>
          <v-btn
            elevation="2"
            class="btnymd pa-0 ml-1"
            height="100%"
            tile
            @click="inputCalendarClick(2)"
          >
            翌月
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-card>
        <v-btn class="mr-1" height="19" @click="searchClicked()">
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-row>
      <v-row class="rowStyle mb-1" no-gutters>
        <v-card class="koumokuTitle titleMain mr-1" outlined tile>
          担当者
        </v-card>
        <select
          class="customSelectBox mr-1"
          v-model="selTantousya"
          @change="onTantousyaClicked"
        >
          <option v-for="val in tantousyaList" :key="val.val" :value="val.val">
            {{ val.name }}
          </option>
        </select>
        <v-card class="koumokuTitle titleMain mr-1" outlined tile>
          対象者
        </v-card>
        <v-card
          elevation="0"
          tile
          outlined
          class="pl-1"
          height="100%"
          width="450"
        >
          <div
            v-for="item in taisyousyaList"
            :key="'rbKeikakuListstaisyo-' + item.val"
            class="radioInline"
          >
            <input
              type="radio"
              :id="'rbKeikakuListstaisyo-' + item.val"
              v-model="taisyousyaIndex"
              :value="item.val"
              @change="rbtTaisyousyaClick"
            />
            <label
              :for="'rbKeikakuListstaisyo-' + item.val"
              class="customRadio mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
          <label class="mr-1">【</label>
          <div
            v-for="item in taisyousyaYoteiList"
            :key="'cbKeikakuListstaisyoYotei-' + item.val"
            class="checkboxInline"
          >
            <input
              type="checkbox"
              :id="'cbKeikakuListstaisyoYotei-' + item.val"
              :value="item.val"
              v-model="taisyousyaYoteiIndex"
              :disabled="taisyousyaIndex != 1"
              @change="taisyousyaYoteiListClick"
            />
            <label
              :for="'cbKeikakuListstaisyoYotei-' + item.val"
              class="customCheckbox mr-2"
            >
              <span>{{ item.name }}</span>
            </label>
          </div>
          <label>】</label>
        </v-card>
      </v-row>

      <v-row class="rowStyle mb-1" no-gutters>
        <v-col cols="*" style="max-width: 230px">
          <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
          </alphabet-button>
        </v-col>
        <v-col style="max-width: 330px; height: 100%">
          <v-card class="hosokuTitle" outlined tile>
            <span class="under18 border mr-1" style="width: 80px">
              18歳未満
            </span>
            <v-btn
              class="ml-1"
              width="25"
              height="19"
              @click="filterClrclick()"
            >
              <v-icon dense>mdi-filter-off</v-icon>
              解除
            </v-btn>
          </v-card>
        </v-col>
        <v-col cols="3" style="text-align: right">
          <v-btn @click="onClickJyukyusya" height="20">受給者証登録へ</v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0" no-gutters>
        <wj-flex-grid
          id="keikakuListGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :alternatingRowStep="0"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'None'"
          :isReadOnly="true"
          :initialized="onInitialize"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
          :style="{ 'font-size': gridFontSize }"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedkeikakuIcrn"
            :showFilterIcons="false"
          ></wj-flex-grid-filter>
          <wj-flex-grid-column
            :binding="'riyocodeD'"
            align="center"
            valign="middle"
            format="g"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'rname'"
            align="center"
            valign="middle"
            width="4*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'age'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'birthD'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'shichoName'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'moniKbnName'"
            align="center"
            valign="middle"
            width="1.5*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'yotei'"
            align="center"
            valign="middle"
            width="2*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sakuseibi_an'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'yoshiki_text'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakuan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakusyukan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kihonjyoho'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'anDoui'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'teisyutu'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sikyukettei'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kaisaibi'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kanryo'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sakuseibi'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikaku'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakusyukan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'doui'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'moniKeizokuFlgD'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'keikakuanSinm'"
            align="center"
            valign="middle"
            width="2*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
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
        id="keikakuListDatepicker"
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
    <!-- 計画案 利用者同意・署名ダイアログ-->
    <v-dialog width="400" v-model="doui_dialog">
      <v-card elevation="2" class="common_dialog">
        <v-card-title class="dialog_title">
          計画案 利用者同意・署名
        </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="header_dialog_close"
          class="dialog_close"
        >
          <v-icon dark small> mdi-close </v-icon>
        </v-btn>
        <div class="common_dialog pa-1">
          <v-row no-gutters class="rowStyle_input">
            <v-card
              height="25"
              class="koumokuTitle titleBlueDark wd-70"
              outlined
              tile
            >
              利用者名
            </v-card>
            <v-card
              outlined
              tile
              v-model="doui_dialog_input.riyosya"
              height="25"
              class="ml-1 dialog_border_blue koumokuData wLng pl-1"
            >
              {{ doui_dialog_input.riyosya }}
            </v-card>
          </v-row>
          <v-row no-gutters class="mt-1 rowStyle_input">
            <v-card
              height="25"
              class="koumokuTitle titleBlue wd-70"
              outlined
              tile
            >
              同意日
            </v-card>
            <v-card
              outlined
              tile
              v-model="doui_dialog_input.anDouiYmd"
              class="wdMdl ml-1"
              width="150"
              height="25"
              @click="datepicker_doui_dialog = true"
              >{{ doui_dialog_input.anDouiYmd }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
          </v-row>

          <v-row no-gutters class="mt-1 rowStyle_input">
            <v-card
              height="25"
              class="koumokuTitle titleBlue wd-70"
              outlined
              tile
            >
              区分
            </v-card>
            <v-btn-toggle v-model="select_doui_man" class="ml-1">
              <v-btn
                height="24"
                small
                elevation="0"
                v-for="val in doui_man"
                :key="val.id"
              >
                {{ val.name }}
              </v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row no-gutters class="mt-1 rowStyle_input">
            <v-card
              height="25"
              class="koumokuTitle titleBlue wd-70"
              outlined
              tile
              >署名</v-card
            >
            <input
              v-model="doui_dialog_input.syomei"
              type="text"
              outlined
              tile
              class="dialog_text_field_mdl ml-1 pl-1"
              style="height: 25px; width: 200px; text-align: left"
            />
          </v-row>

          <v-row no-gutters class="mt-1 rowStyle_input">
            <v-btn elevation="2" height="24" @click="douiDelClick()">
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn elevation="2" height="24" @click="douiAddClick()">
              登録
            </v-btn>
          </v-row>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="datepicker_doui_dialog"
      width="300"
      class="datepicker_dialogs"
    >
      <v-date-picker
        v-model="doui_picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="douiSelect"
      >
      </v-date-picker>
    </v-dialog>

    <!-- 計画案 提出ダイアログ-->
    <v-dialog width="400" v-model="teisyutu_dialog">
      <v-card elevation="2" class="common_dialog">
        <v-card-title class="dialog_title">計画案 提出</v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="header_dialog_close"
          class="dialog_close"
        >
          <v-icon dark small> mdi-close </v-icon>
        </v-btn>
        <div class="common_dialog pa-1">
          <v-row no-gutters class="rowStyle_input">
            <v-card
              height="25"
              class="koumokuTitle titleBlueDark wd-70"
              outlined
              tile
            >
              利用者名
            </v-card>
            <v-card
              outlined
              height="25"
              class="ml-1 dialog_border_blue koumokuData wLng pl-1"
              v-model="teisyutu_dialog_input.riyosya"
            >
              {{ teisyutu_dialog_input.riyosya }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle_input mt-1">
            <v-card
              height="25"
              class="koumokuTitle titleBlue wd-70"
              outlined
              tile
            >
              提出日
            </v-card>

            <v-card
              outlined
              tile
              class="wdMdl ml-1"
              width="150"
              height="25"
              @click="datepicker_teisyutu_dialog = true"
              v-model="teisyutu_dialog_input.teisyutubi"
              >{{ teisyutu_dialog_input.teisyutubi }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
          </v-row>

          <v-row no-gutters class="mt-1 rowStyle_input">
            <v-btn elevation="2" height="24" @click="teisyutsuDelClick()">
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn elevation="2" height="24" @click="teisyutsuAddClick()">
              登録
            </v-btn>
          </v-row>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="datepicker_teisyutu_dialog"
      width="300"
      class="datepicker_dialogs"
    >
      <v-date-picker
        v-model="teisyutu_picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="teisyutuSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
import sysConst from '@/utiles/const';
import messageConst from '@/utiles/MessageConst';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '@connect/getConnect';
import { postConnect } from '@connect/postConnect';
import { deleteConnect } from '@connect/deleteConnect';
import printUtil from '@/utiles/printUtil';

export default {
  components: { AlphabetButton },
  data() {
    return {
      // 計画案 利用者同意・署名ダイアログ用
      doui_dialog: false,
      datepicker_doui_dialog: false,
      doui_picker: '',
      doui_man: [
        { id: 0, name: '本人' },
        { id: 1, name: '代理人' },
      ],
      doui_dialog_input: { riyosya: '', anDouiYmd: '', syomei: '' },
      select_doui_man: 0,
      select_doui_key: 0,
      // 計画案 提出ダイアログ用
      teisyutu_dialog: false,
      teisyutu_dialog_input: { riyosya: '', teisyutubi: '' },
      datepicker_teisyutu_dialog: false,
      teisyutu_picker: '',
      select_teisyutu_key: 0,
      fontsizeModel: 2,
      fontArray: [
        { key: 1, val: '大' },
        { key: 2, val: '中' },
        { key: 3, val: '小' },
      ],
      fontPixel: [
        { key: 1, val: '17px' },
        { key: 2, val: '15px' },
        { key: 3, val: '13px' },
      ],
      gridFontSize: '12px',
      headerRowHeight: 130,
      viewdataAll: [],
      viewdata: [],
      footerdata: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      tourokuScreenFlag: false,
      filterkeikakuIcrn: {},
      filteryoteisyaIcrn: {},
      tantousyaList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '鈴木' },
        { val: 2, name: '佐々木' },
        { val: 3, name: '伊藤' },
      ],
      selTantousya: 0,
      selTantousyaVal: '',
      taisyousyaList: [
        { val: 0, name: '全員' },
        { val: 1, name: '今月対象者' },
      ],
      taisyousyaYoteiList: [
        { val: 1, name: '新規' },
        { val: 2, name: '中途月変更' },
        { val: 3, name: '終期月更新' },
      ],
      taisyousyaIndex: 0,
      taisyousyaYoteiIndex: [],
      loading: false,
      headerColumn1: [
        'コード',
        '氏名',
        '年\n齢',
        '誕\n生\n月',
        '市区町村',
        '作\n成\n区\n分',
        '案作成\n予定月',
      ],
      headerColumn2: [
        '作成日',
        '様\n式',
        '計\n画\n案',
        '計\n画\n週\n間',
        '基\n本\n情\n報',
        '同\n意',
      ],
      headerColumn3: ['提\n出', '支\n給\n決\n定'],
      headerColumn4: ['開催日', '完\n了'],
      headerColumn5: ['作成日', '計\n画', '計\n画\n週\n間', '同\n意'],
      headerColumn6: ['モ\nニ\n継\n続\n中', '担当者'],
      // 各ヘッダの数を足した変数
      // 各ヘッダにタイトル名を表記する為
      headerPlus12: 0,
      headerPlus123: 0,
      headerPlus1234: 0,
      headerPlus12345: 0,
      headerPlus123456: 0,
      headerheight: 160,
      checkicon: ['□', '☑'],
      mainGrid: [],
      thickList: [4, 11, 12, 13, 14, 16, 19, 20, 21],
      selectedRowItem: {},
    };
  },
  created() {
    this.headerPlus12 = this.headerColumn2.length + this.headerColumn1.length;
    this.headerPlus123 = this.headerColumn3.length + this.headerPlus12;
    this.headerPlus1234 = this.headerColumn4.length + this.headerPlus123;
    this.headerPlus12345 = this.headerColumn5.length + this.headerPlus1234;
    this.headerPlus123456 = this.headerColumn6.length + this.headerPlus12345;
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.setPrintEvent();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  computed: {
    // バインドするスタイルを生成
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    calculateWindowHeight() {
      if (document.getElementById('keikakuListGrid') != null) {
        document.getElementById('keikakuListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    /***************************
     * 受給者証登録へボタン
     */
    onClickJyukyusya() {
      alert('受給者証登録ボタンへ押下');
      return false;
    },

    filterInitializedkeikakuIcrn: function (filter) {
      this.filterkeikakuIcrn = filter;
    },
    onInitialize(flexGrid) {
      flexGrid.beginUpdate();
      let _self = this;
      this.mainGrid = flexGrid;
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        _self.filterkeikakuIcrn.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        _self.filterkeikakuIcrn.showFilterIcons = false;
      });
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        if (ht.panel == flexGrid.cells) {
          let tmpitem = flexGrid.cells.rows[ht.row].dataItem;
          // 作成日を押下
          if (hPage.col === 7) {
            if (
              confirm(
                'サービス等利用計画(案)作成画面' + messageConst.CONFIRM.MOVE_TO
              )
            ) {
              this.$emit('an-select', tmpitem);
              return;
            }
          }
          // 同意を押下

          if (hPage.col === 12) {
            _self.select_doui_key = tmpitem.riyocode;
            _self.doui_dialog = true;
            _self.settingDouidialog(tmpitem);
          }
          // 提出を押下
          if (hPage.col === 13) {
            _self.select_teisyutu_key = tmpitem.riyocode;
            _self.teisyutu_dialog = true;
            _self.settingTeisyutudialog(tmpitem);
          }
        }
      });

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        cell.style.borderTop = '';
        cell.style.borderBottom = '';
        cell.style.borderRight = '';
        cell.style.borderLeft = '';
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          // if (r <= 1) {
          //   cell.style.borderBottom = 0;
          // }
          if (c >= 0 && c <= 4) {
            cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundOrangeDark;
          }
          if (c >= 5 && c <= 16) {
            cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
          }
          if (c >= 17 && c <= 22) {
            cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundGreen;
          }

          if (
            (r == 0 && (c == 13 || c == 14 || c == 21)) ||
            (r == 1 && (c == 12 || c == 20))
          ) {
            cell.style.borderRight =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
            cell.style.borderLeft =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
            cell.style.borderTop =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          if (c > 1) {
            cell.style.textAlign = 'right';
            cell.style.justifyContent = 'right';
            cell.style.alignItems = 'right';
          }
          cell.style.borderTop =
            ' double 4px ' + sysConst.COLOR.gridBorderColor;
          if (c <= 3) {
            cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
          } else {
            cell.style.backgroundColor = sysConst.COLOR.gridBackground;
          }
          if (c == 12 || c == 13 || c == 14 || c == 20 || c == 21) {
            cell.style.borderRight =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
            cell.style.borderLeft =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
            cell.style.borderBottom =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          let tmpitem = panel.rows[r].dataItem;
          if (tmpitem.age <= 18) {
            if (c == 1) {
              wjCore.addClass(cell, 'under18 cell');
            }
          }
          if (c == 1 || c == 4 || c == 22) {
            cell.style.textAlign = 'left';
          }

          if (c == 2 || c == 3) {
            cell.style.textAlign = 'right';
          }
          if (c <= 11 || (c >= 15 && c <= 19) || c >= 21) {
            cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }

          // 同意カラム
          if (c == 12) {
            cell.innerHTML = _self.checkicon[tmpitem.anDoui];
          }
          if (c == 13) {
            cell.innerHTML = _self.checkicon[tmpitem.teisyutu];
          }
          // 支給決定@カラム確認中
          if (c == 14) {
            if (tmpitem.ketteiUmu == 1) {
              cell.innerHTML = '☑';
            } else {
              cell.innerHTML = '□';
            }
          }
          // サービス等利用計画
          if (c == 20) {
            cell.innerHTML = _self.checkicon[tmpitem.doui];
          }
          if (c == 12 || c == 13 || c == 14 || c == 20 || c == 21) {
            cell.style.borderRight =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
            cell.style.borderLeft =
              '1px solid ' + sysConst.COLOR.viewTitleBackgroundMain;
          }
        }

        if (c == 4) {
          cell.style.borderRight =
            '1px solid ' + sysConst.COLOR.gridBorderColor;
        }
        if (c == _self.headerPlus1234) {
          cell.style.borderLeftStyle = 'double';
          cell.style.borderLeftColor = sysConst.COLOR.gridBorderColor;
        }
        if (c == _self.headerPlus12345) {
          cell.style.borderLeftStyle = 'double';
          cell.style.borderLeftColor = sysConst.COLOR.gridBorderColor;
        }
      };

      this.createHeader(flexGrid);
      this.createFooter(flexGrid);
      this.createMerge(flexGrid);
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.autoSizeRows(0, this.viewdata.length, false);
      flexGrid.endUpdate();
    },
    createFooter(flexGrid) {
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      var panel = flexGrid.columnFooters;
      panel.setCellData(0, 0, '合計件数');
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[1].height = 60;
      for (let i = 0; i < this.headerColumn1.length; i++) {
        let name = this.headerColumn1[i];
        panel.setCellData(0, i, name);
        panel.setCellData(1, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
      }
      panel.setCellData(0, this.headerColumn1.length, 'サービス等利用計画(案)');
      let no = 0;
      for (let i = this.headerColumn1.length; i < this.headerPlus12; i++) {
        let name = this.headerColumn2[no];
        panel.setCellData(0, i, 'サービス等利用計画(案)');
        panel.setCellData(1, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      no = 0;
      for (let i = this.headerPlus12; i < this.headerPlus123; i++) {
        let name = this.headerColumn3[no];
        panel.setCellData(0, i, name);
        panel.setCellData(1, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      panel.setCellData(0, this.headerPlus123, '担当者会議');
      no = 0;
      for (let i = this.headerPlus123; i < this.headerPlus1234; i++) {
        let name = this.headerColumn4[no];
        panel.setCellData(0, i, '担当者会議');
        panel.setCellData(1, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      panel.setCellData(0, this.headerPlus1234, 'サービス等利用計画');
      no = 0;
      for (let i = this.headerPlus1234; i < this.headerPlus12345; i++) {
        let name = this.headerColumn5[no];
        panel.setCellData(0, i, 'サービス等利用計画');
        panel.setCellData(1, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      no = 0;
      for (let i = this.headerPlus12345; i < this.headerPlus123456; i++) {
        let name = this.headerColumn6[no];
        panel.setCellData(0, i, name);
        panel.setCellData(1, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
    },
    createMerge(flexGrid) {
      let headerRanges = [];
      for (let i = 0; i < this.headerColumn1.length; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 1, i));
      }
      headerRanges.push(
        new wjGrid.CellRange(
          0,
          this.headerColumn1.length,
          0,
          this.headerPlus12 - 1
        )
      );

      for (let i = this.headerPlus12; i < this.headerPlus123; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 1, i));
      }

      headerRanges.push(
        new wjGrid.CellRange(0, this.headerPlus123, 0, this.headerPlus1234 - 1)
      );
      headerRanges.push(
        new wjGrid.CellRange(
          0,
          this.headerPlus1234,
          0,
          this.headerPlus12345 - 1
        )
      );

      for (let i = this.headerPlus12345; i < this.headerPlus123456; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 1, i));
      }

      let footerRanges = [];
      footerRanges = [new wjGrid.CellRange(0, 0, 0, 3)];

      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    onTantousyaClicked() {
      let key = this.selTantousya;
      this.selTantousya = this.tantousyaList[key].name;
      this.selTantousyaVal = key;
      this.userFilter();
    },

    onAlphabetical() {
      this.userFilter();
    },
    rbtTaisyousyaClick() {
      this.userFilter();
    },
    taisyousyaYoteiListClick() {
      // 要素があれば削除
      // if (this.taisyousyaYoteiIndex.indexOf(s) != -1) {
      //   this.taisyousyaYoteiIndex[this.taisyousyaYoteiIndex.indexOf(s)] = '';
      //   let array = [];
      //   for (let i = 0; i < this.taisyousyaYoteiIndex.length; i++) {
      //     if (this.taisyousyaYoteiIndex[i]) {
      //       array.push(this.taisyousyaYoteiIndex[i]);
      //     }
      //   }
      //   this.taisyousyaYoteiIndex = array;
      // } else {
      //   this.taisyousyaYoteiIndex.push(s);
      // }
      this.userFilter();
    },
    searchClicked() {
      this.search();
    },
    search() {
      let params = {
        uniqid: 3,
        traceid: 1,
        pJigyoid: 62,
        pSym: this.kikanYm.format('YYYYMM'),
      };
      getConnect('/KeikakuListsView', params, 'SIENP')
        .then((result) => {
          let array = result;
          this.viewdataAll = array;
          this.userFilter();
          console.log(this.viewdata);
        })
        .catch(function (error) {
          self.screenFlag = true;
          alert(
            messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
          );
        });
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdataAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      if (this.selTantousya && this.selTantousyaVal) {
        tmpviewdata = tmpviewdata.filter((x) => x.tanto == this.selTantousya);
      }
      if (this.taisyousyaIndex == 1) {
        if (this.taisyousyaYoteiIndex.length > 0) {
          tmpviewdata = tmpviewdata.filter(
            (x) =>
              (this.taisyousyaYoteiIndex.indexOf(1) >= 0 && x.moniKbn == 1) ||
              (this.taisyousyaYoteiIndex.indexOf(2) >= 0 && x.moniKbn == 5) ||
              (this.taisyousyaYoteiIndex.indexOf(3) >= 0 && x.moniKbn == 4)
          );
        } else {
          tmpviewdata = [];
        }
      }

      //コード順でソート
      tmpviewdata.sort((a, b) => {
        if (a.rcode < b.rcode) {
          return -1;
        }
        if (a.rcode > b.rcode) {
          return 1;
        }
        return 0;
      });

      this.viewdata = tmpviewdata;
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
        this.viewdata = [];
      }
    },
    monthSelect() {
      this.kikanYm = dayjs(this.picker);
      this.viewdata = [];
      this.datepicker_dialog = false;
    },

    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },

    douiSelect() {
      this.doui_dialog_input.anDouiYmd = dayjs(this.doui_picker).format(
        'YYYY年MM月DD日'
      );
      this.datepicker_doui_dialog = false;
    },
    teisyutuSelect() {
      this.teisyutu_dialog_input.teisyutubi = dayjs(
        this.teisyutu_picker
      ).format('YYYY年MM月DD日');
      this.datepicker_teisyutu_dialog = false;
    },
    header_dialog_close() {
      this.doui_dialog = false;
      this.teisyutu_dialog = false;
    },
    // 同意ダイアログの選択初期データ表記
    settingDouidialog(item) {
      this.selectedRowItem = item;
      this.doui_dialog_input.riyosya = item.riyocodeD + ' ' + item.rname;
      if (dayjs(item.anDouiYmd).isValid()) {
        this.doui_dialog_input.anDouiYmd = dayjs(item.anDouiYmd).format(
          'YYYY年MM月DD日'
        );
      } else {
        this.doui_dialog_input.anDouiYmd = dayjs().format('YYYY年MM月DD日');
      }
      this.doui_dialog_input.syomei = item.anSyomei;
    },
    // 提出ダイアログの選択初期データ表記
    settingTeisyutudialog(item) {
      this.selectedRowItem = item;
      this.teisyutu_dialog_input.riyosya = item.riyocodeD + ' ' + item.rname;
      if (dayjs(item.teiYmd).isValid()) {
        this.teisyutu_dialog_input.teisyutubi = dayjs(item.teiYmd).format(
          'YYYY年MM月DD日'
        );
      } else {
        this.teisyutu_dialog_input.teisyutubi =
          dayjs().format('YYYY年MM月DD日');
      }
    },

    onFontsize() {
      this.mainGrid.beginUpdate();
      if (this.fontsizeModel != undefined) {
        this.gridFontSize = this.fontPixel[this.fontsizeModel].val;
      }
      this.mainGrid.autoSizeRows(0, this.viewdata.length, false);
      this.mainGrid.autoRowHeights = true;
      this.mainGrid.itemsSource = [];
      this.mainGrid.itemsSource = this.viewdata;
      this.mainGrid.endUpdate();
    },
    filterClrclick() {
      this.filterkeikakuIcrn.clear();
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示月：' + this.getYm();
      printUtil.setSubTitleList([sub1]);
      printUtil.printExec('計画一覧', printUtil.DIRECTION.landscape);
    },
    /*
     * 利用計画案・同意↓
     */
    douiDelClick() {
      let params = {
        uniqid: 3,
        traceid: 123,
        jigyoid: 62,
        intcode: this.selectedRowItem.intcode,
        cntid: this.selectedRowItem.anCntID,
      };
      if (confirm('同意' + messageConst.CONFIRM.DELETE)) {
        deleteConnect('/KeikakuAnDoui', params, 'SIENP')
          .then((result) => {
            if (result.okflg == true) {
              this.doui_dialog = false;
              this.search();
            } else {
              alert(result.msg);
            }
          })
          .catch(function (error) {
            self.screenFlag = true;
            alert(
              messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
            );
          });
      }
    },
    douiAddClick() {
      let params = {
        uniqid: 3,
        traceid: 123,
        jigyoid: 62,
        intcode: this.selectedRowItem.intcode,
        cntid: this.selectedRowItem.anCntID,
        ymd: this.doui_dialog_input.anDouiYmd.replaceAll(/年|月|日/g, ''),
        siid: 1,
        kbn: this.select_doui_man,
        syomei: this.doui_dialog_input.syomei,
      };
      if (confirm('同意' + messageConst.CONFIRM.POST)) {
        postConnect('/KeikakuAnDoui', params, 'SIENP')
          .then((result) => {
            if (result.okflg == true) {
              this.doui_dialog = false;
              this.search();
            } else {
              alert(result.msg);
            }
          })
          .catch(function (error) {
            self.screenFlag = true;
            alert(
              messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
            );
          });
      }
    },
    /*
     * 利用計画案・同意↑
     */
    /*
     * 利用計画案・提出↓
     */
    teisyutsuDelClick() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pIntcode: this.selectedRowItem.intcode,
        pCntID: this.selectedRowItem.anCntID,
      };
      if (confirm('提出' + messageConst.CONFIRM.DELETE)) {
        deleteConnect('/KeikakuAnTeisyutsu', params, 'SIENP')
          .then((result) => {
            if (result.okflg == true) {
              this.teisyutu_dialog = false;
              this.search();
            } else {
              alert(result.msg);
            }
          })
          .catch(function (error) {
            self.screenFlag = true;
            alert(
              messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
            );
          });
      }
    },
    teisyutsuAddClick() {
      let params = {
        uniqid: 3,
        traceid: 123,
      };
      let body = {
        jigyoid: 62,
        intcode: this.selectedRowItem.intcode,
        cntid: this.selectedRowItem.anCntID,
        teiYmd: this.teisyutu_dialog_input.teisyutubi.replaceAll(
          /年|月|日/g,
          ''
        ),
      };
      if (confirm('提出' + messageConst.CONFIRM.POST)) {
        postConnect('/KeikakuAnTeisyutsu', params, 'SIENP', body)
          .then((result) => {
            if (result.okflg == true) {
              this.teisyutu_dialog = false;
              this.search();
            } else {
              alert(result.msg);
            }
          })
          .catch(function (error) {
            self.screenFlag = true;
            alert(
              messageConst.ERROR.ERROR + '[' + error.response.data.message + ']'
            );
          });
      }
    },
    /*
     * 利用計画案・提出↑
     */
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuListGrid,
div#keikakuLists {
  color: $font_color;
  font-family: 'メイリオ';
  font-size: 14px;
  // .wj-right {
  //   &.wj-elem-filter {
  //     float: none;
  //   }
  // }
  .wj-cell {
    font-weight: normal;

    &.wj-header {
      display: flex;
      justify-content: center;
      align-items: center;
      &.wj-header-alt {
        border-top: 1px solid;
      }
    }
  }
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
      background: #ffcccc;
    }
  }

  .v-input--selection-controls .v-input__slot > .v-label {
    font-size: 12px;
  }
}

div#keikakuListGrid {
  font-family: 'メイリオ';
  font-size: 12px;
  width: 100%;
  height: var(--height);
  z-index: 2;
  background: $grid_background;
  border: 1px solid $grid_Border_Color;
  min-height: 450px;
  .wj-header {
    font-weight: normal;
    line-height: 110%;
  }
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}
#keikakuListDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 60px;
  left: 100px;
  width: 300px;
  max-width: 300px;
}
</style>
