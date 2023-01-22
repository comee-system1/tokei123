<template>
  <div id="uketukeTourokuParent">
    <v-container no-gutters fluid class="container ml-1 pa-0">
      <v-row no-gutters>
        <v-col class="leftArea">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            @child-select="setUserSelectPoint"
            @child-user="getSelectUserChildComponent"
          >
          </user-list>
        </v-col>
        <v-col class="centerArea">
          <!-- 中央エリア -->
          <UketukeTouroku
            :userData="userDataSelect"
            :dispTab="'Kihonsoudan'"
          ></UketukeTouroku>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';
import UketukeTouroku from '../components/UketukeTouroku.vue';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';

export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UserList,
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
@import '@/assets/scss/common.scss';
div#uketukeTourokuParent {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  .leftArea {
    min-width: 275px;
    max-width: 275px;
    min-height: 450px;
    width: 275px;
    // border: thin solid;
  }

  .koumokuTitle {
    color: $font_color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    text-align: center;
    background: $view_Title_background;
    border: none;
  }
  .koumokuData {
    color: $font_color;
    display: flex;
    align-items: center;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuData_read {
    color: $font_color;
    width: 150px;
    height: 100%;
    text-align: center;
    background: $view_Data_Read_background;
    border: none;
  }
  .koumokuData_input {
    color: $font_color;
    width: 350px;
    height: 100%;
    text-align: left;
    background: $view_Data_Input_background;
    padding-top: 2px;
    padding-left: 2px;
  }

  .koumokuData_c {
    width: 280px;
    text-align: center;
    background: $view_Data_Read_background;
    border: none;
  }

  .rowStyle {
    height: 25px;
  }
}

#datepicker {
  position: absolute;
  margin-top: 40px;
  position: fixed !important;
  top: 80px;
  left: 1000px;
  width: auto;
  .v-picker {
    z-index: 10;
  }
  .v-picker__title {
    display: none !important;
  }
}
</style>
