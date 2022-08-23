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
            <v-row no-gutters>
              <v-col cols="1" class="mw200">
                <v-card class="pr-2 text-center" elevation="0" tile>
                  <label class="greyLabel">利用者名</label>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="pl-1" elevation="0" outlined tile> aaa </v-card>
              </v-col>
              <v-col cols="7">
                <v-row no-gutters class="justify-end">
                  <v-col cols="2" align="center"
                    ><label class="greyLabel">同意署名欄</label></v-col
                  >
                  <v-col cols="1" style="max-width: 25px" class="mt-1">
                    <input type="checkbox" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      outlined
                      value=""
                      hide-details="false"
                      height="24"
                      class="input-text lightYellow"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-row>
          <v-row no-gutters class="mt-2 borderBottom pb-2">
            <v-col class="mw100">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">入力</label>
              </v-card>
            </v-col>
            <v-col class="ml-2 mw100">
              <v-btn-toggle>
                <v-btn x-small>新規</v-btn>
                <v-btn x-small>修正</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col class="mw90">
              <v-card class="text-center" elevation="0" tile>
                <label class="greyLabel">作成日</label>
              </v-card>
            </v-col>
            <v-col class="mw160 ml-4">
              <v-btn
                x-small
                @click="inputCalendarClick(0)"
                tile
                outlined
                width="140px"
                height="24px"
                style="font-size: 12px"
                >{{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>
            </v-col>
            <v-col class="mw100 ml-n4">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel">計画区分</label>
              </v-card>
            </v-col>
            <v-col class="mw180 ml-1">
              <wj-menu
                class="customCombobox"
                :itemsSource="keikakuKubun"
                selectedValuePath="val"
                displayMemberPath="name"
                v-model="keikakuKubunModel"
                :itemClicked="onkeikakuKubun"
                style="width: 150px"
              >
              </wj-menu>
            </v-col>
            <v-col class="mw90 ml-n4">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel">作成者</label>
              </v-card>
            </v-col>
            <v-col class="ml-3 mw90">
              <v-card class="pl-1 mw90" elevation="0" outlined>
                竹下 道子
              </v-card>
            </v-col>
            <v-col class="mw160">
              <v-btn-toggle>
                <v-btn x-small>前回コピー</v-btn>
                <v-btn x-small>履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-2">
            <v-col class="mw120">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel w120">障害者支援区分</label>
              </v-card>
            </v-col>
            <v-col class="mw90 ml-2">
              <v-card class="pr-2 text-center lightYellow" elevation="0" tile>
                区分5
              </v-card>
            </v-col>
            <v-col class="mw200 ml-2">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel w200">障害福祉サービス受給者番号</label>
              </v-card>
            </v-col>
            <v-col class="mw120 ml-2">
              <v-card class="pr-2 text-center lightYellow" elevation="0" tile>
                11000011120
              </v-card>
            </v-col>
            <v-col class="mw200 ml-2">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel w200">地域相談支援受給者番号</label>
              </v-card>
            </v-col>
            <v-col class="mw160 ml-2">
              <v-card class="pr-2 text-center lightYellow" elevation="0" tile>
                &nbsp;
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1 borderBottom pb-2">
            <v-col class="mw120">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel w120">通所受給者番号</label>
              </v-card>
            </v-col>
            <v-col class="mw140 ml-2">
              <v-card class="pr-2 text-center lightYellow" elevation="0" tile>
                &nbsp;
              </v-card>
            </v-col>
            <v-col class="mw120 ml-2">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel w120">モニタリング期間</label>
              </v-card>
            </v-col>
            <v-col class="mw240 ml-2">
              <v-card elevation="0" outlined tile
                >毎月(当初3ヶ月)その後3ヶ月毎</v-card
              >
            </v-col>
            <v-col class="mw90 ml-2 ml-auto">
              <v-card class="pr-2 text-center" elevation="0" tile>
                <label class="greyLabel w90">入力内容</label>
              </v-card>
            </v-col>
            <v-col class="mw140 ml-2 mr-auto">
              <v-btn-toggle v-model="inputTypeModel" mandatory>
                <v-btn
                  x-small
                  v-for="value in inputType"
                  :key="value.key"
                  @click="inputTypePage(value.key)"
                  >{{ value.value }}</v-btn
                >
              </v-btn-toggle>
            </v-col>
          </v-row>
          <keikakuideaIkou v-if="inputTypeModel === 0"></keikakuideaIkou>
          <keikakuideaKadai v-if="inputTypeModel === 1"></keikakuideaKadai>
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
      inputTypeModel: 0, // 0:意向・方針 1:課題・支援
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

      leftWidth: '20%',
      rightWidth: '80%',
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
    /******************************
     * 入力内容切替ボタンを押下
     */
    inputTypePage(type) {
      this.inputTypeModel = type;
    },

    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '99%';
      } else {
        this.moveLeft = true;
        this.leftWidth = '20%';
        this.rightWidth = '80%';
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
  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 100px;
    &.w90 {
      width: 90px;
    }
    &.w120 {
      width: 120px;
    }
    &.w140 {
      width: 140px;
    }
    &.w200 {
      width: 200px;
    }
  }
  .input-text {
    font-size: 12px;
    min-width: 200px;
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
