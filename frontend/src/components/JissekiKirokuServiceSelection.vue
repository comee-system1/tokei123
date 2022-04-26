<template>
  <v-layout>
    <v-flex md12 class="basic-info">
      <div class="service-selection-area">
        <v-row no-gutters>
          <v-col md="1">
            <v-card class="pa-1 transparent white--text" elevation="0"
              >サービス</v-card
            >
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
            <v-card class="pa-1 transparent white--text" elevation="0"
              >請求月</v-card
            >
          </v-col>
          <v-col md="2">
            <v-card class="transparent" tile>
              <input
                type="month"
                name="example"
                :value="year + '-' + month"
                v-on:change="calenderChange"
              />
            </v-card>
          </v-col>
          <v-col md="1">
            <v-card
              class="pa-1 transparent white--text"
              elevation="0"
              v-if="seikyuflag"
              >提供月</v-card
            >
          </v-col>
          <v-col md="2">
            <v-card class="transparent" tile>
              <input
                v-if="seikyuflag"
                type="month"
                name="example"
                :value="year + '-' + month"
              />
            </v-card>
          </v-col>
        </v-row>
      </div>

      <v-row no-gutters style="position: absolute; top: 25%; right: 3%">
        <v-col v-if="jyougengakuFlag">
          <v-btn> 上限額管理計算 </v-btn>
        </v-col>
        <v-col v-if="receptFlag">
          <v-btn> レセプトへ反映 </v-btn>
        </v-col>
        <v-col class="ml-5">
          <!-- <v-btn>登録<v-icon dense>mdi-pencil</v-icon></v-btn> -->
        </v-col>
      </v-row>
      <v-dialog
        v-model="header_dialog"
        width="600"
        content-class="header_dialogs"
      >
        <v-card class="pa-2">
          <v-container>
            <wj-flex-grid
              :itemsSource="jimusyo"
              :headersVisibility="'Column'"
              :initialized="onInitializedJimusyo"
              :autoClipboard="false"
              :selectionMode="3"
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
                width="2*"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                header="提供サービス名"
                binding="teikyoService"
                width="2*"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-container>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment';

let year = moment().year();
let month = moment().format('MM');

export default {
  props: {
    seikyuflag: { type: Boolean },
    jyougengakuFlag: { type: Boolean },
    receptFlag: { type: Boolean },
  },

  data() {
    return {
      year: year,
      month: month,
      header_dialog: false,
      defaultSetting: this.defaultSettings(),
    };
  },
  methods: {
    createJimusyo: function () {
      let data = [];
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '生活介護支援事務所 ひまわり園',
        teikyoService: '22 生活介護',
      });
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '短期入所施設 ひまわり園',
        teikyoService: '24 短期入所',
      });
      data.push({
        jimusyoBango: '11123405',
        serviceJigyo: '障害者入所施設 ひまわり園',
        teikyoService: '32 施設入所支援',
        defaultFlag: true,
      });
      data.push({
        jimusyoBango: '111200012',
        serviceJigyo: '生活介護支援事務所 たんぽぽ園',
        teikyoService: '22 生活介護',
      });
      data.push({
        jimusyoBango: '111200012',
        serviceJigyo: '障害者入所施設 ひまわり園',
        teikyoService: '32 施設入所支援',
      });
      data.push({
        jimusyoBango: '111200019',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoService: '41 自立訓練(機能訓練)',
      });
      data.push({
        jimusyoBango: '111200019',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoService: '42 自立訓練(生活訓練)',
      });
      data.push({
        jimusyoBango: '111200019',
        serviceJigyo: '自立訓練製作所 ひまわり園',
        teikyoService: '43 就労移行支援',
      });
      this.jimusyo = data;
    },
    onInitializedJimusyo: function (grid) {
      //this.createJimusyo();
      let _self = this;
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
          teikyoService: _self.jimusyo[ht.row].teikyoService,
        };
        _self.$emit('parent-service-select', returns);

        _self.header_dialog = false;
      });
    },
    defaultSettings: function () {
      this.createJimusyo();

      //初期データはdefaultFlagが有効のものを利用
      let defaultdata = [];
      for (let i = 0; i <= this.jimusyo.length; i++) {
        if (this.jimusyo[i]['defaultFlag']) {
          defaultdata = this.jimusyo[i];
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
        teikyoService: defaultdata.teikyoService,
      };
      this.$emit('parent-service-select', returns);
    },
    calenderChange: function (e) {
      let split = e.target.value.split('-');
      this.$emit('parent-calendar', split);
    },
    searchChange: function (e) {
      let value = e.text;

      this.$emit('parent-search', value);
    },
    comboClick: function () {
      this.header_dialog = true;
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
}
</style>