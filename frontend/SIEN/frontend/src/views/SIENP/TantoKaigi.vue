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
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="24"
                class="text-center"
              >
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="ml-1 pl-1"
                width="200"
                height="24"
              >
                {{ userName }}
              </v-card>
            </v-card>
          </div>
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat>
              <v-btn-toggle>
                <v-btn small>新規入力</v-btn>
                <v-btn small>内容更新</v-btn>
              </v-btn-toggle>
              <v-btn-toggle class="ml-2">
                <v-btn small>計画案</v-btn>
                <v-btn small>モニタリング</v-btn>
                <v-btn small>その他</v-btn>
              </v-btn-toggle>

              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="24"
                class="text-center ml-1 pt-1"
                >計画案作成日
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
              <v-card class="ml-1"> <v-btn small>案履歴参照</v-btn> </v-card>
              <v-card class="ml-auto">
                <v-btn-toggle tile>
                  <v-btn small>前回コピー</v-btn>
                  <v-btn small>履歴参照</v-btn>
                </v-btn-toggle>
              </v-card>
            </v-card>
          </div>
          <v-card class="mt-3 pa-2" :color="'grey lighten-4'">
            <div>
              <v-card class="d-flex flex-row" flat :color="'grey lighten-4'">
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  class="text-center"
                  >作成日
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

                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  class="text-center"
                  >開催日
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

                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  class="text-center pt-1"
                  >開催時間
                </v-card>
                <v-card elevation="0" tile :color="'grey lighten-4'">
                  <input type="time" class="input_text outline" />
                  ～
                  <input type="time" class="input_text outline" />
                </v-card>
                <v-btn class="ml-auto" x-small>開催情報最終表示</v-btn>

                <v-btn x-small class="ml-2" @click="dispalyChange">{{
                  display
                }}</v-btn>
              </v-card>
              <v-card class="d-flex flex-row mt-2" flat>
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  height="24"
                  class="text-center"
                  >開催場所
                </v-card>
                <v-text-field
                  class="pa-0 ma-0 input_text text-caption"
                  hide-details="false"
                  outlined
                  dense
                  tile
                  :full-width="true"
                  :value="' '"
                  :height="'24'"
                >
                </v-text-field>
              </v-card>
              <div
                v-bind:class="{
                  offDisplayFlag: offDisplayFlag,
                  onDisplayFlag: onDisplayFlag,
                }"
              >
                <v-card
                  class="d-flex flex-row mt-2"
                  flat
                  :color="'grey lighten-4'"
                >
                  <v-card
                    :color="'grey lighten-4'"
                    elevation="0"
                    tile
                    small
                    width="100"
                    class="text-center"
                    >出席者
                  </v-card>
                  <v-card elevation="0" :color="'grey lighten-4'">
                    <wj-flex-grid
                      id="tantoKaigiGrid"
                      :itemsSource="attendView"
                      :autoClipboard="false"
                      :selectionMode="'1'"
                      :headersVisibility="'0'"
                      :initialized="onInitialized"
                      :itemsSourceChanged="onItemsSourceChanged"
                    >
                      <wj-flex-grid-column
                        binding="column1.position"
                        align="center"
                        valign="middle"
                        :width="156"
                        :isReadOnly="true"
                      ></wj-flex-grid-column>
                      <wj-flex-grid-column
                        binding="column1.name"
                        align="center"
                        valign="middle"
                        :width="156"
                        :isReadOnly="true"
                      ></wj-flex-grid-column>
                      <wj-flex-grid-column
                        binding="column2.position"
                        align="center"
                        valign="middle"
                        :width="156"
                        :isReadOnly="true"
                      ></wj-flex-grid-column>
                      <wj-flex-grid-column
                        binding="column2.name"
                        align="center"
                        valign="middle"
                        :width="156"
                        :isReadOnly="true"
                      ></wj-flex-grid-column>
                      <wj-flex-grid-column
                        binding="column3.position"
                        align="center"
                        valign="middle"
                        :width="156"
                        :isReadOnly="true"
                      ></wj-flex-grid-column>
                      <wj-flex-grid-column
                        binding="column3.name"
                        align="center"
                        valign="middle"
                        :width="156"
                        :isReadOnly="true"
                      ></wj-flex-grid-column>
                    </wj-flex-grid>
                  </v-card>
                </v-card>
              </div>
            </div>
          </v-card>
          <div class="mt-2">
            <v-card class="d-flex flex-row" flat>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="100"
                height="24"
                class="text-center pt-1"
              >
                参照
              </v-card>
              <v-btn-toggle class="ml-2">
                <v-btn small>新規入力</v-btn>
                <v-btn small>内容更新</v-btn>
              </v-btn-toggle>

              <v-card
                elevation="0"
                class="text-center pt-1 ml-auto d-flex flex-row"
              >
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  height="24"
                  class="text-center pt-1"
                >
                  参照
                </v-card>
                <v-btn-toggle class="ml-2">
                  <v-btn small>行追加</v-btn>
                  <v-btn small>行削除</v-btn>
                  <v-btn small>順変更</v-btn>
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
    <v-dialog v-model="attend_dialog" width="600" class="attend_dialog">
      <v-card>
        <v-card-title class="text-caption primary white--text lighten-2">
          会議出席者 選択
        </v-card-title>
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="attend_dialog = false"
          color="secondary"
          class="mt-2"
          ><v-icon dark small> mdi-close </v-icon>
        </v-btn>
        <div class="pa-2">
          <div class="d-flex flex-row text-caption" flat>
            <v-card
              :color="'grey lighten-4'"
              elevation="0"
              tile
              small
              width="100"
              height="24"
              class="text-center pt-1"
            >
              事業所
            </v-card>

            <select class="w100p ml-1 selectbox" v-model="selJijyosyo">
              <option value="" v-for="val in jijyosyoList" :key="val.val">
                {{ val.name }}
              </option>
            </select>
          </div>

          <div class="mt-1 d-flex flex-row text-caption" flat>
            <v-card
              :color="'grey lighten-4'"
              elevation="0"
              tile
              small
              width="100"
              height="24"
              class="text-center pt-1"
            >
              職種指定
            </v-card>
            <select class="w100p ml-1 selectbox" v-model="selSyokusyu">
              <option value="" v-for="val in syokusyuList" :key="val.val">
                {{ val.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="pa-2">
          <alphabet-button ref="alp" @onAlphabetical="onAlphabetical">
          </alphabet-button>

          <wj-flex-grid
            id="attendGrid"
            class="mt-2"
            :itemsSource="attendSelect"
            :autoClipboard="false"
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
          <div class="text-caption">手動入力</div>
          <div class="d-flex flex-row text-caption" flat>
            <v-card
              :color="'grey lighten-4'"
              elevation="0"
              tile
              small
              width="40"
              height="24"
              class="text-center pt-1"
            >
              コード
            </v-card>
            <input type="text" class="ml-1 input_text outline w100" />
            <v-card
              :color="'grey lighten-4'"
              elevation="0"
              tile
              small
              width="40"
              height="24"
              class="text-center pt-1 ml-1"
            >
              職種
            </v-card>
            <input type="text" class="ml-1 input_text outline w160" />
            <v-card
              :color="'grey lighten-4'"
              elevation="0"
              tile
              small
              width="40"
              height="24"
              class="text-center pt-1 ml-1"
            >
              氏名
            </v-card>
            <input type="text" class="ml-1 input_text outline w160" />
          </div>
        </div>
        <div class="text-end pa-1">
          <v-btn color="primary" @click="dialog = false" small>
            選択解除
          </v-btn>
          <v-btn color="primary" @click="dialog = false" small class="ml-1">
            追加
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import UserList from '../../components/UserList.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';

export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    UserList,
    AlphabetButton,
  },
  mounted() {
    let syokusyuList = [];
    syokusyuList.push({
      val: 0,
      name: '指定無し',
    });
    this.syokusyuList = syokusyuList;

    let jijyosyoList = [];
    jijyosyoList.push({
      val: 1,
      name: 'とうけい相談支援事業所',
    });
    this.jijyosyoList = jijyosyoList;
  },
  data: function () {
    return {
      leftWidth: '280px',
      rightWidth: '78.5%',
      userName: '',
      datepicker_dialog: false,
      calendarType: 0,
      picker: '',
      attendView: [],
      attendSelect: [],
      considerView: [],
      issue: '',
      display: '↓',
      onDisplayFlag: true,
      offDisplayFlag: false,
      attend_dialog: false,
      selJijyosyo: [],
      selSyokusyu: [],
      jijyosyoList: [],
      syokusyuList: [],
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
      console.log(flexGrid);
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

    onAlphabetical() {
      alert('alpha');
    },
    /******************
     * 出席者
     *********************/
    onInitialized(flexGrid) {
      let attendView = [];
      attendView.push({
        column1: {
          position: '相談支援専門員',
          name: '鈴木妙子',
        },
      });
      attendView.push({
        column1: {
          position: '相談支援専門員',
          name: '鈴木美智子',
        },
      });
      attendView.push({
        column1: {
          position: '',
          name: '',
        },
      });
      this.attendView = attendView;

      let attendSelect = [];

      attendSelect.push({
        code: '10001',
        syokusyu: '相談支援専門員',
        name: '鈴木　妙子',
      });
      attendSelect.push({
        code: '10002',
        syokusyu: '相談支援専門員',
        name: '竹下　美智子',
      });
      for (let i = 3; i < 6; i++) {
        attendSelect.push({
          code: '',
          syokusyu: '',
          name: '',
        });
      }
      this.attendSelect = attendSelect;

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        console.log(e);
        _self.attend_dialog = true;
      });

      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == s.cells) {
          e.cell.style.textAlign = 'left';
          e.cell.style.justifyContent = 'left';
          e.cell.style.alignItems = 'left';
        }
      });
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.select(-1, -1);
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
.issueText {
  textarea {
    padding-right: 230px !important;
  }
}
.input_text {
  &.outline {
    border: 1px solid $light-gray;
  }
  &.w100 {
    width: 100px;
  }
  &.w160 {
    width: 160px;
  }
  div {
    height: 24px !important;
    min-height: 24px !important;
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
  height: 100px;
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
</style>
