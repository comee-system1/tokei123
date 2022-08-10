<template>
  <v-dialog v-model="dialogFlag" width="500">
    <v-card class="pa-2" id="dialogKikantuika">
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
        <v-card-title class="pa-2"> {{ dateTitle }} </v-card-title>

        <v-row no-gutters class="ma-2">
          <v-col cols="2"
            ><label class="w">{{ dateStart }}</label></v-col
          >
          <v-col cols="10" class="pl-1">
            <datepicker
              :language="ja"
              class="input_picker"
              :format="DatePickerFormat"
              :value="ngsymd"
              v-model="ngsymd"
            ></datepicker>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">施設の利用</label></v-col>
          <v-col cols="10" class="pl-1">
            <v-btn-toggle>
              <v-btn
                small
                v-for="val in riyobutton"
                :key="val.key"
                :value="val.key"
                v-model="riyoStart[val.key]"
                height="25"
                >{{ val.value }}</v-btn
              >
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">食事</label></v-col>
          <v-col cols="10" class="pl-1">
            <v-btn-toggle multiple>
              <v-btn
                small
                v-for="val in mealStart"
                :key="val.key"
                :value="val.value"
                v-model="mealStartSelect[val.key]"
                height="25"
                >{{ val.name }}</v-btn
              >
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">病院名</label></v-col>
          <v-col cols="10" class="pl-1">
            <v-text-field
              dense
              hide-details="false"
              height="20"
              :value="byoinname"
              v-model="byoinname"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"
            ><label class="w">{{ dateEnd }} </label></v-col
          >
          <v-col cols="10" class="pl-1">
            <datepicker
              :language="ja"
              class="input_picker"
              :format="DatePickerFormat"
              :value="ngeymd"
              :clear-button="true"
              v-model="ngeymd"
            ></datepicker>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">施設の利用</label></v-col>
          <v-col cols="10" class="pl-1">
            <v-btn-toggle>
              <v-btn
                small
                v-for="val in riyobutton"
                :key="val.key"
                :value="val.key"
                height="25"
                v-model="riyoEnd[val.key]"
                >{{ val.value }}</v-btn
              >
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">食事</label></v-col>
          <v-col cols="10" class="pl-1">
            <v-btn-toggle multiple>
              <v-btn
                small
                v-for="val in mealEnd"
                :key="val.key"
                :value="val.value"
                height="25"
                v-model="mealEndSelect[val.key]"
                >{{ val.name }}</v-btn
              >
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-2">
          <v-col cols="2"><label class="w">外泊先</label></v-col>
          <v-col cols="10" class="pl-1">
            <v-text-field
              dense
              hide-details="false"
              height="20"
              :value="gaihaku"
              v-model="gaihaku"
            ></v-text-field>
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

import { getConnect } from '@connect/getConnect';
let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;

export default {
  data() {
    return {
      pageTitle: this.$route.name,
      ja: ja,
      DatePickerFormat: 'yyyy年MM月dd日',
      dialogFlag: false,
      ngsymd: '',
      ngeymd: '',
      byoinname: '',
      gaihaku: '',
      negymd: '',
      riyoStart: [],
      riyoEnd: [],
      registData: {},
      getApiData: [],
      riyobutton: [
        {
          key: 1,
          value: 'あり',
        },
        {
          key: 0,
          value: 'なし',
        },
      ],
      mealStartSelect: [],
      mealStart: [
        {
          key: 'ssyoku1',
          value: '1',
          name: '朝食',
        },
        {
          key: 'ssyoku2',
          value: '2',
          name: '昼食',
        },
        {
          key: 'ssyoku3',
          value: '3',
          name: '夕食',
        },
        {
          key: 'ssyoku4',
          value: '4',
          name: '間食',
        },
      ],
      mealEndSelect: [],
      mealEnd: [
        {
          key: 'esyoku1',
          value: '1',
          name: '朝食',
        },
        {
          key: 'esyoku2',
          value: '2',
          name: '昼食',
        },
        {
          key: 'esyoku3',
          value: '3',
          name: '夕食',
        },
        {
          key: 'esyoku4',
          value: '4',
          name: '間食',
        },
      ],

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
      this.ngsymd = '';
      this.negymd = '';
      this.byoinname = '';
      this.gaihaku = '';
    },
    /*************
     * 登録ボタンを押下
     */
    kikantuika_dialog_regist() {
      console.log(this.mealStartSelect);
      console.log(this.mealEndSelect);
      console.log(moment(this.ngsymd).format('YYYY-M-D'));
      console.log(moment(this.egsymd).format('YYYY-M-D'));
      console.log(this.byoinname);
      console.log(this.gaihaku);
      console.log(this.getApiData);

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
      params['uniqid'] = uniqid;
      params['traceid'] = traceid;
      // 追加時はapiを利用しない
      // データの編集時はif文の中でapiを利用する
      if (typeof params === 'object') {
        return getConnect(this.$route.path + 'Nyutai', params).then(
          (result) => {
            this.getApiData = result;
            // 入院日
            this.ngsymd = moment(result.ngsymd).format('YYYY-MM-DD');
            // 退院日
            this.ngeymd = moment(result.ngeymd).format('YYYY-MM-DD');
            // 施設の利用設定
            this.riyoSelected(result);
            // 食事設定
            for (let i = 0; i < this.mealStart.length; i++) {
              let mkey = this.mealStart[i].key;
              this.mealStartSelect[mkey] = result[mkey] ? true : false;
            }
            for (let i = 0; i < this.mealEnd.length; i++) {
              let mkey = this.mealEnd[i].key;
              this.mealEndSelect[mkey] = result[mkey] ? true : false;
            }
            // 病院
            this.byoinname = result.byoinname;
            // 外泊
            this.gaihaku = result.gaihaku;
          }
        );
      }
    },

    // 施設の利用ボタン選択配列
    riyoSelected(result) {
      if (result.seikyu == 0) {
        this.riyoStart[1] = true;
        this.riyoEnd[1] = true;
      }
      if (result.seikyu == 1) {
        this.riyoStart[0] = true;
        this.riyoEnd[1] = true;
      }
      if (result.seikyu == 2) {
        this.riyoStart[0] = true;
        this.riyoEnd[1] = true;
      }
      if (result.seikyu == 3) {
        this.riyoStart[0] = true;
        this.riyoEnd[0] = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#dialogKikantuika {
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
