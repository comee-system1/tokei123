<template>
    <v-sheet class="sheet-head" elevation="2" id="head_win_id">
        <div>
            <div class="areahead all">
                <label class="label titlehead ">履歴作成
                    <v-btn elevation="2" icon small top class="winbtn close " color="red" style="margin-left: 140px;"
                        @click="Click_colse">
                        <v-icon dark small> mdi-close </v-icon>
                    </v-btn>
                </label>
            </div>

            <div style="padding: 8px 8px 8px 8px;">
                <div class="areahead all">
                    <label class="label midashi">作成日</label>
                    <v-btn class="btnymd ml-1" @click="inputCalendarClick(0)" tile width="150px" height="30px">{{
                        getYm()
                    }}
                        <div class="float-right">
                            <v-icon small>mdi-calendar-month</v-icon>
                        </div>
                    </v-btn>
                </div>

                <div class="areahead all" style="height: 60px; margin-top: 4px;">
                    <div class="areahead left">
                        <label class="label midashi wraphead">作成区分</label>
                    </div>
                    <div class="areahead right">
                        <v-btn id="btn_kbt" class="btn_select" style="margin-left: 4px; margin-top: 4px;"
                            @click="click_headindkbn(0)">個別</v-btn>
                        <label style="margin-left: 4px;margin-top: 4px;">(選択項目の履歴のみ作成)</label>
                        <v-btn id="btn_ikt" class="btn_select" style="margin-left: 4px; margin-top: 4px;"
                            @click="click_headindkbn(1)">一括</v-btn>
                        <label style="margin-left: 4px;margin-top: 4px;">(全項目の履歴を一括作成)</label>
                    </div>
                </div>

                <div class="areahead all" style="margin-top: 4px;">
                    <label class="label midashi">前回コピー</label>
                    <input class="chkbox mt-1" type="checkbox" id="chk_head"
                        style="margin-left: 4px;margin-top: 0px !important;"
                        @click="chk_click">
                    <label style="margin-left: 4px;margin-top: 4px;">同時に実施する</label>
                </div>

                <div class="areahead all">
                    <v-btn class="btn pri" style="margin-left: 294px; margin-top: 2px;" @click="onHead_ins">
                        登録
                    </v-btn>
                </div>
            </div>
        </div>

        <!-- 年月日ダイアログ -->
        <v-dialog v-model="datepicker" width="300" class="datepicker_dialogs">
            <v-date-picker v-model="picker" locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()" @change="monthSelect">
            </v-date-picker>
        </v-dialog>

    </v-sheet>
</template>

<script>
import dayjs from 'dayjs';

export default {
    data(){
        return{
            picker:"",          
            datepicker: false,
            Ymd:""

        }
    },
    methods: {

        //カレンダークリック時の処理
        inputCalendarClick() {
            //#####カレンダークリック#####            
            this.picker =
                this.Ymd.format('YYYY') +
                '-' +
                this.Ymd.format('MM') +
                '-' +
                this.Ymd.format('DD');
            this.datepicker = true;
        }

        //閉じるボタン
        ,Click_colse(){
            this.$emit('headclose');
        }

        //登録区分選択
        ,click_headindkbn(kbn)
        {
            this.$emit('inskbn',kbn);
        }

        //チェックボックスクリック
        ,chk_click()
        {
            this.$emit('inscopy',document.getElementById("chk_head").checked);
        }

        ,set_datainf(ymd)
        {
            //登録に必要な情報を受け取る
            this.ymd =ymd;
        }

        ,onHead_ins()
        {
            this.$emit('inshead');
        }

        //#####カレンダーセット#####
        , getYm() {
            if (!this.Ymd) {
                this.Ymd = dayjs();
                this.picker = this.Ymd.year() + '-' + this.Ymd.format('MM');
            }
            return (
                this.Ymd.format('YYYY') + '年' + this.Ymd.format('MM') + '月' + this.Ymd.format('DD') + '日'
            );
        }

        ,monthSelect() {
            this.Ymd = dayjs(this.picker);
            this.datepicker = false;
            this.$emit('monthsel',this.Ymd);
        }

        //画面の初期化
        ,init_view() {
            this.headinskbn = 0;    //0:個別登録 1:一括登録
            document.getElementById("btn_kbt").style.backgroundColor = "#fff176";
            document.getElementById("btn_ikt").style.backgroundColor = "#ffffff";
        }        
    }
}

</script>
