<template>
    <v-sheet class="clssheet-chu018" elevation="2">

        <label class="clsstitle1_Noreki_back_018" v-show="Label_Visible">
            <label class="clsstitle1_Noreki_018">履歴が未作成です。
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                履歴作成ボタンから作成してください。</label>
        </label>

        <div class="area018-001">
            <label class="clsstitle018-001">福祉サービス等利用</label>
            <v-card class="ml-2" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">履歴作成</a>
            </v-card>
        </div>


        <label class="clsstitle1_tyosa mt-3" id="Ymd">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

        <v-btn :disabled="Label_Visible == true" id="tyosa_ymd" class="btnymd_kotei ml-1" @click="inputCalendarClick(1)"
            tile width="150px" height="30px">{{ this.pmymd }}
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

        <div class="area018-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
                履歴参照
            </v-btn>
        </div>

        <div class="area018-003">
            <label class="clsstitle018-003">◆公的支援(障害福祉サービス)</label>
        </div>

        <div class="area018-004">
            <wj-flex-grid id="Gridicrn018-id01" class="Gridicrn018-001" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="'AllHeaders'" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid001"
                :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata_syogai" :autoRowHeights="true">

                <wj-flex-grid-column header="サービス内容" binding="kaigo_svstext" :width="185" :wordWrap=true
                    :allowResizing=false multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="提供機関・提供者" binding="kaigo_teikyotext" :width="185" :wordWrap=true
                    :allowResizing=false multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="支援内容" binding="kaigo_sientext" :width="185" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="頻度" binding="kaigo_hindotext" :width="105" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="備考" binding="kaigo_biko" :width="265" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>

            </wj-flex-grid>
        </div>
        <div>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu018-add" @click="onClick_add(0)">
                新規追加
            </v-btn>
        </div>
        <div class="area018-005">
            <label class="clsstitle018-004">◆公的支援(介護保険サービス)</label>
        </div>

        <div class="area018-006">
            <wj-flex-grid id="Gridicrn018-id02" class="Gridicrn018-002" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="'AllHeaders'" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid002"
                :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata_kaigo" :autoRowHeights="true">
                <wj-flex-grid-column header="サービス内容" binding="kaigo_svstext" :width="185" :wordWrap=true
                    :allowResizing=false multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="提供機関・提供者" binding="kaigo_teikyotext" :width="185" :wordWrap=true
                    :allowResizing=false multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="支援内容" binding="kaigo_sientext" :width="185" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="頻度" binding="kaigo_hindotext" :width="105" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="備考" binding="kaigo_biko" :width="265" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
            </wj-flex-grid>
        </div>
        <div>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu018-add" @click="onClick_add(1)">
                新規追加
            </v-btn>
        </div>
        <div class="area018-007">
            <label class="clsstitle018-005">◆その他の支援</label>
        </div>

        <div class="area018-008">
            <wj-flex-grid id="Gridicrn018-id03" class="Gridicrn018-003" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="'AllHeaders'" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid003"
                :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata_sonota" :autoRowHeights="true">
                <wj-flex-grid-column header="サービス内容" binding="kaigo_svstext" :width="185" :wordWrap=true
                    :allowResizing=false multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="提供機関・提供者" binding="kaigo_teikyotext" :width="185" :wordWrap=true
                    :allowResizing=false multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="支援内容" binding="kaigo_sientext" :width="185" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="頻度" binding="kaigo_hindotext" :width="105" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
                <wj-flex-grid-column header="備考" binding="kaigo_biko" :width="265" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>
            </wj-flex-grid>
        </div>
        <div>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu018-add" @click="onClick_add(2)">
                新規追加
            </v-btn>
        </div>
        <div class="area018-009">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu018-clr" @click="onClickclr">
                クリア
            </v-btn>

            <label class="label footer" id="footer_018" style="margin-left: 180px;"></label>

            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu018-ins" @click="onClickins">
                登 録
            </v-btn>
        </div>

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="262">
            <v-sheet id="kakunin_id018" class="clssheet-Mes" elevation="2">
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
            <v-sheet id="rireki_id018" class="clssheet-Reki" elevation="2" @mousedown="win_drag_reki($event)"
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
                    <v-btn :disabled="Label_Visible == true" class="clsbtnmenu018-del" @click="onClickdel">
                        削 除
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>

        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="400">
            <v-sheet class="clssheet-head" elevation="2" id="head_win_id018" @mousedown="win_drag($event)"
                @mousemove="win_move($event)" @mouseup="win_up($event)">
                <div>
                    <div class="areahead all">
                        <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
                        <v-btn margin-left=1px elevation="2" icon small top class="closeButton_win  mt-1" color="red"
                            @click="Click_colse">
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
                        <input class="chkbox mt-1" id="chk_head018" type="checkbox" style="margin-left: 4px;margin-top: 0px !important;">
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

        <!--データ入力ダイアログ-->
        <v-dialog v-model="InsWindata" width="890">
            <v-sheet class="clssheet-chu019" elevation="2">
                <div class="area019-001">
                    <label class="clsstitle019-001">福祉ｻｰﾋﾞｽ</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse_data">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div v-show="false" class="area019-002">
                    <v-btn-toggle color="yellow" v-model="selected_btn" mandatory>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataIns_click">
                            新規追加
                        </v-btn>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataUpd_click">
                            修正登録
                        </v-btn>
                    </v-btn-toggle>
                </div>

                <div class="area019-009">
                    <div class="area019-008">
                        <div class="area019-003">
                            <label class="clsstitle019-002">サービス内容</label>
                            <input type="text" id="clssinp019-001_id" class="clssinp019-001" v-model="dispsvc_text"
                                @click="text_click(1)" @input="text_input(0)">
                        </div>

                        <div class="area019-004">
                            <label class="clsstitle019-003">提供機関・提供</label>
                            <input type="text" id="clssinp019-002_id" class="clssinp019-002" v-model="dispkankei_text"
                                @click="text_click(2)" @input="text_input(1)">
                        </div>

                        <div class="area019-005">
                            <label class="clsstitle019-004">支援内容</label>
                            <input type="text" id="clssinp019-003_id" class="clssinp019-003" v-model="dispsien_text"
                                @click="text_click(3)" @input="text_input(2)">
                        </div>

                        <div class="area019-006">
                            <label class="clsstitle019-005">頻度</label>
                            <input type="text" id="clssinp019-004_id" class="clssinp019-004" v-model="disphindo_text"
                                @click="text_click(4)" @input="text_input(3)">
                        </div>

                        <div class="area019-007">
                            <label class="clsstitle019-006">備考</label>
                            <textarea id="clssinp019-005_id" class="clssinp019-005" v-model="dispbiko_text"
                                @click="text_click(5)" @input="text_input(4)"></textarea>
                        </div>
                    </div>
                    <div class="area019-010">
                        <div class="areakankeibtn">
                            <div class="areakankeibtn" v-show="this.inputMstflg == 2">
                                <!--切替ボタンエリア-->
                                <v-btn-toggle class="ml-1" v-model="selected_btn2" mandatory>
                                    <v-btn small elevation="2" class="clsbtnmenu-standard" @click="onsisetu_click(0)">
                                        自施設
                                    </v-btn>
                                    <v-btn small elevation="2" class="clsbtnmenu-standard ml-1" @click="onsisetu_click(1)">
                                        他施設
                                    </v-btn>
                                </v-btn-toggle>
                            </div>
                        </div>


                        <div class="arearadio018">
                            <div class="arearadio018-2" v-show="this.inputMstflg == 2 && radio_visible">
                                <v-radio-group row v-model="radiojigyo" class="radiogroup001">
                                    <v-radio id="radio_jigyo_j" class="radio_jigyo" value="radio_J"
                                        @click="click_radio(0)">s
                                        <template v-slot:label>
                                            <div id="radio_jigyo_text">事業</div>
                                        </template>
                                    </v-radio>
                                    <v-radio id="radio_jigyo_k" class="radio_jigyo" value="radio_K" @click="click_radio(1)">
                                        <template v-slot:label>
                                            <div id="radio_koteki_text">公的</div>
                                        </template>
                                    </v-radio>
                                    <v-radio id="radio_jigyo_h" class="radio_jigyo" value="radio_H" @click="click_radio(2)">
                                        <template v-slot:label>
                                            <div id="radio_hoka_text">他</div>
                                        </template>
                                    </v-radio>
                                </v-radio-group>
                            </div>
                        </div>

                        <wj-flex-grid id="Gridicrn019-id01" class="Gridicrn019-001" :headersVisibility="'Column'"
                            :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                            :allowMerging="true" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                            :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGridwin"
                            :itemsSourceChanged="onItemsSourceChanged_win" :itemsSource="viewinputdata"
                            :autoRowHeights="true">
                            <wj-flex-grid-column header="サービス種類" binding="name1" :width="140" :wordWrap=true
                                :allowMerging=true :allowResizing=false></wj-flex-grid-column>
                            <wj-flex-grid-column header="サービス種類" binding="name2" :width="235" :wordWrap=true
                                :allowMerging=true :allowResizing=false></wj-flex-grid-column>

                        </wj-flex-grid>
                    </div>

                </div>

                <div class="area019-011">
                    <v-btn class="clsbtnmenu019-clr" @click="onClickclr_data">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu019-del" @click="onClickdel_data">
                        削 除
                    </v-btn>
                    <v-btn class="clsbtnmenu019-ins" @click="onClickins_data">
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
import * as wjCore from '@grapecity/wijmo';
import dayjs from 'dayjs';
import sysConst from '../../../utiles/const';
import sysConst_kotei from '../../../utiles/const_kotei';
import { getConnect } from '../../../connect/getConnect';
import { postConnect } from '../../../connect/postConnect';
import { putConnect } from '../../../connect/putConnect';
import { deleteConnect } from '../../../connect/deleteConnect';
import {Kotei_Copy_All} from '../../../js/koteiinf/kotei_common';

const INPUTSYUBETU_SYOGAI = 1;      //障害
const INPUTSYUBETU_KAIGO = 2;       //介護
const INPUTSYUBETU_SONOTA = 3;      //その他
const INPUTMST_KBN_SVC = 1;         //サービス内容
const INPUTMST_KBN_KIKAN = 2;       //関係機関
const INPUTMST_KBN_SIEN = 3;        //支援内容
const INPUTMST_KBN_HINDO = 4;       //頻度 




export default
    {
        props: ["ymd", "uniqid", "traceid", "jigyoid", "kotei_kbn", "login_siid"],
        data() {
            return {
                str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",

                InsWinflg: false,
                viewdata: [],               //グリッド表示データ
                viewdata_syogai: [],        //グリッド表示データ(障害)
                viewdata_kaigo: [],         //グリッド表示データ(介護)
                viewdata_sonota: [],         //グリッド表示データ(その他)


                viewdata_reki: [],       //履歴グリッド表示データ

                //データ表示用
                picker: '',
                pdataid: '',           //ヘッダデータid
                intcode: 0,            //表示しているintcode
                pmymd: '',             //表示しているMYMD
                pmymd_moto: '',        //表示している元MYMD 
                griddata: [],          //API取得データ
                gridSeldata: [],       //API取得データ(履歴)
                GetViewDataInf: [],    //API取得データ(データ)

                //ダイアログ表示用引数
                selected_btn: 0,
                selected_btn2: 0,
                InsWinhead: false,
                InsWindata: false,
                Rirekiwin: false,
                dispymdhead: "",
                datepicker_dialog_head: false,
                datepicker_dialog_tyosa: false, //調査日カレンダー
                headinskbn: 0,   //0:個別登録 1:一括登録

                //履歴作成アナウンス
                Label_Visible: false,

                //dragflg
                Dragflg: false,
                mouseX: 0,
                mouseY: 0,
                screenX: 0,
                screenY: 0,
                moveX: 0,
                moveY: 0,

                //確認ダイアログ
                dialog_Message_flg: false,
                Dialog_Message: '',       //ダイアログメッセージ
                dialo_Yesflg: false,      //ダイアログ結果
                dialo_Yesflg_no: 0,
                Btnno_Visible: false,     //「いいえ」ボタン表示設定     

                //入力チェック
                inputchk: false,

                //データ入力ウィンドウ
                dispscntid: 0,
                dispsjun: 0,
                dispsyubetu: 0,
                dispsvc_text: "",
                dispkankei_text: "",
                dispsien_text: "",
                disphindo_text: "",
                dispbiko_text: "",
                insdataflg: false,         //F:新規 T:更新
                inputMstflg: 1,            //1:障害サービス 2:関係機関 3:支援内容 4:頻度
                dispsvcdaiid: 0,           //選択したサービスのID
                dispsvctyuid: 0,           //選択したサービスのID
                radiojigyo: 'radio_J',
                radio_visible: false,
                disprekitanto: 0,

                Get_inputinf_hindo: this.get_inputdata(),  //頻度入力
                Get_inputinf_syogai: [],                   //障害サービス
                Get_inputinf_kaigo: [],                    //介護サービス

                //マスタグリッド用リスト
                viewinputdata: [],
                Mst_hindo: [],
                Mst_syogaisvc: [],
                Mst_kaigosvc: [],
                Mst_siensvc: [],
                MstList_JI: [],   //グリッドの表示されるデータ(自施設)
                MstList_TA: [],   //グリッドの表示されるデータ(他施設(事業))
                MstList_KO: [],   //グリッドの表示されるデータ(他施設(公的))
                MstList_HO: [],   //グリッドの表示されるデータ(他施設(他))                

            };
        },
        methods: {
            get_inputdata() {
                //頻度を取得

                //API取得
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                };
                getConnect('/Mst_hindo', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf_hindo = result;
                    this.Sethindo();
                });

                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                    pSrcType: 1,
                    pYmd: this.ymd,
                };
                getConnect('/Mst_syogaisvc', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf_syogai = result;
                    this.Setsyogaisvc();
                });

                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                    pSrcType: 1,
                    pYmd: this.ymd,
                };
                getConnect('/Mst_kaigosvc', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf_kaigo = result;
                    this.Setkaigosvc();
                });

                //API取得
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                    pYmd: this.ymd
                };

                getConnect('/Mst_kankei', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf = result;
                    this.SetKankeiInput();
                });

            }
            , Sethindo() {
                //頻度サービス
                let wk_data = [];
                let wk_list = [];

                if (this.Get_inputinf_hindo.icrn_inf != null) {
                    this.Get_inputinf_hindo.icrn_inf.forEach(function (value) {
                        wk_data = {
                            name1: value.names,
                            name2: value.names,
                            id1: 0,
                            id2: 0,
                        }
                        wk_list.push(wk_data);
                    });
                    this.Mst_hindo = wk_list.concat();
                }
            }
            , Disphindo() {
                this.viewinputdata = this.Mst_hindo.concat();
            }
            , Setsyogaisvc() {
                //障害サービス
                let wk_dai = "";
                let wk_daiid = 0;
                let wk_tyu = "";
                let wk_tyuid = 0;
                let wk_data = [];
                let wk_list = [];

                if (this.Get_inputinf_syogai.icrn_inf != null) {
                    this.Get_inputinf_syogai.icrn_inf.daiList.forEach(function (value) {
                        wk_dai = value.svcName;
                        wk_daiid = value.daiID;
                        value.tyuList.forEach(function (value2) {
                            wk_tyu = value2.tyuName;
                            wk_tyuid = value2.tyuID;
                            wk_data = {
                                name1: wk_dai,
                                name2: wk_tyu,
                                id1: wk_daiid,
                                id2: wk_tyuid,
                            }
                            wk_list.push(wk_data);
                        });
                    });
                    this.Mst_syogaisvc = wk_list.concat();
                }
            }
            , Dispsyogaisvc() {
                this.viewinputdata = this.Mst_syogaisvc.concat();
            }

            , Setkaigosvc() {
                //介護サービス
                let wk_dai = "";
                let wk_daiid = 0;
                let wk_tyu = "";
                let wk_tyuid = 0;
                let wk_data = [];
                let wk_list = [];

                if (this.Get_inputinf_kaigo.icrn_inf != null) {
                    this.Get_inputinf_kaigo.icrn_inf.forEach(function (value) {
                        wk_dai = value.daiName;
                        wk_daiid = value.daiID;
                        value.tyuList.forEach(function (value2) {
                            wk_tyu = value2.tyuName;
                            wk_tyuid = value2.tyuID;
                            wk_data = {
                                name1: wk_dai,
                                name2: wk_tyu,
                                id1: wk_daiid,
                                id2: wk_tyuid,
                            }
                            wk_list.push(wk_data);
                        });
                    });
                    this.Mst_kaigosvc = wk_list.concat();
                }
            }
            , Dispkaigosvc() {
                this.viewinputdata = this.Mst_kaigosvc.concat();
            }
            , Dispsien() {
                //障害サービス
                let wk_daiid = this.dispsvcdaiid;
                let wk_tyuid = this.dispsvctyuid;
                let wk_data = [];
                let wk_list = [];

                if (this.Get_inputinf_syogai.icrn_inf != null) {
                    this.Get_inputinf_syogai.icrn_inf.daiList.forEach(function (value) {
                        if (value.daiID == wk_daiid) //サービスの大項目と一致
                        {
                            value.tyuList.forEach(function (value2) {
                                if (value2.tyuID == wk_tyuid) {
                                    value2.syoList.forEach(function (value3) {
                                        wk_data = {
                                            name1: value3.naiyo,
                                            name2: value3.naiyo,
                                            id1: 0,
                                            id2: 0,
                                        }
                                        wk_list.push(wk_data);
                                    });
                                }
                            });
                        }
                    });
                    this.Mst_siensvc = wk_list.concat();
                    this.viewinputdata = this.Mst_siensvc.concat();
                }
            }
            , SetKankeiInput() {
                //#####関係期間の画面表示を行う#####

                let wk_kankei_data = [];
                let kankei_data_ji = [];
                let kankei_data_ta = [];
                let kankei_data_ko = [];
                let kankei_data_ho = [];
                let wk_ryaku = "";      //略(VB側同様同事業者名は表示しない)
                let wk_name = "";       //名称
                let wk_jigyokbn = "";   //事業者区分 1:自施設 2:他施設
                let wk_kbn = "";        //区分 1;事業 2:公的 3:他

                //関係機関
                if (this.Get_inputinf.icrn_inf != null) {
                    //取得したデータを確保
                    this.Get_inputinf.icrn_inf.forEach(function (value) {
                        if (wk_ryaku != value.ryaku) {
                            wk_name = value.names;        //名称
                            wk_jigyokbn = value.jiTaFlg;  //事業者区分 1:自施設 2:他施設
                            wk_kbn = value.kbn;           //区分 1;事業 2:公的 3:他
                            wk_ryaku = value.ryaku;

                            wk_kankei_data =
                            {
                                name1: wk_name,
                                name2: wk_name,
                                id1: 0,
                                id2: 0,
                            }

                            if (wk_jigyokbn == 1) {
                                //自施設
                                kankei_data_ji.push(wk_kankei_data);
                            }
                            else {
                                //他施設
                                switch (wk_kbn) {
                                    case 1: //事業
                                        kankei_data_ta.push(wk_kankei_data);
                                        break;
                                    case 2: //公的
                                        kankei_data_ko.push(wk_kankei_data);
                                        break;
                                    case 3: //他
                                        kankei_data_ho.push(wk_kankei_data);
                                        break;
                                }
                            }
                        }
                    });
                    this.MstList_JI = kankei_data_ji.concat();
                    this.MstList_TA = kankei_data_ta.concat();
                    this.MstList_KO = kankei_data_ko.concat();
                    this.MstList_HO = kankei_data_ho.concat();
                }
            }
            , DispKankeiInput() {
                this.viewinputdata = this.MstList_JI.concat();
            }
            , DispKankeiInput_ta() {
                this.viewinputdata = this.MstList_TA.concat();
            }

            , onInitializeIcrnGrid001(flexGrid) {
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn018-001";

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].max = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header018'
                flexGrid.cells.rows.defaultSize = 35;
                flexGrid.alternatingRowStep = 0;

                this.flex_syogai = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_syogai(e) }.bind(this));

                flexGrid.endUpdate();
            }
            , grid_click_syogai(e) {
                //障害グリッドクリック
                if (this.Chk_Reki() == true) {
                    this.InsWindata = true;
                    var ht = this.flex_syogai.hitTest(e);

                    if (ht.row >= 0) {
                        this.dispscntid = this.viewdata_syogai[ht.row].kaigo_cntid;
                        this.dispsjun = this.viewdata_syogai[ht.row].kaigo_jun;
                        this.dispsyubetu = INPUTSYUBETU_SYOGAI;
                        this.dispsvc_text = this.viewdata_syogai[ht.row].kaigo_svstext;
                        this.dispkankei_text = this.viewdata_syogai[ht.row].kaigo_teikyotext;
                        this.dispsien_text = this.viewdata_syogai[ht.row].kaigo_sientext;
                        this.disphindo_text = this.viewdata_syogai[ht.row].kaigo_hindotext;
                        this.dispbiko_text = this.viewdata_syogai[ht.row].kaigo_biko;

                        this.selected_btn = 1;    //更新
                        this.insdataflg = true;   //更新フラグ

                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_SVC;
                        this.Dispsyogaisvc();     //ﾏｽﾀｸﾞﾘｯﾄﾞの初期表示
                    }
                    else {
                        this.dispscntid = 0;
                        this.dispsjun = 0;
                        this.dispsyubetu = INPUTSYUBETU_SYOGAI;
                        this.dispsvc_text = "";
                        this.dispkankei_text = "";
                        this.dispsien_text = "";
                        this.disphindo_text = "";
                        this.dispbiko_text = "";

                        this.selected_btn = 0;    //新規
                        this.insdataflg = false;  //新規フラグ                  
                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_SVC;
                        this.Dispsyogaisvc();     //ﾏｽﾀｸﾞﾘｯﾄﾞの初期表示
                    }

                }
            }

            , onInitializeIcrnGrid002(flexGrid) {
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn018-002";

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].max = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header018'
                flexGrid.cells.rows.defaultSize = 20;
                flexGrid.alternatingRowStep = 0;

                this.flex_kaigo = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_kaigo(e) }.bind(this));

                flexGrid.endUpdate();
            }

            , grid_click_kaigo(e) {
                //介護グリッドクリック

                if (this.Chk_Reki() == true) {
                    this.InsWindata = true;
                    var ht = this.flex_kaigo.hitTest(e);

                    if (ht.row >= 0) {
                        this.dispscntid = this.viewdata_kaigo[ht.row].kaigo_cntid;
                        this.dispsjun = this.viewdata_kaigo[ht.row].kaigo_jun;
                        this.dispsyubetu = INPUTSYUBETU_KAIGO;
                        this.dispsvc_text = this.viewdata_kaigo[ht.row].kaigo_svstext;
                        this.dispkankei_text = this.viewdata_kaigo[ht.row].kaigo_teikyotext;
                        this.dispsien_text = this.viewdata_kaigo[ht.row].kaigo_sientext;
                        this.disphindo_text = this.viewdata_kaigo[ht.row].kaigo_hindotext;
                        this.dispbiko_text = this.viewdata_kaigo[ht.row].kaigo_biko;

                        this.selected_btn = 1;    //更新
                        this.insdataflg = true;   //更新フラグ

                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_SVC;
                        this.Dispkaigosvc();     //ﾏｽﾀｸﾞﾘｯﾄﾞの初期表示

                    }
                    else {
                        this.dispscntid = 0;
                        this.dispsjun = 0;
                        this.dispsyubetu = INPUTSYUBETU_KAIGO;
                        this.dispsvc_text = "";
                        this.dispkankei_text = "";
                        this.dispsien_text = "";
                        this.disphindo_text = "";
                        this.dispbiko_text = "";

                        this.selected_btn = 0;    //新規
                        this.insdataflg = false;  //新規フラグ                  
                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_SVC;
                        this.Dispkaigosvc();     //ﾏｽﾀｸﾞﾘｯﾄﾞの初期表示                  
                    }
                }
            }

            , onInitializeIcrnGrid003(flexGrid) {
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn018-003";

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].max = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header018'
                flexGrid.cells.rows.defaultSize = 20;
                flexGrid.alternatingRowStep = 0;

                this.flex_sonota = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_sonota(e) }.bind(this));

                flexGrid.endUpdate();
            }

            , grid_click_sonota(e) {
                //その他グリッドクリック

                if (this.Chk_Reki() == true) {
                    this.InsWindata = true;
                    var ht = this.flex_sonota.hitTest(e);

                    if (ht.row >= 0) {
                        this.dispscntid = this.viewdata_sonota[ht.row].kaigo_cntid;
                        this.dispsjun = this.viewdata_sonota[ht.row].kaigo_jun;
                        this.dispsyubetu = INPUTSYUBETU_SONOTA;
                        this.dispsvc_text = this.viewdata_sonota[ht.row].kaigo_svstext;
                        this.dispkankei_text = this.viewdata_sonota[ht.row].kaigo_teikyotext;
                        this.dispsien_text = this.viewdata_sonota[ht.row].kaigo_sientext;
                        this.disphindo_text = this.viewdata_sonota[ht.row].kaigo_hindotext;
                        this.dispbiko_text = this.viewdata_sonota[ht.row].kaigo_biko;

                        this.selected_btn = 1;    //更新
                        this.insdataflg = true;   //更新フラグ
                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_KIKAN;
                        this.selected_btn2 = 1; //他事業所
                        this.radio_visible = true;
                        this.DispKankeiInput_ta();

                    }
                    else {
                        this.dispscntid = 0;
                        this.dispsjun = 0;
                        this.dispsyubetu = INPUTSYUBETU_SONOTA;
                        this.dispsvc_text = "";
                        this.dispkankei_text = "";
                        this.dispsien_text = "";
                        this.disphindo_text = "";
                        this.dispbiko_text = "";

                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_KIKAN;
                        this.selected_btn2 = 1; //他事業所
                        this.radio_visible = true;
                        this.DispKankeiInput_ta();
                    }
                }
            }

            , onClick_add(kbn) {
                //各サービスの新規追加ボタン

                switch (kbn) {
                    case 0: //障害
                        this.dispscntid = 0;
                        this.dispsjun = 0;
                        this.dispsyubetu = INPUTSYUBETU_SYOGAI;
                        this.dispsvc_text = "";
                        this.dispkankei_text = "";
                        this.dispsien_text = "";
                        this.disphindo_text = "";
                        this.dispbiko_text = "";

                        this.selected_btn = 0;    //新規
                        this.insdataflg = false;  //新規フラグ                  
                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_SVC;
                        this.Dispsyogaisvc();     //ﾏｽﾀｸﾞﾘｯﾄﾞの初期表示                
                        break;
                    case 1: //介護
                        this.dispscntid = 0;
                        this.dispsjun = 0;
                        this.dispsyubetu = INPUTSYUBETU_KAIGO;
                        this.dispsvc_text = "";
                        this.dispkankei_text = "";
                        this.dispsien_text = "";
                        this.disphindo_text = "";
                        this.dispbiko_text = "";

                        this.selected_btn = 0;    //新規
                        this.insdataflg = false;  //新規フラグ       
                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_KIKAN;
                        this.Dispkaigosvc();     //ﾏｽﾀｸﾞﾘｯﾄﾞの初期表示           
                        break;
                    case 2: //その他
                        this.dispscntid = 0;
                        this.dispsjun = 0;
                        this.dispsyubetu = INPUTSYUBETU_SONOTA;
                        this.dispsvc_text = "";
                        this.dispkankei_text = "";
                        this.dispsien_text = "";
                        this.disphindo_text = "";
                        this.dispbiko_text = "";

                        //入力欄の初期表示
                        this.inputMstflg = INPUTMST_KBN_KIKAN;
                        this.selected_btn = 0;    //新規
                        this.insdataflg = false;  //新規フラグ  
                        this.selected_btn2 = 1;   //他事業所
                        this.radio_visible = true;
                        this.DispKankeiInput_ta();
                        break;
                }
                this.InsWindata = true;
            }

            , onClickCopy() {
                //前回コピーボタン押下時
                this.Dragflg = false;
                this.Message_Dialog(sysConst.MSG_COPY_CHK, 6);
            },
            datacopy() {
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
                    this.get_data();
                });
            }
            , onClickReki: function () {
                this.Rirekiwin = true;
            }

            //カレンダー関係
            , getYm() {
                if (!this.Ym) {
                    this.Ym = dayjs();
                    this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
                }
                return (
                    this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
                );
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
                    this.picker = this.pmymd.replace("年", "-");
                    this.picker = this.picker.replace("月", "-");
                    this.picker = this.picker.replace("日", "");
                    this.inputchk = true;
                    this.datepicker_dialog_tyosa = true;
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
            , Message_Dialog(Message, kbn) {
                //汎用メッセージダイアログ
                this.Dragflg = false;
                this.Dialog_Message = Message;
                this.dialog_Actionflg = kbn;  //メッセージのみ
                this.Btnno_Visible = false;
                if (kbn > 0) { this.Btnno_Visible = true }
                this.dialog_Message_flg = true
            }

            , onClick_Massege(kbn) {
                //確認ダイアログ判定
                if (kbn == 0) {
                    this.dialo_Yesflg = true;
                    this.dialo_Yesflg_no = 1;
                    if (this.dialog_Actionflg == 1) {
                        //履歴の新規追加
                        this.Head_insData();
                    }
                    else if (this.dialog_Actionflg == 2) {
                        //履歴の更新追加
                        this.insflg = false;
                        this.Head_insData();
                    }
                    else if (this.dialog_Actionflg == 3) {
                        //履歴の削除
                        this.del_rekidata();
                    }
                    else if (this.dialog_Actionflg == 4) {
                        //データの登録
                        this.ins_data();
                    }
                    else if (this.dialog_Actionflg == 5) {
                        //データの削除
                        this.del_data();
                    }
                    else if (this.dialog_Actionflg == 6) {
                        //前回コピー
                        this.datacopy();
                    }
                    else if (this.dialog_Actionflg == 7) {
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
                this.viewinputdata = [];
                this.viewdata_syogai = [];
                this.viewdata_kaigo = [];
                this.viewdata_sonota = [];
            }

            //フィルター
            , DataFilter() {
                let data = [];
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.gridSeldata.icrn_inf != null) {
                    //福祉サービスのデータのみに絞る
                    this.gridSeldata.icrn_inf.forEach(function (value) {

                        //区分が福祉サービス
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

                            //福祉サービスの内容を取得
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

            , get_data() {
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

                    pJigyoid: this.jigyoid,
                    Kbn: this.kotei_kbn,             //福祉サービス
                    Dataid: this.pdataid,
                    Modeflg: sysConst_kotei.GET_KBN_DATA,                 //データ取得
                };

                getConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF').then((result) => {
                    _self.GetViewDataInf = result;
                    this.DataFilter2();
                })
            }

            , DataFilter2() {
                let data = [];
                let data_syogai = [];   //障害
                let data_kaigo = [];    //介護
                let data_sonota = [];   //その他

                let wdataid = this.pdataid;
                let wk_Ymd = "";
                let wk_kbn = this.kotei_kbn;

                if (this.GetViewDataInf.icrn_inf != null) {
                    //福祉サービスのデータのみに絞る
                    this.GetViewDataInf.icrn_inf.forEach(function (value) {

                        //区分が福祉サービス
                        if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {

                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",

                                //福祉サービスの内容を取得
                                value.naiyo.forEach(function (value2) {
                                    data.push(value2);
                                });
                        }
                    });

                    if (wk_Ymd == "") {
                        wk_Ymd = this.pmymd
                    }

                    this.str_ymd = wk_Ymd;
                    this.pmymd = this.str_ymd;
                    this.pmymd_moto = this.str_ymd;

                    //登録データを種別で分ける
                    data.forEach(function (value) {

                        switch (value.kaigo_syubetu) {
                            case 1: //障害福祉サービス
                                data_syogai.push(value);
                                break;
                            case 2: //介護保険サービス
                                data_kaigo.push(value);
                                break;
                            case 3: //その他
                                data_sonota.push(value);
                                break;
                        }
                    });

                    this.viewdata = data.concat();  //全体データ
                    this.viewdata_syogai = data_syogai.concat();  //障害
                    this.viewdata_kaigo = data_kaigo.concat();    //介護
                    this.viewdata_sonota = data_sonota.concat();  //その他

                    if (data.length > 0) {
                        //日付順
                        data.sort(function (a, b) {
                            if (b.kaigo_insymd < a.kaigo_insymd) return -1;
                            if (a.kaigo_insymd < b.kaigo_insymd) return 1;
                        });

                        let footer = "(最終登録日 : ";
                        footer = footer + data[0].kaigo_insymd.substring(0, 4)
                            + "年" + data[0].kaigo_insymd.substring(4, 6)
                            + "月" + data[0].kaigo_insymd.substring(6)
                            + "日 ";
                        footer = footer + data[0].kaigo_instime + " ";
                        footer = footer + data[0].kaigo_siname + ")";
                        document.getElementById("footer_018").innerHTML = wjCore.escapeHtml(footer);
                    }

                }
            }
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
            }

            //####新規登録関係####
            , onHeadclick_ins() {
                this.Ym = dayjs();
                this.dispymdhead = this.getYm();

                //新規ボタンクリックイベント
                this.InsWinhead = true;
                this.insflg = true;//新規登録
            }

            , onHead_ins() {
                if (this.insflg == true) {
                    this.Message_Dialog("履歴を新規登録します。\nよろしいですか。", 1);
                }
                else {
                    this.Message_Dialog("履歴を更新登録します。\nよろしいですか。", 2);
                }
            }

            , Head_insData(kbn) {
                //kbn:1 画面遷移時の登録 リロードしない

                //履歴の登録処理
                let ins_ymd = this.Ym.format('YYYY') + this.Ym.format('MM') + this.Ym.format('DD');
                let ins_siid = this.disprekitanto;

                //新規登録
                let _self = this;
                let params = [];
                let wk_insflg = sysConst_kotei.INS_KBN_HEAD;
                if (this.headinskbn == 1 && this.insflg == true) {
                    wk_insflg = sysConst_kotei.INS_KBN_HEADAll;
                }
                params =
                {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn,//介護福祉
                    intcode: this.intcode,
                    insflg: wk_insflg, //ヘッダ登録
                }

                //登録データ
                let postdata =
                    [
                        {
                            head_jigyoid: this.jigyoid,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,  //介護福祉
                            head_dataid: this.pdataid,
                            head_mstid: 0,
                            head_mymd: ins_ymd,
                            head_siid: ins_siid,
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
                            Kankei_kikanid_kbn: 0,
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

                if (this.insflg == true) {
                    if (wk_insflg == sysConst_kotei.INS_KBN_HEADAll) {
                        postConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', postdata).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata_kazoku = result;
                        });
                        postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', postdata).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata_honnin = result;
                        });

                    }
                    postConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (document.getElementById("chk_head018").checked == true) {
                            //前回コピーを実施する
                            Kotei_Copy_All(this.uniqid, this.traceid, this.intcode, this.jigyoid, ins_ymd, wk_insflg, sysConst_kotei.KOTEI_ID_KIHON).then();
                        }
                        if (kbn != 1) this.View_upd(this.intcode);
                        //メッセージ
                        this.Message_Dialog(sysConst.MSG_REKI_INS);
                        this.InsWinhead = false;
                    });
                }
                else {
                    putConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_REKI_UPD);
                        this.InsWinhead = false;
                    });
                }
                this.headinskbn = 0;//登録区分初期化
            }
            , Click_colse() {
                this.InsWinhead = false;
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
                                this.ins_data();
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

            , onItemsSourceChanged(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            }

            //####履歴####
            , Click_colse_Reki() {
                //履歴ウィンドウ
                this.Rirekiwin = false;
            }

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

            , grid_clickreki(e) {
                //履歴クリック

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
                                    this.Head_insData(1);
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
                        this.pmymd = this.viewdata_reki[ht.row].head_mymd;
                        this.get_data();
                    }

                }

            }

            , input_chk: function () {
                //入力項目があれば登録メッセージ
                if (this.inputchk == true) {
                    this.Message_Dialog("登録されていない項目があります。\n 登録しますか。", 7);
                }
            }

            //#### 登録・削除・クリア
            , onClickins() {
                //データ登録ボタン
                this.Message_Dialog("履歴を更新登録します。\nよろしいですか", 2);
            }

            , onClickdel() {
                //データ登録ボタン
                this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK, 3);
            }
            , del_rekidata() {
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
                    cntid: 0,
                    lcnt: 0,
                    headflg: sysConst_kotei.DEL_KBN_REKI,
                }

                //削除処理
                deleteConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddatadel = result.icrn_inf;
                    _self.gridSeldatadel = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_DEL, 0);
                });
            }

            , onClickclr() {
                //クリアボタン
            }

            , win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_id018");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_id018");
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
            }

            //#####確認メッセージ#####
            , win_drag_Msg: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("kakunin_id018");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_Msg: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("kakunin_id018");
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
                var wdialog = document.getElementById("rireki_id018");
                if (wdialog.style.bottom == "") {
                    wdialog.style.bottom = (window.innerHeight - 210) / 2 + "px";
                }
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 280) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_reki: function (e) {
                //履歴参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("rireki_id018");
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
            }

            //データ入力ウィンドウ
            , text_click(kbn) {
                switch (kbn) {
                    case INPUTMST_KBN_SVC://サービス内容
                        switch (this.dispsyubetu) {
                            case INPUTSYUBETU_SYOGAI:
                                this.inputMstflg = INPUTMST_KBN_SVC;
                                this.Dispsyogaisvc();
                                break;
                            case INPUTSYUBETU_KAIGO:
                                this.inputMstflg = INPUTMST_KBN_SVC;
                                this.Dispkaigosvc();
                                break;
                            case INPUTSYUBETU_SONOTA:
                                break;

                        }
                        break;
                    case INPUTMST_KBN_KIKAN://関係機関

                        switch (this.dispsyubetu) {
                            case INPUTSYUBETU_SYOGAI:
                                this.inputMstflg = INPUTMST_KBN_KIKAN;
                                this.DispKankeiInput();
                                break;
                            default:
                                this.inputMstflg = INPUTMST_KBN_KIKAN;
                                this.selected_btn2 = 1; //他事業所
                                this.radio_visible = true;
                                this.DispKankeiInput_ta();
                                break;

                        }
                        break;
                    case INPUTMST_KBN_SIEN://支援内容
                        if (this.dispsyubetu == INPUTSYUBETU_SYOGAI) //障害の場合のみ
                        {
                            this.Dispsien();
                            this.inputMstflg = INPUTMST_KBN_SIEN;
                        }

                        break;
                    case INPUTMST_KBN_HINDO://頻度
                        this.inputMstflg = INPUTMST_KBN_HINDO;
                        this.Disphindo();
                        break;
                }
            }

            , text_input(kbn) {
                //文字数制限とかやる
                this.inputchk = true;

                switch (kbn) {
                    case 0://サービス内容
                        {
                            let textarea = document.getElementById("clssinp019-001_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispsvc_text = textarea.value.substring(0, 20);
                            }
                        }
                        break;
                    case 1://関係機関
                        {
                            let textarea = document.getElementById("clssinp019-002_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispkankei_text = textarea.value.substring(0, 20);
                            }
                        }
                        break;
                    case 2://支援内容
                        {
                            let textarea = document.getElementById("clssinp019-003_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispsien_text = textarea.value.substring(0, 20);
                            }
                        }
                        break;
                    case 3://頻度
                        {
                            let textarea = document.getElementById("clssinp019-004_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.disphindo_text = textarea.value.substring(0, 20);
                            }
                        }
                        break;
                    case 4://備考
                        {
                            let textarea = document.getElementById("clssinp019-004_id");
                            //文字数制御
                            if (textarea.value.length > 200) //文字数制限
                            {
                                this.dispbiko_text = textarea.value.substring(0, 200);
                            }
                        }
                        break;
                }

            }

            //##### ウィンドウメソッド #####
            , onDataIns_click() {
                //データダイアログ 新規
                this.insdataflg = false;
            }
            , onDataUpd_click() {
                //データダイアログ 更新
                this.insdataflg = true;
            }

            //#### 登録・削除・クリア
            , onClickclr_data() {
                this.dispsvc_text = "";
                this.dispkankei_text = "";
                this.dispsien_text = "";
                this.disphindo_text = "";
                this.dispbiko_text = "";
            }

            , onClickins_data() {
                //データ登録ボタン
                this.Message_Dialog(sysConst.MSG_DATA_INS_CHK, 4);
            }


            , ins_data() {
                //データ登録
                let ins_cntid = this.dispscntid;              //カウントID
                let ins_syubetu = this.dispsyubetu;           //種別
                let ins_jun = this.dispsjun;                  //順
                let ins_svskbn = 1;                           //サービス区分(現在手入力のみ)
                let ins_svsid = 0;                            //サービスID(現在0固定)
                let ins_svstext = this.dispsvc_text;          //サービステキスト
                if (ins_svstext == "") ins_svstext = " ";
                let ins_teikyokbn = 1;                        //提供区分(現在手入力のみ)
                let ins_teikyoid = 0;                         //提供ID(現在0固定)
                let ins_teikyotext = this.dispkankei_text;    //提供テキスト
                if (ins_teikyotext == "") ins_teikyotext = " ";
                let ins_sienkbn = 1;                          //支援区分(現在手入力のみ)
                let ins_sienid1 = 0;                          //支援ID(現在0固定)
                let ins_sienid2 = 0;                          //支援ID(現在0固定)
                let ins_sienid3 = 0;                          //支援ID(現在0固定)
                let ins_sienid4 = 0;                          //支援ID(現在0固定)
                let ins_sienid5 = 0;                          //支援ID(現在0固定)
                let ins_sientext = this.dispsien_text;        //支援テキスト
                if (ins_sientext == "") ins_sientext = " ";
                let ins_hindokbn = 1;                         //頻度区分(現在手入力のみ)
                let ins_hindoid = 0;                          //頻度ID(現在0固定)
                let ins_hindotext = this.disphindo_text;      //頻度テキスト
                if (ins_hindotext == "") ins_hindotext = " ";
                let ins_biko = this.dispbiko_text;            //備考
                if (ins_biko == "") ins_biko = "";

                let data_siid = this.login_siid;
                let data_insymd = dayjs().format('YYYYMMDD');
                let data_instime = dayjs().format('HH:mm');

                //パラメータ
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn, //関係機関
                    intcode: this.intcode,
                    insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
                }

                //登録データ
                let postdata =
                    [
                        {
                            data_siid: data_siid,
                            data_insymd: data_insymd,
                            data_instime: data_instime,

                            head_jigyoid: this.jigyoid,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,  //関係機関
                            head_dataid: this.pdataid,
                            head_mstid: 0,
                            head_mymd: " ",
                            head_siid: 0,
                            head_delflg: 0,
                            biko_lcnt: 0,
                            biko_naiyo: " ",
                            kaigo_cntid: ins_cntid,
                            kaigo_syubetu: ins_syubetu,
                            kaigo_jun: ins_jun,
                            kaigo_svskbn: ins_svskbn,
                            kaigo_svsid: ins_svsid,
                            kaigo_svstext: ins_svstext,
                            kaigo_teikyokbn: ins_teikyokbn,
                            kaigo_teikyoid: ins_teikyoid,
                            kaigo_teikyotext: ins_teikyotext,
                            kaigo_sienkbn: ins_sienkbn,
                            kaigo_sienid1: ins_sienid1,
                            kaigo_sienid2: ins_sienid2,
                            kaigo_sienid3: ins_sienid3,
                            kaigo_sienid4: ins_sienid4,
                            kaigo_sienid5: ins_sienid5,
                            kaigo_sientext: ins_sientext,
                            kaigo_hindokbn: ins_hindokbn,
                            kaigo_hindoid: ins_hindoid,
                            kaigo_hindotext: ins_hindotext,
                            kaigo_biko: ins_biko,
                            kankei_cntid: 0,
                            kankei_no: 0,
                            Kankei_kikanid_kbn: 0,
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

                if (this.insdataflg == true) {
                    //更新
                    putConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        this.View_upd(this.intcode);
                        //メッセージ
                        this.Message_Dialog(sysConst.MSG_DATA_INS);
                    });
                }
                else {
                    //新規
                    postConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        this.View_upd(this.intcode);
                        //メッセージ
                        this.Message_Dialog(sysConst.MSG_DATA_INS);
                    });
                }
                this.inputchk = false;

            }
            , onClickdel_data() {
                //データ登録ボタン
                this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK, 5);
            }

            , del_data() {
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
                    cntid: this.dispscntid,
                    lcnt: 0,
                    headflg: sysConst_kotei.DEL_KBN_DATA,
                }

                //削除処理
                deleteConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddatadel = result.icrn_inf;
                    _self.gridSeldatadel = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_DEL, 0);
                });
            }

            , onInitializeIcrnGridwin(flexGrid) {
                //ウィンドウのグリッド
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header019'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;
                flexGrid.endUpdate();

                this.flexinput = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_clickwin(e) }.bind(this));
            }
            , grid_clickwin(e) {
                var ht = this.flexinput.hitTest(e);

                if (ht.row >= 0) {
                    this.inputchk = true;
                    //グリッドクリック
                    switch (this.inputMstflg) {
                        case INPUTMST_KBN_SVC:    //サービス内容
                            this.dispsvc_text = this.viewinputdata[ht.row].name2;
                            this.dispsvcdaiid = this.viewinputdata[ht.row].id1;
                            this.dispsvctyuid = this.viewinputdata[ht.row].id2;
                            break;
                        case INPUTMST_KBN_KIKAN:  //関係機関
                            this.dispkankei_text = this.viewinputdata[ht.row].name2;
                            break;
                        case INPUTMST_KBN_SIEN:   //支援内容
                            this.dispsien_text = this.viewinputdata[ht.row].name2;
                            break;
                        case INPUTMST_KBN_HINDO:  //頻度
                            this.disphindo_text = this.viewinputdata[ht.row].name2;
                            break;
                    }
                }
            }
            , onItemsSourceChanged_win(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);

                let col1 = flexGrid.columns[0];
                let col2 = flexGrid.columns[1];

                if (col1 != null) {
                    switch (this.inputMstflg) {
                        case INPUTMST_KBN_SVC:    //サービス内容
                            col1.header = "サービス内容";
                            col2.header = "サービス内容";
                            break;
                        case INPUTMST_KBN_KIKAN:  //関係機関
                            col1.header = "関係機関名";
                            col2.header = "関係機関名";
                            break;
                        case INPUTMST_KBN_SIEN:   //支援内容
                            col1.header = "支援内容";
                            col2.header = "支援内容";
                            break;
                        case INPUTMST_KBN_HINDO:  //頻度
                            col1.header = "頻度";
                            col2.header = "頻度";
                            break;
                    }
                }

                //行マージ
                for (let i = 0; i < flexGrid.rows.length; i++) {
                    flexGrid.rows[i].allowMerging = true;
                }
            }

            //関係機関入力ウィンドウ
            , onsisetu_click(kbn) {
                if (kbn == 0) {
                    //自施設
                    this.viewinputdata = this.MstList_JI.concat();
                    this.radio_visible = false;
                }
                else {
                    //他施設
                    this.MstList = this.MstList_TA.concat();
                    this.radio_visible = true;
                }
            }
            , click_radio(kbn) {
                this.inputchk = true;//入力チェックT
                switch (kbn) {
                    case 0:
                        document.getElementById("radio_jigyo_text").style.color = "#0081eb";
                        document.getElementById("radio_koteki_text").style.color = "";
                        document.getElementById("radio_hoka_text").style.color = "";
                        this.viewinputdata = this.MstList_TA.concat();
                        break;
                    case 1:
                        document.getElementById("radio_jigyo_text").style.color = "";
                        document.getElementById("radio_koteki_text").style.color = "#0081eb";
                        document.getElementById("radio_hoka_text").style.color = "";
                        this.viewinputdata = this.MstList_KO.concat();
                        break;
                    case 2:
                        document.getElementById("radio_jigyo_text").style.color = "";
                        document.getElementById("radio_koteki_text").style.color = "";
                        document.getElementById("radio_hoka_text").style.color = "#0081eb";
                        this.viewinputdata = this.MstList_HO.concat();
                        break;
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
@import '../../../assets/scss/common.scss';

/*全体エリア*/
.clssheet-chu018 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 780px;

    position: relative;
}

/*タイトル*/
.clsstitle018-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

/*タイトルエリア*/
.area018-001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

/*右上ボタンエリア*/
.area018-002 {
    display: inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
}

/*グリッドエリア*/
.Gridicrn018-001 {
    margin-top: 0px;
    width: 940px;
    height: 150px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

.Gridicrn018-002 {
    margin-top: 10px;
    width: 940px;
    height: 150px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

.Gridicrn018-003 {
    margin-top: 10px;
    width: 940px;
    height: 150px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

/*グリッドヘッダ*/
.column-header018 {
    font-size: 16px;
    font-weight: normal !important;
    text-align: center;
    background-color: #dffae0 !important;
    border-color: #8ffd7a !important;
}

/*◆公的支援(障害福祉サービス)*/
.area018-003 {
    display: inline-flex;
    margin-top: 15px;
    width: 945px;
    height: 25px;
}

.area018-004 {
    margin-top: 10px;
}

.clsstitle018-003 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4681cf;
    color: #ffffff;
    width: 955px;
    height: 25px;
    text-align: left;
}

/*◆公的支援(介護保険サービス)*/
.area018-005 {
    display: inline-flex;
    margin-top: 10px;
    width: 945px;
    height: 25px;
}

.clsstitle018-004 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4681cf;
    color: #ffffff;
    width: 955px;
    height: 25;
    text-align: left;
    vertical-align: middle !important;
}

/*◆その他の支援*/
.area018-007 {
    display: inline-flex;
    margin-top: 10px;
    width: 945px;
    height: 25px;
}

.clsstitle018-005 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4681cf;
    color: #ffffff;
    width: 955px;
    height: 25px;
    text-align: left;
}

/*ボタンエリア*/
.area018-009 {
    display: inline-flex;
    margin-top: 20px;
    margin-left: 0px;
    width: 950px;
    height: 27px;
}

/*クリアボタン*/
.clsbtnmenu018-clr {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu018-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu018-ins {
    margin-top: 0px;
    margin-left: 180px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

//履歴無しラベル1
.clsstitle1_Noreki_back_018 {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.55);
    height: 780px;
    width: 955px;
    line-height: 955px;
    text-align: center;
}

//履歴無しラベル2
.clsstitle1_Noreki_018 {
    border-radius: 10px 10px 10px 10px;
    bottom: 280px;
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



/*データ入力ウィンドウ*/
.clssheet-chu019 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 890px;
    height: 320px;
}

.area019-001 {
    display: inline-flex;
    width: 945px;
    height: 25px;
}

.clsstitle019-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 845px;
    height: 25px;
    text-align: center;
}

.btnback-019 {
    width: 5px !important;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.area019-002 {
    display: inline-flex;
    margin-top: 10px;
    width: 945px;
    height: 25px;
}

/*サービス内容エリア*/
.area019-003 {
    margin-top: 8px;
    width: 945px;
    height: 30px;
    display: inline-flex;
}

/*サービス内容-ラベル*/
.clsstitle019-002 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 120px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp019-001 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*提供機関エリア*/
.area019-004 {
    margin-top: 5px;
    width: 945px;
    height: 30px;
    display: inline-flex;
}

/*提供機関-ラベル*/
.clsstitle019-003 {
    background-color: #caf2f5;
    margin-top: 3px;
    font-size: 16px;
    height: 30px;
    width: 120px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp019-002 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 3px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*支援内容エリア*/
.area019-005 {
    margin-top: 7px;
    width: 945px;
    height: 30px;
    display: inline-flex;
}

/*支援内容-ラベル*/
.clsstitle019-004 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 120px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp019-003 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*頻度エリア*/
.area019-006 {
    margin-top: 5px;
    width: 945px;
    height: 30px;
    display: inline-flex;
}

/*頻度-ラベル*/
.clsstitle019-005 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 120px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp019-004 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.area019-007 {
    margin-top: 5px;
    width: 945px;
    height: 30px;
    display: inline-flex;
}

/*備考-ラベル*/
.clsstitle019-006 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 90px;
    width: 120px;
    line-height: 90px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp019-005 {
    background-color: #ffffff;
    border: 1px solid !important;
    border-color: #7e7e7e !important;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 90px;
    text-align: left;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;
}

/*左項目*/
.area019-008 {
    margin-top: 0px;
    width: 480px;
    height: 30px;
    display: inline-flex;
    flex-wrap: wrap;
}

/*全体フレーム項目*/
.area019-009 {
    margin-top: 0px;
    width: 940px;
    height: 250px;
    flex-wrap: wrap;
    display: inline-flex;
}

/*右項目*/
.area019-010 {
    margin-top: 8px;
    margin-left: 0px;
    width: 400px;
    height: 234px;
    background-color: #7fb9f0;
    border: 1px solid #4396e4;
    //border: 1px solid;
    //border-color: #7e7e7e;
}

.areakankeibtn {
    height: 30px;
}

.arearadio018 {
    margin-top: 0px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 400px;
    height: 35px;
    padding: 3px 0px;
    //border: 1px solid;
    //border-color: #7e7e7e;
}

.arearadio018-2 {
    border-radius: 5px 5px 5px 5px;
    margin-top: 3px;
    margin-left: 1px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 395px;
    height: 30px;
    padding: 3px 0px;
    background-color: #ffffff !important;
    border: thin solid #a5a5a5 !important;
}

.Gridicrn019-001 {
    font-size: 16px;
    margin-top: 5px;
    //width: 210px;
    height: 154px;
    border: 1px solid;
    grid-row: auto;
    border-color: #4396e4 !important;
    background-color: #dffae0;
}

.column-header019 {
    font-size: medium;
    font-weight: normal !important;
    text-align: center;
    background-color: #d6f3fc !important;
    border-color: #4396e4 !important;
}

/*ボタンエリア*/
.area019-011 {
    margin-top: 4px;
    width: 955px;
    height: 25px;
}

/*クリアボタン*/
.clsbtnmenu019-clr {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu019-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu019-ins {
    margin-top: 0px;
    margin-left: 653px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

#Gridicrn018-id01 {

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

#Gridicrn018-id02 {

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

#Gridicrn018-id03 {
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

#Gridicrn019-id01 {
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

//新規追加
.clsbtnmenu018-add {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}</style>
