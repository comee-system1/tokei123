<template>
  <div id="monitoringParent">
    <div class="commonTab">
      <v-container no-gutters fluid class="pa-0 pt-1">
        <v-tabs height="24" hide-slider v-model="tab">
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
  // overflow-x: scroll;
  // width: 1366px !important;
  // min-width: 1350px !important;
  max-width: 1920px;
}
</style>
