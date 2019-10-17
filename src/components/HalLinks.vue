<template>
  <div class="links">
    <h2>Links</h2>
    <md-table v-if="data">
      <md-table-row>
        <md-table-head>Rel</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Name/Index</md-table-head>
        <md-table-head>Docs</md-table-head>
        <md-table-head>GET</md-table-head>
        <md-table-head>POST</md-table-head>
        <md-table-head>PUT</md-table-head>
        <md-table-head>PATCH</md-table-head>
        <md-table-head>DELETE</md-table-head>
      </md-table-row>
      <md-table-row v-for="(link, index) in links" :key="link.rel">
        <md-table-cell>{{ index }}</md-table-cell>
        <md-table-cell>{{ link.title }}</md-table-cell>
        <md-table-cell>{{ link.name }}</md-table-cell>
        <md-table-cell>
          <md-button class="doc-button md-dense" v-if="link.doc" @click="handleShowDoc(link.doc)">
            <md-icon>library_books</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-for="method in actionMethods" :key="method">
          <hal-link-action-button
            v-if="link.allow && link.allow.includes(method)"
            :type="method"
            :url="link.href"
            @click="handleClickActionButton"
          ></hal-link-action-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <hal-action-request-dialog
      :type="linkType"
      :url="linkUrl"
      :show="showDialog"
      @closeDialog="handleCloseDialog"
      @sendRequest="handleSendRequest"
    ></hal-action-request-dialog>
  </div>
</template>

<script>
import HalLinkActionButton from './HalLinkActionButton';
import HalActionRequestDialog from './HalActionRequestDialog';
import { SEND_REQUEST, GET_DOCUMENTATION } from '../store/action-types';
import { SET_LOADING } from '../store/mutation-types';

export default {
  name: 'HalLinks',
  props: ['data'],
  data() {
    return {
      actionMethods: ['get', 'post', 'put', 'patch', 'delete'],
      showDialog: false,
      linkType: '',
      linkUrl: ''
    };
  },
  computed: {
    links() {
      try {
        const body = JSON.parse(JSON.stringify(this.data));

        if (!body || !body._links) {
          return [];
        }

        return Object.keys(body._links).reduce((acc, link) => {
          if (link === 'curies') {
            return acc;
          }

          const formatedLink = { ...body._links[link] };

          if (link.includes(':')) {
            const splittedLink = link.split(':');
            const linkCurie = body._links.curies.find((curie) => curie.name === splittedLink[0]);
            formatedLink.doc = linkCurie.templated
              ? linkCurie.href.replace('{rel}', splittedLink[1])
              : linkCurie.href;
          }

          return { ...acc, [link]: formatedLink };
        }, {});
      } catch {
        return [];
      }
    }
  },
  methods: {
    handleClickActionButton(type, url) {
      const methodsWithRequestBody = ['post', 'put', 'patch'];
      if (methodsWithRequestBody.includes(type)) {
        this.linkType = type;
        this.linkUrl = url;
        this.showDialog = true;
      } else {
        this.sendRequest(type, url);
      }
    },
    handleCloseDialog() {
      this.showDialog = false;
    },
    handleSendRequest({ url, headers, body }) {
      this.sendRequest(this.linkType, url, headers, body);
    },
    handleShowDoc(docUrl) {
      this.$store.dispatch(GET_DOCUMENTATION, { docUrl });
    },
    sendRequest(method, url, headers, body) {
      const payload = {
        method,
        url,
        headers,
        body
      };

      this.$store.commit(SET_LOADING, { isLoading: true });
      return this.$store.dispatch(SEND_REQUEST, payload).then(() => {
        this.showDialog = false;
        this.$store.commit(SET_LOADING, { isLoading: false });
      });
    }
  },
  components: {
    HalLinkActionButton,
    HalActionRequestDialog
  }
};
</script>

<style>
.links {
  width: 100%;
}

.md-table,
.md-table-content {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
.md-table-cell-container {
  padding: 6px 0 6px 24px;
}
.button,
.md-button {
  min-width: 30px !important;
}
.button {
  width: auto !important;
}
.doc-button {
  margin: 6px 8px 6px 0px;
}
</style>
