<template>
    <v-sheet class="clssheet-chu008" elevation="2">
        <label class="clsstitle1_Noreki_back_008" v-show="Label_Visible">
            <label class="clsstitle1_Noreki_008">履歴が未作成です。
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                履歴作成ボタンから作成してください。</label>
        </label>
        <div class="area title">
            <label class="label midashihead title">医療保険情報</label>
            <v-card class="ml-2 vcard reki" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">履歴作成</a>
            </v-card>


            <label class="label midashihead tyosa" id="Ymd" style="margin-left: 100px;">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

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

            <v-btn :disabled="Label_Visible == true" class="btn def" style="margin-left: 98px;" @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="btn def" style="margin-left: 4px;" @click="onClickReki">
                履歴参照
            </v-btn>

        </div>

        <div class="area008-003">
            <label class="clsstitle008-003">医療保険</label>
            <div class="area008-003-001">
                <label class="clsstitle008-004">保険種類</label>
                <label class="clsstitle008-005">記号・番号</label>
                <label class="clsstitle008-006">被保険者</label>
            </div>
            <div class="area008-003-002">
                <select id="combo_id" name="combo_nm" class="customSelectBox ml-1" v-model="selhokensyu"
                    style="width: 150px; height: 30px;" @click="click_text">
                    <option v-for="val in hokensyu_list" :key="val.id" :value="val.id">
                        {{ val.name }}
                    </option>
                </select>

                <input type="text" id="clssinp008-002_id" class="clssinp008-002" v-model="dispKigo"
                    @input="text_input(0)" />
                <v-radio-group :disabled="Label_Visible == true" row v-model="radio003" class="radiogroup001"
                    style="margin-top:-10px">
                    <v-radio class="clssinp008-003" value="radio003" @click="click_text(3)">
                        <template v-slot:label>
                            <div id="radio003_text"> 本人</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-004" label="家族" value="radio004" @click="click_text(4)">
                        <template v-slot:label>
                            <div id="radio004_text"> 家族</div>
                        </template>
                    </v-radio>
                </v-radio-group>
            </div>
        </div>

        <div class="area008-004">
            <label class="clsstitle008-009">障害者医療等</label>
            <div class="area008-004-001">
                <label class="clsstitle008-010">自立支援医療</label>
                <label class="clsstitle008-011">特別医療</label>
                <label class="clsstitle008-012">その他</label>
            </div>

            <div class="area008-004-002">
                <v-radio-group :disabled="Label_Visible == true" row v-model="radio005" class="radiogroup001">
                    <v-radio class="clssinp008-005-mu" value="radio005-N" @click="click_text(50)">
                        <template v-slot:label>
                            <div id="radio005-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-005-ari" value="radio005-Y" @click="click_text(51)">
                        <template v-slot:label>
                            <div id="radio005-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
                <v-radio-group :disabled="Label_Visible == true" row v-model="radio006" class="radiogroup001">
                    <v-radio class="clssinp008-006-mu" value="radio006-N" @click="click_text(60)">
                        <template v-slot:label>
                            <div id="radio006-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-006-ari" value="radio006-Y" @click="click_text(61)">
                        <template v-slot:label>
                            <div id="radio006-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
                <v-radio-group :disabled="Label_Visible == true" row v-model="radio007" class="radiogroup001">
                    <v-radio class="clssinp008-007-mu" value="radio007-N" @click="click_text(70)">
                        <template v-slot:label>
                            <div id="radio007-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-007-ari" label="有" value="radio007-Y" @click="click_text(71)">
                        <template v-slot:label>
                            <div id="radio007-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
            </div>

            <div class="area008-004-003">
                <label class="chklabel004">[</label>
                <input class="chk001" type="checkbox" id="scales1" @click="check_click(0)">
                <label id="chklabel001_id" class="chklabel001">更生</label>
                <input class="chk002" type="checkbox" id="scales2" @click="check_click(1)">
                <label id="chklabel002_id" class="chklabel002">育成</label>
                <input class="chk003" type="checkbox" id="scales3" @click="check_click(2)">
                <label id="chklabel003_id" class="chklabel003">精神通院</label>
                <label class="chklabel005">]</label>

                <input type="text" id="clssinp008-013_id" class="clssinp008-013" v-model="dispsonota"
                    @input="text_input(1)" />

            </div>
        </div>

        <div class="area008-005">
            <label class="clsstitle008-013">受給者証</label>
            <div class="area008-005-001">
                <label class="clsstitle008-014">老人保健法医療受給者証</label>
                <label class="clsstitle008-015">老人医療費の入院時一部負担金減額確定証</label>
                <label class="clsstitle008-016">老人保健法健康手帳</label>
                <label class="clsstitle008-017">心身障碍者医療受給者証</label>
            </div>
            <div class="area008-005-002">
                <v-radio-group v-show="Label_Visible == false" row v-model="radio008" class="radiogroup001">
                    <v-radio class="clssinp008-008-mu" value="radio008-N" @click="click_text(80)">
                        <template v-slot:label>
                            <div id="radio008-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-008-ari" value="radio008-Y" @click="click_text(81)">
                        <template v-slot:label>
                            <div id="radio008-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
                <v-radio-group v-show="Label_Visible == false" row v-model="radio009" class="radiogroup002">
                    <v-radio class="clssinp008-009-mu" value="radio009-N" @click="click_text(90)">
                        <template v-slot:label>
                            <div id="radio009-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-009-ari" value="radio009-Y" @click="click_text(91)">
                        <template v-slot:label>
                            <div id="radio009-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
                <v-radio-group v-show="Label_Visible == false" row v-model="radio010" class="radiogroup001">
                    <v-radio class="clssinp008-010-mu" value="radio010-N" @click="click_text(100)">
                        <template v-slot:label>
                            <div id="radio010-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-010-ari" value="radio010-Y" @click="click_text(101)">
                        <template v-slot:label>
                            <div id="radio010-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
                <v-radio-group v-show="Label_Visible == false" row v-model="radio011" class="radiogroup001">
                    <v-radio class="clssinp008-011-mu" value="radio011-N" @click="click_text(110)">
                        <template v-slot:label>
                            <div id="radio011-N_text"> 無</div>
                        </template>
                    </v-radio>
                    <v-radio class="clssinp008-011-ari" value="radio011-Y" @click="click_text(111)">
                        <template v-slot:label>
                            <div id="radio011-Y_text"> 有</div>
                        </template>
                    </v-radio>
                </v-radio-group>
            </div>

        </div>

        <div class="area008-006">
            <label class="clsstitle008-018">特記事項</label>
            <textarea id="textarea" class="clssinp008-012" v-model="disptok" @click="click_text" @input="initTextarea"
                no-resize rows="10"></textarea>
        </div>

        <div class="area008-007">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu008-clr" @click="onClickclr_data">
                クリア
            </v-btn>

            <label class="label footer" id="footer_008" style="margin-left: 180px;"></label>

            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu008-ins" @click="onClickins_data">
                登 録
            </v-btn>
        </div>

        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="400">
            <v-sheet class="clssheet-head" elevation="2" id="head_win_008id" @mousedown="win_drag($event)"
                @mousemove="win_move($event)" @mouseup="win_up($event)">
                <div>
                    <div class="areahead all">
                        <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
                        <v-btn margin-left=1px elevation="2" icon small top class="closeButton_win  mt-1" color="red"
                            @click="Click_colse_head">
                            <v-icon> mdi-close </v-icon>
                        </v-btn>
                    </div>
                    <div class="areahead all" style="margin-top: 4px;">
                        <label class="koteititle-head">作成日</label>
                        <v-btn class="btnymd ml-1" @click="inputCalendarClick(0)" tile width="150px" height="30px">{{
                            getYm()
                        }}
                            <div class="float-right">
                                <v-icon small>mdi-calendar-month</v-icon>
                            </div>
                        </v-btn>
                    </div>

                    <div class="areahead all" style="height: 60px; margin-top: 4px;">
                        <div class="areahead left" style="height: 60px;">
                            <label class="koteititle-head" style="height: 60px;">作成区分</label>
                        </div>
                        <div class="areahead right">
                            <v-btn class="clsbtnmenuhead" style="margin-left: 4px; margin-top: 4px;"
                                @click="click_headindkbn(0)">個別</v-btn>
                            <label style="margin-left: 4px;margin-top: 4px;">(選択項目の履歴のみ作成)</label>
                            <v-btn class="clsbtnmenuhead" style="margin-left: 4px; margin-top: 4px;"
                                @click="click_headindkbn(1)">一括</v-btn>
                            <label style="margin-left: 4px;margin-top: 4px;">(全項目の履歴を一括作成)</label>
                        </div>
                    </div>

                    <div class="areahead all" style="margin-top: 4px;">
                        <label class="koteititle-head">前回コピー</label>
                        <input class="chkbox mt-1" id="chk_head008" type="checkbox"
                            style="margin-left: 4px;margin-top: 0px !important;">
                        <label id="chk_gensyo" style="margin-left: 4px;margin-top: 4px;">同時に実施する</label>
                    </div>

                    <div class="areahead all">
                        <v-btn class="clsbtnmenuhead" style="margin-left: 330px;" @click="onHead_ins">
                            登録
                        </v-btn>
                    </div>
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
        <v-dialog v-model="dialog_Message_flg" width="260">
            <v-sheet class="clssheet-Mes" elevation="2" id="kakunin_id008">
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
                        <v-btn class="clsbtnmenu-standard" v-show="Btnno_Visible" width="80" @click="onClick_Massege(0)">
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
        <v-dialog v-model="Rirekiwin" width="310">
            <v-sheet class="clssheet-Reki" elevation="2" id="rireki_id008" @mousedown="win_drag_reki($event)"
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
                        <wj-flex-grid-column header="担当者" binding="head_siname" :width="100" :wordWrap=true
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
                    <v-btn :disabled="Label_Visible == true" class="clsbtnmenu008-del" @click="onClickdel_data">
                        削除
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
import { postConnect } from '../../../connect/postConnect';
import { putConnect } from '../../../connect/putConnect';
import { getConnect } from '../../../connect/getConnect';
import { deleteConnect } from '../../../connect/deleteConnect';
import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjCore from '@grapecity/wijmo';
import sysConst from '../../../utiles/const';
import sysConst_kotei from '../../../utiles/const_kotei';
import { Kotei_Copy_All } from '../../../js/koteiinf/kotei_common';



export default
    {
        props: ["ymd", "uniqid", "traceid", "jigyoid", "kotei_kbn", "login_siid"],
        data() {
            return {
                hokensyu_list: [],
                Get_inputinf: this.get_inputdata(),
                radio003: 'radio003',
                radio005: 'radio005-N',
                radio006: 'radio006-N',
                radio007: 'radio007-N',
                radio008: 'radio008-N',
                radio009: 'radio009-N',
                radio010: 'radio010-N',
                radio011: 'radio011-N',
                selhokensyu: "",
                str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",

                //APIから取得する表示項目
                GetSelInf: [],                  //API取得データ(履歴)
                GetViewDataInf: [],            //API取得データ(データ)
                GetInf_list: [],

                //基本情報
                pdataid: '',         //表示しているDATAID
                pmymd: '',           //表示しているMYMD
                pmymd_moto: '',           //表示しているMYMD
                intcode: 0,          //表示しているintcode            
                picker: '',

                //表示項目
                iryo_id: 0
                , dispKigo: ''     //記号番号
                , dispsonota: ''  //その他
                , disptok: ''     //特記事項
                , combovalue: ''  //コンボボックスのVALUE
                , tokflg: false   //特記有無フラグ
                , dataflg: false  //データフラグ
                , disprekitanto: 0


                //ダイアログ表示用引数
                , selected_btn: 0
                , InsWinhead: false
                , InsWindata: false
                , Rirekiwin: false
                , dispymdhead: ""
                , datepicker_dialog_head: false
                , datepicker_dialog_tyosa: false //調査日カレンダー
                , headinskbn: 0   //0:個別登録 1:一括登録


                //確認ダイアログ
                , dialog_Message_flg: false
                , Dialog_Message: ''       //ダイアログメッセージ
                , dialo_Yesflg: false      //ダイアログ結果
                , dialo_Yesflg_no: false      //ダイアログ結果No 1:Yse 2:No
                , Btnno_Visible: false     //「いいえ」ボタン表示設定 

                //1:履歴の新規登録
                //2:履歴の更新登録
                //3:履歴の削除
                //4:データ削除
                //5;データ登録
                //6:前回コピー
                , dialog_Actionflg: 0

                //履歴用データ
                , viewdata_reki: [],    //履歴グリッド表示データ

                //前回コピー用変数
                Copy_dataid: 0, //コピー元データid
                Label_Visible: false,

            };
        },
        methods:
        {
            get_inputdata() {
                //医療保険

                //API取得
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                };
                //医療保険
                getConnect('/Mst_iryohoken', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf = result;
                    this.DspIryoInput();
                });
            }
            , DspIryoInput() {
                //医療保険をセット

                let wk_iryo_data = [];
                let wk_iryo_list = [];

                if (this.Get_inputinf.icrn_inf != null) {
                    //空データ
                    wk_iryo_data =
                    {
                        id: 0,
                        name: "",
                    }
                    wk_iryo_list.push(wk_iryo_data);

                    //取得したデータを確保
                    this.Get_inputinf.icrn_inf.forEach(function (value) {
                        wk_iryo_data =
                        {
                            id: value.id,
                            name: value.name,
                        }
                        wk_iryo_list.push(wk_iryo_data);

                    });
                    this.hokensyu_list = wk_iryo_list.concat();
                }
            },


            //####モーダルイベントエリア####
            //#####新規履歴#####
            win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_008id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_008id");
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

            //#####確認メッセージ#####
            win_drag_Msg: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("kakunin_id008");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_Msg: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("kakunin_id008");
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
                var wdialog = document.getElementById("rireki_id008");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_reki: function (e) {
                //履歴参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("rireki_id008");
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
                let textarea = document.getElementById("textarea");
                let rowcnt = textarea.value.split("\n");

                this.active = true;

                //文字数制御
                if (textarea.value.length > 200) //100文字
                {
                    textarea.value = textarea.value.substring(0, 100);
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
            getYm() {
                if (!this.Ym) {
                    this.Ym = dayjs();
                    this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
                }
                return (
                    this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
                );
            },
            get_data() {
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

                    pJigyoid: this.jigyoid,
                    Kbn: this.kotei_kbn,             //医療保険
                    Dataid: this.pdataid,
                    Modeflg: sysConst_kotei.GET_KBN_DATA,        //データ取得
                };
                getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
                    _self.GetViewDataInf = result;
                    this.DataFilter2();
                })
            },
            DataFilter() {
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.GetKihonSelInf.icrn_inf != null) {
                    //医療保険のデータのみに絞る
                    this.GetKihonSelInf.icrn_inf.forEach(function (value) {
                        //区分が医療保険 
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
                        }
                    });

                    //履歴ソート(降順)
                    Rekidata.sort(function (a, b) {
                        if (a.head_mymd > b.head_mymd) return -1;
                        if (b.head_mymd > a.head_mymd) return 1;
                    });
                    this.viewdata_reki = Rekidata.concat();

                    if (this.viewdata_reki.length > 0) {
                        this.pdataid = this.viewdata_reki[0].head_dataid;
                        this.get_data();
                    }

                }
            },
            DataFilter2() {
                let data = [];
                let tokflg = false;
                let dataflg = false;
                let wdataid = this.pdataid;
                let wk_tok = "";
                let wk_Ymd = "";
                let wk_kbn = this.kotei_kbn;

                if (this.GetViewDataInf.icrn_inf != null) {
                    //医療保険のデータのみに絞る
                    this.GetViewDataInf.icrn_inf.forEach(function (value) {
                        //区分が医療保険

                        if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {
                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",

                                //基本情報ヘッダの内容を取得
                                value.naiyo.forEach(function (value2) {
                                    if (value2.naiyo_kbn == 0) {
                                        dataflg = true;
                                        data.push(value2);
                                    }
                                    else if (value2.naiyo_kbn == 1) {
                                        tokflg = true;
                                        wk_tok = wk_tok + value2.biko_naiyo;
                                    }
                                });
                        }
                    });

                    //データ格納
                    this.viewClear(); //データクリア
                    this.str_ymd = wk_Ymd;
                    this.pmymd = this.str_ymd;
                    this.pmymd_moto = this.str_ymd;
                    if (data.length > 0) {

                        //フッターラベル
                        //日付順
                        data.sort(function (a, b) {
                            if (b.iryo_insymd < a.iryo_insymd) return -1;
                            if (a.iryo_insymd < b.iryo_insymd) return 1;
                        });

                        let footer = "(最終登録日 : ";
                        footer = footer + data[0].iryo_insymd.substring(0, 4)
                            + "年" + data[0].iryo_insymd.substring(4, 6)
                            + "月" + data[0].iryo_insymd.substring(6)
                            + "日 ";
                        footer = footer + data[0].iryo_instime + " ";
                        footer = footer + data[0].iryo_siname + ")";
                        document.getElementById("footer_008").innerHTML = wjCore.escapeHtml(footer);

                        this.dataflg = dataflg;                         //データ有無
                        this.iryo_id = data[0].iryo_id;                 //医療保険id
                        this.selhokensyu = data[0].iryo_iryohokenid;    //医療保険id
                        this.dispKigo = data[0].iryo_iryokigobango      //記号番号
                        if (tokflg == true) {
                            this.tokflg = tokflg;
                            this.disptok = wk_tok;                        //備考欄
                        }
                        //チェックボックス
                        document.getElementById("chklabel001_id").style.color = "";
                        document.getElementById("chklabel002_id").style.color = "";
                        document.getElementById("chklabel003_id").style.color = "";

                        if (data[0].iryo_syogaijiritu_kbn == 1) {
                            var scales1 = document.getElementById("scales1");
                            scales1.checked = true;
                            document.getElementById("chklabel001_id").style.color = "#0081eb";
                        }
                        if (data[0].iryo_syogaijiritu_kbn == 2) {
                            var scales2 = document.getElementById("scales2");
                            scales2.checked = true;
                            document.getElementById("chklabel002_id").style.color = "#0081eb";
                        }
                        if (data[0].iryo_syogaijiritu_kbn == 3) {
                            var scales3 = document.getElementById("scales3");
                            document.getElementById("chklabel003_id").style.color = "#0081eb";
                            scales3.checked = true;
                        }

                        //ラジオボタン
                        //被保険者
                        if (data[0].iryo_iryohihoken == 1) {
                            this.radio003 = "radio004"
                            document.getElementById("radio004_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio003 = "radio003"
                            document.getElementById("radio003_text").style.color = "#0081eb";
                        }

                        //自立支援医療
                        if (data[0].iryo_syogaijiritu == 1) {
                            this.radio005 = "radio005-Y"
                            document.getElementById("radio005-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio005 = "radio005-N"
                            document.getElementById("radio005-N_text").style.color = "#0081eb";
                        }

                        //特別医療
                        if (data[0].iryo_syogaitokubetu == 1) {
                            this.radio006 = "radio006-Y"
                            document.getElementById("radio006-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio006 = "radio006-N"
                            document.getElementById("radio006-N_text").style.color = "#0081eb";
                        }

                        //その他
                        this.dispsonota = data[0].iryo_syogaisonota_biko;    //その他
                        if (data[0].iryo_syogaisonota == 1) {
                            this.radio007 = "radio007-Y"
                            document.getElementById("radio007-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio007 = "radio007-N"
                            document.getElementById("radio007-N_text").style.color = "#0081eb";
                        }

                        //老人保健医療受給者証
                        if (data[0].iryo_jyukyu_ro_jyukyu == 1) {
                            this.radio008 = "radio008-Y"
                            document.getElementById("radio008-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio008 = "radio008-N"
                            document.getElementById("radio008-N_text").style.color = "#0081eb";
                        }

                        //老人医療費の入院時一部負担金減額認定証
                        if (data[0].iryo_jyukyu_ro_gengaku == 1) {
                            this.radio009 = "radio009-Y"
                            document.getElementById("radio009-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio009 = "radio009-N"
                            document.getElementById("radio009-N_text").style.color = "#0081eb";
                        }
                        //老人保健法健康手帳
                        if (data[0].iryo_jyukyu_ro_kenko == 1) {
                            this.radio010 = "radio010-Y"
                            document.getElementById("radio010-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio010 = "radio010-N"
                            document.getElementById("radio010-N_text").style.color = "#0081eb";
                        }
                        //心身障碍者医療受給者証
                        if (data[0].iryo_sinsyo_jyukyu == 1) {
                            this.radio011 = "radio011-Y"
                            document.getElementById("radio011-Y_text").style.color = "#0081eb";
                        }
                        else {
                            this.radio011 = "radio011-N"
                            document.getElementById("radio011-N_text").style.color = "#0081eb";
                        }
                        this.GetInf_list = data.concat();
                    }
                }
            },
            onItemsSourceChanged(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            },
            onClickCopy() {
                this.Dragflg = false;
                this.Message_Dialog(sysConst.MSG_COPY_CHK, 6);
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
                    this.CopySeldata = result;
                    this.get_data();
                });
            },
            onClickReki: function () {
                this.Dragflg = false;
                this.Rirekiwin = true;
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
            , Click_colse_head() {
                //ヘッダウィンドウクローズ
                this.InsWinhead = false;
            }
            , Click_colse_Reki() {
                //履歴ウィンドウクローズ
                this.Rirekiwin = false;
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
            , onClickdel_reki() {
                //履歴削除ボタン
                this.Message_Dialog("選択している履歴を削除します。\nよろしいですか。", 3);
            }
            , onClickdel_data() {
                //データ削除ボタン
                this.Message_Dialog("入力データを削除します。\nよろしいですか。", 4);
            }
            , onClickins_data() {
                //データ登録ボタン

                //入力チェック
                if (this.selhokensyu == 0) {
                    this.Message_Dialog("保険種類を選択してください。", 0);
                }
                else {
                    this.Message_Dialog("入力データを登録します。\nよろしいですか。", 5);
                }

            }
            , setUserData(wintcode, wSeldata) {
                //利用者選択データ受け取り
                this.inputchk = false;
                this.pdataid = 0;                 //初期化
                this.viewClear();                 //データクリア
                this.GetKihonSelInf = wSeldata;   //表示データ格納
                this.intcode = wintcode;          //利用者コード
                this.DataFilter();                //データ表示
                this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';


                if (this.pdataid == 0) {
                    this.Label_Visible = true;
                }
                else {
                    this.Label_Visible = false;
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
                                    this.insinput_data(1);
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
                        this.viewClear();
                        this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                        this.get_data();
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
                        this.del_rekidata();
                    }
                    else if (this.dialog_Actionflg == 5) {
                        //入力データの登録
                        this.insinput_data();
                    }
                    else if (this.dialog_Actionflg == 6) {
                        //前回コピー
                        this.DataCopy();
                    }
                    else if (this.dialog_Actionflg == 7) {
                        //履歴チェック
                        this.InsWinhead = true;
                    }
                    else if (this.dialog_Actionflg == 8) {
                        //履歴チェック
                        this.dialog_Message_flg = false;
                    }

                }
                else {
                    this.dialo_Yesflg = false;
                    this.dialo_Yesflg_no = 2;
                }

                this.dialog_Message_flg = false;
            }
            , Head_insdata(kbn) {
                //登録データ
                let ins_ymd = this.Ym.format('YYYY') + this.Ym.format('MM') + this.Ym.format('DD');
                let ins_data = this.disprekitanto;

                //新規登録
                let _self = this;
                let wk_dataid = 0;
                let params = [];

                let wk_insflg = sysConst_kotei.INS_KBN_HEAD;
                if (this.headinskbn == 1 && this.insflg == true) {
                    wk_insflg = sysConst_kotei.INS_KBN_HEADAll;
                }

                params =
                {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn,//医療保険
                    intcode: this.intcode,
                    insflg: wk_insflg, //ヘッダ登録
                }

                if (this.insflg == false) {
                    wk_dataid = this.pdataid  //更新の場合dataidをセット
                }

                //登録データ
                let postdata =
                    [
                        {
                            head_jigyoid: this.jigyoid,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,
                            head_dataid: wk_dataid,
                            head_mstid: 0,
                            head_mymd: ins_ymd,
                            head_siid: ins_data,
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

                if (this.insflg == true) {
                    //新規登録

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
                        _self.griddataPost = result.icrn_inf;
                        _self.gridSeldataPost = result;

                        if (document.getElementById("chk_head008").checked == true) {
                            //前回コピーを実施する
                            Kotei_Copy_All(this.uniqid, this.traceid, this.intcode, this.jigyoid, ins_ymd, wk_insflg, sysConst_kotei.KOTEI_ID_KIHON).then();
                        }

                        if (kbn != 1) this.View_upd(this.intcode);  //画面移動の登録時は更新しない
                        this.Message_Dialog(sysConst.MSG_REKI_INS, 0);
                        this.InsWinhead = false;
                    }
                    );
                }
                else {
                    //更新登録
                    putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddataPost = result.icrn_inf;
                        _self.gridSeldataPost = result;
                        if (kbn != 1) this.View_upd(this.intcode);  //画面移動の登録時は更新しない
                        this.Message_Dialog(sysConst.MSG_REKI_UPD, 0);
                        this.InsWinhead = false;
                    });
                }
                this.inputchk = false;
                this.headinskbn = 0;//登録区分初期化
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
            , insinput_data(kbn) {
                this.insflg = false;
                if (this.pmymd != this.pmymd_moto) {
                    this.Head_insdata(1);
                }

                //変数
                let wk_id = this.iryo_id;             //内部id
                let wk_iryohoken = this.selhokensyu;  //医療保険
                let wk_kigobango = this.dispKigo;     //記号番号     
                let wk_sonotatok = this.dispsonota;   //その他特記
                let wk_hihoken = 0;
                let wk_jiritu = 0;
                let wk_tokubetu = 0;
                let wk_sonota = 0;
                let wk_ro_jyukyu = 0;
                let wk_ro_gengaku = 0;
                let wk_ro_kenko = 0;
                let wk_sinsyo_jyukyu = 0;
                let wk_jiritukbn = 0;
                let data_siid = this.login_siid;
                let data_insymd = dayjs().format('YYYYMMDD');
                let data_instime = dayjs().format('HH:mm');

                //備考
                let wk_naiyo = this.splitNaiyo(this.disptok, 256);
                let putdata_biko = [];

                //データ登録ボタン
                let putdata = [];

                if (this.pdataid > 0) {

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

                    //チェックデータ

                    //被保険者            
                    if (this.radio003 == "radio004") {
                        wk_hihoken = 1;
                    }
                    else {
                        wk_hihoken = 0;
                    }

                    //自立            
                    if (this.radio005 == "radio005-Y") {
                        wk_jiritu = 1;
                    }
                    else {
                        wk_jiritu = 0;
                    }

                    //特別医療            
                    if (this.radio006 == "radio006-Y") {
                        wk_tokubetu = 1;
                    }
                    else {
                        wk_tokubetu = 0;
                    }

                    //その他            
                    if (this.radio007 == "radio007-Y") {
                        wk_sonota = 1;
                    }
                    else {
                        wk_sonota = 0;
                    }

                    //受給           
                    if (this.radio008 == "radio008-Y") {
                        wk_ro_jyukyu = 1;
                    }
                    else {
                        wk_ro_jyukyu = 0;
                    }

                    //老人保健医療受給者証            
                    if (this.radio009 == "radio009-Y") {
                        wk_ro_gengaku = 1;
                    }
                    else {
                        wk_ro_gengaku = 0;
                    }

                    //老人保健法健康手帳
                    if (this.radio010 == "radio010-Y") {
                        wk_ro_kenko = 1;
                    }
                    else {
                        wk_ro_kenko = 0;
                    }

                    //心身障碍者医療受給者証
                    if (this.radio011 == "radio011-Y") {
                        wk_sinsyo_jyukyu = 1;
                    }
                    else {
                        wk_sinsyo_jyukyu = 0;
                    }


                    //自立区分チェック
                    if (document.getElementById("scales1").checked == true) {
                        wk_jiritukbn = 1;
                    }
                    else if (document.getElementById("scales2").checked == true) {
                        wk_jiritukbn = 2;
                    }
                    else if (document.getElementById("scales3").checked == true) {
                        wk_jiritukbn = 3;
                    }

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
                        iryo_id: wk_id,
                        iryo_iryohokenid: wk_iryohoken,
                        iryo_iryokigobango: wk_kigobango,
                        iryo_iryohihoken: wk_hihoken,
                        iryo_syogaijiritu: wk_jiritu,
                        iryo_syogaijiritu_kbn: wk_jiritukbn,
                        iryo_syogaitokubetu: wk_tokubetu,
                        iryo_syogaisonota: wk_sonota,
                        iryo_syogaisonota_biko: wk_sonotatok,
                        iryo_jyukyu_ro_jyukyu: wk_ro_jyukyu,
                        iryo_jyukyu_ro_gengaku: wk_ro_gengaku,
                        iryo_jyukyu_ro_kenko: wk_ro_kenko,
                        iryo_sinsyo_jyukyu: wk_sinsyo_jyukyu,
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

                    if (this.dataflg == false) {
                        //新規登録
                        postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                            _self.griddataPost = result.icrn_inf;
                            _self.gridSeldataPost = result;
                        });
                    }
                    else {
                        //更新登録
                        putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata).then((result) => {
                            _self.griddataPut = result.icrn_inf;
                            _self.gridSeldataPut = result;
                        });
                    }

                    params = {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,
                        intcode: this.intcode,
                        insflg: sysConst_kotei.INS_KBN_BIKO, //備考登録
                    }

                    if (wk_naiyo.length > 0) {
                        putdata = ""
                        //備考
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
                        putdata_biko.push(wk_putdata);
                    }

                    //特記登録
                    if (this.tokflg == false) {
                        //特記ないため新規作成
                        postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata_biko).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata = result;
                        });
                    }
                    else {
                        //特記ある-更新
                        putConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', putdata_biko).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata = result;
                        });
                    }

                    this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                    if (kbn != 1) this.View_upd(this.intcode);
                    this.inputchk = false;
                }
                else {
                    this.Message_Dialog(sysConst.MSG_REKI_CRE, 0);
                }
            }
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
            }
            , viewClear() {

                //データクリアボタン
                this.InsWinhead = false;
                this.InsWindata = false;
                this.InsWinflg = false;
                this.insdataflg = false;
                this.insflg = true;

                this.selhokensyu = 0;
                this.dispKigo = ""; //記号番号
                this.disptok = "";   //備考欄
                document.getElementById("scales1").checked = false; //構成
                document.getElementById("scales2").checked = false; //育成
                document.getElementById("scales3").checked = false; //精神通院
                this.radio003 = "radio003"    //被保険者
                this.radio005 = "radio005-N"  //自立支援医療
                this.radio006 = "radio006-N"  //特別医療
                this.radio007 = "radio007-N"  //その他
                this.dispsonota = "";
                this.radio008 = "radio008-N"  //老人保健医療受給者証
                this.radio009 = "radio009-N"  //老人医療費の入院時一部負担金減額認定証
                this.radio010 = "radio010-N"  //老人保健法健康手帳
                this.radio011 = "radio011-N"  //心身障碍者医療受給者証

                this.tokflg = false;          //特記有無フラグ
                this.dataflg = false;         //データフラグ

                //チェッククリア
                document.getElementById("chklabel001_id").style.color = "";
                document.getElementById("chklabel002_id").style.color = "";
                document.getElementById("chklabel003_id").style.color = "";
                document.getElementById("radio004_text").style.color = "";
                document.getElementById("radio003_text").style.color = "";
                document.getElementById("radio005-Y_text").style.color = "";
                document.getElementById("radio005-N_text").style.color = "";
                document.getElementById("radio006-Y_text").style.color = "";
                document.getElementById("radio006-N_text").style.color = "";
                document.getElementById("radio007-Y_text").style.color = "";
                document.getElementById("radio007-N_text").style.color = "";
                document.getElementById("radio008-Y_text").style.color = "";
                document.getElementById("radio008-N_text").style.color = "";
                document.getElementById("radio009-Y_text").style.color = "";
                document.getElementById("radio009-N_text").style.color = "";
                document.getElementById("radio010-Y_text").style.color = "";
                document.getElementById("radio010-N_text").style.color = "";
                document.getElementById("radio011-Y_text").style.color = "";
                document.getElementById("radio011-N_text").style.color = "";

            }
            , onClickclr_data() {
                this.viewClear();
            }
            , check_click(kbn) {
                if (this.Chk_Reki() == true) {
                    this.inputchk = true;//入力チェックT

                    document.getElementById("scales1").checked = false;
                    document.getElementById("scales2").checked = false;
                    document.getElementById("scales3").checked = false;
                    document.getElementById("chklabel001_id").style.color = "#000";
                    document.getElementById("chklabel002_id").style.color = "#000";
                    document.getElementById("chklabel003_id").style.color = "#000";
                    if (kbn == 0) {
                        document.getElementById("scales1").checked = true;
                        document.getElementById("chklabel001_id").style.color = "#0081eb";
                    }
                    if (kbn == 1) {
                        document.getElementById("scales2").checked = true;
                        document.getElementById("chklabel002_id").style.color = "#0081eb";
                    }
                    if (kbn == 2) {
                        document.getElementById("scales3").checked = true;
                        document.getElementById("chklabel003_id").style.color = "#0081eb";
                    }
                }
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
                this.dialog_Actionflg = 7;
                this.Btnno_Visible = false;
                this.dialog_Message_flg = true
            }
            , Chk_Reki: function () {
                //履歴をチェックする
                if (this.pdataid == 0) {
                    this.Message_Dialog_RekiChk(sysConst.MSG_REKI_CRE, 0);
                    return false;
                }
                else {
                    return true;
                }
            }
            , text_input(kbn) {
                //文字数制限とかやる
                this.inputchk = true;
                switch (kbn) {
                    case 0://記号番号
                        {
                            let textarea = document.getElementById("clssinp008-002_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispKigo = textarea.value.substring(0, 20);
                            }
                        }
                        break;

                    case 1://その他
                        {
                            let textarea = document.getElementById("clssinp008-013_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispsonota = textarea.value.substring(0, 20);
                            }
                        }
                        break;

                }
            }

            , click_text(kbn) {
                this.inputchk = true;//入力チェックT

                switch (kbn) {
                    //被保険者
                    case 3:
                        document.getElementById("radio003_text").style.color = "#0081eb";
                        document.getElementById("radio004_text").style.color = "";
                        break;
                    case 4:
                        document.getElementById("radio003_text").style.color = "";
                        document.getElementById("radio004_text").style.color = "#0081eb";
                        break;
                    //自立支援医療
                    case 50:
                        document.getElementById("radio005-N_text").style.color = "#0081eb";
                        document.getElementById("radio005-Y_text").style.color = "";
                        break;
                    case 51:
                        document.getElementById("radio005-N_text").style.color = "";
                        document.getElementById("radio005-Y_text").style.color = "#0081eb";
                        break;
                    //特別医療
                    case 60:
                        document.getElementById("radio006-N_text").style.color = "#0081eb";
                        document.getElementById("radio006-Y_text").style.color = "";
                        break;
                    case 61:
                        document.getElementById("radio006-N_text").style.color = "";
                        document.getElementById("radio006-Y_text").style.color = "#0081eb";
                        break;
                    //その他
                    case 70:
                        document.getElementById("radio007-N_text").style.color = "#0081eb";
                        document.getElementById("radio007-Y_text").style.color = "";
                        break;
                    case 71:
                        document.getElementById("radio007-N_text").style.color = "";
                        document.getElementById("radio007-Y_text").style.color = "#0081eb";
                        break;
                    //老人保健医療受給者証
                    case 80:
                        document.getElementById("radio008-N_text").style.color = "#0081eb";
                        document.getElementById("radio008-Y_text").style.color = "";
                        break;
                    case 81:
                        document.getElementById("radio008-N_text").style.color = "";
                        document.getElementById("radio008-Y_text").style.color = "#0081eb";
                        break;
                    //老人医療費の入院時一時負担金
                    case 90:
                        document.getElementById("radio009-N_text").style.color = "#0081eb";
                        document.getElementById("radio009-Y_text").style.color = "";
                        break;
                    case 91:
                        document.getElementById("radio009-N_text").style.color = "";
                        document.getElementById("radio009-Y_text").style.color = "#0081eb";
                        break;
                    //老人保健健康手帳
                    case 100:
                        document.getElementById("radio010-N_text").style.color = "#0081eb";
                        document.getElementById("radio010-Y_text").style.color = "";
                        break;
                    case 101:
                        document.getElementById("radio010-N_text").style.color = "";
                        document.getElementById("radio010-Y_text").style.color = "#0081eb";
                        break;
                    //心身障碍者医療受給者証
                    case 110:
                        document.getElementById("radio011-N_text").style.color = "#0081eb";
                        document.getElementById("radio011-Y_text").style.color = "";
                        break;
                    case 111:
                        document.getElementById("radio011-N_text").style.color = "";
                        document.getElementById("radio011-Y_text").style.color = "#0081eb";
                        break;
                }

                this.Chk_Reki();
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
                                this.insinput_data(1);
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
            , click_headindkbn(kbn) {
                this.headinskbn = kbn;    //0:個別登録 1:一括登録
            }

            , set_siid(siid) {
                this.disprekitanto = siid;
            }

        }
    }



</script>

<style lang="scss">
/*全体エリア*/
.clssheet-chu008 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 770px;
    position: relative;
}

/*タイトル*/
.clsstitle008-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

/*タイトルエリア*/
.area008-001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

/*右上ボタンエリア*/
.area008-002 {
    display: inline-flex;
    margin-left: 228px;
    width: 10px;
    height: 25px;
}

/*医療保険エリア*/
.area008-003 {
    display: inline-flex;
    margin-top: 20px;
    width: 900px;
    height: 100px;
}

.clsstitle008-003 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    height: 104px !important;
    width: 90px;
    line-height: 104px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.area008-003-001 {
    display: inline-flex;
    width: 200px;
    height: 110px;
    flex-wrap: wrap;
}

.clsstitle008-004 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 3px;
    height: 30px !important;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-005 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 3px;
    height: 30px !important;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-006 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.area008-003-002 {
    display: inline-flex;
    width: 210px;
    height: 110px;
    flex-wrap: wrap;
}

.clssinp008-001 {
    background-color: #ffffff;
    margin-left: 3px;
    width: 200px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;

    /*
    border: 1px solid $light-gray;
    -moz-appearance: menulist;
    -webkit-appearance: menulist;
    display: block;
    background-color: $white;

    &.wShort {
        width: 100px;
    }

    &.wLong {
        width: 300px;
    }

    &.hHigh {
        height: 25px;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: $light-white;
        cursor: pointer;
    }
    */

}


.clssinp008-002 {
    background-color: #ffffff;
    margin-top: 1px;
    margin-left: 3px;
    width: 200px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clssinp008-003 {
    margin-left: 3px;
    margin-top: 0px;
    height: 30px !important;
    text-align: left;
}

.clsstitle008-007 {
    display: inline-flex;
    font-size: 16px;
    margin-left: 3px;
    height: 30px !important;
    width: 40px;
    line-height: 30px;
    text-align: center !important;
}

.clssinp008-004 {
    margin-left: -13px;
    margin-top: 0px;
    height: 30px;
    text-align: left;
}

.clsstitle008-008 {
    display: inline-flex;
    font-size: 16px;
    margin-left: 3px;
    height: 30px !important;
    width: 40px;
    line-height: 30px;
    text-align: center !important;
}

/*障害者医療保険*/
.area008-004 {
    display: inline-flex;
    margin-top: 20px;
    width: 900px;
    height: 100px;
}

.clsstitle008-009 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    height: 105px;
    width: 90px;
    line-height: 105px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.area008-004-001 {
    display: inline-flex;
    width: 200px;
    height: 110px;
    flex-wrap: wrap;
}

.clsstitle008-010 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-011 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 3px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-012 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 3px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.area008-004-002 {
    display: inline-flex;
    width: 150px;
    height: 110px;
    flex-wrap: wrap;
}

.radiogroup001 {
    margin-top: 0px;
    height: 30px;
    //border: 1px solid;
}

.radiogroup002 {
    margin-top: 0px;
    height: 60px;
}

.activeradio {
    /*ラジオボタンアクティブ*/

    margin-left: 3px;
    text-align: left;
}

.clssinp008-005-mu {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-005-ari {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-006-mu {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-006-ari {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-007-mu {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-007-ari {
    margin-left: 3px;
    text-align: left;
}

.area008-004-003 {
    display: inline-flex;
    width: 400px;
    height: 60px;
    flex-wrap: wrap;
}

.chk001 {
    margin-top: -15px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel001 {
    display: inline-flex;
    margin-top: 3px;
    margin-left: 10px;
}

.chk002 {
    margin-top: -15px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel002 {
    display: inline-flex;
    margin-top: 3px;
    margin-left: 10px;
}

.chk003 {
    margin-top: -15px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel003 {
    display: inline-flex;
    margin-top: 3px;
    margin-left: 10px;
}

.chklabel004 {
    display: inline-flex;
    margin-top: 3px;
    margin-left: 3px;
}

.chklabel005 {
    display: inline-flex;
    margin-top: 3px;
    margin-left: 3px;
}

.clssinp008-013 {
    background-color: #ffffff;
    margin-top: 30px;
    margin-left: 3px;
    width: 200px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*受給者証*/
.area008-005 {
    display: inline-flex;
    margin-top: 20px;
    width: 900px;
    height: 100px;
}

.clsstitle008-013 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    height: 159px;
    width: 90px;
    line-height: 159px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.area008-005-001 {
    display: inline-flex;
    width: 200px;
    height: 110px;
    flex-wrap: wrap;
}

.clsstitle008-014 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-015 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 3px;
    margin-left: 3px;
    height: 60px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-016 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 3px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clsstitle008-017 {
    background-color: #dffae0;
    font-size: 16px;
    margin-top: 3px;
    margin-left: 3px;
    height: 30px;
    width: 200px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp008-008-mu {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-008-ari {
    margin-left: 3px;
    text-align: left;
}

.clssinp008-009-mu {
    margin-top: 17px;
    margin-left: 3px;
    text-align: left;
}

.clssinp008-009-ari {
    margin-top: 17px;
    margin-left: 3px;
    text-align: left;
}

.clssinp008-010-mu {
    margin-top: 5px;
    margin-left: 3px;
    text-align: left;
}

.clssinp008-010-ari {
    margin-top: 5px;
    margin-left: 3px;
    text-align: left;
}

.clssinp008-011-mu {
    margin-top: 7px;
    margin-left: 3px;
    text-align: left;
}

.clssinp008-011-ari {
    margin-top: 7px;
    margin-left: 3px;
    text-align: left;
}

/*特記事項エリア*/
.area008-006 {
    margin-top: 75px;
    display: inline-flex;
    width: 950px;
    height: 260px;
}

/*特記事項タイトル*/
.clsstitle008-018 {
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

/*特記事項テキスト*/
.clssinp008-012 {
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
.area008-007 {
    display: inline-flex;
    margin-top: 10px;
    width: 950px;
    height: 25px;
}

/*クリアボタン*/
.clsbtnmenu008-clr {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu008-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu008-ins {
    margin-top: 0px;
    margin-left: 180px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}


//履歴無しラベル1
.clsstitle1_Noreki_back_008 {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.55);
    height: 770px;
    width: 955px;
    line-height: 955px;
    text-align: center;
}

//履歴無しラベル2
.clsstitle1_Noreki_008 {
    border-radius: 10px 10px 10px 10px;
    bottom: 320px;
    left: 327px;
    position: absolute;
    background-color: #f8f8f8;
    padding-top: 3px;
    font-size: 20px;
    font-weight: normal;
    margin-left: 0px;
    height: 130px;
    width: 290px;
    text-align: left;
    border: 1px solid;
    border-color: #adadad;
    line-height: 40px;
    word-wrap: break-word;
    padding-left: 4px;
}
</style>


