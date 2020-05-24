/* eslint-disable no-console */
export const state = () => ({
  profile: null,
  token: null,
  token_expired: null,
  loading: true
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
  async getToken ({ dispatch }) {
    try {
      const data = await this.$api.$post('/auth/token', null, {
        withCredentials: true
      })
      console.log('getToken:data', data)
      dispatch('setToken', { token: data.access_token, expired: data.expired })
      dispatch('getUser')
    } catch (e) {
      // console.log('error get token', e)
    }
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
