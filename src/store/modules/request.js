import Vue from 'vue';
import Vuex from 'vuex';

import hal from '../../api/hal';
import {
  SEND_REQUEST,
  GET_ALLOWED_METHODS,
  GET_DOCUMENTATION,
  GO_TO_ENTRY_POINT
} from '../action-types';
import {
  SET_RESPONSE,
  SET_REQUEST_HEADERS,
  SET_REQUEST_URL,
  SHOW_INSPECTOR,
  SHOW_DOCUMENTATION,
  SET_DOCUMENTATION
} from '../mutation-types';

const ROOT_URL = '/api';

Vue.use(Vuex);

export const initialState = {
  requestURL: ROOT_URL,
  requestHeaders: {},
  response: {},
  documentation: '',
  showDocumentation: false,
  showInspector: true
};

const getters = {
  responseHeaders: (state) => {
    if (!state.response.response && !state.response.headers && state.response instanceof Error) {
      return state.response.message;
    }

    const response = state.response.response || state.response;
    const headers = response.headers || state.response.headers;

    if (!headers) {
      return;
    }

    return Object.keys(headers).reduce((acc, key) => {
      if (!key) {
        return acc;
      }
      acc += `${key}: ${headers[key]}\n`;
      return acc;
    }, '');
  },
  responseStatus: (state) => {
    if (!state.response.response && !state.response.headers && state.response instanceof Error) {
      return {};
    }

    const response = state.response.response || state.response;
    return {
      status: response.status,
      statusText: response.statusText
    };
  },
  responseData: (state) => {
    const response = state.response;
    return response.data;
  }
};

export const mutations = {
  [SET_RESPONSE](state, payload) {
    state.response = payload.response;
  },
  [SET_DOCUMENTATION](state, payload) {
    state.documentation = payload.documentation;
  },
  [SET_REQUEST_HEADERS](state, payload) {
    state.requestHeaders = payload.requestHeaders;
  },
  [SET_REQUEST_URL](state, payload) {
    state.requestURL = payload.requestURL;
  },
  [SHOW_DOCUMENTATION](state) {
    state.showDocumentation = true;
    state.showInspector = false;
  },
  [SHOW_INSPECTOR](state) {
    state.showInspector = true;
    state.showDocumentation = false;
  }
};

// fetch allowed methods for all links
async function enrichLinksWithAllowedMethods(data, headers) {
  const links = await Promise.all(
    Object.keys(data._links).map(async (key) => {
      const responseOptions = await hal.request('options', data._links[key].href, headers);
      if (key === 'curies') {
        return { [key]: data._links[key] };
      }
      return {
        [key]: {
          ...data._links[key],
          allow: responseOptions.headers && responseOptions.headers.allow.toLowerCase()
        }
      };
    })
  );
  return links.reduce((acc, link) => ({ ...acc, ...link }), {});
}

export const actions = {
  [GET_ALLOWED_METHODS](context, { resource }) {
    return new Promise(async (resolve) => {
      if (resource && resource._links) {
        resource._links = await enrichLinksWithAllowedMethods(
          resource,
          context.state.requestHeaders
        );
      }
      resolve(resource);
    });
  },
  [SEND_REQUEST](context, { method, url, headers, body }) {
    const requestHeaders = headers || context.state.requestHeaders;

    if (headers) {
      context.commit(SET_REQUEST_HEADERS, { requestHeaders });
    }

    return new Promise(async (resolve) => {
      const response = await hal.request(method, url, requestHeaders, body);
      const data = response.data;

      if (data && data._links) {
        data._links = await enrichLinksWithAllowedMethods(data, requestHeaders);
      }

      context.commit(SET_RESPONSE, { response });
      context.commit(SET_REQUEST_URL, { requestURL: url });
      context.commit(SHOW_INSPECTOR);
      resolve(response);
    });
  },
  [GET_DOCUMENTATION](context, { docUrl }) {
    return new Promise(async (resolve) => {
      const response = await hal.request('get', docUrl, context.state.requestHeaders);
      context.commit(SHOW_DOCUMENTATION);
      context.commit(SET_DOCUMENTATION, { documentation: response.data });
      resolve(response);
    });
  },
  [GO_TO_ENTRY_POINT](context) {
    const payload = {
      method: 'get',
      url: ROOT_URL
    };
    context.dispatch(SEND_REQUEST, payload);
  }
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
};
