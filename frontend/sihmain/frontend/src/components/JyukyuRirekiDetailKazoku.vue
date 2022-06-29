<template>
  <div id="JyukyuRirekiDetailKazoku">
    <wj-flex-grid
      :itemsSource="kazokuList"
      :allowMerging="'ColumnHeaders'"
      :alternatingRowStep="0"
      :selectionMode="3"
      :autoGenerateColumns="false"
      :isReadOnly="true"
      :allowAddNew="false"
      :allowDelete="false"
      :allowDragging="false"
      :allowPinning="false"
      :allowResizing="false"
      :allowSorting="false"
      :initialized="onInitialized"
      :headersVisibility="'Column'"
    >
    </wj-flex-grid>
    <v-card class="pa-1 backGrey" outlined shaped tile>家族情報入力</v-card>
    <v-row no-gutters class="kihon-jyukyusyabangou-row">
      <v-card
        elevation="0"
        class="kihon-title-length5 d-flex flex-row"
        flat
        tile
      >
        受給者番号
      </v-card>
      <p class="required">*</p>
      <v-card elevation="0" class="kihon-jyukyusyabangou-input d-flex flex-row">
        <wj-combo-box
          class="kihon-jyukyusyabangou-input2"
          :textChanged="onTextChanged"
        ></wj-combo-box>
      </v-card>
    </v-row>
    <v-row no-gutters class="kihon-jyukyusyabangou-row">
      <v-card
        elevation="0"
        class="kihon-title-length5 d-flex flex-row"
        flat
        tile
      >
        フリガナ
      </v-card>
      <v-card elevation="0" class="kihon-jyukyusyabangou-input d-flex flex-row">
        <wj-combo-box
          class="kihon-jyukyusyabangou-input2"
          :textChanged="onTextChanged"
        ></wj-combo-box>
      </v-card>
    </v-row>
    <v-row class="mt-0 pa-2">
      <v-col>
        <v-btn small>クリア</v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn small>登録</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
    };
  },
  props: {
    kazokuList: Array,
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {
    onInitialized(flexGrid) {
      //ヘッダ情報の作成
      this.createHeader(flexGrid);
      // イベント設定
      this.setEvents(flexGrid);
      //セルのマージ
      this.cellMerge(flexGrid);
      //データ設定
      this.setData();
    },

    /***********************
     * イベント設定
     */
    setEvents(flexGrid) {
      let _self = this;
      //セルをクリック
      flexGrid.hostElement.addEventListener('click', function (e) {
        let hPage = flexGrid.hitTest(e.pageX, e.pageY);
        let code = 'kazoku';

        _self.$emit('child_data', _self.kazokuList[hPage.row], code);
      });
    },

    /********************
     * セルのマージ
     */
    cellMerge(flexGrid) {
      let mm = new wjGrid.MergeManager();
      let ranges = [];
      ranges = [new wjGrid.CellRange(0, 0, 0, 1)];
      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < ranges.length; h++) {
            if (ranges[h].contains(r, c)) {
              return ranges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    /*******************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      while (flexGrid.columns.length < 2) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      // ヘッダ記載
      for (let i = 0; i < 2; i++) {
        flexGrid.columnHeaders.setCellData(0, i, '家族情報参照');
      }

      flexGrid.columns[0].width = 40;
      flexGrid.columns[1].width = '1*';
      flexGrid.columnHeaders.rows[0].align = 'center';
      flexGrid.columns[0].binding = 'code';
      flexGrid.columns[1].binding = 'name';
    },
    setData() {
      this.kazokuList = [];
      this.kazokuList.push(
        { id: 1, code: '01', name: '東経　父' },
        { id: 2, code: '02', name: '東経　母' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' }
      );
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuRirekiDetailKazoku {
  .backGrey {
    text-align: center;
    padding: 0;
    background-color: #eee;
  }

  .kihon-title-length5 {
    width: 100px;
    padding: 2px 0px 0px 14px;
    background-color: #ccc;
    color: black;
    text-align: center;
  }
  .required {
    position: absolute;
    color: #ce3e47; /*文字は白に*/
    font-weight: bold; /*太字に*/
    font-size: 1.1em; /*サイズ1.1倍*/
    top: 0;
    left: 0;
    margin-top: -3px;
    padding: 0px;
  }

  .kihon-jyukyusyabangou-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .kihon-jyukyusyabangou-input {
      height: 100%;
    }
    .kihon-jyukyusyabangou-input2 {
      width: 180px;
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
  }
}
</style>