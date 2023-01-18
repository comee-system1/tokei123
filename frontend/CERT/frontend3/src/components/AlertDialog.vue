<template>
  <v-dialog :width="width" v-model="dialogAccountFlag" no-click-animation>
    <v-card class="confirmArea">
      <p>{{ message }}</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // message:"ダイアログに表示するメッセージ"
  // width:"ダイアログの幅"
  // args:"関数からの戻り値 どのタグを使ったかの目印になる想定"
  props: ['message', 'width', 'args'],
  data() {
    return {
      dialogAccountFlag: true,
    };
  },
  moutend() {},
  methods: {
    regist() {
      this.$emit('dialogConfirmMethod', { args: this.args });
      this.dialogAccountFlag = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

%checkCircleImage {
  border: none;
  background-color: $green;
  text-align: center;
  background-image: url('@/assets/checkCircle.png');
  background-position: 20% 50%;
}
</style>
