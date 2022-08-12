<template>
  <div id="MstMenu">
    <v-container no-gutters fluid class="container ml-1 mr-1 pa-0">
      <v-row no-gutters>
        <v-tabs height="30px" v-model="tab" left>
          <v-tab
            v-for="item in menuItem"
            :key="item.val"
            class="text-caption"
            :href="item.href"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-row>
    </v-container>
    <v-container no-gutters fluid class="container ml-1 pa-0">
      <v-tabs-items v-model="tab">
        <v-tab-item value="JigyoSyukei">
          <MstJigyoSyukeiJyouken></MstJigyoSyukeiJyouken>
        </v-tab-item>
        <v-tab-item value="Sien">
          <MstSienKoumoku></MstSienKoumoku>
        </v-tab-item>
        <v-tab-item value="SoudanHouhou"> Tab 3 Content </v-tab-item>
        <v-tab-item value="Kankei"> Tab 4 Content </v-tab-item>
        <v-tab-item value="JigyoKbn"> Tab 5 Content </v-tab-item>
        <v-tab-item value="KyujituKaisyo"> Tab 6 Content </v-tab-item>
        <v-tab-item value="SoudanGyoumu"> Tab 7 Content </v-tab-item>
        <v-tab-item value="GyoumuNaiyou"> Tab 8 Content </v-tab-item>
        <v-tab-item value="Kenin"> Tab 9 Content </v-tab-item>
        <v-tab-item value="SienKeikaku"> Tab 10 Content </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import MstJigyoSyukeiJyouken from '../../components/MstJigyoSyukeiJyouken.vue';
import MstSienKoumoku from '../../components/MstSienKoumoku.vue';
export default {
  components: { MstJigyoSyukeiJyouken, MstSienKoumoku },
  data: function () {
    return {
      tab: '', // タブの初期状態
      menuItem: [
        { name: '事業区分・集計条件', href: '#JigyoSyukei' },
        { name: '支援項目', href: '#Sien' },
        { name: '相談方法', href: '#SoudanHouhou' },
        { name: '関係', href: '#Kankei' },
        { name: '事業区分別使用', href: '#JigyoKbn' },
        { name: '休日・開所時間', href: '#KyujituKaisyo' },
        { name: '相談業務', href: '#SoudanGyoumu' },
        { name: '業務内容', href: '#GyoumuNaiyou' },
        { name: '検印', href: '#Kenin' },
        { name: '支援計画設定', href: '#SienKeikaku' },
      ],
    };
  },
  methods: {},
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#MstMenu {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;

  .wj-cell {
    padding: 2px;
    padding-top: 1px;
  }
}
</style>
