<template>
  <v-container no-gutters fluid class="pa-0">
    <v-row no-gutters class="commonTab" style="width: 100%">
      <v-col>
        <v-card class="d-flex flex-row" flat tile>
          <v-tabs height="20" hide-slider v-model="tab">
            <v-tab
              v-for="item in menuItem"
              :key="item.val"
              :href="item.href"
              @change="tabsChange(item.hrefval)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
          <v-card id="yousikiLabel" tile v-if="yousikiLabel">様式</v-card>
          <v-tabs height="20" v-model="subtab">
            <v-tab
              v-for="yosikiValue in yosikiArray"
              :key="yosikiValue.key"
              @change="tabsYosikiChange(yosikiValue.key)"
              >{{ yosikiValue.name }}</v-tab
            >
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tab">
      <v-tab-item value="KeikakuIcrn" :eager="true">
        <KeikakuIcrn></KeikakuIcrn>
      </v-tab-item>
      <v-tab-item value="state" :eager="true">
        <AttendeeState></AttendeeState>
      </v-tab-item>
      <v-tab-item value="idea" :eager="true">
        <div v-if="tab == 'idea'">
          <KeikakuIdea v-if="ideaFlag == 'create'"></KeikakuIdea>
          <KeikakuWeek3 v-if="ideaFlag == 'weekplan3'"></KeikakuWeek3>
        </div>
      </v-tab-item>
      <v-tab-item value="plan" :eager="true">
        <div v-if="tab == 'plan'">
          <KeikakuPlan v-show="planFlag == 'create'"></KeikakuPlan>
          <KeikakuWeek v-show="planFlag == 'weekplan'"></KeikakuWeek>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ls from '@/utiles/localStorage';
import KeikakuIcrn from '../../components/KeikakuLists.vue';
import AttendeeState from '../../components/AttendeeState.vue';
import KeikakuIdea from '../../components/KeikakuIdea.vue';
import KeikakuPlan from '../../components/KeikakuPlan.vue';
import KeikakuWeek from '../../components/KeikakuWeek.vue';
import KeikakuWeek3 from '../../components/KeikakuWeek3.vue';

export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    KeikakuIcrn, //SoudanCount, SoudanCountUtiwake
    AttendeeState,
    KeikakuIdea,
    KeikakuPlan,
    KeikakuWeek,
    KeikakuWeek3,
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
            key: this.yosikiMenu[i].key,
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
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      subtab: 0,
      ideaFlag: 'create', //create:計画案作成 weekplan:週間計画表
      planFlag: 'create', //create:計画案作成 weekplan:週間計画表
      yousikiLabel: false,
      yosikiMenu: [
        {
          key: 'create',
          name: '計画案',
          group: 1,
        },
        {
          key: 'weekplan3',
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
        { name: '計画一覧', href: '#KeikakuIcrn', hrefval: 'KeikakuIcrn' },

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
    };
  },
  watch: {
    selectedData() {
      // 子供に受け渡すだけ
    },
  },
  methods: {
    tabsChange(hrefval) {
      ls.setlocalStorageEncript(ls.KEY.SansyoTab, hrefval);
      //alert(hrefval);
      this.yousikiLabel = false;
      // alert(this.ideaFlag);
      if (hrefval == 'idea') {
        this.ideaFlag = 'create';
      }
      if (hrefval == 'state' || hrefval == 'idea' || hrefval == 'plan') {
        this.yousikiLabel = true;
      }
      this.subtab = 0;
    },
    tabsYosikiChange(value) {
      this.ideaFlag = value;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#yousikiLabel {
  height: 20px;
  width: 80px;
  background-color: $view_Title_font_color_Green;
  color: $white;
  text-align: center;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 43%;
}
</style>
