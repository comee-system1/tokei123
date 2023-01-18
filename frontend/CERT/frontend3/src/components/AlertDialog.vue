<template>
  <v-dialog :width="width" v-model="dialogAccountFlag" no-click-animation>
    <v-card class="alertArea">
      <h5 v-if="message">{{ message }}</h5>
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
  mounted() {},
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
  background-color: $dialog_green;
  padding-left: 30%;
  background-image: url('@/assets/checkCircle.png');
  background-position: 10% 50%;
}

%h5 {
  color: $white;
  font-weight: normal;
  font-size: 1.25rem;
}

.alertArea {
  @extend %checkCircleImage;
  background-repeat: no-repeat;
  height: 80px;
  h5 {
    @extend %h5;
    line-height: 80px;
  }
}
</style>
