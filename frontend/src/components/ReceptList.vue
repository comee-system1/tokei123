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
      teikyoService: this.getTeikyoService(),
      receptData: this.getData(),
      gridHeadHeight: 80, //グリッドのヘッダ高さ
      mainFlexGrid: [],
      basicPos: basicPos,
      receptSyukeiPos: basicPos + this.getTeikyoService().length, //レセプト集計の位置
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
      this.settingPoint(flexGrid);

      // セルフォーマット
      this.createCellFormat(flexGrid);
    },

    /********************
     * 集計グリッド
     */
    onInitializedSyukei(syukeiGrid) {
      // ヘッダ情報の作成
      this.createSyukeiHeader(syukeiGrid);
      this.createHeaderMerge(syukeiGrid, 'syukei');

      // 値の登録
      this.settingSyukeiPoint(syukeiGrid);

      // セルフォーマット集計
      this.createSyukeiCellFormat(syukeiGrid);
    },
    /**********************
     * 値の登録
     */
    settingPoint(flexGrid) {
      while (flexGrid.rows.length < this.receptData.length) {
        flexGrid.rows.push(new wjGrid.Row());
      }

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
      while (flexGrid.rows.length < this.receptData.length) {
        flexGrid.rows.push(new wjGrid.Row());
      }

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
            key: '',
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
          jyukyusyaBango: '1100012391',
          riyousyamei: '東経 晴美',
          jyougenicon: '他',
          jyougen: '南山事業所',
          riyosyafutan: 9900,
          service22: i % 2 == 1 ? 1 : 0,
          service24: i % 3 == 1 ? 1 : 0,
          service32: i % 4 == 1 ? 1 : 0,

          resesyukei: '',
          syukeibi: '2022/08/05 14:25',
          tanto: '明治雅',
          jyogenkanrizumi: '',
          resekaku: '',
        });
      }

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

    /*************
     * 利用者のフィルタリンク
     */
    child_Riyosya(text, key) {
      // フィルタリングの実施
      this.filterTextRiyosya = { riyosyaKey: key, riyosya: text };
      this.receptData = this.filtered();
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