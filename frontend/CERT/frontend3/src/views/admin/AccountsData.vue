<template>
  <div class="pa-1" id="accountsData">ssss</div>
</template>
<script>
export default {
  props: [],
  components: {},
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener("resize", this.calculateWindowHeight);
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
          value: "障害者支援施設 いるか園",
        },
        {
          id: 2,
          value: "グループホームいるか",
        },
        {
          id: 3,
          value: "相談支援センターいるか",
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
        {
          id: 3,
          header: "職種",
          binding: "syokusyu",
          width: 160,
        },
        {
          id: 4,
          header: "所属事業所",
          binding: "syozokuJigyosyo",
          width: 200,
        },
        {
          id: 5,
          header: "開始日",
          binding: "startDate",
          width: 100,
        },
        {
          id: 6,
          header: "終了日",
          binding: "endDate",
          width: 100,
        },
        {
          id: 7,
          header: "退職",
          binding: "taisyoku",
          width: 40,
        },
        {
          id: 8,
          header: "メール",
          binding: "mailFlag",
          width: 40,
        },
        {
          id: 9,
          header: "ID",
          binding: "accountID",
          width: 140,
        },
        {
          id: 10,
          header: "利用状況",
          binding: "accountStatus",
          width: 100,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "事業者情報",
          binding: "column_1",
        },
        {
          id: 2,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "利用者台帳",
          binding: "column_2",
        },
        {
          id: 3,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "職員情報",
          binding: "column_3",
        },
        {
          id: 4,
          top: "グランドメニュー権限",
          middle: "共通",
          bottom: "電文作成",
          binding: "column_4",
        },
        {
          id: 5,
          top: "グランドメニュー権限",
          middle: "いるか園",
          bottom: "生活支援",
          binding: "column_5",
        },
        {
          id: 6,
          top: "グランドメニュー権限",
          middle: "いるか園",
          bottom: "施設請求",
          binding: "column_6",
        },
        {
          id: 7,
          top: "グランドメニュー権限",
          middle: "GHいるか",
          bottom: "生活支援",
          binding: "column_7",
        },
        {
          id: 8,
          top: "グランドメニュー権限",
          middle: "GHいるか",
          bottom: "GH請求",
          binding: "column_8",
        },
      ],
      authItem: [
        { id: 1, text: "〇 一般権限", value: "〇" },
        { id: 2, text: "● 管理権限", value: "●" },
        { id: 0, text: "クリア", value: "" },
      ],
      filtered: {}, // フィルターデータ
      headerheight: 200,
      explainArray: [
        {
          icon: "〇",
          text: "グランドメニューにボタン表示",
        },
        {
          icon: "●",
          text: "ボタン表示＋画面権限設定が編集可能",
        },
        {
          icon: "",
          text: "勤務終了済職員に対してボタン表示中",
          bk: "pinkBackColor",
        },
        {
          icon: "新規",
          text: "職員マスタ登録後、アカウント必要有無が未登録",
          bk: "brownBackColor",
        },
      ],
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById("syokuinListGrid") != null) {
        document.getElementById("syokuinListGrid").style.height =
          window.innerHeight - this.headerheight + "px";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/common.scss";
@import "@grapecity/wijmo.styles/wijmo.css";

$height: 24px;
</style>
