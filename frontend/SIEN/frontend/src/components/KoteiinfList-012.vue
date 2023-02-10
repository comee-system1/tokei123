<template>
    <v-sheet class="clssheet-chu012" elevation="2">
      
      <label class="clsstitle1_Noreki_back_012" v-show="Label_Visible">
          <label class="clsstitle1_Noreki_012" >履歴を作成してください</label>
      </label>      
      
        <div class="area012-001">
            <label class="clsstitle012-001">介護者情報</label>
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

        <div class="area012-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
            前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
            履歴参照
            </v-btn>
        </div>
        
        <div class="area012-003">
        <wj-flex-grid
            id="Gridicrn012-id"
            class="Gridicrn012-001"
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
            :formatItem="onformatItem"
            :itemsSource="viewdata"
            :autoRowHeights="true"
            >
            </wj-flex-grid>             
        </div>

        <div class="area012-004">
              
        </div> 

        <div class="area012-005">
            <label class="clsstitle012-003">成年後見人</label>
            <div class="area012-005-001">
              <v-radio-group :disabled="Label_Visible == true" row v-model="radio012" class="radiogroup001">
                <v-radio class="chk012-001"   value="radio012-1"  @click="click_text(0)">
                  <template  v-slot:label >
                    <div id="chk012-001_text"> 無し</div>
                  </template>                
                </v-radio>                  
                <v-radio class="chk012-001"   value="radio012-2"  @click="click_text(1)">                
                <template  v-slot:label >
                    <div id="chk012-002_text"> 後見</div>
                  </template>                
                </v-radio>
                <v-radio class="chk012-001"   value="radio012-3"  @click="click_text(2)">                
                <template  v-slot:label >
                    <div id="chk012-003_text"> 保佐</div>
                  </template>                
                </v-radio>
                <v-radio class="chk012-001"   value="radio012-4"  @click="click_text(3)">                
                <template  v-slot:label >
                    <div id="chk012-004_text"> 補助</div>
                  </template>                
                </v-radio>                                                
                </v-radio-group>              

                <label class="clsstitle012-004" >氏名</label>
                <input type="text" id="clssinp012-001_id" class="clssinp012-001" v-model="dispkoken_simei" @input="text_input(0)"/>     
                    
                <label class="clsstitle012-006">関係</label>
                <input type="text" id="clssinp012-005_id" class="clssinp012-005" v-model="dispkoken_kankei" @input="text_input(1)"/>
                
                <div class="area012-005-001-address">
                <label class="clsstitle012-005">住所</label>
                    <div class="area012-005-001-address-001">
                        <label class="clsstitle012-005-001">〒</label>
                        <input type="text" id="clssinp012-002_id" class="clssinp012-002" v-model="dispkoken_yubin1" @input="text_input(2)"/>
                        <label class="clsstitle011-012-002 ml-3">ー</label>
                        <input type="text" id="clssinp012-003_id" class="clssinp012-003" v-model="dispkoken_yubin2" @input="text_input(3)"/>
                        <textarea type="text" id = "clssinp012-004_id" class="clssinp012-004" v-model="dispkoken_jyusyo" @input="text_input(4)"/>
                    </div>
                </div>   
                
                <div class="area012-005-001-renraku1">
                    <label class="clsstitle012-007-001">連絡先①</label>
                    <input type="text" id="clssinp012-006-001_id" class="clssinp012-006-001" v-model="dispkoken_renranku1_1" @input="text_input(5)"/>
                    <label class="clsstitle012-007-002">ー</label> 
                    <input type="text" id="clssinp012-006-002_id" class="clssinp012-006-002" v-model="dispkoken_renranku1_2" @input="text_input(6)"/>
                    <label class="clsstitle012-007-003">ー</label>
                    <input type="text" id="clssinp012-006-003_id" class="clssinp012-006-003" v-model="dispkoken_renranku1_3" @input="text_input(7)"/>  
                </div>

                <div class="area012-005-001-renraku2">
                    <label class="clsstitle012-007-004">連絡先②</label>
                    <input type="text" id="clssinp012-006-004_id" class="clssinp012-006-004" v-model="dispkoken_renranku2_1" @input="text_input(8)" />
                    <label class="clsstitle012-007-005">ー</label> 
                    <input type="text" id="clssinp012-006-005_id" class="clssinp012-006-005" v-model="dispkoken_renranku2_2" @input="text_input(9)" />
                    <label class="clsstitle012-007-006">ー</label>
                    <input type="text" id="clssinp012-006-006_id" class="clssinp012-006-006" v-model="dispkoken_renranku2_3" @input="text_input(10)" /> 
                </div>
            </div>
        </div>

        <div class="area012-006">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu012-clr" @click="onClickclr">
                クリア
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu012-del" @click="onClickdel">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu012-ins" @click="onClickIns">
                登 録
            </v-btn>             
        </div> 


       <!-- ヘッダダイアログエリア --> 
       <v-dialog v-model="InsWinhead" width="255" >
        <v-sheet class="clssheet-head" elevation="2"
            id ="head_win_012id"
            @mousedown="win_drag($event)"
            @mousemove="win_move($event)"
            @mouseup="win_up($event)">
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
            @change="monthSelect">
          </v-date-picker>
        </v-dialog>
        
        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="262" >
          <v-sheet id="kakunin_id012" class="clssheet-Mes" elevation="2">
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
        <v-sheet id="rireki_id012" class="clssheet-Reki" elevation="2"
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

        <!--介護者情報-->
        <v-dialog v-model="InsWindata" width="440"  >
          <v-sheet class="clssheet-chu013" elevation="2"
            id ="data_012id">
            <!--
            @mousedown="win_drag_data($event)"
            @mousemove="win_move_data($event)"
            @mouseup="win_up_data($event)"
            style="bottom: 50%;right: 50%;">
          -->
            <div class="area013-001">
              <label class="clsstitle013-001">家族情報</label>
              <v-btn
                margin-left=1px
                elevation="2"
                icon
                small
                top
                class="closeButton_win "
                color="red"
                @click="Click_colse_win"
                >
                <v-icon> mdi-close </v-icon>
              </v-btn>                
            </div>

            <div class="area013-002" >
              <v-btn-toggle color="yellow" v-model="selected_btn" mandatory >
              <v-btn  small elevation ="2" class="clsbtnmenu-standard_default" @click="onDataIns_click" >
                  新規追加
              </v-btn>
              <v-btn small elevation ="2"  class="clsbtnmenu-standard_default"  @click="onDataUpd_click" >
                  修正登録
              </v-btn> 
            </v-btn-toggle>
            </div>       
            
            <div class="area013-003">
                <label class="clsstitle013-002">氏名</label>
                <label id="clsstitle013-003_id" class="clsstitle013-003"></label>
            </div>

            <div class="area013-004">
                <label class="clsstitle013-004">続柄</label>
                <label id="clsstitle013-005_id" class="clsstitle013-005"></label>
            </div>

            <div class="area013-005">
                <label class="clsstitle013-006">同居区分</label>
                <label id="clsstitle013-007_id" class="clsstitle013-007"></label>
            </div>

            <div class="area013-006">
                <label class="clsstitle013-008">家族区分</label>
                <label id="clsstitle013-009_id" class="clsstitle013-009"></label>
            </div>

            <div class="area013-007">
                <label class="clsstitle013-010">介護区分</label>
                <label id="clsstitle013-011_id" class="clsstitle013-011"></label>
            </div>

            <hr class="hr_style013-001">

            <div class="area013-008">
                <label class="clsstitle013-012">介護時間</label>
                <select
                class="customSelectBox ml-1"
                  v-model="dispkaigotime"
                  @change="onselectClicked"
                  style="width: 330px; height: 30px">
                <option v-for="val in kaigotimeList" :key="val.id" :value="val.id">
                  {{ val.name }}
                </option>
              </select>                     

            </div>
            
            <div class="area013-009">
              <label class="clsstitle013-013">介護者の状態</label>
              <div class="area013-009-001">
                  <div class="area013-009-001-chk">
                      <v-radio-group row v-model="radio001" class="radiogroup001">
                      <v-radio  class="clssinp013-002-kenko"   value="radio001-K" @click="click_text(4)">
                      <template  v-slot:label >
                          <div id="radio001-K_text">健康</div>
                        </template>
                      </v-radio>                            
                      <v-radio  class="clssinp013-002-sick"   value="radio001-S" @click="click_text(5)">
                        <template  v-slot:label >
                          <div id="radio001-S_text">病気がち</div>
                        </template>
                      </v-radio>                                              
                      </v-radio-group> 
                  </div>
                  <textarea type="text" id="clssinp013-003_id" class="clssinp013-003" v-model="dispkaigobiko" @input="text_input(11)"/>
              </div>
            </div>
            
            <div class="area013-010">
                <v-btn class="clsbtnmenu013-clr" @click="onClick_dataclr">
                    クリア
                </v-btn>
                <v-btn class="clsbtnmenu013-del" @click="onClick_datadel">
                    削 除
                </v-btn>
                <v-btn class="clsbtnmenu013-ins" @click="onClick_datains">
                    登 録
                </v-btn>             
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
import * as wjCore from '@grapecity/wijmo';

let INS_KBN_NAIYO = 0;  //登録区分:データ  
let INS_KBN_HEAD = 1;   //登録区分:ヘッダ
let DEL_KBN_DATA = 0;   //削除区分:データ
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
                HeaderList: [
                {
                  dataname: 'riyonm',
                  title: '氏名',
                  kbktitle: '',
                  width: 190,
                  align: 'left',
                 },
                 {
                  dataname: 'tuduki',
                  title: '続柄',
                  kbktitle: '',
                  width: 70,
                  align: 'left',
                 },
                 {
                  dataname: 'doukyo',
                  title: '同居\n区分',
                  kbktitle: '',
                  width: 70,
                  align: 'center',
                 },
                 {
                  dataname: 'kzkkbn',
                  title: '家族区分',
                  kbktitle: '',
                  width: 100,
                  align: 'left',
                 },
                 {
                  dataname: 'kaigo',
                  title: '介護\n区分',
                  kbktitle: '',
                  width: 70,
                  align: 'center',
                 },                                  
                 {
                  dataname: 'kaigotime',
                  title: '介護時間',
                  kbktitle: '',
                  width: 150,
                  align: 'left',
                 },
                 {
                  dataname: 'kenkojotai',
                  title: '健康状態',
                  kbktitle: '介護者の状態',
                  width: 80,
                  align: 'left',
                 },
                 {
                  dataname: 'bikou',
                  title: '特記事項',
                  kbktitle: '介護者の状態',
                  width: 340,
                  align: 'left',
                 },                                                                                                                                                                                       
                ]

                //ラジオボタン
                ,radio012: 'radio012-1'

                ,InsWinflg: false
                ,viewdata:[]  //画面表示用成形データ
                ,viewdata2:[]  //元データ

                //基本情報
                ,pmymd:''         //表示していデータの日付  
                ,pmymd_moto:''    //表示していデータの元日付
                ,pdataid:''        //表示しているデータのdataid
                ,pmymd_ymd:''        //表示しているデータのdataid
                ,intcode:0        //表示しているデータのintcode
                ,Ym:''
                ,picker:''
                ,GetApiData_reki:[]    //API取得データ(履歴)
                ,GetApiData_data:[]    //API取得データ(介護者データ)
                ,GetApiData_dataKoken:[]    //API取得データ(後見人データ)
                ,GetApiData_dataKazoku:[]    //API取得データ(家族データ)

                 //新規履歴登録
                 ,insflg:true       //T:新規登録 F:更新登録
                 ,InsWinhead:false  //新規履歴ダイアログフラグ
                 ,datepicker_dialog_head:false

                 //履歴参照ダイアログ
                 ,Rirekiwin:false
                 ,viewdata_reki:[] ,
                 viewdata_reki_kazoku:[] ,                

                //確認ダイアログ関係
                dialog_Message_flg:false,
                Dialog_Message:'',       //ダイアログメッセージ
                dialo_Yesflg:false,      //ダイアログ結果
                dialo_Yesflg_no:false,   //ダイアログ結果No 1:Yse 2:No
                Btnno_Visible:false,     //「いいえ」ボタン表示設定  
                  
                //調査日ダイアログ
                datepicker_dialog_tyosa: false, //調査日カレンダー

                //データ登録ダイアログ
                InsWindata:false,

                dialog_Actionflg:0,                     

                //履歴のラベル
                Label_Visible:false,

                //入力チェック
                inputchk:false,

                //画面表示用変数
                Get_inputinf:this.get_inputdata(),

                //介護者情報
                dispsimei:"",     //氏名
                disptuduki:"",    //続柄
                dispdoukyo:"",    //同居
                dispkazoku:"",    //家族
                dispkaigo:"",     //介護
                dispkzkdataid:0,  //家族dataid
                dispkzkcntid:0,   //家族cntid

                dispkaigotime:0,  //介護時間
                kaigotimeList:[],
                dispkaigojotai:0, //介護状態
                dispkaigobiko:"",  //介護備考


                //後見人
                dispkoken_kbn:0, //区分
                dispkoken_simei:"", //氏名
                dispkoken_kankei:"", //関係
                dispkoken_yubin1:"", //郵便番号1
                dispkoken_yubin2:"", //郵便番号2
                dispkoken_jyusyo:"", //住所
                dispkoken_renranku1_1:"", //連絡1_1
                dispkoken_renranku1_2:"", //連絡1_2
                dispkoken_renranku1_3:"", //連絡1_3
                dispkoken_renranku2_1:"", //連絡2_1
                dispkoken_renranku2_2:"", //連絡2_2
                dispkoken_renranku2_3:"", //連絡2_3
                
                insdataflg:false,  //F:新規 T:更新
                selected_btn:0,     //0:新規 1:更新

                 //ドラッグ関係
                  Dragflg:false,
                  mouseX:0,
                  mouseY:0,
                  screenX:0,
                  screenY:0,
                  moveX:0,
                  moveY:0,  

                  //データ入力ウィンドウ
                  kaigotime_list:[],
                  selkaigotime:0,         //介護時間
                  radio001:"radio001-K",  //ラジオボタン

                };
            },                           
            methods:{
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
                kbn: this.kotei_kbn,             //介護者
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
            onClickReki: function() 
            {
              this.Rirekiwin=true;
            },              
            newClick() {
                this.InsWinflg = true;
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
            }          
            //カレンダークリック          
            ,inputCalendarClick(kbn) 
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
              //調査日カレンダー
              this.Ym = dayjs(this.picker);
              this.pmymd = this.picker.replaceAll("-","");
              this.pmymd = this.pmymd.substring(0, 4)
                    + "年" + this.pmymd.substring(4, 6)
                    + "月" + this.pmymd.substring(6)
                    + "日",  
              this.datepicker_dialog_tyosa = false;
            }  
                
            ,onInitializeIcrnGrid(flexGrid)
            {
              let headerlist = this.HeaderList;
                
                flexGrid.beginUpdate();
                //flexGrid.cssClassAll = "Gridicrn010-001";

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[1].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height =30;
                flexGrid.columnHeaders.rows[1].height =30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header012'
                flexGrid.columnHeaders.rows[1].cssClassAll = 'column-header012'
                flexGrid.cells.rows.defaultSize = 20;
                flexGrid.alternatingRowStep = 0;
                flexGrid.columns.clear();
                
                for (let colIndex = 0; colIndex < headerlist.length; colIndex++) {
                    flexGrid.columns.insert(colIndex, new wjGrid.Column());
                    let col = flexGrid.columns[colIndex];
                    col.wordWrap = true;
                    col.binding = headerlist[colIndex].dataname;
                    col.header = headerlist[colIndex].title;
                    col.width = headerlist[colIndex].width;
                    col.align = headerlist[colIndex].align;
                    col.allowMerging = true;
                    col.multiLine = true;
                    col.allowResizing = false;                    

                    //区分タイトル
                    flexGrid.columnHeaders.setCellData(
                      0,
                      colIndex,
                      !headerlist[colIndex].kbktitle
                       ?headerlist[colIndex].title
                       :headerlist[colIndex].kbktitle
                    )
                    flexGrid.columnHeaders.setCellData(
                      1,
                      colIndex,
                      headerlist[colIndex].title
                    )                    

                }

                this.flex = flexGrid;
                flexGrid.hostElement.addEventListener("click",function(e){this.grid_click(e)}.bind(this));

                flexGrid.endUpdate();
            }
            ,Chk_Reki:function()
            {
              //履歴をチェックする

              if(this.Label_Visible == true )
              {
                this.Message_Dialog(sysConst.MSG_REKI_CRE,0)
                return false;
              }
              else{
                return true;
              }
            }              
            ,grid_click:function(e)
            {
              //データ格納
              if(this.Chk_Reki() == true)
              {

                var ht = this.flex.hitTest(e);
                if(ht.row >= 0)
                {
                  this.InsWindata = true;

                  this.dispkzkdataid = this.viewdata[ht.row].dataid;
                  this.dispkzkcntid = this.viewdata[ht.row].cntid;

                  this.dispsimei = this.viewdata[ht.row].riyonm;
                  this.disptuduki = this.viewdata[ht.row].tuduki;
                  this.dispdoukyo = this.viewdata[ht.row].doukyo;
                  this.dispkazoku = this.viewdata[ht.row].kzkkbn;
                  this.dispkaigo = this.viewdata[ht.row].kaigo;
                  this.dispkaigobiko  = this.viewdata[ht.row].bikou;
                  
                  if(this.viewdata[ht.row].kaigodata == true)
                  {
                    //データ有
                    this.selected_btn = 1; //更新
                    this.insdataflg = true;                  
                  }
                  else{
                    //データ無
                    this.selected_btn = 0; //新規
                    this.insdataflg = false;                                    
                  }

                  //データ格納
                  let winter = setInterval(() => {
                    //ラベル
                    var lbl03 = document.getElementById("clsstitle013-003_id");
                    var lbl05 = document.getElementById("clsstitle013-005_id");
                    var lbl07 = document.getElementById("clsstitle013-007_id");
                    var lbl09 = document.getElementById("clsstitle013-009_id");
                    var lbl11 = document.getElementById("clsstitle013-011_id");
                    var K1 = document.getElementById("radio001-K_text");
                    var S1 = document.getElementById("radio001-S_text");
                    
                    if(lbl03.style != null && lbl05.style != null 
                      && lbl07.style != null && lbl09.style != null && lbl11.style != null
                      && S1.style != null && K1.style != null)
                    {
                      clearInterval(winter);
                      lbl03.innerHTML = wjCore.escapeHtml(this.dispsimei);
                      lbl05.innerHTML = wjCore.escapeHtml(this.disptuduki);
                      lbl07.innerHTML = wjCore.escapeHtml(this.dispdoukyo);
                      lbl09.innerHTML = wjCore.escapeHtml(this.dispkazoku);
                      lbl11.innerHTML = wjCore.escapeHtml(this.dispkaigo);

                      this.dispkaigotime = this.viewdata[ht.row].kaigotimeid;
                      //ラジオボタン
                      S1.style.color = "#000";
                      K1.style.color = "#000";
                      if(this.viewdata[ht.row].kenkojotaiid == 2)
                      {
                        this.radio001 = "radio001-S";
                        S1.style.color = "#0081eb";
                      }
                      else
                      {
                        this.radio001 = "radio001-K";
                        K1.style.color = "#0081eb";
                      }
                      
                      this.DspkaigotimeInput();

                      //表示位置設定
                      
                      var wdialog = document.getElementById("data_012id");  
                      wdialog.style.bottom = (window.innerHeight - 515)/2 + "px";
                      wdialog.style.right =  (window.innerWidth - 440) /2 + "px";
                      
                    }
                    }, "interval");
                }
              }
            }
            ,onformatItem(flexgrid,e)
            { 
              if(flexgrid.columns.length == 0)
              {
                return;
              }

              if(e.panel == flexgrid.columnHeaders )
              {
                e.cell.style.borderRight = "1px solid #8ffd7a";
                e.cell.style.borderBottom = "1px solid #8ffd7a";              

                //背景色緑
                e.cell.style.backgroundColor = "#dffae0";
              }
            }
            ,onItemsSourceChanged(flexGrid)
            {
              flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            }
            

            //画面更新
            ,View_upd(intcode)
            {
              //画面更新
              this.$emit('child-dataupd', intcode); //画面更新
            }               
            
            //###ダイアログ###
            ,Message_Dialog(Message,actionflg)
            {
              //汎用メッセージダイアログ
              this.Dialog_Message = Message;
              this.dialog_Actionflg = actionflg;  //メッセージのみ
              this.Btnno_Visible = false;
              if(actionflg > 0) this.Btnno_Visible = true;
              this.dialog_Message_flg = true;

              //表示位置設定
              let winter = setInterval(() => {
              var wdialog = document.getElementById("kakunin_id012");
              if(wdialog.style != null)     
              {
                clearInterval(winter);
                //表示位置設定
                  
                wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
                wdialog.style.right =  (window.innerWidth - 260) /2 + "px";

              }}, "interval");              

            }
            
            ,onClick_Massege(kbn)
            {
              //確認ダイアログ判定
              if(kbn == 0)
              {
                this.dialo_Yesflg_no = 1;
                this.dialo_Yesflg = true;
                if(this.dialog_Actionflg == 1)
                {
                  //履歴の新規追加
                  this.Head_insData();
                }
                else if(this.dialog_Actionflg == 2)
                {
                  //履歴の削除
                  this.del_rekidata();
                }   
                else if(this.dialog_Actionflg == 3)
                {
                  //後見人データ登録
                  this.ins_inputdata_koken();
                }
                else if(this.dialog_Actionflg == 4)
                {
                  //介護者情報データ削除
                  this.del_inputdata();
                }
                else if(this.dialog_Actionflg == 5)
                {
                  //介護者情報データ登録
                  this.ins_inputdata();
                }      
                else if(this.dialog_Actionflg == 6)
                {
                  //前回コピー
                  this.DataCopy();
                }                                                
                if(this.dialog_Actionflg == 9)
                {
                  //画面移動チェック
                  this.dialog_Message_flg = false;
                }                                                 
              }
              else{
                this.dialo_Yesflg_no = 2;
                this.dialo_Yesflg = false;
              }

              this.dialog_Message_flg = false;
            }                                  

            //####新規履歴####
            ,onHeadclick_ins(){
              this.Ym = dayjs();
              this.insflg = true;//新規登録
              this.InsWinhead =true;
            }
            ,Click_colse(){
            //×ボタン
            this.InsWinhead =false;
          }
          ,onHead_ins()
          {
            //登録ボタン
            this.Message_Dialog("履歴を新規登録します。\nよろしいですか。",1); //履歴の新規追加
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
              kbn: this.kotei_kbn,//介護者
              intcode: this.intcode,
              insflg:INS_KBN_HEAD, //ヘッダ登録
            }
          
            //登録データ
            let postdata = 
            [
              {
                head_jigyoid: this.jigyoid_kotei,
                head_intcode: this.intcode,
                head_kbn: this.kotei_kbn,  //介護者
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
            this.GetApiData_data = [];        //介護者データ
            this.GetApiData_dataKazoku = [];
            this.GetApiData_dataKoken = [];   //後見人データ
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

            this.viewdata_reki_kazoku = [];
            this.viewdata = [];
            this.viewdata_reki = [];

            this.radio012="radio012-1"
            document.getElementById("chk012-001_text").style.color = "#0081eb";
            document.getElementById("chk012-002_text").style.color = "";
            document.getElementById("chk012-003_text").style.color = "";
            document.getElementById("chk012-004_text").style.color = "";              
            this.dispkoken_kbn = "";          //区分
            this.dispkoken_simei = "";        //氏名
            this.dispkoken_kankei = "";      //関係
            this.dispkoken_yubin1 = "";      //郵便番号1
            this.dispkoken_yubin2 = "";      //郵便番号2
            this.dispkoken_jyusyo = "";      //住所
            this.dispkoken_renranku1_1 = ""; //連絡1_1
            this.dispkoken_renranku1_2 = ""; //連絡1_2
            this.dispkoken_renranku1_3 = ""; //連絡1_3
            this.dispkoken_renranku2_1 = ""; //連絡2_1
            this.dispkoken_renranku2_2 = ""; //連絡2_2
            this.dispkoken_renranku2_3 = ""; //連絡2_3

          }
        //フィルター
        ,DataFilter() { 
          let Rekidata = [];
          let Rekidata_kzk = [];
          let wk_Rekidata = [];
          let wk_kbn = this.kotei_kbn;

          if(this.GetApiData_reki.icrn_inf != null)
          {                    
            //介護者のデータのみに絞る
            this.GetApiData_reki.icrn_inf.forEach(function (value) {

            //区分が介護者
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
            }
            else if (value.head_kbn == 100)
            {
              //履歴データ取得(家族)
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
                Rekidata_kzk.push(wk_Rekidata);
              }
            }
          });

          //履歴ソート(降順)
          Rekidata.sort(function(a,b){
            if(a.head_mymd > b.head_mymd) return -1;
            if(b.head_mymd > a.head_mymd) return 1;
          });          
          Rekidata_kzk.sort(function(a,b){
            if(a.head_mymd > b.head_mymd) return -1;
            if(b.head_mymd > a.head_mymd) return 1;
          });

          this.viewdata_reki = Rekidata.concat();
          this.viewdata_reki_kazoku = Rekidata_kzk.concat();  //家族情報の履歴を確保

          //クリックイベントを呼んでみる
          if(this.viewdata_reki.length > 0)
          {
            this.pdataid = this.viewdata_reki[0].head_dataid;
            this.pmymd_ymd  = this.viewdata_reki[0].head_mymd;  //データ表示用に保存
            this.get_data();       
          }
          }
        }

        ,get_data() 
        {
          //選択されたデータを持ってくる
          //API取得
          let _self = this;
          let params_kazku = [];
          let params = [];
          let ymd = this.ymd;             
          let intcode = this.intcode;         


          //介護者パラメータ
          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,    
            ymd: ymd,
            intcode: intcode,               

            Jigyoid: this.jigyoid_kotei,
            Kbn: this.kotei_kbn,               //介護者情報
            Dataid: this.pdataid,
            Modeflg: GET_KBN_DATA,             //データ取得
          };

          getConnect('/Koteiinf_KAZOKU', params,'KOTEIINF').then((result) => {
            _self.GetApiData_dataKoken = result;
            //データ取得できた場合家族情報を取得する
            let kzk_dataid = 0;
            let wk_Ymd = "";
            let wk_Ymd2 = "";

            wk_Ymd = this.pmymd_ymd.replace("年","");
            wk_Ymd = wk_Ymd.replace("月","");
            wk_Ymd = wk_Ymd.replace("日","");            

            if(wk_Ymd != "")  //介護者情報の履歴がある場合
            {
              for(let i = 0 ; i < this.viewdata_reki_kazoku.length;i++)
              {
                wk_Ymd2 = this.viewdata_reki_kazoku[i].head_mymd.replace("年","");
                wk_Ymd2 = wk_Ymd2.replace("月","");
                wk_Ymd2 = wk_Ymd2.replace("日","");            
                
                if (this.viewdata_reki_kazoku[i].head_kbn == 100 && wk_Ymd >= wk_Ymd2)
                {
                  kzk_dataid = this.viewdata_reki_kazoku[i].head_dataid;
                  break;
                }
              }
            }

            if(kzk_dataid > 0)
            {
              //家族情報パラメータ
              params_kazku = {
                uniqid: this.uniqid,
                traceid: this.traceid,    
                ymd: ymd,
                intcode: intcode,               

                Jigyoid: this.jigyoid_kotei,
                Kbn: 100,               //家族情報
                Dataid: kzk_dataid,
                Modeflg: GET_KBN_DATA,             //データ取得
              };

              getConnect('/Koteiinf_KAZOKU', params_kazku,'KOTEIINF').then((result) => {
                _self.GetApiData_dataKazoku = result;
                this.DataFilter2();
              });

            }
            else
            {
              //直近の家族情報無
              this.viewdata = [];
              this.dispkoken_kbn = "";          //区分
              this.dispkoken_simei = "";        //氏名
              this.dispkoken_kankei = "";      //関係
              this.dispkoken_yubin1 = "";      //郵便番号1
              this.dispkoken_yubin2 = "";      //郵便番号2
              this.dispkoken_jyusyo = "";      //住所
              this.dispkoken_renranku1_1 = ""; //連絡1_1
              this.dispkoken_renranku1_2 = ""; //連絡1_2
              this.dispkoken_renranku1_3 = ""; //連絡1_3
              this.dispkoken_renranku2_1 = ""; //連絡2_1
              this.dispkoken_renranku2_2 = ""; //連絡2_2
              this.dispkoken_renranku2_3 = ""; //連絡2_3

            }
          })
        }
          
        ,DataFilter2() 
        { 
          let data_koken = [];        //後見人データ
          let data_kazoku = [];       //家族情報表示データ
          let wk_data_kazoku = [];     //家族情報表示データワーク
          let wdataid = this.pdataid;
          let wk_Ymd = "";
          let dataflg = false;     
          let wk_kbn = this.kotei_kbn;           

          //家族情報
          if(this.GetApiData_dataKazoku.icrn_inf != null)
          {
            let kzk_dataid = 0; //家族データID
            this.GetApiData_dataKazoku.icrn_inf.forEach(function (value) {
                
            //区分が家族情
            kzk_dataid = value.head_dataid;
            //内容をループ
            value.naiyo.forEach(function(value2){

            let wk_doukyo ="";
            let wk_kzkkbn ="";
            let wk_kaigokbn ="";
            if(value2.kazoku_doukyokbn == 1)
              {
                wk_doukyo = "同居";
              }
              else
              {
                wk_doukyo = "非同居";
              }

              if(value2.kazoku_kazokukbn == 1)
              {
                wk_kzkkbn = "家族";
              }
              else
              {
                wk_kzkkbn = "その他";
              }
              
              if(value2.kazoku_kaigokbn_syu == 1){wk_kaigokbn = "主介護者"}
              if(value2.kazoku_kaigokbn_fuku1 == 1){wk_kaigokbn = "副介護者①"}
              if(value2.kazoku_kaigokbn_fuku2 == 1){wk_kaigokbn = "副介護者②"}
              
              wk_data_kazoku ={
                dataid:kzk_dataid,
                cntid:value2.kazoku_cntid,
                riyonm:value2.kazoku_kazokuname,
                tuduki:value2.kazoku_tuzukigarachuname,
                doukyo:wk_doukyo,
                kzkkbn:wk_kzkkbn,
                kaigo:wk_kaigokbn,
                kaigotimeid:"",
                kaigotime:"",
                kenkojotai:"",
                kenkojotaiid:0,
                bikou:"",
                kaigodata:false //T:介護者データ有 F:介護者データ無
              }

              data_kazoku.push(wk_data_kazoku); //データ格納

            });

            });
          }
          
          //介護者情報をセット
          if(this.GetApiData_dataKoken.icrn_inf != null )
          {                       
            //介護者のデータのみに絞る
            this.GetApiData_dataKoken.icrn_inf.forEach(function (value) {

              if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {
                //後見人
                wk_Ymd = value.head_mymd.substring(0, 4)
                  + "年" + value.head_mymd.substring(4, 6)
                  + "月" + value.head_mymd.substring(6)
                  + "日",  
                
                  //介護者ヘッダの内容を取得
                  value.naiyo.forEach(function(value2){
                    if (value2.naiyo_kbn == 0)
                    {
                      for(let i = 0 ;i < data_kazoku.length;i++)
                      {
                        if(data_kazoku[i].cntid == value2.kaigosya_kzkcntid
                          && data_kazoku[i].dataid == value2.kaigosya_kzkdataid)
                        {
                          //データが一致した場合格納する
                          data_kazoku[i].kaigotimeid =  value2.kaigosya_kaigojikan;       //介護時間
                          data_kazoku[i].kaigotime =    value2.kaigosya_kaigojikanname;   //介護時間
                          data_kazoku[i].kenkojotaiid = value2.kaigosya_kaigojyotai;      //介護状態
                          if(value2.kaigosya_kaigojyotai == 1)
                          {
                            data_kazoku[i].kenkojotai = "健康";
                          }
                          else{
                            data_kazoku[i].kenkojotai = "病気がち";
                          }

                          data_kazoku[i].bikou = value2.kaigosya_biko;              //介護備考
                          data_kazoku[i].kaigodata = true;                         //データ有
                        }

                      }
                    }                     
                    else if(value2.naiyo_kbn == 1)
                    {
                      //後見人
                      dataflg = true;
                      data_koken.push(value2);
                    }  
                });
              }
            });
          
            //直近の家族情報を取得する
            this.str_ymd = wk_Ymd;
            this.pmymd = this.str_ymd;
            this.pmymd_moto = this.str_ymd;
            this.viewdata2 = data_koken.concat(); //後見人
            //家族情報をセット
            this.viewdata = data_kazoku.concat();   //家族情報

            //後見人データセット
            if(data_koken.length > 0)
            {
              this.dataflg = dataflg;
              this.dispkoken_kbn = data_koken[0].koken_kbn;                      //区分
              switch(this.dispkoken_kbn)
              {
                case 1:
                  this.radio012 = "radio012-1";
                  document.getElementById("chk012-001_text").style.color = "#0081eb";
                  document.getElementById("chk012-002_text").style.color = "";
                  document.getElementById("chk012-003_text").style.color = "";
                  document.getElementById("chk012-004_text").style.color = "";                  
                  break;
                case 2:
                this.radio012 = "radio012-2";
                  document.getElementById("chk012-001_text").style.color = "";
                  document.getElementById("chk012-002_text").style.color = "#0081eb";
                  document.getElementById("chk012-003_text").style.color = "";
                  document.getElementById("chk012-004_text").style.color = "";                  
                  break;
                case 3:
                this.radio012 = "radio012-3";
                  document.getElementById("chk012-001_text").style.color = "";
                  document.getElementById("chk012-002_text").style.color = "";
                  document.getElementById("chk012-003_text").style.color = "#0081eb";
                  document.getElementById("chk012-004_text").style.color = "";                  
                  break;
                case 4:
                this.radio012 = "radio012-4";
                  document.getElementById("chk012-001_text").style.color = "";
                  document.getElementById("chk012-002_text").style.color = "";
                  document.getElementById("chk012-003_text").style.color = "";
                  document.getElementById("chk012-004_text").style.color = "#0081eb";                  
                  break;
              }
              
              this.dispkoken_simei = data_koken[0].koken_simei;                  //氏名
              this.dispkoken_kankei = data_koken[0].koken_kankei;                //関係
              this.dispkoken_yubin1 = data_koken[0].koken_yubinno1;        //郵便番号1
              this.dispkoken_yubin2 = data_koken[0].koken_yubinno2;        //郵便番号2
              this.dispkoken_jyusyo = data_koken[0].koken_jyusyo;          //住所
              this.dispkoken_renranku1_1 = data_koken[0].koken_renraku1_1; //連絡1_1
              this.dispkoken_renranku1_2 = data_koken[0].koken_renraku1_2; //連絡1_2
              this.dispkoken_renranku1_3 = data_koken[0].koken_renraku1_3; //連絡1_3
              this.dispkoken_renranku2_1 = data_koken[0].koken_renraku2_1; //連絡2_1
              this.dispkoken_renranku2_2 = data_koken[0].koken_renraku2_2; //連絡2_2
              this.dispkoken_renranku2_3 = data_koken[0].koken_renraku2_3; //連絡2_3
            }
            else{
              this.dataflg = false;
              this.dispkoken_kbn = "";                      //区分

              this.radio012 = "radio012-1";
              document.getElementById("chk012-001_text").style.color = "#0081eb";
              document.getElementById("chk012-002_text").style.color = "";
              document.getElementById("chk012-003_text").style.color = "";
              document.getElementById("chk012-004_text").style.color = "";                  
              
              this.dispkoken_simei = "";                  //氏名
              this.dispkoken_kankei = "";                //関係
              this.dispkoken_yubin1 = "";        //郵便番号1
              this.dispkoken_yubin2 = "";        //郵便番号2
              this.dispkoken_jyusyo = "";          //住所
              this.dispkoken_renranku1_1 = ""; //連絡1_1
              this.dispkoken_renranku1_2 = ""; //連絡1_2
              this.dispkoken_renranku1_3 = ""; //連絡1_3
              this.dispkoken_renranku2_1 = ""; //連絡2_1
              this.dispkoken_renranku2_2 = ""; //連絡2_2
              this.dispkoken_renranku2_3 = ""; //連絡2_3              
              }

          }
        }

        //ウィンドウ新規、更新ボタン
        ,onDataIns_click(){
          //データダイアログ 新規
          this.insdataflg = false;
        }            
        ,onDataUpd_click(){
          //データダイアログ 更新
          this.insdataflg = true;
        } 

        //履歴参照
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
                      this.ins_inputdata_koken(1);                
                    }

                    this.inputchk = false //入力チェックリセット
                    //グリッドがクリックされた場合画面の表示を更新する                
                    this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                    this.pmymd_ymd  = this.viewdata_reki[ht.row].head_mymd;  //データ表示用に保存
                    this.get_data();
                  }
              }, "interval");
            }
            else{
              //グリッドがクリックされた場合画面の表示を更新する                
              this.inputchk = false;
              this.pdataid = this.viewdata_reki[ht.row].head_dataid;
              this.pmymd_ymd  = this.viewdata_reki[ht.row].head_mymd;  //データ表示用に保存
              this.get_data();
            }            
                                    
          }

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
                      this.ins_inputdata_koken(1);                
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
        ,Click_colse_Reki(){
          this.Rirekiwin =false;
        }

        //###データ登録・削除###
        ,onClickclr()
        {
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
        ,ins_inputdata_koken(kbn){

          //データ登録処理
          if(this.pmymd != this.pmymd_moto)
          {
            this.insflg = false;
            this.Head_insData(1);
          }

          //データダイアログ 登録          
          let inskoken_kbn = 1;                 //区分
          if(this.radio012 == "radio012-1")
          {
            inskoken_kbn = 1;
          }
          else if(this.radio012 == "radio012-2")
          {
            inskoken_kbn = 2;
          }
          else if(this.radio012 == "radio012-3")
          {
            inskoken_kbn = 3;
          }
          else if(this.radio012 == "radio012-4")
          {
            inskoken_kbn = 4;
          }
          
          let inskoken_simei = this.dispkoken_simei;             //氏名
          let inskoken_kankei = this.dispkoken_kankei;           //関係
          let inskoken_yubin1 = this.dispkoken_yubin1;           //郵便番号1
          let inskoken_yubin2 = this.dispkoken_yubin2;           //郵便番号2
          let inskoken_jyusyo = this.dispkoken_jyusyo;           //住所
          let inskoken_renranku1_1 = this.dispkoken_renranku1_1; //連絡1_1
          let inskoken_renranku1_2 = this.dispkoken_renranku1_2; //連絡1_2
          let inskoken_renranku1_3 = this.dispkoken_renranku1_3; //連絡1_3
          let inskoken_renranku2_1 = this.dispkoken_renranku2_1; //連絡2_1
          let inskoken_renranku2_2 = this.dispkoken_renranku2_2; //連絡2_2
          let inskoken_renranku2_3 = this.dispkoken_renranku2_3; //連絡2_3

          //パラメータ
          let _self = this;
          let params = [];
          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
            kbn: 103, //後見人
            intcode: this.intcode,
            insflg:INS_KBN_NAIYO, //内容登録
          }          

          //登録データ
          let putdata = 
          [
            {
              head_jigyoid: this.jigyoid_kotei,
              head_intcode: this.intcode,
              head_kbn: 103,  //住環境
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
              koken_kbn: inskoken_kbn,
              koken_simei: inskoken_simei,
              koken_kankei: inskoken_kankei,
              koken_yubinno1: inskoken_yubin1,
              koken_yubinno2: inskoken_yubin2,
              koken_jyusyo: inskoken_jyusyo,
              koken_renraku1_1: inskoken_renranku1_1,
              koken_renraku1_2: inskoken_renranku1_2,
              koken_renraku1_3: inskoken_renranku1_3,
              koken_renraku2_1: inskoken_renranku2_1,
              koken_renraku2_2: inskoken_renranku2_2,
              koken_renraku2_3: inskoken_renranku2_3,
              jyukan_kyojyukbn: 0              
            }
          ];
          
          if(this.dataflg == true)
          {
            //更新
            putConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',putdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              if(kbn != 1)this.View_upd(this.intcode);
            });            
          }
          else{
            //新規
            postConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',putdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              if(kbn != 1)this.View_upd(this.intcode);
            });            
          }



        }

        ,click_text(kbn)
        {
          this.inputchk = true;//入力チェックT
          switch(kbn)
          {
            //区分
            case 0:
              document.getElementById("chk012-001_text").style.color = "#0081eb";
              document.getElementById("chk012-002_text").style.color = "";
              document.getElementById("chk012-003_text").style.color = "";
              document.getElementById("chk012-004_text").style.color = "";
              break;
            case 1:
              document.getElementById("chk012-001_text").style.color = "";
              document.getElementById("chk012-002_text").style.color = "#0081eb";
              document.getElementById("chk012-003_text").style.color = "";
              document.getElementById("chk012-004_text").style.color = "";
              break;
            case 2:
              document.getElementById("chk012-001_text").style.color = "";
              document.getElementById("chk012-002_text").style.color = "";
              document.getElementById("chk012-003_text").style.color = "#0081eb";
              document.getElementById("chk012-004_text").style.color = "";
              break;
            case 3:
              document.getElementById("chk012-001_text").style.color = "";
              document.getElementById("chk012-002_text").style.color = "";
              document.getElementById("chk012-003_text").style.color = "";
              document.getElementById("chk012-004_text").style.color = "#0081eb";
              break;  
            case 4:
              document.getElementById("radio001-K_text").style.color = "#0081eb";
              document.getElementById("radio001-S_text").style.color = "";
              break;               
            case 5:
              document.getElementById("radio001-K_text").style.color = "";
              document.getElementById("radio001-S_text").style.color = "#0081eb";
              break;              
          }

        }         

        ,text_input(kbn)
        {
          //文字数制限とかやる
          this.inputchk = true;

          switch(kbn)
          {
            case 0://氏名
            {
              let textarea = document.getElementById("clssinp012-001_id");
              //文字数制御
              if(textarea.value.length > 15) //文字数制限
              {
                this.dispkoken_simei = textarea.value.substring(0,15);
              }            
            }
            break;

            case 1://関係
            {
              let textarea = document.getElementById("clssinp012-005_id");
              //文字数制御
              if(textarea.value.length > 15) //文字数制限
              {
                this.dispkoken_kankei = textarea.value.substring(0,15);
              }            
            }
            break;
            
            case 2://郵便番号左
            {
              let textarea = document.getElementById("clssinp012-002_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_yubin1 = textarea.value.substring(0,5);
              }            
            }
            break;
            case 3://郵便番号左
            {
              let textarea = document.getElementById("clssinp012-003_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_yubin2 = textarea.value.substring(0,5);
              }            
            }            
            break;
                        
            case 4://住所
            {
              let textarea = document.getElementById("clssinp012-004_id");
              //文字数制御
              if(textarea.value.length > 200) //文字数制限
              {
                this.dispkoken_jyusyo = textarea.value.substring(0,200);
              }            
            }            
            break;

            case 5://連絡先1_1
            {
              let textarea = document.getElementById("clssinp012-006-001_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_renranku1_1 = textarea.value.substring(0,5);
              }            
            }            
            break;

            case 6://連絡先1_2
            {
              let textarea = document.getElementById("clssinp012-006-002_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_renranku1_2 = textarea.value.substring(0,5);
              }            
            }            
            break;            

            case 7://連絡先1_3
            {
              let textarea = document.getElementById("clssinp012-006-003_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_renranku1_3 = textarea.value.substring(0,5);
              }            
            }            
            break;            

            case 8://連絡先2_1
            {
              let textarea = document.getElementById("clssinp012-006-004_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_renranku2_1 = textarea.value.substring(0,5);
              }            
            }            
            break;

            case 9://連絡先2_2
            {
              let textarea = document.getElementById("clssinp012-006-005_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_renranku2_2 = textarea.value.substring(0,5);
              }            
            }            
            break;            

            case 10://連絡先2_3
            {
              let textarea = document.getElementById("clssinp012-006-005_id");
              //文字数制御
              if(textarea.value.length > 5) //文字数制限
              {
                this.dispkoken_renranku2_3 = textarea.value.substring(0,5);
              }            
            }            
            break;
            
            case 11://健康状態備考欄
            {
              let textarea = document.getElementById("clssinp013-003_id");
              //文字数制御
              if(textarea.value.length > 200) //文字数制限
              {
                this.dispkaigobiko = textarea.value.substring(0,200);
              }            
            }            
            break;

          }
        }
        
        ,get_inputdata() 
        {
          //介護時間を取得
          
          //API取得
          let _self = this;
          let params = [];
          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,    
            pJigyoid: this.jigyoid,               
          };
          //介護時間
          
          getConnect('/Mst_kaigojikan', params,'KOTEIINF').then((result) => {
            _self.Get_inputinf = result;
          });
                     
        }
        ,DspkaigotimeInput(){
          //住居区分をセット

          let wk_input_data = [];
          let wk_input_list = [];

          //空データ
          wk_input_data = 
          {
            id:0,
            name:"",
          }
          wk_input_list.push(wk_input_data);
          this.kaigotimeList = wk_input_list.concat();

          if(this.Get_inputinf.icrn_inf != null)
          {                    
            //取得したデータを確保
            this.Get_inputinf.icrn_inf.forEach(function (value) {
              wk_input_data = 
              {
                id:value.id,
                name:value.name,
              }
              wk_input_list.push(wk_input_data);

            });
            this.kaigotimeList = wk_input_list.concat();

          }

        }        
        ,onClick_dataclr(){
          //データ削除ボタン
          this.dispkaigotime=0;  //介護時間
          this.radio001 = "radio001-K";
          this.dispkaigobiko="";  //介護備考
        }
        ,onClick_datadel(){
          //データ削除ボタン
          this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK,4); //入力データ登録
        }

        ,del_inputdata()
        {
          //データダイアログ 削除

          //削除ボタン
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
              cntid:this.dispkzkcntid,
              kzkid:this.dispkzkdataid,
              lcnt:0,
              headflg:DEL_KBN_DATA,
          }

          //削除処理
          deleteConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',deldata).then((result) => {
              _self.griddatadel = result.icrn_inf;
              _self.gridSeldatadel = result;
              this.View_upd(this.intcode);
              this.Message_Dialog(sysConst.MSG_DATA_DEL,0);
            });
        }

        ,onClick_datains(){
          //データ登録ボタン
          this.Message_Dialog(sysConst.MSG_DATA_INS_CHK,5); //入力データ登録
        }

        ,ins_inputdata(){
          //データ登録処理

          //データダイアログ 登録          
          let ins_kzkdataid = 0;   //家族情報データID
          let ins_kzkcntid = 0;    //家族情報CNTID
          let ins_kaigojikan = 0;  //介護時間
          let ins_kaigojotai = 0;  //介護状態
          let ins_kaigobiko = 0;  //介護備考
          
          //データセット
          ins_kzkdataid = this.dispkzkdataid;
          ins_kzkcntid = this.dispkzkcntid;
          ins_kaigojikan = this.dispkaigotime;
          ins_kaigojotai = 1; //健康
          ins_kaigobiko = this.dispkaigobiko;

          if(this.radio001 == "radio001-S")
          {
            ins_kaigojotai = 2;
          }

          //パラメータ
          let _self = this;
          let params = [];
          params = {
            uniqid: this.uniqid,
            traceid: this.traceid,                                
            kbn: this.kotei_kbn, //介護者情報
            intcode: this.intcode,
            insflg:INS_KBN_NAIYO, //内容登録
          }          

          //登録データ
          let putdata = 
          [
            {
              head_jigyoid: this.jigyoid_kotei,
              head_intcode: this.intcode,
              head_kbn: this.kotei_kbn,  //介護者情報
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
              kaigosya_kzkdataid: ins_kzkdataid,
              kaigosya_kzkcntid: ins_kzkcntid,
              kaigosya_kaigojikan: ins_kaigojikan,
              kaigosya_kaigojyotai: ins_kaigojotai,
              kaigosya_biko: ins_kaigobiko,
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

          if(this.insdataflg == true)
          {
            //更新
            putConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',putdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              this.View_upd(this.intcode);
              //メッセージ
              this.Message_Dialog(sysConst.MSG_DATA_INS);
            });            
          }
          else{
            //新規
            postConnect('/Koteiinf_KAZOKU', params,'KOTEIINF',putdata).then((result) => 
            {
              _self.griddata = result.icrn_inf;
              _self.gridSeldata = result;
              this.View_upd(this.intcode);
              //メッセージ
              this.Message_Dialog(sysConst.MSG_DATA_INS);
            });            
          }
        }
        ,onselectClicked()
        {
          this.inputchk = true;
        }

        ,win_drag :function(e){
          //ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("head_win_012id");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 255) /2 + "px";  

          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
          },
          win_move :function(e){
            //ドラッグ
            
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("head_win_012id");
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
            var wdialog = document.getElementById("kakunin_id012");  
            if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
            if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 260) /2 + "px";  
            this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
            this.screenX = parseInt(wdialog.style.right.replace("px","")); 
          },
          win_move_Msg :function(e){
            //ドラッグ
            
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("kakunin_id012");
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
            var wdialog = document.getElementById("rireki_id012");  
            if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 210)/2 + "px";
            if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 280) /2 + "px";  
            this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
            this.screenX = parseInt(wdialog.style.right.replace("px","")); 
          },
          win_move_reki :function(e){
            //履歴参照ドラッグ
            
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("rireki_id012");
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
          }                       
          ,win_drag_data :function(e){
            //ドラッグ
            this.Dragflg = true;
            this.mouseX = e.screenX;
            this.mouseY = e.screenY;
            
            var wdialog = document.getElementById("data_012id");  
            if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 515)/2 + "px";
            if(wdialog.style.right == "")wdialog.style.right =  (window.innerWidth - 440) /2 + "px";  
            this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
            this.screenX = parseInt(wdialog.style.right.replace("px",""));
          },
          win_move_data :function(e){
            //ドラッグ
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("data_012id");
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
          win_up_data :function(){
            //ドラッグ
            this.Dragflg = false;
          }

          //####登録ウィンドウ####
          ,input_chk: function()
          {
            //入力項目があれば登録メッセージ
            if(this.inputchk == true)
            {
              this.Message_Dialog("登録されていない項目があります。\n 登録しますか。",9); 
            }
          } 

          ,Click_colse_win(){
            //×ボタン
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
                      this.insflg=false
                      this.ins_inputdata();                 
                    }
                    this.inputchk = false //入力チェックリセット
                    //閉じる                
                    this.InsWindata =false;
                  }
              }, "interval");
            }
            else
            {
              //閉じる                
              this.InsWindata =false;
            }          

        }
      }
}
</script>

<style lang="scss">
@import '../assets/scss/common.scss';
    /*全体エリア*/
    .clssheet-chu012{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height:  660px;

    position: relative;

  }
  /*タイトル*/
  .clsstitle012-001{
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
  }
  /*タイトルエリア*/
  .area012-001{
    display :inline-flex;
    width: 470px;
    height: 25px;
  }
  /*右上ボタンエリア*/
  .area012-002{
    display :inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
  }

  /*グリッドエリア
  .area012-003{
    display :inline-flex;
    width: 940px;
    height: 200px;
  }
  */
    /*グリッドエリア*/
  .Gridicrn012-001{
    margin-top: 10px;
    width: 940px;
    height: 220px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
  }

  .column-header012{
  font-size:medium;
  font-weight:normal !important;
  text-align: center !important;
  //background-color: #dffae0 !important;
  //border-color: #8ffd7a !important;
  }

  /*表示順設定*/
  .clsbtnmenu012-hyoji{
    margin-top: 0px;
    margin-left: 829px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .area012-005{
    display: inline-flex;
    width:940;
    height: 600;
  }

  .clsstitle012-003
  {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 328px;
    width: 90px;
    line-height:328px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .area012-005-001{
    display :inline-flex;
    margin-top: 5px;
    margin-left: 5px;
    width: 370px;
    height: 30px;
    flex-wrap: wrap;

    border: 1px solid;
    border-color: #7e7e7e;

  }

  .area012-005-001-chk{
    display :inline-flex;
    width: 280px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
    flex-wrap: wrap;
  }

  .chk012-001
  {
    margin-top: -1px;
    margin-left: 10px ;
  }
  .chklabel012-001
  {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 16px;
  }

  .chk012-002
  {
    margin-top: -1px;
    margin-left: 10px ;
  }
  .chklabel012-002
  {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 16px;
  }

  .chk012-003
  {
    margin-top: -1px;
    margin-left: 10px ;
  }
  .chklabel012-003
  {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 16px;
  }

  .chk012-004
  {
    margin-top: 0px;
    margin-left: 10px ;
    display :inline-flex;
  }
  .chklabel012-004
  {
    display :inline-flex;
    margin-top: 5px;
    margin-left: 10px;
    font-size: 16px;
  }

  .area012-005-002{
    display :inline-flex;
    margin-top: 5px;
    margin-left: 5px;
    width: 300px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
  }

    /*氏名ラベル*/ 
    .clsstitle012-004
  {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp012-001
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 250px;
    height: 30px;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  }

    /*住所*/
    .area012-005-001-address{
    display :inline-flex;
    margin-top: 3px;
    width: 900px;
    height: 30px;
  }

  /*住所-ラベル*/ 
  .clsstitle012-005
  {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 150px;
    width: 90px;
    line-height:150px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

    /*住所-郵便番号エリア*/
    .area012-005-001-address-001{
    display :inline-flex;
    margin-top: 3px;
    width: 330px;
    height: 70px;
    flex-wrap: wrap;
  }

  .clsstitle012-005-001
  {
    background-color: #dffae0;
    margin-top: 2px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 50px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
    color:#f00808;
  }

  .clsstitle012-005-002
  {
    background-color: #dffae0;
    margin-top: 2px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 50px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp012-002
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 2px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }


  .clssinp012-003
  {
    background-color: #ffffff;
    margin-left: 8px;
    margin-top: 2px;
    width: 85px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

  .clssinp012-004
  {
    background-color: #ffffff;
    margin-top: 5px;
    margin-left: 5px;
    width: 330px;
    height: 113px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;    
  }


    /*関係ラベル*/ 
    .clsstitle012-006
  {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp012-005
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 250px;
    height: 30px !important;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  }

    /*連絡先エリア*/
  .area012-005-001-renraku1{
    display :inline-flex;
    margin-top: 125px;
    width: 900px;
    height: 30px;
  }

      /*連絡先エリア*/
      .area012-005-001-renraku2{
    display :inline-flex;
    margin-top: 5px;
    width: 900px;
    height: 90px;
  }

   /*連絡先①ラベル*/ 
  .clsstitle012-007-001
  {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle012-007-002
  {
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height:30px;
    text-align: center;
  }

  .clsstitle012-007-003
  {
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height:30px;
    text-align: center;
  }

  .clssinp012-006-001
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  }

  .clssinp012-006-002
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  }
  
  .clssinp012-006-003
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  } 

   /*連絡先①ラベル*/ 
   .clsstitle012-007-004
  {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle012-007-005
  {
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px !important;
    line-height:30px;
    text-align: center;
  }

  .clsstitle012-007-006
  {
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px !important;
    line-height:30px;
    text-align: center;
  }

  .clssinp012-006-004
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  }

  .clssinp012-006-005
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  }
  
  .clssinp012-006-006
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;    
  } 

      /*ボタンエリア*/
      .area012-006{
    margin-top: 0px;
    width: 955px;
    height: 25px;
  }
  /*クリアボタン*/
  .clsbtnmenu012-clr{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*削除ボタン*/
  .clsbtnmenu012-del{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*登録ボタン*/
  .clsbtnmenu012-ins{
    margin-top: 20px;
    margin-left: 717px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

    //履歴無しラベル1
    .clsstitle1_Noreki_back_012
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128,128,128,0.55);
    height: 660px;
    width: 955px;
    line-height:660px;
    text-align: center;
  }
  //履歴無しラベル2
  .clsstitle1_Noreki_012
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 230px;
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


  //入力画面
  .clssheet-chu013{
    border-radius: 10px 10px 10px 10px;
    
    padding: 5px 5px;
    /*
    margin-top: 5px;
    margin-left: 5px;
    */
    width: 440px;
    height:  515px;
  }
  .area013-001{
    display :inline-flex;
    width: 500px;
    height: 25px;
  }
  .clsstitle013-001{
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 400px;
    height: 25px;
    text-align: center;
  }
  .area013-002{
    display :inline-flex;
    margin-top: 10px;
    width: 440px;
    height: 25px;
  }

  /*氏名エリア*/
  .area013-003{
    margin-top: 20px;
    width: 440px;
    height: 30px;
    display :inline-flex;
  }

  /*氏名-ラベル*/ 
  .clsstitle013-002
  {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
  }

  .clsstitle013-003{
    background-color: #fffeee;
    margin-left: 3px;
    width: 249px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
  }

    /*続柄エリア*/
    .area013-004{
    margin-top: 5px;
    width: 600px;
    height: 30px;
    display :inline-flex;
  }

  /*続柄-ラベル*/ 
  .clsstitle013-004
  {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
  }

  .clsstitle013-005{
    background-color: #fffeee;
    margin-left: 3px;
    width: 249px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
  }

  /*同居区分エリア*/
  .area013-005{
    margin-top: 5px;
    width: 600px;
    height: 30px;
    display :inline-flex;
  }

  /*同居区分-ラベル*/ 
  .clsstitle013-006
  {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
  }

  .clsstitle013-007{
    background-color: #fffeee;
    margin-left: 3px;
    width: 120px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
  }

  /*家族区分エリア*/
  .area013-006{
    margin-top: 5px;
    width: 600px;
    height: 30px;
    display :inline-flex;
  }

  /*家族区分-ラベル*/ 
  .clsstitle013-008
  {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
  }

  .clsstitle013-009{
    background-color: #fffeee;
    margin-left: 3px;
    width: 120px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
  }

    /*介護区分エリア*/
    .area013-007{
    margin-top: 5px;
    width: 600px;
    height: 30px;
    display :inline-flex;
  }

  /*介護区分-ラベル*/ 
  .clsstitle013-010
  {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
  }

  .clsstitle013-011{
    background-color: #fffeee;
    margin-left: 3px;
    width: 160px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
  }

  .hr_style013-001{
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid rgb(52, 104, 201);
    margin-top: 11px;
  }

    /*介護時間エリア*/
    .area013-008{
    margin-top: 5px;
    width: 600px;
    height: 30px;
    display :inline-flex;
  }

  /*介護時間-ラベル*/   
  .clsstitle013-012
  {
    margin-top: 2px;
    background-color: #dffae0;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp013-001
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

  /*介護者の状態*/ 
  .area013-009
  {
    margin-top: 5px;
    width: 600px;
    height: 30px;
    display :inline-flex;
  }

  .clsstitle013-013
{
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 158px;
    width: 90px;
    line-height:158px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.area013-009-001
{
    display :inline-flex;
    margin-top: 5px;
    margin-left: 5px;
    width: 500px;
    height: 30px;
    flex-wrap: wrap;
}

.area013-009-001-chk
{
    width: 210px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
    flex-wrap: wrap;
}
.clssinp013-002-kenko
  {
    margin-left: 3px;
    margin-top: -3px;
    text-align: left;
  }
  .clssinp013-002-sick
  {
    margin-left: 3px;
    margin-top: -3px;
    text-align: left;
  }

  .clssinp013-003
  {
    background-color: #ffffff;
    margin-top: 5px;
    margin-left: 0px;
    width: 330px;
    height: 122px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;        
  }

      /*ボタンエリア*/
      .area013-010{
    margin-top: 55px;
    width: 600px;
    height: 25px;
  }
  /*クリアボタン*/
  .clsbtnmenu013-clr{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*削除ボタン*/
  .clsbtnmenu013-del{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*登録ボタン*/
  .clsbtnmenu013-ins{
    margin-top: 20px;
    margin-left: 197px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }  


  #Gridicrn012-id {
    
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

    .wj-flexgrid .wj-cell{
        padding: 1px;
    }

  }  

</style>


