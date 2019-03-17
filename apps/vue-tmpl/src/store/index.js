import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  getters
});

//test store in ssr
export function createStore(){
  const store = new Vuex.Store({
    namespaced: true,
    state,
    mutations,
    getters
  });

  return store;
}

export default store;
