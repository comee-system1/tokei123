<template>
  <div id="keikakuIdea">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="true"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row no-gutters class="mt-1 borderBottom pb-2">
            <v-col cols="3">
              <v-card class="d-flex justify-end" flat tile>
                <v-card outlined tile width="100" class="text-center">
                  利用者名
                </v-card>
                <v-card width="200" class="ml-3" elevation="0" outlined tile>
                  aaa
                </v-card>
              </v-card>
            </v-col>
            <v-col class="ml-auto" cols="3">
              <v-card class="d-flex justify-end" flat tile>
                <v-card
                  outlined
                  tile
                  width="100"
                  class="text-center"
                  v-if="inputTypemodel == 'tab-0'"
                  >同意署名欄
                </v-card>
                <v-card
                  outlined
                  tile
                  width="100"
                  class="text-center"
                  v-if="inputTypemodel == 'tab-1'"
                  >完了
                </v-card>
                <v-card class="lightYellow pl-1 ml-1" width="200" outlined tile>
                  竹下道子
                </v-card>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-1">
            <v-col cols="3">
              <v-card class="d-flex justify-end" flat tile>
                <v-card outlined tile width="100" class="text-center">
                  作成日
                </v-card>
                <v-card
                  width="200"
                  class="text-center"
                  style="box-shadow: none !important"
                >
                  <v-btn
                    outlined
                    tile
                    x-small
                    @click="inputCalendarClick(0)"
                    width="180px"
                    height="24px"
                    style="font-size: 12px"
                    >{{ getYm }}
                    <div class="float-right">
                      <v-icon small>mdi-calendar-month</v-icon>
                    </div>
                  </v-btn>
                </v-card>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card class="d-flex justify-start" flat tile>
                <v-card outlined tile width="100" class="text-center"
                  >計画区分
                </v-card>

                <wj-menu
                  class="customCombobox ml-1"
                  :itemsSource="keikakuKubun"
                  selectedValuePath="val"
                  displayMemberPath="name"
                  v-model="keikakuKubunModel"
                  :itemClicked="onkeikakuKubun"
                  style="border-radius: 4px !important"
                >
                </wj-menu>
              </v-card>
            </v-col>

            <v-col class="ml-auto" cols="3">
              <v-card class="d-flex justify-end" flat tile>
                <v-card outlined tile width="100" class="text-center"
                  >作成者
                </v-card>
                <v-card class="lightYellow pl-1 ml-1" width="200" outlined tile>
                  竹下道子
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1 pb-2 borderBottom">
            <v-col cols="6">
              <v-btn-toggle>
                <v-btn small>新規入力</v-btn>
                <v-btn small>内容更新</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6" align="right">
              <v-btn-toggle>
                <v-btn small>前回コピー</v-btn>
                <v-btn small>履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="mt-1 pb-1 borderBottom"
            v-if="inputTypemodel == 'tab-0'"
          >
            <v-card class="d-flex justify-start" flat tile>
              <v-card outlined tile width="140" class="text-center">
                障害者支援区分
              </v-card>
              <v-card
                class="lightYellow text-center ml-1"
                width="80"
                outlined
                tile
              >
                区分5
              </v-card>
              <v-card outlined tile width="240" class="text-center ml-1">
                障害福祉サービス受給者番号
              </v-card>
              <v-card
                class="lightYellow text-center ml-1"
                width="140"
                outlined
                tile
              >
                11000011120
              </v-card>
              <v-card outlined tile width="240" class="text-center ml-1">
                地域相談支援受給者番号
              </v-card>
              <v-card
                class="lightYellow text-center ml-1"
                width="140"
                outlined
                tile
              >
              </v-card>
            </v-card>
            <v-card class="d-flex justify-start mt-1" flat tile>
              <v-card outlined tile width="140" class="text-center">
                通所受給者番号
              </v-card>
              <v-card
                class="lightYellow text-center ml-1"
                width="140"
                outlined
                tile
              >
              </v-card>
              <v-card outlined tile width="140" class="ml-1 text-center">
                モニタリング期間
              </v-card>
              <v-text-field
                class="pa-0 ma-0 ml-1 input-text"
                hide-details="false"
                outlined
                dense
                :value="'毎月(当初3ヶ月)その後3ヶ月毎'"
              >
              </v-text-field>
            </v-card>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col cols="6">
              <v-tabs height="25" light v-model="inputTypemodel">
                <v-tab
                  class="pa-1"
                  v-for="value in inputType"
                  :key="value.key"
                  style="height: 25px"
                  :href="'#tab-' + value.key"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-col cols="6" align="right" v-if="inputTypemodel == 'tab-1'">
              <v-btn-toggle class="mt-1">
                <v-btn small>行追加</v-btn>
                <v-btn small>行削除</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-tabs-items v-model="inputTypemodel">
            <v-tab-item value="tab-0">
              <keikakuideaIkou></keikakuideaIkou>
            </v-tab-item>
            <v-tab-item value="tab-1">
              <keikakuideaKadai></keikakuideaKadai>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuIcrnDatepicker"
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
import moment from 'moment';

import UserList from './UserList.vue';
import keikakuideaIkou from './KeikakuIdeaIkou.vue';
import keikakuideaKadai from './KeikakuideaKadai.vue';
export default {
  props: {
    dispHideBar: Boolean,
  },
  components: {
    UserList,
    keikakuideaIkou,
    keikakuideaKadai,
  },
  data() {
    return {
      inputTypemodel: 'tab-1', // tab-0:意向・方針 tab-1:課題・支援
      inputType: [
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
      rightWidth: '79%',
      moveLeft: true,
      datepicker_dialog: false,
      picker: '',
      getYm:
        moment().format('YYYY') +
        '年' +
        moment().format('MM') +
        '月' +
        moment().format('DD') +
        '日',
      keikakuKubun: [
        { id: 0, name: 'サービス等利用計画' },
        { id: 1, name: 'サービス等利用計画2' },
      ],
      keikakuKubunModel: '',
    };
  },
  created() {},
  mounted() {},
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
  },
  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      console.log(row);
      alert('test');
    },

    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '99%';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '79%';
      }
    },
    inputCalendarClick() {
      this.picker =
        moment().format('YYYY') +
        '-' +
        moment().format('MM') +
        '-' +
        moment().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = moment(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuIdea {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }

  .input-text {
    font-size: 12px;
    min-width: 200px;
    border-radius: 4px !important;
    div {
      height: 24px;
      min-height: 24px;
    }
  }
  .mw240 {
    max-width: 240px;
  }
  .mw200 {
    max-width: 200px;
  }
  .mw180 {
    max-width: 180px;
  }
  .mw160 {
    max-width: 160px;
  }
  .mw140 {
    max-width: 140px;
  }
  .mw120 {
    max-width: 120px;
  }
  .mw100 {
    max-width: 100px;
  }
  .mw90 {
    max-width: 90px;
  }
  .mw30 {
    max-width: 30px;
  }
  .h140 {
    height: 140px;
    overflow: auto;
  }
  .editarea {
    &:hover {
      border: 1px solid $selected_color;
      background-color: $view_Title_background;
    }
  }
  .borderBottom {
    border-bottom: 1px solid $deepgreen;
  }
  .lightYellow {
    background-color: $view_Data_Read_background;
  }
  .valign {
    display: table;
    div {
      &:first-child {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
}
.editTextarea {
  textarea {
    height: 80vh !important;
  }
}

#keikakuIcrnDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 50%;
  width: 300px;
  max-width: 300px;
}
</style>
