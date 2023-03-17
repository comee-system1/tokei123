<template>
    <!--<container class="KoteiinfList">-->
    <div class="KoteiinfList">
        <!-- ****利用者表示エリアstart**** -->
        <aside class="aside">
            <user-list ref="user_list" :dispAddDaicho="false" @child-select="setUserSelectPoint">
                >
            </user-list>
        </aside>

        <!-- ****利用者表示エリアend**** -->
        <!--<centermenu   class="centermenu">-->
        <div class="centermenu">
            <!-- ****中間メニュー**** -->
            <div class="label menutitle" style="margin-left: 20px; margin-top: 3px;"><b>本 人</b></div>

            <v-btn class="btn menu" style="margin-top: 2px;margin-left: 7px;" @click="get_scroll(0)">
                基本<br>情報
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(1)">
                生活歴
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(2)">
                病歴・<br>障害歴
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(3)">
                現在受<br>診状況
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(4)">
                医療<br>保険
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(5)">
                生活<br>状況
            </v-btn>
            <div class="label menutitle" style="margin-left: 20px; margin-top: 5px;"><b>家 族</b></div>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(6)">
                家族<br>情報
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(7)">
                介護者<br>情報
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(8)">
                住環境
            </v-btn>
            <div class="label menutitle" style="margin-left: 20px; margin-top: 5px;"><b>社 会</b></div>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(9)">
                関係<br>機関
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(10)">
                手帳<br>情報
            </v-btn>
            <v-btn class="btn menu" style="margin-top: 3px;margin-left: 7px;" @click="get_scroll(11)">
                福祉<br>サービス
            </v-btn>
        </div>
        <main class="main">
            <v-sheet class="clssheet-dai0" color="#FFFFFF" elevation="2">
                <div class="area koteihead">
                    <label class="label koteihead"><b>日付</b></label>
                    <v-btn class="btnymd_kotei ml-1" @click="inputCalendarClick()" tile width="150px" height="30px">{{
                        getYm()
                    }}
                        <div class="float-right">
                            <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                    </v-btn>

                    <!-- 年月日ダイアログ -->
                    <v-dialog v-model="datepicker_dialog" width="300" class="datepicker_dialogs">
                        <v-date-picker id="Datepicker_head" v-model="picker" locale="jp-ja"
                            :day-format="(date) => new Date(date).getDate()" @change="monthSelect">
                        </v-date-picker>
                    </v-dialog>
                </div>
                <br>
                <div class="area koteihead">
                    <label class="label koteihead"><b>利用者名</b></label>
                    <label class="label kmk headcode" style="margin-left: 4px;" id="Riyocd_id"></label>
                    <label class="label kmk headname" id="Riyonm_id" style="margin-left: 4px;"></label>
                    <label class="label koteihead" style="margin-left: 8px;"><b>担当者</b></label>
                    <label class="label kmk headtanto" style="margin-left: 4px;" id="Tantonm_id" @click="Tantonm_click"></label>
                </div>
                <!-- ****障がい者本人の状況（基本情報）****-->
                <v-sheet id="area_dai" class="wrap001-dai1" color="#F4F6F9">
                    <label class="clssdaititle0 mt-3"><b>◆障がい者本人の状況</b></label>
                    <component :is="kotei001" ref="childkotei001" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 1, login_siid: param_login_siid }">
                    </component>
                    <component class="mt-3" :is="kotei002" ref="childkotei002" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 2, login_siid: param_login_siid }">
                    </component>
                    <component class="mt-3" :is="kotei004" ref="childkotei004" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 3, login_siid: param_login_siid }">
                    </component>
                    <component class="mt-3" :is="kotei006" ref="childkotei006" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 4, login_siid: param_login_siid }">
                    </component>
                    <component class="mt-3" :is="kotei008" ref="childkotei008" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 5, login_siid: param_login_siid }">
                    </component>
                    <component class="mt-3" :is="kotei009" ref="childkotei009" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 6, login_siid: param_login_siid }">
                    </component>
                    <label class="clssdaititle0 mt-3"><b>◆家族の状況</b></label>
                    <component class="mt-1" :is="kotei010" ref="childkotei010" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 100 ,login_siid: param_login_siid}">
                    </component>
                    <component class="mt-3" :is="kotei012" ref="childkotei012" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 101 ,login_siid: param_login_siid}">
                    </component>
                    <component class="mt-3" :is="kotei014" ref="childkotei014" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 102 ,login_siid: param_login_siid}">
                    </component>
                    <label class="clssdaititle0 mt-3"><b>◆社会的支援</b></label>
                    <component class="mt-1" :is="kotei015" ref="childkotei015" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 200 ,login_siid: param_login_siid}">
                    </component>
                    <component class="mt-3" :is="kotei017" ref="childkotei017" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 201 ,login_siid: param_login_siid}">
                    </component>
                    <component class="mt-3" :is="kotei018" ref="childkotei018" @child-dataupd="get_data"
                        @child-datasel="setUserSelectPoint"
                        v-bind="{ ymd: getYYYYMMDD(), uniqid: this.param_uniqid, traceid: this.param_traceid, jigyoid: this.param_jigyoid, kotei_kbn: 202 ,login_siid: param_login_siid}">
                    </component>
                </v-sheet>

                <!-- 職員ダイアログ  -->
                <v-dialog v-model="dialog_Syoku_flg" width="320">
                    <v-sheet id="syoku_win" class="sheet syokuin" elevation="2">
                        <div class="area syokuin win">
                            <label class="label kotei_wintitle syokuin">職員選択画面</label>
                            <v-btn margin-left="1px" elevation="2" icon small top class="closeButton ml-1" color="red"
                                @click="Click_colse_syokuin">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </div>

                        <wj-flex-grid id="Gridsyokuin-id" class="grid syokuin" :headersVisibility="'Column'"
                            :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                            :allowMerging="'AllHeaders'" :allowResizing="true" :allowSorting="false" :allowDragging="false"
                            :selectionMode="'Row'" :isReadOnly="true" :initialized="onInitializeIcrnGrid_syokuin"
                            :itemsSourceChanged="onItemsSourceChanged_syokuin" :itemsSource="viewdata_syokuin"
                            :autoRowHeights="true">

                            <!--列-->
                            <wj-flex-grid-column header="" binding="siid" :width="0"
                                :allowResizing=false></wj-flex-grid-column>
                            <wj-flex-grid-column header="コード" binding="sicode" :width="80" :allowResizing=false
                                format="d0"></wj-flex-grid-column>
                            <wj-flex-grid-column header="職員名" binding="name" :width="210" :wordWrap=true
                                :allowResizing=false></wj-flex-grid-column>


                        </wj-flex-grid>

                    </v-sheet>
                </v-dialog>
            </v-sheet>
        </main>
    </div>
    <!--</container>-->
</template>

<script>
import UserList from '../../components/UserList.vue';
import KoteiinfList001 from './koteiinf/KoteiinfList-001.vue';
import KoteiinfList002 from './koteiinf/KoteiinfList-002.vue';
import KoteiinfList004 from './koteiinf/KoteiinfList-004.vue';
import KoteiinfList006 from './koteiinf/KoteiinfList-006.vue';
import KoteiinfList008 from './koteiinf/KoteiinfList-008.vue';
import KoteiinfList009 from './koteiinf/KoteiinfList-009.vue';
import KoteiinfList010 from './koteiinf/KoteiinfList-010.vue';
import KoteiinfList012 from './koteiinf/KoteiinfList-012.vue';
import KoteiinfList014 from './koteiinf/KoteiinfList-014.vue';
import KoteiinfList015 from './koteiinf/KoteiinfList-015.vue';
import KoteiinfList017 from './koteiinf/KoteiinfList-017.vue';
import KoteiinfList018 from './koteiinf/KoteiinfList-018.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import { getConnect } from '../../connect/getConnect';
import dayjs from '../../../node_modules/dayjs';
import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
let uniqid = 3; //テスト3を使用
let traceid = 123;
let jigyoid = 62;
let siid = 1;


export default {
    props: {
        selectedData: Object, // 検索条件等
    },
    components: {
        UserList,
        KoteiinfList001,
        KoteiinfList002,
        KoteiinfList004,
        KoteiinfList006,
        KoteiinfList008,
        KoteiinfList009,
        KoteiinfList010,
        KoteiinfList012,
        KoteiinfList014,
        KoteiinfList015,
        KoteiinfList017,
        KoteiinfList018,
    },
    data() {
        return {
            // ****利用者表示エリアstart****
            userListComponentDatas: [], // ユーザー一覧データ
            userInfo: {}, // ユーザ一覧から選択した値
            filter: {},
            selintcode: 0,

            //カレンダー
            picker: '',
            datepicker_dialog: false,
            KoteiYmd: "",

            //Getパラメータ
            GetSelInf: [],                  //API取得データ(本人)
            GetSelInf_kzk: [],              //API取得データ(家族)
            GetSelInf_syakai: [],           //API取得データ(社会)
            viewdata_syokuin: [],       //履歴グリッド表示データ

            //基本パラメータ
            param_uniqid: uniqid,
            param_traceid: traceid,
            param_jigyoid: jigyoid,
            param_login_siid: siid,

            kotei001: 'KoteiinfList001', //基本情報用パラメータ
            kotei002: 'KoteiinfList002', //生活歴用パラメータ
            kotei004: 'KoteiinfList004', //病歴用パラメータ
            kotei006: 'KoteiinfList006', //既往歴用パラメータ
            kotei008: 'KoteiinfList008', //医療保険パラメータ
            kotei009: 'KoteiinfList009', //住環境パラメータ
            kotei010: 'KoteiinfList010', //家族情報パラメータ
            kotei012: 'KoteiinfList012', //介護者パラメータ
            kotei014: 'KoteiinfList014', //住環境パラメータ
            kotei015: 'KoteiinfList015', //関係機関パラメータ
            kotei017: 'KoteiinfList017', //手帳情報パラメータ
            kotei018: 'KoteiinfList018', //福祉ｻｰﾋﾞｽパラメータ

            dialog_Syoku_flg: false    //職員選択画面
        };

    },


    mounted() {
        //職員データを検索

        //API取得
        let _self = this;
        let params = [];
        let ymd = this.getYm();
        ymd = ymd.replace("年", "");
        ymd = ymd.replace("月", "");
        ymd = ymd.replace("日", "");

        params = {
            uniqid: uniqid,
            traceid: traceid,

            Getkbn: 0,
            Sikibetuid: 110003,  //仮
            kanritaniid: "",
            Siid: "",
            Srcymd: ymd,
            Ekbn: "",
            Ssid: "",
            Hlpkbn: "",
            Kyu3flg: "",
            Judoflg: "",
            Kodoflg: "",
            Tykflg: ""
        };

        getConnect('/syokuin', params, 'COMMON').then((result) => {

            _self.viewdata_syokuin = result.icrn_inf;
        })

    },

    methods: {
        get_data(wintcode) {
            //API取得
            let _self = this;
            let params = [];
            let ymd = "";   //仮データ
            let intcode = wintcode;        //仮データ

            ymd = this.getYm();
            ymd = ymd.replace("年", "");
            ymd = ymd.replace("月", "");
            ymd = ymd.replace("日", "");


            //パラメータ
            params = {
                uniqid: uniqid,
                traceid: traceid,
                ymd: ymd,
                intcode: intcode,

                pJigyoid: jigyoid,
                Kbn: 0,
                Dataid: 0,
                Modeflg: 0,
            };

            getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
                _self.GetSelInf = result;
                this.$refs.childkotei001.setUserData(intcode, _self.GetSelInf); //子要素の処理を実行 基本情報        
                this.$refs.childkotei002.setUserData(intcode, _self.GetSelInf); //子要素の処理を実行 生活歴
                this.$refs.childkotei004.setUserData(intcode, _self.GetSelInf); //子要素の処理を実行 既往歴
                this.$refs.childkotei006.setUserData(intcode, _self.GetSelInf); //子要素の処理を実行 受診状況
                this.$refs.childkotei008.setUserData(intcode, _self.GetSelInf); //子要素の処理を実行 医療保険
                this.$refs.childkotei009.setUserData(intcode, _self.GetSelInf); //子要素の処理を実行 生活状況
            })

            //家族情報
            getConnect('/Koteiinf_KAZOKU', params, 'KOTEIINF').then((result_kzk) => {
                _self.GetSelInf_kzk = result_kzk;
                this.$refs.childkotei010.setUserData(intcode, _self.GetSelInf_kzk); //子要素の処理を実行 家族情報
                this.$refs.childkotei012.setUserData(intcode, _self.GetSelInf_kzk); //子要素の処理を実行 介護情報
                this.$refs.childkotei014.setUserData(intcode, _self.GetSelInf_kzk); //子要素の処理を実行 住環境
            });

            //社会情報
            getConnect('/Koteiinf_SYAKAI', params, 'KOTEIINF').then((result_syakai) => {
                _self.GetSelInf_syakai = result_syakai;
                this.$refs.childkotei015.setUserData(intcode, _self.GetSelInf_syakai); //子要素の処理を実行 関係機関
                this.$refs.childkotei017.setUserData(intcode, _self.GetSelInf_syakai); //子要素の処理を実行 手帳情報
                this.$refs.childkotei018.setUserData(intcode, _self.GetSelInf_syakai); //子要素の処理を実行 介護サービス
            });
        },
        setUserSelectPoint(row) {
            // ユーザ選択処理はここで行う

            //####登録チェック####

            //本人
            let flg = true;
            if (flg == true) flg = this.$refs.childkotei001.Chk_insdata(row); //子要素の処理を実行 基本情報
            if (flg == true) flg = this.$refs.childkotei002.Chk_insdata(row); //子要素の処理を実行 生活歴
            if (flg == true) flg = this.$refs.childkotei004.Chk_insdata(row); //子要素の処理を実行 既往歴
            if (flg == true) flg = this.$refs.childkotei006.Chk_insdata(row); //子要素の処理を実行 受診歴
            if (flg == true) flg = this.$refs.childkotei008.Chk_insdata(row); //子要素の処理を実行 医療保険
            if (flg == true) flg = this.$refs.childkotei009.Chk_insdata(row); //子要素の処理を実行 生活状況

            //家族
            if (flg == true) flg = this.$refs.childkotei012.Chk_insdata(row); //子要素の処理を実行 介護者情報
            if (flg == true) flg = this.$refs.childkotei014.Chk_insdata(row); //子要素の処理を実行 住環境

            //社会
            if (flg == true) flg = this.$refs.childkotei017.Chk_insdata(row); //子要素の処理を実行 手帳情報

            let winter = setInterval(() => {
                if (flg == true) {
                    clearInterval(winter);
                    this.userInfo = row;
                    document.getElementById("Riyocd_id").innerHTML = wjCore.escapeHtml(this.userInfo.riyocode);
                    document.getElementById("Riyonm_id").innerHTML = wjCore.escapeHtml(this.userInfo.names);
                    this.get_data(this.userInfo.riid);
                }
            }, 1000);
        },
        getSelectUserChildComponent(data) {
            this.userListComponentDatas = data;
        },
        get_scroll(kbn) {
            //スクロールの位置
            var aera = document.getElementById("area_dai");

            switch (kbn) {
                case 0: //基本情報
                    aera.scrollTop = 0;
                    break;
                case 1: //生活歴
                    aera.scrollTop = 560;
                    break;
                case 2: //既往歴
                    aera.scrollTop = 1060;
                    break;
                case 3: //受診歴
                    aera.scrollTop = 1820;
                    break;
                case 4: //医療保険
                    aera.scrollTop = 2620;
                    break;
                case 5: //生活状況
                    aera.scrollTop = 3400;
                    break;
                case 6: //家族情報
                    aera.scrollTop = 4190;
                    break;
                case 7: //介護者情報
                    aera.scrollTop = 4950;
                    break;
                case 8: //住環境
                    aera.scrollTop = 5620;
                    break;
                case 9: //関係機関
                    aera.scrollTop = 6310;
                    break;
                case 10: //手帳情報
                    aera.scrollTop = 7085;
                    break;
                case 11: //福祉サービス
                    aera.scrollTop = 7890;
                    break;
            }

        }

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
        , getYYYYMMDD() {
            //#####カレンダーをYYYYMMDD形式で返す#####
            let ymd = "";

            ymd = this.getYm();
            ymd = ymd.replace("年", "");
            ymd = ymd.replace("月", "");
            ymd = ymd.replace("日", "");
            return ymd;
        }

        , inputCalendarClick() {
            this.picker =
                this.Ym.format('YYYY') +
                '-' +
                this.Ym.format('MM') +
                '-' +
                this.Ym.format('DD');
            this.datepicker_dialog = true;
        }
        , monthSelect() {
            this.Ym = dayjs(this.picker);
            this.datepicker_dialog = false;
            this.get_data(this.userInfo.riid);
        }

        , Tantonm_click() {
            //担当者名クリック
            this.dialog_Syoku_flg = true;// 職員ダイアログ表示
        }

        //職員グリッド関係
        , onInitializeIcrnGrid_syokuin(flexGrid) {
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
            this.flexsyoku = flexGrid;
            flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_syoku(e) }.bind(this));
            flexGrid.endUpdate();
        }
        , grid_click_syoku: function (e) {
            var ht = this.flexsyoku.hitTest(e);

            if (ht.row >= 0) {
                document.getElementById("Tantonm_id").innerHTML = wjCore.escapeHtml(this.viewdata_syokuin[ht.row].name);
                document.getElementById("Tantonm_id").tag = wjCore.escapeHtml(this.viewdata_syokuin[ht.row].siid);


                //各画面にセット
                this.$refs.childkotei001.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei002.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei004.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei006.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei008.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei009.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei010.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei012.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei014.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei015.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei017.set_siid(document.getElementById("Tantonm_id").tag);
                this.$refs.childkotei018.set_siid(document.getElementById("Tantonm_id").tag);
                this.dialog_Syoku_flg = false;
            }
        }
        , onItemsSourceChanged_syokuin(flexGrid) {
            flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
        }
        , Click_colse_syokuin() {
            this.dialog_Syoku_flg = false;
        }

    }

};

//スクロールジャンク対策
document.addEventListener('wheel', function () { }, { passive: true });
document.addEventListener('mousewheel', function () { }, { passive: true });

</script>

<style  lang="scss">
@import '../../assets/scss/common.scss';

.main {
    background-color: #F4F6F9;
}

.KoteiinfList {
    display: grid;
    grid-template-columns: 272px 70px 1000px 10px;
    grid-template-rows: 0px 1fr;
}

//枠組み
.aside {
    grid-column-start: 1;
    grid-column-end: auto;
    grid-row-start: 2;
    grid-row-end: 2;
}

.centermenu {
    display: block;
    background-color: #F4F6F9;
    grid-column-start: 2;
    grid-column-end: auto;
    grid-row-start: 2;
    grid-row-end: 2;
}

.main {
    display: block;
    grid-column-start: 3;
    grid-column-end: auto;
    grid-row-start: 2;
    grid-row-end: 2;
}

//右側利用者表示
.clssheet-dai0 {
    padding: 7px 7px;
    margin: 3px 5px;
    height: 67px;
}

.clssdaititle0 {
    margin-left: 10px;
    font-size: large;
    color: #1d5c81;
}

//中央ボタン
.clsbtnmenu {
    margin-top: 3px;
    margin-left: 7px;
    height: 50px !important;
    width: 50px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

.clssdaititle-center {
    margin-left: 10px;
    font-size: medium;
    color: #000000;
}

.clsstitlecenter0 {
    margin-left: 20px;
    margin-top: 5px;
    font-size: 16px;
    color: #1d5c81;
}

//固定情報メイン
.wrap001-dai1 {
    display: block;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: -6px;
    height: 84vh;
    overflow-y: scroll;
}

.cls001 {
    margin-left: 0px;
}

.RiyoLabel {
    display: inline-flex;
}

//利用者名ラベル  
.clssdaititle0_a {
    //利用者コード
    font-size: large;
    //color:#1d5c81;
    color: #fff;

    background-color: #27904d;
    //background-color: #dffae0;
    margin-left: 0px;
    height: 25px;
    width: 90px;
    line-height: 25px;
    text-align: center;
    border: 1px solid;
    border-color: #27904d;
}

.clssdaititle0_b {
    //利用者コード
    background-color: #fffeee;
    margin-left: 0px;
    height: 25px;
    width: 110px;
    line-height: 25px;
    text-align: center;
    border: 1px solid;
    //border-color: #8ffd7a;
    border-color: #27904d;
    font-size: large;
}

.clssdaititle0_c {
    //利用者名
    background-color: #fffeee;
    margin-left: -1px;
    height: 25px;
    width: 300px;
    line-height: 25px;
    text-align: left;
    border: 1px solid;
    //border-color: #8ffd7a;
    border-color: #27904d;
    font-size: large;
}

//#####職員変更ダイアログ#####
.koteititle_syokuin {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    width: 280px;
    height: 25px;
    text-align: center;
}

.clssheet-syokuin {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 0px;
    margin-left: 0px;
    width: 320px;
    height: 460px;
}

.area-syokuin {
    display: inline-flex;
    width: 320px;
    height: 35px;
}

.Grid-syokuin {
    font-size: 15px;
    margin-top: 5px;
    width: 310px;
    height: 400px;
    border: 1px solid;
    border-color: #8ffd7a !important;
}

#Gridsyokuin-id {

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
