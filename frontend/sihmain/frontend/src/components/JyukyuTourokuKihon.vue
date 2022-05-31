<template>
  <div id="JyukyuTourokuKihon">
    <v-container fluid class="kihon-container">
      <v-row no-gutters class="kihon-header-row">
        <v-card elevation="0" class="kihon-header d-flex flex-row" flat tile>
          <label class="kihon-header-title">受給者証基本情報</label>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-koufuymd-row">
        <v-card elevation="0" class="kihon-title-length5 d-flex flex-row" flat tile>
          交付年月日
        </v-card>
        <p class="required">*</p>	
        <v-card elevation="0" class="kihon-koufuymd-picker d-flex flex-row">
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="koufuymd"
            v-model="koufuymd"
            placeholder="日付を選択"
          ></datepicker>
        </v-card>
        <v-card elevation="0" class="pl-1 d-flex flex-row">
          <a
            class="kihon-copy-button"
            @click="openDialog_Term('copy_last')"
            >前回コピー
          </a>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-kubun-row">
        <v-card elevation="0" class="kihon-title-length2 d-flex flex-row" flat tile>
          区分
        </v-card>
        <v-card elevation="0" class="kihon-kubun-selection d-flex flex-row" flat tile>
          <v-radio-group row v-model="kihonkubun" class="kihon-kubun-group">
            <v-radio label="通常" :key="1" :value="1"></v-radio>
            <v-radio label="暫定" :key="0" :value="0"></v-radio>
          </v-radio-group>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-jyukyusyabangou-row">
        <v-card elevation="0" class="kihon-title-length5 d-flex flex-row" flat tile>
          受給者番号
        </v-card>
        <p class="required">*</p>	
        <v-card elevation="0" class="kihon-jyukyusyabangou-input d-flex flex-row">
          <wj-combo-box
            class="kihon-jyukyusyabangou-input2"
            :textChanged="onTextChanged"
            placeholder="番号を入力"
          ></wj-combo-box>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-sityosonbangou-row">
        <v-card elevation="0" class="kihon-title-length5 d-flex flex-row" flat tile>
          市町村番号
        </v-card>
        <p class="required">*</p>	
        <v-card elevation="0" class="kihon-sityosonbangou-input d-flex flex-row">
          <wj-combo-box
            class="kihon-sityosonbangou-input2"
            :textChanged="onTextChanged"
            placeholder="番号を入力"
          ></wj-combo-box>
        </v-card>
        <v-card class="kihon-sityosonbangou-disp" outlined>
          {{ sityosonname }}
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-syogaisyubetu-row d-flex flex-row">
        <v-card elevation="0" class="kihon-title-length4 d-flex flex-row" flat tile>
          障害種別
        </v-card>
        <v-card elevation="0" class="kihon-syogaisyubetu-selection d-flex flex-row" flat tile>
          <v-checkbox
            v-for="(item) of syogaisyubetu"
            class="item-button"
            :key="item.id"
            :label="item.id + '.' + item.name"
            >
          </v-checkbox>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-jyukyusyakubun-row">
        <v-card elevation="0" class="kihon-title-length5 d-flex flex-row" flat tile>
          受給者区分
        </v-card>
        <v-card elevation="0" class="kihon-jyukyusyakubun-selection d-flex flex-row">
          <v-checkbox
            class="item-button"
            label="障害児"
            >
          </v-checkbox>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-sikyuketteisya-row">
        <v-card elevation="0" class="kihon-title-length5 d-flex flex-row" flat tile>
          支給決定者
        </v-card>
        <v-card elevation="0" class="kihon-sikyuketteisya-disp1" outlined>
          {{ sikyuketteisya1 }}
        </v-card>
        <v-card elevation="0" class="kihon-sikyuketteisya-disp2" outlined>
          {{ sikyuketteisya2 }}
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-button-row">
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
export default {
  data() {
    return {
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      sityosonname: '',
      syogaisyubetu: [
        { id: 1, name: "身体障害者" },
        { id: 2, name: "知的障害者" },
        { id: 3, name: "精神障害者" },
        { id: 4, name: "難病等対象者" },
      ],
      sikyuketteisya1: '',
      sikyuketteisya2: '',
    };
  },
  components: {
    Datepicker,
  },
  methods: {
  },
};

</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuTourokuKihon {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
  height: calc(29px * 9);
  .kihon-container {
    padding: 0px !important;
  }
  .kihon-header-row {
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    .kihon-header {
      width: 100%;
      height: 100%;
      background-color:#1f7872;
    }
    .kihon-header-title {
      height: 25px;
      padding: 2px 0px 0px 8px;
      color: white;
    }
  }

  .kihon-title-length2 {
    width: 100px;
    padding: 2px 0px 0px 36px;
    background-color: #cee2e1;
    color: black;
    text-align: center;
  }

  .kihon-title-length4 {
    width: 100px;
    padding: 2px 0px 0px 20px;
    background-color: #cee2e1;
    color: black;
    text-align: center;
  }

  .kihon-title-length5 {
    width: 100px;
    padding: 2px 0px 0px 14px;
    background-color: #cee2e1;
    color: black;
    text-align: center;
  }

  .kihon-koufuymd-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative;/*相対配置*/
    .kihon-koufuymd-picker {
      padding: 0px 0px 0px 4px;
    }
  }
  .kihon-kubun-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .kihon-kubun-selection {
      height: 100%;
      padding-left: 0px;
      .kihon-kubun-group {
        width: 200px;
        margin-top: 0px;
        margin-left: -20px;
        padding-top: 0px;
        transform: scale(0.75);
      }
    }
  }
  .kihon-jyukyusyabangou-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative;/*相対配置*/
    .kihon-jyukyusyabangou-input {
      height: 100%;
    }
    .kihon-jyukyusyabangou-input2 {
      width: 200px;
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
  }
  .kihon-sityosonbangou-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative;/*相対配置*/
    .kihon-sityosonbangou-input {
      height: 100%;
    }
    .kihon-sityosonbangou-input2 {
      width: 100px;
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
    .kihon-sityosonbangou-disp {
      width: 200px;
      margin-left: 4px;
      font-size: 12px;
      background-color:lightyellow;
      border-radius: 2px;
      text-align: left;
      padding: 2px 0px 0px 4px;
    }
  }
  .kihon-syogaisyubetu-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .kihon-syogaisyubetu-selection {
      height: 100%;
      margin-left: 8px;
      padding-left: 4px;
      .item-button {
        margin-top: -3px;
        margin-left: -25px;
        transform: scale(0.75);
      }
    }
  }
  .kihon-jyukyusyakubun-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .kihon-jyukyusyakubun-selection {
      height: 100%;
      width: 100px;
      margin-left: 4px;
      padding-left: 0px;
      .item-button {
        margin-top: -3px;
        margin-left: -11px;
        transform: scale(0.75);
      }
    }
  }
  .kihon-sikyuketteisya-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    .kihon-sikyuketteisya-disp1 {
      width: 100px;
      margin-left: 4px;
      font-size: 12px;
      background-color: #e6e6e6;
      border-radius: 2px;
      text-align: left;
      padding: 2px 0px 0px 4px;
    }
    .kihon-sikyuketteisya-disp2 {
      width: 200px;
      margin-left: 4px;
      font-size: 12px;
      background-color: #e6e6e6;
      border-radius: 2px;
      text-align: left;
      padding: 2px 0px 0px 4px;
    }
  }
  .kihon-button-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
  }
}

// 前回コピーボタン
a {
  &.kihon-copy-button {
    height: 25px;
    width: 100px;
    background-color: $white;
    border: 1px solid $font_color;
    display: block;
    float: left;
    color: $font_color !important;
    text-align: left;
    border-radius: 3px;
    padding: 2px 0px 0px 18px;
    margin-top: 0px;
    cursor: pointer;
    background-image: url('../assets/copy_gray_15px.png');
    background-position: top 4px left 1px;
    &:hover {
      background-color: $selected_color;
    }
  }
}
</style>