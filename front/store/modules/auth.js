const storageName =  'userData';
import { loginUser, registerUser, getUser } from '@/services/ApiServicesAuth';

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

const store = {
  state() {
    return {      
      auth: null,
      user: {
        name: null,
        email: null,
        phone: null,
        language: null
      },
      token: null,
      userId: null
    }
  },

  getters: {
    user(state) {
      return state.user
    },
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload;
    },
    setAuth (state, payload) {
      state.auth = payload;
    },
    setToken (state, payload) {
      state.token = payload;
    },
    setUserId (state, payload) {
      state.userId = payload;
    },
  },

  actions: {
    nuxtServerInit ({ commit }, { req }) {
      let auth = null
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie)
        try {
          auth = JSON.parse(parsed.auth)
        } catch (err) {
          // No valid cookie found
        }
      }
      commit('setAuth', auth)
    },

    async register({ commit }, { ...data }) {
      try {
        const response = await registerUser(data)
        console.log('res: ', response);
        const user = {
          name: response.name,
          email: response.email,
          phone: response.phone
        }

        localStorage.setItem(storageName, JSON.stringify({
          token: response.accessToken,
          userId: response.id
        }))

        this.$notify({ group: 'all', text: response.message })
        commit('setUser', user)
      } catch (e) {
        this.$notify({ type: 'success', group: 'all', text: e })
        throw e
      }
    },

    async login({ commit }, { ...data }) {
      try {
        const response = await loginUser(data)
        console.log('res login: ', response);
        const user = {
          name: response.name,
          email: response.email,
          phone: response.phone
        }

        commit("setToken", response.accessToken)
        commit("setUserId", response.id)
        localStorage.setItem(storageName, JSON.stringify({
          token: response.accessToken,
          userId: response.id,
          userAuth: true
        }))

        this.$notify({ group: 'all', text: response.message })
        commit('setUser', user)
      } catch (e) {
        this.$notify({ type: 'success', group: 'all', text: e })
        throw e
      }
    },

    async logout({ commit }) {
      try {
        commit("setToken", null)
        commit("setUserId", null)
        localStorage.removeItem(storageName)
        Cookie.remove('auth')
        commit("setAuth", null)
        this.$router.push('/login');
      } catch (e) {
        this.$notify({ type: 'success', group: 'all', text: e })
        throw e
      }
    },

    async userLogin({ commit, dispatch }) {
      const data = JSON.parse(localStorage.getItem(storageName))

      if(data && data.token) {
        commit("setAuth", true);
        const response = await getUser(data);
        commit('setUser', response);
      }
    }
    
  }
}

export default store;