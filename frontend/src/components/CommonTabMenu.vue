<template>
  <v-tabs id="common-tab" height="25" v-model="tab" @change="tabChange">
    <v-tab
      class="text-caption"
      :style="tabmarginSize"
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
      tab: 'ServiceMeisai', // タブの初期状態
    };
  },
  props: {
    tabmenu: {
      type: Array,
      required: true,
    },
    tabmargin: {
      type: String,
      required: false,
      default: '15px',
    },
  },
  methods: {
    /*****************
     * タブを切り替えた際の表示切替
     */
    tabChange: function (e) {
      this.$emit('parent_common_tab_menu', { selectTab: e });
    },
  },
  computed: {
    tabmarginSize() {
      return {
        '--tabmargin': this.tabmargin,
      };
    },
  },
};
</script>

<style lang=scss>
#common-tab {
  margin-bottom: 4px;
  border-bottom: 2px solid #444;

  .v-tab {
    margin-right: var(--tabmargin);
    color: #333;
  }
  .v-tab:not(.v-tab--active) {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px 4px 0 0;
  }
  .v-tab--active {
    background: #444;
    color: #eee;
    font-weight: 700;
    border: none;
    border-radius: 4px 4px 0 0;
  }
  .v-tabs-slider {
    display: none;
  }
}
</style>