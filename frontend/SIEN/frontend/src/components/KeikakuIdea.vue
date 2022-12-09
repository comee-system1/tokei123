<template>
  <div id="keikakuIdea" :style="styles">
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
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-card class="koumokuTitle titleMain ml-1 mr-1 wMin" outlined tile>
              入力
            </v-card>
            <v-btn-toggle mandatory color="light-blue darken-4" class="mr-1">
              <v-btn small elevation="2" height="20" class="body-2">新規</v-btn>
              <v-btn small elevation="2" height="20" class="body-2">修正</v-btn>
            </v-btn-toggle>
            <v-card class="koumokuTitle titleMain mr-1 wMin" outlined tile>
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

            <v-card class="koumokuTitle titleOrange mr-1 wMin" outlined tile>
              作成者
            </v-card>
            <v-card
              class="lightYellow pl-1 mr-1 body-2"
              width="140"
              elevation="0"
              height="21"
              tile
            >
              大正雅夫
            </v-card>
            <v-card class="ml-auto" elevation="0">
              <v-btn small elevation="2" height="19" class="ml-1 body-2"
                >前回コピー</v-btn
              >
              <v-btn small elevation="2" height="19" class="ml-1 body-2"
                >履歴参照</v-btn
              >
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
            <v-card class="koumokuTitle titleBlue fblue wLng" outlined tile>
              障害者支援区分
            </v-card>
            <v-card
              class="lightYellow ml-1 pl-1 body-2"
              width="100"
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
            <input
              type="text"
              class="border ml-1 wLong"
              v-model="viewdata.monikikan"
            />
          </v-row>
          <v-row no-gutters class="rowStyle mb-1">
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
              class="lightYellow ml-1 pl-1 body-2"
              width="100"
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
              class="lightYellow ml-1 pl-1 body-2"
              width="100"
              height="20"
              outlined
              tile
            >
              1100011120
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
            <v-btn small height="20" elevation="2">削除</v-btn>
            <v-spacer></v-spacer>
            <v-card class="d-flex" height="20" flat tile>
              <v-card outlined tile class="koumokuTitle wMin titleOrange">
                完了
              </v-card>
              <v-card elevation="0" width="30" class="text-center">
                <input type="checkbox" />
              </v-card>
              <v-card
                class="lightYellow pl-1 mr-1 body-2"
                width="240"
                height="20"
                outlined
                tile
              >
                2022/09/28 竹下道子
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

// import UserList from './UserList.vue';
import keikakuideaIkou from './KeikakuIdeaIkou.vue';
import keikakuideaKadai from './KeikakuideaKadai.vue';
import { getConnect } from '@connect/getConnect';
import printUtil from '@/utiles/printUtil';

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
      headerheight: 80,
      headerheightbody: 240,
      userdrawer: true,
      viewdata: {},
    };
  },
  created() {},
  mounted() {
    this.setUserdata(this.selectedUserObj);
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.$router.app.$off('print_event_global');
    this.$router.app.$on('print_event_global', this.printExec);
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  computed: {
    getymd() {
      if (this.picker == '') {
        return dayjs().format('YYYY年MM月DD日');
      } else {
        return dayjs(this.picker).format('YYYY年MM月DD日');
      }
    },
    styles() {
      // ブラウザの高さ
      return {
        // '--height': window.innerHeight - this.headerheight + 'px',
        // '--heightbody': window.innerHeight - this.headerheightbody + 'px',
      };
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
    setUserdata(item) {
      if (item != null) {
        this.userName = item.names;
        let params = {
          uniqid: 3,
          traceid: 123,
          keitype: 0,
          jigyoid: 62,
          intcode: item.riid,
          cntid: 1,
        };
        getConnect('/Keikakuan', params, 'SIENP').then((result) => {
          console.log(12345);
          console.log(result);
          this.viewdata = result;
          if (result.intcode != undefined) {
            this.picker =
              result.mymd.slice(0, 4) +
              '-' +
              result.mymd.slice(4, 6) +
              '-' +
              result.mymd.substring(6, 8);
          }
          this.$refs.childikou.setViewData(result);
          this.$refs.childkadai.setViewData(result);
        });
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
        this.rightWidth = '1040px';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '1040px';
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
      console.log(anItem);
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
</style>
