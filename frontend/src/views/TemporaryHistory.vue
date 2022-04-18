<template>
  <div id="temporaryHistory">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="2">
          <user-list-print
            @child-select="setUserSelectPoint"
            @child-event="createInfo"
            @child-user="childSelectUser"
          >
          </user-list-print>
        </v-col>
        <v-col cols="10" class="pa-1">
          <v-container fluid>
            <v-row no-gutters class="ml-1">
              <v-col cols="3">
                <v-row class="border-bottom">
                  <v-col class="pa-1" cols="3"
                    ><label><b>利用者</b></label></v-col
                  >
                  <v-col class="pa-1" cols="6"
                    ><span id="selectUserText"></span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="1">
                <v-row no-gutters>
                  <v-col class="mt-n1">
                    <v-btn x-small @click="onMoveUser('back')"
                      ><span class="wj-glyph-left"></span
                    ></v-btn>
                    <v-btn x-small @click="onMoveUser('next')"
                      ><span class="wj-glyph-right"></span
                    ></v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row class="border-bottom">
                  <v-col class="pa-1" cols="4"
                    ><label class="pa-1"><b>受給者証番号</b></label></v-col
                  >
                  <v-col class="pa-1" cols="4"
                    ><span id="selectUserExamNumber"></span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="*">
                <v-row class="mt-n5">
                  <v-col
                    ><small
                      >最終編集者: R03.08.08 12:36 (担当者：大正雅夫)</small
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-container ma-0 pa-0>
            <div class="helperArea">
              <v-row no-gutters>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0" color="#ccc">
                    受給者証<br />情報
                  </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0"> 援護者 </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card
                    class="pa-1"
                    elevation="0"
                    v-for="(n, index) in helper.helper"
                    :key="index"
                    :min-width="100"
                  >
                    <div>{{ n.name }}</div>
                    <div>{{ n.term }}</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0"> 助成自治体番号 </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0">
                    {{ helper.helperNum }}
                  </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0"> 障害種別 </v-card>
                  <v-card class="pa-1" elevation="0"> 障害支区 </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0">
                    {{ helper.personType }}
                  </v-card>
                  <v-card class="pa-1" elevation="0">
                    {{ helper.personHelp }}
                  </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0"> 負担上限額 </v-card>
                  <v-card class="pa-1" elevation="0"> 特別給付費 </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0">
                    {{ helper.chargeMaxMoney }}
                  </v-card>
                  <v-card class="pa-1" elevation="0">
                    {{ helper.specialMoney }}
                  </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card class="pa-1" elevation="0"> 上限管理事 </v-card>
                </v-col>
                <v-col cols="12" sm="1">
                  <v-card
                    class="pa-1"
                    elevation="0"
                    v-for="(n, index) in helper.limitAdmin"
                    :key="index"
                    :min-width="100"
                  >
                    <div>{{ n.name }}</div>
                    <div>{{ n.term }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-container>
          <v-container mt-0 pt-0 class="d-flex justify-end" fluid>
            <div class="mt-1">
              <v-img src="../assets/tyusyaku_01.png"></v-img>
            </div>
            <div class="ml-2"><small>:編集可能</small></div>

            <div class="ml-5 mt-1">
              <v-img src="../assets/tyusyaku_02.png"></v-img>
            </div>
            <div class="ml-2"><small>:入退院</small></div>

            <div class="ml-5 mt-1">
              <v-img src="../assets/tyusyaku_03.png"></v-img>
            </div>
            <div class="ml-2"><small>:外泊</small></div>

            <div class="ml-5 editMark"></div>
            <div class="ml-2"><small>:手修正済み</small></div>
          </v-container>

          <wj-flex-grid
            id="theGridTallRows"
            :itemsSource="infoData"
            :initialized="onInitializedInfo"
            :headersVisibility="'Column'"
            :isReadOnly="true"
            :allowDragging="false"
            :allowResizing="false"
            :deferResizing="false"
            :allowSorting="false"
          >
            <wj-flex-grid-column
              header=" "
              binding="space"
              :width="30"
              :wordWrap="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="項目"
              binding="item"
              :width="200"
              :wordWrap="true"
              :allowMerging="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="d in daycount"
              :key="d"
              width="*"
              :header="year + '/' + month + '/' + d"
              :binding="'day' + d"
              :wordWrap="true"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="合計"
              binding="totals"
              :width="60"
              :wordWrap="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              header="金額"
              binding="money"
              :width="80"
              :wordWrap="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-2">
        <v-card-title class="text-h5"> 変動情報登録 </v-card-title>
        <v-card class="d-flex" flat>
          <v-card class="pa-2" elevation="0">
            <v-btn-toggle mandatory color="black">
              <v-btn depressed small block :width="100">入退院</v-btn>
              <v-btn depressed small block :width="100">外泊</v-btn>
            </v-btn-toggle>
          </v-card>
        </v-card>

        <v-container>
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col cols="3">
              <v-card elevation="0">入院日 </v-card>
            </v-col>
            <v-col cols="9" class="ml-2">
              <v-card class="pa-0" elevation="0">
                <datepicker
                  :language="ja"
                  class="input_picker"
                  :format="DatePickerFormat"
                ></datepicker>
                <v-card class="d-flex mb-6" color="lighten-2" flat tile>
                  <v-card class="pa-0" elevation="0">
                    <v-radio-group row class="mt-1"
                      >施設の利用
                      <v-radio label="あり" value="radio-1"></v-radio>
                      <v-radio label="なし" value="radio-2"></v-radio>
                    </v-radio-group>
                  </v-card>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap" class="mt-n6 mx-auto">
            <v-col cols="3" class="flex-grow-0 flex-shrink-0">
              <v-card elevation="0" min-height="30">食事 </v-card>
            </v-col>
            <v-col cols="9" class="mt-n5 mx-auto">
              <v-card class="d-flex" elevation="0">
                <v-card elevation="0">
                  <v-checkbox
                    label="朝食"
                    value="朝食"
                    hide-details
                  ></v-checkbox>
                </v-card>
                <v-card elevation="0">
                  <v-checkbox
                    label="昼食"
                    value="昼食"
                    hide-details
                  ></v-checkbox>
                </v-card>
                <v-card elevation="0">
                  <v-checkbox
                    label="夕食"
                    value="夕食"
                    hide-details
                  ></v-checkbox>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap" class="mt-3">
            <v-col cols="3" class="flex-grow-0 flex-shrink-0">
              <v-card elevation="0">病院名 </v-card>
            </v-col>
            <v-col cols="9">
              <v-card elevation="0">
                <v-text-field
                  label="病院名を入力"
                  class="mt-n4 mx-auto"
                ></v-text-field>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col cols="3" class="flex-grow-0 flex-shrink-0">
              <v-card elevation="0">退院日 </v-card>
            </v-col>
            <v-col cols="9" class="flex-grow-0 flex-shrink-0 ml-2">
              <v-card class="pa-0" elevation="0">
                <datepicker
                  :language="ja"
                  class="input_picker"
                  :format="DatePickerFormat"
                ></datepicker>
                <v-card class="d-flex mb-6" color="lighten-2" flat tile>
                  <v-card class="pa-0" elevation="0">
                    <v-radio-group row class="mt-1"
                      >施設の利用
                      <v-radio label="あり" value="radio-1"></v-radio>
                      <v-radio label="なし" value="radio-2"></v-radio>
                    </v-radio-group>
                  </v-card>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap" class="mt-n6 mx-auto">
            <v-col cols="3" class="flex-grow-0 flex-shrink-0">
              <v-card elevation="0" min-height="30">食事 </v-card>
            </v-col>
            <v-col cols="9" class="mt-n5 mx-auto">
              <v-card class="d-flex" elevation="0">
                <v-card elevation="0">
                  <v-checkbox
                    label="朝食"
                    value="朝食"
                    hide-details
                  ></v-checkbox>
                </v-card>
                <v-card elevation="0">
                  <v-checkbox
                    label="昼食"
                    value="昼食"
                    hide-details
                  ></v-checkbox>
                </v-card>
                <v-card elevation="0">
                  <v-checkbox
                    label="夕食"
                    value="夕食"
                    hide-details
                  ></v-checkbox>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <hr size="1" />

        <v-card class="d-flex mt-3" elevation="0">
          <v-card elevation="0">
            <v-btn @click="dialog = false" tile outlined> 削除 </v-btn>
          </v-card>
          <v-card elevation="0" class="ml-1">
            <v-btn @click="dialog = false" tile outlined> クリア </v-btn>
          </v-card>
          <v-card elevation="0" class="ml-auto">
            <v-btn @click="dialog = false" tile outlined> 登録 </v-btn>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_add" width="500">
      <v-card class="pa-2">
        <v-card-title> 個別加算追加登録 </v-card-title>
        <v-card class="d-flex justify-center" flat>
          <v-card class="pa-2" elevation="0">
            <wj-combo-box :items-source="addSelect"></wj-combo-box>
          </v-card>
        </v-card>
        <v-container class="lighten-5">
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col cols="4" class="flex-grow-0 flex-shrink-0">
              <v-card elevation="0">開始日 </v-card>
            </v-col>
            <v-col cols="8">
              <v-card elevation="0">
                <datepicker
                  :language="ja"
                  :format="DatePickerFormat"
                  class="input_picker"
                ></datepicker>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap" class="mt-1">
            <v-col cols="4">
              <v-card elevation="0">終了日 </v-card>
            </v-col>
            <v-col cols="8">
              <v-card elevation="0">
                <datepicker
                  :language="ja"
                  :format="DatePickerFormat"
                  class="input_picker"
                ></datepicker>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap" class="mt-5 mx-auto">
            <v-col cols="4">
              <v-card elevation="0">単位数 </v-card>
            </v-col>
            <v-col cols="8"> 30単位/日 </v-col>
          </v-row>
          <v-row no-gutters style="flex-wrap: nowrap" class="mt-3">
            <v-col cols="4" class="flex-grow-0 flex-shrink-0">
              <v-card elevation="0">留意事項 </v-card>
            </v-col>
            <v-col cols="8">
              <ol>
                <li>入所日(算定日)から30日を限度</li>
                <li>同一敷地外の病院に30日以上入院した場合は、再算定可能</li>
                <li>過去3ヶ月間に入所理由がないこと</li>
              </ol>
            </v-col>
          </v-row>

          <hr size="1" />

          <v-card class="d-flex mt-3" elevation="0">
            <v-card elevation="0">
              <v-btn @click="dialog_add = false" tile outlined> 削除 </v-btn>
            </v-card>
            <v-card elevation="0" class="ml-1">
              <v-btn @click="dialog_add = false" tile outlined> クリア </v-btn>
            </v-card>
            <v-card elevation="0" class="ml-auto">
              <v-btn @click="dialog_add = false" tile outlined> 登録 </v-btn>
            </v-card>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as wjCore from '@grapecity/wijmo';

import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.grid';

import moment from 'moment';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import customMerge from '@/utiles/customMerge';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';

import HeaderServices from '../components/HeaderServices.vue';
import UserListPrint from '../components/UserListPrint.vue';
import isDate from '@/utiles/isDate';
import dateFormatString from '@/utiles/dateFormatString';
import numberFormat from '@/utiles/numberFormat';

//ユーザーデータ
let userDataSelect = [];

//どこかに共通配列として定義する
const define_first = [];
const define_second = [];
const define_third = [];
define_first[1] = '変動情報';
define_first[2] = '個別加算';
define_second[1] = {
  name: '利用日',
  sub: '(入所日:R03.07.03)',
};
define_second[2] = {
  name: '入退院・外泊',
  sub: '期間',
};
define_second[3] = {
  name: '食事',
  sub: '朝食',
};
define_second[4] = {
  name: '食事',
  sub: '昼食',
};
define_second[5] = {
  name: '食事',
  sub: '夕食',
};
define_second[6] = {
  name: '光熱水費',
};
define_third[1] = {
  name: '入院外泊時加算Ⅰ',
  editicon: 1,
};
define_third[2] = {
  name: '入院外泊時加算Ⅱ',
  editicon: 1,
};
define_third[3] = {
  name: '栄養マネジメント加算',
  editicon: 1,
};
define_third[4] = {
  name: '療養食加算',
  editicon: 1,
};
define_third[5] = {
  name: '加算追加',
};

let define_week = ['日', '月', '火', '水', '木', '金', '土'];

let year = moment().year();
let month = moment().format('MM');
let userInfo = [];
let daycount = 0;

export default {
  data() {
    return {
      year: year,
      month: month,
      daycount: daycount,
      addSelect: ['入所時特別支援加算'],
      week: define_week,
      isDroppedDown: false,
      ja: ja,
      infoData: this.createInfoData(),
      selectUserCode: '',
      userRow: 0, //ユーザを選択した配列のrow
      dialog: false,
      dialog_add: false,
      helper: this.getHelperData(),
      DatePickerFormat: 'yyyy年MM月dd日',
      dateArgument: '',
      searchArgument: '',
    };
  },
  components: {
    HeaderServices,
    Datepicker,
    UserListPrint,
  },
  created() {
    moment.locale('ja');
    this.daycount = moment().daysInMonth();
    daycount = this.daycount;
  },

  methods: {
    parentCalendar(dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = moment(this.year + '-' + this.month + '-01');
      this.daycount = m.daysInMonth();
      daycount = this.daycount;
      this.createInfo();
    },
    parentSearch(searchArgument) {
      console.log('searchArgument');
      console.log(searchArgument);
    },
    childSelectUser(data) {
      userDataSelect = data;
    },
    getHelperData() {
      let helpers = [];
      helpers = {
        helper: [
          {
            name: '東経市',
            term: '7/1～7/9',
          },
          {
            name: '西経市',
            term: '7/10～7/20',
          },
          {
            name: '北経市',
            term: '7/20～7/22',
          },
        ],
        limitAdmin: [
          {
            name: 'ひまわり園',
            term: '7/1～7/9',
          },
          {
            name: 'はまなす園',
            term: '7/10～7/30',
          },
        ],
        helperNum: '123456',
        personType: '知的',
        personHelp: '区分4',
        chargeMaxMoney: '9,300円',
        specialMoney: '500円',
      };

      return helpers;
    },
    createInfoData() {
      if (userInfo.length > 0) userInfo = [];
      userInfo.push({
        uniqkey: 1,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[1],
        item: define_second[1].name,
        day3: '1',
        day4: '1',
        day5: '1',
        day22: '1',
        day23: '1',
        day24: '1',
        day25: '1',
        totals: '12',
        money: '2700',
      });

      userInfo.push({
        uniqkey: 2,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[1],
        item: define_second[2].name,
        day5: 'arrow_12' + '-' + '4/5～4/7[3]', //入退院の始まりの矢印(日程を記載)
        day6: 'arrow_11', //入退院の途中の矢印
        day7: 'arrow_11',
        day8: 'arrow_11',
        day9: 'arrow_13', //入退院の終わりの矢印

        day15: 'arrow_22' + '-' + '4/15～4/21[7]', //外泊の始まりの矢印
        day16: 'arrow_21', //外泊の途中の矢印
        day17: 'arrow_21',
        day18: 'arrow_21',
        day19: 'arrow_21',
        day20: 'arrow_21',
        day21: 'arrow_23', //外泊の終わりの矢印
      });
      userInfo.push({
        uniqkey: 3,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[1],
        item: define_second[3].name + '_' + define_second[3].sub,
        day3: '2',
        day4: '2',
        day5: '2',
        day22: '3',
        day23: '2',
        day24: '2',
        day25: '2',
      });
      userInfo.push({
        uniqkey: 4,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[1],
        item: define_second[4].name + '_' + define_second[4].sub,
        day3: '2',
        day4: '2',
        day5: '2',
        day22: '3',
        day23: '2',
        day24: '2',
        day25: '2',
      });
      userInfo.push({
        uniqkey: 5,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[1],
        item: define_second[5].name + '_' + define_second[5].sub,
      });
      userInfo.push({
        uniqkey: 6,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[1],
        item: define_second[6].name,
      });
      userInfo.push({
        uniqkey: 7,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[2],
        item: define_third[1].name,
        editicon: define_third[1].editicon,
        day6: '2',
        day7: '2',
        day8: '2',
        day9: '2',
        day10: '2',
        day11: '2',
      });
      userInfo.push({
        uniqkey: 8,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[2],
        item: define_third[2].name,
        editicon: define_third[4].editicon,
        day12: '2',
        day13: '2',
        day14: '2',
        day15: '2',
        day16: '2',
        day17: '2',
      });
      userInfo.push({
        uniqkey: 9,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[2],
        item: define_third[3].name,
        editicon: define_third[4].editicon,
      });
      userInfo.push({
        uniqkey: 10,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[2],
        item: define_third[4].name,
        editicon: define_third[4].editicon,
      });
      userInfo.push({
        uniqkey: 11,
        year: 2022,
        month: '04',
        usercode: 1000,
        space: define_first[2],
        item: define_third[5].name,
      });

      userInfo.push({
        uniqkey: 20,
        year: 2022,
        month: '05',
        usercode: 1000,
        space: define_first[1],
        item: define_second[1].name,
        day6: '1',
        day8: '1',
        day9: '1',
        day24: '1',
        day26: '1',
        day29: '1',
        day30: '1',
        totals: '30',
        money: '9700',
      });

      userInfo.push({
        year: 2022,
        month: '04',
        usercode: 1001,
        space: define_first[1],
        item: define_second[1].name,
        day6: '1',
        day8: '1',
        day9: '1',
        day24: '1',
        day26: '1',
        day29: '1',
        day30: '1',
      });

      return this.createInfo();
    },

    createInfo: function (ucode = '') {
      //表示用のデータ
      if (this.year) year = this.year;
      if (this.month) month = this.month;
      let returns = [];
      this.infoData = returns;
      //初回ユーザーコード
      let usercode = '';
      if (ucode) {
        usercode = ucode;
      } else {
        usercode = userInfo[0].usercode;
      }

      userInfo.forEach(function (element) {
        if (
          element.year == year &&
          element.month == month &&
          element.usercode == usercode
        ) {
          returns.push({
            year: element.year,
            month: element.month,
            usercode: element.usercode,
            space: element.space,
            item: element.item,
            money: element.money,
            totals: element.totals,
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

      this.infoData = returns;
      return this.infoData;
    },

    dialogModal: function () {
      this.dialog = true;
    },
    onInitializedInfo: function (flexGrid) {
      flexGrid.mergeManager = new customMerge();
      flexGrid.rowHeaders.columns[0].width = 20;
      flexGrid.columnHeaders.rows[0].height = 60;
      flexGrid.formatItem.addHandler(cellEdit);
      let _self = this;

      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        console.log(ht.target.innerText);
        console.log(e.target.innerHTML);
        if (e.target.innerHTML.match(/termEdit/)) {
          _self.dialog = true;
        } else if (ht.target.innerText == define_second[2].sub) {
          _self.dialog = true;
        } else if (ht.target.innerText == define_third[5].name) {
          _self.dialog_add = true;
        } else if (ht.target.innerText == 'editicon') {
          //個別加算編集アイコン
          _self.dialog_add = true;
        } else if (e.target.innerHTML == '〇') {
          e.target.innerText = '×';
        } else if (e.target.innerHTML == '×') {
          e.target.innerHTML = '';
        } else if (
          e.target.innerHTML == '' ||
          e.target.innerHTML == '<div class="text-center"></div>' ||
          e.target.innerHTML == '<div class="red-sign"></div>'
        ) {
          e.target.innerHTML = '<div class="red-sign">〇</div>';
        }
      });
    },
    onMoveUser: function (type) {
      let row;
      if (type == 'next') row = this.userRow + 1;
      if (type == 'back') row = this.userRow - 1;
      if (row <= 0) row = 0;
      if (userDataSelect.length <= row) row = userDataSelect.length;
      this.userRow = row;
      this.setUserSelectPoint(row);
      this.selectUserCode = userDataSelect[row].riyocode;
      this.createInfo(userDataSelect[row].riyocode);
    },
    setUserSelectPoint: function (row) {
      document.querySelector('#selectUserText').innerText =
        userDataSelect[row].riyocode + ' ' + userDataSelect[row].names;
      document.querySelector('#selectUserExamNumber').innerText =
        userDataSelect[row].jyukyuno;
    },
  },
};

function cellEdit(s, e) {
  if (e.cell.children.length == 0) {
    let align = 'left';
    let str = '';
    if (isDate.isDate(e.cell.innerText)) {
      str = dateFormatString.dateFormatString(e.cell.innerText, define_week);
    } else if (e.cell.innerText == '1') {
      str = "<div class='maru'>maru</div>";
    } else if (e.cell.innerText == '2') {
      str = "<div class='red-sign'>〇</div>";
    } else if (e.cell.innerText == '3') {
      str = "<div class='red-sign'>×</div>";
    } else if (e.cell.innerText.match(/^arrow_12/)) {
      //始まりの矢印(入退院)
      let date = e.cell.innerText.split('-')[1];
      str = "<div class='red-arrow_start'>";
      str += '<div>&nbsp;</div>';
      str += '</div>';
      str += "<div class='arrow_box'><div>" + date;
      str += "<span class='d-none'>termEdit</span>";
      str += '</div></div>';
    } else if (e.cell.innerText == 'arrow_11') {
      //途中の矢印(入退院)
      str = "<div class='red-arrow'></div>";
    } else if (e.cell.innerText == 'arrow_13') {
      //終わりの矢印(入退院)
      str = "<div class='red-arrow_end'><div></div></div>";
    } else if (e.cell.innerText.match(/^arrow_22/)) {
      //始まりの矢印(外泊)
      let date = e.cell.innerText.split('-')[1];
      str = "<div class='green-arrow_start'>";
      str += '<div></div>';
      str += '</div>';
      str += "<div class='arrow_box'><div>" + date;
      str += "<span class='d-none'>termEdit</span>";
      str += '</div></div>';
    } else if (e.cell.innerText == 'arrow_21') {
      //途中の矢印(外泊)
      str = "<div class='green-arrow'></div>";
    } else if (e.cell.innerText == 'arrow_23') {
      //終わりの矢印(外泊)
      str = "<div class='green-arrow_end'><div></div></div>";
    } else if (e.cell.innerText == define_second[1].name) {
      //利用日
      str = "<div class='text-left-float'>" + define_second[1].name + '</div>';
      str +=
        "<div class='text-right-float mt-3 text-caption grey--text'>" +
        define_second[1].sub +
        '</div>';
    } else if (e.cell.innerText == define_second[2].name) {
      //入退院・外泊
      str =
        "<div class='text-left-float'>" +
        define_second[2].name +
        "</div><a class='ml-2 addButton' >" +
        define_second[2].sub +
        '</a>';
    } else if (
      e.cell.innerText ==
      define_second[3].name + '_' + define_second[3].sub
    ) {
      //食事・朝食
      str =
        "<div class='text-left-float'>" +
        define_second[3].name +
        "</div><div class='text-right-float border-right'><p>" +
        define_second[3].sub +
        '</p></div>';
    } else if (
      e.cell.innerText ==
      define_second[4].name + '_' + define_second[4].sub
    ) {
      //食事・昼食
      str =
        "<div class='text-left-float'></div><div class='text-right-float border-right'><p>" +
        define_second[4].sub +
        '</p></div>';
    } else if (
      e.cell.innerText ==
      define_second[5].name + '_' + define_second[5].sub
    ) {
      //食事・夕食
      str =
        "<div class='text-left-float'></div><div class='text-right-float border-right'><p>" +
        define_second[5].sub +
        '</p></div>';
    } else if (e.cell.innerText == define_third[1].name) {
      //入院外泊
      str =
        "<div class='text-left-float'>" +
        define_third[1].name +
        "<div class='text-right-float '><a class='editicon'>editicon</a></div></div>";
    } else if (e.cell.innerText == define_third[2].name) {
      //入院外泊
      str =
        "<div class='text-left-float'>" +
        define_third[2].name +
        "<div class='text-right-float '><a class='editicon'>editicon</a></div></div>";
    } else if (e.cell.innerText == define_third[3].name) {
      //入院外泊
      str =
        "<div class='text-left-float'>" +
        define_third[3].name +
        "<div class='text-right-float '><a class='editicon'>editicon</a></div></div>";
    } else if (e.cell.innerText == define_third[4].name) {
      //療養食
      str =
        "<div class='text-left-float'>" +
        define_third[4].name +
        "<div class='text-right-float '><a class='editicon'>editicon</a></div></div>";
    } else if (e.cell.innerText == define_third[5].name) {
      //加算外泊
      str =
        "<div class='text-left-float addButton'>" +
        define_third[5].name +
        '</div>';
    } else if (
      e.cell.innerText == '合計' ||
      e.cell.innerText == '金額' ||
      e.cell.innerText == '項目'
    ) {
      str = "<div class='text-center'>" + e.cell.innerText + '</div>';
    } else {
      str = e.cell.innerHTML;
    }

    if (!isNaN(str)) {
      let yen = '';
      if (e.row >= 0 && e.col == daycount + 3 && str) {
        yen = '円';
      }
      str =
        "<div class='text-center'>" +
        numberFormat.number_format(e.cell.innerText) +
        yen +
        '</div>';
    }
    e.cell.innerHTML = '<div>' + str + '</div>';
    wjCore.setCss(e.cell, {
      display: 'table',
      tableLayout: 'absolute',
    });
    wjCore.setCss(e.cell.children[0], {
      display: 'table-cell',
      textAlign: align,
      verticalAlign: 'middle',
    });
  }
}
</script>

<style lang="scss">
.input_picker {
  div > input {
    border: 1px solid #ccc !important;
    font-size: 0.85em;
    border-radius: 3px;
    display: block;
    text-align: left;
    padding: 3px;
    border-style: solid !important;
    background: url('../assets/calender_25px.png') no-repeat right;
    background-size: 15px 15px;
    background-position: right 3px center;
  }
}
div#temporaryHistory {
  font-size: 14px;
  font-family: 'メイリオ';
  overflow-x: scroll;
  width: 1366px !important;
  // height: 766px !important;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  div.border-bottom {
    border-bottom: 1px solid #ccc;
    label {
      font-size: 0.85em;
    }
  }

  .maru {
    width: 10px;
    height: 11px;
    background-image: url('../assets/tyusyaku_07.png');
    display: block;
    background-repeat: no-repeat;
    background-size: 80%;
    text-indent: -9999px;
    z-index: -1;
  }

  .red-sign {
    font-size: 11px;
    color: red;
    text-align: center;
  }

  div.editMark {
    width: 50px;
    height: 20px;
    background-color: violet;
  }

  a.editicon {
    width: 10px;
    height: 10px;
    display: inline-block;
    background-size: contain;
    background-image: url('../assets/tyusyaku_04.png');
    background-position: right bottom;
    background-repeat: no-repeat;
    text-indent: -9999px;
    margin-top: 5px;
  }

  .addButton {
    width: 60px;
    background-color: #bea6ae;
    display: block;
    float: left;
    color: #000;
    text-align: left;
    border-radius: 6px;
    padding: 3px 0px 3px 10px;
    cursor: pointer;
    background-image: url('../assets/plus_15px.png');
    background-position: 95% 50%;
    background-size: 10px 10px;
    position: absolute;
    top: 0;
    margin-top: 10px;
    left: auto;
    right: 0;
  }
  div.helperArea {
    height: 100px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-track {
      background-color: darkgrey;
    }
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
  .wj-cells .wj-cell.wj-state-selected {
    background-color: #f5f5f5 !important;
    color: #000 !important;
  }

  #theGridTallRows {
    position: relative;
    height: 365px;
  }

  #theGridTallRows.wj-flexgrid .wj-cell {
    height: 45px;
  }

  .wj-rowheaders {
    .wj-row {
      & > div.wj-cell.wj-header {
        & > div {
          transform: translate(-50%, -50%);
          writing-mode: vertical-rl;
        }
      }
    }
  }

  //チャート用
  .green-arrow,
  .green-arrow_end,
  .green-arrow_start,
  .red-arrow,
  .red-arrow_end,
  .red-arrow_start {
    border-top: 1px solid red;
    display: block;
    position: absolute;
    width: 100%;
    top: 6px;
    left: 0;
    text-indent: -9999px;
  }

  .green-arrow,
  .green-arrow_end,
  .green-arrow_start {
    border-top: 1px solid green;
  }

  .green-arrow_start,
  .red-arrow_start {
    div {
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-right: 4px solid red;
      border-bottom: 4px solid transparent;
      position: absolute;
      left: 0;
      top: -5px;
    }
  }
  .green-arrow_start {
    div {
      border-right: 4px solid green;
    }
  }

  .green-arrow_end,
  .red-arrow_end {
    div {
      width: 0;
      height: 0;
      border-left: 4px solid red;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      position: absolute;
      left: auto;
      right: 0;
      top: -5px;
    }
  }
  .green-arrow_end {
    div {
      border-left: 4px solid green;
    }
  }

  .arrow_box {
    width: 300px;
    margin-top: -7px;
    cursor: pointer;
    div {
      padding: 1px 20px 1px 5px;
      position: absolute;
      background-color: #fff;
      border: 1px solid #000;
      z-index: 1;
      background-image: url('../assets/tyusyaku_04.png');
      background-position: 99% 40%;
    }
  }

  div.text-left-float {
    position: relative;
    width: 100%;
  }
  div.text-right-float {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
  }
  div.border-right {
    border-left: 1px solid #ccc;
    width: 60px;
    position: absolute;
    top: 0;
    right: 0;
    padding-left: 5px;
    height: 100%;
  }
  div.border-right p {
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
