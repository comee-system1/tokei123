<template>
  <div>
    <v-row no-gutters>
      <v-col>
      <wj-flex-grid
        id="kyuhu-meisairan"
        :headersVisibility="'None'"
        :alternatingRowStep="0"
        :autoGenerateColumns="false"
        :initialized="onInitialized"
        :isReadOnly="true"
        :allowDragging="false"
        :allowResizing="false"
        :deferResizing="false"
        :allowSorting="false"
      >
        <wj-flex-grid-column
          :width="20"
          :wordWrap="true"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'service'"
          :header="'サービス内容'"
          width="3*"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode1'"
          :header="'サービスコード'"
          width="0.5*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode2'"
          width="0.5*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode3'"
          width="0.5*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode4'"
          width="0.5*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode5'"
          width="0.5*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicecode6'"
          width="0.5*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tanisuu'"
          :header="'単位数'"
          width="1.5*"
          :format="'n0'"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'kaisuu'"
          :header="'回数'"
          width="1*"
          :format="'n0'"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'servicetanisuu'"
          :header="'サービス単位数'"
          align="center"
          width="2*"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :binding="'tekiyou'"
          :header="'摘要'"
          width="3*"
        ></wj-flex-grid-column>
      </wj-flex-grid>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),
      data: [],
      allData: [],
      dateArgument: '',
      mainTableGrid: '',
      griddata: [],
      selectedUser: '',
      tplImage: CellMaker.makeImage({}),
      servieGrid: '',
    };
  },
  methods: {
    getData: function () {
      let data = [];
      for (let i = 0; i <= 12; i++) {
        data.push({
          service: '生活介護',
          servicecode1: '1',
          servicecode2: '1',
          servicecode3: '4',
          servicecode4: '3',
          servicecode5: '2',
          servicecode6: i,
          tanisuu: 669,
          kaisuu: 1,
          servicetanisuu: 9300,
          tekiyou: '',
        });
      }
      this.allData = data;
      return data;
    },
    onInitialized: function (grid) {
      let griddata = this.getData();
      while (grid.rows.length < griddata.length) {
        grid.rows.push(new wjGrid.Row());
      }

      // セルの結合/////////////////////////////////////////////////////////////////
      let cellRanges = [
        new wjGrid.CellRange(1,0,12,0),
        new wjGrid.CellRange(0,2,0,7),
      ];
      let mm = new wjGrid.MergeManager(grid);

      // getMergedRangeメソッドをオーバーライドする
      mm.getMergedRange = function (panel, r, c) {
        for (let h = 0; h < cellRanges.length; h++) {
          if (cellRanges[h].contains(r, c)) {
            return cellRanges[h];
          }
        }
      };
      grid.mergeManager = mm;
      
      this.mainTableGrid = grid;
      this.griddata = griddata;
      grid.itemsSource = griddata;


      // グリッドのスタイルをカスタマイズ
      grid.itemFormatter = function(panel,r,c,cell){
        // グリッド内共通スタイル
        let s = cell.style;
        s.fontWeight = "normal";
        s.textAlign = 'center';
        if((c == 0) || (r === 0)){
          s.backgroundColor = "#eee";
          s.color = "#000";
        }
        if(r == 1 &&  c == 0) {
          cell.innerHTML = '給付明細欄';
          s.display ="flex";
          s.alignItems = "center";
        }
        if(c == 1){
          s.textAlign = 'left';
          s.paddingLeft = '4px';
        }
        if(r == 0 &&  c == 1) {
          cell.innerHTML = 'サービス内容';
        }
        if(r == 0 &&  c == 2) {
          cell.innerHTML = 'サービスコード';
        }
        if(r == 0 &&  c == 8) {
          cell.innerHTML = '単位数';
        }
        if(r == 0 &&  c == 9) {
          cell.innerHTML = '回数';
        }
        if(r == 0 &&  c == 10) {
          cell.innerHTML = 'サービス単位回数';
        }
        if(r == 0 &&  c == 11) {
          cell.innerHTML = '摘要';
        }
      }
    },
  },
};

</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
</style>