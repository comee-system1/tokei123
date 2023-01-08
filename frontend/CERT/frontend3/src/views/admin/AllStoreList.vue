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
        <v-card
          elevation="0"
          v-if="syokuinViewDataFlag"
          id="syokuinViewDataNone"
        >
          <div id="noListLogo"></div>
          <p>
            選択された所属事業所に勤務する職員が登録されていません。<br />
            <a href="">職員マスタ</a
            >にて、勤務情報を設定した職員を登録してください。
          </p>
        </v-card>
      </wj-flex-grid>
    </v-row>
  </div>
</template>
<script>
import AlphabetButton from "@/components/AlphabetButton.vue";
import * as wjGrid from "@grapecity/wijmo.grid";
// import * as wijmo from "@grapecity/wijmo";
import "@grapecity/wijmo.cultures/wijmo.culture.ja";
import "@grapecity/wijmo.vue2.grid.filter";
import { WjFlexGrid, WjFlexGridColumn } from "@grapecity/wijmo.vue2.grid";
import { WjFlexGridFilter } from "@grapecity/wijmo.vue2.grid.filter";
import sysConst from "@/utiles/const";

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
    window.addEventListener("resize", this.calculateWindowHeight);
    //this.filtered.showFilterIcons = false;
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        "--height": window.innerHeight - this.headerheight + "px",
      };
    },
  },

  data() {
    return {
      query: this.$route.params.client,
      dialogAccountFlag: false,
      syokuinViewDataFlag: false,
      flexGrid: [],
      signExplainFlag: false,
      authBtnActive: { 1: true },
      authBtnSelected: 1, // 権限入力の選択状態
      selAccount: 1,
      selOther: 1,
      syozokuGroup: 999,
      selFilter: [1, 2, 3],
      selected: 0,
      syokuinViewData: [],
      accountCount: 0,
      activateCancel: true,
      groupArray: [
        {
          id: 999,
          value: "",
        },
        {
          id: 1,
          value: "障害者支援施設　いるか園",
        },
        {
          id: 2,
          value: "グループホーム　いるか園",
        },
        {
          id: 3,
          value: "総合支援センター　いるか園",
        },
      ],
      accountsArray: [
        {
          id: 1,
          value: "全表示",
        },
        {
          id: 2,
          value: "発行済",
        },
        {
          id: 3,
          value: "未発行",
        },
      ],
      filterArray: [
        {
          id: 1,
          value: "使用中",
        },
        {
          id: 2,
          value: "仮登録",
        },
        {
          id: 3,
          value: "停止中",
        },
      ],
      otherArray: [
        {
          id: 1,
          value: "全表示",
        },
        {
          id: 2,
          value: "メール有",
        },
        {
          id: 3,
          value: "権限未設定",
        },
      ],
      filterAbled: [],
      columnArray: [
        {
          id: 1,
          header: "コード",
          binding: "syokuinCode",
          width: 80,
        },
        {
          id: 2,
          header: "職員名",
          binding: "syokuinName",
          width: 200,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "事業者情報",
          binding: "groundAuth.column_1",
        },
        {
          id: 2,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "利用者台帳",
          binding: "groundAuth.column_2",
        },
        {
          id: 3,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "職員情報",
          binding: "groundAuth.column_3",
        },
        {
          id: 4,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "電文作成",
          binding: "groundAuth.column_4",
        },
        {
          id: 5,
          top: "グランドメニュー権限",
          middle: "いるか園",
          bottom: "生活支援",
          binding: "groundAuth.column_5",
        },
        {
          id: 6,
          top: "グランドメニュー権限",
          middle: "いるか園",
          bottom: "施設請求",
          binding: "groundAuth.column_6",
        },
        {
          id: 7,
          top: "グランドメニュー権限",
          middle: "GHいるか",
          bottom: "生活支援",
          binding: "groundAuth.column_7",
        },
        {
          id: 8,
          top: "グランドメニュー権限",
          middle: "GHいるか",
          bottom: "GH請求",
          binding: "groundAuth.column_8",
        },
      ],
      authItem: [
        { id: 1, text: "〇 一般権限", value: "〇" },
        { id: 2, text: "● 管理権限", value: "●" },
        { id: 0, text: "クリア", value: "" },
      ],
      filtered: {}, // フィルターデータ
      headerheight: 240,
      explainArray: sysConst.TOOLTIPMESSAGE,
      searchOption: {}, // 検索条件
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById("syokuinListGrid") != null) {
        document.getElementById("syokuinListGrid").style.height =
          window.innerHeight - this.headerheight + "px";
      }
    },
    onSyozokuGroupChange() {
      let selected = this.syozokuGroup;
      let temp = this.groupArray.find(function (value) {
        return value.id == selected ? value : "";
      });
      this.searchOption.syozokuGroup = temp.value;
      this.searched();
    },
    onSelAccount() {
      let select = this.selAccount;
      let selected = this.accountsArray.find(function (value) {
        return value.id == select ? value : "";
      });
      this.searchOption.accountSelect = selected.id;
      this.searched();
    },

    onAlphabetical(k) {
      this.searched(k);
    },
    searched(alphabetkey = "") {
      let temp = this.syokuinViewData;
      let result = temp;
      // 所属事業所検索
      let syozokuGroup = this.searchOption.syozokuGroup;
      if (syozokuGroup) {
        result = temp.filter((value) => value.syozokuJigyosyo === syozokuGroup);
      }
      // アカウントID検索
      if (
        this.searchOption.accountSelect &&
        this.searchOption.accountSelect != 1
      ) {
        let accountTemp = [];

        for (let i = 0; i < result.length; i++) {
          // 発行済み
          if (
            this.searchOption.accountSelect == 2 &&
            result[i].accountID.length > 0
          ) {
            accountTemp.push(result[i]);
          }
          // 未発行
          if (
            this.searchOption.accountSelect == 3 &&
            result[i].accountID.length == 0
          ) {
            accountTemp.push(result[i]);
          }
        }

        result = accountTemp;
      }

      // 利用状況
      let selFilter = this.searchOption.selFilter;
      if (selFilter && selFilter.length != 0) {
        let filterTemp = [];
        for (let i = 0; i < result.length; i++) {
          // 使用中
          if (
            selFilter.indexOf(1) != -1 &&
            result[i].accountStatus == this.filterArray[0].value
          ) {
            filterTemp.push(result[i]);
          }
          // 仮登録
          if (
            selFilter.indexOf(2) != -1 &&
            result[i].accountStatus === this.filterArray[1].value
          ) {
            filterTemp.push(result[i]);
          }
          // 停止中
          if (
            selFilter.indexOf(3) != -1 &&
            result[i].accountStatus === this.filterArray[2].value
          ) {
            filterTemp.push(result[i]);
          }
        }
        result = filterTemp;
      }

      // その他絞込
      let otherSelect = this.searchOption.otherSelect;
      if (otherSelect && otherSelect.id != 1) {
        let otherTemp = [];
        for (let i = 0; i < result.length; i++) {
          // メール有
          if (otherSelect.id == 2 && result[i].mailFlag != "") {
            otherTemp.push(result[i]);
          }
          // 権限未設定
          if (otherSelect.id == 3 && result[i].groundAuthFlag != 0) {
            otherTemp.push(result[i]);
          }
        }
        result = otherTemp;
      }
      // アルファベット検索
      if (alphabetkey > 0) {
        let tmpviewdata = result.concat();
        result = this.$refs.alp.alphabetFilter(tmpviewdata, "rkana");
      }
      // データが取得できなかったときの説明文の表示フラグ切り替え
      if (result.length == 0) {
        this.syokuinViewDataFlag = true;
      } else {
        this.syokuinViewDataFlag = false;
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
        syokuinCode: "00001",
        syokuinName: "東経 太郎",
        rkana: "ﾀﾛｳﾄｳｹｲ",
        syokusyu: "施設長",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample1@sample.co.jp",
        mailFlag: "有",
        accountID: "tokeitaro00001",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "●",
          column_2: "●",
          column_3: "●",
          column_4: "〇",
          column_5: "〇",
          column_6: "〇",
          column_7: "〇",
          column_8: "〇",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00001",
        syokuinName: "東経 太郎",
        rkana: "ﾀﾛｳﾄｳｹｲ",
        syokusyu: "施設長",
        syozokuJigyosyo: "グループホーム　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample1@sample.co.jp",
        mailFlag: "有",
        accountID: "tokeitaro00001",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "●",
          column_2: "●",
          column_3: "●",
          column_4: "〇",
          column_5: "〇",
          column_6: "〇",
          column_7: "〇",
          column_8: "〇",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00001",
        syokuinName: "東経 太郎",
        rkana: "ﾀﾛｳﾄｳｹｲ",
        syokusyu: "施設長",
        syozokuJigyosyo: "総合支援センター　いるか園",
        startDate: "2019/10/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample1@sample.co.jp",
        mailFlag: "有",
        accountID: "tokeitaro00001",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "●",
          column_2: "●",
          column_3: "●",
          column_4: "〇",
          column_5: "〇",
          column_6: "〇",
          column_7: "〇",
          column_8: "〇",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00002",
        syokuinName: "明治 雅夫",
        rkana: "ﾒｲｼﾞﾏｻｵ",
        syokusyu: "サービス管理責任者",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample2@sample.co.jp",
        mailFlag: "有",
        accountID: "meijimasao00002",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "●",
          column_2: "●",
          column_3: "●",
          column_4: "",
          column_5: "●",
          column_6: "",
          column_7: "",
          column_8: "",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00002",
        syokuinName: "明治 雅夫",
        rkana: "ﾒｲｼﾞﾏｻｵ",
        syokusyu: "サービス管理責任者",
        syozokuJigyosyo: "グループホーム　いるか園",
        startDate: "2018/10/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample2@sample.co.jp",
        mailFlag: "有",
        accountID: "meijimasao00002",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "●",
          column_2: "●",
          column_3: "●",
          column_4: "",
          column_5: "●",
          column_6: "",
          column_7: "",
          column_8: "",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00002",
        syokuinName: "明治 雅夫",
        rkana: "ﾒｲｼﾞﾏｻｵ",
        syokusyu: "サービス管理責任者",
        syozokuJigyosyo: "障害者支援施設　みどり園",
        startDate: "2019/10/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample2@sample.co.jp",
        mailFlag: "有",
        accountID: "meijimasao00002",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "●",
          column_2: "●",
          column_3: "●",
          column_4: "",
          column_5: "●",
          column_6: "",
          column_7: "",
          column_8: "",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00003",
        syokuinName: "昭和　和夫",
        rkana: "ｼｮｳﾜｶｽﾞｵ",
        syokusyu: "事務員",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample3@sample.co.jp",
        mailFlag: "有",
        accountID: "syowa00003",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "〇",
          column_2: "〇",
          column_3: "〇",
          column_4: "〇",
          column_5: "●",
          column_6: "●",
          column_7: "●",
          column_8: "●",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00003",
        syokuinName: "昭和　和夫",
        rkana: "ｼｮｳﾜｶｽﾞｵ",
        syokusyu: "事務員",
        syozokuJigyosyo: "障害者支援施設　みどり園",
        startDate: "2019/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample3@sample.co.jp",
        mailFlag: "有",
        accountID: "syowa00003",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "〇",
          column_2: "〇",
          column_3: "〇",
          column_4: "〇",
          column_5: "●",
          column_6: "●",
          column_7: "●",
          column_8: "●",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00004",
        syokuinName: "平成　麗子",
        rkana: "ﾍｲｾｲﾚｲｺ",
        syokusyu: "事務員",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2020/07/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample4@sample.co.jp",
        mailFlag: "",
        accountID: "heisei00004",
        accountStatus: "仮登録",
        groundAuth: {
          column_1: "〇",
          column_2: "〇",
          column_3: "〇",
          column_4: "〇",
          column_5: "〇",
          column_6: "〇",
          column_7: "〇",
          column_8: "〇",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00005",
        syokuinName: "令和　弘",
        rkana: "ﾚｲﾜﾋﾛｼ",
        syokusyu: "事務員",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample5@sample.co.jp",
        mailFlag: "有",
        accountID: "reiwa00005",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "〇",
          column_2: "〇",
          column_3: "〇",
          column_4: "〇",
          column_5: "〇",
          column_6: "〇",
          column_7: "〇",
          column_8: "〇",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00006",
        syokuinName: "福島　恵子",
        rkana: "ｹｲｺﾌｸｼﾏ",
        syokusyu: "事務員",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "",
        mailFlag: "",
        accountID: "",
        accountStatus: "未登録",
        groundAuth: {
          column_1: "",
          column_2: "",
          column_3: "",
          column_4: "",
          column_5: "",
          column_6: "",
          column_7: "",
          column_8: "",
        },
        checkedFlag: true,
      });
      syokuinViewData.push({
        syokuinCode: "00007",
        syokuinName: "平成　慎吾",
        rkana: "ｼﾝｺﾞﾍｲｾｲ",
        syokusyu: "生活指導員",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "",
        taisyoku: "",
        mailAddress: "sample7@sample.co.jp",
        mailFlag: "",
        accountID: "",
        accountStatus: "停止中",
        groundAuth: {
          column_1: "",
          column_2: "",
          column_3: "",
          column_4: "",
          column_5: "",
          column_6: "",
          column_7: "",
          column_8: "",
        },
        checkedFlag: true,
      });
      syokuinViewData.push({
        syokuinCode: "00010",
        syokuinName: "岐阜　健太",
        rkana: "ｷﾞﾌｹﾝﾀ",
        syokusyu: "看護師",
        syozokuJigyosyo: "障害者支援施設　いるか園",
        startDate: "2018/04/01",
        endDate: "2022/10/15",
        taisyoku: "",
        mailAddress: "sample10@sample.co.jp",
        mailFlag: "",
        accountID: "",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "",
          column_2: "",
          column_3: "",
          column_4: "",
          column_5: "〇",
          column_6: "",
          column_7: "",
          column_8: "",
        },
      });
      syokuinViewData.push({
        syokuinCode: "00010",
        syokuinName: "岐阜　健太",
        rkana: "ｷﾞﾌｹﾝﾀ",
        syokusyu: "看護師",
        syozokuJigyosyo: "障害者支援施設　みどり園",
        startDate: "2019/10/01",
        endDate: "",
        taisyoku: "",
        mailFlag: "",
        accountID: "",
        accountStatus: "使用中",
        groundAuth: {
          column_1: "",
          column_2: "",
          column_3: "",
          column_4: "",
          column_5: "〇",
          column_6: "",
          column_7: "",
          column_8: "",
        },
      });

      this.syokuinViewData = syokuinViewData;
      this.searched();
      this.getAccountCount();
      flexGrid.frozenColumns = this.columnArray.length;
      //フィルタ表示切替
      // flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
      //   this.filtered.showFilterIcons = true;
      // });
      // flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
      //   this.filtered.showFilterIcons = false;
      // });

      // グリッド押下時
      let _self = this;
      flexGrid.hostElement.addEventListener("click", function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          // 利用状況を押下し、状態に応じた職員アカウント情報ダイアログ画面を表示
          if (ht.col == _self.columnArray.length - 1) {
            console.log(flexGrid.itemsSource[ht.row]);
            let temp = flexGrid.itemsSource[ht.row];
            _self.dialogSyokuinName = temp.syokuinName; // 職員名
            // アカウント発行 未登録の場合は0
            if (temp.accountStatus == "未登録") {
              _self.dialogAccount = 0;
            } else {
              _self.dialogAccount = 1;
            }
            _self.dialogAccountID = temp.accountID; // アカウントID
            _self.dialogAccountMail = temp.mailAddress; // メールアドレス

            // 使用中
            if (temp.accountStatus == _self.filterArray[0].value) {
              _self.useButton = "useButton";
              _self.dialogMessageUse =
                _self.filterArray[0].value +
                "：福祉見聞録システムにログインできます。";
            }
            // 仮登録
            if (temp.accountStatus == _self.filterArray[1].value) {
              _self.useButton = "tempButton";
              _self.dialogMessageUse =
                _self.filterArray[1].value +
                "：福祉見聞録システムにログインできますが、仮パスワードの状態です。";
            }
            // 停止中
            if (temp.accountStatus == _self.filterArray[2].value) {
              _self.useButton = "stopButton";
              _self.dialogMessageUse =
                _self.filterArray[2].value +
                "：福祉見聞録システムにログインできません。";
            }
            // 未登録
            if (temp.accountStatus == "未登録") {
              _self.useButton = "noRegistButton";
              _self.dialogMessageUse =
                "未登録：職員アカウントIDを発行していない状態です。";
            }

            _self.dialogAccountFlag = true;
          }
          // 権限のチェック
          if (ht.col > _self.columnArray.length - 1) {
            // 権限入力の選択状態
            let tempIcon = _self.getAuthSelecteToIdIcon(_self.authBtnSelected);
            // 選択したグランドメニュー権限のカラムの名前
            let colNumber = ht.col - _self.columnArray.length + 1;
            let column = "groundAuth.column_" + colNumber;

            // 選択したデータのsyokuinCodeを取得
            // 同じsyokuinCodeのデータを更新
            let syokuinCode = _self.syokuinViewData[ht.row].syokuinCode;

            _self.editSyokuiCodeColumData(syokuinCode, column, tempIcon);
            // flexGrid.setCellData(tempIcon, ht.row, ht.col);
            flexGrid.refresh();
            _self.activateCancel = false; // キャンセルボタン有効
          }
        }
      });
    },
    dialogAccountClose() {
      this.dialogAccountFlag = false;
    },
    /*******************
     * 指定したsyokuinCodeのデータを更新
     */
    editSyokuiCodeColumData(syokuinCode, editColumn, icon) {
      for (let i = 0; i < this.syokuinViewData.length; i++) {
        // syokuinCodeが選択した物と同じもの
        // 利用状況が未登録ではない
        if (
          this.syokuinViewData[i].syokuinCode == syokuinCode &&
          this.syokuinViewData[i].accountStatus != "未登録"
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

      let col = "";
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
      let str = "";
      for (let i = 3; i <= this.columnArray.length - 1; i++) {
        str = i >= 7 ? "アカウント管理" : "勤務情報";
        panel.setCellData(0, i, str);
      }
      flexGrid.columnHeaders.rows[2].height = 60;
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      let accountRowCount = this.columnArray.length - 1;
      console.log(flexGrid);
      console.log(e);
      console.log(accountRowCount);
      /*
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if ((e.col == 6 || e.col == 7) && e.row == 1) {
          wijmo.addClass(e.cell, "vertical-write");
        }

        if (e.col >= 7 && e.col <= accountRowCount) {
          wijmo.addClass(e.cell, "headerorange");
        }
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, "headerpink");
        }
      }
*/
      // if (e.panel.cellType == wjGrid.CellType.Cell) {

      // }
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
@import "@/assets/scss/common.scss";
@import "@grapecity/wijmo.styles/wijmo.css";

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
    #syokuinViewDataNone {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      z-index: 10000;
      #noListLogo {
        width: 140px;
        height: 140px;
        background-image: url("../../assets/noList.png");
        background-size: contain;
        margin: 0 auto;
      }
    }

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
      &.backgroundPink {
        background-color: $pink;
      }
      &.backgroundWhite {
        background-color: $white;
      }
      &.setCheckIcon {
        width: 20px;
        height: 14px;
        background-size: 60% 80%;
        text-indent: -9999px;
        background-repeat: no-repeat;
        background-position: 20px 3px;
        &.setCheckIconUsing {
          background-image: url("../../assets/usingButton.png");
        }
        &.setCheckIconNone {
          background-image: url("../../assets/tempRegistButton.png");
        }
        &.setCheckIconStop {
          background-image: url("../../assets/stoppingButton.png");
        }
      }
      &.setCheckIconNone {
        &:before {
          content: url("../../assets/checkIconNone.png");
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
      width: 400px;
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
