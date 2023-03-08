<template>
  <v-container no-gutters fluid class="pa-0">
    <v-row no-gutters class="pl-1 pr-1">
      <wj-flex-grid
        id="flexViewGridJigyo"
        :autoSearch="true"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="viewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :showMarquee="false"
        :allowMerging="'AllHeaders'"
        :formatItem="onFormatItem"
      >
        <wj-flex-grid-filter
          :initialized="filterInitialized"
          :showFilterIcons="false"
        ></wj-flex-grid-filter>
        <wj-flex-grid-column
          v-for="val in gridClumns"
          :key="val.id"
          :binding="val.binding"
          :header="val.text"
          :width="val.width"
          :word-wrap="true"
          :allowResizing="true"
          :isReadOnly="true"
          multiLine="true"
          align="center"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-row>
    <v-row no-gutters class="mt-1 justify-end ma-3 d-flex">
      <label class="label gray htMin">確定</label>
      <v-btn small class="ml-1 button">一括解除</v-btn>
      <v-btn small class="ml-1 button">登録</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import '@grapecity/wijmo.cultures/wijmo.culture.ja';

import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.vue2.grid.filter';
import sysConst from '@/utiles/const';

export default {
  props: {},
  components: {},
  computed: {},
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  data() {
    return {
      headerheight: 260,
      viewData: [], // 表示gridデータ
      viewDataAll: [], // 表示grid全データ
      gridClumns: [
        {
          id: 1,
          binding: 'city',
          text: '市町村名',
          width: 100,
        },
        {
          id: 2,
          binding: 'jyukyuBango',
          text: '受給者番号',
          width: 100,
        },
        {
          id: 3,
          binding: 'riyosyaMei',
          text: '利用者名',
          width: 100,
        },
        {
          id: 4,
          binding: 'icon',
          width: 30,
        },
        {
          id: 5,
          binding: 'jyogengaku',
          width: 100,
        },
        {
          id: 6,
          binding: 'riyosyafutan',
          text: '利用者負担\n上限金額',
          width: 80,
        },
        {
          id: 7,
          binding: 'jyogengakuKanri',
          width: 30,
        },
        {
          id: 8,
          binding: 'koban',
          text: '項番',
          width: 30,
        },
        {
          id: 9,
          binding: 'jigyosyoBango',
          text: '事業所番号',
          width: 100,
        },
        {
          id: 10,
          binding: 'jigyosyoMei',
          text: '事業所名',
          width: 160,
        },
        {
          id: 11,
          binding: 'teikyoService',
          text: '提供\nサービス',
          width: 100,
        },
        {
          id: 12,
          binding: 'sohiyougaku',
          text: '総費用額',
          width: 100,
        },
        {
          id: 13,
          binding: 'riyosyafutanGaku',
          text: '利用者\n負担額',
          width: 100,
        },
        {
          id: 14,
          binding: 'editRow',
          width: 30,
        },
        {
          id: 15,
          binding: 'kanriKekkaFutangaku',
          text: '管理結果\n後利用者\n負担額',
          width: 100,
        },
        {
          id: 16,
          binding: 'kanriKekka',
          text: '管理結果',
          width: 30,
        },
        {
          id: 17,
          binding: 'recept',
          width: 30,
        },
        {
          id: 18,
          binding: 'print',
          width: 30,
        },
      ],
    };
  },
  watch: {},
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('flexViewGridJigyo') != null) {
        document.getElementById('flexViewGridJigyo').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },

    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
    },
    /*********************
     * フィルターのクリア
     */
    filterClear() {
      this.filtered.clear();
    },
    /**************************
     * アルファベット
     */
    onAlphabetical() {
      this.userFilter();
    },
    userFilter() {
      let temp = [];
      temp = this.viewDataAll.concat();
      let viewData = this.$refs.alp.alphabetFilter(temp, 'kana');
      this.viewData = new wijmo.CollectionView(viewData);
    },

    /************************
     * データ表示
     */
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;

      let viewData = [
        {
          id: 1,
          city: '東経市',
          jyukyuBango: '1100012358',
          riyosyaMei: '東経 キナコ',
          icon: '自',
          jyogengaku: '相談たんぽぽ',
          riyosyafutan: 9300,
          jyogengakuKanri: '〇',
          koban: 1,
          jigyosyoBango: '1125000233',
          jigyosyoMei: 'たんぽぽ就労事業',
          teikyoService: '46就労継続',
          sohiyougaku: 53250,
          riyosyafutanGaku: 5325,
          editRow: '',
          kanriKekkaFutangaku: '',
          kanriKekka: '',
          recept: '',
          print: '',
        },
        {
          id: 2,
          city: '東経市',
          jyukyuBango: '1100012358',
          riyosyaMei: '東経 キナコ',
          icon: '自',
          jyogengaku: '相談たんぽぽ',
          riyosyafutan: 9300,
          jyogengakuKanri: '〇',
          koban: 2,
          jigyosyoBango: '1125000236',
          jigyosyoMei: 'たんぽぽ就労事業',
          teikyoService: '11就労継続',
          sohiyougaku: 53250,
          riyosyafutanGaku: 5325,
          editRow: '',
          kanriKekkaFutangaku: '',
          kanriKekka: '',
          recept: '',
          print: '',
        },
        {
          id: 2,
          city: '東経市',
          jyukyuBango: '1100012358',
          riyosyaMei: '東経 キナコ',
          icon: '自',
          jyogengaku: '相談たんぽぽ',
          riyosyafutan: 9300,
          jyogengakuKanri: '〇',
          koban: 3,
          jigyosyoBango: '1125000236',
          jigyosyoMei: 'たんぽぽ就労事業',
          teikyoService: '11就労継続',
          sohiyougaku: 53250,
          riyosyafutanGaku: 5325,
          editRow: '',
          kanriKekkaFutangaku: '',
          kanriKekka: '',
          recept: '',
          print: '',
        },
        {
          id: 3,
          city: '西経市',
          jyukyuBango: '1100012359',
          riyosyaMei: '東経 静香',
          icon: '自',
          jyogengaku: '相談たんぽぽ',
          riyosyafutan: 19300,
          jyogengakuKanri: '〇',
          koban: 1,
          jigyosyoBango: '1125000236',
          jigyosyoMei: 'たんぽぽ就労事業',
          teikyoService: '11就労継続',
          sohiyougaku: 53250,
          riyosyafutanGaku: 5325,
          editRow: '',
          kanriKekkaFutangaku: '',
          kanriKekka: '',
          recept: '',
          print: '',
        },
        {
          id: 3,
          city: '西経市',
          jyukyuBango: '1100012359',
          riyosyaMei: '東経 静香',
          icon: '自',
          jyogengaku: '相談たんぽぽ',
          riyosyafutan: 19300,
          jyogengakuKanri: '〇',
          koban: 2,
          jigyosyoBango: '1125000236',
          jigyosyoMei: 'たんぽぽ就労事業',
          teikyoService: '11就労継続',
          sohiyougaku: 53250,
          riyosyafutanGaku: 5325,
          editRow: '',
          kanriKekkaFutangaku: '',
          kanriKekka: '',
          recept: '',
          print: '',
        },
      ];
      // 受給者番号が同じ場合は同じグループとして扱う
      viewData = this.editGroupping([...viewData]);
      this.viewDataAll = viewData;
      this.viewData = new wijmo.CollectionView(viewData);
      this.createHeader(flexGrid);

      this.viewData.collectionChanged.addHandler(() => {});

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });
      // グリッドを押下
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        console.log(ht);
      });
    },
    editGroupping(temp) {
      // 受給者番号と項番順に並び替え
      temp.sort((a, b) => a.koban - b.koban);
      temp.sort((a, b) => a.jyukyuBango - b.jyukyuBango);
      // 同じ受給者番号を数える
      let tempCount = [];
      let c = 0;
      tempCount = temp.map((a, k) => {
        if (a.koban == 1) {
          c = 0;
        }
        if (temp[k + 1] && a.jyukyuBango == temp[k + 1].jyukyuBango) {
          c++;
        } else {
          return c;
        }
      });
      // 空白を消す
      tempCount = tempCount.filter((v) => v);
      // 配列に結合させる行数のカウントを追加
      // 項番が1のものに追加
      let j = 0;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].koban == 1) {
          temp[i].group = tempCount[j];
          j++;
        }
      }

      // 最後グループのセルのキーを取得
      // 最下層のセルに下線を引くflagを指定
      let tmp = 0;
      temp.forEach(function (a, k) {
        if (a.group) {
          tmp = k;
        }
      });
      temp[tmp].last = true;

      return temp;
    },
    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = 24;
      flexGrid.columnHeaders.rows[1].height = 120;
      flexGrid.alternatingRowStep = 0;

      flexGrid.columnHeaders.setCellData(0, 0, '基本情報');
      flexGrid.columnHeaders.setCellData(1, 3, '上限額\n管理事業所');
      flexGrid.columnHeaders.setCellData(0, 6, '上限額管理計算');
      flexGrid.columnHeaders.setCellData(0, 7, '利用者請求実績');
      flexGrid.columnHeaders.setCellData(0, 13, '編集行');
      flexGrid.columnHeaders.setCellData(0, 14, '上限管理後');
      flexGrid.columnHeaders.setCellData(0, 16, 'レセプト確定');
      flexGrid.columnHeaders.setCellData(0, 17, '印刷');

      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 0, 5));
      headerRanges.push(new wjGrid.CellRange(1, 3, 1, 4));
      headerRanges.push(new wjGrid.CellRange(0, 6, 1, 6));
      headerRanges.push(new wjGrid.CellRange(0, 7, 0, 12));
      headerRanges.push(new wjGrid.CellRange(0, 13, 1, 13));
      headerRanges.push(new wjGrid.CellRange(0, 14, 0, 15));
      headerRanges.push(new wjGrid.CellRange(0, 16, 1, 16));
      headerRanges.push(new wjGrid.CellRange(0, 17, 1, 17));

      let bodyRanges = [];
      this.viewData._view.map((a, k) => {
        if (a.koban == 1) {
          let g = a.group + k;
          bodyRanges.push(new wjGrid.CellRange(k, 0, g, 0));
          bodyRanges.push(new wjGrid.CellRange(k, 1, g, 1));
          bodyRanges.push(new wjGrid.CellRange(k, 2, g, 2));
          bodyRanges.push(new wjGrid.CellRange(k, 3, g, 3));
          bodyRanges.push(new wjGrid.CellRange(k, 4, g, 4));
          bodyRanges.push(new wjGrid.CellRange(k, 5, g, 5));
          bodyRanges.push(new wjGrid.CellRange(k, 6, g, 6));
        }
      });
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < bodyRanges.length; h++) {
            if (bodyRanges[h].contains(r, c)) {
              return bodyRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    /************************
     * データ表示
     */
    onItemsSourceChanged() {},
    /************************
     * 表示フォーマット
     */
    onFormatItem(flexGrid, e) {
      let tmpitem = e.panel.rows[e.row].dataItem;
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col == 5) {
          e.cell.style.writingMode = 'vertical-rl';
        }

        e.cell.style.display = 'flex';
        e.cell.style.textAlign = 'center';
        e.cell.style.justifyContent = 'center';
        e.cell.style.alignItems = 'center';
        if (e.col <= 5) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrangeDark;
        }
        if (e.col >= 6 && e.col <= 13) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
        if (e.col >= 14 && e.col <= 16) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
          e.cell.style.color = sysConst.COLOR.viewTitleFontColorOrange;
        }
      }
      if (e.panel == flexGrid.cells) {
        if (e.col == 0 || e.col == 2 || e.col == 9 || e.col == 10) {
          e.cell.style.textAlign = 'left';
        }
        if (e.col == 5 || e.col == 7 || e.col == 11 || e.col == 12) {
          e.cell.style.textAlign = 'right';
        }
        if (e.col == 8 || e.col == 9 || e.col == 10) {
          e.cell.style.color = sysConst.COLOR.viewTitleBackgroundMain;
        }
        if (e.col <= 5 || e.col == 14 || e.col == 15) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        if (e.col == 6) {
          e.cell.style.display = 'flex';
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
      }
      // 青枠の追加
      if (
        e.col == 6 ||
        e.col == 11 ||
        e.col == 12 ||
        e.col == 13 ||
        e.col == 16
      ) {
        wijmo.addClass(e.cell, 'blueLine');
        if (e.panel == flexGrid.columnHeaders) {
          if (e.col == 11) {
            wijmo.addClass(e.cell, 'blueLine-header-left');
          } else if (e.col == 12) {
            wijmo.addClass(e.cell, 'blueLine-header-right');
          } else {
            wijmo.addClass(e.cell, 'blueLine-header');
          }
        }
        if (e.panel == flexGrid.cells) {
          if (e.col == 11) {
            wijmo.addClass(e.cell, 'blueLine-left');
          }
          if (e.col == 12) {
            wijmo.addClass(e.cell, 'blueLine-right');
          }
          if (tmpitem.last && e.col == 6) {
            wijmo.addClass(e.cell, 'blueLine-bottom');
          }
          if (e.row == this.viewData._view.length - 1) {
            wijmo.addClass(e.cell, 'blueLine-bottom');
          }
        }
      }

      // フィルターカラムの非表示設定
      if (e.col >= 6) {
        var Nonefilter = this.filtered.getColumnFilter(e.col);
        Nonefilter.filterType = 'None';
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#flexViewGridJigyo {
  .blueLine {
    border-left: 2px solid $view_Title_background_Main;
    border-right: 2px solid $view_Title_background_Main;
    &-header {
      border-top: 2px solid $view_Title_background_Main;
      &-left {
        border-top: 2px solid $view_Title_background_Main;
        border-right: 0px;
      }
      &-right {
        border-top: 2px solid $view_Title_background_Main;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        border-right: none;
      }
    }
    &-bottom {
      border-bottom: 2px solid $view_Title_background_Main;
    }
    &-left {
      border-right: none;
    }
    &-right {
      border-right: none;
      border-left: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
