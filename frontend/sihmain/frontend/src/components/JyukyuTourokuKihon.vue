<template>
  <div id="JyukyuTourokuKihon" :style="mainHeight">
    <v-container fluid class="kihon-container">
      <v-row no-gutters class="kihon-header-row">
        <v-card elevation="0" class="kihon-header d-flex flex-row" flat tile>
          <label class="kihon-header-title">受給者証基本情報</label>
          <v-card
            v-if="$_subGridSelected()"
            elevation="0"
            class="kihon-header d-flex flex-row-reverse"
            flat
            tile
          >
            <v-btn
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
            >
              修正</v-btn
            >
          </v-card>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-kofuymd-row">
        <v-card
          elevation="0"
          class="kihon-title-length5 d-flex flex-row"
          flat
          tile
        >
          交付年月日
        </v-card>
        <p class="required">*</p>
        <v-card elevation="0" class="kihon-kofuymd-picker d-flex flex-row">
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="kofuymd"
            v-model="kofuymd"
            placeholder="日付を選択"
          ></datepicker>
        </v-card>
        <v-card elevation="0" class="pl-1 d-flex flex-row">
          <v-btn
            class="kihon-copy-button"
            @click="openDialog_Term('copy_last')"
          >
            前回コピー</v-btn
          >
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-kubun-row">
        <v-card
          elevation="0"
          class="kihon-title-length2 d-flex flex-row"
          flat
          tile
        >
          区分
        </v-card>
        <v-card
          elevation="0"
          class="kihon-kubun-selection d-flex flex-row"
          flat
          tile
        >
          <v-radio-group row v-model="jyukyukubun" class="kihon-kubun-group">
            <v-radio label="通常" :key="0" :value="0"></v-radio>
            <v-radio label="暫定" :key="1" :value="1"></v-radio>
          </v-radio-group>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-jyukyusyabangou-row">
        <v-card
          elevation="0"
          class="kihon-title-length5 d-flex flex-row"
          flat
          tile
        >
          受給者番号
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="kihon-jyukyusyabangou-input d-flex flex-row"
        >
          <wj-combo-box
            class="kihon-jyukyusyabangou-input2"
            :textChanged="onTextChanged"
            placeholder="番号を入力"
            :text="jyukyuno"
          ></wj-combo-box>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-shichosonbangou-row">
        <v-card
          elevation="0"
          class="kihon-title-length5 d-flex flex-row"
          flat
          tile
        >
          市町村番号
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="kihon-shichosonbangou-input d-flex flex-row"
        >
          <wj-combo-box
            class="kihon-shichosonbangou-input2"
            :textChanged="onTextChanged"
            :gotFocus="onGotFocus"
            placeholder="番号を入力"
            :text="shichosonno"
          ></wj-combo-box>
        </v-card>
        <v-card class="kihon-shichosonbangou-disp" outlined>
          {{ shichosonname }}
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-syogaisyubetu-row d-flex flex-row">
        <v-card
          elevation="0"
          class="kihon-title-length4 d-flex flex-row"
          flat
          tile
        >
          障害種別
        </v-card>
        <v-card
          elevation="0"
          class="kihon-syogaisyubetu-selection d-flex flex-row"
          flat
          tile
        >
          <v-checkbox
            v-for="item of syogaisyubetu"
            class="item-button"
            :key="item.id"
            :label="item.id + '.' + item.name"
            v-model="syogaisyubetuValues[item.id - 1]"
          >
          </v-checkbox>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-jyukyusyakubun-row">
        <v-card
          elevation="0"
          class="kihon-title-length5 d-flex flex-row"
          flat
          tile
        >
          受給者区分
        </v-card>
        <v-card
          elevation="0"
          class="kihon-jyukyusyakubun-selection d-flex flex-row"
        >
          <v-checkbox
            class="item-button"
            label="障害児"
            v-model="syogaiji"
            @change="ckbChanged"
          >
          </v-checkbox>
        </v-card>
      </v-row>
      <v-row no-gutters class="kihon-sikyuketteisya-row">
        <v-card
          elevation="0"
          class="kihon-title-length5 d-flex flex-row"
          flat
          tile
        >
          支給決定者
        </v-card>
        <v-card elevation="0" class="kihon-sikyuketteisya-disp1" outlined>
          {{ sikyuketteisya1 }}
        </v-card>
        <v-card elevation="0" class="kihon-sikyuketteisya-disp2" outlined>
          {{ sikyuketteisya2 }}
        </v-card>
      </v-row>
      <v-row v-if="$_mode() === 'modKihon'" no-gutters class="kihon-button-row">
        <v-btn class="cancel-button" @click="openDialog_Term('regist')">
          キャンセル</v-btn
        >
        <v-card
          elevation="0"
          class="kihon-bottom-regist d-flex flex-row-reverse"
          flat
          tile
        >
          <v-btn class="regist-button" @click="openDialog_Term('regist')">
            登 録</v-btn
          >
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import '@grapecity/wijmo.vue2.core';

export default {
  props: {
    riyosya: String,
  },
  data() {
    return {
      ja: ja,
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),

      syogaisyubetu: [
        { id: 1, name: '身体障害者' },
        { id: 2, name: '知的障害者' },
        { id: 3, name: '精神障害者' },
        { id: 4, name: '難病等対象者' },
      ],

      kofuymd: '',
      jyukyukubun: -1,
      jyukyuno: '',
      shichosonno: '',
      shichosonname: '',
      syogaisyubetuValues: [],
      syogaiji: 0,
      sikyuketteisya1: '',
      sikyuketteisya2: '',
    };
  },
  watch: {
    riyosya() {
      let data = this.$_kihonData();
      this.kofuymd = moment(data[0].kofuymd).format('YYYY-M-D');
      this.jyukyukubun = data[0].zantei;
      this.jyukyuno = data[0].jyukyuno;
      this.shichosonno = data[0].shichosonno;
      this.shichosonname = data[0].shichosonname;
      this.syogaisyubetuValues[0] = data[0].ssyu1;
      this.syogaisyubetuValues[1] = data[0].ssyu2;
      this.syogaisyubetuValues[2] = data[0].ssyu3;
      this.syogaisyubetuValues[3] = data[0].ssyu4;
      this.syogaiji = data[0].jidoid > 0 ? 1 : 0;
      this.sikyuketteisya1 = data[0].dcodDisp;
      this.sikyuketteisya2 = data[0].jyukyuname;
    },
  },
  components: {
    Datepicker,
  },
  mounted() {
    this.Resize();
  },
  methods: {
    Resize() {
      let height = '';
      if (this.$_mode() === 'new') {
        height = 'calc((29px * 8))';
      } else {
        height = 'calc((29px * 9) + 4px)';
      }
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.$_setMode('modKihon');
      this.Resize();
    },
    onTextChanged() {},
    onGotFocus(txb) {
      this.$_setHojoMode('shichoson');
    },
    ckbChanged(chb) {
      this.$_setHojoMode('kazoku');
      // if (chb) {
      //   this.$_setHojoMode('kazoku');
      // } else {
      //   this.$_setHojoMode('none');
      // }
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuTourokuKihon {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
  .kihon-container {
    padding: 0px !important;
  }
  .kihon-header-row {
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    .kihon-header {
      width: 100%;
      height: 25px;
      background-color: #1f7872;
    }
    .kihon-header-title {
      width: 200px;
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

  .kihon-kofuymd-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .kihon-kofuymd-picker {
      padding: 0px 0px 0px 4px;
    }
    .kihon-copy-button {
      height: 25px;
      width: 100px;
      padding: 2px 0px 0px 15px;
      border: 1px solid $light-gray;
      background-image: url('../assets/copy_gray_15px.png');
      background-position: top 4px left 1px;
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
    position: relative; /*相対配置*/
    .kihon-jyukyusyabangou-input {
      height: 100%;
    }
    .kihon-jyukyusyabangou-input2 {
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
    .kihon-jyukyusyabangou-input2.wj-control .wj-input {
      width: 200px;
    }
  }
  .kihon-shichosonbangou-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .kihon-shichosonbangou-input {
      height: 100%;
    }
    .kihon-shichosonbangou-input2 {
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
    .kihon-shichosonbangou-input2.wj-control .wj-input {
      width: 100px;
    }
    .kihon-shichosonbangou-disp {
      width: 200px;
      margin-left: 4px;
      font-size: 12px;
      background-color: lightyellow;
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
    .cancel-button {
      height: 25px;
      width: 100px;
      text-align: center;
      margin-top: 2px;
      border-radius: 3px;
      border: 1px solid $light-gray;
    }
    .kihon-bottom-regist {
      width: calc(100% - 100px);
      float: right;
      .regist-button {
        height: 25px;
        width: 100px;
        color: $white;
        background-color: #027eb0;
        text-align: center;
        margin-top: 2px;
        border-radius: 3px;
        &:hover {
          background-color: #005f85;
        }
      }
    }
  }
}
</style>