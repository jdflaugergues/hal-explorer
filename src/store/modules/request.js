import Vue from 'vue';
import Vuex from 'vuex';

import hal from '../../api/hal';
import { SEND_REQUEST } from '../action-types';
import { SET_RESPONSE, SET_REQUEST_HEADERS, SET_REQUEST_URL } from '../mutation-types';

Vue.use(Vuex);

export const initialState = {
  // requestURL: '/api/authors/5da32e3ddb0fe47d79775bb2',
  requestURL: '/api',
  requestHeaders: {},
  response: {}
};

const getters = {
  responseHeaders: state => {
    if (!state.response.response && !state.response.headers && state.response instanceof Error) {
      return state.response.message;
    }

    const response = state.response.response || state.response;
    const headers = response.headers || state.response.headers;
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
  responseData: state => {
    const response = state.response;
    return response.data || (response.response && response.response.data);
  }
};

export const mutations = {
  [SET_RESPONSE] (state, payload) {
    state.response = payload.response;
  },
  [SET_REQUEST_HEADERS] (state, payload) {
    state.requestHeaders = payload.requestHeaders;
  },
  [SET_REQUEST_URL] (state, payload) {
    state.requestURL = payload.requestURL;
  },
};

export const actions = {
  [SEND_REQUEST] (context, { method, url, headers, body }) {
    const requestHeaders = headers || context.state.requestHeaders;

    if (headers) {
      context.commit(SET_REQUEST_HEADERS, { requestHeaders })
    }

    return new Promise(async (resolve) => {
      const response = await hal.request(method, url, requestHeaders, body);
      const responseData = response.data || (response.response && response.response.data);

      // fetch allowed methods for all links
      if (responseData && responseData._links) {
        const links = await Promise.all(Object.keys(responseData._links).map(async (key) => {
          const responseOptions = await hal.request('options', responseData._links[key].href, requestHeaders);
          if (key === 'curies') {
            return { [key]: responseData._links[key]};
          }
          return {
            [key]: {
              ...responseData._links[key],
              allow: responseOptions.headers && responseOptions.headers.allow.toLowerCase()
            }
          }
        }));

        responseData._links = links.reduce((acc, link) => ({...acc, ...link}), {});
      }

      context.commit(SET_RESPONSE, { response });
      context.commit(SET_REQUEST_URL, { requestURL: url });
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
