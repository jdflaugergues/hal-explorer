<template>
  <md-button
    class="button md-dense md-raised link-action-btn"
    :class="classIcon"
    @click="handleClick"
  >
    <md-icon>{{ resolveIcon() }}</md-icon>
  </md-button>
</template>

<script>
const mapIcon = {
  'get': 'arrow_downward',
  'post': 'add',
  'put': 'cached',
  'patch': 'arrow_upward',
  'delete': 'delete',
}

export default {
  name: 'LinkActionButton',
  props: {
    url: String,
    type: {
      validator: (value) => Object.keys(mapIcon).indexOf(value) !== -1
    }
  },
  computed: {
    classIcon () {
      return {[`${this.type}-button`]: true}
    }
  },
  methods: {
    resolveIcon () {
      return mapIcon[this.type];
    },
    handleClick(e){
      e.preventDefault();
      this.$emit('click', this.type, this.url);
    }
  }
}
</script>

<style>
  .link-action-btn {
    margin: 6px 8px 6px 0px;
  }
  .get-button {
    background-color: #448aff !important;
  }
  .post-button {
    background-color: #5bb75b !important;
  }
  .put-button {
    background-color: #faa732 !important;
  }
  .patch-button {
    background-color: #faa732 !important;
  }
  .delete-button {
    background-color: #ff5252 !important;
  }
</style>
