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
        width="2*"
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
        :binding="'jyougengaku'"
        :multiLine="true"
        align="center"
        width="2*"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutan'"
        :header="centerHeader[2]"
        :multiLine="true"
        align="right"
        format="n0"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'resehanei'"
        :width="30"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'koban'"
        :header="verticalHeader[4]"
        :width="30"
        align="center"
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
        width="2*"
        align="center"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'teikyoservice'"
        :header="'提供\nサービス'"
        width="2*"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'souhiyougaku'"
        :header="centerHeader[3]"
        width="2*"
        align="right"
        :multiLine="true"
        :format="'n0'"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'riyosyafutangaku'"
        :header="centerHeader[0]"
        width="2*"
        align="right"
        :format="'n0'"
        :multiLine="true"
        :isReadOnly="true"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        :binding="'hensyu'"
        :header="verticalHeader[5]"
        :width="30"
        align="center"
        :multiLine="true"
        :isReadOnly="true"
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
        :isReadOnly="true"
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
        '上限額管理計算',
        '管理結果',
        'レセプト確定',
        '印刷',
        '項番',
        '編集',
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
    /*******************
     * 確定登録・解除ボタン
     */
    parentDefineButton(type) {
      console.log(type);
      for (let i = 0; i < this.allData.length; i++) {
        let mark = this.mainFlexGrid.getCellData(i, 15);
        console.log(mark);
        if (mark == '〇') {
          this.mainFlexGrid.setCellData(i, 15, 'complete');

          this.allData[i]['complateFlag'] = true;
        }
        //this.allData[i]['print'] = mark;
      }
    },
    /*******************
     * アルファベット絞り込み
     */
    parentAlphabet(alphaSearch) {
      let get = [];
      let data = this.allData;
      data.forEach(function (value) {
        switch (alphaSearch) {
          case 1:
            if (value.kana.match(/^[ア-オ]/)) get.push(value);
            break;
          case 2:
            if (value.kana.match(/^[カ-コ]/)) get.push(value);
            break;
          case 3:
            if (value.kana.match(/^[サ-ソ]/)) get.push(value);
            break;
          case 4:
            if (value.kana.match(/^[タ-ト]/)) get.push(value);
            break;
          case 5:
            if (value.kana.match(/^[ナ-ノ]/)) get.push(value);
            break;
          case 6:
            if (value.kana.match(/^[ハ-ホ]/)) get.push(value);
            break;
          case 7:
            if (value.kana.match(/^[マ-モ]/)) get.push(value);
            break;
          case 8:
            if (value.kana.match(/^[ヤ-ヨ]/)) get.push(value);
            break;
          case 9:
            if (value.kana.match(/^[ラ-ロ]/)) get.push(value);
            break;
          case 10:
            if (value.kana.match(/^[ワ-ン]/)) get.push(value);
            break;
        }
      });
      data = get;

      this.receptData = data;
    },
    /******************
     * 親コンポーネントのソート
     */
    parentSort(type) {
      let array = this.allData;
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
          if (a.jigyosyobango < b.jigyosyobango) return 1;
          if (a.jigyosyobango > b.jigyosyobango) return -1;
          return 0;
        });
      }

      this.receptData = array;
      this.mainFlexGrid.itemsSource = [];
    },
    /**********************
     * 親コンポーネントの全選択/全解除
     */
    parentSelectAll(type) {
      let mark = '';
      if (type == 1) mark = '〇';
      for (let i = 0; i < this.allData.length; i++) {
        this.mainFlexGrid.setCellData(i, 17, mark);
        this.allData[i]['print'] = mark;
      }
    },
    /***********
     * 親コンポーネントの上限管理計算へ反映ボタン
     */
    parentReceptCalc() {
      alert('aaa');
    },
    getData: function () {
      let receptData = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < Math.floor(Math.random() * 5) + 2; j++) {
          receptData.push({
            sityoson: '東経市',
            jyukyusyaBango: '1000' + i,
            code: 10000000,
            riyousyamei: '東経太郎' + i,
            kana: 'トウケイタロウ',
            jyougenicon: '自',
            jyougengaku: '南山事務所',
            riyosyafutan: 9000,
            resehanei: '',
            koban: j + 1,
            jigyosyobango: '1000000' + i + j,
            jigyosyomei: 'ひまわり園',
            teikyoservice: '22 生活介護',
            souhiyougaku: '',
            riyosyafutangaku: '',
            kanrikekkafutangaku: '',
            kanrikekka: '',
            resekakutei: '',
            print: '',
            complateFlag: false, // 確定状態
          });
        }
      }
      // 項番でソート
      receptData.sort((a, b) => {
        if (a.koban < b.koban) return -1;
        if (a.koban > b.koban) return 1;
        return 0;
      });
      // 受給者番号でソート
      receptData.sort((a, b) => {
        if (a.jyukyusyaBango < b.jyukyusyaBango) return -1;
        if (a.jyukyusyaBango > b.jyukyusyaBango) return 1;
        return 0;
      });

      //jyukyusyaBangoをキーに変更し、グループ化をする
      let array = [];
      for (let i = 0; i < receptData.length; i++) {
        //配列の要素数を指定する
        array[receptData[i]['jyukyusyaBango']] = [];
        for (let j = 0; j < receptData.length; j++) {
          if (
            receptData[i]['jyukyusyaBango'] == receptData[j]['jyukyusyaBango']
          ) {
            array[receptData[i]['jyukyusyaBango']].push({ j });
          }
        }
      }
      //マージ用の配列を作成
      let merge = [];
      array.forEach(function (elem, key) {
        merge.push({
          k: key,
          first: elem[0].j,
          last: elem.length + elem[0].j,
        });
      });
      this.merge = merge;
      this.allData = receptData;
      return receptData;
    },

    onInitialized: function (flexGrid) {
      let griddata = this.getData();
      this.mainFlexGrid = flexGrid;
      let _self = this;
      // ヘッダ情報の作成
      this.createHeader(flexGrid, _self);

      // セルのマージ
      this.createCellMerge(flexGrid);

      //セルのクリックイベント
      this.clickEventCell(flexGrid, _self);

      //セルのフォーマット指定
      this.createCellFormat(flexGrid, _self);

      // セルの値を編集
      this.edittingCell(flexGrid, _self);

      flexGrid.itemsSource = griddata;
    },

    /****************
     * セルのクリックイベント
     */
    clickEventCell: function (flexGrid, _self) {
      flexGrid.hostElement.addEventListener('click', function (e) {
        //レセプト確定セルを押下し、確定アイコンの表示
        let ht = flexGrid.hitTest(e);
        // console.log(ht.target.innerHTML);
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        // セル押下時のみ
        if (ht.cellType == wjGrid.CellType.Cell) {
          //印刷カラムを押下
          if (hPage.col == 17) {
            let mark = '〇';
            if (flexGrid.getCellData(hPage.row, 17) == '〇') mark = '';
            flexGrid.setCellData(hPage.row, 17, mark);
            _self.allData[hPage.row]['print'] = mark;
          }
          // レセプト確定カラムを押下
          if (hPage.col == 16) {
            if (ht.target.innerText == '〇') {
              flexGrid.setCellData(hPage.row, 16, '');
              _self.allData[hPage.row]['resekakutei'] = '';
            }
            if (ht.target.innerText == 'complete') {
              flexGrid.setCellData(hPage.row, 16, 'delete');
              _self.allData[hPage.row]['resekakutei'] = 'delete';
              _self.allData[hPage.row]['complateFlag'] = false;
            }
            if (ht.target.innerText == 'delete') {
              flexGrid.setCellData(hPage.row, 16, 'complete');
              _self.allData[hPage.row]['resekakutei'] = 'complete';
              _self.allData[hPage.row]['complateFlag'] = true;
            }
          }
          //  alert(hPage.row);
          //flexGrid.setCellData(e.row, 6, '〇');
        }
      });
    },
    /********
     * セルを編集
     */
    edittingCell: function (flexGrid, _self) {
      flexGrid.beginningEdit.addHandler(function (senders, args) {
        if (_self.allData[args.row].complateFlag) {
          if (args.col == 13 || args.col == 14) {
            args.cancel = true;
          }
        }
      });
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
        if (e.col == 13 || e.col == 14) {
          if (!isNumber(value) && value.length > 0) {
            e.cancel = true;
            e.stayInEditMode = true;
            alert('数値のみの入力になります。');
          } else if ((pt13 > 0 && value) || (pt14 > 0 && value)) {
            flexGrid.setCellData(e.row, 6, '〇');
            flexGrid.setCellData(e.row, 15, '');
          }
        }
      });
    },

    /*****************
     * セルのフォーマット指定
     */
    createCellFormat: function (flexGrid, _self) {
      flexGrid.formatItem.addHandler(function (s, e) {
        let html = e.cell.innerHTML;
        let text = e.cell.innerText;

        let classname = '';
        console.log(e.cell);
        if (e.cell == 3) {
          console.log('sss');
          e.cell.style.color = 'red';
        }
        if (
          text == _self.verticalHeader[0] ||
          text == _self.verticalHeader[1] ||
          text == _self.verticalHeader[2] ||
          text == _self.verticalHeader[3] ||
          text == _self.verticalHeader[5] ||
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
        if (text == 'complete') {
          classname = 'complete';
        } else if (text == 'delete') {
          classname = 'delete';
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
      panel.setCellData(0, 13, _self.verticalHeader[5]);
      panel.setCellData(0, 14, '上限管理後');
      panel.setCellData(0, 16, _self.verticalHeader[2]);
      panel.setCellData(0, 17, _self.verticalHeader[3]);
      flexGrid.columnHeaders.rows[1].height = 80;
    },
    /**************
     * ヘッダセルのマージ
     */
    createCellMerge: function (flexGrid) {
      let headerRanges = [
        new wjGrid.CellRange(0, 0, 0, 5), //基本情報
        new wjGrid.CellRange(0, 6, 1, 6), //レセプト
        new wjGrid.CellRange(1, 3, 1, 4), //上限額管理事業所
        new wjGrid.CellRange(0, 7, 0, 12), //利用者請求実績
        new wjGrid.CellRange(0, 13, 1, 13), //編集
        new wjGrid.CellRange(0, 14, 0, 15), //上限管理後
        new wjGrid.CellRange(0, 16, 1, 16), //レセプト確定
        new wjGrid.CellRange(0, 17, 1, 17), //印刷
      ];
      let ranges = [];
      for (let i = 0; i < this.merge.length; i++) {
        for (let j = 0; j <= 6; j++) {
          ranges.push(
            new wjGrid.CellRange(
              this.merge[i].first,
              j,
              this.merge[i].last - 1,
              j
            )
          );
        }
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
  },
};
</script>
<style lang="scss" >
@import '@/assets/scss/common.scss';

div#recept-jijyougen {
  #grid_jijyougen {
    height: 52vh;
  }
  .wj-flexgrid .wj-cell {
    display: flex;
    font-size: 12px;
    font-weight: normal;
  }

  .wj-header.wj-cell {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: normal;
  }

  .wj-header.wj-cell.wj-align-center {
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

  .complete {
    background-image: url('@/assets/kaku_15px.png');
    text-indent: -9999px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .delete {
    background-image: url('@/assets/kesu_15px.png');
    text-indent: -9999px;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>