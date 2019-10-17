<template>
  <div class="resources">
    <hal-links :data="data"></hal-links>
    <hal-properties :data="data"></hal-properties>
    <hal-embedded-resources :data="data"></hal-embedded-resources>
  </div>
</template>

<script>
import HalProperties from './HalProperties';
import HalLinks from './HalLinks';
import HalEmbeddedResources from './HalEmbeddedResources';

export default {
  name: 'HalResources',
  props: ['data'],
  components: {
    HalLinks,
    HalProperties,
    HalEmbeddedResources
  }
};
</script>

<style scoped>
.resources {
  width: 100%;
}
</style>
