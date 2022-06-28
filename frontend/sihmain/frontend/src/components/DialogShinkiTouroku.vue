<template>
  <v-dialog v-model="pearentFlag" width="500">
    <v-card class="pa-2" id="dialogShinkiTouroku">
      <v-card-title> 利用者台帳 新規利用者登録 </v-card-title>
      <v-btn
        elevation="2"
        icon
        small
        absolute
        top
        right
        @click="dialogFlag = false"
        color="secondary"
        ><v-icon dark small> mdi-close </v-icon>
      </v-btn>
      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="3">
            <v-card elevation="0">  </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              コード
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 150px"
            ></wj-combo-box>
            <v-btn
              elevation="2"
              height = "25"
              small
              class = "ml-5"
              @click="dialogFlag = false"
              >
              自動採番
              </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              氏名
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 250px"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              フリガナ
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 250px"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              生年月日
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 150px"
            ></wj-combo-box>
            <v-card-title class="dialogOld ml-3">
              <span class="mr-3 ">1</span>
              歳
              </v-card-title>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-2">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              性別
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-radio-group class="mt-0 pt-0">
              <v-radio label="男" :key="1" :value="1"></v-radio>
              <v-radio label="女" :key="2" :value="2"></v-radio>
              <v-radio label="適用不能" :key="0" :value="0"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "75"
            elevation="0"
            style="line-height: 75px;"
            >
              住所
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card
            elevation="0"
            class="mb-1"
            >
            〒
            <wj-combo-box
              style="width: 50px"
            ></wj-combo-box>
            -
            <wj-combo-box
              style="width: 60px"
            ></wj-combo-box>
            <v-btn
              elevation="2"
              height = "25"
              small
              class = "ml-5"
              @click="dialogFlag = false"
              >
              住所検索
              </v-btn>
            </v-card>
            <wj-combo-box
              style="width: 300px; height: 46px;"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              市町村
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 150px"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-1">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              連絡先①
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 150px"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-2">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              連絡先②
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 150px"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mb-3">
          <v-col cols="3" class="mr-1">
            <v-card 
            class="pl-1"
            height = "25"
            elevation="0"
            >
              有効開始
            </v-card>
          </v-col>
          <v-col cols="8">
            <wj-combo-box
              style="width: 150px"
            ></wj-combo-box>
          </v-col>
        </v-row>
      <hr size="1" />
        <v-card class="d-flex mt-3" elevation="0">
          <v-card elevation="0" v-if="dialog_delete_flag">
          </v-card>
          <v-card elevation="0" class="ml-1">
            <v-btn @click="dialog_add_flag = false" tile outlined>
              クリア
            </v-btn>
          </v-card>
          <v-card elevation="0" class="ml-auto">
            <v-btn @click="kasantuika_dialog_regist()" tile outlined>
              登録
            </v-btn>
          </v-card>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
export default {
  props: {},
  data() {
    return {
      pearentFlag: false,
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',

      // 入力された値
      codes: '',
      names: '',
      kana: '',
      birthymd: '',
      old: '',
      sex: 1,
      postcode: '',
      address: '',
      sityosonryaku: '',
      tell1: '',
      tell2: '',
      symd: '',
    };
  },
  components: {
    Datepicker,
  },

  methods: {
    open(jyukyusyadata) {
      console.log(jyukyusyadata); 
      this.pearentFlag = true;
    },
    ontextChanged: function (e) {
      this.selected = {
        name: this.addSelect[e.selectedIndex],
      };
    },
  },
};
</script>

<style lang="scss" scope>
  @import '@/assets/scss/common.scss';
  #dialogShinkiTouroku {
    input.wj-form-control {
      min-height: initial;
      height: 25px;
    }
    .dialogOld {
      display: inline-block;
      font-size: 16px;
      line-height: initial;
      padding: 0;
      span {
        width: 55px;
        display: inline-block;
        text-align: center;
        height: 25px;
        line-height: 25px;
      }
    }
    .v-input--selection-controls {
      .v-radio {
        margin-right: 8px;
      }
    }
    .v-input--selection-controls__input {
      margin-right: 4px;
    }
    .v-input--radio-group__input {
      flex-direction: initial;
      align-items: flex-start;
    }
  }
</style>