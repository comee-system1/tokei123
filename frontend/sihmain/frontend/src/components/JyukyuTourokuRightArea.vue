<template>
  <div id="JyukyuTourokuRightArea">
    <v-container fluid class="container">
      <common-tab-menu
        class="center-area-jyukyusyuri-tab"
        @parent_common_tab_menu="parent_common_tab_menu"
        :tabmenu="tabmenus"
        :tabmargin="tabmargin"
        tabParentWidth="50%"
      ></common-tab-menu>
    </v-container>

    <v-container fluid class="pt-0 mt-0">
      <JyukyuRirekiView v-if="JyukyuRirekiFlag"></JyukyuRirekiView>
      <div v-if="JyukyuNyuryokuFlag">bbb</div>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';

import CommonTabMenu from '../../../../SIHS/frontend/src/components/CommonTabMenu.vue';
import JyukyuRirekiView from '../components/JyukyuRirekiView.vue';
export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      JyukyuRirekiFlag: false, // 履歴表示
      JyukyuNyuryokuFlag: false, // 入力補助
      tabmenus: [
        { href: '#JyukyuRireki', text: '履歴表示' },
        { href: '#JyukyuNyuryoku', text: '入力補助' },
      ],
      tabmargin: '1px',
    };
  },
  components: {
    CommonTabMenu,
    JyukyuRirekiView,
  },
  methods: {
    /**************
     * 子コンポーネントCommonTabMenuで選択した値を取得
     */
    parent_common_tab_menu: function (args) {
      this.JyukyuRirekiFlag = false;
      this.JyukyuNyuryokuFlag = false;
      if (args.selectTab == 'JyukyuRireki') {
        this.JyukyuRirekiFlag = true;
      }
      if (args.selectTab == 'JyukyuNyuryoku') {
        this.JyukyuNyuryokuFlag = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
</style>