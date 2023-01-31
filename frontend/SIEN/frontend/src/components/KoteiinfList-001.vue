<template>
    <v-sheet class="clssheet-chu1" elevation="2">     

      <label class="clsstitle1_Noreki_back" v-show="Label_Visible">
        <label class="clsstitle1_Noreki" >履歴を作成してください</label>
      </label>

        <div class="wrap001">
        <label class="clsstitle1">基本情報</label>
        <v-card class="ml-2" elevation="3">
         <a class="addBtn_kotei" @click="onHeadclick_ins">新規作成</a>
        </v-card>
        </div>
        
      <label class="clsstitle1_tyosa mt-3" id ="Ymd">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

        <v-btn 
          :disabled="Label_Visible == true"
          id="tyosa_ymd"
          class="btnymd_kotei ml-1"
          @click="inputCalendarClick(1)"
          tile
          width="150px"
          height="30px"
          >{{ this.pmymd}}
          <div class="float-right">
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-btn>    

        <!-- 年月日ダイアログ -->
        <v-dialog
          v-model="datepicker_dialog_tyosa"
          width="300"
          class="datepicker_dialogs"
        >
        <v-date-picker
            id="Datepicker_head"
            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_tyosa"
          >
          </v-date-picker>
        </v-dialog>


        <div class="area002" >
          <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-copy-id" class="clsbtnmenu-copy" @click="onClickCopy">
            前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-reki-id" class="clsbtnmenu-reki" @click="onClickReki">
            履歴参照
        </v-btn>
        </div>
        <br>
        <div class="area003" >
        <label class="clsstitle4">氏  名</label>
        <label class="clslbl1 h4" id ="lblRiyonm" ></label>
        <label class="clsstitle5">生年月日</label>
        <label class="clslbl2" id ="lblBirth"></label>
        <label class="clsstitle6">年  齢</label>
        <label class="clslbl3" id ="lblAge"></label>
        <label class="clsstitle7" >性  別</label>
        <label class="clslbl4" id ="lblSex"></label>
        </div>
        <div class="area004" >
        <label class="clsstitle10">住  所</label>
        <label class="clslbl10" id = "lbladress"></label>
        <div>
            <div class="area004-1" >
            <label class="clsstitle11">電話①</label>
            <label class="clslbl11" id = "tel1"></label>
            </div>
            <br>
            <div class="area004-2" >
            <label class="clsstitle12">電話②</label>
            <label class="clslbl12" id = "tel2"></label>
            </div>
        </div>
        </div>
        <div class="area005" >
        <label class="clsstitle20">ﾒｰﾙｱﾄﾞﾚｽ</label>
        <input type="text" id="clslbl20_id" class="clslbl20" v-model="dispMail" style = "ime-mode:active;" @input="text_input(0)" @click="click_text"/>
        <label class="clsstitle21">携帯番号</label>
        <input type="text" id="clslbl21_id" class="clslbl21" v-model="dispPhoneNo"  style = "ime-mode: inactive;" @input="text_input(1)" @click="click_text"/>
        </div>
        <div class="area006" >
        <label class="clsstitle30">携帯ﾒｰﾙ</label>
        <input type="text" id="clslbl30_id" class="clslbl30" v-model="dispKMail" style = "ime-mode: inactive;" @input="text_input(2)" @click="click_text"/>
        <label class="clsstitle31">FAX番号</label>
        <input type="text" id="clslbl31_id" class="clslbl31" v-model="dispFaxNo" style = "ime-mode: inactive;" @input="text_input(3)" @click="click_text"/>
        </div>
        <br>
        <hr class="hr_style01">
        <div class="area007" >
        <label class="clsstitle40">障害区分</label>
          <div class="area007-1" >

            <input type="text" class="clslbl40" v-model="dispSkbn1" @click="onTxtSyogai_Click(1)" readonly/>
            <input type="text" class="clslbl41" v-model="dispSkbn2" @click="onTxtSyogai_Click(2)" readonly/>
            <input type="text" class="clslbl42" v-model="dispSkbn3" @click="onTxtSyogai_Click(3)" readonly/>
            
          </div>
          <div class="area007-2" >
              <input class="chk40" type="checkbox" name ="Nm_chk40" id="Id_chk40" @click="check_click(0)">
              <label class="clslbl43" for="scalses1" id="Id_chk40_text">集計対象</label>
              <input class="chk41" type="checkbox" name ="Nm_chk41" id="Id_chk41" @click="check_click(1)">
              <label class="clslbl44" for="scalses2" id="Id_chk41_text">集計対象</label>
              <input class="chk42" type="checkbox" name ="Nm_chk42" id="Id_chk42" @click="check_click(2)">
              <label class="clslbl45" for="scalses3" id="Id_chk42_text">集計対象</label>
          </div>
          <div v-show="Grid_Visible" class="area007-3" >
            <wj-flex-grid
              id="GridMst_id"
              class="GridMst"
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
              :initialized="onInitializeIcrnGrid_Mst"
              :itemsSourceChanged="onItemsSourceChanged_Mst"
              :itemsSource="MstList"
              >
              <!--列-->
              <wj-flex-grid-column header="" binding="name" :width="170" :wordWrap=true :allowResizing=false id="MstGrid_col1"></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="id" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="value" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            </wj-flex-grid>
          </div>

        </div>
        <br>
        <div class="area008" >
        <label class="clsstitle50">世帯の状況</label>
          <input type="text" class="clslbl50" v-model = "dispSetai" @click="onTxtSetai_Click" readonly/>        
        </div>
        <br>
        <div class="area009" >
        <label class="clsstitle60">本人の状況</label>        
        <input type="text" class="clslbl60" v-model = "dispHonnin" @click="onTxtHonnin_Click" readonly/>
        </div>
        <br>
        <div class="area010" >
        <label class="clsstitle70">特記事項</label>
        <textarea id = "textarea" class="clslbl70" 
          v-model = "dispTok" 
          @click="click_text"
          @input="initTextarea"
          style = "ime-mode: active;"
          no-resize
          rows="4"
          >
        </textarea>
        </div>
        <br>
        <div class="area011" >
        <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-clr-id" class="clsbtnmenu-clr" @click="onClickclr">
            クリア
        </v-btn>
        <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-del-id" class="clsbtnmenu-del" @click="onClickdel">
            削  除
        </v-btn>
        <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-ins-id" class="clsbtnmenu-ins" @click="onClickIns">
            登  録
        </v-btn>
        </div>
        <br>

       <!-- ヘッダダイアログエリア --> 
       <v-dialog  v-model="InsWinhead" width="255">
          <v-sheet class="clssheet-head" elevation="2" 
            id ="head_win_id"
            @mousedown="win_drag($event)"
            @mousemove="win_move($event)"
            @mouseup="win_up($event)">
          <div >
            

            <div class="areahead">
              <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
              <v-btn
                  margin-left=1px
                  elevation="2"
                  icon
                  small
                  top
                  class="closeButton_win  mt-1"
                  color="red"
                  @click="Click_colse"
                  >
                  <v-icon> mdi-close </v-icon>
              </v-btn>               
            </div>
            <div class="areahead2">
              <label class="koteititle-head" >作成日</label>
              <v-btn 
                class="btnymd ml-1"
                @click="inputCalendarClick(0)"
                tile
                width="150px"
                height="30px"
                >{{ getYm()}}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-btn>    
            </div>

            <div class="areahead-btn">
              <v-btn class="clsbtnmenuhead-ins" @click="onHead_ins">
                  登録
              </v-btn>             
            </div>
          </div>
        </v-sheet>
        </v-dialog>

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="262" >
          <v-sheet id="kakunin_id" class="clssheet-Mes" elevation="2">
            <!--
            @mousedown="win_drag_All($event)"
            @mousemove="win_move_All($event)"
            @mouseup="win_up_All($event)"
            style="bottom: 50%;right: 50%;">
            -->
            <div class="areaMes-001">
              <label class="clsstitleMes_001">確認メッセージ</label>
            </div>       
            <div class="areaMes-003">
              <label class="clslabelMes"> {{Dialog_Message}} </label>
            </div>
           
            <div class="areaMes-002">
               <div class="area-Ok">
                <v-btn class="clsbtnmenu-standard" v-show="Btnno_Visible" width="80" @click="onClick_Massege(0)">
                はい
                </v-btn>                
              </div>
              
              <div class="area-Ok">
                <v-btn class="clsbtnmenu-standard" v-show="Btnno_Visible == false" width="80" @click="onClick_Massege(0)">
                O K
                </v-btn>           
              </div>

              <v-btn class="clsbtnmenu-standard"  v-show="Btnno_Visible" width="80" @click="onClick_Massege(1)">
                いいえ
              </v-btn>         
            </div>   
          </v-sheet>
        </v-dialog>        

        <!-- 年月日ダイアログ -->
        <v-dialog
          v-model="datepicker_dialog_head"
          width="300"
          class="datepicker_dialogs"          
        >
        <v-date-picker
            id="Datepicker_head"
            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect"            
          >
          </v-date-picker>
        </v-dialog>        

        <!--履歴ダイアログ-->
        <v-dialog v-model="Rirekiwin" width="210" >
        <v-sheet id="rireki_id" class="clssheet-Reki" elevation="2"
            @mousedown="win_drag_reki($event)"
            @mousemove="win_move_reki($event)"
            @mouseup="win_up_reki($event)"
            >
          <div class="areaReki">
            <label class="clsstitleReki">作成履歴</label>
            <v-btn
                elevation="2"
                icon
                small
                top
                class="closeButton_win"
                color="red"
                @click="Click_colse_Reki"
                >
                <v-icon> mdi-close </v-icon>
            </v-btn>            
          </div>
          
          <div class="areaReki2">          
            <wj-flex-grid
                id="GrdReki_id"
                class="GrdReki-001"
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
                :itemsSource="viewdata"
              >

              <!--列-->
              <wj-flex-grid-column header="作成年月日" binding="head_mymd" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="head_dataid" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="head_kbn" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="head_siid" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>

            </wj-flex-grid>
          </div>

          <div>
            <!--
            <v-btn class="clsbtnmenu-del" @click="onClickdel_reki">
              削  除
            </v-btn>
            -->
          </div>

        </v-sheet>
        </v-dialog>                
    </v-sheet>  
</template>

<script>
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import { getConnect } from '../connect/getConnect';
import { postConnect } from '../connect/postConnect';
import { putConnect } from '../connect/putConnect';    
import { deleteConnect } from '../connect/deleteConnect';
import dayjs from '../../node_modules/dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '../utiles/const';

let INS_KBN_NAIYO = 0;  //登録区分:データ  
let INS_KBN_HEAD = 1;   //登録区分:ヘッダ
let INS_KBN_BIKO = 2;   //登録区分:備考
let DEL_KBN_REKI = 1;   //削除区分:履歴
let GET_KBN_DATA = 1;   //取得区分:表示データ


export default {
  components:{
    //KoteiinfList
  },
  props: ["ymd","uniqid","traceid","jigyoid","jigyoid_kotei","kotei_kbn"],
  data() {
    return {
      //入力チェック
      inputchk:false,

      str_ymd: this.ymd.substring(0, 4)
        + "年" + this.ymd.substring(4, 6)
        + "月" + this.ymd.substring(6)
        + "日",

        //入力データ
        Get_setaiSelinf:[],
        Get_honninSelinf:[],
        Get_syogaikbnSelinf:[],
        Get_setaiinf:this.get_inputdata(),
        SetaiList: [],
        HonninList: [],
        SyogaiList: [],
        Copydata:[],
        CopySeldata:[],
        MstList:[],
        Mst_title:"",
        Grid_Visible:false, //マスタグリッドの表示切替
        Mstflg:0,           //1:障害1 2:障害2 3:障害3 4:世帯 5:本人マスタグリッド表示フラグ

        GetKihonSelInf:[],  //API取得データ(履歴)
        GetViewDataInf:[],  //API取得データ(データ)
        GetKihonInf: [],    //API取得データ
        tokflg:false,       //特記フラグ
        dataflg:false,

        //ダイアログ
        InsWinhead:false,
        Rirekiwin:false,
        datepicker_dialog_head: false,
        datepicker_dialog_tyosa: false,
        Ym: '',
        picker: '',

        viewdata: [],       //グリッド表示データ        

        //ダイアログ新規 or upd T:新規 F:UPD
        insflg:true,

        //表示データ

        //表示項目
        Get_AllData:[],   //基本情報全データ
        dispMail:'',      //メールアドレス
        dispKMail:'',     //携帯アドレス
        dispPhoneNo:'',   //携帯番号
        dispFaxNo:'',     //FAX番号
        dispSetai:'',      //世帯の状況
        dispHonnin:'',     //本人の状況
        dispSetai_id:0,      //世帯の状況
        dispHonnin_id:0,     //本人の状況        
        dispTok:'',       //特記事項
        
        pdataid:'',         //表示しているDATAID
        pmymd:'',
        pmymd_moto:'',     //表示している元MYMD AAA
        intcode:0,         //表示しているintcode

        //確認ダイアログ
        dialog_Message_flg:false,
        Dialog_Message:'',       //ダイアログメッセージ
        dialo_Yesflg:false,      //ダイアログ結果
        dialo_Yesflg_no:false,      //ダイアログ結果No 1:Yse 2:No
        Btnno_Visible:false,     //「いいえ」ボタン表示設定      
        

        //1:履歴の新規登録
        //2:履歴の更新登録
        //3:履歴の削除
        //4:データ削除
        //5;データ登録
        //6:前回コピー
        dialog_Actionflg:0,            

        dispSkbn1:'',     //障害区分1
        dispSkbn1_id:0,  //障害区分1
        dispSkbn2:'',     //障害区分2
        dispSkbn2_id:0,  //障害区分2
        dispSkbn3:'',     //障害区分3
        dispSkbn3_id:0,  //障害区分3

        //前回コピー用変数
        Copy_dataid:0, //コピー元データid

        //履歴作成アナウンス
        Label_Visible:false,
        btn_enable:false,

        //IME 
        active:false,

        //dragflg
        Dragflg:false,
        mouseX:0,
        mouseY:0,
        screenX:0,
        screenY:0,
        moveX:0,
        moveY:0

    };
  },
  methods: {
    win_drag :function(e){
      //ドラッグ
      this.Dragflg = true;
      this.mouseX = e.screenX;
      this.mouseY = e.screenY; 
      var wdialog = document.getElementById("head_win_id");  
      if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
      if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 255) /2 + "px";  

      this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
      this.screenX = parseInt(wdialog.style.right.replace("px","")); 
    },
    win_move :function(e){
      //ドラッグ
      
      if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
      {
        var wdialog = document.getElementById("head_win_id");
        wdialog.style.position = "absolute";
        this.moveX = e.screenX - this.mouseX;
        this.moveY = e.screenY - this.mouseY;          
        wdialog.style.bottom = this.screenY - this.moveY  + "px";
        wdialog.style.right =  this.screenX - this.moveX + "px";  
      }
      else{
        this.Dragflg = false;
      }
    },    
    win_up :function(){
      //ドラッグ
      this.Dragflg = false;
    },    

    win_drag_All :function(e){
      //ドラッグ
      this.Dragflg = true;
      this.mouseX = e.screenX;
      this.mouseY = e.screenY; 
      var wdialog = document.getElementById("kakunin_id");  

      if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
      if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 260) /2 + "px";  
  
      this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
      this.screenX = parseInt(wdialog.style.right.replace("px","")); 
    },
    win_move_All :function(e){
      //ドラッグ
      
      if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
      {
        var wdialog = document.getElementById("kakunin_id");
        wdialog.style.position = "absolute";
        this.moveX = e.screenX - this.mouseX;
        this.moveY = e.screenY - this.mouseY;          
        wdialog.style.bottom = this.screenY - this.moveY  + "px";
        wdialog.style.right =  this.screenX - this.moveX + "px";  
      }
      else{
        this.Dragflg = false;
      }
    },    
    win_up_All :function(){
      //ドラッグ
      this.Dragflg = false;
    },    

    win_drag_reki :function(e){
      //履歴参照ドラッグ
      this.Dragflg = true;
      this.mouseX = e.screenX;
      this.mouseY = e.screenY; 
      var wdialog = document.getElementById("rireki_id");  
      if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 210)/2 + "px";
      if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 280) /2 + "px";    
      this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
      this.screenX = parseInt(wdialog.style.right.replace("px","")); 
    },
    win_move_reki :function(e){
      //履歴参照ドラッグ
      
      if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
      {
        var wdialog = document.getElementById("rireki_id");
        wdialog.style.position = "absolute";
        this.moveX = e.screenX - this.mouseX;
        this.moveY = e.screenY - this.mouseY;          
        wdialog.style.bottom = this.screenY - this.moveY  + "px";
        wdialog.style.right =  this.screenX - this.moveX + "px";  
      }
      else{
        this.Dragflg = false;
      }
    },    
    win_up_reki :function(){
      //履歴参照ドラッグ
      this.Dragflg = false;
    },

    win_drag_ymd :function(e){
      //日付参照ドラッグ
      this.Dragflg = true;
      this.mouseX = e.screenX;
      this.mouseY = e.screenY; 
      var wdialog = document.getElementById("Datepicker_head");  
      if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
      if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 260) /2 + "px";    
      this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
      this.screenX = parseInt(wdialog.style.right.replace("px","")); 
    },
    win_move_ymd :function(e){
      //日付参照ドラッグ
      
      if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
      {
        var wdialog = document.getElementById("Datepicker_head");
        wdialog.style.position = "absolute";
        this.moveX = e.screenX - this.mouseX;
        this.moveY = e.screenY - this.mouseY;          
        wdialog.style.bottom = this.screenY - this.moveY  + "px";
        wdialog.style.right =  this.screenX - this.moveX + "px";  
      }
      else{
        this.Dragflg = false;
      }
    },    
    win_up_ymd :function(){
      //日付参照ドラッグ
      this.Dragflg = false;
    },

    initTextarea(){
      
      let textarea = document.getElementById("textarea");
      let rowcnt = textarea.value.split("\n");

      this.active = true;

      //文字数制御
      if(textarea.value.length > 100) //100文字
      {
        textarea.value = textarea.value.substring(0,100);
      }
            
      //行数制御
      if(rowcnt.length > 4)
      {
        var result = "";
        for(var i = 0; i < 4;i++)
        {
          result += rowcnt[i]+ "\n";
        }
        textarea.value = result;
      }
    },
    get_inputdata() 
    {
        //障害区分、世帯の状況、本人の状況の入力データを取得する

        //API取得
        let _self = this;
        let params = [];
        params = {
          uniqid: this.uniqid,
          traceid: this.traceid,    
          pJigyoid: this.jigyoid,               
        };

        //世帯の状況
        getConnect('/Setaijyokyo', params,'KOTEIINF').then((result) => {
          _self.Get_setaiSelinf = result;
          this.DspSetaiInput();
        });

        //本人の状況
        getConnect('/Honninjyokyo', params,'KOTEIINF').then((result) => {
          _self.Get_honninSelinf = result;
          this.DspHonninInput();
        });          
        
        //障害区分
        getConnect('/Syogaikbn', params,'KOTEIINF').then((result) => {
          _self.Get_syogaikbnSelinf = result;
          this.DspSyogaiInput();
        });              
      }
      ,DspSetaiInput()
      {
        //#####世帯の状況の画面表示を行う#####

        let wk_setai_data=[];
        let setai_data=[];
        //世帯状況
        wk_setai_data = 
        {
          id:0,
          name:"(クリア)",
          value:" ",
        }
        setai_data.push(wk_setai_data);

        if(this.Get_setaiSelinf.icrn_inf != null)
        {          
          //取得したデータを確保
          this.Get_setaiSelinf.icrn_inf.forEach(function (value) {
            wk_setai_data = 
            {
              id:value.setaiID,
              name:value.setaiNm,
              value:value.setaiNm,
            }
            setai_data.push(wk_setai_data);

          });
          this.MstList = setai_data.concat();
        }
      }
      ,DspHonninInput()
      {
        //#####本人の状況の画面表示を行う#####
        
        let wk_honnin_data=[];
        let honnin_data=[];

        //本人
        wk_honnin_data = 
        {
          id:0,
          name:"(クリア)",
          value:" ",
        }
        honnin_data.push(wk_honnin_data);        
        if(this.Get_honninSelinf.icrn_inf != null)
        {          
          //取得したデータを確保
          this.Get_honninSelinf.icrn_inf.forEach(function (value) {
            wk_honnin_data = 
            {
              id:value.honninID,
              name:value.honninNm,
              value:value.honninNm,
            }
            honnin_data.push(wk_honnin_data);
          });
          this.MstList = honnin_data.concat();
        }        
      }
      ,DspSyogaiInput()
      {
        //#####障害区分の画面表示を行う#####

        let wk_syogai_data=[];
        let syogai_data=[];
        let w_dainm = "";

        //障害区分
        wk_syogai_data = 
        {
          id:0,
          name:"(クリア)",
          value:" ",
        }
        syogai_data.push(wk_syogai_data);        
        if(this.Get_syogaikbnSelinf.icrn_inf != null)
        {          
          //取得したデータを確保
          this.Get_syogaikbnSelinf.icrn_inf.forEach(function (value) {
            wk_syogai_data = 
            {
              id:value.daiNcode,
              name:"[" + value.daiNames + "]",
              value:value.daiNames,
            }
            w_dainm = value.daiNames; //大項目名を保持
            syogai_data.push(wk_syogai_data);

            value.chuList.forEach(function(value2){
              wk_syogai_data = 
              {
                id:value2.chuNcode,
                name:value2.chuNames,
                value:w_dainm +"(" + value2.chuNames +")"
              }
              syogai_data.push(wk_syogai_data);
            });

          });
          this.MstList = syogai_data.concat();

        }
      }
    ,DataFilter() 
    { 
      let data = [];
      let Rekidata = [];
      let wk_Rekidata = [];
      let wk_kbn = this.kotei_kbn;

      if(this.GetKihonSelInf.icrn_inf != null)
      {          
      //基本情報のデータのみに絞る
      this.GetKihonSelInf.icrn_inf.forEach(function (value) {
        //区分が基本情報
        
        if (value.head_kbn == wk_kbn) {
          if(value.head_mymd.trim() != "")
          {
            wk_Rekidata={
              head_mymd: value.head_mymd.substring(0, 4)
              + "年" + value.head_mymd.substring(4, 6)
              + "月" + value.head_mymd.substring(6)
              + "日",                  
              head_dataid:value.head_dataid,
              head_kbn:value.head_kbn,
              head_siid:value.head_siid,
          }
            Rekidata.push(wk_Rekidata);
          }
        }
      });

      //データ格納
      
      //履歴ソート(降順)
      Rekidata.sort(function(a,b){
        if(a.head_mymd > b.head_mymd) return -1;
        if(b.head_mymd > a.head_mymd) return 1;
      });
    
      this.viewdata = Rekidata.concat();
      this.Get_AllData = data.concat();


      if(this.viewdata.length > 0)
      {
        this.pdataid = this.viewdata[0].head_dataid;
        this.get_data();       
      }

      //データがない場合ラベルを表示 AAA
      if(this.pdataid == 0)
      {
        this.Label_Visible = true;
      }
      else{
        this.Label_Visible = false;
      }

    }             
  }
                             
,Clickins_data(kbn)
{
  //kbn = 1:リロードしない

    //#####ヘッダの更新処理 AAA
    this.insflg = false;
    if(this.pmymd != this.pmymd_moto)
    {
      this.Head_insData(1);
    }

    //登録ボタン
    let _self = this;
    let params = [];
    params = {
      uniqid: this.uniqid,
      traceid: this.traceid,                                
      kbn: this.kotei_kbn,
      intcode: this.intcode,
      insflg:INS_KBN_NAIYO, //内容登録
    }

    //登録データ
    let wk_naiyo = this.splitNaiyo(this.dispTok,256);
    let wk_putdata = [];
    let putdata = [];
    let putdata_biko = [];
    let chk1=0;
    let chk2=0;
    let chk3=0;

    //チェックデータ
    if(document.getElementById("Id_chk40").checked == true){chk1=1;}
    if(document.getElementById("Id_chk41").checked == true){chk2=1;}
    if(document.getElementById("Id_chk42").checked == true){chk3=1;}

    //入力データ
    let wk_dispMail = this.dispMail;
    let wk_dispKMail = this.dispKMail;
    let wk_dispPhoneNo = this.dispPhoneNo;
    let wk_dispFaxNo = this.dispFaxNo;
    let wk_dispSkbn1_id =  this.dispSkbn1_id
    let wk_dispSkbn2_id =  this.dispSkbn2_id
    let wk_dispSkbn3_id =  this.dispSkbn3_id


    if(wk_dispMail == "") wk_dispMail = " ";
    if(wk_dispKMail == "") wk_dispKMail = " ";
    if(wk_dispPhoneNo == "") wk_dispPhoneNo = " ";
    if(wk_dispFaxNo == "") wk_dispFaxNo = " ";
    if(wk_dispSkbn1_id == "") wk_dispSkbn1_id = 0;
    if(wk_dispSkbn2_id == "") wk_dispSkbn2_id = 0;
    if(wk_dispSkbn3_id == "") wk_dispSkbn3_id = 0;


    //内容
      wk_putdata=
      {
        head_jigyoid:this.jigyoid_kotei,
        head_intcode:this.intcode,
        head_kbn:this.kotei_kbn,
        head_dataid:this.pdataid,
        head_mstid:0,
        head_mymd:" ",
        head_siid:0,
        head_delflg:0,
        kihon_email:wk_dispMail,
        kihon_kmail:wk_dispKMail,
        kihon_ktelno:wk_dispPhoneNo,
        kihon_faxno:wk_dispFaxNo,
        kihon_syogaikbn1 :this.dispSkbn1_id,
        kihon_jyudo1 :  0,
        kihon_syukei1 :  chk1,
        kihon_syogaikbn2 :  this.dispSkbn2_id,
        kihon_jyudo2 :0,
        kihon_syukei2 :  chk2,
        kihon_syogaikbn3 :  this.dispSkbn3_id,
        kihon_jyudo3 : 0,
        kihon_syukei3 :  chk3,
        kihon_setaiid :  this.dispSetai_id,
        kihon_honninid :  this.dispHonnin_id,
        seikatu_id :  0,
        seikatu_no :  0,
        seikatu_ymdkoro :  0,
        seikatu_lcnt :  0,
        seikatu_naiyo :  0,
        kiou_id :  0,
        kiou_no :  0,
        kiou_ymdflg :  0,
        kiou_ymd :  " " ,
        kiou_syobyocode :  0,
        kiou_gensyo :  0,
        kiou_naiyo :  "",
        jyusin_id :  0,
        jyusin_no :  0,
        jyusin_kiouid :  0,
        jyusin_iryokikanid :  0,
        jyusin_sinryokaid :  0,
        jyusin_syujii :  " ",
        jyusin_renrakusaki :  " ",
        jyusin_kbn :  0,
        jyusin_hindo :  " ",
        jyusin_fukuyaku_kbn :  0,
        jyusin_fukuyaku_time :  " ",
        iryo_id :  0,
        iryo_iryohokenid :  0,
        iryo_iryokigobango :  " ",
        iryo_iryohihoken :  0,
        iryo_syogaijiritu :  0,
        iryo_syogaijiritu_kbn :  0,
        iryo_syogaitokubetu :  0,
        iryo_syogaisonota :  0,
        iryo_syogaisonota_biko :  " ",
        iryo_jyukyu_ro_jyukyu :  0,
        iryo_jyukyu_ro_gengaku :  0,
        iryo_jyukyu_ro_kenko :  0,
        iryo_sinsyo_jyukyu :  0,
        Day_id:0,
        Day_kbn:0,
        Day_stime:" ",
        Day_etime:" ",
        Day_naiyo:" ",
        week_id:0,
        week_kbn:0,
        week_weekkbn:0,
        week_datlcnt:0,
        week_naiyo:" ",        
        biko_lcnt :  0,
        biko_naiyo :  " "
      }
      putdata.push(wk_putdata);
    
    //データ登録
    if(this.dataflg == false)
    {
      //新規作成
      postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
        _self.griddata = result.icrn_inf;
        _self.gridSeldata = result;
        //if(kbn != 1)this.View_upd(this.intcode);
      });
    }
    else{
      //更新
      putConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
        _self.griddata = result.icrn_inf;
        _self.gridSeldata = result;
        //if(kbn != 1) this.View_upd(this.intcode);
      });              
    }

    params = {
      uniqid: this.uniqid,
      traceid: this.traceid,                                
      kbn: this.kotei_kbn,
      intcode: this.intcode,
      insflg:INS_KBN_BIKO, //備考登録
    }             

    putdata = ""
    //備考
    if(wk_naiyo.length > 0)
    {
      for(let i = 0; i < wk_naiyo.length;i++)
      {
        wk_putdata=
        {
          head_jigyoid:this.jigyoid_kotei,
          head_intcode:this.intcode,
          head_kbn:this.kotei_kbn,
          head_dataid:this.pdataid,
          head_mstid:0,
          head_mymd:" ",
          head_siid:0,
          head_delflg:0,
          kihon_email:" ",
          kihon_kmail:" ",
          kihon_ktelno:" ",
          kihon_faxno:" ",
          kihon_syogaikbn1 :0,
          kihon_jyudo1 :  0,
          kihon_syukei1 :  0,
          kihon_syogaikbn2 :  0,
          kihon_jyudo2 :0,
          kihon_syukei2 :  0,
          kihon_syogaikbn3 :  0,
          kihon_jyudo3 : 0,
          kihon_syukei3 :  0,
          kihon_setaiid :  0,
          kihon_honninid :  0,
          seikatu_id :  0,
          seikatu_no :  0,
          seikatu_ymdkoro :  0,
          seikatu_lcnt :  0,
          seikatu_naiyo :  0,
          kiou_id :  0,
          kiou_no :  0,
          kiou_ymdflg :  0,
          kiou_ymd :  " " ,
          kiou_syobyocode :  0,
          kiou_gensyo :  0,
          kiou_naiyo :  "",
          jyusin_id :  0,
          jyusin_no :  0,
          jyusin_kiouid :  0,
          jyusin_iryokikanid :  0,
          jyusin_sinryokaid :  0,
          jyusin_syujii :  " ",
          jyusin_renrakusaki :  " ",
          jyusin_kbn :  0,
          jyusin_hindo :  " ",
          jyusin_fukuyaku_kbn :  0,
          jyusin_fukuyaku_time :  " ",
          iryo_id :  0,
          iryo_iryohokenid :  0,
          iryo_iryokigobango :  " ",
          iryo_iryohihoken :  0,
          iryo_syogaijiritu :  0,
          iryo_syogaijiritu_kbn :  0,
          iryo_syogaitokubetu :  0,
          iryo_syogaisonota :  0,
          iryo_syogaisonota_biko :  " ",
          iryo_jyukyu_ro_jyukyu :  0,
          iryo_jyukyu_ro_gengaku :  0,
          iryo_jyukyu_ro_kenko :  0,
          iryo_sinsyo_jyukyu :  0,
          Day_id:0,
          Day_kbn:0,
          Day_stime:" ",
          Day_etime:" ",
          Day_naiyo:" ",
          week_id:0,
          week_kbn:0,
          week_weekkbn:0,
          week_datlcnt:0,
          week_naiyo:" ",          
          biko_lcnt :  i+1,
          biko_naiyo :  wk_naiyo[i]
        }
        putdata_biko.push(wk_putdata);

      } 
    }
    else{
      wk_putdata=
        {
          head_jigyoid:this.jigyoid_kotei,
          head_intcode:this.intcode,
          head_kbn:this.kotei_kbn,
          head_dataid:this.pdataid,
          head_mstid:0,
          head_mymd:" ",
          head_siid:0,
          head_delflg:0,
          kihon_email:" ",
          kihon_kmail:" ",
          kihon_ktelno:" ",
          kihon_faxno:" ",
          kihon_syogaikbn1 :0,
          kihon_jyudo1 :  0,
          kihon_syukei1 :  0,
          kihon_syogaikbn2 :  0,
          kihon_jyudo2 :0,
          kihon_syukei2 :  0,
          kihon_syogaikbn3 :  0,
          kihon_jyudo3 : 0,
          kihon_syukei3 :  0,
          kihon_setaiid :  0,
          kihon_honninid :  0,
          seikatu_id :  0,
          seikatu_no :  0,
          seikatu_ymdkoro :  0,
          seikatu_lcnt :  0,
          seikatu_naiyo :  0,
          kiou_id :  0,
          kiou_no :  0,
          kiou_ymdflg :  0,
          kiou_ymd :  " " ,
          kiou_syobyocode :  0,
          kiou_gensyo :  0,
          kiou_naiyo :  "",
          jyusin_id :  0,
          jyusin_no :  0,
          jyusin_kiouid :  0,
          jyusin_iryokikanid :  0,
          jyusin_sinryokaid :  0,
          jyusin_syujii :  " ",
          jyusin_renrakusaki :  " ",
          jyusin_kbn :  0,
          jyusin_hindo :  " ",
          jyusin_fukuyaku_kbn :  0,
          jyusin_fukuyaku_time :  " ",
          iryo_id :  0,
          iryo_iryohokenid :  0,
          iryo_iryokigobango :  " ",
          iryo_iryohihoken :  0,
          iryo_syogaijiritu :  0,
          iryo_syogaijiritu_kbn :  0,
          iryo_syogaitokubetu :  0,
          iryo_syogaisonota :  0,
          iryo_syogaisonota_biko :  " ",
          iryo_jyukyu_ro_jyukyu :  0,
          iryo_jyukyu_ro_gengaku :  0,
          iryo_jyukyu_ro_kenko :  0,
          iryo_sinsyo_jyukyu :  0,
          Day_id:0,
          Day_kbn:0,
          Day_stime:" ",
          Day_etime:" ",
          Day_naiyo:" ",
          week_id:0,
          week_kbn:0,
          week_weekkbn:0,
          week_datlcnt:0,
          week_naiyo:" ",          
          biko_lcnt :  1,
          biko_naiyo :  " "
        }
        putdata_biko.push(wk_putdata);

    }

    //特記登録
    if(this.tokflg == false)
    {
      //特記ないため新規作成
      postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata_biko).then((result) => {
        _self.griddata = result.icrn_inf;
        _self.gridSeldata = result;
        if(kbn != 1)  this.View_upd(this.intcode);
        this.Message_Dialog(sysConst.MSG_DATA_INS,0);
      });
    }
    else{
      //特記ある-更新
      putConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata_biko).then((result) => {
        _self.griddata = result.icrn_inf;
        _self.gridSeldata = result;
        if(kbn != 1)  this.View_upd(this.intcode);
      });
      
      this.Message_Dialog(sysConst.MSG_DATA_INS,0);


    }
  }


//空データの登録
,Clickins_data_blank(wdataid)
{

    //登録ボタン
    let _self = this;
    let params = [];
    params = {
      uniqid: this.uniqid,
      traceid: this.traceid,                                
      kbn: this.kotei_kbn,
      intcode: this.intcode,
      insflg:INS_KBN_NAIYO, //内容登録
    }

    //登録データ
    let wk_putdata = [];
    let putdata = [];

    //チェックデータ

    //入力データ
    let wk_dispMail = this.dispMail;
    let wk_dispKMail = this.dispKMail;
    let wk_dispPhoneNo = this.dispPhoneNo;
    let wk_dispFaxNo = this.dispFaxNo;
    let wk_dispSkbn1_id =  this.dispSkbn1_id
    let wk_dispSkbn2_id =  this.dispSkbn2_id
    let wk_dispSkbn3_id =  this.dispSkbn3_id


    if(wk_dispMail == "") wk_dispMail = " ";
    if(wk_dispKMail == "") wk_dispKMail = " ";
    if(wk_dispPhoneNo == "") wk_dispPhoneNo = " ";
    if(wk_dispFaxNo == "") wk_dispFaxNo = " ";
    if(wk_dispSkbn1_id == "") wk_dispSkbn1_id = 0;
    if(wk_dispSkbn2_id == "") wk_dispSkbn2_id = 0;
    if(wk_dispSkbn3_id == "") wk_dispSkbn3_id = 0;


    //内容
      wk_putdata=
      {
        head_jigyoid:this.jigyoid_kotei,
        head_intcode:this.intcode,
        head_kbn:this.kotei_kbn,
        head_dataid:wdataid,
        head_mstid:0,
        head_mymd:" ",
        head_siid:0,
        head_delflg:0,
        kihon_email:" ",
        kihon_kmail:" ",
        kihon_ktelno:" ",
        kihon_faxno:" ",
        kihon_syogaikbn1 :0,
        kihon_jyudo1 :  0,
        kihon_syukei1 :  0,
        kihon_syogaikbn2 :  0,
        kihon_jyudo2 :0,
        kihon_syukei2 :  0,
        kihon_syogaikbn3 :  0,
        kihon_jyudo3 : 0,
        kihon_syukei3 :  0,
        kihon_setaiid :  0,
        kihon_honninid :  0,
        seikatu_id :  0,
        seikatu_no :  0,
        seikatu_ymdkoro :  0,
        seikatu_lcnt :  0,
        seikatu_naiyo :  0,
        kiou_id :  0,
        kiou_no :  0,
        kiou_ymdflg :  0,
        kiou_ymd :  " " ,
        kiou_syobyocode :  0,
        kiou_gensyo :  0,
        kiou_naiyo :  "",
        jyusin_id :  0,
        jyusin_no :  0,
        jyusin_kiouid :  0,
        jyusin_iryokikanid :  0,
        jyusin_sinryokaid :  0,
        jyusin_syujii :  " ",
        jyusin_renrakusaki :  " ",
        jyusin_kbn :  0,
        jyusin_hindo :  " ",
        jyusin_fukuyaku_kbn :  0,
        jyusin_fukuyaku_time :  " ",
        iryo_id :  0,
        iryo_iryohokenid :  0,
        iryo_iryokigobango :  " ",
        iryo_iryohihoken :  0,
        iryo_syogaijiritu :  0,
        iryo_syogaijiritu_kbn :  0,
        iryo_syogaitokubetu :  0,
        iryo_syogaisonota :  0,
        iryo_syogaisonota_biko :  " ",
        iryo_jyukyu_ro_jyukyu :  0,
        iryo_jyukyu_ro_gengaku :  0,
        iryo_jyukyu_ro_kenko :  0,
        iryo_sinsyo_jyukyu :  0,
        Day_id:0,
        Day_kbn:0,
        Day_stime:" ",
        Day_etime:" ",
        Day_naiyo:" ",
        week_id:0,
        week_kbn:0,
        week_weekkbn:0,
        week_datlcnt:0,
        week_naiyo:" ",        
        biko_lcnt :  0,
        biko_naiyo :  " "
      }
      putdata.push(wk_putdata);


    //データ登録  
    //新規作成
    postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
      _self.griddata = result.icrn_inf;
      _self.gridSeldata = result;
    });

    params = {
      uniqid: this.uniqid,
      traceid: this.traceid,                                
      kbn: this.kotei_kbn,
      intcode: this.intcode,
      insflg:INS_KBN_BIKO, //備考登録
    }             

    //特記登録
    //特記ないため新規作成
    postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
      _self.griddata = result.icrn_inf;
      _self.gridSeldata = result;
    });
  }
  ,del_rekidata()
  {
    //履歴削除ボタン
    //API取得
    let _self = this;
    let params = [];
    params = {
      uniqid: this.uniqid,
      traceid: this.traceid,                                
      kbn: this.kotei_kbn,
      intcode: this.intcode
    } 
    let deldata = 
    {
      jigyoid:this.jigyoid_kotei,
      dataid:this.pdataid,
      id:0,
      lcnt:1,
      headflg:DEL_KBN_REKI,
    }

  //削除処理
  deleteConnect('/Koteiinf_HONNIN', params,'KOTEIINF',deldata).then((result) => {
      _self.griddata = result.icrn_inf;
      _self.gridSeldata = result;
      this.View_upd(this.intcode);
      this.Message_Dialog(sysConst.MSG_REKI_DEL,0);      
    });
  }
            
  ,splitNaiyo:function(str,size)
  {
    //#####文字列を分割する#####
    let strlen = Math.ceil(str.length / size);
    let array = [];

    for (let i=0, x=0; i < strlen; ++i, x += size) 
    {
      array[i] = str.substr(x, size)
    }
    return array;
  }
  //カレンダー
  ,getYm() 
  {
    //#####カレンダーセット#####
    if (!this.Ym) 
    {
        this.Ym = dayjs();
        this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
    }
    return (
      this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
    );
  },
  inputCalendarClick(kbn) 
  {
    //#####カレンダークリック#####
    if(kbn == 0)
    {
        this.picker =
        this.Ym.format('YYYY') +
        '-' +
        this.Ym.format('MM') +
        '-' +
        this.Ym.format('DD');
        this.datepicker_dialog_head = true; 
    }
    else if(kbn == 1)
    {
      if(this.Chk_Reki() == true)
      {
        this.picker = this.pmymd.replace("年","-");
        this.picker = this.picker.replace("月","-");
        this.picker = this.picker.replace("日","");
        this.datepicker_dialog_tyosa = true;
      }
    }
  },
  monthSelect() 
  {
    this.Ym = dayjs(this.picker);
    this.datepicker_dialog_head = false;
  }
  ,monthSelect_tyosa() 
  {
    this.Ym = dayjs(this.picker);
    this.pmymd = this.picker.replaceAll("-","");
    this.pmymd = this.pmymd.substring(0, 4)
          + "年" + this.pmymd.substring(4, 6)
          + "月" + this.pmymd.substring(6)
          + "日",  
    this.datepicker_dialog_tyosa = false;
  }   
  
  ,Head_insData(kbn)
  {
    //kbn:1 画面遷移時の登録 リロードしない

    //履歴の登録処理
    let ins_ymd = this.Ym.format('YYYY')  + this.Ym.format('MM')  + this.Ym.format('DD');
    if(this.insflg == true)
    {
      //新規登録
      let _self = this;
      let params = [];
      params = 
      {
        uniqid: this.uniqid,
        traceid: this.traceid,                                
        kbn: this.kotei_kbn,//基本情報
        intcode: this.intcode,
        insflg:INS_KBN_HEAD, //ヘッダ登録
      }

      //登録データ
      let postdata = 
      [
        {
          head_jigyoid:this.jigyoid_kotei,
          head_intcode:this.intcode,
          head_kbn:this.kotei_kbn,
          head_dataid:0,
          head_mstid:0,
          head_mymd:ins_ymd,
          head_siid:0,
          head_delflg:0,
          kihon_email:" ",
          kihon_kmail:" ",
          kihon_ktelno:" ",
          kihon_faxno:" ",
          kihon_syogaikbn1 :0,
          kihon_jyudo1 :  0,
          kihon_syukei1 :  0,
          kihon_syogaikbn2 :  0,
          kihon_jyudo2 :0,
          kihon_syukei2 :  0,
          kihon_syogaikbn3 :  0,
          kihon_jyudo3 : 0,
          kihon_syukei3 :  0,
          kihon_setaiid :  0,
          kihon_honninid :  0,
          seikatu_id :  0,
          seikatu_no :  0,
          seikatu_ymdkoro :  " ",
          seikatu_lcnt :  0,
          seikatu_naiyo :  " ",
          kiou_id :  0,
          kiou_no :  0,
          kiou_ymdflg :  0,
          kiou_ymd :  " ",
          kiou_syobyocode :  " ",
          kiou_gensyo :  0,
          kiou_naiyo :  " ",
          jyusin_id :  0,
          jyusin_no :  0,
          jyusin_kiouid :  0,
          jyusin_iryokikanid :  0,
          jyusin_sinryokaid :  0,
          jyusin_syujii :  " ",
          jyusin_renrakusaki :  " ",
          jyusin_kbn :  0,
          jyusin_hindo :  " ",
          jyusin_fukuyaku_kbn :  0,
          jyusin_fukuyaku_time :  " ",
          iryo_id :  0,
          iryo_iryohokenid :  0,
          iryo_iryokigobango :  " ",
          iryo_iryohihoken :  0,
          iryo_syogaijiritu :  0,
          iryo_syogaijiritu_kbn :  0,
          iryo_syogaitokubetu :  0,
          iryo_syogaisonota :  0,
          iryo_syogaisonota_biko :  " ",
          iryo_jyukyu_ro_jyukyu :  0,
          iryo_jyukyu_ro_gengaku :  0,
          iryo_jyukyu_ro_kenko :  0,
          iryo_sinsyo_jyukyu :  0,
          Day_id:0,
          Day_kbn:0,
          Day_stime:" ",
          Day_etime:" ",
          Day_naiyo:" ",
          week_id:0,
          week_kbn:0,
          week_weekkbn:0,
          week_datlcnt:0,
          week_naiyo:" ",          
          biko_lcnt :  0,
          biko_naiyo :  " "
        }
      ];
      postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',postdata).then((result) => 
      {
        _self.griddata = result.icrn_inf;
        _self.gridSeldata = result;
        if(kbn != 1)this.View_upd(this.intcode);
        //メッセージ
        this.Message_Dialog(sysConst.MSG_REKI_INS,0);
        this.InsWinhead =false;
      }
      );                
    }
    else
    {
      //更新登録
      let _self = this;
      let params = [];

      params = 
      {
        uniqid: this.uniqid,
        traceid: this.traceid,                                
        kbn: this.kotei_kbn,//基本情報
        intcode: this.intcode,
        insflg:INS_KBN_HEAD, //ヘッダ登録
      }
      
      //登録データ
      let putdata = 
      [
        {
          head_jigyoid:this.jigyoid_kotei,
          head_intcode:this.intcode,
          head_kbn:this.kotei_kbn,
          head_dataid:this.pdataid,
          head_mstid:0,
          head_mymd:ins_ymd,
          head_siid:0,
          head_delflg:0,
          kihon_email:" ",
          kihon_kmail:" ",
          kihon_ktelno:" ",
          kihon_faxno:" ",
          kihon_syogaikbn1 :0,
          kihon_jyudo1 :  0,
          kihon_syukei1 :  0,
          kihon_syogaikbn2 :  0,
          kihon_jyudo2 :0,
          kihon_syukei2 :  0,
          kihon_syogaikbn3 :  0,
          kihon_jyudo3 : 0,
          kihon_syukei3 :  0,
          kihon_setaiid :  0,
          kihon_honninid :  0,
          seikatu_id :  0,
          seikatu_no :  0,
          seikatu_ymdkoro :  " ",
          seikatu_lcnt :  0,
          seikatu_naiyo :  " ",
          kiou_id :  0,
          kiou_no :  0,
          kiou_ymdflg :  0,
          kiou_ymd :  " ",
          kiou_syobyocode :  " ",
          kiou_gensyo :  0,
          kiou_naiyo :  " ",
          jyusin_id :  0,
          jyusin_no :  0,
          jyusin_kiouid :  0,
          jyusin_iryokikanid :  0,
          jyusin_sinryokaid :  0,
          jyusin_syujii :  " ",
          jyusin_renrakusaki :  " ",
          jyusin_kbn :  0,
          jyusin_hindo :  " ",
          jyusin_fukuyaku_kbn :  0,
          jyusin_fukuyaku_time :  " ",
          iryo_id :  0,
          iryo_iryohokenid :  0,
          iryo_iryokigobango :  " ",
          iryo_iryohihoken :  0,
          iryo_syogaijiritu :  0,
          iryo_syogaijiritu_kbn :  0,
          iryo_syogaitokubetu :  0,
          iryo_syogaisonota :  0,
          iryo_syogaisonota_biko :  " ",
          iryo_jyukyu_ro_jyukyu :  0,
          iryo_jyukyu_ro_gengaku :  0,
          iryo_jyukyu_ro_kenko :  0,
          iryo_sinsyo_jyukyu :  0,
          Day_id:0,
          Day_kbn:0,
          Day_stime:" ",
          Day_etime:" ",
          Day_naiyo:" ",
          week_id:0,
          week_kbn:0,
          week_weekkbn:0,
          week_datlcnt:0,
          week_naiyo:" ",          
          biko_lcnt :  0,
          biko_naiyo :  " "
        }
      ];
      
      putConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => 
        {
          _self.griddata = result.icrn_inf;
          _self.gridSeldata = result;
          if(kbn != 1)this.View_upd(this.intcode);
          this.Message_Dialog(sysConst.MSG_REKI_UPD,0);
          this.InsWinhead =false;                    
        }
      );                
    }
  }
    //作成履歴
    ,onInitializeIcrnGrid(flexGrid)
    {
        flexGrid.beginUpdate();
        // ヘッダの追加と設定
        flexGrid.columnHeaders.rows[0].allowMerging = true;
        flexGrid.columnHeaders.rows[0].height =30;
        flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Reki'
        flexGrid.cells.rows.defaultSize = 30;
        flexGrid.alternatingRowStep = 0;
        flexGrid.endUpdate();

        this.flex = flexGrid; 
        flexGrid.hostElement.addEventListener("click",function(e){this.grid_click(e)}.bind(this));
    }
    ,onItemsSourceChanged(flexGrid) {
      // 初期選択を解除
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
    },

    Chk_insdata:function(row)
    {
      //未登録チェック
      if(this.inputchk == true)
        {
          this.dialo_Yesflg_no = 0;
          //更新有
          this.input_chk();

          let winter = setInterval(() => {
              if(this.dialo_Yesflg_no == 1 || this.dialo_Yesflg_no == 2)
              {
                clearInterval(winter);
                if(this.dialo_Yesflg_no == 1)
                {
                  this.Clickins_data(1);                
                }

                this.inputchk = false //入力チェックリセット
                this.$emit('child-datasel', row); //画面更新
                return false;
              }
          }, "interval");

        }
        else{
          return true;
        }              
    }

    ,grid_click:function(e)
    {
      var ht = this.flex.hitTest(e);      
      if(ht.row >= 0)
      {
        if(this.inputchk == true)
        {
          this.dialo_Yesflg_no = 0;
          //更新有
          this.input_chk();

          let winter = setInterval(() => {
              if(this.dialo_Yesflg_no == 1 || this.dialo_Yesflg_no == 2)
              {
                clearInterval(winter);
                if(this.dialo_Yesflg_no == 1)
                {
                  this.Clickins_data(1);                
                }

                this.inputchk = false //入力チェックリセット
                //グリッドがクリックされた場合画面の表示を更新する                
                this.pdataid = this.viewdata[ht.row].head_dataid;
                this.get_data();
              }
          }, "interval");
        }        
        else{
          this.inputchk = false //入力チェックリセット
          //グリッドがクリックされた場合画面の表示を更新する                
          this.pdataid = this.viewdata[ht.row].head_dataid;
          //##データの取得処理を追加
          this.get_data();
        }
      }
    }
    
    //画面更新
    ,DataFilter2() 
    { 
      let data = [];
      let datatok = [];
      let tokflg = false;
      let dataflg = false;              
      let wdataid = this.pdataid;
      let Ymd = "";

      if(this.GetViewDataInf.icrn_inf != null)
      { 
      //基本情報のデータのみに絞る
      this.GetViewDataInf.icrn_inf.forEach(function (value) 
      {
        //区分が基本情報
        if (value.head_kbn == 1 && value.head_dataid == wdataid ) 
        { 
          Ymd = value.head_mymd;
          //基本情報ヘッダの内容を取得
          value.naiyo.forEach(function(value2)
          {
            if (value2.naiyo_kbn == 0)
            {
              dataflg = true;
              data.push(value2);
            }
            else if(value2.naiyo_kbn == 1)
            {
              tokflg = true;
              datatok.push(value2);
            }  

          });
        }
      });

      //データ格納
      this.str_ymd = Ymd.substring(0, 4)
          + "年" + Ymd.substring(4, 6)
          + "月" + Ymd.substring(6)
          + "日",  
      
      this.pmymd = this.str_ymd;      
      this.pmymd_moto = this.str_ymd;
      //this.Ym = Ymd;

      if(data.length > 0)
      {
        this.dataflg = dataflg;

        //画面表示
        document.getElementById("lblRiyonm").innerText = data[0].kihon_name;
        document.getElementById("lblBirth").innerText = data[0].kihon_birth;
        document.getElementById("lblAge").innerText = data[0].kihon_age  + "歳";
        document.getElementById("lblSex").innerText = data[0].kihon_sex_view;
        document.getElementById("lbladress").innerText = data[0].kihon_address;
        document.getElementById("tel1").innerText = data[0].kihon_tel_view;
        document.getElementById("tel2").innerText = data[0].kihon_tel2_view;

        this.dispMail = data[0].kihon_email;      //メールアドレス
        this.dispKMail = data[0].kihon_kmail;     //携帯アドレス
        this.dispPhoneNo = data[0].kihon_ktelno;  //携帯番号
        this.dispFaxNo = data[0].kihon_faxno;     //FAX番号
        //API修正後にコメント解除

        //世帯
        let wk_dispSetai_id = 0;
        let wk_dispSetai = "";
        this.Get_setaiSelinf.icrn_inf.forEach(function(value) {
          if(value.setaiID == data[0].kihon_setaiid)
          {
            wk_dispSetai_id = value.setaiID;    
            wk_dispSetai = value.setaiNm;       
          }
        });                
        this.dispSetai_id = wk_dispSetai_id;    //世帯の状況ID
        this.dispSetai = wk_dispSetai;       //世帯の状況名称


        //本人
        let wk_dispHonnin_id = 0;
        let wk_dispHonnin = "";                
        this.Get_honninSelinf.icrn_inf.forEach(function(value) {
          if(value.honninID == data[0].kihon_honninid)
          {
            wk_dispHonnin_id = value.honninID;    //本人の状況ID
            wk_dispHonnin = value.honninNm;       //本人の状況名称
          }
        });
        this.dispHonnin_id = wk_dispHonnin_id;    //本人の状況ID
        this.dispHonnin = wk_dispHonnin;       //本人の状況名称

        //障害区分
        let wk_dispSkbn1_id = 0;
        let wk_dispSkbn1 = "";
        let wk_dispSkbn2_id = 0;
        let wk_dispSkbn2 = "";
        let wk_dispSkbn3_id = 0;
        let wk_dispSkbn3 = "";
        let wk_dainm =""                
        
        this.Get_syogaikbnSelinf.icrn_inf.forEach(function (value) {
          if(value.daiNcode == data[0].kihon_syogaikbn1)
          {
            wk_dispSkbn1_id = value.daiNcode;    //障害区分1の状況ID
            wk_dispSkbn1 = value.daiNames;       //障害区分1の状況名称
          }
          else if(value.daiNcode == data[0].kihon_syogaikbn2)
          {
            wk_dispSkbn2_id = value.daiNcode;    //障害区分2の状況ID
            wk_dispSkbn2 = value.daiNames;       //障害区分2の状況名称
          }
          else if(value.daiNcode == data[0].kihon_syogaikbn3)
          {
            wk_dispSkbn3_id = value.daiNcode;    //障害区分3の状況ID
            wk_dispSkbn3 = value.daiNames;       //障害区分3の状況名称
          }
          wk_dainm = value.daiNames;

          value.chuList.forEach(function(value2){
            if(value2.chuNcode == data[0].kihon_syogaikbn1)
            {
              wk_dispSkbn1_id = value2.chuNcode;                        //障害区分1の状況ID
              wk_dispSkbn1 = wk_dainm + "(" + value2.chuNames + ")" ;   //障害区分1の状況名称
            }
            else if(value2.chuNcode == data[0].kihon_syogaikbn2)
            {
              wk_dispSkbn2_id = value2.chuNcode;                        //障害区分2の状況ID
              wk_dispSkbn2 = wk_dainm + "(" + value2.chuNames + ")" ;   //障害区分2の状況名称
            }
            else if(value2.chuNcode == data[0].kihon_syogaikbn3)
            {
              wk_dispSkbn3_id = value2.chuNcode;                        //障害区分3の状況ID
              wk_dispSkbn3 = wk_dainm + "(" + value2.chuNames + ")" ;   //障害区分3の状況名称
            }
          });
        });
        
        this.dispSkbn1_id = wk_dispSkbn1_id;    //障害区分1の状況ID
        this.dispSkbn1 = wk_dispSkbn1;          //障害区分1の状況名称
        this.dispSkbn2_id = wk_dispSkbn2_id;    //障害区分2の状況ID
        this.dispSkbn2 = wk_dispSkbn2;          //障害区分2の状況名称
        this.dispSkbn3_id = wk_dispSkbn3_id;    //障害区分3の状況ID
        this.dispSkbn3 = wk_dispSkbn3;          //障害区分3の状況名称                                                        

        if(tokflg == true)
        {
          this.tokflg = tokflg;
          this.dispTok = datatok[0].biko_naiyo
        }
        else
        {
          this.tokflg = false;
          this.dispTok = "";
        } 
                  
        if(data[0].kihon_syukei1 == 1)//集計区分1
        {
          document.getElementById("Id_chk40").checked = true;
          document.getElementById("Id_chk40_text").style.color = "#0081eb";
        }
        else{
          document.getElementById("Id_chk40").checked = false;
          document.getElementById("Id_chk40_text").style.color = "";
        }
        if(data[0].kihon_syukei2 == 1)//集計区分2
        {
          document.getElementById("Id_chk41").checked = true;
          document.getElementById("Id_chk41_text").style.color = "#0081eb";
        }
        else{
          document.getElementById("Id_chk41").checked = false;
          document.getElementById("Id_chk41_text").style.color = "";
        }              
        if(data[0].kihon_syukei3 == 1)//集計区分3
        {
          document.getElementById("Id_chk42").checked = true;
          document.getElementById("Id_chk42_text").style.color = "#0081eb";
        }
        else{
          document.getElementById("Id_chk42").checked = false;
          document.getElementById("Id_chk42_text").style.color = "";
        }
      }
      else{
        this.viewClear(0);
      }
    }             
  }

  ,get_data() 
  {
    //選択されたデータを持ってくる

    //API取得
    let _self = this;
    let params = [];
    let ymd = this.ymd;           
    let intcode = this.intcode;         


    //パラメータ
    params = {
      uniqid: this.uniqid,
      traceid: this.traceid,    
      ymd: ymd,
      intcode: intcode,               

      Jigyoid: this.jigyoid_kotei,
      Kbn: this.kotei_kbn,             //基本情報
      Dataid: this.pdataid,
      Modeflg: GET_KBN_DATA,        //データ取得
    };

    getConnect('/Koteiinf_HONNIN', params,'KOTEIINF').then((result) => {
      _self.GetViewDataInf = result;
      this.DataFilter2();
    })
  }

  ,View_upd(intcode)
  {
    //画面更新
    this.$emit('child-dataupd', intcode); //画面更新
    this.inputchk = false;                //入力フラグを戻す
  }
  ,viewClear(kbn)
  {
    if(kbn == 0)
    {
      document.getElementById("lblRiyonm").innerText = "";
      document.getElementById("lblBirth").innerText = "";
      document.getElementById("lblAge").innerText = "";
      document.getElementById("lblSex").innerText = "";
      document.getElementById("lbladress").innerText = "";
      document.getElementById("tel1").innerText = "";
      document.getElementById("tel2").innerText = "";
    }


    this.dispMail = "";      //メールアドレス
    this.dispKMail = "";     //携帯アドレス
    this.dispPhoneNo = "";   //携帯番号
    this.dispFaxNo = "";     //FAX番号
    //API修正後にコメント解除
    this.dispSetai = "";      //世帯の状況
    this.dispSetai_id = 0;   //世帯の状況
    this.dispHonnin = "";     //本人の状況          
    this.dispHonnin_id = 0;  //本人の状況

    this.dispSkbn1 = "";
    this.dispSkbn1_id = 0;
    this.dispSkbn2 = "";
    this.dispSkbn2_id = 0;
    this.dispSkbn3 = "";
    this.dispSkbn3_id = 0;

    this.tokflg = false;  //特記有無フラグ
    this.dataflg = false;  //データフラグ

    this.dispTok = ""
    document.getElementById("Id_chk40").checked = false;
    document.getElementById("Id_chk41").checked = false;              
    document.getElementById("Id_chk42").checked = false;
  }
      //ﾏｽﾀｸﾞﾘｯﾄﾞ
      ,onInitializeIcrnGrid_Mst(flexGrid)
      {
          flexGrid.beginUpdate();
          // ヘッダの追加と設定
          flexGrid.columnHeaders.rows[0].allowMerging = true;
          flexGrid.columnHeaders.rows[0].height =30;
          flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Mst'
          flexGrid.cells.rows.defaultSize = 30;
          flexGrid.alternatingRowStep = 0;
          flexGrid.endUpdate();

          this.flex_mst = flexGrid; 
          flexGrid.hostElement.addEventListener("click",function(e){this.grid_click_Mst(e)}.bind(this));
      }          
      ,grid_click_Mst:function(e)
      {
        var ht = this.flex_mst.hitTest(e);                
        if(ht.row >= 0)
        {
          if(this.Mstflg == 1)
          {
            //障害区分1
            this.dispSkbn1_id = this.MstList[ht.row].id;
            this.dispSkbn1 = this.MstList[ht.row].value;
          }
          else if(this.Mstflg == 2){
            //障害区分2
            this.dispSkbn2_id = this.MstList[ht.row].id;
            this.dispSkbn2 = this.MstList[ht.row].value;
          }
          else if(this.Mstflg == 3){
            //障害区分3
            this.dispSkbn3_id = this.MstList[ht.row].id;
            this.dispSkbn3 = this.MstList[ht.row].value;                
          }
          else if(this.Mstflg == 4){
            //世帯
            this.dispSetai_id = this.MstList[ht.row].id;
            this.dispSetai = this.MstList[ht.row].value;                
          }
          else if(this.Mstflg == 5){
            //本人
            this.dispHonnin_id = this.MstList[ht.row].id;
            this.dispHonnin = this.MstList[ht.row].value;                
          }              
        }
      }
      ,onItemsSourceChanged_Mst(flexGrid) {
          // 初期選択を解除
          flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
          let col = flexGrid.columns[0];
          let head_str ="";
          if(this.Mstflg == 1 || this.Mstflg == 2 || this.Mstflg == 3)
          {
            //障害区分
            head_str="障害区分";
            col.header = head_str;
          }
          else if(this.Mstflg == 4){
            //世帯
            head_str="世帯の状況";
            col.header = head_str;
          }
          else if(this.Mstflg == 5){
            //本人
            head_str="本人の状況";
            col.header = head_str;
          }                     
          
        }
          ,onClick_Massege(kbn)
          {
            //確認ダイアログ判定
            if(kbn == 0)
            {
              this.dialo_Yesflg = true;
              this.dialo_Yesflg_no = 1;
              if(this.dialog_Actionflg == 1)
              {
                //履歴の新規追加
                this.Head_insData();
              }
              else if(this.dialog_Actionflg == 2)
              {
                //履歴の更新追加
                this.Head_insData();
              }
              else if(this.dialog_Actionflg == 3)
              {
                //履歴の削除
                this.del_rekidata();
              }
              else if(this.dialog_Actionflg == 4)
              {
                //入力データの削除
                this.del_rekidata();
              }              
              else if(this.dialog_Actionflg == 5)
              {
                //入力データの登録
                this.Clickins_data();
              }   
              else if(this.dialog_Actionflg == 6)
              {
                //前回コピー
                this.DataCopy();
              }
              else if(this.dialog_Actionflg == 0)
              {
                //汎用メッセージ
                this.dialog_Message_flg = false;
                this.Btnno_Visible = true;
              }
              else if(this.dialog_Actionflg == 7)
              {
                //履歴チェック
                this.InsWinhead = true;
              }                                              
              else if(this.dialog_Actionflg == 8)
              {
                //画面移動チェック
                this.dialog_Message_flg = false;
              }              

            }
            else{
              this.dialo_Yesflg = false;
              this.dialo_Yesflg_no = 2;
            }

            this.dialog_Message_flg = false;
          }
          
          //#####クリックイベント系#####
          ,onHeadclick_ins(){
            this.Ym = dayjs();
            this.insflg = true;//新規登録
            this.InsWinhead =true;
          }
          ,onHeadclick_upd(){
            this.Ym = dayjs();
            if(this.pmymd != "")
              {
                let wYmd = this.pmymd.replace("年","");
                wYmd = wYmd.replace("月","");
                wYmd = wYmd.replace("日",""); 
                this.Ym = dayjs(wYmd);
              }
            this.insflg = false;//更新登録
            this.InsWinhead =true;
          }        
          ,Click_colse(){
            this.InsWinhead =false;
          }
          ,Click_colse_Reki(){
            this.Rirekiwin =false;
          }
          ,onClickCopy(){            
            if(this.Chk_Reki() == true)
            {
              this.Dragflg = false;
              this.Message_Dialog(sysConst.MSG_COPY_CHK,6);
            }
          }

        ,DataCopy() 
        {
          //コピー用APIを実行
          let params = [];
          let putdata = [];

          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
          }

          putdata={
            jigyoid: this.jigyoid_kotei,
            intcode: this.intcode,
            kbn: this.kotei_kbn,
            dataid:this.pdataid,  //データid
            ymd:this.ymd,         //内容登録
          }

          //前回コピー
          postConnect('/Koteiinf_COPY', params,'KOTEIINF',putdata).then((result) => {
            this.Copydata = result.icrn_inf;
            this.CopySeldata = result;
            this.get_data();
          });
        },
        onClickReki() 
        {
          if(this.Chk_Reki() == true)
            {
              this.Dragflg = false;
              this.Rirekiwin=true;
            }
        }
        ,onClickIns()
        {
          //履歴チェック
          if(this.Chk_Reki() == true)
          {
            //データ登録ボタン
            this.Message_Dialog("入力データを登録します。\nよろしいですか。",5);            
          }
        }          
          
        ,onClickdel(){
          //データ削除ボタン
          if(this.Chk_Reki() == true)
          {
            this.Message_Dialog("データを削除します。\nよろしいですか。",4);            
          }
        }
        ,onClickclr()
        {
          //備考欄クリア
          this.viewClear(1);
        }

        ,onTxtHonnin_Click()
        {
          if(this.Chk_Reki() == true)
          {
            //本人テキストクリック時
            this.inputchk = true
            this.Mstflg = 5;
            this.Grid_Visible = true;
            this.DspHonninInput();
          }
        }          
        ,onTxtSetai_Click()
        {
          //世帯テキストクリック時
          if(this.Chk_Reki() == true)
          {
            this.inputchk = true
            this.Mstflg = 4;
            this.Grid_Visible = true;
            this.DspSetaiInput();
          }
        }
        ,onTxtSyogai_Click(kbn)
        {
          if(this.Chk_Reki() == true)
          {
            //障害区分テキストクリック時
            this.inputchk = true
            this.Mstflg = kbn;
            this.Grid_Visible = true;
            this.DspSyogaiInput();
          }
        }         
        ,onClickdel_reki()
        {
          //履歴削除ボタン
          this.Message_Dialog("選択している履歴を削除します。\nよろしいですか。",3);
        }
        //履歴登録
        ,onHead_ins()
        {
          if(this.insflg == true)
          {
            this.Message_Dialog("履歴を新規登録します。\nよろしいですか。",1);
          }
          else
          {
            this.Message_Dialog("履歴を更新登録します。\nよろしいですか。",2);
          }
        }
        ,setUserData(wintcode,wSeldata)
        {
          //利用者選択データ受け取り
          this.inputchk = false //入力チェックリセット
          this.Grid_Visible =false;
          this.pdataid = 0; //初期化
          this.viewClear(0);
          this.GetViewDataInf = [];
          this.GetKihonSelInf = wSeldata;   //表示データ
          this.intcode = wintcode;          //利用者コード
          this.Ym = dayjs();  //日付を初期化
          this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
          this.DataFilter();

        }
        ,Message_Dialog(Message,kbn)
        {
          //汎用メッセージダイアログ
          this.Dragflg = false;
          this.Dialog_Message = Message;
          this.dialog_Actionflg = kbn;  //メッセージのみ
          this.Btnno_Visible = false;
          if(kbn > 0){this.Btnno_Visible = true}
          this.dialog_Message_flg = true
        }    
        ,Message_Dialog_RekiChk(Message)
        {
          //汎用メッセージダイアログ
          this.Dialog_Message = Message;
          this.dialog_Actionflg = 7;  //メッセージのみ
          this.Btnno_Visible = false;
          this.dialog_Message_flg = true
        }              
        ,Chk_Reki:function()
        {
          //履歴をチェックする

          //if(this.pdataid == 0 )
          if(this.Label_Visible == true )
          {
            //this.Message_Dialog_RekiChk(sysConst.MSG_REKI_CRE);
            this.Message_Dialog(sysConst.MSG_REKI_CRE,0);
            return false;
          }
          else{
            return true;
          }
        }
        ,click_text()
        {
          this.inputchk = true;//入力チェックT
          this.Chk_Reki();
        }
        ,text_input(kbn)
        {
          switch(kbn)
          {
            case 0:
              {
                let textarea = document.getElementById("clslbl20_id");
                //文字数制御
                    
                if(textarea.value.length > 60) //文字数制限
                {
                  this.dispMail = textarea.value.substring(0,60);
                }                  
              }
              break;
            case 1:
              {
                let textarea = document.getElementById("clslbl21_id");
                //文字数制御
                    
                if(textarea.value.length > 15) //文字数制限
                {
                  this.dispPhoneNo = textarea.value.substring(0,15);
                }                                
              }
              break;
            case 2:
              {
                let textarea = document.getElementById("clslbl30_id");
                //文字数制御
                    
                if(textarea.value.length > 60) //文字数制限
                {
                  this.dispKMail = textarea.value.substring(0,60);
                }                                
              }              
              break;
            case 3:
              {
                let textarea = document.getElementById("clslbl31_id");
                //文字数制御
                if(textarea.value.length > 15) //文字数制限
                {
                  this.dispFaxNo = textarea.value.substring(0,15);
                }                                
              }              
              break;                                          

          }
        }        
        
        ,input_chk: function()
        {
          //入力項目があれば登録メッセージ
          if(this.inputchk == true)
          {
            this.Message_Dialog("登録されていない項目があります。\n 登録しますか。",8);
          }
        }

        ,check_click(kbn){
          if(this.Chk_Reki() == true)
          {
            if(kbn == 0){
              document.getElementById("Id_chk40_text").style.color = "#000";
              if(document.getElementById("Id_chk40").checked == true)
              {
                document.getElementById("Id_chk40_text").style.color = "#0081eb";
              }
            }
            if(kbn == 1){
              document.getElementById("Id_chk41_text").style.color = "#000";
              if(document.getElementById("Id_chk41").checked == true)
              {
                document.getElementById("Id_chk41_text").style.color = "#0081eb";
              }
            }
            if(kbn == 2){
              document.getElementById("Id_chk42_text").style.color = "#000";
              if(document.getElementById("Id_chk42").checked == true)
              {
                document.getElementById("Id_chk42_text").style.color = "#0081eb";
              }
            }
          }
        }        
  }
};
</script>

<style  lang="scss">
@import '../assets/scss/common.scss';

  .clssheet-chu1{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height:  520px;

    position: relative;

  }

  .clssheet-chu1_Noreki{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height:  520px;

    position: relative;

  }

  //履歴無しラベル1
  .clsstitle1_Noreki_back
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128,128,128,0.55);
    height: 520px;
    width: 955px;
    line-height:955px;
    text-align: center;
  }
  //履歴無しラベル2
  .clsstitle1_Noreki
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 195px;
    left: 327px;
    position: absolute;
    background-color: #f8f8f8;
    padding-top: 3px;
    font-size: 20px;
    font-weight:normal;
    margin-left: 0px;
    height: 130px;
    width: 290px;
    line-height:130px;
    text-align: center;
    border: 1px solid;
    border-color: #adadad;
  }
  //固定情報-左上タイトル
  .clsstitle1{
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
  }
  /*
  .area_tyosa
  {
    display: inline-flex;
    margin-top: 5px;
    height: 30px;
    border: thin solid #a5a5a5 ;
  }
  */
  .clsstitle1_tyosa{
    background-color: #dffae0;
    background-color: #4CCB81 !important;
    width: 60px;
    text-align: center;
    color: #ffffff;
    //border: 1px solid;
  }

  .clsstitle2{
    margin-top: 5px;
    text-align:center;
  }

  .clstext1{
    margin-left: 4px;
    border: 1px solid #a5a5a5;
  }
  .clsstitle-standard{
    background-color: #ffffff;
    font-size:14px;
    color:#1d5c81;
    margin-top: 2px;
    margin-left: 10px;
    text-align: center;
  }
  //標準
  .clsbtnmenu-standard{
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    //width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  .clsbtnmenu-copy{
    font-size: 14px !important;
    margin-top: 0px;
    margin-left: 2px;
    left: -190px;
    height: 25px !important;
    //width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  .clsbtnmenu-reki{
    font-size: 14px !important;
    margin-top: 0px;
    margin-left: 2px;
    left: -190px;
    height: 25px !important;
    //width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  .wrap001{
    display :inline-flex;
    width: 470px !important;
    height: 25px;
  }

  .area002{
    display :inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
  }
  //１段名
  .area003{
    display :inline-flex;
    margin-top: 10px;
    width: 955px;
    height: 30px;
  }
  .clsstitle4{//氏名
    background-color: #dffae0;
    padding-top: 3px;
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl_All{
    padding-top: 3px;
    font-size: 16px;
  }

  .clslbl1{
    background-color: #fffeee;
    margin-left: 3px;
    width: 249px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
    padding-top: 3px;
    font-size: 16px;
  }
  .clsstitle5{//生年月日
    background-color: #dffae0;
    padding-top: 3px;
    font-size: 16px;
    margin-left: 3px;
    width: 100px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl2{
    background-color: #fffeee;
    margin-left: 3px;
    width: 150px;
    text-align: center;
    border-bottom: 1px solid;
    border-color: #a5a5a5;
    padding-top: 3px;
    font-size: 16px;
  }
  .clsstitle6{//年齢
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 3px;
    width: 80px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
    padding-top: 3px;
    font-size: 16px;
  }
  .clslbl3{
    background-color: #fffeee;
    margin-left: 3px;
    width: 100px;
    text-align: center;
    border-bottom: 1px solid;
    border-color: #a5a5a5;
    padding-top: 3px;
    font-size: 16px;
  }
  .clsstitle7{//性別
    background-color: #dffae0;
    padding-top: 3px;
    font-size: 16px;
    margin-left: 3px;
    width: 60px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl4{
    background-color: #fffeee;
    margin-left: 3px;
    width: 90px;
    text-align: center;
    border-bottom: 1px solid;
    border-color: #a5a5a5;
    padding-top: 3px;
    font-size: 16px;
  }
  //２段名
  .area004{
    display :inline-flex;
    flex-wrap: wrap;
    width: 950px;
    height: 50px;
    padding: 3px 0px;
    background-color: #ffffff;
  }
  .area004-1{
    display :inline-flex;
    top: 1px;
    width: 340px;
    height: 24px;
    padding: 0px 0px;
    background-color: #ffffff;
    //border: 1px solid;
  }
  .area004-2{
    display :inline-flex;
    width: 340px;
    height: 25px;
    padding: 0px 0px;
    background-color: #ffffff;
  }
  .clsstitle10{ //住所
    background-color: #dffae0;
    font-size: 16px;
    padding-top: 3px;
    margin-top: 0px;
    margin-left: 0px;
    width: 90px;
    height: 50px;
    line-height:50px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl10{
    background-color: #fffeee;
    margin-left: 3px;
    margin-top: 0px;
    width: 506px;
    height: 50px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #a5a5a5;
    padding-top: 3px;
    font-size: 16px;    
  }
  .clsstitle11{//電話①
    background-color: #dffae0;
    font-size: 16px;
    width: 80px ;
    height: 23px;
    margin-left: 3px;
    margin-top: 1px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl11{
    background-color: #fffeec;
    margin-left: 3px;
    width: 255px;
    height: 24px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #a5a5a5;
    padding-top: 3px;
    font-size: 16px;
  }
  .clsstitle12{//電話②
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 3px;
    width: 80px;
    height: 24px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl12{
    background-color: #fffeec;
    margin-left: 3px;
    margin-top: 2px;
    width: 255px;
    height: 23px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #a5a5a5;
    padding-top: 3px;
    font-size: 16px;
  }
  //３段名
  .area005{
    display :inline-flex;
    margin-top: 3px;
    width: 950px;
    height: 25px;
    padding: 3px 0px;
    background-color: #ffffff;
  }
  .clsstitle20{ //ﾒｰﾙｱﾄﾞﾚｽ
    background-color: #dffae0;
    font-size: 16px;
    padding-top: 3px;
    margin-top: 0px;
    margin-left: 0px;
    width: 90px;
    height: 30px !important;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl20{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 506px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;
    
  }

  .clsstitle21{ //携帯番号
    background-color: #dffae0;
    font-size: 16px;
    padding-top: 3px;
    margin-top: 0px;
    margin-left: 3px;
    width: 80px;
    height: 30px !important;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl21{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 255px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;    
  }
  //４段名
  .area006{
    display :inline-flex;
    margin-top: 2px;
    width: 950px;
    height: 25px;
    padding: 3px 0px;
    background-color: #ffffff;
  }
  .clsstitle30{ //携帯ﾒｰﾙ
    background-color: #dffae0;
    font-size: 16px;
    padding-top: 3px;
    margin-top: 0px;
    margin-left: 0px;
    width: 90px;
    height: 30px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl30{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 506px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;    
  }
  .clsstitle31{ //FAX番号
    background-color: #dffae0;
    font-size: 16px;
    padding-top: 3px;
    margin-top: 0px;
    margin-left: 3px;
    width: 80px;
    height: 30px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl31{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 255px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;    
  }
  //中線
  .hr_style01{
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid rgb(228, 228, 228);
    margin-top: 11px;
  }
  //障害区分
  .area007{
    display :inline-flex;
    flex-wrap: wrap;
    width: 900px;
    height: 90px;
    padding: 3px 0px;
    background-color: #ffffff;
  }
  .area007-1{
    display :inline-flex;
    flex-wrap: wrap;
    width: 332px;
    height: 90px ;
    padding: 3px 0px;
    background-color: #ffffff;
  }
  .area007-2{
    display :inline-flex;
    margin-left: 3px;
    flex-wrap: wrap;
    width: 90px;
    height: 90px;
    padding: 3px 0px;
    background-color: #ffffff;
  }

  .clsstitle40{ //障害区分
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 3px;
    margin-left: 0px;
    width: 90px;
    height: 96px !important;
    line-height:95px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl40{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;    
  }
  .clslbl41{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 3px;
    width: 330px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;    
  }
  .clslbl42{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 3px;
    width: 330px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;    
  }
  .chk40{
    background-color: #ffffff;
    height: 28px;
    margin-left: 3px;
    margin-top: 3px;
  }
  .clslbl43{
    margin-left: 3px;
    margin-top: 3px;
  }
  .chk41{
    background-color: #ffffff;
    height: 28px;
    margin-left: 3px;
    margin-top: 3px;
  }
  .clslbl44{
    margin-left: 3px;
    margin-top: 3px;
  }
  .chk42{
    background-color: #ffffff;
    height: 28px;
    margin-left: 3px;
    margin-top: 3px;
  }
  .clslbl45{
    margin-left: 3px;
    margin-top: 3px;
  }
  //世帯の状況
  .area008{
    display :inline-flex;
    margin-top: 16px;
    width: 450px;
    height: 25px;
    padding: 1px 0px;
    background-color: #ffffff;
  }
  .clsstitle50{
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 0px;
    width: 90px;
    height: 30px !important;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
    
  }
  .clslbl50{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 1px;
    width: 330px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;
    display: block;



  }
  //本人の状況
  .area009{
    display :inline-flex;
    margin-top: 7px;
    width: 450px;
    height: 25px;
    padding: 1px 0px;
    background-color: #ffffff;
  }
  .clsstitle60{
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 0px;
    width: 90px;
    height: 30px ;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl60{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    padding-top: 3px;
    font-size: 16px;
  }

  //特記事項
  .area010{
    display :inline-flex;
    margin-top: 7px;
    width: 530px;
    height: 90px;
    padding: 1px 0px;
    background-color: #ffffff;
  }
  .clsstitle70{
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 0px;
    width: 90px;
    height: 100px;
    line-height:90px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .clslbl70{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 410px;
    height: 100px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;
    
    ime-mode: active;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
  //下段ボタン
  .area011{
    display :flex;
    margin-top: 20px;
    margin-left: 0px;
    width: 950px;
    height: 27px;
  }
  .clsbtnmenu-clr{
    margin-top: 0px;
    margin-left: -1px;
    height: 25px !important;
    //width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .clsbtnmenu-clr_Noreki{
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    //width: 50px !important;
    background-color: rgba(128,128,128,0.55) !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .clsbtnmenu-del{
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    //width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .clsbtnmenu-del_Noreki{
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    //width: 50px !important;
    background-color: rgba(128,128,128,0.55) !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .clsbtnmenu-ins{
    margin-top: 0px;
    margin-left: 717px;
    height: 25px !important;
    //width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .clsbtnmenu-ins_Noreki{
    margin-top: 0px;
    margin-left: 717px;
    height: 125px !important;
    //width: 50px !important;
    background-color: rgba(128,128,128,0.55) !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }






  .area007-3{
    display :inline-flex;
    flex-wrap: wrap;
    width: 204px;
    height: 278px;
    padding: 3px 0px;
    margin-left: 62px;
    background-color: #7fb9f0;
    border: 1px solid #4396e4;
  }  
  .column-Mst{
    font-size:medium;
    font-weight:normal !important;
    text-align: center !important;
    background-color: #d6f3fc !important;
    border-color: #4396e4 !important;
  }
  .GridMst{
    font-size: 16px;
    margin-top: 3px;
    margin-left: 6px;
    width: 190px !important;
    height: 265px;
    border: 1px solid;
    border-color: #4396e4 !important;
    background-color: #dffae0;
  }     
  
  #GridMst_id {
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: 16px;
      // 下の4つはセット
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    

    .wj-cell-maker {
      width: 15px;
      height: 15px;
    }
    
    background: #fffeee !important;
    .wj-cell:not(.wj-header) {
      background: #fffeee;
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

  }


  #GrdReki_id {
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      font-size: 16px;
      // 下の4つはセット
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    .wj-cell-maker {
      width: 15px;
      height: 15px;
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

  }
</style>
