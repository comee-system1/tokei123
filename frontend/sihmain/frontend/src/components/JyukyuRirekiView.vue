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
      class="no-scrollbars"
      :style="{ maxHeight: maxH }"
    >
    </wj-flex-grid>
  </div>
</template>
<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      maxH: '16vh', // グリッドの高さ
      allData: [], // データ配列
      headers: {
        jyukyu: {
          title: '受給者証情報',
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
          title: '障害支援区分',
          array: ['回', '開始日', '終了日', '支給区分'],
        },
        kettei: {
          title: '決定支給量',
          array: ['回', '開始日', '終了日', 'サービス種別', '支給量'],
        },
        keikaku: {
          title: '計画相談支援',
          array: ['回', '開始日', '終了日', '区', '事業所名'],
        },
        riyousya: {
          title: '利用者負担',
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
    'basicData',
    'jyukyuData',
    'syogaiData',
    'ketteiData',
    'keikakuData',
    'riyousyaData',
    'titleTab',
    'syogaiNum',
    'ketteiNum',
    'keikakuNum',
    'riyousyaNum',
  ],
  components: {},
  methods: {
    onInitialized(flexGrid) {
      flexGrid.columns.clear();
      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      // データの作成
      this.settingData(flexGrid);
      // セルのマージ
      this.cellMerge(flexGrid);
      // セルをクリック
      this.cellSelected(flexGrid);
      // セルのフォーマット
      this.cellFormat(flexGrid);
      // 未選択状態
      flexGrid.select(-1, -1);
    },

    /************************
     * データの取得・表記
     */
    settingData(flexGrid) {
      let data = [];

      // 受給者情報
      if (this.jyukyuFlag) {
        data = [
          {
            kai: 1,
            date: '2021.08.15',
            sikutyo: '東経市',
            bango: '000001307',
            icon: '児',
            name: '東経 文雄',
          },
          {
            kai: 2,
            date: '2021.08.15',
            sikutyo: '北経市',
            bango: '000001308',
            icon: '児',
            name: '東経 太郎',
          },
        ];

        for (let i = 0; i < data.length; i++) {
          let col = 0;
          flexGrid.setCellData(i, col++, data[i].kai);
          flexGrid.setCellData(i, col++, data[i].date);
          flexGrid.setCellData(i, col++, data[i].sikutyo);
          flexGrid.setCellData(i, col++, data[i].bango);
          flexGrid.setCellData(i, col++, data[i].icon);
          flexGrid.setCellData(i, col++, data[i].name);
        }
      }
      // 受給者情報
      else if (this.syogaiFlag) {
        data = [
          {
            kai: 1,
            start: '2021.08.15',
            end: '2021.09.15',
            kubun: '区分4',
          },
        ];
        for (let i = 0; i < data.length; i++) {
          let col = 0;
          flexGrid.setCellData(i, col++, data[i].kai);
          flexGrid.setCellData(i, col++, data[i].start);
          flexGrid.setCellData(i, col++, data[i].end);
          flexGrid.setCellData(i, col++, data[i].kubun);
        }
      }
      // 決定支給量
      else if (this.ketteiFlag) {
        data = [
          {
            kai: 1,
            start: '2021.08.15',
            end: '2021.09.15',
            service: '生活介護',
            sikyu: '-8日/月',
          },
        ];
        for (let i = 0; i < data.length; i++) {
          let col = 0;
          flexGrid.setCellData(i, col++, data[i].kai);
          flexGrid.setCellData(i, col++, data[i].start);
          flexGrid.setCellData(i, col++, data[i].end);
          flexGrid.setCellData(i, col++, data[i].service);
          flexGrid.setCellData(i, col++, data[i].sikyu);
        }
      }
      // 計画相談支援
      else if (this.keikakuFlag) {
        data = [
          {
            kai: 1,
            start: '2021.08.15',
            end: '2021.09.15',
            ku: '他',
            jijyosyo: 'ひまわり相談支援事務所',
          },
        ];
        for (let i = 0; i < data.length; i++) {
          let col = 0;
          flexGrid.setCellData(i, col++, data[i].kai);
          flexGrid.setCellData(i, col++, data[i].start);
          flexGrid.setCellData(i, col++, data[i].end);
          flexGrid.setCellData(i, col++, data[i].ku);
          flexGrid.setCellData(i, col++, data[i].jijyosyo);
        }
      }
      // 利用者負担
      else if (this.riyousyaFlag) {
        data = [
          {
            kai: 1,
            start: '2021.08.15',
            end: '2021.09.15',
            jyogen: 37200,
            kanri: '非該当',
          },
        ];
        for (let i = 0; i < data.length; i++) {
          let col = 0;
          flexGrid.setCellData(i, col++, data[i].kai);
          flexGrid.setCellData(i, col++, data[i].start);
          flexGrid.setCellData(i, col++, data[i].end);
          flexGrid.setCellData(i, col++, data[i].jyogen);
          flexGrid.setCellData(i, col++, data[i].kanri);
        }
      }
      this.allData = data;
    },
    /***********************
     * セルをクリック
     */
    cellSelected(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        let code = '';
        if (_self.jyukyuFlag) {
          code = 'jyukyu';
        } else if (_self.syogaiFlag) {
          code = 'syogai';
        } else if (_self.ketteiFlag) {
          code = 'kettei';
        } else if (_self.keikakuFlag) {
          code = 'keikaku';
        } else if (_self.riyousyaFlag) {
          code = 'riyousya';
        }

        _self.$emit('child_rireki_data', _self.allData[hPage.row], code);
        _self.$_setSubGridSelected(true);
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
            e.cell.style.background = sysConst.COLOR.basicGridColor;
            e.cell.style.color = sysConst.COLOR.white;
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
        headerTitle = this.titleTab + '-' + this.headers.jyukyu.title;
        headerArray = this.headers.jyukyu.array;
      }
      // 障害区分
      else if (this.syogaiFlag) {
        headerTitle =
          this.titleTab + '-' + this.syogaiNum + this.headers.syogai.title;
        headerArray = this.headers.syogai.array;
      }
      // 決定支給量
      else if (this.ketteiFlag) {
        headerTitle =
          this.titleTab + '-' + this.ketteiNum + this.headers.kettei.title;
        headerArray = this.headers.kettei.array;
      }
      // 計画相談支援
      else if (this.keikakuFlag) {
        headerTitle =
          this.titleTab + '-' + this.keikakuNum + this.headers.keikaku.title;
        headerArray = this.headers.keikaku.array;
      }
      // 利用者負担
      else if (this.riyousyaFlag) {
        headerTitle =
          this.titleTab + '-' + this.riyousyaNum + this.headers.riyousya.title;
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
      let totalRow = 10;
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
      flexGrid.columns[0].width = 22;
      if (this.jyukyuFlag) {
        flexGrid.columns[1].width = 81;
        flexGrid.columns[2].width = '3*';
        flexGrid.columns[3].width = '4*';
        flexGrid.columns[4].width = 22;
        flexGrid.columns[5].width = '3*';
      }
      // 障害者支援区分
      else if (this.syogaiFlag) {
        flexGrid.columns[1].width = '3*';
        flexGrid.columns[2].width = '3*';
        flexGrid.columns[3].width = '4*';
      }
      // 決定支援
      else if (this.ketteiFlag) {
        flexGrid.columns[1].width = '3*';
        flexGrid.columns[2].width = '3*';
        flexGrid.columns[3].width = '4*';
        flexGrid.columns[4].width = '2*';
      }
      // 相談支援
      else if (this.keikakuFlag) {
        flexGrid.columns[1].width = 81;
        flexGrid.columns[2].width = 81;
        flexGrid.columns[3].width = 23;
        flexGrid.columns[4].width = '4*';
      }
      // 利用者負担
      else if (this.riyousyaFlag) {
        flexGrid.columns[1].width = 81;
        flexGrid.columns[2].width = 81;
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
      let mm = new wjGrid.MergeManager();
      let ranges = [];
      if (this.jyukyuFlag) {
        ranges = [
          new wjGrid.CellRange(0, 0, 0, 5),
          new wjGrid.CellRange(1, 4, 1, 5),
        ];
      } else if (this.syogaiFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 3)];
      } else if (this.ketteiFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 4)];
      } else if (this.keikakuFlag) {
        ranges = [new wjGrid.CellRange(0, 0, 0, 4)];
      } else if (this.riyousyaFlag) {
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
  .wj-cell.wj-header:first-child {
    text-align: left;
  }
  .wj-cell {
    font-size: $cell_fontsize;
    overflow: visible;
    text-align: center;
    padding: 1px;
  }

  .no-scrollbars.wj-flexgrid [wj-part='root'] {
    overflow: hidden !important;
  }
}
</style>