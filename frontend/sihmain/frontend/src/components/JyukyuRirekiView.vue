<template>
  <div id="JyukyuRirekiView">
    <wj-flex-grid
      :itemsSource="allData"
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
      :formatItem="onFormatItem"
      :itemsSourceChanged="onItemsSourceChanged"
      :style="{ maxHeight: maxH }"
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
import '@grapecity/wijmo.vue2.core';
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
            { dataname: '', title: '回' },
            { dataname: 'kofuymdDisp', title: '交付年月日' },
            { dataname: 'shichosonname', title: '市区町村' },
            { dataname: 'jyukyuno', title: '受給証番号' },
            { dataname: 'jido', title: '支給決定者' },
            { dataname: 'jyukyuname', title: '支給決定者' },
          ],
        },
        syogai: {
          title: '障害支援区分',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'start', title: '開始日' },
            { dataname: 'end', title: '終了日' },
            { dataname: 'kubun', title: '支給区分' },
          ],
        },
        kettei: {
          title: '決定支給量',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'start', title: '開始日' },
            { dataname: 'end', title: '終了日' },
            { dataname: 'service', title: 'サービス種別' },
            { dataname: 'sikyu', title: '支給量' },
          ],
        },
        keikaku: {
          title: '計画相談支援',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'start', title: '開始日' },
            { dataname: 'end', title: '終了日' },
            { dataname: 'ku', title: '区' },
            { dataname: 'jijyosyo', title: '事業所名' },
          ],
        },
        futan: {
          title: '利用者負担',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'start', title: '開始日' },
            { dataname: 'end', title: '終了日' },
            { dataname: 'jyogen', title: '上限月額' },
            { dataname: 'kanri', title: '管理対象' },
          ],
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
    'futanFlag',
    'basicData',
    'jyukyuData',
    'syogaiData',
    'ketteiData',
    'keikakuData',
    'futanData',
    'titleTab',
    'syogaiNum',
    'ketteiNum',
    'keikakuNum',
    'futanNum',
    'grdData',
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
      // イベント設定
      this.setEvents(flexGrid);
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
        data = this.$_kihonDataOrg();
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
          {
            kai: '',
            start: '',
            end: '',
            kubun: '',
          },
          {
            kai: '',
            start: '',
            end: '',
            kubun: '',
          },
        ];
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
          {
            kai: '',
            start: '',
            end: '',
            service: '',
            sikyu: '',
          },
          {
            kai: '',
            start: '',
            end: '',
            service: '',
            sikyu: '',
          },
        ];
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
          {
            kai: '',
            start: '',
            end: '',
            ku: '',
            jijyosyo: '',
          },
          {
            kai: '',
            start: '',
            end: '',
            ku: '',
            jijyosyo: '',
          },
        ];
      }
      // 利用者負担
      else if (this.futanFlag) {
        data = [
          {
            kai: 1,
            start: '2021.08.15',
            end: '2021.09.15',
            jyogen: 37200,
            kanri: '非該当',
          },
          {
            kai: '',
            start: '',
            end: '',
            jyogen: '',
            kanri: '',
          },
          {
            kai: '',
            start: '',
            end: '',
            jyogen: '',
            kanri: '',
          },
        ];
      }
      this.allData = data;
    },
    /***********************
     * イベント設定
     */
    setEvents(flexGrid) {
      let _self = this;
      //セルをクリック
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
        } else if (_self.futanFlag) {
          code = 'futan';
        }

        _self.$emit('child_data', _self.allData[hPage.row], code);
        _self.$_setSubGridSelected(true);
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
      else if (this.futanFlag) {
        headerTitle =
          this.titleTab + '-' + this.futanNum + this.headers.futan.title;
        headerArray = this.headers.futan.array;
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
        let col = flexGrid.columns[i];
        col.binding = headerArray[i].dataname;
        col.header = headerArray[i].title;
      }

      // セルサイズ調整
      this.settingCellSizeCustom(flexGrid);
    },
    /***********************
     * セルサイズ調整
     */
    settingCellSizeCustom(flexGrid) {
      // 受給者情報
      flexGrid.columns[0].visible = false;
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
      else if (this.futanFlag) {
        flexGrid.columns[1].width = 81;
        flexGrid.columns[2].width = 81;
        flexGrid.columns[3].width = '4*';
        flexGrid.columns[4].width = '4*';
      }
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
      } else if (this.futanFlag) {
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
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    onFormatItem(flexGrid, e) {
      flexGrid.beginUpdate();
      if (e.panel == flexGrid.columnHeaders && e.row == 0) {
        e.cell.style.textAlign = 'left';
      }
      if (e.panel == flexGrid.columnHeaders && e.row == 1) {
        e.cell.style.textAlign = 'center';
      }
      if (e.panel == flexGrid.columnHeaders && this.basicFlag) {
        e.cell.style.background = sysConst.COLOR.basicGridColor;
        e.cell.style.color = sysConst.COLOR.white;
        e.cell.style.fontWeight = 'normal';
      }
      flexGrid.endUpdate();
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

  // スクロールバーの表示
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $light-gray;
    border-radius: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: $brawn;
    border-radius: 0px;
  }
}
</style>