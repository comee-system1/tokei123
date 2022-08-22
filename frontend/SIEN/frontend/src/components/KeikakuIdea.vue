<template>
  <div id="keikakuIdea">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <user-list ref="user_list" :dispHideBar="true"> </user-list>
        <v-row no-gutters class="mt-1">
          <v-col cols="1">
            <v-card class="pr-2 text-center" elevation="0" tile>
              <label class="greyLabel">利用者名</label>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="pl-1" elevation="0" outlined tile> aaa </v-card>
          </v-col>
          <v-col cols="7">
            <v-row no-gutters class="justify-end">
              <v-col cols="2" align="center"
                ><label class="greyLabel">同意署名欄</label></v-col
              >
              <v-col cols="1" style="max-width: 25px" class="mt-1">
                <input type="checkbox" />
              </v-col>
              <v-col cols="2" align="center">
                <v-text-field
                  outlined
                  tile
                  value=""
                  hide-details="false"
                  height="24"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserList from './UserList.vue';
export default {
  props: {
    dispHideBar: Boolean,
  },
  components: {
    UserList,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuIdea {
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
  label.greyLabel {
    background-color: $selected_color;
    display: inline-block;
    width: 100px;
    height: 100%;
  }
  .input-text {
    div {
      height: 24px;
      min-height: 24px;
    }
  }
}
</style>
