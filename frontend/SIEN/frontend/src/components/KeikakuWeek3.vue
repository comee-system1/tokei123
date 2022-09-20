<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Draggable from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, Draggable],
        initialView: 'timeGridWeek',
        headerToolbar: false,
        dateClick: this.handleDateClick,
        droppable: true,
        editable: true,
        selectable: true,
        contentHeight: '600px',
        slotDuration: '00:30:00',
        locale: 'ja',
        nowIndicator: true,
        events: [
          {
            title: 'event 1',
            start: '2022-09-21T12:00:00',
            end: '2022-09-21T14:30:00',
          },
          {
            title: 'event 2',
            start: '2022-09-21T11:00:00',
            end: '2022-09-21T12:30:00',
          },
        ],

        views: {
          timeGridWeek: {
            slotMinTime: '04:00:00',
            slotMaxTime: '22:00:00',
          },
          timeGridDay: {
            slotMinTime: '04:00:00',
            slotMaxTime: '22:00:00',
          },
        },
      },
    };
  },
  methods: {
    handleDateClick: function (arg) {
      console.log('date click! ' + arg.dateStr);
    },
  },
};
</script>
<style>
.fc-scrollgrid-sync-table {
  display: none;
}
</style>
