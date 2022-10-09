<template>
  <div id="ChiikiteityakuDaicho" class="ma-1" :style="styles">
    <v-container class="ml-1 pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col>
        <v-col :style="{ 'max-width': rightWidth }">
          <v-row no-gutters class="rowStyle_Dark tall pa-1">
            <v-card class="koumokuTitle titleBlueDark" outlined tile>
              利用者名
            </v-card>
            <v-card
              elevation="0"
              outlined
              tile
              class="ml-1 pl-1 lightYellow body-2"
              width="300"
              height="24"
            >
              {{ userName }}
            </v-card>
            <v-btn small height="24" class="ml-1">利用者選択</v-btn>
          </v-row>
          <v-row no-gutters class="rowStyle_Dark tall pa-1 mt-1">
            基本情報
          </v-row>
          <table class="table mt-1 body-2">
            <tr>
              <th>氏名</th>
              <td class="w200">東経真奈美</td>
              <th>生年月日</th>
              <td class="w200">平成9年10月5日</td>
              <th>年齢</th>
              <td class="w80">31歳</td>
              <th>性別</th>
              <td class="w80">男性</td>
            </tr>
            <tr>
              <th rowspan="2">住所</th>
              <td colspan="3" rowspan="2"></td>
              <th>電話番号①</th>
              <td colspan="3"></td>
            </tr>
            <tr>
              <th>電話番号②</th>
              <td colspan="3"></td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td colspan="3"></td>
              <th>携帯番号</th>
              <td colspan="3"></td>
            </tr>
            <tr>
              <th>携帯メール</th>
              <td colspan="3"></td>
              <th>FAX番号</th>
              <td colspan="3"></td>
            </tr>
          </table>

          <v-row no-gutters class="rowStyle_Dark tall pa-1 mt-1">
            利用者の心身の状況
          </v-row>
          <v-card class="mt-1 pa-2 lightYellow body-2" outlined>
            筋ジス、区分6、1日6時間介護、夜間寝返り可能
          </v-card>
          <wj-flex-grid
            id="chiikiKeikakuListGrid"
            class="mt-1"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :allowDragging="false"
            :selectionMode="'None'"
            :isReadOnly="false"
            :initialized="onInitialize"
            :itemsSource="viewdata"
          >
            <wj-flex-grid-column
              :header="'項目'"
              :binding="'komoku'"
              align="center"
              valign="middle"
              format="g"
              width="2*"
              :isReadOnly="true"
            ></wj-flex-grid-column>

            <wj-flex-grid-column
              :header="'数値'"
              :binding="'suti'"
              align="center"
              valign="middle"
              :width="40"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'点数'"
              :binding="'tensu'"
              align="center"
              valign="middle"
              :width="40"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              :header="'選択肢'"
              :binding="'sentaku'"
              align="center"
              valign="middle"
              width="5*"
              :allowResizing="false"
              :isReadOnly="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>

          <v-row no-gutters class="rowStyle_Dark tall pa-1">
            利用者の心身の状況
          </v-row>
          <v-card class="mt-1 pa-2 lightYellow body-2" outlined>
            アパートで一人暮らし<br />
            重度訪問介護 8:00～24:00 毎日利用
          </v-card>

          <v-row no-gutters class="rowStyle_Dark tall pa-1 mt-1">
            緊急時に必要な連絡先
          </v-row>
          <v-card class="mt-1 pa-2 lightYellow body-2" outlined>
            ヘルパー事業所たんぽぽ 03-4444-8585<br />
            主治医 特になし(前回肺炎入院先：東経市民病院 03-2222-4414)<br />
            実家・親戚 県外
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import dayjs from 'dayjs';
import * as wjGrid from '@grapecity/wijmo.grid';
// import sysConst from '@/utiles/const';
import UserList from '../../../src/components/UserList.vue';
export default {
  // props: {
  //   selectedData: Object, // 検索条件等
  // },
  components: {
    UserList,
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  mounted() {},
  data: function () {
    return {
      leftWidth: '280px',
      rightWidth: '78.5%',
      viewdata: [],
    };
  },
  methods: {
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },

    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '99%';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '78.5%';
      }
    },

    onInitialize(flexGrid) {
      let viewdata = [];
      viewdata.push({
        komoku: '介護の必要度',
        suti: '',
        tensu: '',
        sentaku: '',
      });
      viewdata.push({
        komoku: '自立の状況',
        suti: '',
        tensu: '',
        sentaku: '',
      });
      this.viewdata = viewdata;

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (c == 0) {
            cell.style.textAlign = 'left';
          }
          if (c == 3) {
            let html = '';
            html = '<ul>';
            html += '<li>□<span>24時間介護</span></li>';
            html += '<li>■<span class="r">ある程度の介護必要</span></li>';
            html += '<li>□<span>介護必要なし</span></li>';
            html += '</ul>';
            cell.innerHTML = '<div class="text-left">' + html + '</div>';
          }
        }
      };
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#ChiikiteityakuDaicho {
  min-width: 1266px !important;
  max-width: 1920px;
  width: auto;
  .table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    font-size: 12px;
    th {
      background-color: $view_Title_background_Blue;
      text-align: center;
      padding: 4px;
      font-weight: normal;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      width: 80px;
    }
    td {
      background-color: $grid_background;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 4px;
      width: 160px;
      &.w80 {
        width: 80px;
      }
      &.w200 {
        width: 200px;
      }
    }
  }
  ul {
    text-decoration: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 140px;
      span {
        &.r {
          color: $Hissu_Color;
        }
      }
    }
    &:after {
      clear: both;
      display: block;
    }
  }
}
</style>
