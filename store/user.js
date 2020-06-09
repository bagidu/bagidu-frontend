/* eslint-disable no-console */
import gql from 'graphql-tag'

export const state = () => ({
  profile: null,
  token: null,
  token_expired: null,
  loading: true,
  errors: []
})

export const mutations = {
  setProfile (state, profile) {
    state.profile = profile
  },
  setToken (state, { token, expired }) {
    state.token = token
    state.token_expired = expired
  },
  setErrors (state, errors) {
    state.errors = errors
  }
}

export const actions = {
  setToken ({ commit }, { token, expired }) {
    commit('setToken', { token, expired })

    // Set Access Token To Axios
    this.$api.setToken(token, 'Bearer')
    this.app.$apolloHelpers.onLogin(token)
  },
  async getToken ({ dispatch, commit }) {
    try {
      // const data = await this.$api.$post('/auth/token', null, {
      //   withCredentials: true
      // })
      // // console.log('getToken:data', data)
      // dispatch('setToken', { token: data.access_token, expired: data.expired })
      // dispatch('getUser')
      // console.log('apolo', this.app)
      const client = this.app.apolloProvider.defaultClient
      const result = await client.query({
        query: gql`query{
        login:token {
          access_token
          expired
          user {
            id
            name
            email
            username
          }
        }
      }
      `,
        context: {
          credentials: 'include'
        }
      })

      const token = result.data.login
      const user = token.user

      dispatch('setToken', { token: token.access_token, expired: token.expired })
      commit('setProfile', user)

      localStorage.setItem('authenticated', 'ok')

      console.log('apollo result getToken', result.data)
    } catch (e) {
      console.log('error get token', e)
      localStorage.removeItem('authenticated')
      // this.$router.replace('/')
    }
  },
  getUser ({ commit }) {
    this.$api.get('/user/me')
      .then((res) => {
        // console.log('getUser:res', res.data)
        commit('setProfile', res.data)
        // Mark as authenticataed
        localStorage.setItem('authenticated', 'ok')
      })
      .catch((err) => {
        console.log('error get user', err)
      })
  },
  login ({ dispatch, commit }, { username, password }) {
    commit('setErrors', [])
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

        // Mark as authenticataed
        localStorage.setItem('authenticated', 'ok')

        this.$router.replace('/dashboard')
      })
      .catch((err) => {
        // this.error = err.message
        console.log('login error', err)
        commit('setErrors', [err.message])
      })
  },
  signup ({ dispatch, commit }, data) {
    commit('setErrors', [])
    this.$api.$post('/user', data)
      .then((res) => {
        commit('setProfile', res)
        dispatch('setToken', { token: res.access_token, expired: res.expired })
        this.$router.replace('/dashboard')
      })
      .catch((e) => {
        console.log('error signup', e.response)
        if (e.response && e.response.data) {
          commit('setErrors', e.response.data.message)
        }
      })
  },
  logout () {
    this.$api.$post('/auth/logout', null,
      {
        withCredentials: true
      }
    )
      .then(() => {
        localStorage.removeItem('authenticated')
        this.$router.replace('/')
      })
      .catch(err => console.log('error logout', err))
  }
}
