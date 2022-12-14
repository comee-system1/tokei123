<template>
  <div id="tantokaigi">
    <v-container class="pa-1" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }" class="pb-1">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            :headerheight="60"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }" class="pl-1">
          <v-row no-gutters class="rowStyle_Dark tall mb-1 body-2">
            <v-col class="d-flex pa-1">
              <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="pl-1 lightYellow"
                width="300"
                height="24"
              >
                {{ userName }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 body-2">
            <v-card class="koumokuTitle titleMain wMin mr-1" outlined tile>
              入力
            </v-card>
            <v-btn-toggle color="light-blue darken-4">
              <v-btn
                elevation="2"
                outlined
                width="25"
                height="19"
                class="body-2"
                @click="getPostData()"
                >新規</v-btn
              >
              <v-btn
                elevation="2"
                outlined
                width="25"
                height="19"
                class="body-2 mr-1"
                >修正</v-btn
              >
            </v-btn-toggle>
            <v-card class="koumokuTitle titleMain wMin mr-1" outlined tile>
              対象
            </v-card>
            <v-btn-toggle color="light-blue darken-4">
              <v-btn
                elevation="2"
                outlined
                width="50"
                height="19"
                class="body-2"
                >計画案</v-btn
              >
              <v-btn
                elevation="2"
                outlined
                width="100"
                height="19"
                class="body-2"
                >モニタリング</v-btn
              >
              <v-btn
                elevation="2"
                outlined
                width="50"
                height="19"
                class="body-2"
                >その他</v-btn
              >
            </v-btn-toggle>
            <v-card class="koumokuTitle titleMain ml-1" outlined tile>
              計画案作成日
            </v-card>
            <v-card
              class="pl-1 ml-1"
              width="140"
              height="20"
              outlined
              tile
              @click="inputCalendarClick(0)"
            >
              {{ getYmd }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
            <v-btn elevation="2" height="19" class="ml-1 body-2"
              >案履歴参照</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn elevation="2" class="mr-1" height="19"> 前回ｺﾋﾟｰ </v-btn>
            <v-btn
              elevation="2"
              class="mr-1"
              height="19"
              @click.stop="drawer = !drawer"
            >
              履歴参照
            </v-btn>
            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              right
              style="width: 60%"
            >
              <div class="rirekiTitle pa-2">
                <label>履歴参照</label>
                <v-btn
                  elevation="2"
                  icon
                  x-small
                  class="rirekiClose"
                  @click="rirekiClose()"
                  ><v-icon dark x-small> mdi-close</v-icon></v-btn
                >
              </div>
              <wj-flex-grid
                id="rirekiSansyoGrid"
                class="mt-1"
                :initialized="onInitializedRireki"
                :itemsSource="rirekiView"
                :itemsSourceChanged="onInitializedChangedRireki"
                :selectionMode="'Row'"
                :headersVisibility="'Column'"
                :alternatingRowStep="0"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :allowMerging="'Cells'"
                :isReadOnly="true"
                :showBandedRows="false"
              >
                <wj-flex-grid-column
                  :header="'作成日'"
                  binding="mkYmd"
                  valign="middle"
                  align="center"
                  width="1*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  :header="'開催日'"
                  binding="opnYmd"
                  valign="middle"
                  align="center"
                  width="1*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  :header="'完了チェック'"
                  binding="kanryoChk"
                  valign="middle"
                  align="center"
                  width="1*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  :header="'完了チェック日'"
                  binding="kanryoYmd"
                  valign="middle"
                  align="center"
                  width="1*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  :header="'担当職員'"
                  binding="siName"
                  valign="middle"
                  align="center"
                  width="1*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-navigation-drawer>
          </v-row>
          <v-card outlined tile class="pa-1" style="background: #edfcfd">
            <v-row no-gutters class="rowStyle mb-1 body-2">
              <v-card class="koumokuTitle titleBlue mr-1" outlined tile>
                作成日
              </v-card>
              <v-card
                width="140"
                height="20"
                outlined
                tile
                @click="inputCalendarClick(1)"
                class="mr-1"
              >
                {{ mkYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card class="koumokuTitle titleBlue mr-1" outlined tile>
                開催日
              </v-card>
              <v-card
                width="140"
                height="20"
                outlined
                tile
                @click="inputCalendarClick(2)"
                class="mr-1"
              >
                {{ opnYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card class="koumokuTitle titleBlue mr-1" outlined tile>
                開催時間
              </v-card>
              <v-card elevation="0" tile style="background: transparent">
                <input type="time" v-model="sTime" class="input_text outline" />
                ～
                <input type="time" v-model="eTime" class="input_text outline" />
              </v-card>

              <v-btn elevation="2" class="ml-auto body-2" height="20"
                >開催情報最終表示</v-btn
              >

              <v-btn
                elevation="2"
                height="20"
                class="ml-2"
                @click="dispalyChange"
                >{{ display }}</v-btn
              >
            </v-row>
            <v-row no-gutters class="rowStyle mb-1 body-2">
              <v-card class="koumokuTitle titleBlue mr-1" outlined tile>
                開催場所
              </v-card>
              <input
                v-model="basho"
                type="text"
                class="input_text pa-1 wflex"
              />
            </v-row>
            <v-layout no-gutters class="mt-1 mr-1" v-show="onDisplayFlag">
              <v-card
                elevation="0"
                tile
                small
                width="100"
                height="20"
                class="mr-1"
              >
                <v-card class="koumokuTitle titleBlue mr-1" outlined tile>
                  出席者
                </v-card>
                <v-btn
                  elevation="2"
                  class="mt-10 body-2"
                  @click="onSelectedAttend"
                  height="20"
                  width="100"
                  >出席者選択</v-btn
                >
              </v-card>
              <v-card elevation="0" width="910" style="background: transparent">
                <wj-flex-grid
                  id="tantoKaigiGrid"
                  :initialized="onInitialized"
                  :itemsSource="tantoKaigiViewData"
                  :autoClipboard="false"
                  :selectionMode="'1'"
                  :headersVisibility="'0'"
                  :allowAddNew="false"
                  :allowDelete="false"
                  :allowDragging="false"
                  :allowPinning="false"
                  :allowResizing="false"
                  :allowSorting="false"
                  :alternatingRowStep="0"
                >
                  <wj-flex-grid-column
                    header="職種"
                    binding="syokusyu"
                    align="center"
                    valign="middle"
                    width="2*"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                  <wj-flex-grid-column
                    header="氏名"
                    binding="name"
                    align="center"
                    valign="middle"
                    width="2*"
                    :isReadOnly="true"
                  ></wj-flex-grid-column>
                </wj-flex-grid>
              </v-card>
            </v-layout>
          </v-card>

          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle titleMain wMin mr-1" outlined tile>
              参照
            </v-card>
            <v-btn-toggle color="light-blue darken-4">
              <v-btn elevation="2" outlined height="19" class="body-2"
                >利用計画案</v-btn
              >
              <v-btn elevation="2" outlined height="19" class="body-2"
                >モニタリング</v-btn
              >
            </v-btn-toggle>
            <v-spacer></v-spacer>
            <v-card class="koumokuTitle titleMain wMin mr-1" outlined tile>
              編集
            </v-card>
            <v-btn-toggle color="light-blue darken-4">
              <v-btn elevation="2" outlined height="19" class="body-2">
                行追加
              </v-btn>
              <v-btn elevation="2" outlined height="19" class="body-2">
                行削除
              </v-btn>
              <v-btn elevation="2" outlined height="19" class="body-2">
                順変更
              </v-btn>
            </v-btn-toggle>
          </v-row>
          <div class="scrollbody mt-1">
            <div>
              <wj-flex-grid
                id="considerGrid"
                :initialized="onInitializedConsider"
                :itemsSource="considerView"
                :imeEnabled="true"
                :selectionMode="'Cell'"
                :headersVisibility="'Column'"
                :autoRowHeights="true"
                :allowResizing="false"
                :allowDragging="false"
                :allowSorting="false"
                :allowAddNew="false"
                :allowDelete="false"
                :allowPinning="false"
                :alternatingRowStep="0"
                :showMarquee="true"
              >
                <wj-flex-grid-column
                  header="No"
                  binding="cnt"
                  align="right"
                  valign="middle"
                  :width="40"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  header="検討した項目"
                  binding="kentoKmk"
                  valign="middle"
                  width="1*"
                  :wordWrap="true"
                  :multiLine="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  header="検討内容"
                  binding="kentoNaiyo"
                  valign="middle"
                  width="1*"
                  :wordWrap="true"
                  :multiLine="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  header="結論"
                  binding="ketsuron"
                  valign="middle"
                  width="1*"
                  :wordWrap="true"
                  :multiLine="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </div>
            <div>
              <v-card elevation="0" class="text-center ml-auto d-flex flex-row">
                <v-card
                  elevation="0"
                  tile
                  small
                  width="100"
                  height="104"
                  class="text-center pt-10 titleMain"
                >
                  残された課題
                </v-card>
                <v-card elevation="0" width="100%" class="ml-1 mt-n1">
                  <v-textarea
                    v-model="kadai"
                    class="inputarea pa-0 pt-1"
                    outlined
                    auto-grow
                    hide-details
                    row-height="20"
                    style="height: 96px"
                  >
                    {{ kadai }}
                  </v-textarea>
                </v-card>
              </v-card>
            </div>
          </div>
          <v-card class="d-flex flex-row mt-1" flat>
            <v-btn elevation="2" height="19" class="mr-10">クリア</v-btn>
            <v-btn elevation="2" height="19">削除</v-btn>
            <v-spacer></v-spacer>
            <v-btn elevation="2" height="19" @click="putTantokaigi()"
              >登録</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 日付 -->
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

    <!-- 出席者選択ダイアログ -->
    <v-dialog v-model="attend_dialog" width="850" persistent no-click-animation>
      <v-card class="common_dialog">
        <v-card-title class="dialog_title"> 会議出席者 選択 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="closeBtn"
          class="mt-1 dialog_close"
          ><v-icon dark small> mdi-close </v-icon>
        </v-btn>
        <v-row no-gutters id="dialog_scroll" height="1000">
          <v-col cols="6" class="pa-1">
            <v-row class="ml-1 mb-1" no-gutters>
              <!-- ラベル -->
              <v-card class="koumokuTitle titleMain wMin ht-min" outlined tile
                >編集</v-card
              >
              <v-btn class="func_btn ht_min ml-1" @click="editSortSetted" small
                >順変更</v-btn
              >
              <v-btn
                class="func_btn ht_min ml-1"
                @click="rowDelete()"
                :disabled="rowDeleteDisabled"
                small
                >行削除</v-btn
              >

              <v-btn
                small
                class="func_btn ht_min ml-1"
                @click="allDelete"
                :disabled="allDeleteDisabled"
                >全削除</v-btn
              >
            </v-row>
            <wj-flex-grid
              id="selectedAttendGrid"
              :alternatingRowStep="0"
              :allowAddNew="false"
              :allowDelete="false"
              :allowDragging="false"
              :allowPinning="false"
              :allowResizing="false"
              :allowSorting="false"
              :showMarquee="true"
              :selectionMode="'Row'"
              :headersVisibility="'Column'"
              :initialized="onInitializedSelected"
              :itemsSource="selectedAttendView"
              :itemsSourceChanged="onInitializedSelectedChanged"
            >
              <wj-flex-grid-column
                header="No"
                binding="num"
                align="center"
                valign="middle"
                :width="40"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="職種"
                binding="syokusyu"
                align="center"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="氏名"
                binding="name"
                align="center"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>

            <v-row no-gutters class="mt-1 pa-1">
              <v-col>
                <v-btn
                  class="func_btn"
                  small
                  v-show="showDisplay == true"
                  @click="JunKettei()"
                >
                  順決定
                </v-btn>
              </v-col>
              <v-col class="text-end">
                <v-btn
                  class="func_btn ht_min"
                  small
                  :disabled="registDisabled"
                  @click="registSelect"
                >
                  設定
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="6">
            <div class="dialog_back mb-2 pa-1 mt-1 mr-1">
              <v-row no-gutters class="mb-1">
                <v-card class="koumokuTitle titleBlue" height="25" outlined tile
                  >事業所</v-card
                >
                <select
                  class="customSelectBox hHigh wLong ml-1"
                  v-model="selJigyosyo"
                  @change="onJigyosyoClicked"
                >
                  <option
                    v-for="val in jigyosyoList"
                    :key="val.val"
                    :value="val.val"
                  >
                    {{ val.jigyosyo }}
                  </option>
                </select>
              </v-row>
              <v-row no-gutters class="mb-1">
                <v-card class="koumokuTitle titleBlue" outlined tile height="25"
                  >職種指定</v-card
                >
                <select
                  class="customSelectBox hHigh wLong ml-1"
                  v-model="selSyokusyu"
                  @change="onSyokusyuClicked"
                >
                  <option
                    v-for="val in syokusyuList"
                    :key="val.val"
                    :value="val.val"
                  >
                    {{ val.syokusyu }}
                  </option>
                </select>
              </v-row>

              <alphabet-button
                class="mt-1"
                ref="alp"
                @onAlphabetical="onAlphabetical"
              ></alphabet-button>
              <wj-flex-grid
                id="attendGrid"
                class="mt-1"
                :initialized="onInitializedAttend"
                :itemsSource="attendSelect"
                :itemsSourceChanged="onInitializedAttendChanged"
                :allowAddNew="false"
                :allowDragging="false"
                :allowPinning="false"
                :allowResizing="false"
                :allowSorting="false"
                :selectionMode="'Row'"
                :headersVisibility="'Column'"
                :autoRowHeights="true"
              >
                <wj-flex-grid-column
                  header="コード"
                  binding="code"
                  align="center"
                  valign="middle"
                  width="1*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  header="職種"
                  binding="syokusyu"
                  align="center"
                  valign="middle"
                  width="2*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  header="氏名"
                  binding="name"
                  align="center"
                  valign="middle"
                  width="2*"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>

              <v-row class="mt-1 mb-1" no-gutters>
                <v-btn
                  @click="inputAddBtn()"
                  class="mt-3 func_btn"
                  small
                  :disabled="addBtn"
                >
                  <v-icon left> mdi-arrow-left </v-icon>追加
                </v-btn>

                <v-card class="titleMain ml-2 pt-4 wd-60" outlined tile
                  >手入力</v-card
                >
                <v-card class="ml-1 dialog_label_none" elevation="0">
                  <v-row no-gutters class="mb-1">
                    <v-card
                      outlined
                      tile
                      elevation="0"
                      height="25"
                      class="koumokuTitle titleBlue wd-65"
                    >
                      職種
                    </v-card>
                    <input
                      type="text"
                      class="dialog_text_field ml-1"
                      v-model="inputSyokusyu"
                      @keyup="inputData()"
                      :disabled="inputSyokusyuDisabled"
                    />
                  </v-row>
                  <v-row no-gutters>
                    <v-card
                      outlined
                      tile
                      elevation="0"
                      height="25"
                      class="koumokuTitle titleBlue pt-1 wd-65"
                    >
                      氏名
                    </v-card>
                    <input
                      type="text"
                      class="dialog_text_field ml-1"
                      v-model="inputName"
                      @keyup="inputData()"
                      :disabled="inputNameDisabled"
                    />
                  </v-row>
                </v-card>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import UserList from '../../components/UserList.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import sysConst from '@/utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getConnect } from '../../connect/getConnect';
import { postConnect } from '../../connect/postConnect';
import { putConnect } from '../../connect/putConnect';
// import func from 'vue-editor-bridge';
// import { connect } from 'http2';
//import { filter } from 'vue/types/umd';
const maxRowCnt = 15; // 最大15行
const columnSize = 154; // セルの幅調整

export default {
  components: {
    UserList,
    AlphabetButton,
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  data: function () {
    return {
      // 実装用のデフォルトデータ
      attendSelectDefault: [],
      leftWidth: '280px',
      rightWidth: '1040px',
      calendarType: 0,
      picker: '',
      considerView: [],
      display: '↑縮小',
      open: false,

      // APIデータ取得
      userName: '',
      intCode: 0,
      basho: '',
      sTime: '',
      eTime: '',
      kadai: '',
      shussekiList: '',
      naiyoGyoList: '',
      cntID: 0,
      kaigiKbn: 0,
      annCntID: 0,
      moniCntID: 0,

      getYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      mkYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      opnYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      // ダイアログ
      attendView: [],
      attendSelect: [],
      flexGridSelected: [],
      flexGridAttendView: [],
      flexGridAttend: [],
      tantoKaigiViewData: [],
      selectedAttendView: [],
      rowNum: 0,
      rirekiView: [],
      drawer: null,

      // 事業所セレクト
      selJigyosyo: 0,
      selJgyoshoval: '',
      jigyosyoList: [
        { val: 0, jigyosyo: '指定なし' },
        { val: 1, jigyosyo: 'とうけい相談支援事業所１' },
        { val: 2, jigyosyo: 'とうけい相談支援事業所２' },
      ],
      // 職種セレクト
      selSyokusyu: 0,
      selSyokusyuval: '',
      syokusyuList: [
        { val: 0, syokusyu: '指定なし' },
        { val: 1, syokusyu: '相談支援専門員' },
        { val: 2, syokusyu: 'その他' },
      ],

      // フラグ設定
      datepicker_dialog: false,
      showDisplay: false,
      onDisplayFlag: true,
      offDisplayFlag: false,
      attend_dialog: false,
      allDeleteDisabled: false,
      registDisabled: false,
      addBtn: true,
      inputSyokusyu: '',
      inputName: '',
      allowDeleteRow: false,
      rowDeleteDisabled: false,
      clickedRow: false,
      // 手入力欄
      inputSyokusyuDisabled: false,
      inputNameDisabled: false,
      closeCheckConfirmFlg: false,
      selectedAttendList: [],
    };
  },

  methods: {
    calculateWindowHeight() {
      if (
        document.getElementsByClassName('scrollbody') != null &&
        document.getElementsByClassName('scrollbody')[0] != null
      ) {
        document.getElementsByClassName('scrollbody')[0].style.height =
          window.innerHeight - 340 + 'px';
      }
      if (document.getElementById('dialog_scroll') != null) {
        document.getElementById('dialog_scroll').style.height =
          window.innerHeight / 1.5 + 'px';
        // document.getElementById('dialog_scroll').style.minHeight = 'auto';
      }
    },
    /*****************************
     * ユーザリスト
     ****************************/
    //利用者名 出力
    setUserSelectPoint(row) {
      if (this.userName && this.userName != row.names) {
        this.dataClear();
      }
      this.userName = row.names;
      this.intCode = row.riid;
      this.getTantoReki();
    },
    dataClear() {
      this.getYmd = dayjs().format('YYYY年MM月DD日');
      this.mkYmd = dayjs().format('YYYY年MM月DD日');
      this.opnYmd = dayjs().format('YYYY年MM月DD日');
      this.sTime = '';
      this.eTime = '';
      this.basho = '';
      this.kadai = '';

      // 出席者一覧
      for (let i = 0; i < 6; i++) {
        for (let r = 0; r < 5; r++) {
          this.flexGridAttendView.setCellData(r, i, '', false, true);
        }
      }
      // 検討項目/内容/結論
      let consider = [];
      consider.push({
        no: 1,
        kentoKmk: '',
        kentoNaiyo: '',
        ketsuron: '',
      });
      this.considerView = consider;

      // 会議出席者選択のgrid
      let attendees = [];
      for (let i = 0; i < 15; i++) {
        attendees.push({
          num: i + 1,
          syokusyu: '',
          name: '',
        });
      }
      this.selectedAttendList = attendees;
      this.selectedAttendView = this.selectedAttendList;
      this.rowNum = 0;
    },

    /*****************************
     * 履歴参照
     *****************************/
    rirekiClose() {
      this.drawer = false;
    },
    onInitializedChangedRireki(flexGrid) {
      flexGrid.select(-1, -1);
    },
    onInitializedRireki(flexGrid) {
      // 空grid作成
      let tmp = [];
      tmp.push({
        mkYmd: '',
        opnYmd: '',
        kanryoChk: '',
        kanryoYmd: '',
        siName: '',
      });
      this.rirekiView = tmp;

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          // 参照する履歴を選択するためのtmp
          let tmp = flexGrid.cells.rows[ht.row].dataItem;
          // ユーザのユニークIDとcntIDを元に担当会議データを取得
          _self.cntID = tmp.cntID;

          // 担当会議のデータを取得
          _self.setViewData();
        }
      });
    },

    /*****************************
     * #considerGrid
     * 検討した項目・検討内容・結論
     *****************************/
    onInitializedConsider(flexGrid) {
      // Grid 初期表示;
      flexGrid.select(-1, -1);
      let consider = [];
      // Grid作成
      consider.push({
        no: 1,
        kentoKmk: '',
        kentoNaiyo: '',
        ketsuron: '',
      });
      this.considerView = consider;

      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          // 完全編集モードへ移行
          flexGrid.startEditing(true);
          flexGrid.imeEnabled = true;
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells && e.col >= 1) {
          e.cell.style.textAlign = 'left';
          e.cell.style.justifyContent = 'left';
          e.cell.style.alignItems = 'left';
          e.cell.style.paddingRight = '90px';
        }
        if (e.panel == flexGrid.columnHeaders) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
      });
    },

    /******************************
     * ダイアログ表示 出席者選択
     ******************************/
    onSelectedAttend() {
      this.attend_dialog = true;
    },

    /***********************
     * #TantokaigiGrid
     ***********************/
    onInitialized(flexGrid) {
      // 選択解除
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // 出席者データ
      this.flexGridAttendView = flexGrid;

      // Gridの生成
      this.setAttendViewData();

      // セルの幅調整
      flexGrid.columns.defaultSize = columnSize;
      // セルのデザイン修正
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        let s = cell.style;
        if (panel.cellType == wjGrid.CellType.Cell) {
          // grid縦線
          if (c == 0 || c == 2 || c == 4) {
            s.borderRight = '1px solid #ccc';
          }
          if (c == 1 || c == 3) {
            s.borderRight = '3px solid #ccc';
          }
        }
        s.textAlign = 'left';
      };
    },

    /******************************
     * 順変更ボタン
     *****************************/
    editSortSetted() {
      // ボタンの活性・非活性
      this.showDisplay = true;
      this.rowDeleteDisabled = true;
      this.allDeleteDisabled = true;
      this.inputSyokusyuDisabled = true;
      this.inputNameDisabled = true;

      // Numを空に更新
      let tmp = [];
      this.selectedAttendView.map(function (value, key) {
        tmp[key] = value;
        tmp[key].num = '';
      });
      this.selectedAttendView = tmp;
    },

    /****************************
     * 行削除ボタン
     ****************************/
    rowDelete() {
      // 入力値の空欄化
      this.inputDataEmpty(false);
      this.closeCheckConfirmFlg = true;

      // 選択した行の削除
      let rowData = this.selectedAttendView.slice();
      rowData[this.rowNum].code = '';
      rowData[this.rowNum].name = '';
      rowData[this.rowNum].syokusyu = '';
      // gridへ反映
      this.selectedAttendView = rowData.slice();
      this.flexGridSelected.itemsSource = [];
      this.flexGridSelected.itemsSource = rowData;
    },

    /***********************
     * #selectedAttendGrid
     ***********************/
    onInitializedSelected(flexGrid) {
      this.flexGridSelected = flexGrid;
      let selectedAttendView = [];

      // No(Num)順
      selectedAttendView.sort((a, b) => {
        return a.num < b.num ? -1 : 1;
      });

      // grid style
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
          e.cell.style.textAlign = 'left';
          e.cell.style.justifyContent = 'left';
          e.cell.style.alignItems = 'left';
        }
      });

      let attendees = this.selectedAttendList;
      this.selectedAttendView = attendees;
      if (attendees.length == 0) {
        // Grid作成
        for (let i = 0; i < 15; i++) {
          attendees.push({
            num: i + 1,
            syokusyu: '',
            name: '',
          });
        }
      }
      this.selectedAttendView = attendees;

      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        this.closeCheckConfirmFlg = true;

        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          //選択した列を取得
          this.rowNum = ht.row;

          // 手入力値の空欄
          this.inputDataEmpty(true);

          //選択した出席者の順番を変更
          if (ht.col == 0 && this.showDisplay == true) {
            let num = this.selectedAttendView.map(function (p) {
              return p.num;
            });
            let maxCnt = parseInt(Math.max.apply(null, num)) + 1;
            // 15件以上は選択不可に制御
            if (maxCnt >= maxRowCnt) {
              maxCnt = maxRowCnt;
            }
            // 順変更時のチェック内容
            if (
              (this.selectedAttendView[ht.row].num == '' &&
                (this.selectedAttendView[ht.row].syokusyu ||
                  this.selectedAttendView[ht.row].name)) ||
              (this.selectedAttendView[ht.row].num == '' &&
                (this.selectedAttendView[ht.row].syokusyu != '' ||
                  this.selectedAttendView[ht.row].name != ''))
            ) {
              // 変更した順番をGridへ反映
              this.selectedAttendView[ht.row].num = maxCnt;
              flexGrid.setCellData(ht.row, 0, maxCnt);
            }
          }
        }
      });
    },

    /*******************
     * 手入力値を空欄化
     *******************/
    inputDataEmpty(inputFlg) {
      let atdLeft = this.selectedAttendView.slice();

      // 手入力欄を空に
      this.inputSyokusyu = '';
      this.inputName = '';

      // 手入力した値のみ入力欄へ出力
      if (!atdLeft[this.rowNum].intId && inputFlg == true) {
        this.inputSyokusyu = this.selectedAttendView[this.rowNum].syokusyu;
        this.inputName = this.selectedAttendView[this.rowNum].name;
      }
    },
    /******************
     * 出席者Grid
     ******************/
    setAttendViewData() {
      // 出席者一覧のグリッドを作成
      while (this.flexGridAttendView.columns.length < 6) {
        this.flexGridAttendView.columns.push(new wjGrid.Column());
      }
      while (this.flexGridAttendView.rows.length < 5) {
        this.flexGridAttendView.rows.push(new wjGrid.Row());
      }
    },
    /*************
     * 頭文字検索
     *************/
    onAlphabetical() {
      this.userFilter();
    },
    /*****************
     * セレクトボックス
     ******************/
    onJigyosyoClicked() {
      let key = this.selJigyosyo;
      this.selJigyosyo = this.jigyosyoList[key].val;
      this.selJgyoshoval = this.jigyosyoList[key].jigyosyo;
      this.userFilter();
    },
    onSyokusyuClicked() {
      let key = this.selSyokusyu;
      this.selSyokusyu = this.syokusyuList[key].val;
      this.selSyokusyuval = this.syokusyuList[key].syokusyu;
      this.userFilter();
    },
    /*******************
     * #attendGrid
     *******************/
    // 絞り込み機能
    userFilter() {
      // 職員一覧のデータを取得（現在は上記に定義）
      let data = this.attendSelectDefault.slice();
      // 事業所
      if (this.selJigyosyo != 0) {
        data = data.filter((data) => data.jigyosyo == this.selJgyoshoval);
      }
      // 職種
      if (this.selSyokusyu != 0) {
        data = data.filter((data) => data.syokusyu == this.selSyokusyuval);
      }
      // カナ検索
      data = this.$refs.alp.alphabetFilter(data, 'kana');

      // itemsSourceに配列代入
      this.attendSelect = data;
    },

    onInitializedAttendChanged(flexGrid) {
      // 選択状態を解除
      flexGrid.select(-1, -1);
    },
    onInitializedAttend(flexGrid) {
      this.flexGridAttend = flexGrid;

      //デフォルト値（あとでAPI）
      let attendSelect = [];
      attendSelect.push({
        intId: 5, // 見立て内部ID
        code: '10001',
        syokusyu: '相談支援専門員',
        name: '鈴木　妙子',
        kana: 'ｽｽﾞｷ ｻｴｺ',
        jigyosyo: 'とうけい相談支援事業所１',
      });
      attendSelect.push({
        intId: 6,
        code: '10002',
        syokusyu: 'その他',
        name: '竹下　美智子',
        kana: 'ﾀｹｼﾀ ﾐﾁｺ',
        jigyosyo: '東経相談支援事業所１',
      });
      attendSelect.push({
        intId: 7,
        code: '10003',
        syokusyu: '相談支援専門員',
        name: '東経 太郎',
        kana: 'ﾄｳｹｲ ﾀﾛｳ',
        jigyosyo: '東経相談支援事業所２',
      });
      attendSelect.push({
        intId: 8,
        code: '10004',
        syokusyu: '相談支援専門員',
        name: '西経 太郎',
        kana: 'ﾄｳｹｲ ﾀﾛｳ',
        jigyosyo: '東経相談支援事業所２',
      });
      this.attendSelectDefault = attendSelect;
      this.attendSelect = attendSelect;

      // 選択した行のデータ取得;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        // 順変更時はクリック不可の状態にする
        if (this.showDisplay == true) {
          return false;
        }
        // selectedAttendGridへ追加可能状態
        let ht = flexGrid.hitTest(e);
        let selectRow = ht._row;

        // 選択した出席者のデータを取得
        let selectedArr = this.selectedAttendView.slice();

        // 重複データのチェック
        let errCnt = 0;
        if (!this.attendSelect[selectRow]) {
          return false;
        }
        let attendSelectCode = this.attendSelect[selectRow].code;
        selectedArr.map(function (value) {
          if (value.code == attendSelectCode) {
            errCnt += 1;
          }
        });
        if (errCnt > 0) {
          alert('登録済みの出席者です');
          return false;
        }

        // 選択した列データで更新
        selectedArr[this.rowNum].code = this.attendSelect[selectRow].code;
        selectedArr[this.rowNum].intId = this.attendSelect[selectRow].intId;
        selectedArr[this.rowNum].name = this.attendSelect[selectRow].name;
        selectedArr[this.rowNum].syokusyu =
          this.attendSelect[selectRow].syokusyu;

        // Grid反映・更新
        this.flexGridSelected.itemsSource = [];
        this.flexGridSelected.itemsSource = selectedArr;

        // selectedAttendGridを更新
        this.selectedAttendView = selectedArr.slice();

        // クローズチェックフラグ
        this.closeCheckConfirmFlg = true;
      });

      // selectedAttendGridのレイアウトを設定
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel.cellType == wjGrid.CellType.Cell) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          e.cell.style.color = sysConst.COLOR.fontColor;
          e.cell.style.textAlign = 'left';
          e.cell.style.justifyContent = 'left';
          e.cell.style.alignItems = 'left';
        }
      });
    },

    onInitializedSelectedChanged(flexGrid) {
      this.setCellPosition(flexGrid);
    },
    /***************
     * セルの位置設定
     ***************/
    setCellPosition(flexGrid) {
      if (this.rowNum != this.maxRowCnt - 1) {
        for (let i = this.rowNum; i < this.selectedAttendView.length; i++) {
          if (
            !(
              this.selectedAttendView[i].name ||
              this.selectedAttendView[i].syokusyu
            )
          ) {
            this.rowNum = i;
            break;
          }
        }
      }
      flexGrid.select(this.rowNum, 0);
    },

    /****************************
     * 手入力データ・追加ボタンの活性
     ****************************/
    inputData() {
      this.addBtn = true;

      if (
        (this.inputSyokusyu && this.inputSyokusyu.length > 0) ||
        (this.inputName && this.inputName.length > 0)
      ) {
        // 活性化
        this.addBtn = false;
      }
    },
    // 追加ボタン押下 selectedAttendGridへデータ挿入
    inputAddBtn() {
      //選択した列を取得
      let addData = this.selectedAttendView.slice();

      // selectedAttendGridへデータを挿入
      addData[this.rowNum].syokusyu = this.inputSyokusyu;
      addData[this.rowNum].name = this.inputName;
      addData[this.rowNum].intId = '';

      // 手入力データをgridへ反映
      this.flexGridSelected.itemsSource = [];
      this.flexGridSelected.itemsSource = addData.slice();
      this.selectedAttendView = addData;

      // grid追加後、入力値を空にする
      this.inputSyokusyu = '';
      this.inputName = '';
      // 追加ボタンを非活性
      this.addBtn = true;

      // クローズチェックフラグ
      this.closeCheckConfirmFlg = true;
    },

    setShussekiData() {
      let tmp = this.selectedAttendView.slice();
      // 出席者一覧へ登録
      let c = 0; // Column座標変数
      let r = 0; // Row座標変数
      let _self = this;
      tmp.map(function (value) {
        _self.flexGridAttendView.setCellData(r, c, value.syokusyu, false, true);
        _self.flexGridAttendView.setCellData(r, c + 1, value.name, false, true);

        c = c + 2;
        if (c == 6) {
          // grid2行目
          r += 1;
          c = 0;
        }
      });
    },

    /****************
     * 設定ボタン
     ****************/
    registSelect() {
      if (this.showDisplay == true) {
        this.JunKettei();
      }
      // 選択した会議出席者を取得
      let tmp = this.selectedAttendView.slice();

      // 職種と氏名をtmpDataにプッシュ
      let tmpData = [];
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].name || tmp[i].syokusyu) {
          tmpData.push(tmp[i]);
        }
      }
      let num = 1;
      for (let i = 0; i < tmp.length; i++) {
        if (tmpData[i]) {
          tmp[i] = Object.assign({}, tmpData[i]);
        } else {
          tmp[i].syokusyu = '';
          tmp[i].name = '';
        }
        // numを振りなおす
        tmp[i].num = num;
        num++;
      }

      // gridへ反映
      this.selectedAttendView = tmp;

      // 空の数をカウント
      let cnt = tmp.filter(
        (value) => value.name == '' && value.syokusyu == ''
      ).length;

      // 空が15件（tmp）ある場合アラートを出力
      if (cnt == tmp.length) {
        alert('1件も登録されていません。');
        return false;
      }
      // 出席者一覧に反映
      this.setShussekiData();

      this.rowNum = 0;
      // クローズチェックフラグ
      this.closeCheckConfirmFlg = false;
      // ダイアログを閉じる
      this.attend_dialog = false;
    },
    /*****************
     * 順決定ボタン
     *****************/
    JunKettei() {
      let order = this.selectedAttendView.slice();
      // orderの num プロパティの最大値を取得
      let max = Math.max.apply(
        null,
        order.map(function (o) {
          return o.num;
        })
      );
      // 全て未設定時はmax==0となる
      max += 1;
      // gridに表示するnum配列;→numに空が入らないようにする
      order.map(function (value, key) {
        let n = 0; // gridに表示するnumの値
        if (value.num != '') {
          // gridで既に手動で指定してあるnum
          n = value.num;
        } else {
          // gridで既に手動で指定していないnum
          n = max;
          max++;
        }
        // orderに対してnumを指定
        order[key].num = n;
      });
      order.sort((a, b) => {
        if (a.num < b.num) {
          return -1;
        }
        if (a.num > b.num) {
          return 1;
        }
      });

      // 変更した順（num）を反映
      this.selectedAttendView = order.slice();
      this.flexGridSelected.itemsSource = [];
      this.flexGridSelected.itemsSource = order;

      // 活性・非活性再設定
      this.showDisplay = false;
      this.rowDeleteDisabled = false;
      this.allDeleteDisabled = false;
      this.inputSyokusyuDisabled = false;
      this.inputNameDisabled = false;
    },
    /****************
     * クローズボタン
     ****************/
    closeBtn() {
      if (this.closeCheckConfirmFlg) {
        this.closeCheckConfirmFlg = false;
        if (!confirm('変更があります。取り消ししてもよろしいですか？')) {
          return false;
        }
      }
      this.attend_dialog = false;
    },
    /****************
     * 全削除ボタン
     ****************/
    allDelete() {
      if (confirm('出席者をすべて削除します。よろしいですか？')) {
        let delArr = [];
        for (let i = 0; i < this.selectedAttendView.length; i++) {
          delArr.push({
            // num振り・他の値は空にする
            num: i + 1,
          });
        }
        this.selectedAttendView = delArr;
        this.flexGridSelected.itemsSource = [];
        this.flexGridSelected.itemsSource = this.selectedAttendView;
        // セルの位置初期化
        this.rowNum = 0;
        this.flexGridSelected.select(0, 0);

        // 手入力欄も削除
        this.inputSyokusyu = '';
        this.inputName = '';

        // クローズチェックフラグ
        this.closeCheckConfirmFlg = true;
      }
    },
    /*************
     * API取得
     *************/
    // 履歴参照 GET
    getTantoReki() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pSvcKbn: 1,
        pJigyoid: 62,
        pIntcode: this.intCode,
      };
      getConnect('/TantokaigiReki', params, 'SIENP').then((result) => {
        for (let i = 0; i < result.length; i++) {
          if (
            result[i].length != 0 &&
            dayjs(result[i].mkYmd, 'YYYY/MM/DD').isValid()
          ) {
            result[i].mkYmd = dayjs(result[i].mkYmd).format('YYYY/MM/DD');
          }
          if (
            result[i].length != 0 &&
            dayjs(result[i].opnYmd, 'YYYY/MM/DD').isValid()
          ) {
            result[i].opnYmd = dayjs(result[i].opnYmd).format('YYYY/MM/DD');
          }
          if (
            result[i].length != 0 &&
            dayjs(result[i].kanryoYmd, 'YYYY/MM/DD').isValid()
          ) {
            result[i].kanryoYmd = dayjs(result[i].kanryoYmd).format(
              'YYYY/MM/DD'
            );
          }
        }
        this.rirekiView = result;
      });
    },
    // 履歴参照 POST
    getPostData() {
      let params = {
        uniqid: 3,
        traceid: 123,
      };
      let mkYmd = this.mkYmd.replaceAll('/', '');
      let opnYmd = this.opnYmd.replaceAll('/', '');

      let inputParams = {
        svcKbn: 1,
        jigyoid: 62,
        kaigiKbn: this.kaigiKbn,
        intcode: this.intCode,
        mkYmd: mkYmd,
        opnYmd: opnYmd,
        siid: this.siid,
        annCntID: this.annCntID,
        moniCntID: this.moniCntID,
      };
      postConnect('/TantokaigiReki', params, 'SIENP', inputParams).then(
        (result) => {
          if (result.okflg == true) {
            this.rirekiView = [];
          } else {
            alert(result.msg);
          }
        }
      );
    },
    // 担当会議 GET
    setViewData() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pSvcKbn: 1,
        pIntcode: this.intCode,
        pCntId: this.cntID,
      };
      getConnect('/Tantokaigi', params, 'SIENP').then((result) => {
        // 会議内容
        this.mkYmd = dayjs(result[0].info.mkYmd).format('YYYY年MM月DD日');
        this.opnYmd = dayjs(result[0].info.opnYmd).format('YYYY年MM月DD日');
        this.sTime = result[0].info.sTime;
        this.eTime = result[0].info.eTime;
        this.basho = result[0].info.basho;
        this.kadai = result[0].kadai;

        // 出席者一覧
        this.shussekiList = result[0].shussekiList;

        let attendees = [];
        for (let i = 0; i < 15; i++) {
          attendees.push({
            num: i + 1,
            syokusyu: this.shussekiList[i] ? this.shussekiList[i].siYakuNm : '',
            name: this.shussekiList[i] ? this.shussekiList[i].siNm : '',
          });
        }
        this.selectedAttendList = attendees;
        this.selectedAttendView = this.selectedAttendList;
        // 出席者一覧へ反映
        this.setShussekiData();

        // 検討項目/内容・結論
        this.naiyoGyoList = result[0].naiyoGyoList;
        let considerView = [];

        // 検討項目/内容/結論
        for (let i = 0; i < this.naiyoGyoList.length; i++) {
          let kentoKmk = '';
          let kentoNaiyo = '';
          let ketsuron = '';
          let list = this.naiyoGyoList[i].naiyoList;
          for (let j = 0; j < list.length; j++) {
            if (list[j].kbn == 1) {
              kentoKmk = list[j].naiyo;
            }
            if (list[j].kbn == 2) {
              kentoNaiyo = list[j].naiyo;
            }
            if (list[j].kbn == 3) {
              ketsuron = list[j].naiyo;
            }
          }
          // gridへ反映
          considerView.push({
            cnt: this.naiyoGyoList[i].cnt,
            kentoKmk: kentoKmk,
            kentoNaiyo: kentoNaiyo,
            ketsuron: ketsuron,
          });
        }
        this.considerView = considerView;
      });
    },
    // 担当会議 PUT
    putTantokaigi() {
      let params = {
        uniqid: 3,
        traceid: 123,
      };
      let inputParams = {
        svcKbn: 1,
        jigyoid: 62,
        intCode: this.intCode,
        info: [
          {
            mkYmd: this.mkYmd,
            opnYmd: this.opnYmd,
            sTime: this.sTime,
            eTime: this.eTime,
            basho: this.basho,
          },
        ],
        shussekiList: [
          {
            siYakuNm: this.syokusyu,
            siNm: this.name,
          },
        ],
        naiyoGyoList: [
          {
            cnt: this.cntID,
            naiyoList: [
              {
                kbn: 1,
                naiyo:
                  '家族や訪問看護以外の人と関わる時間を持ちたい。\r\n・定期的に通える場所ができ、生活にメリハリをつけたい。',
              },
            ],
          },
        ],
      };
      putConnect('TantoKaigi', params, 'SIENP', inputParams).then((result) => {
        console.log(result);
      });
    },
    dispalyChange() {
      this.onDisplayFlag = this.onDisplayFlag ? false : true;
      this.offDisplayFlag = this.offDisplayFlag ? false : true;
      this.display = this.onDisplayFlag ? '↑縮小' : '↓拡大';
    },
    /*****************************
     * カレンダー機能
     *****************************/
    inputCalendarClick(calendarType) {
      if (calendarType == 0) {
        // 計画案作成日
        this.picker = this.dateFormatChange(this.getYmd);
      }
      if (calendarType == 1) {
        // 作成日
        this.picker = this.dateFormatChange(this.mkYmd);
      }
      if (calendarType == 2) {
        // 開催日
        this.picker = this.dateFormatChange(this.opnYmd);
      }
      this.datepicker_dialog = true;
      this.calendarType = calendarType;
    },
    // YYYY年MM月DD日の形式へ変更
    monthSelect() {
      // 計画案作成日
      if (this.calendarType == 0) {
        this.getYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      // 作成日
      if (this.calendarType == 1) {
        this.mkYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      // 開催日
      if (this.calendarType == 2) {
        this.opnYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      this.datepicker_dialog = false;
    },
    dateFormatChange(dateString) {
      let year = dateString.slice(0, 4);
      let month = dateString.slice(5, 7);
      let day = dateString.slice(8, 10);
      let date = year + '-' + month + '-' + day;
      return date;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#tantokaigi {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1330px !important;
  max-width: 1330px !important;
  width: auto;
  #tantoKaigiGrid {
    width: 100%;
    height: 100%;
    max-height: 90px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
  }

  div {
    &.onDisplayFlag {
      display: block;
    }
    &.offDisplayFlag {
      display: none;
    }
  }
  .wrap {
    white-space: pre;
  }
  .inputarea {
    line-height: 1.25em;
    font-size: 14px;
  }

  .scrollbody {
    padding: 3px;
    border: 1px solid;
    border-color: $light-gray;
    min-height: 330px;
    height: 330px;
    overflow-y: scroll;
  }
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
  .wj-filter-on {
    color: $font_color_saturday;
    border-color: lightgray;
  }
}

div.rirekiTitle {
  padding: 4px;
  width: 100%;
  height: 35px;
  text-align: center;
  color: $view_Title_font_color_Main;
  background-color: $view_Title_background_Main;
  position: relative;

  .v-btn {
    &.rirekiClose {
      position: absolute;
      top: 6px;
      right: 15px;
      color: $grid_selected_color;
      background-color: $view_Title_font_color_Main;
    }
  }
}
div#rirekiSansyoGrid {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: var(--height);
  .wj-header {
    font-weight: normal;
  }
}

div#selectedAttendGrid {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  width: 100%;
  background: $view_Title_font_color_Main;
  border: 1px solid $grid_Border_Color;

  .wj-state-active {
    background: $grid_selected_background;
    color: $font_color;
  }
  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected):not(.wj-state-active) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background;
    color: $font_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background;
    color: $font_color;
  }
  .wj-header {
    font-weight: normal !important;
  }
}

.input_text {
  background: $white;
  height: 20px !important;
  &.wflex {
    width: 660px;
  }
  &.outline {
    border: 1px solid $light-gray;
  }
  &.w100 {
    width: 100px;
  }
  &.w60 {
    width: 60px;
  }
  div {
    height: 24px !important;
    min-height: 24px !important;
  }
  input {
    border: none !important;
  }
}
#dialog_scroll {
  overflow: scroll !important;
  min-height: 500px;
  min-width: 850px;
}

#TantoKaigiDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  width: 300px;
  max-width: 300px;
}
#considerGrid {
  font-size: 12px !important;
  min-height: 200px;
  border: 1px solid $grid_Border_Color;

  .wj-header {
    font-weight: normal;
    background: $view_Title_background_Blue;
    color: $view_Title_font_color_Blue;
  }
  &.wj-flexgrid [wj-part='root'] {
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }
  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected):not(.wj-state-active):not(.wj-grid-editor) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background;
    color: $grid_selected_color;
  }
}
#attendGrid {
  font-size: 12px;
  height: 320px;
  background: $grid_background;
  border: 1px solid $grid_Border_Color;
  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0s;
    background: $grid_hover_background;
  }

  .wj-cells .wj-cell.wj-state-multi-selected {
    background: $grid_selected_background; // ピンク
    color: $grid_selected_color;
  }

  .wj-cells .wj-cell.wj-state-selected {
    background: $grid_selected_background; // ピンク
    color: $grid_selected_color;
  }
  .wj-header {
    font-weight: normal !important;
  }
}

div {
  &.customCombobox {
    &.w100p {
      width: 100% !important;
    }
  }
}

.selectbox {
  &::-ms-expand {
    display: auto;
  }
  -webkit-appearance: auto;
  -moz-appearance: auto;
  appearance: auto;

  border: 1px solid #ccc;
  width: 100%;
  padding-left: 10px;
}
.manual-form {
  font-size: 12px;
  .v-input__control {
    display: block;
    .v-text-field__details {
      padding: 0;
      .error--text {
        font-size: 10px;
      }
    }
  }
  .v-input__slot {
    padding: 0 4px !important;
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    display: none;
    margin: 0;
  }
}
</style>
