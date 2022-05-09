const state = () => ({
  buildings: [],
})

const getters = {
  get(state) {
    return state.buildings
  },
}

const actions = {
  async getBuildings({ commit }) {
    const data = await this.$axios.$post("getbuilding")
    commit('SET_BUILDINGS', data)
    return data
  }
}

const mutations = {
  SET_BUILDINGS(state, data) {
    state.buildings = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
