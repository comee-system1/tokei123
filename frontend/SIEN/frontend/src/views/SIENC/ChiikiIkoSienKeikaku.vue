<template>
  <div id="chiikiIkoSienKeikaku">
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters>
        <v-tabs class="commonTab" hide-slider height="32" v-model="tab">
          <v-tab
            v-for="item in menuItem"
            :key="item.val"
            :href="item.href"
            @change="tabsChange(item.hrefval)"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-row>
      <v-row no-gutters>
        <div :style="{ width: leftWidth }" v-if="tab != 'ChiikiKeikakuList'">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </div>
        <div
          :style="
            tab == 'ChiikiKeikakuList'
              ? 'width: 100%'
              : 'width: calc(100% - 280px)'
          "
        >
          <v-tabs-items v-model="tab">
            <v-tab-item value="ChiikiKeikakuList" transition="none">
              <ChiikiKeikakuList></ChiikiKeikakuList>
            </v-tab-item>
            <v-tab-item value="ChiikiKeikakusyo1" transition="none">
              <ChiikiKeikakusyo1></ChiikiKeikakusyo1>
            </v-tab-item>
            <v-tab-item value="ChiikiKeikakusyo2" transition="none">
              <ChiikiKeikakusyo2></ChiikiKeikakusyo2>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ls from '@/utiles/localStorage';
import UserList from '../../components/UserList.vue';
import ChiikiKeikakuList from '../../components/ChiikiKeikakuList.vue';
import ChiikiKeikakusyo1 from '../../components/ChiikiKeikakusyo1.vue';
import ChiikiKeikakusyo2 from '../../components/ChiikiKeikakusyo2.vue';

export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    UserList,
    ChiikiKeikakuList,
    ChiikiKeikakusyo1,
    ChiikiKeikakusyo2,
  },
  computed: {},
  data: function () {
    return {
      leftWidth: '280px',
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
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
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
  font-size: 14px;
  font-family: 'メイリオ';
  max-width: 1920px;
}
</style>
