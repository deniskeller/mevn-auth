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
    increment (state, payload) {
      state.user = payload
    },
  },

  actions: {   
  
    
  }
}

export default store;