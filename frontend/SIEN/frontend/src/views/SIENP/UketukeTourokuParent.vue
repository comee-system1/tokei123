<template>
  <div id="uketukeTourokuParent">
    <v-container no-gutters fluid class="container ml-1 pa-0">
      <v-row no-gutters>
        <v-col class="centerArea">
          <!-- 中央エリア -->
          <UketukeTouroku
            :userData="userDataSelect"
            :dispTab="'Keikakusoudan'"
          ></UketukeTouroku>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UketukeTouroku from '../../components/UketukeTouroku.vue';

export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UketukeTouroku,
  },
  data() {
    return {
      tantouData: {
        name: '大正　雅夫',
        code: '1111111',
      },
      userListComponentDatas: [], // ユーザー一覧データ
      userDataSelect: {}, // ユーザ一覧から選択した値
    };
  },
  created: function () {
    // 初期ユーザ検索
  },
  watch: {
    selectedData() {
      // ここでユーザ検索処理する
    },
  },
  methods: {
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectUserChildComponent(data) {
      this.userListComponentDatas = data;
    },
    // 左メニューのユーザ一覧からユーザーを選択したとき、メイン画面に選択値を表示する
    setUserSelectPoint(dataitem) {
      this.userDataSelect = dataitem;
    },
  },
};
</script>

<style  lang="scss">
</style>
