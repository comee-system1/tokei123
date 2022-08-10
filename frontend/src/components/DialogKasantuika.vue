<template>
  <v-dialog v-model="dialog_add_flag" width="500">
    <v-card class="pa-2" id="dialogKasantuika">
      <v-card-title> 個別加算追加登録 </v-card-title>
      <v-card class="d-flex justify-center" flat>
        <v-card class="pa-2" elevation="0">
          <v-select
            :items="addSelect"
            dense
            outlined
            height="25"
            hide-details="false"
            class="pa-0 selectCombobox"
          ></v-select>
        </v-card>
      </v-card>
      <v-container class="lighten-5">
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="dialog_add_flag = false"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >

        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">開始日</label></v-col>
          <v-col cols="10" class="pl-1">
            <datepicker
              :language="ja"
              :format="DatePickerFormat"
              class="input_picker"
              v-model="ksnsymd"
            ></datepicker>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">終了日</label></v-col>
          <v-col cols="10" class="pl-1">
            <datepicker
              :language="ja"
              :format="DatePickerFormat"
              class="input_picker"
              v-model="ksneymd"
            ></datepicker>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">単位数</label></v-col>
          <v-col cols="10" class="pl-1"> 30単位/日 </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">留意事項</label></v-col>
          <v-col cols="10" class="pl-1">
            <ol>
              <li>入所日(算定日)から30日を限度</li>
              <li>同一敷地外の病院に30日以上入院した場合は、再算定可能</li>
              <li>過去3ヶ月間に入所理由がないこと</li>
            </ol>
          </v-col>
        </v-row>

        <hr size="1" />

        <v-card class="d-flex mt-3" elevation="0">
          <v-card elevation="0" v-if="dialog_delete_flag">
            <v-btn @click="kasantuika_dialog_delete()" tile outlined>
              削除
            </v-btn>
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
import { getConnect } from '@connect/getConnect';
let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;

export default {
  props: [],
  data() {
    return {
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      dialog_add_flag: false,
      addSelect: [],
      selected: {},
      registData: {},
      dialog_delete_flag: true,
      ksnsymd: '',
      ksneymd: '',
    };
  },
  components: {
    Datepicker,
  },

  methods: {
    kasantuika_dialog_delete() {
      this.$emit('kasantuika_dialog_delete');
      this.dialog_add_flag = false;
    },
    kasantuika_dialog_regist() {
      //未選択時は一番上のデータを利用
      if (this.selected.name == undefined) {
        this.selected.name = this.addSelect[0];
      }
      this.registData = {
        selectName: this.selected.name,
        addType: 1, //1: 体制・個別に追加 2: 個別に追加
      };
      this.$emit('kasantuika_dialog_regist');
      this.dialog_add_flag = false;
    },
    parentFromOpenDialog(params, type) {
      // 今選択しているヘッダにあるサービス
      // 仕様の可否は仕様確認後
      // type:add(追加) type:taisei_kobetu type:kobetu 想定
      this.type = type;
      //削除ボタン表示可否
      if (type == 'add') {
        this.dialog_delete_flag = false;
      } else {
        this.dialog_delete_flag = true;
      }
      this.addSelect = ['入所時特別支援加算', '入所時特別支援加算2'];

      this.dialog_add_flag = true;

      params['uniqid'] = uniqid;
      params['traceid'] = traceid;
      return getConnect(this.$route.path + 'Kasan', params).then();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#dialogKasantuika {
  font-size: 12px;
  label {
    display: inline-block;
    margin-right: 2px;
    padding-top: 2px;
    background: #eee;
    border: none;
    height: 24px;
    width: 75px;
    text-align: center;
    line-height: 20px;
    &.w {
      width: 100%;
    }
  }
  .selectCombobox {
    max-width: 300px;
    height: 25px;
    font-size: 11px;
    width: 300px;
    border-bottom: 1px solid #ccc;
    div.v-input__slot {
      min-height: 25px;
      div.v-input__append-inner {
        margin-top: 0px;
      }
    }
  }
}
</style>
