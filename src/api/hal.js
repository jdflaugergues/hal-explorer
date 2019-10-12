import Vue from 'vue'

export default {
  sendUrl: (url, headers) =>
    Vue.axios.get(url, {headers})
      .then(
        response => response,
        response => response,
      )
}
