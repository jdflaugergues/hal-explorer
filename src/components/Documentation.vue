<template>
  <div class="documentation">
    <h1>Documentation</h1>
    <div v-html="documentation">{{ documentation }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import marked from 'marked';

export default {
  name: 'Documentation',
  computed: {
    ...mapState({
      documentation: (state) => marked(state.request.documentation)
    })
  }
};
</script>

<style>
.documentation {
  width: 100%;
}
li code {
  padding: 2px 4px;
  color: #d14 !important;
  white-space: nowrap;
  background-color: #f7f7f9;
  border: 1px solid #e1e1e8;
}
</style>
