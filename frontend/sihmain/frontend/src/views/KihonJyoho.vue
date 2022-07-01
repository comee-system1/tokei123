<template>
  <div id="kihonJyoho">
    <v-container fluid class="mt-0 user-info">
      <riyousyadaityo-sort-menu
        @pearentShinkiDialogOpen="pearentShinkiDialogOpen()"
        @pearentAllowSyuseiTouroku="pearentAllowSyuseiTouroku()"
        @displaySort="displaySort($event)"
        @sorted="sorted($event)"
      ></riyousyadaityo-sort-menu>
      <v-row class="mt-1" no-gutters>
        <wj-flex-grid
          id="kihonJyohoGrid"
          :headersVisibility="'Column'"
          :autoRowHeights="true"
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
            :binding="'codes'"
            :header="'コード'"
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
            :width="80"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'age'"
            :header="'年齢'"
            align="center"
            :width="40"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'sex'"
            :header="'性別'"
            align="center"
            :width="70"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'address'"
            :header="'住所'"
            :multiLine="true"
            align="center"
            width="5*"
            :isReadOnly="true"
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
            :binding="'sityosonryaku'"
            :header="'市区町村'"
            width="1.5*"
            :isReadOnly="false"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'symd'"
            :header="'開始日'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            :binding="'eymd'"
            :header="'終了日'"
            align="center"
            width="1.5*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <dialog-shinki-touroku 
        ref="dialog_shinki_tuika"
        @addFormData = "addFormData"
        ></dialog-shinki-touroku>
      <dialog-syusei-touroku 
        ref="dialog_syusei_touroku"
        ></dialog-syusei-touroku>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment';
import * as wjGrid from '@grapecity/wijmo.grid';
import RiyousyadaityoSortMenu from '../components/RiyousyadaityoSortMenu.vue';
import DialogShinkiTouroku from '../components/DialogShinkiTouroku.vue';
import DialogSyuseiTouroku from '../components/DialogSyuseiTouroku.vue';
import sysConst from '@/utiles/const';

export default {
  data() {
    return {
      dialog_shinki_flag: false, // 新規登録モーダルの表示フラグ
      syuseiTourokuFlag: false,
      kihonjyohoData: [],
      allData: [],
      mainFlexGrid: [],
      gridHeight: '', // グリッドの高さ
    };
  },
  components: {
    RiyousyadaityoSortMenu,
    DialogShinkiTouroku,
    DialogSyuseiTouroku,
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
    },
    
    /************************
     * 新規登録タブ押下
     */
    pearentShinkiDialogOpen() {
      this.syuseiTourokuFlag = false;
      let array = [];
      array = this.kihonjyohoData;
      // array.push({
      //   Codes: 1,
      //   name: 'trao',
      // });

      // モーダルに新データ追加用の配列を渡す
      this.$refs.dialog_shinki_tuika.open(array);
    },
    
    /************************
     * 修正登録タブ押下
     */
    pearentAllowSyuseiTouroku() {
      this.syuseiTourokuFlag = true;
    },

    /****************
     *セルのクリックイベント
     */
    clickEventCell(flexGrid) {
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        if (_self.syuseiTourokuFlag === true) {
          let ht = flexGrid.hitTest(e);
          let hPage = flexGrid.hitTest(e.pageX, e.pageY);
          // セル押下時のみ
          if (ht.cellType == wjGrid.CellType.Cell) {
            //クリックした行の利用者データを取得
            let RiyousyaKihonData = _self.getJyukyunoRow(hPage.row);
            _self.$refs.dialog_syusei_touroku.open(RiyousyaKihonData);
          }
        }
      });
    },
    /*************
     * 受給者番号が持つ行数の取得
     */
    getJyukyunoRow(row) {
      let data = [];
      data = this.kihonjyohoData[row];
      return data;
    },
    /************************
     * 子コンポーネントのソート項目
     */
    sorted(type) {
      // 表示配列の合計列を省く
      let array = [];
      for (let i = 0; i < this.kihonjyohoData.length; i++) {
        if (this.kihonjyohoData[i].code) {
          array.push(this.kihonjyohoData[i]);
        }
      }
      if (type.sortedType === 'kana') {
        array.sort((a, b) => {
          if (a.kana < b.kana) {
            return -1;
          }
          if (a.kana > b.kana) {
            return 1;
          }
          return 0;
        });
      }
      if (type.sortedType === 'code') {
        array.sort((a, b) => {
          if (a.code > b.code) {
            return -1;
          }
          if (a.code < b.code) {
            return 1;
          }
          return 0;
        });
      }
      let returns = this.changeSortting(array);
      this.kihonjyohoData = [];
      this.kihonjyohoData = returns;
    },
    /****************************
     * 子コンポーネントの表示項目
     */
    displaySort(type) {
      // 有効
      // 開始日が本日以前のデータ
      if (type.displaySortType === 'enable') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let st = '';
          if (this.allData[i].startDate) {
            st = moment(this.allData[i].startDate);
          } else {
            st = '';
          }
          if (st && st.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.kihonjyohoData = [];
        this.kihonjyohoData = array;
      }
      // 終了
      // 終了日が本日以前のデータ
      if (type.displaySortType === 'finish') {
        let array = [];
        let now = moment();
        for (let i = 0; i < this.allData.length; i++) {
          let ed = '';
          if (this.allData[i].endDate) {
            ed = moment(this.allData[i].endDate);
          } else {
            ed = '';
          }
          if (ed && ed.isBefore(now)) {
            array.push(this.allData[i]);
          }
        }
        this.kihonjyohoData = [];
        this.kihonjyohoData = array;
      }
      // 全員
      if (type.displaySortType === 'all') {
        this.kihonjyohoData = [];
        this.kihonjyohoData = this.allData;
      }

      // 表示配列の合計列を省く
      let array = [];
      for (let i = 0; i < this.kihonjyohoData.length; i++) {
        if (this.kihonjyohoData[i].code) {
          array.push(this.kihonjyohoData[i]);
        }
      }
      this.kihonjyohoData = this.changeSortting(array);
      this.methodCellFormatSetting(this.mainFlexGrid);
      this.createHeaderMerge(this.mainFlexGrid);
    },
    getData() {
      // this.JyuryouTsuchisyoData = result.icrn_inf;
      // this.allData = this.JyuryouTsuchisyoData;
      let kihonjyohoData = [];
      kihonjyohoData.push(
        {
          codes: '1000000001',
          jyukyuno: '1000000001', //提供サービス
          names: '東経 太郎', // サービス種類コード
          kana: 'タロウ トウケイ', // 利用日数
          birthymd: '19920422',
          age: '30',
          sex: '男',
          sexFlag: 1,
          address: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          sityosonryaku: '東経市',
          startDate: moment('20230401').format('YYYY/MM/DD'),
          // symd: "20220520",
          // eymd: "20220622",
        },
        {
          codes: '1000000002',
          jyukyuno: '1000000002', //提供サービス
          names: '東経 花子', // サービス種類コード
          kana: 'ハナコ トウケイ', // 利用日数
          birthymd: '19920422',
          age: '30',
          sex: '女',
          sexFlag: 2,
          address: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          sityosonryaku: '東経市',
          startDate: moment('20200901').format('YYYY/MM/DD'),
          symd: '20220520',
          eymd: '20220622',
        },
        {
          codes: '1000000003',
          jyukyuno: '1000000003', //提供サービス
          names: '東経 太郎', // サービス種類コード
          kana: 'タロウ トウケイ', // 利用日数
          birthymd: '19920422',
          age: '30',
          sex: '男',
          sexFlag: 1,
          address: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          sityosonryaku: '東経市',
          startDate: moment('20181115').format('YYYY/MM/DD'),
          endDate: moment('20181115').format('YYYY/MM/DD'),
          // symd: "20220520",
          // eymd: "20220622",
        },
        {
          codes: '1000000004',
          jyukyuno: '1000000004', //提供サービス
          names: '東経 明日香', // サービス種類コード
          kana: 'アスカ トウケイ', // 利用日数
          birthymd: '19920422',
          age: '30',
          sex: '女',
          sexFlag: 2,
          address: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          sityosonryaku: '東経市',
          symd: '20220520',
          eymd: '20220622',
        },
        {
          codes: '1000000005',
          jyukyuno: '1000000005', //提供サービス
          names: '東経 次郎', // サービス種類コード
          kana: 'ジロウ トウケイ', // 利用日数
          birthymd: '19920422',
          age: '30',
          sex: '男',
          sexFlag: 1,
          address: '〒001-2345 〇〇市××町11-1',
          tell1: '03-1234-5567',
          tell2: '03-1111-2231',
          sityosonryaku: '東経市',
          symd: '20220520',
          eymd: '20220622',
        }
      );
      this.kihonjyohoData = kihonjyohoData;
      this.allData = this.kihonjyohoData;
    },
    onInitialized(flexGrid) {
      this.mainFlexGrid = flexGrid;
      this.getData();
      
      // セルのクリックイベント(修正登録タブアクティブ時)
      this.clickEventCell(flexGrid);

      // グリッドの選択を無効にする
      flexGrid.selectionMode = wjGrid.SelectionMode.None;
      flexGrid.itemsSource = this.kihonjyohoData;

      // グリッドのスタイルをカスタマイズ
      flexGrid.itemFormatter = function (panel, r, c, cell) {
        // グリッド内共通スタイル
        let s = cell.style;
        if (panel.cellType == wjGrid.CellType.Cell) {
          // セル背景の変更
          s.backgroundColor = sysConst.COLOR.gridBackground;
          if ((c == 1) || (c == 2) || (c == 2) || (c == 6) || (c == 9)) {
            // テキスト左寄せ
            s.textAlign = 'left';
          }
          if ((c == 4)) {
            // テキスト右寄せ
            s.textAlign = 'right';
          }
        }
      };
    },
    addFormData(addData,) {
      // 新規入力データを配列に追加
      this.kihonjyohoData = addData;
      this.allData = this.kihonjyohoData;
      this.mainFlexGrid.itemsSource = [];
      this.mainFlexGrid.itemsSource = this.kihonjyohoData;
    }
  },
};
</script>
<style lang="scss" scope>
@import '@/assets/scss/common.scss';
div#kihonJyoho {
  font-size: 12px;
  .user-info {
    label {
      margin-right: 4px !important;
      width: 100px;
    }
  }
}
</style>