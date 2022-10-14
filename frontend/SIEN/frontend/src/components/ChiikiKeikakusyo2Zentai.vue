<template>
  <div id="chiikizentai" class="mt-1" :style="styles">
    <v-row class="mx-1" dense v-for="value in note" :key="value.key">
      <v-col cols="2" class="text-center valign text-caption">
        <v-card class="lightBlue" elevation="0" outlined tile height="100%">
          <label> {{ value.title }}</label>
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
          rows="2"
          style="font-size: 14px; height: auto"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="*" class="mx-1 text-caption">
        <wj-flex-grid
          id="grdChiikiZentai"
          :headersVisibility="'Column'"
          :allowDragging="'Both'"
          :autoRowHeights="true"
          :style="styles"
        >
          <wj-flex-grid-column
            header="順位"
            binding="sort"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :header="'解決すべき課題\n(ニーズ)'"
            binding="resolve"
            width="*"
            :allowResizing="true"
            :wordWrap="true"
            :multiLine="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="支援内容"
            binding="sien"
            width="*"
            :word-wrap="true"
            :multiLine="true"
            :allowResizing="true"
            format="d"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="達成時期"
            binding="tassei"
            :width="100"
            :word-wrap="false"
            :allowResizing="true"
            format="d"
          ></wj-flex-grid-column>

          <wj-flex-grid-column
            :header="'福祉サービス等詳細支援内容'"
            binding="service"
            width="*"
            :wordWrap="true"
            :multiLine="true"
            format="d"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="留意事項"
            binding="other"
            width="*"
            :wordWrap="true"
            :multiLine="true"
            format="d"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            header="削除"
            binding="edit"
            :width="40"
            :word-wrap="false"
            :allowResizing="true"
            format="d"
          ></wj-flex-grid-column>
        </wj-flex-grid>
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
          title: 'サービス等利用計画の\n到達目標',
          value:
            '文章は目的主題で著作さ権利ますたため、公表され情報で説明法可能の引用theとするれるてはしあれ、ペディアの他は、検証さ未然を既存認めことにより誤認独自んなてなりないです。',
        },
        {
          key: 1,
          title: '（１）長期目標\n（内容及び期間等）',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。',
        },
        {
          key: 2,
          title: '（２）短期目標\n（内容及び期間等）',
          value:
            'セロはおっかさんのおじぎめいめいげに扉が啼く月たう。こうしてこれから変じなって扉ました。だめますですんないもだするとあとの勝手屋のうちへはとうとう丈夫たらまして、わたしまで仲間をちがうせんうた。',
        },
      ],

      keikakuKubunModel: '',
      editTextDialog: false,
      headerheight: 200,
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
#chiikizentai {
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
#grdChiikiZentai {
  font-size: 12px;
  height: var(--height);
  color: $font_color;
  font-family: 'メイリオ';

  .wj-header {
    font-weight: normal;
    background: $view_Title_background_Blue;
    color: $view_Title_font_color_Blue;
    &:last-child {
      background: $light-white;
      color: $grid_selected_color;
    }
  }

  .wj-cell {
    display: flex;
    &.wj-header {
      align-items: center;
    }
    &:first-child.wj-state-selected {
      background: transparent;
      color: initial;
    }

    text-align: left !important;
  }
}
.lightBlue {
  background-color: $view_Title_background_Blue !important;
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    white-space: pre-wrap;
  }
}
</style>
