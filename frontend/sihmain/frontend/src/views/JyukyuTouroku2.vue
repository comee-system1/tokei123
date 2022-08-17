<template>
  <div id="JyukyuTouroku2" :style="mainHeight">
    <v-container fluid class="container">
      <!-- 登録履歴スライドイン -->
      <div
        class="rireki"
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
            <div class="rireki-body">
              <JyukyuTourokuRirekiArea
                ref="rirekiArea"
                v-if="resetFlag"
                :selectedTab="this.selectedTab"
                :titleTab="this.titleTab"
                :titleNum="this.titleNum"
                :dispReki="true"
                @child_data="child_data"
                @setSubGridSelected="setSubGridSelected"
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
            @childLeftArea="changeLeftArea"
          >
          </UserListPrint>
        </v-col>
        <v-col
          :class="{
            'center-area': mltype == true,
            'ml-1': mltype == true,
            moveLeft: moveLeft == true,
            moveRight: moveRight == true,
          }"
          cols="1*"
        >
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
          <v-row
            no-gutters
            id="CenterAreaInput"
            class="center-area-input d-flex flex-row"
          >
            <v-card
              elevation="0"
              id="mainArea"
              class="center-area-input-main"
              flat
              tile
            >
              <v-row no-gutters class="d-flex flex-row">
                <div
                  v-if="
                    JyukyuSyogaiFukusiFlag ||
                    JyukyuSyogaiJiFlag ||
                    JyukyuChiikiSoudanFlag
                  "
                >
                  <v-card
                    id="c-kihon"
                    elevation="5"
                    class="pa-1 my-2 ml-3 mr-3"
                    @mouseover="mouseover('c-kihon')"
                    @mouseleave="mouseleave('c-kihon')"
                    @mousedown="mousedown('c-kihon')"
                    @mouseup="mouseup('c-kihon')"
                  >
                    <JyukyuTourokuKihon
                      ref="kihon"
                      @setMode="setMode"
                      @setHojoMode="setHojoMode"
                    >
                    </JyukyuTourokuKihon>
                  </v-card>
                </div>
                <div v-if="JyukyuSyogaiFukusiFlag">
                  <v-card
                    id="c-syogaiKubun"
                    elevation="5"
                    class="pa-1 my-2 ml-3 mr-3"
                    @mouseover="mouseover('c-syogaiKubun')"
                    @mouseleave="mouseleave('c-syogaiKubun')"
                    @mousedown="mousedown('c-syogaiKubun')"
                    @mouseup="mouseup('c-syogaiKubun')"
                  >
                    <JyukyuTourokuSyogaiKubun
                      ref="syogaiKubun"
                      @setMode="setMode"
                      @setHojoMode="setHojoMode"
                      :titleNum="this.titleNum[0]"
                    >
                    </JyukyuTourokuSyogaiKubun>
                  </v-card>
                </div>
                <div v-if="JyukyuSyogaiFukusiFlag || JyukyuSyogaiJiFlag">
                  <v-card
                    id="c-sikyuryo"
                    elevation="5"
                    class="pa-1 my-2 ml-3 mr-3"
                    @mouseover="mouseover('c-sikyuryo')"
                    @mouseleave="mouseleave('c-sikyuryo')"
                    @mousedown="mousedown('c-sikyuryo')"
                    @mouseup="mouseup('c-sikyuryo')"
                  >
                    <JyukyuTourokuSikyuryo
                      ref="sikyuryo"
                      @setMode="setMode"
                      @setHojoMode="setHojoMode"
                      @onScroll="onScroll"
                      :titleNum="this.titleNum[1]"
                    >
                    </JyukyuTourokuSikyuryo>
                  </v-card>
                </div>
                <div
                  v-if="
                    JyukyuSyogaiFukusiFlag ||
                    JyukyuSyogaiJiFlag ||
                    JyukyuChiikiSoudanFlag
                  "
                >
                  <v-card
                    id="c-keikaku"
                    elevation="5"
                    class="pa-1 my-2 ml-3 mr-3"
                    @mouseover="mouseover('c-keikaku')"
                    @mouseleave="mouseleave('c-keikaku')"
                    @mousedown="mousedown('c-keikaku')"
                    @mouseup="mouseup('c-keikaku')"
                  >
                    <JyukyuTourokuKeikakuSoudan
                      ref="keikaku"
                      @setMode="setMode"
                      @setHojoMode="setHojoMode"
                      @onScroll="onScroll"
                      :titleNum="this.titleNum[2]"
                    >
                    </JyukyuTourokuKeikakuSoudan>
                  </v-card>
                </div>
                <div v-if="JyukyuSyogaiFukusiFlag || JyukyuSyogaiJiFlag">
                  <v-card
                    id="c-futan"
                    elevation="5"
                    class="pa-1 my-2 ml-3 mr-3"
                    @mouseover="mouseover('c-futan')"
                    @mouseleave="mouseleave('c-futan')"
                    @mousedown="mousedown('c-futan')"
                    @mouseup="mouseup('c-futan')"
                  >
                    <JyukyuTourokuRiyosyaFutan
                      ref="futan"
                      @setMode="setMode"
                      @setHojoMode="setHojoMode"
                      :titleNum="this.titleNum[3]"
                    >
                    </JyukyuTourokuRiyosyaFutan>
                  </v-card>
                </div>
              </v-row>
            </v-card>
          </v-row>
          <!-- <hr
            v-if="mode === 'new' && !subGridSelected"
            size="2"
            color="#027eb0"
            style="margin-top: 4px; margin-left: 0px"
            noshade
          />
          <v-row
            v-if="mode === 'new' && !subGridSelected"
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
          </v-row> -->
        </v-col>
      </v-row>
      <jyukyu-touroku-dialog
        ref="jyukyu_touroku_dialog"
      ></jyukyu-touroku-dialog>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import UserListPrint from '@sihs/frontend/src/components/UserListPrint2.vue';
import CommonTabMenu from '@sihs/frontend/src/components/CommonTabMenu.vue';
import JyukyuTourokuKihon from '../components/JyukyuTourokuKihon2.vue';
import JyukyuTourokuSyogaiKubun from '../components/JyukyuTourokuSyogaiKubun2.vue';
import JyukyuTourokuSikyuryo from '../components/JyukyuTourokuSikyuryo2.vue';
import JyukyuTourokuKeikakuSoudan from '../components/JyukyuTourokuKeikakuSoudan2.vue';
import JyukyuTourokuRiyosyaFutan from '../components/JyukyuTourokuRiyosyaFutan2.vue';
import JyukyuTourokuRirekiArea from '../components/JyukyuTourokuRightArea.vue';
import JyukyuTourokuRightArea from '../components/JyukyuTourokuRightArea.vue';

import jyukyuTourokuDialog from '../components/JyukyuTourokuDialog.vue';

import { postConnect } from '@connect/postConnect';
import { getConnect } from '@connect/getConnect';

let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;

const MOUSE_OVER_KIHON = '#175752';
const MOUSE_LEAVE_KIHON = '#1f7872';
const MOUSE_OVER_OTHER = '#afafaf';
const MOUSE_LEAVE_OTHER = '#c6c6c6';
const MOUSE_OVER_BACK = '#f6f6f6';
const MOUSE_LEAVE_BACK = '#fff';
const ID_KIHON = 'c-kihon';
const ID_SYOGAIKUBN = 'c-syogaiKubun';
const ID_SIKYURYO = 'c-sikyuryo';
const ID_KEIKAKU = 'c-keikaku';
const ID_FUTAN = 'c-futan';

export default {
  data() {
    return {
      mode: 'new', //編集モード
      hojomode: 'none', //入力補助機能モード
      subGridSelected: false,
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
          target: 'JyukyuTourokuKihon2',
        },
        {
          id: 2,
          target: 'JyukyuTourokuSyogaiKubun2',
        },
        {
          id: 3,
          target: 'JyukyuTourokuSikyuryo2',
        },
        {
          id: 4,
          target: 'JyukyuTourokuKeikakuSoudan2',
        },
        {
          id: 5,
          target: 'JyukyuTourokuRiyosyaFutan2',
        },
      ],
      selectedMenuItem: null,
      titleTab: '',
      titleNum: [],
      resetFlag: false,
      tabChanged: true,

      slideInRight: {
        id: 'right',
        isOpen: false,
      },

      moveRight: false,
      moveLeft: false,
      mltype: true,

      OnScrllFlag: false,

      //受給者証内部ID
      jyukyuid: 0,
      //dataobject
      kihonDataOrg: [], //基本データ初期リスト
      syogaiKubunDataOrg: [], //障害区分データ初期リスト
      sikyuryoDataOrg: [], //支給決定内容データ初期リスト
      keikakuSoudanDataOrg: [], //計画相談データ初期リスト
      riyosyaFutanDataOrg: [], //利用者負担データ初期リスト
      kihonDataOrgFiltered: [], //基本データ初期リスト：受給者証内部IDで絞込
      syogaiKubunDataOrgFiltered: [], //障害区分データ初期リスト：受給者証内部IDで絞込
      sikyuryoDataOrgFiltered: [], //支給決定内容データ初期リスト：受給者証内部IDで絞込
      keikakuSoudanDataOrgFiltered: [], //計画相談データ初期リスト：受給者証内部IDで絞込
      riyosyaFutanDataOrgFiltered: [], //利用者負担データ初期リスト：受給者証内部IDで絞込

      //マスタ
      shichosonList: [],
      jigyosyoList: [],
      sikyuryoLayoutList: [],
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
    jyukyuTourokuDialog,
  },
  mounted() {
    this.handleResize;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.getMstData();
  },
  computed: {},
  methods: {
    /*******************************
     * ユーザー一覧コンポーネントの開閉ボタンを押下
     */
    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveRight = true;
        this.moveLeft = false;
      } else {
        this.moveLeft = true;
        this.moveRight = false;
      }
      this.handleResize();
    },
    jyukyuTourokuDialogOpen(id, mode) {
      if (id == ID_KIHON) {
        if (this.kihonDataOrgFiltered.length > 0) {
          this.$refs.jyukyu_touroku_dialog.open(
            mode,
            this.kihonDataOrgFiltered
          );
        }
      } else if (id == ID_SYOGAIKUBN) {
        if (this.syogaiKubunDataOrgFiltered.length > 0) {
          this.$refs.jyukyu_touroku_dialog.open(
            mode,
            this.syogaiKubunDataOrgFiltered
          );
        }
      } else if (id == ID_SIKYURYO) {
        if (this.sikyuryoDataOrgFiltered.length > 0) {
          this.$refs.jyukyu_touroku_dialog.open(
            mode,
            this.sikyuryoDataOrgFiltered
          );
        }
      } else if (id == ID_KEIKAKU) {
        if (this.keikakuSoudanDataOrgFiltered.length > 0) {
          this.$refs.jyukyu_touroku_dialog.open(
            mode,
            this.keikakuSoudanDataOrgFiltered
          );
        }
      } else if (id == ID_FUTAN) {
        if (this.riyosyaFutanDataOrgFiltered.length > 0) {
          this.$refs.jyukyu_touroku_dialog.open(
            mode,
            this.riyosyaFutanDataOrgFiltered
          );
        }
      }
    },
    mouseover(id) {
      if (id == ID_KIHON) {
        this.overCardColor(ID_KIHON, 'kihonheader', MOUSE_OVER_KIHON);
      } else if (id == ID_SYOGAIKUBN) {
        this.overCardColor(
          ID_SYOGAIKUBN,
          'syogaikubunheader',
          MOUSE_OVER_OTHER
        );
      } else if (id == ID_SIKYURYO) {
        this.overCardColor(ID_SIKYURYO, 'sikyuryoheader', MOUSE_OVER_OTHER);
      } else if (id == ID_KEIKAKU) {
        this.overCardColor(ID_KEIKAKU, 'keikakuSoudanheader', MOUSE_OVER_OTHER);
      } else if (id == ID_FUTAN) {
        this.overCardColor(ID_FUTAN, 'riyosyafutanheader', MOUSE_OVER_OTHER);
      }
    },
    mouseleave(id) {
      this.mouseupCard(id);
      if (id == ID_KIHON) {
        this.leaveCardColor(ID_KIHON, 'kihonheader', MOUSE_LEAVE_KIHON);
      } else if (id == ID_SYOGAIKUBN) {
        this.leaveCardColor(
          ID_SYOGAIKUBN,
          'syogaikubunheader',
          MOUSE_LEAVE_OTHER
        );
      } else if (id == ID_SIKYURYO) {
        this.leaveCardColor(ID_SIKYURYO, 'sikyuryoheader', MOUSE_LEAVE_OTHER);
      } else if (id == ID_KEIKAKU) {
        this.leaveCardColor(
          ID_KEIKAKU,
          'keikakuSoudanheader',
          MOUSE_LEAVE_OTHER
        );
      } else if (id == ID_FUTAN) {
        this.leaveCardColor(ID_FUTAN, 'riyosyafutanheader', MOUSE_LEAVE_OTHER);
      }
    },
    mousedown(id) {
      this.mousedownCard(id);
      this.OnScrllFlag = false;
    },
    mouseup(id) {
      this.mouseupCard(id);
      if (this.OnScrllFlag) return;
      if (id == ID_KIHON) {
        this.setMode('modKihon');
        this.jyukyuTourokuDialogOpen(id, 'modKihon');
      } else if (id == ID_SYOGAIKUBN) {
        this.setMode('modSyogaikubun');
        this.jyukyuTourokuDialogOpen(id, 'modSyogaikubun');
      } else if (id == ID_SIKYURYO) {
        this.setMode('modSikyuryo');
        this.jyukyuTourokuDialogOpen(id, 'modSikyuryo');
      } else if (id == ID_KEIKAKU) {
        this.setMode('modKeikakuSoudan');
        this.jyukyuTourokuDialogOpen(id, 'modKeikakuSoudan');
      } else if (id == ID_FUTAN) {
        this.setMode('modRiyosyafutan');
        this.jyukyuTourokuDialogOpen(id, 'modRiyosyafutan');
      }
      this.OnScrllFlag = false;
    },
    overCardColor(id1, id2, color) {
      let elmH = document.getElementById(id1);
      elmH.style.backgroundColor = MOUSE_OVER_BACK;
      elmH = document.getElementById(id2);
      elmH.style.backgroundColor = color;
    },
    leaveCardColor(id1, id2, color) {
      let elmH = document.getElementById(id1);
      elmH.style.backgroundColor = MOUSE_LEAVE_BACK;
      elmH = document.getElementById(id2);
      elmH.style.backgroundColor = color;
    },
    mousedownCard(id) {
      let elm = document.getElementById(id);
      elm.classList.remove('elevation-5');
      elm.classList.add('elevation-1');
      elm.classList.remove('ml-3');
      elm.classList.remove('mr-3');
      elm.classList.add('ml-4');
      elm.classList.add('mr-2');
    },
    mouseupCard(id) {
      let elm = document.getElementById(id);
      elm.classList.remove('elevation-1');
      elm.classList.add('elevation-5');
      elm.classList.remove('ml-4');
      elm.classList.remove('mr-2');
      elm.classList.add('ml-3');
      elm.classList.add('mr-3');
    },
    setTrunNew() {
      this.setMode('new');
      this.setSubGridSelected(false);
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
      let targetElement = document.getElementById('JyukyuTouroku2');
      if (targetElement != null) {
        let clientRect = targetElement.getBoundingClientRect();
        let y = clientRect.top;
        let ht = '';
        ht = height - y - 20;
        this.mainHeight = 'height:' + ht + 'px;';
      }
      if (this.moveLeft == false) {
        document.getElementById('CenterAreaInput').style.width = '100%';
      } else {
        document.getElementById('CenterAreaInput').style.width =
          window.innerWidth - 45 + 'px';
      }
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
        if (this.JyukyuSyogaiFukusiFlag) {
          this.titleTab = this.tabmenus[0].text;
          this.titleNum = ['①', '②', '③', '④'];
        } else if (this.JyukyuSyogaiJiFlag) {
          this.titleTab = this.tabmenus[1].text;
          this.tabChanged = false;
          this.titleNum = ['', '①', '②', '③'];
        } else if (this.JyukyuChiikiSoudanFlag) {
          this.titleTab = this.tabmenus[2].text;
          this.tabChanged = false;
          this.titleNum = ['', '', '①', ''];
        }
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
      // if (rid == 55000) {
      //   rid = 589;
      // } else if (rid == 55001) {
      //   rid = 583;
      // } else if (rid == 550010) {
      //   rid = 591;
      // } else if (rid == 550011) {
      //   rid = 592;
      // } else if (rid == 550012) {
      //   rid = 593;
      // }
      //基本情報
      this.getJyukyuTourokuKihonData(rid).then((value) => {
        this.kihonDataOrg = value;
        this.setKihonData();
      });
      if (this.JyukyuSyogaiFukusiFlag) {
        //障害支給区分
        this.getJyukyuTourokuSyogaiKubunData(rid).then((value) => {
          this.syogaiKubunDataOrg = value;
          this.setSyogaiKubunData();
        });
        //支給決定内容
        this.getJyukyuTourokuSikyuryoData(rid).then((value) => {
          this.sikyuryoDataOrg = value;
          this.setSikyuryoData();
        });
        //計画相談
        this.getJyukyuTourokuKeikakuSoudanData(rid).then((value) => {
          this.keikakuSoudanDataOrg = value;
          this.setKeikakuSoudanData();
        });
        //利用者負担
        this.getJyukyuTourokuRiyosyaFutanData(rid).then((value) => {
          this.riyosyaFutanDataOrg = value;
          this.setRiyosyaFutanData();
        });
      } else if (this.JyukyuSyogaiJiFlag) {
      } else if (this.JyukyuChiikiSoudanFlag) {
      }
      this.setSubGridSelected(true);
    },
    //apiからデータ取得
    async getJyukyuTourokuKihonData(rid) {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        rid: rid,
      };
      return getConnect(this.$route.path.replace('2', 'Kihon'), params).then(
        (result) => {
          return result.jyukyu_inf;
        }
      );
    },
    async getJyukyuTourokuSyogaiKubunData(rid) {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        rid: rid,
      };
      return getConnect(
        this.$route.path.replace('2', 'SyogaiKubun'),
        params
      ).then((result) => {
        return result.skryoh4_inf;
      });
    },
    async getJyukyuTourokuSikyuryoData(rid) {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        rid: rid,
      };
      return getConnect(this.$route.path.replace('2', 'Sikyuryo'), params).then(
        (result) => {
          return result.skryoh1_inf;
        }
      );
    },
    async getJyukyuTourokuKeikakuSoudanData(rid) {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        rid: rid,
      };
      return getConnect(
        this.$route.path.replace('2', 'KeikakuSoudan'),
        params
      ).then((result) => {
        return result.skryoh3_inf;
      });
    },
    async getJyukyuTourokuRiyosyaFutanData(rid) {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        rid: rid,
      };
      return getConnect(
        this.$route.path.replace('2', 'RiyosyaFutan'),
        params
      ).then((result) => {
        return result.skryoh2_inf;
      });
    },
    //マスタ
    async getJyukyuTourokuSikyuryoLayoutData() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      return getConnect(
        this.$route.path.replace('2', 'SikyuryoLayout'),
        params
      ).then((result) => {
        return result.layout_inf;
      });
    },
    //各コンポーネントと履歴にデータ設定
    setKihonData() {
      if (this.kihonDataOrg.length > 0) {
        this.jyukyuid = this.kihonDataOrg[0].jyukyuid;
        this.kihonDataOrgFiltered = this.kihonDataOrg.filter((value) => {
          if (value.jyukyuid === this.jyukyuid) {
            return value;
          }
        });
      }
      this.$refs.kihon.setData(this.kihonDataOrgFiltered);
    },
    setSyogaiKubunData() {
      this.syogaiKubunDataOrgFiltered = this.syogaiKubunDataOrg.filter(
        (value) => {
          if (value.jyukyuid === this.jyukyuid) {
            return value;
          }
        }
      );
      this.$refs.rirekiArea.setSyogaiKubunData(this.syogaiKubunDataOrgFiltered);
      this.$refs.syogaiKubun.setData(this.syogaiKubunDataOrgFiltered);
    },
    setSikyuryoData() {
      this.sikyuryoDataOrgFiltered = this.sikyuryoDataOrg.filter((value) => {
        if (value.jyukyuid === this.jyukyuid) {
          return value;
        }
      });
      this.$refs.rirekiArea.setSikyuryoData(this.sikyuryoDataOrgFiltered);
      this.$refs.sikyuryo.setData(this.sikyuryoDataOrgFiltered);
    },
    setKeikakuSoudanData() {
      this.keikakuSoudanDataOrgFiltered = this.keikakuSoudanDataOrg.filter(
        (value) => {
          if (value.jyukyuid === this.jyukyuid) {
            return value;
          }
        }
      );
      this.$refs.rirekiArea.setKeikakuSoudanData(
        this.keikakuSoudanDataOrgFiltered
      );
      this.$refs.keikaku.setData(this.keikakuSoudanDataOrgFiltered);
    },
    setRiyosyaFutanData() {
      this.riyosyaFutanDataOrgFiltered = this.riyosyaFutanDataOrg.filter(
        (value) => {
          if (value.jyukyuid === this.jyukyuid) {
            return value;
          }
        }
      );
      this.$refs.rirekiArea.setRiyosyaFutanData(
        this.riyosyaFutanDataOrgFiltered
      );
      this.$refs.futan.setData(this.riyosyaFutanDataOrgFiltered);
    },
    //履歴表示
    openRireki() {
      this.slideInRight.isOpen = true;
      // this.$refs.rirekiArea.setKihonData(this.kihonDataOrgFiltered);
      this.$refs.rirekiArea.setKihonData(this.kihonDataOrg);
      if (this.JyukyuSyogaiFukusiFlag) {
        this.$refs.rirekiArea.setSyogaiKubunData(
          this.syogaiKubunDataOrgFiltered
        );
        this.$refs.rirekiArea.setSikyuryoData(this.sikyuryoDataOrgFiltered);
        this.$refs.rirekiArea.setKeikakuSoudanData(
          this.keikakuSoudanDataOrgFiltered
        );
        this.$refs.rirekiArea.setRiyosyaFutanData(
          this.riyosyaFutanDataOrgFiltered
        );
      } else if (this.JyukyuSyogaiJiFlag) {
      } else if (this.JyukyuChiikiSoudanFlag) {
      }
    },
    //マスタダミーデータ
    getMstData() {
      this.shichosonList = [];
      this.shichosonList.push(
        { id: 1, code: '000001', name: '東経市' },
        { id: 2, code: '000002', name: '西経市' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' }
      );
      this.jigyosyoList = [];
      this.jigyosyoList.push(
        { id: 1, code: '000001', name: '東経入所' },
        { id: 2, code: '000002', name: '西経入所' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' }
      );
      //支給決定内容レイアウトマスタ
      this.getJyukyuTourokuSikyuryoLayoutData().then((value) => {
        this.sikyuryoLayoutList = value[0];
      });
    },
    goto_top() {
      var target = document.getElementById('mainArea');
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    move_to(item) {
      let id = item.target + String(item.id);
      this.menuBtnClick = true;
      this.goto_top();
      if (item == null) return;
      let name = id == 'JyukyuTourokuKihon21' ? 'mainArea' : item.target;
      var target = document.getElementById(name);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    /****************
     * 編集モード設定
     */
    setMode(pmode) {
      this.mode = pmode;
      this.$refs.kihon.setMode(pmode);
      if (this.JyukyuSyogaiFukusiFlag) {
        this.$refs.syogaiKubun.setMode(pmode);
        this.$refs.sikyuryo.setMode(pmode);
        this.$refs.keikaku.setMode(pmode);
        this.$refs.futan.setMode(pmode);
      } else if (this.JyukyuSyogaiJiFlag) {
      } else if (this.JyukyuChiikiSoudanFlag) {
      }
    },
    /****************
     * 入力補助モード設定
     */
    setHojoMode(phojomode) {
      this.hojomode = phojomode;
    },
    /****************
     * グリッド選択情報
     */
    setSubGridSelected(seleced) {
      this.subGridSelected = seleced;
      this.$refs.kihon.setSubGridSelectedFromParent(seleced);
      if (this.JyukyuSyogaiFukusiFlag) {
        this.$refs.syogaiKubun.setSubGridSelectedFromParent(seleced);
        this.$refs.sikyuryo.setSubGridSelectedFromParent(seleced);
        this.$refs.keikaku.setSubGridSelectedFromParent(seleced);
        this.$refs.futan.setSubGridSelectedFromParent(seleced);
      } else if (this.JyukyuSyogaiJiFlag) {
      } else if (this.JyukyuChiikiSoudanFlag) {
      }
    },
    /****************
     * 子コンポーネントで履歴表示からのデータ取得
     * args: 選択している行の値
     * code: 選択しているグリッドの種類
     */
    child_data(args, code) {
      if (args == null) return;
      let list = [];
      switch (code) {
        case 'kihon':
          this.kihonDataOrgFiltered = [];
          this.kihonDataOrgFiltered.push(args);
          this.$refs.kihon.setData(this.kihonDataOrgFiltered);
          this.jyukyuid = args.jyukyuid;
          if (this.JyukyuSyogaiFukusiFlag) {
            //障害支給区分
            this.setSyogaiKubunData();
            //支給決定内容
            this.setSikyuryoData();
            //計画相談
            this.setKeikakuSoudanData();
            //利用者負担
            this.setRiyosyaFutanData();
          } else if (this.JyukyuSyogaiJiFlag) {
          } else if (this.JyukyuChiikiSoudanFlag) {
          }
          this.move_to(this.menuitems[0]);
          break;
        case 'syogai':
          list.push(args);
          this.$refs.syogaiKubun.setData(list);
          this.move_to(this.menuitems[1]);
          break;
        case 'kettei':
          list.push(args);
          this.$refs.sikyuryo.setData(list);
          this.move_to(this.menuitems[2]);
          break;
        case 'keikaku':
          list.push(args);
          this.$refs.keikaku.setData(list);
          this.move_to(this.menuitems[3]);
          break;
        case 'futan':
          list.push(args);
          this.$refs.futan.setData(list);
          this.move_to(this.menuitems[4]);
          break;
        case 'shichoson':
          this.$refs.kihon.setShichoson(args.code, args.name);
          break;
        case 'kazoku':
          this.$refs.kihon.setSikyuketteisya(args.code, args.name);
          break;
        case 'jigyosyo':
          this.$refs.keikaku.setJigyosyo(args.code, args.name);
          break;
      }
    },
    onScroll(id) {
      this.mouseupCard(id);
      this.OnScrllFlag = true;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuTouroku2 {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px;

  #c-kihon {
    cursor: pointer;
  }

  #c-syogaiKubun {
    cursor: pointer;
  }

  #c-sikyuryo {
    cursor: pointer;
  }

  #c-keikaku {
    cursor: pointer;
  }

  #c-futan {
    cursor: pointer;
  }

  // スクロールバーの表示
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }

  //利用者一覧スライド
  .moveLeft {
    animation: slideLeftArea $seconds forwards;
  }
  .moveRight {
    animation: slideRightArea $seconds forwards;
  }
  @keyframes slideLeftArea {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-260px);
    }
  }
  @keyframes slideRightArea {
    from {
      transform: translateX(-260px);
    }
    to {
      transform: translateX(0);
    }
  }

  .container {
    padding: 4px;
    height: 100%;
  }
  .main-row {
    height: 100%;
    flex-wrap: nowrap;
  }

  .left-area {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }

  .center-area {
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
      height: calc(100% - 100px);
      // .center-area-input-menu {
      //   width: 65px;
      //   height: 100%;
      // }
      .center-area-input-main {
        // width: calc(100% - 65px);
        width: 100%;
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
        margin-left: 0px;
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
  width: fit-content;
  display: inline-block;
  position: relative;

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
.rireki {
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

.surface .rireki-body {
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
