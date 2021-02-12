import { login, register } from '@/services/ApiServicesAuth';

const store = {
  state() {
    return {      
      auth: false,
      user: {
        name: null,
        email: null,
        phone: null,
        language: null
      }
    }
  },

  getters: {
    user(state) {
      return state.user
    }
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload;
    },
    setAuth (state, payload) {
      state.auth = payload;
    },
  },

  actions: {   
  
    
  }
}

export default store;