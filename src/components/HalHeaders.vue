<template>
  <div>
    <h2>Response Headers</h2>
    <pre>{{ responseHeaders }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HalHeaders',
  computed: {
    ...mapGetters(['responseHeaders'])
  }
};
</script>

<style></style>
