<template>
  <div class="page-container">
    <hal-navigation-bar></hal-navigation-bar>
    <md-content class="md-elevation-2">
      <hal-explorer></hal-explorer>
    </md-content>
    <md-content class="md-elevation-2">
      <component :is="currentComponent"></component>
    </md-content>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import HalNavigationBar from '../components/HalNavigationBar';
import HalExplorer from '../components/HalExplorer';
import HalInspector from '../components/HalInspector';
import HalDocumentation from '../components/HalDocumentation';

export default {
  name: 'HalExplorerPage',
  computed: {
    ...mapState({
      currentComponent: (state) =>
        (state.request.showDocumentation && 'HalDocumentation') || 'HalInspector'
    })
  },
  components: {
    HalDocumentation,
    HalNavigationBar,
    HalExplorer,
    HalInspector
  }
};
</script>

<style scoped></style>
