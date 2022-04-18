<template>
  <v-layout>
    <v-flex md12 class="basic-info">
      <div class="service-selection-area">
        <label>サービス</label>
        <wj-combo-box
          text="11210000 障碍者支援 ひまわり"
          style="width: 300px"
        ></wj-combo-box>
        <wj-combo-box
          :items-source="search"
          :textChanged="searchChange"
        ></wj-combo-box>
      </div>
      <div class="month-selection-area">
        <label for="theDate">請求月</label>
        <input
          type="month"
          name="example"
          :value="year + '-' + month"
          v-on:change="calenderChange"
        />
      </div>
      <v-btn absolute right top>登録<v-icon dense>mdi-pencil</v-icon></v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment';

let year = moment().year();
let month = moment().format('MM');

export default {
  data() {
    return {
      year: year,
      month: month,
      search: ['32:施設入所支援', '41:自立訓練'],
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