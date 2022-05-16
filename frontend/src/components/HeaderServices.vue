<template>
  <v-layout>
    <v-flex md12 class="basic-info" style="position: relative; z-index: 5">
      <div class="service-selection-area">
        <label>サービス</label>
        <v-btn
          elevation="0"
          outlined
          tile
          disabled
          height="30"
          class="service"
          color="red"
          >{{ jigyosyoCode }}</v-btn
        >
        <v-btn @click="comboClick()" tile outlined height="30" class="service"
          >{{ selectButton }}
          <div class="float-right">▼</div></v-btn
        >
      </div>
      <div class="month-selection-area">
        <label>提供月</label>
        <v-btn
          @click="inputCalendarClick('teikyo')"
          tile
          outlined
          class="service"
          height="30"
          >{{ year }}年{{ month }}月
          <div class="float-right">
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-btn>

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
        <span style="margin-left: 30px" v-if="seikyuflag">
          <label>請求月</label>
          <v-btn
            class="pa-1 service"
            :width="160"
            @click="inputCalendarClick('seikyu')"
            tile
            outlined
            height="30"
            >{{ seikyu_year }}年{{ seikyu_month }}月
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>

          <v-btn
            elevation="0"
            color="white"
            class="pa-0 ml-1"
            x-small
            @click="calendarClick(3)"
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
            @click="calendarClick(4)"
            tile
            ><v-icon>mdi-arrow-right-bold</v-icon></v-btn
          >
        </span>

        <v-btn class="pa-1 ml-3" :width="60" small @click="searchButton()">
          検索
        </v-btn>
      </div>

      <v-row
        no-gutters
        style="position: absolute; top: 25%; right: 10px; width: 200px"
        class="mt-n3"
      >
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
        persistent
        no-click-animation
      >
        <v-card class="pa-2">
          <v-container>
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
    <v-row id="screen_dialog" v-show="screenFlag">
      <v-col> 検索ボタンを押してください。 </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import ls from '@/utiles/localStorage';
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
      year: moment().year(),
      month: moment().format('MM'),
      seikyu_year: moment().add('month', 1).startOf('month').format('YYYY'),
      seikyu_month: moment().add('month', 1).startOf('month').format('MM'),
      picker: '',
      header_dialog: true,
      datepicker_dialog: false,
      defaultSetting: this.defaultSettings(),
      returndata: '', // 検索ボタンを押下時に選択値を渡す変数
      screenFlag: false, // 検索ボタン押下前にデータエリアにスクリーンを行う
      storage: {},
    };
  },
  created: function () {
    let storage = {};
    try {
      storage = {
        jimusyoBango: ls.getlocalStorageEncript('jimusyoBango'),
        serviceJigyo: ls.getlocalStorageEncript('serviceJigyo'),
        teikyoService: ls.getlocalStorageEncript('teikyoService'),
        selectRow: ls.getlocalStorageEncript('selectRow'),
      };
      this.storage = storage;
    } catch (e) {
      console.log(e);
    }
    //strageにデータが登録してある時
    if (storage.selectRow) {
      this.header_dialog = false;

      let defaultdata = [];
      for (let i = 0; i <= this.jimusyo.length; i++) {
        if (i == ls.getlocalStorageEncript('selectRow')) {
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
        jimusyoBango: this.jimusyo[storage.selectRow].jimusyoBango,
        serviceJigyo: this.jimusyo[storage.selectRow].serviceJigyo,
        teikyoCode: this.jimusyo[storage.selectRow].teikyoCode,
        teikyoService: this.jimusyo[storage.selectRow].teikyoService,
      };
      this.returndata = returns;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
    });
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
        defaultFlag: false,
      });
      data.push({
        jimusyoBango: '111200030',
        serviceJigyo: '知的障害者入所施設 東経園',
        teikyoCode: 34,
        teikyoService: '34 宿泊型自立訓練',
        defaultFlag: false,
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
      //初期選択状態を解除
      grid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      let _self = this;
      //初期選択状態
      //grid.select(this.select, 1);
      grid.hostElement.addEventListener('click', function (e) {
        var ht = grid.hitTest(e);
        ht = grid.hitTest(e.pageX, e.pageY);
        //サービスの文字表示
        _self.jigyosyoCode = _self.jimusyo[ht.row].jimusyoBango;
        _self.jigyosyoCode += ' ' + _self.jimusyo[ht.row].serviceJigyo;
        _self.selectButton = _self.jimusyo[ht.row].teikyoService;
        ls.setlocalStorageEncript(
          'jimusyoBango',
          _self.jimusyo[ht.row].jimusyoBango
        );
        ls.setlocalStorageEncript(
          'serviceJigyo',
          _self.jimusyo[ht.row].serviceJigyo
        );
        ls.setlocalStorageEncript(
          'teikyoService',
          _self.jimusyo[ht.row].teikyoService
        );
        ls.setlocalStorageEncript('selectRow', ht.row);
        let returns = {};
        returns = {
          jimusyoBango: _self.jimusyo[ht.row].jimusyoBango,
          serviceJigyo: _self.jimusyo[ht.row].serviceJigyo,
          teikyoCode: _self.jimusyo[ht.row].teikyoCode,
          teikyoService: _self.jimusyo[ht.row].teikyoService,
        };
        returns['seikyu_year'] = _self.seikyu_year;
        returns['seikyu_month'] = _self.seikyu_month;
        returns['teikyo_year'] = _self.year;
        returns['teikyo_month'] = _self.month;
        returns['search_button'] = false;
        _self.returndata = returns;
        _self.$emit('parent-service-change', returns);
        _self.screenFlag = true;
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
    defaultSettings: function () {
      this.createJimusyo();
      this.jigyosyoCode = '事業者コード・提供サービスを選択してください。';
      this.selectButton = '';
    },
    /**************
     * 検索ボタンを押下
     */
    searchButton: function () {
      this.screenFlag = false;
      this.returndata['seikyu_year'] = this.seikyu_year;
      this.returndata['seikyu_month'] = this.seikyu_month;
      this.returndata['teikyo_year'] = this.year;
      this.returndata['teikyo_month'] = this.month;
      this.returndata['search_button'] = true;
      this.$emit('parent-service-select', this.returndata);
    },
    /**************
     * 月の選択 ダイアログの日付を押下
     */
    monthSelect: function () {
      let split = this.picker.split('-');
      if (this.dialog_type == 'teikyo') {
        this.year = split[0];
        this.month = split[1];
        this.calendarClick(0);
      }
      if (this.dialog_type == 'seikyu') {
        this.seikyu_year = split[0];
        this.seikyu_month = split[1];
        this.calendarClick(3);
      }
      // this.$emit('parent-calendar', split);

      this.datepicker_dialog = false;
    },
    //カレンダーボタンの日付遷移
    // 提供月 1:前月 2:翌月
    // 請求月 3:前月 4:翌月
    calendarClick: function (type) {
      let date = this.year + this.month + '01';
      let seikyu_date = this.seikyu_year + this.seikyu_month + '01';
      if (type == 3) {
        //請求月を「←（前月）」「→（翌月）」で変更した場合は、提供月も自動で請求月の前月表示
        this.seikyu_year = moment(seikyu_date)
          .subtract(1, 'months')
          .format('YYYY');
        this.seikyu_month = moment(seikyu_date)
          .subtract(1, 'months')
          .format('MM');
        seikyu_date = this.seikyu_year + '-' + this.seikyu_month + '-01';
        this.year = moment(seikyu_date).subtract(1, 'months').format('YYYY');
        this.month = moment(seikyu_date).subtract(1, 'months').format('MM');
      } else if (type == 4) {
        //請求月を「←（前月）」「→（翌月）」で変更した場合は、提供月も自動で請求月の前月表示
        this.seikyu_year = moment(seikyu_date).add(1, 'months').format('YYYY');
        this.seikyu_month = moment(seikyu_date).add(1, 'months').format('MM');
        seikyu_date = this.seikyu_year + '-' + this.seikyu_month + '-01';

        this.year = moment(seikyu_date).add(-1, 'months').format('YYYY');
        this.month = moment(seikyu_date).add(-1, 'months').format('MM');
      } else if (type == 1) {
        this.year = moment(date).subtract(1, 'months').format('YYYY');
        this.month = moment(date).subtract(1, 'months').format('MM');
      } else if (type == 2) {
        this.year = moment(date).add(1, 'months').format('YYYY');
        this.month = moment(date).add(1, 'months').format('MM');
      }
      //請求月と提供月が同じになった場合
      if (this.year == this.seikyu_year && this.month == this.seikyu_month) {
        this.seikyu_year = moment(seikyu_date).add(1, 'months').format('YYYY');
        this.seikyu_month = moment(seikyu_date).add(1, 'months').format('MM');
      }
    },
    calenderChange: function (e) {
      let split = e.target.value.split('-');
      this.year = split[0];
      this.month = split[1];
      this.$emit('parent-calendar', split);
    },
    searchChange: function (e) {
      let value = e.text;
      this.$emit('parent-search', value);
    },
    /**提供サービスを押下 */
    comboClick: function () {
      this.header_dialog = true;
    },
    /**********
     * カレンダーdialogの表示
     */
    inputCalendarClick: function (dialog_type) {
      this.dialog_type = dialog_type;
      //提供月
      let picker = '';
      if (dialog_type == 'teikyo') picker = this.year + '-' + this.month;
      if (dialog_type == 'seikyu')
        picker = this.seikyu_year + '-' + this.seikyu_month;

      this.picker = picker;
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
#screen_dialog {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  width: 100%;
  height: 100%;
  z-index: 4;
  padding: 0;
  margin: 0;
}
.service {
  &.v-btn {
    border: 1px solid $light-gray;
    background-color: $white;
    &:nth-child(3) {
      border-left: none;
    }
    span {
      color: $font_color;
    }
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