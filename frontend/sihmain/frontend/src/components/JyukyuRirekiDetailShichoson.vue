<template>
  <div id="JyukyuRirekiDetailShichoson">
    <wj-flex-grid
      :itemsSource="shichosonList"
      :allowMerging="'ColumnHeaders'"
      :alternatingRowStep="0"
      :selectionMode="3"
      :autoGenerateColumns="false"
      :isReadOnly="true"
      :allowAddNew="false"
      :allowDelete="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowResizing="false"
      :allowSorting="false"
      :initialized="onInitialized"
      :headersVisibility="'Column'"
    >
    </wj-flex-grid>
  </div>
</template>
<script>
import moment from 'moment';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      shichosonList: [],
    };
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {
    onInitialized(flexGrid) {
      //ヘッダ情報の作成
      this.createHeader(flexGrid);
      // イベント設定
      this.setEvents(flexGrid);
      //セルのマージ
      this.cellMerge(flexGrid);
      //データ設定
      this.setData();
      // 未選択状態
      flexGrid.select(-1, -1);
    },

    /***********************
     * イベント設定
     */
    setEvents(flexGrid) {
      let _self = this;
      //セルをクリック
      flexGrid.hostElement.addEventListener('click', function (e) {
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        let code = 'shichoson';

        _self.$emit('child_data', _self.shichosonList[hPage.row], code);
      });
    },

    /********************
     * セルのマージ
     */
    cellMerge(flexGrid) {
      let mm = new wjGrid.MergeManager();
      let ranges = [];
      ranges = [new wjGrid.CellRange(0, 0, 0, 1)];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    /*******************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      flexGrid.columns.clear();
      while (flexGrid.columns.length < 2) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      // ヘッダ記載
      for (let i = 0; i < 2; i++) {
        flexGrid.columnHeaders.setCellData(0, i, '市区町村選択');
      }

      flexGrid.columns[0].width = 80;
      flexGrid.columns[1].width = '1*';
      flexGrid.columnHeaders.rows[0].align = 'center';
      flexGrid.columns[0].binding = 'code';
      flexGrid.columns[1].binding = 'name';
    },
    setData() {
      this.shichosonList = [];
      this.shichosonList.push(
        { id: 1, code: '000001', name: '東経市' },
        { id: 2, code: '000002', name: '西経市' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' }
      );
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuRirekiDetailShichoson {
  .backGrey {
    text-align: center;
    padding: 0;
    background-color: #eee;
  }
}
</style>