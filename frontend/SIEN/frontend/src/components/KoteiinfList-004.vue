<template>
    <v-sheet class="clssheet-chu004" elevation="2">
        <label class="clsstitle1_Noreki_back_004" v-show="Label_Visible">
            <label class="clsstitle1_Noreki_004">履歴を作成してください</label>
        </label>
        <div class="wrap004-001">
            <label class="clsstitle004-001">病歴・障害歴</label>
            <v-card class="ml-2" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">新規作成</a>
            </v-card>
        </div>
        <label class="clsstitle1_tyosa mt-3" id="Ymd">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

        <v-btn :disabled="Label_Visible == true" id="tyosa_ymd_004" class="btnymd_kotei ml-1"
            @click="inputCalendarClick(1)" tile width="150px" height="30px">{{ this.pmymd }}
            <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
            </div>
        </v-btn>

        <!-- 年月日ダイアログ -->
        <v-dialog v-model="datepicker_dialog_tyosa" width="300" class="datepicker_dialogs">
            <v-date-picker id="Datepicker_head" v-model="picker" locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()" @change="monthSelect_tyosa">
            </v-date-picker>
        </v-dialog>

        <div class="area004-001">
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-copy-004" class="clsbtnmenu-copy"
                @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-reki-004" class="clsbtnmenu-reki"
                @click="onClickReki">
                履歴参照
            </v-btn>
        </div>
        <br>
        <wj-flex-grid :disabled="Label_Visible == true" id="Gridicrn004-id" class="Gridicrn004-001"
            :headersVisibility="'Column'" :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false"
            :allowPinning="false" :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false"
            :allowDragging="false" :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid"
            :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata" :autoRowHeights="true">

            <wj-flex-grid-column header=" " binding="kiou_no" :width="30" :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="発症年月" binding="kiou_ymd_view" :width="150"
                :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="傷病名ｺｰﾄﾞ" binding="kiou_syobyocode" :width="110"
                :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="傷病名" binding="kiou_syobyonm" :width="240" :wordWrap=true
                :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="現症" binding="kiou_gensyo" :width="50" :allowResizing=false
                align="center"></wj-flex-grid-column>
            <wj-flex-grid-column header="備考" binding="kiou_naiyo" :width="340" :wordWrap=true
                :allowResizing=false></wj-flex-grid-column>

            <wj-flex-grid-column header="" binding="kiou_id" :width="0" :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="" binding="kiou_ymdflg" :width="0" :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="" binding="kiou_gensyo_id" :width="0"
                :allowResizing=false></wj-flex-grid-column>

        </wj-flex-grid>

        <div class="area004-004">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu004-add" @click="onClick_add">
                新規追加
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu004-hyoji" id="btn_hyoji_004"
                @click="onClickSort">
                表示順変更
            </v-btn>
        </div>

        <div class="area004-002">
            <label class="kotei004title1">特記事項</label>
            <textarea id="textarea004" class="kotei004inp1" v-model="disptok" @input="initTextarea" @click="click_text"
                no-resize rows=10></textarea>
        </div>

        <div class="area004-003">
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu004-clr" class="clsbtnmenu004-clr"
                @click="onClickclr">
                クリア
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu004-del" class="clsbtnmenu004-del"
                @click="onClickdel">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu004-ins" class="clsbtnmenu004-ins"
                @click="onClickins">
                登 録
            </v-btn>
        </div>

        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="255">
            <v-sheet class="clssheet-head" elevation="2" id="head_win_004id" @mousedown="win_drag($event)"
                @mousemove="win_move($event)" @mouseup="win_up($event)">
                <div class="areahead">
                    <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
                    <v-btn elevation="2" icon small top class="closeButton ml-1 mt-1" color="red"
                        @click="Click_colse_head">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>
                <div class="areahead2">
                    <label class="koteititle-head">作成日</label>

                    <v-btn class="koteiheadinp1" @click="inputCalendarClick(0)" tile outlined width="150px"
                        height="120%">{{
                            getYm()
                        }}
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
        <v-dialog v-model="datepicker_dialog_head" width="300" class="datepicker_dialogs">
            <v-date-picker id="Datepicke_r005" v-model="picker" locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()" @change="monthSelect">
            </v-date-picker>
        </v-dialog>

        <!--データダイアログ-->
        <v-dialog v-model="InsWindata" width="850">
            <v-sheet id="naiyo_id004" class="clssheet-chu005" elevation="2">
                <!--一旦コメントアウト   
          @mousedown="win_drag_win($event)"
            @mousemove="win_move_win($event)"
            @mouseup="win_up_win($event)"
            style="bottom: 50%;right: 50%;">
           -->
                <div class="area005-001">
                    <label class="kotei005title1">病歴・障害歴</label>
                    <v-btn elevation="2" icon small top class="closeButton ml-1" color="red" @click="Click_colse_data">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div class="area005-002">
                    <v-btn-toggle color="yellow" v-model="selected_btn" mandatory>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default005" id="btn_addnew"
                            @click="onDataIns_click">
                            新規追加
                        </v-btn>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default005" id="btn_addupd"
                            @click="onDataUpd_click">
                            修正登録
                        </v-btn>
                    </v-btn-toggle>
                </div>

                <div class="area005-all">
                    <div class="area005-left">
                        <div class="area005-003">
                            <label class="kotei005title2">発症年月日</label>
                            <v-btn class="kotei005inp1" @click="inputCalendarClick_data(0)" tile outlined width="150px"
                                height="120%">{{ getYm() }}
                                <div class="float-right">
                                    <v-icon small>mdi-calendar-month</v-icon>
                                </div>
                            </v-btn>

                        </div>

                        <div class="area005-004">
                            <label class="kotei005title3">傷病名</label>
                            <input type="text" class="kotei005inp3" v-model="dispsyobyoid" readonly />
                            <input type="text" class="kotei005inp4" v-model="dispsyobyonm" readonly />
                        </div>

                        <div class="area005-005">
                            <label class="kotei005title4">現症</label>
                            <input class="kotei005chk1 mt-1" type="checkbox" id="kotei005chk1" v-model="dispchk1"
                                @click="check_click">
                            <label class="ml-1 mt-1" id="chk_gensyo">有り</label>
                        </div>

                        <div class="area005-006">
                            <label class="kotei005title5">備考</label>
                            <textarea id="textarea005" class="kotei005inp5" v-model="dispnaiyo"
                                @input="initTextarea_win" no-resize rows=10></textarea>
                        </div>
                    </div>
                    <div class="area005-right">
                        <div class="area005-right001">
                            <label class="lblrightarea">傷病名</label>
                            <input type="text" class="textrightarea" v-model="dispsyobyo_kana" @input="syobyo_input" />
                        </div>
                        <div class="area005-right002">
                            <label class="lblrightarea">ICD10</label>
                            <input type="text" class="textrightarea" v-model="dispsyobyo_icd10" @input="syobyo_input" />
                        </div>

                        <div class="area005-right003">
                            <wj-flex-grid id="Gridsyobyo_id" class="Gridsyobyo" :headersVisibility="'Column'"
                                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false"
                                :allowPinning="false" :allowMerging="true" :allowResizing="true" :allowSorting="false"
                                :allowDragging="false" :selectionMode="'Row'" :isReadOnly="true"
                                :initialized="onInitializeIcrnGrid_syuobyo" :itemsSourceChanged="onItemsSourceChanged"
                                :itemsSource="SyobyoList" :autoRowHeights="true">
                                <!--列-->
                                <wj-flex-grid-column header="傷病名称" binding="name" :width="190" :wordWrap=true
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="傷病名ｺｰﾄﾞ" binding="code" :width="100" :wordWrap=true
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="ICD10" binding="icd10" :width="70" :wordWrap=true
                                    :allowResizing=false></wj-flex-grid-column>

                            </wj-flex-grid>
                        </div>
                    </div>
                </div>
                <div class="area005-007">
                    <v-btn class="clsbtnmenu005-clr" @click="onClickclr_data">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu005-del" @click="onClickdel_data">
                        削 除
                    </v-btn>
                    <v-btn class="clsbtnmenu005-ins" @click="onClickins_data">
                        登 録
                    </v-btn>
                </div>
                <!-- 年月日ダイアログ -->
                <v-dialog v-model="datepicker_dialog_005" width="300" class="datepicker_dialogs">
                    <v-date-picker id="Datepicke_r005" v-model="picker" locale="jp-ja"
                        :day-format="(date) => new Date(date).getDate()" @change="monthSelect_data">
                    </v-date-picker>
                </v-dialog>

            </v-sheet>
        </v-dialog>

        <!--履歴ダイアログ-->
        <v-dialog v-model="Rirekiwin" width="210">
            <v-sheet id="rireki_id004" class="clssheet-Reki" elevation="2" @mousedown="win_drag_reki($event)"
                @mousemove="win_move_reki($event)" @mouseup="win_up_reki($event)">
                <div class="areaReki">
                    <label class="clsstitleReki">作成履歴</label>
                    <v-btn elevation="2" icon small top class="closeButton_win" color="red" @click="Click_colse_Reki">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div class="areaReki2">
                    <wj-flex-grid id="GrdReki" class="GrdReki-001" :headersVisibility="'Column'"
                        :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                        :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                        :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGridReki"
                        :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata_reki">

                        <!--列-->
                        <wj-flex-grid-column header="作成年月日" binding="head_mymd" :width="198" :wordWrap=true
                            :allowResizing=false></wj-flex-grid-column>
                        <wj-flex-grid-column header="" binding="head_dataid" :width="0" :wordWrap=true
                            :allowResizing=false></wj-flex-grid-column>
                        <wj-flex-grid-column header="" binding="head_kbn" :width="0" :wordWrap=true
                            :allowResizing=false></wj-flex-grid-column>
                        <wj-flex-grid-column header="" binding="head_siid" :width="0" :wordWrap=true
                            :allowResizing=false></wj-flex-grid-column>

                    </wj-flex-grid>
                </div>
                <div>
                </div>

            </v-sheet>
        </v-dialog>

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="260">
            <v-sheet id="kakunin_id004" class="clssheet-Mes" elevation="2">
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
                    <label class="clslabelMes"> {{ Dialog_Message }} </label>
                </div>

                <div class="areaMes-002">
                    <div class="area-Ok">
                        <v-btn class="clsbtnmenu-standard" v-show="Btnno_Visible" width="80"
                            @click="onClick_Massege(0)">
                            はい
                        </v-btn>
                    </div>

                    <div class="area-Ok">
                        <v-btn class="clsbtnmenu-standard" v-show="Btnno_Visible == false" width="80"
                            @click="onClick_Massege(0)">
                            O K
                        </v-btn>
                    </div>

                    <v-btn class="clsbtnmenu-standard" v-show="Btnno_Visible" width="80" @click="onClick_Massege(1)">
                        いいえ
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>

        <!-- 表示順ダイアログ  -->
        <v-dialog v-model="dialog_Sort_flg" width="1020">
            <v-sheet id="sort_id004" class="clssheet004-sort" elevation="2">
                <!--  
          @mousedown="win_drag_sort($event)"
            @mousemove="win_move_sort($event)"
            @mouseup="win_up_sort($event)"
            style="bottom: 50%;right: 50%;">
          -->
                <div class="area-sort">
                    <label class="kotei004title_sort">表示順変更</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse_sort">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <wj-flex-grid id="Gridicrnsort-id" class="Gridicrn004-001_hyoji" :headersVisibility="'Column'"
                    :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                    :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                    :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_sort"
                    :itemsSourceChanged="onItemsSourceChanged_sort" :itemsSource="viewdata_sort" :autoRowHeights="true">

                    <wj-flex-grid-column header=" " binding="kiou_no" :width="30"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="発症年月" binding="kiou_ymd_view" :width="150"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="傷病名ｺｰﾄﾞ" binding="kiou_syobyocode" :width="110"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="傷病名" binding="kiou_syobyonm" :width="240" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="現症" binding="kiou_gensyo" :width="50"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="備考" binding="kiou_naiyo" :width="340" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="表示順" binding="kiou_no_text" :width="70"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="kiou_id" :width="0"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="kiou_ymdflg" :width="0"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="kiou_gensyo_id" :width="0"
                        :allowResizing=false></wj-flex-grid-column>

                </wj-flex-grid>

                <div class="area-sort">
                    <v-btn class="clsbtnmenu004-clr-sort" @click="onClickclr_sort">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu004-ins-sort" @click="onClickins_sort">
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
let DEL_KBN_REKI = 1;   //削除区分:履歴
let GET_KBN_DATA = 1;   //取得区分:表示データ

export default
    {
        props: ["ymd", "uniqid", "traceid", "jigyoid", "jigyoid_kotei", "kotei_kbn"],
        data() {
            return {
                str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",
                InsWinflg: false,
                //データ表示用
                pdataid: '',           //ヘッダデータid
                disptok: '',           //特記事項
                wuniqid: "",
                wtraceid: "",
                griddata: [],          //API取得データ
                gridSeldata: [],       //API取得データ(履歴)
                GetViewDataInf: [],    //API取得データ(データ)
                viewdata: [],          //グリッド表示データ
                viewdata_reki: [],    //履歴グリッド表示データ
                Copydata: [],
                CopySeldata: [],
                tokflg: false,       //特記フラグ
                dataflg: false,

                //ダイアログ表示用変数
                selected_btn: 0,
                InsWinhead: false,
                InsWindata: false,
                Rirekiwin: false,
                dispymdhead: "",
                datepicker_dialog_head: false,  //ヘッダ入力ダイアログカレンダー
                datepicker_dialog_005: false,   //データ入力ダイアログカレンダー
                datepicker_dialog_tyosa: false, //調査日カレンダー

                //ダイアログ表示パラメータ
                dispymdhasyo: "",  //発症日
                dispsyobyoid: "",  //傷病id
                dispsyobyonm: "",  //傷病名
                dispnaiyo: "",     //内容
                dispchk1: "",      //現症
                dispid: "",        //ID
                dispno: "",        //NO

                Ym: '',
                picker: '',

                //確認ダイアログ
                dialog_Message_flg: false,
                Dialog_Message: '',       //ダイアログメッセージ
                Btnno_Visible: false,     //「いいえ」ボタン表示設定 
                dialo_Yesflg_no: 0,

                //1:履歴の新規登録
                //2:履歴の更新登録
                //3:履歴の削除
                //4:データ削除
                //5:データ登録
                //6:前回コピー
                //7:データ削除
                //8:データ登録          
                dialog_Actionflg: 0,

                //データ登録ダイアログ
                insdataflg: false,  //F:新規 T:更新

                //前回コピー用変数
                Copy_dataid: 0, //コピー元データid          

                //表示順ダイアログ
                dialog_Sort_flg: false,
                sort_no: 1,
                viewdata_sort: [],

                pmymd: '',
                pmymd_moto: '',     //表示している元MYMD

                //履歴作成アナウンス
                Label_Visible: false,

                //入力チェック
                inputchk: false,

                Get_inputinf: this.get_inputdata(),
                SyobyoList: [],
                SyobyoList_base: [],
                dispsyobyo_kana: "",
                dispsyobyo_icd10: "",

            };
        },
        components:
        {
            //Byoreki_InsView
        },
        methods:
        {
            get_inputdata() {
                //傷病名を取得

                //API取得
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid_kotei,
                };
                getConnect('/Mst_syobyomei', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf = result;
                    this.syobyoInput();
                });

            },

            syobyoInput() {
                //傷病名グリッド
                let wk_data = [];
                let wk_list = [];

                if (this.Get_inputinf.icrn_inf != null) {
                    this.Get_inputinf.icrn_inf.forEach(function (value) {
                        wk_data = {
                            name: value.bname,
                            code: value.bmno,
                            icd10: value.icd10,
                        }
                        wk_list.push(wk_data);
                    });
                    this.SyobyoList_base = wk_list.concat(); //絞込用にデータを残しておく
                    this.SyobyoList = this.SyobyoList_base.concat();
                }
            },

            //####モーダルイベントエリア####
            //#####新規履歴#####
            win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_004id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_004id");
                    wdialog.style.position = "absolute";
                    this.moveX = e.screenX - this.mouseX;
                    this.moveY = e.screenY - this.mouseY;
                    wdialog.style.bottom = this.screenY - this.moveY + "px";
                    wdialog.style.right = this.screenX - this.moveX + "px";
                }
                else {
                    this.Dragflg = false;
                }
            },
            win_up: function () {
                //ドラッグ
                this.Dragflg = false;
            },
            //#####表示順#####
            win_drag_sort: function (e) {
                //表示順
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("sort_id004");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 482) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 1020) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_sort: function (e) {
                //表示順

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("sort_id004");
                    wdialog.style.position = "absolute";
                    this.moveX = e.screenX - this.mouseX;
                    this.moveY = e.screenY - this.mouseY;
                    wdialog.style.bottom = this.screenY - this.moveY + "px";
                    wdialog.style.right = this.screenX - this.moveX + "px";
                }
                else {
                    this.Dragflg = false;
                }
            },
            win_up_sort: function () {
                //ドラッグ
                this.Dragflg = false;
            },

            //#####登録ウィンドウ#####
            win_drag_win: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("naiyo_id004");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 360) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 760) / 2 + "px";


                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_win: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("naiyo_id004");
                    wdialog.style.position = "absolute";
                    this.moveX = e.screenX - this.mouseX;
                    this.moveY = e.screenY - this.mouseY;
                    wdialog.style.bottom = this.screenY - this.moveY + "px";
                    wdialog.style.right = this.screenX - this.moveX + "px";
                }
                else {
                    this.Dragflg = false;
                }
            },
            win_up_win: function () {
                //ドラッグ
                this.Dragflg = false;
            },

            //#####確認メッセージ#####
            win_drag_Msg: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("kakunin_id004");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_Msg: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("kakunin_id004");
                    wdialog.style.position = "absolute";
                    this.moveX = e.screenX - this.mouseX;
                    this.moveY = e.screenY - this.mouseY;
                    wdialog.style.bottom = this.screenY - this.moveY + "px";
                    wdialog.style.right = this.screenX - this.moveX + "px";
                }
                else {
                    this.Dragflg = false;
                }
            },
            win_up_Msg: function () {
                //ドラッグ
                this.Dragflg = false;
            },

            //#####履歴参照#####
            win_drag_reki: function (e) {
                //履歴参照ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("rireki_id004");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 210) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 280) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_reki: function (e) {
                //履歴参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("rireki_id004");
                    wdialog.style.position = "absolute";
                    this.moveX = e.screenX - this.mouseX;
                    this.moveY = e.screenY - this.mouseY;
                    wdialog.style.bottom = this.screenY - this.moveY + "px";
                    wdialog.style.right = this.screenX - this.moveX + "px";
                }
                else {
                    this.Dragflg = false;
                }
            },
            win_up_reki: function () {
                //履歴参照ドラッグ
                this.Dragflg = false;
            },

            win_drag_ymd: function (e) {
                //日付参照ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("Datepicker_head");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_ymd: function (e) {
                //日付参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("Datepicker_head");
                    wdialog.style.position = "absolute";
                    this.moveX = e.screenX - this.mouseX;
                    this.moveY = e.screenY - this.mouseY;
                    wdialog.style.bottom = this.screenY - this.moveY + "px";
                    wdialog.style.right = this.screenX - this.moveX + "px";
                }
                else {
                    this.Dragflg = false;
                }
            },
            win_up_ymd: function () {
                //日付参照ドラッグ
                this.Dragflg = false;
            },
            //####モーダルイベントエリア END####          
            initTextarea() {

                let textarea = document.getElementById("textarea004");
                let rowcnt = textarea.value.split("\n");

                this.active = true;

                //文字数制御
                if (textarea.value.length > 200) //100文字
                {
                    textarea.value = textarea.value.substring(0, 200);
                }

                //行数制御
                if (rowcnt.length > 10) {
                    var result = "";
                    for (var i = 0; i < 10; i++) {
                        result += rowcnt[i] + "\n";
                    }
                    textarea.value = result;
                }
            }
            , initTextarea_win() {

                this.inputchk = true;

                let textarea = document.getElementById("textarea005");
                let rowcnt = textarea.value.split("\n");

                //文字数制御
                if (textarea.value.length > 200) //100文字
                {
                    this.dispnaiyo = textarea.value.substring(0, 200);
                }

                //行数制御
                if (rowcnt.length > 10) {
                    var result = "";
                    for (var i = 0; i < 10; i++) {
                        result += rowcnt[i] + "\n";
                    }
                    this.dispnaiyo = result;
                }
            }
            , onClickCopy() {
                //前回コピーボタン押下時
                this.Dragflg = false;
                this.Dialog_Message = sysConst.MSG_COPY_CHK;
                this.dialog_Actionflg = 6;  //前回コピー
                this.Btnno_Visible = true;
                this.dialog_Message_flg = true
            }
            , DataCopy() {
                //コピー用APIを実行
                let params = [];
                let putdata = [];

                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                }

                putdata = {
                    jigyoid: this.jigyoid_kotei,
                    intcode: this.intcode,
                    kbn: this.kotei_kbn,
                    dataid: this.pdataid,  //データid
                    ymd: this.ymd,         //内容登録
                }

                //前回コピー
                postConnect('/Koteiinf_COPY', params, 'KOTEIINF', putdata).then((result) => {
                    this.Copydata = result.icrn_inf;
                    this.CopySeldata = result;

                    this.get_data();
                });
            }
            , onClickReki() {
                this.Dragflg = false;
                this.Rirekiwin = true;
            },
            getYm() {
                if (!this.Ym) {
                    this.Ym = dayjs();
                    this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
                }
                return (
                    this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
                );
            }
            , newClick() {
                this.InsWinflg = true;
            },
            onInitializeIcrnGrid(flexGrid) {
                //let headerlist = this.HeaderList;
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn004";
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header004'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;

                this.flex = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click(e) }.bind(this));

                flexGrid.endUpdate();
            }
            //フィルター
            , DataFilter() {
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.gridSeldata.icrn_inf != null) {
                    //既往歴のデータのみに絞る
                    this.gridSeldata.icrn_inf.forEach(function (value) {

                        //区分が既往歴
                        if (value.head_kbn == wk_kbn) {

                            //履歴データ取得
                            if (value.head_mymd.trim() != "") {
                                wk_Rekidata = {
                                    head_mymd: value.head_mymd.substring(0, 4)
                                        + "年" + value.head_mymd.substring(4, 6)
                                        + "月" + value.head_mymd.substring(6)
                                        + "日",
                                    head_dataid: value.head_dataid,
                                    head_kbn: value.head_kbn,
                                    head_siid: value.head_siid,
                                }
                                Rekidata.push(wk_Rekidata);
                            }
                        }
                    });

                    //履歴ソート(降順)
                    Rekidata.sort(function (a, b) {
                        if (a.head_mymd > b.head_mymd) return -1;
                        if (b.head_mymd > a.head_mymd) return 1;
                    });
                    this.viewdata_reki = Rekidata.concat();
                    //クリックイベントを呼んでみる
                    if (this.viewdata_reki.length > 0) {
                        this.pdataid = this.viewdata_reki[0].head_dataid;
                        this.get_data();
                    }

                }
            }
            , get_data() {
                //選択されたデータを持ってくる

                //API取得
                let _self = this;
                let params = [];
                let ymd = this.ymd;           //仮データ
                let intcode = this.intcode;         //仮データ

                //パラメータ
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    ymd: ymd,
                    intcode: intcode,

                    Jigyoid: this.jigyoid_kotei,
                    Kbn: this.kotei_kbn,             //既往歴
                    Dataid: this.pdataid,
                    Modeflg: GET_KBN_DATA,         //データ取得
                };

                getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
                    _self.GetViewDataInf = result;
                    this.DataFilter2();
                })
            }
            //画面更新
            , DataFilter2() {
                let data = [];
                let wdataid = this.pdataid;
                let wk_Ymd = "";
                let wk_Tok = "";
                let tokflg = false;

                if (this.GetViewDataInf.icrn_inf != null) {
                    //既往歴のデータのみに絞る
                    this.GetViewDataInf.icrn_inf.forEach(function (value) {

                        //区分が既往歴
                        if (value.head_kbn == 3 && value.head_dataid == wdataid) {
                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",

                                //既往歴ヘッダの内容を取得
                                value.naiyo.forEach(function (value2) {
                                    if (value2.naiyo_kbn == 0) {
                                        data.push(value2);
                                    }
                                    else {
                                        tokflg = true;
                                        wk_Tok = wk_Tok + value2.biko_naiyo;
                                    }
                                });
                        }
                    });

                    this.str_ymd = wk_Ymd;
                    this.pmymd = this.str_ymd;
                    this.pmymd_moto = this.str_ymd;

                    this.tokflg = tokflg;
                    //ソート
                    data.sort(function (a, b) {
                        if (a.kiou_no < b.kiou_no) return -1;
                        if (b.kiou_no < a.kiou_no) return 1;
                    });

                    //連番で表示する
                    for (let i = 0; i < data.length; i++) {
                        data[i].kiou_no = i + 1;
                    }

                    this.viewdata = data.concat();  //グリッドデータ            
                    this.disptok = wk_Tok;          //備考欄
                }
            }
            , onItemsSourceChanged(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            },
            grid_click(e) {
                if (this.Chk_Reki() == true) {
                    this.Dragflg = false;
                    var ht = this.flex.hitTest(e);
                    //グリッドがクリックされた場合ウィンドウを表示する 
                    if (ht.row >= 0) {
                        this.InsWindata = true;
                        this.dispymdhasyo = this.viewdata[ht.row].kiou_ymd;
                        this.dispsyobyoid = this.viewdata[ht.row].kiou_syobyocode;
                        this.dispsyobyonm = this.viewdata[ht.row].kiou_syobyonm;
                        this.dispnaiyo = this.viewdata[ht.row].kiou_naiyo;
                        this.dispid = this.viewdata[ht.row].kiou_id;
                        this.dispno = this.viewdata[ht.row].kiou_no;

                        if (this.dispymdhasyo.trim() != "") {
                            this.Ym = dayjs(this.dispymdhasyo);
                        }
                        else {
                            this.Ym = dayjs();
                        }
                        //現象チェック
                        if (this.viewdata[ht.row].kiou_gensyo_id == "1") {
                            this.dispchk1 = true;
                            let winter = setInterval(() => {
                                //ラジオボタン
                                var gengo = document.getElementById("chk_gensyo");
                                if (gengo.style != null) {
                                    clearInterval(winter);
                                    gengo.style.color = "#0081eb";
                                }
                            }, "interval");
                        }
                        else {
                            this.dispchk1 = false;
                            let winter = setInterval(() => {
                                //ラジオボタン
                                var gengo = document.getElementById("chk_gensyo");
                                if (gengo.style != null) {
                                    clearInterval(winter);
                                    gengo.style.color = "#000";
                                }
                            }, "interval");
                        }

                        this.selected_btn = 1; //更新
                        this.insdataflg = true;
                    }
                    else {
                        this.Ym = dayjs();
                        this.dispymdhasyo = this.Ym.format('YYYY') + this.Ym.format('MM') + this.Ym.format('DD');
                        this.dispsyobyoid = "";
                        this.dispsyobyonm = "";
                        this.dispnaiyo = "";
                        this.dispid = 0;
                        this.dispno = 0;
                        this.dispchk1 = false;
                        this.selected_btn = 0;  //新規作成
                        this.insdataflg = false;
                        this.InsWindata = true;

                        let winter = setInterval(() => {
                            //ラジオボタン
                            var gengo = document.getElementById("chk_gensyo");
                            if (gengo.style != null) {
                                clearInterval(winter);
                                gengo.style.color = "#000";
                            }
                        }, "interval");
                    }
                }
            }

            , onClick_add() {
                //新規追加クリック
                this.Ym = dayjs();
                this.dispymdhasyo = this.Ym.format('YYYY') + this.Ym.format('MM') + this.Ym.format('DD');
                this.dispsyobyoid = "";
                this.dispsyobyonm = "";
                this.dispnaiyo = "";
                this.dispid = 0;
                this.dispno = 0;
                this.dispchk1 = false;
                this.selected_btn = 0;  //新規作成
                this.insdataflg = false;
                this.InsWindata = true;

                let winter = setInterval(() => {
                    //ラジオボタン
                    var gengo = document.getElementById("chk_gensyo");
                    if (gengo.style != null) {
                        clearInterval(winter);
                        gengo.style.color = "#000";
                    }
                }, "interval");
            }
            , dialog_close() {
                this.InsWinflg = false;
            }
            , onClickins() {
                //データ登録ボタン
                this.Dialog_Message = "特記事項を登録します。\nよろしいですか。";
                this.dialog_Actionflg = 8;  //データ登録
                this.Btnno_Visible = true;
                this.dialog_Message_flg = true;
            }
            , BikoData_ins(kbn) {
                //#####ヘッダの更新処理
                this.insflg = false;
                if (this.pmymd != this.pmymd_moto) {
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
                    insflg: INS_KBN_BIKO, //備考登録
                }

                //登録データ
                let wk_naiyo = this.splitNaiyo(this.disptok, 256);
                let wk_putdata = [];
                let putdata = [];

                if (wk_naiyo.length > 0) {
                    for (let i = 0; i < wk_naiyo.length; i++) {
                        wk_putdata =
                        {
                            head_jigyoid: this.jigyoid_kotei,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,
                            head_dataid: this.pdataid,
                            head_mstid: 0,
                            head_mymd: " ",
                            head_siid: 0,
                            head_delflg: 0,
                            kihon_email: " ",
                            kihon_kmail: " ",
                            kihon_ktelno: " ",
                            kihon_faxno: " ",
                            kihon_syogaikbn1: 0,
                            kihon_jyudo1: 0,
                            kihon_syukei1: 0,
                            kihon_syogaikbn2: 0,
                            kihon_jyudo2: 0,
                            kihon_syukei2: 0,
                            kihon_syogaikbn3: 0,
                            kihon_jyudo3: 0,
                            kihon_syukei3: 0,
                            kihon_setaiid: 0,
                            kihon_honninid: 0,
                            seikatu_id: 0,
                            seikatu_no: 0,
                            seikatu_ymdkoro: 0,
                            seikatu_lcnt: 0,
                            seikatu_naiyo: 0,
                            kiou_id: 0,
                            kiou_no: 0,
                            kiou_ymdflg: 0,
                            kiou_ymd: " ",
                            kiou_syobyocode: 0,
                            kiou_gensyo: 0,
                            kiou_naiyo: "",
                            jyusin_id: 0,
                            jyusin_no: 0,
                            jyusin_kiouid: 0,
                            jyusin_iryokikanid: 0,
                            jyusin_sinryokaid: 0,
                            jyusin_syujii: " ",
                            jyusin_renrakusaki: " ",
                            jyusin_kbn: 0,
                            jyusin_hindo: " ",
                            jyusin_fukuyaku_kbn: 0,
                            jyusin_fukuyaku_time: " ",
                            iryo_id: 0,
                            iryo_iryohokenid: 0,
                            iryo_iryokigobango: " ",
                            iryo_iryohihoken: 0,
                            iryo_syogaijiritu: 0,
                            iryo_syogaijiritu_kbn: 0,
                            iryo_syogaitokubetu: 0,
                            iryo_syogaisonota: 0,
                            iryo_syogaisonota_biko: " ",
                            iryo_jyukyu_ro_jyukyu: 0,
                            iryo_jyukyu_ro_gengaku: 0,
                            iryo_jyukyu_ro_kenko: 0,
                            iryo_sinsyo_jyukyu: 0,
                            Day_id: 0,
                            Day_kbn: 0,
                            Day_stime: " ",
                            Day_etime: " ",
                            Day_naiyo: " ",
                            week_id: 0,
                            week_kbn: 0,
                            week_weekkbn: 0,
                            week_datlcnt: 0,
                            week_naiyo: " ",
                            biko_lcnt: i + 1,
                            biko_naiyo: wk_naiyo[i]
                        }
                        putdata.push(wk_putdata);

                    }

                }
                else {
                    //空データ
                    wk_putdata =
                    {
                        head_jigyoid: this.jigyoid_kotei,
                        head_intcode: this.intcode,
                        head_kbn: this.kotei_kbn,
                        head_dataid: this.pdataid,
                        head_mstid: 0,
                        head_mymd: " ",
                        head_siid: 0,
                        head_delflg: 0,
                        kihon_email: " ",
                        kihon_kmail: " ",
                        kihon_ktelno: " ",
                        kihon_faxno: " ",
                        kihon_syogaikbn1: 0,
                        kihon_jyudo1: 0,
                        kihon_syukei1: 0,
                        kihon_syogaikbn2: 0,
                        kihon_jyudo2: 0,
                        kihon_syukei2: 0,
                        kihon_syogaikbn3: 0,
                        kihon_jyudo3: 0,
                        kihon_syukei3: 0,
                        kihon_setaiid: 0,
                        kihon_honninid: 0,
                        seikatu_id: 0,
                        seikatu_no: 0,
                        seikatu_ymdkoro: " ",
                        seikatu_lcnt: 0,
                        seikatu_naiyo: " ",
                        kiou_id: 0,
                        kiou_no: 0,
                        kiou_ymdflg: 0,
                        kiou_ymd: " ",
                        kiou_syobyocode: 0,
                        kiou_gensyo: 0,
                        kiou_naiyo: " ",
                        jyusin_id: 0,
                        jyusin_no: 0,
                        jyusin_kiouid: 0,
                        jyusin_iryokikanid: 0,
                        jyusin_sinryokaid: 0,
                        jyusin_syujii: " ",
                        jyusin_renrakusaki: " ",
                        jyusin_kbn: 0,
                        jyusin_hindo: " ",
                        jyusin_fukuyaku_kbn: 0,
                        jyusin_fukuyaku_time: " ",
                        iryo_id: 0,
                        iryo_iryohokenid: 0,
                        iryo_iryokigobango: " ",
                        iryo_iryohihoken: 0,
                        iryo_syogaijiritu: 0,
                        iryo_syogaijiritu_kbn: 0,
                        iryo_syogaitokubetu: 0,
                        iryo_syogaisonota: 0,
                        iryo_syogaisonota_biko: " ",
                        iryo_jyukyu_ro_jyukyu: 0,
                        iryo_jyukyu_ro_gengaku: 0,
                        iryo_jyukyu_ro_kenko: 0,
                        iryo_sinsyo_jyukyu: 0,
                        Day_id: 0,
                        Day_kbn: 0,
                        Day_stime: " ",
                        Day_etime: " ",
                        Day_naiyo: " ",
                        week_id: 0,
                        week_kbn: 0,
                        week_weekkbn: 0,
                        week_datlcnt: 0,
                        week_naiyo: " ",
                        biko_lcnt: 1,
                        biko_naiyo: " "
                    }
                    putdata.push(wk_putdata);
                }

                if (this.tokflg == false) {
                    //特記ないため新規作成
                    postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                    });
                }
                else {
                    //特記ある-更新
                    putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                    });
                }
            }
            , onClickdel() {
                this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK, 7);
            }

            , splitNaiyo: function (str, size) {
                let strlen = Math.ceil(str.length / size);
                let array = [];

                for (let i = 0, x = 0; i < strlen; ++i, x += size) {
                    array[i] = str.substr(x, size)
                }

                return array;

            }
            , onClickclr() {
                this.disptok = "";
            }
            , onHeadclick_ins() {
                this.Ym = dayjs();

                //新規ボタンクリックイベント
                this.InsWinhead = true;
                this.insflg = true;//新規登録
            }
            , onHeadclick_upd() {
                //更新ボタンクリックイベント
                this.Ym = dayjs();
                if (this.pmymd != "") {
                    let wYmd = this.pmymd.replace("年", "");
                    wYmd = wYmd.replace("月", "");
                    wYmd = wYmd.replace("日", "");
                    this.Ym = dayjs(wYmd);
                }
                this.insflg = false;//更新登録
                this.InsWinhead = true;
            }
            , Click_colse_head() {
                //ヘッダウィンドウ
                this.InsWinhead = false;
            }
            , inputCalendarClick(kbn) {
                //カレンダークリック

                if (kbn == 0) {
                    this.picker =
                        this.Ym.format('YYYY') +
                        '-' +
                        this.Ym.format('MM') +
                        '-' +
                        this.Ym.format('DD');
                    this.datepicker_dialog_head = true;
                }
                else if (kbn == 1) {
                    if (this.Chk_Reki() == true) {
                        this.picker = this.pmymd.replace("年", "-");
                        this.picker = this.picker.replace("月", "-");
                        this.picker = this.picker.replace("日", "");
                        this.inputchk = true;
                        this.datepicker_dialog_tyosa = true;
                    }
                }
            }
            , monthSelect() {
                //月選択
                this.Ym = dayjs(this.picker);
                this.datepicker_dialog_head = false;
            }
            , monthSelect_tyosa() {
                //調査日カレンダー
                this.Ym = dayjs(this.picker);
                this.pmymd = this.picker.replaceAll("-", "");
                this.pmymd = this.pmymd.substring(0, 4)
                    + "年" + this.pmymd.substring(4, 6)
                    + "月" + this.pmymd.substring(6)
                    + "日",
                    this.datepicker_dialog_tyosa = false;
            }
            , Click_colse_Reki() {
                //履歴ウィンドウ
                this.Rirekiwin = false;
            }
            , onHead_ins() {
                //ヘッダの登録ボタン

                if (this.insflg == true) {
                    this.Message_Dialog(sysConst.MSG_REKI_INS_CHK, 1);
                }
                else {
                    this.Message_Dialog(sysConst.MSG_REKI_UPD_CHK, 2);
                }
            }
            , Head_insdata(kbn) {
                //kbn:1画面遷移時の登録

                //登録データ
                let ins_ymd = this.Ym.format('YYYY') + this.Ym.format('MM') + this.Ym.format('DD');

                if (this.insflg == true) {

                    //新規登録
                    let _self = this;
                    let params = [];
                    params =
                    {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,   //既往歴
                        intcode: this.intcode,
                        insflg: INS_KBN_HEAD, //ヘッダ登録
                    }

                    //登録データ
                    let postdata =
                        [
                            {
                                head_jigyoid: this.jigyoid_kotei,
                                head_intcode: this.intcode,
                                head_kbn: this.kotei_kbn,
                                head_dataid: 0,
                                head_mstid: 0,
                                head_mymd: ins_ymd,
                                head_siid: 0,
                                head_delflg: 0,
                                kihon_email: " ",
                                kihon_kmail: " ",
                                kihon_ktelno: " ",
                                kihon_faxno: " ",
                                kihon_syogaikbn1: 0,
                                kihon_jyudo1: 0,
                                kihon_syukei1: 0,
                                kihon_syogaikbn2: 0,
                                kihon_jyudo2: 0,
                                kihon_syukei2: 0,
                                kihon_syogaikbn3: 0,
                                kihon_jyudo3: 0,
                                kihon_syukei3: 0,
                                kihon_setaiid: 0,
                                kihon_honninid: 0,
                                seikatu_id: 0,
                                seikatu_no: 0,
                                seikatu_ymdkoro: " ",
                                seikatu_lcnt: 0,
                                seikatu_naiyo: " ",
                                kiou_id: 0,
                                kiou_no: 0,
                                kiou_ymdflg: 0,
                                kiou_ymd: " ",
                                kiou_syobyocode: " ",
                                kiou_gensyo: 0,
                                kiou_naiyo: " ",
                                jyusin_id: 0,
                                jyusin_no: 0,
                                jyusin_kiouid: 0,
                                jyusin_iryokikanid: 0,
                                jyusin_sinryokaid: 0,
                                jyusin_syujii: " ",
                                jyusin_renrakusaki: " ",
                                jyusin_kbn: 0,
                                jyusin_hindo: " ",
                                jyusin_fukuyaku_kbn: 0,
                                jyusin_fukuyaku_time: " ",
                                iryo_id: 0,
                                iryo_iryohokenid: 0,
                                iryo_iryokigobango: " ",
                                iryo_iryohihoken: 0,
                                iryo_syogaijiritu: 0,
                                iryo_syogaijiritu_kbn: 0,
                                iryo_syogaitokubetu: 0,
                                iryo_syogaisonota: 0,
                                iryo_syogaisonota_biko: " ",
                                iryo_jyukyu_ro_jyukyu: 0,
                                iryo_jyukyu_ro_gengaku: 0,
                                iryo_jyukyu_ro_kenko: 0,
                                iryo_sinsyo_jyukyu: 0,
                                Day_id: 0,
                                Day_kbn: 0,
                                Day_stime: " ",
                                Day_etime: " ",
                                Day_naiyo: " ",
                                week_id: 0,
                                week_kbn: 0,
                                week_weekkbn: 0,
                                week_datlcnt: 0,
                                week_naiyo: " ",
                                biko_lcnt: 0,
                                biko_naiyo: " "
                            }
                        ];

                    postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddataPost = result.icrn_inf;
                        _self.gridSeldataPost = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_REKI_INS, 0);
                        this.InsWinhead = false;
                    }
                    );

                }
                else {
                    //更新登録
                    let _self = this;
                    let params = [];

                    params =
                    {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,   //既往歴
                        intcode: this.intcode,
                        insflg: INS_KBN_HEAD, //ヘッダ登録
                    }

                    //登録データ
                    let putdata =
                        [
                            {
                                head_jigyoid: this.jigyoid_kotei,
                                head_intcode: this.intcode,
                                head_kbn: this.kotei_kbn,
                                head_dataid: this.pdataid,
                                head_mstid: 0,
                                head_mymd: ins_ymd,
                                head_siid: 0,
                                head_delflg: 0,
                                kihon_email: " ",
                                kihon_kmail: " ",
                                kihon_ktelno: " ",
                                kihon_faxno: " ",
                                kihon_syogaikbn1: 0,
                                kihon_jyudo1: 0,
                                kihon_syukei1: 0,
                                kihon_syogaikbn2: 0,
                                kihon_jyudo2: 0,
                                kihon_syukei2: 0,
                                kihon_syogaikbn3: 0,
                                kihon_jyudo3: 0,
                                kihon_syukei3: 0,
                                kihon_setaiid: 0,
                                kihon_honninid: 0,
                                seikatu_id: 0,
                                seikatu_no: 0,
                                seikatu_ymdkoro: " ",
                                seikatu_lcnt: 0,
                                seikatu_naiyo: " ",
                                kiou_id: 0,
                                kiou_no: 0,
                                kiou_ymdflg: 0,
                                kiou_ymd: " ",
                                kiou_syobyocode: " ",
                                kiou_gensyo: 0,
                                kiou_naiyo: " ",
                                jyusin_id: 0,
                                jyusin_no: 0,
                                jyusin_kiouid: 0,
                                jyusin_iryokikanid: 0,
                                jyusin_sinryokaid: 0,
                                jyusin_syujii: " ",
                                jyusin_renrakusaki: " ",
                                jyusin_kbn: 0,
                                jyusin_hindo: " ",
                                jyusin_fukuyaku_kbn: 0,
                                jyusin_fukuyaku_time: " ",
                                iryo_id: 0,
                                iryo_iryohokenid: 0,
                                iryo_iryokigobango: " ",
                                iryo_iryohihoken: 0,
                                iryo_syogaijiritu: 0,
                                iryo_syogaijiritu_kbn: 0,
                                iryo_syogaitokubetu: 0,
                                iryo_syogaisonota: 0,
                                iryo_syogaisonota_biko: " ",
                                iryo_jyukyu_ro_jyukyu: 0,
                                iryo_jyukyu_ro_gengaku: 0,
                                iryo_jyukyu_ro_kenko: 0,
                                iryo_sinsyo_jyukyu: 0,
                                Day_id: 0,
                                Day_kbn: 0,
                                Day_stime: " ",
                                Day_etime: " ",
                                Day_naiyo: " ",
                                week_id: 0,
                                week_kbn: 0,
                                week_weekkbn: 0,
                                week_datlcnt: 0,
                                week_naiyo: " ",
                                biko_lcnt: 0,
                                biko_naiyo: " "
                            }
                        ];

                    putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddataPut = result.icrn_inf;
                        _self.gridSeldataPut = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_REKI_UPD, 0);
                        this.InsWinhead = false;
                    }
                    );
                }
            }
            , onClickdel_reki() {
                //履歴削除ボタン
                this.Message_Dialog("選択している履歴を削除します。\nよろしいですか。", 3);
            }
            , del_rekidata() {
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
                    jigyoid: this.jigyoid_kotei,
                    dataid: this.pdataid,
                    id: 0,
                    lcnt: 1,
                    headflg: DEL_KBN_REKI,
                }

                //削除処理
                deleteConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_REKI_DEL, 0);
                });
            }
            //作成履歴
            , onInitializeIcrnGridReki(flexGrid) {
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Reki'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;
                flexGrid.endUpdate();

                this.flex2 = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_clickreki(e) }.bind(this));
            }
            , grid_clickreki: function (e) {
                var ht = this.flex2.hitTest(e);
                if (ht.row >= 0) {
                    if (this.inputchk == true) {
                        this.dialo_Yesflg_no = 0;
                        //更新有
                        this.input_chk();

                        let winter = setInterval(() => {
                            if (this.dialo_Yesflg_no == 1 || this.dialo_Yesflg_no == 2) {
                                clearInterval(winter);
                                if (this.dialo_Yesflg_no == 1) {
                                    this.BikoData_ins(1);
                                }

                                this.inputchk = false //入力チェックリセット
                                //グリッドがクリックされた場合画面の表示を更新する                
                                this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                                this.get_data();
                            }
                        }, "interval");
                    }
                    else {
                        //グリッドがクリックされた場合画面の表示を更新する   
                        this.inputchk = false //入力チェックリセット             
                        this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                        this.get_data();
                    }

                }
            }
            //#####データ入力ダイアログ#####
            , onDataIns_click() {
                //データダイアログ 新規
                this.insdataflg = false;
            }
            , onDataUpd_click() {
                //データダイアログ 更新
                this.insdataflg = true;
            }
            , inputCalendarClick_data(kbn) {
                if (kbn == 0) {
                    this.inputchk = true;
                    this.picker =
                        this.Ym.format('YYYY') +
                        '-' +
                        this.Ym.format('MM') +
                        '-' +
                        this.Ym.format('DD');
                    this.datepicker_dialog_005 = true;
                }
            }
            , Click_colse_data() {
                if (this.inputchk == true) {
                    this.dialo_Yesflg_no = 0;
                    //更新有
                    this.input_chk();

                    let winter = setInterval(() => {
                        if (this.dialo_Yesflg_no == 1 || this.dialo_Yesflg_no == 2) {
                            clearInterval(winter);
                            if (this.dialo_Yesflg_no == 1) {
                                this.insflg = false
                                this.insinput_data();
                            }
                            this.inputchk = false //入力チェックリセット
                            //閉じる                
                            this.InsWindata = false;
                        }
                    }, "interval");
                }
                else {
                    //閉じる                
                    this.InsWindata = false;
                }


            }
            , onClickins_data() {
                //データ登録ボタン
                this.Message_Dialog("入力データを登録します。\nよろしいですか。", 5);
            }
            , insinput_data() {

                //#####ヘッダの更新処理
                this.insflg = false;
                if (this.pmymd != this.pmymd_moto) {
                    this.Head_insData();
                }

                //データ登録ボタン
                let putdata = [];
                //発症日
                let wYmd = this.dispymdhasyo;
                let wymdflg = 1;  //1:日付指定 2:不明
                let wgensyo = 0;

                if (this.pdataid > 0) {
                    //履歴が存在する場合のみ登録
                    wymdflg = 1;  //1固定とのこと

                    //現症
                    if (this.dispchk1 == true) {
                        wgensyo = 1;
                    }

                    //パラメータ
                    let _self = this;
                    let params = [];
                    params = {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,
                        intcode: this.intcode,
                        insflg: INS_KBN_NAIYO, //内容登録
                    }

                    let wk_putdata =
                    {
                        head_jigyoid: this.jigyoid_kotei,
                        head_intcode: this.intcode,
                        head_kbn: this.kotei_kbn,
                        head_dataid: this.pdataid,
                        head_mstid: 0,
                        head_mymd: " ",
                        head_siid: 0,
                        head_delflg: 0,
                        kihon_email: " ",
                        kihon_kmail: " ",
                        kihon_ktelno: " ",
                        kihon_faxno: " ",
                        kihon_syogaikbn1: 0,
                        kihon_jyudo1: 0,
                        kihon_syukei1: 0,
                        kihon_syogaikbn2: 0,
                        kihon_jyudo2: 0,
                        kihon_syukei2: 0,
                        kihon_syogaikbn3: 0,
                        kihon_jyudo3: 0,
                        kihon_syukei3: 0,
                        kihon_setaiid: 0,
                        kihon_honninid: 0,
                        seikatu_id: 0,
                        seikatu_no: 0,
                        seikatu_ymdkoro: " ",
                        seikatu_lcnt: 0,
                        seikatu_naiyo: " ",
                        kiou_id: this.dispid,
                        kiou_no: this.dispno,
                        kiou_ymdflg: wymdflg,
                        kiou_ymd: wYmd,
                        kiou_syobyocode: this.dispsyobyoid,
                        kiou_gensyo: wgensyo,
                        kiou_naiyo: this.dispnaiyo,
                        jyusin_id: 0,
                        jyusin_no: 0,
                        jyusin_kiouid: 0,
                        jyusin_iryokikanid: 0,
                        jyusin_sinryokaid: 0,
                        jyusin_syujii: " ",
                        jyusin_renrakusaki: " ",
                        jyusin_kbn: 0,
                        jyusin_hindo: " ",
                        jyusin_fukuyaku_kbn: 0,
                        jyusin_fukuyaku_time: " ",
                        iryo_id: 0,
                        iryo_iryohokenid: 0,
                        iryo_iryokigobango: " ",
                        iryo_iryohihoken: 0,
                        iryo_syogaijiritu: 0,
                        iryo_syogaijiritu_kbn: 0,
                        iryo_syogaitokubetu: 0,
                        iryo_syogaisonota: 0,
                        iryo_syogaisonota_biko: " ",
                        iryo_jyukyu_ro_jyukyu: 0,
                        iryo_jyukyu_ro_gengaku: 0,
                        iryo_jyukyu_ro_kenko: 0,
                        iryo_sinsyo_jyukyu: 0,
                        Day_id: 0,
                        Day_kbn: 0,
                        Day_stime: " ",
                        Day_etime: " ",
                        Day_naiyo: " ",
                        week_id: 0,
                        week_kbn: 0,
                        week_weekkbn: 0,
                        week_datlcnt: 0,
                        week_naiyo: " ",
                        biko_lcnt: 0,
                        biko_naiyo: " "
                    }
                    //リストに追加
                    putdata.push(wk_putdata);

                    if (this.insdataflg == false) {
                        //新規登録
                        postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                            _self.griddataPost = result.icrn_inf;
                            _self.gridSeldataPost = result;
                            this.View_upd(this.intcode);
                            this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                            this.InsWindata = false;
                        });
                    }
                    else {
                        //更新登録
                        putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                            _self.griddataPut = result.icrn_inf;
                            _self.gridSeldataPut = result;
                            this.View_upd(this.intcode);
                            this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                            this.InsWindata = false;
                        });
                    }
                }
                else {
                    this.Message_Dialog(sysConst.MSG_REKI_CRE, 0);
                }
            }
            , onClickdel_data() {
                //データ削除ボタン
                this.Message_Dialog("入力データを削除します。\nよろしいですか。", 4);
            }
            , delinput_data() {
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
                    jigyoid: this.jigyoid_kotei,
                    dataid: this.pdataid,
                    id: this.dispid,
                    lcnt: 0,
                    headflg: 0,
                }

                //削除処理
                deleteConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddatadel = result.icrn_inf;
                    _self.gridSeldatadel = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_DEL, 0);
                });
            }
            , onClickclr_data() {
                //データクリアボタン
                this.dispsyobyoid = "";
                this.dispsyobyonm = "";
                this.dispchk1 = false;
                this.dispnaiyo = "";
            }
            , monthSelect_data() {
                //月選択
                this.Ym = dayjs(this.picker);
                this.dispymdhasyo = this.picker.replace("-", "");
                this.dispymdhasyo = this.dispymdhasyo.replace("-", "");
                this.datepicker_dialog_005 = false;
            }
            , setUserData(wintcode, wSeldata) {
                //利用者選択データ受け取り
                this.inputchk = false //入力チェックリセット
                this.pdataid = 0;             //初期化
                this.viewClear();
                this.GetViewDataInf = [];
                this.gridSeldata = wSeldata;
                this.intcode = wintcode;      //利用者コード
                this.DataFilter();
                this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';

                if (this.pdataid == 0) {
                    this.Label_Visible = true;
                }
                else {
                    this.Label_Visible = false;
                }
            }
            , viewClear() {
                //データクリア
                this.InsWinhead = false;
                this.InsWindata = false;
                this.InsWinflg = false;
                this.insdataflg = false;
                this.insflg = true;
                this.viewdata = [];
                this.disptok = "";
            }
            , onClick_Massege(kbn) {
                //確認ダイアログ判定
                if (kbn == 0) {
                    this.dialo_Yesflg_no = 1;

                    if (this.dialog_Actionflg == 1) {
                        //履歴の新規追加
                        this.Head_insdata();
                    }
                    else if (this.dialog_Actionflg == 2) {
                        //履歴の更新追加
                        this.Head_insdata();
                    }
                    else if (this.dialog_Actionflg == 3) {
                        //履歴の削除
                        this.del_rekidata();
                    }
                    else if (this.dialog_Actionflg == 4) {
                        //入力データの削除
                        this.delinput_data();
                    }
                    else if (this.dialog_Actionflg == 5) {
                        //入力データの登録
                        this.insinput_data();
                    }
                    else if (this.dialog_Actionflg == 6) {
                        //入力データの登録
                        this.DataCopy();
                    }
                    else if (this.dialog_Actionflg == 7) {
                        //備考データの削除
                        this.del_rekidata();
                    }
                    else if (this.dialog_Actionflg == 8) {
                        //備考データの登録
                        this.BikoData_ins();
                    }
                    else if (this.dialog_Actionflg == 9) {
                        //履歴チェック
                        this.InsWinhead = true;
                    }
                    else if (this.dialog_Actionflg == 10) {
                        //画面移動チェック
                        this.dialog_Message_flg = false;
                    }
                }
                else {
                    this.dialo_Yesflg_no = 2;
                }

                this.dialog_Message_flg = false;
            }
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
            }
            , Message_Dialog(Message, kbn) {
                //汎用メッセージダイアログ
                this.Dragflg = false;
                this.Dialog_Message = Message;
                this.dialog_Actionflg = kbn;
                this.Btnno_Visible = false;
                if (kbn > 0) { this.Btnno_Visible = true }
                this.dialog_Message_flg = true
            }
            , Message_Dialog_RekiChk(Message) {
                //汎用メッセージダイアログ
                this.Dialog_Message = Message;
                this.dialog_Actionflg = 9;  //メッセージのみ
                this.Btnno_Visible = false;
                this.dialog_Message_flg = true
            }
            , Chk_Reki: function () {
                //履歴をチェックする
                if (this.Label_Visible == true) {
                    //this.Message_Dialog_RekiChk(sysConst.MSG_REKI_CRE);
                    this.Message_Dialog(sysConst.MSG_REKI_CRE, 0)
                    return false;
                }
                else {
                    return true;
                }
            }
            , click_text() {
                this.inputchk = true;//入力チェックT
                this.Chk_Reki();
            }

            //表示順ダイアログ
            , onInitializeIcrnGrid_sort(flexGrid) {
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.frozenRows = 0;
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].max = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header'
                flexGrid.cells.rows.defaultSize = 35;
                flexGrid.alternatingRowStep = 0;

                //イベントの追加
                this.flex3 = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_sort(e) }.bind(this));
                flexGrid.endUpdate();
            }

            , grid_click_sort: function (e) {
                var ht = this.flex3.hitTest(e);

                //グリッドがクリックされた場合ウィンドウを表示する
                if (ht.row >= 0) {
                    if (ht.col == 6) {
                        //表示順の列
                        if (this.viewdata_sort[ht.row].kiou_no_text == "") {
                            this.viewdata_sort[ht.row].kiou_no_text = this.sort_no;
                            this.sort_no = this.sort_no + 1;
                            this.flex3.endUpdate();
                        }
                        else {
                            if (this.viewdata_sort[ht.row].kiou_no_text == (this.sort_no - 1)) {
                                this.viewdata_sort[ht.row].kiou_no_text = "";
                                this.sort_no = this.sort_no - 1;
                                this.flex3.endUpdate();
                            }

                        }
                    }
                }
            }
            , onClickSort() {
                //表示順変更画面の表示
                this.Dragflg = false;
                let wk_viewdata_sort = [];
                let wk_viewdata_sort_list = [];

                //表示グリッドのデータセット
                this.viewdata.forEach(function (value) {
                    wk_viewdata_sort = {
                        kiou_id: value.kiou_id,
                        kiou_no: value.kiou_no,
                        kiou_no_text: "",
                        kiou_ymdflg: value.kiou_ymdflg,
                        kiou_ymd_view: value.kiou_ymd_view,
                        kiou_syobyonm: value.kiou_syobyonm,
                        kiou_syobyocode: value.kiou_syobyocode,
                        kiou_gensyo: value.kiou_gensyo,
                        kiou_naiyo: value.kiou_naiyo,
                    }
                    wk_viewdata_sort_list.push(wk_viewdata_sort);
                }
                );

                //連番で表示する
                for (let i = 0; i < wk_viewdata_sort_list.length; i++) {
                    wk_viewdata_sort_list[i].kiou_no = i + 1;
                }
                this.viewdata_sort = wk_viewdata_sort_list.concat();
                this.sort_no = 1;
                this.dialog_Sort_flg = true;

            }
            , Click_colse_sort() {
                //データウィンドウ
                this.dialog_Sort_flg = false;
                this.sort_no = 1;
            }
            , onItemsSourceChanged_sort(flexGrid) {
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            }
            , onClickclr_sort() {
                //表示順クリア

                this.sort_no = 1;
                let wk_viewdata_sort = [];
                let wk_viewdata_sort_list = [];

                //表示グリッドのデータセット
                this.viewdata.forEach(function (value) {
                    wk_viewdata_sort = {
                        kiou_id: value.kiou_id,
                        kiou_no: value.kiou_no,
                        kiou_no_text: "",
                        kiou_ymdflg: value.kiou_ymdflg,
                        kiou_ymd_view: value.kiou_ymd_view,
                        kiou_syobyocode: value.kiou_syobyocode,
                        kiou_gensyo: value.kiou_gensyo,
                        kiou_naiyo: value.kiou_naiyo,
                    }
                    wk_viewdata_sort_list.push(wk_viewdata_sort);
                }
                );
                this.viewdata_sort = wk_viewdata_sort_list.concat();
                this.flex3.endUpdate();
            }
            , chk_sort: function () {
                let chkflg = true;

                //表示順の入力チェック
                for (let i = 0; i < this.viewdata_sort.length; i++) {
                    if (this.viewdata_sort[i].kiou_no_text == "") {
                        chkflg = false;
                        break;
                    }
                }

                return chkflg;

            }
            , onClickins_sort() {
                //表示順登録

                //表示順の入力チェック
                if (this.chk_sort() == true) {
                    //表示順情報を登録リストに反映
                    let wk_viewdata = this.viewdata.concat();
                    let wk_viewdata_sort = this.viewdata_sort.concat();

                    wk_viewdata_sort.forEach(function (value) {
                        let wk_id = value.kiou_id;
                        let wk_no = value.kiou_no_text;

                        for (let i = 0; i < wk_viewdata.length; i++) {
                            if (wk_viewdata[i].kiou_id == wk_id) {
                                wk_viewdata[i].kiou_no = wk_no;
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
                        insflg: INS_KBN_NAIYO, //内容登録
                    }

                    for (let i = 0; i < wk_viewdata.length; i++) {
                        //登録データ
                        let wk_putdata =
                        {
                            head_jigyoid: this.jigyoid_kotei,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,
                            head_dataid: this.pdataid,
                            head_mstid: 0,
                            head_mymd: " ",
                            head_siid: 0,
                            head_delflg: 0,
                            kihon_email: " ",
                            kihon_kmail: " ",
                            kihon_ktelno: " ",
                            kihon_faxno: " ",
                            kihon_syogaikbn1: 0,
                            kihon_jyudo1: 0,
                            kihon_syukei1: 0,
                            kihon_syogaikbn2: 0,
                            kihon_jyudo2: 0,
                            kihon_syukei2: 0,
                            kihon_syogaikbn3: 0,
                            kihon_jyudo3: 0,
                            kihon_syukei3: 0,
                            kihon_setaiid: 0,
                            kihon_honninid: 0,
                            seikatu_id: 0,
                            seikatu_no: 0,
                            seikatu_ymdkoro: " ",
                            seikatu_lcnt: 0,
                            seikatu_naiyo: " ",
                            kiou_id: wk_viewdata[i].kiou_id,
                            kiou_no: wk_viewdata[i].kiou_no,
                            kiou_ymdflg: wk_viewdata[i].kiou_ymdflg,
                            kiou_ymd: wk_viewdata[i].kiou_ymd,
                            kiou_syobyocode: wk_viewdata[i].kiou_syobyocode,
                            kiou_gensyo: wk_viewdata[i].kiou_gensyo_id,
                            kiou_naiyo: wk_viewdata[i].kiou_naiyo,
                            jyusin_id: 0,
                            jyusin_no: 0,
                            jyusin_kiouid: 0,
                            jyusin_iryokikanid: 0,
                            jyusin_sinryokaid: 0,
                            jyusin_syujii: " ",
                            jyusin_renrakusaki: " ",
                            jyusin_kbn: 0,
                            jyusin_hindo: " ",
                            jyusin_fukuyaku_kbn: 0,
                            jyusin_fukuyaku_time: " ",
                            iryo_id: 0,
                            iryo_iryohokenid: 0,
                            iryo_iryokigobango: " ",
                            iryo_iryohihoken: 0,
                            iryo_syogaijiritu: 0,
                            iryo_syogaijiritu_kbn: 0,
                            iryo_syogaitokubetu: 0,
                            iryo_syogaisonota: 0,
                            iryo_syogaisonota_biko: " ",
                            iryo_jyukyu_ro_jyukyu: 0,
                            iryo_jyukyu_ro_gengaku: 0,
                            iryo_jyukyu_ro_kenko: 0,
                            iryo_sinsyo_jyukyu: 0,
                            Day_id: 0,
                            Day_kbn: 0,
                            Day_stime: " ",
                            Day_etime: " ",
                            Day_naiyo: " ",
                            week_id: 0,
                            week_kbn: 0,
                            week_weekkbn: 0,
                            week_datlcnt: 0,
                            week_naiyo: " ",
                            biko_lcnt: 0,
                            biko_naiyo: " "
                        };

                        //リストに追加
                        putdata.push(wk_putdata);
                    }


                    //更新登録           
                    putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddataPut = result.icrn_inf;
                        _self.gridSeldataPut = result;
                        this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                        this.dialog_Sort_flg = false;
                    });

                }
                else {
                    this.Message_Dialog("表示順を入力してください。", 0);
                }
            }
            , check_click() {
                document.getElementById("chk_gensyo").style.color = "#000";
                if (document.getElementById("kotei005chk1").checked == true) {
                    document.getElementById("chk_gensyo").style.color = "#0081eb";
                }
            }
            , Chk_insdata: function (row) {
                //未登録チェック
                if (this.inputchk == true) {
                    this.dialo_Yesflg_no = 0;
                    //更新有
                    this.input_chk();

                    let winter = setInterval(() => {
                        if (this.dialo_Yesflg_no == 1 || this.dialo_Yesflg_no == 2) {
                            clearInterval(winter);
                            if (this.dialo_Yesflg_no == 1) {
                                this.BikoData_ins(1);
                            }

                            this.inputchk = false //入力チェックリセット
                            this.$emit('child-datasel', row); //画面更新
                            return false;
                        }
                    }, "interval");

                }
                else {
                    return true;
                }
            }
            , input_chk: function () {
                //入力項目があれば登録メッセージ
                if (this.inputchk == true) {
                    this.Message_Dialog("登録されていない項目があります。\n 登録しますか。", 10);
                }
            }

            , onInitializeIcrnGrid_syuobyo(flexGrid) {
                //傷病名グリッド          
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-headersyobyo'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;
                flexGrid.endUpdate();

                this.flexsyobyo = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_clicksyobyo(e) }.bind(this));
            }
            , grid_clicksyobyo(e) {
                var ht = this.flexsyobyo.hitTest(e);
                if (ht.row >= 0) {
                    this.inputchk = true;
                    this.dispsyobyoid = this.SyobyoList[ht.row].code;
                    this.dispsyobyonm = this.SyobyoList[ht.row].name;
                }
            }
            , syobyo_input() {
                //傷病名の絞込
                let wk_kana = this.dispsyobyo_kana;
                let wk_icd10 = this.dispsyobyo_icd10;
                let wk_list_res = this.SyobyoList.concat();

                if (wk_kana != "") {
                    wk_list_res = wk_list_res.filter(wk_list => wk_list.name.includes(wk_kana));
                }

                if (wk_icd10 != "") {
                    wk_list_res = wk_list_res.filter(wk_list => wk_list.icd10.includes(wk_icd10));
                }

                if (wk_kana == "" && wk_icd10 == "") {
                    wk_list_res = this.SyobyoList_base.concat();
                }
                this.SyobyoList = wk_list_res.concat();

            }

        }
    }

</script>

<style lang="scss">
@import '../assets/scss/common.scss';

.clssheet-chu004 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 750px;

    position: relative;

}

.clsstitle004-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

.wrap004-001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

.area004-001 {
    display: inline-flex;
    margin-left: 228px;
    width: 10px;
    height: 25px;
}

.Gridicrn004-001 {
    margin-top: 10px;
    width: 940px;
    height: 380px;
    border: 1px solid;
    border-color: #8ffd7a !important;
}

.Gridicrn004-001_hyoji {
    margin-top: 10px;
    width: 1010px;
    height: 380px;
    border: 1px solid;
    border-color: #8ffd7a !important;
}

.column-header004 {
    font-size: medium;
    font-weight: normal !important;
    text-align: center !important;
    background-color: #dffae0 !important;
    border-color: #8ffd7a !important;
}

.area004-002 {
    display: inline-flex;
    width: 950px;
    height: 260px;
}

.kotei004title1 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 0px;
    height: 250px;
    width: 90px;
    line-height: 250px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.kotei004inp1 {
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

.area004-003 {
    display: inline-flex;
    width: 10px;
    height: 25px;
}

.clsbtnmenu004-clr {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu004-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu004-ins {
    margin-top: 0px;
    margin-left: 717px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu004-add {
    margin-top: 0px;
    margin-left: 728px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu004-hyoji {
    margin-top: 0px;
    margin-left: 4px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*ダイアログ*/
.wrap003-006 {
    display: inline-flex;
    margin-top: 10px;
    width: 300px;
    height: 25px;
}

.koteititle005-head {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.koteiheadinp005 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 180px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clssheet-head005 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 270px;
    height: 110px;
}

/*データ入力ダイアログ*/
.clssheet-chu005 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 850px;
    height: 460px;
}

.area005-all {
    display: inline-flex;
    width: 840px;
    height: 360px;
    //border: 1px solid;
    //border-color: #7e7e7e;    
}

.area005-left {
    width: 450px;
    height: 360px;
    //border: 1px solid;
    //border-color: #7e7e7e;
}

.area005-right {
    margin-top: 5px;
    width: 390px;
    height: 350px;
    background-color: #7fb9f0;
    border: 1px solid #4396e4;
}

.area005-right001 {
    width: 390px;
    height: 30px;
    display: inline-flex;
}

.lblrightarea {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.textrightarea {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 293px;
    font-size: 16px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.area005-right002 {
    width: 390px;
    height: 30px;
    display: inline-flex;
}

.area005-right003 {
    width: 390px;
    height: 300px;
    display: inline-flex;
}

.Gridsyobyo {
    margin-top: 5px;
    width: 387px !important;
    height: 282px;
    border: 1px solid;
    grid-row: auto;
    border-color: #4396e4 !important;
}

.column-headersyobyo {
    font-size: medium;
    font-weight: normal !important;
    text-align: center;
    background-color: #d6f3fc !important;
    border-color: #4396e4 !important;
}

.area005-001 {
    display: inline-flex;
    width: 940px;
    height: 25px;
}

.kotei005title1 {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 810px;
    height: 25px;
    text-align: center;
}

.area005-002 {
    display: inline-flex;
    margin-top: 10px;
    width: 750px;
    height: 25px;
}

/*発症年月日*/
.area005-003 {
    display: inline-flex;
    margin-top: 10px;
    width: 750px;
    height: 25px;
}

.kotei005title2 {
    background-color: #caf2f5;
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.kotei005inp1 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 180px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*傷病名*/
.area005-004 {
    display: inline-flex;
    margin-top: 5px;
    width: 750px;
    height: 25px;
}

.kotei005title3 {
    background-color: #caf2f5;
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.kotei005inp3 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 90px;
    font-size: 16px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.kotei005inp4 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 238px;
    font-size: 16px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*現症*/
.area005-005 {
    display: inline-flex;
    margin-top: 5px;
    width: 900px;
    height: 25px;
}

.kotei005title4 {
    background-color: #caf2f5;
    font-size: 16px;
    margin-left: 0px;
    height: 30px;
    width: 90px;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.kotei005chk1 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    font-size: 16px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*備考*/
.area005-006 {
    display: inline-flex;
    margin-top: 5px;
    font-size: 16px;
    width: 900px;
    height: 25px;
}

.kotei005title5 {
    background-color: #caf2f5;
    font-size: 16px;
    margin-left: 0px;
    height: 245px;
    width: 90px;
    line-height: 245px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.kotei005inp5 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 245px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    word-wrap: normal;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
}

/*ボタン*/
.area005-007 {
    display: inline-flex;
    margin-top: 5px;
    width: 900px;
    height: 25px;
}

.clsbtnmenu005-clr {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu005-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu005-ins {
    margin-top: 0px;
    margin-left: 613px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu-standard_click005 {
    display: inline-flex;
    border-radius: 4px 4px 4px 4px;
    margin-top: 0px;
    margin-left: 2px;
    font-size: 16px;
    height: 25px !important;
    width: 110px !important;
    background-color: #f3f8c6 !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
    text-align: center !important;
}

.clsbtnmenu-standard_default005 {
    display: inline-flex;
    border-radius: 4px 4px 4px 4px;
    margin-top: 0px;
    margin-left: 2px;
    font-size: 14px !important;
    height: 25px !important;
    width: 110px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
    text-align: center !important;
}

#Gridicrn004-id {
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

    .wj-cells .wj-row:hover .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
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

    .wj-cells .wj-row:hover .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
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

#Gridsyobyo_id {
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

    .wj-cells .wj-row:hover .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
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
.kotei004title_sort {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 980px;
    height: 25px;
    text-align: center;
}

.clssheet004-sort {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 1020px;
    height: 470px;
}

.area-sort {
    display: inline-flex;
    width: 1020px;
    height: 35px;
}

.clsbtnmenu004-clr-sort {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu004-ins-sort {
    margin-top: 0px;
    margin-left: 860px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
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

    .wj-cells .wj-row:hover .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
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

//履歴無しラベル1
.clsstitle1_Noreki_back_004 {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.55);
    height: 750px;
    width: 955px;
    line-height: 955px;
    text-align: center;
}

//履歴無しラベル2
.clsstitle1_Noreki_004 {
    border-radius: 10px 10px 10px 10px;
    bottom: 310px;
    left: 327px;
    position: absolute;
    background-color: #f8f8f8;
    padding-top: 3px;
    font-size: 20px;
    font-weight: normal;
    margin-left: 0px;
    height: 130px;
    width: 290px;
    line-height: 130px;
    text-align: center;
    border: 1px solid;
    border-color: #adadad;
}
</style>

