<template>
  <div id="chiikikadaiArea" class="mt-1" :style="styles">
    <wj-flex-grid
      id="grdChiikiKadai"
      :headersVisibility="'Column'"
      :initialized="onInitialized"
      :itemsSource="viewData"
      :allowDragging="'Both'"
      :autoRowHeights="true"
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
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  props: {},
  components: {},
  data() {
    return {
      viewData: [],
      onflexGrid: [],
      viewDataLength: 0,
      headerheight: 280,
      serviceData: [],
      serviceDataLength: 0,
      sortEditFlag: false,
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
      if (document.getElementById('chiikikadaiArea') != null) {
        document.getElementById('chiikikadaiArea').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /****************************
     * 登録ボタンを押下
     */
    registButton() {
      alert('登録ボタン');
    },
    /************************
     * 順変更
     */
    rowSort(type) {
      // 福祉サービスダイアログの配列に追加
      if (type == 'service') {
        this.createServiceData(this.serviceData.length + 1);
      }
      // 課題支援配列に追加
      if (type == 'view') {
        // 並び順を変更するフラグ
        this.sortEditFlag = true;
        for (let i = 0; i < this.viewData.length; i++) {
          this.viewData[i].sort = '';
        }
        this.onflexGrid.refresh();
      }
    },
    /************************
     * 行追加
     */
    rowAdd(type) {
      // 福祉サービスダイアログの配列に追加
      if (type == 'service') {
        this.createServiceData(this.serviceData.length + 1);
      }
      // 課題支援配列に追加
      if (type == 'view') {
        this.createData(this.viewData.length + 1);
      }
    },
    /************************
     * 行削除
     */
    rowDelete(type) {
      if (type == 'service') {
        this.serviceData = this.delcheck(this.serviceData).filter(Boolean);
      }
      if (type == 'view') {
        this.viewData = this.delcheck(this.viewData).filter(Boolean);
      }
    },
    delcheck(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].edit === true) {
          delete array[i];
        }
      }
      return array;
    },

    /*******************************
     * 一覧
     */
    onInitialized(flexGrid) {
      this.onflexGrid = flexGrid;
      this.createData();
      this.createHeader(flexGrid);
      this.createFormat(flexGrid);

      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);

        // 並び順変更
        if (ht.cellType == wjGrid.CellType.Cell) {
          if (_self.sortEditFlag == true) {
            if (ht.col == 0) {
              let sorts = _self.viewData.map(function (value) {
                return value.sort;
              });
              let max = sorts.reduce(function (a, b) {
                return Math.max(a, b);
              });
              _self.viewData[ht.row].sort = max + 1;
              _self.onflexGrid.refresh();
            }
          }
        }
      });
    },

    createServiceData(cnt = 3) {
      this.serviceData = [];
      for (let i = 0; i < cnt; i++) {
        this.serviceData.push({
          no: i + 1,
          service: '就労継続支援A型',
          detail: '',
          kubun: i + 1,
          start: '10:00',
          end: '15:00',
          one: 5,
          mon: '',
          tue: '',
          wed: '〇',
          thr: '',
          fri: '',
          sat: '',
          sun: '',
          count_week: 1,
          count_month: 1,
          total_week: 5,
          total_month: 20,
          jigyosyo: 'はなまる就労支援センター\n03-1234-1234',
          tanto: '',
          edit: false,
        });
      }
      this.serviceDataLength = this.serviceData.length;
    },
    createData(cnt = 5) {
      let array = [];
      for (let i = 0; i < cnt; i++) {
        array.push({
          sort: i + 1,
          resolve: i + '現在の生活を考え直し特に母親との関係をよくしたい',
          sien: i + '現自分の生活について両親と話し合えるようになる',
          tassei: '6ヶ月',
          service: '現在の生活について一緒に考え、家族との仲介役を果たす',
          task: '無理がない生活を考え直しそのために両親に理解してもらえる',
          hyoka: '6ヶ月',
          other: '自立の考え方が焦点となる本人の意思を大切にしていく',
          edit: false,
        });
      }
      this.viewData = array;
      this.viewDataLength = array.length;
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
#chiikikadaiArea,
#grdChiikiKadai {
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
.v-dialog--fullscreen {
  .wj-listbox {
    width: 300px;
    font-size: 12px;
  }
}
#grdChiikiServiced {
  .wj-cell {
    &:nth-child(2) {
      &:not(.wj-header) {
        display: block;
      }
    }

    &:nth-child(4).wj-state-selected {
      background: transparent;
      color: initial;
    }
  }
}
button.arrow {
  border: 1px solid $light-gray;
  margin: 0px 1px;
  border-radius: 3px;
  width: 20px;
  &:hover {
    background-color: $light-gray;
    color: $black;
  }
  &:disabled {
    background-color: $light-white;
    color: $light-white;
    opacity: 0.2;
  }
  &.act {
    background-color: $light-gray;
  }
}
</style>
