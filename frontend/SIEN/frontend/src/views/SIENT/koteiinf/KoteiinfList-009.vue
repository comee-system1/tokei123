<template>
    <v-sheet class="clssheet-chu009" elevation="2">

        <label class="clsstitle1_Noreki_back009" v-show="Label_Visible">
            <label class="clsstitle1_Noreki009">履歴が未作成です。
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                履歴作成ボタンから作成してください。</label>
        </label>
        <div class="area009-001">
            <label class="clsstitle009-001">生活状況</label>
            <v-card class="ml-2" elevation="3">
                <a class="addBtn_kotei" @click="onHeadclick_ins">履歴作成</a>
            </v-card>

        </div>

        <!--<label class="clsstitle009-002">【{{str_ymd}}作成】</label>-->
        <label class="clsstitle1_tyosa mt-3" id="Ymd">&nbsp;&nbsp;調査日&nbsp;&nbsp;</label>

        <v-btn :disabled="Label_Visible == true" id="tyosa_ymd_009" class="btnymd_kotei ml-1" @click="inputCalendarClick(1)"
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

        <div class="area009-002">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-copy" @click="onClickCopy">
                前回コピー
            </v-btn>
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu-reki" @click="onClickReki">
                履歴参照
            </v-btn>
        </div>

        <div class="area009-003">
            <label class="clsstitle009-003 pt-1">◆一日の流れ</label>
        </div>

        <div class="area009-004">
            <wj-flex-grid id="Gridicrn009-id" class="Gridicrn009-001" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="true" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :initialized="onInitializeIcrnGrid" :itemsSource="viewdata_day"
                :itemsSourceChanged="onItemsSourceChanged_day" :autoRowHeights="true">

                <!--一日グリッド  :allowMerging="'AllHeaders'" -->
                <wj-flex-grid-column header=" " binding="head_siid" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header=" " binding="data_kbn" :width="100" :wordWrap=true :allowResizing=false
                    align="center"></wj-flex-grid-column>
                <wj-flex-grid-column header="06:00" binding="data_0600_am" id="06:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="06:00" binding="data_0600_am2" id="06:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="06:00" binding="data_0600_pm" id="06:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="06:00" binding="data_0600_pm2" id="06:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="07:00" binding="data_0700_am" id="07:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="07:00" binding="data_0700_am2" id="07:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="07:00" binding="data_0700_pm" id="07:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="07:00" binding="data_0700_pm2" id="07:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="08:00" binding="data_0800_am" id="08:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="08:00" binding="data_0800_am2" id="08:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="08:00" binding="data_0800_pm" id="08:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="08:00" binding="data_0800_pm2" id="08:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="09:00" binding="data_0900_am" id="09:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="09:00" binding="data_0900_am2" id="09:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="09:00" binding="data_0900_pm" id="09:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="09:00" binding="data_0900_pm2" id="09:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="10:00" binding="data_1000_am" id="10:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="10:00" binding="data_1000_am2" id="10:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="10:00" binding="data_1000_pm" id="10:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="10:00" binding="data_1000_pm2" id="10:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="11:00" binding="data_1100_am" id="11:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="11:00" binding="data_1100_am2" id="11:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="11:00" binding="data_1100_pm" id="11:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="11:00" binding="data_1100_pm2" id="11:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="12:00" binding="data_1200_am" id="12:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="12:00" binding="data_1200_am2" id="12:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="12:00" binding="data_1200_pm" id="12:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="12:00" binding="data_1200_pm2" id="12:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="13:00" binding="data_1300_am" id="13:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="13:00" binding="data_1300_am2" id="13:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="13:00" binding="data_1300_pm" id="13:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="13:00" binding="data_1300_pm2" id="13:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="14:00" binding="data_1400_am" id="14:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="14:00" binding="data_1400_am2" id="14:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="14:00" binding="data_1400_pm" id="14:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="14:00" binding="data_1400_pm2" id="14:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="15:00" binding="data_1500_am" id="15:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="15:00" binding="data_1500_am2" id="15:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="15:00" binding="data_1500_pm" id="15:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="15:00" binding="data_1500_pm2" id="15:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="16:00" binding="data_1600_am" id="16:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="16:00" binding="data_1600_am2" id="16:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="16:00" binding="data_1600_pm" id="16:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="16:00" binding="data_1600_pm2" id="16:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="17:00" binding="data_1700_am" id="17:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="17:00" binding="data_1700_am2" id="17:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="17:00" binding="data_1700_pm" id="17:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="17:00" binding="data_1700_pm" id="17:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="18:00" binding="data_1800_am" id="18:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="18:00" binding="data_1800_am2" id="18:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="18:00" binding="data_1800_pm" id="18:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="18:00" binding="data_1800_pm2" id="18:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="19:00" binding="data_1900_am" id="19:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="19:00" binding="data_1900_am2" id="19:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="19:00" binding="data_1900_pm" id="19:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="19:00" binding="data_1900_pm2" id="19:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="20:00" binding="data_2000_am" id="20:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="20:00" binding="data_2000_am2" id="20:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="20:00" binding="data_2000_pm" id="20:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="20:00" binding="data_2000_pm2" id="20:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="21:00" binding="data_2100_am" id="21:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="21:00" binding="data_2100_am2" id="21:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="21:00" binding="data_2100_pm" id="21:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="21:00" binding="data_2100_pm2" id="21:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="22:00" binding="data_2200_am" id="22:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="22:00" binding="data_2200_am2" id="22:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="22:00" binding="data_2200_pm" id="22:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="22:00" binding="data_2200_pm2" id="22:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="23:00" binding="data_2300_am" id="23:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="23:00" binding="data_2300_am2" id="23:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="23:00" binding="data_2300_pm" id="23:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="23:00" binding="data_2300_pm2" id="23:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="24:00" binding="data_2400_am" id="24:00" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="24:00" binding="data_2400_am2" id="24:00_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="24:00" binding="data_2400_pm" id="24:30" :width="100" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="24:00" binding="data_2400_pm2" id="24:30_space" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <!--
            <wj-flex-grid-column header="01:00" binding="data_0100_am" id="01:00" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="01:00" binding="data_0100_am2" id="01:00_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="01:00" binding="data_0100_pm" id="01:30" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="01:00" binding="data_0100_pm2" id="01:30" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="02:00" binding="data_0200_am" id="02:00" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="02:00" binding="data_0200_am2" id="02:00_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="02:00" binding="data_0200_pm" id="02:30" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="02:00" binding="data_0200_pm2" id="02:30_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="03:00" binding="data_0300_am" id="03:00" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="03:00" binding="data_0300_am2" id="03:00_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="03:00" binding="data_0300_pm" id="03:30" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="03:00" binding="data_0300_pm2" id="03:30_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="04:00" binding="data_0400_am" id="04:00" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="04:00" binding="data_0400_am2" id="04:00_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="04:00" binding="data_0400_pm" id="04:30" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="04:00" binding="data_0400_pm2" id="04:30_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="05:00" binding="data_0500_am" id="05:00" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="05:00" binding="data_0500_am2" id="05:00_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="05:00" binding="data_0500_pm" id="05:30" :width="100" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
            <wj-flex-grid-column header="05:00" binding="data_0500_pm2" id="05:30_space" :width="0" :wordWrap=true :allowResizing=false ></wj-flex-grid-column>
                -->
            </wj-flex-grid>

            <div class="area009-005">
                <label class="clsstitle009-004">特記事項</label>
                <textarea id="textarea_day" class="clssinp009-001" v-model="disptok_day" @click="click_text"
                    @input="initTextarea(1)"></textarea>
            </div>
        </div>


        <div class="area009-006">
            <label class="clsstitle009-005 pt-1">◆週間生活</label>
        </div>

        <div class="area009-007">
            <wj-flex-grid id="Gridicrn009-id2" class="Gridicrn009-002" :headersVisibility="'Column'"
                :autoGenerateColumns="false" :allowAddNew="false" :allowDelete="false" :allowPinning="false"
                :allowMerging="true" :allowResizing="false" :allowSorting="false" :allowDragging="false"
                :selectionMode="'Row'" :initialized="onInitializeIcrnGrid_week" :itemsSource="viewdata_week"
                :itemsSourceChanged="onItemsSourceChanged_week" :autoRowHeights="true">
                <wj-flex-grid-column header=" " binding="data_kbn" id="data_kbn" :width="85" :isReadOnly="true"
                    :wordWrap=true :allowResizing=false align="center"></wj-flex-grid-column>
                <wj-flex-grid-column header="月" binding="data_mon" id="data_mon" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="月" binding="data_mon2" id="data_mon2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="火" binding="data_tue" id="data_tue" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="火" binding="data_tue2" id="data_tue2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="水" binding="data_wed" id="data_wed" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="水" binding="data_wed2" id="data_wed2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="木" binding="data_thu" id="data_thu" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="木" binding="data_thu2" id="data_thu2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="金" binding="data_fri" id="data_fri" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="金" binding="data_fri2" id="data_fri2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="土" binding="data_sat" id="data_sat" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="土" binding="data_sat2" id="data_sat2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="日" binding="data_sun" id="data_sun" :width="120" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>
                <wj-flex-grid-column header="日" binding="data_sun2" id="data_sun2" :width="0" :wordWrap=true
                    :allowResizing=false></wj-flex-grid-column>

            </wj-flex-grid>

            <div class="area009-008">
                <label class="clsstitle009-006">特記事項</label>
                <textarea id="textarea_week" class="clssinp009-002" v-model="disptok_week" @click="click_text"
                    @input="initTextarea(2)"></textarea>
            </div>
        </div>

        <div class="area009-009">
            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu009-clr" @click="onClickclr">
                クリア
            </v-btn>

            <label class="label footer" id="footer_009" style="margin-left: 180px;"></label>

            <v-btn :disabled="Label_Visible == true" class="clsbtnmenu009-ins" @click="onClickIns">
                登 録
            </v-btn>
        </div>

        <!-- データ登録エリア -->
        <v-dialog v-model="Insdaywin" width="435">
            <v-sheet class="clssheet-head_daywin" elevation="2">
                <!--
            id ="day_win_id"
            @mousedown="win_drag_day($event)"
            @mousemove="win_move_day($event)"
            @mouseup="win_up_day($event)"
            style="bottom: 50%;right: 50%;">
            -->
                <div>
                    <div class="day_area001">
                        <label class="clsstitlehead_daywin mt-1 ml-1">生活状況登録</label>
                        <v-btn margin-left=1px elevation="2" icon small top class="closeButton_win  mt-1" color="red"
                            @click="Click_colse_day">
                            <v-icon> mdi-close </v-icon>
                        </v-btn>
                    </div>
                    <div class="day_area001 mt-2">
                        <label class="day_lbl001">時 間</label>
                        <select class="customSelectBox ml-1" v-model="dispstime" @change="onstimeClicked"
                            style="width: 120px; height: 30px">
                            <option v-for="val in time_list" :key="val.id" :value="val.name">
                                {{ val.name }}
                            </option>
                        </select>
                        <label class="day_texttime">～</label>
                        <select class="customSelectBox" v-model="dispetime" @change="onetimeClicked"
                            style="width: 120px; height: 30px">
                            <option v-for="val in time_list" :key="val.id" :value="val.name">
                                {{ val.name }}
                            </option>
                        </select>
                    </div>
                    <div class="day_area001 mt-2">
                        <label class="day_lbl001">スケジュール</label>
                        <input type="text" id="txtdaysca" class="day_textsca" v-model="dispscanaiyo"
                            @input="scatext_input" />
                    </div>
                    <div class="day_area001 mt-1">
                        <v-btn class="clsbtnmenuday-ins" @click="onClick_dayset">
                            登 録
                        </v-btn>
                    </div>
                </div>
            </v-sheet>
        </v-dialog>

        <!-- ヘッダダイアログエリア -->
        <v-dialog v-model="InsWinhead" width="400">
            <v-sheet class="clssheet-head" elevation="2" id="head_win_009id" @mousedown="win_drag($event)"
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
                        <input class="chkbox mt-1" id="chk_head009" type="checkbox" style="margin-left: 4px;margin-top: 0px !important;">
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
        <v-dialog v-model="dialog_Message_flg" width="262">
            <v-sheet id="kakunin_id" class="clssheet-Mes" elevation="2">
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
            <v-sheet id="rireki_id009" class="clssheet-Reki" elevation="2" @mousedown="win_drag_reki($event)"
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
                    <v-btn :disabled="Label_Visible == true" class="clsbtnmenu009-del" @click="onClickdel_reki">
                        削 除
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
import { getConnect } from '../../../connect/getConnect';
import { postConnect } from '../../../connect/postConnect';
import { putConnect } from '../../../connect/putConnect';
import { deleteConnect } from '../../../connect/deleteConnect';
import sysConst from '../../../utiles/const';
import sysConst_kotei from '../../../utiles/const_kotei';
import {Kotei_Copy_All} from '../../../js/koteiinf/kotei_common';



export default
    {
        components: {
            //'VueTimepicker':VueTimepicker,
        },
        props: ["ymd", "uniqid", "traceid", "jigyoid", "kotei_kbn", "login_siid"],
        data() {
            return {
                time_list: [
                    { id: 60, name: '06:00' },
                    { id: 63, name: '06:30' },
                    { id: 70, name: '07:00' },
                    { id: 73, name: '07:30' },
                    { id: 80, name: '08:00' },
                    { id: 83, name: '08:30' },
                    { id: 90, name: '09:00' },
                    { id: 93, name: '09:30' },
                    { id: 100, name: '10:00' },
                    { id: 103, name: '10:30' },
                    { id: 110, name: '11:00' },
                    { id: 113, name: '11:30' },
                    { id: 120, name: '12:00' },
                    { id: 123, name: '12:30' },
                    { id: 130, name: '13:00' },
                    { id: 133, name: '13:30' },
                    { id: 140, name: '14:00' },
                    { id: 143, name: '14:30' },
                    { id: 150, name: '15:00' },
                    { id: 153, name: '15:30' },
                    { id: 160, name: '16:00' },
                    { id: 163, name: '16:30' },
                    { id: 170, name: '17:00' },
                    { id: 173, name: '17:30' },
                    { id: 180, name: '18:00' },
                    { id: 183, name: '18:30' },
                    { id: 190, name: '19:00' },
                    { id: 193, name: '19:30' },
                    { id: 200, name: '20:00' },
                    { id: 203, name: '20:30' },
                    { id: 210, name: '21:00' },
                    { id: 213, name: '21:30' },
                    { id: 220, name: '22:00' },
                    { id: 223, name: '22:30' },
                    { id: 230, name: '23:00' },
                    { id: 233, name: '23:30' },
                    { id: 240, name: '24:00' },
                    { id: 243, name: '24:30' },
                ],

                str_ymd: this.ymd.substring(0, 4)
                    + "年" + this.ymd.substring(4, 6)
                    + "月" + this.ymd.substring(6)
                    + "日",
                //一日の登録
                Insdaywin: false,
                dispstime: "",
                dispetime: "",
                dispscanaiyo: "",

                day_kbn: 1,  //1:本人2介護者

                //入力チェック
                inputchk: false,

                //特記事項
                disptok_day: "",
                disptok_week: "",

                //ダイアログ
                InsWinhead: false,
                Rirekiwin: false,
                datepicker_dialog_head: false,
                datepicker_dialog_tyosa: false,
                Ym: '',
                picker: '',
                headinskbn: 0,   //0:個別登録 1:一括登録

                //確認ダイアログ
                dialog_Message_flg: false,
                Dialog_Message: '',       //ダイアログメッセージ
                dialo_Yesflg: false,      //ダイアログ結果
                dialo_Yesflg_no: false,      //ダイアログ結果No 1:Yse 2:No
                Btnno_Visible: false,     //「いいえ」ボタン表示設定    

                pdataid: '',         //表示しているDATAID
                pmymd: '',
                pmymd_moto: '',     //表示している元MYMD AAA
                intcode: 0,         //表示しているintcode
                GetKihonSelInf: [],  //API取得データ(履歴)
                GetViewDataInf: [],  //API取得データ(データ)
                GetKihonInf: [],    //API取得データ
                tokflg_day: false,       //特記フラグ
                tokflg_week: false,       //特記フラグ
                dataflg: false,
                disprekitanto: 0,

                //履歴作成アナウンス
                Label_Visible: false,
                btn_enable: false,

                viewdata_day: [],           //グリッド表示データ DAY
                viewdata_week: [],          //グリッド表示データ WEEK
                viewdata_reki: [],          //履歴グリッド表示データ

                //dragflg
                Dragflg: false,
                mouseX: 0,
                mouseY: 0,
                screenX: 0,
                screenY: 0,
                moveX: 0,
                moveY: 0,

            };
        },
        methods:
        {
            click_text() {
                this.inputchk = true;//入力チェックT
                this.Chk_Reki();
            },
            onClickCopy() {
                //前回コピークリック
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
                    this.CopySeldata = result;
                    this.get_data();
                });
            },
            onClickReki: function () {
                if (this.Chk_Reki() == true) {
                    this.Dragflg = false;
                    this.Rirekiwin = true;
                }
            },
            onItemsSourceChanging(flexGrid) {
                flexGrid.beginUpdate();
                let headerlist = this.HeaderList;
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
                }
                flexGrid.endUpdate();
            },
            onInitializeIcrnGrid(flexGrid) {
                flexGrid.beginUpdate();

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header009'
                flexGrid.cells.rows.defaultSize = 20;
                flexGrid.alternatingRowStep = 0;
                flexGrid.rows.allowMerging = true;

                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_day(e) }.bind(this));
                this.flex_day = flexGrid;

                flexGrid.endUpdate();
            }
            , grid_click_day: function (e) {
                //一日グリッド
                if (this.Chk_Reki() == true) {
                    this.inputchk = true;
                    var ht = this.flex_day.hitTest(e);
                    //グリッドがクリックされた場合ウィンドウを表示する
                    if (ht.row >= 0 && ht.col > 1) {
                        if (ht.row == 0) {
                            this.day_kbn = 1;
                        }
                        else {
                            this.day_kbn = 2;
                        }

                        this.dispstime = this.flex_day.columns[ht.col].header;

                        for (let i = 0; i < this.time_list.length; i++) {
                            if (this.dispstime == this.time_list[i].name) {
                                this.dispetime = this.time_list[i + 1].name;
                            }
                        }

                        this.dispscanaiyo = "";
                        this.Insdaywin = true;
                    }
                }
            }
            , Click_colse_day() {
                this.Insdaywin = false;
            }
            , onstimeClicked() {
                //開始時間選択時
                //this.dispstime = this.time
            }
            , onetimeClicked() {
                //開始時間選択時
            }

            , onClick_dayset() {
                //DAYの入力をメイン画面に設定
                //入力チェック
                if (this.dispstime.replace(":", "") > this.dispetime.replace(":", "") || this.dispstime.replace(":", "") == this.dispetime.replace(":", "")) {
                    this.Message_Dialog("時間を正しく入力してください。", 0);
                    return;
                }

                let wk_data = [];
                let wk_data2 = [];
                let wk_list = [];
                let wk_list2 = [];
                //データをリストに反映

                //ワークリストを作成
                wk_data = { time: "05:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "05:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "05:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "05:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "06:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "06:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "06:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "06:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "07:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "07:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "07:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "07:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "08:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "08:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "08:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "08:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "09:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "09:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "09:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "09:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "10:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "10:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "10:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "10:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "11:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "11:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "11:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "11:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "12:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "12:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "12:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "12:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "13:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "13:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "13:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "13:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "14:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "14:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "14:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "14:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "15:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "15:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "15:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "15:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "16:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "16:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "16:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "16:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "17:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "17:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "17:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "17:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "18:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "18:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "18:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "18:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "19:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "19:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "19:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "19:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "20:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "20:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "20:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "20:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "21:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "21:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "21:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "21:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "22:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "22:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "22:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "22:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "23:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "23:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "23:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "23:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "24:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "24:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "24:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "24:30", naiyo: "" }; wk_list2.push(wk_data2);

                //データ格納
                let okflg = false;
                let wk_viewdata_day = [];
                wk_viewdata_day = this.viewdata_day.concat();


                if (this.day_kbn == 1) {
                    //本人
                    for (let i = 0; i < wk_list.length; i++) {
                        if (wk_list[i].time == this.dispetime && okflg == true) {
                            //終了
                            okflg = false;
                        }
                        if (wk_list[i].time == this.dispstime || okflg == true) {
                            //開始
                            okflg = true;
                            wk_list[i].naiyo = this.dispscanaiyo;
                        }
                    }

                    if (wk_list[0].naiyo != "") { wk_viewdata_day[0].data_0500_am = wk_list[0].naiyo; wk_viewdata_day[0].data_0500_am2 = wk_list[0].naiyo }
                    if (wk_list[1].naiyo != "") { wk_viewdata_day[0].data_0500_pm = wk_list[1].naiyo; wk_viewdata_day[0].data_0500_pm2 = wk_list[1].naiyo }
                    if (wk_list[2].naiyo != "") { wk_viewdata_day[0].data_0600_am = wk_list[2].naiyo; wk_viewdata_day[0].data_0600_am2 = wk_list[2].naiyo }
                    if (wk_list[3].naiyo != "") { wk_viewdata_day[0].data_0600_pm = wk_list[3].naiyo; wk_viewdata_day[0].data_0600_pm2 = wk_list[3].naiyo }
                    if (wk_list[4].naiyo != "") { wk_viewdata_day[0].data_0700_am = wk_list[4].naiyo; wk_viewdata_day[0].data_0700_am2 = wk_list[4].naiyo }
                    if (wk_list[5].naiyo != "") { wk_viewdata_day[0].data_0700_pm = wk_list[5].naiyo; wk_viewdata_day[0].data_0700_pm2 = wk_list[5].naiyo }
                    if (wk_list[6].naiyo != "") { wk_viewdata_day[0].data_0800_am = wk_list[6].naiyo; wk_viewdata_day[0].data_0800_am2 = wk_list[6].naiyo }
                    if (wk_list[7].naiyo != "") { wk_viewdata_day[0].data_0800_pm = wk_list[7].naiyo; wk_viewdata_day[0].data_0800_pm2 = wk_list[7].naiyo }
                    if (wk_list[8].naiyo != "") { wk_viewdata_day[0].data_0900_am = wk_list[8].naiyo; wk_viewdata_day[0].data_0900_am2 = wk_list[8].naiyo }
                    if (wk_list[9].naiyo != "") { wk_viewdata_day[0].data_0900_pm = wk_list[9].naiyo; wk_viewdata_day[0].data_0900_pm2 = wk_list[9].naiyo }
                    if (wk_list[10].naiyo != "") { wk_viewdata_day[0].data_1000_am = wk_list[10].naiyo; wk_viewdata_day[0].data_1000_am2 = wk_list[10].naiyo }
                    if (wk_list[11].naiyo != "") { wk_viewdata_day[0].data_1000_pm = wk_list[11].naiyo; wk_viewdata_day[0].data_1000_pm2 = wk_list[11].naiyo }
                    if (wk_list[12].naiyo != "") { wk_viewdata_day[0].data_1100_am = wk_list[12].naiyo; wk_viewdata_day[0].data_1100_am2 = wk_list[12].naiyo }
                    if (wk_list[13].naiyo != "") { wk_viewdata_day[0].data_1100_pm = wk_list[13].naiyo; wk_viewdata_day[0].data_1100_pm2 = wk_list[13].naiyo }
                    if (wk_list[14].naiyo != "") { wk_viewdata_day[0].data_1200_am = wk_list[14].naiyo; wk_viewdata_day[0].data_1200_am2 = wk_list[14].naiyo }
                    if (wk_list[15].naiyo != "") { wk_viewdata_day[0].data_1200_pm = wk_list[15].naiyo; wk_viewdata_day[0].data_1200_pm2 = wk_list[15].naiyo }
                    if (wk_list[16].naiyo != "") { wk_viewdata_day[0].data_1300_am = wk_list[16].naiyo; wk_viewdata_day[0].data_1300_am2 = wk_list[16].naiyo }
                    if (wk_list[17].naiyo != "") { wk_viewdata_day[0].data_1300_pm = wk_list[17].naiyo; wk_viewdata_day[0].data_1300_pm2 = wk_list[17].naiyo }
                    if (wk_list[18].naiyo != "") { wk_viewdata_day[0].data_1400_am = wk_list[18].naiyo; wk_viewdata_day[0].data_1400_am2 = wk_list[18].naiyo }
                    if (wk_list[19].naiyo != "") { wk_viewdata_day[0].data_1400_pm = wk_list[19].naiyo; wk_viewdata_day[0].data_1400_pm2 = wk_list[19].naiyo }
                    if (wk_list[20].naiyo != "") { wk_viewdata_day[0].data_1500_am = wk_list[20].naiyo; wk_viewdata_day[0].data_1500_am2 = wk_list[20].naiyo }
                    if (wk_list[21].naiyo != "") { wk_viewdata_day[0].data_1500_pm = wk_list[21].naiyo; wk_viewdata_day[0].data_1500_pm2 = wk_list[21].naiyo }
                    if (wk_list[22].naiyo != "") { wk_viewdata_day[0].data_1600_am = wk_list[22].naiyo; wk_viewdata_day[0].data_1600_am2 = wk_list[22].naiyo }
                    if (wk_list[23].naiyo != "") { wk_viewdata_day[0].data_1600_pm = wk_list[23].naiyo; wk_viewdata_day[0].data_1600_pm2 = wk_list[23].naiyo }
                    if (wk_list[24].naiyo != "") { wk_viewdata_day[0].data_1700_am = wk_list[24].naiyo; wk_viewdata_day[0].data_1700_am2 = wk_list[24].naiyo }
                    if (wk_list[25].naiyo != "") { wk_viewdata_day[0].data_1700_pm = wk_list[25].naiyo; wk_viewdata_day[0].data_1700_pm2 = wk_list[25].naiyo }
                    if (wk_list[26].naiyo != "") { wk_viewdata_day[0].data_1800_am = wk_list[26].naiyo; wk_viewdata_day[0].data_1800_am2 = wk_list[26].naiyo }
                    if (wk_list[27].naiyo != "") { wk_viewdata_day[0].data_1800_pm = wk_list[27].naiyo; wk_viewdata_day[0].data_1800_pm2 = wk_list[27].naiyo }
                    if (wk_list[28].naiyo != "") { wk_viewdata_day[0].data_1900_am = wk_list[28].naiyo; wk_viewdata_day[0].data_1900_am2 = wk_list[28].naiyo }
                    if (wk_list[29].naiyo != "") { wk_viewdata_day[0].data_1900_pm = wk_list[29].naiyo; wk_viewdata_day[0].data_1900_pm2 = wk_list[29].naiyo }
                    if (wk_list[30].naiyo != "") { wk_viewdata_day[0].data_2000_am = wk_list[30].naiyo; wk_viewdata_day[0].data_2000_am2 = wk_list[30].naiyo }
                    if (wk_list[31].naiyo != "") { wk_viewdata_day[0].data_2000_pm = wk_list[31].naiyo; wk_viewdata_day[0].data_2000_pm2 = wk_list[31].naiyo }
                    if (wk_list[32].naiyo != "") { wk_viewdata_day[0].data_2100_am = wk_list[32].naiyo; wk_viewdata_day[0].data_2100_am2 = wk_list[32].naiyo }
                    if (wk_list[33].naiyo != "") { wk_viewdata_day[0].data_2100_pm = wk_list[33].naiyo; wk_viewdata_day[0].data_2100_pm2 = wk_list[33].naiyo }
                    if (wk_list[34].naiyo != "") { wk_viewdata_day[0].data_2200_am = wk_list[34].naiyo; wk_viewdata_day[0].data_2200_am2 = wk_list[34].naiyo }
                    if (wk_list[35].naiyo != "") { wk_viewdata_day[0].data_2200_pm = wk_list[35].naiyo; wk_viewdata_day[0].data_2200_pm2 = wk_list[35].naiyo }
                    if (wk_list[36].naiyo != "") { wk_viewdata_day[0].data_2300_am = wk_list[36].naiyo; wk_viewdata_day[0].data_2300_am2 = wk_list[36].naiyo }
                    if (wk_list[37].naiyo != "") { wk_viewdata_day[0].data_2300_pm = wk_list[37].naiyo; wk_viewdata_day[0].data_2300_pm2 = wk_list[37].naiyo }
                    if (wk_list[38].naiyo != "") { wk_viewdata_day[0].data_2400_am = wk_list[38].naiyo; wk_viewdata_day[0].data_2400_am2 = wk_list[38].naiyo }
                    if (wk_list[39].naiyo != "") { wk_viewdata_day[0].data_2400_pm = wk_list[39].naiyo; wk_viewdata_day[0].data_2400_pm2 = wk_list[39].naiyo }

                    //本人
                    //this.viewdata_day[0]//aaaaaaaaaa
                }
                else {
                    //介護者
                    //本人
                    for (let i = 0; i < wk_list2.length; i++) {
                        if (wk_list2[i].time == this.dispetime && okflg == true) {
                            //終了
                            okflg = false;
                        }
                        if (wk_list2[i].time == this.dispstime || okflg == true) {
                            //開始
                            okflg = true;
                            wk_list2[i].naiyo = this.dispscanaiyo;
                        }
                    }

                    if (wk_list2[0].naiyo != "") { wk_viewdata_day[1].data_0500_am = wk_list2[0].naiyo; wk_viewdata_day[1].data_0500_am2 = wk_list2[0].naiyo }
                    if (wk_list2[1].naiyo != "") { wk_viewdata_day[1].data_0500_pm = wk_list2[1].naiyo; wk_viewdata_day[1].data_0500_pm2 = wk_list2[1].naiyo }
                    if (wk_list2[2].naiyo != "") { wk_viewdata_day[1].data_0600_am = wk_list2[2].naiyo; wk_viewdata_day[1].data_0600_am2 = wk_list2[2].naiyo }
                    if (wk_list2[3].naiyo != "") { wk_viewdata_day[1].data_0600_pm = wk_list2[3].naiyo; wk_viewdata_day[1].data_0600_pm2 = wk_list2[3].naiyo }
                    if (wk_list2[4].naiyo != "") { wk_viewdata_day[1].data_0700_am = wk_list2[4].naiyo; wk_viewdata_day[1].data_0700_am2 = wk_list2[4].naiyo }
                    if (wk_list2[5].naiyo != "") { wk_viewdata_day[1].data_0700_pm = wk_list2[5].naiyo; wk_viewdata_day[1].data_0700_pm2 = wk_list2[5].naiyo }
                    if (wk_list2[6].naiyo != "") { wk_viewdata_day[1].data_0800_am = wk_list2[6].naiyo; wk_viewdata_day[1].data_0800_am2 = wk_list2[6].naiyo }
                    if (wk_list2[7].naiyo != "") { wk_viewdata_day[1].data_0800_pm = wk_list2[7].naiyo; wk_viewdata_day[1].data_0800_pm2 = wk_list2[7].naiyo }
                    if (wk_list2[8].naiyo != "") { wk_viewdata_day[1].data_0900_am = wk_list2[8].naiyo; wk_viewdata_day[1].data_0900_am2 = wk_list2[8].naiyo }
                    if (wk_list2[9].naiyo != "") { wk_viewdata_day[1].data_0900_pm = wk_list2[9].naiyo; wk_viewdata_day[1].data_0900_pm2 = wk_list2[9].naiyo }
                    if (wk_list2[10].naiyo != "") { wk_viewdata_day[1].data_1000_am = wk_list2[10].naiyo; wk_viewdata_day[1].data_1000_am2 = wk_list2[10].naiyo }
                    if (wk_list2[11].naiyo != "") { wk_viewdata_day[1].data_1000_pm = wk_list2[11].naiyo; wk_viewdata_day[1].data_1000_pm2 = wk_list2[11].naiyo }
                    if (wk_list2[12].naiyo != "") { wk_viewdata_day[1].data_1100_am = wk_list2[12].naiyo; wk_viewdata_day[1].data_1100_am2 = wk_list2[12].naiyo }
                    if (wk_list2[13].naiyo != "") { wk_viewdata_day[1].data_1100_pm = wk_list2[13].naiyo; wk_viewdata_day[1].data_1100_pm2 = wk_list2[13].naiyo }
                    if (wk_list2[14].naiyo != "") { wk_viewdata_day[1].data_1200_am = wk_list2[14].naiyo; wk_viewdata_day[1].data_1200_am2 = wk_list2[14].naiyo }
                    if (wk_list2[15].naiyo != "") { wk_viewdata_day[1].data_1200_pm = wk_list2[15].naiyo; wk_viewdata_day[1].data_1200_pm2 = wk_list2[15].naiyo }
                    if (wk_list2[16].naiyo != "") { wk_viewdata_day[1].data_1300_am = wk_list2[16].naiyo; wk_viewdata_day[1].data_1300_am2 = wk_list2[16].naiyo }
                    if (wk_list2[17].naiyo != "") { wk_viewdata_day[1].data_1300_pm = wk_list2[17].naiyo; wk_viewdata_day[1].data_1300_pm2 = wk_list2[17].naiyo }
                    if (wk_list2[18].naiyo != "") { wk_viewdata_day[1].data_1400_am = wk_list2[18].naiyo; wk_viewdata_day[1].data_1400_am2 = wk_list2[18].naiyo }
                    if (wk_list2[19].naiyo != "") { wk_viewdata_day[1].data_1400_pm = wk_list2[19].naiyo; wk_viewdata_day[1].data_1400_pm2 = wk_list2[19].naiyo }
                    if (wk_list2[20].naiyo != "") { wk_viewdata_day[1].data_1500_am = wk_list2[20].naiyo; wk_viewdata_day[1].data_1500_am2 = wk_list2[20].naiyo }
                    if (wk_list2[21].naiyo != "") { wk_viewdata_day[1].data_1500_pm = wk_list2[21].naiyo; wk_viewdata_day[1].data_1500_pm2 = wk_list2[21].naiyo }
                    if (wk_list2[22].naiyo != "") { wk_viewdata_day[1].data_1600_am = wk_list2[22].naiyo; wk_viewdata_day[1].data_1600_am2 = wk_list2[22].naiyo }
                    if (wk_list2[23].naiyo != "") { wk_viewdata_day[1].data_1600_pm = wk_list2[23].naiyo; wk_viewdata_day[1].data_1600_pm2 = wk_list2[23].naiyo }
                    if (wk_list2[24].naiyo != "") { wk_viewdata_day[1].data_1700_am = wk_list2[24].naiyo; wk_viewdata_day[1].data_1700_am2 = wk_list2[24].naiyo }
                    if (wk_list2[25].naiyo != "") { wk_viewdata_day[1].data_1700_pm = wk_list2[25].naiyo; wk_viewdata_day[1].data_1700_pm2 = wk_list2[25].naiyo }
                    if (wk_list2[26].naiyo != "") { wk_viewdata_day[1].data_1800_am = wk_list2[26].naiyo; wk_viewdata_day[1].data_1800_am2 = wk_list2[26].naiyo }
                    if (wk_list2[27].naiyo != "") { wk_viewdata_day[1].data_1800_pm = wk_list2[27].naiyo; wk_viewdata_day[1].data_1800_pm2 = wk_list2[27].naiyo }
                    if (wk_list2[28].naiyo != "") { wk_viewdata_day[1].data_1900_am = wk_list2[28].naiyo; wk_viewdata_day[1].data_1900_am2 = wk_list2[28].naiyo }
                    if (wk_list2[29].naiyo != "") { wk_viewdata_day[1].data_1900_pm = wk_list2[29].naiyo; wk_viewdata_day[1].data_1900_pm2 = wk_list2[29].naiyo }
                    if (wk_list2[30].naiyo != "") { wk_viewdata_day[1].data_2000_am = wk_list2[30].naiyo; wk_viewdata_day[1].data_2000_am2 = wk_list2[30].naiyo }
                    if (wk_list2[31].naiyo != "") { wk_viewdata_day[1].data_2000_pm = wk_list2[31].naiyo; wk_viewdata_day[1].data_2000_pm2 = wk_list2[31].naiyo }
                    if (wk_list2[32].naiyo != "") { wk_viewdata_day[1].data_2100_am = wk_list2[32].naiyo; wk_viewdata_day[1].data_2100_am2 = wk_list2[32].naiyo }
                    if (wk_list2[33].naiyo != "") { wk_viewdata_day[1].data_2100_pm = wk_list2[33].naiyo; wk_viewdata_day[1].data_2100_pm2 = wk_list2[33].naiyo }
                    if (wk_list2[34].naiyo != "") { wk_viewdata_day[1].data_2200_am = wk_list2[34].naiyo; wk_viewdata_day[1].data_2200_am2 = wk_list2[34].naiyo }
                    if (wk_list2[35].naiyo != "") { wk_viewdata_day[1].data_2200_pm = wk_list2[35].naiyo; wk_viewdata_day[1].data_2200_pm2 = wk_list2[35].naiyo }
                    if (wk_list2[36].naiyo != "") { wk_viewdata_day[1].data_2300_am = wk_list2[36].naiyo; wk_viewdata_day[1].data_2300_am2 = wk_list2[36].naiyo }
                    if (wk_list2[37].naiyo != "") { wk_viewdata_day[1].data_2300_pm = wk_list2[37].naiyo; wk_viewdata_day[1].data_2300_pm2 = wk_list2[37].naiyo }
                    if (wk_list2[38].naiyo != "") { wk_viewdata_day[1].data_2400_am = wk_list2[38].naiyo; wk_viewdata_day[1].data_2400_am2 = wk_list2[38].naiyo }
                    if (wk_list2[39].naiyo != "") { wk_viewdata_day[1].data_2400_pm = wk_list2[39].naiyo; wk_viewdata_day[1].data_2400_pm2 = wk_list2[39].naiyo }

                }

                this.viewdata_day = wk_viewdata_day.concat();

                this.Insdaywin = false;  //画面を閉じる
            }
            , scatext_input() {
                //スケジュールテキスト入力
                let textarea = document.getElementById("txtdaysca");
                this.active = true;

                //文字数制御
                if (textarea.value.length > 10) //10文字
                {
                    this.dispscanaiyo = textarea.value.substring(0, 10);
                }
            }
            , initTextarea(kbn) {
                //特記事項

                if (kbn == 1) {
                    //日
                    let textarea = document.getElementById("textarea_day");
                    let rowcnt = textarea.value.split("\n");

                    this.active = true;

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
                }
                else {
                    //週
                    let textarea2 = document.getElementById("textarea_week");
                    let rowcnt = textarea2.value.split("\n");

                    this.active = true;

                    //文字数制御
                    if (textarea2.value.length > 100) //100文字
                    {
                        textarea2.value = textarea2.value.substring(0, 100);
                    }

                    //行数制御
                    if (rowcnt.length > 4) {
                        var result2 = "";
                        for (var j = 0; j < 4; j++) {
                            result2 += rowcnt[j] + "\n";
                        }
                        textarea2.value = result2;
                    }
                }
            }
            , onInitializeIcrnGrid_week(flexGrid) {
                flexGrid.beginUpdate();

                // ヘッダの追加と設定
                flexGrid.columnHeaders.rows[0].allowMerging = true;
                flexGrid.columnHeaders.rows[0].height = 20 * 2;
                flexGrid.columnHeaders.rows[0].cssClassAll = 'column-header009'
                flexGrid.cells.rows.defaultSize = 20;
                flexGrid.alternatingRowStep = 0;
                flexGrid.rows.allowMerging = true;

                this.flex_week = flexGrid;
                //イベントの追加

                //編集開始
                flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click_week(e) }.bind(this));
                flexGrid.endUpdate();
            }
            , grid_click_week: function () {
                //週間グリッド
                this.inputchk = true;
            }

            //####共通####
            , viewClear() {
                //データクリア
                this.InsWinhead = false;
                this.InsWindata = false;
                this.InsWinflg = false;
                this.insdataflg = false;
                this.insflg = true;

                this.viewdata_day = [];
                this.viewdata_week = [];
                this.disptok_day = "";
                this.disptok_week = "";
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
            , setUserData(wintcode, wSeldata) {
                //利用者選択データ受け取り
                this.inputchk = false //入力チェックリセット
                this.pdataid = 0; //初期化
                this.viewClear();
                this.GetViewDataInf = [];
                this.GetKihonSelInf = wSeldata;   //表示データ
                this.intcode = wintcode;          //利用者コード
                this.Ym = dayjs();  //日付を初期化
                this.pmymd = this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日';
                this.DataFilter();

            }
            , View_upd(intcode) {
                //画面更新
                this.$emit('child-dataupd', intcode); //画面更新
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
                    if (this.Chk_Reki() == true) {
                        this.picker = this.pmymd.replace("年", "-");
                        this.picker = this.picker.replace("月", "-");
                        this.picker = this.picker.replace("日", "");
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
                        //入力データの削除
                        this.del_rekidata();
                    }
                    else if (this.dialog_Actionflg == 5) {
                        //入力データの登録
                        this.Clickins_data();
                    }
                    else if (this.dialog_Actionflg == 6) {
                        //前回コピー
                        this.DataCopy();
                    }
                    else if (this.dialog_Actionflg == 0) {
                        //汎用メッセージ
                        this.dialog_Message_flg = false;
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

            //履歴登録
            , onHead_ins() {
                if (this.insflg == true) {
                    this.Message_Dialog("履歴を新規登録します。\nよろしいですか。", 1);
                }
                else {
                    this.Message_Dialog("履歴を更新登録します。\nよろしいですか。", 2);
                }
            }

            //新規履歴作成
            , onHeadclick_ins() {
                this.Ym = dayjs();
                this.insflg = true;//新規登録
                this.InsWinhead = true;
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
                        kbn: this.kotei_kbn,//生活状況
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
                                head_siid: ins_siid,
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

                        if (document.getElementById("chk_head009").checked == true) {
                        //前回コピーを実施する
                        Kotei_Copy_All(this.uniqid,this.traceid,this.intcode,this.jigyoid,ins_ymd,wk_insflg,sysConst_kotei.KOTEI_ID_KIHON).then();                        
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
                        kbn: this.kotei_kbn,//生活状況
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
                                head_siid: ins_siid,
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
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        if (kbn != 1) this.View_upd(this.intcode);
                        this.Message_Dialog(sysConst.MSG_REKI_UPD, 0);
                        this.InsWinhead = false;
                    }
                    );
                }
                this.headinskbn = 0;//登録区分初期化
            }
            , Click_colse() {
                //履歴作成閉じる
                this.InsWinhead = false;
            }
            , Click_colse_Reki() {
                this.Rirekiwin = false;
            }

            //#### 画面表示関係 ####
            , DataFilter() {
                let data = [];
                let Rekidata = [];
                let wk_Rekidata = [];
                let wk_kbn = this.kotei_kbn;

                if (this.GetKihonSelInf.icrn_inf != null) {
                    //基本情報のデータのみに絞る
                    this.GetKihonSelInf.icrn_inf.forEach(function (value) {
                        //区分が生活状況
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
                    this.Get_AllData = data.concat();

                    if (this.viewdata_reki.length > 0) {
                        this.pdataid = this.viewdata_reki[0].head_dataid;
                        this.get_data();
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
            , get_data() {
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
                    Kbn: this.kotei_kbn,             //生活状況
                    Dataid: this.pdataid,
                    Modeflg: sysConst_kotei.GET_KBN_DATA,        //データ取得
                };

                getConnect('/Koteiinf_HONNIN', params, 'KOTEIINF').then((result) => {
                    _self.GetViewDataInf = result;
                    this.DataFilter2();
                })
            }

            //####履歴関係 ####
            , onItemsSourceChanged(flexGrid) {
                // 初期選択を解除
                flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
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

            , input_chk: function () {
                //入力項目があれば登録メッセージ
                if (this.inputchk == true) {
                    this.Message_Dialog("登録されていない項目があります。\n 登録しますか。", 8);
                }
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
                                    this.Clickins_data(1);
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

            //####画面表示####
            //画面更新
            , DataFilter2() {
                //変数
                let wdataid = this.pdataid;
                let wk_Ymd = "";

                let tokflg_day = false;
                let tokflg_week = false;
                let datatok_day = [];
                let datatok_week = [];

                let wk_sampleData = [];
                let wk_sampleData2 = [];
                let sampleData = [];
                let sampleData2 = [];

                let wk_data = [];
                let wk_data2 = [];
                let wk_list = [];
                let wk_list2 = [];
                let wk_kbn = this.kotei_kbn;

                let wk_day_insymd = "";
                let wk_day_instime = "";
                let wk_day_siname = "";

                let wk_week_insymd = "";
                let wk_week_instime = "";
                let wk_week_siname = "";

                //表示用ワークリストを作成
                wk_data = { time: "05:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "05:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "05:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "05:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "06:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "06:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "06:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "06:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "07:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "07:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "07:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "07:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "08:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "08:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "08:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "08:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "09:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "09:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "09:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "09:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "10:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "10:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "10:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "10:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "11:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "11:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "11:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "11:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "12:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "12:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "12:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "12:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "13:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "13:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "13:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "13:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "14:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "14:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "14:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "14:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "15:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "15:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "15:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "15:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "16:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "16:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "16:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "16:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "17:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "17:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "17:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "17:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "18:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "18:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "18:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "18:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "19:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "19:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "19:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "19:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "20:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "20:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "20:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "20:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "21:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "21:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "21:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "21:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "22:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "22:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "22:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "22:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "23:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "23:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "23:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "23:30", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "24:00", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "24:00", naiyo: "" }; wk_list2.push(wk_data2);
                wk_data = { time: "24:30", naiyo: "" }; wk_list.push(wk_data); wk_data2 = { time: "24:30", naiyo: "" }; wk_list2.push(wk_data2);

                //表示データのひな型を作成
                for (let i = 0; i < 2; i++) {
                    let str = ""
                    if (i == 0) {
                        str = "本人"
                    }
                    else {
                        str = "介護者"
                    }

                    wk_sampleData = {
                        head_siid: "0",


                        data_kbn: str,
                        data_0600_am: " ",
                        data_0600_pm: " ",
                        data_0700_am: " ",
                        data_0700_pm: " ",
                        data_0800_am: " ",
                        data_0800_pm: " ",
                        data_0900_am: " ",
                        data_0900_pm: " ",
                        data_1000_am: " ",
                        data_1000_pm: " ",
                        data_1100_am: " ",
                        data_1100_pm: " ",
                        data_1200_am: " ",
                        data_1200_pm: " ",
                        data_1300_am: " ",
                        data_1300_pm: " ",
                        data_1400_am: " ",
                        data_1400_pm: " ",
                        data_1500_am: " ",
                        data_1500_pm: " ",
                        data_1600_am: " ",
                        data_1600_pm: " ",
                        data_1700_am: " ",
                        data_1700_pm: " ",
                        data_1800_am: " ",
                        data_1800_pm: " ",
                        data_1900_am: " ",
                        data_1900_pm: " ",
                        data_2000_am: " ",
                        data_2000_pm: " ",
                        data_2100_am: " ",
                        data_2100_pm: " ",
                        data_2200_am: " ",
                        data_2200_pm: " ",
                        data_2300_am: " ",
                        data_2300_pm: " ",
                        data_2400_am: " ",
                        data_2400_pm: " ",
                        data_0100_am: " ",
                        data_0100_pm: " ",
                        data_0200_am: " ",
                        data_0200_pm: " ",
                        data_0300_am: " ",
                        data_0300_pm: " ",
                        data_0400_am: " ",
                        data_0400_pm: " ",
                        data_0500_am: " ",
                        data_0500_pm: " ",

                        data_0600_am2: "s",
                        data_0600_pm2: "s",
                        data_0700_am2: "s",
                        data_0700_pm2: "s",
                        data_0800_am2: "s",
                        data_0800_pm2: "s",
                        data_0900_am2: "s",
                        data_0900_pm2: "s",
                        data_1000_am2: "s",
                        data_1000_pm2: "s",
                        data_1100_am2: "s",
                        data_1100_pm2: "s",
                        data_1200_am2: "s",
                        data_1200_pm2: "s",
                        data_1300_am2: "s",
                        data_1300_pm2: "s",
                        data_1400_am2: "s",
                        data_1400_pm2: "s",
                        data_1500_am2: "s",
                        data_1500_pm2: "s",
                        data_1600_am2: "s",
                        data_1600_pm2: "s",
                        data_1700_am2: "s",
                        data_1700_pm2: "s",
                        data_1800_am2: "s",
                        data_1800_pm2: "s",
                        data_1900_am2: "s",
                        data_1900_pm2: "s",
                        data_2000_am2: "s",
                        data_2000_pm2: "s",
                        data_2100_am2: "s",
                        data_2100_pm2: "s",
                        data_2200_am2: "s",
                        data_2200_pm2: "s",
                        data_2300_am2: "s",
                        data_2300_pm2: "s",
                        data_2400_am2: "s",
                        data_2400_pm2: "s",
                        data_0100_am2: "s",
                        data_0100_pm2: "s",
                        data_0200_am2: "s",
                        data_0200_pm2: "s",
                        data_0300_am2: "s",
                        data_0300_pm2: "s",
                        data_0400_am2: "s",
                        data_0400_pm2: "s",
                        data_0500_am2: "s",
                        data_0500_pm2: "s",

                    }
                    sampleData.push(wk_sampleData)
                }

                //表示データのひな型を作成
                for (let i = 0; i < 2; i++) {
                    let str = ""
                    if (i == 0) {
                        str = "午 前"
                    }
                    else {
                        str = "午 後"
                    }

                    wk_sampleData2 = {
                        head_siid: "0",
                        data_kbn: str,
                        data_mon: " ",
                        data_tue: " ",
                        data_wed: " ",
                        data_thu: " ",
                        data_fri: " ",
                        data_sat: " ",
                        data_sun: " ",
                        data_mon2: "s",
                        data_tue2: "s",
                        data_wed2: "s",
                        data_thu2: "s",
                        data_fri2: "s",
                        data_sat2: "s",
                        data_sun2: "s",
                    }
                    sampleData2.push(wk_sampleData2)
                }

                if (this.GetViewDataInf.icrn_inf != null) {
                    //生活状況のデータのみに絞る
                    this.GetViewDataInf.icrn_inf.forEach(function (value) {

                        //区分が生活状況
                        if (value.head_kbn == wk_kbn && value.head_dataid == wdataid) {

                            wk_Ymd = value.head_mymd.substring(0, 4)
                                + "年" + value.head_mymd.substring(4, 6)
                                + "月" + value.head_mymd.substring(6)
                                + "日",



                                //生活状況ヘッダの内容を取得
                                value.naiyo.forEach(function (value2) {

                                    if (value2.naiyo_kbn == 0) {
                                        //データ
                                        wk_day_insymd = value2.day_insymd;
                                        wk_day_instime = value2.day_instime;
                                        wk_day_siname = value2.day_siname;

                                        //day or week
                                        if (value2.day_dayweekkbn == 1) {
                                            //DAY

                                            //本人 or 介護者
                                            if (value2.day_kbn == 1) {
                                                let okflg = false;
                                                //本人
                                                for (let i = 0; i < wk_list.length; i++) {
                                                    if (wk_list[i].time == value2.day_etime && okflg == true) {
                                                        //終了
                                                        okflg = false;
                                                    }

                                                    if (wk_list[i].time == value2.day_stime || okflg == true) {
                                                        //開始
                                                        okflg = true;
                                                        wk_list[i].naiyo = value2.day_naiyo
                                                    }
                                                }
                                            }
                                            else if (value2.day_kbn == 2) {
                                                //介護者
                                                let okflg2 = false;
                                                //本人
                                                for (let i = 0; i < wk_list2.length; i++) {
                                                    if (wk_list2[i].time == value2.day_etime && okflg2 == true) {
                                                        //終了
                                                        okflg2 = false;
                                                    }

                                                    if (wk_list2[i].time == value2.day_stime || okflg2 == true) {
                                                        //開始
                                                        okflg2 = true;
                                                        wk_list2[i].naiyo = value2.day_naiyo
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            //Week

                                            let wk_naiyo = ["", "", "", "", "", "", ""];
                                            if (value2.week_kbn == 1) {

                                                wk_week_insymd = value2.week_insymd;
                                                wk_week_instime = value2.week_instime;
                                                wk_week_siname = value2.week_siname;
                                                if (value2.week_naiyo.trim() != "") //内容有り
                                                {
                                                    //午前
                                                    switch (value2.week_weekkbn) {
                                                        case 1: //月曜                                        
                                                            wk_naiyo[0] = wk_naiyo[0] + value2.week_naiyo;
                                                            sampleData2[0].data_mon = wk_naiyo[0];
                                                            sampleData2[0].data_mon2 = wk_naiyo[0];
                                                            break;
                                                        case 2: //火曜
                                                            wk_naiyo[1] = wk_naiyo[1] + value2.week_naiyo;
                                                            sampleData2[0].data_tue = wk_naiyo[1];
                                                            sampleData2[0].data_tue2 = wk_naiyo[1];
                                                            break;
                                                        case 3: //水曜
                                                            wk_naiyo[2] = wk_naiyo[2] + value2.week_naiyo;
                                                            sampleData2[0].data_wed = wk_naiyo[2];
                                                            sampleData2[0].data_wed2 = wk_naiyo[2];
                                                            break;
                                                        case 4: //木曜
                                                            wk_naiyo[3] = wk_naiyo[3] + value2.week_naiyo;
                                                            sampleData2[0].data_thu = wk_naiyo[3];
                                                            sampleData2[0].data_thu2 = wk_naiyo[3];
                                                            break;
                                                        case 5: //金曜
                                                            wk_naiyo[4] = wk_naiyo[4] + value2.week_naiyo;
                                                            sampleData2[0].data_fri = wk_naiyo[4];
                                                            sampleData2[0].data_fri2 = wk_naiyo[4];
                                                            break;
                                                        case 6: //土曜
                                                            wk_naiyo[5] = wk_naiyo[5] + value2.week_naiyo;
                                                            sampleData2[0].data_sat = wk_naiyo[5];
                                                            sampleData2[0].data_sat2 = wk_naiyo[5];
                                                            break;
                                                        case 7: //日曜
                                                            wk_naiyo[6] = wk_naiyo[6] + value2.week_naiyo;
                                                            sampleData2[0].data_sun = wk_naiyo[6];
                                                            sampleData2[0].data_sun2 = wk_naiyo[6];
                                                            break;
                                                    }
                                                }
                                            }
                                            else {
                                                if (value2.week_naiyo.trim() != "") //内容あり
                                                {
                                                    //午後
                                                    switch (value2.week_weekkbn) {
                                                        case 1: //月曜
                                                            wk_naiyo[0] = wk_naiyo[0] + value2.week_naiyo;
                                                            sampleData2[1].data_mon = wk_naiyo[0];
                                                            sampleData2[1].data_mon2 = wk_naiyo[0];
                                                            break;
                                                        case 2: //火曜
                                                            wk_naiyo[1] = wk_naiyo[1] + value2.week_naiyo;
                                                            sampleData2[1].data_tue = wk_naiyo[1];
                                                            sampleData2[1].data_tue2 = wk_naiyo[1];
                                                            break;
                                                        case 3: //水曜
                                                            wk_naiyo[2] = wk_naiyo[2] + value2.week_naiyo;
                                                            sampleData2[1].data_wed = wk_naiyo[2];
                                                            sampleData2[1].data_wed2 = wk_naiyo[2];
                                                            break;
                                                        case 4: //木曜
                                                            wk_naiyo[3] = wk_naiyo[3] + value2.week_naiyo;
                                                            sampleData2[1].data_thu = wk_naiyo[3];
                                                            sampleData2[1].data_thu2 = wk_naiyo[3];
                                                            break;
                                                        case 5: //金曜
                                                            wk_naiyo[4] = wk_naiyo[4] + value2.week_naiyo;
                                                            sampleData2[1].data_fri = wk_naiyo[4];
                                                            sampleData2[1].data_fri2 = wk_naiyo[4];
                                                            break;
                                                        case 6: //土曜
                                                            wk_naiyo[5] = wk_naiyo[5] + value2.week_naiyo;
                                                            sampleData2[1].data_sat = wk_naiyo[5];
                                                            sampleData2[1].data_sat2 = wk_naiyo[5];
                                                            break;
                                                        case 7: //日曜
                                                            wk_naiyo[6] = wk_naiyo[6] + value2.week_naiyo;
                                                            sampleData2[1].data_sun = wk_naiyo[6];
                                                            sampleData2[1].data_sun2 = wk_naiyo[6];
                                                            break;
                                                    }
                                                }
                                            }

                                        }
                                    }
                                    else if (value2.naiyo_kbn == 1) {
                                        //備考
                                        if (value2.biko_kbn == 6) {
                                            //DAY備考
                                            datatok_day.push(value2.biko_naiyo);
                                            tokflg_day = true;
                                        }
                                        else {
                                            //Week備考
                                            datatok_week.push(value2.biko_naiyo);
                                            tokflg_week = true;
                                        }
                                    }

                                });
                        }
                    });

                    //データ格納
                    //本人
                    sampleData[0].data_0500_am = wk_list[0].naiyo
                    sampleData[0].data_0500_pm = wk_list[1].naiyo
                    sampleData[0].data_0600_am = wk_list[2].naiyo
                    sampleData[0].data_0600_pm = wk_list[3].naiyo
                    sampleData[0].data_0700_am = wk_list[4].naiyo
                    sampleData[0].data_0700_pm = wk_list[5].naiyo
                    sampleData[0].data_0800_am = wk_list[6].naiyo
                    sampleData[0].data_0800_pm = wk_list[7].naiyo
                    sampleData[0].data_0900_am = wk_list[8].naiyo
                    sampleData[0].data_0900_pm = wk_list[9].naiyo
                    sampleData[0].data_1000_am = wk_list[10].naiyo
                    sampleData[0].data_1000_pm = wk_list[11].naiyo
                    sampleData[0].data_1100_am = wk_list[12].naiyo
                    sampleData[0].data_1100_pm = wk_list[13].naiyo
                    sampleData[0].data_1200_am = wk_list[14].naiyo
                    sampleData[0].data_1200_pm = wk_list[15].naiyo
                    sampleData[0].data_1300_am = wk_list[16].naiyo
                    sampleData[0].data_1300_pm = wk_list[17].naiyo
                    sampleData[0].data_1400_am = wk_list[18].naiyo
                    sampleData[0].data_1400_pm = wk_list[19].naiyo
                    sampleData[0].data_1500_am = wk_list[20].naiyo
                    sampleData[0].data_1500_pm = wk_list[21].naiyo
                    sampleData[0].data_1600_am = wk_list[22].naiyo
                    sampleData[0].data_1600_pm = wk_list[23].naiyo
                    sampleData[0].data_1700_am = wk_list[24].naiyo
                    sampleData[0].data_1700_pm = wk_list[25].naiyo
                    sampleData[0].data_1800_am = wk_list[26].naiyo
                    sampleData[0].data_1800_pm = wk_list[27].naiyo
                    sampleData[0].data_1900_am = wk_list[28].naiyo
                    sampleData[0].data_1900_pm = wk_list[29].naiyo
                    sampleData[0].data_2000_am = wk_list[30].naiyo
                    sampleData[0].data_2000_pm = wk_list[31].naiyo
                    sampleData[0].data_2100_am = wk_list[32].naiyo
                    sampleData[0].data_2100_pm = wk_list[33].naiyo
                    sampleData[0].data_2200_am = wk_list[34].naiyo
                    sampleData[0].data_2200_pm = wk_list[35].naiyo
                    sampleData[0].data_2300_am = wk_list[36].naiyo
                    sampleData[0].data_2300_pm = wk_list[37].naiyo
                    sampleData[0].data_2400_am = wk_list[38].naiyo
                    sampleData[0].data_2400_pm = wk_list[39].naiyo

                    //空行
                    if (wk_list[0].naiyo != "") { sampleData[0].data_0500_am2 = wk_list[0].naiyo }
                    if (wk_list[1].naiyo != "") { sampleData[0].data_0500_pm2 = wk_list[1].naiyo }
                    if (wk_list[2].naiyo != "") { sampleData[0].data_0600_am2 = wk_list[2].naiyo }
                    if (wk_list[3].naiyo != "") { sampleData[0].data_0600_pm2 = wk_list[3].naiyo }
                    if (wk_list[4].naiyo != "") { sampleData[0].data_0700_am2 = wk_list[4].naiyo }
                    if (wk_list[5].naiyo != "") { sampleData[0].data_0700_pm2 = wk_list[5].naiyo }
                    if (wk_list[6].naiyo != "") { sampleData[0].data_0800_am2 = wk_list[6].naiyo }
                    if (wk_list[7].naiyo != "") { sampleData[0].data_0800_pm2 = wk_list[7].naiyo }
                    if (wk_list[8].naiyo != "") { sampleData[0].data_0900_am2 = wk_list[8].naiyo }
                    if (wk_list[9].naiyo != "") { sampleData[0].data_0900_pm2 = wk_list[9].naiyo }
                    if (wk_list[10].naiyo != "") { sampleData[0].data_1000_am2 = wk_list[10].naiyo }
                    if (wk_list[11].naiyo != "") { sampleData[0].data_1000_pm2 = wk_list[11].naiyo }
                    if (wk_list[12].naiyo != "") { sampleData[0].data_1100_am2 = wk_list[12].naiyo }
                    if (wk_list[13].naiyo != "") { sampleData[0].data_1100_pm2 = wk_list[13].naiyo }
                    if (wk_list[14].naiyo != "") { sampleData[0].data_1200_am2 = wk_list[14].naiyo }
                    if (wk_list[15].naiyo != "") { sampleData[0].data_1200_pm2 = wk_list[15].naiyo }
                    if (wk_list[16].naiyo != "") { sampleData[0].data_1300_am2 = wk_list[16].naiyo }
                    if (wk_list[17].naiyo != "") { sampleData[0].data_1300_pm2 = wk_list[17].naiyo }
                    if (wk_list[18].naiyo != "") { sampleData[0].data_1400_am2 = wk_list[18].naiyo }
                    if (wk_list[19].naiyo != "") { sampleData[0].data_1400_pm2 = wk_list[19].naiyo }
                    if (wk_list[20].naiyo != "") { sampleData[0].data_1500_am2 = wk_list[20].naiyo }
                    if (wk_list[21].naiyo != "") { sampleData[0].data_1500_pm2 = wk_list[21].naiyo }
                    if (wk_list[22].naiyo != "") { sampleData[0].data_1600_am2 = wk_list[22].naiyo }
                    if (wk_list[23].naiyo != "") { sampleData[0].data_1600_pm2 = wk_list[23].naiyo }
                    if (wk_list[24].naiyo != "") { sampleData[0].data_1700_am2 = wk_list[24].naiyo }
                    if (wk_list[25].naiyo != "") { sampleData[0].data_1700_pm2 = wk_list[25].naiyo }
                    if (wk_list[26].naiyo != "") { sampleData[0].data_1800_am2 = wk_list[26].naiyo }
                    if (wk_list[27].naiyo != "") { sampleData[0].data_1800_pm2 = wk_list[27].naiyo }
                    if (wk_list[28].naiyo != "") { sampleData[0].data_1900_am2 = wk_list[28].naiyo }
                    if (wk_list[29].naiyo != "") { sampleData[0].data_1900_pm2 = wk_list[29].naiyo }
                    if (wk_list[30].naiyo != "") { sampleData[0].data_2000_am2 = wk_list[30].naiyo }
                    if (wk_list[31].naiyo != "") { sampleData[0].data_2000_pm2 = wk_list[31].naiyo }
                    if (wk_list[32].naiyo != "") { sampleData[0].data_2100_am2 = wk_list[32].naiyo }
                    if (wk_list[33].naiyo != "") { sampleData[0].data_2100_pm2 = wk_list[33].naiyo }
                    if (wk_list[34].naiyo != "") { sampleData[0].data_2200_am2 = wk_list[34].naiyo }
                    if (wk_list[35].naiyo != "") { sampleData[0].data_2200_pm2 = wk_list[35].naiyo }
                    if (wk_list[36].naiyo != "") { sampleData[0].data_2300_am2 = wk_list[36].naiyo }
                    if (wk_list[37].naiyo != "") { sampleData[0].data_2300_pm2 = wk_list[37].naiyo }
                    if (wk_list[38].naiyo != "") { sampleData[0].data_2400_am2 = wk_list[38].naiyo }
                    if (wk_list[39].naiyo != "") { sampleData[0].data_2400_pm2 = wk_list[39].naiyo }

                    //介護者
                    sampleData[1].data_0500_am = wk_list2[0].naiyo
                    sampleData[1].data_0500_pm = wk_list2[1].naiyo
                    sampleData[1].data_0600_am = wk_list2[2].naiyo
                    sampleData[1].data_0600_pm = wk_list2[3].naiyo
                    sampleData[1].data_0700_am = wk_list2[4].naiyo
                    sampleData[1].data_0700_pm = wk_list2[5].naiyo
                    sampleData[1].data_0800_am = wk_list2[6].naiyo
                    sampleData[1].data_0800_pm = wk_list2[7].naiyo
                    sampleData[1].data_0900_am = wk_list2[8].naiyo
                    sampleData[1].data_0900_pm = wk_list2[9].naiyo
                    sampleData[1].data_1000_am = wk_list2[10].naiyo
                    sampleData[1].data_1000_pm = wk_list2[11].naiyo
                    sampleData[1].data_1100_am = wk_list2[12].naiyo
                    sampleData[1].data_1100_pm = wk_list2[13].naiyo
                    sampleData[1].data_1200_am = wk_list2[14].naiyo
                    sampleData[1].data_1200_pm = wk_list2[15].naiyo
                    sampleData[1].data_1300_am = wk_list2[16].naiyo
                    sampleData[1].data_1300_pm = wk_list2[17].naiyo
                    sampleData[1].data_1400_am = wk_list2[18].naiyo
                    sampleData[1].data_1400_pm = wk_list2[19].naiyo
                    sampleData[1].data_1500_am = wk_list2[20].naiyo
                    sampleData[1].data_1500_pm = wk_list2[21].naiyo
                    sampleData[1].data_1600_am = wk_list2[22].naiyo
                    sampleData[1].data_1600_pm = wk_list2[23].naiyo
                    sampleData[1].data_1700_am = wk_list2[24].naiyo
                    sampleData[1].data_1700_pm = wk_list2[25].naiyo
                    sampleData[1].data_1800_am = wk_list2[26].naiyo
                    sampleData[1].data_1800_pm = wk_list2[27].naiyo
                    sampleData[1].data_1900_am = wk_list2[28].naiyo
                    sampleData[1].data_1900_pm = wk_list2[29].naiyo
                    sampleData[1].data_2000_am = wk_list2[30].naiyo
                    sampleData[1].data_2000_pm = wk_list2[31].naiyo
                    sampleData[1].data_2100_am = wk_list2[32].naiyo
                    sampleData[1].data_2100_pm = wk_list2[33].naiyo
                    sampleData[1].data_2200_am = wk_list2[34].naiyo
                    sampleData[1].data_2200_pm = wk_list2[35].naiyo
                    sampleData[1].data_2300_am = wk_list2[36].naiyo
                    sampleData[1].data_2300_pm = wk_list2[37].naiyo
                    sampleData[1].data_2400_am = wk_list2[38].naiyo
                    sampleData[1].data_2400_pm = wk_list2[39].naiyo

                    if (wk_list2[0].naiyo != "") { sampleData[1].data_0500_am2 = wk_list2[0].naiyo }
                    if (wk_list2[1].naiyo != "") { sampleData[1].data_0500_pm2 = wk_list2[1].naiyo }
                    if (wk_list2[2].naiyo != "") { sampleData[1].data_0600_am2 = wk_list2[2].naiyo }
                    if (wk_list2[3].naiyo != "") { sampleData[1].data_0600_pm2 = wk_list2[3].naiyo }
                    if (wk_list2[4].naiyo != "") { sampleData[1].data_0700_am2 = wk_list2[4].naiyo }
                    if (wk_list2[5].naiyo != "") { sampleData[1].data_0700_pm2 = wk_list2[5].naiyo }
                    if (wk_list2[6].naiyo != "") { sampleData[1].data_0800_am2 = wk_list2[6].naiyo }
                    if (wk_list2[7].naiyo != "") { sampleData[1].data_0800_pm2 = wk_list2[7].naiyo }
                    if (wk_list2[8].naiyo != "") { sampleData[1].data_0900_am2 = wk_list2[8].naiyo }
                    if (wk_list2[9].naiyo != "") { sampleData[1].data_0900_pm2 = wk_list2[9].naiyo }
                    if (wk_list2[10].naiyo != "") { sampleData[1].data_1000_am2 = wk_list2[10].naiyo }
                    if (wk_list2[11].naiyo != "") { sampleData[1].data_1000_pm2 = wk_list2[11].naiyo }
                    if (wk_list2[12].naiyo != "") { sampleData[1].data_1100_am2 = wk_list2[12].naiyo }
                    if (wk_list2[13].naiyo != "") { sampleData[1].data_1100_pm2 = wk_list2[13].naiyo }
                    if (wk_list2[14].naiyo != "") { sampleData[1].data_1200_am2 = wk_list2[14].naiyo }
                    if (wk_list2[15].naiyo != "") { sampleData[1].data_1200_pm2 = wk_list2[15].naiyo }
                    if (wk_list2[16].naiyo != "") { sampleData[1].data_1300_am2 = wk_list2[16].naiyo }
                    if (wk_list2[17].naiyo != "") { sampleData[1].data_1300_pm2 = wk_list2[17].naiyo }
                    if (wk_list2[18].naiyo != "") { sampleData[1].data_1400_am2 = wk_list2[18].naiyo }
                    if (wk_list2[19].naiyo != "") { sampleData[1].data_1400_pm2 = wk_list2[19].naiyo }
                    if (wk_list2[20].naiyo != "") { sampleData[1].data_1500_am2 = wk_list2[20].naiyo }
                    if (wk_list2[21].naiyo != "") { sampleData[1].data_1500_pm2 = wk_list2[21].naiyo }
                    if (wk_list2[22].naiyo != "") { sampleData[1].data_1600_am2 = wk_list2[22].naiyo }
                    if (wk_list2[23].naiyo != "") { sampleData[1].data_1600_pm2 = wk_list2[23].naiyo }
                    if (wk_list2[24].naiyo != "") { sampleData[1].data_1700_am2 = wk_list2[24].naiyo }
                    if (wk_list2[25].naiyo != "") { sampleData[1].data_1700_pm2 = wk_list2[25].naiyo }
                    if (wk_list2[26].naiyo != "") { sampleData[1].data_1800_am2 = wk_list2[26].naiyo }
                    if (wk_list2[27].naiyo != "") { sampleData[1].data_1800_pm2 = wk_list2[27].naiyo }
                    if (wk_list2[28].naiyo != "") { sampleData[1].data_1900_am2 = wk_list2[28].naiyo }
                    if (wk_list2[29].naiyo != "") { sampleData[1].data_1900_pm2 = wk_list2[29].naiyo }
                    if (wk_list2[30].naiyo != "") { sampleData[1].data_2000_am2 = wk_list2[30].naiyo }
                    if (wk_list2[31].naiyo != "") { sampleData[1].data_2000_pm2 = wk_list2[31].naiyo }
                    if (wk_list2[32].naiyo != "") { sampleData[1].data_2100_am2 = wk_list2[32].naiyo }
                    if (wk_list2[33].naiyo != "") { sampleData[1].data_2100_pm2 = wk_list2[33].naiyo }
                    if (wk_list2[34].naiyo != "") { sampleData[1].data_2200_am2 = wk_list2[34].naiyo }
                    if (wk_list2[35].naiyo != "") { sampleData[1].data_2200_pm2 = wk_list2[35].naiyo }
                    if (wk_list2[36].naiyo != "") { sampleData[1].data_2300_am2 = wk_list2[36].naiyo }
                    if (wk_list2[37].naiyo != "") { sampleData[1].data_2300_pm2 = wk_list2[37].naiyo }
                    if (wk_list2[38].naiyo != "") { sampleData[1].data_2400_am2 = wk_list2[38].naiyo }
                    if (wk_list2[39].naiyo != "") { sampleData[1].data_2400_pm2 = wk_list2[39].naiyo }

                    this.str_ymd = wk_Ymd;
                    this.pmymd = this.str_ymd;
                    this.pmymd_moto = this.str_ymd;

                    this.viewdata_day = sampleData.concat();            //DAY
                    this.viewdata_week = sampleData2.concat();  //WEEK


                    //備考欄
                    this.tokflg_day = tokflg_day;
                    if (tokflg_day == true) {
                        this.disptok_day = "";
                        for (let i = 0; i < datatok_day.length; i++) {
                            this.disptok_day = this.disptok_day + datatok_day[i];
                        }
                    }
                    else {
                        this.disptok_day = "";
                    }
                    this.tokflg_week = tokflg_week;
                    if (tokflg_week == true) {
                        this.disptok_week = "";
                        for (let i = 0; i < datatok_week.length; i++) {
                            this.disptok_week = this.disptok_week + datatok_week[i];
                        }
                    }
                    else {
                        this.disptok_week = "";
                    }

                    //フッターラベル
                    let lbl_ymd = wk_day_insymd;
                    let lbl_time = wk_day_instime;
                    let lbl_siname = wk_day_siname;

                    if (wk_day_insymd < wk_week_insymd) {
                        lbl_ymd = wk_week_insymd;
                        lbl_time = wk_week_instime;
                        lbl_siname = wk_week_siname;
                    }
                    


                    let footer = "(最終登録日 : ";
                    footer = footer + lbl_ymd.substring(0, 4)
                        + "年" + lbl_ymd.substring(4, 6)
                        + "月" + lbl_ymd.substring(6)
                        + "日 ";
                    footer = footer + lbl_time + " ";
                    footer = footer + lbl_siname + ")";
                    document.getElementById("footer_009").innerHTML = wjCore.escapeHtml(footer);

                    /*
                    data.sort(function(a,b){
                      if(a.seikatu_no < b.seikatu_no) return -1;
                      if(b.seikatu_no < a.seikatu_no) return 1;
                    });
                    this.viewdata = data.concat();
                            */
                }

            }
            , onItemsSourceChanged_day(flex) {
                flex.beginUpdate();
                flex.selection = new wjGrid.CellRange(-1, -1, -1, -1);
                for (let i = 0; i < flex.rows.length; i++) {
                    flex.rows[i].allowMerging = true;
                }
                flex.endUpdate();
            }

            , onItemsSourceChanged_week(flex) {
                flex.selection = new wjGrid.CellRange(-1, -1, -1, -1);
                for (let i = 0; i < flex.rows.length; i++) {
                    flex.rows[i].allowMerging = true;
                }
                flex.endUpdate();
            }

            //####データ登録####
            , onClickIns() {
                //履歴更新ボタン
                this.insflg = false;
                this.Message_Dialog("データを登録します。\nよろしいですか。", 5);
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

            , wk_listset: function (kbn) {
                let wk_data = [];
                let wk_list = [];

                //一度ワークに格納
                wk_data = { time: "05:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "05:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "06:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "06:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "07:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "07:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "08:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "08:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "09:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "09:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "10:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "10:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "11:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "11:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "12:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "12:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "13:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "13:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "14:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "14:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "15:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "15:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "16:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "16:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "17:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "17:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "18:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "18:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "19:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "19:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "20:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "20:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "21:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "21:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "22:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "22:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "23:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "23:30", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "24:00", naiyo: "" }; wk_list.push(wk_data);
                wk_data = { time: "24:30", naiyo: "" }; wk_list.push(wk_data);

                if (kbn == 1) {
                    //本人
                    wk_list[0].naiyo = this.viewdata_day[0].data_0500_am
                    wk_list[1].naiyo = this.viewdata_day[0].data_0500_pm
                    wk_list[2].naiyo = this.viewdata_day[0].data_0600_am
                    wk_list[3].naiyo = this.viewdata_day[0].data_0600_pm
                    wk_list[4].naiyo = this.viewdata_day[0].data_0700_am
                    wk_list[5].naiyo = this.viewdata_day[0].data_0700_pm
                    wk_list[6].naiyo = this.viewdata_day[0].data_0800_am
                    wk_list[7].naiyo = this.viewdata_day[0].data_0800_pm
                    wk_list[8].naiyo = this.viewdata_day[0].data_0900_am
                    wk_list[9].naiyo = this.viewdata_day[0].data_0900_pm
                    wk_list[10].naiyo = this.viewdata_day[0].data_1000_am
                    wk_list[11].naiyo = this.viewdata_day[0].data_1000_pm
                    wk_list[12].naiyo = this.viewdata_day[0].data_1100_am
                    wk_list[13].naiyo = this.viewdata_day[0].data_1100_pm
                    wk_list[14].naiyo = this.viewdata_day[0].data_1200_am
                    wk_list[15].naiyo = this.viewdata_day[0].data_1200_pm
                    wk_list[16].naiyo = this.viewdata_day[0].data_1300_am
                    wk_list[17].naiyo = this.viewdata_day[0].data_1300_pm
                    wk_list[18].naiyo = this.viewdata_day[0].data_1400_am
                    wk_list[19].naiyo = this.viewdata_day[0].data_1400_pm
                    wk_list[20].naiyo = this.viewdata_day[0].data_1500_am
                    wk_list[21].naiyo = this.viewdata_day[0].data_1500_pm
                    wk_list[22].naiyo = this.viewdata_day[0].data_1600_am
                    wk_list[23].naiyo = this.viewdata_day[0].data_1600_pm
                    wk_list[24].naiyo = this.viewdata_day[0].data_1700_am
                    wk_list[25].naiyo = this.viewdata_day[0].data_1700_pm
                    wk_list[26].naiyo = this.viewdata_day[0].data_1800_am
                    wk_list[27].naiyo = this.viewdata_day[0].data_1800_pm
                    wk_list[28].naiyo = this.viewdata_day[0].data_1900_am
                    wk_list[29].naiyo = this.viewdata_day[0].data_1900_pm
                    wk_list[30].naiyo = this.viewdata_day[0].data_2000_am
                    wk_list[31].naiyo = this.viewdata_day[0].data_2000_pm
                    wk_list[32].naiyo = this.viewdata_day[0].data_2100_am
                    wk_list[33].naiyo = this.viewdata_day[0].data_2100_pm
                    wk_list[34].naiyo = this.viewdata_day[0].data_2200_am
                    wk_list[35].naiyo = this.viewdata_day[0].data_2200_pm
                    wk_list[36].naiyo = this.viewdata_day[0].data_2300_am
                    wk_list[37].naiyo = this.viewdata_day[0].data_2300_pm
                    wk_list[38].naiyo = this.viewdata_day[0].data_2400_am
                    wk_list[39].naiyo = this.viewdata_day[0].data_2400_pm
                }
                else {
                    wk_list[0].naiyo = this.viewdata_day[1].data_0500_am
                    wk_list[1].naiyo = this.viewdata_day[1].data_0500_pm
                    wk_list[2].naiyo = this.viewdata_day[1].data_0600_am
                    wk_list[3].naiyo = this.viewdata_day[1].data_0600_pm
                    wk_list[4].naiyo = this.viewdata_day[1].data_0700_am
                    wk_list[5].naiyo = this.viewdata_day[1].data_0700_pm
                    wk_list[6].naiyo = this.viewdata_day[1].data_0800_am
                    wk_list[7].naiyo = this.viewdata_day[1].data_0800_pm
                    wk_list[8].naiyo = this.viewdata_day[1].data_0900_am
                    wk_list[9].naiyo = this.viewdata_day[1].data_0900_pm
                    wk_list[10].naiyo = this.viewdata_day[1].data_1000_am
                    wk_list[11].naiyo = this.viewdata_day[1].data_1000_pm
                    wk_list[12].naiyo = this.viewdata_day[1].data_1100_am
                    wk_list[13].naiyo = this.viewdata_day[1].data_1100_pm
                    wk_list[14].naiyo = this.viewdata_day[1].data_1200_am
                    wk_list[15].naiyo = this.viewdata_day[1].data_1200_pm
                    wk_list[16].naiyo = this.viewdata_day[1].data_1300_am
                    wk_list[17].naiyo = this.viewdata_day[1].data_1300_pm
                    wk_list[18].naiyo = this.viewdata_day[1].data_1400_am
                    wk_list[19].naiyo = this.viewdata_day[1].data_1400_pm
                    wk_list[20].naiyo = this.viewdata_day[1].data_1500_am
                    wk_list[21].naiyo = this.viewdata_day[1].data_1500_pm
                    wk_list[22].naiyo = this.viewdata_day[1].data_1600_am
                    wk_list[23].naiyo = this.viewdata_day[1].data_1600_pm
                    wk_list[24].naiyo = this.viewdata_day[1].data_1700_am
                    wk_list[25].naiyo = this.viewdata_day[1].data_1700_pm
                    wk_list[26].naiyo = this.viewdata_day[1].data_1800_am
                    wk_list[27].naiyo = this.viewdata_day[1].data_1800_pm
                    wk_list[28].naiyo = this.viewdata_day[1].data_1900_am
                    wk_list[29].naiyo = this.viewdata_day[1].data_1900_pm
                    wk_list[30].naiyo = this.viewdata_day[1].data_2000_am
                    wk_list[31].naiyo = this.viewdata_day[1].data_2000_pm
                    wk_list[32].naiyo = this.viewdata_day[1].data_2100_am
                    wk_list[33].naiyo = this.viewdata_day[1].data_2100_pm
                    wk_list[34].naiyo = this.viewdata_day[1].data_2200_am
                    wk_list[35].naiyo = this.viewdata_day[1].data_2200_pm
                    wk_list[36].naiyo = this.viewdata_day[1].data_2300_am
                    wk_list[37].naiyo = this.viewdata_day[1].data_2300_pm
                    wk_list[38].naiyo = this.viewdata_day[1].data_2400_am
                    wk_list[39].naiyo = this.viewdata_day[1].data_2400_pm
                }

                return wk_list;

            }


            , Clickins_data(kbn) {
                //kbn = 1:リロードしない
                //#####ヘッダの更新処理
                this.insflg = false;
                if (this.pmymd != this.pmymd_moto) {
                    this.Head_insData(1);
                }

                //変数
                let _self = this;
                let params = [];
                let params_day = [];
                let params_del_day = [];
                let params_week = [];
                let params_del_week = [];

                let putdata_day = [];   //一日登録データ
                let putdata_week = [];  //週間登録データ

                let putdata_biko = [];
                let wk_putdata = [];
                let data_siid = this.login_siid;
                let data_insymd = dayjs().format('YYYYMMDD');
                let data_instime = dayjs().format('HH:mm');

                //##### dayデータ登録 #####

                //登録処理
                //データ取得
                let day_inslist_hon = this.wk_listset(1);
                let day_inslist_kai = this.wk_listset(2);

                let wk_data = [];
                wk_data = { stime: "", etime: "", naiyo: "", kbn: 1 };
                let wk_list = [];

                for (let i = 0; i < day_inslist_hon.length; i++) {
                    if (day_inslist_hon[i].naiyo != wk_data.naiyo && wk_data.stime != "" && wk_data.etime == "") {
                        //内容がある場合
                        wk_data.etime = day_inslist_hon[i].time;
                        wk_list.push(wk_data);
                        wk_data = { stime: "", etime: "", naiyo: "", kbn: 1 };
                    }
                    if (day_inslist_hon[i].naiyo != "" && wk_data.stime == "") {
                        //内容がある場合
                        wk_data.naiyo = day_inslist_hon[i].naiyo;
                        wk_data.stime = day_inslist_hon[i].time;
                    }
                }

                wk_data = { stime: "", etime: "", naiyo: "", kbn: 2 };
                for (let i = 0; i < day_inslist_kai.length; i++) {
                    if (day_inslist_kai[i].naiyo != wk_data.naiyo && wk_data.stime != "" && wk_data.etime == "") {
                        //内容がある場合
                        wk_data.etime = day_inslist_kai[i].time;
                        wk_list.push(wk_data);
                        wk_data = { stime: "", etime: "", naiyo: "", kbn: 2 };
                    }
                    if (day_inslist_kai[i].naiyo != "" && wk_data.stime == "") {
                        //内容がある場合
                        wk_data.naiyo = day_inslist_kai[i].naiyo;
                        wk_data.stime = day_inslist_kai[i].time;
                    }
                }

                for (let k = 0; k < wk_list.length; k++)   //特記の行数
                {
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
                        Day_id: 0,
                        Day_kbn: wk_list[k].kbn,
                        Day_stime: wk_list[k].stime,
                        Day_etime: wk_list[k].etime,
                        Day_naiyo: wk_list[k].naiyo,
                        week_id: 0,
                        week_kbn: 0,
                        week_weekkbn: 0,
                        week_datlcnt: 0,
                        week_naiyo: " ",
                        biko_lcnt: 0,
                        biko_naiyo: " "
                    }
                    putdata_day.push(wk_putdata);

                }

                //一日データ登録
                if (putdata_day.length > 0) {
                    //一度削除
                    params_del_day = {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: this.kotei_kbn,
                        intcode: this.intcode
                    }

                    let deldata_day =
                    {
                        jigyoid: this.jigyoid,
                        dataid: this.pdataid,
                        id: 0,
                        lcnt: 1,
                        headflg: sysConst_kotei.DEL_KBN_ALL,
                    }

                    //削除処理
                    deleteConnect('/Koteiinf_HONNIN', params_del_day, 'KOTEIINF', deldata_day).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;

                        params_day = {
                            uniqid: this.uniqid,
                            traceid: this.traceid,
                            kbn: this.kotei_kbn,
                            intcode: this.intcode,
                            insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
                        }

                        postConnect('/Koteiinf_HONNIN', params_day, 'KOTEIINF', putdata_day).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata = result;
                        });
                    });

                }

                //##### Weekデータ登録 #####


                let week_kbn = 0; //区分
                let week_week = 0; //曜日区分
                let wk_tok_week = [];  //特記事項

                for (let i = 0; i < 2; i++) {
                    if (i == 0) {
                        week_kbn = 1;   //午前
                    }
                    else {
                        week_kbn = 2;   //午後
                    }

                    for (let j = 1; j < 8; j++)   //1～7の一週間
                    {
                        week_week = j

                        switch (week_week) {
                            case 1: //月曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_mon, 50);
                                break;
                            case 2: //火曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_tue, 50);
                                break;
                            case 3: //水曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_wed, 50);
                                break;
                            case 4: //木曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_thu, 50);
                                break;
                            case 5: //金曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_fri, 50);
                                break;
                            case 6: //土曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_sat, 50);
                                break;
                            case 7: //日曜
                                wk_tok_week = this.splitNaiyo(this.viewdata_week[i].data_sun, 50);
                                break;

                        }

                        for (let k = 0; k < wk_tok_week.length; k++)   //特記の行数
                        {
                            wk_putdata =
                            {
                                data_siid: data_siid,
                                data_insymd: data_insymd,
                                data_instime: data_instime,
                                head_jigyoid: this.jigyoid,
                                head_intcode: this.intcode,
                                head_kbn: 7,
                                head_dataid: this.pdataid,
                                head_mstid: 0,
                                head_mymd: " ",
                                head_siid: 0,
                                head_delflg: 0,

                                Day_id: 0,
                                Day_kbn: 0,
                                Day_stime: " ",
                                Day_etime: " ",
                                Day_naiyo: " ",
                                week_id: 0,
                                week_kbn: week_kbn,
                                week_weekkbn: week_week,
                                week_datlcnt: k + 1,
                                week_naiyo: wk_tok_week[k],
                                biko_lcnt: 0,
                                biko_naiyo: " "
                            }
                            putdata_week.push(wk_putdata);

                        }
                    }
                }


                if (putdata_week.length > 0) {
                    //一度削除
                    params_del_week = {
                        uniqid: this.uniqid,
                        traceid: this.traceid,
                        kbn: 7,
                        intcode: this.intcode
                    }

                    let deldata =
                    {
                        jigyoid: this.jigyoid,
                        dataid: this.pdataid,
                        id: 0,
                        lcnt: 1,
                        headflg: sysConst_kotei.DEL_KBN_ALL,
                    }

                    //削除処理
                    deleteConnect('/Koteiinf_HONNIN', params_del_week, 'KOTEIINF', deldata).then((result) => {
                        _self.griddata = result.icrn_inf;
                        _self.gridSeldata = result;
                        //登録処理
                        params_week = {
                            uniqid: this.uniqid,
                            traceid: this.traceid,
                            kbn: 7,
                            intcode: this.intcode,
                            insflg: sysConst_kotei.INS_KBN_NAIYO, //内容登録
                        }

                        //週間データ登録
                        postConnect('/Koteiinf_HONNIN', params_week, 'KOTEIINF', putdata_week).then((result) => {
                            _self.griddata = result.icrn_inf;
                            _self.gridSeldata = result;
                        });
                    });

                }

                //DAY 備考データ
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn,
                    intcode: this.intcode,
                    insflg: sysConst_kotei.INS_KBN_BIKO, //備考登録
                }


                let wk_naiyo_day = this.splitNaiyo(this.disptok_day, 50);    //DAY

                //備考
                if (wk_naiyo_day.length > 0) {
                    for (let i = 0; i < wk_naiyo_day.length; i++) {
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
                            seikatu_ymdkoro: 0,
                            seikatu_lcnt: 0,
                            seikatu_naiyo: 0,
                            kiou_id: 0,
                            kiou_no: 0,
                            kiou_ymdflg: 0,
                            kiou_ymd: " ",
                            kiou_syobyocode: 0,
                            kiou_gensyo: 0,
                            kiou_naiyo: "",
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
                            biko_naiyo: wk_naiyo_day[i]
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
                        seikatu_ymdkoro: 0,
                        seikatu_lcnt: 0,
                        seikatu_naiyo: 0,
                        kiou_id: 0,
                        kiou_no: 0,
                        kiou_ymdflg: 0,
                        kiou_ymd: " ",
                        kiou_syobyocode: 0,
                        kiou_gensyo: 0,
                        kiou_naiyo: "",
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

                putdata_biko = [];

                //一週間の備考
                //WEEK 備考データ
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: 7,
                    intcode: this.intcode,
                    insflg: sysConst_kotei.INS_KBN_BIKO, //備考登録
                }

                let wk_naiyo_week = this.splitNaiyo(this.disptok_week, 50);  //WEEK

                //備考
                if (wk_naiyo_week.length > 0) {
                    for (let i = 0; i < wk_naiyo_week.length; i++) {
                        wk_putdata =
                        {
                            head_jigyoid: this.jigyoid,
                            head_intcode: this.intcode,
                            head_kbn: 7,
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
                            seikatu_ymdkoro: 0,
                            seikatu_lcnt: 0,
                            seikatu_naiyo: 0,
                            kiou_id: 0,
                            kiou_no: 0,
                            kiou_ymdflg: 0,
                            kiou_ymd: " ",
                            kiou_syobyocode: 0,
                            kiou_gensyo: 0,
                            kiou_naiyo: "",
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
                            biko_naiyo: wk_naiyo_week[i]
                        }
                        putdata_biko.push(wk_putdata);

                    }
                }
                else {
                    wk_putdata =
                    {
                        head_jigyoid: this.jigyoid,
                        head_intcode: this.intcode,
                        head_kbn: 7,
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
                        seikatu_ymdkoro: 0,
                        seikatu_lcnt: 0,
                        seikatu_naiyo: 0,
                        kiou_id: 0,
                        kiou_no: 0,
                        kiou_ymdflg: 0,
                        kiou_ymd: " ",
                        kiou_syobyocode: 0,
                        kiou_gensyo: 0,
                        kiou_naiyo: "",
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
                        this.Message_Dialog(sysConst.MSG_DATA_INS, 0);
                    });
                }
            }


            //####クリアボタン####
            , onClickclr() {
                this.disptok_day = "";
                this.disptok_week = "";
            }

            //####データ削除####
            , onClickdel_reki() {
                //履歴削除ボタン
                this.Message_Dialog("データを削除します。\nよろしいですか。", 3);
            }

            , del_rekidata() {
                //履歴削除ボタン
                //API取得
                let _self = this;
                let params = [];

                //####1週間データを先に削除####
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: 7,
                    intcode: this.intcode
                }

                let deldata =
                {
                    jigyoid: this.jigyoid,
                    dataid: this.pdataid,
                    id: 0,
                    lcnt: 1,
                    headflg: sysConst_kotei.DEL_KBN_ALL,
                }

                //削除処理
                deleteConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                });

                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: 7,
                    intcode: this.intcode
                }

                deldata =
                {
                    jigyoid: this.jigyoid,
                    dataid: this.pdataid,
                    id: 0,
                    lcnt: 1,
                    headflg: sysConst_kotei.DEL_KBN_BIKO,
                }

                //削除処理
                deleteConnect('/Koteiinf_HONNIN', params, 'KOTEIINF', deldata).then((result) => {
                    _self.griddata = result.icrn_inf;
                    _self.gridSeldata = result;
                });


                //####履歴削除####
                params = {
                    uniqid: this.uniqid,
                    traceid: this.traceid,
                    kbn: this.kotei_kbn,
                    intcode: this.intcode
                }

                deldata =
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

            //####ドラッグ関係####
            , win_drag_day: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("day_win_id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            }

            , win_move_day: function (e) {
                //ドラッグ            
                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("day_win_id");
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
            win_up_day: function () {
                //ドラッグ
                this.Dragflg = false;
            }
            , win_drag: function (e) {
                //ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("head_win_009id");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 110) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 255) / 2 + "px";

                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            }

            , win_move: function (e) {
                //ドラッグ            
                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("head_win_009id");
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
            win_drag_Msg: function (e) {
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
            win_move_Msg: function (e) {
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
            win_up_Msg: function () {
                //ドラッグ
                this.Dragflg = false;
            },
            win_drag_reki: function (e) {
                //履歴参照ドラッグ
                this.Dragflg = true;
                this.mouseX = e.screenX;
                this.mouseY = e.screenY;
                var wdialog = document.getElementById("rireki_id009");
                if (wdialog.style.bottom == "") wdialog.style.bottom = (window.innerHeight - 210) / 2 + "px";
                if (wdialog.style.right == "") wdialog.style.right = (window.innerWidth - 280) / 2 + "px";
                this.screenY = parseInt(wdialog.style.bottom.replace("px", ""));
                this.screenX = parseInt(wdialog.style.right.replace("px", ""));
            },
            win_move_reki: function (e) {
                //履歴参照ドラッグ

                if (this.Dragflg == true && e.offsetX > 0 && e.offsetY > 0) {
                    var wdialog = document.getElementById("rireki_id009");
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
            click_headindkbn(kbn) {
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
.clssheet-chu009 {
    border-radius: 10px 10px 10px 10px;
    padding: 5px 5px;
    margin-top: 5px;
    margin-left: 5px;
    width: 955px;
    height: 760px;

    position: relative
}

/*タイトル*/
.clsstitle009-001 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4CCB81;
    color: #ffffff;
    width: 200px;
    text-align: center;
}

/*タイトルエリア*/
.area009-001 {
    display: inline-flex;
    width: 470px;
    height: 25px;
}

/*右上ボタンエリア*/
.area009-002 {
    display: inline-flex;
    margin-left: 228px;
    width: 10px;
    height: 25px;
}

/*一日の流れエリア*/
.area009-003 {
    display: inline-flex;
    margin-top: 20px;
    width: 945px;
    height: 30px;
}

.clsstitle009-003 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4681cf;
    color: #ffffff;
    width: 955px;
    height: 30;
    text-align: left;
}

/*特記事項エリア*/
.area009-005 {
    display: inline-flex;
    width: 950px;
    height: 100px;
}

/*特記事項タイトル*/
.clsstitle009-004 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 0px;
    height: 100px;
    width: 90px;
    line-height: 100px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

/*特記事項テキスト*/
.clssinp009-001 {
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

/*グリッド*/
.Gridicrn009-001 {
    margin-top: 10px;
    width: 940px;
    height: 167px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

/*グリッドヘッダ*/
.column-header009 {
    font-size: medium;
    font-weight: normal !important;
    text-align: center;
    background-color: #dffae0 !important;
    border-color: #8ffd7a !important;
}

/*週間生活エリア*/
.area009-006 {
    display: inline-flex;
    margin-top: 20px;
    width: 945px;
    height: 30px;
}


.rowinf009 {
    background-color: #dffae0 !important;
    border-color: #8ffd7a !important;
}

.clsstitle009-005 {
    border-radius: 5px 5px 5px 5px;
    background-color: #4681cf;
    color: #ffffff;
    width: 955px;
    height: 30;
    text-align: left;
}

/*グリッド*/
.Gridicrn009-002 {
    margin-top: 10px;
    width: 940px;
    height: 167px;
    border: 1px solid;
    grid-row: auto;
    border-color: #8ffd7a !important;
}

/*特記事項エリア*/
.area009-008 {
    display: inline-flex;
    width: 950px;
    height: 100px;
}

/*特記事項タイトル*/
.clsstitle009-006 {
    background-color: #dffae0;
    font-size: 16px;
    margin-left: 0px;
    margin-top: 0px;
    height: 100px;
    width: 90px;
    line-height: 100px;
    text-align: center;
    border: 1px solid;
    border-color: #8ffd7a;
}

/*特記事項テキスト*/
.clssinp009-002 {
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
.area009-009 {
    display: inline-flex;
    width: 950px;
    height: 25px;
    margin-top: 20px;
}

/*クリアボタン*/
.clsbtnmenu009-clr {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*削除ボタン*/
.clsbtnmenu009-del {
    margin-top: 0px;
    margin-left: 2px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

/*登録ボタン*/
.clsbtnmenu009-ins {
    margin-top: 0px;
    margin-left: 180px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}

//履歴無しラベル1
.clsstitle1_Noreki_back009 {
    border-radius: 10px 10px 10px 10px;
    bottom: 0px;
    left: 0px;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.55);
    height: 760px;
    width: 955px;
    line-height: 760;
    text-align: center;
}

//履歴無しラベル2
.clsstitle1_Noreki009 {
    border-radius: 10px 10px 10px 10px;
    bottom: 360px;
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

#Gridicrn009-id {

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
        height: 30px;
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
        padding: 18px;
    }

}

#Gridicrn009-id2 {

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


//DAY入力win

//シート
.clssheet-head_daywin {
    border-radius: 10px 10px 10px 10px;
    padding: 0px 0px;
    margin-top: 0px !important;
    margin-left: 0px !important;
    width: 435px;
    height: 140px;
    display: inline-flex;

}

.day_area001 {
    display: inline-flex;
    width: 430px;
    height: 30px;

    /*
        border: 1px solid;
        border-color: #7e7e7e;
        */
}

.clsstitlehead_daywin {
    border-radius: 5px 5px 5px 5px;
    background-color: #282cf0;
    color: #ffffff;
    margin-left: 0px;
    width: 400px;
    text-align: center;
}

.day_lbl001 {
    font-size: 16px !important;
    margin-left: 5px;
    height: 30px;
    width: 120px;
    line-height: 30px;
    text-align: center;
    background-color: #caf2f5;
    border: 1px solid #7ad8fd;
}

.day_texttime {
    margin-left: 10px !important;
    width: 35px;
    margin-top: 5px;
}

.day_textsca {
    margin-left: 3px;
    width: 170px;
}

.clsbtnmenuday-ins {
    margin-top: 0px;
    margin-left: 360px;
    height: 25px !important;
    background-color: #ffffff !important;
    color: #0081eb !important;
    border: thin solid #a5a5a5;
}
</style>