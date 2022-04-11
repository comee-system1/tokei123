<template>
  <v-container fluid id="main">
    <v-container  fluid>
        <v-row dense >
          <v-col sm="9">
            <v-row>
              <v-col col=12 class="d-flex flex-row " >
                <div class="pa-2">サービス</div>
                <wj-combo-box :textChanged="onTextChanged" text="11210000 障碍者支援 ひまわり" style="width:300px;" ></wj-combo-box>
                <wj-combo-box :items-source="search" ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row>
              <v-col col=12 class="d-flex flex-row ">
                <div class="pa-2">提供月</div>
                <input type="month" name="example" :value="year+'-'+month" v-on:change="calenderChange" >
              </v-col>
            </v-row>
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
                <v-btn small color="secondary" dark outlined @click="sortUser(2)">カナ順</v-btn>
                <v-btn small color="secondary" dark outlined @click="sortUser(3)">受給者番号順</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <div class="mt-1">
            <v-btn-toggle class="flex-wrap" >
              <v-btn x-small outlined v-for="(n, k) in alphabet" :key="n" :width=5 p-0 style="min-width:auto;" @click="onAlphabet(k)" >{{n}}</v-btn>
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
            :allowDragging=false
            :allowResizing=false
            :allowSorting=false
            >
            <wj-flex-grid-column header="コード" binding="code" width="2*" :wordWrap=true :allowResizing=false :isReadOnly=true ></wj-flex-grid-column>
            <wj-flex-grid-column header="利用者名" binding="name" width="3*" :wordWrap=true :allowResizing=false :isReadOnly=true ></wj-flex-grid-column>
            <wj-flex-grid-column header="印刷" binding="active" width="1*" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>

          </wj-flex-grid>
          
          <wj-combo-box :itemsSource="selects" :isDroppedDown="isDroppedDown" :isRequired="false" :selectedIndex=-1 :selectedIndexChanged="onselectedIndexChanged" ></wj-combo-box>
        </v-col>
        <v-col cols="10" >
          <v-container
              class="d-flex"
              fluid
              pa-0
            >

            <span
              class="pa-2"
              >利用者
            </span>
            <v-col
              class="pa-2"
              cols=1
              ><span id="selectUserText" ></span>
            </v-col>
            <v-col
              class="pa-2"
              cols=1 
              >
              <v-btn x-small><span class="wj-glyph-left"></span></v-btn>&nbsp;
              <v-btn x-small><span class="wj-glyph-right"></span></v-btn>
            </v-col>
            <span
              class="pa-2"
              >受給者証番号
            </span>
            <v-col
              class="pa-2"
              cols=1
              ><span id="selectUserExamNumber" ></span>
            </v-col>
            <v-col
              class="pa-2"
              cols=6
              ><small>最終編集者: R03.08.08 12:36 (担当者：大正雅夫)</small>
            </v-col>

          </v-container>
          <v-container
            mt-0
            pt-0
            class="d-flex justify-end "
            fluid>
            <div class="mt-1"><v-img src="../assets/tyusyaku_01.png"></v-img></div>
            <div class="ml-2"><small>:編集可能</small></div>
            
            <div class="ml-5 mt-1"><v-img src="../assets/tyusyaku_02.png"></v-img></div>
            <div class="ml-2"><small>:入退院</small></div>
            
            <div class="ml-5 mt-1"><v-img src="../assets/tyusyaku_03.png"></v-img></div>
            <div class="ml-2"><small>:外泊</small></div>
            
            <div class="ml-5 editIcon"></div>
            <div class="ml-2"><small>:手修正済み</small></div>
            

          </v-container>


          <wj-flex-grid
            id="theGridTallRows"
            :itemsSource="infoData"
            :initialized="onInitializedInfo"
            :headersVisibility="'Column'"
            :isReadOnly=true
            :allowDragging=false
            :allowResizing=false
            :deferResizing=false
            :allowSorting=false
          >
            <wj-flex-grid-column header=" " binding="space" :width="30" :wordWrap=true></wj-flex-grid-column>
            <wj-flex-grid-column header="項目" binding="item" :width="300" :wordWrap=true :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column v-for="d in daycount" :key="d" :width="35" :header="year+'/'+month+'/'+d" :binding="'day'+d" :wordWrap=true :allowResizing=false :isReadOnly=true ></wj-flex-grid-column>
            <wj-flex-grid-column header="合計" binding="totals" width="*" :wordWrap=true ></wj-flex-grid-column>
            <wj-flex-grid-column header="金額" binding="money" width="*" :wordWrap=true ></wj-flex-grid-column>

            <div v-for="n in borders" :key="n.key">
              <div class="borderPlace" v-bind:style="{width:n.width+'px',left:n.left+'px',top:n.top+'px',backgroundColor:n.color}">
                
                <div class="borderPlace--left" v-bind:style="{'border-color':'transparent '+n.color+' transparent  transparent'}"></div>
                <div class="borderPlace--right" v-bind:style="{'border-color':'transparent  transparent  transparent '+n.color}"></div>
              </div>
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

//1日分の幅
let oneday = 35;
//グラフはじめのスタート位置
let startPos = 330;
//ユーザーデータ
let userDataAll = [];
let userDataSelect = [];
let userCount = 0;
let textSearch = "";
let sortSearch = "";
let alphaSearch = "";
let checkAll = "";


//どこかに共通配列として定義する
const define_first = [];
const define_second = [];
const define_third = [];
const define_four = [];
define_first[1] = "変動情報";
define_first[2] = "個別加算";
define_first[3] = "受給者証情報";
define_second[1] = {
  name: "利用日",
}; 
define_second[2] = {
  name: "入退院・外泊",
  sub: "期間追加"
}; 
define_second[3] = {
  name: "食事",
  sub: "朝食"
}; 
define_second[4] = {
  name: "食事",
  sub: "昼食"
}; 
define_second[5] = {
  name: "食事",
  sub: "夕食"
}; 
define_second[6] = {
  name: "光熱水費",
}; 
define_third[1] = {
  name: "入院外泊時加算Ⅰ",
  editicon: 1
}; 
define_third[2] = {
  name: "入院外泊時加算Ⅱ",
  editicon: 1
}; 
define_third[3] = {
  name: "栄養マネジメント加算",
  editicon: 1
}; 
define_third[4] = {
  name: "療養食加算",
  editicon: 1
}; 
define_third[5] = {
  name: "加算追加",
}; 
define_four[1] = {
  name: "援護者",
  sub: "東経市"
}; 
define_four[2] = {
  name: "援護者2",
  sub: "西経市"
}; 
define_four[3] = {
  name: "障害種別",
  sub: "知的"
}; 
define_four[4] = {
  name: "障害支援区分",
  sub: "区分4"
}; 
define_four[5] = {
  name: "決定支給量",
}; 
define_four[6] = {
  name: "負担上限月額",
  money: 9300
}; 
define_four[7] = {
  name: "上限管理事務所",
  sub: "ひまわり園"
}; 
define_four[8] = {
  name: "特別給付費",
  money: 500
}; 

let define_week = ['日', '月', '火', '水', '木', '金', '土' ];


let year = moment().year();
let month = moment().format('MM');
export default{
  data(){
    return{
      year: year,
      month: month,
      daycount:0,
      search:[ '32:施設入所支援' ],
      addSelect:[ '入所時特別支援加算' ],
      member:[ '全員' ],
      week:define_week,
      alphabet:['全', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ' ],
      selects:['印刷を全選択', '印刷を全解除' ],
      isDroppedDown: false,
      borders:this.getBorder(),
      ja:ja,
      usersData:this.createUser(),
      infoData:this.createInfo(),
    }
  },
  components : {
    Datepicker
  },
  created()
  {
    moment.locale("ja");
    this.daycount = moment().daysInMonth();
  },

  methods: {

    calenderChange: function(e)
    {
      let split = e.target.value.split('-');
      this.year = split[0];
      this.month = split[1];
      let m = moment(this.year+"-"+this.month+"-01");
      this.daycount = m.daysInMonth();

      this.createInfo();
      this.getBorder();
    },
    getBorder: function()
    {

      if(this.year) year = this.year;
      if(this.month) month = this.month;
      let borderdata = [];

      borderdata.push({
        key:1,
        year: 2022,
        month:4,
        start_day:"2022-04-05",
        end_day:"2022-04-22",
        top:160,
        color:'red'
      });

      borderdata.push({
        key:2,
        year: 2022,
        month:4,
        start_day:"2022-04-28",
        end_day:"2022-04-30",
        top:160,
        color:'green'
      });

      let border = [];
      borderdata.forEach(function(value){
        if(year == value.year && month == value.month){
          border.push({
            key:value.key,
            year:value.year,
            month:value.month,
            start_day:value.start_day,
            end_day:value.end_day,
            top:value.top,
            color:value.color,
          });
        }
      });

      let converts = [];
      border.forEach(function(conv){
        //日付の差分
        let m1 = moment(conv.end_day);
        let m2 = moment(conv.start_day);
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

      this.borders = converts;

      return converts;
    },
    createInfo: function(){
      //1:〇
      //2:赤〇
      //3:赤×
      if(this.year) year = this.year;
      if(this.month) month = this.month;
      let userInfo = [];
      userInfo.push({
        uniqkey:1,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[1],
        item:define_second[1].name,
        day3:"1",
        day4:"1",
        day5:"1",
        day22:"1",
        day23:"1",
        day24:"1",
        day25:"1",
        totals:"12",
        money:"2,700円",
      });
      userInfo.push({
        uniqkey:2,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[1],
        item:define_second[2].name,
      });
      userInfo.push({
        uniqkey:3,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[1],
        item:define_second[3].name+"_"+define_second[3].sub,
        day3:"2",
        day4:"2",
        day5:"2",
        day22:"3",
        day23:"2",
        day24:"2",
        day25:"2",
      });
      userInfo.push({
        uniqkey:4,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[1],
        item:define_second[4].name+"_"+define_second[4].sub,
        day3:"2",
        day4:"2",
        day5:"2",
        day22:"3",
        day23:"2",
        day24:"2",
        day25:"2",
      });
      userInfo.push({
        uniqkey:5,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[1],
        item:define_second[5].name+"_"+define_second[5].sub,
      });
      userInfo.push({
        uniqkey:6,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[1],
        item:define_second[6].name,
      });
      userInfo.push({
        uniqkey:7,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[2],
        item:define_third[1].name,
        editicon:define_third[1].editicon,
        day6:"2",
        day7:"2",
        day8:"2",
        day9:"2",
        day10:"2",
        day11:"2",
      });
      userInfo.push({
        uniqkey:8,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[2],
        item:define_third[2].name,
        editicon:define_third[4].editicon,
        day12:"2",
        day13:"2",
        day14:"2",
        day15:"2",
        day16:"2",
        day17:"2",
      });
      userInfo.push({
        uniqkey:9,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[2],
        item:define_third[3].name,
        editicon:define_third[4].editicon,
      });
      userInfo.push({
        uniqkey:10,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[2],
        item:define_third[4].name,
        editicon:define_third[4].editicon,
      });
      userInfo.push({
        uniqkey:11,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[2],
        item:define_third[5].name,
      });
      userInfo.push({
        uniqkey:12,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[1].name,
        sub:define_four[1].sub,
      });
      userInfo.push({
        uniqkey:13,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[2].name,
        sub:define_four[2].sub,
      });
      userInfo.push({
        uniqkey:14,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[3].name,
        sub:define_four[3].sub,
      });
      userInfo.push({
        uniqkey:15,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[4].name,
        sub:define_four[4].sub,
      });
      userInfo.push({
        uniqkey:16,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[5].name,
      });
      userInfo.push({
        uniqkey:17,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[6].name,
        money:define_four[6].moeny,
      });
      userInfo.push({
        uniqkey:18,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[7].name,
        sub:define_four[7].moeny,
      });
      userInfo.push({
        uniqkey:19,
        year: 2022,
        month: 4,
        usercode:1,
        space:define_first[3],
        item:define_four[8].name,
        money:define_four[8].moeny,
      });

      userInfo.push({
        uniqkey:20,
        year: 2022,
        month: 5,
        usercode:1,
        space:define_first[1],
        item:define_second[1].name,
        day6:"1",
        day8:"1",
        day9:"1",
        day24:"1",
        day26:"1",
        day29:"1",
        day30:"1",
      });


      let returns = [];

      userInfo.forEach(function(element){
        if(element.year == year && element.month == month){
          returns.push({
            uniqkey: element.uniqkey,
            year: element.year,
            month: element.month,
            usercode: element.usercode,
            space: element.space,
            item: element.item,
            money: element.money,
            totals: element.totals,
            day1:element.day1,
            day2:element.day2,
            day3:element.day3,
            day4:element.day4,
            day5:element.day5,
            day6:element.day6,
            day7:element.day7,
            day8:element.day8,
            day9:element.day9,
            day10:element.day10,
            day11:element.day11,
            day12:element.day12,
            day13:element.day13,
            day14:element.day14,
            day15:element.day15,
            day16:element.day16,
            day17:element.day17,
            day18:element.day18,
            day19:element.day19,
            day20:element.day20,
            day21:element.day21,
            day22:element.day22,
            day23:element.day23,
            day24:element.day24,
            day25:element.day25,
            day26:element.day26,
            day27:element.day27,
            day28:element.day28,
            day29:element.day29,
            day30:element.day30,
            day31:element.day31,
          });
        }
      });

      this.infoData = returns;
      return this.infoData;
    },
    createUser: function(){
      let usersData = [];
      userCount = 100;
      for(let i = 0; i < userCount ; i++){        
        usersData.push({
          id:i,
          code:"100"+i,
          examNumber:"000"+Math.floor(Math.random() * 10) + 1,
          name:"東経太郎 "+Math.floor(Math.random() * 10) + 1,
          kana:"トウジョウタロウ"+Math.floor(Math.random() * 10) + 1,
          active:false
        });
        
      }
      userDataAll = usersData;
      this.userFilter();
      userDataSelect = userDataAll;
      return this.usersData;
    },
    onTextChangedUser: function(s){
        textSearch = s.text;
        this.userFilter();
    },
    sortUser: function(sortType)
    {
      sortSearch = sortType;
      this.userFilter();
    },
    onAlphabet: function(key)
    {
      alphaSearch = key;
      this.userFilter();
    },
    onselectedIndexChanged: function(s){
        checkAll = s.selectedIndex;
        this.userFilter();
    },
    userFilter(){
      let data = [];
      userDataAll.forEach(function(value){
        if(checkAll == "0") value.active = true;
        if(checkAll == "1") value.active = false;
        if(value.name.indexOf(textSearch) != -1 ){
          data.push({
            id:value.id,
            code:value.code,
            examNumber:value.examNumber,
            name:value.name,
            kana:value.kana,
            active:value.active
          });
        }
      });
      if(alphaSearch > 0 ){
        let get = [];
        data.forEach(function(value){
          switch(alphaSearch){
            case 1:
              if(value.kana.match(/^[ア-オ]/)) setPush(get,value);
            break;
            case 2:
              if(value.kana.match(/^[カ-コ]/)) setPush(get,value);
            break;
            case 3:
              if(value.kana.match(/^[サ-ソ]/)) setPush(get,value);
            break;
            case 4:
              if(value.kana.match(/^[タ-ト]/)) setPush(get,value);
            break;
            case 5:
              if(value.kana.match(/^[ナ-ノ]/)) setPush(get,value);
            break;
            case 6:
              if(value.kana.match(/^[ハ-ホ]/)) setPush(get,value);
            break;
            case 7:
              if(value.kana.match(/^[マ-モ]/)) setPush(get,value);
            break;
            case 8:
              if(value.kana.match(/^[ヤ-ヨ]/)) setPush(get,value);
            break;
            case 9:
              if(value.kana.match(/^[ラ-ロ]/)) setPush(get,value);
            break;
            case 10:
              if(value.kana.match(/^[ワ-ン]/)) setPush(get,value);
            break;
          }
        });
        data = get;
      }

      //コード順でソート
      if(sortSearch == 1 ){
        data.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });
      }
      //利用者名でソート
      if(sortSearch == 2 ){
        data.sort((a, b) => {
            if (a.kana < b.kana) return -1;
            if (a.kana > b.kana) return 1;
            return 0;
        });
      }
      //受験者番号でソート
      if(sortSearch == 3 ){
        data.sort((a, b) => {
            if (a.examNumber < b.examNumber) return -1;
            if (a.examNumber > b.examNumber) return 1;
            return 0;
        });
      }
      userDataSelect = data;
      this.usersData = data;
    },
    onInitializedUser:function (flexGrid)
    { 
      
      let i = 0;
      while (flexGrid.columns.length < 3) {
        let clm = new wjGrid.Column();
        if(i == 0) clm.width = "2*";
        if(i == 1) clm.width = "2*";
        if(i == 2) clm.width = "1*";
        flexGrid.columns.push(clm);
        i++;
      }
      while (flexGrid.rows.length < userCount) {
        flexGrid.rows.push(new wjGrid.Row());
      }
      flexGrid.formatItem.addHandler(userCell);
      // configure the grid
      flexGrid.mergeManager = new customMergeUser();
      flexGrid.alternatingRowStep = 1;

      let string = "";
      flexGrid.hostElement.addEventListener("click", function (e) {
        var ht = flexGrid.hitTest(e);
        console.log(ht.target.innerText);


        ht = flexGrid.hitTest(e.pageX, e.pageY);
        //選択した要素の取得
        let row = ht._row;
        console.log(row);
        console.log(userDataSelect[row].name);
        string = userDataSelect[row].name;
        console.log(string);
      //  selectUserText = string;
        document.querySelector("#selectUserText").innerText = string;

      });

    },

    onInitializedInfo:function (flexGrid)
    {
      flexGrid.mergeManager = new customMerge();
      flexGrid.rowHeaders.columns[0].width = 30;
      flexGrid.formatItem.addHandler(cellEdit);

      flexGrid.hostElement.addEventListener("click", function (e) {
        var ht = flexGrid.hitTest(e);
        if(ht.target.innerText == "期間追加"){
          displayModal(1);
        }
        if(ht.target.innerText == "加算追加"){
          displayModal(2);
        }
        //個別加算編集アイコン
        if(ht.target.innerText == "editicon"){
          displayModal(1);
        }
        //赤丸
        if(ht.target.innerText == "maru_edit"){
          e.target.innerText = "dddddd";
         // const target = document.getElementsByClassName('maru_edit');
       //   target[0].style.display = "none";	
        }
      });
    },

    onTextChanged: function(s){
        console.log(s.text);
    },
    onSelectUser: function()
    {
      alert("33");
    }
  }
}


function displayModal(type)
{
  var elem = "";
  if(type == 1){
    //変動情報登録
    elem = document.getElementById("modalArea1");
  }else{
    //加算情報
    elem = document.getElementById("modalArea2");
  }
  
  elem.classList.add('display');
  return true;
}

//カナアイコンフィルタリング用
function setPush(get,value)
{
  return get.push({
    id:value.id,
    code:value.code,
    examNumber:value.examNumber,
    name:value.name,
    kana:value.kana,
    active:value.active
  });
}

function userCell(s, e)
{
  if (e.cell.children.length == 0) {
    let align = "left";
    let str = e.cell.innerHTML;
    str = "<div>"+str+"</div>";
    e.cell.innerHTML = str.replace(',','');
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

function cellEdit(s, e)
{
  if (e.cell.children.length == 0) {
    let align = "left";
    let str = "";
    if( isDate(e.cell.innerText) ){
      str = dateFormatString(e.cell.innerText);
    }else
    if(e.cell.innerText == "1" ){
      str = "<div class='text-center' style='font-size:1.5em;'>〇</div>";
    }else
    if(e.cell.innerText == "2" ){
      str = "<div class='maru_edit'>maru_edit</div>";
    }else
    if(e.cell.innerText == "3" ){
      str = "<div class='batsu_edit'>batsu_edit</div>";
    }else
    if(e.cell.innerText == define_second[2].name){
      str = "<div class='text-left-float'>"+define_second[2].name+"</div><a class='ml-2 addButton' >"+define_second[2].sub+"</a>";
    }else
    if(e.cell.innerText == define_second[3].name+"_"+define_second[3].sub){
      str = "<div class='text-left-float'>"+define_second[3].name+"</div><div class='text-right-float border-right'><p>"+define_second[3].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_second[4].name+"_"+define_second[4].sub){
      str = "<div class='text-left-float'></div><div class='text-right-float border-right'><p>"+define_second[4].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_second[5].name+"_"+define_second[5].sub){
      str = "<div class='text-left-float'></div><div class='text-right-float border-right'><p>"+define_second[5].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_third[1].name){
      str = "<div class='text-left-float'>"+define_third[1].name+"</div><div class='text-right-float '><a class='editicon'>editicon</a></div>";
    }else
    if(e.cell.innerText == define_third[2].name){
      str = "<div class='text-left-float'>"+define_third[2].name+"</div><div class='text-right-float '><a class='editicon'>editicon</a></div>";
    }else
    if(e.cell.innerText == define_third[3].name){
      str = "<div class='text-left-float'>"+define_third[3].name+"</div><div class='text-right-float '><a class='editicon'>editicon</a></div>";
    }else
    if(e.cell.innerText == define_third[4].name){
      str = "<div class='text-left-float'>"+define_third[4].name+"</div><div class='text-right-float '><a class='editicon'>editicon</a></div>";
    }else
    if(e.cell.innerText == define_third[5].name){
      str = "<div class='text-left-float addButton'>"+define_third[5].name+"</div>";
    }else
    if(e.cell.innerText == define_four[1].name){
      str = "<div class='text-left-float'>"+define_four[1].name+"</div><div class='text-right-float border-right'><p>"+define_four[1].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_four[2].name){
      str = "<div class='text-left-float'></div><div class='text-right-float border-right'><p>"+define_four[2].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_four[3].name){
      str = "<div class='text-left-float'>"+define_four[3].name+"</div><div class='text-right-float border-right'><p>"+define_four[3].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_four[4].name+"_"+define_four[4].sub){
      str = "<div class='text-left-float'>"+define_four[4].name+"</div><div class='text-right-float border-right'><p>"+define_four[4].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_four[6].name){
      str = "<div class='text-left-float'>"+define_four[6].name+"</div><div class='text-right-float border-right'><p>"+define_four[6].money.toLocaleString()+"円</p></div>";
    }else
    if(e.cell.innerText == define_four[7].name){
      str = "<div class='text-left-float'>"+define_four[7].name+"</div><div class='text-right-float border-right'><p>"+define_four[7].sub+"</p></div>";
    }else
    if(e.cell.innerText == define_four[8].name){
      str = "<div class='text-left-float'>"+define_four[8].name+"</div><div class='text-right-float border-right'><p>"+define_four[8].money.toLocaleString()+"円</p></div>";
    }else{
      str = e.cell.innerHTML;
    }

    e.cell.innerHTML = "<div>" + str +"</div>";
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

function dateFormatString(str)
{
  let sp = str.split("/");
  let w = moment(str).day();
  let color = "";
  if(w == 0) color = "red--text";
  if(w == 6) color = "blue--text";
  let string = "<div class='text-center "+color+"''>"+sp[2]+"</div><div class='text-center "+color+"''>"+define_week[w]+"</div>";
  return string;
}

function isDate(strDate)
{
    if(strDate == ""){
        return false;
    }  
    if(!strDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)){
        return false;
    } 
    var date = new Date(strDate);  
    if(date.getFullYear() !=  strDate.split("/")[0] 
        || date.getMonth() != strDate.split("/")[1] - 1 
        || date.getDate() != strDate.split("/")[2]
    ){
        return false;
    }

    return true;
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

span#selectUserExamNumber,
span#selectUserText{
  width:150px;
  display:block;
}

div.editIcon{
  width:50px;
  height:20px;
  background-color:violet;
}

a.editicon {
  width:15px;
  height:15px;
  display:inline-block;
  background-image:url("../assets/tyusyaku_04.png");
  background-repeat: no-repeat;
  text-indent:-9999px;
}
.maru_edit {
  width:21px;
  height:20px;
  background-image:url("../assets/tyusyaku_05.png");
  display:inline-block;
  background-repeat: no-repeat;
  background-size:cover;
  text-indent:-9999px;
}
.batsu_edit {
  width:20px;
  height:21px;
  background-image:url("../assets/tyusyaku_06.png");
  display:inline-block;
  background-repeat: no-repeat;
  background-size:cover;
  text-indent:-9999px;
}

.addButton {
  width:120px;
  background-color:red;
  display:block;
  float:left;
  color:#fff !important;
  text-align: left;
  border-radius: 30px;
  padding:3px 0px 3px 10px;
  cursor:pointer;
  background-image:url("../assets/plus_15px.png");
  background-position: 95% 50%;
}

#theGridTallRows{
  position:relative;
}

#theGridTallRows.wj-flexgrid .wj-cell{
    height: 68px;
}

.wj-rowheaders{
  .wj-row{
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

//チャート用
.borderPlace {
  height:2px;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  &--left{
    content:"";
    width: 0px;
    height: 0px;
    border: 5px solid;
    display:block;
    position:absolute;
    top:-5px;
    left:-7px;
  }
  &--right{
    content:"";
    border:1px solid red;
    width: 0px;
    height: 0px;
    border: 5px solid;
    border-color: transparent  transparent  transparent aqua;
    display:block;
    position:absolute;
    top:-5px;
    right:-7px;
    left:auto;
  }
}
.borderBox {
  padding:2px 30px;
  border:1px solid #333;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  background-color:#fff;
  margin-top:10px;
  background-image:url("../assets/tyusyaku_04.png");
  background-position: 95% 40%;
}

div.text-left-float{
  float:left;
}
div.text-right-float{
  float:right;
}
div.border-right{
  border-left:1px solid #ccc;
  width:150px;
  position:absolute;
  top:0;
  right:0;
  padding-left:20px;
  height:100%;
}
div.border-right p{
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%)
}



</style>
