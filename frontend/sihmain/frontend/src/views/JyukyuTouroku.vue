<template>
  <div id="JyukyuTouroku">
    <v-container fluid class="container">
      <v-row no-gutters class="main-row">
        <v-col class="left-area">
          <UserListPrint
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </UserListPrint>
        </v-col>
        <v-col class="center-area ml-1">
          <v-row no-gutters>
            <v-card
              elevation="0"
              class="center-area-riyoname d-flex flex-row"
              flat
              tile
            >
              <label class="center-area-riyoname-title">利用者名</label>
              <v-card class="center-area-riyoname-name" outlined tile>
                {{ userDataSelect[0].riyosyo }}
              </v-card>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-card
              elevation="0"
              class="center-area-jyukyusyuri d-flex flex-row"
              flat
              tile
            >
              <label class="center-area-jyukyusyuri-title">受給者証種類</label>
              <common-tab-menu
                class="center-area-jyukyusyuri-tab"
                @parent_common_tab_menu="parent_common_tab_menu"
                :tabmenu="tabmenus"
                :tabmargin="tabmargin"
              ></common-tab-menu>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-card
              elevation="0"
              class="center-area-button-new d-flex flex-row"
              flat
              tile
            >
              <a
                class="add-button"
                style="width: 150px"
                @click="openDialog_Term('add_new')"
                >受給者証新規登録</a
              >
              <v-card
                elevation="0"
                class="d-flex flex-row-reverse"
                style="width: calc(100% - 150px)"
                flat
                tile
              >
                <label
                  style="
                    font-size: 12px;
                    padding-top: 10px;
                    padding-right: 20px;
                  "
                  >：必須項目</label
                >
                <label
                  style="
                    font-size: 12px;
                    color: #ce3e47;
                    padding-top: 8px;
                    font-size: 1.5em;
                  "
                  >*</label
                >
              </v-card>
            </v-card>
          </v-row>
          <v-row no-gutters class="center-area-input d-flex flex-row">
            <v-card elevation="0" class="center-area-input-menu" flat tile>
              <v-btn
                class="menu-button"
                v-for="(item, index) of menuitems"
                :key="item.id"
                :color="
                  selectedTemplate && index === selectedIndex ? 'warning' : null
                "
                @click="
                  selectedTemplate = item;
                  selectedIndex = index;
                "
              >
                {{ item.name }}
              </v-btn>
            </v-card>
            <v-card elevation="0" class="center-area-input-main" flat tile>
              <JyukyuTourokuKihon> </JyukyuTourokuKihon>
              <JyukyuTourokuSyogaiKubun> </JyukyuTourokuSyogaiKubun>
              <JyukyuTourokuSikyuryo> </JyukyuTourokuSikyuryo>
            </v-card>
          </v-row>
          <v-row no-gutters class="center-area-bottom d-flex flex-row-reverse">
            <a class="regist-button" @click="openDialog_Term('regist')"
              >登 録</a
            >
          </v-row>
        </v-col>
        <v-col class="right-area ml-1">
          <JyukyuTourokuRightArea></JyukyuTourokuRightArea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import UserListPrint from '../../../../SIHS/frontend/src/components/UserListPrint.vue';
import CommonTabMenu from '../../../../SIHS/frontend/src/components/CommonTabMenu.vue';
import JyukyuTourokuKihon from '../components/JyukyuTourokuKihon.vue';
import JyukyuTourokuSyogaiKubun from '../components/JyukyuTourokuSyogaiKubun.vue';
import JyukyuTourokuSikyuryo from '../components/JyukyuTourokuSikyuryo.vue';
import JyukyuTourokuRightArea from '../components/JyukyuTourokuRightArea.vue';
export default {
  data() {
    return {
      mainGrid: [], //表示grid
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      dateArgument: '', // ヘッダメニューのカレンダー選択
      serviceArgument: '', // ヘッダメニューのサービス選択
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyo: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
      // タブの制御Flag
      JyukyuSyogaiFukusiFlag: true, // JyukyuSyogaiFukusiFlagの初期表示状態
      JyukyuSyogaiJiFlag: false, // JyukyuSyogaiJiFlagの初期表示状態
      JyukyuChiikiSoudanFlag: false, // JyukyuChiikiSoudanFlagの初期表示状態
      tabmenus: [
        { href: '#JyukyuSyogaiFukusi', text: '障害福祉' },
        { href: '#JyukyuSyogaiJi', text: '障害児' },
        { href: '#JyukyuChiikiSoudan', text: '地域相談支援' },
      ],
      tabmargin: '4px',
      tabheight: '30',
      menuitems: [
        {
          id: 1,
          name: '基本情報▸',
          syogai: true,
          syogaiJi: true,
          soudan: true,
        },
        {
          id: 2,
          name: '障害区分▸',
          syogai: true,
          syogaiJi: false,
          soudan: false,
        },
        { id: 3, name: '支給量▸', syogai: true, syogaiJi: true, soudan: false },
        {
          id: 4,
          name: '計画相談▸',
          syogai: true,
          syogaiJi: true,
          soudan: true,
        },
        {
          id: 5,
          name: '利用負担▸',
          syogai: true,
          syogaiJi: true,
          soudan: false,
        },
      ],
      selectedMenuItem: null,
    };
  },
  components: {
    UserListPrint,
    CommonTabMenu,
    JyukyuTourokuKihon,
    JyukyuTourokuSyogaiKubun,
    JyukyuTourokuSikyuryo,
    JyukyuTourokuRightArea,
  },
  methods: {
    /**************
     * 子コンポーネントCommonTabMenuで選択した値を取得
     */
    parent_common_tab_menu: function (args) {
      this.JyukyuSyogaiFukusiFlag = false;
      this.JyukyuSyogaiJiFlag = false;
      this.JyukyuChiikiSoudanFlag = false;
      // タブを切り替えた際の表示切替制御
      if (args.selectTab == 'JyukyuSyogaiFukusi')
        this.JyukyuSyogaiFukusiFlag = true;
      if (args.selectTab == 'JyukyuSyogaiJi') this.JyukyuSyogaiJiFlag = true;
      if (args.selectTab == 'JyukyuChiikiSoudan')
        this.JyukyuChiikiSoudanFlag = true;
    }, // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent: function (data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    setUserSelectPoint: function (row) {
      this.userDataSelect[0]['riyosyo'] =
        this.userListComponentDatas[row].riyocode +
        ' ' +
        this.userListComponentDatas[row].names;

      this.userDataSelect[0]['jyukyusyabango'] =
        this.userListComponentDatas[row].jyukyuno;
      // 値の設定
      this.changeHndoJyoho();
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuTouroku {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px;
  height: 740px;
  .container {
    padding: 4px;
    height: 100%;
  }
  .main-row {
    height: 100%;
  }

  .left-area {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
    height: 100%;
  }

  .center-area {
    min-width: 50%;
    max-width: none;
    width: 100%;
    height: 100%;
    .center-area-riyoname {
      background-color: #52646c;
      width: 100%;
      height: 30px;
      .center-area-riyoname-title {
        text-align: center;
        color: white;
        width: 110px;
        padding-top: 4px;
      }
      .center-area-riyoname-name {
        background-color: lightyellow;
        width: 200px;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    }
    .center-area-jyukyusyuri {
      width: 100%;
      height: 30px;
      .center-area-jyukyusyuri-title {
        text-align: center;
        width: 110px;
        height: 100%;
        padding-top: 6px;
        border-bottom: 2px solid #444;
      }
      .center-area-jyukyusyuri-tab {
        width: calc(100% - 110px);
        height: 100%;
        padding-top: 3px;
      }
    }
    .center-area-button-new {
      width: 100%;
      height: 38px;
    }
    .center-area-input {
      width: 100%;
      height: calc(100% - 136px);
      .center-area-input-menu {
        width: 65px;
        height: 100%;
      }
      .center-area-input-main {
        width: calc(100% - 65px);
        height: 100%;
        max-height: 100%;
        overflow-y: scroll;
      }

      // メニューボタン
      .menu-button {
        height: 25px;
        width: 100%;
        font-size: 11px;
        border-radius: 4px;
        margin-bottom: 4px;
        cursor: pointer;
        &:hover {
          background-color: $selected_color;
        }
      }
    }
    .center-area-bottom {
      width: 100%;
      height: 38px;
      float: right;
    }
  }

  .right-area {
    min-width: 350px;
    max-width: 350px;
    width: 350px;
    height: 100%;
    border: thin solid #0f4aee;
  }
}

// 追加ボタン
a {
  &.add-button {
    height: 30px;
    width: 150px;
    background-color: $white;
    border: 1px solid $font_color;
    display: block;
    float: left;
    color: $font_color !important;
    text-align: left;
    border-radius: 3px;
    padding: 4px 0px 0px 20px;
    margin-top: 4px;
    cursor: pointer;
    background-image: url('../assets/plus_gray_15px.png');
    background-position: top 6px left 1px;
    &:hover {
      background-color: $selected_color;
    }
  }
  &.copy-button {
    height: 30px;
    width: 150px;
    background-color: $white;
    border: 1px solid $font_color;
    display: block;
    float: left;
    color: $font_color !important;
    text-align: left;
    border-radius: 3px;
    padding: 4px 0px 0px 20px;
    margin-top: 4px;
    cursor: pointer;
    background-image: url('../assets/copy_gray_15px.png');
    background-position: top 6px left 1px;
    &:hover {
      background-color: $selected_color;
    }
  }
  &.regist-button {
    height: 30px;
    width: 100px;
    background-color: $white;
    border: 1px solid $font_color;
    display: block;
    float: right;
    color: $font_color !important;
    text-align: center;
    border-radius: 3px;
    padding: 4px 0px 0px 0px;
    margin-top: 4px;
    cursor: pointer;
    &:hover {
      background-color: $selected_color;
    }
  }
}

.required {
  position: absolute;
  color: #ce3e47; /*文字は白に*/
  font-weight: bold; /*太字に*/
  font-size: 1.1em; /*サイズ1.1倍*/
  top: 0;
  left: 0;
  margin-top: -3px;
  padding: 0px;
}
</style>