<template>
  <v-layout>
    <v-flex md12 class="basic-info" style="position: relative">
      <div class="service-selection-area">
        <v-row no-gutters>
          <v-col md="1">
            <v-card class="pa-1 transparent" elevation="0">サービス</v-card>
          </v-col>
          <v-col md="3">
            <v-card class="pa-1" tile>{{ jigyosyoCode }}</v-card>
          </v-col>
          <v-col md="2">
            <v-card class="pa-1" v-on:click="comboClick()" tile
              >{{ selectButton }}
              <div class="float-right">▼</div></v-card
            >
          </v-col>
        </v-row>
      </div>
      <div class="month-selection-area">
        <v-row no-gutters>
          <v-col md="1">
            <v-card class="pa-1 transparent" elevation="0">提供月</v-card>
          </v-col>
          <v-col md="2">
            <v-card class="d-flex flex-row" color="transparent" elevation="0">
              <v-card class="transparent" tile>
                <v-card
                  class="pa-1"
                  :width="160"
                  @click="inputCalendarClick"
                  tile
                  >{{ year }}年{{ month }}月
                  <div class="float-right">
                    <v-icon small>mdi-calendar-month</v-icon>
                  </div>
                </v-card>
              </v-card>
              <v-btn
                elevation="0"
                color="white"
                class="pa-0 ml-1"
                x-small
                @click="calendarClick(1)"
                height="100%"
                style="min-width: auto; height: 30px"
                tile
                ><v-icon>mdi-arrow-left-bold</v-icon></v-btn
              >
              <v-btn
                x-small
                elevation="0"
                color="white"
                class="pa-0 ml-1"
                height="100%"
                style="min-width: auto; height: 30px"
                @click="calendarClick(2)"
                tile
                ><v-icon>mdi-arrow-right-bold</v-icon></v-btn
              >
            </v-card>
          </v-col>
          <v-col md="1" class="text-end">
            <v-card class="pa-1 transparent" elevation="0" v-if="seikyuflag"
              >請求月</v-card
            >
          </v-col>
          <v-col md="2" v-if="seikyuflag">
            <v-card class="pa-1" :width="160" @click="inputCalendarClick" tile
              >{{ year }}年{{ month }}月
              <div class="float-right">
                <v-icon small>mdi-calendar-month</v-icon>
              </div>
            </v-card>
          </v-col>

          <v-col md="2" v-if="searchButtonFlag">
            <v-btn class="pa-1" :width="60" small @click="searchButton()">
              検索
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-row
        no-gutters
        style="position: absolute; top: 25%; right: 10px; width: 450px"
        class="mt-n3"
      >
        <v-col cols="2*">
          <v-btn v-if="jyougengakuFlag"> 上限額管理計算 </v-btn>
        </v-col>
        <v-col cols="2*">
          <v-btn v-if="receptFlag"> レセプトへ反映 </v-btn>
        </v-col>
        <v-col class="ml-5 text-end" cols="1*">
          <v-btn
            v-if="registButtonFlag"
            color="cyan darken-3"
            class="white--text registButton"
            >登録</v-btn
          >
        </v-col>
        <v-col cols="1*" class="ml-1 text-end">
          <v-btn x-small @click="branzMaxim">最大化</v-btn><br />
          <v-btn x-small @click="branzMinmum">最大化解除</v-btn>
        </v-col>
      </v-row>
      <div class="alertTitle pa-1 white--text" v-if="alertMessageFlag">
        ※情報が変更されています。登録を行ってください※
      </div>
      <div class="transparent message text-caption">
        最終登録日:2021.08.08 13:36 (担当者:大正 雅夫)
      </div>
      <v-dialog
        v-model="header_dialog"
        width="600"
        content-class="header_dialogs"
      >
        <v-card class="pa-2">
          <v-container>
            <v-btn
              elevation="2"
              icon
              small
              absolute
              top
              right
              @click="header_dialog = false"
              class="closeButton"
              color="secondary"
              ><v-icon dark small> mdi-close </v-icon></v-btn
            >
            <wj-flex-grid
              :itemsSource="jimusyo"
              :headersVisibility="'Column'"
              :initialized="onInitializedJimusyo"
              :autoClipboard="false"
              :selectionMode="3"
              :selecte="-1"
              :isReadOnly="true"
              :allowDragging="false"
              :allowResizing="false"
              :deferResizing="false"
              :allowSorting="false"
            >
              <wj-flex-grid-column
                header="事務所番号"
                binding="jimusyoBango"
                width="2*"
                format="N0"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="サービス事業所名"
                binding="serviceJigyo"
                width="4*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="提供サービス名"
                binding="teikyoService"
                width="3*"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="datepicker_dialog"
        width="200"
        class="datepicker_dialogs"
      >
        <v-date-picker
          id="datepicker"
          type="month"
          v-model="picker"
          locale="jp-ja"
          :day-format="(date) => new Date(date).getDate()"
          @change="monthSelect"
        >
        </v-date-picker>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';

let year = moment().year();
let month = moment().format('MM');
export default {
  props: {
    seikyuflag: { type: Boolean },
    jyougengakuFlag: { type: Boolean },
    receptFlag: { type: Boolean },
    searchButtonFlag: { type: Boolean },
    registButtonFlag: { type: Boolean },
    alertMessageFlag: { type: Boolean },
  },

  data() {
    return {
      year: year,
      month: month,
      picker: '',
      header_dialog: false,
      datepicker_dialog: false,
      defaultSetting: this.defaultSettings(),
    };
  },
  methods: {
    createJimusyo: function () {
      let data = [];
      data.push({
        jimusyoBango: '11123404',
        serviceJigyo: '生活介護支援事務所 ひまわり園',
        teikyoCode: 21,
        teikyoService: '21 医療介護',
      });
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '生活介護支援事務所 ひまわり園',
        teikyoCode: 22,
        teikyoService: '22 生活介護',
      });
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '短期入所施設 ひまわり園',
        teikyoCode: 24,
        teikyoService: '24 短期入所',
      });
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '障害者入所施設 ひまわり園',
        teikyoCode: 32,
        teikyoService: '32 施設入所支援',
        defaultFlag: true,
      });
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '知的障害者入所施設 ひまわり園',
        teikyoCode: 33,
        teikyoService: '33 共同生活援助',
      });
      data.push({
        jimusyoBango: '111200030',
        serviceJigyo: '知的障害者入所施設 東経園',
        teikyoCode: 34,
        teikyoService: '34 宿泊型自立訓練',
      });
      data.push({
        jimusyoBango: '111200031',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 41,
        teikyoService: '41 自立訓練(機能訓練)',
      });
      data.push({
        jimusyoBango: '111200032',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 42,
        teikyoService: '42 自立訓練(生活訓練)',
      });
      data.push({
        jimusyoBango: '111200033',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 43,
        teikyoService: '43 就労移行支援',
      });
      data.push({
        jimusyoBango: '111200033',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 44,
        teikyoService: '44 就労移行支援',
      });
      data.push({
        jimusyoBango: '111200033',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 45,
        teikyoService: '45 就労継続支援A型',
      });
      data.push({
        jimusyoBango: '111200033',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 46,
        teikyoService: '46 就労継続支援B型',
      });
      data.push({
        jimusyoBango: '111200033',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 47,
        teikyoService: '47 就労定着支援',
      });
      data.push({
        jimusyoBango: '111200038',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoCode: 35,
        teikyoService: '35 自立生活援助',
      });

      //事業所番号が次のデータと同じ場合に非表示用のフラグを立てる
      let j = -1;
      for (let i = 0; i < data.length; i++) {
        if (data[j] && data[i].jimusyoBango == data[j].jimusyoBango) {
          data[i]['invisibleFlag'] = true;
        }
        j++;
      }
      this.jimusyo = data;
    },
    onInitializedJimusyo: function (grid) {
      //this.createJimusyo();

      let _self = this;
      grid.select(this.select, 1);
      grid.hostElement.addEventListener('click', function (e) {
        var ht = grid.hitTest(e);
        ht = grid.hitTest(e.pageX, e.pageY);
        _self.jigyosyoCode = _self.jimusyo[ht.row].jimusyoBango;
        _self.jigyosyoCode += ' ' + _self.jimusyo[ht.row].serviceJigyo;
        _self.selectButton = _self.jimusyo[ht.row].teikyoService;

        let returns = {};
        returns = {
          jimusyoBango: _self.jimusyo[ht.row].jimusyoBango,
          serviceJigyo: _self.jimusyo[ht.row].serviceJigyo,
          teikyoCode: _self.jimusyo[ht.row].teikyoCode,
          teikyoService: _self.jimusyo[ht.row].teikyoService,
        };
        _self.defaultSetting = returns;

        _self.header_dialog = false;
      });
      grid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (_self.jimusyo[r].invisibleFlag && c == 0) {
            cell.style.color = 'transparent';
          }
        }
      };
    },
    /********************
     * 検索ボタンを押下
     */
    searchButton: function () {
      let split = [];
      split[0] = this.year;
      split[1] = this.month;
      split['service'] = this.defaultSetting;
      this.$emit('parent-calendar', split);
    },
    defaultSettings: function () {
      this.createJimusyo();
      let defaultdata = [];
      for (let i = 0; i <= this.jimusyo.length; i++) {
        if (this.jimusyo[i]['defaultFlag']) {
          defaultdata = this.jimusyo[i];
          this.select = i;
          break;
        }
      }
      this.jigyosyoCode =
        defaultdata.jimusyoBango + ' ' + defaultdata.serviceJigyo;
      this.selectButton = defaultdata.teikyoService;
      let returns = {};
      returns = {
        jimusyoBango: defaultdata.jimusyoBango,
        serviceJigyo: defaultdata.serviceJigyo,
        teikyoCode: defaultdata.teikyoCode,
        teikyoService: defaultdata.teikyoService,
      };
      // todo消す予定
      this.$emit('parent-service-select', returns);
      return returns;
    },
    /*****************
     * datepickerから日付を選択
     */
    monthSelect: function () {
      let split = this.picker.split('-');
      this.year = split[0];
      this.month = split[1];
      this.datepicker_dialog = false;
    },
    //カレンダーボタンの日付遷移
    //1:前月 2:翌月
    calendarClick: function (type) {
      let date = this.year + this.month + '01';
      if (type == 1) {
        this.year = moment(date).subtract(1, 'months').format('YYYY');
        this.month = moment(date).subtract(1, 'months').format('MM');
      } else {
        this.year = moment(date).add(1, 'months').format('YYYY');
        this.month = moment(date).add(1, 'months').format('MM');
      }
    },
    /************
     * サービスを押下
     */
    comboClick: function () {
      this.header_dialog = true;
    },
    /**************
     * カレンダーを選択
     */
    inputCalendarClick: function () {
      this.datepicker_dialog = true;
    },
    branzMaxim: function () {
      document.body.requestFullscreen();
    },
    branzMinmum: function () {
      document.exitFullscreen();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
.header_dialogs {
  position: fixed !important;
  top: 0;
  font-size: 14px;
  .wj-control {
    color: $font-color;
  }
  .wj-cell {
    &.wj-state-multi-selected {
      background: $selected_color;
      color: $red;
    }
    &.wj-state-selected {
      background: $selected_color;
      color: $red;
    }
  }

  .closeButton {
    z-index: 100;
    top: 5px;
    right: 5px;
    background-color: $white;
  }
}
.v-picker {
  z-index: 10;
}
.v-picker__title {
  display: none !important;
}

.message {
  top: auto;
  right: 10px;
  bottom: 2px;
  border: 1px solid red;
  position: absolute;
  color: $font-color;
}

.alertTitle {
  font-size: $cell_fontsize;
  background-color: $red;
  color: $white;
  width: 320px;
  position: absolute;
  top: auto;
  left: 50%;
  right: 50%;
  bottom: 0;
  text-align: center;
  animation-name: fadeInAnime;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
}
@keyframes fadeInAnime {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

#datepicker {
  position: absolute;
  margin-top: 40px;
  position: fixed !important;
  top: 20px;
  left: 20px;
  width: auto;
}
.registButton {
  background-image: url('../assets/pen_20px.png');
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>