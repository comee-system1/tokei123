<template>
  <div id="JyukyuTourokuRightArea">
    <v-container fluid class="pt-0 mt-0">
      <div v-if="!dispReki">
        <label class="title">入力補助</label>
      </div>
    </v-container>

    <v-container fluid class="pt-0 mt-0">
      <div v-if="dispReki">
        <div v-if="this.selectedTab == 'JyukyuSyogaiFukusi'">
          <JyukyuRirekiViewJyukyu
            :basicFlag="true"
            :jyukyuFlag="true"
            :titleTab="this.titleTab"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewJyukyu>
          <JyukyuRirekiViewSyogai
            :basicFlag="false"
            :syogaiFlag="true"
            :titleTab="this.titleTab"
            :syogaiNum="this.titleNum[0]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewSyogai>
          <JyukyuRirekiViewKettei
            :basicFlag="false"
            :ketteiFlag="true"
            :titleTab="this.titleTab"
            :ketteiNum="this.titleNum[1]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewKettei>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[2]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewKeikaku>
          <JyukyuRirekiViewRiyousya
            :basicFlag="false"
            :riyousyaFlag="true"
            :titleTab="this.titleTab"
            :riyousyaNum="this.titleNum[3]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-else-if="this.selectedTab == 'JyukyuSyogaiJi'">
          <JyukyuRirekiViewJyukyu
            :basicFlag="true"
            :jyukyuFlag="true"
            :titleTab="this.titleTab"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewJyukyu>
          <JyukyuRirekiViewKettei
            :basicFlag="false"
            :ketteiFlag="true"
            :titleTab="this.titleTab"
            :ketteiNum="this.titleNum[0]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewKettei>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[1]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewKeikaku>
          <JyukyuRirekiViewRiyousya
            :basicFlag="false"
            :riyousyaFlag="true"
            :titleTab="this.titleTab"
            :riyousyaNum="this.titleNum[2]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-else-if="this.selectedTab == 'JyukyuChiikiSoudan'">
          <JyukyuRirekiViewJyukyu
            :basicFlag="true"
            :jyukyuFlag="true"
            :titleTab="this.titleTab"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewJyukyu>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[0]"
            @child_rireki_data="child_rireki_data"
          ></JyukyuRirekiViewKeikaku>
        </div>
      </div>
      <div v-else>
        <JyukyuRirekiDetail :hojomode="this.$_hojomode()"></JyukyuRirekiDetail>
      </div>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Vue from 'vue';
import CommonTabMenu from '@/components/CommonTabMenu.vue';
import JyukyuRirekiViewJyukyu from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewSyogai from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewKettei from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewKeikaku from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewRiyousya from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiDetail from '../components/JyukyuRirekiDetail.vue';

let SubGlobalData = new Vue({
  data: {
    $subGridSelected: false,
  },
});

Vue.mixin({
  methods: {
    $_subGridSelected() {
      return SubGlobalData.$data.$subGridSelected;
    },
    $_setSubGridSelected(selected) {
      SubGlobalData.$data.$subGridSelected = selected;
    },
  },
  computed: {
    $subGridSelected: {
      get: function () {
        return SubGlobalData.$data.$subGridSelected;
      },
      set: function (selected) {
        SubGlobalData.$data.$subGridSelected = selected;
      },
    },
  },
});

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      tabmenusReki: [{ href: '#JyukyuRireki', text: '履歴表示' }],
      tabmenusHojo: [{ href: '#JyukyuNyuryoku', text: '入力補助' }],
      tabmargin: '0px',
    };
  },
  props: ['selectedTab', 'titleTab', 'titleNum', 'dispReki'],
  components: {
    CommonTabMenu,
    JyukyuRirekiViewJyukyu,
    JyukyuRirekiViewSyogai,
    JyukyuRirekiViewKettei,
    JyukyuRirekiViewKeikaku,
    JyukyuRirekiViewRiyousya,
    JyukyuRirekiDetail,
  },
  mounted() {
    this.JyukyuRirekiFlag = this.dispReki;
    this.JyukyuNyuryokuFlag = !this.dispReki;
  },
  methods: {
    /****************
     * 子コンポーネントで履歴表示からのデータ取得
     * args: 選択している行の値
     * code: 選択しているグリッドの種類
     */
    child_rireki_data(args, code) {
      console.log(args);
      console.log(code);
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
</style>