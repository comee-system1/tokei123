<template>

<div id="app">
  <div id="gantt-header" class="h-12 p-2 flex items-center">
    <h1 class="text-xl font-bold">ガントチャート</h1>
  </div>
  <div id="gantt-content" class="flex">
    <div id="gantt-task">
      <div id="gantt-task-title" class="flex items-center bg-green-600 text-white h-20" ref="task">
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-48 h-full">タスク
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-24 h-full">開始日
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-24 h-full">完了期限日
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-16 h-full">担当
        </div>
        <div class="border-t border-r border-b flex items-center justify-center font-bold text-xs w-12 h-full">進捗
        </div>
      </div>
    </div>
    <div id="gantt-calendar" class="overflow-x-scroll" :style="`width:${calendarViewWidth}px`">
      <div id="gantt-date" class="h-20">
        <div id="gantt-year-month" class="relative h-8">
          <div v-for="(calendar,index) in calendars" :key="index">
            <div
              class="bg-indigo-700 text-white border-b border-r border-t h-8 absolute font-bold text-sm flex items-center justify-center"
              :style="`width:${calendar.calendar*block_size}px;left:${calendar.start_block_number*block_size}px`">
              {{calendar.date}}
            </div>
          </div>
        </div>
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
        <div id="gantt-height" class="relative"> 
          <div v-for="(calendar,index) in calendars" :key="index">
            <div v-for="(day,index) in calendar.days" :key="index">
              <div class="border-r border-b absolute" 
              :style="`width:${block_size}px;left:${day.block_number*block_size}px;height:${calendarViewHeight}px`">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="gantt-bar-area" class="relative" :style="`width:${calendarViewWidth}px;height:${calendarViewHeight}px`">
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
      calendars:[],
      inner_width: '',
      inner_height: '',
      task_width: '',
      task_height: '',
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
          month: start_month.month(),
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
    getWindowSize() {
      this.inner_width = window.innerWidth;
      this.inner_height = window.innerHeight;
      this.task_width = this.$refs.task.offsetWidth;
      this.task_height = this.$refs.task.offsetHeight;
    },
  },
  mounted() {
    this.getCalendar();
    this.getWindowSize();
    window.addEventListener('resize', this.getWindowSize);
  },
  computed: {
    calendarViewWidth() {
      return this.inner_width - this.task_width;
    },
    calendarViewHeight() {
      return this.inner_height - this.task_height - 48 - 20;
    },
  }
}

</script>

<style lang="scss" scoped>

</style>