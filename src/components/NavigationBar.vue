<template>
  <md-toolbar class="md-primary">
    <h1 class="md-title">{{ title }}</h1>
  </md-toolbar>
</template>

<script>
export default {
  name: 'NavigationBar',
  data () {
    return {
      title: 'HAL Explorer'
    }
  },
  components: {
  }
}
</script>
