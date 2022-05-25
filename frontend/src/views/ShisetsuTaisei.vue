<template>
  <div id="shisetsu">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :searchButtonFlag="true"
      :registButtonFlag="false"
    ></header-services>
    <v-container fluid class="shisetsu-container">
      <v-row no-gutters>
        <v-col cols="3">
          <v-row no-gutters class="mb-1">
            <v-col cols="6">
              <v-card class="pa-2 red--text text--lighten-1" outlined tile>
                {{ buildcheck }}
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-btn class="pa-2 ml-2" @click="checkingRegist()">
                {{ checkbutton }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-for="(detail, index) in details"
            :key="index"
            no-gutters
            class="mb-1"
          >
            <v-col cols="6">
              <v-card class="pa-1 text-center titleback" outlined tile>{{
                detail.name
              }}</v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="ml-1 pa-1 light_yellow" tile outlined>{{
                detail.value
              }}</v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7" class="ml-1">
          <v-row no-gutters>
            <v-col class="ml-auto text-right">
              <v-btn @click="registPage()"> 施設体制修正 </v-btn>
              <v-card elevation="0" class="mt-2">
                (最終登録日:R03.04.05 10:10 昭和 一郎)
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters pa-0>
            <v-col cols="6">
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
                style="height: 20vh"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'体制による基本単価減'"
                  :allowMerging="true"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
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
            </v-col>
            <v-col cols="6" class="pl-1">
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
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card class="pa-2 mt-5" outlined tile>
        <v-row no-gutters>
          <v-col sm="12">
            <v-row no-gutters>
              <v-col cols="2">
                <v-card class="pa-2 text-center blue lighten-4" outlined tile>
                  日別算定
                </v-card>
              </v-col>
              <v-col cols="4">
                <div class="my-n3">
                  <v-checkbox v-model="checkbox" :label="`有り`"></v-checkbox>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="mt-3">〇:対象日 ×:除外日</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
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
            <v-btn>登録</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import HeaderServices from '../components/HeaderServices.vue';

//最低の行数
let minRow10 = 10;
let minRow20 = 20;

let define_week = ['日', '月', '火', '水', '木', '金', '土'];
let buildcheck = ['施設体制未確認', '施設体制確認済'];
let checkbutton = ['確認登録', '確認解除'];

export default {
  data() {
    return {
      search: ['32:施設入所支'],
      year: moment().year(),
      month: moment().format('MM'),
      details: this.getDetail(),
      basicData: this.getBasicData(),
      basicAdd: this.getBasicAdd(),
      basicPlus: this.getBasicPlus(),
      checkbox: false,
      daycount: moment().daysInMonth(),
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
    this.handleResize;
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      //windowサイズ
      let lot = 4;
      let lot3 = 2;
      let height = window.innerHeight;
      if (height < 700) lot = 6;
      if (height < 700) lot3 = 3;
      height = height / lot;
      let height3 = window.innerHeight / lot3;
      try {
        document.getElementById('grid1').style.height = height + 'px';
        document.getElementById('grid2').style.height = height + 'px';
        document.getElementById('grid3').style.height = height3 + 'px';
      } catch (e) {
        // console.log(e);
      }
    },
    parentCalendar(dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = moment(this.year + '-' + this.month + '-01');
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
      let year = moment().year();
      if (this.year) year = this.year;
      let month = moment().format('MM');
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
      flexGrid.columnHeaders.rows[0].height = 48;
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
      } else {
        this.buildcheck = buildcheck[0];
        this.checkbutton = checkbutton[0];
        this.checkflag = 0;
      }
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
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

#shisetsu {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px !important;

  .shisetsu-container {
    padding: 4px;
  }

  .titleback {
    background-color: $light-gray;
    border: none;
  }

  .light_yellow {
    background-color: $light_yellow;
  }

  #theGridTallRows.wj-flexgrid .wj-cell {
    height: 40px;
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
}
</style>