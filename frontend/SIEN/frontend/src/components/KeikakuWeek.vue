<template>
  <div id="keikakuWeek">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="true"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row dense class="mt-1 borderBottom pb-2">
            <v-col cols="1" class="mw200">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">利用者名</label>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card elevation="0" outlined tile> aaa </v-card>
            </v-col>
            <v-col cols="1" class="mw200">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">作成日</label>
              </v-card>
            </v-col>
            <v-col cols="2" class="text-center">
              <v-card elevation="0" outlined tile> 2022年4月22日 </v-card>
            </v-col>
          </v-row>
          <v-row dense class="mt-1 borderBottom">
            <v-col class="mw160">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel w160">週間計画開始年月</label>
              </v-card>
            </v-col>
            <v-col class="mw160 ml-1">
              <v-btn
                x-small
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="140px"
                height="24px"
                style="font-size: 12px"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-col>
            <v-col cols="4" align="center">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">入力案内</label>
                <v-btn x-small class="ml-1">週間予定</v-btn>
                <v-btn x-small class="ml-1">主な日常生活等</v-btn>
              </v-card>
            </v-col>
            <v-col cols="4" align="right">
              <v-btn x-small class="ml-1">前回コピー</v-btn>
              <v-btn x-small class="ml-1">履歴参照</v-btn>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="11">
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
            <v-col cols="1">vv</v-col>
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

  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 100px;
    &.w160 {
      width: 160px;
    }
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
