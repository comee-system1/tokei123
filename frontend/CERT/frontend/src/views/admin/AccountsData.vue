<template>
  <div class="pa-1" id="accountsData">
    <v-row no-gutters>
      <label class="labeled">所属事業所</label>
      <select v-model="syozokuGroup" class="selectBox ml-1">
        <option v-for="val in groupArray" :key="val.id">{{ val.value }}</option>
      </select>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">職員</label>
      <div class="ml-1 boardArea d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, syokuinKey) in syokuinArray"
          :key="`syokuin-${syokuinKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'syokuin_' + item.id"
            :value="item.value"
            name="syokuin"
            v-model="selSyokuin"
          />
          <label :for="'syokuin_' + item.id" class="mt-1 ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>
      <label class="labeled ml-1">絞込</label>
      <div class="ml-1 boardArea d-flex wMdle">
        <v-card
          class="ml-1 d-flex"
          v-for="(filters, filterIndex) in filterArray"
          :key="`filter-${filterIndex}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'filter_' + filters.id"
            :value="filters.value"
            name="filter"
            v-model="selFilter"
          />
          <label :for="'filter_' + filters.id" class="mt-1 ml-1 mr-2">{{
            filters.value
          }}</label>
        </v-card>
      </div>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="7">
        <alphabet-button
          id="alpCommon"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-col>
      <v-col class="text-end">
        <select v-model="selected" class="selectBox short">
          <option
            v-for="(selected, selectedIndex) in selectedArray"
            :key="`selected-${selectedIndex}`"
            :value="selected.id"
          >
            {{ selected.value }}
          </option>
        </select>
        <v-btn small class="ml-2" height="21">● 画面権限設定者を指定</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <wj-flex-grid
        id="syokuinListGrid"
        :autoSearch="true"
        :headersVisibility="'Column'"
        :selectionMode="3"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="syokuinViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :showMarquee="true"
        :formatItem="onFormatItem"
      >
        <wj-flex-grid-column
          v-for="columns in columnArray"
          :key="`columns-${columns.id}`"
          :header="columns.header"
          :binding="columns.binding"
          :width="columns.width"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          v-for="columnsAuth in columnAuthArray"
          :key="`columnsAuth-${columnsAuth.id}`"
          :header="columnsAuth.bottom"
          :binding="columnsAuth.binding"
          :width="40"
          :word-wrap="false"
          :allowResizing="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-row>
  </div>
</template>
<script>
import AlphabetButton from '@/components/AlphabetButton.vue';
export default {
  props: ['keycloak'],
  components: { AlphabetButton },
  mounted() {},
  data() {
    return {
      selSyokuin: '',
      syozokuGroup: '',
      selFilter: '',
      selected: 0,
      syokuinViewData: [],
      groupArray: [
        {
          id: 0,
          value: '',
        },
        {
          id: 1,
          value: '障害者支援施設',
        },
      ],
      syokuinArray: [
        {
          id: 1,
          value: '在職者',
        },
        {
          id: 2,
          value: '登録者',
        },
        {
          id: 3,
          value: '勤務修了者',
        },
        {
          id: 4,
          value: '全員',
        },
      ],
      filterArray: [
        {
          id: 1,
          value: '全員',
        },
        {
          id: 2,
          value: 'アカウント未発行',
        },
        {
          id: 3,
          value: '使用中',
        },
        {
          id: 4,
          value: '停止中',
        },
        {
          id: 5,
          value: 'メール有',
        },
      ],
      selectedArray: [
        {
          id: 0,
          value: '全選択/全解除',
        },
        {
          id: 1,
          value: '全選択',
        },
        {
          id: 2,
          value: '全解除',
        },
      ],
      columnArray: [
        {
          id: 1,
          header: '職員名',
          binding: 'syokuinCode',
          width: 60,
        },
        {
          id: 2,
          header: '職員名',
          binding: 'syokuinName',
          width: 160,
        },
        {
          id: 3,
          header: '職種',
          binding: 'syokusyu',
          width: 160,
        },
        {
          id: 4,
          header: '所属事業所',
          binding: 'syozokuJigyosyo',
          width: 200,
        },
        {
          id: 5,
          header: '開始日',
          binding: 'startDate',
          width: 100,
        },
        {
          id: 6,
          header: '終了日',
          binding: 'endDate',
          width: 100,
        },
        {
          id: 7,
          header: '退職',
          binding: 'taisyoku',
          width: 40,
        },
        {
          id: 8,
          header: 'メール有',
          binding: 'mailFlag',
          width: 40,
        },
        {
          id: 9,
          header: 'ID',
          binding: 'accountID',
          width: 140,
        },
        {
          id: 10,
          header: '状態',
          binding: 'accountStatus',
          width: 60,
        },
        {
          id: 11,
          header: '選択',
          binding: 'accountSelected',
          width: 40,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '事業者情報',
          binding: 'column_1',
        },
        {
          id: 2,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '利用者台帳',
          binding: 'column_2',
        },
        {
          id: 3,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '職員情報',
          binding: 'column_3',
        },
        {
          id: 4,
          top: 'メニュー権限',
          middle: '共通',
          bottom: '電文作成',
          binding: 'column_4',
        },
        {
          id: 5,
          top: 'メニュー権限',
          middle: 'いるか園',
          bottom: '生活支援',
          binding: 'column_5',
        },
        {
          id: 6,
          top: 'メニュー権限',
          middle: 'いるか園',
          bottom: '施設請求',
          binding: 'column_6',
        },
        {
          id: 7,
          top: 'メニュー権限',
          middle: 'GHいるか園',
          bottom: '施設請求',
          binding: 'column_7',
        },
        {
          id: 8,
          top: 'メニュー権限',
          middle: 'GHいるか園',
          bottom: 'GH請求',
          binding: 'column_8',
        },
      ],
    };
  },
  methods: {
    onAlphabetical() {
      //this.userFilter();
    },
    onInitialized() {},
    onItemsSourceChanged() {},
    onFormatItem() {},
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#accountsData {
  font-size: 14px;
  .labeled {
    background-color: $view_Row_background;
    width: 100px;
    text-align: center;
    line-height: 28px;
  }
  select {
    border: 1px solid $light-gray;
    -webkit-appearance: auto;
    &.selectBox {
      width: 300px;
      &.short {
        width: 140px;
      }
    }
  }
  .boardArea {
    border: 1px solid $light-gray;
    width: 300px;
    &.wMdle {
      width: 450px;
    }
  }
}
</style>
