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
            title="市区町村選択"
            :list="shichosonList"
            :hojomode="this.hojomode"
            @child_data="child_data"
          ></JyukyuRirekiDetailShichoson>
        </div>
        <div v-else-if="this.hojomode === 'jigyosyo'">
          <JyukyuRirekiDetailJigyosyo
            title="事象所選択"
            :list="jigyosyoList"
            :hojomode="this.hojomode"
            @child_data="child_data"
          ></JyukyuRirekiDetailJigyosyo>
        </div>
        <div v-else-if="this.hojomode === 'kazoku'">
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
import JyukyuRirekiDetailShichoson from './JyukyuRirekiDetail.vue';
import JyukyuRirekiDetailJigyosyo from './JyukyuRirekiDetail.vue';
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

      detailList: [],
    };
  },
  props: [
    'selectedTab',
    'titleTab',
    'titleNum',
    'dispReki',
    'shichosonList',
    'jigyosyoList',
  ],
  components: {
    CommonTabMenu,
    JyukyuRirekiViewKihon,
    JyukyuRirekiViewSyogai,
    JyukyuRirekiViewKettei,
    JyukyuRirekiViewKeikaku,
    JyukyuRirekiViewRiyousya,
    JyukyuRirekiDetailShichoson,
    JyukyuRirekiDetailJigyosyo,
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
      this.$emit('child_data', args, code);
    },
    setKihonData(list) {
      //4行以下はダミーデータ作成
      for (let i = list.length; i < 4; i++) {
        list[i] = [];
        list[i].kai = '';
        list[i].jyukyuid = 0;
        list[i].rysid = 0;
        list[i].jkbn = 0;
        list[i].shichoson = '';
        list[i].shichosonno = '';
        list[i].shichosonname = '';
        list[i].kofuymd = '';
        list[i].kofuymdDisp = '';
        list[i].jyukyuno = '';
        list[i].jidoid = 0;
        list[i].jido = '';
        list[i].jidopno1 = '';
        list[i].jidopno2 = '';
        list[i].jidoadd = '';
        list[i].ssyu1 = 0;
        list[i].ssyu2 = 0;
        list[i].ssyu3 = 0;
        list[i].ssyu4 = 0;
        list[i].zantei = 0;
        list[i].dcod = 0;
        list[i].dcodDisp = 0;
        list[i].jyukyuname = '';
      }
      this.$refs.kihon.settingData(list);
    },
    setSyogaiKubunData(list) {
      //4行以下はダミーデータ作成
      for (let i = list.length; i < 4; i++) {
        list[i] = [];
        list[i].kai = '';
        list[i].syokbnid = 0;
        list[i].jyukyuid = 0;
        list[i].ntsymd = '';
        list[i].ntsymdDisp = '';
        list[i].nteymd = '';
        list[i].nteymdDisp = '';
        list[i].syogaikbn = 0;
        list[i].syogaikbnDisp = '';
        list[i].tkkyu = 0;
        list[i].rysid = 0;
        list[i].jkbn = 0;
      }
      this.$refs.syogaiKubun.settingData(list);
    },
    setSikyuryoData(list) {
      for (let i = list.length; i < 4; i++) {
        list[i] = [];
        list[i].kai = '';
        list[i].sikyuid = 0; // 支給量内部ID
        list[i].jyukyuid = 0; // 受給者証内部ID
        list[i].skykbn = 0; // 支給区分
        list[i].svcshurui = 0; // サービス種類表示ｺｰﾄﾞ
        list[i].sksymd = ''; // 支給開始日
        list[i].sksymdDisp = '';
        list[i].skeymd = ''; // 支給終了日
        list[i].skeymdDisp = '';
        list[i].svccode1 = 0; // サービス詳細コード1
        list[i].svccode2 = 0; // サービス詳細コード2
        list[i].svccode3 = 0; // サービス詳細コード3
        list[i].svccode4 = 0; // サービス詳細コード4
        list[i].svccode5 = 0; // サービス詳細コード5
        list[i].svccode6 = 0; // サービス詳細コード6
        list[i].svccode7 = 0; // サービス詳細コード7
        list[i].kihonryo1 = 0; // 基本支給量1
        list[i].kihonryo2 = 0; // 基本支給量2
        list[i].kihonryo3 = 0; // 基本支給量3
        list[i].kihonryo4 = 0; // 基本支給量4
        list[i].kihonryo5 = 0; // 基本支給量5
        list[i].kihonryo6 = 0; // 基本支給量6
        list[i].kihonryo7 = 0; // 基本支給量7
        list[i].ikairyo1 = 0; // 1回あたりの支給量1
        list[i].ikairyo2 = 0; // 1回あたりの支給量2
        list[i].ikairyo3 = 0; // 1回あたりの支給量3
        list[i].ikairyo4 = 0; // 1回あたりの支給量4
        list[i].ikairyo5 = 0; // 1回あたりの支給量5
        list[i].ikairyo6 = 0; // 1回あたりの支給量6
        list[i].ikairyo7 = 0; // 1回あたりの支給量7
        list[i].kasan1 = 0; // 加算コード1
        list[i].kasan2 = 0; // 加算コード2
        list[i].kasan3 = 0; // 加算コード3
        list[i].kasan4 = 0; // 加算コード4
        list[i].kasan5 = 0; // 加算コード5
        list[i].kasanryo1 = 0; // 加算支給量1
        list[i].kasanryo2 = 0; // 加算支給量2
        list[i].kasanryo3 = 0; // 加算支給量3
        list[i].kasanryo4 = 0; // 加算支給量4
        list[i].kasanryo5 = 0; // 加算支給量5
        list[i].teido = 0; // 障害区分
        list[i].ninzu = 0; // 居宅の人数
        list[i].kyodo = 0; // 共同生活介護利用型
        list[i].kyotk = 0; // 経過的居宅介護利用型
        list[i].tasyogai = 0; // 他障害受入
        list[i].koyo = 0; // 雇用契約
        list[i].kisonen1 = 0; // 障害基礎年金1級
        list[i].ktkriyo = 0; // 個人単位での居宅介護利用
        list[i].keisochi = 0; // 経過措置利用
        list[i].skjipt = 0; // 食事入力
        list[i].skhaiti = 0; // 生活介護人員配置
        list[i].longnyuin = 0; // 長期入院者
        list[i].sikaku = 0; // 視覚障害者
        list[i].longnyuin = 0; // 長期入院者
        list[i].tankyuin = 0; // たん吸引
        list[i].taisyo = 0; // 退所
        list[i].rysid = 0; // 利用者内部ID
        list[i].jkbn = 0; // 受給者証区分
        list[i].svcshuruinam = ''; // サービス種別名称
        list[i].svcshuruiryaku = ''; // サービス種別略称
        list[i].svccodenam = ''; // サービス詳細名称
        list[i].svccoderyaku = ''; // サービス詳細略称
        list[i].kasannam1 = ''; // 加算名1
        list[i].kasanryaku1 = ''; // 加算略称1
        list[i].kasannam2 = ''; // 加算名2
        list[i].kasanryaku2 = ''; // 加算略称2
        list[i].kasannam3 = ''; // 加算名3
        list[i].kasanryaku3 = ''; // 加算略称3
        list[i].kasannam4 = ''; // 加算名4
        list[i].kasanryaku4 = ''; // 加算略称4
        list[i].kasannam5 = ''; // 加算名5
        list[i].kasanryaku5 = ''; // 加算略称5
        list[i].teidonam = ''; // 障害区分名称
        list[i].kyodonam = ''; // 共同生活介護利用型名称
        list[i].kyotknam = ''; // 経過的居宅介護利用型名称
        list[i].tasyogainam = ''; // 他障害受入名称
        list[i].kyodonam = ''; // 共同生活介護利用型名称
        list[i].koyonam = ''; // 雇用契約名称
        list[i].kisonen1nam = ''; // 障害基礎年金1級名称
        list[i].ktkriyonam = ''; // 個人単位での居宅介護利用名称
        list[i].keisochinam = ''; // 経過措置利用者名称
        list[i].skjiptnam = ''; // 食事入力名称
        list[i].skhaitinam = ''; // 生活介護人員配置名称
        list[i].sikakunam = ''; // 視覚障害名称
        list[i].longnyuinnam = ''; // 長期入院者名称
        list[i].tankyuinnam = ''; // たん吸引名称
        list[i].taisyonam = ''; // 退所名称
        list[i].dspskryo = ''; // 表示用支給量
        list[i].dspsktani = ''; // 支給量単位
        list[i].dspskryotani = '';
      }
      this.$refs.sikyuryo.settingData(list);
    },
    setKeikakuSoudanData(list) {
      for (let i = list.length; i < 4; i++) {
        list[i] = [];
        list[i].kai = '';
        list[i].ryokid = 0; // 利用計画作成費内部ID
        list[i].jyukyuid = 0; // 受給者証内部ID
        list[i].rksymd = ''; // 支給開始日
        list[i].rksymdDisp = '';
        list[i].rkeymd = ''; // 支給終了日
        list[i].rkeymdDisp = '';
        list[i].sjgyokbn = 0; // 相談支援事業者区分
        list[i].sjgyokbnDisp = '';
        list[i].sjgyo = 0; // 相談支援事業者
        list[i].tokuti = 0; // 特別地域加算
        list[i].monijiki = 0; // ﾓﾆﾀﾘﾝｸﾞ時期
        list[i].rysid = 0; // 利用者内部ID
        list[i].jkbn = 0; // 受給者証区分

        list[i].skryoh3_moni2 = []; // モニタリング情報

        list[i].sjigyoname = ''; // 相談支援事業者名
        list[i].sjigyoryaku = ''; // 相談支援事業者略称
      }
      this.$refs.keikaku.settingData(list);
    },
    setRiyosyaFutanData(list) {
      for (let i = list.length; i < 4; i++) {
        list[i] = [];
        list[i].jyogenid = 0; //利用者負担関係内部ID
        list[i].jyukyuid = 0; //受給者証内部ID
        list[i].tesymd = ''; //適用開始日
        list[i].tesymdDisp = '';
        list[i].teeymd = ''; //適用終了日
        list[i].teeymdDisp = '';
        list[i].ftn = 0; //利用者負担割合
        list[i].fjyogen = 0; //利用者負担上限月額
        list[i].fjyogenDisp = '';
        list[i].tkkfhi = 0; //特定障害者特別給付費
        list[i].syafukug = 0; //社会福祉法人減額
        list[i].jgenkbn = 0; //上限管理対象区分
        list[i].jgenkbnDisp = '';
        list[i].jgenknrikbn = 0; //上限管理委託事業者区分
        list[i].jgenknri = 0; //上限管理委託事業者内部ID
        list[i].sykksn = 0; //食事提供加算
        list[i].tkkfhi12 = 0; //特定障害者特別給付費(GH/CH)
        list[i].kyftok = 0; //給付費等の額の特例
        list[i].kyuftokkbn = 0; //給付費等の額の特例の有無
        list[i].tasikgn = 0; //多子軽減対象
        list[i].mushojdo = 0; //無償化対象児童
        list[i].rysid = 0; //利用者内部ID
        list[i].jkbn = 0; //受給者証区分

        list[i].jgenname = ''; //上限管理事業者名
        list[i].jgenryaku = ''; //上限管理事業者略称
      }
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