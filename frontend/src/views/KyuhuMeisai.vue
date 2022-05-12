<template>
  <div id="kyuhumeisai">
    <ServiceSelection
      @parent-calendar="parentCalendar($event, dateArgument)"
      :seikyuflag="true"
    >
    </ServiceSelection>
    <v-container fluid>
      <v-row no-gutters>
        <v-col class="leftArea">
          <UserList></UserList>
        </v-col>
        <v-col class="rightArea kyuhumeisai">
          <v-row justify="space-between">
            <v-col cols="6">
              <wj-flex-grid
                id="jyukyunoGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="受給者証番号"
                  binding="jyukyuno"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="2"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="3"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="4"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
              </wj-flex-grid>
              <wj-flex-grid
                id="jyukyunameGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block; margin-top: -1px"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="支給決定障害者等氏名"
                  binding="names"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="*"
                  binding="東経  さおり"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
              <wj-flex-grid
                id="shougaizinameGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block; margin-top: -1px"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="支給決定に係る障害児氏名"
                  binding="names"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="*"
                  binding=""
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="5">
              <div class="confirmTitle pa-1 white--text">
                確定済:2021.08.08 13:36 (担当者:大正 雅夫)
              </div>
              <v-row justify="end">
                <v-col cols="10">
                  <wj-flex-grid
                    id="shityousonnoGrid"
                    class="no-scrollbars"
                    :autoSearch="true"
                    :headersVisibility="'Column'"
                    :autoScroll="false"
                    :allowResizing="false"
                    :allowSorting="false"
                    :align="'canter'"
                    style="display: block"
                  >
                    <wj-flex-grid-column
                      :width="200"
                      header="市町村番号"
                      binding="jyukyuno"
                      :word-wrap="true"
                      :allowResizing="true"
                      :isReadOnly="true"
                    ></wj-flex-grid-column>
                    <wj-flex-grid-column width="0.1*"></wj-flex-grid-column>
                    <wj-flex-grid-column width="0.1*"></wj-flex-grid-column>
                    <wj-flex-grid-column width="0.1*"></wj-flex-grid-column>
                    <wj-flex-grid-column width="0.1*"></wj-flex-grid-column>
                    <wj-flex-grid-column width="0.1*"></wj-flex-grid-column>
                    <wj-flex-grid-column width="0.1*"></wj-flex-grid-column>
                  </wj-flex-grid>
                  <wj-flex-grid
                    id="jyukyunameGrid"
                    class="no-scrollbars"
                    :autoSearch="true"
                    :headersVisibility="'Column'"
                    :autoScroll="false"
                    :allowResizing="false"
                    :allowSorting="false"
                    style="display: block; margin-top: -1px"
                  >
                    <wj-flex-grid-column
                      :width="200"
                      header="支給決定に係る障害児氏名"
                      binding="names"
                      :word-wrap="true"
                      :allowResizing="true"
                      :isReadOnly="true"
                    ></wj-flex-grid-column>
                    <wj-flex-grid-column
                      width="*"
                      binding=""
                      :word-wrap="true"
                      :allowResizing="true"
                      :isReadOnly="true"
                    ></wj-flex-grid-column>
                  </wj-flex-grid>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="mt-0">
            <v-col cols="6">
              <wj-flex-grid
                id="jigyousyonoGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="指定事業所番号"
                  binding="jyukyuno"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="2"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="3"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="4"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
              </wj-flex-grid>
              <wj-flex-grid
                id="jigyousyaGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block; margin-top: -1px"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="事業者名"
                  binding="names"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="*"
                  binding="障害者支援施設 ひまわり園"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="5">
              <v-row justify="end">
                <v-col cols="6">
                  <wj-flex-grid
                    id="shityousonnoGrid"
                    class="no-scrollbars"
                    :autoSearch="true"
                    :headersVisibility="'Column'"
                    :autoScroll="false"
                    :allowResizing="false"
                    :allowSorting="false"
                    :align="'canter'"
                    style="display: block"
                  >
                    <wj-flex-grid-column
                      width="*"
                      header="地域区分"
                      binding="jyukyuno"
                      :word-wrap="true"
                      :allowResizing="true"
                      :isReadOnly="true"
                    ></wj-flex-grid-column>
                    <wj-flex-grid-column width="*"></wj-flex-grid-column>
                  </wj-flex-grid>
                </v-col>
              </v-row>
              <wj-flex-grid
                id="jyukyunameGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block; margin-top: -1px"
              >
                <wj-flex-grid-column
                  width="*"
                  header="就労継続支援A型事業者負担減免措置実施"
                  binding="names"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.31*"
                  binding=""
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
          <v-tabs>
            <v-tab>サービス明細欄</v-tab>
            <v-tab>請求額集計欄</v-tab>
          </v-tabs>

          <v-row class="mt-0">
            <v-col cols="4">
              <wj-flex-grid
                id="jigyousyonoGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="利用者負担上限額①"
                  binding="jyukyuno"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="5">
              <wj-flex-grid
                id="jigyousyonoGrid"
                class="no-scrollbars"
                :autoSearch="true"
                :headersVisibility="'Column'"
                :autoScroll="false"
                :allowResizing="false"
                :allowSorting="false"
                style="display: block"
              >
                <wj-flex-grid-column
                  :width="200"
                  header="利用者負担上限額①"
                  binding="jyukyuno"
                  :word-wrap="true"
                  :allowResizing="true"
                  :isReadOnly="true"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="0"
                ></wj-flex-grid-column>
                <wj-flex-grid-column
                  width="0.1*"
                  binding="1"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import UserList from '../components/UserList';

let daycount = 0;

export default {
  components: {
    ServiceSelection,
    UserList,
  },
  data() {
    return {
      daycount: daycount,
      dateArgument: '',
      searchArgument: '',
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#kyuhumeisai {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px !important;

  .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }

  .rightArea {
    min-width: 50%;
    max-width: none;
    width: 1020px;
    margin-left: 4px;
  }
  .kyuhumeisai .wj-flexgrid {
    border: none;
  }

  .kyuhumeisai .wj-header:first-child {
    text-align: center;
  }

  .kyuhumeisai .no-scrollbars.wj-flexgrid [wj-part='root'] {
    overflow: hidden !important;
  }
  .kyuhumeisai .no-scrollbars.wj-flexgrid [wj-part='ch'] {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .confirmTitle {
    font-size: $cell_fontsize;
    background-color: $red;
    color: $white;
    text-align: center;
    animation-name: fadeInAnime;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .v-slide-group__content {
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }

  .v-tab--active {
    background: #444;
    color: #eee;
    font-weight: 700;
  }
}
</style>
