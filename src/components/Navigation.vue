<template>
  <div class="navigation">
    <form novalidate @submit.prevent="validateRequest">
      <md-field>
        <label for="url">URL</label>
        <md-input name="url" id="url" v-model="form.url" type="string" value="url"></md-input>
      </md-field>

      <md-field :class="getValidationClass('headers')">
        <label for="headers">Custom Request Headers</label>
        <md-textarea name="headers" id="headers" v-model="form.headers"></md-textarea>
        <span class="md-error" v-if="!$v.form.headers.JSONValidator">The headers must be a valid JSON</span>
      </md-field>

      <md-button type="submit" class="submit-button md-dense md-raised md-primary">Send Request</md-button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'

import { JSONValidator } from '../libs/validators';
import { SEND_URL } from '../store/action-types';
import { SET_LOADING } from '../store/mutation-types';

export default {
  name: 'FormRequest',
  mixins: [validationMixin],
  data: () => ({
    form: {
      url: 'books',
      headers: '{\n  "Accept": "application/hal+json"\n}'
    }
  }),
  validations: {
    form: {
      url: {
      },
      headers: {
        JSONValidator
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateRequest () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.sendRequest()
      }
    },
    sendRequest () {
      const payload = {
        url: this.form.url,
        headers: this.form.headers && JSON.parse(this.form.headers) || {}
      }

      this.$store.commit(SET_LOADING, {isLoading: true});
      return this.$store.dispatch(SEND_URL, payload)
        .then(() => { this.$store.commit(SET_LOADING, {isLoading: false}); })
    }
  },
  created () {
    this.sendRequest();
  }
}
</script>

<style scoped>
  .navigation {
    width: 100%;
  }
  .submit-button {
    width: 100%;
    margin: 0;
  }
</style>
