<template>
  <v-dialog v-model="dialogFlag" width="500">
    <v-card class="pa-2">
      <v-card-title class="text-h5"> 変動情報登録 </v-card-title>
      <v-card class="d-flex" flat>
        <v-card class="pa-2" elevation="0">
          <v-btn-toggle mandatory color="black">
            <v-btn depressed small block :width="100">入退院</v-btn>
            <v-btn depressed small block :width="100">外泊</v-btn>
          </v-btn-toggle>
        </v-card>
      </v-card>

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
              ></datepicker>
              <v-card class="d-flex mb-6" color="lighten-2" flat tile>
                <v-card class="pa-0" elevation="0">
                  <v-radio-group row class="mt-1"
                    >施設の利用
                    <v-radio label="あり" value="radio-1"></v-radio>
                    <v-radio label="なし" value="radio-2"></v-radio>
                  </v-radio-group>
                </v-card>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-n6 mx-auto">
          <v-col cols="3" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0" min-height="30">食事 </v-card>
          </v-col>
          <v-col cols="9" class="mt-n5 mx-auto">
            <v-card class="d-flex" elevation="0">
              <v-card elevation="0">
                <v-checkbox label="朝食" value="朝食" hide-details></v-checkbox>
              </v-card>
              <v-card elevation="0">
                <v-checkbox label="昼食" value="昼食" hide-details></v-checkbox>
              </v-card>
              <v-card elevation="0">
                <v-checkbox label="夕食" value="夕食" hide-details></v-checkbox>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-3">
          <v-col cols="3" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0">病院名 </v-card>
          </v-col>
          <v-col cols="9">
            <v-card elevation="0">
              <v-text-field
                label="病院名を入力"
                class="mt-n4 mx-auto"
              ></v-text-field>
            </v-card>
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
              ></datepicker>
              <v-card class="d-flex mb-6" color="lighten-2" flat tile>
                <v-card class="pa-0" elevation="0">
                  <v-radio-group row class="mt-1"
                    >施設の利用
                    <v-radio label="あり" value="radio-1"></v-radio>
                    <v-radio label="なし" value="radio-2"></v-radio>
                  </v-radio-group>
                </v-card>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="flex-wrap: nowrap" class="mt-n6 mx-auto">
          <v-col cols="3" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0" min-height="30">食事 </v-card>
          </v-col>
          <v-col cols="9" class="mt-n5 mx-auto">
            <v-card class="d-flex" elevation="0">
              <v-card elevation="0">
                <v-checkbox label="朝食" value="朝食" hide-details></v-checkbox>
              </v-card>
              <v-card elevation="0">
                <v-checkbox label="昼食" value="昼食" hide-details></v-checkbox>
              </v-card>
              <v-card elevation="0">
                <v-checkbox label="夕食" value="夕食" hide-details></v-checkbox>
              </v-card>
            </v-card>
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
          <v-btn @click="dialogFlag = false" tile outlined> 登録 </v-btn>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
export default {
  data() {
    return {
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      dialogFlag: false,
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    parentFromOpenDialog() {
      this.dialogFlag = true;
    },
  },
};
</script>

<style scoped>
</style>