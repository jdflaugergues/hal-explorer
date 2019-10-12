<template>
  <div class="properties">
    <h2>Properties</h2>
    <pre>{{ properties }}</pre>
  </div>
</template>

<script>
export default {
  computed: {
    properties () {
      const responseBody = this.$store.getters.responseBody;

      try {
        const body = JSON.parse(JSON.stringify(responseBody));
        if (body) {
          delete body._links;
          delete body._embedded;
        }
        return body;
      } catch (e) {
        return responseBody;
      }
    }
  }
}
</script>

<style scoped>
  .properties {
    width: 100%;
  }
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 20px;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre;
    white-space: pre-wrap;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
