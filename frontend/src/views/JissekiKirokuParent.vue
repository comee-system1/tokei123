<template>
<div>
  <ServiceSelection
    @parent-calendar="parentCalendar($event, dateArgument)"
    @parent-service-select="parentSearch($event, searchArgument)"
    :seikyuflag="true"
  >
  </ServiceSelection>
  <v-container class="jissekikiroku" fluid>
    <v-row no-gutters>
      <v-col class="leftArea">
        <UserList></UserList>
      </v-col>
      <v-col class="rightArea">
        <SeikatsuKaigo v-if="searchArgument=='22 生活介護'"></SeikatsuKaigo>
        <Tanki v-else-if="searchArgument=='24 短期入所'"></Tanki>
        <ShisetsuNyusho v-else-if="searchArgument=='32 施設入所支援'"></ShisetsuNyusho>
        <KinoKunren v-else-if="searchArgument=='41 自立訓練(機能訓練)'"></KinoKunren>
        <SeikatsuKunren v-else-if="searchArgument=='42 自立訓練(生活訓練)'"></SeikatsuKunren>
        <ShuroIko v-else-if="searchArgument=='43 就労移行支援'"></ShuroIko>
        <ShurokeizokuA v-else-if="searchArgument=='45 就労継続支援'"></ShurokeizokuA>
        <ShuroTeichaku v-else-if="searchArgument=='47 就労定着支援'"></ShuroTeichaku>
        <!-- <JiritsuSeikatsu v-else-if="searchArgument=='35 自立生活援助'"></JiritsuSeikatsu> -->
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import ServiceSelection from '../components/JissekiKirokuServiceSelection.vue';
import UserList from '../components/UserList';
import ShisetsuNyusho from '../components/JissekiKirokuShisetsuNyusho.vue';
import Tanki from '../components/JissekiKirokuTanki.vue';
import SeikatsuKaigo from '../components/JissekiKirokuSeikatsuKaigo.vue';
import KinoKunren from '../components/JissekiKirokuKinoKunren.vue';
import SeikatsuKunren from '../components/JissekiKirokuSeikatsuKunren.vue';
import ShuroIko from '../components/JissekiKirokuShuroIko.vue';
import ShurokeizokuA from '../components/JissekiKirokuShurokeizokuA.vue';
import ShuroTeichaku from '../components/JissekiKirokuShuroTeichaku.vue';
// import JiritsuSeikatsu from '../components/JissekiKirokuJiritsuSeikatsu.vue';

import moment from 'moment';

let daycount = 0;

export default{
  components:{
    ServiceSelection,
    UserList,
    SeikatsuKaigo,
    Tanki,
    ShisetsuNyusho,
    KinoKunren,
    SeikatsuKunren,
    ShuroIko,
    ShurokeizokuA,
    ShuroTeichaku,
    // JiritsuSeikatsu
  },
  data(){
    return{
      daycount: daycount,
      dateArgument: '',
      searchArgument: '',
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
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

.container.jissekikiroku{
  padding:4px;
}

.leftArea {
  min-width: 275px;
  max-width: 275px;
  width: 275px;
}

.rightArea {
  min-width: 50%;
  max-width: none;
  width: 1020px;
  margin-left:4px;
}

/* グリッドのスタイル */
#detailGrid {
  margin-top:10px;
  font-size:12px;
  height: 65vh;
  color:#333333 !important;
}

#detailGrid .wj-header {
  display: flex;
  justify-content: center;
  align-items: center;
  color:#333333 !important;
}

/* 一旦グリッドの枠線を表示しない */
/* #detailGrid.wj-control.wj-content.wj-flexgrid {
  border: 2px solid #348498;
} */

#subGrid {
  font-size:12px;
  color:#333333 !important;
}

/* 一旦グリッドの枠線を表示しない */
/* #subGrid.wj-control.wj-content.wj-flexgrid {
  border: 2px solid #348498;
} */
</style>
