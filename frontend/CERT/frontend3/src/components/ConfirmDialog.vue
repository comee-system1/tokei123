<template>
  <v-dialog :width="width" v-model="dialogAccountFlag" no-click-animation>
    <v-card class="confirmArea">
      <p>{{ message }}</p>
      <v-row no-gutters class="mt-6">
        <v-col
          ><v-btn @click="dialogAccountFlag = false">キャンセル</v-btn></v-col
        >
        <v-col><v-btn class="regist" @click="regist()">登録</v-btn></v-col>
      </v-row>
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

.confirmArea {
  border-top: 3px solid $dialog_blue;
  padding: 20px 10px;
  text-align: center;
  &.red {
    border-top: 3px solid $red;
  }
  button {
    font-size: $dialog_fontSize;
    height: $dialog_buttonHeight;
    width: $dialog_buttonWidth;
    border: 1px solid $dialog_borderColor;
    &.regist {
      background-color: $dialog_blue;
      color: $white;
    }
  }

  h4 {
    text-align: right;
    width: 280px;
    height: 34px;
    line-height: 34px;
    margin: 0 auto;
    background-image: url('../assets/minAlert.png');
    background-repeat: no-repeat;
  }
  .grayBox {
    padding: 10px;
    background-color: $light-white;
    width: 100%;
    ul {
      li {
        margin-left: 20px;
        text-align: left;
      }
    }
  }
}
</style>
