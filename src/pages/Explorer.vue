<template>
  <div class="page-container">
    <NavigationBar></NavigationBar>
    <md-content class="md-elevation-2">
      <Explorer></Explorer>
    </md-content>
    <md-content class="md-elevation-2">
      <component :is="currentComponent"></component>
    </md-content>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import NavigationBar from '../components/NavigationBar';
import Explorer from '../components/Explorer';
import Inspector from '../components/Inspector';
import Documentation from '../components/Documentation';

export default {
  name: 'ExplorerPage',
  computed: {
    ...mapState({
      currentComponent: (state) =>
        (state.request.showDocumentation && 'Documentation') || 'Inspector'
    })
  },
  components: {
    Documentation,
    NavigationBar,
    Explorer,
    Inspector
  }
};
</script>

<style scoped></style>
