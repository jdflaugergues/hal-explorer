import Vue from 'vue';
import Vuex from 'vuex';

import request from './modules/request';
import loader from './modules/loader';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    request,
    loader
  }
});
