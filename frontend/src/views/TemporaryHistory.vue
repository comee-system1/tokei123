<template>
  <v-container fluid id="main">
    <v-container  fluid>
        <v-row dense >
          <v-col sm="1">
            <p>サービス</p> 
            <p class="mt-1">提供月</p>
          </v-col>
          <v-col sm="8">
              <v-row>
                <v-col col=1>
                  <wj-combo-box :textChanged="onTextChanged" text="11210000 障碍者支援 ひまわり" style="width:300px;" ></wj-combo-box>
                  <wj-combo-box :items-source="search"></wj-combo-box>
                </v-col>
              </v-row>
            
              <input type="month">

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
            <v-col col=6>
              <wj-combo-box :textChanged="onTextChangedUser" placeholder="カナ検索" ></wj-combo-box>
            </v-col>
          </v-row>
          <v-row p-0>
            <v-col col=12>
              <v-btn-toggle class="mt-2 flex-wrap" >
                <v-btn small color="secondary" dark outlined @click="sortUser(1)">コード順</v-btn>
                <v-btn small color="secondary" dark outlined >カナ順</v-btn>
                <v-btn small color="secondary" dark outlined >受給者番号順</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <div class="mt-1">
            <v-btn-toggle class="flex-wrap" >
              <v-btn x-small outlined v-for="n of alphabet" :key="n" :width=5 p-0 style="min-width:auto;">{{n}}</v-btn>
            </v-btn-toggle>
          </div>
          <wj-flex-grid
            class="mt-1"
            :autoSearch="true"
            :headersVisibility="'Column'"
            :selectionMode=3
            style="height:100vh;"
            :initialized="onInitializedUser"
            :itemsSource="usersData"
            >
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
            <div><wj-combo-box :isReadOnly=true text="1000070 東経 太郎"></wj-combo-box></div>
            <div class="mt-1 ml-1">
            <v-btn x-small><span class="wj-glyph-left"></span></v-btn>&nbsp;
            <v-btn x-small><span class="wj-glyph-right"></span></v-btn>
            </div>
            <div class="ml-3 mt-1 pr-2">受給者証番号</div>
            <div><wj-combo-box :isReadOnly=true text="1000070"></wj-combo-box></div>
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
            <a class="borderBox" v-bind:style="{left:n.left+'px',top:n.top+'px'}" onClick="document.getElementById('modalArea1').classList.add('display')">
            {{n.st}}～{{n.ed}}[{{n.diff}}]
            </a>
          </div>
          </wj-flex-grid>
            
        </v-col>
      </v-row>
    </v-container>
    <v-row id="modalArea1" class="modalArea">
      <div class="modalBg" onClick="document.getElementById('modalArea1').classList.remove('display')"></div>
      <div class="modalWrapper">
        <div class="modalContents">
          <h1>変動情報登録</h1>
          <v-btn-toggle
            mandatory
          >
            <v-btn class="primary">入退院</v-btn>
            <v-btn class="primary">外泊</v-btn>

          </v-btn-toggle>
          <v-row class="mt-1">
            <v-col cols="2">入院日</v-col>
            <v-col cols="10">
              <datepicker :language="ja" class="input_picker" ></datepicker>
              <v-row>
                <v-col cols=4 class="mt-5" >施設の利用</v-col>
                <v-col cols=8>
                <v-radio-group row>
                  <v-radio
                    label="あり"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="なし"
                    value="2"
                  ></v-radio>
                </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="2" class="mt-5">食事</v-col>
            <v-col cols="10">
              <v-row>
                <v-col>
                  <v-checkbox
                    label="朝食"
                    value="1"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    label="昼食"
                    value="2"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    label="夕食"
                    value="2"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="2" class="mt-5">病院名</v-col>
            <v-col cols="10">
              <v-text-field
                label="病院名を入力"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col cols="2">入院日</v-col>
            <v-col cols="10">
              <datepicker :language="ja" class="input_picker" ></datepicker>
              <v-row>
                <v-col cols=4 class="mt-5" >施設の利用</v-col>
                <v-col cols=8>
                <v-radio-group
                  row
                  >
                  <v-radio
                    label="あり"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="なし"
                    value="2"
                  ></v-radio>
                </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="2" class="mt-5">食事</v-col>
            <v-col cols="10">
              <v-row>
                <v-col>
                  <v-checkbox
                    label="朝食"
                    value="1"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    label="昼食"
                    value="2"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col>
                  <v-checkbox
                    label="夕食"
                    value="2"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="3" ><v-btn outlined color="secondary" >クリア</v-btn></v-col>
            <v-col cols="3" ><v-btn outlined color="secondary" >削除</v-btn></v-col>
            <v-col cols="6" class="text-right" ><v-btn color="indigo" >登録</v-btn></v-col>
          </v-row>
        </div>
        <div class="closeModal" onClick="document.getElementById('modalArea1').classList.remove('display')">
          ×
        </div>
      </div>
    </v-row>
    <v-row id="modalArea2" class="modalArea">
      <div class="modalBg" onClick="document.getElementById('modalArea2').classList.remove('display')"></div>
      <div class="modalWrapper">
        <div class="modalContents">
          <h1>個別加算追加登録</h1>
          <wj-combo-box :items-source="addSelect"></wj-combo-box>
        
          <v-row class="mt-1">
            <v-col cols="3">開始日</v-col>
            <v-col cols="9">
              <datepicker :language="ja" class="input_picker" ></datepicker>
            </v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col cols="3">終了日</v-col>
            <v-col cols="9">
              <datepicker :language="ja" class="input_picker" ></datepicker>
            </v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col cols="3">単位数</v-col>
            <v-col cols="9">30単位/日</v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col cols="3">留意事項</v-col>
            <v-col cols="9">
              <ol>
                <li>入所日(算定日)から30日を限度</li>
                <li>同一敷地外の病院に30日以上入院した場合は、再算定可能</li>
                <li>過去3ヶ月間に入所理由がないこと</li>
              </ol>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" ><v-btn outlined color="secondary" >クリア</v-btn></v-col>
            <v-col cols="3" ><v-btn outlined color="secondary" >削除</v-btn></v-col>
            <v-col cols="6" class="text-right" ><v-btn color="indigo"  >登録</v-btn></v-col>
          </v-row>
        </div>
        <div class="closeModal" onClick="document.getElementById('modalArea2').classList.remove('display')">
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
import customMergeUser from "@/utiles/customMergeUser";
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale'

//一覧左側のタイトルセルの数
let cell = 2;
//1日分の幅
let oneday = 30;
//グラフはじめのスタート位置
let startPos = 470;
let userFlexGrid;

export default{
  data(){
    return{
      year:moment().year(),
      month:moment().month()+1,
      search:[ '32:施設入所支援' ],
      addSelect:[ '入所時特別支援加算' ],
      member:[ '全員' ],
      week:['日', '月', '火', '水', '木', '金', '土' ],
      alphabet:['全', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ' ],
      selects:['印刷を全選択', '印刷を全解除' ],
      isDroppedDown: false,
      borders:this.getBorder(),
      lines:this.getLine(),
      ja:ja,
      usersData:this.createUser()
    }
  },
  components : {
    Datepicker
  },
  created()
  {
  //  this.createUser();
    moment.locale("ja");
  },

  methods: {
    sortUser: function(type)
    {
alert(type);
    },
    getBorder: function()
    {
      let borders = [];
      borders.push({
        id:1,
        start_day:"2020-04-05",
        end_day:"2020-04-22",
        top:130,
        color:'red'
      });
      borders.push({
        id:2,
        start_day:"2020-04-27",
        end_day:"2020-04-29",
        top:130,
        color:'green'
      });
      borders.push({
        id:3,
        start_day:"2020-04-03",
        end_day:"2020-04-30",
        top:430,
        color:'blue'
      });
      borders.push({
        id:4,
        start_day:"2020-04-03",
        end_day:"2020-04-30",
        top:480,
        color:'blue'
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
          color:conv.color,
          st:m2.format('M/D'),
          ed:m1.format('M/D'),
          diff:m1.diff(m2, 'days')
        });
      })

      return converts;
    },
    getLine:function ()
    {
      let lines = {};
      lines = [
        {row:'変動情報', items1:'利用日', items2:'利用日' },
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

      return lines;
    },
    createUser: function(loop=10){
      let usersData = [];
      for(let i=0; i < loop ; i++){
        let active;
        if(i % 5 ){
          active = false;
        }else{
          active = true;
        }
        
        usersData.push({
          id:i,
          code:"0000"+i,
          name:"東経太郎 "+i,
          active:active
        });
        
      }
      return usersData;
    },
    onTextChangedUser: function(s){
        console.log(s.text);
        this.userData = this.createUser(5);
        this.onInitializedUser(userFlexGrid);
    },
    onInitializedUser:function (flexGrid)
    {
      console.log(this.usersData);
      userFlexGrid = flexGrid;
      
      let i = 0;
      while (flexGrid.columns.length < 3) {
        let clm = new wjGrid.Column();
        if(i == 0) clm.width = "2*";
        if(i == 1) clm.width = "2*";
        if(i == 2) clm.width = "1*";
        flexGrid.columns.push(clm);
        i++;
      }
      while (flexGrid.rows.length < 10) {
          flexGrid.rows.push(new wjGrid.Row());
      }

      flexGrid.formatItem.addHandler(userCell);
      // configure the grid
      flexGrid.mergeManager = new customMergeUser();

      flexGrid.alternatingRowStep = 1;

      let headerColum = [];
      headerColum.push("");
      headerColum.push("コード");
      headerColum.push("利用者名");
      headerColum.push("印刷");

      let headNum = 0;
      setData( flexGrid.columnHeaders, headNum, headerColum );

      this.usersData.forEach(function(value){
        setData( flexGrid.cells, value.id, [value.id, value.code, value.name, value.active] );
      });

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
      while (flexGrid.rows.length < 20) {
          flexGrid.rows.push(new wjGrid.Row());
      }

      // configure the grid
      flexGrid.mergeManager = new customMerge();
      flexGrid.rowHeaders.columns[0].width = 30;
      flexGrid.rows.defaultSize = 50;
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
        setData( flexGrid.cells, num++, [
          data.row,
          data.items1,
          data.items2,
          data.total
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

        //テストデータのため後程消す
        //実データはgetLine関数でapiから取得したデータから配列の作成を行う
        //getLineデータではhtmlが効かないので、leftCell関数で登録したデータを基に
        //htmlを付加させる処理を実施する
        if(panel.cellType == 1 ){
          
          if(c == 1 && r == 1){
              cell.innerHTML = "<a >期間追加</a>";
          }
          if(c == 0 && r == 11){
              cell.innerHTML = "<a >加算追加</a>";
          }
          
          for(let i = 2; i < lastdate+4 ; i++ ){
            if( r == 0 && ( (c >= 4 && c <= 6) || ( c >= 20 && c <= 31 ) ) ){
                cell.innerHTML = "<div class='text-subtitle-1'>〇</a>";
            }
            if(c == i  && r == 3 ){
              if ( (i >= 4 && i <= 5) || ( i >= 21 && i <= 31 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>〇</div>";
              }
              if ( (i == 6) || ( i == 20 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>×</div>";
              }
            }

            if(c == i  && r == 4 ){
              if ( (i >= 4 && i <= 5) || ( i >= 21 && i <= 31 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>〇</div>";
              }
              if ( (i == 6) || ( i == 20 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>×</div>";
              }
            }

            if(c == i  && r == 5 ){
              if ( (i >= 4 && i <= 5) || ( i >= 21 && i <= 30 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>〇</div>";
              }
              if ( (i == 6) || ( i == 20 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>×</div>";
              }
            }

            if(c == i  && r == 7 ){
              if ( (i >= 6 && i <= 15) || (  i == 27 )  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>〇</div>";
              }
            }
            if(c == i  && r == 10 ){
              if ( (i >= 3 && i <= 5) || (  i >= 27 && i <= 31)  ){
                  cell.innerHTML = "<div class='red--text text-subtitle-1'>〇</div>";
              }
            }

            if( r == 0 && c == 32 ) cell.innerHTML = "12";
            if( r == 1 && c == 32 ) cell.innerHTML = "17";
            if( r == 2 && c == 32 ) cell.innerHTML = "9";
            if( r == 3 && c == 32 ) cell.innerHTML = "8";
            if( r == 4 && c == 32 ) cell.innerHTML = "10";
            if( r == 5 && c == 32 ) cell.innerHTML = "9";

            if( r == 3 && c == 33 ) cell.innerHTML = "2700";
            if( r == 4 && c == 33 ) cell.innerHTML = "3200";
            if( r == 5 && c == 33 ) cell.innerHTML = "1200";


          }
         }
      };
      flexGrid.hostElement.addEventListener('click', function (e) {
       // if (e.target.tagName == 'BUTTON' && wjCore.closest(e.target, '.wj-cell')) {
          var ht = flexGrid.hitTest(e);
          //console.log(ht.target.innerText);
          console.log(ht.target);
          //alert(wjCore.format('{row}行{col}列のセルがクリックされました', ht));
          if(ht.target.innerText == "期間追加"){
            displayModal(1);
          }
          if(ht.target.innerText == "加算追加"){
            displayModal(2);
          }
          if (e.target.classList.contains("red--text")) {
            if(ht.target.innerText == "〇"){
              alert("red");
              e.cell.innerHTML = "sssss";
            }
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

function displayModal(type){
  var elem = "";
  if(type == 1){
    elem = document.getElementById("modalArea1");
  }else{
    elem = document.getElementById("modalArea2");
  }
  
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
      if(e.cell.innerText.length > 2 ) unit = " 円";
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
function userCell(s, e) {
  if (e.cell.children.length == 0) {
    let align = "left";
    let str = e.cell.innerHTML;
    if(e.col == 2){
      if(str == "true") str = "<input type='checkbox' checked>";
      if(str == "false") str = "<input type='checkbox' >";
    }
    e.cell.innerHTML = str;
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
html{
  overflow-x: scroll;
}
#app{
  min-width:1920px;
  margin:0 auto;
}
div#main{
  font-size: 14px;
  font-family: "メイリオ" ;
}

#theGridTallRows{
  position:relative;
}
#theGridTallRows.wj-flexgrid .wj-cell{
    padding: 8px 15px;
    height: 68px;
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


.input_picker {
  div > input {
    border: 1px ridge #333333;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 100%;
  }
}


//チャート用のcssに移動
.borderPlace {
  height:2px;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
}
.borderBox {
  padding:2px 10px;
  border:1px solid #333;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  background-color:#fff;
  margin-top:10px;
}


//モーダル用のcssに移動
#modalArea2, 
#modalArea1 {
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
