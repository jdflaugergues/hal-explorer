<template>
  <md-button
    class="button md-dense md-raised link-action-btn"
    :style="iconStyle"
    @click="$emit('click', type, url)"
  >
    <md-icon>{{ iconName }}</md-icon>
  </md-button>
</template>

<script>
const mapMethods = {
  get: { icon: 'arrow_downward', color: '#448aff' },
  post: { icon: 'add', color: '#5bb75b' },
  put: { icon: 'cached', color: '#faa732' },
  patch: { icon: 'arrow_upward', color: '#faa732' },
  delete: { icon: 'delete', color: '#ff5252' }
};

export default {
  name: 'LinkActionButton',
  props: {
    url: String,
    type: {
      validator: (value) => Object.keys(mapMethods).indexOf(value) !== -1
    }
  },
  computed: {
    iconStyle() {
      return { 'background-color': `${mapMethods[this.type].color} !important` };
    },
    iconName() {
      return mapMethods[this.type].icon;
    }
  }
};
</script>

<style>
.link-action-btn {
  margin: 6px 8px 6px 0px;
}
</style>
