<template>
  <div id="jijyougen">
    <header-services
      @parent-calendar="parentCalendar($event, dateArgument)"
      @parent-search="parentSearch($event, searchArgument)"
    ></header-services>
    <v-container fluid> </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderServices from '../components/HeaderServices.vue';

export default {
  data() {
    return {
      year: moment().year(),
      month: moment().format('MM'),

      dateArgument: '',
      searchArgument: '',
    };
  },
  components: {
    HeaderServices,
  },
  methods: {
    parentCalendar(dateArgument) {
      this.year = dateArgument[0];
      this.month = dateArgument[1];
      let m = moment(this.year + '-' + this.month + '-01');
      this.daycount = m.daysInMonth();
      this.getdateData();
    },
    parentSearch(searchArgument) {
      console.log('searchArgument');
      console.log(searchArgument);
    },
  },
};
</script>
<style lang="scss" scope>
#jijyougen {
  font-size: 14px;
  font-family: 'メイリオ';
}
</style>