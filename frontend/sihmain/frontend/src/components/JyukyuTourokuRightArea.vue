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
            @child_data="child_data"
          ></JyukyuRirekiViewJyukyu>
          <JyukyuRirekiViewSyogai
            :basicFlag="false"
            :syogaiFlag="true"
            :titleTab="this.titleTab"
            :syogaiNum="this.titleNum[0]"
            @child_data="child_data"
          ></JyukyuRirekiViewSyogai>
          <JyukyuRirekiViewKettei
            :basicFlag="false"
            :ketteiFlag="true"
            :titleTab="this.titleTab"
            :ketteiNum="this.titleNum[1]"
            @child_data="child_data"
          ></JyukyuRirekiViewKettei>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[2]"
            @child_data="child_data"
          ></JyukyuRirekiViewKeikaku>
          <JyukyuRirekiViewRiyousya
            :basicFlag="false"
            :riyousyaFlag="true"
            :titleTab="this.titleTab"
            :riyousyaNum="this.titleNum[3]"
            @child_data="child_data"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-else-if="this.selectedTab == 'JyukyuSyogaiJi'">
          <JyukyuRirekiViewJyukyu
            :basicFlag="true"
            :jyukyuFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
          ></JyukyuRirekiViewJyukyu>
          <JyukyuRirekiViewKettei
            :basicFlag="false"
            :ketteiFlag="true"
            :titleTab="this.titleTab"
            :ketteiNum="this.titleNum[0]"
            @child_data="child_data"
          ></JyukyuRirekiViewKettei>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[1]"
            @child_data="child_data"
          ></JyukyuRirekiViewKeikaku>
          <JyukyuRirekiViewRiyousya
            :basicFlag="false"
            :riyousyaFlag="true"
            :titleTab="this.titleTab"
            :riyousyaNum="this.titleNum[2]"
            @child_data="child_data"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-else-if="this.selectedTab == 'JyukyuChiikiSoudan'">
          <JyukyuRirekiViewJyukyu
            :basicFlag="true"
            :jyukyuFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
          ></JyukyuRirekiViewJyukyu>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[0]"
            @child_data="child_data"
          ></JyukyuRirekiViewKeikaku>
        </div>
      </div>
      <div v-else>
        <div v-if="this.$_hojomode() === 'shichoson'">
          <JyukyuRirekiDetailShichoson
            @child_data="child_data"
          ></JyukyuRirekiDetailShichoson>
        </div>
        <div v-else-if="this.$_hojomode() === 'kazoku'">
          <JyukyuRirekiDetailKazoku
            @child_data="child_data"
          ></JyukyuRirekiDetailKazoku>
        </div>
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
import JyukyuRirekiDetailShichoson from './JyukyuRirekiDetailShichoson.vue';
import JyukyuRirekiDetailKazoku from './JyukyuRirekiDetailKazoku.vue';

let SubGlobalData = new Vue({
  data: {
    $subGridSelected: false,
    $selectedShichoson: [],
    $selectedKazoku: [],

    $selectedKihonData: [],
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
    $_selectedShichoson() {
      return SubGlobalData.$data.$selectedShichoson;
    },
    $_setSelectedShichoson(selected) {
      SubGlobalData.$data.$selectedShichoson = selected;
    },
    $_selectedKazoku() {
      return SubGlobalData.$data.$selectedKazoku;
    },
    $_setSelectedKazoku(selected) {
      SubGlobalData.$data.$selectedKazoku = selected;
    },

    $_selectedKihonData() {
      return SubGlobalData.$data.$selectedKihonData;
    },
    $_setSelectedKihonData(selected) {
      SubGlobalData.$data.$selectedKihonData = selected;
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
    $selectedShichoson: {
      get: function () {
        return SubGlobalData.$data.$selectedShichoson;
      },
      set: function (selected) {
        SubGlobalData.$data.$selectedShichoson = selected;
      },
    },
    $selectedKazoku: {
      get: function () {
        return SubGlobalData.$data.$selectedKazoku;
      },
      set: function (selected) {
        SubGlobalData.$data.$selectedKazoku = selected;
      },
    },

    $selectedKihonData: {
      get: function () {
        return SubGlobalData.$data.$selectedKihonData;
      },
      set: function (selected) {
        SubGlobalData.$data.$selectedKihonData = selected;
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
    JyukyuRirekiDetailShichoson,
    JyukyuRirekiDetailKazoku,
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
    child_data(args, code) {
      // console.log(args);
      // console.log(code);
      switch (code) {
        case 'jyukyu':
          this.$emit('child_data', args, code);
          break;
        case 'syogai':
          break;
        case 'kettei':
          break;
        case 'keikaku':
          break;
        case 'futan':
          break;
        case 'shichoson':
          this.$_setSelectedShichoson(args);
          break;
        case 'kazoku':
          this.$_setSelectedKazoku(args);
          break;
      }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
</style>