<template>
  <div id="app">
    <ProgressSpinner></ProgressSpinner>
    <router-view/>
  </div>
</template>

<script>
import ProgressSpinner from './components/ProgressSpinner';

export default {
  name: 'HalExplorer',
  components: {
    ProgressSpinner
  }
}
</script>

<style>

</style>
