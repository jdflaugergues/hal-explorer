<template>
  <div class="inspector">
    <h1>Inspector</h1>
    <hal-status></hal-status>
    <hal-headers></hal-headers>
    <hal-body></hal-body>
  </div>
</template>

<script>
import HalStatus from './HalStatus';
import HalHeaders from './HalHeaders';
import HalBody from './HalBody';

export default {
  name: 'HalInspector',
  components: {
    HalStatus,
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
