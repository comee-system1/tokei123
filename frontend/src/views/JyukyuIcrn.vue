<template>
  <div>
    <v-layout>
      <v-flex md12 class="basic-info">
        <div>
          <label>サービス</label>
          <input
            type="text"
            value="1121000011_障害者支援施設_ひまわり園"
            style="width: 280px"
          />
          <select name="example" style="width: 150px">
            <option value="選択肢1">32: 施設入所支援</option>
            <option value="選択肢2">33: 施設入所支援</option>
            <option value="選択肢3">34: 施設入所支援</option>
          </select>
        </div>
        <div>
          <label>請求月</label>
          <input type="date" />
          <label>提供月</label>
          <input type="date" />
        </div>
      </v-flex>
    </v-layout>

    <v-container fluid>
      <v-layout>
        <v-flex md7>
          <div class="user-info">
            <label for="userCombo">利用者</label>
            <wj-combo-box
              id="userFilterComboString"
              :itemsSource="userFilterStrings"
              :displayMemberPath="'title'"
              :selectedValuePath="'id'"
              :initialized="initUserFilterComboString"
            ></wj-combo-box>

            <label>絞込</label>
            <div class="siborikomi-info">
              <div class="wj-labeled-input">
                <input id="btnAll" type="radio" name="siborikomi" checked />
                <label for="btnAll">全員</label>
              </div>
              <div class="wj-labeled-input">
                <input id="btnMi" type="radio" name="siborikomi" />
                <label for="btnMi">未入力</label>
              </div>
              <div class="wj-labeled-input">
                <input id="btnGire" type="radio" name="siborikomi" />
                <label for="btnGire">期限切れ</label>
              </div>
            </div>
          </div>
          <wj-flex-grid
            id="detailGrid"
            :headersVisibility="'Column'"
            :autoGenerateColumns="false"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowMerging="'All'"
            :allowResizing="false"
            :allowSorting="false"
            :selectionMode="'Row'"
            :initialized="gridInitialized"
          >
            <wj-flex-grid-column
              binding="error"
              header="エラー"
              :width="30"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="no"
              header="受給者証番号"
              :width="'3*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="name"
              header="氏名"
              :width="'*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="koufuymd"
              header="交付日"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="engo"
              header="援護者"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="jitibangou"
              header="助成自治体番号"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="jyukyukbn"
              header="受給者区分"
              :width="'3*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="jyukyuname"
              header="受給者氏名"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="syougaisyu"
              header="障害種別"
              :width="'3*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="syougaisienkbn"
              header="障害支援区分"
              :width="'3*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="futanjyougen"
              header="利用者負担上限月額"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="jyougenkanri"
              header="上限額管理事業所"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="syokujiteikyo"
              header="食事提供体制"
              :width="'3*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="tokubetukyufu"
              header="特別給付費"
              :width="'9*'"
              :wordWrap="true"
            />
            <wj-flex-grid-column
              binding="syusei"
              header="修正"
              :width="'3*'"
              :wordWrap="true"
            />
          </wj-flex-grid>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
// import * as wjGrid from '@grapecity/wijmo.grid';
export default {
  data() {
    return {
      userFilterStrings: [
        { title: '全員', id: 1 },
        { title: '表示②', id: 2 },
        { title: '表示③', id: 3 },
      ],
      userFilterComboString: '',
    };
  },
  methods: {
    initUserFilterComboString: function (combo) {
      this.userFilterComboString = combo;
      this.userFilterComboString.selectedValue = 1;
    },
  },
};
</script>

<style scoped lang="scss">
.basic-info {
  background-color: #333;
  height: 70px;
  padding: 10px;

  label {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }

  input,
  select {
    background: white;
    font-size: 14px;
    margin-left: 10px;
  }
}

.user-info {
  padding: 0;
  margin-bottom: 20px;
  font-size: 14px;
  label {
    margin-left: 20px;
    margin-right: 10px;
  }
}
.siborikomi-info {
  position: relative;
  display: inline-block;
  border: 1px solid lightgray;
  width: 350px;
  border-radius: 10px;

  .wj-labeled-input {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: 90px;
    height: auto;
    max-width: 100%;
    margin: 0 15px 0 0px;
    padding: 5px 0;

    input[type='radio'] + label {
      color: black;
    }
    input[type='radio']:checked + label {
      color: blue;
      font-weight: bold;
    }
  }
}
#detailGrid {
  font-size: 12px;
  width: auto;
  height: 735px;
}
</style>
