<template>
  <md-dialog :md-active.sync="show" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <md-dialog-title>Make a {{ type.toUpperCase() }} request</md-dialog-title>

    <form novalidate @submit.prevent="sendRequest">
      <md-field>
        <label for="url">Target URL</label>
        <md-input name="url" id="url" v-model="form.url" type="string" value="url"></md-input>
      </md-field>

      <md-field :class="getValidationClass('headers')">
        <label for="headers">Headers</label>
        <md-textarea name="headers" id="headers" v-model="form.headers"></md-textarea>
        <span class="md-error" v-if="!$v.form.headers.JSONValidator">
          The headers must be a valid JSON
        </span>
      </md-field>

      <md-field :class="getValidationClass('body')">
        <label for="body">Body</label>
        <md-textarea name="body" id="body" v-model="form.body" class="request-body"></md-textarea>
        <span class="md-error" v-if="!$v.form.body.JSONValidator">
          The headers must be a valid JSON
        </span>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('closeDialog')">Cancel</md-button>
        <md-button type="submit" class="submit-button md-primary">Send Request</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { JSONValidator } from '../libs/validators';

const methods = ['post', 'put', 'patch'];
const defaultBody = '{\n  \n  \n  \n  \n  \n  \n  \n  \n}';

export default {
  name: 'ActionRequestDialog',
  mixins: [validationMixin],
  props: {
    type: {
      validator: (value) => !value || methods.indexOf(value) !== -1,
      default: ''
    },
    url: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {
      url: '',
      headers: '',
      body: defaultBody
    }
  }),
  validations: {
    form: {
      url: {},
      headers: {
        JSONValidator
      },
      body: {
        JSONValidator
      }
    }
  },
  methods: {
    sendRequest() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const payload = {
        url: this.form.url,
        headers: JSON.parse(this.form.headers),
        body: JSON.parse(this.form.body)
      };

      this.$emit('sendRequest', payload);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    }
  },
  computed: {
    ...mapState({
      requestHeaders: (state) => state.request.requestHeaders
    })
  },
  mounted() {
    this.form.headers = JSON.stringify(this.requestHeaders, null, 2);
  },
  updated() {
    if (!this.show) {
      this.form.url = '';
      this.form.body = defaultBody;
      this.form.headers = JSON.stringify(this.requestHeaders, null, 2);
    } else if (!this.form.url) {
      this.form.url = this.url;
    }
  }
};
</script>

<style>
.md-dialog {
  max-width: 1000px;
  min-width: 700px;
}
.request-body {
  height: 230px !important;
}
form {
  padding: 16px;
}
</style>
