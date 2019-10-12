<template>
  <div class="resources">
    <Properties></Properties>
    <Links></Links>
  </div>
</template>

<script>
import Properties from './Properties';
import Links from './Links';

export default {
  components: {
    Properties,
    Links
  }
}
</script>

<style scoped>
  .resources {
    width: 100%;
  }
</style>
