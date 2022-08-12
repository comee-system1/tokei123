<template>
  <div id="MonitoringParent">
    <v-container no-gutters fluid class="ml-1 mr-1 mt-1 pa-0">
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
    </v-container>
    <v-container no-gutters fluid class="ma-0 pa-0">
      <v-tabs-items class="v-tabCont" v-model="tab">
        <v-tab-item value="KeikakuIcrn">
          <KeikakuIcrn></KeikakuIcrn>
        </v-tab-item>
        <v-tab-item value="Houkokusyo">
          <!-- <SoudanCount></SoudanCount> -->
          Tab 2 Content
        </v-tab-item>
        <v-tab-item value="SyukanKeikaku"> Tab 3 Content </v-tab-item>
        <v-tab-item value="TantousyaKaigi" eager>
          Tab 4 Content
          <!-- <SoudanCountUtiwake></SoudanCountUtiwake> -->
        </v-tab-item>
        <v-tab-item value="JissiIcrn"> Tab 5 Content </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import ls from '@/utiles/localStorage';
import KeikakuIcrn from '../../components/KeikakuIcrn.vue';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    KeikakuIcrn, //SoudanCount, SoudanCountUtiwake
  },
  data: function () {
    return {
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        { name: '計画一覧', href: '#KeikakuIcrn', hrefval: 'KeikakuIcrn' },
        {
          name: 'モニタリング報告書',
          href: '#Houkokusyo',
          hrefval: 'Houkokusyo',
        },
        {
          name: '週間計画書',
          href: '#SyukanKeikaku',
          hrefval: 'SyukanKeikaku',
        },
        {
          name: '担当者会議',
          href: '#TantousyaKaigi',
          hrefval: 'TantousyaKaigi',
        },
        {
          name: 'モニタリング実施一覧',
          href: '#JissiIcrn',
          hrefval: 'JissiIcrn',
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

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#MonitoringParent {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1350px !important;
  max-width: 1920px;
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
}
</style>
