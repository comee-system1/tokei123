<template>
  <div id="JyukyuRirekiView">
    <div v-if="this.kihonFlag">
      <wj-flex-grid
        id="grdKihon"
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
        :itemsSourceChanged="onItemsSourceChanged"
        :style="{ maxHeight: maxH }"
      >
      </wj-flex-grid>
    </div>
    <div v-else-if="this.syogaiFlag">
      <wj-flex-grid
        id="grdSyogaiKubun"
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
        :itemsSourceChanged="onItemsSourceChanged"
        :style="{ maxHeight: maxH }"
      >
      </wj-flex-grid>
    </div>
    <div v-else-if="this.ketteiFlag">
      <wj-flex-grid
        id="grdKettei"
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
        :itemsSourceChanged="onItemsSourceChanged"
        :style="{ maxHeight: maxH }"
      >
      </wj-flex-grid>
    </div>
    <div v-else-if="this.keikakuFlag">
      <wj-flex-grid
        id="grdKeikaku"
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
        :itemsSourceChanged="onItemsSourceChanged"
        :style="{ maxHeight: maxH }"
      >
      </wj-flex-grid>
    </div>
    <div v-else-if="this.futanFlag">
      <wj-flex-grid
        id="grdFutan"
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
        :itemsSourceChanged="onItemsSourceChanged"
        :style="{ maxHeight: maxH }"
      >
      </wj-flex-grid>
    </div>
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
        kihon: {
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
            { dataname: 'ntsymdDisp', title: '開始日' },
            { dataname: 'nteymdDisp', title: '終了日' },
            { dataname: 'syogaikbnDisp', title: '支給区分' },
          ],
        },
        kettei: {
          title: '決定支給量',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'sksymdDisp', title: '開始日' },
            { dataname: 'skeymdDisp', title: '終了日' },
            { dataname: 'svcshuruiryaku', title: 'サービス種別' },
            { dataname: 'dspskryotani', title: '支給量' },
          ],
        },
        keikaku: {
          title: '計画相談支援',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'rksymdDisp', title: '開始日' },
            { dataname: 'rkeymdDisp', title: '終了日' },
            { dataname: 'sjgyokbnDisp', title: '区' },
            { dataname: 'sjigyoryaku', title: '事業所名' },
          ],
        },
        futan: {
          title: '利用者負担',
          array: [
            { dataname: '', title: '回' },
            { dataname: 'tesymdDisp', title: '開始日' },
            { dataname: 'teeymdDisp', title: '終了日' },
            { dataname: 'fjyogenDisp', title: '上限月額' },
            { dataname: 'jgenkbnDisp', title: '管理対象' },
          ],
        },
      },
    };
  },
  props: [
    'basicFlag',
    'kihonFlag',
    'syogaiFlag',
    'ketteiFlag',
    'keikakuFlag',
    'futanFlag',
    'basicData',
    'kihonData',
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
    settingData(list) {
      this.allData = list;
    },
    /***********************
     * イベント設定
     */
    setEvents(flexGrid) {
      let _self = this;
      let code = '';
      let g = null;
      if (_self.kihonFlag) {
        code = 'kihon';
        g = wijmo.Control.getControl('#grdKihon');
      } else if (_self.syogaiFlag) {
        code = 'syogai';
        g = wijmo.Control.getControl('#grdSyogaiKubun');
      } else if (_self.ketteiFlag) {
        code = 'kettei';
        g = wijmo.Control.getControl('#grdKettei');
      } else if (_self.keikakuFlag) {
        code = 'keikaku';
        g = wijmo.Control.getControl('#grdKeikaku');
      } else if (_self.futanFlag) {
        code = 'futan';
        g = wijmo.Control.getControl('#grdFutan');
      }
      //セルをクリック
      flexGrid.hostElement.addEventListener('click', function (e) {
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        if (g !== null) {
          _self.$emit('child_data', g.itemsSource[hPage.row], code);
        }
        _self.$emit('setSubGridSelected', true);
      });
      //formatItem
      flexGrid.formatItem.addHandler(function (s, e) {
        if (e.panel == flexGrid.columnHeaders && e.row == 0) {
          e.cell.style.textAlign = 'left';
        }
        if (e.panel == flexGrid.columnHeaders && e.row == 1) {
          e.cell.style.textAlign = 'center';
        }
        if (e.panel == flexGrid.columnHeaders && _self.basicFlag) {
          e.cell.style.background = sysConst.COLOR.basicGridColor;
          e.cell.style.color = sysConst.COLOR.white;
          e.cell.style.fontWeight = 'normal';
        }
        if (
          code === 'futan' &&
          e.panel != flexGrid.columnHeaders &&
          e.col == 3
        ) {
          e.cell.style.textAlign = 'right';
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
      if (this.kihonFlag) {
        headerTitle = this.titleTab + '-' + this.headers.kihon.title;
        headerArray = this.headers.kihon.array;
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
      if (this.kihonFlag) {
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
      if (this.kihonFlag) {
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