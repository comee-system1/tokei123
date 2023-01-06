<template>
  <div class="pa-1" id="accountsData">
    <v-row no-gutters>
      <v-col>
        <label class="labeled">所属事業所</label>
        <select v-model="syozokuGroup" class="selectBox ml-1">
          <option v-for="val in groupArray" :key="val.id" :value="val.id">
            {{ val.value }}
          </option>
        </select>
      </v-col>
      <v-col class="text-end">
        <v-btn height="24">全事業所一覧参照</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">アカウントID</label>
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
          />
          <label :for="'syokuin_' + item.id" class="mt-1 ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>

      <label class="labeled ml-1">利用状況</label>
      <div class="ml-1 boarderArea d-flex">
        <v-card
          class="ml-1 d-flex"
          v-for="(filters, filterIndex) in filterArray"
          :key="`filter-${filterIndex}`"
          elevation="0"
        >
          <input
            type="checkbox"
            :id="'filter_' + filters.id"
            :value="filters.value"
            :name="'filter[' + filters.id + ']'"
            v-model="selFilter"
          />
          <label :for="'filter_' + filters.id" class="mt-1 ml-1 mr-2">{{
            filters.value
          }}</label>
        </v-card>
      </div>

      <label class="labeled ml-1">その他絞込</label>
      <div class="ml-1 boarderArea wMdle d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, otherKey) in otherArray"
          :key="`other-${otherKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'other_' + item.id"
            :value="item.id"
            name="other"
            v-model="selOther"
          />
          <label :for="'other_' + item.id" class="mt-1 ml-1 mr-2">{{
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
      <v-col>
        <label class="accountConfLabel"
          >アカウント発行要確認新規職員:<span>{{ accountCount }}</span
          >名</label
        >
      </v-col>
      <v-col class="justify-end d-flex">
        <label class="labeled pinked min ml-1">権限入力</label>
        <v-btn
          v-for="val in authItem"
          :key="val.id"
          height="24"
          @click="authClick(val.id)"
          :class="{ isActive: authBtnActive[val.id], 'ml-1': true }"
          elevation="1"
          >{{ val.text }}</v-btn
        >
        <label class="labeled pinked min ml-1">その他</label>
        <v-btn small class="ml-1" height="24">権限コピー</v-btn>
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
        :allowDragging="true"
        :allowSorting="true"
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
          :showFilterIcons="false"
          :filter-columns="this.filterAbled"
        ></wj-flex-grid-filter>
      </wj-flex-grid>
    </v-row>
    <v-row class="mt-1">
      <v-col class="text-end">
        <label class="message"
          >変更内容を保存する場合は登録を行ってください</label
        >
        <v-btn class="ml-2" height="24" elavation="1" :disabled="activateCancel"
          >キャンセル</v-btn
        >
        <v-btn class="ml-16" color="blue" height="24">権限登録</v-btn>
      </v-col>
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
      signExplainFlag: false,
      authBtnActive: { 1: true },
      authBtnSelected: 1, // 権限入力の選択状態
      selAccount: 1,
      selOther: 1,
      syozokuGroup: 1,
      selFilter: [],
      selected: 0,
      syokuinViewData: [],
      accountCount: 0,
      activateCancel: true,
      groupArray: [
        {
          id: 1,
          value: '障害者支援施設 いるか園',
        },
        {
          id: 2,
          value: 'グループホームいるか',
        },
        {
          id: 3,
          value: '相談支援センターいるか',
        },
      ],
      accountsArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: '発行済',
        },
        {
          id: 3,
          value: '未発行',
        },
      ],
      filterArray: [
        {
          id: 1,
          value: '使用中',
        },
        {
          id: 2,
          value: '仮登録',
        },
        {
          id: 3,
          value: '停止中',
        },
      ],
      otherArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: 'メール有',
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
          header: 'メール',
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
          header: '利用状況',
          binding: 'accountStatus',
          width: 100,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '事業者情報',
          binding: 'column_1',
        },
        {
          id: 2,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '利用者台帳',
          binding: 'column_2',
        },
        {
          id: 3,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '職員情報',
          binding: 'column_3',
        },
        {
          id: 4,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '電文作成',
          binding: 'column_4',
        },
        {
          id: 5,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '生活支援',
          binding: 'column_5',
        },
        {
          id: 6,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '施設請求',
          binding: 'column_6',
        },
        {
          id: 7,
          top: 'グランドメニュー権限',
          middle: 'GHいるか',
          bottom: '生活支援',
          binding: 'column_7',
        },
        {
          id: 8,
          top: 'グランドメニュー権限',
          middle: 'GHいるか',
          bottom: 'GH請求',
          binding: 'column_8',
        },
      ],
      authItem: [
        { id: 1, text: '〇 一般権限', value: '〇' },
        { id: 2, text: '● 管理権限', value: '●' },
        { id: 0, text: 'クリア', value: '' },
      ],
      filtered: {}, // フィルターデータ
      headerheight: 200,
      explainArray: [
        {
          icon: '〇',
          text: 'グランドメニューにボタン表示',
        },
        {
          icon: '●',
          text: 'ボタン表示＋画面権限設定が編集可能',
        },
        {
          icon: '',
          text: '勤務終了済職員に対してボタン表示中',
          bk: 'pinkBackColor',
        },
        {
          icon: '新規',
          text: '職員マスタ登録後、アカウント必要有無が未登録',
          bk: 'brownBackColor',
        },
      ],
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('syokuinListGrid') != null) {
        document.getElementById('syokuinListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },

    onAlphabetical() {
      //this.userFilter();
    },
    onInitialized(flexGrid) {
      this.createHeader(flexGrid);
      // itemscourceデータ
      this.syokuinViewData = [];
      let syokuinViewData = [];
      syokuinViewData.push({
        syokuinCode: '100001',
        syokuinName: '奈良和彦',
        syokusyu: 'サービス管理責任者',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '有',
        accountID: 'tokei100001100063',
        accountStatus: '使用中',
        column_1: '●',
        column_2: '●',
        column_3: '●',
        column_4: '〇',
        column_5: '〇',
      });
      syokuinViewData.push({
        syokuinCode: '100001',
        syokuinName: '奈良和彦',
        syokusyu: '指導員',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '有',
        accountID: 'tokei100001100063',
        accountStatus: '使用中',
        column_1: '●',
        column_2: '●',
        column_3: '●',
        column_4: '〇',
        column_5: '〇',
      });
      syokuinViewData.push({
        syokuinCode: '100001',
        syokuinName: '奈良和彦',
        syokusyu: '指導員',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '有',
        accountID: 'tokei100001100063',
        accountStatus: '使用中',
        column_1: '●',
        column_2: '●',
        column_3: '●',
        column_4: '〇',
        column_5: '〇',
      });
      syokuinViewData.push({
        syokuinCode: '100002',
        syokuinName: '平安静香',
        syokusyu: '事務',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '',
        mailFlag: '有',
        accountID: 'tokei1000013312345',
        accountStatus: '停止中',
        column_1: '',
        column_2: '',
        column_3: '',
        column_4: '',
        column_5: '',
      });
      syokuinViewData.push({
        syokuinCode: '100003',
        syokuinName: '鎌倉政子',
        syokusyu: '生活指導',
        syozokuJigyosyo: '001 障害者施設いるか園',
        startDate: '2020/00/00',
        endDate: '',
        taisyoku: '〇',
        mailFlag: '有',
        accountID: 'tokei1000013312345',
        accountStatus: '仮登録',
        checkedFlag: true,
        column_1: '〇',
        column_2: '',
        column_3: '',
        column_4: '',
        column_5: '●',
        column_6: '●',
        column_7: '〇',
      });
      this.syokuinViewData = syokuinViewData;
      this.getAccountCount();
      flexGrid.frozenColumns = this.columnArray.length;
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });

      // グリッド押下時
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          // 権限のチェック
          if (ht.col > _self.columnArray.length - 1) {
            // 権限入力の選択状態
            let tempIcon = _self.getAuthSelecteToIdIcon(_self.authBtnSelected);
            // 選択したグランドメニュー権限のカラムの名前
            let colNumber = ht.col - _self.columnArray.length + 1;
            let column = 'column_' + colNumber;

            // 選択したデータのsyokuinCodeを取得
            // 同じsyokuinCodeのデータを更新
            let syokuinCode = _self.syokuinViewData[ht.row].syokuinCode;
            _self.editSyokuiCodeColumData(syokuinCode, column, tempIcon);
            // flexGrid.setCellData(tempIcon, ht.row, ht.col);
            flexGrid.refresh();
          }
        }
      });
    },
    /*******************
     * 指定したsyokuinCodeのデータを更新
     */
    editSyokuiCodeColumData(syokuinCode, editColumn, icon) {
      for (let i = 0; i < this.syokuinViewData.length; i++) {
        // syokuinCodeが選択した物と同じもの
        // 利用状況が停止中ではない
        if (
          this.syokuinViewData[i].syokuinCode == syokuinCode &&
          this.syokuinViewData[i].accountStatus != '停止中'
        ) {
          this.syokuinViewData[i][editColumn] = icon;
        }
      }
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
      let str = '';
      for (let i = 3; i <= this.columnArray.length - 1; i++) {
        str = i >= 7 ? 'アカウント管理' : '勤務情報';
        panel.setCellData(0, i, str);
      }
      flexGrid.columnHeaders.rows[2].height = 60;
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      let accountRowCount = this.columnArray.length - 1;

      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if ((e.col == 6 || e.col == 7) && e.row == 1) {
          wijmo.addClass(e.cell, 'vertical-write');
        }

        if (e.col >= 7 && e.col <= accountRowCount) {
          wijmo.addClass(e.cell, 'headerorange');
        }
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, 'headerpink');
        }
      }

      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1 || e.col == 2 || e.col == 3 || e.col == 8) {
          e.cell.style.textAlign = 'left';
        }

        // 上下のセルを比べて同じ場合に下のセルを消す
        let tmpitem = [];
        if (e.panel.rows[e.row]) {
          tmpitem = e.panel.rows[e.row].dataItem;
        }
        if (tmpitem.accountStatus == '停止中') {
          // 利用状況が停止中の場合は列以降をgrayに変更
          if (e.col > accountRowCount) {
            wijmo.addClass(e.cell, 'backgroundGray');
          }
        }
        let tmpitemBefore = [];
        if (e.panel.rows[e.row - 1]) {
          tmpitemBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemBefore != null &&
          tmpitem.syokuinCode == tmpitemBefore.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            e.cell.innerHTML = '';
          }
        }
        // 上下のセルを比べて同じ場合に上のセルの下線を消す
        let tmpitemAfter = [];
        let tmpBefore = [];
        if (e.panel.rows[e.row + 1]) {
          tmpitemAfter = e.panel.rows[e.row + 1].dataItem;
        }
        if (e.panel.rows[e.row - 1]) {
          tmpBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemAfter != null &&
          tmpitem.syokuinCode == tmpitemAfter.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            wijmo.addClass(e.cell, 'borderBottomNone');
          }
        }

        // 職員名に要確認アイコンをつける
        if (e.col == 1 && tmpitem.checkedFlag) {
          e.cell.innerHTML += '<span class="checkicon">新規</span>';
        }

        // 利用状況へ文字前にアイコンを付けるためclass付与
        if (
          e.col == accountRowCount &&
          tmpitem.accountStatus == '使用中' &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          wijmo.addClass(e.cell, 'setCheckIcon');
        }
        if (
          e.col == accountRowCount &&
          tmpitem.accountStatus == '停止中' &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          e.cell.innerHTML = '';
        }

        if (
          e.col == accountRowCount &&
          tmpitem.accountStatus == '仮登録' &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          wijmo.addClass(e.cell, 'setCheckIconNone');
        }

        if (e.col < this.columnArray.length - 3) {
          wijmo.addClass(e.cell, 'backgroundYellow');
        }
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
      for (let i = 0; i < this.columnArray.length; i++) {
        if (i < 6) {
          this.filterAbled.push(this.columnArray[i].binding);
        }
      }
    },
    /************************
     * 権限入力クリック
     */
    authClick(mine) {
      // クリア押下時はid:1に戻す
      if (mine == 0) {
        /*
        for (let i = 0; i < this.syokuinViewData.length; i++) {
            this.syokuinViewData[i][editColumn] = icon;
        }
        */
        // グランドメニュー権限のデータをクリア
        let editColumn = '';
        for (let i = 0; i < this.syokuinViewData.length; i++) {
          for (let c = 0; c < this.columnAuthArray.length; c++) {
            editColumn = this.columnAuthArray[c].binding;
            this.syokuinViewData[i][editColumn] = '';
          }
        }

        mine = 1;
      }
      this.authBtnActive = [];
      this.authBtnActive[mine] = true;
      this.authBtnSelected = mine; // 権限入力の選択値
    },
    /***********************
     * 選択しているidの値を元に表示されるiconを取得
     ***********/
    getAuthSelecteToIdIcon(select) {
      let temp = this.authItem.find((el) => el.id == select);
      return temp.value;
    },
    /****************************
     * アカウント発行要確認新規職員
     */
    getAccountCount() {
      // 新規のアイコンが表示されている数
      let array = this.syokuinViewData.map(function (value) {
        return value.checkedFlag ? 1 : 0;
      });
      this.accountCount = array.reduce((prev, current) => prev + current, 0);
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

div#accountsData {
  font-size: 12px;
  min-width: 1366px;
  #signExplain {
    position: absolute;
    width: 400px;
    padding: 10px;
    z-index: 1000;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.692);
    border: 3px solid $view_Title_background_Main;

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

  label {
    &.message {
      background-color: $red !important;
      color: $white;
      padding: 5px;
    }
    &.accountConfLabel {
      background-color: $view_Title_background_Orange;
      height: $height;
      width: 260px;
      display: block;
      text-align: center;
      line-height: $height;
    }
  }
  span {
    &.checkicon {
      font-size: 0.85%;
      display: inline-block;
      float: right;
      background-color: $brown;
      width: 30px;
      height: 15px;
      text-align: center;
      color: $white;
    }
  }
  button {
    &.isActive {
      color: $white;
      background-color: $view_Title_font_color_Blue;
    }
  }
  #alpCommon {
    height: $height;
  }
  #syokuinListGrid {
    .wj-cell {
      &.borderBottomNone {
        border-bottom: 0px;
      }
      &.backgroundYellow {
        background-color: $light-yellow;
      }
      &.backgroundGray {
        background-color: $selected_color;
      }
      &.setCheckIcon {
        &:before {
          content: url('../../assets/checkIcon.png');
          padding-right: 3px;
          padding-top: 3px;
        }
      }
      &.setCheckIconNone {
        &:before {
          content: url('../../assets/checkIconNone.png');
          padding-right: 3px;
          padding-top: 3px;
        }
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
      width: 200px;
      &.short {
        width: 140px;
      }
    }
  }
  .boarderArea {
    width: 200px;
    &.wMdle {
      width: 450px;
    }
  }

  .filterHeight {
    height: $height;
  }
}
</style>
