<template>
  <div id="kihonJyoho">
    <v-container fluid class="mt-0 user-info">
      <riyousyadaityo-sort-menu
        @parent-calendar="parentCalendar($event, dateArgument)"
        @parent-search="parentSearch($event, searchArgument)"
        :shinkiTourokuFlag="true"
        :shuseiTourokuFlag="false"
        :rirekiTourokuFlag="false"
      ></riyousyadaityo-sort-menu>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="kihonJyohoGrid"
          :headersVisibility="'Column'"
          :allowDelete="false"
          :allowDragging="false"
          :allowResizing="false"
          :deferResizing="false"
          :allowSorting="false"
          :selectionMode="'Row'"
          :initialized="onInitialized"
          :itemsSource="kihonjyohoData"
          :style="gridHeight"
        >
          <wj-flex-grid-column
            :binding="'jyukyuno'"
            :header="'受給者番号'"
            align="center"
            :width="100"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'names'"
            :header="'利用者名'"
            align="center"
            width="3*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'kana'"
            :header="'ﾌﾘｶﾞﾅ'"
            align="center"
            width="3*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'birthymd'"
            :header="'生年月日'"
            align="center"
            :width="100"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'old'"
            :header="'年齢'"
            align="center"
            :width="50"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sex'"
            :header="'性別'"
            align="center"
            :width="50"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'address'"
            :header="'住所'"
            align="center"
            width="4*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sityosonryaku'"
            :header="'市区町村'"
            width="2*"
            :isReadOnly="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tell1'"
            :header="'連絡先①'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'tell2'"
            :header="'連絡先②'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'symd'"
            :header="'開始日'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'eymd'"
            :header="'終了日'"
            align="center"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'reason'"
            :header="'理由'"
            align="center"
            :width="50"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import RiyousyadaityoSortMenu from '../components/RiyousyadaityoSortMenu.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
export default {
  data() {
    return {
      // alphabet: alphabet,
      riyosyaCombo: [],
      jyougenkanriCombo: [],
      taServiceCombo: [],
      receptCombo: [],
      shinkiTourokuFlag: true, // shinkiTourokuの初期表示状態
      shuseiTourokuFlag: false, // shuseiTourokuの初期表示状態
      rirekiTourokuFlag: false, // rirekiTourokuの初期表示状態
      sortFlag: { kanaFlag: true, codeFlag: false, bangoFlag: false },
      filterFlag: { allFlag: true, jyogenFlag: false, misyoriFlag: false },
      kihonjyohoData:[],
      gridHeight: '', // グリッドの高さ
    };
  },
    components: {
    RiyousyadaityoSortMenu,
  },
    mounted() {
    this.handleResize();
  },
  created() {
    // グリッドリサイズ
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    /*********************
     * 画面リサイズの際の表示調整
     */
    handleResize() {
      let height = window.innerHeight;
      let ht = 62;
      if (height > 800) {
        ht = 65;
      }
      this.gridHeight = 'height:' + ht + 'vh;';
      console.log(this.gridHeight)
      // alert(1)
    },
    getData() {
      // this.JyuryouTsuchisyoData = result.icrn_inf;
      // this.allData = this.JyuryouTsuchisyoData;
      let kihonjyohoData = [];
      kihonjyohoData.push(
        {
          jyukyuno:  '1000000001', //提供サービス
          names: '東経 太郎',// サービス種類コード
          kana: 'タロウ トウケイ',// 利用日数
          birthymd: '19920422',
          old: "30",
          sex: '男',
          sexFlag: 1,
          address: '〒001-2345 〇〇市××町11-1',
          sityosonryaku: '東経市',
          tell1:"03-1234-5567",
          tell2: "03-1111-2231",
          symd: "20220520",
          eymd: "20220622",
          reason: "",
        },
        {
          jyukyuno:  '1000000002', //提供サービス
          names: '東経 花子',// サービス種類コード
          kana: 'ハナコ トウケイ',// 利用日数
          birthymd: '19920422',
          old: "30",
          sex: '女',
          sexFlag: 2,
          address: '〒001-2345 〇〇市××町11-1',
          sityosonryaku: '東経市',
          tell1:"03-1234-5567",
          tell2: "03-1111-2231",
          symd: "20220520",
          eymd: "20220622",
          reason: "",
        },
        {
          jyukyuno:  '1000000003', //提供サービス
          names: '東経 太郎',// サービス種類コード
          kana: 'タロウ トウケイ',// 利用日数
          birthymd: '19920422',
          old: "30",
          sex: '男',
          sexFlag: 1,
          address: '〒001-2345 〇〇市××町11-1',
          sityosonryaku: '東経市',
          tell1:"03-1234-5567",
          tell2: "03-1111-2231",
          symd: "20220520",
          eymd: "20220622",
          reason: "",
        },
        {
          jyukyuno:  '1000000004', //提供サービス
          names: '東経 明日香',// サービス種類コード
          kana: 'アスカ トウケイ',// 利用日数
          birthymd: '19920422',
          old: "30",
          sex: '女',
          sexFlag: 2,
          address: '〒001-2345 〇〇市××町11-1',
          sityosonryaku: '東経市',
          tell1:"03-1234-5567",
          tell2: "03-1111-2231",
          symd: "20220520",
          eymd: "20220622",
          reason: "",
        },
        {
          jyukyuno:  '1000000005', //提供サービス
          names: '東経 次郎',// サービス種類コード
          kana: 'ジロウ トウケイ',// 利用日数
          birthymd: '19920422',
          old: "30",
          sex: '男',
          sexFlag: 1,
          address: '〒001-2345 〇〇市××町11-1',
          sityosonryaku: '東経市',
          tell1:"03-1234-5567",
          tell2: "03-1111-2231",
          symd: "20220520",
          eymd: "20220622",
          reason: "",
        },
      );
      this.kihonjyohoData = kihonjyohoData;
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.getData();
      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;

      flexGrid.itemsSource = this.kihonjyohoData;
    }
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#kihonJyoho {
  font-size: 12px;
  .user-info {
    label {
      margin-right: 4px!important;
      width: 100px;
    }
  }
}
</style>