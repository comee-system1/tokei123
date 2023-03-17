<template>
    <v-sheet class="sheet kihon" elevation="2">

        <label class="label noreki_back kihon" v-show="Label_Visible">
            <label class="label noreki kihon">履歴が未作成です。
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                履歴作成ボタンから作成してください。</label>
        </label>

        <div class="area title">
            <label class="label midashihead title">基本情報</label>
            <v-card class="ml-2 vcard reki" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">履歴作成</a>
            </v-card>

            <kotei_tyosa ref="kotei_tyosa" @set_ymd="monthSelect_tyosa"></kotei_tyosa>

            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-copy-id" class="btn def" style="margin-left: 115px;"
                @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-reki-id" class="btn def" style="margin-left: 4px;"
                @click="onClickReki">
                履歴参照
            </v-btn>

        </div>

        <br>
        <div class="area">
            <label class="label midashi">氏 名</label>
            <label class="label kmk" id="lblRiyonm" style="width: 235px; margin-left: 3px;"></label>
            <label class="label midashi" style="margin-left: 4px; ">生年月日</label>
            <label class="label kmk" id="lblBirth" style="width: 146px; margin-left: 3px;"></label>
            <label class="label midashi" style="margin-left: 4px;">年 齢</label>
            <label class="label kmk" id="lblAge" style="width: 96px;margin-left: 3px; "></label>
            <label class="label midashi" style="margin-left: 4px;">性 別</label>
            <label class="label kmk" id="lblSex" style="width: 81px;margin-left: 3px;"></label>
        </div>
        <div class="area wrap" style="margin-top: 4px;">
            <label class="label midashi wrap">住 所</label>
            <label class="label kmk" id="lbladress" style="width: 479px; height: 50px; margin-left: 3px;"></label>
            <div style="margin-left: 3px;">
                <div class="area wrap_naiyo">
                    <label class="label midashi tell">電話①</label>
                    <label class="label kmk" id="tel1" style="width: 274px; margin-left: 3px;"></label>
                </div>
                <br>
                <div class="area wrap_naiyo">
                    <label class="label midashi tell">電話②</label>
                    <label class="label kmk" id="tel2" style="width: 274px; margin-left: 3px;"></label>
                </div>
            </div>
        </div>
        <div class="area" style="margin-top: 4px; ">
            <label class="label midashi">ﾒｰﾙｱﾄﾞﾚｽ</label>
            <input type="text" id="clslbl20_id" class="textbox Long" v-model="dispMail" style="margin-left: 3px;"
                @input="text_input(0)" @click="click_text" />
            <label class="label midashi" style="margin-left: 3px;">携帯番号</label>
            <input type="text" id="clslbl21_id" class="textbox Short" v-model="dispPhoneNo" style="margin-left: 3px;"
                @input="text_input(1)" @click="click_text" />
        </div>
        <div class="area" style="margin-top: 4px; ">
            <label class="label midashi">携帯ﾒｰﾙ</label>
            <input type="text" id="clslbl30_id" class="textbox Long" v-model="dispKMail" style="margin-left: 3px;"
                @input="text_input(2)" @click="click_text" />
            <label class="label midashi" style="margin-left: 3px;">FAX番号</label>
            <input type="text" id="clslbl31_id" class="textbox Short" v-model="dispFaxNo" style="margin-left: 3px;"
                @input="text_input(3)" @click="click_text" />
        </div>
        <br>
        <hr class="hr_style01" style="margin-top: 8px;">
        <div class="area wrap3">
            <label class="label midashi line3" style="margin-top: 3px;">障害区分</label>
            <div class="area wrap3" style="width: 302px;">

                <input type="text" class="textbox Short" style="margin-top: 4px; margin-left: 4px;" v-model="dispSkbn1"
                    @click="onTxtSyogai_Click(1)" readonly />
                <input type="text" class="textbox Short" style="margin-top: 4px; margin-left: 4px;" v-model="dispSkbn2"
                    @click="onTxtSyogai_Click(2)" readonly />
                <input type="text" class="textbox Short" style="margin-top: 4px; margin-left: 4px;" v-model="dispSkbn3"
                    @click="onTxtSyogai_Click(3)" readonly />

            </div>
            <div class="area wrap3" style="width: 90px;">
                <input class="chkbox" style="margin-top: 6px; margin-left: 3px;" type="checkbox" name="Nm_chk40"
                    id="Id_chk40" @click="check_click(0)">
                <label style="font-size: 14px; margin-top: 10px; margin-left: 3px;" for="scalses1"
                    id="Id_chk40_text">集計対象</label>
                <input class="chkbox" style="margin-top: 6px; margin-left: 3px;" type="checkbox" name="Nm_chk41"
                    id="Id_chk41" @click="check_click(1)">
                <label style="font-size: 14px; margin-top: 10px; margin-left: 3px;" for="scalses2"
                    id="Id_chk41_text">集計対象</label>
                <input class="chkbox" style="margin-top: 6px; margin-left: 3px;" type="checkbox" name="Nm_chk42"
                    id="Id_chk42" @click="check_click(2)">
                <label style="font-size: 14px; margin-top: 10px; margin-left: 3px;" for="scalses3"
                    id="Id_chk42_text">集計対象</label>
            </div>
            <!--<div v-show="Grid_Visible" class="area grid" style="margin-left: 62px;">-->
            <wj-flex-grid v-show="Grid_Visible" id="GridMst_id" class="grid mst" style="margin-left: 68px;margin-top: 3px;"
                :headersVisibility="'Column'" :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false"
                :allowPinning="false" :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false"
                :allowDragging="false" :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_Mst"
                :itemsSourceChanged="onItemsSourceChanged_Mst" :itemsSource="MstList">
                <!--列-->
                <wj-flex-grid-column header="" binding="name" :width="170" :wordWrap=true :allowResizing=false
                    id="MstGrid_col1"></wj-flex-grid-column>
                <wj-flex-grid-column header="" binding="id" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="" binding="value" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
            </wj-flex-grid>
            <!--</div>-->

        </div>
        <br>
        <div class="area" style="margin-top:17px;">
            <label class="label midashi">世帯の状況</label>
            <input type="text" class="textbox Short" v-model="dispSetai" style="margin-left: 4px;" @click="onTxtSetai_Click"
                readonly />
        </div>
        <br>
        <div class="area" style="margin-top:4px;">
            <label class="label midashi">本人の状況</label>
            <input type="text" class="textbox Short" v-model="dispHonnin" style="margin-left: 4px;"
                @click="onTxtHonnin_Click" readonly />
        </div>
        <br>
        <div class="area" style="margin-top:4px;">
            <label class="label midashi line3">特記事項</label>
            <textarea id="textarea" class="textarea" v-model="dispTok" @click="click_text" @input="initTextarea"
                style="margin-left:4px" no-resize rows="4">
                                                                                                                                                                                                            </textarea>
        </div>
        <br>
        <div class="area" style="margin-top: 56px;">
            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-del-id" class="btn alt" @click="onClickdel">
                削 除
            </v-btn>

            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-clr-id" class="btn def" style="margin-left: 4px;"
                @click="onClickclr">
                クリア
            </v-btn>

            <label class="label footer" id="footer_001" style="margin-left: 90px;"></label>

            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-ins-id" class="btn pri" style="margin-left: 148px;"
                @click="onClickIns">
                登 録
            </v-btn>
        </div>
        <br>

        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="400">
            <kotei_rirekiins ref="kotei_rirekiins" @insdata="get_data" @headclose="Click_colse" @inskbn="click_headindkbn"
                @inscopy="click_chkcopy" @inshead="onHead_ins" @monthsel="monthSelect">
            </kotei_rirekiins>
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
            <kotei_rireki ref="kotei_rireki" @viewupd="get_data" @rekiclose="Click_colse_Reki" @rekidel="onClickdel">
            </kotei_rireki>
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
import { getConnect } from '../../../connect/getConnect';
import { postConnect } from '../../../connect/postConnect';
import { putConnect } from '../../../connect/putConnect';
import { deleteConnect } from '../../../connect/deleteConnect';
import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '../../../utiles/const';
import sysConst_kotei from '../../../utiles/const_kotei';
import { Kotei_Copy_All } from '../../../js/koteiinf/kotei_common';

import kotei_rireki from '../../../components/koteiinf/koteiinf_reki';
import kotei_rirekiins from '../../../components/koteiinf/koteiinf_rekiins';
import kotei_mes from '../../../components/koteiinf/koteiinf_mes';
import kotei_tyosa from '../../../components/koteiinf/koteiinf_ymd';

const EnumMstkbn = {
    syogai1: 1,
    syogai2: 2,
    syogai3: 3,
    setai: 4,
    honnin: 5,
}

const EnumMsgAction = {
    massage: 0,
    reki_ins: 1,
    reki_upd: 2,
    reki_del: 3,
    data_del: 4,
    data_ins: 5,
    data_copy: 6,
    reki_chk: 7,
    reki_move: 8,
}

export default {
    components: {
        kotei_rireki
        , kotei_rirekiins
        , kotei_mes
        , kotei_tyosa
    },
    props: ["ymd", "uniqid", "traceid", "jigyoid", "kotei_kbn", "login_siid"],
    data() {
        return {
            //入力チェック
            inputchk: false,

            //データ取得用配列
            Get_setaiSelinf: this.get_inputdata(),  //世帯情報
            Get_honninSelinf: [],                   //本人情報
            Get_syogaikbnSelinf: [],                //障害区分
            Copydata: [],
            MstList: [],
            Grid_Visible: false, //マスタグリッドの表示切替
            Mstflg: 0,           //EnumMstkbn: 1:障害1 2:障害2 3:障害3 4:世帯 5:本人マスタグリッド表示フラグ
            GetKihonSelInf: [],  //API取得データ(履歴)
            GetViewDataInf: [],  //API取得データ(データ)
            tokflg: false,       //特記フラグ T:登録有 F:なし
            dataflg: false,      //データフラグ T:登録有 F:なし
            Ym: '',             //表示されているデータの日付
            picker: '',         //日付操作用変数

            //【新規登録ウィンドウ】
            InsWinhead: false,  //新規登録ウィンドウの表示フラグ
            headinskbn: 0,      //0:個別登録 1:一括登録
            inscopykbn: false,  //前回コピーチェック
            insflg: true,   //履歴登録フラグT:新規 F:更新

            //【履歴参照ウィンドウ】
            Rirekiwin: false,   //履歴参照ウィンドウの表示フラグ
            viewdata: [],       //履歴グリッド表示データ        


            //表示項目
            dispMail: '',      //メールアドレス
            dispKMail: '',     //携帯アドレス
            dispPhoneNo: '',   //携帯番号
            dispFaxNo: '',     //FAX番号
            dispSetai: '',      //世帯の状況
            dispHonnin: '',     //本人の状況
            dispSetai_id: 0,      //世帯の状況
            dispHonnin_id: 0,     //本人の状況        
            dispTok: '',       //特記事項
            disprekitanto: 0,    //履歴の担当者
            dispSkbn1: '',     //障害区分1
            dispSkbn1_id: 0,  //障害区分1
            dispSkbn2: '',     //障害区分2
            dispSkbn2_id: 0,  //障害区分2
            dispSkbn3: '',     //障害区分3
            dispSkbn3_id: 0,  //障害区分3

            pdataid: '',         //表示しているDATAID
            pmymd: '',              //表示している日付(yyyy年mm月dd日形式)
            pmymd_moto: '',     //表示している元MYMD
            intcode: 0,         //表示しているintcode

            //【確認ダイアログ】
            dialog_Message_flg: false,
            dialo_Yesflg_no: false,      //ダイアログ結果No 1:Yse 2:No
            Btnno_Visible: false,     //「いいえ」ボタン表示設定      
            dialog_Actionflg: 0,    //EnumMsgAction参照

            //履歴作成アナウンス
            Label_Visible: false,

            //dragflg
            Dragflg: false,
            mouseX: 0,
            mouseY: 0,
            screenX: 0,
            screenY: 0,
            moveX: 0,
            moveY: 0

        };
    },
    methods: {
        win_drag: function (e) {
            //ドラッグ
            this.Dragflg = true;
            this.mouseX = e.screenX;
            this.mouseY = e.screenY;
            var wdialog = document.getElementById("head_win_id");
            if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
            if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

            this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
            this.screenX = parseInt(wdialog.style.right.replace("px", ""));
        },
        win_move: function (e) {
            //ドラッグ

            if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                var wdialog = document.getElementById("head_win_id");
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

        win_drag_All: function (e) {
            //ドラッグ
            this.Dragflg = true;
            this.mouseX = e.screenX;
            this.mouseY = e.screenY;
            var wdialog = document.getElementById("kakunin_id");

            if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
            if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";

            this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
            this.screenX = parseInt(wdialog.style.right.replace("px", ""));
        },
        win_move_All: function (e) {
            //ドラッグ

            if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                var wdialog = document.getElementById("kakunin_id");
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
        win_up_All: function () {
            //ドラッグ
            this.Dragflg = false;
        },

        win_drag_reki: function (e) {
            //履歴参照ドラッグ
            this.Dragflg = true;
            this.mouseX = e.screenX;
            this.mouseY = e.screenY;
            var wdialog = document.getElementById("rireki_id");
            if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 210) / 2 + "px";
            if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 280) / 2 + "px";
            this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
            this.screenX = parseInt(wdialog.style.right.replace("px", ""));
        },
        win_move_reki: function (e) {
            //履歴参照ドラッグ

            if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                var wdialog = document.getElementById("rireki_id");
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
            if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";
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

        initTextarea() {

            let textarea = document.getElementById("textarea");
            let rowcnt = textarea.value.split("\n");

            //文字数制御
            if (textarea.value.length > 100) //100文字
            {
                textarea.value = textarea.value.substring(0, 100);
            }

            //行数制御
            if (rowcnt.length > 4) {
                var result = "";
                for (var i = 0; i < 4; i++) {
                    result += rowcnt[i] + "\n";
                }
                textarea.value = result;
            }
        },
        get_inputdata() {
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
            getConnect('/Setaijyokyo', params, 'KOTEIINF').then((result) => {
                _self.Get_setaiSelinf = result;
                this.DspSetaiInput();
            });

            //本人の状況
            getConnect('/Honninjyokyo', params, 'KOTEIINF').then((result) => {
                _self.Get_honninSelinf = result;
                this.DspHonninInput();
            });

            //障害区分
            getConnect('/Syogaikbn', params, 'KOTEIINF').then((result) => {
                _self.Get_syogaikbnSelinf = result;
                this.DspSyogaiInput();
            });
        }
        , DspSetaiInput() {
            //#####世帯の状況の画面表示を行う#####

            let wk_setai_data = [];
            let setai_data = [];
            //世帯状況
            wk_setai_data =
            {
                id: 0,
                name: "(クリア)",
                value: " ",
            }
            setai_data.push(wk_setai_data);

            if (this.Get_setaiSelinf.icrn_inf != null) {
                //取得したデータを確保
                this.Get_setaiSelinf.icrn_inf.forEach(function (value) {
                    wk_setai_data =
                    {
                        id: value.setaiID,
                        name: value.setaiNm,
                        value: value.setaiNm,
                    }
                    setai_data.push(wk_setai_data);

                });
                this.MstList = setai_data.concat();
            }
        }
        , DspHonninInput() {
            //#####本人の状況の画面表示を行う#####

            let wk_honnin_data = [];
            let honnin_data = [];

            //本人
            wk_honnin_data =
            {
                id: 0,
                name: "(クリア)",
                value: " ",
            }
            honnin_data.push(wk_honnin_data);
            if (this.Get_honninSelinf.icrn_inf != null) {
                //取得したデータを確保
                this.Get_honninSelinf.icrn_inf.forEach(function (value) {
                    wk_honnin_data =
                    {
                        id: value.honninID,
                        name: value.honninNm,
                        value: value.honninNm,
                    }
                    honnin_data.push(wk_honnin_data);
                });
                this.MstList = honnin_data.concat();
            }
        }
        , DspSyogaiInput() {
            //#####障害区分の画面表示を行う#####

            let wk_syogai_data = [];
            let syogai_data = [];
            let w_dainm = "";

            //障害区分
            wk_syogai_data =
            {
                id: 0,
                name: "(クリア)",
                value: " ",
            }
            syogai_data.push(wk_syogai_data);
            if (this.Get_syogaikbnSelinf.icrn_inf != null) {
                //取得したデータを確保
                this.Get_syogaikbnSelinf.icrn_inf.forEach(function (value) {
                    wk_syogai_data =
                    {
                        id: value.daiNcode,
                        name: "[" + value.daiNames + "]",
                        value: value.daiNames,
                    }
                    w_dainm = value.daiNames; //大項目名を保持
                    syogai_data.push(wk_syogai_data);

                    value.chuList.forEach(function (value2) {
                        wk_syogai_data =
                        {
                            id: value2.chuNcode,
                            name: value2.chuNames,
                            value: w_dainm + "(" + value2.chuNames + ")"
                        }
                        syogai_data.push(wk_syogai_data);
                    });

                });
                this.MstList = syogai_data.concat();

            }
        }
        , DataFilter() {
            let Rekidata = [];
            let wk_Rekidata = [];
            let wk_kbn = this.kotei_kbn;

            if (this.GetKihonSelInf.icrn_inf != null) {
                //基本情報のデータのみに絞る
                this.GetKihonSelInf.icrn_inf.forEach(function (value) {
                    //区分が基本情報
                    if (value.head_kbn == wk_kbn) {
                        if (value.head_mymd.trim() != "") {
                            wk_Rekidata = {
                                head_mymd: value.head_mymd.substring(0, 4)
                                    + "年" + value.head_mymd.substring(4, 6)
                                    + "月" + value.head_mymd.substring(6)
                                    + "日",
                                head_dataid: value.head_dataid,
                                head_kbn: value.head_kbn,
                                head_siid: value.head_siid,
                                head_sryaku: value.head_sryaku,
                            }
                            Rekidata.push(wk_Rekidata);
                        }
                    }
                });

                //データ格納

                //履歴ソート(降順)
                Rekidata.sort(function (a, b) {
                    if (a.head_mymd > b.head_mymd) return -1;
                    if (b.head_mymd > a.head_mymd) return 1;
                });
                this.viewdata = Rekidata.concat();

                //履歴ダイアログにセット
                let winter = setInterval(() => {
                    if (this.$refs.kotei_rireki != undefined) {
                        clearInterval(winter);
                        this.$refs.kotei_rireki.set_rekidata(this.viewdata);
                    }
                }, "interval");

                if (this.viewdata.length > 0) {
                    this.pdataid = this.viewdata[0].head_dataid;
                    this.get_data(this.pdataid);
                }

                //データがない場合ラベルを表示
                if (this.pdataid == 0) {
                    this.Label_Visible = true;
                }
                else {
                    this.Label_Visible = false;
                }
            }
        }

        , Clickins_data(kbn) {
            //kbn = 1:リロードしない

            //#####ヘッダの更新処理
            this.insflg = false;
            if (this.pmymd != this.pmymd_moto) {
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
                insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
            }

            //登録データ
            let wk_naiyo = this.splitNaiyo(this.dispTok, 256);
            let wk_putdata = [];
            let putdata = [];
            let putdata_biko = [];
            let chk1 = 0;
            let chk2 = 0;
            let chk3 = 0;

            //チェックデータ
            if (document.getElementById("Id_chk40").checked == true) { chk1 = 1; }
            if (document.getElementById("Id_chk41").checked == true) { chk2 = 1; }
            if (document.getElementById("Id_chk42").checked == true) { chk3 = 1; }

            //入力データ
            let wk_dispMail = this.dispMail;
            let wk_dispKMail = this.dispKMail;
            let wk_dispPhoneNo = this.dispPhoneNo;
            let wk_dispFaxNo = this.dispFaxNo;
            let wk_dispSkbn1_id = this.dispSkbn1_id
            let wk_dispSkbn2_id = this.dispSkbn2_id
            let wk_dispSkbn3_id = this.dispSkbn3_id

            let wk_dispSetai_id = this.dispSetai_id
            let wk_dispHonnin_id = this.dispHonnin_id

            if (wk_dispMail == "") wk_dispMail = " ";
            if (wk_dispKMail == "") wk_dispKMail = " ";
            if (wk_dispPhoneNo == "") wk_dispPhoneNo = " ";
            if (wk_dispFaxNo == "") wk_dispFaxNo = " ";
            if (wk_dispSkbn1_id == "") wk_dispSkbn1_id = 0;
            if (wk_dispSkbn2_id == "") wk_dispSkbn2_id = 0;
            if (wk_dispSkbn3_id == "") wk_dispSkbn3_id = 0;

            let data_siid = this.login_siid;
            let data_insymd = dayjs().format('YYYYMMDD');
            let data_instime = dayjs().format('HH:mm');

            //内容
            wk_putdata =
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
                kihon_email: wk_dispMail,
                kihon_kmail: wk_dispKMail,
                kihon_ktelno: wk_dispPhoneNo,
                kihon_faxno: wk_dispFaxNo,
                kihon_syogaikbn1: wk_dispSkbn1_id,
                kihon_jyudo1: 0,
                kihon_syukei1: chk1,
                kihon_syogaikbn2: wk_dispSkbn2_id,
                kihon_jyudo2: 0,
                kihon_syukei2: chk2,
                kihon_syogaikbn3: wk_dispSkbn3_id,
                kihon_jyudo3: 0,
                kihon_syukei3: chk3,
                kihon_setaiid: wk_dispSetai_id,
                kihon_honninid: wk_dispHonnin_id
            }
            putdata.push(wk_putdata);

            //データ登録
            if (this.dataflg == false) {
                //新規作成
                postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                });
            }
            else {
                //更新
                putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                });
            }

            params = {
                uniqid: this.uniqid,
                traceid: this.traceid,
                kbn: this.kotei_kbn,
                intcode: this.intcode,
                insflg: sysConst_kotei.INS_KBN_BIKO, //備考登録
            }

            putdata = ""
            //備考
            if (wk_naiyo.length > 0) {
                for (let i = 0; i < wk_naiyo.length; i++) {
                    wk_putdata =
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
                        kihon_siid: 0,
                        biko_lcnt: i + 1,
                        biko_naiyo: wk_naiyo[i]
                    }
                    putdata_biko.push(wk_putdata);

                }
            }
            else {
                wk_putdata =
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
                    kihon_siid: 0,
                    biko_lcnt: 1,
                    biko_naiyo: " "
                }
                putdata_biko.push(wk_putdata);

            }

            //特記登録
            if (this.tokflg == false) {
                //特記ないため新規作成
                postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata_biko).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    if (kbn != 1) this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                });
            }
            else {
                //特記ある-更新
                putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata_biko).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    if (kbn != 1) this.View_upd(this.intcode);
                });

                this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
            }
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

        , splitNaiyo: function (str, size) {
            //#####文字列を分割する#####
            let strlen = Math.ceil(str.length / size);
            let array = [];

            for (let i = 0, x = 0; i < strlen; ++i, x += size) {
                array[i] = str.substr(x, size)
            }
            return array;
        }
        //カレンダー
        , getYm() {
            //#####カレンダーセット#####
            if (!this.Ym) {
                this.Ym = dayjs();
                this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
            }
            return (
                this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
            );
        },
        monthSelect(ymd) {
            this.Ym = ymd;
        }
        , monthSelect_tyosa(Ym, dspymd) {
            this.Ym = Ym   //登録時に使用
            this.pmymd = dspymd;
        }

        , Head_insData(kbn) {
            //kbn:1 画面遷移時の登録 リロードしない

            //履歴の登録処理
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
                    kbn: this.kotei_kbn,//基本情報
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
                            kihon_siid: 0,

                        }
                    ];

                if (wk_insflg == sysConst_kotei.INS_KBN_HEADAll) {
                    postConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata_kazoku = result;
                    });
                    postConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata_syakai = result;
                    });

                }
                postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', postdata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;

                    if (this.inscopykbn == true) {
                        //前回コピーを実施する
                        Kotei_Copy_All(this.uniqid, this.traceid, this.intcode, this.jigyoid, ins_ymd, wk_insflg, sysConst_kotei.KOTEI_ID_KIHON).then();
                    }

                    if (kbn != 1) this.View_upd(this.intcode);
                    //メッセージ
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
                    kbn: this.kotei_kbn,//基本情報
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
                            kihon_siid: 0
                        }
                    ];

                putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    if (kbn != 1) this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_REKI_UPD, 0);
                    this.InsWinhead = false;
                }
                );
            }

            this.headinskbn = 0;//初期化
        },

        Chk_insdata: function (row) {
            //未登録チェック
            if (this.inputchk == true) {
                this.dialo_Yesflg_no = 0;
                //更新有
                this.input_chk();

                let winter = setInterval(() => {
                    if (this.dialo_Yesflg_no == 1 || this.dialo_Yesflg_no == 2) {
                        clearInterval(winter);
                        if (this.dialo_Yesflg_no == 1) {
                            this.Clickins_data(1);
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

        //画面更新
        , DataFilter2() {
            let data = [];
            let datatok = [];
            let tokflg = false;
            let dataflg = false;
            let wdataid = this.pdataid;
            let Ymd = "";

            if (this.GetViewDataInf.icrn_inf != null) {
                //基本情報のデータのみに絞る
                this.GetViewDataInf.icrn_inf.forEach(function (value) {
                    //区分が基本情報
                    if (value.head_kbn == 1 && value.head_dataid == wdataid) {
                        Ymd = value.head_mymd;
                        //基本情報ヘッダの内容を取得
                        value.naiyo.forEach(function (value2) {
                            if (value2.naiyo_kbn == 0) {
                                dataflg = true;
                                data.push(value2);
                            }
                            else if (value2.naiyo_kbn == 1) {
                                tokflg = true;
                                datatok.push(value2);
                            }

                        });
                    }
                });

                //データ格納
                this.pmymd = Ymd.substring(0, 4)
                    + "年" + Ymd.substring(4, 6)
                    + "月" + Ymd.substring(6)
                    + "日",
                    this.pmymd_moto = this.pmymd;

                //日付をセット
                let winter = setInterval(() => {
                    if (this.$refs.kotei_tyosa != undefined) {
                        clearInterval(winter);
                        this.$refs.kotei_tyosa.set_ymd(this.pmymd, "");
                    }
                }, "interval");

                if (data.length > 0) {
                    this.dataflg = dataflg;
                    //フッターラベル
                    let footer = "(最終登録日 : ";
                    footer = footer + data[0].kihon_insymd.substring(0, 4)
                        + "年" + data[0].kihon_insymd.substring(4, 6)
                        + "月" + data[0].kihon_insymd.substring(6)
                        + "日 ";
                    footer = footer + data[0].kihon_instime + " ";
                    footer = footer + data[0].kihon_siname + ")";
                    document.getElementById("footer_001").innerHTML = wjCore.escapeHtml(footer);

                    //画面表示
                    document.getElementById("lblRiyonm").innerHTML = wjCore.escapeHtml(data[0].kihon_name);
                    document.getElementById("lblBirth").innerHTML = wjCore.escapeHtml(data[0].kihon_birth);
                    document.getElementById("lblAge").innerHTML = wjCore.escapeHtml(data[0].kihon_age + "歳");
                    document.getElementById("lblSex").innerHTML = wjCore.escapeHtml(data[0].kihon_sex_view);
                    document.getElementById("lbladress").innerHTML = wjCore.escapeHtml(data[0].kihon_address);
                    document.getElementById("tel1").innerHTML = wjCore.escapeHtml(data[0].kihon_tel_view);
                    document.getElementById("tel2").innerHTML = wjCore.escapeHtml(data[0].kihon_tel2_view);

                    this.dispMail = data[0].kihon_email;      //メールアドレス
                    this.dispKMail = data[0].kihon_kmail;     //携帯アドレス
                    this.dispPhoneNo = data[0].kihon_ktelno;  //携帯番号
                    this.dispFaxNo = data[0].kihon_faxno;     //FAX番号
                    //API修正後にコメント解除

                    //世帯
                    let wk_dispSetai_id = 0;
                    let wk_dispSetai = "";
                    this.Get_setaiSelinf.icrn_inf.forEach(function (value) {
                        if (value.setaiID == data[0].kihon_setaiid) {
                            wk_dispSetai_id = value.setaiID;
                            wk_dispSetai = value.setaiNm;
                        }
                    });
                    this.dispSetai_id = wk_dispSetai_id;    //世帯の状況ID
                    this.dispSetai = wk_dispSetai;          //世帯の状況名称

                    //本人
                    let wk_dispHonnin_id = 0;
                    let wk_dispHonnin = "";
                    this.Get_honninSelinf.icrn_inf.forEach(function (value) {
                        if (value.honninID == data[0].kihon_honninid) {
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
                    let wk_dainm = ""

                    this.Get_syogaikbnSelinf.icrn_inf.forEach(function (value) {
                        if (value.daiNcode == data[0].kihon_syogaikbn1) {
                            wk_dispSkbn1_id = value.daiNcode;    //障害区分1の状況ID
                            wk_dispSkbn1 = value.daiNames;       //障害区分1の状況名称
                        }
                        else if (value.daiNcode == data[0].kihon_syogaikbn2) {
                            wk_dispSkbn2_id = value.daiNcode;    //障害区分2の状況ID
                            wk_dispSkbn2 = value.daiNames;       //障害区分2の状況名称
                        }
                        else if (value.daiNcode == data[0].kihon_syogaikbn3) {
                            wk_dispSkbn3_id = value.daiNcode;    //障害区分3の状況ID
                            wk_dispSkbn3 = value.daiNames;       //障害区分3の状況名称
                        }
                        wk_dainm = value.daiNames;

                        value.chuList.forEach(function (value2) {
                            if (value2.chuNcode == data[0].kihon_syogaikbn1) {
                                wk_dispSkbn1_id = value2.chuNcode;                        //障害区分1の状況ID
                                wk_dispSkbn1 = wk_dainm + "(" + value2.chuNames + ")";   //障害区分1の状況名称
                            }
                            else if (value2.chuNcode == data[0].kihon_syogaikbn2) {
                                wk_dispSkbn2_id = value2.chuNcode;                        //障害区分2の状況ID
                                wk_dispSkbn2 = wk_dainm + "(" + value2.chuNames + ")";   //障害区分2の状況名称
                            }
                            else if (value2.chuNcode == data[0].kihon_syogaikbn3) {
                                wk_dispSkbn3_id = value2.chuNcode;                        //障害区分3の状況ID
                                wk_dispSkbn3 = wk_dainm + "(" + value2.chuNames + ")";   //障害区分3の状況名称
                            }
                        });
                    });

                    this.dispSkbn1_id = wk_dispSkbn1_id;    //障害区分1の状況ID
                    this.dispSkbn1 = wk_dispSkbn1;          //障害区分1の状況名称
                    this.dispSkbn2_id = wk_dispSkbn2_id;    //障害区分2の状況ID
                    this.dispSkbn2 = wk_dispSkbn2;          //障害区分2の状況名称
                    this.dispSkbn3_id = wk_dispSkbn3_id;    //障害区分3の状況ID
                    this.dispSkbn3 = wk_dispSkbn3;          //障害区分3の状況名称                                                        

                    if (tokflg == true) {
                        this.tokflg = tokflg;
                        this.dispTok = datatok[0].biko_naiyo
                    }
                    else {
                        this.tokflg = false;
                        this.dispTok = "";
                    }

                    if (data[0].kihon_syukei1 == 1)//集計区分1
                    {
                        document.getElementById("Id_chk40").checked = true;
                        document.getElementById("Id_chk40_text").style.color = "#0081eb";
                    }
                    else {
                        document.getElementById("Id_chk40").checked = false;
                        document.getElementById("Id_chk40_text").style.color = "";
                    }
                    if (data[0].kihon_syukei2 == 1)//集計区分2
                    {
                        document.getElementById("Id_chk41").checked = true;
                        document.getElementById("Id_chk41_text").style.color = "#0081eb";
                    }
                    else {
                        document.getElementById("Id_chk41").checked = false;
                        document.getElementById("Id_chk41_text").style.color = "";
                    }
                    if (data[0].kihon_syukei3 == 1)//集計区分3
                    {
                        document.getElementById("Id_chk42").checked = true;
                        document.getElementById("Id_chk42_text").style.color = "#0081eb";
                    }
                    else {
                        document.getElementById("Id_chk42").checked = false;
                        document.getElementById("Id_chk42_text").style.color = "";
                    }
                }
                else {
                    this.viewClear(0);
                }
            }
        }

        , get_data(pdataid) {
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
                Kbn: this.kotei_kbn,             //基本情報
                Dataid: this.pdataid,
                Modeflg: sysConst_kotei.GET_KBN_DATA,        //データ取得
            };

            getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
                _self.GetViewDataInf = result;
                this.DataFilter2();
            })
        }

        , View_upd(intcode) {
            //画面更新
            this.$emit('child-dataupd', intcode); //画面更新
            this.inputchk = false;                //入力フラグを戻す
        }
        , viewClear(kbn) {
            if (kbn == 0) {
                document.getElementById("lblRiyonm").innerHTML = wjCore.escapeHtml("");
                document.getElementById("lblBirth").innerHTML = wjCore.escapeHtml("");
                document.getElementById("lblAge").innerHTML = wjCore.escapeHtml("");
                document.getElementById("lblSex").innerHTML = wjCore.escapeHtml("");
                document.getElementById("lbladress").innerHTML = wjCore.escapeHtml("");
                document.getElementById("tel1").innerHTML = wjCore.escapeHtml("");
                document.getElementById("tel2").innerHTML = wjCore.escapeHtml("");
            }

            this.dispMail = "";      //メールアドレス
            this.dispKMail = "";     //携帯アドレス
            this.dispPhoneNo = "";   //携帯番号
            this.dispFaxNo = "";     //FAX番号
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
        , onInitializeIcrnGrid_Mst(flexGrid) {
            flexGrid.beginUpdate();
            // ヘッダの追加と設定
            flexGrid.columnHeaders.rows[0].allowMerging = true;
            flexGrid.columnHeaders.rows[0].height = 30;
            flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Mst'
            flexGrid.cells.rows.defaultSize = 30;
            flexGrid.alternatingRowStep = 0;
            flexGrid.endUpdate();

            this.flex_mst = flexGrid;
            flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_Mst(e) }.bind(this));
        }
        , grid_click_Mst: function (e) {
            var ht = this.flex_mst.hitTest(e);
            if (ht.row >= 0) {
                if (this.Mstflg == EnumMstkbn.syogai1) {
                    //障害区分1
                    this.dispSkbn1_id = this.MstList[ht.row].id;
                    this.dispSkbn1 = this.MstList[ht.row].value;
                }
                else if (this.Mstflg == EnumMstkbn.syogai2) {
                    //障害区分2
                    this.dispSkbn2_id = this.MstList[ht.row].id;
                    this.dispSkbn2 = this.MstList[ht.row].value;
                }
                else if (this.Mstflg == EnumMstkbn.syogai3) {
                    //障害区分3
                    this.dispSkbn3_id = this.MstList[ht.row].id;
                    this.dispSkbn3 = this.MstList[ht.row].value;
                }
                else if (this.Mstflg == EnumMstkbn.setai) {
                    //世帯
                    this.dispSetai_id = this.MstList[ht.row].id;
                    this.dispSetai = this.MstList[ht.row].value;
                }
                else if (this.Mstflg == EnumMstkbn.honnin) {
                    //本人
                    this.dispHonnin_id = this.MstList[ht.row].id;
                    this.dispHonnin = this.MstList[ht.row].value;
                }
            }
        }
        , onItemsSourceChanged_Mst(flexGrid) {
            // 初期選択を解除
            flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            let col = flexGrid.columns[0];
            let head_str = "";
            if (this.Mstflg == EnumMstkbn.syogai1 || this.Mstflg == EnumMstkbn.syogai2 || this.Mstflg == EnumMstkbn.syogai3) {
                //障害区分
                head_str = "障害区分";
                col.header = head_str;
            }
            else if (this.Mstflg == EnumMstkbn.setai) {
                //世帯
                head_str = "世帯の状況";
                col.header = head_str;
            }
            else if (this.Mstflg == EnumMstkbn.honnin) {
                //本人
                head_str = "本人の状況";
                col.header = head_str;
            }

        }
        , onClick_Massege(kbn) {
            //確認ダイアログ判定
            if (kbn == 0) {
                this.dialo_Yesflg_no = 1;
                if (this.dialog_Actionflg == EnumMsgAction.reki_ins) {
                    //履歴の新規追加
                    this.Head_insData();
                }
                else if (this.dialog_Actionflg == EnumMsgAction.reki_upd) {
                    //履歴の更新追加
                    this.Head_insData();
                }
                else if (this.dialog_Actionflg == EnumMsgAction.reki_del) {
                    //履歴の削除
                    this.del_rekidata();
                }
                else if (this.dialog_Actionflg == EnumMsgAction.data_del) {
                    //入力データの削除
                    this.del_rekidata();
                }
                else if (this.dialog_Actionflg == EnumMsgAction.data_ins) {
                    //入力データの登録
                    this.Clickins_data();
                }
                else if (this.dialog_Actionflg == EnumMsgAction.data_copy) {
                    //前回コピー
                    this.DataCopy();
                }
                else if (this.dialog_Actionflg == EnumMsgAction.massage) {
                    //汎用メッセージ
                    this.dialog_Message_flg = false;
                    this.Btnno_Visible = true;
                }
                else if (this.dialog_Actionflg == EnumMsgAction.reki_chk) {
                    //履歴チェック
                    this.InsWinhead = true;
                }
                else if (this.dialog_Actionflg == EnumMsgAction.reki_move) {
                    //画面移動チェック
                    this.dialog_Message_flg = false;
                }

            }
            else {
                this.dialo_Yesflg_no = 2;
            }

            this.dialog_Message_flg = false;
        }

        //#####クリックイベント系#####
        , onHeadclick_ins() {
            this.Ym = dayjs();
            this.insflg = true;//新規登録

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
            this.InsWinhead = true;
        }

        , Click_colse() {
            this.InsWinhead = false;
        }
        , Click_colse_Reki() {
            this.Rirekiwin = false;
        }
        , onClickCopy() {
            if (this.Chk_Reki() == true) {
                this.Dragflg = false;
                this.Message_Dialog(sysConst.MSG_COPY_CHK, 6);
            }
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
                jigyoid: this.jigyoid,
                intcode: this.intcode,
                kbn: this.kotei_kbn,
                dataid: this.pdataid,  //データid
                ymd: this.ymd,         //内容登録
            }

            //前回コピー
            postConnect('/Koteiinf_COPY', params, 'KOTEIINF', putdata).then((result) => {
                this.Copydata = result.icrn_inf;
                this.get_data(this.pdataid);
            });
        },
        onClickReki() {
            if (this.Chk_Reki() == true) {
                this.Dragflg = false;
                this.Rirekiwin = true;
            }
        }
        , onClickIns() {
            //履歴チェック
            if (this.Chk_Reki() == true) {
                //データ登録ボタン
                this.Message_Dialog(sysConst.MSG_DATA_INS_CHK, 5);
            }
        }

        , onClickdel() {
            //データ削除ボタン
            if (this.Chk_Reki() == true) {
                this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK, 4);
            }
        }
        , onClickclr() {
            //備考欄クリア
            this.viewClear(1);
        }

        , onTxtHonnin_Click() {
            if (this.Chk_Reki() == true) {
                //本人テキストクリック時
                this.inputchk = true
                this.Mstflg = EnumMstkbn.honnin;
                this.Grid_Visible = true;
                this.DspHonninInput();
            }
        }
        , onTxtSetai_Click() {
            //世帯テキストクリック時
            if (this.Chk_Reki() == true) {
                this.inputchk = true
                this.Mstflg = EnumMstkbn.setai;
                this.Grid_Visible = true;
                this.DspSetaiInput();
            }
        }
        , onTxtSyogai_Click(kbn) {
            if (this.Chk_Reki() == true) {
                //障害区分テキストクリック時
                this.inputchk = true
                this.Mstflg = kbn;
                this.Grid_Visible = true;
                this.DspSyogaiInput();
            }
        }
        , onClickdel_reki() {
            //履歴削除ボタン
            this.Message_Dialog(sysConst.MSG_REKI_DEL_CHK, 3);
        }
        //履歴登録
        , onHead_ins() {
            if (this.insflg == true) {
                this.Message_Dialog(sysConst.MSG_REKI_INS_CHK, 1);
            }
            else {
                this.Message_Dialog(sysConst.MSG_REKI_UPD_CHK, 2);
            }
        }
        , setUserData(wintcode, wSeldata) {
            //利用者選択データ受け取り
            this.inputchk = false //入力チェックリセット
            this.Grid_Visible = false;
            this.pdataid = 0; //初期化
            this.viewClear(0);
            this.GetViewDataInf = [];
            this.GetKihonSelInf = wSeldata;   //表示データ
            this.intcode = wintcode;          //利用者コード
            this.Ym = dayjs();  //日付を初期化
            this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
            this.DataFilter();

        }
        , Message_Dialog(Message, kbn) {
            //汎用メッセージダイアログ
            this.Dragflg = false;
            this.dialog_Actionflg = kbn;
            this.Btnno_Visible = false;
            if (kbn > 0) { this.Btnno_Visible = true }

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
                this.Message_Dialog(sysConst.MSG_REKI_CRE, 0);
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
        , text_input(kbn) {
            switch (kbn) {
                case 0:
                    {
                        let textarea = document.getElementById("clslbl20_id");
                        //文字数制御
                        if (textarea.value.length > 60) //文字数制限
                        {
                            this.dispMail = textarea.value.substring(0, 60);
                        }
                    }
                    break;
                case 1:
                    {
                        let textarea = document.getElementById("clslbl21_id");
                        //文字数制御
                        if (textarea.value.length > 15) //文字数制限
                        {
                            this.dispPhoneNo = textarea.value.substring(0, 15);
                        }
                    }
                    break;
                case 2:
                    {
                        let textarea = document.getElementById("clslbl30_id");
                        //文字数制御
                        if (textarea.value.length > 60) //文字数制限
                        {
                            this.dispKMail = textarea.value.substring(0, 60);
                        }
                    }
                    break;
                case 3:
                    {
                        let textarea = document.getElementById("clslbl31_id");
                        //文字数制御
                        if (textarea.value.length > 15) //文字数制限
                        {
                            this.dispFaxNo = textarea.value.substring(0, 15);
                        }
                    }
                    break;
            }
        }

        , input_chk: function () {
            //入力項目があれば登録メッセージ
            if (this.inputchk == true) {
                this.Message_Dialog(sysConst.MSG_INS_CHK, 8);
            }
        }

        , check_click(kbn) {
            if (this.Chk_Reki() == true) {
                if (kbn == 0) {
                    document.getElementById("Id_chk40_text").style.color = "#000";
                    if (document.getElementById("Id_chk40").checked == true) {
                        document.getElementById("Id_chk40_text").style.color = "#0081eb";
                    }
                }
                if (kbn == 1) {
                    document.getElementById("Id_chk41_text").style.color = "#000";
                    if (document.getElementById("Id_chk41").checked == true) {
                        document.getElementById("Id_chk41_text").style.color = "#0081eb";
                    }
                }
                if (kbn == 2) {
                    document.getElementById("Id_chk42_text").style.color = "#000";
                    if (document.getElementById("Id_chk42").checked == true) {
                        document.getElementById("Id_chk42_text").style.color = "#0081eb";
                    }
                }
            }
        }

        , click_headindkbn(kbn) {
            this.headinskbn = kbn;    //0:個別登録 1:一括登録

            switch (kbn) {
                case 0:
                    document.getElementById("btn_kbt").style.backgroundColor = "#fff176";
                    document.getElementById("btn_ikt").style.backgroundColor = "#ffffff";
                    break;
                case 1:
                    document.getElementById("btn_kbt").style.backgroundColor = "#ffffff";
                    document.getElementById("btn_ikt").style.backgroundColor = "#fff176";
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
};
</script>

<style  lang="scss">
@import '../../../assets/scss/common.scss';

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

    .wj-cell:not(.wj-header) {
        background: $white;
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
