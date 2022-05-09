<template>
  <v-dialog v-model="dialog_add_flag" width="500">
    <v-card class="pa-2">
      <v-card-title> 個別加算追加登録 </v-card-title>
      <v-card class="d-flex justify-center" flat>
        <v-card class="pa-2" elevation="0">
          <wj-combo-box
            :items-source="addSelect"
            :selectedIndexChanged="ontextChanged"
          ></wj-combo-box>
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
        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="4" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0">開始日 </v-card>
          </v-col>
          <v-col cols="8">
            <v-card elevation="0">
              <datepicker
                :language="ja"
                :format="DatePickerFormat"
                class="input_picker"
              ></datepicker>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-1">
          <v-col cols="4">
            <v-card elevation="0">終了日 </v-card>
          </v-col>
          <v-col cols="8">
            <v-card elevation="0">
              <datepicker
                :language="ja"
                :format="DatePickerFormat"
                class="input_picker"
              ></datepicker>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-5 mx-auto">
          <v-col cols="4">
            <v-card elevation="0">単位数 </v-card>
          </v-col>
          <v-col cols="8"> 30単位/日 </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-3">
          <v-col cols="4" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0">留意事項 </v-card>
          </v-col>
          <v-col cols="8">
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
            <v-btn @click="dialog_add_flag = false" tile outlined> 削除 </v-btn>
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
  props: [],
  data() {
    return {
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      dialog_add_flag: false,
      addSelect: '',
      selected: {},
      registData: {},
      dialog_delete_flag: true,
    };
  },
  components: {
    Datepicker,
  },

  methods: {
    ontextChanged: function (e) {
      this.selected = {
        name: this.addSelect[e.selectedIndex],
      };
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
    parentFromOpenDialog(kasanid, type) {
      // 今選択しているヘッダにあるサービス
      // 仕様の可否は仕様確認後
      console.log(kasanid);
      if (type == 'add') {
        this.dialog_delete_flag = false;
      } else {
        this.dialog_delete_flag = true;
      }
      this.addSelect = ['入所時特別支援加算', '入所時特別支援加算2'];

      this.dialog_add_flag = true;
    },
  },
};
</script>

<style scoped>
</style>