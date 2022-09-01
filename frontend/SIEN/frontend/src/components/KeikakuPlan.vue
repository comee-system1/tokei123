<template>
  <div id="keikakuPlan">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row no-gutters class="mt-1">
            <v-card class="d-flex justify-start" flat tile>
              <v-card
                outlined
                tile
                width="60"
                class="text-center label text-caption"
              >
                利用者名
              </v-card>
              <v-card
                width="100"
                class="ml-1 pl-1 text-caption"
                elevation="0"
                outlined
                tile
              >
                {{ selectName }}
              </v-card>
            </v-card>

            <v-card class="d-flex justify-end" flat tile>
              <v-card
                outlined
                tile
                width="80"
                class="text-center ml-1 label text-caption"
                v-if="inputTypemodel == 'tab-0'"
                >同意署名欄
              </v-card>
              <v-card
                outlined
                tile
                width="60"
                class="text-center text-caption label ml-1"
                v-if="inputTypemodel == 'tab-1'"
                >完了
              </v-card>
              <v-card
                class="lightYellow pl-1 ml-1 text-caption"
                width="120"
                outlined
                tile
              >
                竹下道子
              </v-card>
              <v-card
                outlined
                tile
                width="60"
                class="text-center ml-1 label text-caption"
                >作成日
              </v-card>
              <v-card
                class="pl-1 ml-1 text-caption"
                width="120"
                outlined
                tile
                @click="inputCalendarClick(0)"
              >
                {{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>
              <v-card
                outlined
                tile
                width="70"
                class="text-center ml-1 label text-caption"
                >計画区分
              </v-card>
              <wj-menu
                class="customCombobox ml-1 text-caption"
                :itemsSource="keikakuKubun"
                selectedValuePath="val"
                displayMemberPath="name"
                v-model="keikakuKubunModel"
                :itemClicked="onkeikakuKubun"
                style="border-radius: 0px !important"
              >
              </wj-menu>
              <v-card
                outlined
                tile
                width="60"
                class="text-center ml-1 label text-caption"
                >作成者
              </v-card>
              <v-card
                class="lightYellow pl-1 ml-1 text-caption"
                width="120"
                outlined
                tile
              >
                竹下道子
              </v-card>
            </v-card>
            <div v-if="inputTypemodel == 'tab-0'">
              <v-card class="d-flex justify-start mt-1" flat tile>
                <v-card
                  outlined
                  tile
                  class="text-center label text-caption text-no-wrap"
                >
                  障害者支援区分
                </v-card>
                <v-card
                  class="lightYellow text-center ml-1 text-caption"
                  width="50"
                  outlined
                  tile
                >
                  区分5
                </v-card>
                <v-card
                  outlined
                  tile
                  class="text-center ml-1 label text-caption text-no-wrap"
                >
                  障害福祉ｻｰﾋﾞｽ受給者番号
                </v-card>
                <v-card
                  class="lightYellow text-center ml-1 text-caption"
                  width="100"
                  outlined
                  tile
                >
                  11000011120
                </v-card>
                <v-card
                  outlined
                  tile
                  class="text-center ml-1 label text-caption text-no-wrap"
                >
                  地域相談支援受給者番号
                </v-card>
                <v-card
                  class="lightYellow text-center ml-1 text-caption"
                  width="100"
                  outlined
                  tile
                >
                </v-card>
                <v-card
                  outlined
                  tile
                  class="text-center ml-1 label text-caption text-no-wrap"
                >
                  通所受給者番号
                </v-card>
                <v-card
                  class="lightYellow text-center ml-1 text-caption"
                  width="100"
                  outlined
                  tile
                >
                </v-card>
                <v-card
                  outlined
                  tile
                  class="text-center ml-1 label text-caption text-no-wrap"
                >
                  ﾓﾆﾀﾘﾝｸﾞ期間
                </v-card>
                <v-text-field
                  class="pa-0 ma-0 ml-1 input-text text-caption"
                  hide-details="false"
                  outlined
                  dense
                  :full-width="true"
                  :value="' '"
                >
                </v-text-field>
              </v-card>
            </div>
          </v-row>

          <v-row no-gutters class="mt-1 pb-2">
            <v-col cols="6">
              <v-btn-toggle>
                <v-btn small>新規入力</v-btn>
                <v-btn small>内容更新</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6" align="right">
              <v-btn-toggle>
                <v-btn small>計画案コピー</v-btn>
                <v-btn small>履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-card class="d-flex justify-start" flat tile>
            <v-tabs height="25" v-model="inputTypemodel">
              <v-tab
                class="text-caption"
                v-for="value in inputType"
                :key="value.key"
                style="height: 25px"
                :href="'#tab-' + value.key"
              >
                {{ value.value }}</v-tab
              >
            </v-tabs>

            <v-btn-toggle tile v-if="inputTypemodel == 'tab-1'">
              <v-btn small>行追加</v-btn>
              <v-btn small>行削除</v-btn>
            </v-btn-toggle>
          </v-card>

          <v-tabs-items v-model="inputTypemodel">
            <v-tab-item value="tab-0">
              <keikakuPlanIkou></keikakuPlanIkou>
            </v-tab-item>
            <v-tab-item value="tab-1">
              <keikakuPlanKadai></keikakuPlanKadai>
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
import keikakuPlanIkou from './keikakuPlanIkou.vue';
import keikakuPlanKadai from './keikakuPlanKadai.vue';
// import { keikaku } from '@backend/api/Keikaku';
export default {
  props: {
    dispHideBar: Boolean,
  },
  components: {
    UserList,
    keikakuPlanIkou,
    keikakuPlanKadai,
  },
  data() {
    return {
      keikakuPlanData: [],
      selectName: '',
      inputTypemodel: 'tab-0', // tab-0:意向・方針 tab-1:課題・支援
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
      rightWidth: '78.5%',
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
      this.selectName = row.names;
      // keikaku().then((result) => {
      //   //データ取得
      //   this.keikakuPlanData = result;
      // });
    },

    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '99%';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '78.5%';
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

div#keikakuPlan {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  div.label {
    background-color: $light-gray;
  }
  .input-text {
    font-size: 12px;
    border-radius: 4px !important;
    div {
      height: 24px;
      min-height: 24px;
    }
  }
  .caption-left {
    background-color: $view_Data_Read_background;
    width: 185px;
    height: 83px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    text-align: center;
  }
  .caption-right {
    width: calc(100% - 193px);
    padding: 4px 0 4px 4px;
    height: 83px;
    line-height: 25px;
    overflow-y: scroll;
    .v-card--link:before {
      background: $white;
    }
    &:hover {
      border: 1px solid $selected_color;
      background-color: $view_Title_background;
    }
  }
  .editarea {
    &:hover {
      border: 1px solid $selected_color;
      background-color: $view_Title_background;
    }
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
