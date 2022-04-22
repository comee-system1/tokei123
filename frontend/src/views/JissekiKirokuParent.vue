<template>
<div>
  <ServiceSelection
    @parent-calendar="parentCalendar($event, dateArgument)"
    @parent-search="parentSearch($event, searchArgument)"
  >
  </ServiceSelection>
  <v-container class="jissekikiroku" fluid>
    <v-layout>
      <v-flex md2>
        <UserList></UserList>
      </v-flex>
      <v-flex md10>
        <SeikatsuKaigo v-if="searchArgument=='22:生活介護'"></SeikatsuKaigo>
        <Tanki v-else-if="searchArgument=='24:短期入所'"></Tanki>
        <ShisetsuNyusho v-else-if="searchArgument=='32:施設入所支援'"></ShisetsuNyusho>
        <KinoKunren v-else-if="searchArgument=='41:自立訓練(機能訓練)'"></KinoKunren>
        <SeikatsuKunren v-else-if="searchArgument=='42:自立訓練(生活訓練)'"></SeikatsuKunren>
        <ShuroIko v-else-if="searchArgument=='43:就労移行支援'"></ShuroIko>
        <ShurokeizokuA v-else-if="searchArgument=='45:就労継続支援A型'"></ShurokeizokuA>
      </v-flex>
    </v-layout>
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
    ShurokeizokuA
  },
  data(){
    return{
      daycount: daycount,
      dateArgument: '',
      searchArgument: '22:生活介護',
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
      this.searchArgument = searchArgument;
    },
  }
}
</script>

<style>
.container.jissekikiroku{
  padding:4px;
}
/* グリッドのスタイル */
#detailGrid {
  margin-top:10px;
  font-size:14px;
  height: 65vh;
}

#detailGrid .wj-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 一旦グリッドの枠線を表示しない */
/* #detailGrid.wj-control.wj-content.wj-flexgrid {
  border: 2px solid #348498;
} */

#subGrid {
  font-size:14px;
}

/* 一旦グリッドの枠線を表示しない */
/* #subGrid.wj-control.wj-content.wj-flexgrid {
  border: 2px solid #348498;
} */
</style>
