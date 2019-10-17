<template>
  <div class="explorer">
    <h1>Explorer</h1>
    <Navigation></Navigation>
    <br />
    <Resources :data="responseData"></Resources>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navigation from './Navigation';
import Resources from './Resources';

export default {
  name: 'Explorer',
  computed: {
    ...mapGetters(['responseData'])
  },
  components: {
    Navigation,
    Resources
  }
};
</script>

<style scoped>
.explorer {
  width: 100%;
}
</style>
