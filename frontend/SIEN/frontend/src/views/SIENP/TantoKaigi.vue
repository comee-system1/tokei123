<template>
  <div id="tantokaigi">
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
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="24"
                class="text-center"
              >
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="ml-1 pl-1"
                width="200"
                height="24"
              >
                {{ userName }}
              </v-card>
            </v-card>
          </div>
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat>
              <v-btn-toggle>
                <v-btn small>新規入力</v-btn>
                <v-btn small>内容更新</v-btn>
              </v-btn-toggle>
              <v-btn-toggle class="ml-2">
                <v-btn small>計画案</v-btn>
                <v-btn small>モニタリング</v-btn>
                <v-btn small>その他</v-btn>
              </v-btn-toggle>

              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="27"
                class="text-center ml-1 pt-1"
                >計画案作成日
              </v-card>
              <v-card
                class="pl-1 ml-1"
                width="140"
                outlined
                tile
                @click="inputCalendarClick(0)"
              >
                {{ getYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>
              <v-card class="ml-1"> <v-btn small>案履歴参照</v-btn> </v-card>
              <v-card class="ml-auto">
                <v-btn-toggle tile>
                  <v-btn small>前回コピー</v-btn>
                  <v-btn small>履歴参照</v-btn>
                </v-btn-toggle>
              </v-card>
            </v-card>
          </div>
          <v-card class="mt-3 pa-2" :color="'grey lighten-4'">
            <v-card class="d-flex flex-row" flat :color="'grey lighten-4'">
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                class="text-center"
                >作成日
              </v-card>
              <v-card width="140" outlined tile @click="inputCalendarClick(1)">
                {{ createYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                class="text-center"
                >開催日
              </v-card>
              <v-card width="140" outlined tile @click="inputCalendarClick(2)">
                {{ openYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                class="text-center pt-1"
                >開催時間
              </v-card>
              <v-card elevation="0" tile :color="'grey lighten-4'">
                <input type="time" class="input_text outline" />
                ～
                <input type="time" class="input_text outline" />
              </v-card>
              <v-card class="ml-auto" :color="'grey lighten-4'">
                <v-btn small>開催情報最終表示</v-btn>
              </v-card>
            </v-card>
            <v-card class="d-flex flex-row mt-2" flat>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="24"
                class="text-center"
                >開催場所
              </v-card>
              <v-text-field
                class="pa-0 ma-0 input_text text-caption"
                hide-details="false"
                outlined
                dense
                tile
                :full-width="true"
                :value="' '"
                :height="'24'"
              >
              </v-text-field>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="TantoKaigiDatepicker"
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
import dayjs from 'dayjs';

import UserList from '../../components/UserList.vue';
export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    UserList,
  },
  data: function () {
    return {
      leftWidth: '280px',
      rightWidth: '78.5%',
      userName: '',
      datepicker_dialog: false,
      calendarType: 0,
      picker: '',
      getYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      createYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      openYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
    };
  },

  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    inputCalendarClick(calendarType) {
      this.picker =
        dayjs().format('YYYY') +
        '-' +
        dayjs().format('MM') +
        '-' +
        dayjs().format('DD');
      this.datepicker_dialog = true;
      this.calendarType = calendarType;
    },
    monthSelect() {
      if (this.calendarType == 0) {
        this.getYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      if (this.calendarType == 1) {
        this.createYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      if (this.calendarType == 2) {
        this.openYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#tantokaigi {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1350px !important;
  width: auto;

  .input_text {
    &.outline {
      border: 1px solid $light-gray;
    }
    div {
      height: 24px;
      min-height: 24px;
    }
  }
}
#TantoKaigiDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  width: 300px;
  max-width: 300px;
}
</style>
