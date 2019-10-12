import Vue from 'vue';
import Vuex from 'vuex';

import hal from './modules/hal';
import loader from './modules/loader';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hal,
    loader
  }
});
