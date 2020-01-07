<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register to access your Todos anywhere
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
      outlined
      v-model="formData.email"
      label="Email"
      :rules="[val=>isValidEmailAddress(val) || 'Please enter a valid email address']"
      lazy-rules
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
      stack-label
      class="col" />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" label="Register" type="submit"/>
    </div>
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      console.log('submitForm');
    }
  }
}
</script>

<style>
</style>
