<template>
  <v-dialog v-model="dialogFlag" width="500">
    <v-card class="pa-2" id="dialogKikantuika">
      <v-card-title class="text-h5"> {{ dateTitle }} </v-card-title>
      <v-container>
        <v-btn
          elevation="2"
          icon
          small
          absolute
          top
          right
          @click="dialogFlag = false"
          color="secondary"
          ><v-icon dark small> mdi-close </v-icon></v-btn
        >

        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="3">
            <v-card elevation="0">{{ dateStart }} </v-card>
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
          <v-col cols="3" class="flex-grow-0 flex-shrink-0">
            {{ dateName }}
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="病院名を入力"
              class="mx-auto mt-n5"
              :value="byouinName"
              v-model="byouinName"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="3" class="flex-grow-0 flex-shrink-0">
            <v-card elevation="0">{{ dateEnd }} </v-card>
          </v-col>
          <v-col cols="9" class="flex-grow-0 flex-shrink-0 ml-2">
            <v-card class="pa-0" elevation="0">
              <datepicker
                :language="ja"
                class="input_picker"
                :format="DatePickerFormat"
                :value="taiinbi"
                :clear-button="true"
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
          <v-btn @click="kikantuika_dialog_delete()" tile outlined>
            削除
          </v-btn>
        </v-card>
        <v-card elevation="0" class="ml-1">
          <v-btn @click="kikantuika_dialog_clear()" tile outlined>
            クリア
          </v-btn>
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
import { KobetsuNyutai } from '@backend/api/KobetsuNyutai';

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
      dateTitle: '',
      dateStart: '',
      dateEnd: '',
      dateName: '',
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    /****************
     * 削除ボタンを押下
     */
    kikantuika_dialog_delete() {
      if (
        confirm(
          '日付データの削除を行います。\n削除データは復旧できません。\nよろしいですか？'
        )
      ) {
        this.registData = {
          type: this.type, // nyutaiin や gaihaku等
          selectKey: this.selectKey, // nyuutaiinやgaihakuの配列のキー
        };
        this.$emit('kikantuika_dialog_delete');
        this.dialogFlag = false;
      }
    },
    /***********
     * クリアボタンを押下
     */
    kikantuika_dialog_clear() {
      this.nyuuinbi = '';
      this.taiinbi = '';
      this.nyuuinbiShiseturiyo = '';
      this.nyuuinbiBreakfast = '';
      this.nyuuinbiLunch = '';
      this.nyuuinbiDinner = '';
      this.taiinbiShiseturiyo = '';
      this.taiinbiBreakfast = '';
      this.taiinbiLunch = '';
      this.taiinbiDinner = '';
      this.taiinbiAida = '';
      this.byouinName = '';
    },
    /*************
     * 登録ボタンを押下
     */
    kikantuika_dialog_regist() {
      let nyuuinbi = moment(this.nyuuinbi).format('YYYY-M-D');
      let taiinbi = '';
      let taiinbi_notFlag = false;
      if (this.taiinbi) {
        taiinbi = moment(this.taiinbi).format('YYYY-M-D');
        let diff = moment(this.taiinbi).diff(moment(this.nyuuinbi));
        if (diff < 0 || !this.nyuuinbi) {
          alert('日付の指定に誤りがあります。');
          return false;
        }
      } else {
        taiinbi_notFlag = true;
      }
      this.registData = {
        type: this.type, // nyutaiin や gaihaku等
        selectKey: this.selectKey, // nyuutaiinやgaihakuの配列のキー
        nyuuinbi: nyuuinbi,
        taiinbi: taiinbi,
        taiinbi_notFlag: taiinbi_notFlag,
        nyuuinbiShiseturiyo: this.nyuuinbiShiseturiyo,
        nyuuinbiBreakfast: this.nyuuinbiBreakfast,
        nyuuinbiLunch: this.nyuuinbiLunch,
        nyuuinbiDinner: this.nyuuinbiDinner,
        taiinbiShiseturiyo: this.taiinbiShiseturiyo,
        taiinbiBreakfast: this.taiinbiBreakfast,
        taiinbiLunch: this.taiinbiLunch,
        taiinbiDinner: this.taiinbiDinner,
        taiinbiAida: this.taiinbiAida,
        byouinName: this.byouinName,
      };

      // ここでAPIで登録処理を行う想定

      this.$emit('kikantuika_dialog_regist');
      this.dialogFlag = false;
    },
    parentFromOpenDialog(params, type) {
      this.kikantuika_dialog_clear();
      if (type == 'nyutaiin_add') {
        this.dateStart = '入院日';
        this.dateEnd = '退院日';
        this.dateTitle = '入退院情報登録';
        this.dateName = '病院名';
      } else {
        this.dateStart = '開始日';
        this.dateEnd = '終了日';
        this.dateTitle = '外泊情報登録';
        this.dateName = '外泊先';
      }
      this.dialogFlag = true;
      this.type = type;
      if (typeof params === 'object') {
        let args = {};
        args = {
          getkbn: 0,
          riid: params.riid,
          kbn: params.kbn,
          ngsymd: params.ngsymd,
          rendo: params.rend,
        };
        KobetsuNyutai(args).then((result) => {
          this.nyuuinbi = moment(
            result.ngsymd + '00:00:00',
            'YYYY-MM-DD'
          ).format('YYYY-MM-DD');
          this.byouinName = result.byoinname;
          this.nyuuinbiShiseturiyo = '';
          this.nyuuinbiBreakfast = result.ssyoku1;
          this.nyuuinbiLunch = result.ssyoku2;
          this.nyuuinbiDinner = result.ssyoku3;
          this.nyuuinbiAida = result.ssyoku4;
          this.taiinbi = moment(
            result.ngeymd + '00:00:00',
            'YYYY-MM-DD'
          ).format('YYYY-MM-DD');
          this.taiinbiShiseturiyo = '';
          this.taiinbiBreakfast = result.ssyoku1;
          this.taiinbiLunch = result.ssyoku2;
          this.taiinbiDinner = result.ssyoku3;
          this.taiinbiAida = result.ssyoku4;
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#dialogKikantuika {
  .input_picker {
    width: fit-content;
    display: inline-block;
    position: relative;

    .vdp-datepicker__clear-button {
      position: absolute;
      top: 0;
      left: auto;
      right: -55px;
      width: 50px;
      border: 1px solid #ccc;
      padding: 1px 0px;
      text-align: center;
      span {
        display: none;
      }
      &:hover {
        background-color: #ddd;
      }
      &:after {
        content: 'クリア';
        font-size: 12px;
      }
    }
  }
}
</style>
