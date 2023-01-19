<template>
  <v-dialog
    :width="width"
    v-model="dialogAccountFlagComplete"
    no-click-animation
  >
    <v-card class="dialogAccountPasswordOpen">
      <h4 v-if="message">{{ message }}</h4>
      <div class="mt-3" v-if="bodies">
        <div class="bodylist">
          <p v-if="bodies.text1">{{ bodies.text1 }}</p>
        </div>
        <div class="bodylist" v-if="bodies.text2">
          <p
            :class="[bodies.text2.body ? 'wrap' : '']"
            v-if="bodies.text2.title"
          >
            {{ bodies.text2.title }}
          </p>
          <p class="wrap" v-if="bodies.text2.body">{{ bodies.text2.body }}</p>
        </div>
        <div class="bodylist" v-if="bodies.text3">
          <p
            :class="[bodies.text3.body ? 'wrap' : '']"
            v-if="bodies.text3.title"
          >
            {{ bodies.text3.title }}
          </p>
          <p class="wrap" v-if="bodies.text3.body">{{ bodies.text3.body }}</p>
        </div>
        <div class="bodylist">
          <p class="min" v-if="bodies.min_text">{{ bodies.min_text }}</p>
        </div>
        <div class="mt-5 text-center">
          <v-btn @click="regist()">OK</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // message:"ダイアログに表示するメッセージ"
  // width:"ダイアログの幅"
  // args:"関数からの戻り値 どのタグを使ったかの目印になる想定"
  props: ['message', 'width', 'args', 'body'],
  data() {
    return {
      dialogAccountFlagComplete: true,
      bodies: this.body,
    };
  },
  mounted() {
    console.log(this.body);
  },
  methods: {
    regist() {
      this.$emit('dialogCompleteMethod', { args: this.args });
      this.dialogAccountFlagComplete = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
.dialogAccountPasswordOpen {
  padding: 20px;
  border-top: 3px solid $dialog_green;
  div {
    &.bodylist {
      width: 90%;
      margin: 0 auto;
      p {
        &.wrap {
          display: inline-block;
          width: 250px;
        }
        &.min {
          font-size: 0.85em;
        }
      }
    }
  }
  h4 {
    text-align: center;
    width: 380px;
    height: 34px;
    line-height: 34px;
    margin: 0 auto;
    display: block;
    font-weight: normal;
    background-image: url('@/assets/minCheckCircle.png');
    background-repeat: no-repeat;
  }

  button {
    width: 200px;
    background-color: $gray;
    color: $white;
  }
}
</style>
