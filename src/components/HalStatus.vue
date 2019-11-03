<template>
  <div class="status" :style="statusStyle">
    {{ responseStatus.status }} {{ responseStatus.statusText }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const mapStatus = {
  1: { color: '#448aff' },
  2: { color: '#5bb75b' },
  3: { color: '#faa732' },
  4: { color: '#ff5252' },
  5: { color: '#ff5252' }
};

export default {
  name: 'HalStatus',
  computed: {
    ...mapGetters(['responseStatus']),
    statusStyle() {
      if (!this.responseStatus.status) {
        return;
      }
      return {
        color: `${mapStatus[String(this.responseStatus.status)[0]].color} !important`
      };
    }
  }
};
</script>

<style scoped>
.status {
  font-size: large;
  font-weight: bold;
  width: 100%;
}
</style>
