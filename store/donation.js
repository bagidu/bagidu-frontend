export const state = () => ({
  data: null,
  transactions: []
})

export const mutations = {
  set (state, donation) {
    state.data = donation
  },
  setTransaction (state, transactions) {
    state.transactions = transactions
  }
}

export const actions = {
  getTransaction ({ commit }) {
    this.$api.$get('/donation')
      .then(transactions => commit('setTransaction', transactions))
      .catch(err => console.log('error when fetch transaction', err))
  }
}
