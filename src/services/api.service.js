import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    if (process.env.NODE_ENV !== 'production' && process.env.VUE_APP_API_URL) {
      Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    }
  }

}
export default ApiService;
