<template>
  <div>
    <v-breadcrumbs
      :items="items"
      divider=""
      small
    ></v-breadcrumbs>

    <div class="container-fluid">
        <div class="search p-2">
          <div class="d-flex flex-row">
            <div class="w-80 pt-1">サービス</div>
            <div ><wj-combo-box :textChanged="onTextChanged"></wj-combo-box></div>&nbsp;
            <div><wj-combo-box :items-source="search"></wj-combo-box></div>
          </div>
          <div class="d-flex flex-row mt-1">
            <div class="w-80 pt-1">提供月</div>
            <div><wj-combo-box :textChanged="onTextChanged"></wj-combo-box></div>
          </div>
        </div>
        <div class="row mt-2">
            <div class="col-2">
              <div><wj-combo-box :items-source="member"></wj-combo-box></div>

              <div class="btn-group btn-group-sm mt-2" >
                <input type="radio" class="btn-check" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="btnradio1">コード順</label>
                <input type="radio" class="btn-check"  id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio2">カナ順</label>
                <input type="radio" class="btn-check"  id="btnradio3" autocomplete="off">
                <label class="btn btn-outline-primary" for="btnradio3">受給者番号順</label>
              </div>
              <div class="mt-2" >
                <wj-combo-box :textChanged="onTextChanged" placeholder="カナ検索"></wj-combo-box>
              </div>
              <div class="mt-2 btn-group btn-group-sm " >
                
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-secondary" for="btnradio1">全選択</label>
                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-secondary" for="btnradio2">全解除</label>
              </div>
              <div class="mt-2">
                <wj-flex-grid
                  :autoSearch="true"
                  :selectionMode="'ListBox'"
                  :headersVisibility="'Column'"
                  :itemsSource="usres">
                    <wj-flex-grid-column :isReadOnly="true" binding="code" header="コード"></wj-flex-grid-column>
                    <wj-flex-grid-column :isReadOnly="true" binding="name" header="利用者名"></wj-flex-grid-column>
                    <wj-flex-grid-column :binding="'active'" header="印刷" :width=60></wj-flex-grid-column>
                </wj-flex-grid>
              </div>

            </div>
            <div class="col-10">
              <div class="d-flex">
                <div><button type="button" class="btn btn-secondary btn-sm disabled">前の利用者</button></div>
                <div><button type="button" class="btn btn-secondary btn-sm ">次の利用者</button></div>
              </div>
              <div class="d-flex mt-2">
                <div class="pt-1">利用者&nbsp;</div>
                <div><wj-combo-box :isReadOnly=true ></wj-combo-box></div>
                <div class="pt-1 ml-5">受給者証番号</div>
                <div><wj-combo-box :isReadOnly=true ></wj-combo-box></div>
                <div class="pt-1 ml-5"><small>最終編集者: R03.08.08 12:36 (担当者：大正雅夫)</small></div>
              </div>
              <div class="d-flex flex-row-reverse">
                <div class="ml-5"><small>:手修正済み</small></div>
                <div class="ml-5"><small>:外泊</small></div>
                <div class="ml-5"><small>:入退院</small></div>
                <div class="ml-5">
                  <span class="text-danger"><span class="wj-glyph-pencil"></span>〇×</span>
                  <small>:編集可能</small>
                </div>
              </div>
              <div class="mt-2">
                <wj-flex-grid  :initialized="onInitialized" ></wj-flex-grid>
              </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>

import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.grid";
import '@grapecity/wijmo.vue2.input';
import "@grapecity/wijmo.vue2.grid";

export default{

  data(){
    return{
      items: [
        {
          text: 'グランドメニュー',
          disabled: false,
          href: '/',
        },
        {
          text: '入所レセプト請求',
          disabled: false,
          href: '#',
        },
        {
          text: '変動情報登録・修正',
          disabled: true,
          href: '#',
        },
      ],
      search:[ '32:施設入所支援' ],
      member:[ '全員' ],
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
  
  methods: {

    onInitialized:function (flexGrid)
    {

      while (flexGrid.columns.length < 32) {
          flexGrid.columns.push(new wjGrid.Column());
      }
      while (flexGrid.rows.length < 11) {
          flexGrid.rows.push(new wjGrid.Row());
      }

      // configure the grid
      flexGrid.mergeManager = new CustomMergeManager();
      flexGrid.formatItem.addHandler(leftCell);
      flexGrid.rowHeaders.columns[0].width = 40;
      flexGrid.rows.defaultSize = 40;
      flexGrid.alternatingRowStep = 0;
      flexGrid.isReadOnly = true;
      flexGrid.allowDragging = false;
      
      let itemColum = [];
      itemColum.push("");
      itemColum.push("項目");
      itemColum.push("項目");
      let days = "";
      for(var d = 1; d <= 30; d++){
        itemColum.push(d);
      }
      console.log(days);
      // populate the grid
      setData( flexGrid.columnHeaders, 0, itemColum );
      setData( flexGrid.cells, 0, ["変動情報","利用日","利用日"] );
      setData( flexGrid.cells, 1, ["変動情報","入退院・外泊","入退院・外泊"] );
      setData( flexGrid.cells, 2, ["変動情報","食事", "朝食" ] );
      setData( flexGrid.cells, 3, ["変動情報","", "昼食"] );
      setData( flexGrid.cells, 4, ["変動情報","", "夕食"] );
      setData( flexGrid.cells, 5, ["変動情報","光熱水費"] );
      setData( flexGrid.cells, 6, ["個別加算","入院外泊加算Ⅰ","入院外泊加算Ⅰ"] );
      setData( flexGrid.cells, 7, ["個別加算","入院外泊加算Ⅱ","入院外泊加算Ⅱ"] );
      setData( flexGrid.cells, 8, ["個別加算","栄養マネジメント加算","栄養マネジメント加算"] );
      setData( flexGrid.cells, 9, ["個別加算","療養食加算","療養食加算"] );
      setData( flexGrid.cells, 10, ["個別加算","",""] );
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
        p.setCellData(r, i - 1, cells[i]);
    }
}

function leftCell(s, e) {
    if (e.cell.children.length == 0) {
        e.cell.innerHTML = "<div>" + e.cell.innerHTML + "</div>";
        wjCore.setCss(e.cell, {
            display: "table",
            tableLayout: "fixed"
        });
        wjCore.setCss(e.cell.children[0], {
            display: "table-cell",
            textAlign: "center",
            verticalAlign: "middle"
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

<style lang="scss">
.wj-flexgrid {
    margin-bottom: 12px;
}

body {
    margin-bottom: 24px;
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
