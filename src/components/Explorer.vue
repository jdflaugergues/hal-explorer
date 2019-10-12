<template>
  <div class="explorer">
    <h1>Explorer</h1>
    <Navigation></Navigation>
    <br>
    <Resources></Resources>
  </div>
</template>

<script>
import Navigation from './Navigation';
import Resources from './Resources';

export default {
  data () {
    return {
    }
  },
  components: {
    Navigation,
    Resources
  }
}
</script>

<style scoped>
  .explorer {
    width: 100%;
  }
</style>
