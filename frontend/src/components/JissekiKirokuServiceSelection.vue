<template>
  <v-layout>
    <v-flex md12 class="basic-info">
      <div class="service-selection-area">
        <label>サービス</label>
        <wj-combo-box
          text="11210000 障害者支援 ひまわり"
          style="width: 300px"
        ></wj-combo-box>
        <wj-combo-box
          :items-source="search"
          :textChanged="searchChange"
        ></wj-combo-box>
      </div>
      <div class="month-selection-area">
        <label for="theDate">請求月 </label>
        <input
          type="month"
          name="example"
          :value="year + '-' + month"
          v-on:change="calenderChange"
        />

        <label for="theDate" v-if="seikyuflag">提供月</label>
        <input
          v-if="seikyuflag"
          type="month"
          name="example"
          :value="year + '-' + month"
        />
      </div>
      <v-row no-gutters style="position: absolute; top: 25%; right: 3%">
        <!-- <v-col v-if="jyougengakuFlag">
          <v-btn> 上限額管理計算 </v-btn>
        </v-col>
        <v-col class="ml-5">
          <v-btn>登録<v-icon dense>mdi-pencil</v-icon></v-btn>
        </v-col> -->
      </v-row>
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
      search: [
        '22:生活介護',
        '24:短期入所',
        '32:施設入所支援',
        '41:自立訓練(機能訓練)',
        '42:自立訓練(生活訓練)',
        '43:就労移行支援',
        '45:就労継続支援A型'
      ],
    };
  },
  methods: {
    calenderChange: function (e) {
      let split = e.target.value.split('-');
      this.$emit('parent-calendar', split);
    },
    searchChange: function (e) {
      let value = e.text;
      this.$emit('parent-search', value);
    },
  },
};
</script>

<style scoped>
</style>