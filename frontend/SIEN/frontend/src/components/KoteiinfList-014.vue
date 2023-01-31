<template>
    <v-sheet class="clssheet-chu014" elevation="2">
      <label class="clsstitle1_Noreki_back_014" v-show="Label_Visible">
        <label class="clsstitle1_Noreki_014" >履歴を作成してください</label>
      </label>


        <div class="area014-001">
            <label class="clsstitle014-001">住環境</label>
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
        
        
        <div class="area014-002">
          <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-copy-id" class="clsbtnmenu-copy" @click="onClickCopy">
            前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-reki-id" class="clsbtnmenu-reki" @click="onClickReki">
            履歴参照
          </v-btn>
        </div>

        <div class="area014-003">
            <label class="clsstitle014-003">住居区分</label>
            <select
              class="customSelectBox ml-1"
              v-model="dispJukyo"
              @change="onJukyo1Clicked"
              style="width: 330px; height: 30px">
            
              <option v-for="val in JukyoList" :key="val.id" :value="val.id">
                {{ val.name }}
              </option>
            </select>            
        </div>

        <div class="area014-004">
              <label class="clsstitle014-004">特記事項</label>
              <textarea  class="clssinp014-002" v-model="dispTok" @input="text_input"></textarea>              
        </div>

        <div class="area014-005">
              <v-btn :disabled="Label_Visible == true" class="clsbtnmenu014-jyuno">
                見取り図作成
              </v-btn> 
        </div>  


        <div class="area014-006">
            <label class="clsstitle014-005">ジュノグラム予定仮置き</label>
        </div> 

        <div class="area014-007">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu014-clr" @click="onClickclr">
                クリア
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu014-del" @click="onClickdel">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu014-ins" @click="onClickIns">
                登 録
            </v-btn>             
        </div> 

        <!-- ヘッダダイアログエリア --> 
       <v-dialog  v-model="InsWinhead" width="255">
          <v-sheet class="clssheet-head" elevation="2" 
            id ="head_win_id014"
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

    <!-- 年月日ダイアログ -->
    <v-dialog
      v-model="datepicker_dialog_head"
      width="300"
      class="datepicker_dialogs">
      <v-date-picker
        id="Datepicker_head"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect">
      </v-date-picker>
    </v-dialog>   

    <!-- 確認ダイアログ -->
    <v-dialog v-model="dialog_Message_flg" width="262" >
      <v-sheet id="kakunin_id014" class="clssheet-Mes" elevation="2">
        <!--
        @mousedown="win_drag_Msg($event)"
        @mousemove="win_move_Msg($event)"
        @mouseup="win_up_Msg($event)"
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

        <!--履歴ダイアログ-->
        <v-dialog  v-model="Rirekiwin" width="210" >
        <v-sheet id="rireki_id014" class="clssheet-Reki" elevation="2"
            @mousedown="win_drag_reki($event)"
            @mousemove="win_move_reki($event)"
            @mouseup="win_up_reki($event)">
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
                id="GrdReki"
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
                :initialized="onInitializeIcrnGrid_reki"
                :itemsSourceChanged="onItemsSourceChanged_reki"
                :itemsSource="viewdata_reki"
              >

              <!--列-->
              <wj-flex-grid-column header="作成年月日" binding="head_mymd" :width="198" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="head_dataid" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="head_kbn" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="head_siid" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>

            </wj-flex-grid>
          </div>
          <div>
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
    import dayjs from '../../node_modules/dayjs';
    import * as wjGrid from '@grapecity/wijmo.grid';
    import sysConst from '../utiles/const';
    import { getConnect } from '../connect/getConnect';
    import { postConnect } from '../connect/postConnect';
    import { putConnect } from '../connect/putConnect';
    import { deleteConnect } from '../connect/deleteConnect';

    let INS_KBN_NAIYO = 0;  //登録区分:データ  
    let INS_KBN_HEAD = 1;   //登録区分:ヘッダ
    let INS_KBN_BIKO = 2;   //登録区分:備考
    let DEL_KBN_REKI = 1;   //削除区分:履歴
    let GET_KBN_DATA = 1;   //取得区分:表示データ

    export default
    {
      props: ["ymd","uniqid","traceid","jigyoid","jigyoid_kotei","kotei_kbn"],
        data() {
        return {
          str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",
            radio001: 'radio001-K',
            seljyukyokbn:"",


          //入力情報
          Get_Jyukyoinf:this.get_inputdata(),

          //基本情報
          pdataid:'',         //表示しているDATAID
          pmymd:'',
          pmymd_moto:'',     //表示している元MYMD
          intcode:0,         //表示しているintcode          

          //ダイアログ
          InsWinhead:false,
          Rirekiwin:false,
          datepicker_dialog_head: false,
          datepicker_dialog_tyosa: false,
          Ym: '',
          picker: '',

          //新規履歴登録
          insflg:true,       //T:新規登録 F:更新登録

          //履歴作成アナウンス
          Label_Visible:false,
          btn_enable:false,

          //確認ダイアログ
          dialog_Message_flg:false,
          Dialog_Message:'',          //ダイアログメッセージ
          dialo_Yesflg:false,         //ダイアログ結果
          dialo_Yesflg_no:false,      //ダイアログ結果No 1:Yse 2:No
          Btnno_Visible:false,        //「いいえ」ボタン表示設定
          dialog_Actionflg:0,             

          GetApiData_reki:[],         //API取得データ(履歴)
          GetApiData_data:[],         //API取得データ(データ)

          viewdata_reki: [],          //履歴グリッド表示データ

          //dragflg
          Dragflg:false,
          mouseX:0,
          mouseY:0,
          screenX:0,
          screenY:0,
          moveX:0,
          moveY:0,

          //画面表示
          dispJukyo:0,
          dispTok:"",
          JukyoList:[],
          dataflg:false,
          tokflg:false,

          //入力チェック
          inputchk:false,

        }
    },
    methods:
      {
        oninitCombo(){
        },
        onClickCopy() 
        {
          //前回コピーボタン押下時
          this.Dragflg = false;
          this.Message_Dialog(sysConst.MSG_COPY_CHK,4);
        }
        ,DataCopy() 
        {
          //前回コピー処理
          let params = [];
          let putdata = [];

          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
          }

          putdata={
            jigyoid: this.jigyoid_kotei,
            intcode: this.intcode,
            kbn: this.kotei_kbn,             //住環境
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
          this.Rirekiwin=true;
        }
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
              this.picker = this.pmymd.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");
              this.datepicker_dialog_tyosa = true;
          }
        }
        ,monthSelect() 
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
        ,Click_colse(){
            this.InsWinhead =false;
          }
        //画面更新
        ,View_upd(intcode)
        {
          //画面更新
          this.$emit('child-dataupd', intcode); //画面更新
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
            if(this.dialog_Actionflg == 2)
            {
              //履歴の削除
              this.del_rekidata();
            }   
            if(this.dialog_Actionflg == 3)
            {
              //データの登録
              this.ins_inputdata();
            }
            if(this.dialog_Actionflg == 4)
            {
              //前回コピー
              this.DataCopy();
            }
            if(this.dialog_Actionflg == 5)
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
        ,onHeadclick_ins(){
          this.Ym = dayjs();
          this.insflg = true;//新規登録
          this.InsWinhead =true;
        }
        ,onHead_ins()
        {
          this.Message_Dialog("履歴を新規登録します。\nよろしいですか。",1);
        }
        ,Head_insData(kbn)
        {
          //kbn:1 画面遷移時の登録 リロードしない

          //履歴の登録処理
          let ins_ymd = this.Ym.format('YYYY')  + this.Ym.format('MM')  + this.Ym.format('DD');

          //新規登録
          let _self = this;
          let params = [];
          params = 
          {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
            kbn: this.kotei_kbn,//住環境
            intcode: this.intcode,
            insflg:INS_KBN_HEAD, //ヘッダ登録
          }
        
          //登録データ
          let postdata = 
          [
            {
              head_jigyoid: this.jigyoid_kotei,
              head_intcode: this.intcode,
              head_kbn: this.kotei_kbn,  //住環境
              head_dataid: this.pdataid,
              head_mstid: 0,
              head_mymd: ins_ymd,
              head_siid: 0,
              head_delflg: 0,
              biko_lcnt: 0,
              biko_naiyo: " ",
              kazoku_cntid: 0,
              kazoku_kazokuname: " ",
              kazoku_kazokukana: " ",
              kazoku_tuzukigaraid: 0,
              kazoku_doukyokbn: 0,
              kazoku_kazokukbn: 0,
              kazoku_kaigokbn_syu: 0,
              kazoku_kaigokbn_fuku1: 0,
              kazoku_kaigokbn_fuku2: 0,
              kazoku_mimoto: 0,
              kazoku_kinkyu_renraku1: 0,
              kazoku_kinkyu_renraku2: 0,
              kazoku_dm: 0,
              kazoku_yubinno1: 0,
              kazoku_yubinno2: 0,
              kazoku_renraku1_1: 0,
              kazoku_renraku1_2: 0,
              kazoku_renraku1_3: 0,
              kazoku_renraku2_1: 0,
              kazoku_renraku2_2: 0,
              kazoku_renraku2_3: 0,
              kazoku_faxno_1: 0,
              kazoku_faxno_2: 0,
              kazoku_faxno_3: 0,
              kazoku_email: " ",
              kazoku_kmail: " ",
              kazoku_kinmu: 0,
              kazoku_kinmu_biko: " ",
              kazoku_biko: " ",
              kaigosya_kzkcntid: 0,
              kaigosya_kaigojikan: 0,
              kaigosya_kaigojyotai: 0,
              kaigosya_biko: " ",
              koken_kbn: 0,
              koken_simei: " ",
              koken_kankei: " ",
              koken_yubinno1: " ",
              koken_yubinno2: " ",
              koken_jyusyo: " ",
              koken_renraku1_1: " ",
              koken_renraku1_2: " ",
              koken_renraku1_3: " ",
              koken_renraku2_1: " ",
              koken_renraku2_2: " ",
              koken_renraku2_3: " ",
              jyukan_kyojyukbn: 0              
            }
          ];

          if(this.insflg == true)
          {
            postConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',postdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              if(kbn != 1)this.View_upd(this.intcode);
              //メッセージ
              this.Message_Dialog(sysConst.MSG_REKI_INS);
              this.InsWinhead =false;
            });
          }
          else{
            putConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',postdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              if(kbn != 1)this.View_upd(this.intcode);
              this.Message_Dialog(sysConst.MSG_REKI_UPD);
              this.InsWinhead =false;                    
            });                
          }

        }        

        ,setUserData(wintcode,wSeldata)
          {
            //利用者選択データ受け取り
            this.inputchk = false             //入力チェックリセット
            this.pdataid = 0;                 //初期化
            this.viewClear();                 //クリア
            this.GetApiData_reki = wSeldata;  //履歴
            this.GetApiData_data = [];        //データ
            this.intcode = wintcode;          //利用者コード
            this.Ym = dayjs();                //日付を初期化
            this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
            this.DataFilter();

            //データがない場合ラベルを表示
            if(this.pdataid == 0)
            {
              this.Label_Visible = true;
            }
            else{
              this.Label_Visible = false;
            }

          }

          ,viewClear(){
          //データクリア
            this.InsWinhead = false;
            this.InsWindata = false;
            this.InsWinflg = false;
            this.insdataflg = false;
            this.insflg = true;
            this.dataflg = false;
            this.tokflg = false;

            this.dispJukyo = 0;
            this.dispTok = " ";

          }              

        //フィルター
        ,DataFilter() { 
          let data = [];
          let Rekidata = [];
          let wk_Rekidata = [];
          let wk_kbn = this.kotei_kbn;

          if(this.GetApiData_reki.icrn_inf != null)
          {                    
            //住環境のデータのみに絞る
            this.GetApiData_reki.icrn_inf.forEach(function (value) {

            //区分が住環境
            if (value.head_kbn == wk_kbn) {
              //履歴データ取得
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

              //住環境ヘッダの内容を取得
              value.naiyo.forEach(function(value2){
                data.push(value2);
              });
            }
          });

          //履歴ソート(降順)
          Rekidata.sort(function(a,b){
            if(a.head_mymd > b.head_mymd) return -1;
            if(b.head_mymd > a.head_mymd) return 1;
          });          
          this.viewdata_reki = Rekidata.concat();
          //クリックイベントを呼んでみる
          if(this.viewdata_reki.length > 0)
          {
            this.pdataid = this.viewdata_reki[0].head_dataid;
            this.get_data();       
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
            Kbn: this.kotei_kbn,             //住環境
            Dataid: this.pdataid,
            Modeflg: GET_KBN_DATA,        //データ取得
          };

          getConnect('/Koteiinf_KAZOKU', params,'KOTEIINF').then((result) => {
            _self.GetApiData_data = result;
            this.DataFilter2();
          })
        }

        ,DataFilter2() 
        { 
          let data = [];      //成形データ
          let datatok = [];   //成形データ
          let wdataid = this.pdataid;
          let wk_Ymd ="";
          let tokflg = false;
          let dataflg = false;                
          let wk_kbn = this.kotei_kbn;

          if(this.GetApiData_data.icrn_inf != null)
          {                    
            //住環境のデータのみに絞る
            this.GetApiData_data.icrn_inf.forEach(function (value) {

              //区分が家族情報
              if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {
              
                wk_Ymd = value.head_mymd.substring(0, 4)
                  + "年" + value.head_mymd.substring(4, 6)
                  + "月" + value.head_mymd.substring(6)
                  + "日",  
                
                  //住環境ヘッダの内容を取得
                  value.naiyo.forEach(function(value2){
                    if (value2.naiyo_kbn == 0)
                    {
                      dataflg = true;
                      data.push(value2);
                    }
                    else if(value2.naiyo_kbn == 2)
                    {
                      tokflg = true;
                      datatok.push(value2);
                    }  
                });
              }
            });
          
            this.str_ymd = wk_Ymd;
            this.pmymd = this.str_ymd;
            this.pmymd_moto = this.str_ymd;
            this.viewdata2 = data.concat();
            

            if(data.length > 0)
            {
              this.dataflg = dataflg;
              this.dispJukyo = data[0].jyukan_kyojyukbn;
            }
            else{
              this.dataflg = false;
            }

            if(tokflg == true)
            {
              let strtok ="";
              for(let i = 0;i < datatok.length ; i++)
              {
                strtok = strtok + datatok[i].biko_naiyo;
              }

              this.tokflg = tokflg;
              this.dispTok = strtok;
            }
            else
            {
              this.tokflg = false;
              this.dispTok = "";
            } 
          }        
        }

        //####履歴参照####
        ,onInitializeIcrnGrid_reki(flexGrid){
            flexGrid.beginUpdate();
            // ヘッダの追加と設定
            flexGrid.columnHeaders.rows[0].allowMerging = true;
            flexGrid.columnHeaders.rows[0].height =30;
            flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Reki'
            flexGrid.cells.rows.defaultSize = 30;
            flexGrid.alternatingRowStep = 0;
            flexGrid.endUpdate();

            this.flex2 = flexGrid; 
            flexGrid.hostElement.addEventListener("click",function(e){this.grid_click_reki(e)}.bind(this));
        }
        ,onItemsSourceChanged_reki(flexGrid) {
          // 初期選択を解除
          flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
        },
        grid_click_reki:function(e)
        {
          var ht = this.flex2.hitTest(e);
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
                      this.ins_inputdata(1);                
                    }

                    this.inputchk = false //入力チェックリセット
                    //グリッドがクリックされた場合画面の表示を更新する                
                    this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                    this.get_data();
                  }
              }, "interval");
            }
            else
            {
              //グリッドがクリックされた場合画面の表示を更新する                
              this.inputchk = false;
              this.pdataid = this.viewdata_reki[ht.row].head_dataid;
              this.get_data();
            }      
          }

        }
        ,Click_colse_Reki(){
          this.Rirekiwin =false;
        }

        ,input_chk: function()
        {
          //入力項目があれば登録メッセージ
          if(this.inputchk == true)
          {
            this.Message_Dialog("登録されていない項目があります。\n 登録しますか。",5);
          }
        } 

        //###データ登録・削除###
        ,onClickIns()
        {
          //データ登録ボタン
          this.Message_Dialog("入力データを登録します。\nよろしいですか。",3);
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
        ,ins_inputdata(kbn){
          //データ登録処理
          //データダイアログ 登録
          
          if(this.pmymd != this.pmymd_moto)
          {
            this.insflg = false;
            this.Head_insData(1);
          }

          let ins_jyukyokbn = this.dispJukyo;   //住居区分
          let wk_naiyo = this.splitNaiyo(this.dispTok,256); //特記事項

          //パラメータ
          let _self = this;
          let params = [];
          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
            kbn: this.kotei_kbn, //住環境
            intcode: this.intcode,
            insflg:INS_KBN_NAIYO, //内容登録
          }          

          //登録データ
          let putdata = 
          [
            {
              head_jigyoid: this.jigyoid_kotei,
              head_intcode: this.intcode,
              head_kbn: this.kotei_kbn,  //住環境
              head_dataid: this.pdataid,
              head_mstid: 0,
              head_mymd: "",
              head_siid: 0,
              head_delflg: 0,
              biko_lcnt: 0,
              biko_naiyo: " ",
              kazoku_cntid: 0,
              kazoku_kazokuname: " ",
              kazoku_kazokukana: " ",
              kazoku_tuzukigaraid: 0,
              kazoku_tuzukigarachuid: 0,
              kazoku_doukyokbn: 0,
              kazoku_kazokukbn: 0,
              kazoku_kaigokbn_syu: 0,
              kazoku_kaigokbn_fuku1: 0,
              kazoku_kaigokbn_fuku2: 0,
              kazoku_mimoto: 0,
              kazoku_kinkyu_renraku1: 0,
              kazoku_kinkyu_renraku2: 0,
              kazoku_dm: 0,
              kazoku_yubinno1: " ",
              kazoku_yubinno2: " ",
              kazoku_address: " ",                  
              kazoku_renraku1_1: 0,
              kazoku_renraku1_2: 0,
              kazoku_renraku1_3: 0,
              kazoku_renraku2_1: 0,
              kazoku_renraku2_2: 0,
              kazoku_renraku2_3: 0,
              kazoku_faxno_1: 0,
              kazoku_faxno_2: 0,
              kazoku_faxno_3: 0,
              kazoku_email: " ",
              kazoku_kmail: " ",
              kazoku_kinmu: 0,
              kazoku_kinmu_biko: " ",
              kazoku_biko: " ",
              kaigosya_kzkcntid: 0,
              kaigosya_kaigojikan: 0,
              kaigosya_kaigojyotai: 0,
              kaigosya_biko: " ",
              koken_kbn: 0,
              koken_simei: " ",
              koken_kankei: " ",
              koken_yubinno1: " ",
              koken_yubinno2: " ",
              koken_jyusyo: " ",
              koken_renraku1_1: " ",
              koken_renraku1_2: " ",
              koken_renraku1_3: " ",
              koken_renraku2_1: " ",
              koken_renraku2_2: " ",
              koken_renraku2_3: " ",
              jyukan_kyojyukbn: ins_jyukyokbn              
            }
          ];

          if(this.dataflg == true)
          {
            //更新
            putConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',putdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
            });            
          }
          else{
            //新規
            postConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',putdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
            });            
          }

          //備考欄
          let params_biko = [];
          let wk_putdata_biko = [];
          let putdata_biko = [];
          
          params_biko = {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
            kbn: this.kotei_kbn, //住環境
            intcode: this.intcode,
            insflg:INS_KBN_BIKO, //備考
          }          

          //登録データ
          
          if(wk_naiyo.length > 0)
          {
            for(let i = 0; i < wk_naiyo.length;i++)
            {
              wk_putdata_biko = 
              {
                head_jigyoid: this.jigyoid_kotei,
                head_intcode: this.intcode,
                head_kbn: this.kotei_kbn,  //住環境
                head_dataid: this.pdataid,
                head_mstid: 0,
                head_mymd: "",
                head_siid: 0,
                head_delflg: 0,
                biko_lcnt: i+1,
                biko_naiyo: wk_naiyo[i],
                kazoku_cntid: 0,
                kazoku_kazokuname: " ",
                kazoku_kazokukana: " ",
                kazoku_tuzukigaraid: 0,
                kazoku_tuzukigarachuid: 0,
                kazoku_doukyokbn: 0,
                kazoku_kazokukbn: 0,
                kazoku_kaigokbn_syu: 0,
                kazoku_kaigokbn_fuku1: 0,
                kazoku_kaigokbn_fuku2: 0,
                kazoku_mimoto: 0,
                kazoku_kinkyu_renraku1: 0,
                kazoku_kinkyu_renraku2: 0,
                kazoku_dm: 0,
                kazoku_yubinno1: " ",
                kazoku_yubinno2: " ",
                kazoku_address: " ",                  
                kazoku_renraku1_1: 0,
                kazoku_renraku1_2: 0,
                kazoku_renraku1_3: 0,
                kazoku_renraku2_1: 0,
                kazoku_renraku2_2: 0,
                kazoku_renraku2_3: 0,
                kazoku_faxno_1: 0,
                kazoku_faxno_2: 0,
                kazoku_faxno_3: 0,
                kazoku_email: " ",
                kazoku_kmail: " ",
                kazoku_kinmu: 0,
                kazoku_kinmu_biko: " ",
                kazoku_biko: " ",
                kaigosya_kzkcntid: 0,
                kaigosya_kaigojikan: 0,
                kaigosya_kaigojyotai: 0,
                kaigosya_biko: " ",
                koken_kbn: 0,
                koken_simei: " ",
                koken_kankei: " ",
                koken_yubinno1: " ",
                koken_yubinno2: " ",
                koken_jyusyo: " ",
                koken_renraku1_1: " ",
                koken_renraku1_2: " ",
                koken_renraku1_3: " ",
                koken_renraku2_1: " ",
                koken_renraku2_2: " ",
                koken_renraku2_3: " ",
                jyukan_kyojyukbn: 0              
              }
              putdata_biko.push(wk_putdata_biko)
            }
          }
          else{
            wk_putdata_biko = 
              {
                head_jigyoid: this.jigyoid_kotei,
                head_intcode: this.intcode,
                head_kbn: this.kotei_kbn,  //住環境
                head_dataid: this.pdataid,
                head_mstid: 0,
                head_mymd: "",
                head_siid: 0,
                head_delflg: 0,
                biko_lcnt: 0,
                biko_naiyo: " ",
                kazoku_cntid: 0,
                kazoku_kazokuname: " ",
                kazoku_kazokukana: " ",
                kazoku_tuzukigaraid: 0,
                kazoku_tuzukigarachuid: 0,
                kazoku_doukyokbn: 0,
                kazoku_kazokukbn: 0,
                kazoku_kaigokbn_syu: 0,
                kazoku_kaigokbn_fuku1: 0,
                kazoku_kaigokbn_fuku2: 0,
                kazoku_mimoto: 0,
                kazoku_kinkyu_renraku1: 0,
                kazoku_kinkyu_renraku2: 0,
                kazoku_dm: 0,
                kazoku_yubinno1: " ",
                kazoku_yubinno2: " ",
                kazoku_address: " ",                  
                kazoku_renraku1_1: " ",
                kazoku_renraku1_2: " ",
                kazoku_renraku1_3: " ",
                kazoku_renraku2_1: " ",
                kazoku_renraku2_2: " ",
                kazoku_renraku2_3: " ",
                kazoku_faxno_1: " ",
                kazoku_faxno_2: " ",
                kazoku_faxno_3: " ",
                kazoku_email: " ",
                kazoku_kmail: " ",
                kazoku_kinmu: 0,
                kazoku_kinmu_biko: " ",
                kazoku_biko: " ",
                kaigosya_kzkcntid: 0,
                kaigosya_kaigojikan: 0,
                kaigosya_kaigojyotai: 0,
                kaigosya_biko: " ",
                koken_kbn: 0,
                koken_simei: " ",
                koken_kankei: " ",
                koken_yubinno1: " ",
                koken_yubinno2: " ",
                koken_jyusyo: " ",
                koken_renraku1_1: " ",
                koken_renraku1_2: " ",
                koken_renraku1_3: " ",
                koken_renraku2_1: " ",
                koken_renraku2_2: " ",
                koken_renraku2_3: " ",
                jyukan_kyojyukbn: 0              
              }
              putdata_biko.push(wk_putdata_biko)            
          }

          if(this.tokflg == true)
          {
            //更新
            putConnect('/Koteiinf_KAZOKU', params_biko,'KOTEIINF',putdata_biko).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              if(kbn != 1)this.View_upd(this.intcode);
            });            
          }
          else{
            //新規
            postConnect('/Koteiinf_KAZOKU', params_biko,'KOTEIINF',putdata_biko).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              if(kbn != 1)this.View_upd(this.intcode);
            });            
          }
        }

        ,onClickclr()
        {
          this.dispJukyo = 0;
          this.dispTok = " ";
        }
        ,onClickdel()
        {
          //データ登録ボタン
          this.Message_Dialog("入力データを削除します。\nよろしいですか。",2);
        }

        ,del_rekidata(){
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
            cntid:0,
            lcnt:1,
            headflg:DEL_KBN_REKI,
          }

          //削除処理
          deleteConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',deldata).then((result) => {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              this.View_upd(this.intcode);
              this.Message_Dialog(sysConst.MSG_REKI_DEL);
            });  
        }

        ,text_input()
        {
          //テキストエリア入力
          this.inputchk = true;
        }

        ,Chk_insdata:function(row)
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
                      this.ins_inputdata(1);                
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

        ,win_drag :function(e){
          //ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("head_win_id014");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 255) /2 + "px";  

          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move :function(e){
          //ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("head_win_id014");
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
        win_drag_Msg :function(e){
          //ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("kakunin_id014");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 260) /2 + "px";  
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move_Msg :function(e){
          //ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("kakunin_id014");
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
        win_up_Msg :function(){
          //ドラッグ
          this.Dragflg = false;
        },
        //#####履歴参照#####
        win_drag_reki :function(e){
          //履歴参照ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("rireki_id014");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 210)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 280) /2 + "px";  
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move_reki :function(e){
          //履歴参照ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("rireki_id014");
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
        get_inputdata() 
        {
          //住居区分

          //API取得
          let _self = this;
          let params = [];
          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,    
            pJigyoid: this.jigyoid,               
          };
          //住居区分
          getConnect('/Mst_jyukyo', params,'KOTEIINF').then((result) => {
            _self.Get_Jyukyoinf = result;
            this.DspJukyoInput();
          });           
        }
        ,DspJukyoInput(){
          //住居区分をセット

          let wk_jukyo_data = [];
          let wk_jukyo_list = [];

          if(this.Get_Jyukyoinf.icrn_inf != null)
          {        
              //空データ
              wk_jukyo_data = 
              {
                id:0,
                name:"",
              }
              wk_jukyo_list.push(wk_jukyo_data);

            //取得したデータを確保
            this.Get_Jyukyoinf.icrn_inf.forEach(function (value) {
              wk_jukyo_data = 
              {
                id:value.ncode,
                name:value.names,
              }
              wk_jukyo_list.push(wk_jukyo_data);

            });
            this.JukyoList = wk_jukyo_list.concat();
          }
        }
        ,onJukyo1Clicked()
        {
          //クリックイベント特に処理はなし
          this.inputchk = true;
        }
      }

    }
</script>

<style lang="scss">
    /*全体エリア*/
    .clssheet-chu014{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height:  680px;

    position: relative;
  }
  /*タイトル*/
  .clsstitle014-001{
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
  }
  /*タイトルエリア*/
  .area014-001{
    display :inline-flex;
    width: 470px;
    height: 25px;
  }
  /*右上ボタンエリア*/
  .area014-002{
    display :inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
  }

  /*住居区分エリア*/
  .area014-003{
    display :inline-flex;
    margin-left: 0px;
    margin-top: 10px;
    width: 900px;
    height: 25px;
  }

  /*介護時間-ラベル*/   
  .clsstitle014-003
  {
    margin-top: 0px;
    background-color: #dffae0;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp014-001
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 210px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

  /*特記事項エリア*/   
  .area014-004{
    display :inline-flex;
    margin-left: 0px;
    margin-top: 10px;
    width: 900px;
    height: 25px;
  }

  /*特記事項タイトル*/
  .clsstitle014-004{ 
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 0px;
    height: 100px;
    width: 90px;
    line-height:100px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  /*特記事項テキスト*/
  .clssinp014-002{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 100px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;    
  }

  /*ジュノグラム*/
  .clsbtnmenu014-jyuno{
    margin-top: 50px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }  

  .area014-006{
    display :inline-flex;
    width: 900px;
    height: 400px;
  }

  
  //仮置きコントロール
  .clsstitle014-005
  {
    width: 500px;
    height: 400px;
    line-height: 400px;
    border: 1px solid;
    border-color: #8ffd7a;
    text-align: center;
  }


      /*ボタンエリア*/
      .area014-007{
    margin-top: 00px;
    width: 955px;
    height: 25px;
  }
  /*クリアボタン*/
  .clsbtnmenu014-clr{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*削除ボタン*/
  .clsbtnmenu014-del{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*登録ボタン*/
  .clsbtnmenu014-ins{
    margin-top: 20px;
    margin-left: 717px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  //履歴無しラベル1
  .clsstitle1_Noreki_back_014
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128,128,128,0.55);
    height: 680px;
    width: 955px;
    line-height:680px;
    text-align: center;
  }
  //履歴無しラベル2
  .clsstitle1_Noreki_014
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 245px;
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
</style>


