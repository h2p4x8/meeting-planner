<template>
  <v-app>
    <v-content>
      <MeetingPlaner />
    </v-content>
  </v-app>
</template>

<script>
import MeetingPlaner from './components/MeetingPlaner.vue';

export default {
  name: 'App',

  components: {
    MeetingPlaner,
  },

  data: () => ({
    //
  }),
};
</script>
