<template>
  <v-layout>
    <v-flex md12 class="basic-info">
      <div class="service-selection-area">
        <!-- <wj-combo-box
          text="11210000 障害者支援 ひまわり"
          style="width: 300px"
        ></wj-combo-box>
        <wj-combo-box
          :items-source="search"
          :textChanged="searchChange"
          @click="comboClick"
        ></wj-combo-box> -->
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
            <v-card class="pa-1 jigyosyoInput" v-on:click="comboClick()" tile>{{
              selectButton
            }}</v-card>
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
        <v-col class="ml-5">
          <v-btn>登録<v-icon dense>mdi-pencil</v-icon></v-btn>
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
  },

  data() {
    return {
      year: year,
      month: month,
      search: ['32:施設入所支援', '41:自立訓練'],
      header_dialog: false,
      selectButton: '事業者選択',
      jimusyo: [],
      jigyosyoCode: '　',
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
      this.jimusyo = data;
    },
    onInitializedJimusyo: function (grid) {
      this.createJimusyo();
      // while (grid.rows.length < griddata.length) {
      //   grid.rows.push(new wjGrid.Row());
      // }
      let _self = this;
      grid.hostElement.addEventListener('click', function (e) {
        var ht = grid.hitTest(e);
        ht = grid.hitTest(e.pageX, e.pageY);
        _self.jigyosyoCode = _self.jimusyo[ht.row].jimusyoBango;
        _self.jigyosyoCode += ' ' + _self.jimusyo[ht.row].serviceJigyo;
        _self.selectButton = _self.jimusyo[ht.row].teikyoService;
      });
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
.jigyosyoInput {
  background: url('../assets/pen_20px.png') no-repeat $white 95% 50% / 20px 20px;
}
.header_dialogs {
  position: fixed !important;
  top: 0;
  font-size: 14px;
  .wj-cell {
    &.wj-state-multi-selected {
      background: $selected_color;
      color: $font_color;
    }
    &.wj-state-selected {
      background: $selected_color;
      color: $font_color;
    }
  }
}
</style>