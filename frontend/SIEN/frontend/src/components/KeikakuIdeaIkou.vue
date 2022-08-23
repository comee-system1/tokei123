<template>
  <div class="mt-2">
    <v-row dense v-for="value in note" :key="value.key">
      <v-col cols="1" class="text-center valign">
        <v-card class="pa-1 h140 lightYellow" elevation="0" outlined tile>
          {{ value.title }}
        </v-card>
      </v-col>
      <v-col class="mr-4">
        <v-card
          class="pa-1 h140 editarea"
          elevation="0"
          outlined
          tile
          @click="editText(value.key)"
        >
          {{ value.value }}
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="ma-2" justify="space-between">
      <v-col md="4">
        <v-btn small>削除</v-btn>
      </v-col>
      <v-col md="4">
        <v-row no-gutters>
          <v-col class="mw100" align="center"
            ><label class="greyLabel">完了</label></v-col
          >
          <v-col class="mw30 text-center mt-1">
            <input type="checkbox" />
          </v-col>
          <v-col class="mw100">
            <v-text-field
              outlined
              value=""
              hide-details="false"
              height="24"
              class="input-text lightYellow"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog
      v-model="editTextDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
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
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-textarea
                  outlined
                  :value="note[notekey].value"
                  :style="textstyles"
                  class="editTextarea"
                  hide-details="false"
                ></v-textarea>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
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
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。云わすぎおまえは音に物凄いたて夜のあとの外国弾を云い第六譜屋の病気をいうてくださいでた。セロは午前あるてはじめた。ゴーシュは一すわり遁のようがはいっていまし。',
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
