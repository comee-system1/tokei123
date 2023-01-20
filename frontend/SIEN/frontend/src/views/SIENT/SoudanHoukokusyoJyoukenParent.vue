<template>
  <div id="SoudanHoukokusyoJyoukenParent">
    <div class="commonTab">
      <v-container no-gutters fluid class="pa-0">
        <v-tabs hide-slider v-model="tab">
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
          <v-tab-item value="Nenrei" transition="none">
            <HoukokusyoNenrei ref="houkokusyoNenrei"></HoukokusyoNenrei>
          </v-tab-item>
          <v-tab-item value="HoukokusyoJyouken" transition="none">
            <HoukokusyoJyouken ref="houkokusyoJyouken"></HoukokusyoJyouken>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </div>
  </div>
</template>

<script>
import HoukokusyoNenrei from '../../components/HoukokusyoNenrei.vue';
import HoukokusyoJyouken from '../../components/HoukokusyoJyouken.vue';
import ls from '@/utiles/localStorage';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: { HoukokusyoNenrei, HoukokusyoJyouken },
  data: function () {
    return {
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        { name: '年齢構成', href: '#Nenrei', hrefval: 'Nenrei' },
        {
          name: '集計条件',
          href: '#HoukokusyoJyouken',
          hrefval: 'HoukokusyoJyouken',
        },
      ],
    };
  },
  beforeDestroy() {
    this.$router.app.$off('print_event_global');
  },
  watch: {
    selectedData() {
      // 子供に受け渡すだけ
    },
  },
  methods: {
    tabsChange(hrefval) {
      this.$router.app.$off('print_event_global');
      ls.setlocalStorageEncript(ls.KEY.SansyoTab, hrefval);
      if (hrefval == this.menuItem[0].hrefval) {
        if (this.$refs.houkokusyoNenrei != null) {
          this.$refs.houkokusyoNenrei.setPrintEvent();
        }
      } else if (hrefval == this.menuItem[1].hrefval) {
        if (this.$refs.houkokusyoJyouken != null) {
          this.$refs.houkokusyoJyouken.setPrintEvent();
        }
      }
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#SoudanHoukokusyoJyoukenParent {
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
