<template>
  <div id="tajyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :receptFlag="false"
    ></header-services>

    <v-container fluid class="jijyougen-container">
      <v-row no-gutters>
        <v-col cols="8">
          <tab-menu-blue
            @parent_tab_menu="parent_tab_menu"
            :tabmenu="tabMenus"
          ></tab-menu-blue>
        </v-col>
        <v-col>
          <v-row no-gutters>
            <v-col cols="3"
              ><v-btn small class="w-100" @click="defineButton(1)"
                >確定登録</v-btn
              ></v-col
            >
            <v-col cols="3"
              ><v-btn small class="w-100" @click="defineButton(2)"
                >一括確定解除</v-btn
              ></v-col
            >
            <v-col cols="6*" align="right">
              <v-btn @click="recept_reflect" v-if="TajyougenkanriJimsyoFlag"
                >レセプトへ反映</v-btn
              >
              <v-btn @click="recept_calc" v-if="JijyougenkanriJimsyoFlag"
                >上限管理計算</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="pt-0 mt-0">
        <v-col cols="8">
          <v-row class="mt-0">
            <v-col cols="6" class="pt-1">
              <v-row>
                <v-col cols="2">
                  <label class="serach">利用者</label>
                </v-col>
                <v-col>
                  <wj-menu
                    :itemsSource="riyosyaCombo"
                    class="ml-1 w-100 customCombobox"
                    :selectedIndexChanged="onRiyosyaCombo"
                    :isRequired="true"
                    :displayMemberPath="'text'"
                    selectedValuePath="'key'"
                    header="全員"
                  ></wj-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="pt-1">
              <v-row>
                <v-col cols="3">
                  <label class="serach" v-if="TajyougenkanriJimsyoFlag"
                    >上限管理事</label
                  >
                  <label class="serach" v-if="JijyougenkanriJimsyoFlag"
                    >他サービス事</label
                  >
                </v-col>
                <v-col>
                  <wj-menu
                    v-if="TajyougenkanriJimsyoFlag"
                    :items-source="jyougenkanriCombo"
                    class="ml-1 w-100 customCombobox"
                    :selectedIndexChanged="onJyougenkanriCombo"
                    :isRequired="true"
                    :displayMemberPath="'text'"
                    selectedValuePath="'key'"
                    header="指定なし"
                  >
                  </wj-menu>

                  <wj-menu
                    v-if="JijyougenkanriJimsyoFlag"
                    :items-source="taServiceCombo"
                    class="ml-1 w-100 customCombobox"
                    :selectedIndexChanged="onJyougenkanriCombo"
                    :isRequired="true"
                    :displayMemberPath="'text'"
                    selectedValuePath="'key'"
                    header="指定なし"
                  ></wj-menu>
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
                        :class="{
                          'text-center': true,
                          grey: sortFlag.kanaFlag,
                          'lighten-2': sortFlag.kanaFlag,
                        }"
                        @click="sort(1)"
                        outlined
                        tile
                      >
                        カナ
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card
                        :class="{
                          'text-center': true,
                          grey: sortFlag.codeFlag,
                          'lighten-2': sortFlag.codeFlag,
                        }"
                        @click="sort(2)"
                        outlined
                        tile
                        >コード</v-card
                      >
                    </v-col>
                    <v-col>
                      <v-card
                        :class="{
                          'text-center': true,
                          grey: sortFlag.bangoFlag,
                          'lighten-2': sortFlag.bangoFlag,
                        }"
                        @click="sort(3)"
                        outlined
                        tile
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
                        @click="filter(1)"
                        outlined
                        tile
                        :class="{
                          'text-center': true,
                          grey: filterFlag.allFlag,
                          'lighten-2': filterFlag.allFlag,
                        }"
                      >
                        全員
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card
                        :class="{
                          'text-center': true,
                          grey: filterFlag.jyogenFlag,
                          'lighten-2': filterFlag.jyogenFlag,
                        }"
                        @click="filter(2)"
                        outlined
                        tile
                        >上限管理済</v-card
                      >
                    </v-col>
                    <v-col>
                      <v-card
                        :class="{
                          'text-center': true,
                          grey: filterFlag.misyoriFlag,
                          'lighten-2': filterFlag.misyoriFlag,
                        }"
                        @click="filter(3)"
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
        <v-col cols="2">
          <v-btn class="mt-5">検索</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-1">
        <v-col cols="4">
          <v-btn-toggle class="flex-wrap" mandatory>
            <v-btn
              small
              outlined
              v-for="(n, k) in alphabet"
              :key="n"
              :width="30"
              p-0
              style="min-width: auto"
              @click="onAlphabet(k)"
            >
              {{ n }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="6">
          <span v-if="TajyougenkanriJimsyoFlag"
            >※<span class="blue--text">青字</span
            >：上限額管理事業所が同一法人で別事業所の場合</span
          >
          <span v-if="JijyougenkanriJimsyoFlag"
            >※<span class="blue--text">青字</span
            >：登録済み他サービス事業所、サービス名称を表示</span
          >
        </v-col>
        <v-col class="text-right">
          <v-btn x-small @click="selectAll(1)">全選択</v-btn>
          <v-btn x-small @click="selectAll(0)" class="ml-1">全解除</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="container">
      <div v-if="receptFlag">Tab 1 Content</div>
      <div v-if="TajyougenkanriJimsyoFlag">
        <recept-tajougen ref="tajougenChild"></recept-tajougen>
      </div>
      <div v-if="JijyougenkanriJimsyoFlag">
        <recept-jijyougen ref="jijyougenChild"></recept-jijyougen>
      </div>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';
import ReceptTajougen from '../components/ReceptTajougen.vue';
import ReceptJijyougen from '../components/ReceptJijyougen.vue';
import TabMenuBlue from '../components/TabMenuBlue.vue';

const riyosyaCombo = [];
const jyougenkanriCombo = [];
const taServiceCombo = [];

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
      taServiceCombo: taServiceCombo,

      receptFlag: true, // receptの初期表示状態
      TajyougenkanriJimsyoFlag: false, // TajyougenkanriJimsyoFlagの初期表示状態
      JijyougenkanriJimsyoFlag: false, // JijyougenkanriJimsyoFlagの初期表示状態
      tabMenus: [
        { href: '#recept', text: 'レセプト集計' },
        { href: '#TajyougenkanriJimsyo', text: '他上限管理事業所入力' },
        { href: '#JijyougenkanriJimsyo', text: '自上限管理事業所入力' },
      ],
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
      filterFlag: { allFlag: true, jyogenFlag: false, misyoriFlag: false },
    };
  },
  components: {
    HeaderServices,
    ReceptTajougen,
    ReceptJijyougen,
    TabMenuBlue,
  },
  created() {
    // 利用者コンボボックス
    this.riyosyaCombo.push(
      {
        key: 1,
        text: '全員',
      },
      {
        key: 2,
        text: '今月入居者',
      },
      {
        key: 3,
        text: '今月退去者',
      }
    );
    // 上限管理事用コンボボックス
    this.jyougenkanriCombo.push(
      {
        key: 0,
        text: '指定なし',
      },
      {
        key: 1,
        text: '南山事務所0',
      },
      {
        key: 2,
        text: '南山事務所1',
      },
      {
        key: 3,
        text: '南山事務所2',
      },
      {
        key: 4,
        text: '南山事務所3',
      }
    );
    this.taServiceCombo.push(
      {
        key: 0,
        text: '指定なし',
      },
      {
        key: 1,
        text: 'ひまわり園0',
      },
      {
        key: 2,
        text: 'ひまわり園1',
      },
      {
        key: 3,
        text: 'ひまわり園2',
      },
      {
        key: 4,
        text: 'ひまわり園3',
      }
    );
  },
  methods: {
    /*********************
     * 上限管理事変更
     */
    onJyougenkanriCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        if (this.JijyougenkanriJimsyoFlag) {
          this.$refs.jijyougenChild.child_Jyougenkanriji(
            e.text,
            e.selectedIndex
          );
        } else {
          // 他上限管理事業所の関数を実行
          this.$refs.tajougenChild.child_Jyougenkanriji(
            e.text,
            e.selectedIndex
          );
        }
      }
    },
    /*********************
     * 利用者変更
     */
    onRiyosyaCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        if (this.JijyougenkanriJimsyoFlag) {
          this.$refs.jijyougenChild.child_Riyosya(e.text, e.selectedIndex);
        } else {
          // 他上限管理事業所の関数を実行
          this.$refs.tajougenChild.child_Riyosya(e.text, e.selectedIndex);
        }
      }
    },
    /**************
     * 子コンポーネントtabmenublueで選択した値を取得
     */
    parent_tab_menu(args) {
      this.receptFlag = false;
      this.TajyougenkanriJimsyoFlag = false;
      this.JijyougenkanriJimsyoFlag = false;
      if (args.selectTab == 'recept') {
        this.receptFlag = true;
      }
      if (args.selectTab == 'TajyougenkanriJimsyo') {
        this.TajyougenkanriJimsyoFlag = true;
      }
      if (args.selectTab == 'JijyougenkanriJimsyo') {
        this.JijyougenkanriJimsyoFlag = true;
      }
    },
    /***************
     * 確定登録・解除ボタン
     */
    defineButton(type) {
      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentDefineButton(type);
      } else {
        this.$refs.tajougenChild.parentDefineButton(type);
      }
    },
    /**************
     * 絞り込み
     */
    filter(type) {
      this.filterFlag.allFlag = false;
      this.filterFlag.jyogenFlag = false;
      this.filterFlag.misyoriFlag = false;
      if (type == 1) {
        this.filterFlag.allFlag = true;
      }
      if (type == 2) {
        this.filterFlag.jyogenFlag = true;
      }
      if (type == 3) {
        this.filterFlag.misyoriFlag = true;
      }

      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentFilter(type);
      } else {
        this.$refs.tajougenChild.parentFilter(type);
      }
    },
    /**************
     * 並び順変更
     */
    sort(type) {
      this.sortFlag.kanaFlag = false;
      this.sortFlag.codeFlag = false;
      this.sortFlag.bangoFlag = false;
      if (type == 1) {
        this.sortFlag.kanaFlag = true;
      }
      if (type == 2) {
        this.sortFlag.codeFlag = true;
      }
      if (type == 3) {
        this.sortFlag.bangoFlag = true;
      }

      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentSort(type);
      } else {
        this.$refs.tajougenChild.parentSort(type);
      }
    },
    /*********************
     * 全選択
     */
    selectAll(type) {
      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentSelectAll(type);
      } else {
        this.$refs.tajougenChild.parentSelectAll(type);
      }
    },
    /********:
     * レセプトへ反映ボタン
     */
    recept_reflect() {
      this.$refs.tajougenChild.parentReceptReflect();
    },
    /********:
     * 上限額管理計算へ反映ボタン
     */
    recept_calc() {
      this.$refs.jijyougenChild.parentReceptCalc();
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentAlphabet(key);
      } else {
        this.$refs.tajougenChild.parentAlphabet(key);
      }
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
div.customCombobox {
  .wj-btn.wj-btn-default {
    border-left: none !important;
  }
}
</style>