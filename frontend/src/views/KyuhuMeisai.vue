<template>
<div id="kyuhumeisai">
  <ServiceSelection
    @parent-calendar="parentCalendar($event, dateArgument)"
    @parent-service-select="parentSearch($event, searchArgument)"
    :seikyuflag="true"
  >
  </ServiceSelection>
  <v-container class="kyuhumeisai" fluid>
    <v-row no-gutters>
      <v-col class="leftArea">
        <UserList></UserList>
      </v-col>
      <v-col class="rightArea">
        <wj-flex-grid
          id="jyukyunotGrid"
          class="mt-1"
          :autoSearch="true"
          :headersVisibility="'Column'"
          :initialized="onInitializedUser"
          :itemsSource="usersData"
          :allowDragging="false"
          :allowResizing="true"
          :allowSorting="false"
          style="display: block;"
        >
          <wj-flex-grid-column header="受給者番号" binding="jyukyuno" :word-wrap="true" :allowResizing="true" :isReadOnly="true"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
          <wj-flex-grid-column :width="'8*'"></wj-flex-grid-column>
        </wj-flex-grid>
        <wj-flex-grid
          id="userListGrid"
          class="mt-0"
          :autoSearch="true"
          :headersVisibility="'Column'"
          :initialized="onInitializedUser"
          :itemsSource="usersData"
          :allowDragging="false"
          :allowResizing="true"
          :allowSorting="false"
          style="border: none;display: block;"
        >
          <wj-flex-grid-column header="利用者名" binding="names" :word-wrap="true" :allowResizing="true" :isReadOnly="true"></wj-flex-grid-column>
          <wj-flex-grid-column binding="" :word-wrap="true" :allowResizing="true" :isReadOnly="true"></wj-flex-grid-column>
        </wj-flex-grid>
        <v-card class="d-flex" flat tile>
          <v-card elevation="0">
            <v-radio-group row v-model="nyuuinbiShiseturiyo"
              >表示
              <v-radio
                label="あり"
                :key="1"
                :value="1"
                class="ml-2"
              ></v-radio>
              <v-radio label="なし" :key="0" :value="0"></v-radio>
            </v-radio-group>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import UserList from '../components/UserList';

let daycount = 0;

export default{
  components:{
    ServiceSelection,
    UserList,
  },
  data(){
    return{
      daycount: daycount,
      dateArgument: '',
      searchArgument: '',
    };
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

  #kyuhumeisai {
  font-size: 14px;
  font-family: 'メイリオ';
  min-width: 1266px !important;
  }

  #kyuhumeisai .leftArea {
    min-width: 275px;
    max-width: 275px;
    width: 275px;
  }

  #kyuhumeisai .rightArea {
    min-width: 50%;
    max-width: none;
    width: 1020px;
    margin-left:4px;
  }
  #jyukyunotGrid {
    width: 40%;
  }
</style>
