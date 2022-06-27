<template>
  <v-dialog v-model="pearentFlag" width="500"> testtest </v-dialog>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
export default {
  props: {},
  data() {
    return {
      pearentFlag: false,
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      openFrag: false,
      addSelect: '',
      selected: {},
      registData: {},
    };
  },
  components: {
    Datepicker,
  },

  methods: {
    open(aa) {
      console.log(aa);
      this.pearentFlag = true;
    },
    ontextChanged: function (e) {
      this.selected = {
        name: this.addSelect[e.selectedIndex],
      };
    },
    hoge() {
      openFrag = true;
      alert(33);
    },
  },
};
</script>

<style scoped>
</style>