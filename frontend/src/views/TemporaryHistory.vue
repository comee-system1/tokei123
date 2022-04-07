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
        <v-col cols="2">
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
          <v-btn x-small outlined v-for="n of alphabet" :key="n" :width=10>{{n}}</v-btn>
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
        <v-col cols="10" >
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
          <div v-for="n in borders" :key=n.id>
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
import customMerge from "@/utiles/customMerge";

//一覧左側のタイトルセルの数
let cell = 2;
//1日分の幅
let oneday = 30;
//グラフはじめのスタート位置
let startPos = 470;
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
      borders:this.getBorder(),
      lines:this.getLine()
    }
  },
  created()
  {
    moment.locale("ja");
  },
  methods: {

    getBorder: function()
    {
      let borders = [];
      borders.push({
        id:1,
        start_day:"2020-04-01",
        end_day:"2020-04-10",
        top:90,
        color:'red'
      });
      borders.push({
        id:2,
        start_day:"2020-04-09",
        end_day:"2020-04-13",
        top:165,
        color:'red'
      });
      borders.push({
        id:3,
        start_day:"2020-04-21",
        end_day:"2020-04-30",
        top:270,
        color:'aqua'
      });
      borders.push({
        id:4,
        start_day:"2020-04-20",
        end_day:"2020-04-23",
        top:165,
        color:'green'
      });
      
      let editborders = this.borderConvert(borders);
      //console.log(editborders);
      return editborders;
    },
    borderConvert: function(data)
    {
      var converts;
      converts = [];
      data.forEach(function(conv){
        //日付の差分
        var m1 = moment(conv.end_day);
        var m2 = moment(conv.start_day);
        converts.push({
          id:conv.id,
          width:(oneday*m1.diff(m2, 'days'))+oneday,
          left:startPos+(oneday*(m2.date()-1)),
          top:conv.top,
          color:conv.color
        });
      })

      return converts;
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
    getLine:function ()
    {
      let lines = {};
      lines = [
        {row:'変動情報', items1:'利用日', items2:'利用日', 
        day1:'', 
        day2:'', 
        day3:'〇', 
        day4:'〇', 
        day5:'〇', 
        day6:'〇', 
        day7:'〇', 
        day8:'〇', 
        day9:'〇', 
        day10:'〇', 
        day11:'', 
        day12:'', 
        day13:'', 
        day14:'', 
        day15:'', 
        day16:'', 
        day17:'', 
        day18:'', 
        day19:'', 
        day20:'', 
        day21:'', 
        day22:'', 
        day23:'', 
        day24:'〇', 
        day25:'〇', 
        day26:'〇', 
        day27:'〇', 
        day28:'〇', 
        day29:'〇', 
        day30:'〇', 
        total:'12', 
        money:'1000', 
        },
        {row:'変動情報', items1:'入退院・外泊', items2:' ' },
        {row:'変動情報', items1:'食事', items2:'朝食' },
        {row:'変動情報', items1:'食事', items2:'昼食' },
        {row:'変動情報', items1:'食事', items2:'夕食' },
        {row:'変動情報', items1:'光熱水費', items2:'光熱水費' },
        {row:'個別加算', items1:'test', items2:'test' },
        {row:'個別加算', items1:'入院外泊加算Ⅰ', items2:'入院外泊加算Ⅰ' },
        {row:'個別加算', items1:'入院外泊加算Ⅱ', items2:'入院外泊加算Ⅱ' },
        {row:'個別加算', items1:'栄養マネジメント加算', items2:'栄養マネジメント加算' },
        {row:'個別加算', items1:'療養食加算', items2:'療養食加算' },
        {row:'個別加算', items1:' ', items2:' ' },
        {row:'受給者証情報', items1:'援護者', items2:'東経市' },
        {row:'受給者証情報', items1:'援護者', items2:'西経市' },
        {row:'受給者証情報', items1:'障害種別', items2:'知的' },
        {row:'受給者証情報', items1:'障害支援区分', items2:'区分4' },
        {row:'受給者証情報', items1:'決定支給量', items2:' ' },
        {row:'受給者証情報', items1:'負担上限月額', items2:'9300' },
        {row:'受給者証情報', items1:'上限管理事業所', items2:'ひまわり園' },
        {row:'受給者証情報', items1:'特別給付費', items2:'500' },
      ];

      // lines.push({row:'変動情報', items1:'利用日', items2:'利用日', day1:'〇' });
      // lines.push({row:'変動情報', items1:'入退院・外泊', items2:' ' });
      // lines.push({row:'変動情報', items1:'食事', items2:'朝食' });
      // lines.push({row:'変動情報', items1:'食事', items2:'昼食' });
      // lines.push({row:'変動情報', items1:'食事', items2:'夕食' });
      // lines.push({row:'変動情報', items1:'光熱水費', items2:'光熱水費' });
      // lines.push({row:'個別加算', items1:'test', items2:'test' });
      // lines.push({row:'個別加算', items1:'入院外泊加算Ⅰ', items2:'入院外泊加算Ⅰ' });
      // lines.push({row:'個別加算', items1:'入院外泊加算Ⅱ', items2:'入院外泊加算Ⅱ' });
      // lines.push({row:'個別加算', items1:'栄養マネジメント加算', items2:'栄養マネジメント加算' });
      // lines.push({row:'個別加算', items1:'療養食加算', items2:'療養食加算' });
      // lines.push({row:'個別加算', items1:' ', items2:' ' });
      // lines.push({row:'受給者証情報', items1:'援護者', items2:'東経市' });
      // lines.push({row:'受給者証情報', items1:'援護者', items2:'西経市' });
      // lines.push({row:'受給者証情報', items1:'障害種別', items2:'知的' });
      // lines.push({row:'受給者証情報', items1:'障害支援区分', items2:'区分4' });
      // lines.push({row:'受給者証情報', items1:'決定支給量', items2:' ' });
      // lines.push({row:'受給者証情報', items1:'負担上限月額', items2:'9300' });
      // lines.push({row:'受給者証情報', items1:'上限管理事業所', items2:'ひまわり園' });
      // lines.push({row:'受給者証情報', items1:'特別給付費', items2:'500' });

      return lines;
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
          if( i >= lastdate + cell ){
            clm.width = "*";
          }else
          if(i >= cell ){ 
            clm.width = 30;
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
      flexGrid.mergeManager = new customMerge();
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
      let headNum = 0;
      let num = 0;
      setData( flexGrid.columnHeaders, headNum, headerColum );
      this.lines.forEach(function(data){
        console.log(data);
        setData( flexGrid.cells, num++, [
          data.row,
          data.items1,
          data.items2,
          data.day1,
          data.day2,
          data.day3,
          data.day4,
          data.day5,
          data.day6,
          data.day7,
          data.day8,
          data.day9,
          data.day10,
          data.day11,
          data.day12,
          data.day13,
          data.day14,
          data.day15,
          data.day16,
          data.day17,
          data.day18,
          data.day19,
          data.day20,
          data.day21,
          data.day22,
          data.day23,
          data.day24,
          data.day25,
          data.day26,
          data.day27,
          data.day28,
          data.day29,
          data.day30,
          ] );
      });


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

      flexGrid.scrollPositionChanged.addHandler((s, e) => {
console.log(s);
console.log(e);
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
      p.setCellData(r, i - 1, cells[i]);
    }
}

function leftCell(s, e) {
    if (e.cell.children.length == 0) {
        let align = "left";
        let unit = "";
        let str = e.cell.innerHTML;
        if(e.cell.innerText.length > 0 && !isNaN(e.cell.innerText) ){
          align = "right";
          unit = " 円";
          str = Number(e.cell.innerText).toLocaleString();
        }

        e.cell.innerHTML = "<div>" + str + unit +"</div>";
        wjCore.setCss(e.cell, {
            display: "table",
            tableLayout: "fixed",
        });
        wjCore.setCss(e.cell.children[0], {
            display: "table-cell",
            textAlign: align,
            verticalAlign: "middle",
        });
    }
}

</script>

<style lang="scss" scope>
//共通cssに移動全体のサイズ
#app{
  width:1920px;
  margin:0 auto;
}


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



//チャート用のcssに移動
.borderPlace{
  height:2px;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  
}


//モーダル用のcssに移動
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
