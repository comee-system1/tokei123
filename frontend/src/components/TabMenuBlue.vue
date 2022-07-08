<template>
  <v-tabs height="20" v-model="tab" @change="tabChange" id="tab_menu_blue">
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
      tab: '', // タブの初期状態
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
@import '@/assets/scss/common.scss';

#tab_menu_blue {
  border-bottom: 2px solid $grid_selected_background;
  .v-tabs-slider {
    height: auto;
  }
  a {
    &.v-tab--active {
      background-color: $grid_selected_background;
      transition: all 1.5s 0s ease;
      color: $white;
    }
  }
}
</style>