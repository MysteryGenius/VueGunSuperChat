import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      username: window.localStorage.getItem('username')
    }
  },
  mutations: {
    setUsername (state, payload) {
      state.username = payload
      window.localStorage.setItem('username', payload);
    }
  },
  getters: {
    getUsername (state) {
      return state.username
    }
  }
})

export default store;