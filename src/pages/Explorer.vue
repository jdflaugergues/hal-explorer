<template>
  <div class="page-container">
    <NavigationBar></NavigationBar>
    <md-content class="md-elevation-2">
      <Explorer></Explorer>
    </md-content>
    <md-content class="md-elevation-2">
      <Inspector v-if="showInspector"></Inspector>
      <Documentation v-if="showDocumentation"></Documentation>
    </md-content>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import NavigationBar from '../components/NavigationBar'
import Explorer from '../components/Explorer'
import Inspector from '../components/Inspector'
import Documentation from '../components/Documentation'

export default {
  name: 'ExplorerPage',
  computed: {
    ...mapState({
      showDocumentation: state => state.request.showDocumentation,
      showInspector: state => state.request.showInspector,
    })
  },
  components: {
    Documentation,
    NavigationBar,
    Explorer,
    Inspector
  }
}
</script>

<style scoped>

</style>
