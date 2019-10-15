<template>
  <div class="resources">
    <Links></Links>
    <Properties></Properties>
    <EmbeddedResources></EmbeddedResources>
  </div>
</template>

<script>
import Properties from './Properties';
import Links from './Links';
import EmbeddedResources from './EmbeddedResources';

export default {
  components: {
    Links,
    Properties,
    EmbeddedResources
  }
}
</script>

<style scoped>
  .resources {
    width: 100%;
  }
</style>
