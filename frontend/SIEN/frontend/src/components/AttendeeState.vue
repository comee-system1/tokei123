<template>
  <div id="attendeeState">
    <v-container class="pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <!-- <v-col class="mr-1" :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col> -->
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row no-gutters class="rowStyle_Dark pa-1 pl-1 mb-1">
            <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
              利用者名
            </v-card>
            <v-card
              class="koumokuData border mr-1 pb-1 pl-1 pt-0"
              tile
              outlined
              width="250"
            >
              {{ userName }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 body-2">
            <v-card class="koumokuTitle titleMain ml-1 mr-1 wMin" outlined tile>
              入力
            </v-card>
            <v-card elevation="0" class="mr-1">
              <v-btn-toggle color="light-blue darken-4">
                <v-btn small elevation="2" height="20" class="body-2"
                  >新規</v-btn
                >
                <v-btn small elevation="2" height="20" class="body-2"
                  >修正</v-btn
                >
              </v-btn-toggle>
            </v-card>
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
              作成日
            </v-card>
            <v-card
              class="mr-1"
              color="transparent"
              height="100%"
              style="border: none"
              outlined
              tile
            >
              <v-btn
                @click="inputCalendarClick(0)"
                tile
                outlined
                elevation="2"
                width="150px"
                height="100%"
                class="btnymd pa-0"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>

            <v-card class="koumokuTitle titleOrange mr-1 wMin" outlined tile>
              作成者
            </v-card>
            <v-card
              class="lightYellow pl-1 mr-1"
              width="140"
              elevation="0"
              tile
            >
              大正雅夫
            </v-card>
            <v-card class="ml-auto" elevation="0">
              <v-btn small elevation="2" height="20" class="body-2"
                >利用者基本情報より</v-btn
              >
              <v-btn small elevation="2" class="ml-1 body-2" height="20"
                >前回コピー</v-btn
              >
              <v-btn small elevation="2" class="ml-1 body-2" height="20"
                >履歴参照</v-btn
              >
            </v-card>
          </v-row>

          <div class="mb-1">
            <v-app-bar flat height="24" class="titleBlue mb-1">
              <v-app-bar-title class="body-2"
                >1.概要(支援経過・現状と課題等)</v-app-bar-title
              >
            </v-app-bar>
            <v-textarea
              outlined
              no-resize
              auto-grow
              hide-details="false"
            ></v-textarea>
          </div>
          <div class="mb-1">
            <v-app-bar flat height="24" class="titleBlue mb-1">
              <v-app-bar-title class="body-2">2.利用者の状況</v-app-bar-title>
            </v-app-bar>
            <table class="table body-2 mb-1">
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
            <table class="table mb-1 body-2">
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
                  <v-btn small elevation="2" class="body-2">クリア</v-btn>
                  <v-btn small elevation="2" class="ml-2 body-2">削除</v-btn>
                </v-card>
                <v-card elevation="0" tile class="ml-auto">
                  <v-btn small elevation="2" class="body-2">登録</v-btn>
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
// import UserList from './UserList.vue';
export default {
  components: {
    // UserList,
  },
  props: {
    selectedUserObj: Object,
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
      headerheight: 80,
      dispUserObj: {},
    };
  },
  mounted() {
    this.setUserdata(this.selectedUserObj);
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('attendeeState') != null) {
        document.getElementById('attendeeState').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    setUserdata(item) {
      if (item != null) {
        this.dispUserObj = Object.assign({}, item);
        this.userName = this.dispUserObj.names;
      }
    },
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
  font-size: $default_fontsize;
  color: $font_color;
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
      background-color: $view_Title_background_Blue;
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
