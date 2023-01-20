<template>
  <div class="pa-1" id="accountsList">
    <v-row no-gutters class="d-flex pt-1 pb-1" id="subTitle">
      <h2>{{ $route.meta.title }}</h2>
      <label>{{ $route.meta.sub }}</label>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col>
        <label class="labeled">所属事業所</label>
        <select
          v-model="syozokuGroup"
          class="selectBox ml-1"
          @change="onSyozokuGroupChange()"
        >
          <option v-for="val in groupArray" :key="val.id" :value="val.id">
            {{ val.value }}
          </option>
        </select>
      </v-col>
      <v-col class="text-end">
        <v-btn small class="ml-1" height="24" @click="onsignExplain()">
          <v-icon small color=""> mdi-message-text </v-icon>
          記号説明
        </v-btn>
        <v-card id="signExplain" v-show="signExplainFlag">
          <div v-for="(value, index) in explainArray" :key="index">
            <v-row no-gutters>
              <div :class="`left ${value.bk}`">{{ value.icon }}</div>
              <div class="right">:{{ value.text }}</div>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">絞込</label>
      <div class="ml-1 boarderArea d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, syokuinKey) in accountsArray"
          :key="`syokuin-${syokuinKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'syokuin_' + item.id"
            :value="item.id"
            name="syokuin"
            v-model="selAccount"
            @change="onSelAccount()"
          />
          <label :for="'syokuin_' + item.id" class="mt-1 ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>
    </v-row>

    <v-row no-gutters class="mt-1 filterHeight">
      <v-col>
        <alphabet-button
          id="alpCommon"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <wj-flex-grid
        id="syokuinListGrid"
        :autoSearch="false"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="syokuinViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :allowMerging="'AllHeaders'"
        :showMarquee="false"
        :formatItem="onFormatItem"
        :style="styles"
      >
        <wj-flex-grid-column
          v-for="columns in columnArray"
          :key="`columns-${columns.id}`"
          :binding="columns.binding"
          :width="columns.width"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          v-for="columnsAuth in columnAuthArray"
          :key="`columnsAuth-${columnsAuth.id}`"
          :binding="columnsAuth.binding"
          :width="48"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-filter
          :initialized="filterInitialized"
        ></wj-flex-grid-filter>
      </wj-flex-grid>
    </v-row>
    <v-row no-gutters class="justify-end">
      <v-btn height="24" class="mt-1" :to="`/staffData/${query}`">閉じる</v-btn>
    </v-row>
  </div>
</template>
<script>
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.vue2.grid.filter';
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { WjFlexGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import sysConst from '@/utiles/const';

export default {
  props: [],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
    AlphabetButton,
  },
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
    //this.filtered.showFilterIcons = false;
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },

  data() {
    return {
      query: this.$route.params.client,
      flexGrid: [],
      signExplainFlag: false,
      authBtnActive: { 1: true },
      authBtnSelected: 1, // 権限入力の選択状態
      selAccount: 1,
      selOther: 1,
      syozokuGroup: 999,
      selected: 0,
      syokuinViewData: [],
      accountCount: 0,
      activateCancel: true,
      groupArray: [
        {
          id: 999,
          value: '全表示',
        },
        {
          id: 1,
          value: '障害者支援施設　いるか園',
        },
        {
          id: 2,
          value: 'グループホーム　いるか園',
        },
        {
          id: 3,
          value: '総合支援センター　いるか園',
        },
      ],
      accountsArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: '権限設定済',
        },
        {
          id: 3,
          value: '権限未設定',
        },
      ],

      filterAbled: [],
      columnArray: [
        {
          id: 1,
          header: 'コード',
          binding: 'syokuinCode',
          width: 80,
        },
        {
          id: 2,
          header: '職員名',
          binding: 'syokuinName',
          width: 200,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '事業者情報',
          binding: 'groundAuth.column_1',
        },
        {
          id: 2,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '利用者情報',
          binding: 'groundAuth.column_2',
        },
        {
          id: 3,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '職員情報',
          binding: 'groundAuth.column_3',
        },
        {
          id: 4,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '電文作成',
          binding: 'groundAuth.column_4',
        },
        {
          id: 5,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '生活支援',
          binding: 'groundAuth.column_5',
        },
        {
          id: 6,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '施設請求',
          binding: 'groundAuth.column_6',
        },
        {
          id: 7,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '栄養ケア',
          binding: 'groundAuth.column_7',
        },
        {
          id: 8,
          top: 'グランドメニュー権限',
          middle: 'GHいるか',
          bottom: '生活支援',
          binding: 'groundAuth.column_8',
        },
        {
          id: 9,
          top: 'グランドメニュー権限',
          middle: 'GHいるか',
          bottom: 'ＧＨ請求',
          binding: 'groundAuth.column_9',
        },
        {
          id: 10,
          top: 'グランドメニュー権限',
          middle: '相談いるか',
          bottom: '基本相談',
          binding: 'groundAuth.column_10',
        },
        {
          id: 11,
          top: 'グランドメニュー権限',
          middle: '相談いるか',
          bottom: '計画相談',
          binding: 'groundAuth.column_11',
        },
        {
          id: 12,
          top: 'グランドメニュー権限',
          middle: '相談いるか',
          bottom: '相談請求',
          binding: 'groundAuth.column_12',
        },
      ],

      filtered: {}, // フィルターデータ
      headerheight: 240,
      explainArray: sysConst.TOOLTIPMESSAGE,
      searchOption: {}, // 検索条件
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('syokuinListGrid') != null) {
        document.getElementById('syokuinListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    onSyozokuGroupChange() {
      let selected = this.syozokuGroup;
      let temp = this.groupArray.find(function (value) {
        return value.id == selected ? value : '';
      });
      this.searchOption.syozokuGroup = temp.value;
      this.searchOption.syozokuGroupID = temp.id;
      this.searched();
    },
    onSelAccount() {
      let select = this.selAccount;
      let selected = this.accountsArray.find(function (value) {
        return value.id == select ? value : '';
      });
      this.searchOption.accountSelect = selected.id;
      this.searched();
    },

    onAlphabetical(k) {
      this.searched(k);
    },
    searched(alphabetkey = '') {
      let temp = this.syokuinViewData;
      let result = temp;
      // 所属事業所検索
      let syozokuGroup = this.searchOption.syozokuGroup;
      let syozokuGroupID = this.searchOption.syozokuGroupID;
      if (syozokuGroupID != 999 && syozokuGroupID) {
        result = temp.filter((value) => value.syozokuJigyosyo === syozokuGroup);
      }
      // 絞り込み検索
      if (
        this.searchOption.accountSelect &&
        this.searchOption.accountSelect != 1
      ) {
        let accountTemp = [];
        for (let i = 0; i < result.length; i++) {
          // 発行済み
          if (
            this.searchOption.accountSelect == 2 &&
            Object.keys(result[i].groundAuth).length > 0
          ) {
            accountTemp.push(result[i]);
          }
          // 未発行
          if (
            this.searchOption.accountSelect == 3 &&
            Object.keys(result[i].groundAuth).length == 0
          ) {
            accountTemp.push(result[i]);
          }
        }

        result = accountTemp;
      }

      // アルファベット検索
      if (alphabetkey > 0) {
        let tmpviewdata = result.concat();
        result = this.$refs.alp.alphabetFilter(tmpviewdata, 'rkana');
      }

      this.flexGrid.itemsSource = result;
    },

    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.createHeader(flexGrid);
      // itemscourceデータ
      this.syokuinViewData = [];
      let syokuinViewData = [];
      syokuinViewData.push({
        syokuinCode: '00001',
        syokuinName: '東経 太郎',
        rkana: 'ﾀﾛｳﾄｳｹｲ',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
          column_8: '〇',
          column_9: '〇',
          column_10: '〇',
          column_11: '〇',
          column_12: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00002',
        syokuinName: '明治 雅夫',
        rkana: 'ﾏｻｵﾒｲｼﾞ',
        syozokuJigyosyo: 'グループホーム　いるか園',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_5: '●',
          column_8: '●',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00003',
        syokuinName: '昭和 和夫',
        rkana: 'ｶｽﾞｵｼｮｳﾜ',
        syozokuJigyosyo: 'グループホーム　いるか園',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '●',
          column_6: '●',
          column_7: '●',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00004',
        syokuinName: '平成 麗子',
        rkana: 'ﾚｲｺﾍｲｾｲ',
        syozokuJigyosyo: '総合支援センター　いるか園',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00005',
        syokuinName: '福島 恵子',
        rkana: 'ｹｲｺﾌｸｼﾏ',
        syozokuJigyosyo: '総合支援センター　いるか園',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00006',
        syokuinName: '平成 慎吾',
        rkana: 'ｼﾝｺﾞﾍｲｾｲ',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        accountStatus: '未登録',
        groundAuth: {},
      });
      syokuinViewData.push({
        syokuinCode: '00007',
        syokuinName: '金沢 梅',
        rkana: 'ｳﾒｶﾅｻﾞﾜ',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        accountStatus: '使用中',
        groundAuth: {
          column_5: '〇',
          column_6: '〇',
        },
      });

      this.syokuinViewData = syokuinViewData;
      this.searched();
      flexGrid.frozenColumns = this.columnArray.length;
    },

    /*******************************
     * ヘッダ作成
     *******************************/
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      panel.rows.insert(1, new wjGrid.Row());
      panel.rows.insert(2, new wjGrid.Row());

      for (let i = 0; i < this.columnArray.length; i++) {
        panel.setCellData(0, i, this.columnArray[i].header);
        panel.setCellData(1, i, this.columnArray[i].header);
        panel.setCellData(2, i, this.columnArray[i].header);
        flexGrid.columnHeaders.columns[i].allowMerging = true;
      }

      let col = '';
      let c = this.columnArray.length;
      for (let i = 0; i < this.columnAuthArray.length; i++) {
        panel.setCellData(0, c, this.columnAuthArray[i].top);
        panel.setCellData(1, c, this.columnAuthArray[i].middle);
        panel.setCellData(2, c, this.columnAuthArray[i].bottom);

        col = flexGrid.columnHeaders.columns[c];
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;

        c++;
      }
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;

      flexGrid.columnHeaders.rows[2].height = 60;
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      let tmpitem = [];
      if (e.panel.rows[e.row]) {
        tmpitem = e.panel.rows[e.row].dataItem;
      }
      let accountRowCount = this.columnArray.length - 1;
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, 'headerpink');
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1) {
          e.cell.style.textAlign = 'left';
        }
        wijmo.addClass(e.cell, 'backgroundYellow');
        // 利用状況が未登録の場合は列以降をgrayに変更
        if (tmpitem && tmpitem.accountStatus == '未登録') {
          if (e.col > accountRowCount) {
            wijmo.addClass(e.cell, 'backgroundGray');
          }
        }
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
      for (let i = 0; i < this.columnArray.length; i++) {
        if (i < 2) {
          this.filterAbled.push(this.columnArray[i].binding);
        }
      }
      filter.filterColumns = this.filterAbled;
    },

    /****************
     * 記号説明ボタン押下
     */
    onsignExplain() {
      this.signExplainFlag = this.signExplainFlag ? false : true;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@grapecity/wijmo.styles/wijmo.css';

$height: 24px;
div#accountsList {
  font-size: 12px;
  min-width: 1266px;

  #subTitle {
    border-bottom: 1px solid $black;
    h2 {
      font-weight: normal;
    }
    label {
      line-height: 28px;
      margin-left: 20px;
    }
  }
  #signExplain {
    position: absolute;
    width: 400px;
    padding: 10px;
    z-index: 1000;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.95);
    border: 3px solid $view_Title_background_Main;
    left: auto;
    right: 0;
    animation-name: fadeInAnime;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    opacity: 0;

    div {
      margin-top: 1px;
      &.left {
        width: 40px;
        text-align: center;
      }
      &.pinkBackColor {
        background-color: $pink;
      }
      &.brownBackColor {
        background-color: $brown;
        color: $white;
      }
    }
  }
  @keyframes fadeInAnime {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  #alpCommon {
    height: $height;
  }
  #syokuinListGrid {
    position: relative;

    .wj-cell {
      &.backgroundYellow {
        background-color: $light-yellow;
      }
      &.backgroundGray {
        background-color: $selected_color;
      }
    }
    .wj-header {
      &.wj-cell {
        display: flex;
        justify-content: center;
        align-items: center;

        &.vertical-write {
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
        }
        &.headerpink {
          background-color: $pink;
        }
        &.headerorange {
          background-color: $grid_Total_Header_Background;
        }
        &.headeraqua {
          background-color: $light-blue;
        }
      }
    }
  }
  .labeled {
    background-color: $view_Row_background;
    width: 100px;
    text-align: center;
    line-height: $height;
    display: inline-block;
    &.pinked {
      background-color: $pink;
      line-height: $height;
      height: $height;
    }
    &.min {
      width: 80px;
    }
  }
  select {
    border: 1px solid $light-gray;
    -webkit-appearance: auto;
    &.selectBox {
      height: $height;
      width: 400px;
      &.short {
        width: 140px;
      }
    }
  }
  .boarderArea {
    width: 400px;
    &.wMdle {
      width: 450px;
    }
  }

  .filterHeight {
    height: $height;
  }
}
</style>
