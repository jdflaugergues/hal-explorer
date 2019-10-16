<template>
  <div class="inspector">
    <h1>Inspector</h1>
    <Headers></Headers>
    <Body></Body>
  </div>
</template>

<script>
import Headers from './Headers';
import Body from './Body';

export default {
  name: 'Inspector',
  components: {
    Headers,
    Body
  }
}
</script>

<style scoped>
  .inspector {
    width: 100%;
  }
</style>
