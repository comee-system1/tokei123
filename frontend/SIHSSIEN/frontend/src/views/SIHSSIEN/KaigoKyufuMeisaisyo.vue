<template>
  <div id="kojinRireki">
    <v-container no-gutters fluid class="pa-1">
      <v-row no-gutters>
        <v-col>aaa</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="leftArea pb-1">
          <!-- 左側エリア -->
          <user-list
            ref="user_list"
            :dispHideBar="false"
            :headerheight="60"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col class="ml-1 pa-1 pt-0" style="min-width: 700px">
          ssssssssssss
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import dayjs from 'dayjs';
// import 'dayjs/locale/ja';
import UserList from '../../components/UserListKyufu.vue';

export default {
  props: {},
  components: {
    UserList,
  },
  data() {
    return {};
  },
  mounted() {},

  watch: {},
  methods: {
    /*****************************
     * ユーザリスト
     ****************************/
    //利用者名 出力
    setUserSelectPoint(row) {
      console.log(row);
      this.userName = row.names;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#kojinRireki {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
    height: 100%;
  }
}
</style>
