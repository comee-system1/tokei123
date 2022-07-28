<template>
  <div id="JyukyuTourokuSyogaiKubun" :style="mainHeight">
    <v-container fluid class="syogaikubun-container">
      <v-row no-gutters class="syogaikubun-header-row">
        <v-card
          elevation="0"
          class="syogaikubun-header d-flex flex-row"
          flat
          tile
        >
          <label class="syogaikubun-header-title"
            >{{ this.titleNum }}障害支援区分</label
          >
          <v-card
            v-if="subGridSelected"
            elevation="0"
            class="syogaikubun-header d-flex flex-row-reverse"
            flat
            tile
          >
            <v-btn
              id="modifyButtonSyogaikubun"
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
            >
              修正</v-btn
            >
            <v-btn
              id="addButtonSyogaikubun"
              class="modify-button"
              style="height: 21px"
              @click="setTrunAdd"
            >
              追加</v-btn
            >
          </v-card>
        </v-card>
      </v-row>
      <v-row no-gutters class="syogaikubun-sienkubun-row">
        <v-card
          elevation="0"
          class="syogaikubun-title-length6 d-flex flex-row"
          flat
          tile
        >
          障害支援区分
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="syogaikubun-sienkubun-combobox d-flex flex-row"
        >
          <wj-menu
            id="comboSienkubun"
            class="customCombobox"
            :initialized="initComboSienkubun"
            :isRequired="true"
            :itemsSource="sienkubunCombo"
            :displayMemberPath="'text'"
            selectedValuePath="'key'"
            :itemClicked="onSelectedSienkubun"
          >
          </wj-menu>
        </v-card>
      </v-row>
      <v-row no-gutters class="syogaikubun-yukokikan-row">
        <v-card
          elevation="0"
          class="syogaikubun-title-length4 d-flex flex-row"
          flat
          tile
        >
          有効期間
        </v-card>
        <p class="required">*</p>
        <v-card
          elevation="0"
          class="syogaikubun-yukokikan-picker d-flex flex-row"
        >
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="syugaikubunymdStart"
            v-model="syugaikubunymdStart"
            placeholder="開始日を選択"
          ></datepicker>
          &nbsp;～&nbsp;
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="syugaikubunymdEnd"
            :clear-button="true"
            v-model="syugaikubunymdEnd"
            placeholder="終了日を選択"
          ></datepicker>
        </v-card>
      </v-row>
      <v-row v-if="this.changeMode()" no-gutters class="syogaikubun-button-row">
        <v-btn class="cancel-button" @click="cancel"> キャンセル</v-btn>
        <v-card
          elevation="0"
          class="syogaikubun-bottom-regist d-flex flex-row-reverse"
          flat
          tile
        >
          <v-btn class="regist-button"> 登 録</v-btn>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.core';
export default {
  data() {
    return {
      ja: ja,
      mode: '',
      subGridSelected: false,
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      sienkubunCombo: this.getSienkubunCombo(),

      isModify: false,
      syogaiKubun: 0,
      syugaikubunymdStart: '',
      syugaikubunymdEnd: '',
    };
  },
  props: ['titleNum'],
  components: {
    Datepicker,
  },
  mounted() {
    this.Resize();
  },
  methods: {
    dispRegistBtn() {
      let r = this.isModify;
      this.Resize();
      this.setSubGridSelected(r);
      return r;
    },
    changeMode() {
      this.Resize();
      return this.mode === 'modSyogaikubun';
    },
    Resize() {
      let height = '';
      let num = 0;
      let add = 0;
      if (this.mode !== 'modSyogaikubun') {
        num = 3;
      } else {
        num = 4;
        add = 4;
      }
      height = 'calc((29px * ' + num + ') + ' + add + 'px)';
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.setButtonColor('modifyButtonSyogaikubun', true);
      this.setButtonColor('addButtonSyogaikubun', false);
      this.$emit('setMode', 'modSyogaikubun');
      this.Resize();
    },
    setTrunAdd() {
      this.setButtonColor('modifyButtonSyogaikubun', false);
      this.setButtonColor('addButtonSyogaikubun', true);
      this.$emit('setMode', 'modSyogaikubun');
      this.Resize();
    },
    cancel() {
      this.setButtonColor('modifyButtonSyogaikubun', false);
      this.setButtonColor('addButtonSyogaikubun', false);
      this.$emit('setMode', 'new');
      this.changeMode();
    },
    setButtonColor(id, on) {
      var targetbtn = document.getElementById(id);
      targetbtn.style.color = on ? '#fff' : 'black';
      targetbtn.style.backgroundColor = on ? '#444' : '#f5f5f5';
    },
    setData(selectedData) {
      this.clearData();
      if (selectedData.length > 0) {
        this.setSienkubun(this.setdata(selectedData[0]));
      }
      this.$emit('setMode', 'new');
      this.Resize();
    },
    setdata(data) {
      if (data.syogaikbn > 0) {
        this.syogaiKubun = data.syogaikbn;
        this.syugaikubunymdStart = moment(data.ntsymd).format('YYYY-M-D');
        if (data.nteymd != '99991231') {
          this.syugaikubunymdEnd = moment(data.nteymd).format('YYYY-M-D');
        }
        this.isModify = true;
        return data.syogaikbn;
      }
    },
    clearData() {
      this.syogaiKubun = 0;
      this.syugaikubunymdStart = '';
      this.syugaikubunymdEnd = '';
      this.isModify = false;
      this.setSienkubun(this.syogaiKubun);
    },
    /*************************
     * 絞り込みコンボボックス
     */
    initComboSienkubun(combo) {
      combo.header = this.sienkubunCombo[0].text;
      var obj = document.getElementById('comboSienkubun');
      obj.style.color = 'gray';
    },
    onSelectedSienkubun(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        var obj = document.getElementById('comboSienkubun');
        if (e.selectedIndex == 0) {
          obj.style.color = 'gray';
        } else {
          obj.style.color = 'black';
        }
      }
    },
    setSienkubun(kbn) {
      let index = this.sienkubunCombo.findIndex((e) => e.key == kbn);
      var obj = wijmo.Control.getControl('#comboSienkubun');
      if (index >= 0) {
        obj.selectedIndex = index;
        obj.header = this.sienkubunCombo[index].text;
      } else {
        obj.selectedIndex = 0;
        obj.header = this.sienkubunCombo[0].text;
      }
      this.onSelectedSienkubun(obj);
    },
    getSienkubunCombo() {
      let list = [];
      list.push(
        {
          key: 0,
          text: '区分を選択',
        },
        {
          key: 1,
          text: '区分１',
        },
        {
          key: 2,
          text: '区分２',
        },
        {
          key: 3,
          text: '区分３',
        },
        {
          key: 4,
          text: '区分４',
        },
        {
          key: 5,
          text: '区分５',
        },
        {
          key: 6,
          text: '区分６',
        }
      );
      return list;
    },
    /****************
     * 編集モード設定
     */
    setMode(pmode) {
      this.mode = pmode;
      if (this.mode !== 'new' && this.mode !== 'modSyogaikubun') {
        this.setButtonColor('modifyButtonSyogaikubun', false);
        this.setButtonColor('addButtonSyogaikubun', false);
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

div#comboSienkubun {
  .wj-btn.wj-btn-default {
    border-left: none;
  }
}

div#JyukyuTourokuSyogaiKubun {
  font-size: 14px;
  font-family: 'メイリオ';
  width: 100%;
  height: calc(29px * 4);
  .syogaikubun-container {
    padding: 0px !important;
  }
  .syogaikubun-header-row {
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    .syogaikubun-header {
      width: 100%;
      height: 100%;
      background-color: #c6c6c6;
    }
    .syogaikubun-header-title {
      width: 200px;
      height: 25px;
      padding: 2px 0px 0px 8px;
      color: black;
    }
  }

  .syogaikubun-title-length4 {
    width: 100px;
    padding: 2px 0px 0px 20px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
  }

  .syogaikubun-title-length6 {
    width: 100px;
    padding: 2px 0px 0px 8px;
    background-color: #e6e6e6;
    color: black;
    text-align: center;
  }

  .syogaikubun-sienkubun-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .syogaikubun-sienkubun-combobox {
      height: 25px;
      margin-top: -2px;
      margin-left: 4px;
      padding-left: -2px;
      .syogaikubun-sienkubun-items {
        font-size: 12px;
      }
    }
  }
  div.customCombobox.customCombobox {
    margin-top: 2px;
    width: 100px !important;
    font-size: 12px !important;
  }

  .syogaikubun-yukokikan-row {
    height: 25px;
    margin: 4px 4px 0px 4px;
    position: relative; /*相対配置*/
    .syogaikubun-yukokikan-picker {
      padding: 0px 0px 0px 4px;
    }
  }

  .syogaikubun-button-row {
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
    .syogaikubun-bottom-regist {
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