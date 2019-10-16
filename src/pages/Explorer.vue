<template>
  <div class="page-container">
    <NavigationBar></NavigationBar>
    <md-content class="md-elevation-2">
      <Explorer></Explorer>
    </md-content>
    <md-content class="md-elevation-2">
      <Inspector></Inspector>
    </md-content>
  </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar'
import Explorer from '../components/Explorer'
import Inspector from '../components/Inspector'

export default {
  name: 'ExplorerPage',
  components: {
    NavigationBar,
    Explorer,
    Inspector
  }
}
</script>

<style>
  .md-content {
    margin: 16px;
    padding: 16px;
    width: 48%;
    display: inline-flex;
  }
</style>
