<template>
  <div id="JyukyuRirekiDetail">
    <div v-if="hojomode === 'shichoson'" v-on="changeMode()">
      <v-card class="pa-1 backGrey" outlined shaped tile>市町村選択</v-card>
      <wj-flex-grid
        id="grdShichoson"
        :itemsSource="shichosonList"
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
        :initialized="onInitializedShichoson"
        :headersVisibility="'Column'"
      >
      </wj-flex-grid>
    </div>
    <div v-else-if="hojomode === 'kazoku'" v-on="changeMode()">
      <wj-flex-grid
        id="grdKazoku"
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
        :initialized="onInitializedKazoku"
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
        <v-card
          elevation="0"
          class="kihon-jyukyusyabangou-input d-flex flex-row"
        >
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
        <v-card
          elevation="0"
          class="kihon-jyukyusyabangou-input d-flex flex-row"
        >
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
    hojomode: String,
    shichosonList: Array,
    kazokuList: Array,
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {
    changeMode() {
      // if (this.hojomode === 'shichoson') {
      //   var grd = new wjGrid.flexGrid('#grdShichoson');
      //   this.onInitializedShichoson(grd);
      // } else if (this.hojomode === 'kazoku') {
      //   var grd = new wjGrid.FlexGrid('#grdKazoku');
      //   this.onInitializedKazoku(grd);
      // }
    },
    onInitializedShichoson(flexGrid) {
      //ヘッダ情報の作成
      this.createHeaderShichoson(flexGrid);
    },
    onInitializedKazoku(flexGrid) {
      //ヘッダ情報の作成
      this.createHeaderKazoku(flexGrid);
      //セルのマージ
      this.cellMerge(flexGrid);
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
    createHeaderShichoson(flexGrid) {
      flexGrid.columns.clear();
      while (flexGrid.columns.length < 2) {
        flexGrid.columns.push(new wjGrid.Column());
      }
      // ヘッダ記載
      flexGrid.columnHeaders.setCellData(0, 0, 'コード');
      flexGrid.columnHeaders.setCellData(0, 1, '市町村名');

      flexGrid.columns[0].width = 80;
      flexGrid.columns[1].width = '1*';
      flexGrid.columnHeaders.rows[0].align = 'center';
      flexGrid.columns[0].binding = 'code';
      flexGrid.columns[1].binding = 'name';

      this.shichosonList = [];
      this.shichosonList.push(
        { id: 1, code: '000001', name: '東経市' },
        { id: 2, code: '000002', name: '西経市' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' },
        { id: 0, code: '', name: '' }
      );
    },
    createHeaderKazoku(flexGrid) {
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
div#JyukyuRirekiDetail {
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