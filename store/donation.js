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
    commit('setLoading', true)

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
    }).then((result) => {
      commit('setTransaction', result.data.donations)
      commit('setBalance', result.data.balance.amount)
    })
      .finally(() => commit('setLoading', false))
  }
}
