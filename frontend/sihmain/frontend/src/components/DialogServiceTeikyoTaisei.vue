<template>
  <div class="text-center" id="dialogServiceTeikyo">
    <v-dialog v-model="dialog" width="1020">
      <v-card elevation="2" class="pa-5" id="taiseiDialog">
        <v-toolbar-title class="text-subtitle-1"></v-toolbar-title>
        <v-row no-gutter>
          <v-col class="pa-0 mt-1 mw120">サービス事業所名</v-col>
          <v-col class="mw260 pa-0">
            <v-text-field outlined class="input pa-0 w260"></v-text-field>
          </v-col>
          <v-col class="pa-0 mw120">
            <v-text-field outlined class="input w120 pa-0"></v-text-field>
          </v-col>
          <v-col class="pa-0 mt-1 text-center mw120">サービス名称</v-col>
          <v-col class="mw60 pa-0">
            <v-text-field outlined class="input pa-0"></v-text-field>
          </v-col>
          <v-col class="mw260 pa-0">
            <v-text-field outlined class="input pa-0 w260"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-6">
          <v-col class="pa-0 mw120 mt-1">適用開始月</v-col>
          <v-col class="pa-0 mw120" style="position: relative">
            <v-text-field
              outlined
              class="input w120 pa-0"
              v-model="disabledDate"
            ></v-text-field>
            <v-icon
              small
              @click="datepicker_dialog = true"
              class="calender_icon"
              >mdi-calendar-month</v-icon
            >
          </v-col>
          <v-col class="mw20 text-center mt-n2">～</v-col>
          <v-col class="pa-0 ml-3">
            <v-btn outlined small>前回履歴よりコピー</v-btn>
            <v-btn outlined small>履歴参照</v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-toolbar-title class="text-caption text-center"
              >施設種類・定員等
            </v-toolbar-title>
            <v-row no-gutter class="mt-3">
              <v-col class="pa-0 mt-1 mw120">級地区分</v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="kyutiCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="kyutiCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutter class="mt-4">
              <v-col class="pa-0 mt-4 mw120">多機能型事業</v-col>
              <v-col class="mw260 pa-0">
                <v-checkbox
                  v-model="gaitou"
                  class="text-caption pa-0"
                  label="該当"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row no-gutter class="mt-3">
              <v-col class="pa-0 mt-1 mw120">定員区分</v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="kubunCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="kubunCombo"
                ></wj-combo-box>
              </v-col>
            </v-row>
            <v-row no-gutter class="mt-4">
              <v-col class="pa-0 mt-1 mw120">多機能型事業<br />定員区分</v-col>
              <v-col class="mw260 pa-0">
                <wj-combo-box
                  class="input w200"
                  :itemsSource="kubunCombo"
                  :selectedValuePath="'key'"
                  :displayMemberPath="'value'"
                  v-model="kubunCombo"
                ></wj-combo-box>
                <p>(各サービス種類の単位毎の利用定員)</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col>aaa</v-col>
          <v-col>aaa</v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="datepicker_dialog" width="290">
      <v-date-picker
        type="date"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: [],
  data() {
    return {
      dialog: false,
      kyutiComboIndex: '',
      datepicker_dialog: false,
      disabledDate: moment().format('YYYY/MM/DD'),
      picker: '',
      kyutiCombo: [
        {
          key: 1,
          value: '1級地',
        },
        {
          key: 2,
          value: '2級地',
        },
        {
          key: 3,
          value: '3級地',
        },
      ],
      kubunCombo: [
        {
          key: 1,
          value: '21人～40人以下',
        },
        {
          key: 2,
          value: '41人～60人以下',
        },
      ],
      input: '',
      gaitou: '',
    };
  },
  components: {},
  mounted() {},
  methods: {
    openDialog(type, data) {
      this.dialog = true;
      this.type = type;
    },
    /**************
     * 日付選択
     */
    dateSelect() {
      this.disabledDate = moment(this.picker).format('YYYY/MM/DD');
      this.datepicker_dialog = false;
    },

    header_dialog_close: function () {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/common.scss';

#taiseiDialog,
div#dialogTeikyoTaisei {
  font-size: 12px;
  font-family: 'メイリオ';
  width: 100%;
  label {
    font-size: 12px;
  }
  .position-relative {
    position: relative;
  }
  .calender_icon {
    position: absolute;
    top: 6px;
    left: auto;
    right: 10px;
  }
  .mw14 {
    max-width: 14px;
  }
  .mw20 {
    max-width: 20px;
  }
  .mw40 {
    max-width: 40px;
  }
  .mw60 {
    max-width: 60px;
  }
  .mw80 {
    max-width: 80px;
  }
  .mw120 {
    max-width: 120px;
  }
  .mw160 {
    max-width: 160px;
  }
  .mw260 {
    max-width: 260px;
  }
  .input {
    width: 200px;
    height: 20px;
    border-radius: 0px;
    padding: 0;
    div {
      min-height: 20px !important;
    }
    &.w40 {
      width: 40px;
    }
    &.w60 {
      width: 60px;
    }
    &.w80 {
      width: 80px;
    }
    &.w100 {
      width: 100px;
    }
    &.w160 {
      width: 160px;
    }
    &.w200 {
      width: 200px;
    }
    &.w260 {
      width: 260px;
    }
    &.w300 {
      width: 300px;
    }
    &.w400 {
      width: 400px;
    }
    &.w500 {
      width: 500px;
    }
  }
  .v-text-field {
    input {
      padding: 4px;
      font-size: 12px;
    }
    fieldset {
      border-radius: 0;
      border: 1px solid #ccc;
    }
    textarea {
      margin-top: 0 !important;
      padding-left: 4px;
    }
  }
}
</style>