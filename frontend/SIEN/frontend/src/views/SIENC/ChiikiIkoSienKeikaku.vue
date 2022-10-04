<template>
  <div id="chiikiIkoSienKeikaku">
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters>
        <v-col>
          <v-tabs class="tabrow" height="20" hide-slider v-model="tab">
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
      </v-row>
    </v-container>
    <v-container no-gutters fluid class="ma-0 pa-0">
      <v-tabs-items class="v-tabCont" v-model="tab">
        <v-tab-item value="ChiikiKeikakuList">
          <ChiikiKeikakuList></ChiikiKeikakuList>
        </v-tab-item>
        <v-tab-item value="ChiikiKeikakusyo1">
          Tab 2 Content assessment
        </v-tab-item>
        <v-tab-item value="ChiikiKeikakusyo2">
          Tab 3 Content assessment
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import ls from '@/utiles/localStorage';
import ChiikiKeikakuList from '../../components/ChiikiKeikakuList.vue';
// import ChiikiKeikakusyo1 from '../../components/ChiikiKeikakuList.vue';
// import ChiikiKeikakusyo2 from '../../components/ChiikiKeikakuList.vue';

export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    ChiikiKeikakuList,
  },
  computed: {},
  data: function () {
    return {
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        {
          name: '計画一覧',
          href: '#ChiikiKeikakuList',
          hrefval: 'ChiikiKeikakuList',
        },
        {
          name: '計画書（１）',
          href: '#ChiikiKeikakusyo1',
          hrefval: 'ChiikiKeikakusyo1',
        },
        {
          name: '計画書（２）',
          href: '#ChiikiKeikakusyo2',
          hrefval: 'ChiikiKeikakusyo2',
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
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#chiikiIkoSienKeikaku {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1350px !important;
  width: auto;

  .v-slide-group__wrapper {
    background-color: #588c73;
  }
  .parentTab {
    border: 1px solid;
    margin-right: 4px;
    margin-bottom: -2px;
    border-color: #588c73;
    height: 20px;
    color: $white;
    background: #588c73;
  }
  .v-tab--active {
    color: #333;
    background: #fff;
    border-color: #fff;
    margin-bottom: 4px;
  }
  .v-tabCont {
    border-top: 2px solid;
    border-color: $white;
  }
  .wj-cell {
    padding: 2px;
    padding-top: 1px;
  }
}
</style>
