<template>
  <v-container fluid>
    <v-container class="grey lighten-5" fluid>
      <v-card
          class="pa-2"
          outlined
          tile
        >
        <v-row dense >
          <v-col sm="1">サービス </v-col>
          <v-col sm="11">
              <wj-combo-box :textChanged="onTextChanged" ></wj-combo-box>
              <wj-combo-box :items-source="search"></wj-combo-box>
          </v-col>
        </v-row>
        <v-row dense >
          <v-col sm="1">提供月</v-col>
          <v-col sm="11">
              <wj-combo-box :textChanged="onTextChanged" ></wj-combo-box>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-row fluid>
      <v-col cols="2">
        <wj-combo-box :items-source="member"></wj-combo-box>

          <v-btn-toggle
            class="mt-2"
            mandatory
          >
          <v-btn
            x-small
            color="secondary"
            dark
            outlined
          >コード順
          </v-btn>
          <v-btn
            x-small
            color="secondary"
            dark
            outlined
          >カナ順
          </v-btn>
          <v-btn
            x-small
            color="secondary"
            dark
            outlined
          >受給者番号順
          </v-btn>
          </v-btn-toggle>
          <wj-flex-grid
            class="mt-1"
            :autoSearch="true"
            :selectionMode="'ListBox'"
            :headersVisibility="'Column'"
            :itemsSource="usres">
              <wj-flex-grid-column :isReadOnly="true" binding="code" header="コード"></wj-flex-grid-column>
              <wj-flex-grid-column :isReadOnly="true" binding="name" header="利用者名"></wj-flex-grid-column>
              <wj-flex-grid-column :binding="'active'" header="印刷" :width=60></wj-flex-grid-column>
          </wj-flex-grid>

      </v-col>
      <v-col cols="10" >
        <v-btn-toggle
          mandatory
          >
          <v-btn
            small
            color="secondary"
            dark
            outlined
          >前の利用者
          </v-btn>
          <v-btn
            small
            color="secondary"
            dark
            outlined
          >次の利用者
          </v-btn>
        </v-btn-toggle>
        <v-container
            class="d-flex"
            fluid
            mt-2
            pt-0
          >
          <div class="mt-1 pr-2">利用者</div>
          <div><wj-combo-box :isReadOnly=true ></wj-combo-box></div>
          <div class="ml-3 mt-1 pr-2">受給者証番号</div>
          <div><wj-combo-box :isReadOnly=true ></wj-combo-box></div>
          <div class="pt-1 ml-5">
            <small>最終編集者: R03.08.08 12:36 (担当者：大正雅夫)</small>
          </div>
        </v-container>
        <v-container
          mt-0
          pt-0
          class="d-flex justify-end "
          fluid>
          <div class="ml-5">
            <span class="text-danger"><span class="wj-glyph-pencil"></span>〇×</span>
            <small>:編集可能</small>
          </div>
          <div class="ml-5"><small>:入退院</small></div>
          <div class="ml-5"><small>:外泊</small></div>
          <div class="ml-5"><small>:手修正済み</small></div>
        </v-container>
        <wj-flex-grid
        id="theGridTallRows"
        :initialized="onInitialized" ></wj-flex-grid>
          
      </v-col>
    </v-row>
    
  </v-container>

</template>

<script>

import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.grid";

import '@grapecity/wijmo.vue2.input';
import "@grapecity/wijmo.vue2.grid";
import moment from 'moment'

export default{
  
  data(){
    return{
      year:moment().year(),
      month:moment().month()+1,
      search:[ '32:施設入所支援' ],
      member:[ '全員' ],
      week:['日', '月', '火', '水', '木', '金', '土' ],
      usres:[
        {code:"100001", name: "東経たろう", active:true },
        {code:"100002", name: "東経ジロウ", active:false },
        {code:"100003", name: "東経三郎", active:true },
        {code:"100004", name: "東経史郎", active:true },
        {code:"100005", name: "東経五郎", active:true },
        {code:"100006", name: "東経六郎", active:true },
        {code:"100007", name: "東経七ろう", active:true },
      ]
    }
  },
  created(){
    moment.locale("ja");
  },
  methods: {
    onInitialized:function (flexGrid)
    {
      
      let m = moment(this.year+"-"+this.month+"-01");
      let year = this.year;
      let month = this.month;
      let week = this.week;
      let lastdate = m.daysInMonth();

      let i = 0;
      while (flexGrid.columns.length < lastdate+4) {
          let clm = new wjGrid.Column();
          if(i >= 2 ){ 
            clm.width = 40;
          }else{
            clm.width = 220;
          }
          flexGrid.columns.push(clm);
          i++;
      }
      while (flexGrid.rows.length < 19) {
          flexGrid.rows.push(new wjGrid.Row());
      }

      // configure the grid
      flexGrid.mergeManager = new CustomMergeManager();
      flexGrid.rowHeaders.columns[0].width = 40;
      flexGrid.rows.defaultSize = 45;
      flexGrid.alternatingRowStep = 0;
      flexGrid.isReadOnly = true;
      flexGrid.allowDragging = false;
      flexGrid.allowResizing = false;

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if(c == 0) cell.style.textAlign = 'left';
        if(c >= 2 ) cell.style.textAlign = 'center';
        if(panel.cellType == 2 && c >= 2 && r == 0 ){
          if(lastdate >= c-1){
            let day = c-1;
            let date = year+"-"+month+"-"+day;
            let w = moment(date).day();
            if(w == 0) cell.style.color = "red";
            if(w == 6) cell.style.color = "blue";
            cell.innerHTML = day+'<div>('+week[w]+')</div>';
          }
        }
        if(c == 2 && r == 2){
           cell.innerHTML = '<a >〇</a>';
        }
        if(c == 3 && r == 2){
           cell.innerHTML = '<a >〇</a>';
        }
        if(c == 2 && r == 3){
           cell.innerHTML = '<a >〇</a>';
        }
      }

      flexGrid.formatItem.addHandler(leftCell);
      let headerColum = [];
      headerColum.push("");
      headerColum.push("項目");
      headerColum.push("項目");

      for(var d = 1; d <= lastdate; d++){
        headerColum.push(d);
      }
      headerColum.push("合計");
      headerColum.push("金額");

      // populate the grid
      setData( flexGrid.columnHeaders, 0, headerColum );
      setData( flexGrid.cells, 0, ["変動情報","利用日","利用日"] );
      setData( flexGrid.cells, 1, ["変動情報","入退院・外泊","入退院・外泊"] );
      setData( flexGrid.cells, 2, ["変動情報","食事", "朝食" ] );
      setData( flexGrid.cells, 3, ["変動情報","食事", "昼食"] );
      setData( flexGrid.cells, 4, ["変動情報","食事", "夕食"] );
      setData( flexGrid.cells, 5, ["変動情報","光熱水費","光熱水費"] );
      setData( flexGrid.cells, 6, ["個別加算","入院外泊加算Ⅰ","入院外泊加算Ⅰ"] );
      setData( flexGrid.cells, 7, ["個別加算","入院外泊加算Ⅱ","入院外泊加算Ⅱ"] );
      setData( flexGrid.cells, 8, ["個別加算","栄養マネジメント加算","栄養マネジメント加算"] );
      setData( flexGrid.cells, 9, ["個別加算","療養食加算","療養食加算"] );
      setData( flexGrid.cells, 10,["個別加算"," "," "] );
      setData( flexGrid.cells, 11,["受給者証情報","援護者","東経市"] );
      setData( flexGrid.cells, 12,["受給者証情報","援護者","西経市"] );
      setData( flexGrid.cells, 13,["受給者証情報","障害種別","知的"] );
      setData( flexGrid.cells, 14,["受給者証情報","障害支援区分","区分4"] );
      setData( flexGrid.cells, 15,["受給者証情報","決定支給量"," "] );
      setData( flexGrid.cells, 16,["受給者証情報","負担上限月額",9300] );
      setData( flexGrid.cells, 17,["受給者証情報","上限管理事業所","ひまわり園"] );
      setData( flexGrid.cells, 18,["受給者証情報","特別給付費",500] );
    },
    onTextChanged: function(s){
        console.log(s.text);
    },
  }
}

function setData(p, r, cells) {
    if (p.cellType == wjGrid.CellType.Cell) {
      p.grid.rowHeaders.setCellData(r, 0, cells[0]);
    }

    for (var i = 1; i < cells.length; i++) {
      p.setCellData(r, i - 1, cells[i],true,true);
    }
}

function leftCell(s, e) {
    if (e.cell.children.length == 0) {
        e.cell.innerHTML = "<div>" + e.cell.innerHTML + "</div>";
        wjCore.setCss(e.cell, {
            display: "table",
            tableLayout: "fixed",
        });
        wjCore.setCss(e.cell.children[0], {
            display: "table-cell",
            verticalAlign: "middle",
        });
    }
}

var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty.call(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
    
var CustomMergeManager = (function(_super) {
    __extends(CustomMergeManager, _super);
    function CustomMergeManager() {
        return _super.call(this) || this;
    }
    CustomMergeManager.prototype.getMergedRange = function(panel, r, c, clip) {
        if (clip === void 0) {
            clip = true;
        }

        var rng = new wjGrid.CellRange(r, c);
        if( rng.col >= 2 && rng.col2 >= 2){
          return rng;
        }
        for (var i = rng.col; i < panel.columns.length - 1; i++) {
            if (
                panel.getCellData(rng.row, i, true) !=
                panel.getCellData(rng.row, i + 1, true)
            )
                break;
            rng.col2 = i + 1;
        }
        for (var i2 = rng.col; i2 > 0; i2--) {
            if (
                panel.getCellData(rng.row, i2, true) !=
                panel.getCellData(rng.row, i2 - 1, true)
            )
                break;
            rng.col = i2 - 1;
        }
        for (var i3 = rng.row; i3 < panel.rows.length - 1; i3++) {
            if (
                panel.getCellData(i3, rng.col, true) !=
                panel.getCellData(i3 + 1, rng.col, true)
            )
                break;
            rng.row2 = i3 + 1;
        }
        for (var i4 = rng.row; i4 > 0; i4--) {
            if (
                panel.getCellData(i4, rng.col, true) !=
                panel.getCellData(i4 - 1, rng.col, true)
            )
                break;
            rng.row = i4 - 1;
        }

        return rng;
    };
    return CustomMergeManager;
})(wjGrid.MergeManager);

</script>

<style lang="scss" scope>
.wj-flexgrid .wj-cell {
    padding: 10px 5px;
    &.wj-header{
      font-size:11px;    
    }
}

.wj-rowheaders{
  div.wj-row{
    & > div.wj-cell.wj-header{
      & > div{
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline;
        transform: translate(-50%, -50%);
        writing-mode: vertical-rl;
      }
    }
  }
}

</style>
