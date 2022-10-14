<template>
  <v-btn-toggle class="flex-wrap" v-model="alphaSearch" mandatory>
    <v-btn
      outlined
      v-for="(n, k) in alphabet"
      :key="n"
      :width="25"
      :height="25"
      p-0
      style="min-width: auto"
      @click="onAlphabet(k)"
    >
      {{ n }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import ls from '@/utiles/localStorage';
import alphabetFilter from '@/utiles/alphabetFilter';
export default {
  data() {
    return {
      alphabet: [
        '全',
        'ア',
        'カ',
        'サ',
        'タ',
        'ナ',
        'ハ',
        'マ',
        'ヤ',
        'ラ',
        'ワ',
      ],
      alphaSearch: 0,
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.alphaSearch = Number(ls.getlocalStorageEncript(ls.KEY.Alphabet));
    });
  },
  methods: {
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      this.alphaSearch = key;
      ls.setlocalStorageEncript(ls.KEY.Alphabet, Number(key));
      this.$emit('onAlphabetical', key);
    },
    alphabetFilter(array, search = '') {
      return alphabetFilter.alphabetFilter(array, this.alphaSearch, search);
    },
  },
};
</script>

<style scoped>
</style>