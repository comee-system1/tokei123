<template>
  <div class="mt-2">
    <wj-flex-grid
      id="kadaiGrid"
      :headersVisibility="'Column'"
      :initialized="onInitialized"
      :itemsSource="viewData"
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
        :header="'解決すべき課題\n(本人のニーズ)'"
        binding="resolve"
        width="*"
        :allowResizing="true"
        :wordWrap="true"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="支援目標"
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
        :header="'福祉サービス等\n種類-内容-量(頻度-期間)'"
        binding="service"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'課題のための本人\nの役割'"
        binding="task"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :header="'評価\n時期'"
        :multiLine="true"
        binding="hyoka"
        :width="60"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="その他留意事項"
        binding="other"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        format="d"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        header="編集"
        binding="edit"
        :width="40"
        :word-wrap="false"
        :allowResizing="true"
        format="d"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      viewData: [],
      headerheight: 240,
    };
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('kadaiGrid') != null) {
        document.getElementById('kadaiGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    onInitialized(flexGrid) {
      this.createData();
      this.createHeader(flexGrid);
      this.createFormat(flexGrid);
    },
    createData() {
      let array = [];
      for (let i = 0; i < 10; i++) {
        array.push({
          sort: i + 1,
          resolve: '現在の生活を考え直し特に母親との関係をよくしたい',
          sien: '現自分の生活について両親と話し合えるようになる',
          tassei: '6ヶ月',
          service: '現在の生活について一緒に考え、家族との仲介役を果たす',
          task: '無理がない生活を考え直しそのために両親に理解してもらえる',
          hyoka: '6ヶ月',
          other: '自立の考え方が焦点となる本人の意思を大切にしていく',
          edit: true,
        });
      }
      this.viewData = array;
    },
    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows[0].height = 50;
    },
    createFormat(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#kadaiGrid {
  font-size: 12px;
  height: var(--height);
  .wj-cell {
    display: flex;
    &.wj-header {
      align-items: center;
    }
    text-align: left !important;
  }
}
</style>
