<template>
  <div id="keikakuWeek">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row no-gutters class="mt-1">
            <v-card class="d-flex justify-start" flat tile>
              <v-card
                outlined
                tile
                width="60"
                class="text-center label text-caption"
              >
                利用者名
              </v-card>
              <v-card
                width="200"
                class="ml-1 text-caption lightYellow"
                elevation="0"
                outlined
                tile
              >
                aaa
              </v-card>
              <v-card
                outlined
                tile
                width="60"
                class="ml-1 text-center label text-caption"
              >
                作成日
              </v-card>
              <v-card
                width="100"
                class="ml-1 text-center text-caption lightYellow"
                elevation="0"
                outlined
                tile
              >
                2022年4月22日
              </v-card>

              <v-card
                outlined
                tile
                width="120"
                class="ml-1 text-center label text-caption"
              >
                週間計画開始年月
              </v-card>
              <v-btn
                x-small
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="140px"
                height="24px"
                class="text-caption ml-1"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-tabs height="25" v-model="inputTypemodel" class="mt-2">
                <v-tab
                  class="text-caption"
                  v-for="value in inputType"
                  :key="value.key"
                  style="height: 25px"
                  :href="'#inputs-' + value.key"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-col cols="6" class="text-end pr-1">
              <v-btn-toggle tile>
                <v-btn small>前回コピー</v-btn>
                <v-btn small>履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-0">
            <v-col cols="10">
              <wj-flex-grid
                id="keikakuWeekGrid"
                :headersVisibility="3"
                :autoGenerateColumns="false"
                :allowAddNew="false"
                :allowDelete="false"
                :allowPinning="false"
                :allowResizing="true"
                :allowSorting="false"
                :allowDragging="false"
                :selectionMode="'None'"
                :isReadOnly="true"
                :initialized="onInitialize"
                :itemsSource="viewdata"
              >
                <wj-flex-grid-column
                  v-for="val in weekarray"
                  :key="val.header"
                  :header="val.header"
                  :binding="val.binding"
                  align="center"
                  valign="middle"
                  format="g"
                  width="2*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="2">vv</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuWeekDatepicker"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelectWeek"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';

import UserList from './UserList.vue';

export default {
  props: {
    dispHideBar: Boolean,
  },
  components: {
    UserList,
  },
  data() {
    return {
      leftWidth: '280px',
      rightWidth: '80%',
      moveLeft: true,
      datepicker_dialog: false,
      picker: '',
      getYm:
        moment().format('YYYY') +
        '年' +
        moment().format('MM') +
        '月' +
        moment().format('DD') +
        '日',
      keikakuKubun: [
        { id: 0, name: 'サービス等利用計画' },
        { id: 1, name: 'サービス等利用計画2' },
      ],
      inputType: [
        {
          key: 1,
          value: '週間予定',
        },
        {
          key: 2,
          value: '主な日常生活等',
        },
      ],
      inputTypemodel: 0,
      keikakuKubunModel: '',
      viewdata: [],
      weekarray: [
        {
          key: 1,
          header: '月',
          binding: 'monday',
        },
        {
          key: 2,
          header: '火',
          binding: 'thuseday',
        },
        {
          key: 3,
          header: '水',
          binding: 'wednesday',
        },
        {
          key: 4,
          header: '木',
          binding: 'thursday',
        },
        {
          key: 5,
          header: '金',
          binding: 'friday',
        },
        {
          key: 6,
          header: '土',
          binding: 'saturday',
        },
        {
          key: 0,
          header: '日',
          binding: 'sunday',
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
  },
  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      console.log(row);
      alert('test');
    },
    createData() {
      let array = [];

      array.push({
        monday: '',
      });

      this.viewdata = array;
    },
    onInitialize(flexGrid) {
      console.log(flexGrid);
      this.createData();
    },
    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '99%';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '80%';
      }
    },
    inputCalendarClick() {
      this.picker =
        moment().format('YYYY') +
        '-' +
        moment().format('MM') +
        '-' +
        moment().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelectWeek() {
      this.getYm = moment(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuWeek {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;

  div.label {
    background-color: $light-gray;
  }

  .borderBottom {
    border-bottom: 1px solid $deepgreen;
  }
  .lightYellow {
    background-color: $view_Data_Read_background;
  }
  .mw160 {
    max-width: 160px;
  }
  .mw200 {
    max-width: 200px;
  }
}

#keikakuWeekDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 280px;
  width: 300px;
  max-width: 300px;
}
</style>
