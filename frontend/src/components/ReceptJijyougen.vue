<template>
  <div id="recept-jijyougen" class="mt-n5">
    <wj-flex-grid
      id="grid_jijyougen"
      :initialized="onInitialized"
      :allowMerging="6"
      :headersVisibility="'Column'"
      :alternatingRowStep="0"
      :allowDragging="false"
      :allowResizing="false"
      :deferResizing="false"
      :allowSorting="false"
      :itemsSource="receptData"
      :style="gridHeight"
    >
      <wj-flex-grid-column
        :binding="'sityoson'"
        :header="'市町村名'"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyukyusyaBango'"
        :header="'受給者番号'"
        align="center"
        width="2*"
        format="'f0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyousyamei'"
        :header="'利用者名'"
        align="center"
        width="3*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougenicon'"
        :header="'上限額\n管理事業所'"
        :multiLine="true"
        align="center"
        :width="30"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougengakuJigyosyo'"
        :multiLine="true"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutanGetsugaku'"
        :header="'利用者負担\n上限月額'"
        :multiLine="true"
        align="right"
        format="n0"
        :width="60"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougengakukanrikeisan'"
        :width="24"
        :isReadOnly="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'koban'"
        :header="'項番'"
        :width="24"
        align="center"
        valign="middle"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyosyobango'"
        :header="'事業所番号'"
        width="2*"
        align="center"
        :format="'f0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jigyosyomei'"
        :header="'事業所名'"
        width="3*"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'teikyoservice'"
        :header="'提供\nサービス'"
        width="3*"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'souhiyougaku'"
        :header="'総費用額'"
        width="2*"
        align="right"
        :multiLine="true"
        :format="'n0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutangaku'"
        :header="'利用者\n負担額'"
        width="2*"
        align="right"
        :format="'n0'"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'hensyu'"
        :width="24"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekkafutangaku'"
        :header="'管理結果\n後利用者\n負担額'"
        width="2*"
        align="center"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekka'"
        :header="'管理結果'"
        align="center"
        :width="24"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resekakutei'"
        :width="24"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="print"
        :width="24"
        :isReadOnly="true"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@/assets/scss/common.scss';
import { getReceptJijyogenData } from '@/data/receptJiJyougenData.js';
import * as wjGrid from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
// import { isNumber, changeType, DataType } from '@grapecity/wijmo';
// import sysConst from '@/utiles/const';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      receptData: [],
      filterTextJyogen: { jyougenkanrijiKey: 0, jyougenkanriji: '指定なし' }, // 検索項目
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
      filterSibori: { type: 1 }, // 絞込
      alphaSelect: 0,
      gridHeight: '', // グリッドの高さ
    };
  },
  components: {},
  mounted() {
    this.handleResize();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 54;
      if (height > 800) {
        ht = 65;
      } else if (height > 700) {
        ht = 58;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },
    /*******************
     * 確定登録・解除ボタン
     */
    parentDefineButton(type) {
      alert(type);
    },

    onInitialized(flexGrid) {
      flexGrid.select(-1, -1);

      this.receptData = getReceptJijyogenData();
      this.allData = this.receptData;
      this.mainFlexGrid = flexGrid;
      // ヘッダ情報の作成
      this.createHeader(flexGrid);
      //セルのクリックイベント
      //this.clickEventCell(flexGrid, _self);
      // セルの値を編集
      //this.edittingCell(flexGrid, _self);

      // セルのフォーマット指定
      this.createCellFormat(flexGrid);

      // セルマージ
      this.createCellMerge(flexGrid);
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(0, 6, '上限額管理計算');
      panel.setCellData(0, 7, '利用者請求実績');
      panel.setCellData(0, 13, '編集行');
      panel.setCellData(0, 14, '上限管理後');
      panel.setCellData(0, 16, 'レセプト確定');
      panel.setCellData(0, 17, '印刷');

      flexGrid.columnHeaders.rows[1].height = 100;
      flexGrid.rows.defaultSize = 20;
    },
    /********************
     * セルフォーマット
     */
    createCellFormat(flexGrid) {
      // let _selfdata = data;
      flexGrid.formatItem.addHandler(function (s, e) {
        let classname = '';
        let text = e.cell.innerText;
        if (e.panel == flexGrid.columnHeaders) {
          if (e.col == 5) {
            classname = 'vertical pr-2';
          }
          if (e.col == 6) {
            classname = 'vertical';
          }
          if (e.col == 7 && e.row == 1) {
            classname = 'vertical';
          }
          if (e.col == 13) {
            classname = 'vertical';
          }
          if (e.col == 15 || e.col == 16 || e.col == 17) {
            classname = 'vertical';
          }
        }

        e.cell.innerHTML =
          '<div class="text-center w-100 ' + classname + '">' + text + '</div>';
      });
    },

    /********************
     * マージ作成用の配列を作成
     */
    createMergeArray(receptData) {
      let array = [];
      for (let i = 0; i < receptData.length; i++) {
        array.push({
          row: i,
          jyukyusyaBango: receptData[i]['jyukyusyaBango'],
        });
      }
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const mergeGroup = groupBy(array, 'jyukyusyaBango');
      let merge = [];
      Object.keys(mergeGroup).map((key) => {
        let firsts = mergeGroup[key][0].row;
        let lasts = mergeGroup[key][mergeGroup[key].length - 1].row + 1;
        merge.push({
          k: key,
          first: firsts,
          last: lasts,
        });
      });
      return merge;
    },
    /**************
     * 全体セルのマージ
     */
    createCellMerge(flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5),
        new wjGrid.CellRange(0, 6, 1, 6),
        new wjGrid.CellRange(0, 7, 0, 12),
        new wjGrid.CellRange(0, 13, 1, 13),
        new wjGrid.CellRange(0, 14, 0, 15),
        new wjGrid.CellRange(0, 16, 1, 16),
        new wjGrid.CellRange(0, 17, 1, 17),
        new wjGrid.CellRange(1, 3, 1, 4),
      ];
      // データセル用のマージ配列の作成
      let ranges = [];
      let merge = this.createMergeArray(this.receptData);
      for (let i = 0; i < merge.length; i++) {
        for (let j = 0; j <= 6; j++) {
          ranges.push(
            new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
          );
        }
        let j = 16;
        ranges.push(
          new wjGrid.CellRange(merge[i].first, j, merge[i].last - 1, j)
        );
      }

      let mm = new wjGrid.MergeManager(flexGrid);

      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
      };

      flexGrid.mergeManager = mm;
    },

    /******************
     * 親コンポーネントのソート
     */
    parentSort(type) {
      let array = this.receptData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.riyousyamei < b.riyousyamei) return -1;
          if (a.riyousyamei > b.riyousyamei) return 1;
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.code < b.code) return -1;
          if (a.code > b.code) return 1;
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jyukyusyaBango < b.jyukyusyaBango) return 1;
          if (a.jyukyusyaBango > b.jyukyusyaBango) return -1;
          return 0;
        });
      }

      this.receptData = array;
      this.mainFlexGrid.itemsSource = [];
    },

    /*******************
     * アルファベット絞り込み
     */
    parentAlphabet(alphaSearch) {
      this.alphaSelect = alphaSearch;
      this.receptData = this.filtered();
    },
    /*************
     * 利用者のフィルタリンク
     */
    child_Riyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.receptData = this.filtered();
    },
    /******************
     * 親コンポーネントの絞り込み
     */
    parentFilter(type) {
      this.filterSibori = { type: type };
      this.receptData = this.filtered();
    },
    /*************
     * 上限管理事のフィルタリンク
     */
    child_Jyougenkanriji(text, key) {
      // フィルタリングの実施
      this.filterTextJyogen = { jyougenkanrijiKey: key, jyougenkanriji: text };
      this.receptData = this.filtered();
    },
    filtered() {
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        // 検索条件がないとき
        if (
          this.filterTextJyogen.jyougenkanrijiKey == 0 &&
          this.filterTextRiyosya.riyosyaKey == 0 &&
          this.filterSibori.type == 1
        ) {
          array.push(this.allData[i]);
        } else {
          if (
            (this.allData[i]['jigyosyomei'].indexOf(
              this.filterTextJyogen.jyougenkanriji
            ) != -1 ||
              this.filterTextJyogen.jyougenkanrijiKey == 0) &&
            // 絞り込みトグル
            (this.filterSibori.type == 1 ||
              (this.filterSibori.type == 2 &&
                this.allData[i]['kanrikekka'] == 1) ||
              (this.filterSibori.type == 3 &&
                this.allData[i]['kanrikekka'] == '')) &&
            // 利用者コンボボックス
            (this.filterTextRiyosya.riyosyaKey == 0 ||
              (this.filterTextRiyosya.riyosyaKey == 1 &&
                this.allData[i]['nyukyo'] == 1) ||
              (this.filterTextRiyosya.riyosyaKey == 2 &&
                this.allData[i]['taikyo'] == 1))
          ) {
            array.push(this.allData[i]);
          }
        }
      }
      let select = this.alphaSelect;
      let get = [];
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
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div.receptParts {
  background-color: $white;
  padding: 2%;
  border: none;
  .wj-cell {
    font-size: 12px;
  }
  .fixgrey {
    background-color: $light-gray;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 4px;
  }
}
div.receptPartsArea {
  background-color: $white;
  width: 100%;
  margin: 0;
  text-align: right;
  padding: 0px 15px 15px 0px;
}

div#recept-jijyougen {
  #grid_jijyougen {
    height: 52vh;

    .wj-cell {
      padding: 1px;
    }
  }
  .wj-flexgrid .wj-cell {
    display: flex;
    font-size: 12px;
    font-weight: normal;
  }

  .wj-header.wj-cell {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
  }

  .wj-header.wj-cell.wj-align-center {
    justify-content: center;
  }

  .wj-cell.wj-state-multi-selected {
    color: $font_color !important;
  }

  .wj-state-selected,
  .wj-state-last-selected {
    color: $font_color !important;
  }
  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }

  .complete {
    background-image: url('@/assets/kaku_15px.png');
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    text-indent: -9999px;
  }
  .delete {
    background-image: url('@/assets/kesu_15px.png');
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    width: 100%;
    text-indent: -9999px;
  }

  #menubar {
    display: none;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid $black;
    min-width: 80px;
    top: 0;
    left: 0;
    padding: 30px 10px;
    button {
      background-color: $white;
      &:first-child {
        position: absolute;
        top: 5px;
        left: auto;
        right: 5px;
        z-index: 1;
        border: 1px solid $light-gray;
      }
    }
  }

  .receptKakutei {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>