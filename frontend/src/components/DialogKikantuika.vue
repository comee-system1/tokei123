<template>
  <v-dialog v-model="dialogFlag" width="500">
    <v-card class="pa-2">
      <v-card-title class="text-h5"> 変動情報登録 </v-card-title>
      <!-- <v-card class="d-flex" flat>
        <v-card class="pa-2" elevation="0">
          <v-btn-toggle mandatory color="black">
            <v-btn depressed small block :width="100">入退院</v-btn>
            <v-btn depressed small block :width="100">外泊</v-btn>
          </v-btn-toggle>
        </v-card>
      </v-card> -->

      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="3">
            <v-card elevation="0">入院日 </v-card>
          </v-col>
          <v-col cols="9" class="ml-2">
            <v-card class="pa-0" elevation="0">
              <datepicker
                :language="ja"
                class="input_picker"
                :format="DatePickerFormat"
                :value="nyuuinbi"
                v-model="nyuuinbi"
              ></datepicker>
              <v-card class="d-flex" flat tile>
                <v-card elevation="0">
                  <v-radio-group row v-model="nyuuinbiShiseturiyo"
                    >施設の利用
                    <v-radio
                      label="あり"
                      :key="1"
                      :value="1"
                      class="ml-2"
                    ></v-radio>
                    <v-radio label="なし" :key="0" :value="0"></v-radio>
                  </v-radio-group>
                </v-card>
              </v-card>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters style="flex-wrap: nowrap" class="mx-auto">
          <v-col cols="3" class="mt-5">食事 </v-col>
          <v-col cols="9" class="mx-auto">
            <v-row>
              <v-col
                ><v-checkbox
                  label="朝食"
                  v-model="nyuuinbiBreakfast"
                  input-value="true"
                ></v-checkbox
              ></v-col>
              <v-col
                ><v-checkbox
                  label="昼食"
                  v-model="nyuuinbiLunch"
                  input-value="true"
                ></v-checkbox
              ></v-col>
              <v-col
                ><v-checkbox
                  label="夕食"
                  v-model="nyuuinbiDinner"
                  input-value="true"
                ></v-checkbox
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-3">
          <v-col cols="3" class="flex-grow-0 flex-shrink-0"> 病院名 </v-col>
          <v-col cols="9">
            <v-text-field
              label="病院名を入力"
              class="mx-auto mt-n5"
              :value="byouinName"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="3" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0">退院日 </v-card>
          </v-col>
          <v-col cols="9" class="flex-grow-0 flex-shrink-0 ml-2">
            <v-card class="pa-0" elevation="0">
              <datepicker
                :language="ja"
                class="input_picker"
                :format="DatePickerFormat"
                :value="taiinbi"
                v-model="taiinbi"
              ></datepicker>
              <v-card class="d-flex" color="lighten-2" flat tile>
                <v-card class="pa-0" elevation="0">
                  <v-radio-group row v-model="taiinbiShiseturiyo"
                    >施設の利用
                    <v-radio
                      label="あり"
                      :key="1"
                      :value="1"
                      class="ml-2"
                    ></v-radio>
                    <v-radio label="なし" :key="0" :value="0"></v-radio>
                  </v-radio-group>
                </v-card>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mx-auto">
          <v-col cols="3" class="mt-5">食事 </v-col>
          <v-col cols="9" class="mx-auto">
            <v-row>
              <v-col
                ><v-checkbox
                  label="朝食"
                  v-model="taiinbiBreakfast"
                  input-value="true"
                ></v-checkbox
              ></v-col>
              <v-col
                ><v-checkbox
                  label="昼食"
                  v-model="taiinbiLunch"
                  input-value="true"
                ></v-checkbox
              ></v-col>
              <v-col
                ><v-checkbox
                  label="夕食"
                  v-model="taiinbiDinner"
                  input-value="true"
                ></v-checkbox
              ></v-col>
              <v-col
                ><v-checkbox
                  label="間"
                  v-model="taiinbiAida"
                  input-value="true"
                ></v-checkbox
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <hr size="1" />

      <v-card class="d-flex mt-3" elevation="0">
        <v-card elevation="0">
          <v-btn @click="dialogFlag = false" tile outlined> 削除 </v-btn>
        </v-card>
        <v-card elevation="0" class="ml-1">
          <v-btn @click="dialogFlag = false" tile outlined> クリア </v-btn>
        </v-card>
        <v-card elevation="0" class="ml-auto">
          <v-btn @click="kikantuika_dialog_regist()" tile outlined>
            登録
          </v-btn>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
export default {
  data() {
    return {
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      dialogFlag: false,
      nyuuinbi: '',
      byouinName: '',
      taiinbi: '',
      nyuuinbiShiseturiyo: 1,
      nyuuinbiBreakfast: false,
      nyuuinbiLunch: false,
      nyuuinbiDinner: false,
      taiinbiShiseturiyo: 1,
      taiinbiBreakfast: false,
      taiinbiLunch: false,
      taiinbiDinner: false,
      taiinbiAida: false,
      registData: {},
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    /*************
     * 登録ボタンを押下
     */
    kikantuika_dialog_regist: function () {
      this.registData = {
        selectKey: this.selectKey,
        nyuuinbi: moment(this.nyuuinbi).format('YYYY-M-D'),
        taiinbi: moment(this.taiinbi).format('YYYY-M-D'),
        nyuuinbiShiseturiyo: this.nyuuinbiShiseturiyo,
        nyuuinbiBreakfast: this.nyuuinbiBreakfast,
        nyuuinbiLunch: this.nyuuinbiLunch,
        nyuuinbiDinner: this.nyuuinbiDinner,
        taiinbiShiseturiyo: this.taiinbiShiseturiyo,
        taiinbiBreakfast: this.taiinbiBreakfast,
        taiinbiLunch: this.taiinbiLunch,
        taiinbiDinner: this.taiinbiDinner,
        taiinbiAida: this.taiinbiAida,
      };
      this.$emit('kikantuika_dialog_regist');
      this.dialogFlag = false;
    },

    parentFromOpenDialog(data) {
      this.dialogFlag = true;
      this.selectKey = data ? data.selectKey : '';
      this.nyuuinbi = data ? data.nyuuinbi : '';
      this.byouinName = data ? data.byouinName : '';
      this.taiinbi = data ? data.taiinbi : '';
      this.nyuuinbiShiseturiyo = data ? data.nyuuinbiShiseturiyo : 0;
      this.nyuuinbiBreakfast = data ? data.nyuuinbiBreakfast : 0;
      this.nyuuinbiLunch = data ? data.nyuuinbiLunch : 0;
      this.nyuuinbiDinner = data ? data.nyuuinbiDinner : 0;
      this.taiinbiShiseturiyo = data ? data.taiinbiShiseturiyo : 0;
      this.taiinbiBreakfast = data ? data.taiinbiBreakfast : 0;
      this.taiinbiLunch = data ? data.taiinbiLunch : 0;
      this.taiinbiDinner = data ? data.taiinbiDinner : 0;
      this.taiinbiAida = data ? data.taiinbiAida : 0;
    },
  },
};
</script>

<style scoped>
</style>