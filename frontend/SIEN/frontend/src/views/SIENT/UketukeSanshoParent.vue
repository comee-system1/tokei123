<template>
  <div id="UketukeSansho">
    <div class="commonTab">
      <v-container no-gutters fluid class="pa-0">
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
      </v-container>
      <v-container no-gutters fluid class="pa-0">
        <v-tabs-items v-model="tab">
          <v-tab-item value="Sansyo" transition="none">
            <UketukeIcrn></UketukeIcrn>
          </v-tab-item>
          <v-tab-item value="SoudanCount" transition="none">
            <SoudanCount></SoudanCount>
          </v-tab-item>
          <v-tab-item value="SoudanCountUtiwake" transition="none">
            <SoudanCountUtiwake></SoudanCountUtiwake>
          </v-tab-item>
          <v-tab-item value="RiyouCheck" transition="none">
            Tab 5 Content
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </div>
  </div>
</template>

<script>
import UketukeIcrn from '../../components/UketukeIcrn.vue';
import SoudanCount from '../../components/SoudanCount.vue';
import SoudanCountUtiwake from '../../components/SoudanCountUtiwake.vue';
import ls from '@/utiles/localStorage';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: { UketukeIcrn, SoudanCount, SoudanCountUtiwake },
  data: function () {
    return {
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        { name: '相談一覧', href: '#Sansyo', hrefval: 'Sansyo' },
        { name: '相談件数', href: '#SoudanCount', hrefval: 'SoudanCount' },
        {
          name: '件数内訳',
          href: '#SoudanCountUtiwake',
          hrefval: 'SoudanCountUtiwake',
        },
        { name: '利用チェック', href: '#RiyouCheck', hrefval: 'RiyouCheck' },
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

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#UketukeSansho {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1300px !important;
  max-width: 1920px;
  width: auto;
}
</style>
