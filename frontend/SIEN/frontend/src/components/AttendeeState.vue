<template>
  <div id="attendeeState">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }">
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'pt-1 grey lighten-4'"
                elevation="0"
                tile
                small
                width="80"
                height="28"
                class="text-center"
              >
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="ml-1 pl-1 pt-1 lightYellow"
                width="160"
                height="28"
              >
                {{ userName }}
              </v-card>
            </v-card>
          </div>
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4 pt-1'"
                elevation="0"
                tile
                small
                width="80"
                height="28"
                class="text-center"
              >
                入力
              </v-card>
              <v-card elevation="0" tile class="pl-1">
                <v-btn-toggle>
                  <v-btn small>新規入力</v-btn>
                  <v-btn small>内容更新</v-btn>
                </v-btn-toggle>
              </v-card>
              <v-card
                :color="'grey lighten-4 pt-1 ml-1'"
                elevation="0"
                tile
                small
                width="80"
                height="28"
                class="text-center"
              >
                作成日
              </v-card>
              <v-card
                class="pt-1 ml-1"
                width="140"
                outlined
                tile
                @click="inputCalendarClick(0)"
              >
                {{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card class="ml-auto" elevation="0">
                <v-btn small>利用者より</v-btn>
                <v-btn small class="ml-1">前回コピー</v-btn>
                <v-btn small class="ml-1">履歴参照</v-btn>
              </v-card>
            </v-card>
          </div>
          <div class="mt-1">
            <v-app-bar flat height="24">
              <v-app-bar-title class="caption"
                >1.外用(支援経過・現状と課題等)</v-app-bar-title
              >
            </v-app-bar>
            <v-textarea class="mt-1" outlined hide-details="false"></v-textarea>
          </div>
          <div class="mt-1">
            <v-app-bar flat height="24">
              <v-app-bar-title class="text-caption"
                >2.利用者の状況</v-app-bar-title
              >
            </v-app-bar>
            <table class="table mt-1">
              <tr>
                <th>氏名</th>
                <td>東経真奈美</td>
                <th>生年月日</th>
                <td>平成9年10月5日</td>
                <th>年齢</th>
                <td>24歳</td>
              </tr>
              <tr>
                <th rowspan="2">住所</th>
                <td colspan="3" rowspan="2"></td>
                <th>電話番号</th>
                <td></td>
              </tr>
              <tr>
                <th>FAX番号</th>
                <td></td>
              </tr>
              <tr>
                <th>障害・疾患名</th>
                <td></td>
                <th>障害支援区分</th>
                <td>区分4</td>
                <th>性別</th>
                <td>女</td>
              </tr>
            </table>
            <table class="table mt-1">
              <tr>
                <th class="half">家族構成 ※年齢、職業、主たる介護者を記入</th>
                <th class="half">
                  社会関係図 ※本人とかかわりを持つ機関・人物等(役割)
                </th>
              </tr>
              <tr>
                <td class="half"></td>
                <td class="half"></td>
              </tr>
            </table>
            <div class="mt-1 mb-3">
              <v-card class="d-flex flex-row" flat tile>
                <v-card elevation="0" tile>
                  <v-btn small>クリア</v-btn>
                  <v-btn small class="ml-2">削除</v-btn>
                </v-card>
                <v-card elevation="0" tile class="ml-auto">
                  <v-btn small>登録</v-btn>
                </v-card>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="attendeeStateDatepicker"
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
import UserList from './UserList.vue';
export default {
  components: {
    UserList,
  },
  data() {
    return {
      leftWidth: '280px',
      rightWidth: '78.5%',
      userName: '',
      picker: '',
      datepicker_dialog: false,
      getYm:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
    };
  },
  mounted() {},
  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    inputCalendarClick() {
      this.picker =
        dayjs().format('YYYY') +
        '-' +
        dayjs().format('MM') +
        '-' +
        dayjs().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = dayjs(this.picker).format('YYYY年MM月DD日');
      this.datepicker_dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#attendeeState {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;

  .v-app-bar-title__content {
    width: 100%;
  }
  .lightYellow {
    background-color: $light_yellow;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    font-size: 12px;
    th {
      background-color: $grid_hover_background;
      text-align: center;
      padding: 4px;
      font-weight: normal;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      width: 80px;
      &.half {
        width: 50%;
        text-align: left;
      }
    }
    td {
      background-color: $grid_background;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 4px;
      width: 160px;
      &.half {
        width: 50%;
        height: 80px;
      }
    }
  }
}

#attendeeStateDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
</style>
