<template>
  <div class="main-container">
    <div @click="$emit('cancel')" class="overlay">

    </div>
    <div class="user-editor-container">
      <h3>Добавить пользователя:</h3>
      <div class='column'>
        <label for="name">Имя:</label>
        <input name="name" v-model="user.name"  type="text">
      </div>
      <div class='column'>
        <label for="name">Фамилия:</label>
        <input name="name" v-model="user.surname"  type="text">
      </div>
      <div class="row">
        <v-btn @click="$emit('createUser', user)">Создать</v-btn>
        <v-btn @click="$emit('cancel')">Отмена</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserEditor',
  data: () => ({
    user: {
      name: '',
      surname: ''
    }
  }),
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
