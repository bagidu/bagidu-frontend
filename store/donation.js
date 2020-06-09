import gql from 'graphql-tag'

export const state = () => ({
  data: null,
  transactions: [],
  balance: 0,
  loading: false
})

export const mutations = {
  set (state, donation) {
    state.data = donation
  },
  setTransaction (state, transactions) {
    state.transactions = transactions
  },
  setBalance (state, balance) {
    state.balance = balance
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {
  getTransaction ({ commit, rootState }) {
    // const token = rootState.user.token
    commit('setLoading', true)
    // this.$api.$get('/donation')
    //   .then(transactions => commit('setTransaction', transactions))
    //   .catch(err => console.log('error when fetch transaction', err))
    //   .finally(() => commit('setLoading', false))

    const client = this.app.apolloProvider.defaultClient

    client.query({
      query: gql`query{
        balance {
          amount
        }
        donations {
          id
          name
          amount
          message
          createdAt
        }
      }
      `
      // context: {
      //   headers: {
      //     authorization: `Bearer ${token}`
      //   }
      // }
    }).then((result) => {
      commit('setTransaction', result.data.donations)
      commit('setBalance', result.data.balance.amount)
      console.log('apollo result', result.data)
    })
      .finally(() => commit('setLoading', false))
  },
  getBalance ({ commit }) {
    commit('setLoading', true)
    this.$api.$get('/donation/balance')
      .then(balance => commit('setBalance', balance.amount))
      .catch(err => console.log('error get balance', err))
      .finally(() => commit('setLoading', false))
  }
}
