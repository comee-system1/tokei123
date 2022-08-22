<template>
  <div id="keikakuIdea">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="true"
            @childLeftArea="changeLeftArea"
          >
          </user-list>
        </v-col>
        <v-col>
          <v-row no-gutters class="mt-1">
            <v-row no-gutters>
              <v-col cols="1" class="mw200">
                <v-card class="pr-2 text-center" elevation="0" tile>
                  <label class="greyLabel">利用者名</label>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="pl-1" elevation="0" outlined tile> aaa </v-card>
              </v-col>
              <v-col cols="7">
                <v-row no-gutters class="justify-end">
                  <v-col cols="2" align="center"
                    ><label class="greyLabel">同意署名欄</label></v-col
                  >
                  <v-col cols="1" style="max-width: 25px" class="mt-1">
                    <input type="checkbox" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      outlined
                      value=""
                      hide-details="false"
                      height="24"
                      class="input-text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-row>
          <v-row no-gutters>
            <v-col class="mw100">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">入力</label>
              </v-card>
            </v-col>
            <v-col class="ml-2 mw90">
              <v-btn x-small>新規</v-btn>
              <v-btn x-small>修正</v-btn>
            </v-col>
            <v-col class="mw100">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">作成日</label>
              </v-card>
            </v-col>
            <v-col class="mw180 ml-2">
              <v-btn
                x-small
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="160px"
                height="24px"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-col>
            <v-col class="mw100 ml-n2">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel">計画区分</label>
              </v-card>
            </v-col>
            <v-col>
              <wj-menu
                class="customCombobox"
                :itemsSource="keikakuKubun"
                :initialized="initComboFilters"
                selectedValuePath="val"
                displayMemberPath="name"
                v-model="keikakuKubunModel"
                :itemClicked="onkeikakuKubun"
                style="width: 150px"
              >
              </wj-menu>
            </v-col>
            <v-col>
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel">作成者</label>
              </v-card>
            </v-col>
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
        id="keikakuIcrnDatepicker"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
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
  },
  methods: {
    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '14px';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
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
    monthSelect() {
      this.getYm = moment(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuIdea {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 100px;
  }
  .input-text {
    font-size: 12px;
    min-width: 200px;
    div {
      height: 24px;
      min-height: 24px;
    }
  }
  .mw200 {
    max-width: 200px;
  }
  .mw180 {
    max-width: 180px;
  }
  .mw100 {
    max-width: 100px;
  }
  .mw90 {
    max-width: 90px;
  }
}
#keikakuIcrnDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 50%;
  width: 300px;
  max-width: 300px;
}
</style>
