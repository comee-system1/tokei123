<template>
  <div id="serviceHistory" class="mt-n1">
    <v-container fluid class="container mt-0 user-info">
      <riyousyadaityo-sort-menu
        @displaySort="displaySort($event)"
        @sorted="sorted($event)"
        @alphabeted="alphabeted($event)"
        @selectedServiceJigyo="selectedServiceJigyo($event)"
        @selectedServiceNaiyo="selectedServiceNaiyo($event)"
        @kanaSearch="kanaSearch($event)"
        :kihonJyohoFlag="false"
        :serviceHistoryFlag="true"
        ref="childRiyousyadaityo"
      ></riyousyadaityo-sort-menu>
      <wj-flex-grid
        id="serviceHistoryGrid"
        :initialized="onInitialized"
        :selectionMode="3"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :allowDragging="false"
        :allowResizing="true"
        :deferResizing="false"
        :allowSorting="false"
        :autoRowHeights="true"
        :itemsSource="historyData"
      >
        <wj-flex-grid-column
          :binding="'code'"
          align="center"
          valign="middle"
          :width="75"
          format="g"
          :allowResizing="false"
          :isReadOnly="true"
          :visible="isVisible1"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyosyamei'"
          align="left"
          valign="middle"
          :width="160"
          :isReadOnly="true"
          :allowResizing="true"
          :visible="isVisible1"
          :multiLine="true"
          :wordWrap="true"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          :binding="'serviceTeikyoJigyosyoCode'"
          align="center"
          valign="middle"
          :width="60"
          :isReadOnly="true"
          :allowResizing="false"
          format="g"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceTeikyoJigyosyo'"
          align="left"
          valign="middle"
          :width="255"
          :isReadOnly="true"
          :multiLine="true"
          :wordWrap="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceCode'"
          align="center"
          valign="middle"
          :width="30"
          format="g"
          :isReadOnly="true"
          :allowResizing="false"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'serviceMeisyo'"
          align="left"
          valign="middle"
          :width="205"
          :isReadOnly="true"
          :multiLine="true"
          :wordWrap="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'code'"
          align="center"
          valign="middle"
          :width="75"
          format="g"
          :allowResizing="false"
          :isReadOnly="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'riyosyamei'"
          align="left"
          valign="middle"
          :width="135"
          :isReadOnly="true"
          :multiLine="true"
          :wordWrap="true"
          :visible="isVisible2"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          :binding="'spice'"
          align="center"
          valign="middle"
          :width="30"
          :allowResizing="false"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'startDate'"
          :header="'開始日'"
          align="center"
          valign="middle"
          :width="100"
          :allowResizing="false"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'endDate'"
          :header="'終了日'"
          align="center"
          valign="middle"
          :width="100"
          :allowResizing="false"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'processTime'"
          align="right"
          valign="middle"
          :width="100"
          :allowResizing="false"
          :isReadOnly="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
    <dialog-service-history
      ref="dialog_service"
      :historyData="historyData"
    ></dialog-service-history>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
import RiyousyadaityoSortMenu from '../components/RiyousyadaityoSortMenu.vue';
import DialogServiceHistory from '../components/DialogServiceHistory.vue';

import { ServiceHistory } from '@backend/api/ServiceHistory';

export default {
  data() {
    return {
      year: moment().year(),
      allData: [],
      historyData: [],
      displaySortTypeKey: 'all', // 表示項目の初期
      alphabetKey: 0, // 50音検索の初期
      sortedType: 'jigyo', // ソートの初期
      serviceJigyo: {
        serviceTeikyoJigyosyo: '',
        serviceTeikyoJigyosyoCode: '',
      }, // サービス事業の初期
      serviceNaiyo: {
        serviceMeisyo: '',
        serviceCode: '',
      }, // サービス事業の初期
      kanaText: '',
      isVisible1: false, // 初期選択状態
      isVisible2: true, // 初期選択状態
      selectKey: '', // ダイアログに渡すキー
    };
  },
  components: {
    RiyousyadaityoSortMenu,
    DialogServiceHistory,
  },

  methods: {
    /***************:
     * かな検索
     */
    kanaSearch(value) {
      this.kanaText = value.input;
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },
    /*************************
     * サービス事業を選択
     */
    selectedServiceJigyo(service) {
      this.serviceJigyo = {
        serviceTeikyoJigyosyo: service.serviceTeikyoJigyosyo,
        serviceTeikyoJigyosyoCode: service.serviceTeikyoJigyosyoCode,
      };
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },
    selectedServiceNaiyo(service) {
      this.serviceNaiyo = {
        serviceMeisyo: service.serviceMeisyo,
        serviceCode: service.serviceCode,
      };
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },
    /**********************
     * 名前の絞り込み
     */
    alphabeted(data) {
      this.alphabetKey = data.alphabetKey;
      let arg = {
        displaySortType: this.displaySortTypeKey,
      };
      this.displaySort(arg);
    },

    /************************
     * 子コンポーネントのソート項目
     */
    sorted(type) {
      // 表示配列の合計列を省く
      let array = [];
      this.sortedType = type.sortedType;
      for (let i = 0; i < this.historyData.length; i++) {
        if (isNaN(this.historyData[i].code) === false) {
          array.push(this.historyData[i]);
        }
      }
      if (type.sortedType === 'kana') {
        array.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          return 0;
        });

        this.isVisible1 = true;
        this.isVisible2 = false;
      }
      if (type.sortedType === 'code') {
        array.sort((a, b) => {
          // コードの昇順
          if (parseInt(a.code) > parseInt(b.code)) {
            return 1;
          }
          if (parseInt(a.code) < parseInt(b.code)) {
            return -1;
          }
          return 0;
        });
        this.isVisible1 = true;
        this.isVisible2 = false;
      }
      if (type.sortedType === 'jigyo') {
        array.sort((a, b) => {
          // コードの昇順
          if (parseInt(a.code) > parseInt(b.code)) {
            return 1;
          }
          if (parseInt(a.code) < parseInt(b.code)) {
            return -1;
          }
          return 0;
        });
        array = this.changeSortting(array);

        this.isVisible1 = false;
        this.isVisible2 = true;
      }

      this.historyData = [];
      this.historyData = array;
      this.createHeaderMerge(this.mainFlexGrid);
    },
    /****************************
     * 子コンポーネントの表示項目
     */
    displaySort(type) {
      this.displaySortTypeKey = type.displaySortType;

      // 有効
      // 開始日が本日以前のデータ
      if (type.displaySortType === 'enable') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let st = '';
          if (this.allData[i].startDate) {
            st = moment(this.allData[i].startDate);
          } else {
            st = '';
          }
          if (st && st.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.historyData = [];
        this.historyData = array;
      }
      // 終了
      // 終章日が本日以前のデータ
      if (type.displaySortType === 'finish') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let ed = '';
          if (this.allData[i].endDate) {
            ed = moment(this.allData[i].endDate);
          } else {
            ed = '';
          }
          if (ed && ed.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.historyData = [];
        this.historyData = array;
      }
      // 全員
      if (type.displaySortType === 'all') {
        this.historyData = [];
        this.historyData = this.allData;
      }

      // 表示配列の合計列を省く
      let array = [];
      for (let i = 0; i < this.historyData.length; i++) {
        if (isNaN(this.historyData[i].code) === false) {
          let kana = this.historyData[i].kana;
          if (
            (this.kanaText.length == 0 ||
              this.historyData[i].riyosyamei.indexOf(this.kanaText) != -1 ||
              this.historyData[i].code.toString().indexOf(this.kanaText) !=
                -1) &&
            (this.serviceNaiyo.serviceCode == 0 ||
              this.serviceNaiyo.serviceCode ==
                this.historyData[i].serviceCode) &&
            (this.serviceJigyo.serviceTeikyoJigyosyoCode == 0 ||
              this.serviceJigyo.serviceTeikyoJigyosyoCode ==
                this.historyData[i].serviceTeikyoJigyosyoCode) &&
            (this.alphabetKey == 0 ||
              (this.alphabetKey == 1 && kana.match(/^[ア-オ]/)) ||
              (this.alphabetKey == 2 && kana.match(/^[カ-コ]/)) ||
              (this.alphabetKey == 3 && kana.match(/^[サ-ソ]/)) ||
              (this.alphabetKey == 4 && kana.match(/^[タ-ト]/)) ||
              (this.alphabetKey == 5 && kana.match(/^[ナ-ノ]/)) ||
              (this.alphabetKey == 6 && kana.match(/^[ハ-ホ]/)) ||
              (this.alphabetKey == 7 && kana.match(/^[マ-モ]/)) ||
              (this.alphabetKey == 8 && kana.match(/^[ヤ-ヨ]/)) ||
              (this.alphabetKey == 9 && kana.match(/^[ラ-ロ]/)) ||
              (this.alphabetKey == 10 && kana.match(/^[ワ-ン]/)))
          ) {
            array.push(this.historyData[i]);
          }
        }
      }
      this.historyData = this.changeSortting(array);
      this.createHeaderMerge(this.mainFlexGrid);
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.getData().then((result) => {
        this.historyData = result;

        // 子コンポーネントにサービス事業を設定
        this.$refs.childRiyousyadaityo.setServiceJigyoCombo(this.historyData);
        this.$refs.childRiyousyadaityo.setServiceNaiyoCombo(this.historyData);
      });

      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);

      this.methodCellFormatSetting(flexGrid);

      flexGrid.select(-1, -1);

      // セルを押下
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);

        if (ht.cellType == wjGrid.CellType.Cell) {
          if (isNaN(_self.historyData[ht.row].code) === false) {
            _self.selectKey = ht.row;
            _self.$refs.dialog_service.openDialog(_self.selectKey);
          }
        }
      });
    },
    async getData() {
      let historyData = [];

      return ServiceHistory().then((result) => {
        historyData = result.seikyu_inf;
        // サービス順に並び替え
        let returns = this.changeSortting(historyData);
        this.allData = returns;
        return returns;
      });
    },

    /*********************
     * サービス順に並び替え
     */
    changeSortting(historyData) {
      // サービス順に並び替え
      historyData.sort((a, b) => {
        if (a.serviceCode === null || b.serviceCode === null) {
          return 2;
        }
        if (a.serviceCode < b.serviceCode) {
          return -1;
        }
        if (a.serviceCode > b.serviceCode) {
          return 1;
        }
        return 0;
      });
      // サービス毎の合計数を取得
      let dict = this.getServiceCount(historyData);
      let returns = [];
      let n = 1;
      let noServiceCount = 0;
      for (let i = 0; i < historyData.length; i++) {
        returns.push(historyData[i]);
        if (dict[historyData[i].serviceCode] == n) {
          returns.push({
            code: '計', // サービス提供事業所の位置に計(文字列)を表示する
            riyosyamei: n + '名', //利用者名の位置にカウント数を表示するため
          });
          n = 1;
        } else {
          n++;
        }
        // サービスコードが無いカウント
        if (!historyData[i].serviceCode) {
          noServiceCount++;
        }
      }
      // サービス情報が無い合計の列
      if (noServiceCount > 0 && this.sortedType == 'jigyo') {
        returns.push({
          code: '未登録 計', // サービス提供事業所の位置に計(文字列)を表示する
          riyosyamei: noServiceCount + '名', //利用者名の位置にカウント数を表示するため
        });
      }
      this.noServiceCount = noServiceCount;

      // 子供関数実行
      // 件数のカウント
      this.$refs.childRiyousyadaityo.setTotalcount(historyData);
      return returns;
    },

    getServiceCount(data) {
      // ソートが事業所+サービスの時のみ有効
      if (this.sortedType != 'jigyo') {
        return [];
      }
      let serviceCode = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].serviceCode) {
          serviceCode.push(data[i].serviceCode);
        }
      }
      let dict = {};
      for (let key of serviceCode) {
        dict[key] = serviceCode.filter(function (x) {
          return x == key;
        }).length;
      }

      if (this.noServiceCount) {
        dict['noservice'] = this.noServiceCount;
      }

      return dict;
    },
    methodCellFormatSetting(flexGrid) {
      let self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        // サービス毎の合計数を取得
        let dict = self.getServiceCount(self.historyData);
        let yellowLine = [];
        let rows = '';
        Object.keys(dict).forEach(function (key) {
          rows += dict[key];
          yellowLine.push(rows.toString());
          rows++;
        });

        if (e.panel == flexGrid.columnHeaders) {
          if (e.col == 8) {
            let text = e.cell.innerText;
            let classname = 'vertical';
            e.cell.innerHTML =
              '<div class="' + classname + '">' + text + '</div>';
          }
        }
        if (e.panel != flexGrid.columnHeaders) {
          if (yellowLine.indexOf(e.row.toString()) != -1) {
            e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
            e.cell.style.textAlign = 'center';
          } else {
            e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
            e.cell.style.textAlign = 'left';
          }
          if (
            e.col == 0 ||
            e.col == 2 ||
            e.col == 6 ||
            e.col == 10 ||
            e.col == 9
          ) {
            e.cell.style.textAlign = 'center';
            e.cell.style.justifyContent = 'center';
            e.cell.style.alignItems = 'center';
          }
          if (e.col == 11) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
            if (e.cell.innerText.match('-')) {
              let val = e.cell.innerText.split('-');
              let str = '';
              if (val[0] > 0) {
                str += '<span class="inline">' + val[0] + '年</span>';
              }
              if (val[1] > 0) {
                str += '<span class="inline">' + val[1] + 'ヶ月</span>';
              }
              e.cell.innerHTML = str;
            }
          }
        }
      });
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, 'コード');
      panel.setCellData(0, 1, '利用者名');
      panel.setCellData(0, 2, 'サービス提供事業所');
      panel.setCellData(0, 4, 'サービス名称');
      panel.setCellData(0, 6, 'コード');
      panel.setCellData(0, 7, '利用者名');
      panel.setCellData(0, 8, '種類');
      panel.setCellData(0, 9, '利用期間');
      panel.setCellData(0, 11, '利用年数');
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 5),
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
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#serviceHistoryGrid {
  width: auto;
}
div#serviceHistory {
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: none;
  max-width: none;
  width: auto;

  .wj-cell.wj-header.wj-align-right,
  .wj-cell.wj-header.wj-align-left,
  .wj-cell.wj-header.wj-align-center {
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
  }

  .wj-cell {
    &.wj-state-selected {
      color: $font_color;
      background-color: $grid_hover_background;
    }
    &.wj-state-multi-selected {
      color: $font_color;
      background-color: $grid_hover_background;
    }
    color: $font_color;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }
  .inline {
    display: inline-block;
    width: 40px;
  }
}
</style>