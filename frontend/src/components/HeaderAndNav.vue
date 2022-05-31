<template>
  <div id="headerAndNav">
    <!-- temporary    メニューを常に画面最上部に表示 -->
    <!-- hide-overlay メニュー表示時の背景を少し暗くする -->
    <v-navigation-drawer
      app
      v-model="drawer"
      dark
      color="#4d4d4d"
      width="280px"
      temporary
      style="z-index: 11"
    >
      <v-list-item>
        <p class="kenbunroku-logo">
          <img src="../assets/HukushiKenbunrokuLogo.png" alt="" />
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
            <v-list-item-content>
              <v-list-item-title>
                {{ nav_list.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :key="nav_list.name"
            no-action
            class="nav-list-name"
            dark
            color="#348498"
          >
            <template v-slot:activator>
              <!-- 下に階層を持つメニューの場合はクリックでメニューを展開 -->
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- 下の階層のメニュー -->
            <v-list-item
              v-for="(list, index) in nav_list.lists"
              :key="index"
              :to="list.link"
            >
              <v-list-item-content>
                <v-list-item-title>{{ list.name }}</v-list-item-title>

                <v-list-item
                  v-for="(sublist, subindex) in list.sublists"
                  :key="subindex"
                  :to="sublist.link"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ sublist.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#348498" dark dense height="30px" style="z-index: 10">
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
        <label style="padding-top: 2px">日付</label>
        <v-btn
          @click="inputCalendarClick()"
          tile
          outlined
          class="service"
          height="85%"
          width="150px"
          light
          disabled
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
          disabled
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
          disabled
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
          disabled
          @click="searchButton()"
          >更新
        </v-btn>
      </v-card>
      <v-spacer></v-spacer>
      <v-toolbar-title>【社会福祉法人東経福祉会】</v-toolbar-title>
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
              大正雅夫
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
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      drawer: true,
      isMaximize: false,
      year: moment().year(),
      month: moment().format('MM'),
      date: moment().date(),
      pageTitle: this.$route.name,
      pageParentTitle: this.$route.name,
      items: [
        { title: '職員マスタ' },
        { title: 'パスワード変更' },
        { title: 'ログアウト' },
      ],
      nav_lists: [
        { name: '共通掲示板', link: '/TemporaryPage' },
        {
          name: '事業所情報',
          lists: [
            { name: '基本事業者', link: '/TemporaryPage' },
            { name: 'サービス提供事業所', link: '/TemporaryPage' },
          ],
        },
        {
          name: '利用者情報',
          lists: [
            { name: '基本台帳登録', link: '/TemporaryPage' },
            { name: '受給者証登録', link: '/JyukyuTouroku' },
          ],
        },
        {
          name: '入所レセプト請求',
          lists: [
            { name: '施設体制確認', link: '/ShisetsuTaisei' },
            { name: '利用者受給者証一覧', link: '/JyukyuIcrn' },
            { name: '個別利用状況登録', link: '/KobetsuRiyouTouroku' },
            { name: '利用状況一覧', link: '/TemporaryPage' },
            { name: '個別加算一覧', link: '/TemporaryPage' },
            { name: 'レセプト集計', link: '/ReceptSyukei' },
            // レセプト集計に集約化
            // {
            //   name: '上限管理',
            //   link: '/TemporaryPage',
            //   sublists: [
            //     {
            //       name: '他上限管理事業所用',
            //       link: 'TajyougenkanriJimsyo',
            //     },
            //     {
            //       name: '自上限管理事業所用',
            //       link: 'JijyougenkanriJimsyo',
            //     },
            //   ],
            // },
            {
              name: '給付明細書',
              // link: '/TemporaryPage',
              sublists: [
                {
                  name: '介護給付費明細書',
                  link: '/KyuhuMeisai',
                },
                {
                  name: '介護給付明細一覧',
                  link: '/KyuhuMeisaiIcrn',
                },
              ],
            },
            { name: '実績記録票', link: '/JissekiKiroku' },
            { name: '加算項目一覧', link: '/KasanKoumokuIcrn' },
            { name: '請求書', link: '/SeikyuSho' },
            { name: '受領通知書', link: '/TemporaryPage' },
            { name: '入退院報告書', link: '/TemporaryPage' },
          ],
        },
        {
          name: 'グループホームレセプト請求',
          lists: [
            { name: '施設体制確認', link: '/TemporaryPage' },
            { name: '受給者証情報確認', link: '/TemporaryPage' },
            { name: '契約情報確認', link: '/TemporaryPage' },
            { name: '利用料項目確認', link: '/TemporaryPage' },
          ],
        },
        {
          name: '相談支援レセプト請求',
          lists: [
            { name: '施設体制確認', link: '/TemporaryPage' },
            { name: '受給者証情報確認', link: '/TemporaryPage' },
            { name: '契約情報確認', link: '/TemporaryPage' },
            { name: '利用料項目確認', link: '/TemporaryPage' },
          ],
        },
      ],
    };
  },
  mounted: function () {},
  created() {
    document.addEventListener('fullscreenchange', () => {
      // document.fullscreenElement は、全画面モードにある要素があれば
      // それを指します。要素がなければ、このプロパティの値は null に
      // あります。
      if (!document.fullscreenElement) {
        this.isMaximize = false;
      }
    });
  },
  watch: {
    $route() {
      this.pageTitle = this.$route.name;
      this.pageParentTitle = this.$route.name;
    },
  },
  methods: {
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

<style lang="scss" >
@import '@/assets/scss/common.scss';
div#headerAndNav {
  .nav-list-name {
    border-top: 1px solid #808080;
  }

  .kenbunroku-logo {
    padding-top: 10px;
    margin: auto;
  }

  .v-toolbar__title {
    font-size: 15px;
  }

  .v-list .v-list-item--active .v-list-item__title {
    color: white;
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

  .coditionbtn {
    margin-left: 10px;
    border: 1px solid $light-gray;
    background-color: $white;
    color: $font_color;
    border-radius: 30px;
    font-size: 14px;
    font-family: 'メイリオ';
    display: none;
  }
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
