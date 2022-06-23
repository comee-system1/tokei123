<template>
  <div id="tajyougen">
    <v-container fluid class="container">
      <wj-flex-grid
        id="serviceHistory"
        :initialized="onInitialized"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :itemsSource="historyData"
      >
        <wj-flex-grid-column
          :binding="'serviceTeikyoJigyosyoCode'"
          align="center"
          valign="middle"
          :width="80"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceTeikyoJigyosyo'"
          align="center"
          valign="middle"
          width="3*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceMeisyo'"
          align="center"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'code'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyosyamei'"
          align="center"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'gender'"
          align="center"
          valign="middle"
          :width="24"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'birth'"
          align="center"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'age'"
          align="center"
          valign="middle"
          :width="24"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'spice'"
          align="center"
          valign="middle"
          :width="24"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'startDate'"
          :header="'開始日'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'endDate'"
          :header="'終了日'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'useYear'"
          align="center"
          valign="middle"
          :width="100"
          :isReadOnly="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';

const alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];

export default {
  data() {
    return {
      alphabet: alphabet,
      year: moment().year(),
      historyData: [],
    };
  },
  components: {},

  methods: {
    onInitialized(flexGrid) {
      flexGrid.select(-1, -1);
      this.mainFlexGrid = flexGrid;
      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);
    },

    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, 'サービス提供事業所');
      panel.setCellData(0, 2, 'サービス名称');
      panel.setCellData(0, 3, 'コード');
      panel.setCellData(0, 4, '利用者名');
      panel.setCellData(0, 5, '性別');
      panel.setCellData(0, 6, '生年月日');
      panel.setCellData(0, 7, '年齢');
      panel.setCellData(0, 8, '種類');
      panel.setCellData(0, 9, '利用期間');
      panel.setCellData(0, 11, '利用年数');

      flexGrid.columnHeaders.columns[5].cssClassAll = 'vertical';
      flexGrid.columnHeaders.columns[7].cssClassAll = 'vertical';
      flexGrid.columnHeaders.columns[8].cssClassAll = 'vertical';
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 4),
        new wjGrid.CellRange(0, 5, 1, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 1, 7),
        new wjGrid.CellRange(0, 8, 1, 8),
        new wjGrid.CellRange(0, 9, 0, 10),
        new wjGrid.CellRange(0, 11, 1, 11),
      ];
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      if (this.receptFlag) {
        this.$refs.receptChild.parentAlphabet(key);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentAlphabet(key);
      } else {
        this.$refs.tajougenChild.parentAlphabet(key);
      }
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#serviceHistory {
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1266px;

  .wj-cell.wj-header.wj-align-center {
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }
}
</style>