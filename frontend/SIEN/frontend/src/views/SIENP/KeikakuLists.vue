<template>
  <div id="keikakulists">
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters class="mt-2">
        <v-col>
          <v-tabs height="20" hide-slider v-model="tab">
            <v-tab
              v-for="item in menuItem"
              :key="item.val"
              class="parentTab"
              :href="item.href"
              @change="tabsChange(item.hrefval)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col v-if="tab == 'idea' || tab == 'plan' || tab == 'state'">
          <v-row class="yosikiMenu" no-gutters>
            <v-col cols="1">
              <label> 様式 </label>
            </v-col>
            <v-col cols="10" class="ml-1">
              <v-tabs height="20">
                <v-tab
                  v-for="yosikiValue in yosikiArray"
                  :key="yosikiValue.key"
                  @change="tabsYosikiChange(yosikiValue.key)"
                  >{{ yosikiValue.name }}</v-tab
                >
              </v-tabs>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container no-gutters fluid class="ma-0 pa-0">
      <v-tabs-items class="v-tabCont" v-model="tab">
        <v-tab-item value="KeikakuIcrn">
          <KeikakuIcrn></KeikakuIcrn>
        </v-tab-item>
        <v-tab-item value="state">
          <AttendeeState></AttendeeState>
        </v-tab-item>
        <v-tab-item value="assessment">
          <!-- <SoudanCount></SoudanCount> -->
          Tab 2 Content assessment
        </v-tab-item>
        <v-tab-item value="basic"> Tab 3 Content assessment </v-tab-item>
        <v-tab-item value="idea" eager>
          <div v-if="tab == 'idea'">
            <KeikakuIdea v-if="ideaFlag == 'create'"></KeikakuIdea>
            <KeikakuWeek3 v-if="ideaFlag == 'weekplan3'"></KeikakuWeek3>
          </div>
        </v-tab-item>
        <v-tab-item value="plan">
          <div v-if="tab == 'plan'">
            <KeikakuPlan v-show="planFlag == 'create'"></KeikakuPlan>
            <KeikakuWeek v-show="planFlag == 'weekplan'"></KeikakuWeek>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
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
      ideaFlag: 'create', //create:計画案作成 weekplan:週間計画表
      planFlag: 'create', //create:計画案作成 weekplan:週間計画表
      yosikiMenu: [
        {
          key: 'create',
          name: '計画案作成',
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
    },
    tabsYosikiChange(value) {
      this.ideaFlag = value;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#keikakulists {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1350px !important;
  width: auto;

  .parentTab {
    border: 1px solid;
    margin-right: 4px;
    margin-bottom: -2px;
    border-color: $light-gray;
    height: 25px;
  }
  .v-tab--active {
    color: $white;

    background: #1976d2;
    border-color: #1976d2;
  }
  .v-tabCont {
    border-top: 2px solid;
    border-color: #1976d2;
  }
  .wj-cell {
    padding: 2px;
    padding-top: 1px;
  }

  .yosikiMenu {
    div {
      &.v-tab {
        background-color: $grid_selected_background;
        color: canvastext;
        &--active {
          color: blue;
        }
      }
      label {
        background-color: $deepgreen;
        width: 100%;
        display: block;
        color: $white;
        text-align: center;
        height: 20px;
      }
    }
  }
}
</style>
