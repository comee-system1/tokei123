<template>
  <div id="JyukyuTourokuRightArea">
    <v-container fluid class="pt-0 mt-0">
      <div v-if="!dispReki" class="title">入力補助</div>
    </v-container>

    <v-container fluid class="pt-0 mt-0">
      <div v-show="dispReki">
        <div v-if="this.selectedTab == 'JyukyuSyogaiFukusi'">
          <JyukyuRirekiViewKihon
            ref="kihon"
            :basicFlag="true"
            :kihonFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKihon>
          <JyukyuRirekiViewSyogai
            ref="syogaiKubun"
            :basicFlag="false"
            :syogaiFlag="true"
            :titleTab="this.titleTab"
            :syogaiNum="this.titleNum[0]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewSyogai>
          <JyukyuRirekiViewKettei
            ref="sikyuryo"
            :basicFlag="false"
            :ketteiFlag="true"
            :titleTab="this.titleTab"
            :ketteiNum="this.titleNum[1]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKettei>
          <JyukyuRirekiViewKeikaku
            ref="keikaku"
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[2]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKeikaku>
          <JyukyuRirekiViewRiyousya
            ref="futan"
            :basicFlag="false"
            :futanFlag="true"
            :titleTab="this.titleTab"
            :futanNum="this.titleNum[3]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-else-if="this.selectedTab == 'JyukyuSyogaiJi'">
          <JyukyuRirekiViewKihon
            ref="kihon"
            :basicFlag="true"
            :kihonFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKihon>
          <JyukyuRirekiViewKettei
            ref="sikyuryo"
            :basicFlag="false"
            :ketteiFlag="true"
            :titleTab="this.titleTab"
            :ketteiNum="this.titleNum[0]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKettei>
          <JyukyuRirekiViewKeikaku
            ref="keikaku"
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[1]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKeikaku>
          <JyukyuRirekiViewRiyousya
            ref="futan"
            :basicFlag="false"
            :futanFlag="true"
            :titleTab="this.titleTab"
            :futanNum="this.titleNum[2]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewRiyousya>
        </div>
        <div v-else-if="this.selectedTab == 'JyukyuChiikiSoudan'">
          <JyukyuRirekiViewKihon
            ref="kihon"
            :basicFlag="true"
            :kihonFlag="true"
            :titleTab="this.titleTab"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKihon>
          <JyukyuRirekiViewKeikaku
            ref="keikaku"
            :basicFlag="false"
            :keikakuFlag="true"
            :titleTab="this.titleTab"
            :keikakuNum="this.titleNum[0]"
            @child_data="child_data"
            @setSubGridSelected="setSubGridSelected"
          ></JyukyuRirekiViewKeikaku>
        </div>
      </div>
      <div v-show="!dispReki">
        <div v-if="this.hojomode === 'shichoson'">
          <JyukyuRirekiDetailShichoson
            @child_data="child_data"
            @setHojoMode="setHojoMode"
          ></JyukyuRirekiDetailShichoson>
        </div>
        <div v-else-if="this.hojomode === 'kazoku'">
          <JyukyuRirekiDetailKazoku
            @child_data="child_data"
            @setHojoMode="setHojoMode"
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

export default {
  data() {
    return {
      hojomode: '',
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
    setSyogaiKubunData(list) {
      this.$refs.syogaiKubun.settingData(list);
    },
    setSikyuryoData(list) {
      this.$refs.sikyuryo.settingData(list);
    },
    setKeikakuSoudanData(list) {
      this.$refs.keikaku.settingData(list);
    },
    setRiyosyaFutanData(list) {
      this.$refs.futan.settingData(list);
    },
    /****************
     * 入力補助モード設定
     */
    setHojoMode(phojomode) {
      this.hojomode = phojomode;
      this.$emit('setHojoMode', phojomode);
    },
    /****************
     * グリッド選択情報:親へ
     */
    setSubGridSelected(seleced) {
      this.$emit('setSubGridSelected', seleced);
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
    color: #fff;
    background-color: #444;
    border-radius: 5px;
  }
}
</style>