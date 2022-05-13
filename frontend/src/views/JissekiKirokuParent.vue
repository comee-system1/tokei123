<template>
  <div id="jisseki-kiroku">
    <ServiceSelection
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-service-select="parentSearch($event, searchArgument)"
      :seikyuflag="true">
    </ServiceSelection>
    <v-container class="jissekikiroku" fluid>
      <v-row no-gutters>
        <v-col class="leftArea">
          <UserList
            @child-userslist="getUserListData"
            @child-selectedrow="getSelectedRow">
          </UserList>
        </v-col>
        <v-col class="rightArea">
          <SeikatsuKaigo v-if="searchArgument=='22 生活介護'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></SeikatsuKaigo>
          <Tanki v-else-if="searchArgument=='24 短期入所'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></Tanki>
          <ShisetsuNyusho v-else-if="searchArgument=='32 施設入所支援'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></ShisetsuNyusho>
          <Shukuhaku v-else-if="searchArgument=='34 宿泊型自立訓練'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></Shukuhaku>
          <KinoKunren v-else-if="searchArgument=='41 自立訓練(機能訓練)'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></KinoKunren>
          <SeikatsuKunren v-else-if="searchArgument=='42 自立訓練(生活訓練)'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></SeikatsuKunren>
          <ShuroIko v-else-if="searchArgument=='43 就労移行支援'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></ShuroIko>
          <ShurokeizokuA v-else-if="searchArgument=='45 就労継続支援A型'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></ShurokeizokuA>
          <ShurokeizokuB v-else-if="searchArgument=='46 就労継続支援B型'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></ShurokeizokuB>
          <ShuroTeichaku v-else-if="searchArgument=='47 就労定着支援'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></ShuroTeichaku>
          <JiritsuSeikatsu v-else-if="searchArgument=='35 自立生活援助'" :riyousya="riyousya" :zyukyusyaNum="zyukyusyaNum"></JiritsuSeikatsu>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import UserList from '../components/UserList';
import SeikatsuKaigo from '../components/JissekiKirokuSeikatsuKaigo.vue';
import ShisetsuNyusho from '../components/JissekiKirokuShisetsuNyusho.vue';
import Tanki from '../components/JissekiKirokuTanki.vue';
import Shukuhaku from '../components/JissekiKirokuShukuhaku.vue';
import KinoKunren from '../components/JissekiKirokuKinoKunren.vue';
import SeikatsuKunren from '../components/JissekiKirokuSeikatsuKunren.vue';
import ShuroIko from '../components/JissekiKirokuShuroIko.vue';
import ShurokeizokuA from '../components/JissekiKirokuShurokeizokuA.vue';
import ShurokeizokuB from '../components/JissekiKirokuShurokeizokuB.vue';
import ShuroTeichaku from '../components/JissekiKirokuShuroTeichaku.vue';
import JiritsuSeikatsu from '../components/JissekiKirokuJiritsuSeikatsu.vue';

import moment from 'moment';

let daycount = 0;

export default{
  components:{
    ServiceSelection,
    UserList,
    SeikatsuKaigo,
    Tanki,
    ShisetsuNyusho,
    Shukuhaku,
    KinoKunren,
    SeikatsuKunren,
    ShuroIko,
    ShurokeizokuA,
    ShurokeizokuB,
    ShuroTeichaku,
    JiritsuSeikatsu
  },
  data(){
    return{
      daycount: daycount,
      dateArgument: '',
      searchArgument: '',
      userListData: [], // 利用者一覧表示データ
      selectedRow: '', // 利用者一覧の選択行
      riyousya: '',
      zyukyusyaNum: '',
    };
  },
  methods: {
    parentCalendar(dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = moment(this.year + '-' + this.month + '-01');
      this.daycount = m.daysInMonth();
      daycount = this.daycount;
      this.createInfo();
    },
    parentSearch(searchArgument) {
      this.searchArgument = searchArgument.teikyoService;
    },
    getUserListData: function(data){
      // 利用者一覧で表示されているデータ一式を取得
      this.userListData = data;
    },
    getSelectedRow: function(data){
      // 利用者一覧の選択行を取得
      this.selectedRow = data;
      this.getSelectedUserData();
    },
    getSelectedUserData(){
      let selectedUser = this.userListData[this.selectedRow];
      this.riyousya = selectedUser['riyocode'] + "  " + selectedUser['names'];
      this.zyukyusyaNum = selectedUser['jyukyuno'];
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/common.scss';
</style>
