<template>
  <div id="chiikiKeikakusyo2" style="width: 100%">
    <v-container class="ml-1 pa-0 pr-2">
      <v-row no-gutters>
        <v-col class="ml-1">
          <v-row no-gutters class="rowStyle_Dark my-1">
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
          <v-row no-gutters class="rowStyle my-1">
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
              入力
            </v-card>
            <v-btn-toggle
              class="flex-wrap mr-1"
              color="light-blue darken-4"
              mandatory
            >
              <v-btn
                v-for="n in inputList"
                :key="n.val"
                elevation="2"
                outlined
                width="25"
                height="19"
                @click="inputClicked(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle titleMain mr-1 ml-1 wMin" outlined tile>
              作成日
            </v-card>

            <v-card
              class="ml-1"
              width="140"
              height="20"
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
              <v-btn
                elevation="2"
                class="mr-1 body-2"
                height="19"
                @click="copyClicked()"
              >
                前回ｺﾋﾟｰ
              </v-btn>
              <v-btn
                elevation="2"
                class="mr-1 body-2"
                height="19"
                v-on:click.stop="drawer = !drawer"
              >
                履歴参照
              </v-btn>
            </v-card>
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
              v-if="inputTypemodel == 'tab-2'"
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

          <div class="mt-0">
            <div id="scrollbody">
              <chiikiKeikakusyo2Zentai
                ref="childzentai"
                v-if="inputTypemodel == 'tab-0'"
              ></chiikiKeikakusyo2Zentai>
              <chiikiKeikakusyo2Ikou
                ref="childikou"
                v-if="inputTypemodel == 'tab-1'"
              ></chiikiKeikakusyo2Ikou>
              <chiikiKeikakusyo2Kadai
                ref="childkadai"
                v-if="inputTypemodel == 'tab-2'"
              ></chiikiKeikakusyo2Kadai>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="rowStyle my-2">
        <v-btn elevation="2" height="19"> 削除 </v-btn>
        <v-card
          class="koumokuTitle titleOrange pa-1 mr-1 ml-auto"
          outlined
          tile
          width="50"
        >
          完了
        </v-card>
        <input type="checkbox" class="mr-1" />
        <v-card class="koumokuData pa-1 pr-1 mr-1" width="200" outlined tile>
        </v-card>
        <v-btn elevation="2" height="19" @click="regist()"> 登録 </v-btn>
      </v-row>
    </v-container>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="chiikiKeikakusyo2Datepicker"
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
import ChiikiKeikakusyo2Zentai from './ChiikiKeikakusyo2Zentai.vue';
import ChiikiKeikakusyo2Ikou from './ChiikiKeikakusyo2Ikou.vue';
import ChiikiKeikakusyo2Kadai from './ChiikiKeikakusyo2Kadai.vue';

export default {
  components: {
    ChiikiKeikakusyo2Zentai,
    ChiikiKeikakusyo2Ikou,
    ChiikiKeikakusyo2Kadai,
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  data() {
    return {
      leftWidth: '280px',
      rightWidth: '78.5%',
      userName: '',
      picker: '',
      datepicker_dialog: false,
      getYm:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      headerheight: 100,
      value: 'ssss\nddddd\nfff',
      inputList: [
        { val: 0, name: '新規' },
        { val: 1, name: '修正' },
      ],

      inputTypemodel: 'tab-1',
      inputType: [
        {
          key: 0,
          value: '全体',
        },
        {
          key: 1,
          value: '意向・方針',
        },
        {
          key: 2,
          value: '課題・支援',
        },
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('chiikiKeikakusyo2') != null) {
        document.getElementById('chiikiKeikakusyo2').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
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
      this.datepicker_dialog = false;
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
    inputClicked(kbn) {
      //dummy code
      let a = [kbn];
      a.length = 1;
    },
    regist() {
      if (this.inputTypemodel == 'tab-0') {
        this.$refs.childzentai.regist();
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#chiikiKeikakusyo2 {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: 100% !important;

  div.commonTab {
    .v-slide-group__content {
      border-bottom: 0px;
    }
  }

  .v-app-bar-title__content {
    width: 100%;
  }
  .lightYellow {
    background-color: $light_yellow;
  }
}
.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense)
  textarea {
  margin-top: 4px;
}

#chiikiKeikakusyo2Datepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
</style>
