<template>
  <div id="MstJigyoSyukeiJyouken">
    <v-container no-gutters fluid class="container ml-1 mr-1 pa-0">
      <v-row no-gutters>
        <v-card class="koumokuTitle pa-1 mt-1" outlined tile>
          事業区分マスタ
        </v-card>
      </v-row>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="jigyoKbnIcrnGrid"
          :headersVisibility="'Column'"
          :autoGenerateColumns="false"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowMerging="'None'"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'Row'"
          :isReadOnly="true"
          :initialized="onInitializeJigyoKbnIcrnGrid"
          :itemsSourceChanged="onItemsSourceChanged"
          :itemsSource="viewdata"
        >
        </wj-flex-grid>
      </v-row>
      <v-row no-gutters>
        <v-card class="koumokuTitle pa-1 mt-1" outlined tile>
          集計条件マスタ
        </v-card>
      </v-row>
      <v-row no-gutters>
        <v-card class="koumokuTitleMini pa-1 mt-1" outlined tile>
          新規相談
        </v-card>
        <v-col>
          <v-row no-gutters>
            <v-btn-toggle
              class="flex-wrap ml-1 mt-1"
              v-model="modelSinkisoudan"
              mandatory
            >
              <v-btn
                v-for="n in sinkiSoudanList"
                :key="n.val"
                small
                color="secondary"
                dark
                outlined
                @click="sinkiclick(n.val)"
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row class="mt-1 mb-0 pa-0" no-gutters>
            <v-checkbox
              class="ma-0 pa-0"
              :label="'複数新規を入力'"
              v-model="inputFukusu"
              hide-details
              v-if="modelSinkisoudan == 0"
            >
            </v-checkbox>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-card class="koumokuTitleMini pa-1 mt-1" outlined tile>
          本人との関係
        </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1 mt-1 pt-5"
          v-model="modelKaneki"
          mandatory
        >
          <v-btn
            v-for="n in kanekiList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="kaneiclick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row no-gutters>
        <v-card class="koumokuTitleMini pa-1 mt-1" outlined tile>
          同一時間に<br />複数内容の<br />相談がある場合
        </v-card>
        <v-btn-toggle
          class="flex-wrap ml-1 mt-1 pt-5"
          v-model="modelFukusuSoudan"
          mandatory
        >
          <v-btn
            v-for="n in fukusuSoudanList"
            :key="n.val"
            small
            color="secondary"
            dark
            outlined
            @click="fukusuclick(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.core';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';

// const rowHeaderheight = sysConst.GRDROWHEIGHT.Header;
const rowheight = sysConst.GRDROWHEIGHT.Row;
export default {
  components: {},
  data: function () {
    return {
      modelSinkisoudan: 0,
      modelKaneki: 0,
      modelFukusuSoudan: 0,
      inputFukusu: 0,
      headerList: [
        {
          dataname: 'code',
          title: 'コード',
          width: 100,
          minWidth: 100,
          maxWidth: 100,
          align: 'center',
        },
        {
          dataname: 'kbn',
          title: '事業区分名',
          width: '*',
          minWidth: 200,
          maxWidth: 400,
          align: 'left',
        },
        {
          dataname: 'ryaku',
          title: '略称名',
          width: 100,
          minWidth: 100,
          maxWidth: 100,
          align: 'left',
        },
        {
          dataname: 'kigou',
          title: '記号',
          width: 50,
          minWidth: 50,
          maxWidth: 50,
          align: 'center',
        },
        {
          dataname: 'svcname',
          title: 'サービス名称',
          width: 200,
          minWidth: 200,
          maxWidth: 200,
          align: 'left',
        },
        {
          dataname: 'syoki',
          title: '初期',
          width: 50,
          minWidth: 50,
          maxWidth: 50,
          align: 'center',
        },
      ],
      sinkiSoudanList: [
        { val: 0, name: '最初の一回' },
        { val: 1, name: '年度内の一回目' },
      ],
      kanekiList: [
        { val: 0, name: '集計する' },
        { val: 1, name: '集計しない' },
      ],
      fukusuSoudanList: [
        { val: 0, name: '延べ件数は１件で集計する' },
        { val: 1, name: '全て延べ件数に修正する' },
      ],
      viewdata: [],
    };
  },
  methods: {
    onInitializeJigyoKbnIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = 100;
      flexGrid.alternatingRowStep = 0;
      flexGrid.cells.rows.defaultSize = rowheight;

      // ヘッダ文字列の設定
      for (let colIndex = 0; colIndex < this.headerList.length; colIndex++) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.binding = this.headerList[colIndex].dataname;
        col.width = this.headerList[colIndex].width;
        col.minWidth = this.headerList[colIndex].minWidth;
        col.maxWidth = this.headerList[colIndex].maxWidth;
        col.align = this.headerList[colIndex].align;
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;
        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerList[colIndex].title
        );
      }
      let testdata = [];
      testdata.push({
        code: String('1'.padStart(2, '0')),
        kbn: '基本相談',
        ryaku: '基本',
        kigou: '基',
        svcname: '相談支援',
        syoki: '〇',
      });
      testdata.push({
        code: String('2'.padStart(2, '0')),
        kbn: '退院サポート',
        ryaku: '退院',
        kigou: '退',
        svcname: '退院サポート',
        syoki: '',
      });
      testdata.push({
        code: String('3'.padStart(2, '0')),
        kbn: '自立アシスタント',
        ryaku: '自立',
        kigou: '自',
        svcname: '自立生活アシスタント',
        syoki: '',
      });

      this.viewdata = testdata;

      flexGrid.endUpdate();
    },
    onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },
    sinkiclick(type) {
      this.modelSinkisoudan = type;
      if (this.modelSinkisoudan == 1) {
        this.inputFukusu = 0;
      }
    },
    kaneiclick(type) {
      this.modelKaneki = type;
    },
    fukusuclick(type) {
      this.modelFukusuSoudan = type;
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#MstJigyoSyukeiJyouken {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 100%;
    text-align: center;
    background: #87cefa;
    border: none;
  }
  .koumokuTitleMini {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 70px;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  #jigyoKbnIcrnGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 55%;
    height: 40vh;
    // max-height: 1080px;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      // 下の4つはセット
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
    .wj-cell:not(.wj-header) {
      background: $grid_background;
    }
    .wj-cells
      .wj-row:hover
      .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
      transition: all 0s;
      background: $grid_hover_background;
    }

    .wj-cells .wj-cell.wj-state-multi-selected {
      background: $grid_selected_background;
      color: $grid_selected_color;
    }

    .wj-cells .wj-cell.wj-state-selected {
      background: $grid_selected_background;
      color: $grid_selected_color;
    }
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
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
}
</style>
