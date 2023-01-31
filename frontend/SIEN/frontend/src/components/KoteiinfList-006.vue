<template>
    <v-sheet class="clssheet-chu006" elevation="2">
      <label class="clsstitle1_Noreki_back_006" v-show="Label_Visible">
        <label class="clsstitle1_Noreki_006" >履歴を作成してください</label>
      </label>

        <div class="area006-001">
            <label class="clsstitle006-001">現在受診状況</label>
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

        <div class="area006-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
            前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
            履歴参照
            </v-btn>
        </div>

        <wj-flex-grid
            id="Gridicrn006-id"
            class="Gridicrn006-001"
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
            :autoRowHeights="true"
            >

            <wj-flex-grid-column header=" " binding="kiou_no" :width="30" :wordWrap=true :allowResizing=false align="center" ></wj-flex-grid-column>
            <wj-flex-grid-column header="傷病名" binding="kiou_syobyonm" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="医療機関・診療科" binding="jyusin_iryo_sinryo_view" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="主治医・連絡先" binding="jyusin_syujirenraku_view" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>                                                                                
            <wj-flex-grid-column header="区分" binding="jyusin_kbn" :width="55" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>                    
            <wj-flex-grid-column header="通院頻度" binding="jyusin_hindo" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="服用状況" binding="jyusin_fukuyaku_view" :width="200" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>

            </wj-flex-grid>         

            <div class="area004-004">
              <v-btn :disabled="Label_Visible == true" class="clsbtnmenu006-hyoji" @click="onClickSort">
                表示順変更
              </v-btn> 
            </div>   

            <div class="area006-003">
              <label class="kotei006title1">特記事項</label>
              <textarea  
                id = "textarea"
                class="kotei006inp1" 
                v-model="disptok" 
                @click="click_text"
                @input="initTextarea"
                no-resize
                rows="10"></textarea>              
            </div>

            <div class="area006-004">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu006-clr" @click="onClickclr">
                クリア
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu006-del" @click="onClickdel">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu006-ins" @click="onClickins">
                登 録
            </v-btn>             
        </div>
        

       <!-- ヘッダダイアログエリア --> 
       <v-dialog v-model="InsWinhead" width="270" >
        <v-sheet class="clssheet-head" elevation="2"
            id ="head_win_006id"
            @mousedown="win_drag($event)"
            @mousemove="win_move($event)"
            @mouseup="win_up($event)">        
          <div class="areahead">
            <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
            <v-btn
                elevation="2"
                icon
                small
                top
                class="closeButton"
                color="red"
                @click="Click_colse_head"
                >
                <v-icon> mdi-close </v-icon>
            </v-btn>               
          </div>
          <div class="areahead2">
            <label class="koteititle-head" >作成日</label>
            
            <v-btn 
              class="koteiheadinp1"
              @click="inputCalendarClick(0)"
              tile
              outlined
              width="150px"
              height="120%"

              >{{ getYm()}}
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-btn>    
          </div>

          <div class="areahead-btn">
            <v-btn class="clsbtnmenuhead-ins" @click="onHead_ins">
                登 録
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
            id="Datepicke_r006"
            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect"
          >
          </v-date-picker>
        </v-dialog>

        <!--データ入力ダイアログ-->
        <v-dialog v-model="InsWindata" width="670" >
          <v-sheet class="clssheet-chu007" elevation="2"
            id="naiyo_id006">
            <!--
            @mousedown="win_drag_win($event)"
            @mousemove="win_move_win($event)"
            @mouseup="win_up_win($event)"
            style="bottom: 50%;right: 50%;">-->          
            <div class="area007-001">
                <label class="clsstitle007-001">現在受診状況</label>
                <v-btn
                elevation="2"
                icon
                small
                top
                class="closeButton ml-1"
                color="red"
                @click="Click_colse_data"
                >
                <v-icon> mdi-close </v-icon>
                </v-btn>                
            </div>

            <div class="area007-All"> 
              <div class="area007-Left">
                <div class="area007-002">
                    <label class="clsstitle007-002">傷病名</label>
                    <label id="clsstitle007-003_id" class="clsstitle007-003" ></label>
                </div>

                <div class="area007-003">
                    <label class="clsstitle007-004">医療機関</label>
                    <input type="text" class="clssinp007-004" v-model="dispiryo" @click="text_click(0)" readonly/>
                </div>

                <div class="area007-004">
                    <label class="clsstitle007-005">診療科</label>
                    <input type="text" class="clssinp007-004" v-model="dispsinryo" @click="text_click(1)" readonly/>
                </div>

                <div class="area007-005">
                    <label class="clsstitle007-006">主治医</label>
                    <input type="text" id="clssinp007-004_id" class="clssinp007-004" v-model="dispsyujii" @click="text_click(2)" @input="text_input(0)"/>           
                </div>

                <div class="area007-006">
                    <label class="clsstitle007-007">連絡先</label>
                    <input type="text" id="clssinp007-004_id2" class="clssinp007-004" v-model="disprenraku" @input="text_input(1)"/>
                </div>
              </div>

              <div class="area007-Right">
                <wj-flex-grid
                  id="GridMst_id"
                  class="GridMst06"
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
                  <wj-flex-grid-column header="" binding="name" :width="190" :wordWrap=true :allowResizing=false id="MstGrid_col1"></wj-flex-grid-column>
                  <wj-flex-grid-column header="" binding="id" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
                  <wj-flex-grid-column header="" binding="value" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
                </wj-flex-grid>
              </div>

            </div>

            <div class="area007-007">
                <label class="clsstitle007-008">区分</label>
                <v-radio-group row v-model="radio001" class="radiogroup001">
                    <v-radio class="clssinp007-005"   value="radio001-T" @click="click_radio(0)">
                        <template  v-slot:label >
                        <div id="radio001-T_text"> 通院</div>
                      </template>                
                    </v-radio>                    
                    <v-radio class="clssinp007-006"   value="radio001-O" @click="click_radio(1)">
                      <template  v-slot:label >
                        <div id="radio001-O_text"> 往診</div>
                      </template>                
                    </v-radio>                      
                    <v-radio class="clssinp007-007"   value="radio001-K" @click="click_radio(2)">
                      <template  v-slot:label >
                        <div id="radio001-K_text"> 回診</div>
                      </template>                
                    </v-radio>                                      
                </v-radio-group>
            </div>

            <div class="area007-008">
                <label class="clsstitle007-009">通院頻度</label>
                <input type="text" id="clssinp007-008_id" class="clssinp007-008" v-model="disphindo" @input="text_input(2)"/>
            </div>

            <div class="area007-009">
                <label class="clsstitle007-010">服用状況</label>
                <div class="area007-010">
                  <input class="clssinp007-009" type="checkbox" id="chkfukuyaku" v-model="fukuyakuchk" @click="check_click"/>
                  <label class="ml-1 mt-1" id="lblfukuyaku">薬あり</label>
                  <input type="text" id="clssinp007-010_id" class="clssinp007-010" v-model="dispfukuyaku" @input="text_input(3)"/>
                </div>        
            </div>

            <div class="area007-011">
                <v-btn class="clsbtnmenu007-clr" @click="onClickclr_data">
                    クリア
                </v-btn>
                <v-btn class="clsbtnmenu007-del" @click="onClickdel_data">
                    削 除
                </v-btn>
                <v-btn class="clsbtnmenu007-ins" @click="onClickins_data">
                    登 録
                </v-btn>             
            </div>  
          </v-sheet>        
        </v-dialog>

        <!--履歴ダイアログ-->
        <v-dialog v-model="Rirekiwin" width="210" >
        <v-sheet class="clssheet-Reki" elevation="2"
            id="rireki_id006"
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
                :initialized="onInitializeIcrnGridReki"
                :itemsSourceChanged="onItemsSourceChanged"
                :itemsSource="viewdata_reki"
                :wordWrap=true
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
        
        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="260" >
          <v-sheet class="clssheet-Mes" elevation="2"
              id="kakunin_id006">
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

        <!-- 表示順ダイアログ  -->
        <v-dialog v-model="dialog_Sort_flg" width="1020" >
          <v-sheet class="clssheet006-sort" elevation="2"
            id="sort_006id">
            <!--
            @mousedown="win_drag_sort($event)"
            @mousemove="win_move_sort($event)"
            @mouseup="win_up_sort($event)"
            style="bottom: 50%;right: 50%;">
            -->
            <div class="area006-sort">
              <label class="kotei006title_sort">表示順変更</label>
              <v-btn
                margin-left="1px"
                elevation="2"
                icon
                small
                top
                class="closeButton ml-1"
                color="red"
                @click="Click_colse_sort"
                >
                <v-icon> mdi-close </v-icon>
              </v-btn>            
            </div>

            <wj-flex-grid
              id="Gridicrnsort-id"
              class="Gridicrn006-sort"
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
              :initialized="onInitializeIcrnGrid_sort"
              :itemsSourceChanged="onItemsSourceChanged_sort"
              :itemsSource="viewdata_sort"
              :autoRowHeights="true"
              >

              <wj-flex-grid-column header=" " binding="kiou_no" :width="30" :wordWrap=true :allowResizing=false align="center" ></wj-flex-grid-column>
              <wj-flex-grid-column header="傷病名" binding="kiou_syobyonm" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="医療機関・診療科" binding="jyusin_iryo_sinryo_view" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="主治医・連絡先" binding="jyusin_syujirenraku_view" :width="175" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>                                                                                
              <wj-flex-grid-column header="区分" binding="jyusin_kbn" :width="55" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>                    
              <wj-flex-grid-column header="通院頻度" binding="jyusin_hindo" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="服用状況" binding="jyusin_fukuyaku_view" :width="200" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="表示順" binding="jyusin_no_text" :width="70"  :allowResizing=false ></wj-flex-grid-column>

            </wj-flex-grid>

            <div class="area-sort">
              <v-btn class="clsbtnmenu006-clr-sort" @click="onClickclr_sort">
                  クリア
              </v-btn>
              <v-btn class="clsbtnmenu006-ins-sort" @click="onClickins_sort">
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
    import * as wjGrid from '@grapecity/wijmo.grid';
    import { getConnect } from '../connect/getConnect';
    import { postConnect } from '../connect/postConnect';
    import { putConnect } from '../connect/putConnect';    
    import { deleteConnect } from '../connect/deleteConnect';
    import dayjs from '../../node_modules/dayjs';
    import sysConst from '../utiles/const';

    let INS_KBN_NAIYO = 0;  //登録区分:データ  
    let INS_KBN_HEAD = 1;   //登録区分:ヘッダ
    let INS_KBN_BIKO = 2;   //登録区分:備考
    let DEL_KBN_DATA = 0;   //削除区分:データ
    let DEL_KBN_REKI = 1;   //削除区分:履歴
    let GET_KBN_DATA = 1;   //取得区分:表示データ

    export default
    {
      props: ["ymd","uniqid","traceid","jigyoid","jigyoid_kotei","kotei_kbn"],
      data() {
        return {
          iryokikan_list: [],
          sinryo_list: [],                
          syujii_list: [],

          str_ymd: this.ymd.substring(0, 4)
              + "年" + this.ymd.substring(4, 6)
              + "月" + this.ymd.substring(6)
              + "日"
          ,InsWinflg: false,
          pdataid:'',         //ヘッダデータid
          intcode:0,          //表示しているintcode
          pmymd:'',           //表示しているMYMD
          pmymd_moto:'',     //表示している元MYMD AAA
          wuniqid:"",
          wtraceid:"",                
          disptok:'',               //特記事項
          griddata:[],              //API取得データ
          gridSeldata:[],           //API取得データ(履歴)
          GetViewDataInf:[],        //API取得データ(データ)
          GetApiData_datakiou:[],   //API取得データ(既往歴)                  
          viewdata:[],              //グリッド表示データ
          viewdata_reki: [],        //履歴グリッド表示データ
          viewdata_reki_kiou: [],   //履歴グリッド表示データ(既往歴)
          tokflg:false,             //特記フラグ
          Get_inputinf:this.get_inputdata(),
          Get_byoininf:[],          //API取得データ(病院)
          Get_sinryokainf:[],       //API取得データ(診療科)
          Get_syujiiinf:[],         //API取得データ(主治医)
          MstList:[],


          //ダイアログ用変数
          selected_btn:0,
          InsWinhead:false,
          InsWindata:false,
          Rirekiwin:false,
          dispymdhead:"",
          datepicker_dialog_head: false,  //ヘッダ入力ダイアログカレンダー
          datepicker_dialog_006: false,   //データ入力ダイアログカレンダー
          datepicker_dialog_tyosa: false, //調査日カレンダー                
          Ym: '',
          picker: '',
                          

          //ダイアログ表示用パラメータ
          radio001: 'radio001-T',
          dispkioudataid:0,
          dispkiouid:0,
          dispiryo:"",
          dispiryo_id:0,
          dispsinryo:"",
          dispsinryo_id:0,
          dispsyujii:"",
          disprenraku:"",
          disphindo:"",
          dispfukuyaku_kbn:0,
          dispfukuyaku:"",   
          fukuyakuchk:"", //服薬チェック             
          dispid:"",        //ID
          dispno:"",        //NO
          
          inputmstflg:1,  //1:医療機関 2:診療科 3:主治医

          //確認ダイアログ
          dialog_Message_flg:false,
          Dialog_Message:'',       //ダイアログメッセージ
          dialo_Yesflg:false,      //ダイアログ結果
          Btnno_Visible:false,     //「いいえ」ボタン表示設定 
          dialo_Yesflg_no:0,

          //ダイアログ新規 or upd T:新規 F:UPD
          insflg:true,

          //1:履歴の新規登録
          //2:履歴の更新登録
          //3:履歴の削除
          //4:データ削除
          //5;データ登録
          //6:前回コピー
          //7:データ削除
          //8;データ登録          
          dialog_Actionflg:0,    

          //データ登録ダイアログ
          insdataflg:false,  //F:新規 T:更新

          //前回コピー用変数
          Copy_dataid:0, //コピー元データid    
          Label_Visible:false,
    
          //表示順ダイアログ
          dialog_Sort_flg:false,
          sort_no:1,
          viewdata_sort:[],

          //入力チェック
          inputchk:false,  
          

          };
        },
        components:
        {
          //Kioureki_InsView
        },      
        methods:
        {
          get_inputdata() 
          { 
            //API取得
            let _self = this;
            let params = [];
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,    
              pJigyoid: this.jigyoid,               
            }; 
            getConnect('/Mst_byoin', params,'KOTEIINF').then((result) => {
              _self.Get_byoininf = result;
              this.DspByoinInput();
            });

            //API取得 
            getConnect('/Mst_sinryo', params,'KOTEIINF').then((result) => {
              _self.Get_sinryokainf = result;
              this.DspSinryoInput();
            });            

            //API取得
            getConnect('/Mst_syujii', params,'KOTEIINF').then((result) => {
              _self.Get_syujiiinf = result;
              this.DspSyujiiInput();
            });                        
                      
          },

          DspByoinInput()
          {
            //####病院の画面表示を行う####

            let wk_byoin_data=[];
            let byoin_data=[];
            
            wk_byoin_data = 
            {
              id:0,
              name:"(クリア)",
              value:" ",
            }
            byoin_data.push(wk_byoin_data);

            if(this.Get_byoininf.icrn_inf != null)
            {          
              //取得したデータを確保
              this.Get_byoininf.icrn_inf.forEach(function (value) {
                wk_byoin_data = 
                  {
                    id:value.id,
                    name:value.name,
                    value:value.name,
                  }
                  byoin_data.push(wk_byoin_data);
                
              });
              this.iryokikan_list = byoin_data.concat();
            }

          },
          DspSinryoInput()
          {
            //####診療科の画面表示を行う####
            let wk_sinryoka_data=[];
            let sinryoka_data=[];
            
            wk_sinryoka_data = 
            {
              id:0,
              name:"(クリア)",
              value:" ",
            }
            sinryoka_data.push(wk_sinryoka_data);

            if(this.Get_sinryokainf.icrn_inf != null)
            {          
              //取得したデータを確保
              this.Get_sinryokainf.icrn_inf.forEach(function (value) {
                wk_sinryoka_data = 
                  {
                    id:value.id,
                    name:value.name,
                    value:value.name,
                  }
                  sinryoka_data.push(wk_sinryoka_data);
                
              });
              this.sinryo_list = sinryoka_data.concat();
            }
          },
          DspSyujiiInput()
          {
            //####主治医の画面表示を行う####
            let wk_syujii_data=[];
            let syujii_data=[];
            
            wk_syujii_data = 
            {
              id:0,
              name:"(クリア)",
              value:" ",
            }
            syujii_data.push(wk_syujii_data);

            if(this.Get_syujiiinf.icrn_inf != null)
            {          
              //取得したデータを確保
              this.Get_syujiiinf.icrn_inf.forEach(function (value) {
                wk_syujii_data = 
                  {
                    id:value.id,
                    name:value.name,
                    value:value.name,
                  }
                  syujii_data.push(wk_syujii_data);
                
              });
              this.syujii_list = syujii_data.concat();
            }
          },

          //####モーダルイベントエリア####
          //#####新規履歴#####
          win_drag :function(e){
          //ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("head_win_006id");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 255) /2 + "px";   
          
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move :function(e){
          //ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("head_win_006id");
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
        //#####表示順#####
        win_drag_sort :function(e){
          //表示順
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("sort_006id");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 482)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 1020) /2 + "px";  
          
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move_sort :function(e){
          //表示順
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("sort_006id");
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
        win_up_sort :function(){
          //ドラッグ
          this.Dragflg = false;
        },

        //#####登録ウィンドウ#####
        win_drag_win :function(e){
          //ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("naiyo_id006");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 360)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 760) /2 + "px";  
          
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move_win :function(e){
          //ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("naiyo_id006");
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
        win_up_win :function(){
          //ドラッグ
          this.Dragflg = false;
        },    

        //#####確認メッセージ#####
        win_drag_Msg :function(e){
          //ドラッグ
          this.Dragflg = true;
          this.mouseX = e.screenX;
          this.mouseY = e.screenY; 
          var wdialog = document.getElementById("kakunin_id006");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 260) /2 + "px";   
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move_Msg :function(e){
          //ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("kakunin_id006");
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
          var wdialog = document.getElementById("rireki_id006");  
          if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 210)/2 + "px";
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 280) /2 + "px";   
          this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
          this.screenX = parseInt(wdialog.style.right.replace("px","")); 
        },
        win_move_reki :function(e){
          //履歴参照ドラッグ
          
          if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
          {
            var wdialog = document.getElementById("rireki_id006");
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
          if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 255) /2 + "px";   
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
        //####モーダルイベントエリア END####

          initTextarea(){
      
            let textarea = document.getElementById("textarea");
            let rowcnt = textarea.value.split("\n");

            this.active = true;

            //文字数制御
            if(textarea.value.length > 200) //100文字
            {
              textarea.value = textarea.value.substring(0,100);
            }
                  
            //行数制御
            if(rowcnt.length > 10)
            {
              var result = "";
              for(var i = 0; i < 10;i++)
              {
                result += rowcnt[i]+ "\n";
              }
              textarea.value = result;
            }
          },            
            getYm() 
            {
              if (!this.Ym) 
              {
                  this.Ym = dayjs();
                  this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
              }
              return (
                this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
              );
            },
            onClickCopy: function() 
            {
              //前回コピーボタン押下時
              this.Dragflg = false;
              this.Dialog_Message = sysConst.MSG_COPY_CHK;
              this.dialog_Actionflg = 6;  //前回コピー
              this.Btnno_Visible = true;
              this.dialog_Message_flg = true               

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
            }
            ,onClickReki: function() 
            {
              this.Dragflg = false;
              this.Rirekiwin=true;
            },            
            newClick() {
              this.InsWinflg = true;
            },
            onItemsSourceChanging(flexGrid) 
            {
                flexGrid.beginUpdate();
                let headerlist = this.HeaderList;
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
                }
                flexGrid.endUpdate();
            },
            onInitializeIcrnGrid(flexGrid)
            {
                //let headerlist = this.HeaderList;
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn006";
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height =20*2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header006'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;
                
                this.flex = flexGrid; 
                flexGrid.hostElement.addEventListener("click",function(e){this.grid_click(e)}.bind(this));

                flexGrid.endUpdate();
            }

            //フィルター
            ,DataFilter() { 
              let Rekidata = [];
              let Rekidata_kiou = [];
              let wk_Rekidata = [];
              let wkkbn = this.kotei_kbn;


              if(this.gridSeldata.icrn_inf != null)
              {                        
              //既往歴のデータのみに絞る
              this.gridSeldata.icrn_inf.forEach(function (value) {

                //区分が受診歴
                if (value.head_kbn == wkkbn) {
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
                else if (value.head_kbn == 3) {
                  //既往歴履歴データ取得
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
                    Rekidata_kiou.push(wk_Rekidata);
                  }                  
                }

              });

              //履歴ソート(降順)
              Rekidata.sort(function(a,b){
                if(a.head_mymd > b.head_mymd) return -1;
                if(b.head_mymd > a.head_mymd) return 1;
              });
              Rekidata_kiou.sort(function(a,b){
                if(a.head_mymd > b.head_mymd) return -1;
                if(b.head_mymd > a.head_mymd) return 1;
              });              

              this.viewdata_reki = Rekidata.concat();
              this.viewdata_reki_kiou = Rekidata_kiou.concat();
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
              let params = [];
              let params_kiou = [];
              let ymd = this.ymd;           
              let intcode = this.intcode;         

              //パラメータ
              params = {
                uniqid: this.uniqid,
                traceid: this.traceid,    
                ymd: ymd,
                intcode: intcode,               

                Jigyoid: this.jigyoid_kotei,
                Kbn: this.kotei_kbn,             //受診歴
                Dataid: this.pdataid,
                Modeflg: GET_KBN_DATA,        //データ取得
              };

              getConnect('/Koteiinf_HONNIN', params,'KOTEIINF').then((result) => {
                _self.GetViewDataInf = result;

                //データが取得できた場合
                let kiou_dataid = 0;
                let wk_Ymd = "";    //選択中の受診歴の履歴日付
                let wk_Ymd2 = "";   //既往歴の履歴日付

                wk_Ymd = this.pmymd_ymd.replace("年","");
                wk_Ymd = wk_Ymd.replace("月","");
                wk_Ymd = wk_Ymd.replace("日","");                  

                if(wk_Ymd != "")
                {
                  for(let i = 0 ; i < this.viewdata_reki_kiou.length;i++)
                  {
                    wk_Ymd2 = this.viewdata_reki_kiou[i].head_mymd.replace("年","");
                    wk_Ymd2 = wk_Ymd2.replace("月","");
                    wk_Ymd2 = wk_Ymd2.replace("日","");            
                    
                    if (this.viewdata_reki_kiou[i].head_kbn == 3 && wk_Ymd >= wk_Ymd2)
                    {
                      kiou_dataid = this.viewdata_reki_kiou[i].head_dataid;
                      break;
                    }
                  }
                }
                else{
                  this.viewdata =[];
                }

                if(kiou_dataid > 0)
                {
                  //既往歴情報パラメータ
                  params_kiou = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,    
                    ymd: ymd,
                    intcode: intcode,               

                    Jigyoid: this.jigyoid_kotei,
                    Kbn: 3,               //既往歴:3
                    Dataid: kiou_dataid,
                    Modeflg: GET_KBN_DATA,             //データ取得
                  };

                  getConnect('/Koteiinf_HONNIN', params_kiou,'KOTEIINF').then((result) => {
                    _self.GetApiData_datakiou = result;
                    this.DataFilter2();
                  });
                }
                else{
                  this.viewdata =[];
                }
              })
            }            
            
            //画面更新
            ,DataFilter2() 
            { 
              let wk_data = [];
              let data = [];
              let wdataid = this.pdataid;
              let wk_Ymd ="";
              let wk_Tok ="";
              let tokflg = false;
              let wkkbn = this.kotei_kbn;

              //既往歴のデータ
              let kiou_dataid = 0;

              if(this.GetApiData_datakiou.icrn_inf != null)
              {                    
                //既往歴ののデータのみに絞る
                kiou_dataid = 0;
                this.GetApiData_datakiou.icrn_inf.forEach(function (value) {
                  kiou_dataid = value.head_dataid;  //既往歴DATAID

                  //既往歴ヘッダの内容を取得
                  value.naiyo.forEach(function(value2){
                  if (value2.naiyo_kbn == 0)
                  {
                    wk_data={
                      
                      kiou_dataid:kiou_dataid,              //既往歴DATAID
                      kiou_kiouid:value2.kiou_id,           //既往歴内部ID
                      kiou_syobyonm:value2.kiou_syobyonm,   //傷病名
                      kiou_no:0,                            //表示順

                      jyusin_id:0,                          //受診歴内部ID
                      jyusin_no:0,                          //受診歴表示順
                      jyusin_iryoid:0,                      //受診歴医療機関ID
                      jyusin_iryonm:"",                      //受診歴医療機関名      
                      jyusin_sinryoid:0,                    //受診歴診療科ID
                      jyusin_sinryonm:"",                    //受診歴診療科名           
                      jyusin_iryo_sinryo_view:"",           //受診歴医療機関診療科名
                      jyusin_syujii:"",                      //受診歴主治医
                      jyusin_renrakusaki:"",                    //受診歴連絡先
                      jyusin_syujirenraku_view:"",          //受診歴主治医表示
                      jyusin_kbn:"",                        //受診区分
                      jyusin_kbn_id:0,                       //受診区分ID  
                      jyusin_hindo:"",                      //受診頻度
                      jyusin_fukuyaku_kbn:0,                //受診歴区分
                      jyusin_fukuyaku_time:"",              //受診歴時間
                      jyusin_fukuyaku_view:"",
                      insdataflg:false                      //F受診歴のデータ無 T,有り
                    }

                    data.push(wk_data);
                  }                   
                });
              });

              if(this.GetViewDataInf.icrn_inf != null)
              {                    
                //受診歴のデータのみに絞る
                this.GetViewDataInf.icrn_inf.forEach(function (value) {

                  //区分が受診歴
                  if (value.head_kbn == wkkbn && value.head_dataid == wdataid) {
                    wk_Ymd = value.head_mymd.substring(0, 4)
                      + "年" + value.head_mymd.substring(4, 6)
                      + "月" + value.head_mymd.substring(6)
                      + "日",  
                    
                      //受診歴ヘッダの内容を取得
                      value.naiyo.forEach(function(value2){
                      if (value2.naiyo_kbn == 0)
                      {
                        for(let i = 0; i < data.length;i++)
                        {
                          if(data[i].kiou_kiouid == value2.jyusin_kiouid
                            && data[i].kiou_dataid == value2.jyusin_kioudataid)
                          {
                            data[i].jyusin_id=value2.jyusin_id;                                     //受診歴内部ID
                            data[i].jyusin_no=value2.jyusin_no;                                     //受診歴表示順
                            data[i].jyusin_iryoid=value2.jyusin_iryokikanid;                        //受診歴医療機関ID      
                            data[i].jyusin_sinryoid=value2.jyusin_sinryokaid;                         //受診歴診療科ID
                            data[i].jyusin_iryonm=value2.jyusin_iryokikannm;                        //受診歴医療機関名      
                            data[i].jyusin_sinryonm=value2.jyusin_sinryokanm;                         //受診歴診療科名                                       
                            data[i].jyusin_iryo_sinryo_view=value2.jyusin_iryo_sinryo_view;         //受診歴医療機関診療科名
                            data[i].jyusin_syujii=value2.jyusin_syujii;                              //受診歴主治医
                            data[i].jyusin_renrakusaki=value2.jyusin_renrakusaki;                           //受診歴連絡先
                            data[i].jyusin_syujirenraku_view=value2.jyusin_syujirenraku_view;       //受診歴主治医表示
                            data[i].jyusin_kbn=value2.jyusin_kbn;                                   //受診区分
                            data[i].jyusin_kbn_id=value2.jyusin_kbn_id;                               //受診区分ID  
                            data[i].jyusin_hindo=value2.jyusin_hindo;                               //受診頻度
                            data[i].jyusin_fukuyaku_kbn=value2.jyusin_fukuyaku_kbn;                 //受診歴区分
                            data[i].jyusin_fukuyaku_time=value2.jyusin_fukuyaku_time;               //受診歴時間
                            data[i].jyusin_fukuyaku_view=value2.jyusin_fukuyaku_view;
                            data[i].insdataflg=true;                      
                          } 
                        }
                      }  
                      else{
                        tokflg = true;
                        wk_Tok = wk_Tok  + value2.biko_naiyo;
                      }                 
                    });
                  }
                });
              
                this.str_ymd = wk_Ymd;
                this.pmymd = this.str_ymd;
                this.pmymd_moto = this.str_ymd;      
                this.tokflg = tokflg;
                data.sort(function(a,b){
                  if(a.jyusin_no < b.jyusin_no) return -1;
                  if(b.jyusin_no < a.jyusin_no) return 1;
                });
                //連番で表示する
                for(let i = 0;i < data.length;i++)
                {
                  data[i].kiou_no = i+1;
                }     

                this.viewdata = data.concat();
                this.disptok = wk_Tok;          //備考欄              
                
                }
              }
            }              
            ,onItemsSourceChanged(flexGrid) {
              // 初期選択を解除
              flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            },
            grid_click(e)
            {
              if(this.Chk_Reki() == true)
              {
                  var ht = this.flex.hitTest(e);
                //グリッドがクリックされた場合ウィンドウを表示する

                if(ht.row >= 0)
                {
                  this.InsWindata = true;
                  //マスタ表示設定
                  this.inputmstflg = 1;
                  this.MstList = this.iryokikan_list.concat();
                  this.dispkioudataid = this.viewdata[ht.row].kiou_dataid;          //既往歴DATAID
                  this.dispkiouid = this.viewdata[ht.row].kiou_kiouid;              //既往歴内部ID
                  this.dispiryo_id = this.viewdata[ht.row].jyusin_iryoid;           //医療機関ID
                  this.dispsinryo_id = this.viewdata[ht.row].jyusin_sinryoid;       //診療機関ID
                  this.dispiryo = this.viewdata[ht.row].jyusin_iryonm;              //医療機関名
                  this.dispsinryo = this.viewdata[ht.row].jyusin_sinryonm;          //診療機関名                  
                  this.dispsyujii = this.viewdata[ht.row].jyusin_syujii;            //主治医
                  this.disprenraku = this.viewdata[ht.row].jyusin_renrakusaki;      //連絡先
                  this.disphindo = this.viewdata[ht.row].jyusin_hindo;              //頻度
                  this.dispfukuyaku = this.viewdata[ht.row].jyusin_fukuyaku_time;   //服薬内容
                  this.dispid = this.viewdata[ht.row].jyusin_id;
                  this.dispno = this.viewdata[ht.row].jyusin_no;

                  this.insdataflg = this.viewdata[ht.row].insdataflg;

                  //受診区分
                  if(this.viewdata[ht.row].jyusin_kbn_id == "1")
                  {
                    this.radio001  = "radio001-T"
                  }            
                  else if(this.viewdata[ht.row].jyusin_kbn_id == "2")
                  {
                    this.radio001  = "radio001-O"
                  }
                  else if(this.viewdata[ht.row].jyusin_kbn_id == "3")
                  {
                    this.radio001  = "radio001-K"
                  }
                  else{
                    this.radio001  = "radio001-T"
                  }

                  if(this.viewdata[ht.row].jyusin_fukuyaku_kbn == "1")
                  {
                    this.fukuyakuchk = true;
                  }            
                  else if(this.viewdata[ht.row].jyusin_fukuyaku_kbn == "0")
                  {
                    this.fukuyakuchk = false;
                  }

                  let winter = setInterval(() => {
                    //ラベル
                    var label = document.getElementById("clsstitle007-003_id");
                    if(label.style != null)        
                    {
                      clearInterval(winter);
                      label.innerText = this.viewdata[ht.row].kiou_syobyonm.substring(0,20);  //一旦20文字
                    }
                  }, "interval");
                  
                }
                else
                {
                  this.dispkioudataid = 0;          //既往歴DATAID
                  this.dispkiouid = 0;              //既往歴内部ID                  
                  this.dispiryo = "";         //医療機関名
                  this.dispiryoid = 0;        //医療機関ID
                  this.dispsinryo = "";       //診療機関名
                  this.dispsinryo_id = 0;     //診療機関ID
                  this.dispsyujii = "";       //主治医
                  this.disprenraku = "";      //連絡先
                  this.disphindo = "";        //頻度
                  this.dispfukuyaku = "";     //服薬内容
                  this.dispid = 0;
                  this.dispno = 0;                

                  //受診区分
                  this.radio001  = "radio001-T"            
                  this.fukuyakuchk = false;
                  this.insdataflg = false;

                  let winter = setInterval(() => {
                    //ラベル
                    var label = document.getElementById("radio001-T_text");
                    if(label.style != null)        
                    {
                      clearInterval(winter);
                      document.getElementById("radio001-T_text").style.color = "#0081eb";
                      document.getElementById("radio001-O_text").style.color = "";
                      document.getElementById("radio001-K_text").style.color = "";                        
                    }
                  }, "interval");

                }
              }
            },            
            dialog_close(){
              this.InsWinflg = false;
            }
            ,onClickins()
            {
              //データ登録ボタン
              this.Message_Dialog("特記事項を登録します。\nよろしいですか。",8);              
            }
            ,BikoData_ins(kbn)
            {
              this.insflg = false;
              if(this.pmymd != this.pmymd_moto)
              {
                this.Head_insdata(1);
              }

              //登録ボタン
              let _self = this;
              let params = [];
              params = {
                uniqid: this.uniqid,
                traceid: this.traceid,                                
                kbn: this.kotei_kbn,
                intcode: this.intcode,
                insflg:INS_KBN_BIKO, //内容登録
              }

              //登録データ
              let wk_naiyo = this.splitNaiyo(this.disptok,256);
              let wk_putdata = [];
              let putdata = [];

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
                    seikatu_ymdkoro :  " ",
                    seikatu_lcnt :  0,
                    seikatu_naiyo :  " ",
                    kiou_id :  0,
                    kiou_no :  0,
                    kiou_ymdflg :  0,
                    kiou_ymd :  " " ,
                    kiou_syobyocode :  0,
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
                    biko_lcnt :  i+1,
                    biko_naiyo :  wk_naiyo[i]
                  }
                  putdata.push(wk_putdata);
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
                    seikatu_ymdkoro :  " ",
                    seikatu_lcnt :  0,
                    seikatu_naiyo :  " ",
                    kiou_id :  0,
                    kiou_no :  0,
                    kiou_ymdflg :  0,
                    kiou_ymd :  " " ,
                    kiou_syobyocode :  0,
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
                    biko_lcnt :  1,
                    biko_naiyo :  " "
                  }
                  putdata.push(wk_putdata);
              }

              if(this.tokflg == false)
              {
                //特記ないため新規作成
                postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
                  _self.griddata = result.icrn_inf;
                  _self.gridSeldata = result;
                  if(kbn != 1)this.View_upd(this.intcode);
                  this.Message_Dialog(sysConst.MSG_DATA_INS,0);
                });
              }
              else{
                //特記ある-更新
                putConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
                  _self.griddata = result.icrn_inf;
                  _self.gridSeldata = result;
                  if(kbn != 1)this.View_upd(this.intcode);
                  this.Message_Dialog(sysConst.MSG_DATA_INS,0);
                });              
              }
            }
            ,onClickdel_data(){
              //データ削除ボタン
              this.Message_Dialog("入力データを削除します。\nよろしいですか。",4);            
            }
            ,delinput_data()
            {
              //データ削除ボタン
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
                  id:this.dispid,
                  lcnt:0,
                  headflg:DEL_KBN_DATA,
              }

              //削除処理
              deleteConnect('/Koteiinf_HONNIN', params,'KOTEIINF',deldata).then((result) => {
                _self.griddatadel = result.icrn_inf;
                _self.gridSeldatadel = result;
                this.View_upd(this.intcode);
                this.Message_Dialog(sysConst.MSG_DATA_DEL,0);
              });          
            }
            ,onClickins_data(){
              //データ登録ボタン
              this.Message_Dialog("入力データを登録します。\nよろしいですか。",5);
            }
            ,insinput_data()
            {
              //データ登録ボタン
              let putdata = [];
              let wk_iryoid = this.dispiryo_id;    //医療機関ID
              let wk_sinryoid = this.dispsinryo_id;  //診療科ID
              let wk_syujii = "";  //主治医
              let wk_renraku = this.disprenraku;  //連絡先
              let wk_kbn = 1;                     //区分
              let wk_hindo = this.disphindo ;      //頻度
              let wk_fchk = 0 ;                   //服薬チェック
              let wk_ftext = this.dispfukuyaku;

              if(this.pdataid > 0)
              {
                //履歴が存在する場合のみ登録
                
                //医療機関
                wk_syujii = this.dispsyujii;

                if(this.radio001  == "radio001-T")
                {
                  wk_kbn = 1;
                }
                else if(this.radio001  == "radio001-O")
                {
                  wk_kbn = 2;
                }
                else if(this.radio001  == "radio001-K")
                {
                  wk_kbn = 3;
                }

                if(document.getElementById("chkfukuyaku").checked == true)
                {
                  wk_fchk = 1;
                }

                //パラメータ
                let _self = this;
                let params = [];
                params = {
                  uniqid: this.uniqid,
                  traceid: this.traceid,                                
                  kbn: this.kotei_kbn,
                  intcode: this.intcode,
                  insflg:INS_KBN_NAIYO, //内容登録
                }        
                
                let wk_putdata =
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
                  seikatu_ymdkoro :  " ",
                  seikatu_lcnt :  0,
                  seikatu_naiyo :  " ",
                  kiou_id :  0,
                  kiou_no :  0,
                  kiou_ymdflg :  0,
                  kiou_ymd :  " ",
                  kiou_syobyocode :  0,
                  kiou_gensyo :  0,
                  kiou_naiyo :  " ",
                  jyusin_id :  this.dispid,
                  jyusin_no :  this.dispno,
                  jyusin_kiouid :  this.dispkiouid,
                  jyusin_kioudataid :  this.dispkioudataid, 
                  jyusin_iryokikanid :  wk_iryoid,
                  jyusin_sinryokaid :  wk_sinryoid,
                  jyusin_syujii :  wk_syujii,
                  jyusin_renrakusaki :  wk_renraku,
                  jyusin_kbn :  wk_kbn,
                  jyusin_hindo :  wk_hindo,
                  jyusin_fukuyaku_kbn :  wk_fchk,
                  jyusin_fukuyaku_time :  wk_ftext,
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
                //リストに追加
                putdata.push(wk_putdata);          

                if(this.insdataflg == false)
                {
                  //新規登録
                  postConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
                    _self.griddataPost = result.icrn_inf;
                    _self.gridSeldataPost = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_INS,0);
                    this.InsWindata = false;
                  });            
                }
                else
                {
                  //更新登録
                  putConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
                    _self.griddataPut = result.icrn_inf;
                    _self.gridSeldataPut = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_INS,0);
                    this.InsWindata = false;
                  });            
                }
              }
              else{
                this.Message_Dialog(sysConst.MSG_REKI_CRE,0);
              }
            }                        
            ,onClickclr_data(){
              this.dispkioudataid = 0;    //既往歴DATAID
              this.dispkiouid = 0;        //既往歴内部ID                  
              this.dispiryo = "";         //医療機関名
              this.dispiryoid = 0;        //医療機関ID
              this.dispsinryo = "";       //診療機関名
              this.dispsinryo_id = 0;     //診療機関ID
              this.dispsyujii = "";       //主治医
              this.disprenraku = "";      //連絡先
              this.disphindo = "";        //頻度
              this.dispfukuyaku = "";     //服薬内容
              this.dispid = 0;
              this.dispno = 0;                

              //受診区分
              this.radio001  = "radio001-T"            
              this.fukuyakuchk = false;
              this.insdataflg = false;
              document.getElementById("radio001-T_text").style.color = "#0081eb";
              document.getElementById("radio001-O_text").style.color = "";
              document.getElementById("radio001-K_text").style.color = "";                        
            }                      

            ,onClickdel(){
              //削除ボタン
              this.Message_Dialog("入力データを削除します。\nよろしいですか。",7);            
            }

            ,splitNaiyo:function(str,size)
            {
              let strlen = Math.ceil(str.length / size);
              let array = [];

              for (let i=0, x=0; i < strlen; ++i, x += size) 
              {
                array[i] = str.substr(x, size)
              }

              return array;

            }
            ,onClickclr()
            {
              this.disptok="";
            }

            //#####ヘッダダイアログ#####
            ,onHeadclick_ins()
            {
              //新規ボタンクリックイベント
              this.Ym = dayjs();
              this.InsWinhead = true;
              this.insflg = true;//新規登録
            }
            ,onHeadclick_upd()
            {
              //更新ボタンクリックイベント
              this.Ym = dayjs();

              if(this.pmymd != "")
              {
                let wYmd = this.pmymd.replace("年","");
                wYmd = wYmd.replace("月","");
                wYmd = wYmd.replace("日",""); 
                this.Ym = dayjs(wYmd);
              }
              this.insflg = false;//更新登録
              this.InsWinhead = true;
            }
            ,Click_colse_head(){
              //ヘッダウィンドウ
              this.InsWinhead =false;
            }
            ,inputCalendarClick(kbn) 
            {
              //カレンダークリック

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
                //調査日
                if(this.Chk_Reki() == true)
                {
                  this.picker = this.pmymd.replace("年","-");
                  this.picker = this.picker.replace("月","-");
                  this.picker = this.picker.replace("日","");
                  this.inputchk = true;
                  this.datepicker_dialog_tyosa = true;
                }
              }
            }
            ,monthSelect() 
            {
              //月選択
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
            ,onHead_ins()
            {
              //ヘッダの登録ボタン

              if(this.insflg == true)
              {
                this.Message_Dialog("履歴を新規登録します。\nよろしいですか。",1);
              }
              else
              {
                this.Message_Dialog("履歴を更新登録します。\nよろしいですか。",2);
              }
            }               
            ,Head_insdata(kbn)
            {
              //kbn:1画面遷移時の登録

              //登録データ
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
                    kbn: this.kotei_kbn,   //受診歴
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
                    _self.griddataPost = result.icrn_inf;
                    _self.gridSeldataPost = result;
                    if(kbn!=1)this.View_upd(this.intcode);
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
                  kbn: this.kotei_kbn,   //受診歴
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
                    _self.griddataPut = result.icrn_inf;
                    _self.gridSeldataPut = result;
                    if(kbn!=1)this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_REKI_UPD,0);
                    this.InsWinhead =false;                    
                  });                
              }
            }
            ,Click_colse_Reki(){
              //履歴ウィンドウ
              this.Rirekiwin =false;
            }
            //作成履歴
            ,onInitializeIcrnGridReki(flexGrid)
            {
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height =30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Reki'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;
                flexGrid.endUpdate();

                this.flex2 = flexGrid; 
                flexGrid.hostElement.addEventListener("click",function(e){this.grid_clickreki(e)}.bind(this));
            }
            ,grid_clickreki:function(e)
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
                          this.BikoData_ins(1);                
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
                  this.inputchk = false //入力チェックリセット                
                  this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                  this.pmymd_ymd  = this.viewdata_reki[ht.row].head_mymd;  //データ表示用に保存
                  this.get_data();
                }                
              }
            }
            ,onClickdel_reki()
            {
              //履歴削除ボタン
              this.Message_Dialog("選択している履歴を削除します。\nよろしいですか。",3);            
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
            ,Click_colse_data(){
              this.InsWindata = false;
            }
        ,viewClear(){
          //データクリア
          this.InsWinhead = false;
          this.InsWindata = false;
          this.InsWinflg = false;
          this.insdataflg = false;
          this.insflg = true;          
          this.viewdata = [];
          this.viewdata_reki = [];
          this.viewdata_reki_kiou  = [];
          this.disptok ="";
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
              this.Head_insdata();
            }
            else if(this.dialog_Actionflg == 2)
            {
              //履歴の更新追加
              this.Head_insdata();
            }
            else if(this.dialog_Actionflg == 3)
            {
              //履歴の削除
              this.del_rekidata();
            }
            else if(this.dialog_Actionflg == 4)
            {
              //入力データの削除
              this.delinput_data();
            }              
            else if(this.dialog_Actionflg == 5)
            {
              //入力データの登録
              this.insinput_data();
            }
            else if(this.dialog_Actionflg == 6)
            {
              //入力データの登録
              this.DataCopy();
            }
            else if(this.dialog_Actionflg == 7)
            {
              //備考データの削除
              this.del_rekidata();
            }
            else if(this.dialog_Actionflg == 8)
            {
              //備考データの登録
              this.BikoData_ins();
            }
            else if(this.dialog_Actionflg == 9)
            {
              //履歴チェック
              this.InsWinhead = true;
            }
            else if(this.dialog_Actionflg == 10)
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
          ,setUserData(wintcode,wSeldata)
          {
            //利用者選択データ受け取り
            this.inputchk = false //入力チェックリセット
            this.pdataid = 0; //初期化
            this.viewClear();
            this.gridSeldata = wSeldata;
            this.intcode = wintcode;          //利用者コード
            this.DataFilter();
            this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
            
            if(this.pdataid == 0)
            {
              this.Label_Visible = true;
            }
            else{
              this.Label_Visible = false;
            }

          }
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
            if(kbn > 0) this.Btnno_Visible = true;
            this.dialog_Message_flg = true
          }
          ,Message_Dialog_RekiChk(Message)
          {
            //汎用メッセージダイアログ
            this.Dialog_Message = Message;
            this.dialog_Actionflg = 9;  
            this.Btnno_Visible = false;
            this.dialog_Message_flg = true
          }          
        ,Chk_Reki:function()
        {
          //履歴をチェックする

          if(this.pdataid == 0 )
          {
            this.Message_Dialog_RekiChk(sysConst.MSG_REKI_CRE,0);
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
        //表示順ダイアログ
        ,onInitializeIcrnGrid_sort(flexGrid){
          flexGrid.beginUpdate();
          //flexGrid.cssClassAll = "Gridicrn001";
          // ヘッダの追加と設定
          flexGrid.frozenRows=0;    
          flexGrid.columnHeaders.rows[0].allowMerging = true;
          flexGrid.columnHeaders.rows[0].height =20*2;
          flexGrid.columnHeaders.rows[0].max =20*2;
          flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header'
          flexGrid.cells.rows.defaultSize = 35;
          flexGrid.alternatingRowStep = 0;

          //イベントの追加
          this.flex3 = flexGrid; 
          flexGrid.hostElement.addEventListener("click",function(e){this.grid_click_sort(e)}.bind(this));
          flexGrid.endUpdate();
        }                                                                      
        ,grid_click_sort:function(e)
        {
            var ht = this.flex3.hitTest(e);
            
            //グリッドがクリックされた場合ウィンドウを表示する
            if(ht.row >= 0)
            {
              if(ht.col == 7)
              {
                //表示順の列
                if(this.viewdata_sort[ht.row].jyusin_no_text == "")
                {
                  this.viewdata_sort[ht.row].jyusin_no_text = this.sort_no;
                  this.sort_no = this.sort_no + 1; 
                  this.flex3.endUpdate();
                }
                else{
                  if(this.viewdata_sort[ht.row].jyusin_no_text == (this.sort_no-1))
                  {
                    this.viewdata_sort[ht.row].jyusin_no_text = "";
                    this.sort_no = this.sort_no - 1; 
                    this.flex3.endUpdate();
                  }

                }
              }
            }
        }
        ,onClickSort()
        {
          //表示順変更画面
          let wk_viewdata_sort =[];
          let wk_viewdata_sort_list =[]; 

          //表示グリッドのデータセット
          this.viewdata.forEach(function(value)
          {
            wk_viewdata_sort = {
              kiou_dataid:value.kiou_dataid,                        //既往歴DATAID
              kiou_kiouid:value.kiou_kiouid,                        //既往歴内部ID
              kiou_syobyonm:value.kiou_syobyonm,                    //傷病名
              kiou_no:value.kiou_no,                                //表示順

              jyusin_id:value.jyusin_id,                            //受診歴内部ID
              jyusin_no:value.jyusin_no,                            //受診歴表示順
              jyusin_no_text: "",
              jyusin_iryoid:value.jyusin_iryoid,                    //受診歴医療機関ID      
              jyusin_sinryoid:value.jyusin_sinryoid,                //受診歴診療科ID           
              jyusin_iryo_sinryo_view:value.jyusin_iryo_sinryo_view,           //受診歴医療機関診療科名
              jyusin_syujii:value.jyusin_syuji,                      //受診歴主治医
              jyusin_renrakusaki:value.jyusin_renrakusaki,                    //受診歴連絡先
              jyusin_syujirenraku_view:value.jyusin_syujirenraku_view,          //受診歴主治医表示
              jyusin_kbn:value.jyusin_kbn,                            //受診区分
              jyusin_kbn_id:value.jyusin_kbn_id,                      //受診区分ID  
              jyusin_hindo:value.jyusin_hindo,                        //受診頻度
              jyusin_fukuyaku_kbn:value.jyusin_fukuyaku_kbn,          //受診歴区分
              jyusin_fukuyaku_time:value.jyusin_fukuyaku_time,        //受診歴時間
              jyusin_fukuyaku_view:value.jyusin_fukuyaku_view,
              insdataflg:value.insdataflg                             //F受診歴のデータ無 T,有り
            }
            wk_viewdata_sort_list.push(wk_viewdata_sort);
          }
          );

          //連番で表示する
          for(let i = 0;i < wk_viewdata_sort_list.length;i++)
          {
            wk_viewdata_sort_list[i].kiou_no = i+1;
          }
          
          this.viewdata_sort = wk_viewdata_sort_list.concat();
          
          this.sort_no = 1;
          this.dialog_Sort_flg = true;

        }   
        ,Click_colse_sort(){
          //データウィンドウ
          this.dialog_Sort_flg = false;
          this.sort_no = 1;
        }
        ,onItemsSourceChanged_sort(flexGrid){
          flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
        }
        ,onClickclr_sort(){
          //表示順クリア
          
          this.sort_no = 1;
          let wk_viewdata_sort =[];
          let wk_viewdata_sort_list =[]; 

          //表示グリッドのデータセット
          this.viewdata.forEach(function(value)
          {
              wk_viewdata_sort = {
              kiou_dataid:value.kiou_dataid,                        //既往歴DATAID
              kiou_kiouid:value.kiou_kiouid,                        //既往歴内部ID
              kiou_syobyonm:value.kiou_syobyonm,                    //傷病名
              kiou_no:value.kiou_no,                                //表示順

              jyusin_id:value.jyusin_id,                            //受診歴内部ID
              jyusin_no:value.jyusin_no,                            //受診歴表示順
              jyusin_no_text: "",
              jyusin_iryoid:value.jyusin_iryoid,                    //受診歴医療機関ID      
              jyusin_sinryoid:value.jyusin_sinryoid,                //受診歴診療科ID           
              jyusin_iryo_sinryo_view:value.jyusin_iryo_sinryo_view,           //受診歴医療機関診療科名
              jyusin_syuji:value.jyusin_syuji,                      //受診歴主治医
              jyusin_renrakusaki:value.jyusin_renrakusaki,                    //受診歴連絡先
              jyusin_syujirenraku_view:value.jyusin_syujirenraku_view,          //受診歴主治医表示
              jyusin_kbn:value.jyusin_kbn,                            //受診区分
              jyusin_kbn_id:value.jyusin_kbn_id,                      //受診区分ID  
              jyusin_hindo:value.jyusin_hindo,                        //受診頻度
              jyusin_fukuyaku_kbn:value.jyusin_fukuyaku_kbn,          //受診歴区分
              jyusin_fukuyaku_time:value.jyusin_fukuyaku_time,        //受診歴時間
              jyusin_fukuyaku_view:value.jyusin_fukuyaku_view,
              insdataflg:value.insdataflg                             //F受診歴のデータ無 T,有り
            }
            wk_viewdata_sort_list.push(wk_viewdata_sort);
          }
          );
          
          this.viewdata_sort = wk_viewdata_sort_list.concat();
          this.flex3.endUpdate();
        }
        ,chk_sort:function(){
          let chkflg=true;

          //表示順の入力チェック
          for(let i = 0; i < this.viewdata_sort.length ; i++)
          {
            if(this.viewdata_sort[i].jyusin_no_text == "")
            {
              chkflg = false;
              break;
            }
          }
          return chkflg;
        }
        ,onClickins_sort(){
          //表示順登録

          //表示順の入力チェック
          if(this.chk_sort() == true )
          {
            //表示順情報を登録リストに反映
            let wk_viewdata = this.viewdata.concat();
            let wk_viewdata_sort = this.viewdata_sort.concat();          

            wk_viewdata_sort.forEach(function(value)
            {
              let wk_id = value.jyusin_id;
              let wk_no = value.jyusin_no_text;

              for(let i = 0 ;  i < wk_viewdata.length ;i++)
              {
                if(wk_viewdata[i].jyusin_id == wk_id)
                {
                  wk_viewdata[i].jyusin_no = wk_no;
                }
              }
            });

            //データダイアログ 登録
            let putdata = [];

            //パラメータ
            let _self = this;
            let params = [];
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,                                
              kbn: this.kotei_kbn,
              intcode: this.intcode,
              insflg:INS_KBN_NAIYO, //内容登録
            }

            for(let i = 0; i < wk_viewdata.length;i++)
            {
              //登録データ
              let wk_putdata = 
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
                  jyusin_id :  wk_viewdata[i].jyusin_id,
                  jyusin_no :  wk_viewdata[i].jyusin_no,
                  jyusin_kioudataid :  0,
                  jyusin_kiouid :  wk_viewdata[i].kiou_kiouid,
                  jyusin_iryokikanid :  wk_viewdata[i].jyusin_iryoid,
                  jyusin_sinryokaid :  wk_viewdata[i].jyusin_sinryoid,
                  jyusin_syujii :  wk_viewdata[i].jyusin_syujii,
                  jyusin_renrakusaki :  wk_viewdata[i].jyusin_renrakusaki,
                  jyusin_kbn :  wk_viewdata[i].jyusin_kbn_id,
                  jyusin_hindo :  wk_viewdata[i].jyusin_hindo,
                  jyusin_fukuyaku_kbn :  wk_viewdata[i].jyusin_fukuyaku_kbn,
                  jyusin_fukuyaku_time :  wk_viewdata[i].jyusin_fukuyaku_time,
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
              };    

              //リストに追加
              putdata.push(wk_putdata);  
            }

            //更新登録            
            putConnect('/Koteiinf_HONNIN', params,'KOTEIINF',putdata).then((result) => {
              _self.griddataPut = result.icrn_inf;
              _self.gridSeldataPut = result;
              this.View_upd(this.intcode);
              this.Message_Dialog(sysConst.MSG_DATA_INS,0);
              this.dialog_Sort_flg = false;         
            });            

          }
          else{
            this.Message_Dialog("表示順を入力してください。",0);
          }
        }
        ,click_radio(kbn)
        {
          switch(kbn)
          {
            case 0:
              document.getElementById("radio001-T_text").style.color = "#0081eb";
              document.getElementById("radio001-O_text").style.color = "";
              document.getElementById("radio001-K_text").style.color = "";              
              break;
            case 1:
              document.getElementById("radio001-T_text").style.color = "";
              document.getElementById("radio001-O_text").style.color = "#0081eb";
              document.getElementById("radio001-K_text").style.color = "";              
              break;
            case 2:
              document.getElementById("radio001-T_text").style.color = "";
              document.getElementById("radio001-O_text").style.color = "";
              document.getElementById("radio001-K_text").style.color = "#0081eb";                   
              break;                            
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
                      this.BikoData_ins(1);                
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
        ,input_chk: function()
        {
          //入力項目があれば登録メッセージ
          if(this.inputchk == true)
          {
            this.Message_Dialog("登録されていない項目があります。\n 登録しますか。",10);
          }
        }

        ,onInitializeIcrnGrid_Mst(flexGrid)
        {
            flexGrid.beginUpdate();
            // ヘッダの追加と設定
            flexGrid.columnHeaders.rows[0].allowMerging = true;
            flexGrid.columnHeaders.rows[0].height =30;
            flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Mst06'
            flexGrid.cells.rows.defaultSize = 30;
            flexGrid.alternatingRowStep = 0;
            flexGrid.endUpdate();

            this.flex_mst = flexGrid; 
            flexGrid.hostElement.addEventListener("click",function(e){this.grid_click_Mst(e)}.bind(this));
        } 
        ,onItemsSourceChanged_Mst(flexGrid) {
          // 初期選択を解除
          flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
          let col = flexGrid.columns[0];          
          switch(this.inputmstflg)
            {
              case 1: //医療
                col.header = "医療機関";
                break;
              case 2: //診療
                col.header = "診療科";                
                break;
              case 3: //主治医
                col.header = "主治医";
                break;                                
            }
        }   
        
        ,grid_click_Mst(e)
        {
          var ht = this.flex_mst.hitTest(e);                
          if(ht.row >= 0)
          {
            switch(this.inputmstflg)
            {
              case 1: //医療
                  this.dispiryo = this.MstList[ht.row].value;
                  this.dispiryo_id = this.MstList[ht.row].id;
                break;
              case 2: //診療
                  this.dispsinryo = this.MstList[ht.row].value;
                  this.dispsinryo_id = this.MstList[ht.row].id;                
                break;
              case 3: //主治医
                  this.dispsyujii = this.MstList[ht.row].value;
                break;                                
            }
          } 
        }

        ,text_click(kbn)
        {
          //テキストクリック
          switch(kbn)
          {
            case 0: //医療機関
              this.inputmstflg = 1;
              this.MstList = this.iryokikan_list.concat();
              break;
            case 1: //診療科
              this.inputmstflg = 2;
              this.MstList = this.sinryo_list.concat();
              break;
            case 2: //主治医
              this.inputmstflg = 3;
              this.MstList = this.syujii_list.concat();  
              break;                            
          }
          
        }

        ,text_input(kbn)
        {
          this.inputchk = true;

          switch(kbn)
          {
            case 0://主治医
              {
                let textarea = document.getElementById("clssinp007-004_id");
                //文字数制御
                    
                if(textarea.value.length > 20) //文字数制限
                {
                  this.dispsyujii = textarea.value.substring(0,20);
                  
                }            
              }
              break;

            case 1://連絡先
              {
                let textarea = document.getElementById("clssinp007-004_id2");
                //文字数制御
                    
                if(textarea.value.length > 50) //文字数制限
                {
                  this.disprenraku = textarea.value.substring(0,50);
                  
                }            
              }
              break;
            case 2://頻度
              {
                let textarea = document.getElementById("clssinp007-008_id");
                //文字数制御
                    
                if(textarea.value.length > 20) //文字数制限
                {
                  this.disphindo = textarea.value.substring(0,20);
                  
                }            
              }
              break;
              
              case 3://服薬時間
              {
                let textarea = document.getElementById("clssinp007-010_id");
                //文字数制御
                    
                if(textarea.value.length > 20) //文字数制限
                {
                  this.disphindo = textarea.value.substring(0,20);
                  
                }            
              }
              break;                                          
          }
        }
        ,check_click(){
          document.getElementById("lblfukuyaku").style.color = "#000";
          if(document.getElementById("chkfukuyaku").checked == true)
          {
            document.getElementById("lblfukuyaku").style.color = "#0081eb";
          }
        }         



      }
    }
</script>

<style lang="scss">
  @import '../assets/scss/common.scss';

    /*全体エリア*/
  .clssheet-chu006{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height:  750px;
    position: relative;
  }
  /*タイトル*/
  .clsstitle006-001{
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
  }
  /*タイトルエリア*/
  .area006-001{
    display :inline-flex;
    width: 470px;
    height: 25px;
  }
  /*右上ボタンエリア*/
  .area006-002{
    display :inline-flex;
    margin-left: 228px;
    width: 10px;
    height: 25px;
  }
  /*グリッド*/
  .Gridicrn006-001{
    margin-top: 10px;
    width: 940px;
    height: 380px;
    border: 1px solid;
    border-color: #8ffd7a !important;
  }
  /*グリッドヘッダ*/
  .column-header006{
  font-size:medium;
  font-weight:normal !important;
  text-align: center !important;
  background-color: #dffae0 !important;
  border-color: #8ffd7a !important;
  }
  /*特記事項エリア*/
  .area006-003{
    display :inline-flex;
    width: 950px;
    height: 260px;
  }
  /*特記事項タイトル*/
  .kotei006title1{ 
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 0px;
    height: 250px;
    width: 90px;
    line-height:250px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  /*特記事項テキスト*/
  .kotei006inp1{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 250px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;      

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;    
  }

  /*ボタンエリア*/
  .area006-004{
    display :inline-flex;
    width: 10px;
    height: 25px;
  }
  /*クリアボタン*/
  .clsbtnmenu006-clr{
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*削除ボタン*/
  .clsbtnmenu006-del{
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*登録ボタン*/
  .clsbtnmenu006-ins{
    margin-top: 0px;
    margin-left: 717px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  /*ダイアログ*/
    .koteititle006-head{
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }
  .koteiheadinp006{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 180px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }
  .clssheet-head006{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 270px;
    height:  110px;
  }

  /* データ入力ダイアログ */
  .clssheet-chu007{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 670px;
    height:  380px;
  }
  .area007-001{
    display :inline-flex;
    width: 660px;
    height: 25px;
  }
  .clsstitle007-001{
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width:640px;
    height: 25px;
    text-align: center;
  }

  .area007-All{
    display :inline-flex;
    margin-top: 5px;
    width: 700px;
    height: 175px;

    //border: 1px solid !important;
    //border-color: #7e7e7e !important;       
  }
  .area007-Left{
    width: 440px;
    height: 200px;
    //border: 1px solid !important;
    //border-color: #7e7e7e !important;       
  }
  .area007-Right{
    width: 440px;
    height: 200px;
  }


  /*傷病名*/
  .area007-002{
    display :inline-flex;
    margin-top: 5px;
    width: 660px;
    height: 30px;
  }
  .clsstitle007-002
  {
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }
  .clsstitle007-003{
    background-color: #fffeee;
    margin-left: 3px;
    width: 330px;
    text-align: left;
    border-bottom: 1px solid;
    border-color: #adadad;
  }

    /*医療機関*/
    .area007-003{
    display :inline-flex;
    margin-top: 5px;
    width: 945px;
    height: 30px;
  }
  .clsstitle007-004
  {
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }
  .clssinp007-001{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 500px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

    /*診療科*/
    .area007-004{
    display :inline-flex;
    margin-top: 5px;
    width: 945px;
    height: 30px;
  }
  .clsstitle007-005
  {
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }
  .clssinp007-002{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 500px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

    /*主治医*/
    .area007-005{
    display :inline-flex;
    margin-top: 5px;
    width: 945px;
    height: 30px;
  }
  .clsstitle007-006
  {
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }
  .clssinp007-003{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 500px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

    /*連絡先*/
    .area007-006{
    display :inline-flex;
    margin-top: 5px;
    width: 945px;
    height: 30px;
  }
  .clsstitle007-007
  {
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    background-color: #caf2f5;
    border-color: #7ad8fd;
  }
  .clssinp007-004{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

  /*区分*/
  .area007-007{
    display :inline-flex;
    margin-top: 5px;
    width: 945px;
    height: 30px ;
  }
  .clsstitle007-008
  {
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }
  .clssinp007-005{
    margin-left: 3px;
    margin-top: -3px;
    height: 30px;
    text-align: left;
  }
  .clsstitle007-011
  {
    display :inline-flex;
    font-size: 16px;
    margin-left: 3px;
    height: 30px;
    width: 40px;
    line-height:30px;
    text-align: center !important;
  }
  .clssinp007-006{
    margin-left: 3px;
    margin-top: -3px;
    height: 30px;
    text-align: left;
  }
  .clsstitle007-012
  {
    display :inline-flex;
    font-size: 16px;
    margin-left: 3px;
    height: 30px;
    width: 40px;
    line-height:30px;
    text-align: center !important;
  }
  .clssinp007-007{
    margin-left: 3px;
    margin-top: -3px;
    height: 30px;
    text-align: left;
  }  
  .clsstitle007-013
  {
    display :inline-flex;
    font-size: 16px;
    margin-left: 3px;
    height: 30px;
    width: 40px;
    line-height:30px;
    text-align: center !important;
  }
    /*通院頻度*/
      .area007-008{
    display :inline-flex;
    margin-top: 5px;
    width: 945px;
    height: 30px;
  }
  .clsstitle007-009
  {
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }
  .clssinp007-008{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }
    /*服用状況*/
    .area007-009{
    display :inline-flex;
    margin-top: 5px;
    width: 600px;
    height: 60px;
    flex-wrap: wrap;
  }
  .clsstitle007-010
  {
    font-size: 16px;
    margin-left: 0px;
    height: 60px;
    width: 90px;
    line-height:60px;
    text-align: center;
    border: 1px solid;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
  }

  .area007-010{
    display :inline-flex;
    margin-top: 0px ;
    margin-left: 3px ;
    flex-wrap:wrap;
    width: 330px;
    height: 30px;
  }
  .clssinp007-009{
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }
  
  .clssinp007-010{
    background-color: #ffffff;
    margin-left: 0px;
    margin-top: 0px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

  /*ボタン*/
  .area007-011{
    display :inline-flex;
    width: 900px;
    height: 25px;
  }

  .clsbtnmenu007-clr{
    margin-top: 7px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  .clsbtnmenu007-del{
    margin-top: 7px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  .clsbtnmenu007-ins{
    margin-top: 7px;
    margin-left: 430px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }  


  //グリッドの設定
  #Gridicrn006-id {
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

  #GrdReki {
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
  //#####表示順変更ダイアログ#####
  .kotei006title_sort{
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 980px;
    height: 25px;
    text-align: center;
  }

    .clssheet006-sort{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 1020px;
    height: 482px ;
  }

  .area006-sort{
    display: inline-flex;
    width: 1020px;
    height:  35px;
  }
  
  .Gridicrn006-sort{
    font-size: 15px;
    margin-top: 5px;
    width: 1010px;
    height: 400px;
    border: 1px solid;
    border-color: #8ffd7a !important;
  }

  .clsbtnmenu006-clr-sort{
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  .clsbtnmenu006-ins-sort{
    margin-top: 0px;
    margin-left: 855px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  #Gridicrnsort-id {
    
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

  /*
  .Gridicrn006-sort{
    margin-top: 10px;
    width: 940px;
    height: 380px;
    border: 1px solid;
    border-color: #8ffd7a !important;
  }
  */

  //履歴無しラベル1
  .clsstitle1_Noreki_back_006
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128,128,128,0.55);
    height: 750px;
    width: 955px;
    line-height:955px;
    text-align: center;
  }
  //履歴無しラベル2
  .clsstitle1_Noreki_006
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 310px;
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

  .column-Mst06{
    font-size:medium;
    font-weight:normal !important;
    text-align: center !important;
    background-color: #d6f3fc !important;
    border-color: #4396e4 !important;
  }
  .GridMst06{
    font-size: 16px;
    margin-top: 3px;
    margin-left: 6px;
    width: 210px !important;
    height: 172px;
    border: 1px solid;
    border-color: #4396e4 !important;
    background-color: #dffae0;
  } 


  .clsbtnmenu006-hyoji{
    margin-top: 0px;
    margin-left: 828px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
</style>