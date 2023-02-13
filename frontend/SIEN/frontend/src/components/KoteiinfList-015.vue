<template>
    <v-sheet class="clssheet-chu015" elevation="2">

        <label class="clsstitle1_Noreki_back_015" v-show="Label_Visible">
            <label class="clsstitle1_Noreki_015">履歴を作成してください</label>
        </label>

        <div class="area015-001">
            <label class="clsstitle015-001">関係機関</label>
            <v-card class="ml-2" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">新規作成</a>
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

        <div class="area015-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
                履歴参照
            </v-btn>
        </div>

        <div class="area015-003">
            <wj-flex-grid id="Gridicrn015-id" class="Gridicrn015-001" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="'AllHeaders'" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid"
                :itemsSourceChanged="onItemsSourceChanged" :itemsSource="viewdata" :autoRowHeights="true">

                <wj-flex-grid-column header=" " binding="kankei_no" :width="30"
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="関係機関名" binding="kankei_kikanname" :width="210"
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="区分" binding="kankei_kikankbnname" :width="60" :wordWrap=true
                    :allowResizing=false align="center"></wj-flex-grid-column>
                <wj-flex-grid-column header="連絡先" binding="kankei_renrakusaki" :width="180" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="担当者" binding="kankei_tantoname" :width="180" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="備考" binding="kankei_biko" :width="260" :wordWrap=true :allowResizing=false
                    multiLine="true"></wj-flex-grid-column>

            </wj-flex-grid>
        </div>

        <div class="area015-004">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu015-add" @click="onClick_add">
                新規追加
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu015-hyoji" @click="onClickSort">
                表示順変更
            </v-btn>
        </div>

        <div class="area015-005">
            <v-btn class="clsbtnmenu015-eco" :disabled="Label_Visible == true">
                エコマップ作成
            </v-btn>
        </div>

        <div class="area015-006">
            <label class="clsstitle015-003">エコマップ</label>
        </div>

        <div class="area015-007">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu015-clr">
                クリア
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu015-del" @click="onClickdel_reki">
                削 除
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu015-ins" @click="onClickIns_reki">
                登 録
            </v-btn>
        </div>

        <!-- 年月日ダイアログ -->
        <v-dialog v-model="datepicker_dialog_head" width="300" class="datepicker_dialogs">
            <v-date-picker id="Datepicker_head" v-model="picker" locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()" @change="monthSelect" @mousedown="win_drag_ymd($event)"
                @mousemove="win_move_ymd($event)" @mouseup="win_up_ymd($event)">
            </v-date-picker>
        </v-dialog>

        <!-- 確認ダイアログ -->
        <v-dialog v-model="dialog_Message_flg" width="262">
            <v-sheet id="kakunin_id015" class="clssheet-Mes" elevation="2">
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
            <v-sheet id="rireki_id015" class="clssheet-Reki" elevation="2" @mousedown="win_drag_reki($event)"
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

        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="255">

            <v-sheet class="clssheet-head" elevation="2" id="head_win_id015" @mousedown="win_drag($event)"
                @mousemove="win_move($event)" @mouseup="win_up($event)">
                <div>

                    <div class="areahead">
                        <label class="clsstitlehead mt-1 ml-1">履歴作成</label>
                        <v-btn margin-left=1px elevation="2" icon small top class="closeButton_win  mt-1" color="red"
                            @click="Click_colse">
                            <v-icon> mdi-close </v-icon>
                        </v-btn>
                    </div>
                    <div class="areahead2">
                        <label class="koteititle-head">作成日</label>

                        <!--koteiheadinp1-->
                        <!--v-model="dispymdhead"-->
                        <v-btn class="btnymd ml-1" @click="inputCalendarClick(0)" tile width="150px" height="30px">{{
                            getYm()
                        }}
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

        <!--データ入力ウィンドウ-->
        <v-dialog v-model="InsWindata" width="760">
            <v-sheet class="clssheet-chu016" elevation="2">
                <div class="area016-001">
                    <label class="clsstitle016-001">家族情報</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse_data">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div class="areainput015_1">
                    <div class="areainput015_2">

                        <div class="area016-002">
                            <v-btn-toggle color="yellow" v-model="selected_btn" mandatory>
                                <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataIns_click">
                                    新規追加
                                </v-btn>
                                <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataUpd_click">
                                    修正登録
                                </v-btn>
                            </v-btn-toggle>
                        </div>

                        <div class="area016-003">
                            <label class="clsstitle016-002">関係機関名</label>
                            <input type="text" v-model="dispkankei_nm" id="clssinp016-001_id" class="clssinp016-001"
                                @input="text_input(0)" readonly>
                        </div>

                        <div class="area016-004">
                            <label class="clsstitle016-003">連絡先</label>
                            <input type="text" id="clssinp016-002_id" class="clssinp016-002" v-model="disprenraku"
                                @input="text_input(0)">
                        </div>

                        <div class="area016-005">
                            <label class="clsstitle016-004">担当者</label>
                            <input type="text" id="clssinp016-003_id" class="clssinp016-003" v-model="disptantou"
                                @input="text_input(1)">
                        </div>

                        <div class="area016-006">
                            <label class="clsstitle016-005">備考</label>
                            <textarea type="text" id="clssinp016-004_id" class="clssinp016-004" v-model="dispbikou"
                                @input="text_input(2)" />
                        </div>
                    </div>
                    <div v-show="true" class="areakankei">
                        <div>
                            <div>
                                <!--切替ボタンエリア-->
                                <v-btn-toggle class="ml-1" v-model="selected_btn2" mandatory>
                                    <v-btn small elevation="2" class="clsbtnmenu-standard" @click="onsisetu_click(0)">
                                        自施設
                                    </v-btn>
                                    <v-btn small elevation="2" class="clsbtnmenu-standard ml-1"
                                        @click="onsisetu_click(1)">
                                        他施設
                                    </v-btn>
                                </v-btn-toggle>
                            </div>

                            <div class="arearadio">
                                <div v-show="radio_visible" class="arearadio2 ml-1">
                                    <v-radio-group row v-model="radiojigyo" class="radiogroup001">
                                        <v-radio id="radio_jigyo_j" class="radio_jigyo" value="radio_J"
                                            @click="click_radio(0)">s
                                            <template v-slot:label>
                                                <div id="radio_jigyo_text">事業</div>
                                            </template>
                                        </v-radio>
                                        <v-radio id="radio_jigyo_k" class="radio_jigyo" value="radio_K"
                                            @click="click_radio(1)">
                                            <template v-slot:label>
                                                <div id="radio_koteki_text">公的</div>
                                            </template>
                                        </v-radio>
                                        <v-radio id="radio_jigyo_h" class="radio_jigyo" value="radio_H"
                                            @click="click_radio(2)">
                                            <template v-slot:label>
                                                <div id="radio_hoka_text">他</div>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </div>
                            </div>

                            <wj-flex-grid id="GridMst_id" class="GridMst_jigyo" :headersVisibility="'Column'"
                                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false"
                                :allowPinning="false" :allowMerging="true" :allowResizing="true" :allowSorting="false"
                                :allowDragging="false" :selectionMode="'Row'" :isReadOnly="true"
                                :initialized="onInitializeIcrnGrid_Mst" :itemsSourceChanged="onItemsSourceChanged_mst"
                                :itemsSource="MstList">
                                <!--列-->
                                <wj-flex-grid-column header="事業所名" binding="name" :width="270"
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="kankei_kikanid_kbn" :width="0"
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="kankei_kikanid" :width="0"
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="kbn" :width="0"></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="value" :width="0"></wj-flex-grid-column>
                            </wj-flex-grid>
                        </div>
                    </div>

                </div>


                <div class="area016-007">
                    <v-btn class="clsbtnmenu016-clr" @click="onClickclr_data">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu016-del" @click="onClickdel_data">
                        削 除
                    </v-btn>
                    <v-btn class="clsbtnmenu016-ins" @click="onClickins_data">
                        登 録
                    </v-btn>
                </div>

            </v-sheet>
        </v-dialog>


        <!-- 表示順ダイアログ  -->
        <!--
                      @mousedown="win_drag_sort($event)"
            @mousemove="win_move_sort($event)"
            @mouseup="win_up_sort($event)"
            style="bottom: 50%;right: 50%;"
        -->
        <v-dialog v-model="dialog_Sort_flg" width="1020">
            <v-sheet id="sort_002id" class="clssheet015-sort" elevation="2">
                <div class="area-sort015">
                    <label class="kotei015title_sort">表示順変更</label>
                    <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                        @click="Click_colse_sort">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <wj-flex-grid id="Gridicrnsort015-id" class="Gridicrn015-sort" :headersVisibility="'Column'"
                    :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                    :allowMerging="'AllHeaders'" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                    :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_sort"
                    :itemsSource="viewdata_sort" :autoRowHeights="true">

                    <!--列-->
                    <wj-flex-grid-column header=" " binding="kankei_no" :width="30"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="関係機関名" binding="kankei_kikanname" :width="210"
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="区分" binding="kankei_kikankbnname" :width="60" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="連絡先" binding="kankei_renrakusaki" :width="180" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="担当者" binding="kankei_tantoname" :width="180" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="備考" binding="kankei_biko" :width="260" :wordWrap=true
                        :allowResizing=false multiLine="true"></wj-flex-grid-column>
                    <wj-flex-grid-column header="表示順" binding="kankei_no_text" :width="60"
                        :allowResizing=false></wj-flex-grid-column>


                </wj-flex-grid>

                <div class="area-sort015">
                    <v-btn class="clsbtnmenu015-clr-sort" @click="onClickclr_sort">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu015-ins-sort" @click="onClickins_sort">
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
import sysConst from '../utiles/const';
import * as wjGrid from '@grapecity/wijmo.grid';
import { getConnect } from '../connect/getConnect';
import { postConnect } from '../connect/postConnect';
import { putConnect } from '../connect/putConnect';
import { deleteConnect } from '../connect/deleteConnect';

let INS_KBN_NAIYO = 0;  //登録区分:データ  
let INS_KBN_HEAD = 1;   //登録区分:ヘッダ
let DEL_KBN_DATA = 0;   //削除区分:データ
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
                viewdata: [],       //グリッド表示データ
                viewdata_reki: [],       //履歴グリッド表示データ

                //データ表示用
                picker: '',
                pdataid: '',         //ヘッダデータid
                intcode: 0,          //表示しているintcode
                pmymd: '',           //表示しているMYMD
                pmymd_moto: '',      //表示している元MYMD
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

                //ウィンドウ変数
                dispkankei_nm: "",   //関係機関名
                dispkankei_kbn: "",  //関係機関区分
                dispkankei_id: "",   //関係機関ID
                dispcntid: 0,
                dispno: 0,
                disprenraku: "",
                disptantou: "",
                dispbikou: "",
                Get_inputinf: this.get_inputdata(),

                //入力データ
                MstList: [],   //グリッドの表示されるデータ
                MstList_JI: [],   //グリッドの表示されるデータ(自施設)
                MstList_TA: [],   //グリッドの表示されるデータ(他施設(事業))
                MstList_KO: [],   //グリッドの表示されるデータ(他施設(公的))
                MstList_HO: [],   //グリッドの表示されるデータ(他施設(他))
                Grid_Visible: false, //マスタグリッドの表示切替

                //ラジオボタン
                radiojigyo: 'radio_J',
                radio_visible: false,

                //表示順変更
                dialog_Sort_flg: false,
                viewdata_sort: [],
                sort_no: 1,

            };

        },
        methods: {
            get_inputdata() {
                //関係機関を取得

                //API取得
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                    pYmd: this.ymd
                };

                getConnect('/Mst_kankei', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf = result;
                    this.DspKankeiInput();
                });
            },

            DspKankeiInput() {
                //#####関係期間の画面表示を行う#####

                let wk_kankei_data = [];
                let kankei_data_ji = [];
                let kankei_data_ta = [];
                let kankei_data_ko = [];
                let kankei_data_ho = [];


                let wk_ryaku = "";      //略(VB側同様同事業者名は表示しない)
                let wk_name = "";       //名称
                let wk_jigyokbn = "";   //事業者区分 1:自施設 2:他施設
                let wk_jigyoid = "";    //事業者ID
                let wk_kbn = "";        //区分 1;事業 2:公的 3:他

                //関係機関
                wk_kankei_data =
                {
                    name: "(クリア)",
                    kankei_kikanid_kbn: 0,
                    kankei_kikanid: 0,
                    kbn: 0,
                    value: "",
                }
                kankei_data_ji.push(wk_kankei_data);
                kankei_data_ta.push(wk_kankei_data);
                kankei_data_ko.push(wk_kankei_data);
                kankei_data_ho.push(wk_kankei_data);

                if (this.Get_inputinf.icrn_inf != null) {
                    //取得したデータを確保
                    this.Get_inputinf.icrn_inf.forEach(function (value) {
                        if (wk_ryaku != value.ryaku) {
                            wk_name = value.names;        //名称
                            wk_jigyokbn = value.jiTaFlg;  //事業者区分 1:自施設 2:他施設
                            wk_jigyoid = value.ncode;     //内部コード
                            wk_kbn = value.kbn;           //区分 1;事業 2:公的 3:他
                            wk_ryaku = value.ryaku;

                            wk_kankei_data =
                            {
                                name: wk_name,
                                kankei_kikanid_kbn: wk_jigyokbn,
                                kankei_kikanid: wk_jigyoid,
                                kbn: wk_kbn,
                                value: wk_name,
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

                    this.MstList = this.MstList_JI.concat();
                }
            },

            onClickCopy: function () {
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
            newClick() {
                this.InsWinflg = true;
            },
            onInitializeIcrnGrid(flexGrid) {
                flexGrid.beginUpdate();
                flexGrid.cssClassAll = "Gridicrn015-001";
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

            , grid_click: function (e) {
                if (this.Chk_Reki() == true) {
                    this.InsWindata = true;
                    var ht = this.flex.hitTest(e);
                    if (ht.row >= 0) {
                        this.insdataflg = true;
                        this.dispkankei_nm = this.viewdata[ht.row].kankei_kikanname;      //関係機関名
                        this.dispkankei_kbn = this.viewdata[ht.row].kankei_kikanid_kbn;   //関係機関区分
                        this.dispkankei_id = this.viewdata[ht.row].kankei_kikanid;     //関係機関ID                  
                        this.selected_btn = 1;
                        this.dispcntid = this.viewdata[ht.row].kankei_cntid;
                        this.dispno = this.viewdata[ht.row].kankei_no;
                        this.disprenraku = this.viewdata[ht.row].kankei_renrakusaki;
                        this.disptantou = this.viewdata[ht.row].kankei_tantoname;
                        this.dispbikou = this.viewdata[ht.row].kankei_biko;

                        //関係機関
                        this.MstList = this.MstList_JI.concat();  //初期値は自事業所

                        let winter = setInterval(() => {

                            //ラジオボタン
                            var radio_j = document.getElementById("radio_jigyo_j");
                            var radio_j_text = document.getElementById("radio_jigyo_text");
                            var radio_k = document.getElementById("radio_jigyo_k");
                            var radio_k_text = document.getElementById("radio_koteki_text");
                            var radio_h = document.getElementById("radio_jigyo_h");
                            var radio_h_text = document.getElementById("radio_hoka_text");

                            if (radio_j.style != null && radio_k.style != null && radio_h.style != null
                                && radio_j_text.style != null && radio_k_text.style != null && radio_h_text.style != null) {
                                clearInterval(winter);

                                //ラジオボタン初期化
                                radio_j_text.style.color = "#0081eb";
                                radio_k_text.style.color = "#000";
                                radio_h_text.style.color = "#000";
                                this.radiojigyo = "radio_J";
                                this.radio_visible = false;
                            }
                        }, "interval");

                    }
                    else {


                        this.dispkankei_nm = "";
                        this.dispkankei_kbn = 0;
                        this.dispkankei_id = 0;
                        this.insdataflg = false;
                        this.dispcntid = 0;
                        this.dispno = 0;
                        this.disprenraku = "";
                        this.disptantou = "";
                        this.dispbikou = "";
                        this.selected_btn = 0;
                        this.radiojigyo = "radio_J";
                        this.radio_visible = false;
                    }
                }
            }
            , onClick_add() {

                //新規追加クリック
                this.InsWindata = true;

                this.dispkankei_nm = "";
                this.dispkankei_kbn = 0;
                this.dispkankei_id = 0;
                this.insdataflg = false;
                this.dispcntid = 0;
                this.dispno = 0;
                this.disprenraku = "";
                this.disptantou = "";
                this.dispbikou = "";
                this.selected_btn = 0;
                this.radiojigyo = "radio_J";
                this.radio_visible = false;
            }

            //カレンダー
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


            , win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_id015");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_id015");
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
                var wdialog = document.getElementById("kakunin_id015");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_Msg: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("kakunin_id015");
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
                var wdialog = document.getElementById("rireki_id015");
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
                    var wdialog = document.getElementById("rireki_id015");
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


            // ####新規作成####
            , onHeadclick_ins() {
                this.Ym = dayjs();
                this.dispymdhead = this.getYm();

                //新規ボタンクリックイベント
                this.InsWinhead = true;
                this.insflg = true;//新規登録
            }
            , Click_colse() {
                this.InsWinhead = false;
            }
            , Click_colse_data() {
                //×ボタン
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

            , input_chk: function () {
                //入力項目があれば登録メッセージ
                if (this.inputchk == true) {
                    this.Message_Dialog("登録されていない項目があります。\n 登録しますか。", 9);
                }
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

                //新規登録
                let _self = this;
                let params = [];
                params =
                {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn,//関係機関
                    intcode: this.intcode,
                    insflg: INS_KBN_HEAD, //ヘッダ登録
                }

                //登録データ
                let postdata =
                    [
                        {
                            head_jigyoid: this.jigyoid_kotei,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,  //関係機関
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
                    postConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
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

            //フィルター
            , DataFilter() {
                let data = [];
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.gridSeldata.icrn_inf != null) {
                    //関係機関のデータのみに絞る
                    this.gridSeldata.icrn_inf.forEach(function (value) {

                        //区分が関係機関
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

                            //関係機関ヘッダの内容を取得
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
                //関係機関
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
                    Kbn: this.kotei_kbn,             //関係機関
                    Dataid: this.pdataid,
                    Modeflg: GET_KBN_DATA,        //データ取得
                };

                getConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF').then((result) => {
                    _self.GetViewDataInf = result;
                    this.DataFilter2();
                })
            }

            //画面更新
            , DataFilter2() {
                let data = [];
                let wdataid = this.pdataid;
                let wk_Ymd = "";
                let wk_kbn = this.kotei_kbn;

                if (this.GetViewDataInf.icrn_inf != null) {
                    //関係機関のデータのみに絞る
                    this.GetViewDataInf.icrn_inf.forEach(function (value) {

                        //区分が関係機関
                        if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {

                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",

                                //関係機関ヘッダの内容を取得
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
                    data.sort(function (a, b) {
                        if (a.kankei_no < b.kankei_no) return -1;
                        if (b.kankei_no < a.kankei_no) return 1;
                    });
                    this.viewdata = data.concat();

                }

            }
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
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
                        this.pmymd = this.viewdata_reki[ht.row].head_mymd;
                        this.get_data();
                    }

                }
            }
            , onItemsSourceChanged(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            }

            //履歴削除・更新
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
                deleteConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_REKI_DEL, 0);
                });
            }
            , text_input(kbn) {
                //文字数制限とかやる
                this.inputchk = true;

                switch (kbn) {
                    case 0://連絡先
                        {
                            let textarea = document.getElementById("clssinp016-002_id");
                            //文字数制御
                            if (textarea.value.length > 10) //文字数制限
                            {
                                this.disprenraku = textarea.value.substring(0, 10);
                            }
                        }
                        break;
                    case 1://担当者
                        {
                            let textarea = document.getElementById("clssinp016-003_id");
                            //文字数制御
                            if (textarea.value.length > 10) //文字数制限
                            {
                                this.disptantou = textarea.value.substring(0, 10);
                            }
                        }
                        break;
                    case 2://備考
                        {
                            let textarea = document.getElementById("clssinp016-004_id");
                            //文字数制御
                            if (textarea.value.length > 100) //文字数制限
                            {
                                this.dispbikou = textarea.value.substring(0, 100);
                            }
                        }
                        break;
                }

            }
            , onDataIns_click() {
                //データダイアログ 新規
                this.insdataflg = false;
            }
            , onDataUpd_click() {
                //データダイアログ 更新
                this.insdataflg = true;
            }

            , onClickins_data() {
                //データ登録ボタン
                this.Message_Dialog(sysConst.MSG_DATA_INS_CHK, 4);
            }

            , ins_data() {
                //データ登録
                let ins_kankeicntid = this.dispcntid;     //CNTID
                let ins_kankeino = this.dispno;           //NO            
                let ins_kankeikbn = this.dispkankei_kbn;  //関係機関区分
                let ins_kankeiid = this.dispkankei_id;   //関係機関id
                let ins_kankeirenraku = this.disprenraku; //連絡先
                let ins_kankeitantou = this.disptantou;   //担当者
                let ins_kankeibikou = this.dispbikou;    //備考

                //パラメータ
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn, //関係機関
                    intcode: this.intcode,
                    insflg: INS_KBN_NAIYO, //内容登録
                }

                //登録データ
                let postdata =
                    [
                        {
                            head_jigyoid: this.jigyoid_kotei,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,  //関係機関
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
                            kankei_cntid: ins_kankeicntid,
                            kankei_no: ins_kankeino,
                            Kankei_kikanid_kbn: ins_kankeikbn,
                            kankei_kikanid: ins_kankeiid,
                            kankei_renrakusaki: ins_kankeirenraku,
                            kankei_tantoname: ins_kankeitantou,
                            kankei_biko: ins_kankeibikou,
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
                    jigyoid: this.jigyoid_kotei,
                    dataid: this.pdataid,
                    cntid: this.dispcntid,
                    lcnt: 0,
                    headflg: DEL_KBN_DATA,
                }

                //削除処理
                deleteConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddatadel = result.icrn_inf;
                    _self.gridSeldatadel = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_DEL, 0);
                });
            }

            , onClickclr_data() {
                //クリアボタン
                this.dispcntid = 0;
                this.dispno = 0;
                this.disprenraku = "";
                this.disptantou = "";
                this.dispbikou = "";
            }

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
            , grid_click_Mst(e) {
                var ht = this.flex_mst.hitTest(e);
                //グリッドがクリックされた場合画面の表示を更新する                
                if (ht.row >= 0) {
                    this.dispkankei_nm = this.MstList[ht.row].value;
                    this.dispkankei_kbn = this.MstList[ht.row].kankei_kikanid_kbn;
                    this.dispkankei_id = this.MstList[ht.row].kankei_kikanid;
                }
            }
            , onItemsSourceChanged_mst() {

            }

            //関係機関入力ウィンドウ
            , onsisetu_click(kbn) {
                if (kbn == 0) {
                    //自施設
                    this.MstList = this.MstList_JI.concat();
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
                        this.MstList = this.MstList_TA.concat();
                        break;
                    case 1:
                        document.getElementById("radio_jigyo_text").style.color = "";
                        document.getElementById("radio_koteki_text").style.color = "#0081eb";
                        document.getElementById("radio_hoka_text").style.color = "";
                        this.MstList = this.MstList_KO.concat();
                        break;
                    case 2:
                        document.getElementById("radio_jigyo_text").style.color = "";
                        document.getElementById("radio_koteki_text").style.color = "";
                        document.getElementById("radio_hoka_text").style.color = "#0081eb";
                        this.MstList = this.MstList_HO.concat();
                        break;
                }
            }

            //###ソート関係###
            , onClickSort() {
                //表示順変更画面
                this.Dragflg = false;
                let wk_viewdata_sort = [];
                let wk_viewdata_sort_list = [];

                //表示グリッドのデータセット
                this.viewdata.forEach(function (value) {
                    wk_viewdata_sort = {
                        kankei_cntid: value.kankei_cntid,
                        kankei_kikanid_kbn: value.kankei_kikanid_kbn,
                        kankei_kikanid: value.kankei_kikanid,
                        kankei_kikanname: value.kankei_kikanname,
                        kankei_kikankbnname: value.kankei_kikankbnname,
                        kankei_no: value.kankei_no,
                        kankei_no_text: "",
                        kankei_renrakusaki: value.kankei_renrakusaki,
                        kankei_tantoname: value.kankei_tantoname,
                        kankei_biko: value.kankei_biko,
                    }
                    wk_viewdata_sort_list.push(wk_viewdata_sort);
                }
                );

                this.viewdata_sort = wk_viewdata_sort_list.concat();
                this.sort_no = 1;
                this.dialog_Sort_flg = true;

            }
            , onClickclr_sort() {
                //表示順クリア

                this.sort_no = 1;
                let wk_viewdata_sort = [];
                let wk_viewdata_sort_list = [];

                //表示グリッドのデータセット
                this.viewdata.forEach(function (value) {
                    wk_viewdata_sort = {
                        kankei_cntid: value.kankei_cntid,
                        kankei_kikanid_kbn: value.kankei_kikanid_kbn,
                        kankei_kikanid: value.kankei_kikanid,
                        kankei_kikanname: value.kankei_kikanname,
                        kankei_kikankbnname: value.kankei_kikankbnname,
                        kankei_no: value.kankei_no,
                        kankei_no_text: "",
                        kankei_renrakusaki: value.kankei_renrakusaki,
                        kankei_tantoname: value.kankei_tantoname,
                        kankei_biko: value.kankei_biko,
                    }
                    wk_viewdata_sort_list.push(wk_viewdata_sort);
                }
                );
                this.viewdata_sort = wk_viewdata_sort_list.concat();
                this.flex3.endUpdate();
            }

            , onClickins_sort() {
                //表示順登録ボタン


                //表示順の入力チェック
                if (this.chk_sort() == true) {
                    //表示順情報を登録リストに反映
                    let wk_viewdata = this.viewdata.concat();
                    let wk_viewdata_sort = this.viewdata_sort.concat();

                    wk_viewdata_sort.forEach(function (value) {
                        let wk_id = value.kankei_cntid;
                        let wk_no = value.kankei_no_text;

                        for (let i = 0; i < wk_viewdata.length; i++) {
                            if (wk_viewdata[i].kankei_cntid == wk_id) {
                                wk_viewdata[i].kankei_no = wk_no;
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
                        let wk_putdata = {
                            head_jigyoid: this.kotei_kbn,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,  //関係機関
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
                            kankei_cntid: wk_viewdata[i].kankei_cntid,
                            kankei_no: wk_viewdata[i].kankei_no,
                            Kankei_kikanid_kbn: wk_viewdata[i].kankei_kikanid_kbn,
                            kankei_kikanid: wk_viewdata[i].kankei_kikanid,
                            kankei_renrakusaki: wk_viewdata[i].kankei_renrakusaki,
                            kankei_tantoname: wk_viewdata[i].kankei_tantoname,
                            kankei_biko: wk_viewdata[i].kankei_biko,
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
                        };

                        //リストに追加
                        putdata.push(wk_putdata);

                    }

                    //更新登録            
                    putConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', putdata).then((result) => {
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

            , chk_sort: function () {
                let chkflg = true;

                //表示順の入力チェック
                for (let i = 0; i < this.viewdata_sort.length; i++) {
                    if (this.viewdata_sort[i].kankei_no_text == "") {
                        chkflg = false;
                        break;
                    }
                }

                return chkflg;

            }

            , onClickdel_sort() {
                //表示順削除ボタン
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
                    if (ht.col == 6) {
                        //表示順の列
                        if (this.viewdata_sort[ht.row].kankei_no_text == "") {
                            this.viewdata_sort[ht.row].kankei_no_text = this.sort_no;
                            this.sort_no = this.sort_no + 1;
                            this.flex3.endUpdate();
                        }
                        else {
                            if (this.viewdata_sort[ht.row].kankei_no_text == (this.sort_no - 1)) {
                                this.viewdata_sort[ht.row].kankei_no_text = "";
                                this.sort_no = this.sort_no - 1;
                                this.flex3.endUpdate();
                            }

                        }
                    }
                }
            }
            , Click_colse_sort() {
                //データウィンドウ
                this.dialog_Sort_flg = false;
                this.sort_no = 1;
            }

        }
    }

</script>

<style lang="scss">
@import '../assets/scss/common.scss';

/*全体エリア*/
.clssheet-chu015 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 740px;

    position: relative;

}

/*タイトル*/
.clsstitle015-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

/*タイトルエリア*/
.area015-001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

/*右上ボタンエリア*/
.area015-002 {
    display: inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
}

/*グリッドエリア*/
.Gridicrn015-001 {
    margin-top: 10px;
    width: 940px;
    height: 300px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

/*グリッドヘッダ*/
.column-header015 {
    font-size: medium;
    font-weight: normal !important;
    text-align: center;
    background-color: #dffae0 !important;
    border-color: #8ffd7a !important;
}

/*新規追加*/
.clsbtnmenu015-add {
    margin-top: 0px;
    margin-left: 732px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*表示順設定*/
.clsbtnmenu015-hyoji {
    margin-top: 0px;
    margin-left: 5px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*エコマップ*/
.clsbtnmenu015-eco {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.area015-006 {
    display: inline-flex;
    width: 900px;
    height: 300px;
}

//仮置きコントロール
.clsstitle015-003 {
    width: 400px;
    height: 300px;
    line-height: 400px;
    border: 1px solid;
    border-color: #8ffd7a;
    text-align: center;
}


/*ボタンエリア*/
.area015-007 {
    margin-top: 0px;
    width: 955px;
    height: 25px;
}

/*クリアボタン*/
.clsbtnmenu015-clr {
    margin-top: 10px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu015-del {
    margin-top: 10px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu015-ins {
    margin-top: 10px;
    margin-left: 725px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

//履歴無しラベル1
.clsstitle1_Noreki_back_015 {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.55);
    height: 740px;
    width: 955px;
    line-height: 740px;
    text-align: center;
}

//履歴無しラベル2
.clsstitle1_Noreki_015 {
    border-radius: 10px 10px 10px 10px;
    bottom: 305px;
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

//ウィンドウCSS
.clssheet-chu016 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 760px;
    height: 350px;
}

.area016-001 {
    display: inline-flex;
    width: 760px;
    height: 25px;
}

.clsstitle016-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 715px;
    height: 30px;
    text-align: center;
}

.area016-002 {
    display: inline-flex;
    margin-top: 10px;
    width: 745px;
    height: 25px;
}

/*関係機関エリア*/
.area016-003 {
    margin-top: 20px;
    width: 745px;
    height: 30px;
    display: inline-flex;
}

/*関係機関-ラベル*/
.clsstitle016-002 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp016-001 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 330px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*連絡先エリア*/
.area016-004 {
    margin-top: 5px;
    width: 785px;
    height: 30px;
    display: inline-flex;
}

/*連絡先-ラベル*/
.clsstitle016-003 {
    background-color: #caf2f5;
    margin-top: 3px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp016-002 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 3px;
    width: 210px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*担当者エリア*/
.area016-005 {
    margin-top: 7px;
    width: 785px;
    height: 30px;
    display: inline-flex;
}

/*担当者-ラベル*/
.clsstitle016-004 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp016-003 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 210px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*備考エリア*/
.area016-006 {
    margin-top: 5px;
    width: 785px;
    height: 100px;
    display: inline-flex;
}

/*備考-ラベル*/
.clsstitle016-005 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 100px;
    width: 90px;
    line-height: 100px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp016-004 {
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

/*ボタンエリア*/
.area016-007 {
    margin-top: 34px;
    width: 785px;
    height: 25px;
}

/*クリアボタン*/
.clsbtnmenu016-clr {
    margin-top: 5px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu016-del {
    margin-top: 5px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu016-ins {
    margin-top: 5px;
    margin-left: 515px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

//関係エリア
.areainput015_1 {
    display: inline-flex;
    flex-wrap: wrap;
    width: 800px;
    height: 250px;
    padding: 3px 0px;
    //background-color: #ffffff;
    //border: thin solid #2cb73c ;
}

.areainput015_2 {
    display: inline-flex;
    flex-wrap: wrap;
    width: 440px;
    height: 280px;
    padding: 3px 0px;
}

.areakankei {
    display: inline-flex;
    margin-left: 1px;
    margin-top: 8px;
    flex-wrap: wrap;
    width: 300px;
    height: 267px;
    padding: 3px 0px;
    background-color: #7fb9f0;
    border: 1px solid #4396e4;
}

.arearadio {
    margin-top: 0px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 295px;
    height: 30px;
    padding: 3px 0px;
}

.arearadio2 {
    border-radius: 5px 5px 5px 5px;
    margin-top: 0px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 288px;
    height: 30px;
    padding: 3px 0px;
    background-color: #ffffff !important;
    border: thin solid #a5a5a5 !important;
}

.radio_jigyo {
    margin-top: -5px;
}

.GridMst_jigyo {
    font-size: 16px;
    margin-top: 2px;
    margin-left: 2px;
    width: 290px !important;
    height: 198px;
    border: 1px solid;
    border-color: #4396e4 !important;
    background-color: #dffae0;
}

//#####表示順変更ダイアログ#####
.kotei015title_sort {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 980px;
    height: 25px;
    text-align: center;
}

.clssheet015-sort {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 1020px;
    height: 482px;
}

.area-sort015 {
    display: inline-flex;
    width: 1020px;
    height: 35px;
}

.Gridicrn015-sort {
    font-size: 15px;
    margin-top: 5px;
    width: 1010px;
    height: 400px;
    border: 1px solid;
    border-color: #8ffd7a !important;
}

.clsbtnmenu015-clr-sort {
    margin-top: 0px;
    margin-left: 1px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu015-ins-sort {
    margin-top: 0px;
    margin-left: 855px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

#Gridicrnsort015-id {

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

#Gridicrn015-id {

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