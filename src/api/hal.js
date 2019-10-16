import Vue from 'vue'

export default {
  request: (method, url, headers, body) =>
    Vue.axios({
      method,
      url,
      headers,
      data: body
    })
      .then(
        response => response,
        error => error.response || error,
      )
}
