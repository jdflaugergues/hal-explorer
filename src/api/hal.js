import Vue from 'vue'

export default {
  sendUrl: (url) =>
    Vue.axios.get(url)
      .then(
        response => response,
        response => response,
      )
}
