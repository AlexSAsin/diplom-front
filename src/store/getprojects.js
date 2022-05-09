const state = () => ({
  projects: [],
})

const getters = {
  get(state) {
    return state.projects
  },
}

const actions = {
  async getProjects({ commit }) {
    const data = await this.$axios.$post("getproject")
    commit('SET_PROJECTS', data)
    return data
  }
}

const mutations = {
  SET_PROJECTS(state, data) {
    state.projects = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}



