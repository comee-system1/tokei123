<template>
  <div
    id="user-list_scrollbar"
    :style="styles"
    :class="{
      'pr-5': dispHideBar === true && this.switchAreaLeftFlag == true,
      'pr-2': dispHideBar === false,
    }"
    class="pl-1 pr-1"
  >
    <div
      :class="{
        switchArea: switchAreaFlag == true,
        switchAreaRight: switchAreaRightFlag == true,
        switchAreaLeft: switchAreaLeftFlag == true,
      }"
      @click="switched"
      v-show="dispHideBar"
    >
      <v-icon
        small
        :class="{ anim_right: animtype == 1, anim_left: animtype == 2 }"
        >{{ switchIcon }}</v-icon
      >
    </div>
    <v-row
      no-gutters
      :class="{ v_enter_to: animtype == 1, v_enter_from: animtype == 2 }"
    >
      <v-col>
        <v-row no-gutters class="rowStyle ml-1" v-if="dispAddDaicho">
          <v-btn style="width: 100px" @click="addClicked"> 台帳新規登録 </v-btn>
          <v-spacer></v-spacer>
          <v-btn-toggle class="flex-wrap ma-0" v-model="selDispKbn" mandatory>
            <v-btn
              v-for="n in userDispList"
              :key="n.val"
              color="secondary"
              dark
              :width="n.width"
              :min-width="n.width"
              outlined
              @click="siborikomiUser(n.val)"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters v-show="dispSvcReki">
          <v-col cols="*" style="height: 100%">
            <div align="right">
              <label class="mr-1">サービス歴</label>
              <select
                class="customSelectBox mr-1"
                v-model="selSvcRireki"
                @change="onSvcRirekiClicked"
                style="width: 150px"
              >
                <option
                  v-for="val in svcRirekiList"
                  :key="val.id"
                  :value="val.id"
                >
                  {{ val.name }}
                </option>
              </select>
            </div>
          </v-col>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters v-show="dispYoteiYm">
          <v-col cols="*" style="height: 100%">
            <label class="titleGlay pl-1 pr-1">予定月</label>
            <v-btn
              @click="inputCalendarClick()"
              tile
              outlined
              width="115px"
              height="100%"
              class="btnymd pa-0 mr-1"
              >{{ getYoteiYm() }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>
            <v-btn-toggle
              class="flex-wrap ma-0"
              v-model="selDispYoteisya"
              mandatory
            >
              <v-btn
                v-for="n in dispYoteisyaList"
                :key="n.val"
                small
                color="secondary"
                dark
                :height="20"
                width="25"
                min-width="40"
                outlined
                @click="siborikomiYoteisya(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters>
          <label class="titleGlay pl-1 pr-1">担当者</label>
          <select
            class="customSelectBox mr-1"
            v-model="selTantou"
            @change="onTantouClicked"
            style="width: 115px"
          >
            <option v-for="val in tantouList" :key="val.id" :value="val.id">
              {{ val.name }}
            </option>
          </select>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters>
          <wj-combo-box
            class="pa-0"
            :textChanged="onTextChangedUser"
            style="width: 160px; height: 20px"
            placeholder="カナ検索"
          ></wj-combo-box>
        </v-row>

        <v-row class="rowStyle mt-1 mr-1" no-gutters justify="center">
          <v-btn-toggle class="flex-wrap" v-model="sortSearch" mandatory>
            <v-btn
              v-for="n in sortSelList"
              :key="n.val"
              color="secondary"
              dark
              outlined
              :height="20"
              :width="n.width"
              :min-width="n.width"
              @click="sortUser(n.val)"
            >
              {{ n.name }}
            </v-btn>
          </v-btn-toggle>
        </v-row>
        <div class="rowStyle mt-1" no-gutters>
          <v-btn-toggle class="flex-wrap ma-0" v-model="alphaSearch" mandatory>
            <v-btn
              outlined
              v-for="(n, k) in alphabet"
              :key="k"
              :width="24"
              style="min-width: auto; padding: 9px; height: 10px"
              @click="onAlphabet(k)"
              >{{ n }}</v-btn
            >
          </v-btn-toggle>
        </div>

        <wj-flex-grid
          id="userListGrid"
          :autoSearch="true"
          :headersVisibility="'Column'"
          :selectionMode="3"
          :initialized="onInitializedUser"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="usersViewData"
          :allowResizing="false"
          :allowDragging="false"
          :allowSorting="false"
          :showMarquee="true"
          :formatItem="onFormatItem"
        >
          <wj-flex-grid-column
            header="コード"
            binding="riyocode"
            width="2*"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
            v-if="riyocodeFlag"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="受給者番号"
            binding="jyukyuno"
            width="2*"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
            v-if="jyukyunoFlag"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="利用者名"
            binding="names"
            width="3*"
            :word-wrap="false"
            :allowResizing="true"
            :isReadOnly="true"
            align="center"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-col>
    </v-row>
    <v-dialog
      v-model="datepickerYoteiYm_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="user-list_scrollbar_Datepicker"
        type="month"
        v-model="pickerYoteiYm"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import ls from '@/utiles/localStorage';
import { Tooltip, PopupPosition } from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import { getConnect } from '@connect/getConnect';

let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;

const keySort = 'keyval00003';
const keyAlp = 'keyval00006';

let alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];
export default {
  props: {
    dispAddDaicho: Boolean,
    dispHideBar: Boolean,
    dispSvcReki: Boolean,
    dispYoteiYm: Boolean,
    headerheight: {
      type: Number,
      default: 80,
    },
  },
  data() {
    return {
      userListWidth: '280px',
      switchIcon: 'mdi-chevron-left',
      animtype: '0',
      switchAreaFlag: true,
      switchAreaRightFlag: false,
      switchAreaLeftFlag: true,
      userDispList: [
        { val: 0, name: '台帳', width: 45 },
        { val: 1, name: '本日予定者', width: 85 },
      ],
      textSearch: '',
      userDataSelect: [],
      usersData: [],
      usersViewData: [],
      isDroppedDown: false,
      alphabet: alphabet,
      sortSearch: 0,
      alphaSearch: 0,
      riyo_inf: [],
      riyocodeFlag: true,
      jyukyunoFlag: false,
      useTeikyoCode: '',
      selDispKbn: 0,
      selSvcRireki: 0,
      svcRirekiList: [
        { id: 0, name: '全部' },
        { id: 1, name: '登録済み' },
      ],
      selDispYoteisya: 0,
      dispYoteisyaList: [
        { id: 0, name: '予定者' },
        { id: 1, name: '全員' },
      ],
      selTantou: 0,
      tantouList: [
        { id: 0, name: '指定なし' },
        { id: 1, name: '担当者A' },
        { id: 2, name: '担当者B' },
        { id: 3, name: '担当者C' },
        { id: 4, name: '担当者D' },
      ],
      sortSelList: [
        { val: 0, name: 'コード順', width: 70 },
        { val: 1, name: 'カナ順', width: 70 },
        { val: 2, name: '受給者番号順', width: 100 },
      ],
      hdrTips: new Tooltip({
        position: PopupPosition.RightTop,
        showAtMouse: true,
        showDelay: 300,
        cssClass: 'hdr-tip',
      }),
      // 予定月用プロパティ
      pickerYoteiYm: '',
      yoteiYm: '',
      datepickerYoteiYm_dialog: false,
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.sortSearch = Number(ls.getlocalStorageEncript(keySort));
      this.alphaSearch = Number(ls.getlocalStorageEncript(keyAlp));
    });

    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    // バインドするスタイルを生成
    styles() {
      // ブラウザの高さ
      return {
        '--height':
          window.innerHeight - (parseInt(this.headerheight) + 125) + 'px',
        '--width': this.userListWidth,
      };
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('user-list_scrollbar') != null) {
        document.getElementById('user-list_scrollbar').style.height =
          window.innerHeight - this.headerheight + 'px';
        document.getElementById('userListGrid').style.height =
          window.innerHeight - (parseInt(this.headerheight) + 125) + 'px';
      }
    },
    switched() {
      this.animtype = this.animtype == '1' ? '2' : '1';

      if (this.switchAreaRightFlag == true) {
        this.switchAreaRightFlag = false;
        this.switchAreaLeftFlag = true;
        this.userListWidth = '280px';
      } else {
        this.switchAreaRightFlag = true;
        this.switchAreaLeftFlag = false;
        this.userListWidth = '0px';
      }

      this.$emit('childLeftArea', this.message);
    },
    initComboFilters(combo) {
      if (combo.hostElement.id == 'comboFilters1') {
        combo.header = combo.selectedItem.name;
      } else if (combo.hostElement.id == 'comboFilters2') {
        combo.header = combo.selectedItem.name;
      }
    },
    onSvcRirekiClicked() {
      this.selSvcRireki = this.svcRirekiList[this.selSvcRireki].id;
    },
    onTantouClicked() {
      this.selTantou = this.tantouList[this.selTantou].id;
    },
    siborikomiUser(siborikomiType) {
      this.selDispKbn = siborikomiType;
      this.userFilter();
    },
    siborikomiYoteisya(type) {
      this.selDispYoteisya = type;
      this.userFilter();
    },
    sortUser(sortType) {
      ls.setlocalStorageEncript(keySort, sortType);
      this.sortSearch = sortType;

      this.userFilter();
    },
    onAlphabet(key) {
      ls.setlocalStorageEncript(keyAlp, Number(key));
      this.alphaSearch = Number(key);
      this.userFilter();
    },
    onTextChangedUser(s) {
      this.textSearch = s.text;
      this.userFilter();
    },
    onSvcRirekiIndexChanged() {
      // mijissou
    },
    onTantouIndexChanged() {
      // mijissou
    },
    userFilter(s) {
      let data = [];
      this.userDataSelect.icrn_inf.forEach(function (value) {
        // if (value.names.indexOf(this.textSearch) != -1) {
        data.push(value);
        // }
      });
      if (this.textSearch.length) {
        let array = [];
        let param = this.textSearch;
        for (let i = 0; i < data.length; i++) {
          if (data[i].names.match(param) || data[i].kana.match(param)) {
            array.push(data[i]);
          }
        }
        data = [];
        data = array;
      }

      let alpval = this.alphaSearch;
      if (alpval > 0) {
        let get = [];
        data.forEach(function (value) {
          switch (alpval) {
            case 1:
              if (value.kana.match(/^[ｱ-ｵ]/)) {
                get.push(value);
              }
              break;
            case 2:
              if (value.kana.match(/^[ｶ-ｺ]/)) {
                get.push(value);
              }
              break;
            case 3:
              if (value.kana.match(/^[ｻ-ｿ]/)) {
                get.push(value);
              }
              break;
            case 4:
              if (value.kana.match(/^[ﾀ-ﾄ]/)) {
                get.push(value);
              }
              break;
            case 5:
              if (value.kana.match(/^[ﾅ-ﾉ]/)) {
                get.push(value);
              }
              break;
            case 6:
              if (value.kana.match(/^[ﾊ-ﾎ]/)) {
                get.push(value);
              }
              break;
            case 7:
              if (value.kana.match(/^[ﾏ-ﾓ]/)) {
                get.push(value);
              }
              break;
            case 8:
              if (value.kana.match(/^[ﾔ-ﾖ]/)) {
                get.push(value);
              }
              break;
            case 9:
              if (value.kana.match(/^[ﾗ-ﾛ]/)) {
                get.push(value);
              }
              break;
            case 10:
              if (value.kana.match(/^[ﾜ-ﾝ]/)) {
                get.push(value);
              }
              break;
          }
        });
        data = get;
      }

      if (this.dispYoteiYm && this.selDispYoteisya) {
        // TODO 予定ありのデータを表示する
        //data = data.filter((x) => x.yousiki == '者');
      }
      //コード順でソート
      if (this.sortSearch == 0) {
        data.sort((a, b) => {
          if (a.riyocode < b.riyocode) {
            return -1;
          }
          if (a.riyocode > b.riyocode) {
            return 1;
          }
          return 0;
        });
      }
      //利用者名でソート
      if (this.sortSearch == 1) {
        data.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          return 0;
        });
      }
      //受給者番号でソート
      if (this.sortSearch == 2) {
        data.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) {
            return -1;
          }
          if (a.jyukyuno > b.jyukyuno) {
            return 1;
          }
          return 0;
        });
      }
      if (s) {
        s.selectedIndex = 0; //どの値を選択しても初期状態に戻す
      }
      this.usersViewData = data.concat();

      this.$emit('child-user', this.usersViewData);
      if (this.sortSearch == 2) {
        this.riyocodeFlag = false;
        this.jyukyunoFlag = true;
      } else {
        this.riyocodeFlag = true;
        this.jyukyunoFlag = false;
      }
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onInitializedUser(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          //選択した要素の取得
          _self.$emit('child-select', flexGrid.rows[ht._row].dataItem); //親要素の処理を実行
        }
      });
      this.userGrid = flexGrid;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row + 1;
      flexGrid.alternatingRowStep = 0;

      let params = [];

      params = {
        uniqid: uniqid,
        traceid: traceid,
        getkbn: 0,
        jkbn: 0,
        sdnflg: 0,
        symd: '20220801',
        eymd: '20220901',
      };

      return getConnect('/userListPrint', params).then((result) => {
        _self.usersData = result.icrn_inf;
        _self.userDataSelect = result;
        this.userFilter();
      });
    },
    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1) {
          e.cell.style.textAlign = 'left';
          this.hdrTips.setTooltip(e.cell, flexGrid.rows[e.row].dataItem.kana);
        } else {
          e.cell.style.textAlign = 'center';
        }
      }
    },
    addClicked() {
      // mijissou
      window.open('https://www.yahoo.co.jp/');
    },
    getYoteiYm() {
      if (!this.yoteiYm) {
        this.yoteiYm = dayjs();
        this.pickerYoteiYm =
          this.yoteiYm.year() +
          '-' +
          this.yoteiYm.format('MM') +
          '-' +
          this.yoteiYm.format('DD');
      }
      return (
        this.yoteiYm.format('YYYY') + '年' + this.yoteiYm.format('MM') + '月'
      );
    },
    inputCalendarClick() {
      this.pickerYoteiYm =
        this.yoteiYm.format('YYYY') +
        '-' +
        this.yoteiYm.format('MM') +
        '-' +
        this.yoteiYm.format('DD');
      this.datepickerYoteiYm_dialog = true;
    },
    monthSelect() {
      let split = this.pickerYoteiYm.split('-');
      this.yoteiYm = dayjs({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.datepickerYoteiYm_dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#user-list_scrollbar {
  font-size: 12px;
  font-family: 'メイリオ';
  padding: 0;
  width: var(--width);
  background: #778899;
  #userListGrid {
    height: var(--height);
  }
  .rowStyle {
    height: 20px !important;
  }
  .v-btn {
    // width: 150px;
    height: 20px !important;
  }
  .wj-cell {
    padding: 2px;
    padding-top: 1px;
  }
  .wj-cell:not(.wj-header) {
    background: $grid_background;
    &:nth-child(3) {
      background-color: $white;
    }
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
  }

  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background;
    color: $font_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background;
    color: $font_color;
  }
  .wj-tooltip.hdr-tip {
    background: black;
    color: lightblue;
    padding: 1em 2em;
    margin: 0.5em;
    border-radius: 1em;
  }

  ::-webkit-scrollbar {
    width: 10px;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }

  div.customCombobox {
    position: relative;
    width: 200px !important;
    height: 20px !important;
    &.customCombobox {
      width: 220px !important;
      div {
        text-align: left;
      }
    }
    &#comboFiltersKasan {
      width: 150px !important;
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
      height: 17px !important;
      // padding: 0;
      span {
        // height: 21px !important;
        margin-top: 8px;
      }
      &.wj-form-control {
        position: absolute;
        // top: -3px;
        width: 100%;
        padding: 2px;
        padding-top: 4px;
      }
    }
    input {
      height: 20px !important;
    }
  }
  .wj-control .wj-input-group .wj-form-control {
    height: 20px !important;
  }
  .wj-control .wj-template,
  .wj-control .wj-input {
    height: 20px !important;
  }

  .switchArea {
    width: 14px;
    height: 100%;
    background-color: $black;
    position: absolute;
    left: 270px;
    z-index: 1;
    &.switchAreaRight {
      animation: switchAreaRightMove $seconds forwards;
    }
    &.switchAreaLeft {
      animation: switchAreaLeftMove $seconds forwards;
    }
    i {
      color: $white;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      height: 3.2rem;

      &.anim_right {
        animation: rotate-right $seconds forwards;
      }
      &.anim_left {
        animation: rotate-left $seconds forwards;
      }
    }
  }
  @keyframes switchAreaLeftMove {
    from {
      transform: translateX(-270px);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes switchAreaRightMove {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-270px);
    }
  }
  @keyframes rotate-right {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  @keyframes rotate-left {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .v_enter_to {
    animation: slide $seconds forwards;
  }
  .v_enter_from {
    animation: slideUp $seconds forwards;
  }

  @keyframes slide {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-254px);
    }
  }
  @keyframes slideUp {
    from {
      transform: translateX(-254px);
    }
    to {
      transform: translateX(0px);
    }
  }
}
#user-list_scrollbar_Datepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 120px;
  left: 50px;
  width: 300px;
  max-width: 300px;
}
</style>
