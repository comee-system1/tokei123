<template>
  <div id="tajyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :receptFlag="false"
    ></header-services>

    <v-container fluid class="jijyougen-container mt-0 user-info">
      <v-row no-gutters>
        <v-col cols="9">
          <tab-menu-blue
            @parent_tab_menu="parent_tab_menu"
            :tabmenu="tabMenus"
          ></tab-menu-blue>

          <v-row class="mt-1" no-gutters>
            <label>利用者</label>
            <wj-menu
              :itemsSource="riyosyaCombo"
              class="ml-1 w-100 customCombobox"
              :itemClicked="onRiyosyaCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              header="全員"
              style="width: 270px"
            ></wj-menu>

            <label class="ml-1" v-if="TajyougenkanriJimsyoFlag"
              >上限管理事業所</label
            >
            <label class="ml-1" v-if="JijyougenkanriJimsyoFlag"
              >他サービス事業所</label
            >
            <wj-menu
              v-if="TajyougenkanriJimsyoFlag"
              :itemsSource="jyougenkanriCombo"
              class="ml-1 w-100 customCombobox"
              :selectedIndexChanged="onJyougenkanriCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              header="指定なし"
              style="width: 270px"
            >
            </wj-menu>

            <wj-menu
              v-if="JijyougenkanriJimsyoFlag"
              :itemsSource="taServiceCombo"
              class="ml-1 w-100 customCombobox"
              :itemClicked="onJyougenkanriCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              header="指定なし"
              style="width: 270px"
            ></wj-menu>

            <v-btn class="ml-2" small>検索</v-btn>
          </v-row>
          <v-row class="mt-1" no-gutters>
            <label>ソート</label>
            <v-btn-toggle class="flex-wrap ml-1" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px"
                @click="sort(1)"
              >
                カナ
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px"
                @click="sort(2)"
              >
                コード
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px"
                @click="sort(3)"
              >
                受給者番号
              </v-btn>
            </v-btn-toggle>

            <label class="ml-1">絞込</label>
            <wj-menu
              v-if="receptFlag"
              :itemsSource="receptCombo"
              class="ml-1 w-100 customCombobox"
              :itemClicked="onReceptCombo"
              :isRequired="true"
              :displayMemberPath="'text'"
              selectedValuePath="'key'"
              header="全員"
              style="width: 270px"
            ></wj-menu>
            <v-btn-toggle
              class="flex-wrap ml-1"
              mandatory
              v-if="receptFlag != true"
            >
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px"
                @click="filter(1)"
              >
                全員
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px"
                @click="filter(2)"
              >
                上限管理済
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px"
                @click="filter(3)"
              >
                未処理
              </v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row no-gutters>
            <v-col cols="6*" align="right">
              <v-btn @click="receptSyukei" v-if="receptFlag" small
                >レセプト集計</v-btn
              >
              <v-btn
                @click="recept_reflect"
                v-if="TajyougenkanriJimsyoFlag"
                small
                >レセプトへ反映</v-btn
              >
              <v-btn @click="recept_calc" v-if="JijyougenkanriJimsyoFlag" small
                >上限管理計算</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-row no-gutters>
                <v-col>
                  <v-btn small class="w-100" @click="defineButton(1)"
                    >確定登録</v-btn
                  >
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-1">
                <v-col>
                  <v-btn small class="w-100" @click="defineButton(2)"
                    >一括確定解除</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
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
          <wj-menu
            :header="'全選択/全解除'"
            :itemClicked="onselectedIndexChanged"
            style="width: auto"
          >
            <wj-menu-item>
              <b>印刷を全選択</b>
            </wj-menu-item>
            <wj-menu-item>
              <b>印刷を全解除</b>
            </wj-menu-item>
            <wj-menu-item>
              <b>確定を全選択</b>
            </wj-menu-item>
            <wj-menu-item>
              <b>確定を全解除</b>
            </wj-menu-item>
          </wj-menu>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="container">
      <div v-if="receptFlag"><recept-list ref="receptChild"></recept-list></div>
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
import ReceptList from '../components/ReceptList.vue';
import ReceptTajougen from '../components/ReceptTajougen.vue';
import ReceptJijyougen from '../components/ReceptJijyougen.vue';
import TabMenuBlue from '../components/TabMenuBlue.vue';

const riyosyaCombo = [];
const receptCombo = [];
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
      receptCombo: receptCombo,

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
    ReceptList,
    ReceptTajougen,
    ReceptJijyougen,
    TabMenuBlue,
  },
  created() {
    // レセプト集計絞込
    this.receptCombo.push(
      {
        key: 1,
        text: '全員',
      },
      {
        key: 2,
        text: 'エラーあり',
      },
      {
        key: 3,
        text: '集計済',
      },
      {
        key: 4,
        text: '未集計',
      },
      {
        key: 5,
        text: '確定済',
      },
      {
        key: 6,
        text: '未確定',
      }
    );
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
     * レセプト絞り込み変更
     */
    onReceptCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        // こちらに子供に選択データを渡す処理
      }
      let f = document.activeElement;
      f.blur();
    },
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
      let f = document.activeElement;
      f.blur();
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
      let f = document.activeElement;
      f.blur();
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
    onselectedIndexChanged(s) {
      // 印刷用
      if (s.selectedIndex == 0 || s.selectedIndex == 1) {
        this.selectAll(s.selectedIndex);
      }
      // 確定用
      if (s.selectedIndex == 2 || s.selectedIndex == 3) {
        this.defineAll(s.selectedIndex);
      }
    },
    selectAll(type) {
      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentSelectAll(type);
      } else {
        this.$refs.tajougenChild.parentSelectAll(type);
      }
    },
    defineAll(type) {
      if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijyougenChild.parentDefineAll(type);
      } else {
        this.$refs.tajougenChild.parentDefineAll(type);
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
  .jijyougen-container {
    padding: 4px;
  }
  .container {
    padding: 4px;
    margin-top: 16px;
  }
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

  .user-info {
    label:not(.errorlabel) {
      min-width: 120px;
    }
  }
}
div.customCombobox {
  .wj-btn.wj-btn-default {
    border-left: none !important;
  }
  &:hover {
    background-color: #e1e1e1;
  }
  &:focus {
    background-color: #fff;
  }
}
</style>