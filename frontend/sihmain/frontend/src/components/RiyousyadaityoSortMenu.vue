<template>
  <div id="riyousyadaityoSortMenu">
    <v-row no-gutters v-if="kihonJyohoFlag">
      <v-col>
        <v-btn-toggle class="flex-wrap" mandatory>
          <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
            @click="shinkiTourokuDialogOpen()"
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
        <v-row no-gutters class="d-block no-flex-grow mr-1  mw380">
        <v-col>
            <label>表示</label>
            <v-btn-toggle
              class="flex-wrap"
              mandatory
              v-model="toggle_displaySort"
            >
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="displaySort('enable')"
              >
                有効
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="displaySort('new')"
                v-if="serviceHistoryFlag != true"
              >
                新規
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="displaySort('finish')"
              >
                終了
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="displaySort('all')"
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
                @click="sorted('kana')"
              >
                カナ
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 90px; height: 25px"
                @click="sorted('code')"
              >
                コード
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="d-block no-flex-grow mr-1 mw540">
        <v-col class="d-flex">
            <div>
              <label>サービス事業</label>
              <wj-menu
                class="w-100 customCombobox"
                :isRequired="true"
                :displayMemberPath="'text'"
                selectedValuePath="'key'"
                header="指定なし"
              ></wj-menu>
            </div>
            <div class="ml-1">
              <label>サービス内容</label>
              <wj-menu
                class="w-100 customCombobox"
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
              style="width: 160px"
            ></wj-combo-box>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-btn height="25" small>検索</v-btn>
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
          全体：<span>{{ totalcount }}人</span>
        </v-card-text>
        <v-card-text class="pa-0">
          男性：<span>{{ malecount }}人</span>
        </v-card-text>
        <v-card-text class="pa-0">
          女性：<span>{{ femalecount }}人</span>
        </v-card-text>
        <v-card-text class="pa-0">
          適用不能：<span>{{ nomalecount }}人</span>
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
      toggle_displaySort: this.toggle_displayDefault(),
      totalcount: 0,
      malecount: 0,
      femalecount: 0,
      nomalecount: 0,
    };
  },
  props: {
    kihonJyohoFlag: {
      type: Boolean,
      default: true,
    },
    serviceHistoryFlag: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    /******************
     * 新規登録ダイアログを呼び出し
     */
    shinkiTourokuDialogOpen() {
      this.$emit('pearentShinkiDialogOpen');
    },
    /******************
     * 合計値の表示
     */
    setTotalcount(data) {
      this.totalcount = data.length;
      // 性別のデータ
      let malecount = 0;
      let femalecount = 0;
      let nomalecount = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].genderKey === '1') {
          malecount++;
        } else if (data[i].genderKey === '2') {
          femalecount++;
        } else {
          nomalecount++;
        }
      }
      this.malecount = malecount;
      this.femalecount = femalecount;
      this.nomalecount = nomalecount;
    },
    /********************
     * 並び替え
     */
    sorted(type) {
      this.$emit('sorted', { sortedType: type });
    },
    /*****************
     * 表示項目の初期値
     */
    toggle_displayDefault() {
      if (this.serviceHistoryFlag === true) {
        return 2;
      }
    },
    /************************:
     * 表示項目を押下
     */
    displaySort(type) {
      this.$emit('displaySort', { displaySortType: type });
    },
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      alert(key);
      // if (this.receptFlag) {
      //   this.$refs.receptChild.parentAlphabet(key);
      // } else if (this.JijyougenkanriJimsyoFlag) {
      //   this.$refs.jijougenChild.parentAlphabet(key);
      // } else {
      //   this.$refs.tajougenChild.parentAlphabet(key);
      // }
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#riyousyadaityoSortMenu {
  min-width: 1266px;
  font-size: 12px;
  .v-card__text {
    max-width: 100px;
    span {
    text-decoration: underline;
    }
  }
  .user-info label {
    line-height: 25px;
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
  div.d-flex {
    label {
      width: 100px;
      height: 23px;
    }
  }
  .d-block {
    &.mw380 {
      max-width: 380px;
    }
    &.mw400 {
      max-width: 400px;
    }
    &.mw450 {
      max-width: 450px;
    }
    &.mw480 {
      max-width: 480px;
    }
    &.mw500 {
      max-width: 500px;
    }
    &.mw540 {
      max-width: 540px;
    }
    &.mw600 {
      max-width: 600px;
    }
  }
}
</style>