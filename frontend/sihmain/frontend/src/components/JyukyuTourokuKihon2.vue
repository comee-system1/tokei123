<template>
  <div id="JyukyuTourokuKihon2">
    <v-container fluid class="kihon-container">
      <v-row no-gutters class="kihon-header-row">
        <v-card
          elevation="0"
          id="kihonheader"
          class="kihon-header d-flex flex-row"
          flat
          tile
        >
          <label class="kihon-header-title">受給者証基本情報</label>
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
        <v-card elevation="0" class="kihon-kofuymd-picker d-flex flex-row ml-1">
          {{ kofuymd }}
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
          class="kihon-kubun-selection d-flex flex-row ml-2"
          flat
          tile
        >
          {{ jyukyukubun }}
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
          class="kihon-jyukyusyabangou-input d-flex flex-row ml-2"
        >
          {{ jyukyuno }}
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
          class="kihon-shichosonbangou-input d-flex flex-row ml-2"
        >
          {{ shichosonno + ' ' + shichosonname }}
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
            disabled
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
            disabled
          >
          </v-checkbox>
        </v-card>
      </v-row>
      <v-row v-if="syogaiji" no-gutters class="kihon-sikyuketteisya-row">
        <v-card
          elevation="0"
          class="kihon-title-length5 d-flex flex-row"
          flat
          tile
        >
          支給決定者
        </v-card>
        <v-card
          elevation="0"
          class="kihon-sikyuketteisya-input d-flex flex-row ml-2"
        >
          {{ sikyuketteisyano + ' ' + sikyuketteisya }}
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

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
export default {
  data() {
    return {
      ja: ja,
      mode: '',
      subGridSelected: false,
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

      isModify: false,
      selectedData: [],
      kofuymd: '',
      jyukyukubun: '',
      jyukyuno: '',
      shichosonno: '',
      shichosonname: '',
      syogaisyubetuValues: [],
      syogaiji: false,
      sikyuketteisyano: '',
      sikyuketteisya: '',
    };
  },
  components: {
    Datepicker,
  },
  mounted() {},
  methods: {
    changeMode() {
      return this.mode === 'modKihon';
    },
    onTextChanged() {},
    onGotFocusShichoson(txb) {
      this.$emit('setHojoMode', 'shichoson');
    },
    onGotFocusSikyuketteisya(txb) {
      this.$emit('setHojoMode', 'kazoku');
    },
    ckbChanged(chb) {
      if (chb) {
        this.$emit('setHojoMode', 'kazoku');
      } else {
        this.$emit('setHojoMode', 'none');
      }
    },
    cancel() {
      // this.setButtonColor('modifyButtonKihon', false);
      this.$emit('setMode', 'new');
      this.changeMode();
    },
    setButtonColor(id, on) {
      var targetbtn = document.getElementById(id);
      targetbtn.style.color = on ? '#fff' : 'black';
      targetbtn.style.backgroundColor = on ? '#444' : '#f5f5f5';
    },
    regist() {
      if (confirm('受給者証基本情報を修正登録します。\n\nよろしいですか？')) {
      }
    },
    createPutData() {
      let resutl = [];
      result.push({
        jyukyuid: element.jyukyuid,
        rysid: element.rysid,
        jkbn: element.jkbn,
        shichoson: element.shichoson,
        shichosonno: element.shichosonno,
        shichosonname: element.shichosonname,
        kofuymd: element.kofuymd,
        jyukyuno: element.jyukyuno,
        jidoid: element.jidoid,
        jidopno1: element.jidopno1,
        jidopno2: element.jidopno2,
        jidoadd: element.jidoadd,
        ssyu1: element.ssyu1,
        ssyu2: element.ssyu2,
        ssyu3: element.ssyu3,
        ssyu4: element.ssyu4,
        zantei: element.zantei,
        dcod: element.dcod,
        jyukyuname: element.jyukyuname,
      });
      return resutl;
    },
    setData(selectedData) {
      this.clearData();
      if (selectedData.length > 0) {
        this.selectedData = selectedData;
        this.setdata(selectedData[0]);
      }
      this.$emit('setMode', 'new');
    },
    setdata(data) {
      if (data == null) return;
      if (data.kofuymd.length > 0) {
        this.kofuymd = moment(data.kofuymd).format('YYYY-M-D');
        this.jyukyukubun = data.zantei == 0 ? '通常' : '暫定';
        this.jyukyuno = data.jyukyuno;
        this.setShichoson(data.shichosonno, data.shichosonname);
        this.syogaisyubetuValues[0] = data.ssyu1;
        this.syogaisyubetuValues[1] = data.ssyu2;
        this.syogaisyubetuValues[2] = data.ssyu3;
        this.syogaisyubetuValues[3] = data.ssyu4;
        this.syogaiji = data.jidoid > 0;
        this.setSikyuketteisya(data.dcodDisp, data.jyukyuname);
        this.isModify = true;
      }
    },
    setShichoson(code, name) {
      this.shichosonno = code;
      this.shichosonname = name;
    },
    setSikyuketteisya(code, name) {
      this.sikyuketteisyano = code;
      this.sikyuketteisya = name;
    },
    clearData() {
      this.kofuymd = '';
      this.jyukyukubun = '';
      this.jyukyuno = '';
      this.setShichoson('', '');
      this.syogaisyubetuValues[0] = 0;
      this.syogaisyubetuValues[1] = 0;
      this.syogaisyubetuValues[2] = 0;
      this.syogaisyubetuValues[3] = 0;
      this.syogaiji = false;
      this.setSikyuketteisya('', '');
      this.isModify = false;
    },
    /****************
     * 編集モード設定
     */
    setMode(pmode) {
      this.mode = pmode;
      if (this.mode !== 'new' && this.mode !== 'modKihon') {
        // this.setButtonColor('modifyButtonKihon', false);
      }
    },
    /****************
     * グリッド選択情報
     */
    setSubGridSelected(seleced) {
      this.$emit('setSubGridSelected', seleced);
    },
    setSubGridSelectedFromParent(seleced) {
      this.subGridSelected = seleced;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
div#JyukyuTourokuKihon2 {
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
    position: relative; /*相対配置*/
    .kihon-sikyuketteisya-input {
      height: 100%;
    }
    .kihon-sikyuketteisya-input2 {
      margin-top: -1px;
      margin-left: 4px;
      font-size: 12px;
    }
    .kihon-sikyuketteisya-input2.wj-control .wj-input {
      width: 100px;
    }
    .kihon-sikyuketteisya-disp {
      width: 200px;
      margin-left: 4px;
      font-size: 12px;
      background-color: lightyellow;
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