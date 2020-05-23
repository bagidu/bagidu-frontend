/* eslint-disable no-console */
export const state = () => ({
  profile: null,
  token: null,
  token_expired: null
})

export const mutations = {
  setProfile (state, profile) {
    state.profile = profile
  },
  setToken (state, { token, expired }) {
    state.token = token
    state.token_expired = expired
  }
}

export const actions = {
  setToken ({ commit }, { token, expired }) {
    commit('setToken', { token, expired })
    // Set Access Token To Axios
    this.$api.setToken(token, 'Bearer')
  },
  getUser ({ commit }) {
    this.$api.get('/user/me')
      .then((res) => {
        console.log('getUser:res', res.data)
        commit('setProfile', res.data)
      })
      .catch((err) => {
        console.log('error get user', err)
      })
  },
  login ({ dispatch }, { username, password }) {
    // Send Request
    this.$api.post('/auth/login',
      {
        username,
        password
      },
      {
        withCredentials: true
      }
    )
      .then((resp) => {
        // eslint-disable-next-line camelcase
        const { access_token, expired } = resp.data
        dispatch('setToken', { token: access_token, expired })
        this.$router.replace('/dashboard')
      })
      .catch((err) => {
        // this.error = err.message
        console.log('login error', err)
      })
  }
}
