<template>
  <div id="tajyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :receptFlag="false"
    ></header-services>

    <div fluid class="jijyougen-container mt-0 user-info">
      <v-row no-gutters>
        <v-col class="leftArea">
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
            ></wj-menu>

            <v-btn class="ml-2" height="25" small>検索</v-btn>
          </v-row>
          <v-row class="mt-1" no-gutters>
            <label>ソート</label>
            <v-btn-toggle class="flex-wrap ml-1" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(1)"
              >
                カナ
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(2)"
              >
                コード
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
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
                style="width: 90px; height: 25px"
                @click="filter(1)"
              >
                全員
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="filter(2)"
              >
                上限管理済
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="filter(3)"
              >
                未処理
              </v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
        <v-col class="rightArea">
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
        <v-col>
          <alphabet-button
            ref="alphabetButton"
            @onAlphabetical="onAlphabetical"
          ></alphabet-button>
        </v-col>
        <v-col>
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
            class="customCombobox customComboboxAuto"
          >
            <wj-menu-item>
              <b v-if="receptFlag">集計を全選択</b>
              <b v-else>印刷を全選択</b>
            </wj-menu-item>
            <wj-menu-item>
              <b v-if="receptFlag">集計を全解除</b>
              <b v-else>印刷を全解除</b>
            </wj-menu-item>
            <wj-menu-item v-if="receptFlag != true">
              <b>確定を全選択</b>
            </wj-menu-item>
            <wj-menu-item v-if="receptFlag != true">
              <b>確定を全解除</b>
            </wj-menu-item>
          </wj-menu>
        </v-col>
      </v-row>
    </div>
    <v-container fluid class="container">
      <div v-if="receptFlag"><recept-list ref="receptChild"></recept-list></div>
      <div v-if="TajyougenkanriJimsyoFlag">
        <recept-tajougen
          ref="tajougenChild"
          @settingJyogenCombobox="settingJyogenCombobox"
        ></recept-tajougen>
      </div>
      <div v-if="JijyougenkanriJimsyoFlag">
        <recept-jijyougen ref="jijougenChild"></recept-jijyougen>
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
import AlphabetButton from '@/components/AlphabetButton.vue';

export default {
  data() {
    return {
      year: moment().year(),
      riyosyaCombo: [],
      jyougenkanriCombo: [],
      taServiceCombo: [],
      receptCombo: [],
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
    AlphabetButton,
  },
  created() {
    this.receptCombo = [];
    this.riyosyaCombo = [];
    this.jyougenkanriCombo = [];
    this.taServiceCombo = [];
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

    this.taServiceCombo.push(
      {
        key: 0,
        text: '指定なし',
      },
      {
        key: 1,
        text: 'ひまわり園',
      },
      {
        key: 2,
        text: 'たんぽぽ就労事業',
      },
      {
        key: 3,
        text: 'さくら訪問介護',
      }
    );
  },
  methods: {
    /********************
     * 上限管理事用コンボボックス
     */
    settingJyogenCombobox(combolist) {
      // 重複を取り除く処理
      const result = combolist.filter(
        (element, index, self) =>
          self.findIndex((e) => e.jigyonm === element.jigyonm) === index
      );

      this.jyougenkanriCombo = [];
      this.jyougenkanriCombo.push({
        key: -1,
        text: '指定なし',
      });
      for (let i = 0; i < result.length; i++) {
        this.jyougenkanriCombo.push({
          key: i,
          text: result[i].jigyonm,
        });
      }
    },
    /*********************
     * レセプト絞り込み変更
     */
    onReceptCombo(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        // こちらに子供に選択データを渡す処理
        this.$refs.receptChild.child_Jyougenkanriji(e.text, e.selectedIndex);
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
          this.$refs.jijougenChild.child_Jyougenkanriji(
            e.text,
            e.selectedIndex
          );
        }
        if (this.TajyougenkanriJimsyoFlag) {
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
        if (this.receptFlag) {
          this.$refs.receptChild.child_Riyosya(e.text, e.selectedIndex);
        } else if (this.JijyougenkanriJimsyoFlag) {
          this.$refs.jijougenChild.child_Riyosya(e.text, e.selectedIndex);
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
      if (this.receptFlag) {
        this.$refs.receptChild.parentDefineButton(type);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentDefineButton(type);
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
        this.$refs.jijougenChild.parentFilter(type);
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

      if (this.receptFlag) {
        this.$refs.receptChild.parentSort(type);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentSort(type);
      } else {
        this.$refs.tajougenChild.parentSort(type);
      }
    },
    /*********************
     * 全選択
     */
    onselectedIndexChanged(s) {
      // 印刷用
      // 集計用
      if (s.selectedIndex == 0 || s.selectedIndex == 1) {
        this.selectAll(s.selectedIndex);
      }
      // 確定用
      if (s.selectedIndex == 2 || s.selectedIndex == 3) {
        this.defineAll(s.selectedIndex);
      }
    },
    selectAll(type) {
      if (this.receptFlag) {
        this.$refs.receptChild.parentSelectAll(type);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentSelectAll(type);
      } else {
        this.$refs.tajougenChild.parentSelectAll(type);
      }
    },
    defineAll(type) {
      if (this.receptFlag) {
        this.$refs.receptChild.parentDefineAll(type);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentDefineAll(type);
      } else {
        this.$refs.tajougenChild.parentDefineAll(type);
      }
    },
    /********:
     * レセプト集計ボタン
     */
    receptSyukei() {
      this.$refs.receptChild.parentReceptSyukei();
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
      this.$refs.jijougenChild.parentReceptCalc();
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabetical(key) {
      if (this.receptFlag) {
        this.$refs.receptChild.parentAlphabet(key);
      } else if (this.JijyougenkanriJimsyoFlag) {
        this.$refs.jijougenChild.parentAlphabet(key);
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
  font-size: 12px;
  font-family: 'メイリオ';
  text-align: left;
  .jijyougen-container {
    padding: 4px;
    max-width: 1180px;
    min-width: 1180px;
    width: 1180px;
  }
  div {
    .leftArea {
      max-width: 880px;
    }
    .rightArea {
      max-width: 280px;
    }
  }
  .container {
    padding: 4px;
    margin-top: 16px;
    min-width: 1020px;
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
  position: relative;
  width: 270px !important;
  height: 25px !important;
  &.customCombobox {
    width: 160px !important;
    div {
      text-align: left;
    }
  }
  div {
    .wj-input-group {
      .wj-form-control {
        padding: 6px;
      }
    }
  }

  .wj-btn.wj-btn-default {
    border-left: none !important;
  }
  &:hover {
    background-color: #e1e1e1;
  }
  &:focus {
    background-color: #fff;
  }
  div * {
    height: 21px !important;
    padding: 0;
    span {
      height: 21px !important;
      margin-top: 8px;
    }
    &.wj-form-control {
      position: absolute;
      top: -3px;
      width: 100%;
    }
  }
  input {
    height: 25px !important;
  }
}
</style>