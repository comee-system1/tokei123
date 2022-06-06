<template>
  <div id="recept-list" class="mt-n5">
    <v-row no-gutters>
      <v-col style="width: 70%">
        <wj-flex-grid
          id="grid_recept"
          :initialized="onInitialized"
          :allowMerging="6"
          :headersVisibility="'Column'"
          :alternatingRowStep="0"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :autoGenerateColumns="false"
          style="width: 100%"
        >
        </wj-flex-grid>
      </v-col>
      <v-col style="width: 30%">
        <wj-flex-grid
          id="grid_syukei"
          :initialized="onInitializedSyukei"
          :allowMerging="6"
          :headersVisibility="'Column'"
          :alternatingRowStep="0"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :autoGenerateColumns="false"
          style="width: 100%"
        >
        </wj-flex-grid>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as wjGrid from '@grapecity/wijmo.grid';

Vue.use(VueAxios, axios);
let basicPos = 7; // 基本情報の列数
export default {
  data() {
    return {
      allData: [],
      teikyoService: this.getTeikyoService(),
      receptData: [],
      gridHeadHeight: 80, //グリッドのヘッダ高さ
      mainFlexGrid: [],
      basicPos: basicPos,
      receptSyukeiPos: basicPos + this.getTeikyoService().length, //レセプト集計の位置
      gridHeight: '', // グリッドの高さ
      alphaSelect: 0, // アルファベット選択の初期
      filterTextRiyosya: { riyosyaKey: 0 }, // 検索項目
    };
  },
  components: {},
  mounted() {
    this.handleResize();
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.receptData = this.getData();
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 54;
      if (height > 800) {
        ht = 67;
      } else if (height > 700) {
        ht = 58;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
    },

    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      flexGrid.frozenColumns = this.basicPos;

      this.createHeader(flexGrid);
      this.createHeaderMerge(flexGrid, 'basic');

      // 値の登録
      flexGrid.itemsSource = this.receptData;
      this.settingPoint(flexGrid);

      // セルフォーマット
      this.createCellFormat(flexGrid);
    },

    /********************
     * 集計グリッド
     */
    onInitializedSyukei(syukeiGrid) {
      this.mainSyukeiFlexGrid = syukeiGrid;
      // ヘッダ情報の作成
      this.createSyukeiHeader(syukeiGrid);
      this.createHeaderMerge(syukeiGrid, 'syukei');

      // 値の登録
      syukeiGrid.itemsSource = this.receptData;
      this.settingSyukeiPoint(syukeiGrid);

      // セルフォーマット集計
      this.createSyukeiCellFormat(syukeiGrid);
      //クリックイベント
      this.clickEventCell(syukeiGrid);
    },
    /********************
     * クリックイベント
     */
    clickEventCell(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        if (ht.cellType == wjGrid.CellType.Cell) {
          // レセプト集計を押下
          if (hPage.col == 0) {
            if (_self.receptData[hPage.row].resesyukei == 1) {
              _self.receptData[hPage.row].resesyukei = '';
              flexGrid.setCellData(hPage.row, 0, '');
            } else if (!_self.receptData[hPage.row].resesyukei) {
              _self.receptData[hPage.row].resesyukei = 1;
              flexGrid.setCellData(hPage.row, 0, 1);
            }
          }
        }
      });
    },
    /**********************
     * 値の登録
     */
    settingPoint(flexGrid) {
      for (let i = 0; i < this.receptData.length; i++) {
        let j = 0;
        flexGrid.setCellData(i, j++, this.receptData[i].sityoson);
        flexGrid.setCellData(i, j++, this.receptData[i].jyukyusyaBango);
        flexGrid.setCellData(i, j++, this.receptData[i].riyousyamei);
        flexGrid.setCellData(i, j++, this.receptData[i].jyougenicon);
        flexGrid.setCellData(i, j++, this.receptData[i].jyougen);
        flexGrid.setCellData(i, j++, this.receptData[i].riyosyafutan);
        flexGrid.setCellData(i, j++, ''); //空を挿入 提供サービスの前に空列を追加しているため
        for (let s = 0; s < this.teikyoService.length; s++) {
          if (this.teikyoService[s].servicekey != 'undefined') {
            let skey = 'service' + this.teikyoService[s].servicekey;
            flexGrid.setCellData(i, j++, this.receptData[i][skey]);
          }
        }
        j++;
      }
    },
    settingSyukeiPoint(flexGrid) {
      for (let i = 0; i < this.receptData.length; i++) {
        let j = 0;
        flexGrid.setCellData(i, j++, this.receptData[i].resesyukei);
        flexGrid.setCellData(i, j++, this.receptData[i].syukeibi);
        flexGrid.setCellData(i, j++, this.receptData[i].tanto);
        flexGrid.setCellData(i, j++, this.receptData[i].jyogenkanrizumi);
        flexGrid.setCellData(i, j++, this.receptData[i].resekaku);

        j++;
      }
    },
    /******************:
     * 値の登録
     */
    /************************
     * 提供サービス
     */
    getTeikyoService() {
      let teikyoService = [];
      teikyoService.push(
        {
          servicekey: 22,
          value: '生活介護',
        },
        {
          servicekey: 24,
          value: '短期入所',
        },
        {
          servicekey: 32,
          value: '入所支援',
        }
      );

      // 提供サービスが20以下の時は不足分追加を行う
      if (teikyoService.length < 20) {
        for (let i = 0; i < 17; i++) {
          teikyoService.push({
            servicekey: '',
            value: '',
          });
        }
      }
      return teikyoService;
    },
    getData() {
      let receptData = [];
      for (let i = 0; i < 10; i++) {
        receptData.push({
          sityoson: '東経市',
          jyukyusyaBango: '110001239' + (i % 4),
          riyousyamei: '東経 晴美' + (i % 3),
          kana: 'トウケイハルミ',
          jyougenicon: '他',
          jyougen: '南山事業所',
          riyosyafutan: 9900,
          service22: i % 2 == 0 ? 1 : 0,
          service24: i % 3 == 1 ? 1 : 0,
          service32: i % 4 == 1 ? 1 : 0,
          nyukyo: i % 2, // 今月入居
          taikyo: i % 4, // 今月退去
          resesyukei: '',
          syukeibi: '2022/08/05 14:25',
          tanto: '明治雅',
          jyogenkanrizumi: '',
          resekaku: '',
        });
      }
      this.allData = receptData;
      return receptData;
    },

    /*******************
     * セルのフォーマット集計
     */
    createSyukeiCellFormat(flexGrid) {
      flexGrid.select(-1, -1);
      flexGrid.formatItem.addHandler(function (s, e) {
        let text = e.cell.innerText;
        let classname = '';
        if (e.panel == flexGrid.columnHeaders) {
          // レセプト集計/上限管理済み/レセプト確定を縦
          if (e.col == 0 || e.col == 3 || e.col == 4) {
            classname = 'vertical';
          }
        }
        if (e.panel != flexGrid.columnHeaders) {
          if (e.col == 1 || e.col == 2) {
            classname = 'text-start';
          }
          if (e.col == 0) {
            if (text == '') {
              text = '';
            }
            if (text == 1) {
              text = '〇';
            }
            if (text == 2) {
              text = '●';
            }
          }
        }
        e.cell.innerHTML =
          '<div class="text-center w-100 ' + classname + '">' + text + '</div>';
      });
    },
    /*****************
     * セルのフォーマット指定
     */
    createCellFormat(flexGrid) {
      flexGrid.select(-1, -1);
      let _self = this;
      flexGrid.formatItem.addHandler(function (s, e) {
        // 提供サービスに改行文字を追加
        // let html = e.cell.innerHTML;
        let text = e.cell.innerText;
        let classname = '';
        if (e.panel == flexGrid.columnHeaders) {
          let basicPos = _self.basicPos;
          // 提供サービスに改行を加える
          for (let i = 0; i < _self.teikyoService.length; i++) {
            if (e.col == basicPos && e.row == 1) {
              if (text.length > 0) {
                let match = text.match(/.{2}/g);
                let str = '';
                for (let i = 0; i < match.length; i++) {
                  str += match[i] + '\n';
                }
                text = str;
              }
            }
            basicPos++;
          }
          if (e.row == 0 && e.col == _self.basicPos - 1) {
            text = '<div class="pl-3">' + text + '</div>';
          }
        }
        if (e.panel != flexGrid.columnHeaders) {
          if (e.col == 0 || e.col == 2 || e.col == 4) {
            classname = 'text-start';
          }
          if (e.col == 5) {
            classname = 'text-end';
          }
          if (e.col >= _self.basicPos) {
            if (text == 0) {
              text = '';
            }
            if (text == 1) {
              text = '〇';
            }
          }
        }
        e.cell.innerHTML =
          '<div class="text-center w-100 ' + classname + '">' + text + '</div>';
      });
    },

    /**************
     * ヘッダ情報の作成
     */
    createSyukeiHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());

      while (flexGrid.columns.length < 5) {
        flexGrid.columns.push(new wjGrid.Column());
      }

      panel.setCellData(0, 0, 'レセプト集計');
      panel.setCellData(0, 1, '集計済');
      panel.setCellData(1, 1, '集計日');
      panel.setCellData(1, 2, '担当者');

      panel.setCellData(0, 3, '上限管理済');
      panel.setCellData(0, 4, 'レセプト確定');

      // ヘッダに名前を付ける
      flexGrid.columns[0].binding = 'resesyukei';
      flexGrid.columns[1].binding = 'syukeibi';
      flexGrid.columns[2].binding = 'tanto';
      flexGrid.columns[3].binding = 'jyogenkanrizumi';
      flexGrid.columns[4].binding = 'resekaku';

      flexGrid.rows.defaultSize = 20;
      flexGrid.columnHeaders.rows[1].height = this.gridHeadHeight;
      flexGrid.columnHeaders.columns[0].width = 30;
      flexGrid.columnHeaders.columns[1].width = 180;
      flexGrid.columnHeaders.columns[2].width = '1*';
      flexGrid.columnHeaders.columns[3].width = 30;
      flexGrid.columnHeaders.columns[4].width = 30;
    },
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      flexGrid.columnHeaders.rows.insert(0, new wjGrid.Row());

      while (flexGrid.columns.length < this.basicPos) {
        flexGrid.columns.push(new wjGrid.Column());
      }

      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(1, 0, '市町村名');
      panel.setCellData(1, 1, '受給者番号');
      panel.setCellData(1, 2, '利用者名');
      panel.setCellData(1, 3, '上限額\n管理事務所');
      panel.setCellData(1, 5, '利用者負担\n上限月額');

      // 提供サービス用カラムを指定
      while (
        flexGrid.columns.length <
        this.teikyoService.length + this.basicPos
      ) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      panel.setCellData(0, 6, '提供サービス');
      for (let i = 0; i < this.teikyoService.length; i++) {
        let value = '';
        value = this.teikyoService[i].servicekey + this.teikyoService[i].value;
        if (value != 'undefined') {
          panel.setCellData(1, i + this.basicPos, value);
        } else {
          panel.setCellData(1, i + this.basicPos, '');
        }
      }

      // 各ヘッダカラムに名前をつける
      flexGrid.columns[0].binding = 'sityoson';
      flexGrid.columns[1].binding = 'jyukyusyaBango';
      flexGrid.columns[2].binding = 'riyousyamei';
      flexGrid.columns[3].binding = 'jyougenicon';
      flexGrid.columns[4].binding = 'jyougen';
      flexGrid.columns[5].binding = 'riyosyafutan';
      flexGrid.columns[6].binding = '';
      for (let i = 0; i < this.teikyoService.length; i++) {
        if (this.teikyoService[i].servicekey) {
          let k = i + this.basicPos;
          flexGrid.columns[k].binding =
            'service' + this.teikyoService[i].servicekey;
        }
      }

      flexGrid.columnHeaders.rows[1].height = this.gridHeadHeight;
      flexGrid.columnHeaders.columns[0].width = 130;
      flexGrid.columnHeaders.columns[1].width = 100;
      flexGrid.columnHeaders.columns[2].width = 160;
      flexGrid.columnHeaders.columns[3].width = 20;
      flexGrid.columnHeaders.columns[4].width = 160;
      flexGrid.columnHeaders.columns[3].multiLine = true;
      flexGrid.columnHeaders.columns[5].multiLine = true;
      flexGrid.columnHeaders.columns[6].width = 1;

      for (let i = this.basicPos; i < this.receptSyukeiPos; i++) {
        flexGrid.columnHeaders.columns[i].multiLine = true;
        flexGrid.columnHeaders.columns[i].minWidth = 50;
        flexGrid.columnHeaders.columns[i].width = '1*';
      }
      flexGrid.rows.defaultSize = 20;
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge(flexGrid, type) {
      let receptSyukeiPos = this.receptSyukeiPos;
      let headerRanges = [];
      if (type == 'syukei') {
        headerRanges = [
          new wjGrid.CellRange(0, 0, 1, 0),
          new wjGrid.CellRange(0, 1, 0, 2),
          new wjGrid.CellRange(0, 3, 1, 3),
          new wjGrid.CellRange(0, 4, 1, 4),
        ];
      } else {
        headerRanges = [
          new wjGrid.CellRange(0, 0, 0, 5), // 基本情報
          new wjGrid.CellRange(1, 3, 1, 4), // 上限額管理事務所
          new wjGrid.CellRange(0, receptSyukeiPos, 1, receptSyukeiPos), // レセプト
          new wjGrid.CellRange(
            0,
            this.basicPos,
            0,
            this.teikyoService.length + this.basicPos - 1
          ), // 提供サービス
        ];
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
      };
      flexGrid.mergeManager = mm;
    },
    /***********
     * 親コンポーネントのレセプト集計ボタン
     */
    parentReceptSyukei() {
      alert('sss');
    },

    /**********************
     * 親コンポーネントの印刷全選択/全解除
     * 0:全選択
     * 1:全解除
     */
    parentSelectAll(type) {
      let mark = '';
      if (type == 0) {
        mark = '1';
      }
      for (let i = 0; i < this.receptData.length; i++) {
        // this.mainFlexGrid.setCellData(i, 16, mark);
        this.receptData[i].resesyukei = mark;
      }
      console.log(this.receptData);
      this.mainFlexGrid.itemsSource = [];
      this.mainSyukeiFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.receptData;
      this.mainSyukeiFlexGrid.itemsSource = this.receptData;
    },

    /*************
     * 利用者のフィルタリンク
     */
    child_Riyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.receptData = this.filtered();
      this.mainFlexGrid.itemsSource = this.receptData;
      this.mainSyukeiFlexGrid.itemsSource = this.receptData;

      // this.settingPoint(this.mainFlexGrid);
    },
    /******************
     * 親コンポーネントのソート
     */
    parentSort(type) {
      let array = this.receptData;
      // カナソート
      if (type == 1) {
        array.sort((a, b) => {
          if (a.riyousyamei < b.riyousyamei) {
            return -1;
          }
          if (a.riyousyamei > b.riyousyamei) {
            return 1;
          }
          return 0;
        });
      }
      // コードソート
      if (type == 2) {
        array.sort((a, b) => {
          if (a.code < b.code) {
            return -1;
          }
          if (a.code > b.code) {
            return 1;
          }
          return 0;
        });
      }
      // 受給者番号
      if (type == 3) {
        array.sort((a, b) => {
          if (a.jyukyusyaBango < b.jyukyusyaBango) {
            return -1;
          }
          if (a.jyukyusyaBango > b.jyukyusyaBango) {
            return 1;
          }
          return 0;
        });
      }
      this.receptData = array;
      this.mainFlexGrid.itemsSource = [];
      this.mainSyukeiFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = array;
      this.mainSyukeiFlexGrid.itemsSource = array;
      this.mainFlexGrid.refresh();
      this.mainSyukeiFlexGrid.refresh();
    },
    /*******************
     * アルファベット絞り込み
     */
    parentAlphabet(alphaSearch) {
      this.alphaSelect = alphaSearch;
      let receptData = this.filtered();
      this.mainFlexGrid.itemsSource = receptData;
      this.mainSyukeiFlexGrid.itemsSource = receptData;
    },
    /***************************
     * 絞り込みの実施
     */
    filtered() {
      let array = [];
      for (let i = 0; i < this.allData.length; i++) {
        if (
          // this.filterTextJyogen.jyougenkanrijiKey == 0 &&
          this.filterTextRiyosya.riyosyaKey == 0
          // this.filterSibori.type == 1
        ) {
          array.push(this.allData[i]);
        } else {
          if (
            this.filterTextRiyosya.riyosyaKey == 0 ||
            (this.filterTextRiyosya.riyosyaKey == 1 &&
              this.allData[i]['nyukyo'] == 1) ||
            (this.filterTextRiyosya.riyosyaKey == 2 &&
              this.allData[i]['taikyo'] == 1)
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

div#recept-list {
  width: 1266px;
  div#grid_recept {
    &.wj-content {
      border-radius: 4px 0px 0px 4px;
      border: none;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      .wj-cell {
        border: none;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        &.wj-frozen-col {
          border-right: 1px solid rgba(0, 0, 0, 0.2);
        }
        &:nth-child(6) {
          border-right: 1px solid rgba(0, 0, 0, 0.2);
        }
        &:nth-child(7) {
          border: none;
        }
        &:nth-child(8) {
          border-left: none;
        }
      }
    }
  }
  div#grid_syukei {
    &.wj-content {
      border-radius: 0px 4px 4px 0px;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      border-left: 1px solid rgba(0, 0, 0, 0.2);

      .wj-cell {
        border: none;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }

  div#grid_syukei,
  div#grid_recept {
    overflow-y: none;
    -ms-overflow-style: none;

    .wj-flexgrid .wj-cell {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: normal;
      padding: 0px;
    }

    .wj-header.wj-cell {
      font-size: 14px;
      text-align: center !important;
      padding: 4px 6px 3px 6px;
      font-weight: normal;
      overflow: visible;
      vertical-align: middle;
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .wj-cell {
      padding: 0px !important;
      overflow: visible;
      font-size: 12px;
    }

    .wj-cell.wj-state-selected {
      color: $font_color;
    }

    .wj-flexgrid .wj-cell.wj-align-center {
      justify-content: center;
    }

    .wj-cell.edited-cell {
      background-color: pink !important;
    }

    .vertical {
      text-orientation: upright;
      -webkit-writing-mode: vertical-rl;
      -ms-writing-mode: tb-rl;
      writing-mode: vertical-rl;
      letter-spacing: 0.1em;
      text-align: center;
      left: 0 !important;
      margin-left: -10px !important;
    }
  }
}

.wj-grid-listbox {
  max-height: 100 !important;
  font-size: 12px;
}
</style>