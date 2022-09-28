<template>
  <div id="monitoringParent">
    <v-container no-gutters fluid class="mt-1 pa-0">
      <v-tabs height="30" hide-slider v-model="tab" class="pl-1">
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
        <v-tab-item value="KeikakuIcrn" transition="none">
          <KeikakuIcrn></KeikakuIcrn>
        </v-tab-item>
        <v-tab-item value="Houkokusyo" transition="none">
          <MonitoringHoukokusho></MonitoringHoukokusho>
        </v-tab-item>
        <v-tab-item value="SyukanKeikaku" transition="none">
          <MonitoringSyukanKeikaku></MonitoringSyukanKeikaku>
        </v-tab-item>
        <v-tab-item value="MonitoringJissiIcrn" transition="none">
          <MonitoringJissiIcrn></MonitoringJissiIcrn>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import ls from '@/utiles/localStorage';
import KeikakuIcrn from '../../components/MonitoringYoteiIcrn.vue';
import MonitoringJissiIcrn from '../../components/MonitoringJissiIcrn.vue';
import MonitoringHoukokusho from '../../components/MonitoringHoukokusho.vue';
import MonitoringSyukanKeikaku from '../../components/MonitoringSyukanKeikaku.vue';

export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    KeikakuIcrn,
    MonitoringJissiIcrn,
    MonitoringHoukokusho,
    MonitoringSyukanKeikaku,
  },
  data: function () {
    return {
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        {
          name: 'モニタリング予定一覧',
          href: '#KeikakuIcrn',
          hrefval: 'KeikakuIcrn',
        },
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
          name: 'モニタリング実施一覧',
          href: '#MonitoringJissiIcrn',
          hrefval: 'MonitoringJissiIcrn',
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
div#monitoringParent {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  // min-width: 1350px !important;
  max-width: 1920px;
  // width: auto;

  .parentTab {
    border: 1px solid;
    margin-right: 4px;
    margin-bottom: -2px;
    border-color: $light-gray;
    height: 30px;
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
}
</style>
