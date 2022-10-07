<template>
  <div>
    <div class="mt-1">
      <v-app-bar flat height="24" class="titleBlueDark">
        <v-app-bar-title class="text-caption">利用者の状況</v-app-bar-title>
      </v-app-bar>
      <table class="table mt-1">
        <tr>
          <th>氏名</th>
          <td>東経真奈美</td>
          <th>生年月日</th>
          <td>平成9年10月5日</td>
          <th>年齢</th>
          <td>24歳</td>
        </tr>
        <tr>
          <th rowspan="2">住所</th>
          <td colspan="3" rowspan="2" style="vertical-align: top">aaa</td>
          <th>電話番号</th>
          <td>000</td>
        </tr>
        <tr>
          <th>FAX番号</th>
          <td></td>
        </tr>
        <tr>
          <th>障害・疾患名</th>
          <td></td>
          <th>障害支援区分</th>
          <td>区分4</td>
          <th>性別</th>
          <td>女</td>
        </tr>
      </table>
    </div>
    <div class="mt-1">
      <v-app-bar flat height="24" class="titleBlueDark">
        <v-app-bar-title class="text-caption">施設・病院情報</v-app-bar-title>
      </v-app-bar>
      <table class="table mt-1">
        <tr>
          <th>施設・病院名</th>
          <td class="wide"></td>
          <th>担当者名</th>
          <td></td>
        </tr>
        <tr></tr>
        <tr>
          <th rowspan="2">住所</th>
          <td rowspan="2" style="vertical-align: top">
            984-0052<br />aaa<br />aaa
          </td>
          <th>電話番号</th>
          <td></td>
        </tr>
        <tr>
          <th>ＦＡＸ番号</th>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="mt-1">
      <v-app-bar flat height="24" class="titleBlueDark">
        <v-app-bar-title class="text-caption">アセスメント</v-app-bar-title>
      </v-app-bar>
      <v-app-bar flat height="24" class="titleBlue mt-1">
        <v-app-bar-title class="caption">1.利用者の心身の状況</v-app-bar-title>
      </v-app-bar>
      <v-textarea
        class="mt-1"
        rows="2"
        no-resize
        outlined
        hide-details="false"
      ></v-textarea>
      <v-app-bar flat height="24" class="titleBlue">
        <v-app-bar-title class="caption"
          >2.利用者の置かれている環境</v-app-bar-title
        >
      </v-app-bar>
      <v-textarea
        class="mt-1"
        rows="2"
        no-resize
        outlined
        hide-details="false"
        :value="value"
      ></v-textarea>
    </div>
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
          title: '利用者及び家族の生活に対する意向(希望する生活)',
          value:
            '文章は目的主題で著作さ権利ますたため、公表され情報で説明法可能の引用theとするれるてはしあれ、ペディアの他は、検証さ未然を既存認めことにより誤認独自んなてなりないです。または、ルールの列挙物は、有償の推奨する著作困難んフリーが侵害し、その互換からできるてフリーへ提供しことから-応じれた。しかしを、成立権利を活用するれてください資料に仮にする満たすことも、.あるます、すべてによっては引用権の紛争というコンテンツ上の問題はさことが、被関係権は、独自の著作をさのでペディアが表示基づきますていでます。あるいは、依頼者で引用しれてください両国で他人んを著作できて、「要件を、それなど引用に独自」あれ種類内容と扱うにおける記事の記事を関係守らますます。',
        },
        {
          key: 1,
          title: '総合方針',
          value:
            '０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９',
        },
        {
          key: 2,
          title: '長期目標',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。云わすぎおまえは音に物凄いたて夜のあとの外国弾を云い第六譜屋の病気をいうてくださいでた。セロは午前あるてはじめた。ゴーシュは一すわり遁のようがはいっていまし。',
        },
        {
          key: 3,
          title: '短期目標',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。云わすぎおまえは音に物凄いたて夜のあとの外国弾を云い第六譜屋の病気をいうてくださいでた。セロは午前あるてはじめた。ゴーシュは一すわり遁のようがはいっていまし。',
        },
      ],

      keikakuKubunModel: '',
      editTextDialog: false,
      headerheight: 300,
    };
  },
  created() {},
  mounted() {},
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
    /******************************
     * 入力内容切替ボタンを押下
     */
    inputTypePage(type) {
      alert(type);
    },
    /******************************
     * 入力内容編集
     */
    editText(type) {
      this.notekey = type;
      this.inputs = this.note[type].value;
      this.editTextDialog = true;
    },
    editTextSave() {
      this.note[this.notekey].value = this.inputs;
      this.editTextDialog = false;
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
.keikakuideaTextarea {
  fieldset {
    border: none;
  }
  textarea {
    height: 80vh !important;
    margin-top: 0px !important;
    margin-right: 10px;
  }
}
.lightGreen {
  background-color: $view_Title_background_Green !important;
}
</style>
