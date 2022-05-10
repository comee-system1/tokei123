<template>
  <div id="tajyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :receptFlag="false"
    ></header-services>

    <v-container fluid class="jijyougen-container">
      <v-row>
        <v-col cols="8">
          <v-tabs height="30" v-model="tab" @change="tabChange">
            <v-tab class="text-caption" href="#recept">レセプト集計</v-tab>
            <v-tab class="text-caption" href="#TajyougenkanriJimsyo"
              >他上限管理事業所入力</v-tab
            >
            <v-tab class="text-caption" href="#JijyougenkanriJimsyo"
              >自上限管理事業所入力</v-tab
            >
          </v-tabs>
        </v-col>
        <v-col>
          <v-row no-gutters>
            <v-col cols="3"><v-btn small class="w-100">確定登録</v-btn></v-col>
            <v-col cols="3"><v-btn small class="w-100">確定解除</v-btn></v-col>
            <v-col cols="6*" align="right"
              ><v-btn @click="recept_reflect">レセプトへ反映</v-btn></v-col
            >
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" style="width: 800px">
          <v-row class="mt-0">
            <v-col cols="6" class="pt-1">
              <v-row>
                <v-col cols="2">
                  <label class="serach">利用者</label>
                </v-col>
                <v-col>
                  <wj-combo-box
                    :items-source="riyosyaCombo"
                    class="ml-1 w-100"
                  ></wj-combo-box>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-1">
              <v-row>
                <v-col cols="3">
                  <label class="serach">上限管理事</label>
                </v-col>
                <v-col>
                  <wj-combo-box
                    :items-source="jyougenkanriCombo"
                    class="ml-1 w-100"
                  ></wj-combo-box>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="6" class="pt-1">
              <v-row>
                <v-col cols="2">
                  <label class="serach">ソート</label>
                </v-col>
                <v-col>
                  <v-row no-gutters class="mt-1">
                    <v-col>
                      <v-card
                        class="text-center"
                        @click="sort(1)"
                        outlined
                        tile
                      >
                        カナ
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card class="text-center" @click="sort(1)" outlined tile
                        >コード</v-card
                      >
                    </v-col>
                    <v-col>
                      <v-card class="text-center" @click="sort(1)" outlined tile
                        >受給者番号</v-card
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-1">
              <v-row>
                <v-col cols="3">
                  <label class="serach">絞込</label>
                </v-col>
                <v-col>
                  <v-row no-gutters class="mt-1">
                    <v-col>
                      <v-card
                        class="text-center"
                        @click="filter(1)"
                        outlined
                        tile
                      >
                        全員
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card
                        class="text-center"
                        @click="filter(1)"
                        outlined
                        tile
                        >上限管理済</v-card
                      >
                    </v-col>
                    <v-col>
                      <v-card
                        class="text-center"
                        @click="filter(1)"
                        outlined
                        tile
                        >未処理</v-card
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-btn class="mt-5">検索</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1">
        <v-col cols="4">
          <v-btn
            small
            v-for="str in alphabet"
            :key="str"
            class="pa-0"
            outlined
            min-width="30"
            @click="onAlphabet(str)"
          >
            {{ str }}
          </v-btn>
        </v-col>
        <v-col cols="6">
          ※<span class="blue--text">青字</span
          >：上限額管理事業所が同一法人で別事業所の場合
        </v-col>
        <v-col class="text-right">
          <v-btn x-small>全選択</v-btn>
          <v-btn x-small class="ml-1">全解除</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="container">
      <div v-if="receptFlag">Tab 1 Content</div>
      <div v-if="TajyougenkanriJimsyoFlag">
        <recept-tajougen ref="tajougenChild"></recept-tajougen>
      </div>
      <div v-if="JijyougenkanriJimsyoFlag">Tab 3 Content</div>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import ReceptTajougen from '../components/ReceptTajougen.vue';

const riyosyaCombo = ['全員'];
const jyougenkanriCombo = ['指定なし'];

const alphabet = [
  '全',
  'ア',
  'カ',
  'サ',
  'タ',
  'ナ',
  'ハ',
  'マ',
  'ヤ',
  'ラ',
  'ワ',
];

export default {
  data() {
    return {
      alphabet: alphabet,
      year: moment().year(),
      riyosyaCombo: riyosyaCombo,
      jyougenkanriCombo: jyougenkanriCombo,
      tab: 'TajyougenkanriJimsyo', // タブの初期状態
      receptFlag: false, // receptの初期表示状態
      TajyougenkanriJimsyoFlag: true, // TajyougenkanriJimsyoFlagの初期表示状態
      JijyougenkanriJimsyoFlag: false, // JijyougenkanriJimsyoFlagの初期表示状態
    };
  },
  components: {
    HeaderServices,
    ReceptTajougen,
  },
  methods: {
    /********:
     * レセプトへ反映ボタン
     */
    recept_reflect: function () {
      this.$refs.tajougenChild.parentReceptReflect();
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabet: function (key) {
      console.log(key);
    },
    /*****************
     * タブを切り替えた際の表示切替
     */
    tabChange: function () {
      this.receptFlag = false;
      this.TajyougenkanriJimsyoFlag = false;
      this.JijyougenkanriJimsyoFlag = false;
      if (this.tab == 'recept') this.receptFlag = true;
      if (this.tab == 'TajyougenkanriJimsyo')
        this.TajyougenkanriJimsyoFlag = true;
      if (this.tab == 'JijyougenkanriJimsyo')
        this.JijyougenkanriJimsyoFlag = true;
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#tajyougen {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px;
  label {
    &.serach {
      display: inline-block;
      font-weight: 700;
      width: 120px;
      margin-top: 5px;
    }
  }
  .w-100 {
    width: 100%;
  }
}
</style>