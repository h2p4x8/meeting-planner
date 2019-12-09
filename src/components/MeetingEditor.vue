<template>
  <div class="main-container">
    <div @click="$emit('cancel')" class="overlay">

    </div>
    <div class="user-editor-container">
      <h3>Создать встречу:</h3>
      <div class='column'>
        <label for="title">Тема:</label>
        <input name="title" v-model="meeting.title"  type="text">
      </div>
      <div class='column'>
        <label for="time">Начало в:</label>
        <input name="time"
               v-model="meeting.timeFrom"
               type="datetime-local"
               @change='checkAvailability'>
      </div>
      <div class='column'>
        <label for="time">Конец в:</label>
        <input name="time"
               v-model="meeting.timeTo"
               type="datetime-local"
               :min='meeting.timeFrom'
               @change='checkAvailability'>
      </div>
      <div class="column">
        <label for="type">Участники:</label>
        <select name="type" v-model="meeting.participants" multiple>
          <option disabled value>Выберите участников</option>
          <option :value="el"
                  v-for='el in users'
                  :disabled='userDisabled.some(user => user.id === el.id)'
                  >
                  {{ el.name + ' ' + el.surname  }}
          </option>
        </select>
      </div>
      <div class='column'>
        <label for="facilitator">Фасилитатор:</label>
        <select name="facilitator" v-model="meeting.facilitator">
          <option disabled value>Выбрать участника:</option>
          <option :value="el"
                  v-for='el in meeting.participants'
                  :disabled='meeting.secretary ? meeting.secretary.id === el.id : false'
                  >
                  {{ el.name + ' ' + el.surname  }}
          </option>
        </select>
      </div>
      <div class='column'>
        <label for="secretary">Секретарь:</label>
        <select name="secretary" v-model="meeting.secretary">
          <option disabled value>Выбрать участника:</option>
          <option :value="el"
                  v-for='el in meeting.participants'
                  :disabled='meeting.facilitator ? meeting.facilitator.name === el.name : false'
                  >
                  {{ el.name + ' ' + el.surname  }}
          </option>
        </select>
      </div>
      <div class="row">
        <v-btn @click="$emit('createMeeting', meeting)">Создать</v-btn>
        <v-btn @click="$emit('cancel')">Отмена</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetingEditor',
  data: () => ({
    meeting: {
      timeFrom: null,
      title: '',
      participants: [],
      timeTo: null,
      facilitator: null,
      secretary: null
    }
  }),
  props: ['users', 'userDisabled'],
  methods: {
    checkAvailability(){
      if (this.meeting.timeFrom&&this.meeting.timeTo) this.$emit('checkAvailability', this.meeting.timeFrom, this.meeting.timeTo);
    }
  },
  beforeUpdate(){
    if (this.userDisabled.length > 0) this.meeting.participants = this.meeting.participants.filter(el => !this.userDisabled.some(part => part.id === el.id) )
  }
};
</script>

<style scoped lang="scss">
.main-container{
  position: absolute;
  top:0;
  left:0;
  height: fit-content;
  width: 100%;
  min-height: 100%;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.user-editor-container {
  position: relative;
  top:0;
  left:0;
  margin-left:auto;

  padding: 30px;
  border: 1px solid black;
  border-radius: 1em;
  background-color: rgb(255, 255, 255);
  width: fit-content;
  margin: auto;
}
.column {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  label {
  }
  input {
    max-width: 100ch;
  }
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 0.5em;

}
</style>
