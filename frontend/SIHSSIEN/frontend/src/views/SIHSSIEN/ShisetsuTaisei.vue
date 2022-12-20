<template>
  <div id="shisetsu">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :searchButtonFlag="true"
      :registButtonFlag="false"
    ></header-services>
    <v-container fluid class="pa-1">
      <v-row no-gutters class="rowStyle_Input mb-1 mt-0">
        <v-btn
          id="shisetsuKakuninBtn"
          elevation="3"
          class="commonBtn mr-1"
          height="100%"
          @click="dispChange(true)"
        >
          <v-icon dense>mdi-home-search-outline</v-icon>
          施設体制確認
        </v-btn>
        <v-btn
          id="shisetsuHibetuBtn"
          elevation="3"
          class="commonBtn mr-1"
          height="100%"
          @click="dispChange(false)"
        >
          <v-icon dense>mdi-calendar-cursor-outline</v-icon>
          日別変動登録
        </v-btn>
      </v-row>
      <v-divider class="mb-1" style="border: 1px solid #187b51"></v-divider>
      <v-row no-gutters v-show="dispTaisei">
        <v-col cols="3" style="max-width: 330px; min-width: 330px">
          <v-row no-gutters class="rowStyle_Input mb-1">
            <v-card
              id="shisetuTaiseiJyoutai"
              class="koumokuTitle wMdl"
              outlined
              tile
              width="100%"
              style="font-weight: bold"
            >
              {{ buildcheck }}
            </v-card>
          </v-row>
          <v-row
            v-for="(detail, index) in details"
            :key="index"
            no-gutters
            class="rowStyle_Input mb-1"
          >
            <v-col cols="6">
              <v-card
                class="koumokuTitle titleBlue wMdl"
                height="25"
                outlined
                tile
                >{{ detail.name }}</v-card
              >
            </v-col>
            <v-col cols="6">
              <v-card class="pl-1 koumokuData" height="25" tile outlined>
                {{ detail.value }}
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7" class="ml-1">
          <v-row no-gutters class="rowStyle_Input mb-1">
            <v-card elevation="0" class="koumokuTitle titleYellow" width="auto">
              施設体制最終登録日:R03.04.05 10:10 (担当者：昭和 一郎)
            </v-card>
            <v-spacer></v-spacer>
            <v-btn
              elevation="2"
              class="commonBtn"
              height="24"
              @click="registPage()"
            >
              <v-icon dense>mdi-link-variant</v-icon>
              施設体制修正へ
            </v-btn>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-row no-gutters>
                <wj-flex-grid
                  id="grid1"
                  :initialized="onInitializedBasic"
                  :itemsSource="basicData"
                  :headersVisibility="'Column'"
                  :autoGenerateColumns="false"
                  :allowAddNew="false"
                  :allowDelete="false"
                  :allowDragging="false"
                  :allowPinning="false"
                  :allowResizing="false"
                  :allowSorting="false"
                  :isReadOnly="true"
                  :alternatingRowStep="0"
                  :selectionMode="'None'"
                  style="height: 20vh"
                >
                  <wj-flex-grid-column
                    :binding="'value'"
                    :header="'体制による基本単価減'"
                    :allowMerging="true"
                    width="*"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </v-row>
              <v-row no-gutters>
                <wj-flex-grid
                  id="grid2"
                  :initialized="onInitializedAdd"
                  :itemsSource="basicAdd"
                  :headersVisibility="'Column'"
                  :autoGenerateColumns="false"
                  :allowDragging="false"
                  :allowResizing="false"
                  :allowSorting="false"
                  :isReadOnly="true"
                  :allowAddNew="false"
                  :allowDelete="false"
                  :allowPinning="false"
                  :alternatingRowStep="0"
                  :selectionMode="'None'"
                  style="height: 20vh"
                >
                  <wj-flex-grid-column
                    :binding="'value'"
                    :header="'施設体制による加算'"
                    :allowMerging="true"
                    width="*"
                    :alternatingRowStep="0"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </v-row>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-row no-gutters>
                <wj-flex-grid
                  id="grid3"
                  :initialized="onInitializedPlus"
                  :itemsSource="basicPlus"
                  :headersVisibility="'Column'"
                  :autoGenerateColumns="false"
                  :allowDragging="false"
                  :allowResizing="false"
                  :allowSorting="false"
                  :isReadOnly="true"
                  :alternatingRowStep="0"
                  :selectionMode="'None'"
                  style="height: 40vh"
                >
                  <wj-flex-grid-column
                    :binding="'value'"
                    :header="'施設体制+個別による加算'"
                    :autoGenerateColumns="false"
                    :allowDragging="false"
                    :allowResizing="false"
                    :allowSorting="false"
                    :isReadOnly="true"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowPinning="false"
                    :selectionMode="'None'"
                    width="*"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  class="commonBtn"
                  height="24"
                  @click="checkingRegist()"
                >
                  {{ checkbutton }}
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card tile flat v-show="!dispTaisei">
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card class="koumokuTitle titleMain wMdl" outlined tile>
            日別算定
          </v-card>
          <v-checkbox
            class="ma-0 pa-0 mr-1 ml-1"
            hide-details
            v-model="checkbox"
            :label="'有り'"
            style="width: 200px"
          >
          </v-checkbox>
          <div>〇:対象日 ×:除外日</div>
        </v-row>
        <v-row no-gutters>
          <wj-flex-grid
            id="theGridTallRows"
            :itemsSource="dateData"
            :initialized="onInitializedDate"
            :headersVisibility="'Column'"
            :isReadOnly="true"
            :allowDragging="false"
            :allowResizing="false"
            :deferResizing="false"
            :allowSorting="false"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowMerging="'ColumnHeaders'"
            :alternatingRowStep="0"
          >
            <wj-flex-grid-column
              header="加算・減算項目"
              binding="clumn"
              width="10*"
              :allowMerging="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="d in daycount"
              :key="d"
              width="1*"
              :header="year + '/' + month + '/' + d"
              :binding="'day' + d"
              :wordWrap="true"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mt-1">
          <v-spacer></v-spacer>
          <v-btn elevation="2" class="commonBtn" height="24">登録</v-btn>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import HeaderServices from '../../components/HeaderServices.vue';
import sysConst from '@/utiles/const';
//最低の行数
let minRow10 = 10;
let minRow20 = 20;

let define_week = ['日', '月', '火', '水', '木', '金', '土'];
let buildcheck = ['施設体制未確認', '施設体制確認済'];
let checkbutton = ['確認登録', '確認解除'];

export default {
  data() {
    return {
      dispTaisei: true,
      shisetuTaiseiJyoutaiFlg: false,
      search: ['32:施設入所支'],
      year: dayjs().year(),
      month: dayjs().format('MM'),
      details: this.getDetail(),
      basicData: this.getBasicData(),
      basicAdd: this.getBasicAdd(),
      basicPlus: this.getBasicPlus(),
      checkbox: false,
      daycount: dayjs().daysInMonth(),
      dateData: this.getdateData(),
      buildcheck: buildcheck[0],
      checkbutton: checkbutton[0],
      checkflag: 0,
      dateArgument: '',
      searchArgument: '',
    };
  },
  components: {
    HeaderServices,
  },

  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
    this.dispChange(true);
    this.changeShisetuTaiseiJyoutai();
  },
  methods: {
    calculateWindowHeight() {
      try {
        let height = window.innerHeight - 220;
        let heightHalf = height / 2;
        document.getElementById('grid1').style.height = heightHalf + 'px';
        document.getElementById('grid2').style.height = heightHalf + 'px';
        document.getElementById('grid3').style.height = height + 'px';

        let heightHibetu = window.innerHeight - 210;
        document.getElementById('theGridTallRows').style.height =
          heightHibetu + 'px';
      } catch (e) {
        // console.log(e);
      }
    },
    parentCalendar(dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = dayjs(this.year + '-' + this.month + '-01');
      this.daycount = m.daysInMonth();
      this.getdateData();
    },
    parentSearch(searchArgument) {
      console.log('searchArgument');
      console.log(searchArgument);
    },
    getDetail() {
      let data = [];
      data.push(
        {
          name: '事業所番号',
          value: 112100012,
        },
        {
          name: '級地区分',
          value: '1級地',
        },
        {
          name: '利用定員',
          value: '50人',
        },
        {
          name: '定員区分',
          value: '41人～60人以下',
        },
        {
          name: '事業所区分',
          value: '指定',
        },
        {
          name: '施設区分',
          value: '公立',
        },
        {
          name: '事業実施区分',
          value: '併設',
        }
      );
      return data;
    },
    getdateData() {
      let data = [];
      data = [
        {
          year: '2022',
          month: '04',
          clumn: '定員超過減算',
          day6: 1,
          day7: 1,
          day8: 1,
          day9: 1,
        },
        {
          year: '2022',
          month: '04',
          clumn: '夜勤職員配置体制加算',
          day4: 2,
          day10: 2,
          day25: 2,
          day28: 2,
        },
        {
          year: '2022',
          month: '05',
          clumn: '定員超過減算',
          day10: 1,
          day12: 1,
          day16: 1,
          day17: 1,
        },
      ];

      let array = [];
      let year = dayjs().year();
      if (this.year) year = this.year;
      let month = dayjs().format('MM');
      if (this.month) month = this.month;
      data.forEach(function (element) {
        if (element.year == year && element.month == month) {
          array.push({
            year: element.year,
            month: element.month,
            clumn: element.clumn,
            day1: element.day1,
            day2: element.day2,
            day3: element.day3,
            day4: element.day4,
            day5: element.day5,
            day6: element.day6,
            day7: element.day7,
            day8: element.day8,
            day9: element.day9,
            day10: element.day10,
            day11: element.day11,
            day12: element.day12,
            day13: element.day13,
            day14: element.day14,
            day15: element.day15,
            day16: element.day16,
            day17: element.day17,
            day18: element.day18,
            day19: element.day19,
            day20: element.day20,
            day21: element.day21,
            day22: element.day22,
            day23: element.day23,
            day24: element.day24,
            day25: element.day25,
            day26: element.day26,
            day27: element.day27,
            day28: element.day28,
            day29: element.day29,
            day30: element.day30,
            day31: element.day31,
          });
        }
      });
      this.dateData = array;
      return array;
    },

    getBasicData() {
      let basicdata = [];
      basicdata = [{ value: '身体拘束廃止未実装減算' }];
      return this.setlist(basicdata, minRow10);
    },
    getBasicAdd() {
      let basicdata = [];
      basicdata = [
        { value: '夜勤職員配置体制加算' },
        { value: '重度障害者支援加算Ⅰ1' },
        { value: '重度障害者支援加算Ⅰ2' },
        { value: '夜間看護体制加算' },
        { value: '口腔衛生管理体制加算' },
        { value: '福祉・介護職員処遇改善加算Ⅰ' },
      ];
      return this.setlist(basicdata, minRow10);
    },
    getBasicPlus() {
      let basicdata = [];
      basicdata = [
        { value: '重度障害者支援加算Ⅱ2' },
        { value: '重度障害者支援加算Ⅱ3' },
        { value: '栄養マネジメント加算' },
        { value: '体験宿泊支援加算' },
      ];
      return this.setlist(basicdata, minRow20);
    },
    setlist(basicdata, minRow) {
      let i = 0;
      let data = [];
      if (minRow <= basicdata.length) minRow = basicdata.length;
      while (i < minRow) {
        if (typeof basicdata[i] != 'undefined') {
          data.push({ value: basicdata[i].value });
        } else {
          data.push({ value: '' });
        }
        i++;
      }
      return data;
    },
    onInitializedBasic(flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.textAlign = 'center';
        }
      };
    },
    onInitializedAdd(flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.textAlign = 'center';
        }
      };
    },
    onInitializedPlus(flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.textAlign = 'center';
        }
      };
    },
    onInitializedDate(flexGrid) {
      flexGrid.rowHeaders.columns[0].width = 20;
      flexGrid.columnHeaders.rows[0].height = 45;
      flexGrid.rows.defaultSize = 34;
      flexGrid.formatItem.addHandler(this.cellEdit);
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        if (_self.checkbox == false) return false;
        var ht = flexGrid.hitTest(e);
        if (ht.target.innerHTML == '〇') {
          ht.target.innerHTML = '×';
        } else if (ht.target.innerHTML == '×') {
          ht.target.innerHTML = '';
        } else if (ht.target.innerHTML.length == 0) {
          ht.target.innerHTML = '〇';
        }
      });
    },
    registPage() {
      alert('事業所情報登録ページに遷移を予定');
    },
    checkingRegist() {
      if (this.checkflag == 0) {
        this.buildcheck = buildcheck[1];
        this.checkbutton = checkbutton[1];
        this.checkflag = 1;
        this.shisetuTaiseiJyoutaiFlg = true;
      } else {
        this.buildcheck = buildcheck[0];
        this.checkbutton = checkbutton[0];
        this.checkflag = 0;
        this.shisetuTaiseiJyoutaiFlg = false;
      }
      this.changeShisetuTaiseiJyoutai();
    },

    cellEdit(s, e) {
      if (e.cell.children.length == 0) {
        let align = 'center';
        let str = '';
        if (isDate.isDate(e.cell.innerText)) {
          str = dateFormatString.dateFormatString(
            e.cell.innerText,
            define_week
          );
        } else if (e.cell.innerText == '1') {
          str = '〇';
        } else if (e.cell.innerText == '2') {
          str = '×';
        } else {
          str = e.cell.innerText;
        }

        e.cell.innerHTML = '<div class="text-caption">' + str + '</div>';
        wjCore.setCss(e.cell, {
          display: 'table',
          tableLayout: 'fixed',
        });
        wjCore.setCss(e.cell.children[0], {
          display: 'table-cell',
          textAlign: align,
          verticalAlign: 'middle',
        });
      }
    },
    dispChange(isDispTaisei) {
      this.dispTaisei = isDispTaisei;
      if (this.dispTaisei) {
        document.getElementById('shisetsuKakuninBtn').style.backgroundColor =
          sysConst.COLOR.viewTitleBackgroundOrangeDark;
        document.getElementById('shisetsuHibetuBtn').style.backgroundColor =
          sysConst.COLOR.btn_background;
      } else {
        document.getElementById('shisetsuKakuninBtn').style.backgroundColor =
          sysConst.COLOR.btn_background;
        document.getElementById('shisetsuHibetuBtn').style.backgroundColor =
          sysConst.COLOR.viewTitleBackgroundOrangeDark;
      }
    },
    changeShisetuTaiseiJyoutai() {
      if (this.shisetuTaiseiJyoutaiFlg) {
        document.getElementById('shisetuTaiseiJyoutai').style.backgroundColor =
          sysConst.COLOR.viewTitleBackgroundGreen;
        document.getElementById('shisetuTaiseiJyoutai').style.color =
          sysConst.COLOR.viewTitleFontColorGreen;
      } else {
        document.getElementById('shisetuTaiseiJyoutai').style.backgroundColor =
          sysConst.COLOR.viewTitleBackgroundRed;
        document.getElementById('shisetuTaiseiJyoutai').style.color =
          sysConst.COLOR.viewTitleFontColorRed;
      }
    },
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

#shisetsu {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px !important;

  .light_yellow {
    background-color: $light_yellow;
  }

  #theGridTallRows.wj-flexgrid .wj-cell {
    height: 40px;
  }

  .wj-header {
    // ヘッダのみ縦横中央寄せ
    color: $font_color;
    font-size: $cell_fontsize;
    font-weight: normal;
    background: $view_Title_background_Green;
  }

  .wj-cell:not(.wj-header) {
    background: $grid_background;
    font-size: $cell_fontsize;
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
}
#theGridTallRows {
  color: $font_color;
  font-size: $cell_fontsize;
  width: 100%;
  min-width: 1250px;
  background: $grid_background;
  border: 1px solid $grid_Border_Color;
  min-height: 150px;
  &.wj-flexgrid [wj-part='root'] {
    overflow-x: hidden !important;
    overflow-y: scroll !important;
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
    background: $view_Title_background_Green;
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

  // .wj-cells .wj-cell.wj-state-multi-selected {
  //   background: $grid_selected_background;
  //   color: $grid_selected_color;
  // }

  // .wj-cells .wj-cell.wj-state-selected {
  //   background: $grid_selected_background;
  //   color: $grid_selected_color;
  // }
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
</style>