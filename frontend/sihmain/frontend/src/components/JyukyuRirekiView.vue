<template>
  <div id="JyukyuRirekiView">
    <wj-flex-grid
      :itemsSource="data"
      :allowMerging="'ColumnHeaders'"
      :selectionMode="3"
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
        kettei: {
          title: '障害福祉-②決定支給量',
          array: ['回', '開始日', '終了日', 'サービス種別', '支給量'],
        },
        keikaku: {
          title: '障害福祉-③計画相談支援',
          array: ['回', '開始日', '終了日', '区', '事業所名'],
        },
        riyousya: {
          title: '障害福祉-④利用者負担',
          array: ['回', '開始日', '終了日', '上限月額', '管理対象'],
        },
      },
    };
  },
  props: [
    'basicFlag',
    'jyukyuFlag',
    'syogaiFlag',
    'ketteiFlag',
    'keikakuFlag',
    'riyousyaFlag',
  ],
  components: {},
  methods: {
    onInitialized(flexGrid) {
      flexGrid.columns.clear();
      //ヘッダ情報の作成
      this.createHeader(flexGrid);
      //セルのマージ
      this.cellMerge(flexGrid);
      //セルをクリック
      this.cellSelected(flexGrid);
      //セルのフォーマット
      this.cellFormat(flexGrid);
      // 未選択状態
      flexGrid.select(-1, -1);
    },

    /***********************
     * セルをクリック
     */
    cellSelected(flexGrid) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        flexGrid.select(-1, -1);
      });
    },
    /**********************
     * セルのフォーマット
     */
    cellFormat(flexGrid) {
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.columnHeaders) {
          if (_self.basicFlag) {
            e.cell.style.background = '#1f7872';
            e.cell.style.color = '#fff';
            e.cell.style.fontWeight = 'normal';
          }
        }
      });
    },
    /*******************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      let headerTitle = '';
      let headerArray = [];
      // 受給者情報
      if (this.jyukyuFlag) {
        headerTitle = this.headers.jyukyu.title;
        headerArray = this.headers.jyukyu.array;
      }
      // 受給者情報
      if (this.syogaiFlag) {
        headerTitle = this.headers.syogai.title;
        headerArray = this.headers.syogai.array;
      }
      // 決定支給量
      if (this.ketteiFlag) {
        headerTitle = this.headers.kettei.title;
        headerArray = this.headers.kettei.array;
      }
      // 計画相談支援
      if (this.keikakuFlag) {
        headerTitle = this.headers.keikaku.title;
        headerArray = this.headers.keikaku.array;
      }
      // 利用者負担
      if (this.riyousyaFlag) {
        headerTitle = this.headers.riyousya.title;
        headerArray = this.headers.riyousya.array;
      }

      while (flexGrid.columns.length < headerArray.length) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      // ヘッダマージ
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
      for (let colIndex = 0; colIndex < headerArray.length; colIndex++) {
        panel.setCellData(0, colIndex, headerTitle);
      }

      // ヘッダ記載
      for (let i = 0; i < headerArray.length; i++) {
        flexGrid.columnHeaders.setCellData(1, i, headerArray[i]);
      }

      // 仮の行数
      let totalRow = 3;
      while (flexGrid.rows.length < totalRow) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      // セルサイズ調整
      this.settingCellSizeCustom(flexGrid);
    },
    /***********************
     * セルサイズ調整
     */
    settingCellSizeCustom(flexGrid) {
      // 受給者情報
      flexGrid.columns[0].width = 28;
      if (this.jyukyuFlag) {
        flexGrid.columns[1].width = '4*';
        flexGrid.columns[2].width = '4*';
        flexGrid.columns[3].width = '4*';
        flexGrid.columns[4].width = 28;
        flexGrid.columns[5].width = '3*';
      }
      // 受給者情報
      if (this.syogaiFlag) {
        flexGrid.columns[1].width = '4*';
        flexGrid.columns[2].width = '4*';
        flexGrid.columns[3].width = '4*';
      }
      // 決定支援
      if (this.ketteiFlag) {
        flexGrid.columns[1].width = '4*';
        flexGrid.columns[2].width = '4*';
        flexGrid.columns[3].width = '4*';
        flexGrid.columns[4].width = '4*';
      }
      // 相談支援
      if (this.keikakuFlag) {
        flexGrid.columns[1].width = '4*';
        flexGrid.columns[2].width = '4*';
        flexGrid.columns[3].width = 28;
        flexGrid.columns[4].width = '4*';
      }
      // 利用者負担
      if (this.riyousyaFlag) {
        flexGrid.columns[1].width = '4*';
        flexGrid.columns[2].width = '4*';
        flexGrid.columns[3].width = '4*';
        flexGrid.columns[4].width = '4*';
      }

      flexGrid.columnHeaders.rows[0].height = 22;
      flexGrid.columnHeaders.rows[1].height = 22;
      flexGrid.columnHeaders.rows[1].align = 'center';
    },
    /********************
     * セルのマージ
     */
    cellMerge(flexGrid) {
      let mm = new wjGrid.MergeManager(flexGrid);
      let ranges = [];
      if (this.jyukyuFlag) {
        ranges = [
          new wjGrid.CellRange(0, 0, 0, 5),
          new wjGrid.CellRange(1, 4, 1, 5),
        ];
      }
      if (this.syogaiFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 3)];
      }
      if (this.ketteiFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 4)];
      }
      if (this.keikakuFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 4)];
      }
      if (this.riyousyaFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 4)];
      }
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
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#JyukyuRirekiView {
  .wj-cell.wj-header {
    font-size: $cell_fontsize;
    padding: 1px;
  }
}
</style>