<template>
  <div id="keikakuIdea" :style="styles">
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
          <v-row no-gutters class="rowStyle_Dark mb-1 mt-1">
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
                height="20"
              >
                {{ userName }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
              入力
            </v-card>
            <v-btn-toggle mandatory>
              <v-btn small height="20">新規入力</v-btn>
              <v-btn small height="20">内容更新</v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle titleMain ml-1 wMin" outlined tile>
              作成日
            </v-card>
            <v-card
              class="pl-1 ml-1"
              width="140"
              outlined
              tile
              @click="inputCalendarClick(0)"
            >
              {{ getYm }}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
            <v-card class="koumokuTitle titleOrange ml-1 wMin" outlined tile>
              作成者
            </v-card>
            <v-card
              class="lightYellow pl-1 ml-1"
              width="140"
              elevation="0"
              tile
            >
              大正雅夫
            </v-card>
            <v-card class="ml-auto" elevation="0">
              <v-btn small height="20" class="ml-1">前回コピー</v-btn>
              <v-btn small height="20" class="ml-1">履歴参照</v-btn>
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <v-card class="koumokuTitle titleBlue fblue wMdl" outlined tile>
              障害者支援区分
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1"
              width="140"
              height="20"
              outlined
              tile
            >
              区分5
            </v-card>
            <v-card
              class="koumokuTitle titleBlue fblue wMdl ml-1"
              outlined
              tile
            >
              モニタリング期間
            </v-card>
            <input type="text" class="border ml-1 tlong" />
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <v-card class="koumokuTitle titleBlue fblue wMdl" outlined tile>
              障害者福祉ｻｰﾋﾞｽ受給者番号
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1"
              width="140"
              height="20"
              outlined
              tile
            >
              1100011120
            </v-card>
            <v-card
              class="koumokuTitle titleBlue fblue wMdl ml-1"
              outlined
              tile
            >
              地域相談支援受給者番号
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1"
              width="140"
              height="20"
              outlined
              tile
            >
              1100011120
            </v-card>
            <v-card
              class="koumokuTitle titleBlue fblue wMdl ml-1"
              outlined
              tile
            >
              通所受給者証番号
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1"
              width="140"
              height="20"
              outlined
              tile
            >
              1100011120
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1 mt-1">
            <v-col>
              <v-tabs
                v-model="inputTypemodel"
                class="mSizeCommonTab"
                color="rgba(255, 0, 0, 0)"
                height="24"
              >
                <v-tab
                  v-for="value in inputType"
                  :key="value.key"
                  active-class="act"
                  :href="'#tab-' + value.key"
                >
                  {{ value.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-col class="text-end">
              <v-btn-toggle tile v-if="inputTypemodel == 'tab-2'">
                <v-btn small @click="rowSort('view')">順変更</v-btn>
                <v-btn small @click="rowAdd('view')">行追加</v-btn>
                <v-btn small @click="rowDelete('view')">行削除</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <div class="mt-2">
            <keikakuideaKadai ref="childkadai"></keikakuideaKadai>
            <keikakuideaIkou ref="childikou"></keikakuideaIkou>
          </div>
          <v-row dense class="ma-2" justify="space-between">
            <v-col cols="4">
              <v-btn small>削除</v-btn>
            </v-col>
            <v-col cols="7">
              <v-card class="d-flex justify-end" flat tile>
                <v-card outlined tile class="koumokuTitle wMin titleOrange"
                  >完了
                </v-card>
                <v-card elevation="0" width="30" class="text-center mt-1">
                  <input type="checkbox" />
                </v-card>
                <v-card
                  class="lightYellow pl-1 ml-1"
                  width="240"
                  height="20"
                  outlined
                  tile
                >
                  2022/09/28 竹下道子
                </v-card>
                <v-btn small class="ml-3" @click="ideaIkouKadaiRegist"
                  >登録</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
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
        id="KeikakuListsDatepicker"
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
import dayjs from 'dayjs';

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
      rightWidth: '78.5%',
      moveLeft: true,
      datepicker_dialog: false,
      picker: '',
      getYm:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      keikakuKubun: [
        { id: 0, name: 'サービス等利用計画' },
        { id: 1, name: 'サービス等利用計画2' },
      ],
      keikakuKubunModel: '',
      userName: '',
      headerheight: 60,
    };
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
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
    calculateWindowHeight() {
      console.log('resize');
      if (document.getElementById('keikakuIdea') != null) {
        document.getElementById('keikakuIdea').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
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
        dayjs().format('YYYY') +
        '-' +
        dayjs().format('MM') +
        '-' +
        dayjs().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = dayjs(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
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
      // 意向・方針と課題・支援の両方の登録処理の実行
      this.$refs.childkadai.registButton();
      this.$refs.childikou.registButton();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuIdea {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  height: var(--height);
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
    div {
      height: 21px;
      min-height: 21px;
      margin-top: -1px;
    }
  }
  .w100p {
    width: 100%;
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

#KeikakuListsDatepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
</style>
