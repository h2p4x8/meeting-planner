<template>
  <div class="meeting-card">
    <h2>
      {{ meeting.title }}
    </h2>
    <div class='meeting-time'>
      {{ getMeetingTime }}
    </div>
    <div class='meeting-status column' :class='status'>
      {{ getMeetingStatus }}
    </div>
    <div class='meeting-participants column'>
      <div class='meeting-participant column' v-for='el in meeting.participants'>
        {{ el.name + ' ' + el.surname }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetingCard',
  data: () => ({
    status: ''
  }),
  props: ['meeting'],
  computed: {
    getMeetingTime(){
      var options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute:  'numeric' };
      const timeFrom = new Date(this.meeting.timeFrom);
      const timeTo = new Date(this.meeting.timeTo);
      return `${timeFrom.toLocaleDateString('ru-RU', options)} - ${timeTo.toLocaleDateString('ru-RU',options)}`
    },
    getMeetingStatus(){
      const now = new Date();
      const timeFrom = new Date(this.meeting.timeFrom);
      const timeTo = new Date(this.meeting.timeTo);
      if (timeFrom < now && timeTo < now) {
        this.status = 'ended'
        return 'Завершена'
      } else if (timeFrom < now && timeTo > now) {
        this.status = 'going'
        return 'Проходит'
      } else if (timeFrom > now && timeTo > now) {
        this.status = 'planned'
        return 'Запланирована'
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
