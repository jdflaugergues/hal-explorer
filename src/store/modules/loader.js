import Vue from 'vue';
import Vuex from 'vuex';
import { SET_LOADING } from '../mutation-types'

Vue.use(Vuex);

export const initialState = {
  isLoading: false
};

export const mutations = {
  [SET_LOADING] (state, payload) {
    state.isLoading = payload.isLoading;
  }
};

export default {
  state: initialState,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
}
