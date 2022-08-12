<template>
  <div id="headerAndNav">
    <!-- temporary    メニューを常に画面最上部に表示 -->
    <!-- hide-overlay メニュー表示時の背景を少し暗くする -->
    <v-navigation-drawer
      app
      v-model="drawer"
      class="grey lighten-3"
      width="280px"
      temporary
      style="z-index: 11"
    >
      <v-list-item>
        <p class="kenbunroku-logo">
          <img src="../assets/HukushiKenbunrokuLogo_black.png" alt="" />
        </p>
      </v-list-item>
      <v-list dense>
        <template v-for="nav_list in nav_lists">
          <!-- 下に階層を持たないメニューの場合はクリックで遷移 -->
          <v-list-item
            v-if="!nav_list.lists"
            :to="nav_list.link"
            :key="nav_list.name"
            class="nav-list-name"
          >
            <v-list-item-icon>
              <v-icon v-if="nav_list.mdi" v-text="nav_list.src"></v-icon>
              <v-img v-else :src="nav_list.src" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2 pl-2">
                {{ nav_list.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :key="nav_list.name"
            class="nav-list-name"
            color="#348498"
          >
            <template v-slot:activator>
              <!-- 下に階層を持つメニューの場合はクリックでメニューを展開 -->
              <v-list-item-icon>
                <v-icon v-if="nav_list.mdi" v-text="nav_list.src"></v-icon>
                <v-img v-else :src="nav_list.src" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-2 pl-2">{{
                  nav_list.name
                }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- 下の階層のメニュー -->
            <v-list-item
              v-for="(list, index) in nav_list.lists"
              :key="index"
              :to="list.link"
              class="p-0"
            >
              <v-list-item-content>
                <v-list-item-title v-if="list.link"
                  >・ {{ list.name }}</v-list-item-title
                >
                <v-subheader v-else>{{ list.name }}</v-subheader>

                <v-list-item
                  v-for="(sublist, subindex) in list.sublists"
                  :key="subindex"
                  :to="sublist.link"
                  class="sublists"
                >
                  <v-list-item-content>
                    <v-list-item-title>・ {{ sublist.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#588C73" dark dense height="30px">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <v-toolbar-title>{{ pageTitle }}</v-toolbar-title> -->
      </div>

      <v-card
        class="ml-10 mt-1 d-flex flex-row"
        color="transparent"
        elevation="0"
        height="100%"
      >
        <label style="padding-top: 2px; width: 40px">日付</label>
        <v-btn
          @click="inputCalendarClick()"
          tile
          outlined
          class="service"
          height="85%"
          width="150px"
          >{{ year }}年{{ month }}月{{ date }}日
          <div class="float-right">
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-btn>
        <v-btn
          elevation="0"
          color="white"
          class="pa-0 ml-1"
          x-small
          height="85%"
          style="min-width: auto; border-radius: 3px"
          tile
          light
          @click="calendarClick(1)"
        >
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn
          elevation="0"
          color="white"
          class="pa-0 ml-1"
          x-small
          height="85%"
          style="min-width: auto; border-radius: 3px"
          tile
          light
          @click="calendarClick(2)"
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
        <v-btn
          elevation="0"
          color="white"
          class="coditionbtn pa-0 ml-1"
          x-small
          height="85%"
          width="50px"
          style="min-width: auto; border-radius: 3px"
          tile
          light
          @click="searchButton()"
          >更新
        </v-btn>
      </v-card>

      <v-spacer></v-spacer>
      <v-toolbar-title>【{{ jigyoName }}】</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="normal"
              dark
              text
              v-bind="attrs"
              v-on="on"
              small
              depressed
              temporary
            >
              <v-icon>mdi-account-circle</v-icon>
              {{ loginName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-icon>mdi-printer-search</v-icon>
      <v-icon>mdi-printer</v-icon>
      <v-icon>mdi-file-excel</v-icon>
      <v-icon v-if="isMaximize" @click="maximize">mdi-arrow-collapse</v-icon>
      <v-icon v-if="!isMaximize" @click="maximize">mdi-arrow-expand</v-icon>
    </v-app-bar>
    <v-dialog v-model="datepicker_dialog" class="datepicker_dialogs">
      <v-date-picker
        id="headerAndNavDatepicker"
        scrollable
        no-title
        mode="single"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-row id="screen_dialog" v-show="screenFlag">
      <v-col class="text-h2">
        条件が変更されました。<br />更新ボタンを押してください。</v-col
      >
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      drawer: true,
      isMaximize: false,
      jigyoName: '社会福祉法人東経会',
      loginName: '大正雅夫',
      pageTitle: this.$route.name,
      items: [
        { title: '職員マスタ' },
        { title: 'パスワード変更' },
        { title: 'ログアウト' },
      ],
      nav_lists: [
        {
          name: '共通掲示板',
          link: '/TemporaryPage',
          mdi: true,
          src: 'mdi-clipboard-edit-outline',
        },
        {
          name: '相談支援',
          mdi: true,
          src: 'mdi-chat-outline',
          lists: [
            { name: '掲示板', link: '/TemporaryPage' },
            { name: 'スケジュール', link: '/TemporaryPage' },
            { name: '施設管理', link: '/TemporaryPage' },
            { name: '利用者情報', link: '/TemporaryPage' },
            { name: '固定情報', link: '/TemporaryPage' },
            // {
            //   name: '受付・対応登録',
            //   link: '/UketukeTourokuParent',
            // },
            {
              name: '相談対応日報・月報',
              link: '/UketukeSanshoParent',
            },
            {
              name: '集計表',
              sublists: [
                {
                  name: '受付対応チェックリスト',
                  link: '/UketukeCheckList',
                },
                {
                  name: '報告書',
                  link: '/TemporaryPage',
                },
                {
                  name: '報告書用集計条件設定',
                  link: '/TemporaryPage',
                },
              ],
            },
            {
              name: '個人履歴参照',
              link: '/KojinRireki',
            },
            {
              name: '支援計画',
              link: '/TemporaryPage',
            },

            { name: 'マスタ', link: '/MstMenu' },
          ],
        },
        {
          name: '計画相談支援',
          mdi: true,
          src: 'mdi-text-box-edit-outline',
          lists: [
            {
              name: '受付・対応登録',
              link: '/SIENP/UketukeTouroku',
            },
            {
              name: '計画作成',
              link: '/KeikakuLists',
            },
            {
              name: 'モニタリング',
              link: '/MonitoringParent',
            },
            {
              name: '担当者別実績表',
              link: '/TemporaryPage',
            },
            {
              name: '個人履歴',
              link: '/TemporaryPage',
            },
            { name: 'マスタ', link: '/MstMenu' },
          ],
        },
        {
          name: '地域相談支援',
          mdi: true,
          src: 'mdi-home-edit-outline',
          lists: [],
        },
      ],
      year: moment().year(),
      month: moment().format('MM'),
      date: moment().date(),

      datepicker_dialog: false,
      picker:
        moment().year() + '-' + moment().format('M') + '-' + moment().date(),
      screenFlag: false, // 検索ボタン押下前にデータエリアにスクリーンを行う
      returndata: [], // 検索ボタンを押下時に選択値を渡す変数
    };
  },
  created: function () {
    document.addEventListener('fullscreenchange', () => {
      // document.fullscreenElement は、全画面モードにある要素があれば
      // それを指します。要素がなければ、このプロパティの値は null に
      // あります。
      if (!document.fullscreenElement) {
        this.isMaximize = false;
      }
    });
    this.returndata = {
      targetYmd: this.year + this.month + this.date,
    };
    console.log(this.returndata);
    this.$emit('parent-ymd-select', this.returndata);
  },
  watch: {
    $route() {
      this.pageTitle = this.$route.name;
    },
  },
  methods: {
    inputCalendarClick() {
      this.datepicker_dialog = true;
    },
    /**************
     * 月の選択 ダイアログの日付を押下
     */
    dateSelect() {
      let split = this.picker.split('-');
      this.year = split[0];
      this.month = split[1];
      this.date = split[2];
      this.datepicker_dialog = false;
      this.screenFlag = true;
    },
    //カレンダーボタンの日付遷移
    // 提供月 1:前月 2:翌月
    // 請求月 3:前月 4:翌月
    calendarClick(type) {
      let tmpdate;
      if (type == 1) {
        tmpdate = moment({
          years: this.year,
          months: this.month - 1,
          days: this.date,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }).add(-1, 'days');
      } else {
        tmpdate = moment({
          years: this.year,
          months: this.month - 1,
          days: this.date,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }).add(1, 'days');
      }
      this.year = tmpdate.format('YYYY');
      this.month = tmpdate.format('MM');
      this.date = tmpdate.format('DD');
      this.screenFlag = true;
    },
    /**************
     * 検索ボタンを押下
     */
    searchButton() {
      this.screenFlag = false;
      this.returndata = {
        targetYmd: this.year + this.month + this.date,
      };

      this.$emit('parent-ymd-select', this.returndata);
    },
    maximize() {
      this.isMaximize = !this.isMaximize;
      if (this.isMaximize) {
        document.body.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#headerAndNav {
  .text-h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    -webkit-text-stroke: 1px #000;
    z-index: 10;
  }
  .nav-list-name {
    border: none;
    // border-top: 1px solid #808080;
  }

  .kenbunroku-logo {
    padding-top: 10px;
    margin: auto;
  }

  .v-toolbar__title {
    font-size: 15px;
  }
  .v-subheader {
    color: $font_color;
    font-size: 14px;
    font-family: 'メイリオ';
    font-weight: bold;
    height: 20px;
  }
  // .v-list .v-list-item--active .v-list-item__title {
  //   color: white;
  // }

  .v-list-item {
    padding: 0;
    div.v-list-item__content {
      div {
        padding-left: 21px;
      }
    }
  }
  .service {
    &.v-btn {
      margin-left: 10px;
      border: 1px solid $light-gray;
      background-color: $white;
      color: $font_color;
      border-radius: 30px;
      font-size: 14px;
      font-family: 'メイリオ';
    }
  }
  .v-list-item--active {
    color: #1976d2;
    > .v-list-item__icon {
      // グレーを青色に変更
      filter: invert(8%) sepia(99%) saturate(7044%) hue-rotate(185deg)
        brightness(100%) contrast(145%);
    }
  }
  .v-list-item__icon {
    margin: auto 4px;
  }
  .coditionbtn {
    margin-left: 10px;
    border: 1px solid $light-gray;
    background-color: $white;
    color: $font_color;
    border-radius: 30px;
    font-size: 14px;
    font-family: 'メイリオ';
  }
}
// div#headerAndNav {
//   .text-h2 {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     -webkit-transform: translate(-50%, -50%);
//     -ms-transform: translate(-50%, -50%);
//     text-align: center;
//     color: #fff;
//     -webkit-text-stroke: 1px #000;
//     z-index: 10;
//   }
//   .nav-list-name {
//     border-top: 1px solid #808080;
//   }

//   .kenbunroku-logo {
//     padding-top: 10px;
//     margin: auto;
//   }

//   .v-toolbar__title {
//     font-size: 15px;
//   }

//   .v-list .v-list-item--active .v-list-item__title {
//     color: white;
//   }

//   .service {
//     &.v-btn {
//       margin-left: 10px;
//       border: 1px solid $light-gray;
//       background-color: $white;
//       color: $font_color;
//       border-radius: 30px;
//       font-size: 14px;
//       font-family: 'メイリオ';
//       // &:nth-child(3) {
//       //   border-left: none;
//       // }
//     }
//   }
//   .coditionbtn {
//     margin-left: 10px;
//     border: 1px solid $light-gray;
//     background-color: $white;
//     color: $font_color;
//     border-radius: 30px;
//     font-size: 14px;
//     font-family: 'メイリオ';
//   }
// }
#screen_dialog {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  width: 100%;
  height: 100%;
  z-index: 4;
  padding: 0;
  margin: 0;
}
#headerAndNavDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 20px;
  left: 100px;
  width: 300px;

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(7)
    .v-btn__content {
    color: blue;
  }

  .v-date-picker-table.v-date-picker-table--date
    > table
    > tbody
    tr
    td:nth-child(1)
    .v-btn__content {
    color: red;
  }
}
</style>
