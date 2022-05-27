<template>
  <div id="jisseki-kiroku">
    <ServiceSelection
      @parent-service-select="parentSearch($event, searchArgument)"
      @parent-service-change="parentChange($event, searchArgument)"
      :seikyuflag="true">
    </ServiceSelection>
    <v-container class="jissekikiroku" fluid>
      <v-row no-gutters>
        <v-col class="leftArea">
          <UserList
            @child-userslist="getUserListData"
            @child-selectedrow="getSelectedRow"
            :selectedService="selectedService">
          </UserList>
        </v-col>
        <v-col class="rightArea">
          <component
            :is="displayComponent"
            :riyousya="riyousya"
            :zyukyusyaNum="zyukyusyaNum"
            :changedService="changedService">
          </component>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ServiceSelection from '../components/HeaderServices.vue';
import UserList from '../components/UserList';
import SeikatsuKaigo from '../components/JissekiKirokuSeikatsuKaigo.vue';
import KeikatekiSeikatsuKaigo from '../components/JissekiKirokuKeikatekiSeikatsuKaigo.vue';
import ShisetsuNyusho from '../components/JissekiKirokuShisetsuNyusho.vue';
import KeikatekiShisetsuNyusho from '../components/JissekiKirokuKeikatekiShisetsuNyusho.vue';
import Tanki from '../components/JissekiKirokuTanki.vue';
import Shukuhaku from '../components/JissekiKirokuShukuhaku.vue';
import KinoKunren from '../components/JissekiKirokuKinoKunren.vue';
import SeikatsuKunren from '../components/JissekiKirokuSeikatsuKunren.vue';
import ShuroIko from '../components/JissekiKirokuShuroIko.vue';
import ShuroIkoYosei from '../components/JissekiKirokuShuroIkoYosei.vue';
import ShurokeizokuA from '../components/JissekiKirokuShurokeizokuA.vue';
import ShurokeizokuB from '../components/JissekiKirokuShurokeizokuB.vue';
import ShuroTeichaku from '../components/JissekiKirokuShuroTeichaku.vue';
import JiritsuSeikatsu from '../components/JissekiKirokuJiritsuSeikatsu.vue';
import JissekiKirokuRyoyoKaigo from '../components/JissekiKirokuRyoyoKaigo.vue';
export default {
  components: {
    ServiceSelection,
    UserList
  },
  data() {
    return {
      searchArgument: '',
      selectedService: '',
      userListData: [], // 利用者一覧表示データ
      selectedRow: '', // 利用者一覧の選択行
      riyousya: '', //利用者一覧で選択された利用者
      zyukyusyaNum: '', //利用者一覧で選択された利用者の受給者番号
      displayComponent: '', //描画するコンポーネント
      displayCode: '', //描画するサービスのコード
      changedService: '',
    };
  },
  watch: {
    selectedService() {
      this.riyousya = '';
      this.zyukyusyaNum = '';
    }
  },
  methods: {
    parentChange(searchArgument){
      this.changedService = searchArgument.teikyoService;
    },
    parentSearch(searchArgument) {
      this.selectedService = searchArgument.teikyoService;
      if (searchArgument.teikyoCode == 22 && searchArgument.teikyoService.includes('経過的')) {
        this.displayCode = '02';
      } else if (searchArgument.teikyoCode == 32 && searchArgument.teikyoService.includes('経過的')) {
        this.displayCode = '03';
      } else {
        this.displayCode = searchArgument.teikyoCode;
      }
      this.displayComponent = services[0][this.displayCode];
    },
    getUserListData(data) {
      // 利用者一覧で表示されているデータ一式を取得
      this.userListData = data;
    },
    getSelectedRow(data) {
      // 利用者一覧の選択行を取得
      this.selectedRow = data;
      this.getSelectedUserData();
    },
    getSelectedUserData() {
      let selectedUser = this.userListData[this.selectedRow];
      this.riyousya = selectedUser['riyocode'] + "  " + selectedUser['names'];
      this.zyukyusyaNum = selectedUser['jyukyuno'];
    }
  }
}

const services =[{
  '21': JissekiKirokuRyoyoKaigo,
  '22': SeikatsuKaigo,
  '02': KeikatekiSeikatsuKaigo,
  '24': Tanki,
  '32': ShisetsuNyusho,
  '03': KeikatekiShisetsuNyusho,
  '34': Shukuhaku,
  '41': KinoKunren,
  '42': SeikatsuKunren,
  '43': ShuroIko,
  '44': ShuroIkoYosei,
  '45': ShurokeizokuA,
  '46': ShurokeizokuB,
  '47': ShuroTeichaku,
  '35': JiritsuSeikatsu,
}];
</script>

<style lang="scss">
  @import '@/assets/scss/common.scss';

  // 仮の対応
  div#jisseki-kiroku .transparent{
    visibility:hidden;
  }
</style>
