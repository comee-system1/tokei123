<template>
  <div id="keikakuIdea">
    <v-container class="pa-0" fluid>
      <v-row no-gutters>
        <!-- <v-col class="mr-1" :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col> -->
        <v-col class="pr-1">
          <v-row no-gutters class="rowStyle_Dark pa-1 pl-1 mb-1">
            <v-tooltip bottom color="info">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="2"
                  class="mr-1"
                  height="19"
                  @click="userdrawerCliked"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon v-if="userdrawer" dense
                    >mdi-account-arrow-left-outline</v-icon
                  >
                  <v-icon v-else dense>mdi-account-arrow-right-outline</v-icon>
                  選択
                </v-btn>
              </template>
              <span>利用者選択欄の表示有無を切替えます</span>
            </v-tooltip>
            <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
              利用者名
            </v-card>
            <v-card
              class="koumokuData border mr-1 pa-0 pl-1"
              tile
              outlined
              width="250"
            >
              {{ userName }}
            </v-card>
            <v-spacer></v-spacer>
            <v-card class="koumokuTitle titleOrange" outlined tile>
              同意署名
            </v-card>
            <v-card
              class="lightYellow ml-1 body-2"
              width="140"
              height="20"
              outlined
              elevation="0"
              tile
            >
              {{ viewdata.msinm }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-card elevation="3" height="19" class="mr-1">
              <a class="addBtn" @click="addClick">新規作成</a>
            </v-card>
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
              作成日
            </v-card>
            <v-card
              class="mr-1"
              color="transparent"
              height="100%"
              style="border: none; margin-top: -1px"
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
                >{{ getymd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-card>

            <v-card
              class="koumokuTitle titleBlue pa-1 mr-1"
              width="100"
              outlined
              tile
            >
              計画区分
            </v-card>
            <select
              class="customSelectBox mr-1"
              v-model="keikakuKubunModel"
              style="width: 200px"
            >
              <option v-for="val in keikakuKubun" :key="val.id" :value="val.id">
                {{ val.name }}
              </option>
            </select>

            <v-card class="koumokuTitle titleOrange wMin" outlined tile>
              作成者
            </v-card>
            <v-card
              class="lightYellow ml-1 body-2"
              width="140"
              height="20"
              outlined
              elevation="0"
              tile
            >
              {{ viewdata.msinm }}
            </v-card>
            <v-card class="ml-auto" elevation="0">
              <v-btn small elevation="2" height="19" class="ml-1 body-2"
                >前回コピー</v-btn
              >
              <v-btn
                small
                elevation="2"
                height="19"
                class="ml-1 body-2"
                v-on:click.stop="drawer = !drawer"
                >履歴参照</v-btn
              >
              <v-navigation-drawer
                v-model="drawer"
                fixed
                temporary
                right
                hide-overlay
                :width="200"
                :min-width="200"
                style="font-size: 14px"
              >
                <v-list class="pa-0 ma-0" dense>
                  <v-card class="drawerTitle pa-1" outlined tile :height="30">
                    履歴参照
                    <v-btn
                      elevation="2"
                      icon
                      absolute
                      top
                      right
                      height="20"
                      width="20"
                      v-on:click.stop="drawer = !drawer"
                      class="mt-1"
                      color="secondary"
                    >
                      <v-icon dark small> mdi-close </v-icon></v-btn
                    >
                  </v-card>
                  <table style="width: 100%">
                    <tr>
                      <th width="50%" align="center">作成日</th>
                      <th width="50%" align="center">完了日</th>
                    </tr>
                  </table>
                  <v-divider />
                  <template v-for="item in rirekiList">
                    <v-list-item
                      class="pa-0 ma-0"
                      dense
                      :key="`first-${item.cntid}`"
                      @click="rirekiClicked(item)"
                    >
                      <v-list-item-content class="pa-0 ma-0">
                        <table style="width: 100%">
                          <tr>
                            <td width="50%" align="center">{{ item.mymdD }}</td>
                            <td width="50%" align="center">
                              {{ item.kanryoymdD }}
                            </td>
                          </tr>
                        </table>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`second-${item.cntid}`" />
                  </template>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-card class="koumokuTitle titleBlue fblue w120" outlined tile>
              障害者支援区分
            </v-card>
            <v-card
              class="lightYellow ml-1 mr-1 pl-1 body-2"
              width="75"
              height="20"
              outlined
              tile
            >
              {{ viewdata.shogaishienkbnnm }}
            </v-card>
            <v-card class="koumokuTitle titleBlue fblue wLng" outlined tile>
              障害者福祉ｻｰﾋﾞｽ受給者番号
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1 body-2"
              width="100"
              height="20"
              outlined
              tile
            >
              {{ viewdata.shogaijyukyuno }}
            </v-card>
            <v-card
              class="koumokuTitle titleBlue fblue wMdl ml-1"
              outlined
              tile
            >
              地域相談支援受給者番号
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1 body-2"
              width="100"
              height="20"
              outlined
              tile
            >
              {{ viewdata.chikijyukyuno }}
            </v-card>
            <v-card
              class="koumokuTitle titleBlue fblue wMdl ml-1"
              outlined
              tile
            >
              通所受給者証番号
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1 body-2"
              width="100"
              height="20"
              outlined
              tile
            >
              {{ viewdata.tsushojyukyuno }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-card class="koumokuTitle titleBlue fblue wMin" outlined tile>
              保護者
            </v-card>
            <v-card
              class="lightYellow ml-1 mr-1 pl-1 body-2"
              width="150"
              height="20"
              outlined
              tile
            >
              {{ viewdata.hogosha }}
            </v-card>
            <v-card class="koumokuTitle titleBlue fblue wMin" outlined tile>
              続柄
            </v-card>
            <v-card
              class="lightYellow ml-1 mr-1 pl-1 body-2"
              width="100"
              height="20"
              outlined
              tile
            >
              {{ viewdata.tsuzukigara }}
            </v-card>
            <v-card
              class="koumokuTitle titleBlue fblue w120 mr-1"
              outlined
              tile
            >
              モニタリング期間
            </v-card>
            <input
              type="text"
              class="border mr-1 wLong"
              v-model="viewdata.monikikan"
            />
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-col>
              <v-tabs
                v-model="inputTypemodel"
                class="mSizeCommonTab mb-1"
                color="rgba(255, 0, 0, 0)"
              >
                <v-tab
                  v-for="value in inputType"
                  :key="value.key"
                  active-class="act"
                  :href="'#tab-' + value.key"
                  elevation="2"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn-toggle
              tile
              v-if="inputTypemodel == 'tab-1'"
              style="height: 20px"
            >
              <v-btn height="20" elevation="2" @click="rowSort('view')"
                >順変更</v-btn
              >
              <v-btn height="20" elevation="2" @click="rowAdd('view')"
                >行追加</v-btn
              >
              <v-btn height="20" elevation="2" @click="rowDelete('view')"
                >行削除</v-btn
              >
            </v-btn-toggle>
          </v-row>
          <div class="scrollbody mb-1 pa-1">
            <keikakuideaIkou
              ref="childikou"
              :style="{ height: ikouHeight, 'max-height': ikouHeight }"
              v-show="inputTypemodel == 'tab-2' || inputTypemodel == 'tab-0'"
            ></keikakuideaIkou>
            <v-row
              class="rowStyle mt-1 mb-1 mr-1"
              v-if="inputTypemodel == 'tab-2'"
            >
              <v-spacer></v-spacer>
              <v-btn-toggle tile>
                <v-btn small height="20" elevation="2" @click="rowSort('view')"
                  >順変更</v-btn
                >
                <v-btn small height="20" elevation="2" @click="rowAdd('view')"
                  >行追加</v-btn
                >
                <v-btn
                  small
                  height="20"
                  elevation="2"
                  @click="rowDelete('view')"
                  >行削除</v-btn
                >
              </v-btn-toggle>
            </v-row>
            <keikakuideaKadai
              ref="childkadai"
              v-show="inputTypemodel == 'tab-2' || inputTypemodel == 'tab-1'"
              :style="{ height: kadaiHeight, 'max-height': kadaiHeight }"
            ></keikakuideaKadai>
          </div>
          <v-row no-gutters class="rowStyle">
            <v-btn small height="20" elevation="2" @click="ideaIkouKadaidelete"
              >削除</v-btn
            >
            <v-spacer></v-spacer>
            <v-card class="d-flex" height="20" flat tile>
              <v-card outlined tile class="koumokuTitle wMin titleOrange">
                完了
              </v-card>
              <v-card elevation="0" width="30" class="text-center">
                <input
                  type="checkbox"
                  v-model="viewdata.kanryoD"
                  @change="kanryoCheck()"
                  :disabled="userIntcode == 0"
                />
              </v-card>
              <v-card
                class="lightYellow pl-1 mr-1 body-2"
                width="100"
                height="20"
                outlined
                tile
              >
                {{ viewdata.kanryoymdD }}
              </v-card>
              <v-btn
                small
                height="20"
                elevation="2"
                @click="ideaIkouKadaiRegist"
                >登録</v-btn
              >
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->
    <dialog id="modeless_dialog">
      <v-card class="common_modeless_dialog pb-1">
        <v-card-title class="dialog_title mb-1"
          >{{ htmlMsg.noCreateTitle }}
        </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="modeless_dialogClose"
          class="dialog_close mt-1"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="pl-1">
          {{ htmlMsg.noCreate }}<br />{{ htmlMsg.needCreate }}
        </v-row>
      </v-card>
    </dialog>
    <v-dialog v-model="createflg" width="350" persistent>
      <v-card class="common_dialog pb-1">
        <v-card-title class="dialog_title mb-1"> 計画案 新規作成 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="createflg = false"
          class="dialog_close mt-2"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlueDark pa-1 ml-1 mr-1"
            outlined
            tile
            width="100"
          >
            利用者名
          </v-card>
          <v-card class="koumokuData pl-1" tile outlined width="200">
            {{ userName }}
          </v-card>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
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
              >{{ getymd }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>
          </v-card>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
            計画区分
          </v-card>
          <select
            class="customSelectBox hHigh mr-1"
            v-model="keikakuKubunModel"
            style="width: 200px"
          >
            <option v-for="val in keikakuKubun" :key="val.id" :value="val.id">
              {{ val.name }}
            </option>
          </select>
        </v-row>

        <v-row no-gutters class="rowStyle_Input">
          <v-spacer></v-spacer>
          <v-btn class="mr-1" height="25" @click="newRekiClicked()">
            新規作成
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="KeikakuListsDatepicker"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="kanryoInputflg" width="350" persistent>
      <v-card class="common_dialog pb-1">
        <v-card-title class="dialog_title mb-1"> 完了登録 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="kanryoClose()"
          class="dialog_close mt-2"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlueDark pa-1 ml-1 mr-1"
            outlined
            tile
            width="100"
          >
            利用者名
          </v-card>
          <v-card class="koumokuData pl-1" tile outlined width="200">
            {{ userName }}
          </v-card>
        </v-row>
        <v-row no-gutters class="rowStyle_Input mb-1">
          <v-card
            class="koumokuTitle titleBlue pa-1 ml-1 mr-1"
            width="100"
            outlined
            tile
          >
            完了日
          </v-card>
          <v-btn
            @click="inputCalendarClick(1)"
            tile
            outlined
            width="150px"
            height="100%"
            class="pa-0 mr-1"
            >{{ getYmdKanryo }}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>
        </v-row>

        <v-row no-gutters class="rowStyle_Input">
          <v-btn class="mr-1" height="25" @click="copyClicked()"> 削除 </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-1" height="25" @click="copyClicked()"> 登録 </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="datepickerKanryoYmd_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuIdeaDatepickerKanryo"
        type="date"
        v-model="pickerKanryo"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="daySelect()"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';

// import UserList from './UserList.vue';
import keikakuideaIkou from './KeikakuIdeaIkou.vue';
import keikakuideaKadai from './KeikakuideaKadai.vue';
import { getConnect } from '@connect/getConnect';
import { postConnect } from '@connect/postConnect';
import { putConnect } from '@connect/putConnect';
import { deleteConnect } from '@connect/deleteConnect';
import printUtil from '@/utiles/printUtil';
import messageConst from '@/utiles/MessageConst';

export default {
  props: {
    dispHideBar: Boolean,
    selectedUserObj: Object,
  },
  components: {
    // UserList,
    keikakuideaIkou,
    keikakuideaKadai,
  },
  data() {
    return {
      inputTypemodel: 'tab-2', // tab-0:意向・方針 tab-1:課題・支援
      inputType: [
        {
          key: 2,
          value: '全体',
        },
        {
          key: 0,
          value: '意向・方針',
        },
        {
          key: 1,
          value: '課題・支援',
        },
      ],

      leftWidth: '280px',
      rightWidth: '1040px',
      moveLeft: true,
      datepicker_dialog: false,
      kanryoInputflg: false,
      datepickerKanryoYmd_dialog: false,
      picker: dayjs().format('YYYY-MM-DD'),
      pickerKanryo: dayjs().format('YYYY-MM-DD'),
      keikakuKubun: [
        { id: 2, name: '障害児支援計画（案）' },
        { id: 1, name: 'サービス等支援計画（案）' },
      ],
      keikakuKubunModel: 1,
      userIntcode: 0,
      userName: '',
      headerheight: 80,
      headerheightbody: 240,
      userdrawer: true,
      viewdata: {},
      drawer: false,
      rirekiList: [],
      createflg: false,
      formChanged: true,
      htmlMsg: {
        noCreateTitle: '計画案未作成',
        noCreate: '計画案' + messageConst.WARN.NO_CREATE,
        needCreate: '新規作成ボタンから作成してください。',
      },
    };
  },
  created() {},
  mounted() {
    this.setUserdata(this.selectedUserObj);
    // 他サイト、ブラウザ終了時の確認
    window.addEventListener('beforeunload', this.confirmSave);
    // リサイズイベント
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    // 印刷イベントの登録
    this.$router.app.$off('print_event_global');
    this.$router.app.$on('print_event_global', this.printExec);
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
    window.removeEventListener('beforeunload', this.confirmSave);
  },
  computed: {
    getymd() {
      if (!dayjs(this.picker, 'YYYY/MM/DD').isValid()) {
        return dayjs().format('YYYY年MM月DD日');
      } else {
        return dayjs(this.picker).format('YYYY年MM月DD日');
      }
    },
    getYmdKanryo() {
      if (!dayjs(this.pickerKanryo, 'YYYY/MM/DD').isValid()) {
        return dayjs().format('YYYY年MM月DD日');
      } else {
        return dayjs(this.pickerKanryo).format('YYYY年MM月DD日');
      }
    },

    ikouHeight() {
      if (this.inputTypemodel == 'tab-0') {
        return '100%';
      } else {
        return '40%';
      }
    },
    kadaiHeight() {
      if (this.inputTypemodel == 'tab-1') {
        return '100%';
      } else {
        return '53%';
      }
    },
  },
  methods: {
    confirmSave(event) {
      // 他サイト、ブラウザ終了時の確認
      if (this.formChanged) {
        // メッセージの変更は不可とのこと
        event.returnValue = '編集中のものは保存されませんが、よろしいですか？';
      }
    },
    calculateWindowHeight() {
      if (document.getElementById('keikakuIdea') != null) {
        document.getElementById('keikakuIdea').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
      if (
        document.getElementsByClassName('scrollbody') != null &&
        document.getElementsByClassName('scrollbody')[0] != null
      ) {
        document.getElementsByClassName('scrollbody')[0].style.height =
          window.innerHeight - this.headerheightbody + 'px';
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserdata(item) {
      if (item != null && item.riid != undefined) {
        this.userIntcode = item.riid;
        this.userName = item.names;
        this.setSaisin();
        this.setRireki();
      }
    },
    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '1040px';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '1040px';
      }
    },
    inputCalendarClick(kbn) {
      if (kbn == 0) {
        this.picker = dayjs().format('YYYY-MM-DD');
        this.datepicker_dialog = true;
      } else {
        this.pickerKanryo = dayjs().format('YYYY-MM-DD');
        this.datepickerKanryoYmd_dialog = true;
      }
    },
    monthSelect() {
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },
    daySelect() {
      this.getYmdKanryo = dayjs(this.pickerKanryor);
      this.datepickerKanryoYmd_dialog = false;
    },
    rowSort(type) {
      this.$refs.childkadai.rowSort(type);
    },
    rowAdd(type) {
      this.$refs.childkadai.rowAdd(type);
    },
    rowDelete(type) {
      this.$refs.childkadai.rowDelete(type);
    },

    ideaIkouKadaiRegist() {
      this.putKeikakuan();
    },

    putKeikakuan() {
      let params = {
        uniqid: 3,
        traceid: 123,
      };

      let inputParams = {
        entpriid: 62,
        intcode: this.userIntcode,
        cntid: this.viewdata.cntid,
        mymd: dayjs(this.picker).format('YYYYMMDD'),
        // krekiymd: this.viewdata.krekiymd,
        mcnt: this.viewdata.mcnt,
        yoshiki: this.keikakuKubunModel,
        monikikan: this.viewdata.monikikan,
        monijisshiym: null, //横浜市様式のみで使用
        shogaikbn: 0, //千葉県様式のみで使用
        servicesymd: null, //東大和市様式のみで使用
        hindo: 0, //大阪市様式のみで使用
        techosyurui: 0, //練馬区様式のみで使用
        techosyuruinm: null, //練馬区様式のみで使用
        techotokyu: 0, //練馬区様式のみで使用
        techotokyunm: null, //練馬区様式のみで使用
        shokaikasan: 0, //利用計画のみで使用
        mensetsu: null, //大阪市様式のみで使用 *計画案のみで使用
        tankaiymd: null, //大阪市様式のみで使用 *利用計画のみで使用
        tankai: null, //大阪市様式のみで使用 *利用計画のみで使用
        iko: this.$refs.childikou.getValue(0),
        hoshin: this.$refs.childikou.getValue(1),
        chokimokuhyo: this.$refs.childikou.getValue(2),
        tankimokuhyo: this.$refs.childikou.getValue(3),
        keikakudetail: this.$refs.childkadai.getViewData(),
        biko: null, //千葉県様式のみで使用
        tantoiken: null, //練馬区様式のみで使用
      };
      if (confirm(messageConst.CONFIRM.PUT)) {
        putConnect('/Keikakuan', params, 'SIENP', inputParams).then(
          (result) => {
            if (result.okflg == true) {
              //this.setUserdata(this.selectedUserObj);
            } else {
              alert(result.msg);
            }
          }
        );
      }
    },
    ideaIkouKadaidelete() {
      if (this.userIntcode == 0) {
        alert('削除対象データ' + messageConst.INPUT_ERROR.NO_SELECT);
        return;
      }
      if (confirm(messageConst.CONFIRM.DELETE)) {
        let params = {
          uniqid: 3,
          traceid: 123,
          jigyoid: 62,
          intcode: this.userIntcode,
          cntid: this.viewdata.cntid,
        };
        deleteConnect('/Keikakuan', params, 'SIENP').then((result) => {
          if (result.okflg) {
            this.setSaisin();
            this.setRireki();
          } else {
            alert(result.msg);
          }
        });
      }
    },
    userdrawerCliked() {
      this.userdrawer = !this.userdrawer;
      let doc = document.getElementById('keikakuIdea');
      if (this.userdrawer) {
        doc.style.minWidth = '1040px';
        doc.style.maxWidth = '1040px';
        doc.style.width = '1040px';
      } else {
        doc.style.minWidth = '1320px';
        doc.style.maxWidth = '1320px';
        doc.style.width = '1320px';
      }
      this.$emit('userDispChange', this.userdrawer);
      this.$refs.childkadai.grdRefresh(this.userdrawer);
      this.$refs.childikou.grdRefresh(this.userdrawer);
      // this.mainGrid.refresh();
      // this.mainGrid.autoSizeRows();
    },
    setDataFromKeikauList(anItem) {
      this.userIntcode = anItem.intcode;
      this.userName = anItem.rname;
      this.setSaisin();
      this.setRireki();
    },
    setRireki() {
      let params = {
        uniqid: 3,
        traceid: 123,
        jigyoid: 62,
        intcode: this.userIntcode,
      };
      getConnect('/KeikakuanReki', params, 'SIENP')
        .then((result) => {
          this.rirekiList = result;
          if (this.rirekiList.length == 0) {
            this.modeless_dialogOpen();
          } else {
            this.modeless_dialogClose();
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },
    setSaisin() {
      let params = {
        uniqid: 3,
        traceid: 123,
        keitype: 0,
        jigyoid: 62,
        intcode: this.userIntcode,
      };
      getConnect('/KeikakuanSaishinReki', params, 'SIENP')
        .then((result) => {
          console.log(result);
          this.viewdata = result;
          this.setViewdata();
        })
        .catch(function (error) {
          alert(error);
        });
    },
    setViewdata() {
      if (this.viewdata.intcode != undefined) {
        this.picker =
          this.viewdata.mymd.slice(0, 4) +
          '-' +
          this.viewdata.mymd.slice(4, 6) +
          '-' +
          this.viewdata.mymd.substring(6, 8);

        if (this.viewdata.kanryoymd.length == 8) {
          this.pickerKanryo =
            this.viewdata.kanryoymd.slice(0, 4) +
            '-' +
            this.viewdata.kanryoymd.slice(4, 6) +
            '-' +
            this.viewdata.kanryoymd.substring(6, 8);
        } else {
          this.pickerKanryo = dayjs().format('YYYY-MM-DD');
        }
        this.viewdata.kanryoD = this.viewdata.kanryo;
      }
      this.$refs.childikou.setViewData(this.viewdata);
      this.$refs.childkadai.setViewData(this.viewdata);
    },
    rirekiClicked(item) {
      let params = {
        uniqid: 3,
        traceid: 123,
        keitype: 0,
        jigyoid: 62,
        intcode: this.userIntcode,
        cntid: item.cntid,
      };
      getConnect('/Keikakuan', params, 'SIENP')
        .then((result) => {
          this.viewdata = result;
          this.setViewdata();
        })
        .catch(function (error) {
          alert(error);
        });
    },
    printExec() {
      this.inputTypemodel = 'tab-2';
      let grd1 = this.$refs.childikou.getGrid();
      let grd2 = this.$refs.childkadai.getGrid();

      grd2.columns[8].visible = false;
      printUtil.setGridList([grd1, grd2]);
      // printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '作成日：' + this.getymd;
      let sub2 =
        '障害者支援区分:区分5 ' +
        'モニタリング期間：' +
        this.viewdata.monikikan;
      let sub3 =
        '障害者福祉ｻｰﾋﾞｽ受給者番号:1100011120 ' +
        '地域相談支援受給者番号:1100011120 ' +
        '通所受給者証番号:1100011120';

      printUtil.setSubTitleList([sub1, sub2, sub3]);
      printUtil.printExec('計画案', printUtil.DIRECTION.landscape, true);
      grd2.columns[8].visible = true;
    },
    modeless_dialogOpen() {
      let popup = document.getElementById('modeless_dialog');
      popup.show();
    },
    modeless_dialogClose() {
      let popup = document.getElementById('modeless_dialog');
      popup.close();
    },
    addClick() {
      this.createflg = true;
    },
    newRekiClicked() {
      if (!dayjs(this.picker, 'YYYY/MM/DD').isValid()) {
        this.picker = dayjs().format('YYYY-MM-DD');
      }
      let ymd = dayjs(this.picker).format('YYYYMMDD');
      if (confirm(messageConst.CONFIRM.ADD_RIREKI)) {
        let params = {
          uniqid: 3,
          traceid: 123,
          keitype: 0,
        };

        let inputParams = {
          entpriid: 62,
          intcode: this.userIntcode,
          mymd: ymd,
          msiid: 1,
          mcnt: 0,
          kanryo: 0,
          syomeikbn: 0,
          syomeisiid: 0,
          doui: 0,
          sinseikbn: 0,
        };
        postConnect('/KeikakuanReki', params, 'SIENP', inputParams)
          .then(() => {
            this.setUserdata(this.selectedUserObj);
            this.createflg = false;
          })
          .catch(function (error) {
            alert(error);
          });
      }
    },
    kanryoCheck() {
      this.kanryoInputflg = true;
    },
    kanryoClose() {
      this.viewdata.kanryoD = this.viewdata.kanryo;
      this.kanryoInputflg = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuIdea {
  font-size: $default_fontsize;
  color: $font_color;
  min-width: 1040px !important;
  max-width: 1040px;
  // height: var(--height);
  width: auto;

  .lightYellow {
    background-color: $view_Data_Read_background;
  }
  .wLong {
    width: 448px;
  }
  .scrollbody {
    border: 1px solid;
    border-color: $light-gray;
    overflow: hidden;
    min-height: 400px;
    // height: var(--heightbody);
    // scrollbar-width: none;
    // -ms-overflow-style: none;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
  }
  .v-tabs-bar {
    border-radius: inherit;
    height: 20px;
  }
}

#KeikakuListsDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
#keikakuIdeaDatepickerKanryo {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 330px;
  left: 600px;
  width: 300px;
  max-width: 300px;
}
</style>
