<template>
  <div class="resources">
    <Links :data="data"></Links>
    <Properties :data="data"></Properties>
    <EmbeddedResources :data="data"></EmbeddedResources>
  </div>
</template>

<script>
import Properties from './Properties';
import Links from './Links';
import EmbeddedResources from './EmbeddedResources';

export default {
  name: 'Resources',
  props: ['data'],
  components: {
    Links,
    Properties,
    EmbeddedResources
  }
};
</script>

<style scoped>
.resources {
  width: 100%;
}
</style>
