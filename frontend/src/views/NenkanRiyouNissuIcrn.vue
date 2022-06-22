<template>
  <div id="nyutaiin">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-service-select="parentSearch($event, searchArgument)"
      :nenkanRiyouNissuFlag="true"
      ref="childheader"
    ></header-services>

    <v-container fluid class="jijyougen-container mt-0 user-info">
      <v-row no-gutters>
        <v-col cols="9">
          <v-row class="mt-1" no-gutters>
            <label>集計(開始終了月)</label>
            <v-btn-toggle class="flex-wrap ml-1" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="filter(1)"
              >
                含める
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="filter(0)"
              >
                含めない
              </v-btn>
            </v-btn-toggle>

            <label class="ml-1">ソート</label>
            <v-btn-toggle class="flex-wrap ml-1" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(1)"
              >
                カナ
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(2)"
              >
                コード
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(3)"
              >
                受給者証番号
              </v-btn>
            </v-btn-toggle>

            <v-btn class="ml-2" small>検索</v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-1">
        <v-col cols="4">
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn
              small
              outlined
              v-for="(n, k) in alphabet"
              :key="n"
              :width="25"
              :height="25"
              p-0
              style="min-width: auto"
              @click="onAlphabet(k)"
            >
              {{ n }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="container">
      <wj-flex-grid
        id="grid_nyutaiin"
        class="mt-n5"
        :selectionMode="'None'"
        :initialized="onInitialized"
        :allowMerging="6"
        :headersVisibility="'Column'"
        :alternatingRowStep="0"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
        :autoGenerateColumns="false"
        :itemsSource="nenkanRiyouNissuData"
        :style="gridHeight"
      >
        <wj-flex-grid-column
          :binding="'riyocode'"
          align="center"
          valign="middle"
          :width="80"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'jyukyuno'"
          align="center"
          valign="middle"
          :width="80"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'names'"
          align="center"
          valign="middle"
          width="2*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'syogaikbn'"
          align="center"
          valign="middle"
          :multiLine="true"
          :width="40"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'symd_view'"
          align="center"
          valign="middle"
          width="1*"
          :multiLine="true"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'eymd_view'"
          align="center"
          valign="middle"
          width="1*"
          :multiLine="true"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          v-for="(n, k) in 9"
          :key="k + 3"
          :binding="'nissu' + parseInt(n + 3)"
          :header="n + 3 + '月'"
          align="center"
          valign="middle"
          :width="50"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          v-for="(n, k) in 3"
          :key="k"
          :binding="'nissu' + n"
          :header="n + '月'"
          align="center"
          valign="middle"
          :width="50"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'gokei'"
          align="center"
          valign="middle"
          width="1*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'avg'"
          align="center"
          valign="middle"
          width="1*"
          :isReadOnly="true"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-container>
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';

import HeaderServices from '../components/HeaderServices.vue';
import { nenkanRiyouNissuIcrn } from '@backend/api/NenkanRiyouNissuIcrn';
import sysConst from '@/utiles/const';

const riyosyaCombo = [];
const receptCombo = [];
const jyougenkanriCombo = [];
const taServiceCombo = [];

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
      nenkanRiyouNissuData: [],
      allData: [],
      alphabet: alphabet,
      alphabetSelect: 0,
      riyosyaCombo: riyosyaCombo,
      jyougenkanriCombo: jyougenkanriCombo,
      taServiceCombo: taServiceCombo,
      receptCombo: receptCombo,
      syukeiFlag: 1,
      sortFlag: 1,
      gridHeight: '', // グリッドの高さ
      searchArgument: '',
    };
  },
  components: {
    HeaderServices,
  },
  mounted() {
    this.handleResize();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.nenkanRiyouNissuData = [];
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 62;
      if (height > 800) {
        ht = 75;
      } else if (height > 700) {
        ht = 70;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      flexGrid.select(-1, -1);
      this.nendo = this.getChildYear();
      this.createHeader(flexGrid);
      this.createHeaderMerge(flexGrid);

      nenkanRiyouNissuIcrn().then((result) => {
        // データ取得
        this.getData(result);
        // フッタデータ登録
        this.settingFooterData(flexGrid, result);
      });
      // フォーマット
      this.createSyukeiCellFormat(flexGrid);
    },
    /**************
     * フォーマット
     */
    createSyukeiCellFormat(flexGrid) {
      flexGrid.formatItem.addHandler(function (s, e) {
        let classname = '';
        let text = e.cell.innerText;
        if (
          e.panel != flexGrid.columnHeaders &&
          e.panel != flexGrid.columnFooters
        ) {
          if (text == '-1') {
            text = '';
            e.cell.style.background = sysConst.COLOR.lightGray;
          } else {
            e.cell.style.background = sysConst.COLOR.lightYellow;
          }
          if (e.col == 2) {
            e.cell.style.textAlign = 'left';
            e.cell.style.justifyContent = 'left';
            e.cell.style.alignItems = 'left';
          }
        }

        if (e.panel != flexGrid.columnHeaders) {
          if (e.col > 5) {
            e.cell.style.textAlign = 'right';
            e.cell.style.justifyContent = 'right';
            e.cell.style.alignItems = 'right';
          }
        }

        if (e.col == 3) {
          e.cell.style.borderRight = '1px solid ';
          e.cell.style.borderLeft = '1px solid ';
        }
        if (e.col == 5) {
          e.cell.style.borderRight = '1px solid ';
        }
        if (e.col == 18) {
          e.cell.style.borderLeft = '1px solid ';
        }

        e.cell.innerHTML =
          '<div class="' +
          classname +
          '">' +
          wjCore.escapeHtml(text) +
          '</div>';
      });
    },

    /***************
     * データ取得
     */
    getData(result) {
      this.nenkanRiyouNissuData = result.riyo_inf;
      this.allData = this.nenkanRiyouNissuData;
    },
    settingFooterData(flexGrid, result) {
      var footerPanel = flexGrid.columnFooters;

      // 利用日数計
      let riyonissu = result.gokei_inf.gokei_inf;
      let c = 6;
      for (let i = 4; i <= 12; i++) {
        let m = 'nissu' + i;
        let value = riyonissu[m];
        footerPanel.setCellData(0, c, value);
        c++;
      }
      for (let i = 1; i <= 3; i++) {
        let m = 'nissu' + i;
        let value = riyonissu[m];
        footerPanel.setCellData(0, c, value);
        c++;
      }
      footerPanel.setCellData(0, c++, riyonissu.gokei);
      footerPanel.setCellData(0, c++, riyonissu.avg);

      // 開所日数
      let kaisyonissu = result.kaisyo_inf.kaisyo_inf;
      c = 6;
      for (let i = 4; i <= 12; i++) {
        let m = 'nissu' + i;
        let value = kaisyonissu[m];
        footerPanel.setCellData(1, c, value);
        c++;
      }
      for (let i = 1; i <= 3; i++) {
        let m = 'nissu' + i;
        let value = kaisyonissu[m];
        footerPanel.setCellData(1, c, value);
        c++;
      }
      footerPanel.setCellData(1, c++, kaisyonissu.gokei);
      footerPanel.setCellData(1, c++, kaisyonissu.avg);
    },
    /************
     * ヘッダフッタ作成
     */
    // 親ヘッダからの年度データ
    parentSearch(searchArgument) {
      if (searchArgument.search_button) {
        this.nendo = searchArgument.defaultYear;
        var panel = this.mainFlexGrid.columnHeaders;
        panel.setCellData(0, 6, this.nendo + '年');
        panel.setCellData(0, 15, parseInt(this.nendo) + 1 + '年');
      }
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      var footerPanel = flexGrid.columnFooters;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());
      flexGrid.columnFooters.rows.insert(0, new wjGrid.GroupRow());
      flexGrid.columnFooters.rows.insert(1, new wjGrid.GroupRow());

      // 現在の年
      panel.setCellData(0, 0, 'コード');
      panel.setCellData(0, 1, '受給者証番号');
      panel.setCellData(0, 2, '利用者名');
      panel.setCellData(0, 3, '障害\n支援\n区分');
      panel.setCellData(0, 4, '開始日');
      panel.setCellData(0, 5, '終了日');
      panel.setCellData(0, 6, this.nendo + '年');
      panel.setCellData(0, 15, parseInt(this.nendo) + 1 + '年');
      panel.setCellData(0, 18, '合計');
      panel.setCellData(0, 19, '平均');

      footerPanel.setCellData(0, 0, '利用日数 計');
      footerPanel.setCellData(1, 0, '開所日数');

      flexGrid.columnHeaders.rows[0].height = 30;
      flexGrid.columnHeaders.rows[1].height = 30;
      flexGrid.columnHeaders.rows[0].cssClassAll = 'middle';
      flexGrid.columnHeaders.rows[1].cssClassAll = 'middle';
    },
    createHeaderMerge(flexGrid) {
      let headerRanges = [];
      let footerRanges = [];
      headerRanges = [
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2),
        new wjGrid.CellRange(0, 3, 1, 3),
        new wjGrid.CellRange(0, 4, 1, 4),
        new wjGrid.CellRange(0, 5, 1, 5),
        new wjGrid.CellRange(0, 6, 0, 14),
        new wjGrid.CellRange(0, 15, 0, 17),
        new wjGrid.CellRange(0, 18, 1, 18),
        new wjGrid.CellRange(0, 19, 1, 19),
      ];
      footerRanges = [
        new wjGrid.CellRange(0, 0, 0, 3),
        new wjGrid.CellRange(1, 0, 1, 3),
      ];
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        } else if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };

      flexGrid.mergeManager = mm;
    },
    /****************
     * 子の年度取得
     */
    getChildYear() {
      return this.$refs.childheader.getChildYear();
    },
    /**************
     * 絞り込み
     */
    filter(type) {
      this.syukeiFlag = type;
      this.nenkanRiyouNissuData = this.filtered();
    },
    filtered() {
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (
          this.syukeiFlag == 1 ||
          (this.syukeiFlag == 0 &&
            !this.allData[i].symd &&
            !this.allData[i].eymd)
        ) {
          array.push(this.allData[i]);
        }
      }

      let get = [];
      let select = this.alphabetSelect;
      array.forEach(function (value) {
        switch (select) {
          case 0:
            get.push(value);
            break;
          case 1:
            if (value.kana.match(/^[ア-オ]/)) {
              get.push(value);
            }
            break;
          case 2:
            if (value.kana.match(/^[カ-コ]/)) {
              get.push(value);
            }
            break;
          case 3:
            if (value.kana.match(/^[サ-ソ]/)) {
              get.push(value);
            }
            break;
          case 4:
            if (value.kana.match(/^[タ-ト]/)) {
              get.push(value);
            }
            break;
          case 5:
            if (value.kana.match(/^[ナ-ノ]/)) {
              get.push(value);
            }
            break;
          case 6:
            if (value.kana.match(/^[ハ-ホ]/)) {
              get.push(value);
            }
            break;
          case 7:
            if (value.kana.match(/^[マ-モ]/)) {
              get.push(value);
            }
            break;
          case 8:
            if (value.kana.match(/^[ヤ-ヨ]/)) {
              get.push(value);
            }
            break;
          case 9:
            if (value.kana.match(/^[ラ-ロ]/)) {
              get.push(value);
            }
            break;
          case 10:
            if (value.kana.match(/^[ワ-ン]/)) {
              get.push(value);
            }
            break;
        }
      });

      return get;
    },
    /**************
     * 並び順変更
     */
    sort(type) {
      let array = this.nenkanRiyouNissuData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.riyocode < b.riyocode) {
            return -1;
          }
          if (a.riyocode > b.riyocode) {
            return 1;
          }
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jyukyuno < b.jyukyuno) {
            return -1;
          }
          if (a.jyukyuno > b.jyukyuno) {
            return 1;
          }
          return 0;
        });
      }
      this.mainFlexGrid.itemsSource = [];
      this.nenkanRiyouNissuData = array;
    },

    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      this.alphabetSelect = key;
      this.nenkanRiyouNissuData = this.filtered();
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#nyutaiin {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px;
  .jijyougen-container {
    padding: 4px;
  }
  .wj-flexgrid .wj-cell {
    font-size: 12px;
    font-weight: normal;
    padding: 0px;
    text-align: right;
    padding: 0px 4px 0px 4px;
    &:first-child {
      text-align: center;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
    }
  }
  .wj-cells {
    .wj-row:last-child {
      .wj-cell {
        border-bottom: none !important;
      }
    }
  }

  .wj-colfooters {
    border-top: 1px solid $border_color;
  }
  .container {
    padding: 4px;
    margin-top: 16px;
  }
  label {
    &.serach {
      display: inline-block;
      font-weight: 700;
      width: 120px;
      margin-top: 5px;
    }
  }
  .w-100 {
    width: 100%;
  }

  .user-info {
    label:not(.errorlabel) {
      min-width: 120px;
    }
  }
  .wj-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
div.customCombobox {
  .wj-btn.wj-btn-default {
    border-left: none !important;
  }
  &:hover {
    background-color: #e1e1e1;
  }
  &:focus {
    background-color: #fff;
  }
}
</style>