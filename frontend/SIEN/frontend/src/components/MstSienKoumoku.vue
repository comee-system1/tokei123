<template>
  <div id="MstSienKoumoku">
    <v-container no-gutters fluid class="container ma-0 pa-0">
      <v-row no-gutters>
        <v-col class="leftarea mt-1">
          <v-row no-gutters>
            <v-card class="bunruiTitle pa-1" outlined tile> 大分類 </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> コード </v-card>
            <input
              type="tel"
              class="ml-1"
              style="width: 50px; ime-mode: inactive"
              @input="numbervalidate(0)"
              v-model="daibunrui.code"
            />
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 名称 </v-card>
            <input
              type="text"
              class="name ml-1"
              @input="textvalidate(0)"
              v-model="daibunrui.name"
            />
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 略称 </v-card>
            <input
              type="text"
              class="ryaku ml-1"
              @input="textvalidate(1)"
              v-model="daibunrui.ryaku"
            />
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 色 </v-card>
            <input
              type="color"
              class="color ml-1"
              @input="colorvalidate(0)"
              v-model="daibunrui.color"
            />
            <v-card
              id="daicolor"
              class="koumokuColorDisp ml-1 pa-1"
              outlined
              tile
            >
              文字色
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle mt-1">
            <v-card class="koumokuTitle pa-1" outlined tile> 集計表 </v-card>
            <v-btn-toggle
              class="flex-wrap ml-1"
              v-model="daibunrui.syukei"
              mandatory
            >
              <v-btn
                v-for="n in syukeiItemList"
                :key="n.val"
                style="height: 100%"
                small
                color="secondary"
                dark
                outlined
              >
                {{ n.name }}
              </v-btn>
            </v-btn-toggle>
          </v-row>
          <v-row no-gutters class="rowStyle mt-3">
            <v-btn @click="clrClicked(0)"> クリア </v-btn>
            <v-btn @click="delClicked(0)"> 削除 </v-btn>
            <v-btn @click="addClicked(0)"> 登録 </v-btn>
          </v-row>
          <v-row no-gutters class="mt-5">
            <v-card class="bunruiTitle pa-1" outlined tile> 中分類 </v-card>
          </v-row>
        </v-col>
        <v-col class="rightarea ma-1"> </v-col>
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

export default {
  components: {},
  data: function () {
    return {
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
      viewdata: [],
      daibunrui: {
        id: 0,
        code: 1,
        name: '',
        ryaku: '',
        color: sysConst.COLOR.fontColor,
        syukei: 0,
      },
      chubunrui: {
        id: 0,
        code: 1,
        name: '',
        ryaku: '',
        color: sysConst.COLOR.fontColor,
      },
      syukeiItemList: [
        { id: 0, name: '集計する' },
        { id: 1, name: '集計しない' },
      ],
    };
  },
  methods: {
    onInitializeJigyoKbnIcrnGrid(flexGrid) {
      flexGrid.beginUpdate();
      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = 100;
      flexGrid.alternatingRowStep = 0;
      flexGrid.cells.rows.defaultSize = sysConst.GRDROWHEIGHT.Row;

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
    numbervalidate(kbn) {
      if (kbn == 0) {
        // 大分類・コード
        if (isNaN(this.daibunrui.code)) {
          this.daibunrui.code = '';
        }
        if (String(this.daibunrui.code).length > 3) {
          this.daibunrui.code = Number(String(this.daibunrui.code).slice(0, 3));
        }
      }
    },
    colorvalidate(kbn) {
      if (kbn == 0) {
        document.getElementById('daicolor').style.color = this.daibunrui.color;
      } else if (kbn == 1) {
        document.getElementById('chucolor').style.color = this.chubunrui.color;
      }
    },
    clrClicked(kbn) {
      if (kbn == 0) {
        document.getElementById('daicolor').style.color = this.daibunrui.color;
      }
    },
    delClicked(kbn) {
      if (kbn == 0) {
        document.getElementById('daicolor').style.color = this.daibunrui.color;
      }
    },
    addClicked(kbn) {
      if (kbn == 0) {
        document.getElementById('daicolor').style.color = this.daibunrui.color;
      }
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#MstSienKoumoku {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;

  .leftarea {
    width: 400px;
    min-width: 400px;
    max-width: 400px;

    input {
      color: $font_color;
      border: thin solid;
      border-color: $light-gray;
      width: 100px;
      height: 100%;
      text-align: center;
    }
    .name {
      color: $font_color;
      border: thin solid;
      border-color: $light-gray;
      width: 200px;
      height: 100%;
      text-align: left;
      padding-left: 2px;
      ime-mode: active;
    }
    .ryaku {
      color: $font_color;
      border: thin solid;
      border-color: $light-gray;
      height: 100%;
      text-align: left;
      padding-left: 2px;
      ime-mode: active;
      width: 100px;
    }

    input:focus {
      outline: none;
    }
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
      -moz-appearance: textfield;
    }
    .color {
      color: $font_color;
      border: thin solid;
      border-color: $light-gray;
      width: 50px;
      height: 100%;
      text-align: center;
    }
    .v-btn {
      border: thin solid;
      border-color: $light-gray;
      width: 80px;
      height: 30px;
      background: $btn_background;
    }
  }
  .rightarea {
    border: 1px solid;
  }

  .bunruiTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #87cefa;
    border: none;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }

  .koumokuColorDisp {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 100%;
    text-align: center;
    background: $view_Data_Read_background;
    border: thin solid;
    border-color: $light-gray;
  }

  .rowStyle {
    height: 25px;
  }
}
</style>
