<template>
  <div>
    <h2>Response Body</h2>
    <pre>{{ body }}</pre>
  </div>
</template>

<script>
export default {
  name: 'HalBody',
  computed: {
    body() {
      const data = this.$store.getters.responseData;
      if (data && data._links) {
        Object.keys(data._links).forEach((key) => delete data._links[key].allow);
      }
      return data;
    }
  }
};
</script>

<style></style>
