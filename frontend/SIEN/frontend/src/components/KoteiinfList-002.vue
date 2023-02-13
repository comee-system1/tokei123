<template>
    <v-sheet class="clssheet-chu2" elevation="2">

        <label class="clsstitle1_Noreki_back_002" v-show="Label_Visible">
            <label class="clsstitle1_Noreki_002">履歴を作成してください</label>
        </label>
        <div class="wrap001">
            <label class="clsstitle1">生活歴</label>
            <v-card class="ml-2" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">新規作成</a>
            </v-card>
        </div>

        <label class="clsstitle1_tyosa mt-3" id="Ymd">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

        <v-btn :disabled="Label_Visible == true" id="tyosa_ymd_002" class="btnymd_kotei ml-1"
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

        <div class="area002-001">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" id="clsbtnmenu-copy-002"
                @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" id="clsbtnmenu-reki-002"
                @click="onClickReki">
                履歴参照
            </v-btn>
        </div>
        <br>
        <wj-flex-grid :disabled="Label_Visible == true" id="Gridicrn002-id" class="Gridicrn002-001"
            :headersVisibility="'Column'" :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false"
            :allowPinning="false" :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false"
            :allowDragging="false" :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid"
            :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata" :autoRowHeights="true">

            <!--列-->
            <wj-flex-grid-column header="年月頃" binding="seikatu_ymdkoro" :width="313" :wordWrap=true
                :allowResizing=false></wj-flex-grid-column>
            <wj-flex-grid-column header="経過記録" binding="seikatu_naiyo" :width="613" :wordWrap=true :allowResizing=false
                multiLine="true"></wj-flex-grid-column>
            <wj-flex-grid-column header="" binding="seikatu_id" :width="0" :allowResizing=false></wj-flex-grid-column>

        </wj-flex-grid>
        <div class="area002-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu002-add" @click="onClick_add">
                新規追加
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu002-hyoji" id="btn_hyoji_002"
                @click="onClickSort">
                表示順変更
            </v-btn>
        </div>

        <div class="area002-003">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu002-del" @click="onClickdel_reki">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-ins-id" class="clsbtnmenu002-ins"
                @click="onClickIns_reki">
                登 録
            </v-btn>
        </div>


        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="255">
            <v-sheet class="clssheet-head" elevation="2" id="head_win_002id" @mousedown="win_drag($event)"
                @mousemove="win_move($event)" @mouseup="win_up($event)">
                <div class="areahead">
                    <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
                    <v-btn margin-left=1px elevation="2" icon small top class="closeButton ml-1 mt-1 " color="red"
                        @click="Click_colse_head">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>
                <div class="areahead2">
                    <label class="koteititle-head">作成日</label>

                    <v-btn class="btnymd ml-1" @click="inputCalendarClick(0)" tile outlined width="150px"
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

        <!-- 内容ダイアログエリア -->
        <v-dialog v-model="InsWindata" width="760">
            <v-sheet id="naiyo_is002" class="clssheet-chu3" elevation="2">

                <!--動作が不安定なためコメントアウト
            @mousedown="win_drag_win($event)"
            @mousemove="win_move_win($event)"
            @mouseup="win_up_win($event)"
            style="bottom: 50%;right: 50%;">-->
                <div class="wrap003-001">
                    <label class="kotei003title0">生活歴</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div class="wrap003-002">
                    <v-btn-toggle color="yellow" v-model="selected_btn" mandatory>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataIns_click">
                            新規追加
                        </v-btn>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataUpd_click">
                            修正登録
                        </v-btn>
                    </v-btn-toggle>
                </div>

                <div class="wrap003-003">
                    <label class="kotei003title1">年月頃</label>
                    <input type="text" class="kotei003inp1" v-model="dispymdkoro" id="txtymdkoro"
                        @input="text_input(0)" />
                </div>

                <div class="wrap003-004">
                    <label class="kotei003title2">経過記録</label>
                    <textarea class="kotei003inp2" v-model="dispkeika" id="txtkeika" @input="initTextarea" no-resize
                        rows="10">
            </textarea>
                </div>

                <div class="wrap003-005">
                    <v-btn class="clsbtnmenu003-clr" @click="onClickclr">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu003-del" @click="onClickdel">
                        削 除
                    </v-btn>
                    <v-btn class="clsbtnmenu003-ins" @click="onClickins">
                        登 録
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>

        <!-- 年月日ダイアログ -->
        <v-dialog v-model="datepicker_dialog_head" width="300" class="datepicker_dialogs">
            <v-date-picker id="Datepicker_head" v-model="picker" locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()" @change="monthSelect">
            </v-date-picker>
        </v-dialog>

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="262">
            <v-sheet id="kakunin_id002" class="clssheet-Mes" elevation="2">
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

        <!--履歴ダイアログ-->
        <v-dialog v-model="Rirekiwin" width="210">
            <v-sheet id="rireki_id002" class="clssheet-Reki" elevation="2" @mousedown="win_drag_reki($event)"
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

        <!-- 表示順ダイアログ  -->
        <v-dialog v-model="dialog_Sort_flg" width="1020">
            <v-sheet id="sort_002id" class="clssheet002-sort" elevation="2">
                <!--一旦コメントアウト
            @mousedown="win_drag_sort($event)"
            @mousemove="win_move_sort($event)"
            @mouseup="win_up_sort($event)"
            style="bottom: 50%;right: 50%;"
          -->
                <div class="area-sort">
                    <label class="kotei003title_sort">表示順変更</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse_sort">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <wj-flex-grid id="Gridicrnsort-id" class="Gridicrn002-sort" :headersVisibility="'Column'"
                    :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                    :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                    :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_sort"
                    :itemsSourceChanged="onItemsSourceChanged_sort" :itemsSource="viewdata_sort" :autoRowHeights="true">

                    <!--列-->
                    <wj-flex-grid-column header="年月頃" binding="seikatu_ymdkoro" :width="315"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="経過記録" binding="seikatu_naiyo" :width="615" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="seikatu_id" :width="0"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="表示順" binding="seikatu_no_text" :width="60"
                        :allowResizing=false></wj-flex-grid-column>


                </wj-flex-grid>

                <div class="area-sort">
                    <v-btn class="clsbtnmenu003-clr-sort" @click="onClickclr_sort">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu003-ins-sort" @click="onClickins_sort">
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
import { postConnect } from '../connect/postConnect';
import { putConnect } from '../connect/putConnect';
import { getConnect } from '../connect/getConnect';
import { deleteConnect } from '../connect/deleteConnect';
import sysConst from '../utiles/const';

let INS_KBN_NAIYO = 0;  //登録区分:データ  
let INS_KBN_HEAD = 1;   //登録区分:ヘッダ
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
                picker: '',
                pdataid: '',         //ヘッダデータid
                intcode: 0,          //表示しているintcode
                pmymd: '',           //表示しているMYMD
                pmymd_moto: '',      //表示している元MYMD AAA
                wuniqid: "",
                wtraceid: "",
                griddata: [],          //API取得データ
                gridSeldata: [],       //API取得データ(履歴)
                GetViewDataInf: [],    //API取得データ(データ)

                gridSeldataPost: [],
                gridSeldataPut: [],
                gridSeldatadel: [],
                griddataPost: [],
                griddataPut: [],
                griddatadel: [],
                Copydata: [],
                CopySeldata: [],

                viewdata: [],       //グリッド表示データ
                viewdata_reki: [],       //履歴グリッド表示データ

                //ダイアログ表示用引数
                selected_btn: 0,
                InsWinhead: false,
                InsWindata: false,
                Rirekiwin: false,
                dispymdhead: "",
                datepicker_dialog_head: false,
                datepicker_dialog_tyosa: false, //調査日カレンダー
                //ダイアログパラメータ
                dispymdkoro: "",  //年月日頃
                dispkeika: "",    //経過
                dispid: "",       //id
                dispno: "",       //no

                //確認ダイアログ
                dialog_Message_flg: false,
                Dialog_Message: '',       //ダイアログメッセージ
                dialo_Yesflg: false,      //ダイアログ結果
                dialo_Yesflg_no: 0,
                Btnno_Visible: false,     //「いいえ」ボタン表示設定   

                //1:履歴の新規登録
                //2:履歴の更新登録
                //3:履歴の削除
                //4:データ削除
                //5;データ登録
                //6:前回コピー
                dialog_Actionflg: 0,

                //データ登録ダイアログ
                insdataflg: false,  //F:新規 T:更新

                //前回コピー用変数
                Copy_dataid: 0, //コピー元データid

                //表示順ダイアログ
                dialog_Sort_flg: false,
                sort_no: 1,
                viewdata_sort: [],

                //履歴作成アナウンス
                Label_Visible: false,

                //入力チェック
                inputchk: false,

            };
        },
        components:
        {
        },
        methods: {

            //####モーダルイベントエリア####
            //#####新規履歴#####
            win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_002id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_002id");
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
                var wdialog = document.getElementById("sort_002id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 482) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 1020) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_sort: function (e) {
                //表示順

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("sort_002id");
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
                var wdialog = document.getElementById("naiyo_is002");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 360) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 760) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_win: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("naiyo_is002");
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
                var wdialog = document.getElementById("kakunin_id002");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_Msg: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("kakunin_id002");
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
                var wdialog = document.getElementById("rireki_id002");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 210) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 280) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_reki: function (e) {
                //履歴参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("rireki_id002");
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

                let textarea = document.getElementById("txtkeika");
                let rowcnt = textarea.value.split("\n");

                this.active = true;

                //文字数制御
                if (textarea.value.length > 400) //100文字
                {
                    this.dispkeika = textarea.value.substring(0, 400);
                }

                //行数制御
                if (rowcnt.length > 10) {
                    var result = "";
                    for (var i = 0; i < 10; i++) {
                        result += rowcnt[i] + "\n";
                    }
                    textarea.value = result;
                }
            },

            text_input(kbn) {
                //文字数制限とかやる
                this.inputchk = true;

                switch (kbn) {
                    case 0://年月頃
                        {
                            let textarea = document.getElementById("txtymdkoro");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispymdkoro = textarea.value.substring(0, 20);
                            }
                        }
                        break;
                }
            },

            //カレンダー
            getYm() {
                if (!this.Ym) {
                    this.Ym = dayjs();
                    this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
                }
                return (
                    this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
                );
            },
            onClickCopy() {
                //前回コピーボタン押下時
                this.Dragflg = false;
                this.Message_Dialog(sysConst.MSG_COPY_CHK, 6);
            }
            , DataCopy: function () {
                //前回コピー処理
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
            , onClickReki: function () {
                this.Dragflg = false;
                this.Rirekiwin = true;
            },
            onInitializeIcrnGrid(flexGrid) {
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn001";
                // ヘッダの追加と設定
                flexGrid.frozenRows = 0;

                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].max = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header'
                flexGrid.cells.rows.defaultSize = 35;
                flexGrid.alternatingRowStep = 0;

                //イベントの追加
                this.flex = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click(e) }.bind(this));

                flexGrid.endUpdate();
            }
            , get_data() {
                //生活歴

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
                    Kbn: this.kotei_kbn,             //生活歴
                    Dataid: this.pdataid,
                    Modeflg: GET_KBN_DATA,        //データ取得
                };

                getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
                    _self.GetViewDataInf = result;
                    this.inputchk = false;                //入力フラグを戻す
                    this.DataFilter2();
                })
            }

            //フィルター
            , DataFilter() {
                let data = [];
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.gridSeldata.icrn_inf != null) {
                    //生活歴のデータのみに絞る
                    this.gridSeldata.icrn_inf.forEach(function (value) {

                        //区分が生活歴
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

                            //生活歴ヘッダの内容を取得
                            value.naiyo.forEach(function (value2) {
                                data.push(value2);

                            });
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
            , onItemsSourceChanged(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            }
            , grid_click(e) {
                if (this.Chk_Reki() == true) {
                    var ht = this.flex.hitTest(e);
                    //グリッドがクリックされた場合ウィンドウを表示する
                    if (ht.row >= 0) {
                        this.dispymdkoro = this.viewdata[ht.row].seikatu_ymdkoro;
                        this.dispkeika = this.viewdata[ht.row].seikatu_naiyo;
                        this.dispid = this.viewdata[ht.row].seikatu_id;
                        this.dispno = this.viewdata[ht.row].seikatu_no;
                        this.selected_btn = 1; //更新
                        this.insdataflg = true;
                    }
                    else {
                        this.dispymdkoro = " ";
                        this.dispkeika = " ";
                        this.dispid = 0;
                        this.dispno = 0;
                        this.selected_btn = 0; //更新
                        this.insdataflg = false;
                    }

                    this.InsWindata = true;
                }
            }
            , onClick_add() {
                //新規追加クリック
                this.dispymdkoro = " ";
                this.dispkeika = " ";
                this.dispid = 0;
                this.dispno = 0;
                this.selected_btn = 0; //更新
                this.insdataflg = false;
                this.InsWindata = true;
            }
            , dialog_close() {
                this.InsWindata = false;
            }
            , onHeadclick_ins() {
                this.Ym = dayjs();
                this.dispymdhead = this.getYm();

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
                this.dispymdhead = this.getYm();

                this.InsWinhead = true;
                this.insflg = false;//更新登録
            }
            , Click_colse() {
                //データウィンドウ
                this.InsWindata = false;
            }
            , Click_colse_head() {
                //ヘッダウィンドウ
                this.InsWinhead = false;
            }
            , Click_colse_Reki() {
                //履歴ウィンドウ
                this.Rirekiwin = false;
            }
            , onDataIns_click() {
                //データダイアログ 新規
                this.insdataflg = false;
            }
            , onDataUpd_click() {
                //データダイアログ 更新
                this.insdataflg = true;
            }
            , onClickclr() {
                //データダイアログ クリア
                this.dispkeika = "";
                this.dispymdkoro = "";
            }
            , onClickdel() {
                //データ削除ボタン
                this.Message_Dialog("入力データを削除します。\nよろしいですか。", 4);
            }

            , delinput_data() {
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
            , splitNaiyo: function (str, size) {
                //文字分割用メソッド

                let strlen = Math.ceil(str.length / size);
                let array = [];

                for (let i = 0, x = 0; i < strlen; ++i, x += size) {
                    array[i] = str.substr(x, size)
                }

                return array;

            }
            , onClickins() {
                //データ登録ボタン
                this.Message_Dialog("入力データを登録します。\nよろしいですか。", 5);
            }

            , insinput_data() {

                //#####ヘッダの更新処理
                /*
                this.insflg = false;
                if(this.pmymd != this.pmymd_moto)
                {
                  this.Head_insData();
                }
                */

                //データダイアログ 登録          
                let wk_naiyo = this.splitNaiyo(this.dispkeika, 256);
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

                for (let i = 0; i < wk_naiyo.length; i++) {
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
                        seikatu_id: this.dispid,
                        seikatu_no: this.dispno,
                        seikatu_ymdkoro: this.dispymdkoro,
                        seikatu_lcnt: i + 1,
                        seikatu_naiyo: wk_naiyo[i],
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
                    };

                    //リストに追加
                    putdata.push(wk_putdata);
                }

                if (this.insdataflg == false) {
                    //新規登録
                    postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddataPost = result.icrn_inf;
                        _self.gridSeldataPost = result;
                        this.View_upd(this.intcode);
                        //this.Message_Dialog(sysConst.MSG_DATA_INS,0);
                        this.InsWindata = false;
                    });
                }
                else {
                    //更新登録
                    putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddataPut = result.icrn_inf;
                        _self.gridSeldataPut = result;
                        this.View_upd(this.intcode);
                        //this.Message_Dialog(sysConst.MSG_DATA_INS,0);
                        this.InsWindata = false;
                    });
                }
            }
            , onClickIns_reki() {
                //履歴更新ボタン
                this.insflg = false;
                this.Message_Dialog("履歴を更新登録します。\nよろしいですか。", 2);
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
            , inputCalendarClick(kbn) {
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
            , onHead_ins() {

                if (this.insflg == true) {
                    this.Message_Dialog("履歴を新規登録します。\nよろしいですか。", 1);
                }
                else {
                    this.Message_Dialog("履歴を更新登録します。\nよろしいですか。", 2);
                }
            }

            , Head_insdata(kbn) {
                //kbn:1リロードしない

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
                        kbn: this.kotei_kbn,//生活歴
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
                        kbn: this.kotei_kbn,//生活歴
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
                                    this.insflg = false
                                    this.Head_insdata(1);
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
                        this.inputchk = false;
                        this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                        this.get_data();
                    }

                }
            }
            //画面更新
            , DataFilter2() {
                let data = [];
                let wdataid = this.pdataid;
                let wk_Ymd = "";

                if (this.GetViewDataInf.icrn_inf != null) {
                    //生活歴のデータのみに絞る
                    this.GetViewDataInf.icrn_inf.forEach(function (value) {

                        //区分が生活歴
                        if (value.head_kbn == 2 && value.head_dataid == wdataid) {

                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",

                                //生活歴ヘッダの内容を取得
                                value.naiyo.forEach(function (value2) {
                                    data.push(value2);
                                });
                        }
                    });

                    this.str_ymd = wk_Ymd;
                    this.pmymd = this.str_ymd;
                    this.pmymd_moto = this.str_ymd;
                    data.sort(function (a, b) {
                        if (a.seikatu_no < b.seikatu_no) return -1;
                        if (b.seikatu_no < a.seikatu_no) return 1;
                    });
                    this.viewdata = data.concat();
                }

            }
            , onClick_Massege(kbn) {
                //確認ダイアログ判定
                if (kbn == 0) {
                    this.dialo_Yesflg = true;
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
                    else if (this.dialog_Actionflg == 0) {
                        //汎用メッセージ
                        this.Btnno_Visible = true;
                    }
                    else if (this.dialog_Actionflg == 7) {
                        //履歴チェック
                        this.InsWinhead = true;
                    }
                    else if (this.dialog_Actionflg == 8) {
                        //画面移動チェック
                        this.dialog_Message_flg = false;
                    }

                }
                else {
                    this.dialo_Yesflg = false;
                    this.dialo_Yesflg_no = 2;
                }

                this.dialog_Message_flg = false;
            }
            , setUserData(wintcode, wSeldata) {
                //利用者選択データ受け取り
                this.pdataid = 0; //初期化
                this.viewClear();
                this.GetViewDataInf = [];
                this.gridSeldata = wSeldata;
                this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
                this.intcode = wintcode;          //利用者コード
                this.DataFilter();

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
            }
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
                this.inputchk = false;                //入力フラグを戻す
            }
            , Message_Dialog(Message, kbn) {
                //汎用メッセージダイアログ
                this.Dragflg = false;
                this.Dialog_Message = Message;
                this.dialog_Actionflg = kbn;  //メッセージのみ
                this.Btnno_Visible = false;
                if (kbn > 0) this.Btnno_Visible = true;
                this.dialog_Message_flg = true
            }
            , Message_Dialog_RekiChk(Message) {
                //汎用メッセージダイアログ
                this.Dialog_Message = Message;
                this.dialog_Actionflg = 7;  //メッセージのみ
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
                this.Chk_Reki();
            }

            //表示順ダイアログ
            , onInitializeIcrnGrid_sort(flexGrid) {
                flexGrid.beginUpdate();
                //flexGrid.cssClassAll = "Gridicrn001";
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
                    if (ht.col == 3) {
                        //表示順の列
                        if (this.viewdata_sort[ht.row].seikatu_no_text == "") {
                            this.viewdata_sort[ht.row].seikatu_no_text = this.sort_no;
                            this.sort_no = this.sort_no + 1;
                            this.flex3.endUpdate();
                        }
                        else {
                            if (this.viewdata_sort[ht.row].seikatu_no_text == (this.sort_no - 1)) {
                                this.viewdata_sort[ht.row].seikatu_no_text = "";
                                this.sort_no = this.sort_no - 1;
                                this.flex3.endUpdate();
                            }

                        }
                    }
                }
            }
            , onClickSort() {
                //表示順変更画面
                this.Dragflg = false;
                let wk_viewdata_sort = [];
                let wk_viewdata_sort_list = [];

                //表示グリッドのデータセット
                this.viewdata.forEach(function (value) {
                    wk_viewdata_sort = {
                        seikatu_id: value.seikatu_id,
                        seikatu_no: value.seikatu_no,
                        seikatu_no_text: "",
                        seikatu_ymdkoro: value.seikatu_ymdkoro,
                        seikatu_lcnt: value.seikatu_lcnt,
                        seikatu_naiyo: value.seikatu_naiyo,
                    }
                    wk_viewdata_sort_list.push(wk_viewdata_sort);
                }
                );

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
                        seikatu_id: value.seikatu_id,
                        seikatu_no: value.seikatu_no,
                        seikatu_no_text: "",
                        seikatu_ymdkoro: value.seikatu_ymdkoro,
                        seikatu_lcnt: value.seikatu_lcnt,
                        seikatu_naiyo: value.seikatu_naiyo,
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
                    if (this.viewdata_sort[i].seikatu_no_text == "") {
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
                        let wk_id = value.seikatu_id;
                        let wk_no = value.seikatu_no_text;

                        for (let i = 0; i < wk_viewdata.length; i++) {
                            if (wk_viewdata[i].seikatu_id == wk_id) {
                                wk_viewdata[i].seikatu_no = wk_no;
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
                            seikatu_id: wk_viewdata[i].seikatu_id,
                            seikatu_no: wk_viewdata[i].seikatu_no,
                            seikatu_ymdkoro: wk_viewdata[i].seikatu_ymdkoro,
                            seikatu_lcnt: wk_viewdata[i].seikatu_lcnt,
                            seikatu_naiyo: wk_viewdata[i].seikatu_naiyo,
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
                                this.insflg = false
                                this.Head_insdata(1);
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
                    this.Message_Dialog("登録されていない項目があります。\n 登録しますか。", 8);
                }
            }
        }
    }
</script>

<style  lang="scss">
@import '../assets/scss/common.scss';

.clssheet-chu2 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 520px;

    position: relative;
}

.clsstitle1 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

.clsstitle-standard {
    background-color: #ffffff;
    font-size: 16px;
    color: #1d5c81;
    margin-top: 2px;
    margin-left: 10px;
    text-align: center;
}

.clsbtnmenu-copy {
    margin-top: 0px;
    margin-left: 2px;
    left: -190px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu-reki {
    margin-top: 0px;
    margin-left: 2px;
    left: -190px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.area002-001 {
    display: inline-flex;
    margin-left: 228px;
    width: 10px;
    height: 25px;
}

.wrap001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

.Gridicrn002-001 {
    font-size: 15px;
    margin-top: 10px;
    width: 945px;
    height: 400px;
    border: 1px solid;
    border-color: #8ffd7a !important;
}

.column-header {
    font-size: 15px;
    font-weight: normal !important;
    text-align: center !important;
    background-color: #dffae0 !important;
    border-color: #8ffd7a !important;
}

.area002-002 {
    display: inline-flex;
    width: 900px;
    height: 30px;
}

.clsbtnmenu002-add {
    margin-top: 0px;
    margin-left: 732px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu002-hyoji {
    margin-top: 0px;
    margin-left: 5px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.area002-003 {
    display: inline-flex;
    margin-top: 5px;
    width: 900px;
    height: 30px;
}

.clsbtnmenu002-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu002-ins {
    margin-top: 0px;
    margin-left: 799px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}


//#####新規登録ダイアログ#####
.clssheet-chu3 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 760px;
    height: 360px;
}

.kotei003title0 {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 718px;
    height: 25px;
    text-align: center;
}

.wrap003-001 {
    display: inline-flex;
    margin-top: 0px;
    width: 760px;
    height: 25px;
}

.wrap003-002 {
    display: inline-flex;
    margin-top: 10px;
    width: 760px;
    height: 25px;
    text-align: center !important;
}

.wrap003-003 {
    display: inline-flex;
    margin-top: 10px;
    width: 760;
    height: 25px;
}

.wrap003-004 {
    display: inline-flex;
    margin-top: 10px;
    width: 760px;
    height: 210px;
}

.wrap003-005 {
    display: inline-flex;
    width: 760px;
    height: 50px;
}

.kotei003title1 {
    //年月頃
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

.kotei003inp1 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 325px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.kotei003title2 {
    //経過記録
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 0px;
    height: 200px;
    width: 90px;
    line-height: 200px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.kotei003inp2 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 650px;
    height: 200px;
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

.clsbtnmenu003-clr {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu003-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu003-ins {
    margin-top: 0px;
    margin-left: 516px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu-standard_click {
    display: inline-flex;
    border-radius: 4px 4px 4px 4px;
    margin-top: 0px;
    margin-left: 2px;
    font-size: 14px;
    height: 25px !important;
    width: 110px !important;
    background-color: #f3f8c6 !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
    text-align: center !important;
}

.clsbtnmenu-standard_default {
    display: inline-flex;
    border-radius: 4px 4px 4px 4px;
    margin-top: 0px;
    margin-left: 2px;
    font-size: 14px !important;
    height: 25px !important;
    width: 100px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5 !important;
    text-align: center !important;
}

//ダイアログ
.wrap003-006 {
    display: inline-flex;
    margin-top: 10px;
    width: 300px;
    height: 25px;
}

.koteititle003-head {
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

.koteiheadinp003 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 180px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clssheet-head003 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 270px;
    height: 110px;
}

//グリッド関係？
#Gridicrn002-id {
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

    /*
    .wj-cell:not(.wj-header) {
      background: $grid_background;
    }
    */

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

    /*
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: $light-gray;
      border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: $brawn;
      border-radius: 0px;
    }
    */
}

//#####表示順変更ダイアログ#####
.kotei003title_sort {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 980px;
    height: 25px;
    text-align: center;
}

.clssheet002-sort {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 1020px;
    height: 482px;
}

.area-sort {
    display: inline-flex;
    width: 1020px;
    height: 35px;
}

.Gridicrn002-sort {
    font-size: 15px;
    margin-top: 5px;
    width: 1010px;
    height: 400px;
    border: 1px solid;
    border-color: #8ffd7a !important;
}

.clsbtnmenu003-clr-sort {
    margin-top: 0px;
    margin-left: 1px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu003-ins-sort {
    margin-top: 0px;
    margin-left: 855px;
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
.clsstitle1_Noreki_back_002 {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.55);
    height: 480px;
    width: 955px;
    line-height: 955px;
    text-align: center;
}

//履歴無しラベル2
.clsstitle1_Noreki_002 {
    border-radius: 10px 10px 10px 10px;
    bottom: 175px;
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


