<template>
  <div class="embedded-resources" v-if="hasEmbeddedResource">
    <h2>Embedded Resources</h2>
    <div v-for="(resources, resourcesName) in embeddedResources" :key="resourcesName">
      <md-card v-for="(resource, index) in resources" :key="index">
        <md-card-header-text>
          <div class="resource-header" @click="toggleDisplay(resourcesName, resource, index)">
            {{ resolveResourceHeader(resourcesName, resource, index) }}
          </div>
        </md-card-header-text>
        <md-card-content v-if="!!resourcesShown[`${resourcesName}${index}`]">
          <hal-resources :data="allResources[`${resourcesName}${index}`]"></hal-resources>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { GET_ALLOWED_METHODS } from '../store/action-types';

export default {
  name: 'HalEmbeddedResources',
  props: ['data'],
  data() {
    return {
      allResources: {},
      resourcesShown: {}
    };
  },
  computed: {
    hasEmbeddedResource() {
      try {
        const body = JSON.parse(JSON.stringify(this.data));
        return body && body._embedded;
      } catch {
        return false;
      }
    },
    embeddedResources() {
      try {
        const body = JSON.parse(JSON.stringify(this.data));

        if (!body || !body._embedded) {
          return [];
        }

        return body._embedded;
      } catch {
        return [];
      }
    }
  },
  methods: {
    resolveResourceHeader(resourcesName, resource, index) {
      return `${resourcesName}[${index}]: ${resource.name} (${resource._id})`;
    },
    toggleDisplay(resourcesName, resource, index) {
      this.$store.dispatch(GET_ALLOWED_METHODS, { resource }).then((linkedResource) => {
        this.allResources = {
          ...this.allResources,
          [`${resourcesName}${index}`]: linkedResource
        };
      });
      this.resourcesShown = {
        ...this.resourcesShown,
        [`${resourcesName}${index}`]: !this.resourcesShown[`${resourcesName}${index}`]
      };
    }
  },
  components: {
    HalResources: () => import('./HalResources')
  }
};
</script>

<style scoped>
.embedded-resources {
  width: 100%;
}
.resource-header {
  padding: 16px;
  color: #448aff;
  cursor: pointer;
}
.md-card {
  margin-bottom: 3px;
}
</style>
