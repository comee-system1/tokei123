<template>
  <div id="JyukyuRirekiView">
    <wj-flex-grid
      :itemsSource="data"
      :allowMerging="'ColumnHeaders'"
      :alternatingRowStep="0"
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
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      headers: {
        jyukyu: {
          title: '障害福祉-受給者証情報',
          array: [
            '回',
            '交付年月日',
            '市区町村',
            '受給証番号',
            '支給決定者',
            '',
          ],
        },
        syogai: {
          title: '障害福祉-①障害支援区分',
          array: ['回', '開始日', '終了日', '支給区分'],
        },
      },
    };
  },
  components: {},
  methods: {
    onInitialized(flexGrid) {
      //ヘッダ情報の作成
      this.createHeader(flexGrid);
    },
    /*******************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      let headerTitle = this.headers.jyukyu.title;
      let headerArray = this.headers.jyukyu.array;
      while (flexGrid.columns.length < headerArray.length) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
      for (let colIndex = 0; colIndex < headerArray.length; colIndex++) {
        panel.setCellData(0, colIndex, headerTitle);
      }

      // ヘッダ登録
      for (let i = 0; i < headerArray.length; i++) {
        flexGrid.columnHeaders.setCellData(1, i, headerArray[i]);
      }

      // 仮の行数
      let totalRow = 3;
      while (flexGrid.rows.length < totalRow) {
        flexGrid.rows.push(new wjGrid.Row());
      }

      flexGrid.setCellData(0, 0, 'aaaa');

      flexGrid.columns[0].width = 25;
      flexGrid.columns[1].width = '4*';
      flexGrid.columns[2].width = '4*';
      flexGrid.columns[3].width = '4*';
      flexGrid.columns[4].width = 25;
      flexGrid.columns[5].width = '4*';
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
</style>