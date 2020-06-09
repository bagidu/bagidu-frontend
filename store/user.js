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
      // console.log('error get token', e)
      localStorage.removeItem('authenticated')
      // this.$router.replace('/')
    }
  },
  getUser ({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    client.query({
      query: gql`query{
        user:me {
          id
          name
          email
          username
        }
      }
      `
    })
      .then((res) => {
        // console.log('getUser:res', res.data)
        commit('setProfile', res.data.user)
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
    const client = this.app.apolloProvider.defaultClient
    client.query({
      query: gql`query ($username: String!, $password: String!){
        login(username:$username, password:$password) {
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
      variables: {
        username,
        password
      },
      context: {
        credentials: 'include'
      }
    })
      .then((resp) => {
        // eslint-disable-next-line camelcase
        const { access_token, expired, user } = resp.data.login
        dispatch('setToken', { token: access_token, expired })
        commit('setProfile', user)

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
    const client = this.app.apolloProvider.defaultClient
    client.mutate({
      mutation: gql`mutation ($data: RegisterInput!) {
        user: register(data: $data) {
          id
          username
          name
          email
        }
      }
      `,
      variables: {
        data
      }
    }).then((res) => {
      commit('setProfile', res.data.user)
      dispatch('login', { username: data.username, password: data.password })
    }).catch((e) => {
      console.log('error signup', JSON.stringify(e))
      if (e.graphQLErrors) {
        e.graphQLErrors.forEach((err) => {
          console.log(err)
          const ext = err.extensions
          if (ext && ext.exception.status === 400) {
            commit('setErrors', ext.exception.response.message)
          }
        })
      }
    })
  },
  logout ({ dispatch }) {
    const client = this.app.apolloProvider.defaultClient
    client.mutate({
      mutation: gql`mutation {
        logout
      }
      `,
      context: {
        credentials: 'include'
      }
    })
      .then(() => {
        localStorage.removeItem('authenticated')
        dispatch('setToken', { token: null })
        this.$router.replace('/')
      })
      .catch(err => console.log('error logout', err))
  }
}
