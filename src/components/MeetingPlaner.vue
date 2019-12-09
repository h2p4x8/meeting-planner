<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs3>
        <v-layout row wrap user-list>
          <v-flex xs12>
            Список пользователей:
          </v-flex>
          <v-flex xs12>
            <div class='user-card' v-for='el in userList_get'>
              <h3>{{ el.name + ' ' + el.surname }}</h3>
            </div>
          </v-flex>
          <v-flex xs12 button-box>
            <v-btn fab dark color="indigo" @click='newUserDialog = true'>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs9>
        <v-flex xs12>
          <v-btn class="mx-2" block dark color="indigo" @click='meetingEditor = true'>
            Добавить встречу
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs3 v-for='el in meetingList_get'>
              <MeetingCard :meeting='el'/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
    <UserEditor v-if='newUserDialog'
                @cancel='newUserDialog = false'
                @createUser='createUser'/>
    <MeetingEditor v-if='meetingEditor'
                   :users='userList_get'
                   :userDisabled='userDisabled'
                   @cancel='meetingEditor = false, userDisabled = []'
                   @createMeeting='createMeeting'
                   @checkAvailability='checkAvailability'/>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserEditor from './UserEditor.vue';
import MeetingEditor from './MeetingEditor.vue';
import MeetingCard from './MeetingCard.vue';

export default {
  name: 'MeetingPlaner',

  data: () => ({
    newUserDialog: false,
    meetingEditor: false,
    userDisabled: [],
  }),
  computed: {
    ...mapGetters([
      'userList_get',
      'meetingList_get'
    ]),
  },
  components: {
    UserEditor,
    MeetingEditor,
    MeetingCard
  },
  methods: {
    ...mapActions([
      'createNewUser',
      'createNewMeeting',
      'updateDataFromStorage'
    ]),
    createUser(user) {
      this.createNewUser({ payload: user })
      this.newUserDialog = false;
    },
    createMeeting(meeting){
      if (!meeting.facilitator||!meeting.secretary) {
        alert('Заполните роль фасилитатора и секретаря, прежде чем создать встречу');
        return;
      } else if (meeting.timeFrom > meeting.timeTo) {
        alert('Время начала не может быть больше чем окончание встречи');
        return;
      } else {
        this.createNewMeeting({ payload: meeting })
        this.meetingEditor = false;
        this.userDisabled = [];
      }

    },
    checkAvailability(timeFrom, timeTo) {
      const set = new Set();
      this.meetingList_get.forEach(el => {
        if ((el.timeFrom >= timeFrom&&el.timeFrom <= timeTo)||(el.timeTo >= timeFrom&& el.timeTo <= timeTo)||(el.timeFrom < timeFrom&&el.timeTo > timeTo)) {
          el.participants.forEach(part => set.add(part))
        }
      this.userDisabled = [...set]
      })
    },
    getStorageUpdate(e) {
      if (event.key === 'userList'||event.key === 'meetingList') this.updateDataFromStorage({ payload: { key: event.key, data: JSON.parse(event.newValue)} })
    }
  },

  mounted(){
    if (localStorage.getItem('userList')) this.updateDataFromStorage({ payload: { key: 'userList', data: JSON.parse(localStorage.getItem('userList'))} })
    if (localStorage.getItem('meetingList')) this.updateDataFromStorage({ payload: { key: 'meetingList', data: JSON.parse(localStorage.getItem('meetingList'))} })
    window.addEventListener('storage', this.getStorageUpdate);
  },
  beforeDestroy(){
    window.removeEventListener('storage', this.getStorageUpdate);
  }
};
</script>

<style>
.meeting-card {
  background: #FFF4AA;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 10px;
  padding:10px;
}

.meeting-time {
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
}

.meeting-status.planned {
  color: #156711
}

.meeting-status.ended {
  color: #801515
}

.meeting-status.going {
  color: #152C55
}

.button-box {
  margin-top: 20px;
}
</style>
