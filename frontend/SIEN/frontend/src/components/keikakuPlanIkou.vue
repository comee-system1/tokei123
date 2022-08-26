<template>
  <div class="mt-2">
    <v-flex v-for="value in note" :key="value.key" class="d-flex mb-1">
      <v-card outlined tile elevation="0" dense class="caption-left mr-1">
        {{ value.title }}
        <!-- <v-card class="pa-1 caption" elevation="0" outlined tile height="100">
          {{ value.title }}
        </v-card> -->
      </v-card>
      <v-card
        outlined
        tile
        elevation="0"
        class="caption-right"
        @click="editText(value.key)"
      >
        <!-- <v-card
          class="pa-1"
          elevation="0"
          outlined
          tile
          height="100"
          @click="editText(value.key)"
        >
          {{ value.value }}
        </v-card> -->
        {{ value.value }}
      </v-card>
    </v-flex>

    <v-row dense class="ma-2" justify="space-between">
      <v-col cols="4">
        <v-btn small>画面クリア</v-btn>
      </v-col>
      <v-col cols="7">
        <v-card class="d-flex justify-end" flat tile>
          <v-card
            outlined
            tile
            width="100"
            class="text-center text-caption label pt-1"
            >完了
          </v-card>
          <v-card elevation="0" width="30" class="text-center mt-1">
            <input type="checkbox" />
          </v-card>
          <v-card class="lightYellow pl-1 pt-1 ml-1" width="140" outlined tile>
            竹下道子
          </v-card>
          <v-btn small class="ml-3">登録</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="editTextDialog" max-width="1150">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="editTextDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ note[notekey].title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="editTextSave"> 保存 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-textarea
            outlined
            :value="note[notekey].value"
            :style="textstyles"
            class="editTextarea"
            hide-details="false"
          ></v-textarea>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
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
    };
  },
  created() {},
  mounted() {},
  computed: {
    textstyles() {
      return {
        minHeight: '100vh',
        borderRadius: '0',
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
      this.editTextDialog = true;
    },
    editTextSave() {
      console.log(this.notekey);
      this.editTextDialog = false;
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
    },
  },
};
</script>
