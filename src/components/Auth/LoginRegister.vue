<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{tab | titleCase}} to access your Todos anywhere
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
      outlined
      v-model="formData.email"
      label="Email"
      :rules="[val=>isValidEmailAddress(val) || 'Please enter a valid email address']"
      type="email"
      lazy-rules
      ref="email"
      stack-label
      class="col" />
    </div>
    <div class="row q-mb-md">
      <q-input
      outlined
      type="password"
      v-model="formData.password"
      label="Password"
      :rules="[val=>val.length >= 6 || 'Please enter at least 6 characters']"
      lazy-rules
      ref="password"
      stack-label
      class="col" />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit"/>
    </div>
  </q-form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      // console.log('submitForm');
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        // console.log('register user');
        if (this.tab == 'login') {
          // console.log('login the user');
          this.loginUser(this.formData)
        } else {
          // console.log('register user');
          this.registerUser(this.formData)
        }
      }
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>
</style>
