<template>
  <v-tabs height="30" v-model="tab" @change="tabChange">
    <v-tab
      class="text-caption"
      :href="m.href"
      v-for="m in tabmenu"
      :key="m.href"
      >{{ m.text }}</v-tab
    >
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      tab: 'JijyougenkanriJimsyo', // タブの初期状態
    };
  },
  props: ['tabmenu'],
  methods: {
    /*****************
     * タブを切り替えた際の表示切替
     */
    tabChange: function (e) {
      this.$emit('parent_tab_menu', { selectTab: e });
    },
  },
};
</script>

<style lang=scss>
</style>