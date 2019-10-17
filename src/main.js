import Vue from 'vue';
import VueMaterial from 'vue-material';

import HalApp from './HalApp';
import router from './router';
import store from './store';
import ApiService from './services/api.service';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);

Vue.config.productionTip = false;

ApiService.init();

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(HalApp)
}).$mount('#app');
