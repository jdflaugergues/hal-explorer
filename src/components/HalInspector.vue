<template>
  <div class="inspector">
    <h1>Inspector</h1>
    <hal-headers></hal-headers>
    <hal-body></hal-body>
  </div>
</template>

<script>
import HalHeaders from './HalHeaders';
import HalBody from './HalBody';

export default {
  name: 'HalInspector',
  components: {
    HalHeaders,
    HalBody
  }
};
</script>

<style scoped>
.inspector {
  width: 100%;
}
</style>
