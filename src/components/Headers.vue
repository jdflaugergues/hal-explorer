<template>
  <div>
    <h2>Response Headers</h2>
    <pre>{{ responseHeaders }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['responseHeaders'])
  }
}
</script>

<style>
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 20px;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    background-color: #f5f5f5;
    border: 1px solid rgba(0, 0, 0, 0.15);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
