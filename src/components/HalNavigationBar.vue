<template>
  <md-toolbar class="md-primary">
    <h1 class="md-title">{{ title }}</h1>
    <md-button @click="goToEntryPoint">Go to entry point</md-button>
    <md-button @click="goToGithubProject">
      <hal-icon-github></hal-icon-github>
      <md-tooltip md-direction="right">About HAL Explorer Project</md-tooltip>
    </md-button>
  </md-toolbar>
</template>

<script>
import { GO_TO_ENTRY_POINT } from '../store/action-types';
import HalIconGithub from './Icons/HalIconGithub';

export default {
  name: 'HalNavigationBar',
  data() {
    return {
      title: 'HAL Explorer'
    };
  },
  methods: {
    goToEntryPoint() {
      this.$store.dispatch(GO_TO_ENTRY_POINT);
    },
    goToGithubProject() {
      const githubTab = window.open('https://github.com/jdflaugergues/hal-explorer', '_blank');
      githubTab.focus();
    }
  },
  components: {
    HalIconGithub
  }
};
</script>
