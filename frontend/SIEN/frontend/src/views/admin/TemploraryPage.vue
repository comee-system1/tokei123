<template>
  <div>
    <p>TOUR</p>
    <div id="v-step-0">
      A DOM element on your page. The first step will pop on this element
      because its ID is 'v-step-0'.
    </div>
    <div class="v-step-1">
      A DOM element on your page. The second step will pop on this element
      because its ID is 'v-step-1'.
    </div>
    <div data-v-step="2">
      A DOM element on your page. The third and final step will pop on this
      element because its ID is 'v-step-2'.
    </div>

    <v-tour name="myTour" :steps="steps"></v-tour>
    <hr />
    <p>secret</p>
    {{ aaa }}
    {{ userName }}
  </div>
</template>

<script>
//import axios from 'axios';
import { reactive, effect } from 'vue';
export default {
  props: ['keycloak', 'userName'],
  components: {},
  data() {
    return {
      aaa: '',
      steps: [
        {
          target: '#v-step-0', // We're using document.querySelector() under the hood
          content: `簡単に管理者WEB画面のチュートリアルを行いましょう。必要のない場合は「終了」を選択してください。`,
          before: (type) =>
            new Promise((resolve, reject) => {
              console.log(type);
              console.log(reject);
              // Time-consuming UI/async operation here
              resolve('foo');
            }),
        },
        {
          target: '.v-step-1',
          content: 'An awesome plugin made with Vue.js!',
        },
        {
          target: '[data-v-step="2"]',
          content:
            "Try it, you'll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.",
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
      ],
    };
  },
  mounted() {
    this.$tours['myTour'].start();
    console.log('sss');
    console.log(this.keycloak);
    //this.aaa = this.keycloak;

    const reactiveObj = reactive(this.keycloak);

    effect(() => {
      //reactiveObj.b = reactiveObj.a * 10;
    });
    console.log(reactiveObj);
    this.aaa = reactiveObj;
    /*
    axios
      .get('http://localhost:3000/api/keycloak/list')
      .then(function (response) {
        console.log('aaa');
        console.log(response);
      })
      .catch(function (error) {
        console.log('api接続用サーバーに接続失敗。BACKENDの実行確認');
        console.log(error);
      });
      */
  },
  methods: {},
};
</script>
