import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userList: [],
    meetingList: []
  },
  mutations: {
    newUserAdd_add(state, { payload }) {
      state.userList.push(payload);
      localStorage.setItem('userList', JSON.stringify(state.userList));
    },
    newMeeting_add(state, { payload }) {
      state.meetingList.push(payload);
      localStorage.setItem('meetingList', JSON.stringify(state.meetingList));
    },
    userList_set(state, { payload }) {
      state.userList = payload;
    },
    meetingList_set(state, { payload }) {
      state.meetingList = payload;
    },
  },
  actions: {
    createNewUser({ state, commit, dispatch, getters, rootGetters }, {payload}){
      payload.id = state.userList.length + 1;
      commit('newUserAdd_add', { payload })
    },
    createNewMeeting({ state, commit, dispatch, getters, rootGetters }, {payload}){
      payload.id = state.meetingList.length + 1;
      commit('newMeeting_add', { payload })
    },
    updateDataFromStorage({ state, commit, dispatch, getters, rootGetters }, {payload}){
      const {
        data,
        key
      } = payload;
      if (key === 'userList') commit('userList_set', { payload: data })
      else if (key === 'meetingList') commit('meetingList_set', { payload: data })

    },
  },
  modules: {

  },
  getters: {
    userList_get: (state) => {
      return state.userList;
    },
    meetingList_get: (state) => {
      return state.meetingList;
    },
  }
});
