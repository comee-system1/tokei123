<template>
    <v-sheet class="sheet seikatureki" elevation="2">

        <label class="label noreki_back seikatureki" v-show="Label_Visible">
            <label class="label noreki seikatureki">履歴が未作成です。
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                履歴作成ボタンから作成してください。</label>
        </label>
        <div class="area title">
            <label class="label midashihead title">生活歴</label>
            <v-card class="ml-2 vcard reki" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">履歴作成</a>
            </v-card>

            <kotei_tyosa ref="kotei_tyosa" @set_ymd="monthSelect_tyosa"></kotei_tyosa>

            <v-btn :disabled="Label_Visible == true" class="btn def" style="margin-left: 115px;" @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="btn def" style="margin-left: 4px;" @click="onClickReki">
                履歴参照
            </v-btn>

        </div>
        <br>
        <wj-flex-grid :disabled="Label_Visible == true" id="Gridicrn002-id" class="grid seikatu" style="margin-top: 10px;"
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
        <div class="area">
            <v-btn :disabled="Label_Visible == true" class="btn def" @click="onClick_add">
                新規追加
            </v-btn>

            <label class="label footer" id="footer_002" style="margin-left: 180px;"></label>

            <v-btn :disabled="Label_Visible == true" class="btn def" id="btn_hyoji_002" style="margin-left: 154px;"
                @click="onClickSort">
                表示順変更
            </v-btn>
        </div>


        <!--
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-ins-id" class="clsbtnmenu002-ins"
                @click="onClickIns_reki">
                登 録
            </v-btn>
        -->


        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="400">
            <kotei_rirekiins ref="kotei_rirekiins" @insdata="get_data" @headclose="Click_colse" @inskbn="click_headindkbn"
                @inscopy="click_chkcopy" @inshead="onHead_ins" @monthsel="monthSelect">
            </kotei_rirekiins>
        </v-dialog>


        <!-- 内容ダイアログエリア -->
        <v-dialog v-model="InsWindata" width="760">
            <v-sheet id="naiyo_is002" class="sheet seikatureki win" elevation="2">

                <!--動作が不安定なためコメントアウト
            @mousedown="win_drag_win($event)"
            @mousemove="win_move_win($event)"
            @mouseup="win_up_win($event)"
            style="bottom: 50%;right: 50%;">-->
                <div class="area seikatureki win">
                    <label class="label kotei_wintitle seikatu">生活歴</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="winbtn close ml-1" color="red"
                        @click="Click_colse">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <!--
                <div v-show="false" class="area seikatureki win">
                    <v-btn-toggle color="yellow" v-model="selected_btn" mandatory>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataIns_click">
                            新規追加
                        </v-btn>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataUpd_click">
                            修正登録
                        </v-btn>
                    </v-btn-toggle>
                </div>
                -->

                <div class="area seikatureki win" style="margin-top: 10px;">
                    <label class="label midashi">年月頃</label>
                    <input type="text" class="textbox Short" style="margin-left: 4px;" v-model="dispymdkoro" id="txtymdkoro"
                        @input="text_input(0)" />
                </div>

                <div class="area seikatureki winkeika" style="margin-top: 10px;">
                    <label class="label midashi keika">経過記録</label>
                    <textarea class="textarea keika" v-model="dispkeika" style="margin-left: 4px;" id="txtkeika"
                        @input="initTextarea" no-resize rows="10">
                                                                                        </textarea>
                </div>

                <div class="area seikatureki win">
                    <v-btn class="btn alt" @click="onClickclr">
                        クリア
                    </v-btn>
                    <v-btn class="btn alt" @click="onClickdel" style="margin-left: 4px;">
                        削 除
                    </v-btn>
                    <v-btn class="btn pri" @click="onClickins" style="margin-left: 476px;">
                        登 録
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="380">
            <!--コンポーネント-->
            <kotei_mes ref="kotei_mes" @set_result="onClick_Massege">
            </kotei_mes>
        </v-dialog>

        <!--履歴ダイアログ-->
        <v-dialog v-model="Rirekiwin" width="310">
            <!--コンポーネント-->
            <kotei_rireki :is="kotei_rireki" ref="kotei_rireki" @viewupd="get_data" @rekiclose="Click_colse_Reki"
                @rekidel="onClickdel_reki">
            </kotei_rireki>
        </v-dialog>

        <!-- 表示順ダイアログ  -->
        <v-dialog v-model="dialog_Sort_flg" width="1020">
            <v-sheet id="sort_002id" class="sheet seikatureki sort" elevation="2">
                <!--一旦コメントアウト
            @mousedown="win_drag_sort($event)"
            @mousemove="win_move_sort($event)"
            @mouseup="win_up_sort($event)"
            style="bottom: 50%;right: 50%;"
          -->
                <div class="area seikatureki sort">
                    <label class="label kotei_wintitle sort">表示順変更</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse_sort">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <wj-flex-grid id="Gridicrnsort-id" class="grid sort" :headersVisibility="'Column'"
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

                <div class="area seikatureki sort">
                    <v-btn class="btn alt" @click="onClickclr_sort">
                        クリア
                    </v-btn>
                    <v-btn class="btn pri" style="margin-left: 830px;" @click="onClickins_sort">
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
import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import { postConnect } from '../../../connect/postConnect';
import { putConnect } from '../../../connect/putConnect';
import { getConnect } from '../../../connect/getConnect';
import { deleteConnect } from '../../../connect/deleteConnect';
import sysConst from '../../../utiles/const';
import sysConst_kotei from '../../../utiles/const_kotei';
import { Kotei_Copy_All } from '../../../js/koteiinf/kotei_common';


import kotei_rireki from '../../../components/koteiinf/koteiinf_reki';
import kotei_rirekiins from '../../../components/koteiinf/koteiinf_rekiins';
import kotei_mes from '../../../components/koteiinf/koteiinf_mes';
import kotei_tyosa from '../../../components/koteiinf/koteiinf_ymd';


export default
    {
        components: {
            kotei_rireki
            , kotei_rirekiins
            , kotei_mes
            , kotei_tyosa
        },
        props: ["ymd", "uniqid", "traceid", "jigyoid", "kotei_kbn", "login_siid"],
        data() {
            return {
                str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",

                InsWinflg: false,

                //コンポーネント
                kotei_rireki: 'kotei_rireki', //基本情報用パラメータ

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
                headinskbn: 0, //0:個別1:一括
                inscopykbn: false,
                //ダイアログパラメータ
                dispymdkoro: "",  //年月日頃
                dispkeika: "",    //経過
                dispid: "",       //id
                dispno: "",       //no
                disprekitanto: 0,

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

                /*
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
                */
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
                    jigyoid: this.jigyoid,
                    intcode: this.intcode,
                    kbn: this.kotei_kbn,
                    dataid: this.pdataid,  //データid
                    ymd: this.ymd,         //内容登録
                }


                //前回コピー
                postConnect('/Koteiinf_COPY', params, 'KOTEIINF', putdata).then((result) => {
                    this.Copydata = result.icrn_inf;
                    this.CopySeldata = result;
                    this.get_data(this.pdataid);
                });
            }
            , onClickReki: function () {
                this.Dragflg = false;
                this.Rirekiwin = true;
            },
            onInitializeIcrnGrid(flexGrid) {
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.frozenRows = 0;

                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].max = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'Column std'
                flexGrid.cells.rows.defaultSize = 35;
                flexGrid.alternatingRowStep = 0;

                //イベントの追加
                this.flex = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click(e) }.bind(this));

                flexGrid.endUpdate();
            }
            , get_data(pdataid) {
                //生活歴
                //選択されたデータを持ってくる
                this.pdataid = pdataid; //データidをセット

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

                    pJigyoid: this.jigyoid,
                    Kbn: this.kotei_kbn,             //生活歴
                    Dataid: this.pdataid,
                    Modeflg: sysConst_kotei.GET_KBN_DATA,        //データ取得
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
                                    head_siname: value.head_sryaku,
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

                    //履歴ダイアログにセット
                    let winter = setInterval(() => {
                        if (this.$refs.kotei_rireki != undefined) {
                            clearInterval(winter);
                            this.$refs.kotei_rireki.set_rekidata(this.viewdata_reki);
                        }
                    }, "interval");

                    //クリックイベント
                    if (this.viewdata_reki.length > 0) {
                        this.pdataid = this.viewdata_reki[0].head_dataid;
                        this.get_data(this.pdataid);
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

                let winter = setInterval(() => {
                    //ボタン
                    this.headinskbn = 0;        //0:個別登録 1:一括登録
                    this.inscopykbn = false;    //T:前回コピー
                    if (this.$refs.kotei_rirekiins != undefined) {
                        clearInterval(winter);
                        this.$refs.kotei_rirekiins.init_view(); //画面初期化
                        this.$refs.kotei_rirekiins.set_datainf(this.Ym); //日付セット          
                    }
                });

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
                this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK, 4);
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
                    jigyoid: this.jigyoid,
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

                //入力チェック
                if (this.dispymdkoro.trim() == "") {
                    this.Message_Dialog("年月日を入力してください。", 0);
                }
                else if (this.dispkeika.trim() == "") {
                    this.Message_Dialog("経過記録を入力してください。", 0);
                }
                else {
                    this.Message_Dialog(sysConst.MSG_DATA_INS_CHK, 5);
                }
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
                let wk_dispymdkoro = this.dispymdkoro;
                let wk_naiyo = this.dispkeika;
                let data_siid = this.login_siid;
                let data_insymd = dayjs().format('YYYYMMDD');
                let data_instime = dayjs().format('HH:mm');
                let putdata = [];

                //入力データチェック
                if (wk_dispymdkoro == "") wk_dispymdkoro = " ";

                //パラメータ
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn,
                    intcode: this.intcode,
                    insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
                }


                //登録データ
                let wk_putdata =
                {
                    data_siid: data_siid,
                    data_insymd: data_insymd,
                    data_instime: data_instime,

                    head_jigyoid: this.jigyoid,
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
                    seikatu_ymdkoro: wk_dispymdkoro,
                    seikatu_lcnt: 1,
                    seikatu_naiyo: wk_naiyo,
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
                this.Message_Dialog(sysConst.MSG_REKI_UPD_CHK, 2);
            }

            , onClickdel_reki() {
                //履歴削除ボタン
                this.Message_Dialog(sysConst.MSG_REKI_DEL_CHK, 3);
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
                    jigyoid: this.jigyoid,
                    dataid: this.pdataid,
                    id: 0,
                    lcnt: 1,
                    headflg: sysConst_kotei.DEL_KBN_REKI,
                }

                //削除処理
                deleteConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_REKI_DEL, 0);
                });
            }
            , monthSelect(ymd) {
                this.Ym = ymd;
            }
            , monthSelect_tyosa(Ym, dspymd) {
                this.Ym = Ym   //登録時に使用
                this.pmymd = dspymd;
            }
            , onHead_ins() {
                if (this.insflg == true) {
                    this.Message_Dialog(sysConst.MSG_REKI_INS_CHK, 1);
                }
                else {
                    this.Message_Dialog(sysConst.MSG_REKI_UPD_CHK, 2);
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

                    let wk_insflg = sysConst_kotei.INS_KBN_HEAD;
                    if (this.headinskbn == 1) {
                        wk_insflg = sysConst_kotei.INS_KBN_HEADAll;
                    }
                    params =
                    {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,//生活歴
                        intcode: this.intcode,
                        insflg: wk_insflg, //ヘッダ登録
                    }

                    //登録データ
                    let postdata =
                        [
                            {
                                head_jigyoid: this.jigyoid,
                                head_intcode: this.intcode,
                                head_kbn: this.kotei_kbn,
                                head_dataid: 0,
                                head_mstid: 0,
                                head_mymd: ins_ymd,
                                head_siid: this.disprekitanto,
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

                    if (wk_insflg == sysConst_kotei.INS_KBN_HEADAll) {
                        postConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', postdata).then((result) => {
                            _self.kazoku_res_icrn = result.icrn_inf;
                            _self.kazoku_res = result;
                        });
                        postConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                            _self.syakai_res_icrn = result.icrn_inf;
                            _self.syakai_res = result;
                        });

                    }
                    postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddataPost = result.icrn_inf;
                        _self.gridSeldataPost = result;



                        if (this.inscopykbn == true) {
                            //前回コピーを実施する
                            Kotei_Copy_All(this.uniqid, this.traceid, this.intcode, this.jigyoid, ins_ymd, wk_insflg, sysConst_kotei.KOTEI_ID_KIHON).then();
                        }



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
                        insflg: sysConst_kotei.INS_KBN_HEAD, //ヘッダ登録
                    }


                    //登録データ
                    let putdata =
                        [
                            {
                                head_jigyoid: this.jigyoid,
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
                this.headinskbn = 0;//登録区分初期化
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

                    //日付をセット
                    let winter = setInterval(() => {
                        if (this.$refs.kotei_tyosa != undefined) {
                            clearInterval(winter);
                            this.$refs.kotei_tyosa.set_ymd(this.pmymd, "");
                        }
                    }, "interval");

                    data.sort(function (a, b) {
                        if (a.seikatu_insymd < b.seikatu_insymd) return -1;
                        if (b.seikatu_insymd < a.seikatu_insymd) return 1;
                    });
                    this.viewdata = data.concat();

                    //フッターラベル
                    if (data.length > 0) {
                        //日付順
                        data.sort(function (a, b) {
                            if (b.seikatu_insymd < a.seikatu_insymd) return -1;
                            if (a.seikatu_insymd < b.seikatu_insymd) return 1;
                        });

                        let footer = "(最終登録日 : ";
                        footer = footer + data[0].seikatu_insymd.substring(0, 4)
                            + "年" + data[0].seikatu_insymd.substring(4, 6)
                            + "月" + data[0].seikatu_insymd.substring(6)
                            + "日 ";
                        footer = footer + data[0].seikatu_instime + " ";
                        footer = footer + data[0].seikatu_siname + ")";
                        document.getElementById("footer_002").innerHTML = wjCore.escapeHtml(footer);
                    }

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
                this.Ym = dayjs();  //日付を初期化
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
                this.dialog_Actionflg = kbn;
                this.Btnno_Visible = false;
                if (kbn > 0) this.Btnno_Visible = true;

                //メッセージボックスの表示設定
                let winter = setInterval(() => {
                    if (this.$refs.kotei_mes != undefined) {
                        clearInterval(winter);
                        this.$refs.kotei_mes.set_msginf(this.Btnno_Visible, Message);
                    }
                }, "interval");
                this.dialog_Message_flg = true
            }
            , Chk_Reki: function () {
                //履歴をチェックする

                if (this.Label_Visible == true) {
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
                flexGrid.columnHeaders.rows[0].cssClassAll = 'Column std'
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
                        insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
                    }

                    for (let i = 0; i < wk_viewdata.length; i++) {
                        //登録データ
                        let wk_putdata =
                        {
                            head_jigyoid: this.jigyoid,
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
                    this.Message_Dialog(sysConst.MSG_SORT_CHK, 0);
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
                    this.Message_Dialog(sysConst.MSG_INS_CHK, 8);
                }
            }

            , click_headindkbn(kbn) {
                this.headinskbn = kbn;    //0:個別登録 1:一括登録
                switch (kbn) {
                    case 0:
                        document.getElementById("btn_kbt002").style.backgroundColor = "#fff176";
                        document.getElementById("btn_ikt002").style.backgroundColor = "#ffffff";
                        break;
                    case 1:
                        document.getElementById("btn_kbt002").style.backgroundColor = "#ffffff";
                        document.getElementById("btn_ikt002").style.backgroundColor = "#fff176";
                        break;
                }
            }

            , click_chkcopy(kbn) {
                this.inscopykbn = kbn;    //T:前回コピー
            }

            , set_siid(siid) {
                this.disprekitanto = siid;
            }
        }
    }
</script>

<style  lang="scss">
@import '../../../assets/scss/common.scss';


//グリッド関係
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
</style>


