<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1000">
      <v-card elevation="2" class="pa-5">
        <v-toolbar-title class="text-subtitle-1"
          >サービス履歴　追加登録</v-toolbar-title
        >
        <v-row dense id="serviceArea" class="mt-5">
          <v-col cols="2">利用者名</v-col>
          <v-col class="ml-3">
            <wj-combo-box class="input w100" readonly></wj-combo-box>
            <wj-combo-box class="input w200" readonly></wj-combo-box>

            <v-btn
              elevation="0"
              class="pa-0 ml-1"
              x-small
              height="85%"
              style="min-width: auto; border-radius: 3px"
              tile
              @click="riyosyaClick(1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              class="pa-0 ml-1"
              x-small
              height="85%"
              style="min-width: auto; border-radius: 3px"
              tile
              @click="riyosyaClick(2)"
            >
              <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense class="mt-3">
          <v-col cols="7">
            <div height="30" id="serviceDialog">
              <v-btn-toggle v-model="toggle_tabs">
                <v-btn small elevation="0">追加</v-btn>
                <v-btn small elevation="0">修正</v-btn>
              </v-btn-toggle>
              <div>
                <v-card elevation="0" class="pl-2 pt-4">
                  <v-row dense>
                    <v-col cols="2">サービス事業所</v-col>
                    <v-col>
                      <wj-combo-box class="input w100"></wj-combo-box>
                      <wj-combo-box class="input w300"></wj-combo-box>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="2">サービス名称</v-col>
                    <v-col>
                      <wj-combo-box class="input w40"></wj-combo-box>
                      <wj-combo-box class="input w300"></wj-combo-box>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="2">開始日</v-col>
                    <v-col>
                      <wj-combo-box class="input w100"></wj-combo-box>
                      <v-icon small @click="datepicker_dialog = true"
                        >mdi-calendar-month</v-icon
                      >
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="2">終了日</v-col>
                    <v-col>
                      <wj-combo-box class="input w100"></wj-combo-box>
                      <v-icon small @click="datepicker_dialog = true"
                        >mdi-calendar-month</v-icon
                      >
                    </v-col>
                  </v-row>
                  <v-row dense class="mt-5 mb-5">
                    <v-col cols="3">
                      <v-btn tile small elevation="0" outlined
                        >画面クリア</v-btn
                      >
                    </v-col>
                    <v-col align="center">
                      最終登録者：2020/08/04 10:38 明治　正雄
                    </v-col>
                    <v-col cols="3" align="right">
                      <v-btn tile small elevation="0" outlined>追加登録</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
          </v-col>
          <v-col cols="5">
            <v-row dense class="mt-n12">
              <p class="text-caption">サービス事業所一覧 選択</p>
              <v-col cols="12" class="mt-n3">
                <v-btn-toggle v-model="display_service">
                  <v-btn small> 全部 </v-btn>
                  <v-btn small> 選択済 </v-btn>
                  <v-btn small> 未選択 </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <alphabet-button
                  ref="alphabetButton"
                  @onAlphabetical="onAlphabetical"
                ></alphabet-button>
              </v-col>
            </v-row>
            <wj-flex-grid
              :selectionMode="'None'"
              id="svListInitialize"
              :initialized="svListInitialize"
              :allowMerging="6"
              :headersVisibility="'Column'"
              :alternatingRowStep="0"
              :allowDragging="false"
              :allowResizing="false"
              :deferResizing="false"
              :allowSorting="false"
              :autoGenerateColumns="false"
              :itemsSource="serviceList"
              class="mt-1"
            >
              <wj-flex-grid-column
                :header="'コード'"
                :binding="'listCode'"
                align="center"
                valign="middle"
                :width="80"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'サービス事業所名'"
                :binding="'listJigyosyo'"
                align="center"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'サービス名称'"
                :binding="'listMeisyo'"
                align="center"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <label class="text-caption mr-3">表示</label>
            <v-btn-toggle v-model="display_service">
              <v-btn small> 最新履歴 </v-btn>
              <v-btn small> 全履歴 </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12">
            <wj-flex-grid
              :selectionMode="'None'"
              id="svEditInitialize"
              :initialized="svEditInitialize"
              :allowMerging="6"
              :headersVisibility="'Column'"
              :alternatingRowStep="0"
              :allowDragging="false"
              :allowResizing="false"
              :deferResizing="false"
              :allowSorting="false"
              :autoGenerateColumns="false"
              :itemsSource="serviceHistoryEdit"
            >
              <wj-flex-grid-column
                :header="'コード'"
                :binding="'editCode'"
                align="center"
                valign="middle"
                :width="80"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'サービス事業所名'"
                :binding="'editJigyosyomei'"
                align="center"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'サービス種別'"
                :binding="'editType'"
                align="center"
                valign="middle"
                width="2*"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'開始日'"
                :binding="'editStart'"
                align="center"
                valign="middle"
                :width="80"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'終了日'"
                :binding="'editEnd'"
                align="center"
                valign="middle"
                :width="80"
                :isReadOnly="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :header="'種類'"
                :binding="'editKind'"
                align="center"
                valign="middle"
                :width="40"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="datepicker_dialog" width="290">
      <v-date-picker
        type="date"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="dateSelect"
        v-model="picker"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker';
// import { ja } from 'vuejs-datepicker/dist/locale';
// import moment from 'moment';
import AlphabetButton from '@/components/AlphabetButton.vue';

export default {
  props: {},
  data() {
    return {
      dialog: true,
      datepicker_dialog: false,
    };
  },
  components: {
    AlphabetButton,
  },

  methods: {},
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/common.scss';

div#serviceArea {
  width: 500px;
}
div#serviceArea,
div#serviceDialog {
  font-size: 12px;
  min-width: 550px;
  .input {
    width: 100px;
    height: 20px;
    border-radius: 0px;
    &.w40 {
      width: 40px;
    }
    &.w100 {
      width: 100px;
    }
    &.w200 {
      width: 200px;
    }
    &.w300 {
      width: 300px;
    }
    &.w500 {
      width: 500px;
    }
  }
}
div#svListInitialize,
div#svEditInitialize {
  font-size: 12px;
  font-family: 'メイリオ';
}
</style>