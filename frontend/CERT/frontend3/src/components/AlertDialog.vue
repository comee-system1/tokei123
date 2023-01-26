<template>
  <v-dialog
    :width="width"
    v-model="dialogAccountFlag"
    no-click-animation
    persistent
    id="alertAreaBox"
  >
    <v-card :class="`alertArea `" tile flat>
      <h5 v-if="message">{{ message }}</h5>
      <v-btn class="pa-0" @click="dialogAccountFlag = false">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </v-card>
    <v-card v-if="submessage" :class="`${height}`" tile flat>
      <div class="submessage">
        <p>{{ submessage }}</p>
      </div>
      <div class="box">
        <ul>
          <li v-for="value in sendToMail" :key="value">{{ value }}</li>
        </ul>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // message:"ダイアログに表示するメッセージ"
  // width:"ダイアログの幅"
  // args:"関数からの戻り値 どのタグを使ったかの目印になる想定"
  props: ['message', 'submessage', 'height', 'width', 'args', 'sendToMail'],
  data() {
    return {
      dialogAccountFlag: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.dialogAccountFlag = false;
    }, 10000);
  },
  methods: {
    // regist() {
    //   this.$emit('dialogConfirmMethod', { args: this.args });
    //   this.dialogAccountFlag = false;
    // },
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
  background-size: 30px 30px;
  background-position: 10% 50%;
}

%h5 {
  color: $white;
  font-weight: bold;
  font-size: 0.95rem;
  text-align: left;
}
$buttonSize: 24px;
#alertAreaBox {
  .v-overlay {
    &__scrim {
      position: static;
    }
  }
  .v-overlay__content {
    top: 0;
    left: auto;
    right: 0;
  }
  .v-card {
    box-shadow: none !important;
  }
}
.alertArea {
  @extend %checkCircleImage;
  background-repeat: no-repeat;
  height: 40px;
  border-radius: 0px !important;
  background-color: $dialog_green;
  box-shadow: none !important;
  h5 {
    @extend %h5;
    line-height: 40px;
  }

  button {
    width: $buttonSize;
    min-width: $buttonSize;
    height: $buttonSize !important;
    min-height: $buttonSize;
    padding: 0;
    position: absolute;
    top: 8px;
    left: auto;
    right: 10px;
  }
}
.tall {
  height: 180px;
  background-color: $dialog_green;
  border-radius: 0px !important;

  .submessage {
    color: $white;
    padding: 10px;
  }
  .box {
    background-color: $selected_color;
    border-radius: 3px;
    width: 90%;
    margin: 0 auto;
    ul {
      padding: 20px 40px;
    }
  }
}
</style>
