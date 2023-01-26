<template>
  <v-dialog
    :width="width"
    v-model="dialogChangeFlagConf"
    no-click-animation
    persistent
  >
    <v-card :class="`changingArea ${baseColor}`">
      <v-card-title class="dialog_title">{{ title }}を変更</v-card-title>

      <v-card class="pa-3">
        <p>{{ message }}</p>
        <div class="borderBottom pb-2">
          <p>変更前</p>
          <div class="d-flex mt-1">
            <label>現{{ title }}</label>
            <input type="text" class="ml-1 yellow" v-model="oldForm" />
          </div>
        </div>
        <div class="buttomArrow">↓</div>
        <div class="pb-2">
          <p>変更後</p>
          <div class="d-flex mt-1">
            <label>新{{ title }}</label>
            <div>
              <input type="text" class="ml-1" v-model="newForm" />
              <ul if="args.changing == 'adminPassword'" class="lists">
                <li>6桁以上で入力してください</li>
                <li>半角英字＋数字を組み合わせてください</li>
                <li>
                  容易に推測できるパスワードは入力しないでください(例:password,123456等)
                </li>
              </ul>
            </div>
          </div>
          <div class="d-flex mt-1">
            <label>確認用</label>
            <div>
              <input type="text" class="ml-1" v-model="confForm" />
            </div>
          </div>
        </div>
        <v-row no-gutters class="mt-6">
          <v-col class="text-left"
            ><v-btn @click="cancel()">{{ left }}</v-btn></v-col
          >
          <v-col class="text-right"
            ><v-btn :class="`regist ${baseColor}`" @click="regist()">{{
              right
            }}</v-btn></v-col
          >
        </v-row>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // args:"関数からの戻り値 どのタグを使ったかの目印になる想定"
  props: ['title', 'message', 'width', 'args', 'leftButton', 'rightButton'],
  data() {
    return {
      oldForm: this.getOldForm(),
      newForm: '',
      confForm: '',
      dialogChangeFlagConf: true,
      left: this.getLeftButton(),
      right: this.getRightButton(),
      baseColor: this.color,
    };
  },
  mounted() {},
  methods: {
    getOldForm() {
      let str = '';
      if (this.args.changing == 'adminName') {
        str = this.args.adminName;
      }
      if (this.args.changing == 'adminMail') {
        str = this.args.adminMail;
      }
      if (this.args.changing == 'adminPassword') {
        str = '********';
      }
      return str;
    },
    getLeftButton() {
      return this.leftButton ? this.leftButton : 'キャンセル';
    },
    getRightButton() {
      return this.leftButton ? this.rightButton : '登録';
    },

    regist() {
      let form = {};
      form.oldForm = this.oldForm;
      form.newForm = this.newForm;
      form.confForm = this.confForm;
      this.$emit('dialogChangeMethod', { args: this.args, forms: form });
      this.dialogChangeFlagConf = false;
    },
    cancel() {
      this.$emit('dialogChangeCancelMethod', { args: this.args });
      this.dialogChangeFlagConf = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
$height: 24px;
.changingArea {
  font-size: $dialog_fontSize;
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
    }
  }
  input[type='password'],
  input[type='text'] {
    border: 1px solid $light-gray;
    border-radius: 3px;
    width: 260px;
    &.yellow {
      background-color: $dialog_yellow;
    }
  }
  .borderBottom {
    border-bottom: 1px solid $gray;
  }
  ul {
    &.lists {
      padding-left: 20px;
      width: 240px;
      li {
        font-size: 0.65rem;
      }
    }
  }
  label {
    background-color: $view_Title_background_Blue;
    width: 160px;
    height: $height;
    text-align: center;
    display: block;
  }
  .buttomArrow {
    height: 60px;
    text-indent: -9999px;
    background: url('@/assets/buttomArrow.png') no-repeat center center;
  }
  .small {
    font-size: 0.85rem;
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
}
</style>
