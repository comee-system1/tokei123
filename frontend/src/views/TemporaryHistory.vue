<template>
  <v-container fluid>
    <v-container  fluid>
        <v-row dense >
          <v-col sm="1">
            <p>サービス</p> 
            <p class="mt-1">提供月</p>
          </v-col>
          <v-col sm="8">
            <div>
              <wj-combo-box :textChanged="onTextChanged" ></wj-combo-box>
              <wj-combo-box :items-source="search"></wj-combo-box>
            </div>
            <div class="mt-1">
              <input type="month">
            </div>
          </v-col>
          <v-col sm="3" >
            <v-row justify="end" >
                <v-btn>登録</v-btn>
            </v-row>
          </v-col>
        </v-row>
    </v-container>
    <v-container fluid>
      <v-row >
        <v-col cols="3">
          <v-row>
            <v-col col=6><wj-combo-box :items-source="member"></wj-combo-box></v-col>
            <v-col col=6><wj-combo-box placeholder="カナ検索"></wj-combo-box></v-col>
          </v-row>
          <v-row p-0>
            <v-col col=12>
              <v-btn-toggle
                class="mt-2"
                mandatory
              >
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                >コード順
                </v-btn>
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                >カナ順
                </v-btn>
                <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                >受給者番号順
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <div class="mt-1">
          <v-btn x-small outlined v-for="n of alphabet" :key="n">{{n}}</v-btn>
          </div>
          <wj-flex-grid
            class="mt-1"
            :autoSearch="true"
            :headersVisibility="'Column'"
            :itemsSource="usres"
            :selectionMode=3
            style="height:100vh;font-size:11px;"
            >
              <wj-flex-grid-column :isReadOnly="true" binding="code" header="コード" width="2*" ></wj-flex-grid-column>
              <wj-flex-grid-column :isReadOnly="true" binding="name" header="利用者名"  width="3*" ></wj-flex-grid-column>
              <wj-flex-grid-column :binding="'active'" header="印刷" width="1*" ></wj-flex-grid-column>
          </wj-flex-grid>
          
          <wj-combo-box :itemsSource="selects" :isDroppedDown="isDroppedDown" :isRequired="false" :selectedIndex=-1 :selectedIndexChanged="onselectedIndexChanged" ></wj-combo-box>
        </v-col>
        <v-col cols="9" >
          <v-container
              class="d-flex"
              fluid
              pa-0
            >
            <div class="mt-1 pr-2">利用者</div>
            <div><wj-combo-box :isReadOnly=true ></wj-combo-box></div>
            <div class="mt-1 ml-1">
            <v-btn small><span class="wj-glyph-left"></span></v-btn>&nbsp;
            <v-btn small><span class="wj-glyph-right"></span></v-btn>
            </div>
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
              <span class="text-danger"><span class="wj-glyph-pencil"></span></span>
              <small>:編集可能</small>
            </div>
            <div class="ml-5"><small>:入退院</small></div>
            <div class="ml-5"><small>:外泊</small></div>
            <div class="ml-5"><small>:手修正済み</small></div>
          </v-container>
          <wj-flex-grid
          id="theGridTallRows"
          :initialized="onInitialized"
          :isReadOnly=true
          :allowDragging=false
          :allowResizing=false
          :frozenColumns="2"
          >
          <div v-for="n in borders" :key=n>
            <div class="borderPlace" v-bind:style="{width:n.width+'px',left:n.left+'px',top:n.top+'px',backgroundColor:n.color}"></div>
          </div>
          </wj-flex-grid>
            
        </v-col>
      </v-row>
    </v-container>
    <v-row id="modalArea" class="modalArea">
      <div class="modalBg" onClick="document.getElementById('modalArea').classList.remove('display')"></div>
      <div class="modalWrapper">
        <div class="modalContents">
          <h1>Here are modal contents!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <div class="closeModal" onClick="document.getElementById('modalArea').classList.remove('display')">
          ×
        </div>
      </div>
    </v-row>

  </v-container>
</template>

<script>
import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.grid";

import '@grapecity/wijmo.vue2.input';
import "@grapecity/wijmo.vue2.grid";
import moment from 'moment'
import '@grapecity/wijmo.cultures/wijmo.culture.ja';

export default{
  data(){
    return{
      year:moment().year(),
      month:moment().month()+1,
      search:[ '32:施設入所支援' ],
      member:[ '全員' ],
      week:['日', '月', '火', '水', '木', '金', '土' ],
      alphabet:['全', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ' ],
      usres:this.getUser(),
      selects:['印刷を全選択', '印刷を全解除' ],
      isDroppedDown: false,
      borders:this.getBorder()
    }
  },
  created(){
    moment.locale("ja");
  },
  methods: {
    getBorder: function()
    {
      let borders = [];
      borders.push({
        width:300,
        left:350,
        top:90,
        color:'red'
      });
      borders.push({
        width:360,
        left:380,
        top:165,
        color:'red'
      });
      borders.push({
        width:270,
        left:380,
        top:270,
        color:'aqua'
      });
      
      return borders;
    },
    getUser: function()
    {
      let users = [];
      for(let i=0; i <= 100 ; i++){
        users.push(
          {
            code:'0000'+Math.round(Math.random() * 50),
            name:"東経太郎00"+i,
            active:false
          }
        );
      }
      return users;
    },
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
          if( i >= lastdate+2 ){
            clm.width = 80;
          }else
          if(i >= 2 ){ 
            clm.width = 30;
          }else{
            clm.width = 160;
          }
          flexGrid.columns.push(clm);
          i++;
      }
      while (flexGrid.rows.length < 19) {
          flexGrid.rows.push(new wjGrid.Row());
      }

      // configure the grid
      flexGrid.mergeManager = new CustomMergeManager();
      flexGrid.rowHeaders.columns[0].width = 30;
      flexGrid.rows.defaultSize = 35;
      flexGrid.alternatingRowStep = 1;
      
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
      setData( flexGrid.cells, 0, ["変動情報","利用日","利用日","1"] );
      setData( flexGrid.cells, 1, ["変動情報","入退院・外泊"," "] );
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
            cell.innerHTML = day+'<div>'+week[w]+'</div>';
          }
        }
        cell.style.fontSize = "11px";
         if(c == 1 && r == 1){
            cell.innerHTML = "<a >期間追加</a>";
         }
         if(c == 2 && r == 3){
            cell.innerHTML = "<a href='#'>〇</a>";
         }
      };
      flexGrid.hostElement.addEventListener('click', function (e) {
       // if (e.target.tagName == 'BUTTON' && wjCore.closest(e.target, '.wj-cell')) {
          var ht = flexGrid.hitTest(e);
          console.log(ht.target.innerText);
          //alert(wjCore.format('{row}行{col}列のセルがクリックされました', ht));
          if(ht.target.innerText == "期間追加"){
            displayModal();
          }
       // }
      });
    },

    onTextChanged: function(s){
        console.log(s.text);
    },

    onselectedIndexChanged: function(s){
        console.log(s.selectedIndex);
    },
  }
}

function displayModal(){
  var elem = document.getElementById("modalArea");
  elem.classList.add('display');
  return true;
}

function setData(p, r, cells) {
    if (p.cellType == wjGrid.CellType.Cell) {
      p.grid.rowHeaders.setCellData(r, 0, cells[0]);
    }

    for (var i = 1; i < cells.length; i++) {
      p.setCellData(r, i - 1, cells[i], true,true);
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
#theGridTallRows{
  position:relative;
}
#theGridTallRows.wj-flexgrid .wj-cell{
    padding: 8px;
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

.borderPlace{
  height:2px;
  position:absolute;
  top:0;
  left:0;
  z-index:10;
  
}



#modalArea {
  display: none;
  position: fixed;
  z-index: 10; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.display{
    display: block;
    animation-name: fade-in;
    animation-duration: .7s;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.modalBg {
  width: 100%;
  height: 100%;
  background-color: rgba(30,30,30,0.1);

}

.modalWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  width: 70%;
  max-width: 500px;
  padding: 10px 30px;
  background-color: #fff;
  border:1px solid #ccc;
}

.closeModal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}

</style>
