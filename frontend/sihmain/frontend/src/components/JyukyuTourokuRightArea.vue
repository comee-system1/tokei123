<template>
  <div id="JyukyuTourokuRightArea">
    <v-container fluid class="pt-0 mt-0">
      <div v-if="!dispReki" class="title">入力補助</div>
    </v-container>

    <v-container fluid class="pt-0 mt-0">
      <div v-show="dispReki">
        <div v-show="this.selectedTab == 'JyukyuSyogaiFukusi'">
          <JyukyuRirekiViewKihon
            ref="kihon"
            :basicFlag="true"
            :kihonFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
          ></JyukyuRirekiViewKihon>
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
            :futanFlag="true"
            :titleTab="this.titleTab"
            :futanNum="this.titleNum[3]"
            @child_data="child_data"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-show="this.selectedTab == 'JyukyuSyogaiJi'">
          <JyukyuRirekiViewKihon
            ref="kihon"
            :basicFlag="true"
            :kihonFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
          ></JyukyuRirekiViewKihon>
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
            :futanFlag="true"
            :titleTab="this.titleTab"
            :futanNum="this.titleNum[2]"
            @child_data="child_data"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-show="this.selectedTab == 'JyukyuChiikiSoudan'">
          <JyukyuRirekiViewKihon
            ref="kihon"
            :basicFlag="true"
            :kihonFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
          ></JyukyuRirekiViewKihon>
          <JyukyuRirekiViewKeikaku
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[0]"
            @child_data="child_data"
          ></JyukyuRirekiViewKeikaku>
        </div>
      </div>
      <div v-show="!dispReki">
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
import JyukyuRirekiViewKihon from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewSyogai from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewKettei from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewKeikaku from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiViewRiyousya from '../components/JyukyuRirekiView.vue';
import JyukyuRirekiDetailShichoson from './JyukyuRirekiDetailShichoson.vue';
import JyukyuRirekiDetailKazoku from './JyukyuRirekiDetailKazoku.vue';

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
    JyukyuRirekiViewKihon,
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
      this.$emit('child_data', args, code);
    },
    setKihonData(list) {
      this.$refs.kihon.settingData(list);
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#JyukyuTourokuRightArea {
  .title {
    text-align: center;
    height: 30px;
    font-size: 18px !important;
    background-color: #eee;
    border-radius: 5px;
  }
}
</style>