<template>
  <div id="JyukyuTourokuRightArea">
    <v-container fluid class="container">
      <common-tab-menu
        class="center-area-jyukyusyuri-tab"
        @parent_common_tab_menu="parent_common_tab_menu"
        :tabmenu="tabmenus"
        :tabmargin="tabmargin"
      ></common-tab-menu>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import CommonTabMenu from '../../../../SIHS/frontend/src/components/CommonTabMenu.vue';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      tabmenus: [
        { href: '#JyukyuRireki', text: '履歴表示' },
        { href: '#JyukyuNyuryoku', text: '入力補助' },
      ],
      tabmargin: '1px',
    };
  },
  components: {
    CommonTabMenu,
  },
  methods: {},
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
</style>