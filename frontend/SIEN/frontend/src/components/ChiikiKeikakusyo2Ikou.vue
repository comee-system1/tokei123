<template>
  <div id="chiikiListsArea" class="mt-1" :style="styles">
    <v-row class="mx-1" dense v-for="value in note" :key="value.key">
      <v-col cols="2" class="text-center valign text-caption">
        <v-card class="lightGreen" elevation="0" outlined tile height="100%">
          <label justify="center" align="center" style="white-space: pre-wrap">
            {{ value.title }}</label
          >
        </v-card>
      </v-col>
      <v-col cols="10" class="mr-0 text-caption">
        <v-textarea
          no-resize
          v-model="value.value"
          auto-grow
          hide-details
          solo
          flat
          dense
          outlined
          rows="3"
          style="font-size: 14px; height: auto"
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      inputs: [],
      notekey: 0,
      note: [
        {
          key: 0,
          title: '利用者及びその家族の\n生活に対する意向\n(希望する生活)',
          value:
            '文章は目的主題で著作さ権利ますたため、公表され情報で説明法可能の引用theとするれるてはしあれ、ペディアの他は、検証さ未然を既存認めことにより誤認独自んなてなりないです。または、ルールの列挙物は、有償の推奨する著作困難んフリーが侵害し、その互換からできるてフリーへ提供しことから-応じれた。しかしを、成立権利を活用するれてください資料に仮にする満たすことも、.あるます、すべてによっては引用権の紛争というコンテンツ上の問題はさことが、被関係権は、独自の著作をさのでペディアが表示基づきますていでます。あるいは、依頼者で引用しれてください両国で他人んを著作できて、「要件を、それなど引用に独自」あれ種類内容と扱うにおける記事の記事を関係守らますます。',
        },
        {
          key: 1,
          title: '総合的な援助の方針',
          value:
            '０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９',
        },
        {
          key: 2,
          title: '地域移行の達成時期',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。云わすぎおまえは音に物凄いたて夜のあとの外国弾を云い第六譜屋の病気をいうてくださいでた。セロは午前あるてはじめた。ゴーシュは一すわり遁のようがはいっていまし。',
        },
        {
          key: 3,
          title: '地域移行支援を提供する\n上での留意事項',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。云わすぎおまえは音に物凄いたて夜のあとの外国弾を云い第六譜屋の病気をいうてくださいでた。セロは午前あるてはじめた。ゴーシュは一すわり遁のようがはいっていまし。',
        },
      ],

      keikakuKubunModel: '',
      editTextDialog: false,
      headerheight: 200,
    };
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('chiikiListsArea') != null) {
        document.getElementById('chiikiListsArea').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /******************************
     * 入力内容切替ボタンを押下
     */
    inputTypePage(type) {
      alert(type);
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
    },
    /****************************
     * 登録ボタンを押下
     */
    registButton() {
      alert('意向登録ボタン');
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#chiikiListsArea {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: var(--height);
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  .editarea {
    overflow-y: scroll;
    //width: 890px;
    width: 100%;
    div {
      width: 870px;
    }
  }
}
.lightGreen {
  label {
    white-space: pre-wrap;
  }
}
</style>
