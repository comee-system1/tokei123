<template>
  <div id="riyousyadaityoSortMenu">
    <v-row no-gutters>
    <v-col>
        <v-btn-toggle class="flex-wrap" mandatory>
        <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
            @click="sort(1)"
        >
            新規登録
        </v-btn>
        <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
            @click="sort(2)"
        >
            修正登録
        </v-btn>
        <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
            @click="sort(3)"
        >
            履歴登録
        </v-btn>
        <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
            @click="sort(4)"
        >
            終了登録
        </v-btn>
        </v-btn-toggle>
    </v-col>
    </v-row>
    <v-row no-gutters class="mt-1 justify-space-between">
    <v-col class="d-flex">
        <v-row no-gutters class="d-block">
        <v-col>
            <label>表示</label>
            <v-btn-toggle class="flex-wrap" mandatory>
              <v-btn
                  small
                  color="secondary"
                  dark
                  outlined
                  style="width: 90px; height: 25px"
                  @click="sort(1)"
              >
                有効
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(2)"
              >
                新規
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(3)"
              >
                終了
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sort(3)"
              >
                全員
              </v-btn>
            </v-btn-toggle>
        </v-col>
        <v-col class="mt-1">
            <label>ソート</label>
            <v-btn-toggle class="flex-wrap" mandatory>
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
            </v-btn-toggle>
        </v-col>
        </v-row>
        <v-row no-gutters class="d-block">
        <v-col class="d-flex">
            <div>
            <label>サービス事業</label>
            <wj-menu
                :itemsSource="riyosyaCombo"
                class="w-100 customCombobox"
                :itemClicked="onRiyosyaCombo"
                :isRequired="true"
                :displayMemberPath="'text'"
                selectedValuePath="'key'"
                header="指定なし"
            ></wj-menu>
            </div>
            <div class="ml-1">
            <label>サービス内容</label>
            <wj-menu
                :itemsSource="riyosyaCombo"
                class=" w-100 customCombobox"
                :itemClicked="onRiyosyaCombo"
                :isRequired="true"
                :displayMemberPath="'text'"
                selectedValuePath="'key'"
                header="指定なし"
            ></wj-menu>
            </div>
        </v-col>
        <v-col class="mt-1">
            <label>カナ検索</label>
            <wj-combo-box
                class="kihon-jyukyusyabangou-input2"
                :textChanged="onTextChanged"
            ></wj-combo-box>
        </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
        <v-col>
            <v-btn height="25" small>検索</v-btn>
        </v-col>
        </v-row>
    </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4">
        <v-btn-toggle class="flex-wrap" mandatory>
          <v-btn
              small
              outlined
              v-for="(n, k) in alphabet"
              :key="n"
              :width="25"
              :height="25"
              p-0
              style="min-width: auto"
              @click="onAlphabet(k)"
          >
              {{ n }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-card-text class="pa-0">
          全体：<span>999人</span>
        </v-card-text>
        <v-card-text class="pa-0">
          男性：<span>999人</span>
        </v-card-text>
        <v-card-text class="pa-0">
          女性：<span>999人</span>
        </v-card-text>
        <v-card-text class="pa-0">
          摘要不能：<span>999人</span>
        </v-card-text>
        
        <!-- <dl class="d-flex">
          <dt>全体：</dt>
          <dd class="mr-3">999人</dd>
          <dt>男性：</dt>
          <dd class="mr-3" >999人</dd>
          <dt>女性：</dt>
          <dd class="mr-3">999人</dd>
          <dt>摘要不能：</dt>
          <dd class="mr-3"></dd>
          </dl> -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alphabet: alphabet,
      riyosyaCombo: [],
      jyougenkanriCombo: [],
      taServiceCombo: [],
      receptCombo: [],
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
      filterFlag: { allFlag: true, jyogenFlag: false, misyoriFlag: false },
    };
  },
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#riyousyadaityoSortMenu {
  min-width: 1266px;
  font-size: 12px;
  .v-card__text {
    width: 130px;
  } span {
    text-decoration: underline;
  }
  .no-flex-grow {
    flex-grow: 0;
  }
  .v-input__slot {
    width: 200px;
  }
  .v-input__slot:before {
    display: none;
  }
}
</style>