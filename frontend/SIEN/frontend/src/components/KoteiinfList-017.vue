<template>
    <v-sheet class="clssheet-chu017" elevation="2">

      <label class="clsstitle1_Noreki_back_017" v-show="Label_Visible">
        <label class="clsstitle1_Noreki_017" >履歴を作成してください</label>
      </label>

      <div class="area017-001">
            <label class="clsstitle017-001">手帳情報</label>
            <v-card class="ml-2" elevation="3">
            <a class="addBtn_kotei" @click="onHeadclick_ins">新規作成</a>
            </v-card>             
        </div>

        <label class="clsstitle1_tyosa mt-3" id ="Ymd">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

        <v-btn 
          :disabled="Label_Visible == true"          
          id="tyosa_ymd"
          class="btnymd_kotei ml-1"
          @click="inputCalendarClick(7)"
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

        <div class="area017-002">
          <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
            前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
            履歴参照
            </v-btn>
        </div>     

        <div class="area017-003">
            <label class="clsstitle017-003">障害支援区分</label>
            <label id="lblsyogaikbn" class="clssinp017-002"> </label>
            <label class="clsstitle017-004">有効期間</label>
            <label id="lblyukokikakn" class="clssinp017-004"> </label>
        </div>

        <div class="area017-004-all">

        <div class="area017-004">
            <label class="clsstitle017-006">身体障害者手帳</label>
            <div class="area017-004-001">
                <div class="area017-004-002">
                    <label class="clsstitle017-007">手帳番号</label>
                    <input type="text" id = "clssinp017-005_id" class="clssinp017-005" v-model="dispsinsyo_no" @input="text_input(0)"/>  
                </div>

                <div class="area017-004-003">
                    <label class="clsstitle017-008">交付年月日</label>                       
                    <!--カレンダー-->
                    <v-btn
                      :disabled="Label_Visible == true"
                      @click="inputCalendarClick(0)"
                      tile
                      elevation="2"
                      width="200px"
                      height="30px"
                      class="clssinp017-006"
                      >{{ this.sintai_kouhuYm }}
                      <div class="float-right">
                        <v-icon small>mdi-calendar-month</v-icon>
                      </div>
                    </v-btn>                  
                  
                </div>

                <div class="area017-004-004">
                    <label class="clsstitle017-009">種別</label>
                    <div class="area017-004-004-chk">
                        <v-radio-group :disabled="Label_Visible == true" row v-model="radio001" class="radiogroup001">
                        <v-radio class="clssinp017-007-1"   value="radio001-1" @click="click_radio(0)">
                          <template  v-slot:label >
                            <div id="clssinp017-007-1_text">1種</div>
                          </template>                          
                        </v-radio>
                        <v-radio class="clssinp017-007-2"  value="radio001-2" @click="click_radio(1)">
                          <template  v-slot:label >
                            <div id="clssinp017-007-2_text">2種</div>
                          </template>                          
                        </v-radio>                
                        </v-radio-group> 
                    </div>
                    <label class="clsstitle017-010">等級</label>
                    <select
                      class="customSelectBox ml-1 mt-1"
                      v-model="dispsinsyo_tokyu"
                      @change="onComboClicked"
                      style="width: 100px; height: 30px">
                    
                      <option v-for="val in sinsyo_tokyuList" :key="val.id" :value="val.id">
                        {{ val.name }}
                      </option>
                    </select>                                  
                    <label class="clsstitle017-011 mt1">級</label>
                </div>
                
                <div class="area017-004-005">
                    <label class="clsstitle017-012">障害名</label>
                      <div class="area017-004-006">
                          <input  type="text" class="clssinp017-008" v-model="dispsinsyo_syogainm1" @click="click_syogaitext(1)" readonly/>
                          <input  type="text" class="clssinp017-009" v-model="dispsinsyo_syogainm2" @click="click_syogaitext(2)" readonly/>
                          <input  type="text" class="clssinp017-010" v-model="dispsinsyo_syogainm3" @click="click_syogaitext(3)" readonly/>
                          <input  type="text" class="clssinp017-011" v-model="dispsinsyo_syogainm4" @click="click_syogaitext(4)" readonly/>
                          <input type="text" class="clssinp017-011_2" v-model="dispsinsyo_syogainm5" @click="click_syogaitext(5)" readonly/>
                      </div>                
                  </div>
            </div>
            </div>

            <div v-show="Label_Visible != true" class="GridMstarea_017">
              <!--マスタエリア-->
              <wj-flex-grid
              id="GridMst_id"
              class="GridMst017"
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
              <wj-flex-grid-column header="障害名" binding="name" :width="280" :wordWrap=true :allowResizing=false id="MstGrid_col1"></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="id" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
              <wj-flex-grid-column header="" binding="value" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            </wj-flex-grid>

            </div> 

          </div>
            <div class="area017-005">
            <label class="clsstitle017-013">療育手帳</label>
              <div class="area017-005-001">
                <div class="area017-005-002">
                    <label class="clsstitle017-014">手帳番号</label>
                    <input type="text" id="clssinp017-012_id" class="clssinp017-012" v-model="dispryoiku_no" @input="text_input(1)"/>                     
                </div>

                <div class="area017-005-003">
                    <label class="clsstitle017-015">程度</label>
                    <select
                      class="customSelectBox ml-1 mt-4"
                      v-model="dispryoiku_teido"
                      @change="onComboClicked"
                      style="width: 100px; height: 30px">
                    
                      <option v-for="val in ryoiku_teidoList" :key="val.id" :value="val.id">
                        {{ val.name }}
                      </option>
                    </select>                       
                    <label class="clsstitle017-016 mt1">級</label>                   
                </div>                

                <div class="area017-005-004">
                    <label class="clsstitle017-017">交付年月日</label>
                    <!--カレンダー-->
                    <v-btn
                      :disabled="Label_Visible == true"
                      @click="inputCalendarClick(1)"
                      tile
                      elevation="2"
                      width="200px"
                      height="85%"
                      class="clssinp017-014"
                      >{{ this.ryoiku_Ym001 }}
                      <div class="float-right">
                        <v-icon small>mdi-calendar-month</v-icon>
                      </div>
                    </v-btn>                    
                </div>

                <div class="area017-005-005">
                    <label class="clsstitle017-018">判定年月日</label>  
                    <!--カレンダー-->
                    <v-btn
                      :disabled="Label_Visible == true"  
                      @click="inputCalendarClick(2)"
                      tile
                      elevation="2"
                      width="200px"
                      height="85%"
                      class="clssinp017-015"
                      >{{ this.ryoiku_Ym002 }}
                      <div class="float-right">
                        <v-icon small>mdi-calendar-month</v-icon>
                      </div>
                    </v-btn>                    

                    <label class="clsstitle017-019">次回判定日</label>                    
                      <!--カレンダー-->
                      <v-btn
                        :disabled="Label_Visible == true"  
                        @click="inputCalendarClick(3)"
                        tile
                        elevation="2"
                        width="200px"
                        height="85%"
                        class="clssinp017-016"
                        >{{ this.ryoiku_Ym003 }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>                    
                </div>
              </div>
            </div>

            <div class="area017-006">
            <label class="clsstitle017-020">精神障害者保健福祉手帳</label>
              <div class="area017-006-001">
                <div class="area017-006-002">
                    <label class="clsstitle017-021">手帳番号</label>
                    <input type="text" id="clssinp017-017_id" class="clssinp017-017" v-model="dispseisin_no" @input="text_input(1)"/>                     
                </div>

                <div class="area017-006-003">
                    <label class="clsstitle017-022">程度</label>
                    <select
                      class="customSelectBox ml-1 mt-4"
                      v-model="dispseisin_teido"
                      @change="onComboClicked"
                      style="width: 100px; height: 30px">
                    
                      <option v-for="val in seisin_teidoList" :key="val.id" :value="val.id">
                        {{ val.name }}
                      </option>
                    </select>                      
                    <label class="clsstitle017-023 mt1">級</label>                   
                </div>                

                <div class="area017-006-004">
                    <label class="clsstitle017-024">交付年月日</label>
                      <!--カレンダー-->
                      <v-btn
                        :disabled="Label_Visible == true"  
                        @click="inputCalendarClick(4)"
                        tile
                        elevation="2"
                        width="200px"
                        height="85%"
                        class="clssinp017-018"
                        >{{ this.seisin_Ym001 }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>                                          
                </div>

                <div class="area017-006-005">
                    <label class="clsstitle017-025">判定年月日</label>
                      <!--カレンダー-->
                      <v-btn
                        :disabled="Label_Visible == true"  
                        @click="inputCalendarClick(5)"
                        tile
                        elevation="2"
                        width="200px"
                        height="85%"
                        class="clssinp017-019"
                        >{{ this.seisin_Ym002 }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>                                        
                    <label class="clsstitle017-026">次回判定日</label>
                      <!--カレンダー-->
                      <v-btn
                        :disabled="Label_Visible == true"  
                        @click="inputCalendarClick(6)"
                        tile
                        elevation="2"
                        width="200px"
                        height="85%"
                        class="clssinp017-020"
                        >{{ this.seisin_Ym003 }}
                        <div class="float-right">
                          <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                      </v-btn>                                                              
                </div>
              </div>
            </div>            

            <div class="area017-007">
              <label class="clsstitle017-027">特記事項</label>
              <textarea  class="clssinp017-021" v-model="dispTok"></textarea>              
            </div>

            <div class="area017-008">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu017-clr" @click="onClickclr_data">
                クリア
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu017-del" @click="onClickdel_data">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu017-ins" @click="onClickins_data">
                登 録
            </v-btn>             
        </div> 

        <!-- ダイアログエリア -->
     
        <!-- 精神手帳交付年月日 -->
        <v-dialog
          v-model="datepicker_dialog"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker001"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect"
          >
          </v-date-picker>
        </v-dialog>

        <!-- 療育手帳交付年月日 -->
        <v-dialog
          v-model="datepicker_dialog_ryoiku001"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker_ryoiku001"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_ryoiku001"
          >
          </v-date-picker>
        </v-dialog>
        <!-- 療育手帳判定日 -->
        <v-dialog
          v-model="datepicker_dialog_ryoiku002"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker_ryoiku002"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_ryoiku002"
          >
          </v-date-picker>
        </v-dialog>

        <!-- 療育手帳次回判定日 -->
        <v-dialog
          v-model="datepicker_dialog_ryoiku003"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker_ryoiku003"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_ryoiku003"
          >
          </v-date-picker>
        </v-dialog>        

        <!-- 精神手帳交付年月日 -->
        <v-dialog
          v-model="datepicker_dialog_seisin001"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker_seisin001"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_seisin001"
          >
          </v-date-picker>
        </v-dialog>

        <!-- 精神手帳判定日 -->
        <v-dialog
          v-model="datepicker_dialog_seisin002"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker_seisin002"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_seisin002"
          >
          </v-date-picker>
        </v-dialog>

        <!-- 精神手帳次回判定日 -->
        <v-dialog
          v-model="datepicker_dialog_seisin003"
          width="300"
          class="datepicker_dialogs"
        >
          <v-date-picker
            id="Datepicker_seisin003"

            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_seisin003"
          >
          </v-date-picker>
        </v-dialog>

       <!-- ヘッダダイアログエリア --> 
       <v-dialog  v-model="InsWinhead" width="255">
          
          <v-sheet class="clssheet-head" elevation="2" 
            id ="head_win_id017"
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
            
            <!--koteiheadinp1-->
            <!--v-model="dispymdhead"-->
            <v-btn 
              class="btnymd ml-1"
              @click="inputCalendarClick(8)"
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
          class="datepicker_dialogs"
        >
        <v-date-picker
            id="Datepicker_head"
            v-model="picker"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
            @change="monthSelect_head">
          </v-date-picker>
        </v-dialog>        

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="262" >
          <v-sheet id="kakunin_id017" class="clssheet-Mes" elevation="2">
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
        <v-sheet id="rireki_id017" class="clssheet-Reki" elevation="2"
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
    import * as wjCore from '@grapecity/wijmo';    

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
          
            radio001: 'radio001-1',
            
            sintai_yukokikansymd: '', //有効期間開始日
            sintai_yukokikaneymd: '', //有効期間終了日
            
            sintai_kouhuYm: '', //身体手帳交付年月日

            ryoiku_Ym001: '',   //療育手帳交付年月日
            ryoiku_Ym002: '',   //療育手帳判定年月日
            ryoiku_Ym003: '',   //療育手帳次回判定日

            seisin_Ym001: '',   //精神手帳交付年月日
            seisin_Ym002: '',   //精神手帳判定年月日
            seisin_Ym003: '',   //精神手帳次回判定日

            picker: '',

            datepicker_dialog_symd: false,
            datepicker_dialog_eymd: false,
            datepicker_dialog: false,
            datepicker_dialog_ryoiku001: false,
            datepicker_dialog_ryoiku002: false,
            datepicker_dialog_ryoiku003: false,
            datepicker_dialog_seisin001: false,
            datepicker_dialog_seisin002: false,
            datepicker_dialog_seisin003: false,


            //データ表示用
            pdataid:'',         //ヘッダデータid
            intcode:0,          //表示しているintcode
            pmymd:'',           //表示しているMYMD
            pmymd_moto:'',      //表示している元MYMD AAA
            griddata:[],          //API取得データ
            gridSeldata:[],       //API取得データ(履歴)
            GetViewDataInf:[],    //API取得データ(データ)
            viewdata_reki: [],       //履歴グリッド表示データ

            sinsyo_tokyuList:[],  //身障手帳等級リスト
            ryoiku_teidoList:[],  //療育手帳等級リスト
            seisin_teidoList:[],  //精神手帳等級リスト
            syogai_All_List:[],     //障害大項目リスト
            syogai_dai_List:[],     //障害大項目リスト
            syogai_tyu_List:[],     //障害中項目リスト
            syogai_syo_List:[],     //障害小項目リスト



            //ダイアログ表示用引数
            selected_btn:0,
            InsWinhead:false,
            InsWindata:false,
            Rirekiwin:false,
            dispymdhead:"",
            datepicker_dialog_head: false,
            datepicker_dialog_tyosa: false, //調査日カレンダー

            //履歴作成アナウンス
            Label_Visible:false,

            //dragflg
            Dragflg:false,
            mouseX:0,
            mouseY:0,
            screenX:0,
            screenY:0,
            moveX:0,
            moveY:0,
            
            //確認ダイアログ
            dialog_Message_flg:false,
            Dialog_Message:'',       //ダイアログメッセージ
            dialo_Yesflg:false,      //ダイアログ結果
            dialo_Yesflg_no:0,
            Btnno_Visible:false,     //「いいえ」ボタン表示設定     
            
            //入力チェック
            inputchk:false,            

            //画面表示用変数
            dispsyogaisienkbn:"",
            dispsyogaisienkikan:"",
            dispsinsyo_no:"",
            dispsinsyo_kofuymd:"",
            dispsinsyo_syubetu:"",
            dispsinsyo_tokyu:0,
            dispsinsyo_syogaidaiid1:0,
            dispsinsyo_syogaidaiid2:0,
            dispsinsyo_syogaidaiid3:0,
            dispsinsyo_syogaidaiid4:0,
            dispsinsyo_syogaidaiid5:0,
            dispsinsyo_syogaityuid1:0,
            dispsinsyo_syogaityuid2:0,
            dispsinsyo_syogaityuid3:0,
            dispsinsyo_syogaityuid4:0,
            dispsinsyo_syogaityuid5:0,
            dispsinsyo_syogaisyoid1:0,
            dispsinsyo_syogaisyoid2:0,
            dispsinsyo_syogaisyoid3:0,
            dispsinsyo_syogaisyoid4:0,
            dispsinsyo_syogaisyoid5:0,                                    
            dispsinsyo_syogainm1:"",
            dispsinsyo_syogainm2:"",
            dispsinsyo_syogainm3:"",
            dispsinsyo_syogainm4:"",
            dispsinsyo_syogainm5:"",
            dispryoiku_no:"",
            dispryoiku_teido:"",
            dispryoiku_kofuymd:"",
            dispryoiku_hanteiymd:"",
            dispryoiku_hanteiymd_next:"",
            dispseisin_no:"",
            dispseisin_teido:"",
            dispseisin_kofuymd:"",
            dispseisin_hanteiymd:"",
            dispseisin_hanteiymd_next:"",
            dispTok:"",

            Get_inputinf_sinsyo:this.get_inputdata(),
            Get_inputinf_ryoiku:[],
            Get_inputinf_seisin:[],
            Get_inputinf_syogainm:[],


            MstList:[],
            Mstflg:1,       //1::大 2:中 3:小
            Msttextflg:1,   //1:項目1 2:項目2 3:項目3 4:項目4 5:項目5
            pMst_daiid:0,   //選択したマスタ大ID
            pMst_tyuid:0,   //選択したマスタ中ID



        }
        },
        methods:
        {
          get_inputdata() 
          {
            //程度を取得
            
            //API取得
            let _self = this;
            let params = [];
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,    
              pJigyoid: this.jigyoid,
              pKbn:1
            };
            getConnect('/Mst_tokyu', params,'KOTEIINF').then((result) => {
              _self.Get_inputinf_sinsyo = result;
              this.DspSinsyoTokyu();
            });

            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,    
              pJigyoid: this.jigyoid,
              pKbn:2
            };
            getConnect('/Mst_tokyu', params,'KOTEIINF').then((result) => {
              _self.Get_inputinf_ryoiku = result;
              this.DspryoikuTokyu();
            });
            
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,    
              pJigyoid: this.jigyoid,
              pKbn:3
            };
            getConnect('/Mst_tokyu', params,'KOTEIINF').then((result) => {
              _self.Get_inputinf_seisin = result;
              this.DspseisinTokyu();
            });

            //障害名
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,    
              pJigyoid: this.jigyoid,
            };
            getConnect('/Mst_syogainm', params,'KOTEIINF').then((result) => {
              _self.Get_inputinf_syogainm = result;
              this.Dspsyogainm();
            });

          },

          DspSinsyoTokyu()
          {
            //身障等級画面表示
            let wk_tokyudata =[];
            let wk_tokyulist =[];

            if(this.Get_inputinf_sinsyo.icrn_inf != null)
            {
              //空データ
              wk_tokyudata ={
                id:0,
                name:"",
              }
              wk_tokyulist.push(wk_tokyudata);

              this.Get_inputinf_sinsyo.icrn_inf.forEach(function(value){
                wk_tokyudata = {
                  id:value.id,
                  name:value.name,
                }
                wk_tokyulist.push(wk_tokyudata);
              });
              this.sinsyo_tokyuList = wk_tokyulist.concat();
            }
          },

          DspryoikuTokyu()
          {
            //療育等級画面表示
            let wk_tokyudata =[];
            let wk_tokyulist =[];

            if(this.Get_inputinf_ryoiku.icrn_inf != null)
            {
              //空データ
              wk_tokyudata ={
                id:0,
                name:"",
              }
              wk_tokyulist.push(wk_tokyudata);


              this.Get_inputinf_ryoiku.icrn_inf.forEach(function(value){
                wk_tokyudata = {
                  id:value.id,
                  name:value.name,
                }
                wk_tokyulist.push(wk_tokyudata);
              });
              this.ryoiku_teidoList = wk_tokyulist.concat();
            }

          },
          
          DspseisinTokyu()
          {
            //精神等級画面表示
            let wk_tokyudata =[];
            let wk_tokyulist =[];

            if(this.Get_inputinf_seisin.icrn_inf != null)
            {
              //空データ
              wk_tokyudata ={
                id:0,
                name:"",
              }
              wk_tokyulist.push(wk_tokyudata);


              this.Get_inputinf_seisin.icrn_inf.forEach(function(value){
                wk_tokyudata = {
                  id:value.id,
                  name:value.name,
                }
                  wk_tokyulist.push(wk_tokyudata);
              });
              this.seisin_teidoList = wk_tokyulist.concat();
            }

          },
          Dspsyogainm(){
            //障害名

            let wk_syogaidata =[];
            let wk_syogailist_All =[];
            let wk_syogailist_dai =[];
            let wk_syogailist_tyu =[];
            let wk_syogailist_syo =[];            

          
            if(this.Get_inputinf_syogainm != null)
            {
              //障害名リスト

              //空データ
              wk_syogaidata={
                id:0,
                name:"(クリア)",
                value:" "
              }
              wk_syogailist_dai.push(wk_syogaidata);
              wk_syogailist_tyu.push(wk_syogaidata);
              wk_syogailist_syo.push(wk_syogaidata);

              //リストをループ
              this.Get_inputinf_syogainm.icrn_inf.forEach(function(value){
                wk_syogaidata={
                  id:value.daiNcod,
                  name:value.daiName,
                  value:value.daiName
                }
                wk_syogailist_All.push(value);
                wk_syogailist_dai.push(wk_syogaidata);

                //中項目
                value.tyuList.forEach(function(value2){
                  wk_syogaidata={
                    id:value2.tyuNcod,
                    name:value2.tyuName,
                    value:value2.tyuName
                  }
                  wk_syogailist_tyu.push(wk_syogaidata);
                  
                  //小項目
                  value2.syoList.forEach(function(value3){
                    wk_syogaidata={
                      id:value3.syoNcod,
                      name:value3.syoName,
                      value:value3.syoName
                    }
                    wk_syogailist_syo.push(wk_syogaidata);
                  });                  
                });                  
              });
            }

            this.syogai_All_List = wk_syogailist_All.concat();
            this.syogai_dai_List = wk_syogailist_dai.concat();
            this.syogai_tyu_List = wk_syogailist_tyu.concat();
            this.syogai_syo_List = wk_syogailist_syo.concat();
            this.MstList = this.syogai_dai_List;
            this.Mstflg = 1;  //大項目

          }
          
          ,click_syogaitext(kbn){
            //障害名テキストクリック
            this.Msttextflg = kbn;
            this.DspMst_dai();
            this.Mstflg = 1;
          }

          ,get_ym_symd() {
            if (!this.sintai_yukokikansymd) {
              this.sintai_yukokikansymd = dayjs();
              this.picker = this.sintai_yukokikansymd.year() + '-' + this.sintai_yukokikansymd.format('MM');
              }
            return (
              this.sintai_yukokikansymd.format('YYYY') + '年' + this.sintai_yukokikansymd.format('MM') + '月' + this.sintai_yukokikansymd.format('DD') + '日'
            );
          },
          get_ym_eymd() {
            if (!this.sintai_yukokikaneymd) {
              this.sintai_yukokikaneymd = dayjs();
              this.picker = this.sintai_yukokikaneymd.year() + '-' + this.sintai_yukokikaneymd.format('MM');
              }
            return (
              this.sintai_yukokikaneymd.format('YYYY') + '年' + this.sintai_yukokikaneymd.format('MM') + '月' + this.sintai_yukokikaneymd.format('DD') + '日'
            );
          },
          get_ym_sintai() {
            if (!this.sintai_kouhuYm) {
              this.sintai_kouhuYm = dayjs();
              this.picker = this.sintai_kouhuYm.year() + '-' + this.sintai_kouhuYm.format('MM');
              }
            return (
              this.sintai_kouhuYm.format('YYYY') + '年' + this.sintai_kouhuYm.format('MM') + '月' + this.sintai_kouhuYm.format('DD') + '日'
            );
          },
          get_ym_ryoiku001() {
            if (!this.ryoiku_Ym001) {
              this.ryoiku_Ym001 = dayjs();
              this.picker = this.ryoiku_Ym001.year() + '-' + this.ryoiku_Ym001.format('MM');
              }
            return (
              this.ryoiku_Ym001.format('YYYY') + '年' + this.ryoiku_Ym001.format('MM') + '月' + this.ryoiku_Ym001.format('DD') + '日'
            );
          },  
          get_ym_ryoiku002() {
            if (!this.ryoiku_Ym002) {
              this.ryoiku_Ym002 = dayjs();
              this.picker = this.ryoiku_Ym002.year() + '-' + this.ryoiku_Ym002.format('MM');
              }
            return (
              this.ryoiku_Ym002.format('YYYY') + '年' + this.ryoiku_Ym002.format('MM') + '月' + this.ryoiku_Ym002.format('DD') + '日'
            );  
          },          
          get_ym_ryoiku003() {
            if (!this.ryoiku_Ym003) {
              this.ryoiku_Ym003 = dayjs();
              this.picker = this.ryoiku_Ym003.year() + '-' + this.ryoiku_Ym003.format('MM');
              }
            return (
              this.ryoiku_Ym003.format('YYYY') + '年' + this.ryoiku_Ym003.format('MM') + '月' + this.ryoiku_Ym003.format('DD') + '日'
            );  
          },          
          get_ym_seisin001() {
            if (!this.seisin_Ym001) {
              this.seisin_Ym001 = dayjs();
              this.picker = this.seisin_Ym001.year() + '-' + this.seisin_Ym001.format('MM');
              }
            return (
              this.seisin_Ym001.format('YYYY') + '年' + this.seisin_Ym001.format('MM') + '月' + this.seisin_Ym001.format('DD') + '日'
            );
          },
          get_ym_seisin002() {
            if (!this.seisin_Ym002) {
              this.seisin_Ym002 = dayjs();
              this.picker = this.seisin_Ym002.year() + '-' + this.seisin_Ym002.format('MM');
              }
            return (
              this.seisin_Ym002.format('YYYY') + '年' + this.seisin_Ym002.format('MM') + '月' + this.seisin_Ym002.format('DD') + '日'
            );
          },          
          get_ym_seisin003() {
            if (!this.seisin_Ym003) {
              this.seisin_Ym003 = dayjs();
              this.picker = this.seisin_Ym003.year() + '-' + this.seisin_Ym003.format('MM');
              }
            return (
              this.seisin_Ym003.format('YYYY') + '年' + this.seisin_Ym003.format('MM') + '月' + this.seisin_Ym003.format('DD') + '日'
            );
          },          
          inputCalendarClick(kbn) {
            if(kbn == 0)
            {
              this.picker = this.sintai_kouhuYm.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");             
              this.datepicker_dialog = true; 
            }
            else if(kbn == 1)
            {
              this.picker = this.ryoiku_Ym001.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");              
              this.datepicker_dialog_ryoiku001 = true; 
            }
            else if(kbn == 2)
            {
              this.picker = this.ryoiku_Ym002.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");              
              this.datepicker_dialog_ryoiku002 = true; 
            }
            else if(kbn == 3)
            {
              this.picker = this.ryoiku_Ym003.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");
              this.datepicker_dialog_ryoiku003 = true; 
            }
            else if(kbn == 4)
            {
              this.picker = this.seisin_Ym001.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");              
              this.datepicker_dialog_seisin001 = true; 
            }
            else if(kbn == 5)
            {
              this.picker = this.seisin_Ym002.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");              
              this.datepicker_dialog_seisin002 = true; 
            }            
            else if(kbn == 6)
            {
              this.picker = this.seisin_Ym003.replace("年","-");
              this.picker = this.picker.replace("月","-");
              this.picker = this.picker.replace("日","");              

              this.datepicker_dialog_seisin003 = true; 
            }            
            else if(kbn == 7)
            {
                this.picker = this.pmymd.replace("年","-");
                this.picker = this.picker.replace("月","-");
                this.picker = this.picker.replace("日","");
                this.datepicker_dialog_tyosa = true;
            }
            else if(kbn == 8)
            {
                this.picker = this.pmymd.replace("年","-");
                this.picker = this.picker.replace("月","-");
                this.picker = this.picker.replace("日","");
                this.datepicker_dialog_head = true;
            }                        

          },                 
          monthSelect() {
            let wk_ymd = dayjs(this.picker);
            this.sintai_kouhuYm = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog = false;
          },
          monthSelect_ryoiku001() {
            let wk_ymd = dayjs(this.picker);
            this.ryoiku_Ym001 = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog_ryoiku001 = false;
          },
          monthSelect_ryoiku002() {
            let wk_ymd = dayjs(this.picker);
            this.ryoiku_Ym002 = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog_ryoiku002 = false;
          },
          monthSelect_ryoiku003() {
            let wk_ymd = dayjs(this.picker);
            this.ryoiku_Ym003 = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog_ryoiku003 = false;
          },
          monthSelect_seisin001() {
            let wk_ymd = dayjs(this.picker);
            this.seisin_Ym001 = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog_seisin001 = false;
          },
          monthSelect_seisin002() {
            let wk_ymd = dayjs(this.picker);
            this.seisin_Ym002 = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog_seisin002 = false;
          },
          monthSelect_seisin003() {
            let wk_ymd = dayjs(this.picker);
            this.seisin_Ym003 = wk_ymd.format('YYYY') + '年' + wk_ymd.format('MM') + '月' + wk_ymd.format('DD') + '日';
            this.datepicker_dialog_seisin003 = false;
          },        
          
          

        monthSelect_tyosa() 
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
          ,monthSelect_head()
          {
            //調査日カレンダー
            this.Ym = dayjs(this.picker); 
            this.datepicker_dialog_head = false;
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
          },
          //カレンダー
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
          }       
          
          ,setUserData(wintcode,wSeldata)
          {
            //利用者選択データ受け取り
            this.pdataid = 0; //初期化
            this.viewClear();
            this.GetViewDataInf = [];
            this.gridSeldata = wSeldata;
            this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
            this.intcode = wintcode;          //利用者コード
            this.DataFilter();

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

            //画面表示
            document.getElementById("lblsyogaikbn").innerHTML = wjCore.escapeHtml("");
            document.getElementById("lblyukokikakn").innerHTML = wjCore.escapeHtml("");
            this.dispsinsyo_no = "";
            this.sintai_kouhuYm = "";
            this.radio001 = "radio001-1";
            document.getElementById("clssinp017-007-1_text").style.color = "#0081eb";
            document.getElementById("clssinp017-007-2_text").style.color = "";                            

            //身障等級
            this.dispsinsyo_tokyu = 0;
            this.dispsinsyo_syogaidaiid1=0,
            this.dispsinsyo_syogaidaiid2=0,
            this.dispsinsyo_syogaidaiid3=0,
            this.dispsinsyo_syogaidaiid4=0,
            this.dispsinsyo_syogaidaiid5=0,
            this.dispsinsyo_syogaityuid1=0,
            this.dispsinsyo_syogaityuid2=0,
            this.dispsinsyo_syogaityuid3=0,
            this.dispsinsyo_syogaityuid4=0,
            this.dispsinsyo_syogaityuid5=0,
            this.dispsinsyo_syogaisyoid1=0,
            this.dispsinsyo_syogaisyoid2=0,
            this.dispsinsyo_syogaisyoid3=0,
            this.dispsinsyo_syogaisyoid4=0,
            this.dispsinsyo_syogaisyoid5=0,              
            this.dispsinsyo_syogainm1 = "";
            this.dispsinsyo_syogainm2 = "";
            this.dispsinsyo_syogainm3 = "";
            this.dispsinsyo_syogainm4 = "";
            this.dispsinsyo_syogainm5 = "";
            
            //療育等級
            this.dispryoiku_no = "";
            this.dispryoiku_teido = 0;
            this.ryoiku_Ym001 = "";       
            this.ryoiku_Ym002 = "";       
            this.ryoiku_Ym003 = "";

            //精神
            this.dispseisin_no = "";
            this.dispseisin_teido = 0;
            this.seisin_Ym001 = "";

            this.seisin_Ym002 = "";
            this.seisin_Ym003 = "";
            this.tokflg = false;
            this.dispTok = "";

            let ini_day = dayjs();
            ini_day = ini_day.format('YYYY') + '年' + ini_day.format('MM') + '月' + ini_day.format('DD') + '日'
            this.sintai_kouhuYm = ini_day;
            this.ryoiku_Ym001 = ini_day;
            this.ryoiku_Ym002 = ini_day;
            this.ryoiku_Ym003 = ini_day;
            this.seisin_Ym001 = ini_day;
            this.seisin_Ym002 = ini_day;
            this.seisin_Ym003 = ini_day;

            //障害マスタのクリア
            this.Clr_Syogainm();
            this.Mstflg = 1;
            this.DspMst_dai();

          }          

          //フィルター
          ,DataFilter() { 
            let data = [];
            let Rekidata = [];
            let wk_Rekidata = [];
            let wk_kbn = this.kotei_kbn;
            
            if(this.gridSeldata.icrn_inf != null)
            {                    
            //手帳情報のデータのみに絞る
            this.gridSeldata.icrn_inf.forEach(function (value) {

              //区分が手帳情報
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

                //手帳情報ヘッダの内容を取得
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
            //手帳情報
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
              Kbn: this.kotei_kbn,             //手帳情報
              Dataid: this.pdataid,
              Modeflg: GET_KBN_DATA,                 //データ取得
            };

            getConnect('/Koteiinf_SYAKAI', params,'KOTEIINF').then((result) => {
              _self.GetViewDataInf = result;
              this.DataFilter2();
            })       
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
          let wk_kbn = this.kotei_kbn;

          if(this.GetViewDataInf.icrn_inf != null)
          { 
          //手帳情報のデータのみに絞る
          this.GetViewDataInf.icrn_inf.forEach(function (value) 
          {
            //区分が手帳情報
            if (value.head_kbn == wk_kbn && value.head_dataid == wdataid ) 
            { 
              Ymd = value.head_mymd;
              //手帳情報ヘッダの内容を取得
              value.naiyo.forEach(function(value2)
              {
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

          //データ格納
          this.str_ymd = Ymd.substring(0, 4)
              + "年" + Ymd.substring(4, 6)
              + "月" + Ymd.substring(6)
              + "日",  
          
          this.pmymd = this.str_ymd;      
          this.pmymd_moto = this.str_ymd;

          if(data.length > 0)
          {
            this.dataflg = dataflg;

            //画面表示
            document.getElementById("lblsyogaikbn").innerHTML = wjCore.escapeHtml(data[0].tetyo_syogaikbn);
            document.getElementById("lblyukokikakn").innerHTML = wjCore.escapeHtml(data[0].tetyo_syogaikikan);
            this.dispsinsyo_no = data[0].tetyo_sinsyobango;
            this.sintai_kouhuYm = data[0].tetyo_sinsyoymd.substring(0, 4)
                    + "年" + data[0].tetyo_sinsyoymd.substring(4, 6)
                    + "月" + data[0].tetyo_sinsyoymd.substring(6)
                    + "日";  

            //種別
            if(data[0].tetyo_sinsyosyubetu == 1)
            {
              //1種
              this.radio001 = "radio001-1";
              document.getElementById("clssinp017-007-1_text").style.color = "#0081eb";
              document.getElementById("clssinp017-007-2_text").style.color = "";                
            }
            else
            {
              //2種
              this.radio001 = "radio001-2";
              document.getElementById("clssinp017-007-1_text").style.color = "";
              document.getElementById("clssinp017-007-2_text").style.color = "#0081eb";
            }

            //身障等級
            this.dispsinsyo_tokyu = data[0].tetyo_sinsyoteidoid;

            //身障手帳障害名
            this.dispsinsyo_syogaidaiid1 = data[0].tetyo_sinsyosyogaidaiid1;
            this.dispsinsyo_syogaityuid1 = data[0].tetyo_sinsyosyogaityuid1;
            this.dispsinsyo_syogaisyoid1 = data[0].tetyo_sinsyosyogaiid1;
            this.dispsinsyo_syogainm1 = this.Get_syogainm(this.dispsinsyo_syogaidaiid1,this.dispsinsyo_syogaityuid1,this.dispsinsyo_syogaisyoid1);
            this.dispsinsyo_syogaidaiid2 = data[0].tetyo_sinsyosyogaidaiid2;
            this.dispsinsyo_syogaityuid2 = data[0].tetyo_sinsyosyogaityuid2;
            this.dispsinsyo_syogaisyoid2 = data[0].tetyo_sinsyosyogaiid2;            
            this.dispsinsyo_syogainm2 = this.Get_syogainm(this.dispsinsyo_syogaidaiid2,this.dispsinsyo_syogaityuid2,this.dispsinsyo_syogaisyoid2);
            this.dispsinsyo_syogaidaiid3 = data[0].tetyo_sinsyosyogaidaiid3;
            this.dispsinsyo_syogaityuid3 = data[0].tetyo_sinsyosyogaityuid3;
            this.dispsinsyo_syogaisyoid3 = data[0].tetyo_sinsyosyogaiid3;
            this.dispsinsyo_syogainm3 = this.Get_syogainm(this.dispsinsyo_syogaidaiid3,this.dispsinsyo_syogaityuid3,this.dispsinsyo_syogaisyoid3);
            this.dispsinsyo_syogaidaiid4 = data[0].tetyo_sinsyosyogaidaiid4;
            this.dispsinsyo_syogaityuid4 = data[0].tetyo_sinsyosyogaityuid4;
            this.dispsinsyo_syogaisyoid4 = data[0].tetyo_sinsyosyogaiid4;
            this.dispsinsyo_syogainm4 = this.Get_syogainm(this.dispsinsyo_syogaidaiid4,this.dispsinsyo_syogaityuid4,this.dispsinsyo_syogaisyoid4);
            this.dispsinsyo_syogaidaiid5 = data[0].tetyo_sinsyosyogaidaiid5;
            this.dispsinsyo_syogaityuid5 = data[0].tetyo_sinsyosyogaityuid5;
            this.dispsinsyo_syogaisyoid5 = data[0].tetyo_sinsyosyogaiid5;            
            this.dispsinsyo_syogainm5 = this.Get_syogainm(this.dispsinsyo_syogaidaiid5,this.dispsinsyo_syogaityuid5,this.dispsinsyo_syogaisyoid5);
            
            //療育等級
            this.dispryoiku_no = data[0].tetyo_ryoikubango;
            this.dispryoiku_teido = data[0].tetyo_ryoikuteidoid;
            this.ryoiku_Ym001 = data[0].tetyo_ryoikuymd.substring(0, 4)
                    + "年" + data[0].tetyo_ryoikuymd.substring(4, 6)
                    + "月" + data[0].tetyo_ryoikuymd.substring(6)
                    + "日";            
            this.ryoiku_Ym002 = data[0].tetyo_ryoikuhanteiymd.substring(0, 4)
                    + "年" + data[0].tetyo_ryoikuhanteiymd.substring(4, 6)
                    + "月" + data[0].tetyo_ryoikuhanteiymd.substring(6)
                    + "日";            
            this.ryoiku_Ym003 = data[0].tetyo_ryoikunxhanteiymd.substring(0, 4)
            + "年" + data[0].tetyo_ryoikunxhanteiymd.substring(4, 6)
            + "月" + data[0].tetyo_ryoikunxhanteiymd.substring(6)
            + "日";            

            //精神
            this.dispseisin_no = data[0].tetyo_seisinbango;
            this.dispseisin_teido = data[0].tetyo_seisinteidoid;

            this.seisin_Ym001 = data[0].tetyo_seisinymd.substring(0, 4)
            + "年" + data[0].tetyo_seisinymd.substring(4, 6)
            + "月" + data[0].tetyo_seisinymd.substring(6)
            + "日";

            this.seisin_Ym002 = data[0].tetyo_hanteiymd.substring(0, 4)
            + "年" + data[0].tetyo_hanteiymd.substring(4, 6)
            + "月" + data[0].tetyo_hanteiymd.substring(6)
            + "日";            
            this.seisin_Ym003 = data[0].tetyo_nxhanteiymd.substring(0, 4)
            + "年" + data[0].tetyo_hanteiymd.substring(4, 6)
            + "月" + data[0].tetyo_nxhanteiymd.substring(6)
            + "日";            

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
          else{
            this.dataflg = dataflg;

            //画面表示
            this.viewClear();

          }
        }             
      }

      ,Get_syogainm:function(daiid,tyuid,syoid)
      {
        //障害名を返す

        let res_syogainm = "";
        let wk_list = []; 
        let dai_list = [];
        let tyu_list = [];
        let syo_list = [];

        
        wk_list = this.syogai_All_List.concat();
        dai_list =  wk_list.find( wk_list => wk_list.daiNcod == daiid);
        //大項目リスト
        if(dai_list != null)
        {
          wk_list = dai_list.tyuList.concat();
          tyu_list = wk_list.find(wk_list => wk_list.tyuNcod == tyuid);
          //中項目リスト
          if(tyu_list != null)
          {
            wk_list = tyu_list.syoList.concat();
            syo_list = wk_list.find(wk_list => wk_list.syoNcod == syoid);
            //小項目
            if(syo_list != null)res_syogainm = syo_list.syoName;
          }
        } 
        return res_syogainm;
      }


      // ####新規作成####
      ,onHeadclick_ins(){
        this.Ym = dayjs();
        this.dispymdhead = this.getYm();

        //新規ボタンクリックイベント
        this.InsWinhead = true;
        this.insflg = true;//新規登録
      }
      ,Click_colse(){
        this.InsWinhead =false;
      }       
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
              kbn: this.kotei_kbn, //手帳情報
              intcode: this.intcode,
              insflg:INS_KBN_HEAD,       //ヘッダ登録
            }
          
            //登録データ
            let postdata = 
            [
              {
                head_jigyoid: this.jigyoid_kotei,
                head_intcode: this.intcode,
                head_kbn: this.kotei_kbn,  //手帳情報
                head_dataid: this.pdataid,
                head_mstid: 0,
                head_mymd: ins_ymd,
                head_siid: 0,
                head_delflg: 0,
                biko_lcnt: 0,
                biko_naiyo: " ",
                kaigo_cntid: 0,
                kaigo_syubetu: 0,
                kaigo_jun: 0,
                kaigo_svskbn: 0,
                kaigo_svsid: " ",
                kaigo_svstext: " ",
                kaigo_teikyokbn: 0,
                kaigo_teikyoid: 0,
                kaigo_teikyotext: " ",
                kaigo_sienkbn: 0,
                kaigo_sienid1: 0,
                kaigo_sienid2: 0,
                kaigo_sienid3: 0,
                kaigo_sienid4: 0,
                kaigo_sienid5: 0,
                kaigo_sientext: " ",
                kaigo_hindokbn: 0,
                kaigo_hindoid: 0,
                kaigo_hindotext: " ",
                kaigo_biko: " ",
                kankei_cntid: 0,
                kankei_no: 0,
                Kankei_kikanid_kbn:0,
                kankei_kikanid: 0,
                kankei_renrakusaki: " ",
                kankei_tantoname: " ",
                kankei_biko: " ",
                tetyo_sinsyobango: " ",
                tetyo_sinsyoymd: " ",
                tetyo_sinsyosyubetu: 0,
                tetyo_sinsyosyogaidaiid1: 0,
                tetyo_sinsyosyogaidaiid2: 0,
                tetyo_sinsyosyogaidaiid3: 0,
                tetyo_sinsyosyogaidaiid4: 0,
                tetyo_sinsyosyogaidaiid5: 0,
                tetyo_sinsyosyogaityuid1: 0,
                tetyo_sinsyosyogaityuid2: 0,
                tetyo_sinsyosyogaityuid3: 0,
                tetyo_sinsyosyogaityuid4: 0,
                tetyo_sinsyosyogaityuid5: 0,
                tetyo_sinsyosyogaiid1: 0,
                tetyo_sinsyosyogaiid2: 0,
                tetyo_sinsyosyogaiid3: 0,
                tetyo_sinsyosyogaiid4: 0,
                tetyo_sinsyosyogaiid5: 0,
                tetyo_ryoikubango: " ",
                tetyo_ryoikuteidoid: 0,
                tetyo_ryoikuymd: " ",
                tetyo_ryoikuhanteiymd: " ",
                tetyo_ryoikunxhanteiymd: " ",
                tetyo_seisinbango: " ",
                tetyo_seisinteidoid: 0,
                tetyo_seisinymd: " ",
                tetyo_seisinhanteiymd: " ",
                tetyo_seisinnxhanteiymd: " "         
              }
            ];

            if(this.insflg == true)
            {
              postConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',postdata).then((result) => 
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
              putConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',postdata).then((result) => 
              {
                _self.griddata = result.icrn_inf;
                _self.gridSeldata = result;
                if(kbn != 1)this.View_upd(this.intcode);
                this.Message_Dialog(sysConst.MSG_REKI_UPD);
                this.InsWinhead =false;                    
              });                
            }

          }          

          ,onItemsSourceChanged(flexGrid) {
            // 初期選択を解除
            flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
          }      

          ,View_upd(intcode)
          {
            //画面更新
            this.$emit('child-dataupd', intcode); //画面更新
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
                //履歴削除
                this.del_data();
              }
              else if(this.dialog_Actionflg == 4)
              {
                //データ登録
                this.ins_data();
              }     
              else if(this.dialog_Actionflg == 5)
              {
                  //画面移動チェック
                  this.dialog_Message_flg = false;
              }
              else if(this.dialog_Actionflg == 6)
              {
                  //前回コピー
                  this.datacopy();
              }                                          
              
          
            }
            else{
              this.dialo_Yesflg = false;
              this.dialo_Yesflg_no = 2;
            }

            this.dialog_Message_flg = false;
          }

          //####履歴####
          ,onClickReki: function() 
          {
            this.Dragflg = false;
            this.Rirekiwin=true;
          },
          
          onInitializeIcrnGridReki(flexGrid)
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
          },       
          
          grid_clickreki(e)
          {
            //履歴クリック

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
                        this.ins_data(1);                
                      }

                      this.inputchk = false //入力チェックリセット
                      //グリッドがクリックされた場合画面の表示を更新する                
                      this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                      this.get_data();
                    }
                }, "interval");
              }
              else{
                //グリッドがクリックされた場合画面の表示を更新する                
                this.inputchk = false;
                this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                this.pmymd  = this.viewdata_reki[ht.row].head_mymd;
                this.get_data();              
              }                      

            }

          }

          ,input_chk: function()
          {
            //入力項目があれば登録メッセージ
            if(this.inputchk == true)
            {
              this.Message_Dialog("登録されていない項目があります。\n 登録しますか。",5); 
            }
          } 

          ,Click_colse_Reki(){
            //履歴ウィンドウ
            this.Rirekiwin =false;
          }             

          //####前回コピー####
          ,onClickCopy() 
          {
            //前回コピーボタン押下時
            this.Dragflg = false;
            this.Message_Dialog(sysConst.MSG_COPY_CHK,6);
          }          

          ,datacopy() 
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

          //#### 登録・削除・クリア
          ,onClickins_data()
          {
            //データ登録ボタン
            this.Message_Dialog(sysConst.MSG_DATA_INS_CHK,4);
          } 

          ,ins_data(kbn)
          {
            //データ登録

            //####登録データ作成####
            let ins_sinsyo_no = " ";             //身障手帳番号
            if(this.dispsinsyo_no != "") ins_sinsyo_no = this.dispsinsyo_no;
            let ins_sinsyo_ymd = " ";            //身障手帳交付年月日
            ins_sinsyo_ymd = this.sintai_kouhuYm.replace("年","");
            ins_sinsyo_ymd = ins_sinsyo_ymd.replace("月","");
            ins_sinsyo_ymd = ins_sinsyo_ymd.replace("日","");

            let ins_sinsyo_syubetu = "";        //身障手帳種別
            if(this.radio001 == "radio001-2")
            {
              ins_sinsyo_syubetu = 2;
            }
            else{
              ins_sinsyo_syubetu = 1;
            }
            let ins_sinsyo_tokyu = this.dispsinsyo_tokyu;                 //身障手帳等級
            let ins_sinsyo_syogaidaiid1 = this.dispsinsyo_syogaidaiid1;   //身障手帳障害大ID
            let ins_sinsyo_syogaidaiid2 = this.dispsinsyo_syogaidaiid2;   //身障手帳障害大ID
            let ins_sinsyo_syogaidaiid3 = this.dispsinsyo_syogaidaiid3;   //身障手帳障害大ID
            let ins_sinsyo_syogaidaiid4 = this.dispsinsyo_syogaidaiid4;   //身障手帳障害大ID
            let ins_sinsyo_syogaidaiid5 = this.dispsinsyo_syogaidaiid5;   //身障手帳障害大ID
            let ins_sinsyo_syogaityuid1 = this.dispsinsyo_syogaityuid1;   //身障手帳障害中ID
            let ins_sinsyo_syogaityuid2 = this.dispsinsyo_syogaityuid2;   //身障手帳障害中ID
            let ins_sinsyo_syogaityuid3 = this.dispsinsyo_syogaityuid3;   //身障手帳障害中ID
            let ins_sinsyo_syogaityuid4 = this.dispsinsyo_syogaityuid4;   //身障手帳障害中ID
            let ins_sinsyo_syogaityuid5 = this.dispsinsyo_syogaityuid5;   //身障手帳障害中ID
            let ins_sinsyo_syogaisyoid1 = this.dispsinsyo_syogaisyoid1;   //身障手帳障害小ID
            let ins_sinsyo_syogaisyoid2 = this.dispsinsyo_syogaisyoid2;   //身障手帳障害小ID
            let ins_sinsyo_syogaisyoid3 = this.dispsinsyo_syogaisyoid3;   //身障手帳障害小ID
            let ins_sinsyo_syogaisyoid4 = this.dispsinsyo_syogaisyoid4;   //身障手帳障害小ID
            let ins_sinsyo_syogaisyoid5 = this.dispsinsyo_syogaisyoid5;   //身障手帳障害小ID
            let ins_ryoiku_no = this.dispryoiku_no;                       //療育手帳番号
            if(this.dispryoiku_no != "") ins_ryoiku_no = this.dispryoiku_no;
            let ins_ryoiku_teido = this.dispryoiku_teido;                 //療育手帳番号程度
            let ins_ryoiku_ymd = "";                                      //療育手帳交付年月日
            ins_ryoiku_ymd = this.ryoiku_Ym001.replace("年","");
            ins_ryoiku_ymd = ins_ryoiku_ymd.replace("月","");
            ins_ryoiku_ymd = ins_ryoiku_ymd.replace("日","");
            let ins_ryoiku_hanteiymd = "";                                //療育手帳判定年月日
            ins_ryoiku_hanteiymd = this.ryoiku_Ym002.replace("年","");
            ins_ryoiku_hanteiymd = ins_ryoiku_hanteiymd.replace("月","");
            ins_ryoiku_hanteiymd = ins_ryoiku_hanteiymd.replace("日","");            
            let ins_ryoiku_nxhanteiymd = "";                              //療育手帳次回判定年月日
            ins_ryoiku_nxhanteiymd = this.ryoiku_Ym003.replace("年","");
            ins_ryoiku_nxhanteiymd = ins_ryoiku_nxhanteiymd.replace("月","");
            ins_ryoiku_nxhanteiymd = ins_ryoiku_nxhanteiymd.replace("日","");            
            let ins_seisin_no = this.dispseisin_no;                       //精神手帳番号
            if(this.dispseisin_no != "") ins_seisin_no = this.dispseisin_no;
            let ins_seisin_teido = this.dispseisin_teido;                 //精神手帳番号程度
            let ins_seisin_ymd = "";                                      //精神手帳交付年月日
            ins_seisin_ymd = this.seisin_Ym001.replace("年","");
            ins_seisin_ymd = ins_seisin_ymd.replace("月","");
            ins_seisin_ymd = ins_seisin_ymd.replace("日","");            
            let ins_seisin_hanteiymd = "";                                //精神手帳判定年月日
            ins_seisin_hanteiymd = this.seisin_Ym002.replace("年","");
            ins_seisin_hanteiymd = ins_seisin_hanteiymd.replace("月","");
            ins_seisin_hanteiymd = ins_seisin_hanteiymd.replace("日","");            
            let ins_seisin_nxhanteiymd = "";                              //精神手帳次回判定年月日
            ins_seisin_nxhanteiymd = this.seisin_Ym003.replace("年","");
            ins_seisin_nxhanteiymd = ins_seisin_nxhanteiymd.replace("月","");
            ins_seisin_nxhanteiymd = ins_seisin_nxhanteiymd.replace("日","");


            //パラメータ
            let _self = this;
            let params = [];
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,                                
              kbn: this.kotei_kbn, //手帳情報
              intcode: this.intcode,
              insflg:INS_KBN_NAIYO, //内容登録
            } 

            //登録データ
            let postdata = 
            [
              {
                head_jigyoid: this.jigyoid_kotei,
                head_intcode: this.intcode,
                head_kbn: this.kotei_kbn,  //手帳情報
                head_dataid: this.pdataid,
                head_mstid: 0,
                head_mymd: " ",
                head_siid: 0,
                head_delflg: 0,
                biko_lcnt: 0,
                biko_naiyo: " ",
                kaigo_cntid: 0,
                kaigo_syubetu: 0,
                kaigo_jun: 0,
                kaigo_svskbn: 0,
                kaigo_svsid: " ",
                kaigo_svstext: " ",
                kaigo_teikyokbn: 0,
                kaigo_teikyoid: 0,
                kaigo_teikyotext: " ",
                kaigo_sienkbn: 0,
                kaigo_sienid1: 0,
                kaigo_sienid2: 0,
                kaigo_sienid3: 0,
                kaigo_sienid4: 0,
                kaigo_sienid5: 0,
                kaigo_sientext: " ",
                kaigo_hindokbn: 0,
                kaigo_hindoid: 0,
                kaigo_hindotext: " ",
                kaigo_biko: " ",
                kankei_cntid: 0,
                kankei_no: 0,
                Kankei_kikanid_kbn:0,
                kankei_kikanid: 0,
                kankei_renrakusaki: " ",
                kankei_tantoname: " ",
                kankei_biko: " ",
                tetyo_sinsyobango: ins_sinsyo_no,
                tetyo_sinsyoymd: ins_sinsyo_ymd,
                tetyo_sinsyosyubetu: ins_sinsyo_syubetu,
                tetyo_sinsyoteidoid: ins_sinsyo_tokyu,
                tetyo_sinsyosyogaidaiid1: ins_sinsyo_syogaidaiid1,
                tetyo_sinsyosyogaidaiid2: ins_sinsyo_syogaidaiid2,
                tetyo_sinsyosyogaidaiid3: ins_sinsyo_syogaidaiid3,
                tetyo_sinsyosyogaidaiid4: ins_sinsyo_syogaidaiid4,
                tetyo_sinsyosyogaidaiid5: ins_sinsyo_syogaidaiid5,
                tetyo_sinsyosyogaityuid1: ins_sinsyo_syogaityuid1,
                tetyo_sinsyosyogaityuid2: ins_sinsyo_syogaityuid2,
                tetyo_sinsyosyogaityuid3: ins_sinsyo_syogaityuid3,
                tetyo_sinsyosyogaityuid4: ins_sinsyo_syogaityuid4,
                tetyo_sinsyosyogaityuid5: ins_sinsyo_syogaityuid5,
                tetyo_sinsyosyogaiid1: ins_sinsyo_syogaisyoid1,
                tetyo_sinsyosyogaiid2: ins_sinsyo_syogaisyoid2,
                tetyo_sinsyosyogaiid3: ins_sinsyo_syogaisyoid3,
                tetyo_sinsyosyogaiid4: ins_sinsyo_syogaisyoid4,
                tetyo_sinsyosyogaiid5: ins_sinsyo_syogaisyoid5,
                tetyo_ryoikubango: ins_ryoiku_no,
                tetyo_ryoikuteidoid: ins_ryoiku_teido,
                tetyo_ryoikuymd: ins_ryoiku_ymd,
                tetyo_ryoikuhanteiymd: ins_ryoiku_hanteiymd,
                tetyo_ryoikunxhanteiymd: ins_ryoiku_nxhanteiymd,
                tetyo_seisinbango: ins_seisin_no,
                tetyo_seisinteidoid: ins_seisin_teido,
                tetyo_seisinymd: ins_seisin_ymd,
                tetyo_seisinhanteiymd: ins_seisin_hanteiymd,
                tetyo_seisinnxhanteiymd: ins_seisin_nxhanteiymd         
              }
            ];            

            if(this.dataflg == true)
            {
              //更新
              putConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',postdata).then((result) => 
              {
                _self.griddata = result.icrn_inf;
                _self.gridSeldata = result;
                //if(kbn != 1) this.View_upd(this.intcode);
                //メッセージ
                //this.Message_Dialog(sysConst.MSG_DATA_INS);
              });            
            }
            else{
              //新規
              postConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',postdata).then((result) => 
              {
                _self.griddata = result.icrn_inf;
                _self.gridSeldata = result;
                //if(kbn != 1) this.View_upd(this.intcode);
                //メッセージ
                //this.Message_Dialog(sysConst.MSG_DATA_INS);
              });            
            }

            //備考欄

            let wk_naiyo = this.splitNaiyo(this.dispTok,256);
            let postdata_biko =[];
            let postdata_list = [];

            //パラメータ
            params = {
              uniqid: this.uniqid,
              traceid: this.traceid,                                
              kbn: this.kotei_kbn, //手帳情報
              intcode: this.intcode,
              insflg:INS_KBN_BIKO, //内容登録
            } 

            if(wk_naiyo.length > 0)
            {
              for(let i = 0; i < wk_naiyo.length;i++)
              {
                //登録データ
                 postdata_biko = 
                  {
                    head_jigyoid: this.jigyoid_kotei,
                    head_intcode: this.intcode,
                    head_kbn: this.kotei_kbn,  //手帳情報
                    head_dataid: this.pdataid,
                    head_mstid: 0,
                    head_mymd: " ",
                    head_siid: 0,
                    head_delflg: 0,
                    biko_lcnt: i+1,
                    biko_naiyo: wk_naiyo[i],
                    kaigo_cntid: 0,
                    kaigo_syubetu: 0,
                    kaigo_jun: 0,
                    kaigo_svskbn: 0,
                    kaigo_svsid: " ",
                    kaigo_svstext: " ",
                    kaigo_teikyokbn: 0,
                    kaigo_teikyoid: 0,
                    kaigo_teikyotext: " ",
                    kaigo_sienkbn: 0,
                    kaigo_sienid1: 0,
                    kaigo_sienid2: 0,
                    kaigo_sienid3: 0,
                    kaigo_sienid4: 0,
                    kaigo_sienid5: 0,
                    kaigo_sientext: " ",
                    kaigo_hindokbn: 0,
                    kaigo_hindoid: 0,
                    kaigo_hindotext: " ",
                    kaigo_biko: " ",
                    kankei_cntid: 0,
                    kankei_no: 0,
                    Kankei_kikanid_kbn:0,
                    kankei_kikanid: 0,
                    kankei_renrakusaki: " ",
                    kankei_tantoname: " ",
                    kankei_biko: " ",
                    tetyo_sinsyobango: " ",
                    tetyo_sinsyoymd: " ",
                    tetyo_sinsyosyubetu: 0,
                    tetyo_sinsyoteidoid: 0,
                    tetyo_sinsyosyogaidaiid1: 0,
                    tetyo_sinsyosyogaidaiid2: 0,
                    tetyo_sinsyosyogaidaiid3: 0,
                    tetyo_sinsyosyogaidaiid4: 0,
                    tetyo_sinsyosyogaidaiid5: 0,
                    tetyo_sinsyosyogaityuid1: 0,
                    tetyo_sinsyosyogaityuid2: 0,
                    tetyo_sinsyosyogaityuid3: 0,
                    tetyo_sinsyosyogaityuid4: 0,
                    tetyo_sinsyosyogaityuid5: 0,
                    tetyo_sinsyosyogaiid1: 0,
                    tetyo_sinsyosyogaiid2: 0,
                    tetyo_sinsyosyogaiid3: 0,
                    tetyo_sinsyosyogaiid4: 0,
                    tetyo_sinsyosyogaiid5: 0,
                    tetyo_ryoikubango: " ",
                    tetyo_ryoikuteidoid: 0,
                    tetyo_ryoikuymd: " ",
                    tetyo_ryoikuhanteiymd: " ",
                    tetyo_ryoikunxhanteiymd: " ",
                    tetyo_seisinbango: " ",
                    tetyo_seisinteidoid: 0,
                    tetyo_seisinymd: " ",
                    tetyo_seisinhanteiymd: " ",
                    tetyo_seisinnxhanteiymd: " "         
                  };         
                  
                  postdata_list.push(postdata_biko);

              }
            }
            else{
              postdata_biko = 
              {
                head_jigyoid: this.jigyoid_kotei,
                head_intcode: this.intcode,
                head_kbn: this.kotei_kbn,  //手帳情報
                head_dataid: this.pdataid,
                head_mstid: 0,
                head_mymd: " ",
                head_siid: 0,
                head_delflg: 0,
                biko_lcnt: 1,
                biko_naiyo: " ",
                kaigo_cntid: 0,
                kaigo_syubetu: 0,
                kaigo_jun: 0,
                kaigo_svskbn: 0,
                kaigo_svsid: " ",
                kaigo_svstext: " ",
                kaigo_teikyokbn: 0,
                kaigo_teikyoid: 0,
                kaigo_teikyotext: " ",
                kaigo_sienkbn: 0,
                kaigo_sienid1: 0,
                kaigo_sienid2: 0,
                kaigo_sienid3: 0,
                kaigo_sienid4: 0,
                kaigo_sienid5: 0,
                kaigo_sientext: " ",
                kaigo_hindokbn: 0,
                kaigo_hindoid: 0,
                kaigo_hindotext: " ",
                kaigo_biko: " ",
                kankei_cntid: 0,
                kankei_no: 0,
                Kankei_kikanid_kbn:0,
                kankei_kikanid: 0,
                kankei_renrakusaki: " ",
                kankei_tantoname: " ",
                kankei_biko: " ",
                tetyo_sinsyobango: " ",
                tetyo_sinsyoymd: " ",
                tetyo_sinsyosyubetu: 0,
                tetyo_sinsyoteidoid: 0,
                tetyo_sinsyosyogaidaiid1: 0,
                tetyo_sinsyosyogaidaiid2: 0,
                tetyo_sinsyosyogaidaiid3: 0,
                tetyo_sinsyosyogaidaiid4: 0,
                tetyo_sinsyosyogaidaiid5: 0,
                tetyo_sinsyosyogaityuid1: 0,
                tetyo_sinsyosyogaityuid2: 0,
                tetyo_sinsyosyogaityuid3: 0,
                tetyo_sinsyosyogaityuid4: 0,
                tetyo_sinsyosyogaityuid5: 0,
                tetyo_sinsyosyogaiid1: 0,
                tetyo_sinsyosyogaiid2: 0,
                tetyo_sinsyosyogaiid3: 0,
                tetyo_sinsyosyogaiid4: 0,
                tetyo_sinsyosyogaiid5: 0,
                tetyo_ryoikubango: " ",
                tetyo_ryoikuteidoid: 0,
                tetyo_ryoikuymd: " ",
                tetyo_ryoikuhanteiymd: " ",
                tetyo_ryoikunxhanteiymd: " ",
                tetyo_seisinbango: " ",
                tetyo_seisinteidoid: 0,
                tetyo_seisinymd: " ",
                tetyo_seisinhanteiymd: " ",
                tetyo_seisinnxhanteiymd: " "         
              };         
              
              postdata_list.push(postdata_biko);

            }

            if(this.tokflg == true)
            {
              //更新
              putConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',postdata_list).then((result) => 
              {
                _self.griddata = result.icrn_inf;
                _self.gridSeldata = result;
                if(kbn != 1) this.View_upd(this.intcode);
                //メッセージ
                this.Message_Dialog(sysConst.MSG_DATA_INS);
              });            
            }
            else{
              //新規
              postConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',postdata_list).then((result) => 
              {
                _self.griddata = result.icrn_inf;
                _self.gridSeldata = result;
                if(kbn != 1) this.View_upd(this.intcode);
                //メッセージ
                this.Message_Dialog(sysConst.MSG_DATA_INS);
              });            
            }
            this.inputchk = false;
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

          ,onClickdel_data()
          {
            //データ登録ボタン
            this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK,3);
          }   
          ,del_data()
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
                cntid:0,
                lcnt:0,
                headflg:DEL_KBN_REKI,
            }


            //削除処理
            deleteConnect('/Koteiinf_SYAKAI', params,'KOTEIINF',deldata).then((result) => {
                _self.griddatadel = result.icrn_inf;
                _self.gridSeldatadel = result;
                this.View_upd(this.intcode);
                this.Message_Dialog(sysConst.MSG_DATA_DEL,0);
              });            
          }          
          ,onClickclr_data(){
            this.viewClear();
          }

          //ドラッグ
          ,win_drag :function(e){
            //ドラッグ
            this.Dragflg = true;
            this.mouseX = e.screenX;
            this.mouseY = e.screenY; 
            var wdialog = document.getElementById("head_win_id017");  
            if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
            if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 255) /2 + "px";  

            this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
            this.screenX = parseInt(wdialog.style.right.replace("px","")); 
          },
          win_move :function(e){
            //ドラッグ
            
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("head_win_id017");
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
          }

          //#####確認メッセージ#####
          ,win_drag_Msg :function(e){
            //ドラッグ
            this.Dragflg = true;
            this.mouseX = e.screenX;
            this.mouseY = e.screenY; 
            var wdialog = document.getElementById("kakunin_id017");  
            if(wdialog.style.bottom == "")wdialog.style.bottom = (window.innerHeight - 110)/2 + "px";
            if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 260) /2 + "px";  
            this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
            this.screenX = parseInt(wdialog.style.right.replace("px","")); 
          },
          win_move_Msg :function(e){
            //ドラッグ
            
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("kakunin_id017");
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
            var wdialog = document.getElementById("rireki_id017");  
            if(wdialog.style.bottom == "")
            {
              wdialog.style.bottom = (window.innerHeight - 210)/2 + "px";
            }
            if(wdialog.style.right == "") wdialog.style.right =  (window.innerWidth - 280) /2 + "px";  
            this.screenY = parseInt(wdialog.style.bottom.replace("px",""));
            this.screenX = parseInt(wdialog.style.right.replace("px","")); 
          },
          win_move_reki :function(e){
            //履歴参照ドラッグ
            
            if(this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0)
            {
              var wdialog = document.getElementById("rireki_id017");
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

          ,onComboClicked(){
            this.inputchk = true;
          }

          ,text_input(kbn)
          {
            //文字数制限とかやる
            this.inputchk = true;

            switch(kbn)
            {
              case 0://身障手帳番号
              {
                let textarea = document.getElementById("clssinp017-005_id");
                //文字数制御
                    
                if(textarea.value.length > 20) //文字数制限
                {
                  this.dispsinsyo_no = textarea.value.substring(0,20);
                  
                }            
              }
              break;

              case 1://療育手帳番号
              {
                let textarea = document.getElementById("clssinp017-012_id");
                //文字数制御
                if(textarea.value.length > 20) //文字数制限
                {
                  this.dispryoiku_no = textarea.value.substring(0,20);
                }            
              }
              break;
              
              case 2://精神手帳番号
              {
                let textarea = document.getElementById("clssinp017-017_id");
                //文字数制御
                if(textarea.value.length > 20) //文字数制限
                {
                  this.dispseisin_no = textarea.value.substring(0,20);
                }            
              }
              break;

            }

          }          

          ,onInitializeIcrnGrid_Mst(flexGrid)
          {
            //障害マスタグリッド
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

          ,grid_click_Mst(e)
          {
            //ﾏｽﾀｸﾞﾘｯﾄﾞクリック
            var ht = this.flex_mst.hitTest(e);
            if(ht.row >= 0)
            {
              switch(this.Mstflg)
              {
                case 1: //大項目表示時のクリック
                  this.pMst_daiid = this.MstList[ht.row].id;
                  this.Mstflg = 2;  //表示中フラグを中項目に更新する
                  this.DspMst_tyu(this.pMst_daiid);
                  break;
                case 2: //中項目表示時のクリック
                  this.pMst_tyuid = this.MstList[ht.row].id;
                  this.Mstflg = 3;  //表示中フラグを小項目に更新する
                  this.DspMst_syo(this.pMst_daiid,this.pMst_tyuid);
                  break;
                case 3: //小項目表示時のクリック
                  this.Mstflg = 1;  //表示中フラグを小項目に更新する
                  this.Set_Syogainm(this.MstList[ht.row].id,this.MstList[ht.row].name);  
                  this.DspMst_dai();
                  break;                                    
              }
            }

          }

          ,DspMst_dai()
          {
            //大項目を表示する
            let wk_data =[];
            let wk_list =[];

            wk_data={
              id:0,
              name:"(クリア)",
              value:" "
            }
            wk_list.push(wk_data);

            this.syogai_All_List.forEach(function(value)
            {
              wk_data={
                  id:value.daiNcod,
                  name:value.daiName,
                  value:value.daiName
                }

                wk_list.push(wk_data);                  
            });

            this.MstList = wk_list.concat();
          }

          ,DspMst_tyu(id)
          {
            //中項目を表示する
            let wk_data =[];
            let wk_list =[];

            if(id > 0)
            {
              /*
              wk_data={
                id:0,
                name:"(クリア)",
                value:" "
              }
              wk_list.push(wk_data);
              */

              this.syogai_All_List.forEach(function(value)
              {
                if(value.daiNcod == id)
                {
                  value.tyuList.forEach(function(value2){
                    wk_data={
                    id:value2.tyuNcod,
                    name:value2.tyuName,
                    value:value2.tyuName
                  }
                  wk_list.push(wk_data);                  

                  });
                }
              });

              this.MstList = wk_list.concat();
            }
            else
            {
              this.Clr_Syogainm();
            }
          }

          ,DspMst_syo(daiid,tyuid)
          {
            //小項目を表示する
            let wk_data =[];
            let wk_list =[];

            if(daiid > 0 && tyuid > 0)
            {
              /*
              wk_data={
                id:0,
                name:"(クリア)",
                value:" "
              }
              wk_list.push(wk_data);
              */

              this.syogai_All_List.forEach(function(value)
              {
                if(value.daiNcod == daiid)
                {
                  value.tyuList.forEach(function(value2){
                    if(value2.tyuNcod == tyuid)
                    {
                      value2.syoList.forEach(function(value3)
                      {
                        wk_data={
                          id:value3.syoNcod,
                          name:value3.syoName,
                          value:value3.syoName
                        }
                        wk_list.push(wk_data);
                      });
                    }
                  });
                }
              });

              this.MstList = wk_list.concat();
            }
            else
            {
              this.Clr_Syogainm();
            }
          }
          ,Set_Syogainm(syoid,text)
          {
            //障害名をテキストにセット
            
            switch(this.Msttextflg)
            {
              case 1:
                this.dispsinsyo_syogaidaiid1 = this.pMst_daiid;
                this.dispsinsyo_syogaityuid1 = this.pMst_tyuid;
                this.dispsinsyo_syogaisyoid1 = syoid;
                this.dispsinsyo_syogainm1 = text;
                break;
              case 2:
                this.dispsinsyo_syogaidaiid2 = this.pMst_daiid;
                this.dispsinsyo_syogaityuid2 = this.pMst_tyuid;
                this.dispsinsyo_syogaisyoid2 = syoid;
                this.dispsinsyo_syogainm2 = text;                
                break;
              case 3:
                this.dispsinsyo_syogaidaiid3 = this.pMst_daiid;
                this.dispsinsyo_syogaityuid3 = this.pMst_tyuid;
                this.dispsinsyo_syogaisyoid3 = syoid;
                this.dispsinsyo_syogainm3 = text;                
                break;
              case 4:
                this.dispsinsyo_syogaidaiid4 = this.pMst_daiid;
                this.dispsinsyo_syogaityuid4 = this.pMst_tyuid;
                this.dispsinsyo_syogaisyoid4 = syoid;
                this.dispsinsyo_syogainm4 = text;                
                break;
              case 5:
                this.dispsinsyo_syogaidaiid5 = this.pMst_daiid;
                this.dispsinsyo_syogaityuid5 = this.pMst_tyuid;
                this.dispsinsyo_syogaisyoid5 = syoid;
                this.dispsinsyo_syogainm5 = text;                
                break;                                                                
            }
          }

          ,Clr_Syogainm()
          {
            //障害名をテキストクリア
            switch(this.Msttextflg)
            {
              case 1:
                this.dispsinsyo_syogaidaiid1 = 0;
                this.dispsinsyo_syogaityuid1 = 0;
                this.dispsinsyo_syogaisyoid1 = 0;
                this.dispsinsyo_syogainm1 = "";
                break;
              case 2:
                this.dispsinsyo_syogaidaiid2 = 0;
                this.dispsinsyo_syogaityuid2 = 0;
                this.dispsinsyo_syogaisyoid2 = 0;
                this.dispsinsyo_syogainm2 = "";                
                break;
              case 3:
                this.dispsinsyo_syogaidaiid3 = 0;
                this.dispsinsyo_syogaityuid3 = 0;
                this.dispsinsyo_syogaisyoid3 = 0;
                this.dispsinsyo_syogainm3 = "";                
                break;
              case 4:
                this.dispsinsyo_syogaidaiid4 = 0;
                this.dispsinsyo_syogaityuid4 = 0;
                this.dispsinsyo_syogaisyoid4 = 0;
                this.dispsinsyo_syogainm4 = "";                
                break;
              case 5:
                this.dispsinsyo_syogaidaiid5 = 0;
                this.dispsinsyo_syogaityuid5 = 0;
                this.dispsinsyo_syogaisyoid5 = 0;
                this.dispsinsyo_syogainm5 = "";                
                break;                                                                
            }
            this.Mstflg = 1;  //マスタの表示状態を大項目
            this.DspMst_dai();

          }          

        ,onItemsSourceChanged_Mst(flex_mst) {
          // 初期選択を解除
          flex_mst.selection = new wjGrid.CellRange(-1, -1, -1, -1);
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
                      this.ins_data(1);
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
        ,click_radio(kbn)
        {
          switch(kbn)
          {
            case 0:
              document.getElementById("clssinp017-007-1_text").style.color = "#0081eb";
              document.getElementById("clssinp017-007-2_text").style.color = "";              
              break;
            case 1:
              document.getElementById("clssinp017-007-1_text").style.color = "";
              document.getElementById("clssinp017-007-2_text").style.color = "#0081eb";              
              break;              
          }
        }          

        }        
    }

</script>


<style lamg="scss">
  /*全体エリア*/
  .clssheet-chu017{
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height:  800px;

    position: relative;

  }

    /*タイトル*/
    .clsstitle017-001{
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
  }
  /*タイトルエリア*/
  .area017-001{
    display :inline-flex;
    width: 470px;
    height: 25px;
  }
  /*右上ボタンエリア*/
  .area017-002{
    display :inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
  }

    /*障害者支援区分*/
        .area017-003{
    margin-top: 5px;
    width: 945px;
    height: 30px;
    display :inline-flex;
  }

  /*障害者支援区分-ラベル*/ 
  .clsstitle017-003
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

  .clssinp017-002
  {
    background-color: #fffeec;
    margin-left: 3px;
    margin-top: 2px;
    width: 210px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

    /*障害者支援区分-ラベル*/ 
    .clsstitle017-004
  {
    margin-top: 2px;
    margin-left: 5px;
    background-color: #dffae0;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-003
  {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 3px;
    width: 150px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

  .clsstitle017-005
  {
    margin-top: 2px;
    margin-left: -30px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
  }

  .clssinp017-004
  {
    background-color: #fffeec;
    margin-left: 3px;
    margin-top: 3px;
    width: 300px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
  }

  /*精神障碍者手帳-ラベル*/
  .area017-004-all
  {
    display: inline-flex;
    width: 940px;
    height: 275px;
    flex-wrap: wrap;

  }

  .area017-004
  {
    display: inline-flex;
    width: 600px;
    height: 275px;
    flex-wrap: wrap;
  }

  .clsstitle017-006
  {
    background-color: #dffae0;
    margin-top: 10px;
    font-size: 16px;
    height: 275px;
    width: 90px;
    padding-top: 18%;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  /*中枠*/ 
  .area017-004-001{
    display :inline-flex;
    margin-top: 5px;
    margin-left: 0px;
    width: 300px;
    height: 30px;
    flex-wrap: wrap;
  }

  .area017-004-002
  {
    display: inline-flex;
    width: 500px;
    height: 35px;
  }

  .clsstitle017-007
  {
    background-color: #dffae0;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-005{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }

  /*交付年月日*/
  .area017-004-003
  {
    display: inline-flex;
    width: 500px;
    height: 35px !important;

  }

  .clsstitle017-008
  {
    background-color: #dffae0;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px !important;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-006{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }


  /*種別*/
  .area017-004-004
  {
    display: inline-flex;
    width: 500px;
    height: 35px;
  }

  .area017-004-004-chk
  {
    margin-top: 5px;
    margin-left: 5px;
    width: 160px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
    flex-wrap: wrap;
  }

  .clssinp017-007-1
  {
    margin-top: -3px;
    margin-left: 2px;
  }

  .clssinp017-007-2
  {
    margin-top: -1px;
    margin-left: 2px;
  }

  .clsstitle017-009
  {
    background-color: #dffae0;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle017-010
  {
    background-color: #dffae0;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-007{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 80px;
    height: 30px !important;
    text-align: left;    
  }

  .clsstitle017-011
  {
    margin-left: 5px;
    margin-top: 7px;
  }

  /*障害名*/
  .area017-004-005
  {
    display: inline-flex;
    width: 500px;
    height: 150px;
  }

    /*障害名*/
    .area017-004-006
  {
    width: 300px;
    height: 150px;
    margin-left: 2px;
    flex-wrap: wrap;

  }

  .clsstitle017-012
  {
    background-color: #dffae0;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
    height: 170px;
    width: 90px;
    line-height:170px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;

  }

  .clssinp017-008{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 360px;
    height: 30px !important;
    text-align: left;    
  }
  .clssinp017-009{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 360px;
    height: 30px !important;
    text-align: left;    
  }
  .clssinp017-010{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 360px;
    height: 30px !important;
    text-align: left;    
  }
  .clssinp017-011{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 360px;
    height: 30px !important; 
    text-align: left;    
  }
  .clssinp017-011_2{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 3px;
    margin-top: 5px;
    width: 360px;
    height: 30px !important; 
    text-align: left;    
  }  


  /*療育手帳-ラベル*/
  .area017-005
  {
    display: inline-flex;
    width: 940px;
    height: 145px;
    flex-wrap: wrap;
  }

/*中枠*/ 
.area017-005-001{
    display :inline-flex;
    margin-top: 5px;
    margin-left: 0px;
    width: 300px;
    height: 30px;
    flex-wrap: wrap;
  }

  .area017-005-002
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-013
  {
    background-color: #dffae0;
    margin-top: 20px;
    margin-left: 0px;
    font-size: 16px;
    height: 136px;
    width: 90px;
    line-height:136px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle017-014
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-012{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }


  /*程度*/
  .area017-005-003
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-015
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle017-016
  {
    margin-top: 15px;
    margin-left: -35px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
  }

  .clssinp017-013{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 100px;
    height: 30px !important;
    text-align: left;    
  }  


    /*交付年月日*/
    .area017-005-004
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-017
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-014{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }  

      /*判定年月日*/
      .area017-005-005
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-018
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-015{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }
  
       /*次回判定日*/
       .area017-005-006
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-019
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-016{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  } 



  /*精神障碍者-ラベル*/
  .area017-006
  {
    display: inline-flex;
    width: 940px;
    height: 150px;
    flex-wrap: wrap;
  }

/*中枠*/ 
.area017-006-001{
    display :inline-flex;
    margin-top: 5px;
    margin-left: 0px;
    width: 300px;
    height: 30px;
    flex-wrap: wrap;
  }

  .area017-006-002
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-020
  {
    background-color: #dffae0;
    margin-top: 20px;
    margin-left: 0px;
    font-size: 16px;
    height: 136px;
    width: 90px;
    line-height:30px;
    padding-top: 3%;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle017-021
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-017{
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }


  /*程度*/
  .area017-006-003
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-022
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clsstitle017-023
  {
    margin-top: 15px;
    margin-left: -35px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
  }

  .clssinp017-018{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 100px;
    height: 30px !important;
    text-align: left;    
  }  


    /*交付年月日*/
    .area017-006-004
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-024
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-019{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }  

      /*判定年月日*/
      .area017-006-005
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-025
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px !important;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }

  .clssinp017-020{
    background-color: #ffffff !important;
    border: 1px solid !important;
    border-color: #7e7e7e !important; 
    margin-left: 5px;
    margin-top: 15px;
    width: 200px;
    height: 30px !important;
    text-align: left;    
  }
  
  /*次回判定日*/
  .area017-006-006
  {
    display: inline-flex;
    width: 940px;
    height: 35px;
  }

  .clsstitle017-026
  {
    background-color: #dffae0;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px !important;
    width: 90px;
    line-height:30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
  }


    /*特記事項エリア*/   
    .area017-007{
    display :inline-flex;
    margin-left: 0px;
    margin-top: 16px;
    width: 900px;
    height: 25px;
  }

  /*特記事項タイトル*/
  .clsstitle017-027{ 
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
  .clssinp017-021{
    background-color: #ffffff;
    margin-left: 4px;
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

        /*ボタンエリア*/
        .area017-008{
    margin-top: 30px;
    width: 955px;
    height: 25px;
  }
  /*クリアボタン*/
  .clsbtnmenu017-clr{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*削除ボタン*/
  .clsbtnmenu017-del{
    margin-top: 20px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }
  /*登録ボタン*/
  .clsbtnmenu017-ins{
    margin-top: 20px;
    margin-left: 712px;
    height: 25px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5 ;
  }

  .btnymd017
  {
    width: 300px;
  }
  .clsstitle1_Noreki_back_017
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128,128,128,0.55);
    height: 800px;
    width: 955px;
    line-height:955px;
    text-align: center;
  }
  .clsstitle1_Noreki_017
  {
    border-radius: 10px 10px 10px 10px;
    bottom: 365px;
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

  .GridMstarea_017{
    width: 305px;
    height: 275px;
    padding: 3px 0px;
    margin-top: 10px;
    margin-left: 6px;
    background-color: #7fb9f0;
    border: 1px solid #4396e4;
  }  

  .GridMst017{
    font-size: 16px;
    margin-top: 4px;
    margin-left: 4px;
    width: 292px !important;
    height: 262px;
    border: 1px solid;
    border-color: #4396e4 !important;
    background-color: #dffae0;
  }  
</style>
