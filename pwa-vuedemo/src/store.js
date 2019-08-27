import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pwaUpdate: false
  },
  mutations: {
    PWAUPDATE(state, value) {
      state.pwaUpdate = value;
    }
  },
  actions: {
    pwa_update(context, value) {
      return context.commit('PWAUPDATE', value);
    }
  }
});
