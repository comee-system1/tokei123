<template>
  <div id="houkokusyoNenrei">
    <v-container no-gutters fluid class="container pa-1">
      <v-row no-gutters>
        <v-col id="leftArea" class="pa-1">
          <v-row no-gutters class="rowStyle_Input">
            <v-card class="koumokuTitle titleMain pa-1" outlined tile>
              コード
            </v-card>
            <input
              id="code"
              type="text"
              class="ml-1"
              style="width: 50px; text-align: center"
              v-model="selctedPatternItem.code"
              @input="numbervalidate"
            />
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-card class="koumokuTitle titleMain pa-1" outlined tile>
              パターン名
            </v-card>
            <input
              id="code"
              type="text"
              class="ml-1"
              style="width: 200px; text-align: left"
              v-model="selctedPatternItem.name"
            />
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1"> </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-btn class="mr-1" width="75" height="25" @click="clrClicked">
              クリア
            </v-btn>
            <v-btn class="" width="75" height="25" @click="delClicked">
              削除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mr-1" width="75" height="25" @click="addClicked">
              登録
            </v-btn>
          </v-row>
          <v-row no-gutters class="ma-0 mt-1">
            <wj-flex-grid
              id="houkokusyoNenreiicrnGrid"
              :headersVisibility="'Column'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowMerging="'AllHeaders'"
              :allowResizing="true"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'Row'"
              :isReadOnly="true"
              :initialized="onInitializeIcrnGrid"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewData"
            >
            </wj-flex-grid>
          </v-row>
        </v-col>
        <v-col id="rightArea" class="pa-1">
          <v-row no-gutters class="rowStyle_Input">
            <v-card class="koumokuTitle titleMain pa-1 mr-1" outlined tile>
              パターン名
            </v-card>
            <v-card class="koumokuData pl-1" tile outlined width="200">
              {{ selctedPatternItem.name }}
            </v-card>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1"> </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1"> </v-row>

          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-spacer></v-spacer>
            <v-btn class="mr-1" width="75" height="25" @click="addRowClicked">
              行挿入
            </v-btn>
            <v-btn class="mr-1" width="75" height="25" @click="delRowClicked">
              行削除
            </v-btn>
          </v-row>
          <v-row no-gutters class="ma-0 mt-1">
            <wj-flex-grid
              id="houkokusyoNenreiKouseiGrid"
              :headersVisibility="'Column'"
              :autoGenerateColumns="false"
              :allowAddNew="false"
              :allowDelete="false"
              :allowPinning="false"
              :allowMerging="'AllHeaders'"
              :allowResizing="true"
              :allowSorting="false"
              :allowDragging="false"
              :selectionMode="'Cell'"
              :initialized="onInitializeKouseiGrid"
              :itemsSourceChanged="onItemsSourceChanged"
              :itemsSource="viewDataKousei"
              :formatItem="onFormatItemKousei"
              :showMarquee="true"
            >
            </wj-flex-grid>
          </v-row>
          <v-row no-gutters class="rowStyle_Input mt-1">
            <v-spacer></v-spacer>
            <v-btn
              class="mr-1"
              width="75"
              height="25"
              @click="addClickedKousei"
            >
              登録
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import dayjs from 'dayjs';
// import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import * as wjGrid from '@grapecity/wijmo.grid';
import { ComboBox } from '@grapecity/wijmo.input';
import { DataMap } from '@grapecity/wijmo.grid';
// import * as wjCore from '@grapecity/wijmo';
import sysConst from '@/utiles/const';
import messageConst from '@/utiles/MessageConst';
import printUtil from '@/utiles/printUtil';
import { getConnect } from '@connect/getConnect';
import { deleteConnect } from '@connect/deleteConnect';
import { putConnect } from '@connect/putConnect';
import { postConnect } from '@connect/postConnect';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {},
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      headerListPattern: [
        {
          dataname: 'codeD',
          title: 'コード',
          width: 50,
          align: 'center',
        },
        {
          dataname: 'name',
          title: '年齢構成パターン名',
          width: '*',
          align: 'left',
        },
      ],
      headerListKousei: [
        {
          dataname: 'data1',
          title: '年齢構成',
          width: '*',
          align: 'right',
        },
        {
          dataname: 'rnd1',
          title: '年齢構成',
          width: '*',
          align: 'center',
        },
        {
          dataname: 'data2',
          title: '年齢構成',
          width: '*',
          align: 'right',
        },
        {
          dataname: 'rnd2',
          title: '年齢構成',
          width: '*',
          align: 'center',
        },
      ],
      mainGrid: {},
      kouseiGrid: {},
      thickList: [2, 9],
      syuuryouList: [
        { rnd2: 1, name: '以下' },
        { rnd2: 2, name: '未満' },
      ],
      viewData: [],
      viewDataKousei: [],
      editors: {
        kaisiCombo: new ComboBox(document.createElement('div'), {
          itemsSource: [
            { rnd1: 1, name: '以上' },
            { rnd1: 2, name: '超' },
          ],
          isEditable: false,
          displayMemberPath: 'name',
          selectedValuePath: 'rnd1',
        }),
        syuuryouCombo: new ComboBox(document.createElement('div'), {
          itemsSource: [
            { rnd2: 1, name: '以下' },
            { rnd2: 2, name: '未満' },
          ],
          isEditable: false,
          displayMemberPath: 'name',
          selectedValuePath: 'rnd1',
        }),
      },
      selctedPatternItem: { code: '' },
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
    this.setPrintEvent();
    // 初期データ読込
    this.setViewData();
    this.clrClicked();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
    this.$router.app.$off('print_event_global');
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('leftArea') != null) {
        document.getElementById('leftArea').style.height =
          window.innerHeight - 80 + 'px';
      }
      if (document.getElementById('houkokusyoNenreiicrnGrid') != null) {
        document.getElementById('houkokusyoNenreiicrnGrid').style.height =
          window.innerHeight - 240 + 'px';
      }
      if (document.getElementById('rightArea') != null) {
        document.getElementById('rightArea').style.height =
          window.innerHeight - 80 + 'px';
      }
      if (document.getElementById('houkokusyoNenreiKouseiGrid') != null) {
        document.getElementById('houkokusyoNenreiKouseiGrid').style.height =
          window.innerHeight - 240 + 'px';
      }
    },
    setPrintEvent() {
      this.$router.app.$off('print_event_global');
      this.$router.app.$on('print_event_global', this.printExec);
    },
    onInitializeIcrnGrid(flexGrid) {
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          this.selctedPatternItem = flexGrid.cells.rows[ht.row].dataItem;

          this.setViewDataKousei();
        }
      });

      this.mainGrid = flexGrid;

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.cells.rows.defaultSize = 30;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.headerListPattern.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerListPattern[colIndex].dataname;
        col.header = this.headerListPattern[colIndex].title;
        col.width = this.headerListPattern[colIndex].width;
        col.align = this.headerListPattern[colIndex].align;
        col.multiLine = true;

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerListPattern[colIndex].title
        );
      }
    },
    onInitializeKouseiGrid(flexGrid) {
      this.kouseiGrid = flexGrid;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 0 || ht.col == 2) {
            // 完全編集モードへ移行
            flexGrid.startEditing(true);
            flexGrid.imeEnabled = false;
          }
        }
      });
      flexGrid.beginningEdit.addHandler(function (s, e) {
        setTimeout(function () {
          // セルエディタの最大文字数を設定します。
          if (s.activeEditor == null) {
            return;
          }
          if (e.col == 0) {
            s.activeEditor.setAttribute('maxlength', '3');
          } else if (e.col == 2) {
            s.activeEditor.setAttribute('maxlength', '3');
          }
        });
      });
      let self = this;
      flexGrid.cellEditEnding.addHandler((s, e) => {
        // 半角数字以外は除去
        s.activeEditor.value = self.hankaku2Zenkaku(s.activeEditor.value);
        s.activeEditor.value = s.activeEditor.value.replace('.', '');
        s.activeEditor.value = s.activeEditor.value.replace('-', '');
        let numVal = self.hankaku2Zenkaku(s.activeEditor.value);
        if (isNaN(numVal)) {
          e.cancel = true;
          e.stayInEditMode = true;
          alert('数字を入力してください。');
        }
      });

      // ヘッダの追加と設定
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = sysConst.GRDROWHEIGHT.Header;
      flexGrid.cells.rows.defaultSize = 30;

      // ヘッダ文字列の設定
      for (
        let colIndex = 0;
        colIndex < this.headerListKousei.length;
        colIndex++
      ) {
        flexGrid.columns.insert(colIndex, new wjGrid.Column());
        let col = flexGrid.columns[colIndex];
        col.wordWrap = true;
        col.binding = this.headerListKousei[colIndex].dataname;
        col.header = this.headerListKousei[colIndex].title;
        col.width = this.headerListKousei[colIndex].width;
        col.align = this.headerListKousei[colIndex].align;
        col.multiLine = true;
        if (colIndex == 1) {
          col.editor = this.editors.kaisiCombo;
          col.dataMap = new DataMap(
            this.editors.kaisiCombo.itemsSource,
            'rnd1',
            'name'
          );
        }
        if (colIndex == 3) {
          col.editor = this.editors.syuuryouCombo;
          col.dataMap = new DataMap(
            this.editors.syuuryouCombo.itemsSource,
            'rnd2',
            'name'
          );
        }

        flexGrid.columnHeaders.setCellData(
          0,
          colIndex,
          this.headerListKousei[colIndex].title
        );
      }
    },
    onFormatItemKousei(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        e.cell.style.backgroundColor = '';
        if (e.col == 0 || e.col == 2) {
          e.cell.style.backgroundColor = sysConst.COLOR.white;
        }
      }
    },
    onItemsSourceChanged(flexGrid) {
      this.grdAutoSizeRow(flexGrid);
    },
    grdAutoSizeRow(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      // flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    searchClicked() {
      // 初期データ読込
      this.setViewData();
    },
    setViewData() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
      };
      console.log(params);
      getConnect('/MstNenreikoseiPtn', params, 'SIENT').then((result) => {
        console.log(12345);
        console.log(result);
        this.viewData = result;
        this.screenFlag = false;
      });
    },
    setViewDataKousei() {
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pPtnId: this.selctedPatternItem.id,
      };
      console.log(params);
      getConnect('/MstNenreikosei', params, 'SIENT').then((result) => {
        console.log(12345);
        console.log(result);
        this.viewDataKousei = result;
        this.screenFlag = false;
      });
    },
    onTantousyaClicked() {
      this.selTantouId = this.tantouist[this.selTantouId].val;
      this.userFilter();
    },
    onYousikiClicked(kbn) {
      this.selYousiki = kbn;
      this.userFilter();
    },
    numbervalidate() {
      this.selctedPatternItem.code = this.hankaku2Zenkaku(
        String(this.selctedPatternItem.code)
      );
      if (isNaN(this.selctedPatternItem.code)) {
        this.selctedPatternItem.code = '';
        return;
      }
      if (String(this.selctedPatternItem.code).length > 3) {
        this.selctedPatternItem.code = Number(
          String(this.selctedPatternItem.code).slice(0, 3)
        );
      }
      this.selctedPatternItem.code = this.selctedPatternItem.code.replace(
        /\D/g,
        ''
      );
    },
    hankaku2Zenkaku(str) {
      if (!str) {
        return '';
      }
      return str.replace(/[０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      });
    },
    clrClicked() {
      this.selctedPatternItem = { id: 0, code: '' };
      this.viewDataKousei = [];
    },
    delClicked() {
      if (this.selctedPatternItem.id == 0) {
        alert(messageConst.WARN.NO_SELECT);
        return;
      }
      let params = {
        uniqid: 3,
        traceid: 123,
        pJigyoid: 62,
        pId: this.selctedPatternItem.id,
      };
      if (!confirm(messageConst.CONFIRM.DELETE)) {
        return;
      }
      deleteConnect('/MstNenreikoseiPtn', params, 'SIENT').then((result) => {
        if (result.okflg == true) {
          this.setViewData();
          this.clrClicked();
        } else {
          alert(result.msg);
        }
      });
    },
    addClicked() {
      if (String(this.selctedPatternItem.code).length == 0) {
        alert('コード' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }
      if (this.selctedPatternItem.name.length == 0) {
        alert('パターン名' + messageConst.INPUT_ERROR.NO_INPUT);
        return;
      }

      let params = {
        uniqid: 3,
        traceid: 123,
      };

      if (this.selctedPatternItem.id == 0) {
        let body = {
          jigyoid: 62,
          id: 0,
          code: this.selctedPatternItem.code,
          name: this.selctedPatternItem.name,
        };
        if (!confirm(messageConst.CONFIRM.POST)) {
          return;
        }
        postConnect('/MstNenreikoseiPtn', params, 'SIENT', body).then(
          (result) => {
            if (result.okflg == true) {
              this.setViewData();
              this.clrClicked();
            } else {
              alert(result.msg);
            }
          }
        );
      } else {
        let body = {
          jigyoid: 62,
          id: this.selctedPatternItem.id,
          code: this.selctedPatternItem.code,
          name: this.selctedPatternItem.name,
        };
        if (!confirm(messageConst.CONFIRM.PUT)) {
          return;
        }
        putConnect('/MstNenreikoseiPtn', params, 'SIENT', body).then(
          (result) => {
            if (result.okflg == true) {
              this.setViewData();
              this.clrClicked();
            } else {
              alert(result.msg);
            }
          }
        );
      }
    },
    addClickedKousei() {
      let params = {
        uniqid: 3,
        traceid: 123,
      };
      let body = {
        jigyoid: 62,
        ptnId: this.selctedPatternItem.id,
        dataList: this.viewDataKousei.concat(),
      };
      console.log(body);
      if (!confirm(messageConst.CONFIRM.PUT)) {
        return;
      }
      putConnect('/MstNenreikosei', params, 'SIENT', body).then((result) => {
        if (result.okflg == true) {
          this.setViewData();
          this.clrClicked();
        } else {
          alert(result.msg);
        }
      });
    },
    addRowClicked() {
      if (
        this.kouseiGrid.cells.rows.length > 0 &&
        this.kouseiGrid.selectedRows.length == 0
      ) {
        alert(messageConst.WARN.ROW_EDIT_NO_SELECT);
      } else if (this.viewDataKousei.length == 0) {
        let newList = [
          {
            data1: '',
            rnd1: 1,
            data2: '',
            rnd2: 1,
          },
        ];
        this.viewDataKousei = newList.concat();
      } else {
        if (window.confirm(messageConst.CONFIRM.ROW_EDIT_ADD)) {
          let newList = this.viewDataKousei.slice();
          newList.splice(this.kouseiGrid.selectedRows[0].dataIndex + 1, 0, {
            data1: '',
            rnd1: 1,
            data2: '',
            rnd2: 1,
          });
          this.viewDataKousei = newList;
        }
      }
    },
    delRowClicked() {
      if (this.kouseiGrid.selectedRows.length == 0) {
        alert(messageConst.WARN.ROW_EDIT_NO_SELECT);
      } else {
        if (window.confirm(messageConst.CONFIRM.ROW_EDIT_DELETE)) {
          let newList = this.viewDataKousei.slice();
          newList.splice(this.kouseiGrid.selectedRows[0].dataIndex, 1);
          this.viewDataKousei = newList;
        }
      }
    },
    printExec() {
      printUtil.setGridList([this.mainGrid]);
      printUtil.setThickRightVLineList(this.thickList);
      let sub1 = '表示期間：'; // + this.getYm(0) + ' ';
      printUtil.setSubTitleList([sub1]);
      printUtil.setPageSize(printUtil.SIZE.A3);
      printUtil.printExec('担当者別実施一覧', printUtil.DIRECTION.landscape);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#houkokusyoNenrei {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;
  max-width: 1920px;
  width: auto;

  #leftArea {
    min-height: 400px;
    width: 400px;
    max-width: 400px;
    background: $view_background_Blue;
    border: 1px solid $view_Title_background_Blue_Dark;
  }
  #rightArea {
    min-height: 400px;
    height: 500px;
    width: 400px;
    max-width: 400px;
    border: 1px solid $white;
  }

  #houkokusyoNenreiicrnGrid,
  #houkokusyoNenreiKouseiGrid {
    color: $font_color;
    font-size: $cell_fontsize;
    width: 100%;
    min-height: 200px;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: $cell_fontsize;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
      line-height: 110%;
    }

    .wj-cell {
      padding: 5px;
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
    .wj-filter-on {
      color: $font_color_saturday;
      border-color: lightgray;
    }
  }
}
</style>
