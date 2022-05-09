const state = () => ({
  lots: [],
})

const getters = {
  get(state) {
    return state.lots
  },
}

const actions = {
  async getLots({ commit }) {
    const data = await this.$axios.$post("getlots")
    commit('SET_LOTS', data)
    return data
  }
}

const mutations = {
  SET_LOTS(state, data) {
    state.lots = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
