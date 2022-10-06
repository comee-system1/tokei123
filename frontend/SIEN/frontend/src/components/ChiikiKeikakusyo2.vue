<template>
  <div id="chiikiKeikakusyo2" :style="styles">
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
          <v-row no-gutters class="rowStyle_Dark mb-1 mt-1">
            <v-col cols="12" class="d-flex pa-1">
              <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="ml-1 pl-1 lightYellow"
                width="300"
                height="20"
              >
                {{ userName }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
              入力
            </v-card>
            <v-card elevation="0" class="pl-1">
              <v-btn-toggle>
                <v-btn small height="20">新規</v-btn>
                <v-btn small height="20">修正</v-btn>
              </v-btn-toggle>
            </v-card>
            <v-card class="koumokuTitle titleMain mr-1 ml-1 wMin" outlined tile>
              作成日
            </v-card>

            <v-card
              class="ml-1"
              width="140"
              height="20"
              outlined
              tile
              @click="inputCalendarClick(0)"
            >
              {{ getYm }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
            <v-card class="koumokuTitle titleOrange ml-1 wMin" outlined tile>
              作成者
            </v-card>
            <v-card
              class="lightYellow pl-1 ml-1"
              width="140"
              elevation="0"
              tile
            >
              大正雅夫
            </v-card>
            <v-card class="ml-auto" elevation="0">
              <!-- <v-btn small height="20">利用者基本情報より</v-btn> -->
              <v-btn small height="20">前回コピー</v-btn>
              <v-btn small class="ml-1" height="20">履歴参照</v-btn>
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <div>
              <v-tabs
                v-model="inputTypemodel"
                class="mSizeCommonTab"
                color="rgba(255, 0, 0, 0)"
              >
                <v-tab
                  v-for="value in inputType"
                  :key="value.key"
                  active-class="act"
                  :href="'#tab-' + value.key"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </div>
          </v-row>

          <v-tabs-items v-model="inputTypemodel">
            <v-tab-item value="tab-1" :eager="true"> aaaaaaaaaaaa </v-tab-item>
            <v-tab-item value="tab-2" :eager="true"> sssssssssss </v-tab-item>
            <v-tab-item value="tab-0" :eager="true">
              <div class="mt-1">
                <v-app-bar flat height="24" class="titleBlueDark">
                  <v-app-bar-title class="text-caption"
                    >利用者の状況</v-app-bar-title
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
                    <td colspan="3" rowspan="2" style="vertical-align: top">
                      aaa
                    </td>
                    <th>電話番号</th>
                    <td>000</td>
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
              </div>
              <div class="mt-1">
                <v-app-bar flat height="24" class="titleBlueDark">
                  <v-app-bar-title class="text-caption"
                    >施設・病院情報</v-app-bar-title
                  >
                </v-app-bar>
                <table class="table mt-1">
                  <tr>
                    <th>施設・病院名</th>
                    <td class="wide"></td>
                    <th>担当者名</th>
                    <td></td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th rowspan="2">住所</th>
                    <td rowspan="2" style="vertical-align: top">
                      984-0052<br />aaa<br />aaa
                    </td>
                    <th>電話番号</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>ＦＡＸ番号</th>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="mt-1">
                <v-app-bar flat height="24" class="titleBlueDark">
                  <v-app-bar-title class="text-caption"
                    >アセスメント</v-app-bar-title
                  >
                </v-app-bar>
                <v-app-bar flat height="24" class="titleBlue mt-1">
                  <v-app-bar-title class="caption"
                    >1.利用者の心身の状況</v-app-bar-title
                  >
                </v-app-bar>
                <v-textarea
                  class="mt-1"
                  rows="2"
                  no-resize
                  outlined
                  hide-details="false"
                ></v-textarea>
                <v-app-bar flat height="24" class="titleBlue">
                  <v-app-bar-title class="caption"
                    >2.利用者の置かれている環境</v-app-bar-title
                  >
                </v-app-bar>
                <v-textarea
                  class="mt-1"
                  rows="2"
                  no-resize
                  outlined
                  hide-details="false"
                  :value="value"
                ></v-textarea>
              </div>
            </v-tab-item>
          </v-tabs-items>
          <v-row dense class="ma-2" justify="space-between">
            <v-col cols="4">
              <v-btn small>削除</v-btn>
            </v-col>
            <v-col cols="7">
              <v-card class="d-flex justify-end" flat tile>
                <v-card
                  outlined
                  tile
                  width="60"
                  class="text-center text-caption label pt-1"
                  >完了
                </v-card>
                <v-card elevation="0" width="30" class="text-center mt-1">
                  <input type="checkbox" />
                </v-card>
                <v-card
                  class="lightYellow pl-1 pt-1 ml-1"
                  width="140"
                  outlined
                  tile
                >
                </v-card>
                <v-btn small class="ml-3">登録</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="chiikiKeikakusyo2Datepicker"
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
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
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
      headerheight: 100,
      value: 'ssss\nddddd\nfff',

      inputTypemodel: 'tab-1',
      inputType: [
        {
          key: 0,
          value: '全体',
        },
        {
          key: 1,
          value: '意向・方針',
        },
        {
          key: 2,
          value: '課題・支援',
        },
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('chiikiKeikakusyo2') != null) {
        document.getElementById('chiikiKeikakusyo2').style.height =
          window.innerHeight - this.headerheight + 'px';
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
div#chiikiKeikakusyo2 {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';

  div.mSizeCommonTab {
    .v-tabs-bar .v-tab:not(.v-tab--active) {
      color: #777 !important;
      background-color: $white !important;
    }
    .v-slide-group__content {
      background-color: $white !important;
    }
  }

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
    }
    td {
      background-color: $grid_background;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 4px;
      width: 160px;
      &.wide {
        width: 400px;
      }
    }
  }
}
.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense)
  textarea {
  margin-top: 4px;
}

#chiikiKeikakusyo2Datepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
</style>
