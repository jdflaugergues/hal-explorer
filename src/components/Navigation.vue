<template>
  <div class="navigation">
    <md-field>
      <label>URL</label>
      <md-input v-model="url" type="string" value="url"></md-input>
    </md-field>
    <md-button class="md-dense md-raised md-primary" @click="sendUrl">Send</md-button>
    <h2>Custom Request Headers</h2>
    <md-field>
      <md-textarea v-model="requestHeaders"></md-textarea>
    </md-field>
  </div>
</template>

<script>
import { SEND_URL } from '../store/action-types';
import { SET_LOADING } from '../store/mutation-types';

export default {
  data () {
    return {
      url: 'books',
      requestHeaders: '',
      header: ''
    }
  },
  methods: {
    sendUrl () {
      this.$store.commit(SET_LOADING, {isLoading: true});
      return this.$store.dispatch(SEND_URL, this.url)
        .then(() => { this.$store.commit(SET_LOADING, {isLoading: false}); })
    }
  },
  created () {
    this.sendUrl(this.url);
  }
}
</script>

<style scoped>
  .navigation {
    width: 100%;
  }
</style>
