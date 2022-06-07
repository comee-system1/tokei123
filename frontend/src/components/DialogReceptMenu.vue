<template>
  <div id="menubar">
    <v-btn
      elevation="2"
      icon
      small
      absolute
      top
      right
      @click="menubar_close()"
      color="secondary"
      ><v-icon dark small> mdi-close </v-icon></v-btn
    >
    <v-btn
      elevation="2"
      outlined
      tile
      block
      id="jigyosyoMisiyo"
      @click="jigyosyoMisiyo()"
      >事業所未使用</v-btn
    >
    <v-btn
      elevation="2"
      outlined
      tile
      mt-1
      block
      id="jigyosyoAdd"
      @click="jigyosyoAddList()"
      >事業所追加</v-btn
    >
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  components: {},

  methods: {
    /**************
     * 編集用メニューを閉じる
     */
    menubar_close() {
      document.getElementById('menubar').style.display = 'none';
      this.$emit('hensyuRow');
    },
  },
};
</script>

<style scoped>
</style>