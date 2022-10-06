<template>
  <div id="tantokaigi">
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
          <v-row no-gutters class="rowStyle_Dark tall mb-1 mt-1 body-2">
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
                height="24"
              >
                {{ userName }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1 body-2">
            <v-btn-toggle>
              <v-btn small height="20" class="body-2">新規入力</v-btn>
              <v-btn small height="20" class="body-2">内容更新</v-btn>
            </v-btn-toggle>
            <v-btn-toggle class="ml-2">
              <v-btn small height="20" class="body-2">計画案</v-btn>
              <v-btn small height="20" class="body-2">モニタリング</v-btn>
              <v-btn small height="20" class="body-2">その他</v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle titleBlueDark ml-1" outlined tile>
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
            <v-btn small height="20" class="ml-1 body-2">案履歴参照</v-btn>

            <v-btn-toggle class="ml-auto">
              <v-btn small height="20" class="body-2">前回コピー</v-btn>
              <v-btn small height="20" class="body-2">履歴参照</v-btn>
            </v-btn-toggle>
          </v-row>

          <v-card class="mt-3 pa-2" :color="'grey lighten-4'">
            <v-row no-gutters class="rowStyle mb-1 mt-1 body-2">
              <v-card class="koumokuTitle titleTranceparent mr-1" outlined tile>
                作成日
              </v-card>
              <v-card
                width="140"
                height="20"
                outlined
                tile
                @click="inputCalendarClick(1)"
              >
                {{ createYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card class="koumokuTitle titleTranceparent mr-1" outlined tile>
                開催日
              </v-card>
              <v-card
                width="140"
                height="20"
                outlined
                tile
                @click="inputCalendarClick(2)"
              >
                {{ openYmd }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>

              <v-card class="koumokuTitle titleTranceparent mr-1" outlined tile>
                開催時間
              </v-card>
              <v-card elevation="0" tile :color="'grey lighten-4'">
                <input type="time" class="input_text outline" />
                ～
                <input type="time" class="input_text outline" />
              </v-card>

              <v-btn class="ml-auto body-2" small height="20"
                >開催情報最終表示</v-btn
              >

              <v-btn x-small class="ml-2" @click="dispalyChange">{{
                display
              }}</v-btn>
            </v-row>
            <v-row no-gutters class="rowStyle mb-1 mt-2 body-2">
              <v-card class="koumokuTitle titleTranceparent mr-1" outlined tile>
                開催場所
              </v-card>
              <input type="text" class="input_text pa-1 wflex" />
            </v-row>

            <div
              v-bind:class="{
                offDisplayFlag: offDisplayFlag,
                onDisplayFlag: onDisplayFlag,
              }"
            >
              <v-row no-gutters class="mt-3">
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  class="text-center body-2"
                  >出席者
                  <v-btn
                    small
                    class="mt-10 body-2"
                    :color="'primary'"
                    @click="onSelectedAttend"
                    height="20"
                    >出席者選択</v-btn
                  >
                </v-card>
                <v-card elevation="0" :color="'grey lighten-4'">
                  <wj-flex-grid
                    id="tantoKaigiGrid"
                    :autoClipboard="false"
                    :selectionMode="'1'"
                    :headersVisibility="'0'"
                    :allowAddNew="false"
                    :allowDelete="false"
                    :allowDragging="false"
                    :allowPinning="false"
                    :allowResizing="false"
                    :allowSorting="false"
                    :initialized="onInitialized"
                    :itemsSourceChanged="onItemsSourceChanged"
                  >
                  </wj-flex-grid>
                </v-card>
              </v-row>
            </div>
          </v-card>
          <div class="mt-2">
            <v-card class="d-flex flex-row" flat>
              <v-btn-toggle>
                <v-btn small height="20" class="body-2">新規入力</v-btn>
                <v-btn small height="20" class="body-2">内容更新</v-btn>
              </v-btn-toggle>

              <v-card elevation="0" class="text-center ml-auto d-flex flex-row">
                <v-btn-toggle class="ml-2">
                  <v-btn small height="20" class="body-2">行追加</v-btn>
                  <v-btn small height="20" class="body-2">行削除</v-btn>
                  <v-btn small height="20" class="body-2">順変更</v-btn>
                </v-btn-toggle>
              </v-card>
            </v-card>

            <wj-flex-grid
              id="considerGrid"
              class="mt-2"
              :itemsSource="considerView"
              :autoClipboard="false"
              :selectionMode="'1'"
              :headersVisibility="'Column'"
              :autoRowHeights="true"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
              :initialized="onInitializedConsider"
            >
              <wj-flex-grid-column
                header="No"
                binding="no"
                align="right"
                valign="middle"
                :width="40"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="検討した項目"
                binding="consider"
                valign="middle"
                width="1*"
                :wordWrap="true"
                :multiLine="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="検討内容"
                binding="considerNote"
                valign="middle"
                width="1*"
                :wordWrap="true"
                :multiLine="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="結論"
                binding="considerResult"
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
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="100"
                class="text-center pt-10"
              >
                残された課題
              </v-card>
              <v-card elevation="0" width="100%" class="ml-1 mt-n1">
                <v-textarea
                  v-model="issue"
                  height="100"
                  rows="5"
                  class="pt-1 issueText"
                  outlined
                  no-resize
                  tile
                  >{{ issue }}</v-textarea
                >
              </v-card>
            </v-card>
          </div>

          <v-card class="d-flex flex-row mt-2" flat>
            <v-card elevation="0">
              <v-btn small>削除</v-btn>
            </v-card>
            <v-card class="ml-auto">
              <v-btn small>登録</v-btn>
            </v-card>
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

    <!-- 出席者 -->
    <v-dialog v-model="attend_dialog" width="850">
      <v-card class="common_dialog">
        <v-card-title class="dialog_title"> 会議出席者 選択 </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          @click="undoChange"
          class="mt-1 dialog_close"
          ><v-icon dark small> mdi-close </v-icon>
        </v-btn>
        <v-row no-gutters>
          <v-col cols="6" class="pa-1">
            <v-row class="mt-2 ml-1">
              <v-card class="koumokuTitle titleMain wMin" outlined tile
                >編集</v-card
              >
              <v-btn class="func_btn ht_min ml-1" @click="editsort" small
                >順変更</v-btn
              >

              <v-btn
                small
                class="ml-1 func_btn ht_min"
                @click="allDelete"
                :disabled="allDeleteDisabled"
                >削除</v-btn
              >
            </v-row>
            <wj-flex-grid
              class="mt-4"
              height="1000"
              id="selectedAttendGrid"
              :alternatingRowStep="0"
              :allowAddNew="false"
              :allowDelete="false"
              :allowDragging="false"
              :allowPinning="false"
              :allowResizing="false"
              :allowSorting="false"
              :selectionMode="'Row'"
              :headersVisibility="'Column'"
              :initialized="onInitializedSelected"
              :itemsSource="selectedAttendView"
              :itemsSourceChanged="selectedAttendChanged"
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

            <v-row class="pa-3">
              <v-btn
                class="ml-auto ht-min func_btn"
                small
                :disabled="registDisabled"
                @click="registSelect"
              >
                設定
              </v-btn>
            </v-row>
          </v-col>

          <v-col cols="6">
            <div class="dialog_back pa-1 mt-1 mb-2">
              <v-row no-gutters class="mb-1">
                <v-card class="koumokuTitle titleBlue" height="25" outlined tile
                  >事業所</v-card
                >
                <v-select
                  class="dialog_select ml-1"
                  item-text="name"
                  item-value="val"
                  label="指定なし"
                  :items="jigyosyoList"
                  v-model="selectedJigyosyo"
                  hide-details
                  dense
                  solo
                  flat
                  return-object
                  @change="onJigyosyoChanged"
                >
                </v-select>
              </v-row>
              <v-row no-gutters class="mb-1">
                <v-card class="koumokuTitle titleBlue" outlined tile height="25"
                  >職種指定</v-card
                >
                <v-select
                  class="dialog_select ml-1"
                  item-text="name"
                  item-value="val"
                  label="指定なし"
                  :items="syokusyuList"
                  v-model="selectedSyokusyu"
                  hide-details
                  dense
                  solo
                  flat
                  return-object
                  @change="onSyokusyuChanged"
                >
                </v-select>
              </v-row>

              <alphabet-button
                class="mt-1"
                ref="alp"
                @onAlphabetical="onAlphabetical"
              ></alphabet-button>
              <wj-flex-grid
                id="attendGrid"
                class="mt-1"
                :itemsSource="attendSelect"
                :allowAddNew="false"
                :allowDelete="false"
                :allowDragging="false"
                :allowPinning="false"
                :allowResizing="false"
                :allowSorting="false"
                :selectionMode="'Row'"
                :headersVisibility="'Column'"
                :autoRowHeights="true"
                :initialized="onInitializedAttend"
                :itemsSourceChanged="onInitializedAttendChanged"
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

              <v-row class="mt-2 mb-2" no-gutters>
                <v-btn
                  @click="addSelectedAttendManual()"
                  class="mt-3 func_btn"
                  small
                >
                  <v-icon left> mdi-arrow-left </v-icon>追加
                </v-btn>

                <v-card class="titleMain ml-2 pt-5 wd-70" outlined tile
                  >手入力</v-card
                >
                <v-card class="ml-1 dialog_label_none" elevation="0">
                  <v-row no-gutters class="mb-1">
                    <v-card
                      outlined
                      tile
                      elevation="0"
                      class="koumokuTitel titleBlue pt-1 wd-70"
                    >
                      職種
                    </v-card>
                    <input type="text" class="dialog_text_field ml-1" />
                  </v-row>
                  <v-row no-gutters>
                    <v-card
                      outlined
                      tile
                      elevation="0"
                      class="koumokuTitel titleBlue pt-1 wd-70"
                    >
                      氏名
                    </v-card>
                    <input type="text" class="dialog_text_field ml-1" />
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

export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    UserList,
    AlphabetButton,
  },
  mounted() {},
  data: function () {
    return {
      leftWidth: '280px',
      rightWidth: '78.5%',
      userName: '',
      datepicker_dialog: false,
      calendarType: 0,
      picker: '',
      attendView: [],
      flexGridAttendView: [],
      attendSelectDefault: [],
      attendSelect: [],
      manualCode: '',
      codeRules: (value) => value.length == 7 || '7桁で入力してください',
      manualSyokusyu: '',
      manualName: '',
      selectedRowData: [],
      selectedAttendViewDefault: [],
      considerView: [],
      issue: '',
      display: '↓',
      onDisplayFlag: true,
      offDisplayFlag: false,
      attend_dialog: false,
      flexGridAttend: [],
      selJijyosyo: [],
      selSyokusyu: [],
      selectedJigyosyo: {
        val: 0,
        name: '指定無し',
      },
      jigyosyoList: [
        {
          val: 0,
          name: '指定無し',
        },
        {
          val: 1,
          name: 'とうけい相談支援事業所１',
        },
        {
          val: 2,
          name: 'とうけい相談支援事業所２',
        },
      ],
      selectedSyokusyu: {
        val: 0,
        name: '指定無し',
      },
      syokusyuList: [
        {
          val: 0,
          name: '指定無し',
        },
        {
          val: 1,
          name: '相談支援専門員',
        },
        {
          val: 2,
          name: 'その他',
        },
      ],
      selectedAttendView: [],
      getYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      createYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      openYmd:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      sortDisabled: true,
      deleteDisabled: false,
      allDeleteDisabled: false,
      registDisabled: false,
      sortEditFlag: false,
      sortEditCount: 1,
      flexGridSelected: [],
    };
  },

  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    onInitializedAttend(flexGrid) {
      this.flexGridAttend = flexGrid;
      // 選択した行のデータ取得;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        // selectedAttendGridへ追加可能状態
        let ht = flexGrid.hitTest(e);
        let selectRow = ht._row;
        this.selectedRowData = this.attendSelect[selectRow];
      });
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
    onInitializedAttendChanged(flexGrid) {
      flexGrid.select(-1, -1);
    },
    onInitializedConsider(flexGrid) {
      let consider = [];
      for (let i = 0; i < 3; i++) {
        consider.push({
          no: i + 1,
          consider:
            'あいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてと',
          considerNote:
            'あいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてと',
          considerResult:
            'あいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてとあいうえおかきくけこさしすせそたちつてと',
        });
      }
      let considerView = [];

      for (let i = 0; i < consider.length; i++) {
        considerView.push({
          no: consider[i].no,
          consider: consider[i].consider,
          considerNote: consider[i].considerNote,
          considerResult: consider[i].considerResult,
        });
      }

      this.considerView = considerView;

      let issue = '';
      issue =
        '①ああああああああああああああああああああああああああああああああああああああああああああああああ①ああああああああああああああああああああああああああああああああああああああああああああああああ①ああああああああああああああああああああああああああああああああああああああああああああああああ';
      this.issue = issue;

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

    /******************
     * 出席者
     *********************/
    onInitialized(flexGrid) {
      // グリッドの選択を無効にする;
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      // 出席者データ取得
      this.flexGridAttendView = flexGrid;
      let attendView = [];
      attendView.push({
        num: 1,
        position: '相談支援専門員',
        intId: 5,
        code: '10001',
        syokusyu: '相談支援専門員',
        name: '鈴木 妙子',
        kana: 'ｽｽﾞｷ ｻｴｺ',
        jigyosyo: 'とうけい相談支援事業所1',
      });
      attendView.push({
        num: 2,
        position: '相談支援専門員',
        intId: 8,
        code: '10002',
        syokusyu: 'その他',
        name: '西経 太郎',
        kana: 'ｾｲｹｲ ﾀﾛｳ',
        jigyosyo: 'とうけい相談支援事業所1',
      });
      // 15件以下の場合は空データを挿入
      for (let i = 3; i <= 15; i++) {
        attendView.push({
          num: i,
          intId: '',
          code: '',
          syokusyu: '',
          name: '',
          kana: '',
          jigyosyo: '',
        });
      }
      this.attendView = attendView;

      // セルに値を挿入
      this.setAttendViewData();

      // セルの幅調整
      flexGrid.columns.defaultSize = 154;
      // セルのデザイン修正
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        let s = cell.style;
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (c == 0 || c == 2 || c == 4) {
            s.borderRight = 'none';
          }
        }
      };
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
        jigyosyo: 'とうけい相談支援事業所１',
      });
      attendSelect.push({
        intId: 3,
        code: '10003',
        syokusyu: '相談支援専門員',
        name: '東経 太郎',
        kana: 'ﾄｳｹｲ ﾀﾛｳ',
        jigyosyo: 'とうけい相談支援事業所２',
      });

      this.attendSelectDefault = attendSelect;
      this.attendSelect = attendSelect;
    },
    onItemsSourceChanged(flexGrid) {
      // 選択状態を解除
      flexGrid.select(-1, -1);
    },
    onSelectedAttend() {
      this.attend_dialog = true;
    },
    selectedAttendChanged(flexGrid) {
      flexGrid.select(-1, -1);
      if (!this.getRealdata(this.selectedAttendView, 'syokusyu')) {
        this.registDisabled = true;
      } else {
        this.registDisabled = false;
      }
    },
    onInitializedSelected(flexGrid) {
      // flexGrid.select(-1, -1);
      this.flexGridSelected = flexGrid;
      let selectedAttendView = [];

      // 並び順
      selectedAttendView.sort((a, b) => {
        return a.num < b.num ? -1 : 1;
      });
      this.selectedAttendViewDefault = JSON.parse(
        JSON.stringify(this.attendView)
      );
      this.selectedAttendView = this.attendView;

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
          e.cell.style.textAlign = 'left';
          e.cell.style.justifyContent = 'left';
          e.cell.style.alignItems = 'left';
        }
      });

      let _self = this;
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        // 並び順変更可能状態
        if (ht.panel == flexGrid.cells) {
          if (_self.sortEditFlag && ht.col == 0) {
            if (
              flexGrid.cells.rows[ht.row].dataItem.num.length == 0 &&
              _self.selectedAttendView[ht.row].syokusyu &&
              _self.selectedAttendView[ht.row].name
            ) {
              _self.selectedAttendView[ht.row].num = _self.sortEditCount;
              flexGrid.setCellData(ht.row, 0, _self.sortEditCount);
              _self.sortEditCount++;
            }
          }
          // 並替えボタンの有効チェック
          let cntdisable = 0;
          for (let i = 0; i < _self.selectedAttendView.length; i++) {
            if (
              !_self.selectedAttendView[i].num &&
              _self.selectedAttendView[i].syokusyu &&
              _self.selectedAttendView[i].name
            ) {
              cntdisable++;
            }
          }
          if (_self.sortEditFlag && cntdisable == 0) {
            _self.sortDisabled = false;
          }
          if (
            _self.sortEditFlag == false &&
            _self.selectedRowData.length != 0
          ) {
            // selectedAttendGridへ追加可能状態
            let selectedAttendViewAdd = _self.selectedAttendView;
            let rdCount = this.getRealdata(selectedAttendViewAdd, 'syokusyu');
            // 登録データの重複確認
            let registeredIntId = [];
            for (let d = 0; d < rdCount; d++) {
              // 既に登録されているintId配列を作成
              registeredIntId.push(_self.selectedAttendView[d].intId);
            }
            if (registeredIntId.indexOf(_self.selectedRowData.intId) !== -1) {
              // 選択値と重複がある場合
              alert('既に登録されています');
            } else {
              // 要素数を取得;
              if (rdCount <= ht.row && rdCount < 15) {
                let keyArr = Object.keys(selectedAttendViewAdd[rdCount]);
                let l = keyArr.length;
                // 選択した行が実データの数以上の場合、最後の行に選択したデータを登録;
                for (let i = 0; i < l; i++) {
                  selectedAttendViewAdd[rdCount][keyArr[i]] =
                    _self.selectedRowData[keyArr[i]];
                }
              } else if (15 <= rdCount) {
                // 登録が16人以上になる場合
                alert('登録できるのは15人までです');
              } else {
                // 選択した行が実データの数以下場合、選択した行の一つ下の行に値を代入
                selectedAttendViewAdd.splice(
                  ht.row + 1,
                  0,
                  _self.selectedRowData
                );
                // 末尾のデータを削除（データ数15個固定のため）
                selectedAttendViewAdd.pop();
              }
            }
            _self.selectedAttendView = selectedAttendViewAdd;
            _self.numSort();
            flexGrid.itemsSource = [];
            flexGrid.itemsSource = _self.selectedAttendView;
            // attendGridの選択解除
            _self.flexGridAttend.select(-1, -1);
            // 選択データを初期化
            _self.selectedRowData = [];
          }
        }
      });
    },
    setAttendViewData() {
      // itemsSourceを初期化
      this.flexGridAttendView.itemsSource = [];
      // セルの作成;
      while (this.flexGridAttendView.columns.length < 6) {
        this.flexGridAttendView.columns.push(new wjGrid.Column());
      }
      while (this.flexGridAttendView.rows.length < 5) {
        this.flexGridAttendView.rows.push(new wjGrid.Row());
      }

      let c = 0; // Column座標変数
      let r = 0; // Row座標変数
      // 実数値の数を取得
      let rdCount = this.getRealdata(this.attendView, 'syokusyu');
      let arr = [];
      // 職種、氏名の順でデータを取得し格納
      for (let l = 0; l < rdCount; l++) {
        arr.push(this.attendView[l].syokusyu);
        arr.push(this.attendView[l].name);
      }
      for (let i = 0; i < arr.length; i++) {
        if (c == 6) {
          // 行が変わるごとに初期化
          c = 0;
          // 行が変わるごとにれる座標に加算
          r++;
        }
        // データを挿入;
        this.flexGridAttendView.setCellData(r, c, arr[i]);
        c++;
      }
    },
    getRealdata(array, key) {
      // 配列の実データ数を取得;
      let dataLength = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i][key]) {
          dataLength++;
        }
      }
      return dataLength;
    },
    onAlphabetical() {
      this.userFilter();
    },
    onJigyosyoChanged(s) {
      // 事業所の選択値
      this.selectedJigyosyo = s;
      this.userFilter();
    },
    onSyokusyuChanged(s) {
      // 職種指定の選択値
      this.selectedSyokusyu = s;
      this.userFilter();
    },

    userFilter() {
      let data = [];
      let _self = this;
      // 事業所、職種指定の絞り込み
      this.attendSelectDefault.forEach(function (value) {
        if (
          (value.jigyosyo.indexOf(_self.selectedJigyosyo.name) != -1 ||
            _self.selectedJigyosyo.val === 0) &&
          (value.syokusyu.indexOf(_self.selectedSyokusyu.name) != -1 ||
            _self.selectedSyokusyu.val === 0)
        ) {
          data.push(value);
        }
      });
      // カナ検索絞り込み
      data = this.$refs.alp.alphabetFilter(data, 'kana');

      // itemsSourceに配列代入
      this.attendSelect = data;
    },
    selectedAttendResetSelect() {
      this.flexGridAttend.select(-1, -1);
    },
    addSelectedAttendManual() {
      console.log(this.codeRules);
      // データが入っているデータの数を取得
      let rdCount = this.getRealdata(this.selectedAttendView, 'syokusyu');
      if (14 < rdCount) {
        alert('登録できるのは15人までです');
      } else if (!this.manualCode || !this.manualSyokusyu || !this.manualName) {
        alert('空欄があります。');
      } else if (this.validationCode) {
        alert('コードの値に誤りがあります。');
      } else {
        // 実数で入っているデータの一番下に入力データを登録
        this.selectedAttendView[rdCount].code = this.manualCode;
        this.selectedAttendView[rdCount].syokusyu = this.manualSyokusyu;
        this.selectedAttendView[rdCount].name = this.manualName;
        this.flexGridSelected.itemsSource = [];
        this.flexGridSelected.itemsSource = this.selectedAttendView;
        // 入力値を初期化
        this.manualCode = '';
        this.manualSyokusyu = '';
        this.manualName = '';
      }
    },
    validationCode() {
      // 手動入力バリデーション設定
      if (this.manualCode.length != 7) {
        return false;
      }
    },
    /********************************
     * 並び順指定
     * 並順ボタンを押下時にnumを空欄にする
     *****************************/
    editSortSetted() {
      let selectedAttendView = this.selectedAttendView;
      let sortEdit = [];
      for (let i = 0; i < selectedAttendView.length; i++) {
        sortEdit.push({
          num: '',
          intId: selectedAttendView[i].intId,
          code: selectedAttendView[i].code,
          syokusyu: selectedAttendView[i].syokusyu,
          name: selectedAttendView[i].name,
          kana: selectedAttendView[i].kana,
          jigyosyo: selectedAttendView[i].jigyosyo,
        });
      }
      this.selectedAttendView = sortEdit;
      this.sortEditFlag = true;
      this.sortEditCount = 1;
      this.sortDisabled = true;
      this.deleteDisabled = true;
      this.allDeleteDisabled = true;
      this.registDisabled = true;
    },
    editDelete() {
      if (this.flexGridSelected.selectedItems[0]) {
        let number = this.flexGridSelected.selectedItems[0].num;
        let index = this.selectedAttendView.findIndex(
          ({ num }) => num === number
        );
        this.selectedAttendView.splice([index], 1);
        this.selectedAttendView.push({
          num: '',
          intId: '',
          code: '',
          syokusyu: '',
          name: '',
          kana: '',
          jigyosyo: '',
        });
        this.numSort();
        this.flexGridSelected.itemsSource = [];
        this.flexGridSelected.itemsSource = this.selectedAttendView;
      }
    },
    registSelect() {
      this.attendView = [];
      this.attendView = this.selectedAttendView;
      this.setAttendViewData();
      this.attend_dialog = false;
    },
    numSort() {
      // num順に並べ替える（データ追加、削除時使用）
      let selectedAttendView = this.selectedAttendView;
      let sortedArr = [];
      for (let i = 0; i < selectedAttendView.length; i++) {
        let l = i + 1;
        sortedArr.push({
          num: l,
          intId: selectedAttendView[i].intId,
          code: selectedAttendView[i].code,
          syokusyu: selectedAttendView[i].syokusyu,
          name: selectedAttendView[i].name,
          kana: selectedAttendView[i].kana,
          jigyosyo: selectedAttendView[i].jigyosyo,
        });
      }
      this.selectedAttendView = sortedArr;
    },
    editSort() {
      let selectedAttendView = this.selectedAttendView;

      let sortEdit = [];
      let cnt = 1;
      for (let i = 0; i < selectedAttendView.length; i++) {
        if (selectedAttendView[i].intId) {
          sortEdit.push({
            num: selectedAttendView[i].num,
            intId: selectedAttendView[i].intId,
            code: selectedAttendView[i].code,
            syokusyu: selectedAttendView[i].syokusyu,
            name: selectedAttendView[i].name,
            kana: selectedAttendView[i].kana,
            jigyosyo: selectedAttendView[i].jigyosyo,
          });
          cnt++;
        }
      }
      for (let i = cnt - 1; i < selectedAttendView.length; i++) {
        sortEdit.push({
          num: i + 1,
          intId: selectedAttendView[i].intId,
          code: selectedAttendView[i].code,
          syokusyu: selectedAttendView[i].syokusyu,
          name: selectedAttendView[i].name,
          kana: selectedAttendView[i].kana,
          jigyosyo: selectedAttendView[i].jigyosyo,
        });
      }
      // 並び順
      sortEdit.sort((a, b) => {
        return a.num < b.num ? -1 : 1;
      });
      this.selectedAttendView = sortEdit;
      this.sortEditFlag = false;
      this.deleteDisabled = false;
      this.allDeleteDisabled = false;
      this.registDisabled = false;
      this.sortDisabled = true;
    },
    undoChange() {
      // 変更前のデータに戻す
      let temp = JSON.parse(JSON.stringify(this.selectedAttendViewDefault));
      this.selectedAttendView = temp;
      this.flexGridSelected.itemsSource = [];
      this.flexGridSelected.itemsSource = temp;
      this.attend_dialog = false;
    },
    allDelete() {
      if (confirm('出席者をすべて削除します。よろしいですか？')) {
        let delArr = [];
        for (let l = 1; l < 16; l++) {
          delArr.push({
            num: l,
            intId: '',
            code: '',
            syokusyu: '',
            name: '',
            kana: '',
            jigyosyo: '',
          });
        }
        this.selectedAttendView = delArr;
        this.flexGridSelected.itemsSource = [];
        this.flexGridSelected.itemsSource = this.selectedAttendView;
      }
    },
    dispalyChange() {
      this.onDisplayFlag = this.onDisplayFlag ? false : true;
      this.offDisplayFlag = this.offDisplayFlag ? false : true;
      this.display = this.onDisplayFlag ? '↓' : '↑';
    },
    inputCalendarClick(calendarType) {
      this.picker =
        dayjs().format('YYYY') +
        '-' +
        dayjs().format('MM') +
        '-' +
        dayjs().format('DD');
      this.datepicker_dialog = true;
      this.calendarType = calendarType;
    },
    monthSelect() {
      if (this.calendarType == 0) {
        this.getYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      if (this.calendarType == 1) {
        this.createYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      if (this.calendarType == 2) {
        this.openYmd = dayjs(this.picker).format('YYYY年MM月DD日');
      }
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
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
  min-width: 1350px !important;
  max-width: 1350px !important;
  width: auto;
  #tantoKaigiGrid {
    width: 100%;
    height: 80px;
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
  textarea {
    font-size: 12px;
    line-height: 1.25em;
  }
}
div#selectedAttendGrid {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  width: 100%;
  background: $view_Title_font_color_Main;
}
.issueText {
  textarea {
    padding-right: 230px !important;
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

#TantoKaigiDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  width: 300px;
  max-width: 300px;
}
#considerGrid {
  height: 200px;
}
#attendGrid {
  font-size: 12px;
  height: 320px;
  background-color: $light_yellow;
  .wj-cells
    .wj-row:hover
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
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
