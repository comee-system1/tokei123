<template>
  <div id="Kyuhu">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
      :seikyuflag="true"
      :searchButtonFlag="true"
      :registButtonFlag="false"
    ></header-services>
    <v-container fluid class="shisetsu-container">
      <v-row no-gutters>
        <v-col cols="3">
          <v-row no-gutters class="mb-1">
            <v-col cols="6">
              <v-card class="pa-2 red--text text--lighten-1" outlined tile>
                {{ buildcheck }}
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-btn class="pa-2 ml-2" @click="checkingRegist()">
                {{ checkbutton }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-for="(detail, index) in details"
            :key="index"
            no-gutters
            class="mb-1"
          >
            <v-col cols="6">
              <v-card class="pa-1 text-center titleback" outlined>{{
                detail.name
              }}</v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="ml-1 pa-1 light_yellow" tile outlined>{{
                detail.value
              }}</v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7" class="ml-1">
          <v-row no-gutters>
            <v-col class="ml-auto text-right">
              <v-btn @click="registPage()"> 施設体制修正 </v-btn>
              <v-card elevation="0" class="mt-2">
                (最終登録日:R03.04.05 10:10 昭和 一郎)
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters pa-0>
            <v-col cols="6">
              <wj-flex-grid
                :initialized="onInitializedBasic"
                :itemsSource="basicData"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                :alternatingRowStep="0"
                style="max-height: 130px"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'体制による基本単価減'"
                  :allowMerging="true"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
              <wj-flex-grid
                :initialized="onInitializedAdd"
                :itemsSource="basicAdd"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                :alternatingRowStep="0"
                style="max-height: 130px"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'施設体制による加算'"
                  :allowMerging="true"
                  width="*"
                  :alternatingRowStep="0"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
            <v-col cols="6" class="pl-1">
              <wj-flex-grid
                :initialized="onInitializedPlus"
                :itemsSource="basicPlus"
                :headersVisibility="'Column'"
                :autoGenerateColumns="false"
                :allowDragging="false"
                :allowResizing="false"
                :allowSorting="false"
                :isReadOnly="true"
                :alternatingRowStep="0"
                style="max-height: 265px"
              >
                <wj-flex-grid-column
                  :binding="'value'"
                  :header="'施設体制+個別による加算'"
                  :allowMerging="true"
                  width="*"
                ></wj-flex-grid-column>
              </wj-flex-grid>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card class="pa-2" outlined tile>
        <v-row no-gutters>
          <v-col sm="12">
            <v-row no-gutters>
              <v-col cols="2">
                <v-card class="pa-2 text-center blue lighten-4" outlined tile>
                  日別算定
                </v-card>
              </v-col>
              <v-col cols="4">
                <div class="my-n3">
                  <v-checkbox v-model="checkbox" :label="`有り`"></v-checkbox>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="mt-3">〇:対象日 ×:除外日</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <wj-flex-grid
              id="theGridTallRows"
              :itemsSource="dateData"
              :initialized="onInitializedDate"
              :headersVisibility="'Column'"
              :isReadOnly="true"
              :allowDragging="false"
              :allowResizing="false"
              :deferResizing="false"
              :allowSorting="false"
              :allowMerging="'ColumnHeaders'"
              :alternatingRowStep="0"
            >
              <wj-flex-grid-column
                header="加算・減算項目"
                binding="clumn"
                width="10*"
                :allowMerging="true"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                v-for="d in daycount"
                :key="d"
                width="1*"
                :header="year + '/' + month + '/' + d"
                :binding="'day' + d"
                :wordWrap="true"
                :allowResizing="false"
                :isReadOnly="true"
              ></wj-flex-grid-column>
            </wj-flex-grid>
            <v-btn>登録</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default{
  data(){
    return{
      currentPageTitle: this.$route.name
    }
  }
}
</script>

<style scoped>

</style>