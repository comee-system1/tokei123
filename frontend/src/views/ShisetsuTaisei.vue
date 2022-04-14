<template>
  <v-container fluid id="main">
    <v-container fluid>
      <v-row dense>
        <v-col sm="9">
          <v-row>
            <v-col col="12" class="d-flex flex-row">
              <div class="pa-2">サービス</div>
              <wj-combo-box
                text="11210000 障碍者支援 ひまわり"
                style="width: 300px"
              ></wj-combo-box>
              <wj-combo-box :items-source="search"></wj-combo-box>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-row">
              <div class="pa-2">提供月</div>
              <input
                type="month"
                name="example"
                :value="year + '-' + month"
                v-on:change="calenderChange"
              />
              <div class="pa-2 ml-5">請求月</div>
              <input type="month" name="example" :value="year + '-' + month" />
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="3">
          <v-row justify="end">
            <v-btn>作業状況確認</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>

      <v-card class="d-flex mb-6" flat tile>
        <v-card class="pa-2 red--text text--lighten-1" outlined tile>
          {{ buildcheck }}
        </v-card>
        <v-btn class="pa-2 ml-2 mt-1" @click="checkingRegist()">
          {{ checkbutton }}
        </v-btn>
        <v-btn class="pa-2 ml-auto mt-1" @click="registPage()">
          施設体制修正
        </v-btn>
      </v-card>

      <v-row >
        <v-col cols="2">
          <v-row v-for="(detail, index) in details" :key="index" no-gutters>
            <v-col cols="6">
              <v-card
                class="pa-2 text-center "
                elevation="0"
                >{{ detail.name }}</v-card
              >
            </v-col>
            <v-col cols="6">
              <v-card class="pa-2" elevation="0">{{ detail.value }}</v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="10">
          <v-row justify="end" no-gutters>
            <v-card class="pa-1 yellow lighten-5 text-caption" outlined tile>
              (最終登録日:R03.04.05 10:10 昭和 一郎)
            </v-card>
          </v-row>
          <v-row>
            <v-col cols="6">
              <wj-flex-grid
                :initialized="onInitializedBasic"
                :itemsSource="basicData"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                style="max-height: 200px"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'体制による基本単価減'"
                  :allowMerging="true"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
              <wj-flex-grid
                :initialized="onInitializedAdd"
                :itemsSource="basicAdd"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                style="max-height: 200px"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'施設体制による加算'"
                  :allowMerging="true"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="6">
              <wj-flex-grid
                :initialized="onInitializedPlus"
                :itemsSource="basicPlus"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                style="max-height: 400px"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'施設体制+個別による加算'"
                  :allowMerging="true"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-card class="pa-2" outlined tile>
        <v-row>
          <v-col sm="3">
            <v-row no-gutters>
              <v-col cols="6">
                <v-card class="pa-2 text-center blue lighten-4" outlined tile>
                  日別算定
                </v-card>
              </v-col>
              <v-col cols="2">
                <v-card class="ml-2 pt-0" elevation="0">
                  <v-checkbox
                    v-model="checkbox"
                    :label="`有り`"
                    class="pt-3 my-n1"
                  ></v-checkbox>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="pa-2 mt-1" elevation="0">
                  〇:対象日 ×:除外日
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
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
              :allowMerging="'ColumnHeaders'"
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
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import customMergeUser from '@/utiles/customMergeUser';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';

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
    };
  },
  methods: {
    getDetail() {
      let data = [];
      data.push(
        {
          name: '事務所番号',
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
    getdateData: function () {
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
    calenderChange(e) {
      let split = e.target.value.split('-');
      this.year = split[0];
      this.month = split[1];
      let m = moment(this.year + '-' + this.month + '-01');
      this.daycount = m.daysInMonth();
      this.getdateData();
    },
    getBasicData: function () {
      let basicdata = [];
      basicdata = [{ value: '身体拘束廃止未実装減算' }];
      return this.setlist(basicdata, minRow10);
    },
    getBasicAdd: function () {
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
    getBasicPlus: function () {
      let basicdata = [];
      basicdata = [
        { value: '重度障害者支援加算Ⅱ2' },
        { value: '重度障害者支援加算Ⅱ3' },
        { value: '栄養マネジメント加算' },
        { value: '体験宿泊支援加算' },
      ];
      return this.setlist(basicdata, minRow20);
    },
    setlist: function (basicdata, minRow) {
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
    onInitializedBasic: function (flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.textAlign = 'center';
        }
      };
    },
    onInitializedAdd: function (flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.textAlign = 'center';
        }
      };
    },
    onInitializedPlus: function (flexGrid) {
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        var s = cell.style;
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          s.textAlign = 'center';
        }
      };
    },
    onInitializedDate: function (flexGrid) {
      flexGrid.mergeManager = new customMergeUser();
      flexGrid.rowHeaders.columns[0].width = 30;
      flexGrid.formatItem.addHandler(cellEdit);
    },
    registPage: function () {
      alert('事業所情報登録ページに遷移を予定');
    },
    checkingRegist: function () {
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
  },
};

function cellEdit(s, e) {
  if (e.cell.children.length == 0) {
    let align = 'center';
    let str = '';
    if (isDate.isDate(e.cell.innerText)) {
      str = dateFormatString.dateFormatString(e.cell.innerText, define_week);
    } else if (e.cell.innerText == '1') {
      str = '〇';
    } else if (e.cell.innerText == '2') {
      str = '×';
    } else {
      str = e.cell.innerText;
    }

    e.cell.innerHTML = '<div>' + str + '</div>';
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
}
</script>
<style lang="scss" scope>
#theGridTallRows.wj-flexgrid .wj-cell {
  height: 68px;
}
</style>