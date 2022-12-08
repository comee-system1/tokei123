<template>
  <div id="kaigokyufumeisai">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
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
import HeaderServices from '../../components/HeaderServices.vue';

export default {
  props: {},
  components: {
    UserList,
    HeaderServices,
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
div#kaigokyufumeisai {
  color: $font_color;
  font-size: 14px;
  min-width: 1300px !important;

  .service-selection {
    label {
      width: 80px !important;
      display: inline-block;
      margin-right: 0px !important;
      background-color: $deepgreen;
      color: $white;
      text-align: center;
    }
  }

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
    height: 100%;
  }
}
</style>
