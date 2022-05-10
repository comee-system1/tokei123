<template>
  <div id="recept-tajyougen" class="mt-n5">
    <wj-flex-grid
      :initialized="onInitialized"
      :allowMerging="6"
      :headersVisibility="'Column'"
      :alternatingRowStep="0"
      :itemsSourceChanged="onItemsSourceChanged"
    >
      <wj-flex-grid-column
        :binding="'sityoson'"
        :header="'市町村名'"
        align="center"
        valign="middle"
        width="2*"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyukyusyaBango'"
        :header="'受給者番号'"
        align="center"
        width="3*"
        format="'f0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyousyamei'"
        :header="'利用者名'"
        align="center"
        width="2*"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougenicon'"
        :header="'上限額\n管理事業所'"
        :multiLine="true"
        align="center"
        :width="30"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jyougengaku'"
        :multiLine="true"
        align="center"
        width="2*"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutan'"
        :header="centerHeader[2]"
        :multiLine="true"
        align="right"
        format="n0"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resehanei'"
        :width="30"
        cssClass="cell-img"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'koban'"
        :header="verticalHeader[4]"
        :width="30"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jikyosyobango'"
        :header="'事業所番号'"
        width="2*"
        align="center"
        :format="'f0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'jikyosyomei'"
        :header="'事業所名'"
        width="2*"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'teikyoservice'"
        :header="'提供\nサービス'"
        width="2*"
        align="center"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'souhiyougaku'"
        :header="centerHeader[3]"
        width="2*"
        align="right"
        :multiLine="true"
        :format="'n0'"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutangaku'"
        :header="centerHeader[0]"
        width="2*"
        align="right"
        :format="'n0'"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekkafutangaku'"
        :header="centerHeader[1]"
        width="3*"
        align="center"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'kanrikekka'"
        :header="verticalHeader[1]"
        align="center"
        :width="30"
        :multiLine="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resekakutei'"
        :width="30"
      ></wj-flex-grid-column>
      <wj-flex-grid-column binding="print" :width="30"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as wjGrid from '@grapecity/wijmo.grid';
import { isNumber, changeType, DataType } from '@grapecity/wijmo';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      verticalHeader: [
        'レセプト反映',
        '管理結果',
        'レセプト確定',
        '印刷',
        '項番',
      ],
      centerHeader: [
        '利用者\n負担額',
        '管理結果\n後利用者\n負担額',
        '利用者負担\n上限金額',
        '総費用額',
      ],
      receptData: [],
      mainFlexGrid: [],
      editGridFlag: false,
    };
  },
  components: {},
  methods: {
    /***********
     * 親コンポーネントのレセプトへ反映ボタン
     */
    parentReceptReflect() {
      //console.log(this.allData);
      //alert('Hello from Child!');
      // ●に変更する

      for (let i = 0; i < this.allData.length; i++) {
        let pt13 = this.mainFlexGrid.getCellData(i, 13);
        let pt14 = this.mainFlexGrid.getCellData(i, 14);
        if (pt13 && pt14) {
          this.allData[i]['resehanei'] = '●';
        }
      }
      this.editGridFlag = true;
      this.mainFlexGrid.itemsSource = [];
    },
    getData: function () {
      let receptData = [];
      for (let i = 0; i < 10; i++) {
        receptData.push({
          sityoson: '東経市',
          jyukyusyaBango: Math.random() * 10000000,
          riyousyamei: '東経太郎' + i,
          jyougenicon: '他',
          jyougengaku: '南山事務所',
          riyosyafutan: Math.random() * 10000000,
          resehanei: '',
          koban: 1,
          jikyosyobango: Math.random() * 10000000,
          jikyosyomei: 'ひまわり園',
          teikyoservice: '22 生活介護',
          souhiyougaku: Math.random() * 10000000,
          riyosyafutangaku: Math.random() * 10000000,
          kanrikekkafutangaku: '',
          kanrikekka: '',
          resekakutei: '',
          print: false,
        });
      }

      this.allData = receptData;
      return receptData;
    },

    onInitialized: function (flexGrid) {
      let griddata = this.getData();
      this.mainFlexGrid = flexGrid;
      let _self = this;
      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);
      // ヘッダセルのマージ
      this.createHeaderMerge(flexGrid);
      //セルのフォーマット指定
      this.createCellFormat(flexGrid, _self);

      // セルの値を編集
      this.edittingCell(flexGrid);

      flexGrid.itemsSource = griddata;
    },
    /********
     * セルを編集
     */
    edittingCell: function (flexGrid) {
      flexGrid.cellEditEnding.addHandler((s, e) => {
        let col = s.columns[e.col];
        let value = changeType(
          s.activeEditor.value,
          DataType.Number,
          col.format
        );

        // console.log('length=>' + _self.allData.length);
        // console.log('row=>' + e.row);
        // console.log('col=>' + e.col);
        // console.log('value=>' + value);
        // console.log(isNumber(value));

        let pt13 = flexGrid.getCellData(e.row, 13);
        let pt14 = flexGrid.getCellData(e.row, 14);
        console.log('pt13=>' + pt13);
        console.log('pt14=>' + pt14);
        if (e.col == 13 || e.col == 14) {
          if (!isNumber(value) && value.length > 0) {
            e.cancel = true;
            e.stayInEditMode = true;
            alert('数値のみの入力になります。');
          } else if ((pt13 > 0 && value) || (pt14 > 0 && value)) {
            flexGrid.setCellData(e.row, 6, '〇');
          }
        }
      });
    },
    onItemsSourceChanged: function (flexGrid) {
      let receptData = this.allData;
      console.log('change');
      console.log(this.editGridFlag);
      console.log(receptData);
      if (this.editGridFlag) {
        while (flexGrid.rows.length < receptData.length) {
          flexGrid.rows.push(new wjGrid.Row());
        }

        for (let i = 0; i < receptData.length; i++) {
          let j = 0;
          flexGrid.setCellData(i, j++, receptData[i]['sityoson']);
          flexGrid.setCellData(i, j++, receptData[i]['jyukyusyaBango']);
          flexGrid.setCellData(i, j++, receptData[i]['riyousyamei']);
          flexGrid.setCellData(i, j++, receptData[i]['jyougenicon']);
          flexGrid.setCellData(i, j++, receptData[i]['jyougengaku']);
          flexGrid.setCellData(i, j++, receptData[i]['riyosyafutan']);
          flexGrid.setCellData(i, j++, receptData[i]['resehanei']);
          flexGrid.setCellData(i, j++, receptData[i]['koban']);
          flexGrid.setCellData(i, j++, receptData[i]['jikyosyobango']);
          flexGrid.setCellData(i, j++, receptData[i]['jikyosyomei']);
          flexGrid.setCellData(i, j++, receptData[i]['teikyoservice']);
          flexGrid.setCellData(i, j++, receptData[i]['souhiyougaku']);
          flexGrid.setCellData(i, j++, receptData[i]['riyosyafutangaku']);
          flexGrid.setCellData(i, j++, receptData[i]['kanrikekkafutangaku']);
          flexGrid.setCellData(i, j++, receptData[i]['kanrikekka']);
          flexGrid.setCellData(i, j++, receptData[i]['resekakutei']);
          flexGrid.setCellData(i, j++, receptData[i]['print']);
        }
      }
    },
    /*****************
     * セルのフォーマット指定
     */
    createCellFormat: function (flexGrid, _self) {
      flexGrid.formatItem.addHandler(function (s, e) {
        let html = e.cell.innerHTML;

        let text = e.cell.innerText;
        let classname = '';
        if (
          text == _self.verticalHeader[0] ||
          text == _self.verticalHeader[1] ||
          text == _self.verticalHeader[2] ||
          text == _self.verticalHeader[3] ||
          text == _self.verticalHeader[4]
        ) {
          classname = 'vertical';
        }
        if (
          text == _self.centerHeader[0] ||
          text == _self.centerHeader[1] ||
          text == _self.centerHeader[2] ||
          text == _self.centerHeader[3]
        ) {
          classname = 'text-center';
        }
        if (classname) {
          e.cell.innerHTML =
            '<div class="text-center w-100 ' +
            classname +
            '">' +
            html +
            '</div>';
        }
      });
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader: function (flexGrid, _self) {
      var extraRow = new wjGrid.Row();
      extraRow.allowMerging = true;
      var panel = flexGrid.columnHeaders;
      panel.rows.splice(0, 0, extraRow);
      panel.setCellData(0, 0, '基本情報');
      panel.setCellData(0, 6, _self.verticalHeader[0]);
      panel.setCellData(0, 7, '利用者請求実績');
      panel.setCellData(0, 13, '上限管理後');
      panel.setCellData(0, 15, _self.verticalHeader[2]);
      panel.setCellData(0, 16, _self.verticalHeader[3]);
      flexGrid.columnHeaders.rows[1].height = 80;
    },
    /**************
     * ヘッダセルのマージ
     */
    createHeaderMerge: function (flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5), //基本情報
        new wjGrid.CellRange(0, 6, 1, 6), //レセプト
        new wjGrid.CellRange(1, 3, 1, 4), //上限額管理事業所
        new wjGrid.CellRange(0, 7, 0, 12), //利用者請求実績
        new wjGrid.CellRange(0, 13, 0, 14), //上限管理後
        new wjGrid.CellRange(0, 15, 1, 15), //レセプト確定
        new wjGrid.CellRange(0, 16, 1, 16), //印刷
      ];
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
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#recept-tajyougen {
  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: normal;
  }

  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }

  .vertical {
    text-orientation: upright;
    -webkit-writing-mode: vertical-rl;
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    letter-spacing: 0.2em;
    text-align: center;
  }
}
</style>