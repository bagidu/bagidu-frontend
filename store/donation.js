export const state = () => ({
  donations: []
})

export const mutations = {
  append (state, donation) {
    state.donations = [...state.donations, donation]
  }
}

export const actions = {

}
