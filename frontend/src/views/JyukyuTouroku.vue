<template>
  <div id="JyukyuTouroku" :style="mainHeight">
    <v-container fluid class="container">
      <!-- 登録履歴スライドイン -->
      <div
        class="alert"
        :class="{ active: slideInRight.isOpen, to: !slideInRight.isOpen }"
        @click.self="slideInRight.isOpen = false"
      >
        <transition :name="slideInRight.id">
          <div class="surface" v-show="slideInRight.isOpen">
            <v-row no-gutters>
              <label class="title ml-2">登録履歴</label>
              <v-row
                no-gutters
                class="d-flex flex-row-reverse"
                style="height: 25px"
              >
                <div class="button-container">
                  <v-btn
                    style="height: 25px"
                    @click="slideInRight.isOpen = false"
                  >
                    閉じる
                  </v-btn>
                </div>
              </v-row>
            </v-row>
            <div class="alert-body">
              <JyukyuTourokuRirekiArea
                ref="rirekiArea"
                v-if="resetFlag"
                :selectedTab="this.selectedTab"
                :titleTab="this.titleTab"
                :titleNum="this.titleNum"
                :dispReki="true"
                @child_data="child_data"
              ></JyukyuTourokuRirekiArea>
            </div>
          </div>
        </transition>
      </div>
      <v-row no-gutters class="main-row">
        <v-col class="left-area">
          <UserListPrint
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </UserListPrint>
        </v-col>
        <v-col class="center-area ml-1" cols="1*">
          <v-row no-gutters>
            <v-card
              elevation="0"
              class="center-area-riyoname d-flex flex-row"
              flat
              tile
            >
              <label class="center-area-riyoname-title">利用者名</label>
              <v-card class="center-area-riyoname-name" outlined tile>
                {{ riyosyaname }}
              </v-card>
              <v-row
                no-gutters
                class="d-flex flex-row-reverse"
                style="height: 25px"
              >
                <v-btn
                  style="height: 25px; margin-top: 2px; margin-right: 2px"
                  @click="openRireki()"
                >
                  履歴参照
                </v-btn>
              </v-row>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-card
              elevation="0"
              class="center-area-jyukyusyurui d-flex flex-row"
              flat
              tile
            >
              <label class="center-area-jyukyusyurui-title">受給者証種類</label>
              <common-tab-menu
                class="center-area-jyukyusyurui-tab"
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
              <v-btn class="add-button mt-1" @click="setTrunNew">
                受給者証新規登録</v-btn
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
                v-for="item of menuitems"
                :key="item.id"
                :id="item.target + String(item.id)"
                @click="move_to(item, item.target + String(item.id))"
              >
                {{ item.name }}
              </v-btn>
            </v-card>
            <v-card
              elevation="0"
              class="center-area-input-main"
              @scroll="onScroll()"
              flat
              tile
            >
              <div v-if="JyukyuSyogaiFukusiFlag">
                <JyukyuTourokuKihon ref="kihon"> </JyukyuTourokuKihon>
                <JyukyuTourokuSyogaiKubun
                  ref="syogaiKubun"
                  :titleNum="this.titleNum[0]"
                >
                </JyukyuTourokuSyogaiKubun>
                <JyukyuTourokuSikyuryo :titleNum="this.titleNum[1]">
                </JyukyuTourokuSikyuryo>
                <JyukyuTourokuKeikakuSoudan :titleNum="this.titleNum[2]">
                </JyukyuTourokuKeikakuSoudan>
                <JyukyuTourokuRiyosyaFutan :titleNum="this.titleNum[3]">
                </JyukyuTourokuRiyosyaFutan>
              </div>
              <div v-else-if="JyukyuSyogaiJiFlag">
                <JyukyuTourokuKihon ref="kihon"> </JyukyuTourokuKihon>
                <JyukyuTourokuSikyuryo :titleNum="this.titleNum[0]">
                </JyukyuTourokuSikyuryo>
                <JyukyuTourokuKeikakuSoudan :titleNum="this.titleNum[1]">
                </JyukyuTourokuKeikakuSoudan>
                <JyukyuTourokuRiyosyaFutan :titleNum="this.titleNum[2]">
                </JyukyuTourokuRiyosyaFutan>
              </div>
              <div v-else-if="JyukyuChiikiSoudanFlag">
                <JyukyuTourokuKihon ref="kihon"> </JyukyuTourokuKihon>
                <JyukyuTourokuKeikakuSoudan :titleNum="this.titleNum[0]">
                </JyukyuTourokuKeikakuSoudan>
              </div>
            </v-card>
          </v-row>
          <hr
            v-if="$_mode() === 'new' && !$_subGridSelected()"
            size="2"
            color="#027eb0"
            style="margin-top: 4px; margin-left: 69px"
            noshade
          />
          <v-row
            v-if="$_mode() === 'new' && !$_subGridSelected()"
            no-gutters
            class="center-area-bottom d-flex flex-row"
          >
            <v-btn class="cancel-button" @click="openDialog_Term('regist')">
              キャンセル</v-btn
            >
            <v-card
              elevation="0"
              class="center-area-bottom-regist d-flex flex-row-reverse"
              flat
              tile
            >
              <v-btn class="regist-button" @click="openDialog_Term('regist')">
                登 録</v-btn
              >
            </v-card>
          </v-row>
        </v-col>
        <v-col class="right-area ml-1">
          <JyukyuTourokuRightArea
            :selectedTab="this.selectedTab"
            :titleTab="this.titleTab"
            :titleNum="this.titleNum"
            :dispReki="false"
            @child_data="child_data"
          ></JyukyuTourokuRightArea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Vue from 'vue';
import UserListPrint from '@sihs/frontend/src/components/UserListPrint.vue';
import CommonTabMenu from '@sihs/frontend/src/components/CommonTabMenu.vue';
import JyukyuTourokuKihon from '../components/JyukyuTourokuKihon.vue';
import JyukyuTourokuSyogaiKubun from '../components/JyukyuTourokuSyogaiKubun.vue';
import JyukyuTourokuSikyuryo from '../components/JyukyuTourokuSikyuryo.vue';
import JyukyuTourokuKeikakuSoudan from '../components/JyukyuTourokuKeikakuSoudan.vue';
import JyukyuTourokuRiyosyaFutan from '../components/JyukyuTourokuRiyosyaFutan.vue';
import JyukyuTourokuRirekiArea from '../components/JyukyuTourokuRightArea.vue';
import JyukyuTourokuRightArea from '../components/JyukyuTourokuRightArea.vue';

import { JyukyuTourokuKihonData } from '@backend/api/JyukyuTourokuKihon';
import { getJyukyuTourokuSyogaiKubunData } from '../data/JyukyuTourokuSyogaiKubunData.js';

let GlobalData = new Vue({
  data: {
    $mode: 'new', //編集モード
    $hojomode: 'none', //入力補助機能モード
  },
});

Vue.mixin({
  methods: {
    $_mode() {
      return GlobalData.$data.$mode;
    },
    $_setMode(newMode) {
      GlobalData.$data.$mode = newMode;
    },
    $_hojomode() {
      return GlobalData.$data.$hojomode;
    },
    $_setHojoMode(hojoMode) {
      GlobalData.$data.$hojomode = hojoMode;
    },
  },
  computed: {
    $mode: {
      get: function () {
        return GlobalData.$data.$mode;
      },
      set: function (newMode) {
        GlobalData.$data.$mode = newMode;
      },
    },
    $hojomode: {
      get: function () {
        return GlobalData.$data.$hojomode;
      },
      set: function (hojoMode) {
        GlobalData.$data.$hojomode = hojoMode;
      },
    },
  },
});

export default {
  data() {
    return {
      mainHeight: '',
      menuBtnClick: false,
      mainGrid: [], //表示grid
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      dateArgument: '', // ヘッダメニューのカレンダー選択
      serviceArgument: '', // ヘッダメニューのサービス選択
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: [{ riyosyaname: '', jyukyusyabango: '' }], // ユーザ一覧から選択した値
      riyosyaname: '',
      // タブの制御Flag
      JyukyuSyogaiFukusiFlag: false, // JyukyuSyogaiFukusiFlagの初期表示状態
      JyukyuSyogaiJiFlag: false, // JyukyuSyogaiJiFlagの初期表示状態
      JyukyuChiikiSoudanFlag: false, // JyukyuChiikiSoudanFlagの初期表示状態
      selectedTab: 'JyukyuSyogaiFukusi',
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
          target: 'JyukyuTourokuKihon',
          clickoff: '#cee2e1',
          clickon: '#1f7872',
          syogai: true,
          syogaiJi: true,
          soudan: true,
        },
        {
          id: 2,
          name: '障害区分▸',
          target: 'JyukyuTourokuSyogaiKubun',
          clickoff: '#f5f5f5',
          clickon: '#333',
          syogai: true,
          syogaiJi: false,
          soudan: false,
        },
        {
          id: 3,
          name: '　支給量▸',
          target: 'JyukyuTourokuSikyuryo',
          clickoff: '#f5f5f5',
          clickon: '#333',
          syogai: true,
          syogaiJi: true,
          soudan: false,
        },
        {
          id: 4,
          name: '計画相談▸',
          target: 'JyukyuTourokuKeikakuSoudan',
          clickoff: '#f5f5f5',
          clickon: '#333',
          syogai: true,
          syogaiJi: true,
          soudan: true,
        },
        {
          id: 5,
          name: '利用負担▸',
          target: 'JyukyuTourokuRiyosyaFutan',
          clickoff: '#f5f5f5',
          clickon: '#333',
          syogai: true,
          syogaiJi: true,
          soudan: false,
        },
      ],
      selectedMenuItem: null,
      titleTab: '',
      titleNum: ['①', '②', '③', '④'],
      resetFlag: false,
      tabChanged: true,

      slideInRight: {
        id: 'right',
        isOpen: false,
      },

      //dataobject
      kihonDataOrg: [], //基本データ初期リスト
      syogaiKubunDataOrg: [], //障害区分データ初期リスト
    };
  },
  components: {
    UserListPrint,
    CommonTabMenu,
    JyukyuTourokuKihon,
    JyukyuTourokuSyogaiKubun,
    JyukyuTourokuSikyuryo,
    JyukyuTourokuKeikakuSoudan,
    JyukyuTourokuRiyosyaFutan,
    JyukyuTourokuRirekiArea,
    JyukyuTourokuRightArea,
  },
  mounted() {
    this.handleResize;
    this.menu_clear();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  computed: {},
  methods: {
    setTrunNew() {
      this.$_setMode('new');
      this.$_setSubGridSelected(false);
      if (this.JyukyuSyogaiFukusiFlag) {
        this.JyukyuSyogaiFukusiFlag = false;
        this.$nextTick(() => {
          this.JyukyuSyogaiFukusiFlag = true;
        });
      } else if (this.JyukyuSyogaiJiFlag) {
        this.JyukyuSyogaiJiFlag = false;
        this.$nextTick(() => {
          this.JyukyuSyogaiJiFlag = true;
        });
      } else if (this.JyukyuChiikiSoudanFlag) {
        this.JyukyuChiikiSoudanFlag = false;
        this.$nextTick(() => {
          this.JyukyuChiikiSoudanFlag = true;
        });
      }
      this.goto_top();
    },
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let targetElement = document.getElementById('JyukyuTouroku');
      let clientRect = targetElement.getBoundingClientRect();
      let y = clientRect.top;
      //alert(y);
      let ht = '';
      ht = height - y - 20;
      this.mainHeight = 'height:' + ht + 'px;';
    },
    /**************
     * 子コンポーネントCommonTabMenuで選択した値を取得
     */
    parent_common_tab_menu(args) {
      this.JyukyuSyogaiFukusiFlag = false;
      this.JyukyuSyogaiJiFlag = false;
      this.JyukyuChiikiSoudanFlag = false;
      // タブを切り替えた際の表示切替制御
      this.JyukyuSyogaiFukusiFlag = args.selectTab == 'JyukyuSyogaiFukusi';
      this.JyukyuSyogaiJiFlag = args.selectTab == 'JyukyuSyogaiJi';
      this.JyukyuChiikiSoudanFlag = args.selectTab == 'JyukyuChiikiSoudan';
      this.selectedTab = args.selectTab;

      for (let i = 0; i < this.menuitems.length; i++) {
        var btn = document.getElementById(
          this.menuitems[i].target + String(this.menuitems[i].id)
        );
        if (this.JyukyuSyogaiFukusiFlag) {
          if (this.menuitems[i].syogai) {
            btn.style.display = 'block';
          } else {
            btn.style.display = 'none';
          }
          this.titleTab = this.tabmenus[0].text;
        } else if (this.JyukyuSyogaiJiFlag) {
          if (this.menuitems[i].syogaiJi) {
            btn.style.display = 'block';
          } else {
            btn.style.display = 'none';
          }
          this.titleTab = this.tabmenus[1].text;
          this.tabChanged = false;
        } else if (this.JyukyuChiikiSoudanFlag) {
          if (this.menuitems[i].soudan) {
            btn.style.display = 'block';
          } else {
            btn.style.display = 'none';
          }
          this.titleTab = this.tabmenus[2].text;
          this.tabChanged = false;
        }
        this.menu_clear();
        if (!this.tabChanged) {
          this.goto_top();
        }
        this.RightAreaReset();
      }
    },
    RightAreaReset() {
      this.resetFlag = false;
      this.$nextTick(() => {
        this.resetFlag = true;
      });
    },
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    setUserSelectPoint(row) {
      this.userDataSelect[0]['riyosyaname'] =
        this.userListComponentDatas[row].riyocode +
        ' ' +
        this.userListComponentDatas[row].names;
      this.riyosyaname = this.userDataSelect[0]['riyosyaname'];
      this.userDataSelect[0]['jyukyusyabango'] =
        this.userListComponentDatas[row].jyukyuno;
      // データ取得・表示
      let rid = this.userListComponentDatas[row].riid;
      //基本情報
      this.kihonDataOrg = this.getJyukyuTourokuKihonData();
      this.setKihonData(this.kihonDataOrg, null);
      if (this.JyukyuSyogaiFukusiFlag) {
        //障害支給区分
        this.syogaiKubunDataOrg = getJyukyuTourokuSyogaiKubunData(rid);
        this.setSyogaiKubunData(this.syogaiKubunDataOrg, null);
      } else if (this.JyukyuSyogaiJiFlag) {
      } else if (this.JyukyuChiikiSoudanFlag) {
      }
      this.$_setSubGridSelected(true);
    },
    async getJyukyuTourokuKihonData(rid) {
      let jinf = [];

      return JyukyuTourokuKihonData().then((result) => {
        jinf = result.jyukyu_inf;
        return jinf;
      });
    },
    setKihonData(list, seleced) {
      this.$refs.kihon.setData(list, seleced);
    },
    setSyogaiKubunData(list, seleced) {
      this.$refs.syogaiKubun.setData(list, seleced);
    },
    openRireki() {
      this.slideInRight.isOpen = true;
      this.$refs.rirekiArea.setKihonData(this.kihonDataOrg);
      if (this.JyukyuSyogaiFukusiFlag) {
        this.$refs.rirekiArea.setSyogaiKubunData(this.syogaiKubunDataOrg);
      } else if (this.JyukyuSyogaiJiFlag) {
      } else if (this.JyukyuChiikiSoudanFlag) {
      }
    },
    menu_clear() {
      for (let i = 0; i < this.menuitems.length; i++) {
        var btn = document.getElementById(
          this.menuitems[i].target + String(this.menuitems[i].id)
        );
        btn.style.color = '#333';
        btn.style.backgroundColor = this.menuitems[i].clickoff;
      }
    },
    goto_top() {
      var target = document.getElementById(this.menuitems[0].target);
      target.scrollIntoView({
        block: 'start',
      });
    },
    move_to(item, id) {
      this.menuBtnClick = true;
      this.menu_clear();
      this.goto_top();
      if (item == null) return;
      var targetbtn = document.getElementById(id);
      targetbtn.style.color = '#fff';
      targetbtn.style.backgroundColor = item.clickon;
      var target = document.getElementById(item.target);
      target.scrollIntoView({
        block: 'start',
      });
    },
    onScroll(e) {
      if (!this.menuBtnClick) {
        this.menu_clear();
      }
      this.menuBtnClick = false;
    },
    /****************
     * 子コンポーネントで履歴表示からのデータ取得
     * args: 選択している行の値
     * code: 選択しているグリッドの種類
     */
    child_data(args, code) {
      // console.log(args);
      // console.log(code);
      switch (code) {
        case 'kihon':
          this.setKihonData(this.kihonDataOrg, args);
          break;
        case 'syogai':
          this.setSyogaiKubunData(this.syogaiKubunDataOrg, args);
          break;
        case 'kettei':
          break;
        case 'keikaku':
          break;
        case 'futan':
          break;
        case 'shichoson':
          this.$refs.kihon.setShichoson(args.code, args.name);
          break;
        case 'kazoku':
          this.$refs.kihon.setSikyuketteisya(args.code, args.name);
          break;
      }
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
  }

  .center-area {
    max-width: none;
    height: 100%;
    .center-area-riyoname {
      background-color: #52646c;
      width: 100%;
      height: 30px;
      .center-area-riyoname-title {
        text-align: center;
        color: $white;
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
    .center-area-jyukyusyurui {
      width: 100%;
      height: 30px;
      .center-area-jyukyusyurui-title {
        text-align: center;
        width: 110px;
        height: 100%;
        padding-top: 6px;
        border-bottom: 2px solid #444;
      }
      .center-area-jyukyusyurui-tab {
        width: calc(100% - 110px);
        height: 100%;
        padding-top: 3px;
      }
    }
    .center-area-button-new {
      width: 100%;
      height: 38px;
      .add-button {
        height: 30px;
        width: 150px;
        padding: 0px 0px 0px 10px;
        background-image: url('../assets/plus_gray_15px.png');
        background-position: top 6px left 1px;
        border: 1px solid $light-gray;
      }
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
      height: 40px;
      .cancel-button {
        height: 30px;
        width: 100px;
        text-align: center;
        margin-top: 4px;
        margin-left: 69px;
        border-radius: 3px;
        border: 1px solid $light-gray;
      }
      .center-area-bottom-regist {
        width: calc(100% - 169px);
        float: right;
        .regist-button {
          height: 30px;
          width: 100px;
          color: $white;
          background-color: #027eb0;
          text-align: center;
          margin-top: 4px;
          margin-right: 20px;
          border-radius: 3px;
          &:hover {
            background-color: #005f85;
          }
        }
      }
    }
  }

  .right-area {
    min-width: 300px;
    max-width: 300px;
    width: 300px;
    height: 100%;
  }
}

// 追加ボタン
a {
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

.modify-button {
  width: 50px;
  margin-top: 2px;
  margin-right: 2px;
  border-radius: 3px;
}

.input_picker {
  .vdp-datepicker__clear-button {
    position: absolute;
    top: 0;
    left: auto;
    right: -55px;
    width: 50px;
    border: 1px solid #ccc;
    padding: 1px 0px;
    text-align: center;
    span {
      display: none;
    }
    &:hover {
      background-color: #ddd;
    }
    &:after {
      content: 'クリア';
      font-size: 12px;
    }
  }
}

//登録履歴スライドイン用
.alert {
  position: fixed;
  left: 0;
  top: -30px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: calc(100vh + 50px);
  z-index: 100;

  display: flex;
  justify-content: right;
  align-items: center;
}
.surface {
  background-color: #424242;
  color: white;
  max-height: calc(100% - 96px);
  width: 80%;
  max-width: 400px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin: 48px;
  position: relative;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
}

.surface .alert-body {
  padding: 2px 2px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.surface .button-container {
  height: 25px;
  width: 80%;
  margin: 4px 4px;

  display: flex;
  align-items: right;
  justify-content: flex-end;
}
.active {
  visibility: visible;
  transition: visibility 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.to {
  visibility: hidden;
  transition: visibility 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.right-enter-active,
.right-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.right-enter,
.right-leave-to {
  transform: translateX(100vw) translateX(0px);
}
</style>