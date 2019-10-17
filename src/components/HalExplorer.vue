<template>
  <div class="explorer">
    <h1>Explorer</h1>
    <hal-navigation></hal-navigation>
    <br />
    <hal-resources :data="responseData"></hal-resources>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import HalNavigation from './HalNavigation';
import HalResources from './HalResources';

export default {
  name: 'HalExplorer',
  computed: {
    ...mapGetters(['responseData'])
  },
  components: {
    HalNavigation,
    HalResources
  }
};
</script>

<style scoped>
.explorer {
  width: 100%;
}
</style>
