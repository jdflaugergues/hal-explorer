<template>
  <div class="properties">
    <h2>Properties</h2>
    <pre>{{ properties }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Properties',
  computed: {
    properties () {
      const data = this.$store.getters.responseData;

      try {
        const body = JSON.parse((typeof data !== 'string') ? JSON.stringify(data) : data);
        if (body) {
          delete body._links;
          delete body._embedded;
        }
        return body;
      } catch (e) {
        return '';
      }
    }
  }
}
</script>

<style scoped>
  .properties {
    width: 100%;
  }
</style>
