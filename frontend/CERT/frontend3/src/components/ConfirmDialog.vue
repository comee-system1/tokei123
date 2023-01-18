<template>
  <v-dialog
    :width="width"
    v-model="dialogAccountFlagConf"
    no-click-animation
    persistent
  >
    <v-card :class="`confirmArea ${baseColor}`">
      <p v-if="message" :class="`${baseColor} ${alertIcon}`">{{ message }}</p>
      <div class="mt-3 small" v-if="submessage">{{ submessage }}</div>

      <v-row v-if="listBox" class="mt-3">
        <div class="grayBox">
          <ul>
            <li>{{ listBox.list1 }}</li>
            <li>{{ listBox.list2 }}</li>
            <li>{{ listBox.list3 }}</li>
            <li>{{ listBox.list4 }}</li>
          </ul>
        </div>
      </v-row>

      <v-row no-gutters class="mt-6">
        <v-col
          ><v-btn @click="cancel()">{{ left }}</v-btn></v-col
        >
        <v-col
          ><v-btn :class="`regist ${baseColor}`" @click="regist()">{{
            right
          }}</v-btn></v-col
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // args:"関数からの戻り値 どのタグを使ったかの目印になる想定"
  props: [
    'message',
    'submessage',
    'width',
    'args',
    'leftButton',
    'rightButton',
    'color',
    'listBox',
    'alertIcon',
  ],
  data() {
    return {
      dialogAccountFlagConf: true,
      left: this.getLeftButton(),
      right: this.getRightButton(),
      baseColor: this.color,
    };
  },
  mounted() {},
  methods: {
    getLeftButton() {
      return this.leftButton ? this.leftButton : 'キャンセル';
    },
    getRightButton() {
      return this.leftButton ? this.rightButton : '登録';
    },

    regist() {
      this.$emit('dialogConfirmMethod', { args: this.args });
      this.dialogAccountFlagConf = false;
    },
    cancel() {
      this.$emit('dialogConfirmCancelMethod', { args: this.args });
      this.dialogAccountFlagConf = false;
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
  .small {
    font-size: 0.85rem;
  }
  &.red {
    border-top: 3px solid $dialog_red;
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
    &.red {
      border: 1px solid $dialog_red;
      color: $dialog_red;
      background-color: $white;
    }
  }
  p {
    &.red {
      text-align: right;
      width: 70%;
      height: 34px;
      line-height: 34px;
      margin: 0 auto;
      &.alert {
        background-image: url('@/assets/minAlert.png');
        background-repeat: no-repeat;
        width: 300px;
      }
    }
  }
  .grayBox {
    padding: 10px;
    background-color: $light-white;
    width: 90%;
    margin: 0 auto;
    ul {
      li {
        margin-left: 20px;
        text-align: left;
      }
    }
  }
}
</style>
