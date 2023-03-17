<template>
    <v-sheet class="clssheet-chu010" elevation="2">

        <label class="clsstitle1_Noreki_back_010" v-show="Label_Visible">
            <label class="clsstitle1_Noreki010">履歴が未作成です。
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                履歴作成ボタンから作成してください。</label>
        </label>

        <div class="area010-001">
            <label class="clsstitle010-001">家族情報</label>
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

        <div class="area010-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
                履歴参照
            </v-btn>
        </div>

        <div class="area010-003">
            <wj-flex-grid id="Gridicrn010-id" class="Gridicrn010-001" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid"
                :itemsSourceChanged="onItemsSourceChanged" :formatItem="onformatItem" :itemsSource="viewdata"
                :autoRowHeights="true">
            </wj-flex-grid>
        </div>

        <div class="area010-004">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu010-add" @click="onClick_add">
                新規追加
            </v-btn>
            <v-btn v-show="false" :disabled="Label_Visible == true" class="clsbtnmenu010-hyoji">
                表示順変更
            </v-btn>
        </div>

        <div class="area010-005">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu010-jyuno">
                ジュノグラム作成
            </v-btn>
        </div>

        <div class="area010-006">
            <label class="clsstitle010-003">ジュノグラム予定仮置き</label>
        </div>
        <div class="area010-007">

            <label class="label footer" id="footer_010" style="margin-left: 260px;"></label>

            <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-ins-id" class="clsbtnmenu010-ins" @click="onClickIns">
                登 録
            </v-btn>
        </div>



        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="400">
            <v-sheet class="clssheet-head" elevation="2" id="head_win_010id" @mousedown="win_drag($event)"
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
                        <input class="chkbox mt-1" id="chk_head010" type="checkbox" style="margin-left: 4px;margin-top: 0px !important;">
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
            <v-sheet class="clssheet-Mes" elevation="2">
                <!--
              id="kakunin_id010"
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
            <v-sheet class="clssheet-Reki" elevation="2" id="rireki_id010" @mousedown="win_drag_reki($event)"
                @mousemove="win_move_reki($event)" @mouseup="win_up_reki($event)">
                <div class="areaReki">
                    <label class="clsstitleReki">作成履歴</label>
                    <v-btn elevation="2" icon small top class="closeButton_win" color="red" @click="Click_colse_Reki">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div class="areaReki2">
                    <wj-flex-grid id="GrdReki_id" class="GrdReki-001" :headersVisibility="'Column'"
                        :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                        :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                        :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_reki"
                        :itemsSourceChanged="onItemsSourceChanged_reki" :itemsSource="viewdata_reki">

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
                    <v-btn :disabled="Label_Visible == true" id="clsbtnmenu-del-id" class="clsbtnmenu010-del"
                        @click="onClickdel">
                        削 除
                    </v-btn>
                </div>

            </v-sheet>
        </v-dialog>

        <!--データ登録ウィンドウ-->
        <v-dialog v-model="InsWindata" width="745">
            <v-sheet class="clssheet-chu011" elevation="2" id="data_010id">
                <!--
            @mousedown="win_drag_data($event)"
            @mousemove="win_move_data($event)"
            @mouseup="win_up_data($event)">-->
                <div class="area011-001">
                    <label class="clsstitle011-001">家族情報</label>
                    <v-btn margin-left=1px elevation="2" icon small top class="closeButton_win " color="red"
                        @click="Click_colse_win">
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                </div>

                <div v-show="false" class="area011-002">
                    <v-btn-toggle color="yellow" v-model="selected_btn" mandatory>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataIns_click">
                            新規追加
                        </v-btn>
                        <v-btn small elevation="2" class="clsbtnmenu-standard_default" @click="onDataUpd_click">
                            修正登録
                        </v-btn>
                    </v-btn-toggle>
                </div>

                <div class="areainput">

                    <div class="areainput2">
                        <div class="area011-003">
                            <label class="clsstitle011-003">家族氏名</label>
                            <input type="text" id="clssinp011-003_id" class="clssinp011-003" v-model="dispkzkname"
                                @input="text_input(0)" />
                        </div>

                        <div class="area011-004">
                            <label class="clsstitle011-004">家族カナ</label>
                            <input type="text" id="clssinp011-004_id" class="clssinp011-004" v-model="dispkzkkana"
                                @input="text_input(1)" />
                        </div>

                        <div class="area011-005">
                            <label class="clsstitle011-005">続柄</label>
                            <input type="text" class="clssinp011-005" v-model="dispkzktuduki" @click="onTxtTuduki_Click"
                                readonly />
                        </div>
                    </div>

                    <div v-show="Grid_Visible" class="areatuduki">
                        <div>
                            <wj-flex-grid id="GridMst_id" class="GridMst_tuduki" :headersVisibility="'Column'"
                                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                                :allowMerging="true" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                                :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_Mst"
                                :itemsSourceChanged="onItemsSourceChanged_mst" :itemsSource="MstList">
                                <!--列-->
                                <wj-flex-grid-column header="続柄" binding="namedai" :width="80" :wordWrap=true
                                    :allowMerging=true :allowResizing=false id="MstGrid_col1"></wj-flex-grid-column>
                                <wj-flex-grid-column header="続柄" binding="clear" :width="0" :wordWrap=true
                                    :allowMerging=true :allowResizing=false id="MstGrid_col1"></wj-flex-grid-column>
                                <wj-flex-grid-column header="続柄" binding="namechu" :width="130" :wordWrap=true
                                    :allowMerging=true :allowResizing=false id="MstGrid_col1"></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="daiid" :width="0" :wordWrap=true
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="chuid" :width="0" :wordWrap=true
                                    :allowResizing=false></wj-flex-grid-column>
                                <wj-flex-grid-column header="" binding="value" :width="0" :wordWrap=true
                                    :allowResizing=false></wj-flex-grid-column>
                            </wj-flex-grid>
                        </div>
                    </div>
                </div>

                <div class="area011-006">
                    <label class="clsstitle011-006">同居区分</label>
                    <v-radio-group row v-model="radio006" class="radiogroup001">
                        <v-radio class="clssinp011-006-doukyo" value="radio006-D" @click="click_radio(60)">
                            <template v-slot:label>
                                <div id="radio006-D_text">同居</div>
                            </template>
                        </v-radio>
                        <v-radio class="clssinp011-006-hidoukyo" label="非同居" value="radio006-H" @click="click_radio(61)">
                            <template v-slot:label>
                                <div id="radio006-H_text">非同居</div>
                            </template>
                        </v-radio>
                    </v-radio-group>
                </div>

                <div class="area011-007">
                    <label class="clsstitle011-007">家族区分</label>
                    <v-radio-group row v-model="radio007" class="radiogroup001">
                        <v-radio class="clssinp011-007-kazoku" label="家族" value="radio007-K" @click="click_radio(70)">
                            <template v-slot:label>
                                <div id="radio007-K_text">家族</div>
                            </template>
                        </v-radio>
                        <v-radio class="clssinp011-007-sonota" label="その他" value="radio007-S" @click="click_radio(71)">
                            <template v-slot:label>
                                <div id="radio007-S_text">その他</div>
                            </template>
                        </v-radio>
                    </v-radio-group>
                </div>

                <div class="area011-008">
                    <label class="clsstitle011-008">介護区分</label>
                    <div class="area011-008-001">
                        <input class="chk011-001" type="checkbox" id="chksyukaigo" v-model="dispkaigokbn"
                            @click="check_click(0)">
                        <label id="chklabel011-001_id" class="chklabel011-001">主介護者</label>
                        <input class="chk011-002" type="checkbox" id="chkfuku1" v-model="dispkaigokbn_fuku1"
                            @click="check_click(1)">
                        <label id="chklabel011-002_id" class="chklabel011-002">副介護者①</label>
                        <input class="chk011-003" type="checkbox" id="chkfuku2" v-model="dispkaigokbn_fuku2"
                            @click="check_click(2)">
                        <label id="chklabel011-003_id" class="chklabel011-003">副介護者②</label>
                    </div>
                </div>

                <div class="area011-009">
                    <label class="clsstitle011-009">身元引受人</label>
                    <div class="area011-009-001">
                        <input class="chk011-004" type="checkbox" id="chkmimoto" v-model="dispmimoto" @click="check_mimoto">
                        <label id="chklabel011-004_id" class="chklabel011-004">該当</label>
                    </div>
                </div>

                <hr class="hr_style011-001">

                <div class="area011-010">
                    <label class="clsstitle011-010">緊急連絡</label>
                    <div class="area011-010-001">
                        <input class="chk011-005" type="checkbox" id="chkkinkyu1" v-model="dispkinkyu1"
                            @click="check_click_kinkyu(0)">
                        <label id="chklabel011-005_id" class="chklabel011-005">緊急連絡者①</label>
                        <input class="chk011-006" type="checkbox" id="chkkinkyu2" v-model="dispkinkyu2"
                            @click="check_click_kinkyu(1)">
                        <label id="chklabel011-006_id" class="chklabel011-006">緊急連絡者②</label>
                    </div>
                </div>

                <div class="area011-011">
                    <label class="clsstitle011-011">DM</label>
                    <div class="area011-011-001">
                        <input class="chk011-007" type="checkbox" id="chkdm" v-model="dispdm" @click="check_dm">
                        <label id="chklabel011-007_id" class="chklabel011-007">有り</label>
                    </div>
                </div>

                <div class="area011-012">
                    <label class="clsstitle011-012">住所</label>
                    <div class="area011-012-001">
                        <label class="clsstitle011-012-001">〒</label>
                        <input type="text" id="clssinp011-012-001_id" class="clssinp011-012-001" v-model="dispyubin1"
                            @input="text_input(2)" />
                        <label class="clsstitle011-012-002">ー</label>
                        <input type="text" id="clssinp011-012-002_id" class="clssinp011-012-002" v-model="dispyubin2"
                            @input="text_input(3)" />
                        <textarea type="text" id="clssinp011-012-003_id" class="clssinp011-012-003" v-model="dispadress"
                            @input="text_input(4)" />
                    </div>
                </div>

                <div class="area011-013">
                    <label class="clsstitle011-013">連絡先①</label>
                    <input type="text" id="clssinp011-013-001_id" class="clssinp011-013-001" v-model="disprenraku1_1"
                        @input="text_input(5)" />
                    <label class="clsstitle011-013-001">ー</label>
                    <input type="text" id="clssinp011-013-002_id" class="clssinp011-013-002" v-model="disprenraku1_2"
                        @input="text_input(6)" />
                    <label class="clsstitle011-013-002">ー</label>
                    <input type="text" id="clssinp011-013-003_id" class="clssinp011-013-003" v-model="disprenraku1_3"
                        @input="text_input(7)" />
                </div>

                <div class="area011-014">
                    <label class="clsstitle011-014">連絡先②</label>
                    <input type="text" id="clssinp011-014-001_id" class="clssinp011-014-001" v-model="disprenraku2_1"
                        @input="text_input(8)" />
                    <label class="clsstitle011-014-001">ー</label>
                    <input type="text" id="clssinp011-014-002_id" class="clssinp011-014-002" v-model="disprenraku2_2"
                        @input="text_input(9)" />
                    <label class="clsstitle011-014-002">ー</label>
                    <input type="text" id="clssinp011-014-003_id" class="clssinp011-014-003" v-model="disprenraku2_3"
                        @input="text_input(10)" />
                </div>

                <div class="area011-015">
                    <label class="clsstitle011-014">FAX番号</label>
                    <input type="text" id="clssinp011-015-001_id" class="clssinp011-014-001" v-model="dispfaxno1"
                        @input="text_input(11)" />
                    <label class="clsstitle011-014-001">ー</label>
                    <input type="text" id="clssinp011-015-002_id" class="clssinp011-014-002" v-model="dispfaxno2"
                        @input="text_input(12)" />
                    <label class="clsstitle011-014-002">ー</label>
                    <input type="text" id="clssinp011-015-003_id" class="clssinp011-014-003" v-model="dispfaxno3"
                        @input="text_input(13)" />
                </div>

                <div class="area011-016">
                    <label class="clsstitle011-016">Eメール</label>
                    <input type="text" id="clssinp011-016_id" class="clssinp011-016" v-model="dispemail"
                        @input="text_input(14)" />
                </div>

                <div class="area011-017">
                    <label class="clsstitle011-017">携帯メール</label>
                    <input type="text" id="clssinp011-017_id" class="clssinp011-017" v-model="dispkmail"
                        @input="text_input(15)" />
                </div>

                <div class="area011-018">
                    <label class="clsstitle011-018">勤務・学校</label>
                    <div class="area011-018-001">
                        <input class="chk011-008" type="checkbox" id="chkkinmu1" v-model="dispkinmu1"
                            @click="check_click_kinmu(0)">
                        <label id="chklabel011-008_id" class="chklabel011-008">就労</label>
                        <input class="chk011-009" type="checkbox" id="chkkinmu2" v-model="dispkinmu2"
                            @click="check_click_kinmu(1)">
                        <label id="chklabel011-009_id" class="chklabel011-009">就学</label>
                    </div>
                    <input type="text" id="clssinp011-018_id" class="clssinp011-018" v-model="dispkinmu_biko"
                        @input="text_input(16)" />
                </div>

                <div class="area011-019">
                    <label class="clsstitle011-019">備考</label>
                    <textarea type="text" id="clssinp011-019_id" class="clssinp011-019" v-model="dispbiko"
                        @input="text_input(17)" />
                </div>

                <div class="area011-020">
                    <v-btn class="clsbtnmenu011-clr" @click="onClick_clear">
                        クリア
                    </v-btn>
                    <v-btn class="clsbtnmenu011-del" @click="onClick_datadel">
                        削 除
                    </v-btn>
                    <v-btn class="clsbtnmenu011-ins" @click="onClick_datains">
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
import sysConst from '../../../utiles/const';
import sysConst_kotei from '../../../utiles/const_kotei';
import { getConnect } from '../../../connect/getConnect';
import { postConnect } from '../../../connect/postConnect';
import { putConnect } from '../../../connect/putConnect';
import { deleteConnect } from '../../../connect/deleteConnect';
import {Kotei_Copy_All} from '../../../js/koteiinf/kotei_common';



export default
    {
        props: ["ymd", "uniqid", "traceid", "jigyoid", "kotei_kbn", "login_siid"],
        data() {
            return {
                radio006: 'radio006-D',
                radio007: 'radio007-K',

                str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",
                HeaderList: [
                    {
                        dataname: 'kzknm',
                        title: '家族氏名',
                        kbktitle: '',
                        width: 190,
                        align: 'left',
                    },
                    {
                        dataname: 'kzkkana',
                        title: 'フリガナ',
                        kbktitle: '',
                        width: 190,
                        align: 'left',
                    },
                    {
                        dataname: 'tudukigara',
                        title: '続柄',
                        kbktitle: '',
                        width: 70,
                        align: 'left',
                    },
                    {
                        dataname: 'doukkbn',
                        title: '同居\n区分',
                        kbktitle: '',
                        width: 70,
                        align: 'center',
                    },
                    {
                        dataname: 'kzkkbn',
                        title: '家族\n区分',
                        kbktitle: '',
                        width: 100,
                        align: 'left',
                    },
                    {
                        dataname: 'kaigokbn',
                        title: '介護\n区分',
                        kbktitle: '',
                        width: 70,
                        align: 'center',
                    },
                    {
                        dataname: 'mimoto',
                        title: '身元引受人',
                        kbktitle: '',
                        width: 70,
                        align: 'center',
                    },
                    {
                        dataname: 'kinkyu',
                        title: '緊急\n連絡',
                        kbktitle: '',
                        width: 70,
                        align: 'center',
                    },
                    {
                        dataname: 'renrakusaki01',
                        title: '①',
                        kbktitle: '連絡先',
                        width: 180,
                        align: 'center',
                    },
                    {
                        dataname: 'renrakusaki02',
                        title: '②',
                        kbktitle: '連絡先',
                        width: 180,
                        align: 'center',
                    },
                    {
                        dataname: 'biko',
                        title: '備考',
                        kbktitle: '',
                        width: 340,
                        align: 'left',
                    },
                ]
                , InsWinflg: false
                , viewdata: []  //画面表示用成形データ
                , viewdata2: []  //元データ

                //基本情報
                , pmymd: ''         //表示していデータの日付  
                , pmymd_moto: ''    //表示していデータの元日付
                , pdataid: ''        //表示しているデータのdataid
                , intcode: 0        //表示しているデータのintcode
                , Ym: ''
                , picker: ''
                , GetApiData_reki: []    //API取得データ(履歴)
                , GetApiData_data: []    //API取得データ(データ)
                , headinskbn: 0   //0:個別登録 1:一括登録

                //新規履歴登録
                , insflg: true       //T:新規登録 F:更新登録
                , InsWinhead: false  //新規履歴ダイアログフラグ
                , datepicker_dialog_head: false

                //履歴参照ダイアログ
                , Rirekiwin: false
                , viewdata_reki: [],

                //確認ダイアログ関係
                dialog_Message_flg: false,
                Dialog_Message: '',       //ダイアログメッセージ
                dialo_Yesflg: false,      //ダイアログ結果
                dialo_Yesflg_no: false,      //ダイアログ結果No 1:Yse 2:No
                Btnno_Visible: false,     //「いいえ」ボタン表示設定  

                //調査日ダイアログ
                datepicker_dialog_tyosa: false, //調査日カレンダー

                //データ登録ダイアログ
                InsWindata: false,

                dialog_Actionflg: 0,

                //履歴のラベル
                Label_Visible: false,

                //入力チェック
                inputchk: false,

                //登録ウィンドウ変数
                tuzukiList: [],    //続柄のリスト
                //画面表示用変数
                Get_inputinf: this.get_inputdata(),

                dispkzkname: "",   //家族氏名
                dispkzkkana: "",   //家族カナ
                dispkzktuduki: "", //続柄
                dispkzktuduki_daiid: 0, //続柄
                dispkzktuduki_chuid: 0, //続柄
                dispdoukyokbn: "", //同居
                dispkzkkbn: "",    //家族区分
                dispkaigokbn: "",  //介護区分
                dispkaigokbn_fuku1: false,  //介護区分副1
                dispkaigokbn_fuku2: false,  //介護区分副2
                dispmimoto: "",    //身元引受人
                dispkinkyu1: "",    //緊急連絡1
                dispkinkyu2: "",    //緊急連絡2
                dispdm: "",        //DM
                dispyubin1: "",    //郵便番号1
                dispyubin2: "",    //郵便番号2
                dispadress: "",    //住所
                disprenraku1_1: "", //連絡先1-1
                disprenraku1_2: "", //連絡先1-2
                disprenraku1_3: "", //連絡先1-3
                disprenraku2_1: "", //連絡先2-1
                disprenraku2_2: "", //連絡先2-2
                disprenraku2_3: "", //連絡先2-3
                dispfaxno1: "",     //Fax1
                dispfaxno2: "",     //Fax2
                dispfaxno3: "",     //Fax3
                dispemail: "",      //Email
                dispkmail: "",      //携帯メール
                dispkinmu1: "",      //勤務1
                dispkinmu2: "",      //勤務2
                dispkinmu_biko: "", //勤務備考
                dispbiko: "",       //備考
                disprekitanto: 0,

                insdataflg: false,  //F:新規 T:更新
                selected_btn: 0,     //0:新規 1:更新

                pcntid: 0,         //選択しているデータのcntid

                //ドラッグ関係
                Dragflg: false,
                mouseX: 0,
                mouseY: 0,
                screenX: 0,
                screenY: 0,
                moveX: 0,
                moveY: 0,

                //続柄
                MstList: [],
                Grid_Visible: false, //マスタグリッドの表示切替

            };

        },
        methods: {
            get_inputdata() {
                //続柄を取得

                //API取得
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    pJigyoid: this.jigyoid,
                };
                getConnect('/Mst_zokugara', params, 'KOTEIINF').then((result) => {
                    _self.Get_inputinf = result;
                });

            }
            , DspTudukiInput() {
                //#####続柄の画面表示を行う#####

                let wk_tuduki_data = [];
                let tuduki_data = [];
                let dainame = ""; //大項目
                let daiid = "";   //大項目ID

                //続柄
                wk_tuduki_data =
                {
                    daiid: 0,
                    chuid: 0,
                    namedai: "(クリア)",
                    clear: "(クリア)",
                    namechu: "(クリア)",
                    value: " ",
                }
                tuduki_data.push(wk_tuduki_data);

                if (this.Get_inputinf.icrn_inf != null) {
                    //取得したデータを確保
                    this.Get_inputinf.icrn_inf.forEach(function (value) {
                        dainame = value.daiName;
                        daiid = value.daiId;

                        value.chuList.forEach(function (value2) {
                            wk_tuduki_data =
                            {
                                daiid: daiid,
                                chuid: value2.chuId,
                                namedai: dainame,
                                namechu: value2.chuName,
                                clear: "(クリア)",
                                value: value2.chuName,
                            }
                            tuduki_data.push(wk_tuduki_data);
                        });
                    });
                    this.MstList = tuduki_data.concat();
                }
            }

            , onClickCopy() {
                //前回コピーボタン押下時
                this.Dragflg = false;
                this.Message_Dialog(sysConst.MSG_COPY_CHK, 8);
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
                    kbn: this.kotei_kbn,             //家族情報
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
                this.Rirekiwin = true;
            },
            newClick() {
                this.InsWinflg = true;
            },
            onformatItem(flexgrid, e) {
                if (flexgrid.columns.length == 0) {
                    return;
                }

                //罫線
                //グリッドの色を変更
                if (e.panel == flexgrid.columnHeaders) {
                    e.cell.style.borderRight = "1px solid #8ffd7a";
                    e.cell.style.borderBottom = "1px solid #8ffd7a";

                    if (e.col < 7) {
                        //背景色青
                        //e.cell.style.backgroundcolor = "#fffff"
                        e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;

                    }
                    else {
                        //背景色緑
                        //e.cell.style.backgroundcolor = "#8ffd7a"
                        e.cell.style.backgroundColor = "#dffae0";
                    }
                }
            },
            onInitializeIcrnGrid(flexGrid) {
                let headerlist = this.HeaderList;

                flexGrid.beginUpdate();
                //flexGrid.cssClassAll = "Gridicrn010-001";

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[1].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 30;
                flexGrid.columnHeaders.rows[1].height = 30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header010'
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
                            ? headerlist[colIndex].title
                            : headerlist[colIndex].kbktitle
                    )
                    flexGrid.columnHeaders.setCellData(
                        1,
                        colIndex,
                        headerlist[colIndex].title
                    )

                }

                this.flex = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click(e) }.bind(this));

                flexGrid.endUpdate();
                //this.$refs.mdselect.setYm(this.picker);
            }
            , onItemsSourceChanged(flexGrid) {
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            }
            , grid_click(e) {
                if (this.Chk_Reki() == true) {
                    this.InsWindata = true;

                    var ht = this.flex.hitTest(e);
                    //グリッドがクリックされた場合ウィンドウを表示する
                    if (ht.row >= 0) {
                        this.Grid_Visible = false;
                        this.dispkzkname = this.viewdata2[ht.row].kazoku_kazokuname;
                        this.dispkzkkana = this.viewdata2[ht.row].kazoku_kazokukana;
                        this.dispkzktuduki = this.viewdata2[ht.row].kazoku_tuzukigarachuname;
                        this.dispkzktuduki_daiid = this.viewdata2[ht.row].kazoku_tuzukigaraid;    //続柄(大)
                        this.dispkzktuduki_chuid = this.viewdata2[ht.row].kazoku_tuzukigarachuid; //続柄(中)

                        this.dispdoukyokbn = this.viewdata2[ht.row].kazoku_doukyokbn;

                        let winter = setInterval(() => {
                            //ラジオボタン
                            var D6 = document.getElementById("radio006-D_text");
                            var H6 = document.getElementById("radio006-H_text");
                            var K7 = document.getElementById("radio007-K_text");
                            var S7 = document.getElementById("radio007-S_text");

                            //チェックボックス
                            var chk_syu_text = document.getElementById("chklabel011-001_id");
                            var chk_fuku1_text = document.getElementById("chklabel011-002_id");
                            var chk_fuku2_text = document.getElementById("chklabel011-003_id");
                            var chk_mimoto_text = document.getElementById("chklabel011-004_id");
                            var chk_kin1_text = document.getElementById("chklabel011-005_id");
                            var chk_kin2_text = document.getElementById("chklabel011-006_id");
                            var chk_dm_text = document.getElementById("chklabel011-007_id");
                            var chk_kinmu1_text = document.getElementById("chklabel011-008_id");
                            var chk_kinmu2_text = document.getElementById("chklabel011-009_id");


                            if (D6.style != null && H6.style != null && K7.style != null && S7.style != null
                                && chk_syu_text.style != null && chk_fuku1_text.style != null && chk_fuku2_text.style != null
                                && chk_mimoto_text.style != null && chk_kin1_text.style != null && chk_kin2_text.style != null
                                && chk_dm_text.style != null && chk_kinmu1_text.style != null && chk_kinmu2_text.style != null) {
                                clearInterval(winter);

                                document.getElementById("radio006-D_text").style.color = "#000"
                                document.getElementById("radio006-H_text").style.color = "#000"
                                if (this.viewdata2[ht.row].kazoku_doukyokbn == 1) {
                                    //同居
                                    this.radio006 = "radio006-D";
                                    document.getElementById("radio006-D_text").style.color = "#0081eb"
                                }
                                else {
                                    //非同居
                                    this.radio006 = "radio006-H";
                                    document.getElementById("radio006-H_text").style.color = "#0081eb"
                                }
                                this.dispkzkkbn = this.viewdata2[ht.row].kazoku_kazokukbn;

                                document.getElementById("radio007-K_text").style.color = "#000"
                                document.getElementById("radio007-S_text").style.color = "#000"
                                if (this.viewdata2[ht.row].kazoku_kazokukbn == 1) {
                                    //家族
                                    this.radio007 = "radio007-K";
                                    document.getElementById("radio007-K_text").style.color = "#0081eb"
                                }
                                else {
                                    //その他
                                    this.radio007 = "radio007-S";
                                    document.getElementById("radio007-S_text").style.color = "#0081eb"
                                }

                                //チェックボックス
                                if (this.viewdata2[ht.row].kazoku_kaigokbn_syu == 1) { chk_syu_text.style.color = "#0081eb"; }     //介護区分(主)
                                if (this.viewdata2[ht.row].kazoku_kaigokbn_fuku1 == 1) { chk_fuku1_text.style.color = "#0081eb"; } //介護区分(副1)
                                if (this.viewdata2[ht.row].kazoku_kaigokbn_fuku2 == 1) { chk_fuku2_text.style.color = "#0081eb"; } //介護区分(副2)
                                if (this.viewdata2[ht.row].kazoku_mimoto == 1) { chk_mimoto_text.style.color = "#0081eb"; }       //身元
                                if (this.viewdata2[ht.row].kazoku_kinkyu_renraku1 == 1) { chk_kin1_text.style.color = "#0081eb"; } //緊急連絡先1
                                if (this.viewdata2[ht.row].kazoku_kinkyu_renraku2 == 1) { chk_kin2_text.style.color = "#0081eb"; } //緊急連絡先2
                                if (this.viewdata2[ht.row].kazoku_dm == 1) { chk_dm_text.style.color = "#0081eb"; }                //DM
                                if (this.viewdata2[ht.row].kazoku_kinmu == 1) { chk_kinmu1_text.style.color = "#0081eb"; }         //勤務1
                                if (this.viewdata2[ht.row].kazoku_kinmu == 2) { chk_kinmu2_text.style.color = "#0081eb"; }         //勤務2

                                //表示位置設定
                                var wdialog = document.getElementById("data_010id");
                                wdialog.style.bottom = (window.innerHeight - 870) / 2 + "px";
                                wdialog.style.right = (window.innerWidth - 750) / 2 + "px";

                            }
                        }, "interval");


                        this.dispyubin1 = this.viewdata2[ht.row].kazoku_yubinno1;
                        this.dispyubin2 = this.viewdata2[ht.row].kazoku_yubinno2;
                        this.dispadress = this.viewdata2[ht.row].kazoku_address;
                        this.disprenraku1_1 = this.viewdata2[ht.row].kazoku_renraku1_1;
                        this.disprenraku1_2 = this.viewdata2[ht.row].kazoku_renraku1_2;
                        this.disprenraku1_3 = this.viewdata2[ht.row].kazoku_renraku1_3;
                        this.disprenraku2_1 = this.viewdata2[ht.row].kazoku_renraku2_1;
                        this.disprenraku2_2 = this.viewdata2[ht.row].kazoku_renraku2_2;
                        this.disprenraku2_3 = this.viewdata2[ht.row].kazoku_renraku2_3;
                        this.dispfaxno1 = this.viewdata2[ht.row].kazoku_faxno_1;
                        this.dispfaxno2 = this.viewdata2[ht.row].kazoku_faxno_2;
                        this.dispfaxno3 = this.viewdata2[ht.row].kazoku_faxno_3;
                        this.dispemail = this.viewdata2[ht.row].kazoku_email;
                        this.dispkmail = this.viewdata2[ht.row].kazoku_kmail;
                        this.dispkinmu = this.viewdata2[ht.row].kazoku_kinmu;
                        if (this.viewdata2[ht.row].kazoku_kinmu == 1) { this.dispkinmu1 = true; }
                        else if (this.viewdata2[ht.row].kazoku_kinmu == 2) { this.dispkinmu2 = true; }
                        this.dispkinmu_biko = this.viewdata2[ht.row].kazoku_kinmu_biko;
                        this.dispbiko = this.viewdata2[ht.row].kazoku_biko;

                        //チェックボックス
                        if (this.viewdata2[ht.row].kazoku_kaigokbn_syu == 1) { this.dispkaigokbn = true; }
                        if (this.viewdata2[ht.row].kazoku_kaigokbn_fuku1 == 1) { this.dispkaigokbn_fuku1 = true; }
                        if (this.viewdata2[ht.row].kazoku_kaigokbn_fuku2 == 1) { this.dispkaigokbn_fuku2 = true; }
                        if (this.viewdata2[ht.row].kazoku_mimoto == 1) { this.dispmimoto = true; }
                        if (this.viewdata2[ht.row].kazoku_kinkyu_renraku1 == 1) { this.dispkinkyu1 = true; }
                        if (this.viewdata2[ht.row].kazoku_kinkyu_renraku2 == 1) { this.dispkinkyu2 = true; }
                        if (this.viewdata2[ht.row].kazoku_dm == 1) { this.dispdm = true; }

                        this.pcntid = this.viewdata2[ht.row].kazoku_cntid;  //カウントID
                        this.selected_btn = 1;  //更新
                        this.insdataflg = true; //更新フラグ
                    }
                    else {
                        this.dispkzkname = "";
                        this.dispkzkkana = "";
                        this.dispkzktuduki = "";
                        this.dispkzktuduki_daiid = 0;
                        this.dispkzktuduki_chuid = 0;
                        this.dispdoukyokbn = 0;
                        this.radio006 == "radio006-D"  //初期値
                        this.dispkzkkbn = 0;
                        this.radio007 == "radio007-K"

                        this.dispyubin1 = "";
                        this.dispyubin2 = "";
                        this.dispadress = "";
                        this.disprenraku1_1 = "";
                        this.disprenraku1_2 = "";
                        this.disprenraku1_3 = "";
                        this.disprenraku2_1 = "";
                        this.disprenraku2_2 = "";
                        this.disprenraku2_3 = "";
                        this.dispfaxno1 = "";
                        this.dispfaxno2 = "";
                        this.dispfaxno3 = "";
                        this.dispemail = "";
                        this.dispkmail = "";
                        this.dispkinmu = "";
                        this.dispkinmu1 = false;
                        this.dispkinmu2 = false;
                        this.dispkinmu_biko = "";
                        this.dispbiko = "";

                        //チェックボックス
                        this.dispkaigokbn = false;
                        this.dispkaigokbn_fuku1 = false;
                        this.dispkaigokbn_fuku2 = false;
                        this.dispmimoto = false;
                        this.dispkinkyu1 = false;
                        this.dispkinkyu2 = false;
                        this.dispdm = false;

                        this.pcntid = 0;  //カウントID

                        this.selected_btn = 0;  //新規
                        this.insdataflg = false; //新規フラグ


                        let winter2 = setInterval(() => {
                            var wdialog = document.getElementById("data_010id");
                            //ラジオボタン
                            var D6 = document.getElementById("radio006-D_text");
                            var H6 = document.getElementById("radio006-H_text");
                            var K7 = document.getElementById("radio007-K_text");
                            var S7 = document.getElementById("radio007-S_text");

                            //チェックボックス
                            var chk_syu_text = document.getElementById("chklabel011-001_id");
                            var chk_fuku1_text = document.getElementById("chklabel011-002_id");
                            var chk_fuku2_text = document.getElementById("chklabel011-003_id");
                            var chk_mimoto_text = document.getElementById("chklabel011-004_id");
                            var chk_kin1_text = document.getElementById("chklabel011-005_id");
                            var chk_kin2_text = document.getElementById("chklabel011-006_id");
                            var chk_dm_text = document.getElementById("chklabel011-007_id");
                            var chk_kinmu1_text = document.getElementById("chklabel011-008_id");
                            var chk_kinmu2_text = document.getElementById("chklabel011-009_id");

                            if (wdialog.style != null && D6.style != null && H6.style != null && K7.style != null && S7.style != null
                                && chk_syu_text.style != null && chk_fuku1_text.style != null && chk_fuku2_text.style != null
                                && chk_mimoto_text.style != null && chk_kin1_text.style != null && chk_kin2_text.style != null
                                && chk_dm_text.style != null && chk_kinmu1_text.style != null && chk_kinmu2_text.style != null) {
                                clearInterval(winter2);

                                D6.style.color = "";
                                H6.style.color = "";
                                K7.style.color = "";
                                S7.style.color = "";
                                chk_syu_text.style.color = "#000";
                                chk_fuku1_text.style.color = "#000";
                                chk_fuku2_text.style.color = "#000";
                                chk_mimoto_text.style.color = "#000";
                                chk_kin1_text.style.color = "#000";
                                chk_kin2_text.style.color = "#000";
                                chk_dm_text.style.color = "#000";
                                chk_kinmu1_text.style.color = "#000";
                                chk_kinmu2_text.style.color = "#000";

                                //表示位置設定
                                wdialog.style.bottom = (window.innerHeight - 870) / 2 + "px";
                                wdialog.style.right = (window.innerWidth - 750) / 2 + "px";
                            }
                        }, "interval");

                    }
                }
                //this.InsWindata = true;
            }
            , onClick_add() {
                //新規追加クリック
                this.dispkzkname = "";
                this.dispkzkkana = "";
                this.dispkzktuduki = "";
                this.dispkzktuduki_daiid = 0;
                this.dispkzktuduki_chuid = 0;
                this.dispdoukyokbn = 0;
                this.radio006 == "radio006-D"  //初期値
                this.dispkzkkbn = 0;
                this.radio007 == "radio007-K"

                this.dispyubin1 = "";
                this.dispyubin2 = "";
                this.dispadress = "";
                this.disprenraku1_1 = "";
                this.disprenraku1_2 = "";
                this.disprenraku1_3 = "";
                this.disprenraku2_1 = "";
                this.disprenraku2_2 = "";
                this.disprenraku2_3 = "";
                this.dispfaxno1 = "";
                this.dispfaxno2 = "";
                this.dispfaxno3 = "";
                this.dispemail = "";
                this.dispkmail = "";
                this.dispkinmu = "";
                this.dispkinmu1 = false;
                this.dispkinmu2 = false;
                this.dispkinmu_biko = "";
                this.dispbiko = "";

                //チェックボックス
                this.dispkaigokbn = false;
                this.dispkaigokbn_fuku1 = false;
                this.dispkaigokbn_fuku2 = false;
                this.dispmimoto = false;
                this.dispkinkyu1 = false;
                this.dispkinkyu2 = false;
                this.dispdm = false;
                this.pcntid = 0;  //カウントID
                this.selected_btn = 0;  //新規
                this.insdataflg = false; //新規フラグ            

                let winter2 = setInterval(() => {
                    //ラジオボタン
                    var D6 = document.getElementById("radio006-D_text");
                    var H6 = document.getElementById("radio006-H_text");
                    var K7 = document.getElementById("radio007-K_text");
                    var S7 = document.getElementById("radio007-S_text");

                    //チェックボックス
                    var chk_syu_text = document.getElementById("chklabel011-001_id");
                    var chk_fuku1_text = document.getElementById("chklabel011-002_id");
                    var chk_fuku2_text = document.getElementById("chklabel011-003_id");
                    var chk_mimoto_text = document.getElementById("chklabel011-004_id");
                    var chk_kin1_text = document.getElementById("chklabel011-005_id");
                    var chk_kin2_text = document.getElementById("chklabel011-006_id");
                    var chk_dm_text = document.getElementById("chklabel011-007_id");
                    var chk_kinmu1_text = document.getElementById("chklabel011-008_id");
                    var chk_kinmu2_text = document.getElementById("chklabel011-009_id");

                    if (D6.style != null && H6.style != null && K7.style != null && S7.style != null
                        && chk_syu_text.style != null && chk_fuku1_text.style != null && chk_fuku2_text.style != null
                        && chk_mimoto_text.style != null && chk_kin1_text.style != null && chk_kin2_text.style != null
                        && chk_dm_text.style != null && chk_kinmu1_text.style != null && chk_kinmu2_text.style != null) {
                        clearInterval(winter2);

                        D6.style.color = "";
                        H6.style.color = "";
                        K7.style.color = "";
                        S7.style.color = "";
                        chk_syu_text.style.color = "#000";
                        chk_fuku1_text.style.color = "#000";
                        chk_fuku2_text.style.color = "#000";
                        chk_mimoto_text.style.color = "#000";
                        chk_kin1_text.style.color = "#000";
                        chk_kin2_text.style.color = "#000";
                        chk_dm_text.style.color = "#000";
                        chk_kinmu1_text.style.color = "#000";
                        chk_kinmu2_text.style.color = "#000";

                    }
                }, "interval");

                this.InsWindata = true;
            }

            //データ受け取り
            , setUserData(wintcode, wSeldata) {
                //利用者選択データ受け取り
                this.inputchk = false             //入力チェックリセット
                this.pdataid = 0;                 //初期化
                this.viewClear();                 //クリア
                this.GetApiData_reki = wSeldata;  //履歴
                this.GetApiData_data = [];        //データ
                this.intcode = wintcode;          //利用者コード
                this.Ym = dayjs();                //日付を初期化
                this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
                this.DataFilter();

                //データがない場合ラベルを表示
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
                this.viewdata2 = [];
                this.Grid_Visible = false;
            }
            , Chk_Reki: function () {
                //履歴をチェックする
                if (this.Label_Visible == true) {
                    this.Message_Dialog(sysConst.MSG_REKI_CRE)
                    return false;
                }
                else {
                    return true;
                }
            }
            //画面更新
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
            }
            , Message_Dialog(Message, actionflg) {

                //汎用メッセージダイアログ
                this.Dialog_Message = Message;
                this.dialog_Actionflg = actionflg;  //メッセージのみ
                this.Btnno_Visible = false;
                if (actionflg > 0) this.Btnno_Visible = true;
                this.dialog_Message_flg = true
            }

            //###画面表示###
            , DataFilter() {
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.GetApiData_reki.icrn_inf != null) {

                    //家族情報のデータのみに絞る
                    this.GetApiData_reki.icrn_inf.forEach(function (value) {
                        //区分が家族情報
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
                                    head_siname: value.head_sryaku,
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

                    this.viewdata_reki = Rekidata.concat();

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
                    Kbn: this.kotei_kbn,             //家族情報
                    Dataid: this.pdataid,
                    Modeflg: sysConst_kotei.GET_KBN_DATA,        //データ取得
                };

                getConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF').then((result) => {
                    _self.GetApiData_data = result;
                    this.DataFilter2();
                })
            }

            //画面更新
            , DataFilter2() {
                let data = [];  //成形データ
                let data2 = [];  //元データ
                let wdataid = this.pdataid;
                let wk_Ymd = "";
                let wk_kbn = this.kotei_kbn;

                let wk_putdata = [];


                if (this.GetApiData_data.icrn_inf != null) {
                    //家族情報のデータのみに絞る
                    this.GetApiData_data.icrn_inf.forEach(function (value) {

                        //区分が家族情報
                        if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {

                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",

                                //家族情報ヘッダの内容を取得
                                value.naiyo.forEach(function (value2) {

                                    //データを成形
                                    let txt_doukyo = "";  //同居区分
                                    let txt_kzk = "";     //家族区分
                                    let txt_kaigo = "";   //介護区分
                                    let txt_mimoto = "";  //身元
                                    let txt_kinkyu = "";  //緊急連絡
                                    value2.kazoku_doukyokbn == 1 ? txt_doukyo = "同居" : txt_doukyo = "非同居";
                                    value2.kazoku_kazokukbn == 1 ? txt_kzk = "家族" : txt_kzk = "その他";
                                    value2.kazoku_kaigokbn_syu == 1 ? txt_kaigo = "主" : txt_kaigo = "";
                                    value2.kazoku_kaigokbn_fuku1 == 1 ? txt_kaigo = "副①" : txt_kaigo = "";
                                    value2.kazoku_kaigokbn_fuku2 == 1 ? txt_kaigo = "副②" : txt_kaigo = "";
                                    value2.kazoku_mimoto == 1 ? txt_mimoto = "○" : txt_mimoto = "";
                                    value2.kazoku_kinkyu_renraku1 == 1 ? txt_kinkyu = "①" : txt_kinkyu = "";
                                    value2.kazoku_kinkyu_renraku2 == 1 ? txt_kinkyu = "②" : txt_kinkyu = "";

                                    wk_putdata =
                                    {
                                        kzknm: value2.kazoku_kazokuname,
                                        kzkkana: value2.kazoku_kazokukana,
                                        tudukigara: value2.kazoku_tuzukigarachuname,
                                        doukkbn: txt_doukyo,
                                        kzkkbn: txt_kzk,
                                        kaigokbn: txt_kaigo,
                                        mimoto: txt_mimoto,
                                        kinkyu: txt_kinkyu,
                                        renrakusaki01: value2.kazoku_renraku1_1 + "-" + value2.kazoku_renraku1_2 + "-" + value2.kazoku_renraku1_3,
                                        renrakusaki02: value2.kazoku_renraku2_1 + "-" + value2.kazoku_renraku2_2 + "-" + value2.kazoku_renraku2_3,
                                        biko: value2.kazoku_biko,
                                        kazoku_siname: value2.kazoku_siname,
                                        kazoku_insymd: value2.kazoku_insymd,
                                        kazoku_instime: value2.kazoku_instime
                                    }

                                    data.push(wk_putdata);
                                    data2.push(value2);


                                });
                        }
                    });

                    this.str_ymd = wk_Ymd;
                    this.pmymd = this.str_ymd;
                    this.pmymd_moto = this.str_ymd;       //AAA
                    /*
                    data.sort(function(a,b){
                      if(a.seikatu_no < b.seikatu_no) return -1;
                      if(b.seikatu_no < a.seikatu_no) return 1;
                    });
                    */
                    this.viewdata = data.concat();
                    this.viewdata2 = data2.concat();

                    //フッターラベル
                    if (data.length > 0) {
                        //日付順
                        data.sort(function (a, b) {
                            if (b.kazoku_insymd < a.kazoku_insymd) return -1;
                            if (a.kazoku_insymd < b.kazoku_insymd) return 1;
                        });

                        let footer = "(最終登録日 : ";
                        footer = footer + data[0].kazoku_insymd.substring(0, 4)
                            + "年" + data[0].kazoku_insymd.substring(4, 6)
                            + "月" + data[0].kazoku_insymd.substring(6)
                            + "日 ";
                        footer = footer + data[0].kazoku_instime + " ";
                        footer = footer + data[0].kazoku_siname + ")";
                        document.getElementById("footer_010").innerHTML = wjCore.escapeHtml(footer);
                    }
                }
            }

            //###ダイアログ###
            , onClick_Massege(kbn) {
                //確認ダイアログ判定
                if (kbn == 0) {
                    this.dialo_Yesflg_no = 1;
                    this.dialo_Yesflg = true;
                    if (this.dialog_Actionflg == 1) {
                        //履歴の新規追加
                        this.Head_insData();
                    }
                    if (this.dialog_Actionflg == 4) {
                        //履歴の削除
                        this.del_rekidata();
                    }
                    if (this.dialog_Actionflg == 5) {
                        //履歴日付更新
                        this.insYmd_data();
                    }
                    if (this.dialog_Actionflg == 6) {
                        //入力データ登録
                        this.ins_inputdata();
                    }
                    if (this.dialog_Actionflg == 7) {
                        //入力データ登録
                        this.del_inputdata();
                    }
                    if (this.dialog_Actionflg == 8) {
                        //前回コピー
                        this.DataCopy();
                    }
                    if (this.dialog_Actionflg == 9) {
                        //画面移動チェック
                        this.dialog_Message_flg = false;
                    }
                }
                else {
                    this.dialo_Yesflg_no = 2;
                    this.dialo_Yesflg = false;
                }

                this.dialog_Message_flg = false;
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
            }
            //カレンダークリック          
            , inputCalendarClick(kbn) {
                //#####カレンダークリック#####
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

            //####新規履歴作成####
            , onHeadclick_ins() {
                this.Ym = dayjs();
                this.insflg = true;//新規登録
                this.InsWinhead = true;
            }
            , Click_colse() {
                //×ボタン
                this.InsWinhead = false;
            }
            , Click_colse_win() {
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
                                this.ins_inputdata();
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
            , onHead_ins() {
                //登録ボタン
                this.Message_Dialog("履歴を新規登録します。\nよろしいですか。", 1); //履歴の新規追加
            }

            , Head_insData(kbn) {
                //kbn:1 画面遷移時の登録 リロードしない

                //履歴の登録処理
                let ins_ymd = this.Ym.format('YYYY') + this.Ym.format('MM') + this.Ym.format('DD');
                let ins_siid = this.disprekitanto;

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
                        kbn: this.kotei_kbn,//家族情報
                        intcode: this.intcode,
                        insflg: wk_insflg, //ヘッダ登録
                    }

                    //登録データ
                    let postdata =
                        [
                            {
                                head_jigyoid: this.jigyoid,
                                head_intcode: this.intcode,
                                head_kbn: this.kotei_kbn,  //家族情報
                                head_dataid: this.pdataid,
                                head_mstid: 0,
                                head_mymd: ins_ymd,
                                head_siid: ins_siid,
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
                                kaigosya_kzkdataid: 0,
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

                    if (wk_insflg == sysConst_kotei.INS_KBN_HEADAll) {
                        postConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', postdata).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata_honnin = result;
                        });
                        postConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF', postdata).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata_syakai = result;
                        });

                    }
                    postConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', postdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (document.getElementById("chk_head010").checked == true) {
                        //前回コピーを実施する
                        Kotei_Copy_All(this.uniqid,this.traceid,this.intcode,this.jigyoid,ins_ymd,wk_insflg,sysConst_kotei.KOTEI_ID_KIHON).then();                        
                    }                        
                        if (kbn != 1) this.View_upd(this.intcode);
                        //メッセージ
                        this.Message_Dialog(sysConst.MSG_REKI_INS);
                        this.InsWinhead = false;
                    });
                }
                else {
                    //更新登録
                    let _self = this;
                    let params = [];

                    params =
                    {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,//家族情報
                        intcode: this.intcode,
                        insflg: sysConst_kotei.INS_KBN_HEAD, //ヘッダ登録
                    }

                    //登録データ
                    let putdata =
                        [
                            {
                                head_jigyoid: this.jigyoid,
                                head_intcode: this.intcode,
                                head_kbn: this.kotei_kbn,  //家族情報
                                head_dataid: this.pdataid,
                                head_mstid: 0,
                                head_mymd: ins_ymd,
                                head_siid: ins_siid,
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
                                kazoku_address: " ",
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
                                kaigosya_kzkdataid: 0,
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

                    putConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_REKI_UPD);
                        this.InsWinhead = false;
                    }
                    );
                }
                this.headinskbn = 0;//登録区分初期化
            }

            //####履歴参照####
            , onInitializeIcrnGrid_reki(flexGrid) {
                flexGrid.beginUpdate();
                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 30;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Reki'
                flexGrid.cells.rows.defaultSize = 30;
                flexGrid.alternatingRowStep = 0;
                flexGrid.endUpdate();

                this.flex2 = flexGrid;
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_reki(e) }.bind(this));
            }
            , onItemsSourceChanged_reki(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
            },
            grid_click_reki: function (e) {
                var ht = this.flex2.hitTest(e);
                if (ht.row >= 0) {
                    //グリッドがクリックされた場合画面の表示を更新する                
                    this.inputchk = false;
                    this.pdataid = this.viewdata_reki[ht.row].head_dataid;
                    this.get_data();
                }

            }
            , Click_colse_Reki() {
                this.Rirekiwin = false;
            }

            //###データ登録・削除###
            , onClickIns() {
                //データ登録ボタン
                this.Message_Dialog("入力データを登録します。\nよろしいですか。", 5);
            }
            , onClickdel() {
                //データ登録ボタン
                this.Message_Dialog("入力データを削除します。\nよろしいですか。", 4);
            }
            , insYmd_data() {
                this.insflg = false;
                if (this.pmymd != this.pmymd_moto) {
                    this.Head_insData();
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
                    cntid: 0,
                    kzkid: 0,
                    lcnt: 1,
                    headflg: sysConst_kotei.DEL_KBN_REKI,
                }

                //削除処理
                deleteConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_REKI_DEL);
                });
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
            , oninitCombo() {

            },
            onhokensyuClicked() { }
            , click_radio(kbn) {
                this.inputchk = true;//入力チェックT

                switch (kbn) {

                    //同居
                    case 60:
                        document.getElementById("radio006-D_text").style.color = "#0081eb";
                        document.getElementById("radio006-H_text").style.color = "";
                        break;
                    case 61:
                        document.getElementById("radio006-D_text").style.color = "";
                        document.getElementById("radio006-H_text").style.color = "#0081eb";
                        break;
                    case 70:
                        document.getElementById("radio007-K_text").style.color = "#0081eb";
                        document.getElementById("radio007-S_text").style.color = "";
                        break;
                    case 71:
                        document.getElementById("radio007-K_text").style.color = "";
                        document.getElementById("radio007-S_text").style.color = "#0081eb";
                        break;
                }

            }
            , check_click(kbn) {
                //介護者区分チェック
                this.inputchk = true;//入力チェックT

                document.getElementById("chksyukaigo").checked = false;
                document.getElementById("chkfuku1").checked = false;
                document.getElementById("chkfuku2").checked = false;
                document.getElementById("chklabel011-001_id").style.color = "#000";
                document.getElementById("chklabel011-002_id").style.color = "#000";
                document.getElementById("chklabel011-003_id").style.color = "#000";
                if (kbn == 0) {
                    document.getElementById("chksyukaigo").checked = true;
                    document.getElementById("chklabel011-001_id").style.color = "#0081eb";
                }
                if (kbn == 1) {
                    document.getElementById("chkfuku1").checked = true;
                    document.getElementById("chklabel011-002_id").style.color = "#0081eb";
                }
                if (kbn == 2) {
                    document.getElementById("chkfuku2").checked = true;
                    document.getElementById("chklabel011-003_id").style.color = "#0081eb";
                }
            }
            , check_mimoto() {
                //身元クリック
                this.inputchk = true;//入力チェックT
                document.getElementById("chklabel011-004_id").style.color = "#000";
                if (document.getElementById("chkmimoto").checked == true) {
                    document.getElementById("chklabel011-004_id").style.color = "#0081eb";
                }
            }
            , check_click_kinkyu(kbn) {
                //緊急連絡チェック
                this.inputchk = true;//入力チェックT

                document.getElementById("chkkinkyu1").checked = false;
                document.getElementById("chkkinkyu2").checked = false;
                document.getElementById("chklabel011-005_id").style.color = "#000";
                document.getElementById("chklabel011-006_id").style.color = "#000";
                if (kbn == 0) {
                    document.getElementById("chkkinkyu1").checked = true;
                    document.getElementById("chklabel011-005_id").style.color = "#0081eb";
                }
                if (kbn == 1) {
                    document.getElementById("chkkinkyu2").checked = true;
                    document.getElementById("chklabel011-006_id").style.color = "#0081eb";
                }
            }
            , check_dm() {
                //DMクリック
                this.inputchk = true;//入力チェックT
                document.getElementById("chklabel011-007_id").style.color = "#000";
                if (document.getElementById("chkdm").checked == true) {
                    document.getElementById("chklabel011-007_id").style.color = "#0081eb";
                }
            }
            , check_click_kinmu(kbn) {
                //介護者区分チェック
                this.inputchk = true;//入力チェックT

                document.getElementById("chkkinmu1").checked = false;
                document.getElementById("chkkinmu2").checked = false;
                document.getElementById("chklabel011-008_id").style.color = "#000";
                document.getElementById("chklabel011-009_id").style.color = "#000";
                if (kbn == 0) {
                    document.getElementById("chkkinmu1").checked = true;
                    document.getElementById("chklabel011-008_id").style.color = "#0081eb";
                }
                if (kbn == 1) {
                    document.getElementById("chkkinmu2").checked = true;
                    document.getElementById("chklabel011-009_id").style.color = "#0081eb";
                }
            }
            , text_input(kbn) {
                //文字数制限とかやる
                this.inputchk = true;

                switch (kbn) {
                    case 0://氏名
                        {
                            let textarea = document.getElementById("clssinp011-003_id");
                            //文字数制御
                            if (textarea.value.length > 15) //文字数制限
                            {
                                this.dispkzkname = textarea.value.substring(0, 15);
                            }
                        }
                        break;

                    case 1://カナ
                        {
                            let textarea = document.getElementById("clssinp011-004_id");
                            //文字数制御
                            if (textarea.value.length > 20) //文字数制限
                            {
                                this.dispkzkkana = textarea.value.substring(0, 20);
                            }
                        }
                        break;

                    case 2://郵便番号左
                        {
                            let textarea = document.getElementById("clssinp011-012-001_id");
                            //文字数制御
                            if (textarea.value.length > 3) //文字数制限
                            {
                                this.dispyubin1 = textarea.value.substring(0, 3);
                            }
                        }
                        break;

                    case 3://郵便番号右
                        {
                            let textarea = document.getElementById("clssinp011-012-002_id");
                            //文字数制御
                            if (textarea.value.length > 4) //文字数制限
                            {
                                this.dispyubin2 = textarea.value.substring(0, 4);
                            }
                        }
                        break;
                    case 4://住所
                        {
                            let textarea = document.getElementById("clssinp011-012-003_id");
                            //文字数制御
                            if (textarea.value.length > 100) //文字数制限
                            {
                                this.dispadress = textarea.value.substring(0, 100);
                            }
                        }
                        break;
                    case 5://連絡先1-1
                        {
                            let textarea = document.getElementById("clssinp011-013-001_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.disprenraku1_1 = textarea.value.substring(0, 5);
                            }

                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.disprenraku1_1 = textarea.value.substring(0, textarea.value.length - 1);
                            }

                        }
                        break;

                    case 6://連絡先1-2
                        {
                            let textarea = document.getElementById("clssinp011-013-002_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.disprenraku1_2 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.disprenraku1_2 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 7://連絡先1-3
                        {
                            let textarea = document.getElementById("clssinp011-013-003_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.disprenraku1_3 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.disprenraku1_3 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 8://連絡先2-1
                        {
                            let textarea = document.getElementById("clssinp011-014-001_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.disprenraku2_1 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.disprenraku2_1 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 9://連絡先2-2
                        {
                            let textarea = document.getElementById("clssinp011-014-002_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.disprenraku2_2 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.disprenraku2_2 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 10://連絡先2-3
                        {
                            let textarea = document.getElementById("clssinp011-014-003_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.disprenraku2_3 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.disprenraku2_3 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 11://FAX1
                        {
                            let textarea = document.getElementById("clssinp011-015-001_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.dispfaxno1 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.dispfaxno1 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 12://FAX2
                        {
                            let textarea = document.getElementById("clssinp011-015-002_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.dispfaxno2 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.dispfaxno2 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 13://FAX3
                        {
                            let textarea = document.getElementById("clssinp011-015-003_id");
                            //文字数制御
                            if (textarea.value.length > 5) //5
                            {
                                this.dispfaxno3 = textarea.value.substring(0, 5);
                            }
                            //数値チェック
                            if (isNaN(textarea.value) == true) {
                                this.dispfaxno3 = textarea.value.substring(0, textarea.value.length - 1);
                            }
                        }
                        break;

                    case 14://EMail
                        {
                            let textarea = document.getElementById("clssinp011-016_id");
                            //文字数制御
                            if (textarea.value.length > 40) //40
                            {
                                this.dispemail = textarea.value.substring(0, 40);
                            }
                        }
                        break;

                    case 15://携帯メール
                        {
                            let textarea = document.getElementById("clssinp011-017_id");
                            //文字数制御
                            if (textarea.value.length > 40) //40
                            {
                                this.dispkmail = textarea.value.substring(0, 40);
                            }
                        }
                        break;

                    case 16://学校勤務先
                        {
                            let textarea = document.getElementById("clssinp011-018_id");
                            //文字数制御
                            if (textarea.value.length > 15) //15
                            {
                                this.dispkinmu_biko = textarea.value.substring(0, 15);
                            }
                        }
                        break;

                    case 17://備考
                        {
                            let textarea = document.getElementById("clssinp011-019_id");
                            //文字数制御
                            if (textarea.value.length > 200) //200
                            {
                                this.dispbiko = textarea.value.substring(0, 200);
                            }
                        }
                        break;

                }
            }
            , input_chk: function () {
                //入力項目があれば登録メッセージ
                if (this.inputchk == true) {
                    this.Message_Dialog("登録されていない項目があります。\n 登録しますか。", 9);
                }
            }
            , onClick_clear() {
                //クリアボタン
                this.dispkzkname = "";             //家族氏名
                this.dispkzkkana = "";             //家族カナ
                this.dispkzktuduki = "";           //続柄
                this.dispdoukyokbn = "";           //同居
                this.radio006 = "radio006-D";
                this.dispkzkkbn = "";              //家族区分
                this.radio007 = "radio007-K";
                this.dispkaigokbn = "";            //介護区分
                this.dispkaigokbn_fuku1 = false;   //介護区分副1
                this.dispkaigokbn_fuku2 = false;   //介護区分副2
                this.dispmimoto = false;              //身元引受人
                this.dispkinkyu1 = false;             //緊急連絡1
                this.dispkinkyu2 = false;             //緊急連絡2
                this.dispdm = false;               //DM
                this.dispyubin1 = "";              //郵便番号1
                this.dispyubin2 = "";              //郵便番号2
                this.dispadress = "";              //住所
                this.disprenraku1_1 = "";          //連絡先1-1
                this.disprenraku1_2 = "";          //連絡先1-2
                this.disprenraku1_3 = "";          //連絡先1-3
                this.disprenraku2_1 = "";          //連絡先2-1
                this.disprenraku2_2 = "";          //連絡先2-2
                this.disprenraku2_3 = "";          //連絡先2-3
                this.dispfaxno1 = "";              //Fax1
                this.dispfaxno2 = "";              //Fax2
                this.dispfaxno3 = "";              //Fax3
                this.dispemail = "";               //Email
                this.dispkmail = "";               //携帯メール
                this.dispkinmu1 = false;           //勤務1
                this.dispkinmu2 = false;           //勤務2
                this.dispkinmu_biko = "";          //勤務備考
                this.dispbiko = "";                //備考

                document.getElementById("radio006-D_text").style.color = "";
                document.getElementById("radio006-H_text").style.color = "";
                document.getElementById("radio007-K_text").style.color = "";
                document.getElementById("radio007-S_text").style.color = "";
                document.getElementById("chklabel011-001_id").style.color = "#000";
                document.getElementById("chklabel011-002_id").style.color = "#000";
                document.getElementById("chklabel011-003_id").style.color = "#000";
                document.getElementById("chklabel011-004_id").style.color = "#000";
                document.getElementById("chklabel011-005_id").style.color = "#000";
                document.getElementById("chklabel011-006_id").style.color = "#000";
                document.getElementById("chklabel011-007_id").style.color = "#000";
                document.getElementById("chklabel011-008_id").style.color = "#000";
                document.getElementById("chklabel011-009_id").style.color = "#000";

            }
            , onClick_datadel() {
                //データ削除ボタン
                this.Message_Dialog(sysConst.MSG_DATA_DEL_CHK, 7); //入力データ登録
            }

            , del_inputdata() {
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
                    cntid: this.pcntid,
                    kzkid: 0,
                    lcnt: 0,
                    headflg: sysConst_kotei.DEL_KBN_DATA,
                }

                //削除処理
                deleteConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddatadel = result.icrn_inf;
                    _self.gridSeldatadel = result;
                    this.View_upd(this.intcode);
                    this.Message_Dialog(sysConst.MSG_DATA_DEL, 0);
                });
            }

            , onClick_datains() {
                //データ登録ボタン

                //入力データ
                if (this.dispkzkname.trim() == "") {
                    this.Message_Dialog("家族氏名を入力してください。", 0);
                }
                else if (this.dispkzkkana.trim() == "") {
                    this.Message_Dialog("家族カナを入力してください。", 0);
                }
                else {
                    this.Message_Dialog(sysConst.MSG_DATA_INS_CHK, 6); //入力データ登録
                }


            }
            , ins_inputdata() {
                //データ登録処理

                //データダイアログ 登録          
                let ins_kzkname = " ";   //家族氏名
                let ins_kzkkana = " ";   //家族カナ
                let ins_kzktuduki = 0; //続柄
                let ins_kzktuduki_chu = 0; //続柄(中)
                let ins_doukyokbn = 0; //同居
                let ins_kzkkbn = 0;    //家族区分
                let ins_kaigokbn_syu = 0;  //介護区分(主介護)
                let ins_kaigokbn_fuku1 = 0;  //介護区分(副1)
                let ins_kaigokbn_fuku2 = 0;  //介護区分(副2)
                let ins_mimoto = 0;    //身元引受人
                let ins_kinkyu1 = 0;    //緊急連絡1
                let ins_kinkyu2 = 0;    //緊急連絡2
                let ins_dm = 0;        //DM
                let ins_yubin1 = 0;    //郵便番号1
                let ins_yubin2 = 0;    //郵便番号2
                let ins_adress = " ";    //住所
                let ins_renraku1_1 = 0; //連絡先1-1
                let ins_renraku1_2 = 0; //連絡先1-2
                let ins_renraku1_3 = 0; //連絡先1-3
                let ins_renraku2_1 = 0; //連絡先2-1
                let ins_renraku2_2 = 0; //連絡先2-2
                let ins_renraku2_3 = 0; //連絡先2-3
                let ins_faxno1 = 0;     //Fax1
                let ins_faxno2 = 0;     //Fax2
                let ins_faxno3 = 0;     //Fax3
                let ins_email = " ";      //Email
                let ins_kmail = " ";      //携帯メール
                let ins_kinmu = 0;      //勤務
                let ins_kinmu_biko = " "; //勤務備考
                let ins_biko = " ";       //備考

                let data_siid = this.login_siid;
                let data_insymd = dayjs().format('YYYYMMDD');
                let data_instime = dayjs().format('HH:mm');

                //登録データ格納
                if (this.dispkzkname.trim() != "") ins_kzkname = this.dispkzkname;   //家族氏名
                if (this.dispkzkkana.trim() != "") ins_kzkkana = this.dispkzkkana;   //家族カナ
                ins_kzktuduki = this.dispkzktuduki_daiid; //続柄
                ins_kzktuduki_chu = this.dispkzktuduki_chuid; //続柄(中)
                ins_doukyokbn = 0; //同居
                if (this.radio006 == "radio006-D") {
                    ins_doukyokbn = 1;
                }
                else if (this.radio006 == "radio006-H") {
                    ins_doukyokbn = 2;
                }
                ins_kzkkbn = 0;    //家族区分
                if (this.radio007 == "radio007-K") {
                    ins_kzkkbn = 1;
                }
                else if (this.radio007 == "radio007-S") {
                    ins_kzkkbn = 2;
                }

                ins_kaigokbn_syu = 0;  //介護区分(主)
                if (document.getElementById("chksyukaigo").checked == true) {
                    ins_kaigokbn_syu = 1;
                }

                ins_kaigokbn_fuku1 = 0;  //介護区分(副1)
                if (document.getElementById("chkfuku1").checked == true) {
                    ins_kaigokbn_fuku1 = 1;
                }

                ins_kaigokbn_fuku2 = 0;  //介護区分(副2)
                if (document.getElementById("chkfuku2").checked == true) {
                    ins_kaigokbn_fuku2 = 1;
                }

                ins_mimoto = 0;    //身元引受人
                if (document.getElementById("chkmimoto").checked == true) {
                    ins_mimoto = 1;
                }

                ins_kinkyu1 = 0;    //緊急連絡1
                if (document.getElementById("chkkinkyu1").checked == true) {
                    ins_kinkyu1 = 1;
                }

                ins_kinkyu2 = 0;    //緊急連絡2
                if (document.getElementById("chkkinkyu2").checked == true) {
                    ins_kinkyu2 = 1;
                }

                ins_dm = 0;        //DM
                if (document.getElementById("chkdm").checked == true) {
                    ins_dm = 1;
                }
                if (this.dispyubin1.trim() != "") ins_yubin1 = this.dispyubin1;          //郵便番号1
                if (this.dispyubin2.trim() != "") ins_yubin2 = this.dispyubin2;          //郵便番号2
                if (this.dispadress.trim() != "") ins_adress = this.dispadress;          //住所
                if (this.disprenraku1_1 != "") ins_renraku1_1 = this.disprenraku1_1;    //連絡先1-1
                if (this.disprenraku1_2 != "") ins_renraku1_2 = this.disprenraku1_2;    //連絡先1-2
                if (this.disprenraku1_3 != "") ins_renraku1_3 = this.disprenraku1_3;    //連絡先1-3
                if (this.disprenraku2_1 != "") ins_renraku2_1 = this.disprenraku2_1;    //連絡先2-1
                if (this.disprenraku2_2 != "") ins_renraku2_2 = this.disprenraku2_2;    //連絡先2-2
                if (this.disprenraku2_3 != "") ins_renraku2_3 = this.disprenraku2_3;    //連絡先2-3
                if (this.dispfaxno1 != "") ins_faxno1 = this.dispfaxno1;                //Fax1
                if (this.dispfaxno2 != "") ins_faxno2 = this.dispfaxno2;                //Fax2
                if (this.dispfaxno3 != "") ins_faxno3 = this.dispfaxno3;                //Fax3
                if (this.dispemail.trim() != "") ins_email = this.dispemail;            //Email
                if (this.dispkmail.trim() != "") ins_kmail = this.dispkmail;            //携帯メール
                ins_kinmu = 0;                                                          //勤務
                if (document.getElementById("chkkinmu1").checked == true) {
                    ins_kinmu = 1;
                }
                if (document.getElementById("chkkinmu2").checked == true) {
                    ins_kinmu = 2;
                }
                ins_kinmu_biko = this.dispkinmu_biko; //勤務備考
                ins_biko = this.dispbiko;             //備考          
                if (ins_kinmu_biko == "") ins_kinmu_biko = " "
                if (ins_biko == "") ins_biko = " "


                //パラメータ
                let _self = this;
                let params = [];
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn, //家族情報
                    intcode: this.intcode,
                    insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
                }

                //登録データ
                let putdata =
                    [
                        {
                            data_siid: data_siid,
                            data_insymd: data_insymd,
                            data_instime: data_instime,

                            head_jigyoid: this.jigyoid,
                            head_intcode: this.intcode,
                            head_kbn: this.kotei_kbn,  //家族情報
                            head_dataid: this.pdataid,
                            head_mstid: 0,
                            head_mymd: "",
                            head_siid: 0,
                            head_delflg: 0,
                            biko_lcnt: 0,
                            biko_naiyo: " ",
                            kazoku_cntid: this.pcntid,
                            kazoku_kazokuname: ins_kzkname,
                            kazoku_kazokukana: ins_kzkkana,
                            kazoku_tuzukigaraid: ins_kzktuduki,
                            kazoku_tuzukigarachuid: ins_kzktuduki_chu,
                            kazoku_doukyokbn: ins_doukyokbn,
                            kazoku_kazokukbn: ins_kzkkbn,
                            kazoku_kaigokbn_syu: ins_kaigokbn_syu,
                            kazoku_kaigokbn_fuku1: ins_kaigokbn_fuku1,
                            kazoku_kaigokbn_fuku2: ins_kaigokbn_fuku2,
                            kazoku_mimoto: ins_mimoto,
                            kazoku_kinkyu_renraku1: ins_kinkyu1,
                            kazoku_kinkyu_renraku2: ins_kinkyu2,
                            kazoku_dm: ins_dm,
                            kazoku_yubinno1: ins_yubin1,
                            kazoku_yubinno2: ins_yubin2,
                            kazoku_address: ins_adress,
                            kazoku_renraku1_1: ins_renraku1_1,
                            kazoku_renraku1_2: ins_renraku1_2,
                            kazoku_renraku1_3: ins_renraku1_3,
                            kazoku_renraku2_1: ins_renraku2_1,
                            kazoku_renraku2_2: ins_renraku2_2,
                            kazoku_renraku2_3: ins_renraku2_3,
                            kazoku_faxno_1: ins_faxno1,
                            kazoku_faxno_2: ins_faxno2,
                            kazoku_faxno_3: ins_faxno3,
                            kazoku_email: ins_email,
                            kazoku_kmail: ins_kmail,
                            kazoku_kinmu: ins_kinmu,
                            kazoku_kinmu_biko: ins_kinmu_biko,
                            kazoku_biko: ins_biko,
                            kaigosya_kzkdataid: 0,
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

                if (this.insdataflg == true) {
                    //更新
                    putConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        this.View_upd(this.intcode);
                        //メッセージ
                        this.Message_Dialog(sysConst.MSG_DATA_INS);
                    });
                }
                else {
                    //新規
                    postConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF', putdata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        this.View_upd(this.intcode);
                        //メッセージ
                        this.Message_Dialog(sysConst.MSG_DATA_INS);
                    });
                }
            }
            //####モーダルイベントエリア####
            //#####新規履歴#####
            , win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_010id");

                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_010id");
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
                var wdialog = document.getElementById("kakunin_id010");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 260) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_Msg: function (e) {
                //ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("kakunin_id010");
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
                var wdialog = document.getElementById("rireki_id010");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 210) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 280) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_reki: function (e) {
                //履歴参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("rireki_id010");
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
            win_drag_data: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("data_010id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 870) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 750) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
                //this.screenY = (window.innerHeight - 880)/2
                //this.screenX = (window.innerWidth - 760) /2
            },
            win_move_data: function (e) {
                //ドラッグ
                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("data_010id");
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
            win_up_data: function () {
                //ドラッグ
                this.Dragflg = false;
            },

            //####続柄入力関係####
            onTxtTuduki_Click() {
                this.inputchk = true
                this.Grid_Visible = true;
                this.DspTudukiInput();
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
            , grid_click_Mst: function (e) {
                var ht = this.flex_mst.hitTest(e);
                //グリッドがクリックされた場合画面の表示を更新する                
                if (ht.row >= 0) {
                    //続柄
                    this.dispkzktuduki_daiid = this.MstList[ht.row].daiid;
                    this.dispkzktuduki_chuid = this.MstList[ht.row].chuid;
                    this.dispkzktuduki = this.MstList[ht.row].value;
                }
            }
            , onItemsSourceChanged_mst(flex) {
                flex.beginUpdate();
                for (let i = 0; i < flex.rows.length; i++) {
                    flex.rows[i].allowMerging = true;
                }
                flex.endUpdate();
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
.clssheet-chu010 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 750px;
    position: relative;
}

/*タイトル*/
.clsstitle010-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

/*タイトルエリア*/
.area010-001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

/*右上ボタンエリア*/
.area010-002 {
    display: inline-flex;
    margin-left: 225px;
    width: 10px;
    height: 25px;
}

/*グリッドエリア*/
.Gridicrn010-001 {
    margin-top: 10px;
    width: 940px;
    height: 300px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

/*グリッドヘッダ*/
.column-header010 {
    font-size: medium;
    font-weight: normal !important;
    text-align: center;
    //background-color: #dffae0 !important;
    //border-color: #8ffd7a !important;
}

/*新規追加*/
.clsbtnmenu010-add {
    margin-top: 0px;
    margin-left: 0px; //726
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*表示順設定*/
.clsbtnmenu010-hyoji {
    margin-top: 0px;
    margin-left: 10px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*ジュノグラム*/
.clsbtnmenu010-jyuno {
    margin-top: 4px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.area010-006 {
    display: inline-flex;
    width: 900px;
    height: 300px;
}

//仮置きコントロール
.clsstitle010-003 {
    width: 400px;
    height: 300px;
    line-height: 300px;
    border: 1px solid;
    border-color: #8ffd7a;
    text-align: center;
}

//下段ボタン
.area010-007 {
    display: flex;
    margin-top: 10px;
    margin-left: 0px;
    width: 950px;
    height: 27px;
}

.clsbtnmenu010-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clsbtnmenu010-ins {
    margin-top: 0px;
    margin-left: 180px;
    height: 25px !important;
    font-size: 16px;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

//履歴無しラベル1
.clsstitle1_Noreki_back_010 {
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
.clsstitle1_Noreki_010 {
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
    line-height: 130px;
    text-align: center;
    border: 1px solid;
    border-color: #adadad;
    line-height: 40px;
    word-wrap: break-word;
    padding-left: 4px;
}

#Gridicrn010-id {

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

    .wj-flexgrid .wj-cell {
        padding: 1px;
    }

}

//ウィンドウCss
.clssheet-chu011 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    width: 750px;
    height: 840px !important;
}

.area011-001 {
    display: inline-flex;
    width: 730px;
    height: 25px;
}

.clsstitle011-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 730px;
    height: 25px;
    text-align: center;
}

.area011-002 {
    display: inline-flex;
    margin-top: 7px;
    margin-left: -1px;
    width: 730px;
    height: 25px;
}

/*家族情報-家族氏名*/
.area011-003 {
    margin-top: 5px;
    width: 730px;
    height: 30px;
    display: inline-flex;
}

/*家族情報上段-ラベル*/
.clsstitle011-003 {
    background-color: #caf2f5;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp011-003 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 0px;
    width: 250px;
    height: 30px;
    text-align: left;
    border: 1px solid !important;
    border-color: #7e7e7e !important;
}

/*家族情報-フリガナ*/
.area011-004 {
    display: inline-flex;
    margin-top: 0px;
    width: 730px;
    height: 30px;
}

/*家族情報上段-ラベル*/
.clsstitle011-004 {
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

.clssinp011-004 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 3px;
    width: 250px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*続柄*/
.area011-005 {
    display: inline-flex;
    margin-top: 0px;
    width: 730px;
    height: 30px;
}

.clsstitle011-005 {
    background-color: #caf2f5;
    margin-top: 6px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp011-005 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 6px;
    width: 250px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*同居区分*/
.area011-006 {
    display: inline-flex;
    margin-top: 0px;
    width: 400px;
    height: 30px;
}

/*同居区分-ラベル*/
.clsstitle011-006 {
    background-color: #caf2f5;
    margin-top: 0px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp011-006-doukyo {
    margin-left: 3px;
    margin-top: 0px;
    text-align: left;
}

.clssinp011-006-hidoukyo {
    margin-left: 3px;
    margin-top: 0px;
    text-align: left;
}

/*家族区分*/
.area011-007 {
    display: inline-flex;
    margin-top: 2px;
    width: 730px;
    height: 30px;
}

/*家族区分-ラベル*/
.clsstitle011-007 {
    background-color: #caf2f5;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.clssinp011-007-kazoku {
    margin-left: 3px;
    margin-top: 1px;
    text-align: left;
}

.clssinp011-007-sonota {
    margin-left: 3px;
    margin-top: 1px;
    text-align: left;
}

/*介護区分*/
.area011-008 {
    display: inline-flex;
    margin-top: 0px;
    width: 730px;
    height: 30px;
}

.area011-008-001 {
    display: inline-flex;
    margin-top: 5px;
    margin-left: 5px;
    width: 400px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*介護区分-ラベル*/
.clsstitle011-008 {
    background-color: #caf2f5;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.chk011-001 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-001 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

.chk011-002 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-002 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

.chk011-003 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-003 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

/*身元引受人区分*/
.area011-009 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

.area011-009-001 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 5px;
    width: 100px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*身元引受人区分-ラベル*/
.clsstitle011-009 {
    background-color: #caf2f5;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #7ad8fd;
}

.chk011-004 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-004 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

.hr_style011-001 {
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid rgb(52, 104, 201);
    margin-top: 11px;
}

/*緊急連絡*/
.area011-010 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

.area011-010-001 {
    display: inline-flex;
    margin-top: 5px;
    margin-left: 5px;
    width: 300px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*緊急連絡-ラベル*/
.clsstitle011-010 {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.chk011-005 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-005 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

.chk011-006 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-006 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

/*DB*/
.area011-011 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

.area011-011-001 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 5px;
    width: 100px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*DB-ラベル*/
.clsstitle011-011 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.chk011-007 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-007 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

/*住所*/
.area011-012 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

/*住所-ラベル*/
.clsstitle011-012 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 117px;
    width: 90px;
    line-height: 117px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

/*住所*/
.area011-012-001 {
    display: inline-flex;
    margin-top: 3px;
    width: 330px;
    height: 70px;
    flex-wrap: wrap;
}

.clsstitle011-012-001 {
    background-color: #dffae0;
    margin-top: 2px;
    margin-left: 3px;
    font-size: 16px;
    height: 30px;
    width: 50px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
    color: #f00808;
}

.clssinp011-012-001 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 1px;
    width: 60px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-012-002 {
    margin-top: 2px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-012-002 {
    background-color: #ffffff;
    margin-left: 2px;
    margin-top: 2px;
    width: 80px;
    height: 30px !important;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clssinp011-012-003 {
    background-color: #ffffff;
    margin-top: 5px;
    margin-left: 3px;
    width: 330px;
    height: 80px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;
}

/*連絡先①*/
.area011-013 {
    display: inline-flex;
    margin-top: 44px;
    width: 730px;
    height: 30px;
}

/*連絡先①-ラベル*/
.clsstitle011-013 {
    background-color: #dffae0;
    margin-top: 5px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp011-013-001 {
    background-color: #ffffff;
    margin-left: 2px;
    margin-top: 5px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-013-001 {
    margin-top: 5px;
    margin-left: 0px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-013-002 {
    background-color: #ffffff;
    margin-left: 2px;
    margin-top: 5px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-013-002 {
    margin-top: 5px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-013-003 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 5px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*連絡先①*/
.area011-014 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

/*連絡先①-ラベル*/
.clsstitle011-014 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp011-014-001 {
    background-color: #ffffff;
    margin-left: 2px;
    margin-top: 2px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-014-001 {
    margin-top: 2px;
    margin-left: 0px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-014-002 {
    background-color: #ffffff;
    margin-left: 2px;
    margin-top: 2px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-014-002 {
    margin-top: 2px;
    margin-left: 2px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-014-003 {
    background-color: #ffffff;
    margin-left: 6px;
    margin-top: 2px;
    width: 60px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*FAX番号①*/
.area011-015 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

/*FAX番号-ラベル*/
.clsstitle011-015 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp011-015-001 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 2px;
    width: 80px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-015-001 {
    margin-top: 2px;
    margin-left: 0px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-015-002 {
    background-color: #ffffff;
    margin-left: 5px;
    margin-top: 2px;
    width: 50px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

.clsstitle011-015-002 {
    margin-top: 2px;
    margin-left: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
}

.clssinp011-015-003 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 2px;
    width: 100px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*Eメール*/
.area011-016 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

/*Eメール-ラベル*/
.clsstitle011-016 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp011-016 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 2px;
    width: 500px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*携帯メール*/
.area011-017 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

/*携帯メール-ラベル*/
.clsstitle011-017 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp011-017 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 2px;
    width: 500px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*勤務先・学校*/
.area011-018 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 30px;
}

.area011-018-001 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 3px;
    width: 150px;
    height: 30px;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*勤務先・学校-ラベル*/
.clsstitle011-018 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 30px;
    width: 90px;
    line-height: 30px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.chk011-008 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-008 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

.chk011-009 {
    margin-top: 0px;
    margin-left: 10px;
    display: inline-flex;
}

.chklabel011-009 {
    display: inline-flex;
    margin-top: 2px;
    margin-left: 10px;
}

.clssinp011-018 {
    background-color: #ffffff;
    margin-left: 6px;
    margin-top: 2px;
    width: 250px;
    height: 30px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
}

/*備考*/
.area011-019 {
    display: inline-flex;
    margin-top: 3px;
    width: 730px;
    height: 70px;
}

/*備考*/
.clsstitle011-019 {
    background-color: #dffae0;
    margin-top: 2px;
    font-size: 16px;
    height: 70px;
    width: 90px;
    line-height: 70px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

.clssinp011-019 {
    background-color: #ffffff;
    margin-left: 3px;
    margin-top: 2px;
    width: 330px;
    height: 70px;
    text-align: left;
    border: 1px solid;
    border-color: #7e7e7e;
    resize: none;
    outline-color: rgb(255, 189, 48);
    outline-width: 1px !important;
}

/*ボタンエリア*/
.area011-020 {
    margin-top: 11px;
    width: 730px;
    height: 30px;
}

/*クリアボタン*/
.clsbtnmenu011-clr {
    margin-top: 0px;
    margin-left: 0px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu011-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu011-ins {
    margin-top: 0px;
    margin-left: 500px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

//続柄エリア
.areainput {
    display: inline-flex;
    flex-wrap: wrap;
    width: 750px;
    height: 113px;
    padding: 3px 0px;
}

.areainput2 {
    display: inline-flex;
    flex-wrap: wrap;
    width: 500px;
    height: 95px;
    padding: 3px 0px;
    //background-color: #ffffff;
    //border: thin solid #a5a5a5 ;
}

.areatuduki {
    display: inline-flex;
    flex-wrap: wrap;
    width: 240px;
    height: 95px;
    padding: 3px 0px;
    //background-color: #ffffff;
    //border: thin solid #a5a5a5 ;
}

.GridMst_tuduki {
    font-size: 16px;
    margin-top: 2px;
    margin-left: 2px;
    width: 230px !important;
    height: 250px;
    border: 1px solid;
    border-color: #4396e4 !important;
    background-color: #dffae0;
}
</style>

