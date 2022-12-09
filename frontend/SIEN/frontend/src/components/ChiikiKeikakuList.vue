<template>
  <div id="chiikiKeikakuList">
    <v-container
      no-gutters
      class="pa-0 px-1"
      :style="styles"
      style="max-width: 100%"
    >
      <v-row no-gutters class="rowStyle">
        <v-card class="koumokuTitle titleMain pa-1" outlined tile>
          表示月
        </v-card>
        <v-card
          class="ml-1"
          color="transparent"
          height="100%"
          style="border: none; top: 1px"
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
        <v-btn
          class="ml-1"
          height="19"
          :loading="loading"
          @click="searchClicked()"
        >
          <v-icon dense>mdi-magnify</v-icon>
          検索
        </v-btn>
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
      </v-row>
      <v-row class="rowStyle mt-1" no-gutters>
        <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
        </alphabet-button>
        <v-btn class="ml-15" height="19" width="25" @click="filterClrclick()">
          <v-icon dense>mdi-filter-off</v-icon>
          解除
        </v-btn>
      </v-row>
      <v-row class="ma-0 mt-1" no-gutters>
        <wj-flex-grid
          id="chiikiKeikakuListGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowResizing="true"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'None'"
          :isReadOnly="false"
          :initialized="onInitialize"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
          :style="{ 'font-size': gridFontSize }"
        >
          <wj-flex-grid-filter
            :initialized="filterInitializedkeikakuIcrn"
            :showFilterIcons="false"
          />
          <wj-flex-grid-column
            :binding="'riyocode'"
            align="center"
            valign="middle"
            format="g"
            width="3*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'name'"
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
            :binding="'sityo'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kyufustart'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kyufuend'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'asses'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sakusei'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'startmonth'"
            align="center"
            valign="middle"
            width="2*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kan1'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kan2'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'doui'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="false"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'jissi'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'jissikan'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="true"
            aggregate="Cnt"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'teisyutu'"
            align="center"
            valign="middle"
            width="1*"
            :allowResizing="false"
            :isReadOnly="false"
            aggregate="Sum"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tanto'"
            align="center"
            valign="middle"
            width="3*"
            :allowResizing="false"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
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
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '@connect/getConnect';

const VIEWID = 'ChiikiKeikakuList';

export default {
  components: { AlphabetButton },
  data() {
    return {
      viewid: VIEWID,
      mainGrid: [],
      // 計画案 利用者同意・署名ダイアログ用
      doui_dialog: false,
      datepicker_doui_dialog: false,
      doui_picker: '',
      doui_man: ['本人', '代理人'],
      doui_dialog_input: { riyosya: '', douibi: '' },
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
      gridFontSize: '13px',
      headerRowHeight: 130,
      viewdataAll: [],
      viewdata: [],
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
      sikuchosonList: [
        { val: 0, name: '指定なし' },
        { val: 1, name: '東経市' },
        { val: 2, name: '西経市' },
        { val: 3, name: '港区' },
      ],
      selSikuchoson: 0,
      loading: false,
      headerColumn1: ['コード', '利用者名', '年\n齢', '市区町村'],
      headerColumn2: ['開始日', '終了日'],
      headerColumn3: ['アセスメント\n実施日'],
      headerColumn4: ['作成日', '開始月', '(1)', '(2)', '同\n意'],
      headerColumn5: ['実施日', '完\n了'],
      headerColumn6: ['提\n出', '担当者'],
      headerPlus12: 0,
      headerPlus123: 0,
      headerPlus1234: 0,
      headerPlus12345: 0,
      headerPlus123456: 0,
      headerheight: 200,
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
      if (document.getElementById('chiikiKeikakuListGrid') != null) {
        document.getElementById('chiikiKeikakuListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    initComboFilters(combo) {
      combo.header = combo.selectedItem.name;
    },
    filterInitializedkeikakuIcrn(filter) {
      this.filterkeikakuIcrn = filter;
    },
    onInitialize(flexGrid) {
      let _self = this;
      this.mainGrid = flexGrid;
      this.createHeader(flexGrid);
      this.createFooter(flexGrid);

      this.createMerge(flexGrid);

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filterkeikakuIcrn.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filterkeikakuIcrn.showFilterIcons = false;
      });

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          if (c >= 0 && c <= 3) {
            cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundOrange;
          } else if (c >= 4 && c <= 11) {
            cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
          } else {
            cell.style.backgroundColor =
              sysConst.COLOR.viewTitleBackgroundGreen;
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          if (c > 1) {
            cell.style.textAlign = 'right';
            cell.style.justifyContent = 'right';
            cell.style.alignItems = 'right';
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          let tmpitem = panel.rows[r].dataItem;
          if (tmpitem.age <= 18) {
            if (c == 1) {
              wjCore.addClass(cell, 'miman');
            }
          }
          if (c == 1 || c == 3 || c == 15) {
            cell.style.textAlign = 'left';
          } else if (c == 2) {
            cell.style.textAlign = 'right';
          } else {
            cell.style.textAlign = 'center';
          }
          cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }

        if (c == _self.headerPlus1234) {
          cell.style.borderLeftStyle = 'double';
        }
        if (c == _self.headerPlus12345) {
          cell.style.borderLeftStyle = 'double';
        }
      };
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData(true);
      let rc = this.mainGrid.columnHeaders.getCellBoundingRect(
        0,
        this.mainGrid.columns.length - 1,
        true
      );
      this.mainGrid.scrollPosition = new wjCore.Point(-rc.right, 0);
    },
    setViewData(isAll) {
      this.screenFlag = true;
      this.loading = true;
      if (isAll) {
        let params = {
          uniqid: 1,
          traceid: 1,
          pJigyoid: 43,
          pSym: 202112,
        };
        getConnect('/' + VIEWID + 'View', params, 'SIENC').then((result) => {
          this.viewdata = result;
          this.viewdataAll = result;
        });
      } else {
        this.userFilter();
      }
      this.loading = false;
    },
    filterClrclick() {
      this.filterkeikakuIcrn.clear();
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.beginUpdate();
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
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      // flexGrid.columnHeaders.rows[1].height = 50;
      for (let i = 0; i < this.headerColumn1.length; i++) {
        let name = this.headerColumn1[i];
        panel.setCellData(0, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
      }
      panel.setCellData(0, this.headerColumn1.length, '受給者証　給付決定期間');
      let no = 0;
      for (let i = this.headerColumn1.length; i < this.headerPlus12; i++) {
        let name = this.headerColumn2[no];
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
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
      panel.setCellData(0, this.headerPlus123, '地域移行計画');
      panel.setCellData(1, this.headerPlus123 + 2, '完了');
      no = 0;
      for (let i = this.headerPlus123; i < this.headerPlus1234; i++) {
        let c = 1;
        if (i >= this.headerPlus123 + 2 && i <= this.headerPlus123 + 3) {
          c = 2;
        }
        let name = this.headerColumn4[no];
        panel.setCellData(c, i, name);
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }

      panel.setCellData(0, this.headerPlus1234, '担当者会議');
      no = 0;
      for (let i = this.headerPlus1234; i < this.headerPlus12345; i++) {
        let name = this.headerColumn5[no];
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
        let col = flexGrid.columns[i];
        col.wordWrap = true;
        col.multiLine = true;
        no++;
      }
    },
    createMerge(flexGrid) {
      let headerRanges = [];
      for (let i = 0; i < this.headerColumn1.length; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 2, i));
      }

      headerRanges.push(
        new wjGrid.CellRange(
          0,
          this.headerColumn1.length,
          0,
          this.headerPlus12 - 1
        )
      );
      for (let i = this.headerColumn1.length; i < this.headerPlus12; i++) {
        headerRanges.push(new wjGrid.CellRange(1, i, 2, i));
      }

      for (let i = this.headerPlus12; i < this.headerPlus123; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 2, i));
      }

      headerRanges.push(
        new wjGrid.CellRange(0, this.headerPlus123, 0, this.headerPlus1234 - 1)
      );
      headerRanges.push(
        new wjGrid.CellRange(
          1,
          this.headerPlus123 + 2,
          1,
          this.headerPlus123 + 3
        )
      );
      for (let i = this.headerPlus123; i < this.headerPlus1234; i++) {
        let c = 1;
        if (i >= this.headerPlus123 + 2 && i <= this.headerPlus123 + 3) {
          c = 2;
        }
        headerRanges.push(new wjGrid.CellRange(c, i, 2, i));
      }

      headerRanges.push(
        new wjGrid.CellRange(
          0,
          this.headerPlus1234,
          0,
          this.headerPlus12345 - 1
        )
      );
      for (let i = this.headerPlus1234; i < this.headerPlus12345; i++) {
        headerRanges.push(new wjGrid.CellRange(1, i, 2, i));
      }

      for (let i = this.headerPlus12345; i < this.headerPlus123456; i++) {
        headerRanges.push(new wjGrid.CellRange(0, i, 2, i));
      }

      let footerRanges = [];
      footerRanges = [new wjGrid.CellRange(0, 0, 0, 2)];

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
      this.selTantousya = this.tantousyaList[this.selTantousya].val;
      this.userFilter();
    },
    onSikuchosonClicked() {
      this.selSikuchoson = this.sikuchosonList[this.selSikuchoson].val;
      this.userFilter();
    },

    onAlphabetical() {
      this.userFilter();
    },

    userFilter() {
      let tmpviewdata = [];
      tmpviewdata = this.viewdataAll.concat();
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');

      if (this.selTantousya) {
        let array = [];
        for (let i = 0; i < tmpviewdata.length; i++) {
          if (tmpviewdata[i].tantoid == this.selTantousya) {
            array.push(tmpviewdata[i]);
          }
        }
        tmpviewdata = array;
      }

      if (this.selSikuchoson) {
        let array = [];
        for (let i = 0; i < tmpviewdata.length; i++) {
          if (tmpviewdata[i].sityoid == this.selSikuchoson) {
            array.push(tmpviewdata[i]);
          }
        }
        tmpviewdata = array;
      }

      this.viewdata = tmpviewdata;
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
        this.viewdata = [];
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#chiikiKeikakuListGrid,
div#chiikiKeikakuList {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  .rowStyle {
    height: 20px;
  }
  .wj-right {
    &.wj-elem-filter {
      float: none;
    }
  }
  .wj-cell {
    font-weight: normal;

    &.wj-header {
      display: flex;
      justify-content: center;
      align-items: center;
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
    &.customCombobox {
      div {
        text-align: left;
      }
    }
    &#comboFilters {
      width: 205px !important;
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
    font-size: 12px;
  }
}

div#chiikiKeikakuListGrid {
  width: 100%;
  height: var(--height);
}

.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
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
