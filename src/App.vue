<template>
  <div id="app">
    <ProgressSpinner></ProgressSpinner>
    <router-view />
  </div>
</template>

<script>
import ProgressSpinner from './components/ProgressSpinner';

export default {
  name: 'HalExplorer',
  components: {
    ProgressSpinner
  }
};
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
  white-space: pre;
  white-space: pre-wrap;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.md-content {
  margin: 16px;
  padding: 16px;
  width: 48%;
  display: inline-flex;
}
</style>
