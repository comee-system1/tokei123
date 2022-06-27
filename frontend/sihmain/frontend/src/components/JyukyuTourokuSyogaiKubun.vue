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
            v-if="$_subGridSelected()"
            elevation="0"
            class="syogaikubun-header d-flex flex-row-reverse"
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
            <v-btn
              class="modify-button"
              style="height: 21px"
              @click="setTrunModify"
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
            class="syogaikubun-sienkubun-items"
            :initialized="initComboSienkubun"
            :isRequired="true"
            :itemsSource="sienkubunCombo"
            :displayMemberPath="'text'"
            selectedValuePath="'key'"
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
            :value="sienkubunymdStart"
            v-model="sienkubunymdStart"
            placeholder="開始日を選択"
          ></datepicker>
          &nbsp;～&nbsp;
          <datepicker
            :language="ja"
            class="input_picker"
            :format="DatePickerFormat"
            :value="sienkubunymdEnd"
            v-model="sienkubunymdEnd"
            placeholder="終了日を選択"
          ></datepicker>
        </v-card>
      </v-row>
      <v-row
        v-if="$_mode() === 'modSyogaikubun'"
        no-gutters
        class="syogaikubun-button-row"
      >
        <v-btn class="cancel-button" @click="openDialog_Term('regist')">
          キャンセル</v-btn
        >
        <v-card
          elevation="0"
          class="syogaikubun-bottom-regist d-flex flex-row-reverse"
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
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.input';
export default {
  data() {
    return {
      ja: ja,
      mainHeight: '',
      DatePickerFormat: 'yyyy年MM月dd日',
      koufuymd: '',
      year: moment().year(),
      month: moment().format('MM'),
      lastdate: moment().daysInMonth(),
      sienkubunCombo: this.getSienkubunCombo(),
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
    Resize() {
      let height = '';
      if (this.$_mode() === 'new') {
        height = 'calc((29px * 3))';
      } else {
        height = 'calc((29px * 4) + 4px)';
      }
      this.mainHeight = 'height:' + height + ';';
    },
    setTrunModify() {
      this.$_setMode('modSyogaikubun');
      this.Resize();
    },
    /*************************
     * 絞り込みコンボボックス
     */
    initComboSienkubun(combo) {
      let _self = this;
      combo.header = this.sienkubunCombo[0].text;
      var obj = document.getElementById('comboSienkubun');
      obj.style.color = 'gray';
      combo.selectedIndexChanged.addHandler(function (sender) {
        if (combo.selectedIndex == 0) {
          obj.style.color = 'gray';
        } else {
          obj.style.color = 'black';
        }
        if (sender.selectedIndex != -1) {
          combo.header = _self.sienkubunCombo[sender.selectedIndex].text;
        }
      });
    },
    getSienkubunCombo() {
      let sienkubunCombo = [];
      sienkubunCombo.push(
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
      return sienkubunCombo;
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