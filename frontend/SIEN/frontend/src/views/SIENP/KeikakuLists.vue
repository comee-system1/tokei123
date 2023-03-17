<template>
  <v-container no-gutters fluid class="pa-0" style="max-width: 100%">
    <v-row no-gutters>
      <v-col>
        <v-card class="commonTab d-flex flex-row" flat tile>
          <v-tabs hide-slider class="wTabShort" v-model="tab">
            <v-tab
              v-for="item in menuItem"
              :key="item.val"
              :href="item.href"
              @change="tabsChange(item.hrefval)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>

          <v-tabs v-model="subtab" class="wTabShort" hide-slider>
            <v-card
              id="yousikiLabel"
              tile
              v-if="yousikiLabel"
              class="body-2 mt-0"
            >
              様式
            </v-card>
            <v-tab
              v-for="yosikiValue in yosikiArray"
              :key="yosikiValue.key"
              @change="tabsYosikiChange(yosikiValue.key)"
            >
              {{ yosikiValue.name }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-layout no-gutters class="pa-1">
        <v-col
          no-gutters
          class="pa-0 mr-1"
          :style="{ 'max-width': leftWidth }"
          v-show="
            tab == 'state' ||
            (tab == 'idea' && userdrawer) ||
            (tab == 'plan' && userdrawer)
          "
        >
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col no-gutters class="pa-0">
          <v-tab-item value="KeikakuLists" transition="none">
            <KeikakuLists @an-select="anSelect"></KeikakuLists>
          </v-tab-item>
          <v-tab-item value="state" transition="none">
            <AttendeeState
              :selectedUserObj="selectedUserObj"
              ref="state"
            ></AttendeeState>
          </v-tab-item>
          <v-tab-item value="idea" transition="none" eager>
            <div v-show="tab == 'idea'">
              <KeikakuIdea
                :selectedUserObj="selectedUserObj"
                @userDispChange="userdrawer = $event"
                v-show="ideaFlag == 'create'"
                ref="create"
              ></KeikakuIdea>
              <weekPlan
                v-show="ideaFlag == yosikiMenu[1].key"
                :ref="yosikiMenu[1].key"
                :kubun="3"
              ></weekPlan>
            </div>
          </v-tab-item>
          <v-tab-item value="plan" transition="none">
            <div v-show="tab == 'plan'">
              <KeikakuIdea2
                :selectedUserObj="selectedUserObj"
                @userDispChange="userdrawer = $event"
                v-show="ideaFlag == 'create'"
                ref="plan"
              ></KeikakuIdea2>
              <!--
              <KeikakuPlan
                :selectedUserObj="selectedUserObj"
                v-show="ideaFlag == 'create'"
                ref="plan"
              ></KeikakuPlan>
              -->
              <weekPlan2
                v-show="ideaFlag == yosikiMenu[1].key2"
                :ref="yosikiMenu[1].key2"
                :kubun="4"
              ></weekPlan2>
            </div>
          </v-tab-item>
        </v-col>
      </v-layout>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ls from '@/utiles/localStorage';
import KeikakuLists from '../../components/KeikakuLists.vue';
import AttendeeState from '../../components/AttendeeState.vue';
import KeikakuIdea from '../../components/KeikakuIdea.vue';
import KeikakuIdea2 from '../../components/KeikakuIdea.vue';
// import KeikakuPlan from '../../components/KeikakuPlan.vue'; // KeikakuPlan.vue不要確認？
//import KeikakuWeek from '../../components/KeikakuWeek.vue'; // keikakuweek.vue不要確認？2,3も併せて
import weekPlan from '../../components/WeekPlan.vue';
import weekPlan2 from '../../components/WeekPlan.vue'; //計画作成の週間計画表のためコンポーネント名を変更して利用
import UserList from '../../components/UserList.vue';

export default {
  components: {
    KeikakuLists,
    AttendeeState,
    KeikakuIdea,
    KeikakuIdea2,
    // KeikakuPlan,
    //  KeikakuWeek,
    weekPlan,
    weekPlan2,
    UserList,
  },

  mounted() {
    if (this.tab == 'state' || this.tab == 'idea' || this.tab == 'plan') {
      this.yousikiLabel = true;
    }
  },
  computed: {
    yosikiArray() {
      let yosikiMenu = [];
      for (let i = 0; i < this.yosikiMenu.length; i++) {
        if (
          (this.tab == 'state' && this.yosikiMenu[i].group == 2) ||
          ((this.tab == 'idea' || this.tab == 'plan') &&
            this.yosikiMenu[i].group == 1)
        ) {
          yosikiMenu.push({
            key:
              this.tab == 'idea'
                ? this.yosikiMenu[i].key
                : this.yosikiMenu[i].key2,
            name: this.yosikiMenu[i].name,
            group: this.yosikiMenu[i].group,
          });
        }
      }
      return yosikiMenu;
    },
  },
  data: function () {
    return {
      leftWidth: '280px',
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      subtab: 0,
      ideaFlag: 'create', //create:計画案作成 weekPlan:週間計画表
      planFlag: 'create', //create:計画案作成 weekPlan:週間計画表
      yousikiLabel: false,
      yosikiMenu: [
        {
          key: 'create',
          key2: 'create',
          name: '計画案',
          group: 1,
        },
        {
          key: 'weekPlan',
          key2: 'weekPlan2',
          name: '週間計画表',
          group: 1,
        },
        {
          key: 'basic',
          name: '基本情報',
          group: 2,
        },
        {
          key: 'present',
          name: '現在の生活',
          group: 2,
        },
      ],
      menuItem: [
        { name: '計画一覧', href: '#KeikakuLists', hrefval: 'KeikakuLists' },

        {
          name: '申請者の状況',
          href: '#state',
          hrefval: 'state',
        },

        // {
        //   name: 'アセスメント',
        //   href: '#assessment',
        //   hrefval: 'assessment',
        // },
        // {
        //   name: '基本情報',
        //   href: '#basic',
        //   hrefval: 'basic',
        // },
        {
          name: '計画案作成',
          href: '#idea',
          hrefval: 'idea',
        },

        {
          name: '計画作成',
          href: '#plan',
          hrefval: 'plan',
        },
      ],
      selectedUserObj: {},
      userdrawer: true,
    };
  },
  methods: {
    tabsChange(hrefval) {
      this.tab = hrefval;
      ls.setlocalStorageEncript(ls.KEY.SansyoTab, hrefval);
      //alert(hrefval);
      this.yousikiLabel = false;
      // alert(this.ideaFlag);
      if (hrefval == 'idea' || hrefval == 'plan') {
        this.ideaFlag = 'create';
      }
      if (hrefval == 'state' || hrefval == 'idea' || hrefval == 'plan') {
        this.yousikiLabel = true;
      }
      this.subtab = 0;
      if (this.selectedUserObj != null) {
        this.setUserSelectPoint(this.selectedUserObj);
      }
    },
    tabsYosikiChange(value) {
      this.ideaFlag = value;
      // weekPlanを指定
      if (value == this.yosikiMenu[1].key) {
        this.$refs.weekPlan.setPrintEvent();
      }
      if (value == this.yosikiMenu[1].key2) {
        this.$refs.weekPlan2.setPrintEvent();
      }
      // 計画案を指定
      if (value == this.yosikiMenu[0].key) {
        this.$refs.create.setPrintEvent();
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.selectedUserObj = row;
      if (this.tab == 'state') {
        if (this.$refs.state != undefined) {
          this.$refs.state.setUserdata(row);
        }
      }
      if (this.tab == 'idea') {
        if (this.$refs.create != undefined) {
          this.$refs.create.setUserdata(row);
          this.$refs.weekPlan.setUserdata(row);
        }
      }
      if (this.tab == 'plan') {
        if (this.$refs.plan != undefined) {
          this.$refs.plan.setUserdata(row);
          this.$refs.weekPlan2.setUserdata(row);
        }
      }
    },
    anSelect(anItem) {
      this.tabsChange(this.menuItem[2].hrefval);
      this.$refs.create.setDataFromKeikauList(anItem);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#yousikiLabel {
  height: 20px;
  width: 80px;
  min-width: 80px;
  background-color: $view_Title_font_color_Green;
  color: $white;
  text-align: center;
}
</style>
