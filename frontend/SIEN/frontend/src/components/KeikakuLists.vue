<template>
  <div id="keikakuLists">
    <v-container class="mt-1 ml-1 pa-0" fluid>
      <v-row no-gutters class="rowStyle mt-1">
        <v-card class="koumokuTitle pa-1" outlined tile> 表示月 </v-card>
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
            height="100%"
            >{{ getYm() }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
          <v-btn
            elevation="0"
            class="pa-0 ml-1"
            height="100%"
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
        <v-btn>検索開始</v-btn>
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

      <v-row class="rowStyle mt-1" no-gutters v-if="selDispIndex == 0">
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-card class="hosokuTitle pa-1 ml-5" outlined tile>
          <span class="miman mr-1" style="width: 80px">18歳未満</span>
        </v-card>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="keikakuListGrid"
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
          :itemsSource="viewdatakeikaku"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedkeikakuIcrn"
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
//import * as wjGrid from '@grapecity/wijmo.grid';
//import * as wjCore from '@grapecity/wijmo';
// import ls from '@/utiles/localStorage';
//import sysConst from '@/utiles/const';
import AlphabetButton from '@/components/AlphabetButton.vue';

const STYLE_NONE = 'none';
// const STYLE_BG_PREBIRTH = '#ffcccc';
export default {
  components: { AlphabetButton },
  data() {
    return {
      selDispIndex: 0,

      viewdatakeikakuAll: [],
      viewdatakeikaku: [],
      kikanYm: '',
      picker: '',
      datepicker_dialog: false,
      screenFlag: false,
      tourokuScreenFlag: false,
      filterkeikakuIcrn: {},
      filteryoteisyaIcrn: {},
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
      taisyousyaIndex: 0,
      taisyousyaYoteiIndex: [],
      loading: false,
    };
  },
  mounted() {},
  methods: {
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitializedkeikakuIcrn: function (filter) {
      this.filterkeikakuIcrn = filter;
    },

    onInitializekeikakuIcrnGrid(flexGrid) {
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
    },

    filterApplied(e) {
      this.grdAutoSizeRow(e.grid);
    },
    setNonFilterCol(col) {
      var Nonefilter = this.filterkeikakuIcrn.getColumnFilter(col);
      Nonefilter.filterType = STYLE_NONE;
    },

    onTantousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },

    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        this.createdemodata();
        this.userFilter();
      } else {
        this.userFilter();
      }
    },

    onAlphabetical() {
      this.userFilter();
    },

    taisyousyaClicked(s) {
      this.selTantousya = this.selectCmb(s);
    },
    selectCmb(s) {
      //s.header = s.selectedItem.name;
      // this.setViewData(false);
      // let f = document.activeElement;
      // f.blur();
      return s.selectedValue;
    },
    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdatakeikakuAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');
      this.viewdatakeikaku = tmpviewdata;
    },
    getYm() {
      if (!this.kikanYm) {
        this.kikanYm = moment().startOf('months');
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
      let split = this.picker.split('-');
      this.kikanYm = moment({
        years: split[0],
        months: Number(split[1]) - 1,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
    touroku_dialog_close() {
      this.tourokuScreenFlag = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#keikakuLists {
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
</style>
