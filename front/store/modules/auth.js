import { loginUser, registerUser } from '@/services/ApiServicesAuth';

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
    }
  },

  actions: {

    async register({ commit }, { ...data }) {
      try {
        const res = await registerUser(data)
        // console.log('res: ', res.message);
        const user = {
          name: res.name,
          email: res.email,
          phone: res.phone
        }
        this.$notify({ group: 'all', text: res.message })
        commit('setUser', user)
      } catch (e) {
        this.$notify({ type: 'success', group: 'all', text: e })
        throw e
      }
    },

    async login({ commit }, { ...data }) {
      try {
        const res = await loginUser(data)
        // console.log('res: ', res);
        const user = {
          name: res.name,
          email: res.email,
          phone: res.phone
        }
        this.$notify({ group: 'all', text: res.message })
        commit('setUser', user)
      } catch (e) {
        this.$notify({ type: 'success', group: 'all', text: e })
        throw e
      }
    },
  
    
  }
}

export default store;