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
            @click="allowSyuseiTouroku()"
          >
            修正登録
          </v-btn>
          <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
          >
            履歴登録
          </v-btn>
          <v-btn
            small
            color="secondary"
            dark
            outlined
            style="width: 90px; height: 25px"
          >
            終了登録
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1 justify-space-between">
      <v-col class="d-flex">
        <v-row no-gutters class="d-block no-flex-grow mr-1">
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
                style="width: 110px; height: 25px"
                @click="displaySort('enable')"
              >
                有効
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 110px; height: 25px"
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
                style="width: 110px; height: 25px"
                @click="displaySort('finish')"
              >
                終了
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 110px; height: 25px"
                @click="displaySort('all')"
              >
                全員
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col class="mt-1">
            <label>ソート</label>
            <v-btn-toggle class="flex-wrap" v-model="toggle_sort" mandatory>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 110px; height: 25px"
                @click="sorted('kana')"
              >
                カナ
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 110px; height: 25px"
                @click="sorted('code')"
              >
                コード
              </v-btn>
              <v-btn
                small
                color="secondary"
                dark
                outlined
                style="width: 110px; height: 25px"
                @click="sorted('jigyo')"
              >
                事業所＋サービス
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters class="d-block no-flex-grow mr-1 mw640">
          <v-col class="d-flex">
            <div>
              <label>サービス事業</label>
              <wj-menu
                class="w-100 customCombobox"
                :isRequired="true"
                :displayMemberPath="'serviceTeikyoJigyosyo'"
                selectedValuePath="'serviceTeikyoJigyosyoCode'"
                header="指定なし"
                :itemsSource="serviceJigyoCombo"
                :itemClicked="onselectedServiceChanged"
              ></wj-menu>
            </div>
            <div class="ml-1">
              <label>サービス内容</label>
              <wj-menu
                class="w-100 customCombobox"
                :isRequired="true"
                :displayMemberPath="'serviceMeisyo'"
                selectedValuePath="'serviceCode'"
                header="指定なし"
                :itemsSource="serviceNaiyoCombo"
                :itemClicked="onselectedNaiyoChanged"
              ></wj-menu>
            </div>
          </v-col>
          <v-col class="mt-1">
            <label>カナ検索</label>
            <wj-combo-box
              class="kihon-jyukyusyabangou-input2"
              style="width: 200px"
              :textChanged="onInputSearch"
              :isEditable="true"
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
    <v-row no-gutters class="mt-1 mb-1">
      <v-col cols="4">
        <alphabet-button
          ref="alphabetButton"
          @onAlphabetical="onAlphabetical"
        ></alphabet-button>
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AlphabetButton from '@/components/AlphabetButton.vue';

export default {
  data() {
    return {
      toggle_displaySort: this.toggle_displayDefault(),
      toggle_sort: this.toggle_sortDefault(),
      totalcount: 0,
      malecount: 0,
      femalecount: 0,
      nomalecount: 0,
      serviceJigyoCombo: [],
      serviceNaiyoCombo: [],
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
  components: {
    AlphabetButton,
  },
  methods: {
    /****************
     * かな検索
     */
    onInputSearch(e) {
      this.$emit('kanaSearch', {
        input: e.text,
      });
    },
    /****************
     * サービス事業選択
     */
    onselectedServiceChanged(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.$emit('selectedServiceJigyo', {
          serviceTeikyoJigyosyo: e.text,
          serviceTeikyoJigyosyoCode: e.selectedItem.serviceTeikyoJigyosyoCode,
        });
      }
    },
    onselectedNaiyoChanged(e) {
      if (e.selectedIndex != -1) {
        e.header = e.text;
        this.$emit('selectedServiceNaiyo', {
          serviceMeisyo: e.text,
          serviceCode: e.selectedItem.serviceCode,
        });
      }
    },
    /*********************
     * サービス事業設定/サービス内容設定
     */
    setServiceJigyoCombo(array) {
      var group = array.reduce(function (result, current) {
        var element = result.find(function (p) {
          return (
            p.serviceTeikyoJigyosyoCode === current.serviceTeikyoJigyosyoCode
          );
        });
        if (!element) {
          if (current.serviceTeikyoJigyosyo) {
            result.push({
              serviceTeikyoJigyosyoCode: current.serviceTeikyoJigyosyoCode,
              serviceTeikyoJigyosyo: current.serviceTeikyoJigyosyo,
            });
          }
        }
        return result;
      }, []);
      group.splice(0, 0, {
        serviceTeikyoJigyosyo: '指定なし',
        serviceTeikyoJigyosyoCode: 0,
      });
      this.serviceJigyoCombo = group;
    },
    setServiceNaiyoCombo(array) {
      var group = array.reduce(function (result, current) {
        var element = result.find(function (p) {
          return p.serviceCode === current.serviceCode;
        });
        if (!element) {
          if (current.serviceTeikyoJigyosyo) {
            result.push({
              serviceCode: current.serviceCode,
              serviceMeisyo: current.serviceMeisyo,
            });
          }
        }
        return result;
      }, []);
      group.splice(0, 0, {
        serviceMeisyo: '指定なし',
        serviceCode: 0,
      });
      this.serviceNaiyoCombo = group;
    },
    /******************
     * 新規登録ダイアログを呼び出し
     */
    shinkiTourokuDialogOpen() {
      this.$emit('pearentShinkiDialogOpen');
    },
    /******************
     * 修正登録ダイアログの呼び出しを許可
     */
    allowSyuseiTouroku() {
      console.log(1)
      this.$emit('pearentAllowSyuseiTouroku');
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
    toggle_sortDefault() {
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
    onAlphabetical(key) {
      this.$emit('alphabeted', { alphabetKey: key });
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
      text-decoration: none;
    }
  }
  .user-info label {
    line-height: 25px;
  }
  div.customCombobox.customCombobox {
    width: 200px !important;
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
  input.wj-form-control {
    padding: 1px;
    line-height: 1.7em;
  }
  .d-block {
    &.mw380 {
      max-width: 380px;
    }
    &.mw540 {
      max-width: 540px;
    }
    &.mw640 {
      max-width: 640px;
    }
  }
}
</style>