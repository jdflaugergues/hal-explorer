import Vue from 'vue';
import Vuex from 'vuex';

import hal from '../../api/hal';
import { SEND_URL } from '../action-types';
import { SET_RESPONSE_URL } from '../mutation-types';

Vue.use(Vuex);

export const initialState = {
  responseURL: {}
};

const getters = {
  responseURL: state => state.responseURL,
  responseHeaders: state => {
    if (!state.responseURL.response && !state.responseURL.headers) {
      return;
    }

    const response = state.responseURL.response || state.responseURL;
    const headers = response.headers || state.responseURL.headers;
    const head = `${response.status} ${response.statusText}`;

    if (!headers) {
      return;
    }

    return Object.keys(headers).reduce((acc, key) => {
      if (!key) {
        return acc;
      }
      acc += `\n${key}: ${headers[key]}`;
      return acc;
    }, `${head}\n`)
  },
  responseBody: state => {
    return state.responseURL.data;
  }
};

export const mutations = {
  [SET_RESPONSE_URL] (state, payload) {
    state.responseURL = payload.response;
  }
};

export const actions = {
  [SEND_URL] (context, { url, headers }) {
    return new Promise(async (resolve) => {
      const response = await hal.sendUrl(url, headers);
      context.commit(SET_RESPONSE_URL, { response });
      resolve(response);
    })
  }
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
}
