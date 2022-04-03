<template>

<div id="gantt-calendar">
  <div id="gantt-day" class="relative h-12">
    <div v-for="(calendar,index) in calendars" :key="index">
      <div v-for="(day,index) in calendar.days" :key="index">
        <div class="border-r h-12 absolute flex items-center justify-center flex-col font-bold text-xs"
          :style="`width:${block_size}px;left:${day.block_number*block_size}px`">
          <span>{{ day.day }}</span>
          <span>{{ day.dayOfWeek }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import moment from 'moment'

export default{
  data(){
    return{
      start_month: '2022-01',
      end_month: '2022-01',
      block_size: 30,
      block_number: 0,
      calendars:[]
    }
  },
  methods:{
    getDays(year, month, block_number) {
      const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
      let days = [];
      let date = moment(`${year}-${month}-01`);
      let num = date.daysInMonth();
      for (let i = 0; i < num; i++) {
        days.push({
          day: date.date(),
          dayOfWeek: dayOfWeek[date.day()],
          block_number
        })
        date.add(1, 'day');
        block_number++;
      }
      return days;
    },
    getCalendar() {
      let block_number = 0;
      let days;
      let start_month = moment(this.start_month)
      let end_month = moment(this.end_month)
      let between_month = end_month.diff(start_month, 'months')
      for (let i = 0; i <= between_month; i++) {
        days = this.getDays(start_month.year(), start_month.format('MM'), block_number);
        this.calendars.push({
          date: start_month.format('YYYY年MM月'),
          year: start_month.year(),
          month: start_month.month(), //month(), 0,1..11と表示
          start_block_number: block_number,
          calendar: days.length,
          days: days
        })
        start_month.add(1, 'months')
        block_number = days[days.length - 1].block_number
        block_number++;
      }
      return block_number;
    },
  },
  mounted() {
  //  console.log(this.getDays('2020','10',0))
  this.getCalendar();
  }
}

</script>

<style scoped>

</style>