<template>
    <div style="display: inline-flex;">
        <label id="label_ymd" class="label midashihead tyosa" style="margin-left: 14px;">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>
        <input type="text" id="text_ymd" class="textbox tyosa" style="margin-left: 3px;" v-model="dsp_ymd"
            @input="text_input" />

        <v-btn id="tyosa_ymd" class="btnymd_kotei ml-1" @click="inputCalendarClick()" style="width: 30px; height: 30px;">
            <div class="float-right">
                <v-icon>mdi-calendar-month</v-icon>
            </div>
        </v-btn>

        <v-dialog v-model="datepicker_dialog_ymd" width="300" class="datepicker_dialogs">
            <v-date-picker id="Datepicker_head" v-model="picker" locale="jp-ja"
                :day-format="(date) => new Date(date).getDate()" @change="monthSelect_ymd">
            </v-date-picker>
        </v-dialog>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import * as wjCore from '@grapecity/wijmo';

export default {
    data() {
        return {
            datepicker_dialog_ymd: false,
            dsp_ymd: '',     //日付表示データ
            picker: '',     //日付操作用変数
            Ym: '',
            ymd: ''
        }
    },
    methods: {
        inputCalendarClick() {
            //#####カレンダークリック#####
            this.picker = this.ymd.replace("年", "-");
            this.picker = this.picker.replace("月", "-");
            this.picker = this.picker.replace("日", "");
            this.datepicker_dialog_ymd = true;
        }
        , monthSelect_ymd() {
            this.Ym = dayjs(this.picker);
            this.ymd = this.picker.replaceAll("-", "");
            this.ymd = this.ymd.substring(0, 4)
                + "年" + this.ymd.substring(4, 6)
                + "月" + this.ymd.substring(6)
                + "日",
                this.datepicker_dialog_ymd = false;

            this.dsp_ymd = this.ymd;
            this.$emit('set_ymd', this.Ym, this.ymd);

        }
        , set_ymd(ymd, label = "") {
            if (label.trim() != "") document.getElementById("label_ymd").innerHTML = wjCore.escapeHtml(label);
            this.ymd = ymd;
            this.dsp_ymd = ymd;
        }

        , text_input() {
            let textarea = document.getElementById("text_ymd");

            //数値チェック
            if (isNaN(textarea.value) == true) {
                this.disprenraku1_1 = textarea.value.substring(0, textarea.value.length - 1);
            }
            else {

                if (textarea.value.length == 8) {
                    this.dsp_ymd = textarea.value.substring(0, 4)
                        + "年" + textarea.value.substring(4, 6)
                        + "月" + textarea.value.substring(6)
                        + "日"

                    this.picker = this.dsp_ymd.replace("年", "-");
                    this.picker = this.picker.replace("月", "-");
                    this.picker = this.picker.replace("日", "");
                    this.Ym = dayjs(this.picker);

                    this.$emit('set_ymd', this.Ym, this.dsp_ymd);
                }
            }
        }
    }
}

</script>


